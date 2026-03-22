# Reproducibility Audit Extension — Benchmarks B8–B13

**Prepared by:** reproducibility_auditor
**Date:** 2026-03-22
**Scope:** B8, B9, B10, B11, B12, B13
**Prior audit:** results/published/reproducibility-audit.md (covers B1–B7)
**Status:** Pre-publication. Findings are blocking for any external claim on these tracks.

---

## Executive Summary

B8–B13 are stronger than B1–B7 in two respects: evaluations are mostly mechanical (low self-evaluation risk) and v0.2.16 trial documentation quality is higher. However, **three blocking conditions** prevent publication:

**Block A (B8, B12):** Two benchmarks test conditions they do not operationalize. B12 avoids a real session break by protocol instruction. B8 v0.2.12 uses source labels in lieu of session separation. Protocol redesign and new trial execution are required — documentation changes alone are insufficient.

**Block B (B11, B12, B13):** Three tracks produce findings that cannot be reproduced without access to this specific instance's KB state. No snapshot exists in the repository. B13's Test 1 is permanently instance-tied unless a KB export is captured and published.

**Block C (all tracks):** Every finding is a single-run existence proof. No variance has been measured for any capability across any track.

The B8 v0.2.16 / B10 v0.2.16 multi-agent attribution finding (agentId tracked correctly via `agent` override; who_knows returns multiple per-agentId entries) is closest to reportable as preliminary evidence with targeted remediation.

---

## Per-Track Assessment

### B8 — Multi-Agent Coordination

**Rerunability (v0.2.16 rerun):** Moderate-high. The `agent="b8_agent_alpha"` override is explicit and documented with full parameters. Raw iranti_who_knows JSON response is verbatim. However: the `agent` parameter is a client-side claim, not an authenticated credential. The trial record explicitly acknowledges this. A replicating researcher cannot verify whether Iranti enforces agentId identity or merely stores the caller-supplied string.

**Session boundary validity:** The v0.2.16 rerun does not address the session boundary problem. Both Alpha-write and Beta-read phases ran in the same continuous Claude Sonnet 4.6 session. "No shared context" is a prose assertion, not a documented operational boundary.

**Self-evaluation bias:** Low. Evaluation is exact JSON value comparison (written value vs. returned value). No qualitative judgment.

**Single-trial risk:** n=5 (rerun). The 100% score is structurally expected for a functioning write/read system and is not informative about failure modes. No conflict injection, write rejection, or network failure tested.

**Environment dependency:** Moderate. The v0216_-prefixed entity does not depend on prior KB state for write/read fidelity. However, the original B8 trial used `project/lunar_api_v3` without confirming entity absence at trial start.

**Population validity:** 6 architectural decisions, well-structured JSON, net-new facts, no conflicts. Multi-agent conflict behavior entirely untested.

**Instrumentation clarity:** iranti_write and iranti_query serve distinct roles. Session boundary ambiguity is the primary concern.

---

### B9 — Entity Relationship Graph

**Rerunability:** Moderate-high. Four edge writes with full parameters tabulated. iranti_related and iranti_related_deep raw JSON verbatim. v0216_ prefix provides entity isolation. Limitation: trial does not verify absence of pre-existing edges before writing; second run on the same instance may produce inflated iranti_related_deep results.

**Self-evaluation bias:** Low. Evaluation compares returned edge properties to documented written parameters. Correctness is straightforward.

**Single-trial risk:** Single run. Cycle handling, bidirectional-only mode, and filter parameter absence each observed once.

**Environment dependency:** Moderate. v0216_ entities are net-new. Pre-existing edge contamination risk exists for subsequent runs on the same instance.

**Population validity:** 4 edges, 4 researcher-type entities, one 3-node cycle. The finding that iranti_search does not index relationship edges generalizes as a system capability boundary and is the most robust finding in B9.

**Version gate:** iranti_related and iranti_related_deep do not exist in v0.2.14 or earlier. Any replication of B9's read arm requires v0.2.16+. This requirement is not documented in the benchmark spec.

**Instrumentation clarity:** Cleanest in the B8–B13 group. iranti_relate, iranti_related, iranti_related_deep, and iranti_search serve distinct non-overlapping roles.

---

### B10 — Knowledge Provenance

**Rerunability:** High for v0.2.16 rerun. Best-documented trial in the B8–B13 group. Five tests with explicit input parameters and verbatim raw API responses. Execution order dependency (Tests 1–4 establish entities that Test 5 reads) exists but is not flagged in the protocol.

**Self-evaluation bias:** Lowest in the program. Evaluation is: does who_knows return the agentId that was supplied in the write call? Mechanical string matching with no judgment.

