# Research Program Manager — Sign-Off v6.0
## Iranti Benchmarking Program — Targeted Revalidation Pass

**Date:** 2026-03-22
**RPM:** research_program_manager (benchmark_program_main session)
**Iranti version:** 0.2.16 (installed; unchanged from v5.0)
**Upstream commit context:** d03781a1 ("Harden benchmark regressions and compatibility policy") — unreleased
**Prior sign-off:** rpm-signoff-v5.md (2026-03-21, program version 5.0 — COMPLETE)
**LLM_PROVIDER:** openai
**Evaluation model:** Claude Sonnet 4.6 (claude-sonnet-4-6)

---

## What This Sign-Off Covers

v5.0 closed all 13 benchmark tracks (B1–B13) with a complete program record. This v6.0 is a targeted revalidation pass, not a full program rerun. No new npm release was published. The installed binary is still 0.2.16, identical to the binary evaluated throughout v3.0–v5.0.

The revalidation was triggered by upstream source changes in commit d03781a1, which directly address two areas previously characterized by this program: the retracted slash-value defect and the resolved user/main contamination issue. The purpose of this pass is:

1. To confirm installed v0.2.16 behavior is unchanged from v5.0 findings across the affected areas.
2. To document the alignment between upstream development intent and observed benchmark behavior.
3. To note what the upstream changes mean for the strength and durability of existing findings.
4. To formally confirm that no new defects were introduced.

**This sign-off does not revise any v5.0 finding. It confirms all v5.0 conclusions and documents supporting upstream context.**

---

## Upstream Context: Commit d03781a1 (Unreleased)

Upstream commit d03781a1 ("Harden benchmark regressions and compatibility policy") was merged in the iranti source repository after the v5.0 sign-off. It is not present in the installed 0.2.16 binary. Its relevance to this program is as follows.

### 1. Smoke Test Fix

`tests/typescript_client/smoke_test.ts` was updated to write to `person/${uniqueId('ts_client_person')}` instead of `user/main`. This is directly relevant to the user/main RESOLVED classification in v5.0. The `user/main/favorite_city` entry in our local KB originated from prior benchmark regression runs that exercised similar test infrastructure. The upstream fix confirms that the test-artifact pathway is now closed in the source. The entry in our KB is a historical artifact from this program's own regression testing and will not accrue further entries from upstream test infrastructure.

### 2. Regression Tests Added

`tests/memory-retrieval-regressions.ts` is a new test file with explicit coverage for:
- Slash-value retrieval through all four paths: query, search, observe, attend — all PASS
- user/main noise isolation under explicit personal hint — PASS

These upstream tests independently corroborate both the RETRACTED status of the slash-value defect and the RESOLVED status of the user/main contamination issue. They also add explicit `entityHints: [personalEntity]` to the attend call in the smoke test — a practice consistent with our B11 finding that explicit hints improve observe/attend recall.

The existence of these regression tests as committed source strengthens the durability assessment for both findings: the upstream team has formalized the passing behavior as a regression gate.

### 3. Runtime Lifecycle Hardening

`src/lib/runtimeLifecycle.ts` was updated with more permissive parsing of legacy runtime.json files. Files from v0.2.14 now parse correctly even if missing `ppid`, `lastHeartbeatAt`, or `updatedAt` fields. New test coverage in `tests/runtime-lifecycle/run_runtime_lifecycle_tests.ts` validates this.

**Relevance to B13:** B13 (upgrade safety) found 3/3 facts durable across v0.2.12 → v0.2.14 → v0.2.16. The runtime lifecycle hardening strengthens the B13 finding on its underlying infrastructure dimension. The B13 conclusion was based on observed fact durability; this upstream change confirms the runtime metadata layer is now being actively hardened to support cross-version compatibility. The B13 conclusion stands without revision, and this change reduces the residual risk associated with forward upgrades.

### 4. Compatibility Policy Formalized (ADR 007)

`docs/decisions/007-compatibility-policy.md` adopts a compatibility-first policy covering: CLI interface, REST API, TypeScript SDK, config files, and persisted state. Runtime metadata is designated a migration-managed compatibility surface.

