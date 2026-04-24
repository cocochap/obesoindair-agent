function buildSystemPrompt(config) {
  const hoursText = Object.entries(config.hours)
    .map(([day, h]) => `  ${day.charAt(0).toUpperCase() + day.slice(1)}: ${h}`)
    .join("\n");
  const menuText = `\nEntrées: ${config.menu.entrees.join(", ")}\nPlats: ${config.menu.plats.join(", ")}\nDesserts: ${config.menu.desserts.join(", ")}\nMenus: ${config.menu.menus.join(" | ")}`;
  return `Tu es ${config.agentName}, l'assistant virtuel du restaurant "${config.restaurantName}". Tu es professionnel, efficace et concis. Tu réponds en français par défaut, en anglais si le client écrit en anglais.\n\nINFORMATIONS :\n- Adresse : ${config.address}\n- Téléphone : ${config.phone}\n- Email : ${config.email}\n- Accès : ${config.access}\n- Parking : ${config.parking}\n\nHORAIRES :\n${hoursText}\n\nMENU :${menuText}\n\nRÉSERVATIONS :\n- En ligne : ${config.reservationUrl}\n- Téléphone : ${config.reservationPhone}\n- Groupes jusqu'à ${config.maxPartySize} personnes\n\nALLERGÈNES : ${config.dietary}\n\nRÈGLES : Réponds en 2-3 phrases max. Si tu ne sais pas, propose d'appeler. Ne promets pas de disponibilité. Parle uniquement du restaurant.`;
}

const GROQ_API_KEY = "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";
const conversationHistory = [];

async function sendToAgent(userMessage) {
  conversationHistory.push({ role: "user", content: userMessage });
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${GROQ_API_KEY}`
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
      max_tokens: 500,
      messages: [
        { role: "system", content: buildSystemPrompt(AGENT_CONFIG) },
        ...conversationHistory
      ]
    })
  });
  if (!response.ok) throw new Error(`API error: ${response.status}`);
  const data = await response.json();
  const reply = data.choices?.[0]?.message?.content || "Je n'ai pas pu traiter votre demande.";
  conversationHistory.push({ role: "assistant", content: reply });
  return reply;
}
