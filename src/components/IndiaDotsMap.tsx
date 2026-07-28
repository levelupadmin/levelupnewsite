import { m } from "framer-motion";

/* ── India dots (~75) positioned within a local coordinate space ──
   Designed to be embedded as a <g> inside a parent SVG.
   Center point (Nagpur) ≈ 108, 140 in local coords.
   Parent should position via transform. */

type Dot = { cx: number; cy: number; r: number };

const indiaDots: Dot[] = [
  // Central India (Nagpur area — ripple origin)
  { cx: 108, cy: 138, r: 2.5 }, { cx: 100, cy: 130, r: 1.8 },
  { cx: 115, cy: 145, r: 1.8 }, { cx: 95, cy: 140, r: 1.8 },
  { cx: 105, cy: 150, r: 1.8 },
  // Maharashtra / West
  { cx: 72, cy: 148, r: 3 }, { cx: 82, cy: 140, r: 2.5 },
  { cx: 68, cy: 155, r: 1.8 }, { cx: 78, cy: 160, r: 1.8 },
  { cx: 88, cy: 150, r: 1.8 }, { cx: 65, cy: 142, r: 1.8 },
  // Delhi / North
  { cx: 100, cy: 68, r: 3 }, { cx: 92, cy: 60, r: 2 },
  { cx: 108, cy: 62, r: 1.8 }, { cx: 95, cy: 75, r: 1.8 },
  { cx: 105, cy: 55, r: 1.8 }, { cx: 88, cy: 50, r: 1.8 },
  { cx: 112, cy: 72, r: 1.8 },
  // UP / Bihar
  { cx: 120, cy: 80, r: 2.2 }, { cx: 130, cy: 85, r: 2 },
  { cx: 140, cy: 90, r: 1.8 }, { cx: 125, cy: 75, r: 1.8 },
  { cx: 115, cy: 85, r: 1.8 },
  // Kolkata / East
  { cx: 150, cy: 115, r: 3 }, { cx: 145, cy: 105, r: 1.8 },
  { cx: 155, cy: 120, r: 1.8 }, { cx: 148, cy: 125, r: 1.8 },
  { cx: 140, cy: 110, r: 1.8 },
  // Northeast
  { cx: 162, cy: 95, r: 1.8 }, { cx: 168, cy: 88, r: 1.8 },
  { cx: 172, cy: 92, r: 1.5 }, { cx: 165, cy: 100, r: 1.5 },
  // Hyderabad / Telangana
  { cx: 102, cy: 168, r: 3 }, { cx: 95, cy: 175, r: 1.8 },
  { cx: 110, cy: 165, r: 1.8 }, { cx: 98, cy: 160, r: 1.8 },
  // Karnataka / Bangalore
  { cx: 90, cy: 195, r: 3 }, { cx: 82, cy: 188, r: 1.8 },
  { cx: 98, cy: 190, r: 1.8 }, { cx: 85, cy: 200, r: 1.8 },
  { cx: 78, cy: 180, r: 1.8 },
  // Chennai / Tamil Nadu
  { cx: 110, cy: 200, r: 3 }, { cx: 105, cy: 210, r: 2 },
  { cx: 100, cy: 220, r: 1.8 }, { cx: 115, cy: 195, r: 1.8 },
  { cx: 108, cy: 215, r: 1.8 }, { cx: 95, cy: 225, r: 1.8 },
  { cx: 98, cy: 235, r: 1.8 },
  // Kerala
  { cx: 80, cy: 215, r: 2.2 }, { cx: 75, cy: 225, r: 1.8 },
  { cx: 78, cy: 208, r: 1.8 },
  // Goa
  { cx: 68, cy: 170, r: 2 },
  // Gujarat
  { cx: 62, cy: 120, r: 2.5 }, { cx: 55, cy: 115, r: 1.8 },
  { cx: 58, cy: 128, r: 1.8 }, { cx: 50, cy: 108, r: 1.8 },
  { cx: 68, cy: 112, r: 1.8 },
  // Rajasthan
  { cx: 78, cy: 82, r: 2 }, { cx: 70, cy: 90, r: 1.8 },
  { cx: 85, cy: 70, r: 1.8 },
  // Punjab / Haryana
  { cx: 92, cy: 45, r: 2 }, { cx: 85, cy: 38, r: 1.8 },
  { cx: 98, cy: 50, r: 1.8 },
  // MP
  { cx: 95, cy: 118, r: 2.2 }, { cx: 88, cy: 125, r: 1.8 },
  { cx: 102, cy: 112, r: 1.8 },
  // Odisha
  { cx: 130, cy: 135, r: 2 }, { cx: 125, cy: 142, r: 1.8 },
  { cx: 135, cy: 128, r: 1.8 },
  // Jharkhand
  { cx: 138, cy: 100, r: 2 },
];

// Center point for ripple (Nagpur)
export const INDIA_LOCAL_CENTER = { x: 108, y: 140 };

const sortedDots = [...indiaDots].sort((a, b) => {
  const distA = Math.hypot(a.cx - INDIA_LOCAL_CENTER.x, a.cy - INDIA_LOCAL_CENTER.y);
  const distB = Math.hypot(b.cx - INDIA_LOCAL_CENTER.x, b.cy - INDIA_LOCAL_CENTER.y);
  return distA - distB;
});

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.015 } },
};

const dotVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const } },
};

interface IndiaDotsMapProps {
  isVisible?: boolean;
}

/**
 * Renders India dot-map as a <g> element for embedding inside a parent SVG.
 * Local coordinate space: 0 0 200 280
 */
const IndiaDotsMap = ({ isVisible = false }: IndiaDotsMapProps) => {
  return (
    <m.g
      variants={containerVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
    >
      {sortedDots.map((dot, i) => (
        <m.circle
          key={`india-${i}`}
          cx={dot.cx}
          cy={dot.cy}
          r={dot.r}
          fill="hsl(var(--primary))"
          variants={dotVariants}
          style={{
            opacity: dot.r >= 2.5 ? 1 : 0.6,
          }}
          className={isVisible ? "animate-india-dot-breathe" : ""}
        />
      ))}
    </m.g>
  );
};

export default IndiaDotsMap;
