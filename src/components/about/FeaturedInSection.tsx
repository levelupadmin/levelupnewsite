import { m } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import outlookLogo from "@/assets/press/outlook-india.png";
import quintLogo from "@/assets/press/the-quint.png";
import yourstoryLogo from "@/assets/press/yourstory.png";
import abnLogo from "@/assets/press/abn-telugu.png";
import theHinduLogo from "@/assets/press/the-hindu.png";
import mc1 from "@/assets/masterclass-1.jpg";

const pressLogos = [
  { name: "Outlook India", src: outlookLogo },
  { name: "The Quint", src: quintLogo },
  { name: "YourStory", src: yourstoryLogo },
  { name: "ABN", src: abnLogo },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
};

const FeaturedInSection = () => (
  <section className="py-12 md:py-16 px-6 md:px-12 bg-background">
    <div className="max-w-5xl mx-auto flex flex-col items-center gap-10">
      <m.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-xs md:text-sm text-muted-foreground/60 uppercase tracking-widest"
      >
        Featured in
      </m.p>

      {/* Spotlight article */}
      <m.a
        href="https://www.thehindu.com/entertainment/movies/now-an-online-platform-to-learn-from-the-film-experts/article65227053.ece"
        target="_blank"
        rel="noopener noreferrer"
        {...fadeUp}
        transition={{ duration: 0.6 }}
        className="group w-full rounded-xl bg-card shadow-cinematic overflow-hidden border border-border/50 hover:border-primary/30 transition-colors duration-300 block"
      >
        <div className="flex flex-col md:flex-row">
          {/* Article image */}
          <div className="relative md:w-[280px] h-48 md:h-auto shrink-0 overflow-hidden">
            <img
              src={mc1}
              alt="Karthik Subbaraj featured in The Hindu"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card/20 hidden md:block" />
          </div>

          {/* Article content */}
          <div className="flex-1 p-6 md:p-8 flex flex-col justify-center gap-4">
            <div className="flex items-center gap-3">
              <img
                src={theHinduLogo}
                alt="The Hindu"
                className="h-5 md:h-6 w-auto object-contain opacity-80"
              />
              <span className="text-[10px] md:text-xs text-muted-foreground/50 uppercase tracking-wider">
                March 2022
              </span>
            </div>

            <h3 className="font-serif-display text-lg md:text-xl text-foreground leading-snug group-hover:text-primary transition-colors duration-300">
              "Now, an online platform to learn from the film experts"
            </h3>

            <p className="font-sans-body text-sm text-muted-foreground leading-relaxed line-clamp-3">
              How Rahul Srinivas and team put together LevelUp Learning, an online streaming platform that currently offers courses on filmmaking, music composition and others — featured in The Hindu's Entertainment section.
            </p>

            <span className="inline-flex items-center gap-1.5 text-xs font-sans-body text-primary group-hover:gap-2.5 transition-all duration-300">
              Read the full article
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </m.a>

      {/* Press logos row */}
      <m.div
        {...fadeUp}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="rounded-xl bg-card shadow-cinematic px-8 py-6 flex flex-wrap items-center justify-center gap-8 md:gap-12"
      >
        {pressLogos.map((logo) => (
          <img
            key={logo.name}
            src={logo.src}
            alt={logo.name}
            className="h-7 md:h-8 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
            loading="lazy"
          />
        ))}
      </m.div>
    </div>
  </section>
);

export default FeaturedInSection;
