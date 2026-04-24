# 🍽️ Restaurant AI Agent

Agent de support client IA pour restaurants, propulsé par Claude (Anthropic).

---

## 📁 Structure

```
restaurant-agent/
├── index.html   → Interface du chatbot
├── agent.js     → Logique + appel API Claude
├── config.js    → Configuration du restaurant (à personnaliser)
└── README.md
```

---

## ⚙️ Configuration

Tout se passe dans `config.js`. Pour un nouveau client, tu changes uniquement ce fichier :

- Nom du restaurant, couleurs
- Horaires, menu, adresse
- Liens de réservation

---

## 🚀 Déploiement sur Vercel

### 1. Pousse le code sur GitHub
```bash
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/TON_USERNAME/restaurant-agent.git
git push -u origin main
```

### 2. Connecte Vercel
1. Va sur [vercel.com](https://vercel.com) → "New Project"
2. Importe ton repo GitHub
3. Clique "Deploy" (pas besoin de config)

### 3. Ajoute la clé API
1. Dans Vercel → Settings → Environment Variables
2. Ajoute : `ANTHROPIC_API_KEY` = ta clé API

⚠️ **Important** : La clé API est actuellement appelée côté client (navigateur).
Pour la production, il faudra une route serveur (ex: Vercel Edge Function).
Voir section "Sécurité" ci-dessous.

---

## 🔒 Sécurité (avant de vendre)

Pour ne pas exposer ta clé API, crée un fichier `/api/chat.js` :

```js
export default async function handler(req, res) {
  const { messages, system } = req.body;
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, system, messages }),
  });
  const data = await response.json();
  res.json(data);
}
```

Puis dans `agent.js`, change l'URL de fetch :
```js
// Avant  : fetch("https://api.anthropic.com/v1/messages", ...)
// Après  : fetch("/api/chat", ...)
```

---

## 💰 Modèle de vente

| Plan | Prix suggéré | Inclus |
|------|-------------|--------|
| Starter | 79€/mois | 1 agent, config de base |
| Pro | 149€/mois | Couleurs custom, menu complet, stats |
| Premium | 299€/mois | Multi-langue, intégration site, support |

Coût API moyen par restaurant : ~3-8€/mois (selon le trafic).

---

## 📞 Support
Pour toute question sur la personnalisation, contacte-nous.
