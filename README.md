# salon@portfolio:~

Single-page developer portfolio for **Salon Raut** — ASP.NET Core / full-stack developer.
Built with Next.js (App Router) and TypeScript in a system-dashboard / server-log terminal aesthetic.

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- Plain CSS (`app/globals.css`) — no UI framework
- **JetBrains Mono** self-hosted via `next/font`
- **Nodemailer** for the contact form

## Getting started

```bash
npm install
cp .env.local.example .env.local   # then fill in SMTP_PASS
npm run dev                        # http://localhost:3000
```

## Contact form

`POST /api/contact` sends mail through Gmail SMTP. It needs three environment
variables in `.env.local` (never commit this file):

| variable | meaning |
| --- | --- |
| `SMTP_USER` | Gmail account that authenticates and sends |
| `SMTP_PASS` | 16-character [Google App Password](https://myaccount.google.com/apppasswords) — **not** your account password |
| `CONTACT_TO` | Inbox that receives the messages |

Requires 2-Step Verification on the Google account. Without these vars the route
returns `503` and the form reports that mail transport is unconfigured.

## Content

All résumé content (projects, roles, skills, request trace) lives in `lib/data.ts`,
so copy can be edited without touching components.

## Deploying

The contact route is server-rendered, so this needs a Node host (Vercel, Render,
Railway) — a static export would serve the page but break the form. Set the same
three environment variables in the host's dashboard.

## Scripts

```bash
npm run dev     # dev server
npm run build   # production build
npm start       # serve the production build
```
