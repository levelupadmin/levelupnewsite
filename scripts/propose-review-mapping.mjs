#!/usr/bin/env node
/**
 * Turn a discovery run into a proposed src/data/reviewForms.json.
 *
 * The rules below are the bucketing the owner confirms once. Anything the
 * rules cannot place is written with "category": null, which the pull script
 * refuses to touch, so an unplaced form fails loudly rather than landing in
 * the wrong bucket.
 *
 * Run: node scripts/discover-review-forms.mjs   (first, writes the sweep)
 *      node scripts/propose-review-mapping.mjs  (then, writes the proposal)
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";

const IN = "scripts/.tally-discovery.json";
const OUT = "src/data/reviewForms.json";

if (!existsSync(IN)) {
  console.error(`${IN} not found. Run: node scripts/discover-review-forms.mjs`);
  process.exit(1);
}

/** Only forms whose own name says they collect feedback. An application form
 *  that happens to contain a rating question is not a review form. */
const IS_FEEDBACK = /feedback|review|testimonial|wall of love/i;

const RULES = [
  // Offline residencies and bootcamps.
  { category: "forge", test: /forge/i },
  // On-demand masterclasses.
  { category: "online-programs", test: /masterclass/i },
  // Live cohorts and the live workshop/webinar ladder that feeds them.
  {
    category: "levelup",
    test: /\bbfp\b|breakthrough|mastery program|academy|\blive\b|cohort|huddle|circles|workshop|webinar|batch|edition|101|bootcamp/i,
  },
  // Everything else that collects feedback is a live LevelUp session: the
  // guest-led "Let's Learn ... Ft. X" talks, the film "Decoded" breakdowns
  // and the Screening Days. Confirmed by Rahul, 29 Jul 2026.
  { category: "levelup", test: /./ },
];

/** Strip the boilerplate so the card shows a programme, not a form name. */
function programName(formName) {
  let n = String(formName || "").trim();
  n = n.replace(/^feedback\s*(form)?\s*[-–—:]\s*/i, "");
  n = n.replace(/\s*[-–—]?\s*feedback\s*(form)?\s*$/i, "");
  n = n.replace(/\s*by LevelUp Learning\s*/i, " ");
  n = n.replace(/^LevelUp Learning'?s?\s*[-–—]?\s*/i, "");
  n = n.replace(/\s*[-–—]\s*(Edition|Batch|E)\s*\d+.*$/i, "");
  n = n.replace(/\s*(Edition|Batch)\s*\d+\s*$/i, "");
  n = n.replace(/^the\s+/i, "");
  n = n.replace(/[#*`]/g, "");
  n = n.replace(/\s{2,}/g, " ").trim();
  return n || String(formName || "").trim();
}

const data = JSON.parse(readFileSync(IN, "utf8"));
const candidates = (data.forms ?? []).filter(
  (f) => f.isCandidate && IS_FEEDBACK.test(f.formName || "")
);

const rows = candidates
  .map((f) => {
    const rule = RULES.find((r) => r.test.test(f.formName || ""));
    return {
      formId: f.formId,
      formName: f.formName,
      program: programName(f.formName),
      category: rule?.category ?? null,
      submissions: f.submissions,
    };
  })
  .sort((a, b) => b.submissions - a.submissions);

const placed = rows.filter((r) => r.category);
const unplaced = rows.filter((r) => !r.category);

// Preserve any category a human already decided on a previous pass.
if (existsSync(OUT)) {
  const prev = JSON.parse(readFileSync(OUT, "utf8"));
  const prevById = new Map((prev.forms ?? []).map((f) => [f.formId, f]));
  for (const r of rows) {
    const p = prevById.get(r.formId);
    if (p?.category) {
      r.category = p.category;
      if (p.program) r.program = p.program;
    }
  }
}

writeFileSync(
  OUT,
  JSON.stringify(
    {
      _comment:
        "Tally form id -> review category and the programme name shown on the card. Proposed by scripts/propose-review-mapping.mjs, confirmed by a human. category: null means undecided; the pull script skips those. Categories: forge | levelup | online-programs.",
      forms: rows,
    },
    null,
    2
  )
);

const bucket = (c) => rows.filter((r) => r.category === c);
const subs = (rs) => rs.reduce((n, r) => n + (r.submissions || 0), 0);

console.log(`${rows.length} feedback forms, ${subs(rows).toLocaleString()} submissions\n`);
for (const c of ["forge", "levelup", "online-programs"]) {
  const b = bucket(c);
  console.log(`  ${c.padEnd(16)} ${String(b.length).padStart(4)} forms  ${subs(b).toLocaleString().padStart(7)} submissions`);
}
console.log(`  ${"(undecided)".padEnd(16)} ${String(unplaced.length).padStart(4)} forms  ${subs(unplaced).toLocaleString().padStart(7)} submissions`);
console.log(`\nWrote ${OUT}`);
if (unplaced.length) {
  console.log(`\n${unplaced.length} forms need a category before they can be pulled:`);
  for (const r of unplaced.slice(0, 40)) {
    console.log(`   ${String(r.submissions).padStart(5)}  ${r.formName.slice(0, 66)}`);
  }
}
