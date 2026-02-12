

## Add Nelson Dilipkumar Masterclass + 4-3 Grid Layout

### Changes

**1. Copy uploaded image to project**
- Copy `user-uploads://image-42.png` to `src/assets/nelson-dilipkumar.png`

**2. Update `src/components/MasterclassSection.tsx`**
- Add a 7th entry to the `masterclasses` array for Nelson Dilipkumar (Filmmaker, Filmmaking, linking to `https://masterclass.leveluplearning.in/nelson-dilipkumar`), using the imported image
- Change the grid from `grid-cols-2 sm:grid-cols-3 lg:grid-cols-3` to `grid-cols-2 sm:grid-cols-3 lg:grid-cols-4` so the first row shows 4 cards and the remaining 3 fill the second row on large screens

**3. Update `src/components/navbarData.ts`**
- Add Nelson Dilipkumar as a new entry in the Masterclasses nav items array so the dropdown data stays in sync

### Technical Details

- Nelson's entry will be added as the 7th item in the array (last position), meaning on large screens: row 1 = cards 1-4, row 2 = cards 5-7
- The grid naturally handles the 4-3 split since CSS grid wraps after 4 columns
- On mobile (2 cols) and tablet (3 cols) the cards will wrap naturally

