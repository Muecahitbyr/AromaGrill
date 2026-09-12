import { useRef } from "react";
import { MENU_CATEGORIES } from "../../data/menuItems";
import { useMenuAnimations, type ElementMap } from "./useMenuAnimations";
import "./Menu.css";

export function Menu() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const categoryHeadingRefs = useRef<ElementMap>({});
  const rowRefs = useRef<ElementMap>({});
  const mediaRefs = useRef<ElementMap>({});

  useMenuAnimations(
    sectionRef,
    headingRef,
    categoryHeadingRefs,
    rowRefs,
    mediaRefs,
  );

  return (
    <section className="menu" id="speisekarte" ref={sectionRef}>
      <div className="menu__intro">
        <p className="menu__eyebrow">Frisch vom Grill</p>
        <h2 className="menu__heading" ref={headingRef}>
          UNSERE SPEISEKARTE
        </h2>
      </div>

      <div className="menu__categories">
        {MENU_CATEGORIES.map((category) => (
          <div className="menu-category" key={category.id}>
            <h3
              className="menu-category__title"
              ref={(el) => {
                categoryHeadingRefs.current[category.id] = el;
              }}
            >
              {category.name}
            </h3>

            <div className="menu-category__rows">
              {category.items.map((item) => (
                <article
                  key={item.id}
                  className="menu-row"
                  ref={(el) => {
                    rowRefs.current[item.id] = el;
                  }}
                >
                  <div className="menu-row__media">
                    <div
                      className="menu-row__parallax"
                      ref={(el) => {
                        mediaRefs.current[item.id] = el;
                      }}
                    >
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="menu-row__image"
                          draggable={false}
                        />
                      ) : (
                        <div
                          className="menu-row__placeholder"
                          aria-hidden="true"
                        >
                          <span>{item.name}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="menu-row__body">
                    <div className="menu-row__heading">
                      <h4 className="menu-row__name">{item.name}</h4>
                      <span className="menu-row__price">{item.price}</span>
                    </div>
                    <p className="menu-row__description">
                      {item.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
