(() => {
  // ✏️ Change this to your real launch date and time
  const LAUNCH_DATE = new Date("2026-12-01T09:00:00");

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.getElementById("year").textContent = new Date().getFullYear();

  // Reveal on load / scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      io.unobserve(entry.target);
    });
  }, { threshold: 0.1 });
  document.querySelectorAll(".reveal").forEach((el, i) => {
    el.style.transitionDelay = `${(i % 5) * 90}ms`;
    io.observe(el);
  });

  // Countdown
  const parts = {
    days: document.getElementById("cd-days"),
    hours: document.getElementById("cd-hours"),
    mins: document.getElementById("cd-mins"),
    secs: document.getElementById("cd-secs"),
  };
  const pad = (n) => String(n).padStart(2, "0");
  const set = (el, value) => {
    if (el.textContent === value) return;
    el.textContent = value;
    if (!reduceMotion) { el.classList.remove("tick"); void el.offsetWidth; el.classList.add("tick"); }
  };
  let timer;
  const update = () => {
    const diff = LAUNCH_DATE - Date.now();
    if (diff <= 0) {
      clearInterval(timer);
      document.getElementById("countdown").hidden = true;
      document.getElementById("launched").hidden = false;
      return;
    }
    const s = Math.floor(diff / 1000);
    set(parts.days, pad(Math.floor(s / 86400)));
    set(parts.hours, pad(Math.floor((s % 86400) / 3600)));
    set(parts.mins, pad(Math.floor((s % 3600) / 60)));
    set(parts.secs, pad(s % 60));
  };
  update();
  timer = setInterval(update, 1000);

  // Waitlist form (front-end only — connect to Mailchimp, Klaviyo, Formspree, etc. to collect emails)
  const form = document.getElementById("waitlist");
  const input = document.getElementById("waitEmail");
  const status = document.getElementById("waitStatus");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const ok = /^\S+@\S+\.\S+$/.test(input.value.trim());
    form.classList.toggle("is-invalid", !ok);
    status.classList.toggle("is-success", ok);
    if (!ok) { status.textContent = "Please enter a valid email address."; input.focus(); return; }
    status.textContent = "You're on the list! Your 20% code will arrive on launch day. ✨";
    form.reset();
  });
  input.addEventListener("input", () => form.classList.remove("is-invalid"));

  // Falling petals
  if (!reduceMotion) {
    const petals = document.getElementById("petals");
    for (let i = 0; i < 14; i++) {
      const p = document.createElement("span");
      p.className = "petal";
      p.style.left = `${Math.random() * 100}%`;
      p.style.setProperty("--s", `${8 + Math.random() * 12}px`);
      p.style.setProperty("--d", `${12 + Math.random() * 14}s`);
      p.style.setProperty("--delay", `${-Math.random() * 20}s`);
      p.style.setProperty("--drift", `${(Math.random() - 0.5) * 160}px`);
      petals.appendChild(p);
    }
  }
})();

// Sliding banner
(() => {
  const root = document.querySelector(".slider");
  if (!root) return;
  const slides = [...root.querySelectorAll(".slide")];
  const dots = [...root.querySelectorAll(".slider__dot")];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const SLIDE_TIME = 4500;
  root.style.setProperty("--slide-time", `${SLIDE_TIME}ms`);
  let index = 0;
  let timer;

  const go = (next) => {
    index = (next + slides.length) % slides.length;
    slides.forEach((s, i) => {
      s.classList.toggle("is-active", i === index);
      s.classList.toggle("is-prev", i !== index && i === (index - 1 + slides.length) % slides.length);
      s.setAttribute("aria-hidden", String(i !== index));
    });
    dots.forEach((d, i) => {
      d.classList.remove("is-active");
      if (i === index) { void d.offsetWidth; d.classList.add("is-active"); }
      d.setAttribute("aria-selected", String(i === index));
    });
    restart();
  };
  const restart = () => {
    clearTimeout(timer);
    if (!reduceMotion && !root.classList.contains("is-paused")) timer = setTimeout(() => go(index + 1), SLIDE_TIME);
  };
  const pause = (on) => { root.classList.toggle("is-paused", on); on ? clearTimeout(timer) : restart(); };

  document.getElementById("slidePrev").addEventListener("click", () => go(index - 1));
  document.getElementById("slideNext").addEventListener("click", () => go(index + 1));
  dots.forEach((d, i) => d.addEventListener("click", () => go(i)));
  root.addEventListener("mouseenter", () => pause(true));
  root.addEventListener("mouseleave", () => pause(false));
  root.addEventListener("focusin", () => pause(true));
  root.addEventListener("focusout", () => pause(false));

  // Swipe on phones
  let startX = null;
  const viewport = document.getElementById("slider");
  viewport.addEventListener("pointerdown", (e) => { startX = e.clientX; });
  viewport.addEventListener("pointerup", (e) => {
    if (startX === null) return;
    const dx = e.clientX - startX;
    if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
    startX = null;
  });

  go(0);
})();
