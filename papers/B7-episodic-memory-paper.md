# Episodic Memory Recall in Long Multi-Turn Conversations: A Controlled Evaluation of Iranti-Assisted Retrieval Against Context-Reading at Moderate Transcript Length

**Status:** Working paper — not peer-reviewed
**Version:** 0.2 (Addendum: v0.2.16 full-protocol rerun, 2026-03-21)
**Authors:** Iranti Benchmarking Program (Paper Author, Benchmark Scientist, Replication Engineer)
**Benchmark track:** B7 — Conversational Episodic Memory
**Model under test:** Iranti (installed instance, local) — iranti_write / iranti_query arm
**Baseline model:** Claude Sonnet 4.6 (context-reading)

---

## Abstract

We present B7, a controlled evaluation of episodic memory recall in long multi-turn conversational contexts, comparing a context-reading baseline against an Iranti-assisted retrieval arm. The task consists of a synthetic 51-turn research planning meeting transcript (~5,500 tokens) containing 12 embedded facts spanning dates, numeric values, named entities, and structured values. Ten of these facts were probed via direct recall questions. Both arms achieved 10/10 (100%) correct recall with uniformly high confidence.

The null differential at this scale is expected and informative. At approximately 5,500 tokens, the transcript is well within the context window of the Claude Sonnet 4.6 model used for evaluation, and baseline context-reading is not expected to struggle. The contribution of B7 is not a performance advantage for either arm but the establishment of a replicable methodology for testing episodic memory recall at increasing transcript lengths. One structural finding of methodological note is the presence of four numerically adjacent dates within a 12-day window (April 10, 12, 19, 22), which were recalled without error in this execution but represent a genuine distractor structure that would become a plausible failure mode under longer transcripts, fragmented context, or cross-session retrieval conditions. The benchmark is designed to scale to lengths where context-reading degrades and the Iranti differential should emerge.

---

## 1. Introduction

Episodic memory — the capacity to recall specific events, facts, and values encountered in prior experience — is a foundational capability for agents operating over extended conversational sessions. In human cognition, episodic memory is distinguished from semantic memory (general world knowledge) by its temporal and contextual specificity: episodic recall binds a fact to its context of acquisition (Tulving, 1972). For language model agents, the analogous challenge is retaining and accurately retrieving specific values stated at particular points in a long conversation, particularly when substantial interfering content separates the point of encoding from the point of retrieval.

Current large language models handle in-context episodic recall through attention over their context window. This approach is effective when the full conversation fits within the context window, but it is subject to a set of well-documented limitations at longer scales: positional decay effects (facts stated early in a long context are recalled less reliably than recent facts), interference from numerically or semantically similar facts, and catastrophic forgetting when context is truncated or split across sessions (Liu et al., 2023; Shi et al., 2023). External memory systems such as Iranti offer an alternative architecture: facts are written to a persistent knowledge base as they are stated and retrieved via exact-match lookup at query time, decoupling recall from in-context position effects.

This paper presents the B7 evaluation, which establishes a methodology for testing episodic recall under controlled conditions. The benchmark uses a synthetic multi-turn conversation containing 12 facts with deliberate structural properties: varying positional distribution (facts spanning turns 3 through 50), heterogeneous value types (dates, numbers, named entities, compound values), and numerically adjacent distractors (four dates within a 12-day window). At the tested transcript length (~5,500 tokens), both the context-reading baseline and the Iranti-assisted arm achieve perfect recall. The paper explains why this null differential is informative, what structural features of the benchmark establish the ground for future tests where a differential should emerge, and what threats to validity apply.

The central research question of B7 is:

> At what scale and under what retrieval conditions does Iranti's persistent memory architecture produce a measurable accuracy advantage over in-context episodic recall, and what benchmark methodology is appropriate for detecting that advantage?

B7 is the first execution of this methodology at moderate transcript length. It is designed to be rerun at 20k, 50k, and 100k+ token transcript lengths as a longitudinal test series.

---

## 2. Related Work

### 2.1 Episodic Memory in Language Models

The concept of episodic memory in artificial systems was articulated by Tulving (1972) in the context of human cognition and has been adapted to machine learning settings in various forms. Episodic memory in language model agents is most directly analogous to in-context recall: the model must retrieve a specific value that it encountered during the current context, as opposed to using parametric knowledge (semantic memory) from pretraining.

