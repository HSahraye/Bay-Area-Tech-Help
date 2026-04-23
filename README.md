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

## AI troubleshooting chatbot setup

The site includes a global "Troubleshooting Help" chatbot that uses the OpenAI API through a secure server route.

### Required environment variables

Create `.env.local` in the project root:

```bash
OPENAI_API_KEY=your_openai_api_key_here
# Optional override:
OPENAI_CHAT_MODEL=gpt-4.1-mini
```

- `OPENAI_API_KEY` is required and must stay server-side only.
- `OPENAI_CHAT_MODEL` is optional for easy model swaps later.

### Where chatbot behavior is configured

- System prompt and behavior guardrails: `lib/chatbot-prompt.ts`
- Troubleshooting knowledge base topics: `lib/chatbot-knowledge.ts`
- OpenAI server route: `app/api/chatbot/route.ts`
- Floating UI component: `components/chatbot/troubleshooting-chatbot.tsx`

### How to add/edit troubleshooting topics

Update `TROUBLESHOOTING_TOPICS` in `lib/chatbot-knowledge.ts`:

- `title`
- `symptoms`
- `firstSteps`
- `escalationSignals`
- `recommendedPackage`

This v1 is intentionally local/config-driven so it can be upgraded to retrieval/RAG later.

### Local testing checklist

1. Run `npm run dev`.
2. Open any page and launch "Troubleshooting Help".
3. Test starter prompts and verify responses stream back.
4. Verify escalation actions:
   - Book Quick Fix
   - Book Home Tech Setup
   - Book VIP Home Tech Day
   - Call Now / Text for Fast Reply
5. Confirm lead capture fallback appears for unresolved/complex issues.
6. Run `npm run lint` and `npm run build`.

### Production notes (Netlify)

- Add `OPENAI_API_KEY` (and optional `OPENAI_CHAT_MODEL`) in Netlify environment variables.
- Redeploy after saving variables.
- Verify chatbot on live pages and check function logs for `/api/chatbot` if needed.

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
