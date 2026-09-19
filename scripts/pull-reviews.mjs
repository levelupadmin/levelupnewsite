#!/usr/bin/env node
/**
 * Pull reviews from the confirmed Tally forms into the repo.
 *
 * The site is static, so reviews are build-time content. This script is the
 * only thing that writes them.
 *
 * Rules that are not negotiable:
 *   - Every published item traces back to a real Tally submission id.
 *   - Dates are the genuine submittedAt. Never shifted, never invented.
 *   - A submission with no usable prose is skipped, not paraphrased.
 *   - Nothing publishes until a human sets approved: true.
 *
 * Run: node scripts/pull-reviews.mjs [--dry-run] [--limit=N]
 *
 * Re-running is safe: existing entries keep their approved flag and any
 * hand-edited fields (name, profileUrl). New submissions arrive as
 * approved: false.
 */

import { readFileSync } from "node:fs";
import { tally, tallyAll } from "./tally-client.mjs";
import { loadAll, saveAll, APPROVED_FILE, ARCHIVE_FILE } from "./reviews-store.mjs";

const CONFIG = "src/data/reviewForms.json";

const MIN_SCORE = 80; // on the normalised 0-100 scale
const MIN_TEXT_CHARS = 40;

const DRY = process.argv.includes("--dry-run");
const LIMIT = Number(process.argv.find((a) => a.startsWith("--limit="))?.split("=")[1]) || Infinity;

/* The field that holds the testimonial. "Wall of Love" is the house name. */
const TEXT_WANTED =
  /wall of love|what did you (love|like)|testimonial|review|recommend|takeaway|your experience|say about/i;

/* Never publish the "how could we do better" field as if it were a review. */
const TEXT_BANNED =
  /better|improve|improvement|suggest|complaint|problem|difficult|challenge|didn'?t like|dislike|missing|confus|why don'?t|reason/i;

const RATING_TYPES = /^(RATING|LINEAR_SCALE|NPS)$/i;
const TEXT_TYPES = /^(TEXTAREA|LONG_ANSWER)$/i;
const NAME_Q = /\b(your name|full name|name)\b/i;
const ROLE_Q = /what do you do|occupation|profession|current role/i;
const OVERALL_Q = /overall/i;

/* ── helpers ───────────────────────────────────────────────────────────── */

