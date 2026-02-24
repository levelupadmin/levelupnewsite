

# Create Privacy Policy Page

## What Changes
Create a new `/privacy-policy` page displaying the provided Privacy Policy content, update Footer links to point to this internal route, and register the route in `App.tsx`.

## Technical Steps

### 1. Create `src/pages/PrivacyPolicy.tsx`
- Follow the exact same pattern as `Terms.tsx` (Navbar + centered content + Footer)
- Use `max-w-4xl mx-auto px-6 py-20 md:py-28` container
- Render all 9 sections with proper heading hierarchy (h1 title, h2 sections) and bullet lists using `<ul>` elements
- Include "Effective Date: 28th August 2025" subtitle
- Scroll to top on mount via `useEffect`

### 2. Update `src/App.tsx`
- Add lazy import: `const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));`
- Add route: `<Route path="/privacy-policy" element={<PrivacyPolicy />} />` above the catch-all

### 3. Update `src/components/Footer.tsx`
- Change "Privacy Policy" href in the Support links (line 23) from external URL to `"/privacy-policy"`
- Change bottom "Privacy Policy" link (line 109) from external URL to `"/privacy-policy"` and remove `target="_blank"` and `rel` attributes

