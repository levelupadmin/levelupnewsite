# Masterclass section kit

Shared sections for the seven `/masterclass/*` pages. All are Astro components that ship no JS, except one tiny reveal script (bundled once per page). Styles live in `src/styles/masterclass.css` and every class starts with `mck-`, so nothing collides with page styles or Tailwind.

```astro
---
import {
  SectionShell, CtaButton, RefundLine, Reveal, CourseFacts,
  IsThisForYou, SkillsYouGain, InHisWords, TryItFor7Days,
  ValueAgainstPrice, WhatYouGetToday, ReviewWall, FaqList, FilmGrid, CrossSell,
  reviewsForMasterclass,
} from "@/components/masterclass";
import { OFFERINGS, SHARED_FAQ, REFUND, courseSchemaFields } from "@/data/masterclass/shared";

const o = OFFERINGS["nelson-dilipkumar"];
const cta = { href: o.checkoutUrl, label: "Get the masterclass", price: o.price, course: o.slug };
---
```

## Rules the kit enforces

- Server HTML is always visible. The reveal script hides only blocks that start below the fold, after it runs. `prefers-reduced-motion` turns all motion off.
- Motion uses `transform` and `opacity` only.
- Buy buttons are plain `<a>` links to `app.leveluplearning.in/checkout/<offering id>`, same tab, so the tracking script in `BaseLayout.astro` sees every tap. Each carries `data-mc-cta="<placement>"` and, if passed, `data-mc-course`; links to a checkout also carry `data-mc-buy` (a ghost button that links to `#lessons` does not).
- Every interactive element has a gold focus ring (`--mck-focus`) for keyboard users; buttons have hover, pressed and focus states.
- Tap targets are at least 44 px. No horizontal scroll at 360 px.
- Reviews come only from approved rows in `src/data/reviews.json`, printed exactly as stored.

## Theming

Tokens sit on `:root`. Override any of them on an ancestor or through a section's `style` prop:

```astro
<main style="--mck-accent:#fed604; --mck-gold-1:#ffe680; --mck-font-body:'Manrope',sans-serif">
```

Main tokens: `--mck-bg`, `--mck-surface`, `--mck-surface-2`, `--mck-line`, `--mck-line-gold`, `--mck-text`, `--mck-text-2`, `--mck-text-3`, `--mck-gold-1`, `--mck-gold-2`, `--mck-accent`, `--mck-on-gold`, `--mck-pill-gradient`, `--mck-gold-gradient` (override this one too if you change the golds), `--mck-font-body`, `--mck-font-display` (Cinzel when the page loads it, else the body sans), `--mck-radius`, `--mck-gutter`.

Headings take `*asterisks*` around words to set them in the gold gradient: `heading="What you get *today*"`.

Every section accepts `eyebrow` (string, or `false` to hide), `heading`, `body`, `id`, `tone` (`"plain"` or `"raised"`), `class` and `style`.

---

## Data: `src/data/masterclass/shared.ts`

| Export | What it is |
|---|---|
| `REFUND` | `{ days: 7, sentence, short, href: "/refund-policy", linkLabel, email }`. The one refund wording. |
| `TRY_IT_STEPS` | The three steps `TryItFor7Days` shows. |
| `OFFERINGS[slug]` | `{ slug, instructor, craft, courseName, offeringId, checkoutUrl, price, language, inLanguage, lessons, runtimeMinutes, verify? }` for all seven courses. |
| `MASTERCLASS_SLUGS`, `getOffering(slug)`, `checkoutUrl(slug)` | Lookups. |
| `formatPrice(2499)` | `"₹2,499"` |
| `formatRuntime(140)` | `"2 h 20 min"` |
| `isoDuration(140)` | `"PT2H20M"` |
| `pricePerLesson(price, lessons)` | Rounded rupees per lesson. |
| `courseSchemaFields(slug)` | `{ instructorName, inLanguage, courseWorkload, offers }` to spread into `courseJsonLd`. |
| `SHARED_FAQ.refund`, `.access`, `.devices` | FAQ entries (`{ question, answer, link? }`) that read the same on every page. |
| `priceNote(price)` | `"One payment of ₹2,499. GST included."` |

