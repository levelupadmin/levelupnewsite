/**
 * Page content for /masterclass/ravi-basrur.
 *
 * Sources:
 * - Price, checkout, language: OFFERINGS in ../shared.ts.
 * - Lesson count and runtime: 15 lessons, 311.9 min in VdoCipher (masterclass
 *   audit, 17 Oct 2026). The old 16th lesson, "Live Case Studies & Q&A", was
 *   split out of lesson 15 and has no video, so it is gone. shared.ts still
 *   says 16 and 310; see LESSONS and RUNTIME_MINUTES below.
 * - Lesson titles: the course outline (the app's chapter titles).
 * - Quotes: ./ravi-basrur.quotes.json, LevelUp's English subtitles of the
 *   Kannada lessons. The subtitle files are not numbered in lesson order, so
 *   no quote carries a lesson number.
 * - Credits: research of 17 Oct 2026 (Wikipedia, TMDB and a news source per
 *   film). Pailwaan and Hebbuli are not his: Arjun Janya scored both.
 * - Reviews: ./ravi-basrur.reviews.json (approved rows, verbatim). There are
 *   no reviews of this masterclass yet, so the wall shows LevelUp's sound,
 *   music and filmmaking programmes, each labelled.
 */
import type { ReviewCardData } from "@/components/masterclass/reviewPicks";
import type { FaqItem, QuoteItem, SkillItem } from "@/components/masterclass/types";
import { SHARED_FAQ } from "../shared";
import reviewsDoc from "./ravi-basrur.reviews.json";
import quotesDoc from "./ravi-basrur.quotes.json";

export const ASSET = "/masterclass/ravi";
export const TRAILER_ID = "r04WqxmwZZI";

/** Real figures for this course; use these, not OFFERINGS, until shared.ts is updated. */
export const LESSONS = 15;
export const RUNTIME_MINUTES = 312;

export interface Lesson {
  number: number;
  title: string;
  description: string;
}

export const lessons: Lesson[] = [
  { number: 1, title: "From Basrur to Blockbusters: Discovering Musical Passions", description: "How a boy from a village in Basrur found his way into film music, and why talent needs recognition to grow." },
  { number: 2, title: "The Foundations: Unveiling the Magic of Music and Sound", description: "The layers of music, from raw sound to a finished composition." },
  { number: 3, title: "Navigating Logic Pro X: Your Gateway to Composition", description: "How he sets up a Logic Pro X session, organises tracks and starts composing." },
  { number: 4, title: "Decoding Music Theory: Notes, Keys and the Art of Reverb", description: "Notes, keys and scales in plain terms, and how much feeling reverb adds." },
  { number: 5, title: "Frequency Fundamentals: Shaping the Soundscape", description: "Which frequencies to cut, which to lift, and how to make room in a mix." },
  { number: 6, title: "Elevating Audio: Mastering Plugins and Sound Design", description: "The plugins he uses, and why he picks each one." },
  { number: 7, title: "Crafting Epic Scores: Orchestration and Sound Mixing", description: "How he layers an orchestra and mixes it to land an emotional moment, with KGF as the example." },
  { number: 8, title: "Inside KGF: Mastering Transitions and Vocal Solos", description: "The KGF transitions and vocal solos: what worked, what was dropped, and why." },
  { number: 9, title: "Precision in Pitch: Advanced Techniques and Essential Plugins", description: "Pitch shifting, tuning and the plugins that clean up a rough take without losing its feeling." },
  { number: 10, title: "Symphonic Synergy: Voices and Live Instruments in Sound Design", description: "How he blends voices and live instruments with electronic sound so the whole feels natural." },
  { number: 11, title: "Organizing for Success: Optimizing Your Music Library", description: "How he names, tags and files his sounds so he can find any of them fast." },
  { number: 12, title: "Narrative through Notes: The Art of Musical Storytelling", description: "Music as story: motifs, callbacks and how a repeated melody shapes a film's emotion." },
  { number: 13, title: "Bonus Episode: The Musical Journey, Overcoming Struggles to Success", description: "The hard years before his breakthrough, in his own words." },
  { number: 14, title: "Turning Points: Embracing a New Identity in Music", description: "The changes in how he worked and thought that led to his next phase." },
  { number: 15, title: "From Jingles to Albums: Crafting Music for All Mediums", description: "Why jingles, film scores and albums each need a different approach, with case studies from his work." },
];

/** "What you'll know how to do". Lesson numbers follow the outline above. */
export const skills: SkillItem[] = [
  { skill: "Set up a Logic Pro X session for scoring a film.", lesson: 3 },
  { skill: "Build chords from simple shapes, even if you can't read music.", detail: "He uses major keys for happy songs and minor keys for emotional ones.", lesson: 4 },
  { skill: "Cut the harsh range around 4 to 5 kHz so a mix is easy on the ear.", lesson: 5 },
  { skill: "Carry one scene into the next with a transition, and leave silence where a scene needs it.", detail: "Shown on scenes from KGF.", lesson: 8 },
  { skill: "Name and stack your tracks so a session of 150 tracks stays easy to work in.", lesson: 11 },
  { skill: "Score a scene bar by bar: find its beats, then give each one room." },
];

