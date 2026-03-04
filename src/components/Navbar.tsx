import { useState, useCallback, useRef, useMemo } from "react";
import { m, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import levelupLogo from "@/assets/levelup-logo.svg";
import type { NavLink, NavItem } from "./navbarData";

// Default accent fallback (amber/primary)
const DEFAULT_ACCENT = "hsl(24 95% 53%)";

// Minimal nav labels for initial render (before data chunk loads)
const navLabels = [
  { label: "Masterclasses", href: "#masterclasses" },
  { label: "LevelUp Live", href: "#live-programs" },
  { label: "The Forge", href: "#forge" },
  { label: "About", href: "/about" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpandedIndex, setMobileExpandedIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);
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

  const scrolledRef = useRef(false);
  const lastScrollY = useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const newScrolled = latest > 40;
    if (newScrolled !== scrolledRef.current) {
      scrolledRef.current = newScrolled;
      setScrolled(newScrolled);
    }
    // Only close dropdown on significant scroll (>80px delta)
    if (Math.abs(latest - lastScrollY.current) > 80) {
      setActiveIndex(null);
      lastScrollY.current = latest;
    }
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
  const gridCols = "grid-cols-4";

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
        <m.nav
          aria-label="Main navigation"
          onMouseLeave={handleNavLeave}
          onPointerEnter={loadNavData}
          initial={{ opacity: 0, y: -20, borderRadius: 9999 }}
          animate={{
            opacity: 1,
            y: 0,
            borderRadius: expanded ? 16 : 9999,
            backgroundColor: scrolled ? "hsla(0, 0%, 7%, 0.7)" : "hsla(0, 0%, 7%, 0.4)",
            borderColor: scrolled ? "hsla(0, 0%, 15%, 0.4)" : "hsla(0, 0%, 15%, 0.2)",
            boxShadow: scrolled
              ? "0 8px 32px hsla(0, 0%, 0%, 0.4)"
              : "0 4px 20px hsla(0, 0%, 0%, 0.25)",
          }}
          transition={{
            opacity: { duration: 0.8, delay: 0.2 },
            y: { duration: 0.8, delay: 0.2 },
            borderRadius: { duration: 0.05, ease: "easeOut" },
            backgroundColor: { duration: 0.5, ease: "easeOut" },
            borderColor: { duration: 0.5, ease: "easeOut" },
            boxShadow: { duration: 0.5, ease: "easeOut" },
          }}
          className="mx-auto w-[95%] max-w-5xl flex flex-col overflow-hidden border backdrop-blur-md"
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
            <a href="/" className="flex items-center">
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
                    {/* Sliding accent underline */}
                    {isActive && (
                      <m.span
                        layoutId="nav-underline"
                        className="absolute -bottom-0.5 h-[2px] rounded-full left-3 right-3"
                        style={{ backgroundColor: linkAccent }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
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
                className="md:hidden flex items-center justify-center w-11 h-11 rounded-full border border-border text-foreground hover:border-foreground/30 transition-colors duration-300"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>

          {/* Expandable panel — desktop only, per-link */}
          <AnimatePresence>
            {expanded && !isMobile && (
              <m.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{
                  height: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
                  opacity: { duration: 0.2, ease: "easeOut" },
                }}
                className="overflow-hidden"
                style={{ willChange: "height, opacity" }}
              >
                {/* Accent line at top of dropdown */}
                <m.div
                  className="h-px mx-6 md:mx-8"
                  animate={{
                    background: `linear-gradient(90deg, transparent 0%, ${activeAccent} 50%, transparent 100%)`,
                  }}
                  transition={{ duration: 0.25 }}
                />

                <div className="px-6 md:px-8 pb-5 pt-3">
                  {/* Category description — crossfade via key */}
                  <AnimatePresence mode="wait">
                    <m.div
                      key={activeIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <p
                        className="font-sans-body text-xs mb-3 tracking-wide"
                        style={{ color: activeAccent, opacity: 0.6 }}
                      >
                        {links[activeIndex!].description}
                      </p>

                      {/* Course/item cards */}
                      <div className={`grid ${gridCols} gap-3`}>
                        {activeItems.map((item, i) => (
                          <m.a
                            key={item.title}
                            href={item.href}
                            target={item.href.startsWith("http") ? "_blank" : undefined}
                            rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                            initial={{ opacity: 0, y: 8, rotateZ: -1.5, scale: 0.96 }}
                            animate={{
                              opacity: hoveredCardIndex !== null && hoveredCardIndex !== i ? 0.65 : 1,
                              y: 0,
                              rotateZ: 0,
                              scale: 1,
                            }}
                            whileHover={{ scale: 1.03, y: -4 }}
                            whileTap={{ scale: 0.97 }}
                            transition={{
                              duration: 0.25,
                              delay: 0.04 * i,
                              ease: "easeOut",
                              scale: { type: "spring", stiffness: 500, damping: 15 },
                              y: { duration: 0.2 },
                            }}
                            onMouseEnter={(e) => {
                              setHoveredCardIndex(i);
                              const rect = e.currentTarget.getBoundingClientRect();
                              e.currentTarget.style.setProperty("--glow-x", `${((e.clientX - rect.left) / rect.width) * 100}%`);
                              e.currentTarget.style.setProperty("--glow-y", `${((e.clientY - rect.top) / rect.height) * 100}%`);
                            }}
                            onMouseMove={(e) => {
                              const rect = e.currentTarget.getBoundingClientRect();
                              e.currentTarget.style.setProperty("--glow-x", `${((e.clientX - rect.left) / rect.width) * 100}%`);
                              e.currentTarget.style.setProperty("--glow-y", `${((e.clientY - rect.top) / rect.height) * 100}%`);
                            }}
                            onMouseLeave={() => setHoveredCardIndex(null)}
                            className="nav-card-accent group/card relative block rounded-sm overflow-hidden bg-white/5 transition-shadow duration-200"
                            style={{
                              "--card-accent": activeAccent,
                              "--card-accent-bg": activeAccent.replace(")", " / 0.1)").replace("hsl(", "hsl("),
                              boxShadow: hoveredCardIndex === i
                                ? `0 8px 24px -4px ${activeAccent.replace(")", " / 0.25)").replace("hsl(", "hsl(")}`
                                : "none",
                            } as React.CSSProperties}
                          >
                            {/* Cursor-following glow */}
                            <div
                              className="pointer-events-none absolute inset-0 z-10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 rounded-sm"
                              style={{
                                background: `radial-gradient(circle 120px at var(--glow-x, 50%) var(--glow-y, 50%), ${activeAccent.replace(")", " / 0.1)").replace("hsl(", "hsl(")}, transparent 70%)`,
                              }}
                            />
                            {/* Haptic border flash */}
                            <div
                              className="pointer-events-none absolute inset-0 z-20 rounded-sm border border-transparent group-hover/card:border-white/15 transition-[border-color] duration-150"
                            />
                            <div className="aspect-[4/3] overflow-hidden rounded-md bg-white/5 relative">
                              {item.image ? (
                                <img
                                  src={item.image}
                                  alt={item.title}
                                  className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-105"
                                  style={{ objectPosition: item.objectPosition || "top" }}
                                  loading="lazy"
                                  decoding="async"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <span className="font-sans-body text-[10px] uppercase tracking-wider text-muted-foreground/50">Coming Soon</span>
                                </div>
                              )}
                              {/* Title + subtitle reveal overlay */}
                              <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover/card:translate-y-0 transition-transform duration-300 ease-out bg-black/60 backdrop-blur-sm px-2.5 py-2">
                                <p className="text-[11px] font-medium leading-tight truncate" style={{ color: activeAccent }}>
                                  {item.title}
                                </p>
                                <p className="text-[10px] text-white/60 leading-tight truncate mt-0.5">
                                  {item.subtitle}
                                </p>
                              </div>
                            </div>
                          </m.a>
                        ))}
                      </div>

                    </m.div>
                  </AnimatePresence>
                </div>
              </m.div>
            )}
          </AnimatePresence>
        </m.nav>
      </div>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <m.div
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
                  <m.div
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
                          <m.span
                            animate={{ rotate: isExpanded ? 45 : 0 }}
                            transition={{ duration: 0.2 }}
                            className="text-2xl leading-none transition-colors duration-200"
                            style={{ color: isExpanded ? linkAccent : undefined }}
                          >
                            +
                          </m.span>
                        </button>

                        <AnimatePresence initial={false} mode="wait">
                          {isExpanded && (
                            <m.div
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
                                  <m.a
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
                                    className="block rounded-sm overflow-hidden bg-white/5 active:scale-[0.97] transition-all duration-150 relative"
                                    style={{ borderLeft: `3px solid ${linkAccent}` }}
                                  >
                                    <div className="aspect-[4/3] overflow-hidden rounded-md">
                                      <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover"
                                        style={{ objectPosition: item.objectPosition || "top" }}
                                        loading="lazy"
                                        decoding="async"
                                      />
                                    </div>
                                    {/* Always-visible title + subtitle below card */}
                                    <div className="px-1 pt-1.5 pb-1">
                                      <p className="text-[13px] font-semibold leading-tight truncate" style={{ color: linkAccent }}>{item.title}</p>
                                      <p className="text-[11px] text-white/60 leading-tight mt-0.5 truncate">{item.subtitle}</p>
                                    </div>
                                  </m.a>
                                ))}
                              </div>
                            </m.div>
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
                  </m.div>
                );
              })}

              <m.a
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
              </m.a>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
