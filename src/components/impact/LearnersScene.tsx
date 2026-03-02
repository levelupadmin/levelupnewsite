import { useState } from "react";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import FadeInSection from "@/components/FadeInSection";
import ImpactScene from "./ImpactScene";
import community8 from "@/assets/community/community-8.jpg";

const programs = [
  "Breakfree Program", "Screenwriting Workshop", "Video Editing Bootcamp",
  "UI/UX Design Lab", "Cinematography Intensive", "Sound Design Course",
];

const LearnersScene = () => {
  const [done, setDone] = useState(false);

  return (
    <ImpactScene>
      <FadeInSection>
        <div className="relative flex flex-col items-center justify-center min-h-[280px] md:min-h-[380px] px-6 py-14 md:py-20 bg-primary overflow-hidden">
          <div
            className="absolute inset-0 animate-ken-burns opacity-20"
            style={{
              backgroundImage: `url(${community8})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              mixBlendMode: "multiply",
            }}
          />
          <div className="noise-overlay absolute inset-0 opacity-[0.06] pointer-events-none" />

          <div className="relative z-10 text-center">
            <p className={`text-6xl md:text-8xl lg:text-9xl font-semibold text-primary-foreground tracking-tight ${done ? "text-shimmer" : ""}`}>
              <AnimatedCounter target={58746} hasComma celebrate onComplete={() => setDone(true)} />
            </p>
            <p className="text-sm md:text-base text-primary-foreground/70 mt-3 tracking-wide">paid learners</p>
          </div>

          <div className="relative z-10 mt-8 overflow-hidden h-6">
            <div className="animate-impact-enrollment-ticker flex flex-col items-center">
              {[...programs, ...programs].map((p, i) => (
                <span key={i} className="text-xs text-primary-foreground/40 whitespace-nowrap h-6 flex items-center">{p}</span>
              ))}
            </div>
          </div>
        </div>
      </FadeInSection>
    </ImpactScene>
  );
};

export default LearnersScene;
