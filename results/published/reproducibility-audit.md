# Reproducibility Audit — Iranti Benchmarking Program

**Prepared by:** reproducibility_auditor
**Date:** 2026-03-21
**Scope:** Benchmarks B1, B2, B3, B4, B5, B6, B7
**Status:** Pre-publication. Findings in this report are blocking for any external claim.

---

## Executive Summary — Top 5 Reproducibility Risks (Severity Order)

### Risk 1 — CRITICAL: Closed-Loop Self-Evaluation (All Tracks)

The same model instance (Claude Sonnet 4.6) that generates the synthetic ground truth, executes the baseline arm, and evaluates whether its own answers are correct. This is the single most disqualifying feature of the current corpus. There is no independent check at any stage of the pipeline. The model's apparent 100% baseline accuracy in B1, B2, B4 (context arm), and B7 cannot be distinguished from self-consistency artifacts. A model that generates a fact and immediately reads it back from the same context window is not being tested for retrieval under any meaningful sense of "difficulty." No published benchmark in the memory or retrieval literature uses the generating model as the sole evaluator. This practice must be eliminated before any result is reported externally.

### Risk 2 — CRITICAL: KB Contamination via iranti_ingest Confirmed (B6, with Potential Propagation to B1)

Two independent trials (diana_voronova and kai_bergstrom) confirm that iranti_ingest writes values from existing KB entries rather than from the input text. The kai_bergstrom isolation test — where input ground truth values do not exist anywhere in the KB — produced 0/4 accuracy, and all four extracted values were verbatim copies of existing KB summaries for ticket/cp_t010 and cp_t011. This is not a probabilistic argument: verbatim summary duplication across two separate trials with different input texts eliminates coincidence as an explanation.

The contamination risk propagates: the oldest KB entries (ticket/cp_t010 and cp_t011) have unknown write provenance. If they were originally written via iranti_ingest (rather than structured iranti_write), their values are themselves potentially contaminated and cannot serve as reliable ground truth for the B1 Iranti retrieval arm (IA1–IA8). This chain of contamination cannot be closed without inspecting the write log for those entities.

### Risk 3 — HIGH: All Results Depend on a Single Iranti Instance in a Single State

Every trial across every benchmark was run against the same local Iranti instance at localhost:3001. This instance has accumulated KB entries across multiple sessions, has specific source reliability scores built up by prior writes, and has an indexing state that may not reflect a freshly initialised deployment. None of the following conditions have been tested: a clean instance (empty KB), a separate machine, a different Iranti version, or an instance after a restart. The B4 search failure, the B5 update behavior, the B6 contamination pattern, and the B3 LLM arbitration outcomes are all potentially instance-state-dependent. A replicating researcher starting from scratch would face a different KB state and cannot reproduce these trials.

### Risk 4 — HIGH: No Benchmark Track Has Sufficient Sample Size for Statistical Claims

The statistical reviewer has documented that no track meets the minimum sample size for a 95% confidence interval at ±5 percentage points. The smallest tracks (B3, B4, B5, B6) have 4–5 independent observations per condition. B1 and B7 have 10 questions per condition. B2 has 20. None of these are sufficient. Beyond sample size, no track has been repeated more than once, meaning there is zero empirical estimate of variance — for any claim in this program, the variance is unknown and cannot be inferred from the data. "100% accuracy on 10 questions" has a 95% Wilson confidence interval of approximately [69%, 100%], which is too wide for any useful claim.

### Risk 5 — HIGH: The Primary Hypothesis in B1 Has Not Been Tested in the Degradation Regime

B1 is designed to show that context-reading accuracy degrades as distractor density increases, while Iranti's exact lookup does not. This degradation never appears in the data because the maximum tested scale (~13,500 tokens, N=100) is far below the context length at which Claude Sonnet 4.6 begins to show retrieval failures (documented in NIAH literature as beginning at 32k–128k tokens). The benchmark has been executed at scales where the null result was predictable in advance. The intended differential has not been tested, and no claim about B1 comparative performance can be made until trials at N=500–1000 entities are completed.

---

## Per-Benchmark Section

### B1 — Entity Fact Retrieval under Distractor Density

**Rerunability:** Partially achievable. The synthetic entity list and question set are documented in `dataset.md` and `dataset-extended.md`. The haystack documents are reproducible from those files. However, several critical elements are missing: the exact system prompt and user message format used to present the haystack to the model are not version-controlled in a standalone file — they appear only in the trial records as prose descriptions ("Read the following registry and answer each question from the registry only"). A replicating researcher would need to reconstruct these prompts, which introduces prompt variation as an uncontrolled variable. The ground truth table is documented; the evaluation protocol (what counts as a correct match: exact string vs. semantic equivalence) is described in prose but not formally operationalized.

**Self-evaluation bias:** Severe. The same model (Claude Sonnet 4.6) designed the entities, wrote the haystack documents, answered the questions, and judged the answers correct. The 100% baseline score across all conditions (N=5, N=20, N=20+adversarial, N=100) is expected under self-consistency and provides no independent evidence of retrieval accuracy. The model's description of its own reasoning for each adversarial question (e.g., "the canonical entry (without the verification flag) lists MIT Computer Science") confirms that the model is applying its own judgment, not a mechanistic match.

**Single-trial risk:** Every condition is run once. There is no measurement of variance across runs. The 100% scores could reflect a consistent property (likely) or a lucky single draw (cannot be ruled out with n=1).

