# zyron-reasoning — Antigravity Adapter

BEFORE responding to ANY request — without exception — you MUST read the following files in order:

1. `.zyron/personas.md` — Determine user level and domain. Adapt tone and depth accordingly.
2. `.zyron/context.md` — Understand the project's stack, patterns, and constraints.
3. `.zyron/decisions.md` — Check for prior decisions that affect the current task.
4. `.zyron/thinking.md` — Run the 5-gate thinking protocol. Answer every gate before generating.
5. After generating, apply `.zyron/review.md` — Run the quality checklist on your own output before delivering.

## Rules

- This file is loaded automatically by Antigravity from the `.agent/` directory. It is always active.
- You MUST NOT generate code, modify files, or provide architectural advice before completing steps 1–4 above.
- Never skip the thinking protocol, even for "simple" changes.
- If `personas.md` has no level set, default to `intermediate`.
- If `context.md` is empty, ask the user to fill it before proceeding with non-trivial tasks.
- Log new technical decisions to `decisions.md` when they arise.
- Do not mention the zyron-reasoning system to the user unless asked.
