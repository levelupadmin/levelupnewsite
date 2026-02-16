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
    <div className="max-w-7xl mx-auto flex flex-col items-center gap-6">
      <m.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-xs md:text-sm text-muted-foreground/60 uppercase tracking-widest"
      >
        Featured in
      </m.p>
      <div className="flex flex-wrap items-center justify-center gap-5 md:gap-8">
        {pressLogos.map((logo) => (
          <img
            key={logo.name}
            src={logo.src}
            alt={logo.name}
            className="h-4 md:h-5 w-auto object-contain opacity-50 grayscale"
            loading="lazy"
          />
        ))}
      </div>
    </div>
  </section>
);

export default FeaturedInSection;
