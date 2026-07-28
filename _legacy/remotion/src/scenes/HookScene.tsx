import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { SYNE, BG, ACCENT, CREAM } from "../MainVideo";

export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // "We rebuilt everything." — staggered word reveal
  const words = ["We", "rebuilt", "everything."];

  // Orange accent line draws across
  const lineProgress = interpolate(frame, [0, 38], [10, 100], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const lineOpacity = interpolate(frame, [0, 8, 72, 90], [0.4, 0.85, 0.85, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  // Whole scene fade out
  const sceneOpacity = interpolate(frame, [78, 90], [1, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: BG, opacity: sceneOpacity }}>
      {/* Orange accent line */}
      <div
        style={{
          position: "absolute",
          top: "48%",
          left: "10%",
          width: `${lineProgress * 0.8}%`,
          height: 3,
          background: `linear-gradient(90deg, ${ACCENT}, ${ACCENT}00)`,
          opacity: lineOpacity,
        }}
      />

      {/* Main text */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          gap: 28,
          alignItems: "baseline",
        }}
      >
        {words.map((word, i) => {
          const delay = i * 3;
          const s = spring({ frame: frame + 2 - delay, fps, config: { damping: 16, stiffness: 220 } });
          const y = interpolate(s, [0, 1], [24, 0]);
          const opacity = interpolate(s, [0, 1], [0.78, 1]);

          return (
            <span
              key={i}
              style={{
                fontFamily: SYNE,
                fontSize: word === "everything." ? 90 : 85,
                fontWeight: word === "everything." ? 800 : 400,
                color: word === "everything." ? ACCENT : CREAM,
                transform: `translateY(${y}px)`,
                opacity,
                display: "inline-block",
                letterSpacing: "-0.03em",
              }}
            >
              {word}
            </span>
          );
        })}
      </div>

      {/* Subtle bottom accent */}
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          left: "50%",
          transform: "translateX(-50%)",
          width: interpolate(frame, [30, 60], [0, 200], { extrapolateRight: "clamp", extrapolateLeft: "clamp" }),
          height: 1,
          background: `${ACCENT}40`,
          opacity: interpolate(frame, [30, 45, 70, 90], [0, 1, 1, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp" }),
        }}
      />
    </AbsoluteFill>
  );
};
