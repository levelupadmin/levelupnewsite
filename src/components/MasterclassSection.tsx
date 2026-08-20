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

const masterclasses = [
  {
    image: karthikImg,
    name: "Karthik Subbaraj",
    descriptor: "Storytelling to editing to working with actors",
    format: "Filmmaker",
    category: "Filmmaking",
    href: "/masterclass/karthik-subbaraj",
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
    href: "/masterclass/drk-kiran",
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
];

const MasterclassCard = ({ mc, featured = false }: { mc: typeof masterclasses[0]; featured?: boolean }) => {
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
      className="group relative block cursor-pointer transition-transform duration-500 ease-out"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ willChange: 'transform' }}
    >
      <div className={`relative overflow-hidden rounded-sm bg-card shadow-md transition-shadow duration-500 group-hover:shadow-[0_0_20px_2px_hsl(38_75%_55%/0.35)] ${featured ? "aspect-[5/4] md:aspect-[16/10]" : "aspect-[3/4]"}`}>
        <Picture
          src={mc.image}
          alt={`Portrait of ${mc.name}, ${mc.format} at LevelUp Learning`}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          loading="lazy"
          decoding="async"
        />
        {featured && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
        )}
        <div className="absolute inset-0 rounded-sm ring-1 ring-inset ring-white/0 group-hover:ring-primary/40 transition-all duration-500 pointer-events-none" />
        {featured && (
          <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7">
            <p className="font-sans-body text-[11px] uppercase text-primary" style={{ letterSpacing: 0 }}>
              {mc.category} · {mc.format}
            </p>
            <h3 className="mt-2 font-serif-display text-3xl font-semibold leading-tight text-white md:text-5xl" style={{ letterSpacing: 0 }}>
              {mc.name}
            </h3>
            <p className="mt-3 max-w-sm font-sans-body text-sm leading-relaxed text-white/64" style={{ letterSpacing: 0 }}>
              {mc.descriptor}
            </p>
          </div>
        )}
      </div>
      <div className={`${featured ? "hidden" : "mt-3 flex"} items-start justify-between gap-3`}>
        <div>
          <p className="font-sans-body text-[11px] uppercase text-primary/75" style={{ letterSpacing: 0 }}>
            {mc.category} · {mc.format}
          </p>
          <h3 className="mt-1 font-serif-display text-base font-semibold leading-tight text-foreground md:text-lg" style={{ letterSpacing: 0 }}>
            {mc.name}
          </h3>
          <p className="mt-1 line-clamp-2 font-sans-body text-xs leading-relaxed text-muted-foreground md:text-sm" style={{ letterSpacing: 0 }}>
            {mc.descriptor}
          </p>
        </div>
        <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-all duration-300 group-hover:translate-x-1 group-hover:text-primary" />
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
    <div className="mt-3">
      <p className="font-sans-body text-[11px] uppercase text-primary/75" style={{ letterSpacing: 0 }}>
        New mentor
      </p>
      <h3 className="mt-1 font-serif-display text-base font-semibold leading-tight text-foreground md:text-lg" style={{ letterSpacing: 0 }}>
        Coming Soon
      </h3>
      <p className="mt-1 font-sans-body text-xs leading-relaxed text-muted-foreground md:text-sm" style={{ letterSpacing: 0 }}>
        New masterclass dropping soon.
      </p>
    </div>
  </div>
);

const MasterclassSection = () => {
  return (
    <section id="masterclasses" aria-label="Masterclasses" className="relative scroll-mt-24 bg-background py-16 md:py-24">
      <AccentLine />

      {/* Subtle top glow */}
      <div
        className="absolute top-0 left-0 right-0 h-64 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, hsl(38 75% 55% / 0.03) 0%, transparent 70%)",
        }}
      />

      <FadeInSection className="mx-auto mb-10 flex max-w-7xl flex-col gap-5 px-6 md:mb-14 md:flex-row md:items-end md:justify-between md:px-12" delay={80}>
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1.5 font-sans-body text-[11px] uppercase text-primary/80" style={{ letterSpacing: 0 }}>
            On-Demand Masterclasses
          </span>
          <h2 className="mt-5 max-w-4xl font-serif-display text-[2.4rem] font-semibold text-hero-headline sm:text-5xl md:text-6xl" style={{ lineHeight: 1.04, letterSpacing: 0 }}>
             <span>India's greatest creative minds.</span>{" "}
             <em className="not-italic font-normal text-gradient-amber">Now your mentors.</em>
          </h2>
        </div>
        <p className="max-w-sm font-sans-body text-sm leading-relaxed text-hero-subtext md:text-base" style={{ letterSpacing: 0 }}>
          Cinematic, in-depth courses you can start today and revisit forever.
        </p>
      </FadeInSection>

      {/* Masterclass cards — grid layout */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 gap-x-5 gap-y-9 md:grid-cols-6 md:gap-x-6 md:gap-y-11">
          {masterclasses.map((mc, i) => (
            <FadeInSection
              key={mc.name}
              delay={i * 80}
              className={i < 2 ? "col-span-2 md:col-span-3" : "col-span-1 md:col-span-2"}
            >
              <MasterclassCard mc={mc} featured={i < 2} />
            </FadeInSection>
          ))}
          <FadeInSection delay={masterclasses.length * 80} className="col-span-2 md:col-span-2">
            <ComingSoonCard />
          </FadeInSection>
        </div>
      </div>

      <FadeInSection delay={500} className="mx-auto mt-10 flex max-w-7xl px-6 md:px-12">
        <a
          href="#live-programs"
          onClick={() => trackCTAClick("masterclass", "Continue to Live Programs")}
          className="group inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 font-sans-body text-sm text-foreground transition-colors duration-300 hover:border-primary/40 hover:text-primary"
        >
          Continue to live cohorts
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      </FadeInSection>
    </section>
  );
};

export default MasterclassSection;
