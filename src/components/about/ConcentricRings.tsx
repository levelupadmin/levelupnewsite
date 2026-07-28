import React, { useRef, useEffect, useState } from "react";

interface ConcentricRingsProps {
  className?: string;
  count?: number;
  size?: number;
  /** Parallax drift speed multiplier (default 0.05) */
  drift?: number;
}

const ConcentricRings: React.FC<ConcentricRingsProps> = ({
  className = "",
  count = 4,
  size = 400,
  drift = 0.05,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let raf: number;
    const update = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const viewH = window.innerHeight;
        // -1 at top of viewport, +1 at bottom
        const ratio = (center / viewH - 0.5) * 2;
        setOffset(ratio * size * drift);
      }
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, [size, drift]);

  return (
    <div
      ref={ref}
      className={`absolute pointer-events-none select-none ${className}`}
      style={{
        width: size,
        height: size,
        transform: `translateY(${offset}px)`,
        willChange: "transform",
        transition: "transform 0.1s linear",
      }}
      aria-hidden="true"
    >
      {Array.from({ length: count }).map((_, i) => {
        const scale = 1 - i * (0.6 / count);
        const opacity = 0.12 + i * 0.04;
        return (
          <div
            key={i}
            className="absolute inset-0 rounded-full border-[2.5px] border-primary"
            style={{
              transform: `scale(${scale})`,
              opacity,
            }}
          />
        );
      })}
    </div>
  );
};

export default ConcentricRings;
