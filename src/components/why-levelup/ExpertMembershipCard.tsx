import masterclass1 from "@/assets/masterclass-hero-new.png";
import masterclass2 from "@/assets/masterclass-2.jpg";
import masterclass3 from "@/assets/masterclass-3.jpg";
import masterclass4 from "@/assets/masterclass-4.jpg";
import masterclass5 from "@/assets/masterclass-5.jpg";
import masterclass6 from "@/assets/masterclass-6.jpg";
import { Play, CheckCircle2, Circle, Film, Radio } from "lucide-react";

const chapters = [
  { title: "Story Structure", duration: "14:32", done: true },
  { title: "Building Tension", duration: "11:08", done: true },
  { title: "Visual Language", duration: "18:45", done: false, nowPlaying: true },
  { title: "Director's Cut", duration: "22:10", done: false },
];

const mentorAvatars = [masterclass2, masterclass3, masterclass4];

const ExpertMembershipCard = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-3 overflow-hidden">
      {/* Main layout: player + sidebar */}
      <div className="relative w-[92%] h-[90%] flex gap-2">

        {/* === MAIN PLAYER === */}
        <div
          className="relative flex-[1.6] rounded-lg overflow-hidden border border-primary/40"
          style={{
            boxShadow: "0 12px 40px -8px hsl(0 0% 0% / 0.5), 0 0 20px 2px hsl(30 80% 45% / 0.12)",
          }}
        >
          <img
            src={masterclass1}
            alt="Masterclass lesson"
            className="w-full h-full object-cover object-top"
            loading="lazy"
          />

          {/* Viewfinder overlay */}
          <svg className="absolute inset-0 w-full h-full opacity-25 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M8,20 L8,8 L20,8" fill="none" stroke="white" strokeWidth="1" />
            <path d="M80,8 L92,8 L92,20" fill="none" stroke="white" strokeWidth="1" />
            <path d="M8,80 L8,92 L20,92" fill="none" stroke="white" strokeWidth="1" />
            <path d="M80,92 L92,92 L92,80" fill="none" stroke="white" strokeWidth="1" />
          </svg>

          {/* Play button center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
              <Play size={14} className="text-white ml-0.5" fill="white" />
            </div>
          </div>

          {/* Bottom gradient bar with mentor name */}
          <div
            className="absolute bottom-0 inset-x-0 px-3 pt-6 pb-1.5"
            style={{ background: "linear-gradient(to top, hsl(0 0% 0% / 0.9), transparent)" }}
          >
            <p className="text-[9px] font-medium text-foreground/90 leading-tight">Karthik Subbaraj</p>
            <p className="text-[7px] text-primary/80 uppercase tracking-wider mt-0.5">Teaches Filmmaking</p>

            {/* Progress bar */}
            <div className="mt-1.5 w-full h-[2px] bg-foreground/10 rounded-full overflow-hidden">
              <div className="h-full bg-primary/80 rounded-full" style={{ width: "42%" }} />
            </div>
          </div>
        </div>

        {/* === LESSON SIDEBAR === */}
        <div
          className="flex-1 rounded-lg border border-primary/15 flex flex-col overflow-hidden"
          style={{
            background: "hsl(30 20% 10% / 0.95)",
            boxShadow: "0 8px 32px -8px hsl(0 0% 0% / 0.4), 0 0 12px 2px hsl(30 80% 45% / 0.04)",
          }}
        >
          {/* Header */}
          <div className="flex items-center gap-1.5 px-2.5 py-2 border-b border-primary/10">
            <Film size={9} className="text-primary/60" />
            <span className="text-[8px] font-medium text-foreground/70 uppercase tracking-wider">Chapters</span>
          </div>

          {/* Chapter list */}
          <div className="flex-1 flex flex-col px-2 py-1.5 gap-1">
            {chapters.map((ch, i) => (
              <div
                key={i}
                className={`flex items-center gap-1.5 px-1.5 py-1.5 rounded-md transition-colors ${
                  ch.nowPlaying
                    ? "bg-primary/10 border border-primary/20"
                    : "border border-transparent"
                }`}
              >
                {ch.done ? (
                  <CheckCircle2 size={10} className="text-primary/50 shrink-0" />
                ) : (
                  <Circle size={10} className={`shrink-0 ${ch.nowPlaying ? "text-primary/70" : "text-foreground/20"}`} />
                )}
                <div className="flex-1 min-w-0">
                  <p className={`text-[7px] leading-tight truncate ${
                    ch.nowPlaying ? "text-foreground/90 font-medium" : ch.done ? "text-foreground/40" : "text-foreground/30"
                  }`}>
                    {ch.title}
                  </p>
                </div>
                <span className={`text-[6px] shrink-0 ${ch.nowPlaying ? "text-primary/70" : "text-foreground/25"}`}>
                  {ch.duration}
                </span>
              </div>
            ))}
          </div>

          {/* Sidebar thumbnail */}
          <div className="px-2 pb-2">
            <div className="w-full h-[32px] rounded overflow-hidden border border-primary/10">
              <img src={masterclass5} alt="" className="w-full h-full object-cover" loading="lazy" />
            </div>
          </div>
        </div>
      </div>

      {/* === FLOATING ELEMENTS === */}

      {/* LIVE FEEDBACK badge */}
      <div
        className="absolute flex items-center gap-1 px-2 py-1 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm"
        style={{ top: "6%", right: "8%" }}
      >
        <Radio size={7} className="text-primary" />
        <span className="text-[7px] font-medium text-primary/90 uppercase tracking-wider">Live Feedback</span>
      </div>

      {/* Discipline tags */}
      <div
        className="absolute text-[7px] px-1.5 py-0.5 rounded-full border border-primary/20 bg-white/5 text-foreground/50"
        style={{ top: "10%", left: "4%" }}
      >
        <span className="flex items-center gap-0.5"><Film size={6} className="text-primary/50" /> Filmmaking</span>
      </div>
      <div
        className="absolute text-[7px] px-1.5 py-0.5 rounded-full border border-primary/20 bg-white/5 text-foreground/50"
        style={{ bottom: "18%", left: "3%" }}
      >
        Editing
      </div>
      <div
        className="absolute text-[7px] px-1.5 py-0.5 rounded-full border border-primary/20 bg-white/5 text-foreground/50"
        style={{ bottom: "8%", right: "24%" }}
      >
        Music
      </div>

      {/* Stacked mentor avatars — bottom-left */}
      <div
        className="absolute flex items-center"
        style={{ bottom: "8%", left: "5%" }}
      >
        <div className="flex -space-x-1.5">
          {mentorAvatars.map((src, i) => (
            <div
              key={i}
              className="w-[18px] h-[18px] rounded-full overflow-hidden border border-primary/25"
              style={{ zIndex: 3 - i }}
            >
              <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
            </div>
          ))}
        </div>
        <span className="text-[6px] text-foreground/35 ml-1">+37 more</span>
      </div>

      {/* Subtle ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(30,80%,50%,0.04)_0%,_transparent_70%)] pointer-events-none" />
    </div>
  );
};

export default ExpertMembershipCard;
