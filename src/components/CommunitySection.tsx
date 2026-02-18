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

const containerW = 1200;
const containerH = 800;
const cx = containerW / 2;
const cy = containerH / 2;

const rings = [
  { rx: 30, ry: 25, dashArray: "4 8" },
  { rx: 38, ry: 32, dashArray: "3 10" },
  { rx: 46, ry: 40, dashArray: "5 12" },
  { rx: 54, ry: 48, dashArray: "4 10" },
];

// Ring animation directions: alternating CW / CCW
const ringAnimations = [
  "animate-orbit-cw",
  "animate-orbit-ccw-slow",
  "animate-orbit-cw-slow",
  "animate-orbit-ccw",
];
const counterAnimations = [
  "animate-orbit-ccw",       // counter for cw
  "animate-orbit-cw-slow",   // counter for ccw-slow
  "animate-orbit-ccw-slow",  // counter for cw-slow
  "animate-orbit-cw",        // counter for ccw
];

type AvatarItem = {
  type: "avatar";
  src: string;
  angle: number;
  size: number;
  badge: { text: string; icon: React.ComponentType<{ className?: string }> };
};

type StatItem = {
  type: "stat";
  angle: number;
  target: number;
  suffix: string;
  label: string;
  hasComma?: boolean;
};

type RingItem = AvatarItem | StatItem;

const ringItems: RingItem[][] = [
  // Ring 0
  [
    { type: "avatar", src: testimonial1, angle: 30, size: 44, badge: { text: "Invited to The Forge", icon: UserPlus } },
    { type: "avatar", src: masterclass1, angle: 150, size: 40, badge: { text: "Recommended: Arjun", icon: Star } },
    { type: "stat", angle: 210, target: 12000, suffix: "+", label: "Members", hasComma: true },
    { type: "avatar", src: testimonial8, angle: 270, size: 42, badge: { text: "Bookmarked 8 lessons", icon: Bookmark } },
    { type: "stat", angle: 330, target: 200, suffix: "+", label: "Mentors" },
  ],
  // Ring 1
  [
    { type: "avatar", src: testimonial4, angle: 10, size: 42, badge: { text: "Connected: 12 new peers", icon: Users } },
    { type: "stat", angle: 55, target: 50, suffix: "+", label: "Masterclasses" },
    { type: "avatar", src: testimonial5, angle: 100, size: 40, badge: { text: "Shared: Priya's project", icon: Share2 } },
    { type: "avatar", src: masterclass3, angle: 190, size: 44, badge: { text: "Top contributor this week", icon: Award } },
    { type: "stat", angle: 250, target: 850, suffix: "+", label: "Projects" },
    { type: "avatar", src: masterclass4, angle: 300, size: 40, badge: { text: "Gave feedback on 6 drafts", icon: MessageCircle } },
  ],
  // Ring 2
  [
    { type: "avatar", src: testimonial2, angle: 45, size: 40, badge: { text: "Reviewed: Meera's portfolio", icon: Eye } },
    { type: "avatar", src: masterclass2, angle: 130, size: 42, badge: { text: "Collaborated on 4 projects", icon: Handshake } },
    { type: "avatar", src: testimonial6, angle: 220, size: 40, badge: { text: "Mentoring 3 students", icon: GraduationCap } },
    { type: "avatar", src: masterclass5, angle: 320, size: 42, badge: { text: "Streak: 14 days active", icon: Zap } },
  ],
  // Ring 3
  [
    { type: "avatar", src: testimonial7, angle: 25, size: 38, badge: { text: "Enrolled: Masterclass", icon: Star } },
    { type: "avatar", src: testimonial1, angle: 95, size: 40, badge: { text: "Invited 5 friends", icon: UserPlus } },
    { type: "avatar", src: masterclass1, angle: 165, size: 38, badge: { text: "Completed 3 courses", icon: Award } },
    { type: "avatar", src: testimonial4, angle: 245, size: 40, badge: { text: "Posted in community", icon: MessageCircle } },
    { type: "avatar", src: masterclass3, angle: 315, size: 38, badge: { text: "Shared a resource", icon: Share2 } },
  ],
];

const mobileStats = [
  { target: 12000, suffix: "+", label: "Members", hasComma: true },
  { target: 850, suffix: "+", label: "Projects" },
  { target: 200, suffix: "+", label: "Mentors" },
  { target: 50, suffix: "+", label: "Masterclasses" },
];

function getTranslate(ringIndex: number, angle: number) {
  const ring = rings[ringIndex];
  const rx = (ring.rx / 100) * containerW;
  const ry = (ring.ry / 100) * containerH;
  const rad = (angle * Math.PI) / 180;
  // Translate from center (0,0) since parent is centered
  const x = rx * Math.cos(rad);
  const y = ry * Math.sin(rad);
  return { x, y };
}

const CommunitySection = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center py-20 md:py-28 bg-background overflow-hidden">
      <div className="relative w-[90vw] max-w-[1200px] h-[80vh] min-h-[600px] mx-auto flex items-center justify-center">
        {/* SVG rings */}
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

        {/* Orbiting ring groups */}
        <div className="absolute inset-0 hidden md:block">
          {ringItems.map((items, ringIdx) => (
            <div
              key={ringIdx}
              className={`absolute top-1/2 left-1/2 ${ringAnimations[ringIdx]}`}
              style={{ width: 0, height: 0 }}
            >
              {items.map((item, itemIdx) => {
                const { x, y } = getTranslate(ringIdx, item.angle);

                if (item.type === "avatar") {
                  const a = item as AvatarItem;
                  const BadgeIcon = a.badge.icon;
                  return (
                    <div
                      key={itemIdx}
                      className={`absolute ${counterAnimations[ringIdx]}`}
                      style={{
                        left: x,
                        top: y,
                        transform: "translate(-50%, -50%)",
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
                }

                const s = item as StatItem;
                return (
                  <div
                    key={itemIdx}
                    className={`absolute ${counterAnimations[ringIdx]}`}
                    style={{
                      left: x,
                      top: y,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <div className="bg-card border border-border/50 rounded-xl px-4 py-2 flex flex-col items-center shadow-sm">
                      <span className="text-base font-bold text-foreground tabular-nums leading-tight">
                        <AnimatedCounter target={s.target} suffix={s.suffix} hasComma={s.hasComma} />
                      </span>
                      <span className="text-[9px] text-muted-foreground uppercase tracking-wider mt-0.5">
                        {s.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Center content */}
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
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
            style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary) / 0.8))" }}
          >
            Join the community
            <ArrowRight className="w-4 h-4" />
          </a>

          {/* Mobile-only stats */}
          <div className="grid grid-cols-4 gap-6 w-full mt-10 md:hidden">
            {mobileStats.map((s) => (
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
      </div>
    </section>
  );
};

export default CommunitySection;
