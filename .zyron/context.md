# Project Context — Layer 1

> **Purpose:** The model reads this file BEFORE any code generation or architectural decision.
> It defines what your project IS, what patterns it follows, and what to NEVER do.
> Fill this out once. Update it when major decisions change.

---

## Project Identity

<!-- What is this project? One sentence. -->
project: 

<!-- Primary language and runtime (e.g., "TypeScript / Node 20", "Python 3.12", "Go 1.22") -->
language: 

<!-- Main framework (e.g., "Next.js 14", "FastAPI", "Rails 7", "none") -->
framework: 

<!-- Package manager (e.g., "npm", "pnpm", "yarn", "pip", "cargo") -->
package_manager: 

---

## Stack

<!-- List every major technology in use. One per line. -->
<!-- Examples: PostgreSQL, Redis, Docker, Tailwind CSS, Prisma, tRPC -->

- 
- 
- 

---

## Architecture Patterns

<!-- Which patterns does this project follow? Uncomment or add your own. -->
<!-- The model will prefer these patterns over alternatives. -->

# pattern: REST API with resource-based routes
# pattern: Server components by default, client components only when needed
# pattern: Repository pattern for data access
# pattern: Colocation — tests next to source files
# pattern: Feature-based folder structure
# pattern: Barrel exports (index.ts per module)
# pattern: No barrel exports — direct imports only

---

## Conventions

<!-- Project-specific rules the model must follow. -->
<!-- Be specific. "Clean code" is not a convention. "Functions under 30 lines" is. -->

- 
- 
- 

---

## Do NOT

<!-- Things the model must NEVER do in this project. -->
<!-- These override any default behavior or common patterns. -->

- 
- 
- 

<!-- Examples:
- Do NOT use class components (React functional only)
- Do NOT add any ORM — we use raw SQL with pg
- Do NOT create God objects or service classes over 200 lines
- Do NOT use default exports
- Do NOT install new dependencies without asking first
-->

---

## Existing Integrations

<!-- External services, APIs, and tools already connected. -->
<!-- The model checks this before suggesting new integrations. -->

| Service | Purpose | Auth method |
|---------|---------|-------------|
|         |         |             |

---

## Environment

<!-- Where does this run? What constraints exist? -->

- **Hosting:** <!-- e.g., Vercel, AWS, self-hosted, local only -->
- **CI/CD:** <!-- e.g., GitHub Actions, none -->
- **Node version:** <!-- e.g., 20.x, or N/A -->
- **OS target:** <!-- e.g., Linux (Docker), cross-platform -->

---

## Current State

<!-- Brief description of where the project is right now. -->
<!-- The model uses this to avoid suggesting things that don't fit the current phase. -->

phase: <!-- e.g., "MVP", "production", "refactoring", "greenfield" -->
notes: 

---

## Filled Examples by Domain

> These are references. Delete this entire section after filling out your own context above.

### Example: Frontend (React/Next.js)

```
project: E-commerce storefront
language: TypeScript / Node 20
framework: Next.js 14 (App Router)
package_manager: pnpm

Stack:
- Tailwind CSS
- Radix UI primitives
- Zustand (client state)
- TanStack Query (server state)
- Prisma (ORM)
- PostgreSQL

Patterns:
- Server components by default
- Feature-based folder structure
- Colocation (tests, styles, components together)

Conventions:
- All components are functional, no classes
- CSS only through Tailwind — no CSS modules, no styled-components
- Every page has a loading.tsx and error.tsx

Do NOT:
- Do NOT use default exports except for pages
- Do NOT add state management for server-fetched data — use TanStack Query
- Do NOT install UI libraries — we use Radix + Tailwind only
```

### Example: Backend (Python/FastAPI)

```
project: Internal inventory API
language: Python 3.12
framework: FastAPI
package_manager: pip (requirements.txt)

Stack:
- SQLAlchemy 2.0 (async)
- Alembic (migrations)
- PostgreSQL 16
- Redis (caching)
- Pydantic v2

Patterns:
- Repository pattern for all DB access
- Dependency injection via FastAPI Depends
- All endpoints return Pydantic models

Conventions:
- Type hints on every function signature
- No print() — use structlog
- All queries are async

Do NOT:
- Do NOT use raw SQL outside repository layer
- Do NOT return dicts from endpoints — always Pydantic models
- Do NOT add Flask patterns (blueprints, decorators from Flask)
```

### Example: Automation / CLI

```
project: CI/CD pipeline toolkit
language: TypeScript / Node 20
framework: none
package_manager: npm

Stack:
- Commander.js (CLI framework)
- zx (shell scripting)
- Docker SDK

Patterns:
- One command per file in src/commands/
- Shared utilities in src/utils/
- No classes — pure functions only

Conventions:
- All output goes through a logger (no raw console.log)
- Exit codes: 0 success, 1 user error, 2 system error
- Every command has --dry-run support

Do NOT:
- Do NOT use interactive prompts in CI mode (detect CI env var)
- Do NOT write temp files — use streams
- Do NOT add web frameworks — this is CLI only
```

### Example: No-Code / Automation (n8n / Zapier)

```
project: Lead qualification workflow
language: JavaScript (n8n expressions)
framework: n8n (self-hosted)
package_manager: N/A

Stack:
- n8n workflows
- Airtable (CRM)
- Slack (notifications)
- OpenAI API (scoring)

Patterns:
- One workflow per business process
- Error handling node on every workflow
- All secrets in n8n credentials, never hardcoded

Conventions:
- Workflow names: [DOMAIN] Action (e.g., "[LEADS] Score New Lead")
- Every workflow has a sticky note explaining purpose
- Test with sample data before activating

Do NOT:
- Do NOT use Code nodes when a built-in node exists
- Do NOT chain more than 15 nodes — split into sub-workflows
- Do NOT store API keys in function nodes
```
