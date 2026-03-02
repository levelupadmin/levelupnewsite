import { useRef } from "react";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { useScrollReveal } from "@/components/FadeInSection";
import { useIsMobile } from "@/hooks/use-mobile";
import ImpactScene from "./ImpactScene";

/* ── Data ── */
const indianCities = [
  "Mumbai", "Delhi", "Bengaluru", "Hyderabad", "Chennai",
  "Pune", "Kolkata", "Ahmedabad", "Jaipur", "Kochi",
];

const internationalLocations = [
  { label: "Dubai", flag: "🇦🇪" },
  { label: "London", flag: "🇬🇧" },
  { label: "New York", flag: "🇺🇸" },
  { label: "Singapore", flag: "🇸🇬" },
  { label: "Sydney", flag: "🇦🇺" },
  { label: "Toronto", flag: "🇨🇦" },
  { label: "Los Angeles", flag: "🇺🇸" },
];

/* ── Ring config ── */
const rings = [
  { label: "States", radius: 28, delay: 0.1 },
  { label: "Cities", radius: 42, delay: 0.3 },
  { label: "Countries", radius: 56, delay: 0.5 },
];

/* ── Particle dots along rings ── */
const particleDots = Array.from({ length: 24 }, (_, i) => {
  const ringIdx = i % 3;
  const r = rings[ringIdx].radius;
  const angle = (i * 137.508 + ringIdx * 30) % 360; // golden angle spread
  return { r, angle, ringDelay: rings[ringIdx].delay, idx: i };
});

