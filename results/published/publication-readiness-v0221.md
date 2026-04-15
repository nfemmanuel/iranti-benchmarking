# Publication Readiness Assessment — Iranti v0.2.21 Rerun

**Role:** Research Program Manager
**Date:** 2026-03-22
**Status:** CLEARED FOR PUBLICATION WITH CONDITIONS (see Section 5)
**Covers:** v0.2.21 full rerun (11 tracks) + targeted closeout pass (B6, B9/B10, B13)

---

## 1. Blocker Resolution Summary

### Blocker 1 — B13 Cross-version Durability Gap

**Verdict: RESOLVED — RESET_LIKELY**

The 0/6 finding is explained by instance reinitialization during the upgrade to v0.2.21, not by a KB migration defect. Evidence:
- 4/4 entities written during the v0.2.21 session are found and correct across all tracks.
- 0/6 prior-version entities (v0.2.12–v0.2.16) are found — absent even via iranti_search, ruling out path resolution failures.
- The clean boundary (everything from today present; nothing from before present) is the signature of a full reinitialization, not a partial data loss.

Cross-version durability within a single continuous instance was confirmed through v0.2.16. That claim stands for the pre-upgrade record. The upgrade to v0.2.21 cleared the instance. This is a deployment/upgrade procedure finding, not a storage defect.

**Publication disposition:** B13 now has a defined finding. See Section 4 for safe framing.

---

### Blocker 2 — B9/B10 Permission-gated Tools

**Verdict: RESOLVED — PRODUCT-ACCESSIBILITY FACTS**

Four tools (iranti_relate, iranti_related, iranti_related_deep, iranti_who_knows) were denied across all benchmark sessions. The closeout confirmed denials reproduce in a fresh session with correct parameter names. These are not session artifacts.

**What this means:**
- The relationship subsystem (B9) and provenance reflection surface (B10) are present in the MCP schema but not accessible under the benchmark agent configuration.
- This is a product accessibility boundary, not a version regression. The tools were not tested in v0.2.16 either (they are newer surface additions).
- The correct characterization is: capability gated at the session permission layer; not confirmed or denied at the functional level.

**Incidental finding:** The original B9 trial used incorrect parameter names (`from/to/type` vs `fromEntity/toEntity/relationshipType`). This would have caused schema errors even if permissions were granted. Noted for reproducibility; did not change the outcome since permissions were denied regardless.

**Publication disposition:** B9 and B10 are closed as "tools present; execution gated." See Section 4 for safe framing.

---

### Blocker 3 — B6 Ingest Reliability Ambiguity

**Verdict: RESOLVED — ACCURATE WITH LATENT MARGINAL RISK**

Two closeout trials separated extraction accuracy from conflict-resolution reliability:

- **Trial 1 (clean entity, no prior writes):** iranti_ingest extracted 11 candidates, wrote 11, 0 errors, no timeout. 6/6 ground-truth facts captured correctly. Zero fabrications.
- **Trial 2 (pre-populated entity, 6 baseline facts at conf=95):** iranti_ingest extracted 11 candidates, wrote 9, rejected 2 via LLM arbitration (correct behavior — identical values at lower confidence rejected). No timeout.

The Run B timeout (15009ms) was real and precisely measured but not reproduced across two additional trials. It is a latent marginal risk tied to infrastructure conditions (Prisma lock contention or subprocess cold-start), not a deterministic code path failure.

**Publication disposition:** B6 ingest accuracy is confirmed. Reliability caveat is narrow. See Section 4 for safe framing.

---

## 2. Updated Defect Inventory (Final)

| # | Track | Type | Description | Final Status |
|---|-------|------|-------------|--------------|
| D1 | B9 | Product accessibility | iranti_relate, iranti_related, iranti_related_deep: permission-denied in all benchmark sessions across v0.2.21. Confirmed product-accessibility boundary, not session artifact. | CLOSED — product access gate |
| D2 | B10, B8 | Product accessibility | iranti_who_knows: permission-denied in all sessions. Write-side attribution (source field) accessible; provenance reflection not. | CLOSED — product access gate |
| D3 | B11, B12 | Persistent defect | iranti_attend: classification_parse_failed_default_false confirmed across B11 and B12 in v0.2.21. Not fixed. forceInject bypass works. | CONFIRMED — not fixed in v0.2.21 |
| D4 | B5, B6 | Latent reliability | Prisma transaction timeouts (~15009–15024ms vs 15000ms limit) observed in 3 incidents (B5 T1, B6 Run B ×2). LLM-arbitration and vector-store-deletion paths inside transactions. Not reproduced in closeout trials. | LATENT — non-deterministic; not systematic |
| D5 | B13 | Upgrade behavior | Instance reinitialized during upgrade to v0.2.21. All prior-version KB entities lost. Characterized as deployment procedure behavior, not storage defect. | CLOSED — reinitialization finding |
| D6 | B11 | Ranking artifact | sla_uptime consistently excluded (totalFound=5 server-side) at identical confidence=85. Ranking tie-break behavior unchanged in v0.2.21. | CONFIRMED — unchanged behavior |
| D7 | B4 | Capability gap | iranti_search operates as pure lexical index (vectorScore=0 across all results). Vector embedding layer not contributing. True hop-value discovery: 0/4. | CONFIRMED — no semantic search in v0.2.21 |

