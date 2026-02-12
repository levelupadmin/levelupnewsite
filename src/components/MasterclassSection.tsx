import { ArrowRight } from "lucide-react";
import nelsonImg from "@/assets/nelson-dilipkumar.png";
import comingSoonImg from "@/assets/coming-soon-silhouette.jpg";

const masterclasses = [
  {
    image: "https://cdn.prod.website-files.com/649fbe7d7f61c6fc912e1d33/650c1be5224f49f6432aaae6_1.Karthik_Subburaj%20course%20banner.png",
    name: "Karthik Subbaraj",
    descriptor: "Storytelling to editing to working with actors",
    format: "Filmmaker",
    category: "Filmmaking",
    href: "https://masterclass.leveluplearning.in/karthik-subbaraj",
  },
  {
    image: "https://cdn.prod.website-files.com/649fbe7d7f61c6fc912e1d33/64f60ddd91f67b7db8f6716b_3.Anthony_Gonsalvez.png",
    name: "Anthony Gonsalvez",
    descriptor: "An all-out practical editing experience",
    format: "Film Editor",
    category: "Editing",
    href: "https://masterclass.leveluplearning.in/anthony",
  },
  {
    image: "https://cdn.prod.website-files.com/649fbe7d7f61c6fc912e1d33/64f2f14d67e5504737c57ea5_2.Venket_Ram.png",
    name: "G Venket Ram",
    descriptor: "Capturing the perfect image through diverse case studies",
    format: "Photographer",
    category: "Photography",
    href: "https://masterclass.leveluplearning.in/g-venket-ram",
  },
  {
    image: "https://cdn.prod.website-files.com/649fbe7d7f61c6fc912e1d33/64b79ef6d61b238747788c6c_kiran%20website%201.webp",
    name: "DRK Kiran",
    descriptor: "Set designing, creative problem-solving, and miniatures",
    format: "Art Director",
    category: "Art Direction",
    href: "https://masterclass.leveluplearning.in/kiran",
  },
  {
    image: "https://cdn.prod.website-files.com/649fbe7d7f61c6fc912e1d33/64b79ef642421ae3cbe004d9_ravi%20website%201.webp",
    name: "Ravi Basrur",
    descriptor: "From the village of Basrur to revolutionizing Sandalwood music",
    format: "Music Director",
    category: "Music",
    href: "https://masterclass.leveluplearning.in/ravi-basrur",
  },
  {
    image: "https://cdn.prod.website-files.com/649fbe7d7f61c6fc912e1d33/6899f2de01c2b6f380973a82_Frame%20191%20LK.png",
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
  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(600px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) scale(1.02)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.transform = '';
  };

  return (
    <a
      href={mc.href}
      target="_blank"
      rel="noopener noreferrer"
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
    <div className="relative aspect-[3/4] overflow-hidden rounded-sm shadow-md transition-shadow duration-500 group-hover:shadow-[0_0_20px_2px_hsl(38_75%_55%/0.35)]">
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
      {/* Amber accent line at top */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{
          background:
            "linear-gradient(90deg, transparent 10%, hsl(38 75% 55% / 0.5) 50%, transparent 90%)",
        }}
      />

      {/* Subtle top glow */}
      <div
        className="absolute top-0 left-0 right-0 h-64 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, hsl(38 75% 55% / 0.03) 0%, transparent 70%)",
        }}
      />

      {/* Section headline */}
      <div className="text-center px-6 md:px-12 mb-8 md:mb-10">
        <span className="inline-block font-sans-body text-[10px] md:text-xs tracking-[0.15em] uppercase px-3 py-1 rounded-full border border-primary/30 text-primary bg-primary/5 mb-4">
          On-demand
        </span>
        <h2 className="font-serif-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-hero-headline leading-[1.2] tracking-tight">
          Learn from the ones{" "}
          <em className="italic font-normal text-primary">who shaped the craft</em>
        </h2>
        <p className="font-sans-body text-sm md:text-base text-hero-subtext mt-5 md:mt-6 max-w-lg mx-auto leading-relaxed">
          High quality pre-recorded courses taught by India's finest.
        </p>
      </div>

      {/* Masterclass cards — grid layout */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-6">
          {masterclasses.map((mc) => (
            <MasterclassCard key={mc.name} mc={mc} />
          ))}
          <ComingSoonCard />
        </div>
      </div>

      {/* Soft CTA */}
      <div className="text-center mt-10 md:mt-14">
        <a
          href="https://masterclass.leveluplearning.in/"
          target="_blank"
          rel="noopener noreferrer"
          className="cta-underline group inline-flex items-center gap-3 font-sans-body text-sm text-muted-foreground hover:text-foreground transition-colors duration-400"
        >
          Explore the full library
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      </div>
    </section>
  );
};

export default MasterclassSection;