Liu et al. (2023) demonstrate the "lost in the middle" phenomenon: language models exhibit significantly lower recall accuracy for facts positioned in the middle of long contexts compared to facts at the beginning or end. This positional effect is consistent with human episodic memory primacy and recency effects. The effect becomes significant at context lengths above approximately 10k–20k tokens, which explains why B7 — at 5,500 tokens — does not exhibit it.

Shi et al. (2023) show that irrelevant but superficially related context (distractor facts) significantly degrades recall accuracy in multi-fact reasoning tasks. The B7 benchmark incorporates a version of this with the four-date cluster (April 10, 12, 19, 22), though at the current transcript length this distractor structure does not produce observable errors.

### 2.2 MemGPT and the Case for Hierarchical Memory

Packer et al. (2023) introduce MemGPT, a system that treats the LLM context window as a form of fast memory and manages a hierarchical storage architecture that includes in-context memory, external storage, and a retrieval mechanism for surfacing relevant stored content. MemGPT's central motivation is the context window limitation: at transcript lengths exceeding the context window, purely in-context episodic recall necessarily degrades, and an external storage mechanism with intelligent retrieval is required to maintain performance.

MemGPT's architecture anticipates precisely the regime B7 is designed to scale into. At 5,500 tokens, the current evaluation operates well below the threshold where MemGPT-style hierarchical memory provides an advantage. At transcript lengths of 50k–200k tokens, which MemGPT was designed for, the architecture becomes relevant. B7's design is informed by MemGPT's framing: the baseline condition represents the unaugmented in-context recall that MemGPT set out to improve upon; the Iranti arm represents an implementation of the same architectural intuition.

### 2.3 LONGMEM and Long-Context Retrieval

Wang et al. (2023) introduce LONGMEM, a framework for enabling language models to work with arbitrarily long documents via self-guided memory retrieval. LONGMEM identifies two distinct challenges: (1) encoding long contexts beyond the model's native window, and (2) retrieving the relevant portion of a long context at query time. Their evaluation uses reading comprehension tasks over documents of 30k–100k tokens and shows that retrieval-based approaches significantly outperform truncation-based approaches at these lengths.

LONGMEM is relevant to B7 as a benchmark precedent rather than a directly replicated protocol. The B7 design is simpler than LONGMEM's full evaluation but shares the core structural question: does retrieval-based memory outperform context-reading as transcript length increases? B7 establishes the baseline condition (no length-induced degradation at 5,500 tokens) and is designed to be extended into the length regime where LONGMEM-style effects dominate.

### 2.4 ConvQA and Conversational Retrieval

Conversational question answering benchmarks (CoQA: Reddy et al., 2019; QuAC: Choi et al., 2018) evaluate recall over conversational contexts rather than static documents. These benchmarks establish that recall in conversational settings is different from document reading: facts are stated in the flow of dialogue, with natural variation in explicitness and phrasing, and the interrogative context often differs substantially from the original statement. B7 follows this tradition in using a simulated conversation as the source context rather than a structured document.

The B7 design differs from CoQA and QuAC in that facts are explicitly embedded as definite statements (e.g., "The data licensing agreement was signed on March 15th") rather than emerging implicitly from dialogue. This choice makes the baseline easier — facts are unambiguous — and keeps the evaluation focused on retention and positional effects rather than inference and implication.

---

## 3. Methodology

### 3.1 Transcript Design

The B7 benchmark uses a synthetic 51-turn multi-turn conversation transcript representing a research project planning meeting. The transcript was designed to satisfy several structural requirements:

1. **Sufficient length to require retention:** At ~5,500 tokens and 51 turns, the transcript is long enough that early-stated facts (Turn 3, Turn 8) require retention across 40+ turns of intervening discussion before being probed.

2. **Varied positional distribution:** Facts are distributed across turns 3–50, spanning early, mid, mid-late, and late positions. This enables analysis of positional effects, even if no such effects are observed at this length.

3. **Heterogeneous value types:** The 12 embedded facts include calendar dates, an integer count, a parameter count, a duration, a ROUGE-L threshold (floating point), a named entity, and a compound value (percentage and geographic scope). This diversity tests whether recall varies systematically by value type.

4. **Numerically adjacent distractor structure:** Four date values appear within a 12-day window (April 10, 12, 19, 22), each attached to a distinct event (checkpoint freeze, phase 1 start, deployment deadline, stakeholder demo). This is the most structurally demanding feature of the benchmark: the dates are plausible confusors in any condition where recall is approximate rather than exact. In a longer or noisier context, this cluster would be expected to produce interference errors.