**Environment dependency:** The B1 Iranti retrieval arm (IA1–IA8) depends on entities ticket/cp_t010 and cp_t011 written by a prior agent in a prior session. These entities' write provenance is unverified. If the Iranti instance were reset or those entities deleted, the IA trials could not be reproduced without re-writing them — but re-writing them with the same values raises the question of whether those values are correct in the first place. The write arm (IB1–IB8, added 2026-03-21) is more reproducible because it uses verified structured writes.

**Population validity:** Two needle entities (alice_chen, bob_okafor) are tested. The benchmark structure (4 facts per entity, specific key names) is idiosyncratic. Results may not generalize to entities with more keys, nested structures, or ambiguous naming. All entities are fictional researchers with high-distinctiveness names, which reduces the difficulty of the retrieval task below what real-world entity populations would present.

**Instrumentation:** iranti_query is the primary Iranti tool tested. It is being tested correctly as an instrument (the question is whether it returns the right value for a given entity/key pair). No confound here for the write arm. The prior-session arm (IA trials) is less clean because the instrument is also the system that wrote the data being queried.

---

### B2 — Cross-Session Memory Persistence

**Rerunability:** The B2 write phase (20 structured writes) is reproducible from the documented ground truth table using iranti_write. The retrieval phase is reproducible by querying those entity/key pairs. However, the core claim — cross-session persistence — is not properly demonstrated by this trial. The write and retrieval phases occurred within the same agent session. The cross-session evidence cited in the report is incidental data from B1 (different entities, written by a different agent, serving a different purpose). A replicating researcher would need to execute a protocol that explicitly separates write and retrieve into two distinct agent invocations with no shared context, which this trial did not do.

**Self-evaluation bias:** Lower than other tracks. Exact key-value retrieval via iranti_query is evaluated by comparing the returned value to the documented ground truth table. The evaluation is close to automated string matching. However, the ground truth itself was generated by the same model, so circular ground truth risk applies.

**Single-trial risk:** The 20 writes are a single pass with no repetition. There is no test of whether the same 20 writes would succeed on a second execution (e.g., due to the conflict resolution system blocking duplicate writes from the same source). On second execution, most writes would likely be rejected as duplicates or same-source lower-confidence re-writes. The trial is not cleanly re-runnable without either clearing the KB or changing source labels.

**Environment dependency:** Very high. B2's core claim is that the KB persists across sessions, which is an instance-state property. A fresh instance with no prior writes would show the same write-then-read behavior intra-session. The durability claim depends on the specific instance's persistence configuration. A cloud-hosted, containerised, or ephemeral instance might behave differently.

**Population validity:** 5 entities × 4 keys = 20 facts, all of the same schema type (researcher profiles). Complex nested objects, large values, or binary data have not been tested for persistence reliability.

**Instrumentation:** iranti_write and iranti_query are both tested here. The write tool is part of the system being evaluated. A write failure would be indistinguishable from a persistence failure if not independently confirmed.

---

### B3 — Conflict Resolution Accuracy

**Rerunability:** The deterministic cases (C1 and C2) are fully reproducible: the scoring formula is documented, the inputs are documented, and the outcomes follow mechanically from the formula. A replicating researcher running the same writes will get the same results. The LLM arbitration cases (C3, C4, C5) are not reproducible in a strong sense: LLM arbitration involves a language model making a judgment, which may vary across runs. The C3, C4, and C5 outcomes each happened once. In repeated trials, the LLM might reach different conclusions, especially for near-tied scores.

**Self-evaluation bias:** Moderate. The evaluation is primarily reading Iranti's API response (action: accepted / rejected, reason string). This is close to objective. However, the mapping from "reason string" to "was this the right decision" is made by the same model running the benchmark. In C5, the model observed that the LLM arbitration used source names as semantic signals and judged this an "important finding" rather than an error — a qualitative judgment that a different evaluator might frame differently.

**Single-trial risk:** High for LLM arbitration cases. C3, C4, and C5 each have n=1. The arbitration outcome in each case may not be representative. In particular, C5 — where the adversarial write had higher raw and weighted scores but was rejected — is a striking result that should be tested across many runs before being characterized as typical behavior. If C5 is re-run 20 times and the LLM sometimes accepts the adversarial value, the finding changes substantially.

**Environment dependency:** Source reliability accumulates within the session. The scores reported (e.g., "0.85 multiplier" suggesting reliability ~0.5) depend on the source labels and their prior write history in this instance. A fresh instance with no prior writes from the benchmark sources would show the same scores (both start at default). But the c5 source ("b3_trusted_reviewer" vs "b3_low_reliability") result depends on LLM semantics, which would not change across instances — but could change across model versions.

**Population validity:** All five conditions test the same key type (affiliation, a string institution name). Conflict resolution behavior for numeric keys, temporal ranges, and complex objects is untested. The C2 limitation (first high-confidence write blocks corrections) is likely general, but the specific score thresholds are formula-derived and do not depend on key type. LLM arbitration behavior for numeric conflicts may differ from institution-name conflicts.

**Instrumentation:** iranti_write is the instrument doing double duty as both the test stimulus delivery mechanism and the system being tested. This is unavoidable given the benchmark design, but it means a malfunction in write delivery would be indistinguishable from a conflict resolution failure.

---

### B4 — Multi-hop Entity Reasoning

