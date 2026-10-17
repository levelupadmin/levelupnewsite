/**
 * Copy and data for /masterclass/nelson-dilipkumar.
 *
 * Facts that every page shares (price, checkout, lessons, runtime, language,
 * refund rule) live in src/data/masterclass/shared.ts. This file holds what
 * only the Nelson page says.
 *
 * Sources
 * - Lesson titles 1 to 24: the hosted video titles in VdoCipher, as rewritten
 *   in the 17 Oct 2026 audit (nelson-copy.md 4.3). Lessons 25 to 29: the
 *   transcripts EP_25 to EP_29 in "Nelson Dilipkumar Masterclass/Transcripts".
 * - Lesson numbers on films, skills and quotes: checked against the same
 *   transcripts (EP_NN = lesson NN).
 * - Films and release dates: scratchpad films.json (Wikipedia and TMDB,
 *   checked 17 Oct 2026). Jailer 2 opened on 15 Oct 2026.
 * - Reviews and quotes: nelson-dilipkumar.reviews.json and
 *   nelson-dilipkumar.quotes.json in this folder, copied verbatim.
 *
 * Founder's decisions, 17 Oct 2026: sell 29 lessons and 2 h 20 min, list
 * all 29, keep the certificate claim, bonuses go to every buyer, no timer,
 * no strike price.
 */
import type { FaqItem, IncludedItem, BonusItem, SkillItem, QuoteItem, Comparison } from "@/components/masterclass/types";
import type { ReviewCardData } from "@/components/masterclass/reviewPicks";
import reviewsData from "./nelson-dilipkumar.reviews.json";
import quotesData from "./nelson-dilipkumar.quotes.json";

export const SLUG = "nelson-dilipkumar" as const;

const ASSET = "/masterclass/nelson";

/* ------------------------------------------------------------------ */
/* Media                                                               */
/* ------------------------------------------------------------------ */

/** Frame at 1.0 s of the hero loop: Nelson in the red chair. */
export const HERO = {
  mobile: {
    stem: `${ASSET}/nelson-hero-m`,
    width: 720,
    height: 908,
    video: `${ASSET}/nelson-hero-m.mp4`,
  },
  desktop: {
    stem: `${ASSET}/nelson-hero-d`,
    width: 1280,
    height: 920,
    video: `${ASSET}/nelson-hero-d.mp4`,
  },
  alt: "Nelson Dilipkumar in a red chair, in front of stills from his films",
  /** Schema and share image. */
  schemaImage: `${ASSET}/nelson-hero-d.jpg`,
} as const;

export const TRAILER = {
  ytId: "km7nB-tf1FE",
  title: "Nelson Dilipkumar Teaches Filmmaking, official trailer",
  alt: "Nelson Dilipkumar masterclass trailer",
  caption: "Official trailer. Tap to play.",
} as const;

export const ON_SET = {
  src: `${ASSET}/nelson-on-set.jpg`,
  alt: "Nelson Dilipkumar directing a scene on the Kolamaavu Kokila set",
  width: 1200,
  height: 800,
} as const;

export const CERTIFICATE = {
  src: `${ASSET}/nelson-certificate.jpg`,
  alt: "Sample Certificate of Completion for the Nelson Dilipkumar masterclass",
  width: 1085,
  height: 484,
} as const;

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

/** Hero variant A from the audit (3.3), the live hero. */
export const HERO_COPY = {
  kicker: "From the director of Jailer 2",
  eyebrow: "For anyone who wants to write or direct films",
  h1: "Kolamaavu Kokila. Doctor. Beast. Jailer.",
  h1Line2: "Nelson shows you how he made them.",
  subs: ["29 lessons in Tamil, with English subtitles.", "Most run 2 to 6 minutes. Watch them on your phone."],
  /** Founder's decision 13. */
  proof: "560+ people have bought this masterclass",
} as const;

