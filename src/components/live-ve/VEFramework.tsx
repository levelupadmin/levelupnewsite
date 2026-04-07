import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

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

/* Card positions in the wide SVG canvas (zig-zag layout) */
const cardPositions = [
  { x: 200, y: 30 },
  { x: 520, y: 180 },
  { x: 820, y: 30 },
  { x: 1140, y: 180 },
];

const CANVAS_W = 1500;
const CANVAS_H = 380;
const CARD_W = 200;
const CARD_H = 160;

const VEFramework = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  /* Track scroll progress through the pinned section */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  /* Map scroll progress → horizontal translate of SVG canvas */
  const canvasX = useTransform(scrollYProgress, [0, 1], [0, -(CANVAS_W - 700)]);

  /* Update active card based on scroll progress */
  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      // Map progress to card index (0-3)
      const idx = Math.min(3, Math.floor(v * 4));
      setActiveIndex(idx);
    });
    return unsub;
  }, [scrollYProgress]);

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: "300vh" }} /* tall container to drive scroll */
    >
      {/* Sticky wrapper that stays in viewport while scrolling */}
      <div
        className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden"
        style={{ background: "#0d0d0d" }}
      >
        {/* Header */}
        <div className="text-center mb-8 md:mb-12 px-6">
          <span className="text-xs uppercase tracking-[0.2em] text-white/40 mb-3 block">
            How You'll Learn?
          </span>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3"
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
        <div className="max-w-[1380px] mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-6 lg:gap-10 w-full">
          {/* Left column — scroll-driven horizontal canvas */}
          <div className="lg:w-[60%] relative">
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: "#111111",
                backgroundImage:
                  "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            >
              {/* Grid header lines */}
              <div className="flex gap-0 border-b border-white/[0.06]">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="flex-1 h-6 border-r border-white/[0.06]" />
                ))}
              </div>

              <motion.div style={{ x: canvasX }} className="will-change-transform">
                <svg
                  width={CANVAS_W}
                  height={CANVAS_H}
                  viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`}
                  className="block"
                >
                  {/* Green input node */}
                  <rect x={40} y={CANVAS_H / 2 - 16} width={28} height={32} rx={6} fill="#222" stroke="#333" />
                  <circle cx={54} cy={CANVAS_H / 2} r={7} fill="#84cc16" />

                  {/* Line from input to first card */}
                  <line
                    x1={68} y1={CANVAS_H / 2}
                    x2={cardPositions[0].x - 16} y2={cardPositions[0].y + CARD_H / 2}
                    stroke="#444" strokeWidth={1.2}
                  />
                  <polygon
                    points={`${cardPositions[0].x - 20},${cardPositions[0].y + CARD_H / 2 - 4} ${cardPositions[0].x - 20},${cardPositions[0].y + CARD_H / 2 + 4} ${cardPositions[0].x - 14},${cardPositions[0].y + CARD_H / 2}`}
                    fill="#84cc16"
                  />

                  {/* Connector lines between cards */}
                  {[0, 1, 2].map((i) => {
                    const from = cardPositions[i];
                    const to = cardPositions[i + 1];
                    const x1 = from.x + CARD_W + 12;
                    const y1 = from.y + CARD_H / 2;
                    const x2 = to.x - 16;
                    const y2 = to.y + CARD_H / 2;
                    return (
                      <g key={i}>
                        <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#444" strokeWidth={1.2} />
                        <polygon
                          points={`${x2 - 4},${y2 - 4} ${x2 - 4},${y2 + 4} ${x2 + 2},${y2}`}
                          fill="#84cc16"
                        />
                      </g>
                    );
                  })}

                  {/* Node cards */}
                  {steps.map((step, i) => {
                    const pos = cardPositions[i];
                    const isActive = i === activeIndex;
                    return (
                      <g key={step.step}>
                        {/* Label */}
                        <text
                          x={pos.x + CARD_W / 2} y={pos.y - 10}
                          textAnchor="middle" fill="rgba(255,255,255,0.5)"
                          fontSize="11" fontWeight="600" letterSpacing="1.5"
                          fontFamily="'Funnel Display', sans-serif"
                        >
                          {step.label}
                        </text>

                        {/* Card body */}
                        <rect
                          x={pos.x} y={pos.y} width={CARD_W} height={CARD_H} rx={10}
                          fill={isActive ? "#222" : "#1a1a1a"}
                          stroke={isActive ? "rgba(168,85,247,0.5)" : "rgba(255,255,255,0.1)"}
                          strokeWidth={isActive ? 1.5 : 1}
                        />

                        {/* Image */}
                        <clipPath id={`clip-${i}`}>
                          <rect x={pos.x + 8} y={pos.y + 8} width={CARD_W - 16} height={90} rx={6} />
                        </clipPath>
                        <image
                          href={step.image}
                          x={pos.x + 8} y={pos.y + 8}
                          width={CARD_W - 16} height={90}
                          clipPath={`url(#clip-${i})`}
                          preserveAspectRatio="xMidYMid slice"
                          style={{ filter: "saturate(0.3) brightness(0.7)" }}
                        />

                        {/* Progress bar */}
                        <rect x={pos.x + 8} y={pos.y + 104} width={CARD_W - 16} height={2} rx={1} fill="#333" />
                        <rect x={pos.x + 8} y={pos.y + 104} width={(CARD_W - 16) * 0.6} height={2} rx={1} fill="#6366f1" />

                        {/* Play icon left */}
                        <polygon
                          points={`${pos.x - 16},${pos.y + CARD_H / 2 - 5} ${pos.x - 16},${pos.y + CARD_H / 2 + 5} ${pos.x - 8},${pos.y + CARD_H / 2}`}
                          fill="#84cc16"
                        />

                        {/* Step number */}
                        <text
                          x={pos.x + 12} y={pos.y + CARD_H - 12}
                          fill="rgba(255,255,255,0.3)" fontSize="16" fontWeight="700"
                          fontFamily="'Funnel Display', sans-serif"
                        >
                          {step.step}
                        </text>

                        {/* Cyan play bottom */}
                        <polygon
                          points={`${pos.x + 8},${pos.y + CARD_H - 18} ${pos.x + 8},${pos.y + CARD_H - 10} ${pos.x + 14},${pos.y + CARD_H - 14}`}
                          fill="#06b6d4"
                        />

                        {/* Green connector right */}
                        <rect
                          x={pos.x + CARD_W + 4} y={pos.y + CARD_H / 2 - 5}
                          width={8} height={8} rx={1.5} fill="#84cc16"
                        />

                        {/* Cyan connector bottom */}
                        <rect
                          x={pos.x + CARD_W - 4} y={pos.y + CARD_H + 4}
                          width={8} height={8} rx={1.5} fill="#06b6d4"
                        />
                      </g>
                    );
                  })}
                </svg>
              </motion.div>
            </div>
          </div>

          {/* Right column — sticky info panel */}
          <div className="lg:w-[40%] flex flex-col justify-center">
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
                    className="w-6 h-6 rounded-full flex-shrink-0"
                    style={{
                      background: "linear-gradient(135deg, #a855f7, #7c3aed)",
                    }}
                  />
                  <h3
                    className="text-3xl md:text-4xl lg:text-5xl font-bold text-white"
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
