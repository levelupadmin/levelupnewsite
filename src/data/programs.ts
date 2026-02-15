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
  previewVideo: string;
  youtubeId: string;
  ctaLink: string;
}

import liveBfp from "@/assets/live-bfp.png";
import liveVe from "@/assets/live-ve.png";
import liveUiux from "@/assets/live-uiux.png";
import liveSw from "@/assets/live-sw.png";

export const showcasePrograms: ShowcaseProgram[] = [
  {
    id: "bfp",
    title: "Breakthrough Filmmakers' Program",
    description:
      "A 12-week online learning experience covering every aspect of filmmaking — from storytelling and screenwriting to direction, cinematography, and post-production. Master filmmaking with live weekend classes, industry mentors, and hands-on projects.",
    duration: "12 weeks",
    format: "Live · Weekends",
    instructor: "Industry Mentors",
    startDate: "",
    status: "Enrolling",
    image: liveBfp,
    previewVideo: "/videos/bfp-preview.mp4",
    youtubeId: "5-kNI2eSLpo",
    ctaLink: "https://www.leveluplearning.live/bfp-cta",
  },
  {
    id: "ve",
    title: "Video Editing Academy",
    description:
      "India's most exclusive Video Editing cohort. Turn your passion for video editing into a high-paying career in just 12 weeks. Learn from mentors who've worked with creators like Ali Abdaal, Ankur Warikoo, and Sharan Hegde.",
    duration: "12 weeks",
    format: "Live · Cohort",
    instructor: "Industry Editors",
    startDate: "",
    status: "Enrolling",
    image: liveVe,
    previewVideo: "/videos/ve-preview.mp4",
    youtubeId: "dQw4w9WgXcQ",
    ctaLink: "https://www.leveluplearning.live/ve-cta",
  },
  {
    id: "uiux",
    title: "UI/UX Design Academy",
    description:
      "India's most exclusive AI-first Product Design Accelerator. In 12 weeks, go from brief to interview-ready portfolio using practical AI workflows designed for designers who want measurable progress.",
    duration: "12 weeks",
    format: "Live · Weekends",
    instructor: "Design Leads",
    startDate: "",
    status: "Enrolling",
    image: liveUiux,
    previewVideo: "/videos/bfp-preview.mp4",
    youtubeId: "dQw4w9WgXcQ",
    ctaLink: "https://tally.so/r/wd7eqN",
  },
  {
    id: "sw",
    title: "Screenwriting Workshop",
    description:
      "The 8-week experience that transforms your writing forever. An exclusive online program to master the art of writing captivating stories and shape them into blockbuster screenplays and binge-worthy shows.",
    duration: "8 weeks",
    format: "Live · Online",
    instructor: "4 Industry Mentors",
    startDate: "",
    status: "Enrolling",
    image: liveSw,
    previewVideo: "/videos/bfp-preview.mp4",
    youtubeId: "dQw4w9WgXcQ",
    ctaLink: "https://tally.so/r/mOd4ek",
  },
];
