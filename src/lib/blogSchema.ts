import { SITE_URL } from "./constants";
import {
  CATEGORY_BY_SLUG,
  breadcrumbsFor,
  isoDate,
  postPath,
  programmeFor,
  type Post,
} from "./blog";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd } from "./structuredData";

/**
 * Schema on these pages is derived from what the page visibly says, never
 * authored separately. A model that cross-checks markup against text is doing
 * the thing these pages exist to survive, so a contradiction is worse than no
 * markup at all. Nothing here invents a number: no AggregateRating, no price,
 * no seat count. FAQ answers and compared options are lifted from the rendered
 * body word for word.
 */

export interface Faq {
  question: string;
  answer: string;
}

const stripInline = (s: string) =>
  s
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1") // [label](url) -> label
    .replace(/\*\*/g, "")
    .replace(/`/g, "")
    .trim();

const isHeading = (line: string) => /^#{1,6}\s/.test(line);

/**
 * Pull question and answer pairs out of the FAQ block: a heading whose text
 * mentions questions or FAQ, then bold one-line questions each followed by a
 * paragraph. Returns [] when a post has no FAQ block, and the caller then emits
 * no FAQPage rather than a hollow one.
 */
export function extractFaqs(body: string): Faq[] {
  const lines = body.split("\n");
  const start = lines.findIndex(
    (l) => isHeading(l) && /questions|faq/i.test(l.replace(/^#{1,6}\s*/, "")),
  );
  if (start === -1) return [];

  const faqs: Faq[] = [];
  let question: string | null = null;
  let answer: string[] = [];

  const flush = () => {
    if (question && answer.length) {
      faqs.push({ question, answer: answer.join(" ").trim() });
    }
    question = null;
    answer = [];
  };

  for (let i = start + 1; i < lines.length; i++) {
    const line = lines[i];
    if (isHeading(line)) break;

    const asked = line.trim().match(/^\*\*(.+\S)\*\*$/);
    if (asked) {
      flush();
      question = stripInline(asked[1]);
      continue;
    }

    if (!line.trim()) {
      if (question && answer.length) flush();
      continue;
    }

    if (question) answer.push(stripInline(line));
  }
  flush();

  return faqs;
}

/**
 * The first column of the first table in the body: the options a decision page
 * compares. Names only. The fees sit in the other columns and stay there,
 * because a fee in markup is a claim we would have to keep in step with the
 * table by hand.
 */
export function extractComparedOptions(body: string): string[] {
  const lines = body.split("\n").map((l) => l.trim());
  const head = lines.findIndex(
    (l, i) =>
      l.startsWith("|") &&
      lines[i + 1] !== undefined &&
      /^\|[\s:|-]+\|$/.test(lines[i + 1]),
  );
  if (head === -1) return [];

  const options: string[] = [];
  for (let i = head + 2; i < lines.length; i++) {
    const line = lines[i];
    if (!line.startsWith("|")) break;
    const first = line.split("|")[1];
    if (first === undefined) break;
    const name = stripInline(first);
    if (name) options.push(name);
  }
  return options;
}

const itemListJsonLd = (name: string, path: string, options: string[]) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  name,
  url: `${SITE_URL}${path}`,
  numberOfItems: options.length,
  itemListElement: options.map((option, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: option,
  })),
});

/** Course node for a story's `about`. Name and URL only: no price on the page,
 *  so no offers in the markup. */
const courseAboutJsonLd = (programmeSlug?: string) => {
  const programme = programmeFor(programmeSlug);
  if (!programme) return null;
  return {
    "@type": "Course",
    name: programme.name,
    url: programme.url.startsWith("http")
      ? programme.url
      : `${SITE_URL}${programme.url}`,
    provider: {
      "@type": "Organization",
      name: "LevelUp Learning",
      sameAs: SITE_URL,
    },
  };
};

export function postJsonLd(post: Post): Record<string, unknown>[] {
  const { data } = post;
  const path = postPath(post);
  const category = CATEGORY_BY_SLUG[data.category];

  const article: Record<string, unknown> = articleJsonLd({
    title: data.title,
    description: data.description,
    path,
    authorName: "LevelUp Learning",
    datePublished: isoDate(data.publishDate),
    dateModified: data.updatedDate ? isoDate(data.updatedDate) : undefined,
  });

  // The answer paragraph opens the page, so it is safe as the article abstract.
  article.abstract = data.answer;
  article.articleSection = category.label;

  const graph: Record<string, unknown>[] = [
    article,
    breadcrumbJsonLd(breadcrumbsFor(post)),
  ];

  if (data.type === "decision") {
    const options = extractComparedOptions(post.body ?? "");
    if (options.length) {
      graph.push(itemListJsonLd(`${data.title}: options compared`, path, options));
    }
    const faqs = extractFaqs(post.body ?? "");
    if (faqs.length) graph.push(faqJsonLd(faqs));
  }

  if (data.type === "story") {
    const about = courseAboutJsonLd(data.programme);
    if (about) article.about = about;
  }

  return graph;
}
