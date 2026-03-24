# Thinking Protocol — Layer 2

> **Purpose:** Mandatory preflight before ANY code generation or architectural decision.
> You MUST answer every gate below before writing a single line of code.
> If you cannot answer a gate, STOP and ask the user for clarification.

---

## How to use this file

1. Use the user level and domain from `.zyron/personas.md` (already read) to adapt gate behavior.
2. For every request that involves generating, modifying, or deleting code:
   - Run through all 5 gates sequentially.
   - Write your answers internally (in your reasoning/thinking block).
   - Only after all gates are answered, begin generating.
3. If the request is a simple question (no code change), skip the thinking protocol.

---

## Gate 1 — Problem Definition

**Question:** What is the REAL problem — not the symptom the user described?

- Restate the problem in your own words.
- Identify if the user is describing a symptom (e.g., "this crashes") vs. the root cause (e.g., "null reference because X is uninitialized").
- Check `.zyron/context.md` — does this conflict with declared patterns or constraints?
- Check `.zyron/decisions.md` — was this problem solved before? Was a previous fix reverted?

**Persona adaptation:**
- **beginner**: Restate the problem in plain language. Explicitly confirm understanding with the user before proceeding.
- **intermediate**: Restate concisely. Proceed unless ambiguity exists.
- **professional**: Restate internally only. Proceed immediately.

**Output format (internal):**
```
PROBLEM: [one sentence]
ROOT CAUSE: [one sentence, or "unknown — need to investigate"]
PRIOR DECISIONS: [reference or "none"]
```

---

## Gate 2 — Minimal Solution

**Question:** What is the SMALLEST possible change that fully solves the problem?

- Start from zero and add only what is necessary.
- Do NOT import a library if a built-in solves it.
- Do NOT create an abstraction if only one caller exists.
- Do NOT add configuration if there is only one valid value today.
- Prefer modifying existing code over creating new files.
- Count the lines of change. If your solution exceeds 50 lines, ask yourself: "Am I solving more than what was asked?"

**Persona adaptation:**
- **beginner**: Explain WHY this is the minimal approach. Show what was considered and rejected.
- **intermediate**: State the approach. Mention rejected alternatives only if close call.
- **professional**: State the approach. No justification unless asked.

**Output format (internal):**
```
SOLUTION: [one sentence]
FILES TOUCHED: [list]
LINES CHANGED (estimate): [number]
NEW DEPENDENCIES: [list or "none"]
```

---

## Gate 3 — Blast Radius

**Question:** What can this change break?

- List every file, function, or system that is affected directly or indirectly.
- Consider: tests, types, imports, environment variables, database schemas, API contracts.
- If the blast radius is larger than the problem scope, reconsider Gate 2.

**Persona adaptation:**
- **beginner**: Explain each risk in plain language. Suggest safe rollback steps.
- **intermediate**: List affected areas with brief reasoning.
- **professional**: Bullet list only. Skip obvious items.

**Output format (internal):**
```
AFFECTED: [list of files/systems]
RISK LEVEL: [low / medium / high]
ROLLBACK PLAN: [one sentence]
```

---

## Gate 4 — Existing Solutions

**Question:** Does a native, built-in, or already-installed solution exist?

- Check the project's current dependencies before suggesting new ones.
- Check the language's standard library.
- Check if the framework already provides this functionality.
- Check `.zyron/context.md` for preferred patterns and libraries.
- If a dependency exists that does this, use it. Do NOT reinvent.
- If no dependency exists and the solution is < 20 lines, do NOT add a dependency.

**Persona adaptation:**
- **beginner**: Show what was checked (stdlib, deps, framework). Explain why the recommendation was chosen over alternatives.
- **intermediate**: State what exists and the recommendation. Brief justification.
- **professional**: State recommendation only.

**Output format (internal):**
```
EXISTING SOLUTION: [description or "none found"]
RECOMMENDATION: [use existing / build minimal / add dependency (justify)]
```

---

## Gate 5 — Done Criteria

**Question:** How do I know this is DONE?

- Define exactly what "done" looks like before writing code.
- Include: expected behavior, edge cases handled, tests that should pass.
- If the user didn't define acceptance criteria, propose them and confirm.

**Persona adaptation:**
- **beginner**: Define done in user-visible behavior ("when you click X, Y happens").
- **intermediate**: Define done with behavior + technical criteria.
- **professional**: Define done with behavior + technical criteria + performance bounds if relevant.

**Output format (internal):**
```
DONE WHEN:
- [ ] [criterion 1]
- [ ] [criterion 2]
- [ ] [criterion N]
```

---

## Quick Reference

For fast internalization, here are the 5 gates as single questions:

| Gate | Question |
|------|----------|
| 1 | What is the REAL problem? |
| 2 | What is the SMALLEST fix? |
| 3 | What can break? |
| 4 | Does a solution already exist? |
| 5 | How do I know it's done? |

---

## Anti-Patterns This Protocol Prevents

- **Shotgun surgery**: Changing 12 files when 1 was enough (Gate 2).
- **Dependency hoarding**: Adding `lodash` for a single `_.get()` call (Gate 4).
- **Ghost fixes**: "Fixing" a symptom while the root cause persists (Gate 1).
- **Scope creep**: Refactoring adjacent code that wasn't broken (Gate 2, Gate 5).
- **Regression blindness**: Not considering what existing behavior changes (Gate 3).
- **Infinite loops**: Re-introducing a bug that was already fixed (Gate 1 → decisions.md).

---

## Enforcement

This protocol is not optional. If you skip a gate:
- Your output is likely to be over-engineered, incomplete, or wrong.
- The review layer (`.zyron/review.md`) will catch the gap and flag it.

When in doubt, slow down. Thinking is cheaper than debugging.
