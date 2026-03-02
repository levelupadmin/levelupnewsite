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

const GeoReachScene = () => {
  const { ref, isVisible } = useScrollReveal(0.15);
  const isMobile = useIsMobile();
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);

  const viewBox = isMobile ? "50 20 800 560" : "0 0 900 600";

  // Memoize arc paths
  const intlArcPaths = useMemo(
    () =>
      internationalCities.map((city) =>
        arcPath(INDIA_CENTER.cx, INDIA_CENTER.cy, city.cx, city.cy, -40)
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
          {/* Section heading */}
          <div className="text-center mb-6 md:mb-10 relative z-10">
            <p className="text-[10px] md:text-xs tracking-[0.25em] uppercase text-muted-foreground font-medium mb-3">
              Global Reach
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground tracking-tight">
              Spreading from India to the World
            </h2>
          </div>

          {/* Radial glow behind India */}
          <div
            className={`absolute pointer-events-none transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
            style={{
              width: "45%",
              height: "55%",
              top: "35%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background:
                "radial-gradient(ellipse 100% 100% at 50% 50%, hsl(var(--primary) / 0.25), hsl(var(--primary) / 0.08) 50%, transparent 80%)",
              filter: "blur(40px)",
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

                {/* Stronger glow for India center */}
                <filter id="india-glow" x="-100%" y="-100%" width="300%" height="300%">
                  <feGaussianBlur stdDeviation="12" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                {/* Arc gradients — brighter end opacity */}
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
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.25" />
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
                      <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
                      <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.15" />
                    </linearGradient>
                  );
                })}
              </defs>

              {/* ── Range rings ── */}
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

              {/* ── Heartbeat pulse at India center ── */}
              {isVisible && (
                <>
                  {/* Large ambient glow behind India */}
                  <circle
                    cx={INDIA_CENTER.cx}
                    cy={INDIA_CENTER.cy}
                    r={60}
                    fill="hsl(var(--primary))"
                    filter="url(#india-glow)"
                    opacity={0.12}
                  />
                  <circle
                    cx={INDIA_CENTER.cx}
                    cy={INDIA_CENTER.cy}
                    r={4}
                    fill="hsl(var(--primary))"
                    opacity={0.8}
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

              {/* ── India dot-map (scaled up 1.4x) ── */}
              <g transform={`translate(${INDIA_CENTER.cx - 108 * 1.4}, ${INDIA_CENTER.cy - 140 * 1.4}) scale(1.4)`}>
                <IndiaDotsMap isVisible={isVisible} />
              </g>

              {/* ── Internal India arcs ── */}
              {indiaArcPaths.map((d, i) => (
                <g key={`ia-${i}`}>
                  <path
                    d={d}
                    fill="none"
                    stroke={`url(#india-grad-${i})`}
                    strokeWidth={1}
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

              {/* ── International arcs + traveling dots ── */}
              {intlArcPaths.map((d, i) => (
                <g key={`xa-${i}`}>
                  <path
                    d={d}
                    fill="none"
                    stroke={`url(#arc-grad-${i})`}
                    strokeWidth={1.2}
                    strokeDasharray="5 4"
                    opacity={0}
                    className={isVisible ? "animate-impact-arc-draw" : ""}
                    style={{ animationDelay: `${1.4 + i * 0.2}s` }}
                  />
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
                    <circle cx={city.cx} cy={city.cy} r={4.5} fill="hsl(var(--primary))" opacity={0.9} />
                    {isVisible && (
                      <circle
                        cx={city.cx}
                        cy={city.cy}
                        r={4.5}
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
                        y={city.cy - 10}
                        textAnchor="middle"
                        fill="hsl(var(--foreground))"
                        fontSize={10}
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
                          x={city.cx - 55}
                          y={city.cy - 30}
                          width={110}
                          height={22}
                          rx={5}
                          fill="hsl(var(--background))"
                          stroke="hsl(var(--primary))"
                          strokeWidth={0.8}
                          opacity={0.95}
                        />
                        <text
                          x={city.cx}
                          y={city.cy - 15}
                          textAnchor="middle"
                          fill="hsl(var(--foreground))"
                          fontSize={9}
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

              {/* ── International city nodes — opacity fade only ── */}
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
                    <g
                      opacity={0}
                      className={isVisible ? "animate-city-fade-in" : ""}
                      style={{ animationDelay: `${1.8 + i * 0.22}s` }}
                    >
                      {/* Outer glow ring */}
                      <circle
                        cx={city.cx}
                        cy={city.cy}
                        r={isHovered ? 12 : 8}
                        fill="none"
                        stroke="hsl(var(--primary))"
                        strokeWidth={0.5}
                        opacity={isHovered ? 0.6 : 0.2}
                        style={{ transition: "all 0.3s ease" }}
                      />
                      {/* Core dot */}
                      <circle
                        cx={city.cx}
                        cy={city.cy}
                        r={4}
                        fill={isHovered ? "hsl(var(--primary))" : "hsl(var(--primary))"}
                        opacity={isHovered ? 1 : 0.8}
                        style={{ transition: "all 0.3s ease" }}
                      />
                      {/* Ping */}
                      {isVisible && (
                        <circle
                          cx={city.cx}
                          cy={city.cy}
                          r={4}
                          fill="none"
                          stroke="hsl(var(--primary))"
                          strokeWidth={0.6}
                          className="animate-impact-city-ping"
                          style={{ animationDelay: `${2.2 + i * 0.25}s` }}
                        />
                      )}

                      {/* Label — bigger, brighter */}
                      <text
                        x={city.cx}
                        y={city.cy - 14}
                        textAnchor="middle"
                        fill={isHovered ? "hsl(var(--foreground))" : "hsl(var(--foreground))"}
                        fontSize={isMobile ? 9 : 11}
                        fontFamily="sans-serif"
                        fontWeight={isHovered ? 600 : 500}
                        opacity={isHovered ? 1 : 0.85}
                        style={{ transition: "all 0.3s ease" }}
                      >
                        {city.label}
                      </text>
                      {/* Learner count below label */}
                      <text
                        x={city.cx}
                        y={city.cy - 3}
                        textAnchor="middle"
                        fill="hsl(var(--primary))"
                        fontSize={isMobile ? 8 : 9}
                        fontFamily="sans-serif"
                        fontWeight={600}
                        opacity={0.7}
                      >
                        {city.learners}
                      </text>
                    </g>

                    {/* Hover tooltip */}
                    {isHovered && (
                      <g>
                        <rect
                          x={city.cx - 65}
                          y={city.cy + 12}
                          width={130}
                          height={24}
                          rx={5}
                          fill="hsl(var(--background))"
                          stroke="hsl(var(--primary))"
                          strokeWidth={0.8}
                          opacity={0.95}
                        />
                        <text
                          x={city.cx}
                          y={city.cy + 28}
                          textAnchor="middle"
                          fill="hsl(var(--foreground))"
                          fontSize={9}
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
