/**
 * G Venket Ram Teaches Photography.
 *
 * Sources: lesson titles and descriptions from the course; running times
 * from VdoCipher (21 videos, 8,358 s); price, language and checkout from
 * OFFERINGS in ./shared.ts; reviews copied word for word from
 * src/data/reviews.json into ./content/g-venket-ram.reviews.json.
 * There is no transcript of this course yet, so `quotes` is empty and the
 * "In his words" section is left out.
 */
import { OFFERINGS, SHARED_FAQ, formatPrice, formatRuntime } from "./shared";
import { courseDetailsFor, pricePerHour } from "./template";
import reviews from "./content/g-venket-ram.reviews.json";
import type { MasterclassPageData, StoredReview } from "./types";

const o = OFFERINGS["g-venket-ram"];
const DIR = "/masterclass/g-venket-ram";

const data: MasterclassPageData = {
  slug: "g-venket-ram",
  name: "G Venket Ram",
  discipline: "Photography",
  title: "Teaches Photography",
  theme: { accent: "#f3c6a1", accentRgb: "243 198 161", motif: "lens" },

  hero: {
    headline: "Light, lenses and the Bigil poster shoot, taught by G Venket Ram.",
    lines: [
      "Set up studio light that looks like daylight.",
      "Learn what fashion, food and wildlife shoots each demand.",
      "Watch him recreate Raja Ravi Varma paintings in two case studies.",
    ],
    image: `${DIR}/hero`,
    imageAlt: "G Venket Ram at his desk in his studio, a camera in front of him",
    mobilePosition: "50% 22%",
    focus: { x: 50, y: 52, dx: 45, dy: 46 },
  },

  proofLine: "1800+ Students have bought this course",
  closingLine: "Start with light. Finish with a full studio shoot.",

  courseDescription:
    "G Venket Ram teaches photography through his own work. He starts with light, the camera and composition, then covers wildlife, fashion and food shoots, his Raja Ravi Varma recreations and the Bigil poster shoot. In lessons 16 to 21 you follow him into the studio, from recreating daylight indoors to the shoot itself.",
  courseDetails: courseDetailsFor("g-venket-ram"),

  trailer: {
    youtubeId: "j8bJXiHLmmE",
    title: "G Venket Ram Teaches Photography, official trailer",
    poster: `${DIR}/trailer.jpg`,
  },

  lessons: [
    { number: 1, seconds: 304, title: "Introduction", description: "G Venket Ram introduces his work and how he will teach this class." },
    { number: 2, seconds: 665, title: "Beginnings", description: "How his wish to express himself turned into photography, and why each photographer has to find their own way in." },
    { number: 3, seconds: 533, title: "Definition of Light", description: "What light is and how it lets us see. A first look at light in photography." },
    { number: 4, seconds: 227, title: "Understanding Light", description: "Photography is painting with light. Why a photographer has to understand light first." },
    { number: 5, seconds: 470, title: "Painter's Perception of Light", description: "How painters shaped his work, and why a photographer should watch the world the way they do." },
    { number: 6, seconds: 493, title: "The Camera: Getting Started", description: "What a camera does, how cameras have changed, and the main types." },
    { number: 7, seconds: 533, title: "Understanding Lenses", description: "Which lens suits which subject, and what aperture, shutter speed and ISO do to a picture." },
    { number: 8, seconds: 303, title: "Composition", description: "Why composition is where a photographer's own voice shows, and the elements it is built from." },
    { number: 9, seconds: 468, title: "Case Study 1: Conceptualisation", description: "Turning an idea into a shoot, the first step of telling a story, shown through a case study." },
    { number: 10, seconds: 331, title: "Wildlife Photography", description: "What goes into wildlife photography, and what to know before you choose it." },
    { number: 11, seconds: 247, title: "Fashion Photography", description: "The parts of a fashion shoot, and what to know before you choose this field." },
    { number: 12, seconds: 404, title: "Food Photography", description: "Why you need to know your subject, and the challenges of shooting food." },
    { number: 13, seconds: 547, title: "Case Study 2: Raja Ravi Varma, Part 1", description: "His project with the Naam Foundation, recreating Raja Ravi Varma paintings with well-known artistes, and how he prepared it." },
    { number: 14, seconds: 374, title: "Case Study 2: Raja Ravi Varma, Part 2", description: "Another painting recreated. How textiles, light and composition decide the result." },
    { number: 15, seconds: 384, title: "Case Study 3: Bigil", description: "Working with stars and shooting film posters, through his work on Bigil." },
    { number: 16, seconds: 153, title: "Into the Studio: Getting Started", description: "The first studio session: how to start a studio shoot, beginning with the concept." },
    { number: 17, seconds: 98, title: "Setting Up Your Shoot", description: "Setting up the shot: the background and the lighting." },
    { number: 18, seconds: 129, title: "Collaboration for a Fashion Shoot: Makeup and Hair", description: "How he works with makeup artists and designers on a fashion shoot." },
    { number: 19, seconds: 315, title: "Art and Lighting Setup: Recreating Daylight in the Studio", description: "When weather, budget or time keep you indoors, how to set studio lights so they look like daylight." },
    { number: 20, seconds: 816, title: "Working with the Setup: The Shoot", description: "The shoot itself: working with the setup, the model and the crew to get the picture he wants." },
    { number: 21, seconds: 564, title: "Secrets of Great Looking Portraits: Experimenting with Lighting", description: "Experimenting with light to get a portrait that looks its best." },
  ],

  skills: [
    { skill: "Read light, and see how it changes through the day.", lesson: [3, 4] },
    { skill: "Use aperture, shutter speed and ISO on purpose.", lesson: [6, 7] },
    { skill: "Compose a frame with intent.", lesson: 8 },
    { skill: "Know what wildlife, fashion and food shoots each demand.", lesson: "Lessons 10 to 12" },
    { skill: "Shoot well-known faces for a film poster.", lesson: 15 },
    { skill: "Recreate daylight inside a studio.", lesson: 19 },
  ],

  forYou: [
    "You take photos, on a phone or a camera, and want them to look planned, not lucky.",
    "You want to understand light before you spend on more gear.",
    "You want to shoot portraits, fashion, food or film posters.",
    "You want to see how a working photographer plans a real shoot.",
  ],
  notForYou: [
    "You want lessons on Lightroom or photo editing. This course has none.",
    "You want G Venket Ram to review your photos or answer you live.",
    "You want a course that promises you photography work.",
  ],

  quotes: [],

  clipsBody: "Short silent clips from the lessons. Each plays when it scrolls into view.",
  clips: [
    {
      title: "Light changes through the day",
      body: "Evening light is softer. He shows why the time of day and the atmosphere decide the picture.",
      lesson: [3, 4],
      src: `${DIR}/clips/light.mp4`,
      poster: `${DIR}/clips/light.jpg`,
      alt: "A sunset over water, then G Venket Ram explaining light in his studio",
    },
    {
      title: "What your lens is doing",
      body: "Aperture, the opening that lets light reach the sensor, shown on a real camera and lens.",
      lesson: 7,
      src: `${DIR}/clips/lens.mp4`,
      poster: `${DIR}/clips/lens.jpg`,
      alt: "Close-up of a camera lens and its aperture",
    },
    {
      title: "Twelve artists, twelve paintings",
      body: "His Raja Ravi Varma series: 12 artists, each recreating one of the paintings on camera.",
      lesson: [13, 14],
      src: `${DIR}/clips/ravi-varma.mp4`,
      poster: `${DIR}/clips/ravi-varma.jpg`,
      alt: "G Venket Ram talking about his Raja Ravi Varma recreations",
    },
  ],

  credits: {
    heading: "Shot by *G Venket Ram*",
    body: "Film posters, stills and the Raja Ravi Varma series, which he takes apart in lessons 13 and 14.",
    items: [
      {
        title: "Raja Ravi Varma, recreated",
        image: `${DIR}/films/ravi-varma.jpg`,
        alt: "A Raja Ravi Varma painting beside G Venket Ram's photograph recreating it",
        note: "With the Naam Foundation. Lessons 13 and 14",
        wide: true,
      },
      { title: "Theri", image: `${DIR}/films/theri.jpg`, alt: "Theri film poster" },
      { title: "Vishwaroopam", image: `${DIR}/films/vishwaroopam.jpg`, alt: "Kamal Haasan in a Vishwaroopam still" },
      { title: "24", image: `${DIR}/films/24.jpg`, alt: "24 film poster" },
      { title: "Kadaram Kondan", image: `${DIR}/films/kadaram-kondan.jpg`, alt: "Kadaram Kondan film poster" },
      { title: "Jaanu", image: `${DIR}/films/jaanu.jpg`, alt: "Jaanu film poster" },
      { title: "Raangi", image: `${DIR}/films/raangi.jpg`, alt: "Raangi film poster" },
    ],
  },

  whatYouGet: [
    { title: `${o.lessons} video lessons`, detail: `${formatRuntime(o.runtimeMinutes)} in all` },
    { title: "Two Raja Ravi Varma case studies", detail: "Lessons 13 and 14" },
    { title: "The Bigil poster shoot", detail: "Lesson 15" },
    { title: "A studio shoot, start to finish", detail: "Lessons 16 to 21" },
    { title: o.language },
    { title: "Watch on phone, tablet or laptop" },
    { title: "Access for life" },
    { title: "Signed certificate from G Venket Ram", detail: "Download it when you finish every lesson" },
  ],
  bonusHeading: "Bonuses worth ₹19,999, for every buyer",
  bonuses: [{ title: "PDF workbook for every lesson" }, { title: "LevelUp community access" }],
  valueComparisons: [
    { label: "Each hour of teaching", value: pricePerHour(o.price, o.runtimeMinutes) },
    { label: "Access", value: "For life" },
    { label: "Certificate", value: "Signed by G Venket Ram" },
  ],

  reviews: reviews as StoredReview[],
  reviewsBody:
    "Three buyers of this masterclass wrote a review. The rest come from LevelUp's other photography programmes. All are quoted as written, and each card names its course.",

  faqs: [
    {
      question: "Who is this for?",
      answer:
        "Anyone who wants to take better photographs, from beginners to working photographers. G Venket Ram teaches from his own shoots rather than from a rule book, so you can build your own style from his process.",
    },
    {
      question: "Do I need to know photography already?",
      answer: `No. You need an interest in learning, a phone, tablet or laptop with internet, and ${formatRuntime(o.runtimeMinutes)} to watch it all.`,
    },
    { question: "Which language is it in?", answer: `${o.language}.` },
    {
      question: "Is it live?",
      answer: "No. G Venket Ram teaches every lesson on video, so you watch when it suits you. There are no live sessions.",
    },
    {
      question: "Does it teach Lightroom or photo editing?",
      answer: "No. It covers light, the camera, composition, photography genres, three case studies and a studio shoot.",
    },
    {
      question: "Do I get a certificate?",
      answer: "Yes, a signed certificate from G Venket Ram. You can download it once you finish every lesson.",
    },
    SHARED_FAQ.refund,
    SHARED_FAQ.access,
    SHARED_FAQ.devices,
  ],

  crossSell: ["drk-kiran", "karthik-subbaraj", "nelson-dilipkumar"],

  price: o.price,
  ctaLabel: "Buy the masterclass",

  seo: {
    title: "G Venket Ram Photography Masterclass | LevelUp Learning",
    description: `Learn light, lenses, composition and studio lighting from G Venket Ram. ${o.lessons} lessons, ${formatRuntime(o.runtimeMinutes)}. ${formatPrice(o.price)}, paid once.`,
  },
  ogImage: `${DIR}/og.jpg`,
};

export default data;
