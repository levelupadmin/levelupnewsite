import { useState, useRef, useCallback } from "react";
import FadeInSection from "./FadeInSection";
import AccentLine from "./AccentLine";
import { AnimatedCounter } from "./AnimatedCounter";
import { ArrowRight, Check } from "lucide-react";
import { showcasePrograms } from "@/data/programs";

/* ─── Audience filter pills ─── */
const filterPills = [
  { label: "Make Films", targetId: "bfp" },
  { label: "Edit Videos", targetId: "ve" },
  { label: "Build a Creator Brand", targetId: "creator-academy" },
  { label: "Design Products", targetId: "uiux" },
  { label: "Write Stories", targetId: "sw" },
];

/* ─── Social proof testimonials ─── */
const testimonials = [
  { quote: "Went from zero to shooting my first short film in 12 weeks.", name: "BFP Alumni" },
  { quote: "I now edit for a 2M+ YouTube creator. This changed everything.", name: "VE Alumni" },
  { quote: "21 posts in 12 weeks. My account went from 200 to 25K followers.", name: "Creator Academy Alumni" },
  { quote: "Landed my first product design role 3 weeks after the program.", name: "UIUX Alumni" },
  { quote: "I finally finished a screenplay. Not just started one — finished.", name: "Screenwriting Alumni" },
  { quote: "The mentors don't let you hide. That's what makes this different.", name: "BFP Alumni" },
];

/* ─── Stats data ─── */
const stats = [
  { value: 5, suffix: "", label: "Active Programs" },
  { value: 12000, suffix: "+", label: "Hours of Live Teaching", hasComma: true },
  { value: 50, suffix: "+", label: "Industry Mentors" },
  { value: 80, suffix: "%+", label: "Completion Rate" },
  { value: 0, suffix: "", label: "Weekends Only", isText: true },
];

