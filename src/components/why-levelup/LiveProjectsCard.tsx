import forge1 from "@/assets/forge-1.jpg";
import forge2 from "@/assets/forge-2.jpg";
import forge4 from "@/assets/forge-4.jpg";
import { Film, TrendingUp, Award } from "lucide-react";

const portfolioProjects = [
  { img: forge1, title: "Debut Short Film", origin: "BFP · Week 10" },
  { img: forge2, title: "YouTube Showreel", origin: "Editing Academy" },
  { img: forge4, title: "Screenplay Pilot", origin: "Writing Workshop" },
];

const milestones = [
  { icon: Film, label: "3 portfolio-ready projects" },
  { icon: TrendingUp, label: "First freelance gig landed" },
  { icon: Award, label: "Festival selection" },
];

const LiveProjectsCard = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-3 overflow-hidden">
      <div
        className="relative w-[90%] h-[94%] rounded-xl overflow-hidden flex flex-col"
        style={{
          background: "hsl(30 20% 10% / 0.95)",
          boxShadow: "0 8px 32px -8px hsl(22 14% 0% / 0.4), 0 0 16px 2px hsl(30 80% 45% / 0.06)",
        }}
      >
        {/* Header */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-primary/10">
          <Film size={12} className="text-primary/60" />
          <span className="text-[11px] font-medium text-foreground/80 tracking-wide">My Portfolio</span>
          <div className="ml-auto flex items-center gap-1.5">
            <span className="w-[6px] h-[6px] rounded-full bg-accent animate-pulse" />
            <span className="text-[9px] text-foreground/30">Live</span>
          </div>
        </div>

        {/* Portfolio thumbnails */}
        <div className="flex gap-2 px-4 pt-3 pb-2">
          {portfolioProjects.map((p, i) => (
            <div
              key={i}
              className="relative flex-1 aspect-[4/3] rounded-lg overflow-hidden border"
              style={{ borderColor: "hsl(var(--primary) / 0.12)" }}
            >
              <img src={p.img} alt={p.title} className="w-full h-full object-cover" loading="lazy" />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, hsl(22 14% 0% / 0.8) 0%, transparent 60%)" }}
              />
              <div className="absolute bottom-0 inset-x-0 px-2 py-1.5">
                <p className="text-[9px] font-medium text-foreground/80 leading-tight truncate">{p.title}</p>
                <p className="text-[7px] text-primary/60 leading-tight mt-0.5 truncate">{p.origin}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Milestones */}
        <div className="flex-1 px-4 py-2 flex flex-col gap-2 min-h-0">
          <span className="text-[8px] uppercase tracking-widest text-foreground/25">What happened next</span>
          {milestones.map((m, i) => (
            <div
              key={i}
              className="flex items-center gap-2.5 rounded-lg px-3 py-2"
              style={{
                background: "hsl(30 30% 15% / 0.6)",
                border: "1px solid hsl(var(--primary) / 0.12)",
                animation: `pf-fade-in 0.5s ease ${i * 0.15}s both`,
              }}
            >
              <div className="w-5 h-5 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                <m.icon size={10} className="text-primary/70" />
              </div>
              <span className="text-[10px] text-foreground/65 leading-snug">{m.label}</span>
            </div>
          ))}
        </div>

        {/* Bottom summary */}
        <div className="px-4 py-2.5 border-t border-primary/10">
          <div className="flex items-center justify-between">
            <span className="text-[9px] text-foreground/50 font-mono">3 projects · 1 paid gig</span>
            <span className="text-[8px] text-primary/40">Built during LevelUp</span>
          </div>
        </div>
      </div>

      {/* Ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(30,80%,50%,0.04)_0%,_transparent_70%)] pointer-events-none" />
    </div>
  );
};

export default LiveProjectsCard;
