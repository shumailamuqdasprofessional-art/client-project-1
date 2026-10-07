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
    el.style.transitionDelay = `${(i % 3) * 80}ms`;
    io.observe(el);
  });

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
