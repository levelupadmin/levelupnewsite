import forge1 from "@/assets/forge-1.jpg";
import forge2 from "@/assets/forge-2.jpg";
import forge3 from "@/assets/forge-3.jpg";
import forge4 from "@/assets/forge-4.jpg";
import { Play, Heart, Film } from "lucide-react";

const floatClasses = ["animate-float-card-1", "animate-float-card-2", "animate-float-card-3"];

const LiveProjectsCard = () => {
  const circumference = 2 * Math.PI * 12;

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-4 overflow-hidden">
      {/* Film strip accent - left edge */}
      <div className="absolute left-[3%] top-[8%] bottom-[8%] w-[6px] opacity-[0.12]">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="w-full h-[8px] bg-foreground/40 rounded-[1px] mb-[6px]" />
        ))}
      </div>

      {/* === MAIN COMPOSITION: Editing workspace === */}
      <div className="relative w-full flex-1 flex items-center justify-center">

        {/* Center: Main project monitor */}
        <div
          className={`relative rounded-lg overflow-hidden border border-primary/40 animate-float-card-3`}
          style={{
            width: "52%",
            aspectRatio: "16/10",
            boxShadow: "0 12px 40px -8px hsl(0 0% 0% / 0.5), 0 0 20px 2px hsl(30 80% 45% / 0.12)",
          }}
        >
          <img src={forge3} alt="Scene Edit" className="w-full h-full object-cover" loading="lazy" />
          {/* Viewfinder overlay */}
          <svg className="absolute inset-0 w-full h-full opacity-25 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M8,20 L8,8 L20,8" fill="none" stroke="white" strokeWidth="1" />
            <path d="M80,8 L92,8 L92,20" fill="none" stroke="white" strokeWidth="1" />
            <path d="M8,80 L8,92 L20,92" fill="none" stroke="white" strokeWidth="1" />
            <path d="M80,92 L92,92 L92,80" fill="none" stroke="white" strokeWidth="1" />
            <line x1="46" y1="50" x2="54" y2="50" stroke="white" strokeWidth="0.5" />
            <line x1="50" y1="46" x2="50" y2="54" stroke="white" strokeWidth="0.5" />
          </svg>
          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
              <Play size={12} className="text-white ml-0.5" fill="white" />
            </div>
          </div>
          {/* Label bar */}
          <div
            className="absolute bottom-0 inset-x-0 px-2.5 py-1.5 flex items-center justify-between"
            style={{ background: "linear-gradient(to top, hsl(0 0% 0% / 0.85), transparent)" }}
          >
            <span className="font-sans text-[8px] uppercase tracking-wider text-foreground/70">Scene Edit</span>
            <span className="font-sans text-[7px] text-primary/80">Director's Cut</span>
          </div>
        </div>

        {/* Left: Source thumbnail (behind, peeking) */}
        <div
          className="absolute animate-float-card-1 rounded-md overflow-hidden border border-primary/15"
          style={{
            width: "28%",
            aspectRatio: "16/10",
            top: "18%",
            left: "4%",
            transform: "rotate(-4deg)",
            zIndex: 0,
            boxShadow: "0 6px 20px -4px hsl(0 0% 0% / 0.4)",
          }}
        >
          <img src={forge1} alt="Short Film" className="w-full h-full object-cover" loading="lazy" />
          <div
            className="absolute bottom-0 inset-x-0 px-1.5 py-1"
            style={{ background: "linear-gradient(to top, hsl(0 0% 0% / 0.8), transparent)" }}
          >
            <span className="font-sans text-[7px] uppercase tracking-wider text-foreground/60">Short Film</span>
          </div>
        </div>

        {/* Right: Phone reel — the "published" output */}
        <div
          className="absolute animate-float-card-2"
          style={{ top: "6%", right: "5%", zIndex: 4 }}
        >
          <div
            className="relative w-[48px] rounded-xl border border-primary/30 overflow-hidden"
            style={{
              aspectRatio: "9/16",
              boxShadow: "0 4px 20px -4px hsl(30 80% 45% / 0.25), 0 0 12px 2px hsl(30 80% 45% / 0.08)",
            }}
          >
            <img src={forge4} alt="Creator reel" className="w-full h-full object-cover" loading="lazy" />
            <div className="absolute top-1.5 right-1 flex items-center gap-0.5">
              <Heart size={6} className="text-destructive fill-destructive" />
            </div>
            <div
              className="absolute bottom-0 inset-x-0 px-1.5 py-1"
              style={{ background: "linear-gradient(to top, hsl(0 0% 0% / 0.85), transparent)" }}
            >
              <span className="font-sans text-[6px] text-foreground/80 block">12.4K</span>
              <span className="font-sans text-[5px] uppercase tracking-wider text-foreground/50">Reel</span>
            </div>
          </div>
          {/* Arrow from monitor to reel */}
          <div className="absolute -left-3 top-1/2 -translate-y-1/2 text-primary/30 text-[10px]">→</div>
        </div>

        {/* Bottom-right: Second output thumbnail */}
        <div
          className="absolute animate-float-card-1 rounded-md overflow-hidden border border-primary/20"
          style={{
            width: "22%",
            aspectRatio: "16/10",
            bottom: "16%",
            right: "6%",
            transform: "rotate(2deg)",
            zIndex: 1,
            boxShadow: "0 4px 16px -4px hsl(0 0% 0% / 0.4)",
          }}
        >
          <img src={forge2} alt="Showreel" className="w-full h-full object-cover" loading="lazy" />
          <div
            className="absolute bottom-0 inset-x-0 px-1.5 py-0.5"
            style={{ background: "linear-gradient(to top, hsl(0 0% 0% / 0.8), transparent)" }}
          >
            <span className="font-sans text-[6px] uppercase tracking-wider text-foreground/60">Showreel</span>
          </div>
        </div>

        {/* Progress ring — project completion */}
        <div className="absolute top-[6%] right-[6%]" style={{ zIndex: 5 }}>
          <svg width="30" height="30" viewBox="0 0 32 32">
            <circle cx="16" cy="16" r="12" fill="none" stroke="hsl(var(--primary) / 0.15)" strokeWidth="2" />
            <circle
              cx="16" cy="16" r="12"
              fill="none" stroke="hsl(var(--primary))" strokeWidth="2"
              strokeDasharray={circumference} strokeDashoffset={circumference}
              strokeLinecap="round" transform="rotate(-90 16 16)"
              className="animate-progress-fill"
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-[7px] font-sans text-foreground/60">3/3</span>
        </div>

        {/* Floating context tags — grouped near their elements */}
        <div
          className={`absolute text-[7px] px-1.5 py-0.5 rounded-full border border-primary/20 bg-white/5 text-foreground/50 animate-float-card-2`}
          style={{ top: "8%", left: "6%", animationDelay: "0s" }}
        >
          <span className="flex items-center gap-0.5"><Film size={6} className="text-primary/50" /> 4K</span>
        </div>
        <div
          className={`absolute text-[7px] px-1.5 py-0.5 rounded-full border border-primary/20 bg-white/5 text-foreground/50 animate-float-card-3`}
          style={{ bottom: "22%", left: "5%", animationDelay: "0.6s" }}
        >
          Color Graded
        </div>
        <div
          className={`absolute text-[7px] px-1.5 py-0.5 rounded-full border border-primary/20 bg-white/5 text-foreground/50 animate-float-card-1`}
          style={{ bottom: "8%", right: "28%", animationDelay: "1.2s" }}
        >
          Reel Ready
        </div>
      </div>

      {/* === TIMELINE BAR — editing timeline at bottom === */}
      <div className="w-[85%] mt-2" style={{ zIndex: 5 }}>
        {/* Track labels */}
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[6px] uppercase tracking-wider text-foreground/30 w-8">V1</span>
          <div className="flex-1 h-[3px] rounded-full bg-primary/25" />
        </div>
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-[6px] uppercase tracking-wider text-foreground/30 w-8">A1</span>
          <div className="flex-1 h-[2px] rounded-full bg-foreground/10" />
        </div>
        {/* Playhead bar */}
        <div className="relative h-[2px] bg-primary/15 rounded-full">
          {[0, 25, 50, 75, 100].map((pos) => (
            <div key={pos} className="absolute w-[2px] h-1.5 bg-primary/25 rounded-full -top-[2px]" style={{ left: `${pos}%` }} />
          ))}
          <div className="absolute w-1.5 h-1.5 rounded-full bg-primary/80 -top-[2px] animate-slide-playhead" />
        </div>
      </div>
    </div>
  );
};

export default LiveProjectsCard;
