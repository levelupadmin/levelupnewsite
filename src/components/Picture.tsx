import type { ImgHTMLAttributes } from "react";

interface PictureProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  raw?: boolean;
}

export function Picture({
  src,
  alt,
  raw,
  loading = "lazy",
  decoding = "async",
  className,
  style,
  ...rest
}: PictureProps) {
  if (raw || !/\.(png|jpe?g)(\?.*)?$/i.test(src)) {
    return (
      <img
        src={src}
        alt={alt}
        loading={loading}
        decoding={decoding}
        className={className}
        style={style}
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
        loading={loading}
        decoding={decoding}
        className={className}
        style={style}
        {...rest}
      />
    </picture>
  );
}

export default Picture;
