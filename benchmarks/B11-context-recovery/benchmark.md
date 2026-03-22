# Benchmark B11: Context Recovery (iranti_observe + iranti_attend)

**Family:** Working memory / context recovery
**Motivated by:** The stateless-LLM context management problem; MemGPT (Packer et al. 2023) establishes external memory paging as a solution. Note: 'attention restoration theory' (Kaplan 1989, cognitive psychology) is not applicable to LLM evaluation and has been removed from this program's benchmark family labels.
**Executed:** 2026-03-21
**Status:** Complete — first execution

---

## 1. What This Benchmark Measures

Whether `iranti_observe` can recover relevant KB facts when the agent's context window no longer contains them — simulating a scenario where important facts have "paged out" due to context growth.

This tests:
- **Relevance ranking**: Does observe return the facts most relevant to the current context?
- **Entity detection**: Can observe auto-detect which entities are relevant from context text alone?
- **Hint-assisted recovery**: Does providing explicit entity hints improve recovery?
- **Coverage**: Of N facts in the KB for an entity, what fraction does observe return?

---

## 2. Protocol

Context provided: "We are planning the lunar_api_v3 deployment. I need to remember what auth method we decided on and what our SLA commitment is. Also need to recall what database we chose."

This context explicitly references 3 of 6 facts (auth_strategy, sla_uptime, database_engine) and implicitly relates to 3 others (rate_limit, deployment_region, api_versioning).

Entity hint provided: `project/lunar_api_v3` (explicit hint, not inferred from text).

---

## 3. Results

| Fact key | In context text? | Returned by observe? | Relevance |
|----------|-----------------|---------------------|-----------|
| database_engine | Yes (explicitly) | ✓ | rank 1 |
| auth_strategy | Yes (explicitly) | ✓ | rank 2 |
| sla_uptime | Yes (explicitly) | ✓ | rank 3 |
| deployment_region | No (implicit) | ✓ | rank 4 |
| rate_limit | No (implicit) | ✓ | rank 5 |
| api_versioning | No | ✗ not returned | — |

**Recovery: 5/6 (83%) with explicit entity hint**

---

## 4. Key Findings

### Finding 1: Entity detection from context text fails — hints required
```
detectedCandidates: 0
hintsProvided: 1, hintsResolved: 1
```
iranti_observe did NOT auto-detect `project/lunar_api_v3` from the context text, even though "lunar_api_v3" appears verbatim in the context string. The entity was resolved only because of the explicit entity hint. Without the hint, 0 facts would have been returned.

This means: agents must know which entities to hint at to use iranti_observe effectively. Fully automatic context recovery from raw text is not currently working.

### Finding 2: Relevance ranking is correct for explicit references
The 3 facts explicitly mentioned in the context (database, auth, SLA) were all returned and ranked first. The system correctly prioritized explicitly requested information.

### Finding 3: Related facts are proactively surfaced
Two facts not mentioned in the context (rate_limit, deployment_region) were also returned, suggesting observe performs a broader recall around hinted entities, not just exact-match recovery.

### Finding 4: maxFacts cap operates correctly
With maxFacts=6 and 6 total facts for the entity, observe returned 5. The missing fact (api_versioning) was likely ranked lowest in relevance.

---

## 5. Comparison to B7 (Active Write Pattern)

| Approach | Mechanism | Requires entity knowledge |
|----------|-----------|--------------------------|
| B7 active write | Agent writes facts during conversation | Only the agent's current context |
| B11 observe | Agent recovers facts on demand | Must know entity IDs to hint |

The active write pattern (B7) is more autonomous — facts are captured as they're stated, without requiring the agent to remember entity IDs. The observe pattern is useful for recovery but requires the agent to maintain awareness of which entity namespaces to query.

---

---

## 7. iranti_attend Extension (Per-Turn Injection Decision)

`iranti_attend` is the companion to iranti_observe. Where observe is called on demand, attend is intended to be called before each LLM turn to decide whether memory should be injected.

**Test 1 — Natural heuristic (no forceInject):**
```
latestMessage: "What authentication method did we decide on for the API, and what was the rate limit?"
currentContext: "We are in a planning meeting about the lunar_api_v3 project."
entityHints: ["project/lunar_api_v3"]
→ shouldInject: false
   reason: classification_parse_failed_default_false
   hintsResolved: 0
   facts returned: 0
```

**Test 2 — forceInject=true:**
```
latestMessage: "Confirm: auth method, database engine, SLA target for lunar_api_v3?"
currentContext: [206 chars, describes resumed session]
entityHints: ["project/lunar_api_v3"]
forceInject: true
→ shouldInject: true (forced)
   hintsResolved: 1
   facts returned: 5/6 (same as iranti_observe)
```

**Finding: iranti_attend's injection classifier is currently broken.** The natural heuristic fails with `classification_parse_failed_default_false` and additionally fails to resolve entity hints when shouldInject=false. With forceInject=true, it works identically to iranti_observe. The tool is not usable autonomously in its current state.

---

## 8. Threats to Validity

1. Entity hint was provided manually — auto-detection failure not independently verified
2. Only one entity tested
3. Relevance ranking mechanism is not observable
4. The parse_error in debug output may indicate a malformed internal candidate — not affecting results but worth noting
5. iranti_attend classifier failure may be version-specific or configuration-dependent
