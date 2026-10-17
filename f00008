/**
 * DRK Kiran Teaches Art Direction.
 *
 * Sources: lesson titles and descriptions from the course; running times
 * from VdoCipher (the first 20 videos, 6,716 s; the folder also holds four
 * repeat uploads and the trailer, which are not lessons); price, language
 * and checkout from OFFERINGS in ./shared.ts; reviews copied word for word
 * from src/data/reviews.json into ./content/drk-kiran.reviews.json. The
 * film list is the one this page has always shown. There is no transcript
 * of this course yet, so `quotes` is empty.
 */
import { OFFERINGS, SHARED_FAQ, formatPrice, formatRuntime } from "./shared";
import { courseDetailsFor, pricePerHour } from "./template";
import reviews from "./content/drk-kiran.reviews.json";
import type { MasterclassPageData, StoredReview } from "./types";

const o = OFFERINGS["drk-kiran"];
const DIR = "/masterclass/drk-kiran";

const data: MasterclassPageData = {
  slug: "drk-kiran",
  name: "DRK Kiran",
  discipline: "Art Direction",
  title: "Teaches Art Direction",
  theme: { accent: "#f08a62", accentRgb: "240 138 98", motif: "blueprint" },

  hero: {
    headline: "How DRK Kiran built a 1980s jewellery shop and a Prime Minister's office for the screen.",
    lines: [
      "Set design, props, miniatures and location scouting.",
      "Taught through films he worked on, from Ko to Kaappaan.",
      "How art and VFX share the work on a song in Ko.",
    ],
    image: `${DIR}/hero`,
    imageAlt: "DRK Kiran seated on a film set, a projector behind him",
    mobilePosition: "50% 20%",
  },

  proofLine: "1800+ Students have bought this course",
  closingLine: "See how a film set is planned, from the miniature to the last prop.",

  courseDescription:
    "DRK Kiran teaches art direction through films he has worked on. He covers problems that come up on set, observation, set design and props, working with directors and cinematographers, location scouting and miniatures, with case studies from Anegan, Ko, Kaappaan and Thaanaa Serndha Koottam.",
  courseDetails: courseDetailsFor("drk-kiran"),

  trailer: {
    youtubeId: "5qnuEq10Xjg",
    title: "DRK Kiran Teaches Art Direction, official trailer",
    poster: `${DIR}/trailer.jpg`,
  },

  lessons: [
    { number: 1, seconds: 460, title: "The Art of Adaptation: Understanding On-Set Challenges", description: "Last-minute problems on set and how to deal with them on the spot, with case studies from Anegan." },
    { number: 2, seconds: 475, title: "Seeing Beyond the Frame: The Art of Observation", description: "Why close observation matters, and how art directors set the look of a film." },
    { number: 3, seconds: 358, title: "From Concept to Creation: Learning Set Design and Props", description: "The difference between a production designer and an art director, and a first look at sets and props." },
    { number: 4, seconds: 302, title: "Cultivating Creative Leadership: Mentoring Assistant Art Directors", description: "Leading a team: what the art director and the assistants each need to do, and how to mentor them." },
    { number: 5, seconds: 439, title: "Time Management and Critical Thinking for Art Directors", description: "Managing time, and making clear creative decisions when the shoot throws up a problem." },
    { number: 6, seconds: 433, title: "Understanding the Power of Effective Communication", description: "Talking with directors and collaborators so you get what the film needs, with Anegan as the example." },
    { number: 7, seconds: 229, title: "Visualizing Personality: When Art Direction and Story Converge", description: "Why an art director must know the plot, and how a set can show what a character likes." },
    { number: 8, seconds: 220, title: "From Blueprint to Big Screen: Pre-vis, Set Design, and Miniatures", description: "Pre-visualisation, set building and miniatures, and how each one serves the story." },
    { number: 9, seconds: 339, title: "Constructing Cinematic Worlds: A Deep Dive into Set Design", description: "What set designers do, and what to settle before construction starts." },
    { number: 10, seconds: 348, title: "Set Design Strategies: Using Characters to Shape Interiors", description: "Interiors built around a character, and props that tell you who lives there." },
    { number: 11, seconds: 328, title: "Revealing the Art of Location Scouting", description: "Choosing locations that make a film feel real, and how the director, cameraman and art director decide together." },
    { number: 12, seconds: 291, title: "The Power of Miniature Artistry: Elevating Set Design", description: "Miniatures in art direction, planning sets with the cinematographer, and Kaappaan as a case study." },
    { number: 13, seconds: 382, title: "Song Case Study, Ko: Art Direction and VFX Collaboration", description: "How art and visual effects share the work, shown through a song from Ko." },
    { number: 14, seconds: 259, title: "Decoding the Dynamic Duo of Art Director and Cinematographer", description: "How the art director and cinematographer work together on sets, colour, light and mood." },
    { number: 15, seconds: 188, title: "Behind the Scenes of Thaanaa Serndha Koottam", description: "The making of Thaanaa Serndha Koottam: physical and digital sets, and how they were combined." },
    { number: 16, seconds: 552, title: "Time Travel Through Design: Crafting Authenticity with Props", description: "Bringing back the 1980s in Thaanaa Serndha Koottam with period props, vintage vehicles and CG." },
    { number: 17, seconds: 161, title: "Designing Nostalgia: Recreating the 80's Aesthetics", description: "Recreating a 1980s jewellery shop: actress posters, old telephones and the jewellery itself." },
    { number: 18, seconds: 172, title: "Precision in Perspective: The Art Director's Guide to Details", description: "Why research matters for period sets, how childhood observation became a career, and why small details count." },
    { number: 19, seconds: 519, title: "Observational Mastery: Recreating the Prime Minister's Office", description: "How observation led to the Prime Minister's office set in Kaappaan." },
    { number: 20, seconds: 261, title: "Small Scene, Big Impact: The Significance of Details", description: "The last lesson: why even the smallest scene needs care over every detail." },
  ],

  skills: [
    { skill: "Solve last-minute problems on set.", lesson: [1, 5] },
    { skill: "Observe a space the way an art director does.", lesson: [2, 18] },
    { skill: "Use a set to show who a character is.", lesson: [7, 10] },
    { skill: "Plan a set with pre-visualisation and miniatures.", lesson: [8, 12] },
    { skill: "Split the work between the art department and VFX.", lesson: 13 },
    { skill: "Recreate a period with the right props.", lesson: [16, 17] },
  ],

  forYou: [
    "You want to design sets and props for films.",
    "You make films and want to know what the art department does.",
    "You want to see how a film set is planned, from miniature to build.",
  ],
  notForYou: [
    "You want lessons in design software. These lessons are about planning and building sets.",
    "You want DRK Kiran to critique your work or answer you live.",
    "You want a course that promises you work in films.",
  ],

  quotes: [],

  clipsBody: "Short silent clips from the lessons. Each plays when it scrolls into view.",
  clips: [
    {
      title: "Thinking on set",
      body: "Lesson 1 opens with last-minute problems on set and how he solved them, with Anegan as the example.",
      lesson: [1, 5],
      src: `${DIR}/clips/on-set.mp4`,
      poster: `${DIR}/clips/on-set.jpg`,
      alt: "DRK Kiran talking on a film set, then a street location",
    },
    {
      title: "Miniatures first",
      body: "He plans a set with a miniature before it is built, with Kaappaan as the example.",
      lesson: [8, 12],
      src: `${DIR}/clips/miniatures.mp4`,
      poster: `${DIR}/clips/miniatures.jpg`,
      alt: "DRK Kiran on set, then a white miniature model of a stage set",
    },
    {
      title: "Case studies from his films",
      body: "Anegan, Ko, Kaappaan and Thaanaa Serndha Koottam, each one taken apart.",
      src: `${DIR}/clips/studio.mp4`,
      poster: `${DIR}/clips/studio.jpg`,
      alt: "DRK Kiran in a white studio, pen in hand",
    },
  ],

  credits: {
    heading: "Films he *worked on*",
    body: "He takes apart Thaanaa Serndha Koottam in lessons 15 to 17.",
    items: [
      { title: "Jailer", image: `${DIR}/films/jailer.jpg`, alt: "Jailer film poster" },
      { title: "Beast", image: `${DIR}/films/beast.jpg`, alt: "Beast film poster" },
      { title: "Doctor", image: `${DIR}/films/doctor.jpg`, alt: "Doctor film poster" },
      { title: "Thaanaa Serndha Koottam", image: `${DIR}/films/thaanaa-serndha-koottam.jpg`, alt: "Thaanaa Serndha Koottam film poster", note: "Lessons 15 to 17" },
      { title: "Naanum Rowdy Dhaan", image: `${DIR}/films/naanum-rowdy-dhaan.jpg`, alt: "Naanum Rowdy Dhaan film poster" },
      { title: "3", image: `${DIR}/films/3.jpg`, alt: "3 film poster" },
      { title: "Aranmanai", image: `${DIR}/films/aranmanai.jpg`, alt: "Aranmanai film poster" },
    ],
  },

  whatYouGet: [
    { title: `${o.lessons} video lessons`, detail: `${formatRuntime(o.runtimeMinutes)} in all` },
    { title: "Case studies from four films", detail: "Anegan, Ko, Kaappaan and Thaanaa Serndha Koottam" },
    { title: "Art and VFX on a song in Ko", detail: "Lesson 13" },
    { title: "Miniatures for planning sets", detail: "Lessons 8 and 12" },
    { title: o.language },
    { title: "Watch on phone, tablet or laptop" },
    { title: "Access for life" },
    { title: "Signed certificate from DRK Kiran", detail: "Download it when you finish every lesson" },
  ],
  bonusHeading: "Bonuses worth ₹19,999, for every buyer",
  bonuses: [{ title: "PDF workbook for every lesson" }, { title: "LevelUp community access" }],
  valueComparisons: [
    { label: "Each hour of teaching", value: pricePerHour(o.price, o.runtimeMinutes) },
    { label: "Access", value: "For life" },
    { label: "Certificate", value: "Signed by DRK Kiran" },
  ],

  reviews: reviews as StoredReview[],
  reviewsBody:
    "This masterclass has no written reviews yet. These come from learners of LevelUp's other film programmes, quoted as written. Each card names its course.",

  faqs: [
    {
      question: "What will I learn?",
      answer:
        "Art direction through real case studies: thinking fast on set, set design, props, miniatures, location scouting, and working with the director and cinematographer.",
    },
    {
      question: "Who is it for?",
      answer:
        "Aspiring filmmakers, art direction students and anyone curious about how film sets are made. You do not need any experience.",
    },
    { question: "Which films does he use as examples?", answer: "Anegan, Ko, Kaappaan and Thaanaa Serndha Koottam." },
    { question: "Which language is it in?", answer: `${o.language}.` },
    {
      question: "Is it live?",
      answer: "No. DRK Kiran teaches every lesson on video, so you watch when it suits you. There are no live sessions.",
    },
    {
      question: "Do I get a certificate?",
      answer: "Yes, a signed certificate from DRK Kiran. You can download it once you finish every lesson.",
    },
    SHARED_FAQ.refund,
    SHARED_FAQ.access,
    SHARED_FAQ.devices,
  ],

  crossSell: ["nelson-dilipkumar", "g-venket-ram", "lokesh-kanagaraj"],

  price: o.price,
  ctaLabel: "Buy the masterclass",

  seo: {
    title: "DRK Kiran Art Direction Masterclass | LevelUp Learning",
    description: `Learn set design, props, miniatures and location scouting from DRK Kiran, through films he worked on. ${o.lessons} lessons, ${formatRuntime(o.runtimeMinutes)}. ${formatPrice(o.price)}, paid once.`,
  },
  ogImage: `${DIR}/og.jpg`,
};

export default data;
