import { useState, useCallback } from "react";
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import levelupLogo from "@/assets/levelup-logo.svg";

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
    href: "#masterclasses",
    description: "Learn from world-class mentors",
    items: [
      {
        image: "https://cdn.prod.website-files.com/649fbe7d7f61c6fc912e1d33/650c1be5224f49f6432aaae6_1.Karthik_Subburaj%20course%20banner.png",
        title: "Karthik Subbaraj",
        subtitle: "Storytelling & directing",
      },
      {
        image: "https://cdn.prod.website-files.com/649fbe7d7f61c6fc912e1d33/64f60ddd91f67b7db8f6716b_3.Anthony_Gonsalvez.png",
        title: "Anthony Gonsalvez",
        subtitle: "Film editing",
      },
      {
        image: "https://cdn.prod.website-files.com/649fbe7d7f61c6fc912e1d33/6899f2de01c2b6f380973a82_Frame%20191%20LK.png",
        title: "Lokesh Kanagaraj",
        subtitle: "Art of filmmaking",
      },
    ],
  },
  {
    label: "The Forge",
    href: "#forge",
    description: "Intensive creator accelerator",
    items: [
      { image: forge1, title: "Filmmaking Bootcamp", subtitle: "12-day immersive program" },
      { image: forge2, title: "Writing Retreat", subtitle: "Craft your screenplay" },
      { image: forge3, title: "Creator Residency", subtitle: "Build with mentors" },
    ],
  },
  {
    label: "Live Programs",
    href: "#",
    description: "Mentor-led structured courses",
    items: [
      { image: liveProgram1, title: "Directing Intensive", subtitle: "8 weeks · Live" },
      { image: liveProgram2, title: "Camera & Light Lab", subtitle: "6 weeks · Live" },
      { image: liveProgram3, title: "Screenwriting Cohort", subtitle: "10 weeks · Live" },
    ],
  },
  {
    label: "About",
    href: "#testimonials",
    description: "Our story and mission",
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
            "mx-auto w-[95%] max-w-4xl flex flex-col overflow-hidden",
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
            <a href="#" className="flex items-center">
              <img
                src={levelupLogo}
                alt="LevelUp Learning"
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
              {/* Sign In — visible in compact state on desktop */}
              <a
                href="#"
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
                  <div className="grid grid-cols-3 gap-3">
                    {navLinks[activeIndex!].items.map((item, i) => (
                      <motion.a
                        key={item.title}
                        href={navLinks[activeIndex!].href}
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
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 + index * 0.06 }}
                  onClick={() => setMobileOpen(false)}
                  className="font-serif-display text-2xl text-foreground hover:text-primary transition-colors duration-300"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
