import { useState } from "react";
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import levelupLogo from "@/assets/levelup-logo.svg";

const navLinks = [
  { label: "Masterclasses", href: "#masterclasses", description: "Learn from world-class mentors" },
  { label: "The Forge", href: "#forge", description: "Intensive creator accelerator" },
  { label: "StarDa", href: "#", description: "Discover new creative paths" },
  { label: "About", href: "#testimonials", description: "Our story and mission" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const isMobile = useIsMobile();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 40);
  });

  const handleMouseEnter = () => {
    if (!isMobile) setExpanded(true);
  };

  const handleMouseLeave = () => {
    if (!isMobile) setExpanded(false);
  };

  return (
    <>
      {/* Outer fixed wrapper — centers the pill */}
      <div
        className={[
          "fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500 ease-out",
          scrolled ? "pt-2" : "pt-4",
        ].join(" ")}
      >
        {/* Inner pill container */}
        <motion.nav
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          initial={{ opacity: 0, y: -20 }}
          animate={{
            opacity: 1,
            y: 0,
            borderRadius: expanded ? 16 : 9999,
          }}
          transition={{
            opacity: { duration: 0.8, delay: 0.2 },
            y: { duration: 0.8, delay: 0.2 },
            borderRadius: { duration: 0.35, ease: [0.4, 0, 0.2, 1] },
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
          {/* Top bar — logo + menu icon */}
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

            {/* Right side — menu icon (desktop hover) + mobile hamburger */}
            <div className="flex items-center gap-2.5">
              {/* Desktop menu icon — driven by hover */}
              <button
                className="hidden md:flex items-center justify-center w-8 h-8 rounded-full border border-border text-foreground hover:border-foreground/30 transition-colors duration-300"
                aria-label="Menu"
                tabIndex={-1}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {expanded ? (
                    <motion.span
                      key="x"
                      initial={{ opacity: 0, rotate: -90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: 90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X size={16} />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="menu"
                      initial={{ opacity: 0, rotate: 90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: -90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu size={16} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

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

          {/* Expandable nav links section — desktop only */}
          <AnimatePresence>
            {expanded && !isMobile && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{
                  height: { duration: 0.35, ease: [0.4, 0, 0.2, 1] },
                  opacity: { duration: 0.25, ease: "easeOut" },
                }}
                className="overflow-hidden"
              >
                <div className="px-6 md:px-8 pb-5 pt-2 flex flex-col gap-1">
                  {navLinks.map((link, index) => (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      transition={{
                        duration: 0.3,
                        delay: 0.05 * index,
                        ease: "easeOut",
                      }}
                      onClick={() => setExpanded(false)}
                      className="group block rounded-xl px-4 py-3 -mx-2 hover:bg-white/5 transition-colors duration-200"
                    >
                      <span className="block font-serif-display text-base text-foreground group-hover:text-primary transition-colors duration-200">
                        {link.label}
                      </span>
                      <span className="block font-sans-body text-sm text-muted-foreground mt-0.5">
                        {link.description}
                      </span>
                    </motion.a>
                  ))}

                  {/* Sign In inside expanded panel */}
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{
                      duration: 0.3,
                      delay: 0.05 * navLinks.length,
                      ease: "easeOut",
                    }}
                    className="mt-2 pt-3 border-t border-border/30"
                  >
                    <a
                      href="#"
                      className="block w-full text-center font-sans-body text-sm text-foreground border border-border rounded-full px-4 py-2 hover:border-primary hover:text-primary transition-all duration-300"
                    >
                      Sign In
                    </a>
                  </motion.div>
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
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-background/95 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />

            {/* Menu content */}
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
