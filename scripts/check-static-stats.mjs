#!/usr/bin/env node
/**
 * Pre-deploy guard: every number a visitor sees must also be in the HTML we
 * ship, because LLM crawlers read server-rendered text and mostly do not run
 * JS. Counters that hydrate from 0 used to make the homepage tell crawlers
 * "0+ Learners" while the meta description claimed 18,000+.
 *
 * Fails the build if a stat label in dist/ is preceded by a zero value.
 *
 * Run: node scripts/check-static-stats.mjs
 */

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const DIST = "dist";

// Labels that sit next to a counter. Matched case-insensitively against the
// text immediately following a number.
const STAT_LABELS = [
  "learner",
  "creator",
  "rating",
  "city",
  "cities",
  "collaboration",
  "student",
  "mentor",
  "country",
  "countries",
  "community",
  "review",
  "graduate",
  "alumni",
];

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) walk(full, out);
    else if (entry.endsWith(".html")) out.push(full);
  }
  return out;
}

/** Strip scripts, styles and comments, then reduce tags to a single space. */
function visibleText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ");
}

// "0+ Learners", "0 + Learners", "0.00 Rating", "0.0/5 Rating"
const LABELS_RE = STAT_LABELS.join("|");
// The 0 must not be the tail of another number: "4.0 Mentor explained..." on
// the reviews page is a rating followed by a review, not a zero-valued stat.
const ZERO_STAT = new RegExp(
  String.raw`(?<![\d.,])0(?:[.,]0+)?\s*(?:\+|%|\/\s*\d+)?\s*(?:${LABELS_RE})\w*`,
  "gi"
);

const files = walk(DIST);
const failures = [];

for (const file of files) {
  const text = visibleText(readFileSync(file, "utf8"));
  const hits = text.match(ZERO_STAT);
  if (hits) {
    failures.push({ file: relative(DIST, file), hits: [...new Set(hits)] });
  }
}

if (failures.length > 0) {
  console.error("\nZero-valued stats found in the static build.\n");
  console.error(
    "These render as 0 to any crawler that does not run JS. Give the\n" +
      "component its real value as initial state and animate on the client\n" +
      "only (see src/components/AnimatedCounter.tsx).\n"
  );
  for (const { file, hits } of failures) {
    console.error(`  ${file}`);
    for (const hit of hits) console.error(`      ${hit.trim()}`);
  }
  console.error(`\n${failures.length} page(s) affected.\n`);
  process.exit(1);
}

console.log(`check-static-stats: ${files.length} pages, no zero-valued stats.`);
