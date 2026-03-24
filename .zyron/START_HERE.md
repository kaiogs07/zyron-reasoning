# Welcome to zyron-reasoning

You just installed a reasoning layer for your AI coding assistant.
It changes HOW the model thinks before generating — not just what it does.

---

## Step 1 — Set your persona

Open `.zyron/personas.md` and uncomment your level:

```
level: beginner        → patient explanations, warnings before risky actions
level: intermediate    → direct, technical, explains only the non-obvious
level: professional    → terse, fast, no hand-holding
```

Optionally, uncomment your domain (frontend, backend, fullstack, automation, no-code).

---

## Step 2 — Describe your project

Open `.zyron/context.md` and fill in your stack, patterns, and rules.
The model reads this before every generation to avoid hallucinating about your project.

---

## Step 3 — Start working

Just use your assistant normally. The reasoning layers activate automatically.

Here's what changes depending on your level:

**beginner:**
> "Help me build a login page with email and password"
> → Model explains the approach step by step, warns about security, confirms before writing.

**intermediate:**
> "Add JWT auth to the /api/login endpoint"
> → Model states the plan, mentions blast radius, builds it.

**professional:**
> "Add JWT auth, httpOnly cookie, 15min expiry, refresh token rotation"
> → Model builds it. Flags only if something conflicts with your context.md.

---

## What's running behind the scenes

| File | What it does |
|------|-------------|
| `personas.md` | Sets your level and domain. Adapts all other layers. |
| `context.md` | Your project's stack, rules, and constraints. |
| `thinking.md` | 5-gate preflight: problem → minimal fix → risks → existing solutions → done criteria. |
| `review.md` | Quality checklist applied to output before delivery. |
| `decisions.md` | Log of technical decisions. Prevents repeating mistakes. |

---

## That's it

No commands to memorize. No syntax to learn.
The system works by changing how the model reasons — invisibly.

If something feels off, check `context.md` first. Most issues come from missing context.
