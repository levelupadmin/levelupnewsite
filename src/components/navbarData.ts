import navBfp from "@/assets/nav-bfp.png";
import navVe from "@/assets/nav-ve.png";
import navUiux from "@/assets/nav-uiux.png";
import navSw from "@/assets/nav-sw.png";
import navAcp from "@/assets/live-acp.png";
import navForgeFilmmaking from "@/assets/nav-forge-filmmaking.jpg";
import navForgeWriting from "@/assets/nav-forge-writing.jpg";
import navForgeCreators from "@/assets/nav-forge-creators.jpg";
import nelsonImg from "@/assets/nav-nelson-dilipkumar.png";
import karthikImg from "@/assets/navbar-hero-image.png";
import anthonyImg from "@/assets/anthony-gonsalvez.png";
import venketImg from "@/assets/nav-venket-ram.png";
import kiranImg from "@/assets/nav-drk-kiran.png";
import raviImg from "@/assets/nav-ravi-basrur.png";
import lokeshImg from "@/assets/nav-lokesh-kanagaraj.png";

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
  compact?: boolean;
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
        href: "/masterclass/anthony-gonsalvez",
      },
      {
        image: venketImg,
        title: "G Venket Ram",
        subtitle: "Photography",
        href: "/masterclass/g-venket-ram",
      },
      {
        image: kiranImg,
        title: "DRK Kiran",
        subtitle: "Art Direction",
        href: "/masterclass/drk-kiran",
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
    href: "#live-programs",
    description: "Live mentor-led programs to accelerate your creative career.",
    accent: "hsl(200 35% 55%)",
    formatBadge: "Live",
    items: [
      {
        image: navBfp,
        title: "Breakthrough Filmmakers' Program",
        subtitle: "12-week live program",
        href: "https://www.leveluplearning.in/bfp-2",
      },
      {
        image: navVe,
        title: "Video Editing Academy",
        subtitle: "12-week cohort",
        href: "https://www.leveluplearning.in/ve",
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
      {
        image: navAcp,
        title: "Advanced Cinematography Program",
        subtitle: "4-week intensive",
        href: "https://www.leveluplearning.in/acp-2",
      },
    ],
  },
  {
    label: "The Forge",
    href: "#forge",
    description: "The world's only residency for filmmakers, creators, writers, and storytellers.",
    accent: "hsl(15 65% 55%)",
    formatBadge: "In-person",
    items: [
      {
        image: navForgeFilmmaking,
        title: "Filmmaking Residency",
        subtitle: "15 days · 24 filmmakers · 24 short films",
        href: "https://www.forgebylevelup.com/",
      },
      {
        image: navForgeWriting,
        title: "Writing Retreat",
        subtitle: "20 writers · 6 days · 1 beautiful location",
        href: "https://www.forgebylevelup.com/writingresidency",
      },
      {
        image: navForgeCreators,
        title: "Creator Residency",
        subtitle: "Build your personal brand in 12 days",
        href: "https://creators.forgebylevelup.com/",
      },
    ],
  },
  {
    label: "More",
    href: "#",
    description: "",
    compact: true,
    items: [
      {
        image: "",
        title: "Student Stories",
        subtitle: "",
        href: "/student-stories",
      },
      {
        image: "",
        title: "Careers",
        subtitle: "",
        href: "/careers",
      },
    ],
  },
];
