#!/usr/bin/env node
/**
 * The curation gate. Nothing reaches the site until a review is approved
 * here, and this script only ever flips a flag: it cannot invent, reword or
 * re-date anything.
 *
 *   node scripts/approve-reviews.mjs --seed 40      pick a first batch, 40 per category
 *   node scripts/approve-reviews.mjs --list         show what is approved
 *   node scripts/approve-reviews.mjs --reject <id>  drop one back to pending
 *   node scripts/approve-reviews.mjs --approve <id> approve one by tally id
 *   node scripts/approve-reviews.mjs --reset        set everything back to pending
 *
 * Seeding is deliberately spread across programmes and across time so the
 * page reads as a real multi-year record rather than one good cohort. It
 * favours reviews with enough substance to be worth reading, and it never
 * reorders or rewrites the text.
 *
 * Page weight: each review is roughly 1KB of HTML. Keep the published total
 * under about 600 unless you are ready to paginate.
 */

import { readFileSync } from "node:fs";
import { loadAll, saveAll } from "./reviews-store.mjs";

const argv = process.argv.slice(2);
const flag = (name) => argv.includes(name);
const valueOf = (name) => {
  const i = argv.indexOf(name);
  return i === -1 ? null : argv[i + 1];
};

const reviews = loadAll();
const save = () => saveAll(reviews);

const summary = () => {
  const on = reviews.filter((r) => r.approved);
  const byCat = {};
  for (const r of on) byCat[r.category] = (byCat[r.category] || 0) + 1;
  console.log(`${on.length} approved of ${reviews.length} on file`);
  for (const [c, n] of Object.entries(byCat)) console.log(`   ${c.padEnd(16)} ${n}`);
  if (on.length) {
    const avg = on.reduce((a, r) => a + r.score, 0) / on.length / 20;
    console.log(`   average ${avg.toFixed(2)}/5 across ${new Set(on.map((r) => r.program)).size} programmes`);
  }
};

if (flag("--list")) {
  summary();
  process.exit(0);
}

if (flag("--reset")) {
  for (const r of reviews) r.approved = false;
  save();
  console.log("All reviews set back to pending.");
  process.exit(0);
}

for (const [name, value] of [
  ["--approve", true],
  ["--reject", false],
]) {
  const id = valueOf(name);
  if (!id) continue;
  const r = reviews.find((x) => x.tallyId === id);
  if (!r) {
    console.error(`No review with tallyId ${id}`);
    process.exit(1);
  }
  r.approved = value;
  save();
  console.log(`${id} ${value ? "approved" : "rejected"} (${r.program})`);
  process.exit(0);
}

if (flag("--seed")) {
  const perCategory = Number(valueOf("--seed")) || 40;

  // Enough prose to be worth reading, not so much that it stops being a quote.
  const usable = (r) => r.text.length >= 120 && r.text.length <= 900 && r.name;

  const byCategory = {};
  for (const r of reviews) (byCategory[r.category] ??= []).push(r);

  let picked = 0;
  for (const [category, all] of Object.entries(byCategory)) {
    const pool = all.filter(usable);

    // Round-robin across programmes so one big cohort cannot fill the page,
    // and within a programme take newest first.
    const byProgram = {};
    for (const r of pool) (byProgram[r.program] ??= []).push(r);
    for (const list of Object.values(byProgram)) {
      list.sort((a, b) => +new Date(b.submittedAt) - +new Date(a.submittedAt));
    }

    const queues = Object.values(byProgram);
    const chosen = [];
    for (let round = 0; chosen.length < perCategory; round++) {
      const before = chosen.length;
      for (const q of queues) {
        if (chosen.length >= perCategory) break;
        if (q[round]) chosen.push(q[round]);
      }
      if (chosen.length === before) break; // pool exhausted
    }

    for (const r of chosen) r.approved = true;
    picked += chosen.length;
    console.log(
      `${category.padEnd(16)} ${String(chosen.length).padStart(4)} approved from ${pool.length} usable across ${queues.length} programmes`
    );
  }

  save();
  console.log(`\n${picked} reviews approved.\n`);
  summary();
  process.exit(0);
}

console.log(readFileSync(new URL(import.meta.url), "utf8").split("*/")[0]);
summary();
