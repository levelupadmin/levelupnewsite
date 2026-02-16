import React from "react";

interface ConcentricRingsProps {
  className?: string;
  /** Number of rings */
  count?: number;
  /** Max size in px */
  size?: number;
}

const ConcentricRings: React.FC<ConcentricRingsProps> = ({
  className = "",
  count = 4,
  size = 400,
}) => (
  <div
    className={`absolute pointer-events-none select-none ${className}`}
    style={{ width: size, height: size }}
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

export default ConcentricRings;
