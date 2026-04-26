#!/usr/bin/env node
/**
 * Postbuild image optimizer.
 * Walks dist/, recompresses every PNG/JPG in place:
 *   - max 1920px wide (preserves aspect)
 *   - PNG palette + compression level 9, effort 10
 *   - JPG quality 80, mozjpeg
 * Skips files where re-encoded output is larger than original.
 */

import { readdir, stat, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const DIST = path.resolve(process.cwd(), "dist");
const MAX_WIDTH = 1920;
const JPG_QUALITY = 80;

const stats = { scanned: 0, rewritten: 0, savedBytes: 0, skipped: 0 };

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

  let pipeline = sharp(original);
  if (meta.width && meta.width > MAX_WIDTH) {
    pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
  }

  const isPng = /\.png$/i.test(file);
  const out = isPng
    ? await pipeline.png({ palette: true, compressionLevel: 9, effort: 10 }).toBuffer()
    : await pipeline.jpeg({ quality: JPG_QUALITY, mozjpeg: true }).toBuffer();

  if (out.length < original.length) {
    await writeFile(file, out);
    stats.rewritten++;
    stats.savedBytes += original.length - out.length;
  } else {
    stats.skipped++;
  }
}

await walk(DIST);
console.log(
  `[optimize-images] scanned ${stats.scanned}, rewritten ${stats.rewritten}, skipped ${stats.skipped}, saved ${(stats.savedBytes / 1024 / 1024).toFixed(1)} MB`
);
