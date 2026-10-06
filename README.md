# Nova Studio — Website

A fast, modern, fully responsive single-page website. Pure HTML, CSS and JavaScript — no build step.

## Run it
Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
```

## Features
- Animated starfield hero with glowing orbs and a rotating headline
- Sticky glass navigation with mobile menu
- Services cards with spotlight + 3D tilt hover
- Filterable portfolio grid
- Animated process timeline and stat counters
- Auto-rotating testimonials
- Pricing with one-off / monthly toggle
- FAQ accordion and validated contact form
- Respects `prefers-reduced-motion`, keyboard accessible

## Customise
- Brand name, copy and contact details: `index.html`
- Colours and fonts: CSS variables at the top of `styles.css`
- The contact form is front-end only — connect it to a form service (e.g. Formspree) or your backend to receive messages.
