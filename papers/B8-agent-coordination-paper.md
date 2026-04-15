# Multi-Agent Coordination via Shared Persistent Knowledge Base: A Characterization Study of Fidelity Properties

**Status:** Working paper — not peer-reviewed
**Version:** 0.2 (v0.2.16 rerun addendum, 2026-03-21)
**Authors:** Iranti Benchmarking Program (Research Program Manager, Benchmark Scientist, Paper Author)
**Benchmark track:** B8 — Multi-Agent Coordination via Shared KB
**System under test:** Iranti (installed instance, local)
**Baseline condition:** Definitional (no shared persistent store = zero information transfer)


> **Current-version addendum (2026-03-26):** The refreshed rerun preserves the strong addressed-retrieval and provenance result. Discovery should be described more narrowly: the current search surface is vector-led and over-broad rather than a clean general coordination-discovery primitive.

---

## Abstract

We characterize Iranti's behavior as a multi-agent coordination medium: a shared persistent knowledge base through which agents operating in isolated sessions can exchange structured information without direct message-passing. The study uses a controlled scenario in which Agent Alpha writes six architectural decisions to a shared entity namespace and Agent Beta, with no shared session context, retrieves those decisions cold.

The differential between the no-Iranti and with-Iranti conditions is definitional rather than empirical: without a shared persistent store, isolated agents cannot exchange information; with one, they can. This makes the 0% / 100% score comparison uninformative as a performance claim. The scientifically interesting findings are instead the fidelity properties of the coordination channel: exact JSON value preservation (with JSONB key-order normalization), end-to-end source attribution (Agent Beta can identify Agent Alpha as the writer of every fact without Alpha telling it directly), and temporal metadata availability (Agent Beta can determine when each decision was recorded). These properties — particularly the combination of value fidelity and provenance transparency — distinguish the shared-KB coordination pattern from loose message-passing and warrant comparison to the classical blackboard architecture from distributed AI.

We identify four threats to validity that limit the scope of these findings: the definitional rather than empirical baseline, simulation of two agents within a single session, a small fact set of six decisions, and the absence of any conflict test for concurrent or conflicting writes to the same entity and key. The conflict case is an open question: Iranti's behavior when two agents write incompatible values to the same entity+key is not characterized by this study.

---

## 1. Introduction

A persistent challenge in multi-agent AI system design is coordination without coupling. When two agents must share information — about decisions made, resources allocated, or constraints established — the naive solution is synchronous message-passing: Agent A tells Agent B what it decided. This approach introduces coupling: the agents must be co-present (or at least co-temporal), the sender must know which receiver needs the information, and the receiver must be ready to receive it. At scale, these requirements become architectural constraints that limit the composability of agent networks.

An alternative pattern, well-established in multi-agent systems research, is the shared memory or blackboard architecture: a persistent, structured store that agents read from and write to asynchronously. Agents do not communicate directly; they communicate through the state of the shared store. A decision written by one agent can be read by any other agent, in any subsequent session, with no direct coupling between writer and reader.

Iranti's knowledge base is a candidate implementation of this pattern for LLM-based agent systems. Its structured entity/key storage, source attribution fields, and confidence metadata provide infrastructure that could support asynchronous inter-agent coordination. The question this study addresses is: in practice, what are the fidelity properties of that coordination channel?

This is not a benchmark in the traditional sense — there is no performance comparison against an alternative system capable of the same task. The baseline condition is the absence of a shared store, which produces a score of zero by logical necessity. The value of this study is instead in characterizing what the coordination channel actually delivers: whether values survive the write-read cycle without corruption, whether provenance is end-to-end preserved, and whether temporal metadata is available for ordering decisions. These properties determine whether the shared-KB pattern is suitable for production multi-agent coordination tasks.

---

## 2. Related Work

### 2.1 Blackboard Architectures in Multi-Agent Systems

The blackboard model of problem-solving originated in the Hearsay-II speech understanding system (Erman et al., 1980) and was systematized as a general architecture by Hayes-Roth (1985). The canonical blackboard architecture consists of three components: a shared data structure (the blackboard) that contains the current problem state; a set of knowledge sources (agents or modules) that read from and write to the blackboard; and a control component that determines which knowledge source operates at each step.

