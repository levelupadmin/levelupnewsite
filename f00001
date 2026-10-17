export type {
  Lesson,
  Skill,
  Quote,
  FAQ,
  Clip,
  Credit,
  MasterclassPageData,
} from "./masterclass/types";

import gVenketRam from "./masterclass/g-venket-ram";
import anthonyGonsalvez from "./masterclass/anthony-gonsalvez";
import drkKiran from "./masterclass/drk-kiran";
import { assertFacts } from "./masterclass/template";
import type { MasterclassPageData } from "./masterclass/types";

/** Pages rendered by src/pages/masterclass/[slug].astro. */
const PAGES: Record<string, MasterclassPageData> = {
  "g-venket-ram": gVenketRam,
  "anthony-gonsalvez": anthonyGonsalvez,
  "drk-kiran": drkKiran,
};

export const VALID_SLUGS = Object.keys(PAGES);

/** Build-time only: throws if a page's facts disagree with OFFERINGS. */
export function getMasterclassData(slug: string): MasterclassPageData | undefined {
  const page = PAGES[slug];
  if (page) assertFacts(page);
  return page;
}