Course schema with every fact from one place:

```ts
import { courseJsonLd } from "@/lib/structuredData";
const course = courseJsonLd({
  name: o.courseName,
  description: "...",
  path: `/masterclass/${o.slug}`,
  image: "/og/mc-nelson-dilipkumar.jpg",
  ...courseSchemaFields(o.slug),
});
```

`courseJsonLd` also accepts these fields directly: `offers { price, priceCurrency = "INR", url, availability = InStock, category = "Paid" }`, `inLanguage` (string or array), `courseWorkload` (ISO 8601; also written as `timeRequired`), `provider`, `providerUrl`.

---

## Primitives

### SectionShell

Section frame: eyebrow, heading, body, then your content.

| Prop | Type | Default |
|---|---|---|
| `eyebrow` | `string \| false` | none |
| `heading` | `string` | none |
| `body` | `string \| string[]` | none |
| `level` | `2 \| 3` | `2` |
| `align` | `"center" \| "left"` | `"center"` |
| `width` | `"narrow" \| "default" \| "wide"` | `"default"` (1120 px; narrow 780, wide 1240) |
| `tone` | `"plain" \| "raised"` | `"plain"` |
| `tight` | `boolean` | `false` |
| slot `head` | extra header content | |

```astro
<SectionShell eyebrow="His films" heading="Each film gets *its own lessons*" body="Each film links to the lessons that cover it.">
  <FilmGrid films={films} />
</SectionShell>
```

### CtaButton

| Prop | Type | Default |
|---|---|---|
| `href` | checkout URL | required |
| `label` | `string` | required |
| `price` | `number` (appends " · ₹2,499") | none |
| `placement` | `string` (`data-mc-cta`) | none |
| `course` | slug (`data-mc-course`) | none |
| `variant` | `"primary" \| "ghost"` | `"primary"` |
| `size` | `"md" \| "lg"` | `"md"` |
| `block` | full width | `false` |
| `hero` | adds `data-mc-hero-cta` for the sticky bar | `false` |
| `arrow` | show arrow icon | `true` |

```astro
<CtaButton href={o.checkoutUrl} label="Watch all 29 lessons" price={o.price} placement="hero" course={o.slug} hero size="lg" />
```

The last word of the label, the price and the arrow never break apart. Under 480 px a `size="lg"` button spans its column so the label fits one line at 360 px.

### RefundLine

The refund rule with a "Refund policy" link. `full` uses the full sentence; `link={false}` drops the link.

```astro
<RefundLine />
<RefundLine full />
```

### Reveal

Wraps anything in the scroll reveal. `variant`: `"up"` (default), `"fade"`, `"scale"`, `"left"`, `"right"`. `delay` in ms. `as` picks the element.

```astro
<Reveal delay={120} variant="scale"><img src="..." alt="..." /></Reveal>
```

To animate your own markup without a kit section, add `class="mck-reveal"` (optional `style="--mck-delay:120ms"` and `data-reveal="scale"`) and include `<RevealScript />` once.

### KitPicture

`<picture>` with the AVIF and WebP siblings that `scripts/optimize-images.mjs` writes for `.png`/`.jpg` over 8 KB. Props: `src`, `alt`, `width`, `height`, `sizes`, `loading` (`"lazy"`), `priority` (eager plus `fetchpriority="high"`), `siblings` (`true`; pass `false` for files under 8 KB).

```astro
<KitPicture src="/masterclass/nelson/frame.jpg" alt="Nelson Dilipkumar on set" width={720} height={908} priority />
```

### CourseFacts

Strip of lessons, runtime, language, price and refund, read from `OFFERINGS`. Put it under the hero button. `items` replaces the facts.