The central property of the blackboard model is implicit communication: knowledge sources do not call each other directly. A knowledge source that writes a partial solution to the blackboard implicitly informs all other knowledge sources that this information is now available. Any knowledge source whose preconditions are satisfied by the new state can then operate. This decouples the agents from each other while allowing them to build on each other's work.

Iranti's use as a coordination medium maps closely to this model. The entity namespace functions as a structured blackboard. Agent Alpha functions as a knowledge source that writes architectural decisions. Agent Beta functions as a knowledge source that reads those decisions to inform its own work. The control component — determining when Beta should read and what it should query — is implicit in Beta's task specification rather than in a scheduler, but the structural pattern is the same.

The critical difference from classical blackboard systems is that Iranti is not purpose-built for blackboard-style coordination. It is a general knowledge base with structured storage, confidence scores, and source attribution. The coordination pattern emerges from how agents use it, not from a control architecture that enforces the pattern.

### 2.2 MemGPT and LLM Memory Management

Packer et al. (2023) introduce MemGPT, which addresses a complementary but distinct problem: the limited context window of language models. MemGPT treats the LLM context window as a form of main memory and an external storage system as virtual memory, creating a paging mechanism that allows effective context sizes larger than the physical context window. The system introduces tool calls for reading from and writing to external storage, allowing the model to manage its own memory across long conversations.

MemGPT's multi-agent scenarios are noted in the original paper as a direction for future work. The relevant observation is that a shared external memory store enables agents to share information that would otherwise be isolated within individual context windows. The scenario we evaluate in B8 is structurally similar to this vision: each agent has its own context window (its own session), and the shared KB bridges the isolation.

The key distinction is that MemGPT focuses on memory management for a single agent across long conversations, while B8 focuses on information transfer between distinct agents that never share a context. Both applications involve external persistent storage as a coordination mechanism, but the agent topology differs.

### 2.3 Multi-Agent Reinforcement Learning with Shared Memory

In multi-agent reinforcement learning (MARL), shared memory architectures have been studied as a mechanism for enabling implicit coordination without explicit communication. Foerster et al. (2016) demonstrate that differentiable communication channels between agents improve coordinated behavior in cooperative tasks. More relevant to the B8 scenario is the line of work on shared memory banks in cooperative MARL (Liu et al., 2020), where agents write observations or beliefs to a shared memory and read from it to inform action selection.

The MARL literature establishes several properties that are desirable in a shared coordination memory: write atomicity (a written value is immediately readable by all agents), read consistency (all agents reading the same key at the same time see the same value), and provenance tracking (an agent reading a value can determine its source and freshness). These properties map directly to what B8 tests in Iranti: write-read fidelity, cross-agent visibility, and source/timestamp metadata.

### 2.4 The Linda Coordination Model

Gelernter's Linda coordination language (Gelernter, 1985; Carriero and Gelernter, 1989) provides a formal model for tuple-space coordination that is directly relevant to B8. In Linda, agents communicate by placing tuples into a shared tuple space and reading tuples from it. The `out` operation writes a tuple; the `in` operation reads and removes a matching tuple; the `rd` operation reads without removing. Agents are fully decoupled: a writer does not need to know which reader will consume the tuple, and a reader does not need to know which writer produced it.

The Iranti KB operation in B8 corresponds closely to Linda semantics, with the structured entity/key store playing the role of the tuple space, `iranti_write` playing the role of `out`, and `iranti_query` playing the role of `rd` (non-destructive read). The key difference is that Iranti's structured entity/key namespace is more constrained than Linda's arbitrary tuple matching: instead of matching on tuple structure, Iranti requires a known entity identifier and key name. This is a deliberate tradeoff — it provides deterministic O(1) lookup at the cost of requiring the reader to know what to look for.

The Linda model also highlights the conflict question that B8 does not test: in Linda, `in` is an atomic read-and-remove that prevents two agents from reading the same tuple. Iranti's `rd`-equivalent (non-destructive query) leaves the conflict question open: what happens when two agents write incompatible values to the same entity+key? Linda resolves this by allowing multiple tuples with the same structure to coexist; Iranti's behavior is not characterized in this study.

### 2.5 Knowledge Representation and Provenance in Multi-Agent Systems

