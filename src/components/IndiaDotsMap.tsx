import { m } from "framer-motion";

interface IndiaDotsMapProps {
  isHovered?: boolean;
}

/* ── India dots (~75) positioned within viewBox 0 0 200 280 ──
   Grouped by region, sorted by distance from center (Nagpur ~100,140)
   for stagger ripple effect. Major cities get r=3, others r=1.8 */

type Dot = { cx: number; cy: number; r: number; label?: string };

const indiaDots: Dot[] = [
  // Central India (Nagpur area — ripple origin)
  { cx: 108, cy: 138, r: 2.5 }, // Nagpur
  { cx: 100, cy: 130, r: 1.8 }, { cx: 115, cy: 145, r: 1.8 },
  { cx: 95, cy: 140, r: 1.8 }, { cx: 105, cy: 150, r: 1.8 },

  // Maharashtra / West
  { cx: 72, cy: 148, r: 3 },   // Mumbai
  { cx: 82, cy: 140, r: 2.5 }, // Pune
  { cx: 68, cy: 155, r: 1.8 }, { cx: 78, cy: 160, r: 1.8 },
  { cx: 88, cy: 150, r: 1.8 }, { cx: 65, cy: 142, r: 1.8 },

  // Delhi / North
  { cx: 100, cy: 68, r: 3 },   // Delhi
  { cx: 92, cy: 60, r: 2 },    // Jaipur
  { cx: 108, cy: 62, r: 1.8 }, { cx: 95, cy: 75, r: 1.8 },
  { cx: 105, cy: 55, r: 1.8 }, { cx: 88, cy: 50, r: 1.8 },
  { cx: 112, cy: 72, r: 1.8 },

  // UP / Bihar
  { cx: 120, cy: 80, r: 2.2 }, // Lucknow
  { cx: 130, cy: 85, r: 2 },   // Varanasi
  { cx: 140, cy: 90, r: 1.8 }, // Patna
  { cx: 125, cy: 75, r: 1.8 }, { cx: 115, cy: 85, r: 1.8 },

  // Kolkata / East
  { cx: 150, cy: 115, r: 3 },  // Kolkata
  { cx: 145, cy: 105, r: 1.8 }, { cx: 155, cy: 120, r: 1.8 },
  { cx: 148, cy: 125, r: 1.8 }, { cx: 140, cy: 110, r: 1.8 },

  // Northeast
  { cx: 162, cy: 95, r: 1.8 }, { cx: 168, cy: 88, r: 1.8 },
  { cx: 172, cy: 92, r: 1.5 }, { cx: 165, cy: 100, r: 1.5 },

  // Hyderabad / Telangana
  { cx: 102, cy: 168, r: 3 },  // Hyderabad
  { cx: 95, cy: 175, r: 1.8 }, { cx: 110, cy: 165, r: 1.8 },
  { cx: 98, cy: 160, r: 1.8 },

  // Karnataka / Bangalore
  { cx: 90, cy: 195, r: 3 },   // Bangalore
  { cx: 82, cy: 188, r: 1.8 }, { cx: 98, cy: 190, r: 1.8 },
  { cx: 85, cy: 200, r: 1.8 }, { cx: 78, cy: 180, r: 1.8 },

  // Chennai / Tamil Nadu
  { cx: 110, cy: 200, r: 3 },  // Chennai
  { cx: 105, cy: 210, r: 2 },  // Madurai area
  { cx: 100, cy: 220, r: 1.8 }, { cx: 115, cy: 195, r: 1.8 },
  { cx: 108, cy: 215, r: 1.8 }, { cx: 95, cy: 225, r: 1.8 },
  { cx: 98, cy: 235, r: 1.8 }, // Kanyakumari area

  // Kerala
  { cx: 80, cy: 215, r: 2.2 }, // Kochi
  { cx: 75, cy: 225, r: 1.8 }, // Trivandrum
  { cx: 78, cy: 208, r: 1.8 },

  // Goa
  { cx: 68, cy: 170, r: 2 },

  // Gujarat
  { cx: 62, cy: 120, r: 2.5 }, // Ahmedabad
  { cx: 55, cy: 115, r: 1.8 }, { cx: 58, cy: 128, r: 1.8 },
  { cx: 50, cy: 108, r: 1.8 }, // Rajkot area
  { cx: 68, cy: 112, r: 1.8 },

  // Rajasthan
  { cx: 78, cy: 82, r: 2 },    // Jodhpur
  { cx: 70, cy: 90, r: 1.8 },  // Udaipur
  { cx: 85, cy: 70, r: 1.8 },

  // Punjab / Haryana
  { cx: 92, cy: 45, r: 2 },    // Chandigarh
  { cx: 85, cy: 38, r: 1.8 },  // Amritsar
  { cx: 98, cy: 50, r: 1.8 },

  // MP
  { cx: 95, cy: 118, r: 2.2 }, // Bhopal
  { cx: 88, cy: 125, r: 1.8 }, // Indore
  { cx: 102, cy: 112, r: 1.8 },

  // Odisha
  { cx: 130, cy: 135, r: 2 },  // Bhubaneswar
  { cx: 125, cy: 142, r: 1.8 }, { cx: 135, cy: 128, r: 1.8 },

  // Jharkhand
  { cx: 138, cy: 100, r: 2 },  // Ranchi
];

