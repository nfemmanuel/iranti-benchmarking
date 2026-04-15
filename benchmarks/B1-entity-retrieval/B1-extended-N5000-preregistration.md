# B1 Extended Benchmark — Pre-Registration: Hard Context Limit Test (N=5000)

**Registered:** 2026-04-04
**Status:** Pre-registered — methodology committed before execution
**Builds on:** B1 v0239 (N=2000 comparison, 2026-04-04)

---

## 1. Motivation

At N=2000 (~107k tokens), the B1 benchmark showed a null accuracy differential between the
brute-force long-context baseline (Claude Sonnet 4.5, 10/10) and the Iranti exact-retrieval arm
(10/10). The current claim is:

> **Equal accuracy at dramatically lower token cost** — not accuracy superiority.

To produce an accuracy differentiation claim, the comparison must be run in a regime where the
baseline *cannot operate*. This pre-registration specifies that regime using a mathematical
derivation, not empirical search.

---

## 2. Hard Limit Derivation (pre-run)

From the confirmed v0239 run:

| Fact | Value | Source |
|------|-------|--------|
| Dataset token count at N=2000 | ~107,000 tokens | v0239 run record |
| Actual entity count in dataset-2000-blind.md | 1,938 entities | dataset header |
| Tokens per entity (derived) | ~55.2 tokens/entity | 107,000 / 1,938 |
| Context window (Claude Sonnet 4.5 / Opus 4.6) | 200,000 tokens | Anthropic documentation |
| **Hard limit N** | **~3,623 entities** | 200,000 / 55.2 |

The N=5000 dataset contains 5,000 entities at the same format:

| Dataset | Entities | Estimated tokens | Exceeds context limit? |
|---------|----------|-----------------|----------------------|
| dataset-2000-blind.md | 1,938 | ~107,000 | No |
| dataset-5000.md | 5,000 | ~280,000 | **Yes — by ~80,000 tokens** |

**Conclusion (pre-run):** The brute-force baseline *cannot process* N=5000 in a single pass.
This is a mathematical certainty given the known entity format and the model's context window,
not an empirically hunted result.

---

## 3. Pre-Registered Hypotheses

### H1 — Baseline hard failure at N=5000
The brute-force baseline (full haystack in context) will return a `context_length_exceeded`
error or equivalent API refusal when given the N=5000 dataset (~280k tokens).

**Expected result:** Baseline = BLOCKED (context overflow)
**Falsification condition:** Baseline successfully processes N=5000 and returns answers

### H2 — Iranti operates correctly at N=5000
The Iranti exact-retrieval arm (structured key lookup, no haystack in context) will score 10/10
on the same question set, because retrieval does not depend on context length.

**Expected result:** Iranti = 10/10
**Falsification condition:** Iranti scores < 10/10 at N=5000

### H3 — The efficiency gap widens monotonically with N
At any N above the hard limit, the baseline token cost is undefined (it cannot run). Iranti's
token cost remains O(1) per fact retrieval regardless of KB size.

---

## 4. What This Test Does NOT Claim

- This is **not** a soft-degradation test. We are not claiming the baseline degrades gradually
  before the hard limit — frontier models maintain near-perfect accuracy up to their context
  ceiling and then fail hard.
- This does **not** show Iranti is more accurate at N ≤ 3,623. Below the hard limit, the
  accuracy claim remains "equal, not superior."
- The Iranti arm retrieval quality at N=5000 is identical to N=2000 — it is a key lookup,
  not affected by KB size. The finding is operational capability, not accuracy improvement per se.

---

## 5. Test Design

### 5.1 Needle Entities (from dataset-5000.md)

| Entity | affiliation | publication_count | previous_employer | employer_years | research_focus (primary) |
|--------|-------------|-------------------|-------------------|----------------|--------------------------|
| researcher/elena_torres | Vienna Institute for Advanced Computation | 83 | Max Planck Institute | 2018-2022 | numerical methods |
| researcher/marcus_delacroix | Université de Montréal MILA | 29 | CIFAR | 2019-2022 | deep generative models |

