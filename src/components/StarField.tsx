import { useRef, useEffect } from "react";

interface Star {
  x: number;
  y: number;
  z: number;
}

const DEFAULT_STAR_COUNT = 250;
const DEFAULT_MAX_DEPTH = 1000;
const DEFAULT_SPEED = 0.3;

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

    // Initialize stars
    const stars: Star[] = Array.from({ length: starCount }, () => ({
      x: (Math.random() - 0.5) * 2000,
      y: (Math.random() - 0.5) * 2000,
      z: Math.random() * DEFAULT_MAX_DEPTH,
    }));

    // Grain canvas
    const grainCanvas = document.createElement("canvas");
    grainCanvas.width = 128;
    grainCanvas.height = 128;
    const grainCtx = grainCanvas.getContext("2d")!;
    let grainFrame = 0;

    const generateGrain = () => {
      const imageData = grainCtx.createImageData(128, 128);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const v = Math.random() * 255;
        data[i] = v;
        data[i + 1] = v;
        data[i + 2] = v;
        data[i + 3] = 32; // ~12.5% opacity
      }
      grainCtx.putImageData(imageData, 0, 0);
      if (grainRef.current) {
        grainRef.current.style.backgroundImage = `url(${grainCanvas.toDataURL()})`;
      }
    };

    const resize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    generateGrain();
    window.addEventListener("resize", resize);

    let raf: number;

    const render = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const cx = w / 2;
      const cy = h / 2;

      ctx.clearRect(0, 0, w, h);

      // Draw stars
      for (const star of stars) {
        star.z -= speed;
        if (star.z <= 1) {
          star.x = (Math.random() - 0.5) * 2000;
          star.y = (Math.random() - 0.5) * 2000;
          star.z = DEFAULT_MAX_DEPTH;
        }

        const k = 300 / star.z;
        const sx = cx + star.x * k;
        const sy = cy + star.y * k;

        if (sx < -10 || sx > w + 10 || sy < -10 || sy > h + 10) continue;

        const size = Math.max(0.5, (1 - star.z / DEFAULT_MAX_DEPTH) * 3.5);
        const opacity = Math.max(0.1, (1 - star.z / DEFAULT_MAX_DEPTH) * 1);

        // ~20% of stars get an amber tint
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

      // Regenerate grain every ~3 frames
      grainFrame++;
      if (grainFrame % 3 === 0) generateGrain();

      raf = requestAnimationFrame(render);
    };

    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

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
        style={{ backgroundRepeat: "repeat", mixBlendMode: "overlay", opacity: 0.6 }}
      />
    </>
  );
};

export default StarField;
