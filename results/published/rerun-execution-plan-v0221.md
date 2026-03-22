# Locked Execution Plan — Iranti v0.2.21 Full Rerun

**Role:** Research Program Manager
**Date:** 2026-03-22
**Plan version:** 1.0 (locked)
**Status:** PLANNING-ONLY — rerun has not started
**Prior art:** results/published/remediation-report-pre-rerun.md (commit 87280b1)
**Rerun cleared by:** Pre-rerun remediation pass — all 7 audit blockers resolved

---

## 1. Rerun Scope

### In scope — 11 benchmark tracks

| Track | Name | Reason |
|-------|------|--------|
| B1 | Entity Fact Retrieval | Rerun; remediated protocol (blind NIAH baseline); efficiency measurement added |
| B4 | Multi-hop Entity Reasoning | Rerun; iranti_search weakness to be directly measured under v0.2.21 |
| B5 | Knowledge Currency / Update | Rerun; document any v0.2.21 changes to update semantics |
| B6 | iranti_ingest Pipeline | Rerun; contamination ruled out in remediation; must use clean KB |
| B7 | Episodic Memory | Redesigned protocol (Candidate A, context-clear); first valid run of this design |
| B8 | Multi-Agent Coordination | Rerun; genuine process isolation per remediation protocol |
| B9 | Entity Relationships | Rerun; document relationship query gap; test whether v0.2.21 adds read capability |
| B10 | Knowledge Provenance | Rerun; clarify agentId vs. source distinction |
| B11 | Context Recovery | Rerun; test whether iranti_attend classifier is fixed in v0.2.21 |
| B12 | Interrupted Session Recovery | Rerun; genuine session break per remediation protocol |
| B13 | Upgrade Durability | Rerun; v0.2.21 as the upgrade target; test cross-version durability |

### Not in scope

| Track | Reason |
|-------|--------|
| B2 | No benchmark.md; not designed; out of scope for this rerun |
| B3 | No benchmark.md; not designed; out of scope for this rerun |

B2 and B3 may be designed and run as separate future tracks. They do not block the v0.2.21 rerun.

---

## 2. Environment Under Test

### Iranti instance

| Parameter | Value |
|-----------|-------|
| Version | 0.2.21 (installed binary) |
| Instance | `iranti run --instance local` |
| Project binding | `iranti project init . --instance local --agent-id benchmark_program_main --mode isolated` |
| Source import | **PROHIBITED** — no direct imports from C:\Users\NF\Documents\Projects\iranti |
| Prior KB state | Present from prior benchmark runs; mitigated per track-specific controls (see Section 5) |

### Evaluation model

| Parameter | Value |
|-----------|-------|
| Model | Claude Sonnet 4.6 (claude-sonnet-4-6) |
| Context window | 200,000 tokens |
| LLM provider | openai (Iranti Librarian) |
| Evaluation agent | claude-sonnet-4-6 (benchmark_scientist role) |

### Startup procedure

Before any rerun trial begins:
1. Run `iranti doctor --instance local` — confirm v0.2.21 is running
2. Run `iranti status` — confirm instance is healthy
3. Run iranti_handshake — confirm MCP transport is live and version is 0.2.21
4. Document the handshake response in the first trial report of the session

---

## 3. Track-by-Track Execution Plan

---

### B1 — Entity Fact Retrieval Under Distractor Density

**Protocol version:** v0.2.21-remediated (blind NIAH)
**Status:** Rerun of existing protocol; carries forward N=2000 blind result

**Baseline arm:**
Read the entire haystack document sequentially in 500-line chunks. No position hints, no ground truth pre-disclosure. After completing the full read, answer Q1–Q10 from memory only. No re-reading permitted for answering.

Dataset: `benchmarks/B1-entity-retrieval/dataset-2000-blind.md` (12,016 lines, ~107k tokens, Ground Truth header stripped).

**Iranti arm:**
Write 10 facts (5 per entity) to Iranti KB using iranti_write. Query all 10 facts back using iranti_query. Do not read the haystack document. Record write action, query response, and exact values retrieved.

Entities: `researcher/b1_n0221_alice_chen`, `researcher/b1_n0221_bob_okafor` (new entity names to avoid prior-run contamination from v0.2.16 entities).

**Efficiency measurement (new for v0.2.21):**

In addition to accuracy, record for both arms:
- Total Read tool calls made
- Estimated tokens read (lines × ~8 tokens/line estimate)
- Total iranti_query/iranti_write calls made

The Iranti arm reads zero haystack tokens. The baseline arm reads ~107k tokens. This differential is a real and measurable advantage of the KB approach that is independent of accuracy. Report as a secondary metric.

