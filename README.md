# durbaan.com

The website for **Durbaan**, a Somali impact communications and data studio. *Your impact, heard.*

Built with Next.js 15 (App Router, TypeScript, React Server Components), Tailwind CSS and MDX content validated with Zod. Every page is statically generated; only the form handlers run on the server.

## Run it

```bash
npm install
```

```bash
cp .env.example .env.local
```

```bash
npm run dev
```

`npm run build` syncs portfolio media, checks the copy for em dashes, and builds.

## Draft and sample content

Anything marked `draft: true` (sample case studies, sample films, the sample testimonial, sample client names, the draft article) shows with an amber **Sample content** badge in development, and is **never shown in production**. Draft pages return 404 in production.

To preview drafts on a deployed preview, set `NEXT_PUBLIC_SHOW_DRAFTS=1` (robots.txt then blocks indexing). Never set it in production.

Sections with nothing real to show hide themselves: featured work, films, the testimonial, the client logo strip, the "experience" strip and the capabilities statement.

## Settings (environment variables)

| Variable | What it does | If empty |
| --- | --- | --- |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp Business number, digits only (e.g. `2526...`) | All WhatsApp buttons are hidden |
| `NEXT_PUBLIC_BOOKING_URL` | Cal.com or Calendly link. Cal.com links are embedded on `/contact#book` | "Book a call" goes to the contact page |
| `NEXT_PUBLIC_LINKEDIN_URL` | LinkedIn page | Hidden |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Enables Plausible analytics and conversion events | No analytics |
| `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` | Form delivery by email | Dev: logged to console. Production: visitor is asked to email directly |
| `RESEND_AUDIENCE_ID` | Newsletter list in Resend | Sign-ups are emailed to you instead |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile spam check | Honeypot only |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL | `https://durbaan.com` |

Analytics events: `Form Submit`, `Guide Download`, `WhatsApp Click`, `Booking Click`, `Film Play`, `Newsletter Signup`.

## Adding a case study

```bash
npm run new-case-study
```

This creates `content/work/[slug]/index.mdx` and a `media/` folder. Then:

1. Put `hero.jpg` (landscape, 2400 px wide) and gallery images in `media/`.
2. Fill in the text. Add `results` **only** for confirmed numbers.
3. Confirm consent (`consentConfirmed: true`). The build fails if media includes people without confirmed consent.
4. Set `draft: false`.

No code changes are needed. Images are optimised, and **all metadata including GPS location is stripped**, by `npm run media`.

Films: add `content/films/[slug].mdx` (see the sample files for fields) and an optional poster in `content/films/media/`. Full films live on YouTube or Vimeo; the site only loads the player when someone presses play.

## Changing prices and packages

Everything is in `content/packages.json`. Change a price once and every page updates. `offers.[line].priceDisplay` switches an offer line between `"from"` (Starting from X USD) and `"on-request"`.

## Other content

| File | What |
| --- | --- |
| `content/testimonials.json` | Testimonials (with permission) |
| `content/clients.json` | Logo strip. Only entries with `permission: true` are shown |
| `content/experience.json` | Funders and implementers for the Impact page, confirmed names only |
| `content/team/*.json` | Team members (add `photo` path when ready) |
| `content/resources/*.mdx` | Articles |
| `content/faq.ts`, `content/offers.ts`, `content/pillars.ts` | FAQ, offer lines and service pillars |
| `public/downloads/donor-ready-guide.pdf` | Lead magnet PDF. Until it exists, requests are emailed to you to send by hand |
| `public/downloads/durbaan-capabilities-statement.pdf` | Enterprise download. The section appears once the file exists |

## Still needed from the owner (PRD section 15)

- WhatsApp Business number and booking link
- Real case studies (aim for six), testimonials and client logos, each with written permission
- Founder photo and team details
- The lead magnet PDF (or approval for Claude to draft it from the article in `content/resources/`)
- Company registration details for the capabilities statement
- Review of `/privacy` and `/terms` by someone qualified
- Approval of the draft article, then set `draft: false`

## Not built yet

- Somali version (`next-intl`) is phase 2. Copy is centralised in `content/` to make that straightforward.
- Automatic blurring of children's faces is not possible without a vision model; it is handled by the consent check and by editorial review.
- PRD phase 2 features: Donor-Ready Check, live sample dashboard, client portal, proposal builder.