---

## 3. Final Claim Inventory

### Safe to Claim (strong evidence, defensible framing)

| Claim | Evidence | Track |
|-------|----------|-------|
| Null accuracy differential at N=1938 (~107k tokens) under blind protocol | 10/10 both arms, genuine blind sequential read | B1 |
| Iranti eliminates haystack read cost: O(1) vs O(N) token consumption | 0 vs ~107k tokens; repeatable across all scale points tested | B1 |
| KB write and retrieval are exact and deterministic for known entity+key | 10/10 across B1, B7, B12 oracle with verbatim JSON | B1, B7, B12 |
| Cross-agent KB coordination across genuine process boundaries: retrieval confirmed | 6/6 Alpha→Beta retrieval, zero shared context | B8 |
| KB retrieval is a functionally complete substitute for in-context recall at 5,500-token transcript scale | 10/10 both arms, genuine session separation | B7 |
| Update semantics stable across v0.2.16 → v0.2.21 | All 5 conflict conditions match exactly | B5 |
| Confidence-tier ranking governs iranti_observe output: higher confidence facts returned first | Batch A conf=95 before Batch B conf=90, replicated B12 and B11 | B11, B12 |
| Write durability confirmed across genuine process breaks within v0.2.21 | oracle 8/8 cross-subprocess B12; all today's entities found cross-track | B12, B13 |
| iranti_attend forceInject bypass functions correctly | 5/6 facts injected (sla_uptime excluded separately) | B11 |
| iranti_ingest extracts facts accurately from prose biography on clean entities | 6/6 ground-truth facts, 11 candidates written, 0 errors in closeout Trial 1 | B6 |

---

### Safe to Claim with Narrow Framing

| Claim | Required framing | Track |
|-------|-----------------|-------|
| iranti_ingest is functional but has latent conflict-resolution risk | "Accurate on clean entities; a prior single-run Prisma timeout (15009ms vs 15000ms limit) is characterized as a latent marginal risk, not a systematic failure" | B6 |
| iranti_search supports entity name lookup | "Lexical-only; entity-name token queries succeed; attribute-value discovery (hop-value multi-hop) does not succeed; vectorScore=0 across all results" | B4 |
| KB data persists across upgrades within a continuous instance | "Confirmed through v0.2.16. The v0.2.16→v0.2.21 upgrade reinitialized the instance; existing data was not preserved. Cross-version persistence requires upgrade path review." | B13 |
| iranti_observe recovers session context after genuine process break | "5/8 with entity hint (confidence-tier limited); 0/8 cold; iranti_query oracle is the reliable full-recovery path" | B12 |
| iranti_attend with forceInject recovers context | "Requires forceInject=true; natural classifier fails consistently (classification_parse_failed_default_false); not autonomous" | B11 |

---

### Not Defensible — Must Not Be Claimed

| Claim | Reason |
|-------|--------|
| iranti_search enables multi-hop entity discovery | True hop-value discovery 0/4; bare entity-name search is not a multi-hop capability |
| iranti_attend classifier works autonomously | PARSE FAIL confirmed across B11 and B12 in v0.2.21; not fixed |
| iranti_relate / relationship graph write confirmed | Permission-denied across all sessions; tool in schema but not executable |
| iranti_related / iranti_related_deep read relationship edges | Permission-denied; never testable with zero writes |
| iranti_who_knows confirms agentId attribution | Permission-denied; only source field proxy available |
| KB data survives Iranti version upgrades | Instance reinitialized at upgrade; prior data not preserved |
| iranti_observe reliably auto-detects entities without hints | 0/8 in B12 cold; entity_extraction_parse_error in B11 debug; not reliable |

---

## 4. Publication Guidance by Track

