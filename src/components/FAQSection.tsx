import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is LevelUp Learning?",
    answer:
      "LevelUp is a creative education ecosystem built for serious creators. It brings together masterclasses, mentor-led live programs, and immersive residencies — all designed to deepen your craft, sharpen your voice, and connect you with a community that cares about the work as much as you do.",
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

const FAQSection = () => {
  return (
    <section id="faq" aria-label="Frequently asked questions" className="relative py-12 md:py-16">
      <div className="relative max-w-3xl mx-auto px-5 md:px-6">
        <h2 className="font-serif-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-10 md:mb-12">
          Frequently asked questions
        </h2>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`faq-${index}`} className="border-border">
              <AccordionTrigger className="font-sans-body text-base md:text-lg font-semibold text-foreground hover:no-underline py-5">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="font-sans-body text-sm md:text-base text-muted-foreground leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <p className="mt-10 md:mt-14 font-sans-body text-sm text-muted-foreground">
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
