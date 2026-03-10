import { AnimatedCounter } from "./AnimatedCounter";
import FadeInSection from "./FadeInSection";
import CredibilityParticles from "./CredibilityParticles";

const cues = [
  { value: "58,746+", numericValue: 58746, label: "Graduated Learners", suffix: "+", hasComma: true },
  { value: "4.86", numericValue: 4.86, label: "Rating (15,000+ reviews)", suffix: "", decimals: 2 },
  { value: "821+", numericValue: 821, label: "Cities", suffix: "+" },
  { value: "3,000+", numericValue: 3000, label: "Collaborations", suffix: "+", hasComma: true },
];

const CredibilityCues = () => {
  return (
    <section
      id="credibility"
      aria-label="Key stats and credibility"
      className="relative pt-20 pb-12 md:pt-28 md:pb-16"
      style={{
        background: `var(--gradient-cinematic)`,
      }}
    >
      <CredibilityParticles />
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
