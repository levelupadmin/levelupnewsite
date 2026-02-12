import { useRef, useEffect, useState } from "react";

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
}: {
  target: number;
  suffix: string;
  hasComma?: boolean;
  decimals?: number;
}) => {
  const [value, setValue] = useState(0);
  const hasAnimated = useRef(false);
  const elRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          observer.disconnect();

          const duration = 1800;
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(eased * target);

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={elRef}>
      {formatNumber(value, hasComma, decimals)}
      {suffix}
    </span>
  );
};

const CredibilityCues = () => {
  return (
    <section
      aria-label="Key stats and credibility"
      className="relative pt-20 pb-12 md:pt-28 md:pb-16"
      style={{
        background: `linear-gradient(to bottom, hsl(220 12% 7%) 0%, hsl(0 0% 4%) 100%)`,
      }}
    >
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
          {cues.map((cue) => (
            <div key={cue.label} className="text-center">
              <p className="font-serif-display text-2xl md:text-3xl lg:text-4xl font-medium text-white tracking-tight tabular-nums">
                <AnimatedCounter
                  target={cue.numericValue}
                  suffix={cue.suffix}
                  hasComma={cue.hasComma}
                  decimals={cue.decimals}
                />
              </p>
              <p className="font-sans-body text-xs md:text-sm text-white/60 mt-2 tracking-wide">
                {cue.label}
              </p>
            </div>
          ))}
        </div>

        <p className="font-sans-body text-sm text-white/40 text-center mt-10 md:mt-12 max-w-md mx-auto leading-relaxed">
          From masterclasses to residencies, from community to career —
          <br className="hidden md:block" />
          every layer designed for the serious creator.
        </p>
      </div>
    </section>
  );
};

export default CredibilityCues;