export const forYou = [
  "You want to score films, and see how the composer of KGF and Salaar works.",
  "You use Logic Pro X, or want to. He composes in it on screen.",
  "You make films and want to know when music helps a scene and when silence does.",
  "You can't read music. He taught himself keyboard by practice.",
  "You understand Kannada, or are happy to follow English subtitles.",
];

export const notForYou = [
  "You need the lessons spoken in Tamil, Telugu or Hindi. Ravi speaks Kannada; the subtitles are in English.",
  "You want a full Logic Pro X manual. He shows his own workflow, not every menu.",
  "You want live classes. Every lesson is recorded.",
];

/** Films he has worked on, with his exact credit. Biggest first, then the most recent. */
export const films = [
  { slug: "kgf-chapter-2", title: "KGF: Chapter 2", year: 2022, role: "Songs and score" },
  { slug: "kgf-chapter-1", title: "KGF: Chapter 1", year: 2018, role: "Songs and score" },
  { slug: "salaar", title: "Salaar: Part 1", year: 2023, role: "Songs and score" },
  { slug: "toxic", title: "Toxic", year: 2026, role: "Score and one song" },
  { slug: "blast", title: "Blast", year: 2026, role: "Songs and score" },
  { slug: "veera-chandrahasa", title: "Veera Chandrahasa", year: 2025, role: "Director and composer" },
  { slug: "marco", title: "Marco", year: 2024, role: "Songs and score" },
  { slug: "bhairathi-ranagal", title: "Bhairathi Ranagal", year: 2024, role: "Songs and score" },
  { slug: "singham-again", title: "Singham Again", year: 2024, role: "Songs and score" },
  { slug: "kabzaa", title: "Kabzaa", year: 2023, role: "Music" },
  { slug: "bholaa", title: "Bholaa", year: 2023, role: "Songs and score" },
  { slug: "kisi-ka-bhai-kisi-ki-jaan", title: "Kisi Ka Bhai Kisi Ki Jaan", year: 2023, role: "Background score" },
  { slug: "mufti", title: "Mufti", year: 2017, role: "Songs and score" },
  { slug: "anjaniputra", title: "Anjaniputra", year: 2017, role: "Music" },
  { slug: "ugramm", title: "Ugramm", year: 2014, role: "Songs and score" },
];

export const faqs: FaqItem[] = [
  { question: "Which language is the course in?", answer: "Ravi teaches in Kannada. Every lesson has English subtitles." },
  { question: "I don't know anything about music. Will this help me?", answer: "Yes. You don't need to read music or own a keyboard. He explains how he thinks about emotion, rhythm and story in plain terms, and he taught himself keyboard by practice." },
  { question: "I already make music. Will I still learn something?", answer: "Yes. He opens his own Logic Pro X sessions and shows his orchestration, sound design and mixing choices, with scenes from KGF." },
  { question: "Which software does he use?", answer: "Logic Pro X. He works in it on screen." },
  { question: "How long is the class?", answer: "15 video lessons, 5 hours 12 minutes in all. Watch at your own pace and go back to any lesson." },
  { question: "Is it live or recorded?", answer: "Recorded. Watch any time, as often as you like." },
  { question: "Does Ravi Basrur teach the class himself?", answer: "Yes. He teaches every lesson, with examples from his own work." },
  { question: "When do I get the signed certificate?", answer: "After you finish the course, you get a Certificate of Completion signed by Ravi Basrur, to download and share." },
  { question: "How do I start after paying?", answer: "Sign in at app.leveluplearning.in with the phone number you paid with. A one-time code comes to you by SMS." },
  SHARED_FAQ.refund,
  SHARED_FAQ.access,
  SHARED_FAQ.devices,
];

/** Quotes for "In his words", in display order (episode in the subtitle files, then the start of the line). */
const QUOTE_ORDER: Array<[number, string]> = [
  [11, "If audience eyes"],
  [6, "I don't even know"],
  [7, "Happy songs"],
  [7, "As per my knowledge"],
  [12, "Music is everywhere"],
  [9, "if you start working on it"],
  [5, "If we do the work"],
];

export const quotes: QuoteItem[] = QUOTE_ORDER.map(([ep, start]) => {
  const q = quotesDoc.quotes.find((x) => x.episode === ep && x.text.startsWith(start));
  if (!q) throw new Error(`Ravi quote not found: Episode ${ep} "${start}"`);
  return { text: q.display };
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
