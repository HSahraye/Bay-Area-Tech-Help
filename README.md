# Bay Area Tech Help - Master Editing Guide

This is the main guide for editing the website, even if you are not a programmer.

If you only read one file, read this one.

---

## 1) What this project is

- Website framework: Next.js
- Styling: Tailwind CSS
- Main pages:
  - Home: `/`
  - About: `/about`
  - Booking: `/book`
- Hosting: Netlify
- Chatbot: OpenAI API (server-side)

---

## 2) Before you edit anything

### Requirements (one-time setup)

- Install Node.js (LTS)
- Open this project folder in Cursor

### Start the site locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

### Check that code is healthy before deploy

```bash
npm run lint
npm run build
```

If both commands pass, your changes are safe to push/deploy.

---

## 3) Most common edits (quick index)

If you want to change:

- Homepage text/cards/testimonials/FAQs:
  - Edit `app/page.tsx`
- About page text:
  - Edit `app/about/page.tsx`
- Shared global business settings (header/footer/contact links):
  - Edit `lib/site-data.ts`
- Booking package titles/durations/prices/best-for text:
  - Edit `lib/booking-services.ts`
- Calendly links for each package:
  - Edit `lib/booking-services.ts`
- Homepage section wording/layout:
  - Edit `app/page.tsx`
- About page wording/layout:
  - Edit `app/about/page.tsx`
- Booking page wording/layout:
  - Edit `components/booking/booking-page-content.tsx`
- Header/nav:
  - Edit `components/ui/site-header.tsx`
- Footer:
  - Edit `components/ui/site-footer.tsx`
- Global colors/spacing/button styles:
  - Edit `app/globals.css`
- Chatbot behavior rules:
  - Edit `lib/chatbot-prompt.ts`
- Chatbot troubleshooting topics:
  - Edit `lib/chatbot-knowledge.ts`

---

## 4) Full file map (what each file does)

## Root config files

- `package.json`
  - Scripts and dependencies
- `package-lock.json`
  - Auto-generated dependency lock file
- `next.config.mjs`
  - Next.js config
- `tailwind.config.ts`
  - Tailwind theme (brand colors, shadows, etc.)
- `postcss.config.mjs`
  - Tailwind/PostCSS pipeline
- `tsconfig.json`
  - TypeScript config
- `.env.example`
  - Example env vars
- `.env.local`
  - Real local secrets (gitignored, never commit)
- `.gitignore`
  - Ignored files list

## App routes

- `app/layout.tsx`
  - Global HTML shell
  - Loads global CSS
  - Includes global chatbot
  - Includes Google tag snippet
- `app/page.tsx`
  - Homepage content
- `app/about/page.tsx`
  - About page content
- `app/book/page.tsx`
  - Booking route wrapper (with suspense)
- `app/api/chatbot/route.ts`
  - Server API endpoint for chatbot (OpenAI call)

## Shared UI components

- `components/ui/site-header.tsx`
  - Top navigation and main header actions
- `components/ui/site-footer.tsx`
  - Footer links/info
- `components/ui/cta-buttons.tsx`
  - Reusable call/text button cluster
- `components/ui/section-heading.tsx`
  - Reusable section title + subtitle block
- `components/ui/info-card.tsx`
  - Reusable icon card sections
- `components/ui/theme-select.tsx`
  - Theme selector control

## Booking components

- `components/booking/booking-page-content.tsx`
  - Main booking page UX, service selection, policy/trust blocks
- `components/booking/calendly-embed.tsx`
  - Calendly embed loading, fallback behavior

## Chatbot component

- `components/chatbot/troubleshooting-chatbot.tsx`
  - Floating chat launcher + chat UI + lead capture fallback

## Business/config data

- `lib/site-data.ts`
  - Shared global business settings used across multiple pages/components
- `lib/booking-services.ts`
  - Booking package config and Calendly URLs
- `lib/chatbot-knowledge.ts`
  - Structured troubleshooting topic knowledge base
- `lib/chatbot-prompt.ts`
  - Chatbot system prompt and guardrails

---

## 5) Edit guide by task (non-technical steps)

## A) Change shared business phone, email, address, service area

1. Open `lib/site-data.ts`
2. Update:
   - `PHONE_NUMBER`
   - `PHONE_TEL`
   - `SUPPORT_EMAIL`
   - `OFFICE_LOCATION`
   - `OFFICE_HOURS`
   - `SERVICE_AREA`
3. Save file and refresh browser

