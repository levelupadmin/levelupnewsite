"""Refresh the AI Library data (Nov 2026).

Reads pristine data from ORIG (a copy of public/aivault/data/ai-resources + index.html
taken before the refresh), applies fresh GitHub stars/push dates, adds new items, and
rewrites every derived file: <cat>.json, <cat>.slim.json, <cat>/dNN.json, <cat>/cNN.json,
content/<cat>.json, index.json, trending.json, plus counts and dates in index.html.

usage: python3 refresh_nov2026.py ORIG_DIR SCRATCH_DIR
"""
import json, os, re, sys, datetime
ORIG, SP = sys.argv[1], sys.argv[2]
ROOT = os.path.join(os.path.dirname(__file__), '..', '..', 'public', 'aivault')
OUT = os.path.join(ROOT, 'data', 'ai-resources')
TODAY = '2026-11-23'; UPDATED_LONG = '23 Nov 2026'; UPDATED_SHORT = 'Nov 2026'
CATS = ['skill', 'tool', 'mcp_server', 'llm', 'agent', 'design']
BUCKETS = {'skill': 52, 'tool': 24, 'mcp_server': 12, 'llm': 4, 'agent': 6, 'design': 1}

def load(p): return json.load(open(p))
def dump(o, p):
    with open(p, 'w') as f: json.dump(o, f, ensure_ascii=False, separators=(',', ':'))
def bhash(s):
    h = 0
    for ch in s:  # JS charCodeAt works on UTF-16 units
        for u in ch.encode('utf-16-be')[::2] if False else [ord(ch)] if ord(ch) < 0x10000 else [0xD800 + ((ord(ch) - 0x10000) >> 10), 0xDC00 + ((ord(ch) - 0x10000) & 0x3FF)]:
            h = (h * 31 + u) & 0xFFFFFFFF
    return h
def gh_key(r):
    e = r.get('extra', {})
    for u in (e.get('github_url'), r.get('external_url'), e.get('source_url')):
        m = re.match(r'https?://github\.com/([^/\s]+)/([^/\s#?]+)', u or '')
        if m: return (m.group(1) + '/' + m.group(2).removesuffix('.git')).lower()
    return None

fresh = load(os.path.join(SP, 'gh_fresh.json'))
full = {c: load(os.path.join(ORIG, c + '.json')) for c in CATS}
slim_keys = {}
for c in CATS:
    sl = load(os.path.join(ORIG, c + '.slim.json'))
    slim_keys[c] = sorted({k for r in sl for k in r.get('extra', {})})
content = {c: load(os.path.join(ORIG, 'content', c + '.json')) for c in CATS}

# 1. fresh GitHub numbers
upd = 0
for c in CATS:
    for r in full[c]:
        k = gh_key(r); v = fresh.get(k) if k else None
        if not v: continue
        e = r['extra']; upd += 1
        if c == 'skill': e['repo_stars'] = v['stargazerCount']
        elif 'stars' in e or c in ('mcp_server', 'llm'): e['stars'] = v['stargazerCount']
        if 'pushed' in e or c in ('skill', 'mcp_server', 'llm'): e['pushed'] = v['pushedAt'][:10]
        if 'created' in e or c in ('skill', 'mcp_server', 'llm'): e['created'] = v['createdAt'][:10]
        if c == 'skill' and e.get('last_updated'):
            d = datetime.date.fromisoformat(v['pushedAt'][:10]); e['last_updated'] = d.strftime('%b ') + str(d.day) + d.strftime(', %Y')
print('refreshed', upd, 'records from GitHub')

# 2. new items
new_items = []
for fn in ('new_skills.json', 'new_llms.json', 'new_mcp.json', 'new_tools.json'):
    p = os.path.join(SP, fn)
    if os.path.exists(p):
        try: new_items += load(p)
        except Exception as ex: print('skip', fn, ex)
added = {c: [] for c in CATS}
for it in new_items:
    r, ct = it.get('record'), it.get('content')
    if not r or r.get('category') not in CATS or not r.get('name') or not r.get('slug'): continue
    c = r['category']
    names = {x['name'].lower() for x in full[c]}; slugs = {x['slug'] for x in full[c]}
    if r['name'].lower() in names and c != 'skill': continue
    if c == 'skill':
        k = gh_key(r)
        if any(gh_key(x) == k and x['name'].lower() == r['name'].lower() for x in full[c]): continue
    base, n = r['slug'], 2
    while r['slug'] in slugs: r['slug'] = f'{base}-{n}'; n += 1
    r.setdefault('primary_url', r.get('external_url', '')); r.setdefault('external_url', '')
    r.setdefault('extra', {})['added'] = TODAY
    full[c].insert(0, r); added[c].append(r)
    if ct: content[c][r['slug']] = ct
print('added', {c: len(v) for c, v in added.items()})
if 'added' not in slim_keys['skill']:
    for c in CATS: slim_keys[c].append('added')

