import { useRef, useEffect, useState } from "react";

function formatNumber(
  num: number,
  hasComma?: boolean,
  decimals?: number
): string {
  if (decimals) return num.toFixed(decimals);
  if (hasComma) return Math.floor(num).toLocaleString();
  return Math.floor(num).toString();
}

export const AnimatedCounter = ({
  target,
  suffix = "",
  hasComma = false,
  decimals,
}: {
  target: number;
  suffix?: string;
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
