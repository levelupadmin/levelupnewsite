

## Fix Masterclass Section Headline Line Break

**File: `src/components/MasterclassSection.tsx`**

Change the headline so "India's greatest creative minds." is on line 1 and "Now your mentors." is on line 2, using a `<br />` instead of the current inline `{" "}` spacer.

Current:
```tsx
<span>India's greatest creative minds.</span>{" "}
<em className="...">Now your mentors.</em>
```

Change to:
```tsx
<span>India's greatest creative minds.</span>
<br />
<em className="...">Now your mentors.</em>
```

Single-line edit, no other changes needed.

