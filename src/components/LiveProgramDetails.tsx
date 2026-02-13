import { ArrowRight, Clock, Radio, CalendarDays } from "lucide-react";
import type { showcasePrograms } from "@/data/programs";

const statusStyles: Record<string, string> = {
  Enrolling: "bg-primary/10 text-primary border-primary/20",
  Upcoming: "bg-secondary text-secondary-foreground border-border",
  "Coming Soon": "bg-muted text-muted-foreground border-border",
};

interface LiveProgramDetailsProps {
  program: (typeof showcasePrograms)[number];
  detailBg: string;
}

const LiveProgramDetails = ({ program, detailBg }: LiveProgramDetailsProps) => {
  return (
    <div className="flex-1 flex flex-col justify-between p-8 lg:p-10" style={{ backgroundImage: detailBg }}>
      <div>
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="inline-flex items-center gap-1.5 font-sans-body text-xs tracking-wide px-2.5 py-1 rounded-full bg-secondary border border-border text-muted-foreground">
            <Clock className="w-3 h-3" /> {program.duration}
          </span>
          <span className={`font-sans-body text-xs tracking-wide uppercase px-2.5 py-1 rounded-full border ${statusStyles[program.status]}`}>
            {program.status}
          </span>
          {program.spotsLeft && (
            <span className="inline-flex items-center gap-1.5 font-sans-body text-xs text-destructive">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-destructive" />
              </span>
              {program.spotsLeft} spots left
            </span>
          )}
        </div>

        <h3 className="font-serif-display text-2xl lg:text-4xl font-medium text-hero-headline leading-tight tracking-tight mb-3">
          {program.title}
        </h3>

        <p className="font-sans-body text-sm text-muted-foreground leading-relaxed mb-5 max-w-md">
          {program.description}
        </p>

        <div className="flex flex-wrap items-center gap-4 mb-5">
          <span className="inline-flex items-center gap-1.5 text-muted-foreground font-sans-body text-xs">
            <Radio className="w-3.5 h-3.5" /> {program.format}
          </span>
          {program.startDate && (
            <span className="inline-flex items-center gap-1.5 text-muted-foreground font-sans-body text-xs">
              <CalendarDays className="w-3.5 h-3.5" /> Starts {program.startDate}
            </span>
          )}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between pt-4 border-t border-border mb-5">
          <span className="font-sans-body text-xs text-muted-foreground">
            Led by <span className="text-hero-subtext font-medium">{program.instructor}</span>
          </span>
        </div>

        <div className="flex gap-3 flex-nowrap">
          <a
            href="https://www.leveluplearning.live/bfp"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-sweep cta-glow inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-sans-body text-sm font-medium tracking-wide transition-colors hover:bg-primary/90 whitespace-nowrap"
          >
            Request Invite <ArrowRight className="w-3.5 h-3.5" />
          </a>
          <a
            href="https://www.leveluplearning.live/bfp"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center font-sans-body text-sm px-5 py-2.5 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors whitespace-nowrap"
          >
            Learn More
          </a>
        </div>
      </div>
    </div>
  );
};

export default LiveProgramDetails;
