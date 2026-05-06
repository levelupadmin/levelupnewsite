import { useRef } from "react";
import { Link } from "react-router-dom";
import AccentLine from "./AccentLine";
import { ArrowRight } from "lucide-react";
import { trackCTAClick } from "@/lib/clarity";
import FadeInSection, { useScrollReveal } from "./FadeInSection";
import { Picture } from "./Picture";
import nelsonImg from "@/assets/nelson-dilipkumar.jpg";
import comingSoonImg from "@/assets/coming-soon-silhouette.jpg";
import karthikImg from "@/assets/karthik-subbaraj-masterclass.png";
import anthonyImg from "@/assets/anthony-gonsalvez-masterclass.png";
import venketImg from "@/assets/venket-ram.png";
import kiranImg from "@/assets/drk-kiran.webp";
import raviImg from "@/assets/ravi-basrur.webp";
import lokeshImg from "@/assets/lokesh-kanagaraj.png";

// Order specified by Rahul: Karthik → Lokesh → Nelson → Ravi → G Venket Ram
// → Anthony → DRK. Coming-soon card gets appended at the end (in render).
const masterclasses = [
  {
    image: karthikImg,
    name: "Karthik Subbaraj",
    descriptor: "Storytelling to editing to working with actors",
    format: "Filmmaker",
    category: "Filmmaking",
    href: "https://masterclass.leveluplearning.in/karthik-subbaraj",
  },
  {
    image: lokeshImg,
    name: "Lokesh Kanagaraj",
    descriptor: "The art and craft of filmmaking",
    format: "Filmmaker",
    category: "Filmmaking",
    href: "/masterclass/lokesh-kanagaraj",
  },
  {
    image: nelsonImg,
    name: "Nelson Dilipkumar",
    descriptor: "The art of commercial filmmaking",
    format: "Filmmaker",
    category: "Filmmaking",
    href: "/masterclass/nelson-dilipkumar",
  },
  {
    image: raviImg,
    name: "Ravi Basrur",
    descriptor: "From the village of Basrur to revolutionizing Sandalwood music",
    format: "Music Director",
    category: "Music",
    href: "/masterclass/ravi-basrur",
  },
  {
    image: venketImg,
    name: "G Venket Ram",
    descriptor: "Capturing the perfect image through diverse case studies",
    format: "Photographer",
    category: "Photography",
    href: "/masterclass/g-venket-ram",
  },
  {
    image: anthonyImg,
    name: "Anthony Gonsalvez",
    descriptor: "An all-out practical editing experience",
    format: "Film Editor",
    category: "Editing",
    href: "/masterclass/anthony-gonsalvez",
  },
  {
    image: kiranImg,
    name: "DRK Kiran",
    descriptor: "Set designing, creative problem-solving, and miniatures",
    format: "Art Director",
    category: "Art Direction",
    href: "/masterclass/drk-kiran",
  },
];

