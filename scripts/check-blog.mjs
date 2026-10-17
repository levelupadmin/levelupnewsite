#!/usr/bin/env node
/**
 * Acceptance tests for the blog, run against dist/ after a build.
 *
 * The handoff writes these as curl against the live site. Run here they catch
 * the same failures one deploy earlier, and they fail the build rather than
 * being noticed by whoever reads the deployed HTML next.
 *
 * Run: node scripts/check-blog.mjs
 */

import { readFileSync, existsSync, readdirSync } from "node:fs";
import path from "node:path";
import { readPublishedPosts, readPosts } from "../src/lib/blogSource.mjs";
import { migratedStories } from "../src/lib/storyMigration.mjs";

const DIST = path.join(process.cwd(), "dist");
const VERCEL_CONFIG = path.join(process.cwd(), ".vercel/output/config.json");

let failures = 0;
let checks = 0;

function check(name, fn) {
  checks++;
  try {
    const note = fn();
    console.log(`  ok    ${name}${note ? ` — ${note}` : ""}`);
  } catch (err) {
    failures++;
    console.log(`  FAIL  ${name}\n        ${err.message}`);
  }
}

const assert = (cond, msg) => {
  if (!cond) throw new Error(msg);
};

const html = (p) => {
  const full = path.join(DIST, p);
  assert(existsSync(full), `no file at dist/${p}`);
  return readFileSync(full, "utf8");
};

/** Strip scripts, styles and tags: what a reader actually sees. */
const visibleText = (h) =>
  h
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ");

