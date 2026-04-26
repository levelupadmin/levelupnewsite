import FadeInSection from "@/components/FadeInSection";
import { Picture } from "@/components/Picture";
import { veBrandLogos } from "@/data/liveVEData";

const VEBrands = () => (
  <section className="py-16 md:py-24" style={{ background: "hsl(160 8% 8%)" }}>
    <div className="max-w-[1200px] mx-auto px-6 md:px-12">
      <FadeInSection className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal leading-tight">
          <span className="bg-gradient-to-r from-purple-400 to-purple-300 bg-clip-text text-transparent">
            Brands Our Students
          </span>{" "}
          <span className="text-white">work with</span>
        </h2>
      </FadeInSection>

      <FadeInSection delay={100}>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
          {veBrandLogos.map((logo, i) => (
            <div key={i} className="aspect-[16/10] rounded-lg overflow-hidden bg-[#191a1a] border border-white/5 flex items-center justify-center p-4" style={{ boxShadow: 'none' }}>
              <Picture src={logo} alt={`Brand ${i + 1}`} loading="lazy" className="w-full h-full object-contain opacity-70 grayscale" style={{ background: '#191a1a', boxShadow: 'none' }} />
            </div>
          ))}
        </div>
      </FadeInSection>

      <FadeInSection className="text-center mt-10" delay={200}>
        <p className="text-sm text-white/50 max-w-2xl mx-auto leading-relaxed">
          You won't just learn editing, you'll learn how to present your work — that's why our students end up working with real brands straight out of the program.
        </p>
      </FadeInSection>
    </div>
  </section>
);

export default VEBrands;
