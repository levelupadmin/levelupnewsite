import { useState } from "react";
import FadeInSection from "@/components/FadeInSection";
import { veCurriculum } from "@/data/liveVEData";
import { m, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const VECurriculum = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-20 md:py-28" style={{ background: "hsl(22 14% 5%)" }}>
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <FadeInSection className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 font-sans-body text-[11px] tracking-[0.2em] uppercase font-semibold mb-6">
            What You'll Learn?
          </span>
          <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight tracking-tight mb-4">
            The Editor's Roadmap
          </h2>
          <p className="font-sans-body text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Your start-to-finish guide to becoming the kind of editor who knows what to cut, why it works, and how to turn it into paid work.
          </p>
        </FadeInSection>

        <div className="space-y-3">
          {veCurriculum.map((item, i) => (
            <FadeInSection key={i} delay={i * 60}>
              <button
                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                className="w-full text-left p-5 rounded-xl border border-border/40 bg-card/40 transition-colors hover:bg-card/60"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <span className="font-sans-body text-xs text-purple-400 font-semibold tracking-wider min-w-[24px]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-sans-body text-base font-semibold text-foreground">{item.title}</h3>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-muted-foreground transition-transform duration-200 ${openIndex === i ? "rotate-180" : ""}`}
                  />
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
                      <p className="font-sans-body text-sm text-muted-foreground leading-relaxed mt-3 pl-10">
                        {item.description}
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

export default VECurriculum;
