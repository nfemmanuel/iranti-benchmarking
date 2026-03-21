# Research Program Kickoff

**Date:** 2026-03-20
**Author:** Research Program Manager (`research_program_manager`)
**Status:** Active — Phase 2 (Benchmark Discovery) complete, Phase 3–4 executing

---

## 1. Program State Summary

### Repository State

The benchmarking repo was fully scaffolded prior to this session:
- Research charter, roadmap, backlog, and publication plan are complete
- 8 specialist agent definitions exist in `.claude/agents/`
- Zero benchmarks had been executed
- `benchmarks/`, `results/`, `papers/`, `articles/` folders exist but are empty

**This session initiates Phase 2 → Phase 4 execution for Benchmark B1.**

### Iranti Instance State

Iranti was verified running during this session:
- `iranti_query` and `iranti_search`: **OPERATIONAL**
- `iranti_write`, `iranti_handshake`, `iranti_ingest`: **FAILING**
  - Error: "Too many database connections opened: sorry, too many clients already"
  - Root cause: PostgreSQL connection pool exhaustion in the running Iranti instance
  - This is a pre-existing infrastructure condition, not a benchmark failure

**Infrastructure implication for benchmark execution:**
- Iranti retrieval arm (query/search): can run fully
- Iranti write arm (testing ingestion before retrieval): blocked
- The write arm must be deferred until the connection pool issue is resolved
- The `Iranti run --instance local` postgres connection pool limit needs investigation

### Existing KB Data Available for Benchmarking

The following entities were found in the Iranti KB from prior control-plane integration work:

| Entity | Key | Value |
|--------|-----|-------|
| `ticket/cp_t010` | `affiliation` | Carnegie Mellon University |
| `ticket/cp_t010` | `publication_count` | 31 papers |
| `ticket/cp_t010` | `previous_employer` | Google DeepMind (2019–2022) |
| `ticket/cp_t010` | `research_focus` | reinforcement learning (primary), robotics (secondary) |
| `ticket/cp_t011` | `affiliation` | Carnegie Mellon University |
| `ticket/cp_t011` | `publication_count` | 31 papers |
| `ticket/cp_t011` | `previous_employer` | Google DeepMind (2019–2022) |
| `ticket/cp_t011` | `research_focus` | reinforcement learning (primary), robotics (secondary) |

Note: `ticket/cp_t010` and `ticket/cp_t011` are test entities from CP-T010/T011 integration work. They represent researcher-like entities with identical fact values. These will serve as the Iranti arm retrieval targets for B1.

---

## 2. Cross-Repo Alignment Findings

### Iranti Main Repo

**Core product (relevant to benchmark design):**
- Flat key-value KB with entity relationships (PostgreSQL, Prisma)
- Per-agent Attendant instances — persistent working memory per agent
- Conflict resolution: weighted confidence → LLM reasoning → human escalation
- Source reliability tracking (0.1–1.0 score, decay toward 0.5)
- AGPL-3.0 license; free self-hosting; hosted services must stay open

**Benchmark-relevant properties confirmed:**
1. Exact entity/key retrieval (`iranti_query`) — O(1) lookup, deterministic
2. Semantic search (`iranti_search`) — hybrid lexical + vector
3. Cross-session persistence — Attendant state survives restarts via KB
4. Conflict detection on write — triggers resolution or escalation
5. Source reliability learning — trusted sources win more conflicts over time

**Internal validation already exists** (Iranti has tests in its own repo). This benchmark program provides *external* validation using *recognized benchmark families* — the goal stated in the research charter.

### Iranti Site Repo

The site PRD specifies a **Proof page** that requires:
- Retrieval validation highlights
- Conflict benchmark framing
- Consistency validation highlights
- Explicit honesty about benchmark scope and limitations
- Technically defensible claims

**Alignment requirement:** Every public article produced by this program feeds the site Proof page. Benchmark claims must be precise enough for the site team to use without modification. The site backlog includes "define benchmark/proof framing" as an open item — this program's output is the upstream source.

### Iranti Control Plane Repo

- Currently in Phase 0 (foundation specs)
- Phase 1 blocked on Phase 0 completion
- No overlap with benchmark program work
- Future alignment point: control plane Phase 2 includes "Conflict & Escalation Review" UI — benchmark B3 (conflict resolution accuracy) will feed evidence for that surface

---

## 3. Benchmark Family Selection

### Evaluation Criteria Applied

From `docs/research-program.md`:
1. External recognizability
2. Clarity of task definition
3. Practical reproducibility
4. Relevance to memory/retrieval/multi-step/multi-agent properties
5. Ability to define a fair with-Iranti condition

### Family A — Entity Fact Retrieval (NIAH Variant)

**Description:** A variant of the Needle-in-a-Haystack (NIAH) benchmark adapted for structured entity/key retrieval. An LLM must retrieve specific facts about target entities from a document containing many distractor entities and (in adversarial conditions) conflicting wrong facts.

**Why selected:**
- NIAH is one of the most recognized long-context evaluation benchmarks (Greg Kamradt, 2023)
- Directly maps to Iranti's primary retrieval mechanism (exact entity/key lookup)
- Clearly measurable (accuracy, by distractor density)
- Fair comparison: baseline reads from context, Iranti arm uses structured retrieval

**Reproducibility:** High. Synthetic dataset, deterministic questions, exact ground truth.

**Iranti mechanism tested:** `iranti_query` — exact entity/key lookup

