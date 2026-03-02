import { useMemo, useEffect, useState, useCallback, useRef } from "react";

interface NetworkGraphProps {
  isVisible: boolean;
  /** 0-1 progress from the counter, drives edge reveal */
  counterProgress?: number;
  /** Called when all edges have drawn in */
  onEdgesComplete?: () => void;
}

interface Node {
  x: number;
  y: number;
  layer: number; // 0=back, 1=mid, 2=front – for parallax
  initials: string;
  color: string;
}

const COLORS = [
  "hsl(30 90% 55%)",   // amber/primary
  "hsl(340 70% 55%)",  // rose
  "hsl(200 80% 55%)",  // sky
  "hsl(160 60% 45%)",  // teal
  "hsl(270 60% 60%)",  // violet
  "hsl(45 85% 55%)",   // gold
];

const INITIALS = ["PR", "AK", "SM", "RJ", "NV", "KD", "TA", "MG", "VS", "DL", "AP", "RI", "JB", "SN"];

const TOOLTIPS = [
  "Filmmaker × Editor",
  "Writer × Director",
  "Designer × Coder",
  "Music × Film",
  "Actor × Director",
  "VFX × Cinematography",
  "Producer × Writer",
  "Animator × Sound",
  "Photographer × Editor",
  "Art × Production",
  "Script × Direction",
  "Colorist × DOP",
  "Lyricist × Composer",
  "Stylist × Director",
];

