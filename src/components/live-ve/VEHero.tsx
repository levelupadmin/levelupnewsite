import { m } from "framer-motion";

const VEHero = () => (
  <section className="pt-8 pb-4 px-4 md:px-8" style={{ background: "hsl(160 8% 8%)" }}>
    <div className="max-w-[1400px] mx-auto">
      <div className="relative rounded-2xl overflow-hidden min-h-[85vh] flex items-center border border-white/10"
        style={{ background: "linear-gradient(135deg, hsl(260 20% 12%) 0%, hsl(220 15% 8%) 50%, hsl(0 0% 6%) 100%)" }}
      >
        {/* Subtle purple radial glow */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 50% at 70% 30%, hsl(270 40% 20% / 0.3), transparent 70%)" }}
        />

        <div className="relative z-10 px-10 md:px-16 lg:px-20 max-w-4xl">
          <m.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white/50 text-base md:text-lg mb-6 italic"
          >
            LevelUp Learning
          </m.p>

          <m.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-white leading-[1.1] tracking-tight"
          >
            India's Largest Filmmaking Learning Community
          </m.h1>
        </div>
      </div>
    </div>
  </section>
);

export default VEHero;
