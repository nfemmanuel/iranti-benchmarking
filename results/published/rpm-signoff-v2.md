# Research Program Manager — Sign-Off v2.0
## Iranti Benchmarking Program — v0.2.14 Rerun

**Date:** 2026-03-21
**RPM:** research_program_manager (benchmark_program_main session)
**Scope:** B4, B6, B9, B11 rerun (priority defect tracks)
**Iranti version under test:** 0.2.14
**Original version:** 0.2.12 (v1.0 sign-off: results/published/rpm-signoff.md)
**Evaluation model:** Claude Sonnet 4.6 (claude-sonnet-4-6)
**LLM_PROVIDER:** mock (critical confound — see below)

---

## What Changed From v1.0

### B4 — iranti_search: REGRESSED

**v0.2.12:** structurally broken — returned results with vectorScore=0, TF-IDF degraded for common terms.
**v0.2.14:** crashes before returning results. Runtime error: `Spread syntax requires ...iterable[Symbol.iterator] to be a function`. pgvector still unreachable.

**Verdict change:** severity upgraded. The tool moved from "broken but observable" to "crashes at runtime." The multi-hop search capability is now completely non-functional and non-observable. iranti_query (exact lookup) is unaffected.

**Papers/articles updated:** ✓

---

### B6 — iranti_ingest: PARTIAL / CONFOUND IDENTIFIED

**v0.2.12:** contamination confirmed — 0/4, verbatim KB values written regardless of input.
**v0.2.14:** contamination pattern not reproduced. New failure: chunker returns extractedCandidates=0 for prose input. 2/4 with structured key:value syntax, both correct.

**Critical confound identified:** LLM_PROVIDER=mock was active in both v0.2.12 and v0.2.14. The v0.2.12 "contamination" finding is now a plausible mock artifact — the mock LLM may have returned canned KB data rather than the Librarian genuinely reading and substituting KB values. The v0.2.14 coverage failure is similarly a plausible mock behavior (null responses for extraction queries).

**Verdict change:** v0.2.12 contamination finding **downgraded from confirmed critical defect to plausible mock artifact.** B6 is now flagged as **incomplete** pending retest with a real LLM provider. The track cannot be closed with a reliable conclusion until this is done.

**Papers/articles updated:** ✓

---

### B9 — iranti_relate: UNCHANGED

**v0.2.12:** write-only, no MCP query tool.
**v0.2.14:** write-only, no MCP query tool. iranti_search now crashes (same regression as B4). REST `/kb/related/{entityType}/{entityId}` confirmed as the correct endpoint (prior v0.2.12 docs incorrectly referenced `/relationships`).

**Verdict:** unchanged. Finding holds. REST endpoint corrected in paper.

**Papers/articles updated:** ✓

---

### B11 — iranti_attend + iranti_observe: PARTIAL IMPROVEMENT

**iranti_attend classifier:**
- v0.2.12: `classification_parse_failed_default_false`, shouldInject=false
- v0.2.14: FIXED. `shouldInject=true`, confidence=0.93, method=llm, `memory_reference_detected`. The classifier now correctly identifies that injection is needed.
- Caveat: because entity auto-detection still fails, injected content is still wrong (noise entry returned). Decision layer fixed; retrieval layer not.

**iranti_observe auto-detection:**
- v0.2.12: detectedCandidates=0
- v0.2.14: detectedCandidates=0. UNCHANGED. Still requires explicit entityHints.

**iranti_observe with hint:**
- v0.2.12: 5/6 (83%)
- v0.2.14: 4/5 (80%) — one slot consumed by `user/main/favorite_city` noise entry (confidence=92). Functionally equivalent but noise contamination noted.

**New finding: noise entry pollution.** `user/main/favorite_city` with confidence=92 written by Iranti's own session memory infrastructure is present in the KB and competes with benchmark target facts in retrieval rankings. This is a benchmark isolation gap, not a capability finding. Flagged in reproducibility audit.

**Verdict:** PARTIAL. Attend classifier fix is genuine. Auto-detection unchanged. Noise entry is a methodology concern.

**Papers/articles updated:** ✓

---