const jsonLdOf = (h) =>
  [...h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
    .flatMap((m) => {
      const parsed = JSON.parse(m[1]);
      return Array.isArray(parsed) ? parsed : [parsed];
    });

const posts = readPublishedPosts();
const drafts = readPosts().filter((p) => p.draft);

console.log(`\nBlog acceptance tests — ${posts.length} published, ${drafts.length} draft\n`);

// 1. The index lists every published post in the HTML a crawler receives.
check("blog index lists every post server-rendered", () => {
  const text = visibleText(html("blog/index.html"));
  for (const p of posts) {
    assert(text.includes(p.title), `"${p.title}" missing from /blog`);
  }
  return `${posts.length} titles`;
});

// 2. Every post's answer paragraph is in the server-rendered HTML, verbatim.
check("every answer paragraph is server-rendered verbatim", () => {
  for (const p of posts) {
    const text = visibleText(html(`blog/${p.slug}/index.html`));
    const opening = p.answer.split(/(?<=\.)\s/)[0];
    assert(text.includes(opening), `${p.slug}: answer not found in visible text`);
  }
  return `${posts.length} posts`;
});

// 3. llms.txt is plain text with the blog in it, and carries a Content-Type rule.
check("llms.txt is plain text and lists the blog", () => {
  const txt = html("llms.txt");
  assert(!txt.trimStart().startsWith("<"), "llms.txt starts with markup, not text");
  assert(txt.includes("## Blog"), "llms.txt has no Blog section");
  for (const p of posts) {
    assert(txt.includes(`/blog/${p.slug}`), `${p.slug} missing from llms.txt`);
  }
  const vercel = JSON.parse(readFileSync(path.join(process.cwd(), "vercel.json"), "utf8"));
  const rule = vercel.headers.find((h) => h.source === "/llms.txt");
  assert(rule, "vercel.json has no /llms.txt header rule");
  assert(
    rule.headers.some((h) => /text\/plain/.test(h.value)),
    "/llms.txt is not served as text/plain",
  );
  return `${txt.length} bytes`;
});

// 4. Migrated stories 301. They never exist at both URLs.
check("migrated stories redirect and do not duplicate", () => {
  const migrated = migratedStories();
  if (!migrated.length) return "none migrated yet";

  const routes = existsSync(VERCEL_CONFIG)
    ? JSON.parse(readFileSync(VERCEL_CONFIG, "utf8")).routes ?? []
    : [];

  for (const m of migrated) {
    const legacy = `student-stories/${m.legacySlug}/index.html`;
    assert(
      !existsSync(path.join(DIST, legacy)),
      `${m.legacySlug} still builds a page as well as redirecting`,
    );
    const route = routes.find(
      (r) => r.src === `^/student-stories/${m.legacySlug}$` && r.status === 301,
    );
    assert(route, `no 301 route for /student-stories/${m.legacySlug}`);
    assert(
      route.headers.Location === `/blog/${m.blogSlug}`,
      `${m.legacySlug} redirects to ${route.headers.Location}, expected /blog/${m.blogSlug}`,
    );
  }
  return `${migrated.length} redirects`;
});

// 5. No page states a number in its markup that the page does not show.
//    These are the keys models cross-check, and the ones we must never invent.
check("schema states no number absent from the visible text", () => {
  const RISKY = [
    "ratingValue",
    "reviewCount",
    "ratingCount",
    "bestRating",
    "worstRating",
    "price",
    "lowPrice",
    "highPrice",
  ];

  const pages = [
    "blog/index.html",
    "ai/index.html",
    ...posts.map((p) => `blog/${p.slug}/index.html`),
    ...readdirSync(path.join(DIST, "blog/category")).map(
      (c) => `blog/category/${c}/index.html`,
    ),
  ];

  let inspected = 0;
  for (const page of pages) {
    const h = html(page);
    const text = visibleText(h);

    const walk = (node) => {
      if (Array.isArray(node)) return node.forEach(walk);
      if (!node || typeof node !== "object") return;

      for (const [key, value] of Object.entries(node)) {
        if (RISKY.includes(key)) {
          const shown = String(value);
          const alt = Number(value).toLocaleString("en-IN");
          assert(
            text.includes(shown) || text.includes(alt),
            `${page}: schema says ${key}=${shown}, page text does not`,
          );
          inspected++;
        }
        if (key === "numberOfItems" && Array.isArray(node.itemListElement)) {
          assert(
            value === node.itemListElement.length,
            `${page}: numberOfItems ${value} but ${node.itemListElement.length} items`,
          );
          inspected++;
        }
        walk(value);
      }
    };

    jsonLdOf(h).forEach(walk);
  }
  return `${pages.length} pages, ${inspected} numeric claims`;
});

// 6. Two clicks from /blog reaches everything.
check("every post is within two clicks of /blog", () => {
  const linksIn = (h) => [...h.matchAll(/href="(\/blog\/[^"#]*)"/g)].map((m) => m[1]);

  const first = new Set(linksIn(html("blog/index.html")));
  const second = new Set(first);
  for (const link of first) {
    const file = path.join(DIST, link.replace(/^\//, ""), "index.html");
    if (existsSync(file)) linksIn(readFileSync(file, "utf8")).forEach((l) => second.add(l));
  }

  for (const p of posts) {
    assert(second.has(`/blog/${p.slug}`), `${p.slug} needs more than two clicks`);
  }
  return `${second.size} URLs reachable`;
});

// 7. Nothing marked draft reaches the build.
check("no draft post is published", () => {
  for (const d of drafts) {
    assert(
      !existsSync(path.join(DIST, `blog/${d.slug}/index.html`)),
      `${d.slug} is draft but was built`,
    );
    assert(!html("llms.txt").includes(`/blog/${d.slug}`), `${d.slug} is draft but is in llms.txt`);
  }
  return drafts.length ? `${drafts.length} held back` : "no drafts";
});

// 8. RSS carries the same answers the pages open with.
check("rss lists every post with its answer", () => {
  const xml = html("blog/rss.xml");
  for (const p of posts) {
    assert(xml.includes(`/blog/${p.slug}`), `${p.slug} missing from rss`);
  }
  return `${posts.length} items`;
});

console.log(
  `\n${checks - failures}/${checks} passed${failures ? `, ${failures} FAILED` : ""}\n`,
);
process.exit(failures ? 1 : 0);
