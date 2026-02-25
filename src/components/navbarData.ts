import navBfp from "@/assets/nav-bfp.png";
import navVe from "@/assets/nav-ve.png";
import navUiux from "@/assets/nav-uiux.png";
import navSw from "@/assets/nav-sw.png";
import navForgeFilmmaking from "@/assets/nav-forge-filmmaking.jpg";
import navForgeWriting from "@/assets/nav-forge-writing.jpg";
import navForgeCreators from "@/assets/nav-forge-creators.jpg";
import nelsonImg from "@/assets/nelson-dilipkumar.jpg";
import karthikImg from "@/assets/karthik-subbaraj.png";
import anthonyImg from "@/assets/anthony-gonsalvez.png";
import venketImg from "@/assets/venket-ram.png";
import kiranImg from "@/assets/drk-kiran.webp";
import raviImg from "@/assets/ravi-basrur.webp";
import lokeshImg from "@/assets/lokesh-kanagaraj.png";

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
        image: karthikImg,
        title: "Karthik Subbaraj",
        subtitle: "Filmmaking",
        href: "https://masterclass.leveluplearning.in/karthik-subbaraj",
      },
      {
        image: anthonyImg,
        title: "Anthony Gonsalvez",
        subtitle: "Film Editing",
        href: "https://masterclass.leveluplearning.in/anthony",
      },
      {
        image: venketImg,
        title: "G Venket Ram",
        subtitle: "Photography",
        href: "https://masterclass.leveluplearning.in/g-venket-ram",
      },
      {
        image: kiranImg,
        title: "DRK Kiran",
        subtitle: "Art Direction",
        href: "https://masterclass.leveluplearning.in/kiran",
      },
      {
        image: raviImg,
        title: "Ravi Basrur",
        subtitle: "Music Composition",
        href: "https://masterclass.leveluplearning.in/ravi-basrur",
      },
      {
        image: lokeshImg,
        title: "Lokesh Kanagaraj",
        subtitle: "Filmmaking",
        href: "https://masterclass.leveluplearning.in/lokesh-kanagaraj",
      },
      {
        image: nelsonImg,
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
        image: navBfp,
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
        image: navForgeFilmmaking,
        title: "Filmmaking Residency",
        subtitle: "10 days · 20 filmmakers · 1 location",
        href: "#forge",
      },
      {
        image: navForgeWriting,
        title: "Writing Retreat",
        subtitle: "Immersive screenwriting intensive",
        href: "#forge",
      },
      {
        image: navForgeCreators,
        title: "Creator Residency",
        subtitle: "Build and ship creative work",
        href: "#forge",
      },
    ],
  },
  {
    label: "About",
    href: "/about",
    description: "",
    items: [],
  },
];