**Relevance to this program:** B13 empirically observed API surface stability and fact durability across three versions. ADR 007 now formalizes this as an explicit product commitment. The benchmark finding and the product policy are now aligned. This is relevant to any messaging that references upgrade safety: the claim now has both empirical evidence (B13) and a formalized upstream policy commitment behind it. The program's conclusion remains evidence-bounded; the policy strengthens the forward-looking interpretation but does not change the retrospective benchmark finding.

### 5. README Narrowed

The upstream README was significantly shortened. Inflated early validation claims were removed. The product boundary is now documented as: "structured memory infrastructure is the strong claim; full semantic-paraphrase retrieval and fully autonomous extraction are not yet."

**Relevance to this program:** This narrowing directly mirrors the benchmark program's findings. B4 (search) found named attribute queries functional and semantic paraphrase non-functional. B6 (ingest) found extraction functional under real LLM but with sub-key decomposition behavior that requires documentation. The upstream README now reflects these same conclusions. Public-facing product claims are now aligned with the benchmark program's evidence-bounded findings without requiring further messaging intervention from this program.

---

## Revalidation Results — Summary

Full detail is in `results/raw/B-v6-targeted-revalidation.md`.

### Slash-Value (RETRACTED — Confirmed)

Six retrieval calls against a freshly written entity (`project/v6_slash_repro`) with slash characters in structurally meaningful positions across both stored keys:

| Path | Result |
|------|--------|
| iranti_query (api_endpoint) | PASS — full value including URLs, paths, ratio |
| iranti_query (sla_uptime) | PASS — full value including ops@example.com/incidents |
| iranti_search (A/B endpoint /v1/deploy 3/4 ratio) | PASS — top result, vectorScore=0.665 |
| iranti_search (99.9% SLA ops@example.com/incidents) | PASS — top result, full value |
| iranti_observe (entityHints=["project/v6_slash_repro"]) | PASS — both facts returned fully |
| iranti_attend (entityHints, forceInject=true) | PASS — both facts returned fully |

The `parse_error/invalid_json` appearing in `debug.dropped` during observe and attend is entity-extraction NLP pipeline noise. It is present regardless of whether slash characters appear in stored values and does not represent loss of any stored fact. It is not a defect relevant to the slash-value characterization.

**Finding: RETRACTED classification confirmed. The slash-value defect was not reproduced in any of 6 fresh test calls against 2 slash-bearing keys across 4 retrieval paths. Upstream regression tests in commit d03781a1 independently confirm the same passing behavior.**

### user/main Contamination (RESOLVED — Confirmed)

The `user/main/favorite_city` entry (`{"city": "NoiseTown"}`, source `memory_regression_noise`) persists in the local KB. Its behavior was retested:

- Natural attend against a production-representative context (lunar_api_v3): `shouldInject=false`, 0 facts returned. Entry did not surface.
- iranti_observe with project hint: 5 project facts returned, no `user/main` entry.
- Explicit attend with `forceInject=true` and targeted "favorite city" question: 1 fact returned — `user/main/favorite_city`. This is expected correct retrieval behavior, not contamination.

**Finding: RESOLVED classification confirmed. The entry exists in the KB as a historical benchmark artifact but does not pollute retrieval results in natural contexts. Upstream smoke test fix confirms the test-artifact pathway is closed in the source.**

### B4 Search (Partial — Unchanged)

- Named attribute query ("deployment region auth strategy database engine"): PASS
- Semantic paraphrase query ("the authentication approach used for the API that serves the lunar project"): FAIL — lunar_api_v3/auth_strategy not returned

**Finding: B4 finding unchanged. Named attribute queries viable; semantic paraphrase non-functional.**

### B11 Auto-Detection (Confirmed — Mechanism Clarified)

iranti_observe without entityHints, lunar_api_v3 context: `detectedCandidates=1`, `keptCandidates=1`, `matchedBy="alias"`, `confidence=0.82`, 5 facts returned.

**Finding: Auto-detection confirmed working. The `matchedBy: "alias"` field clarifies the mechanism: detection operates through the entity alias index, not through paraphrase-level NLP extraction. Detection succeeds when the entity name or a registered alias appears in the context string. This is consistent with v3.0's 5/6 auto-detect result and explains why the success rate is high for explicitly named entities but would not extend to purely paraphrase-described contexts.**

### B12/B13 Spot Check (Confirmed — Unchanged)