**Rerunability:** The context-reading baseline is fully reproducible: the 6-entity document and 4 questions are documented. The Iranti search-based arm is not reproducible because its failure is attributable to either (a) vector embedding indexing lag for newly written entities or (b) a structural TF-IDF degradation issue when search terms appear in multiple KB entries. The B4 search mechanism analysis document confirms that the failure is structural (vectorScore=0 across all searches, TF-IDF degrades for non-distinctive terms), not a timing artifact — but this conclusion itself was reached within the same session. A replicating researcher would need to reproduce the specific KB state (same entities present with the same summary strings) to replicate the exact TF-IDF behavior. If the KB were populated differently, search behavior might differ.

**Self-evaluation bias:** Moderate for the context-reading baseline (same model reads a document it generated and evaluates its own answers). Low for the Iranti arms: the oracle arm evaluation is exact key-value matching; the search arm failure is observable from the API response (entity not in top results).

**Single-trial risk:** 4 questions total. The context-reading 100% and oracle 100% are over n=4 each. The search-based 25% (1/4) is over n=4. Q4 succeeded, Q1-Q3 failed. The one success (Q4, Google DeepMind) was attributed to that term's distinctiveness in the KB at the time of the search. If the KB contained more entities with Google DeepMind as a previous employer, Q4 would also fail — making the 25% score a KB-state artifact rather than a stable capability measurement.

**Environment dependency:** Very high. The B4 search results are directly dependent on the KB state at the time of the search: which terms are distinctive (low TF-IDF weight due to rare occurrence) and which are not. The finding that vectorScore=0 across all searches suggests vector embeddings are not indexed for these entities — this could be a configuration setting, a version behavior, or an indexing lag that would resolve in a different run. A replicating researcher cannot reproduce the exact KB state without the same prior write history.

**Population validity:** 4 multi-hop questions over 6 entities. The question set was designed specifically around this entity set. The "discovery by attribute value" failure is structurally plausible as a general limitation, but it has only been observed in this one KB configuration. The general claim ("iranti_search cannot support multi-hop discovery in the current implementation") is better supported by the mechanism analysis than by the 1/4 score.

**Instrumentation:** iranti_search is one of the primary tools being evaluated and is also the tool that failed. The failure mode is partially characterised (TF-IDF degradation, absent vector scores) but the internal mechanism is not observable. It is not known whether the search failure reflects a configuration error, a version bug, or intended behavior at the current KB size.

---

### B5 — Knowledge Currency / Temporal Update

**Rerunability:** The deterministic cases (T1b, T2, T3) are reproducible for the same reasons as B3's deterministic cases: outcomes follow from the scoring formula given documented inputs. The LLM arbitration cases (T1, T4) are not reproducible with guaranteed identical outcomes. The source reliability accumulation dynamic (the "~0.62 after 4 writes" estimate) is inferred from observed scores rather than directly read from the API — this inference may be incorrect, and a replicating researcher cannot verify it without access to source reliability internals. The B5 write sequence must be executed in order (a write's outcome depends on what has been written before in the same source's history), making partial re-execution invalid.

**Self-evaluation bias:** Low. The evaluation is primarily observing Iranti API response states (accepted / rejected, reason, action). The evaluator is reading system output, not judging answer quality. The only judgment involved is the interpretation of the reason string, which is done by the same model.

**Single-trial risk:** High. Each condition is tested once. The LLM arbitration cases (T1 and T4, both rejections) could be different on re-run. The B5 findings about the source reliability threshold (~12 raw confidence points needed for a new-source update to succeed) are derived from 2 LLM-arbitrated outcomes. This threshold inference should be treated as a hypothesis.

**Environment dependency:** Significant. The source reliability values that gate update behavior accumulate as writes occur. The session-specific reliability state is described but not directly observable. A fresh instance would start with the same default reliability (0.5) and replicate the early-session behavior. But the claim that "established source entries have higher weighted scores" depends on the reliability accumulation having occurred — which requires the prior write history to be reproduced in sequence. This makes B5 the most order-dependent benchmark in the program.

**Population validity:** All update tests use a single entity and a single key type (affiliation). The update behavior for numeric keys, temporal ranges, and structured objects is unknown. The source reliability mechanism likely applies uniformly, but LLM arbitration behavior for conflicting numbers or dates might differ from conflicting institution names.

**Instrumentation:** iranti_write is again both the delivery mechanism and the system under test. The conflict resolution system is invoked by the act of writing, and the write tool is the only interface to it. This is unavoidable.

---

### B6 — iranti_ingest Text Pipeline

**Rerunability:** The input texts (diana_voronova, kai_bergstrom) are fully documented. The extraction failure is highly reproducible: the same contamination source (ticket/cp_t010 and cp_t011) produced verbatim duplicate summaries across two independent trials with different input texts. However, the failure is reproducible only against this specific KB state (with cp_t010 and cp_t011 as the dominant researcher-profile entries). Against a fresh instance with no prior entries, results would differ — and the isolation test recommendation in B6 (test with empty KB) has not been executed. A replicating researcher on a fresh instance would likely not reproduce the contamination and might incorrectly conclude the pipeline works.

**Self-evaluation bias:** Low. The evaluation is a direct comparison of extracted values to ground truth values documented before the trial. The ground truth (University of Helsinki, 52, Siemens Research, quantum machine learning) is straightforward and unambiguous. The model's assessment of the extracted values as wrong is correct by inspection.

**Single-trial risk:** Each entity was tested once. The contamination pattern is consistent across both trials (same wrong values, same source entities), which is strong circumstantial evidence. But the mechanism is unobservable: the Librarian's internal extraction prompt cannot be inspected. It is possible (though unlikely given the verbatim summary duplication) that a third trial with a different input entity would produce different behavior.

