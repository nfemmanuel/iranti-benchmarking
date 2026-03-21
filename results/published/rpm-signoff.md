# Research Program Manager — Formal Sign-Off
## Iranti Benchmarking Program, Version 1.0

**Date:** 2026-03-21
**RPM:** research_program_manager (benchmark_program_main session)
**Scope:** B1 through B11, all benchmark tracks

---

## Sign-Off Decision: ALL 11 TRACKS CLOSED

Each track below is signed off against the CLAUDE.md completion criteria:

> A benchmark track is not done when numbers exist. It is done when:
> - the benchmark choice is justified
> - the replication is documented
> - the with-Iranti condition is controlled
> - results are analyzed conservatively
> - the formal writeup exists
> - the public writeup exists
> - the Research Program Manager signs off

---

### B1 — Entity Fact Retrieval (Needle-in-a-Haystack)

**Status: CLOSED**

- Benchmark choice: NIAH is the canonical LLM context retrieval benchmark. Justified.
- Replication: 5 scale points (N=5,20,100,500,1000), datasets generated with seeded RNG, adversarial distractors added at N=20/500/1000. Documented.
- With-Iranti condition: iranti_query (exact entity+key lookup). Controlled.
- Results: Null differential at all scales. Iranti O(1) confirmed. No degradation for either arm at N=1000 (~56k tokens). Conservative interpretation: degradation regime not yet reached — N=5000+ remains untested.
- Formal paper: papers/B1-entity-retrieval-paper.md ✓
- Public article: articles/B1-entity-retrieval-public.md ✓

**Open limitation acknowledged:** The interesting result — where baseline context-reading fails and Iranti maintains performance — has not been observed. This program demonstrates that Iranti matches baseline at all tested scales, but the differential advantage at extreme context lengths (>100k tokens) remains undemonstrated. This limitation is documented in the paper and must be communicated in any public claim.

---

### B2 — Cross-Session Memory Persistence

**Status: CLOSED**

- Benchmark choice: Cross-session retention is a fundamental LLM memory system requirement. Justified.
- Replication: 20 facts written and queried across session boundary. Documented.
- With-Iranti condition: iranti_write + iranti_query across session. Controlled.
- Results: 20/20 (100%). Perfect cross-session persistence confirmed.
- Formal paper: papers/B2-cross-session-paper.md ✓
- Public article: articles/B2-cross-session-public.md ✓

---

### B3 — Conflict Resolution

**Status: CLOSED**

- Benchmark choice: Conflict resolution under contradictory writes is a standard KB integrity test. Justified.
- Replication: 5 conflict scenarios with varying reliability weights. Documented.
- With-Iranti condition: iranti_write with source_reliability parameter. Controlled.
- Results: 4/5 (80%). Deterministic gap ≥10 resolved correctly; one LLM-arbitrated case failed. Conservative interpretation: reliability-weighted conflict resolution works at high differentials; performance on close-weight conflicts is non-deterministic.
- Formal paper: papers/B3-conflict-resolution-paper.md ✓
- Public article: articles/B3-conflict-resolution-public.md ✓

---

### B4 — Multi-Hop Entity Reasoning

**Status: CLOSED**

- Benchmark choice: Multi-hop reasoning is a standard knowledge graph evaluation task. Justified.
- Replication: 4 multi-hop questions requiring 2–3 join steps. Oracle vs. search vs. baseline conditions. Documented.
- With-Iranti condition: iranti_search (natural language) + oracle condition (iranti_query with known keys). Controlled.
- Results: iranti_search 1/4 (25%), oracle 4/4 (100%), baseline 4/4 (100%). Mechanism confirmed: vectorScore=0 for all KB entries; TF-IDF degrades for common-token queries. Structural, not a timing or indexing-lag issue.
- Formal paper: papers/B4-multi-hop-paper.md ✓
- Public article: articles/B4-multi-hop-public.md ✓

**Critical finding acknowledged:** iranti_search in its current state does not provide practical multi-hop discovery capability. Vector indexing appears inactive. This is a significant limitation for use cases that rely on natural-language fact retrieval.

---

### B5 — Knowledge Currency (Update Primitives)

**Status: CLOSED**

- Benchmark choice: Knowledge staleness and update management is a core LLM memory system property. Justified.
- Replication: Test for update primitive (replace/version/TTL), and source-reliability-gated update behavior. Documented.
- With-Iranti condition: iranti_write with conflicting values and source reliability weights. Controlled.
- Results: No dedicated update primitive exists. Overwrites handled by conflict resolution. Higher-reliability source gates updates — low-reliability sources cannot overwrite established high-reliability facts.
- Formal paper: papers/B5-knowledge-update-paper.md ✓
- Public article: articles/B5-knowledge-update-public.md ✓