**Fairness controls:**
- Same questions (Q1–Q10) asked of both arms
- Baseline arm reads blind dataset (no answer pre-disclosure)
- Iranti arm entities use fresh names not present in prior KB runs
- Neither arm has access to the other arm's entity answers during the trial
- Dataset blind status confirmed by inspecting header before trial begins

**Scoring:**
- Primary: Q1–Q10 accuracy (0–10/10 per arm)
- Secondary: Read calls, estimated tokens consumed, iranti tool calls

**Expected result:** Both arms 10/10 at ~107k tokens (null accuracy differential confirmed at this scale). Efficiency differential visible in secondary metrics.

**What a surprising result would look like:** Iranti arm score below 10/10 (write/query regression). Baseline arm score below 10/10 (context window regression or model change). Either would be a finding requiring documentation.

**Publication framing:** Do not claim Iranti shows an accuracy advantage at N=2000. Claim instead: (a) null accuracy differential confirmed at ~107k tokens under blind protocol; (b) Iranti reduces haystack read cost to zero (O(1) vs. O(N) token consumption); (c) degradation zone for Claude Sonnet 4.6 on this task, if it exists, is beyond tested scale.

**Output files:**
- `results/raw/B1-N2000-iranti-v0221-trial.md`
- Update `benchmarks/B1-entity-retrieval/trials-baseline.md`
- Update `benchmarks/B1-entity-retrieval/trials-iranti.md`

---

### B4 — Multi-hop Entity Reasoning

**Protocol version:** v0.2.21 (unchanged from v0.2.16; search failure to be remeasured)
**Status:** Rerun; iranti_search was weak in v0.2.16 (descriptive NL queries returned empty; bare tokens required). Test whether v0.2.21 changed this.

**Baseline arm:**
Read a flat document containing 6 entities and their relationships. Answer 4 multi-hop questions from context. No Iranti tools.

**Iranti arm (three sub-conditions):**

Sub-condition A — Oracle: Both hops via iranti_query with known entity IDs. Tests whether KB retrieval is correct when entity IDs are given.

Sub-condition B — Search-based: Hop 1 via iranti_query (entity ID known), Hop 2 via iranti_search (attribute-value discovery). Tests whether iranti_search can surface related entities by attribute value.

Sub-condition C — Cold search: Attempt to discover Hop 1 entity via iranti_search from a natural-language description (most ecologically demanding).

**Fairness controls:**
- Same 4 questions across all conditions
- Sub-condition A establishes retrieval correctness ceiling (what oracle lookup can achieve)
- Sub-condition B isolates search discovery as the variable
- Sub-condition C tests full autonomous discovery

**Scoring:**
- Per sub-condition: 0–4 correct per question
- Record exact search queries and results for B (and C) to diagnose any failures

**Expected result:**
- Sub-condition A (oracle): 4/4 — if it degrades, KB retrieval has regressed
- Sub-condition B (search-based): Unknown — v0.2.16 was 1/4; improvement possible in v0.2.21
- Sub-condition C (cold search): Unknown — may fail similarly to v0.2.16

**What to record on search failure:** When iranti_search returns empty, record the exact query string and the result verbatim. This is the diagnostic data for the iranti_search gap.

**Publication framing:** Do not claim multi-hop reasoning is solved if Sub-condition B or C still fails. The oracle condition (A) shows KB retrieval works correctly. The search condition (B/C) shows whether autonomous discovery has improved. Treat these as separate capability claims.

**Output files:**
- `results/raw/B4-multi-hop-v0221-trial.md`
- Update `benchmarks/B4-multi-hop/benchmark.md` with v0.2.21 search results

---

### B5 — Knowledge Currency / Update Semantics

**Protocol version:** v0.2.16 unchanged; rerun to detect any v0.2.21 behavior changes

**Baseline arm:** Not applicable (B5 is a functional test of update semantics, not a comparative accuracy test).

**Iranti arm:**
Run the 5 established update conditions using iranti_write:
- T1: High-confidence update from same source (same source, conf gap ≥10)
- T1b: High-confidence update from same source (slightly different variant)
- T2: Low-confidence update (new source, low confidence)
- T3: Duplicate write (exact same fact, lower confidence)
- T4: Competing new source (two new sources, similar confidence)

For each condition, record: action returned (created/updated/rejected/contested), final stored value, final confidence, any resolution state.

**Fairness controls:** Use fresh entity names (`researcher/b5_currency_v0221_*`) to avoid interference from prior runs. Document the clean-KB starting state for each entity before the first write.

**Scoring:** Match observed action/outcome against expected semantics per condition. Record any deviation from v0.2.16 behavior explicitly.

**Expected result:** Same semantics as v0.2.16. Any deviation (e.g., new-source updates now accepted, or update formula changed) is a v0.2.21-specific finding.

