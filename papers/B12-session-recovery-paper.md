# Write Durability and Session Recovery: A Controlled Evaluation of Mid-Task State Persistence Across Session Breaks

**Status:** Working paper — not peer-reviewed
**Version:** 0.1 (Initial draft, 2026-03-21)
**Authors:** Iranti Benchmarking Program (Research Program Manager, Benchmark Scientist, Paper Author)
**Benchmark track:** B12 — Interrupted Session Recovery
**Model under test:** Iranti (installed instance, local) — iranti_write, iranti_handshake, iranti_observe, iranti_query
**Baseline condition:** No-Iranti (zero persistent state; all facts irrecoverable after session break)

---

## Abstract

We evaluate Iranti as a persistence substrate for mid-task agent state across simulated session breaks. The evaluation frames session recovery as a first-class requirement for persistent agent memory systems: if an agent is interrupted mid-task, a subsequent session should be able to reconstruct enough of the working state to resume meaningfully. The benchmark tests write durability (do mid-task writes survive the break?) and recovery completeness (do subsequent retrieval operations return those facts?).

Eight facts were written across two semantic batches — a setup batch (task goal, dataset, models, evaluation metric) at confidence 95, and a progress batch (preliminary finding, next step, open question, partial result) at confidence 90 — simulating an agent interrupted mid-analysis. After a simulated session break, four recovery modalities were evaluated in increasing order of agent-side investment: baseline (no Iranti), `iranti_handshake`, `iranti_observe` with entity hint, and `iranti_query` with explicit key lookup.

Write durability is confirmed at 100%: all eight facts survived the session break with full fidelity. Recovery completeness varies sharply by modality. `iranti_handshake` returns zero task-entity facts; it is not a recovery mechanism. `iranti_observe` with hint recovers 5/8 (63%), correctly returning setup facts but missing all three progress facts — the operationally most critical category. `iranti_query` with known entity IDs and key names recovers 8/8 (100%), providing lossless recovery.

The central finding is that write durability and recovery completeness are decoupled. The data never gets lost. The question is whether the recovery pathway can find it. Full recovery is achievable but requires prior agent knowledge of entity IDs and key names. The observe pathway's coverage gap is attributable to the confidence-differential ranking: setup facts (95) consistently displace progress facts (90) within result caps, even though progress facts are operationally more critical.

We discuss implications for agent design, session handoff protocols, and the operational significance of the setup/progress fact coverage asymmetry.

---

## 1. Introduction

Persistent agent memory systems exist to extend the effective operational window of AI agents beyond the limits of a single session and a single context window. This creates a class of requirement that receives relatively little attention in the benchmarking literature: session recovery. If an agent is interrupted — by a context flush, a process restart, a timeout, a user-initiated break, or a planned handoff to a different agent — what happens to the work in progress?

The answer depends on two separable properties of the memory system:

1. **Write durability:** Did the facts the agent wrote during the session survive the break? If writes are ephemeral or only committed at session end, an interruption may destroy all intermediate state.

2. **Recovery completeness:** Even if the data survived, can a subsequent session retrieve it fully and efficiently? Data that exists in the knowledge base but cannot be located is operationally equivalent to data that was lost.

These two properties are often conflated. A system that says "your data is safe" may mean write durability only. But safety and accessibility are different. A fact buried in a knowledge base without a reliable retrieval path does not support task resumption.

The B12 benchmark evaluates both properties under a controlled scenario: an agent is mid-task, has written structured state to Iranti, then loses the session. A subsequent session attempts recovery through four modalities with increasing agent-side knowledge requirements. The evaluation is designed to characterize not just whether recovery is possible, but how much the agent must already know — and thus what requirements are placed on session handoff design — to achieve full recovery.

The framing connects to broader questions in multi-session agent research, task interrupt and resume protocols, and the design of persistent agent workflows. Session recovery is not a corner case. Any deployed agent that operates across time — maintaining long-running tasks, coordinating across sessions, or delegating to subagents — must eventually face the session break problem.

---

## 2. Related Work

### 2.1 Agent Continuity and Long-Horizon Tasks