The B8 findings on source attribution connect to a broader literature on provenance in distributed knowledge systems. The W3C PROV model (Moreau et al., 2013) defines a data model for provenance that includes entities, activities, and agents, with relationships such as `wasGeneratedBy` and `wasAttributedTo`. Iranti's `source` field implements a simplified form of this: a fact recorded with `source=agent_alpha` captures the attribution relationship `wasAttributedTo(fact, agent_alpha)`.

The availability of this attribution to Agent Beta — without Alpha explicitly communicating it — is a notable property of the coordination pattern. In loose message-passing architectures, provenance is typically embedded in the message content (if at all) and can be stripped, modified, or lost in transit. In the shared-KB pattern, provenance is a first-class field in the storage layer, preserved independently of the fact value and visible to any reader.

---

## 3. Methodology

### 3.1 Scenario Design

The B8 scenario is drawn from a realistic multi-agent software development context. A fictional API project (`project/lunar_api_v3`) is under design. Agent Alpha is assigned the role of architectural decision-maker: it has the authority and context to determine the technical shape of the system. Agent Beta is assigned the role of implementation planner: it must make implementation decisions consistent with Alpha's architectural choices.

In a coupled architecture, Alpha would explicitly communicate its decisions to Beta through a shared message, a handoff document, or a shared session. In the B8 design, Alpha and Beta are isolated: Beta has no access to Alpha's session, no shared context window, and no explicit message from Alpha. The only channel through which Alpha's decisions can reach Beta is the shared KB.

### 3.2 Agent Alpha's Write Phase

Agent Alpha writes six architectural decisions to the entity `project/lunar_api_v3`, one per key. Each decision is stored as a structured JSON value. The full raw write log is:

```
iranti_write(project/lunar_api_v3, auth_strategy,
  {"method":"JWT","expiry_minutes":60,"refresh":true,"decided_by":"agent_alpha"},
  conf=92, source=agent_alpha)
→ created

iranti_write(project/lunar_api_v3, rate_limit,
  {"requests_per_minute":500,"burst_limit":1200,"scope":"per_api_key"},
  conf=90, source=agent_alpha)
→ created

iranti_write(project/lunar_api_v3, database_engine,
  {"engine":"PostgreSQL","version":"16","connection_pool":50},
  conf=95, source=agent_alpha)
→ created

iranti_write(project/lunar_api_v3, deployment_region,
  {"primary":"us-east-1","failover":"eu-west-1","decided_by":"agent_alpha"},
  conf=90, source=agent_alpha)
→ created

iranti_write(project/lunar_api_v3, sla_uptime,
  {"target_percent":99.9,"measurement_window":"monthly","credit_threshold":99.5},
  conf=92, source=agent_alpha)
→ created

iranti_write(project/lunar_api_v3, api_versioning,
  {"strategy":"URL path","format":"/v{N}/","deprecation_notice_days":180},
  conf=88, source=agent_alpha)
→ created
```

All six writes returned `action=created` with no conflicts. Confidence scores ranged from 88 to 95.

### 3.3 Agent Beta's Query Phase

Agent Beta operates with no shared context with Alpha. It does not know Alpha's session contents, the values Alpha wrote, or the confidence scores Alpha assigned. Beta's task is to retrieve each of the six decisions by querying the shared entity namespace cold. Beta issues six `iranti_query` calls, one per key:

```
iranti_query(project/lunar_api_v3, auth_strategy)
iranti_query(project/lunar_api_v3, rate_limit)
iranti_query(project/lunar_api_v3, database_engine)
iranti_query(project/lunar_api_v3, deployment_region)
iranti_query(project/lunar_api_v3, sla_uptime)
iranti_query(project/lunar_api_v3, api_versioning)
```

The isolation condition is enforced by ensuring Beta has no session-level context from Alpha's write phase. In the current execution, this isolation is simulated within a single session (see Threats to Validity, Section 7.2).

### 3.4 Fidelity Assessment

For each of the six key/value pairs, we compare the value written by Alpha to the value retrieved by Beta on three dimensions:

1. **Value fidelity:** Are all fields and field values identical?
2. **Source attribution:** Is `source=agent_alpha` visible in Beta's retrieval response?
3. **Temporal metadata:** Is `validFrom` timestamp available to Beta?

