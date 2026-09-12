import type { RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  FOOD_ITEMS,
  PHASES,
  PLATE,
  STEAM_PUFFS,
  WORDMARK,
  type FoodKey,
} from "./foodHeroConfig";

gsap.registerPlugin(ScrollTrigger);

export interface FoodHeroElements {
  stage: HTMLDivElement | null;
  plate: HTMLDivElement | null;
  wordmarkAroma: HTMLSpanElement | null;
  wordmarkGrill: HTMLSpanElement | null;
  scrollHint: HTMLDivElement | null;
  outers: Partial<Record<FoodKey, HTMLDivElement>>;
  inners: Partial<Record<FoodKey, HTMLImageElement>>;
  steamGroup: HTMLDivElement | null;
  steamPuffs: (HTMLDivElement | null)[];
  tagline: HTMLParagraphElement | null;
  cta: HTMLAnchorElement | null;
}

export function useFoodHeroTimeline(
  sectionRef: RefObject<HTMLElement | null>,
  elementsRef: RefObject<FoodHeroElements>,
) {
  useGSAP(
    () => {
      const section = sectionRef.current;
      const elements = elementsRef.current;
      if (!section || !elements || !elements.stage) return;

      const mm = gsap.matchMedia();

      // Both `isDesktop` and `isMobile` are listed explicitly (rather than
      // deriving mobile from "not desktop") because gsap.matchMedia only
      // invokes the callback when at least one of the passed queries
      // currently matches — without an always-true query at every width,
      // narrow viewports would never trigger the handler at all.
      mm.add(
        {
          isDesktop: "(min-width: 900px)",
          isMobile: "(max-width: 899.98px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { isDesktop, reduceMotion } = context.conditions as {
            isDesktop: boolean;
            isMobile: boolean;
            reduceMotion: boolean;
          };
          const breakpoint: "desktop" | "mobile" = isDesktop
            ? "desktop"
            : "mobile";

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom bottom",
              scrub: 1,
              invalidateOnRefresh: true,
            },
          });

          if (reduceMotion) {
            buildReducedMotionTimeline(tl, elements, breakpoint);
          } else {
            buildStoryTimeline(tl, elements, breakpoint);
            startIdleFloat(elements, breakpoint);
            startSteam(elements);
          }

          // matchMedia reverts everything created in this callback
          // (timeline, tweens, gsap.set calls) automatically on cleanup.
          return () => {
            tl.kill();
          };
        },
      );

      return () => mm.revert();
    },
    { scope: sectionRef },
  );
}

/**
 * The full seven-phase story:
 *   1. ingredients float freely, scattered
 *   2. AROMA / GRILL appears large, centered, interleaved with the food
 *   3. each ingredient sweeps past camera on its own curved path
 *   4. the plate rises into the center as the wordmark shifts up
 *   5. ingredients land on the plate one after another
 *   6. the finished grill plate
 *   7. a subtle camera settle + tagline/CTA reveal
 *
 * Every food element is a two-layer wrapper: the outer <div> carries the
 * entire scroll-driven journey (position/rotation/scale/tilt across all
 * phases); the inner <img> only carries the continuous idle float, added
 * separately in startIdleFloat so the two never fight over the same
 * transform properties.
 */
