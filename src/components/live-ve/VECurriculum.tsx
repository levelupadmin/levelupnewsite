import { useState } from "react";
import FadeInSection from "@/components/FadeInSection";
import { veCurriculum } from "@/data/liveVEData";
import { m, AnimatePresence } from "framer-motion";
import { Plus, X } from "lucide-react";

import curriculum1 from "@/assets/curriculum/curriculum-1.png";
import curriculum2 from "@/assets/curriculum/curriculum-2.png";
import curriculum3 from "@/assets/curriculum/curriculum-3.png";
import curriculum4 from "@/assets/curriculum/curriculum-4.png";
import curriculum5 from "@/assets/curriculum/curriculum-5.png";
import curriculum6 from "@/assets/curriculum/curriculum-6.png";

const curriculumImages = [curriculum1, curriculum2, curriculum3, curriculum4, curriculum5, curriculum6];

const VECurriculum = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-16 md:py-24 px-4 md:px-8" style={{ background: "hsl(160 8% 8%)" }}>
      <div className="max-w-[1400px] mx-auto">
        <div className="rounded-2xl border border-white/10 overflow-hidden p-8 md:p-12" style={{ background: "hsl(240 10% 10%)" }}>
          <FadeInSection className="text-center mb-10">
            <p className="text-xs text-white/40 tracking-[0.2em] uppercase mb-3">🎬 What You'll Learn?</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal text-white leading-tight mb-3">
              The Editor's Roadmap
            </h2>
            <p className="text-purple-400 text-base font-semibold italic mb-2">
              Your start-to-finish guide
            </p>
            <p className="text-sm text-white/50 max-w-xl mx-auto">
              To becoming the kind of editor who knows what to cut, why it works, and how to turn it into paid work.
            </p>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Left image - changes based on active accordion */}
            <FadeInSection>
              <div className="rounded-xl overflow-hidden aspect-[4/5] relative">
                <AnimatePresence mode="wait">
                  <m.img
                    key={openIndex >= 0 ? openIndex : 0}
                    src={curriculumImages[openIndex >= 0 ? openIndex : 0]}
                    alt="Editing workspace"
                    className="w-full h-full object-cover absolute inset-0"
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    loading="lazy"
                  />
                </AnimatePresence>
              </div>
            </FadeInSection>

            {/* Right accordion */}
            <div className="space-y-0">
              {veCurriculum.map((item, i) => (
                <div key={i} className="border-b border-white/10">
                  <button
                    onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                    className="w-full text-left py-5 flex items-center justify-between gap-4"
                  >
                    <h3 className="text-base md:text-lg font-semibold text-white">{item.title}</h3>
                    {openIndex === i ? (
                      <X className="w-5 h-5 text-white/60 flex-shrink-0" />
                    ) : (
                      <Plus className="w-5 h-5 text-white/60 flex-shrink-0" />
                    )}
                  </button>
                  <AnimatePresence>
                    {openIndex === i && (
                      <m.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <p className="text-sm text-white/50 leading-relaxed pb-5">
                          {item.description}
                        </p>
                      </m.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VECurriculum;
