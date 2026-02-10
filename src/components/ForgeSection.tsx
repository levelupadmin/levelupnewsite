import { motion } from "framer-motion";
import { ArrowRight, Flame, Users, MapPin } from "lucide-react";
import forgeLogo from "@/assets/forge-logo.png";
import forgeFilmmakingBanner from "@/assets/forge-filmmaking-banner.jpg";
import forgeCreatorsBanner from "@/assets/forge-creators-banner.jpg";
import forgeWritingBanner from "@/assets/forge-writing-banner.jpg";

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
    <section id="forge" aria-label="The Forge residency" className="relative py-12 md:py-16 overflow-hidden bg-background">
      {/* Accent line at top */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{
          background:
            "linear-gradient(90deg, transparent 10%, hsl(var(--accent-forge)) 50%, transparent 90%)",
        }}
      />

      {/* Orange ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 30%, hsl(24 95% 53% / 0.05) 0%, transparent 70%)",
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
            <span className="inline-block font-sans-body text-[10px] md:text-xs tracking-[0.15em] uppercase px-3 py-1 rounded-full border border-primary/30 text-primary bg-primary/5 mb-4"
            >
              In-person Bootcamp
            </span>
            <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-hero-headline leading-[1.15] tracking-tight">
              <img src={forgeLogo} alt="The Forge by LevelUp Learning" className="h-16 md:h-20 lg:h-24 w-auto mb-2" />
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

      {/* ─── Bottom: Forge Program Cards ─── */}
      <div className="max-w-7xl mx-auto px-5 md:px-12 flex flex-col gap-6 md:gap-8">
        {[
          {
            image: forgeFilmmakingBanner,
            title: "Forge Filmmaking",
            subtitle: "12-day bootcamp. Make your own short film.",
            alt: "Forge Filmmaking program",
          },
          {
            image: forgeWritingBanner,
            title: "Forge Writers",
            subtitle: "Immersive retreat for writers and storytellers.",
            alt: "Forge Writers program",
          },
          {
            image: forgeCreatorsBanner,
            title: "Forge Creators",
            subtitle: "Build, collaborate, and ship creative work.",
            alt: "Forge Creators program",
          },
        ].map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative rounded-lg overflow-hidden aspect-[16/9] group"
          >
            <img
              src={card.image}
              alt={card.alt}
              className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
              <h3 className="font-serif-display text-2xl sm:text-3xl md:text-4xl font-medium text-foreground leading-tight">
                {card.title}
              </h3>
              <p className="font-sans-body text-sm md:text-base text-muted-foreground mt-2 max-w-lg">
                {card.subtitle}
              </p>
              <div className="flex gap-3 mt-4 md:mt-6">
                <a
                  href="https://tally.so/r/nPJydd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-primary text-primary-foreground font-sans-body text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  Apply Now
                </a>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md border border-border text-foreground font-sans-body text-sm font-medium hover:bg-accent/10 transition-colors"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ForgeSection;
