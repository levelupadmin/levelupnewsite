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

/* Card positions in the horizontal canvas (zig-zag: high, low, high, low) */
const cardPositions = [
  { x: 200, y: 30 },   // LEARN — top
  { x: 520, y: 180 },  // PRACTICE — bottom
  { x: 820, y: 30 },   // APPLY — top
  { x: 1140, y: 180 }, // COLLABORATE — bottom  (was overlapping, push right)
];

const CANVAS_W = 1500;
const CANVAS_H = 360;
const CARD_W = 180;
const CARD_H = 140;

const NodeCard = ({
  step,
  pos,
  index,
  isActive,
  onClick,
}: {
  step: (typeof steps)[0];
  pos: { x: number; y: number };
  index: number;
  isActive: boolean;
  onClick: () => void;
}) => (
  <motion.g
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.15 }}
    style={{ cursor: "pointer" }}
    onClick={onClick}
  >
    {/* Label above */}
    <text
      x={pos.x + CARD_W / 2}
      y={pos.y - 10}
      textAnchor="middle"
      fill="rgba(255,255,255,0.5)"
      fontSize="10"
      fontWeight="500"
      letterSpacing="1.5"
      fontFamily="'Funnel Display', sans-serif"
    >
      {step.label}
    </text>

    {/* Card body */}
    <rect
      x={pos.x}
      y={pos.y}
      width={CARD_W}
      height={CARD_H}
      rx={10}
      fill={isActive ? "#222" : "#1a1a1a"}
      stroke={isActive ? "rgba(168,85,247,0.5)" : "rgba(255,255,255,0.1)"}
      strokeWidth={isActive ? 1.5 : 1}
    />

    {/* Image area */}
    <clipPath id={`clip-${index}`}>
      <rect x={pos.x + 8} y={pos.y + 8} width={CARD_W - 16} height={80} rx={6} />
    </clipPath>
    <image
      href={step.image}
      x={pos.x + 8}
      y={pos.y + 8}
      width={CARD_W - 16}
      height={80}
      clipPath={`url(#clip-${index})`}
      preserveAspectRatio="xMidYMid slice"
      style={{ filter: "saturate(0.3) brightness(0.7)" }}
    />

    {/* Progress bar */}
    <rect x={pos.x + 8} y={pos.y + 92} width={CARD_W - 16} height={2} rx={1} fill="#333" />
    <rect x={pos.x + 8} y={pos.y + 92} width={(CARD_W - 16) * 0.6} height={2} rx={1} fill="#6366f1" />

    {/* Play icon — left side */}
    <polygon
      points={`${pos.x - 16},${pos.y + CARD_H / 2 - 5} ${pos.x - 16},${pos.y + CARD_H / 2 + 5} ${pos.x - 8},${pos.y + CARD_H / 2}`}
      fill="#84cc16"
    />

    {/* Step number */}
    <text
      x={pos.x + 12}
      y={pos.y + CARD_H - 12}
      fill="rgba(255,255,255,0.3)"
      fontSize="14"
      fontWeight="700"
      fontFamily="'Funnel Display', sans-serif"
    >
      {step.step}
    </text>

    {/* Play icon bottom-left */}
    <polygon
      points={`${pos.x + 8},${pos.y + CARD_H - 18} ${pos.x + 8},${pos.y + CARD_H - 10} ${pos.x + 14},${pos.y + CARD_H - 14}`}
      fill="#06b6d4"
    />

    {/* Green connector handle — right */}
    <rect
      x={pos.x + CARD_W + 4}
      y={pos.y + CARD_H / 2 - 5}
      width={8}
      height={8}
      rx={1.5}
      fill="#84cc16"
    />

    {/* Cyan connector handle — bottom-right */}
    <rect
      x={pos.x + CARD_W - 4}
      y={pos.y + CARD_H + 4}
      width={8}
      height={8}
      rx={1.5}
      fill="#06b6d4"
    />
  </motion.g>
);

