import type { ImgHTMLAttributes } from "react";

type AssetSource = string | { src: string };

interface PictureProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> {
  src: AssetSource;
  alt: string;
  raw?: boolean;
  fetchPriority?: "high" | "low" | "auto";
}

export function Picture({
  src,
  alt,
  raw,
  loading = "lazy",
  decoding = "async",
  className,
  style,
  fetchPriority,
  ...rest
}: PictureProps) {
  const shouldUseGeneratedSiblings = import.meta.env.PROD;
  const resolvedSrc = typeof src === "string" ? src : src.src;

  if (raw || !shouldUseGeneratedSiblings || !/\.(png|jpe?g)(\?.*)?$/i.test(resolvedSrc)) {
    return (
      <img
        src={resolvedSrc}
        alt={alt}
        loading={loading}
        decoding={decoding}
        className={className}
        style={style}
        {...(fetchPriority ? { fetchpriority: fetchPriority } : {})}
        {...rest}
      />
    );
  }

  const queryMatch = resolvedSrc.match(/\?.*$/);
  const query = queryMatch ? queryMatch[0] : "";
  const stem = resolvedSrc.replace(/\.(png|jpe?g)(\?.*)?$/i, "");

  return (
    <picture style={{ display: "contents" }}>
      <source srcSet={`${stem}.avif${query}`} type="image/avif" />
      <source srcSet={`${stem}.webp${query}`} type="image/webp" />
      <img
        src={resolvedSrc}
        alt={alt}
        loading={loading}
        decoding={decoding}
        className={className}
        style={style}
        {...(fetchPriority ? { fetchpriority: fetchPriority } : {})}
        {...rest}
      />
    </picture>
  );
}

export default Picture;
