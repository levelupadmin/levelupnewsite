import forge1 from "@/assets/forge-1.jpg";
import forge2 from "@/assets/forge-2.jpg";
import forge3 from "@/assets/forge-3.jpg";
import forge4 from "@/assets/forge-4.jpg";
import { Heart } from "lucide-react";

const projects = [
  { src: forge1, label: "Short Film", left: "5%", rotate: -3, zIndex: 1 },
  { src: forge2, label: "Showreel", left: "18%", rotate: 0, zIndex: 2 },
  { src: forge3, label: "Scene Edit", left: "31%", rotate: 3, zIndex: 3 },
];

const floatClasses = ["animate-float-card-1", "animate-float-card-2", "animate-float-card-3"];

const tags = [
  { label: "4K", top: "6%", left: "2%", delay: "0s" },
  { label: "Color Graded", top: "22%", left: "4%", delay: "0.8s" },
  { label: "Director's Cut", top: "42%", left: "1%", delay: "1.6s" },
  { label: "f/1.8", top: "62%", left: "6%", delay: "2.2s" },
  { label: "Reel Ready", top: "80%", left: "2%", delay: "1.2s" },
];

const LiveProjectsCard = () => {
  const circumference = 2 * Math.PI * 12;

  return (
    <div className="relative w-full h-full flex items-center justify-center p-4 overflow-hidden">
      {/* Film strip accent - left edge */}
      <div className="absolute left-[3%] top-[8%] bottom-[8%] w-[6px] opacity-[0.15]">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="w-full h-[8px] bg-foreground/40 rounded-[1px] mb-[6px]"
          />
        ))}
      </div>

      {/* Stacked thumbnails */}
      <div className="relative w-[65%] aspect-[4/3]">
        {projects.map((p, i) => (
          <div
            key={i}
            className={`absolute rounded-lg overflow-hidden ${floatClasses[i]} ${
              i === 2 ? "border border-primary/40" : "border border-primary/15"
            }`}
            style={{
              width: "55%",
              aspectRatio: "16/10",
              top: "15%",
              left: p.left,
              transform: `rotate(${p.rotate}deg)`,
              zIndex: p.zIndex,
              boxShadow: `0 ${4 + i * 4}px ${12 + i * 6}px -4px hsl(0 0% 0% / ${0.3 + i * 0.1})`,
            }}
          >
            <img src={p.src} alt={p.label} className="w-full h-full object-cover" loading="lazy" />
            {/* Viewfinder crosshair + play icon on front card */}
            {i === 2 && (
              <>
                {/* Corner brackets - viewfinder */}
                <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                  {/* Top-left */}
                  <path d="M8,20 L8,8 L20,8" fill="none" stroke="white" strokeWidth="1" />
                  {/* Top-right */}
                  <path d="M80,8 L92,8 L92,20" fill="none" stroke="white" strokeWidth="1" />
                  {/* Bottom-left */}
                  <path d="M8,80 L8,92 L20,92" fill="none" stroke="white" strokeWidth="1" />
                  {/* Bottom-right */}
                  <path d="M80,92 L92,92 L92,80" fill="none" stroke="white" strokeWidth="1" />
                  {/* Center crosshair */}
                  <line x1="46" y1="50" x2="54" y2="50" stroke="white" strokeWidth="0.5" />
                  <line x1="50" y1="46" x2="50" y2="54" stroke="white" strokeWidth="0.5" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 20 20" className="opacity-60">
                    <polygon points="6,3 17,10 6,17" fill="white" />
                  </svg>
                </div>
              </>
            )}
            <div
              className="absolute bottom-0 inset-x-0 px-2 py-1"
              style={{ background: "linear-gradient(to top, hsl(0 0% 0% / 0.8), transparent)" }}
            >
              <span className="font-sans text-[8px] uppercase tracking-wider text-foreground/70">
                {p.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Phone reel mockup */}
      <div
        className="absolute animate-float-card-2"
        style={{ top: "8%", left: "62%", zIndex: 4 }}
      >
        <div
          className="relative w-[52px] rounded-xl border border-primary/30 overflow-hidden"
          style={{
            aspectRatio: "9/16",
            boxShadow: "0 4px 20px -4px hsl(30 80% 45% / 0.25), 0 0 12px 2px hsl(30 80% 45% / 0.1)",
          }}
        >
          <img src={forge4} alt="Creator reel" className="w-full h-full object-cover" loading="lazy" />
          {/* Heart + views overlay */}
          <div className="absolute top-1.5 right-1 flex items-center gap-0.5">
            <Heart size={7} className="text-destructive fill-destructive" />
          </div>
          <div
            className="absolute bottom-0 inset-x-0 px-1.5 py-1"
            style={{ background: "linear-gradient(to top, hsl(0 0% 0% / 0.85), transparent)" }}
          >
            <span className="font-sans text-[6px] text-foreground/80 block">12.4K</span>
            <span className="font-sans text-[5px] uppercase tracking-wider text-foreground/50">Reel</span>
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

      {/* Progress ring */}
      <div className="absolute top-[10%] right-[8%]" style={{ zIndex: 5 }}>
        <svg width="32" height="32" viewBox="0 0 32 32" className="animate-progress-fill">
          <circle cx="16" cy="16" r="12" fill="none" stroke="hsl(var(--primary) / 0.15)" strokeWidth="2" />
          <circle
            cx="16"
            cy="16"
            r="12"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
            strokeLinecap="round"
            transform="rotate(-90 16 16)"
            className="animate-progress-fill"
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-[7px] font-sans text-foreground/60">
          3/3
        </span>
      </div>

      {/* Timeline bar */}
      <div className="absolute bottom-[12%] left-[10%] right-[10%]" style={{ zIndex: 5 }}>
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
      </div>
    </div>
  );
};

export default LiveProjectsCard;
