import { useRef, useState, useEffect } from "react";

interface Props {
  src: string;
  poster: string;
  /** Optional mobile-portrait video src — Framer ships a separate vertical cut */
  mobileSrc?: string;
  /** Optional mobile poster matching the mobile-portrait video */
  mobilePoster?: string;
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
// Lazy initializer that picks the right src/poster on FIRST render.
// Why this matters: if we wait until useEffect (after render), the
// browser has already started fetching the desktop video by the time
// we swap to the mobile one. On a 393×667 phone that's 7+ MB of waste
// before the user sees anything useful (UX agent flagged this — Wave 1).
function pickInitial(
  desktopSrc: string,
  mobileSrc: string | undefined,
  desktopPoster: string,
  mobilePoster: string | undefined
) {
  if (
    typeof window !== "undefined" &&
    mobileSrc &&
    window.matchMedia("(max-width: 767px)").matches
  ) {
    return { src: mobileSrc, poster: mobilePoster ?? desktopPoster };
  }
  return { src: desktopSrc, poster: desktopPoster };
}

export default function HeroPlayer({ src, poster, mobileSrc, mobilePoster, ariaLabel }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showHint, setShowHint] = useState(false);
  // Only true if the browser actually refused autoplay. Until then we
  // hide the play overlay so it doesn't flash for users who DO get
  // autoplay (the common path).
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  // Resolve mobile vs desktop on the FIRST render (lazy init), not in
  // a useEffect. This prevents the desktop video from being requested
  // and partially downloaded before we'd swap on a phone.
  const [media] = useState(() => pickInitial(src, mobileSrc, poster, mobilePoster));
  const activeSrc = media.src;
  const activePoster = media.poster;

  // Try muted autoplay IMMEDIATELY on mount (was 1500ms delay — that
  // delay is why a play-button + poster flashed for ~1.5s before the
  // video kicked in). The previous comment was wrong: modern browsers
  // start muted-autoplay synchronously on mount, no wait needed.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    let cancelled = false;
    v.muted = true;
    // Kick playback as soon as the element exists. If autoplay is
    // blocked (rare with muted+playsInline), we'll show the play
    // button so the user can tap.
    const tryPlay = () => {
      v.play().then(() => {
        if (cancelled) return;
        setIsPlaying(true);
        // Faint "tap to unmute" hint, auto-dismisses after 4s.
        setShowHint(true);
        window.setTimeout(() => setShowHint(false), 4000);
      }).catch(() => {
        if (cancelled) return;
        // Autoplay blocked — only NOW reveal the play overlay so the
        // user has something to tap. (Previously the play button
        // flashed for the autoplay-delay window even on browsers that
        // would have allowed muted autoplay.)
        setAutoplayBlocked(true);
      });
    };
    if (v.readyState >= 2) tryPlay();
    else v.addEventListener("loadedmetadata", tryPlay, { once: true });
    return () => {
      cancelled = true;
      v.removeEventListener("loadedmetadata", tryPlay);
    };
  }, []);

  const handleClick = () => {
    const v = videoRef.current;
    if (!v) return;
    if (!isPlaying) {
      // Not playing yet, start it (autoplay was likely blocked).
      v.muted = true;
      v.play().then(() => {
        setIsPlaying(true);
        setAutoplayBlocked(false);
        setShowHint(true);
        window.setTimeout(() => setShowHint(false), 4000);
      }).catch(() => {});
      return;
    }
    // Already playing, tap toggles muted state.
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
        src={activeSrc}
        poster={activePoster}
        muted
        loop
        playsInline
        autoPlay
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />
      {/* Play overlay shows ONLY if autoplay was refused — never during
          the brief window where we're attempting autoplay. */}
      {!isPlaying && autoplayBlocked && (
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
