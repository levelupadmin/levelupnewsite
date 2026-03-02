import { useState, useEffect, useMemo, useCallback } from "react";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import FadeInSection from "@/components/FadeInSection";
import { useScrollReveal } from "@/components/FadeInSection";
import { useIsMobile } from "@/hooks/use-mobile";
import ImpactScene from "./ImpactScene";
import IndiaDotsMap from "@/components/IndiaDotsMap";
import worldMapUrl from "@/assets/world-map.svg";
import { INDIA_CENTER, internationalCities } from "./worldMapData";
import { indianCities, WAVE_DELAY_MS, MAX_WAVE } from "./indiaMapData";

// ── Arc helper ──
const arcPath = (x1: number, y1: number, x2: number, y2: number) => {
  const dist = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2 + -dist * 0.2;
  return `M ${x1} ${y1} Q ${midX} ${midY} ${x2} ${y2}`;
};

// ── ViewBox constants ──
const VB = { x: 80, y: 241.591, w: 750, h: 458.627 };
const VIEWBOX = `${VB.x} ${VB.y} ${VB.w} ${VB.h}`;
const VIEWBOX_MOBILE = "200 260 550 420";

// ── India position on the world map SVG ──
const INDIA_WORLD = { x: 565, y: 455 };
// India local-space center (from IndiaDotsMap)
const INDIA_LOCAL = { x: 108, y: 140 };
// Scale of India dots inside world map (maps ~200 local → ~60 world units)
const INDIA_SCALE_WORLD = 0.3;

// ── Phase timing ──
const PHASE_2_DELAY = 5500;
const PHASE_3_DELAY = 7500;

// ── Zoom calculations ──
// Phase 1: India zoomed in, centered in viewBox
const ZOOM_SCALE = 2.8;
const VB_CENTER = { x: VB.x + VB.w / 2, y: VB.y + VB.h / 2 };
// Phase 1 translate: center India local center at viewBox center, scaled up
const P1_TX = VB_CENTER.x - INDIA_LOCAL.x * INDIA_SCALE_WORLD * ZOOM_SCALE;
const P1_TY = VB_CENTER.y - INDIA_LOCAL.y * INDIA_SCALE_WORLD * ZOOM_SCALE;
// Phase 3 translate: India at its world position
const P3_TX = INDIA_WORLD.x - INDIA_LOCAL.x * INDIA_SCALE_WORLD;
const P3_TY = INDIA_WORLD.y - INDIA_LOCAL.y * INDIA_SCALE_WORLD;

