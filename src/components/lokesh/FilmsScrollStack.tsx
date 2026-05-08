import { useEffect, useRef, useState } from "react";

interface Poster {
  src: string;
  alt: string;
}

// Spring-ish settle: linear for the first 95% of the scroll arc, then
// a soft overshoot via cubic-bezier-like ease for the last 5%. The
// audit flagged the previous 0.05s linear for the entire arc as
// "algorithmic" — the new curve gives the deck a tactile "land" beat.
function easeSettle(local: number) {
  if (local >= 0.95) {
    // Last 5%: simulate spring overshoot in [0.95, 1.05] then back to 1
    const t = (local - 0.95) / 0.05; // 0 → 1
    // Cubic bezier (0.34, 1.56, 0.64, 1) approx via simple formula
    const overshoot = 1.56;
    return 0.95 + (1 - 0.95) * (1 + overshoot * Math.pow(t - 1, 3) + overshoot * Math.pow(t - 1, 2));
  }
  return local;
}

interface Props {
  posters: Poster[];
  /** Optional eyebrow above the heading. Defaults to "Learn from the". */
  eyebrow?: string;
  /** Heading text. Defaults to "Director Behind these Blockbuster Films". */
  heading?: string;
  /** Below-heading line — film names + box-office anchor. */
  subline?: string;
  /** Smaller caption underneath the subline (e.g. "5 films · ₹1,500 crore · 6 years"). */
  caption?: string;
  /** CTA text + link */
  ctaLabel?: string;
  ctaHref?: string;
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
export default function FilmsScrollStack({
  posters,
  eyebrow = "Learn from the",
  heading = "Director Behind these Blockbuster Films",
  subline = "Maanagaram. Kaithi. Master. Vikram. Leo.",
  caption = "5 films · ₹1,500 crore box office · 6 years.",
  ctaLabel = "Sign Up Now ₹1,499",
  ctaHref = "https://study.leveluplearning.in/l/c3acf36794",
}: Props) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0); // 0 → 1 across the runway
  // prefers-reduced-motion: skip scroll-driven animation entirely and
  // render the deck at its rest position (progress = 1).
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (reducedMotion) {
      setProgress(1);
      return;
    }
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
  }, [reducedMotion]);

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
          {/* LEFT: text + concrete film list (CRO P0 — gives the user
              the verifiable box-office anchor instead of generic copy). */}
          <div>
            <p className="font-cinzel text-gold text-[22px] md:text-[26px] lg:text-[32px] leading-[1.1] tracking-[0.18em] uppercase font-medium">
              {eyebrow}
            </p>
            <h2
              className="text-white mt-3 text-[28px] md:text-[40px] lg:text-[52px] leading-[1.05] tracking-[-0.04em] font-semibold"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {heading}
            </h2>
            <p className="mt-5 md:mt-6 text-[15px] md:text-[17px] text-white/80 leading-relaxed">
              <span className="font-semibold text-white">{subline}</span>
              <br />
              <span className="text-white/70">{caption}</span>
            </p>
            <a
              href={ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="buy-pill mt-7 md:mt-9 inline-flex items-center justify-center px-7 py-3 rounded-full text-[14px] md:text-[15px]"
            >
              {ctaLabel}
            </a>
          </div>

          {/* RIGHT: scroll-driven poster deck */}
          <div className="relative aspect-[3/4] max-w-[420px] w-full mx-auto">
            {posters.map((p, i) => {
              const settle = settlePoints[i];
              // Progress local to this poster: 0 = below viewport, 1 = settled
              const localRaw = i === 0
                ? 1
                : Math.max(0, Math.min(1, (progress - Math.max(0, settle - 0.18)) / 0.18));
              // Spring-ish settle (Wave 2 polish — replaces 0.05s linear)
              const local = easeSettle(localRaw);

              // Each poster lands with a slight rotation/offset for the
              // deck look. Slightly desymmetrised values (vs the previous
              // -8/-3/4/9 even spacing) to avoid an algorithmic feel.
              const restRot = [-9, -2.5, 3.5, 8.5][i % 4];
              const restDx = [-30, -8, 14, 26][i % 4];
              const restDy = [14, 6, 4, -2][i % 4];

              // Wave 2 polish: enter-Y bumped 80→240px so the cards
              // travel a meaningful distance and the deck reads as
              // "deal" not "twitch". Initial scale 0.85 → 1.0 adds a
              // tiny zoom-in cue.
              const enterY = 240;
              const enterScaleStart = 0.85;
              const yOffset = (1 - local) * enterY + restDy;
              const rot = local * restRot;
              const dx = local * restDx;
              const scale = i === 0 ? 1 : enterScaleStart + (1 - enterScaleStart) * local;
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
                    transform: `translate(${dx}px, ${yOffset}px) rotate(${rot}deg) scale(${scale})`,
                    opacity,
                    zIndex: 10 + i * 10,
                    transition: reducedMotion ? "none" : "transform 0.08s linear, opacity 0.08s linear",
                    willChange: reducedMotion ? "auto" : "transform",
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