**Output files:**
- `results/raw/B5-knowledge-update-v0221-trial.md`
- Update `benchmarks/B5-knowledge-update/benchmark.md`

---

### B6 — iranti_ingest Text Pipeline

**Protocol version:** v0.2.21-remediated (clean KB mandatory)
**Status:** Contamination hypothesis ruled out in remediation (12/12 with novel entity `elena_marchetti_vendramini`). Rerun confirms v0.2.21 ingest behavior.

**Critical pre-condition:** The entity used in this trial MUST be novel — entirely absent from the KB before the trial begins. Verify via iranti_query before writing. If the entity already has any stored facts, choose a different entity name.

**Baseline arm:**
Manual iranti_write of the same facts from the same source text (researcher profile). Record each write result. This establishes that the facts are writable and match the ground truth.

**Iranti arm:**
iranti_ingest on the same researcher profile text. Record all extracted facts. Compare extracted values against ground truth (as established by the manual write baseline).

**Fairness controls:**
- Novel entity name (e.g., `researcher/b6_ingest_v0221_[unique]`) not present in prior KB
- Same source text for both arms
- Verify KB is clean (entity absent) before trial starts
- Do not run B6 in the same session as B8 or other write-heavy tracks without verifying no overlap

**Scoring:**
- Per extracted fact: correct / partially correct / wrong / fabricated
- Record confidence scores for each extracted fact
- If any wrong value matches an existing KB entry, explicitly note contamination signal

**Expected result:** 4/4 or near-4/4 extraction accuracy with the novel entity (consistent with remediation result). If v0.2.21 shows contamination again on a novel entity, this is a regression.

**Publication framing:** Following remediation, B6 found 12/12 correct extraction. This rerun confirms whether v0.2.21 maintains that result. Do not claim contamination is "fixed" — claim the behavior was within spec when tested with a novel entity under both v0.2.16 and v0.2.21.

**Output files:**
- `results/raw/B6-ingest-v0221-trial.md`
- Update `benchmarks/B6-ingest-pipeline/benchmark.md`

---

### B7 — Episodic Memory (Context-Clear Design)

**Protocol version:** v0.2.21 REDESIGN (Candidate A) — FIRST RUN of this protocol
**Status:** Not a rerun. This is the first valid execution of the redesigned protocol. v0.2.16 execution had an arm confound (both arms had simultaneous KB + in-context access during probe phase). That finding is superseded by this design.

**Phase 1 — Encoding (Session A):**
Agent reads the 51-turn meeting transcript. Writes all 12 embedded facts to `project/b7_clear_v0221` using iranti_write. Session A terminates after all 12 facts are written.

**Phase 2 — Retrieval, Iranti arm (Session B — fresh subprocess):**
Fresh subprocess with zero prior context. No transcript in context. Agent answers 10 probe questions using only iranti_query. Agent must specify entity=`project/b7_clear_v0221` and the key name for each query.

**Phase 2 — Retrieval, Baseline arm (Session C — separate fresh subprocess):**
Fresh subprocess with zero prior context. Agent re-reads the full transcript (51 turns, ~5,500 tokens). Agent answers 10 probe questions from context. No Iranti tools.

**Fairness controls:**
- Session boundary must be a genuine process boundary (separate Claude Code subprocesses), not a simulated "clear context" instruction
- Both Session B and Session C start with zero prior context — neither has unfair access to the other's state
- Same 10 probe questions for both arms
- Key names used in Session B must be derived from what was written in Session A (record them in the Session A trial file)

**Scoring:** 0–10/10 per arm.

**Expected result:**
- Both arms: 10/10 (5,500 tokens is below any degradation threshold; this protocol tests KB fidelity and session boundary correctness, not scale pressure)
- A null differential here is a valid, bounded scientific result — not a failure

**What would be a failure:** Session B (Iranti arm) scores below 10/10 due to wrong entity name, wrong key name, or KB write not persisting across the process boundary. This would be a KB durability regression or a protocol execution error.

**Publication framing:** "Under a context-clear design where the Iranti arm must answer purely from KB (no transcript in context), accuracy matched the transcript-re-read baseline at 5,500-token transcript scale. This confirms KB write fidelity and cross-session retrieval correctness. The transcript length is below the regime where in-context recall degrades; a larger scale (50k–200k tokens) would be required to observe differential performance."

**Output files:**
- `results/raw/B7-episodic-v0221-session-a.md` (encoding session)
- `results/raw/B7-episodic-v0221-iranti-arm.md` (Session B)
- `results/raw/B7-episodic-v0221-baseline-arm.md` (Session C)
- Update `benchmarks/B7-episodic-memory/benchmark.md`

