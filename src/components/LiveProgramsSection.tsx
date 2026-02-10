import { useRef, useState, useCallback } from "react";
import { Clock, Radio, CalendarDays, ArrowRight } from "lucide-react";

import liveProgram1 from "@/assets/live-program-1.jpg";
import liveProgram2 from "@/assets/live-program-2.jpg";
import liveProgram3 from "@/assets/live-program-3.jpg";
import liveProgram4 from "@/assets/live-program-4.jpg";
import liveProgram5 from "@/assets/live-program-5.jpg";
import liveProgram6 from "@/assets/live-program-6.jpg";

type ProgramStatus = "Enrolling" | "Upcoming" | "Coming Soon";

interface Program {
  image: string;
  title: string;
  description: string;
  duration: string;
  format: string;
  status: ProgramStatus;
  mentor: string;
  startDate?: string;
  spotsLeft?: number;
}

const programs: Program[] = [
  {
    image: liveProgram1,
    title: "Directing Intensive",
    description: "Build a directorial voice through scene work, blocking, and guided critique.",
    duration: "8 weeks",
    format: "Live",
    status: "Enrolling",
    mentor: "Arun Varma",
    startDate: "Mar 3",
    spotsLeft: 6,
  },
  {
    image: liveProgram2,
    title: "Camera & Light Lab",
    description: "Master cinematic lighting and camera movement with hands-on shooting exercises.",
    duration: "6 weeks",
    format: "Live + Recorded",
    status: "Upcoming",
    mentor: "Meera Kapoor",
    startDate: "Apr 14",
  },
  {
    image: liveProgram3,
    title: "Screenwriting Cohort",
    description: "Develop a short screenplay from concept to final draft with weekly feedback.",
    duration: "10 weeks",
    format: "Live",
    status: "Enrolling",
    mentor: "Vikram Desai",
    startDate: "Feb 24",
    spotsLeft: 3,
  },
  {
    image: liveProgram4,
    title: "Sound & Score Workshop",
    description: "Explore sound design and music scoring for narrative film in a studio setting.",
    duration: "4 weeks",
    format: "Live + Recorded",
    status: "Coming Soon",
    mentor: "Priya Nair",
  },
  {
    image: liveProgram5,
    title: "Editorial Craft Track",
    description: "Sharpen your editing instinct through daily cuts, rhythm exercises, and critique.",
    duration: "6 weeks",
    format: "Live",
    status: "Upcoming",
    mentor: "Rohan Mehta",
    startDate: "May 5",
  },
  {
    image: liveProgram6,
    title: "Documentary Intensive",
    description: "Learn to find, shape, and tell non-fiction stories with clarity and empathy.",
    duration: "8 weeks",
    format: "Live + Recorded",
    status: "Enrolling",
    mentor: "Ananya Sen",
    startDate: "Mar 10",
    spotsLeft: 9,
  },
];

const statusStyles: Record<ProgramStatus, string> = {
  Enrolling: "bg-primary/10 text-primary border-primary/20",
  Upcoming: "bg-secondary text-secondary-foreground border-border",
  "Coming Soon": "bg-muted text-muted-foreground border-border",
};

const LiveProgramsSection = () => {
  return (
    <section id="live-programs" aria-label="Live programs" className="relative py-12 md:py-16">
      {/* Section header */}
      <div className="text-center px-6 md:px-12 mb-10 md:mb-12">
        <span className="inline-block font-sans-body text-[10px] md:text-xs tracking-[0.15em] uppercase px-3 py-1 rounded-full border border-primary/30 text-primary bg-primary/5 mb-4">
          Live + Mentor-led
        </span>
        <h2 className="font-serif-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-hero-headline leading-[1.2] tracking-tight">
          Your craft,{" "}
          <em className="italic font-normal text-primary">guided live</em>
        </h2>
        <p className="font-sans-body text-sm md:text-base text-hero-subtext mt-5 md:mt-6 max-w-xl mx-auto leading-relaxed">
          Structured programs led by working professionals. Live sessions,
          real practice, honest feedback.
        </p>
      </div>

      {/* Program cards grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-6 lg:gap-8">
          {programs.map((program) => (
            <ProgramCard key={program.title} program={program} />
          ))}
        </div>
      </div>

      {/* Soft CTA */}
      <div className="text-center mt-10 md:mt-14">
        <a
          href="#"
          className="cta-underline group inline-flex items-center gap-3 font-sans-body text-sm text-muted-foreground hover:text-foreground transition-colors duration-400"
        >
          See all upcoming programs
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      </div>
    </section>
  );
};

