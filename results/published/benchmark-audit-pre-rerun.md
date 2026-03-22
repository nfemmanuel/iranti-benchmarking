# Pre-Rerun Benchmark Audit — Iranti Benchmarking Program

**Prepared by:** research_program_manager (synthesis of five specialist audits)
**Specialist contributors:** literature_reviewer, benchmark_scientist, statistics_reviewer, reproducibility_auditor, paper_author
**Date:** 2026-03-22
**Program version audited:** v6.0 (Iranti 0.2.16)
**Target rerun version:** 0.2.21 (pending)
**Status:** AUDIT COMPLETE — rerun NOT authorized until locked action list below is satisfied

---

## Purpose

This audit was commissioned before any v0.2.21 benchmark rerun to determine whether the current benchmark program is rigorous enough, fair enough, and externally comparable enough to support claims against public/non-Iranti baselines. All five specialist agents read the full program corpus independently and delivered findings before synthesis. This document is the authoritative pre-rerun assessment.

**The short verdict:** The program is more honest than most industry benchmarks, but it is not publication-grade and is not ready for a full rerun that would be cited externally. Specific structural problems must be fixed first. Several of these require protocol redesign, not just documentation changes.

---

## Section 1: Audit Report

### 1.1 Strengths

**1. Scientific culture is sound.** Every benchmark definition lists substantive threats to validity. Null results are reported without inflation. The correction notice (CORRECTION-NOTICE.md) retracts two findings with full explanation. A program that retracts findings is more credible than one that doesn't.

**2. The primary structural finding (B1 O(1) retrieval) has a sound mechanistic argument.** iranti_query is an indexed lookup; it is architecturally O(1) with respect to KB size. The N=5000 trial correctly demonstrates operation beyond the context window limit. The mechanism is real even if the framing needs repair.

**3. Negative findings are well-characterized.** The B4 iranti_search failure, the B3/B5 transaction timeout defect, the B11 observe confidence-ranking limitation, and the B9 write-only relationship epoch are all documented with reproducible evidence and mechanistic explanations. These are the most credible findings in the program.

**4. The B10 attribution finding is mechanically clean.** iranti_who_knows correctly tracks agentId per write. Evaluation is string comparison. Self-evaluation bias is minimal. The finding is narrow and defensible.

**5. Version discipline is good.** All trials are tied to specific Iranti versions. The multi-version rerun history (v0.2.12 → v0.2.14 → v0.2.16) and the correction notice demonstrate that the program updates findings rather than leaving stale conclusions.

---

### 1.2 Weaknesses

**W1 — CRITICAL: Self-evaluation bias is unresolved and pervasive.**
Claude Sonnet 4.6 generates the synthetic ground truth, executes both arms, and evaluates correctness. This contaminates every track where a subjective judgment is involved. It is impossible to separate model capability from self-consistency at the scale tested. The 100% baseline scores in B1 (N≤500), B7, and B12 (explicit query arm) cannot be distinguished from self-consistency artifacts. No published benchmark in the memory or retrieval literature uses the generating model as the sole evaluator. This must be addressed before any external publication.

**W2 — CRITICAL: Definitional baselines are presented as measured differentials.**
B2, B8, and B12 baselines are 0% by construction, not by measurement. The comparisons demonstrate that Iranti has capabilities that no-memory systems lack — a logical consequence of adding memory. They do not demonstrate superiority over practical alternatives (session summarization, RAG-based checkpointing, user-space JSON state, other persistent memory systems). This is the program's most significant publication-blocking framing problem.

**W3 — CRITICAL: B1 has no data in the degradation zone.**
The program's stated primary finding is "B1 positive differential confirmed at N=5000." But the N=5000 baseline is infeasible (context window exceeded), not degraded. The differential has never been measured at any scale where both arms can run and disagree. The zone between N=500 (~28k tokens, no degradation) and N=5000 (~276k tokens, infeasible) — specifically N=1000 (~55k tokens) and N=2000 (~110k tokens) — is exactly where NIAH/RULER effects emerge and where a genuine comparative measurement would live. This zone has never been tested.