---

### B8 — Multi-Agent Coordination via Shared KB

**Protocol version:** v0.2.21-remediated (genuine process isolation)
**Status:** Rerun using the genuine isolation protocol validated in remediation (commit 87280b1).

**Agent Alpha (Session A — separate subprocess):**
Fresh subprocess. Agent Alpha writes 6 architectural decisions to `project/b8_coordination_v0221` using iranti_write with `agent="b8_alpha_v0221"` and `source="b8_alpha_session_v0221"`. Session A terminates.

**Agent Beta (Session B — separate fresh subprocess):**
Fresh subprocess with zero prior context about Alpha's writes. No shared state. Agent Beta:
1. Attempts entity discovery via iranti_search (record the query and result)
2. If discovery succeeds: proceeds. If not: record failure and use explicit entity name.
3. Retrieves all 6 facts via iranti_query.
4. Attempts iranti_who_knows to verify attribution (record result or permission block).

**Fairness controls:**
- Genuine subprocess boundary (not simulated)
- Beta receives no information about Alpha's writes via conversation context
- Document the exact subprocess launch mechanism in the trial report
- Use fresh entity name (`project/b8_coordination_v0221`) not present in prior KB

**Attribution protocol:**
- If iranti_who_knows is accessible: record agentId attribution
- If iranti_who_knows is blocked: use source field as proxy (document as weaker signal)
- Do not claim attribution is "verified" if only source field was available

**Scoring:**
- Discovery: pass/partial/fail (and why)
- Retrieval: 0–6/6
- Attribution: verified/proxy/unavailable

**Expected result:** 6/6 retrieval (confirmed in remediation). Discovery via NL search may still fail (confirmed weak in v0.2.16 and v0.2.21 remediation). If v0.2.21 improved semantic search, discovery success is a positive finding.

**Publication framing:** "Cross-agent fact transfer via shared KB is confirmed across genuine process boundaries (6/6 retrieval). Entity discovery via natural-language search was [result]; bare entity-name queries were [result]. Write attribution is tracked via [agentId / source field]."

**Output files:**
- `results/raw/B8-multiagent-v0221-alpha.md`
- `results/raw/B8-multiagent-v0221-beta.md`
- Update `benchmarks/B8-agent-coordination/benchmark.md`

---

### B9 — Entity Relationship Graph

**Protocol version:** v0.2.16 unchanged; rerun to detect v0.2.21 relationship query changes

**Baseline arm:** Not applicable (B9 is a functional capability test of iranti_relate and relationship query).

**Iranti arm:**
1. Write 5 typed relationship edges using iranti_relate (CO_AUTHORED_WITH, COLLABORATES_WITH, FORMERLY_COLLEAGUES_WITH, CITES_WORK_OF variants)
2. Attempt to read edges back using every available read pathway:
   - iranti_search (attempt to surface edges via NL query)
   - iranti_related (if available in v0.2.21)
   - iranti_related_deep (if available in v0.2.21)
   - iranti_query (attempt to query edge as entity fact)
   - Document any new relationship query tool if present in v0.2.21

Use fresh entity names (`researcher/b9_rel_v0221_*`) to avoid prior KB interference.

**Key test for v0.2.21:** Does iranti_related or iranti_related_deep now expose relationship edges to the agent? These tools appear in the MCP tool list. If they work, the v0.2.16 "write-only" gap is closed.

**Scoring:**
- Write success: 0–5 edges created
- Read success: 0–5 edges readable per query pathway
- Document which read pathway (if any) succeeds

**Expected result:**
- Writes: 5/5 (as in v0.2.16)
- Read via iranti_related / iranti_related_deep: Unknown — this is the key v0.2.21 measurement

**Publication framing:** Do not claim relationship graph reasoning is possible until read pathway is confirmed. If iranti_related now works, that is a positive capability finding. If read is still unavailable, the v0.2.16 conclusion stands.

**Output files:**
- `results/raw/B9-relationships-v0221-trial.md`
- Update `benchmarks/B9-entity-relationships/benchmark.md`

---

### B10 — Knowledge Provenance (iranti_who_knows)

**Protocol version:** v0.2.16 unchanged; rerun to confirm agentId attribution behavior

**Baseline arm:** Not applicable.

**Iranti arm:**
1. Write 4 facts to a fresh entity (`researcher/b10_provenance_v0221`) in this session (agentId = benchmark_program_main)
2. Run iranti_who_knows on the entity — verify agentId attribution, key enumeration, contribution count
3. Write 2 additional facts with an explicit `agent` parameter override — record whether the override changes who_knows output
4. Run iranti_who_knows again — determine whether agent override changes the recorded attribution or whether server enforces the session agentId

