/**
 * Anthony Gonsalvez Teaches Film Editing.
 *
 * Sources: lesson titles and descriptions from the course; running times
 * from VdoCipher (19 videos, 10,999 s); price, language and checkout from
 * OFFERINGS in ./shared.ts; reviews copied word for word from
 * src/data/reviews.json into ./content/anthony-gonsalvez.reviews.json.
 * The film list is the one this page has always shown. There is no
 * transcript of this course yet, so `quotes` is empty.
 */
import { OFFERINGS, SHARED_FAQ, formatPrice, formatRuntime } from "./shared";
import { courseDetailsFor, pricePerHour } from "./template";
import reviews from "./content/anthony-gonsalvez.reviews.json";
import type { MasterclassPageData, StoredReview } from "./types";

const o = OFFERINGS["anthony-gonsalvez"];
const DIR = "/masterclass/anthony-gonsalvez";

const data: MasterclassPageData = {
  slug: "anthony-gonsalvez",
  name: "Anthony Gonsalvez",
  discipline: "Film Editing",
  title: "Teaches Film Editing",
  theme: { accent: "#7cc8ff", accentRgb: "124 200 255", motif: "timeline" },

  hero: {
    headline: "Watch Anthony Gonsalvez cut a short film from raw footage to final.",
    lines: [
      "How he picks the best take from the rushes.",
      "Transitions cut by cut: L cut, J cut, match cut, cutaway.",
      "Taught in Avid Media Composer.",
    ],
    image: `${DIR}/hero`,
    imageAlt: "Anthony Gonsalvez explaining a point, seated on a sofa",
    // Face sits above the timeline motif on phones (it crossed his chin at 18%).
    mobilePosition: "50% 60%",
  },

  proofLine: "1800+ Students have bought this course",
  closingLine: "Watch a short film come together, one cut at a time.",

  courseDescription:
    "In his first online class, Anthony Gonsalvez edits a short film in front of you, in Avid Media Composer. He sets up the project, sorts the rushes, picks the takes, builds a rough cut, trims it, adds music and exports it. Along the way he talks about working with directors and cutting for an audience.",
  courseDetails: courseDetailsFor("anthony-gonsalvez"),

  trailer: {
    youtubeId: "aVYjvyB28U4",
    title: "Anthony Gonsalvez Teaches Film Editing, official trailer",
    poster: `${DIR}/trailer.jpg`,
  },

  lessons: [
    { number: 1, seconds: 265, title: "Introduction", description: "Anthony introduces his first online editing class: a practical one, in which he edits a short film in front of you." },
    { number: 2, seconds: 325, title: "Beginnings & Inspirations", description: "How he became an editor, the editors he admired, and why trial and error builds your sense of what works." },
    { number: 3, seconds: 298, title: "First Projects", description: "Editing in different formats, film editing against ad editing, and making good choices when time is short." },
    { number: 4, seconds: 593, title: "Editorial Planning and Responsibility: Key Aspects of the Editor's Job", description: "The editor's job: choosing clips that carry the emotion of a scene, and settling the rough cut before you trim." },
    { number: 5, seconds: 182, title: "Introduction to Film Editing: Setting Up Your Workflow", description: "Getting started in the editing software: a short guide to setting up." },
    { number: 6, seconds: 1932, title: "Maximizing the Value of Rushes: From Setup to Analysis", description: "In Avid Media Composer, from creating the project to finding the sound and pictures worth using in your rushes." },
    { number: 7, seconds: 486, title: "Make the Right Choice: Choosing the Best Take", description: "How to pick the take for each moment, and how to mark your footage as you go." },
    { number: 8, seconds: 886, title: "Working with Footage: Importing and Organizing Your Media", description: "Going back over the material until you know it, so the story stays consistent, with shortcuts that keep the cut moving." },
    { number: 9, seconds: 457, title: "Making the Most of Keyboard Shortcuts", description: "Avid Media Composer basics: shortcuts to insert clips, move them between modes and work faster." },
    { number: 10, seconds: 1764, title: "Creating a Cohesive Story: Structuring and Pacing Your Film", description: "He builds a first cut from the performances, drops what the story does not need and orders the rest to hold the viewer." },
    { number: 11, seconds: 77, title: "Send Us Your Rough Cut", description: "A short note from Anthony inviting you to make your own rough cut." },
    { number: 12, seconds: 1208, title: "Fine-Tuning Your Edit", description: "With the rough cut done, he watches it again and again, cuts what slows it down, tightens the pace and adds music." },
    { number: 13, seconds: 535, title: "Mastering Transitions and Cuts to Tell a Story", description: "L cut, J cut, jump cut, cross-cutting, cutaway, match cut, cutting on action and montage, and how each one helps the story." },
    { number: 14, seconds: 991, title: "Exporting and Delivering Your Film: Preparing for Distribution", description: "Exporting sound and picture, choosing a format, and exporting only the part you have marked." },
    { number: 15, seconds: 291, title: "Important Qualities of an Editor", description: "Care over every cut, the confidence to make suggestions, experience and patience." },
    { number: 16, seconds: 202, title: "Collaborating with Your Director: Maintaining a Creative Partnership", description: "Why the director and editor have to agree on the film, and how to keep that partnership working." },
    { number: 17, seconds: 241, title: "Breaking into the Industry: Tips and Strategies for Success as a Film Editor", description: "A sense for editing takes time. How to keep improving, work faster and earn bigger chances with new directors." },
    { number: 18, seconds: 130, title: "Know Your Audience", description: "How audiences in different places react to the same scene, and how to cut for the moment they will clap or cheer." },
    { number: 19, seconds: 136, title: "Send Us Your Work", description: "His closing note: keep practising, and keep asking questions about editing." },
  ],

  skills: [
    { skill: "Set up a project and sort your rushes before you cut.", lesson: [5, 6, 8] },
    { skill: "Pick the best take for each moment.", lesson: 7 },
    { skill: "Build a rough cut that holds the story together.", lesson: 10 },
    { skill: "Trim the cut, tighten the pace and add music.", lesson: 12 },
    { skill: "Use L cuts, J cuts, match cuts, cutaways and montage.", lesson: 13 },
    { skill: "Keep a good working partnership with your director.", lesson: 16 },
  ],

  forYou: [
    "You edit videos and want to learn how a feature film editor thinks.",
    "You want to watch a short film cut from raw footage to export.",
    "You want to work with directors and know what they expect from an editor.",
  ],
  notForYou: [
    "You want step-by-step lessons in Premiere Pro or DaVinci Resolve. He works in Avid Media Composer.",
    "You want Anthony to review your edits or answer you live.",
    "You want a course that promises you editing work.",
  ],

  quotes: [],

  clipsBody: "Short silent clips from the lessons. Each plays when it scrolls into view.",
  clips: [
    {
      title: "Picking the take",
      body: "Real rushes in Avid Media Composer, with Anthony at the desk.",
      lesson: [6, 7],
      src: `${DIR}/clips/rushes.mp4`,
      poster: `${DIR}/clips/rushes.jpg`,
      alt: "Avid Media Composer with a bin of rushes, Anthony Gonsalvez at the desk in an inset",
    },
    {
      title: "Cut by cut",
      body: "L cuts, J cuts, jump cuts, cross-cutting, cutaways, match cuts and montage, and when each one helps the story.",
      lesson: 13,
      src: `${DIR}/clips/cuts.mp4`,
      poster: `${DIR}/clips/cuts.jpg`,
      alt: "A scene from Vettaiyaadu Vilaiyaadu shown in the lesson",
    },
    {
      title: "Tighten, then add music",
      body: "Once the rough cut is done he trims it, picks up the pace and brings in music.",
      lesson: 12,
      src: `${DIR}/clips/timeline.mp4`,
      poster: `${DIR}/clips/timeline.jpg`,
      alt: "An Avid Media Composer timeline as Anthony Gonsalvez edits a scene",
    },
  ],

  credits: {
    heading: "Films he *edited*",
    body: "The editor behind these films teaches every lesson himself.",
    items: [
      { title: "Kaakha Kaakha", image: `${DIR}/films/kaakha-kaakha.jpg`, alt: "Kaakha Kaakha film poster" },
      { title: "Vaaranam Aayiram", image: `${DIR}/films/vaaranam-aayiram.jpg`, alt: "Vaaranam Aayiram film poster" },
      { title: "Sivaji", image: `${DIR}/films/sivaji.jpg`, alt: "Sivaji film poster" },
      { title: "Enthiran", image: `${DIR}/films/enthiran.jpg`, alt: "Enthiran film poster" },
      { title: "I", image: `${DIR}/films/i.jpg`, alt: "I film poster" },
      { title: "Yennai Arindhaal", image: `${DIR}/films/yennai-arindhaal.jpg`, alt: "Yennai Arindhaal film poster" },
      { title: "Sarvam Thaala Mayam", image: `${DIR}/films/sarvam-thaala-mayam.jpg`, alt: "Sarvam Thaala Mayam film poster" },
      { title: "Stalin", image: `${DIR}/films/stalin.jpg`, alt: "Stalin film poster" },
    ],
  },

  whatYouGet: [
    { title: `${o.lessons} video lessons`, detail: `${formatRuntime(o.runtimeMinutes)} in all` },
    { title: "A short film edited in front of you", detail: "From rushes to export" },
    { title: "Transitions, cut by cut", detail: "L cut, J cut, match cut, cutaway: lesson 13" },
    { title: o.language },
    { title: "Watch on phone, tablet or laptop" },
    { title: "Access for life" },
    { title: "Signed certificate from Anthony Gonsalvez", detail: "Download it when you finish every lesson" },
  ],
  bonusHeading: "Bonuses worth ₹19,999, for every buyer",
  bonuses: [{ title: "PDF workbook for every lesson" }, { title: "LevelUp community access" }],
  valueComparisons: [
    { label: "Each hour of teaching", value: pricePerHour(o.price, o.runtimeMinutes) },
    { label: "Access", value: "For life" },
    { label: "Certificate", value: "Signed by Anthony Gonsalvez" },
  ],

  reviews: reviews as StoredReview[],
  reviewsBody:
    "One buyer of this masterclass wrote a review. The rest come from LevelUp's other editing programmes. All are quoted as written, and each card names its course.",

  faqs: [
    {
      question: "Who is this for?",
      answer:
        "Anyone who edits or wants to: beginners, working editors and filmmakers. Anthony breaks down his own process and edits a scene from the footage, step by step.",
    },
    {
      question: "Do I need editing experience?",
      answer: `No. You need an interest in learning, a phone, tablet or laptop with internet, and ${formatRuntime(o.runtimeMinutes)} to watch it all.`,
    },
    { question: "Which software does he use?", answer: "Avid Media Composer. Lessons 6 and 9 show how he sets it up and works in it." },
    { question: "Which language is it in?", answer: `${o.language}.` },
    {
      question: "Is it live?",
      answer: "No. Anthony teaches every lesson on video, so you watch when it suits you. There are no live sessions.",
    },
    {
      question: "Do I get a certificate?",
      answer: "Yes, a signed certificate from Anthony Gonsalvez. You can download it once you finish every lesson.",
    },
    SHARED_FAQ.refund,
    SHARED_FAQ.access,
    SHARED_FAQ.devices,
  ],

  crossSell: ["nelson-dilipkumar", "lokesh-kanagaraj", "karthik-subbaraj"],

  price: o.price,
  ctaLabel: "Buy the masterclass",

  seo: {
    title: "Anthony Gonsalvez Film Editing Masterclass | LevelUp Learning",
    description: `Watch Anthony Gonsalvez cut a short film in Avid, from rushes to export. ${o.lessons} lessons, ${formatRuntime(o.runtimeMinutes)}, in English. ${formatPrice(o.price)}, paid once.`,
  },
  ogImage: `${DIR}/og.jpg`,
};

export default data;