function buildStoryTimeline(
  tl: gsap.core.Timeline,
  elements: FoodHeroElements,
  breakpoint: "desktop" | "mobile",
) {
  const stage = elements.stage!;
  const plate = elements.plate!;
  const plateCfg = PLATE[breakpoint];
  const wordmarkUpShift = WORDMARK[breakpoint].upShiftY;

  // transformOrigin is biased above center so the final camera settle (phase
  // 7) grows the scene mostly upward — keeping the plate's bottom edge from
  // ever pushing past the viewport edge (the original cause of the cutoff).
  gsap.set(stage, { scale: 1, transformOrigin: "50% 38%" });

  if (elements.steamGroup) {
    gsap.set(elements.steamGroup, { opacity: 0 });
    tl.to(
      elements.steamGroup,
      {
        opacity: 1,
        ease: "sine.in",
        duration: PHASES.final[0] - PHASES.landing[1] + 4,
      },
      PHASES.landing[1] - 4,
    );
  }

  // --- Plate: starts off-screen below, small and slightly tilted --------
  gsap.set(plate, {
    xPercent: -50,
    yPercent: -50,
    x: plateCfg.restPos.x,
    y: `calc(${plateCfg.restPos.y} + ${plateCfg.startYOffset})`,
    rotation: plateCfg.startRotation,
    scale: plateCfg.startScale,
    opacity: 0,
    transformOrigin: "50% 50%",
  });

  // --- Wordmark: hidden until phase 2, then a strong centered entrance ---
  const wordmarkEls = [elements.wordmarkAroma, elements.wordmarkGrill].filter(
    (el): el is HTMLElement => Boolean(el),
  );
  if (wordmarkEls.length) {
    gsap.set(wordmarkEls, { opacity: 0, scale: 0.7, y: "6vh" });
  }

  // --- Scroll hint: only relevant during phase 1 --------------------------
  if (elements.scrollHint) {
    gsap.set(elements.scrollHint, { opacity: 1 });
    tl.to(
      elements.scrollHint,
      { opacity: 0, duration: (PHASES.float[1] - PHASES.float[0]) * 0.6 },
      PHASES.float[0] + (PHASES.float[1] - PHASES.float[0]) * 0.3,
    );
  }

  // Phase 2 — AROMA / GRILL: a strong, staggered scale + fade entrance,
  // then a slow upward shift in phase 4 to make room for the rising plate.
  if (elements.wordmarkAroma) {
    tl.to(
      elements.wordmarkAroma,
      {
        opacity: 1,
        scale: 1,
        y: 0,
        ease: "power3.out",
        duration: (PHASES.brand[1] - PHASES.brand[0]) * 0.7,
      },
      PHASES.brand[0],
    );
  }
  if (elements.wordmarkGrill) {
    tl.to(
      elements.wordmarkGrill,
      {
        opacity: 1,
        scale: 1,
        y: 0,
        ease: "power3.out",
        duration: (PHASES.brand[1] - PHASES.brand[0]) * 0.7,
      },
      PHASES.brand[0] + (PHASES.brand[1] - PHASES.brand[0]) * 0.18,
    );
  }
  if (wordmarkEls.length) {
    tl.to(
      wordmarkEls,
      {
        y: wordmarkUpShift,
        ease: "power2.inOut",
        duration: PHASES.plateIn[1] - PHASES.plateIn[0],
      },
      PHASES.plateIn[0],
    );
  }

  // Phase 4 — the plate rises into place as the wordmark makes room.
  tl.to(
    plate,
    {
      y: plateCfg.restPos.y,
      rotation: 0,
      scale: 1,
      opacity: 1,
      ease: "power3.out",
      duration: PHASES.plateIn[1] - PHASES.plateIn[0],
    },
    PHASES.plateIn[0],
  );

  // Phase 7 — a very subtle camera settle over the finished composition.
  tl.to(
    stage,
    {
      scale: 1.035,
      ease: "power1.inOut",
      duration: PHASES.final[1] - PHASES.final[0],
    },
    PHASES.final[0],
  );

  FOOD_ITEMS.forEach((item) => {
    const outer = elements.outers[item.key];
    if (!outer) return;
    const variant = item[breakpoint];

    // Phase 1 — floating at rest, with a subtle constant 3D tilt for depth.
    gsap.set(outer, {
      xPercent: -50,
      yPercent: -50,
      x: variant.float.pos.x,
      y: variant.float.pos.y,
      rotation: variant.float.rotation,
      scale: variant.float.scale,
      rotateX: item.tilt.rotateX,
      rotateY: item.tilt.rotateY,
      transformPerspective: 900,
      transformOrigin: "50% 50%",
      zIndex: item.floatZIndex,
    });

    // Phase 2 — a gentle outward breath as the wordmark claims the center;
    // combineValueWith lets us nudge x/y further along the same direction
    // the ingredient is already floating in, rather than a fixed offset.
    tl.to(
      outer,
      {
        x: combineCss(variant.float.pos.x, 1.25),
        y: combineCss(variant.float.pos.y, 1.25),
        ease: "sine.inOut",
        duration: PHASES.brand[1] - PHASES.brand[0],
      },
      PHASES.brand[0],
    );

    // Phase 3 — the "flies past camera" beat: a via point (so the path
    // visibly bends) followed by a distinct resting spot, plus a scale
    // pulse that peaks mid-flight, exactly where the brief asked for
    // "0.8 → 1.2 → 0.95"-style emphasis.
    const dynDuration = PHASES.dynamic[1] - PHASES.dynamic[0];
    const viaShare = 0.4;
    tl.to(
      outer,
      {
        x: `+=${variant.dynamic.via.x}`,
        y: `+=${variant.dynamic.via.y}`,
        rotation: variant.dynamic.rotation,
        scale: variant.dynamic.peakScale,
        ease: "power2.out",
        duration: dynDuration * viaShare,
      },
      PHASES.dynamic[0],
    ).to(
      outer,
      {
        x: `+=${variant.dynamic.target.x}`,
        y: `+=${variant.dynamic.target.y}`,
        scale: variant.dynamic.settleScale,
        ease: "power2.inOut",
        duration: dynDuration * (1 - viaShare),
      },
      PHASES.dynamic[0] + dynDuration * viaShare,
    );

    // Phase 5 — the landing flight: lift on a via point (an arc, not a
    // straight line), switch to the plate's stacking order just as the
    // flight begins, then settle flat (tilt eased to 0) onto the plate.
    const landingWindow = PHASES.landing[1] - PHASES.landing[0];
    const landingSlot = landingWindow / FOOD_ITEMS.length;
    const landingStart = PHASES.landing[0] + item.landingOrder * landingSlot;
    const landingDuration = landingSlot * 1.9; // overlaps neighbors for a fluid, non-mechanical sequence

    tl.set(outer, { zIndex: item.plateZIndex }, landingStart)
      .to(
        outer,
        {
          x: `+=${variant.landing.via.x}`,
          y: `+=${variant.landing.via.y}`,
          rotation: variant.landing.rotation,
          rotateX: item.tilt.rotateX * 0.3,
          rotateY: item.tilt.rotateY * 0.3,
          ease: "power2.out",
          duration: landingDuration * 0.4,
        },
        landingStart,
      )
      .to(
        outer,
        {
          x: variant.plate.pos.x,
          y: variant.plate.pos.y,
          rotation: variant.plate.rotation,
          scale: variant.plate.scale,
          rotateX: 0,
          rotateY: 0,
          ease: "power3.inOut",
          duration: landingDuration * 0.6,
        },
        landingStart + landingDuration * 0.4,
      );
  });

  // Phase 7 — tagline + CTA settle in once the plate is complete.
  const brandEls = ([elements.tagline, elements.cta].filter((el) => Boolean(el)) as HTMLElement[]);
  if (brandEls.length) {
    gsap.set(brandEls, { opacity: 0, y: 18 });
    tl.to(
      brandEls,
      {
        opacity: 1,
        y: 0,
        ease: "power2.out",
        duration: (PHASES.final[1] - PHASES.final[0]) * 0.7,
        stagger: 0.12,
      },
      PHASES.final[0] + (PHASES.final[1] - PHASES.final[0]) * 0.25,
    );
  }
}

