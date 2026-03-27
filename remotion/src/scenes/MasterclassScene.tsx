import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Img, staticFile } from "remotion";
import { BG, ACCENT, CREAM, SYNE, GOLD, DM_SANS } from "../MainVideo";

export const MasterclassScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Image slides in from right
  const slideSpring = spring({ frame: frame - 5, fps, config: { damping: 22, stiffness: 100 } });
  const imgX = interpolate(slideSpring, [0, 1], [300, 0]);
  const imgOpacity = interpolate(slideSpring, [0, 1], [0, 1]);

  // Zoom into the hero image slightly over time
  const zoomScale = interpolate(frame, [20, 130], [1, 1.08], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  // Text: "Every page, crafted."
  const textSpring = spring({ frame: frame - 35, fps, config: { damping: 20 } });
  const textOpacity = interpolate(textSpring, [0, 1], [0, 1]);
  const textY = interpolate(textSpring, [0, 1], [40, 0]);

  // Scene fade out
  const fadeOut = interpolate(frame, [110, 130], [1, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: BG, opacity: fadeOut }}>
      {/* Masterclass screenshot */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "52%",
          transform: `translate(-50%, -50%) translateX(${imgX}px) scale(${zoomScale})`,
          opacity: imgOpacity,
          width: 1500,
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: `0 40px 100px -20px rgba(0,0,0,0.8), 0 0 60px ${ACCENT}15`,
        }}
      >
        <Img src={staticFile("images/ss-venketram.png")} style={{ width: "100%", display: "block" }} />
      </div>

      {/* Overlay text */}
      <div
        style={{
          position: "absolute",
          bottom: "12%",
          left: "8%",
          opacity: textOpacity,
          transform: `translateY(${textY}px)`,
        }}
      >
        <div
          style={{
            fontFamily: SYNE,
            fontSize: 56,
            fontWeight: 800,
            color: CREAM,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
          }}
        >
          Every page,
        </div>
        <div
          style={{
            fontFamily: SYNE,
            fontSize: 56,
            fontWeight: 800,
            color: ACCENT,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
          }}
        >
          crafted.
        </div>
        <div
          style={{
            width: interpolate(textSpring, [0, 1], [0, 160]),
            height: 3,
            background: `linear-gradient(90deg, ${ACCENT}, ${GOLD})`,
            marginTop: 16,
            borderRadius: 2,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
