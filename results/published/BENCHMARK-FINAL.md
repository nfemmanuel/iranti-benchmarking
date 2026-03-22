# Iranti Benchmarking Program — Final Scientific Summary

**Date:** 2026-03-22
**Version under test:** 0.2.16 (installed)
**Program versions:** v1.0 (0.2.12) through v6.0 (0.2.16)
**Evaluation model:** Claude Sonnet 4.6 (claude-sonnet-4-6)
**LLM provider:** openai (LLM_PROVIDER=openai; real provider used from v3.0 onward)
**Total tracks:** B1–B13

---

## Section 1: Program Overview

This program benchmarked the installed Iranti memory system (versions 0.2.12 through 0.2.16) against controlled evaluation tasks drawn from recognized LLM and agent evaluation practice. The methodology in each track was: establish a baseline condition (the same task without Iranti in the loop), run the same task with the installed Iranti instance integrated through the MCP tool interface (iranti_query, iranti_search, iranti_observe, iranti_attend, iranti_write, iranti_ingest, iranti_relate, iranti_related, iranti_related_deep, iranti_who_knows, iranti_handshake), and compare results conservatively. All reruns used the installed binary accessed through the CLI and HTTP API; no direct imports from the Iranti source checkout were used. The program ran across six evaluation passes (v1.0 through v6.0) and closed 13 benchmark tracks spanning: exact-key retrieval at scale (B1), cross-session and cross-version persistence (B2, B13), conflict resolution and knowledge currency (B3, B5), automated ingest from prose (B6), attribute-value search (B4), relationship graphs (B9), episodic memory (B7), multi-agent attribution and provenance (B8, B10), context recovery (B11), session recovery (B12), and upgrade safety (B13). The final v6.0 revalidation pass confirmed all v5.0 conclusions, introduced no new open defects, and documented upstream alignment between the installed binary's behavior and source-level changes in commit d03781a1.

---

## Section 2: Confirmed Capability Findings

### 1. Exact Entity+Key Retrieval (iranti_query)

**Tool:** iranti_query
**Tracks:** B1 (primary), corroborated across B2, B3, B4, B5, B6, B9, B10, B11, B12, B13
**Score / Evidence:** At N=5000 entities (~276k tokens): Iranti 4/4, baseline 0/4. At N=5 through N=500: null differential (both arms 10/10 or better). Retrieval is O(1) — key lookup does not degrade with KB size at tested scales.
**Caveat:** Tested at a single scale point above the context window threshold (N=5000). The degradation onset between N=500 (~28k tokens) and N=5000 (~276k tokens) has not been characterized. The categorical claim — that iranti_query succeeds where context-reading is architecturally infeasible — is valid at the tested scale. Values containing slash characters, URL paths, and email+path strings return intact (v6.0 revalidation, 6 calls across 4 retrieval paths).

### 2. Cross-Session and Cross-Version Persistence

**Tools:** iranti_write, iranti_query
**Tracks:** B2 (cross-session), B13 (cross-version)
**Score / Evidence:** B2: 20/20 full-protocol rerun on v0.2.16. B13: 3/3 facts durable across v0.2.12 → v0.2.14 → v0.2.16 upgrades; API surface (MCP tool signatures) stable across all three versions.
**Caveat:** B2 protocol does not cleanly isolate true cross-session boundaries (intra-session vs. cross-session boundaries were not independently verified). B13 n=3; single run; existence proof only. Forward upgrade safety is supported by empirical evidence at this scale and by upstream ADR 007 (compatibility-first policy), but the empirical basis remains n=3.

### 3. Automated KB Population from Prose (iranti_ingest)

**Tool:** iranti_ingest
**Tracks:** B6
**Score / Evidence:** 8/8 facts extracted from prose biographical input under real LLM provider (LLM_PROVIDER=openai). Prior apparent failures in v1.0 and v2.0 were confirmed to be mock-LLM artifacts, not product defects.
**Caveat:** n=8; single entity type (prose biographical). Compound facts are decomposed into sub-keys — the key naming schema may differ from simple expected-key specifications in evaluation harnesses. Confirmed functional for the tested entity type; accuracy rate on diverse entity types or production-scale prose has not been characterized.

