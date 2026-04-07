import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
  {
    label: "LEARN",
    heading: "Learn",
    step: "01",
    image: "https://framerusercontent.com/images/U9iZffSyvaAbp3MSqamfZcxIPM.png?width=486&height=706",
    body: "Every weekend, you'll join live sessions where mentors break down the exact tools, techniques, and storytelling tricks they use every day.",
    align: "left" as const,
  },
  {
    label: "PRACTICE",
    heading: "Practice",
    step: "02",
    image: "https://framerusercontent.com/images/zccB5DrbOcyqfpQSAGtlGObXp20.png?width=486&height=706",
    body: "After each session, you'll get hands-on with real projects. We'll give you clear briefs, and you'll get feedback so you're always improving.",
    align: "right" as const,
  },
  {
    label: "APPLY",
    heading: "Apply",
    step: "03",
    image: "https://framerusercontent.com/images/nWv555wV3jh7qcGTn44llh7abS0.png?width=486&height=706",
    body: "You'll build a portfolio along the way — not at the end. You'll learn how to pitch, deliver, and actually get paid for your work.",
    align: "left" as const,
  },
  {
    label: "COLLABORATE & GROW",
    heading: "Collaborate & Grow",
    step: "04",
    image: "https://framerusercontent.com/images/JiwNnwTMADriJmOrYeYfBgtS5v8.png?width=486&height=706",
    body: "Weekly community calls, peer reviews, and collab threads keep you connected, accountable, and constantly improving — with people on the same path.",
    align: "right" as const,
  },
];

const NodeCard = ({
  step,
  index,
  isActive,
  isVisible,
}: {
  step: (typeof steps)[0];
  index: number;
  isActive: boolean;
  isVisible: boolean;
}) => {
  const isRight = step.align === "right";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 }}
      className={`relative flex ${isRight ? "justify-end" : "justify-start"}`}
      style={{ paddingLeft: isRight ? 0 : 40, paddingRight: isRight ? 40 : 0 }}
    >
      {/* Play icon — left of card */}
      <div className="absolute flex flex-col gap-3" style={{
        left: isRight ? undefined : 0,
        right: isRight ? 0 : undefined,
        top: "50%",
        transform: "translateY(-50%)",
      }}>
        <svg width="16" height="16" viewBox="0 0 16 16">
          <polygon points="0,0 0,16 14,8" fill="#84cc16" />
        </svg>
      </div>

      <div
        className="relative rounded-lg overflow-hidden border transition-all duration-300"
        style={{
          width: 260,
          background: isActive ? "#222" : "#1a1a1a",
          borderColor: isActive ? "rgba(168,85,247,0.5)" : "rgba(255,255,255,0.1)",
          borderWidth: isActive ? 1.5 : 1,
        }}
      >
        {/* Label */}
        <div className="text-center pt-3 pb-1">
          <span
            className="text-[10px] uppercase tracking-[1.5px] text-white/50"
            style={{ fontFamily: "'Funnel Display', sans-serif" }}
          >
            {step.label}
          </span>
        </div>

        {/* Thumbnail */}
        <div className="mx-2 rounded overflow-hidden" style={{ height: 120 }}>
          <img
            src={step.image}
            alt={step.heading}
            className="w-full h-full object-cover"
            style={{ filter: "saturate(0.3) brightness(0.7)" }}
          />
        </div>

        {/* Progress bar */}
        <div className="mx-2 mt-2">
          <div className="h-[2px] bg-[#333] rounded-full">
            <div className="h-full w-3/5 bg-indigo-500 rounded-full" />
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex items-center gap-2 px-3 py-2">
          <svg width="10" height="10" viewBox="0 0 10 10">
            <polygon points="0,0 0,10 9,5" fill="#06b6d4" />
          </svg>
          <span
            className="text-white/30 text-sm font-bold"
            style={{ fontFamily: "'Funnel Display', sans-serif" }}
          >
            {step.step}
          </span>
        </div>

        {/* Green connector — right */}
        <div
          className="absolute w-2 h-2 rounded-sm bg-[#84cc16]"
          style={{ right: -12, top: "50%", transform: "translateY(-50%)" }}
        />
        {/* Cyan connector — bottom */}
        <div
          className="absolute w-2 h-2 rounded-sm bg-[#06b6d4]"
          style={{ bottom: -12, right: 20 }}
        />
      </div>
    </motion.div>
  );
};

