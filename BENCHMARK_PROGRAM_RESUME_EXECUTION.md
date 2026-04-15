# Benchmark Program Resume Execution

## Scope Completed In This Pass
This pass moved beyond planning and executed the first substantive rerun wave after the original exact-retrieval / bounded-durability gate-clearance work.

Completed current-family reruns:
- `B11` context recovery
- `B12` session recovery
- `B3` conflict resolution
- `B5` knowledge update
- `B6` ingest pipeline
- `B4` multi-hop entity discovery
- `B9` entity relationships
- `B8` agent coordination
- `B2` cross-session persistence
- `B1` full public comparison refresh on installed `0.2.39`
- `B13` true cross-version continuity rerun on published `0.2.35 -> 0.2.38`

## Exact Commands Run
```powershell
node scripts\run_wave1_v0235.js
# followed by a harness closeout patch to recompute B6 clean-score from the existing queryAll payload
iranti setup --defaults --root C:\Users\NF\.iranti-runtime --mode isolated --instance bench_b4_v0236 --port 3511 --db-mode managed --db-url "postgresql://postgres:053435@localhost:55436/iranti_bench_b4_v0236_db" --provider mock --api-key "bench_b4_v0236_nf.66889b25030249e0b99040af33fadbf9" --bootstrap-db
powershell -NoProfile -ExecutionPolicy Bypass -File scripts\run_b4_v0236.ps1
Start-Process -FilePath C:\Users\NF\AppData\Roaming\npm\iranti.cmd -ArgumentList @('run','--instance','bench_b4_v0236','--root','C:\Users\NF\.iranti-runtime') -WorkingDirectory C:\Users\NF\Documents\Projects\iranti-benchmarking -WindowStyle Hidden
psql -h localhost -p 55436 -U postgres -d postgres -c "CREATE DATABASE iranti_bench_b4_v0236_db;"
iranti setup --defaults --root C:\Users\NF\.iranti-runtime --mode isolated --instance bench_b4_v0236 --port 3511 --db-mode managed --db-url "postgresql://postgres:053435@localhost:55436/iranti_bench_b4_v0236_db" --provider mock --api-key "bench_b4_v0236_nf.66889b25030249e0b99040af33fadbf9" --bootstrap-db
powershell -NoProfile -ExecutionPolicy Bypass -File scripts\run_b9_v0237.ps1
powershell -NoProfile -ExecutionPolicy Bypass -File scripts\run_b8_v0237.ps1 -Entity project/b8_coordination_v0237r1 -AlphaOutput results/raw/B8-v0237r1-alpha.json -BetaOutput results/raw/B8-v0237r1-beta.json -OutputPath results/raw/B8-v0237r1-execution.json
powershell -NoProfile -ExecutionPolicy Bypass -File scripts\run_b2_v0237.ps1 -Prefix b2_v0237r1 -WriterOutput results/raw/B2-v0237r1-writer.json -ReaderOutput results/raw/B2-v0237r1-reader.json -OutputPath results/raw/B2-v0237r1-execution.json
powershell -NoProfile -ExecutionPolicy Bypass -File scripts\run_b1_b13_v0237.ps1
node scripts\run_b13_cross_version_v0238.js
node scripts\run_b1_full_v0239.js
```

## Environment Details
- benchmarking repo: `C:\Users\NF\Documents\Projects\iranti-benchmarking`
- installed CLI currently observed during final closeout: `0.2.39`
- disposable benchmark instance used for wave1: `bench_v0235`
- runtime under test for wave1: `0.2.35`
- base URL for wave1: `http://localhost:3510`
- disposable benchmark instance used for current-version reruns: `bench_b4_v0236`
- runtime under test for B4/B9/B8: `0.2.37`
- base URL for B4/B9/B8: `http://localhost:3511`
- runtime root: `C:\Users\NF\.iranti-runtime`
- provider on `bench_b4_v0236`: `mock`
- database target for `bench_b4_v0236`: dedicated pgvector-backed disposable database on `localhost:55436`

## Raw Artifacts Produced
- `results/raw/B11-context-recovery-v0235-trial.md`
- `results/raw/B12-session-recovery-v0235.md`
- `results/raw/B3-conflict-rerun-v0235.md`
- `results/raw/B5-knowledge-update-v0235-trial.md`
- `results/raw/B6-ingest-rerun-v0235.md`
- `results/raw/wave1-v0235-execution.json`
- `results/raw/B4-v0236-execution.json`
- `results/raw/B9-v0237-execution.json`
- `results/raw/B8-v0237r1-execution.json`
- `results/raw/B2-v0237r1-execution.json`
- `results/raw/B1-B13-v0237-execution.json`
- `results/raw/B1-iranti-arm-v0237-trial.md`
- `results/raw/B13-upgrade-v0237-trial.md`
- `results/raw/B13-cross-version-v0238-execution.json`
- `results/raw/B13-cross-version-v0238-trial.md`
- `results/raw/B1-full-v0239-execution.json`
- `results/raw/B1-full-v0239-trial.md`

