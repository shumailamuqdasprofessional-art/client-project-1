# The Skin Edit by Empress Beauty Box — Website

Authentic Korean skincare, sourced from Canada — first time in Pakistan. Black, cream, taupe and gold striped brand theme. Pure HTML, CSS and JavaScript — no build step.

## Pages
- `index.html` — main shop page
- `coming-soon.html` — launch / waitlist page

## Run it
Open either file in a browser, or serve the folder:

```bash
python3 -m http.server 8000
```

## Main page features
- Hero with "Straight from Korea by Canada" message and product illustrations
- Six skincare series: Hydrating, Anti-Aging, Acne Care, Sunscreen, Brightening & Glowing, Sensitive Skin
- "Shop the series" tabs with 3 products each and an "Add to bag" counter
- 5-step K-beauty routine, "Why us", waitlist signup, FAQ

## Coming Soon page features
- Live countdown — shows a "We're live! Shop now" link when it ends
- Waitlist email signup (20% off at launch)
- Collection sneak peek, perks, falling petals, social links

## Customise
- Brand name, products, prices and copy: the HTML files
- Colours and fonts: CSS variables at the top of `styles.css`
- Launch date: `LAUNCH_DATE` at the top of `coming-soon.js`
- Series, products and prices: the `SERIES` list at the top of `script.js`
- **Placeholder content:** reviews, ratings and review counts are examples — replace them with real ones before going live.
- **Forms and bag are front-end only.** Connect the email forms to Mailchimp/Klaviyo/Formspree and the shop to Shopify or similar for real orders.
