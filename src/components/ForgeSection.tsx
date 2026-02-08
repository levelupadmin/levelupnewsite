import { motion } from "framer-motion";
import { ArrowRight, Flame, Users, MapPin } from "lucide-react";
import ForgeCarousel from "./ForgeCarousel";

const featurePoints = [
  {
    Icon: Flame,
    headline: "Pressure that transforms",
    description:
      "Not comfort. Not theory. Real creative intensity, shoulder to shoulder.",
  },
  {
    Icon: Users,
    headline: "Mentorship without filters",
    description:
      "Work directly with creators who've shaped the industry. No layers between you and the work.",
  },
  {
    Icon: MapPin,
    headline: "Offline. Immersive. Real.",
    description:
      "Step away from screens. Live, create, and break through — together, in one place.",
  },
];

const stats = [
  { value: "7", label: "Cities" },
  { value: "11", label: "Editions" },
  { value: "248", label: "Shortfilms" },
];


const ForgeSection = () => {
  return (
    <section id="forge" className="relative py-12 md:py-16 overflow-hidden" style={{ background: "hsl(var(--bg-forge))" }}>
      {/* Ember accent line at top */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{
          background:
            "linear-gradient(90deg, transparent 10%, hsl(var(--accent-forge)) 50%, transparent 90%)",
        }}
      />

      {/* Ember ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 30%, hsl(15 65% 48% / 0.07) 0%, transparent 70%)",
        }}
      />

      {/* Grain texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      {/* ─── Top: Split Two-Column Layout ─── */}
      <div className="max-w-7xl mx-auto px-5 md:px-12 mb-10 md:mb-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start">
          {/* Left Column — Text Block with horizontal reveal */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Format tag */}
            <span className="inline-block font-sans-body text-[10px] md:text-xs tracking-[0.15em] uppercase px-3 py-1 rounded-full border mb-4"
              style={{ borderColor: "hsl(15 60% 45% / 0.3)", color: "hsl(15 60% 55%)", background: "hsl(15 60% 45% / 0.05)" }}
            >
              In-person Bootcamp
            </span>
            <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-hero-headline leading-[1.15] tracking-tight">
              <span className="font-sans-body text-xs md:text-sm tracking-[0.2em] uppercase text-primary block mb-2">Forge</span>
              <span className="text-muted-foreground font-sans-body text-[10px] md:text-xs tracking-[0.15em] uppercase block mb-4">by LevelUp</span>
              Where you{" "}
              <em className="italic font-normal text-primary">become</em>
            </h2>
            <p className="font-sans-body text-sm md:text-base text-hero-subtext mt-4 md:mt-6 max-w-md leading-relaxed">
              A filmmaking bootcamp for aspiring filmmakers, writers, creators, and
              storytellers — where in 12 days we teach you filmmaking hands-on and
              you create your very own short film.
            </p>

            {/* Stats row */}
            <div className="flex gap-8 md:gap-10 mt-6 md:mt-8">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-serif-display text-2xl md:text-3xl font-medium text-hero-headline">
                    {stat.value}
                  </p>
                  <p className="font-sans-body text-xs text-muted-foreground mt-1 tracking-wide">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column — Feature Points */}
          <div className="flex flex-col gap-6 md:gap-10 md:pt-2">
            {featurePoints.map((point, index) => (
              <motion.div
                key={point.headline}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.8,
                  delay: 0.15 + index * 0.12,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className="flex gap-4 items-start"
              >
                <div className="flex-shrink-0 mt-1">
                  <point.Icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-serif-display text-base md:text-lg font-medium text-hero-headline leading-snug">
                    {point.headline}
                  </h3>
                  <p className="font-sans-body text-xs md:text-sm text-muted-foreground mt-1 leading-relaxed max-w-sm">
                    {point.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Bottom: Forge Retreat Carousel ─── */}
      <div className="max-w-7xl mx-auto px-5 md:px-12">
        <ForgeCarousel />
      </div>

      {/* Quiet CTA */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-center mt-10 md:mt-14"
      >
        <a
          href="https://tally.so/r/nPJydd"
          target="_blank"
          rel="noopener noreferrer"
          
          className="group inline-flex items-center gap-3 font-sans-body text-sm text-muted-foreground hover:text-foreground transition-colors duration-400"
        >
          Request an Invite
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      </motion.div>
    </section>
  );
};

export default ForgeSection;
