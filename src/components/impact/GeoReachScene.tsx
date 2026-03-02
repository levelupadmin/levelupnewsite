import { useState } from "react";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import FadeInSection from "@/components/FadeInSection";
import { useScrollReveal } from "@/components/FadeInSection";
import { useIsMobile } from "@/hooks/use-mobile";
import ImpactScene from "./ImpactScene";
import WorldMapSvg from "@/assets/world-map.svg?react";

// Indian cities — approximate positions within the SVG viewBox
const indianCities = [
  { cx: 574, cy: 470, label: "Mumbai", learners: "2,400+" },
  { cx: 580, cy: 445, label: "Delhi", learners: "1,800+" },
  { cx: 586, cy: 490, label: "Bangalore", learners: "1,500+" },
  { cx: 596, cy: 492, label: "Chennai", learners: "1,200+" },
  { cx: 614, cy: 460, label: "Kolkata", learners: "900+" },
  { cx: 588, cy: 478, label: "Hyderabad", learners: "1,100+" },
];

const INDIA_CENTER = { cx: 588, cy: 468 };

const internationalCities = [
  { cx: 536, cy: 468, label: "Dubai", learners: "180+" },
  { cx: 405, cy: 395, label: "London", learners: "85" },
  { cx: 220, cy: 420, label: "New York", learners: "120+" },
  { cx: 640, cy: 510, label: "Singapore", learners: "95" },
  { cx: 720, cy: 610, label: "Sydney", learners: "60" },
  { cx: 195, cy: 380, label: "Toronto", learners: "75" },
  { cx: 115, cy: 435, label: "Los Angeles", learners: "110+" },
];

// Internal India arcs
const indiaArcs = [
  { from: 0, to: 1 },
  { from: 2, to: 3 },
  { from: 1, to: 4 },
  { from: 0, to: 5 },
  { from: 5, to: 2 },
];

const arcPath = (x1: number, y1: number, x2: number, y2: number, curvature = -30) => {
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2 + curvature;
  return `M ${x1} ${y1} Q ${midX} ${midY} ${x2} ${y2}`;
};

