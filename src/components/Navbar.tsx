import { useState } from "react";
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import levelupLogo from "@/assets/levelup-logo.svg";

const navLinks = [
  { label: "Masterclasses", href: "#masterclasses" },
  { label: "The Forge", href: "#forge" },
  { label: "StarDa", href: "#" },
  { label: "About", href: "#testimonials" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 40);
  });

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
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={[
            "mx-auto w-[95%] max-w-4xl rounded-full flex items-center justify-between",
            "transition-all duration-500 ease-out",
            "border backdrop-blur-xl",
            scrolled
              ? "px-4 md:px-6 py-2 md:py-2 bg-card/80 border-border/40 shadow-[0_8px_32px_hsl(0_0%_0%/0.4)]"
              : "px-5 md:px-8 py-2.5 md:py-3 bg-card/50 border-border/20 shadow-[0_4px_20px_hsl(0_0%_0%/0.25)]",
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

          {/* Desktop nav links — centered */}
          <div
            className="hidden md:flex items-center gap-1"
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {navLinks.map((link, index) => (
              <a
                key={link.label}
                href={link.href}
                onMouseEnter={() => setHoveredIndex(index)}
                className="relative px-3 py-1.5 font-sans-body text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                <AnimatePresence>
                  {hoveredIndex === index && (
                    <motion.div
                      layoutId="nav-highlight"
                      className="absolute inset-0 bg-white/10 rounded-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        layout: { type: "spring", stiffness: 350, damping: 30 },
                        opacity: { duration: 0.2 },
                      }}
                    />
                  )}
                </AnimatePresence>
                <span className="relative z-10">{link.label}</span>
              </a>
            ))}
          </div>

          {/* Right side — Sign In + mobile hamburger */}
          <div className="flex items-center gap-2.5">
            <a
              href="#"
              
              className={[
                "font-sans-body text-foreground border border-border rounded-full hover:border-primary hover:text-primary transition-all duration-500",
                scrolled
                  ? "text-xs px-3 py-1.5 md:text-xs md:px-3.5 md:py-1.5"
                  : "text-xs md:text-sm px-3.5 md:px-4 py-1.5 md:py-1.5",
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
