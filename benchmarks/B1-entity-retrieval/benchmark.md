# Benchmark B1: Entity Fact Retrieval under Distractor Density

**Family:** Entity fact retrieval capability probe
**Motivated by:** Long-context retrieval literature (Kamradt 2023 NIAH; Hsieh et al. 2024 RULER). Note: current scale (N≤2000, ≤110k tokens) is below the stress regime where NIAH effects emerge. See Section 2 for protocol differences.
**Benchmark scientist:** `benchmark_scientist`
**Execution date:** 2026-03-20
**Status:** Installed local exact-retrieval arm refreshed through `0.2.52`; fresh Anthropic baseline rerun blocked on `2026-04-02`


> **Program context:** For the canonical current benchmark state, start with [`articles/CURRENT-BENCHMARK-STATE.md`](../../articles/CURRENT-BENCHMARK-STATE.md) and [`papers/CURRENT-BENCHMARK-STATE-TECHNICAL.md`](../../papers/CURRENT-BENCHMARK-STATE-TECHNICAL.md). This family document should be read as one track within that broader current-state record.

> **2026-04-02 rerun note:** The installed local `0.2.52` Iranti arm still scored `10/10` on the canonical blind `N=2000` dataset. The fresh Anthropic long-context baseline rerun was blocked by insufficient credits, so the current refresh confirms the Iranti arm but does not fully refresh the public comparison end-to-end. Raw artifacts: `results/raw/B1-full-v0239-execution.json`, `results/raw/B1-full-v0239-trial.md`.

---

## 1. What This Benchmark Measures

This benchmark tests whether Iranti's **exact entity/key retrieval** (`iranti_query`) produces higher precision than **reading from a long context document** as the number of distractor entities increases.

The hypothesis is:
> Context-reading accuracy for entity-specific facts degrades as distractor density increases. Iranti's exact entity/key lookup maintains constant precision regardless of distractor count.

This is motivated by a practical problem in multi-agent systems: a long-running agent accumulates many facts about many entities. If those facts are stored in context (transcript), retrieval precision degrades with transcript length. If those facts are in a structured KB, retrieval is an O(1) lookup unaffected by KB size.

---

## 2. Original Benchmark Reference

**Needle-in-a-Haystack (NIAH)**
- Author: Greg Kamradt
- Published: November 2023
- What it measures: An LLM's ability to retrieve a specific sentence embedded in a long document at varying positions and context lengths.
- Evaluation protocol: Vary (1) document length and (2) needle depth (position in document). Measure retrieval accuracy.

**Our adaptation:**
- Replace the sentence needle with a structured entity/key fact
- Replace position-in-document with number of distractor entities
- Add an adversarial condition where wrong facts about the target are also present
- Add an Iranti condition where structured retrieval replaces context reading

**Unavoidable deviations from original NIAH:**
- Original NIAH uses public Paul Graham essays as the haystack; we use a synthetic entity list
- Original NIAH has a published dataset; our dataset is constructed for this evaluation
- Original NIAH uses a single-sentence needle; our needles are structured key-value facts
- We cannot vary document length continuously as in NIAH; we vary entity count
- We do not use the original NIAH scoring infrastructure

These deviations are documented here per the research program's replication standard.

Our adaptation differs from NIAH in that we use structured entity registries rather than prose haystacks, and we vary distractor count rather than document length and needle depth. The 'NIAH variant' label is not used in this program because the benchmark has not been executed at the scale (32k+ tokens) where NIAH-style long-context effects emerge.

---

## 3. Task Definition

### 3.1 Haystack Documents

A haystack document lists N entities, each with exactly 4 facts:
- `affiliation` — institution name
- `publication_count` — integer paper count
- `previous_employer` — prior institution and year range
- `research_focus` — primary and secondary research topics

Entities are presented as a flat list, not sorted by relevance.

### 3.2 Needle Entities

