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
 * hydration directive. The edges fade into the page; the strip pauses on
 * hover, on a press and hold, and while a link inside has focus; with
 * prefers-reduced-motion it stands still.
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
      {/* Raw CSS via __html: React escapes text in <style> on the server but
          not in the browser, and the mismatch breaks hydration. */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes lokesh-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-33.333%); }
        }
        @keyframes lokesh-marquee-rev {
          from { transform: translateX(-33.333%); }
          to { transform: translateX(0); }
        }
        .lokesh-marquee {
          -webkit-mask-image: linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent);
          mask-image: linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent);
        }
        .lokesh-marquee__track { will-change: transform; }
        .lokesh-marquee:hover .lokesh-marquee__track,
        .lokesh-marquee:active .lokesh-marquee__track,
        .lokesh-marquee:focus-within .lokesh-marquee__track { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) {
          .lokesh-marquee__track { animation: none !important; }
          .lokesh-marquee { overflow-x: auto !important; -webkit-mask-image: none; mask-image: none; }
          .lokesh-marquee__track [data-copy] { display: none; }
        }
      `,
        }}
      />
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
              data-copy={copy ? "" : undefined}
              className="shrink-0 w-[125px] md:w-[140px] aspect-[2/3] rounded-md overflow-hidden ring-1 ring-white/[0.08] shadow-[0_15px_30px_-15px_rgba(0,0,0,0.7)] bg-[#141210]"
            >
              <img
                src={f.src}
                alt={alt}
                width={140}
                height={210}
                className="w-full h-full object-cover text-transparent"
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
