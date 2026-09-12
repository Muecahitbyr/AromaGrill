import { Link } from "react-router-dom";
import { RESTAURANT_INFO } from "../data/restaurantInfo";
import "./LegalPage.css";

export function DatenschutzPage() {
  return (
    <div className="legal-page">
      <div className="legal-page__inner">
        <Link to="/" className="legal-page__back">
          ← Zurück zur Startseite
        </Link>

        <p className="legal-page__eyebrow">Rechtliches</p>
        <h1>Datenschutzerklärung</h1>

        <div className="legal-page__notice">
          Diese Erklärung beschreibt ausschließlich die auf dieser Website
          tatsächlich eingesetzten Funktionen. Einzelne Angaben sind als
          Platzhalter markiert und müssen vor Veröffentlichung ergänzt und
          rechtlich geprüft werden.
        </div>

        <h2>1. Verantwortlicher</h2>
        <p>
          Verantwortlich für die Datenverarbeitung auf dieser Website ist:
          <br />
          {RESTAURANT_INFO.name}
          <br />
          <span className="legal-page__placeholder">
            [INHABER / VERTRETUNGSBERECHTIGTE PERSON]
          </span>
          <br />
          {RESTAURANT_INFO.street}, {RESTAURANT_INFO.postalCode}{" "}
          {RESTAURANT_INFO.city}
          <br />
          Telefon: {RESTAURANT_INFO.phoneDisplay}
          <br />
          E-Mail: <span className="legal-page__placeholder">[E-MAIL]</span>
        </p>

        <h2>2. Hosting</h2>
        <p>
          Diese Website wird bei einem externen Dienstleister gehostet.
          Personenbezogene Daten, die beim Aufruf dieser Website erhoben
          werden (siehe „Server-Logfiles“), werden auf den Servern dieses
          Hosters verarbeitet.
          <br />
          Anbieter:{" "}
          <span className="legal-page__placeholder">
            [HOSTING-ANBIETER — Name und Anschrift des Hosting-Providers
            ergänzen]
          </span>
        </p>

        <h2>3. Server-Logfiles</h2>
        <p>
          Der Hosting-Provider erhebt beim Aufruf dieser Website
          automatisch technisch bedingte Informationen, die Ihr Browser
          übermittelt (sogenannte Server-Logfiles). Dazu gehören
          typischerweise IP-Adresse, Datum und Uhrzeit der Anfrage,
          aufgerufene Seite, verwendeter Browser und Betriebssystem. Diese
          Daten dienen der technischen Bereitstellung und Absicherung der
          Website und werden nicht mit anderen Datenquellen zusammengeführt.
        </p>

        <h2>4. Kontaktaufnahme per Telefon</h2>
        <p>
          Wenn Sie uns unter der angegebenen Rufnummer kontaktieren, werden
          die von Ihnen im Gespräch mitgeteilten Daten ausschließlich zur
          Bearbeitung Ihres Anliegens (z. B. Reservierung) verwendet.
        </p>

        <h2>5. Google Fonts</h2>
        <p>
          Diese Website bindet zur einheitlichen Darstellung von
          Schriftarten sogenannte Google Fonts ein, die von Servern von
          Google eingebunden werden. Beim Laden der Website wird dabei eine
          Verbindung zu Servern von Google hergestellt, wodurch Google
          Kenntnis über den Aufruf dieser Website und die dabei
          übermittelte IP-Adresse erhalten kann.
          <br />
          Anbieter: Google Ireland Limited, Gordon House, Barrow Street,
          Dublin 4, Irland.
        </p>

        <h2>6. Google Maps (nur nach Klick)</h2>
        <p>
          Im Bereich „Standort &amp; Kontakt“ bieten wir eine Karte an. Diese
          wird nicht automatisch beim Laden der Seite eingebunden. Erst wenn
          Sie aktiv auf „Karte laden“ klicken, wird eine Verbindung zu
          Google Maps hergestellt und Ihre IP-Adresse an Google übertragen;
          Google kann in diesem Fall auch Cookies auf Ihrem Endgerät setzen.
          Ohne diesen Klick findet keine Verbindung zu Google Maps statt.
          <br />
          Anbieter: Google Ireland Limited, Gordon House, Barrow Street,
          Dublin 4, Irland.
        </p>

        <h2>7. Keine Cookies, kein Tracking, keine Analyse-Tools</h2>
        <p>
          Über die unter Punkt 5 und 6 genannten Fälle hinaus setzt diese
          Website keine eigenen Cookies, keine Analyse- oder Tracking-Tools
          (z. B. Google Analytics, Meta-Pixel o. Ä.) und keine
          Marketing-Dienste ein. Eine Einwilligung über einen Cookie-Banner
          ist dementsprechend nicht erforderlich.
        </p>

        <h2>8. Ihre Rechte</h2>
        <p>Sie haben jederzeit das Recht auf:</p>
        <ul>
          <li>Auskunft über Ihre bei uns gespeicherten personenbezogenen Daten,</li>
          <li>Berichtigung unrichtiger Daten,</li>
          <li>Löschung Ihrer Daten, soweit keine gesetzliche Pflicht entgegensteht,</li>
          <li>Einschränkung der Verarbeitung,</li>
          <li>Datenübertragbarkeit sowie</li>
          <li>Widerspruch gegen die Verarbeitung Ihrer Daten.</li>
        </ul>
        <p>
          Zudem haben Sie das Recht, sich bei einer
          Datenschutz-Aufsichtsbehörde über die Verarbeitung Ihrer
          personenbezogenen Daten zu beschweren.
        </p>

        <h2>9. SSL-/TLS-Verschlüsselung</h2>
        <p>
          Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der
          Übertragung vertraulicher Inhalte eine SSL-/TLS-Verschlüsselung.
        </p>
      </div>
    </div>
  );
}
