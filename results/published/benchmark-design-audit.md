# Benchmark Design Audit — Iranti Benchmarking Program

**Prepared by:** benchmark_scientist
**Date:** 2026-03-22
**Scope:** All 13 tracks (B1–B13), v6.0 final program state
**Status:** Pre-publication. Findings are blocking for specific claims noted below.

---

## Executive Summary

The program produces genuine directional findings in roughly half its tracks. However, **five of the most prominent "positive differentials" compare Iranti against a baseline that either cannot run at all (B1 N=5000) or cannot exist by construction (B2, B8, B12 baseline)**. These are category-error comparisons — they demonstrate that a capability exists, not that Iranti is superior to alternative approaches.

Additionally, the program has never tested the degradation-onset zone for its two primary comparative tracks (B1 and B7), which is where the scientifically interesting comparison would live.

Four tracks with no baseline arm (B3, B5, B9, B10) are correctly framed as feature characterization and have no material design defects. Three tracks with genuine baselines produce honest findings (B4, B7 at tested scale, B1 at N≤500). Four tracks have structural problems that limit the strength of their evidence claims.

---

## Part 1: Per-Track Baseline Arm Assessment

### B1 — Entity Fact Retrieval

**N≤500: Genuine baseline.** Claude Sonnet 4.6 reading a synthetic document up to ~28k tokens is a fair test. Both arms use the same model, same questions, same evaluation criteria. The null differential (both at ceiling) is a valid measurement.

**N=5000: Infeasibility result, not a performance comparison.** At ~276k tokens, the dataset exceeds Claude Sonnet 4.6's 200k-token context window. The 0/4 baseline is not degraded performance — the task *cannot be executed* by this model. Presenting this as "Iranti 4/4, baseline 0/4" implies a performance gradient that was never measured.

**The missing middle is the core B1 problem.** The NIAH/RULER literature documents degradation onset at approximately 32k–128k tokens. N=1000 (~55k) and N=2000 (~110k) are the test points most likely to show genuine, measurable differential — baseline degrades, Iranti maintains. These have not been run. The program currently has null differentials below the onset and an infeasibility result above the model window. **No measurement exists in the zone where both arms can run and disagree.**

**Arm asymmetry in early runs:** The benchmark.md reveals that the Iranti arm at early scale used different entities (ticket/cp_t010, ticket/cp_t011) and different questions than the baseline arm (alice_chen/bob_okafor). Pre-N=5000 B1 runs cannot support a controlled comparison. This is not flagged in the final track conclusions.

**Verdict:** Genuine at tested scales, but arm asymmetry in early runs and no data in the degradation zone. N=5000 infeasibility is honest but is not a performance differential.

---

### B2 — Cross-Session Persistence

**Baseline type: DEFINITIONAL ZERO. Not genuine.**

The 0% baseline is declared "a logical consequence of LLM architecture" — not measured. The comparison is circular: "does Iranti enable cross-session persistence that a stateless LLM lacks?" answers itself by construction. The more informative question — "is Iranti better than session summarization, user-space JSON checkpointing, or vector-store RAG?" — is never asked.

**Session boundary is simulated, not real.** Both write and read phases ran within the same continuous conversation. The v0.2.16 rerun protocol instructs the agent to treat the read phase as a cold query, but this cannot be externally verified — the agent retains in-context write knowledge throughout.

The indirect cross-session evidence (ticket/cp_t010 written 2026-03-20, read 2026-03-21) provides genuine cross-session evidence, but it was incidental to B1, not a formal B2 measurement.

**Verdict:** Definitional baseline. Simulated session boundary. The capability finding (durable write store) is supported but rests on weaker evidence than the 20/20 score implies.

---

### B3 — Conflict Resolution

**No baseline arm. Feature characterization. Appropriate.** The 4/4 deterministic conditions + 1 transaction timeout failure is internally valid and correctly characterized. No design issues.

---

### B4 — Multi-Hop Entity Reasoning

**Genuine baseline.** Context-reading 4/4 vs. iranti_search-based 1/4 is a real, fair comparison where both arms ran and the result went against Iranti. This is the program's most honest comparative finding.

**One fairness concern:** The oracle arm (Iranti 4/4, entity IDs assumed known) is a *different, easier task* from the search-based arm — it removes the discovery step that is the hard part of multi-hop reasoning. Presenting oracle arm = "Iranti 4/4" alongside search arm = "Iranti 1/4" in the same table, without making this distinction prominent, could mislead readers.

**Verdict:** Genuine baseline. Correctly characterized. Oracle arm should be more prominently labeled as a separate, easier task.

---

### B5 — Knowledge Currency

**No baseline arm. Feature characterization. Correctly framed.** No material design issues.

---

### B6 — Automated Ingest from Prose

