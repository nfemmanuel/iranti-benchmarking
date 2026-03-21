# Benchmark B12: Interrupted Session Recovery

**Family:** Persistent memory / session continuity
**Inspired by:** MemGPT session paging; agent checkpoint/restart literature; LLM statelessness problem
**Executed:** 2026-03-21
**Iranti version:** 0.2.16
**Status:** Complete — first execution

---

## 1. Motivation and Benchmark Justification

A core claim of persistent memory systems is that work survives session interruption. LLMs are stateless by construction: each new session starts with a blank context window. Any state accumulated in a prior session — decisions made, facts discovered, next steps identified — is lost unless explicitly stored externally.

This benchmark tests whether Iranti can bridge that gap for a partially completed research task. It is distinct from B2 (cross-session persistence), which tests that completed writes survive across sessions. B12 tests:

1. **Partial write survival**: Do facts written progressively mid-task all survive a session break?
2. **Passive recovery** (iranti_handshake): Does the handshake mechanism surface task-relevant state automatically?
3. **Hint-assisted recovery** (iranti_observe): Given a correct entity hint, how much state does observe recover?
4. **Explicit recovery** (iranti_query): If the agent knows the entity+key schema, can it recover all state?
5. **Baseline contrast**: What can a no-Iranti agent recover? (Answer: nothing.)

The motivating scenario: an agent is mid-way through a research task, has written 8 facts progressively, and the session ends (crash, timeout, handoff). A new session must pick up the work.

---

## 2. Task Domain

**Simulated research task:** Evaluate transformer architectures for low-resource machine translation.

This domain was chosen because it is:
- Realistic (a plausible multi-session research task)
- Has natural early-phase facts (goal, dataset, models, metric) and late-phase facts (preliminary findings, next steps, open questions)
- The split between early and late facts allows testing whether observe recovers setup state vs. progress state differently

---

## 3. Protocol

### Phase 1 — Simulated mid-task write sequence

Write 8 facts to entity `project/v0216_b12_session_recovery_task` as agent `benchmark_program_main`.

**Batch A (facts 1–5, pre-interruption setup):**

| Key | Value |
|-----|-------|
| task_goal | "Evaluate transformer architectures for low-resource translation" |
| dataset_selected | "FLoRes-200 (200 languages)" |
| baseline_model | "mBART-50" |
| iranti_arm_model | "NLLB-200-distilled-600M" |
| evaluation_metric | "spBLEU" |

**Batch B (facts 6–8, mid-task progress):**

| Key | Value |
|-----|-------|
| preliminary_finding | "mBART-50 degrades sharply below 1000 training examples" |
| next_step | "Run NLLB-200 on Swahili-English pair at N=100, 500, 1000" |
| open_question | "Does NLLB-200 show same degradation pattern or plateau earlier?" |

Record: all writes ok=true, action=created.

### Phase 2 — Simulated session break: passive recovery via iranti_handshake

Do NOT clear context. Treat as a new session by calling iranti_handshake with the task description only.

```
iranti_handshake(
  agent: "benchmark_program_main",
  task: "Continue the low-resource translation evaluation. What did we decide and what is the next step?"
)
```

Record: what facts appear in workingMemory? Does iranti surface project/v0216_b12 facts?

### Phase 3 — Cold recovery: iranti_observe and iranti_query

**3a. iranti_observe with entity hint:**
```
iranti_observe(
  currentContext: "Continue low-resource translation evaluation. Resume from last stopping point.",
  entityHints: ["project/v0216_b12_session_recovery_task"],
  maxFacts: 8
)
```

Record: how many of the 8 facts are returned? Which are missing?

**3b. iranti_query for each key explicitly:**

Issue `iranti_query(entity, key)` for all 8 keys.

Record: full recovery score.

### Phase 4 — Baseline arm

**No Iranti.** Presented with only:
> "Continue the low-resource translation evaluation. What did we decide and what is the next step?"

With no prior context and no memory store, score is definitionally 0/8.

---

## 4. Scoring

- **1 point** per fact correctly recovered (value matches written value)
- **Maximum score:** 8 points per recovery method
- **Baseline:** always 0/8

---

## 5. Results Summary

