#!/usr/bin/env node
/**
 * Postbuild script: emit /llms.txt and /llms-full.txt per https://llmstxt.org/
 * Compiles the source TS data files to JS via esbuild, imports them, and writes
 * structured plain-text outputs into dist/.
 */

import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import * as esbuild from "esbuild";

const SITE_URL = "https://www.leveluplearning.in";
const ROOT = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(ROOT, "..");
const DIST = path.resolve(REPO, "dist");
const VERCEL_STATIC = path.resolve(REPO, ".vercel/output/static");

async function loadTs(file) {
  const result = await esbuild.build({
    entryPoints: [path.resolve(REPO, file)],
    bundle: true,
    format: "esm",
    platform: "neutral",
    target: "es2022",
    write: false,
    alias: { "@": path.resolve(REPO, "src") },
    loader: {
      ".png": "text",
      ".jpg": "text",
      ".jpeg": "text",
      ".webp": "text",
      ".avif": "text",
      ".svg": "text",
      ".gif": "text",
    },
  });
  const code = result.outputFiles[0].text;
  const dataUrl =
    "data:text/javascript;base64," + Buffer.from(code).toString("base64");
  return import(dataUrl);
}

async function main() {
  const [storiesMod, ag, dk, gvr] = await Promise.all([
    loadTs("src/data/studentStories.ts"),
    loadTs("src/data/masterclass/anthony-gonsalvez.ts"),
    loadTs("src/data/masterclass/drk-kiran.ts"),
    loadTs("src/data/masterclass/g-venket-ram.ts"),
  ]);

  const stories = storiesMod.studentStories;
  const masterclasses = [ag.default, dk.default, gvr.default];

  const llmsTxt = `# LevelUp Learning

> India's leading creative education ecosystem for filmmakers, editors, writers, and designers. Mentor-led live programs, on-demand masterclasses by India's top directors, and immersive residencies.

LevelUp Learning trains 18,000+ creators across India through three program tracks: Live Programs (mentor-led cohorts), Masterclasses (on-demand instruction from industry leaders), and The Forge (immersive multi-week residencies).

## Programs

- [LevelUp Video Editing Academy](${SITE_URL}/live/ve): Live mentor-led video editing program
- [The Forge](https://theforgebylevelup.com): Multi-week immersive filmmaking residency

## Masterclasses

${masterclasses
  .map((m) => `- [${m.name}](${SITE_URL}/masterclass/${m.slug}): ${m.seo.description}`)
  .join("\n")}

## Student Stories

${stories
  .map(
    (s) =>
      `- [${s.h1}](${SITE_URL}/student-stories/${s.slug}): ${s.metaDescription}`
  )
  .join("\n")}

## About

- [Careers](${SITE_URL}/careers): Open roles at LevelUp Learning
- [Terms](${SITE_URL}/terms)
- [Privacy Policy](${SITE_URL}/privacy-policy)

## Optional

- [Student Stories Index](${SITE_URL}/student-stories): All student transformation stories
`;

  let llmsFullTxt = `# LevelUp Learning — Full Content

${SITE_URL}

## Site Description

LevelUp Learning is India's leading creative education ecosystem for filmmakers, editors, writers, and designers. We offer mentor-led live programs, on-demand masterclasses by India's top directors, and immersive residencies. We've trained 18,000+ creators across India.

`;

  llmsFullTxt += `## Masterclasses\n\n`;
  for (const m of masterclasses) {
    llmsFullTxt += `### ${m.name}\n\nURL: ${SITE_URL}/masterclass/${m.slug}\n\n`;
    llmsFullTxt += `${m.courseDescription}\n\n`;
    llmsFullTxt += `**Discipline:** ${m.discipline}\n`;
    llmsFullTxt += `**Chapters:** ${m.courseDetails.chapters} | **Duration:** ${m.courseDetails.duration} | **Level:** ${m.courseDetails.level} | **Language:** ${m.courseDetails.language}\n\n`;
    if (m.lessons?.length) {
      llmsFullTxt += `**Lessons:**\n`;
      for (const l of m.lessons) {
        llmsFullTxt += `${l.number}. ${l.title} — ${l.description}\n`;
      }
      llmsFullTxt += `\n`;
    }
    if (m.faqs?.length) {
      llmsFullTxt += `**FAQs:**\n`;
      for (const f of m.faqs) {
        llmsFullTxt += `Q: ${f.question}\nA: ${f.answer}\n\n`;
      }
    }
    llmsFullTxt += `---\n\n`;
  }

  llmsFullTxt += `## Student Stories\n\n`;
  for (const s of stories) {
    llmsFullTxt += `### ${s.h1}\n\nURL: ${SITE_URL}/student-stories/${s.slug}\n\n`;
    llmsFullTxt += `**Author:** ${s.authorName}, ${s.authorRole}, ${s.location}\n`;
    llmsFullTxt += `**Program:** ${s.program}\n\n`;
    for (const sec of s.sections) {
      llmsFullTxt += `#### ${sec.heading}\n\n${sec.body}\n\n`;
    }
    llmsFullTxt += `${s.ctaText}\n\n---\n\n`;
  }

  const targets = [DIST];
  try {
    const { existsSync } = await import("node:fs");
    if (existsSync(VERCEL_STATIC)) targets.push(VERCEL_STATIC);
  } catch {}

  for (const dir of targets) {
    await writeFile(path.join(dir, "llms.txt"), llmsTxt, "utf8");
    await writeFile(path.join(dir, "llms-full.txt"), llmsFullTxt, "utf8");
  }

  console.log(
    `[llms.txt] Wrote llms.txt (${llmsTxt.length} bytes) and llms-full.txt (${llmsFullTxt.length} bytes) to ${targets.length} target(s)`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