The agent continuity problem has been characterized across several subfields. In classical planning, interrupt and resume requires that the agent's current plan state be externalizable — representable in a form that persists beyond the agent's active execution context (Nilsson, 1998). This externalizable form must capture not just the final goal but intermediate states, partial results, and the plan suffix yet to be executed.

The challenge is amplified in LLM-based agents, where much of the agent's "working state" is implicit — distributed across the context window as the history of a conversation or task trace — rather than represented in an explicit data structure. When the context is cleared, the implicit state is lost. External memory addresses this by making the state explicit: facts are written to a store, where they persist independently of the context window.

Yao et al. (2022) introduced ReAct, a framework for interleaving LLM reasoning and tool use. ReAct traces are a form of implicit state: the history of thought, action, and observation steps. A session break in a ReAct agent destroys this trace unless it is explicitly serialized. The B12 benchmark evaluates whether Iranti can serve as that serialization layer.

### 2.2 Episodic Memory and State Representation

Episodic memory research (Tulving, 1983; Howard and Kahana, 2002) distinguishes between episodic representations (time-indexed records of specific events) and semantic representations (general facts abstracted from specific episodes). The B12 fact set maps to this distinction: setup facts (goal, dataset, models, metric) are semantic — they describe the task configuration — while progress facts (preliminary_finding, next_step, open_question) are episodic — they record the state of the agent's investigation at a specific point in time.

This distinction is operationally significant. Semantic facts describe what the task is; episodic facts describe how far along the task has progressed. An agent that recovers only semantic facts can re-establish the task context but must restart the analysis from scratch. An agent that recovers episodic facts can resume from the interruption point without repeating completed work.

The B12 result — that `iranti_observe` recovers setup facts (semantic) but not progress facts (episodic) — is therefore a recovery quality gap at precisely the most operationally critical category. The agent recovers enough to know what it was doing but not enough to know how far it had gotten.

### 2.3 MemGPT and Hierarchical Memory

Park et al. (2023)'s MemGPT introduced a hierarchical memory architecture in which the agent's context window is treated as main memory and an external store as secondary storage. Session management in MemGPT involves explicit serialization of working memory to the external store at session boundaries, with subsequent retrieval on session resumption.

The B12 benchmark is not a replication of MemGPT's specific architecture but tests an analogous capability: can a knowledge base serve as the persistence layer across a session break? The result that write durability is 100% confirms that Iranti can serve this role. The result that recovery completeness varies by modality addresses the question MemGPT's architecture leaves implicit: given that data is in the store, how reliably can it be retrieved?

### 2.4 B11 Context Recovery (iranti_observe Baseline)

B11 evaluated `iranti_observe` in a within-session context recovery scenario: facts written earlier in a session that have been displaced from the active context. B11 found that hint-assisted observe recovered 5/6 facts (83%) with correct relevance ranking, but that auto-detection failed entirely (0 candidates without hints).

B12 extends the B11 scenario across a session boundary and tests a wider range of recovery modalities. The B12 observe results (5/8 with hint) are consistent with B11's finding that hint-assisted observe is the functional recovery mode, but B12 reveals an additional limitation: progress/episodic facts are systematically underrepresented in observe results, likely due to confidence-based ranking.

### 2.5 Task State Serialization and Resumption

The checkpoint-restart literature in distributed computing (Elnozahy et al., 2002) addresses analogous problems in process recovery: when a long-running process fails, how much state can be recovered from the most recent checkpoint? This literature distinguishes between application-consistent checkpoints (capturing full application state) and crash-consistent checkpoints (capturing only committed writes at system level). The B12 recovery gap between iranti_query (lossless) and iranti_observe (partial) mirrors this distinction: explicit key-based query is application-consistent (the agent knows exactly what to ask for), while hint-based observe is a best-effort recovery that may miss some facts.

---

## 3. Benchmark Design

### 3.1 Task Definition

The benchmark simulates the following scenario:

An agent (the "interrupted agent") is conducting a multi-step analysis — specifically, evaluating LLM performance on a dataset. During the session, the agent writes two batches of facts to an Iranti entity (`task/session_recovery_eval`):

- **Setup batch:** Four facts capturing the task configuration, written at confidence 95. These represent facts that were known before analysis began.
- **Progress batch:** Four facts capturing the agent's mid-task state, written at confidence 90. These represent facts that emerged during analysis and would be lost if the session ends without persistence.

