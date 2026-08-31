import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;
export type CategorySlug = Post['data']['category'];
export type PostType = Post['data']['type'];

export interface Category {
  slug: CategorySlug;
  label: string;
  /** Rendered under the H1 on the category index. Plain, no claims. */
  standfirst: string;
}

export const CATEGORIES: Category[] = [
  {
    slug: 'filmmaking',
    label: 'Filmmaking',
    standfirst:
      'What it costs to train as a filmmaker in India, what the job is actually like, and what people who made the switch did.',
  },
  {
    slug: 'screenwriting',
    label: 'Screenwriting',
    standfirst:
      'Writing for Indian screens: what producers expect on the page, what the work pays, and where to learn it.',
  },
  {
    slug: 'editing',
    label: 'Video Editing',
    standfirst:
      'Editing as a career in India: pay by experience and niche, the software people actually use, and how to train for it.',
  },
  {
    slug: 'creator',
    label: 'Creators',
    standfirst:
      'How creators in India build an audience and get paid for it, and which courses are worth the money.',
  },
  {
    slug: 'communication',
    label: 'Communication',
    standfirst:
      'Speaking, presence and the skills that decide who gets heard at work.',
  },
];

export const CATEGORY_BY_SLUG: Record<CategorySlug, Category> = Object.fromEntries(
  CATEGORIES.map((c) => [c.slug, c]),
) as Record<CategorySlug, Category>;

export const TYPE_LABEL: Record<PostType, string> = {
  decision: 'Comparison',
  craft: 'Craft',
  story: 'Student story',
};

/**
 * Where a `programme` slug points. There are no /programmes/ pages on this
 * domain: LevelUp's programme pages live on leveluplearning.live and
 * creators.forgebylevelup.com, plus two on-site pages. Keep this the single
 * place that knows, so a programme moving is one edit rather than thirty.
 */
export interface Programme {
  name: string;
  url: string;
}

export const PROGRAMMES: Record<string, Programme> = {
  'forge-filmmaking': {
    name: 'The Forge: Filmmaking Residency',
    url: 'https://creators.forgebylevelup.com/filmmaking',
  },
  'forge-writing': {
    name: 'The Forge: Writing Retreat',
    url: 'https://creators.forgebylevelup.com/writing',
  },
  'forge-creators': {
    name: 'The Forge: Creator Residency',
    url: 'https://creators.forgebylevelup.com/',
  },
  'video-editing-academy': {
    name: 'LevelUp Video Editing Academy',
    url: '/live/ve',
  },
  'executive-presence': {
    name: 'LevelUp Executive Presence Cohort',
    url: '/communication',
  },
  'breakthrough-filmmakers': {
    name: "Breakthrough Filmmakers' Program",
    url: 'https://www.leveluplearning.live/bfp-2',
  },
  'screenwriting-workshop': {
    name: 'Screenwriting Workshop',
    url: 'https://www.leveluplearning.live/sw',
  },
  'creator-academy': {
    name: 'The LevelUp Creator Academy',
    url: 'https://www.leveluplearning.live/creator-academy',
  },
  'uiux-academy': {
    name: 'UI/UX Design Academy',
    url: 'https://www.leveluplearning.live/uiux-academy',
  },
  'advanced-cinematography': {
    name: 'Advanced Cinematography Program',
    url: 'https://www.leveluplearning.in/acp-2',
  },
};

export const programmeFor = (slug?: string): Programme | null =>
  (slug && PROGRAMMES[slug]) || null;

export const postPath = (post: Post) => `/blog/${post.id}`;

const byNewest = (a: Post, b: Post) =>
  b.data.publishDate.valueOf() - a.data.publishDate.valueOf();

/**
 * Every post the site publishes. Drafts never leave the repo: they are dropped
 * here rather than in each template, so there is one place to get it wrong.
 */
export async function getPosts(): Promise<Post[]> {
  const all = await getCollection('blog', ({ data }) => data.draft !== true);
  return all.sort(byNewest);
}

export async function getPostsIn(category: CategorySlug): Promise<Post[]> {
  return (await getPosts()).filter((p) => p.data.category === category);
}

/** The one decision page for a category, if it has been written yet. */
export async function decisionFor(category: CategorySlug): Promise<Post | null> {
  const posts = await getPostsIn(category);
  return posts.find((p) => p.data.type === 'decision') ?? null;
}

export interface Related {
  /** Decision page for this post's category. Null on the decision page itself. */
  decision: Post | null;
  /** Craft articles in the same category, never including this post. */
  craft: Post[];
  /** Student stories in the same category, never including this post. */
  stories: Post[];
  programme: Programme | null;
}

/**
 * Every internal link on a post, computed from frontmatter. Nothing here is
 * hand-maintained: give a post the right category and it appears in the right
 * places on every other post automatically.
 */
export async function relatedFor(post: Post): Promise<Related> {
  const siblings = (await getPostsIn(post.data.category)).filter(
    (p) => p.id !== post.id,
  );

  const decision =
    post.data.type === 'decision'
      ? null
      : siblings.find((p) => p.data.type === 'decision') ?? null;

  const craft = siblings.filter((p) => p.data.type === 'craft');
  const stories = siblings.filter((p) => p.data.type === 'story');

  return {
    decision,
    craft,
    stories,
    programme: programmeFor(post.data.programme),
  };
}

export interface Crumb {
  name: string;
  path: string;
}

export function breadcrumbsFor(post: Post): Crumb[] {
  const category = CATEGORY_BY_SLUG[post.data.category];
  return [
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: category.label, path: `/blog/category/${category.slug}` },
    { name: post.data.title, path: postPath(post) },
  ];
}

/** en-GB long form, e.g. "1 September 2026". Same string in text and schema. */
export const formatDate = (d: Date) =>
  d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

/** YYYY-MM-DD for datetime attributes and JSON-LD. */
export const isoDate = (d: Date) => d.toISOString().slice(0, 10);
