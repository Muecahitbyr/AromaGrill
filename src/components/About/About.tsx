import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./About.css";

gsap.registerPlugin(ScrollTrigger);

const HIGHLIGHTS = [
  { label: "Frisch", detail: "täglich zubereitet" },
  { label: "Vom Grill", detail: "über offener Flamme" },
  { label: "Familiär", detail: "geführt mit Herz" },
];

export function About() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }
      const targets = gsap.utils.toArray<HTMLElement>(
        ".about__reveal",
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
            delay: index * 0.08,
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
    <section className="about" id="ueber-uns" ref={sectionRef}>
      <div className="about__inner">
        <p className="about__eyebrow about__reveal">Über uns</p>
        <h2 className="about__heading about__reveal">
          Balkanische Grillkunst, mit Herz gemacht.
        </h2>
        <p className="about__text about__reveal">
          Im Aroma Grill bringen wir die authentischen Aromen des Balkans und
          der albanischen Küche nach Kaufbeuren. Unsere Ćevapi, Pljeskavica
          und Grillplatten entstehen jeden Tag frisch — über offener Flamme
          gegrillt, mit Gewürzen und Rezepten, die seit Generationen
          weitergegeben werden.
        </p>
        <p className="about__text about__reveal">
          Bei uns isst man nicht einfach nur — man ist zu Gast. Familiär
          geführt, mit einem herzlichen Empfang und einer Atmosphäre, in der
          man sich vom ersten Moment an wohlfühlt.
        </p>

        <div className="about__highlights about__reveal">
          {HIGHLIGHTS.map((item) => (
            <div className="about__highlight" key={item.label}>
              <span className="about__highlight-label">{item.label}</span>
              <span className="about__highlight-detail">{item.detail}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
