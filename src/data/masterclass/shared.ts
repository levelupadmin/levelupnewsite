/**
 * Facts every masterclass page shares, in one place.
 *
 * The refund rule, the checkout links, prices, languages and course lengths
 * used to be typed into each page, the FAQ and the JSON-LD separately, and
 * they drifted apart. Pages, FAQs, schema and the kit components in
 * src/components/masterclass/ read them from here instead.
 *
 * This file must stay light: React islands may import it for a checkout URL,
 * so it never imports reviews.json or any other large data file. Review
 * selection lives in src/components/masterclass/reviewPicks.ts.
 */

export type MasterclassSlug =
  | "nelson-dilipkumar"
  | "lokesh-kanagaraj"
  | "ravi-basrur"
  | "karthik-subbaraj"
  | "g-venket-ram"
  | "anthony-gonsalvez"
  | "drk-kiran";

export const CHECKOUT_BASE = "https://app.leveluplearning.in/checkout/";

/* ------------------------------------------------------------------ */
/* Refund rule                                                         */
/* ------------------------------------------------------------------ */

/**
 * The one refund rule. Every page, FAQ answer and price card uses these
 * strings; do not retype the rule anywhere else.
 */
export const REFUND = {
  days: 7,
  /** Full sentence for price cards, FAQ answers and the checkout. */
  sentence:
    "Full refund within 7 days of buying, if you have watched less than a quarter of the course.",
  /** Short form for tight spots: under a button, the facts strip. */
  short: "Full refund within 7 days if you've watched less than a quarter.",
  href: "/refund-policy",
  linkLabel: "Refund policy",
  email: "support@leveluplearning.in",
} as const;

/** The three steps the "Try it for 7 days" section shows by default. */
export const TRY_IT_STEPS = [
  { title: "Buy it", body: "Start watching straight away. Watch up to a quarter of the course." },
  { title: "Not for you?", body: `Email ${REFUND.email} within 7 days of buying.` },
  { title: "Get it all back", body: "You get the full amount back." },
] as const;

/* ------------------------------------------------------------------ */
/* Offerings                                                           */
/* ------------------------------------------------------------------ */

export interface Offering {
  slug: MasterclassSlug;
  /** Instructor's name as the page prints it. */
  instructor: string;
  /** Short craft word for cross-sell cards and schema. */
  craft: string;
  /** Course name for schema and tracking. */
  courseName: string;
  /** App offering id; the checkout URL is built from it. */
  offeringId: string;
  checkoutUrl: string;
  /** Price in INR, GST included, paid once. */
  price: number;
  /** Language line as buyers read it. */
  language: string;
  /** BCP 47 codes for schema `inLanguage`. First is the spoken language. */
  inLanguage: string[];
  /** Lesson count the page sells. */
  lessons: number;
  /** Total runtime in minutes. */
  runtimeMinutes: number;
  /** Set when a fact still needs a human to confirm it. Shown to no one. */
  verify?: string;
}

function offering(o: Omit<Offering, "checkoutUrl">): Offering {
  return { ...o, checkoutUrl: `${CHECKOUT_BASE}${o.offeringId}` };
}

/**
 * Lessons and runtimes are the real figures from PR #29 (VdoCipher), except
 * Nelson, which is sold as 29 lessons and 2 h 20 min (founder's decision,
 * 17 Oct 2026).
 */
export const OFFERINGS: Record<MasterclassSlug, Offering> = {
  "nelson-dilipkumar": offering({
    slug: "nelson-dilipkumar",
    instructor: "Nelson Dilipkumar",
    craft: "Writing and direction",
    courseName: "Nelson Dilipkumar Filmmaking Masterclass",
    offeringId: "190a09ee-3f34-4242-ad9f-70ddedcc8eae",
    price: 2499,
    language: "Tamil, with English subtitles",
    inLanguage: ["ta", "en"],
    lessons: 29,
    runtimeMinutes: 140,
  }),
  "lokesh-kanagaraj": offering({
    slug: "lokesh-kanagaraj",
    instructor: "Lokesh Kanagaraj",
    craft: "Writing and direction",
    courseName: "Lokesh Kanagaraj Filmmaking Masterclass",
    offeringId: "895128ba-068a-41b0-91c9-6326d2c58a4d",
    price: 1499,
    language: "Tamil, with English subtitles",
    inLanguage: ["ta", "en"],
    lessons: 15,
    runtimeMinutes: 94,
  }),
  "ravi-basrur": offering({
    slug: "ravi-basrur",
    instructor: "Ravi Basrur",
    craft: "Film music",
    courseName: "Ravi Basrur Music Masterclass",
    offeringId: "c95d0a25-b6a4-479c-a213-2c99cc2a57be",
    price: 2499,
    language: "Kannada, with English subtitles",
    inLanguage: ["kn", "en"],
    lessons: 16,
    runtimeMinutes: 310,
    verify: "Audit counts 15 lessons and 5 h 12 min in VdoCipher; the page lists 16 and 5 h 10 min.",
  }),
  "karthik-subbaraj": offering({
    slug: "karthik-subbaraj",
    instructor: "Karthik Subbaraj",
    craft: "Filmmaking",
    courseName: "Karthik Subbaraj Filmmaking Masterclass",
    offeringId: "a12026ce-d878-4f00-9ffd-820511cdcd54",
    price: 2499,
    language: "Tamil, with English subtitles",
    inLanguage: ["ta", "en"],
    lessons: 24,
    runtimeMinutes: 184,
  }),
  "g-venket-ram": offering({
    slug: "g-venket-ram",
    instructor: "G Venket Ram",
    craft: "Photography",
    courseName: "G Venket Ram Photography Masterclass",
    offeringId: "d9084740-4d74-449c-a667-03de38d4a0d5",
    price: 2499,
    language: "Tamil and English, with English subtitles",
    inLanguage: ["ta", "en"],
    lessons: 21,
    runtimeMinutes: 139,
    verify: "Language comes from the page FAQ; the app stores `en`.",
  }),
  "anthony-gonsalvez": offering({
    slug: "anthony-gonsalvez",
    instructor: "Anthony Gonsalvez",
    craft: "Film editing",
    courseName: "Anthony Gonsalvez Editing Masterclass",
    offeringId: "7bebcde3-fef9-4431-b7f8-e9f933a739eb",
    price: 1999,
    language: "English, with English subtitles",
    inLanguage: ["en"],
    lessons: 19,
    runtimeMinutes: 183,
  }),
  "drk-kiran": offering({
    slug: "drk-kiran",
    instructor: "DRK Kiran",
    craft: "Art direction",
    courseName: "DRK Kiran Art Direction Masterclass",
    offeringId: "b057ed17-a520-4192-8699-f0ba62cf1d32",
    price: 999,
    language: "Tamil and English",
    inLanguage: ["ta", "en"],
    lessons: 20,
    runtimeMinutes: 112,
    verify: "Language comes from the data file; no page or FAQ states it yet.",
  }),
};

