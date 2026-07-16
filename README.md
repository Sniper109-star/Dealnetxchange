# Dealnetxchange

A Next.js (App Router) investment platform template with a **mobile-first** UI/UX:
marketing pages, authentication, a user dashboard (investments, deposits,
withdrawals, profile), and an admin panel.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **UI:** React 19, Tailwind CSS v4
- **Language:** TypeScript
- **Package manager:** Bun

## Getting Started

```bash
# 1. Install dependencies
bun install

# 2. Configure environment (optional for local dev)
cp .env.example .env.local

# 3. Run the dev server
bun dev
```

Open [http://localhost:3000](http://localhost:3000).

### Demo Accounts

| Role   | Email                       | Password   |
| ------ | --------------------------- | ---------- |
| Client | client@dealnetxchange.com   | client123  |
| Admin  | admin@dealnetxchange.com    | admin123   |

## Scripts

| Command           | Description                |
| ----------------- | -------------------------- |
| `bun dev`         | Start dev server           |
| `bun build`       | Production build           |
| `bun start`       | Run production server      |
| `bun lint`        | Lint with ESLint           |
| `bun typecheck`   | Type-check with `tsc`      |

## Mobile-First UX

- Sticky responsive header with a slide-in mobile drawer (scroll locked while open).
- Dashboard switches from a desktop sidebar to a fixed **bottom navigation bar** on mobile.
- Responsive grids, 16px base font inputs (prevents iOS zoom), and safe-area padding for notched devices.
- Admin user table collapses into cards on small screens.

## Project Structure

```
src/
  app/                 # Routes (pages, API, dashboard, admin)
  components/          # Shared UI (Header, Footer, dashboard components)
  lib/                 # Site config, auth, in-memory db
  middleware.ts        # Route protection
```

## Environment

Copy `.env.example` to `.env.local` to override defaults. See the file for
available variables.
