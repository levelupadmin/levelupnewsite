import { m } from "framer-motion";
import FadeInSection from "@/components/FadeInSection";
import { veMentorCreators, veMentorCards, VE_CTA_LINK } from "@/data/liveVEData";
import { ArrowRight } from "lucide-react";

const VEMentors = () => (
  <section className="py-20 md:py-28 relative overflow-hidden" style={{ background: "hsl(22 14% 5%)" }}>
    <div className="max-w-6xl mx-auto px-6 md:px-12">
      <FadeInSection className="text-center mb-12">
        <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight tracking-tight mb-4">
          Learn from Mentors Who've Worked<br />
          <span className="text-purple-400">with Your Favourite Creators & Films!</span>
        </h2>
      </FadeInSection>

      {/* Creator highlight cards */}
      <FadeInSection className="mb-14" delay={100}>
        <div className="grid grid-cols-3 gap-4 md:gap-6 max-w-2xl mx-auto">
          {veMentorCreators.map((creator, i) => (
            <m.div
              key={creator.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="aspect-[2/3] rounded-xl overflow-hidden mb-3 border border-border/30">
                <img
                  src={creator.image}
                  alt={creator.name}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-sans-body text-sm font-semibold text-foreground">{creator.name}</h3>
              <p className="font-sans-body text-xs text-muted-foreground">{creator.role}</p>
            </m.div>
          ))}
        </div>
      </FadeInSection>

      {/* Mentor grid */}
      <FadeInSection className="mb-10" delay={200}>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
          {veMentorCards.map((img, i) => (
            <div key={i} className="aspect-[2/3] rounded-lg overflow-hidden border border-border/20">
              <img src={img} alt={`Mentor ${i + 1}`} loading="lazy" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </FadeInSection>

      <FadeInSection className="text-center mb-8" delay={250}>
        <p className="font-sans-body text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Taught by <strong className="text-foreground">Viral Social Media Editors</strong>,{" "}
          <strong className="text-foreground">National Award-Winning Filmmaker</strong>,
          and a <strong className="text-foreground">DaVinci Resolve Certified Colorist</strong> — all in one program.
        </p>
      </FadeInSection>

      <FadeInSection className="text-center" delay={300}>
        <a
          href={VE_CTA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-purple-500 text-white font-sans-body text-sm font-semibold tracking-wide transition-all hover:scale-[1.03] hover:shadow-[0_0_24px_hsl(270_70%_55%/0.35)]"
        >
          Request Invite
          <ArrowRight className="w-4 h-4" />
        </a>
      </FadeInSection>
    </div>
  </section>
);

export default VEMentors;