**W4 — HIGH: Citation framing is a publication blocker across multiple tracks.**
- "NIAH variant" at 2,600 tokens max — NIAH effects emerge above ~32k tokens.
- "Inspired by HotpotQA" for a 4-question synthetic probe — HotpotQA is 113k Wikipedia-grounded questions with EM/F1/supporting fact metrics.
- "Inspired by FB15k, YAGO" for an API write/read completeness test — FB15k/YAGO are link prediction benchmarks for trained embedding models.
- "Inspired by MemGPT multi-agent scenarios" where MemGPT's multi-agent section has no quantitative evaluation protocol.
- "Attention restoration theory" (Kaplan, 1989 — cognitive psychology) cited as benchmark family motivation for B11.
A peer reviewer familiar with any of these will challenge the framing at first pass.

**W5 — HIGH: Session boundaries are simulated, not real (B2, B8, B12).**
B2's write and read phases ran in the same continuous conversation. B12 explicitly instructs "Do NOT clear context" — both phases ran in the same session. B8's "Agent Beta with no shared context" is false; Agent Beta runs in the same session that Agent Alpha's writes were recorded in. These protocol failures are not documentation problems — they require trial redesign.

**W6 — HIGH: B6 contamination resolution is not verified under real LLM.**
The contamination hypothesis was exposed by the kai_bergstrom isolation test (values absent from KB → 0/4) run under mock LLM. The 8/8 "fixed" result was run under real LLM with an accumulated KB. The isolation protocol was never re-run under real LLM. "Contamination ruled out" is an inference, not a measurement.

**W7 — HIGH: No track has adequate sample size for statistical claims.**
The statistics_reviewer confirms (statistical-review.md, §3): no track meets minimum n for a 95% CI at ±5pp. Maximum: n=20 (B2), n=10 per condition (B1, B7), down to n=4 (B4). The minimum required for 95% CI at ±5pp is ~384 trials. The program produces existence proofs and directional findings; it does not produce statistically supported claims.

**W8 — MEDIUM: B13 is not independently reproducible.**
The primary B13 durability claim depends on entities written across B1–B12 on this specific KB instance. No snapshot exists. Version-at-write-time is inferred from timestamp correlation, not natively recorded. No external researcher can reproduce Test 1 without this exact instance.

**W9 — MEDIUM: B7 and B8 Iranti arms conflate KB and in-context access.**
In B7, the agent writes facts to the KB during transcript playback and then answers probe questions while retaining the full transcript in context — KB retrieval cannot be isolated from in-context recall. In B8, Agent Beta at read time has full in-context knowledge of Agent Alpha's writes from the same session.

**W10 — MEDIUM: B11 has an unexplained systematic exclusion.**
The `sla_uptime` fact is absent from all four recovery result sets despite being confirmed present in the KB via iranti_query. The prior slash-value hypothesis was retracted. The mechanism is unknown. Publishing B11 scores without closing this exclusion mischaracterizes the recovery capability.

---

### 1.3 Design Gaps

**Gap 1 — Missing degradation zone for B1 and B7.**
Neither track has ever been tested at the scale where the capability would matter. B1 needs N=1000–2000; B7 needs 20k–100k tokens.

**Gap 2 — No alternative memory strategy comparison.**
No track compares Iranti against RAG-based checkpointing, session summarization, user-space JSON state, or any other practical memory alternative. All "differentials" compare Iranti against no-memory conditions. This is the right starting point but insufficient for publication-grade comparative claims.

**Gap 3 — B8 multi-agent coordination is untested.**
The attribution pathway (agentId labeling) is confirmed. True multi-agent coordination — two isolated processes exchanging information through a shared KB — has never been demonstrated. The scenario described in the B8 motivation has not been executed.

