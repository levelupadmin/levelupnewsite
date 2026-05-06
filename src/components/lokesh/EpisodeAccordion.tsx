import { useState } from "react";
import { ChevronDown } from "lucide-react";

export interface Episode {
  number: number;
  title: string;
  description: string;
}

interface Props {
  episodes: Episode[];
  /**
   * @deprecated The Framer original shows every episode without a gate.
   * This prop is now ignored — kept for backwards compatibility with
   * existing call sites.
   */
  initialVisible?: number;
}

// Framer's masterclass pages show every episode in the list with no
// "Show all 15 lessons" gate. Hiding 10 of 15 episodes was a friction
// point I introduced — removing it.
export default function EpisodeAccordion({ episodes }: Props) {
  const [open, setOpen] = useState<number | null>(0);
  const visible = episodes;

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

    </div>
  );
}
