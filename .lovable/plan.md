

## Remove an Avatar from the Outermost Ring

### What Changes
Remove the last avatar entry from **Ring 3** (outermost orbit) in the `ringItems` array. This is the `masterclass-3` image with the badge "Shared a resource". Ring 3 will go from 5 avatars to 4, keeping it visually balanced.

If this isn't the specific avatar you wanted removed, let me know and I'll swap it for the correct one.

### Technical Details

**File:** `src/components/CommunitySection.tsx`

Remove this entry from the Ring 3 array (the last item in `ringItems[3]`):

```ts
{ type: "avatar", src: masterclass3, angle: 315, size: 38, badge: { text: "Shared a resource", icon: Share2 } },
```

No other files are affected. The remaining 4 avatars in Ring 3 will redistribute naturally since they keep their existing angles.

