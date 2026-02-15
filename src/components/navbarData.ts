import masterclass3 from "@/assets/masterclass-3.jpg";
import masterclass4 from "@/assets/masterclass-4.jpg";
import masterclass5 from "@/assets/masterclass-5.jpg";
import liveProgram1 from "@/assets/live-program-1.jpg";
import navVe from "@/assets/nav-ve.png";
import navUiux from "@/assets/nav-uiux.png";
import navSw from "@/assets/nav-sw.png";
import forge1 from "@/assets/forge-1.jpg";
import forge2 from "@/assets/forge-2.jpg";
import forge3 from "@/assets/forge-3.jpg";

export interface NavItem {
  image: string;
  title: string;
  subtitle: string;
  href: string;
  objectPosition?: string;
}

export interface NavLink {
  label: string;
  href: string;
  description: string;
  items: NavItem[];
  accent?: string;
  formatBadge?: string;
}

export const navLinks: NavLink[] = [
  {
    label: "Masterclasses",
    href: "#masterclasses",
    description: "High quality pre-recorded courses taught by India's finest.",
    accent: "hsl(38 75% 55%)",
    formatBadge: "On-demand",
    items: [
      {
        image: "https://cdn.prod.website-files.com/649fbe7d7f61c6fc912e1d33/650c1be5224f49f6432aaae6_1.Karthik_Subburaj%20course%20banner.png",
        title: "Karthik Subbaraj",
        subtitle: "Filmmaking",
        href: "https://masterclass.leveluplearning.in/karthik-subbaraj",
      },
      {
        image: "https://cdn.prod.website-files.com/649fbe7d7f61c6fc912e1d33/64f60ddd91f67b7db8f6716b_3.Anthony_Gonsalvez.png",
        title: "Anthony Gonsalvez",
        subtitle: "Film Editing",
        href: "https://masterclass.leveluplearning.in/anthony",
      },
      {
        image: "https://cdn.prod.website-files.com/649fbe7d7f61c6fc912e1d33/64f2f14d67e5504737c57ea5_2.Venket_Ram.png",
        title: "G Venket Ram",
        subtitle: "Photography",
        href: "https://masterclass.leveluplearning.in/g-venket-ram",
      },
      {
        image: "https://cdn.prod.website-files.com/649fbe7d7f61c6fc912e1d33/64b79ef6d61b238747788c6c_kiran%20website%201.webp",
        title: "DRK Kiran",
        subtitle: "Art Direction",
        href: "https://masterclass.leveluplearning.in/kiran",
      },
      {
        image: "https://cdn.prod.website-files.com/649fbe7d7f61c6fc912e1d33/64b79ef642421ae3cbe004d9_ravi%20website%201.webp",
        title: "Ravi Basrur",
        subtitle: "Music Composition",
        href: "https://masterclass.leveluplearning.in/ravi-basrur",
      },
      {
        image: "https://cdn.prod.website-files.com/649fbe7d7f61c6fc912e1d33/6899f2de01c2b6f380973a82_Frame%20191%20LK.png",
        title: "Lokesh Kanagaraj",
        subtitle: "Filmmaking",
        href: "https://masterclass.leveluplearning.in/lokesh-kanagaraj",
      },
      {
        image: "",
        title: "Nelson Dilipkumar",
        subtitle: "Filmmaking",
        href: "https://masterclass.leveluplearning.in/nelson-dilipkumar",
      },
    ],
  },
  {
    label: "LevelUp Live",
    href: "https://www.leveluplearning.live",
    description: "Live mentor-led programs to accelerate your creative career.",
    accent: "hsl(200 35% 55%)",
    formatBadge: "Live",
    items: [
      {
        image: liveProgram1,
        title: "Breakthrough Filmmakers' Program",
        subtitle: "12-week live program",
        href: "https://www.leveluplearning.live/bfp",
      },
      {
        image: navVe,
        title: "Video Editing Academy",
        subtitle: "12-week cohort",
        href: "https://www.leveluplearning.live/ve",
        objectPosition: "center 30%",
      },
      {
        image: navUiux,
        title: "UI/UX Design Academy",
        subtitle: "12-week accelerator",
        href: "https://tally.so/r/wd7eqN",
      },
      {
        image: navSw,
        title: "Screenwriting Workshop",
        subtitle: "8-week program",
        href: "https://tally.so/r/mOd4ek",
      },
    ],
  },
  {
    label: "The Forge",
    href: "#forge",
    description: "India's first residency for filmmakers and storytellers.",
    accent: "hsl(15 65% 55%)",
    formatBadge: "In-person",
    items: [
      {
        image: forge1,
        title: "Filmmaking Residency",
        subtitle: "10 days · 20 filmmakers · 1 location",
        href: "#forge",
      },
      {
        image: forge2,
        title: "Writing Retreat",
        subtitle: "Immersive screenwriting intensive",
        href: "#forge",
      },
      {
        image: forge3,
        title: "Creator Residency",
        subtitle: "Build and ship creative work",
        href: "#forge",
      },
    ],
  },
  {
    label: "Workshops",
    href: "https://study.leveluplearning.in",
    description: "Short, focused workshops to build specific creative skills.",
    items: [
      {
        image: masterclass5,
        title: "Storytelling Masterclass",
        subtitle: "15+ hours · By Rahul Srinivas",
        href: "https://study.leveluplearning.in/services/tsmwebsite",
      },
      {
        image: masterclass3,
        title: "Breakthrough Photography",
        subtitle: "20+ hours · Live + Recorded",
        href: "https://study.leveluplearning.in/services/bppw",
      },
      {
        image: masterclass4,
        title: "Short Filmmaking 101",
        subtitle: "2-hour live workshop",
        href: "https://www.leveluplearning.live/sf",
      },
    ],
  },
  {
    label: "About",
    href: "https://www.leveluplearning.in/contact-us",
    description: "",
    items: [],
  },
];
