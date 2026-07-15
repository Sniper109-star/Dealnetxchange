# Active Context: Dealnetxchange

## Current State

**Status**: ✅ Built & pushed — full-stack Next.js site live on `main`

Cloned the structure/design of `vintageguarantee.com` and rebranded it to **Dealnetxchange**. The site is a Next.js 16 (App Router) + React 19 + Tailwind CSS 4 application with 15 routes, a shared header/footer, and a working contact API route.

## Recently Completed
- [x] Rebranded site name to Dealnetxchange (logo, nav, footer, metadata, content)
- [x] Global Tailwind v4 theme (brand/accent colors, buttons, containers)
- [x] Shared `Header` (desktop dropdowns + mobile menu) and `Footer` components
- [x] `Logo` component (text + gradient mark)
- [x] Home page: hero, intro, video/info, pricing plans, services, projects, testimonials, crypto converter, forex widget, contact CTA
- [x] Pages: About, Services, Contact (form → /api/contact), FAQ, Login, Sign Up, Legal, Investors Relation, KYC, Terms, 404
- [x] `bun typecheck`, `bun lint`, and `bun run build` all pass
- [x] Committed and pushed to `main`

## Current Structure
| File/Directory | Purpose |
|----------------|---------|
| `src/app/page.tsx` | Home page |
| `src/app/layout.tsx` | Root layout (system font stack, Dealnetxchange metadata) |
| `src/app/globals.css` | Tailwind v4 theme + utility classes |
| `src/components/Header.tsx` | Nav with dropdowns + mobile menu (client) |
| `src/components/Footer.tsx` | Site footer |
| `src/components/Logo.tsx` | Brand logo |
| `src/components/PageHero.tsx` | Reusable inner-page hero |
| `src/components/LegalPage.tsx` | Reusable legal/content page |
| `src/lib/site.ts` | Site config (name, email, nav) |
| `src/app/api/contact/route.ts` | Contact form POST endpoint |

## Notes / Decisions
- Used a **system font stack** instead of `next/font/google` (Arimo) because the sandbox cannot reach Google Fonts at build time.
- Images from the original site are represented with gradient placeholders (no external assets cloned).
- External widgets (Coinlib converter, TradingView forex) kept as iframes pointing to original URLs.

## Session History
| Date | Changes |
|------|---------|
| Initial | Template created with base setup |
| 2026-07-15 | Cloned vintageguarantee.com design, rebranded to Dealnetxchange, built all pages, committed & pushed |
