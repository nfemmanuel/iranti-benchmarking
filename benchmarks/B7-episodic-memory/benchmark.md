# Benchmark B7: Conversational Episodic Memory

**Family:** Episodic memory / conversational recall
**Motivated by:** MemGPT (Packer et al. 2023) establishes the case for persistent memory management in LLM agents; LONGMEM (Wang et al. 2023) demonstrates recall degradation at 30k-100k tokens. Note: no MemGPT system is used as a comparison baseline in this benchmark. The current execution (5,500 tokens) is below the regime where episodic memory effects emerge. See Section 6 Threats to Validity.
**Executed:** 2026-03-21 (v0.2.16 first execution); 2026-03-22 (v0.2.21 rerun — Candidate A context-clear design)
**Status:** Complete — v0.2.21 rerun complete. See: results/raw/B7-episodic-v0221-session-a.md, results/raw/B7-episodic-v0221-iranti-arm.md, results/raw/B7-episodic-v0221-baseline-arm.md
**Redesign note:** v0.2.16 produced null differential due to arm confound (KB + in-context access simultaneous during probe) and sub-stress scale (5,500 tokens). v0.2.21 protocol uses context-clear design: Iranti arm answers probes in a fresh session with no transcript in context (KB only). See B7-redesign-v0221.md Part 4 for full protocol.


> **Program context:** For the canonical current benchmark state, start with [`articles/CURRENT-BENCHMARK-STATE.md`](../../articles/CURRENT-BENCHMARK-STATE.md) and [`papers/CURRENT-BENCHMARK-STATE-TECHNICAL.md`](../../papers/CURRENT-BENCHMARK-STATE-TECHNICAL.md). This family document should be read as one track within that broader current-state record.

---

## 1. What This Benchmark Measures

Whether Iranti enables more reliable recall of specific facts stated during a long multi-turn conversation, compared to relying on the LLM's in-context window.

The core use case: an agent operating in a long work session hears facts mentioned at various points in the conversation. Without persistent memory, those facts live only in the context window and are vulnerable to decay, interference, and truncation. With Iranti, an agent can write facts to the KB as they are stated and retrieve them with exact-match precision at any later point.

This benchmark tests:
- **Recall precision**: Can the system retrieve exact values (numbers, dates, names) stated in conversation?
- **Position effects**: Are facts stated early in conversation recalled as reliably as late facts?
- **Interference resistance**: Are facts buried in dense discussion recalled as well as foregrounded facts?
- **Iranti vs. context**: What is the accuracy differential between iranti_query exact lookup vs. context-reading?

---

## 2. Task Design

A 51-turn simulated research planning meeting transcript containing 12 embedded facts. Facts include:
- Dates (data license signed, freeze date, demo date, deployment deadline, phase 1 start)
- Numbers (parameter count, GPU hours, holdout set size, ROUGE-L threshold, engineering cost)
- Named entities (rollback decision owner)
- Structured values (phase 1 rollout scope: percentage + region)

Facts are distributed across turns 3–50 with varying amounts of intervening discussion. No fact is repeated. Some facts are numerically similar (e.g., April 10, April 12, April 19, April 22 — four distinct dates within 12 days).

**Probe question set (10 of 12 facts tested):**

| Q# | Target Fact | Turn # in Transcript | Position |
|----|-------------|---------------------|----------|
| Q1 | Data license signed date | Turn 3 | Early |
| Q2 | Model parameter count | Turn 8 | Early |
| Q3 | Holdout set size | Turn 17 | Mid |
| Q4 | Option B engineering cost | Turn 22 | Mid |
| Q5 | Checkpoint freeze date | Turn 34 | Mid-late |
| Q6 | Rollback decision owner | Turn 45 | Late |
| Q7 | ROUGE-L threshold | Turn 42 | Late |
| Q8 | Stakeholder demo date | Turn 47 | Late |
| Q9 | Deployment deadline | Turn 49 | Late |
| Q10 | Phase 1 start date | Turn 50 | Late |

---

## 3. Conditions

### 3.1 Context-reading baseline
Agent reads entire transcript (51 turns, ~5,500 tokens), no external tools.
Answers probe questions from context memory only.

### 3.2 Iranti-assisted arm
During simulated conversation, agent writes each fact to KB as stated (using iranti_write with entity=project/b7_model_launch). At end of conversation, answers probe questions via iranti_query exact lookup.

---

## 4. Results

### v0.2.16 Results (confounded — arm confound present; see redesign note)

| Arm | Score |
|-----|-------|
| Context-reading baseline | [see B7-baseline-trial.md] |
| Iranti arm | 10/10 (100%) |

### v0.2.21 Results (Candidate A context-clear design — arm confound removed)

| Arm | Score | Protocol |
|-----|-------|----------|
| Iranti arm (Session B — cold KB retrieval) | 10/10 (100%) | iranti_query only, no transcript in context; see B7-episodic-v0221-iranti-arm.md |
| Context-reading baseline (Session C — transcript re-read) | 10/10 (100%) | transcript re-read, no Iranti tools; see B7-episodic-v0221-baseline-arm.md |

**Differential: 0 (10/10 vs. 10/10)**

Write completeness (Session A): 12/12 facts written to entity project/b7_clear_v0221; all action="created".
Query success rate (Session B): 10/10 found=true; 0 contested; 0 fromArchive.

**Interpretation (per B7-redesign-v0221.md Section 4.7):** Both mechanisms (KB retrieval and context re-read) achieved perfect recall at this scale. KB retrieval functions as a complete substitute for in-context access on a 5,500-token synthetic transcript. This confirms correct KB write-and-retrieve operation. The null differential is expected and informative, not a failure. This test does not address the scale regime where context-window recall degrades (50k+ tokens).

---

## 5. Key Design Choices

- Transcript is ~5,500 tokens — well within Claude's context window. This means the baseline is expected to perform well. The benchmark establishes the pattern at moderate scale; longer conversations would be needed to observe degradation.
- Facts include "similar distractor" dates (four April dates within a 12-day window) to test precision recall vs. fuzzy recall.
- The Iranti arm uses a single entity (project/b7_model_launch) with semantically named keys — a realistic usage pattern.

---

## 6. Threats to Validity

1. **Transcript is synthetic** — generated for this benchmark; does not reflect real conversation distributions
2. **Moderate length** — 5,500 tokens; baseline LLMs with large context windows are not expected to struggle at this scale
3. **Self-evaluation bias** — same model generated transcript and evaluated baseline recall
4. **No positional degradation test** — would require much longer transcripts (50k–200k tokens) to observe context position effects
5. **Iranti write occurs synchronously** — assumes an agent that diligently writes every fact; real agents may miss facts

---

## 7. Citations

Packer, C., et al. (2023). MemGPT: Towards LLMs as Operating Systems. arXiv:2310.08560.
Wang, W., et al. (2023). LONGMEM: Enabling LLMs to Work With Ultra Long Context via Self-Guided Memory Retrieval. arXiv:2306.07174.
