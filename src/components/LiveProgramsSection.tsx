import { useState } from "react";
import { ArrowRight, Clock, Radio, CalendarDays } from "lucide-react";
import { showcasePrograms } from "@/data/programs";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

const statusStyles: Record<string, string> = {
  Enrolling: "bg-primary/10 text-primary border-primary/20",
  Upcoming: "bg-secondary text-secondary-foreground border-border",
  "Coming Soon": "bg-muted text-muted-foreground border-border",
};

const LiveProgramsSection = () => {
  const [activeShowcase, setActiveShowcase] = useState(0);
  const activeProgram = showcasePrograms[activeShowcase];

  return (
    <section id="live-programs" aria-label="Live programs" className="relative py-12 md:py-16">
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
          Structured programs led by working professionals. Live sessions,
          real practice, honest feedback.
        </p>
      </div>

      {/* Sidebar + Featured Card */}
      {/* Desktop layout */}
      <div className="max-w-7xl mx-auto px-5 md:px-12 hidden md:block">
        <div className="flex flex-row rounded-sm overflow-hidden border border-border bg-card">
          {/* Sidebar */}
          <div className="md:w-[260px] lg:w-[300px] flex-shrink-0 md:border-r border-border">
            {showcasePrograms.map((prog, i) => (
              <button
                key={prog.id}
                onClick={() => setActiveShowcase(i)}
                className={`group flex w-full items-center justify-between px-5 py-5 text-left text-base transition-all border-b border-border/40 last:border-b-0 ${
                  activeShowcase === i
                    ? "bg-secondary font-medium text-foreground"
                    : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                }`}
              >
                <span className="truncate">{prog.title}</span>
                {activeShowcase === i && (
                  <ArrowRight className="w-4 h-4 flex-shrink-0 ml-2 text-primary" />
                )}
              </button>
            ))}
          </div>

          {/* Featured Card */}
          <div className="flex-1 flex flex-row">
            <div className="relative md:w-1/2 overflow-hidden">
              <img
                src={activeProgram.image}
                alt={activeProgram.title}
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-card/20" />
            </div>
            <div className="flex-1 p-8 lg:p-10 flex flex-col justify-center">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 font-sans-body text-xs tracking-wide px-2.5 py-1 rounded-full bg-secondary border border-border text-muted-foreground">
                  <Clock className="w-3 h-3" /> {activeProgram.duration}
                </span>
                <span className={`font-sans-body text-xs tracking-wide uppercase px-2.5 py-1 rounded-full border ${statusStyles[activeProgram.status]}`}>
                  {activeProgram.status}
                </span>
              </div>
              <h3 className="font-serif-display text-2xl lg:text-3xl font-medium text-hero-headline leading-tight tracking-tight mb-3">
                {activeProgram.title}
              </h3>
              <p className="font-sans-body text-base text-muted-foreground leading-relaxed mb-5 max-w-md">
                {activeProgram.description}
              </p>
              <div className="flex flex-wrap items-center gap-4 mb-5">
                <span className="inline-flex items-center gap-1.5 text-muted-foreground font-sans-body text-xs">
                  <Radio className="w-3.5 h-3.5" /> {activeProgram.format}
                </span>
                {activeProgram.startDate && (
                  <span className="inline-flex items-center gap-1.5 text-muted-foreground font-sans-body text-xs">
                    <CalendarDays className="w-3.5 h-3.5" /> Starts {activeProgram.startDate}
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <span className="font-sans-body text-xs text-muted-foreground">
                  Led by <span className="text-hero-subtext font-medium">{activeProgram.instructor}</span>
                </span>
                {activeProgram.spotsLeft && (
                  <span className={`font-sans-body text-xs font-medium tracking-wide px-2.5 py-1 rounded-full border ${
                    activeProgram.spotsLeft <= 5
                      ? "bg-destructive/10 text-destructive border-destructive/20"
                      : "bg-primary/10 text-primary border-primary/20"
                  }`}>
                    {activeProgram.spotsLeft} spots left
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile accordion */}
      <div className="md:hidden px-5">
        <Accordion type="single" collapsible defaultValue="directing-intensive" className="rounded-sm border border-border bg-card overflow-hidden">
          {showcasePrograms.map((prog) => (
            <AccordionItem key={prog.id} value={prog.id} className="border-b border-border/40 last:border-b-0">
              <AccordionTrigger className="px-4 py-4 text-sm font-medium text-foreground hover:no-underline">
                <div className="flex items-center gap-2">
                  <span>{prog.title}</span>
                  <span className={`font-sans-body text-[10px] tracking-wide uppercase px-2 py-0.5 rounded-full border ${statusStyles[prog.status]}`}>
                    {prog.status}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="relative aspect-[16/10] rounded-md overflow-hidden mb-4">
                  <img src={prog.image} alt={prog.title} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 font-sans-body text-[10px] tracking-wide px-2.5 py-1 rounded-full bg-secondary border border-border text-muted-foreground">
                    <Clock className="w-3 h-3" /> {prog.duration}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-muted-foreground font-sans-body text-[10px]">
                    <Radio className="w-3 h-3" /> {prog.format}
                  </span>
                  {prog.startDate && (
                    <span className="inline-flex items-center gap-1.5 text-muted-foreground font-sans-body text-[10px]">
                      <CalendarDays className="w-3 h-3" /> Starts {prog.startDate}
                    </span>
                  )}
                </div>
                <p className="font-sans-body text-sm text-muted-foreground leading-relaxed mb-4">{prog.description}</p>
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <span className="font-sans-body text-xs text-muted-foreground">
                    Led by <span className="text-hero-subtext font-medium">{prog.instructor}</span>
                  </span>
                  {prog.spotsLeft && (
                    <span className={`font-sans-body text-[10px] font-medium tracking-wide px-2.5 py-1 rounded-full border ${
                      prog.spotsLeft <= 5
                        ? "bg-destructive/10 text-destructive border-destructive/20"
                        : "bg-primary/10 text-primary border-primary/20"
                    }`}>
                      {prog.spotsLeft} spots left
                    </span>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
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

export default LiveProgramsSection;
