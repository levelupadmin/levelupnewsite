import { AnimatedCounter } from "@/components/AnimatedCounter";
import FadeInSection from "@/components/FadeInSection";
import ImpactScene from "./ImpactScene";
import WorldMapSvg from "@/assets/world-map.svg?react";

// Indian cities — approximate positions within the SVG viewBox (30.767 241.591 784.077 458.627)
const indianCities = [
  { cx: 574, cy: 470, label: "Mumbai" },
  { cx: 580, cy: 445, label: "Delhi" },
  { cx: 586, cy: 490, label: "Bangalore" },
  { cx: 596, cy: 492, label: "Chennai" },
  { cx: 614, cy: 460, label: "Kolkata" },
  { cx: 588, cy: 478, label: "Hyderabad" },
];

const INDIA_CENTER = { cx: 588, cy: 468 };

const internationalCities = [
  { cx: 536, cy: 468, label: "Dubai" },
  { cx: 405, cy: 395, label: "London" },
  { cx: 220, cy: 420, label: "New York" },
  { cx: 640, cy: 510, label: "Singapore" },
  { cx: 720, cy: 610, label: "Sydney" },
  { cx: 195, cy: 380, label: "Toronto" },
  { cx: 115, cy: 435, label: "Los Angeles" },
];

// Internal India arcs
const indiaArcs = [
  { from: 0, to: 1 }, // Mumbai ↔ Delhi
  { from: 2, to: 3 }, // Bangalore ↔ Chennai
  { from: 1, to: 4 }, // Delhi ↔ Kolkata
  { from: 0, to: 5 }, // Mumbai ↔ Hyderabad
  { from: 5, to: 2 }, // Hyderabad ↔ Bangalore
];

const arcPath = (x1: number, y1: number, x2: number, y2: number, curvature = -30) => {
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2 + curvature;
  return `M ${x1} ${y1} Q ${midX} ${midY} ${x2} ${y2}`;
};

const GeoReachScene = () => (
  <ImpactScene>
    <FadeInSection>
      <div className="relative flex flex-col items-center justify-center min-h-[280px] md:min-h-[420px] px-4 py-10 md:py-16">
        {/* World map container */}
        <div className="w-full max-w-4xl mx-auto relative">
          {/* Radial glow behind India */}
          <div
            className="absolute pointer-events-none animate-impact-world-fade"
            style={{
              animationDelay: "0.6s",
              width: "30%",
              height: "40%",
              top: "32%",
              left: "58%",
              transform: "translate(-50%, -50%)",
              background: "radial-gradient(ellipse 100% 100% at 50% 50%, hsl(var(--primary) / 0.18), hsl(var(--primary) / 0.06) 50%, transparent 80%)",
              filter: "blur(20px)",
              zIndex: 0,
            }}
          />
          {/* Base SVG world map — thin outlines, India filled */}
          <div className="world-map-container animate-impact-world-fade relative z-[1]" style={{ animationDelay: "0.2s" }}>
            <WorldMapSvg className="world-map-svg w-full h-auto" />
          </div>

          {/* Overlay SVG for arcs, city dots, labels */}
          <svg
            viewBox="30.767 241.591 784.077 458.627"
            className="absolute inset-0 w-full h-full pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Internal India arcs */}
            {indiaArcs.map((arc, i) => {
              const from = indianCities[arc.from];
              const to = indianCities[arc.to];
              return (
                <path
                  key={`ia-${i}`}
                  d={arcPath(from.cx, from.cy, to.cx, to.cy, -10)}
                  fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth={0.8}
                  strokeDasharray="3 3"
                  opacity={0}
                  className="animate-impact-internal-arc"
                  style={{ animationDelay: `${0.8 + i * 0.12}s` }}
                />
              );
            })}

            {/* International connection arcs */}
            {internationalCities.map((city, i) => (
              <path
                key={`xa-${i}`}
                d={arcPath(INDIA_CENTER.cx, INDIA_CENTER.cy, city.cx, city.cy, -40)}
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth={0.8}
                strokeDasharray="5 4"
                opacity={0}
                className="animate-impact-arc-draw"
                style={{ animationDelay: `${1.2 + i * 0.18}s` }}
              />
            ))}

            {/* Indian city markers + ping + labels */}
            {indianCities.map((city, i) => (
              <g key={`ic-${i}`}>
                <circle
                  cx={city.cx}
                  cy={city.cy}
                  r={3}
                  fill="hsl(var(--primary))"
                  opacity={0.95}
                />
                <circle
                  cx={city.cx}
                  cy={city.cy}
                  r={3}
                  fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth={0.8}
                  className="animate-impact-city-ping"
                  style={{ animationDelay: `${1.0 + i * 0.2}s` }}
                />
                <text
                  x={city.cx}
                  y={city.cy - 6}
                  textAnchor="middle"
                  fill="hsl(var(--primary))"
                  fontSize={7}
                  opacity={0}
                  fontFamily="sans-serif"
                  fontWeight={500}
                  className="animate-impact-label-fade"
                  style={{ animationDelay: `${1.2 + i * 0.15}s` }}
                >
                  {city.label}
                </text>
              </g>
            ))}

            {/* International city markers + labels */}
            {internationalCities.map((city, i) => (
              <g key={`xc-${i}`}>
                <circle
                  cx={city.cx}
                  cy={city.cy}
                  r={2.5}
                  fill="hsl(var(--muted-foreground))"
                  opacity={0.6}
                />
                <circle
                  cx={city.cx}
                  cy={city.cy}
                  r={2.5}
                  fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth={0.6}
                  className="animate-impact-city-ping"
                  style={{ animationDelay: `${1.8 + i * 0.25}s` }}
                />
                <text
                  x={city.cx}
                  y={city.cy - 5}
                  textAnchor="middle"
                  fill="hsl(var(--muted-foreground))"
                  fontSize={7}
                  opacity={0}
                  fontFamily="sans-serif"
                  className="animate-impact-label-fade"
                  style={{ animationDelay: `${1.8 + i * 0.2}s` }}
                >
                  {city.label}
                </text>
              </g>
            ))}
          </svg>
        </div>

        {/* Stats overlay */}
        <div className="relative z-10 flex items-center gap-8 md:gap-16 mt-6 md:mt-10">
          <div className="text-center">
            <p className="text-3xl sm:text-4xl md:text-6xl font-semibold text-foreground tracking-tight">
              <AnimatedCounter target={821} celebrate />
            </p>
            <p className="text-xs md:text-sm text-muted-foreground mt-1">cities</p>
          </div>
          <div className="w-px h-12 bg-border" />
          <div className="text-center">
            <p className="text-3xl sm:text-4xl md:text-6xl font-semibold text-foreground tracking-tight">
              <AnimatedCounter target={13} suffix="+" celebrate delay={400} />
            </p>
            <p className="text-xs md:text-sm text-muted-foreground mt-1">countries</p>
          </div>
        </div>
      </div>
    </FadeInSection>
  </ImpactScene>
);

export default GeoReachScene;
