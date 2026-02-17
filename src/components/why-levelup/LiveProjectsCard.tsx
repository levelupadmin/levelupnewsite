import forge1 from "@/assets/forge-1.jpg";
import forge2 from "@/assets/forge-2.jpg";
import forge3 from "@/assets/forge-3.jpg";

const projects = [
  { src: forge1, label: "Short Film", left: "5%", rotate: -3, zIndex: 1 },
  { src: forge2, label: "Showreel", left: "20%", rotate: 0, zIndex: 2 },
  { src: forge3, label: "Scene Edit", left: "35%", rotate: 3, zIndex: 3 },
];

const floatClasses = ["animate-float-card-1", "animate-float-card-2", "animate-float-card-3"];

const tags = [
  { label: "4K", top: "8%", left: "72%", delay: "0s" },
  { label: "Color Graded", top: "28%", left: "78%", delay: "0.8s" },
  { label: "Final Cut", top: "52%", left: "70%", delay: "1.6s" },
];

const LiveProjectsCard = () => {
  const circumference = 2 * Math.PI * 12;

  return (
    <div className="relative w-full h-full flex items-center justify-center p-4 overflow-hidden">
      {/* Stacked thumbnails */}
      <div className="relative w-[85%] aspect-[4/3]">
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
            {/* Play icon on front card */}
            {i === 2 && (
              <div className="absolute inset-0 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 20 20" className="opacity-60">
                  <polygon points="6,3 17,10 6,17" fill="white" />
                </svg>
              </div>
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

      {/* Floating tags */}
      {tags.map((tag, i) => (
        <div
          key={tag.label}
          className={`absolute text-[8px] px-2 py-0.5 rounded-full border border-primary/20 bg-white/5 text-foreground/50 ${floatClasses[i]}`}
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
