
## Add Meta Pixel Tracking

### What
Integrate Meta Pixel (Facebook Pixel) with ID `662214098433203` to track user behavior for advertising and analytics purposes.

### How
1. **Add Meta Pixel ID to constants**
   - Update `src/lib/constants.ts` to include `META_PIXEL_ID = "662214098433203"`

2. **Create Meta Pixel initialization hook**
   - Create `src/hooks/useMetaPixel.ts` to initialize the Meta Pixel script and track page views when routes change

3. **Initialize in App.tsx**
   - Call the `useMetaPixel` hook in the root App component to activate tracking across all pages

4. **Add Meta Pixel script to index.html (backup)**
   - Include the Meta Pixel base code in `<head>` as a fallback for server-side rendering

### Why This Approach
- Meta Pixel ID is public (not a secret), so it's safe in the codebase
- Hook-based approach integrates with existing React router for proper page view tracking
- Hooks with Meta Pixel's `fbq()` API ensure events are tracked on all page navigations
