(function() {
  const CHAT_URL = "https://cocochap.github.io/restaurant-agent/";
  
  const style = document.createElement("style");
  style.textContent = `
    #ai-widget-btn {
      position: fixed; bottom: 24px; right: 24px;
      width: 56px; height: 56px; border-radius: 50%;
      background: #8B6F47; border: none; cursor: pointer;
      box-shadow: 0 4px 20px rgba(139,111,71,0.4);
      display: flex; align-items: center; justify-content: center;
      z-index: 9999; transition: transform 0.2s, box-shadow 0.2s;
    }
    #ai-widget-btn:hover { transform: scale(1.08); box-shadow: 0 6px 28px rgba(139,111,71,0.5); }
    #ai-widget-btn svg { width: 26px; height: 26px; fill: white; }
    #ai-widget-frame {
      position: fixed; bottom: 92px; right: 24px;
      width: 380px; height: 580px;
      border: none; border-radius: 16px;
      box-shadow: 0 8px 40px rgba(0,0,0,0.15);
      z-index: 9998; display: none;
      animation: slideUp 0.3s cubic-bezier(0.175,0.885,0.32,1.275);
    }
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(20px) scale(0.95); }
      to   { opacity: 1; transform: translateY(0) scale(1); }
    }
    #ai-widget-badge {
      position: absolute; top: -4px; right: -4px;
      width: 18px; height: 18px; border-radius: 50%;
      background: #e74c3c; border: 2px solid white;
      animation: pulse 2s infinite;
    }
    @keyframes pulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.2); } }
  `;
  document.head.appendChild(style);

  const btn = document.createElement("button");
  btn.id = "ai-widget-btn";
  btn.innerHTML = `
    <div id="ai-widget-badge"></div>
    <svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/></svg>
  `;

  const frame = document.createElement("iframe");
  frame.id = "ai-widget-frame";
  frame.src = CHAT_URL;

  let open = false;
  btn.onclick = () => {
    open = !open;
    frame.style.display = open ? "block" : "none";
    document.getElementById("ai-widget-badge").style.display = open ? "none" : "block";
    btn.style.background = open ? "#6B5237" : "#8B6F47";
  };

  document.body.appendChild(frame);
  document.body.appendChild(btn);
})();
