# Benchmark B3: Conflict Resolution Accuracy

**Family:** Adversarial write behavior / conflict arbitration
**Inspired by:** Knowledge-fusion conflict handling, weighted-confidence arbitration
**Executed:** 2026-03-21
**Status:** Complete - deterministic conflict logic confirmed; close-gap ambiguous cases now treated conservatively


> **Program context:** For the canonical current benchmark state, start with [`articles/CURRENT-BENCHMARK-STATE.md`](../../articles/CURRENT-BENCHMARK-STATE.md) and [`papers/CURRENT-BENCHMARK-STATE-TECHNICAL.md`](../../papers/CURRENT-BENCHMARK-STATE-TECHNICAL.md). This family document should be read as one track within that broader current-state record.

---

## 1. What This Benchmark Measures

Whether Iranti preserves the correct value when conflicting writes target the
same entity/key pair under controlled confidence and source conditions.

This benchmark is a behavioral characterization of Iranti's conflict-resolution
system. It is not a comparative benchmark against an external baseline.

The core questions are:
- When does deterministic weighted-confidence resolution behave correctly?
- When does LLM arbitration behave correctly?
- What failure modes are structural rather than accidental?

---

## 2. Resolution Model Under Test

Published conflict-resolution behavior for the benchmark program:

```text
weighted_score = raw_confidence × (0.7 + source_reliability × 0.3)
```

Default new-source reliability:
- `0.5`

Resolution path:
- weighted gap `>= 10` -> deterministic winner
- weighted gap `< 10` -> LLM arbitration

---

## 3. Conditions

The benchmark conditions are defined in [conditions.md](conditions.md).

Executed family shape:
- 5 adversarial conflict conditions
- one key type: `affiliation`
- one final-state correctness check per condition

---

## 4. Metrics

- Ground-truth accuracy
- LLM arbitration accuracy
- Resolution-path classification
- Behavioral limitation identification

---

## 5. Key Findings

From the executed record:
- overall ground-truth accuracy: `4/5`
- deterministic clear-gap paths behaved as expected
- the major structural limitation is the `C2` pattern:
  - a high-confidence wrong first write can lock out a lower-confidence
    correction

Published verdict:
- **PARTIAL**

Current-version clarification from the `0.2.35` rerun:
- deterministic logic still stands
- the close-gap ambiguous case escalated instead of producing a clean positive
  arbitration result
- this narrows the practical claim surface for close-gap arbitration: it should
  be described as conservative and escalation-prone rather than solved

See:
- `results/raw/B3-conflict-resolution.md`
- `results/raw/B3-conflict-rerun-v0216.md`
- `papers/B3-conflict-resolution-paper.md`

---

## 6. Interpretation Boundaries

This track supports these claims:
- deterministic conflict handling works in clear-gap scenarios
- one major limitation is explicit and reproducible: high-confidence wrong-first
  writes can persist
- close-gap arbitration should be treated as conservative and escalation-prone,
  not as a broadly validated positive arbitration surface

This track does **not** support these stronger claims:
- general reliability of LLM arbitration in production
- conflict handling across multiple key types
- complete auditability of conflicts in final KB state
- robustness against adversarial source naming

---

## 7. Threats to Validity

1. Confidence values are benchmark-assigned, not agent-generated.
2. The original `C5` source-name semantics finding is confounded by meaningful
   source labels.
3. Only one key type was tested.
4. Small sample size.
5. Learned source reliability over long history was not the main test regime.

---

## 8. Current Program Status

This benchmark family now exists as a standalone benchmark definition because
the published record depended on it, but the folder was missing from
`benchmarks/`.

Current resume-program interpretation:
- historical deterministic findings still matter
- close-gap LLM-arbitration conclusions are stale enough and fragile enough that
  current-version rerun work should revisit them before they are used as strong
  current proof

---

## 9. v0.2.35 Rerun Results (2026-03-26)

**Runtime under test:** clean disposable installed-product instance `bench_v0235` reporting `0.2.35`  
**Raw report:** `results/raw/B3-conflict-rerun-v0235.md`

### Case Summary

| Case | Expected path | v0.2.35 result |
|---|---|---|
| C1 | deterministic reject | PASS |
| C2 | deterministic reject | PASS |
| C3 | close-gap LLM zone | ESCALATED (not timed out) |
| C4 | duplicate reject | PASS |
| C5 | deterministic update | PASS |

### Current Interpretation

The major current-version shift is in the LLM zone.

What still stands:
- deterministic conflict handling behaves correctly in the clear-gap cases
- duplicate rejection still behaves correctly
- deterministic overwrite still behaves correctly when the challenger clearly wins

What changed at `0.2.35`:
- the old close-gap timeout characterization did **not** reproduce in this rerun
- instead, the ambiguous case escalated to human review and left no active truth row

### Claim Discipline

This family should now be cited as:
- a positive deterministic-conflict result
- a conservative escalation result in the close-gap LLM zone

It should **not** be cited as a current claim that the LLM path times out, and it should **not** be cited as proof that close-gap LLM arbitration is production-ready.
