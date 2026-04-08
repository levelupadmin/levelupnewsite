import { useRef } from "react";
import FadeInSection from "@/components/FadeInSection";
import { veApplicationSteps } from "@/data/liveVEData";
import { m, useScroll, useTransform, useMotionValueEvent } from "framer-motion";

const CARD_HEIGHT = 180;
const CARD_OVERLAP = 40;
const TOTAL_CARDS = veApplicationSteps.length;

const StackCard = ({
  step,
  index,
  totalCards,
  scrollYProgress,
}: {
  step: { step: string; title: string };
  index: number;
  totalCards: number;
  scrollYProgress: any;
}) => {
  const cardStart = index / totalCards;
  const cardEnd = (index + 1) / totalCards;

  const scale = useTransform(
    scrollYProgress,
    [cardStart, cardEnd, Math.min(cardEnd + 0.1, 1)],
    [1, 1, index < totalCards - 1 ? 0.96 : 1]
  );

  const opacity = useTransform(
    scrollYProgress,
    [cardStart, cardEnd, Math.min(cardEnd + 0.15, 1)],
    [1, 1, index < totalCards - 1 ? 0.6 : 1]
  );

  const y = useTransform(
    scrollYProgress,
    [cardStart, cardEnd],
    [100, 0]
  );

  return (
    <m.div
      style={{
        scale,
        opacity,
        y: index === 0 ? 0 : y,
        zIndex: index + 1,
        position: "sticky",
        top: `calc(30vh + ${index * CARD_OVERLAP}px)`,
      }}
      className="w-full max-w-[560px] mx-auto"
    >
      <div
        className="rounded-[22px] p-7 md:p-9 min-h-[160px] flex flex-col justify-center relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #1A1A3A 0%, #0F1B2E 60%, #12102a 100%)",
          boxShadow:
            "0 0 40px rgba(120, 80, 255, 0.08), 0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
        }}
      >
        {/* Subtle top-left glow */}
        <div
          className="absolute -top-10 -left-10 w-40 h-40 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(120,80,255,0.12) 0%, transparent 70%)",
          }}
        />
        <span className="text-[13px] font-medium tracking-wide text-purple-400/70 mb-3 block">
          Step {step.step}
        </span>
        <p className="text-xl md:text-2xl font-semibold text-white leading-snug whitespace-pre-line">
          {step.title}
        </p>
      </div>
    </m.div>
  );
};

const VEApplication = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Format titles with line breaks
  const formattedSteps = [
    { step: "01", title: "Request an invite via\nthe application form" },
    { step: "02", title: "Pay a refundable\napplication fee" },
    { step: "03", title: "Sit for an interview with\nour admissions team" },
    { step: "04", title: "Get a decision\nwithin 12–48 hours" },
    { step: "05", title: "Confirm your seat\nif selected" },
  ];

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{
        background: "linear-gradient(180deg, #050505 0%, #0A0A0A 100%)",
        height: `${100 + TOTAL_CARDS * 60}vh`,
      }}
    >
      <div className="sticky top-0 min-h-screen flex flex-col items-center justify-start pt-[12vh] md:pt-[14vh] px-6">
        {/* Header */}
        <FadeInSection className="text-center mb-12 md:mb-16">
          <p className="text-xs text-white/30 tracking-[0.25em] uppercase mb-4">
            🎬 The Process
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-5">
            How to Apply?
          </h2>
          <p className="text-base md:text-lg text-[#A0A0A0] max-w-lg mx-auto leading-relaxed">
            To become the kind of editor who knows what to cut, why it works,
            and how to turn it into paid work.
          </p>
        </FadeInSection>

        {/* Stacked Cards */}
        <div className="w-full max-w-[560px] mx-auto flex flex-col" style={{ gap: `-${CARD_OVERLAP}px` }}>
          {formattedSteps.map((step, i) => (
            <StackCard
              key={step.step}
              step={step}
              index={i}
              totalCards={formattedSteps.length}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default VEApplication;
