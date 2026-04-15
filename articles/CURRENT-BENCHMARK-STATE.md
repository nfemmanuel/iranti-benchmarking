# Current Benchmark State

**Audience:** Technical generalists, evaluators, and readers who need the shortest honest account of what the benchmark program currently supports.

## Start Here

This is the canonical current-state benchmark summary.

If you only read one benchmark document in this repo, read this one first.

It supersedes the older public v6.0 summary as the first document readers should use when answering:
- what Iranti has actually been benchmarked on
- which results are current enough to lean on
- which old findings are historical only
- what still looks weak

The older public materials under `results/published/` remain valuable as the bounded `0.2.16` historical record.
They should not be read as the full current-version benchmark state without the rerun artifacts and narrowing notes added on `2026-03-26`.

## Current Program State

The benchmark program now has:
- a historical public benchmark corpus centered on `0.2.16`
- refreshed current-family reruns across the most visible and drift-prone tracks
- refreshed current-version exact-retrieval evidence on installed local `0.2.52`
- refreshed current-version cross-version continuity evidence through public npm `0.2.51` plus an installed local `0.2.52` hop

Current installed-product evidence is split honestly by runtime version:
- refreshed evidence for `B11`, `B12`, `B3`, `B5`, `B6` through runtime `0.2.35`
- refreshed evidence for `B4`, `B9`, `B8`, `B2` through runtime `0.2.37`
- refreshed cross-version continuity evidence for `B13` across public npm `0.2.49 -> 0.2.50 -> 0.2.51` plus an installed local `0.2.52` hop
- refreshed `B1` exact-retrieval arm on installed local `0.2.52`; fresh long-context baseline currently blocked by insufficient Anthropic credits

## What Currently Stands

### Strongest current claims

- `B1`: Iranti's exact retrieval arm still scores `10/10` on an installed local `0.2.52` rerun. The fresh baseline comparison is currently blocked by insufficient Anthropic credits, so the current evidence refreshes the Iranti arm but not the public comparison claim end-to-end.
- `B2`: facts persist across independent client invocations on current installed-product rerun evidence.
- `B13`: cross-version continuity now has a fresh chain across public npm `0.2.49 -> 0.2.50 -> 0.2.51` plus an installed local `0.2.52` hop.
- `B9`: relationship writes plus one-hop and deep traversal work on refreshed current-version evidence.

### Current claims that stand with explicit limits

- `B3`: deterministic conflict logic works; ambiguous close-gap conflicts should be described as conservative and escalation-prone.
- `B4`: named-attribute and bounded cold-query discovery work in the refreshed rerun, but only as a bounded top-5 discovery result under synthetic conditions.
- `B5`: deterministic update semantics work; ambiguous cross-source updates are conservative and escalation-prone.
- `B6`: clean ingest remains strong in the controlled rerun.
- `B8`: exact shared-KB addressed retrieval and attribution still work across isolated client processes; search discovery should be described as vector-led and over-broad.
- `B11`: `observe` improved materially; natural `attend` still does not stand as a positive result.
- `B12`: durability and explicit recovery stand; automatic interrupted-session recovery remains partial and weak.

### Historical-only bounded claims that still stand

- `B7`: bounded null result still stands historically.
- `B10`: narrow provenance claim still stands historically.

## What Should Not Be Overclaimed

Do not use the current benchmark record to claim:
- general multi-hop reasoning superiority from `B4`
- production-ready close-gap LLM arbitration from `B3`
- clean incumbent-preserving ambiguous update behavior from `B5`
- precise general-purpose discovery from `B8`
- general autonomous context recovery from `B11`
- general autonomous interrupted-session recovery from `B12`

## What Changed In The Refresh Wave

- `B1`: the current rerun refreshed the installed local exact-retrieval arm on `0.2.52`, but the long-context baseline arm could not be rerun because the Anthropic account on this machine lacked sufficient credits.
- `B3`: the old timeout-heavy close-gap story no longer describes the current rerun; the ambiguous case escalates instead.
- `B4`: the rerun moved from old search-failure framing to bounded top-5 discovery success.
- `B5`: the ambiguous cross-source zone no longer reads as simple rejection with incumbent truth preserved; it now reads as escalation-prone.
- `B8`: the old sparse-discovery story no longer fits; the current limitation is vector-led, over-broad discovery.
- `B11`: cold `observe` materially improved, but natural `attend` still fails.
- `B12`: durability remains strong; automatic recovery remains weak.
- `B13`: the older `0.2.35 -> 0.2.38` continuity chain has now been superseded by a fresher `0.2.49 -> 0.2.50 -> 0.2.51 -> installed 0.2.52` chain.

## Current Recommendation

- treat `results/published/` as the historical public record
- treat the rerun artifacts and benchmark-family docs as the current evidence source
- use this document as the canonical current-state summary
- do not add a new benchmark family yet
- rerun the `B1` baseline arm once Anthropic credits are available again if you need a fresh end-to-end public comparison, not just a refreshed Iranti arm
- target `B11`/`B12` current-version reruns only if you need stronger recovery claims than the existing bounded wording supports

## Read Next

If you need the technical claim boundary details, read:
- [CURRENT-BENCHMARK-STATE-TECHNICAL.md](C:\Users\NF\Documents\Projects\iranti-benchmarking\papers\CURRENT-BENCHMARK-STATE-TECHNICAL.md)

If you need the historical record, read:
- [BENCHMARK-FINAL.md](C:\Users\NF\Documents\Projects\iranti-benchmarking\results\published\BENCHMARK-FINAL.md)
- [BENCHMARK-SUMMARY-TABLE.md](C:\Users\NF\Documents\Projects\iranti-benchmarking\results\published\BENCHMARK-SUMMARY-TABLE.md)

If you need the current rerun rationale, read:
- [BENCHMARK_PROGRAM_RESUME_RECOMMENDATION.md](C:\Users\NF\Documents\Projects\iranti-benchmarking\BENCHMARK_PROGRAM_RESUME_RECOMMENDATION.md)
