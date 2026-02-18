import { ArrowRight, UserPlus, Star, Users, Share2, Eye, Handshake, GraduationCap } from "lucide-react";
import { AnimatedCounter } from "@/components/AnimatedCounter";

import testimonial1 from "@/assets/testimonial-1.jpg";
import testimonial2 from "@/assets/testimonial-2.jpg";
import testimonial4 from "@/assets/testimonial-4.jpg";
import testimonial5 from "@/assets/testimonial-5.jpg";
import testimonial6 from "@/assets/testimonial-6.jpg";
import testimonial7 from "@/assets/testimonial-7.jpg";
import masterclass1 from "@/assets/masterclass-1.jpg";
import masterclass2 from "@/assets/masterclass-2.jpg";

// Rings: radius in % of container, avatars placed along each ring
const rings = [
  { radius: 22, dashArray: "4 8" },
  { radius: 34, dashArray: "3 10" },
  { radius: 46, dashArray: "5 12" },
];

// Avatars positioned by ring index and angle (degrees)
const avatars = [
  { src: testimonial1, ring: 1, angle: 30, size: 48, delay: "0s", badge: { text: "Invited to The Forge", icon: UserPlus } },
  { src: masterclass1, ring: 1, angle: 150, size: 44, delay: "0.8s", badge: { text: "Recommended: Arjun", icon: Star } },
  { src: testimonial4, ring: 1, angle: 250, size: 42, delay: "1.6s", badge: { text: "Connected: 12 new peers", icon: Users } },
  { src: testimonial5, ring: 2, angle: 70, size: 44, delay: "2.4s", badge: { text: "Shared: Priya's project", icon: Share2 } },
  { src: testimonial2, ring: 2, angle: 190, size: 40, delay: "0.4s", badge: { text: "Reviewed: Meera's portfolio", icon: Eye } },
  { src: masterclass2, ring: 2, angle: 310, size: 40, delay: "1.2s", badge: { text: "Collaborated on 4 projects", icon: Handshake } },
  { src: testimonial6, ring: 0, angle: 110, size: 42, delay: "2s", badge: { text: "Mentoring 3 students", icon: GraduationCap } },
  { src: testimonial7, ring: 0, angle: 290, size: 40, delay: "2.8s", badge: { text: "Enrolled: Masterclass", icon: Star } },
];

const stats = [
  { target: 12000, suffix: "+", label: "Members", hasComma: true },
  { target: 850, suffix: "+", label: "Projects" },
  { target: 200, suffix: "+", label: "Mentors" },
  { target: 50, suffix: "+", label: "Masterclasses" },
];

const CommunitySection = () => {
  // Container is a square; we use vmin-based sizing via a wrapper
  const containerSize = 700; // conceptual size in px for calculations
  const center = containerSize / 2;

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center py-20 md:py-28 bg-background overflow-hidden">
      {/* Concentric rings + avatars container */}
      <div className="relative w-[90vw] h-[90vw] max-w-[700px] max-h-[700px] mx-auto flex items-center justify-center">
        {/* SVG rings */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox={`0 0 ${containerSize} ${containerSize}`}
          fill="none"
        >
          {rings.map((ring, i) => {
            const r = (ring.radius / 100) * containerSize;
            return (
              <circle
                key={i}
                cx={center}
                cy={center}
                r={r}
                stroke="hsl(var(--primary))"
                strokeWidth="1"
                strokeOpacity="0.12"
                strokeDasharray={ring.dashArray}
                fill="none"
              />
            );
          })}
        </svg>

        {/* Floating avatars on rings */}
        <div className="absolute inset-0 hidden md:block">
          {avatars.map((a, i) => {
            const ring = rings[a.ring];
            const r = (ring.radius / 100) * containerSize;
            const rad = (a.angle * Math.PI) / 180;
            const x = center + r * Math.cos(rad);
            const y = center + r * Math.sin(rad);
            // Convert to percentage
            const leftPct = (x / containerSize) * 100;
            const topPct = (y / containerSize) * 100;
            const BadgeIcon = a.badge.icon;
            const halfSize = a.size / 2;

            return (
              <div
                key={i}
                className="absolute animate-float-slow"
                style={{
                  left: `calc(${leftPct}% - ${halfSize}px)`,
                  top: `calc(${topPct}% - ${halfSize}px)`,
                  animationDelay: a.delay,
                }}
              >
                <div className="relative group">
                  <img
                    src={a.src}
                    alt=""
                    className="rounded-full object-cover ring-2 ring-primary/20"
                    style={{ width: a.size, height: a.size }}
                    loading="lazy"
                  />
                  {/* Badge on hover */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 whitespace-nowrap flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-card border border-border/50 text-[10px] text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                    <BadgeIcon className="w-3 h-3 text-primary" />
                    {a.badge.text}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Center content */}
        <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-md">
          <span className="text-primary text-xs uppercase tracking-[0.2em] font-semibold mb-4">
            The Community
          </span>

          <h2 className="text-2xl md:text-4xl font-bold leading-tight mb-4">
            Come for learning,{" "}
            <span className="text-primary italic font-serif">Stay for the community</span>
          </h2>

          <p className="text-muted-foreground text-sm md:text-base max-w-sm mb-8">
            Connect with creators, mentors, and peers who push your craft forward. Learn together, grow together.
          </p>

          <a
            href="#"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
            style={{ background: "linear-gradient(135deg, #FF6B35, #F7931E)" }}
          >
            Join the community
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Stats below */}
      <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 w-full max-w-3xl mx-auto mt-14 px-4">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col items-center">
            <span className="text-2xl md:text-4xl font-bold text-foreground">
              <AnimatedCounter target={s.target} suffix={s.suffix} hasComma={s.hasComma} />
            </span>
            <span className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wider mt-1">
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CommunitySection;
