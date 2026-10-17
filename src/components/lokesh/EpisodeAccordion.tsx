import { useId, useRef, useState, type CSSProperties, type SyntheticEvent } from "react";
import { ChevronDown, Plus, Minus } from "lucide-react";
import "@/styles/masterclass.css";

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
  /** Open the first row on load. Default false (all collapsed). */
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
   * @deprecated Use `showMoreAfter`. Still honoured when `showMoreAfter` is
   * not set, so older call sites get the same gate.
   */
  initialVisible?: number;
}

/**
 * Lesson list on native <details>.
 *
 * - Every row and every description is in the server HTML, so search engines
 *   and visitors without JS see the whole list, and a row opens on the first
 *   tap even before this island hydrates (or with no client directive at all).
 * - Single-open uses the details `name` attribute; browsers that predate it
 *   get the same behaviour from a small toggle handler once hydrated.
 * - Rows past `showMoreAfter` sit inside a "Show N more" <details>, which
 *   also works with no JS.
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
  initialVisible,
}: Props) {
  const uid = useId().replace(/:/g, "");
  const group = allowMultiple ? undefined : `ep-${uid}`;
  const listRef = useRef<HTMLDivElement | null>(null);
  const firstNumber = episodes[0]?.number;
  // Open rows, tracked only to apply a page's custom "open" classes once
  // hydrated. The open state itself lives in the DOM.
  const [openSet, setOpenSet] = useState<Set<number>>(() =>
    defaultOpen && firstNumber !== undefined ? new Set([firstNumber]) : new Set()
  );

  const gateProp = typeof showMoreAfter === "number" ? showMoreAfter : initialVisible;
  const gate = typeof gateProp === "number" ? Math.max(0, gateProp) : episodes.length;
  const shown = episodes.slice(0, gate);
  const rest = episodes.slice(gate);
  const restLabel = itemLabel === "Episode" ? "lessons" : `${itemLabel.toLowerCase()}s`;

  const pmClass = plusminusClassName ?? (accent ? "" : "border-[#f1571a]/45 text-[#f1571a]");
  const tint = (pct: number) => (accent ? `color-mix(in srgb, ${accent} ${pct}%, transparent)` : undefined);

  const onToggle = (n: number) => (e: SyntheticEvent<HTMLDetailsElement>) => {
    const el = e.currentTarget;
    const open = el.open;
    setOpenSet((prev) => {
      if (open === prev.has(n)) return prev;
      const next = new Set(prev);
      if (open) next.add(n);
      else next.delete(n);
      return next;
    });
    // Browsers without exclusive <details name>: close the others by hand.
    if (open && group && typeof HTMLDetailsElement !== "undefined" && !("name" in HTMLDetailsElement.prototype)) {
      listRef.current?.querySelectorAll<HTMLDetailsElement>(`details[data-group="${group}"][open]`).forEach((d) => {
        if (d !== el) d.open = false;
      });
    }
  };

  const row = (ep: Episode) => {
    const isOpen = openSet.has(ep.number);
    const style = (accent ? { "--mck-ep-accent": accent } : undefined) as CSSProperties | undefined;
    return (
      <details
        key={ep.number}
        name={group}
        data-group={group}
        open={defaultOpen && ep.number === firstNumber ? true : undefined}
        onToggle={onToggle(ep.number)}
        className="mck-acc mck-ep rounded-xl border border-white/10 bg-[#0F0F0F]/80 overflow-hidden transition-colors"
        style={style}
      >
        <summary className="w-full min-h-[56px] px-5 py-4 md:px-6 md:py-5 flex items-center justify-between text-left gap-3 rounded-xl">
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
            <h3 className={titleClassName || "font-sans-body text-sm md:text-base text-white/90 mt-0.5 leading-tight"}>
              {!showEpisodeLabel && <span className="sr-only">{itemLabel} {ep.number}: </span>}
              {ep.title}
            </h3>
          </div>
          {icon === "none" ? null : icon === "plusminus" ? (
            <span
              className={`mck-ep__pm shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full border ${pmClass} ${
                plusminusOpenClassName === undefined ? "mck-ep__pm--auto" : ""
              } ${isOpen && plusminusOpenClassName ? plusminusOpenClassName : ""}`}
              style={accent ? { borderColor: tint(50), color: accent } : undefined}
              aria-hidden="true"
            >
              <Plus className="mck-acc__when-closed w-4 h-4" />
              <Minus className="mck-acc__when-open w-4 h-4" />
            </span>
          ) : (
            <ChevronDown
              className={`mck-acc__chev w-5 h-5 shrink-0 ${accent ? "" : "text-amber-200/70"}`}
              style={accent ? { color: accent } : undefined}
              aria-hidden="true"
            />
          )}
        </summary>
        <div className="mck-acc__body px-5 pb-5 md:px-6 md:pb-6">
          {dashedDivider && <div className="border-t border-dashed border-white/15 mb-4" />}
          <p className={bodyClassName || "font-sans-body text-xs md:text-sm leading-relaxed text-white/65"}>{ep.description}</p>
        </div>
      </details>
    );
  };

  return (
    <div className="flex flex-col gap-3" ref={listRef}>
      {shown.map(row)}
      {rest.length > 0 && (
        <details className="mck-ep-more mck-acc">
          <summary className="mx-auto mt-1">
            <span className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-[14px] text-white/75 hover:text-white hover:border-white/30 transition-colors">
              <span className="mck-acc__when-closed">
                Show {rest.length} more {restLabel}
              </span>
              <span className="mck-acc__when-open">Show fewer {restLabel}</span>
              <ChevronDown className="mck-acc__chev w-4 h-4" aria-hidden="true" />
            </span>
          </summary>
          <div className="mck-acc__body flex flex-col gap-3 mt-3">{rest.map(row)}</div>
        </details>
      )}
    </div>
  );
}