**Single-trial risk:** Moderate. The five tests are each run once, but the findings are structural (attribution tracks the agent override, not session default) and would produce identical results on re-run given identical inputs.

**Environment dependency:** Low for v0.2.16 rerun. v0216_b10 entities are net-new. Attribution results follow from write parameters, not KB state.

**Population validity:** 4+3+2 fact writes across 3 entities; 5 test conditions. The who_knows/relationship edge boundary is the most robust finding — edges written via iranti_relate are not tracked by who_knows. This is a confirmed design property.

**Instrumentation clarity:** Good. iranti_write, iranti_who_knows, and iranti_relate serve non-overlapping roles.

---

### B11 — Context Recovery

**Rerunability:** Moderate. Six written facts and four test calls documented with full parameters and verbatim debug output. Critical unresolved issue: the `sla_uptime` fact is consistently absent from all four recovery result sets despite being confirmed present in the KB via direct iranti_query. The prior slash-value hypothesis was retracted. The mechanism is unknown. A replicating researcher who writes an sla_uptime value without special characters may not observe the same exclusion, creating a spurious apparent improvement.

**Self-evaluation bias:** Moderate. Ground truth values were chosen by the same session. Recovery evaluation is mechanical (returned value vs. written value), but the judgment that "sla_uptime's absence is operationally significant" is qualitative and made by the same model.

**Single-trial risk:** High. Four conditions each run once. The 4/6 attend-natural score (most policy-relevant finding) has n=1 with an unexplained systematic confound.

**Environment dependency:** High. The user/main/favorite_city noise entry state and the sla_uptime ranking behavior are both instance-specific. The auto-detection improvement (alias matching, confidence=0.82) is specific to the v0216_orbital_kb_v1 entity name.

**Population validity:** 6 facts, one project entity, one session. The finding that iranti_observe returns setup facts but not progress facts is a capability gradient observation requiring controlled replication with varied confidence levels before it can be reported as a general property.

---

### B12 — Interrupted Session Recovery

**Rerunability:** PARTIAL for tool API behavior; BLOCKED for the session recovery claim.

**Critical protocol failure:** The benchmark protocol at Phase 2 explicitly states: "Do NOT clear context. Treat as a new session by calling iranti_handshake with the task description only." The "session break" was not operationalized as a real session break. The context window at the time of the handshake call contained the write confirmations from Phase 1. This is a **protocol validity failure**: the benchmark's stated claim (interrupted-session recovery) is not what the trial tested (intra-session handshake behavior).

The observe-with-hint (5/8) and explicit-query (8/8) results are valid as observations about those recovery mechanisms within the instance. The 8/8 via iranti_query demonstrates durable write storage — a genuine finding. The 5/8 via observe-with-hint depends on the confidence-level split (Batch A at 95, Batch B at 90) being the operative variable — this hypothesis is undocumented as a controlled variable.

**Self-evaluation bias:** Moderate. The baseline (0/8) is definitional. Iranti arm evaluations are mechanical value comparisons. "Batch B facts are most critical for resuming work" is a qualitative judgment by the same session.

**Single-trial risk:** Every condition run once. 5/8 observe result (most consequential finding) has n=1 with a confidence-level confound.

**Environment dependency:** Moderate. v0216_b12 entity is net-new. Observe ranking behavior may be influenced by user/main noise entry and overall KB size.

---

### B13 — Upgrade/Restart Behavior

**Rerunability:** ADEQUATE for Tests 2 and 4; BLOCKED for Test 1.

Test 1 (cross-version durability) queries entities written in B1, B4, and the B11 v0.2.14 rerun. An independent researcher starting with a fresh Iranti instance cannot execute Test 1 without first reproducing B1–B12. No KB snapshot or export exists. The "written in v0.2.12" claim is an inference from validFrom timestamp correlation against session logs — Iranti does not natively record runtime version in KB records.

Tests 2 (write/read after upgrade) and 4 (API surface stable) are reproducible on any v0.2.16 instance.

**Self-evaluation bias:** Lowest in the program. Tests 1–4 are mechanical value comparisons against known expected values.

**Single-trial risk:** Durability claim is an existence proof from a single upgrade path. Does not characterize failure probability under different schema change scenarios.

**Environment dependency:** Maximal for Test 1. Permanently tied to this specific instance's accumulated KB history.

---

## Critical Blocks to External Replication

**Block 1 — ABSOLUTE: B13 Test 1 requires this specific KB instance.**
No KB snapshot exists. No export exists. Version-at-write-time is inferred from timestamps. An external researcher cannot reproduce Test 1.

