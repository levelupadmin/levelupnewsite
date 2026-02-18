import testimonial1 from "@/assets/testimonial-1.jpg";
import testimonial2 from "@/assets/testimonial-2.jpg";
import testimonial4 from "@/assets/testimonial-4.jpg";
import testimonial5 from "@/assets/testimonial-5.jpg";
import testimonial6 from "@/assets/testimonial-6.jpg";
import testimonial7 from "@/assets/testimonial-7.jpg";
import { Hash, Users } from "lucide-react";

const threads = [
  {
    avatar: testimonial1,
    name: "Priya",
    time: "2m",
    text: "Anyone up for a 48hr edit challenge? 🎬",
    reactions: ["🔥 12", "👏 8"],
  },
  {
    avatar: testimonial2,
    name: "Arjun",
    time: "8m",
    text: "Just got peer feedback on my reel — levelled up the pacing 🙌",
    reactions: ["❤️ 24"],
  },
  {
    avatar: testimonial4,
    name: "Meera",
    time: "15m",
    text: "Wrapped my first short film with 3 peer reviews!",
    reactions: ["🔥 6", "❤️ 18"],
  },
];

const onlineAvatars = [testimonial5, testimonial6, testimonial7];

const CommunityCard = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-3 overflow-hidden">
      {/* Main channel container */}
      <div
        className="relative w-[82%] h-[88%] rounded-xl border border-primary/20 overflow-hidden flex flex-col"
        style={{
          background: "hsl(30 20% 10% / 0.95)",
          boxShadow:
            "0 8px 32px -8px hsl(0 0% 0% / 0.4), 0 0 16px 2px hsl(30 80% 45% / 0.06)",
        }}
      >
        {/* Channel header */}
        <div className="flex items-center justify-between px-3 py-2 border-b border-primary/10">
          <div className="flex items-center gap-1.5">
            <Hash size={10} className="text-primary/60" />
            <span className="text-[9px] font-medium text-foreground/80">creators-lounge</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="flex -space-x-1.5">
              {onlineAvatars.map((src, i) => (
                <div
                  key={i}
                  className="w-[14px] h-[14px] rounded-full overflow-hidden border border-primary/20"
                >
                  <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
                </div>
              ))}
            </div>
            <span className="text-[7px] text-foreground/40 ml-0.5">142 online</span>
          </div>
        </div>

        {/* Thread messages */}
        <div className="flex-1 px-3 py-2 flex flex-col gap-3 overflow-hidden relative">
          {/* Vertical thread line */}
          <div className="absolute left-[18px] top-3 bottom-3 w-[1px] bg-primary/10" />

          {threads.map((msg, i) => (
            <div key={i} className="flex gap-2 relative" style={{ animationDelay: `${i * 0.15}s` }}>
              {/* Avatar */}
              <div className="shrink-0 relative z-[1]">
                <div className="w-[22px] h-[22px] rounded-full overflow-hidden border border-primary/25 shadow-sm">
                  <img src={msg.avatar} alt="" className="w-full h-full object-cover" loading="lazy" />
                </div>
                {i < 2 && (
                  <div className="absolute -bottom-0.5 -right-0.5 w-[6px] h-[6px] rounded-full bg-green-500 border border-[hsl(30,20%,10%)]" />
                )}
              </div>

              {/* Message bubble */}
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-1.5 mb-0.5">
                  <span className="text-[8px] font-medium text-foreground/85">{msg.name}</span>
                  <span className="text-[6px] text-foreground/30">{msg.time}</span>
                </div>
                <div
                  className="rounded-lg px-2.5 py-1.5"
                  style={{
                    background: i === 0 ? "hsl(30 30% 18% / 0.8)" : "hsl(30 15% 15% / 0.6)",
                    border: i === 0 ? "1px solid hsl(var(--primary) / 0.2)" : "1px solid hsl(var(--primary) / 0.08)",
                  }}
                >
                  <p className="text-[8px] text-foreground/65 leading-relaxed">{msg.text}</p>
                </div>
                {/* Reactions */}
                <div className="flex gap-1.5 mt-1">
                  {msg.reactions.map((r, ri) => (
                    <span
                      key={ri}
                      className="text-[7px] px-1.5 py-[1px] rounded-full bg-primary/8 border border-primary/10 text-foreground/50"
                    >
                      {r}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          <div className="flex gap-2 items-center relative">
            <div className="shrink-0 relative z-[1]">
              <div className="w-[22px] h-[22px] rounded-full overflow-hidden border border-primary/15 opacity-60">
                <img src={testimonial6} alt="" className="w-full h-full object-cover" loading="lazy" />
              </div>
            </div>
            <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-foreground/[0.03]">
              <div className="flex gap-[3px]">
                {[0, 1, 2].map((d) => (
                  <div
                    key={d}
                    className="w-[3px] h-[3px] rounded-full bg-primary/40 animate-pulse"
                    style={{ animationDelay: `${d * 0.3}s` }}
                  />
                ))}
              </div>
              <span className="text-[7px] text-foreground/30 ml-1">typing…</span>
            </div>
          </div>
        </div>

        {/* Bottom bar — member stats */}
        <div className="px-3 py-1.5 border-t border-primary/10 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Users size={8} className="text-primary/50" />
            <span className="text-[7px] text-foreground/40">2,400+ members</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-[4px] h-[4px] rounded-full bg-green-500 animate-pulse" />
            <span className="text-[6px] text-foreground/30">Live now</span>
          </div>
        </div>
      </div>

      {/* Subtle ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(30,80%,50%,0.04)_0%,_transparent_70%)] pointer-events-none" />
    </div>
  );
};

export default CommunityCard;
