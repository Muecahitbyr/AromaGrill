import { Link } from "react-router-dom";
import { RESTAURANT_INFO } from "../data/restaurantInfo";
import "./LegalPage.css";

export function ImpressumPage() {
  return (
    <div className="legal-page">
      <div className="legal-page__inner">
        <Link to="/" className="legal-page__back">
          ← Zurück zur Startseite
        </Link>

        <p className="legal-page__eyebrow">Rechtliches</p>
        <h1>Impressum</h1>

        <div className="legal-page__notice">
          Einzelne Angaben auf dieser Seite sind als Platzhalter markiert
          (z. B. <span className="legal-page__placeholder">[E-MAIL]</span>),
          weil die entsprechenden Informationen bislang nicht vorlagen. Bitte
          vor Veröffentlichung vollständig ausfüllen und rechtlich prüfen
          lassen.
        </div>

        <h2>Angaben gemäß § 5 TMG</h2>
        <p>
          {RESTAURANT_INFO.name}
          <br />
          <span className="legal-page__placeholder">
            [INHABER / VERTRETUNGSBERECHTIGTE PERSON]
          </span>
          <br />
          {RESTAURANT_INFO.street}
          <br />
          {RESTAURANT_INFO.postalCode} {RESTAURANT_INFO.city}
        </p>

        <h2>Kontakt</h2>
        <p>
          Telefon: <a href={RESTAURANT_INFO.phoneHref}>{RESTAURANT_INFO.phoneDisplay}</a>
          <br />
          E-Mail:{" "}
          <span className="legal-page__placeholder">[E-MAIL]</span>
        </p>

        <h2>Umsatzsteuer-ID / Registereintrag</h2>
        <p>
          <span className="legal-page__placeholder">
            [WEITERE ERFORDERLICHE ANGABEN — z. B. Umsatzsteuer-Identifikationsnummer
            gemäß § 27a UStG, Handelsregistereintrag mit Registergericht und
            Registernummer, sofern vorhanden]
          </span>
        </p>

        <h2>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
        <p>
          <span className="legal-page__placeholder">
            [INHABER / VERTRETUNGSBERECHTIGTE PERSON]
          </span>
          , Anschrift wie oben.
        </p>

        <h2>Streitschlichtung</h2>
        <p>
          <span className="legal-page__placeholder">
            [ANGABE ZUR TEILNAHME AN EINEM VERBRAUCHERSCHLICHTUNGSVERFAHREN
            — bitte ergänzen, ob und in welcher Form eine Teilnahme
            erfolgt]
          </span>
        </p>

        <h2>Haftung für Inhalte und Links</h2>
        <p>
          Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene
          Inhalte auf diesen Seiten nach den allgemeinen Gesetzen
          verantwortlich. Für die Inhalte externer, verlinkter Seiten
          übernehmen wir keine Gewähr; für deren Inhalte ist ausschließlich
          der jeweilige Anbieter oder Betreiber verantwortlich.
        </p>
      </div>
    </div>
  );
}