**Gap 4 — B6 isolation re-test missing.**
The definitive test for B6 (real LLM, all values absent from KB before ingest) has never been run. The 8/8 result may reflect functional extraction or may reflect a less severe form of contamination.

**Gap 5 — No KB snapshot for reproducibility.**
No snapshot of the KB exists at any version boundary. No researcher can reproduce B13 Test 1 or investigate whether B11/B12 observe scores are affected by KB state.

**Gap 6 — Prompt files not version-controlled as standalone artifacts.**
Prompts used in baseline arms are embedded in trial records rather than maintained as versioned standalone files. Replication requires prompt reconstruction, introducing uncontrolled variation.

---

### 1.4 Publication Risks

**PR-RISK-1 (BLOCKING):** "NIAH variant" and B1 as primary finding.
Reviewer will note: maximum test scale is ~2,600 tokens; NIAH is run at 128k+ tokens; B1 has never entered the NIAH-relevant regime.

**PR-RISK-2 (BLOCKING):** "HotpotQA-inspired" for B4.
Reviewer will note: 4 questions, synthetic entities, no EM/F1, no supporting fact annotations. Not comparable to HotpotQA by any definition.

**PR-RISK-3 (BLOCKING):** Definitional baselines (B2, B8, B12) presented as performance differentials.
Reviewer will note: 0% baseline is a logical consequence of architecture; no alternative systems compared.

**PR-RISK-4 (BLOCKING):** No confidence intervals on any claim.
Reviewer will note: all n values are small; no CI; phrases like "100% accuracy" (n=4) do not constitute statistical evidence.

**PR-RISK-5 (HIGH):** B1 N=5000 framing: "baseline got 0/4 correct."
This implies the model attempted and failed. The truth is the task could not be set up (context window exceeded). Distinction is material to a reviewer.

**PR-RISK-6 (HIGH):** B8 "first valid cross-agentId test" and "true multi-agent."
Label-based agentId in a single session is not multi-agent isolation.

**PR-RISK-7 (HIGH):** B6 "8/8 under real LLM; contamination ruled out."
Contamination was ruled out under mock LLM, not under real LLM with the same KB-absent-values condition.

**PR-RISK-8 (MEDIUM):** B12 8/8 oracle condition not disclosed in public summary.
Reader will conclude Iranti solves session recovery generally; actually requires oracle key knowledge.

---

## Section 2: Baseline Comparability Matrix

| Track | Current repo baseline | Relevant public baseline expectation | Pass / Partial / Fail | Required remediation |
|-------|----------------------|--------------------------------------|----------------------|---------------------|
| B1 (N≤500) | Context-reading of synthetic entity registry | NIAH: systematic length×depth sweep at 8k–200k tokens | **FAIL** | Reach N≥1000 (~55k tokens); add depth variation; use same entities both arms |
| B1 (N=5000) | Context-window infeasibility (0/4 by constraint) | NIAH: measured degradation with a capable model that can attempt the task | **FAIL** | Not a valid comparison; reframe as infeasibility finding; test degradation onset |
| B2 | Definitional 0% (stateless LLM) | MemGPT-comparable: baseline = no external store OR RAG OR summarization | **FAIL** | Add RAG or summarization comparison; implement genuine session break |
| B3 | No baseline (feature characterization) | Internal API behavior — no external standard | **PASS** | None for current framing |
| B4 | Context-reading 4/4 (genuine) | RULER multi-hop: within-document chain at 4k–128k tokens | **PARTIAL** | Remove HotpotQA/RULER citations; reframe as original sequential lookup probe |
| B5 | No baseline (feature characterization) | Internal API behavior — no external standard | **PASS** | None for current framing |
| B6 | No baseline (pipeline test) | IE benchmarks: real annotated corpora, multiple entities and passage types | **PARTIAL** | Re-run isolation test under real LLM; test ≥3 entity types before accuracy claim |
| B7 | Context-reading 10/10 at 5,500 tokens | MemGPT/LONGMEM: degradation at 50k–200k tokens; comparison vs. alternative memory systems | **FAIL** | Scale to ≥20k tokens; add context-clear phase to Iranti arm; add alternative baseline |
| B8 | Definitional 0% (no shared store) | Multi-agent benchmarks: comparison against explicit message-passing, shared scratchpads, etc. | **FAIL** | Run true separated sessions; add explicit message-passing alternative |
| B9 | No baseline (capability audit) | KGE benchmarks: link prediction MRR/Hits@K — not applicable to this | **PARTIAL** | Remove FB15k/YAGO citations; reframe as API capability audit |
| B10 | No baseline (provenance audit) | Internal attribution behavior — no external standard | **PASS** | None for current framing |
| B11 | Definitional 0% with hint (iranti_observe only) | Context recovery literature: comparison against retrieval-augmented context management | **PARTIAL** | Resolve sla_uptime exclusion; test ≥3 entities; true session break |
| B12 | Definitional 0% (simulated session break) | MemGPT session paging: comparison against alternative recovery strategies | **FAIL** | Implement real session break; add alternative comparison arm; resolve oracle condition disclosure |
| B13 | No baseline (durability audit) | API stability literature — existence proof acceptable if scoped | **PASS** | Add KB snapshot; add version sentinel writes |

