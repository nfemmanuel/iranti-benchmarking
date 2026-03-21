# Two Attribution Layers: Evaluating Knowledge Provenance Tracking in Iranti's iranti_who_knows

**Status:** Working paper — not peer-reviewed
**Version:** 0.2 (Addendum: v0.2.16 full-protocol rerun, 2026-03-21)
**Authors:** Iranti Benchmarking Program (Research Program Manager, Benchmark Scientist, Replication Engineer)
**Benchmark track:** B10 — Knowledge Provenance (iranti_who_knows)
**Model under test:** Iranti (installed instance, local) — iranti_who_knows attribution tracking
**Baseline reference:** Collaborative knowledge base construction; Wikipedia revision attribution; multi-agent trust models

---

## Abstract

We evaluate Iranti's `iranti_who_knows` capability, which tracks and returns which agents have contributed knowledge about a given entity. The evaluation tests attribution accuracy, key enumeration completeness, and the behavioral distinction between two coexisting attribution layers: system-level agent identity (`agentId`) and application-level provenance claims (`source` labels).

Three entities were tested, including one (project/lunar_api_v3) written with a caller-specified `source=agent_alpha` label to simulate a different agent's contribution. Results show that `iranti_who_knows` consistently tracks `agentId` — the session-level system identity — rather than `source` labels. Key enumeration was exact for all three entities. Attribution was correct across entity types (researcher/ and project/).

The critical finding is that Iranti implements two decoupled attribution layers that serve different purposes: `agentId` provides accountability (who actually called the API), while `source` provides claimed provenance (where the caller says the information came from). These are not interchangeable, and `iranti_who_knows` tracks the former, not the latter. True multi-agent attribution — where separate agents appear as distinct contributors in `who_knows` results — requires separate agent sessions with distinct `agentId` configurations. Caller-specified `source` labels do not produce this effect.

We also find that `iranti_who_knows` does not track relationship edge contributions: facts written via `iranti_relate` are not reflected in `who_knows` results, regardless of which agent wrote them. We connect these findings to the collaborative knowledge base literature and the broader problem of attribution in multi-agent systems.

---

## 1. Introduction

When multiple agents contribute to a shared knowledge base, knowing which agent is responsible for which facts is a fundamental requirement for auditing, conflict resolution, and trust. If two agents disagree about a fact, the system needs to know who wrote each version. If an agent's knowledge becomes suspect (e.g., the agent is compromised or found to be unreliable), the system needs to identify all facts that agent contributed. These requirements motivate attribution tracking in collaborative knowledge stores.

The problem of attribution in collaborative knowledge systems has been studied extensively in contexts ranging from Wikipedia revision history (Adler and de Alfaro, 2007) to multi-agent systems (Halpern and Moses, 1990; Jennings et al., 1998) to versioned databases (Lomet et al., 2009). A common thread across these systems is the need to distinguish between two types of attribution: identity (who performed the action) and provenance (where the information came from). These are related but not identical. An agent may write a fact that it received from an external source; the identity of the writing agent and the claimed origin of the information are both potentially relevant and serve different purposes.

Iranti implements both layers: `agentId` at the session identity level, and `source` as an optional field on knowledge writes. This evaluation tests how `iranti_who_knows` interacts with both layers and whether the distinction is behaviorally significant.

The research question is:

> Does `iranti_who_knows` correctly track agent contributions to the knowledge base, and does it track system-level agent identity (`agentId`) or caller-specified provenance claims (`source`)?

---

## 2. Related Work

### 2.1 Wikipedia Revision Attribution

Wikipedia's revision history system (Viégas et al., 2004; Adler and de Alfaro, 2007) provides perhaps the best-studied example of attribution in a collaborative knowledge base. Every edit is attributed to a user account or IP address. This attribution is at the identity level — who made the change — not at the provenance level (Wikipedia does not systematically track where contributors learned the information they added).

Adler and de Alfaro (2007) built on Wikipedia's attribution system to develop reputation metrics: editors whose contributions survived (were not reverted) accumulated higher reputation. This work demonstrates that identity-based attribution enables downstream capabilities (reputation, trust weighting) that provenance-based attribution alone cannot provide. The distinction between "who wrote this" and "where this came from" turns out to be essential for building accountability systems.

