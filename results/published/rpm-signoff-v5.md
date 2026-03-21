# Research Program Manager — Sign-Off v5.0
## Iranti Benchmarking Program — Complete Program Close-Out

**Date:** 2026-03-21
**RPM:** research_program_manager (benchmark_program_main session)
**Iranti version:** 0.2.16
**Prior versions evaluated:** 0.2.12 (v1.0), 0.2.14 (v2.0), 0.2.16 (v3.0 → v4.0 → v5.0)
**All tracks:** B1–B13 fully tested on v0.2.16
**LLM_PROVIDER:** openai
**Evaluation model:** Claude Sonnet 4.6 (claude-sonnet-4-6)

---

## What This Sign-Off Closes

v4.0 (the prior sign-off) closed all open items from v3.0. This v5.0 sign-off closes the full-protocol reruns for B2, B3, B5, B7, and B10 — the five tracks that had not been fully re-executed under v0.2.16 with a real LLM provider at the time of v4.0. It also records the transaction timeout defect now fully characterized as a systemic cross-cutting issue (B3 + B5), a new multi-agent attribution finding in B10, and completes the statistical record.

No benchmark gaps remain open.

---

## Complete Track Disposition

| Track | Description | v0.2.16 result | Verdict |
|-------|-------------|----------------|---------|
| B1 | Entity retrieval | 4/4 Iranti, 0/4 baseline (N=5000, ~276k tokens, context exceeded) | POSITIVE DIFFERENTIAL CONFIRMED |
| B2 | Cross-session persistence | 20/20 confirmed, full-protocol rerun, no regression | CONFIRMED |
| B3 | Conflict resolution | 4/4 deterministic correct; LLM arbitration path (C3) errors with transaction timeout | PARTIAL — deterministic logic confirmed; LLM path defect noted |
| B4 | Search | Crash fixed (v0.2.14 regression resolved); vector active (vectorScore 0.35–0.74); semantic paraphrase still fails | PARTIAL — named attribute queries viable; paraphrase not |
| B5 | Knowledge currency | Deterministic paths confirmed; T5 new: conf=99 gap=24.65 bypasses LLM arbitration deterministically; T1/T4 fail with transaction timeout | PARTIAL — deterministic paths confirmed; LLM path defect noted |
| B6 | Ingest | 8/8 prose extraction under real LLM; sub-key decomposition documented | FIXED — confirmed functional with real provider |
| B7 | Episodic memory | 10/10 both arms; provider change no effect; null differential at ~5k tokens stands | CONFIRMED — null result robust |
| B8 | Multi-agent coordination | 5/5 exact; true agentId attribution via agent parameter override confirmed | CONFIRMED + IMPROVED — first valid cross-agentId test |
| B9 | Relationships | iranti_related + iranti_related_deep functional; 4/4 edges; depth=2 traversal confirmed | FIXED — full two-sided benchmark |
| B10 | Knowledge provenance | Confirmed; new finding: per-agentId records when multiple agent overrides write to same entity | CONFIRMED + NEW FINDING |
| B11 | Context recovery | Auto-detection fixed; observe+hint 5/6; attend natural 4/6; slash-value defect retracted; user/main slot-pollution resolved | SUBSTANTIALLY IMPROVED — entity detection fixed; prior defect claims corrected |
| B12 | Session recovery | Explicit query 8/8; observe+hint 5/8; baseline 0/8; handshake 0/8 | NEW — POSITIVE DIFFERENTIAL (explicit arm) |
| B13 | Upgrade safety | 3/3 cross-version durability; API surface stable across v0.2.12→0.2.16 | NEW — PASS |

---

## New Findings in v5.0

### B2 Full Rerun

20/20 confirmed under full-protocol rerun. No regression. The cross-session persistence finding is now confirmed against a real LLM provider for all 20 probe facts.

### B3 Full Rerun — Reinterpretation of v0.2.12 "4/5"

