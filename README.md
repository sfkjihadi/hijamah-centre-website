# Al Sunnat Hijamah Centre

A responsive green, ivory, and gold website for Al Sunnat Hijamah Centre in Islamabad, Pakistan. It includes services, transparent PKR pricing, clinic and home appointment requests, female specialist enquiries, a Sunnah calendar, FAQs, Google Maps, social links, privacy information, and a medical disclaimer.

## Technologies and local use

The website uses semantic static HTML, CSS, and vanilla JavaScript. Netlify publishes `public/` directly with no build step. Netlify Forms stores appointment requests, and Netlify Image CDN serves the generated illustrative cupping photograph. The image does not depict the actual clinic. The development-only Google GenAI dependency was used to generate the static image; the deployed site does not use AI inference.

Use Node 22 or later and `pnpm install` for development dependencies. Run `netlify dev --dir public --port 8889` from the project directory to preview with Netlify features. A plain file preview cannot process bookings or Image CDN requests. Real Netlify form registration occurs during deployment.

## Appointments

The static form in `public/index.html` is detected during deployment. The activation marker is included. AJAX submissions POST URL-encoded data to `/` with `form-name=appointment`; no JavaScript falls back to native form submission and `/thank-you`. Submission success means receipt only, not a reserved appointment.

Centre staff should monitor the site's Netlify Forms dashboard and contact clients directly. No email recipient was supplied, so email notifications were not configured. WhatsApp and phone links provide direct booking alternatives. Do not add medical history fields or log personal details.

## Calendar

The centre supplied 29 October, 31 October, and 2 November in response to a request for verified dates. They are shown as 17th, 19th, and 21st lunar days respectively, with 2026 inferred from the October 2026 request context. The page attributes the schedule to the centre; no independent moon-sighting source or Islamic month name was supplied, and neither is invented. The two monthly grids show the supplied dates without computing or claiming verified lunar dates for other days. JavaScript identifies the schedule as archived after 2 November 2026. Update the schedule only with locally verified Pakistan dates, then update the archive threshold in `app.js`.

## Verification

Source review covered navigation targets, contact links, package selection, form fields and submission states, calendar controls, metadata, and responsive styles. Local runtime, browser, build, and live submission tests were not run because platform instructions reserve execution validation for the deployment pipeline. Verify a real end-to-end form submission in Netlify Forms after deployment before relying on intake. The map embed shows the Golra Railway Station area; the supplied exact centre location is linked separately.
