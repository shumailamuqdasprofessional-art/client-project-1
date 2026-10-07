(() => {
  // ✏️ Edit your series and products here
  const SERIES = [
    {
      id: "hydrating", icon: "💧", name: "Hydrating", tint: "#e3eaec",
      desc: "Deep, lasting moisture for dry and thirsty skin.",
      ingredients: ["Hyaluronic Acid", "Ceramides", "Panthenol"],
      products: [
        { name: "Hyaluronic Toner", label: "Hyaluronic<br />Toner", type: "Toner · 150ml", note: "Floods skin with lightweight hydration.", pack: "toner" },
        { name: "Ceramide Barrier Cream", label: "Ceramide Cream", type: "Moisturiser · 50ml", note: "Rich moisture that locks in hydration.", pack: "jar" },
        { name: "Hydrating Sheet Masks", label: "Hydra Mask", type: "Sheet masks · 10 pack", note: "Ten minutes to plump, dewy skin.", pack: "mask" },
      ],
    },
    {
      id: "anti-aging", icon: "⏳", name: "Anti-Aging", tint: "#ece3da",
      desc: "Firm, smooth and renew for youthful-looking skin.",
      ingredients: ["Retinol", "Peptides", "Collagen"],
      products: [
        { name: "Retinol Night Serum", label: "Retinol<br />Serum", type: "Serum · 30ml", note: "Smooths the look of fine lines overnight.", pack: "serum" },
        { name: "Collagen Firming Cream", label: "Collagen Cream", type: "Moisturiser · 50ml", note: "Helps skin feel firmer and bouncier.", pack: "jar" },
        { name: "Peptide Eye Cream", label: "Peptide<br />Eye", type: "Eye cream · 20ml", note: "Softens the look of tired eyes.", pack: "tube" },
      ],
    },
    {
      id: "acne", icon: "🌿", name: "Acne Care", tint: "#e3e9df",
      desc: "Calm breakouts and keep pores clear.",
      ingredients: ["Salicylic Acid (BHA)", "Tea Tree", "Centella"],
      products: [
        { name: "BHA Clear Cleanser", label: "BHA<br />Cleanser", type: "Cleanser · 150ml", note: "Gently clears oil and unclogs pores.", pack: "pump" },
        { name: "Tea Tree Spot Serum", label: "Tea Tree<br />Serum", type: "Serum · 20ml", note: "Targets breakouts and calms redness.", pack: "serum" },
        { name: "Pimple Patches", label: "Spot Patch", type: "Patches · 36 pcs", note: "Protect and flatten spots overnight.", pack: "mask" },
      ],
    },
    {
      id: "sunscreen", icon: "☀️", name: "Sunscreen", tint: "#f1e7d0",
      desc: "Light, invisible daily protection with SPF 50+.",
      ingredients: ["SPF 50+", "PA++++", "No white cast"],
      products: [
        { name: "Daily Sun Cream SPF 50+", label: "Sun Cream<br />SPF 50+", type: "Sunscreen · 50ml", note: "Weightless everyday protection.", pack: "tube" },
        { name: "Tone-Up Sun Cream SPF 50+", label: "Tone-Up<br />SPF 50+", type: "Sunscreen · 50ml", note: "Protects and brightens in one step.", pack: "tube" },
        { name: "Sun Cushion SPF 50+", label: "Sun Cushion", type: "Cushion · 15g", note: "Easy top-ups over makeup.", pack: "cushion" },
      ],
    },
    {
      id: "brightening", icon: "✨", name: "Brightening & Glowing", tint: "#f3e5cc",
      desc: "Even tone and a radiant, glass-skin glow.",
      ingredients: ["Vitamin C", "Niacinamide", "Rice Extract"],
      products: [
        { name: "Vitamin C Glow Serum", label: "Vitamin C<br />Serum", type: "Serum · 30ml", note: "Brightens dull skin for a radiant glow.", pack: "serum" },
        { name: "Rice Glow Essence", label: "Rice<br />Essence", type: "Essence · 150ml", note: "The secret to soft, glass-like skin.", pack: "toner" },
        { name: "Niacinamide Toner", label: "Niacinamide<br />Toner", type: "Toner · 150ml", note: "Evens tone and refines the look of pores.", pack: "pump" },
      ],
    },
    {
      id: "sensitive", icon: "🤍", name: "Sensitive Skin", tint: "#efe5e2",
      desc: "Gentle care to soothe redness and support your skin barrier.",
      ingredients: ["Centella (Cica)", "Mugwort", "Heartleaf"],
      products: [
        { name: "Cica Calming Cream", label: "Cica Cream", type: "Moisturiser · 50ml", note: "Soothes and comforts irritated skin.", pack: "jar" },
        { name: "Mugwort Cleansing Foam", label: "Mugwort<br />Foam", type: "Cleanser · 150ml", note: "A soft, low-pH wash for delicate skin.", pack: "tube" },
        { name: "Heartleaf Soothing Toner", label: "Heartleaf<br />Toner", type: "Toner · 150ml", note: "Calms redness and refreshes.", pack: "toner" },
      ],
    },
  ];

  document.getElementById("year").textContent = new Date().getFullYear();

  // Nav border on scroll
  const nav = document.getElementById("nav");
  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 10);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile menu
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  const setMenu = (open) => {
    links.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };
  toggle.addEventListener("click", () => setMenu(!links.classList.contains("is-open")));
  links.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (e) => e.key === "Escape" && setMenu(false));

  // Series cards
  const seriesGrid = document.getElementById("seriesGrid");
  seriesGrid.innerHTML = SERIES.map((s) => `
    <article class="series__card reveal" style="--tint:${s.tint}">
      <span class="series__icon" aria-hidden="true">${s.icon}</span>
      <h3>${s.name}</h3>
      <p>${s.desc}</p>
      <ul class="series__ing" aria-label="Key ingredients">${s.ingredients.map((i) => `<li>${i}</li>`).join("")}</ul>
      <a href="#shop" class="series__link" data-series="${s.id}">Shop ${s.name} →</a>
    </article>`).join("");

  // Series tabs + products
  const tabs = document.getElementById("seriesTabs");
  const grid = document.getElementById("productGrid");
  const intro = document.getElementById("seriesIntro");
  tabs.innerHTML = SERIES.map((s) =>
    `<button class="chip" role="tab" aria-selected="false" data-series="${s.id}">${s.icon} ${s.name}</button>`).join("");

  const showSeries = (id) => {
    const s = SERIES.find((x) => x.id === id) || SERIES[0];
    tabs.querySelectorAll(".chip").forEach((c) => {
      const on = c.dataset.series === s.id;
      c.classList.toggle("is-active", on);
      c.setAttribute("aria-selected", String(on));
    });
    intro.textContent = s.desc;
    grid.innerHTML = s.products.map((p) => `
      <article class="product product--in">
        <div class="product__img" style="--bg:${s.tint}">
          <span class="badge">${s.name}</span>
          <div class="pack pack--${p.pack}" style="--c1:#fbf8f3;--c2:#e2d6c6"><span>${p.label}</span></div>
        </div>
        <div class="product__body">
          <p class="product__type">${p.type}</p>
          <h3>${p.name}</h3>
          <p class="product__note">${p.note}</p>
          <div class="product__foot"><button class="btn btn--small add" data-name="${p.name}">Add to bag</button></div>
        </div>
      </article>`).join("");
  };
  tabs.addEventListener("click", (e) => {
    const chip = e.target.closest(".chip");
    if (chip) showSeries(chip.dataset.series);
  });
  // "Shop Hydrating →" links and footer links open the matching tab
  document.querySelectorAll("a[data-series]").forEach((a) => a.addEventListener("click", () => showSeries(a.dataset.series)));
  showSeries(SERIES[0].id);

  // Scroll reveal
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      io.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  document.querySelectorAll(".reveal").forEach((el, i) => {
    el.style.transitionDelay = `${(i % 3) * 80}ms`;
    io.observe(el);
  });

  // Toast
  const toast = document.getElementById("toast");
  let toastTimer;
  const showToast = (msg) => {
    toast.textContent = msg;
    toast.classList.add("is-show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("is-show"), 2600);
  };

  // Shopping bag (demo — connect to Shopify, WooCommerce, etc. for real checkout)
  const bagCount = document.getElementById("bagCount");
  const bagBtn = document.getElementById("bagBtn");
  let count = 0;
  grid.addEventListener("click", (e) => {
    const btn = e.target.closest(".add");
    if (!btn) return;
    count += 1;
    bagCount.textContent = count;
    bagBtn.setAttribute("aria-label", `Shopping bag, ${count} item${count === 1 ? "" : "s"}`);
    bagCount.classList.add("bump");
    setTimeout(() => bagCount.classList.remove("bump"), 300);
    btn.textContent = "Added ✓";
    btn.classList.add("is-added");
    setTimeout(() => { btn.textContent = "Add to bag"; btn.classList.remove("is-added"); }, 1600);
    showToast(`${btn.dataset.name} added to your bag`);
  });
  bagBtn.addEventListener("click", () => showToast(count ? `You have ${count} item${count === 1 ? "" : "s"} in your bag` : "Your bag is empty"));

  // Waitlist (front-end only — connect to Mailchimp, Klaviyo, etc.)
  const form = document.getElementById("subscribe");
  const input = document.getElementById("subEmail");
  const status = document.getElementById("subStatus");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const ok = /^\S+@\S+\.\S+$/.test(input.value.trim());
    form.classList.toggle("is-invalid", !ok);
    status.textContent = ok ? "You're on the list! Your 20% code will arrive on launch day. ✨" : "Please enter a valid email address.";
    if (ok) form.reset(); else input.focus();
  });
})();
