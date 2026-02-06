import { motion } from "framer-motion";
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
];

const FAQSection = () => {
  return (
    <section className="relative bg-background py-12 md:py-16">
      {/* Ambient glow */}
      <div className="absolute inset-0 bg-gradient-amber-glow pointer-events-none" />

      <div className="relative max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {/* Thin separator */}
          <div className="w-12 h-px bg-border mx-auto mb-10 md:mb-12" />

          {/* Headline */}
          <h2 className="font-serif-display text-3xl md:text-4xl lg:text-5xl text-center text-foreground mb-10 md:mb-12">
            Frequently asked questions
          </h2>

          {/* Accordion */}
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-b border-border"
              >
                <AccordionTrigger className="font-serif-display text-base md:text-lg text-foreground hover:no-underline py-5 md:py-6 text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="font-sans-body text-sm md:text-base text-muted-foreground leading-relaxed pb-5 md:pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Soft CTA */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-10 md:mt-14 font-sans-body text-sm text-muted-foreground"
          >
            Still have questions?{" "}
            <a
              href="mailto:hello@leveluplearning.com"
              className="text-primary hover:underline underline-offset-4 transition-colors"
            >
              Reach out to us
            </a>
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
