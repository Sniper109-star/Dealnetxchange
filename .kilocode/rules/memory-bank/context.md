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
- [x] **Full-stack dashboard** added: auth (cookie sessions), API routes, client dashboard + admin panel
- [x] `bun typecheck`, `bun lint`, and `bun run build` all pass; runtime smoke-tested
- [x] Committed and pushed to `main`

## Current Structure
| File/Directory | Purpose |
|----------------|---------|
| `src/app/page.tsx` | Home page |
| `src/app/layout.tsx` | Root layout (system font stack, Dealnetxchange metadata) |
| `src/app/globals.css` | Tailwind v4 theme + utility classes |
| `src/components/Header.tsx`, `Footer.tsx`, `Logo.tsx`, `PageHero.tsx`, `LegalPage.tsx` | Marketing site components |
| `src/lib/site.ts` | Site config (name, email, nav) |
| `src/lib/db.ts` | In-memory data store (users, investments, deposits, withdrawals, PLANS) + seed data |
| `src/lib/auth.ts` | Session cookie encode/decode + `getSessionUser()` |
| `src/middleware.ts` | Protects `/dashboard/*`, role-gates `/dashboard/admin`, redirects authed away from login/signup |
| `src/app/api/auth/{login,signup,logout}` | Auth endpoints |
| `src/app/api/{investments,deposits,withdrawals,profile,admin}` | Data endpoints |
| `src/app/dashboard/layout.tsx` + `page.tsx` | Client dashboard shell + overview |
| `src/app/dashboard/{investments,deposits,withdrawals,profile}` | Client feature pages |
| `src/app/dashboard/admin/{layout,page}` | Admin panel (role-gated) |
| `src/components/dashboard/*` | Dashboard client components (Sidebar, forms, TxActions, ProgressMeter) |

## Notes / Decisions
- **No external database**: in-memory store in `src/lib/db.ts` (seeded each cold start). Restarts reset data — acceptable for demo.
- Demo accounts: client@dealnetxchange.com / client123 · admin@dealnetxchange.com / admin123
- Sessions are base64url-encoded JSON in an httpOnly cookie (not cryptographically signed — fine for demo, NOT for production).
- Used a system font stack (Google Fonts unreachable in sandbox).
- `Date.now()` in render is avoided in server components; progress bar moved to a client component (`ProgressMeter`) with `eslint-disable` for the purity rule.

## Session History
| Date | Changes |
|------|---------|
| Initial | Template created with base setup |
| 2026-07-15 | Cloned vintageguarantee.com design, rebranded to Dealnetxchange, built all pages |
| 2026-07-16 | Added full-stack dashboard: auth, API routes, client + admin panels; committed & pushed |
