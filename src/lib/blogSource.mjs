import { readFileSync, readdirSync, existsSync } from "node:fs";
import path from "node:path";

/**
 * The blog collection, read straight off disk.
 *
 * Two things run before Astro's content collection exists: astro.config.mjs,
 * which needs the story redirects, and the postbuild llms.txt script, which
 * runs after the build in a plain Node process. Both need the same frontmatter,
 * so it is parsed once here.
 *
 * The parser is deliberately narrow. Every field it reads is a single-line
 * scalar, plus the one nested `student` block. It does not try to be YAML, and
 * readPosts() throws rather than skipping a file it cannot understand, so a
 * post can never fall silently out of llms.txt or out of a redirect.
 *
 * Paths come from process.cwd(), not from import.meta.url. Vite gives this
 * module a different import.meta.url when it runs inside getStaticPaths than
 * when it runs while rendering, which pointed the directory somewhere that did
 * not exist and quietly produced no posts at all. Astro, npm scripts and the
 * config all run from the project root, and a wrong directory now throws.
 */

export const ROOT = process.cwd();
const BLOG_DIR = path.join(ROOT, "src/content/blog");

const unquote = (v) => v.trim().replace(/^["']([\s\S]*)["']$/, "$1");

/** Read one single-line scalar out of a frontmatter block. */
export function field(block, key) {
  const m = block.match(new RegExp(`^[ \\t]*${key}:[ \\t]*(.+?)[ \\t]*$`, "m"));
  return m ? unquote(m[1]) : null;
}

const REQUIRED = ["title", "description", "type", "category", "targetQuery", "answer"];

export function readPosts() {
  if (!existsSync(BLOG_DIR)) {
    throw new Error(
      `[blogSource] No blog directory at ${BLOG_DIR}. Run from the project root: ` +
        "returning no posts here would silently drop every post from llms.txt and " +
        "leave migrated stories live at both their old and new URLs.",
    );
  }

  const files = readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));

  return files.map((file) => {
    const raw = readFileSync(path.join(BLOG_DIR, file), "utf8");
    const fm = raw.match(/^---\n([\s\S]*?)\n---/);
    if (!fm) {
      throw new Error(`[blogSource] ${file} has no frontmatter block.`);
    }
    const block = fm[1];

    const post = {
      slug: file.replace(/\.md$/, ""),
      title: field(block, "title"),
      description: field(block, "description"),
      type: field(block, "type"),
      category: field(block, "category"),
      targetQuery: field(block, "targetQuery"),
      answer: field(block, "answer"),
      programme: field(block, "programme"),
      publishDate: field(block, "publishDate"),
      draft: field(block, "draft") === "true",
      studentName: null,
    };

    const missing = REQUIRED.filter((k) => !post[k]);
    if (missing.length) {
      throw new Error(
        `[blogSource] ${file} is missing ${missing.join(", ")}. ` +
          "Every post needs these, and a scalar written across several lines cannot be read here.",
      );
    }

    // student.name sits one level in; the block runs to the next top-level key.
    const studentBlock = block.match(/^student:\n((?:[ \t]+.*\n?)*)/m);
    if (studentBlock) post.studentName = field(studentBlock[1], "name");

    return post;
  });
}

/** Published posts, newest first. Drafts never reach a reader or a crawler. */
export function readPublishedPosts() {
  return readPosts()
    .filter((p) => !p.draft)
    .sort((a, b) => String(b.publishDate).localeCompare(String(a.publishDate)));
}
