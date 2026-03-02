import { useState } from "react";
import { Star } from "lucide-react";
import { m } from "framer-motion";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import FadeInSection from "@/components/FadeInSection";
import ImpactScene from "./ImpactScene";

const reviews = [
  "\"Completely changed how I approach filmmaking.\"",
  "\"The mentors here are world-class. 10/10.\"",
  "\"Best investment I've made in my creative career.\"",
  "\"I learned more in 8 weeks than 4 years of college.\"",
];

const RatingScene = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <ImpactScene showDivider={false}>
      <FadeInSection>
        <div
          className="relative flex flex-col items-center justify-center min-h-[280px] md:min-h-[360px] px-6 py-16 md:py-20"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Background review scroll */}
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none opacity-[0.07]">
            <div className="animate-impact-review-scroll space-y-6 text-center">
              {[...reviews, ...reviews].map((r, i) => (
                <p key={i} className="text-lg md:text-2xl font-sans-body text-foreground whitespace-nowrap">{r}</p>
              ))}
            </div>
          </div>

          {/* Warm radial glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(circle at 50% 60%, hsl(30 90% 50% / 0.1), transparent 50%)" }}
          />

          {/* Stars */}
          <div className="flex items-center gap-2 mb-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <m.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{
                  delay: 0.2 + i * 0.15,
                  duration: 0.5,
                  type: "spring",
                  stiffness: 260,
                  damping: 15,
                }}
                style={hovered ? { animation: `star-pulse 0.8s ease-in-out ${i * 0.08}s infinite` } : undefined}
              >
                <Star
                  className="w-6 h-6 md:w-8 md:h-8"
                  style={{
                    fill: "hsl(var(--primary))",
                    color: "hsl(var(--primary))",
                    filter: "drop-shadow(0 0 8px hsl(30 90% 55% / 0.5))",
                  }}
                />
              </m.div>
            ))}
          </div>

          {/* Giant counter */}
          <p className="text-6xl md:text-8xl lg:text-9xl font-semibold text-foreground tracking-tight">
            <AnimatedCounter target={4.86} suffix="/5" decimals={2} celebrate />
          </p>
          <p className="text-sm md:text-base text-muted-foreground mt-3 tracking-wide">
            average rating across 9,000+ learners
          </p>
        </div>
      </FadeInSection>
    </ImpactScene>
  );
};

export default RatingScene;
