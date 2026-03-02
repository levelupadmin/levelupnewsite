import { useMemo } from "react";

interface NetworkGraphProps {
  isVisible: boolean;
}

/** SVG network visualization with animated node connections */
const NetworkGraph = ({ isVisible }: NetworkGraphProps) => {
  const nodes = useMemo(() => [
    { x: 100, y: 100 }, { x: 250, y: 60 }, { x: 400, y: 90 },
    { x: 50, y: 200 }, { x: 200, y: 180 }, { x: 350, y: 170 },
    { x: 480, y: 200 }, { x: 120, y: 280 }, { x: 300, y: 260 },
    { x: 450, y: 280 }, { x: 170, y: 340 }, { x: 380, y: 330 },
    { x: 260, y: 140 }, { x: 150, y: 50 },
  ], []);

  const edges = useMemo(() => [
    [0, 1], [1, 2], [0, 3], [0, 4], [1, 4], [2, 5], [2, 6],
    [3, 7], [4, 8], [5, 8], [5, 6], [7, 10], [8, 9], [8, 11],
    [9, 11], [4, 12], [12, 5], [0, 13], [13, 1],
  ], []);

  return (
    <svg viewBox="0 0 530 380" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      {/* Connection lines */}
      {edges.map(([a, b], i) => (
        <line
          key={`edge-${i}`}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke="hsl(var(--primary))"
          strokeWidth={0.8}
          strokeDasharray="4 4"
          opacity={isVisible ? 0.2 : 0}
          style={{
            transition: `opacity 0.6s ease ${0.3 + i * 0.06}s`,
          }}
        />
      ))}

      {/* Nodes */}
      {nodes.map((n, i) => (
        <g key={`node-${i}`}>
          <circle
            cx={n.x}
            cy={n.y}
            r={i < 4 ? 6 : 4}
            fill="hsl(var(--primary))"
            opacity={isVisible ? 0.7 : 0}
            style={{
              transition: `opacity 0.5s ease ${0.2 + i * 0.08}s`,
              filter: isVisible ? "drop-shadow(0 0 6px hsl(30 90% 55% / 0.4))" : "none",
            }}
          />
          {/* Glow ring on major nodes */}
          {i < 4 && isVisible && (
            <circle
              cx={n.x}
              cy={n.y}
              r={6}
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth={0.5}
              className="animate-impact-network-pulse"
              style={{ animationDelay: `${i * 0.5}s` }}
            />
          )}
        </g>
      ))}
    </svg>
  );
};

export default NetworkGraph;
