# Benchmark B5: Knowledge Currency / Temporal Update

**Family:** Knowledge base maintenance / temporal consistency
**Inspired by:** Knowledge base update semantics; temporal QA literature
**Executed:** 2026-03-21
**Status:** Complete - deterministic update semantics confirmed; ambiguous cross-source updates remain conservative


> **Program context:** For the canonical current benchmark state, start with [`articles/CURRENT-BENCHMARK-STATE.md`](../../articles/CURRENT-BENCHMARK-STATE.md) and [`papers/CURRENT-BENCHMARK-STATE-TECHNICAL.md`](../../papers/CURRENT-BENCHMARK-STATE-TECHNICAL.md). This family document should be read as one track within that broader current-state record.

---

## 1. What This Benchmark Measures

Whether Iranti's KB correctly handles bounded fact updates over time: deterministic same-source improvements, stale-write rejection, duplicate detection, and ambiguous cross-source challenges.

This tests:
- Standard update (higher confidence, same or different source)
- Stale update rejection (lower confidence)
- Duplicate value detection
- Source-switch update (different source, similar confidence)
- Effect of source reliability accumulation on update acceptance

The hypothesis: Iranti's conflict resolution system can serve as an update mechanism in clear deterministic cases. Ambiguous cross-source cases are expected to be more conservative.

---

## 2. Test Conditions

| Test | Initial | Update | Expected | Actual |
|------|---------|--------|---------|--------|
| T1 | conf=85, source=b5_initial | conf=92, NEW source | ACCEPT | REJECT (LLM) |
| T1b | conf=85, source=b5_initial | conf=97, SAME source | ACCEPT | ACCEPT (deterministic) |
| T2 | conf=90, source=b5_initial | conf=75, new source | REJECT | REJECT (deterministic) |
| T3 | conf=85, source=b5_initial | same value, conf=80 | no-op/accept | REJECT ("Duplicate value with lower score") |
| T4 | conf=80, source=b5_source_a | conf=85, source=b5_source_b | AMBIGUOUS | REJECT (LLM) |

---

## 2b. v0.2.21 Results (2026-03-22)

| Test | Initial | Update | Expected | v0.2.16 Actual | v0.2.21 Actual | v0.2.21 Match vs. v0.2.16 |
|------|---------|--------|----------|----------------|----------------|---------------------------|
| T1 | conf=85, source=b5_initial | conf=92, NEW source | ACCEPT | REJECT (LLM) | REJECT (LLM) | YES |
| T1b | conf=85, source=b5_initial | conf=97, SAME source | ACCEPT | ACCEPT (deterministic) | ACCEPT (deterministic) | YES |
| T2 | conf=90→97, source=b5_initial | conf=75, new source | REJECT | REJECT (deterministic) | REJECT (deterministic) | YES |
| T3 | conf=97, source=b5_initial | same value, conf=80 | no-op/accept | REJECT ("Duplicate value with lower score") | REJECT ("Duplicate value with lower score.") | YES |
| T4 | conf=80, source=b5_source_a | conf=85, source=b5_source_b | AMBIGUOUS | REJECT (LLM) | REJECT (LLM) | YES |

**v0.2.21 finding:** All 5 outcomes match v0.2.16 behavior exactly. Update semantics are stable across versions. Infrastructure note: T4 first write attempt returned a transaction timeout (15022ms > 15000ms limit); retry succeeded semantically. This is a reliability observation only — no data integrity impact.

Raw file: results/raw/B5-knowledge-update-v0221-trial.md

---

## 3. Key Findings

1. **No update primitive**: There is no "update" operation. All writes go through conflict detection.
2. **Source reliability gates updates**: Source reliability accumulates through successful writes (~0.62 after 4 writes vs 0.5 default). Established source entries have higher weighted scores, making them hard to overwrite.
3. **Same-source update requires score gap ≥ 10**: Deterministic acceptance requires weighted score gap ≥ 10. With source reliability ~0.62, this requires raw confidence ~12 points higher than existing entry.
4. **Ambiguous cross-source updates are conservative**: the historical record showed LLM-mediated rejection, while the refreshed rerun shows escalation rather than seamless update acceptance.
5. **Duplicate detection works**: Same-value lower-confidence re-writes are correctly identified and rejected.

---

## 4. Practical Implications

To update a fact in Iranti:
- Use the same source that wrote the original fact when possible
- Set incoming confidence high enough that `(conf_new - conf_old) × (0.7 + reliability × 0.3) ≥ 10`
- Treat ambiguous cross-source updates as likely to escalate rather than cleanly replace the incumbent truth

---

## 5. Threats to Validity

1. Reliability estimation is inferred from observed scores, not directly observed
2. Small sample (5 tests)
3. Session-specific reliability (resets between sessions for new sources)
4. No forced-write / privileged-write test

---

## 6. v0.2.35 Rerun Results (2026-03-26)

**Runtime under test:** clean disposable installed-product instance `bench_v0235` reporting `0.2.35`  
**Raw report:** `results/raw/B5-knowledge-update-v0235-trial.md`

### Case Summary

| Test | v0.2.35 result | Final state |
|---|---|---|
| T1 | escalated | no active truth row |
| T1b | updated | new same-source value became active |
| T2 | rejected | original value retained |
| T3 | rejected | duplicate lower-score write blocked |
| T4 | escalated | no active truth row |

### Current Interpretation

The deterministic update semantics still hold:
- clear same-source improvements update successfully
- stale lower-confidence writes are rejected
- duplicate lower-score writes are rejected

The meaningful change is in the ambiguous cross-source zone:
- the older ?LLM reject preserves original value? behavior for T1/T4 no longer describes the current rerun
- at `0.2.35`, those cases escalate and leave no active truth row pending human resolution

### Claim Discipline

This family should now be cited as:
- a positive deterministic update-semantics result
- a conservative escalation result for ambiguous cross-source updates

It should **not** be cited as evidence that the current product simply rejects ambiguous updates while keeping the old truth active.
