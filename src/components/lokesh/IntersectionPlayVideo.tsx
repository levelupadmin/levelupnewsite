import { useRef, useEffect } from "react";

interface Props {
  src: string;
  poster?: string;
  className?: string;
}

/**
 * Autoplays muted video when scrolled into viewport, pauses when scrolled out.
 * Matches Framer's behavior on Why-Is-This-Masterclass cards: video starts at
 * preload="none", first time the card crosses 30% in-view we set preload="auto",
 * call play(), and from then on we toggle play/pause based on visibility.
 *
 * Safe defaults for mobile data: nothing loads until the section is reached.
 */
export default function IntersectionPlayVideo({ src, poster, className = "" }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    let started = false;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            if (!started) {
              v.preload = "auto";
              started = true;
            }
            v.muted = true;
            v.play().catch(() => {});
          } else {
            v.pause();
          }
        }
      },
      { threshold: 0.3 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      className={`w-full h-full object-cover ${className}`}
    />
  );
}
