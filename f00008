/**
 * Page content for /masterclass/karthik-subbaraj.
 *
 * Sources:
 * - Facts (24 lessons, 3 h 4 min, Tamil with English subtitles, price):
 *   OFFERINGS in ../shared.ts (PR #29; Rahul confirmed 24 lessons).
 * - Lesson titles: the course outline from the original page. VdoCipher and
 *   the app also hold a 2-minute "Introduction" before lesson 1, so the app
 *   numbers each lesson one higher than this list.
 * - No transcript exists for this course, so the page has no "In his words"
 *   section and every claim comes from the lesson titles.
 * - Reviews: ./karthik-subbaraj.reviews.json (approved rows, verbatim). Three
 *   come from this course's own feedback form, three name this course in
 *   their text, and five come from LevelUp's direction programmes.
 */
import type { ReviewCardData } from "@/components/masterclass/reviewPicks";
import type { FaqItem, SkillItem } from "@/components/masterclass/types";
import { SHARED_FAQ } from "../shared";
import reviewsDoc from "./karthik-subbaraj.reviews.json";

export const ASSET = "/masterclass/karthik";

export interface Lesson {
  number: number;
  title: string;
  description: string;
}

export const lessons: Lesson[] = [
  { number: 1, title: "Discover the Roots of Filmmaking", description: "How Karthik Subbaraj went from writing poetry to directing his first short film, and how that shaped the way he makes films." },
  { number: 2, title: "The Power of Stories", description: "Why films shape culture, and the responsibility that comes with telling a story people remember." },
  { number: 3, title: "Unearth Stories from Everyday Moments", description: "His process for turning everyday experiences into film stories." },
  { number: 4, title: "Research That Elevates Stories", description: "How research deepens a film and makes its world believable." },
  { number: 5, title: "Master the Art of Story Structure", description: "How to shape a story around time and budget without losing its force." },
  { number: 6, title: "Crafting the Blueprint: Your Screenplay", description: "How he writes a screenplay that guides his whole team, not only himself." },
  { number: 7, title: "Inside Jigarthanda: Scene Breakdown", description: "How key scenes in Jigarthanda were shaped, and what inspired them." },
  { number: 8, title: "Breathing Life into Characters", description: "How to build characters with more than one side, who drive the story." },
  { number: 9, title: "The Journey of Sethu in Jigarthanda", description: "Sethu's arc in Jigarthanda, and how to build a character who changes." },
  { number: 10, title: "Master Montages: Create Magic on Screen", description: "How a montage moves a story forward, with Jigarthanda as the example." },
  { number: 11, title: "Crafting Powerful Dialogue", description: "How he writes and revises dialogue so it sounds real and moves the story." },
  { number: 12, title: "Is Your Script Ready?", description: "How to judge your script and improve it through feedback and rewrites." },
  { number: 13, title: "Planning Like a Pro: Pre-Production Essentials", description: "Why pre-production planning shapes the shoot, the edit and everything after." },
  { number: 14, title: "Cinematography: The Director's Eye", description: "How to work with a cinematographer so every shot tells the story." },
  { number: 15, title: "Pizza's Visual Storytelling", description: "How he planned the shots in Pizza, angle by angle." },
  { number: 16, title: "Creating a Signature Visual Style", description: "How storyboards and shot divisions keep his visual style consistent." },
  { number: 17, title: "Petta's Storyboard Masterclass", description: "A case study of the Petta storyboards, and why storyboarding matters." },
  { number: 18, title: "The Art of Production Design", description: "How art direction shapes a film's look, working with the director and the cinematographer." },
  { number: 19, title: "Building Petta's World: Behind the Scenes", description: "How Petta's world was built to feel real." },
  { number: 20, title: "Directing Actors to Excellence", description: "How he directs actors, and how casting changes a film." },
  { number: 21, title: "The Art of Editing: A Director's Best Friend", description: "How an editor can save a film, and how director and editor find its best version." },
  { number: 22, title: "Music and Sound: The Heartbeat of a Film", description: "His approach to score and sound design, and what they add to a story." },
  { number: 23, title: "Music's Role in Iraivi", description: "How the songs in Iraivi move the story and its emotion." },
  { number: 24, title: "The Filmmaker's Journey", description: "His closing lesson on the hard parts and the rewards of a filmmaker's life." },
];

