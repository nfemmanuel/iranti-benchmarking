# End-to-End Text Ingestion Accuracy in an Agentic Knowledge Base: A Controlled Evaluation of the Iranti Librarian Pipeline

**Status:** Working paper — not peer-reviewed
**Version:** 0.4 (Addendum 3 added 2026-03-21, reflecting v0.2.16 rerun — track fully resolved)
**Authors:** Iranti Benchmarking Program (Research Program Manager, Benchmark Scientist, Replication Engineer)
**Benchmark track:** B6 — iranti_ingest Text Pipeline
**Model under test:** Iranti `iranti_ingest` pipeline (installed instance, local)
**Infrastructure:** Iranti instance at localhost:3001

---

## Version History

| Version | Provider | Date | Accuracy | Verdict | Key finding |
|---------|----------|------|----------|---------|-------------|
| 0.2.12 | mock | 2026-03-21 | 0/4 | Contamination — now revised to mock artifact | Verbatim KB values written regardless of input text |
| 0.2.14 | mock | 2026-03-21 | 2/4 (structured syntax only) | Partial — coverage failure; mock confound | Contamination not reproduced; extractedCandidates=0 for prose |
| 0.2.14 | openai | 2026-03-21 | 0/8 | Extraction failure — LLM-independent | extractedCandidates=0 for natural prose; defect upstream of LLM |
| 0.2.16 | openai | 2026-03-21 | 8/8 | Fixed — pipeline fully operational | extractedCandidates non-zero; all keys extracted correctly; no contamination |

**Note on version history:** The initial draft of this paper (version 0.1) reported findings from the v0.2.12 evaluation. The Abstract and Sections 4–7 below reflect those original findings. The v0.2.14 rerun findings are documented in full in Section 9 (Addendum 1) and Section 10 (Addendum 2). The v0.2.16 findings are documented in Section 11 (Addendum 3). Readers should read all sections together; the v0.2.12 and v0.2.14 conclusions have been revised as a result of subsequent reruns.

---

## Abstract

We evaluate the end-to-end accuracy of Iranti's `iranti_ingest` text ingestion pipeline, which accepts a natural language passage and uses an internal Librarian agent to extract structured facts and write them to the knowledge base. A single researcher profile passage was submitted, containing four canonically testable facts: institutional affiliation, publication count, previous employer and dates, and primary research focus. Ground truth was derived directly from the input text. The Librarian extracted four candidates and wrote all four; however, only one of the four extracted values was correct, yielding an extraction accuracy of 1/4 (25%). The three incorrect extractions each correspond to a value present in an existing knowledge base entry written earlier in the session. This co-occurrence pattern gives rise to a KB contamination hypothesis: the Librarian may be incorporating existing KB context during extraction, causing values from prior entities to substitute for values in the input text. The contamination hypothesis is not confirmed — the internal extraction mechanism is not directly observable — and an alternative pure hallucination hypothesis cannot be excluded. A further interpretive caveat is that Librarian grounding in existing KB data may be intentional design behavior, not a failure mode. Regardless of cause, 25% extraction accuracy is insufficient for use cases requiring reliable text-to-KB conversion. All confirmed results in prior benchmarks (B1–B4) used structured writes via `iranti_write`; `iranti_ingest` should not be assumed equivalent in reliability.

---

## 1. Introduction

Information extraction — the conversion of unstructured natural language text into structured, queryable records — is a foundational capability for any knowledge base system that must ingest real-world documents. In the context of memory-augmented LLM deployments, text ingestion is especially important: agents frequently encounter facts stated in prose (meeting notes, research profiles, status updates) and must translate these facts into persistent KB entries for later retrieval.

Iranti provides `iranti_ingest` as its primary text-to-KB pipeline. The pipeline delegates extraction to an internal Librarian agent, which reads the input text, identifies candidate facts, and writes them to the KB using the same `iranti_write` pathway as structured writes. The B6 benchmark asks whether this automated pipeline produces the same results as a structured write — that is, whether the extracted values match what is stated in the input text.

The research question is:

> Does `iranti_ingest` accurately extract factual claims from a clearly structured natural language passage and write them to the KB with correct values?

A secondary question concerns failure modes:

> When extraction fails, do the incorrect extracted values reveal a pattern that suggests a specific failure mechanism?

The B6 evaluation tests these questions against a single researcher profile passage with controlled ground truth. Given the small scale of this evaluation (n=1), conclusions must be treated as preliminary and hypothesis-generating rather than confirmatory.

---

## 2. Related Work

### 2.1 Named Entity Recognition and Information Extraction Benchmarks

The Message Understanding Conference (MUC) evaluations (Grishman and Sundheim, 1996) established the foundational benchmark paradigm for information extraction: a system is given a natural language text, asked to extract entities and relations, and evaluated against a human-annotated gold standard. MUC-3 through MUC-7 evaluated slot-filling tasks in which systems must correctly identify the value for a specific attribute (e.g., the perpetrator, the victim, the location of an incident). The MUC paradigm directly motivates the B6 evaluation design: we construct a ground truth annotation and measure whether the extracted values match.

