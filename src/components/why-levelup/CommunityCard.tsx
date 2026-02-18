import testimonial1 from "@/assets/testimonial-1.jpg";
import testimonial2 from "@/assets/testimonial-2.jpg";
import testimonial4 from "@/assets/testimonial-4.jpg";
import testimonial5 from "@/assets/testimonial-5.jpg";
import testimonial6 from "@/assets/testimonial-6.jpg";
import testimonial7 from "@/assets/testimonial-7.jpg";
import { MessageCircle } from "lucide-react";

const avatars = [testimonial1, testimonial2, testimonial4, testimonial5, testimonial6, testimonial7];

const chatBubbles = [
  { text: "Anyone up for a 48hr edit challenge? 🎬", left: "4%", rotate: -4, zIndex: 1 },
  { text: "Just got feedback on my reel — super helpful 🔥", left: "14%", rotate: 1, zIndex: 2 },
  { text: "Wrapped my first short film with 3 peer reviews!", left: "24%", rotate: 3, zIndex: 3 },
];

const floatClasses = ["animate-float-card-1", "animate-float-card-2", "animate-float-card-3"];

const tags = [
  { label: "Feedback Loop", top: "8%", left: "3%", delay: "0s" },
  { label: "Peer Review", top: "28%", left: "5%", delay: "0.8s" },
  { label: "2K+ Members", top: "48%", left: "2%", delay: "1.6s" },
  { label: "Daily Prompts", top: "68%", left: "4%", delay: "2.2s" },
  { label: "Work-in-Progress", top: "84%", left: "3%", delay: "1.2s" },
];

const activityItems = [
  { name: "Priya", action: "shared a reel", time: "2m", online: true },
  { name: "Arjun", action: "reviewed your edit", time: "8m", online: true },
  { name: "Meera", action: "joined the group", time: "15m", online: false },
  { name: "Prompt", action: "48hr challenge 🎬", time: "1h", online: false },
];

const avatarPositions = [
  { top: "4%", left: "26%", delay: "0s" },
  { top: "1%", left: "38%", delay: "0.3s" },
  { top: "5%", left: "50%", delay: "0.6s" },
  { top: "2%", left: "62%", delay: "0.9s" },
  { top: "8%", left: "32%", delay: "1.2s" },
  { top: "6%", left: "56%", delay: "0.5s" },
];

