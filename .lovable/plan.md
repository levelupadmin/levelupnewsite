

## Plan: Expand "Our Students Come From" with 25+ New Logos

### What's Changing

Adding **27 new organization logos** across Indian tech companies, consumer brands, and premier institutions. Adding a **third marquee row** and increasing scroll speed from 60s to 40s per cycle.

### New Logos (27 total)

**Tech Companies (9):** Microsoft, Meta, Flipkart, Infosys, TCS, Wipro, Zoho, Swiggy, Razorpay

**Consumer/Media (7):** Tata, Reliance, ITC, Hindustan Unilever, Sony Pictures, Star India, Zee

**Institutions (11):** IIT, IIM, NIFT, SRFTI, Symbiosis, Christ University, Manipal, MICA, Pearl Academy, Ashoka University, ISB

### Technical Approach

Since we can't download raster logos, each new logo will be a **clean SVG text mark** — white text on transparent background, styled to match the muted/grayscale aesthetic of the existing marquee. This is the same approach used for the press logos (ABN, YourStory, Outlook India SVGs already in the codebase).

### File Changes

1. **Create 27 SVG files** in `src/assets/logos/` — one per organization, using appropriate serif/sans-serif fonts and letter-spacing to approximate each brand's wordmark style.

2. **`src/components/StudentLogosSection.tsx`** — Import all 27 new logos, expand brands array to ~39 total, split into 3 rows of ~13 each, add third marquee row (left, right, left pattern).

3. **`src/index.css`** — Speed up `animate-scroll-left` and `animate-scroll-right` from 60s to 40s.

### Layout

- **Row 1** (13 logos, scroll left, 40s): FTII, NID, Whistling Woods, YRF, Excel, TVF, IIT, IIM, NIFT, SRFTI, Symbiosis, Christ University, Manipal
- **Row 2** (13 logos, scroll right, 40s): Google, Amazon Prime, Viacom18, Dharma, Red Chillies, Adobe, Microsoft, Meta, Flipkart, Infosys, TCS, Wipro, Zoho
- **Row 3** (13 logos, scroll left, 40s): Tata, Reliance, ITC, HUL, Sony Pictures, Star India, Zee, Swiggy, Razorpay, MICA, Pearl Academy, Ashoka University, ISB

