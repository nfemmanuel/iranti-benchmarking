# Statistical Review Extension — Benchmarks B8–B13

**Prepared by:** statistics_reviewer
**Date:** 2026-03-22
**Scope:** B8, B9, B10, B11, B12, B13 (extends statistical-review.md which covers B1–B7)
**Status:** Pre-publication review — not cleared for external release

---

## Executive Summary

The prior statistical review (B1–B7) concluded that no track has sufficient sample size for statistical claims. This extension covers B8–B13 and reaches the same conclusion uniformly. All thirteen benchmark tracks remain in the existence-proof and directional-observation category; none produce statistically defensible rate estimates.

The key additions from the B8–B13 group:

- **B12's three-path recovery matrix** is the most analytically useful new finding, but the 5/8 iranti_observe-with-hint score has a 95% CI spanning [0.300, 0.873] — too wide to make any precision claim about recovery rates. The 8/8 explicit query score requires the oracle qualifier to avoid overreach.
- **B10's attribution finding** is the most mechanistically clean finding in B8–B13: evaluation is objective string comparison with no model-as-judge involvement.
- **B8's multi-agent finding** is structurally expected (a write-and-read test) rather than statistically informative.
- **B13's durability finding** is an existence proof at n=4 probes; it is the correct framing and requires no revision.
- **The overall statistical non-readiness of B11** (context recovery) is notable: the 5/6 observe score has a CI of [0.364, 0.989], rendering it operationally useless as a rate estimate. The benchmark needs ~214 facts at n≈0.83 before a defensible recall rate can be reported.

---

## B8 — True Multi-Agent Attribution

**n:** 5 write+read pairs; 1 `iranti_who_knows` call covering all 5 keys

**Scores:**
- Read fidelity: 5/5
- Attribution correct (agentId = "b8_agent_alpha"): confirmed

**Wilson 95% CI on n=5, k=5:** [0.478, 1.000] — operationally useless.

**Statistical supportability:** No. B8 is a mechanistic correctness question, not a rate estimation question. The attribution either stores and returns the agentId correctly or it does not. Statistical power does not change this interpretation.

**Min n for ±5pp CI:** ~73 attribution events at p=0.95.

**Uncharacterized:** Agent override is client-supplied and not cryptographically enforced. Entity normalization (slash→underscore in entity IDs) not tested for collision. Concurrent writes from multiple agents not tested. No read isolation between agentIds (global KB).

**Classification:** STRUCTURAL / MECHANISTIC. Valid as an existence proof of the attribution pathway.

---

## B9 — Relationship Graph

**n:** 4 edges written; 5 edge-reads across 2 `iranti_related` queries; 8 edge-records from 1 `iranti_related_deep` query (depth=2)

**Scores:**
- Write: 4/4
- iranti_related: 5/5
- iranti_related_deep: 8/8 (flat list)
- iranti_search on relationship edges: 0 results (confirmed structural — edges not indexed for search)

**Wilson 95% CI on n=4, k=4:** [0.398, 1.000]. On n=5, k=5: [0.478, 1.000].

**Statistical supportability:** No. The meaningful claim is capability state (graph read/write end-to-end functional), not a rate.

**Min n for ±5pp CI:** ~73 edge operations at p=0.95.

**Uncharacterized:** Complex topologies (fan-out, chains >2 hops, multigraph edges). iranti_related_deep returns flat list without per-hop depth labels. No relationship type filter parameter available (client-side filtering required). Version gate: iranti_related and iranti_related_deep require ≥v0.2.16.

**Classification:** VALID (capability state). iranti_search finding is VALID (mechanistic negative).

---

## B10 — Knowledge Provenance

**n:** 9 facts across 3 attribution tests; 5 `iranti_who_knows` calls; 1 mixed-attribution entity (2 agentIds contributing to same entity)

**Scores:** All attribution queries returned correct agentId. Mixed entity: separate per-agentId entries returned by who_knows.

**Wilson 95% CI on mixed-attribution (n=2, k=2):** [0.195, 1.000] — widest CI in the program. Unconstrained.

**Statistical supportability:** No. Attribution is mechanistic (the system records which agent wrote each key), not a rate claim.

**Min n for ±5pp CI:** ~73 attribution events at p=0.95; ~30 mixed-entity scenarios for the per-agentId split behavior.

**Uncharacterized:** Post-overwrite attribution (agent A writes, agent B overwrites — who does who_knows return?). Source labels not surfaced in who_knows (confirmed design property — agentId only, not source label). Relationship edge authorship not tracked by who_knows.

**Self-evaluation bias:** Lowest in the program. Pure string comparison between supplied agentId and returned agentId. No model judgment.

**Classification:** VALID (mechanistic). The agentId vs. source-label distinction is VALID and important.

