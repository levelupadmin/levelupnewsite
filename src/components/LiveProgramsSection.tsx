import { useState, useRef, useEffect, useCallback } from "react";
import AccentLine from "./AccentLine";
import FadeInSection from "./FadeInSection";
import { ArrowRight, Clock, Radio, CalendarDays, Play } from "lucide-react";
import careerQuizBanner from "@/assets/career-quiz-banner.jpg";
import { showcasePrograms } from "@/data/programs";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

const activeGradients = [
  { active: "from-amber-600 to-amber-600/0", hoverBg: "linear-gradient(to right, rgba(217,119,6,0.25), transparent)", detailBg: "linear-gradient(135deg, rgba(217,119,6,0.15) 0%, transparent 60%)" },
  { active: "from-sky-600 to-sky-600/0", hoverBg: "linear-gradient(to right, rgba(2,132,199,0.25), transparent)", detailBg: "linear-gradient(135deg, rgba(2,132,199,0.15) 0%, transparent 60%)" },
  { active: "from-violet-600 to-violet-600/0", hoverBg: "linear-gradient(to right, rgba(124,58,237,0.25), transparent)", detailBg: "linear-gradient(135deg, rgba(124,58,237,0.15) 0%, transparent 60%)" },
  { active: "from-rose-600 to-rose-600/0", hoverBg: "linear-gradient(to right, rgba(225,29,72,0.25), transparent)", detailBg: "linear-gradient(135deg, rgba(225,29,72,0.15) 0%, transparent 60%)" },
];

const statusStyles: Record<string, string> = {
  Enrolling: "bg-primary/10 text-primary border-primary/20",
  Upcoming: "bg-secondary text-secondary-foreground border-border",
  "Coming Soon": "bg-muted text-muted-foreground border-border",
};