```astro
<CourseFacts slug="ravi-basrur" />
<CourseFacts items={[{ label: "Lessons", value: "29" }, { label: "Language", value: "Tamil, English subtitles" }]} />
```

---

## Sections

### IsThisForYou

| Prop | Type | Default |
|---|---|---|
| `forYou` | `string[]` | required |
| `notForYou` | `string[]` | `[]` (single card) |
| `forLabel` / `notForLabel` | `string` | `"For you if"` / `"Not for you if"` |
| `cta` | `{ href, label, price?, placement?, course?, refund? }` | none |
| `heading` | | `"Is this for you?"` |
| `eyebrow` | | `"Before you buy"` |

```astro
<IsThisForYou
  forYou={["You want to write or direct films, in Tamil or any language.", "You have a story idea and don't know how to lock it."]}
  notForYou={["You want camera settings, editing software or screenplay format.", "You want Nelson to read your script or answer you live."]}
  cta={{ ...cta, placement: "fit" }}
/>
```

### SkillsYouGain ("What you'll know how to do")

`items: { skill, lesson?, detail? }[]`. `lesson` takes a number (`Lesson 13`), an array (`Lessons 14 and 17`) or your own string (`"Lessons 2 to 5"`). Optional `cta`.

```astro
<SkillsYouGain items={[
  { skill: "Lock a film idea in five lines.", lesson: 13 },
  { skill: "Build a character the audience remembers.", lesson: [14, 17] },
  { skill: "Run a calm set for 300 people.", lesson: 24 },
]} />
```

### InHisWords

Quote wall. Use exact lines from the course transcripts or subtitles only. Renders nothing when `quotes` is empty, so a page with no source can leave it in.

| Prop | Type | Default |
|---|---|---|
| `quotes` | `{ text, lesson?, note? }[]` | required |
| `speaker` | `string` | required |
| `note` | line under the wall | none |
| `featureFirst` | first quote drawn as a frame from the lesson, the line set as a subtitle | `true` |
| `heading` / `eyebrow` | | `"In his words"` / `"From the lessons"` |

```astro
<InHisWords
  speaker="Nelson Dilipkumar"
  note="From the masterclass, English subtitles"
  quotes={[
    { text: "Even if it's a 20th draft, 19 drafts would've been in my mind.", lesson: 13 },
    { text: "So, if someone gives me a storyboard, I will dismantle it first.", lesson: 22 },
  ]}
/>
```

Print the quote file's `display` field and check each lesson number against the page's lesson list before printing it.

### TryItFor7Days

The refund promise: a seven-day bar that fills on scroll, three steps, the refund sentence and link, and an optional full-width button. `steps` overrides `TRY_IT_STEPS`; `showDays={false}` hides the bar.

```astro
<TryItFor7Days cta={{ ...cta, label: "Start watching", placement: "try" }} />
```

### ValueAgainstPrice

Price, "about ₹86 a lesson", then rows. Replaces struck-through prices. Pass only numbers you can source.

| Prop | Type | Default |
|---|---|---|
| `price`, `lessons` | `number` | required |
| `runtimeMinutes` | `number` | none |
| `comparisons` | `{ label, value, note?, highlight? }[]` | `[]` |
| `factRows` | add lesson-count and runtime rows first | `true` |
| `priceNote` | line under the price | `"Paid once. No subscription."` |
| `cta` | | none |

```astro
<ValueAgainstPrice
  price={o.price}
  lessons={o.lessons}
  runtimeMinutes={o.runtimeMinutes}
  comparisons={[{ label: "Access", value: "For life" }]}
  cta={{ ...cta, placement: "value" }}
/>
```

### WhatYouGetToday

The price card: included items, bonuses for every buyer, price, button, full refund sentence, optional payment note.

| Prop | Type | Default |
|---|---|---|
| `price` | `number` | required |
| `items` | `{ title, detail? }[]` | required |
| `bonuses` | `{ title, detail?, value? }[]` | `[]` |
| `bonusHeading` | | `"Bonuses, for every buyer"` |
| `priceNote` | | `priceNote(price)` |
| `payNote` | e.g. payment methods | none |
| `cta` | `{ href, label, price?, placement?, course?, refund? }` | required |

