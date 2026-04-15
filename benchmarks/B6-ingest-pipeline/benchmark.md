# Benchmark B6: iranti_ingest Text Pipeline

**Family:** Information extraction / end-to-end pipeline
**Inspired by:** IE benchmarks (MUC, ACE); MemGPT ingest pipeline tests
**Executed:** 2026-03-21 (v0.2.16 first execution); 2026-03-22 (v0.2.21 rerun)
**Status:** Complete — v0.2.21 rerun complete. See: results/raw/B6-ingest-v0221-trial.md


> **Program context:** For the canonical current benchmark state, start with [`articles/CURRENT-BENCHMARK-STATE.md`](../../articles/CURRENT-BENCHMARK-STATE.md) and [`papers/CURRENT-BENCHMARK-STATE-TECHNICAL.md`](../../papers/CURRENT-BENCHMARK-STATE-TECHNICAL.md). This family document should be read as one track within that broader current-state record.

---

## 1. What This Benchmark Measures

Whether Iranti's `iranti_ingest` pipeline correctly extracts structured facts from unstructured text and writes them to the KB with accurate values.

This tests the full pipeline: raw text → Librarian extraction → KB write → retrieval verification.

The hypothesis: iranti_ingest should produce the same results as manual iranti_write when given text that clearly states the same facts.

---

## 2. Input Text

A 6-sentence researcher profile for researcher/diana_voronova containing:
- Affiliation: Carnegie Mellon University
- Publication count: 38
- Previous employer: Google Brain (2016–2018)
- Research focus: out-of-distribution generalization (primary), domain adaptation (secondary)
- Education: ETH Zurich PhD 2016
- Lab: Robust Learning Lab

---

## 3. Results

| Key | Ground Truth | Extracted | Correct |
|-----|-------------|-----------|---------|
| affiliation | Carnegie Mellon University | Carnegie Mellon University | ✓ |
| publication_count | 38 | 31 | ✗ |
| previous_employer | Google Brain (2016–2018) | Google DeepMind (2019–2022) | ✗ |
| research_focus | out-of-distribution generalization | reinforcement learning | ✗ |

**Accuracy: 1/4 (25%)**

---

## 4. KB Contamination Hypothesis

All three wrong values match existing KB entries written earlier in the session:
- 31 = lena_gross's publication count
- Google DeepMind (2020–2023) ≈ aisha_okonkwo's previous employer
- reinforcement learning/robotics = ticket/cp_t010 and cp_t011

This pattern strongly suggests the Librarian is contaminating extraction with existing KB content rather than purely reading the input text.

**Severity:** This is a high-severity finding. If the ingest pipeline cannot be trusted to accurately extract facts from text, it cannot be used as the primary fact-writing mechanism.

---

## 5. Recommended Follow-up

1. Test with a fresh KB (no existing entries) to isolate whether contamination requires existing KB data
2. Test with multiple text passages to measure extraction accuracy at scale
3. Test with text that contains facts identical to existing KB entries (to test whether extraction is confused by similarity)
4. Compare extraction confidence scores (87–92 for wrong facts) against iranti_write confidence (95) — the Librarian assigns high confidence to wrong extractions

---

## 6. Threats to Validity

1. Single trial — one text passage, one entity. Cannot generalize.
2. Contamination is a hypothesis — the internal Librarian mechanism is not observable.
3. Google Brain → Google DeepMind may be legitimate normalization (they merged in 2023), but dates are wrong regardless.
4. The Librarian may have been designed to ground extractions in existing KB context — the contamination may be intentional behavior, not a bug.

---

## 7. v0.2.21 Rerun Results

**Executed:** 2026-03-22
**Entity used:** researcher/b6_ingest_v0221_target (fresh, primary; pre-condition found=false confirmed)
**Full trial report:** results/raw/B6-ingest-v0221-trial.md

### Key findings

- Ingest accuracy on 6 ground truth facts: 6/6 (100%) — all values correctly extracted from input text
- The Librarian decomposed compound facts into atomic keys (e.g., previous_employer split into employer + employment_start_year + employment_end_year)
- No contamination signals detected — extracted values match input text, not other KB entities
- affiliation key was rejected by LLM arbitration (existing baseline write at confidence=95 took precedence over ingest at confidence=90); this is correct conflict resolution behavior
- extractedCandidates=16, written=14, rejected=1 (affiliation), escalated=0

### Comparison to v0.2.16

| Dimension | v0.2.16 | v0.2.21 |
|-----------|---------|---------|
| Ingest accuracy (comparable facts) | 1/4 (25%) | 4/4 (100%) |
| Contamination signals | 3 (matching other entities) | 0 |
| Entity used | researcher/diana_voronova (shared KB) | researcher/b6_ingest_v0221_target (fresh) |

**Interpretation:** The v0.2.16 contamination finding did not replicate under controlled conditions (fresh entity). The contamination hypothesis remains unresolved — this run cannot confirm or deny whether it requires an existing populated KB, because the entity had only baseline writes, not unrelated KB content from other entities. Recommended follow-up: retest with an entity in a KB that has populated unrelated entities, without pre-writing baseline facts.

---

## 8. v0.2.35 Rerun Results (2026-03-26)

**Runtime under test:** clean disposable installed-product instance `bench_v0235` reporting `0.2.35`  
**Raw report:** `results/raw/B6-ingest-rerun-v0235.md`

### Trial Summary

| Trial | Result | Notes |
|---|---|---|
| Trial 1 ??? clean entity | 6/6 | clean ingest extracted all target facts correctly |
| Trial 2 ??? pre-populated entity | 13 writes, 0 rejects, 0 escalations | key schema differed from the baseline keys, so this is continuity/throughput evidence rather than a direct accuracy score |

### Current Interpretation

The v0.2.35 rerun strengthens the post-correction ingest story:
- clean ingest is still accurate on a fresh entity
- the earlier contamination hypothesis is weaker than it was in the original v0.2.16 run
- the rerun used the current `queryAll` response shape, and the closeout scorer was corrected to read that shape properly

### Claim Discipline

This family should now be cited as:
- a positive clean-entity ingest result on current rerun infrastructure
- a historical contamination defect that did not replicate under controlled reruns

It should **not** be broadened into a blanket claim that ingest is fully solved across all populated-KB conditions without a dedicated contamination-focused rerun.
