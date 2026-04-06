import FadeInSection from "@/components/FadeInSection";
import { veApplicationSteps } from "@/data/liveVEData";
import { m } from "framer-motion";

const VEApplication = () => (
  <section className="py-20 md:py-28" style={{ background: "hsl(160 8% 6%)" }}>
    <div className="max-w-4xl mx-auto px-6 md:px-12">
      <FadeInSection className="text-center mb-14">
        <p className="text-xs text-white/40 tracking-[0.2em] uppercase mb-4">🎬 The Process</p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal text-white leading-tight">
          How to Apply?
        </h2>
      </FadeInSection>

      <div className="space-y-4">
        {veApplicationSteps.map((step, i) => (
          <m.div
            key={step.step}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="flex items-center gap-5 p-5 rounded-xl border border-white/10 bg-white/[0.03]"
          >
            <span className="text-2xl font-bold text-purple-400 min-w-[48px]">
              {step.step}
            </span>
            <p className="text-base text-white/80">{step.title}</p>
          </m.div>
        ))}
      </div>
    </div>
  </section>
);

export default VEApplication;
