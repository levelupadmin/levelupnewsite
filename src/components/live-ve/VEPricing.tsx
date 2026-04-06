import FadeInSection from "@/components/FadeInSection";
import { vePricing, VE_CTA_LINK } from "@/data/liveVEData";
import { Check } from "lucide-react";

const VEPricing = () => (
  <section className="py-20 md:py-28" style={{ background: "hsl(160 8% 8%)" }}>
    <div className="max-w-xl mx-auto px-6 md:px-12">
      <FadeInSection className="text-center mb-10">
        <p className="text-xs text-white/40 tracking-[0.2em] uppercase mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>🎬 Fee</p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal text-white leading-tight" style={{ fontFamily: "'DM Serif Text', serif" }}>
          Invest in Skills That Pay You Back
        </h2>
      </FadeInSection>

      <FadeInSection delay={100}>
        {/* Main pricing card */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 mb-4">
          <p className="text-purple-400 text-sm font-medium mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>Program Fee:</p>
          <div className="text-5xl md:text-6xl font-bold text-purple-400 mb-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>{vePricing.fee}</div>
          <div className="h-px bg-white/10 mb-4" />
          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-white/70" style={{ fontFamily: "'DM Sans', sans-serif" }}>{vePricing.placement}</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-white/70" style={{ fontFamily: "'DM Sans', sans-serif" }}>{vePricing.emi}</span>
            </div>
          </div>
          <div className="h-px bg-white/10 mb-4" />
          <div className="inline-block px-3 py-1 rounded border border-white/10 bg-white/5 mb-2">
            <span className="text-xs text-white/50" style={{ fontFamily: "'DM Sans', sans-serif" }}>Next Cohort</span>
          </div>
          <div className="text-2xl font-bold text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>{vePricing.nextCohort}</div>
        </div>

        {/* Early bird card */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <p className="text-purple-400 text-lg font-semibold italic mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            🎟️ <em>Early Bird Offer</em>
          </p>
          <p className="text-sm text-white/70 mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            <strong className="text-white">{vePricing.earlyBird.split(" for ")[0]}</strong> for {vePricing.earlyBird.split(" for ")[1]}
          </p>
          <a href={VE_CTA_LINK} target="_blank" rel="noopener noreferrer"
            className="block w-full text-center py-3 rounded-lg text-white text-sm font-medium"
            style={{ background: "linear-gradient(135deg, hsl(270 60% 55%), hsl(280 70% 65%))", fontFamily: "'DM Sans', sans-serif" }}>
            Request Invite
          </a>
        </div>
      </FadeInSection>
    </div>
  </section>
);

export default VEPricing;
