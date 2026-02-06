import { motion } from "framer-motion";

const cues = [
  { value: "50,000+", label: "Creators learning" },
  { value: "120+", label: "Masterclasses" },
  { value: "35+", label: "Industry mentors" },
  { value: "12", label: "Cities reached" },
];

const CredibilityCues = () => {
  return (
    <section className="relative bg-background py-12 md:py-16">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        {/* Thin separator */}
        <div className="w-12 h-px bg-border mx-auto mb-10 md:mb-12" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
          {cues.map((cue, index) => (
            <motion.div
              key={cue.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <p className="font-serif-display text-2xl md:text-3xl lg:text-4xl font-medium text-cue-value tracking-tight">
                {cue.value}
              </p>
              <p className="font-sans-body text-xs md:text-sm text-cue mt-2 tracking-wide">
                {cue.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Closing thought */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="font-sans-body text-sm text-muted-foreground text-center mt-10 md:mt-12 max-w-md mx-auto leading-relaxed"
        >
          From masterclasses to residencies, from community to career —
          <br className="hidden md:block" />
          every layer designed for the serious creator.
        </motion.p>
      </div>
    </section>
  );
};

export default CredibilityCues;