const CommunityCard = () => {
  const circumference = 2 * Math.PI * 12;

  return (
    <div className="relative w-full h-full flex items-center justify-center p-4 overflow-hidden">
      {/* Network lines accent - left edge */}
      <div className="absolute left-[3%] top-[10%] bottom-[10%] w-[6px] opacity-[0.12]">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="w-[2px] h-[8px] bg-foreground/40 rounded-full mb-[10px] mx-auto" />
        ))}
        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] -translate-x-1/2 border-l border-dashed border-foreground/10" />
      </div>

      {/* Avatar constellation with network lines */}
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.06]">
        <line x1="31%" y1="12%" x2="43%" y2="9%" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 3" />
        <line x1="43%" y1="9%" x2="55%" y2="13%" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 3" />
        <line x1="55%" y1="13%" x2="67%" y2="10%" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 3" />
        <line x1="37%" y1="16%" x2="61%" y2="14%" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 3" />
      </svg>

      {avatars.map((src, i) => (
        <div
          key={i}
          className={`absolute ${floatClasses[i % 3]}`}
          style={{
            top: avatarPositions[i].top,
            left: avatarPositions[i].left,
            animationDelay: avatarPositions[i].delay,
            zIndex: 3,
          }}
        >
          <div
            className="w-[30px] h-[30px] rounded-full overflow-hidden border border-primary/30 shadow-md"
            style={{ transform: `rotate(${(i - 2.5) * 4}deg)` }}
          >
            <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
          </div>
        </div>
      ))}

      {/* Stacked chat bubbles */}
      <div className="relative w-[58%] aspect-[4/3]" style={{ marginTop: "14%" }}>
        {chatBubbles.map((bubble, i) => (
          <div
            key={i}
            className={`absolute rounded-lg overflow-hidden ${floatClasses[i]} ${
              i === 2 ? "border border-primary/40" : "border border-primary/15"
            }`}
            style={{
              width: "65%",
              top: "25%",
              left: bubble.left,
              transform: `rotate(${bubble.rotate}deg)`,
              zIndex: bubble.zIndex,
              background: "hsl(30 20% 14% / 0.9)",
              boxShadow: `0 ${4 + i * 4}px ${12 + i * 6}px -4px hsl(0 0% 0% / ${0.3 + i * 0.1})`,
            }}
          >
            <div className="px-3 py-2.5">
              <div className="flex items-center gap-1.5 mb-1">
                <MessageCircle size={8} className="text-primary/60" />
                <span className="text-[7px] uppercase tracking-wider text-foreground/40">Community</span>
              </div>
              <p className="font-sans-body text-[9px] text-foreground/70 leading-relaxed">
                {bubble.text}
              </p>
              {i === 2 && (
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-[8px]">❤️ 24</span>
                  <span className="text-[8px]">🔥 12</span>
                  <span className="text-[8px]">👏 8</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Activity feed panel */}
      <div
        className="absolute animate-float-card-2"
        style={{ top: "16%", right: "6%", zIndex: 4 }}
      >
        <div
          className="w-[76px] rounded-xl border border-primary/30 overflow-hidden"
          style={{
            background: "hsl(30 20% 12% / 0.95)",
            boxShadow: "0 4px 20px -4px hsl(30 80% 45% / 0.2), 0 0 12px 2px hsl(30 80% 45% / 0.08)",
          }}
        >
          <div className="px-2 py-2">
            <span className="text-[6px] uppercase tracking-wider text-foreground/40 block mb-1.5">Activity</span>
            {activityItems.map((item, i) => (
              <div key={i} className="flex items-start gap-1 mb-2 last:mb-0">
                <div
                  className={`w-[4px] h-[4px] rounded-full mt-[2px] shrink-0 ${
                    item.online ? "bg-green-500" : "bg-foreground/20"
                  }`}
                />
                <div className="min-w-0">
                  <span className="text-[6px] text-foreground/70 block leading-tight">
                    <span className="text-foreground/90 font-medium">{item.name}</span>{" "}
                    {item.action}
                  </span>
                  <span className="text-[5px] text-foreground/30">{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating tags */}
      {tags.map((tag, i) => (
        <div
          key={tag.label}
          className={`absolute text-[8px] px-2 py-0.5 rounded-full border border-primary/20 bg-white/5 text-foreground/50 ${floatClasses[i % 3]}`}
          style={{ top: tag.top, left: tag.left, animationDelay: tag.delay }}
        >
          {tag.label}
        </div>
      ))}

      {/* Pulse ring - online indicator */}
      <div className="absolute top-[8%] right-[8%]" style={{ zIndex: 5 }}>
        <svg width="34" height="34" viewBox="0 0 32 32" className="animate-progress-fill">
          <circle cx="16" cy="16" r="12" fill="none" stroke="hsl(var(--primary) / 0.15)" strokeWidth="2" />
          <circle
            cx="16"
            cy="16"
            r="12"
            fill="none"
            stroke="hsl(142 71% 45%)"
            strokeWidth="2"
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
            strokeLinecap="round"
            transform="rotate(-90 16 16)"
            className="animate-progress-fill"
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-[7px] font-sans text-foreground/60">
          142
        </span>
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-0.5 whitespace-nowrap">
          <div className="w-[3px] h-[3px] rounded-full bg-green-500 animate-pulse" />
          <span className="text-[5px] text-foreground/40">online</span>
        </div>
      </div>

      {/* Reaction bar at bottom */}
      <div className="absolute bottom-[10%] left-[12%] right-[12%]" style={{ zIndex: 5 }}>
        <div className="relative h-[2px] bg-primary/20 rounded-full">
          {[0, 25, 50, 75, 100].map((pos) => (
            <div
              key={pos}
              className="absolute w-[2px] h-2 bg-primary/30 rounded-full -top-[3px]"
              style={{ left: `${pos}%` }}
            />
          ))}
          <div className="absolute w-2 h-2 rounded-full bg-primary/80 -top-[3px] animate-slide-playhead" />
        </div>
        <div className="flex justify-center gap-3 mt-2">
          {["🔥", "👏", "❤️", "🎬"].map((emoji) => (
            <span key={emoji} className="text-[10px] opacity-60">{emoji}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunityCard;
