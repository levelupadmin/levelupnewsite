import { useState } from "react";
import { Handshake } from "lucide-react";
import { m } from "framer-motion";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import FadeInSection from "@/components/FadeInSection";
import ImpactScene from "./ImpactScene";
import NetworkGraph from "./NetworkGraph";

const CollaborationsScene = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <ImpactScene>
      <FadeInSection>
        <div
          className="relative flex flex-col items-center justify-center min-h-[280px] md:min-h-[380px] px-6 py-14 md:py-20"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Network graph background */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-60">
            <div className="w-full max-w-xl">
              <NetworkGraph isVisible />
            </div>
          </div>

          {/* Handshake icon */}
          <m.div
            key={hovered ? "hover" : "idle"}
            initial={{ rotate: 0 }}
            animate={
              hovered
                ? { rotate: [0, -12, 10, -8, 6, -3, 0], transition: { duration: 0.8, ease: [0.36, 0.07, 0.19, 0.97] } }
                : undefined
            }
            className="relative z-10 mb-4"
          >
            <Handshake className="w-10 h-10 md:w-14 md:h-14 text-primary" />
          </m.div>

          <div className="relative z-10 text-center">
            <p className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-semibold text-foreground tracking-tight">
              <AnimatedCounter target={3000} suffix="+" hasComma celebrate />
            </p>
            <p className="text-sm md:text-base text-muted-foreground mt-3 tracking-wide">
              collaborations enabled
            </p>
          </div>
        </div>
      </FadeInSection>
    </ImpactScene>
  );
};

export default CollaborationsScene;
