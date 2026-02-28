

## Put "are made" on the same line as rotating words

Currently the structure is:
```text
Where India's next great
    [filmmakers]
       are made
```

The goal is to place "are made" immediately after the rotating word on the same line:
```text
Where India's next great
  [filmmakers] are made
```

### Steps

1. **Update `src/components/HeroSection.tsx`**:
   - Remove the `<br />` between the rotating word container and "are made"
   - Move the `<em>are made</em>` inline right after the rotating word `<span>`, wrapping both in a single line container
   - Change the rotating word's inner alignment from `justify-center` to `justify-start` (left-align) so "are made" sits naturally after the word
   - Add a small left margin or gap to "are made" for spacing
   - The rotating word container keeps its fixed `ch`-based width so "are made" shifts position naturally based on the longest word, but stays on the same line

The revised JSX structure for the second and third lines becomes:
```tsx
<span className="inline-flex items-center justify-center animate-hero-stagger" style={{ animationDelay: "400ms" }}>
  <span className="relative inline-block overflow-hidden align-middle"
    style={{ width: maxWordLength + "ch", height: "1.15em" }}>
    {/* AnimatePresence rotating words - left aligned */}
  </span>
  <em className="font-serif-display italic font-normal ml-[0.3ch]"
    style={{ color: "#E6681D" }}>
    are made
  </em>
</span>
```

This removes the third `<br />` and groups the rotating word + "are made" as one inline-flex row. On mobile, `min(100%, ...)` width ensures it doesn't overflow.