5. **Substantive intervening discussion:** The discussion between facts is topically relevant to the framing (engineering trade-offs, risk analysis, deployment planning) rather than filler. This ensures that the interfering turns constitute genuine distractor material rather than blank space.

### 3.2 Fact Embedding

Twelve facts were embedded in the transcript at specific turn positions. Facts are stated as explicit declarative assertions by named participants, with no ambiguity about the value being asserted. The fact set is documented in full in `benchmarks/B7-episodic-memory/conversation-transcript.md`.

The ten facts probed in the evaluation are:

| Q# | Target Fact | Transcript Turn | Positional Class |
|----|-------------|-----------------|-----------------|
| Q1 | Data license signed date (March 15th) | Turn 3 | Early |
| Q2 | Model parameter count (7 billion) | Turn 8 | Early |
| Q3 | Holdout set size (2,400 examples) | Turn 17 | Mid |
| Q4 | Option B engineering cost (6 weeks) | Turn 22 | Mid |
| Q5 | Checkpoint freeze date (April 10th) | Turn 34 | Mid-late |
| Q6 | Rollback decision owner (Dr. Tanaka) | Turn 45 | Late |
| Q7 | ROUGE-L threshold (0.68) | Turn 42 | Late |
| Q8 | Stakeholder demo date (April 22nd) | Turn 47 | Late |
| Q9 | Deployment deadline (April 19th) | Turn 49 | Late |
| Q10 | Phase 1 start date (April 12th) | Turn 50 | Late |

Two facts from the full set of 12 (GPU-hours reserved; Phase 1 rollout scope) were not included in the probe set in this execution. Their omission does not affect the primary analysis.

### 3.3 Conditions

**Condition A — Context-reading baseline:**
The complete 51-turn transcript is provided as a single in-context document. The evaluating agent reads the full transcript and answers all 10 probe questions from in-context recall only. No external tools are used. No KB is queried. This condition represents ideal single-session episodic recall: the entire transcript is available, the agent has unlimited attention over it, and there is zero delay between encoding and retrieval.

**Condition B — Iranti-assisted arm:**
During a simulated processing of the conversation, the agent writes each embedded fact to Iranti using `iranti_write` with entity identifier `project/b7_model_launch` and semantically named keys (e.g., `data_license_signed`, `checkpoint_freeze_date`). At the end of the conversation, the agent answers probe questions using `iranti_query(project/b7_model_launch, <key>)` for exact-match lookup. The Iranti arm does not rely on in-context retention; it relies entirely on KB write and retrieval.

This condition represents the target Iranti use case: an agent in a long session writes facts to persistent memory as they are stated, enabling exact retrieval at any later point independent of context window position or in-session interference.

### 3.4 Evaluation Protocol

Probe questions are presented in a fixed order after both conditions have completed the full transcript. Answers are evaluated against the ground truth table documented in the transcript file. Evaluation is binary (correct / incorrect); partial credit is not assigned. Confidence is self-reported by the evaluating model on a three-point scale (H/M/L).

---

## 4. Results

### 4.1 Context-Reading Baseline

| Q# | Probe Question | Reported Answer | Correct? | Confidence |
|----|---------------|----------------|---------|-----------|
| Q1 | Data license signed date | March 15th | Yes | H |
| Q2 | Model parameter count | 7 billion | Yes | H |
| Q3 | Holdout set size | 2,400 examples | Yes | H |
| Q4 | Option B engineering cost | 6 weeks | Yes | H |
| Q5 | Checkpoint freeze date | April 10th | Yes | H |
| Q6 | Rollback decision owner | Dr. Tanaka | Yes | H |
| Q7 | ROUGE-L threshold | 0.68 | Yes | H |
| Q8 | Stakeholder demo date | April 22nd | Yes | H |
| Q9 | Deployment deadline | April 19th | Yes | H |
| Q10 | Phase 1 start date | April 12th | Yes | H |

**Baseline accuracy: 10/10 (100%)**

No retrieval errors were observed. Confidence is uniformly high. The evaluating agent notes that all facts were recoverable from explicit, unambiguous statements in the transcript.

The early-stated facts (Q1, Q2, Q3) required retention across 34–48 intervening turns of substantive discussion covering infrastructure decisions, deployment planning, and risk analysis. This represents the strongest test of in-context recall within this execution. No degradation attributable to position was observed.