const LiveProgramsSection = () => {
  const [activePill, setActivePill] = useState<string | null>(null);
  const [highlightedCard, setHighlightedCard] = useState<string | null>(null);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const handlePillClick = useCallback((targetId: string) => {
    setActivePill(targetId);
    const card = cardRefs.current[targetId];
    if (card) {
      card.scrollIntoView({ behavior: "smooth", block: "center" });
      setHighlightedCard(targetId);
      setTimeout(() => setHighlightedCard(null), 1200);
    }
  }, []);

  /* JSON-LD for SEO */
  const coursesJsonLd = {
    "@context": "https://schema.org",
    "@graph": showcasePrograms.map((p) => ({
      "@type": "Course",
      name: p.title,
      description: p.description,
      provider: {
        "@type": "Organization",
        name: "LevelUp Learning",
        url: "https://www.leveluplearning.live",
      },
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
      className="relative py-16 md:py-24"
      style={{ background: "hsl(22 14% 5%)" }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(coursesJsonLd) }}
      />
      <AccentLine />

      {/* ═══ 1. SECTION INTRO ═══ */}
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <FadeInSection className="text-center mb-6">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-sans-body text-[11px] tracking-[0.2em] uppercase font-semibold">
            LevelUp LIVE
          </span>
        </FadeInSection>

        <FadeInSection className="text-center mb-5" delay={60}>
          <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.15] tracking-tight">
            Stop Watching. Start Making.
          </h2>
        </FadeInSection>

        <FadeInSection className="text-center mb-10 md:mb-14" delay={120}>
          <p className="font-sans-body text-sm md:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Our LIVE cohort programs are the opposite of "learn at your own pace." Small batches. Weekend classes. Industry mentors. Real deadlines. Real output.
          </p>
        </FadeInSection>

        {/* Stats strip */}
        <FadeInSection delay={180}>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6 mb-14 md:mb-20">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="text-center py-4 px-3 rounded-xl border border-border/50 bg-card/40"
              >
                <div className="font-serif-display text-2xl md:text-3xl font-bold text-foreground mb-1">
                  {stat.isText ? (
                    <span>🗓️</span>
                  ) : (
                    <AnimatedCounter
                      target={stat.value}
                      suffix={stat.suffix}
                      hasComma={stat.hasComma}
                      delay={i * 100}
                    />
                  )}
                </div>
                <div className="font-sans-body text-xs text-muted-foreground tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </FadeInSection>

        {/* ═══ 2. AUDIENCE FILTER ═══ */}
        <FadeInSection className="mb-14 md:mb-20" delay={240}>
          <p className="font-sans-body text-sm text-muted-foreground text-center mb-4">
            I want to...
          </p>
          <div className="flex flex-wrap justify-center gap-2.5" role="group" aria-label="Filter programs by interest">
            {filterPills.map((pill) => (
              <button
                key={pill.targetId}
                onClick={() => handlePillClick(pill.targetId)}
                className={`px-5 py-2 rounded-full font-sans-body text-sm font-medium transition-all duration-200 border ${
                  activePill === pill.targetId
                    ? "bg-primary text-primary-foreground border-primary shadow-[0_0_16px_hsl(24_95%_53%/0.3)]"
                    : "bg-transparent text-muted-foreground border-border hover:border-foreground/30 hover:text-foreground"
                }`}
              >
                {pill.label}
              </button>
            ))}
          </div>
        </FadeInSection>

        {/* ═══ 3. PROGRAM CARDS ═══ */}
        <div className="flex flex-col gap-16 md:gap-20 mb-16 md:mb-24">
          {showcasePrograms.map((program, idx) => (
            <FadeInSection key={program.id} delay={idx * 60}>
              <div
                ref={(el) => { cardRefs.current[program.id] = el; }}
                id={`program-${program.id}`}
                className={`group relative flex flex-col md:flex-row rounded-2xl overflow-hidden border transition-all duration-500 ${
                  highlightedCard === program.id
                    ? "border-primary ring-2 ring-primary/40"
                    : "border-border/50 hover:border-border"
                }`}
                style={{ background: "hsl(22 12% 8%)" }}
              >
                {/* Right: Image (mobile: top) */}
                <div className="md:order-2 md:w-[40%] relative aspect-[16/10] md:aspect-auto overflow-hidden">
                  <img
                    src={program.image}
                    alt={program.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[hsl(22_12%_8%)] via-transparent to-transparent hidden md:block" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[hsl(22_12%_8%)] via-transparent to-transparent md:hidden" />
                </div>

                {/* Left: Content */}
                <div className="md:order-1 md:w-[60%] p-6 md:p-8 lg:p-10 flex flex-col justify-center">
                  {/* Tag */}
                  <span className="inline-block self-start px-3 py-1 rounded-full bg-primary/10 text-primary font-sans-body text-[10px] tracking-[0.2em] uppercase font-semibold mb-4">
                    {program.tag}
                  </span>

                  {/* Headline */}
                  <h3 className="font-serif-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground leading-tight tracking-tight mb-3">
                    {program.headline}
                  </h3>

                  {/* One-liner */}
                  <p className="font-sans-body text-sm text-muted-foreground leading-relaxed mb-5 max-w-lg">
                    {program.oneLiner}
                  </p>

                  {/* Stats pills */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {program.stats.map((stat) => (
                      <span
                        key={stat}
                        className="px-3 py-1 rounded-full bg-secondary/60 border border-border/40 font-sans-body text-[11px] text-muted-foreground tracking-wide"
                      >
                        {stat}
                      </span>
                    ))}
                  </div>

                  {/* Bullets */}
                  <ul className="space-y-2.5 mb-6" aria-label={`${program.title} highlights`}>
                    {program.bullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span className="font-sans-body text-sm text-foreground/80 leading-snug">
                          {bullet}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <a
                    href={program.ctaLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 self-start px-6 py-3 rounded-full bg-primary text-primary-foreground font-sans-body text-sm font-semibold tracking-wide transition-all duration-200 hover:scale-[1.03] hover:shadow-[0_0_24px_hsl(24_95%_53%/0.35)]"
                  >
                    {program.ctaLabel}
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>

        {/* ═══ 4. SOCIAL PROOF MARQUEE ═══ */}
        <FadeInSection className="mb-16 md:mb-24">
          <div className="overflow-hidden relative" aria-label="Student testimonials">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-[hsl(22_14%_5%)] to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-[hsl(22_14%_5%)] to-transparent pointer-events-none" />

            <div className="marquee-track flex gap-6 hover:[animation-play-state:paused]">
              {[...testimonials, ...testimonials].map((t, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-[340px] p-5 rounded-xl border border-border/40 bg-card/30"
                >
                  <p className="font-sans-body text-sm text-foreground/80 italic leading-relaxed mb-3">
                    "{t.quote}"
                  </p>
                  <span className="font-sans-body text-xs text-primary font-medium">
                    — {t.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </FadeInSection>

        {/* ═══ 5. BOTTOM CTA ═══ */}
        <FadeInSection className="text-center">
          <h3 className="font-serif-display text-2xl md:text-3xl font-bold text-foreground mb-3">
            Not Sure Which Program Fits?
          </h3>
          <p className="font-sans-body text-sm text-muted-foreground mb-6">
            Talk to our team. We'll help you pick the right cohort.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://www.leveluplearning.live"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-primary text-primary-foreground font-sans-body text-sm font-semibold tracking-wide transition-all duration-200 hover:scale-[1.03] hover:shadow-[0_0_24px_hsl(24_95%_53%/0.35)]"
            >
              Book a Free Call
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="https://www.leveluplearning.live"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans-body text-sm text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors"
            >
              Explore All Programs →
            </a>
          </div>
        </FadeInSection>
      </div>

      {/* Marquee keyframes */}
      <style>{`
        .marquee-track {
          animation: marquee-scroll 40s linear infinite;
          width: max-content;
        }
        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};

export default LiveProgramsSection;