### 4. Attribute-Value Search (iranti_search)

**Tool:** iranti_search
**Tracks:** B4
**Score / Evidence:** Named attribute queries functional with vectorScore 0.35–0.74. Direct attribute queries against stored key names return correct results. Oracle arm (iranti_query with known keys): 4/4. v6.0 confirmation: named attribute query PASS; semantic paraphrase query FAIL.
**Caveat:** Semantic paraphrase queries are not functional. The system does not resolve free-text natural-language descriptions of attributes to stored keys. Named attribute queries work; paraphrase-described lookups do not. This boundary is now documented in the upstream README. Multi-hop search via named attributes is partially viable (oracle arm functional, search arm paraphrase-limited).

### 5. Relationship Graph (iranti_relate, iranti_related, iranti_related_deep)

**Tools:** iranti_relate, iranti_related, iranti_related_deep
**Tracks:** B9
**Score / Evidence:** 4/4 edges written and readable. Depth=2 traversal confirmed on a 4-node graph. Both read paths (iranti_related and iranti_related_deep) confirmed functional on v0.2.16; write-only behavior observed in earlier versions was resolved.
**Caveat:** n=4 edges; single graph topology. No relationshipType filter parameter is available in the current API — client-side filtering is required to distinguish edge types. iranti_related_deep returns a flat list without per-hop depth labels.

### 6. Context Recovery with Hints (iranti_observe and iranti_attend)

**Tools:** iranti_observe, iranti_attend
**Tracks:** B11, B12
**Score / Evidence:** B11: 5/6 recall with explicit entity hints (observe+hint); 4/6 natural attend injection (no hints). Auto-detection mechanism confirmed working via alias index (matchedBy="alias", confidence=0.82 in v6.0). B12: 5/8 observe with hints.
**Caveat:** Auto-detection operates through the entity alias index, not through paraphrase-level NLP. Detection succeeds when the entity name or a registered alias appears in the context string; it does not extend to purely paraphrase-described contexts. Confidence-based ranking deprioritizes low-confidence (progress/transient) facts — the confidence ranking limitation (see Section 3, Defect 2) applies to the passive observe pathway.

### 7. Attend Injection Classifier (iranti_attend)

**Tool:** iranti_attend
**Tracks:** B11
**Score / Evidence:** Entity detection confirmed working. forceInject arm: 5/6. Natural attend: 4/6. The shouldInject classifier correctly suppresses injection for non-matching contexts. v6.0: slash-bearing entity with forceInject=true — PASS, full values returned.
**Caveat:** The shouldInject classifier will not inject for contexts where the entity name or alias is absent, even if the context is semantically related. The prior claim that slash characters in fact values caused silent exclusion by the attend classifier is retracted (see Section 4A).

### 8. Deterministic Conflict Resolution

**Tool:** Iranti Librarian (internal conflict resolution subsystem)
**Tracks:** B3, B5
**Score / Evidence:** B3: 4/4 deterministic conditions correct (correct resolution verified against the conflict resolution formula for same-source overwrites, source-consistent updates, and rejections). B5: deterministic paths confirmed; T5 (conf=99, gap=24.65) bypasses LLM arbitration deterministically — high-gap threshold confirmed functional. Formula behavior verified against observed outcomes.
**Caveat:** The deterministic logic is sound only for the non-LLM-routed paths. The LLM arbitration path (cross-source conflict, weighted score gap < 10) is blocked by a transaction timeout defect (see Section 3, Defect 1). Do not claim LLM-arbitrated conflict resolution as functional.

### 9. Multi-Agent Attribution

**Tool:** iranti_who_knows
**Tracks:** B8, B10
**Score / Evidence:** B8: 5/5 exact agentId attribution using true agent parameter override (first valid cross-agentId test in the program; prior single-session simulation in v1.0 was not a true multi-agent test). B10: per-agentId records confirmed when multiple agent overrides write to the same shared entity — write provenance correctly partitioned at the agentId × entity level.
**Caveat:** The KB is globally shared — there is no per-agentId read isolation. Attribution tracks write provenance, not read namespace isolation. B10 multi-agent finding at n=1 scenario. Behavior under concurrent same-entity writes from multiple agents has not been tested.

