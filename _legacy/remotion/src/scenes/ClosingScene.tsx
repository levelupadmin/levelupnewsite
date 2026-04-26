import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { BG, ACCENT, CREAM, SYNE, DM_SANS, GOLD } from "../MainVideo";

export const ClosingScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Orange radial glow pulse
  const glowPulse = Math.sin(frame * 0.04) * 0.15 + 0.5;

  // Logo / brand name
  const logoSpring = spring({ frame: frame - 10, fps, config: { damping: 18, stiffness: 120 } });
  const logoScale = interpolate(logoSpring, [0, 1], [0.6, 1]);
  const logoOpacity = interpolate(logoSpring, [0, 1], [0, 1]);

  // Tagline
  const taglineSpring = spring({ frame: frame - 35, fps, config: { damping: 20 } });
  const taglineOpacity = interpolate(taglineSpring, [0, 1], [0, 1]);
  const taglineY = interpolate(taglineSpring, [0, 1], [30, 0]);

  // URL
  const urlSpring = spring({ frame: frame - 55, fps, config: { damping: 22 } });
  const urlOpacity = interpolate(urlSpring, [0, 1], [0, 1]);

  // Accent lines
  const lineWidth = interpolate(frame, [20, 70], [0, 300], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: BG }}>
      {/* Radial glow */}
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${ACCENT}${Math.round(glowPulse * 255 * 0.15).toString(16).padStart(2, "0")} 0%, transparent 60%)`,
        }}
      />

      {/* Brand name */}
      <div
        style={{
          position: "absolute",
          top: "38%",
          left: "50%",
          transform: `translate(-50%, -50%) scale(${logoScale})`,
          opacity: logoOpacity,
          textAlign: "center",
        }}
      >
        <span
          style={{
            fontFamily: SYNE,
            fontSize: 100,
            fontWeight: 800,
            letterSpacing: "-0.04em",
            color: CREAM,
          }}
        >
          Level
        </span>
        <span
          style={{
            fontFamily: SYNE,
            fontSize: 100,
            fontWeight: 800,
            letterSpacing: "-0.04em",
            color: ACCENT,
          }}
        >
          Up
        </span>
      </div>

      {/* Accent lines */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, 0)",
          width: lineWidth,
          height: 2,
          background: `linear-gradient(90deg, transparent, ${ACCENT}, transparent)`,
        }}
      />

      {/* Tagline */}
      <div
        style={{
          position: "absolute",
          top: "56%",
          left: "50%",
          transform: `translate(-50%, 0) translateY(${taglineY}px)`,
          opacity: taglineOpacity,
          textAlign: "center",
          width: "80%",
        }}
      >
        <div
          style={{
            fontFamily: SYNE,
            fontSize: 32,
            fontWeight: 500,
            color: CREAM,
            letterSpacing: "-0.01em",
            lineHeight: 1.4,
          }}
        >
          Where India's next great
        </div>
        <div
          style={{
            fontFamily: SYNE,
            fontSize: 32,
            fontWeight: 500,
            letterSpacing: "-0.01em",
            lineHeight: 1.4,
            background: `linear-gradient(135deg, ${ACCENT}, ${GOLD})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          creators are made
        </div>
      </div>

      {/* URL */}
      <div
        style={{
          position: "absolute",
          top: "72%",
          left: "50%",
          transform: "translate(-50%, 0)",
          opacity: urlOpacity,
        }}
      >
        <span
          style={{
            fontFamily: DM_SANS,
            fontSize: 24,
            fontWeight: 500,
            color: `${CREAM}90`,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          leveluplearning.in
        </span>
      </div>
    </AbsoluteFill>
  );
};
