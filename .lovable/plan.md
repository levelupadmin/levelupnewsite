

## Plan: Consolidate All Domain References to `leveluplearning.in`

The codebase currently scatters authority across `leveluplearning.live`, `masterclass.leveluplearning.in`, `study.leveluplearning.in`, and `forgebylevelup.com`. This plan unifies every self-referencing URL to use `www.leveluplearning.in` as the canonical domain.

**Note:** External product subdomains (`masterclass.leveluplearning.in`, `study.leveluplearning.in`) and third-party domains (`forgebylevelup.com`, `tally.so`) are intentional cross-links to separate apps and will remain unchanged. The fix targets only the **main site's own canonical identity**.

---

### Changes

**1. `src/lib/constants.ts`**
- Change `SITE_URL` from `"https://levelupnewsite.lovable.app"` to `"https://www.leveluplearning.in"`

**2. `public/robots.txt`**
- Change sitemap URL from `https://www.leveluplearning.live/sitemap.xml` to `https://www.leveluplearning.in/sitemap.xml`

**3. `public/sitemap.xml`**
- Replace all `https://www.leveluplearning.live/` URLs with `https://www.leveluplearning.in/`

**4. `public/llms.txt`**
- Replace all `https://www.leveluplearning.live/` references with `https://www.leveluplearning.in/`
- Keep `masterclass.leveluplearning.in` and `forgebylevelup.com` links as-is (separate products)

**5. `src/components/LiveProgramsSection.tsx`**
- Update the JSON-LD Organization URL from `.live` to `https://www.leveluplearning.in`

**6. `src/components/navbarData.ts`**
- Replace 3 live program `href` values from `leveluplearning.live` to `leveluplearning.in`

**7. `src/components/CareerQuizDialog.tsx`**
- Update the BFP href from `.live` to `.in`

**8. `src/pages/PrivacyPolicy.tsx`**
- Already uses `leveluplearning.in` -- no change needed

**9. `src/pages/MasterclassDetail.tsx`**
- Support email already uses `leveluplearning.in` -- no change needed

### Files to Edit
1. `src/lib/constants.ts`
2. `public/robots.txt`
3. `public/sitemap.xml`
4. `public/llms.txt`
5. `src/components/LiveProgramsSection.tsx`
6. `src/components/navbarData.ts`
7. `src/components/CareerQuizDialog.tsx`

