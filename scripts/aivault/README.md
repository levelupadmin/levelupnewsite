# AI Library data refresh

`refresh_nov2026.py` rebuilds every data file under `public/aivault/data/ai-resources/`
and the counts and dates in `public/aivault/index.html`.

Inputs (in a scratch folder):
- `orig/` — a copy of `data/ai-resources/` and `index.html` taken before the refresh. The script always starts from here, so it can be re-run.
- `gh_fresh.json` — current stars, push and create dates per GitHub repo, from one GraphQL query per 60 repos (`refresh_gh.py` pattern: `repository(owner,name){stargazerCount pushedAt createdAt}`).
- `new_skills.json`, `new_llms.json`, `new_mcp.json` — lists of `{"record": ..., "content": ...}` in the same shape as the existing category and content files.

What it writes:
- `<cat>.json` (full), `<cat>.slim.json` (browse), `<cat>/dNN.json` and `<cat>/cNN.json` (per-slug buckets; bucket = JS string hash of the slug mod the bucket count in `index.html`), `content/<cat>.json`, `index.json` (global search), `trending.json`.
- `trending.json` → `trending`: top 24 by stars among items pushed in the last 60 days, one per repo; `recent`: everything added in this refresh (feeds the "New this month" section).
- New records carry `extra.added` with the refresh date.

Next refresh: copy this script, change `TODAY`, `UPDATED_LONG`, `UPDATED_SHORT`, take a fresh `orig/` copy, and run.
