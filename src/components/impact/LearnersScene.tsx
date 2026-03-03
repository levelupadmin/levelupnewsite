import { useState } from "react";
import { m } from "framer-motion";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import ImpactScene from "./ImpactScene";
import community8 from "@/assets/community/community-8.jpg";

const PROGRAMS = [
  { name: "Breakthrough Filmmakers' Program", count: "18,400+" },
  { name: "Video Editing Academy", count: "12,200+" },
  { name: "UI/UX Design Academy", count: "9,800+" },
  { name: "Screenwriting Workshop", count: "8,600+" },
];

const LearnersScene = () => {
  const [done, setDone] = useState(false);

  return (
    <ImpactScene>
      <section className="relative flex flex-col items-center justify-center min-h-[340px] md:min-h-[460px] px-6 py-16 md:py-24 bg-background overflow-hidden">
        {/* Ken Burns background */}
        <div
          className="absolute inset-0 animate-ken-burns opacity-20"
          style={{
            backgroundImage: `url(${community8})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            mixBlendMode: "multiply",
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
        <div className="noise-overlay absolute inset-0 opacity-[0.06] pointer-events-none" />

        {/* Counter */}
        <div className="relative z-20 text-center">
          <p
            className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-semibold text-foreground tracking-tight leading-none whitespace-nowrap"
            style={{ textShadow: "0 0 28px hsl(var(--primary) / 0.35)" }}
          >
            <AnimatedCounter
              target={58746}
              hasComma
              celebrate
              onComplete={() => setDone(true)}
            />
          </p>
          <p className="text-sm md:text-lg text-foreground/70 mt-4 tracking-widest uppercase font-medium">
            paid learners
          </p>
        </div>

        {/* Program ticker */}
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
                  className="flex-shrink-0 flex items-center gap-2.5 px-4 py-2 rounded-xl bg-card/40 backdrop-blur-xl border border-border/50 hover:border-primary/40 transition-colors duration-300"
                >
                  <span className="text-[11px] font-medium text-foreground/85 whitespace-nowrap">
                    {p.name}
                  </span>
                  <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                    {p.count}
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
