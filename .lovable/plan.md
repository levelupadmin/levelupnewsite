

## Link Mapping: Replace all placeholder `#` links with real URLs

Since this new site is replacing `leveluplearning.in`, all placeholder links need to point to the correct destinations. Here is the full link map and the files that need updating.

### Link Map Reference

| Location in site | Current href | Should point to |
|---|---|---|
| **Navbar** - Masterclasses parent | `leveluplearning.in/#masterclasses` | `#masterclasses` (on-page anchor) |
| **Navbar** - Karthik Subbaraj | `leveluplearning.in/karthik-subbaraj` | `https://masterclass.leveluplearning.in/karthik-subbaraj` |
| **Navbar** - Anthony Gonsalvez | `leveluplearning.in/anthony` | `https://masterclass.leveluplearning.in/anthony` |
| **Navbar** - G Venket Ram | `leveluplearning.in/g-venket-ram` | `https://masterclass.leveluplearning.in/g-venket-ram` |
| **Navbar** - DRK Kiran | `leveluplearning.in/kiran` | `https://masterclass.leveluplearning.in/kiran` |
| **Navbar** - Ravi Basrur | `leveluplearning.in/ravi-basrur-1` | `https://masterclass.leveluplearning.in/ravi-basrur` |
| **Navbar** - Lokesh Kanagaraj | already correct | `https://masterclass.leveluplearning.in/lokesh-kanagaraj` |
| **Navbar** - About | `leveluplearning.in/contact-us` | `https://www.leveluplearning.in/contact-us` (keep as external until an About page is built) |
| **Masterclass cards** | No links on cards | Wrap each card in an `<a>` linking to its masterclass page |
| **Masterclass "Explore the full library"** | `#` | `https://masterclass.leveluplearning.in/` |
| **Live Programs - Enroll/Waitlist CTAs** | `#` | `https://www.leveluplearning.live/bfp` (or program-specific URL) |
| **Live Programs - Learn More CTAs** | `#` | Same program-specific URL |
| **Live Programs - "Explore all programs"** | `#` | `https://www.leveluplearning.live` |
| **Testimonials - "Read all stories"** | `#` | `#testimonials` (on-page anchor, or remove if no stories page exists) |
| **Testimonials - "Read the story"** per slide | `#` | Remove or point to `#testimonials` (no individual story pages exist) |
| **Footer - Masterclasses** | `#` | `#masterclasses` |
| **Footer - LevelUp Live** | `#` | `https://www.leveluplearning.live` |
| **Footer - The Forge** | `#` | `#forge` |
| **Footer - StarDa** | `#` | Remove (not a real product on the original site) or keep as placeholder |
| **Footer - About** | `#` | `https://www.leveluplearning.in/contact-us` |
| **Footer - Careers** | `#` | `https://www.leveluplearning.in/contact-us` (no careers page exists) |
| **Footer - Press** | `#` | `https://www.leveluplearning.in/contact-us` |
| **Footer - Blog** | `#` | `https://www.leveluplearning.in/contact-us` |
| **Footer - FAQs** | `#` | `#faq` (on-page anchor) |
| **Footer - Contact Us** | `#` | `https://api.whatsapp.com/send?phone=919791520177&text=Hi` |
| **Footer - Terms** | `#` | `https://www.leveluplearning.in/terms-and-conditions` |
| **Footer - Privacy Policy** | `#` | `https://www.leveluplearning.in/privacy-policy` |
| **Footer bottom - Terms** | `#` | `https://www.leveluplearning.in/terms-and-conditions` |
| **Footer bottom - Privacy Policy** | `#` | `https://www.leveluplearning.in/privacy-policy` |
| **Footer bottom - Cookies** | `#` | `https://www.leveluplearning.in/privacy-policy` |
| **Footer - Email** | `hello@leveluplearning.com` | Keep as-is |
| **Footer - Instagram** | `#` | `https://www.instagram.com/leveluplearning.in/` |
| **Footer - YouTube** | `#` | `https://www.youtube.com/@leveluplearning` |
| **Footer - X/Twitter** | `#` | `https://twitter.com/levelup_Lrng` |
| **Footer - LinkedIn** | `#` | `https://www.linkedin.com/company/levelup-learning-india/` |
| **WhatsApp float** | Current number | `https://api.whatsapp.com/send?phone=919791520177&text=Hi` |

### Technical changes

**Files to edit:**

1. **`src/components/navbarData.ts`** -- Update masterclass `href` values to use `masterclass.leveluplearning.in` subdomain; update Masterclasses parent href to `#masterclasses`

2. **`src/components/MasterclassSection.tsx`** -- Add `href` property to masterclass data and wrap each card in an anchor tag; update "Explore the full library" CTA to `https://masterclass.leveluplearning.in/`

3. **`src/components/LiveProgramsSection.tsx`** -- Add `href` to program data in `programs.ts` and wire up Enroll/Learn More buttons; update "Explore all programs" to `https://www.leveluplearning.live`

4. **`src/data/programs.ts`** -- Add an `href` field to each `ShowcaseProgram`

5. **`src/components/TestimonialsSection.tsx`** -- Update "Read all stories" and per-slide "Read the story" links (point to `#testimonials` or remove)

6. **`src/components/Footer.tsx`** -- Replace all placeholder `#` hrefs with real URLs from the map above; update social media links

7. **`src/components/FloatingSupport.tsx`** -- Update WhatsApp number to `919791520177`

