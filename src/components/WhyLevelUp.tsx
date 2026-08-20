import { useState } from "react";
import FadeInSection from "./FadeInSection";
import { ArrowRight, CheckCircle2, Layers3, Sparkles, UsersRound } from "lucide-react";
import ExpertMembershipCard from "./why-levelup/ExpertMembershipCard";
import LiveProjectsCard from "./why-levelup/LiveProjectsCard";
import CommunityCard from "./why-levelup/CommunityCard";

const features = [
  {
    eyebrow: "01 / Mentorship",
    title: "Expert Mentors",
    description:
      "Not theorists. Working filmmakers, editors, and writers who've shipped real work-and tell you what actually matters.",
    expandedDescription:
      "You don't need more tips. You need taste, reps, and honest direction. Our mentors are working creators-the kind who've built careers through real projects. They'll help you see what you're missing, and how to fix it.",
    bullets: [
      "Mentors with real credits (film + digital)",
      "Direct feedback on your work-not generic comments",
      "Craft-first teaching: story, rhythm, clarity, emotion",
    ],
    stat: "40+",
    statLabel: "working mentors",
    icon: Sparkles,
    illustration: ExpertMembershipCard,
  },
  {
    eyebrow: "02 / Output",
    title: "Portfolio-Driven Learning",
    description:
      "Every program ends with work you can show-edits, scenes, scripts, films. Proof over certificates.",
    expandedDescription:
      "Most learning stays in your notes. Ours ends up in your portfolio. We build the curriculum around outputs, so your progress is visible-and shareable.",
    bullets: [
      "Project-first structure (make while you learn)",
      "Deadlines that create momentum",
      "Portfolio outcomes: reels, edits, scripts, scenes, short films",
    ],
    stat: "200+",
    statLabel: "projects enabled",
    icon: Layers3,
    illustration: LiveProjectsCard,
  },
  {
    eyebrow: "03 / Continuity",
    title: "Community, Through the Journey",
    description:
      "Support, feedback, and momentum-before, during, and after you learn.",
    expandedDescription:
      "The work gets easier when you're not doing it alone. LevelUp is built with support baked in-feedback loops, peers, and mentors-so you keep moving even when motivation drops.",
    bullets: [
      "Feedback that keeps you sharp (work-in-progress encouraged)",
      "Peers who get it-editors, DPs, writers, creators",
      "Consistency support: prompts, reviews, accountability",
    ],
    stat: "2K+",
    statLabel: "active members",
    icon: UsersRound,
    illustration: CommunityCard,
  },
];

const WhyLevelUp = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeFeature = features[activeIndex];
  const ActiveIllustration = activeFeature.illustration;
  const ActiveIcon = activeFeature.icon;

  return (
    <section
      id="why-levelup"
      aria-label="Why choose LevelUp"
      className="relative scroll-mt-24 overflow-hidden bg-[hsl(22_14%_5%)] py-16 md:py-24"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_18%_18%,rgba(249,112,21,0.10),transparent_36%),radial-gradient(ellipse_at_82%_72%,rgba(255,255,255,0.045),transparent_34%)]" />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-6 md:px-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <FadeInSection className="lg:sticky lg:top-28 lg:self-start">
          <p className="font-sans-body text-xs font-semibold uppercase text-primary" style={{ letterSpacing: 0 }}>
            The LevelUp method
          </p>
          <h2 className="mt-4 max-w-xl font-serif-display text-4xl font-semibold text-hero-headline sm:text-5xl md:text-6xl" style={{ lineHeight: 1.02, letterSpacing: 0 }}>
            Where creators stop consuming and start building.
          </h2>
          <p className="mt-5 max-w-lg font-sans-body text-sm leading-relaxed text-white/58 md:text-base" style={{ letterSpacing: 0 }}>
            Mentors who've done the work. Projects that prove yours. A community that won't let you coast.
          </p>

          <div className="mt-8 overflow-hidden rounded-lg border border-white/10 bg-[linear-gradient(150deg,rgba(255,255,255,0.055),rgba(255,255,255,0.015))]">
            <div className="relative min-h-[310px] p-4 md:min-h-[380px] md:p-6">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/45 to-transparent" />
              <div className="absolute left-5 top-5 z-10 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/35 px-3 py-1.5 text-[11px] font-semibold uppercase text-white/65 backdrop-blur" style={{ letterSpacing: 0 }}>
                <ActiveIcon className="h-3.5 w-3.5 text-primary" />
                {activeFeature.stat} {activeFeature.statLabel}
              </div>
              <div className="flex h-full min-h-[280px] items-end justify-center overflow-hidden rounded-md bg-black/25 pt-14 md:min-h-[340px]">
                <ActiveIllustration />
              </div>
            </div>
          </div>
        </FadeInSection>

        <div className="space-y-3 md:space-y-4">
          {features.map((feature, index) => {
            const isActive = index === activeIndex;
            const Icon = feature.icon;

            return (
              <FadeInSection key={feature.title} delay={index * 90}>
                <button
                  type="button"
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                  aria-expanded={isActive}
                  className={`group w-full overflow-hidden rounded-lg border p-5 text-left transition-all duration-500 md:p-7 ${
                    isActive
                      ? "border-primary/40 bg-white/[0.055] shadow-[0_0_40px_-18px_hsl(24_95%_53%/0.75)]"
                      : "border-white/10 bg-white/[0.025] hover:border-white/20 hover:bg-white/[0.04]"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-md border transition-colors duration-300 ${
                      isActive ? "border-primary/35 bg-primary/10 text-primary" : "border-white/10 bg-black/20 text-white/45"
                    }`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-4">
                        <p className="font-sans-body text-[11px] font-semibold uppercase text-primary/80" style={{ letterSpacing: 0 }}>
                          {feature.eyebrow}
                        </p>
                        <ArrowRight className={`h-4 w-4 shrink-0 transition-transform duration-300 ${isActive ? "translate-x-1 text-primary" : "text-white/25 group-hover:text-white/45"}`} />
                      </div>
                      <h3 className="mt-2 whitespace-pre-line font-serif-display text-2xl font-semibold text-white md:text-3xl" style={{ lineHeight: 1.05, letterSpacing: 0 }}>
                        {feature.title}
                      </h3>
                      <p className="mt-3 max-w-xl font-sans-body text-sm leading-relaxed text-white/56 md:text-base" style={{ letterSpacing: 0 }}>
                        {isActive ? feature.expandedDescription : feature.description}
                      </p>

                      <div
                        className={`grid transition-all duration-500 ${
                          isActive ? "mt-5 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <div className="grid gap-3 sm:grid-cols-3">
                            {feature.bullets.map((bullet) => (
                              <div key={bullet} className="flex items-start gap-2 rounded-md border border-white/[0.08] bg-black/20 p-3">
                                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                                <span className="font-sans-body text-xs leading-relaxed text-white/66" style={{ letterSpacing: 0 }}>
                                  {bullet}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              </FadeInSection>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyLevelUp;
