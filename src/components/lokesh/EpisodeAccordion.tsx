import { useId, useRef, useState } from "react";
import { ChevronDown, Plus, Minus } from "lucide-react";

export interface Episode {
  number: number;
  title: string;
  description: string;
  /** Running time shown beside the title, e.g. "5:50". Optional. */
  duration?: string;
  /** Show a "Free preview" tag on this row. Optional. */
  free?: boolean;
}

interface Props {
  episodes: Episode[];
  /** Render the "Episode N" eyebrow above each title. Default true. */
  showEpisodeLabel?: boolean;
  /** Word used in that eyebrow and the show-more button. Default "Episode". */
  itemLabel?: string;
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
  /**
   * Accent colour (any CSS colour) for the open row border, the chevron and
   * the plus/minus icon. Overrides the orange default; pass the page's gold,
   * e.g. "#d4a36c".
   */
  accent?: string;
  /** Rows shown before a "Show N more" control. Unset = show all rows. */
  showMoreAfter?: number;
  /** Allow several rows open at once. Default false (single-open). */
  allowMultiple?: boolean;
  /**
   * @deprecated The Framer originals show every episode with no gate by
   * default. Kept for backwards compatibility with existing call sites
   * (it is ignored); use `showMoreAfter` to opt into a gate.
   */
  initialVisible?: number;
}

/**
 * Lesson list. Every row is in the server HTML (search engines and no-JS
 * visitors see the whole list); rows past `showMoreAfter` are hidden until
 * "Show N more" is pressed. Each toggle has aria-expanded and aria-controls.
 */
export default function EpisodeAccordion({
  episodes,
  showEpisodeLabel = true,
  itemLabel = "Episode",
  icon = "chevron",
  defaultOpen = false,
  titleClassName = "",
  bodyClassName = "",
  dashedDivider = false,
  plusminusClassName,
  plusminusOpenClassName,
  accent,
  showMoreAfter,
  allowMultiple = false,
}: Props) {
  const uid = useId().replace(/:/g, "");
  const listRef = useRef<HTMLDivElement | null>(null);
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

  const gate = typeof showMoreAfter === "number" ? Math.max(0, showMoreAfter) : episodes.length;
  const gated = gate < episodes.length && !expanded;
  const hiddenCount = Math.max(0, episodes.length - gate);

  const pmClass = plusminusClassName ?? (accent ? "" : "border-[#f1571a]/45 text-[#f1571a]");
  const pmOpenClass = plusminusOpenClassName ?? (accent ? "" : "bg-[#f1571a]/10");
  const tint = (pct: number) => (accent ? `color-mix(in srgb, ${accent} ${pct}%, transparent)` : undefined);

  const expand = () => {
    setExpanded(true);
    // Move focus to the first row that was hidden, so keyboard users land
    // on the new content rather than on a button that has disappeared.
    requestAnimationFrame(() => {
      const btn = listRef.current?.querySelector<HTMLButtonElement>(`[data-row="${gate}"] button`);
      btn?.focus();
    });
  };

  return (
    <div className="flex flex-col gap-3" ref={listRef}>
      {episodes.map((ep, i) => {
        const isOpen = openSet.has(ep.number);
        const panelId = `ep-${uid}-${ep.number}`;
        const btnId = `${panelId}-btn`;
        const rowHidden = gated && i >= gate;
        return (
          <div
            key={ep.number}
            data-row={i}
            hidden={rowHidden}
            className={`rounded-xl border bg-[#0F0F0F]/80 backdrop-blur-sm overflow-hidden transition-colors ${
              isOpen ? (accent ? "" : "border-[#f1571a]/40") : "border-white/10"
            }`}
            style={isOpen && accent ? { borderColor: tint(45) } : undefined}
          >
            <button
              type="button"
              id={btnId}
              onClick={() => toggle(ep.number)}
              className="w-full min-h-[56px] px-5 py-4 md:px-6 md:py-5 flex items-center justify-between text-left gap-3"
              aria-expanded={isOpen}
              aria-controls={panelId}
            >
              <div className="min-w-0">
                {(showEpisodeLabel || ep.duration || ep.free) && (
                  <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] tracking-[0.18em] uppercase text-amber-200/70 font-sans-body">
                    {showEpisodeLabel && (
                      <span>
                        {itemLabel} {ep.number}
                      </span>
                    )}
                    {ep.duration && (
                      <span className="tracking-[0.08em] text-white/55">
                        {showEpisodeLabel ? "· " : ""}
                        {ep.duration}
                      </span>
                    )}
                    {ep.free && (
                      <span className="tracking-[0.08em] rounded-full border border-amber-200/40 px-2 py-[1px] text-amber-100">
                        Free preview
                      </span>
                    )}
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
                  className={`shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full border transition-colors ${pmClass} ${
                    isOpen ? pmOpenClass : ""
                  }`}
                  style={
                    accent
                      ? { borderColor: tint(50), color: accent, background: isOpen ? tint(12) : undefined }
                      : undefined
                  }
                  aria-hidden="true"
                >
                  {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </span>
              ) : (
                <ChevronDown
                  className={`w-5 h-5 shrink-0 transition-transform duration-300 ${accent ? "" : "text-amber-200/70"} ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  style={accent ? { color: accent } : undefined}
                  aria-hidden="true"
                />
              )}
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              aria-hidden={!isOpen}
              className={`grid transition-all duration-500 ease-out motion-reduce:transition-none ${
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
          type="button"
          onClick={expand}
          className="mt-1 inline-flex min-h-[44px] items-center justify-center gap-2 self-center rounded-full border border-white/15 px-5 py-2.5 text-[14px] text-white/75 hover:text-white hover:border-white/30 transition-colors"
        >
          Show {hiddenCount} more {itemLabel === "Episode" ? "lessons" : `${itemLabel.toLowerCase()}s`}
          <ChevronDown className="w-4 h-4" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
