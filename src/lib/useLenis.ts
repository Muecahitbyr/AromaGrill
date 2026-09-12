import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let activeLenis: Lenis | null = null;

/** The live Lenis instance, if smooth scrolling is active (null under
 * prefers-reduced-motion, where native scrolling is used instead). Lets
 * things outside the App root — nav anchor clicks, route-change scroll
 * resets — drive the same scroll engine instead of fighting it with a raw
 * `window.scrollTo`. */
export function getLenis(): Lenis | null {
  return activeLenis;
}

/**
 * Drives smooth scrolling via Lenis and keeps ScrollTrigger in sync.
 * Lenis feeds GSAP's ticker instead of running its own rAF loop, so both
 * stay on the same clock and scrub animations don't lag behind the scroll.
 * Skipped entirely under prefers-reduced-motion — native scroll is used instead.
 */
export function useLenis() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
    });
    activeLenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      activeLenis = null;
    };
  }, []);
}
