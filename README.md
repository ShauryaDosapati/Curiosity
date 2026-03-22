# The Curiosity Project

A nonprofit organization website built as a full-stack TypeScript monorepo. Features 4 pages (Home, About, Events, Contact), interactive stats, and a PostgreSQL-backed API.

**By Shaurya Dosapati**

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, Vite 7, TailwindCSS 4, Wouter, Framer Motion |
| Backend | Express 5, Node.js 24 |
| Database | PostgreSQL 16, Drizzle ORM |
| Type Safety | TypeScript 5.9, Zod, OpenAPI + Orval codegen |
| Monorepo | pnpm workspaces |

---

## Prerequisites

- **Node.js** v24+
- **pnpm** v9+ — install with `npm install -g pnpm`
- **PostgreSQL** 16 running locally (or a connection URL)

---

## Project Structure

```
Curiosity/
├── artifacts/
│   ├── api-server/          # Express REST API
│   └── curiosity-project/   # React + Vite frontend
├── lib/
│   ├── db/                  # Drizzle ORM schema + DB connection
│   ├── api-spec/            # OpenAPI spec + Orval codegen config
│   ├── api-zod/             # Generated Zod schemas
│   └── api-client-react/    # Generated React Query hooks
├── scripts/                 # Utility scripts
├── tsconfig.base.json       # Shared TypeScript config
└── pnpm-workspace.yaml      # pnpm workspace config
```

---

## Local Setup

### 1. Install dependencies

```bash
pnpm install
```

### 2. Set up environment variables

Create a `.env` file (or export these in your shell) before running each service:

**API Server** — needs:
```bash
export DATABASE_URL="postgresql://postgres:password@localhost:5432/curiosity"
export PORT=8080
export NODE_ENV=development
```

**Frontend** — needs:
```bash
export PORT=5173
export BASE_PATH="/"
```

> Tip: you can create `.env` files inside each artifact directory and load them with `source .env` or use a tool like `dotenv-cli`.

### 3. Set up the database

Make sure PostgreSQL is running, then push the schema:

```bash
DATABASE_URL="postgresql://postgres:password@localhost:5432/curiosity" \
  pnpm --filter @workspace/db run push
```

This uses Drizzle Kit to create the `events` and `contact_messages` tables.

### 4. Run the API server

```bash
PORT=8080 DATABASE_URL="postgresql://..." NODE_ENV=development \
  pnpm --filter @workspace/api-server run dev
```

API will be available at `http://localhost:8080`

### 5. Run the frontend

In a separate terminal:

```bash
PORT=5173 BASE_PATH="/" \
  pnpm --filter @workspace/curiosity-project run dev
```

Frontend will be available at `http://localhost:5173`

---

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/healthz` | Health check |
| GET | `/api/stats` | Organization statistics |
| GET | `/api/events` | List all events |
| POST | `/api/events` | Create a new event |
| POST | `/api/contact` | Submit a contact message |

---

## Database Schema

### `events`
| Column | Type | Notes |
|--------|------|-------|
| id | serial | Primary key |
| title | text | |
| description | text | |
| date | timestamp | |
| location | text | |
| category | text | Default: `"other"` |
| isUpcoming | boolean | Default: `true` |
| imageUrl | text | Nullable |
| createdAt | timestamp | Auto-set |

### `contact_messages`
| Column | Type | Notes |
|--------|------|-------|
| id | serial | Primary key |
| name | text | |
| email | text | |
| subject | text | |
| message | text | |
| createdAt | timestamp | Auto-set |

---

## Available Scripts

From the workspace root:

```bash
pnpm run build          # Typecheck + build all packages
pnpm run typecheck      # Run TypeScript checks across all packages
```

Per package:

```bash
# API server
pnpm --filter @workspace/api-server run dev       # Start dev server
pnpm --filter @workspace/api-server run build     # Build CJS bundle

# Frontend
pnpm --filter @workspace/curiosity-project run dev     # Start Vite dev server
pnpm --filter @workspace/curiosity-project run build   # Production build
pnpm --filter @workspace/curiosity-project run serve   # Preview production build

# Database
pnpm --filter @workspace/db run push        # Push schema to DB
pnpm --filter @workspace/db run push-force  # Force push schema

# API codegen (regenerate from OpenAPI spec)
pnpm --filter @workspace/api-spec run codegen
```

---

## How It Works

1. **OpenAPI spec** (`lib/api-spec/openapi.yaml`) defines the API contract
2. **Orval** generates type-safe React Query hooks (`lib/api-client-react`) and Zod schemas (`lib/api-zod`) from the spec
3. **Drizzle ORM** manages DB schema and generates Zod validators for DB models
4. **Express routes** implement the spec using the generated Zod schemas for validation
5. **React frontend** uses the generated React Query hooks to call the API with full type safety

---

## Notes for Local Development

- The Vite config uses Replit-specific plugins (`@replit/vite-plugin-*`) which are skipped automatically when `REPL_ID` is not set — no action needed locally.
- The `PORT` environment variable is **required** by both the API server and the Vite config — the app will throw at startup if it's missing.
- The `BASE_PATH` environment variable is **required** by Vite — set it to `"/"` for local dev.
- On macOS, the default PostgreSQL user is your system username (no password). The connection URL is:
  ```
  postgresql://<your-username>@localhost:5432/curiosity
  ```
- If you get `Cannot find module` errors for `@rollup/rollup-darwin-x64`, `lightningcss-darwin-x64`, or `@tailwindcss/oxide-darwin-x64` when starting Vite, install them manually (this is a known pnpm/npm optional deps issue):
  ```bash
  pnpm add -w @rollup/rollup-darwin-x64 lightningcss-darwin-x64 @tailwindcss/oxide-darwin-x64
  ```
