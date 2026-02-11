import { useState, useCallback, useRef, useMemo } from "react";
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import levelupLogo from "@/assets/levelup-logo.svg";
import type { NavLink, NavItem } from "./navbarData";

// Default accent fallback (amber/primary)
const DEFAULT_ACCENT = "hsl(24 95% 53%)";

// Minimal nav labels for initial render (before data chunk loads)
const navLabels = [
  { label: "Masterclasses", href: "https://www.leveluplearning.in/#masterclasses" },
  { label: "LevelUp Live", href: "https://www.leveluplearning.live" },
  { label: "The Forge", href: "#forge" },
  { label: "Workshops", href: "https://study.leveluplearning.in" },
  { label: "About", href: "https://www.leveluplearning.in/contact-us" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpandedIndex, setMobileExpandedIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [navData, setNavData] = useState<NavLink[] | null>(null);
  const loadStarted = useRef(false);
  const { scrollY } = useScroll();
  const isMobile = useIsMobile();

  const loadNavData = useCallback(() => {
    if (loadStarted.current) return;
    loadStarted.current = true;
    import("./navbarData").then((mod) => setNavData(mod.navLinks));
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 40);
    if (mobileOpen) {
      setMobileOpen(false);
      setMobileExpandedIndex(null);
    }
  });

  const handleLinkEnter = useCallback(
    (index: number) => {
      if (!isMobile) {
        loadNavData();
        setActiveIndex(index);
      }
    },
    [isMobile, loadNavData]
  );

  const handleNavLeave = useCallback(() => {
    if (!isMobile) setActiveIndex(null);
  }, [isMobile]);

  const handleMobileOpen = useCallback(() => {
    loadNavData();
    setMobileOpen((prev) => !prev);
  }, [loadNavData]);

  // Use loaded data or fall back to labels-only
  const links = navData ?? navLabels.map((l) => ({ ...l, description: "", items: [] as NavItem[] }));

  const expanded = activeIndex !== null && links[activeIndex]?.items.length > 0;

  // Active link accent color
  const activeAccent = useMemo(() => {
    if (activeIndex === null) return DEFAULT_ACCENT;
    const link = links[activeIndex] as NavLink;
    return link.accent || DEFAULT_ACCENT;
  }, [activeIndex, links]);

  // Determine grid columns based on number of items
  const activeItems = activeIndex !== null ? links[activeIndex].items : [];
  const activeFormatBadge = activeIndex !== null ? (links[activeIndex] as NavLink).formatBadge : undefined;
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
          aria-label="Main navigation"
          onMouseLeave={handleNavLeave}
          onPointerEnter={loadNavData}
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
              {links.map((link, index) => {
                const linkAccent = (link as NavLink).accent || DEFAULT_ACCENT;
                const isActive = activeIndex === index;

                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    onMouseEnter={() => handleLinkEnter(index)}
                    className={[
                      "relative px-3 py-1.5 font-sans-body text-sm transition-colors duration-300 flex flex-col items-center",
                      isActive
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    ].join(" ")}
                    style={isActive ? { color: linkAccent } : undefined}
                  >
                    <span className="relative z-10">{link.label}</span>
                    {/* Accent dot indicator */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.span
                          layoutId="nav-accent-dot"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{
                            layout: { type: "spring", stiffness: 400, damping: 30 },
                            scale: { duration: 0.2 },
                          }}
                          className="absolute -bottom-0.5 w-1 h-1 rounded-full"
                          style={{ backgroundColor: linkAccent }}
                        />
                      )}
                    </AnimatePresence>
                  </a>
                );
              })}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2.5">
              {/* Sign In */}
              <a
                href="https://www.leveluplearning.in"
                target="_blank"
                rel="noopener noreferrer"
                className={[
                  "hidden md:inline-flex font-sans-body text-foreground rounded-full hover:border-primary hover:text-primary transition-all duration-500",
                  `border border-[#5c5c5c]`,
                  scrolled
                    ? "text-xs px-3 py-1.5"
                    : "text-xs md:text-sm px-3.5 md:px-4 py-1.5",
                ].join(" ")}
              >
                Sign In
              </a>

              {/* Mobile hamburger */}
              <button
                onClick={handleMobileOpen}
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
                {/* Accent line at top of dropdown */}
                <div
                  className="h-px mx-6 md:mx-8"
                  style={{
                    background: `linear-gradient(90deg, transparent 0%, ${activeAccent} 50%, transparent 100%)`,
                  }}
                />

                <div className="px-6 md:px-8 pb-5 pt-3">
                  {/* Category description */}
                  <motion.p
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: 0.05 }}
                    className="font-sans-body text-xs mb-3 tracking-wide"
                    style={{ color: activeAccent, opacity: 0.6 }}
                  >
                    {links[activeIndex!].description}
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
                        className="nav-card-accent block rounded-sm overflow-hidden bg-white/5 transition-all duration-200"
                        style={{
                          "--card-accent": activeAccent,
                          "--card-accent-bg": activeAccent.replace(")", " / 0.1)").replace("hsl(", "hsl("),
                        } as React.CSSProperties}
                      >
                        <div className="aspect-[16/10] overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                        <div className="px-3 py-2.5">
                          <p className="nav-card-title font-serif-display text-sm text-foreground leading-tight transition-colors duration-200">
                            {item.title}
                          </p>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <p className="font-sans-body text-[11px] text-muted-foreground">
                              {item.subtitle}
                            </p>
                            {activeFormatBadge && (
                              <span
                                className="font-sans-body text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-full"
                                style={{
                                  color: activeAccent,
                                  backgroundColor: activeAccent.replace(")", " / 0.12)").replace("hsl(", "hsl("),
                                }}
                              >
                                {activeFormatBadge}
                              </span>
                            )}
                          </div>
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div
              className="absolute inset-0 bg-background/95 backdrop-blur-md"
              onClick={() => setMobileOpen(false)}
            />
            <div className="relative z-10 flex flex-col h-full pt-20 pb-8 px-5 overflow-y-auto">
              {links.map((link, index) => {
                const hasItems = link.items.length > 0;
                const isExpanded = mobileExpandedIndex === index;
                const linkAccent = (link as NavLink).accent || DEFAULT_ACCENT;
                const badge = (link as NavLink).formatBadge;

                return (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.05 + index * 0.05 }}
                    className="border-b border-border/20"
                  >
                    {hasItems ? (
                      <>
                        <button
                          onClick={() =>
                            setMobileExpandedIndex(isExpanded ? null : index)
                          }
                          className="w-full flex items-center justify-between py-4 font-serif-display text-xl transition-colors duration-200"
                          style={{ color: isExpanded ? linkAccent : undefined }}
                        >
                          <span>{link.label}</span>
                          <motion.span
                            animate={{ rotate: isExpanded ? 45 : 0 }}
                            transition={{ duration: 0.2 }}
                            className="text-2xl leading-none transition-colors duration-200"
                            style={{ color: isExpanded ? linkAccent : undefined }}
                          >
                            +
                          </motion.span>
                        </button>

                        <AnimatePresence initial={false} mode="wait">
                          {isExpanded && (
                            <motion.div
                              key={`mobile-expand-${index}`}
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{
                                height: { duration: 0.35, ease: [0.4, 0, 0.2, 1] },
                                opacity: { duration: 0.25, ease: "easeInOut" },
                              }}
                              className="overflow-hidden"
                            >
                              {link.description && (
                                <p
                                  className="font-sans-body text-xs mb-3 px-1"
                                  style={{ color: linkAccent, opacity: 0.6 }}
                                >
                                  {link.description}
                                </p>
                              )}
                              <div
                                className="grid grid-cols-2 gap-2.5 pb-4 pl-3 border-l-2"
                                style={{ borderColor: linkAccent + "33" }}
                              >
                                {link.items.map((item, i) => (
                                  <motion.a
                                    key={item.title}
                                    href={item.href}
                                    target={
                                      item.href.startsWith("http")
                                        ? "_blank"
                                        : undefined
                                    }
                                    rel={
                                      item.href.startsWith("http")
                                        ? "noopener noreferrer"
                                        : undefined
                                    }
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                      duration: 0.25,
                                      delay: 0.04 * i,
                                    }}
                                    onClick={() => setMobileOpen(false)}
                                    className="block rounded-sm overflow-hidden bg-white/5 active:bg-white/10 transition-colors"
                                  >
                                    <div className="aspect-[16/10] overflow-hidden">
                                      <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                        decoding="async"
                                      />
                                    </div>
                                    <div className="px-2.5 py-2">
                                      <p className="font-serif-display text-sm text-foreground leading-tight">
                                        {item.title}
                                      </p>
                                      <div className="flex items-center gap-1 mt-0.5">
                                        <p className="font-sans-body text-[10px] text-muted-foreground">
                                          {item.subtitle}
                                        </p>
                                        {badge && (
                                          <span
                                            className="font-sans-body text-[8px] font-semibold uppercase tracking-wider px-1 py-0.5 rounded-full"
                                            style={{
                                              color: linkAccent,
                                              backgroundColor: linkAccent.replace(")", " / 0.12)").replace("hsl(", "hsl("),
                                            }}
                                          >
                                            {badge}
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  </motion.a>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <a
                        href={link.href}
                        target={
                          link.href.startsWith("http") ? "_blank" : undefined
                        }
                        rel={
                          link.href.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                        onClick={() => setMobileOpen(false)}
                        className="block py-4 font-serif-display text-xl text-foreground"
                      >
                        {link.label}
                      </a>
                    )}
                  </motion.div>
                );
              })}

              <motion.a
                href="https://www.leveluplearning.in"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.35,
                  delay: 0.05 + links.length * 0.05,
                }}
                onClick={() => setMobileOpen(false)}
                className="mt-6 self-center font-sans-body text-base text-primary border border-primary/30 rounded-full px-6 py-2.5 active:bg-primary/10 transition-colors"
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
