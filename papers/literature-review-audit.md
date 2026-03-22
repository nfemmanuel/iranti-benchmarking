# Literature Review Audit: External Comparability of the Iranti Benchmarking Program

**Role:** literature_reviewer
**Date:** 2026-03-22
**Scope:** B1, B4, B7, B8, B9, B11, B12 — all tracks citing external benchmark sources
**Iranti version under test:** 0.2.16
**Status:** Pre-publication. This audit is blocking for any paper framing results as benchmark comparisons.

---

## Executive Summary

The Iranti benchmarking program is methodologically honest in its self-assessment: benchmark definitions consistently document deviations from cited sources, acknowledge null results, and list threats to validity. However, intellectual honesty about limitations does not resolve external comparability problems — it discloses them.

This audit finds that the program's citation framing **systematically overstates structural alignment with cited external benchmarks**. Most tracks are better described as "original capability probes loosely motivated by X" than as "inspired by X." The distinction matters for publication: peer reviewers familiar with the cited benchmarks will not accept the framing as currently written.

**Three most serious findings:**

1. **B1 never stresses the condition that makes NIAH interesting.** Maximum scale ~2,600 tokens; NIAH effects emerge above ~32k tokens. The "NIAH variant" label is not supportable.
2. **B4's HotpotQA citation is not defensible.** A 4-question probe over synthetic entities shares only the concept of "multi-hop lookup" with HotpotQA's actual design.
3. **B9's FB15k/YAGO citations are categorically inapplicable.** Those are knowledge graph embedding benchmarks; B9 is an API write/read completeness test.

**Overall assessment:** The benchmarks measure real properties of Iranti. The problem is not that they are useless — it is that the citations claim external comparability that does not exist. This is a **publication-blocking issue** for formal papers making benchmark-framed claims.

---

## Part 1: Per-Cited-Benchmark Analysis

### 1.1 Needle-in-a-Haystack (NIAH) — Kamradt, 2023

**What NIAH actually is:**
NIAH embeds a single specific sentence at a controlled depth position within a large document (Paul Graham essays as filler). The evaluation systematically varies: (1) total document length, 1k–200k tokens, and (2) depth position of the needle (0%=beginning, 100%=end), producing a full 2D heatmap of conditions. The essential property is this 2D sweep that reveals failure modes at scale.

**What B1 does:**
Varies distractor entity count (N=5, 20, 100, 500). Maximum condition ~2,400–2,600 tokens. No positional variation. No depth dimension. Both arms achieve 100% at all conditions.

**Assessment:** NIAH effects emerge above ~32k tokens. B1's longest condition is ~2,600 tokens — an order of magnitude below the stress threshold. B1 tests short-to-moderate entity list reading. NIAH tests failure modes at scale. B1 never enters the regime where NIAH is informative. The "NIAH variant" label is not supportable.

Additionally: early B1 runs use different entities across arms (baseline: alice_chen/bob_okafor; Iranti: ticket/cp_t010, ticket/cp_t011). No controlled A/B comparison was possible from those runs.

---

### 1.2 RULER — Hsieh et al., 2024 (arXiv:2404.06654)

**What RULER actually is:**
Extends NIAH with structured multi-key retrieval, variable tracking, word extraction, and QA tasks at 4k–128k tokens. Standard use: establishing a model's "effective context size." RULER's multi-hop component chains key-value lookups within a single long document — not against a separate KB system.

**B1/B4 use:** Neither implements RULER's evaluation protocol (systematic length sweep, standardized task families, published scoring rubrics). Neither measures effective context size. B4's multi-hop lookup against a separate KB is architecturally different from RULER's within-document chain tasks.

---

### 1.3 HotpotQA — Yang et al., 2018 (EMNLP 2018)

**What HotpotQA actually is:**
113,000-question multi-hop QA dataset built on Wikipedia. Questions require reasoning across exactly two Wikipedia articles. Human-annotated supporting facts. Metrics: EM, F1, supporting fact identification (joint EM, joint F1). Two settings: distractor (large document pool) and fullwiki (open-domain). Tests both retrieval quality and multi-hop reasoning quality simultaneously.

**What B4 does:**
4 questions over 6 synthetic entities. No Wikipedia grounding. No supporting fact annotations. Binary correct/incorrect. "Multi-hop" requires finding an entity by attribute value — a set lookup, not HotpotQA's bridging question structure ("Where was the director of [Film] born?"). Does not use the HotpotQA dataset, does not measure EM or F1, operates at n=4.

**Assessment:** The HotpotQA citation is the weakest citation in the program. Structural connection is limited to "requires more than one lookup." HotpotQA's defining properties — 113k scale, Wikipedia grounding, supporting fact annotation, distractor/fullwiki settings — are entirely absent. B4 is a 4-question sequential lookup probe for iranti_search discovery capability.

---

### 1.4 MemGPT — Packer et al., 2023 (arXiv:2310.08560)

