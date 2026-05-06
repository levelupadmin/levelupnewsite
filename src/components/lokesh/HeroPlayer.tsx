import { useRef, useState, useEffect } from "react";

interface Props {
  src: string;
  poster: string;
  /** Optional aria label override */
  ariaLabel?: string;
}

/**
 * Tap-responsive hero video.
 *
 * Why this exists:
 *   The previous autoplay-muted-loop hero was a dead-click trap on every
 *   browser except iOS Safari (Clarity logged 21% dead clicks). Chromium /
 *   Gecko don't auto-toggle play/pause on tap of a <video playsinline
 *   autoplay> element, so the entire hero was unresponsive — users tapped
 *   expecting feedback and got none.
 *
 * Behaviour now:
 *   - Server-render shows the poster image immediately (LCP candidate).
 *   - Plays muted-loop-inline once the user taps anywhere on the hero, OR
 *     once the page has been visible for 1.5s on devices that allow muted
 *     autoplay (matches Framer's perceived behaviour without blocking).
 *   - Once playing, a tap toggles muted state (gives users actual feedback).
 *
 * Hydration:
 *   Mounted with client:load on the page so the click handler is bound
 *   before requestIdleCallback fires. The poster is the LCP image; even
 *   if the JS is slow to arrive, the hero still LOOKS right.
 */
export default function HeroPlayer({ src, poster, ariaLabel }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // Try a delayed muted autoplay after first paint. Browsers that allow it
  // (most modern Chrome/Edge/Firefox/Safari with muted) will start the loop;
  // those that don't (rare) just stay on the poster until tap.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const t = setTimeout(() => {
      v.muted = true;
      v.play().then(() => {
        setIsPlaying(true);
        // Show "tap to unmute" hint for 4s once playback starts.
        setShowHint(true);
        setTimeout(() => setShowHint(false), 4500);
      }).catch(() => {
        // Autoplay blocked — leave poster + tap hint visible
        setShowHint(true);
      });
    }, 1500);
    return () => clearTimeout(t);
  }, []);

  const handleClick = () => {
    const v = videoRef.current;
    if (!v) return;
    if (!isPlaying) {
      // Not playing yet — start it.
      v.muted = true;
      v.play().then(() => {
        setIsPlaying(true);
        setShowHint(true);
        setTimeout(() => setShowHint(false), 4500);
      }).catch(() => {});
      return;
    }
    // Already playing — tap toggles muted state.
    v.muted = !v.muted;
    setShowHint(false);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      onTouchStart={handleClick}
      aria-label={ariaLabel || "Play hero video"}
      className="absolute inset-0 w-full h-full p-0 m-0 border-0 bg-transparent cursor-pointer block"
      // Touch target requirements satisfied by the full-bleed layout
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />
      {/* Centred play indicator visible until the video starts playing */}
      {!isPlaying && (
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 inline-flex items-center justify-center h-16 w-16 md:h-20 md:w-20 rounded-full bg-white/95 text-black shadow-[0_10px_30px_rgba(0,0,0,0.45)] pointer-events-none">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
        </span>
      )}
      {/* Subtle "tap to unmute" hint, auto-dismisses */}
      {showHint && isPlaying && (
        <span className="absolute bottom-4 left-1/2 -translate-x-1/2 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/65 backdrop-blur-sm text-white text-[12px] tracking-[-0.01em] pointer-events-none">
          🔊 Tap to unmute
        </span>
      )}
    </button>
  );
}