## B) Change package prices or descriptions

1. Open `app/page.tsx` and edit `HOME_PACKAGES` (homepage package card text)
2. Open `lib/booking-services.ts` and edit booking-specific fields:
   - `shortDescription`
   - `duration`
   - `priceDisplay`
   - `bestFor`
3. Save and refresh

Note: Keep package names consistent across both files (`Quick Fix`, `Home Tech Setup`, `VIP Home Tech Day`).

## C) Change Calendly links

1. Open `lib/booking-services.ts`
2. Update:
   - `QUICK_FIX_CALENDLY_URL`
   - `HOME_SETUP_CALENDLY_URL`
   - `VIP_DAY_CALENDLY_URL`
3. Save and test:
   - `/book?service=quick-fix`
   - `/book?service=home-tech-setup`
   - `/book?service=vip-home-tech-day`

## D) Change homepage text/sections

1. Open `app/page.tsx`
2. Edit the top local constants:
   - `HOME_PACKAGES`
   - `HOME_COMMON_ISSUES`
   - `HOME_HIGHLIGHTS`
   - `HOME_HOW_IT_WORKS`
   - `HOME_TRUST_POINTS`
   - `HOME_TESTIMONIALS`
   - `HOME_FAQS`
3. Edit any direct text in the JSX section blocks if needed
4. Save and refresh

## E) Change About page text

1. Open `app/about/page.tsx`
2. Edit the top About constants:
   - `ABOUT_BUSINESS_NAME`
   - `ABOUT_SERVICE_AREA`
   - `ABOUT_SUPPORT_EMAIL`
   - `ABOUT_PHONE_NUMBER`
3. Save and refresh

## F) Update chatbot troubleshooting topics

1. Open `lib/chatbot-knowledge.ts`
2. Add/edit entries in `TROUBLESHOOTING_TOPICS`
3. Each topic supports:
   - `title`
   - `symptoms`
   - `firstSteps`
   - `escalationSignals`
   - `recommendedPackage`
4. Save and test in chat widget

## G) Change chatbot personality/rules

1. Open `lib/chatbot-prompt.ts`
2. Edit `CHATBOT_SYSTEM_PROMPT`
3. Save and test with different user questions

---

## 6) Environment variables (important)

Create `.env.local` in project root:

```bash
OPENAI_API_KEY=your_real_openai_key
OPENAI_CHAT_MODEL=gpt-4.1-mini
```

Rules:

- Never commit `.env.local`
- Never paste keys into code files
- Rotate keys if accidentally exposed

---

## 7) Netlify production setup

In Netlify site settings, add:

- `OPENAI_API_KEY`
- `OPENAI_CHAT_MODEL` (optional, recommended)

Then redeploy.

If chatbot fails in production:

- Check Netlify function logs for `/api/chatbot`
- Confirm env vars are set for the same deploy context (Production)

---

## 8) How to safely deploy changes

Standard flow:

```bash
git add .
git commit -m "Your message"
git push origin main
```

Netlify will build/deploy automatically from `main`.

---

## 9) Emergency fixes / common issues

## Issue: site looks unstyled (raw HTML look)

Run:

```bash
pkill -f "next dev"
rm -rf .next
npm run dev
```

Then hard refresh browser (`Cmd + Shift + R`).

## Issue: booking embed shows Calendly header/404 only

- Calendly URL is invalid or wrong slug.
- Fix URLs in `lib/booking-services.ts`.

## Issue: chatbot says temporarily unavailable

- Check OpenAI quota/billing
- Confirm `OPENAI_API_KEY` is set correctly
- Check server logs

---

## 10) Editing rules for non-programmers

- For page content edits, start in page files first (`app/page.tsx`, `app/about/page.tsx`)
- Use `lib/` files for shared global settings and integrations
- Avoid editing config files unless needed
- After every change:
  1. Save
  2. Refresh browser
  3. Run `npm run lint`
  4. Run `npm run build` before deploy

---

## 11) If you want to hand this off

Tell the next person:

- Start with `README.md` (this file)
- Most business edits are in:
  - `app/page.tsx`
  - `app/about/page.tsx`
  - `lib/site-data.ts`
  - `lib/booking-services.ts`
  - `lib/chatbot-knowledge.ts`
- Run lint/build before every deploy

---

## 12) Quick command cheat sheet

```bash
# Install dependencies
npm install

# Start local development
npm run dev

# Quality checks
npm run lint
npm run build

# Start production build locally
npm run start
```
