function buildSystemPrompt(config, lang) {
  const hoursText = Object.entries(config.hours)
    .map(([day, h]) => `  ${day.charAt(0).toUpperCase() + day.slice(1)}: ${h}`)
    .join("\n");
  const menuText = `\nEntrées: ${config.menu.entrees.join(", ")}\nPlats: ${config.menu.plats.join(", ")}\nDesserts: ${config.menu.desserts.join(", ")}\nMenus: ${config.menu.menus.join(" | ")}`;
  const langInstruction = lang === 'en'
    ? "IMPORTANT: You must respond ONLY in English."
    : "IMPORTANT: Tu dois répondre UNIQUEMENT en français.";
  return `Tu es ${config.agentName}, l'assistant du restaurant "${config.restaurantName}". Tu es professionnel et concis.\n\n${langInstruction}\n\nInfos:\n- Adresse: ${config.address}\n- Tél: ${config.phone}\n- Email: ${config.email}\n- Accès: ${config.access}\n\nHoraires:\n${hoursText}\n\nMenu:${menuText}\n\nRéservations: ${config.reservationUrl} ou ${config.reservationPhone}\nAllergènes: ${config.dietary}\n\nRègles: 2-3 phrases max. Si inconnu, proposer d'appeler. Parler uniquement du restaurant.`;
}

const GROQ_API_KEY = "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";
const conversationHistory = [];

async function sendToAgent(userMessage, lang = 'fr') {
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
        { role: "system", content: buildSystemPrompt(AGENT_CONFIG, lang) },
        ...conversationHistory
      ]
    })
  });
  if (!response.ok) throw new Error(`API error: ${response.status}`);
  const data = await response.json();
  const reply = data.choices?.[0]?.message?.content || (lang === 'en' ? "Sorry, an error occurred." : "Désolé, une erreur est survenue.");
  conversationHistory.push({ role: "assistant", content: reply });
  return reply;
}
