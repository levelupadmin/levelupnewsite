import { motion } from "framer-motion";
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
  },
  {
    image: liveProgram2,
    title: "Camera & Light Lab",
    description: "Master cinematic lighting and camera movement with hands-on shooting exercises.",
    duration: "6 weeks",
    format: "Live + Recorded",
    status: "Upcoming",
    mentor: "Meera Kapoor",
  },
  {
    image: liveProgram3,
    title: "Screenwriting Cohort",
    description: "Develop a short screenplay from concept to final draft with weekly feedback.",
    duration: "10 weeks",
    format: "Live",
    status: "Enrolling",
    mentor: "Vikram Desai",
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
  },
  {
    image: liveProgram6,
    title: "Documentary Intensive",
    description: "Learn to find, shape, and tell non-fiction stories with clarity and empathy.",
    duration: "8 weeks",
    format: "Live + Recorded",
    status: "Enrolling",
    mentor: "Ananya Sen",
  },
];

const statusStyles: Record<ProgramStatus, string> = {
  Enrolling: "bg-primary/10 text-primary border-primary/20",
  Upcoming: "bg-secondary text-secondary-foreground border-border",
  "Coming Soon": "bg-muted text-muted-foreground border-border",
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.15 + i * 0.1, ease: "easeOut" as const },
  }),
};

const LiveProgramsSection = () => {
  return (
    <section className="relative bg-background py-12 md:py-16">
      {/* Subtle divider glow */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 10%, hsl(var(--border)) 50%, transparent 90%)",
        }}
      />

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8 }}
        className="text-center px-6 md:px-12 mb-10 md:mb-12"
      >
        <h2 className="font-serif-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-hero-headline leading-[1.2] tracking-tight">
          Your craft,{" "}
          <em className="italic font-normal text-primary">guided live</em>
        </h2>
        <p className="font-sans-body text-sm md:text-base text-hero-subtext mt-5 md:mt-6 max-w-xl mx-auto leading-relaxed">
          Structured programs led by working professionals. Live sessions,
          real practice, honest feedback.
        </p>
      </motion.div>

      {/* Program cards grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-8">
          {programs.map((program, index) => (
            <ProgramCard key={program.title} program={program} index={index} />
          ))}
        </div>
      </div>

      {/* Soft CTA */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-center mt-10 md:mt-14"
      >
        <a
          href="#"
          className="group inline-flex items-center gap-3 font-sans-body text-sm text-muted-foreground hover:text-foreground transition-colors duration-400"
        >
          See all upcoming programs
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      </motion.div>
    </section>
  );
};

interface ProgramCardProps {
  program: Program;
  index: number;
}

const ProgramCard = ({ program, index }: ProgramCardProps) => {
  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={cardVariants}
      className="group relative cursor-pointer rounded-lg overflow-hidden bg-card border border-border hover:border-primary/20 transition-all duration-500"
    >
      {/* Image header */}
      <div className="relative aspect-[16/9] overflow-hidden">
        <img
          src={program.image}
          alt={program.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />

        {/* Status badge */}
        <div className="absolute top-4 left-4">
          <span
            className={`font-sans-body text-[10px] md:text-xs tracking-wide uppercase px-3 py-1 rounded-full border ${statusStyles[program.status]}`}
          >
            {program.status}
          </span>
        </div>
      </div>

      {/* Card body */}
      <div className="p-5 md:p-6">
        {/* Title */}
        <h3 className="font-serif-display text-lg md:text-xl font-medium text-hero-headline leading-tight tracking-tight mb-2">
          {program.title}
        </h3>

        {/* Description */}
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

      {/* Hover accent line at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary/0 group-hover:bg-primary/40 transition-all duration-500" />
    </motion.div>
  );
};

const MetaItem = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <div className="flex items-center gap-1.5 text-muted-foreground">
    {icon}
    <span className="font-sans-body text-xs">{label}</span>
  </div>
);

export default LiveProgramsSection;
