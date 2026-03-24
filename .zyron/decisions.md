# Decision Memory — Layer 4

> **Purpose:** Running log of technical decisions made in this project.
> The model reads this file BEFORE any modification to avoid repeating corrected mistakes
> or contradicting previous decisions.

---

## How to use this file

### For the model:
1. Before any code change, scan this log for related decisions.
2. If a new decision is made during a task, append an entry using the template below.
3. Never contradict an existing decision without explicitly flagging it to the user.
4. If a decision is being reversed, mark the original as `status: superseded` and log the new one.

### For the user:
- You can add entries manually or let the model log them.
- Review periodically. Delete entries that are no longer relevant.
- This file grows over time — that's intentional. It's your project's memory.

---

## Entry Template

Copy this template for each new decision:

```markdown
### [SHORT TITLE]

- **date:** YYYY-MM-DD
- **status:** active | superseded | reverted
- **context:** Why this decision came up. What problem were we solving?
- **decision:** What we decided to do.
- **alternatives rejected:**
  - [Alternative 1] — why it was rejected
  - [Alternative 2] — why it was rejected
- **consequences:** What this enables or constrains going forward.
- **supersedes:** [reference to previous decision, if any]
```

---

## Decisions Log

<!-- New entries go here. Most recent first. -->

### Example: Use pnpm over npm

- **date:** 2025-01-15
- **status:** active
- **context:** Project was using npm. Install times were slow and lock file diffs were noisy.
- **decision:** Switch to pnpm for all package management.
- **alternatives rejected:**
  - yarn — added complexity with Plug'n'Play, team had no experience
  - npm with `--prefer-offline` — still slower, didn't fix lock file noise
- **consequences:** All contributors must have pnpm installed. CI scripts updated. No more `package-lock.json`.

---

### Example: No ORMs — raw SQL with pg

- **date:** 2025-01-10
- **status:** active
- **context:** Team debated Prisma vs. Drizzle vs. raw SQL for data access.
- **decision:** Use raw SQL with the `pg` driver. Queries in repository files.
- **alternatives rejected:**
  - Prisma — migration system too opinionated, generated client too heavy for our scale
  - Drizzle — promising but team had no experience, didn't want to debug ORM issues
- **consequences:** No auto-generated types from schema. We write Zod schemas manually. All queries must be parameterized (no string interpolation).

---

### Example: Reverted — switched back from Zustand to React Context

- **date:** 2025-02-01
- **status:** active
- **context:** Previously decided to use Zustand for client state (see 2025-01-20 entry).
- **decision:** Revert to React Context + useReducer. Zustand was overkill for 2 global values.
- **alternatives rejected:**
  - Keep Zustand — unnecessary dependency for the current scope
  - Jotai — same problem, different API
- **consequences:** Removed zustand from dependencies. Simpler mental model. If state grows beyond 5 values, revisit.
- **supersedes:** "Use Zustand for client state" (2025-01-20)

---

> Delete the examples above after adding your first real entry.
