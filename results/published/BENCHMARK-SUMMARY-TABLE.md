# Iranti Benchmarking Program — Final Summary Table

**Date:** 2026-03-22
**Version under test:** 0.2.16
**Program version:** 6.0

> Historical record notice: this table is the closed `0.2.16` / v6.0 summary table.
> Newer reruns on `2026-03-26` narrowed or refreshed several current-version stories, especially `B3`, `B4`, `B5`, `B8`, `B11`, `B12`, `B1`, and `B13`.
> Treat this file as the historical program closeout, not the full current-version benchmark state.

---

## Table 1: Track Results

| Track | Name | Tested version | Key result | Verdict | Notes |
|-------|------|----------------|------------|---------|-------|
| B1 | Entity Retrieval at Scale | 0.2.16 | 4/4 correct at N=5000 (~276k tokens); 0/4 baseline (context overflow) | POSITIVE DIFFERENTIAL at N=5000 | Null differential at N≤500; advantage is scale-dependent |
| B2 | Cross-Session Persistence | 0.2.16 | 20/20 facts retrievable in new session | CONFIRMED (20/20) | Full rerun v5.0; confirmed unchanged v6.0 |
| B3 | Conflict Resolution | 0.2.16 | 4/4 deterministic paths correct; LLM arbitration path fails with transaction timeout | PARTIAL | Deterministic wins at gap ≥ 10; cross-source small-gap writes blocked by open defect |
| B4 | Attribute Search | 0.2.16 | Named attribute queries pass; semantic paraphrase queries fail | PARTIAL | Vector search not functional for paraphrase; named attribute queries viable; upstream README now documents this boundary |
| B5 | Knowledge Currency (Update Behavior) | 0.2.16 | Deterministic paths confirmed; LLM arbitration paths blocked by transaction timeout; T5 new finding | PARTIAL | Same-source large-gap updates work; T5: conf=99 cross-source with gap > 10 bypasses LLM deterministically and succeeds; T1/T4 time out under real provider |
| B6 | Ingest Pipeline | 0.2.16 | 8/8 correct extraction under real LLM provider | CONFIRMED | Fixed from mock-artifact false result in v1.0–v2.0; sub-key decomposition behavior documented |
| B7 | Episodic Memory | 0.2.16 | 10/10 both arms at ~5k tokens | NULL DIFFERENTIAL | No advantage or disadvantage at tested scale; degradation regime above 5k tokens untested |
| B8 | Agent Coordination / Attribution | 0.2.16 | 5/5 correct agentId attribution across all writes | CONFIRMED | True agentId test (v4.0+); single-session simulation in v1.0–v3.0 was a weaker test |
| B9 | Entity Relationships | 0.2.16 | 4/4 write, read, and depth traversal correct | CONFIRMED | Fixed from write-accepted-but-not-readable finding in v1.0–v2.0 |
| B10 | Knowledge Provenance (Multi-Agent) | 0.2.16 | Per-agentId records correct on shared entity writes; both agents' contributions attributed correctly | CONFIRMED + NEW FINDING | Full rerun v5.0; per-agentId attribution on shared entities confirmed as standalone finding |
| B11 | Context Recovery | 0.2.16 | Auto-detection fixed (alias matching, confidence=0.82); 5/6 facts returned with observe+hints; 4/6 attend natural; two prior defects corrected | SUBSTANTIALLY IMPROVED | Slash-value defect retracted and reconfirmed; user/main noise resolved; auto-detect mechanism is alias-index matching, not paraphrase NLP |
| B12 | Session Recovery | 0.2.16 | Explicit query arm: 8/8 vs. 0/8 baseline; observe+hints arm: 5/8 | POSITIVE DIFFERENTIAL | 8/8 explicit query is the primary finding; handshake confirmed as initialization-only (workingMemory=[] at start) |
| B13 | Upgrade Safety | 0.2.16 | 3/3 facts durable across v0.2.12 → v0.2.14 → v0.2.16 | CONFIRMED | Single run, existence proof; upstream ADR 007 formalizes compatibility commitment; runtime lifecycle hardening noted in d03781a1 |

---

## Table 2: Defect Inventory

| # | Defect | Status | Severity | Affects | Workaround |
|---|--------|--------|----------|---------|------------|
| 1 | Transaction timeout on LLM-arbitrated writes — database transaction expires before AI provider responds; incoming update lost silently | OPEN | HIGH | B3 (cross-source small-gap writes); B5 T1, T4 | Calibrate confidence values so cross-source gap ≥ 10 weighted points; routes deterministically without LLM call |
| 2 | Forward slash in fact values causes silent retrieval drop | RETRACTED | was HIGH | B11 (originally claimed) | N/A — not a real defect; 6 fresh test calls across 4 paths all pass; upstream regression tests corroborate |
| 3 | user/main noise slot pollution — `user/main/favorite_city` entry surfacing in retrieval results | RESOLVED | was MEDIUM | B11 (v0.2.14) | N/A — resolved; was a test artifact from upstream test infrastructure, not a product behavior; upstream smoke test fix closes the pathway |
| 4 | iranti_observe confidence ranking misses progress/transient facts — low-confidence facts ranked below the return window | OPEN | MEDIUM | B12 (observe+hints arm) | Use `iranti_query` explicitly for known keys; no API-level fix currently available |

---

## Table 3: Version History

| Sign-off version | Iranti version | Date | Key changes |
|-----------------|----------------|------|-------------|
| v1.0 | 0.2.12 | 2026-03-20 | Initial program close; B1–B11 evaluated; B6 mock-artifact false result; B9 write-only finding; B11 auto-detection broken; B5 T1/T4 unexpected behavior recorded |
| v2.0 | 0.2.14 | 2026-03-21 | B4 crash regression fixed; B6 still mock artifact; B9 still write-only; B11 attend classifier fixed (0.2.14), auto-detection still broken; user/main noise entry first documented |
| v3.0 | 0.2.16 | 2026-03-21 | B6 fixed — 8/8 real LLM; B9 fixed — read and traversal working; B11 substantially improved — auto-detection fixed; B12 and B13 added as new tracks; slash-value defect first claimed |
| v4.0 | 0.2.16 | 2026-03-21 | B1 positive differential found at N=5000; B8 upgraded to true agentId test (5/5); B10 per-agentId multi-agent finding; full rerun series initiated |
| v5.0 | 0.2.16 | 2026-03-21 | Full program rerun complete; all 13 tracks closed; slash-value defect retracted after minimal repro failed; user/main classified as test artifact; B5 T5 new finding added; transaction timeout defect characterized as primary open issue |
| v6.0 | 0.2.16 | 2026-03-22 | Targeted revalidation against upstream commit d03781a1 (unreleased); RETRACTED classification confirmed across 6 fresh test calls and upstream regression tests; RESOLVED classification confirmed; B11 auto-detect alias mechanism clarified; ADR 007 compatibility policy noted; runtime lifecycle hardening noted; no new defects; all v5.0 conclusions unchanged |

---

*This table is the authoritative summary of the Iranti Benchmarking Program. For full methodology, see papers/. For full results, see results/published/. For corrections, see results/published/CORRECTION-NOTICE.md.*
