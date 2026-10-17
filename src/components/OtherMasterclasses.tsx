import { Link } from "react-router-dom";
import { Picture } from "@/components/Picture";
import FadeInSection from "@/components/FadeInSection";
import { OFFERINGS, formatPrice, formatRuntime, type MasterclassSlug } from "@/data/masterclass/shared";
import karthikImg from "@/assets/karthik-subbaraj-masterclass.png";
import anthonyImg from "@/assets/anthony-gonsalvez-masterclass.png";
import venketImg from "@/assets/venket-ram.png";
import kiranImg from "@/assets/drk-kiran.webp";
import raviImg from "@/assets/ravi-basrur.webp";
import lokeshImg from "@/assets/lokesh-kanagaraj.png";
import nelsonImg from "@/assets/nelson-dilipkumar.jpg";

const otherMasterclasses: { slug: MasterclassSlug; name: string; image: string; href: string }[] = [
  { slug: "karthik-subbaraj", name: "Karthik Subbaraj", image: karthikImg, href: "/masterclass/karthik-subbaraj" },
  { slug: "anthony-gonsalvez", name: "Anthony Gonsalvez", image: anthonyImg, href: "/masterclass/anthony-gonsalvez" },
  { slug: "g-venket-ram", name: "G Venket Ram", image: venketImg, href: "/masterclass/g-venket-ram" },
  { slug: "drk-kiran", name: "DRK Kiran", image: kiranImg, href: "/masterclass/drk-kiran" },
  { slug: "ravi-basrur", name: "Ravi Basrur", image: raviImg, href: "/masterclass/ravi-basrur" },
  { slug: "lokesh-kanagaraj", name: "Lokesh Kanagaraj", image: lokeshImg, href: "/masterclass/lokesh-kanagaraj" },
  { slug: "nelson-dilipkumar", name: "Nelson Dilipkumar", image: nelsonImg, href: "/masterclass/nelson-dilipkumar" },
];

interface Props {
  /** Instructor name of the current page; that card is left out. */
  currentName?: string;
  /** Same, by slug. Either works. */
  currentSlug?: string;
  /** Slugs to show first, in this order. */
  order?: MasterclassSlug[];
}

/**
 * Cards for the other masterclasses: portrait, then name, craft, lessons,
 * runtime and price as text (from src/data/masterclass/shared.ts), so a
 * buyer can compare without opening each page.
 */
const OtherMasterclasses = ({ currentName, currentSlug, order = [] }: Props) => {
  const list = [
    ...order.map((s) => otherMasterclasses.find((m) => m.slug === s)).filter(Boolean),
    ...otherMasterclasses.filter((m) => !order.includes(m.slug)),
  ].filter((mc) => mc && mc.name !== currentName && mc.slug !== currentSlug) as typeof otherMasterclasses;

  return (
    <section className="relative bg-background py-12 md:py-16">
      <FadeInSection className="text-center px-6 md:px-12 mb-8 md:mb-10">
        <h2 className="font-serif-display text-2xl sm:text-3xl md:text-4xl font-medium text-hero-headline tracking-[-0.03em]">
          Check out our{" "}
          <em className="not-italic font-normal text-gradient-amber">other masterclasses</em>
        </h2>
      </FadeInSection>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex gap-5 md:gap-6 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide">
          {list.map((mc) => {
            const o = OFFERINGS[mc.slug];
            return (
              <Link
                key={mc.slug}
                to={mc.href}
                className="group flex-shrink-0 snap-start w-[180px] md:w-[220px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary rounded-sm"
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-card shadow-md transition-shadow duration-500 group-hover:shadow-[0_0_20px_2px_hsl(38_75%_55%/0.35)]">
                  <Picture
                    src={mc.image}
                    alt={`Portrait of ${mc.name}, Instructor at LevelUp Learning`}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06] motion-reduce:transition-none"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 rounded-sm ring-1 ring-inset ring-white/0 group-hover:ring-primary/40 transition-all duration-500 pointer-events-none" />
                </div>
                {o && (
                  <div className="mt-3 text-left">
                    <p className="text-[15px] font-semibold text-foreground leading-tight">{mc.name}</p>
                    <p className="mt-0.5 text-[12px] uppercase tracking-[0.08em] text-primary">{o.craft}</p>
                    <p className="mt-1 text-[13px] text-muted-foreground">
                      {o.lessons} lessons · {formatRuntime(o.runtimeMinutes)} · {formatPrice(o.price)}
                    </p>
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OtherMasterclasses;
