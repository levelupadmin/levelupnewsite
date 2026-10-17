import { useState } from "react";
import { Play } from "lucide-react";

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
 */
export default function LokeshTrailer({
  ytId,
  title = "Official masterclass trailer",
  alt,
  poster,
  noCookie = true,
}: Props) {
  const [playing, setPlaying] = useState(false);
  const thumb = poster || `https://i.ytimg.com/vi_webp/${ytId}/maxresdefault.webp`;
  const host = noCookie ? "https://www.youtube-nocookie.com" : "https://www.youtube.com";

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

  // Anchor (not button) so it remains clickable even before this island
  // has hydrated. If JS is alive: preventDefault + swap to embedded iframe.
  // If JS hasn't loaded yet (slow network / failed hydration): the tap
  // takes the user to youtube.com and the trailer plays there. Either
  // way the click is never dead.
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
      className="relative aspect-video w-full bg-black overflow-hidden group block"
      aria-label={`Play: ${title}`}
    >
      <img
        src={thumb}
        alt={alt ?? title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
        loading="lazy"
        decoding="async"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10" />
      {/* "OFFICIAL TRAILER" overlay removed. The YouTube thumbnail
          already has it baked into the artwork. */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="inline-flex h-16 w-16 md:h-[72px] md:w-[72px] items-center justify-center rounded-full bg-white/95 text-black shadow-[0_8px_24px_rgba(0,0,0,0.45)] transition-transform duration-300 group-hover:scale-110 motion-reduce:transition-none">
          <Play className="w-6 h-6 ml-0.5" fill="currentColor" />
        </span>
      </div>
    </a>
  );
}