**No baseline arm. Pipeline test.**

**The resolution claim is not fully verified.** The 8/8 successful result was run under real LLM — but against a KB with accumulated state from all prior sessions. The isolation test that exposed contamination (kai_bergstrom, values absent from KB → 0/4) was run under mock LLM only. The program never re-ran the isolation protocol under real LLM. "Contamination ruled out" is an inference, not a measurement.

**Verdict:** "Functional under KB-grounded conditions" is supported. "Contamination hypothesis ruled out" is not.

---

### B7 — Episodic Memory

**Genuine null differential at tested scale (both 10/10 at ~5,500 tokens).** The result is expected and correctly documented as such.

**Iranti arm conflates KB and in-context access.** The agent writes facts to the KB during transcript playback, then answers probe questions while retaining the full transcript in context. The 10/10 result cannot be attributed to KB retrieval alone — the agent could answer from context just as the baseline agent does. To isolate KB retrieval, the test requires a context-clear phase before probe questions.

**Below the degradation onset.** MemGPT/LONGMEM target 100k+ token contexts. At 5,500 tokens, neither arm is under pressure. The "Episodic Memory CONFIRMED" label in BENCHMARK-FINAL.md is misleading — what was confirmed is that the instrumentation works at a scale where it is not being tested.

**Verdict:** Genuine baseline at tested scale. Iranti arm conflates KB and context access. Null differential is correct but the test is well below the scale where episodic memory matters.

---

### B8 — Multi-Agent Coordination

**Baseline type: DEFINITIONAL ZERO. Single-session label-based simulation.**

"Without Iranti, agents cannot share state" is true by construction, not measurement. No alternative coordination approach (explicit message-passing, shared scratchpad, etc.) was compared.

**The "true multi-agent" claim does not hold.** The v0.2.16 rerun used the `agent` parameter override to label writes. Both phases ran in the same Claude Sonnet 4.6 conversation session. "Agent Beta" at read time had full in-context knowledge of everything "Agent Alpha" wrote in the same session. The agent parameter is a *label*, not a *process boundary*.

**What was confirmed:** iranti_who_knows attribution correctly returns the agentId from the agent parameter override; the KB is globally readable; source attribution is preserved. These are genuine findings about the attribution pathway.

**What was not confirmed:** Whether two genuinely isolated processes with no shared context can coordinate through the KB.

**Verdict:** Definitional baseline. Single-session label-based separation. Attribution finding (who_knows) is genuine. Coordination finding requires separate-process execution.

---

### B9, B10, B13

**No baseline arms. Feature characterization tests. Correctly framed.** All have small n (acknowledged). No material design issues for their stated purpose.

---

### B11 — Context Recovery

**Baseline type: DEFINITIONAL ZERO. Manually supplied hints.**

The entity hint for observe was human-specified, not agent-inferred. The 5/6 and 4/6 scores are conditional on a correctly supplied hint. Baseline (observe with no hint) = 0 facts, definitionally.

The v6.0 alias-based auto-detection is a genuine capability advancement, but requires the entity name or alias to appear in the context string.

**Verdict:** Definitional baseline. Results are genuine conditional on hint availability. Correctly documented.

---

### B12 — Session Recovery

**Baseline type: DEFINITIONAL ZERO. Simulated boundary. Oracle key knowledge.**

Three combined problems:
1. The 0/8 baseline is definitional in the protocol
2. The session break is simulated (same continuous session — same as B2)
3. The 8/8 explicit query arm requires advance knowledge of all 8 entity+key pairs (oracle condition)

The 8/8 vs. 0/8 "differential" compares an oracle-equipped agent with KB access against a system with no memory and no schema knowledge. These are not comparable starting conditions. A non-Iranti agent with a JSON checkpoint file and the same schema would also score 8/8.

The observe arm result (5/8) is genuinely informative as an internal Iranti comparison. But it is not a cross-system comparison.

**Verdict:** Definitional baseline. Simulated session. Oracle condition on best arm. Session recovery capability is supported; the differential is not a fair comparative measurement.

---

## Part 2: Iranti Arm Fairness Assessment

| Track | Fairness issue |
|-------|---------------|
| B1 early runs | Different entities across arms (alice_chen vs. ticket/cp_t010). N=5000 corrected this. |
| B7 | Agent has dual access (KB + context) during probe questions. KB advantage cannot be isolated. |
| B8 | Agent labels are not process isolation. Agent Beta retains Alpha's writes in-context. |
| B12 | Oracle condition (8 entity+key pairs known) not available to baseline agent. |
| B2–B6, B9–B11, B13 | No structural advantages for Iranti beyond those inherent to its designed function. |

---

## Part 3: Task Difficulty Calibration

### B1 — The Missing Degradation Zone

