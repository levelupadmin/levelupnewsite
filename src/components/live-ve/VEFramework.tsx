import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
  {
    label: "LEARN",
    heading: "Learn",
    step: "01",
    image: "https://framerusercontent.com/images/U9iZffSyvaAbp3MSqamfZcxIPM.png?width=486&height=706",
    body: "Every weekend, you'll join live sessions where mentors break down the exact tools, techniques, and storytelling tricks they use every day.",
  },
  {
    label: "PRACTICE",
    heading: "Practice",
    step: "02",
    image: "https://framerusercontent.com/images/zccB5DrbOcyqfpQSAGtlGObXp20.png?width=486&height=706",
    body: "After each session, you'll get hands-on with real projects. We'll give you clear briefs, and you'll get feedback so you're always improving.",
  },
  {
    label: "APPLY",
    heading: "Apply",
    step: "03",
    image: "https://framerusercontent.com/images/nWv555wV3jh7qcGTn44llh7abS0.png?width=486&height=706",
    body: "You'll build a portfolio along the way — not at the end. You'll learn how to pitch, deliver, and actually get paid for your work.",
  },
  {
    label: "COLLABORATE & GROW",
    heading: "Collaborate & Grow",
    step: "04",
    image: "https://framerusercontent.com/images/JiwNnwTMADriJmOrYeYfBgtS5v8.png?width=486&height=706",
    body: "Weekly community calls, peer reviews, and collab threads keep you connected, accountable, and constantly improving — with people on the same path.",
  },
];

const VEFramework = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = cardRefs.current.indexOf(entry.target as HTMLDivElement);
            if (idx !== -1) setActiveIndex(idx);
          }
        });
      },
      { threshold: 0.6 }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
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
          Here's how we turn you from a curious beginner into a confident, working editor — one step at a time.
        </p>
      </div>

      {/* Two-column layout */}
      <div className="max-w-[1380px] mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Left column – scrollable timeline */}
        <div className="lg:w-[60%] relative">
          <div
            className="rounded-2xl p-6 md:p-10 relative"
            style={{
              background: "#111111",
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          >
            {/* SVG connector lines */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-0"
              preserveAspectRatio="none"
            >
              {/* Lines drawn via CSS since SVG coords are hard without knowing layout */}
            </svg>

            <div className="relative z-10 space-y-12 md:space-y-20">
              {steps.map((step, i) => (
                <div
                  key={step.step}
                  ref={(el) => { cardRefs.current[i] = el; }}
                  className="relative"
                  style={{ marginLeft: `${i * 8}%` }}
                >
                  {/* Connector line to next card */}
                  {i < steps.length - 1 && (
                    <div
                      className="absolute hidden md:block"
                      style={{
                        top: "100%",
                        left: "50%",
                        width: "2px",
                        height: "60px",
                        background: "linear-gradient(to bottom, #444, transparent)",
                        transform: `rotate(${15}deg)`,
                        transformOrigin: "top center",
                      }}
                    />
                  )}

                  {/* Label */}
                  <span className="text-[10px] uppercase tracking-[0.15em] text-white/50 mb-2 block font-medium">
                    {step.label}
                  </span>

                  {/* Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
                    className="rounded-xl overflow-hidden relative group"
                    style={{ background: "#1a1a1a" }}
                  >
                    <div className="flex items-center gap-4 p-3">
                      {/* Play icon */}
                      <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
                        <svg width="16" height="18" viewBox="0 0 16 18" fill="none">
                          <path d="M1 1L15 9L1 17V1Z" fill="#84cc16" />
                        </svg>
                      </div>

                      {/* Thumbnail */}
                      <div className="w-20 h-14 md:w-28 md:h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={step.image}
                          alt={step.label}
                          className="w-full h-full object-cover"
                          style={{ filter: "saturate(0.3) brightness(0.8)" }}
                        />
                      </div>

                      {/* Step number */}
                      <span className="text-white/20 text-2xl md:text-3xl font-bold ml-auto mr-2">
                        {step.step}
                      </span>

                      {/* Connector handles */}
                      <div className="flex flex-col gap-2 items-center flex-shrink-0">
                        <div className="w-2.5 h-2.5 bg-green-500 rounded-sm" />
                        <div className="w-2.5 h-2.5 bg-cyan-400 rounded-sm" />
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>

            {/* Diagonal connector lines overlay */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-[5]"
              style={{ overflow: "visible" }}
            >
              {[0, 1, 2].map((i) => {
                const y1 = 25 + i * 25;
                const y2 = 25 + (i + 1) * 25;
                const x1 = 15 + i * 8;
                const x2 = 15 + (i + 1) * 8;
                return (
                  <line
                    key={i}
                    x1={`${x1}%`}
                    y1={`${y1}%`}
                    x2={`${x2}%`}
                    y2={`${y2}%`}
                    stroke="#333"
                    strokeWidth="1.5"
                    strokeDasharray="6 4"
                  />
                );
              })}
            </svg>
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
                  className="h-1 rounded-full transition-all duration-500"
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
                {/* Heading with purple blob */}
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

                {/* Divider */}
                <div className="h-px bg-white/10 mb-6" />

                {/* Body */}
                <p className="text-[#9CA3AF] text-base md:text-lg leading-relaxed">
                  {steps[activeIndex].body}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VEFramework;