## High-Value Findings

### B11
- observe with entity hint: `5/6`
- observe cold: `5/6`
- attend natural: `0/6`
- attend forceInject: `5/6`
- interpretation: cold observe improved materially through alias fallback; attend still broken

### B12
- explicit query oracle: `8/8`
- handshake: `0` working-memory facts
- observe with hint: `5/8`
- observe cold: `0/8`
- attend with hint: `0/8`
- interpretation: durability remains real; handshake and attend are still not general recovery mechanisms

### B3
- deterministic cases behaved correctly
- the close-gap LLM-zone case did not time out
- instead it escalated and left no active truth row
- interpretation: the old timeout claim is too strong for the current runtime

### B5
- deterministic cases remained stable
- ambiguous cross-source cases now escalated and left no active truth row
- interpretation: current update semantics are more conservative than the older rerun record suggested

### B6
- clean ingest scored `6/6` after fixing the harness scorer
- the pre-populated trial wrote `13/13` candidate facts with no rejects or escalations
- interpretation: the current rerun supports the corrected ingest story, not the old contamination-first story

### B4
- oracle retrieval remained `4/4`
- search-based discovery scored `4/4`
- cold natural-language discovery also scored `4/4`
- vector scores were non-zero across all successful search paths
- interpretation: the old `1/4` and `2/4` search-based discovery story is no longer current on a clean `0.2.37` pgvector-backed instance; the remaining limitation is rank ambiguity in shared-affiliation cases, not outright non-discovery

### B9
- relationship writes succeeded `4/4`
- one-hop retrieval returned the full expected edge set for the anchor entity
- depth-2 traversal surfaced the expected second-hop citation edge
- plain lexical and natural-language search returned facts, not relationship edges
- interpretation: the relationship subsystem is confirmed as a functional write/read/traversal surface on installed `0.2.37`; the remaining limitation is still search-index separation, not graph unreadability

### B8
- exact cross-process addressed retrieval remained `6/6`
- source attribution via query remained `6/6`
- `whoKnows` also confirmed the writing agent with `6` contributions
- all four prescribed discovery queries surfaced the target entity, but only `1/4` target hits had positive lexical support
- interpretation: the old sparse-discovery story no longer holds on `0.2.37`; search is now better described as vector-led and over-broad rather than cleanly precise

### B2
- true process-isolated write/read rerun scored `20/20`
- the writer and reader ran as separate `powershell.exe` processes against installed `0.2.37`
- exact values and `source` provenance both held across the boundary
- interpretation: the old methodological weakness in B2 is now closed; the persistence claim is refreshed as a real current-version cross-session proof

### B1
- full current public comparison refresh on installed `0.2.39`
- baseline long-context arm scored `10/10` on the blind `N=2000` haystack
- clean installed-product exact retrieval arm also scored `10/10`
- baseline response took about `5191 ms`; Iranti exact-query batch took about `158 ms`
- interpretation: the old null accuracy differential still stands, and the efficiency differential remains large on the current installed product surface

### B13
- true published-surface continuity chain across `0.2.35 -> 0.2.36 -> 0.2.37 -> 0.2.38` passed
- cumulative readback by stage: `3/3`, `6/6`, `9/9`, `12/12`
- handshake API surface remained present at each version
- interpretation: the program now has a fresh cross-version durability chain, not merely same-version restart durability

## Interpretation Boundaries
- `B11/B12/B3/B5/B6` were refreshed through runtime `0.2.35`
- `B4/B9/B8/B2` were refreshed through runtime `0.2.37`
- `B1` is now refreshed as a full public comparison through installed `0.2.39`
- `B13` is now refreshed as a published-surface cross-version continuity chain through `0.2.38`

## What This Pass Changed Programmatically
Before the final closeout, the resume docs still treated `B1` and `B13` as the last remaining high-visibility reruns.
After the final closeout:
- `B11`, `B12`, `B3`, `B5`, and `B6` are refreshed at the `0.2.35` runtime layer
- `B4`, `B9`, `B8`, and `B2` are refreshed on a clean `0.2.37` runtime layer
- `B1` is refreshed as a full public comparison on installed `0.2.39`
- `B13` is refreshed as a published-surface cross-version chain through `0.2.38`
- there is no immediate rerun obligation left
