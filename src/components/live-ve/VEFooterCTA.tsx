import FadeInSection from "@/components/FadeInSection";
import { VE_CTA_LINK } from "@/data/liveVEData";
import { ArrowRight } from "lucide-react";

const VEFooterCTA = () => (
  <section className="py-20 md:py-28" style={{ background: "hsl(22 14% 5%)" }}>
    <div className="max-w-3xl mx-auto px-6 md:px-12 text-center">
      <FadeInSection>
        <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight tracking-tight mb-6">
          Ready to Become the Editor<br />Everyone Wants to Hire?
        </h2>
        <p className="font-sans-body text-base text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">
          Join India's most exclusive Video Editing cohort. Limited seats per batch.
        </p>
        <a
          href={VE_CTA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-purple-500 text-white font-sans-body text-lg font-semibold tracking-wide transition-all hover:scale-[1.03] hover:shadow-[0_0_30px_hsl(270_70%_55%/0.4)]"
        >
          Request Invite <ArrowRight className="w-5 h-5" />
        </a>
      </FadeInSection>
    </div>
  </section>
);

export default VEFooterCTA;
