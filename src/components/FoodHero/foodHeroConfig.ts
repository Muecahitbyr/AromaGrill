export type FoodKey =
  | "fladenbrot"
  | "cevape"
  | "ajvar"
  | "zwiebel"
  | "joghurt"
  | "petersilie";

/** A 2D offset from the stage center, in viewport-relative units. */
export interface Vec {
  x: string; // vw
  y: string; // vh
}

export interface FoodItemVariant {
  /** Rendered width, relative to the stage (≈ viewport). */
  width: string;
  /** Phase 1 — where the ingredient floats at rest before anything happens. */
  float: { pos: Vec; rotation: number; scale: number };
  /**
   * Phase 3 — the "flies past camera" beat: a via point (a distinct
   * mid-flight position, not a straight-line interpolation) followed by a
   * resting spot for this phase, plus a scale pulse (small → peak → settle)
   * so the element visibly swells as it passes closer to camera.
   */
  dynamic: {
    via: Vec;
    target: Vec;
    rotation: number;
    peakScale: number;
    settleScale: number;
  };
  /** Phase 5 — the landing flight onto the plate: a lift-off via point (an
   * arc, not a straight line) followed by the final plated position. */
  landing: { via: Vec; rotation: number };
  /** Phase 5/6/7 — final resting offset and scale once plated. */
  plate: { pos: Vec; rotation: number; scale: number };
  /** Continuous, scroll-independent floating motion on the inner <img>. */
  idleFloat: { y: number; rotation: number; duration: number };
}

export interface FoodItemConfig {
  key: FoodKey;
  src: string;
  alt: string;
  /** 0 = furthest back, 1 = closest to camera — drives easing/emphasis. */
  depth: number;
  /** Stacking order while ingredients float/orbit freely (phases 1–4),
   * chosen so some sit in front of the AROMA/GRILL wordmark and some
   * behind it (the wordmark itself sits at z-index 6). */
  floatZIndex: number;
  /** Stacking order once plated (phases 5–7) — bread at the back, garnish
   * on top, matching how the dish is actually layered. */
  plateZIndex: number;
  /** 0–5, the order ingredients land on the plate in phase 5. */
  landingOrder: number;
  /** A small constant 3D tilt while floating (phases 1–4), eased flat to
   * 0/0 during the landing flight — enough to read as depth, not a spinning
   * 3D scene. */
  tilt: { rotateX: number; rotateY: number };
  desktop: FoodItemVariant;
  mobile: FoodItemVariant;
}

