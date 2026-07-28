import { useEffect, useRef, useCallback } from "react";

interface CollabNetworkProps {
  progress: number;
  isVisible: boolean;
}

interface Node {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  radius: number;
  color: string;
  label: string;
  driftSpeed: number;
  driftPhase: number;
  driftAmplitudeX: number;
  driftAmplitudeY: number;
}

interface Edge {
  from: number;
  to: number;
  revealAt: number; // progress threshold (0–1)
  color: string;
}

const NODE_COLORS = [
  "hsl(24, 95%, 58%)",
  "hsl(30, 95%, 65%)",
  "hsl(340, 75%, 55%)",
  "hsl(200, 80%, 55%)",
  "hsl(160, 70%, 50%)",
  "hsl(270, 70%, 60%)",
  "hsl(45, 90%, 58%)",
  "hsl(20, 90%, 55%)",
  "hsl(310, 60%, 55%)",
  "hsl(180, 65%, 50%)",
];

const NODE_LABELS = [
  "P", "A", "S", "V", "R", "M", "K", "N", "D", "L",
  "J", "T", "G", "H", "B", "F", "C", "E", "I", "W",
];

const MAGNETIC_RADIUS = 160;
const MAGNETIC_STRENGTH = 28;
const GLOW_RADIUS = 200;
const NODE_COUNT = 20;
const EDGE_COUNT = 32;

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function generateNodes(w: number, h: number): Node[] {
  const rand = seededRandom(42);
  const nodes: Node[] = [];

  // Distribute nodes evenly using a grid with jitter
  const cols = Math.ceil(Math.sqrt(NODE_COUNT * (w / h)));
  const rows = Math.ceil(NODE_COUNT / cols);
  const cellW = w / cols;
  const cellH = h / rows;
  const jitterX = cellW * 0.25;
  const jitterY = cellH * 0.25;

  for (let i = 0; i < NODE_COUNT; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const cx = (col + 0.5) * cellW + (rand() - 0.5) * 2 * jitterX;
    const cy = (row + 0.5) * cellH + (rand() - 0.5) * 2 * jitterY;
    const x = Math.max(w * 0.05, Math.min(w * 0.95, cx));
    const y = Math.max(h * 0.05, Math.min(h * 0.95, cy));
    nodes.push({
      x,
      y,
      baseX: x,
      baseY: y,
      radius: 3 + rand() * 3,
      color: NODE_COLORS[i % NODE_COLORS.length],
      label: NODE_LABELS[i % NODE_LABELS.length],
      driftSpeed: 0.3 + rand() * 0.5,
      driftPhase: rand() * Math.PI * 2,
      driftAmplitudeX: 8 + rand() * 16,
      driftAmplitudeY: 6 + rand() * 12,
    });
  }
  return nodes;
}

function generateEdges(nodeCount: number): Edge[] {
  const rand = seededRandom(99);
  const edges: Edge[] = [];
  const used = new Set<string>();

  while (edges.length < EDGE_COUNT) {
    const from = Math.floor(rand() * nodeCount);
    const to = Math.floor(rand() * nodeCount);
    if (from === to) continue;
    const key = `${Math.min(from, to)}-${Math.max(from, to)}`;
    if (used.has(key)) continue;
    used.add(key);
    edges.push({
      from,
      to,
      revealAt: (edges.length / EDGE_COUNT) * 0.85,
      color: NODE_COLORS[edges.length % NODE_COLORS.length],
    });
  }
  return edges;
}

