# Structured Entity/Key Retrieval in Iranti: A Preliminary Evaluation Against Document-Reading Baselines

**Status:** Working paper — not peer-reviewed
**Version:** 0.1 (Initial draft, 2026-03-20)
**Authors:** Iranti Benchmarking Program (Research Program Manager, Benchmark Scientist, Replication Engineer)
**Benchmark track:** B1 — Entity Fact Retrieval
**Model under test:** Iranti (installed instance, local)
**Baseline model:** Claude Sonnet 4.6

---

## Abstract

We report a preliminary evaluation of Iranti's exact entity/key retrieval mechanism (`iranti_query`) against a document-reading baseline using Claude Sonnet 4.6. Adapted from the Needle-in-a-Haystack (NIAH) benchmark family, our test presents a structured entity registry document to the baseline model at three distractor densities (N=5, N=20, N=20 with adversarial entries) and presents ten questions per condition. Iranti's retrieval arm was tested against eight question-answer pairs using entities pre-stored in the live Iranti knowledge base.

Both arms achieved 100% accuracy at tested scales. The result is a null difference at small document sizes, which we interpret conservatively: Claude Sonnet 4.6 maintains high retrieval accuracy for short-to-medium structured documents, and Iranti's exact lookup is deterministically accurate. We argue the interesting comparison emerges at larger scales (N≥100 entities, ≥32k tokens) where context-reading failures are well-documented. We provide this result as a baseline characterization rather than a performance claim, identify substantive threats to validity, and specify the conditions required for a defensible differential result.

---

## 1. Introduction

Memory systems for LLM agents are increasingly characterized by their retrieval mechanisms: whether agents read from a long context window, query an external knowledge base, or use a hybrid approach. A central practical question is: as the amount of stored information grows, how does retrieval precision change across these approaches?

The Needle-in-a-Haystack (NIAH) benchmark (Kamradt, 2023) established that even frontier LLMs lose retrieval accuracy as document length increases, particularly for facts buried in the middle of very long contexts. This finding motivates architectures that externalize memory to structured stores where retrieval does not degrade with store size.

Iranti is an open-source memory infrastructure system for multi-agent AI. Its core mechanism is a flat key-value knowledge base (PostgreSQL) with entity/key addressing: facts are stored and retrieved as `(entityType, entityId, key) → value` tuples. The `iranti_query` operation is an exact-match lookup — an O(1) operation independent of total KB size.

This paper reports a preliminary evaluation of Iranti's retrieval mechanism against a document-reading baseline, adapted from NIAH methodology. We test whether Iranti's structured retrieval maintains accuracy in conditions where document-reading faces increasing information density.

**We do not claim Iranti outperforms document-reading in this evaluation.** The result is a null difference at our tested scales, and we analyze why this is the expected outcome at current document sizes while identifying the conditions under which a meaningful differential would likely appear.

---

## 2. Related Work

### 2.1 Needle-in-a-Haystack

The NIAH benchmark (Kamradt, 2023) tests LLM recall of a specific sentence embedded at various depths within long context documents composed of Paul Graham essays. Results consistently show degraded recall for facts buried in the middle of very long contexts, particularly beyond 32k tokens. The benchmark was widely adopted to characterize effective context utilization across frontier models.

### 2.2 RULER

RULER (Hsieh et al., 2024) extends NIAH with structured multi-key retrieval tasks, arguing that real-world recall requires retrieving multiple interrelated facts rather than a single needle sentence. RULER shows that model performance degrades more severely on multi-key retrieval than on single-needle tasks.

Our adaptation differs from RULER in that we use a structured key-value format (entity/key pairs) rather than open-ended text, and we evaluate a dedicated external memory system rather than just model context utilization.

### 2.3 MemGPT

Packer et al. (2023) introduce MemGPT, an architecture where an LLM acts as an operating system managing a hierarchical memory store: main context (in-window), external storage, and archived data. MemGPT demonstrates that explicit memory management can improve task completion over longer interactions.

Iranti differs from MemGPT in scope and design: Iranti is a shared persistent KB for multi-agent systems, while MemGPT is per-agent context management. Our evaluation does not compare these architectures directly but cites MemGPT as evidence that external memory management addresses real limitations in context-only approaches.

