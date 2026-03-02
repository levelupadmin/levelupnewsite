import {
  INDIA_CITIES,
  REGION_DELAYS,
} from "./indiaMapData";
import { INDIA_SVG_PATH } from "./worldMapData";
import { useIsMobile } from "@/hooks/use-mobile";

interface IndiaStatesMapProps {
  /** Animation sub-phase:
   *  0 = hidden
   *  1 = outline appears
   *  2 = tier-1 city dots
   *  3 = tier-2 cities + labels
   */
  phase: number;
}

/**
 * SVG `<g>` containing:
 *  – The real India outline from the world-map SVG (always visible once phase ≥ 1)
 *  – City dots staggered by tier
 * All coordinates are in world-map SVG space — NO transform needed on the parent.
 */
const IndiaStatesMap = ({ phase }: IndiaStatesMapProps) => {
  const isMobile = useIsMobile();
  const showOutline = phase >= 1;
  const showTier1 = phase >= 2;
  const showTier2 = phase >= 3;

  return (
    <g>
      {/* ── India outline — the real SVG path from world-map.svg ── */}
      {/* Glow layer */}
      <path
        d={INDIA_SVG_PATH}
        fill={showOutline ? "hsl(var(--primary) / 0.08)" : "transparent"}
        stroke="hsl(var(--primary) / 0.15)"
        strokeWidth={0.6}
        strokeLinejoin="round"
        opacity={showOutline ? 1 : 0}
        filter={showOutline ? "url(#india-glow)" : undefined}
        style={{ transition: "opacity 0.8s ease, fill 0.8s ease" }}
      />
      {/* Crisp outline layer */}
      <path
        d={INDIA_SVG_PATH}
        fill={showOutline ? "hsl(var(--primary) / 0.12)" : "transparent"}
        stroke="hsl(var(--primary) / 0.6)"
        strokeWidth={0.3}
        strokeLinejoin="round"
        opacity={showOutline ? 1 : 0}
        style={{ transition: "opacity 0.8s ease, fill 0.8s ease" }}
      />

      {/* ── City dots — Tier 1 (major metros) ── */}
      {showTier1 &&
        INDIA_CITIES.filter((c) => c.tier === 1).map((city, i) => {
          const delay = 0.1 + i * 0.15;
          return (
            <g
              key={`t1-${i}`}
              opacity={0}
              className="animate-india-city-pop"
              style={{ animationDelay: `${delay}s` }}
            >
              <circle cx={city.x} cy={city.y} r={2} fill="hsl(var(--primary) / 0.25)" />
              <circle cx={city.x} cy={city.y} r={0.8} fill="hsl(var(--primary))" />
              <circle
                cx={city.x} cy={city.y} r={0.8}
                fill="none" stroke="hsl(var(--primary))" strokeWidth={0.2}
                className="animate-impact-city-ping"
                style={{ animationDelay: `${delay + 0.3}s` }}
              />
              <text
                x={city.x} y={city.y - 3}
                textAnchor="middle"
                fill="hsl(var(--foreground))"
                fontSize={isMobile ? 2 : 2.5}
                fontFamily="'Sora', sans-serif"
                fontWeight={500}
              >
                {city.label}
              </text>
            </g>
          );
        })}

      {/* ── City dots — Tier 2 (secondary cities) ── */}
      {showTier2 &&
        INDIA_CITIES.filter((c) => c.tier === 2).map((city, i) => {
          const delay = 0.1 + i * 0.1;
          return (
            <g
              key={`t2-${i}`}
              opacity={0}
              className="animate-india-city-pop"
              style={{ animationDelay: `${delay}s` }}
            >
              <circle cx={city.x} cy={city.y} r={1.2} fill="hsl(var(--primary) / 0.2)" />
              <circle cx={city.x} cy={city.y} r={0.5} fill="hsl(var(--primary))" />
              {!isMobile && (
                <text
                  x={city.x} y={city.y - 2}
                  textAnchor="middle"
                  fill="hsl(var(--foreground) / 0.7)"
                  fontSize={2}
                  fontFamily="'Sora', sans-serif"
                  fontWeight={400}
                >
                  {city.label}
                </text>
              )}
            </g>
          );
        })}
    </g>
  );
};

export default IndiaStatesMap;