---

## B11 — Context Recovery

**n:** 6 facts, 4 retrieval path variants

| Test | k/n | Proportion | Wilson 95% CI |
|------|-----|------------|---------------|
| iranti_observe + explicit hint | 5/6 | 0.833 | [0.364, 0.989] |
| iranti_observe auto-detect | 5/6 | 0.833 | [0.364, 0.989] |
| iranti_attend natural (no hint) | 4/6 | 0.667 | [0.299, 0.924] |
| iranti_attend forceInject=true | 5/6 | 0.833 | [0.364, 0.989] |

**Critical note:** The `sla_uptime` fact is absent from all 4 retrieval tests despite being confirmed present in the KB via direct iranti_query. This is a **consistent systematic exclusion**, not sampling variation. The exclusion mechanism is unresolved (the prior slash-value hypothesis was retracted in v5.0). Until this is resolved, the observed 5/6 and 4/6 scores are confounded by an unexplained defect.

**Statistical supportability:** No. The baseline comparison is definitional (without hints, 0 facts = by construction). Within-Iranti rates have CIs spanning ~60 percentage points.

**Min n for ±5pp CI at observed rates:**
- At p=0.833: ~214 facts
- At p=0.667: ~342 facts
- Current gap: 36× to 57× below minimum

**Classification:** INSUFFICIENT_N for rate claims. Auto-detection mechanism (alias index) is VALID (mechanistic). Sla_uptime exclusion is an **unresolved defect that contaminates all B11 scores**. Do not publish B11 recall rates until this is resolved.

---

## B12 — Session Recovery

**n:** 8 facts per recovery method, 4 methods

| Method | k/n | Proportion | Wilson 95% CI | Type |
|--------|-----|------------|---------------|------|
| Baseline (stateless) | 0/8 | 0.000 | [0.000, 0.369] | Definitional |
| iranti_handshake | 0/8 | 0.000 | [0.000, 0.369] | Structural (wrong tool) |
| iranti_observe + hint | 5/8 | 0.625 | [0.300, 0.873] | Measured |
| iranti_query explicit | 8/8 | 1.000 | [0.631, 1.000] | Oracle condition |

**Key statistical observations:**

1. The baseline 0/8 and handshake 0/8 are not accuracy measurements — both are structural/definitional.
2. The iranti_query 8/8 requires the oracle qualifier (agent knows exact entity+key schema in advance). Without this qualifier, citing 8/8 as a general session recovery rate is overreach.
3. The observe CI [0.300, 0.873] overlaps substantially with the iranti_query CI [0.631, 1.000]. The 3-fact gap between methods cannot be statistically confirmed at this n.
4. The confidence-level hypothesis (Batch A confidence=95 vs. Batch B confidence=90 causing the Batch A/B differential in observe recovery) is undocumented as a controlled variable and untested.

**Statistical supportability:** No. Differentials across recovery methods are directionally interesting but not statistically distinguishable at n=8.

**Min n for ±5pp CI:**
- Observe arm at p=0.625: ~360 facts across ≥50 session scenarios
- iranti_query arm: ~73 facts — but the oracle condition makes this estimate non-generalizable without removing it

**Classification:**
- 8/8 iranti_query: VALID (existence proof) with ORACLE QUALIFIER REQUIRED
- 5/8 observe: VALID (directional) + INSUFFICIENT_N
- 0/8 baseline and handshake: DEFINITIONAL (not measured performance)

---

## B13 — Upgrade Durability

**n:** 4 durability probes (item 5 was benchmark spec error, not a durability failure); 3 write/read probes on v0.2.16; 1 handshake API surface check

| Test | k/n | Wilson 95% CI |
|------|-----|---------------|
| Cross-version durability (v0.2.12→v0.2.16) | 4/4 | [0.398, 1.000] |
| Write/read on v0.2.16 | 3/3 | [0.293, 1.000] |

**Statistical supportability:** No — but the meaningful claim is "these 4 facts were preserved across 3 version upgrades," which is a correct existence claim. Existence proofs do not require statistical power.

**Min n for ±5pp CI:** ~73 durability probes; coverage across entity types (contested facts, relationship edges, agent-override-attributed facts, large objects) matters more than raw count.

**Version-at-write-time:** Inferred from timestamp correlation, not natively recorded. Iranti does not tag KB records with runtime version. This is a provenance limitation.

**Classification:** VALID (existence proof). Correctly scoped in BENCHMARK-FINAL.md.

---

## Full-Program: Most Defensible Finding Assessment

**a) Largest effect size:** B1-N5000 (+100 pp, Iranti 4/4 vs. baseline 0/4) and B12 explicit query vs. stateless baseline (+100 pp, 8/8 vs. 0/8). Both are maximum possible point estimates.

