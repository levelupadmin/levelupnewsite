import FadeInSection from "@/components/FadeInSection";
import { vePricing, VE_CTA_LINK } from "@/data/liveVEData";
import { ArrowRight, Calendar, Gift, CreditCard, ShieldCheck } from "lucide-react";

const VEPricing = () => (
  <section className="py-20 md:py-28" style={{ background: "hsl(22 14% 5%)" }}>
    <div className="max-w-3xl mx-auto px-6 md:px-12">
      <FadeInSection className="text-center mb-10">
        <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 font-sans-body text-[11px] tracking-[0.2em] uppercase font-semibold mb-6">
          Fee
        </span>
        <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight tracking-tight">
          Invest in Skills That Pay You Back
        </h2>
      </FadeInSection>

      <FadeInSection delay={100}>
        <div className="rounded-2xl border border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-transparent p-8 md:p-10 text-center">
          <p className="font-sans-body text-sm text-muted-foreground mb-2">Program Fee:</p>
          <div className="font-serif-display text-5xl md:text-6xl font-bold text-foreground mb-6">{vePricing.fee}</div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <ShieldCheck className="w-4 h-4 text-purple-400" />
              <span>{vePricing.placement}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CreditCard className="w-4 h-4 text-purple-400" />
              <span>{vePricing.emi}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card/50 border border-border/30">
              <Calendar className="w-4 h-4 text-purple-400" />
              <span className="font-sans-body text-sm text-foreground">Next Cohort: <strong>{vePricing.nextCohort}</strong></span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500/10 border border-green-500/20">
              <Gift className="w-4 h-4 text-green-400" />
              <span className="font-sans-body text-sm text-green-300">{vePricing.earlyBird}</span>
            </div>
          </div>

          <a
            href={VE_CTA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-purple-500 text-white font-sans-body text-base font-semibold tracking-wide transition-all hover:scale-[1.03] hover:shadow-[0_0_30px_hsl(270_70%_55%/0.4)]"
          >
            Request Invite <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </FadeInSection>
    </div>
  </section>
);

export default VEPricing;
