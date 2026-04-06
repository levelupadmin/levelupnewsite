import FadeInSection from "@/components/FadeInSection";
import { veApplicationSteps } from "@/data/liveVEData";
import { m } from "framer-motion";

const VEApplication = () => (
  <section className="py-20 md:py-28" style={{ background: "hsl(22 14% 4%)" }}>
    <div className="max-w-4xl mx-auto px-6 md:px-12">
      <FadeInSection className="text-center mb-14">
        <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 font-sans-body text-[11px] tracking-[0.2em] uppercase font-semibold mb-6">
          The Process
        </span>
        <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight tracking-tight mb-4">
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
            className="flex items-center gap-5 p-5 rounded-xl border border-border/40 bg-card/30"
          >
            <span className="font-serif-display text-2xl font-bold text-purple-400 min-w-[48px]">
              {step.step}
            </span>
            <p className="font-sans-body text-base text-foreground/90">{step.title}</p>
          </m.div>
        ))}
      </div>
    </div>
  </section>
);

export default VEApplication;
