export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  /**
   * Path to a dish photo under /public (e.g. "/menu/cevapi.jpg"). Leave
   * `null` to render the built-in placeholder panel until a real photo is
   * supplied — the layout and animation are identical either way.
   */
  image: string | null;
}

export interface MenuCategory {
  id: string;
  name: string;
  items: MenuItem[];
}

/**
 * Single source of truth for the menu section — edit categories, names,
 * descriptions, prices or `image` here; Menu.tsx only renders whatever is
 * listed. The "Vorspeisen", "Beilagen" and "Getränke" entries are example
 * placeholder dishes (no real data was supplied for them) — replace freely.
 */
export const MENU_CATEGORIES: MenuCategory[] = [
  {
    id: "vorspeisen",
    name: "Vorspeisen",
    items: [
      {
        id: "ajvar-brot",
        name: "Ajvar mit Fladenbrot",
        description:
          "Hausgemachter Ajvar aus gerösteten Paprika, mit warmem Fladenbrot serviert.",
        price: "4,50 €",
        image: null,
      },
      {
        id: "kaeseplatte-balkan",
        name: "Käseplatte Balkan",
        description:
          "Auswahl an Balkan-Käse mit Oliven und eingelegtem Gemüse.",
        price: "6,90 €",
        image: null,
      },
      {
        id: "gemischter-salat",
        name: "Gemischter Salat",
        description:
          "Frischer Salat mit Tomaten, Gurken, Zwiebeln und Petersilie.",
        price: "5,50 €",
        image: null,
      },
    ],
  },
  {
    id: "vom-grill",
    name: "Vom Grill",
    items: [
      {
        id: "cevapi",
        name: "Ćevapi",
        description:
          "Handgeformte Röllchen aus gegrilltem Rind- und Lammhack, mit Lepinja und roten Zwiebeln.",
        price: "12,00 €",
        image: null,
      },
      {
        id: "cevapi-ajvar-reis",
        name: "Ćevapi mit Ajvar & Reis",
        description:
          "Klassische Ćevapi, dazu hausgemachter Ajvar und Reis nach Balkan-Art.",
        price: "15,50 €",
        image: null,
      },
      {
        id: "pljeskavica",
        name: "Pljeskavica",
        description:
          "Saftiger, gegrillter Fleischlaib aus Rind und Lamm, gewürzt nach traditioneller Rezeptur.",
        price: "14,50 €",
        image: null,
      },
      {
        id: "grillteller-aroma",
        name: "Grillteller Aroma",
        description:
          "Eine Auswahl unserer besten Grillspezialitäten, serviert mit Ajvar, Zwiebeln und Fladenbrot.",
        price: "18,90 €",
        image: null,
      },
      {
        id: "balkan-grillplatte",
        name: "Balkan Grillplatte",
        description:
          "Großzügige Platte für zwei: Ćevapi, Pljeskavica, gegrillte Paprika und frisches Fladenbrot.",
        price: "22,90 €",
        image: null,
      },
    ],
  },
  {
    id: "beilagen",
    name: "Beilagen",
    items: [
      {
        id: "pommes",
        name: "Pommes Frites",
        description: "Knusprig frittierte Kartoffelstäbchen.",
        price: "3,50 €",
        image: null,
      },
      {
        id: "reis",
        name: "Reis",
        description: "Locker gedämpfter Reis nach Balkan-Art.",
        price: "3,00 €",
        image: null,
      },
      {
        id: "fladenbrot-beilage",
        name: "Fladenbrot",
        description: "Frisch gebackene Lepinja, warm serviert.",
        price: "2,00 €",
        image: null,
      },
    ],
  },
  {
    id: "getraenke",
    name: "Getränke",
    items: [
      {
        id: "erfrischung",
        name: "Cola / Fanta / Sprite",
        description: "0,33 l, gut gekühlt.",
        price: "2,80 €",
        image: null,
      },
      {
        id: "ayran",
        name: "Ayran",
        description: "Traditionelles, erfrischendes Joghurtgetränk.",
        price: "2,50 €",
        image: null,
      },
      {
        id: "tee",
        name: "Türkischer Tee",
        description: "Stark aufgebrüht, im Glas serviert.",
        price: "2,00 €",
        image: null,
      },
    ],
  },
];
