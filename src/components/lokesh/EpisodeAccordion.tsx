import { useState } from "react";
import { ChevronDown } from "lucide-react";

export interface Episode {
  number: number;
  title: string;
  description: string;
}

interface Props {
  episodes: Episode[];
  initialVisible?: number;
}

export default function EpisodeAccordion({ episodes, initialVisible = 4 }: Props) {
  const [open, setOpen] = useState<number | null>(0);
  const [showAll, setShowAll] = useState(false);

  const visible = showAll ? episodes : episodes.slice(0, initialVisible);

  return (
    <div className="flex flex-col gap-3">
      {visible.map((ep) => {
        const isOpen = open === ep.number;
        return (
          <div
            key={ep.number}
            className="rounded-xl border border-white/10 bg-[#0F0F0F]/80 backdrop-blur-sm overflow-hidden transition-colors"
          >
            <button
              onClick={() => setOpen(isOpen ? null : ep.number)}
              className="w-full px-5 py-4 md:px-6 md:py-5 flex items-center justify-between text-left gap-3"
            >
              <div className="min-w-0">
                <p className="text-[11px] tracking-[0.18em] uppercase text-amber-200/60 font-sans-body">
                  Episode {ep.number}
                </p>
                <h3 className="font-sans-body text-sm md:text-base text-white/90 mt-0.5 leading-tight">
                  {ep.title}
                </h3>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-amber-200/70 shrink-0 transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`grid transition-all duration-500 ease-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 md:px-6 md:pb-6 font-sans-body text-xs md:text-sm leading-relaxed text-white/65">
                  {ep.description}
                </p>
              </div>
            </div>
          </div>
        );
      })}

      {!showAll && episodes.length > initialVisible && (
        <button
          onClick={() => setShowAll(true)}
          className="mx-auto mt-2 inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-amber-200/70 hover:text-amber-100 transition-colors"
        >
          Show all {episodes.length} lessons
          <ChevronDown className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