const GeoReachScene = () => {
  const { ref, isVisible } = useScrollReveal(0.15);
  const isMobile = useIsMobile();
  const [phase, setPhase] = useState(0);
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);

  // Phase progression
  useEffect(() => {
    if (!isVisible) return;
    setPhase(1);
    const t2 = setTimeout(() => setPhase(2), PHASE_2_DELAY);
    const t3 = setTimeout(() => setPhase(3), PHASE_3_DELAY);
    return () => { clearTimeout(t2); clearTimeout(t3); };
  }, [isVisible]);

  const arcPaths = useMemo(
    () => internationalCities.map((c) => arcPath(INDIA_CENTER.cx, INDIA_CENTER.cy, c.cx, c.cy)),
    []
  );

  // India <g> transform
  const indiaTransform = useMemo(() => {
    if (phase <= 1) {
      return `translate(${P1_TX}, ${P1_TY}) scale(${INDIA_SCALE_WORLD * ZOOM_SCALE})`;
    }
    return `translate(${P3_TX}, ${P3_TY}) scale(${INDIA_SCALE_WORLD})`;
  }, [phase]);

  // Heading text
  const heading = phase < 2 ? "Lighting Up India" : "Spreading from India to the World";
  const subheading = phase < 2
    ? "821 cities across 28 states and growing"
    : "From every corner of India to 13+ countries worldwide";

  return (
    <ImpactScene>
      <div
        ref={ref}
        className="relative flex flex-col items-center justify-center min-h-[420px] md:min-h-[600px] px-4 py-10 md:py-16"
      >
        {/* Section heading */}
        <div className="text-center mb-6 md:mb-10 relative z-10">
          <p className="text-[10px] md:text-xs tracking-[0.25em] uppercase text-muted-foreground font-medium mb-3">
            Global Reach
          </p>
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground tracking-tight transition-all duration-700"
            key={phase < 2 ? "india" : "world"}
          >
            {heading}
          </h2>
          <p className="text-sm md:text-base text-muted-foreground mt-2 max-w-lg mx-auto transition-opacity duration-700">
            {subheading}
          </p>
        </div>

        {/* Radial glow */}
        <div
          className={`absolute pointer-events-none transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
          style={{
            width: phase < 2 ? "50%" : "30%",
            height: phase < 2 ? "60%" : "40%",
            top: "45%",
            left: phase < 2 ? "50%" : "58%",
            transform: "translate(-50%, -50%)",
            background: "radial-gradient(ellipse 100% 100% at 50% 50%, hsl(var(--primary) / 0.25), hsl(var(--primary) / 0.05) 60%, transparent 85%)",
            filter: "blur(40px)",
            zIndex: 1,
            transition: "all 1.5s ease-in-out",
          }}
        />

        {/* Map container */}
        <div className="w-full max-w-6xl mx-auto relative z-[2]">
          <svg
            viewBox={isMobile ? VIEWBOX_MOBILE : VIEWBOX}
            className="w-full h-auto"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Animated map showing LevelUp's reach across India and the world"
          >
            <defs>
              <filter id="geo-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <filter id="india-glow" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="15" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <filter id="city-label-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="1.5" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              {/* Arc gradients */}
              {internationalCities.map((city, i) => (
                <linearGradient
                  key={`ag-${i}`}
                  id={`arc-grad-${i}`}
                  x1={INDIA_CENTER.cx} y1={INDIA_CENTER.cy}
                  x2={city.cx} y2={city.cy}
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
                </linearGradient>
              ))}
            </defs>

            {/* ── World map (fades in during phase 2) ── */}
            <image
              href={worldMapUrl}
              x="30.767" y="241.591" width="784.077" height="458.627"
              className="transition-opacity duration-[1500ms] ease-in-out"
              style={{
                opacity: phase >= 2 ? 0.4 : 0,
                filter: "brightness(0.6) contrast(1.2)",
              }}
            />

            {/* ── India <g> with zoom transition ── */}
            <g
              style={{
                transform: indiaTransform,
                transition: phase >= 2
                  ? "transform 2s cubic-bezier(0.16, 1, 0.3, 1)"
                  : "none",
                transformOrigin: "0 0",
              }}
            >
              {/* India dot map */}
              <IndiaDotsMap isVisible={phase >= 1} />

              {/* India city markers — appear wave by wave */}
              {phase >= 1 && indianCities.map((city, i) => {
                const delay = city.wave * WAVE_DELAY_MS;
                return (
                  <g
                    key={`india-city-${i}`}
                    className="animate-india-city-appear"
                    style={{ animationDelay: `${delay}ms` }}
                  >
                    {/* City dot */}
                    <circle
                      cx={city.cx} cy={city.cy} r={3}
                      fill="hsl(var(--primary))"
                      opacity={0.9}
                    />
                    {/* Pulse ring */}
                    <circle
                      cx={city.cx} cy={city.cy} r={3}
                      fill="none"
                      stroke="hsl(var(--primary))"
                      strokeWidth={0.5}
                      className="animate-impact-city-ping"
                      style={{ animationDelay: `${delay + 200}ms` }}
                    />
                    {/* Label — sized for zoomed-in view */}
                    <text
                      x={city.cx + 5} y={city.cy - 5}
                      fill="hsl(var(--foreground))"
                      fontSize={4}
                      fontFamily="sans-serif"
                      fontWeight={600}
                      opacity={0.9}
                      filter="url(#city-label-glow)"
                    >
                      {city.label}
                    </text>
                    {/* Learner count */}
                    <text
                      x={city.cx + 5} y={city.cy + 1}
                      fill="hsl(var(--primary))"
                      fontSize={3}
                      fontFamily="sans-serif"
                      fontWeight={500}
                      opacity={0.7}
                    >
                      {city.learners}
                    </text>
                  </g>
                );
              })}
            </g>

            {/* ── India center glow (always visible once started) ── */}
            {phase >= 1 && (
              <>
                <circle
                  cx={INDIA_WORLD.x} cy={INDIA_WORLD.y} r={40}
                  fill="hsl(var(--primary))" filter="url(#india-glow)"
                  className="transition-opacity duration-1000"
                  style={{ opacity: phase >= 2 ? 0.15 : 0 }}
                />
                <circle
                  cx={INDIA_WORLD.x} cy={INDIA_WORLD.y} r={5}
                  fill="hsl(var(--primary))"
                  className="animate-impact-heartbeat transition-opacity duration-1000"
                  style={{ opacity: phase >= 2 ? 0.9 : 0 }}
                />
              </>
            )}

            {/* ── Connection arcs + traveling dots (phase 3) ── */}
            {phase >= 3 && arcPaths.map((d, i) => (
              <g key={`arc-${i}`}>
                <path
                  d={d} fill="none"
                  stroke={`url(#arc-grad-${i})`}
                  strokeWidth={1.5}
                  strokeDasharray="6 4"
                  className="animate-impact-arc-draw"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
                <circle r={2.5} fill="hsl(var(--primary))" filter="url(#geo-glow)" opacity={0.9}>
                  <animateMotion
                    dur={`${3 + i * 0.3}s`}
                    begin={`${0.5 + i * 0.25}s`}
                    repeatCount="indefinite"
                    path={d}
                  />
                </circle>
              </g>
            ))}

            {/* ── International city markers (phase 3) ── */}
            {phase >= 3 && internationalCities.map((city, i) => {
              const isHovered = hoveredCity === `city-${i}`;
              return (
                <g
                  key={`intl-${i}`}
                  className="pointer-events-auto cursor-pointer"
                  onMouseEnter={() => setHoveredCity(`city-${i}`)}
                  onMouseLeave={() => setHoveredCity(null)}
                >
                  <g className="animate-city-fade-in" style={{ animationDelay: `${0.3 + i * 0.15}s` }}>
                    <circle
                      cx={city.cx} cy={city.cy}
                      r={isHovered ? 10 : 7}
                      fill="none" stroke="hsl(var(--primary))"
                      strokeWidth={0.6}
                      opacity={isHovered ? 0.7 : 0.25}
                      style={{ transition: "all 0.3s ease" }}
                    />
                    <circle
                      cx={city.cx} cy={city.cy} r={4}
                      fill="hsl(var(--primary))"
                      opacity={isHovered ? 1 : 0.85}
                      style={{ transition: "all 0.3s ease" }}
                    />
                    <circle
                      cx={city.cx} cy={city.cy} r={4}
                      fill="none" stroke="hsl(var(--primary))" strokeWidth={0.6}
                      className="animate-impact-city-ping"
                      style={{ animationDelay: `${0.5 + i * 0.2}s` }}
                    />
                    <text
                      x={city.cx} y={city.cy - 12}
                      textAnchor="middle" fill="hsl(var(--foreground))"
                      fontSize={isMobile ? 8 : 10}
                      fontFamily="sans-serif"
                      fontWeight={isHovered ? 600 : 500}
                      opacity={isHovered ? 1 : 0.85}
                    >
                      {city.label}
                    </text>
                    <text
                      x={city.cx} y={city.cy + (isMobile ? 14 : 16)}
                      textAnchor="middle" fill="hsl(var(--primary))"
                      fontSize={isMobile ? 7 : 8}
                      fontFamily="sans-serif" fontWeight={600} opacity={0.7}
                    >
                      {city.learners}
                    </text>
                  </g>

                  {/* Tooltip */}
                  {isHovered && (
                    <g>
                      <rect
                        x={city.cx - 60} y={city.cy + 20}
                        width={120} height={22} rx={4}
                        fill="hsl(var(--background))"
                        stroke="hsl(var(--primary))" strokeWidth={0.8} opacity={0.95}
                      />
                      <text
                        x={city.cx} y={city.cy + 35}
                        textAnchor="middle" fill="hsl(var(--foreground))"
                        fontSize={8} fontFamily="sans-serif" fontWeight={600}
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

        {/* Stats below map — transitions between India and Global */}
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
              {phase < 2 ? (
                <AnimatedCounter target={28} celebrate delay={400} />
              ) : (
                <AnimatedCounter target={13} suffix="+" celebrate delay={400} />
              )}
            </p>
            <p className="text-xs md:text-sm text-muted-foreground mt-1 transition-all duration-500">
              {phase < 2 ? "states" : "countries"}
            </p>
          </div>
        </div>
      </div>
    </ImpactScene>
  );
};

export default GeoReachScene;
