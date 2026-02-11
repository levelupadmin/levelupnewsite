import { useState } from "react";
import { ArrowRight, Clock, Radio, CalendarDays } from "lucide-react";
import careerQuizBanner from "@/assets/career-quiz-banner.jpg";
import { showcasePrograms } from "@/data/programs";

const activeGradients = [
  { active: "from-orange-600 to-orange-600/0", hoverBg: "linear-gradient(to right, rgba(234,88,12,0.25), transparent)", detailBg: "linear-gradient(135deg, rgba(234,88,12,0.15) 0%, transparent 60%)" },
  { active: "from-blue-600 to-blue-600/0", hoverBg: "linear-gradient(to right, rgba(37,99,235,0.25), transparent)", detailBg: "linear-gradient(135deg, rgba(37,99,235,0.15) 0%, transparent 60%)" },
  { active: "from-purple-600 to-purple-600/0", hoverBg: "linear-gradient(to right, rgba(147,51,234,0.25), transparent)", detailBg: "linear-gradient(135deg, rgba(147,51,234,0.15) 0%, transparent 60%)" },
  { active: "from-emerald-600 to-emerald-600/0", hoverBg: "linear-gradient(to right, rgba(5,150,105,0.25), transparent)", detailBg: "linear-gradient(135deg, rgba(5,150,105,0.15) 0%, transparent 60%)" },
  { active: "from-rose-600 to-rose-600/0", hoverBg: "linear-gradient(to right, rgba(225,29,72,0.25), transparent)", detailBg: "linear-gradient(135deg, rgba(225,29,72,0.15) 0%, transparent 60%)" },
  { active: "from-indigo-600 to-indigo-600/0", hoverBg: "linear-gradient(to right, rgba(79,70,229,0.25), transparent)", detailBg: "linear-gradient(135deg, rgba(79,70,229,0.15) 0%, transparent 60%)" },
];

const statusStyles: Record<string, string> = {
  Enrolling: "bg-primary/10 text-primary border-primary/20",
  Upcoming: "bg-secondary text-secondary-foreground border-border",
  "Coming Soon": "bg-muted text-muted-foreground border-border",
};

const LiveProgramsSection = () => {
  const [activeShowcase, setActiveShowcase] = useState(0);
  const activeProgram = showcasePrograms[activeShowcase];

  return (
    <section id="live-programs" aria-label="Live programs" className="relative py-14 md:py-20">
      {/* Amber accent line at top */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{
          background:
            "linear-gradient(90deg, transparent 10%, hsl(38 75% 55% / 0.5) 50%, transparent 90%)",
        }}
      />

      {/* Subtle top glow */}
      <div
        className="absolute top-0 left-0 right-0 h-64 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, hsl(38 75% 55% / 0.03) 0%, transparent 70%)",
        }}
      />

      {/* Section header */}
      <div className="text-center px-6 md:px-12 mb-10 md:mb-12">
        <span className="inline-block font-sans-body text-[10px] md:text-xs tracking-[0.15em] uppercase px-3 py-1 rounded-full border border-primary/30 text-primary bg-primary/5 mb-4">
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
      </div>

      {/* Showcase: Sidebar | Image | Details */}
      <div className="max-w-[1400px] mx-auto px-5 md:px-12">
        <div className="flex flex-col md:flex-row rounded-sm overflow-hidden border border-border bg-card">

          {/* Left sidebar */}
          <div className="md:w-[260px] lg:w-[300px] flex-shrink-0 md:border-r border-border flex flex-col">
            {showcasePrograms.map((prog, i) => (
              <div key={prog.id}>
                {i > 0 && <div className="h-px bg-border/40" />}
                <button
                  onClick={() => setActiveShowcase(i)}
                  className={`group relative flex w-full items-center justify-between whitespace-nowrap rounded-lg px-5 py-4 text-left text-sm transition-all overflow-hidden ${
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
                  {activeShowcase === i && <ArrowRight className="w-4 h-4 flex-shrink-0 ml-2 text-primary" />}
                </button>
              </div>
            ))}

            {/* Mini CTA Banner */}
            <div className="hidden md:block mt-auto p-4">
              <div className="relative rounded-lg overflow-hidden border border-primary/50">
                <div style={{ maskImage: 'linear-gradient(to left, black, transparent)', WebkitMaskImage: 'linear-gradient(to left, black, transparent)' }}>
                  <img
                    src={careerQuizBanner}
                    alt="Career quiz"
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
                  <div className="relative p-4">
                    <p className="font-sans-body text-xs text-muted-foreground leading-snug mb-2">
                      Not sure which creator<br />path fits you?
                    </p>
                    <a
                      href="https://www.leveluplearning.live/bfp"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-sans-body text-xs text-primary hover:text-primary/80 transition-colors"
                    >
                      Take our quiz <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Center image */}
          <div className="relative aspect-[16/10] md:aspect-auto md:w-[40%] overflow-hidden">
            <img
              src={activeProgram.image}
              alt={activeProgram.title}
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
              loading="lazy"
            />
          </div>

          {/* Right details */}
          <div
            className="flex-1 flex flex-col justify-between p-6 lg:p-8"
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

              <h3 className="font-serif-display text-2xl lg:text-3xl font-medium text-hero-headline leading-tight tracking-tight mb-3">
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
                  href="https://www.leveluplearning.live/bfp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-sweep cta-glow inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-sans-body text-sm font-medium tracking-wide transition-colors hover:bg-primary/90 whitespace-nowrap"
                >
                  {activeProgram.status === "Enrolling" ? "Enroll Now" : "Join Waitlist"}
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://www.leveluplearning.live/bfp"
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
    </section>
  );
};

export default LiveProgramsSection;
