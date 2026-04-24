function buildSystemPrompt(config) {
  const hoursText = Object.entries(config.hours)
    .map(([day, h]) => `  ${day.charAt(0).toUpperCase() + day.slice(1)}: ${h}`)
    .join("\n");
  const menuText = `\nEntrées: ${config.menu.entrees.join(", ")}\nPlats: ${config.menu.plats.join(", ")}\nDesserts: ${config.menu.desserts.join(", ")}\nMenus: ${config.menu.menus.join(" | ")}`;
  return `Tu es ${config.agentName}, l'assistant virtuel du restaurant "${config.restaurantName}". Tu es professionnel, efficace et concis. Tu réponds en français par défaut, en anglais si le client écrit en anglais.\n\nINFORMATIONS :\n- Adresse : ${config.address}\n- Téléphone : ${config.phone}\n- Email : ${config.email}\n- Accès : ${config.access}\n- Parking : ${config.parking}\n\nHORAIRES :\n${hoursText}\n\nMENU :${menuText}\n\nRÉSERVATIONS :\n- En ligne : ${config.reservationUrl}\n- Téléphone : ${config.reservationPhone}\n- Groupes jusqu'à ${config.maxPartySize} personnes\n\nALLERGÈNES : ${config.dietary}\n\nRÈGLES : Réponds en 2-3 phrases max. Si tu ne sais pas, propose d'appeler. Ne promets pas de disponibilité. Parle uniquement du restaurant.`;
}

const GEMINI_API_KEY = "AIzaSyAOtzZkd0OVZFm_y_dkiQc-nkgKUWTU9l4";
const conversationHistory = [];

async function sendToAgent(userMessage) {
  conversationHistory.push({ role: "user", parts: [{ text: userMessage }] });
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: buildSystemPrompt(AGENT_CONFIG) }] },
        contents: conversationHistory,
        generationConfig: { maxOutputTokens: 500, temperature: 0.7 }
      })
    }
  );
  if (!response.ok) throw new Error(`API error: ${response.status}`);
  const data = await response.json();
  const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Je n'ai pas pu traiter votre demande.";
  conversationHistory.push({ role: "model", parts: [{ text: reply }] });
  return reply;
}