The late-stated date cluster (Q5, Q8, Q9, Q10 — April 10, 22, 19, 12) was recalled correctly in all cases, with no cross-fact confusion between the four adjacent dates. These facts appeared in turns 34, 47, 49, and 50 respectively, with Q8–Q10 stated in rapid succession within the final five turns of the transcript. The absence of confusion in this cluster under ideal recall conditions establishes a baseline for comparison under degraded conditions in future executions.

### 4.2 Iranti-Assisted Arm

The Iranti arm wrote all 12 embedded facts to `project/b7_model_launch` using semantically named keys. All 10 probe questions were answered via `iranti_query` exact-match lookup.

**Iranti arm accuracy: 10/10 (100%)**

Exact-match retrieval succeeded for all probed keys. The KB stored values matched ground truth in all cases.

### 4.3 Summary

| Condition | Correct | Total | Accuracy | Notes |
|-----------|---------|-------|----------|-------|
| Context-reading baseline | 10 | 10 | 100% | Single-session, full context |
| Iranti-assisted | 10 | 10 | 100% | iranti_write + iranti_query |

**Differential: 0 percentage points.** The null result at this scale is expected.

---

## 5. Discussion

### 5.1 Interpreting the Null Result

A null differential at 5,500 tokens should be expected. At this transcript length, the complete conversation fits within Claude Sonnet 4.6's context window with comfortable margin. The baseline condition is essentially an open-book reading comprehension task: the agent has the full transcript before it, the facts are stated explicitly, and there is no delay or distractor between reading and answering. Context-reading in this condition is a ceiling condition for in-session recall.

The null result does not indicate that Iranti provides no benefit for episodic recall. It indicates that the benefit is not observable at this scale and under these conditions. The conditions under which a differential should emerge are identifiable:

1. **Transcript length exceeding context window.** When the transcript is long enough to require truncation or chunked reading, facts stated in truncated portions are not available to the context-reading condition. The Iranti arm, having written facts as they were encountered, is not subject to this limitation.

2. **Cross-session retrieval.** In a realistic long-running agent, a conversation from a prior session is not in the current context. The context-reading baseline cannot recall facts from a previous session at all; the Iranti arm can retrieve them via exact lookup regardless of when they were written.

3. **Fragmented or distracted attention.** At very long transcript lengths or with high density of superficially similar facts, language model attention begins to fragment. The B7 benchmark's date-cluster structure (April 10, 12, 19, 22) is specifically designed to stress-test exact recall vs. approximate recall. In a 100k-token transcript, the probability that the correct date is returned for each query with no cross-fact confusion is meaningfully less than 1.0. The Iranti arm's exact-match retrieval is not subject to this degradation.

### 5.2 The Similar-Value Distractor Structure

The four dates embedded in the closing turns of the B7 transcript (checkpoint freeze: April 10; phase 1 start: April 12; deployment deadline: April 19; stakeholder demo: April 22) represent what we term a similar-value distractor cluster. These values are:

- Numerically adjacent (spanning a 12-day window)
- Semantically related (all are project milestones)
- Positionally clustered (all in the second half of the transcript)
- Each attached to a distinct event that must be matched to the correct date

In the current execution, no confusion between these values was observed. This is consistent with what we should expect at 5,500 tokens with full context availability.

The significance of this structure lies in its predictive value for longer transcripts. When a system must recall "what was the checkpoint freeze date" from a 100k-token transcript that contains four closely spaced April dates, the probability of returning the wrong date — even with the correct general time range — is substantially elevated. This is a known failure mode for context-reading at scale. The Iranti arm stores each date under a distinct semantically named key (`checkpoint_freeze_date`, `phase1_start_date`, `deployment_deadline`, `stakeholder_demo_date`), enabling deterministic exact lookup that is immune to this interference.

The four-date cluster is thus intentionally designed as a future stress-test that happens to be benign at the current scale. Its presence in the benchmark ensures continuity across execution scales: the same distractor structure can be observed in both the no-interference baseline and the interference-present extended executions.

### 5.3 What the Iranti Arm Demonstrates

The Iranti arm's 10/10 result at this scale confirms that the write-and-retrieve pattern functions correctly for this task structure. All 12 facts were written successfully to a single entity (`project/b7_model_launch`), stored under semantically distinct keys, and retrieved with 100% accuracy. This is the expected behavior for `iranti_query` exact-match lookup and is consistent with prior B1 and B4 oracle results.