### 2.4 LongBench and SCROLLS

Bai et al. (2023) and Shaham et al. (2022) provide longer-context evaluation benchmarks across diverse tasks. These benchmarks show that effective context utilization remains challenging for most models at 16k+ tokens. We treat these as supporting literature for the general claim that context-reading degrades at scale.

---

## 3. Benchmark Design

### 3.1 Task Definition

We construct a synthetic entity registry: a structured document listing N researcher profiles, each with four facts:
- `affiliation`: institution name
- `publication_count`: integer
- `previous_employer`: institution and year range
- `research_focus`: primary and secondary topics

Two target ("needle") entities are embedded in the registry: `researcher/alice_chen` and `researcher/bob_okafor`. The remaining (N-2) entries are fictional distractor entities.

Ten questions probe the needle entities' facts. Ground truth is defined by the synthetic dataset.

### 3.2 Distractor Density Conditions

| Condition | N entities | Adversarial entries | Document size (approx.) |
|-----------|-----------|---------------------|------------------------|
| Short | 5 | No | ~600 tokens |
| Medium | 20 | No | ~2,400 tokens |
| Medium+Adv | 20 | Yes (labeled) | ~2,600 tokens |

The adversarial condition embeds wrong facts about the needle entities. Adversarial entries include metadata flags (`[RECORD REQUIRES VERIFICATION]`, `[DUPLICATE]`) to indicate their uncertain status. This design choice is a limitation discussed in Section 7.

### 3.3 Baseline Arm Protocol

The full haystack document is provided as context. The model (Claude Sonnet 4.6) answers each question from the document only. No tool calls, no external retrieval.

### 3.4 Iranti Retrieval Arm Protocol

No context document is provided. The model executes `iranti_query(entity, key)` for each question and answers from the returned structured value.

**Limitation:** The Iranti arm in this evaluation uses pre-existing KB entities (`ticket/cp_t010`, `ticket/cp_t011`) rather than the synthetic alice_chen/bob_okafor entities. This is because `iranti_write` operations were unavailable during the evaluation session (database connection pool exhaustion; see Section 7.3). The Iranti arm questions are adapted to the existing KB entities.

This means the baseline and Iranti arms do not share the same entity identities, which is an additional confound. The two arms must be considered as measuring related but not identical tasks in this preliminary evaluation.

### 3.5 Metrics

- **Accuracy**: correct answers / total questions
- **Recall** (Iranti arm): facts successfully retrieved / facts queried
- **Precision** (Iranti arm): correct values returned / total values returned
- **Error classification**: entity confusion, adversarial capture, hallucination

---

## 4. Results

### 4.1 Baseline Results

| Condition | Questions | Correct | Accuracy |
|-----------|-----------|---------|----------|
| N=5 (short) | 10 | 10 | 100% |
| N=20 (medium) | 10 | 10 | 100% |
| N=20+Adv (medium, adversarial) | 10 | 10 | 100% |
| **Total** | **30** | **30** | **100%** |

Error breakdown: 0 entity confusion errors, 0 adversarial capture errors, 0 hallucinations.

### 4.2 Iranti Retrieval Arm Results

| Entity | Key | Found | Correct | Confidence | Contested |
|--------|-----|-------|---------|------------|-----------|
| ticket/cp_t010 | affiliation | Yes | ✓ | 95 | No |
| ticket/cp_t010 | publication_count | Yes | ✓ | 94 | No |
| ticket/cp_t010 | previous_employer | Yes | ✓ | 92 | No |
| ticket/cp_t010 | research_focus | Yes | ✓ | 90 | No |
| ticket/cp_t011 | affiliation | Yes | ✓ | 95 | No |
| ticket/cp_t011 | publication_count | Yes | ✓ | 94 | No |
| ticket/cp_t011 | previous_employer | Yes | ✓ | 92 | No |
| ticket/cp_t011 | research_focus | Yes | ✓ | 90 | No |
| **Total** | | **8/8** | **8/8** | | |

Iranti retrieval accuracy: **100%**. Recall: **100%**. Precision: **100%**.