**Key question for v0.2.21:** Does the `agent` parameter in iranti_write affect the agentId recorded in who_knows, or is agentId enforced by the server from the session configuration?

**Scoring:**
- Attribution correctness: pass/fail per key
- Agent override behavior: documented (override honored / session agentId enforced)

**Output files:**
- `results/raw/B10-provenance-v0221-trial.md`
- Update `benchmarks/B10-knowledge-provenance/benchmark.md`

---

### B11 — Context Recovery (iranti_observe + iranti_attend)

**Protocol version:** v0.2.16 with iranti_attend status re-tested under v0.2.21
**Status:** Rerun. iranti_attend's classification parser failed in v0.2.16 (`classification_parse_failed_default_false`). Test whether v0.2.21 fixes this.

**Baseline arm:** Not applicable (B11 is a recovery capability test, not a comparative accuracy test).

**Iranti arm:**
1. Write 6 facts to `project/b11_recovery_v0221` (a simulated project entity with known decisions)
2. Run iranti_observe with entity hint — record which facts are returned, in what order
3. Run iranti_observe without entity hint (cold) — record whether entity auto-detection works
4. Run iranti_attend with a natural context snippet and entity hint — record whether classifier succeeds or fails. Check for `classification_parse_failed` in response.
5. Run iranti_attend with forceInject=true — confirm recovery behavior

**B11-specific test — sla_uptime ranking (v0.2.21 check):**
Following remediation, sla_uptime exclusion was characterized as a confidence-tier ranking tie-break (all 6 facts at confidence=85, secondary sort consistently deprioritized sla_uptime). In v0.2.21:
- Write all 6 facts at identical confidence levels
- Verify whether sla_uptime is still consistently deprioritized under observe
- Record the exact sort order returned

This is not a blocker — the behavior was characterized as a ranking artifact, not a defect — but confirming whether v0.2.21 changed the secondary sort is informative.

**Scoring:**
- iranti_observe (with hint): 0–6 facts recovered
- iranti_observe (no hint): 0–6 facts recovered
- iranti_attend (natural): pass / fail / classifier error
- iranti_attend (forceInject): 0–6 facts recovered

**Expected result:**
- observe with hint: 5–6/6 (consistent with v0.2.16)
- attend (natural): Unknown — if v0.2.21 fixed the classifier, this may now work

**What a positive v0.2.21 finding looks like:** iranti_attend's natural classifier now succeeds. This would be a significant improvement — autonomous context injection becomes viable.

**Output files:**
- `results/raw/B11-context-recovery-v0221-trial.md`
- Update `benchmarks/B11-context-recovery/benchmark.md`

---

### B12 — Interrupted Session Recovery

**Protocol version:** v0.2.21-remediated (genuine session break)
**Status:** Rerun using genuine process isolation protocol validated in remediation.

**Phase 1 (Session A — separate subprocess):**
Write 8 facts to `project/b12_recovery_v0221`:
- Batch A (confidence=95): 5 setup/configuration facts
- Batch B (confidence=90): 3 in-progress/state facts

Session A terminates after all 8 writes complete. Record all write results.

**Phase 2 (Session B — fresh subprocess, zero prior context):**
Four recovery tests in separate Session B runs (or clearly isolated steps):

1. iranti_query (oracle): Explicit entity+key lookups for all 8 facts. Expected 8/8.
2. iranti_observe with entity hint: Session B requests entity `project/b12_recovery_v0221` with maxFacts=8. Record which facts are returned, in what confidence-tier order.
3. iranti_observe without entity hint: Short context passage (3–5 sentences about the task, no entity ID). Record whether entity auto-detection fires.
4. iranti_attend with entity hint: Natural context with entity hint. Record classifier behavior (success vs. parse failure).

**Fairness controls:**
- Session A and Session B are genuine subprocess boundaries
- Session B has zero knowledge of Session A's entity ID (for test 3 only; test 2 uses explicit hint)
- Document the subprocess launch mechanism

**Scoring:**
- Oracle (iranti_query): 0–8/8
- Observe with hint: 0–8/8; note confidence-tier ranking
- Observe without hint: 0–8/8; note whether entity was detected
- Attend: pass / fail / classifier error

**Expected result consistent with v0.2.16 remediation:** Oracle 8/8, observe with hint 5/8 (Batch A only, confidence tier). If v0.2.21 changed observe ranking behavior, the Batch B facts may now be returned.

**Output files:**
- `results/raw/B12-session-recovery-v0221-session-a.md`
- `results/raw/B12-session-recovery-v0221-session-b.md`
- Update `benchmarks/B12-session-recovery/benchmark.md`

---

### B13 — Runtime Upgrade and Restart Behavior

