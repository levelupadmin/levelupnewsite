/**
 * Picks real reviews for each masterclass page.
 *
 * Rules (founder's decision, 17 Oct 2026):
 *   - Only approved rows from src/data/reviews.json. Text, name, role, score
 *     and date are shown exactly as recorded. Nothing here writes, edits or
 *     paraphrases a review.
 *   - Reviews of the page's own course come first.
 *   - The rest are reviews of other LevelUp programmes close to the page's
 *     craft. Each card shows the programme it reviews, so a reader can see
 *     which course the review is about.
 *   - No review appears on two masterclass pages. All seven pages are
 *     allocated together, in a fixed order, from one shared "used" set.
 *
 * Build-time only. Import from .astro files, never from a React island:
 * reviews.json holds about 7,000 rows.
 */
import raw from "@/data/reviews.json";
import type { MasterclassSlug } from "@/data/masterclass/shared";
import { MASTERCLASS_SLUGS } from "@/data/masterclass/shared";

export interface RawReview {
  tallyId: string;
  formId: string;
  program: string;
  category: string;
  name: string;
  role?: string;
  score: number;
  text: string;
  submittedAt: string;
  approved: boolean;
}

/** What ReviewWall renders. Every field is copied from the source row. */
export interface ReviewCardData {
  id: string;
  name: string;
  role?: string;
  /** Programme label as stored, minus a leading emoji. */
  program: string;
  /** 0 to 5, one decimal. */
  score: number;
  /** ISO timestamp of the genuine submission. */
  submittedAt: string;
  text: string;
  /** True when the review is about this page's own masterclass. */
  ownCourse: boolean;
}

interface Plan {
  /** Programme names whose reviews are about this masterclass. */
  own: string[];
  /** Other programmes, in order of preference, used to fill the wall. */
  fill: string[];
  /** tallyIds to always include first among the fill reviews. */
  pinned?: string[];
  /** tallyIds a human has ruled out for this page. */
  exclude?: string[];
}

/**
 * Which programmes feed each page. Own-course reviews: Nelson (7), Karthik
 * ("Filmmaking Masterclass", 3), G Venket Ram ("Photography Masterclass", 4),
 * Anthony ("Editing Masterclass", 1). Lokesh, Ravi and DRK have none yet, so
 * their walls are built from the closest craft.
 */
export const REVIEW_PLAN: Record<MasterclassSlug, Plan> = {
  "nelson-dilipkumar": {
    own: ["🎬 Nelson Dilipkumar Masterclass"],
    fill: [
      "Lets the Art of Learn Writing & Direction",
      "Basics of Screenwriting & Storytelling Workshop",
      "Screenwriting Workshop",
      "Psychology Behind Storytelling Workshop",
    ],
  },
  "lokesh-kanagaraj": {
    own: [],
    fill: [
      "Film Direction Workshop",
      "Basics of Film Direction Workshop",
      "Direction Workshop",
      "Basics of Film Direction",
    ],
  },
  "karthik-subbaraj": {
    own: ["Filmmaking Masterclass"],
    fill: ["Basics of Short Filmmaking", "Short Filmmaking Workshop", "Let's Learn Cinema"],
  },
  "ravi-basrur": {
    own: [],
    fill: [
      "Learn The Art of Cinematic Sounds Ft. Pradeep G",
      "What Happens After the Shoot - Post Production!",
      "LevelUp Screening Day",
      "Let's Learn Cinema",
    ],
  },
  "g-venket-ram": {
    own: ["Photography Masterclass"],
    fill: [
      "Learning Lighting for Emotion and Storytelling",
      "Basics of Photography",
      "Basics of Photography Webinar",
      "Adobe Lightroom 101 Workshop",
    ],
  },
  "anthony-gonsalvez": {
    own: ["Editing Masterclass"],
    fill: [
      "Learn The Art of Editing - Short Films, Ad films and Music Videos",
      "Basics of Video Editing Workshop",
      "Video Editing Workshop",
      "Basics of Video Editing 101 Webinar",
    ],
  },
  "drk-kiran": {
    own: [],
    fill: [
      "Basics of Cinematography",
      "Cinematography Workshop",
      "Let's Learn How to Make Good Small Budget Films that get Noticed",
      "How to execute a Film From Script to Screen",
    ],
  },
};

/** Reviews allocated to each page. Pages may show fewer, never more. */
const PER_PAGE = 12;

/**
 * Fill reviews are skipped when they are about logistics rather than the
 * teaching, or name a different mentor (confusing on another person's page).
 * Own-course reviews are never filtered: all of them are shown.
 */