### 10. Session Recovery via Explicit Query

**Tool:** iranti_query
**Tracks:** B12
**Score / Evidence:** 8/8 explicit query arm vs. 0/8 baseline (stateless context-reading). A positive differential of +8 across 8 task-state facts. iranti_handshake: 0/8 (confirmed initialization tool, not a session recovery mechanism — see Section 5).
**Caveat:** Oracle condition — the agent must know which entity+key pairs to query. This is a meaningful constraint: the session recovery advantage is available only when the agent can anticipate the required keys. n=8; single run; no comparison against alternative recovery strategies (RAG-based summarization, etc.).

### 11. Upgrade Durability

**Tools:** All tools (B13 uses iranti_query to probe facts written across versions)
**Tracks:** B13
**Score / Evidence:** 3/3 facts durable across three version boundaries (v0.2.12 → v0.2.14 → v0.2.16). MCP tool API surface stable across all tested versions — no breaking changes in tool signatures observed. Upstream ADR 007 formalizes a compatibility-first policy covering CLI interface, REST API, TypeScript SDK, config files, and persisted state.
**Caveat:** n=3 facts; single run; existence proof only. The empirical finding is retrospective (tested versions); ADR 007 provides a policy-level supplement for forward upgrades but does not change the retrospective evidence base. Upstream runtime lifecycle hardening (commit d03781a1) improves the robustness of cross-version runtime metadata handling, strengthening the infrastructure dimension of this finding.

---

## Section 3: Open Defects

Two defects remain open as of the final program version (v6.0, 2026-03-22). Neither was re-introduced or modified in the v6.0 revalidation pass; both characterizations carry forward from v5.0.

---

**[OPEN — HIGH] 1. Transaction Timeout on LLM-Arbitrated Writes**

- **Trigger:** Cross-source conflict where the weighted confidence score gap between the incoming write and the incumbent fact is less than 10. Both trigger conditions must be present simultaneously: (a) the writing agent is a different source than the source that wrote the incumbent fact, and (b) the gap falls below the deterministic acceptance threshold.
- **Failure mode:** The Librarian routes the conflict to an LLM arbitration call inside a database transaction. Real LLM calls take approximately 7–16 seconds; the transaction window is approximately 5 seconds. The transaction times out and rolls back. The incumbent fact is preserved (no corruption). The incoming write is silently dropped — the calling agent receives no business-logic error and cannot distinguish a successful write from a dropped write at the API level.
- **Confirmed in:** B3 condition C3 (LLM-arbitrated conflict); B5 conditions T1 and T4 (cross-source writes in gap < 10 zone).
- **Estimated scope:** Conservatively 10–30% of cross-source writes, depending on deployment confidence calibration practices (high uncertainty — actual rate depends on deployment practices not characterized in this program). In multi-agent or multi-pipeline deployments where cross-source conflicts are structurally common, the operational impact could be significant.
- **Workaround:** Calibrate new writes with sufficient confidence to exceed gap ≥ 10 relative to all incumbents from other sources, or avoid cross-source conflict scenarios entirely. This requires deliberate agent design; there is no mitigation available at the API level.
- **Priority for engineering:** Highest in this program. This defect is systemic, not isolated to a single track, affects a non-trivial fraction of real-world deployments, and has no API-level workaround.

---

**[OPEN — MEDIUM] 2. Observe Confidence Ranking Misses Progress/Transient Facts**

