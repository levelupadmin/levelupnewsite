import { useState } from "react";
import FadeInSection from "@/components/FadeInSection";
import { veFAQs } from "@/data/liveVEData";
import { m, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const VEFAQs = () => {
  const [openIndex, setOpenIndex] = useState(-1);

  return (
    <section className="py-20 md:py-28" style={{ background: "hsl(22 14% 4%)" }}>
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <FadeInSection className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 font-sans-body text-[11px] tracking-[0.2em] uppercase font-semibold mb-6">
            FAQs
          </span>
          <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight tracking-tight">
            Questions We Often Get Asked
          </h2>
        </FadeInSection>

        <div className="space-y-3">
          {veFAQs.map((faq, i) => (
            <FadeInSection key={i} delay={i * 40}>
              <button
                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                className="w-full text-left p-5 rounded-xl border border-border/40 bg-card/30 transition-colors hover:bg-card/50"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-sans-body text-base font-medium text-foreground pr-4">{faq.question}</h3>
                  {openIndex === i ? (
                    <Minus className="w-5 h-5 text-purple-400 flex-shrink-0" />
                  ) : (
                    <Plus className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  )}
                </div>
                <AnimatePresence>
                  {openIndex === i && (
                    <m.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="font-sans-body text-sm text-muted-foreground leading-relaxed mt-3">
                        {faq.answer}
                      </p>
                    </m.div>
                  )}
                </AnimatePresence>
              </button>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VEFAQs;
