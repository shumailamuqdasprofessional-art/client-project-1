# Velora Skin — Website

A soft, elegant skincare brand website. Pure HTML, CSS and JavaScript — no build step.

## Pages
- `index.html` — main shop page
- `coming-soon.html` — launch / waitlist page

## Run it
Open either file in a browser, or serve the folder:

```bash
python3 -m http.server 8000
```

## Main page features
- Hero with CSS-drawn product bottles and floating ingredient tags
- Bestseller product cards with "Add to bag" and a bag counter
- Skin quiz: pick Dry / Oily / Combination / Sensitive to see a 3-step routine
- Hero ingredients, 4-step routine, brand promises, reviews
- Glow Club newsletter signup (10% off), FAQ, footer

## Coming Soon page features
- Live countdown — shows a "We're live! Shop now" link when it ends
- Waitlist email signup (20% off at launch)
- Collection sneak peek, perks, falling petals, social links

## Customise
- Brand name, products, prices and copy: the HTML files
- Colours and fonts: CSS variables at the top of `styles.css`
- Launch date: `LAUNCH_DATE` at the top of `coming-soon.js`
- Skin quiz routines: the `routines` object in `script.js`
- **Placeholder content:** reviews, ratings and review counts are examples — replace them with real ones before going live.
- **Forms and bag are front-end only.** Connect the email forms to Mailchimp/Klaviyo/Formspree and the shop to Shopify or similar for real orders.