const VEFramework = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(SVGGElement | null)[]>([]);

  /* Track scroll position to determine active card */
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handleScroll = () => {
      const scrollLeft = el.scrollLeft;
      const containerW = el.clientWidth;
      // Find which card is most centred
      let best = 0;
      let bestDist = Infinity;
      cardPositions.forEach((pos, i) => {
        const cardCenter = pos.x + CARD_W / 2;
        const viewCenter = scrollLeft + containerW / 2;
        const dist = Math.abs(cardCenter - viewCenter);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      });
      setActiveIndex(best);
    };
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToCard = (i: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const target = cardPositions[i].x + CARD_W / 2 - el.clientWidth / 2;
    el.scrollTo({ left: target, behavior: "smooth" });
  };

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
        {/* Left column – horizontally scrollable node graph */}
        <div className="lg:w-[60%] relative">
          <div
            ref={scrollRef}
            className="rounded-2xl overflow-x-auto overflow-y-hidden scrollbar-hide"
            style={{
              background: "#111111",
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          >
            <svg
              width={CANVAS_W}
              height={CANVAS_H}
              viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`}
              className="block"
            >
              {/* Green input node on far left */}
              <rect x={40} y={CANVAS_H / 2 - 16} width={28} height={32} rx={6} fill="#222" stroke="#333" />
              <circle cx={54} cy={CANVAS_H / 2} r={7} fill="#84cc16" />

              {/* Line from input to first card */}
              <line
                x1={68}
                y1={CANVAS_H / 2}
                x2={cardPositions[0].x - 16}
                y2={cardPositions[0].y + CARD_H / 2}
                stroke="#444"
                strokeWidth={1.2}
              />
              {/* Arrow at end */}
              <polygon
                points={`${cardPositions[0].x - 20},${cardPositions[0].y + CARD_H / 2 - 4} ${cardPositions[0].x - 20},${cardPositions[0].y + CARD_H / 2 + 4} ${cardPositions[0].x - 14},${cardPositions[0].y + CARD_H / 2}`}
                fill="#84cc16"
              />

              {/* Diagonal connector lines between cards */}
              {[0, 1, 2].map((i) => {
                const from = cardPositions[i];
                const to = cardPositions[i + 1];
                const x1 = from.x + CARD_W + 12;
                const y1 = from.y + CARD_H / 2;
                const x2 = to.x - 16;
                const y2 = to.y + CARD_H / 2;
                return (
                  <g key={i}>
                    <line
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="#444"
                      strokeWidth={1.2}
                    />
                    {/* Arrow */}
                    <polygon
                      points={`${x2 - 4},${y2 - 4} ${x2 - 4},${y2 + 4} ${x2 + 2},${y2}`}
                      fill="#84cc16"
                    />
                  </g>
                );
              })}

              {/* Node cards */}
              {steps.map((step, i) => (
                <NodeCard
                  key={step.step}
                  step={step}
                  pos={cardPositions[i]}
                  index={i}
                  isActive={i === activeIndex}
                  onClick={() => scrollToCard(i)}
                />
              ))}
            </svg>
          </div>

          {/* Scroll hint */}
          <p className="text-white/20 text-xs text-center mt-3 lg:hidden">
            ← Scroll to explore →
          </p>
        </div>

        {/* Right column – sticky panel */}
        <div className="lg:w-[40%]">
          <div className="lg:sticky lg:top-32">
            {/* Step indicators */}
            <div className="flex gap-2 mb-8">
              {steps.map((_, i) => (
                <div
                  key={i}
                  className="h-1 rounded-full transition-all duration-500 cursor-pointer"
                  style={{
                    width: i === activeIndex ? 32 : 20,
                    background: i === activeIndex ? "#fff" : "#333",
                  }}
                  onClick={() => scrollToCard(i)}
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

                <p className="text-[#9CA3AF] text-base md:text-lg leading-relaxed">
                  {steps[activeIndex].body}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Hide scrollbar */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
};

export default VEFramework;
