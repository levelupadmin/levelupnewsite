import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { useScrollReveal } from "@/components/FadeInSection";
import { useIsMobile } from "@/hooks/use-mobile";
import ImpactScene from "./ImpactScene";
import worldMapUrl from "@/assets/world-map.svg";
import {
  INDIA_CENTER,
  INDIA_ZOOM_VIEWBOX,
  internationalCities,
} from "./worldMapData";
import IndiaStatesMap from "./IndiaStatesMap";

/* ── Helpers ── */
const arcPath = (x1: number, y1: number, x2: number, y2: number) => {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const dist = Math.sqrt(dx * dx + dy * dy);
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2 - dist * 0.2;
  return `M ${x1} ${y1} Q ${midX} ${midY} ${x2} ${y2}`;
};

/* ── Full world viewBox ── */
const WORLD_VIEWBOX = "30.767 241.591 784.077 458.627";

/** Parse "x y w h" → [x, y, w, h] */
const parseViewBox = (vb: string): [number, number, number, number] =>
  vb.split(" ").map(Number) as [number, number, number, number];

/** Lerp between two viewBox strings */
const lerpViewBox = (from: string, to: string, t: number): string => {
  const a = parseViewBox(from);
  const b = parseViewBox(to);
  return a.map((v, i) => v + (b[i] - v) * t).join(" ");
};