**Summary:**
- **PASS (no remediation):** B3, B5, B10 — correctly framed as feature characterizations with no comparative claims
- **PARTIAL (targeted fixes):** B4, B6, B9, B11 — findings are real but framing or scope needs adjustment
- **FAIL (redesign required before comparative claim):** B1, B2, B7, B8, B12 — either definitional baselines, wrong scale, or untested session boundaries

---

## Section 3: Rerun Readiness Decision

### Verdict: NOT READY for a full v0.2.21 rerun that will be cited externally.

**Rationale:**

A full rerun of all 13 tracks against v0.2.21 without fixing the structural problems identified above would produce:
- The same definitional baseline problems in B2, B8, B12
- The same missing-degradation-zone problem in B1 and B7
- A new set of results with the same publication risks
- Potentially, new results from v0.2.21 that mask the protocol problems and make them harder to identify

Running the benchmarks again before fixing the design means compounding technical debt, not reducing it. The effort should go into fixing B1 (degradation zone), fixing B8/B12 (genuine session/process boundaries), and re-running B6 (isolation test under real LLM) — and then doing a targeted rerun of those specific tracks.

**What IS ready for targeted rerun after targeted fixes:**
- B1 degradation zone (N=1000, N=2000) — new scale points, both arms, same entities
- B6 isolation re-test — real LLM, values absent from KB
- B8 separated sessions — genuine process isolation
- B12 genuine session break — new session with no shared context

**What does NOT need a rerun (findings are already stable):**
- B3, B5 (deterministic system behavior; confirmed across multiple passes)
- B9, B10 (API capability audits; confirmed across v0.2.14 and v0.2.16)
- B13 (existence proof; stable; just needs KB snapshot and version sentinel writes)

**What needs scale-up before rerun adds value:**
- B7 (episodic memory — must reach 20k tokens before the comparison is informative)
- B4 (multi-hop — must scale to ≥50 questions before a statistical claim is supportable)

---

## Section 4: Locked Pre-Rerun Action List

Priority is ordered: blocking items must be completed before any full v0.2.21 rerun begins.

### BLOCKING — must complete before citing any rerun result externally

**ACTION-1 (B1):** Run B1 at N=1000 (~55k tokens) and N=2000 (~110k tokens) with both arms using the same entities and same questions.
- Both arms must share entity identity (the pre-N=5000 problem of different entities per arm must not recur)
- Protocol: write target entities via iranti_write before trial; present full haystack in context for baseline arm; iranti_query for Iranti arm
- This is the only scale range where a genuine measured differential between the two arms is obtainable
- **Without this, B1 has no publication-grade comparative finding. The N=5000 result must be reframed as an infeasibility demonstration, not a differential.**

