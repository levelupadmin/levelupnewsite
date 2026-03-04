

## Wall of Love Page — SEO-First Build

### On-Page SEO (Priority)

This page will be built with strong on-page SEO from the start, addressing common gaps in Lovable projects.

**HTML Head / Meta Tags**
- Custom `<title>`: "Student Reviews & Testimonials | LevelUp Learning"
- Meta description targeting review-related search queries
- Open Graph + Twitter Card tags with a custom image
- Canonical URL (`/reviews`)

**Semantic HTML Structure**
- Proper heading hierarchy: single `<h1>` for the page title, `<h2>` for subsections
- `<article>` elements wrapping each review card for rich content semantics
- `<blockquote>` for testimonial quotes with `cite` attributes
- `<figure>` + `<figcaption>` for avatar/name pairs
- `aria-label` on filter controls and interactive elements

**Structured Data (JSON-LD)**
- Inject a `<script type="application/ld+json">` block with `Review` schema markup for each testimonial
- Include `itemReviewed` (LevelUp Learning), `author`, `reviewRating`, and `reviewBody`
- This enables Google rich snippets (star ratings in search results)

**Content & Keyword Targeting**
- Descriptive intro paragraph with natural keyword usage ("creative education reviews", "filmmaking course testimonials")
- Each review card shows the program name as visible text (helps topical relevance)
- "Read more" expansion keeps full review text in the DOM (not hidden from crawlers)

**Performance for SEO**
- Images use `loading="lazy"`, `width`/`height` attributes, and `alt` text with name + program
- Page added to React Router as a lazy-loaded route (keeps bundle impact minimal)
- Internal links from Footer and homepage Testimonials section ("See all reviews") for crawl discoverability

---

### Page Structure (Inspired by TripleTen)

**1. Hero Section**
- `<h1>`: "Wall of Love" with subtitle about real student feedback
- Rating summary badges row (e.g., "4.9/5 from 500+ creators") — static for now, can be made dynamic later

**2. Sticky Filter Bar**
- Horizontal pill chips: All, Masterclasses, BFP, Video Editing, UI/UX, Screenwriting, The Forge
- Filters testimonials by `program` field
- Uses `role="tablist"` / `role="tab"` for accessibility

**3. Reviews Grid**
- Masonry-style layout (CSS columns, 2 cols desktop / 1 col mobile)
- Each card: avatar, name, role, program tag, 5-star rating, pull quote, expandable full story
- Cards use existing dark theme (`bg-card`, `border-border`, amber hover glow)
- Fade-in on scroll via existing `FadeInSection`

**4. CTA at Bottom**
- "Ready to start your journey?" with link to explore programs

---

### Files

| File | Action |
|------|--------|
| `src/data/testimonials.ts` | **Create** — shared testimonial data with `program`, `rating` fields |
| `src/pages/Reviews.tsx` | **Create** — full page with SEO meta, JSON-LD, hero, filters, grid |
| `src/App.tsx` | **Edit** — add `/reviews` route |
| `src/components/TestimonialsSection.tsx` | **Edit** — import from shared data, add "See all reviews" link |
| `src/components/Footer.tsx` | **Edit** — add "Reviews" link under Learn |
| `index.html` | No change needed — meta tags will be set via `document.head` in the component using `useEffect` |

### SEO Meta Implementation

Since this is a client-side React app without SSR, meta tags will be set via a `useEffect` in `Reviews.tsx` that updates `document.title` and injects/updates meta tags in `document.head`. The JSON-LD script tag will also be injected this way. This is the standard approach for Vite+React SPAs and works with Google's rendering pipeline.