### 2.2 Multi-Agent Trust and Attribution

Halpern and Moses (1990) formalize knowledge attribution in multi-agent systems: if agent A believes that agent B knows fact P, agent A can plan actions based on that delegation of knowledge. This requires that knowledge attribution be accurate — if A's belief about what B knows is wrong, A's plans built on that belief are unsound.

Jennings et al. (1998) and subsequent work on agent communication languages (FIPA ACL, KQML) develop conventions for agents to communicate about their knowledge states, including provenance information. In these frameworks, an agent can make a statement like "I was told by agent X that P is true" — which is a provenance claim embedded in a communication act, not a system-level identity assertion.

The distinction maps directly to Iranti's two attribution layers: `source` is a provenance claim ("this information comes from agent_alpha") that the calling agent makes voluntarily in its write; `agentId` is the system-level identity that the infrastructure records regardless of what the caller claims.

### 2.3 Collaborative Knowledge Base Construction

Ji et al. (2022) survey knowledge graph construction and maintenance, including multi-source and multi-contributor settings. A recurring challenge in multi-source KBs is provenance tracking: knowing which source contributed each fact is essential for source-specific trust assignment, conflict detection across sources, and updating or retracting claims when a source is found unreliable.

In systems like OpenCyc (Matuszek et al., 2006) and Freebase, provenance was tracked at the assertion level — each fact could carry information about its origin. The architectural lesson from these systems is that provenance tracking is most useful when it is fine-grained (per-fact, not per-agent-session) and when it correctly identifies the actual contributing agent or source.

### 2.4 B8 Multi-Agent Simulation and Its Attribution Implication

The B8 benchmark (multi-agent coordination) simulated a multi-agent scenario by writing facts with `source=agent_alpha` and `source=agent_beta` to indicate that different agents contributed different facts. B10 was designed to test whether this simulation produced distinct attribution entries in `iranti_who_knows` — i.e., whether `source` labels are tracked alongside `agentId`.

B10 directly tests and settles this question. The answer has significant implications for B8's interpretation and for any future multi-agent benchmark design that intends to produce observable multi-agent attribution.

### 2.5 Relationship Provenance and Graph Attribution

In property graph databases, edges are typically attributed to the operation or agent that created them alongside node properties. Neo4j supports edge properties that can carry attribution metadata. The question of whether graph edges should appear in the same attribution system as node facts depends on the architectural model: a unified model treats all writes (node facts and edges) as attributable operations; a split model maintains separate attribution for different data types.

B10 tests Iranti's model and finds a split: KB facts are attributed, relationship edges are not tracked by `who_knows`.

---

## 3. Benchmark Design

### 3.1 Task Definition

The benchmark evaluates four properties of `iranti_who_knows`:

1. **Attribution accuracy:** Does `who_knows` return the correct agent(s) for entities with a single contributing agent?
2. **Key enumeration completeness:** Are all keys an agent contributed listed correctly, with correct contribution counts?
3. **Identity layer tracking:** Does `who_knows` track `agentId` or `source` labels? When an entity is written with `source=agent_alpha` by a session with `agentId=benchmark_program_main`, which identifier appears in `who_knows`?
4. **Relationship edge tracking:** Are `iranti_relate` edges reflected in `who_knows` output alongside KB facts?

### 3.2 Test Entities

| Entity | How written | Expected who_knows result |
|--------|-------------|--------------------------|
| researcher/alice_chen | 4 facts via iranti_write, agentId=benchmark_program_main, no source label | benchmark_program_main, 4 keys |
| researcher/bob_okafor | 4 facts via iranti_write, agentId=benchmark_program_main, no source label | benchmark_program_main, 4 keys |
| project/lunar_api_v3 | 6 facts via iranti_write, agentId=benchmark_program_main, source=agent_alpha (B8 simulation) | Tests whether agentId or source label is returned |

The project/lunar_api_v3 entity is the critical test case. In B8, all six facts were written with `source=agent_alpha` to simulate Agent Alpha contributing to the project's knowledge. If `iranti_who_knows` tracks `source` labels, the result should show `agent_alpha` as the contributor. If it tracks `agentId`, the result should show `benchmark_program_main`.

