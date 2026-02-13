import { ArrowRight } from "lucide-react";
import careerQuizBanner from "@/assets/career-quiz-banner.jpg";
import { showcasePrograms } from "@/data/programs";

const activeGradients = [
  { active: "from-orange-600 to-orange-600/0", hoverBg: "linear-gradient(to right, rgba(234,88,12,0.25), transparent)" },
  { active: "from-blue-600 to-blue-600/0", hoverBg: "linear-gradient(to right, rgba(37,99,235,0.25), transparent)" },
  { active: "from-purple-600 to-purple-600/0", hoverBg: "linear-gradient(to right, rgba(147,51,234,0.25), transparent)" },
  { active: "from-emerald-600 to-emerald-600/0", hoverBg: "linear-gradient(to right, rgba(5,150,105,0.25), transparent)" },
  { active: "from-rose-600 to-rose-600/0", hoverBg: "linear-gradient(to right, rgba(225,29,72,0.25), transparent)" },
  { active: "from-indigo-600 to-indigo-600/0", hoverBg: "linear-gradient(to right, rgba(79,70,229,0.25), transparent)" },
];

interface LiveProgramSidebarProps {
  activeShowcase: number;
  onSelect: (index: number) => void;
}

const LiveProgramSidebar = ({ activeShowcase, onSelect }: LiveProgramSidebarProps) => {
  return (
    <div className="md:w-[340px] lg:w-[400px] flex-shrink-0 md:border-r border-border flex flex-col">
      {showcasePrograms.map((prog, i) => (
        <div key={prog.id}>
          {i > 0 && <div className="h-px bg-border/40" />}
          <button
            onClick={() => onSelect(i)}
            className={`group relative flex w-full items-center justify-between whitespace-nowrap rounded-lg pl-7 pr-5 py-4 text-left text-sm transition-all overflow-hidden ${
              activeShowcase === i
                ? `bg-gradient-to-r ${activeGradients[i].active} font-semibold text-foreground noise-overlay`
                : "text-muted-foreground hover:text-foreground"
            }`}
            style={activeShowcase !== i ? { backgroundImage: "none" } : undefined}
            onMouseEnter={(e) => {
              if (activeShowcase !== i) e.currentTarget.style.backgroundImage = activeGradients[i].hoverBg;
            }}
            onMouseLeave={(e) => {
              if (activeShowcase !== i) e.currentTarget.style.backgroundImage = "none";
            }}
          >
            {prog.title}
            {activeShowcase === i && <ArrowRight className="w-4 h-4 flex-shrink-0 ml-2 text-white" />}
          </button>
        </div>
      ))}

      {/* Mini CTA Banner */}
      <div className="hidden md:flex mt-auto p-4 flex-1 flex-col justify-end">
        <div className="relative rounded-lg overflow-hidden border border-primary/50 flex-1 flex flex-col">
          <div className="flex-1 flex flex-col justify-end relative" style={{ maskImage: 'linear-gradient(to left, black, transparent)', WebkitMaskImage: 'linear-gradient(to left, black, transparent)' }}>
            <img src={careerQuizBanner} alt="Career quiz" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
            <div className="relative p-5">
              <p className="font-sans-body text-sm text-muted-foreground leading-snug mb-2">
                Not sure which creator<br />path fits you?
              </p>
              <a
                href="https://www.leveluplearning.live/bfp"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-sans-body text-sm text-primary hover:text-primary/80 transition-colors"
              >
                Take our quiz <ArrowRight className="w-3 h-3 animate-slide-right" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveProgramSidebar;