# 3. write category files
for c in CATS:
    dump(full[c], os.path.join(OUT, c + '.json'))
    slim = [{'name': r['name'], 'slug': r['slug'], 'category': c, 'description': (r.get('description') or ''),
             'extra': {k: r['extra'][k] for k in slim_keys[c] if k in r.get('extra', {})}} for r in full[c]]
    # keep original slim description trimming (first 170 chars) for size
    for s in slim: s['description'] = s['description'][:170]
    dump(slim, os.path.join(OUT, c + '.slim.json'))
    dump(content[c], os.path.join(OUT, 'content', c + '.json'))
    n = BUCKETS[c]; dB = [{} for _ in range(n)]; cB = [{} for _ in range(n)]
    for r in full[c]: dB[bhash(r['slug']) % n][r['slug']] = r
    for sl, v in content[c].items(): cB[bhash(sl) % n][sl] = v
    os.makedirs(os.path.join(OUT, c), exist_ok=True)
    for i in range(n):
        dump(dB[i], os.path.join(OUT, c, 'd%02d.json' % i)); dump(cB[i], os.path.join(OUT, c, 'c%02d.json' % i))

# 4. index.json: new items first, then the original order
idx = load(os.path.join(ORIG, 'index.json'))
newidx = [{'n': r['name'], 's': r['slug'], 'c': c, 'd': r.get('description', '')} for c in CATS for r in added[c]]
dump(newidx + idx, os.path.join(OUT, 'index.json'))

# 5. trending + recent
def stars_of(r): e = r['extra']; return e.get('repo_stars') or e.get('stars') or 0
cut = (datetime.date.fromisoformat(TODAY) - datetime.timedelta(days=60)).isoformat()
pool, seen = [], set()
for c in ('skill', 'mcp_server', 'llm', 'tool', 'agent'):
    for r in full[c]:
        e = r['extra']
        if (e.get('pushed') or '') < cut or not stars_of(r): continue
        k = gh_key(r) or r['slug']
        pool.append((stars_of(r), k, r))
pool.sort(key=lambda x: -x[0])
trending = []
for st, k, r in pool:
    if k in seen: continue
    seen.add(k)
    trending.append({'name': r['name'], 'slug': r['slug'], 'category': r['category'], 'description': (r.get('description') or '')[:120],
                     'stars': st, 'created': r['extra'].get('created', ''), 'pushed': r['extra'].get('pushed', '')})
    if len(trending) >= 24: break
recent = []
for c in ('skill', 'llm', 'mcp_server', 'tool', 'agent'):
    for r in added[c]:
        e = r['extra']
        recent.append({'name': r['name'], 'slug': r['slug'], 'category': c, 'description': (r.get('description') or '')[:160],
                       'stars': stars_of(r) or None, 'created': e.get('created', ''), 'provider': e.get('provider', '')})
recent.sort(key=lambda t: (-(t['stars'] or 0), t['created']), reverse=False)
# at most two cards per repo in the 'New this month' rail, so one big repo cannot fill it
_seen = {}
def _repo(t):
    r = next((x for c in CATS for x in added[c] if x['slug'] == t['slug']), None)
    return (gh_key(r) if r else None) or t['slug']
_keep = []
for t in recent:
    k = _repo(t); _seen[k] = _seen.get(k, 0) + 1
    if _seen[k] <= 2: _keep.append(t)
recent = _keep
# llms rarely have stars: interleave so they surface in "All"
llm_r = [t for t in recent if t['category'] == 'llm']; llm_r.sort(key=lambda t: t['created'], reverse=True)
oth = [t for t in recent if t['category'] != 'llm']
mix = []
while llm_r or oth:
    mix += oth[:3]; oth = oth[3:]
    if llm_r: mix.append(llm_r.pop(0))
dump({'trending': trending, 'recent': mix, 'generated': TODAY}, os.path.join(OUT, 'trending.json'))

# 6. counts + dates in index.html
counts = {c: len(full[c]) for c in CATS}; total = sum(counts.values()); fmt = lambda n: f'{n:,}'
nnew = sum(len(v) for v in added.values())
h = open(os.path.join(ORIG, 'index.html')).read() if False else open(os.path.join(ROOT, 'index.html')).read()
h = re.sub(r"(\{key:'(\w+)',\s*label:'[^']+',\s*icon:'[^']+', count:)(\d+)", lambda m: m.group(1) + str(counts[m.group(2)]), h)
h = re.sub(r'\b1[0-9],\d{3}( AI (skills|resources))', fmt(total) + r'\1', h)
h = re.sub(r'\b1[0-9],\d{3}( free AI resources| free resources| resources)', fmt(total) + r'\1', h)
h = re.sub(r'Search [\d,]+ agent skills, [\d,]+ tools, [\d,]+ MCP servers, [\d,]+ LLMs, [\d,]+ agents and [\d,]+ design systems',
           f"Search {fmt(counts['skill'])} agent skills, {fmt(counts['tool'])} tools, {fmt(counts['mcp_server'])} MCP servers, {fmt(counts['llm'])} LLMs, {fmt(counts['agent'])} agents and {fmt(counts['design'])} design systems", h)
h = re.sub(r'Updated (June|July|August|September|October|November) 2026', 'Updated ' + UPDATED_LONG, h)
h = re.sub(r'\b1[0-9],\d{3} AI <em>resources</em>', fmt(total) + ' AI <em>resources</em>', h)
h = h.replace('{{UPDATED_LONG}}', UPDATED_LONG).replace('{{UPDATED_SHORT}}', UPDATED_SHORT).replace('{{NEW_COUNT}}', str(nnew))
h = re.sub(r"(<b>)\d+( new</b> this month)", lambda m: m.group(1) + str(nnew) + m.group(2), h)
open(os.path.join(ROOT, 'index.html'), 'w').write(h)
print('counts', counts, 'total', total, 'new', nnew, 'trending', len(trending), 'recent', len(mix))
