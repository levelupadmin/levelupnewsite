// One row per masterclass for the /masterclass index page, its comparison
// table and its JSON-LD.
//
// Lessons, runtime, language and price are read from OFFERINGS in
// src/data/masterclass/shared.ts, the file the course pages read, so the index
// can never disagree with them. Change those facts there, not here.
//
// Written by hand here: role, craft, course name, summary, credits (the films
// each page names or shows as posters) and the poster image.
import nelsonImg from "@/assets/nelson-dilipkumar.jpg";
import lokeshImg from "@/assets/lokesh-kanagaraj.png";
import karthikImg from "@/assets/karthik-subbaraj-masterclass.png";
import raviImg from "@/assets/ravi-basrur.webp";
import anthonyImg from "@/assets/anthony-gonsalvez-masterclass.png";
import kiranImg from "@/assets/drk-kiran.webp";
import venketImg from "@/assets/venket-ram.png";
import {
  OFFERINGS,
  formatRuntime,
  isoDuration,
  type MasterclassSlug,
} from "@/data/masterclass/shared";

export type Craft = "direction" | "editing" | "music" | "art-direction" | "photography";

export const CRAFT_LABEL: Record<Craft, string> = {
  direction: "Direction",
  editing: "Film editing",
  music: "Music scoring",
  "art-direction": "Art direction",
  photography: "Photography",
};

export interface MasterclassListing {
  slug: MasterclassSlug;
  name: string;
  role: string;
  craft: Craft;
  courseName: string;
  summary: string;
  creditsLabel: string;
  credits: string[];
  lessons: number;
  runtime: string;
  /** ISO 8601 duration for schema.org timeRequired */
  runtimeIso: string;
  language: string;
  /** schema.org inLanguage, BCP 47 */
  languageCodes: string[];
  price: number;
  /** Poster URL; this project's asset imports resolve to plain URLs */
  image: string;
}

/** Fields written by hand; the rest come from OFFERINGS. */
type ListingCopy = Pick<
  MasterclassListing,
  "slug" | "name" | "role" | "craft" | "courseName" | "summary" | "creditsLabel" | "credits" | "image"
>;

const LISTING_COPY: ListingCopy[] = [
  {
    slug: "nelson-dilipkumar",
    name: "Nelson Dilipkumar",
    role: "Director",
    craft: "direction",
    courseName: "Nelson Dilipkumar Teaches Filmmaking",
    summary: "How he writes and stages commercial cinema, from the first idea to the set.",
    creditsLabel: "Directed",
    credits: ["Kolamaavu Kokila", "Doctor", "Beast", "Jailer", "Jailer 2"],
    image: nelsonImg,
  },
  {
    slug: "lokesh-kanagaraj",
    name: "Lokesh Kanagaraj",
    role: "Director",
    craft: "direction",
    courseName: "Lokesh Kanagaraj Teaches Filmmaking",
    summary: "Writing, directing and building a shared film universe, episode by episode.",
    creditsLabel: "Directed",
    credits: ["Maanagaram", "Kaithi", "Master", "Vikram", "Leo", "Coolie"],
    image: lokeshImg,
  },
  {
    slug: "karthik-subbaraj",
    name: "Karthik Subbaraj",
    role: "Director",
    craft: "direction",
    courseName: "Karthik Subbaraj Teaches Filmmaking",
    summary: "Storytelling, editing and working with actors, from his own films.",
    creditsLabel: "Directed",
    credits: ["Pizza", "Jigarthanda", "Petta", "Jagame Thandhiram", "Mahaan"],
    image: karthikImg,
  },
  {
    slug: "ravi-basrur",
    name: "Ravi Basrur",
    role: "Music director",
    craft: "music",
    courseName: "Ravi Basrur Teaches Music Composition",
    summary: "How he scores a film, from the village of Basrur to the KGF soundtrack.",
    creditsLabel: "Scored",
    credits: ["Ugramm", "Mufti", "KGF", "Salaar"],
    image: raviImg,
  },
  {
    slug: "anthony-gonsalvez",
    name: "Anthony Gonsalvez",
    role: "Film editor",
    craft: "editing",
    courseName: "Anthony Gonsalvez Teaches Film Editing",
    summary: "He edits a whole short film on screen and explains each cut as he makes it.",
    creditsLabel: "Edited",
    credits: ["Kaakha Kaakha", "Sivaji", "Vaaranam Aayiram", "Enthiran", "I", "Yennai Arindhaal"],
    image: anthonyImg,
  },
  {
    slug: "drk-kiran",
    name: "DRK Kiran",
    role: "Art director",
    craft: "art-direction",
    courseName: "DRK Kiran Teaches Art Direction",
    summary: "Set design, quick fixes on the shooting floor and miniatures, from his own films.",
    creditsLabel: "Art direction for",
    credits: ["3", "Naanum Rowdy Dhaan", "Thaanaa Serndha Koottam", "Doctor", "Beast", "Jailer"],
    image: kiranImg,
  },
  {
    slug: "g-venket-ram",
    name: "G Venket Ram",
    role: "Photographer",
    craft: "photography",
    courseName: "G Venket Ram Teaches Photography",
    summary: "Light, location and preparation, worked through his own portrait and film shoots.",
    creditsLabel: "Shot stills for",
    credits: ["Theri", "Vishwaroopam", "24", "Kadaram Kondan", "the Raja Ravi Varma calendar"],
    image: venketImg,
  },
];

export const masterclassListings: MasterclassListing[] = LISTING_COPY.map((c) => {
  const o = OFFERINGS[c.slug];
  return {
    ...c,
    lessons: o.lessons,
    runtime: formatRuntime(o.runtimeMinutes),
    runtimeIso: isoDuration(o.runtimeMinutes),
    language: o.language,
    languageCodes: o.inLanguage,
    price: o.price,
  };
});

export const formatRupees = (n: number) => `₹${n.toLocaleString("en-IN")}`;

export const lowestPrice = Math.min(...masterclassListings.map((m) => m.price));
