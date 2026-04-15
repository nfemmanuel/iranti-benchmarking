# Benchmark B4: Multi-hop Entity Reasoning

**Family:** Sequential entity discovery probe (original task design)
**Background:** Multi-hop QA literature (RULER: Hsieh et al. 2024; HotpotQA: Yang et al. 2018). Note: this benchmark does not replicate or closely approximate either protocol. HotpotQA uses 113k Wikipedia-grounded questions with EM/F1/supporting-fact metrics; this probe uses 4 questions over synthetic entities with binary correct/incorrect scoring. The primary finding (iranti_search fails on attribute-value discovery) is a system capability characterization, not a multi-hop QA benchmark result.
**Executed:** 2026-03-21
**Status:** Complete - bounded top-5 entity-discovery probe with refreshed current-version result


> **Program context:** For the canonical current benchmark state, start with [`articles/CURRENT-BENCHMARK-STATE.md`](../../articles/CURRENT-BENCHMARK-STATE.md) and [`papers/CURRENT-BENCHMARK-STATE-TECHNICAL.md`](../../papers/CURRENT-BENCHMARK-STATE-TECHNICAL.md). This family document should be read as one track within that broader current-state record.

---

## 1. What This Benchmark Measures

Whether an agent can answer a small set of synthetic chained lookup questions where the second hop depends on finding another entity from a first-hop attribute value.

This tests:
- **Hop 1**: Iranti exact lookup (always tested via iranti_query)
- **Hop 2**: Entity discovery by attribute value (tested via iranti_search)
- **Oracle baseline**: Hop 2 using known entity IDs (tests retrieval only, not discovery)
- **Context baseline**: Document-reading with all entities in context

The hypothesis: Iranti's exact lookup is O(1) and deterministic for known entities, but chained lookup questions additionally depend on bounded entity discovery quality. This family is a capability probe, not a general multi-hop QA benchmark.

---

## 2. Question Set

| Q# | Question | Hops | Ground Truth |
|----|----------|------|--------------|
| Q1 | What is the research focus of the researcher who currently works at alice_chen's institution? | 2 | interpretable ML (chen_wei_mit) |
| Q2 | How many papers has the researcher at alice_chen's previous employer published? | 2 | 31 (lena_gross @ OpenAI Research) |
| Q3 | Where did the other researcher at bob_okafor's institution previously work? | 2 | Apple ML Research (marcus_lin @ Stanford AI Lab) |
| Q4 | What is the research focus of the researcher who previously worked at Google DeepMind? | 2 | AI safety (aisha_okonkwo) |

---

## 3. Arms

### 3.1 Context-reading baseline
All 6 entities (alice_chen, bob_okafor + 4 B4 entities) presented in a flat document. Model answers from document only.

### 3.2 Iranti search-based arm
- Hop 1: iranti_query for known entity's property
- Hop 2: iranti_search using the Hop 1 result to discover the target entity
- Final: iranti_query on discovered entity for target property

### 3.3 Iranti oracle arm
- Hop 1: iranti_query for known entity's property
- Hop 2: iranti_query directly on target entity (entity ID assumed known)
This arm tests retrieval quality in isolation from search quality.

---

## 4. Results Summary

### v0.2.16 (2026-03-21)

| Arm | Score |
|-----|-------|
| Context-reading baseline | 4/4 (100%) |
| Iranti search-based | 1/4 (25%) |
| Iranti oracle (known entity IDs) | 4/4 (100%) |

**Key finding (v0.2.16):** iranti_search fails to surface target entities by attribute value. Context-reading handles multi-hop naturally. Oracle case succeeds 100% — the failure is in discovery, not retrieval.

### v0.2.21 (2026-03-22)

| Arm | Score | Notes |
|-----|-------|-------|
| Context-reading baseline | 4/4 (100%) | Unchanged |
| Iranti search-based | 2/4 (50%) | Q2 (OpenAI Research) and Q4 (Google DeepMind) succeed on second attempt; Q1 (MIT CS affiliation) and Q3 (Stanford AI Lab affiliation) FAIL. All vectorScore=0. |
| Iranti oracle (known entity IDs) | 4/4 (100%) | Unchanged |
| Sub-condition C (cold search) | Inconsistent | Research-focus values discoverable; affiliation values not reliably discoverable |

**Key finding (v0.2.21):** Search-based multi-hop improved from 1/4 to 2/4 in this trial. The improvement is in Q2 and Q4 (exact employer-name matching succeeds on retry). Q1 and Q3 remain FAIL for affiliation-based entity discovery. vectorScore=0 on all results indicates pure lexical matching; vector embeddings not contributing. Oracle retrieval remains perfect. This is a single-run result; the improvement over v0.2.16 may reflect query formulation variance.

Raw file: results/raw/B4-multi-hop-v0221-trial.md

### v0.2.37 (2026-03-26)

| Arm | Score | Notes |
|-----|-------|-------|
| Context-reading baseline | 4/4 (100%) | Historical baseline not rerun in this pass |
| Iranti search-based | 4/4 (100%) | All four targets were discoverable within the top-5 result set and answered correctly after the second hop |
| Iranti oracle (known entity IDs) | 4/4 (100%) | Unchanged |
| Sub-condition C (cold search) | 4/4 discovery | All four targets appeared in the top-5 result set on cold NL queries |

**Key finding (v0.2.37):** On a clean disposable installed-product instance (`bench_b4_v0236`) with a migrated pgvector-backed database, B4 no longer reproduces the old partial-search failure mode. Search-based discovery now succeeds `4/4`, and cold natural-language discovery also succeeds `4/4` when success is defined as the target entity appearing anywhere in the returned top-5 result set. Vector scores are non-zero throughout, indicating the active vector path is contributing. The remaining limitation is ranking ambiguity, not outright non-discovery: in shared-affiliation cases like Q3 and cold C3, the top-ranked result is still the anchor researcher rather than the alternate researcher, even though the target appears in the candidate set and the two-hop answer remains correct once discovered. This is a materially stronger result than the `1/4` and `2/4` search-based stories from earlier versions, but it should still be described only as **bounded top-5 discovery success under synthetic conditions**, not as a general multi-hop reasoning or top-1 ranking claim.

Raw file: results/raw/B4-v0236-execution.json

---

## 5. Threats to Validity

1. Small question set (4 questions)
2. Search may still be sensitive to result-window size; this rerun uses top-5 discovery, not top-1 precision
3. Self-evaluation bias in baseline
4. Q3 has disambiguation ambiguity (bob_okafor is also at Stanford AI Lab), and current `4/4` does not remove that ranking ambiguity
5. The current rerun uses a clean disposable instance with active pgvector; results should not be generalized to degraded or vector-unavailable environments without fresh evidence

---

## 6. Citations

Yang, Z., et al. (2018). HotpotQA: A Dataset for Diverse, Explainable Multi-hop Question Answering. EMNLP 2018.
Hsieh, C-Y., et al. (2024). RULER: What's the Real Context Size of Your Long-Context Language Models? arXiv:2404.06654.
