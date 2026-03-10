import forge1 from "@/assets/forge-1.jpg";
import forge2 from "@/assets/forge-2.jpg";
import forge4 from "@/assets/forge-4.jpg";
import masterclass3 from "@/assets/masterclass-3.jpg";
import masterclass4 from "@/assets/masterclass-4.jpg";
import testimonial1 from "@/assets/testimonial-1.jpg";
import testimonial2 from "@/assets/testimonial-2.jpg";
import testimonial4 from "@/assets/testimonial-4.jpg";
import testimonial5 from "@/assets/testimonial-5.jpg";
import { Film, TrendingUp, Award, Eye, Upload, MessageSquare, Star, Briefcase, Trophy, Share2, Zap } from "lucide-react";

/* ── Portfolio projects that cycle in the featured slot ── */
const portfolioProjects = [
  { img: forge1, title: "Debut Short Film", origin: "BFP · Week 10", progress: 100 },
  { img: forge2, title: "YouTube Showreel", origin: "Editing Academy", progress: 78 },
  { img: forge4, title: "Screenplay Pilot", origin: "Writing Workshop", progress: 45 },
  { img: masterclass3, title: "Music Video Edit", origin: "VE Academy · Week 6", progress: 92 },
  { img: masterclass4, title: "Brand Commercial", origin: "Freelance · Gig #1", progress: 100 },
];

/* ── Activity feed entries — a rich, evolving narrative ── */
const activityFeed = [
  { icon: Upload, avatar: testimonial1, name: "You", text: "Uploaded 'Debut Short Film' to portfolio", time: "2m", accent: false },
  { icon: Eye, avatar: null, name: null, text: "3 industry views on your showreel", time: "5m", accent: true },
  { icon: MessageSquare, avatar: testimonial2, name: "Arjun", text: "Left feedback on your color grade 🎨", time: "12m", accent: false },
  { icon: Star, avatar: null, name: null, text: "Rated 4.8★ by peer reviewers", time: "18m", accent: true },
  { icon: Trophy, avatar: null, name: null, text: "Mumbai Film Festival: Selected! 🏆", time: "1h", accent: true },
  { icon: Briefcase, avatar: null, name: null, text: "Freelance inquiry: Wedding film edit", time: "2h", accent: false },
  { icon: TrendingUp, avatar: null, name: null, text: "Portfolio views up 140% this week", time: "3h", accent: true },
  { icon: Share2, avatar: testimonial4, name: "Meera", text: "Shared your showreel with her network", time: "3h", accent: false },
  { icon: Award, avatar: null, name: null, text: "Completed all 3 portfolio briefs ✅", time: "5h", accent: true },
  { icon: Zap, avatar: null, name: null, text: "First paid gig landed: ₹15K edit", time: "1d", accent: true },
  { icon: Upload, avatar: testimonial5, name: "Kiran", text: "Mentioned your work in #creators-lounge", time: "1d", accent: false },
  { icon: Eye, avatar: null, name: null, text: "Recruiter from YRF viewed your portfolio", time: "2d", accent: true },
];

