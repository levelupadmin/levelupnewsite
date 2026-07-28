import { useState } from "react";
import { ChevronDown, Plus, Minus } from "lucide-react";

export interface Episode {
  number: number;
  title: string;
  description: string;
}

interface Props {
  episodes: Episode[];
  /** Render the "Episode N" eyebrow above each title. Default true. */
  showEpisodeLabel?: boolean;
  /** Expand/collapse affordance. "chevron" (default), "plusminus", or "none". */
  icon?: "chevron" | "plusminus" | "none";
  /** Open the first row on mount. Default false (all collapsed). */
  defaultOpen?: boolean;
  /** Class override for the module title. */
  titleClassName?: string;
  /** Class override for the body copy. */
  bodyClassName?: string;
  /** Dashed divider between the title row and body when open. Default false. */
  dashedDivider?: boolean;
  /** Static classes for the plusminus affordance (border + bg + text). Default warm orange. */
  plusminusClassName?: string;
  /** Classes applied to the plusminus affordance only when open. Default orange tint. */
  plusminusOpenClassName?: string;
  /** Rows shown before a "Show N more" control. Unset = show all rows. */
  showMoreAfter?: number;
  /** Allow several rows open at once. Default false (single-open). */
  allowMultiple?: boolean;
  /**
   * @deprecated The Framer originals show every episode with no gate by
   * default. Kept for backwards compatibility with existing call sites;
   * use `showMoreAfter` to opt into a gate.
   */
  initialVisible?: number;
}

export default function EpisodeAccordion({
  episodes,
  showEpisodeLabel = true,
  icon = "chevron",
  defaultOpen = false,
  titleClassName = "",
  bodyClassName = "",
  dashedDivider = false,
  plusminusClassName = "border-[#f1571a]/45 text-[#f1571a]",
  plusminusOpenClassName = "bg-[#f1571a]/10",
  showMoreAfter,
  allowMultiple = false,
}: Props) {
  const [openSet, setOpenSet] = useState<Set<number>>(() =>
    defaultOpen && episodes[0] ? new Set([episodes[0].number]) : new Set()
  );
  const toggle = (n: number) =>
    setOpenSet((prev) => {
      const next = new Set(allowMultiple ? prev : []);
      if (prev.has(n)) next.delete(n);
      else next.add(n);
      return next;
    });
  const [expanded, setExpanded] = useState(false);

  const gated = typeof showMoreAfter === "number" && !expanded;
  const visible = gated ? episodes.slice(0, showMoreAfter) : episodes;
  const hiddenCount = episodes.length - (showMoreAfter ?? episodes.length);

  return (
    <div className="flex flex-col gap-3">
      {visible.map((ep) => {
        const isOpen = openSet.has(ep.number);
        return (
          <div
            key={ep.number}
            className={`rounded-xl border bg-[#0F0F0F]/80 backdrop-blur-sm overflow-hidden transition-colors ${
              isOpen ? "border-[#f1571a]/40" : "border-white/10"
            }`}
          >
            <button
              onClick={() => toggle(ep.number)}
              className="w-full px-5 py-4 md:px-6 md:py-5 flex items-center justify-between text-left gap-3"
              aria-expanded={isOpen}
            >
              <div className="min-w-0">
                {showEpisodeLabel && (
                  <p className="text-[11px] tracking-[0.18em] uppercase text-amber-200/60 font-sans-body">
                    Episode {ep.number}
                  </p>
                )}
                <h3
                  className={
                    titleClassName ||
                    "font-sans-body text-sm md:text-base text-white/90 mt-0.5 leading-tight"
                  }
                >
                  {ep.title}
                </h3>
              </div>
              {icon === "none" ? null : icon === "plusminus" ? (
                <span
                  className={`shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full border transition-colors ${plusminusClassName} ${
                    isOpen ? plusminusOpenClassName : ""
                  }`}
                  aria-hidden="true"
                >
                  {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </span>
              ) : (
                <ChevronDown
                  className={`w-5 h-5 text-amber-200/70 shrink-0 transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              )}
            </button>
            <div
              className={`grid transition-all duration-500 ease-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="px-5 pb-5 md:px-6 md:pb-6">
                  {dashedDivider && (
                    <div className="border-t border-dashed border-white/15 mb-4" />
                  )}
                  <p
                    className={
                      bodyClassName ||
                      "font-sans-body text-xs md:text-sm leading-relaxed text-white/65"
                    }
                  >
                    {ep.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {gated && hiddenCount > 0 && (
        <button
          onClick={() => setExpanded(true)}
          className="mt-1 inline-flex items-center justify-center gap-2 self-center rounded-full border border-white/15 px-5 py-2.5 text-[13px] text-white/70 hover:text-white hover:border-white/30 transition-colors"
        >
          Show {hiddenCount} more lessons
          <ChevronDown className="w-4 h-4" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