An additional observation: the Iranti response includes provenance metadata (confidence, source, validFrom, contested flag) that the baseline arm cannot provide. This is a qualitative advantage of structured retrieval not captured in accuracy metrics alone.

### 4.3 Semantic Search Comparison

A pilot test of `iranti_search` (hybrid lexical+vector search) was performed for one question. The search returned the correct affiliation fact but ranked fifth among results, with a large JSON pm_review object ranked first (all relevance scores = 0). This suggests that for known entity/key lookups, `iranti_query` is the appropriate retrieval mode. `iranti_search` is better suited for discovery queries where the key is unknown.

---

## 5. Interpretation

### 5.1 Null Result at Small Scale

Both arms achieve 100% accuracy. This is the expected result at our tested document sizes (~600–2,600 tokens). Claude Sonnet 4.6 has a documented effective context window of well over 100k tokens, and performance on structured retrieval at this scale is expected to be high.

The NIAH literature establishes that retrieval failures emerge at much longer contexts. Our N=20 condition (~2,400 tokens) is far below the threshold where context-reading degradation is reliably observed. We did not find evidence of degradation because our experiment was not designed at the scale where degradation occurs.

**This null result should not be interpreted as "Iranti provides no benefit." It is an artifact of our tested scale.**

### 5.2 Expected Differential at Larger Scale

The mechanistic argument for an Iranti retrieval advantage is straightforward:

- Context-reading retrieval complexity scales with document length: as N entities → more tokens → more attention computations → empirically observed accuracy degradation at N ≥ ~100k tokens
- Iranti exact query retrieval complexity is O(1) via indexed `(entityType, entityId, key)` lookup: performance is independent of KB size

This is a structural property, not a measured result in this evaluation. Demonstrating it requires N≥100 entities (≥20k tokens) or larger. We treat this as the primary motivation for the next execution round.

### 5.3 Qualitative Advantage

Even at this scale, Iranti's retrieval provides properties the baseline cannot:
1. **Provenance**: every retrieved fact comes with confidence score, source, and validFrom timestamp
2. **Contestedness**: the `contested` flag indicates whether the fact has active conflicts
3. **Persistence**: facts retrieved in this session were stored in a prior session — the retrieval demonstrates cross-session memory continuity
4. **No context dependency**: the Iranti arm answers correctly with zero context about the entities

These properties are not captured in accuracy metrics but represent practical value for multi-agent systems.

---

## 6. Design for Next Execution Round

To demonstrate a measurable differential, the following conditions are required:

| Parameter | This evaluation | Required for differential |
|-----------|----------------|--------------------------|
| Document size | ~2,400 tokens max | ≥32,000 tokens |
| N entities | 20 | ≥100 |
| Adversarial entries | Labeled | Unlabeled |
| Write capability | Unavailable | Required (fix BM-T004) |
| Same entity identity | No (arms use different entities) | Yes (same entities in both arms) |
| Model | Single (Claude Sonnet 4.6) | At least 2 models |
| n (repetitions) | 1 per question | ≥5 repetitions per question |

These requirements define the scope of the full B1 execution, planned after write capability is restored.

---

## 7. Threats to Validity

### 7.1 Self-Evaluation Bias

The model executing this evaluation (Claude Sonnet 4.6) is also the baseline model under test. Self-designed tests may exhibit self-consistency bias. The model may "know" the correct answer and answer correctly regardless of what the document says. This is the primary threat to the baseline results.

**Mitigation:** Future execution should use an independent evaluation harness — a separate process that presents the document to the model via API call and records the raw response, without the model having access to this evaluation context.

### 7.2 Adversarial Design Limitation

The adversarial entries in the N=20+Adv condition include explicit flagging metadata (`[RECORD REQUIRES VERIFICATION]`). A sophisticated model can use these flags to disambiguate without attending to the factual content. True adversarial testing requires unlabeled conflicting entries. The 10/10 accuracy in the adversarial condition is therefore not strong evidence of adversarial robustness.

### 7.3 Write Arm Unavailability

All `iranti_write` operations failed due to database connection pool exhaustion. This prevented testing the full ingest → retrieve cycle. The Iranti arm used pre-existing KB data written by prior agents, not by this benchmark evaluation. The provenance of the test data is therefore external to this evaluation.

