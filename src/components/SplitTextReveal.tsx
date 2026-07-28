import { m } from "framer-motion";

interface SplitTextRevealProps {
  children: string;
  className?: string;
  /** Delay before the first word starts animating */
  startDelay?: number;
  /** Delay between each word */
  stagger?: number;
  /** Whether to trigger on view or immediately */
  triggerOnView?: boolean;
  /** Render function for special words (e.g., italic/colored) */
  renderWord?: (word: string, index: number) => React.ReactNode;
}

const wordVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
  },
};

const SplitTextReveal = ({
  children,
  className = "",
  startDelay = 0.3,
  stagger = 0.08,
  triggerOnView = false,
  renderWord,
}: SplitTextRevealProps) => {
  const words = children.split(" ");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: startDelay,
      },
    },
  };

  return (
    <m.span
      className={`inline ${className}`}
      variants={containerVariants}
      initial="hidden"
      {...(triggerOnView
        ? { whileInView: "visible", viewport: { once: true, margin: "-80px" } }
        : { animate: "visible" })}
    >
      {words.map((word, i) => (
        <m.span
          key={`${word}-${i}`}
          variants={wordVariants}
          transition={{
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="inline-block mr-[0.25em] last:mr-0"
          style={{ willChange: "transform, opacity, filter" }}
        >
          {renderWord ? renderWord(word, i) : word}
        </m.span>
      ))}
    </m.span>
  );
};

export default SplitTextReveal;
