import { useState } from "react";
import { Plus, Minus } from "lucide-react";

export interface FAQ {
  question: string;
  answer: string;
}

export default function FAQAccordion({ faqs }: { faqs: FAQ[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
      {faqs.map((faq, i) => {
        const isOpen = openIdx === i;
        return (
          <div
            key={i}
            className="rounded-xl border border-white/10 bg-[#0E0E0E] overflow-hidden h-fit"
          >
            <button
              onClick={() => setOpenIdx(isOpen ? null : i)}
              className="w-full px-5 py-4 md:px-6 md:py-5 flex items-center justify-between text-left gap-3 hover:bg-white/[0.02] transition-colors"
            >
              <span className="font-sans-body text-sm md:text-base text-white/90 leading-snug">
                {faq.question}
              </span>
              {isOpen ? (
                <Minus className="w-4 h-4 text-amber-200/70 shrink-0" />
              ) : (
                <Plus className="w-4 h-4 text-amber-200/70 shrink-0" />
              )}
            </button>
            <div
              className={`grid transition-all duration-400 ease-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 md:px-6 md:pb-6 font-sans-body text-xs md:text-sm leading-relaxed text-white/60">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