const VEFramework = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    cardRefs.current.forEach((el, i) => {
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveIndex(i);
            setVisibleCards((prev) => new Set(prev).add(i));
          }
        },
        { threshold: 0.6, rootMargin: "-10% 0px -30% 0px" }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <section
      className="relative"
      style={{ background: "#0d0d0d", paddingTop: 120, paddingBottom: 120 }}
    >
      {/* Header */}
      <div className="text-center mb-16 px-6">
        <span className="text-xs uppercase tracking-[0.2em] text-white/40 mb-4 block">
          How You'll Learn?
        </span>
        <h2
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
          style={{ fontFamily: "'Funnel Display', sans-serif" }}
        >
          The Framework
        </h2>
        <p className="text-[#9CA3AF] max-w-2xl mx-auto text-base md:text-lg">
          Here's how we turn you from a curious beginner into a confident, working editor
          — one step at a time.
        </p>
      </div>

      {/* Two-column layout */}
      <div className="max-w-[1380px] mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Left column — vertical scroll canvas */}
        <div className="lg:w-[60%] relative">
          <div
            className="rounded-2xl overflow-hidden relative"
            style={{
              background: "#111111",
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
              minHeight: 800,
            }}
          >
            {/* Grid lines at top */}
            <div className="flex gap-0 border-b border-white/5">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="flex-1 h-8 border-r border-white/5" />
              ))}
            </div>

            {/* Cards with connectors */}
            <div className="relative px-6 py-12 flex flex-col gap-0">
              {steps.map((step, i) => (
                <div key={step.step}>
                  {/* Connector line from previous card */}
                  {i > 0 && (
                    <div className="relative h-16 my-2">
                      <svg
                        className="absolute inset-0 w-full h-full"
                        preserveAspectRatio="none"
                      >
                        <line
                          x1={steps[i - 1].align === "left" ? "30%" : "70%"}
                          y1="0"
                          x2={step.align === "left" ? "30%" : "70%"}
                          y2="100%"
                          stroke="#444"
                          strokeWidth="1.2"
                        />
                      </svg>
                    </div>
                  )}

                  {/* Card wrapper with ref for intersection observer */}
                  <div
                    ref={(el) => {
                      cardRefs.current[i] = el;
                    }}
                  >
                    <NodeCard
                      step={step}
                      index={i}
                      isActive={i === activeIndex}
                      isVisible={visibleCards.has(i)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column – sticky panel */}
        <div className="lg:w-[40%]">
          <div className="lg:sticky lg:top-32">
            {/* Step indicators */}
            <div className="flex gap-2 mb-8">
              {steps.map((_, i) => (
                <div
                  key={i}
                  className="h-[3px] rounded-full transition-all duration-500"
                  style={{
                    width: i === activeIndex ? 32 : 20,
                    background: i === activeIndex ? "#fff" : "#333",
                  }}
                />
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-5 h-5 rounded-full flex-shrink-0"
                    style={{
                      background: "linear-gradient(135deg, #a855f7, #7c3aed)",
                    }}
                  />
                  <h3
                    className="text-3xl md:text-4xl font-bold text-white"
                    style={{ fontFamily: "'Funnel Display', sans-serif" }}
                  >
                    {steps[activeIndex].heading}
                  </h3>
                </div>

                <div className="h-px bg-white/10 mb-6" />

                <p className="text-[#9CA3AF] text-base md:text-lg leading-relaxed mb-8">
                  {steps[activeIndex].body}
                </p>

                <a
                  href="#apply"
                  className="inline-block px-8 py-3 rounded-full text-white font-medium text-sm"
                  style={{
                    background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                  }}
                >
                  Request Invite
                </a>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VEFramework;