/** Scales the numeric part of a CSS length string ("-11vw" → "-13.75vw" at
 * factor 1.25), keeping its unit — used to nudge an element further along
 * the direction it's already offset in, without hand-authoring a second
 * absolute position for every phase-2 target. */
function combineCss(value: string, factor: number): string {
  const match = /^(-?\d+(?:\.\d+)?)(\D+)$/.exec(value);
  if (!match) return value;
  const [, num, unit] = match;
  return `${(parseFloat(num) * factor).toFixed(3)}${unit}`;
}

/** Subtle, continuous drift on the inner <img> — independent of the scrub
 * timeline so it never fights the outer element's scroll-driven transform. */
function startIdleFloat(
  elements: FoodHeroElements,
  breakpoint: "desktop" | "mobile",
) {
  FOOD_ITEMS.forEach((item) => {
    const inner = elements.inners[item.key];
    if (!inner) return;
    const { idleFloat } = item[breakpoint];

    gsap.to(inner, {
      y: idleFloat.y,
      rotation: idleFloat.rotation,
      duration: idleFloat.duration,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });
  });
}

/**
 * Realistic steam: each puff continuously rises, drifts sideways and
 * dissipates in real time (not scroll-scrubbed — real steam doesn't reverse
 * when you scroll up), on its own independent, staggered, endlessly
 * repeating loop. The group's opacity (tied to the scrub timeline in
 * buildStoryTimeline) is what actually gates visibility, so scrolling back
 * up still correctly hides the steam before the plate is assembled.
 */
