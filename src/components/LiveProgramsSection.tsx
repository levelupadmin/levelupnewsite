import { useEffect, useState } from "react";
import { Picture } from "@/components/Picture";
import { AnimatePresence, motion } from "framer-motion";
import FadeInSection from "./FadeInSection";
import AccentLine from "./AccentLine";
import { AnimatedCounter } from "./AnimatedCounter";
import { ArrowRight, CalendarDays, Check, CircleDot, Clock3, Radio, Sparkles } from "lucide-react";
import { trackCTAClick } from "@/lib/clarity";
import { showcasePrograms } from "@/data/programs";

const filterPills = [
  { label: "Make Films", targetIndex: 0 },
  { label: "Edit Videos", targetIndex: 1 },
  { label: "Create Content", targetIndex: 2 },
  { label: "Design Products", targetIndex: 3 },
  { label: "Write Stories", targetIndex: 4 },
];

const fieldNotes = [
  { quote: "Went from zero to shooting my first short film in 12 weeks.", name: "BFP Alumni" },
  { quote: "I now edit for a 2M+ YouTube creator. This changed everything.", name: "VE Alumni" },
  { quote: "I finally finished a screenplay. Not just started one - finished.", name: "Screenwriting Alumni" },
];

const stats = [
  { value: 750, suffix: "+", label: "Learners", icon: null },
  { value: 40, suffix: "+", label: "Industry Mentors", icon: null },
  { value: 0, suffix: "", label: "Weekends Only", icon: CalendarDays },
];

const LiveProgramsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoAdvance, setAutoAdvance] = useState(true);
  const program = showcasePrograms[activeIndex];

  useEffect(() => {
    if (!autoAdvance) return;
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % showcasePrograms.length);
    }, 5200);
    return () => clearInterval(interval);
  }, [autoAdvance]);

  const selectProgram = (index: number) => {
    setActiveIndex(index);
    setAutoAdvance(false);
  };

  const coursesJsonLd = {
    "@context": "https://schema.org",
    "@graph": showcasePrograms.map((p) => ({
      "@type": "Course",
      name: p.title,
      description: p.description,
      provider: { "@type": "Organization", name: "LevelUp Learning", url: "https://www.leveluplearning.in" },
      hasCourseInstance: {
        "@type": "CourseInstance",
        courseMode: p.format.includes("Live") ? "Blended" : "Online",
        duration: p.duration,
      },
      url: p.learnMoreLink,
    })),
  };

  return (
    <section
      id="live-programs"
      aria-label="LevelUp LIVE cohort programs"
      className="relative scroll-mt-24 overflow-hidden bg-[hsl(20_13%_4%)] py-16 md:py-24"
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(coursesJsonLd) }} />
      <AccentLine />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_10%,rgba(249,112,21,0.12),transparent_42%),linear-gradient(180deg,transparent,rgba(255,255,255,0.025),transparent)]" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <FadeInSection>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 font-sans-body text-[11px] font-semibold uppercase text-primary" style={{ letterSpacing: 0 }}>
              <Radio className="h-3.5 w-3.5" />
              Live mentorship cohorts
            </span>
            <h2 className="mt-5 max-w-3xl font-serif-display text-4xl font-semibold text-foreground sm:text-5xl md:text-6xl" style={{ lineHeight: 1.02, letterSpacing: 0 }}>
              A live studio for people who are done only watching.
            </h2>
          </FadeInSection>

          <FadeInSection delay={120}>
            <p className="max-w-xl font-sans-body text-sm leading-relaxed text-white/58 md:text-base" style={{ letterSpacing: 0 }}>
              LIVE mentorship cohorts designed for one thing: taking you from "I know about it" to "I can actually do it." With industry mentors, live feedback, real work, and placement assistance to get you where you want to be.
            </p>
            <div className="mt-6 grid grid-cols-3 gap-2.5">
              {stats.map((stat, index) => (
                <div key={stat.label} className="rounded-lg border border-white/10 bg-white/[0.035] p-3.5">
                  <div className="flex min-h-[32px] items-center font-serif-display text-2xl font-semibold text-white" style={{ letterSpacing: 0 }}>
                    {stat.icon ? <stat.icon className="h-6 w-6 text-primary" /> : <AnimatedCounter target={stat.value} suffix={stat.suffix} delay={index * 80} />}
                  </div>
                  <p className="mt-1 font-sans-body text-[11px] leading-tight text-white/45" style={{ letterSpacing: 0 }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </FadeInSection>
        </div>

        <div className="mt-10 grid gap-4 lg:mt-14 lg:grid-cols-[310px_1fr]">
          <FadeInSection delay={180} className="space-y-2.5">
            <p className="mb-4 font-sans-body text-xs font-semibold uppercase text-white/45" style={{ letterSpacing: 0 }}>
              Choose the work you want to make
            </p>
            {filterPills.map((pill, index) => {
              const option = showcasePrograms[pill.targetIndex];
              const isActive = activeIndex === pill.targetIndex;

              return (
                <button
                  key={pill.label}
                  type="button"
                  onClick={() => selectProgram(pill.targetIndex)}
                  onMouseEnter={() => setActiveIndex(pill.targetIndex)}
                  aria-pressed={isActive}
                  className={`group flex w-full items-center gap-3 rounded-lg border p-3.5 text-left transition-all duration-300 ${
                    isActive
                      ? "border-primary/40 bg-primary/10"
                      : "border-white/10 bg-white/[0.025] hover:border-white/20 hover:bg-white/[0.04]"
                  }`}
                >
                  <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md border text-xs font-semibold transition-colors ${
                    isActive ? "border-primary/35 bg-primary text-background" : "border-white/10 text-white/40"
                  }`}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0">
                    <span className="block font-sans-body text-xs text-white/45" style={{ letterSpacing: 0 }}>
                      {pill.label}
                    </span>
                    <span className="mt-0.5 block truncate font-serif-display text-base text-white" style={{ letterSpacing: 0 }}>
                      {option.title}
                    </span>
                  </span>
                </button>
              );
            })}
          </FadeInSection>

          <FadeInSection delay={240}>
            <div className="overflow-hidden rounded-lg border border-white/10 bg-[hsl(22_12%_8%)]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={program.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="grid min-h-[520px] lg:grid-cols-[1fr_0.86fr]"
                >
                  <div className="flex flex-col justify-between p-5 md:p-8 lg:p-10">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 font-sans-body text-[10px] font-semibold uppercase text-primary" style={{ letterSpacing: 0 }}>
                          <Sparkles className="h-3 w-3" />
                          {program.tag}
                        </span>
                        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 font-sans-body text-[10px] uppercase text-white/50" style={{ letterSpacing: 0 }}>
                          <Clock3 className="h-3 w-3" />
                          {program.format}
                        </span>
                      </div>

                      <h3 className="mt-6 max-w-2xl font-serif-display text-3xl font-semibold text-white sm:text-4xl md:text-5xl" style={{ lineHeight: 1.03, letterSpacing: 0 }}>
                        {program.headline}
                      </h3>
                      <p className="mt-5 max-w-xl font-sans-body text-sm leading-relaxed text-white/58 md:text-base" style={{ letterSpacing: 0 }}>
                        {program.oneLiner}
                      </p>

                      <div className="mt-6 flex flex-wrap gap-2">
                        {program.stats.map((stat) => (
                          <span key={stat} className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 font-sans-body text-[11px] text-white/58" style={{ letterSpacing: 0 }}>
                            {stat}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-8 grid gap-3 md:grid-cols-3">
                      {program.bullets.map((bullet) => (
                        <div key={bullet} className="rounded-md border border-white/[0.08] bg-black/20 p-3.5">
                          <Check className="mb-3 h-4 w-4 text-primary" />
                          <p className="font-sans-body text-xs leading-relaxed text-white/66" style={{ letterSpacing: 0 }}>
                            {bullet}
                          </p>
                        </div>
                      ))}
                    </div>

                    <a
                      href={program.ctaLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackCTAClick("live-programs", program.title)}
                      className="group mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 font-sans-body text-sm font-semibold text-primary-foreground transition-all duration-300 hover:bg-primary/90 sm:w-fit"
                    >
                      {program.ctaLabel}
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                  </div>

                  <div className="relative min-h-[320px] overflow-hidden border-t border-white/10 lg:border-l lg:border-t-0">
                    <Picture
                      src={program.image}
                      alt={`LevelUp Learning ${program.title} course thumbnail`}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                    <div className="absolute bottom-5 left-5 right-5 rounded-lg border border-white/10 bg-black/45 p-4 backdrop-blur-md">
                      <p className="font-sans-body text-[11px] uppercase text-white/45" style={{ letterSpacing: 0 }}>
                        Current cohort
                      </p>
                      <p className="mt-1 font-serif-display text-xl font-semibold text-white" style={{ letterSpacing: 0 }}>
                        {program.title}
                      </p>
                      <div className="mt-3 flex items-center gap-2 font-sans-body text-xs text-white/55" style={{ letterSpacing: 0 }}>
                        <CircleDot className="h-3.5 w-3.5 text-primary" />
                        {program.status}
                        {program.spotsLeft ? ` - ${program.spotsLeft} spots left` : ""}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </FadeInSection>
        </div>

        <FadeInSection delay={320} className="mt-6 grid gap-3 md:grid-cols-3">
          {fieldNotes.map((note) => (
            <figure key={note.quote} className="rounded-lg border border-white/10 bg-white/[0.025] p-5">
              <blockquote className="font-serif-display text-lg leading-snug text-white/82" style={{ letterSpacing: 0 }}>
                "{note.quote}"
              </blockquote>
              <figcaption className="mt-4 font-sans-body text-xs text-primary/80" style={{ letterSpacing: 0 }}>
                - {note.name}
              </figcaption>
            </figure>
          ))}
        </FadeInSection>
      </div>
    </section>
  );
};

export default LiveProgramsSection;
