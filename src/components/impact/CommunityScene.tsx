import { useState } from "react";
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

const CommunityScene = () => {
  const [labelVisible, setLabelVisible] = useState(false);

  return (
    <ImpactScene>
      <FadeInSection>
        <div className="relative flex flex-col items-center justify-end min-h-[280px] md:min-h-[380px] px-6 py-14 md:py-20">
          {/* Breathing mosaic background */}
          <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-0.5 opacity-40">
            {photos.map((photo, i) => (
              <div key={i} className="overflow-hidden animate-impact-photo-drift" style={{ animationDelay: `${i * 0.4}s` }}>
                <img src={photo} alt="" className="w-full h-full object-cover" loading="lazy" />
              </div>
            ))}
          </div>

          <div className="absolute inset-0" style={{ backgroundColor: "hsl(30 80% 45% / 0.25)", mixBlendMode: "multiply" }} />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

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
          </div>
        </div>
      </FadeInSection>
    </ImpactScene>
  );
};

export default CommunityScene;
