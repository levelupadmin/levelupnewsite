import { useId, useMemo, useRef, useState, type SyntheticEvent } from "react";
import { Plus, Minus, Search } from "lucide-react";
import "@/styles/masterclass.css";

export interface FAQ {
  question: string;
  answer: string;
  /** Optional link after the answer, e.g. the refund policy. */
  link?: { href: string; label: string };
}

interface Props {
  faqs: FAQ[];
  /** Course name used in the WhatsApp pre-filled message at the bottom
   *  ("Hi, I have a question about the {courseName}"). Defaults to a
   *  generic phrasing so the link is never wrong, just less specific. */
  courseName?: string;
  /** Show the search box. Default true. */
  showSearch?: boolean;
  /** Index of the question open on load; null for none. Default 0. */
  defaultOpenIndex?: number | null;
}

/**
 * FAQ on native <details>.
 *
 * - Every answer is in the server HTML (search engines and FAQ schema need
 *   that), and a question opens on the first tap even before this island
 *   hydrates.
 * - One question open at a time through the details `name` attribute, with
 *   a small fallback for browsers that predate it.
 * - The search box filters questions and answers once the island runs.
 * - The open question gets a gold edge and a warm border.
 * - "Still have questions?" ends in a WhatsApp link, dark green text on
 *   green (6.2:1).
 */
export default function FAQAccordion({ faqs, courseName, showSearch = true, defaultOpenIndex = 0 }: Props) {
  const uid = useId().replace(/:/g, "");
  const group = `faq-${uid}`;
  const listRef = useRef<HTMLDivElement | null>(null);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const all = faqs.map((f, i) => ({ ...f, originalIndex: i }));
    if (!query.trim()) return all;
    const q = query.toLowerCase();
    return all.filter((f) => f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q));
  }, [query, faqs]);

  const onToggle = (e: SyntheticEvent<HTMLDetailsElement>) => {
    const el = e.currentTarget;
    if (!el.open || typeof HTMLDetailsElement === "undefined" || "name" in HTMLDetailsElement.prototype) return;
    listRef.current?.querySelectorAll<HTMLDetailsElement>("details[open]").forEach((d) => {
      if (d !== el) d.open = false;
    });
  };

  return (
    <div className="max-w-3xl mx-auto">
      {showSearch && (
        <div className="relative mb-7 md:mb-9" role="search">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/45 pointer-events-none" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search questions"
            aria-label="Search frequently asked questions"
            className="w-full min-h-[48px] bg-[#0E0E0E] border border-white/10 hover:border-white/20 focus:border-amber-200/40 focus-visible:ring-2 focus-visible:ring-amber-200/40 outline-none rounded-full pl-11 pr-4 py-3 md:py-3.5 text-[16px] md:text-[15px] text-white placeholder:text-white/45 transition-colors"
          />
        </div>
      )}

      <div className="space-y-3 md:space-y-4" ref={listRef}>
        {filtered.length === 0 && (
          <p className="text-center text-white/60 text-sm py-10" role="status">
            No questions match "{query}". Try another word, or message us on WhatsApp.
          </p>
        )}
        {filtered.map((faq) => (
          <details
            key={faq.originalIndex}
            name={group}
            open={faq.originalIndex === defaultOpenIndex ? true : undefined}
            onToggle={onToggle}
            className="mck-acc mck-fa relative rounded-xl border border-white/10 bg-[#0E0E0E] overflow-hidden hover:border-white/20"
          >
            {/* Gold edge on the open question */}
            <span
              aria-hidden="true"
              className="mck-fa__edge absolute left-0 top-0 bottom-0 w-[3px]"
              style={{
                background: "linear-gradient(180deg, rgba(245,213,154,0.85), rgba(212,163,108,0.65))",
                boxShadow: "0 0 12px rgba(245,213,154,0.55)",
              }}
            />
            <summary className="w-full min-h-[56px] px-6 py-5 md:px-7 md:py-6 flex items-center justify-between text-left gap-4 rounded-xl">
              <span className="mck-fa__q font-sans-body text-[15px] md:text-[17px] leading-snug font-medium">
                {faq.question}
              </span>
              <span aria-hidden="true" className="mck-fa__pm shrink-0 w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center">
                <Plus className="mck-acc__when-closed w-4 h-4" />
                <Minus className="mck-acc__when-open w-4 h-4" />
              </span>
            </summary>
            <div className="mck-acc__body">
              <p className="px-6 pb-6 md:px-7 md:pb-7 font-sans-body text-[15px] leading-[1.65] text-white/75">
                {faq.answer}
                {faq.link && (
                  <>
                    {" "}
                    <a
                      href={faq.link.href}
                      className="text-amber-200 underline underline-offset-[3px] decoration-amber-200/40 hover:decoration-amber-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-200 rounded-sm"
                    >
                      {faq.link.label}
                    </a>
                  </>
                )}
              </p>
            </div>
          </details>
        ))}
      </div>

      {/* Still have questions: a soft fallback to WhatsApp */}
      <div className="mt-10 md:mt-14 text-center">
        <p className="text-[13px] md:text-[14px] text-white/65">Still have questions?</p>
        <a
          href={`https://api.whatsapp.com/send?phone=919791520177&text=${encodeURIComponent(
            courseName
              ? `Hi, I have a question about the ${courseName}`
              : "Hi, I have a question about a LevelUp masterclass"
          )}`}
          target="_blank"
          rel="noopener"
          className="mt-3 inline-flex min-h-[46px] items-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366] text-[#0b3d1f] text-[14px] font-bold tracking-[0.01em] shadow-[0_8px_24px_-8px_rgba(37,211,102,0.55)] hover:-translate-y-px active:scale-[0.98] transition-transform motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-white"
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
