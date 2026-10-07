(() => {
  // ✏️ Change this to your real launch date and time
  const LAUNCH_DATE = new Date("2026-12-01T09:00:00");

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.getElementById("year").textContent = new Date().getFullYear();

  // Reveal on load
  document.querySelectorAll(".reveal").forEach((el, i) => {
    el.style.transitionDelay = `${i * 90}ms`;
    requestAnimationFrame(() => el.classList.add("is-visible"));
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
  let countdownTimer;
  const update = () => {
    const diff = LAUNCH_DATE - Date.now();
    if (diff <= 0) {
      clearInterval(countdownTimer);
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
  countdownTimer = setInterval(update, 1000);

  // Progress bar
  const fill = document.getElementById("progressFill");
  const label = document.getElementById("progressValue");
  const target = Number(fill.dataset.value);
  setTimeout(() => {
    fill.style.width = `${target}%`;
    if (reduceMotion) { label.textContent = `${target}%`; return; }
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / 1800, 1);
      label.textContent = `${Math.round(target * (1 - Math.pow(1 - p, 3)))}%`;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, 500);

  // Notify form (front-end only — connect to Mailchimp, Formspree, etc. to collect emails)
  const form = document.getElementById("notify");
  const input = document.getElementById("notifyEmail");
  const status = document.getElementById("notifyStatus");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const ok = /^\S+@\S+\.\S+$/.test(input.value.trim());
    form.classList.toggle("is-invalid", !ok);
    status.classList.toggle("is-error", !ok);
    status.classList.toggle("is-success", ok);
    if (!ok) { status.textContent = "Please enter a valid email address."; input.focus(); return; }
    status.textContent = "You're on the list! We'll email you the moment we launch. ✦";
    form.reset();
  });
  input.addEventListener("input", () => form.classList.remove("is-invalid"));

  // Starfield
  const canvas = document.getElementById("stars");
  const ctx = canvas.getContext("2d");
  let stars = [];
  const mouse = { x: 0, y: 0 };
  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = innerWidth * dpr;
    canvas.height = innerHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    stars = Array.from({ length: Math.floor((innerWidth * innerHeight) / 8000) }, () => ({
      x: Math.random() * innerWidth,
      y: Math.random() * innerHeight,
      r: Math.random() * 1.4 + 0.2,
      d: Math.random() * 0.6 + 0.2,
      t: Math.random() * Math.PI * 2,
    }));
  };
  const draw = () => {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    ctx.fillStyle = "#fff";
    for (const s of stars) {
      s.t += 0.02;
      ctx.globalAlpha = 0.35 + Math.sin(s.t) * 0.3;
      ctx.beginPath();
      ctx.arc(s.x + mouse.x * s.d * 20, s.y + mouse.y * s.d * 20, s.r, 0, Math.PI * 2);
      ctx.fill();
    }
    if (!reduceMotion) requestAnimationFrame(draw);
  };
  addEventListener("resize", () => { resize(); if (reduceMotion) draw(); });
  addEventListener("pointermove", (e) => {
    mouse.x = e.clientX / innerWidth - 0.5;
    mouse.y = e.clientY / innerHeight - 0.5;
  }, { passive: true });
  resize();
  draw();
})();
