import { useEffect, useRef } from "react";

const PARTICLE_COUNT = 40;
const PROXIMITY = 80;
const REPEL_RADIUS = 120;
const REPEL_STRENGTH = 18;

interface Particle {
  x: number; y: number;
  baseX: number; baseY: number;
  radius: number;
  color: string;
  speed: number;
  phase: number;
  ampX: number; ampY: number;
}

function seededRandom(seed: number) {
  let s = seed;
  return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
}

function generateParticles(w: number, h: number): Particle[] {
  const rand = seededRandom(77);
  const particles: Particle[] = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const x = rand() * w;
    const y = rand() * h;
    const isAmber = rand() < 0.2;
    particles.push({
      x, y, baseX: x, baseY: y,
      radius: 1 + rand() * 2,
      color: isAmber ? "hsla(24, 95%, 58%, 1)" : "hsla(0, 0%, 100%, 1)",
      speed: 0.15 + rand() * 0.35,
      phase: rand() * Math.PI * 2,
      ampX: 10 + rand() * 20,
      ampY: 8 + rand() * 16,
    });
  }
  return particles;
}

const CredibilityParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef(0);
  const timeRef = useRef(0);
  const mouseRef = useRef<{ x: number; y: number } | null>(null);
  const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 2) : 1;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Cache dimensions to avoid forced reflow in render loop
    let cachedW = 0;
    let cachedH = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      cachedW = rect.width;
      cachedH = rect.height;
      canvas.width = cachedW * dpr;
      canvas.height = cachedH * dpr;
      particlesRef.current = generateParticles(cachedW, cachedH);
    };
    resize();
    window.addEventListener("resize", resize);

    const parent = canvas.parentElement;
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => { mouseRef.current = null; };
    parent?.addEventListener("mousemove", onMove);
    parent?.addEventListener("mouseleave", onLeave);

    const ctx = canvas.getContext("2d")!;

    const render = () => {
      timeRef.current += 0.016;
      const t = timeRef.current;
      const cw = cachedW * dpr;
      const ch = cachedH * dpr;
      const mouse = mouseRef.current;

      ctx.clearRect(0, 0, cw, ch);
      ctx.save();
      ctx.scale(dpr, dpr);

      const particles = particlesRef.current;

      // Update positions with drift
      const positions = particles.map((p) => {
        let x = p.baseX + Math.sin(t * p.speed + p.phase) * p.ampX;
        let y = p.baseY + Math.cos(t * p.speed * 0.7 + p.phase) * p.ampY;

        // Cursor repulsion
        if (mouse) {
          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < REPEL_RADIUS && dist > 1) {
            const force = ((REPEL_RADIUS - dist) / REPEL_RADIUS) ** 2;
            x += (dx / dist) * force * REPEL_STRENGTH;
            y += (dy / dist) * force * REPEL_STRENGTH;
          }
        }
        return { x, y };
      });

      // Proximity lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = positions[i], b = positions[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < PROXIMITY) {
            const alpha = (1 - dist / PROXIMITY) * 0.08;
            ctx.beginPath();
            ctx.strokeStyle = `hsla(24, 60%, 60%, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      particles.forEach((p, i) => {
        const pos = positions[i];
        const pulse = 0.6 + 0.4 * Math.sin(t * 1.2 + p.phase);

        // Glow
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, p.radius + 4, 0, Math.PI * 2);
        ctx.fillStyle = p.color.replace("1)", `${0.06 * pulse})`);
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color.replace("1)", `${0.5 + 0.3 * pulse})`);
        ctx.fill();
      });

      // Cursor glow
      if (mouse) {
        const g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 100);
        g.addColorStop(0, "hsla(24, 95%, 58%, 0.08)");
        g.addColorStop(0.5, "hsla(24, 95%, 58%, 0.03)");
        g.addColorStop(1, "hsla(24, 95%, 58%, 0)");
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 100, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      }

      ctx.restore();
      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      parent?.removeEventListener("mousemove", onMove);
      parent?.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, [dpr]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-30"
      style={{
        maskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
        WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
      }}
      aria-hidden="true"
    />
  );
};

export default CredibilityParticles;