/** Button labels by place (audit 3.1, "Buttons"). */
export const CTA_LABELS = {
  hero: "Watch all 29 lessons",
  priceCard: "Get the masterclass",
  films: "See how he made them",
  try: "Start watching",
  closing: "Start watching",
  sticky: "Get the masterclass",
} as const;

/* ------------------------------------------------------------------ */
/* Films                                                               */
/* ------------------------------------------------------------------ */

export interface NelsonFilm {
  title: string;
  year: number;
  stem: string;
  note: string;
  isNew?: boolean;
}

/**
 * Newest first. Lessons named here are the ones whose transcript covers the
 * film. Jailer 2 is listed because it is his newest film (the founder asked
 * for it), but its note says plainly that only lesson 13 touches it, so the
 * card does not imply Jailer 2 lessons (QA POLICY-07).
 */
export const FILMS: NelsonFilm[] = [
  {
    title: "Jailer 2",
    year: 2026,
    stem: `${ASSET}/film-jailer-2`,
    note: "In cinemas now. Not a lesson topic; lesson 13 tells how one scene kept him stuck for two months.",
    isNew: true,
  },
  { title: "Jailer", year: 2023, stem: `${ASSET}/film-jailer`, note: "Lessons 14, 18 and 26" },
  { title: "Beast", year: 2022, stem: `${ASSET}/film-beast`, note: "Lessons 15 and 17" },
  { title: "Doctor", year: 2021, stem: `${ASSET}/film-doctor`, note: "Lessons 10 and 16" },
  { title: "Kolamaavu Kokila", year: 2018, stem: `${ASSET}/film-kolamaavu-kokila`, note: "Lessons 7, 9 and 17" },
];

/* ------------------------------------------------------------------ */
/* Sample: three ideas, each with a short clip of Nelson               */
/* ------------------------------------------------------------------ */

export const IDEAS = [
  {
    label: "The route in",
    text: "He didn't know how to get an assistant director's job. He started at Vijay TV and went on to direct Rajinikanth.",
    lesson: "Lessons 2 to 5",
    stem: `${ASSET}/nelson-idea-1`,
    video: `${ASSET}/nelson-idea-1.mp4`,
  },
  {
    label: "The calm set",
    text: "A calm director gets better work. On a shoot, 300 people wait for your call.",
    lesson: "Lesson 24",
    stem: `${ASSET}/nelson-idea-2`,
    video: `${ASSET}/nelson-idea-2.mp4`,
  },
  {
    label: "The tone",
    text: "A serious story can make people laugh. Doctor is a kidnapping told in a quirky tone.",
    lesson: "Lesson 10",
    stem: `${ASSET}/nelson-idea-3`,
    video: `${ASSET}/nelson-idea-3.mp4`,
  },
] as const;

/* ------------------------------------------------------------------ */
/* Lessons: all 29                                                     */
/* ------------------------------------------------------------------ */

export interface Lesson {
  n: number;
  title: string;
  line: string;
}

