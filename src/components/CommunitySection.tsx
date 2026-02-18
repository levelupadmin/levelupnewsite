import { ArrowRight, UserPlus, Star, Users, Share2, Eye, Handshake, GraduationCap, Bookmark, MessageCircle, Award, Zap } from "lucide-react";
import { AnimatedCounter } from "@/components/AnimatedCounter";

import testimonial1 from "@/assets/testimonial-1.jpg";
import testimonial2 from "@/assets/testimonial-2.jpg";
import testimonial4 from "@/assets/testimonial-4.jpg";
import testimonial5 from "@/assets/testimonial-5.jpg";
import testimonial6 from "@/assets/testimonial-6.jpg";
import testimonial7 from "@/assets/testimonial-7.jpg";
import testimonial8 from "@/assets/testimonial-8.jpg";
import masterclass1 from "@/assets/masterclass-1.jpg";
import masterclass2 from "@/assets/masterclass-2.jpg";
import masterclass3 from "@/assets/masterclass-3.jpg";
import masterclass4 from "@/assets/masterclass-4.jpg";
import masterclass5 from "@/assets/masterclass-5.jpg";

const rings = [
  { rx: 28, ry: 20, dashArray: "4 8" },
  { rx: 37, ry: 28, dashArray: "3 10" },
  { rx: 46, ry: 36, dashArray: "5 12" },
  { rx: 55, ry: 44, dashArray: "4 10" },
];

const avatars = [
  // Inner ring (0)
  { src: testimonial1, ring: 0, angle: 45, size: 44, delay: "0s", badge: { text: "Invited to The Forge", icon: UserPlus } },
  { src: masterclass1, ring: 0, angle: 165, size: 40, delay: "0.6s", badge: { text: "Recommended: Arjun", icon: Star } },
  { src: testimonial8, ring: 0, angle: 285, size: 42, delay: "1.2s", badge: { text: "Bookmarked 8 lessons", icon: Bookmark } },
  // Second ring (1)
  { src: testimonial4, ring: 1, angle: 20, size: 42, delay: "1.8s", badge: { text: "Connected: 12 new peers", icon: Users } },
  { src: testimonial5, ring: 1, angle: 110, size: 40, delay: "2.4s", badge: { text: "Shared: Priya's project", icon: Share2 } },
  { src: masterclass3, ring: 1, angle: 200, size: 44, delay: "0.3s", badge: { text: "Top contributor this week", icon: Award } },
  { src: masterclass4, ring: 1, angle: 310, size: 40, delay: "0.9s", badge: { text: "Gave feedback on 6 drafts", icon: MessageCircle } },
  // Third ring (2)
  { src: testimonial2, ring: 2, angle: 55, size: 40, delay: "1.5s", badge: { text: "Reviewed: Meera's portfolio", icon: Eye } },
  { src: masterclass2, ring: 2, angle: 140, size: 42, delay: "2.1s", badge: { text: "Collaborated on 4 projects", icon: Handshake } },
  { src: testimonial6, ring: 2, angle: 230, size: 40, delay: "2.7s", badge: { text: "Mentoring 3 students", icon: GraduationCap } },
  { src: masterclass5, ring: 2, angle: 330, size: 42, delay: "0.5s", badge: { text: "Streak: 14 days active", icon: Zap } },
  // Outer ring (3)
  { src: testimonial7, ring: 3, angle: 30, size: 38, delay: "1.1s", badge: { text: "Enrolled: Masterclass", icon: Star } },
  { src: testimonial1, ring: 3, angle: 100, size: 40, delay: "1.7s", badge: { text: "Invited 5 friends", icon: UserPlus } },
  { src: masterclass1, ring: 3, angle: 170, size: 38, delay: "2.3s", badge: { text: "Completed 3 courses", icon: Award } },
  { src: testimonial4, ring: 3, angle: 250, size: 40, delay: "0.7s", badge: { text: "Posted in community", icon: MessageCircle } },
  { src: masterclass3, ring: 3, angle: 320, size: 38, delay: "1.3s", badge: { text: "Shared a resource", icon: Share2 } },
];

const stats = [
  { target: 12000, suffix: "+", label: "Members", hasComma: true },
  { target: 850, suffix: "+", label: "Projects" },
  { target: 200, suffix: "+", label: "Mentors" },
  { target: 50, suffix: "+", label: "Masterclasses" },
];

const CommunitySection = () => {
  const containerW = 900;
  const containerH = 700;
  const cx = containerW / 2;
  const cy = containerH / 2;

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center py-20 md:py-28 bg-background overflow-hidden">
      <div className="relative w-[95vw] max-w-[900px] aspect-[9/7] mx-auto flex items-center justify-center">
        {/* SVG rings — using muted-foreground color */}
         <svg
          className="absolute inset-0 w-full h-full"
          viewBox={`0 0 ${containerW} ${containerH}`}
          fill="none"
          preserveAspectRatio="xMidYMid meet"
        >
          {rings.map((ring, i) => (
            <ellipse
              key={i}
              cx={cx}
              cy={cy}
              rx={(ring.rx / 100) * containerW}
              ry={(ring.ry / 100) * containerH}
              stroke="hsl(var(--muted-foreground))"
              strokeWidth="1"
              strokeOpacity="0.25"
              strokeDasharray={ring.dashArray}
              fill="none"
            />
          ))}
        </svg>

        {/* Floating avatars on rings */}
        <div className="absolute inset-0 hidden md:block">
          {avatars.map((a, i) => {
            const ring = rings[a.ring];
            const rx = (ring.rx / 100) * containerW;
            const ry = (ring.ry / 100) * containerH;
            const rad = (a.angle * Math.PI) / 180;
            const x = cx + rx * Math.cos(rad);
            const y = cy + ry * Math.sin(rad);
            const leftPct = (x / containerW) * 100;
            const topPct = (y / containerH) * 100;
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
                    className="rounded-full object-cover ring-2 ring-border/30"
                    style={{ width: a.size, height: a.size }}
                    loading="lazy"
                  />
                  <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 whitespace-nowrap flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-card border border-border/50 text-[10px] text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                    <BadgeIcon className="w-3 h-3 text-primary" />
                    {a.badge.text}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Center content — text + CTA + stats all inside the circle */}
        <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-md">
          <span className="text-primary text-xs uppercase tracking-[0.25em] font-semibold mb-4">
            The Community
          </span>

          <h2 className="text-2xl md:text-3xl lg:text-[2.5rem] font-bold leading-[1.15] mb-4">
            Come for learning,{" "}
            <br className="hidden md:block" />
            <span className="text-primary italic font-serif">Stay for the community</span>
          </h2>

          <p className="text-muted-foreground text-sm md:text-base max-w-sm mb-8 leading-relaxed">
            Connect with creators, mentors, and peers who push your craft forward.
          </p>

          <a
            href="#"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg mb-10"
            style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary) / 0.8))" }}
          >
            Join the community
            <ArrowRight className="w-4 h-4" />
          </a>

          <div className="grid grid-cols-4 gap-6 w-full">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col items-center">
                <span className="text-lg md:text-2xl font-bold text-foreground tabular-nums">
                  <AnimatedCounter target={s.target} suffix={s.suffix} hasComma={s.hasComma} />
                </span>
                <span className="text-[9px] md:text-[10px] text-muted-foreground uppercase tracking-wider mt-1">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
