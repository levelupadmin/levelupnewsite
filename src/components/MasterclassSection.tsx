import { useRef } from "react";
import { Link } from "react-router-dom";
import AccentLine from "./AccentLine";
import { ArrowRight } from "lucide-react";
import { trackCTAClick } from "@/lib/clarity";
import FadeInSection, { useScrollReveal } from "./FadeInSection";
import nelsonImg from "@/assets/nelson-dilipkumar.jpg";
import comingSoonImg from "@/assets/coming-soon-silhouette.jpg";
import karthikImg from "@/assets/karthik-subbaraj-masterclass.png";
import anthonyImg from "@/assets/anthony-gonsalvez-masterclass.png";
import venketImg from "@/assets/venket-ram.png";
import kiranImg from "@/assets/drk-kiran.webp";
import raviImg from "@/assets/ravi-basrur.webp";
import lokeshImg from "@/assets/lokesh-kanagaraj.png";

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
    image: anthonyImg,
    name: "Anthony Gonsalvez",
    descriptor: "An all-out practical editing experience",
    format: "Film Editor",
    category: "Editing",
    href: "https://masterclass.leveluplearning.in/anthony",
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
    image: kiranImg,
    name: "DRK Kiran",
    descriptor: "Set designing, creative problem-solving, and miniatures",
    format: "Art Director",
    category: "Art Direction",
    href: "https://masterclass.leveluplearning.in/kiran",
  },
  {
    image: raviImg,
    name: "Ravi Basrur",
    descriptor: "From the village of Basrur to revolutionizing Sandalwood music",
    format: "Music Director",
    category: "Music",
    href: "https://masterclass.leveluplearning.in/ravi-basrur",
  },
  {
    image: lokeshImg,
    name: "Lokesh Kanagaraj",
    descriptor: "The art and craft of filmmaking",
    format: "Filmmaker",
    category: "Filmmaking",
    href: "https://masterclass.leveluplearning.in/lokesh-kanagaraj",
  },
  {
    image: nelsonImg,
    name: "Nelson Dilipkumar",
    descriptor: "The art of commercial filmmaking",
    format: "Filmmaker",
    category: "Filmmaking",
    href: "https://masterclass.leveluplearning.in/nelson-dilipkumar",
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

  return (
    <a
      href={mc.href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackCTAClick("masterclass", mc.name)}
      className="group relative cursor-pointer block transition-transform duration-500 ease-out"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ willChange: 'transform' }}
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-card shadow-md transition-shadow duration-500 group-hover:shadow-[0_0_20px_2px_hsl(38_75%_55%/0.35)]">
        <img
          src={mc.image}
          alt={`${mc.name} — ${mc.descriptor}`}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 rounded-sm ring-1 ring-inset ring-white/0 group-hover:ring-primary/40 transition-all duration-500 pointer-events-none" />
      </div>
    </a>
  );
};

const ComingSoonCard = () => (
  <div className="group relative block">
    <div className="relative aspect-[3/4] overflow-hidden rounded-sm shadow-md transition-shadow duration-500 group-hover:shadow-[0_0_20px_2px_hsl(38_75%_55%/0.35)]" style={{ backgroundColor: "#1C1208" }}>
      <img
        src={comingSoonImg}
        alt="Coming soon masterclass"
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

      {/* Section tag */}
      <FadeInSection className="text-center px-6 md:px-12 mb-4">
        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-[11px] tracking-[0.18em] uppercase font-sans-body text-primary/80">
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
