import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { REVIEWS, type Review } from "../../data/reviews";
import { RESTAURANT_INFO } from "../../data/restaurantInfo";
import "./Reviews.css";

gsap.registerPlugin(ScrollTrigger);

function StarRating({ rating }: { rating: number }) {
  const fillPercent = Math.max(0, Math.min(1, rating / 5)) * 100;
  return (
    <span className="stars" aria-label={`${rating.toLocaleString("de-DE")} von 5 Sternen`}>
      <span className="stars__track" aria-hidden="true">★★★★★</span>
      <span
        className="stars__fill"
        aria-hidden="true"
        style={{ width: `${fillPercent}%` }}
      >
        ★★★★★
      </span>
    </span>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="review-card">
      <div className="review-card__header">
        <span className="review-card__name">{review.name}</span>
        <span className="review-card__google">
          <GoogleMark />
          Google
        </span>
      </div>
      <StarRating rating={review.rating} />
      <p className="review-card__text">{review.text}</p>
    </article>
  );
}

function GoogleMark() {
  return (
    <span className="review-card__google-mark" aria-hidden="true">
      G
    </span>
  );
}

function MarqueeRow({
  reviews,
  reverse,
}: {
  reviews: Review[];
  reverse?: boolean;
}) {
  return (
    <div className="reviews__row">
      <div
        className={
          reverse ? "reviews__track reviews__track--reverse" : "reviews__track"
        }
      >
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
        {/* Exact duplicate of the set above — translateX(-50%) always lands
            on this copy's starting position, so the loop never jumps.
            Hidden from assistive tech since it repeats the same content. */}
        <span aria-hidden="true" className="reviews__track-duplicate">
          {reviews.map((review) => (
            <ReviewCard key={`${review.id}-dup`} review={review} />
          ))}
        </span>
      </div>
    </div>
  );
}

export function Reviews() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const rowOne = REVIEWS.slice(0, 5);
  const rowTwo = REVIEWS.slice(5);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }
      const intro = sectionRef.current?.querySelector(".reviews__intro");
      if (!intro) return;
      gsap.fromTo(
        intro,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: intro,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section className="reviews" id="bewertungen" ref={sectionRef}>
      <div className="reviews__intro">
        <h2 className="reviews__heading">Was unsere Gäste sagen</h2>
        <p className="reviews__subline">
          <StarRating rating={RESTAURANT_INFO.rating} />
          {RESTAURANT_INFO.rating.toLocaleString("de-DE")} von 5 bei{" "}
          {RESTAURANT_INFO.reviewCount} Google-Rezensionen
        </p>
      </div>

      <div className="reviews__marquee">
        <MarqueeRow reviews={rowOne} />
        <MarqueeRow reviews={rowTwo} reverse />
      </div>
    </section>
  );
}
