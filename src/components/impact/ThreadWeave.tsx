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
 * Canvas-based thread weave animation.
 * Threads draw in as the counter progresses, then gently shimmer.
 */
const ThreadWeave = ({ progress, isVisible }: ThreadWeaveProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const threadsRef = useRef<Thread[]>([]);
  const rafRef = useRef<number>(0);
  const timeRef = useRef(0);
  const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 2) : 1;

  const THREAD_COUNT = 14;

  // Initialize threads
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

    const ctx = canvas.getContext("2d")!;

    const render = () => {
      timeRef.current += 0.016;
      const { width: w, height: h } = canvas;

      ctx.clearRect(0, 0, w, h);
      ctx.save();
      ctx.scale(dpr, dpr);

      const logicalW = w / dpr;
      const logicalH = h / dpr;

      threadsRef.current.forEach((thread, ti) => {
        const threadProgress = Math.max(
          0,
          Math.min(1, (progress - thread.offset) / (1 - thread.offset))
        );
        if (threadProgress <= 0) return;

        const visiblePoints = Math.floor(threadProgress * thread.points.length);
        if (visiblePoints < 2) return;

        // Shimmer: subtle brightness oscillation after drawn
        const shimmer =
          threadProgress >= 1
            ? 0.3 + 0.15 * Math.sin(timeRef.current * thread.speed * 2 + ti)
            : 0.2 + 0.1 * threadProgress;

        ctx.beginPath();
        ctx.strokeStyle = thread.color;
        ctx.lineWidth = thread.width;
        ctx.globalAlpha = shimmer;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        // Draw with smooth curves
        const pts = thread.points.slice(0, visiblePoints);
        ctx.moveTo(pts[0].x, pts[0].y);
        for (let i = 1; i < pts.length - 1; i++) {
          const xc = (pts[i].x + pts[i + 1].x) / 2;
          const yc = (pts[i].y + pts[i + 1].y) / 2;
          ctx.quadraticCurveTo(pts[i].x, pts[i].y, xc, yc);
        }
        if (pts.length > 1) {
          ctx.lineTo(pts[pts.length - 1].x, pts[pts.length - 1].y);
        }
        ctx.stroke();

        // Glow layer for primary threads
        if (ti < 3 && threadProgress >= 1) {
          ctx.beginPath();
          ctx.strokeStyle = thread.color;
          ctx.lineWidth = thread.width + 3;
          ctx.globalAlpha = 0.04 + 0.03 * Math.sin(timeRef.current + ti * 2);
          ctx.moveTo(pts[0].x, pts[0].y);
          for (let i = 1; i < pts.length - 1; i++) {
            const xc = (pts[i].x + pts[i + 1].x) / 2;
            const yc = (pts[i].y + pts[i + 1].y) / 2;
            ctx.quadraticCurveTo(pts[i].x, pts[i].y, xc, yc);
          }
          ctx.lineTo(pts[pts.length - 1].x, pts[pts.length - 1].y);
          ctx.stroke();
        }

        ctx.globalAlpha = 1;

        // Draw intersection glows where horizontal meets vertical threads
        if (ti >= THREAD_COUNT / 2 && threadProgress >= 1) {
          threadsRef.current.slice(0, THREAD_COUNT / 2).forEach((hThread) => {
            // Find approximate intersection
            for (let p = 0; p < Math.min(pts.length, hThread.points.length); p += 4) {
              const hp = hThread.points[Math.min(p, hThread.points.length - 1)];
              const vp = pts[Math.min(p, pts.length - 1)];
              const dx = hp.x - vp.x;
              const dy = hp.y - vp.y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              if (dist < 12) {
                const pulse = 0.15 + 0.1 * Math.sin(timeRef.current * 1.5 + p);
                ctx.beginPath();
                ctx.arc(hp.x, hp.y, 3, 0, Math.PI * 2);
                ctx.fillStyle = "hsl(24 95% 53%)";
                ctx.globalAlpha = pulse;
                ctx.fill();
                ctx.globalAlpha = 1;
              }
            }
          });
        }
      });

      ctx.restore();
      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [progress, dpr, initThreads]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: isVisible ? 1 : 0, transition: "opacity 0.8s ease" }}
      aria-hidden="true"
    />
  );
};

export default ThreadWeave;
