# Benchmark Program Resume Plan

## Scope
Resume the actual benchmark program from its published v6.0 state without launching a reflex full rerun.

This pass answers one question:

> What is the minimum honest next benchmark step for the real program on the currently installed Iranti surface?

This resume step began as a planning/classification pass and then continued into targeted current-family reruns. It inventories the program, classifies the current published claim surface, measures version drift risk, sets the rerun order, and records the executed continuation work.

## Ownership
- Lead: Codex
- Repositories reviewed:
  - `C:\Users\NF\Documents\Projects\iranti-benchmarking`
  - `C:\Users\NF\Documents\Projects\iranti` (read-only context only, not benchmark target)

## Product Under Consideration
- Installed CLI version at initial resume capture: `0.2.35`
- Installed CLI version during current continuation closeout: `0.2.39`
- Verification:
  - `C:\Users\NF\AppData\Roaming\npm\iranti.cmd --version`
  - `C:\Users\NF\AppData\Roaming\npm\iranti.cmd status --root C:\Users\NF\.iranti-runtime --json`
- Installed runtime under consideration:
  - runtime root: `C:\Users\NF\.iranti-runtime`
  - active instance observed: `iranti_dev`
  - port observed: `3500`

## Published Program State Being Resumed
- Published benchmark record is anchored to Iranti `0.2.16`
- Published sign-off sequence ends at `v6.0`
- Published track family count: `B1-B13`
- Published results are framed as a completed benchmark program, but the repo still carries major reproducibility and claim-strength caveats

## Benchmark Inventory
Implemented benchmark definition files now exist for:
- `B1`
- `B2`
- `B3`
- `B4`
- `B5`
- `B6`
- `B7`
- `B8`
- `B9`
- `B10`
- `B11`
- `B12`
- `B13`

Program-map issue resolved in this resume pass:
- `B2` and `B3` were present in the published result record but missing standalone benchmark definitions under `benchmarks/`
- standalone benchmark-family definitions for `B2` and `B3` have now been restored
- this closes the benchmark-inventory continuity defect without creating new benchmark families

## Published Claims Inventory by Family
- `B1`: exact entity/key retrieval shows a categorical advantage only once haystack size exceeds context-window feasibility; null differential at smaller scales
- `B2`: structured facts persist across session boundaries
- `B3`: deterministic conflict-resolution paths work; small-gap cross-source LLM arbitration fails under transaction timeout
- `B4`: named-attribute search works; semantic paraphrase discovery does not
- `B5`: deterministic update behavior works; the same timeout defect blocks close-call cross-source updates
- `B6`: `iranti_ingest` works under a real provider; earlier failures were narrowed/corrected as mock-era artifacts
- `B7`: no advantage at the tested transcript size (~5.5k tokens)
- `B8`: shared-KB coordination works and preserves agent attribution at the tested scale
- `B9`: relationship graph read/write/traversal works on the tested version
- `B10`: provenance tracking distinguishes multiple contributing agentIds on the same shared entity
- `B11`: context recovery improved materially; hinted and named-entity recovery work; earlier defect claims were corrected
- `B12`: explicit query gives full session-state recovery; observe is partial; handshake is initialization-only
- `B13`: stored facts and MCP/API surface remained stable across `0.2.12 -> 0.2.14 -> 0.2.16`

## Claim Status Categories Used In This Pass
- `still defensible`: can still stand as a bounded historical claim without immediate rerun
- `needs rerun`: too version-sensitive or too visible to keep leaning on without fresh current-version evidence
- `needs narrowing`: claim can still stand only if its wording is tightened
- `blocked`: current claim continuation is blocked by missing benchmark definition, missing provenance, or unresolved methodology debt

## Current-Version Drift Principles
A published claim is treated as high-drift if one or more of the following are true:
- it depends on release-sensitive behavior (`search`, `ingest`, `observe`, `attend`, `upgrade`, `session recovery`, `conflict arbitration`)
- it is a flagship public proof claim
- it was already fragile at `0.2.16`
- it sits on benchmark protocols already criticized by the reproducibility/statistical audits
- it references historical version transitions directly

