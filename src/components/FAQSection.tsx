import { motion } from "framer-motion";

const faqs = [
  {
    question: "What is LevelUp Learning?",
    answer:
      "LevelUp is a creative education ecosystem built for serious creators. It brings together masterclasses, mentor-led live programs, and immersive residencies — all designed to deepen your craft, sharpen your voice, and connect you with a community that cares about the work as much as you do.",
    featured: true,
  },
  {
    question: "Who are the masterclasses for?",
    answer:
      "Anyone who wants to learn from working professionals at the top of their craft. Whether you're a filmmaker, editor, writer, or visual storyteller — our masterclasses are built for people who want depth, not shortcuts.",
  },
  {
    question: "How do live programs work?",
    answer:
      "LevelUp Live programs are cohort-based, mentor-led experiences that run over a set number of weeks. You'll work alongside a small group, receive direct feedback from industry mentors, and build real projects throughout the program.",
  },
  {
    question: "What is The Forge?",
    answer:
      "The Forge is our most immersive format — an invite-only, offline creative residency. It's designed for creators ready to go deeper. Think of it as a focused, distraction-free space where your next body of work begins to take shape.",
    featured: true,
  },
  {
    question: "Do I need prior experience?",
    answer:
      "It depends on the program. Some masterclasses are accessible to beginners, while live programs and The Forge are better suited for creators with some experience. Each listing clearly notes what level it's designed for.",
  },
  {
    question: "How much does it cost?",
    answer:
      "Pricing varies by format and program. Masterclasses are individually priced, live programs have a cohort fee, and The Forge operates on an application basis. We believe in transparent pricing — you'll always know the cost before committing.",
  },
  {
    question: "Can I access content after the program ends?",
    answer:
      "Yes. Masterclass content is available on-demand after purchase. For live programs, recorded sessions and materials remain accessible to you after the cohort wraps.",
  },
  {
    question: "How do I get invited to The Forge?",
    answer:
      "The Forge is invite-only, but you can express interest through our site. We look for creators with a clear sense of direction and a genuine commitment to their craft — not credentials or follower counts.",
  },
];

// Subtle tonal variations using HSL shifts within the dark palette
const cardStyles = [
  "bg-[hsl(220_12%_9%)] border-[hsl(220_10%_18%)]",        // base card
  "bg-[hsl(225_14%_10%)] border-[hsl(225_12%_18%)]",        // cool shift
  "bg-[hsl(215_10%_8%)] border-[hsl(215_8%_16%)]",          // deeper
  "bg-[hsl(230_12%_11%)] border-[hsl(230_10%_19%)]",        // blue-tinted
  "bg-[hsl(218_11%_9%)] border-[hsl(218_9%_17%)]",          // neutral-cool
  "bg-[hsl(222_13%_10%)] border-[hsl(222_11%_18%)]",        // mid
  "bg-[hsl(216_10%_8.5%)] border-[hsl(216_8%_16.5%)]",      // subtle deep
  "bg-[hsl(228_12%_10.5%)] border-[hsl(228_10%_18.5%)]",    // cool-mid
];

// Featured cards get a warm amber-tinted background
const featuredStyle = "bg-[hsl(35_12%_10%)] border-[hsl(38_15%_18%)]";

const FAQSection = () => {
  return (
    <section className="relative bg-background py-12 md:py-16">
      {/* Ambient glow */}
      <div className="absolute inset-0 bg-gradient-amber-glow pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="font-serif-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-10 md:mb-12"
        >
          Frequently asked questions
        </motion.h2>

        {/* Bento Card Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
                delay: index * 0.06,
              }}
              className={`break-inside-avoid mb-5 rounded-lg border p-6 md:p-7 ${
                faq.featured ? featuredStyle : cardStyles[index % cardStyles.length]
              }`}
            >
              <h3
                className={`font-serif-display text-foreground mb-3 ${
                  faq.featured
                    ? "text-lg md:text-xl"
                    : "text-base md:text-lg"
                }`}
              >
                {faq.question}
              </h3>
              <p className="font-sans-body text-sm md:text-base text-muted-foreground leading-relaxed">
                {faq.answer}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Soft CTA */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 md:mt-14 font-sans-body text-sm text-muted-foreground"
        >
          Still have questions?{" "}
          <a
            href="mailto:hello@leveluplearning.com"
            className="text-primary hover:underline underline-offset-4 transition-colors"
          >
            Reach out to us
          </a>
        </motion.p>
      </div>
    </section>
  );
};

export default FAQSection;
