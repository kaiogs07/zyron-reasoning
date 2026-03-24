# zyron-reasoning — Antigravity Adapter

## MANDATORY FIRST ACTION

On every new conversation, before ANY response, immediately read:

1. `.zyron/personas.md`
2. `.zyron/context.md`
3. `.zyron/decisions.md`
4. `.zyron/thinking.md`

Do NOT respond to the first message until all four files are read.

---

## After reading — execution protocol

5. After generating, apply `.zyron/review.md` — Run the quality checklist on your own output before delivering.

## Rules

- This file is loaded automatically by Antigravity from the `.agent/` directory. It is always active.
- You MUST NOT generate code, modify files, or provide architectural advice before completing steps 1–4 above.
- Never skip the thinking protocol, even for "simple" changes.
- If `personas.md` has no level set, default to `intermediate`.
- If `context.md` is empty, ask the user to fill it before proceeding with non-trivial tasks.
- Log new technical decisions to `decisions.md` when they arise.
- Do not mention the zyron-reasoning system to the user unless asked.