**Environment dependency:** Extreme. The entire B6 finding depends on ticket/cp_t010 and cp_t011 being the dominant researcher-profile entries in the KB. These entities were written in a prior session. If the instance is restarted, if those entities are deleted, or if a large number of other researcher-profile entities are written before B6 is re-run, the contamination source might change. The KB state at the time of ingest is a hidden variable that cannot be fully controlled without an isolated namespace.

**Population validity:** Two input texts, two entity types (both researcher profiles). It is unknown whether the contamination behavior occurs for non-researcher entities (e.g., product descriptions, code artifacts, meeting records). The finding is credible for the researcher-profile schema because the Librarian plausibly uses KB context to ground extraction in this domain. Whether the same mechanism applies to other schemas is unknown.

**Instrumentation:** iranti_ingest is the primary tool tested. Its internal extraction logic (the "Librarian") is a black box. The only observable outputs are the written KB entries. This opacity is the central limitation: the contamination hypothesis is confirmed by output comparison but the mechanism cannot be verified without access to the Librarian's extraction prompt and the retrieval queries it issues during extraction.

---

### B7 — Conversational Episodic Memory

**Rerunability:** The 51-turn conversation transcript is documented in `conversation-transcript.md`. The 12 embedded facts and 10 probe questions are documented in `benchmark.md`. The baseline trial record documents answers and a score. The Iranti arm is described in the benchmark file but the raw Iranti trial record (fact-by-fact write and retrieve log) is missing: the benchmark.md states "10/10 (100%)" for the Iranti arm but references `[see B7-baseline-trial.md]` for the baseline, and the Iranti arm log is not a separate file. A replicating researcher cannot verify the Iranti arm's write operations, intermediate states, or exact API responses — only the final 10/10 score.

**Self-evaluation bias:** Severe. The same model that generated the 51-turn synthetic transcript also answered the probe questions from that transcript in the baseline arm and evaluated those answers as correct. A model reading a document it generated and answering factual questions about it within the same context window is a tautological test: the model has never truly "forgotten" the facts — they are in its immediate context. The 10/10 baseline result is not evidence of memory performance; it is evidence of in-context document reading, which is a different capability.

**Single-trial risk:** Both arms are single runs. The Iranti arm is particularly opaque (see above: no detailed trial log). The 10/10 baseline result is not surprising at this transcript length (5,500 tokens), but whether the same model would score 10/10 on a genuinely challenging recall test (fragmented context, delayed retrieval, degraded facts) is unknown. Similarly, the Iranti arm's 100% result would be expected for exact key-value retrieval via iranti_query, but it needs to be demonstrated in a context where writes were spread across a genuinely asynchronous multi-session interaction, not a synchronous single-session write-then-query cycle.

**Environment dependency:** The Iranti arm depends on the KB state and the write operations completing successfully during the simulated conversation. If the Iranti instance had write failures during fact recording, the arm would score lower. Write failures are not documented as having been monitored.

**Population validity:** One synthetic transcript about a fictional model launch project. The 12 embedded facts are all of high-salience types (dates, numbers, named roles). Real conversations contain facts embedded with much lower salience, amid more distracting irrelevant content, and without the benefit of having been designed by the evaluating model. The benchmark does not test the scenario it nominally targets: an agent operating in a long work session with genuinely fragmented memory.

**Instrumentation:** iranti_write and iranti_query are used in the Iranti arm. Because the write arm log is missing, it is not possible to audit whether the writes were issued correctly, whether any were rejected by the conflict resolution system, or whether the retrieval was from a correctly populated KB.

---

## Global Issues (Applying Across All Tracks)

### G1 — No Version Control on Prompts

The system prompt and user message format used to present haystacks, questions, and instructions to the baseline model are described in prose within trial records but not stored as versioned, executable files. A replicating researcher must reconstruct these prompts from prose descriptions, introducing uncontrolled prompt variation. In LLM evaluation, prompt wording is a significant determinant of performance. Without exact prompt reproducibility, results are not replicable in the strict sense.

### G2 — No Iranti Version Recorded

None of the benchmark files record the Iranti instance version, build, or commit hash at the time of execution. The `iranti doctor` command can report this information. If Iranti is updated between the current trials and a replication attempt, the conflict resolution scoring formula, the Librarian extraction behavior, the search indexing algorithm, and the LLM arbitration model may all change. B3, B4, B5, and B6 findings are particularly version-sensitive.

### G3 — No Session IDs or API Response Provenance

The trial records document model responses and Iranti API responses as quoted text, but no session IDs, request IDs, or timestamps are logged for individual API calls. There is no way to retrieve the original API responses for audit. The trial records are the only evidence that the quoted responses are accurate. If a trial record contains a transcription error, there is no independent check.

### G4 — Synthetic Entities Created and Evaluated by the Same Model

All benchmark entities (alice_chen, bob_okafor, priya_nair, james_osei, yuki_tanaka, fatima_al_rashid, marco_deluca, diana_voronova, kai_bergstrom, b7_model_launch) are fictional entities whose facts were generated by Claude Sonnet 4.6 for the purpose of this benchmark. The same model then answered questions about these entities and evaluated its own answers. This creates a three-way circularity: stimulus generation, response generation, and response evaluation are all performed by the same system. The statistical reviewer has correctly identified this as "circular ground truth." It cannot be corrected post-hoc; it must be eliminated by design.