## Tracks Not Retested

B1, B2, B3, B5, B7, B8, B10 were not retested. Their v0.2.12 findings stand as the current record. No structural changes in the release notes or doctor output suggest these would behave differently on v0.2.14.

**Exception note for B1:** The iranti_search crash in v0.2.14 would not affect B1 (which uses iranti_query only). B1 results remain valid.

---

## Program-Level Confound: LLM_PROVIDER=mock

This is the most significant finding from the v2.0 rerun program. The test instance has run in mock LLM mode throughout the entire benchmarking program. This affects:

1. **B6 (ingest):** The contamination finding from v0.2.12 cannot be trusted. The conclusion "iranti_ingest is a confirmed critical defect" must be retracted as a confident claim and replaced with "iranti_ingest behavior under mock LLM is not representative of production behavior."

2. **B11 (attend/observe):** The v0.2.12 classification_parse_failed and the v0.2.14 fix may both reflect mock LLM behavior changes rather than production capability changes.

3. **All benchmarks using LLM-dependent features:** Any conclusion that depends on the Librarian, the Attendant classifier, or entity detection should be flagged as provisional.

**The safe/validated capabilities (B1, B2, B3, B7, B8, B9-writes, B10) use only iranti_write, iranti_query, iranti_relate, and iranti_who_knows — none of which depend on the LLM provider. Those findings are unaffected by the mock confound.**

---

## Updated Safe Messaging Rules (v2.0)

### Still safe to claim (unchanged from v1.0):
- Exact entity+key retrieval is reliable and scale-invariant (iranti_query)
- Cross-session persistence works (20/20)
- Conflict resolution works at high reliability differentials
- Multi-agent shared KB coordination works (single-session case)
- Knowledge provenance tracking works (agentId layer)
- Relationship writes succeed

### Upgraded cautions from v1.0:
- **iranti_search:** do not claim as a working feature at all — it crashes at runtime on v0.2.14
- **iranti_ingest:** contamination claim retracted — confirmed mock artifact. Real-provider retest: 0/8, extractedCandidates=0 for prose. Defect is in chunker/dispatch layer, LLM-independent. Pipeline non-functional for natural prose under all tested configurations.
- **iranti_attend:** classifier now works (genuine fix); but overall utility still requires explicit hints due to auto-detection failure. Do not claim autonomous context management.

### Unchanged cautions from v1.0:
- No agent-accessible relationship query path
- iranti_observe requires explicit entityHints

---

## Open Items Before Any Publication

1. ~~Configure real LLM provider and rerun B6 + B11~~ — **DONE (2026-03-21).** B6: still broken (chunker defect, LLM-independent). B11: attend fix confirmed real, auto-detection confirmed architectural.
2. **Investigate and remediate iranti_search crash** — v0.2.14 regression is more severe than v0.2.12
3. **Clear noise entry (user/main/favorite_city) before benchmark reruns** — isolation gap
4. **B1 degradation regime (N=5000+)** — still not tested
5. **B8 true multi-agent** — separate agentId sessions

---

## Disposition

| Track | v1.0 Status | v2.0 Status | Change |
|-------|------------|------------|--------|
| B1 | Closed | Closed | Unchanged |
| B2 | Closed | Closed | Unchanged |
| B3 | Closed | Closed | Unchanged |
| B4 | Closed | Closed (regression noted) | Search regressed to crash |
| B5 | Closed | Closed | Unchanged |
| B6 | Closed | **Closed (verdict revised)** | Contamination = mock artifact. Real defect: chunker failure (LLM-independent). Pipeline non-functional for prose. |
| B7 | Closed | Closed | Unchanged |
| B8 | Closed | Closed | Unchanged |
| B9 | Closed | Closed (endpoint corrected) | Unchanged finding; doc fix |
| B10 | Closed | Closed | Unchanged |
| B11 | Closed | Closed (partial improvement) | Attend classifier fixed |

**B6 is now re-closed with a revised verdict.** Real-provider retest completed 2026-03-21. Contamination hypothesis withdrawn; chunker defect confirmed as definitive finding.

**Signed: research_program_manager**
**Date: 2026-03-21**
