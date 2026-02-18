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

const avatars = [
  { src: testimonial1, top: "8%", left: "6%", size: "w-14 h-14", delay: "0s", badge: { text: "Invited to The Forge", icon: UserPlus, pos: "top-full mt-2 left-0" } },
  { src: masterclass1, top: "18%", right: "8%", size: "w-12 h-12", delay: "0.8s", badge: { text: "Recommended: Arjun", icon: Star, pos: "top-full mt-2 right-0" } },
  { src: testimonial4, top: "55%", left: "3%", size: "w-11 h-11", delay: "1.6s", badge: { text: "Connected: 12 new peers", icon: Users, pos: "top-full mt-2 left-0" } },
  { src: testimonial5, top: "70%", right: "5%", size: "w-13 h-13", delay: "2.4s", badge: { text: "Shared: Priya's project", icon: Share2, pos: "top-full mt-2 right-0" } },
  { src: testimonial2, top: "35%", left: "10%", size: "w-10 h-10", delay: "0.4s", badge: { text: "Reviewed: Meera's portfolio", icon: Eye, pos: "top-full mt-2 left-0" } },
  { src: masterclass2, top: "40%", right: "12%", size: "w-10 h-10", delay: "1.2s", badge: { text: "Collaborated on 4 projects", icon: Handshake, pos: "top-full mt-2 right-0" } },
  { src: testimonial6, top: "82%", left: "12%", size: "w-12 h-12", delay: "2s", badge: { text: "Mentoring 3 students", icon: GraduationCap, pos: "bottom-full mb-2 left-0" } },
  { src: testimonial7, top: "80%", right: "14%", size: "w-11 h-11", delay: "2.8s", badge: { text: "Enrolled: Masterclass", icon: Star, pos: "bottom-full mb-2 right-0" } },
];

const lines = [
  { x1: "8%", y1: "12%", x2: "35%", y2: "30%" },
  { x1: "90%", y1: "22%", x2: "65%", y2: "35%" },
  { x1: "6%", y1: "58%", x2: "30%", y2: "48%" },
  { x1: "92%", y1: "73%", x2: "70%", y2: "55%" },
  { x1: "14%", y1: "38%", x2: "8%", y2: "12%" },
  { x1: "88%", y1: "43%", x2: "92%", y2: "22%" },
  { x1: "15%", y1: "85%", x2: "6%", y2: "58%" },
  { x1: "86%", y1: "83%", x2: "92%", y2: "73%" },
  { x1: "35%", y1: "30%", x2: "65%", y2: "35%" },
  { x1: "30%", y1: "48%", x2: "70%", y2: "55%" },
];

const stats = [
  { target: 12000, suffix: "+", label: "Members", hasComma: true },
  { target: 850, suffix: "+", label: "Projects" },
  { target: 200, suffix: "+", label: "Mentors" },
  { target: 50, suffix: "+", label: "Masterclasses" },
];

const CommunitySection = () => {
  return (
    <section className="relative py-20 md:py-28 bg-background overflow-hidden">
      {/* Connecting lines SVG */}
      <svg
        className="absolute inset-0 w-full h-full hidden md:block pointer-events-none"
        preserveAspectRatio="none"
      >
        {lines.map((l, i) => (
          <line
            key={i}
            x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
            stroke="hsl(var(--primary))"
            strokeWidth="1"
            strokeOpacity="0.08"
          />
        ))}
      </svg>

      {/* Floating avatars with badges */}
      <div className="absolute inset-0 hidden md:block pointer-events-none">
        {avatars.map((a, i) => {
          const BadgeIcon = a.badge.icon;
          return (
            <div
              key={i}
              className="absolute animate-float-slow"
              style={{
                top: a.top,
                left: a.left,
                right: a.right,
                animationDelay: a.delay,
              } as React.CSSProperties}
            >
              <div className="relative">
                <img
                  src={a.src}
                  alt=""
                  className={`${a.size} rounded-full object-cover ring-2 ring-primary/20`}
                  loading="lazy"
                />
                <div className={`absolute ${a.badge.pos} whitespace-nowrap flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-card border border-border/50 text-[10px] text-muted-foreground`}>
                  <BadgeIcon className="w-3 h-3 text-primary" />
                  {a.badge.text}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Profile cards */}
      <div className="absolute left-[4%] top-1/2 -translate-y-1/2 hidden lg:block animate-float-slow" style={{ animationDelay: "1s" }}>
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-card border border-border/50 shadow-lg">
          <img src={testimonial1} alt="" className="w-10 h-10 rounded-full object-cover" />
          <div>
            <p className="text-sm font-medium text-foreground">Priya Sharma</p>
            <p className="text-[11px] text-muted-foreground">UX Designer</p>
            <p className="text-[10px] text-primary">Learning Motion Design</p>
          </div>
        </div>
      </div>
      <div className="absolute right-[4%] top-1/2 -translate-y-1/2 hidden lg:block animate-float-slow" style={{ animationDelay: "2s" }}>
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-card border border-border/50 shadow-lg">
          <img src={masterclass2} alt="" className="w-10 h-10 rounded-full object-cover" />
          <div>
            <p className="text-sm font-medium text-foreground">Arjun Mehta</p>
            <p className="text-[11px] text-muted-foreground">Filmmaker</p>
            <p className="text-[10px] text-primary">Interested in Documentary Craft</p>
          </div>
        </div>
      </div>

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-3xl mx-auto">
        <span className="text-primary text-xs uppercase tracking-[0.2em] font-semibold mb-4">
          The Community
        </span>

        <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
          Come for learning,{" "}
          <span className="text-primary italic font-serif">Stay for the community</span>
        </h2>

        <p className="text-muted-foreground text-sm md:text-base max-w-2xl mb-8">
          Connect with creators, mentors, and peers who push your craft forward. Learn together, grow together.
        </p>

        <a
          href="#"
          className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-semibold text-white mb-14 transition-transform hover:-translate-y-0.5"
          style={{ background: "linear-gradient(135deg, #FF6B35, #F7931E)" }}
        >
          Join the community
          <ArrowRight className="w-4 h-4" />
        </a>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 w-full">
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
      </div>
    </section>
  );
};

export default CommunitySection;
