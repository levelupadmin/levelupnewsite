import forge1 from "@/assets/forge-1.jpg";
import forge2 from "@/assets/forge-2.jpg";
import forge4 from "@/assets/forge-4.jpg";
import testimonial1 from "@/assets/testimonial-1.jpg";
import testimonial5 from "@/assets/testimonial-5.jpg";
import testimonial2 from "@/assets/testimonial-2.jpg";
import { Film, Eye, MessageCircle, Briefcase, TrendingUp } from "lucide-react";

const portfolioProjects = [
  { img: forge1, title: "Debut Short Film", views: "2.1K" },
  { img: forge2, title: "Brand Showreel", views: "1.8K" },
  { img: forge4, title: "Music Video", views: "4.7K" },
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
        {/* ── Header bar ── */}
        <div className="flex items-center justify-between px-3 py-2 border-b border-primary/10">
          <div className="flex items-center gap-1.5">
            <Film size={10} className="text-primary/60" />
            <span className="text-[9px] font-medium text-foreground/80">Portfolio</span>
            <span className="text-[7px] text-foreground/30 ml-0.5">·</span>
            <span className="text-[8px] text-foreground/40 font-mono">yourname.lu/work</span>
          </div>
          <div className="flex items-center gap-1.5">
            {/* Notification badge — counts up 1→2→3 */}
            <div className="relative w-[14px] h-[14px] rounded-full bg-destructive/80 flex items-center justify-center animate-pf-badge">
              <span className="relative inline-block w-[1ch] text-[7px] text-white font-bold">
                <span className="absolute inset-0 flex items-center justify-center animate-pf-badge-1">1</span>
                <span className="absolute inset-0 flex items-center justify-center animate-pf-badge-2">2</span>
                <span className="absolute inset-0 flex items-center justify-center animate-pf-badge-3">3</span>
              </span>
            </div>
            <div className="w-[4px] h-[4px] rounded-full bg-green-500 animate-pulse" />
          </div>
        </div>

        {/* ── Portfolio grid — 3 thumbnails with view counts ── */}
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
                style={{ background: "linear-gradient(to top, hsl(0 0% 0% / 0.7) 0%, transparent 60%)" }}
              />
              {/* View count overlay */}
              <div className={`absolute bottom-0 inset-x-0 px-1 py-0.5 flex items-center justify-between`}>
                <span className="text-[5px] text-foreground/50 truncate">{p.title}</span>
                <div className={`flex items-center gap-[2px] animate-pf-views-${i + 1}`}>
                  <Eye size={5} className="text-foreground/40" />
                  <span className="text-[6px] text-foreground/60 font-mono">{p.views}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Incoming notifications feed ── */}
        <div className="px-3 pb-1 flex-1 min-h-0 flex flex-col gap-1.5">
          <div className="flex items-center gap-1 mb-0.5">
            <span className="text-[6px] uppercase tracking-widest text-foreground/25">Incoming</span>
            <div className="flex-1 h-px bg-primary/10" />
          </div>

          {/* Notification 1: Client DM */}
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
                <div className="absolute -bottom-[1px] -right-[1px] w-[5px] h-[5px] rounded-full bg-green-500 border border-[hsl(30,30%,15%)]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1 mb-0.5">
                  <span className="text-[7px] font-medium text-foreground/80">Priya Menon</span>
                  <span className="text-[5px] text-primary/50">Pixel Studios</span>
                </div>
                <p className="text-[6.5px] text-foreground/55 leading-relaxed animate-pf-type-1">
                  "Love your reel — are you free for a shoot next week?"
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

          {/* Notification 2: Gig Alert */}
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
                <div className="flex items-center gap-1">
                  <span className="text-[7px] font-medium text-foreground/75">Gig Alert</span>
                  <span className="text-[5px] text-foreground/25">2m ago</span>
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-[6.5px] text-foreground/55">Wedding Film</span>
                  <span className="text-[6px] text-foreground/30">·</span>
                  <span className="text-[7px] font-semibold text-green-400/80">₹45K</span>
                </div>
              </div>
              {/* Accept button with ripple */}
              <div className="relative">
                <div className="px-2 py-[3px] rounded-md bg-primary/20 text-[6px] text-primary/80 font-medium border border-primary/15 animate-pf-accept">
                  Accept
                </div>
                <div className="absolute inset-0 rounded-md bg-primary/30 animate-pf-ripple" />
              </div>
            </div>
          </div>

          {/* Notification 3: Community reactions */}
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
                <div className="flex items-center gap-1 mb-0.5">
                  <span className="text-[7px] font-medium text-foreground/75">Community</span>
                  <span className="text-[5px] text-foreground/25">Your edit</span>
                </div>
                <div className="flex items-center gap-2">
                  {/* Emoji reactions */}
                  <div className="flex items-center gap-1 animate-pf-reactions">
                    <span className="text-[8px] px-1 py-[1px] rounded-full bg-orange-500/10 border border-orange-500/15">🔥 24</span>
                    <span className="text-[8px] px-1 py-[1px] rounded-full bg-red-500/10 border border-red-500/15">❤️ 18</span>
                  </div>
                  {/* Stacked avatars */}
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

        {/* ── Earnings stats bar ── */}
        <div className="px-3 py-2 border-t border-primary/10 animate-pf-earnings">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1">
              <TrendingUp size={7} className="text-green-400/60" />
              <span className="text-[7px] text-foreground/50">This month</span>
            </div>
            <span className="text-[8px] font-semibold text-green-400/80 font-mono animate-pf-earned">₹1.2L earned</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-[3px] bg-foreground/[0.06] rounded-full overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-primary/60 to-green-400/50 animate-pf-gig-bar" />
            </div>
            <span className="text-[6px] text-foreground/30">3 gigs done</span>
          </div>
        </div>
      </div>

      {/* Ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(30,80%,50%,0.04)_0%,_transparent_70%)] pointer-events-none" />
    </div>
  );
};

export default LiveProjectsCard;
