

## Fix OG/Social URLs — Remove Lovable Domain References

When the site link is shared on WhatsApp (or any social platform), the Open Graph URLs currently point to `levelupnewsite.lovable.app` instead of your custom domain. Additionally, the `og:image` points to a generic Lovable placeholder.

### Changes

**`index.html`**
- Update `og:image` and `twitter:image` from `https://lovable.dev/opengraph-image-p98pqg.png` to a proper LevelUp branded image (e.g. `/favicon.png` or a dedicated OG image you upload)
- Optionally add `og:url` meta tag with your custom domain

**`src/pages/Reviews.tsx`**
- Replace all 2 instances of `https://levelupnewsite.lovable.app` with your custom domain URL

**`src/pages/StudentStory.tsx`**
- Replace all 7 instances of `https://levelupnewsite.lovable.app` with your custom domain URL

### What I need from you
Do you have a custom domain already connected (e.g. `leveluplearning.in` or similar)? If so, I'll use that. Otherwise I can extract these into a single `SITE_URL` constant so you only need to update it in one place later.

