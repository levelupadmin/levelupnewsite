import { type ReactNode, type CSSProperties } from "react";
import AccentLine from "@/components/AccentLine";

interface ImpactSceneProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  showDivider?: boolean;
}

/**
 * Shared full-width scene wrapper — provides ambient glow and film grain.
 * Visibility is NOT handled here; each scene manages its own reveal
 * to avoid double-observer issues.
 */
const ImpactScene = ({ children, className = "", style, showDivider = true }: ImpactSceneProps) => (
  <div className={`relative w-full overflow-hidden ${className}`} style={style}>
    {showDivider && <AccentLine />}
    <div className="noise-overlay absolute inset-0 opacity-[0.04] pointer-events-none z-[1]" />
    <div
      className="absolute inset-0 pointer-events-none z-0"
      style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%, hsl(30 80% 45% / 0.08), transparent 70%)" }}
    />
    <div className="relative z-[2]">{children}</div>
  </div>
);

export default ImpactScene;
