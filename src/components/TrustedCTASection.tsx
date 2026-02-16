import nelsonImg from "@/assets/nelson-dilipkumar.png";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const teachers = [
  {
    name: "Karthik Subbaraj",
    image: "https://cdn.prod.website-files.com/649fbe7d7f61c6fc912e1d33/650c1be5224f49f6432aaae6_1.Karthik_Subburaj%20course%20banner.png",
  },
  {
    name: "Anthony Gonsalvez",
    image: "https://cdn.prod.website-files.com/649fbe7d7f61c6fc912e1d33/64f60ddd91f67b7db8f6716b_3.Anthony_Gonsalvez.png",
  },
  {
    name: "G Venket Ram",
    image: "https://cdn.prod.website-files.com/649fbe7d7f61c6fc912e1d33/64f2f14d67e5504737c57ea5_2.Venket_Ram.png",
  },
  {
    name: "DRK Kiran",
    image: "https://cdn.prod.website-files.com/649fbe7d7f61c6fc912e1d33/64b79ef6d61b238747788c6c_kiran%20website%201.webp",
  },
  {
    name: "Ravi Basrur",
    image: "https://cdn.prod.website-files.com/649fbe7d7f61c6fc912e1d33/64b79ef642421ae3cbe004d9_ravi%20website%201.webp",
  },
  {
    name: "Lokesh Kanagaraj",
    image: "https://cdn.prod.website-files.com/649fbe7d7f61c6fc912e1d33/6899f2de01c2b6f380973a82_Frame%20191%20LK.png",
  },
  {
    name: "Nelson Dilipkumar",
    image: nelsonImg,
  },
];


const TrustedCTASection = () => {
  return (
    <section className="relative py-12 md:py-16 px-6 md:px-12 overflow-hidden">
      {/* Amber accent line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent" />

      {/* Radial amber glow */}
      <div className="absolute inset-0 bg-gradient-amber-glow pointer-events-none" />

      <div className="relative max-w-4xl mx-auto flex flex-col items-center text-center gap-8">
        {/* Teacher avatars */}
        <div className="flex items-center justify-center">
          {teachers.map((teacher, i) => (
            <div
              key={teacher.name}
              className="relative w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-background ring-1 ring-border"
              style={{ marginLeft: i === 0 ? 0 : "-0.5rem", zIndex: teachers.length - i }}
            >
              <img
                src={teacher.image}
                alt={teacher.name}
                className="w-full h-full object-cover object-top"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* Headline */}
        <h2 className="font-serif-display text-2xl md:text-4xl lg:text-5xl text-hero-headline leading-tight">
          Trusted by{" "}
          <em className="text-gradient-amber not-italic">India's best</em>
        </h2>

        {/* Subline */}
        <p className="font-sans-body text-hero-subtext text-sm md:text-base max-w-xl leading-relaxed">
          It's time for you to take the leap.
        </p>

        {/* CTA */}
        <a href="#masterclasses">
          <Button
            size="lg"
            className="cta-sweep cta-glow rounded-sm gap-2 text-sm font-sans-body"
          >
            Explore Programs
            <ArrowRight className="w-4 h-4" />
          </Button>
        </a>
      </div>
    </section>
  );
};

export default TrustedCTASection;