- **Trigger:** Always active. iranti_observe (and iranti_attend in passive mode) ranks candidate facts by stored confidence before returning results. Facts written with low confidence scores — including progress markers, transient state, and intermediate task results — are deprioritized in this ranking.
- **Failure mode:** Low-confidence progress facts are ranked below high-confidence setup facts and are not returned in observe/attend results, even when they are contextually the most relevant facts for the current session. The agent receives accurate facts but not necessarily the most situationally relevant ones.
- **Confirmed in:** B12 — observe+hint arm: 5/8; explicit iranti_query arm: 8/8. The 3-fact gap is attributable to confidence ranking deprioritizing progress facts that were successfully retrieved by explicit query.
- **Workaround:** Use iranti_query explicit for known progress-fact keys. This is effective (8/8 in B12) but requires the agent to anticipate which keys contain progress facts — the same oracle constraint that applies to session recovery (see Finding 10 above). The confidence ranking is a design characteristic, not a tunable parameter.

---

## Section 4: Resolved and Retracted Findings

### 4A: Retracted Finding — Forward Slash in Fact Values Causes Silent Retrieval Loss

**Originally claimed:** Values containing `/` or `%` characters trigger `parse_error` during attend and observe scoring, causing silent exclusion of affected facts from retrieval results. Facts stored with slash-bearing values (URLs, file paths, ratios, email+path strings) would be silently dropped from iranti_observe and iranti_attend results.

**First characterized:** v3.0 program pass, B11 new findings (2026-03-21). A `%` trigger was initially included; the v4.0 pass narrowed the claim to `/` only after `%` was not reproduced.

**Why it was wrong:** The `parse_error/invalid_json` signals observed in `debug.dropped` during observe and attend calls are produced by the entity-extraction NLP pipeline, which attempts to classify arbitrary context strings as entity references. These signals appear regardless of whether slash characters are present in stored fact values. They represent classification noise in the NLP pipeline, not loss of stored facts. The pipeline that drops entity classification candidates does not affect the retrieval path for facts stored against already-known entity keys.

**How we found out:** v5.0 minimal reproduction test (2026-03-21): a fresh entity was written with slash characters in structurally significant positions across multiple key values. All four retrieval paths (iranti_query, iranti_search, iranti_observe, iranti_attend) returned the slash-bearing values intact. The `parse_error` signals appeared in debug output regardless of the slash content. v6.0 fresh reproduction (2026-03-22): 6 calls across 4 retrieval paths against a freshly written entity (`project/v6_slash_repro`) with slash characters in URLs, file paths, ratios, and email+path strings — all 6 PASS. Upstream confirmation: commit d03781a1 added `tests/memory-retrieval-regressions.ts`, which includes explicit regression tests for slash-value retrieval across all four paths — all PASS.

**What the correct conclusion is:** Slash characters and other special characters in stored fact values do not cause silent retrieval loss through any of the four tested retrieval paths. The `parse_error` signals in debug output are entity-extraction NLP classification noise and are not indicative of fact loss.

**Status of corrections to affected documents:** The RETRACTED classification was applied at v5.0 and confirmed at v6.0. The defect table in rpm-signoff-v5.md, rpm-signoff-v6.md, and statistical-review.md all carry the RETRACTED status. The original v3.0 claim in rpm-signoff-v3.md is superseded by this retraction. **Do not cite the original claim as a current or valid defect.**

---

### 4B: Resolved Finding — user/main Noise Entry Pollutes Retrieval Results

**Originally characterized:** v2.0 / v0.2.14 program pass, B11 evaluation. A `user/main/favorite_city` entry (value: `{"city": "NoiseTown"}`) was observed surfacing in attend and observe retrieval results for unrelated queries, occupying retrieval slots and reducing B11 scores. The entry was attributed to Iranti's session memory infrastructure.

**What was right about the original characterization:** The entry did exist in the benchmark KB. It did appear in attend/observe retrieval results during the v0.2.14 evaluation pass, and it did occupy retrieval slots that would otherwise have been used for task-relevant facts. The effect on B11 scores under v0.2.14 was real.

**What was wrong about the original characterization:** The source attribution was incorrect. The entry did not originate from Iranti's session memory infrastructure as a product behavior. It originated from benchmark regression testing that exercised test infrastructure similar to the upstream TypeScript smoke test, which at that time wrote to `user/main` as a test artifact. This is a test-artifact contamination issue, not a product defect in Iranti's memory write behavior.

