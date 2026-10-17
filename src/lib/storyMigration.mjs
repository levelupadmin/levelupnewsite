import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { ROOT, readPublishedPosts } from "./blogSource.mjs";

/**
 * Which student stories have moved from /student-stories/<slug> to /blog/<slug>.
 *
 * Derived, not listed. A story is migrated when a published post of type
 * "story" exists whose student.name matches the authorName of one of the 18
 * legacy entries. That pairing decides two things at once: the 301 emitted from
 * astro.config.mjs, and the legacy page dropped from getStaticPaths. They can
 * never disagree, so the old URL is never live alongside the new one and never
 * dead before it.
 *
 * Plain .mjs, because astro.config.mjs loads before the content collection or
 * any TypeScript is available. Frontmatter comes from blogSource.mjs.
 */

const LEGACY_FILE = path.join(ROOT, "src/data/studentStories.ts");

/** Published story posts, as { blogSlug, name }. */
function publishedStories() {
  return readPublishedPosts()
    .filter((p) => p.type === "story" && p.studentName)
    .map((p) => ({ blogSlug: p.slug, name: p.studentName }));
}

/** The 18 existing stories, as { legacySlug, authorName }. */
function legacyStories() {
  if (!existsSync(LEGACY_FILE)) {
    throw new Error(
      `[storyMigration] No student stories data at ${LEGACY_FILE}. Without it a migrated ` +
        "story cannot be paired with the URL it must redirect from.",
    );
  }
  const src = readFileSync(LEGACY_FILE, "utf8");

  const slugs = [...src.matchAll(/^\s*slug:\s*"([^"]+)"/gm)].map((m) => m[1]);
  const authors = [...src.matchAll(/^\s*authorName:\s*"([^"]+)"/gm)].map((m) => m[1]);

  // One authorName per slug, in file order. If that ever stops holding, the
  // pairing below is wrong, so refuse rather than emit bad redirects.
  if (slugs.length !== authors.length) {
    throw new Error(
      `[storyMigration] studentStories.ts has ${slugs.length} slugs but ${authors.length} authorNames. ` +
        "Every story needs both, in the same order, or migrations cannot be paired.",
    );
  }

  return slugs.map((legacySlug, i) => ({ legacySlug, authorName: authors[i] }));
}

const normalise = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

export function migratedStories() {
  const legacy = legacyStories();

  return publishedStories().map((post) => {
    const match = legacy.find((l) => normalise(l.authorName) === normalise(post.name));

    if (!match) {
      throw new Error(
        `[storyMigration] Published story "${post.blogSlug}" names student "${post.name}", ` +
          "who matches none of the existing stories in src/data/studentStories.ts. " +
          "Either the name differs from the legacy authorName, or this story is new rather " +
          "than migrated. A migrated story must 301 its old URL; a new one should not be " +
          "named after someone who already has a page.",
      );
    }

    return { legacySlug: match.legacySlug, blogSlug: post.blogSlug, name: post.name };
  });
}

/** Legacy slugs that must stop building their own page. */
export function migratedLegacySlugs() {
  return new Set(migratedStories().map((m) => m.legacySlug));
}

/** `{ '/student-stories/x': { status: 301, destination: '/blog/y' } }` */
export function storyRedirects() {
  return Object.fromEntries(
    migratedStories().map((m) => [
      `/student-stories/${m.legacySlug}`,
      { status: 301, destination: `/blog/${m.blogSlug}` },
    ]),
  );
}