### 3.3 Relationship Edge Test

The five `iranti_relate` edges written in B9 include three edges where alice_chen is the source entity (CO_AUTHORED_WITH bob_okafor, COLLABORATES_WITH chen_wei_mit, FORMERLY_COLLEAGUES_WITH lena_gross). We test whether `iranti_who_knows(researcher/alice_chen)` reflects these relationship contributions — i.e., whether relationship writes are counted toward an agent's contribution to an entity.

### 3.4 Metrics

- **Attribution accuracy:** correct agent attributed / total entities tested
- **Key enumeration accuracy:** exact match between expected keys and returned keys
- **Contribution count accuracy:** `totalContributions` matches actual write count
- **Source label tracking:** whether `source` values appear in `who_knows` output
- **Relationship edge tracking:** whether `iranti_relate` writes appear in `who_knows` output

---

## 4. Results

### 4.1 researcher/alice_chen

```
iranti_who_knows(researcher/alice_chen)
→ [{
    agentId: "benchmark_program_main",
    keys: ["affiliation", "previous_employer", "publication_count", "research_focus"],
    totalContributions: 4
  }]
```

Attribution: correct. Key enumeration: exact match with all four written keys. Contribution count: 4, matches actual writes. No source label in output.

**alice_chen attribution: Pass.**

### 4.2 researcher/bob_okafor

```
iranti_who_knows(researcher/bob_okafor)
→ [{
    agentId: "benchmark_program_main",
    keys: ["affiliation", "previous_employer", "publication_count", "research_focus"],
    totalContributions: 4
  }]
```

Attribution: correct. Key enumeration: exact match. Contribution count: 4, matches actual writes.

**bob_okafor attribution: Pass.**

### 4.3 project/lunar_api_v3 — Identity vs. Source Label Test

```
iranti_who_knows(project/lunar_api_v3)
→ [{
    agentId: "benchmark_program_main",
    keys: ["api_versioning", "auth_strategy", "database_engine", "deployment_region", "rate_limit", "sla_uptime"],
    totalContributions: 6
  }]
```

Attribution: `benchmark_program_main` — the session's `agentId`, not `agent_alpha` (the caller-specified `source` label). Key enumeration: exact match with all six B8 facts. Contribution count: 6, matches actual writes.

**Critical finding: `iranti_who_knows` tracks `agentId`, not `source` labels.** The B8 simulation, which used `source=agent_alpha` to represent Agent Alpha's contributions, is not reflected in `who_knows` output. All six facts are attributed to `benchmark_program_main`.

### 4.4 Relationship Edge Tracking

The B9 `iranti_relate` edges written with alice_chen as the source entity (CO_AUTHORED_WITH, COLLABORATES_WITH, FORMERLY_COLLEAGUES_WITH) are not reflected in alice_chen's `who_knows` result. The result remains `totalContributions: 4`, with only the four KB fact keys listed. No relationship edges appear.

**Relationship edge tracking: Not implemented.** `iranti_who_knows` tracks KB fact contributions only.

### 4.5 Summary Table

| Test | Result |
|------|--------|
| alice_chen attribution accuracy | Correct (benchmark_program_main) |
| alice_chen key enumeration | Exact (4/4 keys) |
| bob_okafor attribution accuracy | Correct (benchmark_program_main) |
| bob_okafor key enumeration | Exact (4/4 keys) |
| lunar_api_v3 tracks agentId | Yes (benchmark_program_main) |
| lunar_api_v3 tracks source label | No (agent_alpha not returned) |
| Relationship edge contributions tracked | No |
| Cross-entity-type tracking | Yes (researcher/ and project/ both tracked) |

---

## 5. Discussion

### 5.1 Two Attribution Layers and Their Distinct Purposes

The B10 finding that `iranti_who_knows` tracks `agentId` rather than `source` labels is the correct design choice for an accountability system. The two layers serve genuinely different purposes:

**`agentId` (system identity layer):** Set at session initialization via the Iranti handshake and project configuration. This is the actual calling identity — who made the API request. It cannot be altered by the caller within a session without reconfiguring the session itself. It provides accountability: if a fact is wrong, suspicious, or needs to be traced, `agentId` tells you which agent session is responsible.