**Block 2 — STRONG: B11 and B12 observe scores depend on instance-specific KB state.**
user/main/favorite_city noise entry, sla_uptime exclusion mechanism, and observe ranking behavior are instance-specific. Fresh-instance researchers will observe different scores.

**Block 3 — STRONG: B8 "true multi-agent" finding rests on an unverified client-side parameter.**
The `agent` override is stored by Iranti but not authenticated. The "true multi-agent attribution" characterization cannot be independently verified without server-side implementation access.

**Block 4 — MODERATE: B12's 5/8 observe result depends on undocumented confidence-level assignment.**
Batch A confidence=95, Batch B confidence=90 is hypothesized as the cause but not controlled. A replicating researcher using different confidence levels may not reproduce the 5/8 split.

**Block 5 — MODERATE: B9 iranti_related_deep result may include pre-existing edges on second run.**
No pre-trial edge verification step exists.

---

## Remediation Requirements

**B8:**
1. Define "session boundary" operationally (separate Claude Code invocations with documented process boundary).
2. Add one sentence to any publication: "agentId attribution tracks the caller-supplied agent parameter; server-side enforcement of agentId identity has not been tested."
3. Add a conflict test: Agent Beta writes to an Alpha-written entity; document conflict resolution outcome.

**B9:**
1. Add minimum Iranti version (≥v0.2.16) to benchmark spec.
2. Add Phase 0 pre-trial step: call iranti_related on test entities and verify zero edges exist before writing.
3. Document the iranti_search/relationship-graph boundary in the benchmark spec.

**B10:**
1. Add session agentId as a mandatory documented field in the trial record header.
2. Flag test execution order dependency (Tests 1–4 must precede Test 5) in the protocol.

**B11 (blocking):**
1. Investigate sla_uptime exclusion: write an identical fact on a clean test entity with no special characters; run all four recovery paths. The mechanism must be characterized before publishing any B11 recovery score.
2. Control for noise entry state: either clean user/main/favorite_city before trial or document it as a KB state variable with expected effect.
3. Test auto-detection reliability boundary across three additional entity name formats.

**B12 (blocking):**
1. Redesign Phase 2 to use a genuine session break (terminate Claude Code session; start new invocation as first action of Phase 2). Remove the "Do NOT clear context" instruction.
2. Run Phase 3c: write all 8 facts at confidence=95; re-run iranti_observe. Tests the confidence-level hypothesis.
3. Add Phase 3d: observe without entity hint. Characterizes cold recovery scenario.

**B13 (blocking):**
1. Capture a KB snapshot before and after any future version transition. Store in repository.
2. Write a version sentinel fact at session start on each version: `entity: version_sentinel/v{VERSION}, key: runtime_version → "{VERSION}"`.
3. Update Section 7 ("To rerun this benchmark") to state explicitly that this benchmark requires KB state from B1–B12 or a KB snapshot import.

---

## Updated Top-5 Reproducibility Risks (Full Program B1–B13)

**Risk 1 — CRITICAL: Closed-Loop Self-Evaluation (All Tracks, Unchanged)**
Same model generates ground truth, executes arms, and evaluates outputs. No independent evaluation at any stage. Unresolved. Blocking for all external publication.

**Risk 2 — CRITICAL: B13 Is an Irreproducible Existence Proof (New)**
The program's primary structural durability claim cannot be reproduced by any researcher without this specific KB instance or a KB export that does not exist. (Prior Risk 2 — B6 contamination — demoted: resolved as mock-LLM artifact in v0.2.16.)

**Risk 3 — HIGH: Single Instance; Accumulating KB State as Hidden Confound (Unchanged, Extended)**
B11's sla_uptime exclusion, B12's observe recovery scores, B13's Test 1, and B9's pre-existing edge risk are all instance-state-dependent. No fresh-instance replication attempted for any B8–B13 track.

**Risk 4 — HIGH: Simulated Protocol Conditions Claimed as Real Conditions (New)**
B12 claims interrupted-session recovery but tests intra-session handshake behavior. B8 v0.2.12 claims multi-agent coordination but uses source labels in a single session. Both require protocol redesign, not just documentation.

**Risk 5 — HIGH: No Sample Size or Replication Count Sufficient for Statistical Claims (Unchanged)**
Every condition in every track is run once. No variance estimate exists for any finding. B12's 5/8 observe recovery and B13's durability claim are both single-run existence proofs with no error characterization.

---

*reproducibility_auditor — Iranti Benchmarking Program — 2026-03-22*
*Extension of results/published/reproducibility-audit.md covering B8–B13*
