import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { TransitionSeries, springTiming } from "@remotion/transitions";
import { wipe } from "@remotion/transitions/wipe";
import { fade } from "@remotion/transitions/fade";
import { loadFont as loadSyne } from "@remotion/google-fonts/Syne";
import { loadFont as loadDMSans } from "@remotion/google-fonts/DMSans";

import { HookScene } from "./scenes/HookScene";
import { HeroRevealScene } from "./scenes/HeroRevealScene";
import { ScrollJourneyScene } from "./scenes/ScrollJourneyScene";
import { MasterclassScene } from "./scenes/MasterclassScene";
import { ClosingScene } from "./scenes/ClosingScene";

const { fontFamily: syneFontFamily } = loadSyne();
const { fontFamily: dmSansFontFamily } = loadDMSans();

export const SYNE = syneFontFamily;
export const DM_SANS = dmSansFontFamily;
export const BG = "#141110";
export const ACCENT = "#F2720C";
export const GOLD = "#D4A853";
export const CREAM = "#EDEDED";

// Film grain overlay
const FilmGrain: React.FC = () => {
  const frame = useCurrentFrame();
  const seed = frame * 7919;
  return (
    <AbsoluteFill
      style={{
        background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' seed='${seed}'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        opacity: 0.022,
        mixBlendMode: "overlay",
      }}
    />
  );
};

// Ambient vignette
const Vignette: React.FC = () => {
  const frame = useCurrentFrame();
  const pulse = Math.sin(frame * 0.02) * 0.015 + 0.08;
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse 70% 60% at 50% 50%, transparent 45%, ${BG} 100%)`,
        opacity: 0.33 + pulse,
      }}
    />
  );
};

// Orange glow that persists
const AmbientGlow: React.FC = () => {
  const frame = useCurrentFrame();
  const drift = Math.sin(frame * 0.015) * 4;
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse 48% 36% at ${50 + drift}% 18%, ${ACCENT}12, transparent 72%)`,
      }}
    />
  );
};

export const MainVideo: React.FC = () => {
  // Transition durations
  const t1 = 20; // hook -> hero
  const t2 = 25; // hero -> scroll
  const t3 = 20; // scroll -> masterclass
  const t4 = 25; // masterclass -> closing

  return (
    <AbsoluteFill style={{ backgroundColor: BG }}>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={90}>
          <HookScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={springTiming({ config: { damping: 200 }, durationInFrames: t1 })}
        />

        <TransitionSeries.Sequence durationInFrames={160}>
          <HeroRevealScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={wipe({ direction: "from-bottom" })}
          timing={springTiming({ config: { damping: 200 }, durationInFrames: t2 })}
        />

        <TransitionSeries.Sequence durationInFrames={230}>
          <ScrollJourneyScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={springTiming({ config: { damping: 200 }, durationInFrames: t3 })}
        />

        <TransitionSeries.Sequence durationInFrames={130}>
          <MasterclassScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={springTiming({ config: { damping: 200 }, durationInFrames: t4 })}
        />

        <TransitionSeries.Sequence durationInFrames={200}>
          <ClosingScene />
        </TransitionSeries.Sequence>
      </TransitionSeries>

      {/* Persistent layers */}
      <AmbientGlow />
      <Vignette />
      <FilmGrain />
    </AbsoluteFill>
  );
};