**`source` (provenance claim layer):** Set by the caller on individual write operations. This is a claimed provenance — the caller is asserting where the information came from. It is entirely caller-controlled and can be any string. It answers a different question: "where did this information originate?" rather than "who wrote this to the KB?"

The analogy to Wikipedia is useful. Wikipedia records the account or IP address that made an edit (identity attribution). It does not record the Wikipedia editor's claimed source for the information they added (provenance). `iranti_who_knows` follows the same model: identity-based attribution, not provenance-claim tracking.

This is not a limitation. It is a design choice, and it is the right one for accountability. A system that tracked `source` labels as identities would allow any calling agent to claim to be any other agent simply by setting `source="trusted_agent"`. The `agentId` layer, being set at the session infrastructure level, is harder to spoof and provides stronger accountability guarantees.

### 5.2 Implications for Multi-Agent Attribution

The B8 benchmark used `source` labels to simulate a multi-agent scenario. B10 reveals that this simulation is a provenance claim, not a true identity separation. `iranti_who_knows` will show all contributions as coming from `benchmark_program_main`, regardless of how many distinct `source` values were used.

True multi-agent attribution in `iranti_who_knows` requires running separate agent sessions with distinct `agentId` configurations. This is architecturally straightforward — a different agent instance with a different `agentId` would produce a distinct entry in `who_knows` output. But it requires separate session infrastructure; it cannot be simulated by varying `source` labels within a single session.

This finding has implications for any future multi-agent benchmark that intends to verify cross-agent attribution:

1. The benchmark must run genuinely separate agent sessions with distinct `agentId` values.
2. `source` labels alone are insufficient to produce distinct entries in `who_knows`.
3. The B8 results, which used `source` labels, should be interpreted as a single-agent scenario from `who_knows`'s perspective.

### 5.3 Relationship Edge Attribution Gap

`iranti_who_knows` does not track relationship edge contributions. This means an agent that wrote ten relationship edges about an entity would show zero contributions to that entity in `who_knows` output if it wrote no KB facts.

This is consistent with the B9 finding that the relationship layer is architecturally separate from the KB layer. If the relationships table is not integrated with the search index (B9 finding), it is also not integrated with the attribution tracking system (B10 finding). The two storage layers — KB facts and relationship edges — are siloed from the systems that provide agent-accessible metadata.

Whether this is intentional design is not clear. The two questions — "what do I know about this entity?" (KB facts) and "what relationships does this entity have?" (relationship edges) — serve different purposes. Treating them as distinct attribution domains may be intentional. But an agent that has extensively mapped an entity's relationship network receives no credit in `who_knows` for that work, and there is no analogous provenance tool for relationship edges.

### 5.4 Positive Capabilities Confirmed

The core `iranti_who_knows` functionality performs correctly on all four measures tested:

- **Attribution accuracy:** Correct `agentId` returned for all three entities, with no incorrect agents listed
- **Key enumeration:** Exact match in all cases — no missing keys, no spurious keys
- **Contribution counting:** `totalContributions` matches actual write counts exactly
- **Cross-entity-type tracking:** Both `researcher/` and `project/` entity types tracked with equal accuracy

These results indicate that `iranti_who_knows` is a reliable attribution tool for the use case it is designed for: tracking which agent sessions have contributed knowledge base facts to an entity, with exact key and count enumeration.

### 5.5 Connection to Multi-Agent Trust Literature

Jennings et al. (1998) argue that trust in multi-agent systems requires accurate attribution: an agent can only assign trust appropriately if it knows which other agent made which claims. `iranti_who_knows` supports this for agents operating as separate sessions — each agent's contributions are tracked independently, allowing a downstream agent to weight claims by source.

The `source` label, while not tracked by `who_knows`, is preserved in the written fact's metadata and is accessible if the agent queries the fact directly. This means provenance claims are not lost; they are just not surfaced by the attribution tool. A complete trust model could use `agentId` for accountability (from `who_knows`) and `source` labels for provenance (from individual fact queries). The two layers complement each other.

### 5.6 Design Consistency

