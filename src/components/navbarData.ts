import masterclass3 from "@/assets/masterclass-3.jpg";
import masterclass4 from "@/assets/masterclass-4.jpg";
import masterclass5 from "@/assets/masterclass-5.jpg";
import liveProgram1 from "@/assets/live-program-1.jpg";
import liveProgram2 from "@/assets/live-program-2.jpg";
import liveProgram3 from "@/assets/live-program-3.jpg";
import forge1 from "@/assets/forge-1.jpg";
import forge2 from "@/assets/forge-2.jpg";
import forge3 from "@/assets/forge-3.jpg";

export interface NavItem {
  image: string;
  title: string;
  subtitle: string;
  href: string;
}

export interface NavLink {
  label: string;
  href: string;
  description: string;
  items: NavItem[];
}

export const navLinks: NavLink[] = [
  {
    label: "Masterclasses",
    href: "https://www.leveluplearning.in/#masterclasses",
    description: "High quality pre-recorded courses taught by India's finest.",
    items: [
      {
        image: "https://cdn.prod.website-files.com/649fbe7d7f61c6fc912e1d33/650c1be5224f49f6432aaae6_1.Karthik_Subburaj%20course%20banner.png",
        title: "Karthik Subbaraj",
        subtitle: "Filmmaking",
        href: "https://www.leveluplearning.in/karthik-subbaraj",
      },
      {
        image: "https://cdn.prod.website-files.com/649fbe7d7f61c6fc912e1d33/64f60ddd91f67b7db8f6716b_3.Anthony_Gonsalvez.png",
        title: "Anthony Gonsalvez",
        subtitle: "Film Editing",
        href: "https://www.leveluplearning.in/anthony",
      },
      {
        image: "https://cdn.prod.website-files.com/649fbe7d7f61c6fc912e1d33/64f2f14d67e5504737c57ea5_2.Venket_Ram.png",
        title: "G Venket Ram",
        subtitle: "Photography",
        href: "https://www.leveluplearning.in/g-venket-ram",
      },
      {
        image: "https://cdn.prod.website-files.com/649fbe7d7f61c6fc912e1d33/64b79ef6d61b238747788c6c_kiran%20website%201.webp",
        title: "DRK Kiran",
        subtitle: "Art Direction",
        href: "https://www.leveluplearning.in/kiran",
      },
      {
        image: "https://cdn.prod.website-files.com/649fbe7d7f61c6fc912e1d33/64b79ef642421ae3cbe004d9_ravi%20website%201.webp",
        title: "Ravi Basrur",
        subtitle: "Music Composition",
        href: "https://www.leveluplearning.in/ravi-basrur-1",
      },
      {
        image: "https://cdn.prod.website-files.com/649fbe7d7f61c6fc912e1d33/6899f2de01c2b6f380973a82_Frame%20191%20LK.png",
        title: "Lokesh Kanagaraj",
        subtitle: "Filmmaking",
        href: "https://masterclass.leveluplearning.in/lokesh-kanagaraj-3",
      },
    ],
  },
  {
    label: "LevelUp Live",
    href: "https://www.leveluplearning.live",
    description: "Live mentor-led programs to accelerate your creative career.",
    items: [
      {
        image: liveProgram1,
        title: "Breakthrough Filmmakers' Program",
        subtitle: "12-week live program",
        href: "https://www.leveluplearning.live/bfp",
      },
      {
        image: liveProgram2,
        title: "Advanced Direction Program",
        subtitle: "4-week intensive",
        href: "https://www.leveluplearning.live/adp",
      },
      {
        image: liveProgram3,
        title: "Video Editing Academy",
        subtitle: "12-week cohort",
        href: "https://www.leveluplearning.live/ve",
      },
    ],
  },
  {
    label: "The Forge",
    href: "#forge",
    description: "India's first residency for filmmakers and storytellers.",
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