```astro
<WhatYouGetToday
  price={o.price}
  items={[
    { title: "29 video lessons", detail: "2 h 20 min in all" },
    { title: "Tamil, with English subtitles" },
    { title: "Watch on phone, tablet or laptop" },
  ]}
  bonuses={[{ title: "PDF workbook", detail: "Notes for every lesson" }, { title: "LevelUp community access" }]}
  cta={{ href: o.checkoutUrl, label: "Get the masterclass", placement: "price-card", course: o.slug }}
/>
```

### ReviewWall

Real reviews only. Get them with `reviewsForMasterclass(slug, { limit })` (build time only; never import `reviewPicks` from a React island). The page's own course reviews come first with a "This masterclass" tag; the rest are reviews of other LevelUp programmes in the same craft, each naming its programme. No review appears on two masterclass pages. Cards past `initial` sit in a native `<details>`. Desktop shows three columns filled left to right (the first row holds reviews 1 to 3); tablets a two-column grid; phones one column in order. Cards carry initials, never a photo.

| Prop | Type | Default |
|---|---|---|
| `reviews` | `ReviewCardData[]` | required (empty renders nothing) |
| `initial` | cards before "Show more" | `6` |
| `note` | line above the link | none |
| `allHref` / `allLabel` | | `"/reviews/"` / `"Read all reviews"` |
| `ownLabel` | | `"This masterclass"` |
| `heading` / `body` | | `"What learners *wrote*"` / `"Quoted as written in our feedback form. Each card names the course it reviews."` |

```astro
---
const reviews = reviewsForMasterclass("nelson-dilipkumar", { limit: 9 });
---
<ReviewWall reviews={reviews} note="Seven buyers of this masterclass left a written review." />
```

Own-course reviews today: Nelson 7, Karthik 3 ("Filmmaking Masterclass"), G Venket Ram 4 ("Photography Masterclass"), Anthony 1 ("Editing Masterclass"). Lokesh, Ravi and DRK have none, so their walls use other programmes. Edit `REVIEW_PLAN` in `reviewPicks.ts` to change which programmes feed a page, pin a review (`pinned: [tallyId]`) or drop one (`exclude: [tallyId]`). Allocation runs for all seven pages together, so a change on one page can shift the fill on pages after it in `MASTERCLASS_SLUGS` order.

### FaqList

FAQ on native `<details>`: no JS, every answer in the HTML. Items are `{ question, answer, link? }`. `openFirst`, `courseName` (WhatsApp message), `whatsapp={false}` hides the help line. Use the same array for `faqJsonLd`.

```astro
<SectionShell eyebrow="FAQ" heading="Questions buyers ask" width="narrow">
  <FaqList faqs={[...faqs, SHARED_FAQ.refund, SHARED_FAQ.access, SHARED_FAQ.devices]} courseName="Nelson Dilipkumar Masterclass" />
</SectionShell>
```

### FilmGrid

Static poster grid, two columns on phones, `cols` (default 4) from 760 px. Items: `{ src, title, year?, alt?, note?, siblings? }`.

```astro
<FilmGrid films={[
  { src: "/masterclass/nelson/Du0bmXvfwK2WLbhbymBmcCdk.jpg", title: "Jailer", year: 2023, note: "Lesson 18" },
  { src: "/masterclass/nelson/KtbVjsCcNMvRhcGUeMA1qjBNkM.jpg", title: "Beast", year: 2022, note: "Lesson 15" },
]} />
```

### CrossSell

Cards for the other masterclasses with portrait, craft, name, lessons, runtime and price as text, built by `crossSell.ts` from `OFFERINGS` (the React `OtherMasterclasses` uses the same helper and markup). `current` leaves that page out; `order` puts slugs first; `limit` caps the count. Two columns on phones, three from 760 px, and one row from 1100 px when there are four to six cards.

