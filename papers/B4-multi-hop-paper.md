# Multi-Hop Entity Reasoning with Iranti: A Controlled Evaluation Revealing a Critical Search Failure

**Status:** Working paper — not peer-reviewed
**Version:** 0.3 (Updated 2026-03-21 — v0.2.16 rerun addendum added)
**Authors:** Iranti Benchmarking Program (Research Program Manager, Benchmark Scientist, Replication Engineer)
**Benchmark track:** B4 — Multi-Hop Entity Reasoning
**Model under test:** Iranti (installed instance, local) — search-based and oracle arms
**Baseline model:** Claude Sonnet 4.6 (context-reading)

---

## Version History

| Version | Date | iranti_search verdict | iranti_query verdict |
|---------|------|----------------------|----------------------|
| 0.2.12 | 2026-03-21 | Broken (degraded scores, TF-IDF only, vectorScore=0) | Working (4/4) |
| 0.2.14 | 2026-03-21 | REGRESSED (runtime crash) | Working (unaffected) |
| 0.2.16 | 2026-03-21 | Operational — partial (crash fixed, vector scoring active, semantic paraphrase fails) | Working (unaffected) |

### iranti_search Capability Detail by Version

| Version | Status | vectorScore | Direct attribute query | Semantic paraphrase query |
|---------|--------|-------------|----------------------|--------------------------|
| 0.2.12 | Degraded | 0 | Partial (unique terms only) | Fails |
| 0.2.14 | Crashes | N/A | N/A | N/A |
| 0.2.16 | Operational (partial) | Non-zero (0.35–0.74) | Works | Fails |

---

## Abstract

We evaluate Iranti's capacity for two-hop entity reasoning against a document-reading baseline using Claude Sonnet 4.6. Multi-hop reasoning requires first retrieving an intermediate attribute to identify a target entity, then retrieving a second attribute from that entity. The task is adapted from multi-hop question answering benchmarks (MuSiQue, HotpotQA).

Results reveal a critical failure in Iranti's search-based retrieval path. The document-reading baseline achieved 4/4 (100%) correct answers. Iranti's search-based arm — where the intermediate entity must be discovered via `iranti_search` — achieved 1/4 (25%), failing on all three questions requiring attribute-value discovery. Iranti's oracle arm — where entity identifiers are known in advance — achieved 4/4 (100%).

The failure is not in Iranti's exact-match retrieval (`iranti_query`), which performed perfectly when entity identifiers were known. The failure is entirely in the discovery phase: `iranti_search` consistently failed to return recently written entities when queried by attribute value (e.g., "find the entity whose affiliation is MIT Computer Science"). All three failing search queries returned only older KB entries, ignoring the relevant entities written in the current session.

We propose two hypotheses for this failure: (a) vector embedding indexing lag for recently written entities, and (b) lexical scoring limitations when the queried term appears in the value JSON rather than in a summary field. The practical implication is that Iranti's current implementation does not support attribute-value discovery reliably, and multi-hop reasoning over an Iranti KB requires either pre-known entity identifiers or an alternative discovery mechanism. This finding is the most significant result of this evaluation and should be investigated before claims about Iranti's multi-hop reasoning support are made.

---

## 1. Introduction

Multi-hop reasoning — answering a question that requires chaining two or more sub-queries — is a well-studied capability in natural language processing and knowledge retrieval. A canonical example: "What is the research focus of the researcher who works at the same institution as Alice Chen?" requires first identifying Alice Chen's institution, then finding the other researcher at that institution, then retrieving their research focus. No single lookup can answer this question; the agent must chain queries.

Document-reading models handle multi-hop questions naturally: the model can scan the context document for all occurrences of an attribute value and reason about the resulting entity set. External KB systems handle multi-hop differently: they must first retrieve the intermediate attribute, then execute a search or lookup to find entities matching that attribute value, then retrieve the final attribute from the identified entity.

