import forge1 from "@/assets/forge-1.jpg";
import forge2 from "@/assets/forge-2.jpg";
import forge3 from "@/assets/forge-3.jpg";
import forge4 from "@/assets/forge-4.jpg";
import testimonial1 from "@/assets/testimonial-1.jpg";
import testimonial5 from "@/assets/testimonial-5.jpg";
import { Check, Circle, Play, Star, Eye, Heart, Film } from "lucide-react";

const projects = [
  { img: forge1, title: "Short Film", type: "Narrative" },
  { img: forge2, title: "Showreel", type: "Portfolio" },
  { img: forge4, title: "Creator Reel", type: "Social" },
];

const mentorFeedback = {
  avatar: testimonial5,
  name: "Ravi Sir",
  text: '"Great pacing — the tension holds perfectly through the midpoint."',
  stars: 4,
};

const LiveProjectsCard = () => {
  return (
    <div className="group/portfolio relative w-full h-full flex items-center justify-center p-3 overflow-hidden">
      <div
        className="relative w-[88%] h-[92%] rounded-xl border border-primary/20 overflow-hidden flex flex-col"
        style={{
          background: "hsl(30 20% 10% / 0.95)",
          boxShadow: "0 8px 32px -8px hsl(0 0% 0% / 0.4), 0 0 16px 2px hsl(30 80% 45% / 0.06)",
        }}
      >
        {/* ── Header bar ── */}
        <div className="flex items-center justify-between px-3 py-2 border-b border-primary/10">
          <div className="flex items-center gap-1.5">
            <Film size={10} className="text-primary/60" />
            <span className="text-[9px] font-medium text-foreground/80">Portfolio</span>
            <span className="text-[7px] text-foreground/30 ml-0.5">·</span>
            <span className="text-[8px] text-primary/70 animate-portfolio-count">
              <span className="animate-portfolio-count-1">1</span>
              <span className="animate-portfolio-count-2">2</span>
              <span className="animate-portfolio-count-3">3</span>
              {" "}projects
            </span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-[4px] h-[4px] rounded-full bg-green-500 animate-pulse" />
            <span className="text-[6px] text-foreground/30">Building</span>
          </div>
        </div>

        {/* ── Portfolio grid — 3 slots ── */}
        <div className="flex gap-1.5 px-3 pt-2 pb-1.5">
          {projects.map((p, i) => (
            <div
              key={i}
              className={`relative flex-1 aspect-[16/10] rounded-md overflow-hidden border animate-portfolio-slot-${i + 1}`}
              style={{
                borderColor: "hsl(var(--primary) / 0.12)",
              }}
            >
              <img src={p.img} alt={p.title} className="w-full h-full object-cover" loading="lazy" />
              {/* Checkmark overlay */}
              <div className={`absolute inset-0 flex items-center justify-center bg-black/40 animate-portfolio-check-${i + 1}`}>
                <div className="w-4 h-4 rounded-full bg-green-500/90 flex items-center justify-center">
                  <Check size={8} className="text-white" strokeWidth={3} />
                </div>
              </div>
              {/* Empty state circle */}
              <div className={`absolute inset-0 flex items-center justify-center animate-portfolio-empty-${i + 1}`}>
                <Circle size={12} className="text-foreground/15" />
              </div>
              <div
                className="absolute bottom-0 inset-x-0 px-1 py-0.5"
                style={{ background: "linear-gradient(to top, hsl(0 0% 0% / 0.85), transparent)" }}
              >
                <span className="text-[5.5px] text-foreground/60">{p.title}</span>
              </div>
            </div>
          ))}
        </div>

        {/* ── Active project panel ── */}
        <div className="px-3 pb-1.5">
          <div
            className="relative rounded-lg overflow-hidden border border-primary/15 animate-portfolio-active"
            style={{ background: "hsl(30 15% 12% / 0.8)" }}
          >
            <div className="flex gap-2 p-2">
              {/* Thumbnail */}
              <div className="relative w-[52px] h-[34px] rounded overflow-hidden shrink-0 border border-primary/10">
                <img src={forge3} alt="Active" className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center">
                    <Play size={6} className="text-white ml-[1px]" fill="white" />
                  </div>
                </div>
              </div>
              {/* Info */}
              <div className="flex-1 min-w-0 flex flex-col justify-center">
                <div className="flex items-center gap-1">
                  <span className="text-[8px] font-medium text-foreground/80 animate-portfolio-title">Short Film</span>
                  <span className="text-[5.5px] px-1 py-[1px] rounded-full bg-primary/10 text-primary/60 border border-primary/10">In Progress</span>
                </div>
                {/* Progress bar */}
                <div className="mt-1 w-full h-[3px] bg-foreground/10 rounded-full overflow-hidden">
                  <div className="h-full bg-primary/80 rounded-full animate-portfolio-progress" />
                </div>
                <span className="text-[6px] text-foreground/30 mt-0.5 animate-portfolio-percent">72%</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Mentor feedback ── */}
        <div className="px-3 pb-1.5 flex-1 min-h-0">
          <div className="animate-portfolio-feedback">
            <div className="flex gap-2">
              <div className="shrink-0">
                <div className="w-[20px] h-[20px] rounded-full overflow-hidden border border-primary/25">
                  <img src={mentorFeedback.avatar} alt="" className="w-full h-full object-cover" loading="lazy" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="text-[7px] font-medium text-foreground/80">{mentorFeedback.name}</span>
                  <span className="text-[5.5px] text-foreground/25">Mentor Review</span>
                </div>
                <div
                  className="rounded-lg px-2 py-1.5"
                  style={{
                    background: "hsl(30 30% 18% / 0.8)",
                    border: "1px solid hsl(var(--primary) / 0.2)",
                  }}
                >
                  <p className="text-[7px] text-foreground/65 leading-relaxed animate-portfolio-type">
                    {mentorFeedback.text}
                  </p>
                  {/* Star rating */}
                  <div className="flex gap-[2px] mt-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        size={7}
                        className={s <= mentorFeedback.stars ? "text-primary fill-primary" : "text-foreground/15"}
                      />
                    ))}
                  </div>
                </div>
                {/* Typing dots — visible during feedback phase */}
                <div className="flex items-center gap-1 mt-1 animate-portfolio-typing">
                  <div className="flex gap-[3px]">
                    {[0, 1, 2].map((d) => (
                      <div
                        key={d}
                        className="w-[3px] h-[3px] rounded-full bg-primary/40 animate-pulse"
                        style={{ animationDelay: `${d * 0.3}s` }}
                      />
                    ))}
                  </div>
                  <span className="text-[6px] text-foreground/25">typing…</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Engagement stats (phase 3) ── */}
          <div className="flex items-center gap-3 mt-1.5 animate-portfolio-stats">
            <div className="flex items-center gap-0.5">
              <Eye size={7} className="text-foreground/30" />
              <span className="text-[7px] text-foreground/40">12.4K</span>
            </div>
            <div className="flex items-center gap-0.5">
              <Heart size={7} className="text-destructive/50" />
              <span className="text-[7px] text-foreground/40">843</span>
            </div>
            <div className="flex-1" />
            <span className="text-[6px] px-1.5 py-[2px] rounded-full bg-green-500/15 text-green-400/70 border border-green-500/20 font-medium animate-portfolio-ready">
              Portfolio Ready ✓
            </span>
          </div>
        </div>

        {/* ── Timeline bar ── */}
        <div className="px-3 pb-2 pt-1 border-t border-primary/10">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-[5px] uppercase tracking-wider text-foreground/30 w-5">V1</span>
            <div className="flex-1 h-[3px] rounded-full overflow-hidden bg-primary/[0.08]">
              <div className="h-full rounded-full bg-primary/30 animate-portfolio-track-v" />
            </div>
          </div>
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-[5px] uppercase tracking-wider text-foreground/30 w-5">A1</span>
            <div className="flex-1 h-[2px] rounded-full overflow-hidden bg-foreground/[0.05]">
              <div className="h-full rounded-full bg-blue-400/30 animate-portfolio-track-a" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[5px] uppercase tracking-wider text-foreground/30 w-5">SFX</span>
            <div className="flex-1 relative h-[2px] bg-foreground/[0.05] rounded-full">
              <div className="h-full rounded-full bg-purple-400/25 animate-portfolio-track-sfx" />
              {/* Playhead */}
              <div className="absolute w-[3px] h-2.5 rounded-sm bg-primary/80 -top-[3px] animate-portfolio-playhead" />
            </div>
          </div>
        </div>
      </div>

      {/* Ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(30,80%,50%,0.04)_0%,_transparent_70%)] pointer-events-none" />
    </div>
  );
};

export default LiveProjectsCard;
