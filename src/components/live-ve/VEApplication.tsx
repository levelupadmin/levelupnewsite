import { useRef } from "react";
import FadeInSection from "@/components/FadeInSection";
import { m, useScroll, useTransform, MotionValue } from "framer-motion";

const steps = [
  { step: "01", title: "Request an invite via\nthe application form" },
  { step: "02", title: "Pay a refundable\napplication fee" },
  { step: "03", title: "Sit for an interview with\nour admissions team" },
  { step: "04", title: "Get a decision\nwithin 12–48 hours" },
  { step: "05", title: "Confirm your seat\nif selected" },
  { step: "06", title: "Get ready to transform the way\nyou edit forever" },
];

const TOTAL = steps.length;

function StackCard({
  step,
  index,
  scrollYProgress,
}: {
  step: { step: string; title: string };
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  // Each card occupies a segment of the scroll
  const segStart = index / TOTAL;
  const segEnd = (index + 1) / TOTAL;

  // Card enters: slides up from below
  const y = useTransform(
    scrollYProgress,
    [Math.max(segStart - 0.05, 0), segStart],
    [200, 0]
  );

  // After its segment, it scales down and fades
  const scale = useTransform(
    scrollYProgress,
    [segStart, segEnd, Math.min(segEnd + 0.02, 1)],
    [1, 1, index < TOTAL - 1 ? 0.92 : 1]
  );

  const opacity = useTransform(
    scrollYProgress,
    [segStart, segEnd, Math.min(segEnd + 0.04, 1)],
    [1, 1, index < TOTAL - 1 ? 0.4 : 1]
  );

  return (
    <m.div
      style={{
        scale,
        opacity,
        y: index === 0 ? 0 : y,
        zIndex: index + 1,
        position: "sticky",
        top: `calc(35vh + ${index * 8}px)`,
      }}
      className="w-full max-w-[720px] mx-auto mb-4"
    >
      <div
        className="rounded-[22px] px-8 py-12 md:px-12 md:py-16 flex flex-col items-center justify-center text-center relative overflow-hidden"
        style={{
          background:
            "linear-gradient(145deg, #1a1a3a 0%, #141430 40%, #0f1b2e 100%)",
          boxShadow:
            "0 0 60px rgba(100, 60, 255, 0.06), 0 12px 40px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* Subtle glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[120px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse, rgba(140,100,255,0.08) 0%, transparent 70%)",
          }}
        />

        {/* Step pill */}
        <span
          className="inline-block text-sm tracking-widest mb-6 px-5 py-1.5 rounded-full"
          style={{
            color: "rgba(180, 160, 240, 0.7)",
            border: "1px solid rgba(180, 160, 240, 0.2)",
            fontFamily: "monospace",
          }}
        >
          Step {step.step}
        </span>

        {/* Title */}
        <h3
          className="text-2xl sm:text-3xl md:text-[2.5rem] font-light text-white leading-snug whitespace-pre-line"
          style={{ fontFamily: "'Funnel Display', sans-serif" }}
        >
          {step.title}
        </h3>
      </div>
    </m.div>
  );
}

const VEApplication = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{
        background: "linear-gradient(180deg, #050505 0%, #0A0A0A 100%)",
        height: `${TOTAL * 80 + 80}vh`,
      }}
    >
      <div className="sticky top-0 min-h-screen flex flex-col items-center pt-[14vh] md:pt-[16vh] px-6 overflow-hidden">
        {/* Header */}
        <FadeInSection className="text-center mb-10 md:mb-14">
          <p className="text-sm text-white/30 tracking-[0.2em] uppercase mb-3">
            🎬 The Process
          </p>
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-normal text-white leading-tight mb-4"
            style={{ fontFamily: "'Funnel Display', sans-serif" }}
          >
            How to Apply?
          </h2>
          <p className="text-base md:text-lg text-[#A0A0A0] max-w-xl mx-auto leading-relaxed">
            To becoming the kind of editor who knows what to cut, why it works,
            and how to turn it into paid work.
          </p>
        </FadeInSection>

        {/* Cards */}
        <div className="w-full">
          {steps.map((step, i) => (
            <StackCard
              key={step.step}
              step={step}
              index={i}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default VEApplication;