interface ProgramCardProps {
  program: Program;
}

const ProgramCard = ({ program }: ProgramCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rotateX: -y * 6, rotateY: x * 6 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0 });
  }, []);

  return (
    <div className="group relative cursor-pointer" style={{ perspective: 800 }}>
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative rounded-lg overflow-hidden bg-card border border-border transition-all duration-300 ease-out will-change-transform group-hover:border-primary/30"
        style={{
          transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Image header */}
        <div className="relative aspect-[16/9] overflow-hidden">
          <img
            src={program.image}
            alt={program.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />

          {/* Status badge */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span
              className={[
                "font-sans-body text-[10px] md:text-xs tracking-wide uppercase px-3 py-1 rounded-full border transition-all duration-300",
                statusStyles[program.status],
                program.status === "Enrolling"
                  ? "group-hover:animate-[pulse_2s_ease-in-out_infinite] group-hover:shadow-[0_0_12px_hsl(var(--primary)/0.3)]"
                  : "",
              ].join(" ")}
            >
              {program.status}
            </span>
          </div>

          {/* Urgency indicators */}
          {(program.startDate || program.spotsLeft) && (
            <div className="absolute top-4 right-4 flex flex-col items-end gap-1.5">
              {program.startDate && (
                <span className="font-sans-body text-[10px] md:text-xs tracking-wide px-2.5 py-1 rounded-full bg-card/80 backdrop-blur-sm border border-border text-hero-subtext">
                  Starts {program.startDate}
                </span>
              )}
              {program.spotsLeft && program.spotsLeft <= 10 && (
                <span
                  className={[
                    "font-sans-body text-[10px] md:text-xs font-medium tracking-wide px-2.5 py-1 rounded-full border",
                    program.spotsLeft <= 5
                      ? "bg-destructive/10 text-destructive border-destructive/20 animate-[pulse_2.5s_ease-in-out_infinite]"
                      : "bg-primary/10 text-primary border-primary/20",
                  ].join(" ")}
                >
                  {program.spotsLeft} spots left
                </span>
              )}
            </div>
          )}
        </div>

        {/* Card body */}
        <div className="p-5 md:p-6">
          <h3 className="font-serif-display text-lg md:text-xl font-medium text-hero-headline leading-tight tracking-tight mb-2">
            {program.title}
          </h3>
          <p className="font-sans-body text-sm text-muted-foreground leading-relaxed mb-5">
            {program.description}
          </p>

          {/* Metadata row */}
          <div className="flex flex-wrap items-center gap-4 mb-5">
            <MetaItem icon={<Clock className="w-3.5 h-3.5" />} label={program.duration} />
            <MetaItem icon={<Radio className="w-3.5 h-3.5" />} label={program.format} />
          </div>

          {/* Mentor line */}
          <div className="flex items-center gap-2 pt-4 border-t border-border">
            <CalendarDays className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="font-sans-body text-xs text-muted-foreground">
              Led by{" "}
              <span className="text-hero-subtext font-medium">{program.mentor}</span>
            </span>
          </div>
        </div>

        {/* Animated accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] overflow-hidden">
          <div className="h-full w-full bg-primary/50 -translate-x-full group-hover:translate-x-0 transition-transform duration-600 ease-out" />
        </div>
      </div>
    </div>
  );
};

const MetaItem = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <div className="flex items-center gap-1.5 text-muted-foreground">
    {icon}
    <span className="font-sans-body text-xs">{label}</span>
  </div>
);

export default LiveProgramsSection;
