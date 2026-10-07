(() => {
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

  // Scroll reveal
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      io.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  document.querySelectorAll(".reveal").forEach((el, i) => {
    el.style.transitionDelay = `${(i % 4) * 80}ms`;
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
  document.querySelectorAll(".add").forEach((btn) => btn.addEventListener("click", () => {
    count += 1;
    bagCount.textContent = count;
    bagBtn.setAttribute("aria-label", `Shopping bag, ${count} item${count === 1 ? "" : "s"}`);
    bagCount.classList.add("bump");
    setTimeout(() => bagCount.classList.remove("bump"), 300);
    btn.textContent = "Added ✓";
    btn.classList.add("is-added");
    setTimeout(() => { btn.textContent = "Add to bag"; btn.classList.remove("is-added"); }, 1600);
    showToast(`${btn.dataset.name} added to your bag`);
  }));
  bagBtn.addEventListener("click", () => showToast(count ? `You have ${count} item${count === 1 ? "" : "s"} in your bag` : "Your bag is empty"));

  // Skin quiz
  const routines = {
    dry: {
      desc: "Your skin craves deep, lasting moisture.",
      steps: [["Cloud Cleanser", "Cleanse gently without stripping"], ["Glow Serum", "Hydrate and brighten"], ["Velvet Cream", "Rich ceramides lock moisture in"]],
    },
    oily: {
      desc: "Balance shine while keeping skin hydrated.",
      steps: [["Cloud Cleanser", "Clear away excess oil"], ["Glow Serum", "Lightweight, non-greasy radiance"], ["Daily Shield SPF 50", "Matte, invisible protection"]],
    },
    combo: {
      desc: "Hydrate dry areas and balance your T-zone.",
      steps: [["Cloud Cleanser", "A gentle reset for all areas"], ["Glow Serum", "Even tone and texture"], ["Velvet Cream", "Apply more where skin feels dry"]],
    },
    sensitive: {
      desc: "Calm, comfort and strengthen your skin barrier.",
      steps: [["Cloud Cleanser", "Fragrance-free and soothing"], ["Velvet Cream", "Ceramides to support your barrier"], ["Daily Shield SPF 50", "Gentle daily protection"]],
    },
  };
  const desc = document.getElementById("routineDesc");
  const stepsEl = document.getElementById("routineSteps");
  const chips = document.querySelectorAll(".chip");
  const renderRoutine = (type) => {
    const r = routines[type];
    desc.textContent = r.desc;
    stepsEl.innerHTML = r.steps.map(([name, note], i) =>
      `<li><span class="routine__num">${i + 1}</span><div><strong>${name}</strong><small>${note}</small></div></li>`).join("");
  };
  chips.forEach((chip) => chip.addEventListener("click", () => {
    chips.forEach((c) => {
      const on = c === chip;
      c.classList.toggle("is-active", on);
      c.setAttribute("aria-selected", String(on));
    });
    renderRoutine(chip.dataset.type);
  }));
  renderRoutine("dry");

  // Newsletter (front-end only — connect to Mailchimp, Klaviyo, etc.)
  const form = document.getElementById("subscribe");
  const input = document.getElementById("subEmail");
  const status = document.getElementById("subStatus");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const ok = /^\S+@\S+\.\S+$/.test(input.value.trim());
    form.classList.toggle("is-invalid", !ok);
    status.textContent = ok ? "Welcome to the Glow Club! Your 10% code is on its way. ✨" : "Please enter a valid email address.";
    if (ok) form.reset(); else input.focus();
  });
})();
