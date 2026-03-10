import FadeInSection from "./FadeInSection";

const faqs = [
  {
    question: "What is LevelUp Learning?",
    answer:
      "LevelUp is a creative education ecosystem built for serious creators. It brings together masterclasses, mentor-led live programs, and immersive residencies, all designed to deepen your craft, sharpen your voice, and connect you with a community that cares about the work as much as you do.",
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
  {
    question: "What kind of support do I get during a program?",
    answer:
      "Every live program includes direct mentor feedback, peer collaboration, and access to our community channels. You're never learning in isolation — the experience is built around dialogue and shared growth.",
  },
  {
    question: "Do you offer certificates?",
    answer:
      "Yes. All masterclasses and live programs come with a signed certificate of completion from your instructor. It's a recognition of the work you've put in — not just attendance.",
    featured: true,
  },
  {
    question: "Can I gift a masterclass to someone?",
    answer:
      "Absolutely. Gifting is available for all masterclasses. It's a thoughtful way to support a creator you believe in — whether they're just starting out or deep in their journey.",
  },
  {
    question: "Is there a community I can join?",
    answer:
      "Yes. When you enrol in any program, you become part of the LevelUp community — a network of serious creators across disciplines. It's a space for honest feedback, collaboration, and long-term creative relationships.",
  },
];

const cardStyles = [
  "bg-card border-border",
  "bg-[hsl(0_0%_9%)] border-border",
  "bg-card border-border",
  "bg-[hsl(0_0%_9%)] border-border",
  "bg-card border-border",
  "bg-[hsl(0_0%_9%)] border-border",
  "bg-card border-border",
  "bg-[hsl(0_0%_9%)] border-border",
];

const featuredStyle = "bg-[hsl(24_10%_8%)] border-primary/20";

const FAQSection = () => {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };

  return (
    <section id="faq" aria-label="Frequently asked questions" className="relative py-12 md:py-16 overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {/* Warm gradient overlay at the bottom */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[80%]"
        style={{
          background: "linear-gradient(to bottom, transparent 0%, hsl(24 20% 8%) 40%, hsl(20 30% 7%) 70%, hsl(18 35% 6%) 100%)",
        }}
        aria-hidden="true"
      />
      <div className="relative max-w-6xl mx-auto px-5 md:px-6">
        <FadeInSection>
          <h2 className="font-serif-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-10 md:mb-12 text-center">
            Frequently asked questions
          </h2>
        </FadeInSection>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5">
          {faqs.map((faq, index) => (
            <FadeInSection
              key={index}
              delay={index * 50}
              className={`break-inside-avoid mb-5 rounded-sm border border-l-2 border-l-transparent p-6 md:p-7 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_0_20px_2px_hsl(38_75%_55%/0.12)] hover:border-l-primary ${
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
            </FadeInSection>
          ))}
        </div>

        <p className="mt-10 md:mt-14 font-sans-body text-sm text-muted-foreground text-center">
          Still have questions?{" "}
          <a
            href="mailto:hello@leveluplearning.com"
            className="text-primary hover:underline underline-offset-4 transition-colors"
          >
            Reach out to us
          </a>
        </p>
      </div>
    </section>
  );
};

export default FAQSection;
