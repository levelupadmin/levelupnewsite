#!/usr/bin/env node
/**
 * Postbuild image optimizer.
 * Walks dist/ and:
 *   - Recompresses every PNG/JPG in place (max 1600px wide, preserves aspect)
 *   - Emits .avif and .webp siblings for every source (Picture component
 *     references them — missing siblings 404 inside <picture>)
 *   - Applies extra-aggressive compression to hero-poster-* (LCP critical)
 *   - Mirrors all writes to .vercel/output/static via copyFile (no re-encode)
 */

import { readdir, readFile, writeFile, stat, copyFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const DIST = path.resolve(process.cwd(), "dist");
const VERCEL_STATIC = path.resolve(process.cwd(), ".vercel/output/static");
// Track every file we write/rewrite so we can mirror to a second target dir
// without re-running Sharp. Encoding is the expensive step (~3s per AVIF on
// the 2-core Vercel builder); a file copy is essentially free.
const writes = [];
const DEFAULT_MAX_WIDTH = 1600;
const HERO_MAX_WIDTH = 1600;
// Always emit AVIF/WebP siblings so the <Picture> React component can rely
// on them existing. Even tiny files cost only a few ms of Sharp time, and
// missing siblings would 404 inside <picture> (browsers don't fall back
// from a chosen source to the <img> on network error).
const SIBLING_THRESHOLD = 0;

const stats = {
  scanned: 0,
  rewritten: 0,
  skipped: 0,
  avifWritten: 0,
  webpWritten: 0,
  savedBytes: 0,
};

const HERO_PATTERN = /hero-poster-\d/i;

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(full);
    else if (/\.(png|jpe?g)$/i.test(entry.name)) await optimize(full);
  }
}

async function optimize(file) {
  stats.scanned++;
  const original = await readFile(file);
  const meta = await sharp(original).metadata();
  const isHero = HERO_PATTERN.test(path.basename(file));
  const maxWidth = isHero ? HERO_MAX_WIDTH : DEFAULT_MAX_WIDTH;

  const baseResize = (s) =>
    meta.width && meta.width > maxWidth
      ? s.resize({ width: maxWidth, withoutEnlargement: true })
      : s;

  const isPng = /\.png$/i.test(file);
  const jpgQuality = isHero ? 62 : 72;
  const webpQuality = isHero ? 60 : 75;
  const avifQuality = isHero ? 50 : 60;

  const sourcePipeline = baseResize(sharp(original));
  const out = isPng
    ? await sourcePipeline.png({ palette: true, compressionLevel: 9, effort: 10 }).toBuffer()
    : await sourcePipeline.jpeg({ quality: jpgQuality, mozjpeg: true }).toBuffer();

  if (out.length < original.length) {
    await writeFile(file, out);
    writes.push(file);
    stats.rewritten++;
    stats.savedBytes += original.length - out.length;
  } else {
    stats.skipped++;
  }

  // Sibling AVIF/WebP for sources large enough to matter
  if (Math.max(out.length, original.length) >= SIBLING_THRESHOLD) {
    const ext = path.extname(file);
    const stem = file.slice(0, -ext.length);
    if (!existsSync(`${stem}.webp`)) {
      try {
        const webp = await baseResize(sharp(original))
          .webp({ quality: webpQuality, effort: 6 })
          .toBuffer();
        await writeFile(`${stem}.webp`, webp);
        writes.push(`${stem}.webp`);
        stats.webpWritten++;
      } catch {}
    }
    if (!existsSync(`${stem}.avif`)) {
      try {
        const avif = await baseResize(sharp(original))
          .avif({ quality: avifQuality, effort: 6 })
          .toBuffer();
        await writeFile(`${stem}.avif`, avif);
        writes.push(`${stem}.avif`);
        stats.avifWritten++;
      } catch {}
    }
  }
}

// Encode once in dist/, then mirror byte-for-byte to .vercel/output/static.
// The @astrojs/vercel adapter copies dist→output/static during build BEFORE
// postbuild runs, so both dirs have the same source images. Walking both
// would double Sharp work (the slow part); mirroring via copyFile is ~free.
if (!existsSync(DIST)) {
  console.log("[optimize-images] dist/ missing — skipping");
  process.exit(0);
}
await walk(DIST);

let mirrored = 0;
if (existsSync(VERCEL_STATIC)) {
  for (const src of writes) {
    const rel = path.relative(DIST, src);
    const dest = path.join(VERCEL_STATIC, rel);
    await mkdir(path.dirname(dest), { recursive: true });
    await copyFile(src, dest);
    mirrored++;
  }
}

console.log(
  `[optimize-images] scanned ${stats.scanned}, rewritten ${stats.rewritten}, ` +
    `skipped ${stats.skipped}, avif ${stats.avifWritten}, webp ${stats.webpWritten}, ` +
    `mirrored ${mirrored} files to .vercel/output/static, ` +
    `saved ${(stats.savedBytes / 1024 / 1024).toFixed(1)} MB`
);
