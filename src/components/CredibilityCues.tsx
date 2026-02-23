import { AnimatedCounter } from "./AnimatedCounter";
import FadeInSection from "./FadeInSection";

const cues = [
  { value: "57,660+", numericValue: 57660, label: "Learners enrolled", suffix: "+", hasComma: true },
  { value: "4.85", numericValue: 4.85, label: "Rating (15,000+ reviews)", suffix: "", decimals: 2 },
  { value: "6+", numericValue: 6, label: "Masterclasses", suffix: "+" },
  { value: "20+", numericValue: 20, label: "Hours of content", suffix: "+" },
];

const CredibilityCues = () => {
  return (
    <section
      aria-label="Key stats and credibility"
      className="relative pt-20 pb-12 md:pt-28 md:pb-16"
      style={{
        background: `linear-gradient(to bottom, hsl(220 12% 7%) 0%, hsl(0 0% 4%) 100%)`,
      }}
    >
      {/* Subtle dot grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
          maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 75%)',
        }}
      />
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

        <FadeInSection delay={400} className="font-sans-body text-base text-white/40 text-center mt-10 md:mt-12 max-w-lg mx-auto leading-relaxed">
          From masterclasses to residencies, from community to career —
          <br className="hidden md:block" />
          every layer designed for the serious creator.
        </FadeInSection>
      </div>
    </section>
  );
};

export default CredibilityCues;