export const LESSONS: Lesson[] = [
  { n: 1, title: "Why I teach filmmaking", line: "There is no single way to make a film. This is Nelson's; keep what helps you." },
  { n: 2, title: "How I got into cinema by accident", line: "He planned to be an engineer and barely watched films as a boy." },
  { n: 3, title: "Photography and my first visual lessons", line: "How Visual Communication classes taught him what a shot is." },
  { n: 4, title: "From Vijay TV to cinema", line: "He did not know how to become an assistant director, so he made his own opening at Vijay TV." },
  { n: 5, title: "How I watch films, sometimes on mute", line: "He missed most films from 1995 to 2004. How he studies a film now." },
  { n: 6, title: "The directors who shaped me", line: "Director Sridhar's films, told to him by his father in five minutes, and Mani Ratnam." },
  { n: 7, title: "Cracking Kolamaavu Kokila", line: "How to hold an audience for two and a half hours without a hero's entry." },
  { n: 8, title: "Find what you are good at", line: "Name your own talent, then work on it every day." },
  { n: 9, title: "Where the Kolamaavu Kokila idea came from", line: "An innocent-looking girl inside a drug cartel." },
  { n: 10, title: "Doctor: a serious story in a quirky tone", line: "A kidnapping plot told so the audience laughs." },
  { n: 11, title: "How to narrate your story", line: "Make a hero or producer see the film you see in your head." },
  { n: 12, title: "Practise narration like a skill", line: "Even with listeners who refuse to react." },
  { n: 13, title: "My writing process: five lines first", line: "Lock the story in five lines, fix the big turns, then write scene by scene." },
  { n: 14, title: "Designing characters people remember", line: "Why the character matters more than the plot, from Tom and Jerry to Rajinikanth." },
  { n: 15, title: "The Beast opening and the corridor fight", line: "Veera Raghavan's guilt, the low-light corridor, the camera on a ceiling track." },
  { n: 16, title: "Staging Doctor's interval block", line: "The longest lesson in the course, on one sequence from Doctor." },
  { n: 17, title: "Character arcs across my films", line: "Kokila does not know her strength. Doctor hides his. Beast shows it in the first scene." },
  { n: 18, title: "The Jailer flip", line: "Everyone knows he will change. The craft is choosing what makes him change." },
  { n: 19, title: "Dialogue that does not sound regular", line: "He writes his own lines and tests them on his assistant directors." },
  { n: 20, title: "Take every suggestion, then decide", line: "Hear everyone out; keep what is valid." },
  { n: 21, title: "From budget to set design", line: "Write within the budget, then build the set around the scene." },
  { n: 22, title: "Why I skip storyboards", line: "Lock 10 shots on paper and the crew stops thinking. Storyboards only for VFX." },
  { n: 23, title: "Briefing my team in pre-production", line: "How he gets ideas from the DOP, art director and costume designer." },
  { n: 24, title: "Keeping the shoot happy", line: "300 people wait for your call. Arrive with the answers." },
  { n: 25, title: "Visuals come first", line: "Respect the frame even when the story fails. Even a trashcan can look good on screen." },
  { n: 26, title: "Directing stars and newcomers", line: "Bring every actor in a scene to the same level. He trained Dhanraj for three months for Jailer." },
  { n: 27, title: "Editing starts in the script", line: "Pauses and tempo are planned on paper. Trial screenings decide the rest." },
  { n: 28, title: "Working with Anirudh", line: "Some scenes start from a piece of music. How he briefs Anirudh on the few that matter most." },
  { n: 29, title: "Find your own space", line: "He signed his first film at 25 and saw it released at 33. Find the space no one else is in." },
];

/** Rows shown before "Show all 29 lessons". */
export const LESSONS_SHOWN = 6;

/* ------------------------------------------------------------------ */
/* What you get today                                                  */
/* ------------------------------------------------------------------ */

export const INCLUDED: IncludedItem[] = [
  { title: "29 video lessons", detail: "2 h 20 min in all. Most run 2 to 6 minutes." },
  { title: "Tamil, with English subtitles", detail: "Nelson speaks Tamil. Every lesson has English subtitles." },
  { title: "Watch on phone, tablet or laptop", detail: "In the LevelUp app or website." },
  { title: "Access for life", detail: "Pay once. No subscription." },
  { title: "Certificate signed by Nelson Dilipkumar", detail: "When you finish the lessons." },
  { title: "No filmmaking experience needed" },
];

/** Founder's decision 5: bonuses are for every buyer; the stated value may stay. */
export const BONUS_HEADING = "Bonuses worth ₹19,999, for every buyer";
export const BONUSES: BonusItem[] = [
  { title: "PDF workbooks and case notes", detail: "Exercises to apply what you learn. Download them and keep them." },
  { title: "LevelUp creative community", detail: "Discussions and events with other learners." },
];

export const PAY_NOTE = "Pay by UPI or card, through Razorpay.";

/* ------------------------------------------------------------------ */
/* What you'll know how to do                                          */
/* ------------------------------------------------------------------ */

