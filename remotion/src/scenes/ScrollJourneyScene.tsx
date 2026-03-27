import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Img, staticFile } from "remotion";
import { BG, ACCENT, CREAM, SYNE, DM_SANS, GOLD } from "../MainVideo";

const screenshots = [
  { file: "ss-credibility.png", callout: "58,000+ creators trust us" },
  { file: "ss-whylevelup.png", callout: "Interactive design system" },
  { file: "ss-masterclasses.png", callout: "India's top mentors" },
  { file: "ss-community.png", callout: "Built for community" },
];

export const ScrollJourneyScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Each screenshot gets ~55 frames
  const segmentDuration = 55;

  return (
    <AbsoluteFill style={{ backgroundColor: BG }}>
      {screenshots.map((shot, i) => {
        const start = i * segmentDuration;
        const localFrame = frame - start;

        // Visibility window
        if (localFrame < -10 || localFrame > segmentDuration + 10) return null;

        // Enter from bottom with parallax
        const enterSpring = spring({
          frame: Math.max(0, localFrame),
          fps,
          config: { damping: 25, stiffness: 100 },
        });

        const y = interpolate(enterSpring, [0, 1], [400, 0]);
        const opacity = interpolate(localFrame, [0, 10, segmentDuration - 10, segmentDuration], [0, 1, 1, 0], {
          extrapolateRight: "clamp",
          extrapolateLeft: "clamp",
        });

        // Slight scale breathing
        const breathe = Math.sin(localFrame * 0.04) * 0.01 + 1;

        // Parallax drift
        const parallaxY = interpolate(localFrame, [0, segmentDuration], [15, -15], { extrapolateRight: "clamp" });

        // Callout text
        const calloutDelay = 15;
        const calloutSpring = spring({
          frame: Math.max(0, localFrame - calloutDelay),
          fps,
          config: { damping: 18 },
        });

        // Alternate sides
        const isLeft = i % 2 === 0;

        return (
          <AbsoluteFill key={i} style={{ opacity }}>
            {/* Screenshot */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: `translate(-50%, -50%) translateY(${y + parallaxY}px) scale(${breathe})`,
                width: 1400,
                borderRadius: 12,
                overflow: "hidden",
                boxShadow: `0 30px 80px -20px rgba(0,0,0,0.7), 0 0 40px ${ACCENT}10`,
              }}
            >
              <Img src={staticFile(`images/${shot.file}`)} style={{ width: "100%", display: "block" }} />
            </div>

            {/* Callout */}
            <div
              style={{
                position: "absolute",
                bottom: "10%",
                [isLeft ? "left" : "right"]: "8%",
                opacity: interpolate(calloutSpring, [0, 1], [0, 1]),
                transform: `translateX(${interpolate(calloutSpring, [0, 1], [isLeft ? -40 : 40, 0])}px)`,
              }}
            >
              <div
                style={{
                  fontFamily: SYNE,
                  fontSize: 28,
                  fontWeight: 700,
                  color: CREAM,
                  letterSpacing: "-0.02em",
                }}
              >
                {shot.callout}
              </div>
              <div
                style={{
                  width: interpolate(calloutSpring, [0, 1], [0, 120]),
                  height: 3,
                  background: ACCENT,
                  marginTop: 8,
                  borderRadius: 2,
                }}
              />
            </div>
          </AbsoluteFill>
        );
      })}
    </AbsoluteFill>
  );
};
