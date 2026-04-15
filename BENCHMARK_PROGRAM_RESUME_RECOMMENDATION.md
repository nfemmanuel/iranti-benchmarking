# Benchmark Program Resume Recommendation

## Bottom Line
The benchmark program has now completed the first substantive rerun wave after the original gate-clearing work.

Historical v6.0 results still matter as the bounded `0.2.16` record.
The high-value stale families `B11`, `B12`, `B3`, `B5`, and `B6` have been refreshed on a clean disposable runtime reporting `0.2.35`.
`B4`, `B9`, and `B8` have now also been refreshed on a clean disposable runtime reporting `0.2.37`.
`B2` has now also been refreshed on the same clean `0.2.37` runtime with a true process-isolated writer/reader protocol.
`B1` has now been refreshed as a full public comparison on installed `0.2.39`.
`B13` has now been refreshed as a true published-surface cross-version continuity chain through `0.2.38`.

That means the minimum honest current-family refresh for the persistence track is now complete.
The next honest rerun target is no longer `B2`.

## What The Repo Now Has Proven
As of this pass, the benchmark program has:
- a historical `0.2.16` public benchmark corpus
- bounded gate-clearing evidence on clean installed-product exact retrieval and restart durability
- a refreshed wave for:
  - `B11` context recovery
  - `B12` session recovery
  - `B3` conflict resolution
  - `B5` knowledge update
  - `B6` ingest pipeline
  - `B4` multi-hop entity discovery
  - `B9` entity relationships
  - `B8` agent coordination
  - `B2` cross-session persistence
  - `B1` full public comparison on installed `0.2.39`
  - `B13` true cross-version continuity chain across `0.2.35 -> 0.2.38`

## What The Refreshed Wave Changed

### B11
- cold observe is no longer a `0/6` failure on a clean runtime
- cold observe now returns `5/6` through alias fallback
- natural attend still fails

### B12
- explicit query remains `8/8`
- handshake still returns no task-state facts without checkpoint state
- observe with hint remains partial at `5/8`
- attend remains unusable

### B3
- the old timeout characterization in the close-gap LLM zone did not reproduce
- the ambiguous case now escalates instead

### B5
- deterministic update semantics still hold
- ambiguous cross-source updates now escalate rather than merely rejecting and preserving the old truth

### B6
- clean ingest rerun is `6/6`
- the contamination-heavy reading of the original defect is further weakened

### B4
- oracle retrieval remains `4/4`
- search-based discovery is now `4/4`
- cold natural-language discovery is now `4/4` within the top-5 result set
- the old partial-discovery wording is too stale to keep using unchanged

### B9
- relationship writes are confirmed `4/4`
- one-hop and deep traversal both work on installed `0.2.37`
- search still does not surface relationship edges

### B8
- cross-process addressed retrieval remains exact at `6/6`
- provenance is visible through both query `source` fields and `whoKnows`
- the old sparse-discovery story no longer holds
- the current limitation is different: search is vector-led and over-broad, not cleanly precise

### B2
- true process-isolated write/read rerun scored `20/20`
- exact values and `source` provenance both held across the process boundary
- the old same-session simulation weakness is now materially reduced

## What Is Still Defensible Right Now
These can now stand as refreshed or still-bounded claims:
- `B1`: the historical null-accuracy-differential claim still stands on installed `0.2.39`, with a large efficiency differential remaining in Iranti's favor
- `B11`: observe works materially better than before; attend still broken
- `B12`: explicit recovery works; automatic recovery remains partial/weak
- `B3`: deterministic conflict logic works; close-gap conflicts escalate conservatively
- `B5`: deterministic update logic works; ambiguous updates escalate conservatively
- `B6`: clean ingest remains strong on a controlled rerun
- `B4`: named-attribute and bounded cold-query discovery both work on a clean `0.2.37` pgvector-backed instance, with the caveat that search ranking ambiguity still exists
- `B9`: relationship write/read/traversal works on installed `0.2.37`; relationship edges remain outside plain fact-search indexing
- `B8`: exact shared-KB addressed retrieval and attribution across isolated client processes still work, but discovery should now be described as vector-led rather than precise
- `B2`: facts persist across independent client invocations on installed `0.2.37`
- `B13`: a fresh published-surface cross-version continuity chain now exists through `0.2.38`
- `B7`: bounded null result still stands historically
- `B10`: narrow provenance claim still stands historically

## What Still Needs Narrowing
- `B3`: do not keep using the old timeout-heavy close-gap story as the current headline; the refreshed record supports deterministic conflict logic plus conservative escalation in the ambiguous zone
- `B12`: explicit-query result remains an oracle condition, not general autonomous recovery
- `B4`: current result should be described as bounded top-5 discovery success, not as a general multi-hop reasoning or top-1 ranking claim
- `B5`: do not describe ambiguous updates as simple rejection with incumbent truth preserved; the refreshed record shows escalation in the ambiguous cross-source zone
- `B8`: do not describe the current search surface as a reliable discovery primitive; describe it as vector-led and over-broad
- `B11`: do not describe the family as general automatic context recovery success; the refreshed record is positive for `observe` and still negative for natural `attend`

## What Should Be Rerun Next
No immediate rerun is required to keep the current benchmark program honest.

## Should A New Benchmark Family Be Added Now?
No.

Current-family refresh work is now substantially complete.
The honest next move is to narrow wording where needed, publish the refreshed record, and only then decide whether any new family is necessary.

## Current-Version Caveat
The installed CLI on this machine is now `0.2.39`.
The completed wave1 reruns executed against a disposable runtime reporting `0.2.35`, the mid-wave reruns for `B4/B9/B8/B2` executed against a disposable runtime reporting `0.2.37`, the final `B13` continuity chain covered `0.2.35 -> 0.2.38`, and the final `B1` public comparison executed on installed `0.2.39`.

So the current benchmark state should be treated as:
- refreshed evidence for `B11/B12/B3/B5/B6` through runtime `0.2.35`
- refreshed evidence for `B4/B9/B8/B2` through runtime `0.2.37`
- refreshed upgrade continuity evidence for `B13` through `0.2.38`
- refreshed public-comparison evidence for `B1` through installed `0.2.39`

## Final Recommendation
1. Keep the published v6.0 corpus as the bounded historical `0.2.16` record.
2. Treat the new wave artifacts as refreshed benchmark evidence, split honestly by runtime version.
3. Treat `B2` as refreshed current-version evidence for bounded local cross-session persistence.
4. Treat `B1` as a refreshed public-comparison claim on installed `0.2.39`.
5. Treat `B13` as a refreshed published-surface cross-version continuity claim through `0.2.38`.
6. Narrow old public wording where the rerun work materially changed the behavioral story, especially for `B3`, `B4`, `B5`, `B8`, `B11`, and `B12`.
7. Do not add a new benchmark family now.
