import { getLenis } from "./useLenis";

/** The fixed navbar's height plus a little breathing room — subtracted from
 * every scroll target so sections land just below it, not hidden behind it. */
const NAVBAR_OFFSET = -88;

/** Smoothly scrolls to a section by id (or to the very top for id "top"),
 * via Lenis when smooth scrolling is active, falling back to the browser's
 * native (instant, reduced-motion-respecting) scroll otherwise. */
export function scrollToSection(id: string) {
  const lenis = getLenis();

  if (id === "top") {
    if (lenis) lenis.scrollTo(0, { duration: 1.4 });
    else window.scrollTo({ top: 0 });
    return;
  }

  const target = document.getElementById(id);
  if (!target) return;

  if (lenis) {
    lenis.scrollTo(target, { duration: 1.4, offset: NAVBAR_OFFSET });
  } else {
    const top = target.getBoundingClientRect().top + window.scrollY + NAVBAR_OFFSET;
    window.scrollTo({ top });
  }
}