**Status:** Selected. **Ticket: BM-T001.**

### Family B — Cross-Session Memory Persistence

**Description:** Tests whether facts learned in a previous session are available in a new session. Baseline condition: new session starts with no context → recall is 0%. Iranti condition: new session uses Attendant state + KB retrieval → facts persist.

**Why selected:**
- This is Iranti's clearest value proposition: memory that survives session boundaries
- Maps directly to MemGPT (Packer et al., 2023) evaluation methodology
- Easily reproducible with any set of stored facts
- Baseline is definitionally 0% when no external memory exists

**Reproducibility:** High. Requires Iranti KB write capability for full execution; partial test possible with existing KB data.

**Iranti mechanism tested:** `iranti_query` for known entities; `iranti_handshake` for Attendant reconvene

**Status:** Selected. **Ticket: BM-T002.** Write arm blocked by connection pool issue.

### Family C — Conflict Resolution Accuracy

**Description:** Tests whether Iranti's conflict resolution system correctly identifies and resolves factual contradictions. Construct a dataset of known "correct" facts and "incorrect" facts with varying confidence deltas. Measure whether the final KB state reflects the correct facts.

**Why selected:**
- Tests a documented Iranti feature (Librarian conflict resolution spec exists)
- Maps to TruthfulQA-style adversarial accuracy testing
- Directly relevant to site proof page: "conflict benchmark framing" is explicitly required
- Confidence-weighted resolution is a novel mechanism worth testing

**Reproducibility:** High with write capability. Currently blocked by write failures.

**Iranti mechanism tested:** Write conflict detection → Librarian resolution → KB state accuracy

**Status:** Selected. **Ticket: BM-T003.** Execution blocked until write capability is restored.

### Family D — Multi-Agent Factual Consistency

**Description:** Multiple agents independently contribute facts about shared entities. A third agent queries the KB. Tests whether shared KB prevents contradiction propagation. Without Iranti, each agent has private context; contradictions compound.

**Why selected:** Maps to emerging multi-agent evaluation literature (agents sharing world state).

**Status:** Deferred to Phase 2. Higher implementation complexity; requires multiple agent instances running simultaneously.

### Rejected Candidates

| Candidate | Rejection Reason |
|-----------|-----------------|
| MMLU | Tests knowledge, not memory infrastructure. No fair Iranti condition. |
| HumanEval | Code generation task. Not relevant to memory system evaluation. |
| SWE-bench | Engineering task. Not relevant to memory retrieval. |
| BIG-Bench Hard | Multi-domain reasoning. No clear Iranti integration point. |
| HELMET (raw) | Long-context QA — partially captured by Family A, but full HELMET replication requires dataset licensing review not yet completed. |

---

## 4. Execution Backlog

### Priority Order

1. **BM-T001**: B1 Entity Retrieval — Execute (in progress this session)
2. **BM-T002**: B2 Cross-Session Persistence — Design complete; execution requires write capability
3. **BM-T003**: B3 Conflict Resolution — Design; execution requires write capability
4. **BM-T004**: Infrastructure resolution — Fix DB connection pool to enable write arm

### Sequencing Notes

B1 can complete with current infrastructure (retrieval only arm + baseline).
B2 and B3 require write capability. The connection pool issue should be diagnosed and resolved before B2/B3 execution.

The formal paper for B1 will be written from this session's results.
The public article for B1 will accompany the formal paper.

---

## 5. Infrastructure Threat to Validity

**Iranti write failures (2026-03-20):**

During this session, all `iranti_write`, `iranti_handshake`, and `iranti_ingest` calls failed with:
> "Too many database connections opened: sorry, too many clients already"

This error indicates PostgreSQL's max_connections limit was reached by the running Iranti instance. This is a pre-existing condition, not induced by the benchmark program.

**Impact on B1:**
- Baseline arm: not affected (Claude reads from context only)
- Iranti retrieval arm: partially affected — can test query/search on existing KB data, but cannot write new test data to validate the full ingest→retrieve cycle

**Required resolution (Ticket BM-T004):**
- Restart the Iranti instance (`iranti run --instance local`)
- Diagnose connection pool configuration (check `DATABASE_URL` pool settings)
- Confirm write operations work before executing B2 and B3

**Documentation obligation:** All B1 results must note this limitation in the threats-to-validity section.

---

## 6. Agent Activation

### Activated This Session

| Agent | Role |
|-------|------|
| `research_program_manager` | Oversight, program design, sign-off |
| `literature_reviewer` | Benchmark family selection (inline, not separately spawned) |
| `benchmark_scientist` | Experimental design (inline) |
| `replication_engineer` | Execution (inline) |
| `statistics_reviewer` | Results analysis (inline) |
| `paper_author` | Paper drafting (inline) |
| `science_communicator` | Public article drafting (inline) |

### Pending Activation

| Agent | When | Reason |
|-------|------|--------|
| `reproducibility_auditor` | Before B1 paper submission | Independent review of methodology |

---

## 7. Research Program Manager Sign-Off

**Benchmark family selection:** Approved — Families A, B, C selected with documented rationale. Family D deferred with justification.

**Benchmark B1 design:** Approved for execution under current infrastructure constraints. Write arm limitation is documented and does not invalidate the retrieval arm test.

**Publication standard:** All B1 outputs must follow `docs/publication-plan.md`. No public claim should appear in the public article that the formal paper cannot support.

**Date:** 2026-03-20
**Signed:** Research Program Manager
