import type { APIRoute } from "astro";
import { getPosts, postPath } from "@/lib/blog";
import { SITE_URL } from "@/lib/constants";

/**
 * RSS for the blog. Hand-written rather than pulled from @astrojs/rss, because
 * the feed is thirty lines and adding a package to this repo is a decision
 * worth someone signing off on rather than a side effect of a feed.
 *
 * The description of each item is the post's answer, the same sentences the
 * page opens with.
 */

const CHANNEL_TITLE = "LevelUp Learning Blog";
const CHANNEL_DESCRIPTION =
  "Honest comparisons of creative courses in India, what these crafts actually pay, and what people who retrained did next.";

const escape = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

export const GET: APIRoute = async () => {
  const posts = await getPosts();

  const items = posts
    .map((post) => {
      const url = `${SITE_URL}${postPath(post)}`;
      return `    <item>
      <title>${escape(post.data.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escape(post.data.answer)}</description>
      <category>${escape(post.data.category)}</category>
      <pubDate>${post.data.publishDate.toUTCString()}</pubDate>
    </item>`;
    })
    .join("\n");

  const latest = posts[0]?.data.publishDate;

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(CHANNEL_TITLE)}</title>
    <link>${SITE_URL}/blog</link>
    <description>${escape(CHANNEL_DESCRIPTION)}</description>
    <language>en-in</language>
    <atom:link href="${SITE_URL}/blog/rss.xml" rel="self" type="application/rss+xml" />${
      latest ? `\n    <lastBuildDate>${latest.toUTCString()}</lastBuildDate>` : ""
    }
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
};