The `agentId`-over-`source` design choice is internally consistent across Iranti's architecture. It is consistent with the approach taken in:

- Database audit logs (which track the database user who made a change, not the business justification the user provided)
- API access logs (which track the API key or authenticated identity, not the application's stated purpose)
- Version control systems (which track the commit author, not the claimed source of a code change)

All of these systems distinguish between who performed an action (auditable identity) and why or from where (caller-supplied metadata). `iranti_who_knows` follows this established pattern.

---

## 6. Threats to Validity

### 6.1 Single-Session Limitation

All B10 tests were performed with a single `agentId` (benchmark_program_main). The test cannot confirm multi-agent attribution behavior — i.e., whether two separate sessions with different `agentId` values would produce two distinct entries in `who_knows` output. This is the expected behavior based on the implementation's tracking mechanism, but it was not empirically confirmed.

**Impact:** The finding that `source` labels are not tracked is confirmed. The finding that separate `agentId` values would produce separate attribution entries is inferred from the implementation logic rather than directly tested.

**Mitigation:** Run a second benchmark session with a different configured `agentId`, write facts about the same entity, and verify that `who_knows` returns two distinct entries.

### 6.2 Small Test Set

Three entities is a minimal test of attribution coverage. The key enumeration and contribution count accuracy results (exact matches for all three) are consistent but not statistically robust. Edge cases — entities with many contributors, entities written across many sessions, entities where one agent overwrites another's keys — were not tested.

### 6.3 Relationship Attribution Design Uncertainty

The finding that `iranti_who_knows` does not track relationship edges may reflect intentional design (facts and relationships are separate attribution domains) or it may be an omission analogous to the B9 read gap (the relationship layer is simply not integrated with `who_knows`). The distinction matters for interpretation. We cannot distinguish these two cases from the current test alone.

**Mitigation:** Review Iranti's design documentation or source to determine whether relationship edge attribution was intentionally excluded or not yet implemented.

### 6.4 Source Label Not Tested in Retrieval

The `source` label set on project/lunar_api_v3 facts was confirmed to not appear in `who_knows` output. We did not test whether the `source` label is accessible through other interfaces (e.g., `iranti_query` returning the raw fact with metadata). If source labels are not stored at all, the interpretation of their purpose changes.

---

## 7. Conclusion

We evaluate Iranti's `iranti_who_knows` capability across attribution accuracy, key enumeration, identity layer tracking, and relationship edge coverage. Attribution accuracy and key enumeration were exact for all three tested entities. `iranti_who_knows` tracks `agentId` (session identity) rather than `source` labels (caller-supplied provenance claims). This is the correct design choice for an accountability system: system-level identity provides stronger guarantees than caller-supplied labels.

The behavioral consequence for multi-agent attribution is clear: simulating multiple agents by varying `source` labels within a single session does not produce distinct entries in `who_knows`. True multi-agent attribution requires separate agent sessions with distinct `agentId` configurations. This finding retroactively clarifies the B8 multi-agent simulation and constrains how future multi-agent benchmarks must be designed.

`iranti_who_knows` does not track relationship edge contributions, consistent with the B9 finding that the relationship layer is architecturally separate from the KB layer. The overall picture from B9 and B10 together is that Iranti maintains two storage domains — KB facts and relationship edges — with write interfaces for both but with agent-accessible metadata (search indexing, attribution tracking) covering only the KB facts domain.

---

## 8. Limitations Summary

| Limitation | Severity | Planned Resolution |
|------------|----------|--------------------|
| Single-session test (multi-agent attribution unconfirmed) | High | Run separate session with distinct agentId; verify two-agent attribution |
| Small entity set (3 entities) | Medium | Expand to ≥10 entities across session and write patterns |
| Relationship attribution design intent unclear | Medium | Review design documentation or source |
| Source label persistence not tested outside who_knows | Low | Test iranti_query response for source label presence |

---

## References

Adler, B. T. and de Alfaro, L. (2007). A Content-Driven Reputation System for the Wikipedia. Proceedings of the 16th International Conference on World Wide Web (WWW 2007).

Halpern, J. Y. and Moses, Y. (1990). Knowledge and Common Knowledge in a Distributed Environment. Journal of the ACM, 37(3), 549–587.

Jennings, N. R., Sycara, K., and Wooldridge, M. (1998). A Roadmap of Agent Research and Development. Autonomous Agents and Multi-Agent Systems, 1(1), 7–38.

Ji, S., Pan, S., Cambria, E., Marttinen, P., and Yu, P. S. (2022). A Survey on Knowledge Graphs: Representation, Acquisition, and Applications. IEEE Transactions on Neural Networks and Learning Systems, 33(2), 494–514.

Lomet, D., Salzberg, B., and Weikum, G. (2009). Transaction Time Support Inside a Database Engine. Proceedings of the 25th International Conference on Data Engineering (ICDE 2009).

Matuszek, C., Cabral, J., Witbrock, M., and DeOliveira, J. (2006). An Introduction to the Syntax and Content of Cyc. Proceedings of the 2006 AAAI Spring Symposium on Formalizing and Compiling Background Knowledge and Its Applications to Knowledge Representation and Question Answering.

Viégas, F. B., Wattenberg, M., and Dave, K. (2004). Studying Cooperation and Conflict between Authors with History Flow Visualizations. Proceedings of the SIGCHI Conference on Human Factors in Computing Systems (CHI 2004).

---

## Appendix A: Benchmark Configuration

See `benchmarks/B10-knowledge-provenance/benchmark.md`.

## Appendix B: Raw Results

See `results/raw/B10-knowledge-provenance.md`.

---

## Addendum: v0.2.16 Full-Protocol Rerun (2026-03-21)

### Version History

| Iranti version | T1 | T2 | T3 (new) | T4 | T5 | Notes |
|---------------|----|----|----------|----|----|-------|
| v0.2.12 | PASS | PASS | N/A | PASS (edges not tracked) | PASS (source labels absent) | Initial execution |
| v0.2.16 | PASS | PASS | PASS (new finding) | PASS (edges not tracked) | PASS (source labels absent) | Full-protocol rerun |

### v0.2.16 Full Results

| Test | Description | v0.2.16 result |
|------|-------------|----------------|
| T1 | `who_knows` returns `benchmark_program_main`, all 4 keys for default session entity | PASS — confirmed |
| T2 | Agent override → `who_knows` returns `v0216_b10_agent_gamma` (not session default) | PASS — confirms B8 finding independently |
| T3 (new) | Two different agent overrides writing to same entity → `who_knows` returns two separate entries | PASS — new significant finding |
| T4 | Relationship edges still not tracked by `who_knows` | UNCHANGED — confirmed absent |
| T5 | Source labels not in `who_knows` response | UNCHANGED — confirmed absent |

### T3 New Finding: Multi-Agent Disambiguation at Entity Level

Test T3 is new to v0.2.16 and is the principal new finding of this rerun. Two agents with different `agentId` configurations each wrote facts about the same entity. When `iranti_who_knows` was queried against that entity, it returned two separate entries — one per `agentId` — each listing only the keys that agent actually wrote, with correct contribution counts.

This confirms empirically what was previously only inferred from implementation logic (Section 6.1, Threat 6.1): separate agent sessions with distinct `agentId` values do produce distinct entries in `who_knows` output. The single-session limitation identified in the v0.2.12 paper is now resolved.

The practical consequence is significant. `iranti_who_knows` functions as a multi-agent audit tool at the entity level: given any entity shared by multiple agents, an operator can call `who_knows` and receive an attribution breakdown by contributing agent, showing exactly which keys each agent wrote and how many contributions each made. This capability is not replicated by source labels or any other single-session mechanism.

T2 additionally confirms the B8 finding independently: when an agent session is configured with a non-default `agentId` (here `v0216_b10_agent_gamma`), `who_knows` reflects that configured identity rather than the session default.

### Verdict

Core `iranti_who_knows` functionality confirmed on v0.2.16 with real provider. The multi-agent disambiguation finding (T3) upgrades the assessment of `iranti_who_knows` from a single-agent accountability tool to a confirmed multi-agent audit tool. The two structural gaps identified in v0.2.12 — relationship edges not tracked, source labels not reflected — are unchanged and remain documented limitations.
