// One row per masterclass for the /masterclass index page, its comparison
// table and its JSON-LD. Keep these figures equal to the course pages.
//
// Sources, checked 17 October 2026:
// - price: the price each course page charges (no strike-through prices here)
// - lessons: Rahul's confirmed counts (handoff note, 17 Oct). Ravi's count is
//   unsettled (page lists 16, checkout 15, VdoCipher holds 15), so it is null
//   and the page shows no number for it until he confirms.
// - runtime: measured from VdoCipher on 17 Oct; Nelson and Ravi as stated on
//   their pages (Nelson's last 5 episodes are not uploaded yet).
// - language: Rahul (Ravi, 17 Oct) and each page's course details.
// - credits: the films each page names or shows as posters.
import nelsonImg from "@/assets/nelson-dilipkumar.jpg";
import lokeshImg from "@/assets/lokesh-kanagaraj.png";
import karthikImg from "@/assets/karthik-subbaraj-masterclass.png";
import raviImg from "@/assets/ravi-basrur.webp";
import anthonyImg from "@/assets/anthony-gonsalvez-masterclass.png";
import kiranImg from "@/assets/drk-kiran.webp";
import venketImg from "@/assets/venket-ram.png";

export type Craft = "direction" | "editing" | "music" | "art-direction" | "photography";

export const CRAFT_LABEL: Record<Craft, string> = {
  direction: "Direction",
  editing: "Film editing",
  music: "Music scoring",
  "art-direction": "Art direction",
  photography: "Photography",
};

export interface MasterclassListing {
  slug: string;
  name: string;
  role: string;
  craft: Craft;
  courseName: string;
  summary: string;
  creditsLabel: string;
  credits: string[];
  lessons: number | null;
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

export const masterclassListings: MasterclassListing[] = [
  {
    slug: "nelson-dilipkumar",
    name: "Nelson Dilipkumar",
    role: "Director",
    craft: "direction",
    courseName: "Nelson Dilipkumar Teaches Filmmaking",
    summary: "How he writes and stages commercial cinema, from the first idea to the set.",
    creditsLabel: "Directed",
    credits: ["Kolamaavu Kokila", "Doctor", "Beast", "Jailer", "Jailer 2"],
    lessons: 29,
    runtime: "2h 20m",
    runtimeIso: "PT2H20M",
    language: "Tamil, English subtitles",
    languageCodes: ["ta"],
    price: 2499,
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
    lessons: 15,
    runtime: "1h 34m",
    runtimeIso: "PT1H34M",
    language: "Tamil, English subtitles",
    languageCodes: ["ta"],
    price: 1499,
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
    lessons: 24,
    runtime: "3h 4m",
    runtimeIso: "PT3H4M",
    language: "Tamil, English subtitles",
    languageCodes: ["ta"],
    price: 2499,
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
    lessons: null,
    runtime: "5h 10m",
    runtimeIso: "PT5H10M",
    language: "Kannada, English subtitles",
    languageCodes: ["kn"],
    price: 2499,
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
    lessons: 19,
    runtime: "3h 3m",
    runtimeIso: "PT3H3M",
    language: "English",
    languageCodes: ["en"],
    price: 1999,
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
    lessons: 20,
    runtime: "1h 52m",
    runtimeIso: "PT1H52M",
    language: "Tamil and English",
    languageCodes: ["ta", "en"],
    price: 999,
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
    lessons: 21,
    runtime: "2h 19m",
    runtimeIso: "PT2H19M",
    language: "Tamil and English",
    languageCodes: ["ta", "en"],
    price: 2499,
    image: venketImg,
  },
];

export const formatRupees = (n: number) => `₹${n.toLocaleString("en-IN")}`;

export const lowestPrice = Math.min(...masterclassListings.map((m) => m.price));