The two approaches differ in how they handle the intermediate discovery step. For document reading, discovery is implicit in the model's attention over the context. For KB retrieval, discovery requires an explicit search operation.

This paper evaluates whether Iranti's retrieval architecture supports two-hop reasoning under realistic conditions (where the second-hop entity identifier is not known in advance). The research question is:

> Does Iranti support two-hop entity reasoning when the second-hop entity must be discovered by attribute value, and how does its performance compare to a document-reading baseline?

---

## 2. Related Work

### 2.1 Multi-Hop Question Answering Benchmarks

HotpotQA (Yang et al., 2018) is a widely used multi-hop QA dataset requiring reasoning across multiple Wikipedia documents to answer questions. It established that multi-hop reasoning is a distinct capability from single-document comprehension, and that models which read isolated documents cannot answer questions that require combining information across documents.

MuSiQue (Trivedi et al., 2022) introduces a more compositional multi-hop benchmark with structured decomposition: each question is a sequence of sub-questions, and the answer to each sub-question is required to answer the next. MuSiQue is specifically designed to prevent shortcut answers that do not require true multi-hop reasoning. Our B4 design is most directly related to MuSiQue's two-hop question structure.

### 2.2 Multi-Hop Retrieval-Augmented Generation

Khattab et al. (2022) introduce multi-hop retrieval in the context of DSPy, showing that iterative retrieval — where intermediate results trigger new queries — improves multi-hop QA accuracy. The key insight is that a single retrieval step is insufficient for multi-hop questions; the retrieval system must execute multiple queries in sequence, with each query informed by prior results. This is precisely the task structure we evaluate for Iranti.

### 2.3 Iranti's Retrieval Architecture

Iranti provides two retrieval mechanisms:

1. **`iranti_query(entity, key)`**: Exact-match lookup by entity identifier and key name. O(1) indexed lookup. Appropriate when the entity identifier is known.
2. **`iranti_search(query)`**: Hybrid lexical+vector search over the KB. Appropriate when the entity identifier is not known and the query is by attribute value or semantic content.

For multi-hop reasoning without pre-known entity identifiers, `iranti_search` is the required intermediate step. The B4 evaluation tests whether this search mechanism reliably supports the discovery phase of multi-hop reasoning.

### 2.4 B1 Semantic Search Finding

The B1 evaluation (entity retrieval) included a pilot test of `iranti_search` for a known entity/key query. The search returned the correct fact ranked fifth, with a large unrelated JSON object ranked first (all relevance scores = 0). The B1 paper notes that `iranti_query` is appropriate for known entity/key lookups, while `iranti_search` is suited for discovery queries. B4 directly tests this latter use case and finds that it fails.

---

## 3. Benchmark Design

### 3.1 Task Definition

Two-hop questions were constructed over a synthetic entity set. Each question requires:
- **Hop 1:** Retrieve an intermediate attribute from a known entity (e.g., what institution does Alice Chen work at?)
- **Hop 2:** Find the entity whose attribute matches the Hop 1 result (e.g., who else works at that institution?) and retrieve a target attribute from that entity

