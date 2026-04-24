const AGENT_CONFIG = {
  // ── Infos du restaurant ──────────────────────────────
  restaurantName: "Le Bistrot du Coin",
  agentName: "Alex",
  primaryColor: "#1a1a2e",
  accentColor: "#e94560",

  // ── Horaires ─────────────────────────────────────────
  hours: {
    lundi: "Fermé",
    mardi: "12h00 - 14h30 | 19h00 - 22h30",
    mercredi: "12h00 - 14h30 | 19h00 - 22h30",
    jeudi: "12h00 - 14h30 | 19h00 - 22h30",
    vendredi: "12h00 - 14h30 | 19h00 - 23h00",
    samedi: "12h00 - 15h00 | 19h00 - 23h00",
    dimanche: "12h00 - 15h00",
  },

  // ── Menu (résumé) ─────────────────────────────────────
  menu: {
    entrees: ["Soupe à l'oignon (8€)", "Tartare de saumon (14€)", "Foie gras maison (16€)"],
    plats: ["Entrecôte sauce béarnaise (28€)", "Filet de bar (24€)", "Risotto aux truffes (22€)"],
    desserts: ["Crème brûlée (8€)", "Fondant au chocolat (9€)", "Tarte Tatin (8€)"],
    menus: ["Menu déjeuner : Entrée + Plat ou Plat + Dessert = 19€", "Menu soir : Entrée + Plat + Dessert = 38€"],
  },

  // ── Infos pratiques ───────────────────────────────────
  address: "12 Rue de la Paix, 75001 Paris",
  phone: "01 23 45 67 89",
  email: "contact@bistrotducoin.fr",
  parking: "Parking souterrain à 50m (Rue de Rivoli)",
  access: "Métro Opéra (lignes 3, 7, 8) — 2 min à pied",

  // ── Réservations ──────────────────────────────────────
  reservationUrl: "https://bistrotducoin.fr/reservation",
  reservationPhone: "01 23 45 67 89",
  maxPartySize: 12,

  // ── Allergènes & régimes ──────────────────────────────
  dietary: "Nous proposons des options végétariennes et pouvons adapter certains plats pour les allergies. Merci de nous prévenir lors de la réservation.",

  // ── Langue par défaut ─────────────────────────────────
  defaultLanguage: "fr", // "fr" ou "en"
};
