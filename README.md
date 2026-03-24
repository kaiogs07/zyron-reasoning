<div align="center">

# ⚡ zyron-reasoning

### *Cognitive governance for AI coding assistants.*
#### It changes **how the model thinks** — not just what it outputs.

<br/>

[![npm version](https://img.shields.io/npm/v/zyron-reasoning?style=flat-square&color=black&label=npm)](https://www.npmjs.com/package/zyron-reasoning)
[![license](https://img.shields.io/github/license/kaiogs07/zyron-reasoning?style=flat-square&color=black)](./LICENSE)
[![stars](https://img.shields.io/github/stars/kaiogs07/zyron-reasoning?style=flat-square&color=black)](https://github.com/kaiogs07/zyron-reasoning/stargazers)
[![zero dependencies](https://img.shields.io/badge/dependencies-zero-black?style=flat-square)](./package.json)
[![node](https://img.shields.io/badge/node-%3E%3D18-black?style=flat-square)](./package.json)

<br/>

```bash
npx zyron-reasoning
```

</div>

---

## The problem

AI coding assistants are fast. Too fast.

They write code before understanding the problem. They add dependencies before checking what's already installed. They change 10 files when 1 would do. They forget what was decided last week.

**zyron-reasoning** puts a thinking layer between the request and the response.

---

## What it does

A set of structured markdown files your AI assistant reads **before every generation**. No plugins. No wrappers. No new tools.

The model reads them, runs through a 5-gate protocol, and only then writes code.

The result: less noise, smaller diffs, fewer regressions, and an assistant that actually remembers your decisions.

> **It's invisible.** You don't invoke it. You don't mention it. It just works.

---

## The 5-gate thinking protocol

Before writing a single line, the model must answer all 5 gates:

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  GATE 1 › Problem Definition                               │
│           What is the REAL problem — not the symptom?      │
│                                                             │
│  GATE 2 › Minimal Solution                                 │
│           What is the SMALLEST change that solves it?      │
│                                                             │
│  GATE 3 › Blast Radius                                     │
│           What can this break?                             │
│                                                             │
│  GATE 4 › Existing Solutions                               │
│           Does a built-in or installed solution exist?     │
│                                                             │
│  GATE 5 › Done Criteria                                    │
│           How do I know this is actually done?             │
│                                                             │
│                   NO CODE UNTIL ALL 5 PASS                 │
└─────────────────────────────────────────────────────────────┘
```

---

## How it works

The system installs 5 markdown layers into your project under `.zyron/`. The model reads them in order at the start of every session:

| Layer | File | When | Purpose |
|-------|------|------|---------|
| **0.5** | `personas.md` | Before anything | Your experience level and domain. Controls tone, depth, and verbosity. |
| **1** | `context.md` | Before generation | Your stack, patterns, conventions, and hard constraints. No hallucinations. |
| **2** | `thinking.md` | Before code | The 5-gate preflight. The core of the system. |
| **3** | `review.md` | After generation | 30-item quality checklist. Applied before you see the output. |
| **4** | `decisions.md` | Before any change | Running log of technical decisions. Prevents the model from repeating mistakes. |

**Reading order enforced:** `personas → context → decisions → thinking → review`

---

## Persona levels

Set once in `.zyron/personas.md`. The model adapts everything to match.

| Level | How the model behaves |
|-------|----------------------|
| `beginner` | Patient, step-by-step explanations. Warns before risky actions. Shows what was rejected and why. |
| `intermediate` | Direct and technical. Explains only non-obvious parts. Mentions close-call alternatives. *(default)* |
| `professional` | Terse. Result-first. No hand-holding. No filler. Optimized for speed. |

---

## Supported IDEs

Works with the four major AI coding environments — one install, all covered:

| IDE | Adapter path | File |
|-----|-------------|------|
| **Claude Code** | `.claude/` | `zyron-reasoning.md` |
| **Cursor** | `.cursor/rules/` | `zyron-reasoning.mdc` |
| **Windsurf** | `.windsurf/rules/` | `zyron-reasoning.md` |
| **Antigravity** | `.agent/` | `zyron-reasoning.md` |

The CLI auto-detects which IDEs are installed in your project. Use `--all` to install adapters for all of them at once.

---

## Quick start

**1. Run the installer**
```bash
npx zyron-reasoning
```
Detects your IDE, copies the reasoning files, generates a first-prompt guide.

**2. Open `.zyron/START_HERE.md`**
Guided setup — takes under 2 minutes.

**3. Set your level** in `.zyron/personas.md`
```yaml
level: beginner    # patient explanations, step-by-step
# level: intermediate  # direct, technical (default)
# level: professional  # terse, fast, no filler
```

**4. Describe your project** in `.zyron/context.md`
Your stack, your rules, your hard constraints. One fill-in per project.

**Done.** The reasoning layers activate automatically on every generation.

---

## What the review layer catches

Before delivering any output, the model runs a 30-item checklist across 6 categories:

<details>
<summary>View all 30 checks</summary>

**Architecture**
- Single responsibility per unit
- Change is made at the right layer
- No premature abstraction
- No God objects
- Correct dependency direction

**Coupling & Dependencies**
- No unused imports
- Minimal new dependencies
- Interface over implementation
- No circular dependencies
- Consistent with declared stack

**State & Side Effects**
- Minimal global state
- Side effects are explicit
- Operations are idempotent where possible
- Resources are cleaned up

**Error Handling**
- All catchable errors are handled
- Error messages are useful
- No silent failures
- Graceful degradation

**Readability**
- Intention-revealing names
- No magic values
- Consistent style
- Minimal diff — no unnecessary changes

**Consistency with Project**
- Uses the declared stack
- Matches existing patterns
- Respects all prohibitions in `context.md`
- Aligned with `decisions.md`
- No scope creep

</details>

**Instant rejection triggers:**
- Security vulnerability detected
- Existing tests broken
- Undeclared functionality removed
- Duplicate dependency added
- Explicit "Do NOT" rule violated

---

## Anti-patterns prevented

The thinking protocol is designed to stop six specific failure modes:

| Anti-pattern | What happens without zyron | What happens with zyron |
|---|---|---|
| **Shotgun surgery** | 10 files changed for a 1-file problem | Gate 2 forces minimal scope |
| **Dependency hoarding** | New library added, existing one ignored | Gate 4 checks installed solutions first |
| **Ghost fixes** | Symptom patched, root cause untouched | Gate 1 demands the real problem |
| **Scope creep** | "Small fix" becomes a refactor | Gate 2 + review layer enforce boundaries |
| **Regression blindness** | No consideration of what might break | Gate 3 maps blast radius explicitly |
| **Decision amnesia** | Same mistake made twice | `decisions.md` is read every session |

---

## Project structure after install

```
your-project/
├── .zyron/
│   ├── START_HERE.md      # Read this first
│   ├── personas.md        # Your level and domain
│   ├── context.md         # Your stack and constraints
│   ├── thinking.md        # The 5-gate protocol
│   ├── review.md          # Quality checklist
│   └── decisions.md       # Technical decision log
│
└── .claude/               # (or .cursor/rules/, .windsurf/rules/, .agent/)
    └── zyron-reasoning.md # Adapter — tells the model to read .zyron/
```

---

## Design principles

- **Zero runtime dependencies** — pure Node.js, nothing to install, nothing to break.
- **Markdown-first** — human-readable, version-controllable, model-friendly.
- **Thin adapters** — all logic lives in `.zyron/`. Adapters are just triggers.
- **Invisible to the user** — the model never mentions the framework unless asked.
- **Multi-language** — installer supports English, Português (BR), and Español.

---

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md). All proposals require answering the 5-gate protocol for the change itself.

---

<div align="center">

**[MIT License](./LICENSE)** · Built by [Zyron AI](https://github.com/kaiogs07)

*Stop shipping code. Start shipping thinking.*

</div>
