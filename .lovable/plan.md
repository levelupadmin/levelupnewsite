

# Create Terms of Service Page

## What Changes
Create a new `/terms` page displaying the Terms of Service content, update the Footer "Terms" link to point to this internal route instead of the external URL, and register the route in `App.tsx`.

## Technical Steps

### 1. Create `src/pages/Terms.tsx`
- New page component following the same pattern as `About.tsx` (Navbar + main content + Footer)
- Render all the provided Terms of Service text with proper heading hierarchy (h1 for title, h2 for sections, h3 for subsections)
- Use existing typography classes (`font-sans-body`, `text-muted-foreground`, etc.) and consistent spacing
- Wrap content in a centered container (`max-w-4xl mx-auto px-6 py-16`)
- Scroll to top on mount

### 2. Update `src/App.tsx`
- Add lazy import: `const Terms = lazy(() => import("./pages/Terms"));`
- Add route: `<Route path="/terms" element={<Terms />} />` above the catch-all

### 3. Update `src/components/Footer.tsx`
- Change the "Terms" link under Support from `"https://www.leveluplearning.in/terms-and-conditions"` to `"/terms"`
- Change the bottom "Terms" link (line ~113) from the external URL to `"/terms"`
- Convert both from `<a>` tags to React Router `<Link>` components (or keep as `<a>` with internal href since the app uses react-router)

