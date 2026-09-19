/**
 * The one place the review taxonomy is defined.
 *
 * Three buckets, using the owner's wording. Every Tally form that feeds the
 * reviews page maps to exactly one of them. The form-to-category mapping
 * lives in reviewForms.json so the pull script and the site read the same
 * file; edit that to re-bucket a programme.
 */

import formConfig from "./reviewForms.json";

export type CategorySlug = "forge" | "levelup" | "online-programs";

export interface ReviewCategory {
  slug: CategorySlug;
  /** Filter tab and page heading. */
  label: string;
  /** One line under the heading. Plain words, no marketing. */
  blurb: string;
}

export const CATEGORIES: ReviewCategory[] = [
  {
    slug: "forge",
    label: "Forge Experiences",
    blurb:
      "Offline residencies and bootcamps: Forge Writing, Filmmaking, AI and Creators.",
  },
  {
    slug: "levelup",
    label: "LevelUp Experiences",
    blurb:
      "Live cohort programmes taught over weeks, with feedback on your own work.",
  },
  {
    slug: "online-programs",
    label: "Online Program Experiences",
    blurb:
      "On-demand masterclasses from working directors, editors and cinematographers.",
  },
];

export const CATEGORY_BY_SLUG = new Map(CATEGORIES.map((c) => [c.slug, c]));

export interface FormMapping {
  formId: string;
  formName: string;
  /** Programme name shown on the review card. */
  program: string;
  category: CategorySlug;
}

export const FORM_MAP = (formConfig.forms ?? []) as FormMapping[];

/** One published review. `tallyId` is kept for auditability and never rendered. */
export interface Review {
  tallyId: string;
  formId: string;
  program: string;
  category: CategorySlug;
  /** First name plus last initial unless a full name was explicitly approved. */
  name: string;
  /** What the student answered to "what do you do", where the form asked. */
  role?: string;
  /** Rating normalised to 0-100 across every source scale. */
  score: number;
  text: string;
  /** The genuine Tally submission timestamp. Never shifted or invented. */
  submittedAt: string;
  /** Public profile the reviewer agreed to link. Populated by hand over time. */
  profileUrl?: string;
  approved: boolean;
}

/** 0-100 to the 5-point scale the page and the schema both display. */
export function toFiveScale(score: number): number {
  return Math.round((score / 20) * 10) / 10;
}
