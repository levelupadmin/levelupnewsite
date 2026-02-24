

# Improve Privacy Policy Page & Polish Both Legal Pages

## Part 1: Privacy Policy Page Improvements

### Changes to `src/pages/PrivacyPolicy.tsx`

**A. Add Table of Contents**
- Add a `tocSections` array for all 9 sections with `id` and `label`
- Render a styled TOC card (`bg-card border border-border rounded-lg p-6`) with anchor links, matching the Terms page pattern
- Add `id` attributes to each `<section>`

**B. Add section dividers**
- Add `border-b border-border pb-8 mb-8` to each section (last section excluded from border)

**C. Add floating Back to Top button**
- Import `useState` and `ArrowUp` from lucide-react
- Add scroll listener that shows button after 400px scroll
- Fixed button in bottom-right corner, same styling as Terms page

**D. Callout styling for key sections**
- Section 5 (Your Rights) gets a callout treatment to highlight user rights
- Section 9 (Contact Us) gets a subtle callout to make the email stand out

---

## Part 2: Additional Improvements for Both Pages

### E. Cross-link between legal pages
- On Terms page: add a note in the Privacy subsection (Section 1) linking to `/privacy-policy` with an internal `<a>` tag
- On Privacy Policy page: add a note at the top referencing "See also our Terms of Service" linking to `/terms`

### F. Print-friendly styling (both pages)
- Add a `print:` Tailwind variant to hide the navbar, footer, back-to-top button, and TOC when printing, so users get clean printed copies

### G. Active section highlighting in TOC (both pages)
- Use an `IntersectionObserver` to track which section is in view
- Highlight the corresponding TOC link with `text-primary font-medium` as the user scrolls
- Provides a subtle "you are here" indicator

### Technical Details
- **Files changed**: `src/pages/PrivacyPolicy.tsx`, `src/pages/Terms.tsx`
- **No new dependencies** -- uses Intersection Observer API (native browser), existing lucide-react icons, and Tailwind `print:` utilities

