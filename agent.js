// ── Construit le system prompt à partir de la config ──
function buildSystemPrompt(config) {
  const hoursText = Object.entries(config.hours)
    .map(([day, h]) => `  ${day.charAt(0).toUpperCase() + day.slice(1)}: ${h}`)
    .join("\n");

  const menuText = `
Entrées: ${config.menu.entrees.join(", ")}
Plats: ${config.menu.plats.join(", ")}
Desserts: ${config.menu.desserts.join(", ")}
Menus: ${config.menu.menus.join(" | ")}`;

  return `Tu es ${config.agentName}, l'assistant virtuel du restaurant "${config.restaurantName}".
Tu es professionnel, efficace et concis. Tu réponds en français par défaut, en anglais si le client écrit en anglais.

INFORMATIONS DU RESTAURANT :
- Adresse : ${config.address}
- Téléphone : ${config.phone}
- Email : ${config.email}
- Accès : ${config.access}
- Parking : ${config.parking}

HORAIRES D'OUVERTURE :
${hoursText}

MENU :
${menuText}

RÉSERVATIONS :
- En ligne : ${config.reservationUrl}
- Par téléphone : ${config.reservationPhone}
- Groupes jusqu'à ${config.maxPartySize} personnes

ALLERGÈNES & RÉGIMES :
${config.dietary}

RÈGLES IMPORTANTES :
1. Réponds en 2-3 phrases maximum sauf si une liste est nécessaire.
2. Si tu ne sais pas, propose de contacter le restaurant par téléphone.
3. Ne promets jamais une disponibilité spécifique — redirige vers la réservation.
4. Tu ne parles que du restaurant. Décline poliment toute autre demande.
5. Sois direct et utile, sans formules creuses.`;
}

// ── Historique de la conversation ─────────────────────
const conversationHistory = [];

// ── Envoie un message à Claude et retourne la réponse ──
async function sendToAgent(userMessage) {
  conversationHistory.push({ role: "user", content: userMessage });

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      system: buildSystemPrompt(AGENT_CONFIG),
      messages: conversationHistory,
    }),
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  const data = await response.json();
  const reply = data.content?.map((b) => b.text || "").join("") || "Je n'ai pas pu traiter votre demande.";

  conversationHistory.push({ role: "assistant", content: reply });
  return reply;
}