**Protocol version:** v0.2.16 → v0.2.21 upgrade test (extended cross-version chain)
**Status:** Rerun with v0.2.21 as the upgrade target. Extends the v0.2.16 chain.

**Pre-upgrade step:**
Before upgrading the instance from v0.2.16 to v0.2.21 (or if already on v0.2.21, document that the upgrade occurred):
1. Run iranti_handshake — record version field
2. Run iranti_query on 3 entities written in prior versions (from the v0.2.16 B13 trial) — confirm they are still readable
3. Record the state of the KB metadata (entity count, known entities)

**Post-upgrade (v0.2.21 instance running):**
1. Run iranti_handshake — confirm version is 0.2.21
2. Query the same 3 prior-version entities — confirm values are unchanged
3. Write 3 new facts to fresh entities (`project/b13_upgrade_v0221_*`)
4. Query the new facts back — confirm write/read round-trip
5. Run iranti_who_knows on one prior entity — confirm attribution is preserved

**Fairness controls:** This track has no comparative baseline. It is a durability and compatibility test only.

**Scoring:**
- Cross-version fact durability: pass/fail per entity
- Post-upgrade write/read: pass/fail
- Attribution preservation: pass/fail

**Expected result:** All pass (consistent with v0.2.16 result and ADR 007 compatibility policy commitment).

**Output files:**
- `results/raw/B13-upgrade-v0221-trial.md`
- Update `benchmarks/B13-upgrade-behavior/benchmark.md`

---

## 4. Protocol Version Notes

| Track | Protocol in use | Changes from v0.2.16 |
|-------|----------------|----------------------|
| B1 | Blind NIAH (new; first introduced in remediation) | Baseline uses blind dataset; efficiency measurement added |
| B4 | Same as v0.2.16 | None; search failure re-measured |
| B5 | Same as v0.2.16 | Fresh entity names |
| B6 | Clean-KB protocol (strengthened in remediation) | Novel entity required; contamination check mandatory |
| B7 | Context-Clear Design (Candidate A) — first execution | Replaces v0.2.16 protocol entirely; session boundary enforcement required |
| B8 | Genuine process isolation (validated in remediation) | Replaces v0.2.16 same-session protocol |
| B9 | Same as v0.2.16, plus iranti_related/iranti_related_deep test | New read pathway test |
| B10 | Same as v0.2.16, plus agent override attribution test | New question about agent parameter behavior |
| B11 | Same as v0.2.16, plus iranti_attend re-test | iranti_attend classifier status is the key new measurement |
| B12 | Genuine session break (validated in remediation) | Replaces v0.2.16 simulated break |
| B13 | Extended chain to v0.2.21 | Prior-version entities verified pre-upgrade |

---

## 5. Baseline Fairness Controls

### Universal controls (apply to all tracks)

1. **Fresh entity names for all v0.2.21 trials.** All new writes use entity names with a `_v0221` suffix or equivalent namespace. This prevents contamination from v0.2.16 entities that already exist in the KB.

2. **KB state verification.** Before writing to any entity, run iranti_query to confirm the entity is absent (or document its current state if it already exists).

3. **Same question set for both arms.** When a track has a baseline arm and an Iranti arm, both answer identical questions.

4. **No cross-arm information sharing.** The agent running one arm does not read the other arm's trial report before completing its trial.

5. **Session boundaries for multi-session tracks.** B7, B8, B12 require genuine subprocess boundaries — separate Claude Code agent invocations, not simulated "clear context" instructions. Document the subprocess mechanism in each trial report.

6. **Handshake confirmation.** Each session that uses Iranti must confirm version 0.2.21 is running before recording any results.

### Track-specific controls

| Track | Specific control |
|-------|-----------------|
| B1 | Baseline reads blind dataset (no ground truth header); new entity names |
| B6 | Novel entity; iranti_query clean-slate verification before ingest |
| B7 | Session B (Iranti arm) has zero transcript in context; Session C (baseline) has zero KB access |
| B8 | Alpha and Beta are separate subprocesses; Beta has no entity name hint in advance |
| B12 | Session B has no prior context; Batch A and Batch B written at different confidence levels to test ranking |

### What "definitional baseline" means and where it applies

B8, B9, B10, B12 include conditions where the baseline is definitionally 0 (e.g., without Iranti, two isolated agents cannot share state). In these cases:
- The baseline 0 should be stated as definitional, not measured
- The claim is "Iranti enables X that is otherwise structurally impossible" rather than "Iranti improved accuracy by Y%"
- Do not frame a definitional 0 as a measured comparison

---

## 6. Sample Size / Trial Plan