**ACTION-2 (B6):** Re-run the B6 isolation protocol under real LLM provider (LLM_PROVIDER=openai).
- Write a new entity with values entirely absent from the KB before ingest
- Run iranti_ingest on prose describing the entity
- Query the 4+ target keys and compare extracted values to ground truth
- This is the definitive test: if it passes, contamination hypothesis is ruled out under real LLM. If it fails, the 8/8 claim must be downgraded.

**ACTION-3 (B8):** Run the B8 multi-agent scenario as genuinely separated processes.
- Agent Alpha: write architectural decisions in a completely separate Claude Code invocation (session A)
- Agent Beta: cold-start a new Claude Code invocation (session B) with no shared context with session A; query the KB and attempt to answer the design questions
- Document the session boundary (separate invocations, different timestamps)
- This is the scenario described in the B8 motivation. Until it is run, the claim "multi-agent coordination confirmed" is incorrect.

**ACTION-4 (B12):** Re-run B12 with a genuine session break.
- Phase 1 (session A): write all 8 task facts and terminate the session
- Phase 2 (session B): new invocation, no shared context; run handshake, observe, and explicit query recovery paths
- This requires changing the protocol specification, not just running the existing protocol again
- The confidence-level hypothesis (Batch A at 95 vs. Batch B at 90 driving the 5/8 split) must be tested: add a Phase 3c condition where all 8 facts are written at confidence=95 and re-run observe

**ACTION-5 (B11):** Investigate and resolve the sla_uptime systematic exclusion.
- Write an sla_uptime fact on a new clean test entity with no special characters; run all four recovery paths
- If the exclusion persists, characterize the mechanism before publishing any B11 recovery score
- If the exclusion is entity-specific or character-specific, document the boundary condition

**ACTION-6 (Citations):** Strip or replace all unsupportable citation claims before any external submission.
- Remove "NIAH variant" from B1 benchmark family label until N=1000+ is reached; replace with "entity retrieval capability probe (motivated by NIAH; NIAH-comparable scale not yet reached)"
- Remove "HotpotQA" and "RULER" from B4 benchmark family label; replace with "original sequential lookup probe (background: multi-hop QA literature)"
- Remove "FB15k, YAGO" from B9 entirely
- Remove "attention restoration theory" from B11
- Add explicit "Original design" labels to B8 and B9

### IMPORTANT — complete before a full v0.2.21 rerun

**ACTION-7 (B13):** Add KB snapshot and version sentinel writes.
- Before beginning any v0.2.21 rerun, write a version sentinel fact: `entity: version_sentinel/v0.2.21, key: written_at, value: {version: "0.2.21", date: "..."}`
- After v0.2.21 installation, take a KB export or snapshot if Iranti provides any mechanism to do so
- Update benchmark.md to state: "This benchmark depends on KB state accumulated across B1–B12; a fresh-instance researcher must import the KB snapshot or re-execute all prior tracks"

**ACTION-8 (B7):** Add a context-clear phase to the B7 Iranti arm.
- After the write-during-transcript phase, start a new session and answer the probe questions via iranti_query only
- This isolates KB retrieval from in-context recall
- Until this is done, B7 cannot distinguish "Iranti helped" from "the model remembered from context"

**ACTION-9 (Public summary language):** Apply the paper author audit's required language changes before any external release.
- Replace "baseline got 0/4 correct" (B1 N=5000) with explicit architectural infeasibility framing
- Add oracle condition caveat to B12 8/8 claim
- Add read-isolation disclosure to B8/B10 multi-agent attribution ("KB is globally shared; attribution tracks write provenance, not read namespace")
- Replace "works reliably" (B11 auto-detection) with "in the tested conditions"
- Add n=1 entity context to B6 "8/8" claim
- Replace "The results were clean" (B2/B13) with "consistent at the tested scale"
- Add definitional baseline disclosure to B2, B8, B12 public summary sections