/** SVG network visualization with full animation suite */
const NetworkGraph = ({ isVisible, counterProgress = 0, onEdgesComplete }: NetworkGraphProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  const [edgesDrawn, setEdgesDrawn] = useState(false);
  const edgesCompleteRef = useRef(false);

  const nodes: Node[] = useMemo(() => [
    { x: 100, y: 100, layer: 2, initials: INITIALS[0], color: COLORS[0] },
    { x: 250, y: 60, layer: 2, initials: INITIALS[1], color: COLORS[1] },
    { x: 400, y: 90, layer: 2, initials: INITIALS[2], color: COLORS[2] },
    { x: 50, y: 200, layer: 2, initials: INITIALS[3], color: COLORS[3] },
    { x: 200, y: 180, layer: 1, initials: INITIALS[4], color: COLORS[4] },
    { x: 350, y: 170, layer: 1, initials: INITIALS[5], color: COLORS[5] },
    { x: 480, y: 200, layer: 1, initials: INITIALS[6], color: COLORS[0] },
    { x: 120, y: 280, layer: 1, initials: INITIALS[7], color: COLORS[1] },
    { x: 300, y: 260, layer: 0, initials: INITIALS[8], color: COLORS[2] },
    { x: 450, y: 280, layer: 0, initials: INITIALS[9], color: COLORS[3] },
    { x: 170, y: 340, layer: 0, initials: INITIALS[10], color: COLORS[4] },
    { x: 380, y: 330, layer: 0, initials: INITIALS[11], color: COLORS[5] },
    { x: 260, y: 140, layer: 1, initials: INITIALS[12], color: COLORS[0] },
    { x: 150, y: 50, layer: 2, initials: INITIALS[13], color: COLORS[1] },
  ], []);

  const edges = useMemo(() => [
    [0, 1], [1, 2], [0, 3], [0, 4], [1, 4], [2, 5], [2, 6],
    [3, 7], [4, 8], [5, 8], [5, 6], [7, 10], [8, 9], [8, 11],
    [9, 11], [4, 12], [12, 5], [0, 13], [13, 1],
  ], []);

  // Compute edge lengths for stroke-dasharray
  const edgeLengths = useMemo(() =>
    edges.map(([a, b]) => {
      const dx = nodes[b].x - nodes[a].x;
      const dy = nodes[b].y - nodes[a].y;
      return Math.sqrt(dx * dx + dy * dy);
    }),
  [edges, nodes]);

  // How many edges should be visible based on counter progress
  const visibleEdgeCount = useMemo(() => {
    if (!isVisible) return 0;
    return Math.min(edges.length, Math.floor(counterProgress * edges.length));
  }, [isVisible, counterProgress, edges.length]);

  useEffect(() => {
    if (visibleEdgeCount >= edges.length && !edgesCompleteRef.current) {
      edgesCompleteRef.current = true;
      setEdgesDrawn(true);
      onEdgesComplete?.();
    }
  }, [visibleEdgeCount, edges.length, onEdgesComplete]);

  // Magnetic cursor effect
  const handleMouseMove = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const scaleX = 530 / rect.width;
    const scaleY = 380 / rect.height;
    setMousePos({
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMousePos(null);
    setHoveredNode(null);
  }, []);

  // Compute displaced node positions from magnetic effect
  const displacedNodes = useMemo(() => {
    if (!mousePos) return nodes.map((n) => ({ x: n.x, y: n.y }));
    return nodes.map((n) => {
      const dx = mousePos.x - n.x;
      const dy = mousePos.y - n.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxDist = 120;
      if (dist > maxDist || dist < 1) return { x: n.x, y: n.y };
      const force = ((maxDist - dist) / maxDist) * 12;
      return {
        x: n.x + (dx / dist) * force,
        y: n.y + (dy / dist) * force,
      };
    });
  }, [nodes, mousePos]);

  // Parallax offsets per layer based on mouse
  const layerOffsets = useMemo(() => {
    if (!mousePos) return [{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }];
    const cx = 265, cy = 190;
    const dx = (mousePos.x - cx) / cx;
    const dy = (mousePos.y - cy) / cy;
    return [
      { x: dx * -3, y: dy * -3 },   // back – moves opposite, subtle
      { x: dx * 2, y: dy * 2 },      // mid
      { x: dx * 5, y: dy * 5 },      // front
    ];
  }, [mousePos]);

  // Spark positions (midpoints of recently drawn edges)
  const [sparkEdges, setSparkEdges] = useState<number[]>([]);
  const prevVisibleCount = useRef(0);

  useEffect(() => {
    if (visibleEdgeCount > prevVisibleCount.current) {
      const newEdges: number[] = [];
      for (let i = prevVisibleCount.current; i < visibleEdgeCount; i++) {
        newEdges.push(i);
      }
      setSparkEdges((prev) => [...prev, ...newEdges]);
      // Clean up old sparks after animation
      setTimeout(() => {
        setSparkEdges((prev) => prev.filter((e) => !newEdges.includes(e)));
      }, 800);
    }
    prevVisibleCount.current = visibleEdgeCount;
  }, [visibleEdgeCount]);

  const nodeRadius = (i: number) => (i < 4 ? 14 : 10);
  const layerOpacity = [0.5, 0.7, 1];

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 530 380"
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ cursor: "crosshair" }}
    >
      <defs>
        <filter id="glow-node">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="glow-spark">
          <feGaussianBlur stdDeviation="2" />
        </filter>
      </defs>

      {/* === EDGES === */}
      {edges.map(([a, b], i) => {
        const isVisible_ = i < visibleEdgeCount;
        const len = edgeLengths[i];
        const posA = displacedNodes[a];
        const posB = displacedNodes[b];
        const oA = layerOffsets[nodes[a].layer];
        const oB = layerOffsets[nodes[b].layer];
        // Proximity brightening
        let edgeOpacity = 0.25;
        if (mousePos) {
          const mx = (posA.x + posB.x) / 2;
          const my = (posA.y + posB.y) / 2;
          const dist = Math.sqrt((mousePos.x - mx) ** 2 + (mousePos.y - my) ** 2);
          if (dist < 100) edgeOpacity = 0.25 + 0.45 * ((100 - dist) / 100);
        }

        return (
          <line
            key={`edge-${i}`}
            x1={posA.x + oA.x}
            y1={posA.y + oA.y}
            x2={posB.x + oB.x}
            y2={posB.y + oB.y}
            stroke="hsl(var(--primary))"
            strokeWidth={1}
            strokeDasharray={len}
            strokeDashoffset={isVisible_ ? 0 : len}
            opacity={isVisible_ ? edgeOpacity : 0}
            style={{
              transition: "stroke-dashoffset 0.6s ease-out, opacity 0.4s ease",
            }}
          />
        );
      })}

      {/* === DATA PULSES traveling along drawn edges === */}
      {edgesDrawn && edges.map(([a, b], i) => {
        const posA = displacedNodes[a];
        const posB = displacedNodes[b];
        const oA = layerOffsets[nodes[a].layer];
        const oB = layerOffsets[nodes[b].layer];
        return (
          <circle
            key={`pulse-${i}`}
            r={2.5}
            fill="hsl(var(--primary))"
            opacity={0.8}
            filter="url(#glow-spark)"
          >
            <animateMotion
              dur={`${2 + (i % 3)}s`}
              repeatCount="indefinite"
              begin={`${i * 0.3}s`}
              path={`M${posA.x + oA.x},${posA.y + oA.y} L${posB.x + oB.x},${posB.y + oB.y}`}
            />
          </circle>
        );
      })}

      {/* === SPARK PARTICLES at edge midpoints === */}
      {sparkEdges.map((edgeIdx) => {
        const [a, b] = edges[edgeIdx];
        const mx = (nodes[a].x + nodes[b].x) / 2;
        const my = (nodes[a].y + nodes[b].y) / 2;
        return Array.from({ length: 5 }).map((_, p) => {
          const angle = (p / 5) * Math.PI * 2 + Math.random() * 0.5;
          const dist = 8 + Math.random() * 10;
          return (
            <circle
              key={`spark-${edgeIdx}-${p}`}
              cx={mx + Math.cos(angle) * dist}
              cy={my + Math.sin(angle) * dist}
              r={1.5}
              fill="hsl(30 90% 60%)"
              filter="url(#glow-spark)"
              className="animate-collab-spark"
            />
          );
        });
      })}

      {/* === NODES with avatars === */}
      {nodes.map((n, i) => {
        const r = nodeRadius(i);
        const pos = displacedNodes[i];
        const offset = layerOffsets[n.layer];
        const px = pos.x + offset.x;
        const py = pos.y + offset.y;
        const isHovered = hoveredNode === i;
        const scale = isHovered ? 1.4 : 1;
        const opacity = layerOpacity[n.layer];

        return (
          <g
            key={`node-${i}`}
            style={{
              transition: "transform 0.2s ease-out",
              transform: `translate(${px}px, ${py}px) scale(${scale})`,
              transformOrigin: "0 0",
              cursor: "pointer",
              opacity: isVisible ? opacity : 0,
            }}
            onMouseEnter={() => setHoveredNode(i)}
            onMouseLeave={() => setHoveredNode(null)}
          >
            {/* Glow ring */}
            <circle
              r={r + 3}
              fill="none"
              stroke={n.color}
              strokeWidth={0.8}
              opacity={isHovered ? 0.6 : 0.15}
              className={i < 4 ? "animate-impact-network-pulse" : undefined}
              style={{ animationDelay: `${i * 0.5}s` }}
            />
            {/* Background circle */}
            <circle r={r} fill={n.color} opacity={0.85} filter="url(#glow-node)" />
            {/* Initials */}
            <text
              textAnchor="middle"
              dominantBaseline="central"
              fill="white"
              fontSize={r < 12 ? 7 : 9}
              fontWeight={600}
              fontFamily="system-ui, sans-serif"
              style={{ pointerEvents: "none" }}
            >
              {n.initials}
            </text>

            {/* Tooltip on hover */}
            {isHovered && (
              <g>
                <rect
                  x={-55}
                  y={-r - 28}
                  width={110}
                  height={20}
                  rx={6}
                  fill="hsl(var(--card))"
                  stroke="hsl(var(--border))"
                  strokeWidth={0.5}
                  opacity={0.95}
                />
                <text
                  textAnchor="middle"
                  y={-r - 15}
                  fill="hsl(var(--foreground))"
                  fontSize={7}
                  fontFamily="system-ui, sans-serif"
                  style={{ pointerEvents: "none" }}
                >
                  {TOOLTIPS[i]}
                </text>
              </g>
            )}
          </g>
        );
      })}
    </svg>
  );
};

export default NetworkGraph;
