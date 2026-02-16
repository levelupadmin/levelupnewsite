import { m } from "framer-motion";
import outlookLogo from "@/assets/press/outlook-india.png";
import quintLogo from "@/assets/press/the-quint.png";
import yourstoryLogo from "@/assets/press/yourstory.png";
import abnLogo from "@/assets/press/abn-telugu.png";

const pressLogos = [
  { name: "Outlook India", src: outlookLogo },
  { name: "The Quint", src: quintLogo },
  { name: "YourStory", src: yourstoryLogo },
  { name: "ABN", src: abnLogo },
];

const FeaturedInSection = () => (
  <section className="py-12 md:py-16 px-6 md:px-12 bg-background">
    <div className="max-w-7xl mx-auto flex flex-col items-center gap-8">
      <m.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-xs md:text-sm text-muted-foreground/60 uppercase tracking-widest"
      >
        Featured in
      </m.p>
      <div className="rounded-xl bg-card shadow-cinematic px-8 py-6 flex flex-wrap items-center justify-center gap-8 md:gap-12">
        {pressLogos.map((logo) => (
          <img
            key={logo.name}
            src={logo.src}
            alt={logo.name}
            className="h-7 md:h-8 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
            loading="lazy"
          />
        ))}
      </div>
    </div>
  </section>
);

export default FeaturedInSection;