const LiveProgramsSection = () => {
  const [activeShowcase, setActiveShowcase] = useState(0);
  const [youtubeOpen, setYoutubeOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const activeProgram = showcasePrograms[activeShowcase];

  // Deep-link: read hash to auto-select a program and scroll into view
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (!hash.startsWith("#live-")) return;
      const programId = hash.replace("#live-", "");
      const idx = showcasePrograms.findIndex((p) => p.id === programId);
      if (idx !== -1) {
        setActiveShowcase(idx);
        setTimeout(() => {
          sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  // Start observing earlier (rootMargin) so videos begin loading before user scrolls to them
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0, rootMargin: "400px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // When visible, eagerly load all videos; play active, pause others
  useEffect(() => {
    if (!isVisible) return;
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      // Force all videos to start buffering
      if (v.preload === "none") v.preload = "auto";
      v.load();
      if (i === activeShowcase) {
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    });
  }, [activeShowcase, isVisible]);

  return (
    <section ref={sectionRef} id="live-programs" aria-label="Live programs" className="relative py-14 md:py-20">
      <AccentLine />

      {/* Subtle top glow */}
      <div
        className="absolute top-0 left-0 right-0 h-64 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, hsl(38 75% 55% / 0.03) 0%, transparent 70%)",
        }}
      />

      {/* Section header */}
      <FadeInSection className="text-center px-6 md:px-12 mb-10 md:mb-12">
        <span className="inline-block font-sans-body text-[10px] md:text-xs tracking-[0.15em] uppercase px-3 py-1 rounded-full border border-primary/30 text-primary bg-primary/5 mb-4 badge-shimmer">
          Live + Mentor-Led
        </span>
        <h2 className="font-serif-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-hero-headline leading-[1.2] tracking-tight">
          Your craft,{" "}
          <em className="italic font-normal text-primary">guided live</em>
        </h2>
        <p className="font-sans-body text-sm md:text-base text-hero-subtext mt-5 md:mt-6 max-w-xl mx-auto leading-relaxed">
          Structured programs led by working professionals. Live sessions, real
          practice, honest feedback.
        </p>
      </FadeInSection>

      {/* Showcase layout */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row rounded-sm overflow-hidden border border-border bg-card">

          {/* Left sidebar */}
          <div className="md:w-[340px] lg:w-[400px] flex-shrink-0 md:border-r border-border flex flex-col">
            {showcasePrograms.map((prog, i) => (
              <div key={prog.id}>
                {i > 0 && <div className="h-px bg-border/40" />}
                <button
                  onClick={() => setActiveShowcase(i)}
                  className={`group relative flex w-full items-center justify-between whitespace-nowrap rounded-lg pl-7 pr-5 py-4 text-left text-sm transition-all overflow-hidden ${
                    activeShowcase === i
                      ? `bg-gradient-to-r ${activeGradients[i].active} font-semibold text-foreground noise-overlay`
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  style={activeShowcase !== i ? { backgroundImage: "none" } : undefined}
                  onMouseEnter={(e) => {
                    if (activeShowcase !== i) e.currentTarget.style.backgroundImage = activeGradients[i].hoverBg;
                  }}
                  onMouseLeave={(e) => {
                    if (activeShowcase !== i) e.currentTarget.style.backgroundImage = "none";
                  }}
                >
                  {prog.title}
                  {activeShowcase === i && <ArrowRight className="w-4 h-4 flex-shrink-0 ml-2 text-white" />}
                </button>
              </div>
            ))}

            {/* Mini CTA Banner */}
            <div className="hidden md:flex mt-auto p-4 flex-1 flex-col justify-end">
              <div className="relative rounded-lg overflow-hidden border border-primary/50 flex-1 flex flex-col">
                <div className="flex-1 flex flex-col justify-end relative" style={{ maskImage: 'linear-gradient(to left, black, transparent)', WebkitMaskImage: 'linear-gradient(to left, black, transparent)' }}>
                  <img
                    src={careerQuizBanner}
                    alt="Career quiz"
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
                  <div className="relative p-5">
                    <p className="font-sans-body text-sm text-muted-foreground leading-snug mb-2">
                      Not sure which creator<br />path fits you?
                    </p>
                    <a
                      href="https://www.leveluplearning.live/bfp"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-sans-body text-sm text-primary hover:text-primary/80 transition-colors"
                    >
                      Take our quiz <ArrowRight className="w-3 h-3 animate-slide-right" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right content: Video stacked on top of details (desktop) */}
          <div className="flex-1 flex flex-col">
            {/* 16:9 Video Preview */}
            <div className="relative aspect-video w-full overflow-hidden bg-black/50 group">
              {/* Poster fallback shown until videos load */}
              <img
                src={activeProgram.image}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* All videos rendered, only active one visible — no remount flicker */}
              {isVisible && showcasePrograms.map((prog, i) => (
                <video
                  key={prog.id}
                  ref={(el) => { videoRefs.current[i] = el; }}
                  src={prog.previewVideo}
                  poster={prog.image}
                  muted
                  loop
                  playsInline
                  preload="none"
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                    i === activeShowcase ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
                />
              ))}
              {/* Play Full Trailer button */}
              <button
                onClick={() => setYoutubeOpen(true)}
                className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-sans-body text-sm font-medium transition-colors hover:bg-white/20">
                  <Play className="w-4 h-4 fill-white" />
                  Play Full Trailer
                </span>
              </button>
            </div>

            {/* Details panel */}
            <div
              className="flex-1 flex flex-col justify-between p-8 lg:p-10"
              style={{ backgroundImage: activeGradients[activeShowcase].detailBg }}
            >
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="inline-flex items-center gap-1.5 font-sans-body text-xs tracking-wide px-2.5 py-1 rounded-full bg-secondary border border-border text-muted-foreground">
                    <Clock className="w-3 h-3" /> {activeProgram.duration}
                  </span>
                  <span className={`font-sans-body text-xs tracking-wide uppercase px-2.5 py-1 rounded-full border ${statusStyles[activeProgram.status]}`}>
                    {activeProgram.status}
                  </span>
                  {activeProgram.spotsLeft && (
                    <span className="inline-flex items-center gap-1.5 font-sans-body text-xs text-destructive">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-destructive" />
                      </span>
                      {activeProgram.spotsLeft} spots left
                    </span>
                  )}
                </div>

                <h3 className="font-serif-display text-2xl lg:text-4xl font-medium text-hero-headline leading-tight tracking-tight mb-3">
                  {activeProgram.title}
                </h3>

                <p className="font-sans-body text-sm text-muted-foreground leading-relaxed mb-5 max-w-md">
                  {activeProgram.description}
                </p>

                <div className="flex flex-wrap items-center gap-4 mb-5">
                  <span className="inline-flex items-center gap-1.5 text-muted-foreground font-sans-body text-xs">
                    <Radio className="w-3.5 h-3.5" /> {activeProgram.format}
                  </span>
                  {activeProgram.startDate && (
                    <span className="inline-flex items-center gap-1.5 text-muted-foreground font-sans-body text-xs">
                      <CalendarDays className="w-3.5 h-3.5" /> Starts {activeProgram.startDate}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between pt-4 border-t border-border mb-5">
                  <span className="font-sans-body text-xs text-muted-foreground">
                    Led by{" "}
                    <span className="text-hero-subtext font-medium">{activeProgram.instructor}</span>
                  </span>
                </div>

                <div className="flex gap-3 flex-nowrap">
                  <a
                    href={activeProgram.ctaLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cta-sweep cta-glow inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-sans-body text-sm font-medium tracking-wide transition-colors hover:bg-primary/90 whitespace-nowrap"
                  >
                    Request Invite
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={activeProgram.ctaLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center font-sans-body text-sm px-5 py-2.5 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors whitespace-nowrap"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* YouTube Embed Dialog */}
      <Dialog open={youtubeOpen} onOpenChange={setYoutubeOpen}>
        <DialogContent className="max-w-4xl p-0 bg-black border-border overflow-hidden">
          <DialogTitle className="sr-only">{activeProgram.title} Trailer</DialogTitle>
          <div className="aspect-video w-full">
            {youtubeOpen && (
              <iframe
                src={`https://www.youtube.com/embed/${activeProgram.youtubeId}?autoplay=1&rel=0`}
                title={`${activeProgram.title} Trailer`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default LiveProgramsSection;
