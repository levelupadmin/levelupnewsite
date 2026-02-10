import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ChevronDown, ArrowRight, Maximize2 } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import carouselImg from "@/assets/carousel-3.jpg";
import whyBg1 from "@/assets/why-bg-1.png";
import whyBg2 from "@/assets/why-bg-2.png";
import whyBg3 from "@/assets/why-bg-3.png";

const cardBgImages = [whyBg1, whyBg2, whyBg3];

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
  "bg-card border border-border",
  "bg-[hsl(0_0%_9%)] border border-border",
  "bg-card border border-border",
];

const cardTopGradients = [
  "linear-gradient(90deg, hsl(38 75% 55%) 0%, hsl(38 75% 55% / 0) 100%)",
  "linear-gradient(90deg, hsl(35 60% 50%) 0%, hsl(30 40% 35% / 0) 100%)",
  "linear-gradient(90deg, hsl(220 40% 50%) 0%, hsl(220 30% 45% / 0) 100%)",
];

const cardGlows = [
  "",
  "",
  "",
];

/* ------------------------------------------------------------------ */
/*  Animation constants                                                */
/* ------------------------------------------------------------------ */

const EASE = [0.25, 0.1, 0.25, 1] as const;

/* ------------------------------------------------------------------ */
/*  Mobile Overlay Component                                           */
/* ------------------------------------------------------------------ */

interface MobileOverlayProps {
  card: CardData;
  cardIndex: number;
  onClose: () => void;
}

