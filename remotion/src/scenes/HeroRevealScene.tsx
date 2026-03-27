import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Img, staticFile } from "remotion";
import { BG, ACCENT, CREAM, DM_SANS } from "../MainVideo";

export const HeroRevealScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Screenshot scales up from center
  const scaleSpring = spring({ frame: frame - 5, fps, config: { damping: 25, stiffness: 120 } });
  const imgScale = interpolate(scaleSpring, [0, 1], [0.7, 1]);
  const imgOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  // Slow parallax drift upward
  const drift = interpolate(frame, [0, 160], [20, -20], { extrapolateRight: "clamp" });

  // Glow callout around rotating words area
  const glowOpacity = interpolate(frame, [40, 55, 100, 120], [0, 0.7, 0.7, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const glowScale = interpolate(frame, [40, 70], [0.8, 1.1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  // Text callout
  const calloutSpring = spring({ frame: frame - 60, fps, config: { damping: 20 } });
  const calloutOpacity = interpolate(frame, [130, 155], [1, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: BG }}>
      {/* Browser mockup frame */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) scale(${imgScale}) translateY(${drift}px)`,
          opacity: imgOpacity,
          width: 1500,
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: `0 40px 100px -20px ${ACCENT}30, 0 20px 60px -20px rgba(0,0,0,0.8)`,
        }}
      >
        {/* Browser chrome bar */}
        <div
          style={{
            height: 36,
            background: "#1E1C1A",
            display: "flex",
            alignItems: "center",
            gap: 8,
            paddingLeft: 16,
          }}
        >
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#FF5F57" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#FFBD2E" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#28CA42" }} />
          <div
            style={{
              marginLeft: 20,
              background: "#0D0C0B",
              borderRadius: 6,
              padding: "4px 60px",
              fontSize: 12,
              color: "#888",
              fontFamily: "sans-serif",
            }}
          >
            leveluplearning.in
          </div>
        </div>

        <Img src={staticFile("images/ss-hero.png")} style={{ width: "100%", display: "block" }} />
      </div>

      {/* Glow callout on rotating word area */}
      <div
        style={{
          position: "absolute",
          top: "32%",
          left: "42%",
          width: 300,
          height: 80,
          borderRadius: 12,
          border: `2px solid ${ACCENT}`,
          opacity: glowOpacity,
          transform: `scale(${glowScale})`,
          boxShadow: `0 0 30px ${ACCENT}50, inset 0 0 20px ${ACCENT}20`,
        }}
      />

      {/* Text callout */}
      <div
        style={{
          position: "absolute",
          bottom: "8%",
          right: "8%",
          opacity: interpolate(calloutSpring, [0, 1], [0, 1]) * calloutOpacity,
          transform: `translateY(${interpolate(calloutSpring, [0, 1], [30, 0])}px)`,
        }}
      >
        <span
          style={{
            fontFamily: DM_SANS,
            fontSize: 22,
            color: CREAM,
            background: `${ACCENT}20`,
            padding: "8px 20px",
            borderRadius: 8,
            border: `1px solid ${ACCENT}40`,
            letterSpacing: "0.05em",
          }}
        >
          Dynamic word rotation ✦
        </span>
      </div>
    </AbsoluteFill>
  );
};
