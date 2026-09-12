import type { RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export type ElementMap = Record<string, HTMLElement | null>;

/**
 * Reveals the "UNSERE SPEISEKARTE" heading, each category heading and each
 * menu row as it scrolls into view (fade + rise + slight scale), plus a
 * subtle scrub-linked parallax on each row's image. Every ScrollTrigger
 * fires independently as the user reaches that element — this section
 * scrolls normally, it isn't a single pinned master timeline.
 */
export function useMenuAnimations(
  sectionRef: RefObject<HTMLElement | null>,
  headingRef: RefObject<HTMLHeadingElement | null>,
  categoryHeadingRefs: RefObject<ElementMap>,
  rowRefs: RefObject<ElementMap>,
  mediaRefs: RefObject<ElementMap>,
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

      Object.values(categoryHeadingRefs.current ?? {}).forEach((el) => {
        if (!el) return;
        if (reduceMotion) {
          gsap.set(el, { opacity: 1, x: 0 });
          return;
        }
        gsap.fromTo(
          el,
          { opacity: 0, x: -24 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });

      Object.entries(rowRefs.current ?? {}).forEach(([id, row]) => {
        if (!row) return;
        const media = mediaRefs.current?.[id];

        if (reduceMotion) {
          gsap.set(row, { opacity: 1, y: 0, scale: 1 });
          return;
        }

        gsap.fromTo(
          row,
          { opacity: 0, y: 60, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          },
        );

        if (media) {
          gsap.fromTo(
            media,
            { yPercent: -8 },
            {
              yPercent: 8,
              ease: "none",
              scrollTrigger: {
                trigger: row,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            },
          );
        }
      });
    },
    { scope: sectionRef },
  );
}
