import { useState, useRef, useCallback } from "react";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import FadeInSection from "@/components/FadeInSection";
import ImpactScene from "./ImpactScene";

import community1 from "@/assets/community/community-1.png";
import community2 from "@/assets/community/community-2.png";
import community3 from "@/assets/community/community-3.png";
import community7 from "@/assets/community/community-7.jpg";
import community8 from "@/assets/community/community-8.jpg";
import community9 from "@/assets/community/community-9.jpg";
import community10 from "@/assets/community/community-10.jpg";
import community11 from "@/assets/community/community-11.jpg";
import community12 from "@/assets/community/community-12.jpg";

const photos = [community1, community2, community3, community7, community8, community9, community10, community11, community12];

// Grid positions for proximity calculation (3x3 grid, normalized 0-1)
const GRID_POSITIONS = [
  { rx: 1/6, ry: 1/6 }, { rx: 3/6, ry: 1/6 }, { rx: 5/6, ry: 1/6 },
  { rx: 1/6, ry: 3/6 }, { rx: 3/6, ry: 3/6 }, { rx: 5/6, ry: 3/6 },
  { rx: 1/6, ry: 5/6 }, { rx: 3/6, ry: 5/6 }, { rx: 5/6, ry: 5/6 },
];

const CommunityScene = () => {
  const [labelVisible, setLabelVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState<{ rx: number; ry: number } | null>(null);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMouse({
      rx: (e.clientX - rect.left) / rect.width,
      ry: (e.clientY - rect.top) / rect.height,
    });
  }, []);

  const getPhotoProximity = (index: number) => {
    if (!mouse) return 0;
    const pos = GRID_POSITIONS[index];
    const dx = mouse.rx - pos.rx;
    const dy = mouse.ry - pos.ry;
    const dist = Math.sqrt(dx * dx + dy * dy);
    return Math.max(0, 1 - dist / 0.45);
  };

  return (
    <ImpactScene>
      <FadeInSection>
        <div
          ref={containerRef}
          className="relative flex flex-col items-center justify-end min-h-[280px] md:min-h-[380px] px-6 py-14 md:py-20"
          onMouseMove={onMouseMove}
          onMouseLeave={() => setMouse(null)}
        >
          {/* Breathing mosaic background with cursor proximity reaction */}
          <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-0.5 opacity-40">
            {photos.map((photo, i) => {
              const proximity = getPhotoProximity(i);
              return (
                <div
                  key={i}
                  className="overflow-hidden animate-impact-photo-drift"
                  style={{
                    animationDelay: `${i * 0.4}s`,
                    filter: proximity > 0 ? `brightness(${1 + proximity * 0.4})` : undefined,
                    transform: proximity > 0 ? `scale(${1 + proximity * 0.06})` : undefined,
                    transition: "filter 0.3s ease-out, transform 0.4s ease-out",
                  }}
                >
                  <img src={photo} alt="" className="w-full h-full object-cover" loading="lazy" decoding="async" />
                </div>
              );
            })}
          </div>

          <div className="absolute inset-0" style={{ backgroundColor: "hsl(30 80% 45% / 0.25)", mixBlendMode: "multiply" }} />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

          {/* Cursor-tracking warm glow */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-500"
            style={{
              opacity: mouse ? 1 : 0,
              background: mouse
                ? `radial-gradient(circle at ${mouse.rx * 100}% ${mouse.ry * 100}%, hsl(30 90% 50% / 0.15), transparent 45%)`
                : undefined,
            }}
          />

          {/* Glow pulse */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div
              className="w-64 h-64 md:w-96 md:h-96 rounded-full animate-impact-glow-pulse"
              style={{ background: "radial-gradient(circle, hsl(30 90% 50% / 0.12), transparent 70%)" }}
            />
          </div>

          <div className="relative z-10 text-center">
            <p className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-semibold text-foreground tracking-tight">
              <AnimatedCounter target={300000} suffix="+" hasComma celebrate onComplete={() => setLabelVisible(true)} />
            </p>
            <p
              className="text-sm md:text-base text-muted-foreground mt-3 tracking-wide"
              style={{
                opacity: labelVisible ? 1 : 0,
                transform: labelVisible ? "translateY(0)" : "translateY(8px)",
                transition: "opacity 0.5s ease, transform 0.5s ease",
              }}
            >
              community
            </p>

            {/* Sub-stats: Cities, States, Countries */}
            <div
              className="flex items-center justify-center gap-6 md:gap-12 mt-6 md:mt-8"
              style={{
                opacity: labelVisible ? 1 : 0,
                transform: labelVisible ? "translateY(0)" : "translateY(8px)",
                transition: "opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s",
              }}
            >
              {[
                { target: 821, suffix: "+", label: "Cities" },
                { target: 28, suffix: "", label: "States" },
                { target: 13, suffix: "+", label: "Countries" },
              ].map((stat, i) => (
                <div key={stat.label} className="text-center group">
                  <p
                    className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight transition-transform duration-200 group-hover:scale-110"
                    style={{
                      background: "linear-gradient(180deg, hsl(var(--foreground)), hsl(var(--foreground) / 0.65))",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {labelVisible && (
                      <AnimatedCounter target={stat.target} suffix={stat.suffix} celebrate delay={i * 200} />
                    )}
                  </p>
                  <p className="text-[10px] md:text-xs text-muted-foreground/70 mt-1 tracking-wide uppercase transition-colors duration-200 group-hover:text-primary/60">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </FadeInSection>
    </ImpactScene>
  );
};

export default CommunityScene;
