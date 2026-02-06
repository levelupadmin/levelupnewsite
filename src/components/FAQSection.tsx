import { motion } from "framer-motion";

const faqs = [
  {
    question: "What is Level Up Learning?",
    answer:
      "Level Up Learning is a streaming platform where you can have access to watch and learn from hundreds of video lessons taught by India's best. Be it filmmaking, singing, writing, cooking, cricket, comedy, acting, photography — even producing independent music. Video lessons are available anytime, anywhere on your smartphone, personal computer, and Smart TV.",
    featured: true,
  },
  {
    question: "What do I get when I access a class?",
    answer:
      "Each class is a learning experience that is around 2–6 hours long, broken down into 20+ video lessons that are 5–10 minutes long on average, along with an in-depth downloadable workbook and exclusive resources. You also get lifetime access to course content, a signed certificate of completion by your instructor, and our exclusive members-only newsletter.",
  },
  {
    question: "Which classes are right for me?",
    answer:
      "Every class has been designed to be accessible for people with little to no experience and advanced students alike. You can find classes that best align with your interests, passion and purpose. With new classes launching regularly, you can also learn practical skills, ignite new passions and expand your knowledge.",
    featured: true,
  },
  {
    question: "Do I have to complete a class within a specific timeframe?",
    answer:
      "No. We believe that everyone learns differently — at different speeds and times. Which is why you can complete the class at your own pace. You can either binge-watch an entire class in a single sitting or watch a lesson a day, without any restriction.",
  },
  {
    question: "Where can I watch these classes?",
    answer:
      "You can access LevelUp Learning across various devices — Mobiles, Tablets, Desktops or Laptops. You can also access classes on mobile by downloading the LevelUp Learning App for Android and iOS devices.",
  },
];

// Subtle tonal variations using HSL shifts within the dark palette
const cardStyles = [
  "bg-[hsl(220_12%_9%)] border-[hsl(220_10%_18%)]",
  "bg-[hsl(225_14%_10%)] border-[hsl(225_12%_18%)]",
  "bg-[hsl(215_10%_8%)] border-[hsl(215_8%_16%)]",
  "bg-[hsl(230_12%_11%)] border-[hsl(230_10%_19%)]",
  "bg-[hsl(218_11%_9%)] border-[hsl(218_9%_17%)]",
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
          Have a different question?{" "}
          <a
            href="https://api.whatsapp.com/send?phone=919791520177&text=Hi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline underline-offset-4 transition-colors"
          >
            Contact us
          </a>
        </motion.p>
      </div>
    </section>
  );
};

export default FAQSection;
