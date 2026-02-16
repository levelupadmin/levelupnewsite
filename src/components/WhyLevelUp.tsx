import { useState, useRef, useEffect } from "react";
import { Maximize2, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import ExpertMembershipCard from "./why-levelup/ExpertMembershipCard";
import LiveProjectsCard from "./why-levelup/LiveProjectsCard";
import CommunityCard from "./why-levelup/CommunityCard";

const features = [
  {
    title: "Expert Membership",
    description: "Learn directly from industry experts with years of real-world experience.",
    expandedDescription: "Not theorists — filmmakers, editors, and writers who built careers through decades of real work. They give you the unfiltered truth.",
    bullets: [
      "Award-winning filmmakers & editors",
      "Decades of industry experience",
      "Direct, honest feedback on your work",
    ],
    stat: "40+",
    statLabel: "INDUSTRY MENTORS",
    illustration: ExpertMembershipCard,
  },
  {
    title: "Live Projects",
    description: "Residencies, real sets, and deadlines that matter.",
    expandedDescription: "We put you in real creative environments with actual stakes. No simulations, no pretend briefs — just meaningful work that matters.",
    bullets: [
      "Real-world production residencies",
      "Industry-standard equipment & sets",
      "Portfolio-ready deliverables",
    ],
    stat: "60+",
    statLabel: "WORKSHOPS",
    illustration: LiveProjectsCard,
  },
  {
    title: "Community",
    description: "A creative ecosystem that keeps growing.",
    expandedDescription: "A living network of creators who collaborate, hire each other, and keep pushing the craft forward together.",
    bullets: [
      "Lifetime access to the network",
      "Ongoing collaboration opportunities",
      "Alumni-led workshops & events",
    ],
    stat: "2K+",
    statLabel: "ACTIVE MEMBERS",
    illustration: CommunityCard,
  },
];

const CARD_WIDTH = 380;
const EXPANDED_WIDTH = 920;
const TRANSITION = "width 700ms cubic-bezier(0.25, 0.8, 0.25, 1), min-height 700ms cubic-bezier(0.25, 0.8, 0.25, 1)";

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
        inline: "center",
        block: "nearest",
      });
    }, 100);
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
      {/* Headline */}
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
                className={`${isExpanded ? "" : "cursor-pointer"}`}
                style={{
                  width: cardWidth,
                  minWidth: cardWidth,
                  transition: TRANSITION,
                  willChange: "width",
                  minHeight: isMobile
                    ? isExpanded ? 420 : 360
                    : 440,
                  flexShrink: 0,
                }}
                onClick={() => handleCardClick(index)}
              >
                <div
                  className={`relative w-full h-full rounded-2xl overflow-hidden border transition-all duration-700 ${
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
                    className="absolute top-4 right-4 z-20 w-9 h-9 flex items-center justify-center rounded-md border border-foreground/30 transition-all duration-200 hover:scale-110 hover:border-foreground/60 hover:bg-white/5 text-foreground/50 hover:text-foreground/80"
                    onClick={isExpanded ? handleClose : (e) => { e.stopPropagation(); handleCardClick(index); }}
                    aria-label={isExpanded ? "Close" : "Expand"}
                  >
                    {isExpanded ? <X size={16} /> : <Maximize2 size={14} />}
                  </button>

                  {/* DEFAULT / COMPRESSED layer - always visible when not expanded */}
                  <div
                    className="absolute inset-0 flex flex-col p-7 md:p-10 overflow-hidden"
                    style={{
                      opacity: !isExpanded ? 1 : 0,
                      transition: "opacity 250ms ease",
                      pointerEvents: !isExpanded ? "auto" : "none",
                    }}
                  >
                    <h3 className="font-serif-display text-xl md:text-2xl font-medium text-foreground leading-tight mb-5 whitespace-nowrap">
                      {feature.title}
                    </h3>
                    <div className="flex-1 min-h-0">
                      <Illustration />
                    </div>
                  </div>

                  {/* EXPANDED STATE */}
                  <div
                    className="absolute inset-0 flex flex-col overflow-hidden"
                    style={{
                      opacity: isExpanded ? 1 : 0,
                      transition: isExpanded
                        ? "opacity 300ms ease 100ms"
                        : "opacity 200ms ease",
                      pointerEvents: isExpanded ? "auto" : "none",
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Top: Title + Description */}
                    <div className={`p-6 md:p-8 pb-4 ${isMobile ? "" : "flex items-start gap-8"}`}>
                      <h3 className="font-serif-display text-xl md:text-2xl font-medium text-foreground leading-tight shrink-0">
                        {feature.title}
                      </h3>
                      <p className={`font-sans-body text-sm text-muted-foreground leading-relaxed ${isMobile ? "mt-3" : "mt-1"}`}>
                        {feature.expandedDescription}
                      </p>
                    </div>

                    {/* Bottom: Illustration | Bullets | Stat - 3 column grid */}
                    <div className={`flex-1 px-6 md:px-8 pb-6 md:pb-8 ${isMobile ? "flex flex-col gap-5" : "grid grid-cols-3 gap-6"}`}>
                      {/* Illustration */}
                      <div className="flex items-center justify-center">
                        <Illustration />
                      </div>

                      {/* Bullets */}
                      <div className="flex flex-col justify-center">
                        <div className="space-y-2.5">
                          {feature.bullets.map((bullet, i) => (
                            <div key={i} className="flex items-start gap-2.5">
                              <span className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />
                              <span className="font-sans-body text-sm text-foreground/80">
                                {bullet}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Stat */}
                      {feature.stat && (
                        <div className="flex flex-col items-center justify-center">
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
