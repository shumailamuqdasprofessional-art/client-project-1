// ✏️ Edit your skincare series here — used on both pages
(() => {
  const SERIES = [
    { icon: "💧", name: "Hydrating", desc: "Deep, lasting moisture for dry and thirsty skin.", ingredients: ["Hyaluronic Acid", "Ceramides", "Panthenol"] },
    { icon: "⏳", name: "Anti-Aging", desc: "Firm, smooth and renew for youthful-looking skin.", ingredients: ["Retinol", "Peptides", "Collagen"] },
    { icon: "🌿", name: "Acne Care", desc: "Calm breakouts and keep pores clear.", ingredients: ["Salicylic Acid (BHA)", "Tea Tree", "Centella"] },
    { icon: "☀️", name: "Sunscreen", desc: "Light, invisible daily protection with SPF 50+.", ingredients: ["SPF 50+", "PA++++", "No white cast"] },
    { icon: "✨", name: "Brightening & Glowing", desc: "Even tone and a radiant, glass-skin glow.", ingredients: ["Vitamin C", "Niacinamide", "Rice Extract"] },
    { icon: "🤍", name: "Sensitive Skin", desc: "Gentle care to soothe redness and support your skin barrier.", ingredients: ["Centella (Cica)", "Mugwort", "Heartleaf"] },
  ];

  document.querySelectorAll("[data-series-grid]").forEach((grid) => {
    grid.innerHTML = SERIES.map((s) => `
      <article class="series__card reveal">
        <span class="series__soon">Coming soon</span>
        <span class="series__icon" aria-hidden="true">${s.icon}</span>
        <h3>${s.name}</h3>
        <p>${s.desc}</p>
        <ul class="series__ing" aria-label="Key ingredients">${s.ingredients.map((i) => `<li>${i}</li>`).join("")}</ul>
      </article>`).join("");
  });
})();
