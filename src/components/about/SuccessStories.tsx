import { m } from "framer-motion";
import { ArrowRight } from "lucide-react";

const stories = [
  {
    name: "Chetan Chaudhary",
    before: "Aspiring Director",
    after: "Directed his first feature film",
    quote: "LevelUp gave me the roadmap and the network I didn't know existed.",
  },
  {
    name: "Bishall Paul",
    before: "Stuck Writer",
    after: "Amazon bestselling author",
    quote: "The mentorship changed everything. I went from blank pages to a bestseller.",
  },
  {
    name: "Kiruba Shankar",
    before: "800 views on YouTube",
    after: "500K+ viral reels",
    quote: "I learned how to think like a creator, not just post content.",
  },
  {
    name: "Sneha Patil",
    before: "No job offers",
    after: "Placed at Swiggy",
    quote: "The portfolio I built during the program got me hired in weeks.",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
};

const SuccessStories = () => (
  <section className="py-12 md:py-16 px-6 md:px-12 bg-background relative">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-gradient-to-r from-transparent via-border to-transparent" />

    <div className="max-w-7xl mx-auto">
      <m.p
        {...fadeUp}
        transition={{ duration: 0.5 }}
        className="font-sans-body text-xs md:text-sm uppercase tracking-[0.2em] text-primary text-center mb-3"
      >
        Success Stories
      </m.p>
      <m.h2
        {...fadeUp}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="font-serif-display text-2xl md:text-3xl text-hero-headline text-center mb-10"
      >
        Real transformations, real careers
      </m.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {stories.map((s, i) => (
          <m.div
            key={s.name}
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
            className="rounded-xl bg-card p-6 flex flex-col gap-4 shadow-cinematic border-t-4 border-primary relative overflow-hidden"
          >
            {/* Decorative quote mark */}
            <span className="absolute top-3 right-4 font-serif-display text-6xl text-primary/10 leading-none select-none pointer-events-none">"</span>

            <p className="font-sans-body text-sm text-muted-foreground italic leading-relaxed relative z-10">
              "{s.quote}"
            </p>
            <div className="flex items-center gap-2 mt-auto">
              <span className="font-serif-display text-sm text-foreground">{s.name}</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="bg-muted px-2 py-0.5 rounded-full text-muted-foreground">{s.before}</span>
              <ArrowRight className="w-3 h-3 text-primary" />
              <span className="bg-primary/10 px-2 py-0.5 rounded-full text-primary font-medium">{s.after}</span>
            </div>
          </m.div>
        ))}
      </div>
    </div>
  </section>
);

export default SuccessStories;
