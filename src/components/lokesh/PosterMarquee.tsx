interface MarqueeFilm {
  src: string;
  /** Film title; becomes the alt text "<title> poster". */
  title?: string;
  alt?: string;
}

interface Props {
  /** Poster image URLs. Decorative (empty alt). Optional when `films` is set. */
  posters?: string[];
  /** Films with titles, so each poster gets real alt text. Takes priority. */
  films?: MarqueeFilm[];
  dir?: "left" | "right";
  speed?: number;
  /** Accessible name for the strip, e.g. "Films Nelson directed". */
  label?: string;
}

/**
 * Endless poster strip. Pure CSS animation (transform only), so it needs no
 * hydration directive. Pauses on hover and for prefers-reduced-motion.
 */
export default function PosterMarquee({ posters = [], films, dir = "left", speed = 38, label }: Props) {
  const base: MarqueeFilm[] = films ?? posters.map((src) => ({ src }));
  // Three copies so the loop tiles seamlessly; only the first is announced.
  const items = [...base, ...base, ...base];
  const animationName = dir === "right" ? "lokesh-marquee-rev" : "lokesh-marquee";

  return (
    <div
      className="lokesh-marquee relative overflow-hidden"
      role={label ? "region" : undefined}
      aria-label={label}
    >
      <style>{`
        @keyframes lokesh-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-33.333%); }
        }
        @keyframes lokesh-marquee-rev {
          from { transform: translateX(-33.333%); }
          to { transform: translateX(0); }
        }
        .lokesh-marquee:hover .lokesh-marquee__track { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) {
          .lokesh-marquee__track { animation: none !important; }
        }
      `}</style>
      <div
        className="lokesh-marquee__track flex gap-3 md:gap-4 w-max"
        style={{
          animation: `${animationName} ${speed}s linear infinite`,
        }}
      >
        {items.map((f, i) => {
          const copy = i >= base.length;
          const alt = copy ? "" : f.alt ?? (f.title ? `${f.title} poster` : "");
          return (
            <div
              key={i}
              aria-hidden={copy ? true : undefined}
              className="shrink-0 w-[125px] md:w-[140px] aspect-[2/3] rounded-md overflow-hidden ring-1 ring-white/[0.06] shadow-[0_15px_30px_-15px_rgba(0,0,0,0.7)]"
            >
              <img
                src={f.src}
                alt={alt}
                width={140}
                height={210}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
