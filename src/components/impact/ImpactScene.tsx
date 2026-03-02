import { type ReactNode, type CSSProperties } from "react";
import { useScrollReveal } from "@/components/FadeInSection";
import AccentLine from "@/components/AccentLine";

interface ImpactSceneProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Show accent line divider at top */
  showDivider?: boolean;
}

/**
 * Shared full-width scene wrapper for the immersive impact section.
 * Provides IntersectionObserver reveal, ambient glow, and film grain overlay.
 */
const ImpactScene = ({ children, className = "", style, showDivider = true }: ImpactSceneProps) => {
  const { ref, isVisible } = useScrollReveal(0.15);

  return (
    <div
      ref={ref}
      className={`relative w-full overflow-hidden ${className}`}
      style={{
        ...style,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(32px)",
        transition: "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {showDivider && <AccentLine />}

      {/* Film grain overlay */}
      <div className="noise-overlay absolute inset-0 opacity-[0.04] pointer-events-none z-[1]" />

      {/* Ambient radial glow */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: "radial-gradient(ellipse 70% 60% at 50% 50%, hsl(30 80% 45% / 0.08), transparent 70%)",
        }}
      />

      <div className="relative z-[2]">{children}</div>
    </div>
  );
};

export default ImpactScene;
