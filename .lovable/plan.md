

## Plan: Remove About, Add Student Stories to Nav, Rename `/reviews` to `/student-stories`

### 1. Remove "About" from navbar and footer

**`src/components/navbarData.ts`** — Remove the About entry from `navLinks` array (lines 146-150).

**`src/components/Navbar.tsx`** — Remove About from `navLabels` fallback array (line 16).

**`src/components/Footer.tsx`** — Remove the Company section entries that link to About (the Company category links to contact-us, not /about, so those stay). No About link exists in footer currently — confirmed.

### 2. Add "Student Stories" link to navbar

**`src/components/navbarData.ts`** — Add a new entry: `{ label: "Student Stories", href: "/student-stories", description: "", items: [] }` (simple link, no dropdown).

**`src/components/Navbar.tsx`** — Add matching entry to `navLabels` fallback.

### 3. Rename `/reviews` route to `/student-stories`

**`src/App.tsx`** — Change `<Route path="/reviews"` to `<Route path="/student-stories"`. Keep individual story routes at `/student-stories/:slug`.

**`src/pages/Reviews.tsx`** — Update `CANONICAL_URL` from `/reviews` to `/student-stories`.

**`src/pages/StudentStory.tsx`** — Update breadcrumb link and JSON-LD URLs from `/reviews` to `/student-stories`.

**`src/components/Footer.tsx`** — Change `{ label: "Reviews", href: "/reviews" }` to `{ label: "Student Stories", href: "/student-stories" }`.

**`src/components/TestimonialsSection.tsx`** — Update `<Link to="/reviews"` to `/student-stories`.

### Files modified
- `src/components/navbarData.ts`
- `src/components/Navbar.tsx`
- `src/components/Footer.tsx`
- `src/App.tsx`
- `src/pages/Reviews.tsx`
- `src/pages/StudentStory.tsx`
- `src/components/TestimonialsSection.tsx`

