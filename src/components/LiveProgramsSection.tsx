import { useState, useCallback, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import FadeInSection, { useScrollReveal } from "./FadeInSection";
import { AnimatedCounter } from "./AnimatedCounter";
import { ArrowRight, ChevronLeft, ChevronRight, Check, Calendar } from "lucide-react";
import { trackCTAClick } from "@/lib/clarity";
import { showcasePrograms } from "@/data/programs";

/* ─── ROTATING WORDS ─── */
const rotatingWords = ["Creator", "Editor", "Designer", "Screenwriter", "Filmmaker"];

/* ─── FILTER PILLS ─── */
const filterPills = [
  { label: "Make Films", targetIndex: 0 },
  { label: "Edit Videos", targetIndex: 1 },
  { label: "Build a Creator Brand", targetIndex: 2 },
  { label: "Design Products", targetIndex: 3 },
  { label: "Write Stories", targetIndex: 4 },
];

/* ─── TESTIMONIALS ─── */
const testimonials = [
  { quote: "The mentors don't let you hide. That's what makes this different.", name: "BFP Alumni" },
  { quote: "Went from zero to shooting my first short film in 12 weeks.", name: "BFP Alumni" },
  { quote: "I now edit for a 2M+ YouTube creator. This changed everything.", name: "VE Alumni" },
  { quote: "21 posts in 12 weeks. My account went from 200 to 25K followers.", name: "Creator Academy Alumni" },
  { quote: "Landed my first product design role 3 weeks after the program.", name: "UIUX Alumni" },
  { quote: "I finally finished a screenplay. Not just started one — finished.", name: "Screenwriting Alumni" },
];

/* ─── STATS ─── */
const stats = [
  { value: 40, suffix: "+", label: "Cohorts Completed" },
  { value: 40, suffix: "+", label: "Industry Mentors" },
  { value: 750, suffix: "+", label: "Alumni & Counting" },
  { value: 4.8, suffix: "/5", label: "Average Rating", decimals: 1 },
  { value: 0, suffix: "", label: "Weekends Only", isCalendar: true },
];

/* ─── CARD VARIANTS ─── */
const cardVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
};

