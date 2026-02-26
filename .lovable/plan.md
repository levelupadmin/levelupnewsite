

## Link BFP "Learn More" Button to New URL

Currently, the "Learn More" button in the Live Programs section uses the same `ctaLink` as the "Request Invite" button for all programs. We need to give BFP its own "Learn More" URL.

### Changes

**1. `src/data/programs.ts`**
- Add `learnMoreLink` field to the `ShowcaseProgram` interface
- Set BFP's `learnMoreLink` to `https://www.leveluplearning.live/bfp-2`
- For the other 3 programs, set `learnMoreLink` to their existing `ctaLink` value (maintaining current behavior)

**2. `src/components/LiveProgramsSection.tsx`** (line 270)
- Change `href={activeProgram.ctaLink}` → `href={activeProgram.learnMoreLink}` on the "Learn More" button

Two files, minimal changes.

