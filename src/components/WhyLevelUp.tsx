import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import carouselImg from "@/assets/carousel-3.jpg";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface CardData {
  headline: React.ReactNode;
  description: string;
  bullets: string[];
  highlight: { value: string; label: string };
}

const cards: CardData[] = [
  {
    headline: (
      <>
        Mentors who've <span className="font-bold">lived the craft</span>
      </>
    ),
    description:
      "Not theorists — filmmakers, editors, and writers who built careers through decades of real work. They give you the unfiltered truth.",
    bullets: [
      "Award-winning filmmakers & editors",
      "Decades of industry experience",
      "Direct, honest feedback on your work",
    ],
    highlight: { value: "40+", label: "industry mentors" },
  },
  {
    headline: (
      <>
        Practice that <span className="font-bold">feels real</span>
      </>
    ),
    description:
      "Residencies, real sets, and deadlines that matter. Your work lives in the world — not in a classroom folder no one opens.",
    bullets: [
      "Real sets and professional equipment",
      "Deadlines that mirror the industry",
      "Your work gets published & screened",
    ],
    highlight: { value: "248", label: "short films created" },
  },
  {
    headline: (
      <>
        A community that <span className="font-bold">stays</span>
      </>
    ),
    description:
      "Not a cohort you forget. A creative ecosystem that keeps growing with you — years after you first join.",
    bullets: [
      "Alumni network across 7+ cities",
      "Ongoing creative collaborations",
      "Career support beyond the program",
    ],
    highlight: { value: "11", label: "editions & counting" },
  },
];

/* ------------------------------------------------------------------ */
/*  Card background styles                                             */
/* ------------------------------------------------------------------ */

const cardBgClasses = [
  // Card 1 — dark with amber glow
  "bg-card",
  // Card 2 — warm amber tone
  "bg-[hsl(30_30%_15%)]",
  // Card 3 — dark with image overlay
  "bg-card",
];

const cardGlows = [
  "radial-gradient(ellipse at 30% 80%, hsl(38 75% 55% / 0.07) 0%, transparent 60%)",
  "radial-gradient(ellipse at 50% 80%, hsl(30 60% 50% / 0.08) 0%, transparent 60%)",
  "radial-gradient(ellipse at 70% 80%, hsl(220 30% 45% / 0.06) 0%, transparent 60%)",
];

/* ------------------------------------------------------------------ */
/*  Animation constants                                                */
/* ------------------------------------------------------------------ */

const EASE = [0.25, 0.1, 0.25, 1] as const;
const TRANSITION = { duration: 0.5, ease: EASE };

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