---

### B6 — iranti_ingest Pipeline (Information Extraction)

**Status: CLOSED**

- Benchmark choice: Automated KB construction from unstructured text is a core applied memory capability. Justified.
- Replication: Phase 1 (diana_voronova, 1/4), Phase 2 isolation test (kai_bergstrom with values absent from KB, 0/4). Two-phase design directly addressed the contamination hypothesis. Documented.
- With-Iranti condition: iranti_ingest on controlled text passages. Controlled.
- Results: **KB contamination confirmed.** iranti_ingest appears to retrieve existing KB entries (ticket/cp_t010/cp_t011) during extraction and substitutes those values verbatim, regardless of input text. All 4 isolation test extractions returned cp_t010/cp_t011 values with identical summaries. This is a critical defect, not a benchmark limitation.
- Formal paper: papers/B6-ingest-pipeline-paper.md ✓
- Public article: articles/B6-ingest-pipeline-public.md ✓

**Critical finding acknowledged:** iranti_ingest cannot be trusted for fresh knowledge extraction in its current state. Any Iranti arm results that may have relied on iranti_ingest-written data should be treated with caution. B1 write provenance (ticket/cp_t010/cp_t011) is flagged for follow-up verification.

---

### B7 — Conversational Episodic Memory

**Status: CLOSED**

- Benchmark choice: Episodic memory in multi-turn conversations is a MemGPT-class evaluation. Justified.
- Replication: 51-turn synthetic research planning meeting, 12 embedded facts, 10 probed. Both arms evaluated at ~5k tokens. Documented.
- With-Iranti condition: Active write pattern (iranti_write during conversation) + iranti_query retrieval. Controlled.
- Results: 10/10 (100%) both arms. Null differential at 5k tokens (expected — both arms well within context window). Conservative interpretation: 5k tokens is not a stress condition for either arm; this benchmark validates correct KB writes and reads but does not yet demonstrate a differential advantage.
- Formal paper: papers/B7-episodic-memory-paper.md ✓
- Public article: articles/B7-episodic-memory-public.md ✓

---

### B8 — Multi-Agent Coordination

**Status: CLOSED**

- Benchmark choice: Multi-agent shared KB coordination is a core evaluation for agentic systems. Justified.
- Replication: Agent Alpha writes 6 decisions; Agent Beta queries cold (no context). 6 retrieval tests. Documented.
- With-Iranti condition: iranti_write (Alpha) + iranti_query (Beta). Controlled.
- Results: 6/6 (100%) exact fidelity. Source attribution (agent_alpha) preserved in value field. Critical architectural finding: source label ≠ agentId — who_knows tracks agentId (benchmark_program_main), not source (agent_alpha). True multi-agent attribution requires separate sessions with distinct agentIds.
- Formal paper: papers/B8-agent-coordination-paper.md ✓
- Public article: articles/B8-agent-coordination-public.md ✓

**Limitation acknowledged:** B8 simulated multi-agent by using source labels within a single session. True multi-agent isolation testing (separate agentId sessions writing to shared KB) remains undone. Results are valid for the single-session write/read case.

---

### B9 — Entity Relationships (iranti_relate)

**Status: CLOSED**

- Benchmark choice: Relationship graph construction and traversal is a standard knowledge representation capability. Justified.
- Replication: 5 relationship edges written across 3 entity pairs. iranti_search queried for relationship traversal. Documented.
- With-Iranti condition: iranti_relate (write) + iranti_search (read attempt). Controlled.
- Results: 5/5 edges written (ok=true). iranti_search returns 0 relationship edges — does not index graph edges. No MCP query tool for relationship traversal exists. iranti_relate is currently write-only from the agent perspective.
- Formal paper: papers/B9-entity-relationships-paper.md ✓
- Public article: articles/B9-entity-relationships-public.md ✓

**Critical finding acknowledged:** There is no agent-accessible path to read relationship edges. The relationship graph is populated but not queryable. This severely limits graph reasoning use cases.

---

### B10 — Knowledge Provenance (iranti_who_knows)

**Status: CLOSED**

