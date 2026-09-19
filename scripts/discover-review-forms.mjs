#!/usr/bin/env node
/**
 * Read-only sweep of every Tally form, flagging the ones that look like
 * feedback or review forms. Writes a report for a human to confirm before
 * anything is pulled or published. Touches no site content.
 *
 * Run: node scripts/discover-review-forms.mjs
 * Out: scripts/.tally-discovery.json  (gitignored working file)
 *
 * `/forms` does not accept a workspaceId filter, so it is listed whole and
 * grouped locally. Fetching the block detail of all ~900 forms would take
 * roughly ten minutes of serialised calls, so detail is only fetched for
 * forms that could plausibly hold reviews. What gets skipped is printed.
 */

import { writeFileSync } from "node:fs";
import { tally, tallyAll } from "./tally-client.mjs";

const NAME_HINT = /rating|rate|score|nps|feedback|review|experience|testimonial|survey|reflection/i;
const RATING_TYPES = /RATING|LINEAR_SCALE|NPS/i;
const TEXT_TYPES = /TEXTAREA|LONG_ANSWER/i;

// A review corpus needs volume. Forms below this are still listed, just not
// opened, unless the name suggests feedback.
const MIN_SUBS_TO_INSPECT = 5;

const OUT = "scripts/.tally-discovery.json";

function labelOf(block) {
  const p = block?.payload ?? {};
  const t = p.title ?? p.label ?? p.text ?? p.name;
  const flatten = (n) =>
    typeof n === "string"
      ? n
      : Array.isArray(n)
        ? n.map(flatten).join("")
        : (n?.text ?? (n?.children ? flatten(n.children) : ""));
  return flatten(t).replace(/\s+/g, " ").trim();
}

console.log("Listing workspaces and forms (read-only)...\n");

const workspaces = await tallyAll("/workspaces");
const wsName = new Map(workspaces.map((w) => [w.id, w.name || "(unnamed)"]));

const forms = await tallyAll("/forms");
console.log(`${workspaces.length} workspaces, ${forms.length} forms total`);

const withSubs = forms.filter((f) => (f.numberOfSubmissions || 0) > 0);
const toInspect = withSubs.filter(
  (f) => (f.numberOfSubmissions || 0) >= MIN_SUBS_TO_INSPECT || NAME_HINT.test(f.name || "")
);
const skipped = withSubs.filter((f) => !toInspect.includes(f));

console.log(`${withSubs.length} forms have at least one submission`);
console.log(
  `${toInspect.length} will be opened and inspected ` +
    `(>=${MIN_SUBS_TO_INSPECT} submissions, or a feedback-ish name)`
);
console.log(
  `${skipped.length} skipped: under ${MIN_SUBS_TO_INSPECT} submissions and no name match ` +
    `(${skipped.reduce((n, f) => n + f.numberOfSubmissions, 0)} submissions in total)\n`
);

const results = [];
let done = 0;

for (const f of toInspect) {
  done++;
  if (done % 25 === 0) console.log(`  ...${done}/${toInspect.length}`);

  let detail;
  try {
    detail = await tally(`/forms/${f.id}`);
  } catch (e) {
    console.log(`  ! ${f.name}: ${e.message}`);
    continue;
  }

  const blocks = detail.blocks ?? [];
  const questions = blocks
    .filter(
      (b) =>
        b.type &&
        !/^(FORM_TITLE|TITLE|TEXT|LABEL|HEADING[1-9]?|PAGE_BREAK|THANK_YOU|IMAGE|DIVIDER|EMBED|GROUP)$/i.test(
          b.type
        )
    )
    .map((b) => ({ type: b.type, label: labelOf(b) }));

  const ratingQs = questions.filter((q) => RATING_TYPES.test(q.type));
  const hintQs = questions.filter((q) => NAME_HINT.test(q.label));
  const textQs = questions.filter((q) => TEXT_TYPES.test(q.type));

  // Needs a score to filter on and prose to publish.
  const isCandidate = (ratingQs.length > 0 || hintQs.length > 0) && textQs.length > 0;

  const row = {
    workspace: wsName.get(f.workspaceId) || f.workspaceId,
    workspaceId: f.workspaceId,
    formId: f.id,
    formName: f.name,
    status: f.status,
    isClosed: f.isClosed,
    submissions: f.numberOfSubmissions ?? 0,
    createdAt: f.createdAt,
    isCandidate,
    ratingQuestions: ratingQs.map((q) => `${q.type} | ${q.label}`.slice(0, 130)),
    hintQuestions: hintQs.map((q) => `${q.type} | ${q.label}`.slice(0, 130)),
    textQuestions: textQs.map((q) => `${q.type} | ${q.label}`.slice(0, 130)),
    allQuestions: questions.map((q) => `${q.type} | ${q.label}`.slice(0, 130)),
  };
  results.push(row);

  if (isCandidate) {
    console.log(
      `  ✓ [${String(f.numberOfSubmissions).padStart(5)}] ${wsName.get(f.workspaceId)} / ${f.name}`
    );
  }
}

writeFileSync(
  OUT,
  JSON.stringify(
    {
      generatedFrom: "scripts/discover-review-forms.mjs",
      totals: {
        workspaces: workspaces.length,
        forms: forms.length,
        formsWithSubmissions: withSubs.length,
        inspected: toInspect.length,
        skippedLowVolume: skipped.length,
      },
      skippedLowVolume: skipped.map((f) => ({
        formName: f.name,
        workspace: wsName.get(f.workspaceId),
        submissions: f.numberOfSubmissions,
      })),
      forms: results,
    },
    null,
    2
  )
);

const cands = results.filter((r) => r.isCandidate);
const totalSubs = cands.reduce((n, r) => n + r.submissions, 0);

console.log(`\n${"=".repeat(72)}`);
console.log(`${results.length} forms inspected, ${cands.length} look like feedback/review forms`);
console.log(`${totalSubs} submissions across candidates (before the rating filter)`);
console.log(`Detail written to ${OUT}`);
