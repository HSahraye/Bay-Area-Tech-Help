# Bay Area Tech Help Landing Page

Conversion-focused, single-page Next.js + Tailwind site for a local home tech support business.

## Quick start

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build for production

```bash
npm run build
npm run start
```

## Customize business details

Update placeholder values in `lib/site-data.ts`:

- Business name
- Phone number + call/text links
- Service area
- Starting prices
- Testimonials

Also update URL values in:

- `app/layout.tsx` (`metadataBase`)
- `app/page.tsx` (`localBusinessSchema.url`)
