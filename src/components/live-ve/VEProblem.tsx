import FadeInSection from "@/components/FadeInSection";
import { veProblemPoints, veAdvantages, VE_CTA_LINK } from "@/data/liveVEData";
import { ArrowRight, AlertTriangle } from "lucide-react";
import { m } from "framer-motion";

const VEProblem = () => (
  <section className="py-20 md:py-28" style={{ background: "hsl(22 14% 4%)" }}>
    <div className="max-w-6xl mx-auto px-6 md:px-12">
      {/* Problem */}
      <FadeInSection className="text-center mb-16">
        <span className="inline-block px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 font-sans-body text-[11px] tracking-[0.2em] uppercase font-semibold mb-6">
          The Problem
        </span>
        <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight tracking-tight mb-6">
          The Reason You're Not Growing as an Editor?
        </h2>
        <p className="font-sans-body text-base text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          You keep watching tutorials but never finish real projects. You see 22-year-old editors making ₹60,000/month and wonder "Why not me?"
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {veProblemPoints.map((point, i) => (
            <m.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-2 px-5 py-3 rounded-xl border border-red-500/20 bg-red-500/5"
            >
              <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0" />
              <span className="font-sans-body text-sm text-foreground/80">{point}</span>
            </m.div>
          ))}
        </div>
      </FadeInSection>

      {/* Advantages */}
      <FadeInSection className="mb-12">
        <h3 className="font-serif-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground text-center mb-12 tracking-tight">
          The Unfair Advantage To Change That
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {veAdvantages.map((adv, i) => (
            <m.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="p-6 rounded-2xl border border-border/40 bg-card/40 text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-xl overflow-hidden">
                <img src={adv.icon} alt={adv.title} loading="lazy" className="w-full h-full object-cover" />
              </div>
              <h4 className="font-sans-body text-base font-semibold text-foreground mb-2">{adv.title}</h4>
              <p className="font-sans-body text-sm text-muted-foreground leading-relaxed">{adv.description}</p>
            </m.div>
          ))}
        </div>
      </FadeInSection>

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

export default VEProblem;
