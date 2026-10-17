/**
 * The cross-sell cards for CrossSell.astro, worked out in one place so no
 * page can show a different name, price or fact. Every fact comes from
 * OFFERINGS in src/data/masterclass/shared.ts.
 *
 * Light on purpose: safe to import from a React island.
 */
import {
  MASTERCLASS_SLUGS,
  OFFERINGS,
  formatPrice,
  formatRuntime,
  type MasterclassSlug,
} from "@/data/masterclass/shared";
// Imported from a .ts file, so the Vite plugin in astro.config.mjs turns
// each of these into a plain URL string.
import karthikImg from "@/assets/karthik-subbaraj-masterclass.png";
import anthonyImg from "@/assets/anthony-gonsalvez-masterclass.png";
import venketImg from "@/assets/venket-ram.png";
import kiranImg from "@/assets/drk-kiran.webp";
import raviImg from "@/assets/ravi-basrur.webp";
import lokeshImg from "@/assets/lokesh-kanagaraj.png";
import nelsonImg from "@/assets/nelson-dilipkumar.jpg";

export const PORTRAITS: Record<MasterclassSlug, string> = {
  "nelson-dilipkumar": nelsonImg as unknown as string,
  "lokesh-kanagaraj": lokeshImg as unknown as string,
  "ravi-basrur": raviImg as unknown as string,
  "karthik-subbaraj": karthikImg as unknown as string,
  "g-venket-ram": venketImg as unknown as string,
  "anthony-gonsalvez": anthonyImg as unknown as string,
  "drk-kiran": kiranImg as unknown as string,
};

export interface CrossSellCard {
  slug: MasterclassSlug;
  href: string;
  instructor: string;
  craft: string;
  image: string;
  alt: string;
  /** "15 lessons · 1 h 34 min" */
  facts: string;
  /** "₹1,499" */
  price: string;
}

/**
 * Cards for every masterclass except `current`, with `order` first.
 * `currentName` matches a card by instructor name instead of slug.
 */
export function crossSellCards(opts: {
  current?: string;
  currentName?: string;
  order?: MasterclassSlug[];
  limit?: number;
}): CrossSellCard[] {
  const { current, currentName, order = [], limit } = opts;
  const slugs = [...order.filter((s) => s in OFFERINGS), ...MASTERCLASS_SLUGS.filter((s) => !order.includes(s))]
    .filter((s) => s !== current && OFFERINGS[s].instructor !== currentName)
    .slice(0, limit);
  return slugs.map((slug) => {
    const o = OFFERINGS[slug];
    // Non-breaking spaces keep "5 h 10 min" and "16 lessons" whole.
    const facts = `${o.lessons}\u00a0lessons · ${formatRuntime(o.runtimeMinutes).replace(/ /g, "\u00a0")}`;
    const price = formatPrice(o.price);
    return {
      slug,
      href: `/masterclass/${slug}/`,
      instructor: o.instructor,
      craft: o.craft,
      image: PORTRAITS[slug],
      alt: `${o.instructor}, LevelUp masterclass`,
      facts,
      price,
    };
  });
}