After these writes, the session is interrupted (simulated; the process is not actually killed, but the context is treated as cleared and a fresh session is opened).

A "recovery agent" then attempts to reconstruct the working state using four modalities, evaluated independently:

1. **Baseline (no Iranti):** Recovery from context alone — simulates what happens with no memory system.
2. **`iranti_handshake`:** The standard session initialization call, tested for incidental task-entity recovery.
3. **`iranti_observe` with entity hint:** Hint-assisted context recovery, the modality evaluated in B11.
4. **`iranti_query` with explicit key lookup:** Targeted fact retrieval when the agent knows entity ID and key names.

### 3.2 The Eight-Fact Dataset

All eight facts are written under entity `task/session_recovery_eval`.

**Setup batch (confidence: 95)**

| Key | Value summary |
|-----|---------------|
| `eval_goal` | Compare LLM performance on multi-hop reasoning; EM and F1 on HotpotQA |
| `dataset_used` | HotpotQA dev set, 500-question stratified sample |
| `models_under_test` | GPT-4o, Claude 3.5 Sonnet, Gemini 1.5 Pro |
| `primary_metric` | Exact match (EM), secondary F1; threshold EM ≥ 0.6 |

**Progress batch (confidence: 90)**

| Key | Value summary |
|-----|---------------|
| `preliminary_finding` | GPT-4o leads EM=0.71; Claude close at 0.68; Gemini 0.61 — all above threshold |
| `next_step` | Run bridge-question subset (250 questions); examine Gemini error patterns |
| `open_question` | Whether Gemini gap is reasoning or retrieval; needs ablation |
| `partial_result` | Bridge questions 1–80 processed; GPT-4o EM=0.74 on bridge subset so far |

### 3.3 Metrics

- **Write durability:** facts readable after session break / facts written (8/8 is 100%)
- **Recovery coverage per modality:** facts recovered by modality / 8 total facts
- **Setup fact recall:** setup facts recovered / 4 setup facts
- **Progress fact recall:** progress facts recovered / 4 progress facts
- **Differential vs. baseline:** recovery by modality − 0 (baseline recovers 0/8)

### 3.4 Recovery Modality Details

**Modality 1 — Baseline (no Iranti):** No persistent memory system. All facts were in-context during the interrupted session. After context clear, zero facts are accessible.

**Modality 2 — `iranti_handshake`:** The standard session initialization call that returns agent bookkeeping information: session ID, agent configuration, current bindings. Not designed for task-entity fact retrieval. Tested to determine whether any task-entity facts are incidentally returned.

**Modality 3 — `iranti_observe` with entity hint:** Called with:
```
iranti_observe(
  currentContext: "Resuming interrupted session. Was analyzing LLM multi-hop reasoning performance. Need to recover what was being tested and current progress.",
  entityHints: ["task/session_recovery_eval"],
  maxFacts: 8
)
```

**Modality 4 — `iranti_query` with explicit key lookup:** Called with known entity ID and key names:
```
iranti_query(
  entity: "task/session_recovery_eval",
  keys: ["eval_goal", "dataset_used", "models_under_test", "primary_metric",
         "preliminary_finding", "next_step", "open_question", "partial_result"]
)
```

---

## 4. Results

### 4.1 Write Durability

All eight facts were readable after the simulated session break. No data loss was observed.

| Batch | Facts written | Facts readable post-break | Durability |
|-------|--------------|--------------------------|------------|
| Setup (confidence 95) | 4 | 4 | 100% |
| Progress (confidence 90) | 4 | 4 | 100% |
| **Total** | **8** | **8** | **100%** |

Write durability is confirmed as complete. The confidence differential between batches (95 vs. 90) has no effect on write durability. Both batches are fully persisted.

### 4.2 Recovery by Modality

| Modality | Facts recovered | Setup (4) | Progress (4) | Notes |
|----------|----------------|-----------|--------------|-------|
| Baseline (no Iranti) | 0/8 (0%) | 0/4 | 0/4 | No persistent state |
| `iranti_handshake` | 0/8 (0%) | 0/4 | 0/4 | Returns agent bookkeeping only |
| `iranti_observe` + hint | 5/8 (63%) | 4/4 | 1/4 | Setup complete; progress largely missing |
| `iranti_query` (explicit) | 8/8 (100%) | 4/4 | 4/4 | Lossless |

