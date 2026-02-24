

# Center the "Still have questions?" text

## What Changes
The "Still have questions? Reach out to us" line at the bottom of the FAQ section is currently left-aligned. Add `text-center` to center it horizontally on screen.

## Technical Steps

### `src/components/FAQSection.tsx`

**Update line 125** -- add `text-center` to the `<p>` element's className:

- Before: `className="mt-10 md:mt-14 font-sans-body text-sm text-muted-foreground"`
- After: `className="mt-10 md:mt-14 font-sans-body text-sm text-muted-foreground text-center"`

Single one-line change, no other files affected.

