import { useRef, useEffect } from "react";

interface Star {
  x: number;
  y: number;
  z: number;
  sizeScale: number;
}

const DEFAULT_STAR_COUNT = 250;
const DEFAULT_MAX_DEPTH = 1000;
const DEFAULT_SPEED = 0.3;

// Cursor-magnetic tuning.
// MAGNETIC_RADIUS: how far (px) from the cursor a star starts deflecting.
// MAGNETIC_PULL: max screen-space deflection (px) at the cursor itself.
// IDLE_FADE_MS: how long after the cursor stops before the deflection has
//   decayed to zero, so stars return to their natural drift direction.
const MAGNETIC_RADIUS = 220;
const MAGNETIC_PULL = 28;
const IDLE_FADE_MS = 550;

interface StarFieldProps {
  starCount?: number;
  speed?: number;
}

const StarField = ({ starCount = DEFAULT_STAR_COUNT, speed = DEFAULT_SPEED }: StarFieldProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const grainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Cached dimensions to avoid layout thrashing
    let cachedW = 0;
    let cachedH = 0;
    let isVisible = true;

    // Cursor tracking. cursorX/Y are in canvas-local coordinates.
    // cursorActive is false until the user moves the pointer at least once
    // inside the hero — keeps the default behavior pure radial drift.
    let cursorX = 0;
    let cursorY = 0;
    let cursorActive = false;
    let lastMoveAt = 0;

    const reducedMotionMql =
      typeof window !== "undefined" && window.matchMedia
        ? window.matchMedia("(prefers-reduced-motion: reduce)")
        : null;
    let reducedMotion = !!reducedMotionMql?.matches;
    const onReducedMotionChange = (e: MediaQueryListEvent) => {
      reducedMotion = e.matches;
    };
    reducedMotionMql?.addEventListener?.("change", onReducedMotionChange);

    // Initialize stars
    const stars: Star[] = Array.from({ length: starCount }, () => ({
      x: (Math.random() - 0.5) * 2000,
      y: (Math.random() - 0.5) * 2000,
      z: Math.random() * DEFAULT_MAX_DEPTH,
      sizeScale: 0.5 + Math.random() * 0.8,
    }));

    // Grain canvas
    const grainCanvas = document.createElement("canvas");
    grainCanvas.width = 128;
    grainCanvas.height = 128;
    const grainCtx = grainCanvas.getContext("2d")!;
    let grainGenerated = false;

    const generateGrain = () => {
      if (grainGenerated) return;
      grainGenerated = true;
      const imageData = grainCtx.createImageData(128, 128);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const v = Math.random() * 255;
        data[i] = v;
        data[i + 1] = v;
        data[i + 2] = v;
        data[i + 3] = 18;
      }
      grainCtx.putImageData(imageData, 0, 0);
      if (grainRef.current) {
        grainRef.current.style.backgroundImage = `url(${grainCanvas.toDataURL()})`;
      }
    };

    const resize = () => {
      cachedW = canvas.clientWidth;
      cachedH = canvas.clientHeight;
      canvas.width = cachedW * dpr;
      canvas.height = cachedH * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    generateGrain();
    window.addEventListener("resize", resize);

    // Pointer tracking is on `window` so the hero gets cursor influence even
    // when the pointer is over content that sits above the canvas (the canvas
    // itself is pointer-events: none, so it can't capture moves directly).
    // We re-project window coords into canvas-local coords for distance math.
    const handlePointerMove = (e: PointerEvent) => {
      if (reducedMotion) return;
      const rect = canvas.getBoundingClientRect();
      const localX = e.clientX - rect.left;
      const localY = e.clientY - rect.top;
      // Only react if the pointer is over (or close to) the hero's bounding
      // box — avoids the hero "feeling" cursor activity from far down the page.
      if (
        localX < -40 ||
        localX > rect.width + 40 ||
        localY < -40 ||
        localY > rect.height + 40
      ) {
        cursorActive = false;
        return;
      }
      cursorX = localX;
      cursorY = localY;
      cursorActive = true;
      lastMoveAt = performance.now();
    };
    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    let raf: number;

    const render = () => {
      if (!isVisible) return;

      const w = cachedW;
      const h = cachedH;
      const cx = w / 2;
      const cy = h / 2;

      // Cursor influence decays after the pointer stops moving so stars
      // smoothly return to their pure radial drift. 1.0 right at a move,
      // 0.0 once IDLE_FADE_MS has elapsed since the last move.
      let cursorInfluence = 0;
      if (cursorActive && !reducedMotion) {
        const idle = performance.now() - lastMoveAt;
        cursorInfluence = Math.max(0, 1 - idle / IDLE_FADE_MS);
      }

      ctx.clearRect(0, 0, w, h);

      // Draw stars
      for (const star of stars) {
        star.z -= speed;
        if (star.z <= 1) {
          star.x = (Math.random() - 0.5) * 2000;
          star.y = (Math.random() - 0.5) * 2000;
          star.z = DEFAULT_MAX_DEPTH;
          star.sizeScale = 0.5 + Math.random() * 0.8;
        }

        const k = 300 / star.z;
        let sx = cx + star.x * k;
        let sy = cy + star.y * k;

        // Cursor-magnetic deflection (screen-space only — underlying x/y/z
        // are untouched, so the natural drift direction is preserved and
        // resumes the moment the pointer stops moving).
        if (cursorInfluence > 0) {
          const dx = cursorX - sx;
          const dy = cursorY - sy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > 0.01 && dist < MAGNETIC_RADIUS) {
            // Smooth falloff toward edge of radius (smoothstep-ish).
            const t = 1 - dist / MAGNETIC_RADIUS;
            const falloff = t * t * cursorInfluence;
            // Closer stars (lower z) get pulled harder so the deflection
            // reads as parallax depth rather than a flat field shift.
            const depthBias = 0.4 + (1 - star.z / DEFAULT_MAX_DEPTH) * 0.8;
            const pull = MAGNETIC_PULL * falloff * depthBias;
            sx += (dx / dist) * pull;
            sy += (dy / dist) * pull;
          }
        }

        if (sx < -10 || sx > w + 10 || sy < -10 || sy > h + 10) continue;

        const size = Math.max(0.5, (1 - star.z / DEFAULT_MAX_DEPTH) * 3.5) * star.sizeScale;
        const opacity = Math.max(0.1, (1 - star.z / DEFAULT_MAX_DEPTH) * 1);

        const isAmber = star.x * star.y % 5 < 1;
        const color = isAmber
          ? `rgba(230, 104, 29, ${opacity})`
          : `rgba(255, 255, 255, ${opacity})`;

        ctx.beginPath();
        ctx.arc(sx, sy, size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
      }

      // Vignette
      const vg = ctx.createRadialGradient(cx, cy, w * 0.3, cx, cy, w * 0.85);
      vg.addColorStop(0, "transparent");
      vg.addColorStop(1, "rgba(0, 0, 0, 0.4)");
      ctx.fillStyle = vg;
      ctx.fillRect(0, 0, w, h);

      raf = requestAnimationFrame(render);
    };

    raf = requestAnimationFrame(render);

    // Pause animation when off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !raf) {
          raf = requestAnimationFrame(render);
        }
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      reducedMotionMql?.removeEventListener?.("change", onReducedMotionChange);
      observer.disconnect();
    };
  }, [starCount, speed]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
      />
      <div
        ref={grainRef}
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{ backgroundRepeat: "repeat", mixBlendMode: "overlay", opacity: 0.4 }}
      />
    </>
  );
};

export default StarField;