| N | ~Tokens | Baseline status | Iranti status | Gap |
|---|---------|----------------|---------------|-----|
| 5–500 | 280–28k | At ceiling (genuine) | At ceiling | Null differential — both arms run |
| 1000 | ~55k | **NOT RUN** | **NOT RUN** | Gap — likely degradation onset |
| 2000 | ~110k | **NOT RUN** | **NOT RUN** | Gap — into degradation range |
| 5000 | ~276k | Infeasible | 4/4 | Cannot compare arms |

The NIAH/RULER literature shows baseline degradation typically beginning in the 32k–128k token range. The program has no data points in the 28k–276k range. The only result showing any differential is at a scale where the baseline cannot run. **This is the most significant gap in the entire program.**

### B7 — Below the Episodic Memory Pressure Zone

5,500 tokens is well within modern LLM reliable recall range. MemGPT/LONGMEM motivate their designs with 50k–200k token contexts. A null differential at 5,500 tokens is expected and scientifically uninformative about whether Iranti provides episodic memory advantages.

---

## Part 4: Confound Inventory

**Confound 1 — Circular evaluation (all tracks).** Claude Sonnet 4.6 generated task stimuli, executed both arms, and evaluated correctness. No independent evaluator. Self-consistency inflation is unquantifiable.

**Confound 2 — Accumulated KB state (B11, B12, B7, B6).** The KB contains entries from all 6 program passes. observe/attend retrieval ranking is influenced by all entities in the KB. Results may not generalize to clean or denser KB deployments.

**Confound 3 — Simulated session boundaries (B2, B12).** Write and read phases ran in the same continuous conversation. "Cold read" relies on model instruction, not architectural separation.

**Confound 4 — LLM provider transition mid-program.** v1.0–v2.0 used mock LLM; v3.0+ used real LLM. Material results changed (B6, B11, B4). B6 isolation test was run under mock LLM only; its failure was attributed to the mock, but never verified by re-running under real LLM.

**Confound 5 — Same-session write/read (B8, B7 Iranti arm).** In B7, the agent that wrote facts also answers from the KB. In B8, the session that wrote Alpha's decisions also executes Beta's queries. Genuine cognitive separation has not been achieved in either track.

---

## Part 5: Claim-Evidence Overreach Assessment

| Finding | Overreach? | Issue |
|---------|-----------|-------|
| B1 "positive differential confirmed at N=5000" | **YES** | Baseline infeasible; no measured differential at any testable scale |
| B2 "20/20 full-protocol rerun" | Minor | Session boundary simulated, not real |
| B4 "Named search functional; paraphrase fails" | No | Well bounded |
| B6 "8/8 real LLM; contamination ruled out" | **YES** | Isolation test not run under real LLM |
| B8 "true multi-agent; first valid cross-agentId test" | **YES** | Label-based; single session; coordination not tested |
| B9 "4/4 edges; depth-2 traversal" | No | Appropriately modest |
| B12 "positive differential +8 vs 0/8" | **YES** | Oracle condition; definitional 0; simulated session |

---

## Part 6: Recommended Fixes Before Rerun

### Critical — blocks specific claims

**Fix 1 (B1):** Run N=1000 and N=2000 with both arms, same entities, same questions. These are the only scales where a genuine measured differential is obtainable. Relabel N=5000 as "context-window infeasibility finding, not performance differential."

**Fix 2 (B6):** Re-run isolation test (all values absent from KB) under real LLM. If 4/4 → contamination ruled out. If ≤1/4 → "confirmed functional" claim must be downgraded.

**Fix 3 (B2, B12):** Establish genuine session boundaries (write in session A, close, read in session B). Removes the simulated-boundary caveat.

**Fix 4 (B8):** Run Agent Alpha and Agent Beta as genuinely separate conversations with no shared context. Only this validates the B8 motivation scenario.

### Important — should precede publication

**Fix 5 (B7):** Add context-clear phase: after write-during-transcript, start new session and answer probe questions via iranti_query only. Isolates KB retrieval from in-context recall.

**Fix 6 (B1 early runs):** Document explicitly in B1 findings that pre-N=5000 runs used different question sets per arm. Flag in threats to validity.

**Fix 7 (B11, B12):** Record complete KB entity/key inventory at time of each observe/attend trial. Required for replication and for understanding whether scores are KB-state-dependent.

### Lower priority — before high-visibility external publication

**Fix 8:** Add at least one alternative memory strategy comparison arm (JSON checkpointing, RAG, session summarization) to B2, B12, and B1 degradation-zone runs.

**Fix 9:** Use independent evaluation (human or different model) for B1 degradation-zone trials, where self-evaluation inflation could affect the differential measurement.

---

*benchmark_scientist — Iranti Benchmarking Program — 2026-03-22*
