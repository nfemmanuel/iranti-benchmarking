# Benchmark B5: Knowledge Currency / Temporal Update

**Family:** Knowledge base maintenance / temporal consistency
**Inspired by:** Knowledge base update semantics; temporal QA literature
**Executed:** 2026-03-21
**Status:** Complete — first execution

---

## 1. What This Benchmark Measures

Whether Iranti's KB correctly handles fact updates over time: accepting valid updates, rejecting stale writes, and detecting duplicates.

This tests:
- Standard update (higher confidence, same or different source)
- Stale update rejection (lower confidence)
- Duplicate value detection
- Source-switch update (different source, similar confidence)
- Effect of source reliability accumulation on update acceptance

The hypothesis: Iranti's conflict resolution system can serve as an update mechanism when incoming confidence is sufficiently higher than existing entry confidence.

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

## 3. Key Findings

1. **No update primitive**: There is no "update" operation. All writes go through conflict detection.
2. **Source reliability gates updates**: Source reliability accumulates through successful writes (~0.62 after 4 writes vs 0.5 default). Established source entries have higher weighted scores, making them hard to overwrite.
3. **Same-source update requires score gap ≥ 10**: Deterministic acceptance requires weighted score gap ≥ 10. With source reliability ~0.62, this requires raw confidence ~12 points higher than existing entry.
4. **New-source updates blocked by LLM**: LLM arbitration consistently prefers "established source," making new-source updates very difficult.
5. **Duplicate detection works**: Same-value lower-confidence re-writes are correctly identified and rejected.

---

## 4. Practical Implications

To update a fact in Iranti:
- Use the same source that wrote the original fact
- Set incoming confidence high enough that `(conf_new - conf_old) × (0.7 + reliability × 0.3) ≥ 10`
- New sources cannot reliably update established facts without a forced-write mechanism

---

## 5. Threats to Validity

1. Reliability estimation is inferred from observed scores, not directly observed
2. Small sample (5 tests)
3. Session-specific reliability (resets between sessions for new sources)
4. No forced-write / privileged-write test
