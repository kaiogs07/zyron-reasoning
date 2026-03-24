# Contributing to zyron-reasoning

Thank you for considering a contribution. This project is a reasoning architecture — not a code library. Contributions follow a different standard than typical open source projects.

---

## What you can contribute

### New reasoning layer files
Propose a new `.zyron/*.md` file that adds a distinct cognitive step. Requirements:
- It must solve a problem not covered by existing layers.
- It must work standalone — no required dependency on other layers.
- It must include clear instructions for the model on when and how to use it.

### New IDE adapters
Add support for a new AI coding assistant. Requirements:
- Provide the IDE name, rules directory path, and marker directory/file for detection.
- Create a `templates/<ide-name>.md` adapter following the existing format.
- Update `tools/install.js` with the new IDE entry.

### Improvements to existing layers
Fix unclear instructions, add missing edge cases, improve anti-pattern coverage. Requirements:
- Explain what behavior the current version produces that is wrong or suboptimal.
- Show the improved version and explain what changes.

### Documentation
Fix typos, improve examples, add translations of documentation (not core files — those stay in English).

---

## What does NOT belong here

- **Prompt snippets or skills** — this is not a prompt library.
- **Code generation templates** — the system governs reasoning, not output format.
- **IDE-specific features** — adapters must be thin. Logic belongs in the core `.zyron/` files.
- **Dependencies** — this project has zero runtime dependencies. Keep it that way.

---

## How to submit a PR

### 1. Run through the thinking protocol first

Before proposing any change, answer the 5 gates from `.zyron/thinking.md`:

1. What is the REAL problem your contribution solves?
2. What is the SMALLEST change that solves it?
3. What can this break in the existing system?
4. Does an existing layer already cover this?
5. How do we know this contribution is "done"?

Include your answers in the PR description.

### 2. PR structure

```
Title: [Layer/Component] Short description

## Thinking Protocol Answers
- Problem: ...
- Minimal solution: ...
- Blast radius: ...
- Existing coverage: ...
- Done criteria: ...

## Changes
- List of files changed and why

## Testing
- How you verified this works (which IDE, which scenario)
```

### 3. Rules

- One concern per PR. Do not bundle unrelated changes.
- Do not modify multiple layers in one PR unless they are directly coupled.
- All core `.zyron/` files must remain in English.
- Do not add runtime dependencies to `package.json`.
- Test the install flow (`npx zyron-reasoning`) after your changes.

---

## Code of conduct

Be direct, be technical, be respectful. No fluff in PRs, no fluff in reviews.

---

## Questions?

Open an issue with the `question` label. We respond fast.