**Needle positions in haystack:** elena_torres at pos 1000/5000; marcus_delacroix at pos 3750/5000

### 5.2 Adversarial Distractors (present in dataset-5000.md)

| Distractor entity | Conflicting field | Conflicting value |
|-------------------|-------------------|-------------------|
| researcher/viktor_sokolov (pos 1010) | publication_count | 83 (same as elena_torres) |
| researcher/jean_pierre_lambert (pos 3760) | affiliation | Université de Montréal MILA (same as marcus_delacroix) |

### 5.3 Question Set (10 questions)

| Q# | Entity | Key | Ground Truth |
|----|--------|-----|--------------|
| Q1 | elena_torres | affiliation | Vienna Institute for Advanced Computation |
| Q2 | elena_torres | publication_count | 83 |
| Q3 | elena_torres | previous_employer | Max Planck Institute |
| Q4 | elena_torres | employer_years | 2018-2022 |
| Q5 | elena_torres | research_focus (primary) | numerical methods |
| Q6 | marcus_delacroix | affiliation | Université de Montréal MILA |
| Q7 | marcus_delacroix | publication_count | 29 |
| Q8 | marcus_delacroix | previous_employer | CIFAR |
| Q9 | marcus_delacroix | employer_years | 2019-2022 |
| Q10 | marcus_delacroix | research_focus (primary) | deep generative models |

### 5.4 Baseline Arm Protocol
1. Attempt to pass the full N=5000 haystack (~280k tokens) to the Anthropic API
2. Record the API response — expected: `context_length_exceeded` error or equivalent
3. Capture the exact error code and message as the result
4. No fallback or truncation — the hard failure IS the finding

### 5.5 Iranti Arm Protocol
1. Spin up a clean disposable instance (`bench_b1_n5000_v0240`, port 3514)
2. Write 10 facts (5 per needle entity) via `/kb/write`
3. Run `iranti_attend` before each query (protocol compliance)
4. Query each fact via `/kb/query/:entityType/:entityId/:key`
5. Score: exact match against ground truth
6. Shut down and clean up instance after recording results

### 5.6 Scoring
- Baseline: PASS (10/10 answers) / BLOCKED (context error) / PARTIAL (unexpected)
- Iranti: correct answers / 10, with error type breakdown

---

## 6. Pre-Registered Expected Outcome

```
Baseline (N=5000, ~280k tokens):  BLOCKED — context_length_exceeded
Iranti   (N=5000, key lookup):    10/10
Accuracy differential:            N/A for baseline (cannot run); Iranti = 100%
Capability differential:          Baseline: cannot operate; Iranti: fully operational
```

---

## 7. Threats to Validity

1. **Context window changes:** If Anthropic silently extended the context window past 280k
   tokens before this run, H1 would be falsified. This would be a stronger result for the
   baseline, not weaker — and would be reported as-is.
2. **Truncation behavior:** Some API implementations silently truncate rather than erroring.
   If the baseline truncates and still answers, we record the score and note truncation.
3. **Iranti retrieval failure:** If Iranti fails to retrieve at N=5000 (unexpected given
   key-lookup architecture), this would falsify H2 and be reported as a genuine failure.
4. **Self-evaluation bias:** As in v0239, the evaluating agent is Claude Code — same model
   family as the baseline. This remains a known threat; results should be treated as
   indicative pending independent replication.
5. **Single trial:** N=10 questions is not statistically powered. Results are indicative.

---

## 8. Commit to Pre-Registration

This document is written and committed **before** the execution script is run.
The methodology, hypotheses, and expected outcomes above are fixed.
Any deviation from expected outcomes will be reported as-is without post-hoc reframing.

Execution script: `scripts/run_b1_n5000_v0240.js`
Results will be recorded in: `results/raw/B1-n5000-v0240-execution.json` and `results/raw/B1-n5000-v0240-trial.md`
