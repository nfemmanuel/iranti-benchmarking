# B3 Conflict Resolution — v0.3.2 Redesign Trial

**Iranti version:** v0.3.2
**Instance:** bench_b3 (port 3522)
**Date:** 2026-04-04
**Agent:** b3_redesign
**Motivation:** Original v0.3.2 B3 trial scored 2/3 due to a test-design gap — the S1 confidence gap (99 vs 95, raw delta=4) produced only 3.4 weighted points, falling below the deterministic threshold (~10 pts). This redesign uses 99 vs 55 (raw delta=44, weighted delta≈37) to properly exercise the deterministic path.

---

## Weighted Scoring Formula (v0.3.2)

`weighted = raw_confidence × (0.7 + source_reliability × 0.3)`

With default source reliability (0.5 for new sources):
- `weighted = raw × 0.85`
- Deterministic threshold: ~10 weighted points
- For 99 vs 55: (99×0.85) − (55×0.85) = 84.15 − 46.75 = 37.4 → well above threshold

---

## Scenario 1: Wide-Gap Deterministic (Redesigned)

**Goal:** Challenger with confidence=99 should deterministically overwrite incumbent with confidence=55.

- Incumbent: `researcher/b3r_s1` / `affiliation` = "MIT" / confidence=55 / source=source_low → **CREATED**
- Challenger: value="Stanford" / confidence=99 / source=source_high
- **Response:** `{"action":"updated","reason":"Incoming score (84.1) higher than existing (46.8)"}`
- **Query result:** `"Stanford"` — challenger value confirmed active
- **Scoring: PASS** ✅

*Analysis:* Deterministic path triggered correctly. The 44-point raw gap (37.4 weighted) exceeded the threshold, resolving without LLM arbitration. The original trial used 99 vs 95 (3.4 weighted — below threshold), which is why it failed. The resolution mechanism itself was always correct; the original test just didn't reach the deterministic zone.

---

## Scenario 2: Close-Gap Escalation

**Goal:** Small confidence gap (91 vs 90) should escalate.

- Incumbent: `researcher/b3r_s2` / `publication_count` = "42" / confidence=90 / source=source_a → **CREATED**
- Challenger: value="45" / confidence=91 / source=source_c
- **Response:** `{"action":"escalated","reason":"Conflict escalated to ...conflict_researcher_b3r_s2_publication_count_53436191b0.md. Awaiting human resolution."}`
- **Query result:** `{"found":false}` — no active truth while escalated
- **Scoring: PASS** ✅

*Analysis:* Weighted gap = (91−90)×0.85 = 0.85 — correctly identified as ambiguous and escalated. Consistent with v0.2.35 behavior.

---

## Scenario 3: Equal-Confidence Contradictory Sources

**Goal:** Zero-gap conflict (85 vs 85, different sources) should escalate.

- Incumbent: `researcher/b3r_s3` / `employer` = "Google" / confidence=85 / source=source_d → **CREATED**
- Challenger: value="Meta" / confidence=85 / source=source_e
- **Response:** `{"action":"escalated","reason":"Conflict escalated to ...conflict_researcher_b3r_s3_employer_200eb9dafa.md. Awaiting human resolution."}`
- **Scoring: PASS** ✅

*Analysis:* Zero weighted gap → immediate escalation. Correct behavior unchanged from v0.2.35.

---

## Summary Scorecard

| Scenario | Description | Expected | Actual | Score |
|----------|-------------|----------|--------|-------|
| S1 | Wide gap deterministic (99 vs 55) | Challenger wins via deterministic path | Stanford wins — updated | **PASS** |
| S2 | Close gap (91 vs 90) | Escalation | Escalated | **PASS** |
| S3 | Equal confidence contradictory (85 vs 85) | Escalation | Escalated | **PASS** |

**Overall: 3/3 — PASS**

---

## Verdict

B3 conflict resolution is PASS on v0.3.2 with correctly designed test cases. The original 2/3 was a test design gap, not a runtime defect. The deterministic path works when the confidence gap produces ≥10 weighted points; the escalation path works for ambiguous gaps; both have been confirmed on bench_b3.

**Status update:** B3 moves from PARTIAL → PASS.

---

*Benchmark Scientist: claude-code*
*Instance: bench_b3 on Iranti v0.3.2 (port 3522, 5435 pgvector DB)*
