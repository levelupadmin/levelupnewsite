/**
 * Page content for /masterclass/lokesh-kanagaraj.
 *
 * Sources:
 * - Facts (lessons, runtime, language, price): OFFERINGS in ../shared.ts.
 * - Lesson descriptions and skills: the English subtitle transcripts in
 *   LevelUp Core/Lokesh Masterclass Notes/EP - 01 to 15. Each transcript
 *   episode covers the topic of the same-numbered lesson below.
 * - Quotes: ./lokesh-kanagaraj.quotes.json (exact subtitle lines).
 * - Reviews: ./lokesh-kanagaraj.reviews.json (approved rows, verbatim). There
 *   are no reviews of this masterclass yet, so the wall shows LevelUp's
 *   screenwriting and direction programmes, each labelled.
 */
import type { ReviewCardData } from "@/components/masterclass/reviewPicks";
import type { FaqItem, QuoteItem, SkillItem } from "@/components/masterclass/types";
import { SHARED_FAQ } from "../shared";
import reviewsDoc from "./lokesh-kanagaraj.reviews.json";
import quotesDoc from "./lokesh-kanagaraj.quotes.json";

export const ASSET = "/masterclass/lokesh";
export const TRAILER_ID = "dxyHe16__34";

export interface Lesson {
  number: number;
  title: string;
  description: string;
}

export const lessons: Lesson[] = [
  { number: 1, title: "The Journey Behind the Lens", description: "Why he agreed to teach, and how he and his team learnt filmmaking from short films and whatever they could find online." },
  { number: 2, title: "Finding Your Story: Ideation and Pre-visualisation", description: "Where his ideas come from, and how he tests one. The reaction of his core team decides whether a film gets made." },
  { number: 3, title: "Research as a Filmmaker's Superpower", description: "Cinema is made up, but it has to feel real. How research shaped Maanagaram and Kaithi, down to a line of dialogue a prisoner gave him." },
  { number: 4, title: "Structuring Conflict: Lokesh's Approach to Screenwriting", description: "He fixes the opening, the interval block and the climax first, then fills the scenes between. Why his films start halfway into the action." },
  { number: 5, title: "Writing Action That Serves the Story", description: "How the Leo restaurant fight was written: the staging, the props and the ten minutes that build up to it." },
  { number: 6, title: "Building Characters with Emotional Truth", description: "How JD in Master began with a real college professor, and how he opens and closes a character's arc." },
  { number: 7, title: "Visual Characterisation: Costumes, Props and Palette", description: "How each character's look is set with the costume designer and the cameraman, supporting roles included." },
  { number: 8, title: "Assembling the Right Crew", description: "How he built his first crew from friends, and what changed when he began working with senior technicians." },
  { number: 9, title: "Directing with the Edit in Mind", description: "How he and his editor mark cut points in the script, and why one 10-second shot can change how a film plays." },
  { number: 10, title: "Crafting a Directorial Signature", description: "How light sets a film's tone, as in Maanagaram's white and warm light, and how to find a style of your own." },
  { number: 11, title: "Scouting Locations with Intent", description: "How a recce works, why exteriors are harder than sets, and how a place is chosen for a scene." },
  { number: 12, title: "Designing Sound for Maximum Impact", description: "Why sound is one of cinema's key crafts, with his sound team explaining Foley and effects." },
  { number: 13, title: "Art Direction and Worldbuilding", description: "How the art team plans sets months ahead, with the Leo set built for 2,000 people as the example." },
  { number: 14, title: "The Art of Choosing a Title", description: "Why his title card arrives 15 minutes in, and what a title has to do on a poster." },
  { number: 15, title: "Directing with Conviction", description: "His advice for a first film: patience and observation. Maanagaram took four years from signing to release." },
];

/** "What you'll know how to do": each line names the lesson that teaches it. */
export const skills: SkillItem[] = [
  { skill: "Plan a screenplay from three fixed points: the opening, the interval block and the climax.", lesson: 4 },
  { skill: "Write an action scene so the staging and props are set on paper first.", detail: "The Leo restaurant fight is the worked example.", lesson: 5 },
  { skill: "Research a world before you write it.", detail: "For Kaithi, his team met people who had spent 10 and 15 years in prison.", lesson: 3 },
  { skill: "Build a lead character from someone you have met.", detail: "JD in Master started with a real college professor.", lesson: 6 },
  { skill: "Mark cut points in your script so the shoot and the edit agree.", lesson: 9 },
  { skill: "Use light to set a film's tone.", detail: "Maanagaram splits its characters into white and warm light.", lesson: 10 },
];

