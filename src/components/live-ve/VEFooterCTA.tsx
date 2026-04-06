import FadeInSection from "@/components/FadeInSection";
import { VE_CTA_LINK } from "@/data/liveVEData";

const VEFooterCTA = () => (
  <section className="py-20 md:py-28" style={{ background: "hsl(160 8% 6%)" }}>
    <div className="max-w-3xl mx-auto px-6 md:px-12 text-center">
      <FadeInSection>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal text-white leading-tight tracking-tight mb-6" style={{ fontFamily: "'DM Serif Text', serif" }}>
          Ready to Become the Editor<br />Everyone Wants to Hire?
        </h2>
        <p className="text-sm text-white/50 max-w-xl mx-auto mb-10 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Join India's most exclusive Video Editing cohort. Limited seats per batch.
        </p>
        <a
          href={VE_CTA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-10 py-4 rounded-lg text-white text-base font-medium"
          style={{ background: "linear-gradient(135deg, hsl(270 60% 55%), hsl(280 70% 65%))", fontFamily: "'DM Sans', sans-serif" }}
        >
          Request Invite
        </a>
      </FadeInSection>
    </div>
  </section>
);

export default VEFooterCTA;