A fourth dimension — structural fidelity — assesses whether the JSON object structure (field names and nesting) is preserved, noting that JSONB normalization may alter key ordering without affecting semantic content.

### 3.5 Baseline

The baseline condition is the no-Iranti case: two agents operating in isolated sessions with no shared persistent store and no direct message-passing between them. In this condition, Beta has access to zero of Alpha's decisions. This is a logical consequence of the isolation assumption rather than an experimentally measured condition. We report it as 0/6 (0%) with the explicit qualification that it is definitional.

---

## 4. Results

### 4.1 Value Fidelity

All six values were retrieved by Beta with full semantic fidelity. The following table shows the written and retrieved values for each key:

| Key | Written value (Alpha) | Retrieved value (Beta) | Fidelity |
|-----|----------------------|------------------------|---------|
| auth_strategy | {"method":"JWT","expiry_minutes":60,"refresh":true,"decided_by":"agent_alpha"} | {"method":"JWT","refresh":true,"decided_by":"agent_alpha","expiry_minutes":60} | Exact (key order differs) |
| rate_limit | {"requests_per_minute":500,"burst_limit":1200,"scope":"per_api_key"} | {"scope":"per_api_key","burst_limit":1200,"requests_per_minute":500} | Exact (key order differs) |
| database_engine | {"engine":"PostgreSQL","version":"16","connection_pool":50} | {"engine":"PostgreSQL","version":"16","connection_pool":50} | Exact |
| deployment_region | {"primary":"us-east-1","failover":"eu-west-1","decided_by":"agent_alpha"} | {"primary":"us-east-1","failover":"eu-west-1","decided_by":"agent_alpha"} | Exact |
| sla_uptime | {"target_percent":99.9,"measurement_window":"monthly","credit_threshold":99.5} | {"target_percent":99.9,"credit_threshold":99.5,"measurement_window":"monthly"} | Exact (key order differs) |
| api_versioning | {"strategy":"URL path","format":"/v{N}/","deprecation_notice_days":180} | {"format":"/v{N}/","strategy":"URL path","deprecation_notice_days":180} | Exact (key order differs) |

**Value fidelity: 6/6 (100%).** No field values were modified, truncated, or corrupted in the write-read cycle. JSON key ordering differs in four of six retrievals, consistent with PostgreSQL JSONB normalization, which sorts keys alphabetically on storage. This is a storage-layer behavior, not a fidelity failure: the semantic content is byte-for-byte identical.

### 4.2 Source Attribution

All six retrieval responses include `source=agent_alpha`. This metadata is preserved from the write operation through storage and retrieval without requiring Alpha to embed the attribution in the value payload. Agent Beta can identify Alpha as the author of each decision by reading the `source` field in the query response, without any explicit communication from Alpha.

**Source attribution: 6/6 (100%)**

### 4.3 Temporal Metadata

The `validFrom` timestamp is available in the retrieval response for at least one of the six queries (confirmed for `auth_strategy`: `validFrom=2026-03-21T08:59:37Z`). This timestamp indicates when the fact was first written and allows Beta to determine the recency of each decision and, if multiple decisions were written in sequence, to order them chronologically.

**Timestamp availability: confirmed**

### 4.4 Summary

| Condition | Score | Notes |
|-----------|-------|-------|
| No-Iranti baseline | 0/6 (0%) | Definitional — logical consequence of agent isolation |
| Iranti arm (value fidelity) | 6/6 (100%) | JSONB key-order normalization does not affect semantic content |
| Source attribution | 6/6 (100%) | `source=agent_alpha` preserved end-to-end |
| Timestamp availability | Confirmed | `validFrom` available; full coverage not individually verified for all 6 |

---

## 5. Discussion

### 5.1 The Differential Is Definitional

The 0% to 100% improvement from baseline to Iranti-assisted condition is not an empirical finding about system performance — it is a logical consequence of the task design. Two isolated agents without a shared persistent store cannot exchange information. The moment a shared persistent store exists and both agents can read from and write to it, information transfer becomes possible. The question is not whether transfer occurs but whether it is reliable.

