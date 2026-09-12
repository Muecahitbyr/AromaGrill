import { getLenis } from "./useLenis";

/** The fixed navbar's height plus a little breathing room — subtracted from
 * every scroll target so sections land just below it, not hidden behind it. */
const NAVBAR_OFFSET = -88;

/** Smoothly scrolls to a section by id (or to the very top for id "top"),
 * via Lenis when smooth scrolling is active, falling back to the browser's
 * native (instant, reduced-motion-respecting) scroll otherwise.
 *
 * Pass `instant: true` when the target's own layout is about to change
 * height as a result of this same interaction (e.g. switching a menu
 * category tab, which changes how tall the gallery below it is) — an
 * animated Lenis scroll running while a later `ScrollTrigger.refresh()`
 * re-measures the page fights over the scroll position; jumping straight
 * there avoids that race entirely. */
export function scrollToSection(id: string, opts: { instant?: boolean } = {}) {
  const lenis = getLenis();

  if (id === "top") {
    if (opts.instant || !lenis) window.scrollTo({ top: 0 });
    else lenis.scrollTo(0, { duration: 1.4 });
    return;
  }

  const target = document.getElementById(id);
  if (!target) return;

  if (opts.instant || !lenis) {
    const top = target.getBoundingClientRect().top + window.scrollY + NAVBAR_OFFSET;
    window.scrollTo({ top });
    // Keep Lenis's own internal position in sync with the manual jump so it
    // doesn't try to "catch up" (animate back) on the next wheel/touch input.
    lenis?.scrollTo(top, { immediate: true });
  } else {
    lenis.scrollTo(target, { duration: 1.4, offset: NAVBAR_OFFSET });
  }
}