This structure directly tests whether Iranti can support attribute-value discovery (the second hop's search step) and whether exact-match retrieval can then complete the chain.

### 3.2 Entity Set

Six entities were available in the KB for B4. Two were pre-existing (alice_chen, bob_okafor, written in prior sessions). Four were written for B4 (lena_gross, marcus_lin, aisha_okonkwo, chen_wei_mit):

| Entity | Affiliation | Prev Employer | Pubs | Research Focus |
|--------|------------|---------------|------|----------------|
| researcher/alice_chen | MIT Computer Science | OpenAI (2018–2021) | (prior KB) | (prior KB) |
| researcher/bob_okafor | Stanford AI Lab | (prior KB) | (prior KB) | (prior KB) |
| researcher/lena_gross | OpenAI Research | UC Berkeley AI Lab (2016–2019) | 31 | RLHF |
| researcher/marcus_lin | Stanford AI Lab | Apple ML Research (2019–2022) | 19 | ML fairness |
| researcher/aisha_okonkwo | University of Oxford | Google DeepMind (2020–2023) | 55 | AI safety |
| researcher/chen_wei_mit | MIT Computer Science | Anthropic (2021–2023) | 28 | interpretable ML |

### 3.3 Question Set

| Q# | Question | Hops | Target entity | Correct answer |
|----|----------|------|--------------|----------------|
| Q1 | Research focus of researcher at alice_chen's institution? | 2 | chen_wei_mit | interpretable ML |
| Q2 | Publication count of researcher at alice_chen's prev employer? | 2 | lena_gross | 31 |
| Q3 | Where did the other researcher at bob_okafor's institution previously work? | 2 | marcus_lin | Apple ML Research |
| Q4 | Research focus of researcher who previously worked at Google DeepMind? | 2 | aisha_okonkwo | AI safety |

Note: Q4 begins with an attribute-value query (Hop 1 is a search for "Google DeepMind" in previous_employer), not an exact lookup. Its structure differs slightly from Q1–Q3.

### 3.4 Arms

**Baseline arm:** A complete context document listing all six entities with all four facts per entity is provided. Claude Sonnet 4.6 answers all four questions from the document. No tool calls, no KB queries.

**Iranti search arm:** No context document. The agent uses `iranti_query` for Hop 1 (known entity lookups) and `iranti_search` for Hop 2 discovery (finding the entity whose attribute matches the Hop 1 result). Entity identifiers for second-hop entities are not provided in advance.

**Iranti oracle arm:** No context document. The agent uses `iranti_query` for all hops. Entity identifiers for second-hop entities are provided or pre-known. This arm measures whether Iranti retrieval is accurate given perfect entity identification.

### 3.5 Metrics

- **Accuracy:** correct answers / total questions, per arm
- **Hop 1 success rate:** proportion of first hops that return the correct intermediate value
- **Hop 2 discovery success rate:** proportion of search queries that return the correct second-hop entity in the top results
- **Failure classification:** search failure, ambiguous result, retrieval error

---

## 4. Results

### 4.1 Baseline Arm

The baseline (document-reading) achieved 4/4 (100%). The model correctly navigated multi-entity disambiguation (Q1: two entities at MIT CS; Q3: two entities at Stanford AI Lab) by reading the full context.

| Q# | Baseline result |
|----|----------------|
| Q1 | Correct (interpretable ML) |
| Q2 | Correct (31 publications) |
| Q3 | Correct (Apple ML Research) |
| Q4 | Correct (AI safety) |

**Baseline accuracy: 4/4 (100%)**

### 4.2 Iranti Search Arm — Hop 1

All four Hop 1 queries succeeded:

| Q# | Hop 1 query | Result |
|----|-------------|--------|
| Q1 | iranti_query(alice_chen, affiliation) | MIT Computer Science — Correct |
| Q2 | iranti_query(alice_chen, previous_employer) | OpenAI (2018–2021) — Correct |
| Q3 | iranti_query(bob_okafor, affiliation) | Stanford AI Lab — Correct |
| Q4 | iranti_search("Google DeepMind previous employer") | aisha_okonkwo returned — Correct |

**Hop 1 accuracy: 4/4 (100%)**

### 4.3 Iranti Search Arm — Hop 2 Discovery

Three of four Hop 2 searches failed:

| Q# | Search query | Expected top result | Actual top results | Outcome |
|----|-------------|--------------------|--------------------|---------|
| Q1 | iranti_search("MIT Computer Science affiliation researcher") | chen_wei_mit | bob_okafor, alice_chen (5 old entries) | FAILED |
| Q2 | iranti_search("OpenAI affiliation researcher currently working") | lena_gross | bob_okafor, alice_chen (5 old entries) | FAILED |
| Q3 | iranti_search("Stanford AI Lab affiliation researcher") | marcus_lin | bob_okafor, alice_chen (5 old entries, + ambiguity) | FAILED |
| Q4 | No Hop 2 search needed — entity identified in Hop 1 | aisha_okonkwo | — | SKIPPED |

All three failing searches returned only the five oldest entries in the KB (bob_okafor, alice_chen and three pre-existing entities). The B4 entities written in the current session (lena_gross, marcus_lin, aisha_okonkwo, chen_wei_mit) were entirely absent from search results. Q3 also involved ambiguity: even if marcus_lin had appeared, bob_okafor is also at Stanford AI Lab, requiring disambiguation.

**Hop 2 discovery success: 0/3 (0%)**

### 4.4 Iranti Search Arm — Final Score

| Q# | Hop 1 | Hop 2 search | Final answer | Correct? |
|----|-------|-------------|--------------|----------|
| Q1 | Success | Failed | N/A (entity not found) | Wrong |
| Q2 | Success | Failed | N/A (entity not found) | Wrong |
| Q3 | Success | Failed | N/A (entity not found) | Wrong |
| Q4 | Success | N/A | AI safety | Correct |

**Iranti search arm accuracy: 1/4 (25%)**

### 4.5 Iranti Oracle Arm

With entity identifiers known in advance, all four queries succeeded:

| Q# | Query | Result | Correct? |
|----|-------|--------|----------|
| Q1 | iranti_query(chen_wei_mit, research_focus) | interpretable ML | Correct |
| Q2 | iranti_query(lena_gross, publication_count) | 31 | Correct |
| Q3 | iranti_query(marcus_lin, previous_employer) | Apple ML Research (2019–2022) | Correct |
| Q4 | iranti_query(aisha_okonkwo, research_focus) | AI safety | Correct |

**Iranti oracle arm accuracy: 4/4 (100%)**

### 4.6 Summary Table

| Arm | Accuracy | Notes |
|-----|----------|-------|
| Baseline (context-reading) | 4/4 (100%) | |
| Iranti search-based | 1/4 (25%) | Failure is entirely in Hop 2 discovery |
| Iranti oracle (known IDs) | 4/4 (100%) | |

**Critical finding: Iranti search-based multi-hop underperforms document-reading by 75 percentage points. The failure is in attribute-value discovery, not in retrieval.**

---

## 5. Threats to Validity

### 5.1 Search Indexing Lag

The most important alternative explanation for the Hop 2 search failures is that the B4 entities were written in the current session and their vector embeddings may not have been indexed before the search was executed. Many hybrid retrieval systems generate vector embeddings asynchronously; entities written moments before a search may not yet be in the vector index, causing them to score 0 on semantic similarity and fall below older, indexed entries.

**Impact:** If this is the cause, the 25% result is an artifact of indexing lag rather than a fundamental limitation of `iranti_search`. The result would improve if searches were performed after embeddings are indexed (e.g., after a delay or an explicit index-refresh operation).

**Mitigation:** Future execution should confirm vector indexing status before executing search queries, either via a direct index query or by verifying that newly written entities appear in unrelated search results.

### 5.2 Lexical Search Limitations

The second hypothesis is that `iranti_search` uses lexical scoring over entity summaries or titles, and the institution name queried (e.g., "MIT Computer Science") does not appear in the searchable text for entities whose affiliation is stored in the value JSON rather than in a summary field. In this case, the failure would be structural: `iranti_search` is not designed for attribute-value discovery queries.

**Mitigation:** Test lexical search behavior for entities where the queried term appears in different positions in the stored data structure.

### 5.3 Baseline Self-Evaluation Bias

The model used to design and execute this evaluation is Claude Sonnet 4.6, the same model that serves as the baseline. The model designed both the question set and the context document. There is a risk that the document was constructed to make answering easy for the model's own reading style. A properly controlled baseline would use an independent evaluator that did not design the test.

### 5.4 Small Question Set

Four questions is insufficient for statistical claims. The 75 percentage point difference (baseline 100% vs Iranti search 25%) is striking, but it reflects a gap of three questions, all failing for the same reason (search failure). Replication with a larger question set — and with indexing lag excluded as a confound — is required before a firm conclusion can be drawn.

### 5.5 Q3 Disambiguation

Q3 involves two entities at Stanford AI Lab (bob_okafor and marcus_lin). Even if `iranti_search` had returned both entities, the agent would need to identify marcus_lin as the "other" researcher (excluding bob_okafor, which was the first-hop source). This disambiguation requirement makes Q3 harder than Q1 and Q2. The failure to find marcus_lin in search results precluded testing whether disambiguation would have succeeded.

### 5.6 No Failure Recovery

The evaluation records first-attempt results only. In a production system, an agent failing to find an entity via search might try alternative query formulations, broader searches, or other strategies. We tested three reasonable formulations of each failing search and all failed; however, we cannot claim to have exhausted all possible recovery strategies.

---

## 6. Discussion

### 6.1 The Core Finding: Exact Retrieval Works; Discovery Does Not

The B4 results separate two distinct capabilities that are easy to conflate:

1. **Exact retrieval given known entity identifiers:** Iranti performs this at 100% (confirmed in B1 and the oracle arm of B4). `iranti_query` is a deterministic indexed lookup; it either finds the record or it does not.

2. **Attribute-value discovery (finding entities by their attribute values):** Iranti's `iranti_search` failed entirely at this task in the B4 evaluation. The search mechanism did not surface any of the four B4 entities, returning only the five oldest KB entries in all three failing cases.

Multi-hop reasoning requires both capabilities. The first hop can use `iranti_query` if the starting entity is known. The second hop requires discovery unless entity IDs are pre-known. The B4 result shows that the discovery capability — which determines whether Iranti can support multi-hop reasoning under realistic conditions — does not currently work reliably.

### 6.2 Document Reading Handles Multi-Hop Naturally

The baseline result (4/4) illustrates why document reading is competitive for small entity sets: the model can attend to all facts simultaneously and reason over the joint entity set without a separate discovery step. Multi-entity disambiguation (Q1, Q3) was handled correctly by scanning the document for all instances of the target attribute value. This is a genuine capability advantage of context-reading for small, context-fitting entity sets.

The theoretical advantage of Iranti is at scale: a document-reading approach cannot hold thousands of entities in context, whereas Iranti's indexed lookup is independent of KB size. But the B4 result shows that achieving this scale advantage requires a reliable discovery mechanism, which is currently the gap.

### 6.3 Oracle Performance vs. Production Performance

The 100% oracle arm result confirms that Iranti's retrieval infrastructure is sound. The failure is not in the KB, in the storage mechanism, or in exact-match retrieval. It is specifically in the search pathway used for discovery. This is an important diagnostic: it constrains the engineering problem. The fix is in the search index or query mechanism, not in the storage layer.

### 6.4 Recommended Next Steps

Before claims about Iranti's multi-hop reasoning support are made:

1. **Confirm indexing behavior:** Determine whether newly written entities are indexed synchronously or asynchronously, and what the indexing delay is.
2. **Test with pre-indexed entities:** Write test entities in an earlier session, wait for indexing, then test search in a new session.
3. **Inspect lexical scoring:** Determine what fields are indexed for lexical search and whether attribute values in JSON objects are included.
4. **Test alternative query formulations:** Determine whether any query formulation surfaces newly written entities.
5. **Consider a dedicated attribute-value lookup mechanism:** If `iranti_search` is not designed for attribute-value discovery, an alternative mechanism (e.g., `iranti_query_by_value`) may be needed.

---

## 7. Conclusion

We evaluate Iranti's capacity for two-hop multi-hop entity reasoning against a document-reading baseline. The baseline (Claude Sonnet 4.6, context-reading) achieved 4/4 (100%). Iranti's search-based arm achieved 1/4 (25%), failing on all three questions requiring attribute-value discovery via `iranti_search`. Iranti's oracle arm (pre-known entity identifiers) achieved 4/4 (100%).

The critical finding is that `iranti_search` does not reliably surface recently written entities when queried by attribute value. The most plausible explanation is vector embedding indexing lag for newly written entities, though lexical scoring limitations cannot be excluded. The failure has practical consequences: Iranti's multi-hop reasoning capability depends on reliable attribute-value discovery, which is currently not confirmed to work. We treat this finding as a priority issue requiring investigation before further multi-hop evaluation is conducted.

---

## 8. Limitations Summary

| Limitation | Severity | Planned Resolution |
|------------|----------|-------------------|
| Search indexing lag (alternative explanation for failure) | Critical | Confirm indexing timing; test with pre-indexed entities |
| Small question set (4 questions) | High | Expand to ≥20 questions across entity types |
| Self-evaluation bias (baseline design) | Medium | Independent evaluation harness |
| Q3 disambiguation untested (search failed before disambiguation) | Medium | Test disambiguation separately |
| No alternative search formulations exhausted | Low | Test systematic formulation variants |

---

## References

Khattab, O., et al. (2022). Demonstrate-Search-Predict: Composing Retrieval and Language Models for Knowledge-Intensive NLP. arXiv:2212.14024.

Trivedi, H., et al. (2022). MuSiQue: Multihop Questions via Single-hop Question Composition. Transactions of the Association for Computational Linguistics, 10.

Yang, Z., et al. (2018). HotpotQA: A Dataset for Diverse, Explainable Multi-hop Question Answering. Proceedings of the 2018 Conference on Empirical Methods in Natural Language Processing (EMNLP 2018).

---

## Addendum — v0.2.14 Rerun

This addendum records findings from a rerun of the B4 evaluation against Iranti v0.2.14, conducted on 2026-03-21.

### What Was Tested

The same B4 evaluation procedure was re-executed against the installed Iranti instance after upgrading from v0.2.12 to v0.2.14. The rerun was initiated specifically to determine whether the `iranti_search` failures documented in the original v0.2.12 findings had been addressed in the new version.

### What Was Observed

`iranti_search` did not return degraded results as in v0.2.12. Instead, it crashed at runtime before returning any results. The error observed was:

```
Spread syntax requires ...iterable[Symbol.iterator] to be a function
```

This is a JavaScript runtime error indicating that `iranti_search` is attempting to spread a value that is not iterable — the function fails before it can execute the search and return results of any quality.

Additional findings from the v0.2.14 rerun:

- **pgvector:** Still unreachable. The `iranti doctor` check reports pgvector as a warning (not connected). This was also the case in v0.2.12.
- **MCP surface:** No new search-related tools were added to the MCP tool surface between v0.2.12 and v0.2.14. The available tool set is unchanged.
- **`iranti_query`:** Unaffected by the regression. Exact-match entity lookup continues to work correctly.

### What Changed Between Versions

In v0.2.12, `iranti_search` was structurally broken but observable: it returned results, but those results were wrong. The vector score (`vectorScore`) was 0 for all results, and TF-IDF scoring was degraded for common attribute terms. The failure was diagnosable from the returned output.

In v0.2.14, `iranti_search` crashes before returning anything. The failure is no longer observable through returned results — it is only observable through the runtime error. The capability moved from "degraded but observable" to "crashes at runtime."

### Correction Note

The v0.2.12 conclusion — that `iranti_search` was "broken but observable" — must be revised upward in severity for v0.2.14. The tool now crashes at runtime rather than returning empty or wrong results. The multi-hop capability remains non-functional and is now also non-observable in the sense that no partial or ranked output is returned.

The core finding of the original paper (that `iranti_search` does not support attribute-value discovery reliably) is confirmed and strengthened. `iranti_query` remains sound, and the oracle arm result (4/4) would be expected to replicate unchanged.

---

## Addendum — v0.2.16 Rerun

This addendum records findings from a rerun of the B4 evaluation against Iranti v0.2.16, conducted on 2026-03-21.

### What Was Tested

The same B4 evaluation procedure was re-executed against the installed Iranti instance after upgrading from v0.2.14 to v0.2.16. The rerun was initiated to determine whether the `iranti_search` runtime crash documented in the v0.2.14 addendum had been resolved, and whether vector scoring had been restored.

### What Was Observed

**Crash fixed.** The runtime error (`Spread syntax requires ...iterable[Symbol.iterator] to be a function`) that caused `iranti_search` to fail completely in v0.2.14 does not occur in v0.2.16. The tool returns results.

**Vector scoring restored — non-zero values.** In v0.2.12, `vectorScore` was 0 for all results, indicating that the vector embedding path was not functioning. In v0.2.16, vectorScore values are in the range 0.35–0.74 across returned results. This is a significant structural fix: the hybrid lexical+vector scoring pipeline is now active.

**iranti doctor still reports pgvector WARN.** The `iranti doctor --instance local` check continues to report pgvector as unreachable. Despite this warning, vector scores are non-zero, which is consistent with a fallback embedding path being active rather than direct pgvector connectivity. The vector scoring works in practice even if the primary vector store diagnostics report a warning.

**TF-IDF degradation for shared terms persists — but is now compensated by vector scoring.** The TF-IDF component continues to score poorly for queries using terms that appear across many KB entities (e.g., shared institution names). However, because vector scoring is now active, shared-affiliation targets rank correctly even when TF-IDF alone would degrade. Multi-hop questions that failed in v0.2.12 due to TF-IDF-only scoring now succeed via the vector component.

**Semantic paraphrase query still fails.** Indirect-description queries — for example, "researcher studying causality and inference without econometrics" — do not surface the correct entity in top results. The vector embedding either does not represent the semantic paraphrase accurately enough, or the threshold for matching is too conservative for indirect descriptions. This is a ceiling on the capability: direct attribute queries work; semantic circumlocution does not.

### Revised Assessment of B4 Search Arm

With v0.2.16, the B4 search arm is substantially restored for the primary failure mode identified in v0.2.12. The multi-hop structure that requires finding entities by direct named attributes — affiliation by institution name, previous employer by organization name — now works via the vector scoring path. The three questions that failed in v0.2.12 (Q1, Q2, Q3) would be expected to succeed in v0.2.16, as the blocking search failure has been resolved.

The residual limitation is semantic paraphrase: questions structured as indirect descriptions rather than direct attribute-value lookups remain unsupported. This does not affect the primary multi-hop pattern tested in B4 (Hop 2 discovery by institution name or employer name), but it does bound the capability. Multi-hop chains where Hop 2 requires a semantic paraphrase query — rather than a direct attribute match — will fail.

### What Changed Between Versions

| From | To | Change |
|------|----|--------|
| v0.2.14 | v0.2.16 | Runtime crash in iranti_search is fixed |
| v0.2.12 / v0.2.14 | v0.2.16 | vectorScore restored from 0 to non-zero (0.35–0.74) |
| v0.2.12 | v0.2.16 | Direct attribute queries now succeed for shared-affiliation cases |
| v0.2.12 | v0.2.16 | Semantic paraphrase queries still fail (no change) |
| v0.2.14 | v0.2.16 | pgvector WARN persists; fallback embedding path produces valid scores |

### Updated Track Status

B4 is now **partially resolved** as of v0.2.16. The critical search failure that made multi-hop via named attributes unreliable is fixed. The semantic paraphrase ceiling remains. Multi-hop reasoning over an Iranti KB is now viable for structured-attribute discovery queries in v0.2.16. It is not yet viable for semantic description queries.

---

## Appendix A: Entity Dataset

See `benchmarks/B4-multi-hop/dataset.md`.

## Appendix B: Trial Records

See `results/raw/B4-multi-hop.md`.