export const FOOD_ITEMS: FoodItemConfig[] = [
  {
    key: "fladenbrot",
    src: "/food/Fladenbrot.png",
    alt: "Frisch gebackene Lepinja",
    depth: 0.15,
    floatZIndex: 2,
    plateZIndex: 2,
    landingOrder: 0,
    tilt: { rotateX: 6, rotateY: -3 },
    desktop: {
      width: "30vw",
      float: { pos: { x: "1vw", y: "27vh" }, rotation: 3, scale: 1 },
      dynamic: {
        via: { x: "-3vw", y: "6vh" },
        target: { x: "-1vw", y: "-6vh" },
        rotation: -2,
        peakScale: 1.12,
        settleScale: 1,
      },
      landing: { via: { x: "2vw", y: "-10vh" }, rotation: 0 },
      plate: { pos: { x: "0vw", y: "12vh" }, rotation: 0, scale: 1 },
      idleFloat: { y: 4, rotation: 0.4, duration: 5.5 },
    },
    mobile: {
      width: "46vw",
      float: { pos: { x: "0vw", y: "24vh" }, rotation: 2, scale: 0.95 },
      dynamic: {
        via: { x: "-2vw", y: "3vh" },
        target: { x: "0vw", y: "-3vh" },
        rotation: -1,
        peakScale: 1.06,
        settleScale: 1,
      },
      landing: { via: { x: "1vw", y: "-6vh" }, rotation: 0 },
      plate: { pos: { x: "0vw", y: "13vh" }, rotation: 0, scale: 1 },
      idleFloat: { y: 3, rotation: 0.3, duration: 5.5 },
    },
  },
  {
    key: "cevape",
    src: "/food/Cevape.png",
    alt: "Gegrillte Ćevapi",
    depth: 0.4,
    floatZIndex: 4,
    plateZIndex: 4,
    landingOrder: 1,
    tilt: { rotateX: -5, rotateY: 4 },
    desktop: {
      width: "24vw",
      float: { pos: { x: "-3vw", y: "-7vh" }, rotation: -3, scale: 1 },
      dynamic: {
        via: { x: "-10vw", y: "-8vh" },
        target: { x: "8vw", y: "2vh" },
        rotation: -6,
        peakScale: 1.28,
        settleScale: 1,
      },
      landing: { via: { x: "-4vw", y: "-8vh" }, rotation: -2 },
      plate: { pos: { x: "0vw", y: "6vh" }, rotation: -2, scale: 0.86 },
      idleFloat: { y: 5, rotation: -0.6, duration: 4.8 },
    },
    mobile: {
      width: "38vw",
      float: { pos: { x: "-2vw", y: "-5vh" }, rotation: -2, scale: 0.95 },
      dynamic: {
        via: { x: "-5vw", y: "-4vh" },
        target: { x: "4vw", y: "1vh" },
        rotation: -3,
        peakScale: 1.14,
        settleScale: 1,
      },
      landing: { via: { x: "-2vw", y: "-5vh" }, rotation: -1 },
      plate: { pos: { x: "0vw", y: "7vh" }, rotation: -1, scale: 0.9 },
      idleFloat: { y: 4, rotation: -0.4, duration: 4.8 },
    },
  },
  {
    key: "ajvar",
    src: "/food/Ajvar.png",
    alt: "Hausgemachter Ajvar",
    depth: 0.55,
    floatZIndex: 5,
    plateZIndex: 3,
    landingOrder: 4,
    tilt: { rotateX: 4, rotateY: 6 },
    desktop: {
      width: "17vw",
      float: { pos: { x: "22vw", y: "17vh" }, rotation: 6, scale: 0.85 },
      dynamic: {
        via: { x: "8vw", y: "2vh" },
        target: { x: "-6vw", y: "-2vh" },
        rotation: 5,
        peakScale: 1.32,
        settleScale: 1,
      },
      landing: { via: { x: "-4vw", y: "-9vh" }, rotation: 3 },
      plate: { pos: { x: "10vw", y: "17vh" }, rotation: 3, scale: 0.46 },
      idleFloat: { y: 6, rotation: 1, duration: 4.2 },
    },
    mobile: {
      width: "26vw",
      float: { pos: { x: "18vw", y: "15vh" }, rotation: 4, scale: 0.85 },
      dynamic: {
        via: { x: "4vw", y: "1vh" },
        target: { x: "-3vw", y: "-1vh" },
        rotation: 3,
        peakScale: 1.16,
        settleScale: 1,
      },
      landing: { via: { x: "-2vw", y: "-5vh" }, rotation: 2 },
      plate: { pos: { x: "12vw", y: "18vh" }, rotation: 2, scale: 0.5 },
      idleFloat: { y: 4, rotation: 0.8, duration: 4.2 },
    },
  },
  {
    key: "zwiebel",
    src: "/food/Zwiebel.png",
    alt: "Rote Zwiebeln",
    depth: 0.7,
    floatZIndex: 8,
    plateZIndex: 5,
    landingOrder: 3,
    tilt: { rotateX: -4, rotateY: -6 },
    desktop: {
      width: "18vw",
      float: { pos: { x: "-23vw", y: "15vh" }, rotation: -10, scale: 0.92 },
      dynamic: {
        via: { x: "-8vw", y: "0vh" },
        target: { x: "6vw", y: "-4vh" },
        rotation: -8,
        peakScale: 1.24,
        settleScale: 1,
      },
      landing: { via: { x: "-3vw", y: "-8vh" }, rotation: -5 },
      plate: { pos: { x: "-13vw", y: "6vh" }, rotation: -6, scale: 0.56 },
      idleFloat: { y: -5, rotation: -1.2, duration: 4 },
    },
    mobile: {
      width: "27vw",
      float: { pos: { x: "-18vw", y: "13vh" }, rotation: -7, scale: 0.9 },
      dynamic: {
        via: { x: "-4vw", y: "0vh" },
        target: { x: "3vw", y: "-2vh" },
        rotation: -5,
        peakScale: 1.12,
        settleScale: 1,
      },
      landing: { via: { x: "-2vw", y: "-5vh" }, rotation: -3 },
      plate: { pos: { x: "-15vw", y: "7vh" }, rotation: -4, scale: 0.6 },
      idleFloat: { y: -4, rotation: -0.8, duration: 4 },
    },
  },
  {
    // Joghurt is Ajvar's mirror-image companion: identical size and motion
    // magnitude throughout (same width/scale numbers), just flipped
    // left/right so it travels its own path and lands beside Ajvar rather
    // than on top of it.
    key: "joghurt",
    src: "/food/Joghurt.png",
    alt: "Hausgemachte Joghurtsauce",
    depth: 0.55,
    floatZIndex: 5,
    plateZIndex: 3,
    landingOrder: 2,
    tilt: { rotateX: 4, rotateY: -6 },
    desktop: {
      width: "17vw",
      float: { pos: { x: "23vw", y: "-22vh" }, rotation: -6, scale: 0.85 },
      dynamic: {
        via: { x: "-8vw", y: "2vh" },
        target: { x: "6vw", y: "-2vh" },
        rotation: -5,
        peakScale: 1.32,
        settleScale: 1,
      },
      landing: { via: { x: "4vw", y: "-9vh" }, rotation: -3 },
      plate: { pos: { x: "-10vw", y: "17vh" }, rotation: -3, scale: 0.46 },
      idleFloat: { y: 6, rotation: -1, duration: 4.2 },
    },
    mobile: {
      width: "26vw",
      float: { pos: { x: "19vw", y: "-18vh" }, rotation: -4, scale: 0.85 },
      dynamic: {
        via: { x: "-4vw", y: "1vh" },
        target: { x: "3vw", y: "-1vh" },
        rotation: -3,
        peakScale: 1.16,
        settleScale: 1,
      },
      landing: { via: { x: "2vw", y: "-5vh" }, rotation: -2 },
      plate: { pos: { x: "-12vw", y: "18vh" }, rotation: -2, scale: 0.5 },
      idleFloat: { y: 4, rotation: -0.8, duration: 4.2 },
    },
  },
  {
    key: "petersilie",
    src: "/food/Petersilie.png",
    alt: "Frische Petersilie",
    depth: 1,
    floatZIndex: 11,
    plateZIndex: 6,
    landingOrder: 5,
    tilt: { rotateX: -6, rotateY: 3 },
    desktop: {
      width: "16vw",
      float: { pos: { x: "-25vw", y: "-25vh" }, rotation: -6, scale: 0.9 },
      dynamic: {
        via: { x: "6vw", y: "-4vh" },
        target: { x: "9vw", y: "-11vh" },
        rotation: -9,
        peakScale: 1.2,
        settleScale: 0.95,
      },
      landing: { via: { x: "-3vw", y: "-8vh" }, rotation: -4 },
      plate: { pos: { x: "0vw", y: "-4vh" }, rotation: -3, scale: 0.4 },
      idleFloat: { y: -4, rotation: -1.6, duration: 3.6 },
    },
    mobile: {
      width: "24vw",
      float: { pos: { x: "-19vw", y: "-20vh" }, rotation: -4, scale: 0.9 },
      dynamic: {
        via: { x: "3vw", y: "-2vh" },
        target: { x: "5vw", y: "-6vh" },
        rotation: -5,
        peakScale: 1.1,
        settleScale: 0.95,
      },
      landing: { via: { x: "-1vw", y: "-5vh" }, rotation: -2 },
      plate: { pos: { x: "0vw", y: "-3vh" }, rotation: -2, scale: 0.44 },
      idleFloat: { y: -3, rotation: -1.2, duration: 3.6 },
    },
  },
];