// International dots
type InternationalDot = { cx: number; cy: number; label: string };
const internationalDots: InternationalDot[] = [
  { cx: 25, cy: 130, label: "UAE" },
  { cx: 15, cy: 50, label: "UK" },
  { cx: 8, cy: 90, label: "US" },
  { cx: 185, cy: 190, label: "SG" },
  { cx: 190, cy: 145, label: "AU" },
  { cx: 180, cy: 55, label: "CA" },
];

// Center point for ripple (Nagpur)
const CENTER_X = 108;
const CENTER_Y = 140;

const sortedDots = [...indiaDots].sort((a, b) => {
  const distA = Math.hypot(a.cx - CENTER_X, a.cy - CENTER_Y);
  const distB = Math.hypot(b.cx - CENTER_X, b.cy - CENTER_Y);
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

const intlDotVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.8 } },
};

const IndiaDotsMap = ({ isHovered = false }: IndiaDotsMapProps) => {
  return (
    <svg viewBox="0 0 200 280" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      {/* Connecting arcs from India to international dots */}
      {internationalDots.map((dot, i) => {
        const midX = (dot.cx + CENTER_X) / 2;
        const midY = (dot.cy + CENTER_Y) / 2 - 30;
        return (
          <m.path
            key={`arc-${i}`}
            d={`M ${CENTER_X} ${CENTER_Y} Q ${midX} ${midY} ${dot.cx} ${dot.cy}`}
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth={0.4}
            strokeDasharray="2 3"
            initial={{ opacity: 0, pathLength: 0 }}
            animate={{ opacity: 0.15, pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.9 + i * 0.1 }}
          />
        );
      })}

      {/* India dots */}
      <m.g
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        viewport={{ once: true, amount: 0.3 }}
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
              animation: isHovered
                ? `dot-breathe 1.5s ease-in-out ${i * 0.02}s infinite`
                : "none",
            }}
          />
        ))}
      </m.g>

      {/* International dots */}
      {internationalDots.map((dot, i) => (
        <m.g key={`intl-${i}`} variants={intlDotVariants} initial="hidden" animate="visible" viewport={{ once: true }}>
          <circle
            cx={dot.cx}
            cy={dot.cy}
            r={2}
            fill="hsl(var(--muted-foreground))"
            opacity={0.5}
          />
          <text
            x={dot.cx}
            y={dot.cy - 5}
            textAnchor="middle"
            fill="hsl(var(--muted-foreground))"
            fontSize={5}
            opacity={0.6}
            fontFamily="sans-serif"
          >
            {dot.label}
          </text>
          {/* Pulse ring on hover */}
          {isHovered && (
            <m.circle
              cx={dot.cx}
              cy={dot.cy}
              r={2}
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth={0.5}
              initial={{ scale: 1, opacity: 0.4 }}
              animate={{ scale: 3, opacity: 0 }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
            />
          )}
        </m.g>
      ))}
    </svg>
  );
};

export default IndiaDotsMap;