The Automatic Content Extraction (ACE) program (Doddington et al., 2004) extended MUC to entity mention detection, coreference resolution, and relation extraction. ACE established that extraction accuracy varies substantially by entity type and relation type, and that systems that perform well on one type may perform poorly on another. This motivates testing multiple attribute types (numeric counts, named institutions, temporal ranges, categorical labels) rather than a single attribute type.

### 2.2 Slot Filling and Knowledge Base Population

The TAC Knowledge Base Population (KBP) shared task (Ji and Grishman, 2011; Surdeanu, 2013) is the most direct precursor to B6: systems are given a query entity, a large document collection, and a set of slot types, and must find the correct slot fill values in the documents. KBP results consistently show that automated systems achieve moderate accuracy on common slot types (50–70% in competitive submissions) but degrade significantly on rare slot types, temporally scoped values, and fine-grained numerical attributes.

The B6 evaluation is substantially simpler than TAC KBP: the source passage is a single, self-contained document with no competing passages, and all four tested attributes are clearly stated in the text without negation, coreference, or ambiguity. Under these conditions, a well-functioning extraction pipeline should achieve near-ceiling accuracy. The 25% accuracy observed in B6 is therefore especially notable.

### 2.3 Retrieval-Augmented Generation and Grounding

A recurring failure mode in retrieval-augmented generation (RAG) is context confusion: the generator model attends to retrieved context that partially conflicts with the input query, producing a blend of query-relevant and context-relevant text (Shi et al., 2023; Longpre et al., 2021). In RAG settings, this occurs because the retrieval step introduces additional context (retrieved passages) that competes with the query context for the model's attention.

An analogous failure mode is conceivable in the Iranti Librarian's extraction process: if the Librarian performs a KB retrieval step to ground its extractions in existing knowledge, the retrieved context may compete with the input passage and introduce values from existing entities. This is the mechanism underlying the KB contamination hypothesis developed in Section 5. Whether this characterization is accurate — and whether any such grounding behavior is a design feature or an error — cannot be determined from the available evidence.

### 2.4 MemGPT Ingest and Memory Update

MemGPT (Packer et al., 2023) includes a memory management module that processes LLM conversation history to identify facts that should be stored in persistent memory. The MemGPT memory update process is LLM-mediated: the model decides what to write, how to phrase it, and how to handle conflicts with existing memory. This design is similar in kind to Iranti's Librarian-mediated ingest, in that extraction and write decisions are delegated to an LLM agent rather than performed by a rule-based parser. MemGPT does not benchmark extraction accuracy against ground truth in the MUC/KBP sense; it evaluates end-to-end task performance rather than extraction fidelity. B6 applies a stricter ground-truth measurement to the Iranti equivalent of this component.

---

## 3. Methodology

### 3.1 Input Passage

A single researcher profile passage was constructed for a fictional researcher entity (`researcher/diana_voronova`). The passage is self-contained, clearly phrased, and contains no negations, ambiguous referents, or conflicting claims:

> Dr. Diana Voronova is an Associate Professor in the Department of Computer Science at Carnegie Mellon University, where she leads the Robust Learning Lab. She completed her postdoctoral fellowship at MIT in 2019 before joining CMU. Prior to her postdoc, she worked as a Research Scientist at Google Brain from 2016 to 2018. Diana has published 38 peer-reviewed papers, including 12 at top venues such as NeurIPS, ICML, and ICLR. Her primary research focus is out-of-distribution generalization, with secondary interests in domain adaptation and dataset shift. She received her PhD from ETH Zurich in 2016 under the supervision of Prof. Bernhard Scholkopf.

This passage was selected because all four test attributes are stated clearly and unambiguously:
- Affiliation is stated in the first sentence.
- Publication count (38) is stated numerically in the fourth sentence.
- Previous employer (Google Brain, 2016–2018) is stated in the third sentence.
- Research focus (out-of-distribution generalization) is stated as "primary research focus" in the fifth sentence.

### 3.2 Ground Truth

| Key | Ground Truth Value |
|-----|--------------------|
| affiliation | Carnegie Mellon University |
| publication_count | 38 |
| previous_employer | Google Brain (2016–2018) |
| research_focus | out-of-distribution generalization (primary); domain adaptation (secondary) |

### 3.3 Protocol

The passage was submitted to the installed Iranti instance via:

```
iranti_ingest(entity="researcher/diana_voronova", content=<passage>, confidence=85)
```

The ingest response included a count of extracted candidates, written facts, rejections, escalations, and skipped-malformed items, as well as the list of keys and write statuses. Each written fact was then retrieved by querying the KB and the extracted value was compared against ground truth.

### 3.4 Metrics

- **Extraction accuracy:** number of correctly extracted values / total tested values
- **Ingest pipeline completeness:** all expected keys extracted and written
- **Error classification:** by error type (numeric error, institution name error, temporal scope error, content substitution error)

---

## 4. Results

### 4.1 Ingest Pipeline Response