**What MemGPT actually is:**
Two-tier memory management architecture (in-context "main memory" + external persistent store) with the LLM acting as memory manager. Evaluated on: document QA over long documents, conversational agent consistency across sessions, and a descriptive multi-agent sketch. Evaluation uses human preference ratings, F1-based QA metrics, and multi-session consistency probes. Compared against vanilla GPT-4, fixed-size context baselines, and RAG. The multi-agent section is **descriptive, not a quantitative evaluation protocol**.

**B7, B8, B11, B12 use:**
- B7: cites MemGPT as framing; does not replicate any MemGPT evaluation; 5,500-token scale is far below MemGPT's target regime; no MemGPT system used as comparison baseline.
- B8: cites "MemGPT multi-agent scenarios" — MemGPT's multi-agent section has no replicable quantitative protocol.
- B11, B12: cite "MemGPT memory paging" — this is an architectural mechanism, not an evaluation benchmark.

**Assessment:** MemGPT appears across four tracks providing legitimate conceptual motivation. But in no case does the program implement a MemGPT-comparable evaluation: no MemGPT system as comparison baseline, no MemGPT evaluation dataset, and the evaluation regimes are not the ones MemGPT was designed for. Citations justify the general problem statement but not a benchmark family label.

---

### 1.5 FB15k / YAGO — Knowledge Graph Benchmarks (B9)

**What FB15k and YAGO actually are:**
FB15k (Bordes et al., 2013): subset of Freebase for knowledge graph embedding evaluation — link prediction and relation classification. Metrics: MRR, Hits@K. Tests whether a trained embedding model correctly predicts missing edges. YAGO: large-scale knowledge graph built from Wikipedia/WordNet/GeoNames, used for KB population and entity recognition.

**What B9 does:** Writes 5 directed edges via iranti_relate and tests whether they can be queried back. Findings: writes succeed, read is functional. No link prediction. No embedding model. No held-out edge split. No MRR or Hits@K.

**Assessment:** The FB15k and YAGO citations are categorically inapplicable. They are link prediction benchmarks for trained embedding models. B9 is an API write/read completeness test. A reviewer from the knowledge graph embedding community will find this citation incompetent or misleading.

---

### 1.6 LONGMEM — Wang et al., 2023 (arXiv:2306.07174)

**What LONGMEM actually is:** Proposes self-guided memory retrieval for LLMs working with 30k–100k token documents. A method paper, not a shared evaluation benchmark.

**B7 use:** Cites LONGMEM as background motivation, explicitly acknowledges the 5,500-token execution is below the LONGMEM regime, and frames LONGMEM as a target for future scale-up. This is the most defensible citation use in the program — honest about the gap, used as directional motivation only.

---

## Part 2: External Comparability Ratings by Track

| Track | Cited benchmark family | Rating | Primary reasons |
|-------|----------------------|--------|-----------------|
| B1 | "Long-context retrieval (NIAH variant)" | **FAIL** | Max ~2,600 tokens; NIAH effects at 32k+; no depth sweep; arms use different entities |
| B4 | "RULER multi-hop; HotpotQA" | **FAIL** | HotpotQA: 113k Wikipedia-grounded Q; B4: 4 synthetic Q; no EM/F1; no supporting facts |
| B7 | "MemGPT; LONGMEM; ConvQA" | **PARTIAL** | Coherent design; honest about scale gap; no MemGPT system as comparison |
| B8 | "MemGPT multi-agent scenarios" | **FAIL** | MemGPT multi-agent section has no quantitative protocol; definitional baseline |
| B9 | "FB15k, YAGO" | **FAIL** | Categorically inapplicable: link prediction benchmarks vs. API completeness test |
| B11 | "MemGPT memory paging; attention restoration theory" | **PARTIAL** | Coherent capability probe; "attention restoration theory" (Kaplan 1989) has no LLM evaluation meaning |
| B12 | "MemGPT session paging; checkpoint/restart literature" | **PARTIAL** | Three-path recovery matrix is coherent; "checkpoint/restart literature" has no specific citations; definitional baseline; simulated session break |

---

## Part 3: Specific Peer-Review Risk Claims

**PR-RISK-1 (B1):** "NIAH variant" in the benchmark family label. The longest document is ~2,600 tokens. Any reviewer who has used NIAH will flag this as a misrepresentation.

**PR-RISK-2 (B1):** Arms use different entities (alice_chen/bob_okafor vs. ticket/cp_t010, cp_t011). No differential can be derived from this design.

**PR-RISK-3 (B4):** "Inspired by HotpotQA" for a 4-question synthetic probe. A reviewer familiar with HotpotQA will request removal of this citation from the benchmark family designation.

**PR-RISK-4 (B4):** iranti_search failure framed as a multi-hop evaluation result. B4's finding is a system defect finding — conflating it with multi-hop reasoning evaluation will attract criticism.

**PR-RISK-5 (B8):** Definitional 0%/100% differential presented as a benchmark result. This implies empirical measurement where the 0% is a logical derivation.

**PR-RISK-6 (B8):** "MemGPT multi-agent scenarios" citation — MemGPT's multi-agent section does not contain a replicable quantitative protocol.

