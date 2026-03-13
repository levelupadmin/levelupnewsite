export type ProgramStatus = "Enrolling" | "Upcoming" | "Coming Soon";

export interface ShowcaseProgram {
  id: string;
  tag: string;
  title: string;
  headline: string;
  oneLiner: string;
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
  ctaLabel: string;
  learnMoreLink: string;
  stats: string[];
  bullets: string[];
}

import liveBfp from "@/assets/live-bfp.jpg";
import liveVe from "@/assets/live-ve.png";
import liveUiux from "@/assets/live-uiux.png";
import liveSw from "@/assets/live-sw.png";
import liveAcp from "@/assets/live-acp.png";

export const showcasePrograms: ShowcaseProgram[] = [
  {
    id: "bfp",
    tag: "FILMMAKING",
    title: "Breakthrough Filmmakers' Program",
    headline: "Become a Filmmaker in 12 Weeks",
    oneLiner: "From script to screen — live weekend classes with the creators behind your favourite Indian films.",
    description: "A 12-week online learning experience covering every aspect of filmmaking — from storytelling and screenwriting to direction, cinematography, and post-production.",
    duration: "12 weeks",
    format: "Live · Weekends",
    instructor: "Industry Mentors",
    startDate: "",
    status: "Enrolling",
    image: liveBfp,
    previewVideo: "/videos/bfp-preview.mp4",
    youtubeId: "5-kNI2eSLpo",
    ctaLink: "https://www.leveluplearning.in/bfp-2",
    ctaLabel: "Request Invite",
    learnMoreLink: "https://www.leveluplearning.in/bfp-2",
    stats: ["12 Weeks", "Weekends Only", "LIVE Online", "Application-Only"],
    bullets: [
      "Full pipeline — screenwriting, directing, cinematography, editing, distribution",
      "Sony Future Filmmaker Award showcase for your short film",
      "Exclusive industry-grade equipment discounts",
    ],
  },
  {
    id: "ve",
    tag: "VIDEO EDITING",
    title: "Video Editing Academy",
    headline: "Become the Editor Everyone Wants to Hire",
    oneLiner: "Learn from the editors behind Ali Abdaal, Ankur Warikoo & Sharan Hegde — in 12 weeks.",
    description: "India's most exclusive Video Editing cohort. Turn your passion for video editing into a high-paying career in just 12 weeks.",
    duration: "12 weeks",
    format: "Live · Cohort",
    instructor: "Industry Editors",
    startDate: "",
    status: "Enrolling",
    image: liveVe,
    previewVideo: "/videos/ve-preview.mp4",
    youtubeId: "dQw4w9WgXcQ",
    ctaLink: "https://www.leveluplearning.in/ve",
    ctaLabel: "Request Invite",
    learnMoreLink: "https://www.leveluplearning.in/ve",
    stats: ["12 Weeks", "Weekends Only", "LIVE Online", "Application-Only"],
    bullets: [
      "Taught by viral social media editors + National Award-winning filmmaker + DaVinci Resolve certified colorist",
      "Storytelling through editing, color grading, sound design & client-ready workflows",
      "Industry tool discounts included",
    ],
  },
  {
    id: "creator-academy",
    tag: "CONTENT CREATION",
    title: "Creator Academy",
    headline: "Become the Creator You Keep Planning to Be",
    oneLiner: "Not a course. A 12-week execution cohort — publish 21 posts or stay out.",
    description: "A 12-week execution cohort for aspiring creators. Publish 21 posts, get mentor reviews, and build your audience.",
    duration: "12 weeks",
    format: "Live · Cohort",
    instructor: "Creator Mentors",
    startDate: "",
    status: "Enrolling",
    image: liveAcp,
    previewVideo: "/videos/ve-trailer.mp4",
    youtubeId: "dQw4w9WgXcQ",
    ctaLink: "https://www.leveluplearning.in/creator-academy",
    ctaLabel: "Begin Today",
    learnMoreLink: "https://www.leveluplearning.in/creator-academy",
    stats: ["12 Weeks", "21 Posts", "Pods of 5", "80%+ Completion"],
    bullets: [
      "Publish by 10 PM IST or your streak resets. No \"learn at your own pace.\"",
      "Mentor reviews every draft before you post",
      "Alumni grown to 440K+, 340K+, 230K+ followers",
    ],
  },
  {
    id: "uiux",
    tag: "PRODUCT DESIGN",
    title: "UI/UX Design Academy",
    headline: "India's First AI-First Product Design Accelerator",
    oneLiner: "Brief to interview-ready portfolio in 12 weeks with AI workflows built in.",
    description: "India's most exclusive AI-first Product Design Accelerator.",
    duration: "12 weeks",
    format: "Live · Weekends",
    instructor: "Design Leads",
    startDate: "",
    status: "Enrolling",
    image: liveUiux,
    previewVideo: "/videos/ve-trailer.mp4",
    youtubeId: "dQw4w9WgXcQ",
    ctaLink: "https://www.leveluplearning.live/uiux-academy",
    ctaLabel: "Request Invite",
    learnMoreLink: "https://www.leveluplearning.live/uiux-academy",
    stats: ["12 Weeks", "Weekends Only", "LIVE Online", "Top 5% Accepted"],
    bullets: [
      "AI-first curriculum woven into research, synthesis, UX copy & prototyping",
      "Mentors from Zepto, Spinny, Mondee (ex-Unacademy), Royal Enfield",
      "You leave with a shipped case study, not a Figma file nobody saw",
    ],
  },
  {
    id: "sw",
    tag: "WRITING",
    title: "Screenwriting & Storytelling",
    headline: "Storytellers Are Built Here",
    oneLiner: "The 8-week experience that transforms your writing forever.",
    description: "An exclusive online program to master the art of writing captivating stories and shape them into blockbuster screenplays.",
    duration: "8 weeks",
    format: "Live · Online",
    instructor: "4 Industry Mentors",
    startDate: "",
    status: "Enrolling",
    image: liveSw,
    previewVideo: "/videos/sw-preview.mp4",
    youtubeId: "OkJmqqsnQ0c",
    ctaLink: "https://www.leveluplearning.live/sw",
    ctaLabel: "Request Invite",
    learnMoreLink: "https://www.leveluplearning.live/sw",
    stats: ["8 Weeks", "128 Concepts", "15 Assignments", "4 Mentors"],
    bullets: [
      "Psychology of storytelling, visual storytelling, and pitching & selling",
      "Sunday masterclass + Saturday 1:1 feedback + weekday execution",
      "Covers OTT writing, short-form hooks, screenplay structures — full modern toolkit",
    ],
  },
];