/* ── Activity feed item ── */
const ActivityItem = ({ item, i }: { item: typeof activityFeed[0]; i: number }) => {
  const Icon = item.icon;
  return (
    <div className="flex items-start gap-2 shrink-0 py-1">
      <div
        className="w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5"
        style={{
          background: item.accent ? "hsl(var(--primary) / 0.12)" : "hsl(30 30% 15% / 0.6)",
          border: `1px solid hsl(var(--primary) / ${item.accent ? "0.25" : "0.1"})`,
        }}
      >
        {item.avatar ? (
          <img src={item.avatar} alt="" className="w-full h-full rounded-md object-cover" loading="lazy" />
        ) : (
          <Icon size={9} className={item.accent ? "text-primary/80" : "text-foreground/40"} />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[8px] text-foreground/65 leading-relaxed">
          {item.name && <span className="text-foreground/80 font-medium">{item.name} </span>}
          {item.text}
        </p>
        <span className="text-[6px] text-foreground/25">{item.time}</span>
      </div>
    </div>
  );
};

const LiveProjectsCard = () => {
  return (
    <div className="group/portfolio relative w-full h-full flex items-center justify-center p-3 overflow-hidden">
      <div
        className="relative w-[90%] h-[94%] rounded-xl overflow-hidden flex flex-col"
        style={{
          background: "hsl(30 20% 10% / 0.95)",
          boxShadow: "0 8px 32px -8px hsl(22 14% 0% / 0.4), 0 0 16px 2px hsl(30 80% 45% / 0.06)",
        }}
      >
        {/* Header */}
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-primary/10">
          <Film size={12} className="text-primary/60" />
          <span className="text-[11px] font-medium text-foreground/80 tracking-wide">My Portfolio</span>
          <div className="ml-auto flex items-center gap-1.5">
            <span className="w-[6px] h-[6px] rounded-full bg-accent animate-pulse" />
            <span className="text-[9px] text-foreground/30">Live</span>
          </div>
        </div>

        {/* Featured project — cycles through projects */}
        <div className="relative h-[72px] mx-3 mt-2.5 rounded-lg overflow-hidden border border-primary/12 shrink-0">
          {portfolioProjects.map((p, i) => (
            <div
              key={i}
              className={`absolute inset-0 pf-featured-${i + 1}`}
            >
              <img src={p.img} alt={p.title} className="w-full h-full object-cover" loading="lazy" />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, hsl(22 14% 0% / 0.85) 0%, transparent 50%)" }}
              />
              <div className="absolute bottom-0 inset-x-0 px-3 py-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[9px] font-medium text-foreground/90 leading-tight">{p.title}</p>
                    <p className="text-[7px] text-primary/60 leading-tight mt-0.5">{p.origin}</p>
                  </div>
                  {p.progress === 100 && (
                    <span className="text-[6px] px-1.5 py-0.5 rounded-full bg-green-500/15 text-green-400/80 border border-green-500/20 font-medium">
                      Complete
                    </span>
                  )}
                </div>
                {/* Progress bar */}
                <div className="mt-1.5 w-full h-[2px] bg-foreground/10 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full pf-progress-fill"
                    style={{
                      width: `${p.progress}%`,
                      background: p.progress === 100
                        ? "hsl(142 76% 46% / 0.7)"
                        : "hsl(var(--primary) / 0.8)",
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Activity feed — auto-scrolling */}
        <div className="flex-1 overflow-hidden relative min-h-0">
          {/* Gradient masks */}
          <div className="absolute inset-x-0 top-0 h-5 z-10 pointer-events-none" style={{ background: "linear-gradient(to bottom, hsl(30 20% 10% / 0.95), transparent)" }} />
          <div className="absolute inset-x-0 bottom-0 h-5 z-10 pointer-events-none" style={{ background: "linear-gradient(to top, hsl(30 20% 10% / 0.95), transparent)" }} />

          {/* Scrolling container — duplicated for seamless loop */}
          <div className="animate-scroll-portfolio-up group-hover/portfolio:[animation-play-state:paused] px-4 py-2 flex flex-col gap-2">
            {activityFeed.map((item, i) => (
              <ActivityItem key={`a-${i}`} item={item} i={i} />
            ))}
            {activityFeed.map((item, i) => (
              <ActivityItem key={`b-${i}`} item={item} i={i} />
            ))}
          </div>
        </div>

        {/* Bottom summary with animated counters */}
        <div className="px-4 py-2.5 border-t border-primary/10">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex items-center gap-1 shrink-0">
                <Film size={8} className="text-primary/50" />
                <span className="text-[9px] text-foreground/50 font-mono leading-none pf-counter-projects">5 projects</span>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <Briefcase size={8} className="text-primary/50" />
                <span className="text-[9px] text-foreground/50 font-mono leading-none pf-counter-gigs">2 paid gigs</span>
              </div>
            </div>
            <span className="text-[8px] text-primary/40 shrink-0 pf-built-tag">Built during LevelUp</span>
          </div>
        </div>

        {/* Notification toast — pops in periodically */}
        <div className="pf-notification absolute top-2 right-2 z-20 pointer-events-none">
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-lg border border-primary/20"
            style={{
              background: "hsl(30 20% 12% / 0.97)",
              boxShadow: "0 8px 24px -4px hsl(22 14% 0% / 0.6), 0 0 12px 1px hsl(30 80% 45% / 0.08)",
              backdropFilter: "blur(8px)",
            }}
          >
            <div className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center">
              <Trophy size={10} className="text-primary" />
            </div>
            <div>
              <p className="text-[8px] font-medium text-foreground/90">Festival Selected! 🏆</p>
              <p className="text-[6px] text-foreground/40">Mumbai Short Film Festival</p>
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