export const MASTERCLASS_SLUGS = Object.keys(OFFERINGS) as MasterclassSlug[];

export function getOffering(slug: string): Offering | undefined {
  return (OFFERINGS as Record<string, Offering>)[slug];
}

export function checkoutUrl(slug: MasterclassSlug): string {
  return OFFERINGS[slug].checkoutUrl;
}

/* ------------------------------------------------------------------ */
/* Formatting                                                          */
/* ------------------------------------------------------------------ */

/** 2499 -> "₹2,499" */
export function formatPrice(inr: number): string {
  return `₹${inr.toLocaleString("en-IN")}`;
}

/** 140 -> "2 h 20 min", 45 -> "45 min", 120 -> "2 h" */
export function formatRuntime(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = Math.round(minutes % 60);
  if (h === 0) return `${m} min`;
  if (m === 0) return `${h} h`;
  return `${h} h ${m} min`;
}

/** 140 -> "PT2H20M" for schema courseWorkload / timeRequired. */
export function isoDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = Math.round(minutes % 60);
  return `PT${h ? `${h}H` : ""}${m || !h ? `${m}M` : ""}`;
}

/** Rounded price per lesson, for the "Value against price" section. */
export function pricePerLesson(price: number, lessons: number): number {
  return Math.round(price / Math.max(1, lessons));
}

/* ------------------------------------------------------------------ */
/* Schema                                                              */
/* ------------------------------------------------------------------ */

/**
 * The fields courseJsonLd needs beyond name and description, read from the
 * facts above so the schema can never disagree with the page.
 *
 *   courseJsonLd({ name, description, path, ...courseSchemaFields("nelson-dilipkumar") })
 */
export function courseSchemaFields(slug: MasterclassSlug) {
  const o = OFFERINGS[slug];
  return {
    instructorName: o.instructor,
    inLanguage: o.inLanguage.length === 1 ? o.inLanguage[0] : o.inLanguage,
    courseWorkload: isoDuration(o.runtimeMinutes),
    offers: {
      price: o.price,
      priceCurrency: "INR",
      url: o.checkoutUrl,
      availability: "https://schema.org/InStock",
      category: "Paid",
    },
  };
}

/* ------------------------------------------------------------------ */
/* Shared FAQ answers                                                  */
/* ------------------------------------------------------------------ */

export interface SharedFaq {
  question: string;
  answer: string;
  link?: { href: string; label: string };
}

/**
 * FAQ answers that are the same on every page. Spread the ones you need into
 * the page's FAQ list; FAQAccordion and FaqList both render `link`.
 */
export const SHARED_FAQ = {
  refund: {
    question: "What if it's not for me?",
    answer: `Email ${REFUND.email} within 7 days of buying. If you have watched less than a quarter of the course, you get the full amount back.`,
    link: { href: REFUND.href, label: REFUND.linkLabel },
  },
  access: {
    question: "How long do I keep access?",
    answer: "For life. You pay once. There is no subscription and nothing renews.",
  },
  devices: {
    question: "Where do I watch it?",
    answer:
      "In the LevelUp app or website, on your phone, tablet or laptop. Lessons stream; they cannot be downloaded.",
  },
} satisfies Record<string, SharedFaq>;

/** One-line price note for price cards. */
export function priceNote(price: number): string {
  return `One payment of ${formatPrice(price)}. GST included.`;
}
