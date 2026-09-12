export interface Review {
  id: string;
  /**
   * Placeholder reviewer name — the brief supplied review texts but no
   * reviewer names. Replace with the real Google reviewer names whenever
   * you have them; nothing else needs to change.
   */
  name: string;
  rating: number;
  text: string;
}

export const REVIEWS: Review[] = [
  {
    id: "review-1",
    name: "Michael K.",
    rating: 5,
    text: "Das Essen war ausgezeichnet, die Preise erschwinglich, das Personal sehr kommunikativ.",
  },
  {
    id: "review-2",
    name: "Sarah W.",
    rating: 5,
    text: "Sehr lecker, sehr frisch. Supernette Bedienung.",
  },
  {
    id: "review-3",
    name: "Thomas B.",
    rating: 5,
    text: "Das Essen war hervorragend und unsere Bedienung war so nett und zuvorkommend.",
  },
  {
    id: "review-4",
    name: "Anna L.",
    rating: 5,
    text: "Selten so gut gegessen.",
  },
  {
    id: "review-5",
    name: "David R.",
    rating: 4,
    text: "Sehr lecker. Super freundlich.",
  },
  {
    id: "review-6",
    name: "Laura S.",
    rating: 5,
    text: "Das Fladenbrot war sooo fluffig und sehr lecker. Die Cevapcici waren sehr saftig.",
  },
  {
    id: "review-7",
    name: "Markus H.",
    rating: 5,
    text: "Ein sehr schönes, gemütliches und sauberes Ambiente.",
  },
  {
    id: "review-8",
    name: "Julia F.",
    rating: 5,
    text: "Alles war sehr lecker, ein hervorragender Service.",
  },
  {
    id: "review-9",
    name: "Stefan N.",
    rating: 4,
    text: "Sehr gutes Essen, alles frisch zubereitet.",
  },
  {
    id: "review-10",
    name: "Nina P.",
    rating: 5,
    text: "Tolle Service, tolles Essen, Ambiente wunderbar und sehr sauber.",
  },
];
