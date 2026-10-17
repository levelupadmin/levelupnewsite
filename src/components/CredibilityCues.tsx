import { AnimatedCounter } from "./AnimatedCounter";
import FadeInSection from "./FadeInSection";
import CredibilityParticles from "./CredibilityParticles";
import reviewStats from "@/data/reviewStats.json";

/**
 * The rating and its review count are computed from the reviews we actually
 * publish, not typed in. Anyone can open /reviews and count them. The old
 * "4.86 / 15,000+ reviews" line could not be checked against anything, which
 * is the sort of claim an answer engine calls out.
 */
const cues = [
  { value: "67,746+", numericValue: 67746, label: "Learners", suffix: "+", hasComma: true },
  {
    value: reviewStats.average.toFixed(1),
    numericValue: reviewStats.average,
    label: `Rating (${reviewStats.count.toLocaleString("en-US")} published reviews)`,
    suffix: "",
    decimals: 1,
    href: "/reviews/",
  },
  { value: "821+", numericValue: 821, label: "Cities", suffix: "+" },
  { value: "3,000+", numericValue: 3000, label: "Collaborations enabled", suffix: "+", hasComma: true },
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
                {cue.href ? (
                  <a
                    href={cue.href}
                    className="underline decoration-white/20 underline-offset-4 transition-colors hover:text-white/85 hover:decoration-white/50"
                  >
                    {cue.label}
                  </a>
                ) : (
                  cue.label
                )}
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
