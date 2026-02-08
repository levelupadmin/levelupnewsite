import { useState, useCallback } from "react";
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import levelupLogo from "@/assets/levelup-logo.svg";

import masterclass1 from "@/assets/masterclass-1.jpg";
import masterclass2 from "@/assets/masterclass-2.jpg";
import masterclass3 from "@/assets/masterclass-3.jpg";
import masterclass4 from "@/assets/masterclass-4.jpg";
import masterclass5 from "@/assets/masterclass-5.jpg";
import masterclass6 from "@/assets/masterclass-6.jpg";
import liveProgram1 from "@/assets/live-program-1.jpg";
import liveProgram2 from "@/assets/live-program-2.jpg";
import liveProgram3 from "@/assets/live-program-3.jpg";
import forge1 from "@/assets/forge-1.jpg";
import forge2 from "@/assets/forge-2.jpg";
import forge3 from "@/assets/forge-3.jpg";

interface NavItem {
  image: string;
  title: string;
  subtitle: string;
  href: string;
}

interface NavLink {
  label: string;
  href: string;
  description: string;
  items: NavItem[];
}

const navLinks: NavLink[] = [
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

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const isMobile = useIsMobile();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 40);
  });

  const handleLinkEnter = useCallback(
    (index: number) => {
      if (!isMobile) setActiveIndex(index);
    },
    [isMobile]
  );

  const handleNavLeave = useCallback(() => {
    if (!isMobile) setActiveIndex(null);
  }, [isMobile]);

  const expanded = activeIndex !== null && navLinks[activeIndex]?.items.length > 0;

  // Determine grid columns based on number of items
  const activeItems = activeIndex !== null ? navLinks[activeIndex].items : [];
  const gridCols =
    activeItems.length <= 3
      ? "grid-cols-3"
      : activeItems.length <= 4
      ? "grid-cols-4"
      : activeItems.length <= 6
      ? "grid-cols-3 sm:grid-cols-6"
      : "grid-cols-3";

  return (
    <>
      {/* Outer fixed wrapper */}
      <div
        className={[
          "fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500 ease-out",
          scrolled ? "pt-2" : "pt-4",
        ].join(" ")}
      >
        {/* Pill container */}
        <motion.nav
          onMouseLeave={handleNavLeave}
          initial={{ opacity: 0, y: -20 }}
          animate={{
            opacity: 1,
            y: 0,
            borderRadius: expanded ? 16 : 9999,
          }}
          transition={{
            opacity: { duration: 0.8, delay: 0.2 },
            y: { duration: 0.8, delay: 0.2 },
            borderRadius: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
          }}
          className={[
            "mx-auto w-[95%] max-w-5xl flex flex-col overflow-hidden",
            "transition-colors transition-shadow duration-500 ease-out",
            "border backdrop-blur-xl",
            scrolled
              ? "bg-card/80 border-border/40 shadow-[0_8px_32px_hsl(0_0%_0%/0.4)]"
              : "bg-card/50 border-border/20 shadow-[0_4px_20px_hsl(0_0%_0%/0.25)]",
          ].join(" ")}
        >
          {/* Top bar — logo + nav links + menu icon */}
          <div
            className={[
              "flex items-center justify-between transition-all duration-500 ease-out",
              scrolled
                ? "px-4 md:px-6 py-2 md:py-2"
                : "px-5 md:px-8 py-2.5 md:py-3",
            ].join(" ")}
          >
            {/* Logo */}
            <a href="https://www.leveluplearning.in" className="flex items-center">
              <img
                src={levelupLogo}
                alt="LevelUp Learning"
                decoding="async"
                className={[
                  "w-auto transition-all duration-500 ease-out",
                  scrolled ? "h-5 md:h-6" : "h-6 md:h-8",
                ].join(" ")}
              />
            </a>

            {/* Desktop nav links — visible in pill */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link, index) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  onMouseEnter={() => handleLinkEnter(index)}
                  className={[
                    "relative px-3 py-1.5 font-sans-body text-sm transition-colors duration-300",
                    activeIndex === index
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  ].join(" ")}
                >
                  <span className="relative z-10">{link.label}</span>
                  {activeIndex === index && (
                    <motion.div
                      layoutId="nav-active-bg"
                      className="absolute inset-0 bg-white/10 rounded-full"
                      transition={{
                        layout: { type: "spring", stiffness: 400, damping: 30 },
                      }}
                    />
                  )}
                </a>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2.5">
              {/* Sign In */}
              <a
                href="https://www.leveluplearning.in"
                target="_blank"
                rel="noopener noreferrer"
                className={[
                  "hidden md:inline-flex font-sans-body text-foreground border border-border rounded-full hover:border-primary hover:text-primary transition-all duration-500",
                  scrolled
                    ? "text-xs px-3 py-1.5"
                    : "text-xs md:text-sm px-3.5 md:px-4 py-1.5",
                ].join(" ")}
              >
                Sign In
              </a>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden flex items-center justify-center w-8 h-8 rounded-full border border-border text-foreground hover:border-foreground/30 transition-colors duration-300"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={16} /> : <Menu size={16} />}
              </button>
            </div>
          </div>

          {/* Expandable panel — desktop only, per-link */}
          <AnimatePresence>
            {expanded && !isMobile && (
              <motion.div
                key={activeIndex}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{
                  height: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
                  opacity: { duration: 0.2, ease: "easeOut" },
                }}
                className="overflow-hidden"
              >
                <div className="px-6 md:px-8 pb-5 pt-1">
                  {/* Category description */}
                  <motion.p
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: 0.05 }}
                    className="font-sans-body text-xs text-muted-foreground mb-3 tracking-wide"
                  >
                    {navLinks[activeIndex!].description}
                  </motion.p>

                  {/* Course/item cards */}
                  <div className={`grid ${gridCols} gap-3`}>
                    {activeItems.map((item, i) => (
                      <motion.a
                        key={item.title}
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.3,
                          delay: 0.08 * i,
                          ease: "easeOut",
                        }}
                        className="group/card block rounded-lg overflow-hidden bg-white/5 hover:bg-white/10 transition-colors duration-200"
                      >
                        <div className="aspect-[16/10] overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-105"
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                        <div className="px-3 py-2.5">
                          <p className="font-serif-display text-sm text-foreground leading-tight group-hover/card:text-primary transition-colors duration-200">
                            {item.title}
                          </p>
                          <p className="font-sans-body text-[11px] text-muted-foreground mt-0.5">
                            {item.subtitle}
                          </p>
                        </div>
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      </div>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div
              className="absolute inset-0 bg-background/95 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <div className="relative z-10 flex flex-col items-center justify-center h-full gap-8">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 + index * 0.06 }}
                  onClick={() => setMobileOpen(false)}
                  className="font-serif-display text-2xl text-foreground hover:text-primary transition-colors duration-300"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="https://www.leveluplearning.in"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + navLinks.length * 0.06 }}
                onClick={() => setMobileOpen(false)}
                className="font-sans-body text-lg text-primary border border-primary/30 rounded-full px-6 py-2 hover:bg-primary/10 transition-colors duration-300"
              >
                Sign In
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