const MobileOverlay = ({ card, cardIndex, onClose }: MobileOverlayProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [dragY, setDragY] = useState(0);
  const isAtTop = useRef(true);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      isAtTop.current = scrollTop <= 1;
      if (scrollTop + clientHeight >= scrollHeight - 2) {
        onClose();
      }
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [onClose]);

  const handleDrag = (_: any, info: { offset: { y: number } }) => {
    if (isAtTop.current && info.offset.y > 0) {
      setDragY(info.offset.y);
    }
  };

  const handleDragEnd = (_: any, info: { offset: { y: number }; velocity: { y: number } }) => {
    if (isAtTop.current && (info.offset.y > 120 || info.velocity.y > 500)) {
      onClose();
    }
    setDragY(0);
  };

  return (
    <motion.div
      ref={scrollRef}
      key={`overlay-${cardIndex}`}
      initial={{ opacity: 0, y: 40, scale: 0.92 }}
      animate={{ opacity: 1, y: Math.max(0, dragY * 0.4), scale: dragY > 0 ? 1 - Math.min(dragY * 0.0003, 0.05) : 1 }}
      exit={{ opacity: 0, y: 100, scale: 0.95 }}
      transition={dragY > 0 ? { duration: 0 } : { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
      drag="y"
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={{ top: 0, bottom: 0.6 }}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      style={{ touchAction: "pan-x" }}
      className={`fixed inset-0 z-[60] ${cardBgClasses[cardIndex]} overflow-y-auto`}
    >
      <div className="flex justify-center pt-3 pb-1">
        <div className="w-10 h-1 rounded-full bg-foreground/20" />
      </div>

      <div
        className="absolute top-0 left-0 right-0 h-[2px] pointer-events-none"
        style={{ background: cardTopGradients[cardIndex] }}
      />

      {cardGlows[cardIndex] && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: cardGlows[cardIndex] }}
        />
      )}

      <div
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          backgroundImage: `url(${cardBgImages[cardIndex]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="sticky top-0 z-20 flex justify-end px-5 pt-5">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          aria-label="Close"
          className="w-11 h-11 rounded-full bg-card/80 backdrop-blur-sm border border-border/40 flex items-center justify-center text-foreground/80 active:scale-95 transition-all"
        >
          <X size={18} />
        </button>
      </div>

      <div className="relative z-10 px-7 pt-6 pb-10 flex flex-col" style={{ minHeight: "calc(100vh + 60px)" }}>
        <h3 className="font-serif-display text-2xl font-normal text-hero-headline leading-[1.3] tracking-tight mb-5">
          {card.headline}
        </h3>

        <p className="font-sans-body text-sm text-hero-subtext leading-relaxed mb-8 max-w-sm">
          {card.description}
        </p>

        <div className="space-y-2.5 mb-8">
          {card.bullets.map((bullet, bi) => (
            <div
              key={bi}
              className="border border-border/30 rounded-sm px-4 py-3.5"
            >
              <span className="font-sans-body text-sm text-foreground/80">
                {bullet}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-auto pt-6 border-t border-border/30">
          <div className="flex items-end gap-3">
            <span className="font-serif-display text-5xl font-medium text-gradient-amber leading-none">
              {card.highlight.value}
            </span>
            <span className="font-sans-body text-sm text-muted-foreground tracking-wide uppercase pb-1">
              {card.highlight.label}
            </span>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-2 text-muted-foreground/50">
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={20} />
          </motion.div>
          <span className="font-sans-body text-xs tracking-wide">Scroll down to close</span>
        </div>
      </div>
    </motion.div>
  );
};

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

  useEffect(() => {
    if (isMobile && expandedIndex !== null) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [isMobile, expandedIndex]);

  return (
    <section
      aria-label="Why choose LevelUp"
      className="relative py-12 md:py-16 overflow-hidden"
    >
      {/* ── Asymmetric headline block ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-10 md:mb-14">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-12">
          <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-medium text-hero-headline leading-[1.15] tracking-tight max-w-lg">
            The most intentional way to learn{" "}
            <span className="text-gradient-amber">the craft.</span>
          </h2>

          <p className="font-sans-body text-sm md:text-base text-hero-subtext leading-relaxed max-w-sm md:pb-2">
            We changed how creators learn. Build real skills with mentors who
            built careers — not PowerPoint decks.
          </p>
        </div>
      </div>

      {/* ── Expandable cards row ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div
          className={`flex ${
            isMobile ? "flex-col gap-5" : "flex-row gap-3 lg:gap-4"
          }`}
          style={{ minHeight: isMobile ? undefined : 460 }}
        >
          {cards.map((card, i) => {
            const isExpanded = expandedIndex === i;
            const hasExpanded = expandedIndex !== null;

            let flexBasis = "33.333%";
            if (!isMobile && hasExpanded) {
              flexBasis = isExpanded ? "58%" : "21%";
            }

            return (
              <motion.div
                key={i}
                layout
                role="button"
                tabIndex={0}
                aria-expanded={isExpanded}
                onClick={() => toggle(i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                className={`relative ${cardBgClasses[i]} rounded-sm overflow-hidden cursor-pointer group focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary transition-all duration-300 ${
                  !isExpanded
                    ? "hover:ring-1 hover:ring-white/10 hover:-translate-y-0.5 hover:brightness-110"
                    : ""
                }`}
                style={{
                  flexBasis: isMobile ? "auto" : flexBasis,
                  flexShrink: 0,
                  flexGrow: 0,
                }}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] pointer-events-none"
                  style={{ background: cardTopGradients[i] }}
                />

                {cardGlows[i] && (
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: cardGlows[i] }}
                  />
                )}

                <div
                  className="absolute inset-0 pointer-events-none opacity-50"
                  style={{
                    backgroundImage: `url(${cardBgImages[i]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />

                <motion.div
                  layout
                  className={`relative z-10 flex flex-col justify-between h-full ${
                    isMobile
                      ? "px-7 py-8"
                      : "p-6 md:p-8 lg:p-10"
                  }`}
                  style={{
                    minHeight: isMobile ? 340 : 460,
                  }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <motion.h3
                      layout="position"
                      className={`font-serif-display font-normal text-hero-headline leading-[1.25] tracking-tight ${
                        isMobile
                          ? "text-[1.45rem]"
                          : "text-lg md:text-xl lg:text-2xl"
                      }`}
                    >
                      {card.headline}
                    </motion.h3>

                    <motion.div
                      layout="position"
                      className={`shrink-0 mt-1 rounded-full border border-border/40 flex items-center justify-center text-muted-foreground group-hover:text-foreground transition-colors ${
                        isMobile ? "w-10 h-10" : "w-8 h-8"
                      }`}
                    >
                      {isExpanded && !isMobile ? (
                        <X size={14} />
                      ) : (
                        <Maximize2 size={isMobile ? 16 : 14} />
                      )}
                    </motion.div>
                  </div>

                  {isMobile && (
                    <div className="flex flex-col flex-1 justify-between mt-5">
                      <p className="font-sans-body text-[0.9rem] text-hero-subtext/70 leading-[1.7] max-w-[85%]">
                        {card.description}
                      </p>

                      <div className="mt-6 pt-5 border-t border-border/20 flex items-end gap-3">
                        <span className="font-serif-display text-3xl font-medium text-gradient-amber leading-none">
                          {card.highlight.value}
                        </span>
                        <span className="font-sans-body text-xs text-muted-foreground/60 tracking-wide uppercase pb-0.5">
                          {card.highlight.label}
                        </span>
                      </div>
                    </div>
                  )}

                  {!isMobile && (
                    <AnimatePresence mode="wait">
                      {isExpanded ? (
                        <motion.div
                          key="expanded"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          transition={{ duration: 0.35, ease: EASE }}
                          className="flex flex-col flex-1 justify-between mt-6"
                        >
                          <div>
                            <p className="font-sans-body text-sm text-hero-subtext leading-relaxed mb-6 max-w-sm">
                              {card.description}
                            </p>
                            <div className="space-y-2">
                              {card.bullets.map((bullet, bi) => (
                                <div
                                  key={bi}
                                  className="border border-border/30 rounded-sm px-4 py-3"
                                >
                                  <span className="font-sans-body text-sm text-foreground/80">
                                    {bullet}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="mt-6 pt-5 border-t border-border/30 flex items-end gap-3">
                            <span className="font-serif-display text-4xl font-medium text-gradient-amber leading-none">
                              {card.highlight.value}
                            </span>
                            <span className="font-sans-body text-sm text-muted-foreground tracking-wide uppercase pb-1">
                              {card.highlight.label}
                            </span>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="collapsed"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="mt-auto"
                        >
                          <p className="font-sans-body text-sm text-muted-foreground leading-relaxed line-clamp-2">
                            {card.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Desktop navigation arrows */}
        {!isMobile && expandedIndex !== null && (
          <div className="flex items-center justify-center gap-3 mt-5">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 border border-border rounded-sm flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
              aria-label="Previous card"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="font-sans-body text-xs text-muted-foreground tabular-nums">
              {String((expandedIndex ?? 0) + 1).padStart(2, "0")} / 03
            </span>
            <button
              onClick={() => navigate(1)}
              className="w-10 h-10 border border-border rounded-sm flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
              aria-label="Next card"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobile && expandedIndex !== null && (
          <MobileOverlay
            card={cards[expandedIndex]}
            cardIndex={expandedIndex}
            onClose={() => setExpandedIndex(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default WhyLevelUp;
