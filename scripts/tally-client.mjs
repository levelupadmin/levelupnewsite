/**
 * Minimal Tally API client.
 *
 * Tally returns 403 on concurrent requests from the same key, so every call
 * goes through one queue with a delay between requests. Do not "optimise"
 * this into Promise.all.
 */

import { readFileSync } from "node:fs";

const API = "https://api.tally.so";
const DELAY_MS = 350;
const MAX_RETRIES = 4;

function loadKey() {
  if (process.env.TALLY_API_KEY) return process.env.TALLY_API_KEY;

  const envPath =
    process.env.TALLY_ENV_FILE ||
    `${process.env.HOME}/Library/Mobile Documents/com~apple~CloudDocs/Claude Projects/LevelUp Core/.env.tally`;

  try {
    const raw = readFileSync(envPath, "utf8");
    const m = raw.match(/^TALLY_API_KEY=(.*)$/m);
    if (m) return m[1].trim().replace(/^["']|["']$/g, "");
  } catch {
    /* fall through */
  }
  throw new Error(
    "No Tally API key. Set TALLY_API_KEY or point TALLY_ENV_FILE at the .env.tally file."
  );
}

const KEY = loadKey();
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let chain = Promise.resolve();

async function request(path) {
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    const res = await fetch(`${API}${path}`, {
      headers: {
        Authorization: `Bearer ${KEY}`,
        Accept: "application/json",
      },
    });

    if (res.ok) return res.json();

    // 403 here is Tally's concurrency guard, not a permissions problem, so it
    // is worth backing off and retrying. 429 is the documented rate limit.
    if ((res.status === 403 || res.status === 429) && attempt < MAX_RETRIES) {
      await sleep(DELAY_MS * Math.pow(2, attempt + 1));
      continue;
    }

    const body = await res.text().catch(() => "");
    throw new Error(`Tally ${res.status} on ${path}: ${body.slice(0, 200)}`);
  }
}

/** Serialise every call and space them out. */
export function tally(path) {
  const run = chain.then(async () => {
    const out = await request(path);
    await sleep(DELAY_MS);
    return out;
  });
  // Keep the queue alive even if one call rejects.
  chain = run.then(
    () => undefined,
    () => undefined
  );
  return run;
}

/**
 * Walk a paginated collection to the end. `/workspaces` rejects `limit`, and
 * `/submissions` returns its rows under `submissions` rather than `items`.
 * Returns the rows plus whatever the first page carried alongside them
 * (the submissions endpoint puts the question definitions there).
 */
export async function tallyAll(path, { cap = Infinity } = {}) {
  const items = [];
  let first = null;
  let page = 1;
  for (;;) {
    const sep = path.includes("?") ? "&" : "?";
    const data = await tally(`${path}${sep}page=${page}`);
    first ??= data;
    const batch = data.items ?? data.submissions ?? [];
    items.push(...batch);
    if (!data.hasMore || batch.length === 0 || items.length >= cap) break;
    page++;
  }
  items.meta = first;
  return items;
}