What the current execution does not demonstrate is any advantage of this approach over context-reading. The demonstration of advantage requires conditions where context-reading degrades. The methodology to produce those conditions is established by B7 and can be applied directly in extended executions.

### 5.4 Relationship to Prior Benchmarks

B7 joins B1 (entity retrieval) and B4 (multi-hop reasoning) in the series of Iranti evaluations using exact-match `iranti_query` retrieval. Across all three benchmarks, `iranti_query` has achieved 100% accuracy when applied to correctly identified entity/key pairs. This is the expected behavior for a deterministic indexed lookup and provides a consistent foundation for the program.

The B4 evaluation identified a failure in `iranti_search` for attribute-value discovery queries. B7 does not test `iranti_search`; the Iranti arm uses only `iranti_write` and `iranti_query`. The B7 result is therefore not affected by the B4 search failure and does not provide evidence about search capability.

---

## 6. Threats to Validity

### 6.1 Synthetic Transcript

The B7 transcript is entirely synthetic, generated specifically for this benchmark. It does not reflect the distribution of real multi-turn conversations in any domain. Real conversations exhibit properties not present in the synthetic transcript: topic drift, implicit fact statements, conversational hedging, corrections and restatements, and non-uniform turn lengths. In particular, real conversations are less likely to contain facts stated as unambiguous declarative assertions with no surrounding noise.

**Impact:** The synthetic transcript makes the task easier for the context-reading baseline than a realistic transcript would be. Explicit fact statements reduce the cognitive load of fact extraction. This means the baseline represents an upper bound on what context-reading can do in this evaluation, not a realistic estimate of deployed performance.

**Mitigation:** Future executions should include or exclusively use transcripts drawn from real conversational data. Suitable sources include meeting transcripts, interview data, or naturally occurring dialogue corpora.

### 6.2 Moderate Transcript Length

At approximately 5,500 tokens, the transcript is well within the context window of Claude Sonnet 4.6. The baseline is a ceiling condition in which there is no mechanism for recall failure. The primary phenomena of interest — positional decay, interference, truncation effects — do not manifest at this scale.

**Impact:** The 100% baseline accuracy is not a meaningful comparison point for Iranti. It establishes a floor (both systems work at this scale) but not a differential. The evaluation is methodologically valid but not discriminative at this scale.

**Mitigation:** Extended executions at 20k, 50k, and 100k+ token transcript lengths are required to observe the differential. The benchmark design is explicitly intended to scale to these lengths.

### 6.3 Self-Evaluation Bias

The transcript was generated by Claude Sonnet 4.6, and the baseline recall evaluation was also performed by Claude Sonnet 4.6. There is a direct risk that the model's recall performance on a transcript it generated is inflated: the model may retain implicit statistical traces of the transcript generation process that make specific fact recall easier than it would be for an independent evaluator reading an independently generated transcript.

This is a general limitation of LLM-as-evaluator methodologies. It is present in the current execution and cannot be fully eliminated without an independent evaluation harness.

**Impact:** Baseline accuracy may be slightly inflated relative to what an independent model would achieve. At this transcript length, the effect is unlikely to be material (the facts are explicit and unambiguous), but it should not be dismissed.

**Mitigation:** Future executions should use evaluation models distinct from the transcript generation model, or use a programmatic evaluation harness that compares string outputs against ground truth without LLM judgment.

### 6.4 Synchronous Write Assumption

The Iranti arm assumes that the agent writes each fact to the KB at the moment it is stated in the transcript. In the current execution, this write process is performed by the evaluating agent in a single pass; it does not simulate the asynchronous or interleaved nature of real agentic operation.

In a real deployed agent, fact writing must happen concurrently with conversation processing. An agent that misses a fact — because it was attending to another sub-task, because the fact was stated implicitly, or because the write failed — will not have it available for retrieval. The current execution does not test for this; it assumes perfect fact capture.

**Impact:** The Iranti arm result is an upper bound on what a real Iranti-assisted agent would achieve. In practice, recall accuracy may be lower if fact writing is imperfect.

**Mitigation:** Future executions should include a condition in which fact writing is imperfect — either by introducing simulated write failures, by requiring the agent to write facts while also performing other tasks, or by using a transcript in which some facts are stated implicitly and require inference to capture.

