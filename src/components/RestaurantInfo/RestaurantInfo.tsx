import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  OPENING_HOURS,
  RESTAURANT_INFO,
} from "../../data/restaurantInfo";
import "./RestaurantInfo.css";

gsap.registerPlugin(ScrollTrigger);

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21Z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <circle cx="12" cy="9.5" r="2.4" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6.5 3.5h3l1.4 4.3-2.1 1.7a12.5 12.5 0 0 0 5.7 5.7l1.7-2.1 4.3 1.4v3c0 1-.9 1.8-1.9 1.7C10.6 18.7 5.3 13.4 4.8 5.4c-.1-1 .7-1.9 1.7-1.9Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8.3" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M12 7.5V12l3 2"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M10 1.5 12.6 7l6 .9-4.3 4.2 1 6-5.3-2.8-5.3 2.8 1-6L1.4 7.9l6-.9L10 1.5Z" />
    </svg>
  );
}

function RouteIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 19c2 0 2-4 4-4s2 4 4 4 2-4 4-4 2 4 4 4M5 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm14-8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * The map is not embedded on page load — clicking "Karte laden" is what
 * actually connects to Google and mounts the iframe. Google Maps embeds set
 * their own cookies once loaded, so gating it behind an explicit click is
 * the consent for that specific feature; nothing is contacted (and no
 * cookie banner is needed) until a visitor asks for the map.
 */
function MapPanel() {
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <div className="restaurant-info__map restaurant-info__map--live">
        <iframe
          title="Aroma Grill – Standort auf Google Maps"
          src={RESTAURANT_INFO.mapEmbedSrc}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    );
  }

  return (
    <div className="restaurant-info__map">
      <div className="restaurant-info__map-placeholder">
        <PinIcon />
        <p>
          {RESTAURANT_INFO.street}, {RESTAURANT_INFO.postalCode}{" "}
          {RESTAURANT_INFO.city}
        </p>
        <button
          type="button"
          className="restaurant-info__map-button"
          onClick={() => setLoaded(true)}
        >
          Karte laden
        </button>
        <span className="restaurant-info__map-hint">
          Es wird erst nach Klick eine Verbindung zu Google Maps hergestellt.
        </span>
      </div>
    </div>
  );
}

export function RestaurantInfo() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }
      const targets = gsap.utils.toArray<HTMLElement>(
        ".restaurant-info__reveal",
        sectionRef.current ?? undefined,
      );
      targets.forEach((el, index) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.06,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });
    },
    { scope: sectionRef },
  );

  return (
    <section className="restaurant-info" id="kontakt" ref={sectionRef}>
      <div className="restaurant-info__intro restaurant-info__reveal">
        <p className="restaurant-info__eyebrow">Aroma Grill</p>
        <h2 className="restaurant-info__heading">Standort &amp; Kontakt</h2>
      </div>

      <div className="restaurant-info__grid">
        <div className="restaurant-info__panel restaurant-info__reveal">
          <ul className="restaurant-info__list">
            <li>
              <span className="restaurant-info__icon">
                <PinIcon />
              </span>
              <a
                href={RESTAURANT_INFO.mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="restaurant-info__link"
              >
                {RESTAURANT_INFO.street}
                <br />
                {RESTAURANT_INFO.postalCode} {RESTAURANT_INFO.city}
              </a>
            </li>
            <li>
              <span className="restaurant-info__icon">
                <PhoneIcon />
              </span>
              <a href={RESTAURANT_INFO.phoneHref} className="restaurant-info__link">
                {RESTAURANT_INFO.phoneDisplay}
              </a>
            </li>
            <li>
              <span className="restaurant-info__icon">
                <StarIcon />
              </span>
              <span className="restaurant-info__rating">
                <strong>{RESTAURANT_INFO.rating.toLocaleString("de-DE")}</strong>{" "}
                / 5 · {RESTAURANT_INFO.reviewCount} Google-Rezensionen
              </span>
            </li>
            <li>
              <span className="restaurant-info__icon restaurant-info__icon--euro">
                €
              </span>
              <span className="restaurant-info__price">
                Preisniveau {RESTAURANT_INFO.priceRange}
              </span>
            </li>
          </ul>

          <a
            href={RESTAURANT_INFO.directionsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="restaurant-info__route-button"
          >
            <RouteIcon />
            Route planen
          </a>
        </div>

        <div className="restaurant-info__panel restaurant-info__reveal">
          <h3 className="restaurant-info__panel-title">
            <ClockIcon />
            <span>Öffnungszeiten</span>
          </h3>
          <ul className="restaurant-info__hours">
            {OPENING_HOURS.map((entry) => (
              <li
                key={entry.day}
                className={
                  entry.hours === "Geschlossen"
                    ? "restaurant-info__hours-row restaurant-info__hours-row--closed"
                    : "restaurant-info__hours-row"
                }
              >
                <span>{entry.day}</span>
                <span>{entry.hours}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="restaurant-info__reveal">
        <MapPanel />
      </div>
    </section>
  );
}