export const SKILLS: SkillItem[] = [
  { skill: "Lock a film idea in five lines.", lesson: 13 },
  { skill: "Build a character the audience remembers.", lesson: [14, 17] },
  { skill: "Plan an action opening, shot by shot.", lesson: 15 },
  { skill: "Stage a big interval sequence.", lesson: 16 },
  { skill: "Narrate your story so a producer sees it.", lesson: [11, 12] },
  { skill: "Write dialogue that does not sound regular.", lesson: 19 },
  { skill: "Design a set around a scene, within budget.", lesson: [21, 22] },
  { skill: "Run a calm set for 300 people.", lesson: 24 },
];

/* ------------------------------------------------------------------ */
/* Is this for you?                                                    */
/* ------------------------------------------------------------------ */

export const FOR_YOU = [
  "You want to write or direct films, in Tamil or any language.",
  "You have a story idea and don't know how to lock it.",
  "You want to hear how Kolamaavu Kokila, Doctor, Beast and Jailer were made, from the man who made them.",
];

export const NOT_FOR_YOU = [
  "You want camera settings, editing software or screenplay format.",
  "You want Nelson to read your script or answer you live.",
  "You want a course that promises you a job in films.",
];

/* ------------------------------------------------------------------ */
/* Value against price                                                 */
/* ------------------------------------------------------------------ */

export const VALUE_ROWS: Comparison[] = [
  { label: "Access", value: "For life" },
  { label: "Bonuses", value: "Worth ₹19,999, included" },
  { label: "Certificate", value: "Signed by Nelson Dilipkumar" },
  { label: "Refund window", value: "7 days" },
];

/* ------------------------------------------------------------------ */
/* In his words                                                        */
/* ------------------------------------------------------------------ */

interface RawQuote {
  episode: number;
  display: string;
}

/**
 * Episodes to show, in order. The first is the large card. Each quote is
 * printed from its `display` field; every one was checked word for word
 * against EP_NN.txt, and appears in no other episode.
 */
const QUOTE_ORDER = [7, 13, 24, 22, 14, 29, 28];

function pickQuote(ep: number, startsWith?: string): QuoteItem | undefined {
  const all = (quotesData as { quotes: RawQuote[] }).quotes;
  const q = all.find((x) => x.episode === ep && (!startsWith || x.display.includes(startsWith)));
  return q ? { text: q.display, lesson: q.episode } : undefined;
}

export const QUOTES: QuoteItem[] = QUOTE_ORDER.map((ep) =>
  // Lesson 13 has two lines on file; show the one that names Jailer 2.
  ep === 13 ? pickQuote(13, "Jailer 2") : pickQuote(ep)
).filter((q): q is QuoteItem => Boolean(q));

/* ------------------------------------------------------------------ */
/* Reviews                                                             */
/* ------------------------------------------------------------------ */

interface RawReview {
  tallyId: string;
  name: string;
  role?: string;
  score: number;
  text: string;
  submittedAt: string;
  approved: boolean;
  label: string;
}

/** Display order for the seven reviews of this course; the rest keep file order. */
const OWN_ORDER = ["81AWdRz", "QKvjPx8", "ja5AQXE", "gDYgKj1", "81ABMqr", "aQKkbPv", "A7AYoqk"];

function toCard(r: RawReview, ownCourse: boolean): ReviewCardData {
  return {
    id: r.tallyId,
    name: r.name.trim(),
    role: r.role && r.role.trim() ? r.role.trim() : undefined,
    program: r.label,
    score: Math.round((r.score / 20) * 10) / 10,
    submittedAt: r.submittedAt,
    text: r.text.trim(),
    ownCourse,
  };
}

const rd = reviewsData as { course_specific: RawReview[]; related: RawReview[] };
const own = rd.course_specific
  .filter((r) => r.approved)
  .sort((a, b) => OWN_ORDER.indexOf(a.tallyId) - OWN_ORDER.indexOf(b.tallyId))
  .map((r) => toCard(r, true));
const related = rd.related.filter((r) => r.approved).map((r) => toCard(r, false));