const OFF_TOPIC =
  /(send|share|mail).{0,25}(record|link|video|ppt|slides)|could ?n[o']?t (attend|join)|missed the|recording|certificate|refund|payment|zoom|google meet|meet link|\bppt\b|network|audio (issue|problem)|lag\b|more time|time was|short time|1 ?hour|in hindi|hindi/i;
const OTHER_MENTORS =
  /praveen|pradeep|sharanya|ashik|vikarnan|mayukh|nibedita|aayna|sumanth|vikalp|prakriti|gowtham|niyantha|rahul|sraiyanti|bishall|sarvesh|srijan|santosh|siddhar|shashwat|\bnav\b|\bsir\b|\bmam\b|ma'am|madam|\bbro\b|\bmr\.?\s|\bms\.?\s/i;
/** Mixed or negative reviews can still score high; keep them off the fill. */
const MIXED =
  /not worth|waste|disappoint|sorry|\bidk\b|upsell|did ?n[o']?t cover|should|could have|needs? to|improve|\bbut\b|however|although|only basics|for free|^(hi|hey|hello)\b|my name is|i am \w+ from/i;

const LEADING_EMOJI = /^[\p{Extended_Pictographic}️‍\s]+/u;

function cleanProgram(p: string): string {
  return p.replace(LEADING_EMOJI, "").replace(/\s+/g, " ").trim();
}

function toCard(r: RawReview, ownCourse: boolean): ReviewCardData {
  return {
    id: r.tallyId,
    name: r.name.trim(),
    role: r.role && r.role.trim() ? r.role.trim() : undefined,
    program: cleanProgram(r.program),
    score: Math.round((r.score / 20) * 10) / 10,
    submittedAt: r.submittedAt,
    text: r.text.trim(),
    ownCourse,
  };
}

function usable(r: RawReview): boolean {
  return Boolean(r.approved && r.text && r.text.trim() && r.submittedAt && r.name && r.name.trim());
}

function goodFill(r: RawReview): boolean {
  const len = r.text.trim().length;
  return (
    r.score >= 80 &&
    len >= 70 &&
    len <= 420 &&
    r.name.trim().length >= 2 &&
    !OFF_TOPIC.test(r.text) &&
    !OTHER_MENTORS.test(r.text) &&
    !MIXED.test(r.text)
  );
}

/** Higher first: full marks, then a length that reads well on a card, then newer. */
function rank(a: RawReview, b: RawReview): number {
  if (b.score !== a.score) return b.score - a.score;
  const fit = (r: RawReview) => Math.abs(r.text.trim().length - 220);
  const d = fit(a) - fit(b);
  if (d !== 0) return d;
  const t = +new Date(b.submittedAt) - +new Date(a.submittedAt);
  if (t !== 0) return t;
  return a.tallyId.localeCompare(b.tallyId);
}

let cache: Map<MasterclassSlug, ReviewCardData[]> | null = null;

function allocate(): Map<MasterclassSlug, ReviewCardData[]> {
  if (cache) return cache;
  const rows = ((raw as { reviews?: RawReview[] }).reviews ?? []).filter(usable);
  const byProgram = new Map<string, RawReview[]>();
  for (const r of rows) {
    const list = byProgram.get(r.program) ?? [];
    list.push(r);
    byProgram.set(r.program, list);
  }
  const byId = new Map(rows.map((r) => [r.tallyId, r]));
  const used = new Set<string>();
  const out = new Map<MasterclassSlug, ReviewCardData[]>();

  // Own-course reviews are claimed first for every page, so a fill pass for
  // one page can never take another page's own reviews.
  for (const slug of MASTERCLASS_SLUGS) {
    for (const p of REVIEW_PLAN[slug].own) {
      for (const r of byProgram.get(p) ?? []) used.add(r.tallyId);
    }
  }

  for (const slug of MASTERCLASS_SLUGS) {
    const plan = REVIEW_PLAN[slug];
    const own = plan.own
      .flatMap((p) => byProgram.get(p) ?? [])
      .sort(rank)
      .map((r) => toCard(r, true));
    const picks: ReviewCardData[] = [...own];

    const names = new Set(picks.map((p) => p.name.toLowerCase()));
    const take = (r: RawReview | undefined) => {
      if (!r || used.has(r.tallyId) || plan.exclude?.includes(r.tallyId) || picks.length >= Math.max(PER_PAGE, own.length)) return;
      // One card per person: some people filled the same form twice.
      const key = r.name.trim().toLowerCase();
      if (names.has(key)) return;
      names.add(key);
      used.add(r.tallyId);
      picks.push(toCard(r, false));
    };

    for (const id of plan.pinned ?? []) take(byId.get(id));

    // Round-robin across the fill programmes so one big workshop does not
    // fill the whole wall.
    const queues = plan.fill.map((p) => (byProgram.get(p) ?? []).filter(goodFill).sort(rank));
    let progress = true;
    while (picks.length < PER_PAGE && progress) {
      progress = false;
      for (const q of queues) {
        while (q.length && used.has(q[0].tallyId)) q.shift();
        const next = q.shift();
        if (next) {
          take(next);
          progress = true;
        }
        if (picks.length >= PER_PAGE) break;
      }
    }
    out.set(slug, picks);
  }
  cache = out;
  return out;
}

export interface PickOptions {
  /** Most reviews to return. Default 9. */
  limit?: number;
}

/**
 * Real reviews for one masterclass page: its own reviews first, then other
 * programmes. Unique across all seven pages.
 *
 *   const reviews = reviewsForMasterclass("nelson-dilipkumar");
 *   <ReviewWall reviews={reviews} />
 */
export function reviewsForMasterclass(slug: MasterclassSlug, opts: PickOptions = {}): ReviewCardData[] {
  const all = allocate().get(slug) ?? [];
  const limit = opts.limit ?? 9;
  const ownCount = all.filter((r) => r.ownCourse).length;
  return all.slice(0, Math.max(limit, ownCount));
}

/** How many reviews of the page's own course exist. */
export function ownReviewCount(slug: MasterclassSlug): number {
  return (allocate().get(slug) ?? []).filter((r) => r.ownCourse).length;
}
