import { useState, useEffect } from "react";
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
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 40);
  });

  return (
    <>
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className={[
          "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 md:px-12 lg:px-20",
          "transition-all duration-500 ease-out",
          scrolled
            ? "py-2.5 md:py-3 bg-background/70 backdrop-blur-xl border-b border-border/40 shadow-[0_1px_12px_hsl(var(--background)/0.3)]"
            : "py-4 md:py-5 border-b border-transparent",
        ].join(" ")}
        style={
          !scrolled
            ? { background: "linear-gradient(180deg, hsl(220 15% 6% / 0.9) 0%, transparent 100%)" }
            : undefined
        }
      >
        <a href="#" className="flex items-center">
          <img
            src={levelupLogo}
            alt="LevelUp Learning"
            className={[
              "w-auto transition-all duration-500 ease-out",
              scrolled ? "h-6 md:h-8" : "h-8 md:h-12",
            ].join(" ")}
          />
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              data-cursor="arrow"
              className="font-sans-body text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href="#"
            data-cursor="arrow"
            className={[
              "font-sans-body text-foreground border border-border rounded-full hover:border-primary hover:text-primary transition-all duration-500",
              scrolled ? "text-xs px-3.5 py-1.5 md:text-xs md:px-4 md:py-1.5" : "text-xs md:text-sm px-4 md:px-5 py-2",
            ].join(" ")}
          >
            Sign In
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-full border border-border text-foreground hover:border-foreground/30 transition-colors duration-300"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </motion.nav>

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