| Track | Trials per arm | Justification |
|-------|---------------|---------------|
| B1 | 1 baseline + 1 Iranti | Deterministic KB operations; single trial sufficient for accuracy; efficiency metric is deterministic |
| B4 | 1 baseline + 3 Iranti sub-conditions | Each sub-condition is a distinct capability test |
| B5 | 1 (single arm, 5 conditions) | Each condition is a distinct semantic test; not a repeated-sampling study |
| B6 | 1 baseline + 1 Iranti | Single entity; contamination is binary signal |
| B7 | 1 baseline (Session C) + 1 Iranti (Session B) | Single-run; null differential expected at this scale; protocol validity is the primary question |
| B8 | 1 Alpha session + 1 Beta session | Genuine isolation test; 6 facts; single run |
| B9 | 1 Iranti (write + all read pathways) | Capability probe; single run |
| B10 | 1 Iranti | Attribution behavior probe; single run |
| B11 | 1 Iranti (4 sub-conditions) | Each sub-condition tests a different recovery pathway |
| B12 | 1 Phase 1 + 1 Phase 2 (4 recovery methods) | Genuine session break; each method is a distinct pathway |
| B13 | 1 pre-upgrade + 1 post-upgrade | Durability probe; single run per version |

**Note on statistical inference:** Single-trial results support capability presence/absence claims and version-comparison claims. They do not support probabilistic accuracy claims or variance estimates. All results should be framed accordingly — "in this trial" rather than "on average."

---

## 7. Artifact Update Plan

### After each track completes

1. Write the raw trial file to `results/raw/` (gitignored; not committed)
2. Update the benchmark's `benchmark.md` with the v0.2.21 result row
3. Update the relevant paper in `papers/` with v0.2.21 findings
4. Commit modified benchmark.md and paper files after each track

### After all tracks complete

Update the following publication artifacts:

| File | Update required |
|------|----------------|
| `results/published/BENCHMARK-FINAL.md` | Add v0.2.21 results table; update all track rows |
| `articles/BENCHMARK-SUMMARY-PUBLIC.md` | Update public-facing claims for all tracks |
| `papers/B1-entity-retrieval-paper.md` | Add N=1000/N=2000 blind results; add efficiency section |
| `papers/B7-episodic-memory-paper.md` | Replace v0.2.16 protocol with Candidate A; update results |
| `papers/B8-agent-coordination-paper.md` | Confirm genuine isolation result; update attribution framing |
| `papers/B11-context-recovery-paper.md` | Update iranti_attend status if v0.2.21 fixed classifier |
| `papers/B12-session-recovery-paper.md` | Update with genuine session break results |

### Final sign-off document

After all tracks complete and all artifacts are updated, write:
`results/published/rpm-signoff-v0221.md`

This document must include:
- Version under test (0.2.21)
- Date signed off
- Per-track summary (1–2 sentences)
- Any findings that require public messaging updates
- Any open questions deferred to future tracks
- Explicit confirmation that no track was closed with unresolved blocking issues

---

## 8. Publication Guardrails

These constraints apply to all publication artifacts produced from the v0.2.21 rerun.

### Accuracy claims

1. **B1:** Do not claim Iranti improves accuracy at N≤2000. The measured result is a null differential under a blind protocol. The efficiency differential (zero vs. ~107k tokens read) is a valid secondary claim.

2. **B4:** Do not claim multi-hop reasoning "works" if iranti_search sub-condition still fails. Distinguish: oracle lookup works (if confirmed); autonomous entity discovery may not (if search still weak).

3. **B7:** Do not claim episodic memory recall is improved without specifying the scale. At 5,500 tokens, both arms hit ceiling. Any claim must include: "at 5,500-token transcript scale."

4. **B8:** State that the baseline is definitional (0/6 without Iranti) rather than implying it was measured. The claim is structural: Iranti enables coordination that is architecturally impossible without it.

5. **B9:** Do not claim agent-accessible relationship graph reasoning until a read pathway is confirmed working.

6. **B11:** Do not claim iranti_attend "works autonomously" unless the v0.2.21 classifier test passes. If it still fails, the current correct claim is: "iranti_observe with entity hint achieves 5–6/6 recovery; autonomous injection via iranti_attend requires forceInject=true."

7. **B12:** Distinguish recovery pathways. "iranti_query achieves 8/8 oracle recovery" and "iranti_observe achieves 5/8 (confidence-tier-dependent) recovery" are separate claims that should not be collapsed.

### Citation guardrails (from remediation Action 7)

