import { useEffect, useRef, useCallback } from "react";

interface ThreadWeaveProps {
  /** 0→1 progress from the counter */
  progress: number;
  isVisible: boolean;
}

interface Thread {
  points: { x: number; y: number }[];
  color: string;
  width: number;
  speed: number;
  offset: number;
}

const THREAD_COLORS = [
  "hsl(24 95% 53%)",   // primary amber
  "hsl(30 90% 60%)",   // gold
  "hsl(340 50% 45%)",  // muted rose
  "hsl(200 50% 45%)",  // muted sky
  "hsl(160 40% 40%)",  // muted teal
  "hsl(270 40% 50%)",  // muted violet
  "hsl(45 70% 50%)",   // warm gold
  "hsl(20 85% 48%)",   // deep amber
];

const MAGNETIC_RADIUS = 120;
const MAGNETIC_STRENGTH = 18;
const GLOW_RADIUS = 150;

function generateThread(
  index: number,
  total: number,
  canvasW: number,
  canvasH: number
): Thread {
  const isHorizontal = index < total / 2;
  const points: { x: number; y: number }[] = [];
  const segments = 80;

  if (isHorizontal) {
    const baseY = (canvasH * (index + 1)) / (total / 2 + 1);
    for (let s = 0; s <= segments; s++) {
      const t = s / segments;
      const x = t * canvasW;
      const wave = Math.sin(t * Math.PI * (2 + index * 0.3)) * (20 + index * 8);
      const y = baseY + wave;
      points.push({ x, y });
    }
  } else {
    const vIdx = index - total / 2;
    const baseX = (canvasW * (vIdx + 1)) / (total / 2 + 1);
    for (let s = 0; s <= segments; s++) {
      const t = s / segments;
      const y = t * canvasH;
      const wave = Math.sin(t * Math.PI * (2 + vIdx * 0.4)) * (15 + vIdx * 6);
      const x = baseX + wave;
      points.push({ x, y });
    }
  }

  return {
    points,
    color: THREAD_COLORS[index % THREAD_COLORS.length],
    width: 0.8 + Math.random() * 0.8,
    speed: 0.3 + Math.random() * 0.4,
    offset: index * 0.12,
  };
}

/**
 * Canvas-based thread weave animation with magnetic cursor interaction.
 */