Two target entities whose facts are the query targets:
- `researcher/alice_chen`
- `researcher/bob_okafor`

### 3.3 Distractor Entities

Fictional entities with plausible-sounding but distinct facts. At distractor density N, the document contains the 2 needle entities plus (N-2) distractor entities.

### 3.4 Adversarial Condition

In the adversarial condition (`N=20+adversarial`), the document also contains wrong facts about the needle entities:
- A wrong affiliation for `alice_chen` is embedded (distinct from the correct affiliation)
- A wrong publication count for `bob_okafor` is embedded
The model must pick the correct value when contradictory values exist.

### 3.5 Question Set

10 questions per condition (5 per needle entity):

| Q# | Entity | Key | Ground Truth |
|----|--------|-----|--------------|
| Q1 | alice_chen | affiliation | MIT Computer Science |
| Q2 | alice_chen | publication_count | 47 |
| Q3 | alice_chen | previous_employer | OpenAI |
| Q4 | alice_chen | previous_employer_years | 2018–2021 |
| Q5 | alice_chen | research_focus (primary) | natural language processing |
| Q6 | bob_okafor | affiliation | Stanford AI Lab |
| Q7 | bob_okafor | publication_count | 23 |
| Q8 | bob_okafor | previous_employer | DeepMind |
| Q9 | bob_okafor | previous_employer_years | 2020–2023 |
| Q10 | bob_okafor | research_focus (primary) | computer vision |

---

## 4. Arms

### 4.1 Baseline Arm

**Protocol:**
1. Present the full haystack document in the system prompt or user message
2. Present one question at a time
3. Model (Claude Sonnet 4.6) answers from the document only — no external tool calls
4. Record the answer and compare to ground truth

**Evaluation:** Binary (correct / incorrect). Partial credit not granted (e.g., "OpenAI" is correct; "Google" is incorrect; "I was at OpenAI from 2018 to 2021" is correct).

**Scoring:** Accuracy = correct answers / total questions

### 4.2 Iranti Retrieval Arm

**Protocol:**
1. No context document provided
2. For each question, model uses `iranti_query(entity, key)` to retrieve the answer
3. Model states the retrieved value
4. Record and compare to ground truth

**Historical note:** An earlier blocked run used adapted existing-KB entities because write capability was unavailable in that environment.

**Current bounded refresh note:** Before the current full comparison refresh, the installed-product exact-retrieval arm had been refreshed twice on clean disposable instances:
- `v0.2.35` on `bench_v0235`
- `v0.2.37` on `bench_b4_v0236`

Both bounded refreshes wrote fresh synthetic benchmark entities before measuring exact retrieval. They are valid as current-version readiness evidence for the Iranti arm only. They are **not** refreshed full flagship comparisons because the baseline long-context arm was not rerun alongside them.

**Current Iranti arm questions:**

| Q# | Entity | Key | Ground Truth |
|----|--------|-----|--------------|
| IA1 | researcher/b1_n0235_alice_chen | affiliation | MIT Computer Science |
| IA2 | researcher/b1_n0235_alice_chen | publication_count | 47 |
| IA3 | researcher/b1_n0235_alice_chen | previous_employer | OpenAI |
| IA4 | researcher/b1_n0235_alice_chen | previous_employer_years | 2018-2021 |
| IA5 | researcher/b1_n0235_alice_chen | research_focus_primary | natural language processing |
| IA6 | researcher/b1_n0235_bob_okafor | affiliation | Stanford AI Lab |
| IA7 | researcher/b1_n0235_bob_okafor | publication_count | 23 |
| IA8 | researcher/b1_n0235_bob_okafor | previous_employer | DeepMind |
| IA9 | researcher/b1_n0235_bob_okafor | previous_employer_years | 2020-2023 |
| IA10 | researcher/b1_n0235_bob_okafor | research_focus_primary | computer vision |

---

## 5. Metrics

