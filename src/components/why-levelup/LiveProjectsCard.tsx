import forge1 from "@/assets/forge-1.jpg";
import forge2 from "@/assets/forge-2.jpg";
import forge4 from "@/assets/forge-4.jpg";
import testimonial1 from "@/assets/testimonial-1.jpg";
import testimonial5 from "@/assets/testimonial-5.jpg";
import testimonial2 from "@/assets/testimonial-2.jpg";
import { Film, Briefcase, MessageCircle } from "lucide-react";

const portfolioProjects = [
  { img: forge1, title: "Debut Short Film", origin: "BFP · Week 10" },
  { img: forge2, title: "YouTube Showreel", origin: "Video Editing Academy" },
  { img: forge4, title: "Screenplay Pilot", origin: "Screenwriting Workshop" },
];

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
        {/* ── Header — simple label, no app chrome ── */}
        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-primary/10">
          <Film size={10} className="text-primary/60" />
          <span className="text-[9px] font-medium text-foreground/80">My Work</span>
        </div>

        {/* ── Portfolio grid — 3 thumbnails with program origin tags ── */}
        <div className="flex gap-1.5 px-3 pt-2 pb-1.5">
          {portfolioProjects.map((p, i) => (
            <div
              key={i}
              className={`relative flex-1 aspect-[16/10] rounded-md overflow-hidden border animate-pf-thumb-${i + 1}`}
              style={{ borderColor: "hsl(var(--primary) / 0.12)" }}
            >
              <img src={p.img} alt={p.title} className="w-full h-full object-cover" loading="lazy" />
              {/* Dark gradient overlay */}
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, hsl(0 0% 0% / 0.75) 0%, transparent 55%)" }}
              />
              {/* Title + program origin tag */}
              <div className="absolute bottom-0 inset-x-0 px-1 py-0.5 flex flex-col gap-[1px]">
                <span className="text-[5.5px] text-foreground/60 truncate leading-tight">{p.title}</span>
                <span className={`text-[5px] text-primary/70 font-mono leading-tight animate-pf-views-${i + 1}`}>
                  {p.origin}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* ── "What happened next" — organic outcomes ── */}
        <div className="px-3 pb-1 flex-1 min-h-0 flex flex-col gap-1.5">
          <div className="flex items-center gap-1 mb-0.5">
            <span className="text-[6px] uppercase tracking-widest text-foreground/25">What happened next</span>
            <div className="flex-1 h-px bg-primary/10" />
          </div>

          {/* Outcome 1: Someone reached out — references specific project */}
          <div
            className="rounded-lg px-2 py-1.5 animate-pf-notif-1"
            style={{
              background: "hsl(30 30% 15% / 0.8)",
              border: "1px solid hsl(var(--primary) / 0.15)",
            }}
          >
            <div className="flex gap-1.5">
              <div className="relative shrink-0">
                <div className="w-[18px] h-[18px] rounded-full overflow-hidden border border-primary/20">
                  <img src={testimonial5} alt="" className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="absolute -bottom-[1px] -right-[1px] w-[5px] h-[5px] rounded-full bg-accent border" style={{ borderColor: "hsl(30 30% 15%)" }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1 mb-0.5">
                  <span className="text-[7px] font-medium text-foreground/80">Priya Menon</span>
                  <span className="text-[5px] text-primary/50">Pixel Studios</span>
                </div>
                <p className="text-[6.5px] text-foreground/55 leading-relaxed animate-pf-type-1">
                  "Saw your BFP short — can we talk about a shoot?"
                </p>
                {/* Typing dots */}
                <div className="flex items-center gap-1 mt-0.5 animate-pf-typing-1">
                  <div className="flex gap-[2px]">
                    {[0, 1, 2].map((d) => (
                      <div
                        key={d}
                        className="w-[2.5px] h-[2.5px] rounded-full bg-primary/40 animate-pulse"
                        style={{ animationDelay: `${d * 0.25}s` }}
                      />
                    ))}
                  </div>
                  <span className="text-[5px] text-foreground/20">typing…</span>
                </div>
              </div>
            </div>
          </div>

          {/* Outcome 2: Freelance enquiry — passive proof, no CTA */}
          <div
            className="rounded-lg px-2 py-1.5 animate-pf-notif-2"
            style={{
              background: "hsl(30 20% 13% / 0.8)",
              border: "1px solid hsl(var(--primary) / 0.12)",
            }}
          >
            <div className="flex items-center gap-1.5">
              <div className="w-[18px] h-[18px] rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                <Briefcase size={8} className="text-primary/60" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[7px] font-medium text-foreground/75">Freelance enquiry</span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-[6.5px] text-foreground/55">Wedding Film</span>
                  <span className="text-[6px] text-foreground/30">·</span>
                  <span className="text-[7px] font-semibold text-primary/80">₹45K</span>
                </div>
              </div>
            </div>
          </div>

          {/* Outcome 3: Cohort reactions — peer love */}
          <div
            className="rounded-lg px-2 py-1.5 animate-pf-notif-3"
            style={{
              background: "hsl(30 25% 14% / 0.8)",
              border: "1px solid hsl(var(--primary) / 0.1)",
            }}
          >
            <div className="flex items-center gap-1.5">
              <div className="w-[18px] h-[18px] rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                <MessageCircle size={8} className="text-primary/60" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[7px] font-medium text-foreground/75 mb-0.5 block">From your cohort</span>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 animate-pf-reactions">
                    <span className="text-[8px] px-1 py-[1px] rounded-full bg-primary/10 border border-primary/15">🔥 24</span>
                    <span className="text-[8px] px-1 py-[1px] rounded-full bg-destructive/10 border border-destructive/15">❤️ 18</span>
                  </div>
                  <div className="flex -space-x-1.5 animate-pf-avatars">
                    {[testimonial1, testimonial2, testimonial5].map((av, i) => (
                      <div key={i} className="w-[12px] h-[12px] rounded-full overflow-hidden border border-[hsl(30,25%,14%)]">
                        <img src={av} alt="" className="w-full h-full object-cover" loading="lazy" />
                      </div>
                    ))}
                    <div className="w-[12px] h-[12px] rounded-full bg-primary/10 border border-primary/15 flex items-center justify-center">
                      <span className="text-[5px] text-primary/60">+14</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom summary — outcome + origin attribution ── */}
        <div className="px-3 py-2 border-t border-primary/10 animate-pf-earnings">
          <div className="flex items-center justify-between">
            <span className="text-[7px] text-foreground/50 font-mono animate-pf-earned">3 projects · 1 paid gig</span>
            <span className="text-[6px] text-primary/40">Built during LevelUp programs</span>
          </div>
        </div>
      </div>

      {/* Ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(30,80%,50%,0.04)_0%,_transparent_70%)] pointer-events-none" />
    </div>
  );
};

export default LiveProjectsCard;
