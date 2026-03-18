# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Structure

```text
artifacts-monorepo/
├── artifacts/              # Deployable applications
│   ├── api-server/         # Express API server
│   └── curiosity-project/  # The Curiosity Project nonprofit website (React + Vite)
├── lib/                    # Shared libraries
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks
│   ├── api-zod/            # Generated Zod schemas from OpenAPI
│   └── db/                 # Drizzle ORM schema + DB connection
├── scripts/                # Utility scripts
├── pnpm-workspace.yaml     # pnpm workspace
├── tsconfig.base.json      # Shared TS options
├── tsconfig.json           # Root TS project references
└── package.json            # Root package with hoisted devDeps
```

## The Curiosity Project — Nonprofit Website

Located at `artifacts/curiosity-project/`, this is the main web app at `/`.

### Features
- **4 Pages**: Home, About Us, Events, Contact
- **Interactive Stats Sidebar**: Visible on all pages with animated number counters for:
  - Students Served (4,820)
  - Active Volunteers (138)
  - Programs Running (12)
  - Communities Reached (27)
  - Hours of Instruction (18,650)
  - Years of Impact (8)
- **Events**: Upcoming & past events from DB with category badges, RSVP buttons
- **Contact Form**: Full form that saves messages to database
- **AI-generated images**: Hero, about page, etc.

### Frontend Libraries
- React + Vite, Wouter (routing), TailwindCSS
- framer-motion (animated counters), react-hook-form + @hookform/resolvers
- date-fns, clsx, tailwind-merge

### API Endpoints
- `GET /api/stats` — organization stats
- `GET /api/events` — list events (from DB)
- `POST /api/events` — create event
- `POST /api/contact` — submit contact message (saved to DB)

## TypeScript & Composite Projects

Every package extends `tsconfig.base.json` which sets `composite: true`. The root `tsconfig.json` lists all packages as project references.

## Root Scripts

- `pnpm run build` — runs `typecheck` first, then recursively runs `build` in all packages
- `pnpm run typecheck` — runs `tsc --build --emitDeclarationOnly` using project references

## Packages

### `artifacts/api-server` (`@workspace/api-server`)

Express 5 API server. Routes in `src/routes/`:
- `health.ts` — GET /healthz
- `stats.ts` — GET /stats
- `events.ts` — GET /events, POST /events
- `contact.ts` — POST /contact

### `lib/db` (`@workspace/db`)

Database schemas:
- `schema/events.ts` — Events table
- `schema/contact_messages.ts` — Contact messages table

### `lib/api-spec` (`@workspace/api-spec`)

OpenAPI spec at `openapi.yaml`. Run codegen: `pnpm --filter @workspace/api-spec run codegen`
