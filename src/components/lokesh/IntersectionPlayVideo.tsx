import { useRef, useEffect } from "react";

interface Props {
  src: string;
  poster?: string;
  className?: string;
}

/**
 * Autoplays muted video when scrolled into viewport, pauses when scrolled out.
 *
 * Pre-loads the video as soon as it enters a generous 600px rootMargin
 * (i.e. while still about one viewport below the fold). By the time
 * the card is centred, the first few seconds are buffered, so playback
 * starts instantly instead of staring at the poster waiting for bytes.
 * 600px is a real-device sweet spot: far enough that 4G can fetch a
 * 2-5 MB clip in time, close enough that we don't preload everything
 * on page load.
 */
export default function IntersectionPlayVideo({ src, poster, className = "" }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    let primed = false;

    // Phase 1: PRELOAD as the card approaches the viewport.
    const preloader = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !primed) {
            primed = true;
            v.preload = "auto";
            v.load();
          }
        }
      },
      { rootMargin: "600px 0px 600px 0px" }
    );

    // Phase 2: PLAY when actually visible, PAUSE when scrolled out.
    const player = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            v.muted = true;
            v.play().catch(() => {});
          } else {
            v.pause();
          }
        }
      },
      { threshold: 0.3 }
    );

    preloader.observe(v);
    player.observe(v);
    return () => {
      preloader.disconnect();
      player.disconnect();
    };
  }, []);

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      className={`w-full h-full object-cover ${className}`}
    />
  );
}