/** Real reviews, quoted as recorded: this course first, then related LevelUp programmes. */
export const REVIEWS: ReviewCardData[] = [...own, ...related];
export const OWN_REVIEW_COUNT = own.length;
const WORDS = ["No", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"];
const word = (n: number) => WORDS[n] ?? String(n);
const fives = own.filter((r) => r.score === 5).length;
const fours = own.filter((r) => r.score === 4).length;
export const REVIEW_NOTE = `${word(own.length)} buyers of this masterclass left a written review. ${word(fives)} gave 5 stars; ${word(fours).toLowerCase()} gave 4. The other cards come from LevelUp programmes on writing and direction.`;

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */
/* ------------------------------------------------------------------ */

/** Page-specific answers. The page adds SHARED_FAQ.refund, .access and .devices. */
export const FAQ_LANGUAGE: FaqItem = {
  question: "What language is it in?",
  answer: "Nelson speaks Tamil. Every lesson has English subtitles. There is no dubbed version.",
};
export const FAQ_LENGTH: FaqItem = {
  question: "How long is it?",
  answer: "29 lessons, 2 h 20 min in all. Most run 2 to 6 minutes. The longest, on Doctor's interval block, runs 17 minutes.",
};
export const FAQ_WHO: FaqItem = {
  question: "Who is it for?",
  answer:
    "Anyone who wants to write or direct films, in Tamil or any language. Beginners are welcome. It is not for you if you want camera settings, editing software or screenplay format.",
};
export const FAQ_EXPERIENCE: FaqItem = {
  question: "Do I need filmmaking experience?",
  answer: "No. Buyers who reviewed it include an engineer, students, a social media creator and an IT worker.",
};
export const FAQ_WHY_PAY: FaqItem = {
  question: "Nelson's interviews are free on YouTube. Why pay?",
  answer:
    "Interviews ask about his films. These lessons show his method, step by step: how he locks a story in five lines (lesson 13), how he built the Beast opening (lesson 15), how he staged Doctor's interval (lesson 16), why he skips storyboards (lesson 22). He recorded them for LevelUp.",
};
export const FAQ_TECHNICAL: FaqItem = {
  question: "Is this a technical course?",
  answer: "No camera settings, no software, no screenplay format. It covers how Nelson writes, casts, designs sets and runs a shoot.",
};
export const FAQ_CERTIFICATE: FaqItem = {
  question: "Will I get a certificate?",
  answer: "Yes. Finish the lessons and you get a Certificate of Completion signed by Nelson Dilipkumar.",
};
export const FAQ_BONUSES: FaqItem = {
  question: "What are the bonuses?",
  answer:
    "Every buyer gets PDF workbooks and case notes, and access to the LevelUp creative community. Together they are worth ₹19,999.",
};
export const FAQ_LIVE: FaqItem = {
  question: "Can I ask Nelson questions?",
  answer: "No. These are recorded lessons, not a live class.",
};
export const FAQ_INDUSTRY: FaqItem = {
  question: "Will this get me into the film industry?",
  answer: "No course can promise that. This one shows how one working director thinks.",
};
export const FAQ_PRICE: FaqItem = {
  question: "Is ₹2,499 the full price?",
  answer: "Yes. GST is included. Nothing renews.",
};

/* ------------------------------------------------------------------ */
/* Meta                                                                */
/* ------------------------------------------------------------------ */

export const META = {
  title: "Nelson Dilipkumar Masterclass | LevelUp Learning",
  /** 147 characters. */
  description:
    "Nelson Dilipkumar teaches how he wrote and directed Kolamaavu Kokila, Doctor, Beast and Jailer. 29 lessons in Tamil with English subtitles. ₹2,499.",
  schemaDescription:
    "Nelson Dilipkumar, director of Kolamaavu Kokila, Doctor, Beast, Jailer and Jailer 2, explains how he writes, casts, designs sets and runs a shoot. 29 lessons in Tamil with English subtitles. Lifetime access. ₹2,499.",
} as const;