export const forYou = [
  "You want to write and direct films, and see how a working director plans them.",
  "You have watched Kaithi, Master or Leo and want to know how the big scenes were built.",
  "You write, and want a director's way to structure a script.",
  "You are new to film. Lokesh started with short films, not film school.",
];

export const notForYou = [
  "You want camera settings, lenses or editing software. He talks about choices, not gear.",
  "You want to learn screenplay format.",
  "You want live classes. Every lesson is recorded.",
];

/** Films he has directed. The lessons draw on the first five. */
export const films = [
  { slug: "maanagaram", title: "Maanagaram", year: 2017 },
  { slug: "kaithi", title: "Kaithi", year: 2019 },
  { slug: "master", title: "Master", year: 2021 },
  { slug: "vikram", title: "Vikram", year: 2022 },
  { slug: "leo", title: "Leo", year: 2023 },
  { slug: "coolie", title: "Coolie", year: 2025 },
];

export const faqs: FaqItem[] = [
  { question: "How long is the masterclass?", answer: "15 video lessons, 1 hour 34 minutes in all. Watch at your own pace and go back to any lesson." },
  { question: "What language is it in?", answer: "Lokesh speaks Tamil. Every lesson has English subtitles." },
  { question: "Is it live or recorded?", answer: "Recorded. Watch any time, as often as you like." },
  { question: "Do I need filmmaking experience?", answer: "No. He explains his choices in plain words, so a beginner can follow. He began with short films himself." },
  { question: "Is this a technical filmmaking course?", answer: "No. He does not cover shot sizes or camera gear. He shows how he builds stories, stages action, directs actors and briefs each department." },
  { question: "Will I learn how to write scripts?", answer: "You will learn how he structures a script and writes scenes. You will not learn screenplay format or software." },
  { question: "How is this different from film school?", answer: "Film school teaches a set syllabus. This is one working director's process, explained through his own films, in 15 lessons." },
  { question: "What do I get when I buy?", answer: "15 lessons with lifetime access, a Certificate of Completion signed by Lokesh Kanagaraj, PDF case notes and access to the LevelUp creative community." },
  { question: "Where do I watch it, and can I download the videos?", answer: "In the LevelUp app or website, on your phone, tablet or laptop. Lessons stream and cannot be downloaded. The PDF case notes are yours to download." },
  { question: "How do I start after paying?", answer: "Sign in at app.leveluplearning.in with the phone number you paid with. A one-time code comes to you by SMS." },
  SHARED_FAQ.refund,
  SHARED_FAQ.access,
];

/** Quotes for "In his words", in display order. Lesson numbers checked against the transcripts. */
const QUOTE_ORDER: Array<[number, string]> = [
  [1, "Everyone will have inspiration"],
  [4, "The main thing I tell my associates"],
  [5, "Small details like the bindi"],
  [3, "We met people who were imprisoned"],
  [6, "I think it almost took us"],
  [9, "So one shot"],
  [15, "Maanagaram was made in 2015"],
];

export const quotes: QuoteItem[] = QUOTE_ORDER.map(([ep, start]) => {
  const q = quotesDoc.quotes.find((x) => x.episode === ep && x.text.startsWith(start));
  if (!q) throw new Error(`Lokesh quote not found: EP ${ep} "${start}"`);
  return { text: q.display, lesson: q.lesson ?? undefined };
});

/** Review cards, every field copied from the stored row. */
export const reviews: ReviewCardData[] = reviewsDoc.reviews.map((r) => ({
  id: r.tallyId,
  name: r.name,
  role: r.role || undefined,
  program: r.program,
  score: Math.round((r.score / 20) * 10) / 10,
  submittedAt: r.submittedAt,
  text: r.text,
  ownCourse: r.match === "programme",
}));
