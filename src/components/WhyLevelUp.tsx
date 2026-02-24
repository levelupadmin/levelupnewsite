import { useState, useRef, useEffect } from "react";
import FadeInSection from "./FadeInSection";
import { Maximize2, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import ExpertMembershipCard from "./why-levelup/ExpertMembershipCard";
import LiveProjectsCard from "./why-levelup/LiveProjectsCard";
import CommunityCard from "./why-levelup/CommunityCard";

const features = [
  {
    title: "Expert Mentors",
    description: "Not theorists. Working filmmakers, editors, and writers who've shipped real work—and tell you what actually matters.",
    expandedDescription: "You don't need more tips. You need taste, reps, and honest direction. Our mentors are working creators—the kind who've built careers through real projects. They'll help you see what you're missing, and how to fix it.",
    bullets: [
      "Mentors with real credits (film + digital)",
      "Direct feedback on your work—not generic comments",
      "Craft-first teaching: story, rhythm, clarity, emotion",
    ],
    stat: "40+",
    statLabel: "WORKING MENTORS",
    illustration: ExpertMembershipCard,
  },
  {
    title: "Portfolio-Driven Learning",
    description: "Every program ends with work you can show—edits, scenes, scripts, films. Proof over certificates.",
    expandedDescription: "Most learning stays in your notes. Ours ends up in your portfolio. We build the curriculum around outputs, so your progress is visible—and shareable.",
    bullets: [
      "Project-first structure (make while you learn)",
      "Deadlines that create momentum",
      "Portfolio outcomes: reels, edits, scripts, scenes, short films",
    ],
    stat: "200+",
    statLabel: "PROJECTS ENABLED",
    microLine: "Leave with something you're proud to put out in the world.",
    illustration: LiveProjectsCard,
  },
  {
    title: "Community, Through the Journey",
    description: "Support, feedback, and momentum—before, during, and after you learn.",
    expandedDescription: "The work gets easier when you're not doing it alone. LevelUp is built with support baked in—feedback loops, peers, and mentors—so you keep moving even when motivation drops.",
    bullets: [
      "Feedback that keeps you sharp (work-in-progress encouraged)",
      "Peers who get it—editors, DPs, writers, creators",
      "Consistency support: prompts, reviews, accountability",
    ],
    stat: "2K+",
    statLabel: "ACTIVE MEMBERS",
    illustration: CommunityCard,
  },
];

const CARD_WIDTH = 380;
const EXPANDED_WIDTH = 920;
const TRANSITION = "width 600ms cubic-bezier(0.4, 0, 0.2, 1), min-width 600ms cubic-bezier(0.4, 0, 0.2, 1), min-height 600ms cubic-bezier(0.4, 0, 0.2, 1)";

const WhyLevelUp = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (expandedIndex === null || isMobile) return;
    const timer = setTimeout(() => {
      cardRefs.current[expandedIndex]?.scrollIntoView({
        behavior: "smooth",
        inline: "start",
        block: "nearest",
      });
    }, 150);
    return () => clearTimeout(timer);
  }, [expandedIndex, isMobile]);

  const handleCardClick = (index: number) => {
    if (expandedIndex === index) return;
    setExpandedIndex(index);
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedIndex(null);
  };

  return (
    <section
      aria-label="Why choose LevelUp"
      className="relative py-12 md:py-16 overflow-hidden"
    >
      {/* Subtle top divider */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{
          background:
            "linear-gradient(90deg, transparent 15%, hsl(var(--border)) 50%, transparent 85%)",
        }}
      />
      {/* Headline */}
      <FadeInSection className="max-w-7xl mx-auto px-6 md:px-12 mb-10 md:mb-14">
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
      </FadeInSection>

      {/* Feature Cards */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div
          ref={containerRef}
          className={`flex ${isMobile ? "flex-col gap-4" : "flex-row gap-5"}`}
          style={!isMobile ? {
            overflowX: "auto",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          } as React.CSSProperties : undefined}
        >
          {features.map((feature, index) => {
            const isExpanded = expandedIndex === index;
            const Illustration = feature.illustration;

            const cardWidth = isMobile ? undefined : isExpanded ? EXPANDED_WIDTH : CARD_WIDTH;

            return (
              <div
                key={index}
                ref={(el) => { cardRefs.current[index] = el; }}
                className={`flex flex-col ${isExpanded ? "" : "cursor-pointer"}`}
                style={{
                  width: cardWidth,
                  minWidth: cardWidth,
                  transition: TRANSITION,
                  willChange: "width",
                  minHeight: isMobile
                    ? isExpanded ? 504 : 432
                    : 528,
                  flexShrink: 0,
                }}
                onClick={() => handleCardClick(index)}
              >
                <div
                  className={`relative w-full flex-1 min-h-0 rounded-2xl overflow-hidden border transition-all duration-500 ease-out ${
                    isExpanded
                      ? "border-primary/40 shadow-[0_0_40px_8px_hsl(30_80%_45%/0.3)]"
                      : "border-primary/20 hover:border-primary/40 hover:shadow-[0_0_30px_4px_hsl(30_80%_45%/0.25)]"
                  }`}
                  style={{
                    background: "linear-gradient(160deg, hsl(30 40% 12%) 0%, hsl(0 0% 4%) 50%, hsl(0 0% 2%) 100%)",
                  }}
                >
                  {/* Icon button - bordered square */}
                  <button
                    className="absolute top-4 right-4 z-20 w-11 h-11 flex items-center justify-center rounded-md border border-foreground/30 transition-all duration-200 hover:scale-110 hover:border-foreground/60 hover:bg-white/5 text-foreground/50 hover:text-foreground/80"
                    onClick={isExpanded ? handleClose : (e) => { e.stopPropagation(); handleCardClick(index); }}
                    aria-label={isExpanded ? "Close" : "Expand"}
                  >
                    {isExpanded ? <X size={16} /> : <Maximize2 size={14} />}
                  </button>

                  {/* DEFAULT / COMPRESSED layer - always visible when not expanded */}
                  <div
                    className="absolute inset-0 flex flex-col p-7 md:p-10 overflow-hidden transition-opacity duration-300 ease-out"
                    style={{
                      opacity: !isExpanded ? 1 : 0,
                      transitionDelay: !isExpanded ? "150ms" : "0ms",
                      pointerEvents: !isExpanded ? "auto" : "none",
                    }}
                  >
                    <h3 className="font-serif-display text-xl md:text-2xl font-medium text-foreground leading-tight mb-3">
                      {feature.title}
                    </h3>
                    <p className="font-sans-body text-sm text-muted-foreground leading-relaxed mb-4">
                      {feature.description}
                    </p>
                    <div className="flex-1 min-h-0">
                      <Illustration />
                    </div>
                  </div>

                  {/* EXPANDED STATE */}
                  <div
                    className="absolute inset-0 flex flex-col overflow-hidden transition-opacity duration-400 ease-out"
                    style={{
                      opacity: isExpanded ? 1 : 0,
                      transitionDelay: isExpanded ? "200ms" : "0ms",
                      pointerEvents: isExpanded ? "auto" : "none",
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* 2-column layout */}
                    <div className={`flex-1 p-6 md:p-8 ${isMobile ? "flex flex-col gap-5" : "grid grid-cols-[2fr_3fr] gap-8"}`}>
                      {/* Left column: Title, Illustration, Stat */}
                      <div className="flex flex-col">
                        <h3 className="font-serif-display text-xl md:text-2xl font-medium text-foreground leading-tight mb-4">
                          {feature.title}
                        </h3>
                        <div className="flex-1 flex items-center justify-center min-h-0">
                          <Illustration />
                        </div>
                        {(feature as any).microLine && (
                          <p className="font-sans-body text-xs text-muted-foreground/70 italic text-center mt-4">
                            {(feature as any).microLine}
                          </p>
                        )}
                      </div>

                      {/* Right column: Description, Bullets */}
                      <div className="flex flex-col justify-start pt-4 md:pt-6">
                        <p className="font-sans-body text-sm text-muted-foreground leading-relaxed mb-4">
                          {feature.expandedDescription}
                        </p>
                        <div className="space-y-3.5">
                          {feature.bullets.map((bullet, i) => (
                            <div key={i} className="flex items-start gap-2.5">
                              <span className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />
                              <span className="font-sans-body text-sm text-foreground/80">
                                {bullet}
                              </span>
                            </div>
                          ))}
                        </div>
                        {feature.stat && (
                          <div className="flex-1 flex flex-col items-center justify-center p-4">
                            <span className="font-serif-display text-4xl md:text-5xl font-bold text-gradient-amber">
                              {feature.stat}
                            </span>
                            <span className="font-sans-body text-xs text-muted-foreground tracking-wider mt-1 uppercase">
                              {feature.statLabel}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Hide scrollbar CSS */}
      <style>{`
        [style*="scrollbar-width"]::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default WhyLevelUp;