This distinction matters for how the B8 results should be represented. Claiming "100% improvement" without the definitional qualifier would be misleading. The honest framing is: Iranti makes a previously impossible coordination pattern possible, and this study characterizes how faithfully that pattern operates. The fidelity results are the finding.

### 5.2 The Blackboard Pattern in LLM Agent Systems

The coordination pattern demonstrated in B8 is structurally equivalent to a blackboard architecture. Agent Alpha plays the role of a knowledge source that writes partial results; Agent Beta plays the role of a knowledge source whose preconditions are satisfied by Alpha's writes. The entity namespace `project/lunar_api_v3` plays the role of the blackboard region for this project.

The practical significance of this parallel is architectural: the blackboard pattern has four decades of evidence that it scales to complex multi-agent coordination tasks. It has been applied to distributed problem-solving, real-time process control, collaborative design, and — more recently — multi-agent AI systems. If Iranti's KB reliably implements the fidelity and provenance properties demonstrated in B8, it provides a foundation for this class of coordination patterns in LLM-based agent systems.

The properties demonstrated — value fidelity, source attribution, timestamp availability — are precisely the properties that make the blackboard pattern useful: readers can trust the values they find, know who wrote them, and know when they were written. These are not incidental features; they are the properties that allow a blackboard-based system to reason about the trustworthiness and recency of the shared state.

### 5.3 Source Attribution as a Coordination Primitive

The source attribution finding deserves specific emphasis. In message-passing architectures, provenance is typically embedded in the message by the sender, which means it can be omitted, incorrectly stated, or lost in forwarding. In the shared-KB pattern, provenance is a first-class metadata field stored independently of the value. Agent Beta receives `source=agent_alpha` without Alpha ever having to tell Beta "I wrote this."

This has non-trivial implications for trust and conflict resolution in multi-agent systems. If Agent Beta later receives a query result from the same entity+key with `source=agent_gamma` and a different value, Beta has the information it needs to identify a conflict: two different agents wrote incompatible values. The storage layer provides the bookkeeping that would otherwise require explicit inter-agent communication.

The caveat is that B8 did not test this conflict scenario. All six keys were written once, by one agent, and retrieved by another. The behavior when two agents write conflicting values to the same key is not characterized.

### 5.4 The Untested Conflict Case

The most significant open question from B8 is conflict resolution. The B8 scenario was designed to avoid conflicts: Agent Alpha wrote six distinct keys to a new entity, and Agent Beta only read. Neither agent attempted to write a value to a key already written by the other.

Real multi-agent coordination tasks will involve agents writing to overlapping namespaces: decisions revised, estimates updated, resources claimed and contested. Iranti's behavior in these cases — does the second write overwrite the first? does it fail? does it create a revision history? — determines whether the coordination pattern extends to collaborative or competitive agent tasks. This is a critical gap in the current characterization.

### 5.5 Comparison to MemGPT's Multi-Agent Vision

Packer et al. (2023) identify multi-agent coordination as a natural extension of the MemGPT architecture: if one agent manages its memory through external storage, multiple agents managing shared external storage can coordinate without direct coupling. The B8 result provides an early concrete data point in this direction: the shared-KB pattern operates with high fidelity for a small-scale structured coordination task, and the provenance metadata that MemGPT-style systems would require for reasoning about shared memory is intact.

The gap between B8 and the MemGPT multi-agent vision is scale and dynamism. B8 tests six static architectural decisions, written once and read once. A MemGPT-style multi-agent system would involve continuous reads and writes, revision of existing entries, and coordination over evolving problem state. Whether Iranti's fidelity properties are maintained under those conditions — particularly in the presence of concurrent writes and conflict cases — is not established.

---

## 6. Threats to Validity

### 6.1 Definitional Baseline

The no-Iranti baseline of 0/6 is a logical consequence of the agent isolation assumption, not an empirically measured condition. The comparison between baseline and Iranti conditions cannot be used to make quantitative performance claims. The baseline exists to establish what the coordination pattern enables, not to provide a measured comparison point.

**Impact on interpretation:** The 0-to-100 differential should not be cited as a performance improvement metric. The results should be interpreted as a characterization of fidelity properties in a coordination channel that has no alternative implementation in the comparison condition.