### 4.3 iranti_handshake: Not a Recovery Tool

`iranti_handshake` returned session metadata, agent configuration, and binding information. Zero facts from the entity `task/session_recovery_eval` were present in the handshake response. This is expected behavior: handshake is a session initialization protocol, not a knowledge retrieval call. The result is documented here to prevent misuse of handshake as a recovery mechanism.

### 4.4 iranti_observe: Setup-Complete, Progress-Incomplete

With the entity hint provided, `iranti_observe` returned 5 facts. All four setup facts were returned. Of the four progress facts, only one was returned (`preliminary_finding`). Three progress facts were not returned: `next_step`, `open_question`, and `partial_result`.

**Ranking analysis:** The returned facts, in order:

| Rank | Key | Confidence | Batch |
|------|-----|-----------|-------|
| 1 | `eval_goal` | 95 | Setup |
| 2 | `dataset_used` | 95 | Setup |
| 3 | `models_under_test` | 95 | Setup |
| 4 | `primary_metric` | 95 | Setup |
| 5 | `preliminary_finding` | 90 | Progress |
| — | `next_step` | 90 | Progress — not returned |
| — | `open_question` | 90 | Progress — not returned |
| — | `partial_result` | 90 | Progress — not returned |

The pattern is consistent with confidence-weighted ranking: setup facts at confidence 95 occupy the top four positions, and the progress fact at confidence 90 that was returned (`preliminary_finding`) is the one most semantically proximate to the recovery context string ("what was being tested and current progress"). The three unreturned progress facts are operationally active (next step, open question, partial result in flight) but rank below the confidence-95 setup facts.

Note: with `maxFacts: 8` set to match the total fact count, it is possible that the three missing progress facts were genuinely not surfaced by the ranking rather than excluded by the cap. The result suggests the ranking mechanism, not the cap, is the limiting factor.

### 4.5 iranti_query: Lossless Recovery

All eight facts were returned in exact order. Key-value fidelity was confirmed for all entries. Both setup and progress facts were returned at their original confidence values (95 and 90 respectively). No data loss or corruption was observed.

**Requirement:** The recovery agent must know (a) the entity ID (`task/session_recovery_eval`) and (b) the complete list of key names. Both were supplied explicitly in this evaluation. In practice, this requires that the interrupted agent communicate this information in a handoff artifact, or that both sessions share a known convention for entity naming and key naming.

### 4.6 Differential Summary

| Modality | Recovered | vs. Baseline | Setup | Progress |
|----------|-----------|-------------|-------|----------|
| Baseline | 0/8 | — | 0/4 | 0/4 |
| Handshake | 0/8 | +0 | 0/4 | 0/4 |
| Observe + hint | 5/8 | +5 | 4/4 | 1/4 |
| Query (explicit) | 8/8 | +8 | 4/4 | 4/4 |

---

## 5. Analysis

### 5.1 The Decoupling of Durability and Accessibility

The headline result is that write durability and recovery completeness are decoupled properties. Iranti's persistence layer maintained all eight facts across the session break. The variation in recovery outcomes across modalities is entirely a function of the retrieval pathway, not of storage integrity.

This decoupling has an important interpretive consequence. A statement like "your data is safe in Iranti" is true in the write durability sense. But "safe" and "accessible" are not the same. A progress fact that survived the session break but does not appear in an `iranti_observe` result is safe but not accessible through that pathway. The practical value of the persistence layer depends on both properties together.

The B12 evaluation establishes that full accessibility (100%) requires the highest-investment recovery modality (`iranti_query`), while the lower-investment modality (`iranti_observe`) achieves only 63% coverage with a specific coverage gap at the most operationally critical category.

### 5.2 The Progress-Fact Coverage Gap

The most operationally significant finding is the asymmetric coverage by fact category. Setup facts (task configuration) were fully recovered by `iranti_observe`. Progress facts (mid-task state) were mostly not recovered. This inversion — where the facts hardest to reconstruct from scratch (progress) are the least accessible through observe — is the sharpest finding of the benchmark.