**b) Least dependency on small-n:** B1-N5000 structural argument; B4 mechanism finding (vectorScore=0, TF-IDF degradation); B10 attribution mechanism. None of these depend on count-based rate estimation.

**c) Least vulnerability to self-evaluation bias:** B8, B10 (objective agentId string comparison), B12, B13 (known write value vs. retrieved value — exact string match), B6 under real LLM (extracted value vs. source text — objective for unambiguous values).

**d) Clearest mechanistic explanation not requiring statistical significance:** B1-N5000. The context window is exceeded — an architectural fact. O(1) key lookup is scale-invariant by data structure design. No statistical test changes these architectural realities.

**Structural vs. statistical strength of B1-N5000:**

The structural argument is **stronger** for the specific question: "does Iranti provide an advantage when the KB exceeds the context window?" Baseline 0/4 is not a rate — it is an architectural constraint. No sample size changes that. Iranti 4/4 reflects a structural property (O(1) index lookup) architecturally guaranteed by the data structure.

It is **weaker** for questions it does not answer: transition zone (N=500 to N=5000) is uncharacterized; n=4 cannot detect latent iranti_query failure modes at large KB sizes; single-run single-scale point.

**Conclusion:** B1-N5000 is the single most defensible finding in the program. Its weaknesses (n=4, single scale point, no degradation onset characterized) must be explicitly acknowledged in any publication.

---

## Claim-by-Claim Validity Classification (Full Program)

| Finding | Classification | Notes |
|---------|----------------|-------|
| O(1) retrieval — architectural argument | STRUCTURAL | Valid. Not a rate claim. |
| B1 N=5000 Iranti 4/4 | STRUCTURAL + INSUFFICIENT_N | CI [0.398, 1.000]; structural argument is primary |
| B1 N=5000 baseline 0/4 | STRUCTURAL | Architectural constraint, not measured failure |
| B2 cross-session persistence (20/20) | VALID (existence) + INSUFFICIENT_N | Simulated session boundary; CI [0.832, 1.000] |
| B3 deterministic conflict paths (4/4) | VALID | Formula-verifiable; mechanistically reproducible |
| B3 LLM arbitration defect | VALID | Confirmed; never produced clean result |
| B4 named attribute queries functional | VALID | Mechanistic boundary; well-documented |
| B4 semantic paraphrase fail | VALID | Consistent; mechanistically explained |
| B5 deterministic update behavior | VALID | Same as B3 — formula-driven |
| B6 ingest 8/8 under real LLM | VALID (with qualifiers) + INSUFFICIENT_N | n=8, single entity type, sub-key decomposition |
| B7 episodic recall at 5,500 tokens | DEFINITIONAL (null) | Both arms at ceiling; below stress scale |
| B8 attribution mechanism | VALID (mechanistic) + INSUFFICIENT_N (rate) | n=5; objective string comparison |
| B8 no read isolation | VALID | Confirmed design property |
| B9 relationship graph end-to-end | VALID (existence) | Single topology; no filter params |
| B9 iranti_search doesn't index edges | VALID (mechanistic) | Confirmed structural negative |
| B10 agentId attribution tracking | VALID (mechanistic) + INSUFFICIENT_N | n=9 facts; objective comparison |
| B10 source label ≠ agentId | VALID | Confirmed design property |
| B11 context recovery rates (83%, 67%) | INSUFFICIENT_N + DEFECT UNRESOLVED | CIs unconstrained; sla_uptime exclusion unresolved |
| B11 alias-based auto-detection | VALID (mechanistic) | matchedBy="alias"; mechanism documented |
| B11 confidence ranking misses progress facts | VALID (design characteristic) | Systematic, not sampling variation |
| B12 handshake = initialization, not recovery | VALID | Structural finding; 0/8 by design |
| B12 iranti_query 8/8 | VALID (oracle condition required) | OVERREACH without oracle qualifier |
| B12 observe 5/8 | VALID (directional) + INSUFFICIENT_N | CI [0.300, 0.873] |
| B12 baseline 0/8 | DEFINITIONAL | Not measured; architectural |
| B13 cross-version durability 4/4 | VALID (existence proof) + INSUFFICIENT_N | n=4; single upgrade path; version-at-write inferred |

---

## Statistical Requirements for Publication-Grade v0.2.21 Rerun

