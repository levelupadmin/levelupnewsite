

## Plan: Split uploaded image and add to Venket Ram portfolio carousel

The uploaded image is a side-by-side composition — the original Raja Ravi Varma painting on the left, and Samantha Akkineni's recreation on the right. We'll save the full image as two cropped assets and insert them adjacent in the carousel.

### Changes

1. **Save the uploaded image as a single asset** `src/assets/portfolio/ravi-varma-samantha.png` — then realize we can't crop in-browser. Instead, save the full image as-is and display it as a single wider card, OR save it twice and use CSS `object-position` to show left/right halves.

   **Approach**: Save the single image twice to two files. Use CSS `object-fit: cover` with `object-position: left` and `object-position: right` to visually split them into two carousel cards.

   - `src/assets/portfolio/ravi-varma-samantha-left.png` — same source image, displayed with `object-position: left center`
   - `src/assets/portfolio/ravi-varma-samantha-right.png` — same source image, displayed with `object-position: right center`

   Actually, both files would be identical. Simpler: save once, import once, and reference it twice in the array with different display logic.

   **Better approach**: Save the single uploaded image to `src/assets/portfolio/ravi-varma-samantha.png`. Then in the carousel rendering, for the Venket Ram portfolio, insert two special entries that reference the same image but crop left/right halves using `object-position`.

2. **`src/pages/MasterclassDetail.tsx`**:
   - Import the new image: `import portfolioSamantha from "@/assets/portfolio/ravi-varma-samantha.png"`
   - Change `defaultPortfolioImages` from a simple string array to support objects with optional crop info: `{ src, objectPosition? }`
   - Insert two entries after the existing `portfolioRaviVarma` / `portfolioRaviVarma2`: `{ src: portfolioSamantha, objectPosition: "left center" }` and `{ src: portfolioSamantha, objectPosition: "right center" }`
   - Update the ticker rendering to handle the new format — apply `objectPosition` style on the `<img>` tag

   To minimize changes, we can keep the array as-is for simple strings and only use objects for special entries. The rendering loop checks `typeof item === 'string'`.

