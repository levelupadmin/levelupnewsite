import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { NavLink, NavItem } from "./navbarData";

const DEFAULT_ACCENT = "hsl(24 95% 53%)";

interface NavbarDesktopLinksProps {
  links: (NavLink | { label: string; href: string; description: string; items: NavItem[] })[];
  activeIndex: number | null;
  onLinkEnter: (index: number) => void;
  onSetActiveIndex: (index: number | null) => void;
  scrolled: boolean;
}

const NavbarDesktopLinks = ({
  links,
  activeIndex,
  onLinkEnter,
  onSetActiveIndex,
  scrolled,
}: NavbarDesktopLinksProps) => {
  const expanded = activeIndex !== null && links[activeIndex]?.items.length > 0;

  const activeAccent = useMemo(() => {
    if (activeIndex === null) return DEFAULT_ACCENT;
    return (links[activeIndex] as NavLink).accent || DEFAULT_ACCENT;
  }, [activeIndex, links]);

  const activeItems = activeIndex !== null ? links[activeIndex].items : [];
  const activeFormatBadge = activeIndex !== null ? (links[activeIndex] as NavLink).formatBadge : undefined;

  return (
    <>
      {/* Desktop nav links */}
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
              onMouseEnter={() => onLinkEnter(index)}
              className={[
                "relative px-3 py-1.5 font-sans-body text-sm transition-colors duration-300 flex flex-col items-center",
                isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
              ].join(" ")}
              style={isActive ? { color: linkAccent } : undefined}
            >
              <span className="relative z-10">{link.label}</span>
              <AnimatePresence>
                {isActive && (
                  <motion.span
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute -bottom-0.5 w-1 h-1 rounded-full"
                    style={{ backgroundColor: linkAccent }}
                  />
                )}
              </AnimatePresence>
            </a>
          );
        })}
      </div>

      {/* Sign In button */}
      <a
        href="https://www.leveluplearning.in"
        target="_blank"
        rel="noopener noreferrer"
        className={[
          "hidden md:inline-flex font-sans-body text-foreground rounded-full hover:border-primary hover:text-primary transition-all duration-500",
          "border border-[#5c5c5c]",
          scrolled ? "text-xs px-3 py-1.5" : "text-xs md:text-sm px-3.5 md:px-4 py-1.5",
        ].join(" ")}
      >
        Sign In
      </a>

      {/* Expandable dropdown panel */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            key={activeIndex}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
              opacity: { duration: 0.2, ease: "easeOut" },
            }}
            className="overflow-hidden absolute left-0 right-0"
            style={{ willChange: "height, opacity", top: "100%" }}
          >
            <div className="h-px mx-6 md:mx-8" style={{ background: `linear-gradient(90deg, transparent 0%, ${activeAccent} 50%, transparent 100%)` }} />
            <div className="px-6 md:px-8 pb-5 pt-3">
              <motion.p
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: 0.05 }}
                className="font-sans-body text-xs mb-3 tracking-wide"
                style={{ color: activeAccent, opacity: 0.6 }}
              >
                {links[activeIndex!].description}
              </motion.p>

              <div className="grid grid-cols-3 gap-3">
                {(activeIndex === 0 ? activeItems.slice(0, 3) : activeItems).map((item, i) => (
                  <motion.a
                    key={item.title}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.08 * i, ease: "easeOut" }}
                    className="nav-card-accent block rounded-sm overflow-hidden bg-white/5 transition-all duration-200"
                    style={{
                      "--card-accent": activeAccent,
                      "--card-accent-bg": activeAccent.replace(")", " / 0.1)").replace("hsl(", "hsl("),
                    } as React.CSSProperties}
                  >
                    <div className="aspect-[3/2] overflow-hidden">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105" loading="lazy" decoding="async" />
                    </div>
                    <div className="px-2.5 py-2">
                      <p className="nav-card-title font-sans-body text-xs font-medium text-foreground leading-snug transition-colors duration-200 truncate">{item.title}</p>
                      <p className="font-sans-body text-[10px] text-muted-foreground mt-0.5 truncate">{item.subtitle}</p>
                      <div className="flex items-center gap-1.5 mt-1">
                        {activeFormatBadge && (
                          <span
                            className="font-sans-body text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-full"
                            style={{ color: activeAccent, backgroundColor: activeAccent.replace(")", " / 0.12)").replace("hsl(", "hsl(") }}
                          >
                            {activeFormatBadge}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>

              {activeIndex === 0 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, delay: 0.25 }} className="mt-3 text-center">
                  <a href="#masterclasses" onClick={() => onSetActiveIndex(null)} className="font-sans-body text-xs transition-colors duration-200 hover:opacity-80" style={{ color: activeAccent }}>
                    See all masterclasses →
                  </a>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavbarDesktopLinks;
