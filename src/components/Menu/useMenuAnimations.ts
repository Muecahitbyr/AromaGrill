import type { RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export type ElementMap = Record<string, HTMLElement | null>;

/** Ref-callback helper: keeps `map` limited to currently-mounted elements
 * (React calls this with `null` when a keyed item unmounts — e.g. when the
 * active category switches to a different set of dishes), so stale
 * references from a previous category never linger in the map. */
export function setMapRef(
  map: RefObject<ElementMap>,
  id: string,
  el: HTMLElement | null,
) {
  if (!map.current) return;
  if (el) map.current[id] = el;
  else delete map.current[id];
}

/**
 * Reveals the "UNSERE SPEISEKARTE" heading once, then drives the pinned
 * per-category gallery: as the visitor scrolls through the tall
 * `.menu-gallery` block, a single ScrollTrigger divides its scroll range
 * into one segment per dish, crossfading the shared image and highlighting
 * the matching row in the list — no auto-advancing to another category,
 * scrolling only steps through whichever category is currently selected.
 * Rebuilds whenever `activeCategoryId` changes (category tab clicked).
 */
export function useMenuAnimations(
  sectionRef: RefObject<HTMLElement | null>,
  headingRef: RefObject<HTMLHeadingElement | null>,
  galleryRef: RefObject<HTMLDivElement | null>,
  imageRefs: RefObject<ElementMap>,
  rowRefs: RefObject<ElementMap>,
  itemIds: string[],
  activeCategoryId: string,
) {
  useGSAP(
    () => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const heading = headingRef.current;
      if (heading) {
        if (reduceMotion) {
          gsap.set(heading, { opacity: 1, y: 0, scale: 1 });
        } else {
          gsap.fromTo(
            heading,
            { opacity: 0, y: 46, scale: 0.95 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: heading,
                start: "top 82%",
                toggleActions: "play none none reverse",
              },
            },
          );
        }
      }
    },
    { scope: sectionRef, dependencies: [] },
  );

  useGSAP(
    () => {
      const gallery = galleryRef.current;
      if (!gallery || itemIds.length === 0) return;

      const images = itemIds
        .map((id) => imageRefs.current?.[id])
        .filter((el): el is HTMLElement => Boolean(el));
      const rows = itemIds
        .map((id) => rowRefs.current?.[id])
        .filter((el): el is HTMLElement => Boolean(el));
      if (!images.length) return;

      // Always start on the first dish of whichever category is active.
      gsap.set(images, { opacity: 0 });
      gsap.set(images[0], { opacity: 1 });
      rows.forEach((row, i) => row.classList.toggle("is-active", i === 0));

      if (reduceMotionOrSingle(itemIds.length)) return;

      let activeIndex = 0;
      ScrollTrigger.create({
        trigger: gallery,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate(self) {
          const idx = Math.min(
            images.length - 1,
            Math.floor(self.progress * images.length),
          );
          if (idx === activeIndex) return;
          activeIndex = idx;
          images.forEach((img, i) => {
            gsap.to(img, {
              opacity: i === idx ? 1 : 0,
              duration: 0.5,
              ease: "power2.out",
              overwrite: true,
            });
          });
          rows.forEach((row, i) => row.classList.toggle("is-active", i === idx));
        },
      });

      // Switching categories changes this block's height (item count
      // differs), which shifts every ScrollTrigger further down the page —
      // refresh so their cached start/end positions stay correct.
      ScrollTrigger.refresh();
    },
    { scope: galleryRef, dependencies: [activeCategoryId] },
  );
}

function reduceMotionOrSingle(count: number) {
  return (
    count <= 1 ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}