All corrected citation frames from commit 87280b1 must be preserved in v0.2.21 papers:
- B1: "Entity fact retrieval capability probe" — not "NIAH variant"
- B4: "Sequential entity discovery probe (original task design)" — not "HotpotQA/RULER-inspired"
- B7: MemGPT scale gap disclosure present; no MemGPT comparison baseline used
- B8: Original design framing — not "MemGPT multi-agent"
- B9: FB15k/YAGO not cited; explanatory note present
- B11: Attention restoration theory not cited

### General framing rules

- Use "in this trial" for single-run results
- Use "at [scale]" for scale-bounded results
- Use "under v0.2.21" for version-specific results
- Use "not yet tested" rather than "not possible" for untested scale points
- Use "capability presence confirmed" for functional probes, not accuracy statistics

---

## 9. Risks During Execution

| Risk | Probability | Mitigation |
|------|------------|------------|
| iranti_search still weak in v0.2.21 (B4, B8) | High — no indication it changed | Document failure; record exact queries; do not let it block other tracks |
| iranti_attend classifier still broken (B11, B12) | Medium — may or may not be fixed | Test explicitly; forceInject=true as documented fallback |
| B6 ingest contamination reappears | Low — ruled out in remediation with real LLM | Verify novel entity before running; if contamination appears again, treat as regression |
| B7 Session B key mismatch (agent uses wrong key names) | Medium — key names must carry forward from Session A | Session A trial file must explicitly record all 12 key names; Session B agent reads Session A file before querying |
| KB state interference between tracks | Medium — runs accumulate entities | Use `_v0221` namespaced entity names throughout; verify clean state before each write |
| iranti_who_knows permission blocked (B8, B10) | Medium — was blocked in remediation | Treat source field as proxy if blocked; document which tool was unavailable |
| v0.2.21 instance not running when trial starts | Low — procedural risk | Confirm via iranti_handshake at the start of every session |
| Context window exceeded (B1 baseline) | Low — ~107k tokens within 200k limit | Document token estimate in trial report |

---

## 10. Go / No-Go Criteria Before Starting

All of the following must be true before any rerun trial begins:

- [ ] `iranti run --instance local` is running
- [ ] `iranti doctor --instance local` returns healthy
- [ ] iranti_handshake confirms version = 0.2.21
- [ ] Commit 87280b1 is the current HEAD of the master branch (remediation complete)
- [ ] `benchmarks/B1-entity-retrieval/dataset-2000-blind.md` exists and header is confirmed blind (no Ground Truth section)
- [ ] `benchmarks/B7-episodic-memory/B7-redesign-v0221.md` exists (Candidate A protocol)
- [ ] No uncommitted changes in the working tree

If any of the above are false, stop. Resolve before proceeding.

---

## 11. Final Recommended Run Order

The order is designed to: (1) validate the instance first, (2) run redesigned and novel protocols before reruns, (3) run capability probes before comparative tracks, (4) run upgrade test last (since it confirms durability of all prior writes).

| Step | Track | Rationale |
|------|-------|-----------|
| 1 | **B13** (pre-upgrade check only) | Confirm prior-version facts are still present before any v0.2.21 writes begin |
| 2 | **B6** | Clean-KB ingest test; run first while KB is freshest |
| 3 | **B7 Session A** | B7 Phase 1 (write session); run early so KB facts have time to persist before Phase 2 |
| 4 | **B10** | Provenance probe; low risk, confirms agentId behavior before multi-agent tracks |
| 5 | **B9** | Relationship write + read probe; tests iranti_related/iranti_related_deep |
| 6 | **B5** | Update semantics; functional probe, no comparative arm |
| 7 | **B11** | Context recovery; tests iranti_attend classifier status in v0.2.21 |
| 8 | **B7 Session B + C** | B7 Phase 2 (retrieval sessions); run after a distinct session gap from Session A |
| 9 | **B1** | Entity retrieval (blind NIAH baseline + Iranti arm); can run in parallel as separate subprocesses |
| 10 | **B4** | Multi-hop; run iranti_search test; document failure or improvement |
| 11 | **B8** | Multi-agent (Alpha subprocess, then Beta subprocess) |
| 12 | **B12** | Session recovery (Phase 1 subprocess, then Phase 2 subprocess) |
| 13 | **B13** (post-upgrade verification) | Final confirmation that all v0.2.21 writes and cross-version facts are durable |

**Commit cadence:** Commit updated benchmark.md files after every 2–3 completed tracks. Do not let more than 5 tracks accumulate uncommitted.

**Final commit:** After all 11 tracks and all publication artifacts are updated, commit with message: `v0.2.21 full rerun complete: all [N] tracks closed`.

---

*Research Program Manager — Iranti Benchmarking Program — 2026-03-22*
*Plan version: 1.0 locked*
*Rerun has not started. This document is planning-only.*
*Prior art: results/published/remediation-report-pre-rerun.md (commit 87280b1)*
