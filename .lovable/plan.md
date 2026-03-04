

## Add SEO-Optimized Student Stories Editorial Section

### What we're building

A new "Student Stories" blog-style editorial section integrated into the Wall of Love, featuring 18 long-form articles parsed from the uploaded DOCX. Each article gets its own dedicated page with full SEO markup, and the Wall of Love page gets a prominent "Student Stories" section linking to them.

### Architecture

```text
/reviews                          ← existing Wall of Love (add stories section)
/student-stories/:slug            ← individual article pages (18 articles)
```

### Data layer

**New file: `src/data/studentStories.ts`**
- Export an array of 18 story objects, each containing:
  - `slug` (URL-friendly), `seoTitle`, `metaDescription`, `targetKeywords` (array), `h1`, `authorName`, `authorRole`, `location`, `rating`, `program`, `sections` (array of `{heading, body}` pairs), `ctaText`, `ctaProgram`
- All content manually transcribed from the DOCX into this structured format
- This is a static data file — no runtime parsing needed

### New components

**`src/pages/StudentStory.tsx`** — Individual article page
- Full SEO: dynamic `<title>`, meta description, canonical URL, JSON-LD `Article` schema with author, datePublished, publisher
- GEO signals: location mentioned in structured data and content
- Layout: Navbar, hero with author info + program badge, article body with proper H1/H2 semantic headings, pull-quote styling, CTA banner at bottom, "More Stories" carousel, Footer
- Matches the warm editorial `.theme-reviews` aesthetic
- Reading time estimate displayed
- Breadcrumb navigation: Home → Wall of Love → Story Title
- Schema.org `BreadcrumbList` JSON-LD

**`src/pages/StudentStoriesIndex.tsx`** — Stories listing page (optional, linked from Reviews)
- Grid of story cards with title, author, program badge, excerpt
- Filterable by program

**`src/components/stories/StoryCard.tsx`** — Reusable card for linking to individual stories
- Thumbnail-style card with headline, author, program badge, excerpt
- Used on both the Reviews page and the stories index

### Integration with Wall of Love

- Add a "Student Stories" section on `/reviews` between the Featured Reviews and the filter bar
- Shows 3-4 story cards in a horizontal scroll or grid
- "Read all stories →" link to `/student-stories`

### Routing changes in `src/App.tsx`

- Add lazy imports for `StudentStory` and `StudentStoriesIndex`
- Add routes: `/student-stories` (index) and `/student-stories/:slug` (individual)

### SEO specifics per article (from the DOCX)

Each article includes:
- Unique SEO title tag (60-70 chars)
- Meta description (150-160 chars)
- 5-6 target keywords baked into headings and body
- Unique URL slug under `/student-stories/`
- Location signals (Kerala, Delhi, Chennai, etc.) for GEO
- Program-specific CTA at the bottom
- JSON-LD `Article` schema

### Files to create/modify

| File | Action |
|------|--------|
| `src/data/studentStories.ts` | **Create** — all 18 articles as structured data |
| `src/pages/StudentStory.tsx` | **Create** — individual article page |
| `src/pages/StudentStoriesIndex.tsx` | **Create** — stories listing/index page |
| `src/components/stories/StoryCard.tsx` | **Create** — reusable story card |
| `src/App.tsx` | **Modify** — add 2 new routes |
| `src/pages/Reviews.tsx` | **Modify** — add Student Stories section |
| `src/index.css` | **Modify** — add article typography styles if needed |

### Styling approach

- Reuse `.theme-reviews` warm editorial aesthetic
- Article body: `prose`-like styling with `font-sans-body`, proper heading hierarchy
- Pull quotes styled with left border accent + italic
- Program-specific color accents (reuse existing `PROGRAM_BORDER_COLORS` map)

### Implementation order

1. Create `studentStories.ts` data file (largest task — all 18 articles)
2. Create `StoryCard` component
3. Create `StudentStory` page
4. Create `StudentStoriesIndex` page
5. Update `App.tsx` routes
6. Add stories section to `Reviews.tsx`

