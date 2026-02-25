

## Change

In `src/components/WhyLevelUp.tsx`, line 38, split the title so "Through the Journey" appears on a new line.

**Current (line 38):**
```
title: "Community, Through the Journey",
```

**New:**
```
title: "Community,\nThrough the Journey",
```

Then ensure the rendering element for the title preserves newlines by adding `whitespace-pre-line` to its className (need to check current rendering).

Let me verify how the title is rendered.