**How we found out:** v5.0 revalidation (2026-03-21) found the entry no longer surfacing in attend/observe results in natural contexts. The entry's source label in the KB was identified as `memory_regression_noise`, indicating it was written by benchmark regression infrastructure rather than by Iranti product behavior. Upstream confirmation: commit d03781a1 changed the TypeScript smoke test to write to `person/${uniqueId('ts_client_person')}` instead of `user/main`, closing the test-infrastructure pathway through which the artifact was generated.

**Current status:** The `user/main/favorite_city` entry (source: `memory_regression_noise`) persists in the local benchmark KB as a historical artifact from this program's own regression testing. As of v5.0 and v6.0 revalidation, it does not surface in retrieval results in natural contexts: natural attend against production-representative contexts returns `shouldInject=false`; iranti_observe with project entity hints returns project facts only. The entry surfaces only under explicit forced injection targeting `user/main` — which is correct retrieval behavior, not contamination. **The slot-pollution behavior is resolved; the test-artifact write pathway is closed upstream.**

**Reproducibility note:** A replication run on a clean Iranti instance will not have this entry. Prior B11 scores from v0.2.14 may reflect the artifact's influence on retrieval slot allocation in that version. Replication runs on clean instances should not expect to replicate the v0.2.14 slot-pollution behavior.

---

## Section 5: Null and Inconclusive Results

**B7 — Episodic Memory (null differential at ~5k tokens):** Both arms (baseline and Iranti) scored 10/10 across 10 questions against ~5,500 tokens of episodic content. The null differential held under both mock-LLM (v1.0) and real LLM (v5.0 full rerun), confirming it is provider-independent. The episodic memory framework design is correct for the tested scale. The degradation regime (contexts exceeding 50k tokens, where episodic retrieval limits would become operationally relevant) was not tested; the onset of differential between the two arms above ~5k tokens has not been characterized.

**B1 N=5 through N=500 (null differential at small and moderate scales):** At N=5 (context ~280 tokens), N=20 (~1.1k tokens), N=100 (~5.5k tokens), and N=500 (~28k tokens), both arms scored at or near ceiling. No differential was observed. The degradation onset — the scale at which the baseline begins to fail and the Iranti arm maintains performance — lies between N=500 (~28k tokens) and N=5000 (~276k tokens) and has not been precisely located. The N=5000 result is a categorical finding at a single scale point, not a continuous characterization of the advantage curve.

**B11 handshake arm (0/8 — confirmed initialization tool):** iranti_handshake returned empty workingMemory across all 8 B12 probe conditions. This is consistent with its documented behavior: iranti_handshake is a session initialization tool that constructs a working memory state when a prior checkpoint exists. In the absence of a prior checkpoint for the specific task entity, it returns empty workingMemory. It is not a general session recovery mechanism. The B12 0/8 result is expected and correct behavior; it is not a defect. Use iranti_query explicit for task-state recovery.

---

## Section 6: Known Program Limitations

The following limitations apply to all findings in this program. They are not disputes of specific results but constraints on the strength of inference warranted by the evidence.

1. **All scores are point estimates.** No condition in this program was run with sufficient replications to compute confidence intervals. All n values are small (n=4 to n=20). The program produces existence proofs and directional findings, not statistically significant measurements.

2. **Self-evaluation bias is unresolved.** The same LLM model (Claude Sonnet 4.6) that generated task stimuli and candidate responses also evaluated those responses throughout the program. Independent human evaluation or a blind evaluation protocol was not applied to any track. Response-quality scores should be interpreted with this in mind.

3. **KB state accumulation.** The benchmark KB has accumulated entries from all program passes (v1.0 through v6.0), multiple full-protocol reruns, targeted revalidation writes, and regression test artifacts. The KB is not a clean-room environment. A replication run beginning with an empty KB may produce different results in tracks where KB state influences retrieval (particularly B11, B12, and any track using iranti_observe or iranti_attend).

4. **True concurrent writes not tested.** B8 and B10 confirmed agentId attribution under sequential multi-agent write scenarios. True concurrent writes from multiple agents to the same entity in overlapping transaction windows were not tested. Attribution correctness and conflict resolution behavior under true concurrency are not characterized.