- `project/lunar_api_v3/auth_strategy`: FOUND (written v0.2.12 era) — confirms B12 explicit query arm and cross-version durability
- `project/mars_gateway_v2/database_engine`: FOUND (written v0.2.14 era) — confirms B13 cross-version durability
- `iranti_handshake`: `workingMemory=[]` — confirms B12 handshake-is-initialization-only finding

**Finding: B12 and B13 conclusions unchanged.**

---

## Defect Status Table — v6.0

| # | Defect | Status as of v6.0 | Notes |
|---|--------|-------------------|-------|
| 1 | Transaction timeout on LLM-arbitrated writes | **OPEN — HIGH** | Unchanged. Systemic; no API workaround. Affects cross-source writes in gap < 10 zone. v6.0 revalidation did not re-exercise this path. v5.0 characterization stands. |
| 2 | Forward slash in fact values causes silent retrieval drop | **RETRACTED** | Confirmed not reproduced. 6 fresh test calls across 4 paths all pass. Upstream regression tests corroborate. |
| 3 | user/main noise entry pollutes retrieval results | **RESOLVED** | Confirmed non-polluting. Historical artifact persists in local KB. Upstream smoke test fix closes the test-artifact pathway in source. |
| 4 | iranti_observe confidence ranking misses progress/transient facts | **OPEN — MEDIUM** | Unchanged. Design characteristic; no new evidence. Workaround: explicit iranti_query for known keys. |

No new defects identified in this revalidation pass.

---

## Updated Capability Assessment

The capability table from v5.0 is reproduced below with targeted updates to rows affected by this revalidation pass. Rows not listed here are unchanged from v5.0.

| Capability | Tool(s) | Evidence basis | Safe to claim? | Caveats |
|-----------|---------|----------------|---------------|---------|
| Exact entity+key retrieval | iranti_query | B1–B13; v6.0: fresh slash-bearing entity PASS | Yes | O(1) confirmed to N=5000. Values with slash characters, URL paths, and email+path strings returned intact. |
| Attribute-value search | iranti_search | B4 unchanged; v6.0: named PASS, paraphrase FAIL | Yes, with caveat | Semantic paraphrase not functional. Named attribute queries work. Upstream README now documents this boundary. |
| Context recovery with hints | iranti_observe | B11; v6.0: alias mechanism confirmed | Yes, with caveat | Auto-detection operates via alias index, not paraphrase NLP. Confidence ranking still misses progress facts. Prior slash-exclusion claim retracted and reconfirmed. |
| Attend injection classifier | iranti_attend | B11; v6.0: slash-bearing entity PASS | Yes, with caveat | user/main slot-pollution resolved and reconfirmed. Prior slash-exclusion claim retracted and reconfirmed. |
| KB durability across upgrades | All tools | B13; v6.0: cross-version query PASS; upstream runtime hardening noted | Yes | n=3; single run; existence proof. Upstream ADR 007 formalizes compatibility commitment for forward upgrades. |

All other rows from the v5.0 capability table remain unchanged.

---

## What the Upstream Changes Mean for the Program's Conclusions

### For RETRACTED (slash-value)

The upstream regression test addition independently confirms the retracted defect claim. The program's RETRACTED classification is now corroborated by: (1) our own v5.0 revalidation; (2) our v6.0 6-path fresh repro; (3) upstream regression tests committed at d03781a1. Three independent evidential sources point to the same conclusion. Confidence in the RETRACTED classification is high.

### For RESOLVED (user/main)

The upstream smoke test fix closes the test-infrastructure pathway through which the artifact was created. Our local KB retains the entry from prior runs. The RESOLVED classification — that the entry does not pollute natural retrieval — is confirmed by v6.0 testing. The entry is benign.

### For B13 (upgrade safety) and ADR 007

B13's empirical finding (facts durable across three versions, API surface stable) is now supplemented by a formalized upstream policy commitment. This does not change the benchmark finding (which is evidence-bounded to the tested versions) but it increases confidence that forward upgrades will continue to be handled safely. Any messaging referencing upgrade safety can note both the empirical evidence and the formal policy, with appropriate caveats on the n=3 empirical basis.

### For README alignment

The upstream README now accurately reflects the benchmark program's conclusions. The product boundary statement ("structured memory infrastructure is the strong claim; full semantic-paraphrase retrieval and fully autonomous extraction are not yet") is consistent with B4, B6, and B11 findings. No messaging misalignment remains between the upstream product documentation and this program's findings.

