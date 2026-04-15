# Current Benchmark State (Technical)

**Audience:** Maintainers, reviewers, and technical readers who need the exact current claim boundaries.

## Purpose

This document is the technical companion to:
- [articles/CURRENT-BENCHMARK-STATE.md](C:\Users\NF\Documents\Projects\iranti-benchmarking\articles\CURRENT-BENCHMARK-STATE.md)

It exists so that readers do not have to reconstruct the current benchmark state from:
- historical `0.2.16` publications
- rerun artifacts
- benchmark-family addenda
- resume-program notes

## Program Split

The repo now has two distinct evidence layers:

1. **Historical public record**
- centered on `0.2.16`
- published in `results/published/`
- still valid as a bounded historical corpus

2. **Refreshed current-family evidence**
- generated in the rerun wave closed on `2026-03-26`
- spread across rerun artifacts and updated benchmark-family docs
- should be used for current-version claim discipline

## Refreshed Coverage By Runtime Version

### Refreshed through runtime `0.2.35`
- `B11`
- `B12`
- `B3`
- `B5`
- `B6`

### Refreshed through runtime `0.2.37`
- `B4`
- `B9`
- `B8`
- `B2`

### Refreshed through public npm `0.2.49 -> 0.2.50 -> 0.2.51` plus installed local `0.2.52`
- `B13` cross-version continuity chain

### Refreshed through installed local `0.2.52`
- `B1` exact-retrieval arm

## Current Defensible Claim Inventory

### B1
- still supports a positive current installed-local exact-retrieval result (`10/10`)
- does **not** currently support a freshly rerun end-to-end public comparison because the long-context Anthropic baseline was blocked by insufficient credits on `2026-04-02`
- should be cited as refreshed on installed local `0.2.52` for the Iranti arm only

### B2
- now has true process-isolated writer/reader evidence
- should be cited as bounded current-version evidence for local cross-session persistence

### B3
- deterministic conflict logic remains positive
- ambiguous close-gap behavior should be cited as conservative and escalation-prone
- should **not** be cited as current proof of broadly successful close-gap LLM arbitration
- should **not** be cited with the old timeout-heavy story as the current headline

### B4
- should be cited as bounded top-5 entity discovery under synthetic conditions
- should **not** be cited as a general multi-hop reasoning win
- should **not** be cited as a top-1 ranking result

### B5
- deterministic update semantics remain positive
- ambiguous cross-source updates now read as escalation-prone
- should **not** be cited as current proof of simple incumbent-preserving rejection
- should **not** lean on the older “established source bias” framing as the current headline

### B6
- clean ingest remains positive on the controlled rerun
- the earlier contamination-heavy reading is weaker

### B8
- exact shared-KB addressed retrieval and attribution across isolated client processes remain positive
- discovery/search now needs narrower wording
- should be described as vector-led and over-broad, not precise

### B9
- relationship write/read/traversal remains positive
- fact search still does not surface relationship edges

### B11
- `observe` is materially positive again
- natural `attend` remains negative
- should **not** be cited as general autonomous context recovery

### B12
- durability remains positive
- explicit query recovery remains positive
- automatic interrupted-session recovery remains weak
- should **not** be cited as general autonomous session restoration

### B13
- now has a refreshed continuity chain across public npm `0.2.49 -> 0.2.50 -> 0.2.51` plus an installed local `0.2.52` hop
- should be cited as cross-version continuity evidence, not as proof of every possible upgrade path

## What Still Stands Historically Without Current Refresh

- `B7` remains a bounded historical null result
- `B10` remains a bounded historical provenance result

These do not currently require urgent rerun to keep the program honest.

## What Was Narrowed

The rerun wave required explicit narrowing in:
- `B3`
- `B4`
- `B5`
- `B8`
- `B11`
- `B12`

The benchmark-family docs and public/article surfaces now carry those narrowing notes.

## What Should Be Read As Historical Only

The following remain important but should not be treated as standalone current-version proof:
- [BENCHMARK-FINAL.md](C:\Users\NF\Documents\Projects\iranti-benchmarking\results\published\BENCHMARK-FINAL.md)
- [BENCHMARK-SUMMARY-TABLE.md](C:\Users\NF\Documents\Projects\iranti-benchmarking\results\published\BENCHMARK-SUMMARY-TABLE.md)

They are the bounded `0.2.16` closeout record.

## Current Program Recommendation

- no new benchmark family should be added yet
- the next honest rerun is the `B1` long-context baseline arm once Anthropic credits are available again
- if stronger recovery claims are needed, rerun `B11` and `B12` on a current-version surface rather than stretching older bounded results

## Canonical Reading Order

1. [articles/CURRENT-BENCHMARK-STATE.md](C:\Users\NF\Documents\Projects\iranti-benchmarking\articles\CURRENT-BENCHMARK-STATE.md)
2. [BENCHMARK_PROGRAM_RESUME_RECOMMENDATION.md](C:\Users\NF\Documents\Projects\iranti-benchmarking\BENCHMARK_PROGRAM_RESUME_RECOMMENDATION.md)
3. relevant benchmark-family docs under `benchmarks/`
4. historical published record under `results/published/`
