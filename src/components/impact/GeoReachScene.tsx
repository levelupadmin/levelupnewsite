import { useState, useMemo } from "react";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import FadeInSection from "@/components/FadeInSection";
import { useScrollReveal } from "@/components/FadeInSection";
import { useIsMobile } from "@/hooks/use-mobile";
import ImpactScene from "./ImpactScene";
import worldMapUrl from "@/assets/world-map.svg";
import {
  INDIA_CENTER,
  internationalCities,
} from "./worldMapData";

const arcPath = (x1: number, y1: number, x2: number, y2: number) => {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const dist = Math.sqrt(dx * dx + dy * dy);
  const curvature = -dist * 0.2;
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2 + curvature;
  return `M ${x1} ${y1} Q ${midX} ${midY} ${x2} ${y2}`;
};

// Shifted viewBox to center India more (crop far-west Americas slightly)
const VIEWBOX = "80 241.591 750 458.627";
const VIEWBOX_MOBILE = "200 260 550 420";

const GeoReachScene = () => {
  const { ref, isVisible } = useScrollReveal(0.15);
  const isMobile = useIsMobile();
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);

  const arcPaths = useMemo(
    () =>
      internationalCities.map((city) =>
        arcPath(INDIA_CENTER.cx, INDIA_CENTER.cy, city.cx, city.cy)
      ),
    []
  );

  return (
    <ImpactScene>
      <FadeInSection>
        <div
          ref={ref}
          className="relative flex flex-col items-center justify-center min-h-[320px] md:min-h-[520px] px-4 py-10 md:py-16"
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
              width: "30%",
              height: "40%",
              top: "45%",
              left: "58%",
              transform: "translate(-50%, -50%)",
              background:
                "radial-gradient(ellipse 100% 100% at 50% 50%, hsl(var(--primary) / 0.2), hsl(var(--primary) / 0.05) 60%, transparent 85%)",
              filter: "blur(40px)",
              zIndex: 1,
            }}
          />

          {/* Map + overlay container */}
          <div className="w-full max-w-6xl mx-auto relative z-[2]">
            {/* World map SVG base layer */}
            <div className="relative">
              <svg
                viewBox={isMobile ? VIEWBOX_MOBILE : VIEWBOX}
                className="w-full h-auto"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="World map showing LevelUp's global reach from India"
              >
                <defs>
                  <filter id="geo-glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <filter id="india-glow" x="-100%" y="-100%" width="300%" height="300%">
                    <feGaussianBlur stdDeviation="15" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>

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
                      <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
                    </linearGradient>
                  ))}
                </defs>

                {/* ── World map outlines ── */}
                <image
                  href={worldMapUrl}
                  x="30.767"
                  y="241.591"
                  width="784.077"
                  height="458.627"
                  className={`transition-opacity duration-1000 ${isVisible ? "opacity-40" : "opacity-0"}`}
                  style={{ filter: "brightness(0.6) contrast(1.2)" }}
                />

                {/* ── India center glow ── */}
                {isVisible && (
                  <>
                    <circle
                      cx={INDIA_CENTER.cx}
                      cy={INDIA_CENTER.cy}
                      r={40}
                      fill="hsl(var(--primary))"
                      filter="url(#india-glow)"
                      opacity={0.15}
                    />
                    <circle
                      cx={INDIA_CENTER.cx}
                      cy={INDIA_CENTER.cy}
                      r={5}
                      fill="hsl(var(--primary))"
                      opacity={0.9}
                      className="animate-impact-heartbeat"
                    />
                    <circle
                      cx={INDIA_CENTER.cx}
                      cy={INDIA_CENTER.cy}
                      r={5}
                      fill="none"
                      stroke="hsl(var(--primary))"
                      strokeWidth={1}
                      className="animate-impact-heartbeat-ring"
                    />
                  </>
                )}

                {/* ── Connection arcs + traveling dots ── */}
                {arcPaths.map((d, i) => (
                  <g key={`arc-${i}`}>
                    <path
                      d={d}
                      fill="none"
                      stroke={`url(#arc-grad-${i})`}
                      strokeWidth={1.5}
                      strokeDasharray="6 4"
                      opacity={0}
                      className={isVisible ? "animate-impact-arc-draw" : ""}
                      style={{ animationDelay: `${0.8 + i * 0.2}s` }}
                    />
                    {isVisible && (
                      <circle
                        r={2.5}
                        fill="hsl(var(--primary))"
                        filter="url(#geo-glow)"
                        opacity={0.9}
                      >
                        <animateMotion
                          dur={`${3 + i * 0.3}s`}
                          begin={`${1.5 + i * 0.25}s`}
                          repeatCount="indefinite"
                          path={d}
                        />
                      </circle>
                    )}
                  </g>
                ))}

                {/* ── City markers ── */}
                {internationalCities.map((city, i) => {
                  const isHovered = hoveredCity === `city-${i}`;
                  return (
                    <g
                      key={`city-${i}`}
                      className="pointer-events-auto cursor-pointer"
                      onMouseEnter={() => setHoveredCity(`city-${i}`)}
                      onMouseLeave={() => setHoveredCity(null)}
                      onClick={() =>
                        setHoveredCity((prev) => (prev === `city-${i}` ? null : `city-${i}`))
                      }
                    >
                      <g
                        opacity={0}
                        className={isVisible ? "animate-city-fade-in" : ""}
                        style={{ animationDelay: `${1.2 + i * 0.2}s` }}
                      >
                        {/* Outer ring */}
                        <circle
                          cx={city.cx}
                          cy={city.cy}
                          r={isHovered ? 10 : 7}
                          fill="none"
                          stroke="hsl(var(--primary))"
                          strokeWidth={0.6}
                          opacity={isHovered ? 0.7 : 0.25}
                          style={{ transition: "all 0.3s ease" }}
                        />
                        {/* Core dot */}
                        <circle
                          cx={city.cx}
                          cy={city.cy}
                          r={4}
                          fill="hsl(var(--primary))"
                          opacity={isHovered ? 1 : 0.85}
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
                            style={{ animationDelay: `${1.8 + i * 0.25}s` }}
                          />
                        )}

                        {/* City label */}
                        <text
                          x={city.cx}
                          y={city.cy - 12}
                          textAnchor="middle"
                          fill="hsl(var(--foreground))"
                          fontSize={isMobile ? 8 : 10}
                          fontFamily="sans-serif"
                          fontWeight={isHovered ? 600 : 500}
                          opacity={isHovered ? 1 : 0.85}
                          style={{ transition: "all 0.3s ease" }}
                        >
                          {city.label}
                        </text>
                        {/* Learner count */}
                        <text
                          x={city.cx}
                          y={city.cy + (isMobile ? 14 : 16)}
                          textAnchor="middle"
                          fill="hsl(var(--primary))"
                          fontSize={isMobile ? 7 : 8}
                          fontFamily="sans-serif"
                          fontWeight={600}
                          opacity={0.7}
                        >
                          {city.learners}
                        </text>
                      </g>

                      {/* Tooltip on hover */}
                      {isHovered && (
                        <g>
                          <rect
                            x={city.cx - 60}
                            y={city.cy + 20}
                            width={120}
                            height={22}
                            rx={4}
                            fill="hsl(var(--background))"
                            stroke="hsl(var(--primary))"
                            strokeWidth={0.8}
                            opacity={0.95}
                          />
                          <text
                            x={city.cx}
                            y={city.cy + 35}
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
          </div>

          {/* Stats below map */}
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