---

## Program Disposition Table — v1.0 through v6.0

| Track | v1.0 (0.2.12) | v2.0 (0.2.14) | v3.0 (0.2.16) | v4.0 (0.2.16) | v5.0 (0.2.16) | v6.0 (0.2.16) |
|-------|--------------|--------------|--------------|--------------|--------------|--------------|
| B1 | Closed (null, N≤500) | Closed (null, N≤500) | Confirmed (null) | POSITIVE DIFFERENTIAL at N=5000 | Confirmed — final | Confirmed — unchanged |
| B2 | Closed | Closed | Confirmed (spot check) | Confirmed | FULL RERUN CONFIRMED — final | Confirmed — unchanged |
| B3 | Closed (4/5 with mock LLM) | Closed | Confirmed (spot check) | Confirmed | FULL RERUN — 4/4 deterministic, LLM path defect — final | Confirmed — unchanged |
| B4 | Closed (structural failure) | Regression (crash) | Partially fixed | Confirmed partial | Confirmed — final | Confirmed — unchanged; paraphrase still fails |
| B5 | Closed (T1/T4 unexpected) | Closed | Confirmed (spot check) | Confirmed | FULL RERUN — deterministic confirmed, T5 new finding — final | Confirmed — unchanged |
| B6 | Closed (mock artifact) | Closed (mock artifact) | FIXED — 8/8 real LLM | Confirmed | Confirmed — final | Confirmed — unchanged |
| B7 | Closed (null, 5k tokens) | Closed | Confirmed | Confirmed | FULL RERUN CONFIRMED — final | Confirmed — unchanged |
| B8 | Closed (single-session sim) | Closed | Confirmed | TRUE AGENTID ATTRIBUTION 5/5 | Confirmed — final | Confirmed — unchanged |
| B9 | Closed (write-only) | Closed (write-only) | FIXED — readable | Confirmed | Confirmed — final | Confirmed — unchanged |
| B10 | Closed | Closed | Confirmed | Confirmed | FULL RERUN — PER-AGENTID MULTI-AGENT FINDING — final | Confirmed — unchanged |
| B11 | Closed (broken) | Closed (partial) | Substantially improved | Defects characterized | Confirmed — final | Confirmed; alias mechanism clarified; RETRACTED reconfirmed |
| B12 | — | — | New — closed | Confirmed | Confirmed — final | Confirmed — unchanged |
| B13 | — | — | New — closed | Confirmed | Confirmed — final | Confirmed; ADR 007 noted; runtime hardening noted |

---

## v6.0 Conclusions

All v5.0 conclusions are confirmed without modification. This revalidation pass found:

1. No new defects in any tested path.
2. No regression in any tested finding.
3. The slash-value RETRACTED classification holds across 6 fresh test calls and is now independently corroborated by upstream regression tests.
4. The user/main RESOLVED classification holds. The upstream smoke test fix closes the artifact-generation pathway in source.
5. B4, B11, B12, and B13 spot checks confirm the corresponding v5.0 conclusions without deviation.
6. Upstream commit d03781a1 is well-aligned with this program's findings. The upstream team's development direction — regression test formalization, runtime hardening, compatibility policy, and README narrowing — reflects the same product boundaries this program identified empirically.
7. ADR 007's compatibility-first commitment provides a policy-level supplement to the empirical B13 upgrade safety finding.
8. The single open high-priority defect — transaction timeout on LLM-arbitrated writes — was not re-exercised in this pass. Its v5.0 characterization stands unchanged.

The program's primary scientific contribution, the B1 N=5000 positive differential, is unchanged and unaffected by this pass.

---

## Signed

**research_program_manager**
**Date: 2026-03-22**
**Program version: 6.0 — Targeted Revalidation Complete**

All 13 tracks remain closed from v5.0. This v6.0 pass confirms all prior conclusions, introduces no new findings requiring track revision, and documents upstream alignment with the program's evidence-bounded characterization of the product.

The transaction timeout on LLM-arbitrated writes remains the single most operationally significant open defect. Engineering should continue to treat it as a priority item.

No open benchmark gaps. No unresolved defect reclassifications. v5.0 conclusions stand.

Program version: 6.0 — CONFIRMED
