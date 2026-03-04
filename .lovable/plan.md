

## Fix: Bottom spacing for expanded card illustration

**Problem**: In the expanded "Expert Mentors" card (second card visually, index 0), the left-column illustration has no bottom padding — it touches the card edge.

**Change**: Add `pb-4` to the illustration wrapper div on line 200 in `src/components/WhyLevelUp.tsx`.

```
Line 200: <div className="flex-1 flex items-center justify-center min-h-0">
→        <div className="flex-1 flex items-center justify-center min-h-0 pb-4">
```

Single line change, no visual/functional impact beyond adding breathing room at the bottom of the illustration in expanded cards.

