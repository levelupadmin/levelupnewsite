/**
 * One row per masterclass: the app offering it sells, its price and the
 * language it is taught in.
 *
 * This is the single source for:
 * - Meta Pixel and Google tag event values (BaseLayout.astro reads it),
 * - the checkout URL every buy button points at,
 * - the sticky mobile buy bar's default price and link.
 *
 * `offeringId` is the app's `offerings.id`. It is also the Meta `content_ids`
 * value on the site AND in the app (checkout, Purchase), so Meta can join
 * "viewed Nelson" to "bought Nelson". Do not use the slug as a content id.
 *
 * `price` must equal `offerings.price_inr` in the app. If the price changes in
 * the app admin, change it here in the same release.
 *
 * The masterclass kit (branch mc/shared) adds src/data/masterclass/shared.ts
 * with the same ids, prices and language lines. Once both are merged, keep
 * one: this file can re-export from shared.ts. The language lines here match
 * shared.ts word for word; GVR and DRK are still marked "verify" there.
 */

export const CHECKOUT_ORIGIN = "https://app.leveluplearning.in";

export interface MasterclassOffering {
  /** URL slug under /masterclass/ */
  slug: string;
  /** App offering UUID: checkout path segment and Meta content_ids value */
  offeringId: string;
  /** List price in INR, equal to offerings.price_inr */
  price: number;
  currency: "INR";
  /** Name sent as Meta content_name and Google item_name */
  name: string;
  instructor: string;
  /** Teaching language as the page states it */
  language: string;
  /** Full checkout URL */
  checkoutUrl: string;
}

type Row = Omit<MasterclassOffering, "currency" | "checkoutUrl">;

const ROWS: Row[] = [
  {
    slug: "nelson-dilipkumar",
    offeringId: "190a09ee-3f34-4242-ad9f-70ddedcc8eae",
    price: 2499,
    name: "Nelson Dilipkumar Masterclass",
    instructor: "Nelson Dilipkumar",
    language: "Tamil, with English subtitles",
  },
  {
    slug: "lokesh-kanagaraj",
    offeringId: "895128ba-068a-41b0-91c9-6326d2c58a4d",
    price: 1499,
    name: "Lokesh Kanagaraj Masterclass",
    instructor: "Lokesh Kanagaraj",
    language: "Tamil, with English subtitles",
  },
  {
    slug: "ravi-basrur",
    offeringId: "c95d0a25-b6a4-479c-a213-2c99cc2a57be",
    price: 2499,
    name: "Ravi Basrur Music Masterclass",
    instructor: "Ravi Basrur",
    language: "Kannada, with English subtitles",
  },
  {
    slug: "karthik-subbaraj",
    offeringId: "a12026ce-d878-4f00-9ffd-820511cdcd54",
    price: 2499,
    name: "Karthik Subbaraj Masterclass",
    instructor: "Karthik Subbaraj",
    language: "Tamil, with English subtitles",
  },
  {
    slug: "g-venket-ram",
    offeringId: "d9084740-4d74-449c-a667-03de38d4a0d5",
    price: 2499,
    name: "G Venket Ram Masterclass",
    instructor: "G Venket Ram",
    language: "Tamil and English, with English subtitles",
  },
  {
    slug: "anthony-gonsalvez",
    offeringId: "7bebcde3-fef9-4431-b7f8-e9f933a739eb",
    price: 1999,
    name: "Anthony Gonsalvez Masterclass",
    instructor: "Anthony Gonsalvez",
    language: "English, with English subtitles",
  },
  {
    slug: "drk-kiran",
    offeringId: "b057ed17-a520-4192-8699-f0ba62cf1d32",
    price: 999,
    name: "DRK Kiran Masterclass",
    instructor: "DRK Kiran",
    language: "Tamil and English",
  },
];

export const OFFERINGS: MasterclassOffering[] = ROWS.map((r) => ({
  ...r,
  currency: "INR",
  checkoutUrl: `${CHECKOUT_ORIGIN}/checkout/${r.offeringId}`,
}));

export const OFFERINGS_BY_SLUG: Record<string, MasterclassOffering> = Object.fromEntries(
  OFFERINGS.map((o) => [o.slug, o]),
);

export function getOffering(slug: string | undefined): MasterclassOffering | undefined {
  return slug ? OFFERINGS_BY_SLUG[slug] : undefined;
}

/** "₹2,499" */
export function formatInr(n: number): string {
  return `₹${n.toLocaleString("en-IN")}`;
}
