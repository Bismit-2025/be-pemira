# Project: be-pemira

## Overview
`be-pemira` is a backend service built as a **Cloudflare Worker** using the **Hono** framework. It is configured to use **PostgreSQL** (specifically Neon serverless) as its database, managed via **Prisma** with the `@prisma/adapter-pg` driver adapter for serverless compatibility.

## Tech Stack
- **Runtime:** Cloudflare Workers
- **Framework:** [Hono](https://hono.dev/)
- **Language:** TypeScript
- **Database:** PostgreSQL (Neon)
- **ORM:** Prisma (with `@prisma/adapter-pg`)
  - *Note:* `drizzle-orm` and `drizzle-kit` are also present in dependencies, indicating a potential migration or hybrid approach, but the active configuration files point to Prisma.
- **Authentication:** `better-auth` (installed, integration pending)
- **Package Manager:** `pnpm` (implied by lockfile)

## Project Structure
```
/
├── .env                  # Environment variables (likely contains DATABASE_URL)
├── wrangler.jsonc        # Cloudflare Workers configuration
├── prisma/
│   ├── schema.prisma     # Database schema definition
│   ├── seed.ts           # Database seeding script
│   └── migrations/       # SQL migration files
├── src/
│   ├── index.ts          # Application entry point (Hono app)
│   └── generated/        # Generated Prisma client (custom output path)
└── package.json          # Dependencies and scripts
```

## Development

### Prerequisites
- Node.js installed.
- `pnpm` installed.
- Access to a PostgreSQL database (likely Neon).

### Key Commands
| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the local development server using `wrangler dev`. |
| `npm run deploy` | Deploys the worker to Cloudflare using `wrangler deploy --minify`. |
| `npm run cf-typegen` | Generates/synchronizes types based on `wrangler.jsonc` config. |

### Database Setup
The project uses Prisma with a custom output location for the client.
- **Schema:** `prisma/schema.prisma`
- **Generated Client:** `src/generated/prisma`

To apply migrations or update the client:
1. Ensure `DATABASE_URL` is set in `.env`.
2. Run Prisma commands (e.g., `npx prisma generate`, `npx prisma migrate dev`).

### Auth
`better-auth` is listed as a dependency, but clear integration logic is not yet visible in `src/index.ts`.

## Notes for AI Agents
- **Prisma Client Path:** When importing the Prisma client, note that it is generated into `src/generated/prisma`, not the default `node_modules`.
- **Driver Adapter:** The Prisma Client is instantiated using the `@prisma/adapter-pg` driver. Ensure any new Prisma instantiation code follows this pattern (see `prisma/seed.ts` for reference).
- **Hono Entry:** The main app logic resides in `src/index.ts`.
