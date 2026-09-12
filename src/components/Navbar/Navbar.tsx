import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { scrollToSection } from "../../lib/scrollToSection";
import { RESTAURANT_INFO } from "../../data/restaurantInfo";
import "./Navbar.css";

const NAV_LINKS = [
  { id: "start", label: "Start" },
  { id: "speisekarte", label: "Speisekarte" },
  { id: "ueber-uns", label: "Über uns" },
  { id: "bewertungen", label: "Bewertungen" },
  { id: "kontakt", label: "Kontakt" },
];

export function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [open, setOpen] = useState(false);

  // Close the mobile panel whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.hash]);

  function handleSectionClick(
    event: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) {
    if (isHome) {
      event.preventDefault();
      scrollToSection(id);
    }
    setOpen(false);
  }

  function handleBrandClick(event: React.MouseEvent<HTMLAnchorElement>) {
    if (isHome) {
      event.preventDefault();
      scrollToSection("top");
    }
    setOpen(false);
  }

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <Link to="/" className="navbar__brand" onClick={handleBrandClick}>
          <img
            src="/logo-icon.png"
            alt="Aroma Grill Logo"
            className="navbar__logo"
            draggable={false}
          />
          <span>Aroma Grill</span>
        </Link>

        <nav
          className={
            open ? "navbar__links navbar__links--open" : "navbar__links"
          }
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.id}
              to={`/#${link.id}`}
              className="navbar__link"
              onClick={(event) => handleSectionClick(event, link.id)}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={RESTAURANT_INFO.directionsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="navbar__cta"
            onClick={() => setOpen(false)}
          >
            Route
          </a>
        </nav>

        <button
          type="button"
          className={
            open ? "navbar__toggle navbar__toggle--open" : "navbar__toggle"
          }
          aria-label={open ? "Menü schließen" : "Menü öffnen"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
