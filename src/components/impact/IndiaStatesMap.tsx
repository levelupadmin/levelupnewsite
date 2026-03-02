import {
  INDIA_STATE_PATHS,
  INDIA_CITIES,
  INDIA_OUTLINE_PATH,
  REGION_DELAYS,
} from "./indiaMapData";
import { useIsMobile } from "@/hooks/use-mobile";

interface IndiaStatesMapProps {
  /** Animation sub-phase:
   *  0 = hidden
   *  1 = outline + state glow
   *  2 = tier-1 city dots
   *  3 = tier-2 cities + labels
   *  4+ = fully revealed (world transition happening)
   */
  phase: number;
}

/**
 * SVG `<g>` containing:
 *  – persistent national outline (always visible once phase ≥ 1)
 *  – per-state fills that glow region-by-region
 *  – city dots staggered by tier
 * Rendered in local coords (≈ -2…100 × 0…130) — parent applies positioning transform.
 */
const IndiaStatesMap = ({ phase }: IndiaStatesMapProps) => {
  const isMobile = useIsMobile();
  const showStates = phase >= 1;
  const showTier1 = phase >= 2;
  const showTier2 = phase >= 3;

  return (
    <g>
      {/* ── Persistent national outline — always anchors the shape ── */}
      <path
        d={INDIA_OUTLINE_PATH}
        fill="none"
        stroke="hsl(var(--primary) / 0.35)"
        strokeWidth={0.8}
        strokeLinejoin="round"
        opacity={showStates ? 1 : 0}
        style={{
          transition: "opacity 0.6s ease",
        }}
      />

      {/* ── State fills ── */}
      {INDIA_STATE_PATHS.map((state) => {
        const delay = REGION_DELAYS[state.region];
        return (
          <path
            key={state.id}
            d={state.d}
            fill={showStates ? "hsl(var(--primary) / 0.15)" : "transparent"}
            stroke={
              showStates
                ? "hsl(var(--primary) / 0.5)"
                : "transparent"
            }
            strokeWidth={0.4}
            strokeLinejoin="round"
            opacity={0}
            className={showStates ? "animate-india-state-glow" : ""}
            style={showStates ? { animationDelay: `${delay}s` } : undefined}
          />
        );
      })}

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
              <circle cx={city.x} cy={city.y} r={2.5} fill="hsl(var(--primary) / 0.25)" />
              <circle cx={city.x} cy={city.y} r={1} fill="hsl(var(--primary))" />
              <circle
                cx={city.x} cy={city.y} r={1}
                fill="none" stroke="hsl(var(--primary))" strokeWidth={0.3}
                className="animate-impact-city-ping"
                style={{ animationDelay: `${delay + 0.3}s` }}
              />
              <text
                x={city.x} y={city.y - 3.5}
                textAnchor="middle"
                fill="hsl(var(--foreground))"
                fontSize={isMobile ? 2.5 : 3}
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
              <circle cx={city.x} cy={city.y} r={1.8} fill="hsl(var(--primary) / 0.2)" />
              <circle cx={city.x} cy={city.y} r={0.8} fill="hsl(var(--primary))" />
              {/* Labels only on desktop to reduce clutter */}
              {!isMobile && (
                <text
                  x={city.x} y={city.y - 3}
                  textAnchor="middle"
                  fill="hsl(var(--foreground) / 0.7)"
                  fontSize={2.2}
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
