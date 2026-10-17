import { useEffect, useRef, useState } from "react";
import "@/styles/masterclass.css";

interface Poster {
  src: string;
  alt: string;
}

/** A film with its poster. `title` and `year` also feed the film list. */
export interface StackFilm {
  src: string;
  title: string;
  year?: number | string;
  alt?: string;
}

interface Props {
  /** Poster images, bottom of the deck first. Optional when `films` is set. */
  posters?: Poster[];
  /**
   * Films, in deck order. Takes priority over `posters`; each film's alt
   * text defaults to "<title> poster". When `subline` is not given, the
   * titles become the subline ("Jailer. Beast. Doctor.").
   */
  films?: StackFilm[];
  /** Optional eyebrow above the heading. Defaults to "Learn from the". */
  eyebrow?: string;
  /** Heading text. Defaults to "Director Behind these Blockbuster Films". */
  heading?: string;
  /** Line under the heading, e.g. the film names. */
  subline?: string;
  /** Smaller caption under the subline. Leave out unless every figure in it has a source. */
  caption?: string;
  /** CTA label. Defaults to a generic enrol prompt. */
  ctaLabel?: string;
  /** Checkout URL for THIS masterclass. Required to prevent traffic
   *  silently routing to the wrong product if the prop is forgotten. */
  ctaHref: string;
  /** Open the checkout in a new tab. Default false (same tab). */
  ctaNewTab?: boolean;
  /** Scroll runway per extra poster, in vh. Default 35. */
  runwayPerPoster?: number;
}

// Where each card comes to rest, so the deck looks dealt by hand.
const REST_ROT = [-9, -2.5, 3.5, 8.5];
const REST_DX = [-30, -8, 14, 26];
const REST_DY = [14, 6, 4, -2];
const ENTER_Y = 160;
const ENTER_SCALE = 0.9;

/** Ease out with a small settle at the end of each card's travel. */
function easeLand(t: number): number {
  const c = 1.2;
  const x = t - 1;
  return 1 + (c + 1) * x * x * x + c * x * x;
}

/**
 * Scroll-driven film deck: as the visitor scrolls past, each poster slides
 * up and lands on the one before it.
 *
 * - The section is tall (100vh plus a runway per poster) and the deck sits
 *   in a sticky frame inside it.
 * - Scroll position is read once per frame and written straight to each
 *   card's transform and opacity; React does not re-render while scrolling.
 * - Posters start loading about two screens before the deck arrives, so a
 *   card is never an empty outline when it lands.
 * - prefers-reduced-motion shows the settled deck with no runway.
 * - The checkout button opens in the same tab.
 */
