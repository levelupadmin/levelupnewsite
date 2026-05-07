import { lazy, Suspense } from "react";
import { AnimatedCounter } from "./AnimatedCounter";
import FadeInSection from "./FadeInSection";

// Use the same StarField as the hero so the visual language is continuous
// from above-the-fold to the credibility row. Faster + denser parameters
// here so the section reads as more energetic than the calmer hero field.
const StarField = lazy(() => import("./StarField"));

const cues = [
  { value: "67,746+", numericValue: 67746, label: "Learners", suffix: "+", hasComma: true },
  { value: "4.86", numericValue: 4.86, label: "Rating (15,000+ reviews)", suffix: "", decimals: 2 },
  { value: "821+", numericValue: 821, label: "Cities", suffix: "+" },
  { value: "3,000+", numericValue: 3000, label: "Collaborations enabled", suffix: "+", hasComma: true },
];

const CredibilityCues = () => {
  return (
    <section
      id="credibility"
      aria-label="Key stats and credibility"
      className="relative pt-20 pb-12 md:pt-28 md:pb-16 overflow-hidden"
      style={{
        background: `var(--gradient-cinematic)`,
      }}
    >
      {/* Star field — continuation of the hero, but ~2.5x faster speed
          (0.75 vs 0.3 default) and slightly fewer stars (450 vs 750) so
          the row reads as more energetic without overwhelming the numbers. */}
      <Suspense fallback={null}>
        <StarField starCount={450} speed={0.75} />
      </Suspense>
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
          {cues.map((cue, i) => (
            <FadeInSection key={cue.label} delay={i * 100} className="text-center">
              <p className="inline-block font-serif-display text-2xl md:text-3xl lg:text-4xl font-medium text-white tracking-tight tabular-nums counter-celebrate">
                <AnimatedCounter
                  target={cue.numericValue}
                  suffix={cue.suffix}
                  hasComma={cue.hasComma}
                  decimals={cue.decimals}
                />
              </p>
              <p className="font-sans-body text-xs md:text-sm text-white/60 mt-2 tracking-wide">
                {cue.label}
              </p>
            </FadeInSection>
          ))}
        </div>

        <FadeInSection delay={400} className="font-sans-body text-sm md:text-base text-white/40 text-center mt-10 md:mt-12 max-w-md mx-auto leading-relaxed tracking-wide">
          From masterclasses to residencies, from community to career, every layer designed for the serious creator.
        </FadeInSection>
      </div>
    </section>
  );
};

export default CredibilityCues;
