import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SectionConfig {
  id: string;
  label: string;
  color: string;
}

const sections: SectionConfig[] = [
  { id: "masterclasses", label: "Masterclasses", color: "hsl(38 75% 55%)" },
  { id: "live-programs", label: "Live Programs", color: "hsl(200 35% 55%)" },
  { id: "forge", label: "The Forge", color: "hsl(15 65% 55%)" },
  { id: "testimonials", label: "Stories", color: "hsl(38 75% 55%)" },
  { id: "faq", label: "FAQs", color: "hsl(38 75% 55%)" },
];

const SectionLabel = () => {
  const [activeSection, setActiveSection] = useState<SectionConfig | null>(null);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(section);
          }
        },
        {
          rootMargin: "-40% 0px -55% 0px",
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <div className="fixed top-24 left-6 z-50 hidden md:block pointer-events-none">
      <AnimatePresence mode="wait">
        {activeSection && (
          <motion.div
            key={activeSection.id}
            initial={{ opacity: 0, x: -12, filter: "blur(4px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: -8, filter: "blur(4px)" }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex items-center gap-2"
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: activeSection.color }}
            />
            <span
              className="font-sans-body text-[10px] tracking-[0.2em] uppercase"
              style={{ color: activeSection.color }}
            >
              {activeSection.label}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SectionLabel;
