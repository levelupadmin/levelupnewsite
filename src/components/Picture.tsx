import type { ImgHTMLAttributes } from "react";

interface PictureProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  /** Plain <img>, no AVIF/WebP sources. Use for files under 8 KB, which
   *  scripts/optimize-images.mjs gives no siblings. */
  raw?: boolean;
  /** First-screen image: loads eagerly with fetchpriority="high". */
  priority?: boolean;
}

/**
 * <img> with the AVIF and WebP siblings that scripts/optimize-images.mjs
 * writes next to every .png/.jpg over 8 KB after the build.
 */
export function Picture({
  src,
  alt,
  raw,
  priority = false,
  loading = "lazy",
  decoding = "async",
  className,
  style,
  ...rest
}: PictureProps) {
  const eager = priority ? { loading: "eager" as const, fetchpriority: "high" } : { loading };
  if (raw || !/\.(png|jpe?g)(\?.*)?$/i.test(src)) {
    return (
      <img
        src={src}
        alt={alt}
        decoding={decoding}
        className={className}
        style={style}
        {...eager}
        {...rest}
      />
    );
  }

  const queryMatch = src.match(/\?.*$/);
  const query = queryMatch ? queryMatch[0] : "";
  const stem = src.replace(/\.(png|jpe?g)(\?.*)?$/i, "");

  return (
    <picture style={{ display: "contents" }}>
      <source srcSet={`${stem}.avif${query}`} type="image/avif" />
      <source srcSet={`${stem}.webp${query}`} type="image/webp" />
      <img
        src={src}
        alt={alt}
        decoding={decoding}
        className={className}
        style={style}
        {...eager}
        {...rest}
      />
    </picture>
  );
}

export default Picture;