/** The plate itself — a CSS placeholder (see FoodHero.css/.food-plate) until
 * a real transparent plate PNG replaces it. Same rise-in choreography as
 * the food: starts below the viewport, slightly small and tilted, and
 * settles into its resting spot during phase 4. */
export const PLATE = {
  desktop: {
    // Clamped by both vw and vh so the plate (plus its resting offset) can
    // never exceed the viewport height, even on short/laptop screens.
    width: "min(38vw, 52vh)",
    restPos: { x: "0vw", y: "11vh" },
    startYOffset: "60vh",
    startRotation: 10,
    startScale: 0.7,
  },
  mobile: {
    width: "min(66vw, 46vh)",
    restPos: { x: "0vw", y: "13vh" },
    startYOffset: "52vh",
    startRotation: 8,
    startScale: 0.72,
  },
};

/** How far the AROMA/GRILL wordmark shifts up in phase 4 to make room for
 * the plate rising into the center. */
export const WORDMARK = {
  desktop: { upShiftY: "-23vh" },
  mobile: { upShiftY: "-19vh" },
};

export type PhaseWindow = readonly [start: number, end: number];

/**
 * The seven phases from the brief, as percentage windows (0–100) directly
 * matching the scroll breakdown given in the brief — ScrollTrigger's scrub
 * maps 0–1 scroll progress onto this same 0–100 timeline scale.
 */