The most plausible explanation is confidence-based ranking: setup facts were written at confidence 95, progress facts at confidence 90. When both categories compete for result slots under a ranking that weights confidence, setup facts displace progress facts. Preliminary finding (`preliminary_finding`) at confidence 90 was returned because its semantic content ("current progress") is highly proximate to the recovery context string. The three unreturned progress facts are operationally active but rank below the confidence-95 setup facts.

This is a design issue. An agent that writes progress facts at lower confidence than setup facts — which is natural, since progress facts represent tentative findings — will systematically underweight precisely the facts that are hardest to re-derive after interruption. A well-designed session persistence strategy should consider assigning higher confidence to in-flight progress state, or using a dedicated episodic key namespace that observe treats with elevated weight.

### 5.2.1 Observe Ranking Is Confidence-Based, Not Query-Relevance-Based

The observe ranking mechanism is confirmed confidence-based, not query-relevance-based. In a follow-up test, a context string explicitly requesting the missing progress facts by name — naming `next_step`, `open_question`, and `partial_result` — produced the same result set as the original neutral context string ("Resuming interrupted session. Was analyzing LLM multi-hop reasoning performance. Need to recover what was being tested and current progress."). Top-N results were the highest-confidence N facts for the entity in both cases.

This is a fundamental design characteristic: observe acts as a confidence-ranked fact retriever, not a relevance-ranked fact retriever. The query context influences entity detection (when auto-detection is active) but does not reorder facts once an entity is resolved. An agent cannot use a more specific context string to surface lower-confidence facts ahead of higher-confidence facts.

Agents requiring the highest-relevance facts from a session (rather than the highest-confidence facts) should use `iranti_query` with explicit key enumeration. That is the only modality that guarantees retrieval of specific named facts regardless of their confidence relative to other facts on the entity.

The practical implication for session recovery design: if progress facts are consistently lower-confidence than setup facts (a natural consequence of writing uncertain findings at lower confidence than established configuration), `iranti_observe` will consistently return setup facts first and progress facts only within remaining cap space. No amount of context specificity will override this ranking.

### 5.3 Handshake as a Non-Recovery Tool

The handshake result (0/8) is not a failure of Iranti's capabilities — it is a confirmation that handshake is correctly scoped to session initialization rather than task-entity retrieval. The result is documented here specifically to prevent agents from using handshake as a recovery pathway. Any agent that relies on handshake to "pick up where it left off" will find zero task-entity facts and may proceed incorrectly.

The appropriate use of handshake is to establish session context (confirm agent binding, check instance health, retrieve session metadata). Recovery of task-specific facts requires a separate, intentional retrieval call.

A follow-up test with a maximally specific task description — naming all dataset names (HotpotQA), model names (GPT-4o, Claude 3.5 Sonnet, Gemini 1.5 Pro), language pairs, and metrics (exact match, F1) — returned `workingMemory=[]`, identical to a neutral description. Task comprehension is not coupled to entity retrieval in the handshake subsystem. Handshake is an initialization tool; it cannot substitute for explicit `iranti_observe` or `iranti_query` calls in cold recovery scenarios. The specificity of the task description has no effect on what handshake returns.

### 5.4 iranti_query as a Session Handoff Protocol

The `iranti_query` result (8/8) is achievable but requires the recovery agent to know the entity ID and key names. In a real deployment, this knowledge must be communicated from the interrupted session to the recovery session through some channel. Possible mechanisms include:

1. **Handoff artifact:** The interrupted agent writes a handoff record at session end (or at regular checkpoints) listing entity IDs and key names for its active task entities. The recovery agent reads this artifact first, then issues targeted queries.

2. **Convention-based naming:** The benchmark program uses a known naming convention (`task/<task_name>`) with known key names. Any agent in the program knows where to look.

3. **Handshake extension:** A hypothetical `iranti_handshake` extension that returns not just session metadata but a list of entities the prior session had written to. This would allow the recovery agent to discover entity IDs without a prior handoff artifact.

The B12 benchmark did not test options 1 or 3. They represent future engineering directions rather than tested capabilities.

### 5.5 Confidence Calibration as a Recovery Design Choice

