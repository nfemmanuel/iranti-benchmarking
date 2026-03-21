# Benchmark B6: iranti_ingest Text Pipeline

**Family:** Information extraction / end-to-end pipeline
**Inspired by:** IE benchmarks (MUC, ACE); MemGPT ingest pipeline tests
**Executed:** 2026-03-21
**Status:** Complete — first execution

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
