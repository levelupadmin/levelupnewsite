import FadeInSection from "@/components/FadeInSection";
import { veStudentWorkImages } from "@/data/liveVEData";
import { m } from "framer-motion";

const VEStudentWork = () => (
  <section className="py-20 md:py-28" style={{ background: "hsl(160 8% 8%)" }}>
    <div className="max-w-[1400px] mx-auto px-6 md:px-8">
      <FadeInSection className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal text-white leading-tight mb-4" style={{ fontFamily: "'DM Serif Text', serif" }}>
          Our<br />Students Work
        </h2>
        <p className="text-sm text-white/50 max-w-xl mx-auto" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          From Reels to short films, this is the kind of work our students leave the program with.
        </p>
      </FadeInSection>

      <FadeInSection delay={100}>
        <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-3">
          {veStudentWorkImages.map((img, i) => (
            <m.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="mb-3 rounded-xl overflow-hidden border border-white/10 break-inside-avoid"
            >
              <img
                src={img}
                alt={`Student work ${i + 1}`}
                loading="lazy"
                className="w-full h-auto object-cover"
                style={{ aspectRatio: i % 3 === 0 ? "3/4" : i % 3 === 1 ? "4/5" : "1/1" }}
              />
            </m.div>
          ))}
        </div>
      </FadeInSection>
    </div>
  </section>
);

export default VEStudentWork;