5. **B12 and B13 are single-run existence proofs.** Session recovery (B12) and upgrade safety (B13) each have a single run per condition at small n. The findings establish that the capabilities exist; they do not characterize failure rates, edge cases, or behavior at scale.

6. **No comparison against alternative memory strategies.** The program compares Iranti against a stateless baseline. No comparison against alternative structured memory strategies (vector-store RAG, session summarization, fine-tuned recall) was conducted. The differential findings are relative to a no-memory baseline only.

---

## Section 7: Final Benchmark Summary Table

| Track | Description | Final verdict | Key result | Open issues |
|-------|-------------|---------------|------------|-------------|
| B1 | Exact entity+key retrieval at scale | **POSITIVE DIFFERENTIAL CONFIRMED** | Iranti 4/4 vs. baseline 0/4 at N=5000 (~276k tokens); null differential at N≤500 | None — degradation onset not characterized |
| B2 | Cross-session persistence | **CONFIRMED** | 20/20 full-protocol rerun on v0.2.16 | Session boundary isolation not cleanly verified |
| B3 | Conflict resolution | **PARTIAL — deterministic confirmed; LLM path defect** | 4/4 deterministic conditions correct; C3 LLM-arbitrated path fails with transaction timeout | Transaction timeout defect (OPEN — HIGH) |
| B4 | Attribute-value search | **PARTIAL — named attribute queries viable; paraphrase not** | Oracle arm 4/4; direct named queries functional; semantic paraphrase fails | Paraphrase non-functional (design limitation) |
| B5 | Knowledge currency | **PARTIAL — deterministic paths confirmed; LLM path defect** | Deterministic bypass functional; T5 new finding: conf=99 gap=24.65 bypasses LLM path; T1/T4 fail with timeout | Transaction timeout defect (OPEN — HIGH) |
| B6 | Automated ingest from prose | **FIXED — CONFIRMED** | 8/8 under real LLM; prior mock-LLM failures retracted | Sub-key decomposition behavior requires documentation |
| B7 | Episodic memory | **CONFIRMED — NULL DIFFERENTIAL** | 10/10 both arms at ~5k tokens; provider-independent; null differential robust | Degradation regime (>50k tokens) not tested |
| B8 | Multi-agent attribution | **CONFIRMED** | 5/5 true agentId attribution using agent parameter override | n=5; first valid cross-agentId test; concurrent writes not tested |
| B9 | Relationship graph | **FIXED — CONFIRMED** | 4/4 edges write+read; depth=2 traversal confirmed | No relationshipType filter in API; flat deep-traversal output |
| B10 | Knowledge provenance | **CONFIRMED + NEW FINDING** | Per-agentId records confirmed on shared-entity multi-agent write | n=1 multi-agent scenario; concurrent writes not tested |
| B11 | Context recovery | **SUBSTANTIALLY IMPROVED — CONFIRMED** | Auto-detection via alias working; observe+hint 5/6; attend natural 4/6; slash defect RETRACTED; user/main RESOLVED | Confidence ranking misses progress facts (OPEN — MEDIUM) |
| B12 | Session recovery | **POSITIVE DIFFERENTIAL CONFIRMED** | Explicit query 8/8 vs. baseline 0/8; observe+hint 5/8; handshake 0/8 (initialization only) | Oracle condition on explicit arm; confidence ranking on observe arm |
| B13 | Upgrade safety | **CONFIRMED — PASS** | 3/3 facts durable across v0.2.12→v0.2.14→v0.2.16; API surface stable; ADR 007 formalizes compatibility commitment | n=3; single run; existence proof |

---

## Footer

Prepared by: research_program_manager, statistics_reviewer, paper_author.
Signed off: research_program_manager.
Date: 2026-03-22.
Program version: 6.0 — FINAL.

All 13 tracks closed. Two defects open (transaction timeout: HIGH; observe confidence ranking: MEDIUM). Two prior defect claims corrected (slash-value: RETRACTED; user/main: RESOLVED). No open benchmark gaps. No open track revisions. The statistical record is closed.
