import { INDIA_STATE_PATHS, INDIA_CITIES, REGION_DELAYS } from "./indiaMapData";

interface IndiaStatesMapProps {
  /** Current animation phase (0 = hidden, 1+ = active) */
  phase: number;
}

/**
 * SVG `<g>` containing simplified Indian state outlines and city markers.
 * States light up region-by-region; city dots pop in with a stagger.
 * Rendered in local coords (0-100 × 0-130) — parent applies positioning transform.
 */
const IndiaStatesMap = ({ phase }: IndiaStatesMapProps) => {
  const isActive = phase >= 1;

  return (
    <g>
      {/* ── State outlines ── */}
      {INDIA_STATE_PATHS.map((state) => {
        const delay = REGION_DELAYS[state.region];
        return (
          <path
            key={state.id}
            d={state.d}
            fill={isActive ? "hsl(var(--primary) / 0.18)" : "transparent"}
            stroke={
              isActive
                ? "hsl(var(--primary) / 0.7)"
                : "hsl(var(--muted-foreground) / 0.2)"
            }
            strokeWidth={0.5}
            strokeLinejoin="round"
            opacity={0}
            className={isActive ? "animate-india-state-glow" : ""}
            style={isActive ? { animationDelay: `${delay}s` } : undefined}
          />
        );
      })}

      {/* ── City dots + labels ── */}
      {isActive &&
        INDIA_CITIES.map((city, i) => {
          const delay = REGION_DELAYS[city.region] + 0.5;
          return (
            <g
              key={`india-city-${i}`}
              opacity={0}
              className="animate-india-city-pop"
              style={{ animationDelay: `${delay}s` }}
            >
              {/* Soft glow */}
              <circle
                cx={city.x}
                cy={city.y}
                r={3}
                fill="hsl(var(--primary) / 0.25)"
              />
              {/* Core dot */}
              <circle
                cx={city.x}
                cy={city.y}
                r={1.2}
                fill="hsl(var(--primary))"
              />
              {/* Ping ring */}
              <circle
                cx={city.x}
                cy={city.y}
                r={1.2}
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth={0.3}
                className="animate-impact-city-ping"
                style={{ animationDelay: `${delay + 0.3}s` }}
              />
              {/* City name */}
              <text
                x={city.x}
                y={city.y - 4}
                textAnchor="middle"
                fill="hsl(var(--foreground))"
                fontSize={3}
                fontFamily="'Sora', sans-serif"
                fontWeight={500}
              >
                {city.label}
              </text>
              {/* Learner count */}
              <text
                x={city.x}
                y={city.y + 5}
                textAnchor="middle"
                fill="hsl(var(--primary))"
                fontSize={2}
                fontFamily="'Sora', sans-serif"
                fontWeight={600}
                opacity={0.7}
              >
                {city.learners}
              </text>
            </g>
          );
        })}
    </g>
  );
};

export default IndiaStatesMap;
