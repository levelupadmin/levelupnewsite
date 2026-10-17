/** Shared prop shapes for the masterclass kit. */

export interface CtaProps {
  href: string;
  label: string;
  price?: number;
  /** data-mc-cta value, e.g. "fit", "price-card". */
  placement?: string;
  course?: string;
  /** Show the refund line under the button. Default true. */
  refund?: boolean;
}

export interface SkillItem {
  /** What the buyer will be able to do. */
  skill: string;
  /** Lesson number, numbers, or your own label ("Lessons 2 to 5"). */
  lesson?: number | number[] | string;
  detail?: string;
}

export interface QuoteItem {
  /** Exact words from a course transcript or its subtitles. */
  text: string;
  lesson?: number | string;
  /** e.g. "Translated from Tamil". */
  note?: string;
}

export interface IncludedItem {
  title: string;
  detail?: string;
}

export interface BonusItem {
  title: string;
  detail?: string;
  /** Stated value, e.g. "Worth ₹999". Optional. */
  value?: string;
}

export interface Comparison {
  label: string;
  value: string;
  note?: string;
  /** Gold value, for the row that is this course. */
  highlight?: boolean;
}

export interface FilmItem {
  src: string;
  title: string;
  year?: number | string;
  alt?: string;
  /** e.g. "Lessons 7, 9 and 17" or "Music director". */
  note?: string;
  /** Pass false for images under 8 KB (no AVIF/WebP siblings). */
  siblings?: boolean;
}

export interface FaqItem {
  question: string;
  answer: string;
  link?: { href: string; label: string };
}

/** "Lesson 13", "Lessons 14 and 17", "Lessons 2, 3 and 5", or the string as given. */
export function lessonLabel(lesson: number | number[] | string | undefined): string | undefined {
  if (lesson === undefined || lesson === null || lesson === "") return undefined;
  if (typeof lesson === "string") return lesson;
  if (typeof lesson === "number") return `Lesson ${lesson}`;
  if (lesson.length === 0) return undefined;
  if (lesson.length === 1) return `Lesson ${lesson[0]}`;
  const head = lesson.slice(0, -1).join(", ");
  return `Lessons ${head} and ${lesson[lesson.length - 1]}`;
}
