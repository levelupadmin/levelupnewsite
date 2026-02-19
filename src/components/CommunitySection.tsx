import { ArrowRight } from "lucide-react";
import { AnimatedCounter } from "@/components/AnimatedCounter";

import masterclass1 from "@/assets/masterclass-1.jpg";
import masterclass2 from "@/assets/masterclass-2.jpg";
import masterclass3 from "@/assets/masterclass-3.jpg";
import masterclass4 from "@/assets/masterclass-4.jpg";
import masterclass5 from "@/assets/masterclass-5.jpg";
import masterclass6 from "@/assets/masterclass-6.jpg";

const leftCircles = [
  { src: masterclass1, label: "Learning Together", size: 200, translateX: 40, rotation: 3 },
  { src: masterclass2, label: "Mentorship", size: 190, translateX: 10, rotation: -2 },
  { src: masterclass3, label: "Collaboration", size: 195, translateX: -25, rotation: 4 },
];

const rightCircles = [
  { src: masterclass4, label: "Project Reviews", size: 200, translateX: -40, rotation: -3 },
  { src: masterclass5, label: "Masterclasses", size: 190, translateX: -10, rotation: 2 },
  { src: masterclass6, label: "Creative Community", size: 195, translateX: 25, rotation: -4 },
];

const stats = [
  { target: 12000, suffix: "+", label: "Members", hasComma: true, position: "top-[6%] left-[3%]" },
  { target: 850, suffix: "+", label: "Projects", position: "top-[6%] right-[3%]" },
  { target: 200, suffix: "+", label: "Mentors", position: "bottom-[6%] left-[3%]" },
  { target: 50, suffix: "+", label: "Masterclasses", position: "bottom-[6%] right-[3%]" },
];

const floatDelays = ["0s", "1.2s", "2.4s"];

const CircleImage = ({
  src, label, size, translateX, rotation, delay,
}: {
  src: string; label: string; size: number; translateX: number; rotation: number; delay: string;
}) => (
  <div
    className="relative transition-transform duration-300 hover:scale-105 group"
    style={{
      transform: `translateX(${translateX}px) rotate(${rotation}deg)`,
      animation: `community-float 6s ease-in-out infinite`,
      animationDelay: delay,
    }}
  >
    <div
      className="rounded-full overflow-hidden ring-[3px] ring-primary/70 shadow-[0_0_24px_hsl(var(--primary)/0.15)] group-hover:shadow-[0_0_32px_hsl(var(--primary)/0.3)] transition-shadow duration-300"
      style={{ width: size, height: size }}
    >
      <img src={src} alt={label} className="w-full h-full object-cover" loading="lazy" />
    </div>
    {/* Label overlapping bottom of circle */}
    <span
      className="absolute left-1/2 -translate-x-1/2 bottom-3 text-[10px] uppercase tracking-widest text-foreground/90 bg-black/60 backdrop-blur-sm border border-border/30 rounded-full px-3 py-1 whitespace-nowrap"
      style={{ transform: `translateX(-50%) rotate(${-rotation}deg)` }}
    >
      {label}
    </span>
  </div>
);

const CommunitySection = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center py-20 md:py-28 bg-background overflow-hidden">
      {/* Floating stat badges — desktop only */}
      <div className="absolute inset-0 hidden md:block pointer-events-none">
        {stats.map((s) => (
          <div key={s.label} className={`absolute ${s.position} bg-card border border-border/50 rounded-xl px-3 py-1.5 flex flex-col items-center shadow-sm`}>
            <span className="text-sm font-bold text-foreground tabular-nums leading-tight">
              <AnimatedCounter target={s.target} suffix={s.suffix} hasComma={s.hasComma} />
            </span>
            <span className="text-[8px] text-muted-foreground uppercase tracking-wider mt-0.5">
              {s.label}
            </span>
          </div>
        ))}
      </div>

      {/* Main three-column layout */}
      <div className="relative w-full max-w-[1300px] mx-auto px-6 flex items-center justify-center">
        {/* Left circles — cascading diagonal */}
        <div className="hidden md:flex flex-col items-end -space-y-6 flex-shrink-0">
          {leftCircles.map((c, i) => (
            <CircleImage key={c.label} {...c} delay={floatDelays[i]} />
          ))}
        </div>

        {/* Center content */}
        <div className="relative z-10 flex flex-col items-center text-center px-6 md:px-8 max-w-lg">
          <span className="text-primary text-xs uppercase tracking-[0.25em] font-semibold mb-4">
            The Community
          </span>

          <h2 className="text-2xl md:text-3xl lg:text-[2.5rem] font-bold leading-[1.15] mb-4">
            Come for learning,{" "}
            <br className="hidden md:block" />
            <span className="text-primary italic font-serif">Stay for the community</span>
          </h2>

          <p className="text-muted-foreground text-sm md:text-base max-w-sm mb-8 leading-relaxed">
            Connect with creators, mentors, and peers who push your craft forward. Learn together, grow together.
          </p>

          <a
            href="#"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
            style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary) / 0.8))" }}
          >
            Join the community
            <ArrowRight className="w-4 h-4" />
          </a>

          {/* Mobile-only stats */}
          <div className="grid grid-cols-4 gap-6 w-full mt-10 md:hidden">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col items-center">
                <span className="text-lg font-bold text-foreground tabular-nums">
                  <AnimatedCounter target={s.target} suffix={s.suffix} hasComma={s.hasComma} />
                </span>
                <span className="text-[9px] text-muted-foreground uppercase tracking-wider mt-1">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right circles — cascading diagonal (mirrored) */}
        <div className="hidden md:flex flex-col items-start -space-y-6 flex-shrink-0">
          {rightCircles.map((c, i) => (
            <CircleImage key={c.label} {...c} delay={floatDelays[i]} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes community-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
      `}</style>
    </section>
  );
};

export default CommunitySection;