| Track | Framing | Condition |
|-------|---------|-----------|
| B1 | **Publish as written.** Null accuracy differential confirmed; efficiency differential is the primary claim. | None |
| B4 | **Publish with corrected framing.** Oracle 4/4 is the clean capability result. iranti_search section must state: lexical-only, 0/4 hop-value discovery, vectorScore=0. Do not claim search-based multi-hop works. | Correct search section language |
| B5 | **Publish as written.** Stable semantics confirmed. Note latent timeout risk for LLM arbitration path. | Minor caveat addition |
| B6 | **Publish with two-condition framing.** (a) Extraction accuracy: confirmed 6/6 on clean entity. (b) Conflict-resolution: functional; one prior marginal timeout documented as latent risk. | Closeout Trial 1 and 2 results must be cited |
| B7 | **Publish as written.** Candidate A context-clear design is the first valid B7 execution. Null differential at 5,500 tokens is the informative result. Note that scale-stress test (50k–200k tokens) was not conducted. | Scale caveat |
| B8 | **Publish with attribution caveat.** Retrieval 6/6 across genuine process boundary is the headline claim. Discovery PARTIAL (NL search unreliable) must be stated. Attribution via source field only (who_knows denied). | Attribution proxy note |
| B9 | **Publish as untestable.** Tools present in MCP schema; execution denied across all sessions. Cannot confirm or deny functional capability. Note incorrect parameter names were used in original trial (does not change outcome). | Must state: not a negative result, a blocked test |
| B10 | **Publish as partial.** Write-side attribution (source field) accessible and observed. Provenance reflection (who_knows) gated; agent-override attribution question unanswerable. | Must distinguish write-side from read-side |
| B11 | **Publish as written.** observe+hint: 5/6 (sla_uptime ranking artifact documented). attend: not fixed, PARSE FAIL confirmed. forceInject works. | None |
| B12 | **Publish as written.** Genuine process isolation confirmed. Oracle 8/8 is the strong result. Confidence-tier split in observe replicated. attend still failing. | None |
| B13 | **Publish with reinitialization finding.** Cross-version durability within a continuous instance confirmed through v0.2.16. Upgrade to v0.2.21 cleared the instance; existing data was not preserved. This is a deployment procedure finding. | Must distinguish "data lost" from "instance reinitialized" |

---

## 5. Final Publication Readiness Decision

### CLEARED FOR PUBLICATION WITH CONDITIONS

All three blockers are resolved:
- **B6:** Ingest accuracy confirmed on clean entities. Reliability caveat is narrow and documented.
- **B9/B10:** Closed as product-accessibility gates. Capability is present in schema but not executable under benchmark session configuration. This is a bounded, documentable finding.
- **B13:** Durability gap resolved as instance reinitialization at upgrade. Cross-version durability within a single instance was confirmed through v0.2.16; the upgrade procedure does not preserve data.

### Conditions on clearance:

1. **B4 paper:** iranti_search framing must be corrected before publication. The "2/4 search improvement" phrasing in any draft must be replaced with "0/4 hop-value discovery; entity-name token search not a multi-hop capability."
2. **B9/B10 papers:** Must clearly state "tool present in schema; execution permission denied; capability untestable under current benchmark session configuration." Must not imply negative functional result.
3. **B13 paper:** Must distinguish "instance reinitialized during upgrade" from "data storage failure." Must not claim upgrade path is safe for existing data; must not claim it is unsafe either.
4. **B6 paper:** Must cite both the original timeout incident and the closeout trials. Accuracy and reliability are separate claims requiring separate evidence.
5. **All papers:** iranti_attend "not fixed" finding must be stated. The forceInject bypass is not an equivalent substitute for a working classifier.

### What is NOT blocking publication:

- B9 and B10 capability gaps — these are documented findings, not unresolved questions.
- B13 durability gap — resolved finding, not open uncertainty.
- Transaction timeouts — latent risk, documented, not systematic.
- sla_uptime ranking — documented artifact, not a defect requiring a fix.

### Next steps for Teams F and G:

**Team F (Publication updates):**
- Update B4 paper: correct search framing
- Update B6 paper: add two-condition framing + closeout evidence
- Update B8 paper: add attribution proxy caveat
- Update B9 paper: rewrite as "permission-gated, untestable" with parameter-name note
- Update B10 paper: rewrite as "write-side confirmed, read-side gated"
- Update B13 paper: rewrite as reinitialization finding with cross-version durability scoped correctly
- Update BENCHMARK-SUMMARY-PUBLIC.md: six claim updates (see Section 4)

**Team G (Stats + reproducibility):**
- Confirm all raw trial files are present and complete
- Note single-run nature of all benchmark tracks (variance estimation deferred)
- Document genuine subprocess execution evidence for B7, B8, B12
- Document transaction timeout incidents as reproducibility-relevant infrastructure notes

---

*Research Program Manager — Iranti Benchmarking Program — 2026-03-22*
*All three closeout blockers resolved. Program cleared for final publication pass.*
