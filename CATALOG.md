# Catalog

Index of every file in the zyron-reasoning repository.

---

## Core Reasoning Files (`.zyron/`)

| File | Layer | Read by | When | Modifies behavior |
|------|-------|---------|------|--------------------|
| `personas.md` | 0.5 | Model | Before all other `.zyron/` files | Tone, depth, warnings, response length, review verbosity |
| `context.md` | 1 | Model | Before any generation | Constrains stack, patterns, prohibitions |
| `thinking.md` | 2 | Model | Before any code generation or architectural decision | Enforces 5-gate preflight protocol |
| `review.md` | 3 | Model | After generation, before delivery | Quality checklist on own output |
| `decisions.md` | 4 | Model | Before any modification | Prevents contradicting or repeating past decisions |
| `START_HERE.md` | — | User | Once, after install | Onboarding: guides user through setup |

---

## IDE Adapters (`templates/`)

| File | Target IDE | Installed to | Purpose |
|------|-----------|-------------|---------|
| `claude.md` | Claude Code | `.claude/zyron-reasoning.md` | Entry point: tells model to read `.zyron/` files |
| `cursor.md` | Cursor | `.cursor/rules/zyron-reasoning.md` | Entry point: tells model to read `.zyron/` files |
| `windsurf.md` | Windsurf | `.windsurf/rules/zyron-reasoning.md` | Entry point: tells model to read `.zyron/` files |
| `antigravity.md` | Antigravity | `.agent/zyron-reasoning.md` | Entry point: tells model to read `.zyron/` files |

---

## Tooling

| File | Purpose |
|------|---------|
| `tools/install.js` | CLI installer. Detects IDE, copies `.zyron/` + adapter. Run via `npx zyron-reasoning`. |
| `package.json` | npm package config. Zero dependencies. Enables `npx` execution. |

---

## Documentation

| File | Purpose |
|------|---------|
| `README.md` | Project overview, install instructions, philosophy, quick start. |
| `CONTRIBUTING.md` | Guidelines for proposing layers, adapters, and improvements. |
| `CATALOG.md` | This file. Index of all files and their purpose. |
| `LICENSE` | MIT license. |
| `.gitignore` | Git ignore rules (node_modules, OS files, logs). |
