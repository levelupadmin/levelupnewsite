import raw from "@/data/reviews.json";
import {
  CATEGORIES,
  CATEGORY_BY_SLUG,
  toFiveScale,
  type CategorySlug,
  type Review,
} from "@/data/reviewCategories";

/**
 * Only approved reviews ever leave this module, so nothing reaches a page
 * without a human having said yes to it.
 */
const ALL: Review[] = ((raw as { reviews?: Review[] }).reviews ?? []).filter(
  (r) => r.approved && r.text && r.submittedAt
);

/** Newest first. The dates are the genuine Tally submission timestamps. */
const BY_DATE = [...ALL].sort(
  (a, b) => +new Date(b.submittedAt) - +new Date(a.submittedAt)
);

export function reviewsFor(category?: CategorySlug | null): Review[] {
  return category ? BY_DATE.filter((r) => r.category === category) : BY_DATE;
}

export interface Aggregate {
  count: number;
  /** Mean on the 5-point scale, one decimal. */
  average: number;
  /** Distinct programmes represented. */
  programCount: number;
  best: number;
  worst: number;
  /** Oldest and newest submission, for the "spans" line. */
  from: string | null;
  to: string | null;
}

/**
 * Computed from the published set at build time, never hand-typed.
 *
 * This covers the reviews on the page, which are the ones scoring 80 or more
 * out of 100. The page says so in as many words, and the schema carries the
 * same count, so the number a crawler cross-checks is the number it can see
 * and count for itself.
 */
export function aggregate(category?: CategorySlug | null): Aggregate {
  const set = reviewsFor(category);
  if (set.length === 0) {
    return { count: 0, average: 0, programCount: 0, best: 0, worst: 0, from: null, to: null };
  }
  const scores = set.map((r) => r.score);
  const mean = scores.reduce((a, b) => a + b, 0) / scores.length;
  const dates = set.map((r) => r.submittedAt).sort();
  return {
    count: set.length,
    average: toFiveScale(mean),
    programCount: new Set(set.map((r) => r.program)).size,
    best: toFiveScale(Math.max(...scores)),
    worst: toFiveScale(Math.min(...scores)),
    from: dates[0],
    to: dates[dates.length - 1],
  };
}

export function categoryCounts(): Record<CategorySlug, number> {
  const out = {} as Record<CategorySlug, number>;
  for (const c of CATEGORIES) out[c.slug] = reviewsFor(c.slug).length;
  return out;
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    month: "short",
    year: "numeric",
  });
}

export function formatRange(from: string | null, to: string | null): string {
  if (!from || !to) return "";
  const a = new Date(from).getFullYear();
  const b = new Date(to).getFullYear();
  return a === b ? `${a}` : `${a} to ${b}`;
}

export { CATEGORIES, CATEGORY_BY_SLUG, toFiveScale };
export type { CategorySlug, Review };
