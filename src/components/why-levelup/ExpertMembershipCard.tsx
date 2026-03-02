import masterclass1 from "@/assets/masterclass-hero-new.png";
import masterclass5 from "@/assets/masterclass-5.jpg";
import { Play, FileText, CheckCircle2, Circle, Sparkles, Film, BookOpen, Bot, Radio, Calendar } from "lucide-react";

const CursorSVG = () => (
  <svg width="12" height="16" viewBox="0 0 12 16" fill="none" className="drop-shadow-lg">
    <path d="M1 1L1 12.5L4 9.5L7 15L9 14L6 8L10 8L1 1Z" fill="white" stroke="hsl(30 20% 15%)" strokeWidth="0.8" />
  </svg>
);

const tabs = [
  { icon: Film, label: "Masterclass" },
  { icon: Radio, label: "Live" },
  { icon: BookOpen, label: "Briefs" },
  { icon: Bot, label: "AI Mentor" },
];

const livePrograms = [
  { title: "Breakthrough Filmmakers' Program", format: "12 weeks · Live", status: "Enrolling", live: true },
  { title: "Video Editing Academy", format: "12 weeks · Cohort", status: "Enrolling", live: true },
  { title: "Screenwriting Workshop", format: "8 weeks · Live", status: "Upcoming", live: false },
];

const projectBriefs = [
  { text: "Shoot a 2-min short with one location", done: true },
  { text: "Edit a 60-sec reel from raw footage", done: true },
  { text: "Write a 5-page screenplay draft", done: false, active: true },
];

/* ── Screen 1: Masterclass (on-demand) ── */
const MasterclassScreen = () => (
  <div className="absolute inset-0 flex flex-col animate-lms-screen-1">
    <div className="relative flex-1 overflow-hidden rounded-md">
      <img src={masterclass1} alt="Masterclass" className="w-full h-full object-cover object-top" loading="lazy" />
      <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M8,20 L8,8 L20,8" fill="none" stroke="white" strokeWidth="1" />
        <path d="M80,8 L92,8 L92,20" fill="none" stroke="white" strokeWidth="1" />
        <path d="M8,80 L8,92 L20,92" fill="none" stroke="white" strokeWidth="1" />
        <path d="M80,92 L92,92 L92,80" fill="none" stroke="white" strokeWidth="1" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
          <Play size={12} className="text-white ml-0.5" fill="white" />
        </div>
      </div>
      <div className="absolute bottom-0 inset-x-0 px-2.5 pt-5 pb-1.5" style={{ background: "linear-gradient(to top, hsl(22 14% 0% / 0.9), transparent)" }}>
        <p className="text-[8px] font-medium text-foreground/90">Karthik Subbaraj</p>
        <p className="text-[6px] text-primary/80 uppercase tracking-wider mt-0.5">Teaches Filmmaking</p>
        <div className="mt-1 w-full h-[2px] bg-foreground/10 rounded-full overflow-hidden">
          <div className="h-full bg-primary/80 rounded-full w-[42%]" />
        </div>
      </div>
    </div>
  </div>
);

/* ── Screen 2: Live Programs ── */
const LiveScreen = () => (
  <div className="absolute inset-0 flex flex-col gap-1.5 p-2.5 animate-lms-screen-2">
    <p className="text-[7px] text-foreground/50 uppercase tracking-wider font-medium mb-0.5">Live Programs</p>
    {livePrograms.map((p, i) => (
      <div key={i} className="flex items-center gap-2 px-2 py-2 rounded-md border border-primary/10 bg-white/[0.03]">
        <div className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center shrink-0">
          <Calendar size={10} className="text-primary/70" />
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-[7px] text-foreground/70 block truncate">{p.title}</span>
          <span className="text-[5.5px] text-foreground/35">{p.format}</span>
        </div>
        {p.live ? (
          <span className="flex items-center gap-1 text-[5px] px-1.5 py-0.5 rounded-full font-medium shrink-0 bg-green-500/15 text-green-400/80 border border-green-500/20">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inset-0 rounded-full bg-green-400 opacity-60" />
              <span className="relative rounded-full h-1.5 w-1.5 bg-green-400" />
            </span>
            Live Now
          </span>
        ) : (
          <span className="text-[5px] px-1.5 py-0.5 rounded-full font-medium shrink-0 bg-primary/10 text-primary/70 border border-primary/15">{p.status}</span>
        )}
      </div>
    ))}
  </div>
);