The v0.2.12 "4/5" result is reinterpreted. In v0.2.12, the 5th condition (C3, LLM arbitration) was executed under a mock LLM provider — the "outcome" was a mock artifact. In v0.2.16 with a real provider, C3 errors with a transaction timeout. The correct summary across both versions: 4 deterministic conditions correct; 1 LLM-arbitration path unconfirmed (and now confirmed defective under real provider). The deterministic logic is sound. The LLM arbitration transport is broken.

### B5 Full Rerun — T5 New Finding

T5 (conf=99 new source against low-confidence incumbent, gap=24.65) bypasses LLM arbitration deterministically and writes successfully. This confirms that the deterministic bypass threshold (gap ≥ 10) is reachable and functional. High-confidence updates from new sources succeed when the gap is sufficiently large. This defines the safe operating envelope for cross-source updates.

### B7 Full Rerun — Provider Independence Confirmed

10/10 both arms confirmed under real LLM provider. The null differential at ~5k tokens is not an artifact of the mock provider. The episodic memory framework is correctly designed; the degradation regime remains untested.

### B10 Full Rerun — Multi-Agent Attribution Within Shared Entity

New finding: iranti_who_knows returns per-agentId records when multiple agent overrides write to the same entity. Multi-agent write provenance is correctly partitioned at the agentId × entity level even in the shared-KB architecture. This extends the B8 single-agent attribution finding to the collaborative-write scenario.

---

## Cross-Cutting Defect: Transaction Timeout on LLM-Arbitrated Writes

**Status: Fully characterized. Systemic.**

Both B3 (condition C3) and B5 (conditions T1, T4) confirm: LLM arbitration calls inside database transactions fail under real LLM provider latency. The transaction window is approximately 5 seconds; real LLM arbitration calls take approximately 7–16 seconds. The transaction times out, rolls back, and the write silently fails.

**Trigger conditions (both required):**
1. Sources differ (cross-source conflict)
2. Weighted score gap < 10 (below deterministic acceptance threshold)

**Failure characteristics:**
- Data is safe: rollback preserves the incumbent value; no corruption
- Write is silently dropped: calling agent receives no business-logic error — the write simply does not persist
- This is not a logic error: the conflict resolution formula is correct; the transport (transaction window vs. LLM latency) is broken for this routing path

**Estimated scope:** Conservatively 10–30% of cross-source writes may fall in the gap < 10 zone, depending on deployment confidence calibration. In multi-agent or multi-pipeline deployments where cross-source conflicts are structurally common, the operational impact could be significant. The upper end of the range requires high uncertainty acknowledgment — the actual rate depends on deployment practices not characterized in this program.

**No API-level mitigation exists.** The workaround is to calibrate new writes with sufficient confidence to exceed gap ≥ 10 relative to incumbents, or to avoid cross-source conflicts entirely. This requires deliberate agent design.

**Classification:** Systemic defect in the conflict resolution subsystem. Both benchmarks that exercise the LLM arbitration path confirm this defect. It is not isolated to either track.

---

## Known Defects — Complete Inventory (v0.2.16)

Three product-level defects remain open with no API workaround. One additional defect has a partial workaround.

### Defect 1: Transaction Timeout on LLM-Arbitrated Writes (HIGH)
- Trigger: cross-source conflict, weighted score gap < 10
- Failure mode: silent write drop; rollback; data safe but update lost
- Affects: B3/C3, B5/T1, T4 — any write routed to LLM arbitration
- Workaround: none at API level; calibrate confidence to achieve gap ≥ 10
- Scope: estimated 10–30% of cross-source writes (high uncertainty)

### Defect 2: Forward Slash in Fact Values Causes Silent Retrieval Drop (HIGH) — RETRACTED
- RETRACTED — not reproduced. See B11 defect revalidation.

### Defect 3: user/main/favorite_city Noise Entry in KB (MEDIUM) — RESOLVED
- RESOLVED — slot-pollution behavior no longer observed. Entry persists in KB as local benchmark artifact; does not pollute retrieval results.

### Defect 4: iranti_observe Confidence Ranking Misses Progress/Transient Facts (MEDIUM)
- Trigger: always active — observe ranks by stored confidence, not relevance
- Failure mode: low-confidence progress facts deprioritized; missed in passive observe injection
- Workaround: use iranti_query explicit for known progress-fact keys (B12: 8/8)
- Scope: medium — design characteristic, not a configurable parameter