```astro
<CrossSell current="drk-kiran" order={["nelson-dilipkumar"]} />
```

---

## Changed components outside this folder

All changes are optional props; existing call sites keep working. Behaviour changes from the polish pass are noted per component.

- `lokesh/LokeshTrailer`: `title` (iframe title and button label), `alt`, `poster`, `noCookie` (default `true`, youtube-nocookie.com). Still a click-to-load facade.
  `<LokeshTrailer ytId="km7nB-tf1FE" title="Nelson Dilipkumar Teaches Filmmaking, official trailer" alt="Nelson Dilipkumar masterclass trailer" client:visible />`
- `lokesh/HeroPlayer`: server HTML has a `<picture>` poster (`poster`, `mobilePoster`) and a `<video preload="none">` with a source per breakpoint (`src`, `mobileSrc`); playback starts after window load; poster fades once frames play. `hasAudio={false}` removes the unmute hint and tap toggle (default `true`). Even with `hasAudio`, "Tap to unmute" shows only when the browser reports a sound track in the file. Also `posterAlt`, `objectPosition`, `mobileObjectPosition`, `autoPlay`. The touch handler that cancelled itself is gone.
  `<HeroPlayer src={desk} mobileSrc={mob} poster={deskPoster} mobilePoster={mobPoster} hasAudio={false} ariaLabel="Nelson Dilipkumar" client:load />`
- `lokesh/IntersectionPlayVideo`: `poster`, `ariaLabel`, `threshold`; preload none, metadata about one screen ahead, plays only in view, a dark placeholder instead of a black box, and controls when autoplay is refused, motion is reduced or Save-Data is on.
- `lokesh/EpisodeAccordion`: native `<details>` rows, so a row opens before hydration and every description is in the HTML; one open at a time (details `name`) unless `allowMultiple`. `accent` (any CSS colour), `itemLabel`, `Episode.duration`, `Episode.free`. Rows past `showMoreAfter` sit in a "Show N more" `<details>`; `initialVisible` acts as `showMoreAfter` when that is unset. It works with no client directive; `client:visible` only adds the fallback for browsers without details `name`.
  `<EpisodeAccordion episodes={episodes} showMoreAfter={6} accent="#d4a36c" />`
- `lokesh/FAQAccordion`: native `<details>` rows (answers in the HTML, open before hydration), `showSearch` (needs a client directive to filter), `defaultOpenIndex`, `FAQ.link`; search placeholder "Search questions"; WhatsApp button text dark green on green (6.2:1).
- `lokesh/FilmsScrollStack`: `films` (`{ src, title, year?, alt? }[]`, also builds the subline), `ctaNewTab` (default `false`, same tab), `runwayPerPoster`; reduced motion shows the settled deck with no runway. Transforms are written to the DOM per frame (no React renders on scroll), posters load two screens ahead, and on phones the deck fits under the text with room for the sticky bar. `caption` now defaults to nothing (the old default, "5 films, ₹1,500 crore box office, 6 years", was wrong and unsourced). The button is the kit's buy button with `data-mc-buy`.
- `lokesh/PosterMarquee`: `films` with titles for alt text, `label`; edges fade into the page; pauses on hover, press and focus; with reduced motion it stands still as a scrollable strip; needs no hydration directive.
- `lokesh/ScrollGlowLine`: scaleY and translate3d instead of height and top, only while near the screen; fully lit for reduced motion.
- `lokesh/PageInteractions`: no card tilt on touch screens or for reduced motion.
- `FadeInSection` and `useScrollReveal`: visible in server HTML; animate only below the fold with JS running.
- `OtherMasterclasses`: same cards and styles as `CrossSell` (shared `crossSell.ts`); `currentName`, `currentSlug` and `order` props; plain links, no client directive needed.
- `Picture`: `priority` prop.
- `Seo.astro`: `og:type` is `website` except articles; `twitter:site` is `@LevelUp_edu`.
