import { useState, useMemo } from "react";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import FadeInSection from "@/components/FadeInSection";
import { useScrollReveal } from "@/components/FadeInSection";
import { useIsMobile } from "@/hooks/use-mobile";
import ImpactScene from "./ImpactScene";
import IndiaDotsMap from "@/components/IndiaDotsMap";
import {
  INDIA_CENTER,
  INDIA_OFFSET,
  indianCities,
  indiaArcs,
  internationalCities,
  RANGE_RINGS,
} from "./worldMapData";

const arcPath = (x1: number, y1: number, x2: number, y2: number, curvature = -30) => {
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2 + curvature;
  return `M ${x1} ${y1} Q ${midX} ${midY} ${x2} ${y2}`;
};

// Ambient particles — sparse, slow-drifting
const PARTICLES = Array.from({ length: 24 }, (_, i) => ({
  cx: Math.random() * 900,
  cy: Math.random() * 600,
  r: 0.5 + Math.random() * 1,
  delay: Math.random() * 8,
  dur: 6 + Math.random() * 6,
}));

const GeoReachScene = () => {
  const { ref, isVisible } = useScrollReveal(0.15);
  const isMobile = useIsMobile();
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);

  const viewBox = isMobile ? "100 50 700 500" : "0 0 900 600";

  // Memoize arc paths
  const intlArcPaths = useMemo(
    () =>
      internationalCities.map((city) =>
        arcPath(INDIA_CENTER.cx, INDIA_CENTER.cy, city.cx, city.cy, -50)
      ),
    []
  );

  const indiaArcPaths = useMemo(
    () =>
      indiaArcs.map((arc) => {
        const from = indianCities[arc.from];
        const to = indianCities[arc.to];
        return arcPath(from.cx, from.cy, to.cx, to.cy, -12);
      }),
    []
  );

  return (
    <ImpactScene>
      <FadeInSection>
        <div
          ref={ref}
          className="relative flex flex-col items-center justify-center min-h-[320px] md:min-h-[480px] px-4 py-10 md:py-16"
        >
          {/* Radial glow behind India */}
          <div
            className={`absolute pointer-events-none transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
            style={{
              width: "40%",
              height: "50%",
              top: "25%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background:
                "radial-gradient(ellipse 100% 100% at 50% 50%, hsl(var(--primary) / 0.2), hsl(var(--primary) / 0.06) 50%, transparent 80%)",
              filter: "blur(30px)",
              zIndex: 0,
            }}
          />

          {/* Main SVG composition */}
          <div className="w-full max-w-5xl mx-auto relative z-[1]">
            <svg
              viewBox={viewBox}
              className="w-full h-auto"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="India-centered world map showing LevelUp's global reach"
            >
              <defs>
                {/* Glow filter */}
                <filter id="geo-glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                {/* Comet trail gradient */}
                <radialGradient id="comet-grad">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                </radialGradient>

                {/* Arc gradients */}
                {internationalCities.map((city, i) => (
                  <linearGradient
                    key={`ag-${i}`}
                    id={`arc-grad-${i}`}
                    x1={INDIA_CENTER.cx}
                    y1={INDIA_CENTER.cy}
                    x2={city.cx}
                    y2={city.cy}
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.05" />
                  </linearGradient>
                ))}

                {/* India internal arc gradients */}
                {indiaArcs.map((arc, i) => {
                  const from = indianCities[arc.from];
                  const to = indianCities[arc.to];
                  return (
                    <linearGradient
                      key={`ig-${i}`}
                      id={`india-grad-${i}`}
                      x1={from.cx}
                      y1={from.cy}
                      x2={to.cx}
                      y2={to.cy}
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.5" />
                      <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.08" />
                    </linearGradient>
                  );
                })}
              </defs>

              {/* ── Ambient particles ── */}
              {isVisible &&
                PARTICLES.map((p, i) => (
                  <circle
                    key={`pt-${i}`}
                    cx={p.cx}
                    cy={p.cy}
                    r={p.r}
                    fill="hsl(var(--muted-foreground))"
                    opacity={0}
                    className="animate-ambient-particle"
                    style={{ animationDelay: `${p.delay}s`, animationDuration: `${p.dur}s` }}
                  />
                ))}

              {/* ── Phase 1: Range rings (radar) ── */}
              {!isMobile &&
                isVisible &&
                RANGE_RINGS.map((r, i) => (
                  <circle
                    key={`ring-${i}`}
                    cx={INDIA_CENTER.cx}
                    cy={INDIA_CENTER.cy}
                    r={r}
                    fill="none"
                    stroke="hsl(var(--muted-foreground))"
                    strokeWidth={0.5}
                    strokeDasharray="6 8"
                    opacity={0}
                    className="animate-range-ring-fade"
                    style={{ animationDelay: `${0.3 + i * 0.4}s` }}
                  />
                ))}

              {/* ── Phase 1: Heartbeat pulse at India center ── */}
              {isVisible && (
                <>
                  <circle
                    cx={INDIA_CENTER.cx}
                    cy={INDIA_CENTER.cy}
                    r={4}
                    fill="hsl(var(--primary))"
                    opacity={0.7}
                    className="animate-impact-heartbeat"
                  />
                  <circle
                    cx={INDIA_CENTER.cx}
                    cy={INDIA_CENTER.cy}
                    r={4}
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth={0.8}
                    className="animate-impact-heartbeat-ring"
                  />
                </>
              )}

              {/* ── Phase 2: India dot-map ── */}
              <g transform={`translate(${INDIA_OFFSET.x}, ${INDIA_OFFSET.y})`}>
                <IndiaDotsMap isVisible={isVisible} />
              </g>

              {/* ── Phase 2: Internal India arcs ── */}
              {indiaArcPaths.map((d, i) => (
                <g key={`ia-${i}`}>
                  <path
                    d={d}
                    fill="none"
                    stroke={`url(#india-grad-${i})`}
                    strokeWidth={0.8}
                    strokeDasharray="3 3"
                    opacity={0}
                    className={isVisible ? "animate-impact-internal-arc" : ""}
                    style={{ animationDelay: `${0.8 + i * 0.12}s` }}
                  />
                  {isVisible && (
                    <circle r={1.5} fill="hsl(var(--primary))" filter="url(#geo-glow)" opacity={0.8}>
                      <animateMotion
                        dur={`${2 + i * 0.3}s`}
                        begin={`${1.2 + i * 0.2}s`}
                        repeatCount="indefinite"
                        path={d}
                      />
                    </circle>
                  )}
                </g>
              ))}

              {/* ── Phase 3: International arcs + traveling dots ── */}
              {intlArcPaths.map((d, i) => (
                <g key={`xa-${i}`}>
                  <path
                    d={d}
                    fill="none"
                    stroke={`url(#arc-grad-${i})`}
                    strokeWidth={1}
                    strokeDasharray="5 4"
                    opacity={0}
                    className={isVisible ? "animate-impact-arc-draw" : ""}
                    style={{ animationDelay: `${1.4 + i * 0.2}s` }}
                  />
                  {/* Traveling dot with comet trail */}
                  {isVisible && (
                    <circle
                      r={2.2}
                      fill="hsl(var(--primary))"
                      filter="url(#geo-glow)"
                      opacity={0.8}
                    >
                      <animateMotion
                        dur={`${3.5 + i * 0.4}s`}
                        begin={`${2 + i * 0.25}s`}
                        repeatCount="indefinite"
                        path={d}
                      />
                    </circle>
                  )}
                </g>
              ))}

              {/* ── Indian city markers ── */}
              {indianCities.map((city, i) => {
                const isHovered = hoveredCity === `india-${i}`;
                return (
                  <g
                    key={`ic-${i}`}
                    className="pointer-events-auto cursor-pointer"
                    onMouseEnter={() => setHoveredCity(`india-${i}`)}
                    onMouseLeave={() => setHoveredCity(null)}
                    onClick={() =>
                      setHoveredCity((prev) => (prev === `india-${i}` ? null : `india-${i}`))
                    }
                  >
                    <circle cx={city.cx} cy={city.cy} r={4} fill="hsl(var(--primary))" opacity={0.9} />
                    {isVisible && (
                      <circle
                        cx={city.cx}
                        cy={city.cy}
                        r={4}
                        fill="none"
                        stroke="hsl(var(--primary))"
                        strokeWidth={0.8}
                        className="animate-impact-city-ping"
                        style={{ animationDelay: `${1 + i * 0.2}s` }}
                      />
                    )}
                    {!isMobile && (
                      <text
                        x={city.cx}
                        y={city.cy - 8}
                        textAnchor="middle"
                        fill="hsl(var(--primary))"
                        fontSize={8}
                        opacity={0}
                        fontFamily="sans-serif"
                        fontWeight={500}
                        className={isVisible ? "animate-impact-label-fade" : ""}
                        style={{ animationDelay: `${1.2 + i * 0.15}s` }}
                      >
                        {city.label}
                      </text>
                    )}
                    {/* Tooltip */}
                    {isHovered && (
                      <g>
                        <rect
                          x={city.cx - 50}
                          y={city.cy - 26}
                          width={100}
                          height={18}
                          rx={4}
                          fill="hsl(var(--background))"
                          stroke="hsl(var(--primary))"
                          strokeWidth={0.6}
                          opacity={0.95}
                        />
                        <text
                          x={city.cx}
                          y={city.cy - 13}
                          textAnchor="middle"
                          fill="hsl(var(--primary))"
                          fontSize={8}
                          fontFamily="sans-serif"
                          fontWeight={600}
                        >
                          {city.flag} {city.label} · {city.learners} learners
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}

              {/* ── International city nodes with bounce-in ── */}
              {internationalCities.map((city, i) => {
                const isHovered = hoveredCity === `intl-${i}`;
                return (
                  <g
                    key={`xc-${i}`}
                    className="pointer-events-auto cursor-pointer"
                    onMouseEnter={() => setHoveredCity(`intl-${i}`)}
                    onMouseLeave={() => setHoveredCity(null)}
                    onClick={() =>
                      setHoveredCity((prev) => (prev === `intl-${i}` ? null : `intl-${i}`))
                    }
                  >
                    {/* City node — bounce-in */}
                    <g
                      opacity={0}
                      className={isVisible ? "animate-city-bounce-in" : ""}
                      style={{ animationDelay: `${1.8 + i * 0.22}s`, transformOrigin: `${city.cx}px ${city.cy}px` }}
                    >
                      {/* Outer glow ring */}
                      <circle
                        cx={city.cx}
                        cy={city.cy}
                        r={isHovered ? 10 : 7}
                        fill="none"
                        stroke="hsl(var(--primary))"
                        strokeWidth={0.4}
                        opacity={isHovered ? 0.5 : 0.15}
                        style={{ transition: "all 0.3s ease" }}
                      />
                      {/* Core dot */}
                      <circle
                        cx={city.cx}
                        cy={city.cy}
                        r={3.5}
                        fill={isHovered ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))"}
                        opacity={isHovered ? 1 : 0.7}
                        style={{ transition: "all 0.3s ease" }}
                      />
                      {/* Ping */}
                      {isVisible && (
                        <circle
                          cx={city.cx}
                          cy={city.cy}
                          r={3.5}
                          fill="none"
                          stroke="hsl(var(--primary))"
                          strokeWidth={0.6}
                          className="animate-impact-city-ping"
                          style={{ animationDelay: `${2.2 + i * 0.25}s` }}
                        />
                      )}

                      {/* Label */}
                      {!isMobile ? (
                        <text
                          x={city.cx}
                          y={city.cy - 12}
                          textAnchor="middle"
                          fill={isHovered ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))"}
                          fontSize={9}
                          fontFamily="sans-serif"
                          fontWeight={isHovered ? 600 : 400}
                          style={{ transition: "all 0.3s ease" }}
                        >
                          {city.label} · {city.learners}
                        </text>
                      ) : (
                        <text
                          x={city.cx}
                          y={city.cy - 8}
                          textAnchor="middle"
                          fill="hsl(var(--muted-foreground))"
                          fontSize={8}
                          fontFamily="sans-serif"
                          fontWeight={500}
                        >
                          {city.learners}
                        </text>
                      )}
                    </g>

                    {/* Hover tooltip */}
                    {isHovered && (
                      <g>
                        <rect
                          x={city.cx - 60}
                          y={city.cy + 10}
                          width={120}
                          height={20}
                          rx={4}
                          fill="hsl(var(--background))"
                          stroke="hsl(var(--primary))"
                          strokeWidth={0.6}
                          opacity={0.95}
                        />
                        <text
                          x={city.cx}
                          y={city.cy + 24}
                          textAnchor="middle"
                          fill="hsl(var(--foreground))"
                          fontSize={8}
                          fontFamily="sans-serif"
                          fontWeight={600}
                        >
                          {city.flag} {city.label} · {city.learners} learners
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Stats */}
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
