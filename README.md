# George Bakhanyiselwa Nguwe Bawo NPC (GBNB) — Website

Live site: **https://bakhanyiselwa.web.app**
Motto: *"Yizani Sakhe Udonga Lwe Jerusalem"* — Guided by Faith, United in Purpose.

Faith-based nonprofit website built with **React 18 + TypeScript + TailwindCSS + Firebase** (Firestore, Auth, Storage, Hosting). Firebase plan: **Spark (free)** — hosting + forms work fully; Cloud Functions outbound calls (AI) require Blaze.

## Pages & Routes

| Route | Page | Notes |
|---|---|---|
| `/` | Home | Hero, stats (Years of Service auto = `currentYear − 2023`), announcements incl. calendar card linking to `/calendar`, programs preview, testimonials preview |
| `/about` | About Us | Mission, vision, timeline |
| `/programs` | Programs | Faith & Worship, Coding & Robotics, Intro to AI, Generative AI, Digital Literacy, Web Dev, Psycho-Soul Therapy, Community Development + impact stats |
| `/gallery` | Gallery | Category filter, photo submission form, testimonials section (`/gallery#testimonials`) |
| `/calendar` | Calendar | Zoho WorkDrive monthly preview (fully responsive `clamp(480px, 78vh, 880px)`), Option 1 ZIP + Option 2 single-file download instructions |
| `/get-involved` | Get Involved | Volunteer form, Donation form (FNB bank details), Partnership via JotForm |
| `/contact` | Contact | Contact form, contact cards, map, social links |
| `/thank-you` | Thank You | Post-submit landing, auto-redirects home after 5s |
| `/admin` | Admin dashboard | Protected, role-based (admin/editor) |

## Forms (validate → Firestore → email → redirect)

All forms validate required fields, save to Firestore, email **info.gbnb@gmail.com** via **Web3Forms** (browser POST — Spark-safe), show a success alert, then redirect to `/thank-you`.

| Form | Firestore collection | Web3Forms env key |
|---|---|---|
| Volunteer | `volunteers` | `REACT_APP_WEB3FORMS_VOLUNTEER_KEY` |
| Donation | `donations` | `REACT_APP_WEB3FORMS_DONATION_KEY` |
| Contact | `contact_submissions` | `REACT_APP_WEB3FORMS_CONTACT_KEY` |
| Photo Submission | `photo_submissions` (+ Storage image) | `REACT_APP_WEB3FORMS_PHOTO_KEY` |

Keys live in `.env` (gitignored, values documented in `.env.example`); `emailService.ts` falls back to built-in keys per form. Set each form's recipient + redirect (`https://bakhanyiselwa.web.app/thank-you`) + design in the Web3Forms dashboard.

## Simbot — AI Chat Assistant

Floating widget (`src/components/Chatbot.tsx`), brand color **#1800ad**, custom icons (`public/simbot_ai_icon_outline.png`, `public/simbot_ai_icon.png`).
Text-only customer-agent bot grounded in a site system prompt (motto, programs, calendar, contacts, WhatsApp escalation). Live replies via `assistantProxy` Cloud Function → Hugging Face; rule-based fallbacks answer offline.
**Spark note:** functions can't reach Hugging Face on Spark (outbound limited to Google) — fallbacks reply until you upgrade to Blaze + set `firebase functions:config:set huggingface.key`.

## Header / Footer / SEO

- **Translate button in navbar** (free Google Translate widget, Spark-safe): EN + 9 SA languages (af, zu, xh, st, tn, nso, ve, ts, ss) + fr/pt/es. Icon-only on very small screens.
- **Footer:** `© 2023–{auto year}` + live **CAT** clock (`Africa/Johannesburg`), social icons (Facebook, TikTok, YouTube), map, quick links.
- **SEO:** React Helmet per page, canonical + hreflang (en/xh/zu/af/x-default), Open Graph + Twitter cards, JSON-LD (NonProfit, Organization, FAQ, WebSite, Breadcrumb, Event on Calendar), `robots.txt` + `sitemap.xml` (incl. `/calendar`), GA + GTM.

## Project Structure

```
src/
  components/  Navbar, Footer, Chatbot, GoogleTranslate, Captcha, AdminProtectedRoute, ...
  pages/       Home, About, Programs, Gallery, Calendar, GetInvolved, Contact, ThankYou, Admin, FirebaseSetup
  services/    firebase, assistantService (emulator auto on localhost), emailService (Web3Forms), database
  contexts/    AuthContext (info.gbnb@gmail.com = auto-admin)
  data/        testimonials
functions/     assistantProxy callable + triggers (needs Blaze to deploy/call HF)
public/        index.html (SEO), robots.txt, sitemap.xml, logos, simbot icons
```

## Run Locally

```bash
npm install
npm start            # http://localhost:3000
npm run dev          # app + functions emulator (needs firebase-tools)
```

Admin test: open `/admin`, sign in with `info.gbnb@gmail.com` (self-assigns admin on first login); others get `editor`. Promote via `users` collection `role: 'admin'`. Add `localhost` to Firebase Auth authorized domains if login fails. Localhost uses production Firestore, so test submissions are real — use test data.

## Deploy (Spark — hosting only)

```bash
GENERATE_SOURCEMAP=false npm run build
firebase deploy --project bakhanyiselwa --only hosting
```

Functions (Blaze only):
```bash
firebase functions:config:set huggingface.key="hf_NEW_ROTATED_TOKEN"
firebase deploy --project bakhanyiselwa --only functions
```

## Contact

- Phone/WhatsApp: +27 785 78 6134 / https://wa.me/27785786134
- Email: info.gbnb@gmail.com
- Facebook: https://www.facebook.com/GeorgeBakhanyiselwaNguweBawo/
- TikTok: https://www.tiktok.com/@georgebakhanyiselwanguwe
- YouTube: https://www.youtube.com/@GeorgeBakhanyiselwaNguweBawo

---
Built with ❤️ by Simthandile Mthwesi — "Yizani Sakhe Udonga Lwe Jerusalem"
