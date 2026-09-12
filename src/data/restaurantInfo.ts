export interface OpeningHoursEntry {
  day: string;
  hours: string;
}

export const RESTAURANT_INFO = {
  name: "Aroma Grill",
  street: "Neugablonzer Str. 33B",
  postalCode: "87600",
  city: "Kaufbeuren",
  phoneDisplay: "08341 9986261",
  phoneHref: "tel:+4983419986261",
  mapsHref:
    "https://www.google.com/maps/search/?api=1&query=Aroma+Grill+Neugablonzer+Str.+33B+87600+Kaufbeuren",
  directionsHref:
    "https://www.google.com/maps/dir/?api=1&destination=Aroma+Grill+Neugablonzer+Str.+33B+87600+Kaufbeuren",
  /** Loaded into an <iframe> only after the visitor clicks "Karte laden" —
   * see RestaurantInfo's MapPanel — so no connection to Google is made
   * (and no cookies are set) until that explicit action. */
  mapEmbedSrc:
    "https://www.google.com/maps?q=Aroma+Grill,+Neugablonzer+Str.+33B,+87600+Kaufbeuren&output=embed",
  rating: 4.5,
  reviewCount: 77,
  priceRange: "10–20 €",
};

export const OPENING_HOURS: OpeningHoursEntry[] = [
  { day: "Montag", hours: "17:00–21:00" },
  { day: "Dienstag", hours: "17:00–21:00" },
  { day: "Mittwoch", hours: "Geschlossen" },
  { day: "Donnerstag", hours: "17:00–21:00" },
  { day: "Freitag", hours: "17:00–21:00" },
  { day: "Samstag", hours: "11:00–21:00" },
  { day: "Sonntag", hours: "11:00–21:00" },
];
