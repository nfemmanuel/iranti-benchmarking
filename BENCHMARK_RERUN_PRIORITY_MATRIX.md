# Benchmark Rerun Priority Matrix

## Current Product State Under Consideration
- installed CLI currently present on this machine: `0.2.39`
- refreshed rerun wave completed against disposable benchmark runtime instance: `0.2.35`
- current `B4`, `B9`, `B8`, and `B2` reruns completed against disposable benchmark runtime instance: `0.2.37`
- published benchmark record still under review: `0.2.16` (v6.0 sign-off corpus)

## Status Matrix

| Family | Published core claim | Current status after reruns | Why | Next action |
|---|---|---|---|---|
| B1 | Exact `iranti_query` retrieval shows a categorical advantage once haystack size exceeds context-window feasibility | refreshed | installed `0.2.39` full comparison rerun scored baseline `10/10` and Iranti `10/10`; the old null-accuracy-differential conclusion still stands while the efficiency differential remains large | leave standing as refreshed `0.2.39` result |
| B2 | Facts persist across sessions | refreshed | installed `0.2.37` rerun scored `20/20` with true process-isolated writer/reader separation | leave standing as refreshed `0.2.37` result |
| B3 | Deterministic conflict resolution works; LLM arbitration path times out | refreshed, needs narrowed wording | deterministic behavior still good; close-gap case escalated instead of timing out | leave standing with narrowed wording |
| B4 | Named-attribute search works; semantic paraphrase discovery does not | refreshed, needs narrowed wording | current `0.2.37` rerun achieved `4/4` search-based discovery and `4/4` cold top-5 discovery, but search ranking ambiguity remains | leave standing with narrowed wording |
| B5 | Deterministic update behavior works; small-gap cross-source updates fail in the same timeout zone as B3 | refreshed, needs narrowed wording | deterministic behavior still good; ambiguous updates now escalate | leave standing with narrowed wording |
| B6 | `iranti_ingest` works under a real provider | refreshed | clean ingest rerun scored `6/6`; contamination claim weakened further | leave standing as refreshed `0.2.35` result |
| B7 | No differential at ~5.5k tokens | still defensible | bounded null result with low immediate product leverage | leave standing for now |
| B8 | Shared-KB coordination works and preserves attribution | refreshed, needs narrowed wording | exact retrieval and attribution still hold on `0.2.37`, but search is vector-led and over-broad rather than a clean discovery primitive | leave standing with narrowed wording |
| B9 | Relationship graph is usable end-to-end for write/read/traversal | refreshed | installed `0.2.37` rerun confirmed write/read/traversal; search-index limitation still stands | leave standing as refreshed `0.2.37` result |
| B10 | Provenance tracking distinguishes multiple contributing agentIds on a shared entity | still defensible | narrow mechanistic claim, low drift risk | leave standing for now |
| B11 | Observe/attend context recovery works materially better and prior defects were corrected | refreshed, split verdict | observe improved materially; attend still broken | leave standing with narrowed wording |
| B12 | Explicit query yields full interrupted-session recovery; observe is partial; handshake is initialization-only | refreshed, needs oracle caveat | explicit query still `8/8`; handshake/attend still weak; observe still partial | leave standing with explicit oracle caveat |
| B13 | Facts and MCP/API surface remained stable across version upgrades | refreshed | published-surface continuity chain passed across `0.2.35 -> 0.2.36 -> 0.2.37 -> 0.2.38`; handshake surface remained stable | leave standing as refreshed cross-version result |

## Remaining Rerun Order

### Tier 3 - leave standing for now
1. `B7`
2. `B10`

## Families That Now Need Wording Changes More Than New Execution
- `B3`
- `B4`
- `B5`
- `B8`
- `B11`
- `B12`
- `B9`

## Recommendation On New Benchmark Family Work
Do not add a new benchmark family now.

There is no immediate rerun obligation left for the current-family program. Widen the benchmark surface only if a new product-proof gap emerges that is not covered by the refreshed B1-B13 family set.