---

## Final Capability Assessment — v0.2.16

| Capability | Tool(s) | Evidence basis | Safe to claim? | Caveats |
|-----------|---------|----------------|---------------|---------|
| Exact entity+key retrieval | iranti_query | B1 N=5 through N=5000; B2; B12; B13; multiple versions | Yes | O(1) confirmed to N=5000 (~276k tokens). Positive differential demonstrated at N=5000. |
| Automated KB population from prose | iranti_ingest | B6 v0.2.16: 8/8 real LLM (4 keys × 2 entities) | Yes, with caveat | Compound facts decomposed into sub-keys. Key naming may differ from simple expected-key specs. Confirmed functional only for prose biographical entities at current n. |
| Attribute-value search | iranti_search | B4 v0.2.16: direct attribute queries functional; vectorScore 0.35–0.74 | Yes, with caveat | Semantic paraphrase queries fail. Named attribute queries work. Multi-hop via named attributes partially viable. |
| Relationship graph writes | iranti_relate | B9 v0.2.16: 4/4 edges written | Yes | No relationshipType filter in API — client-side filtering required. |
| Relationship graph reads + traversal | iranti_related, iranti_related_deep | B9 v0.2.16: 4/4 edges readable; depth=2 traversal on 4-node graph confirmed | Yes | No hop-depth labels on deep traversal output. Flat list returned. |
| Context recovery with hints | iranti_observe | B11 v0.2.16: 5/6 observe+hint; auto-detection fixed; B12: 5/8 observe with hint | Yes, with caveat | Confidence-based ranking misses progress facts. Prior slash-exclusion claim retracted. |
| Attend injection classifier | iranti_attend | B11 v0.2.16: entity detected; forceInject 5/6; natural 4/6 | Yes, with caveat | user/main slot-pollution resolved. Prior slash-exclusion claim retracted. |
| Structured fact writes | iranti_write | B1–B13 across all versions | Yes | Transaction timeout affects cross-source writes in gap < 10 zone. |
| Multi-agent attribution (single agent) | iranti_who_knows | B8 v0.2.16: 5/5 true agentId test with agent override | Yes | KB globally shared — no per-agentId read isolation. Attribution tracks write provenance only. |
| Multi-agent attribution (shared entity) | iranti_who_knows | B10 v0.2.16: per-agentId records confirmed on multi-agent shared entity write | Yes, with caveat | n=1 scenario. Behavior under concurrent writes not tested. |
| Cross-session persistence | iranti_write + iranti_query | B2: 20/20 full rerun; B13: cross-version durability; longitudinal evidence | Yes | Intra-session vs. true cross-session isolation not cleanly tested in B2 (see statistical review). |
| Deterministic conflict resolution | Librarian | B3: 4/4 deterministic conditions correct; formula verified | Yes | LLM arbitration path (gap < 10, cross-source) blocked by transaction timeout defect. |
| LLM-arbitrated conflict resolution | Librarian | B3/C3, B5/T1, T4: all timeout under real LLM | Do not claim — defect present | Deterministic bypass (gap ≥ 10) works correctly. |
| KB durability across upgrades | All tools | B13: 3/3 facts durable across v0.2.12→0.2.14→0.2.16 | Yes | n=3; single run; existence proof only |
| Session recovery (explicit) | iranti_query | B12: 8/8 explicit query arm | Yes | Oracle condition — agent must know which keys to query. |
| Session initialization | iranti_handshake | B12: 0/8 — does not recover task state | Claim as initialization only | Use iranti_query explicit for task-state recovery. |

---

## Final Defensible Claims

The following claims are supported by current evidence in this program. Each is bounded by the evidence basis.

