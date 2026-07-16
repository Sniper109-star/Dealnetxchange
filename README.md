# Dealnetxchange

> Digital solutions for blockchain investors — a Next.js investment platform template
> with a **mobile-first** UI/UX, authentication, a client dashboard, and an admin panel.

Dealnetxchange is a full-stack demo application that showcases a typical
investment/fintech product surface: marketing pages, account auth, investment
plans, deposits & withdrawals, user profiles, and an admin review console. It is
built as a clean, portable Next.js template you can fork and extend.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Environment Variables](#environment-variables)
- [Authentication & Sessions](#authentication--sessions)
- [API Reference](#api-reference)
- [Data Model](#data-model)
- [Mobile-First UX](#mobile-first-ux)
- [Deployment](#deployment)
- [Security Notes](#security-notes)
- [License](#license)

---

## Features

- **Marketing site** — home, about, services, contact, FAQ, legal, investors,
  KYC, and terms pages with a shared header/footer and a slide-in mobile drawer.
- **Authentication** — sign up, log in, log out with cookie-based sessions and
  route protection via middleware.
- **Client dashboard** — overview, investments (with progress meters), deposits,
  withdrawals, and editable profile. Optimized for mobile with a bottom nav bar.
- **Admin panel** — review pending deposits/withdrawals (approve/reject), browse
  users, and view all transactions. Role-gated.
- **Investment plans** — four seeded plans (Starter, Silver, Gold, Diamond) with
  percentage returns and durations.
- **Mobile-first design** — responsive grids, touch-friendly targets, safe-area
  padding, and a viewport-optimized layout.

---

## Tech Stack

| Layer          | Choice                                            |
| -------------- | ------------------------------------------------- |
| Framework      | [Next.js 16](https://nextjs.org/) (App Router)    |
| UI Library     | [React 19](https://react.dev/)                    |
| Styling        | [Tailwind CSS v4](https://tailwindcss.com/)       |
| Language       | [TypeScript](https://www.typescriptlang.org/) 5   |
| Package mgr    | [Bun](https://bun.sh/)                            |
| Data store     | In-memory store (`src/lib/db.ts`), seeded per cold start |
| Linting        | ESLint (Next.js config)                           |

---

## Project Structure

```
.
├── public/                     # Static assets (llms.txt, robots.txt)
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout (metadata + viewport)
│   │   ├── globals.css         # Tailwind v4 theme + utility helpers
│   │   ├── page.tsx            # Home / landing page
│   │   ├── about|services|contact|faq|legal|investors|kyc|terms/
│   │   ├── login/  signup/     # Auth pages
│   │   ├── dashboard/          # Client area (overview, investments, deposits, withdrawals, profile, admin)
│   │   └── api/                # Route handlers (auth, data, admin, contact)
│   ├── components/
│   │   ├── Header.tsx  Footer.tsx  Logo.tsx  PageHero.tsx  LegalPage.tsx
│   │   └── dashboard/          # Sidebar, forms, TxActions, ProgressMeter
│   ├── lib/
│   │   ├── site.ts             # Site config (name, email, address, nav)
│   │   ├── db.ts               # In-memory data store + types + seed
│   │   └── auth.ts             # Session cookie encode/decode + getSessionUser()
│   └── middleware.ts           # Protects /dashboard/*, role-gates admin
├── .github/workflows/ci.yml    # CI: typecheck + lint + build
├── .env.example                # Example environment variables
├── next.config.ts
├── tailwind.config (via PostCSS)
├── tsconfig.json
└── package.json
```

---

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (recommended) — Node.js 18+ also works with `npm`.

### Local development

```bash
# 1. Clone the repository
git clone https://github.com/Sniper109-star/Dealnetxchange.git
cd Dealnetxchange

# 2. Install dependencies
bun install

# 3. Configure environment (optional for local dev)
cp .env.example .env.local

# 4. Start the dev server
bun dev
```

Open <http://localhost:3000> in your browser.

### Demo Accounts

The in-memory database is seeded with two accounts:

| Role   | Email                       | Password   |
| ------ | --------------------------- | ---------- |
| Client | `client@dealnetxchange.com` | `client123` |
| Admin  | `admin@dealnetxchange.com`  | `admin123` |

> ⚠️ Data is reset on every server restart because the store is in-memory.

---

## Scripts

| Command             | Description                             |
| ------------------- | --------------------------------------- |
| `bun dev`           | Start the development server            |
| `bun build`         | Create a production build               |
| `bun start`         | Run the production server               |
| `bun lint`          | Lint the codebase with ESLint           |
| `bun typecheck`     | Type-check with `tsc --noEmit`          |

Using npm instead of Bun: replace `bun` with `npm run` (e.g. `npm run dev`).

---

## Environment Variables

Copy `.env.example` to `.env.local` and adjust as needed. All variables are
optional for local development.

| Variable                | Description                                              |
| ----------------------- | -------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`  | Absolute site URL for metadata/links (default `http://localhost:3000`) |
| `SESSION_SECRET`        | Long random string used for session signing (placeholder) |
| `DATABASE_URL`          | Connection string for a real database (when wired up)    |

`.env*` files are gitignored; only `.env.example` is committed.

---

## Authentication & Sessions

- Sessions are stored in an `httpOnly`, `sameSite: lax` cookie
  (`dealnet_session`) containing a base64url-encoded JSON payload
  `{ userId, role }` (`src/lib/auth.ts`).
- `getSessionUser()` reads the cookie, decodes it, and resolves the user from
  the data store.
- `src/middleware.ts` protects `/dashboard/*` (redirects anonymous users to
  `/login` with a `?next=` param) and role-gates `/dashboard/admin`
  (non-admins are redirected to `/dashboard`). Authenticated users hitting
  `/login` or `/signup` are redirected to `/dashboard`.

---

## API Reference

All data endpoints require an authenticated session cookie.

### Auth

| Method | Endpoint                  | Body                              | Notes                          |
| ------ | ------------------------- | --------------------------------- | ------------------------------ |
| `POST` | `/api/auth/login`         | `{ email, password }`             | Sets session cookie on success |
| `POST` | `/api/auth/signup`        | `{ name, email, phone, password }` | Creates a client account       |
| `POST` | `/api/auth/logout`        | —                                 | Clears the session cookie      |

### Data (user-scoped)

| Method   | Endpoint                  | Body                                  | Notes                                  |
| -------- | ------------------------- | ------------------------------------- | -------------------------------------- |
| `GET`    | `/api/investments`        | —                                     | List the user's investments            |
| `POST`   | `/api/investments`        | `{ planId, amount }`                  | Validates balance & plan bounds        |
| `GET`    | `/api/deposits`           | —                                     | List the user's deposits               |
| `POST`   | `/api/deposits`           | `{ amount, method }`                  | Creates a `pending` deposit            |
| `GET`    | `/api/withdrawals`        | —                                     | List the user's withdrawals            |
| `POST`   | `/api/withdrawals`        | `{ amount, wallet? }`                 | Creates a `pending` withdrawal         |
| `PATCH`  | `/api/profile`            | `{ wallet?, country? }`               | Updates the user's wallet/country      |

### Admin (role-gated)

| Method   | Endpoint            | Body                                               | Notes                                          |
| -------- | ------------------- | -------------------------------------------------- | ---------------------------------------------- |
| `GET`    | `/api/admin`        | —                                                  | Returns users, deposits, withdrawals, investments |
| `PATCH`  | `/api/admin`        | `{ type: "deposit"\|"withdrawal", id, action: "approved"\|"rejected" }` | Approves/rejects a pending tx; adjusts balance |

### Public

| Method   | Endpoint            | Body                              | Notes                          |
| -------- | ------------------- | -------------------------------- | ------------------------------ |
| `POST`   | `/api/contact`      | `{ name, email, phone, message? }` | Validates name/email/phone     |

---

## Data Model

Defined in `src/lib/db.ts`:

- **User** — `id, name, email, password, role, balance, wallet, country, createdAt`
- **Investment** — `id, userId, planId, amount, returnAmount, status, startedAt, endsAt`
- **Deposit** — `id, userId, amount, method, status, createdAt`
- **Withdrawal** — `id, userId, amount, wallet, status, createdAt`
- **Plan** — `id, name, percent, durationHours, min, max`

Plans:

| Plan     | Return | Duration | Min (USD) | Max (USD) |
| -------- | ------ | -------- | --------- | --------- |
| Starter  | 15%    | 24h      | 1,000     | 5,000     |
| Silver   | 30%    | 24h      | 5,000     | 10,000    |
| Gold     | 60%    | 48h      | 10,000    | 50,000    |
| Diamond  | 100%   | 42h      | 50,000    | Unlimited |

---

## Mobile-First UX

- **Header** — sticky on scroll; a hamburger opens a full-height slide-in
  drawer with a backdrop. Body scroll is locked while the drawer is open. Login
  / Sign Up actions are duplicated inside the drawer for thumb reach.
- **Dashboard navigation** — on `md+` screens a left **sidebar** is shown; on
  small screens a fixed **bottom navigation bar** appears (Home, Invest,
  Deposit, Withdraw, Profile, and Admin for admins). Page content gains bottom
  padding (`pb-24`) so it isn't obscured by the bar.
- **Responsive layout** — grids default to a single column and step up at
  `sm`/`md`/`lg` breakpoints; the admin users table collapses into stacked
  cards on mobile.
- **Touch & ergonomics** — inputs use a 16px font size to prevent iOS zoom on
  focus; tap targets are ≥ 44px where practical; `env(safe-area-inset-bottom)`
  padding keeps the bottom nav clear of device home indicators.
- **Viewport** — `viewport` export in `layout.tsx` sets `width=device-width`,
  `initial-scale=1`, and a theme color.

---

## Deployment

The app is a standard Next.js project and deploys to any Node.js hosting
(Vercel, Netlify, Railway, a VPS, etc.).

```bash
bun install
bun run build
bun run start
```

A GitHub Actions workflow (`.github/workflows/ci.yml`) runs `typecheck`, `lint`,
and `build` on every push/PR to `main`.

> Note: Because the data store is in-memory, each server instance starts fresh
> with seed data. For persistence, swap `src/lib/db.ts` for a real database and
> wire `DATABASE_URL`.

---

## Security Notes

This is a **demo template**, not production-hardened:

- Passwords are stored in plaintext in the seed data and compared directly.
- Session tokens are base64url-encoded JSON (not signed/encrypted). Use a signed
  session (e.g. `jose` / IronSession) and hashed passwords (e.g. `bcrypt`) in
  production.
- The in-memory store resets on restart — replace with a persistent database.

---

## License

This project is provided as a template for educational and demonstration
purposes.
