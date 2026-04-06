import FadeInSection from "@/components/FadeInSection";
import { veBrandLogos } from "@/data/liveVEData";

const VEBrands = () => (
  <section className="py-16 md:py-20" style={{ background: "hsl(22 14% 5%)" }}>
    <div className="max-w-6xl mx-auto px-6 md:px-12">
      <FadeInSection className="text-center mb-8">
        <p className="font-sans-body text-sm text-muted-foreground tracking-[0.15em] uppercase mb-2">Brands Our Students work with</p>
      </FadeInSection>

      <FadeInSection delay={100}>
        <div className="overflow-hidden relative">
          <div className="absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-[hsl(22_14%_5%)] to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-[hsl(22_14%_5%)] to-transparent pointer-events-none" />
          <div className="ve-brand-marquee flex gap-6 hover:[animation-play-state:paused]">
            {[...veBrandLogos, ...veBrandLogos].map((logo, i) => (
              <div key={i} className="flex-shrink-0 w-[100px] h-[60px] rounded-lg overflow-hidden bg-card/30 border border-border/20 flex items-center justify-center p-2">
                <img src={logo} alt={`Brand ${(i % veBrandLogos.length) + 1}`} loading="lazy" className="w-full h-full object-contain opacity-70" />
              </div>
            ))}
          </div>
        </div>
      </FadeInSection>

      <FadeInSection className="text-center mt-8" delay={200}>
        <p className="font-sans-body text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          You won't just learn editing, you'll learn how to present your work — that's why our students end up working with real brands straight out of the program.
        </p>
      </FadeInSection>
    </div>

    <style>{`
      .ve-brand-marquee { animation: ve-brand-scroll 30s linear infinite; width: max-content; }
      @keyframes ve-brand-scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
    `}</style>
  </section>
);

export default VEBrands;