| Metric | Definition |
|--------|-----------|
| Retrieval accuracy | Correct answers / total questions |
| Error type: entity confusion | Model retrieves correct key but for wrong entity |
| Error type: adversarial capture | Model picks wrong fact when correct and wrong both present |
| Error type: hallucination | Model asserts fact not in document or KB |
| Precision | Iranti: correct retrieved value / total retrieved (always 1 if answer found) |
| Recall | Iranti: facts successfully retrieved / facts queried |

---

## 6. Threats to Validity

1. **Self-evaluation**: Claude Sonnet 4.6 is both the baseline model and the evaluator running this session. Self-consistency bias may inflate baseline performance.
2. **Dataset contamination**: Baseline model may have seen similar entity/fact patterns in training. Adversarial condition reduces this risk by including contradictory information.
3. **Write arm unavailable**: The full ingest→retrieve cycle cannot be tested. Iranti retrieval arm uses pre-existing KB data rather than data written for this evaluation.
4. **Environment dependence**: The clean `bench_v0235` refresh required a disposable configured instance with write capability. Dirty project-bound instances should not be used as evidence for or against the installed product surface.
5. **Small n**: 30 baseline data points across 3 conditions is too small for confidence intervals. Results are indicative, not statistically conclusive.
6. **Synthetic haystack**: Not a validated public corpus. May not generalize to real-world entity density scenarios.

---

## 7. Version Results Log

| Version | Date | N | Baseline score | Iranti arm score | Efficiency: baseline tokens | Efficiency: Iranti tokens | Notes |
|---------|------|---|----------------|------------------|-----------------------------|---------------------------|-------|
| v0.2.21 | 2026-03-22 | 2000 | 10/10 (blind NIAH) | 10/10 | ~107,000 (24 Read calls) | 0 | Null accuracy differential; efficiency differential confirmed. Raw files: B1-N2000-baseline-niah-blind-trial.md, B1-N2000-iranti-v0221-trial.md |
| v0.2.35 | 2026-03-25 | bounded current-version refresh only | not rerun | 10/10 | not rerun | 0 | Clean installed-product exact retrieval arm refresh on disposable `bench_v0235`; use only as current-version readiness evidence, not as a refreshed flagship comparison claim. Raw file: B1-iranti-arm-v0235-trial.md |
| v0.2.37 | 2026-03-26 | bounded current-version refresh only | not rerun | 10/10 | not rerun | 0 | Clean installed-product exact retrieval arm refresh on disposable `bench_b4_v0236`; use only as current-version readiness evidence, not as a refreshed flagship comparison claim. Raw file: B1-iranti-arm-v0237-trial.md |
| v0.2.39 | 2026-03-26 | 2000 | 10/10 | 10/10 | single-call blind haystack; 5191 ms response | 0; 158 ms query batch | Full current public comparison refresh on clean disposable `bench_b1_full_v0239`; null accuracy differential still stands and the efficiency differential remains large. Raw file: B1-full-v0239-trial.md |
| v0.3.2 | 2026-04-04 | 5000 | **BLOCKED** (context_length_exceeded) | **10/10** | 201,908 tokens — exceeds 200,000 limit by 1,908 tokens | 0; 1534 ms query batch | Pre-registered hard-limit test. Baseline API returned `prompt is too long: 201908 tokens > 200000 maximum`. Iranti exact-key lookup unaffected by KB size — all 10/10. H1 and H2 both confirmed. Pre-registration: B1-extended-N5000-preregistration.md. Raw file: B1-n5000-v0240-trial.md |

---

## 8. Citation Record

- Kamradt, G. (2023). Needle In A Haystack — Pressure Testing LLMs. Retrieved from GitHub.
- Hsieh, C-Y., et al. (2024). RULER: What's the Real Context Size of Your Long-Context Language Models? arXiv:2404.06654.
- Packer, C., et al. (2023). MemGPT: Towards LLMs as Operating Systems. arXiv:2310.08560. (Cited for framing; our test design is independent.)
