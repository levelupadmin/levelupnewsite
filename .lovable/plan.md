

## Rebuild Masterclass Detail Page to Match Webflow HTML

The current `MasterclassDetail.tsx` is a generic template. The Webflow HTML reveals a very specific layout with exact content, lesson data, testimonials, benefits, and pricing structure. I'll rebuild the page to match it precisely.

### Sections (in order from the HTML)

1. **Hero** — "Teaches" + "Photography" headings, two CTA buttons ("WATCH TRAILER" / "SUBSCRIBE FOR ₹499"), pull quote about light, course description paragraph
2. **Class Info + Lesson Accordion** — YouTube trailer embed, scrollable accordion of 21 lessons (with lesson number, title, and description for each)
3. **Portfolio Showcase** — "Learn From The Photographer Behind These Splendid Shots" with image ticker/carousel (placeholder for now — user will provide assets)
4. **Who Is This Program For?** — Portrait image left, 6 audience cards right: Model Photographers, Cinematographers, Food Photographers, Wildlife Photographers, Cinephiles, Cinema Aspirants. CTA button below.
5. **Why This Masterclass** — 3 numbered value-prop blocks in a vertical timeline layout (video/image left, text right, alternating sides). Content:
   - "Learn essential lighting techniques you need for photography"
   - "Elevate your photography Skill by understanding essential techniques, settings, and principles."
   - "Understand the necessity of thorough preproduction and detailing before photoshoot."
6. **Certificate of Completion** — Two-column: left has heading, 3 bullet points (showcase on social, download PDF, share as image), CTA button. Right has certificate image (placeholder).
7. **Testimonials** — "This makes our heart beat faster every day" with star rating image, 3 testimonial cards (Lisa M / Actor, Janani / Theater Artist, Prathyaksh / Director) with exact quotes from the HTML.
8. **Benefits Grid** — 4-card grid: PDF workbook, 4+ hours content, Exclusive workshops, Signed certificate
9. **Watch on Any Device** — "Watch on any Device", "Pay Once, Play Forever", "Get Certified", "Learn at your own Pace" with device mockup center (placeholder), App Store/Play Store badges
10. **Pricing CTA** — "Grab the offer while it lasts..." with "1800+ Students have attended", "What you'll get..." bullet list, right side has instructor image card with "SUBSCRIBE FOR ₹499"
11. **FAQ Section** — 9 real FAQs from the HTML with exact questions and answers
12. **Footer CTA** — Orange gradient bar: "What are you waiting for? Learn Photography with Venket today!" with CTA button and sitting image

### Data changes (`src/data/masterclassPages.ts`)

- Add `lessons` array (21 entries with lesson number, title, description)
- Add `testimonials` array (3 entries with name, role, quote)
- Add `audienceTargets` updated to: Model Photographers, Cinematographers, Food Photographers, Wildlife Photographers, Cinephiles, Cinema Aspirants
- Add `benefits` array (4 items)
- Add `deviceFeatures` array (4 items)
- Add `pricingPoints` array (6 bullet items)
- Update `faqs` with 9 real FAQs from the HTML
- Update `valueProps` with exact 3 items from HTML
- Update `courseDetails` to 25 video lessons, 3h 20m
- Update price to ₹499
- Add `trailerUrl` (YouTube embed URL)
- Add `studentCount` ("1800+")

### Page component changes (`src/pages/MasterclassDetail.tsx`)

Complete rewrite to match the 12-section layout above. Key implementation details:

- **Lesson accordion**: Use Radix `Accordion` component, scrollable container with custom scrollbar styling, lesson number label + bold title
- **Timeline value props**: Numbered dots (1, 2, 3) with connecting vertical line, alternating image/text sides
- **Benefits grid**: 4-column grid of icon + text cards
- **Device section**: 3-column layout (2 feature cards | device image | 2 feature cards) with app store badges
- **Pricing section**: 2-column — left with heading, student count badge, bullet list; right with gradient-bordered card containing instructor image and CTA
- **All CTA buttons**: Link to `https://study.leveluplearning.in/l/6eefb60912` with text "SUBSCRIBE FOR ₹499"

### Files Modified
- `src/data/masterclassPages.ts` — expanded data structure with lessons, testimonials, benefits, real FAQs, pricing points
- `src/pages/MasterclassDetail.tsx` — full rewrite to match Webflow layout