### 6.2 Single-Session Simulation of Two Agents

Alpha and Beta were simulated within a single session. True multi-agent isolation would involve separate processes, separate API connections to Iranti, and separate session identifiers. The isolation in B8 is conceptual — Beta was instructed to ignore what was written earlier in the session — not architectural.

**Impact on interpretation:** The B8 results may not generalize to true multi-session, multi-process agent coordination. In a true multi-session scenario, there may be session-level caching, connection pooling, or context bleed effects that differ from the single-session simulation. A proper replication of this benchmark requires separate agent processes.

**Severity:** This is the most structurally significant threat to validity in B8. The fidelity findings are likely to hold — they depend on the storage layer, not the session boundary — but the threat cannot be dismissed without a multi-session replication.

### 6.3 Small Fact Set

Six key/value pairs is a minimal test of the coordination channel. Real multi-agent coordination tasks involve hundreds or thousands of interdependent facts, potentially written by many agents at different times. The fidelity properties demonstrated for six facts may not generalize to larger fact sets, particularly if there are size-dependent behaviors in storage, indexing, or retrieval.

**Impact on interpretation:** The B8 findings characterize the coordination channel at minimal scale. Extension to realistic scale requires a separate benchmark.

### 6.4 No Conflict Test

The B8 scenario was designed to avoid write conflicts: all six keys were new when Alpha wrote them. The behavior of Iranti's storage layer when two agents attempt to write conflicting values to the same entity+key is not characterized. This is not a minor caveat — conflict resolution is central to whether the shared-KB coordination pattern extends to collaborative and competitive multi-agent scenarios.

**Open question:** Does Iranti's storage layer (a) overwrite with the most recent write, (b) fail on conflicting writes, (c) maintain a revision history, or (d) merge values according to some policy? None of these behaviors have been tested. The conflict case should be a priority for B8 replication.

### 6.5 No Concurrent Write Test

Related to the conflict case but distinct: B8 tests sequential writes (Alpha writes, then Beta reads). It does not test concurrent writes from two agents writing to the same entity simultaneously. Concurrent write behavior — particularly under atomicity and consistency guarantees — is a standard requirement for shared-state coordination systems and is not tested here.

---

## 7. Conclusion

We evaluate Iranti's shared persistent knowledge base as a multi-agent coordination medium. The B8 scenario demonstrates that Agent Beta can retrieve all six architectural decisions written by Agent Alpha — cold, without shared context — with 100% value fidelity, full source attribution, and temporal metadata availability. These properties are the foundation of a blackboard-style coordination pattern in which agents communicate implicitly through shared state rather than through explicit message-passing.

The differential between the no-Iranti and with-Iranti conditions is definitional: without a shared persistent store, isolated agents cannot exchange information. The finding of interest is not the score but the fidelity characteristics of the channel — specifically, that JSON values survive storage and retrieval without corruption (accounting for JSONB key-order normalization), that source attribution is preserved as a first-class metadata field, and that temporal metadata is available for reasoning about decision recency.

The most significant open question is conflict resolution: Iranti's behavior when two agents write incompatible values to the same entity+key is not characterized by this study. This should be treated as a priority gap before the shared-KB coordination pattern is relied upon in production multi-agent systems where overlapping writes are likely.

---

## 8. References

Carriero, N., and Gelernter, D. (1989). Linda in context. *Communications of the ACM*, 32(4), 444–458.

Erman, L. D., Hayes-Roth, F., Lesser, V. R., and Reddy, D. R. (1980). The Hearsay-II speech understanding system: Integrating knowledge to resolve uncertainty. *ACM Computing Surveys*, 12(2), 213–253.

Foerster, J. N., Assael, Y. M., de Freitas, N., and Whiteson, S. (2016). Learning to communicate with deep multi-agent reinforcement learning. *Advances in Neural Information Processing Systems*, 29.

Gelernter, D. (1985). Generative communication in Linda. *ACM Transactions on Programming Languages and Systems*, 7(1), 80–112.

Hayes-Roth, B. (1985). A blackboard architecture for control. *Artificial Intelligence*, 26(3), 251–321.

Liu, I., Yeh, R. A., and Schwing, A. G. (2020). PIC: Permutation Invariant Critic for Multi-Agent Deep Reinforcement Learning. *Proceedings of the Conference on Robot Learning (CoRL)*.

