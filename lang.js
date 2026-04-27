let currentLang = 'fr';

const translations = {
  fr: {
    placeholder: 'Écrivez votre message...',
    status: 'Disponible maintenant',
    welcome: `Bonjour et bienvenue chez ${AGENT_CONFIG.restaurantName} ! Je suis ${AGENT_CONFIG.agentName}, votre assistant. Comment puis-je vous aider ?`,
    chips: ['🕐 Horaires', '🍽 Menu', '📅 Réserver', '📍 Accès'],
    questions: ['Quels sont vos horaires ?', 'Pouvez-vous me montrer le menu ?', 'Comment réserver une table ?', 'Comment vous accéder ?'],
  },
  en: {
    placeholder: 'Write your message...',
    status: 'Available now',
    welcome: `Hello and welcome to ${AGENT_CONFIG.restaurantName}! I'm ${AGENT_CONFIG.agentName}, your assistant. How can I help you?`,
    chips: ['🕐 Hours', '🍽 Menu', '📅 Book', '📍 Access'],
    questions: ['What are your opening hours?', 'Can you show me the menu?', 'How can I book a table?', 'How do I get there?'],
  }
};

function switchLang(lang) {
  currentLang = lang;
  const t = translations[lang];
  document.getElementById('input').placeholder = t.placeholder;
  document.getElementById('status-text').textContent = t.status;
  document.querySelectorAll('.suggestion-chip').forEach((chip, i) => {
    chip.textContent = t.chips[i];
    chip.onclick = () => sendSuggestion(t.questions[i]);
  });
  document.getElementById('lang-fr').style.fontWeight = lang === 'fr' ? '500' : '300';
  document.getElementById('lang-en').style.fontWeight = lang === 'en' ? '500' : '300';
  document.getElementById('lang-fr').style.color = lang === 'fr' ? 'var(--brown)' : 'var(--text-muted)';
  document.getElementById('lang-en').style.color = lang === 'en' ? 'var(--brown)' : 'var(--text-muted)';
}
