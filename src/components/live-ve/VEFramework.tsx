import FadeInSection from "@/components/FadeInSection";
import { veFramework, VE_CTA_LINK } from "@/data/liveVEData";
import { m } from "framer-motion";
import { ArrowRight } from "lucide-react";

const VEFramework = () => (
  <section className="py-20 md:py-28" style={{ background: "hsl(22 14% 4%)" }}>
    <div className="max-w-6xl mx-auto px-6 md:px-12">
      <FadeInSection className="text-center mb-14">
        <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 font-sans-body text-[11px] tracking-[0.2em] uppercase font-semibold mb-6">
          How You'll Learn?
        </span>
        <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight tracking-tight mb-4">
          The Framework
        </h2>
        <p className="font-sans-body text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Here's how we turn you from a curious beginner into a confident, working editor — one step at a time.
        </p>
      </FadeInSection>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {veFramework.map((step, i) => (
          <m.div
            key={step.step}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="rounded-2xl border border-border/40 bg-card/40 overflow-hidden"
          >
            <div className="aspect-[16/9] overflow-hidden">
              <img
                src={step.image}
                alt={step.step}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center font-sans-body text-xs font-bold text-purple-400">
                  {i + 1}
                </span>
                <h3 className="font-serif-display text-xl font-bold text-foreground">{step.step}</h3>
              </div>
              <p className="font-sans-body text-sm text-muted-foreground leading-relaxed">{step.description}</p>
            </div>
          </m.div>
        ))}
      </div>

      <FadeInSection className="text-center">
        <a
          href={VE_CTA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-purple-500 text-white font-sans-body text-sm font-semibold tracking-wide transition-all hover:scale-[1.03] hover:shadow-[0_0_24px_hsl(270_70%_55%/0.35)]"
        >
          Request Invite <ArrowRight className="w-4 h-4" />
        </a>
      </FadeInSection>
    </div>
  </section>
);

export default VEFramework;
