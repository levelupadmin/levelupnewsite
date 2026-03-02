import { AnimatedCounter } from "@/components/AnimatedCounter";
import FadeInSection from "@/components/FadeInSection";
import ImpactScene from "./ImpactScene";
import {
  indianCities,
  internationalCities,
  indiaArcs,
  indiaDots,
  worldDots,
  INDIA_CENTER,
} from "./worldMapData";

// Sort India dots by distance from center for ripple effect
const sortedIndiaDots = [...indiaDots].sort((a, b) => {
  const distA = Math.hypot(a.cx - INDIA_CENTER.cx, a.cy - INDIA_CENTER.cy);
  const distB = Math.hypot(b.cx - INDIA_CENTER.cx, b.cy - INDIA_CENTER.cy);
  return distA - distB;
});

// Build arc path helper
const arcPath = (
  x1: number, y1: number,
  x2: number, y2: number,
  curvature = -40
) => {
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2 + curvature;
  return `M ${x1} ${y1} Q ${midX} ${midY} ${x2} ${y2}`;
};

const GeoReachScene = () => (
  <ImpactScene>
    <FadeInSection>
      <div className="relative flex flex-col items-center justify-center min-h-[280px] md:min-h-[420px] px-4 py-10 md:py-16">
        {/* World map SVG */}
        <div className="w-full max-w-4xl mx-auto">
          <svg
            viewBox="0 0 800 400"
            className="w-full h-auto"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* World continent dots — sparse, low opacity */}
            {worldDots.map((dot, i) => (
              <circle
                key={`w-${i}`}
                cx={dot.cx}
                cy={dot.cy}
                r={1.2}
                fill="hsl(var(--muted-foreground))"
                opacity={0}
                className="animate-impact-world-fade"
                style={{ animationDelay: `${0.8 + i * 0.004}s` }}
              />
            ))}

            {/* Internal India arcs (city-to-city) */}
            {indiaArcs.map((arc, i) => {
              const from = indianCities[arc.from];
              const to = indianCities[arc.to];
              return (
                <path
                  key={`ia-${i}`}
                  d={arcPath(from.cx, from.cy, to.cx, to.cy, -15)}
                  fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth={0.8}
                  strokeDasharray="4 4"
                  opacity={0}
                  className="animate-impact-internal-arc"
                  style={{ animationDelay: `${0.6 + i * 0.12}s` }}
                />
              );
            })}

            {/* International connection arcs */}
            {internationalCities.map((city, i) => (
              <path
                key={`xa-${i}`}
                d={arcPath(INDIA_CENTER.cx, INDIA_CENTER.cy, city.cx, city.cy, -50)}
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth={0.6}
                strokeDasharray="6 5"
                opacity={0}
                className="animate-impact-arc-draw"
                style={{ animationDelay: `${1.0 + i * 0.18}s` }}
              />
            ))}

            {/* Dense India dots — ripple from center */}
            {sortedIndiaDots.map((dot, i) => (
              <circle
                key={`id-${i}`}
                cx={dot.cx}
                cy={dot.cy}
                r={1.8}
                fill="hsl(var(--primary))"
                className="animate-impact-dot-ripple"
                style={{
                  animationDelay: `${i * 0.012}s`,
                  ["--dot-opacity" as string]: 0.7,
                }}
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
                  style={{ animationDelay: `${0.8 + i * 0.2}s` }}
                />
                <text
                  x={city.cx}
                  y={city.cy - 7}
                  textAnchor="middle"
                  fill="hsl(var(--primary))"
                  fontSize={7}
                  opacity={0}
                  fontFamily="sans-serif"
                  fontWeight={500}
                  className="animate-impact-label-fade"
                  style={{ animationDelay: `${1.0 + i * 0.15}s` }}
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
                  strokeWidth={0.5}
                  className="animate-impact-city-ping"
                  style={{ animationDelay: `${1.5 + i * 0.25}s` }}
                />
                <text
                  x={city.cx}
                  y={city.cy - 6}
                  textAnchor="middle"
                  fill="hsl(var(--muted-foreground))"
                  fontSize={7}
                  opacity={0}
                  fontFamily="sans-serif"
                  className="animate-impact-label-fade"
                  style={{ animationDelay: `${1.5 + i * 0.2}s` }}
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
