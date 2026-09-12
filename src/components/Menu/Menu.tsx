import { useMemo, useRef, useState } from "react";
import { MENU_CATEGORIES } from "../../data/menuItems";
import { scrollToSection } from "../../lib/scrollToSection";
import {
  useMenuAnimations,
  setMapRef,
  type ElementMap,
} from "./useMenuAnimations";
import "./Menu.css";

const MENU_GALLERY_ID = "speisekarte-galerie";

export function Menu() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const galleryRef = useRef<HTMLDivElement | null>(null);
  const imageRefs = useRef<ElementMap>({});
  const rowRefs = useRef<ElementMap>({});

  const [activeCategoryId, setActiveCategoryId] = useState(
    MENU_CATEGORIES[0].id,
  );

  const activeCategory = useMemo(
    () =>
      MENU_CATEGORIES.find((category) => category.id === activeCategoryId) ??
      MENU_CATEGORIES[0],
    [activeCategoryId],
  );
  const itemIds = useMemo(
    () => activeCategory.items.map((item) => item.id),
    [activeCategory],
  );

  useMenuAnimations(
    sectionRef,
    headingRef,
    galleryRef,
    imageRefs,
    rowRefs,
    itemIds,
    activeCategoryId,
  );

  function handleSelectCategory(id: string) {
    if (id === activeCategoryId) return;
    // Jump to the top of the gallery — staying at the old scroll position
    // could now land anywhere inside (or past) the newly selected gallery,
    // since each category has its own dish count (its own scroll height).
    // Instant (not smoothly animated): the gallery is about to change height
    // as React re-renders, and an in-flight smooth scroll would race the
    // ScrollTrigger refresh that follows. The tabs themselves live inside
    // the pinned view, so this is the only scroll needed — no need to
    // scroll up to reach them first, from wherever in the category you are.
    scrollToSection(MENU_GALLERY_ID, { instant: true });
    setActiveCategoryId(id);
  }

  return (
    <section className="menu" id="speisekarte" ref={sectionRef}>
      <div className="menu__intro">
        <p className="menu__eyebrow">Frisch vom Grill</p>
        <h2 className="menu__heading" ref={headingRef}>
          UNSERE SPEISEKARTE
        </h2>
      </div>

      <div
        className="menu-gallery"
        id={MENU_GALLERY_ID}
        style={{ height: `${activeCategory.items.length * 100}vh` }}
        ref={galleryRef}
      >
        <div className="menu-gallery__sticky">
          <div className="menu-tabs">
            {MENU_CATEGORIES.map((category) => (
              <button
                key={category.id}
                type="button"
                className={
                  category.id === activeCategoryId
                    ? "menu-tabs__btn is-active"
                    : "menu-tabs__btn"
                }
                aria-pressed={category.id === activeCategoryId}
                onClick={() => handleSelectCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>

          <div className="menu-gallery__content">
            <div className="menu-gallery__media">
              {activeCategory.items.map((item) => (
                <div
                  key={item.id}
                  className="menu-gallery__image-slot"
                  ref={(el) => setMapRef(imageRefs, item.id, el)}
                >
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="menu-gallery__image"
                      draggable={false}
                    />
                  ) : (
                    <div
                      className="menu-gallery__placeholder"
                      aria-hidden="true"
                    >
                      <span>{item.name}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="menu-gallery__list">
              {activeCategory.items.map((item, index) => (
                <div
                  key={item.id}
                  className="menu-gallery__row"
                  ref={(el) => setMapRef(rowRefs, item.id, el)}
                >
                  <div className="menu-gallery__row-heading">
                    <span className="menu-gallery__row-index">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h4 className="menu-gallery__row-name">{item.name}</h4>
                    <span className="menu-gallery__row-price">
                      {item.price}
                    </span>
                  </div>
                  <div className="menu-gallery__row-desc">
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
