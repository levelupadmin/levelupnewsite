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
//
// Wave 2 polish:
//   - aria-expanded + aria-controls on each episode button so screen
//     readers announce the disclosure state.
//   - Cinzel italic for the episode title gives the lesson list a
//     "screenplay scene heading" feel that fits the masterclass voice.
//   - Episode body text font bumped from text-xs (12px) to text-sm
//     (14px) for mobile legibility.
export default function EpisodeAccordion({ episodes }: Props) {
  const [open, setOpen] = useState<number | null>(0);
  const visible = episodes;

  return (
    <div className="flex flex-col gap-3">
      {visible.map((ep) => {
        const isOpen = open === ep.number;
        const panelId = `episode-panel-${ep.number}`;
        const buttonId = `episode-button-${ep.number}`;
        return (
          <div
            key={ep.number}
            className="rounded-xl border border-white/10 bg-[#0F0F0F]/80 backdrop-blur-sm overflow-hidden transition-colors"
          >
            <button
              id={buttonId}
              type="button"
              onClick={() => setOpen(isOpen ? null : ep.number)}
              aria-expanded={isOpen}
              aria-controls={panelId}
              className="w-full px-5 py-4 md:px-6 md:py-5 flex items-start justify-between text-left gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-200/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              {/* Numbered title without the loud "EPISODE 01" eyebrow.
                  The number sits inline as a gold "01." before the
                  title in Cinzel italic, like a screenplay scene
                  heading. Cleaner than the previous all-caps eyebrow
                  which the user found heavy. */}
              <div className="min-w-0 flex items-baseline gap-3">
                <span
                  className="font-cinzel text-[16px] md:text-[18px] text-amber-200/85 tabular-nums shrink-0"
                  aria-hidden="true"
                >
                  {String(ep.number).padStart(2, "0")}.
                </span>
                <h3
                  className="text-[15px] md:text-[17px] text-white/95 leading-snug"
                  style={{ fontFamily: "Cinzel, serif", fontStyle: "italic", fontWeight: 500 }}
                >
                  <span className="sr-only">Episode {ep.number}: </span>
                  {ep.title}
                </h3>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-amber-200/70 shrink-0 mt-0.5 transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
                aria-hidden="true"
              />
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={`grid transition-all duration-500 ease-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 md:px-6 md:pb-6 font-sans-body text-sm md:text-[15px] leading-relaxed text-white/70">
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
