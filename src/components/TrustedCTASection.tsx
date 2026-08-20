import FadeInSection from "./FadeInSection";
import { Picture } from "@/components/Picture";
import allMastersNewImg from "@/assets/all-masters-new.png";
import { ArrowRight, BookOpen, Clapperboard, Compass, Sparkles } from "lucide-react";
import { trackCTAClick } from "@/lib/clarity";
import MagneticButton from "@/components/MagneticButton";
import AccentLine from "./AccentLine";

import outlookLogo from "@/assets/press/outlook-india.svg";
import quintLogo from "@/assets/press/the-quint.svg";
import htLogo from "@/assets/press/hindustan-times.svg";
import yourstoryLogo from "@/assets/press/yourstory.svg";
import abnLogo from "@/assets/press/abn-telugu.svg";

const pressLogos = [
  { name: "Outlook India", src: outlookLogo },
  { name: "The Quint", src: quintLogo },
  { name: "Hindustan Times", src: htLogo },
  { name: "YourStory", src: yourstoryLogo },
  { name: "ABN", src: abnLogo },
];

const disciplines = ["Filmmaking", "Photography", "Editing", "Music", "Writing", "Design"];

const nextSteps = [
  {
    icon: BookOpen,
    title: "Start with a masterclass",
    copy: "Learn from India's best at your own pace.",
    href: "#masterclasses",
    cta: "Explore masterclasses",
  },
  {
    icon: Clapperboard,
    title: "Join a live cohort",
    copy: "Build real work with mentor feedback.",
    href: "#live-programs",
    cta: "See live cohorts",
  },
  {
    icon: Compass,
    title: "Apply for The Forge",
    copy: "Go offline, immersive, and all-in.",
    href: "#forge",
    cta: "View residencies",
  },
];

const TrustedCTASection = () => {
  return (
    <section id="trusted-cta" className="relative scroll-mt-24 overflow-hidden bg-background py-16 md:py-24">
      <AccentLine gradient="linear-gradient(90deg, transparent 20%, hsl(38 75% 55% / 0.5) 50%, transparent 80%)" className="left-1/2 right-auto w-48 -translate-x-1/2" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(249,112,21,0.16),transparent_42%),linear-gradient(to_bottom,rgba(255,255,255,0.025),transparent)]" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-12">
        <FadeInSection>
          <div className="grid overflow-hidden rounded-lg border border-white/10 bg-[hsl(22_14%_5%)] lg:grid-cols-[0.96fr_1.04fr]">
            <div className="relative min-h-[420px] overflow-hidden border-b border-white/10 lg:border-b-0 lg:border-r">
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              <Picture
                alt="LevelUp's master instructors"
                className="absolute inset-x-0 bottom-0 mx-auto h-full w-full object-contain object-bottom p-4 md:p-8"
                width={1080}
                height={810}
                loading="lazy"
                src={allMastersNewImg}
              />
              <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/35 px-3 py-1.5 font-sans-body text-[11px] font-semibold uppercase text-white/70 backdrop-blur" style={{ letterSpacing: 0 }}>
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                Trusted by India's best
              </div>
            </div>

            <div className="p-5 md:p-8 lg:p-10">
              <p className="font-sans-body text-xs font-semibold uppercase text-primary" style={{ letterSpacing: 0 }}>
                Choose your first move
              </p>
              <h2 className="mt-4 max-w-2xl font-serif-display text-4xl font-semibold text-white sm:text-5xl md:text-6xl" style={{ lineHeight: 1.02, letterSpacing: 0 }}>
                From first shot to first paycheck - and beyond.
              </h2>

              <div className="mt-6 flex flex-wrap gap-2">
                {disciplines.map((discipline) => (
                  <span key={discipline} className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 font-sans-body text-xs text-white/55" style={{ letterSpacing: 0 }}>
                    {discipline}
                  </span>
                ))}
              </div>

              <div className="mt-8 grid gap-3">
                {nextSteps.map((step) => (
                  <a
                    key={step.title}
                    href={step.href}
                    onClick={() => trackCTAClick("trusted-cta", step.title)}
                    className="group rounded-lg border border-white/10 bg-white/[0.025] p-4 transition-all duration-300 hover:border-primary/35 hover:bg-primary/10"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-primary/25 bg-primary/10 text-primary">
                        <step.icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-4">
                          <h3 className="font-serif-display text-xl font-semibold text-white" style={{ letterSpacing: 0 }}>
                            {step.title}
                          </h3>
                          <ArrowRight className="h-4 w-4 shrink-0 text-white/35 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary" />
                        </div>
                        <p className="mt-1 font-sans-body text-sm leading-relaxed text-white/50" style={{ letterSpacing: 0 }}>
                          {step.copy}
                        </p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>

              <div className="mt-8">
                <MagneticButton>
                  <a
                    href="#masterclasses"
                    onClick={() => trackCTAClick("trusted-cta", "Start Your Journey")}
                    className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 font-sans-body text-sm font-semibold text-primary-foreground transition-colors duration-300 hover:bg-primary/90 sm:w-fit"
                  >
                    Start Your Journey
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </MagneticButton>
              </div>
            </div>
          </div>
        </FadeInSection>

        <FadeInSection delay={160} className="mt-6 rounded-lg border border-white/10 bg-white/[0.025] p-5">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <p className="font-sans-body text-xs font-semibold uppercase text-muted-foreground" style={{ letterSpacing: 0 }}>
              Featured in
            </p>
            <div className="flex flex-wrap items-center gap-7 md:gap-10">
              {pressLogos.map((logo) => (
                <Picture
                  key={logo.name}
                  src={logo.src}
                  alt={logo.name}
                  className="h-5 w-auto object-contain opacity-60 grayscale brightness-200 transition-opacity duration-300 hover:opacity-100 md:h-7"
                  style={{ mixBlendMode: "screen" }}
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};

export default TrustedCTASection;
