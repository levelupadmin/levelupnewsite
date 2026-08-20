import { useState } from "react";
import FadeInSection from "./FadeInSection";
import { ArrowRight, Minus, Plus } from "lucide-react";

const faqs = [
  {
    question: "What is LevelUp Learning?",
    answer:
      "LevelUp is a creative education ecosystem built for serious creators. It brings together masterclasses, mentor-led live programs, and immersive residencies, all designed to deepen your craft, sharpen your voice, and connect you with a community that cares about the work as much as you do.",
    category: "Ecosystem",
  },
  {
    question: "Who are the masterclasses for?",
    answer:
      "Anyone who wants to learn from working professionals at the top of their craft. Whether you're a filmmaker, editor, writer, or visual storyteller - our masterclasses are built for people who want depth, not shortcuts.",
    category: "Programs",
  },
  {
    question: "How do live programs work?",
    answer:
      "LevelUp Live programs are cohort-based, mentor-led experiences that run over a set number of weeks. You'll work alongside a small group, receive direct feedback from industry mentors, and build real projects throughout the program.",
    category: "Programs",
  },
  {
    question: "What is The Forge?",
    answer:
      "The Forge is our most immersive format - an invite-only, offline creative residency. It's designed for creators ready to go deeper. Think of it as a focused, distraction-free space where your next body of work begins to take shape.",
    category: "Programs",
  },
  {
    question: "Do I need prior experience?",
    answer:
      "It depends on the program. Some masterclasses are accessible to beginners, while live programs and The Forge are better suited for creators with some experience. Each listing clearly notes what level it's designed for.",
    category: "Fit",
  },
  {
    question: "How much does it cost?",
    answer:
      "Pricing varies by format and program. Masterclasses are individually priced, live programs have a cohort fee, and The Forge operates on an application basis. We believe in transparent pricing - you'll always know the cost before committing.",
    category: "Access",
  },
  {
    question: "Can I access content after the program ends?",
    answer:
      "Yes. Masterclass content is available on-demand after purchase. For live programs, recorded sessions and materials remain accessible to you after the cohort wraps.",
    category: "Access",
  },
  {
    question: "How do I get invited to The Forge?",
    answer:
      "The Forge is invite-only, but you can express interest through our site. We look for creators with a clear sense of direction and a genuine commitment to their craft - not credentials or follower counts.",
    category: "Access",
  },
  {
    question: "What kind of support do I get during a program?",
    answer:
      "Every live program includes direct mentor feedback, peer collaboration, and access to our community channels. You're never learning in isolation - the experience is built around dialogue and shared growth.",
    category: "Support",
  },
  {
    question: "Do you offer certificates?",
    answer:
      "Yes. All masterclasses and live programs come with a signed certificate of completion from your instructor. It's a recognition of the work you've put in - not just attendance.",
    category: "Support",
  },
  {
    question: "Can I gift a masterclass to someone?",
    answer:
      "Absolutely. Gifting is available for all masterclasses. It's a thoughtful way to support a creator you believe in - whether they're just starting out or deep in their journey.",
    category: "Access",
  },
  {
    question: "Is there a community I can join?",
    answer:
      "Yes. When you enrol in any program, you become part of the LevelUp community, a network of serious creators across disciplines. It's a space for honest feedback, collaboration, and long-term creative relationships.",
    category: "Support",
  },
];

const categories = ["All", "Programs", "Access", "Support", "Fit"];

const FAQSection = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [openIndex, setOpenIndex] = useState(0);
  const visibleFaqs = activeCategory === "All" ? faqs : faqs.filter((faq) => faq.category === activeCategory);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section id="faq" aria-label="Frequently asked questions" className="relative scroll-mt-24 overflow-hidden bg-[hsl(19_17%_5%)] py-16 md:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(249,112,21,0.10),transparent_40%),linear-gradient(to_bottom,transparent,rgba(249,112,21,0.05))]" />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-6 md:px-12 lg:grid-cols-[0.82fr_1.18fr]">
        <FadeInSection className="lg:sticky lg:top-28 lg:self-start">
          <p className="font-sans-body text-xs font-semibold uppercase text-primary" style={{ letterSpacing: 0 }}>
            Before you jump in
          </p>
          <h2 className="mt-4 max-w-xl font-serif-display text-4xl font-semibold text-white sm:text-5xl md:text-6xl" style={{ lineHeight: 1.02, letterSpacing: 0 }}>
            The questions people ask right before they begin.
          </h2>
          <p className="mt-5 max-w-md font-sans-body text-sm leading-relaxed text-white/55 md:text-base" style={{ letterSpacing: 0 }}>
            Clear answers for the formats, access, support, and expectations across LevelUp.
          </p>

          <div className="mt-7 flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => {
                  setActiveCategory(category);
                  setOpenIndex(0);
                }}
                aria-pressed={activeCategory === category}
                className={`rounded-full border px-4 py-2 font-sans-body text-sm transition-colors duration-300 ${
                  activeCategory === category
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-white/10 text-white/55 hover:border-primary/35 hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </FadeInSection>

        <FadeInSection delay={120}>
          <div className="overflow-hidden rounded-lg border border-white/10 bg-white/[0.025]">
            {visibleFaqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div key={faq.question} className="border-b border-white/10 last:border-b-0">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    aria-expanded={isOpen}
                    className="group flex w-full items-start justify-between gap-5 p-5 text-left transition-colors duration-300 hover:bg-white/[0.035] md:p-6"
                  >
                    <span>
                      <span className="font-sans-body text-[11px] uppercase text-primary/70" style={{ letterSpacing: 0 }}>
                        {faq.category}
                      </span>
                      <span className="mt-1 block font-serif-display text-xl font-semibold text-white md:text-2xl" style={{ letterSpacing: 0 }}>
                        {faq.question}
                      </span>
                    </span>
                    <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/50 transition-colors duration-300 group-hover:text-primary">
                      {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </span>
                  </button>
                  <div className={`grid transition-all duration-500 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                    <div className="overflow-hidden">
                      <p className="px-5 pb-6 font-sans-body text-sm leading-relaxed text-white/58 md:px-6 md:text-base" style={{ letterSpacing: 0 }}>
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-5 flex flex-col gap-4 rounded-lg border border-white/10 bg-white/[0.025] p-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-sans-body text-sm text-white/55" style={{ letterSpacing: 0 }}>
              Still have questions?
            </p>
            <a
              href="mailto:admin@leveluplearning.in"
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-5 py-2.5 font-sans-body text-sm text-white transition-colors duration-300 hover:border-primary/40 hover:text-primary"
            >
              Reach out to us
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};

export default FAQSection;
