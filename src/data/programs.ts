export type ProgramStatus = "Enrolling" | "Upcoming" | "Coming Soon";

export interface ShowcaseProgram {
  id: string;
  title: string;
  description: string;
  duration: string;
  format: string;
  instructor: string;
  startDate: string;
  spotsLeft?: number;
  status: ProgramStatus;
  image: string;
}

import liveProgram1 from "@/assets/live-program-1.jpg";
import liveProgram2 from "@/assets/live-program-2.jpg";
import liveProgram3 from "@/assets/live-program-3.jpg";
import liveProgram4 from "@/assets/live-program-4.jpg";
import liveProgram5 from "@/assets/live-program-5.jpg";
import liveProgram6 from "@/assets/live-program-6.jpg";

export const showcasePrograms: ShowcaseProgram[] = [
  {
    id: "directing-intensive",
    title: "Directing Intensive",
    description: "Build a directorial voice through scene work, blocking, and guided critique.",
    duration: "8 weeks",
    format: "Live",
    instructor: "Arun Varma",
    startDate: "Mar 3",
    spotsLeft: 6,
    status: "Enrolling",
    image: liveProgram1,
  },
  {
    id: "camera-light-lab",
    title: "Camera & Light Lab",
    description: "Master cinematic lighting and camera movement with hands-on shooting exercises.",
    duration: "6 weeks",
    format: "Live + Recorded",
    instructor: "Meera Kapoor",
    startDate: "Apr 14",
    status: "Upcoming",
    image: liveProgram2,
  },
  {
    id: "screenwriting-cohort",
    title: "Screenwriting Cohort",
    description: "Develop a short screenplay from concept to final draft with weekly feedback.",
    duration: "10 weeks",
    format: "Live",
    instructor: "Vikram Desai",
    startDate: "Feb 24",
    spotsLeft: 5,
    status: "Enrolling",
    image: liveProgram3,
  },
  {
    id: "sound-score-workshop",
    title: "Sound & Score Workshop",
    description: "Explore sound design and music scoring for narrative film in a studio setting.",
    duration: "4 weeks",
    format: "Live + Recorded",
    instructor: "Priya Nair",
    startDate: "",
    status: "Coming Soon",
    image: liveProgram4,
  },
  {
    id: "editorial-craft-track",
    title: "Editorial Craft Track",
    description: "Sharpen your editing instinct through daily cuts, rhythm exercises, and critique.",
    duration: "6 weeks",
    format: "Live",
    instructor: "Rohan Mehta",
    startDate: "May 5",
    status: "Upcoming",
    image: liveProgram5,
  },
  {
    id: "documentary-intensive",
    title: "Documentary Intensive",
    description: "Learn to find, shape, and tell non-fiction stories with clarity and empathy.",
    duration: "8 weeks",
    format: "Live + Recorded",
    instructor: "Ananya Sen",
    startDate: "Mar 10",
    spotsLeft: 3,
    status: "Enrolling",
    image: liveProgram6,
  },
];
