import { AnimatedCounter } from "./AnimatedCounter";
import FadeInSection from "./FadeInSection";
import CredibilityParticles from "./CredibilityParticles";
import { BookOpen, Clapperboard, Compass } from "lucide-react";

const cues = [
  { value: "67,746+", numericValue: 67746, label: "Learners", suffix: "+", hasComma: true },
  { value: "4.86", numericValue: 4.86, label: "Rating (15,000+ reviews)", suffix: "", decimals: 2 },
  { value: "821+", numericValue: 821, label: "Cities", suffix: "+" },
  { value: "3,000+", numericValue: 3000, label: "Collaborations enabled", suffix: "+", hasComma: true },
];

const pathways = [
  {
    icon: BookOpen,
    title: "Masterclasses",
    label: "Learn the craft",
    copy: "Cinematic, in-depth courses you can start today and revisit forever.",
  },
  {
    icon: Clapperboard,
    title: "LevelUp Live",
    label: "Build in public",
    copy: "Mentor-led cohorts with feedback, deadlines, real projects, and placement support.",
  },
  {
    icon: Compass,
    title: "The Forge",
    label: "Go immersive",
    copy: "Offline residencies where travel, community, and hands-on creation become one experience.",
  },
];

const CredibilityCues = () => {
  return (
    <section
      id="credibility"
      aria-label="Key stats and credibility"
      className="relative overflow-hidden py-16 md:py-24"
      style={{
        background: `var(--gradient-cinematic)`,
      }}
    >
      <CredibilityParticles />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <FadeInSection>
            <p className="font-sans-body text-xs font-semibold uppercase text-primary" style={{ letterSpacing: 0 }}>
              The ecosystem, in motion
            </p>
            <h2 className="mt-4 max-w-xl font-serif-display text-3xl font-semibold leading-tight text-hero-headline sm:text-4xl md:text-5xl" style={{ letterSpacing: 0 }}>
              From first lesson to first body of work.
            </h2>
            <p className="mt-5 max-w-xl font-sans-body text-sm leading-relaxed text-white/55 md:text-base" style={{ letterSpacing: 0 }}>
              From masterclasses to residencies, from community to career, every layer is designed for the serious creator.
            </p>
          </FadeInSection>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {cues.map((cue, i) => (
              <FadeInSection key={cue.label} delay={i * 80}>
                <div className="h-full rounded-lg border border-white/10 bg-white/[0.035] p-4 backdrop-blur-sm transition-colors duration-300 hover:border-primary/30">
                  <p className="inline-block font-serif-display text-2xl font-semibold text-white tabular-nums counter-celebrate md:text-3xl" style={{ letterSpacing: 0 }}>
                    <AnimatedCounter
                      target={cue.numericValue}
                      suffix={cue.suffix}
                      hasComma={cue.hasComma}
                      decimals={cue.decimals}
                    />
                  </p>
                  <p className="mt-2 font-sans-body text-xs leading-snug text-white/55" style={{ letterSpacing: 0 }}>
                    {cue.label}
                  </p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-3 md:grid-cols-3 md:gap-4">
          {pathways.map((pathway, i) => (
            <FadeInSection key={pathway.title} delay={220 + i * 80}>
              <div className="group relative h-full overflow-hidden rounded-lg border border-white/10 bg-[linear-gradient(150deg,rgba(255,255,255,0.055),rgba(255,255,255,0.018))] p-5">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-primary/25 bg-primary/10 text-primary">
                    <pathway.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-sans-body text-xs uppercase text-white/45" style={{ letterSpacing: 0 }}>
                      {pathway.label}
                    </p>
                    <h3 className="mt-1 font-serif-display text-xl font-semibold text-white" style={{ letterSpacing: 0 }}>
                      {pathway.title}
                    </h3>
                    <p className="mt-3 font-sans-body text-sm leading-relaxed text-white/55" style={{ letterSpacing: 0 }}>
                      {pathway.copy}
                    </p>
                  </div>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CredibilityCues;
