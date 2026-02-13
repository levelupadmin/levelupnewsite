import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import levelupLogo from "@/assets/levelup-logo.svg";
import type { NavLink, NavItem } from "./navbarData";
import NavbarDesktopLinks from "./NavbarDesktopLinks";
import NavbarMobileMenu from "./NavbarMobileMenu";

const navLabels = [
  { label: "Masterclasses", href: "https://www.leveluplearning.in/#masterclasses" },
  { label: "LevelUp Live", href: "https://www.leveluplearning.live" },
  { label: "The Forge", href: "#forge" },
  { label: "Workshops", href: "https://study.leveluplearning.in" },
  { label: "About", href: "https://www.leveluplearning.in/contact-us" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
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
    setActiveIndex(null);
    if (mobileOpen) setMobileOpen(false);
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

  const links = navData ?? navLabels.map((l) => ({ ...l, description: "", items: [] as NavItem[] }));
  const expanded = activeIndex !== null && links[activeIndex]?.items.length > 0;

  return (
    <>
      <div
        className={[
          "fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500 ease-out",
          scrolled ? "pt-2" : "pt-4",
        ].join(" ")}
      >
        <motion.nav
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
            borderRadius: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
            backgroundColor: { duration: 0.5, ease: "easeOut" },
            borderColor: { duration: 0.5, ease: "easeOut" },
            boxShadow: { duration: 0.5, ease: "easeOut" },
          }}
          className="relative mx-auto w-[95%] max-w-5xl flex flex-col border backdrop-blur-md"
        >
          <div
            className={[
              "flex items-center justify-between transition-all duration-500 ease-out",
              scrolled ? "px-4 md:px-6 py-2 md:py-2" : "px-5 md:px-8 py-2.5 md:py-3",
            ].join(" ")}
          >
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

            <div className="flex items-center gap-2.5">
              <NavbarDesktopLinks
                links={links}
                activeIndex={activeIndex}
                onLinkEnter={handleLinkEnter}
                onSetActiveIndex={setActiveIndex}
                scrolled={scrolled}
              />

              <button
                onClick={handleMobileOpen}
                className="md:hidden flex items-center justify-center w-8 h-8 rounded-full border border-border text-foreground hover:border-foreground/30 transition-colors duration-300"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={16} /> : <Menu size={16} />}
              </button>
            </div>
          </div>
        </motion.nav>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <NavbarMobileMenu links={links} onClose={() => setMobileOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
