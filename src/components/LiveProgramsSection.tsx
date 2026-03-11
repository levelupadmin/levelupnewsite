import { useState, useCallback, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import FadeInSection from "./FadeInSection";
import AccentLine from "./AccentLine";
import { AnimatedCounter } from "./AnimatedCounter";
import { ArrowRight, ChevronLeft, ChevronRight, Check } from "lucide-react";
import { trackCTAClick } from "@/lib/clarity";
import { showcasePrograms } from "@/data/programs";

const filterPills = [
  { label: "Make Films", targetIndex: 0 },
  { label: "Edit Videos", targetIndex: 1 },
  { label: "Build a Creator Brand", targetIndex: 2 },
  { label: "Design Products", targetIndex: 3 },
  { label: "Write Stories", targetIndex: 4 },
];

const rotatingWords = ["Creator", "Editor", "Designer", "Screenwriter", "Filmmaker"];

const testimonials = [
  { quote: "Went from zero to shooting my first short film in 12 weeks.", name: "BFP Alumni" },
  { quote: "I now edit for a 2M+ YouTube creator. This changed everything.", name: "VE Alumni" },
  { quote: "21 posts in 12 weeks. My account went from 200 to 25K followers.", name: "Creator Academy Alumni" },
  { quote: "Landed my first product design role 3 weeks after the program.", name: "UIUX Alumni" },
  { quote: "I finally finished a screenplay. Not just started one — finished.", name: "Screenwriting Alumni" },
  { quote: "The mentors don't let you hide. That's what makes this different.", name: "BFP Alumni" },
];

const stats = [
  { value: 750, suffix: "+", label: "Dreamers" },
  { value: 40, suffix: "+", label: "Industry Mentors" },
  { value: 0, suffix: "", label: "Weekends Only", isText: true },
];

const cardVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
};

const wordVariants = {
  enter: { y: 30, opacity: 0 },
  center: { y: 0, opacity: 1 },
  exit: { y: -30, opacity: 0 },
};

const LiveProgramsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [wordIndex, setWordIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const touchStart = useRef(0);

  // Rotating word animation
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Auto-advance carousel
  useEffect(() => {
    if (!autoPlay || isHovered) return;
    const interval = setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % showcasePrograms.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [autoPlay, isHovered]);

  const navigate = useCallback((newIndex: number) => {
    setDirection(newIndex > activeIndex ? 1 : -1);
    setActiveIndex(newIndex);
    setAutoPlay(false); // Freeze on pill click
  }, [activeIndex]);

  const prev = useCallback(() => {
    const newIdx = activeIndex === 0 ? showcasePrograms.length - 1 : activeIndex - 1;
    setDirection(-1);
    setActiveIndex(newIdx);
  }, [activeIndex]);

  const next = useCallback(() => {
    const newIdx = activeIndex === showcasePrograms.length - 1 ? 0 : activeIndex + 1;
    setDirection(1);
    setActiveIndex(newIdx);
  }, [activeIndex]);

  const program = showcasePrograms[activeIndex];

  const coursesJsonLd = {
    "@context": "https://schema.org",
    "@graph": showcasePrograms.map((p) => ({
      "@type": "Course",
      name: p.title,
      description: p.description,
      provider: { "@type": "Organization", name: "LevelUp Learning", url: "https://www.leveluplearning.live" },
      hasCourseInstance: { "@type": "CourseInstance", courseMode: p.format.includes("Live") ? "Blended" : "Online", duration: p.duration },
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(coursesJsonLd) }} />
      <AccentLine />

      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Intro */}
        <FadeInSection className="text-center mb-6">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-sans-body text-[11px] tracking-[0.2em] uppercase font-semibold">
            LevelUp LIVE
          </span>
        </FadeInSection>

        {/* Heading with rotating word */}
        <FadeInSection className="text-center mb-5" delay={60}>
          <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.15] tracking-tight">
            <span>From Learner to </span>
            <span className="inline-block relative overflow-hidden align-bottom" style={{ minWidth: "4ch" }}>
              <AnimatePresence mode="wait">
                <motion.span
                  key={rotatingWords[wordIndex]}
                  variants={wordVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                  className="inline-block text-primary"
                >
                  {rotatingWords[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
            <span>.</span>
          </h2>
        </FadeInSection>

        {/* Subheading */}
        <FadeInSection className="text-center mb-10 md:mb-14" delay={120}>
          <p className="font-sans-body text-sm md:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            LIVE intensive cohorts designed for one thing — taking you from "I know about it" to "I can actually do it." With industry mentors, live feedback, real work, and placement assistance to get you where you want to be.
          </p>
        </FadeInSection>

        {/* Stats */}
        <FadeInSection delay={180}>
          <div className="grid grid-cols-3 gap-4 md:gap-6 mb-14 md:mb-20 max-w-lg mx-auto">
            {stats.map((stat, i) => (
              <div key={stat.label} className="text-center py-4 px-3 rounded-xl border border-border/50 bg-card/40">
                <div className="font-serif-display text-2xl md:text-3xl font-bold text-foreground mb-1">
                  {stat.isText ? <span>🗓️</span> : <AnimatedCounter target={stat.value} suffix={stat.suffix} delay={i * 100} />}
                </div>
                <div className="font-sans-body text-xs text-muted-foreground tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </FadeInSection>

        {/* Pills */}
        <FadeInSection className="mb-10 md:mb-14" delay={240}>
          <p className="font-sans-body text-sm text-muted-foreground text-center mb-4">I want to...</p>
          <div className="flex flex-wrap justify-center gap-2.5" role="tablist" aria-label="Filter programs by interest">
            {filterPills.map((pill) => (
              <button
                key={pill.targetIndex}
                role="tab"
                aria-selected={activeIndex === pill.targetIndex}
                onClick={() => navigate(pill.targetIndex)}
                className={`px-5 py-2 rounded-full font-sans-body text-sm font-medium transition-all duration-200 border ${
                  activeIndex === pill.targetIndex
                    ? "bg-primary text-primary-foreground border-primary shadow-[0_0_16px_hsl(24_95%_53%/0.3)]"
                    : "bg-transparent text-muted-foreground border-border hover:border-foreground/30 hover:text-foreground"
                }`}
              >
                {pill.label}
              </button>
            ))}
          </div>
        </FadeInSection>

        {/* Single Program Card */}
        <FadeInSection className="mb-6" delay={300}>
          <div
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={(e) => { touchStart.current = e.touches[0].clientX; }}
            onTouchEnd={(e) => {
              const diff = touchStart.current - e.changedTouches[0].clientX;
              if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
            }}
            onKeyDown={(e) => { if (e.key === "ArrowLeft") prev(); if (e.key === "ArrowRight") next(); }}
            tabIndex={0}
            role="tabpanel"
          >
            {/* Desktop arrows */}
            <button
              onClick={prev}
              aria-label="Previous program"
              className="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 items-center justify-center rounded-full bg-card/60 border border-border/50 text-muted-foreground hover:text-foreground hover:bg-card transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              aria-label="Next program"
              className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 items-center justify-center rounded-full bg-card/60 border border-border/50 text-muted-foreground hover:text-foreground hover:bg-card transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <div className="overflow-hidden rounded-2xl border border-border/50" style={{ background: "hsl(22 12% 8%)" }}>
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={program.id}
                  custom={direction}
                  variants={cardVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="flex flex-col md:flex-row"
                >
                  {/* Image */}
                  <div className="md:order-2 md:w-[40%] relative aspect-[16/10] md:aspect-auto overflow-hidden">
                    <img src={program.image} alt={program.title} loading="lazy" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[hsl(22_12%_8%)] via-transparent to-transparent hidden md:block" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[hsl(22_12%_8%)] via-transparent to-transparent md:hidden" />
                  </div>

                  {/* Content */}
                  <div className="md:order-1 md:w-[60%] p-6 md:p-8 lg:p-10 flex flex-col justify-center">
                    <span className="inline-block self-start px-3 py-1 rounded-full bg-primary/10 text-primary font-sans-body text-[10px] tracking-[0.2em] uppercase font-semibold mb-4">
                      {program.tag}
                    </span>
                    <h3 className="font-serif-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground leading-tight tracking-tight mb-3">
                      {program.headline}
                    </h3>
                    <p className="font-sans-body text-sm text-muted-foreground leading-relaxed mb-5 max-w-lg">{program.oneLiner}</p>
                    <div className="flex flex-wrap gap-2 mb-5">
                      {program.stats.map((stat) => (
                        <span key={stat} className="px-3 py-1 rounded-full bg-secondary/60 border border-border/40 font-sans-body text-[11px] text-muted-foreground tracking-wide">
                          {stat}
                        </span>
                      ))}
                    </div>
                    <ul className="space-y-2.5 mb-6" aria-label={`${program.title} highlights`}>
                      {program.bullets.map((bullet, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          <span className="font-sans-body text-sm text-foreground/80 leading-snug">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                    <a
                      href={program.ctaLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackCTAClick("live-programs", program.title)}
                      className="inline-flex items-center gap-2 self-start px-6 py-3 rounded-full bg-primary text-primary-foreground font-sans-body text-sm font-semibold tracking-wide transition-all duration-200 hover:scale-[1.03] hover:shadow-[0_0_24px_hsl(24_95%_53%/0.35)]"
                    >
                      {program.ctaLabel}
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </FadeInSection>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mb-14 md:mb-20">
          {showcasePrograms.map((_, i) => (
            <button
              key={i}
              onClick={() => navigate(i)}
              aria-label={`Go to program ${i + 1}`}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                i === activeIndex ? "bg-primary scale-125" : "bg-border hover:bg-muted-foreground"
              }`}
            />
          ))}
        </div>

        {/* Marquee */}
        <FadeInSection className="mb-16 md:mb-24">
          <div className="overflow-hidden relative" aria-label="Student testimonials">
            <div className="absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-[hsl(22_14%_5%)] to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-[hsl(22_14%_5%)] to-transparent pointer-events-none" />
            <div className="marquee-track flex gap-6 hover:[animation-play-state:paused]">
              {[...testimonials, ...testimonials].map((t, i) => (
                <div key={i} className="flex-shrink-0 w-[380px] p-6 rounded-xl border border-border/40 bg-card/30 min-h-[120px] flex flex-col justify-between">
                  <p className="font-sans-body text-base text-foreground/80 italic leading-relaxed mb-3">"{t.quote}"</p>
                  <span className="font-sans-body text-xs text-primary font-medium">— {t.name}</span>
                </div>
              ))}
            </div>
          </div>
        </FadeInSection>
      </div>

      <style>{`
        .marquee-track { animation: marquee-scroll 40s linear infinite; width: max-content; }
        @keyframes marquee-scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
      `}</style>
    </section>
  );
};

export default LiveProgramsSection;