**ACTION-10 (Prompt files):** Create versioned standalone prompt files for baseline arms.
- For each track with a baseline arm (B1, B4, B7, B12), extract the exact system prompt and user message format into a standalone file in the benchmark directory
- This enables external replication without reconstructing prompts from trial records

### LOWER PRIORITY — desirable before high-visibility external publication

**ACTION-11:** Add at least one practical alternative memory strategy comparison arm.
- For B2 and B12: add a session-summary arm (agent writes a structured JSON summary at phase-1 end; reads it at phase-2 start) as the comparison baseline
- For B7: add a RAG-based retrieval arm at the 20k-token scale
- Without this, all findings establish only that Iranti beats no-memory conditions — not that it is better than practical alternatives

**ACTION-12:** Use an independent evaluation protocol for degradation-zone B1 trials.
- When running B1 at N=1000 and N=2000, do not use the same Claude Sonnet 4.6 instance as evaluator
- Options: human reviewer for a subset of questions; GPT-4o as independent evaluator; exact string matching via script against a ground truth table
- This matters at the degradation zone because self-evaluation inflation could affect the differential measurement

**ACTION-13:** Run B4 at ≥50 questions before any statistical claim about iranti_search performance.
- The current 1/4 (25%) has a 95% CI of [1%, 81%] — too wide for any useful claim
- At n=50, a 25% score would have CI of [14%, 39%] — meaningful

---

## Section 5: Valid Claims After Rerun (if action list is satisfied)

These claims can be made after completing the blocking action items above, with the specified scope and framing:

**VALID-1 (B1, after ACTION-1):** "Iranti's iranti_query maintains constant retrieval accuracy from N=5 through N=2000 entities (up to ~110k tokens), while context-reading accuracy degrades measurably at N≥[X] entities. At N=5000 (~276k tokens), context-reading is architecturally infeasible; iranti_query remains unaffected. Retrieval is O(1) by index lookup."
*Condition: B1 N=1000 and N=2000 must show a measurable baseline degradation. If baseline remains at ceiling through N=2000, the degradation onset has not been found and this claim cannot be made with the N-value specified.*

**VALID-2 (B3, B5 — already valid):** "The deterministic conflict resolution pathways (same-source overwrite, source-consistent update, stale rejection) work correctly in all tested configurations. The LLM-arbitrated path (cross-source, small confidence gap) fails due to a transaction timeout defect; that path should not be used until the defect is resolved."

**VALID-3 (B4 — already valid, properly framed):** "Named attribute queries (structured key-name queries) against iranti_search return correct results with vectorScore 0.35–0.74. Semantic paraphrase queries (natural language descriptions of attributes) are not functional — the system does not resolve paraphrased descriptions to stored keys. The oracle arm (iranti_query with known entity+key) returns 4/4 correct. Multi-hop discovery via paraphrase search is not viable in the current implementation."

**VALID-4 (B6, after ACTION-2):** "iranti_ingest correctly extracts structured facts from biographical prose under a real LLM provider. Compound facts are decomposed into sub-keys. [If isolation test passes:] Extraction is from input text, not from existing KB entries — the contamination concern identified in prior evaluation is not present under real LLM conditions."

**VALID-5 (B8, after ACTION-3):** "Two agents operating in genuinely isolated sessions can exchange structured information through Iranti's shared KB without direct message-passing. Facts written by Agent Alpha in session A are retrievable by Agent Beta in session B with exact value fidelity. agentId attribution is preserved — iranti_who_knows correctly identifies the writing agent for each fact."
*Condition: Requires ACTION-3 (separated sessions) to be completed.*

**VALID-6 (B9 — already valid, reframed):** "Relationship edges written via iranti_relate are readable via iranti_related and iranti_related_deep. Depth-2 traversal is confirmed on a 4-node graph. iranti_search does not index relationship edges — edge discovery requires the read API tools (iranti_related, iranti_related_deep), not free-text search."