| Recovery method | Score | Recovery rate |
|----------------|-------|---------------|
| Baseline (no Iranti) | 0/8 | 0% |
| iranti_handshake | 0/8 | 0% |
| iranti_observe (with entity hint) | 5/8 | 63% |
| iranti_query (explicit key lookup) | 8/8 | 100% |

**Differential (best Iranti path vs baseline): +8/8**

---

## 6. Key Findings

### Finding 1: Durability is complete
All 8 facts — including the mid-task progress batch written after a natural pause — survived and were retrievable. There is no partial-write loss. iranti_write is durable regardless of session state.

### Finding 2: iranti_handshake does not surface task-entity facts
The handshake returned only agent-internal bookkeeping (attendant_state, stats). `sessionRecovery` and `sessionCheckpoint` were null. The handshake mechanism is not designed for entity-scoped recovery. Agents that rely on handshake alone for session recovery will receive 0/8 on task-entity state.

### Finding 3: iranti_observe recovers setup facts but not progress facts
With a correct entity hint, observe returns 5/8 — the 5 setup facts from Batch A. The 3 Batch B facts (preliminary_finding, next_step, open_question) are not returned despite maxFacts=8 covering all 8 facts. The ranking mechanism appears to deprioritize lower-confidence facts (90 vs 95 for Batch A). This is the most consequential limitation: the missing facts are exactly the ones needed to resume work.

### Finding 4: Entity auto-detection does not work
`detectedCandidates: 0` in the observe debug output. The entity ID was not auto-detected from the context string. This replicates B11's finding. Hint-free recovery from raw context is not functional.

### Finding 5: Explicit iranti_query achieves 100% recovery
Any fact can be recovered losslessly if the agent knows the entity ID and key name. This is the high-water mark for Iranti's recovery capability — but it imposes a constraint on the recovering agent.

---

## 7. Comparison to Adjacent Benchmarks

| Benchmark | What it tests | Key difference from B12 |
|-----------|--------------|------------------------|
| B2 Cross-session | Completed writes survive new session | Tests write survival only, not recovery UX |
| B11 Context recovery | iranti_observe on paged-out facts | Facts written by a single agent in one session; no interruption simulation |
| B12 Session recovery | Mid-task partial writes + multi-path recovery | Tests progressive writes, interruption, and multiple recovery pathways |

B12 is more operationally realistic than B11: it tests the specific case where an agent was interrupted mid-task, and distinguishes three recovery paths (handshake, observe, query) with different capability profiles.

---

## 8. Practical Implications for Agent Design

1. **Agents should use deterministic, stable entity IDs** (e.g., project/[task_id]) so that a recovering session can reconstruct the entity hint without relying on context.
2. **Recovery should use iranti_query, not only iranti_observe**, especially for progress/actionable facts that observe may deprioritize.
3. **iranti_handshake alone is insufficient for task-entity recovery** — it manages agent-level working memory, not entity-scoped task state.
4. **Confidence levels may affect observe ranking**: facts written with lower confidence (e.g., preliminary findings logged at 90 vs. setup facts at 95) appear to be deprioritized. Agents should consider writing progress facts at equal or higher confidence to ensure they are surfaced in recovery.

---

## 9. Threats to Validity

1. **Single task, single entity**: Results apply to one entity namespace. Recovery behavior may differ for entities with more or fewer facts, or with contested facts.
2. **Observe ranking is a black box**: The mechanism that causes Batch B facts to be deprioritized is not observable. The confidence-difference hypothesis (95 vs 90) is plausible but unverified.
3. **No true session break**: The "session break" is simulated — no actual process restart occurred. Iranti's behavior under a true cold-start (e.g., server restart) is not tested here.
4. **Entity hint was supplied manually**: Auto-detection failure is real and documented, but the hint itself was human-specified, not agent-inferred. A recovering agent must somehow determine the entity ID — this is the unsolved coordination problem.
5. **iranti_query recovery assumes key knowledge**: The 8/8 result is conditional on knowing all 8 key names. An agent without this schema knowledge would score lower.
6. **One Iranti version (0.2.16)**: Recovery behavior, particularly observe ranking and handshake scope, may change across versions.