**Impact:** The Iranti arm results confirm retrieval accuracy for existing KB data. They do not confirm that Iranti correctly stores and then retrieves newly written facts. This is a significant gap.

**Resolution:** BM-T004 specifies how to restore write capability.

### 7.4 Entity Identity Mismatch

The baseline arm uses synthetic entities (alice_chen, bob_okafor). The Iranti arm uses pre-existing KB entities (ticket/cp_t010, ticket/cp_t011). These are not the same entities, so the two arms measure related but not identical retrieval tasks. A fully controlled comparison requires the same entities in both arms.

### 7.5 Small Sample Size

30 baseline data points (10 questions × 3 conditions) is insufficient for statistical confidence intervals. The zero-error result means we cannot compute meaningful variance estimates. A minimum of n=5 repetitions per question, with shuffled answer options or paraphrased questions, would provide more stable estimates.

### 7.6 Single Model Baseline

Using only Claude Sonnet 4.6 as the baseline does not characterize whether the null result generalizes to other models. Smaller models (Claude Haiku 4.5, open-source 7B models) may show degradation at shorter context lengths, potentially revealing a differential earlier.

---

## 8. Discussion

This evaluation establishes the benchmark methodology and produces a clean null result at small scale, which we interpret as expected given document size. The contribution is:

1. A documented replication of NIAH methodology adapted for structured entity/key retrieval
2. Confirmed functioning of Iranti's `iranti_query` retrieval at 100% accuracy for existing KB data
3. Identification of a semantic search limitation (ranking does not prioritize the queried key)
4. A clear specification of what the next execution round requires to produce a meaningful differential
5. An honest accounting of threats to validity that would prevent overclaiming

We treat this paper as a working document in the research program, not a final result. The program's completion criterion (per CLAUDE.md and docs/research-program.md) requires at least one benchmark family fully replicated and rerun with Iranti, which requires write capability. That remains the blocking prerequisite.

---

## 9. Conclusion

We report a preliminary evaluation of Iranti's entity/key retrieval against a document-reading baseline. Both arms achieve 100% accuracy at our tested scale (N≤20 entities, ≤2,600 tokens). We interpret this as a null result at small scale consistent with expectations from the NIAH literature. The result does not support claims that Iranti improves retrieval at this scale, nor does it refute the mechanistic argument that Iranti retrieval remains stable as KB size grows. The evaluation establishes methodology, confirms retrieval functionality, and specifies requirements for a follow-up evaluation at the scale where differences are expected to emerge.

---

## 10. Limitations Summary

| Limitation | Severity | Planned Resolution |
|------------|----------|-------------------|
| Self-evaluation bias | High | Independent evaluation harness |
| Write arm unavailable | High | Resolve DB connection pool issue (BM-T004) |
| Entity identity mismatch | High | Use same entities in both arms |
| Labeled adversarial entries | Medium | Use unlabeled adversarial entries |
| Small n (30 questions total) | Medium | n≥5 per question, paraphrased variants |
| Single model | Medium | Test with at least 2 model families |
| Small document scale | High | N≥100 entities (≥20k tokens) |

---

## References

Bai, Y., et al. (2023). LongBench: A Bilingual, Multitask Benchmark for Long Context Understanding. arXiv:2308.14508.

Hsieh, C-Y., et al. (2024). RULER: What's the Real Context Size of Your Long-Context Language Models? arXiv:2404.06654.

Kamradt, G. (2023). Needle In A Haystack — Pressure Testing LLMs. GitHub. Retrieved from https://github.com/gkamradt/LLMTest_NeedleInAHaystack.

Packer, C., et al. (2023). MemGPT: Towards LLMs as Operating Systems. arXiv:2310.08560.

Shaham, U., et al. (2022). SCROLLS: Standardized CompaRison Over Long Language Sequences. arXiv:2201.03533.

---

## Appendix A: Dataset

See `benchmarks/B1-entity-retrieval/dataset.md`.

## Appendix B: Trial Records

See `benchmarks/B1-entity-retrieval/trials-baseline.md` and `benchmarks/B1-entity-retrieval/trials-iranti.md`.

## Appendix C: Benchmark Specification

See `benchmarks/B1-entity-retrieval/benchmark.md`.
