import { AnimatedCounter } from "@/components/AnimatedCounter";
import IndiaDotsMap from "@/components/IndiaDotsMap";
import ImpactScene from "./ImpactScene";
import { useScrollReveal } from "@/components/FadeInSection";

const GeoReachScene = () => {
  const { ref, isVisible } = useScrollReveal(0.15);

  return (
    <ImpactScene>
      <div
        ref={ref}
        className="relative flex flex-col items-center justify-center min-h-[320px] md:min-h-[420px] px-6 py-14 md:py-20"
      >
        {/* Full-width India map */}
        <div className="w-full max-w-2xl mx-auto opacity-80">
          <IndiaDotsMap isHovered={isVisible} />
        </div>

        {/* Major city pings */}
        {isVisible && (
          <div className="absolute inset-0 pointer-events-none">
            {[
              { top: "32%", left: "38%" },  // Mumbai
              { top: "25%", left: "50%" },  // Delhi
              { top: "42%", left: "55%" },  // Kolkata
              { top: "56%", left: "48%" },  // Bangalore
              { top: "58%", left: "55%" },  // Chennai
            ].map((pos, i) => (
              <div
                key={i}
                className="absolute w-3 h-3 animate-impact-city-ping"
                style={{ ...pos, animationDelay: `${0.5 + i * 0.3}s` }}
              >
                <div className="w-full h-full rounded-full bg-primary/60" />
              </div>
            ))}
          </div>
        )}

        {/* Stats overlay */}
        <div className="relative z-10 flex items-center gap-8 md:gap-16 mt-8 md:mt-10">
          <div className="text-center">
            <p className="text-4xl md:text-6xl font-semibold text-foreground tracking-tight">
              <AnimatedCounter target={821} celebrate />
            </p>
            <p className="text-xs md:text-sm text-muted-foreground mt-1">cities</p>
          </div>
          <div className="w-px h-12 bg-border" />
          <div className="text-center">
            <p className="text-4xl md:text-6xl font-semibold text-foreground tracking-tight">
              <AnimatedCounter target={13} suffix="+" celebrate delay={400} />
            </p>
            <p className="text-xs md:text-sm text-muted-foreground mt-1">countries</p>
          </div>
        </div>
      </div>
    </ImpactScene>
  );
};

export default GeoReachScene;