### 6.5 Single Execution

Both arms were executed once. A single trial does not permit estimation of variance. If there is any stochasticity in the baseline evaluation (e.g., from temperature sampling), repeated trials would be required to estimate the expected accuracy and its confidence interval.

At 100% accuracy on 10 questions, there is limited room for variance, but the absence of repeated trials is a methodological gap.

**Mitigation:** Repeated trials across different transcript instances are required before accuracy estimates can be treated as stable.

---

## 7. Conclusion

The B7 benchmark establishes a methodology for testing episodic memory recall in long multi-turn conversational contexts. Both the context-reading baseline and the Iranti-assisted arm achieved 10/10 (100%) recall accuracy on a 51-turn, ~5,500 token synthetic research planning transcript. The null differential at this scale is expected: the transcript is well within the Claude Sonnet 4.6 context window, and no mechanism for baseline degradation is present at this length.

The primary contribution of B7 is methodological. The benchmark identifies and encodes two structural features — positional distribution of facts across 51 turns, and a similar-value date distractor cluster spanning a 12-day window — that are specifically designed to produce measurable differentials at longer transcript lengths. The four adjacent April dates (April 10, 12, 19, 22) in particular represent a latent stress test: benign at 5,500 tokens, potentially discriminative at 50k–100k tokens where context-reading attention fragments and exact-match retrieval maintains precision.

The Iranti arm confirms that the write-and-retrieve pattern functions correctly at this scale. The result is consistent with prior B1 and B4 oracle findings: `iranti_query` exact-match lookup is reliable when the entity and key are correctly identified. The benchmark is designed to scale to the length regime where this reliability differential from context-reading becomes measurable.

---

## 8. References

Choi, E., et al. (2018). QuAC: Question Answering in Context. Proceedings of the 2018 Conference on Empirical Methods in Natural Language Processing (EMNLP 2018).

Liu, N. F., et al. (2023). Lost in the Middle: How Language Models Use Long Contexts. arXiv:2307.03172.

Packer, C., et al. (2023). MemGPT: Towards LLMs as Operating Systems. arXiv:2310.08560.

Reddy, S., et al. (2019). CoQA: A Conversational Question Answering Challenge. Transactions of the Association for Computational Linguistics, 7.

Shi, F., et al. (2023). Large Language Models Can Be Easily Distracted by Irrelevant Context. Proceedings of the 40th International Conference on Machine Learning (ICML 2023).

Tulving, E. (1972). Episodic and semantic memory. In E. Tulving & W. Donaldson (Eds.), Organization of Memory (pp. 381–403). Academic Press.

Wang, W., et al. (2023). LONGMEM: Enabling LLMs to Work With Ultra Long Context via Self-Guided Memory Retrieval. arXiv:2306.07174.

---

## Appendix A: Benchmark Specification

See `benchmarks/B7-episodic-memory/benchmark.md`.

## Appendix B: Conversation Transcript and Ground Truth

See `benchmarks/B7-episodic-memory/conversation-transcript.md`.

## Appendix C: Baseline Trial Record

See `results/raw/B7-baseline-trial.md`.

---

## Addendum: v0.2.16 Full-Protocol Rerun (2026-03-21)

### Version History

| Iranti version | Provider | Baseline arm | Iranti arm | Differential | Notes |
|---------------|----------|-------------|------------|-------------|-------|
| v0.2.12 | Mock LLM | 10/10 | 10/10 | 0 | Initial execution |
| v0.2.16 | OpenAI (real) | 10/10 | 10/10 | 0 | Full-protocol rerun |

### Observations

The v0.2.16 rerun executed the full B7 protocol — 51-turn transcript (~5,500 tokens), 10 probe questions — under an OpenAI real-provider configuration. Both arms achieved 10/10 (100%) correct recall. The provider change from mock to real LLM had no measurable effect on either arm's accuracy. This is consistent with the expected behavior at this transcript length: the task is well within the context window for the baseline arm, and the Iranti arm uses deterministic exact-match lookup that is independent of provider.

The null differential (0 percentage points) is confirmed on v0.2.16. The degradation regime — transcript lengths exceeding the context window or requiring cross-session retrieval — remains untested and is the primary target for future extended executions of this benchmark.

**Verdict: 10/10 both arms confirmed on v0.2.16 with real LLM provider. Null differential confirmed. No regression. Degradation regime still untested.**