export const PHASES = {
  /** 1 — chaotisch schwebende Zutaten. */
  float: [0, 15] as PhaseWindow,
  /** 2 — AROMA GRILL erscheint. */
  brand: [15, 30] as PhaseWindow,
  /** 3 — Food Orbit / Dynamik. */
  dynamic: [30, 50] as PhaseWindow,
  /** 4 — Teller kommt ins Bild. */
  plateIn: [50, 60] as PhaseWindow,
  /** 5 — Zutaten landen auf dem Teller. */
  landing: [60, 85] as PhaseWindow,
  /** 6 & 7 — fertiger Grillteller + Final Brand Moment. */
  final: [85, 100] as PhaseWindow,
};

export const BRAND_TAGLINE = "Tradition auf jedem Teller.";

export interface SteamPuffConfig {
  /** Starting offset from the plate's hot-food center (the Ćevapi). */
  start: Vec;
  /** How far the puff drifts sideways while rising. */
  drift: string; // vw
  /** How high the puff rises before fully dissipating. */
  rise: string; // vh
  /** Rendered width of the soft blob. */
  size: string;
  duration: number;
  delay: number;
}

/**
 * Soft, blurred, screen-blended blobs drifting slowly upward — gated by the
 * scrub timeline (fades in once the plate is assembled) but individually
 * looping in real time (like the idle float) so the wafting motion reads as
 * continuous and organic rather than scroll-locked.
 */
export const STEAM_PUFFS: SteamPuffConfig[] = [
  {
    start: { x: "-2vw", y: "3vh" },
    drift: "3vw",
    rise: "-30vh",
    size: "9vw",
    duration: 6.5,
    delay: 0,
  },
  {
    start: { x: "2.5vw", y: "4vh" },
    drift: "-4vw",
    rise: "-34vh",
    size: "10vw",
    duration: 7.5,
    delay: 1.8,
  },
  {
    start: { x: "0vw", y: "2vh" },
    drift: "1.5vw",
    rise: "-24vh",
    size: "7vw",
    duration: 5.5,
    delay: 3.2,
  },
];
