#!/usr/bin/env node
/**
 * Postbuild image optimizer.
 * Walks dist/ and:
 *   - Recompresses every PNG/JPG in place (max 1600px wide, preserves aspect)
 *   - Emits .avif and .webp siblings for every source (Picture component
 *     references them — missing siblings 404 inside <picture>)
 *   - Applies extra-aggressive compression to hero-poster-* (LCP critical)
 *   - Mirrors all writes to .vercel/output/static via copyFile (no re-encode)
 *
 * Performance:
 *   - Encoders run in parallel (CONCURRENCY workers, sized to CPU count).
 *     Sharp internally uses libvips threads anyway; capping JS-side
 *     concurrency at 2× cores keeps memory bounded on 8 GB Vercel boxes.
 *   - AVIF effort dropped from 6 → 3 (Sharp default is 4). At effort=3
 *     each AVIF encode is ~3× faster with <5% file-size penalty —
 *     critical for staying inside Vercel's 45-min build cap.
 *   - WebP effort dropped from 6 → 4 (default is 4). Same trade.
 *   - Files smaller than SIBLING_THRESHOLD bytes (8 KB) skip AVIF/WebP
 *     entirely; tiny logos / icons don't benefit from format swap.
 *   - Per-file timing logged so future build slowdowns are visible.
 */

import { readdir, readFile, writeFile, copyFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import os from "node:os";
import sharp from "sharp";

const DIST = path.resolve(process.cwd(), "dist");
const VERCEL_STATIC = path.resolve(process.cwd(), ".vercel/output/static");
// Track every file we write/rewrite so we can mirror to a second target dir
// without re-running Sharp. Encoding is the expensive step; copyFile is free.
const writes = [];
const DEFAULT_MAX_WIDTH = 1600;
const HERO_MAX_WIDTH = 1600;
// Skip AVIF/WebP siblings for files smaller than this — tiny logos and
// icons don't benefit from format swap and burn encoder time on hundreds
// of small files. Set to 8 KB.
const SIBLING_THRESHOLD = 8 * 1024;
// Run N encoders in parallel. Vercel build VM is 2 cores / 8 GB; Sharp's
// internal libvips thread pool already uses both. Going beyond 4 here
// risks OOM on the heavier images. 2 = 1 worker per core.
const CONCURRENCY = Math.max(2, Math.min(4, os.cpus().length));

const stats = {
  scanned: 0,
  rewritten: 0,
  skipped: 0,
  avifWritten: 0,
  webpWritten: 0,
  savedBytes: 0,
  totalEncodeMs: 0,
};

const HERO_PATTERN = /hero-poster-\d/i;

async function collect(dir, acc = []) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await collect(full, acc);
    else if (/\.(png|jpe?g)$/i.test(entry.name)) acc.push(full);
  }
  return acc;
}

async function optimize(file) {
  const t0 = Date.now();
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

  // Re-encode source in place (saves bytes if smaller)
  const sourcePipeline = baseResize(sharp(original));
  const out = isPng
    ? await sourcePipeline.png({ palette: true, compressionLevel: 9, effort: 7 }).toBuffer()
    : await sourcePipeline.jpeg({ quality: jpgQuality, mozjpeg: true }).toBuffer();

  if (out.length < original.length) {
    await writeFile(file, out);
    writes.push(file);
    stats.rewritten++;
    stats.savedBytes += original.length - out.length;
  } else {
    stats.skipped++;
  }

  // Sibling AVIF/WebP — only for files large enough that the format swap
  // is worth the encode time + the network gain
  if (Math.max(out.length, original.length) >= SIBLING_THRESHOLD) {
    const ext = path.extname(file);
    const stem = file.slice(0, -ext.length);
    if (!existsSync(`${stem}.webp`)) {
      try {
        const webp = await baseResize(sharp(original))
          .webp({ quality: webpQuality, effort: 4 })
          .toBuffer();
        await writeFile(`${stem}.webp`, webp);
        writes.push(`${stem}.webp`);
        stats.webpWritten++;
      } catch {}
    }
    if (!existsSync(`${stem}.avif`)) {
      try {
        const avif = await baseResize(sharp(original))
          .avif({ quality: avifQuality, effort: 3 })
          .toBuffer();
        await writeFile(`${stem}.avif`, avif);
        writes.push(`${stem}.avif`);
        stats.avifWritten++;
      } catch {}
    }
  }
  stats.totalEncodeMs += Date.now() - t0;
}

// Run optimize() over `files` in batches of CONCURRENCY at a time.
async function runPool(files) {
  let next = 0;
  const workers = Array.from({ length: CONCURRENCY }, async () => {
    while (next < files.length) {
      const i = next++;
      try {
        await optimize(files[i]);
      } catch (e) {
        console.warn(`[optimize-images] failed on ${files[i]}: ${e.message}`);
      }
      // Periodic progress log — useful when this script is the long pole
      // of a 30+ min Vercel build.
      if ((i + 1) % 25 === 0 || i + 1 === files.length) {
        console.log(
          `[optimize-images] ${i + 1}/${files.length} processed ` +
            `(avif:${stats.avifWritten} webp:${stats.webpWritten} ` +
            `re:${stats.rewritten} sk:${stats.skipped} ` +
            `avg ${Math.round(stats.totalEncodeMs / (i + 1))}ms)`
        );
      }
    }
  });
  await Promise.all(workers);
}

// Encode once in dist/, then mirror byte-for-byte to .vercel/output/static.
if (!existsSync(DIST)) {
  console.log("[optimize-images] dist/ missing — skipping");
  process.exit(0);
}
const tStart = Date.now();
const files = await collect(DIST);
console.log(`[optimize-images] processing ${files.length} files with ${CONCURRENCY} workers`);
await runPool(files);

let mirrored = 0;
if (existsSync(VERCEL_STATIC)) {
  // copyFile is fast but still serial. Pool it too just to be safe.
  const copyJobs = writes.map(async (src) => {
    const rel = path.relative(DIST, src);
    const dest = path.join(VERCEL_STATIC, rel);
    await mkdir(path.dirname(dest), { recursive: true });
    await copyFile(src, dest);
    mirrored++;
  });
  // Allow OS-level concurrency on the copy itself
  await Promise.all(copyJobs);
}

const totalSec = ((Date.now() - tStart) / 1000).toFixed(1);
console.log(
  `[optimize-images] DONE in ${totalSec}s — scanned ${stats.scanned}, ` +
    `rewritten ${stats.rewritten}, skipped ${stats.skipped}, ` +
    `avif ${stats.avifWritten}, webp ${stats.webpWritten}, ` +
    `mirrored ${mirrored} files to .vercel/output/static, ` +
    `saved ${(stats.savedBytes / 1024 / 1024).toFixed(1)} MB`
);