**PR-RISK-7 (B9):** FB15k and YAGO citations for an API write/read test. Categorically inapplicable.

**PR-RISK-8 (B11):** "Attention restoration theory" citation. Has no accepted technical meaning in LLM systems evaluation.

**PR-RISK-9 (B7, B12):** MemGPT cited as benchmark inspiration without MemGPT as comparison baseline. Reviewers will ask why.

**PR-RISK-10 (B1, B7):** Null results at sub-stress scale. These cannot be published as performance claims. The only honest framing is "pilot methodology established for scale-up."

---

## Part 4: Recommended Relabeling

| Track | Current Label | Recommended Label |
|-------|--------------|-------------------|
| B1 | "Long-context retrieval (NIAH variant)" | "Entity retrieval capability probe (motivated by NIAH; NIAH-comparable scale not yet reached)" |
| B4 | "RULER multi-hop; HotpotQA" | "Sequential entity discovery probe (original task; HotpotQA/RULER cited as background motivation only)" |
| B7 | "MemGPT; LONGMEM; ConvQA" | "Episodic memory recall pilot (5,500 tokens; scale-up required before comparative claims)" |
| B8 | "MemGPT multi-agent scenarios" | "Shared KB coordination characterization study (original design; definitional baseline)" |
| B9 | "FB15k, YAGO" | "Relationship graph API capability audit (remove FB15k/YAGO citations entirely)" |
| B11 | "MemGPT memory paging; attention restoration theory" | "Context recovery capability probe (motivated by MemGPT architecture; remove attention restoration theory)" |
| B12 | "MemGPT session paging" | "Session recovery pathway characterization (original design; motivated by stateless-LLM problem)" |

---

## Part 5: Tracks to Relabel "Original Task"

**Should be labeled "Original Task" (no meaningful external benchmark connection):**
- **B8:** The shared KB multi-agent coordination scenario has no external benchmark analog.
- **B9:** The relationship graph write/read completeness audit has no connection to FB15k, YAGO, or any knowledge graph benchmark.

**Should be labeled "Loosely motivated by X" (conceptual motivation only, no protocol connection):**
- B1: Loosely motivated by NIAH. Has not reached NIAH-relevant scale.
- B4: Loosely motivated by HotpotQA and RULER. Actual task is an original sequential lookup probe.
- B11, B12: Loosely motivated by MemGPT's architectural concept of memory paging. Not connected to any MemGPT evaluation protocol.

---

## Part 6: Minimum Requirements for External Publication

**B1:** Reach N≥1000 entities (~55k tokens) to enter NIAH-relevant territory. Full-protocol match (both arms on same entities). Add depth sweep or remove NIAH from benchmark family label. Use independent evaluation harness.

**B4:** Replace HotpotQA and RULER with "original task design." Scale to ≥50 questions minimum. Reframe iranti_search failure as a system capability finding, not a benchmark comparison.

**B7:** Rerun at ≥20k tokens before any differential claim. Add context-clear phase to Iranti arm. Include at least one non-trivial comparison baseline.

**B8:** Reframe as characterization study. Demonstrate true multi-agent isolation (separate sessions/processes). Remove MemGPT multi-agent benchmark lineage claim.

**B9:** Remove FB15k and YAGO citations entirely. Reframe as capability gap report.

**B11, B12:** Remove "attention restoration theory." Conduct true session breaks. Test across multiple entities. Include empirical alternative baseline.

---

## Conclusion

The Iranti benchmarking program conducts honest and useful capability characterization work. The scientific culture is sound: null results are reported, threats to validity are documented, and capability gaps are not hidden.

The publication problem is one of framing. NIAH, HotpotQA, MemGPT's evaluation protocol, and FB15k are not being replicated, adapted, or closely approximated. They are cited as ancestors of what the benchmarks aspire to become. That is a legitimate scientific vision, but it requires honest framing that clearly distinguishes "motivated by X" from "comparable to X."

In the program's current state, all papers framing results as benchmark comparisons to named external benchmarks must have those frames revised before any external submission. The factual findings are real and worth publishing — as capability characterization studies of Iranti v0.2.16, motivated by external benchmark traditions but not yet comparable to them.

---

**Sources:**
- Kamradt, G. (2023). Needle In A Haystack. GitHub.
- Hsieh, C-Y. et al. (2024). RULER: What's the Real Context Size of Your Long-Context Language Models? arXiv:2404.06654.
- Yang, Z. et al. (2018). HotpotQA: A Dataset for Diverse, Explainable Multi-hop Question Answering. EMNLP 2018.
- Packer, C. et al. (2023). MemGPT: Towards LLMs as Operating Systems. arXiv:2310.08560.
- Wang, W. et al. (2023). LONGMEM: Enabling LLMs to Work With Ultra Long Context. arXiv:2306.07174.
- Bordes, A. et al. (2013). Translating Embeddings for Modeling Multi-relational Data. NeurIPS 2013. (FB15k source)

*literature_reviewer — Iranti Benchmarking Program — 2026-03-22*
