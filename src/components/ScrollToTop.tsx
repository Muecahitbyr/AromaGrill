import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Resets scroll to the top on every route change — except when the new
 * URL carries a hash, in which case the destination page's own mount
 * effect is responsible for scrolling to that section instead. */
export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}
