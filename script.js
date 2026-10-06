(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Footer year
  document.getElementById("year").textContent = new Date().getFullYear();

  // Sticky nav style
  const nav = document.getElementById("nav");
  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 20);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile menu
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  const setMenu = (open) => {
    links.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.style.overflow = open ? "hidden" : "";
  };
  toggle.addEventListener("click", () => setMenu(!links.classList.contains("is-open")));
  links.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (e) => e.key === "Escape" && setMenu(false));

  // Scroll reveal + counters
  const animateCount = (el) => {
    const target = Number(el.dataset.count);
    if (reduceMotion) { el.textContent = target; return; }
    const start = performance.now();
    const dur = 1600;
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      el.classList.add("is-visible");
      el.querySelectorAll("[data-count]").forEach(animateCount);
      io.unobserve(el);
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
  document.querySelectorAll(".reveal").forEach((el, i) => {
    el.style.transitionDelay = `${(i % 3) * 80}ms`;
    io.observe(el);
  });

  // Rotating hero word
  const rotator = document.getElementById("rotator");
  const words = ["move people.", "drive growth.", "win awards.", "feel magic."];
  let w = 0;
  if (!reduceMotion) {
    setInterval(() => {
      rotator.classList.add("is-out");
      setTimeout(() => {
        w = (w + 1) % words.length;
        rotator.textContent = words[w];
        rotator.classList.remove("is-out");
      }, 400);
    }, 2800);
  }

  // Cursor glow + card spotlight / tilt
  const glow = document.querySelector(".cursor-glow");
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (finePointer) {
    window.addEventListener("pointermove", (e) => {
      glow.style.transform = `translate(${e.clientX - 250}px, ${e.clientY - 250}px)`;
    }, { passive: true });

    document.querySelectorAll(".tilt").forEach((card) => {
      card.addEventListener("pointermove", (e) => {
        const r = card.getBoundingClientRect();
        const x = e.clientX - r.left;
        const y = e.clientY - r.top;
        card.style.setProperty("--mx", `${x}px`);
        card.style.setProperty("--my", `${y}px`);
        if (!reduceMotion) {
          const rx = ((y / r.height) - 0.5) * -6;
          const ry = ((x / r.width) - 0.5) * 6;
          card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg)`;
        }
      });
      card.addEventListener("pointerleave", () => { card.style.transform = ""; });
    });
  } else {
    glow.remove();
  }

  // Starfield canvas
  const canvas = document.getElementById("stars");
  const ctx = canvas.getContext("2d");
  let stars = [];
  let mouse = { x: 0, y: 0 };
  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = canvas.offsetHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.floor((canvas.offsetWidth * canvas.offsetHeight) / 9000);
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.offsetWidth,
      y: Math.random() * canvas.offsetHeight,
      r: Math.random() * 1.4 + 0.2,
      d: Math.random() * 0.6 + 0.2,
      t: Math.random() * Math.PI * 2,
    }));
  };
  const draw = () => {
    ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
    for (const s of stars) {
      s.t += 0.02;
      const ox = mouse.x * s.d * 20;
      const oy = mouse.y * s.d * 20;
      ctx.globalAlpha = 0.35 + Math.sin(s.t) * 0.3;
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.arc(s.x + ox, s.y + oy, s.r, 0, Math.PI * 2);
      ctx.fill();
    }
    if (!reduceMotion) requestAnimationFrame(draw);
  };
  window.addEventListener("resize", resize);
  window.addEventListener("pointermove", (e) => {
    mouse.x = e.clientX / window.innerWidth - 0.5;
    mouse.y = e.clientY / window.innerHeight - 0.5;
  }, { passive: true });
  resize();
  draw();

  // Work filters
  const filters = document.querySelectorAll(".filter");
  const projects = document.querySelectorAll(".project");
  filters.forEach((btn) => btn.addEventListener("click", () => {
    filters.forEach((b) => b.classList.toggle("is-active", b === btn));
    const f = btn.dataset.filter;
    projects.forEach((p) => {
      const show = f === "all" || p.dataset.cat === f;
      p.classList.toggle("is-hidden", !show);
      p.classList.toggle("project--lg", f === "all" && p.hasAttribute("data-was-lg"));
    });
  }));
  projects.forEach((p) => p.classList.contains("project--lg") && p.setAttribute("data-was-lg", ""));

  // Testimonials slider
  const quotes = document.querySelectorAll(".quote");
  const dots = document.querySelectorAll(".dot");
  let q = 0;
  const show = (i) => {
    q = i;
    quotes.forEach((el, n) => el.classList.toggle("is-active", n === i));
    dots.forEach((el, n) => el.classList.toggle("is-active", n === i));
  };
  dots.forEach((d, i) => d.addEventListener("click", () => { show(i); restart(); }));
  let timer;
  const restart = () => {
    clearInterval(timer);
    if (!reduceMotion) timer = setInterval(() => show((q + 1) % quotes.length), 6000);
  };
  restart();

  // Pricing toggle
  const billing = document.getElementById("billing");
  billing.addEventListener("click", () => {
    const monthly = billing.getAttribute("aria-checked") !== "true";
    billing.setAttribute("aria-checked", String(monthly));
    document.querySelectorAll("[data-once]").forEach((el) => {
      el.textContent = monthly ? el.dataset.monthly : el.dataset.once;
      const unit = el.nextElementSibling;
      if (unit) unit.textContent = monthly ? "USD / mo" : "USD";
    });
  });

  // Contact form (front-end only — hook up to a backend/form service to receive messages)
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;
    form.querySelectorAll("[required]").forEach((field) => {
      const ok = field.type === "email" ? /^\S+@\S+\.\S+$/.test(field.value) : field.value.trim() !== "";
      field.classList.toggle("is-invalid", !ok);
      if (!ok) valid = false;
    });
    status.classList.toggle("is-error", !valid);
    if (!valid) { status.textContent = "Please fill in all fields with a valid email."; return; }
    status.textContent = "Thanks! Your message has been sent — we'll reply within 24 hours. ✦";
    form.reset();
  });
})();
