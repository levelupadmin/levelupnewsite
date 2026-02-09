import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

const cues = [
  { value: "57,660+", numericValue: 57660, label: "Learners enrolled", suffix: "+", hasComma: true },
  { value: "4.85", numericValue: 4.85, label: "Rating (15,000+ reviews)", suffix: "", decimals: 2 },
  { value: "6+", numericValue: 6, label: "Masterclasses", suffix: "+" },
  { value: "20+", numericValue: 20, label: "Hours of content", suffix: "+" },
];

function formatNumber(num: number, hasComma?: boolean, decimals?: number): string {
  if (decimals) return num.toFixed(decimals);
  if (hasComma) return Math.floor(num).toLocaleString();
  return Math.floor(num).toString();
}

const AnimatedCounter = ({
  target,
  suffix = "",
  hasComma = false,
  decimals,
  isInView,
}: {
  target: number;
  suffix: string;
  hasComma?: boolean;
  decimals?: number;
  isInView: boolean;
}) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const duration = 1800;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(eased * target);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, target]);

  return (
    <span>
      {formatNumber(value, hasComma, decimals)}
      {suffix}
    </span>
  );
};

const CredibilityCues = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section
      aria-label="Key stats and credibility"
      className="relative py-20 md:py-28"
      style={{
        background: `linear-gradient(to bottom, hsl(220 12% 7%) 0%, hsl(220 8% 15%) 30%, hsl(30 10% 50%) 55%, hsl(35 15% 80%) 80%, hsl(40 20% 96%) 100%)`,
      }}
    >
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        {/* Thin separator — animates width */}
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: 48 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="h-px bg-white/20 mx-auto mb-10 md:mb-12"
        />

        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
          {cues.map((cue, index) => (
            <motion.div
              key={cue.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="text-center"
            >
              <p className="font-serif-display text-2xl md:text-3xl lg:text-4xl font-medium text-white tracking-tight tabular-nums">
                <AnimatedCounter
                  target={cue.numericValue}
                  suffix={cue.suffix}
                  hasComma={cue.hasComma}
                  decimals={cue.decimals}
                  isInView={isInView}
                />
              </p>
              <p className="font-sans-body text-xs md:text-sm text-white/60 mt-2 tracking-wide">
                {cue.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Closing thought */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="font-sans-body text-sm text-white/40 text-center mt-10 md:mt-12 max-w-md mx-auto leading-relaxed"
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