/* ── Easing ── */
const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const GeoReachScene = () => {
  const { ref, isVisible } = useScrollReveal(0.15);
  const isMobile = useIsMobile();
  const [phase, setPhase] = useState(0);
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);

  // Animated viewBox
  const [animatedViewBox, setAnimatedViewBox] = useState(WORLD_VIEWBOX);
  const animFrameRef = useRef<number>(0);

  // Resolve mobile before animation starts
  const [ready, setReady] = useState(false);
  useEffect(() => {
    requestAnimationFrame(() => setReady(true));
  }, []);

  const indiaViewBox = useMemo(
    () => (isMobile ? INDIA_ZOOM_VIEWBOX.mobile : INDIA_ZOOM_VIEWBOX.desktop),
    [isMobile]
  );

  /** Animate viewBox from `from` to `to` over `duration` ms */
  const animateViewBox = useCallback(
    (from: string, to: string, duration: number) => {
      const startTime = performance.now();
      const step = (now: number) => {
        const elapsed = now - startTime;
        const t = Math.min(elapsed / duration, 1);
        const eased = easeInOutCubic(t);
        setAnimatedViewBox(lerpViewBox(from, to, eased));
        if (t < 1) {
          animFrameRef.current = requestAnimationFrame(step);
        }
      };
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = requestAnimationFrame(step);
    },
    []
  );

  /* Phase state-machine */
  useEffect(() => {
    if (!isVisible || !ready) return;

    // Start zoomed into India
    setAnimatedViewBox(indiaViewBox);
    setPhase(1);

    const timers = [
      setTimeout(() => setPhase(2), 1200), // tier 1 dots
      setTimeout(() => setPhase(3), 2400), // tier 2 dots
      setTimeout(() => {
        setPhase(4);
        // Smooth zoom out to world
        animateViewBox(indiaViewBox, WORLD_VIEWBOX, 1800);
      }, 4000),
      setTimeout(() => setPhase(5), 6000), // arcs + intl cities
    ];
    return () => {
      timers.forEach(clearTimeout);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [isVisible, ready, indiaViewBox, animateViewBox]);

  const arcPaths = useMemo(
    () =>
      internationalCities.map((c) =>
        arcPath(INDIA_CENTER.cx, INDIA_CENTER.cy, c.cx, c.cy)
      ),
    []
  );

  const indiaPhase = Math.min(phase, 3);

  return (
    <ImpactScene>
      <div
        ref={ref}
        className="relative flex flex-col items-center justify-center min-h-[420px] md:min-h-[600px] px-4 py-10 md:py-16"
      >
        {/* ── Heading with crossfade ── */}
        <div className="text-center mb-6 md:mb-10 relative z-10">
          <p className="text-[10px] md:text-xs tracking-[0.25em] uppercase text-muted-foreground font-medium mb-3">
            Global Reach
          </p>
          <div className="relative" style={{ minHeight: "2.5em" }}>
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground tracking-tight transition-all duration-700"
              style={{
                opacity: phase < 4 ? 1 : 0,
                transform: phase < 4 ? "none" : "translateY(-10px)",
              }}
            >
              Lighting Up India
            </h2>
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground tracking-tight transition-all duration-700 absolute inset-x-0 top-0"
              style={{
                opacity: phase >= 4 ? 1 : 0,
                transform: phase >= 4 ? "none" : "translateY(10px)",
              }}
            >
              Spreading from India to the World
            </h2>
          </div>
        </div>

        {/* ── Radial glow ── */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: "30%",
            height: "40%",
            top: "45%",
            left: phase >= 4 ? "58%" : "50%",
            transform: "translate(-50%, -50%)",
            background:
              "radial-gradient(ellipse 100% 100% at 50% 50%, hsl(var(--primary) / 0.2), hsl(var(--primary) / 0.05) 60%, transparent 85%)",
            filter: "blur(40px)",
            zIndex: 1,
            opacity: isVisible ? 1 : 0,
            transition: "left 1.5s ease, opacity 1s ease",
          }}
        />

        {/* ── Map SVG ── */}
        <div className="w-full max-w-6xl mx-auto relative z-[2]">
          <svg
            viewBox={animatedViewBox}
            className="w-full h-auto"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Animated map showing LevelUp's reach across India and the world"
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
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
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

            {/* World map outlines — fades in during Phase 4 */}
            <image
              href={worldMapUrl}
              x="30.767"
              y="241.591"
              width="784.077"
              height="458.627"
              style={{
                opacity: phase >= 4 ? 0.4 : 0,
                transition: "opacity 1.5s ease",
                filter: "brightness(0.6) contrast(1.2)",
              }}
            />

            {/* ── India — rendered directly in world coords, NO transform ── */}
            <IndiaStatesMap phase={indiaPhase} />

            {/* ── India center heartbeat — Phase 5 ── */}
            {phase >= 5 && (
              <>
                <circle
                  cx={INDIA_CENTER.cx}
                  cy={INDIA_CENTER.cy}
                  r={8}
                  fill="hsl(var(--primary))"
                  filter="url(#india-glow)"
                  opacity={0.15}
                />
                <circle
                  cx={INDIA_CENTER.cx}
                  cy={INDIA_CENTER.cy}
                  r={2}
                  fill="hsl(var(--primary))"
                  opacity={0.9}
                  className="animate-impact-heartbeat"
                />
                <circle
                  cx={INDIA_CENTER.cx}
                  cy={INDIA_CENTER.cy}
                  r={2}
                  fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth={0.3}
                  className="animate-impact-heartbeat-ring"
                />
              </>
            )}

            {/* ── Connection arcs + traveling dots — Phase 5 ── */}
            {phase >= 5 &&
              arcPaths.map((d, i) => (
                <g key={`arc-${i}`}>
                  <path
                    d={d}
                    fill="none"
                    stroke={`url(#arc-grad-${i})`}
                    strokeWidth={1.5}
                    strokeDasharray="6 4"
                    opacity={0}
                    className="animate-impact-arc-draw"
                    style={{ animationDelay: `${0.3 + i * 0.15}s` }}
                  />
                  <circle
                    r={2.5}
                    fill="hsl(var(--primary))"
                    filter="url(#geo-glow)"
                    opacity={0.9}
                  >
                    <animateMotion
                      dur={`${3 + i * 0.3}s`}
                      begin={`${0.8 + i * 0.2}s`}
                      repeatCount="indefinite"
                      path={d}
                    />
                  </circle>
                </g>
              ))}

            {/* ── International city markers — Phase 5 ── */}
            {phase >= 5 &&
              internationalCities.map((city, i) => {
                const isHovered = hoveredCity === `city-${i}`;
                return (
                  <g
                    key={`city-${i}`}
                    className="pointer-events-auto cursor-pointer"
                    onMouseEnter={() => setHoveredCity(`city-${i}`)}
                    onMouseLeave={() => setHoveredCity(null)}
                    onClick={() =>
                      setHoveredCity((p) =>
                        p === `city-${i}` ? null : `city-${i}`
                      )
                    }
                  >
                    <g
                      opacity={0}
                      className="animate-city-fade-in"
                      style={{ animationDelay: `${0.5 + i * 0.15}s` }}
                    >
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
                      <circle
                        cx={city.cx}
                        cy={city.cy}
                        r={4}
                        fill="hsl(var(--primary))"
                        opacity={isHovered ? 1 : 0.85}
                        style={{ transition: "all 0.3s ease" }}
                      />
                      <circle
                        cx={city.cx}
                        cy={city.cy}
                        r={4}
                        fill="none"
                        stroke="hsl(var(--primary))"
                        strokeWidth={0.6}
                        className="animate-impact-city-ping"
                        style={{ animationDelay: `${1 + i * 0.2}s` }}
                      />
                      <text
                        x={city.cx}
                        y={city.cy - 12}
                        textAnchor="middle"
                        fill="hsl(var(--foreground))"
                        fontSize={isMobile ? 8 : 10}
                        fontFamily="'Sora', sans-serif"
                        fontWeight={isHovered ? 600 : 500}
                        opacity={isHovered ? 1 : 0.85}
                        style={{ transition: "all 0.3s ease" }}
                      >
                        {city.label}
                      </text>
                      <text
                        x={city.cx}
                        y={city.cy + (isMobile ? 14 : 16)}
                        textAnchor="middle"
                        fill="hsl(var(--primary))"
                        fontSize={isMobile ? 7 : 8}
                        fontFamily="'Sora', sans-serif"
                        fontWeight={600}
                        opacity={0.7}
                      >
                        {city.learners}
                      </text>
                    </g>

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
                          fontFamily="'Sora', sans-serif"
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

        {/* ── Stats with crossfade ── */}
        <div className="relative z-10 mt-6 md:mt-10" style={{ minHeight: 80 }}>
          <div
            className="flex items-center justify-center gap-8 md:gap-16 transition-all duration-700"
            style={{
              opacity: phase >= 1 && phase < 5 ? 1 : 0,
              transform: phase >= 1 && phase < 5 ? "none" : "translateY(-10px)",
            }}
          >
            <div className="text-center">
              <p className="text-3xl sm:text-4xl md:text-6xl font-semibold text-foreground tracking-tight">
                {phase >= 1 && <AnimatedCounter target={821} celebrate />}
              </p>
              <p className="text-xs md:text-sm text-muted-foreground mt-1">cities</p>
            </div>
            <div className="w-px h-12 bg-border" />
            <div className="text-center">
              <p className="text-3xl sm:text-4xl md:text-6xl font-semibold text-foreground tracking-tight">
                {phase >= 1 && <AnimatedCounter target={28} celebrate delay={400} />}
              </p>
              <p className="text-xs md:text-sm text-muted-foreground mt-1">states</p>
            </div>
          </div>

          <div
            className="flex items-center justify-center gap-8 md:gap-16 transition-all duration-700 absolute inset-0"
            style={{
              opacity: phase >= 5 ? 1 : 0,
              transform: phase >= 5 ? "none" : "translateY(10px)",
            }}
          >
            <div className="text-center">
              <p className="text-3xl sm:text-4xl md:text-6xl font-semibold text-foreground tracking-tight">
                {phase >= 5 && <AnimatedCounter target={821} celebrate />}
              </p>
              <p className="text-xs md:text-sm text-muted-foreground mt-1">cities</p>
            </div>
            <div className="w-px h-12 bg-border" />
            <div className="text-center">
              <p className="text-3xl sm:text-4xl md:text-6xl font-semibold text-foreground tracking-tight">
                {phase >= 5 && (
                  <AnimatedCounter target={13} suffix="+" celebrate delay={400} />
                )}
              </p>
              <p className="text-xs md:text-sm text-muted-foreground mt-1">countries</p>
            </div>
          </div>
        </div>
      </div>
    </ImpactScene>
  );
};

export default GeoReachScene;
