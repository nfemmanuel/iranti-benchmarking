# B14: Context Economy — With vs Without Iranti Over Time

**Track:** B14 - Context Economy
**Executed:** 2026-04-14
**Iranti version:** 0.3.11
**Model:** claude-sonnet-4-6
**Method:** Anthropic countTokens API (exact token counts, no generation)
**Session:** "DebugAuth" — 15-turn coding session, 7 establishment + 8 recall turns

---

## Per-turn token count

| Turn | Phase | NO_MEMORY (tok) | WITH_IRANTI (tok) | Δ saved | Δ% |
|------|-------|----------------|-------------------|---------|-----|
| 1 | establishment | 1,081 | 1,081 | 0 | 0% |
| 2 | establishment | 1,556 | 1,556 | 0 | 0% |
| 3 | establishment | 1,969 | 1,969 | 0 | 0% |
| 4 | establishment | 2,379 | 2,379 | 0 | 0% |
| 5 | establishment | 2,779 | 2,779 | 0 | 0% |
| 6 | establishment | 3,252 | 3,252 | 0 | 0% |
| 7 | establishment | 3,781 | 3,781 | 0 | 0% |
| 8 | recall | 4,220 | 3,980 | 240 | 6% |
| 9 | recall | 4,730 | 4,163 | 567 | 12% |
| 10 | recall | 5,236 | 4,355 | 881 | 17% |
| 11 | recall | 5,802 | 4,542 | 1,260 | 22% |
| 12 | recall | 6,256 | 4,769 | 1,487 | 24% |
| 13 | recall | 6,711 | 4,981 | 1,730 | 26% |
| 14 | recall | 8,043 | 5,362 | 2,681 | 33% |
| 15 | recall | 8,949 | 5,677 | 3,272 | 37% |

---

## Summary

| Metric | Value |
|--------|-------|
| NO_MEMORY at turn 15 | 8,949 tokens |
| WITH_IRANTI at turn 15 | 5,677 tokens |
| Absolute saving | **3,272 tokens** |
| Relative saving | **37%** |
| First divergence | Turn 8 (+240 tok saved) |
| Context window % (NO_MEMORY) | 4.5% of 200k |
| Context window % (WITH_IRANTI) | 2.8% of 200k |

---

## What this measures

- **NO_MEMORY arm:** Agent re-reads files on recall turns (simulates real agent behavior when
  specific values from earlier files are needed and context is long). All prior tool results
  accumulate in the context window.
- **WITH_IRANTI arm:** Agent receives compact inject blocks on recall turns. Iranti's
  identity-first retrieval delivers only the relevant fact (~50-150 tok) instead of
  re-adding the full file (~300-600 tok) to context.

**Caveat:** Agent re-read behavior is scripted (deterministic). In real sessions, re-read
frequency varies. This benchmark represents a moderate-re-read pattern.

**Token counts are exact** (Anthropic countTokens API, not char/4 estimates).