**1. Iranti provides a categorical retrieval advantage over context-reading above the context window threshold.**
- Evidence: B1 N=5000 — Iranti 4/4, baseline 0/4 at ~276k tokens. The baseline failure is architectural (haystack exceeds context window), not probabilistic.
- Bound: Tested at a single scale point (N=5000). The degradation onset (where baseline begins to fail) between N=500 (~28k tokens) and N=5000 (~276k tokens) has not been characterized. The claim is: above the context window threshold, iranti_query is feasible and context-reading is not.
- Cannot claim: a specific percentage improvement; behavior at N between 500 and 5000.

**2. Iranti persists structured facts reliably across agent sessions.**
- Evidence: B2: 20/20 full rerun; B13: cross-version durability. Longitudinal program evidence across multiple sessions and three software versions.
- Bound: Protocol does not cleanly isolate true cross-session boundaries in B2. B13 n=3.
- Cannot claim: specific failure rate; comparison against alternative memory strategies (RAG, summarization).

**3. Iranti's conflict resolution deterministic logic correctly enforces gap and source-consistency rules.**
- Evidence: B3: 4/4 deterministic conditions; B5: deterministic paths confirmed; formula verified against observed behavior.
- Bound: LLM arbitration path (gap < 10, cross-source) is broken at the transport level. Deterministic claim covers only the non-LLM-routed paths.
- Cannot claim: LLM arbitration is functional.

**4. iranti_ingest correctly extracts from prose input under a real LLM provider.**
- Evidence: B6: 8/8 under real LLM; no contamination. The prior mock-LLM contamination finding is confirmed as a mock artifact.
- Bound: n=8; single entity type (prose biographical); sub-key decomposition behavior requires documentation in any key-matching evaluation.
- Cannot claim: accuracy rate on diverse entity types or at production scale.

**5. Iranti correctly attributes writes to contributing agentIds, including in multi-agent shared-entity scenarios.**
- Evidence: B8: 5/5 true agentId attribution; B10: per-agentId records confirmed on shared entity write.
- Bound: KB is globally shared — no per-agentId read isolation. Attribution is provenance tracking, not namespace isolation. B10 multi-agent finding at n=1.
- Cannot claim: per-agentId read isolation; concurrent-write safety.

**6. iranti_observe recovers entity setup facts autonomously and with hints; explicit iranti_query recovers all stored facts.**
- Evidence: B11: observe auto-detection fixed; B12: observe+hint 5/8; explicit query 8/8.
- Bound: Progress/transient facts missed by observe (confidence ranking); handshake is initialization-only. Prior claim that values with `/` are silently excluded is retracted.
- Cannot claim: passive observe recovers full session state autonomously.

**7. Iranti relationship graph is fully bidirectional (write and read) with depth traversal.**
- Evidence: B9: 4/4 edges write and read; depth=2 traversal confirmed on 4-node graph.
- Bound: n=4; no filter parameter — client-side filtering required.

**8. iranti_query provides a positive session recovery differential over stateless baseline.**
- Evidence: B12: explicit query 8/8 vs. baseline 0/8.
- Bound: oracle condition (agent must know keys to query); n=8 single run; no comparison against RAG-based recovery.

**9. KB state is durable across version upgrades with stable API surface.**
- Evidence: B13: 3/3 facts durable across three versions; no breaking changes in MCP tool signatures observed.
- Bound: n=3; single run; existence proof only.

---

## Messaging Alignment Note

The following should be communicated to the site PM (iranti-site) and control-plane PM (iranti-control-plane) before any public release of benchmark claims:

**Newly clearable claims (not in prior messaging):**
- iranti_query: categorical advantage over context-reading above context window threshold (B1 N=5000, first positive differential)
- iranti_who_knows: true cross-agentId attribution confirmed, including shared-entity multi-agent write scenarios (B8, B10)
- iranti_ingest: confirmed functional under real LLM provider; sub-key decomposition caveat must accompany any accuracy claim
- B12: session recovery via explicit query 8/8 vs. 0/8 baseline — legitimate differential claim (small n)

**Limitations that must accompany public messaging:**
- iranti_search: named attribute queries only — semantic paraphrase not supported
- LLM arbitration path: do not claim as functional — transaction timeout defect blocks it under real provider
- iranti_handshake: initialization only — not a session recovery mechanism
- All scores: point estimates at small n — no confidence intervals computed; self-evaluation bias unresolved

