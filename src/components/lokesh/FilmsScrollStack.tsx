import { useEffect, useRef, useState } from "react";

interface Poster {
  src: string;
  alt: string;
}

interface Props {
  posters: Poster[];
}

/**
 * Scroll-driven films stack — matches Framer's "Learn from the director
 * behind these blockbuster films" interaction.
 *
 * As the user scrolls past the section, each poster slides in from below
 * and lands on top of the previous one. The effect is a deck of cards
 * being dealt face-up onto the table, one per scroll segment.
 *
 * Implementation:
 *   - Outer container is tall (300vh) so we have scroll runway
 *   - Inner content is `position: sticky` so it pins to the viewport
 *     while the user scrolls through the runway
 *   - Each poster has a scroll-progress trigger; as the page scrolls,
 *     transform: translateY(...) animates the poster from below into
 *     the deck position with a slight rotation
 */
export default function FilmsScrollStack({ posters }: Props) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0); // 0 → 1 across the runway

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    let raf = 0;

    const update = () => {
      const rect = el.getBoundingClientRect();
      // start = top of section reaches top of viewport; end = bottom of section reaches top
      // Since the section is taller than viewport, use rect.top relative to runway height.
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const p = Math.max(0, Math.min(1, scrolled / total));
      setProgress(p);
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Each poster has its own "settle point" along the 0→1 progress.
  // Poster 0 is already in place at progress=0; subsequent posters
  // arrive at evenly-spaced thresholds.
  const settlePoints = posters.map((_, i) => (i === 0 ? 0 : i / posters.length));

  return (
    <section
      ref={sectionRef}
      className="relative"
      // Compact runway: 100vh sticky window + 35vh per ADDITIONAL poster
      // (poster 0 is the resting state, so subtract 1). Means a 5-poster
      // deck takes 100 + 4*35 = 240vh — tight enough that the section
      // doesn't feel like it has dead space, while still giving each
      // poster a meaningful scroll trigger.
      style={{ height: `${100 + Math.max(0, posters.length - 1) * 35}vh` }}
    >
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="w-full max-w-[1320px] mx-auto px-5 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* LEFT: text */}
          <div>
            <p className="font-cinzel text-gold text-[22px] md:text-[26px] lg:text-[32px] leading-[1.1] tracking-[0.18em] uppercase font-medium">
              Learn from the
            </p>
            <h2
              className="text-white mt-3 text-[28px] md:text-[40px] lg:text-[52px] leading-[1.05] tracking-[-0.04em] font-semibold"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Director Behind these Blockbuster Films
            </h2>
            <a
              href="https://study.leveluplearning.in/l/c3acf36794"
              target="_blank"
              rel="noopener noreferrer"
              className="buy-pill mt-7 md:mt-9 inline-flex items-center justify-center px-7 py-3 rounded-full text-[14px] md:text-[15px]"
            >
              Buy now at ₹1,499
            </a>
          </div>

          {/* RIGHT: scroll-driven poster deck */}
          <div className="relative aspect-[3/4] max-w-[420px] w-full mx-auto">
            {posters.map((p, i) => {
              const settle = settlePoints[i];
              // Progress local to this poster: 0 = below viewport (offset 100%),
              // 1 = settled in deck position
              const local = i === 0
                ? 1
                : Math.max(0, Math.min(1, (progress - Math.max(0, settle - 0.18)) / 0.18));

              // Each poster lands with a slight rotation/offset for the deck look
              const restRot = [-8, -3, 4, 9][i % 4];
              const restDx = [-28, -10, 14, 28][i % 4];
              const restDy = [12, 6, 4, -2][i % 4];

              const enterY = 80; // travels 80px upward as it lands
              const yOffset = (1 - local) * enterY + restDy;
              const rot = local * restRot;
              const dx = local * restDx;
              const opacity = i === 0 ? 1 : local;

              return (
                <img
                  key={p.src}
                  src={p.src}
                  alt={p.alt}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover rounded-xl ring-1 ring-white/10 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.85)]"
                  style={{
                    transform: `translate(${dx}px, ${yOffset}px) rotate(${rot}deg)`,
                    opacity,
                    zIndex: 10 + i * 10,
                    transition: "transform 0.05s linear, opacity 0.05s linear",
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
