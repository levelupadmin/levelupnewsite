import { useEffect, useRef, useState } from "react";

interface Props {
  ytId: string;
  /** Iframe title and the play button's label, e.g.
   *  "Nelson Dilipkumar Teaches Filmmaking, official trailer". */
  title?: string;
  /** Alt text for the thumbnail. Defaults to `title`. */
  alt?: string;
  /** Own poster image instead of YouTube's thumbnail. */
  poster?: string;
  /** Load the player from youtube-nocookie.com. Default true. */
  noCookie?: boolean;
}

/**
 * Click-to-load YouTube trailer. Shows a thumbnail and a play button; the
 * YouTube player (about 1 MB of script) loads only after a tap.
 *
 * - The thumbnail is a link to the video on YouTube, so a tap before this
 *   island hydrates still plays the trailer (there, in a new tab).
 * - YouTube's largest thumbnail does not exist for every upload; when it
 *   fails, the smaller one that always exists takes its place.
 */
export default function LokeshTrailer({
  ytId,
  title = "Official masterclass trailer",
  alt,
  poster,
  noCookie = true,
}: Props) {
  const [playing, setPlaying] = useState(false);
  const fallback = `https://i.ytimg.com/vi/${ytId}/hqdefault.jpg`;
  const [thumb, setThumb] = useState(poster || `https://i.ytimg.com/vi_webp/${ytId}/maxresdefault.webp`);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const host = noCookie ? "https://www.youtube-nocookie.com" : "https://www.youtube.com";

  // An image that failed before hydration fired its error event too early
  // for React to see; check it once on mount.
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0 && thumb !== fallback && !poster) setThumb(fallback);
  }, [fallback, poster, thumb]);

  if (playing) {
    return (
      <div className="relative aspect-video bg-black">
        <iframe
          src={`${host}/embed/${ytId}?autoplay=1&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3&color=white`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>
    );
  }

  const ytWatchUrl = `https://www.youtube.com/watch?v=${ytId}`;
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setPlaying(true);
  };

  return (
    <a
      href={ytWatchUrl}
      target="_blank"
      rel="noopener"
      onClick={handleClick}
      className="relative aspect-video w-full overflow-hidden group block focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#f5d59a]"
      style={{ background: "radial-gradient(90% 70% at 50% 40%, #241a10, #050505)" }}
      aria-label={`Play: ${title}`}
    >
      <img
        ref={imgRef}
        src={thumb}
        alt={alt ?? title}
        onError={() => {
          if (!poster && thumb !== fallback) setThumb(fallback);
        }}
        className="absolute inset-0 w-full h-full object-cover text-transparent transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transition-none"
        loading="lazy"
        decoding="async"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-black/15" />
      {/* The YouTube thumbnail already carries the "official trailer" art. */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="relative inline-flex h-16 w-16 md:h-[76px] md:w-[76px] items-center justify-center">
          {/* One soft ring that breathes out; transform and opacity only. */}
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-full ring-1 ring-[#f5d59a]/60 animate-[mck-trailer-ring_2.6s_cubic-bezier(0.22,1,0.36,1)_infinite] motion-reduce:animate-none"
          />
          <span className="relative inline-flex h-full w-full items-center justify-center rounded-full bg-black/45 text-white ring-1 ring-[#f5d59a]/75 shadow-[0_0_0_6px_rgba(245,213,154,0.12),0_14px_34px_rgba(0,0,0,0.55)] backdrop-blur-[6px] transition-transform duration-300 group-hover:scale-110 group-active:scale-95 motion-reduce:transition-none">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="ml-1">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </span>
      </div>
      <style>{`@keyframes mck-trailer-ring{0%{transform:scale(1);opacity:.9}70%,100%{transform:scale(1.55);opacity:0}}`}</style>
    </a>
  );
}