/* ── Screen 3: Project Briefs ── */
const BriefsScreen = () => (
  <div className="absolute inset-0 flex flex-col gap-1.5 p-2.5 animate-lms-screen-3">
    <p className="text-[7px] text-foreground/50 uppercase tracking-wider font-medium mb-0.5">Portfolio Briefs</p>
    {projectBriefs.map((s, i) => (
      <div key={i} className={`flex items-center gap-2 px-2 py-2 rounded-md border ${s.active ? "border-primary/25 bg-primary/[0.06]" : "border-primary/8 bg-white/[0.02]"}`}>
        {s.done ? (
          <CheckCircle2 size={11} className="text-primary/60 shrink-0" />
        ) : (
          <Circle size={11} className={`shrink-0 ${s.active ? "text-primary/70" : "text-foreground/20"}`} />
        )}
        <span className={`text-[7px] ${s.done ? "text-foreground/40 line-through" : s.active ? "text-foreground/80 font-medium" : "text-foreground/30"}`}>{s.text}</span>
      </div>
    ))}
    <p className="text-[5.5px] text-foreground/25 italic mt-0.5 px-1">Complete briefs → build your portfolio</p>
  </div>
);

/* ── Screen 4: AI Mentor ── */
const TypingDots = () => (
  <span className="inline-flex items-center gap-[2px] ml-0.5">
    <span className="w-[3px] h-[3px] rounded-full bg-primary/50 animate-[typing-dot_1.4s_ease-in-out_infinite]" />
    <span className="w-[3px] h-[3px] rounded-full bg-primary/50 animate-[typing-dot_1.4s_ease-in-out_0.2s_infinite]" />
    <span className="w-[3px] h-[3px] rounded-full bg-primary/50 animate-[typing-dot_1.4s_ease-in-out_0.4s_infinite]" />
  </span>
);

const AIScreen = () => (
  <div className="absolute inset-0 flex flex-col gap-2 p-2.5 animate-lms-screen-4">
    <p className="text-[7px] text-foreground/50 uppercase tracking-wider font-medium mb-0.5">AI Mentor</p>
    <div className="self-end max-w-[85%] px-2 py-1.5 rounded-lg bg-primary/15 border border-primary/20">
      <p className="text-[7px] text-foreground/80">How should I pace the tension before the interval block?</p>
    </div>
    <div className="self-start max-w-[90%] px-2 py-1.5 rounded-lg bg-white/[0.04] border border-primary/10">
      <div className="flex items-center gap-1 mb-1">
        <Sparkles size={7} className="text-primary/70" />
        <span className="text-[6px] text-primary/60 font-medium">AI Mentor</span>
        <TypingDots />
      </div>
      <p className="text-[6.5px] text-foreground/60 leading-relaxed">
        Use escalating stakes across 3 beats — plant the doubt early, raise the cost midway, then let silence do the work before the break…
      </p>
    </div>
  </div>
);

const ExpertMembershipCard = () => {
  return (
    <div className="group relative w-full h-full flex items-center justify-center p-3 overflow-hidden">
      <div className="relative w-[94%] h-[92%] flex gap-1.5">

        {/* === SIDEBAR === */}
        <div
          className="w-[72px] shrink-0 rounded-lg border border-primary/15 flex flex-col overflow-hidden"
          style={{ background: "hsl(30 20% 10% / 0.95)" }}
        >
          <div className="flex items-center justify-center py-2 border-b border-primary/10">
            <Film size={11} className="text-primary/50" />
          </div>

          <div className="flex-1 flex flex-col gap-0.5 px-1 py-1.5">
            {tabs.map((tab, i) => {
              const Icon = tab.icon;
              return (
                <div
                  key={i}
                  className={`flex flex-col items-center gap-0.5 px-1 py-1.5 rounded-md cursor-default transition-colors animate-lms-tab-${i + 1}`}
                >
                  <Icon size={10} className="transition-colors" />
                  <span className="text-[5.5px] tracking-wide">{tab.label}</span>
                </div>
              );
            })}
          </div>

          <div className="px-1.5 pb-1.5">
            <div className="w-full h-[28px] rounded overflow-hidden border border-primary/10">
              <img src={masterclass5} alt="" className="w-full h-full object-cover" loading="lazy" />
            </div>
          </div>
        </div>

        {/* === MAIN CONTENT AREA === */}
        <div
          className="flex-1 relative rounded-lg border border-primary/15 overflow-hidden"
          style={{
            background: "hsl(30 20% 8% / 0.95)",
            boxShadow: "0 12px 40px -8px hsl(22 14% 0% / 0.5)",
          }}
        >
          <MasterclassScreen />
          <LiveScreen />
          <BriefsScreen />
          <AIScreen />
        </div>
      </div>

      {/* === ANIMATED CURSOR === */}
      <div className="absolute inset-0 pointer-events-none animate-lms-cursor" style={{ zIndex: 50 }}>
        <CursorSVG />
      </div>

      {/* === CLICK RIPPLES at each tab === */}
      <div className="lms-ripple lms-ripple-tab1" style={{ zIndex: 49 }} />
      <div className="lms-ripple lms-ripple-tab2" style={{ zIndex: 49 }} />
      <div className="lms-ripple lms-ripple-tab3" style={{ zIndex: 49 }} />
      <div className="lms-ripple lms-ripple-tab4" style={{ zIndex: 49 }} />

      {/* Subtle ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(30,80%,50%,0.04)_0%,_transparent_70%)] pointer-events-none" />
    </div>
  );
};

export default ExpertMembershipCard;
