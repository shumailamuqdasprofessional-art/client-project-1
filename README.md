# The Skin Edit by Empress Beauty Box — Website

Authentic Korean skincare, sourced from Canada — first time in Pakistan. Sephora-style black and white striped theme. Pure HTML, CSS and JavaScript — no build step.

## Pages
- `index.html` — main shop page
- `coming-soon.html` — launch / waitlist page

## Run it
Open either file in a browser, or serve the folder:

```bash
python3 -m http.server 8000
```

## Main page features
- Opens with the "Coming Soon" hero: waitlist signup and the animated girl in a striped arch
- Big "Coming Soon" banner: first time in Pakistan, authentic supplier, 100% real products
- Six skincare series, each marked "Coming soon": Hydrating, Anti-Aging, Acne Care, Sunscreen, Brightening & Glowing, Sensitive Skin
- 5-step K-beauty routine, "Why us", waitlist signup, FAQ

## Coming Soon page features
- Waitlist email signup (20% off at launch)
- Collection sneak peek, perks, falling petals, social links

## Customise
- Brand name and copy: the HTML files
- Colours and fonts: CSS variables at the top of `styles.css`
- Series (shared by both pages): the `SERIES` list in `series.js`
- **Placeholder content:** reviews, ratings and review counts are examples — replace them with real ones before going live.
- **Forms and bag are front-end only.** Connect the email forms to Mailchimp/Klaviyo/Formspree and the shop to Shopify or similar for real orders.
