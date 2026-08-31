import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * A URL field that also tolerates "". Migration stubs are written with empty
 * strings rather than by dropping the key, and an empty string must reach the
 * story gate below as "missing" instead of dying on a zod url error, or the
 * build reports a formatting problem when the real problem is an unverified
 * testimonial.
 */
const urlOrEmpty = z
  .union([z.string().url(), z.literal('')])
  .optional();

const student = z.object({
  name: z.string(),
  before: z.string(),
  after: z.string(),
  city: z.string().optional(),
  programme: z.string(),
  profileUrl: urlOrEmpty,
  filmUrl: urlOrEmpty,
  unverified: z.boolean().default(false),
});

const source = z.object({
  label: z.string(),
  url: z.string().url(),
  checked: z.coerce.date(),
});

const post = z.object({
  title: z.string(),
  description: z.string().max(160),
  type: z.enum(['decision', 'craft', 'story']),
  category: z.enum([
    'filmmaking',
    'screenwriting',
    'editing',
    'creator',
    'communication',
  ]),
  publishDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  targetQuery: z.string(),
  /**
   * Two to four plain sentences answering targetQuery, written to be lifted
   * verbatim. Rendered as the opening paragraph, used as the meta description
   * fallback, as the FAQ schema answer, and in llms.txt. Never empty.
   */
  answer: z.string(),
  programme: z.string().optional(),
  featured: z.boolean().default(false),
  draft: z.boolean().default(false),
  student: student.optional(),
  sources: z.array(source).default([]),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  /**
   * The story gate. A testimonial nobody can check is the exact thing AI
   * assistants discount to zero, so publishing one has to be a deliberate act
   * rather than an oversight: a story needs a profileUrl, or an explicit
   * unverified: true.
   */
  schema: post.superRefine((data, ctx) => {
    if (data.type !== 'story') return;

    if (!data.student) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['student'],
        message:
          'A post with type: "story" needs a student block. Add student.name, before, after and programme.',
      });
      return;
    }

    if (!data.student.profileUrl && !data.student.unverified) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['student', 'profileUrl'],
        message:
          `Story "${data.title}" has no student.profileUrl. Add a link a reader can check ` +
          '(LinkedIn, Instagram, IMDb), or set student.unverified: true to publish it anyway. ' +
          'An unverifiable testimonial is worth less than no testimonial.',
      });
    }
  }),
});

export const collections = { blog };