/** First name plus last initial. Full names only where explicitly approved. */
function maskName(raw) {
  const clean = String(raw || "")
    .replace(/\s+/g, " ")
    .replace(/[^\p{L}\p{M}\s.'-]/gu, "")
    .trim();
  if (!clean) return "";
  const parts = clean.split(" ").filter(Boolean);
  if (parts.length === 1) return parts[0];
  const initial = parts[parts.length - 1][0];
  return `${parts[0]} ${initial.toUpperCase()}.`;
}

/** Strip contact details a student pasted into free text. */
function scrubText(raw) {
  return String(raw ?? "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/[\w.+-]+@[\w-]+\.[\w.]+/g, "")
    .replace(/(?:\+?\d[\d\s()-]{8,}\d)/g, "")
    .replace(/https?:\/\/\S+/g, "")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function flat(v) {
  if (v == null) return "";
  if (Array.isArray(v)) return v.map(flat).filter(Boolean).join(", ");
  if (typeof v === "object") return flat(v.text ?? v.label ?? v.title ?? "");
  return String(v);
}

/**
 * Highest value a rating question accepts. Submission question ids and form
 * block uuids do not match, but both keep form order, so pair the Nth rating
 * question with the Nth rating block.
 */
function ratingScales(blocks) {
  return blocks
    .filter((b) => RATING_TYPES.test(b.type || ""))
    .map((b) => {
      const p = b.payload ?? {};
      if (p.stars) return Number(p.stars);
      if (p.end != null) return Number(p.end);
      if (p.max != null) return Number(p.max);
      if (Array.isArray(p.options)) return p.options.length;
      return 5;
    });
}

/* ── config ────────────────────────────────────────────────────────────── */

const config = JSON.parse(readFileSync(CONFIG, "utf8"));
const forms = (config.forms ?? []).slice(0, LIMIT);

if (forms.length === 0) {
  console.error(
    `No forms configured in ${CONFIG}.\n\n` +
      `Run: node scripts/discover-review-forms.mjs\n` +
      `then add the confirmed forms to that file before pulling.`
  );
  process.exit(1);
}

const byId = new Map(loadAll().map((r) => [r.tallyId, r]));

console.log(`${forms.length} forms to pull, ${byId.size} reviews already on file\n`);

/* ── pull ──────────────────────────────────────────────────────────────── */

const stats = { fetched: 0, noRating: 0, belowScore: 0, noText: 0, added: 0, refreshed: 0 };

for (const form of forms) {
  let scales = [];
  try {
    const detail = await tally(`/forms/${form.formId}`);
    scales = ratingScales(detail.blocks ?? []);
  } catch (e) {
    console.log(`  ! ${form.program}: form detail failed (${e.message}) - assuming /5`);
  }

  let subs;
  try {
    subs = await tallyAll(`/forms/${form.formId}/submissions`);
  } catch (e) {
    console.log(`  ! ${form.program}: submissions failed (${e.message})`);
    continue;
  }

  const questions = subs.meta?.questions ?? [];
  const qById = new Map(questions.map((q) => [q.id, q]));

  // Nth rating question <-> Nth rating scale.
  const ratingOrder = questions.filter((q) => RATING_TYPES.test(q.type || "")).map((q) => q.id);
  const scaleOf = new Map(ratingOrder.map((id, i) => [id, scales[i] ?? 5]));

  let added = 0;
  for (const sub of subs) {
    stats.fetched++;

    const responses = sub.responses ?? [];
    const ratings = [];
    let overall = null;
    let text = "";
    let wanted = "";
    let name = "";
    let role = "";

    for (const r of responses) {
      const q = qById.get(r.questionId);
      if (!q) continue;
      const title = flat(q.title);
      const type = q.type || "";

      if (RATING_TYPES.test(type)) {
        const raw = Number(flat(r.answer));
        if (!Number.isFinite(raw) || raw <= 0) continue;
        const max = Number(scaleOf.get(q.id)) || 5;
        const pct = Math.min(100, (raw / max) * 100);
        ratings.push(pct);
        if (OVERALL_Q.test(title)) overall = pct;
        continue;
      }

      if (TEXT_TYPES.test(type)) {
        const v = scrubText(flat(r.answer));
        if (!v) continue;
        if (TEXT_BANNED.test(title)) continue; // never the criticism field
        if (TEXT_WANTED.test(title)) {
          if (v.length > wanted.length) wanted = v;
        } else if (v.length > text.length) {
          text = v;
        }
        continue;
      }

      if (!name && NAME_Q.test(title)) name = maskName(flat(r.answer));
      else if (!role && ROLE_Q.test(title)) role = flat(r.answer).trim().slice(0, 60);
    }

    if (ratings.length === 0) {
      stats.noRating++;
      continue;
    }
    // The overall-experience answer if the form asks for one, otherwise the
    // mean. Never the max: taking the best answer inflates the average, and
    // an honest number is the entire point of this page.
    const score = overall ?? ratings.reduce((a, b) => a + b, 0) / ratings.length;
    if (score < MIN_SCORE) {
      stats.belowScore++;
      continue;
    }

    const body = wanted || text;
    if (body.length < MIN_TEXT_CHARS) {
      stats.noText++;
      continue;
    }

    const submittedAt = sub.submittedAt ?? sub.createdAt ?? null;
    if (!submittedAt) continue; // no real date, no publication

    const prev = byId.get(sub.id);
    if (prev) {
      // Refresh source-of-truth fields only; never touch human decisions.
      prev.score = Math.round(score);
      prev.text = body;
      prev.submittedAt = submittedAt;
      prev.program = form.program;
      prev.category = form.category;
      stats.refreshed++;
      continue;
    }

    byId.set(sub.id, {
      tallyId: sub.id,
      formId: form.formId,
      program: form.program,
      category: form.category,
      name,
      role,
      score: Math.round(score),
      text: body,
      submittedAt,
      approved: false,
    });
    added++;
    stats.added++;
  }

  console.log(
    `  ${form.program.slice(0, 38).padEnd(38)} ${String(subs.length).padStart(5)} subs -> ${String(added).padStart(4)} new`
  );
}

/* ── write ─────────────────────────────────────────────────────────────── */

const reviews = [...byId.values()].sort(
  (a, b) => new Date(b.submittedAt) - new Date(a.submittedAt)
);
const approved = reviews.filter((r) => r.approved);

console.log(`\n${"=".repeat(72)}`);
console.log(`submissions seen     ${stats.fetched}`);
console.log(`  no rating answer   ${stats.noRating}`);
console.log(`  scored under ${MIN_SCORE}   ${stats.belowScore}`);
console.log(`  no usable prose    ${stats.noText}`);
console.log(`qualifying           ${reviews.length}  (${stats.added} new, ${stats.refreshed} refreshed)`);
console.log(`approved for display ${approved.length}`);

if (DRY) {
  console.log(`\n--dry-run: nothing written.`);
  process.exit(0);
}

const written = saveAll(reviews, { pulledAt: new Date().toISOString() });
console.log(`\n${written.approved} approved -> ${APPROVED_FILE} (the site reads this)`);
console.log(`${written.total} total     -> ${ARCHIVE_FILE} (the pool you approve from)`);
console.log(`${written.total - written.approved} awaiting approval.`);
