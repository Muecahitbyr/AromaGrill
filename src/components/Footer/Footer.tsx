import { Link, useLocation } from "react-router-dom";
import { scrollToSection } from "../../lib/scrollToSection";
import { OPENING_HOURS, RESTAURANT_INFO } from "../../data/restaurantInfo";
import "./Footer.css";

const FOOTER_LINKS = [
  { id: "start", label: "Start" },
  { id: "speisekarte", label: "Speisekarte" },
  { id: "ueber-uns", label: "Über uns" },
  { id: "bewertungen", label: "Bewertungen" },
  { id: "kontakt", label: "Kontakt" },
];

export function Footer() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const year = new Date().getFullYear();

  function handleSectionClick(
    event: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) {
    if (isHome) {
      event.preventDefault();
      scrollToSection(id);
    }
  }

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <div className="footer__logo-row">
            <img
              src="/logo-icon.png"
              alt="Aroma Grill Logo"
              className="footer__logo-icon"
              draggable={false}
            />
            <span className="footer__logo">Aroma Grill</span>
          </div>
          <address className="footer__address">
            {RESTAURANT_INFO.street}
            <br />
            {RESTAURANT_INFO.postalCode} {RESTAURANT_INFO.city}
          </address>
          <a href={RESTAURANT_INFO.phoneHref} className="footer__phone">
            {RESTAURANT_INFO.phoneDisplay}
          </a>
        </div>

        <div className="footer__column">
          <h3 className="footer__heading">Öffnungszeiten</h3>
          <ul className="footer__hours">
            {OPENING_HOURS.map((entry) => (
              <li key={entry.day}>
                <span>{entry.day}</span>
                <span>{entry.hours}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__column">
          <h3 className="footer__heading">Navigation</h3>
          <ul className="footer__nav">
            {FOOTER_LINKS.map((link) => (
              <li key={link.id}>
                <Link
                  to={`/#${link.id}`}
                  onClick={(event) => handleSectionClick(event, link.id)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__column">
          <h3 className="footer__heading">Rechtliches</h3>
          <ul className="footer__nav">
            <li>
              <Link to="/impressum">Impressum</Link>
            </li>
            <li>
              <Link to="/datenschutz">Datenschutz</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <p>
          © {year} {RESTAURANT_INFO.name}. Alle Rechte vorbehalten.
        </p>
      </div>
    </footer>
  );
}
