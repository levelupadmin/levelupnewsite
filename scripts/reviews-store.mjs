/**
 * Where reviews live on disk, and why there are two files.
 *
 * The pulled corpus is about 7,000 reviews. Kept as one pretty-printed JSON
 * file it was 2.9MB in the working tree, which is a lot to carry in a repo
 * that syncs to a third party, and all but a few hundred of those rows are
 * candidates nobody has looked at yet.
 *
 * So it is split:
 *
 *   src/data/reviews.json           approved only, pretty-printed, ~70KB.
 *                                   The site imports this and nothing else,
 *                                   so the build never reads the full corpus.
 *
 *   src/data/reviews.archive.json.gz  the whole pulled corpus, minified and
 *                                   gzipped, ~560KB. Only the scripts touch
 *                                   it. This is the pool you approve from.
 *
 * Approvals live in the approved file, so the archive can be deleted and
 * re-pulled without losing a single editorial decision.
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { gzipSync, gunzipSync } from "node:zlib";

export const APPROVED_FILE = "src/data/reviews.json";
export const ARCHIVE_FILE = "src/data/reviews.archive.json.gz";
export const STATS_FILE = "src/data/reviewStats.json";

const APPROVED_NOTE =
  "Approved reviews only. Written by scripts/approve-reviews.mjs. This is the file the site imports. The full pulled corpus lives in reviews.archive.json.gz; use scripts/approve-reviews.mjs to move rows between them. Never edit submittedAt, score or tallyId by hand.";

const ARCHIVE_NOTE =
  "Every review pulled from Tally, approved or not. Written by scripts/pull-reviews.mjs. Gzipped because it is large and no page reads it: only the scripts do.";

/** Every review on disk, approved and pending, keyed by tallyId. */
export function loadAll() {
  const byId = new Map();

  if (existsSync(ARCHIVE_FILE)) {
    const raw = JSON.parse(gunzipSync(readFileSync(ARCHIVE_FILE)).toString("utf8"));
    for (const r of raw.reviews ?? []) byId.set(r.tallyId, r);
  }

  // The approved file wins: it carries the editorial decisions and any
  // hand-edited name or profileUrl.
  if (existsSync(APPROVED_FILE)) {
    const raw = JSON.parse(readFileSync(APPROVED_FILE, "utf8"));
    for (const r of raw.reviews ?? []) byId.set(r.tallyId, { ...r, approved: true });
  }

  return [...byId.values()];
}

function byNewest(a, b) {
  return new Date(b.submittedAt) - new Date(a.submittedAt);
}

export function saveAll(reviews, { pulledAt } = {}) {
  const sorted = [...reviews].sort(byNewest);
  const approved = sorted.filter((r) => r.approved);

  writeFileSync(
    APPROVED_FILE,
    JSON.stringify({ _comment: APPROVED_NOTE, reviews: approved }, null, 2) + "\n"
  );

  writeFileSync(
    ARCHIVE_FILE,
    gzipSync(
      Buffer.from(
        JSON.stringify({
          _comment: ARCHIVE_NOTE,
          pulledAt: pulledAt ?? new Date().toISOString(),
          reviews: sorted,
        })
      ),
      { level: 9 }
    )
  );

  writeStats(approved);
  return { total: sorted.length, approved: approved.length };
}

/** Headline numbers for the homepage, so it never states a figure /reviews
 *  would contradict. Small enough to sit in the client bundle. */
export function writeStats(approved) {
  const average = approved.length
    ? Math.round((approved.reduce((a, r) => a + r.score, 0) / approved.length / 20) * 10) / 10
    : 0;
  writeFileSync(
    STATS_FILE,
    JSON.stringify(
      {
        _comment:
          "Generated from the approved set by scripts/approve-reviews.mjs. Do not edit by hand: the homepage renders these and /reviews recomputes the same figures, so a hand edit shows up as a contradiction between the two pages.",
        count: approved.length,
        average,
        programCount: new Set(approved.map((r) => r.program)).size,
      },
      null,
      2
    ) + "\n"
  );
}
