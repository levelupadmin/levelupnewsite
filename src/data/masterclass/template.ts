/**
 * Helpers for the template masterclass pages. Pure functions, no large
 * imports, so scripts/generate-llms-txt.mjs can bundle the data files.
 */
import { OFFERINGS, formatPrice, formatRuntime, type MasterclassSlug } from "./shared";
import type { Lesson, MasterclassPageData, StoredReview } from "./types";

/** 304 -> "5:04", 1932 -> "32:12" */
export function lessonLength(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.round(seconds % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

export function totalSeconds(lessons: Lesson[]): number {
  return lessons.reduce((sum, l) => sum + l.seconds, 0);
}

/** What one hour of teaching costs, rounded to the rupee. */
export function pricePerHour(price: number, runtimeMinutes: number): string {
  return `about ${formatPrice(Math.round(price / (runtimeMinutes / 60)))}`;
}

/** The fields scripts/generate-llms-txt.mjs reads, built from OFFERINGS. */
export function courseDetailsFor(slug: MasterclassSlug): MasterclassPageData["courseDetails"] {
  const o = OFFERINGS[slug];
  return {
    chapters: o.lessons,
    duration: formatRuntime(o.runtimeMinutes),
    level: "All levels",
    language: o.language,
  };
}

/**
 * Throws during the build when a page's lesson list, runtime or price
 * disagrees with OFFERINGS, so the page, FAQ, schema and checkout cannot
 * drift apart again.
 */
export function assertFacts(d: MasterclassPageData): void {
  const o = OFFERINGS[d.slug];
  const problems: string[] = [];
  if (d.lessons.length !== o.lessons) problems.push(`${d.lessons.length} lessons listed, OFFERINGS says ${o.lessons}`);
  d.lessons.forEach((l, i) => {
    if (l.number !== i + 1) problems.push(`lesson ${i + 1} is numbered ${l.number}`);
    if (!(l.seconds > 0)) problems.push(`lesson ${l.number} has no running time`);
  });
  const minutes = Math.round(totalSeconds(d.lessons) / 60);
  if (minutes !== o.runtimeMinutes) problems.push(`lessons add up to ${minutes} min, OFFERINGS says ${o.runtimeMinutes}`);
  if (d.price !== o.price) problems.push(`price ${d.price}, OFFERINGS says ${o.price}`);
  // House style bans em dashes in our copy. Reviews are quoted as written,
  // so they are left out of the check.
  const { reviews: _quoted, ...copy } = d;
  if (/—/.test(JSON.stringify(copy))) problems.push("our copy contains an em dash");
  if (problems.length) throw new Error(`[masterclass ${d.slug}] ${problems.join("; ")}`);
}

/** Shape ReviewWall renders. Mirrors ReviewCardData in the kit. */
export interface ReviewCard {
  id: string;
  name: string;
  role?: string;
  program: string;
  score: number;
  submittedAt: string;
  text: string;
  ownCourse: boolean;
}

/**
 * Stored rows to review cards. Text, name, role, programme and date are
 * passed through unchanged; the score goes from 0-100 to 0-5, the same sum
 * scripts/approve-reviews.mjs uses.
 */
export function reviewCards(rows: StoredReview[]): ReviewCard[] {
  return rows.map((r) => ({
    id: r.tallyId,
    name: r.name.trim(),
    role: r.role?.trim() || undefined,
    program: r.program.trim(),
    score: Math.round((r.score / 20) * 10) / 10,
    submittedAt: r.submittedAt,
    text: r.text.trim(),
    ownCourse: r.ownCourse,
  }));
}