export default function FilmsScrollStack({
  posters: posterProp = [],
  films,
  eyebrow = "Learn from the",
  heading = "Director Behind these Blockbuster Films",
  subline: sublineProp,
  caption,
  ctaLabel = "Enrol now",
  ctaHref,
  ctaNewTab = false,
  runwayPerPoster = 35,
}: Props) {
  const posters: Poster[] = films
    ? films.map((f) => ({ src: f.src, alt: f.alt ?? `${f.title} poster` }))
    : posterProp;
  const subline =
    sublineProp ??
    (films ? films.map((f) => `${f.title}.`).join(" ") : "Maanagaram. Kaithi. Master. Vikram. Leo.");
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLImageElement | null)[]>([]);
  const [still, setStill] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // Start every poster loading well before the deck is on screen.
    const eager = () => cardRefs.current.forEach((img) => img && (img.loading = "eager"));
    const near = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          eager();
          near.disconnect();
        }
      },
      { rootMargin: "200% 0px 200% 0px" }
    );
    near.observe(el);

    const n = posters.length;
    const place = (progress: number) => {
      cardRefs.current.forEach((img, i) => {
        if (!img) return;
        const settle = i === 0 ? 0 : i / n;
        const raw = i === 0 ? 1 : Math.max(0, Math.min(1, (progress - Math.max(0, settle - 0.18)) / 0.18));
        const t = i === 0 ? 1 : easeLand(raw);
        const y = (1 - t) * ENTER_Y + REST_DY[i % 4];
        const s = i === 0 ? 1 : ENTER_SCALE + (1 - ENTER_SCALE) * t;
        img.style.transform = `translate3d(${(t * REST_DX[i % 4]).toFixed(1)}px, ${y.toFixed(1)}px, 0) rotate(${(t * REST_ROT[i % 4]).toFixed(2)}deg) scale(${s.toFixed(3)})`;
        img.style.opacity = String(i === 0 ? 1 : Math.min(1, raw * 1.6));
      });
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStill(true);
      place(1);
      return () => near.disconnect();
    }

    let raf = 0;
    let visible = false;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      place(total > 0 ? Math.max(0, Math.min(1, -rect.top / total)) : 1);
    };
    const onScroll = () => {
      if (!visible || raf) return;
      raf = requestAnimationFrame(update);
    };
    // Only listen while the section is near the screen.
    const watch = new IntersectionObserver(
      (entries) => {
        visible = entries.some((e) => e.isIntersecting);
        if (visible) onScroll();
      },
      { rootMargin: "50% 0px 50% 0px" }
    );
    watch.observe(el);
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      near.disconnect();
      watch.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
    // posters.length is the only input the effect reads.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [posters.length]);

  return (
    <section
      ref={sectionRef}
      className="relative"
      // 100vh sticky window plus a runway per extra poster: a 5-poster deck
      // takes 100 + 4 x 35 = 240vh.
      style={{ height: still ? "auto" : `${100 + Math.max(0, posters.length - 1) * runwayPerPoster}vh` }}
    >
      <div
        className={
          still
            ? "py-16 flex items-center"
            : "sticky top-0 h-screen supports-[height:100svh]:h-[100svh] flex items-center overflow-hidden pb-16 md:pb-0"
        }
      >
        <div className="w-full max-w-[1320px] mx-auto px-5 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div>
            <p className="font-cinzel text-gold text-[22px] md:text-[26px] lg:text-[32px] leading-[1.1] tracking-[0.18em] uppercase font-medium">
              {eyebrow}
            </p>
            <h2
              className="text-white mt-3 text-[28px] md:text-[40px] lg:text-[52px] leading-[1.05] tracking-[-0.04em] font-semibold [text-wrap:balance]"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {heading}
            </h2>
            <p className="mt-5 md:mt-6 text-[15px] md:text-[17px] text-white/80 leading-relaxed">
              <span className="font-semibold text-white">{subline}</span>
              {caption && (
                <>
                  <br />
                  <span className="text-white/70">{caption}</span>
                </>
              )}
            </p>
            <a
              href={ctaHref}
              target={ctaNewTab ? "_blank" : undefined}
              rel={ctaNewTab ? "noopener" : undefined}
              data-mc-buy=""
              data-mc-cta="films"
              className="mck-cta mt-7 md:mt-9"
            >
              <span className="mck-cta__text">
                {ctaLabel}
                <svg className="mck-cta__arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </span>
            </a>
          </div>

          {/* Phones: the deck shrinks to fit under the text in one screen. */}
          <div className="relative aspect-[3/4] mx-auto w-[min(68vw,300px,calc((100svh_-_390px)*0.75))] min-w-[200px] md:min-w-0 md:w-full md:max-w-[420px]">
            {posters.map((p, i) => (
              <img
                key={p.src}
                ref={(node) => {
                  cardRefs.current[i] = node;
                }}
                src={p.src}
                alt={p.alt}
                loading={i === 0 ? "eager" : "lazy"}
                decoding="async"
                // @ts-expect-error fetchpriority is valid HTML; React 18 types lag behind.
                fetchpriority="low"
                className="absolute inset-0 w-full h-full object-cover rounded-xl ring-1 ring-white/10 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.85)] will-change-transform text-transparent"
                style={{
                  zIndex: 10 + i * 10,
                  backgroundColor: "#141210",
                  // Server HTML: the first card in place, the rest waiting
                  // below it, as at the top of the runway.
                  transform: i === 0 ? `translate3d(0, ${REST_DY[0]}px, 0)` : `translate3d(0, ${ENTER_Y + REST_DY[i % 4]}px, 0) scale(${ENTER_SCALE})`,
                  opacity: i === 0 ? 1 : 0,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