## Current-Version Gate Resolution
The initial readiness probe against the project-bound `iranti_dev` instance was not benchmark-clean:
- exact read routes failed there
- runtime/status truth was noisy there

That did **not** hold for the installed product surface as a whole.

The gate was cleared by moving to a fresh disposable installed-product instance:
- instance: `bench_v0235`
- runtime root: `C:\Users\NF\.iranti-runtime`
- port: `3510`
- database: dedicated pgvector-backed disposable database on `localhost:55436`
- provider: `mock`

Current verified state on the installed product surface:
- exact retrieval arm refresh passed `10/10`
- bounded same-version restart durability passed
- handshake API surface remained stable in the bounded restart run
- later current-version continuation work refreshed:
  - `B4`, `B9`, `B8`, and `B2` on installed `0.2.37`
  - full `B1` public comparison on installed `0.2.39`
  - true `B13` cross-version continuity chain across published `0.2.35 -> 0.2.38`

These are observations against the installed product surface under test, not local-source imports.

## Minimum Honest Next Step
Do not add a new benchmark family now.

The minimum honest next step has now been completed and closed:
1. preserve the existing published record as a historical `0.2.16` program result
2. restore missing `B2` / `B3` benchmark-family definitions
3. verify current-version exact retrieval on installed `0.2.35`
4. verify bounded current-version restart durability / handshake continuity on installed `0.2.35`

The next honest step after the completed gate was to continue the rerun queue with the remaining stale high-value families. That continuation work has now refreshed `B11`, `B12`, `B3`, `B5`, `B6`, `B4`, `B9`, `B8`, `B2`, plus:
- a full `B1` public comparison refresh on installed `0.2.39`
- a true `B13` published-surface cross-version continuity rerun through `0.2.38`

## Immediate Current-Version Priorities
There is no immediate rerun obligation left.

Next work, if any, is publication hygiene rather than execution:
1. narrow wording for tracks whose refreshed behavior changed materially (`B3`, `B4`, `B5`, `B8`, `B11`, `B12`)
2. decide whether any new family is needed only after that wording cleanup

## Why No New Family Now
Because the current-family published claims are still anchored to `0.2.16`, and several of the most visible ones are version-sensitive. New-family work before rerunning current-family high-value claims would create a stronger backlog but a weaker honest public record.

## Known Methodology Risks That Carry Into Resume Work
- self-evaluation and circular ground truth across older tracks
- mixed KB-state history across many prior runs
- weak or definitional baselines in several families
- missing or thin raw logs on some tracks
- historical claims published at low `n` or as existence proofs only

## Success Condition For The Resume Step
A maintainer should be able to continue the program without guessing:
- which published claims are still usable as bounded historical claims
- which claims are too stale to keep leaning on
- which reruns should happen first on the current installed product surface
- why no new benchmark family should be added yet

---

## Wave1 rerun status

Completed on 2026-03-26 against disposable benchmark runtime `bench_v0235` (runtime `0.2.35`):
- `B11`
- `B12`
- `B3`
- `B5`
- `B6`

Completed on 2026-03-26 against disposable benchmark runtime `bench_b4_v0236` (runtime `0.2.37`):
- `B4`
- `B9`
- `B8`
- `B2`
- `B1` exact retrieval arm refresh only
- `B13` bounded same-version restart durability refresh only

Completed on 2026-03-26 against current installed CLI/runtime surfaces:
- `B13` true published-surface cross-version continuity rerun across `0.2.35 -> 0.2.38`
- `B1` full public comparison refresh on installed `0.2.39`

Remaining program continuation after this refreshed wave:
- no mandatory reruns
- optional future work is publication-driven or new-family-driven, not stale-claim-driven

