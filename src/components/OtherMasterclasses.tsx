import type { CSSProperties } from "react";
import "@/styles/masterclass.css";
import { Picture } from "@/components/Picture";
import FadeInSection from "@/components/FadeInSection";
import { crossSellCards } from "@/components/masterclass/crossSell";
import type { MasterclassSlug } from "@/data/masterclass/shared";

interface Props {
  /** Instructor name of the current page; that card is left out. */
  currentName?: string;
  /** Same, by slug. Either works. */
  currentSlug?: string;
  /** Slugs to show first, in this order. */
  order?: MasterclassSlug[];
}

/**
 * Cards for the other masterclasses: portrait, craft, name, lessons, runtime
 * and price as text (from src/data/masterclass/shared.ts), so a buyer can
 * compare without opening each page. Same cards and styles as the Astro
 * CrossSell section, so every masterclass page shows one design.
 * Renders to plain HTML; it needs no client directive.
 */
const OtherMasterclasses = ({ currentName, currentSlug, order = [] }: Props) => {
  const cards = crossSellCards({ current: currentSlug, currentName, order });

  return (
    <section className="mck mck-section" aria-labelledby="mck-h-more-masterclasses">
      <div className="mck-wrap">
        <FadeInSection className="mck-head">
          <p className="mck-eyebrow">Keep learning</p>
          <h2 id="mck-h-more-masterclasses" className="mck-h2">
            More <em>masterclasses</em>
          </h2>
        </FadeInSection>
        <ul className="mck-xsell" data-count={cards.length} style={{ "--mck-xsell-n": cards.length } as CSSProperties}>
          {cards.map((c) => (
            <li key={c.slug} className="mck-xsell__item">
              <a className="mck-card mck-card--lift mck-xsell__link" href={c.href}>
                <div className="mck-xsell__img">
                  <Picture src={c.image} alt={c.alt} width={480} height={600} sizes="(min-width: 760px) 340px, 46vw" />
                </div>
                <div className="mck-xsell__body">
                  <p className="mck-xsell__craft">{c.craft}</p>
                  <p className="mck-xsell__name">{c.instructor}</p>
                  <p className="mck-xsell__facts">{c.facts}</p>
                  <p className="mck-xsell__buy">
                    <span>{c.price}</span>
                    <span className="mck-xsell__go" aria-hidden="true">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M13 5l7 7-7 7" />
                      </svg>
                    </span>
                  </p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default OtherMasterclasses;