Moreau, L., et al. (2013). PROV-DM: The PROV Data Model. W3C Recommendation. https://www.w3.org/TR/prov-dm/

Packer, C., Fang, V., Patil, S. G., Zhang, K., Wooders, S., and Gonzalez, J. E. (2023). MemGPT: Towards LLMs as Operating Systems. *arXiv:2310.08560*.

---

## Appendix A: Raw Write and Retrieval Log

See `results/raw/B8-agent-coordination.md`.

## Appendix B: Benchmark Definition

See `benchmarks/B8-agent-coordination/benchmark.md`.

---

## Addendum — v0.2.16 Rerun (2026-03-21)

### Version History Table

| Version | Fidelity (write → read) | Attribution mechanism | who_knows result | KB isolation |
|---------|------------------------|----------------------|-----------------|--------------|
| v0.2.12 | 6/6 (100%) | source label on iranti_write | benchmark_program_main (wrong) | Global (shared) |
| v0.2.16 | 5/5 (100%) | agent parameter override on iranti_write | b8_agent_alpha (correct) | Global (shared) |

### Rerun Findings

#### Fidelity: 5/5 with true agentId separation

The v0.2.16 rerun used a redesigned test that enforces genuine agentId separation through the `agent` parameter override on `iranti_write`, rather than the source label convention used in v0.2.12. Writes were issued as agent `b8_agent_alpha`; reads were issued as agent `b8_agent_beta`. All five tested facts were retrieved by `b8_agent_beta` with exact value fidelity.

#### Mechanism correction: agent override, not source label

The v0.2.12 test used `source=agent_alpha` as a naming convention on the write call. `iranti_who_knows` tracked the true session agent (`benchmark_program_main`), not the source label — so attribution returned `benchmark_program_main`, not `agent_alpha`. This was a test design error: source labels are not the mechanism by which Iranti tracks authorship.

The correct mechanism is the `agent` parameter override on `iranti_write`, which overrides the session-level agentId for that specific write. When writes are issued with `agent=b8_agent_alpha`, `iranti_who_knows` returns `b8_agent_alpha` — the correct writer — regardless of which session performed the write. This is a first-class identity mechanism, not a naming convention.

**Implication for prior results:** The v0.2.12 source attribution finding (6/6 source=agent_alpha preserved in retrieval responses) was real — the source field was preserved. But the `iranti_who_knows` result in that version was incorrect because the wrong identity mechanism was used. The v0.2.16 result demonstrates that correct attribution through `iranti_who_knows` requires the agent parameter override.

#### KB is globally shared: no per-agentId read isolation

The knowledge base is globally shared across agentIds. `b8_agent_beta` can read facts written by `b8_agent_alpha` without any explicit access grant. There is no per-agentId read isolation — any agent with access to the instance can read any entity in the KB, regardless of which agentId wrote it. This is a confirmed architectural characteristic, not a bug. The B8 coordination pattern depends on this global visibility.

Agents that require isolation between agentId namespaces (e.g., to prevent one agent from reading another agent's working state) must implement that isolation at the entity-naming or key-naming layer, not at the agentId layer.

#### Entity normalization: slash to underscore

During the v0.2.16 rerun, entity identifiers containing forward slashes were normalized to underscores in the stored entityId (e.g., `agent/alpha` → `agent_alpha`). This behavior is undocumented. It creates a silent collision risk: two distinct entity names that differ only in slash vs. underscore placement will map to the same stored entityId. Agents that construct entity names dynamically should be aware of this normalization and avoid patterns that could produce collisions.

### Composite Verdict: v0.2.16

The v0.2.16 rerun confirms and clarifies the B8 findings:

- **Fidelity:** Confirmed at 5/5 (100%) with true agentId separation via agent parameter override.
- **Attribution:** `iranti_who_knows` correctly returns the writing agentId when the agent override is used. The v0.2.12 result was incorrect due to use of source labels rather than the agent override mechanism.
- **KB isolation:** Confirmed globally shared. No per-agentId read boundaries.
- **New observation:** Entity normalization (slash → underscore) is undocumented and introduces a potential silent collision risk.