const ThreadWeave = ({ progress, isVisible }: ThreadWeaveProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const threadsRef = useRef<Thread[]>([]);
  const rafRef = useRef<number>(0);
  const timeRef = useRef(0);
  // Smoothed mouse position for organic feel
  const mouseRef = useRef<{ x: number; y: number } | null>(null);
  const smoothMouseRef = useRef<{ x: number; y: number } | null>(null);
  const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 2) : 1;

  const THREAD_COUNT = 14;

  const initThreads = useCallback((w: number, h: number) => {
    threadsRef.current = Array.from({ length: THREAD_COUNT }, (_, i) =>
      generateThread(i, THREAD_COUNT, w, h)
    );
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      initThreads(rect.width, rect.height);
    };

    resize();
    window.addEventListener("resize", resize);

    // Mouse tracking on parent container
    const parent = canvas.parentElement;
    const onMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };
    const onMouseLeave = () => {
      mouseRef.current = null;
    };

    parent?.addEventListener("mousemove", onMouseMove);
    parent?.addEventListener("mouseleave", onMouseLeave);

    const ctx = canvas.getContext("2d")!;

    const render = () => {
      timeRef.current += 0.016;
      const { width: w, height: h } = canvas;

      // Smooth interpolation of mouse position
      const target = mouseRef.current;
      if (target) {
        if (!smoothMouseRef.current) {
          smoothMouseRef.current = { ...target };
        } else {
          smoothMouseRef.current.x += (target.x - smoothMouseRef.current.x) * 0.08;
          smoothMouseRef.current.y += (target.y - smoothMouseRef.current.y) * 0.08;
        }
      } else if (smoothMouseRef.current) {
        // Fade out smoothly — keep last position but null after a bit
        smoothMouseRef.current = null;
      }

      const mouse = smoothMouseRef.current;

      ctx.clearRect(0, 0, w, h);
      ctx.save();
      ctx.scale(dpr, dpr);

      threadsRef.current.forEach((thread, ti) => {
        const threadProgress = Math.max(
          0,
          Math.min(1, (progress - thread.offset) / (1 - thread.offset))
        );
        if (threadProgress <= 0) return;

        const visiblePoints = Math.floor(threadProgress * thread.points.length);
        if (visiblePoints < 2) return;

        const pts = thread.points.slice(0, visiblePoints);

        // Compute displaced points if mouse is nearby
        let drawPts = pts;
        let closestDist = Infinity;

        if (mouse) {
          drawPts = pts.map((p) => {
            const dx = mouse.x - p.x;
            const dy = mouse.y - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < closestDist) closestDist = dist;
            if (dist > MAGNETIC_RADIUS || dist < 1) return p;
            const force = ((MAGNETIC_RADIUS - dist) / MAGNETIC_RADIUS);
            const ease = force * force; // quadratic ease for organic feel
            return {
              x: p.x + (dx / dist) * ease * MAGNETIC_STRENGTH,
              y: p.y + (dy / dist) * ease * MAGNETIC_STRENGTH,
            };
          });
        }

        // Brightness boost near cursor
        const proximityGlow = mouse && closestDist < GLOW_RADIUS
          ? 0.35 * (1 - closestDist / GLOW_RADIUS)
          : 0;

        const shimmer =
          threadProgress >= 1
            ? 0.3 + 0.15 * Math.sin(timeRef.current * thread.speed * 2 + ti) + proximityGlow
            : 0.2 + 0.1 * threadProgress;

        // Main thread stroke
        ctx.beginPath();
        ctx.strokeStyle = thread.color;
        ctx.lineWidth = thread.width + (proximityGlow > 0 ? proximityGlow * 1.5 : 0);
        ctx.globalAlpha = Math.min(shimmer, 0.85);
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        ctx.moveTo(drawPts[0].x, drawPts[0].y);
        for (let i = 1; i < drawPts.length - 1; i++) {
          const xc = (drawPts[i].x + drawPts[i + 1].x) / 2;
          const yc = (drawPts[i].y + drawPts[i + 1].y) / 2;
          ctx.quadraticCurveTo(drawPts[i].x, drawPts[i].y, xc, yc);
        }
        if (drawPts.length > 1) {
          ctx.lineTo(drawPts[drawPts.length - 1].x, drawPts[drawPts.length - 1].y);
        }
        ctx.stroke();

        // Glow layer — wider stroke near cursor or for primary threads
        const shouldGlow = (ti < 3 && threadProgress >= 1) || proximityGlow > 0.1;
        if (shouldGlow) {
          ctx.beginPath();
          ctx.strokeStyle = thread.color;
          ctx.lineWidth = thread.width + 4 + proximityGlow * 4;
          ctx.globalAlpha = 0.04 + 0.03 * Math.sin(timeRef.current + ti * 2) + proximityGlow * 0.12;
          ctx.moveTo(drawPts[0].x, drawPts[0].y);
          for (let i = 1; i < drawPts.length - 1; i++) {
            const xc = (drawPts[i].x + drawPts[i + 1].x) / 2;
            const yc = (drawPts[i].y + drawPts[i + 1].y) / 2;
            ctx.quadraticCurveTo(drawPts[i].x, drawPts[i].y, xc, yc);
          }
          ctx.lineTo(drawPts[drawPts.length - 1].x, drawPts[drawPts.length - 1].y);
          ctx.stroke();
        }

        ctx.globalAlpha = 1;

        // Intersection glows
        if (ti >= THREAD_COUNT / 2 && threadProgress >= 1) {
          threadsRef.current.slice(0, THREAD_COUNT / 2).forEach((hThread) => {
            for (let p = 0; p < Math.min(drawPts.length, hThread.points.length); p += 4) {
              const hp = hThread.points[Math.min(p, hThread.points.length - 1)];
              const vp = drawPts[Math.min(p, drawPts.length - 1)];
              const dx = hp.x - vp.x;
              const dy = hp.y - vp.y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              if (dist < 12) {
                const pulse = 0.15 + 0.1 * Math.sin(timeRef.current * 1.5 + p);
                const cursorBoost = mouse
                  ? Math.max(0, 1 - Math.sqrt((mouse.x - hp.x) ** 2 + (mouse.y - hp.y) ** 2) / GLOW_RADIUS) * 0.25
                  : 0;
                ctx.beginPath();
                ctx.arc(hp.x, hp.y, 3 + cursorBoost * 3, 0, Math.PI * 2);
                ctx.fillStyle = "hsl(24 95% 53%)";
                ctx.globalAlpha = pulse + cursorBoost;
                ctx.fill();
                ctx.globalAlpha = 1;
              }
            }
          });
        }
      });

      // Cursor glow halo
      if (mouse) {
        const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 60);
        gradient.addColorStop(0, "hsla(24, 95%, 53%, 0.06)");
        gradient.addColorStop(1, "hsla(24, 95%, 53%, 0)");
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 60, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.globalAlpha = 1;
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
  }, [progress, dpr, initThreads]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: isVisible ? 1 : 0, transition: "opacity 0.8s ease" }}
      aria-hidden="true"
    />
  );
};

export default ThreadWeave;
