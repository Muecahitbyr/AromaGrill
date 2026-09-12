import { useEffect } from "react";
import { FoodHero } from "../components/FoodHero/FoodHero";
import { Menu } from "../components/Menu/Menu";
import { About } from "../components/About/About";
import { Reviews } from "../components/Reviews/Reviews";
import { RestaurantInfo } from "../components/RestaurantInfo/RestaurantInfo";
import { scrollToSection } from "../lib/scrollToSection";

export function HomePage() {
  // Arriving here with a hash (e.g. a nav link clicked from /impressum)
  // needs a beat for the hero/menu/etc. to mount and lay out before we can
  // scroll to the right place.
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;
    const timer = setTimeout(() => scrollToSection(hash), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <FoodHero />
      <Menu />
      <About />
      <Reviews />
      <RestaurantInfo />
    </>
  );
}