**VALID-7 (B10 — already valid):** "iranti_who_knows correctly tracks write provenance per agentId for KB facts. When two agents write facts to the same entity, each agent's contributions are attributed separately and queryable by agentId. Attribution tracks write provenance (agentId at write time); the KB is globally readable with no per-agent read isolation."

**VALID-8 (B11 — valid after ACTION-5):** "iranti_observe with explicit entity hints recovers [N]/6 facts from the KB when those facts have fallen out of context. Auto-detection via alias index is functional when the entity name or a registered alias appears verbatim in context. Confidence-based ranking deprioritizes progress/transient facts (low-confidence writes) relative to setup facts (high-confidence writes)."

**VALID-9 (B12, after ACTION-4):** "Following a genuine session break, [N]/8 task-relevant facts are recoverable via iranti_observe with entity hints; 8/8 facts are recoverable via explicit iranti_query if the recovery agent knows the entity+key schema in advance. The handshake mechanism is an initialization tool, not a session recovery mechanism — it does not surface entity-scoped task state."
*Condition: Requires ACTION-4 (genuine session break) and ACTION-4's Phase 3c confidence test.*

**VALID-10 (B13 — already valid, reframed):** "Facts written at each tested version (0.2.12, 0.2.14, 0.2.16) are retrievable without degradation after upgrading through the subsequent versions. MCP API surface (tool signatures) is stable across all three tested versions. This is a single-run existence proof across one upgrade path; ADR 007 formalizes the upstream compatibility-first policy that supports forward durability expectations."

---

## Section 6: Claims We Must Not Make (Even After Rerun)

**MUST-NOT-1:** "Iranti improves retrieval accuracy" as a general claim without specifying scale threshold, baseline definition, and that no alternative memory systems were compared.

**MUST-NOT-2:** "Iranti is statistically significantly better than [baseline]" — no condition in the program has sufficient n for a significance test. All findings are existence proofs and directional observations with unknown variance.

**MUST-NOT-3:** Any semantic search claim. B4 confirms that iranti_search does not support semantic paraphrase queries. "Iranti can find facts by meaning" or "search by natural language description" would directly contradict the program's own evidence.

**MUST-NOT-4:** "LLM-arbitrated conflict resolution works correctly." The transaction timeout defect is confirmed open (HIGH) and affects 10–30% of cross-source writes in the small-gap zone. This path must not be claimed functional until the defect is resolved.

**MUST-NOT-5:** "Iranti solves the session recovery problem" without disclosing: (a) the oracle condition on the 8/8 explicit-query arm, (b) that observe recovery is 5/8 and misses progress facts, and (c) that no comparison against alternative recovery strategies has been made.

**MUST-NOT-6:** "Inspired by HotpotQA" or any framing that implies B4 is comparable to HotpotQA. The structural connection is "requires two lookups." HotpotQA is a 113k-question Wikipedia dataset with EM/F1/supporting fact metrics. B4 is a 4-question synthetic probe.

**MUST-NOT-7:** "Multi-agent coordination confirmed" without disclosing that the test used sequential label-based writes in a single session, not genuinely isolated agent processes, and that concurrent write behavior has never been tested. [This changes if ACTION-3 is completed — then VALID-5 applies instead.]

**MUST-NOT-8:** "iranti_observe provides reliable passive context recovery" without noting: (a) 5/8 at n=8, (b) the systematic miss of low-confidence progress facts, (c) the unexplained sla_uptime exclusion pending resolution.

**MUST-NOT-9:** Any claim framed as "benchmark comparison" to NIAH, RULER, HotpotQA, or MemGPT evaluation protocol, without explicitly disclosing that the program implements capability probes motivated by those benchmarks, not comparable protocol replications. External citations must be used as background motivation only, not as comparability claims.

**MUST-NOT-10:** "B6 8/8 under real LLM confirms the ingest pipeline is reliable" as a general accuracy claim. n=1 entity, single passage, single entity type. This is a pilot confirmation that the pipeline functions, not a characterization of extraction accuracy across entity types.

