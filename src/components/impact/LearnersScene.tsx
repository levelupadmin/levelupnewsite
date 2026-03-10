import { useState, useRef, useCallback } from "react";
import { m } from "framer-motion";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import ImpactScene from "./ImpactScene";
import community8 from "@/assets/community/community-8.jpg";

const PROGRAMS = [
  { name: "Breakthrough Filmmakers' Program" },
  { name: "Video Editing Academy" },
  { name: "UI/UX Design Academy" },
  { name: "Screenwriting Workshop" },
  { name: "Karthik Subbaraj Masterclass" },
  { name: "Anthony Gonsalvez Masterclass" },
  { name: "Lokesh Kanagaraj Masterclass" },
  { name: "The Forge Filmmaking" },
  { name: "The Forge Writing Retreat" },
];

const LearnersScene = () => {
  const [done, setDone] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState<{ rx: number; ry: number; x: number; y: number } | null>(null);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMouse({
      rx: (e.clientX - rect.left) / rect.width,
      ry: (e.clientY - rect.top) / rect.height,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  return (
    <ImpactScene>
      <section
        ref={containerRef}
        className="relative flex flex-col items-center justify-center min-h-[340px] md:min-h-[460px] px-6 py-16 md:py-24 bg-background overflow-hidden"
        onMouseMove={onMouseMove}
        onMouseLeave={() => setMouse(null)}
      >
        {/* Ken Burns background with cursor parallax */}
        <div
          className="absolute inset-0 animate-ken-burns opacity-20"
          style={{
            backgroundImage: `url(${community8})`,
            backgroundSize: "cover",
            backgroundPosition: mouse
              ? `${50 + (mouse.rx - 0.5) * 4}% ${50 + (mouse.ry - 0.5) * 4}%`
              : "center",
            mixBlendMode: "multiply",
            transition: "background-position 0.4s ease-out",
          }}
        />

        {/* Warm cinematic vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 28%, hsl(var(--background) / 0.72) 100%)",
          }}
        />

        {/* Cursor-tracking glow */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500"
          style={{
            opacity: mouse ? 1 : 0,
            background: mouse
              ? `radial-gradient(circle at ${mouse.rx * 100}% ${mouse.ry * 100}%, hsl(24 95% 53% / 0.12), transparent 40%)`
              : undefined,
          }}
        />

        <div className="noise-overlay absolute inset-0 opacity-[0.06] pointer-events-none" />

        {/* Counter with dynamic text-shadow */}
        <div className="relative z-20 text-center">
          <p
            className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-semibold text-foreground tracking-tight leading-none whitespace-nowrap"
            style={{
              textShadow: mouse
                ? `0 0 ${28 + Math.max(0, 1 - Math.abs(mouse.rx - 0.5) * 2) * 20}px hsl(var(--primary) / ${0.3 + Math.max(0, 1 - Math.abs(mouse.rx - 0.5) * 2) * 0.2})`
                : "0 0 28px hsl(var(--primary) / 0.35)",
              transition: "text-shadow 0.3s ease-out",
            }}
          >
            <AnimatedCounter
              target={58746}
              hasComma
              celebrate
              onComplete={() => setDone(true)}
            />
          </p>
          <p className="text-sm md:text-lg text-foreground/70 mt-4 tracking-widest uppercase font-medium">
            graduated learners
          </p>
        </div>

        {/* Program ticker with hover glow cards */}
        {done && (
          <m.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-20 mt-10 w-full max-w-2xl overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]"
          >
            <div className="flex gap-3 animate-collab-ticker hover:[animation-play-state:paused]">
              {[...PROGRAMS, ...PROGRAMS].map((p, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 flex items-center gap-2.5 px-4 py-2 rounded-xl
                    bg-card/40 backdrop-blur-xl border border-border/50
                    hover:border-primary/40 hover:shadow-[0_0_16px_-4px_hsl(24_95%_53%/0.2)]
                    transition-all duration-300 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary/80 transition-colors duration-300" />
                  <span className="text-[11px] font-medium text-foreground/85 whitespace-nowrap">
                    {p.name}
                  </span>
                </div>
              ))}
            </div>
          </m.div>
        )}
      </section>
    </ImpactScene>
  );
};

export default LearnersScene;