export const skills: SkillItem[] = [
  { skill: "Turn an everyday moment into a film story, then test it with research.", lesson: [3, 4] },
  { skill: "Shape a story to fit your time and budget without losing its force.", lesson: 5 },
  { skill: "Write a screenplay your whole crew can work from.", lesson: 6 },
  { skill: "Write dialogue that sounds spoken, then revise it.", lesson: 11 },
  { skill: "Plan your shots with storyboards.", detail: "The Petta storyboards are the case study.", lesson: [16, 17] },
  { skill: "Use songs to carry a story forward.", detail: "Iraivi is the example.", lesson: 23 },
];

export const forYou = [
  "You want to see one director take a film from a story idea to the final sound mix.",
  "You have watched Jigarthanda, Pizza or Petta and want to know how they were planned.",
  "You write scripts or dialogue and want a director's way to check if a script is ready.",
  "You are new to filmmaking. No experience is needed.",
];

export const notForYou = [
  "You need the lessons spoken in English. Karthik speaks Tamil; the subtitles are in English.",
  "You want camera or editing software training. He covers how a director works with each department, not the tools.",
  "You want live classes. Every lesson is recorded.",
];

/** His films that the lessons use as worked examples, with the lessons that cover them. */
export const taughtFilms = [
  { title: "Jigarthanda", lessons: [7, 9, 10], what: "Scene breakdown, Sethu's arc and the montages" },
  { title: "Pizza", lessons: [15], what: "How the shots were planned" },
  { title: "Petta", lessons: [17, 19], what: "The storyboards and how its world was built" },
  { title: "Iraivi", lessons: [23], what: "How the songs move the story" },
];

export const faqs: FaqItem[] = [
  { question: "Who is this class for?", answer: "Aspiring filmmakers, screenwriters, dialogue writers, assistant directors, actors and anyone who loves cinema and wants to know how films are made. You need no filmmaking experience." },
  { question: "I'm an intermediate or professional filmmaker. Will I benefit?", answer: "Yes. He shows the decisions behind his own films: scene breakdowns, visual style, casting, editing and sound." },
  { question: "What will I learn?", answer: "His approach from story to final mix: finding and structuring a story, screenplay and dialogue, pre-production, cinematography, production design, directing actors, editing and music, with case studies from Jigarthanda, Pizza, Petta and Iraivi." },
  { question: "Does Karthik Subbaraj teach the class himself?", answer: "Yes. He teaches every lesson, with examples from his own films." },
  { question: "Which language is the course in?", answer: "Karthik speaks Tamil. Every lesson has English subtitles." },
  { question: "How long is the class?", answer: "24 video lessons, 3 hours 4 minutes in all. Watch at your own pace and go back to any lesson." },
  { question: "Is it live or recorded?", answer: "Recorded. Watch any time, as often as you like." },
  { question: "When do I get the signed certificate?", answer: "Once you finish the course, you get a Certificate of Completion signed by Karthik Subbaraj, to download and share." },
  { question: "How do I start after paying?", answer: "Sign in at app.leveluplearning.in with the phone number you paid with. A one-time code comes to you by SMS." },
  SHARED_FAQ.refund,
  SHARED_FAQ.access,
  SHARED_FAQ.devices,
];

const LABEL_OWN = "Filmmaking Masterclass (Karthik Subbaraj)";

/** Review cards, every field copied from the stored row. Reviews from this course's own form carry its name. */
export const reviews: ReviewCardData[] = reviewsDoc.reviews.map((r) => ({
  id: r.tallyId,
  name: r.name,
  role: r.role || undefined,
  program: r.match === "programme" ? LABEL_OWN : r.program,
  score: Math.round((r.score / 20) * 10) / 10,
  submittedAt: r.submittedAt,
  text: r.text,
  ownCourse: r.match === "programme",
}));

/** First-screen proof: a verbatim excerpt of Bavatharani A.'s review of this course. */
export const heroReview = (() => {
  const r = reviewsDoc.reviews.find((x) => x.tallyId === "7b8dlZ");
  if (!r) throw new Error("Karthik hero review 7b8dlZ missing");
  const part = "the course helped me to find out my own way of script writing and creating it into a screen play.";
  if (!r.text.includes(part)) throw new Error("Karthik hero review excerpt no longer matches the stored text");
  return { text: `…${part}`, name: r.name, score: Math.round((r.score / 20) * 10) / 10, submittedAt: r.submittedAt, program: LABEL_OWN };
})();