| Track | Key claim | Min n | Specific requirements |
|-------|-----------|-------|----------------------|
| B1 | Degradation onset + differential | ≥30 Q-A pairs at N=5000; ≥30 each at N=1000, N=2000 | Locked ground truth; automated string match; no model-as-judge |
| B2 | Cross-session persistence rate | ≥120 retrievals across ≥5 true cross-session pairs | True session termination; test at multiple KB sizes |
| B3 | Conflict resolution accuracy | ≥100 trials (≥20 per condition) | After timeout defect fix; neutral source name labels for C5 |
| B4 | Search capability boundary rates | ≥120 Q pairs (named vs. paraphrase) | Confirm vectorScore > 0 before running; separate oracle arm |
| B5 | Update behavior boundary | ≥100 trials across confidence gaps | Map full acceptance region; test forced-write if available |
| B6 | Ingest accuracy rate | ≥80 passage-key pairs across ≥5 entity types | KB-isolated namespace; automated extraction validation |
| B7 | Episodic memory at scale | ≥300 Q-A pairs across 50k/100k/200k tiers (≥10 per tier per arm) | Positional decay; distractor turns; context-clear phase before Iranti arm |
| B8 | Attribution accuracy rate | ≥73 attribution events | ≥5 distinct agentIds; overwrite scenarios; concurrent sessions |
| B9 | Graph read/write accuracy | ≥73 edge operations | Diverse topologies; ≥10 node graphs |
| B10 | Multi-agent provenance | ≥120 attributed facts; ≥30 mixed-entity scenarios | Overwrite attribution; ≥3 contributing agents |
| B11 | Context recovery rates | ≥214 facts at p≈0.83 | ≥20 entities × ≥10 facts; resolve sla_uptime exclusion first; automated eval |
| B12 | Session recovery rates (observe arm) | ≥360 facts across ≥50 session scenarios | Real session break; remove oracle condition; RAG alternative |
| B13 | Upgrade durability rate | ≥73 probes across entity types | Include contested facts, edges, agent-override-attributed facts; KB snapshot |

---

## Self-Evaluation Bias Assessment

### Most disqualifying (must be remediated before external publication)

**B1 baseline arm:** Three simultaneous bias vectors — lenient matching (semantic equivalence assessed by model), circular ground truth (same model generated entities and ground truth), in-context recall (same context window). B1-N5000's structural argument partially escapes this.

**B7 episodic memory:** The 10/10 score reflects in-context recall of recently read text — the same capability the test is supposed to be comparing against. At 5,500 tokens, the benchmark cannot distinguish "Iranti helped" from "the model remembered from context."

**B3/B5 LLM arbitration paths:** Requires judging whether the LLM's arbitration reasoning was appropriate — circular when the same model evaluates. Currently moot due to transaction timeout defect.

### Acceptable (objective evaluation, low or no bias)

B8, B10 — agentId string comparison; B12, B13 — known-value vs. returned-value comparison; B9 — edge list comparison; B6 (real LLM) — extracted value vs. source text; B11, B12 Iranti arms — fact value comparison; B4 mechanism — structural API responses.

### Independent evaluator protocol for highest-bias tracks

1. Lock ground truth files (committed to VCS) **before** any trial execution. The evaluation model must not have generated the ground truth.
2. Use automated exact-match evaluation with pre-specified normalization rules (whitespace, case, units). No model-as-judge.
3. For paraphrase answers: use a separate judge model from a different provider (e.g., GPT-4o judges Claude-generated outputs). Blind protocol: judge sees question, correct answer, candidate answer — not entity data or transcript.
4. For B1: n=10 per condition is small enough for human review of all QA pairs — do it for the degradation-zone runs.
5. For B7: the in-context recall confound must be addressed by redesign (50k–200k tokens, context-clear phase), not by a different evaluator.

---

## Overall Statistical Readiness Verdict

**Not publication-ready in any track for formal statistical claims. A subset of structural and mechanistic findings are ready for internal communication and, with proper hedging, for preliminary external disclosure.**

The prior review conclusion is confirmed and extended to all 13 tracks: no track has sufficient sample size for statistical claims. All findings are point estimates with unknown precision.

**Minimum requirements unmet across all 13 tracks:**

| Requirement | Status |
|-------------|--------|
| n ≥ 120 per binomial proportion | Not met in any track |
| Ground truth locked before trial | Not confirmed in any track |
| Evaluation independent of generating model | Not implemented in any track |
| ≥5 repetitions per condition | Not met in most conditions |
| Comparison against non-trivial alternative | Not implemented in any track |

**Critical path to a first publishable result:**

1. **B1 at N=5000, n≥30 Q-A pairs, locked ground truth, automated string-match evaluation.** This is executable immediately and would produce the program's first statistically replicated finding.
2. **B11/B12 redesigned with n≥20 entities × 10 facts each, diverse types, locked ground truth, automated evaluation.** Would produce defensible context recovery rate estimates for the first time.

---

*statistics_reviewer — Iranti Benchmarking Program*
*Extension to statistical-review.md covering B8–B13*
*Date: 2026-03-22*
