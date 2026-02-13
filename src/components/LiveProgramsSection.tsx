import { useState } from "react";
import { showcasePrograms } from "@/data/programs";
import LiveProgramSidebar from "./LiveProgramSidebar";
import LiveProgramDetails from "./LiveProgramDetails";

const detailGradients = [
  "linear-gradient(135deg, rgba(234,88,12,0.15) 0%, transparent 60%)",
  "linear-gradient(135deg, rgba(37,99,235,0.15) 0%, transparent 60%)",
  "linear-gradient(135deg, rgba(147,51,234,0.15) 0%, transparent 60%)",
  "linear-gradient(135deg, rgba(5,150,105,0.15) 0%, transparent 60%)",
  "linear-gradient(135deg, rgba(225,29,72,0.15) 0%, transparent 60%)",
  "linear-gradient(135deg, rgba(79,70,229,0.15) 0%, transparent 60%)",
];

const LiveProgramsSection = () => {
  const [activeShowcase, setActiveShowcase] = useState(0);
  const activeProgram = showcasePrograms[activeShowcase];

  return (
    <section id="live-programs" aria-label="Live programs" className="relative py-14 md:py-20">
      {/* Amber accent line at top */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: "linear-gradient(90deg, transparent 10%, hsl(38 75% 55% / 0.5) 50%, transparent 90%)" }}
      />

      {/* Subtle top glow */}
      <div
        className="absolute top-0 left-0 right-0 h-64 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 0%, hsl(38 75% 55% / 0.03) 0%, transparent 70%)" }}
      />

      {/* Section header */}
      <div className="text-center px-6 md:px-12 mb-10 md:mb-12">
        <span className="inline-block font-sans-body text-[10px] md:text-xs tracking-[0.15em] uppercase px-3 py-1 rounded-full border border-primary/30 text-primary bg-primary/5 mb-4">
          Live + Mentor-Led
        </span>
        <h2 className="font-serif-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-hero-headline leading-[1.2] tracking-tight">
          Your craft,{" "}
          <em className="italic font-normal text-primary">guided live</em>
        </h2>
        <p className="font-sans-body text-sm md:text-base text-hero-subtext mt-5 md:mt-6 max-w-xl mx-auto leading-relaxed">
          Structured programs led by working professionals. Live sessions, real practice, honest feedback.
        </p>
      </div>

      {/* Showcase: Sidebar | Image | Details */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row rounded-sm overflow-hidden border border-border bg-card md:min-h-[640px] lg:min-h-[720px]">
          <LiveProgramSidebar activeShowcase={activeShowcase} onSelect={setActiveShowcase} />

          {/* Center image */}
          <div className="relative aspect-[16/10] md:aspect-auto md:w-[45%] overflow-hidden">
            <img
              src={activeProgram.image}
              alt={activeProgram.title}
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
              loading="lazy"
            />
          </div>

          <LiveProgramDetails program={activeProgram} detailBg={detailGradients[activeShowcase]} />
        </div>
      </div>
    </section>
  );
};

export default LiveProgramsSection;