const CollabNetwork = ({ progress, isVisible }: CollabNetworkProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const edgesRef = useRef<Edge[]>([]);
  const rafRef = useRef<number>(0);
  const timeRef = useRef(0);
  const mouseRef = useRef<{ x: number; y: number } | null>(null);
  const smoothMouseRef = useRef<{ x: number; y: number } | null>(null);
  const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 2) : 1;

  const initNodes = useCallback((w: number, h: number) => {
    nodesRef.current = generateNodes(w, h);
    edgesRef.current = generateEdges(NODE_COUNT);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      initNodes(rect.width, rect.height);
    };

    resize();
    window.addEventListener("resize", resize);

    const parent = canvas.parentElement;
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onMouseLeave = () => { mouseRef.current = null; };

    parent?.addEventListener("mousemove", onMouseMove);
    parent?.addEventListener("mouseleave", onMouseLeave);

    const ctx = canvas.getContext("2d")!;

    const render = () => {
      timeRef.current += 0.016;
      const t = timeRef.current;
      const { width: cw, height: ch } = canvas;

      // Smooth mouse interpolation
      const target = mouseRef.current;
      if (target) {
        if (!smoothMouseRef.current) smoothMouseRef.current = { ...target };
        else {
          smoothMouseRef.current.x += (target.x - smoothMouseRef.current.x) * 0.08;
          smoothMouseRef.current.y += (target.y - smoothMouseRef.current.y) * 0.08;
        }
      } else {
        smoothMouseRef.current = null;
      }
      const mouse = smoothMouseRef.current;

      ctx.clearRect(0, 0, cw, ch);
      ctx.save();
      ctx.scale(dpr, dpr);

      const nodes = nodesRef.current;
      const edges = edgesRef.current;

      // Update node positions with drift
      nodes.forEach((node) => {
        node.x = node.baseX + Math.sin(t * node.driftSpeed + node.driftPhase) * node.driftAmplitudeX;
        node.y = node.baseY + Math.cos(t * node.driftSpeed * 0.7 + node.driftPhase) * node.driftAmplitudeY;
      });

      // Apply magnetic cursor displacement
      const displayPositions = nodes.map((node) => {
        let dx = 0, dy = 0;
        if (mouse) {
          const mx = mouse.x - node.x;
          const my = mouse.y - node.y;
          const dist = Math.sqrt(mx * mx + my * my);
          if (dist < MAGNETIC_RADIUS && dist > 1) {
            const force = ((MAGNETIC_RADIUS - dist) / MAGNETIC_RADIUS);
            const ease = force * force;
            dx = (mx / dist) * ease * MAGNETIC_STRENGTH;
            dy = (my / dist) * ease * MAGNETIC_STRENGTH;
          }
        }
        return { x: node.x + dx, y: node.y + dy };
      });

      // Draw edges
      edges.forEach((edge) => {
        const edgeProgress = Math.max(0, Math.min(1, (progress - edge.revealAt) / 0.15));
        if (edgeProgress <= 0) return;

        const from = displayPositions[edge.from];
        const to = displayPositions[edge.to];

        // Arc control point
        const midX = (from.x + to.x) / 2;
        const midY = (from.y + to.y) / 2;
        const dx = to.x - from.x;
        const dy = to.y - from.y;
        const len = Math.sqrt(dx * dx + dy * dy);
        const arcOffset = len * 0.12;
        const cpX = midX + (-dy / len) * arcOffset;
        const cpY = midY + (dx / len) * arcOffset;

        // Cursor proximity glow for edge
        let edgeGlow = 0;
        if (mouse) {
          const distToMid = Math.sqrt((mouse.x - midX) ** 2 + (mouse.y - midY) ** 2);
          edgeGlow = Math.max(0, 1 - distToMid / GLOW_RADIUS) * 0.4;
        }

        const baseAlpha = 0.12 + 0.08 * Math.sin(t * 1.5 + edge.from);
        const alpha = Math.min((baseAlpha + edgeGlow) * edgeProgress, 0.6);

        ctx.beginPath();
        ctx.strokeStyle = edge.color;
        ctx.lineWidth = 1 + edgeGlow * 2;
        ctx.globalAlpha = alpha;
        ctx.lineCap = "round";
        ctx.moveTo(from.x, from.y);
        ctx.quadraticCurveTo(cpX, cpY, 
          from.x + (to.x - from.x) * edgeProgress,
          from.y + (to.y - from.y) * edgeProgress
        );
        ctx.stroke();

        // Glow layer for near-cursor edges
        if (edgeGlow > 0.05) {
          ctx.beginPath();
          ctx.strokeStyle = edge.color;
          ctx.lineWidth = 4 + edgeGlow * 4;
          ctx.globalAlpha = edgeGlow * 0.15;
          ctx.moveTo(from.x, from.y);
          ctx.quadraticCurveTo(cpX, cpY,
            from.x + (to.x - from.x) * edgeProgress,
            from.y + (to.y - from.y) * edgeProgress
          );
          ctx.stroke();
        }

        // Pulse at the leading edge tip during reveal
        if (edgeProgress < 1 && edgeProgress > 0.1) {
          const tipX = from.x + (to.x - from.x) * edgeProgress;
          const tipY = from.y + (to.y - from.y) * edgeProgress;
          ctx.beginPath();
          ctx.arc(tipX, tipY, 3, 0, Math.PI * 2);
          ctx.fillStyle = edge.color;
          ctx.globalAlpha = 0.6 * (1 - edgeProgress);
          ctx.fill();
        }

        ctx.globalAlpha = 1;
      });

      // Draw nodes
      nodes.forEach((node, i) => {
        const pos = displayPositions[i];

        // How many edges connected to this node are visible?
        const connectionCount = edges.filter(
          (e) => (e.from === i || e.to === i) && progress >= e.revealAt
        ).length;

        let cursorProximity = 0;
        if (mouse) {
          const dist = Math.sqrt((mouse.x - pos.x) ** 2 + (mouse.y - pos.y) ** 2);
          cursorProximity = Math.max(0, 1 - dist / GLOW_RADIUS);
        }

        const glowIntensity = Math.min(connectionCount * 0.08, 0.4) + cursorProximity * 0.3;

        // Outer glow
        if (glowIntensity > 0.05) {
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, node.radius + 8 + cursorProximity * 6, 0, Math.PI * 2);
          ctx.fillStyle = node.color;
          ctx.globalAlpha = glowIntensity * 0.15;
          ctx.fill();
        }

        // Node circle
        const nodeAlpha = 0.3 + Math.min(progress * 1.5, 0.5) + cursorProximity * 0.2;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, node.radius + cursorProximity * 2, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.globalAlpha = Math.min(nodeAlpha, 0.9);
        ctx.fill();

        // Bright core
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, node.radius * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = "hsl(0, 0%, 100%)";
        ctx.globalAlpha = 0.3 + cursorProximity * 0.4;
        ctx.fill();

        // Label (only for larger nodes near cursor)
        if (cursorProximity > 0.3 && node.radius > 4) {
          ctx.font = `${9 + cursorProximity * 3}px system-ui, sans-serif`;
          ctx.fillStyle = node.color;
          ctx.globalAlpha = cursorProximity * 0.8;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(node.label, pos.x, pos.y - node.radius - 8);
        }

        ctx.globalAlpha = 1;
      });

      // Cursor glow halo
      if (mouse) {
        const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 90);
        gradient.addColorStop(0, "hsla(24, 95%, 58%, 0.08)");
        gradient.addColorStop(0.5, "hsla(24, 95%, 53%, 0.03)");
        gradient.addColorStop(1, "hsla(24, 95%, 53%, 0)");
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 90, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      ctx.restore();
      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      parent?.removeEventListener("mousemove", onMouseMove);
      parent?.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, [progress, dpr, initNodes]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: isVisible ? 1 : 0, transition: "opacity 0.8s ease" }}
      aria-hidden="true"
    />
  );
};

export default CollabNetwork;