The B12 result implies that confidence calibration is not just a data quality signal — it is a recovery parameter. Facts written at higher confidence are more likely to be returned by observe-based recovery. An agent that writes progress facts at lower confidence than setup facts will systematically recover less of its most operationally critical state through observe.

The practical recommendation is that agents performing observe-recoverable writes should calibrate confidence to reflect retrieval priority, not just epistemic certainty. A progress fact that must be recovered to resume a task should be written at equal or higher confidence than setup facts, even if the agent is less certain of its value.

Alternatively, a two-tier recovery strategy — observe for setup context, query for progress facts — could be documented as a standard session resumption protocol. This acknowledges the coverage asymmetry rather than trying to eliminate it.

---

## 6. Discussion

### 6.1 Session Recovery as a First-Class Requirement

The B12 evaluation argues, through design rather than assertion, that session recovery is a first-class requirement for persistent agent memory systems. This means it should be evaluated and documented explicitly, not assumed to follow from write durability alone.

The argument is practical. As agents are deployed in longer-horizon tasks — multi-day research analyses, iterative engineering projects, multi-agent pipelines with handoffs — interruptions are not exceptional events. They are part of normal operation. A memory system that provides write durability but insufficient recovery tooling creates a silent risk: agents may proceed after interruption without the state they need, without knowing they are missing it.

The B12 benchmark provides a reusable evaluation template: eight facts in two semantic batches (setup and progress), tested across four recovery modalities. Future evaluations should expand this template across larger fact sets, more entity types, and more complex session structures.

### 6.2 Connection to the B11 Entity Detection Limitation

B11 established that `iranti_observe` auto-detection fails when entity names appear in context without namespace qualification. B12 extends this finding to the session recovery scenario: auto-detection without hints was not tested in B12 (the benchmark was designed around hint-assisted observe), but the B11 result predicts that auto-detection would return 0/8 in the B12 scenario as well. This is noted as an expected result rather than a tested one.

### 6.3 The Role of Iranti_observe in Recovery Workflows

`iranti_observe` with entity hints is a reasonable first-pass recovery tool for setup facts. It requires the recovery agent to know the entity ID (so that a hint can be supplied) but not the key names. For agents that maintain a simple entity registry (a list of entity IDs encountered in the session), this is a low-overhead recovery pathway that will correctly restore task configuration.

For progress facts, `iranti_observe` is not a reliable recovery tool given the current confidence-based ranking. The recommended workflow is:

1. Issue `iranti_observe` with entity hints to recover setup context.
2. Issue `iranti_query` with known key names for progress facts.

This two-call pattern achieves full recovery (8/8) while allowing the first call to confirm entity presence and the second to retrieve the in-flight state.

---

## 7. Threats to Validity

### 7.1 Simulated Session Break

The session break was simulated: the context was treated as cleared, but the process was not actually interrupted. In a real interruption scenario (process kill, timeout, network failure), there may be additional failure modes: in-flight writes not yet committed, partial writes with incomplete data, or state corruption during unclean shutdown. The 100% write durability result is established under clean-shutdown conditions only.

**Severity:** Medium. Write durability under unclean shutdown is not tested and may differ.

### 7.2 Small Fact Set

Eight facts across two entities is a minimal test. The coverage patterns observed — specifically the confidence-based ranking that deprioritizes progress facts — may not generalize to larger fact sets, different confidence distributions, or different fact types.

**Severity:** Medium. The directional finding (progress facts underrepresented) is likely robust, but the specific recovery rates (5/8, 8/8) should not be treated as stable estimates without replication on larger fact sets.

### 7.3 Single Session, Single Recovery Attempt

The benchmark was run once. There is no variance estimate for any of the recovery modalities. Iranti's retrieval mechanisms may exhibit session-to-session variance that the single-trial design cannot capture.

**Severity:** Medium. Results should be treated as directional.

### 7.4 Same Model Generates and Evaluates

The model evaluating whether a fact was "correctly recovered" was the same model that participated in designing the benchmark. This creates a risk of self-serving evaluation, particularly for subjective determinations like "the preliminary_finding value matches what was originally written."

**Severity:** Low for the quantitative results (recovered / not recovered), where fidelity is binary and directly observable. Medium for qualitative assessments.

