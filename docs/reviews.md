# The reviews page

`/reviews` and its three category pages are built from real Tally feedback
submissions. This note covers how the data gets there and what the rules are.

## Why it exists

An LLM reputation audit in July 2026 found the site claimed "4.8+ across
15,000+ reviews" while nothing crawlable backed it up. The feedback did exist,
in 205 Tally forms, but it had never been published anywhere a crawler could
read. This page publishes it, with ratings and dates, so the claim can be
checked rather than taken on trust.

## The rules

These are not style preferences. Breaking one of them puts the site back in the
position the audit described.

- Every published review traces to a real Tally submission id, kept in the JSON
  as `tallyId` and never rendered.
- Dates are the genuine `submittedAt`. Never shifted, never invented.
- A submission with no usable prose is skipped, never paraphrased into one.
- Nothing publishes until a human sets `approved: true`.
- The rating and count on the page, in the schema, and on the homepage all come
  from the same computed figures. No number is typed in by hand.

## The files

| Path | What it is |
|---|---|
| `scripts/tally-client.mjs` | Tally API client. Serialises every call: Tally 403s on concurrent requests. |
| `scripts/discover-review-forms.mjs` | Read-only sweep of all forms, flags the ones that look like feedback. |
| `scripts/propose-review-mapping.mjs` | Turns a sweep into a proposed `reviewForms.json`. |
| `scripts/pull-reviews.mjs` | Pulls submissions from the mapped forms into `src/data/reviews.json`. |
| `scripts/approve-reviews.mjs` | The curation gate. Only flips the `approved` flag. |
| `src/data/reviewForms.json` | Form id to category and programme name. The one place the mapping lives. |
| `src/data/reviewCategories.ts` | The three categories, and the `Review` type. |
| `src/data/reviews.json` | The pulled corpus. Committed. |
| `src/data/reviewStats.json` | Headline numbers for the homepage, generated from the approved set. |
| `src/lib/reviews.ts` | Loads approved reviews and computes aggregates at build time. |
| `src/lib/reviewSchema.ts` | schema.org output, computed from the same set the page renders. |

## Adding a new cohort's feedback

```bash
node scripts/discover-review-forms.mjs    # find the new form
node scripts/propose-review-mapping.mjs   # add it to reviewForms.json
node scripts/pull-reviews.mjs             # pull its submissions
node scripts/approve-reviews.mjs --seed 40
npm run build
```

`propose-review-mapping.mjs` keeps any category a human already set, and
`pull-reviews.mjs` keeps any `approved` flag and hand-edited `name` or
`profileUrl`. Re-running either is safe.

## Approving

```bash
node scripts/approve-reviews.mjs --list             # what is published now
node scripts/approve-reviews.mjs --seed 40          # first batch, 40 per category
node scripts/approve-reviews.mjs --reject <tallyId> # drop one
node scripts/approve-reviews.mjs --approve <tallyId>
```

`--seed` spreads its picks across programmes and takes the newest first, so one
large cohort cannot fill the page. It never reorders or rewrites anything.

Each published review is roughly 1KB of HTML. Keep the total under about 600
unless you are ready to paginate.

## What the rating covers

The average and the count on the page cover the reviews published on that page:
submissions that scored 80 or more out of 100 and passed the approval pass. The
page says so in as many words, and the schema carries the same count, so a
reader or a crawler can count the reviews and get the number back.

The wider corpus is larger. If you ever want to state a figure across all
feedback rather than the published subset, compute it, do not estimate it, and
change the wording on the page to match.

## Privacy

Names are stored and shown as first name plus last initial. Full names go up
only where someone has agreed. Email addresses, phone numbers and URLs are
stripped from the review text at pull time.

`profileUrl` is empty by default. Fill it in by hand where a student has agreed
to link their LinkedIn or Instagram: the audit's finding was that on-site
testimonials with no external trace get discounted to nothing, and a link is
the cheapest fix for that.