```
iranti_ingest(entity="researcher/diana_voronova", content=<passage>, confidence=85)

Response:
  extractedCandidates: 4
  written: 4
  rejected: 0
  escalated: 0
  skippedMalformed: 0
  facts:
    - key: affiliation         → created
    - key: publication_count   → created
    - key: previous_employer   → created
    - key: research_focus      → created
```

The pipeline extracted exactly four candidates corresponding to the four test keys and wrote all four without rejection. Mechanically, the ingest pipeline completed successfully.

### 4.2 Extracted Values vs. Ground Truth

| Key | Ground Truth | Extracted | Confidence | Correct |
|-----|-------------|-----------|------------|---------|
| affiliation | Carnegie Mellon University | {institution: "Carnegie Mellon University"} | 92 | Yes |
| publication_count | 38 | {count: 31} | 91 | No |
| previous_employer | Google Brain (2016–2018) | {institution: "Google DeepMind", from: 2019, to: 2022} | 89 | No |
| research_focus | out-of-distribution generalization | {primary: "reinforcement learning", secondary: "robotics"} | 87 | No |

**Extraction accuracy: 1/4 (25%)**

### 4.3 Error Analysis

**Error 1 — publication_count (extracted: 31; ground truth: 38)**

The input text states "published 38 peer-reviewed papers." The extracted value is 31. The integer 31 corresponds to the `publication_count` of `researcher/lena_gross`, an entity written to the same KB earlier in the same session.

**Error 2 — previous_employer (extracted: Google DeepMind, 2019–2022; ground truth: Google Brain, 2016–2018)**

The input text states "Research Scientist at Google Brain from 2016 to 2018." Two separable errors are present: (a) the institution name was rendered as "Google DeepMind" rather than "Google Brain," and (b) the temporal range was rendered as 2019–2022 rather than 2016–2018. Note that Google Brain merged into Google DeepMind in 2023; the name substitution may reflect an LLM normalization of the historical name to the current organizational identity. However, the date error (2019–2022) is not explained by name normalization. The entity `researcher/aisha_okonkwo`, written earlier in this session, has `previous_employer = Google DeepMind (2020–2023)` — an approximate match to the extracted date range.

**Error 3 — research_focus (extracted: reinforcement learning, robotics; ground truth: out-of-distribution generalization, domain adaptation)**

The input text states "primary research focus is out-of-distribution generalization, with secondary interests in domain adaptation and dataset shift." The extracted value ("reinforcement learning," "robotics") bears no textual relationship to the input passage. Entries in the KB from a prior session (ticket/cp_t010 and ticket/cp_t011, the oldest entries in the KB) contain exactly this research focus.

### 4.4 Contamination Evidence Summary

| Error | Text value | Extracted value | Matching KB entry |
|-------|-----------|-----------------|-------------------|
| publication_count | 38 | 31 | researcher/lena_gross (publication_count=31) |
| previous_employer dates | 2016–2018 | 2019–2022 | researcher/aisha_okonkwo (approx: 2020–2023) |
| research_focus | out-of-distribution generalization | reinforcement learning, robotics | ticket/cp_t010, ticket/cp_t011 |

All three incorrect values co-occur with values present in existing KB entries. The three co-occurrences in a four-item test constitute a notable pattern; however, the interpretation of this pattern is discussed with appropriate caution in Section 5.

### 4.5 Confidence Observations

The Librarian assigned confidence scores of 87–92 to all four extracted facts, including the three incorrect ones. The input was submitted with `confidence=85`. The fact that the Librarian returned higher confidence values for incorrect extractions than was provided in the input call is notable: the pipeline does not appear to self-assess extraction uncertainty or calibrate confidence based on extraction difficulty.

---

## 5. Discussion

### 5.1 Accuracy in Context

The 25% extraction accuracy (1/4) must be interpreted carefully given the conditions under which it was observed. The input passage was clearly phrased, factually unambiguous, and entirely self-contained. Under these conditions, a rule-based pattern extractor or a competent LLM prompted in extraction mode would be expected to achieve significantly higher accuracy. The 25% result is therefore not attributable to passage complexity or ambiguity. The failure is in the extraction process itself.

For reference, competitive systems in the TAC KBP shared task (a substantially more difficult task) typically achieve 50–70% slot-fill accuracy on common entity types. The B6 result falls well below this range for a task that is, in structural terms, substantially easier.

### 5.2 The KB Contamination Hypothesis

The co-occurrence of all three incorrect values with existing KB entries gives rise to the hypothesis that the Librarian incorporates existing KB context during extraction and that this context contaminated the extraction output. Under this hypothesis, the Librarian retrieved semantically similar entities from the KB (other researcher entries with similar keys), and the retrieved values partially substituted for the values stated in the input text.

This hypothesis is consistent with a Retrieval-Augmented Generation architecture in the extraction pathway: before or during extraction, the Librarian retrieves existing KB context to ground its output. The grounding step, intended to improve consistency, instead introduced value substitution errors for three of four attributes.

**This hypothesis is not confirmed.** The internal behavior of the Librarian agent is not directly observable from the outside. Two alternative explanations cannot be excluded:

1. **Pure LLM extraction error without KB retrieval:** The Librarian may have hallucinated values independently of any KB retrieval step. The co-occurrence with KB values could be coincidence, particularly if the KB values (e.g., "reinforcement learning") are common LLM prior associations for researcher profiles.

2. **Intentional grounding design:** The Librarian may be designed to retrieve and incorporate existing KB context during extraction, as a mechanism for consistency and disambiguation. Under this interpretation, the behavior is not a bug but a design choice — the Librarian is prioritizing consistency with existing KB facts over strict fidelity to the input text. Whether this constitutes correct behavior depends on the intended semantics of `iranti_ingest`.

The contamination hypothesis should be the subject of controlled follow-up experiments before any conclusion is drawn (see Section 5.4).

### 5.3 Implications for Benchmark Design

Prior benchmarks in this program (B1–B4) used structured writes via `iranti_write` to populate the KB. These writes achieved 100% accuracy in committing the intended values. The B6 result shows that `iranti_ingest` is not equivalent to `iranti_write` in accuracy. Any benchmark that uses `iranti_ingest` to establish KB state cannot assume that the KB contains the values stated in the input text; it must verify the written values against ground truth before proceeding with retrieval evaluation.

Furthermore, values written by `iranti_ingest` — including the incorrect values written in the B6 trial — remain in the KB and are visible to subsequent operations, including the B4 search-based retrieval tests (where lena_gross's publication_count=31 was a retrieval target). If ingest-written values are incorrect, downstream evaluation results that depend on those values will be correspondingly unreliable.

### 5.4 Recommended Follow-up Experiments

To adjudicate between the contamination and pure-hallucination hypotheses, and to characterize ingest accuracy more broadly, the following experiments are recommended:

1. **Fresh KB ingest test:** Submit the same passage to a fresh Iranti instance with no prior KB entries. If the contamination hypothesis is correct, accuracy should improve on the fresh instance (no existing entries to contaminate). If accuracy remains poor, the pure-hallucination hypothesis is supported.

2. **Multiple passage test:** Submit 10+ distinct passages and evaluate extraction accuracy across all. This will provide a more stable estimate of mean accuracy and variance.

3. **Controlled contamination test:** Write a small number of KB entries with known values, then submit a passage whose facts differ from the KB entries in specific ways. Measure whether the extracted values shift toward the KB entries.

4. **Confidence calibration test:** Compare the Librarian's extraction confidence scores for correct vs. incorrect extractions at scale. A well-calibrated extractor should assign lower confidence to uncertain extractions.

---

## 6. Threats to Validity

### 6.1 Single Trial

The entire evaluation rests on one text passage, one entity, and four attribute values. No replication, no variance estimate, and no significance testing are possible. The reported accuracy (25%) should be treated as an observation from a single instance, not as an estimate of the pipeline's mean accuracy over a population of inputs.

### 6.2 Contamination is a Hypothesis, Not a Confirmed Finding

The KB contamination hypothesis is supported by the co-occurrence pattern described in Section 4.4. However, the internal mechanism of the Librarian is not observable. The hypothesis cannot be confirmed or disconfirmed from the available evidence. Statements in this paper that describe contamination as an explanation (rather than a hypothesis) should be read with this caveat in mind.

### 6.3 Intentional Grounding Behavior

As noted in Section 5.2, the Librarian may be designed to ground its extractions in existing KB context. Under this interpretation, behavior that appears to be a failure from an extraction-accuracy standpoint may be correct behavior from a system-consistency standpoint. The B6 benchmark does not evaluate whether KB-grounded ingest is appropriate behavior in Iranti's intended use cases; it only evaluates fidelity to the input text. Stakeholders should consider whether the intended semantics of `iranti_ingest` are strictly extractive (text → KB) or include a KB-grounding step (text + KB → KB).

### 6.4 Google Brain / Google DeepMind Name Normalization

The institution name substitution (Google Brain → Google DeepMind) may reflect a legitimate historical normalization: Google Brain was merged into Google DeepMind in 2023. If the Librarian normalizes historical organization names to current names, this behavior may be intentional. However, the date error (2016–2018 → 2019–2022) cannot be explained by name normalization and constitutes an independent extraction failure. The two components of this error should be evaluated separately in follow-up tests.

### 6.5 Confidence Inflation

The observation that the Librarian returned confidence values (87–92) higher than the submitted input confidence (85) for incorrect extractions is potentially informative but cannot be analyzed rigorously from a single trial. Whether confidence inflation is systematic and whether it correlates with extraction errors requires a larger sample.

### 6.6 Passage Representativeness

The test passage is a researcher profile — a structured, formulaic text type. Extraction accuracy may differ substantially for less structured passage types (e.g., meeting notes, free-form status updates, news articles). The B6 result characterizes performance on one text type only.

---

## 7. Conclusion

The B6 benchmark evaluates the accuracy of Iranti's `iranti_ingest` text ingestion pipeline against a clearly phrased, unambiguous single-passage ground truth. The pipeline mechanically succeeded: all four expected keys were extracted and written to the KB without rejection. However, only one of four extracted values (25%) matched the ground truth. The three incorrect extractions each co-occur with values present in existing KB entries written in the same session.

The co-occurrence pattern gives rise to a KB contamination hypothesis — that the Librarian agent incorporates existing KB context during extraction and that this context introduced value substitution errors. This hypothesis is not confirmed. An alternative pure-hallucination explanation cannot be excluded, and the possibility that Librarian grounding in existing KB data is intentional system behavior must be acknowledged.

Regardless of cause, the 25% extraction accuracy observed in B6 is insufficient for deployments requiring reliable text-to-KB conversion. Structured writes via `iranti_write` remain the reliable path for KB population in benchmarking contexts. The contamination hypothesis and the Librarian's grounding behavior warrant controlled follow-up before `iranti_ingest` is used as a KB population mechanism in experimental or production settings.

---

## 8. References

Doddington, G., Mitchell, A., Przybocki, M., Ramshaw, L., Strassel, S., and Weischedel, R. (2004). The Automatic Content Extraction (ACE) Program — Tasks, Data, and Evaluation. *Proceedings of LREC 2004*.

Grishman, R., and Sundheim, B. (1996). Message Understanding Conference — 6: A Brief History. *Proceedings of the 16th International Conference on Computational Linguistics (COLING 1996)*.

Ji, H., and Grishman, R. (2011). Knowledge Base Population: Successful Approaches and Challenges. *Proceedings of the 49th Annual Meeting of the Association for Computational Linguistics (ACL 2011)*.

Longpre, S., Perisetla, K., Chen, A., Ramesh, N., DuBois, C., He, H., Beaumont, M., Dettmers, T., Roberts, A., Barua, A., and Raffel, C. (2021). Entity-Based Knowledge Conflicts in Question Answering. *Proceedings of the 2021 Conference on Empirical Methods in Natural Language Processing (EMNLP 2021)*.

Packer, C., Fang, V., Patil, S. G., Nguyen, K., Wooders, A., and Gonzalez, J. E. (2023). MemGPT: Towards LLMs as Operating Systems. *arXiv:2310.08560*.

Shi, F., Chen, X., Misra, K., Scales, N., Dohan, D., Chi, E., Schärli, N., and Zhou, D. (2023). Large Language Models Can Be Easily Distracted by Irrelevant Context. *Proceedings of the 40th International Conference on Machine Learning (ICML 2023)*.

Surdeanu, M. (2013). Overview of the TAC2013 Knowledge Base Population Evaluation: English Slot Filling and Temporal Slot Filling. *Proceedings of the Sixth Text Analysis Conference (TAC 2013)*.

---

## 9. Addendum: v0.2.14 Rerun (2026-03-21)

### 9.1 Motivation

Following the v0.2.12 evaluation, a rerun was conducted against Iranti v0.2.14 to determine whether the contamination finding from Section 4–5 reproduced under a newer version. This section documents the rerun methodology, results, and a revised interpretation that materially changes the conclusion drawn in Section 7.

### 9.2 Rerun Configuration

The rerun used the same test entity (`researcher/diana_voronova`) and the same ground truth as the original evaluation (Section 3.2). The same installed Iranti instance was used, running at localhost:3001. One configuration parameter remained constant across both evaluations and is now identified as a critical confound:

- **LLM_PROVIDER=mock** (unchanged between v0.2.12 and v0.2.14)

This means neither the original evaluation nor the rerun used a real LLM provider for the Librarian's extraction step. The implications of this are discussed in Section 9.4.

### 9.3 Rerun Results

The v0.2.14 rerun produced markedly different behavior from v0.2.12:

**Key observation 1 — Contamination pattern not reproduced.** The verbatim substitution of KB values (cp_t010/cp_t011 entries) that characterized the v0.2.12 output was not observed in v0.2.14. The extracted values are not identical to existing KB entries. The specific contamination pattern described in Section 4.3 did not recur.

**Key observation 2 — New failure: extractedCandidates=0 for prose input.** When the full natural language passage (as used in the original evaluation) was submitted, the chunker/extractor returned `extractedCandidates=0`. No facts were extracted from the prose passage. This is a different failure mode from v0.2.12, where extraction completed but returned wrong values.

**Key observation 3 — Partial extraction under structured syntax.** When input was reformatted using structured key:value-style syntax (rather than prose), the extractor produced `extractedCandidates=2`. Both extracted values were correct:

| Key | Ground Truth | Extracted (v0.2.14) | Correct |
|-----|-------------|---------------------|---------|
| publication_count | 38 | 38 | Yes |
| research_focus | out-of-distribution generalization | out-of-distribution generalization | Yes |
| affiliation | Carnegie Mellon University | (not extracted) | N/A |
| previous_employer | Google Brain (2016–2018) | (not extracted) | N/A |

**Effective accuracy (structured syntax only):** 2/4 keys extracted; 2/2 extracted values correct. However, 2/4 keys (affiliation, previous_employer) were not extracted under any tested phrasing.

**Summary:** The v0.2.14 result is neither better nor worse than v0.2.12 in any simple sense. Contamination is gone; coverage failure has replaced it. Under structured syntax, the pipeline is partially functional (2/4 keys, 100% accuracy on extracted keys). Under prose input, it extracts nothing.

### 9.4 The Mock LLM Provider Confound

Both evaluations ran with `LLM_PROVIDER=mock`. This is now identified as the most likely confounding variable for both the v0.2.12 and v0.2.14 results.

**Hypothesis for v0.2.12:** The mock LLM provider returned canned or pre-seeded response data during extraction queries. Because the mock was initialized with KB context (from ticket/cp_t010, cp_t011, and other session entries), the "extraction" output was not derived from the input text at all — it was the mock returning its pre-loaded KB state. Under this hypothesis, the contamination finding from v0.2.12 is not evidence of a Librarian design defect; it is evidence that a mock LLM returns mock data. The contamination pattern would be an artifact of the test infrastructure, not a bug in iranti_ingest.

**Hypothesis for v0.2.14:** The mock LLM, updated or reconfigured in v0.2.14, no longer returns canned KB values. Instead, it returns empty or null responses for most extraction queries (especially for prose input). The `extractedCandidates=0` result under prose input is the mock returning nothing, not the Librarian failing to parse the text. Under structured key:value syntax, the mock LLM may pattern-match on the explicit key names and return something non-null, which is why extraction partially succeeds under that format.

**Combined interpretation:** Neither the v0.2.12 nor the v0.2.14 result reflects the behavior of iranti_ingest under real-world conditions, because neither evaluation used a real LLM provider. Both sets of results are artifacts of mock LLM behavior, which is by definition not representative of production extraction quality.

### 9.5 Revised Conclusion

The original conclusion in Section 7 states: "The co-occurrence pattern gives rise to a KB contamination hypothesis... Regardless of cause, the 25% extraction accuracy observed in B6 is insufficient for deployments requiring reliable text-to-KB conversion."

This conclusion must be revised.

**The v0.2.12 contamination finding should be treated as plausibly a mock LLM artifact.** The finding cannot be confirmed or denied on a live LLM provider until the instance is configured with a real provider. The v0.2.12 contamination conclusion is downgraded from **confirmed defect** to **plausible mock artifact pending real-provider retest**.

Specifically:
- The contamination hypothesis (Section 5.2) remains a hypothesis, but the weight of evidence for it has decreased. It is now at least equally likely that the pattern reflected mock LLM behavior rather than Librarian design behavior.
- The 0/4 accuracy figure from v0.2.12 cannot be attributed to the Librarian pipeline's extraction mechanism with confidence, because the LLM step in that pipeline was not functioning as a real LLM.
- The 2/4 result from v0.2.14 (under structured syntax) suggests that, with a functioning LLM, extraction may be more capable than v0.2.12 implied. However, the coverage gap (affiliation and previous_employer consistently not extracted) remains unexplained.

**What remains valid from the original paper:**
- The observation that `iranti_write` and `iranti_ingest` are different code paths with different reliability characteristics remains valid and is unaffected by the confound.
- The recommendation in Section 5.3 — that benchmarks using `iranti_ingest` must verify written values against ground truth — remains valid regardless of LLM provider.
- The recommended follow-up experiments in Section 5.4 remain valid. Item 1 (fresh KB ingest test) should now be extended to include: *run on a real LLM provider, not mock*.

### 9.6 Required Next Step

A fair evaluation of iranti_ingest requires running with a real LLM provider (e.g., `LLM_PROVIDER=openai` or equivalent). Until that condition is met, B6 cannot report a valid accuracy estimate for the iranti_ingest pipeline. The benchmark track should be marked **incomplete — pending real-provider retest** rather than concluded.

---

## 10. Addendum 2 — v0.2.14 Rerun with Real LLM Provider (OpenAI) (2026-03-21)

### 10.1 Motivation

Addendum 1 (Section 9) identified `LLM_PROVIDER=mock` as the most likely confound explaining both the v0.2.12 and v0.2.14 results. It concluded that the benchmark track was incomplete pending a real-provider retest. This addendum documents that retest, conducted against Iranti v0.2.14 with the instance reconfigured to use OpenAI as the LLM provider.

### 10.2 Retest Configuration

- **Iranti version:** 0.2.14
- **LLM provider:** OpenAI (confirmed active; real API calls in effect)
- **Test entities:** 2 (expanded from 1 to increase statistical coverage)
- **Keys per entity:** 4 (same key set as prior evaluations)
- **Input format:** Natural biographical prose (same format as the original v0.2.12 evaluation)
- **Infrastructure:** Installed Iranti instance at localhost:3001

The retest was explicitly designed to resolve the mock LLM confound identified in Addendum 1. By running with a confirmed real provider, the test isolates the behavior of the Librarian pipeline itself from the behavior of the mock test stub.

### 10.3 Results

For both entities, `iranti_ingest` was called with natural prose input identical in structure to the original Diana Voronova passage.

**Observed outcome — both entities:**

```
extractedCandidates: 0
written: 0
rejected: 0
escalated: 0
skippedMalformed: 0
```

**Aggregate result across 2 entities × 4 keys = 8 key-value opportunities:**

| Entity | extractedCandidates | written | Accuracy |
|--------|---------------------|---------|----------|
| Entity 1 | 0 | 0 | 0/4 |
| Entity 2 | 0 | 0 | 0/4 |
| **Total** | **0** | **0** | **0/8** |

No facts were extracted from natural prose input under a real LLM provider. The pipeline returned zero candidates for both entities without error, rejection, or escalation signals.

### 10.4 Interpretation

**Finding 1 — The v0.2.12 contamination finding was a mock LLM artifact.**

Under a real LLM provider, the verbatim substitution of KB values observed in v0.2.12 does not appear. The 0/8 result shows no extracted values at all — not wrong values, but no values. The contamination pattern described in Sections 4–5 of this paper was generated by the mock LLM returning its pre-seeded KB state rather than processing the input text. That finding should not be cited as evidence of a design defect in the Librarian pipeline. The contamination hypothesis (Section 5.2) is withdrawn as a primary explanation for the v0.2.12 data.

**Finding 2 — The prose extraction failure is real and LLM-independent.**

The `extractedCandidates=0` result observed under mock in Addendum 1 is now reproduced under a real LLM provider. The failure is not caused by the mock returning empty responses; it occurs when a real LLM is in the loop. This localizes the defect to the pipeline layer upstream of the LLM — specifically the chunker or extraction dispatch layer that processes input text before passing it to the model. The LLM is never reached for natural prose input in any tested configuration.

**Finding 3 — iranti_ingest is non-functional for natural prose extraction as of v0.2.14.**

Across all tested configurations (v0.2.12 mock, v0.2.14 mock, v0.2.14 openai), `iranti_ingest` does not produce usable extraction results for natural biographical prose. Under real-provider conditions, the extraction count is zero. The pipeline mechanism is broken upstream of the LLM; the LLM provider choice does not affect the outcome.

**Residual ambiguity — silent failure mode.**

The pipeline returns `extractedCandidates=0` without any error signal, escalation, or log output distinguishing between two possible failure scenarios: (a) the LLM was called but returned an empty extraction, or (b) the LLM API call failed silently and the system defaulted to an empty result. The observable output is identical under both scenarios. This ambiguity is noted as a secondary finding. It does not affect the primary conclusion — extraction does not work for prose — but it limits the precision of any diagnosis of the defect's location.

### 10.5 Definitive Version History

| Version | Provider | Accuracy | Failure mode |
|---------|----------|----------|--------------|
| 0.2.12 | mock | 0/4 | Contamination (mock LLM artifact — not a Librarian design defect) |
| 0.2.14 | mock | 2/4 (structured syntax only) | Coverage failure; extractedCandidates=0 for prose |
| 0.2.14 | openai | 0/8 | Extraction silence — LLM-independent; upstream chunker/dispatch failure |

### 10.6 Definitive Verdict

`iranti_ingest` is non-functional for natural prose extraction as of v0.2.14. The defect is in the chunker or extraction dispatch layer, not in the LLM. The v0.2.12 contamination finding was a mock LLM artifact and should not be cited as evidence of a Librarian design defect.

The original conclusion in Section 7 — that 25% extraction accuracy is insufficient — correctly identified a problem, but attributed it to the wrong cause. The actual cause is an upstream pipeline failure that prevents any extraction from occurring for natural prose input. The practical consequence is the same: `iranti_ingest` cannot be used to automatically build a knowledge base from text as of this version.

The benchmark track B6 is hereby concluded. The definitive finding is a pipeline-layer extraction failure, LLM-independent, affecting natural prose input across all tested configurations.

---

## 11. Addendum 3 — v0.2.16 Rerun (2026-03-21)

### 11.1 Motivation

Addendum 2 (Section 10) established that `iranti_ingest` is non-functional for natural prose extraction as of v0.2.14, with the defect localized to the chunker or extraction dispatch layer upstream of the LLM. The v0.2.16 release was retested to determine whether this upstream failure had been corrected. This addendum documents the retest and its results.

### 11.2 Retest Configuration

- **Iranti version:** 0.2.16
- **LLM provider:** OpenAI (confirmed active; real API calls in effect; same provider as Addendum 2)
- **Test entities:** 2 (same count as Addendum 2, providing matched comparison)
- **Keys per entity:** 4 (same canonical key set: affiliation, publication_count, previous_employer, research_focus)
- **Input format:** Natural biographical prose (same format used in original v0.2.12 evaluation and Addendum 2)
- **Infrastructure:** Installed Iranti instance at localhost:3001

### 11.3 Results

For both entities, `iranti_ingest` was called with natural prose input.

**Observed outcome — both entities:**

```
Entity 1:
  extractedCandidates: 20
  written: 4
  rejected: 0
  escalated: 0
  skippedMalformed: 0
  facts:
    - key: affiliation              → created
    - key: publication_count        → created
    - key: previous_employer        → created (decomposed — see 11.4)
    - key: research_focus           → created

Entity 2:
  extractedCandidates: 17
  written: 4
  rejected: 0
  escalated: 0
  skippedMalformed: 0
  facts:
    - key: affiliation              → created
    - key: publication_count        → created
    - key: previous_employer        → created (decomposed — see 11.4)
    - key: research_focus           → created
```

**Aggregate result across 2 entities × 4 keys = 8 key-value opportunities:**

| Entity | extractedCandidates | written | Correct values | Accuracy |
|--------|---------------------|---------|----------------|----------|
| Entity 1 | 20 | 4 | 4/4 | 4/4 |
| Entity 2 | 17 | 4 | 4/4 | 4/4 |
| **Total** | **37** | **8** | **8/8** | **8/8 (100%)** |

All extracted values match the input text. No contamination was observed — the extracted values correspond to the source passages, not to prior KB entries. This stands in contrast to v0.2.12 (mock LLM artifact contamination) and v0.2.14 (zero extraction for prose).

### 11.4 Sub-Key Decomposition of Compound Facts

One behavioral observation warrants documentation as a distinct finding. The `previous_employer` key — which in prior structured writes was stored as a single compound value (e.g., "Google Brain (2016–2018)") — was decomposed by the Librarian into sub-keys:

```
previous_employer.employer         → "Google Brain"
previous_employer.employer_location → "San Francisco, CA"
previous_employer.employment_start_year → 2016
previous_employer.employment_end_year   → 2018
```

The values are correct. The decomposition is internally consistent and correctly represents the source text. However, the key names differ from the single-key convention used in structured writes via `iranti_write` in prior benchmarks (B1–B4). An agent querying `iranti_query(entity, "previous_employer")` against ingest-written entries would not retrieve the same structure as against structured-write entries. Downstream retrieval using the exact key name `previous_employer` would return nothing; queries would need to use `previous_employer.employer` etc.

This is not an error, but it is a behavior that must be documented:

- `iranti_ingest` may decompose compound facts into sub-keys
- The decomposition is semantically correct but structurally different from structured writes
- Agents querying ingest-written KB entries must account for this difference
- Mixed KB populations (some entries from structured writes, some from ingest) may have inconsistent key structures for the same logical fact

### 11.5 Interpretation

**Finding 1 — The chunker/dispatch failure from v0.2.14 is fixed.**

The `extractedCandidates=0` result that appeared under all v0.2.14 configurations (mock and OpenAI) is no longer observed. Candidate counts of 20 and 17 for the two test passages indicate that the text is being chunked and dispatched to the LLM correctly. The upstream pipeline failure documented in Addendum 2 has been resolved.

**Finding 2 — Accuracy is 8/8 with no contamination.**

All four canonical keys were extracted correctly for both entities. No values from prior KB entries were substituted (the contamination pattern from v0.2.12, now attributed to mock LLM behavior, is absent). The Librarian is correctly reading the source passage and writing values that match the input text.

**Finding 3 — The v0.2.12 contamination hypothesis is definitively withdrawn.**

Addendum 2 concluded that the v0.2.12 contamination was almost certainly a mock LLM artifact. The v0.2.16 result — 8/8 accuracy under a real provider with no contamination — confirms this conclusion. The Librarian does not systematically substitute existing KB values for input text values when backed by a real LLM. The contamination pattern should not be cited as evidence of a Librarian design defect.

**Finding 4 — Sub-key decomposition is a documented behavior, not a failure.**

The decomposition of `previous_employer` into structured sub-keys is correct in value and internally consistent. It represents an Iranti Librarian design decision to normalize compound temporal facts into structured fields. Downstream consumers should be aware of this decomposition pattern when querying ingest-written entries.

### 11.6 Definitive Version History (Revised)

| Version | Provider | Accuracy | Failure mode |
|---------|----------|----------|--------------|
| 0.2.12 | mock | 0/4 | Contamination (mock LLM artifact — not a Librarian design defect) |
| 0.2.14 | mock | 2/4 (structured syntax only) | Coverage failure; extractedCandidates=0 for prose |
| 0.2.14 | openai | 0/8 | Extraction silence — LLM-independent; upstream chunker/dispatch failure |
| 0.2.16 | openai | 8/8 | None — fully operational |

### 11.7 Track Resolution

B6 is fully resolved as of v0.2.16. The pipeline is operational for natural prose extraction under a real LLM provider. The defect was in the chunker/extraction dispatch layer, which has been fixed between v0.2.14 and v0.2.16.

The findings that remain valid from prior evaluations:

- `iranti_write` and `iranti_ingest` are different code paths and may produce different key structures for compound facts
- Any benchmark that uses `iranti_ingest` to establish KB state should verify written key names match the expected schema before executing retrieval tests
- The v0.2.12 and v0.2.14 ingest failures were real at the time they occurred; they are now resolved and should not be cited as current limitations

The benchmark track B6 is concluded with a positive finding: `iranti_ingest` works correctly under v0.2.16 with a real LLM provider.

---

## Appendix A: Benchmark Specification

See `benchmarks/B6-ingest-pipeline/benchmark.md`.

## Appendix B: Raw Trial Records

See `results/raw/B6-ingest-pipeline.md`.
