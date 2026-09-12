import { useRef, type CSSProperties } from "react";
import {
  FOOD_ITEMS,
  PLATE,
  STEAM_PUFFS,
  BRAND_TAGLINE,
} from "./foodHeroConfig";
import {
  useFoodHeroTimeline,
  type FoodHeroElements,
} from "./useFoodHeroTimeline";
import "./FoodHero.css";

export function FoodHero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const elementsRef = useRef<FoodHeroElements>({
    stage: null,
    plate: null,
    wordmarkAroma: null,
    wordmarkGrill: null,
    scrollHint: null,
    outers: {},
    inners: {},
    steamGroup: null,
    steamPuffs: STEAM_PUFFS.map(() => null),
    tagline: null,
    cta: null,
  });

  useFoodHeroTimeline(sectionRef, elementsRef);

  return (
    <section className="food-hero" id="start" ref={sectionRef}>
      <div className="food-hero__sticky">
        <div className="food-hero__backdrop" aria-hidden="true" />

        <div
          className="food-hero__stage"
          ref={(el) => {
            elementsRef.current.stage = el;
          }}
        >
          <div
            className="food-plate"
            aria-hidden="true"
            style={
              {
                "--fh-plate-width-d": PLATE.desktop.width,
                "--fh-plate-width-m": PLATE.mobile.width,
              } as CSSProperties
            }
            ref={(el) => {
              elementsRef.current.plate = el;
            }}
          >
            <div className="food-plate__rim" />
            <div className="food-plate__well" />
          </div>

          <div
            className="food-hero__steam"
            aria-hidden="true"
            ref={(el) => {
              elementsRef.current.steamGroup = el;
            }}
          >
            {STEAM_PUFFS.map((puff, index) => (
              <div
                key={index}
                className="food-hero__steam-puff"
                style={{ width: puff.size }}
                ref={(el) => {
                  elementsRef.current.steamPuffs[index] = el;
                }}
              />
            ))}
          </div>

          <div className="food-hero__wordmark" aria-hidden="true">
            <span
              className="food-hero__wordmark-line food-hero__wordmark-line--aroma"
              ref={(el) => {
                elementsRef.current.wordmarkAroma = el;
              }}
            >
              AROMA
            </span>
            <span
              className="food-hero__wordmark-line food-hero__wordmark-line--grill"
              ref={(el) => {
                elementsRef.current.wordmarkGrill = el;
              }}
            >
              GRILL
            </span>
          </div>

          {FOOD_ITEMS.map((item) => (
            <div
              key={item.key}
              className="food-item"
              style={
                {
                  "--fh-width-d": item.desktop.width,
                  "--fh-width-m": item.mobile.width,
                } as CSSProperties
              }
              ref={(el) => {
                if (el) elementsRef.current.outers[item.key] = el;
              }}
            >
              <img
                src={item.src}
                alt={item.alt}
                className="food-item__inner"
                draggable={false}
                ref={(el) => {
                  if (el) elementsRef.current.inners[item.key] = el;
                }}
              />
            </div>
          ))}

          <div
            className="food-hero__scroll-hint"
            ref={(el) => {
              elementsRef.current.scrollHint = el;
            }}
          >
            <span>SCROLLEN</span>
            <span className="food-hero__scroll-hint-line" />
          </div>
        </div>

        <div className="food-hero__brand" aria-hidden="false">
          <p
            className="food-hero__tagline"
            ref={(el) => {
              elementsRef.current.tagline = el;
            }}
          >
            {BRAND_TAGLINE}
          </p>
          <a
            href="#speisekarte"
            className="food-hero__cta"
            ref={(el) => {
              elementsRef.current.cta = el;
            }}
          >
            <span>Speisekarte entdecken</span>
          </a>
        </div>
      </div>
    </section>
  );
}
