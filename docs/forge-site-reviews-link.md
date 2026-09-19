# Linking forgebylevelup.com to the reviews page

forgebylevelup.com is not in this repo, so this bit has to be pasted in by hand
over there. It points the Forge site at the Forge slice of the reviews page.

## The link

```html
<a href="https://www.leveluplearning.in/reviews/forge/?utm_source=forgebylevelup&utm_medium=referral&utm_campaign=reviews">
  Read verified reviews from Forge residencies
</a>
```

Put it wherever the Forge site already talks about past editions or alumni:
under the testimonials block is the obvious spot.

## Why this URL

`/reviews/forge/` is a real page, not a filter applied in the browser. The
reviews are in the HTML, so a crawler that does not run JavaScript still reads
them, which is the whole point of the exercise.

The older query form still works and 301s to the same page:

```
https://www.leveluplearning.in/reviews?filter=forge   ->   /reviews/forge/
```

Prefer the direct URL in new links so there is no redirect hop.

## The other two

```
https://www.leveluplearning.in/reviews/levelup/           live cohorts
https://www.leveluplearning.in/reviews/online-programs/   on-demand masterclasses
https://www.leveluplearning.in/reviews/                   everything
```

## One thing worth doing at the same time

The audit found no third-party corroboration anywhere a model looks. A link
from forgebylevelup.com to leveluplearning.in helps the two domains read as one
company rather than two unrelated sites, so it is worth adding a plain link in
the Forge footer as well, not only next to the testimonials.
