# Quality Review — Layer 3

> **Purpose:** Checklist the model applies to its OWN output before delivering to the user.
> Every code generation, modification, or architectural suggestion must pass this review.
> If any item fails, the model corrects it before delivering — never after.

---

## How to use this file

1. After generating code (post-thinking protocol), run through every category below.
2. Adapt output verbosity based on `.zyron/personas.md`:
   - **beginner**: Show each item with pass/fail and a one-sentence explanation.
   - **intermediate**: Show only failed items with the fix applied.
   - **professional**: Show only failed items, no explanation. Fix silently if trivial.
3. If ANY item fails and cannot be auto-fixed, flag it to the user before delivering.
4. Do NOT skip this review for "small" changes. Small changes cause big regressions.

---

## Category 1 — Architecture

- [ ] **Single Responsibility**: Does each new/modified function do exactly one thing?
- [ ] **Right layer**: Is this logic in the correct layer? (UI logic in UI, business logic in services, data in repositories)
- [ ] **No premature abstraction**: Is there more than one caller for every new abstraction? If not, inline it.
- [ ] **No God objects**: Does any file exceed 200 lines after this change? If so, does it need splitting?
- [ ] **Dependency direction**: Do dependencies point inward? (UI → service → data, never data → UI)

---

## Category 2 — Coupling & Dependencies

- [ ] **No unnecessary imports**: Is every import used? Are there imports that could be removed?
- [ ] **No new dependencies for trivial tasks**: Could this be done with the stdlib or existing deps? (< 20 lines = no new dep)
- [ ] **Interface over implementation**: Does new code depend on interfaces/contracts rather than concrete implementations where applicable?
- [ ] **No circular dependencies**: Does this change introduce any circular import between modules?
- [ ] **Consistent with context.md**: Does this respect the "Do NOT" list and declared patterns?

---

## Category 3 — State & Side Effects

- [ ] **No unnecessary global state**: Is every piece of state scoped as narrowly as possible?
- [ ] **Side effects are explicit**: Are side effects (API calls, writes, mutations) clearly separated from pure logic?
- [ ] **Idempotent where expected**: If this runs twice, does it produce the same result?
- [ ] **Cleanup exists**: If this creates resources (listeners, connections, timers), is there a corresponding cleanup?

---

## Category 4 — Error Handling & Resilience

- [ ] **Errors are catchable**: Can the caller handle failures from this code?
- [ ] **Error messages are useful**: If this fails, does the error message tell the user WHAT went wrong and WHERE?
- [ ] **No silent swallowing**: Are there empty catch blocks or error handlers that do nothing?
- [ ] **Beginner-readable errors**: Would a junior developer understand the error message without searching? (Especially important for `beginner` persona)
- [ ] **Graceful degradation**: If an external dependency fails, does the system degrade or crash?

---

## Category 5 — Readability & Maintainability

- [ ] **Naming is intention-revealing**: Do variable, function, and file names describe what they do, not how?
- [ ] **No magic values**: Are all literals named as constants with clear meaning?
- [ ] **Consistent style**: Does this match the existing codebase style (formatting, naming, patterns)?
- [ ] **Future-proof for 3 months**: Will someone unfamiliar with this code understand it in 3 months?
- [ ] **Minimal diff**: Is this the smallest change that solves the problem? Could any part be removed?

---

## Category 6 — Consistency with Project

- [ ] **Matches context.md stack**: Does this use the declared technologies, not alternatives?
- [ ] **Matches context.md patterns**: Does this follow the declared architectural patterns?
- [ ] **Respects context.md prohibitions**: Does this violate any "Do NOT" rule?
- [ ] **Aligns with decisions.md**: Does this contradict any previously logged decision?
- [ ] **No scope creep**: Does this change ONLY what was asked? Is anything extra included?

---

## Quick Fail — Instant Rejection

The following issues cause instant rejection. Do not deliver code with any of these:

1. **Introduces a security vulnerability** (exposed secrets, SQL injection, XSS, etc.)
2. **Breaks existing tests** without a justified reason logged in decisions.md.
3. **Removes functionality** that wasn't asked to be removed.
4. **Adds a dependency** that duplicates existing functionality.
5. **Ignores an explicit "Do NOT"** from context.md.

---

## Review Output Format

After running the checklist, produce a summary based on persona level:

### beginner
```
## Review Results
- [PASS] Single Responsibility — each function does one thing.
- [PASS] No new dependencies — used built-in fs module.
- [FAIL] Error messages — added a clear message explaining the failure.
  → Fixed: changed "Error" to "Failed to read config: file not found at {path}"
- [PASS] Matches context.md — follows declared patterns.
```

### intermediate
```
## Review: 1 issue fixed
- Error messages: improved generic "Error" → specific message with path.
```

### professional
```
Review: 1 fix applied (error message specificity).
```

---

## Enforcement

This layer is the last gate before delivery. It exists because:
- The thinking protocol (Layer 2) ensures you solve the RIGHT problem.
- This review ensures you solved it WELL.

If you catch yourself skipping items: slow down. Shipping bad code fast is slower than shipping good code once.
