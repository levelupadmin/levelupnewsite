import { useRef, useEffect, useState, useCallback } from "react";

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
  onComplete,
  celebrate = false,
  delay = 0,
}: {
  target: number;
  suffix?: string;
  hasComma?: boolean;
  decimals?: number;
  onComplete?: () => void;
  celebrate?: boolean;
  delay?: number;
}) => {
  const [value, setValue] = useState(0);
  const [done, setDone] = useState(false);
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

          const startAnim = () => {
            const duration = 1800;
            const startTime = performance.now();

            const animate = (currentTime: number) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              setValue(eased * target);

              if (progress < 1) {
                requestAnimationFrame(animate);
              } else {
                setDone(true);
                onComplete?.();
              }
            };

            requestAnimationFrame(animate);
          };

          if (delay > 0) {
            setTimeout(startAnim, delay);
          } else {
            startAnim();
          }
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, delay, onComplete]);

  return (
    <span ref={elRef} className={done && celebrate ? "counter-celebrate inline-block" : undefined}>
      {formatNumber(value, hasComma, decimals)}
      {suffix}
    </span>
  );
};