const GeoReachScene = () => {
  const { ref, isVisible } = useScrollReveal(0.15);
  const isMobile = useIsMobile();
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);

  const cityFontSize = isMobile ? 10 : 7;

  return (
    <ImpactScene>
      <FadeInSection>
        <div
          ref={ref}
          className="relative flex flex-col items-center justify-center min-h-[280px] md:min-h-[420px] px-4 py-10 md:py-16"
        >
          {/* World map container */}
          <div className="w-full max-w-4xl mx-auto relative">
            {/* Radial glow behind India */}
            <div
              className={`absolute pointer-events-none ${isVisible ? "animate-impact-world-fade" : "opacity-0"}`}
              style={{
                animationDelay: "0.6s",
                width: "30%",
                height: "40%",
                top: "32%",
                left: "58%",
                transform: "translate(-50%, -50%)",
                background:
                  "radial-gradient(ellipse 100% 100% at 50% 50%, hsl(var(--primary) / 0.18), hsl(var(--primary) / 0.06) 50%, transparent 80%)",
                filter: "blur(20px)",
                zIndex: 0,
              }}
            />
            {/* Base SVG world map */}
            <div
              className={`world-map-container relative z-[1] ${isVisible ? "animate-impact-world-fade" : "opacity-0"}`}
              style={{ animationDelay: "0.2s" }}
            >
              <WorldMapSvg className="world-map-svg w-full h-auto" />
            </div>

            {/* Overlay SVG for arcs, city dots, labels */}
            <svg
              viewBox="30.767 241.591 784.077 458.627"
              className="absolute inset-0 w-full h-full pointer-events-none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Glow filter for traveling dots */}
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                {/* Gradient definitions for international arcs */}
                {internationalCities.map((city, i) => (
                  <linearGradient
                    key={`grad-${i}`}
                    id={`arc-grad-${i}`}
                    x1={INDIA_CENTER.cx}
                    y1={INDIA_CENTER.cy}
                    x2={city.cx}
                    y2={city.cy}
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.05" />
                  </linearGradient>
                ))}

                {/* Gradient definitions for internal India arcs */}
                {indiaArcs.map((arc, i) => {
                  const from = indianCities[arc.from];
                  const to = indianCities[arc.to];
                  return (
                    <linearGradient
                      key={`igrad-${i}`}
                      id={`india-arc-grad-${i}`}
                      x1={from.cx}
                      y1={from.cy}
                      x2={to.cx}
                      y2={to.cy}
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
                      <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
                    </linearGradient>
                  );
                })}
              </defs>

              {/* ── Heartbeat pulse at India center ── */}
              {isVisible && (
                <>
                  <circle
                    cx={INDIA_CENTER.cx}
                    cy={INDIA_CENTER.cy}
                    r={3}
                    fill="hsl(var(--primary))"
                    opacity={0.6}
                    className="animate-impact-heartbeat"
                  />
                  <circle
                    cx={INDIA_CENTER.cx}
                    cy={INDIA_CENTER.cy}
                    r={3}
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth={0.6}
                    className="animate-impact-heartbeat-ring"
                  />
                </>
              )}

              {/* ── Internal India arcs with gradient ── */}
              {indiaArcs.map((arc, i) => {
                const from = indianCities[arc.from];
                const to = indianCities[arc.to];
                const d = arcPath(from.cx, from.cy, to.cx, to.cy, -10);
                return (
                  <g key={`ia-${i}`}>
                    <path
                      id={`india-arc-path-${i}`}
                      d={d}
                      fill="none"
                      stroke={`url(#india-arc-grad-${i})`}
                      strokeWidth={0.8}
                      strokeDasharray="3 3"
                      opacity={0}
                      className={isVisible ? "animate-impact-internal-arc" : ""}
                      style={{ animationDelay: `${0.8 + i * 0.12}s` }}
                    />
                    {/* Traveling dot */}
                    {isVisible && (
                      <circle r={1.5} fill="hsl(var(--primary))" filter="url(#glow)" opacity={0.8}>
                        <animateMotion
                          dur={`${2 + i * 0.3}s`}
                          begin={`${1.2 + i * 0.2}s`}
                          repeatCount="indefinite"
                          path={d}
                        />
                      </circle>
                    )}
                  </g>
                );
              })}

              {/* ── International arcs with gradient + traveling dots ── */}
              {internationalCities.map((city, i) => {
                const d = arcPath(INDIA_CENTER.cx, INDIA_CENTER.cy, city.cx, city.cy, -40);
                return (
                  <g key={`xa-${i}`}>
                    <path
                      id={`intl-arc-path-${i}`}
                      d={d}
                      fill="none"
                      stroke={`url(#arc-grad-${i})`}
                      strokeWidth={0.8}
                      strokeDasharray="5 4"
                      opacity={0}
                      className={isVisible ? "animate-impact-arc-draw" : ""}
                      style={{ animationDelay: `${1.2 + i * 0.18}s` }}
                    />
                    {/* Traveling dot along arc */}
                    {isVisible && (
                      <circle r={1.8} fill="hsl(var(--primary))" filter="url(#glow)" opacity={0.7}>
                        <animateMotion
                          dur={`${3 + i * 0.4}s`}
                          begin={`${1.8 + i * 0.25}s`}
                          repeatCount="indefinite"
                          path={d}
                        />
                      </circle>
                    )}
                  </g>
                );
              })}

              {/* ── Indian city markers ── */}
              {indianCities.map((city, i) => (
                <g
                  key={`ic-${i}`}
                  className="pointer-events-auto cursor-pointer"
                  onMouseEnter={() => setHoveredCity(`india-${i}`)}
                  onMouseLeave={() => setHoveredCity(null)}
                  onClick={() =>
                    setHoveredCity((prev) => (prev === `india-${i}` ? null : `india-${i}`))
                  }
                >
                  <circle cx={city.cx} cy={city.cy} r={3} fill="hsl(var(--primary))" opacity={0.95} />
                  {isVisible && (
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
                  )}
                  {!isMobile && (
                    <text
                      x={city.cx}
                      y={city.cy - 6}
                      textAnchor="middle"
                      fill="hsl(var(--primary))"
                      fontSize={cityFontSize}
                      opacity={0}
                      fontFamily="sans-serif"
                      fontWeight={500}
                      className={isVisible ? "animate-impact-label-fade" : ""}
                      style={{ animationDelay: `${1.2 + i * 0.15}s` }}
                    >
                      {city.label}
                    </text>
                  )}
                  {/* Hover tooltip */}
                  {hoveredCity === `india-${i}` && (
                    <g>
                      <rect
                        x={city.cx - 35}
                        y={city.cy - (isMobile ? 14 : 20)}
                        width={70}
                        height={isMobile ? 12 : 14}
                        rx={3}
                        fill="hsl(var(--background))"
                        stroke="hsl(var(--primary))"
                        strokeWidth={0.5}
                        opacity={0.95}
                      />
                      <text
                        x={city.cx}
                        y={city.cy - (isMobile ? 5 : 10)}
                        textAnchor="middle"
                        fill="hsl(var(--primary))"
                        fontSize={isMobile ? 6 : 7}
                        fontFamily="sans-serif"
                        fontWeight={600}
                      >
                        {city.label} · {city.learners} learners
                      </text>
                    </g>
                  )}
                </g>
              ))}

              {/* ── International city markers with counts ── */}
              {internationalCities.map((city, i) => (
                <g
                  key={`xc-${i}`}
                  className="pointer-events-auto cursor-pointer"
                  onMouseEnter={() => setHoveredCity(`intl-${i}`)}
                  onMouseLeave={() => setHoveredCity(null)}
                  onClick={() =>
                    setHoveredCity((prev) => (prev === `intl-${i}` ? null : `intl-${i}`))
                  }
                >
                  <circle
                    cx={city.cx}
                    cy={city.cy}
                    r={2.5}
                    fill="hsl(var(--muted-foreground))"
                    opacity={0.6}
                  />
                  {isVisible && (
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
                  )}
                  {!isMobile ? (
                    <text
                      x={city.cx}
                      y={city.cy - 5}
                      textAnchor="middle"
                      fill="hsl(var(--muted-foreground))"
                      fontSize={cityFontSize}
                      opacity={0}
                      fontFamily="sans-serif"
                      className={isVisible ? "animate-impact-label-fade" : ""}
                      style={{ animationDelay: `${1.8 + i * 0.2}s` }}
                    >
                      {city.label} · {city.learners}
                    </text>
                  ) : (
                    /* Mobile: show dot + count only, bigger */
                    <text
                      x={city.cx}
                      y={city.cy - 5}
                      textAnchor="middle"
                      fill="hsl(var(--muted-foreground))"
                      fontSize={9}
                      opacity={0}
                      fontFamily="sans-serif"
                      fontWeight={500}
                      className={isVisible ? "animate-impact-label-fade" : ""}
                      style={{ animationDelay: `${1.8 + i * 0.2}s` }}
                    >
                      {city.learners}
                    </text>
                  )}
                  {/* Hover tooltip for international */}
                  {hoveredCity === `intl-${i}` && (
                    <g>
                      <rect
                        x={city.cx - 40}
                        y={city.cy - (isMobile ? 14 : 20)}
                        width={80}
                        height={isMobile ? 12 : 14}
                        rx={3}
                        fill="hsl(var(--background))"
                        stroke="hsl(var(--primary))"
                        strokeWidth={0.5}
                        opacity={0.95}
                      />
                      <text
                        x={city.cx}
                        y={city.cy - (isMobile ? 5 : 10)}
                        textAnchor="middle"
                        fill="hsl(var(--foreground))"
                        fontSize={isMobile ? 6 : 7}
                        fontFamily="sans-serif"
                        fontWeight={600}
                      >
                        {city.label} · {city.learners} learners
                      </text>
                    </g>
                  )}
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
};

export default GeoReachScene;
