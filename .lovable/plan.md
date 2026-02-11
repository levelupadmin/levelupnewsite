

## Replace Inter with Sora Font Family

Swap the entire site's typography from Inter to Sora across three files.

### Changes

**1. `index.html`**
- Replace all Inter font references (preload, stylesheet links) with Sora
- Update the Google Fonts URL to: `https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&display=swap`

**2. `src/index.css`**
- Replace every `'Inter'` reference in `font-family` declarations with `'Sora'` (body, headings, `.font-serif-display`, `.font-sans-body`)

**3. `tailwind.config.ts`**
- Update `fontFamily.serif` and `fontFamily.sans` arrays from `'"Inter"'` to `'"Sora"'`

No new dependencies needed -- Sora is loaded from Google Fonts the same way Inter currently is.

