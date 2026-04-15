# Benchmark B2: Cross-Session Memory Persistence

**Family:** Persistent memory capability / write-then-retrieve validation
**Inspired by:** External-memory requirements for stateless LLM systems; multi-agent continuity
**Executed:** 2026-03-21
**Status:** Complete - v0.2.16 full-protocol rerun recorded


> **Program context:** For the canonical current benchmark state, start with [`articles/CURRENT-BENCHMARK-STATE.md`](../../articles/CURRENT-BENCHMARK-STATE.md) and [`papers/CURRENT-BENCHMARK-STATE-TECHNICAL.md`](../../papers/CURRENT-BENCHMARK-STATE-TECHNICAL.md). This family document should be read as one track within that broader current-state record.

---

## 1. What This Benchmark Measures

Whether Iranti reliably stores structured facts in one session and makes them
retrievable in a later session without in-context carryover.

This benchmark is intentionally narrow. It tests the presence and integrity of
the persistence mechanism, not comparative retrieval quality against another
memory architecture.

The core question is:
> If Session 1 writes facts and Session 2 starts without prior conversation
> context, can Session 2 recover those facts from Iranti alone?

---

## 2. Benchmark Design

### 2.1 Task Definition

An agent learns a small set of structured facts about fictional entities in a
write phase. A later retrieval phase starts with no in-context memory of those
facts and must recover them using `iranti_query`.

### 2.2 Arms

**Baseline arm**
- Session 1 facts are only present in conversation context
- Session 2 starts fresh with no context and no Iranti
- Expected recall is 0% by definition because no persistence mechanism exists

**Iranti arm**
- Session 1 facts are written with `iranti_write`
- Session 2 starts with no context carryover
- Retrieval uses `iranti_query(entity, key)` only
- Expected result is high recall if the persistence mechanism works

### 2.3 Metrics

- Write success rate
- Retrieval accuracy
- Recall
- Entity disambiguation accuracy
- Cross-session persistence evidence

---

## 3. Dataset

The benchmark dataset is defined in [dataset.md](dataset.md).

Current executed shape:
- 5 fictional researcher entities
- 4 facts per entity
- 20 total facts

Fact types:
- `affiliation`
- `publication_count`
- `previous_employer`
- `research_focus`

---

## 4. Protocol

### Session 1: Write phase

- Write all 20 facts with `source=b2_benchmark_ingest`
- Use `confidence=95`
- Confirm write success for every fact

### Session 2: Retrieval phase

- Start retrieval without prior conversational context of the write phase
- Query each entity/key pair via `iranti_query`
- Compare returned values to ground truth

### Additional cross-session evidence

The executed benchmark also used prior-session evidence from B1:
- facts written in an earlier session remained retrievable in the current
  session

This is important because the main B2 protocol was operationally separated but
not fully isolated into separate terminal invocations.

---

## 5. Key Findings

From the executed record:
- 20/20 writes succeeded
- 20/20 retrievals were correct
- no entity contamination observed
- no hallucinated values observed
- provenance metadata remained intact

Published verdict:
- **CONFIRMED (20/20)** on `0.2.16`

See:
- `results/raw/B2-cross-session.md`
- `results/raw/B2-cross-session-rerun-v0216.md`
- `papers/B2-cross-session-paper.md`

---

## 6. Interpretation Boundaries

This track supports these claims:
- Iranti's basic write-then-retrieve persistence mechanism works
- facts survive beyond the writing interaction and remain retrievable

This track does **not** by itself support these stronger claims:
- superiority over other viable memory architectures
- large-scale persistence reliability
- distributed durability guarantees
- long-delay persistence guarantees
- true blind cross-process recovery without stronger isolation protocol

---

## 7. Threats to Validity

1. The baseline arm is definitional, not empirical.
2. The main write and retrieval phases were not fully isolated into separate
   process invocations.
3. The dataset is synthetic.
4. The scale is small.
5. The benchmark uses a single local instance.

---

## 8. Current Program Status

This benchmark family now exists as a standalone benchmark definition because
the published record depended on it, but the folder was missing from
`benchmarks/`.

Current resume-program interpretation:
- historical result stands as a `0.2.16` capability confirmation
- current-version proof on installed `0.2.35` is stale enough that a rerun is
  justified later, but it is not the first rerun priority

---

## 9. v0.2.37 Installed-Product Rerun Results

Executed on 2026-03-26 against a clean disposable installed-product instance:
- instance: `bench_b4_v0236`
- product version: `0.2.37`
- base URL: `http://localhost:3511`
- process boundary: writer and reader ran as separate `powershell.exe`
  processes against the same installed Iranti runtime
- dataset namespace prefix: `b2_v0237r1_`

This rerun closes the main historical methodological weakness in B2: the
current-version proof now uses a true process-isolated writer/reader split
rather than relying on same-session simulation plus borrowed evidence from B1.

### 9.1 Write Phase

- writes attempted: `20`
- writes succeeded: `20/20`
- write latency:
  - min: `24.095 ms`
  - median: `29.529 ms`
  - mean: `36.053 ms`
  - max: `133.402 ms`

### 9.2 Read Phase

- cold reads attempted: `20`
- correct reads: `20/20`
- correctness criteria:
  - row found
  - exact value matched
  - source matched `b2_benchmark_ingest_v0237`
- read latency:
  - min: `9.970 ms`
  - median: `13.700 ms`
  - mean: `19.900 ms`
  - max: `132.220 ms`

### 9.3 Current Verdict

On installed `0.2.37`, B2 is now refreshed as a real cross-session /
cross-process persistence proof:
- persistence mechanism: confirmed
- retrieval integrity: confirmed
- source provenance across the process boundary: confirmed
- contamination in the clean namespace: none observed

This supports the bounded claim that Iranti preserves addressed facts across
independent client invocations on the same runtime.

It still does **not** by itself prove:
- long-delay durability
- distributed guarantees
- large-scale persistence behavior
- superiority over other external-memory systems

See:
- `results/raw/B2-v0237r1-execution.json`
