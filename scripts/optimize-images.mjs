#!/usr/bin/env node
/**
 * Postbuild image optimizer.
 * Walks dist/ and:
 *   - Recompresses every PNG/JPG in place (max 1600px wide, preserves aspect)
 *   - Emits .avif and .webp siblings for any source >40KB
 *   - Applies extra-aggressive compression to hero-poster-* (LCP critical)
 */

import { readdir, readFile, writeFile, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const DIST = path.resolve(process.cwd(), "dist");
const VERCEL_STATIC = path.resolve(process.cwd(), ".vercel/output/static");
const DEFAULT_MAX_WIDTH = 1600;
const HERO_MAX_WIDTH = 1600;
const SIBLING_THRESHOLD = 40 * 1024;

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
        stats.webpWritten++;
      } catch {}
    }
    if (!existsSync(`${stem}.avif`)) {
      try {
        const avif = await baseResize(sharp(original))
          .avif({ quality: avifQuality, effort: 6 })
          .toBuffer();
        await writeFile(`${stem}.avif`, avif);
        stats.avifWritten++;
      } catch {}
    }
  }
}

// Operate on the deployed output dir if it exists (Vercel build),
// else on dist (local astro preview). Avoid doubling the work.
const target = existsSync(VERCEL_STATIC) ? VERCEL_STATIC : DIST;
await walk(target);
console.log(
  `[optimize-images] target=${path.relative(process.cwd(), target)} ` +
    `scanned ${stats.scanned}, rewritten ${stats.rewritten}, skipped ${stats.skipped}, ` +
    `avif ${stats.avifWritten}, webp ${stats.webpWritten}, saved ${(stats.savedBytes / 1024 / 1024).toFixed(1)} MB`
);
