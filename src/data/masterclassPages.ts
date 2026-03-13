export type {
  MasterclassFAQ,
  ValueProp,
  Lesson,
  Testimonial,
  Benefit,
  AudienceTarget,
  MasterclassPageData,
} from "./masterclass/types";

const loaders: Record<string, () => Promise<{ default: import("./masterclass/types").MasterclassPageData }>> = {
  "g-venket-ram": () => import("./masterclass/g-venket-ram"),
  "anthony-gonsalvez": () => import("./masterclass/anthony-gonsalvez"),
  "drk-kiran": () => import("./masterclass/drk-kiran"),
};

export const VALID_SLUGS = Object.keys(loaders);

export async function getMasterclassData(slug: string) {
  const loader = loaders[slug];
  if (!loader) return undefined;
  const mod = await loader();
  return mod.default;
}
