# Current Benchmark State (Short)

This is the shortest honest version of the benchmark program state.

## What currently stands

- **Exact retrieval remains strong.** The current `B1` rerun confirms the Iranti exact-retrieval arm still scores `10/10` on an installed local `0.2.52` surface. The fresh long-context baseline arm is currently blocked by insufficient Anthropic credits, so the comparison is only partially refreshed.
- **Persistence is real.** `B2` now has process-isolated writer/reader evidence on current installed-product rerun coverage.
- **Upgrade durability is real.** `B13` now has a fresh continuity chain across public npm `0.2.49 -> 0.2.50 -> 0.2.51` plus a final installed local `0.2.52` hop.
- **Relationships work.** `B9` confirms relationship write/read/traversal on refreshed current-version evidence.

## What stands, but only with narrower wording

- **Conflict resolution (`B3`)**: deterministic conflict logic works; ambiguous close-gap conflicts are conservative and escalation-prone.
- **Entity discovery (`B4`)**: the refreshed result is a bounded top-5 discovery result under synthetic conditions, not a general multi-hop reasoning claim.
- **Knowledge updates (`B5`)**: deterministic update semantics work; ambiguous cross-source updates are conservative and escalation-prone.
- **Agent coordination (`B8`)**: exact addressed retrieval and provenance still work; discovery/search is vector-led and over-broad.
- **Context recovery (`B11`)**: `observe` improved materially; natural `attend` is still not a positive result.
- **Session recovery (`B12`)**: durability and explicit recovery work; automatic interrupted-session recovery remains weak.

## What not to say

Do **not** use the current benchmark record to claim:
- general multi-hop reasoning superiority
- production-ready close-gap LLM arbitration
- clean incumbent-preserving ambiguous update behavior
- precise general-purpose discovery for multi-agent coordination
- general autonomous context recovery
- general autonomous interrupted-session recovery

## What to read next

- public current-state summary: [CURRENT-BENCHMARK-STATE.md](C:\Users\NF\Documents\Projects\iranti-benchmarking\articles\CURRENT-BENCHMARK-STATE.md)
- technical current-state summary: [CURRENT-BENCHMARK-STATE-TECHNICAL.md](C:\Users\NF\Documents\Projects\iranti-benchmarking\papers\CURRENT-BENCHMARK-STATE-TECHNICAL.md)
- historical public record: [BENCHMARK-FINAL.md](C:\Users\NF\Documents\Projects\iranti-benchmarking\results\published\BENCHMARK-FINAL.md)
