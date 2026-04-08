import { useState } from "react";
import FadeInSection from "@/components/FadeInSection";
import { veFAQs } from "@/data/liveVEData";
import { m, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const VEFAQs = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 md:py-28" style={{ background: "hsl(0 0% 4%)" }}>
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <FadeInSection className="text-center mb-14">
          <p className="text-white/40 text-xs tracking-[0.2em] uppercase mb-4">🎬 FAQs</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal text-white leading-tight">
            Questions We Often Get Asked
          </h2>
        </FadeInSection>

        <div className="space-y-2">
          {veFAQs.map((faq, i) => {
            const isOpen = openIndex === i;
            // Alternate some questions with purple highlight style
            const isPurpleQ = i === 6 || i === 7; // "What happens after..." and "Do you offer..."

            return (
              <FadeInSection key={i} delay={i * 40}>
                <div className="flex flex-col items-start">
                  {/* Question bubble - left aligned */}
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="flex items-center gap-3 group"
                  >
                    <span
                      className={`inline-block text-left px-5 py-3 rounded-2xl rounded-bl-sm text-sm transition-colors ${
                        isPurpleQ
                          ? "bg-purple-500/30 text-purple-200 border border-purple-500/30"
                          : "bg-white/8 text-white/80 border border-white/10 hover:bg-white/12"
                      }`}
                    >
                      {faq.question}
                    </span>
                    <span className={`flex-shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-colors ${
                      isOpen
                        ? "border-purple-400/40 text-purple-400"
                        : "border-white/15 text-white/40"
                    }`}>
                      {isOpen ? (
                        <Minus className="w-3.5 h-3.5" />
                      ) : (
                        <Plus className="w-3.5 h-3.5" />
                      )}
                    </span>
                  </button>

                  {/* Answer bubble - right aligned, purple gradient */}
                  <AnimatePresence>
                    {isOpen && (
                      <m.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden w-full flex justify-end mt-2 mb-2"
                      >
                        <div
                          className="max-w-[75%] px-5 py-4 rounded-2xl rounded-br-sm text-sm text-white/80 leading-relaxed"
                          style={{
                            background: "linear-gradient(135deg, hsl(270 40% 35%), hsl(280 50% 45%))",
                          }}
                        >
                          {faq.answer}
                        </div>
                      </m.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeInSection>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default VEFAQs;
