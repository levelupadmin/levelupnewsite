import { m } from "framer-motion";
import ConcentricRings from "./ConcentricRings";

const tenets = [
  {
    number: "01",
    title: "Focus on the learner and all else will follow.",
    body: "Our focus will always be to deliver the best learner experience possible. We strive to unpack the intangibles of the student experience — building learner choice into courses, using new forms of teaching and adaptive learning tech — taking great care to ensure they ultimately serve you, rather than our own internal goal or bottom line.",
  },
  {
    number: "02",
    title: "It's the teacher that makes the difference. Not the classroom.",
    body: "Our teachers are the heart of LevelUp. Outside of their own home, one of the biggest role models in a young person's life is standing at the front of the classroom. In our classroom, it's not about who's famous or popular — it's about who's the right person to learn from.",
  },
  {
    number: "03",
    title: "Treat 'Impact on Learner' as the North Star Metric.",
    body: "It's not how many learners we have onboard. It's not about how many people finish our learning experience. One class can change your life. One lesson can shift your thinking. What our learners really need is a transformation — from their current reality to their desired reality. We are that shortcut.",
  },
  {
    number: "04",
    title: "Learning Faster, Deeper and Cheaper.",
    body: "There are times in life where a person chooses not to pursue learning because they don't have the time, energy, or simply can't afford it. Our vision is to make learning seem as easy, affordable, and entertaining as watching your favourite show.",
  },
  {
    number: "05",
    title: "Share space in the hearts of our learners, teachers, team and partners.",
    body: "LevelUp is a business with a strong belief that we can make money without doing evil. Every employee, teacher, partner, or learner that crosses paths with us should share the underlying purpose and passion for the problem we're trying to solve.",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
};

const ManifestoSection = () => (
  <section className="py-16 md:py-24 px-6 md:px-12 bg-background relative overflow-hidden">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-gradient-to-r from-transparent via-border to-transparent" />
    <ConcentricRings className="-top-20 -left-24 opacity-40" size={400} count={6} />
    <ConcentricRings className="-bottom-16 -right-20 opacity-30" size={300} count={4} />

    <div className="relative max-w-4xl mx-auto">
      {/* Header */}
      <m.p
        {...fadeUp}
        transition={{ duration: 0.5 }}
        className="font-sans-body text-xs md:text-sm uppercase tracking-[0.2em] text-primary text-center mb-3"
      >
        Our Manifesto
      </m.p>
      <m.h2
        {...fadeUp}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="font-serif-display text-2xl md:text-4xl text-hero-headline text-center mb-4"
      >
        Our goal is simple.
      </m.h2>
      <m.p
        {...fadeUp}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="font-sans-body text-base md:text-lg text-muted-foreground text-center mb-6 max-w-2xl mx-auto leading-relaxed"
      >
        We're on a mission to make learning and pursuing your passion easy, accessible and fun.
      </m.p>
      <m.p
        {...fadeUp}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="font-sans-body text-sm text-muted-foreground/70 text-center mb-14 max-w-xl mx-auto leading-relaxed italic"
      >
        Here are our tenets. From time to time we revisit this list to see if it still holds true. We hope it does — and you can hold us to that.
      </m.p>

      {/* Tenets */}
      <div className="flex flex-col gap-8">
        {tenets.map((t, i) => (
          <m.div
            key={t.number}
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
            className="rounded-xl bg-card p-6 md:p-8 shadow-cinematic border-l-4 border-primary flex gap-5"
          >
            <span className="font-serif-display text-3xl md:text-4xl text-primary/20 leading-none shrink-0">
              {t.number}
            </span>
            <div className="flex flex-col gap-2">
              <h3 className="font-serif-display text-base md:text-lg text-foreground leading-snug">
                {t.title}
              </h3>
              <p className="font-sans-body text-sm text-muted-foreground leading-relaxed">
                {t.body}
              </p>
            </div>
          </m.div>
        ))}
      </div>
    </div>
  </section>
);

export default ManifestoSection;