/* ─── ROTATING WORD COMPONENT ─── */
const RotatingWord = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <span className="relative inline-block overflow-hidden align-bottom" style={{ width: "280px" }}>
      {/* Invisible sizer for widest word */}
      <span className="invisible font-bold" aria-hidden="true">Screenwriter</span>
      <AnimatePresence mode="wait">
        <motion.span
          key={rotatingWords[index]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="absolute inset-0 flex items-end justify-start"
          aria-live="polite"
        >
          <span style={{ color: "#FFBC3B" }} className="font-bold">
            {rotatingWords[index]}
          </span>
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

/* ─── TESTIMONIAL CARD ─── */
const TestimonialCard = ({ quote, name, delay }: { quote: string; name: string; delay: number }) => (
  <FadeInSection delay={delay} className="flex-shrink-0 w-full md:w-[calc(33.333%-16px)]">
    <div
      className="relative rounded-2xl p-9"
      style={{
        background: "#1A1A1A",
        border: "1px solid #222222",
        minHeight: "180px",
      }}
    >
      <span
        className="absolute font-serif"
        style={{ top: "16px", left: "20px", fontSize: "56px", color: "#FFBC3B", opacity: 0.15, lineHeight: 1 }}
        aria-hidden="true"
      >
        "
      </span>
      <p className="font-sans-body text-base italic leading-[1.65] text-white relative z-10">
        "{quote}"
      </p>
      <p
        className="mt-5 text-[13px] font-bold uppercase tracking-[0.08em]"
        style={{ color: "#FFBC3B" }}
      >
        — {name}
      </p>
    </div>
  </FadeInSection>
);

/* ─── MAIN COMPONENT ─── */
const LiveProgramsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [autoPlay, setAutoPlay] = useState(true);
  const [hovered, setHovered] = useState(false);
  const touchStart = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pillsRef = useRef<HTMLDivElement>(null);

  /* Auto-advance logic */
  useEffect(() => {
    if (!autoPlay || hovered) {
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = null;
      return;
    }
    timerRef.current = setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % showcasePrograms.length);
    }, 3000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [autoPlay, hovered]);

  /* Scroll active pill into view on mobile */
  useEffect(() => {
    if (!pillsRef.current) return;
    const activeBtn = pillsRef.current.children[activeIndex] as HTMLElement | undefined;
    activeBtn?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [activeIndex]);

  const stopAutoPlay = useCallback(() => setAutoPlay(false), []);

  const navigate = useCallback((newIndex: number) => {
    setDirection(newIndex > activeIndex ? 1 : -1);
    setActiveIndex(newIndex);
    stopAutoPlay();
  }, [activeIndex, stopAutoPlay]);

  const prev = useCallback(() => {
    setDirection(-1);
    setActiveIndex((p) => (p === 0 ? showcasePrograms.length - 1 : p - 1));
    stopAutoPlay();
  }, [stopAutoPlay]);

  const next = useCallback(() => {
    setDirection(1);
    setActiveIndex((p) => (p === showcasePrograms.length - 1 ? 0 : p + 1));
    stopAutoPlay();
  }, [stopAutoPlay]);

  const program = showcasePrograms[activeIndex];

  const coursesJsonLd = {
    "@context": "https://schema.org",
    "@graph": showcasePrograms.map((p) => ({
      "@type": "Course",
      name: p.title,
      description: p.description,
      provider: { "@type": "Organization", name: "LevelUp Learning", url: "https://www.leveluplearning.live" },
      hasCourseInstance: { "@type": "CourseInstance", courseMode: "Online", duration: p.duration },
      url: p.learnMoreLink,
    })),
  };

  return (
    <section
      id="live-programs"
      aria-label="LevelUp LIVE cohort programs"
      className="relative py-16 md:py-24"
      style={{ background: "#0D0D0D" }}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(coursesJsonLd) }} />

      <div className="max-w-6xl mx-auto px-6 md:px-12">

        {/* ─── BLOCK 1: SECTION INTRO ─── */}
        <FadeInSection className="text-center mb-6">
          <span
            className="inline-block uppercase font-semibold"
            style={{ letterSpacing: "0.2em", fontSize: "14px", color: "#FFBC3B" }}
          >
            LEVELUP LIVE
          </span>
        </FadeInSection>

        <FadeInSection className="text-center mb-5" delay={60}>
          <h2
            className="font-serif-display font-bold text-white leading-[1.15] tracking-tight"
            style={{ fontSize: "clamp(36px, 5vw, 52px)" }}
          >
            From Learner to <RotatingWord />.
          </h2>
        </FadeInSection>

        <FadeInSection className="text-center mb-12 md:mb-14" delay={120}>
          <p
            className="font-sans-body max-w-[720px] mx-auto leading-[1.65]"
            style={{ color: "#999999", fontSize: "clamp(16px, 2vw, 18px)" }}
          >
            <span className="font-bold uppercase">LIVE</span> intensive cohorts designed for one thing — taking you from "I know about it" to "I can actually do it." With industry mentors, live feedback, real work, and placement assistance to get you where you want to be.
          </p>
        </FadeInSection>

        {/* ─── BLOCK 2: METRICS STRIP ─── */}
        <FadeInSection delay={180} className="mb-12 md:mb-14">
          <div className="flex flex-wrap justify-center gap-4 md:gap-5">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="text-center rounded-xl"
                style={{
                  border: "1px solid #222222",
                  padding: "24px 20px",
                  width: "140px",
                  background: "#141414",
                }}
              >
                <div className="font-serif-display text-[28px] font-bold text-white mb-1">
                  {stat.isCalendar ? (
                    <Calendar className="w-7 h-7 mx-auto" style={{ color: "#FFBC3B" }} />
                  ) : (
                    <AnimatedCounter
                      target={stat.value}
                      suffix={stat.suffix}
                      decimals={stat.decimals}
                      delay={i * 100}
                    />
                  )}
                </div>
                <div
                  className="font-sans-body uppercase"
                  style={{ color: "#777777", letterSpacing: "0.05em", fontSize: "11px" }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </FadeInSection>

        {/* ─── BLOCK 3: AUDIENCE FILTER PILLS ─── */}
        <FadeInSection className="mb-10 md:mb-12" delay={240}>
          <p className="text-center mb-4 italic" style={{ color: "#777777", fontSize: "14px" }}>
            I want to...
          </p>
          <div
            ref={pillsRef}
            className="flex gap-2.5 overflow-x-auto no-scrollbar justify-start md:justify-center pb-2"
            role="tablist"
            aria-label="Filter programs by interest"
          >
            {filterPills.map((pill) => {
              const isActive = activeIndex === pill.targetIndex;
              return (
                <button
                  key={pill.targetIndex}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => navigate(pill.targetIndex)}
                  className="flex-shrink-0 font-sans-body cursor-pointer transition-all duration-200"
                  style={{
                    borderRadius: "999px",
                    padding: "10px 24px",
                    fontSize: "14px",
                    border: isActive ? "1px solid #FFBC3B" : "1px solid #333333",
                    background: isActive ? "#FFBC3B" : "transparent",
                    color: isActive ? "#000000" : "#999999",
                    fontWeight: isActive ? 600 : 400,
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      (e.target as HTMLElement).style.borderColor = "#555555";
                      (e.target as HTMLElement).style.color = "#CCCCCC";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      (e.target as HTMLElement).style.borderColor = "#333333";
                      (e.target as HTMLElement).style.color = "#999999";
                    }
                  }}
                >
                  {pill.label}
                </button>
              );
            })}
          </div>
        </FadeInSection>

        {/* ─── BLOCK 4: PROGRAM CAROUSEL ─── */}
        <FadeInSection className="mb-6" delay={300}>
          <div
            className="relative group"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onTouchStart={(e) => { touchStart.current = e.touches[0].clientX; }}
            onTouchEnd={(e) => {
              const diff = touchStart.current - e.changedTouches[0].clientX;
              if (Math.abs(diff) > 50) {
                if (diff > 0) { setDirection(1); setActiveIndex((p) => (p === showcasePrograms.length - 1 ? 0 : p + 1)); }
                else { setDirection(-1); setActiveIndex((p) => (p === 0 ? showcasePrograms.length - 1 : p - 1)); }
                stopAutoPlay();
              }
            }}
            onKeyDown={(e) => { if (e.key === "ArrowLeft") prev(); if (e.key === "ArrowRight") next(); }}
            tabIndex={0}
            role="tabpanel"
          >
            {/* Desktop arrows */}
            <button
              onClick={prev}
              aria-label="Previous program"
              className="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              style={{ background: "rgba(255,255,255,0.1)", border: "1px solid #333" }}
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={next}
              aria-label="Next program"
              className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              style={{ background: "rgba(255,255,255,0.1)", border: "1px solid #333" }}
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>

            {/* Mobile arrows */}
            <button
              onClick={prev}
              aria-label="Previous program"
              className="flex md:hidden absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 items-center justify-center rounded-full"
              style={{ background: "rgba(255,255,255,0.1)", border: "1px solid #333" }}
            >
              <ChevronLeft className="w-4 h-4 text-white" />
            </button>
            <button
              onClick={next}
              aria-label="Next program"
              className="flex md:hidden absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 items-center justify-center rounded-full"
              style={{ background: "rgba(255,255,255,0.1)", border: "1px solid #333" }}
            >
              <ChevronRight className="w-4 h-4 text-white" />
            </button>

            <div
              className="overflow-hidden"
              style={{ borderRadius: "16px", border: "1px solid #222222", background: "#1A1A1A", minHeight: "420px" }}
            >
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={program.id}
                  custom={direction}
                  variants={cardVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                  className="flex flex-col md:flex-row"
                >
                  {/* Right visual area */}
                  <div className="md:order-2 md:w-[42%] relative aspect-[16/9] md:aspect-auto overflow-hidden" style={{ maxHeight: "220px", ...(typeof window !== "undefined" && window.innerWidth >= 768 ? { maxHeight: "none" } : {}) }}>
                    <img src={program.image} alt={program.title} loading="lazy" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 hidden md:block" style={{ background: "linear-gradient(to right, #1A1A1A, transparent 40%)" }} />
                    <div className="absolute inset-0 md:hidden" style={{ background: "linear-gradient(to top, #1A1A1A, transparent 40%)" }} />
                  </div>

                  {/* Left content area */}
                  <div className="md:order-1 md:w-[58%] p-6 md:p-12 flex flex-col justify-center">
                    <span
                      className="inline-block self-start uppercase font-sans-body font-semibold mb-4"
                      style={{
                        fontSize: "12px",
                        letterSpacing: "0.12em",
                        color: "#FFBC3B",
                        background: "rgba(255, 188, 59, 0.12)",
                        padding: "5px 14px",
                        borderRadius: "6px",
                      }}
                    >
                      {program.tag}
                    </span>

                    <h3
                      className="font-serif-display font-bold text-white leading-tight mb-3"
                      style={{ fontSize: "clamp(24px, 3vw, 30px)" }}
                    >
                      {program.headline}
                    </h3>

                    <p className="font-sans-body leading-[1.5] mb-5 max-w-lg" style={{ color: "#999999", fontSize: "15px" }}>
                      {program.oneLiner}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {program.stats.map((stat) => (
                        <span
                          key={stat}
                          className="font-sans-body"
                          style={{
                            border: "1px solid #333333",
                            borderRadius: "999px",
                            padding: "6px 14px",
                            fontSize: "12px",
                            color: "#888888",
                          }}
                        >
                          {stat}
                        </span>
                      ))}
                    </div>

                    <ul className="space-y-3 mb-7" aria-label={`${program.title} highlights`}>
                      {program.bullets.map((bullet, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <Check className="w-3.5 h-3.5 flex-shrink-0 mt-1" style={{ color: "#FFBC3B" }} />
                          <span className="font-sans-body text-sm text-white leading-[1.5]">{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    <a
                      href={program.ctaLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackCTAClick("live-programs", program.title)}
                      className="inline-flex items-center gap-2 self-start font-sans-body font-semibold transition-all duration-200 hover:scale-[1.03]"
                      style={{
                        background: "#FFBC3B",
                        color: "#000000",
                        fontSize: "15px",
                        padding: "14px 32px",
                        borderRadius: "10px",
                        boxShadow: "none",
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(255,188,59,0.3)"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
                    >
                      {program.ctaLabel} <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </FadeInSection>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-6 mb-16 md:mb-20">
          {showcasePrograms.map((_, i) => (
            <button
              key={i}
              onClick={() => navigate(i)}
              aria-label={`Go to program ${i + 1}`}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === activeIndex ? "10px" : "8px",
                height: i === activeIndex ? "10px" : "8px",
                background: i === activeIndex ? "#FFBC3B" : "#333333",
              }}
            />
          ))}
        </div>

        {/* ─── BLOCK 5: TESTIMONIALS ─── */}
        <div className="flex flex-col md:flex-row gap-5 mb-16 md:mb-20 overflow-x-auto no-scrollbar md:overflow-visible">
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} quote={t.quote} name={t.name} delay={i * 200} />
          ))}
        </div>

        {/* ─── BLOCK 6: BOTTOM CTA ─── */}
        <FadeInSection className="text-center mb-20">
          <h3
            className="font-serif-display font-bold text-white mb-2"
            style={{ fontSize: "clamp(24px, 3vw, 28px)" }}
          >
            Not Sure Which Program Fits?
          </h3>
          <p className="font-sans-body mb-6" style={{ color: "#999999", fontSize: "16px" }}>
            Talk to our team. We'll help you pick the right cohort.
          </p>
          <a
            href="https://www.leveluplearning.live"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-sans-body font-semibold transition-all duration-200 hover:scale-[1.03]"
            style={{
              background: "#FFBC3B",
              color: "#000000",
              fontSize: "15px",
              padding: "14px 32px",
              borderRadius: "10px",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(255,188,59,0.3)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
          >
            Book a Free Call <ArrowRight className="w-4 h-4" />
          </a>
        </FadeInSection>
      </div>
    </section>
  );
};

export default LiveProgramsSection;