---

## Section 7: Remaining Open Questions

**Q1 — B1 degradation onset:** At what token count does Claude Sonnet 4.6 baseline performance first drop below 100%? This is the primary unanswered question in the program. The answer determines whether B1's comparative finding is "Iranti maintains accuracy while baseline degrades at X tokens" or "both systems maintain accuracy well into long-context ranges." Neither can be asserted from current data.

**Q2 — B6 under real LLM with isolated KB:** Does iranti_ingest extract from input text or from KB context when the KB contains no matching values? This single test resolves whether the pipeline is fundamentally functional or has a real extraction defect that was only masked by KB state in the 8/8 trial.

**Q3 — B3/B5 LLM arbitration transaction timeout:** Is this fixed in v0.2.21? If upstream engineering has addressed the timeout, this changes the conflict resolution finding substantially.

**Q4 — observe confidence ranking:** Is the deprioritization of low-confidence progress facts a documented design choice or an unintended consequence? If it is a design choice, can it be overridden (e.g., by writing progress facts at higher confidence)? The workaround currently requires deliberate confidence calibration by the agent designer.

**Q5 — B11 sla_uptime exclusion:** Is this character-related (residual from the retracted slash-value hypothesis), entity-specific, or a ranking artifact? The mechanism is unknown and must be characterized before B11 scores are published.

---

## Section 8: Signoff Conditions

This audit will be considered satisfied and a v0.2.21 full rerun authorized when:

1. ACTION-1 (B1 degradation zone) is complete — both arms, same entities, N=1000 and N=2000
2. ACTION-2 (B6 isolation re-test under real LLM) is complete
3. ACTION-3 (B8 separated sessions) is complete
4. ACTION-4 (B12 genuine session break + confidence-level test) is complete
5. ACTION-5 (B11 sla_uptime exclusion resolved) is complete
6. ACTION-6 (citation cleanup) is applied to all benchmark definitions and papers
7. ACTION-9 (public summary language fixes) is applied to BENCHMARK-SUMMARY-PUBLIC.md and affected papers

Actions 7–13 are recommended before any high-visibility external publication but do not block the internal rerun authorization.

---

## Appendix A: Specialist Audit Contributions

| Specialist | Report coverage | Key findings |
|-----------|----------------|--------------|
| literature_reviewer | B1, B4, B7, B8, B9, B11, B12 — citation audit | NIAH variant unsupportable at current scale; HotpotQA citation not defensible; FB15k/YAGO categorically inapplicable; MemGPT cited without comparable evaluation protocol; "attention restoration theory" has no technical meaning in LLM evaluation |
| benchmark_scientist | All 13 tracks — task design and fairness | B1 has no data in degradation zone; B2/B8/B12 baselines are definitional; B7 Iranti arm conflates KB and in-context access; B8 label-based not process isolation; B6 contamination not ruled out under real LLM |
| statistics_reviewer | All 13 tracks — statistical adequacy (B1-B7 detailed; B8-B13 extended) | No track has sufficient n for CI; all findings are existence proofs; B4 differential (−75pp) is directionally informative but CI spans [1%, 81%]; B1 N=5000 structural argument is stronger than a probabilistic n |
| reproducibility_auditor | B8–B13 extension to prior B1-B7 audit | B13 Test 1 is permanently instance-tied; B12 session break is simulated; B8 agent parameter is client-side and unverified; B11 sla_uptime exclusion unexplained; B9 requires version gate (iranti_related_deep ≥v0.2.16) |
| paper_author | All publication surfaces — claim language audit | B1 N=5000 public framing mischaracterizes architectural constraint as measured failure; B12 oracle condition undisclosed; B8/B10 read-isolation omitted; B6 n=1 context absent; "works reliably" overstates single-entity test |

---

**Signed: research_program_manager**
**Date: 2026-03-22**
**Status: AUDIT COMPLETE — full v0.2.21 rerun NOT authorized until Section 4 blocking items are satisfied**