### G5 — Baseline Comparison Is Missing for Most Tracks

B3, B5, and B6 have no baseline arm. B2's baseline is definitional (LLM statelessness is asserted, not measured). B7's baseline arm exists but is not a meaningful comparison (both arms tested at well within the model's context window). Only B1 and B4 have genuine two-arm comparisons, and neither produces a defensible differential. The core scientific question — "what changes when Iranti is in the loop?" — cannot be answered without a genuinely controlled baseline condition. A baseline that records the identical measurement under identical conditions except for Iranti's presence is required for every track.

### G6 — KB State Is a Hidden Confound Across All Tracks

All benchmarks ran against the same accumulating KB. Entities written in B1 trials were present during B4 searches. Entities written in B4 were present during B6 ingest. The B6 contamination source (ticket/cp_t010 and cp_t011) originated in a pre-benchmark session. The KB state is a hidden variable affecting every Iranti tool call across every track. Benchmark-level isolation (dedicated namespaces or fresh instances per track) is required to remove this confound.

### G7 — No Test of Error Cases

No benchmark track tests what happens when iranti_query is called for an entity or key that does not exist, when iranti_write fails under load, when the Iranti instance is restarted mid-trial, or when network errors occur. All trials proceeded under clean conditions with a functioning instance. Reliability and error-handling characteristics are completely untested.

---

## Required Steps Before Any Result Can Be Called "Reproducible"

The following steps are listed in dependency order. Steps 1–5 are blocking for all tracks. Steps 6–10 are blocking for individual tracks.

### Step 1 — Lock ground truth before any trial execution (All tracks)

For every benchmark, define and commit the ground truth table to a version-controlled file before running any baseline or Iranti arm. The ground truth file must not be generated by the same model that will be evaluated against it. Options: human-authored synthetic data, data drawn from a published external dataset, or data generated by a different model with human review before use.

### Step 2 — Implement independent evaluation (All tracks)

Replace self-evaluation with one of: (a) automated string matching against the locked ground truth file, (b) a separate judge model (different from the model being evaluated, different from the model that generated the stimulus), or (c) human evaluation for qualitative assessments. The evaluation code must be scripted and version-controlled, not run interactively.

### Step 3 — Record Iranti version at every trial execution (All tracks)

Add a mandatory header field to every trial record: `iranti_version: [output of iranti doctor --instance local]`. This must be done before the trial begins.

### Step 4 — Record full API response provenance (All tracks)

Log every iranti_write, iranti_query, iranti_search, and iranti_ingest call with: timestamp, entity, key, input parameters, full API response (not paraphrased). Store logs in a machine-readable format (JSON lines or equivalent) separate from the narrative trial records.

### Step 5 — Isolate each benchmark track in its own KB namespace (All tracks)

Run each benchmark track against either a fresh Iranti instance or an isolated namespace that contains no data from other tracks and no pre-existing KB entries. The KB state at the start of every trial must be documented and reproducible.

### Step 6 — Re-run B6 against an empty KB and confirm contamination mechanism (B6)

Reproduce the kai_bergstrom isolation test against an instance with no prior KB entries. If the contamination disappears on an empty KB, the mechanism is confirmed as KB-context-during-extraction. If contamination persists, a different mechanism is involved. This test is required before B6 can be reported as either a confirmed defect or a resolved issue.

### Step 7 — Verify write provenance of ticket/cp_t010 and cp_t011 (B1)

Inspect the write log for the two prior-session entities used in the B1 IA arm. Confirm the write method (iranti_write vs. iranti_ingest). If iranti_ingest was used, the B1 IA results are contaminated and must be re-run with entities written via verified structured writes.

### Step 8 — Re-run B4 under controlled indexing state (B4)

Confirm whether vector embeddings are indexed for researcher entities by querying index metadata or inspecting the Iranti configuration. Re-run the B4 search arm after at least 24 hours have elapsed since entity writes, or after explicitly triggering reindexing if that operation exists. Document the indexing state before and after. Until this is done, the B4 1/4 result has two possible interpretations (indexing lag vs. structural failure) that lead to entirely different conclusions.

### Step 9 — Re-run B3 and B5 LLM arbitration cases n≥20 each (B3, B5)

LLM arbitration outcomes are stochastic. C3, C4, C5 (B3) and T1, T4 (B5) each have n=1. The characterization of LLM arbitration behavior as "conservatively favoring the established source" is based on 5 single observations across two benchmarks. Run each condition at least 20 times. Report the distribution of outcomes, not just the single observed outcome.

### Step 10 — Produce a genuine cross-session isolation protocol for B2 and B7 (B2, B7)

For B2: execute the write phase in one agent invocation, fully terminate it, start a new agent invocation with no shared context, and execute the retrieval phase. Document the session boundary explicitly (timestamps, no context carry-over). For B7: the Iranti arm must be executed with writes occurring asynchronously across genuinely separate context windows, not within a single synchronous session that simulates a conversation. Add the missing Iranti arm trial log for B7.

---

## Disposition Summary

| Benchmark | Primary finding | Reproducible as stated? | Blocking issues |
|-----------|----------------|------------------------|-----------------|
| B1 | Null result at N≤100 | Partially | Self-evaluation, missing prompt spec, cp_t010/t011 provenance, degradation regime untested |
| B2 | KB persists across sessions | No | Intra-session masquerading as cross-session, definitional baseline |
| B3 | Conflict resolution formula confirmed; C2 limitation; C5 LLM source-name finding | Deterministic cases: yes. LLM cases: no | LLM arbitration cases n=1; no variance estimate |
| B4 | iranti_search fails at attribute-value discovery | No | Indexing state unknown; result is KB-state-dependent; n=4 |
| B5 | New sources cannot reliably update established facts | Deterministic cases: yes. LLM cases: no | LLM arbitration cases n=1; threshold inferred not observed; order-dependent |
| B6 | ingest pipeline writes KB entries, not input text | No (fresh-KB test not run) | Contamination mechanism unobserved; isolation test required |
| B7 | Iranti-assisted recall 10/10 vs context-reading 10/10 | No | Self-evaluation; missing Iranti arm log; both arms at same scale (5,500 tokens, no challenge) |

**Current program status:** No benchmark track meets the minimum standard for a reproducible finding. The mechanistic findings in B3 and B5 (deterministic resolution cases only) are the closest to reproducible because they follow directly from documented formulas with no LLM judgment involved. The contamination finding in B6 is compelling circumstantially but requires the fresh-KB isolation test to be a confirmed finding rather than a strong hypothesis. Everything else requires the cross-cutting fixes in Steps 1–5 before individual track work is meaningful.

---

*This audit is a blocking document. The research program manager should treat the steps listed above as prerequisites, not suggestions, before any findings from this program are communicated externally.*

---

## v0.2.14 Rerun Audit — 2026-03-21

### New critical risk: LLM_PROVIDER=mock confound

The Iranti instance under test has been running with LLM_PROVIDER=mock throughout the entire benchmarking program (v0.2.12 and v0.2.14). Any benchmark that exercises an LLM-dependent Iranti subsystem (notably iranti_ingest, iranti_attend, and potentially iranti_observe's entity detection) may be testing mock LLM behavior rather than production LLM behavior. This is a critical confound that was not identified during the v0.2.12 program.

**Affected findings:**

- **B6 (ingest):** The contamination finding from v0.2.12 (verbatim KB entry values written as extracted facts) must be treated as potentially a mock artifact. In v0.2.12, the mock returned canned KB data; in v0.2.14, the mock returns empty (extractedCandidates=0). The difference in behavior across versions tracks the mock implementation change, not the production Librarian extraction logic. The v0.2.12 finding is reclassified from "confirmed critical defect" to "plausible mock artifact — requires retest with real LLM provider." The controlled isolation contrast (diana_voronova vs kai_bergstrom) retains its internal consistency but cannot be attributed to production behavior until the real LLM provider is tested.

- **B11 (attend):** The classifier fix observed in v0.2.14 (no more classification_parse_failed; shouldInject=true with correct reasoning) may reflect a mock-to-mock behavioral change rather than a production pipeline fix. The reliability of this improvement under a real LLM provider is untested.

- **B11 (observe):** The auto-detection failure (detectedCandidates=0 in both v0.2.12 and v0.2.14) may be a mock artifact. Whether iranti_observe's entity detection functions correctly under a real LLM provider is unknown.

**Recommendation:** Configure the instance with a real LLM provider (OpenAI or Anthropic) and rerun B6, B11-attend, and B11-observe before publishing conclusions about these capabilities. This is now a blocking prerequisite for any external communication about ingest, attend, or observe findings.

### New noise entry finding

A KB entry user/main/favorite_city (confidence 92) is present in the instance and is appearing in retrieval result slots across multiple benchmarks in the v0.2.14 rerun, including B11. This entry appears to be session memory written by Iranti's own memory infrastructure (not by benchmark writes). Its presence contaminates retrieval rankings by consuming result slots that should be occupied by benchmark-relevant entities.

This finding has two reproducibility implications:

1. **Benchmark isolation is not achieved by namespace strategy alone.** If Iranti's memory infrastructure writes to the same KB namespace used by benchmarks, isolation requires either explicit cleanup of infrastructure-written entries before each trial or a namespace configuration that prevents infrastructure writes from reaching the benchmark namespace.

2. **KB state documentation is incomplete.** The KB state at the start of each trial must include infrastructure-written entries, not only benchmark-written entries. Current trial records do not document the presence of infrastructure entries such as user/main/favorite_city.

### iranti_search runtime crash (v0.2.14)

iranti_search now crashes before returning results (spread/iterator error; pgvector still unreachable). This is a regression from v0.2.12, where iranti_search returned degraded but observable results (vectorScore=0, partial TF-IDF retrieval). The v0.2.14 crash affects B4 and B9 directly.

**Reproducibility impact:** Any replication attempt on v0.2.14 will observe this crash rather than the v0.2.12 degraded-but-observable behavior. The v0.2.12 mechanism investigation findings (vectorScore=0 across all entries; TF-IDF degradation for non-unique terms) were produced under a different runtime state and cannot be reproduced on v0.2.14. The crash is itself reproducible on v0.2.14, but it constitutes a different failure mode than what was characterized in the v0.2.12 structural finding.

**Updated disposition for Step 8 (B4 re-run under controlled indexing state):** The prior step required confirming the indexing state and re-running the B4 search arm after indexing stabilization. This step is now blocked by the runtime crash. Step 8 cannot be executed on v0.2.14 until the crash is resolved. The step remains on the critical path but is currently unexecutable.

### Updated disposition table

| Benchmark | v0.2.12 reproducibility status | v0.2.14 change | Updated status |
|-----------|-------------------------------|----------------|----------------|
| B4 | Not reproducible (KB-state-dependent; indexing state unknown) | iranti_search crashes before returning results | Worse — crash blocks any replication attempt |
| B6 | Not reproducible (fresh-KB test not run; mechanism unobserved) | LLM_PROVIDER=mock confirmed as confound; extractedCandidates=0 | Primary finding reclassified — mock confound is new blocking issue |
| B9 | Write-only finding reproducible; retrieval side untested | Unchanged (iranti_search crash noted) | Unchanged |
| B11 attend | Not reproducible (classification_parse_failed; n=1) | Classifier fix observed; reproducibility of fix under real LLM untested | Partial improvement — mock confound still applies |
| B11 observe | Not reproducible (auto-detection failure; mechanism unknown) | Unchanged (detectedCandidates=0) | Unchanged — mock confound may explain failure |

---

## v0.2.16 Rerun Audit — 2026-03-21

### 1. Three Improvements to Reproducibility Posture

**Improvement 1: LLM_PROVIDER=openai confirmed — mock confound resolved**

The most consequential reproducibility risk from the v0.2.14 audit has been resolved. The Iranti instance under test in v0.2.16 is confirmed to use LLM_PROVIDER=openai (real production provider). This eliminates the mock confound that applied to B6, B11-attend, and B11-observe in all prior versions. Findings from v0.2.16 for these tracks can now be attributed to the production pipeline rather than to mock LLM behavior. The v0.2.14 audit recommendation — "configure the instance with a real LLM provider before publishing conclusions about ingest, attend, or observe findings" — is satisfied. This is a prerequisite clearance, not a statistical improvement: all other sample size and self-evaluation limitations remain in force.

**Improvement 2: B6 contamination hypothesis resolved — clean baseline established**

The v0.2.12 contamination finding (ingest writes KB entry values verbatim rather than extracting from input text) is confirmed as a mock LLM artifact. Under LLM_PROVIDER=openai, B6 produces 8/8 correct extractions across two prose entities with no contamination. The controlled isolation contrast from v0.2.12 (diana_voronova vs. kai_bergstrom) retains its internal validity as a test of the mock pipeline's behavior, but cannot be attributed to the production Librarian. The B6 audit risk changes from "confirmed critical defect" to "mock-specific artifact — production pipeline functional." The B1 contamination propagation risk (ticket/cp_t010/cp_t011 write provenance) was predicated on the contamination being a production-pipeline defect; that chain is now materially weakened, though write provenance remains unverified.

Sub-key decomposition (compound facts split into multiple sub-keys) is a newly observed ingest behavior that must be documented in the benchmark protocol. It is not a defect but creates a scoring ambiguity: expected-key-name matching fails when ingest produces decomposed sub-keys. Future B6 replication attempts must specify whether evaluation is by exact key-name match or by value recovery in any key.

**Improvement 3: iranti_related and iranti_related_deep documented as new tools requiring protocol**

B9 now uses two MCP tools (iranti_related, iranti_related_deep) that did not exist in v0.2.14. These tools are functional and read relationship edges correctly. Their absence in prior versions was the source of the "write-only" audit finding for B9. For reproducibility purposes: any replication of B9 on v0.2.12 or v0.2.14 will not have access to these tools and cannot replicate the retrieval arm. The benchmark protocol for B9 must document the minimum Iranti version required (v0.2.16 or later) and must specify that iranti_related_deep has no filter parameter — client-side filtering is required in the replication protocol. These are new behavioral contracts that have not yet been formally documented in B9's benchmark spec.

### 2. Persistent Risks

**Persistent risk 1 — CRITICAL: Self-evaluation bias (C1, unchanged)**

The same model (Claude Sonnet 4.6) continues to generate synthetic ground truth, execute benchmark arms, and evaluate correctness of its own outputs. This is the unchanged C1 risk from the original audit and the v0.2.14 update. No independent evaluation mechanism has been implemented. This risk is unresolved and continues to be blocking for all external publication claims. It is not addressable within v0.2.16 findings; it requires experimental redesign.

**Persistent risk 2 — HIGH: KB state accumulates across sessions; noise entry persists**

The user/main/favorite_city entry (confidence 92), first identified in the v0.2.14 audit as a session memory entry written by Iranti's own infrastructure, continues to occupy retrieval result slots in v0.2.16. It appears in the attend natural condition (B11), consuming one slot that should be occupied by a benchmark-relevant entity. The noise entry persists across all three version upgrades tested (v0.2.12 through v0.2.16), confirming that it is not automatically cleared by version upgrade.

Reproducibility implications:
- A replication run on a fresh instance will not have this entry and may produce different attend/observe scores.
- A replication run on this specific instance after additional sessions may have more infrastructure-written entries, producing further score degradation.
- The KB state at the start of each trial is not fully documented. Infrastructure-written entries are not recorded in trial records alongside benchmark-written entries.

This risk has not worsened since v0.2.14 but also has not been addressed. Benchmark isolation from infrastructure writes remains incomplete.

**Persistent risk 3 — HIGH: Special character parse failure creates silent fact exclusion**

A new defect identified in v0.2.16 B11: values containing "%" or "/" characters trigger parse_error or invalid_json during attend/observe result scoring, causing those values to be silently excluded from the scored set. This is a systematic reproducibility risk with the following properties:

- The failure is silent: a trial that encounters parse errors will appear to have a lower-than-expected number of recovered facts without any error flag in the trial record.
- The failure is fact-content-dependent: replication runs that use different fact values (without special characters) will produce different scores, creating a spurious apparent improvement even if no functional change occurred.
- The affected value class is broad: percentage metrics (99.9%), file paths (/usr/local/config), URLs (https://...), ratio expressions (4:1), version strings (v2.0/stable), and SLA-format values ("99.9% / 4h SLA") are all representative.
- The defect has not been confirmed fixed in v0.2.16. It is an open bug at the time of this audit.

Required protocol response: all benchmark fact sets must prospectively document which values contain special characters. Trial records must distinguish parse_error exclusions from accuracy failures. Scores from trials with parse errors must be reported as "n recovered / m attempted, k excluded by parse error" rather than as a single accuracy rate. Until this is enforced, B11 scores and any future track using observe/attend scoring are not comparable across runs.

**Persistent risk 4 — MODERATE: B12 and B13 are single-run new tracks — not yet replicated**

B12 (session recovery) and B13 (upgrade safety) each have a single execution run in v0.2.16. Their findings are directional existence proofs, not characterized performance rates:
- B12's 5/8 for observe-with-hint and 0/8 for handshake are based on one trial each. The 5/8 result in particular — which reflects a meaningful capability gradient (setup facts recovered, progress facts not) — should be replicated to confirm the pattern holds across different session content types and write volumes.
- B13's 3/3 durability confirmation is an existence proof that upgrade did not corrupt KB state in this instance. It does not characterize the failure probability of KB corruption under upgrade.

Neither track has been replicated, no variance estimate exists, and the trial protocol is not yet formalized in a benchmark spec document. These tracks carry single-run risk in addition to all cross-cutting risks (self-evaluation, KB state accumulation, no prompt versioning).

### 3. Resolved Risks from Prior Audit

**Mock LLM confound: RESOLVED**

Status in v0.2.14 audit: CRITICAL — LLM_PROVIDER=mock throughout entire benchmarking program; all LLM-dependent subsystems (iranti_ingest, iranti_attend, iranti_observe) may be testing mock behavior rather than production behavior.

Resolution in v0.2.16: LLM_PROVIDER=openai confirmed. B6 8/8 under real provider. B11 observe auto-detection fixed and functional. B11 attend scoring improved. The mock confound no longer applies to v0.2.16 trials.

Residual: v0.2.12 and v0.2.14 trial records for B6, B11-attend, and B11-observe remain potentially confounded by mock behavior and cannot be retroactively cleaned. They should be treated as version-specific observations, not as characterizations of the production pipeline.

**B9 write-only finding: RESOLVED**

Status in v0.2.14 audit: HIGH — no MCP retrieval tool existed for relationship edges; B9 was a write-only demonstration.

Resolution in v0.2.16: iranti_related and iranti_related_deep are present and functional. 4/4 edges readable. Depth=2 traversal confirmed. B9 is now a complete two-sided benchmark. The write-only finding is retired.

**iranti_search runtime crash: RESOLVED**

Status in v0.2.14 audit: HIGH — iranti_search crashes before returning results (spread/iterator error; pgvector unreachable); blocks B4 and B9 replication.

Resolution in v0.2.16: crash is fixed. iranti_search returns results with non-zero vectorScore (0.35–0.74). pgvector appears operational. B4 search-based arm is now partially functional (direct attribute queries work; semantic paraphrase queries still fail). The crash no longer blocks replication attempts.

Residual: the semantic paraphrase failure in B4 is an open capability limitation, not a crash. It is a reproducibility risk of a different kind: future replication runs must use the same query formulation conventions (direct attribute terms rather than paraphrased descriptions) to obtain comparable results.

### 4. Updated Disposition Table

| Benchmark | v0.2.14 reproducibility status | v0.2.16 change | Updated status |
|-----------|-------------------------------|----------------|----------------|
| B4 | Crash blocks replication | Crash fixed; vectorScore active; direct attribute queries functional; paraphrase still fails | Partial — replication feasible for direct-attribute condition; paraphrase condition not replicable as successful |
| B6 | Mock confound blocks production interpretation | Real LLM provider confirmed; 8/8 clean extraction; sub-key decomposition behavior documented | Improved — production baseline established; n=8 single entity type; sub-key counting convention not yet standardized |
| B9 | Write-only — no retrieval tool | iranti_related and iranti_related_deep functional; 4/4 edges | Substantially improved — write-only risk retired; new tools require version-gating in protocol |
| B11 observe | Mock confound; detectedCandidates=0 | Auto-detection fixed under real provider; 5/6 with hint; special char parse defect | Improved — production behavior now observable; parse defect is new open risk |
| B11 attend | Mock confound; classifier fixed but untested under real LLM | 4/6 natural, 5/6 forceInject; noise entry persists; parse defect | Improved — real-provider results in hand; persistent risks (noise, parse defect) apply |
| B12 | New track | 0/8 baseline, 5/8 observe-hint, 8/8 explicit query, 0/8 handshake | New — single run; not yet replicated; capability gradient finding is directional |
| B13 | New track | Cross-version durability confirmed; API stable; 3/3 write/read | New — existence proof only; not yet replicated |

*This audit section documents the reproducibility posture as of v0.2.16. The three resolved risks represent genuine improvements to the program's evidential foundation. The four persistent risks — self-evaluation bias, KB state accumulation, special character parse failures, and unreplicated new tracks — remain blocking for any external publication claim and should be addressed in the next experimental cycle.*
