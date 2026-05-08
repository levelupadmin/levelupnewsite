import { useMemo, useState } from "react";
import { Plus, Minus, Search } from "lucide-react";

export interface FAQ {
  question: string;
  answer: string;
}

interface Props {
  faqs: FAQ[];
  /**
   * Course display name used in the WhatsApp fallback link prefill.
   * Defaults to a generic "Masterclass" so this component is reusable.
   * Pass the actual instructor's masterclass name from the page.
   */
  courseName?: string;
}

/**
 * FAQ — redesigned for the Lokesh masterclass page.
 *
 * Old version: 2-col grid of dense accordion cards. Hard to scan, no
 * filtering, no visual emphasis on the open item.
 *
 * New version:
 *   - Search bar at the top filters questions+answers as you type.
 *   - Single-column wider layout (max-w-3xl) — way more readable than
 *     the cramped 2-col grid.
 *   - Open item gets a gold left-edge accent + amber border + soft
 *     amber inner-shadow so the user always knows what's expanded.
 *   - Smoother height animation via grid-rows trick + opacity easing.
 *   - "Still have questions?" footer with a WhatsApp link as a soft
 *     fallback for anyone whose specific Q wasn't answered.
 */
export default function FAQAccordion({ faqs, courseName = "Masterclass" }: Props) {
  const [openIdx, setOpenIdx] = useState<number | null>(0); // open the first by default
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return faqs.map((f, i) => ({ ...f, originalIndex: i }));
    const q = query.toLowerCase();
    return faqs
      .map((f, i) => ({ ...f, originalIndex: i }))
      .filter(
        (f) =>
          f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q)
      );
  }, [query, faqs]);

  return (
    <div className="max-w-3xl mx-auto">
      {/* Search bar */}
      <div className="relative mb-7 md:mb-9">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/35" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search the FAQ — try 'language', 'certificate', 'refund'…"
          aria-label="Search frequently asked questions"
          className="w-full bg-[#0E0E0E] border border-white/10 focus:border-amber-200/40 outline-none rounded-full pl-11 pr-4 py-3 md:py-3.5 text-sm md:text-[15px] text-white placeholder:text-white/30 transition-colors"
        />
      </div>

      {/* Question list */}
      <div className="space-y-3 md:space-y-4">
        {filtered.length === 0 && (
          <p className="text-center text-white/50 text-sm py-10">
            No questions match "{query}". Try a different keyword, or message us
            on WhatsApp.
          </p>
        )}
        {filtered.map((faq) => {
          const isOpen = openIdx === faq.originalIndex;
          const panelId = `faq-panel-${faq.originalIndex}`;
          const buttonId = `faq-button-${faq.originalIndex}`;
          return (
            <div
              key={faq.originalIndex}
              className={`relative rounded-xl border overflow-hidden transition-all duration-300 ${
                isOpen
                  ? "border-amber-200/35 shadow-[0_20px_50px_-30px_rgba(212,163,108,0.45),inset_0_1px_0_rgba(255,222,179,0.08)] bg-[#120E08]"
                  : "border-white/10 bg-[#0E0E0E] hover:border-white/20"
              }`}
            >
              {/* Gold left-edge accent when open */}
              <div
                aria-hidden="true"
                className={`absolute left-0 top-0 bottom-0 w-[3px] transition-opacity duration-300 ${
                  isOpen ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  background:
                    "linear-gradient(180deg, rgba(245,213,154,0.85), rgba(212,163,108,0.65))",
                  boxShadow: "0 0 12px rgba(245,213,154,0.55)",
                }}
              />

              <button
                id={buttonId}
                onClick={() => setOpenIdx(isOpen ? null : faq.originalIndex)}
                className="w-full px-6 py-5 md:px-7 md:py-6 flex items-center justify-between text-left gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-200/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                aria-expanded={isOpen}
                aria-controls={panelId}
              >
                <span
                  className={`font-sans-body text-[15px] md:text-[17px] leading-snug font-medium transition-colors ${
                    isOpen ? "text-white" : "text-white/85"
                  }`}
                >
                  {faq.question}
                </span>
                <span
                  className={`shrink-0 w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center transition-all ${
                    isOpen
                      ? "bg-amber-200/15 text-amber-200/95 rotate-180"
                      : "bg-white/[0.06] text-white/55"
                  }`}
                >
                  {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </span>
              </button>

              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className={`grid transition-[grid-template-rows,opacity] duration-400 ease-out ${
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-6 pb-6 md:px-7 md:pb-7 font-sans-body text-[14px] md:text-[15px] leading-[1.65] text-white/70">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Still have questions — soft fallback to WhatsApp */}
      <div className="mt-10 md:mt-14 text-center">
        <p className="text-[13px] md:text-[14px] text-white/55">Still have questions?</p>
        <a
          href={`https://api.whatsapp.com/send?phone=919791520177&text=${encodeURIComponent(
            `Hi, I have a question about the ${courseName}`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366] text-white text-[13px] md:text-[14px] font-semibold tracking-[0.01em] shadow-[0_8px_24px_-8px_rgba(37,211,102,0.55)] hover:scale-[1.03] transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-200/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
            <path d="M20.52 3.48A11.83 11.83 0 0 0 12 0C5.4 0 0 5.4 0 12c0 2.1.55 4.13 1.6 5.93L0 24l6.27-1.65A11.94 11.94 0 0 0 12 24c6.6 0 12-5.4 12-12 0-3.18-1.24-6.18-3.48-8.52ZM12 22a9.9 9.9 0 0 1-5.05-1.39l-.36-.21-3.72.98 1-3.62-.24-.37A9.94 9.94 0 0 1 2 12c0-5.5 4.5-10 10-10s10 4.5 10 10-4.5 10-10 10Zm5.45-7.42c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.66.15-.2.3-.76.97-.93 1.16-.17.2-.34.22-.64.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.79-1.67-2.09-.17-.3-.02-.46.13-.61.13-.13.3-.34.45-.51.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.51-.07-.15-.66-1.6-.91-2.18-.24-.58-.49-.5-.66-.51-.17 0-.37 0-.56 0-.2 0-.51.07-.78.37-.27.3-1.04 1.01-1.04 2.47 0 1.46 1.07 2.87 1.21 3.07.15.2 2.11 3.22 5.12 4.5 2.51 1.07 3.13.86 3.69.81.56-.05 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.56-.34Z" />
          </svg>
          Chat with us on WhatsApp
        </a>
      </div>
    </div>
  );
}