const WhyLevelUp = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const isMobile = useIsMobile();

  const toggle = useCallback(
    (i: number) => setExpandedIndex((prev) => (prev === i ? null : i)),
    []
  );

  const navigate = useCallback(
    (dir: 1 | -1) => {
      setExpandedIndex((prev) => {
        if (prev === null) return dir === 1 ? 0 : 2;
        const next = prev + dir;
        if (next < 0) return 2;
        if (next > 2) return 0;
        return next;
      });
    },
    []
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, i: number) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggle(i);
      }
    },
    [toggle]
  );

  return (
    <section
      aria-label="Why choose LevelUp"
      className="relative bg-background py-12 md:py-16 overflow-hidden"
    >
      {/* ── Asymmetric headline block ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-10 md:mb-14">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-12">
          {/* Left — big headline */}
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="font-serif-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-medium text-hero-headline leading-[1.15] tracking-tight max-w-lg"
          >
            The most intentional way to learn{" "}
            <span className="text-gradient-amber">the craft.</span>
          </motion.h2>

          {/* Right — supporting text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
            className="font-sans-body text-sm md:text-base text-hero-subtext leading-relaxed max-w-sm md:pb-2"
          >
            We changed how creators learn. Build real skills with mentors who
            built careers — not PowerPoint decks.
          </motion.p>
        </div>
      </div>

      {/* ── Expandable cards row ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div
          className={`flex ${
            isMobile ? "flex-col gap-4" : "flex-row gap-3 lg:gap-4"
          }`}
          style={{ minHeight: isMobile ? undefined : 420 }}
        >
          {cards.map((card, i) => {
            const isExpanded = expandedIndex === i;
            const hasExpanded = expandedIndex !== null;

            // Desktop flex basis
            let flexBasis = "33.333%";
            if (!isMobile && hasExpanded) {
              flexBasis = isExpanded ? "58%" : "21%";
            }

            return (
              <motion.div
                key={i}
                layout
                transition={TRANSITION}
                role="button"
                tabIndex={0}
                aria-expanded={isExpanded}
                onClick={() => toggle(i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                className={`relative ${cardBgClasses[i]} rounded-sm overflow-hidden cursor-pointer group focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary`}
                style={{
                  flexBasis: isMobile ? "auto" : flexBasis,
                  flexShrink: 0,
                  flexGrow: 0,
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
              >
                {/* Subtle glow */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: cardGlows[i] }}
                />

                {/* Card 3 — background image overlay */}
                {i === 2 && (
                  <div
                    className="absolute inset-0 pointer-events-none opacity-[0.07]"
                    style={{
                      backgroundImage: `url(${carouselImg})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                )}

                {/* Card content wrapper */}
                <motion.div
                  layout
                  className="relative z-10 p-6 md:p-8 lg:p-10 flex flex-col justify-between h-full"
                  style={{
                    minHeight: isMobile ? (isExpanded ? "auto" : 200) : 420,
                  }}
                >
                  {/* Top row: headline + icon */}
                  <div className="flex items-start justify-between gap-4">
                    <motion.h3
                      layout="position"
                      className="font-serif-display text-lg md:text-xl lg:text-2xl font-normal text-hero-headline leading-[1.3] tracking-tight"
                    >
                      {card.headline}
                    </motion.h3>

                    <motion.div
                      layout="position"
                      className="shrink-0 mt-1 w-8 h-8 rounded-full border border-border/40 flex items-center justify-center text-muted-foreground group-hover:text-foreground transition-colors"
                    >
                      {isExpanded ? (
                        <X size={14} />
                      ) : (
                        <Maximize2 size={14} />
                      )}
                    </motion.div>
                  </div>

                  {/* Expanded content */}
                  <AnimatePresence mode="wait">
                    {isExpanded && (
                      <motion.div
                        key={`expanded-${i}`}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4, ease: EASE }}
                        className="overflow-hidden"
                        aria-live="polite"
                      >
                        <div className="pt-6 md:pt-8 space-y-5">
                          <p className="font-sans-body text-sm md:text-[0.9rem] text-hero-subtext leading-relaxed max-w-md">
                            {card.description}
                          </p>

                          <ul className="space-y-2.5">
                            {card.bullets.map((bullet, bi) => (
                              <motion.li
                                key={bi}
                                initial={{ opacity: 0, x: -12 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                  duration: 0.35,
                                  delay: 0.15 + bi * 0.08,
                                  ease: EASE,
                                }}
                                className="flex items-start gap-3 font-sans-body text-sm text-foreground/80"
                              >
                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0" />
                                {bullet}
                              </motion.li>
                            ))}
                          </ul>

                          {/* Stat highlight */}
                          <div className="pt-4 border-t border-border/30">
                            <span className="font-serif-display text-3xl md:text-4xl font-medium text-gradient-amber">
                              {card.highlight.value}
                            </span>
                            <span className="block font-sans-body text-xs text-muted-foreground mt-1 tracking-wide uppercase">
                              {card.highlight.label}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Bottom — collapsed hint (visible when not expanded) */}
                  {!isExpanded && (
                    <motion.div
                      layout="position"
                      className="mt-auto pt-8"
                    >
                      <div className="h-[1px] bg-border/30 w-8" />
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Navigation arrows — desktop only */}
        {!isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="flex justify-end gap-2 mt-5"
          >
            <button
              onClick={() => navigate(-1)}
              aria-label="Previous card"
              className="w-10 h-10 rounded-full border border-border/40 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => navigate(1)}
              aria-label="Next card"
              className="w-10 h-10 rounded-full border border-border/40 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
            >
              <ChevronRight size={16} />
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default WhyLevelUp;