**Product defects to flag to engineering:**
- Transaction timeout on LLM-arbitrated writes: systemic, no API workaround, high operational impact if cross-source writes are common
- Forward slash parse failure: RETRACTED — not reproduced in revalidation. No longer a flagged defect.

---

## Program Disposition Table — Final (v1.0 through v5.0)

| Track | v1.0 (0.2.12) | v2.0 (0.2.14) | v3.0 (0.2.16) | v4.0 (0.2.16) | v5.0 (0.2.16) |
|-------|--------------|--------------|--------------|--------------|--------------|
| B1 | Closed (null, N≤500) | Closed (null, N≤500) | Confirmed (null) | POSITIVE DIFFERENTIAL at N=5000 | Confirmed — final |
| B2 | Closed | Closed | Confirmed (spot check) | Confirmed | FULL RERUN CONFIRMED — final |
| B3 | Closed (4/5 with mock LLM) | Closed | Confirmed (spot check) | Confirmed | FULL RERUN — 4/4 deterministic, LLM path defect characterized — final |
| B4 | Closed (structural failure) | Regression (crash) | Partially fixed (crash resolved, vector active) | Confirmed partial | Confirmed — final |
| B5 | Closed (T1/T4 unexpected) | Closed | Confirmed (spot check) | Confirmed | FULL RERUN — deterministic confirmed, T5 new finding, LLM path defect — final |
| B6 | Closed (mock artifact) | Closed (mock artifact) | FIXED — 8/8 real LLM | Confirmed | Confirmed — final |
| B7 | Closed (null, 5k tokens) | Closed | Confirmed | Confirmed | FULL RERUN CONFIRMED — provider independent — final |
| B8 | Closed (single-session sim) | Closed | Confirmed | TRUE AGENTID ATTRIBUTION 5/5 | Confirmed — final |
| B9 | Closed (write-only) | Closed (write-only) | FIXED — readable | Confirmed | Confirmed — final |
| B10 | Closed | Closed | Confirmed | Confirmed | FULL RERUN — PER-AGENTID MULTI-AGENT FINDING — final |
| B11 | Closed (broken) | Closed (partial) | Substantially improved | Defects characterized | Confirmed — final |
| B12 | — | — | New — closed | Confirmed | Confirmed — final |
| B13 | — | — | New — closed | Confirmed | Confirmed — final |

---

## Defect Status Correction — 2026-03-21

Upstream evidence and revalidation testing corrected two of the three previously confirmed defects.

| Defect | Prior status | Revised status |
|--------|-------------|---------------|
| Transaction timeout on LLM-arbitrated writes | Confirmed open | **Still open — unchanged** |
| Forward slash in fact values causes retrieval loss | Confirmed HIGH | **RETRACTED — not reproduced** |
| user/main noise entry pollutes retrieval | Confirmed MEDIUM | **RESOLVED — slot-pollution gone** |

Revalidation evidence: results/raw/B11-defect-revalidation-v0216.md

---

## Signed

**research_program_manager**
**Date: 2026-03-21**
**Program version: 5.0 — COMPLETE**

All 13 tracks (B1–B13) closed. Full-protocol reruns complete for all tracks under v0.2.16 with LLM_PROVIDER=openai. No open benchmark gaps remaining. The statistical record is closed. The defect inventory is finalized. The defensible claims list is complete and bounded.

The transaction timeout defect on LLM-arbitrated writes is the single most operationally significant open product issue identified by this program. It is systemic, unmitigated at the API level, and affects a non-trivial estimated fraction of real-world cross-source writes. Engineering should treat it as a priority item.

The program's primary scientific contribution is the B1 N=5000 positive differential: a categorical finding that iranti_query succeeds where context-reading is architecturally infeasible. All other capability findings are supportive, single-arm, or at insufficient scale for statistical claims. The program produced a complete, honest, and bounded scientific record.

Program version: 5.0 — COMPLETE
All 13 tracks closed. No open benchmark gaps remaining.