const GeoReachScene = () => {
  const { ref, isVisible } = useScrollReveal(0.15);
  const isMobile = useIsMobile();
  const svgSize = isMobile ? 280 : 420;
  const center = svgSize / 2;
  const scale = svgSize / 140; // base unit

  return (
    <ImpactScene>
      <div
        ref={ref}
        className="relative flex flex-col items-center justify-center min-h-[480px] md:min-h-[680px] px-4 py-12 md:py-20"
      >
        {/* ── Heading ── */}
        <div className="text-center mb-8 md:mb-12 relative z-10">
          <p className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-muted-foreground/70 font-medium mb-4">
            Global Reach
          </p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight"
            style={{
              background: "linear-gradient(180deg, hsl(var(--foreground)), hsl(var(--foreground) / 0.7))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            From 821 Cities to 13+ Countries
          </h2>
        </div>

        {/* ── Radial glow behind rings ── */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: svgSize * 1.4,
            height: svgSize * 1.4,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "radial-gradient(ellipse 100% 100% at 50% 50%, hsl(var(--primary) / 0.12), hsl(var(--primary) / 0.03) 55%, transparent 80%)",
            filter: "blur(40px)",
            zIndex: 1,
            opacity: isVisible ? 1 : 0,
            transition: "opacity 1.2s ease",
          }}
        />

        {/* ── Concentric Rings SVG ── */}
        <div className="relative z-[2]" style={{ width: svgSize, height: svgSize }}>
          <svg
            viewBox={`0 0 ${svgSize} ${svgSize}`}
            className="w-full h-full"
            aria-label="Concentric rings showing geographic reach"
          >
            <defs>
              <radialGradient id="ring-grad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
              </radialGradient>
              <filter id="hub-glow" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Expanding rings */}
            {rings.map((ring, i) => (
              <circle
                key={ring.label}
                cx={center}
                cy={center}
                r={ring.radius * scale}
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth={1.2}
                className="geo-ring"
                style={{
                  opacity: isVisible ? 0.15 + i * 0.05 : 0,
                  transform: isVisible ? "scale(1)" : "scale(0.3)",
                  transformOrigin: `${center}px ${center}px`,
                  transition: `all 1.2s cubic-bezier(0.16, 1, 0.3, 1) ${ring.delay}s`,
                }}
              />
            ))}

            {/* Particle dots along rings */}
            {particleDots.map((dot) => {
              const r = dot.r * scale;
              const rad = (dot.angle * Math.PI) / 180;
              const x = center + r * Math.cos(rad);
              const y = center + r * Math.sin(rad);
              return (
                <circle
                  key={dot.idx}
                  cx={x}
                  cy={y}
                  r={isMobile ? 1.5 : 2}
                  fill="hsl(var(--primary))"
                  className="geo-particle"
                  style={{
                    opacity: isVisible ? 0.3 + (dot.idx % 5) * 0.1 : 0,
                    transition: `opacity 0.6s ease ${dot.ringDelay + 0.4 + dot.idx * 0.04}s`,
                  }}
                />
              );
            })}

            {/* Central hub */}
            <circle
              cx={center}
              cy={center}
              r={12 * scale / 3}
              fill="hsl(var(--primary))"
              filter="url(#hub-glow)"
              style={{
                opacity: isVisible ? 0.9 : 0,
                transition: "opacity 0.8s ease",
              }}
            />
            {/* Heartbeat rings */}
            {isVisible && (
              <>
                <circle
                  cx={center}
                  cy={center}
                  r={12 * scale / 3}
                  fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth={1}
                  className="animate-geo-heartbeat"
                />
                <circle
                  cx={center}
                  cy={center}
                  r={12 * scale / 3}
                  fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth={0.6}
                  className="animate-geo-heartbeat"
                  style={{ animationDelay: "0.6s" }}
                />
              </>
            )}

            {/* Hub label */}
            <text
              x={center}
              y={center + (isMobile ? 1.5 : 2)}
              textAnchor="middle"
              fill="hsl(var(--primary-foreground))"
              fontSize={isMobile ? 9 : 11}
              fontFamily="'Sora', sans-serif"
              fontWeight={700}
              style={{
                opacity: isVisible ? 1 : 0,
                transition: "opacity 0.8s ease 0.2s",
              }}
            >
              INDIA
            </text>
          </svg>

          {/* ── Floating city pills (inner ring) ── */}
          {indianCities.map((city, i) => {
            const angle = (i * 36) - 90; // evenly spread
            const r = rings[1].radius * scale + 8;
            const rad = (angle * Math.PI) / 180;
            const x = center + r * Math.cos(rad);
            const y = center + r * Math.sin(rad);
            return (
              <div
                key={city}
                className="absolute text-[9px] md:text-[10px] font-medium text-muted-foreground/80 bg-card/60 backdrop-blur-sm border border-border/30 rounded-full px-2 py-0.5 whitespace-nowrap geo-pill"
                style={{
                  left: x,
                  top: y,
                  transform: "translate(-50%, -50%)",
                  opacity: isVisible ? 1 : 0,
                  transition: `opacity 0.5s ease ${0.8 + i * 0.08}s, transform 0.5s ease ${0.8 + i * 0.08}s`,
                }}
              >
                {city}
              </div>
            );
          })}

          {/* ── Floating country pills (outer ring) ── */}
          {internationalLocations.map((loc, i) => {
            const angle = (i * (360 / internationalLocations.length)) - 90;
            const r = rings[2].radius * scale + 14;
            const rad = (angle * Math.PI) / 180;
            const x = center + r * Math.cos(rad);
            const y = center + r * Math.sin(rad);
            return (
              <div
                key={loc.label}
                className="absolute text-[9px] md:text-[11px] font-medium text-foreground/90 bg-card/70 backdrop-blur-sm border border-primary/20 rounded-full px-2.5 py-0.5 whitespace-nowrap geo-pill"
                style={{
                  left: x,
                  top: y,
                  transform: "translate(-50%, -50%)",
                  opacity: isVisible ? 1 : 0,
                  transition: `opacity 0.5s ease ${1.2 + i * 0.1}s, transform 0.5s ease ${1.2 + i * 0.1}s`,
                }}
              >
                {loc.flag} {loc.label}
              </div>
            );
          })}
        </div>

        {/* ── Stats ── */}
        <div className="relative z-10 mt-10 md:mt-14 flex items-center justify-center gap-8 md:gap-16">
          {[
            { target: 821, suffix: "+", label: "Cities", delay: 0 },
            { target: 28, suffix: "", label: "States", delay: 300 },
            { target: 13, suffix: "+", label: "Countries", delay: 600 },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p
                className="text-4xl sm:text-5xl md:text-7xl font-semibold tracking-tight"
                style={{
                  background: "linear-gradient(180deg, hsl(var(--foreground)), hsl(var(--foreground) / 0.65))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {isVisible && (
                  <AnimatedCounter target={stat.target} suffix={stat.suffix} celebrate delay={stat.delay} />
                )}
              </p>
              <p className="text-xs md:text-sm text-muted-foreground/70 mt-2 tracking-wide uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </ImpactScene>
  );
};

export default GeoReachScene;