function startSteam(elements: FoodHeroElements) {
  STEAM_PUFFS.forEach((puff, index) => {
    const el = elements.steamPuffs[index];
    if (!el) return;

    gsap.set(el, {
      xPercent: -50,
      yPercent: -50,
      x: puff.start.x,
      y: puff.start.y,
      scale: 0.6,
      opacity: 0,
    });

    gsap
      .timeline({ repeat: -1, delay: puff.delay })
      .to(el, { opacity: 0.62, scale: 0.85, duration: puff.duration * 0.25, ease: "sine.out" })
      .to(el, {
        x: `+=${puff.drift}`,
        y: `+=${puff.rise}`,
        scale: 1.4,
        opacity: 0,
        duration: puff.duration * 0.75,
        ease: "sine.in",
      })
      .set(el, { x: puff.start.x, y: puff.start.y, scale: 0.6 });
  });
}

/** prefers-reduced-motion: the plate and every ingredient sit in their
 * final, plated positions from the start — no flight, no orbit — and only
 * the wordmark and brand copy cross-fade in with scroll. */
function buildReducedMotionTimeline(
  tl: gsap.core.Timeline,
  elements: FoodHeroElements,
  breakpoint: "desktop" | "mobile",
) {
  const plate = elements.plate!;
  const plateCfg = PLATE[breakpoint];

  gsap.set(plate, {
    xPercent: -50,
    yPercent: -50,
    x: plateCfg.restPos.x,
    y: plateCfg.restPos.y,
    rotation: 0,
    scale: 1,
    opacity: 1,
  });

  FOOD_ITEMS.forEach((item) => {
    const outer = elements.outers[item.key];
    if (!outer) return;
    const variant = item[breakpoint];
    gsap.set(outer, {
      xPercent: -50,
      yPercent: -50,
      x: variant.plate.pos.x,
      y: variant.plate.pos.y,
      rotation: variant.plate.rotation,
      scale: variant.plate.scale,
      zIndex: item.plateZIndex,
    });
  });

  if (elements.scrollHint) gsap.set(elements.scrollHint, { opacity: 0 });

  const wordmarkEls = [elements.wordmarkAroma, elements.wordmarkGrill].filter(
    (el): el is HTMLElement => Boolean(el),
  );
  const brandEls = ([elements.tagline, elements.cta].filter((el) => Boolean(el)) as HTMLElement[]);

  if (wordmarkEls.length) {
    gsap.set(wordmarkEls, { opacity: 0, scale: 1, y: WORDMARK[breakpoint].upShiftY });
    tl.to(wordmarkEls, { opacity: 1, duration: 1 }, 0.3);
  }
  if (brandEls.length) {
    gsap.set(brandEls, { opacity: 0, y: 0 });
    tl.to(brandEls, { opacity: 1, duration: 1 }, 1.2);
  }
}