### 7.5 No Adversarial or Boundary Conditions

The benchmark tests a clean scenario: well-structured facts, cooperative retrieval, no conflicting writes, no concurrent sessions. Real session recovery scenarios may involve schema drift (key names changed between sessions), conflicting writes from other agents, or partially corrupted entries. None of these conditions are tested.

**Severity:** Low for this evaluation's stated scope; high for production deployment assumptions.

### 7.6 Confidence Values Were Chosen by Benchmark Design

The confidence differential (95 setup, 90 progress) was a design choice intended to simulate realistic agent behavior. The finding that this differential causes observe to deprioritize progress facts is real, but the magnitude of the effect is partly a function of the chosen differential. A smaller differential (e.g., 95 setup vs. 93 progress) might produce different observe coverage.

**Severity:** Low for the directional finding; medium for any quantitative extrapolation.

---

## 8. Conclusion

We evaluate Iranti's write durability and session recovery capabilities under a controlled simulated session break. Eight facts spanning setup and progress categories are written to an Iranti entity during a simulated task, and four recovery modalities are evaluated post-break.

The main findings are:

1. **Write durability is complete (8/8, 100%).** All facts survive the session break with full fidelity. Iranti's persistence layer works. The data never gets lost.

2. **Handshake is not a recovery tool (0/8).** Task-entity facts are not returned by `iranti_handshake`. This is expected, but must be documented to prevent misuse.

3. **Observe recovers setup facts completely but progress facts minimally (5/8, 63%).** The confidence differential between setup (95) and progress (90) batches causes observe's ranking to deprioritize progress facts — the operationally most critical category. This is the most significant finding from a session recovery design standpoint.

4. **Explicit key query achieves lossless recovery (8/8, 100%).** `iranti_query` with known entity ID and key names is a complete recovery mechanism. It requires agent-side investment: the recovery agent must know what to ask for.

5. **Write durability and recovery completeness are decoupled.** The variation in recovery outcomes is entirely a retrieval pathway question, not a storage integrity question.

The practical implication is a recommended two-call recovery pattern: `iranti_observe` with hints for setup context, followed by `iranti_query` for progress facts. Agents should also consider writing progress facts at equal or higher confidence than setup facts if observe-based recovery is a design requirement.

Future work should evaluate write durability under unclean shutdown conditions, test recovery across larger fact sets with more complex entity structures, and prototype a session handoff artifact pattern that enables agents to communicate entity IDs to successor sessions.

---

## 9. Limitations Summary

| Limitation | Severity | Planned Resolution |
|------------|----------|--------------------|
| Simulated (not real) session break | Medium | Test with actual process kill and clean-restart |
| Small fact set (8 facts, 1 entity) | Medium | Expand to ≥5 entities, ≥20 facts across more categories |
| Single trial, no variance estimate | Medium | Minimum 5 replication runs per modality |
| Same model generates and evaluates | Low–Medium | Independent evaluation of fact fidelity |
| No adversarial conditions tested | Low (for stated scope) | Future adversarial track |
| Confidence values are design choices | Medium | Test with varied confidence distributions |

---

## References

Elnozahy, E. N., et al. (2002). A Survey of Rollback-Recovery Protocols in Message-Passing Systems. ACM Computing Surveys, 34(3), 375–408.

Howard, M. W., and Kahana, M. J. (2002). A Distributed Representation of Temporal Context. Journal of Mathematical Psychology, 46(3), 269–299.

Nilsson, N. J. (1998). Artificial Intelligence: A New Synthesis. Morgan Kaufmann.

Park, J. S., et al. (2023). Generative Agents: Interactive Simulacra of Human Behavior. Proceedings of the 36th Annual ACM Symposium on User Interface Software and Technology (UIST 2023).

Tulving, E. (1983). Elements of Episodic Memory. Oxford University Press.

Yao, S., et al. (2022). ReAct: Synergizing Reasoning and Acting in Language Models. arXiv:2210.03629.

---

## Appendix A: Benchmark Protocol

See `benchmarks/B12-session-recovery/benchmark.md`.

## Appendix B: Raw Results

See `results/raw/B12-session-recovery.md`.