const MasterclassCard = ({ mc }: { mc: typeof masterclasses[0] }) => {
  const rafId = useRef<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (rafId.current) return;
    const card = e.currentTarget;
    const clientX = e.clientX;
    const clientY = e.clientY;
    rafId.current = requestAnimationFrame(() => {
      const rect = card.getBoundingClientRect();
      const x = (clientX - rect.left) / rect.width - 0.5;
      const y = (clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(600px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) scale(1.02)`;
      rafId.current = null;
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (rafId.current) { cancelAnimationFrame(rafId.current); rafId.current = null; }
    e.currentTarget.style.transform = '';
  };

  const isInternal = mc.href.startsWith("/");
  const Wrapper = isInternal ? Link : "a";
  const linkProps = isInternal
    ? { to: mc.href }
    : { href: mc.href, target: "_blank" as const, rel: "noopener noreferrer" };

  return (
    <Wrapper
      {...(linkProps as any)}
      onClick={() => trackCTAClick("masterclass", mc.name)}
      className="group relative cursor-pointer block transition-transform duration-500 ease-out"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ willChange: 'transform' }}
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-card shadow-md transition-shadow duration-500 group-hover:shadow-[0_0_20px_2px_hsl(38_75%_55%/0.35)]">
        <Picture
          src={mc.image}
          alt={`Portrait of ${mc.name}, ${mc.format} at LevelUp Learning`}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 rounded-sm ring-1 ring-inset ring-white/0 group-hover:ring-primary/40 transition-all duration-500 pointer-events-none" />
      </div>
    </Wrapper>
  );
};

const ComingSoonCard = () => (
  <div className="group relative block">
    <div className="relative aspect-[3/4] overflow-hidden rounded-sm shadow-md transition-shadow duration-500 group-hover:shadow-[0_0_20px_2px_hsl(38_75%_55%/0.35)]" style={{ backgroundColor: "#1C1208" }}>
      <Picture
        src={comingSoonImg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-60"
        loading="lazy"
        decoding="async"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <span className="font-serif-display text-lg md:text-xl font-medium text-white/80 leading-tight">
          Coming Soon
        </span>
        <p className="font-sans-body text-xs text-white/50 mt-2 leading-relaxed">
          New masterclass dropping soon
        </p>
      </div>
    </div>
  </div>
);

const MasterclassSection = () => {
  return (
    <section id="masterclasses" aria-label="Masterclasses" className="relative bg-background py-12 md:py-16">
      <AccentLine />

      {/* Subtle top glow */}
      <div
        className="absolute top-0 left-0 right-0 h-64 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, hsl(38 75% 55% / 0.03) 0%, transparent 70%)",
        }}
      />

      {/* Animated divider above the On-Demand pill — gold gradient sweep
          like the masterclass why-is-this glowing center line. The keyframes
          live in src/styles/global.css; the inline style is a fallback. */}
      <div
        className="relative mx-auto mb-8 md:mb-10 h-px max-w-[480px] md:max-w-[640px] overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(212,163,108,0.15) 15%, rgba(212,163,108,0.6) 35%, rgba(245,213,154,0.85) 50%, rgba(212,163,108,0.6) 65%, rgba(212,163,108,0.15) 85%, transparent 100%)",
            boxShadow:
              "0 0 12px rgba(212,163,108,0.55), 0 0 24px rgba(212,163,108,0.25)",
          }}
        />
        <div
          className="absolute top-0 bottom-0 w-1/3"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,222,179,0.95), transparent)",
            animation: "mc-divider-sweep 3.6s ease-in-out infinite",
          }}
        />
      </div>

      {/* Section tag — pulsing gold border to signal it's the masterclass section */}
      <FadeInSection className="text-center px-6 md:px-12 mb-4">
        <span
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-[11px] tracking-[0.18em] uppercase font-sans-body text-primary/90"
          style={{ animation: "mc-pill-glow 2.8s ease-in-out infinite" }}
        >
          On-Demand Masterclasses
        </span>
      </FadeInSection>

      {/* Section headline */}
      <FadeInSection className="text-center px-6 md:px-12 mb-10 md:mb-14" delay={80}>
        <h2 className="font-serif-display text-[1.6rem] sm:text-4xl md:text-5xl lg:text-6xl font-medium text-hero-headline tracking-[-0.03em] max-w-3xl mx-auto" style={{ lineHeight: 1.15 }}>
           <span>India's greatest creative minds.</span>{' '}
           <em className="not-italic font-normal text-gradient-amber">Now your mentors.</em>
        </h2>
        <p className="font-sans-body text-sm md:text-base text-hero-subtext mt-5 md:mt-7 max-w-md mx-auto leading-relaxed tracking-[0.015em]">
          Cinematic, in-depth courses you can start today and revisit forever.
        </p>
      </FadeInSection>

      {/* Masterclass cards — grid layout */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-6">
          {masterclasses.map((mc, i) => (
            <FadeInSection key={mc.name} delay={i * 80}>
              <MasterclassCard mc={mc} />
            </FadeInSection>
          ))}
          <FadeInSection delay={masterclasses.length * 80}>
            <ComingSoonCard />
          </FadeInSection>
        </div>
      </div>

      {/* Soft CTA */}
    </section>
  );
};

export default MasterclassSection;