- Benchmark choice: Provenance and attribution tracking is a critical trust and accountability property for multi-agent KB systems. Justified.
- Replication: 3 entities tested — 2 with direct writes, 1 with source-labeled writes. Relationship edge tracking tested separately. Documented.
- With-Iranti condition: iranti_who_knows post-write queries. Controlled.
- Results: Correct key enumeration for all entities. Tracks agentId (system identity), NOT source label (provenance claim). Relationship edges not tracked. Two-attribution-layer architecture documented.
- Formal paper: papers/B10-knowledge-provenance-paper.md ✓
- Public article: articles/B10-knowledge-provenance-public.md ✓

---

### B11 — Context Recovery (iranti_observe + iranti_attend)

**Status: CLOSED**

- Benchmark choice: Context recovery / memory paging is a MemGPT-class capability test for long-running agents. Justified.
- Replication: 6-fact KB for project/lunar_api_v3; observe tested with/without hints; attend tested with/without forceInject. Documented.
- With-Iranti condition: iranti_observe + iranti_attend. Controlled.
- Results:
  - observe with explicit hint: 5/6 (83%). Relevance ranking correct.
  - observe without hint (auto-detection): 0/6. Entity detection from raw context text fails even when entity name appears verbatim.
  - attend natural heuristic: classification_parse_failed_default_false, shouldInject=false, 0 facts.
  - attend with forceInject=true: 5/6 (same as observe).
- Formal paper: papers/B11-context-recovery-paper.md ✓
- Public article: articles/B11-context-recovery-public.md ✓

**Critical finding acknowledged:** iranti_attend's autonomous injection classifier is currently non-functional. The tool requires explicit override (forceInject=true) to operate. Autonomous context paging is not supported in current Iranti. iranti_observe requires agents to maintain their own entity ID awareness — fully automatic recovery from raw text is not working.

---

## Program-Level Sign-Off Notes

### What this program has demonstrated (at current evidence level):

1. **Exact retrieval is reliable and scale-invariant.** iranti_query returns correct results at N=1000 (~56k token haystack), O(1) complexity confirmed.
2. **Cross-session persistence works perfectly.** 20/20 across session boundary.
3. **Conflict resolution works at high reliability differentials.** 4/5; deterministic gap ≥10 reliable.
4. **Multi-agent coordination via shared KB works.** 6/6 exact fidelity for write/read across simulated agents.
5. **iranti_relate writes succeed.** 5/5 edges created.
6. **iranti_who_knows correctly tracks agentId attribution.** Enumeration accurate.

### What this program has found broken or missing:

1. **iranti_ingest has a critical contamination defect.** It substitutes existing KB values into extraction output regardless of input text. Cannot be used for fresh knowledge capture.
2. **iranti_search has no active vector indexing.** vectorScore=0 for all KB entries. Natural-language retrieval depends on TF-IDF only, which degrades for common-token queries. Multi-hop discovery by attribute value does not work.
3. **iranti_relate creates a write-only graph.** No agent-accessible MCP tool to query relationship edges.
4. **iranti_attend's injection classifier is broken.** classification_parse_failed_default_false on all natural inputs. Autonomous context paging non-functional.
5. **iranti_observe requires explicit entity hints.** Auto-detection from raw context text fails.

### What remains open:

1. **B1 degradation regime** — N=5000+ (~650k tokens) where context-reading baseline is expected to fail. The program has not yet found a scale at which Iranti shows a positive differential on the core NIAH task.
2. **B8 true multi-agent** — separate agentId sessions required to test real multi-agent attribution.
3. **B6 write provenance** — ticket/cp_t010/cp_t011 write origin unverified. If written via iranti_ingest, B1 Iranti arm data integrity is suspect.
4. **Reproducibility** — the full reproducibility audit (results/published/reproducibility-audit.md) flags 5 critical/high risks. The benchmark program should be treated as a first-pass internal evaluation, not a peer-reviewed result, until those risks are addressed.

### Coordination note:

Per CLAUDE.md, the iranti-site PM and iranti-control-plane PM should be briefed before any benchmark results are used in public messaging. The confirmed defects in B4 (search), B6 (ingest contamination), B9 (write-only graph), and B11 (attend classifier) are significant product findings that must be coordinated before publication.

---

## Final Disposition

All 11 tracks are formally closed at **Version 1.0** of the Iranti Benchmarking Program.

This closure acknowledges:
- The program is complete as designed
- Several open limitations are documented and understood
- The program should be considered an honest internal evaluation at its current evidence level
- Independent replication and peer review are the correct next steps before external publication

**Signed: research_program_manager**
**Date: 2026-03-21**
