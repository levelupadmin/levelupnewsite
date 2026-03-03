import { useState } from "react";
import { m } from "framer-motion";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import FadeInSection from "@/components/FadeInSection";
import ImpactScene from "./ImpactScene";
import community8 from "@/assets/community/community-8.jpg";

const PROGRAMS = [
  { name: "Breakfree Program", count: "12,400+" },
  { name: "Screenwriting Workshop", count: "8,200+" },
  { name: "Video Editing Bootcamp", count: "9,800+" },
  { name: "UI/UX Design Lab", count: "7,600+" },
  { name: "Cinematography Intensive", count: "5,400+" },
  { name: "Sound Design Course", count: "4,100+" },
  { name: "Direction Masterclass", count: "6,300+" },
  { name: "Acting Fundamentals", count: "4,900+" },
];

const LearnersScene = () => {
  const [done, setDone] = useState(false);

  return (
    <ImpactScene>
      <FadeInSection>
        <div className="relative flex flex-col items-center justify-center min-h-[320px] md:min-h-[440px] px-6 py-16 md:py-24 bg-primary overflow-hidden">
          {/* Ken Burns background */}
          <div
            className="absolute inset-0 animate-ken-burns opacity-15"
            style={{
              backgroundImage: `url(${community8})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              mixBlendMode: "multiply",
            }}
          />
          {/* Subtle vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 30%, hsl(24 95% 30% / 0.4) 100%)",
            }}
          />
          <div className="noise-overlay absolute inset-0 opacity-[0.05] pointer-events-none" />

          {/* Counter */}
          <div className="relative z-10 text-center">
            <p
              className={`text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-semibold text-primary-foreground tracking-tight leading-none ${done ? "text-shimmer" : ""}`}
            >
              <AnimatedCounter
                target={58746}
                hasComma
                celebrate
                onComplete={() => setDone(true)}
              />
            </p>
            <p className="text-sm md:text-lg text-primary-foreground/60 mt-4 tracking-widest uppercase font-medium">
              paid learners
            </p>
          </div>

          {/* Glass card ticker */}
          {done && (
            <m.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 mt-10 w-full max-w-2xl overflow-hidden
                [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]"
            >
              <div className="flex gap-3 animate-collab-ticker hover:[animation-play-state:paused]">
                {[...PROGRAMS, ...PROGRAMS].map((p, i) => (
                  <div
                    key={i}
                    className="flex-shrink-0 flex items-center gap-2.5 px-4 py-2 rounded-xl
                      bg-primary-foreground/10 backdrop-blur-xl border border-primary-foreground/10
                      hover:border-primary-foreground/20 transition-colors duration-300"
                  >
                    <span className="text-[11px] font-medium text-primary-foreground/80 whitespace-nowrap">
                      {p.name}
                    </span>
                    <span className="text-[10px] text-primary-foreground/40 whitespace-nowrap">
                      {p.count}
                    </span>
                  </div>
                ))}
              </div>
            </m.div>
          )}
        </div>
      </FadeInSection>
    </ImpactScene>
  );
};

export default LearnersScene;
