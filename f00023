/**
 * Data for the template masterclass pages (G Venket Ram, Anthony Gonsalvez,
 * DRK Kiran), rendered by src/pages/masterclass/[slug].astro.
 *
 * Facts that every surface must agree on (price, checkout link, lesson count,
 * runtime, language) are not typed here: they come from OFFERINGS in
 * ./shared.ts, and template.ts checks at build time that the lesson list
 * adds up to them. A data file only carries what is specific to its page.
 *
 * Every line must be sourced: the course's own lesson list and descriptions,
 * VdoCipher runtimes, the founder's decisions of 17 Oct 2026, or real
 * reviews. No invented reviews, quotes, credits or numbers.
 */
import type { MasterclassSlug } from "./shared";

/** One lesson, in course order. `seconds` is the VdoCipher running time. */
export interface Lesson {
  number: number;
  title: string;
  description: string;
  seconds: number;
}

/** "What you'll know how to do": a skill and the lesson that teaches it. */
export interface Skill {
  skill: string;
  lesson?: number | number[] | string;
  detail?: string;
}

/**
 * A line from the course's transcript or subtitles, word for word. Leave
 * the list empty when no transcript exists; the "In his words" section is
 * then left out.
 */
export interface Quote {
  text: string;
  lesson?: number | string;
  note?: string;
}

export interface FAQ {
  question: string;
  answer: string;
  link?: { href: string; label: string };
}

/** A short silent loop from the course, played only while on screen. */
export interface Clip {
  title: string;
  body: string;
  /** Lessons that cover this topic. */
  lesson?: number | number[] | string;
  /** Public path to the H.264 MP4 (faststart). */
  src: string;
  /** Public path to the first frame as .jpg; a .webp sibling sits beside it. */
  poster: string;
  /** Accessible description of what the clip shows. */
  alt: string;
}

/** A film or project shown in the credits grid. */
export interface Credit {
  title: string;
  /** Public path to a .jpg with .webp and .avif siblings. */
  image: string;
  alt: string;
  note?: string;
  /** Landscape image that takes two grid cells. */
  wide?: boolean;
}

export interface IncludedItem {
  title: string;
  detail?: string;
}

export interface Comparison {
  label: string;
  value: string;
  note?: string;
  highlight?: boolean;
}

/** A row of src/data/masterclass/content/<slug>.reviews.json, as recorded. */
export interface StoredReview {
  tallyId: string;
  program: string;
  name: string;
  role?: string;
  /** 0 to 100, as stored in src/data/reviews.json. */
  score: number;
  text: string;
  submittedAt: string;
  /** True when the review is about this masterclass. */
  ownCourse: boolean;
}

/**
 * How the page adapts to the mentor's craft. `accent` tints the motif,
 * lesson numbers and section rules; the gold of the buy buttons stays the
 * same on every page.
 */
export interface Theme {
  /** Accent colour, readable on the near-black page (4.5:1 or better). */
  accent: string;
  /** RGB triplet of the accent, for translucent washes: "243 198 161". */
  accentRgb: string;
  /** Hero overlay and lesson strip style. */
  motif: "lens" | "timeline" | "blueprint";
}

export interface MasterclassPageData {
  slug: MasterclassSlug;
  /** One spelling everywhere: "G Venket Ram". */
  name: string;
  /** Craft word: "Photography". */
  discipline: string;
  /** "Teaches Photography" */
  title: string;
  theme: Theme;

  hero: {
    /** The h1. One concrete claim that names the mentor. */
    headline: string;
    /** Up to three short lines under the h1, each one claim. */
    lines: string[];
    /** Public path stem of the hero crop: `${image}-480.jpg`, `${image}-660.jpg` and siblings. */
    image: string;
    imageAlt: string;
    /** object-position for the phone crop. */
    mobilePosition?: string;
    /**
     * Where the lens motif's focus box sits, in % of the image box: x/y on
     * phones, dx/dy from 960 px up.
     */
    focus?: { x?: number; y?: number; dx?: number; dy?: number };
  };

  /** Shown exactly as written (founder's decision 9). */
  proofLine: string;

  /** One line for the closing block above the last buy button. */
  closingLine: string;

  /** Plain description for schema, llms.txt and the lessons section. */
  courseDescription: string;
  /** Kept for scripts/generate-llms-txt.mjs. Built from OFFERINGS. */
  courseDetails: {
    chapters: number;
    duration: string;
    level: string;
    language: string;
  };

  trailer: { youtubeId: string; title: string; poster: string };

  lessons: Lesson[];
  skills: Skill[];
  forYou: string[];
  notForYou: string[];
  quotes: Quote[];
  quotesNote?: string;

  clips: Clip[];
  clipsBody?: string;

  credits: { heading: string; body?: string; items: Credit[] };

  whatYouGet: IncludedItem[];
  bonuses: IncludedItem[];
  bonusHeading: string;
  /** Extra rows for "Value against price"; lesson and runtime rows are added for you. */
  valueComparisons: Comparison[];

  reviews: StoredReview[];
  reviewsBody: string;

  faqs: FAQ[];

  /** Masterclasses to show first in the cross-sell, in order. */
  crossSell: MasterclassSlug[];

  /** Same as OFFERINGS[slug].price; read by llms.txt. */
  price: number;
  ctaLabel: string;

  seo: { title: string; description: string };
  /** 1200x630 share image. */
  ogImage: string;
}
