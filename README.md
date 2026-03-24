# zyron-reasoning

[![npm version](https://img.shields.io/npm/v/zyron-reasoning)](https://www.npmjs.com/package/zyron-reasoning)
[![license](https://img.shields.io/github/license/kaiogs07/zyron-reasoning)](./LICENSE)
[![stars](https://img.shields.io/github/stars/kaiogs07/zyron-reasoning)](https://github.com/kaiogs07/zyron-reasoning)

A cognitive governance layer for AI coding assistants.
It changes **how the model thinks** before generating — not just what it does.

---

## What this is

A set of structured markdown files that your AI assistant reads before every generation. They enforce a thinking protocol: define the real problem, find the minimal solution, assess blast radius, check existing solutions, and set done criteria — before writing a single line of code.

Works with **Claude Code**, **Cursor**, **Windsurf**, and **Antigravity**.

## What this is NOT

- Not a prompt library or skills collection.
- Not a chatbot wrapper or agent framework.
- Not a set of code snippets or templates.
- Not IDE-specific — the core files are universal.

---

## Install

```bash
npx zyron-reasoning
```

The CLI detects your IDE and copies the reasoning files to the right paths.
Use `--all` to install for all supported IDEs at once.

---

## How it works

The system uses 5 core files, each a markdown layer the model reads at different moments:

| Layer | File | Purpose |
|-------|------|---------|
| 0.5 | `personas.md` | Your experience level and domain. Adapts tone and depth. |
| 1 | `context.md` | Your project's stack, patterns, and constraints. |
| 2 | `thinking.md` | 5-gate preflight protocol. The heart of the system. |
| 3 | `review.md` | Quality checklist applied to output before delivery. |
| 4 | `decisions.md` | Running log of technical decisions. Prevents repeated mistakes. |

The model reads them in order: personas → context → decisions → thinking → review.

---

## Quick start

1. **Run the installer**
   ```bash
   npx zyron-reasoning
   ```

2. **Open `.zyron/START_HERE.md`** — guided setup in 2 minutes.

3. **Set your persona** — open `.zyron/personas.md`, uncomment your level:
   ```
   level: beginner | intermediate | professional
   ```

4. **Describe your project** — fill in `.zyron/context.md` with your stack and rules.

That's it. The reasoning layers activate automatically on every generation.

---

## The thinking protocol

Every time your assistant generates code, it runs through 5 gates:

1. **Problem Definition** — What is the REAL problem, not the symptom?
2. **Minimal Solution** — What is the SMALLEST change that solves it?
3. **Blast Radius** — What can this break?
4. **Existing Solutions** — Does a built-in or installed solution already exist?
5. **Done Criteria** — How do I know this is done?

No code is written until all 5 gates are answered.

---

## Supported IDEs

| IDE | Rules path | Adapter |
|-----|-----------|---------|
| Claude Code | `.claude/` | `zyron-reasoning.md` |
| Cursor | `.cursor/rules/` | `zyron-reasoning.md` |
| Windsurf | `.windsurf/rules/` | `zyron-reasoning.md` |
| Antigravity | `.agent/` | `zyron-reasoning.md` |

---

## Persona levels

| Level | Behavior |
|-------|----------|
| **beginner** | Patient, step-by-step, warns before risky actions, explains the why. |
| **intermediate** | Direct, technical, explains only non-obvious parts. Default. |
| **professional** | Terse, fast, no hand-holding, optimized for speed. |

---

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on proposing new layers, IDE adapters, or improvements.

---

## License

[MIT](./LICENSE) — Zyron AI
