setTimeout(() => {
  const bubble = document.createElement("div");
  bubble.style.cssText = `
    position: fixed;
    bottom: 90px;
    right: 20px;
    background: white;
    border: 1px solid #E8E0D0;
    border-radius: 16px 16px 4px 16px;
    padding: 12px 16px;
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    font-weight: 300;
    color: #2C2416;
    max-width: 220px;
    box-shadow: 0 4px 20px rgba(44,36,22,0.1);
    animation: popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    cursor: pointer;
    z-index: 1000;
  `;
  bubble.innerHTML = `👋 Bonjour ! Une question sur <strong>${AGENT_CONFIG.restaurantName}</strong> ? Je suis là !`;
  bubble.onclick = () => bubble.remove();
  
  const style = document.createElement("style");
  style.textContent = `@keyframes popIn { from { opacity: 0; transform: scale(0.5) translateY(20px); } to { opacity: 1; transform: scale(1) translateY(0); } }`;
  document.head.appendChild(style);
  document.body.appendChild(bubble);
  
  setTimeout(() => {
    bubble.style.transition = "opacity 0.5s";
    bubble.style.opacity = "0";
    setTimeout(() => bubble.remove(), 500);
  }, 5000);
}, 3000);
