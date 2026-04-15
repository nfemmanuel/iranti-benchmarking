# Benchmark B8: Multi-Agent Coordination via Shared KB

**Family:** Multi-agent coordination / shared persistent state
**Motivated by:** The general problem of inter-agent information sharing in stateless LLM systems. Background: Packer et al. (2023) sketch multi-agent KB coordination as a use case but do not provide a quantitative evaluation protocol for this scenario. This benchmark uses an original design (two isolated agent sessions coordinating via shared KB) with a definitional baseline (no shared store = zero information transfer by construction).
**Executed:** 2026-03-21 (first execution); 2026-03-22 (v0.2.21 rerun — genuine new entity, new key set)
**Status:** Complete - addressed retrieval and attribution confirmed; discovery must be described narrowly


> **Program context:** For the canonical current benchmark state, start with [`articles/CURRENT-BENCHMARK-STATE.md`](../../articles/CURRENT-BENCHMARK-STATE.md) and [`papers/CURRENT-BENCHMARK-STATE-TECHNICAL.md`](../../papers/CURRENT-BENCHMARK-STATE-TECHNICAL.md). This family document should be read as one track within that broader current-state record.

---

## 1. What This Benchmark Measures

Whether Iranti enables two isolated agents or client processes to coordinate on a shared task through addressed reads and writes in the shared KB, without explicit direct message-passing.

The core scenario: Agent Alpha makes architectural decisions and writes them to the KB. Agent Beta, operating with no shared context with Alpha, needs those decisions to implement its own portion of the work. Without Iranti, Beta cannot access Alpha's decisions (0% information transfer). With Iranti, Beta queries the KB and retrieves all decisions exactly as written (exact information transfer).

This tests:
- **Information fidelity**: Are facts written by Agent A retrieved identically by Agent B?
- **Source attribution**: Can Agent B see who wrote the fact (source=agent_alpha)?
- **Structural coordination**: Can agents use a shared entity namespace as an implicit communication channel?
- **Baseline definitional**: Without Iranti, addressed retrieval across isolated agents requires some other shared store or explicit context passing. The baseline here is a conceptual contrast, not a measured competitor arm.

---

## 2. Task Design

**Domain:** API project architecture decisions for a fictional project (project/lunar_api_v3)

**Agent Alpha's role:** Architectural decision-maker. Writes 6 decisions to KB covering: authentication strategy, rate limiting, database selection, deployment regions, SLA commitment, API versioning.

**Agent Beta's role:** Implementation planner. Queries those 6 decisions cold (no shared context) and uses them to answer questions about the implementation.

**6 decisions written by Agent Alpha:**

| Key | Value Summary |
|-----|---------------|
| auth_strategy | JWT, 60-minute expiry, refresh tokens |
| rate_limit | 500 rpm per API key, burst to 1200 |
| database_engine | PostgreSQL 16, connection pool 50 |
| deployment_region | Primary us-east-1, failover eu-west-1 |
| sla_uptime | 99.9% uptime monthly, credits at 99.5% |
| api_versioning | URL path (/v3/), 180-day deprecation notice |

**6 probe queries by Agent Beta:**
Same 6 keys retrieved via iranti_query(project/lunar_api_v3, key).

---

## 3. Baseline

Without Iranti, Agent Beta has no access to Alpha's decisions unless:
- Alpha explicitly passes context in a message (requires synchronous coordination)
- A shared document system is used (out of scope)
- Alpha and Beta share a session/context window (defeats the purpose of multi-agent isolation)

**Baseline score: 0/6 (0%) — definitional, not measured.**

---

## 4. Results

| Key | Written by Alpha | Retrieved by Beta | Fidelity |
|-----|-----------------|-------------------|---------|
| auth_strategy | JWT, 60min, refresh=true | JWT, expiry_minutes=60, refresh=true | ✓ exact |
| rate_limit | 500 rpm, burst=1200, per_api_key | 500 rpm, burst=1200, per_api_key | ✓ exact |
| database_engine | PostgreSQL 16, pool=50 | PostgreSQL 16, pool=50 | ✓ exact |
| deployment_region | us-east-1, failover eu-west-1 | us-east-1, failover eu-west-1 | ✓ exact |
| sla_uptime | 99.9%, monthly, credits at 99.5% | 99.9%, monthly, credits at 99.5% | ✓ exact |
| api_versioning | URL path, /v{N}/, 180-day | URL path, /v{N}/, 180-day | ✓ exact |

**Iranti arm: 6/6 (100%), full value fidelity, source attribution intact**

Additional finding: Beta can see `source=agent_alpha` and `validFrom` timestamp on every retrieved fact — provenance is preserved end-to-end.

---

## 5. Key Findings

1. **Exact JSON fidelity**: Values written as structured JSON are retrieved identically. No serialization loss.
2. **Source attribution**: Agent Beta knows who wrote each fact (source=agent_alpha) without Alpha telling it directly.
3. **Timestamp provenance**: validFrom is available to Beta — Beta can determine how recent each decision is.
4. **Synchrony-free coordination**: Agents do not need to be in the same session, same context, or communicating directly.

---

## 6. Interpretation

B8 demonstrates a bounded multi-agent coordination result: exact addressed retrieval and provenance survive across isolated writers/readers. The finding of interest is not merely the 6/6 retrieval score, but the fidelity characteristics: exact value preservation, source visibility, and temporal metadata. Current-version reruns also show that discovery should not be described as a clean coordination primitive: the target entity can be surfaced too broadly through vector-led matches.

---

## 7. Threats to Validity

1. **Definitional baseline**: The 0% baseline is not measured — it is a logical consequence of agent isolation. This is scientifically honest but makes the differential appear stronger than an empirically measured comparison.
2. **Single-agent simulation**: Alpha and Beta are simulated within one session. True multi-agent coordination would involve separate sessions or processes.
3. **Small fact set**: 6 decisions is a minimal test. Real coordination tasks involve hundreds of interdependent facts.
4. **No conflict test**: Did not test what happens when Beta also writes to the same entity — conflict resolution in multi-agent writes is untested.

---

## 8. v0.2.21 Rerun Results

**Executed:** 2026-03-22
**Entity used:** project/b8_coordination_v0221 (fresh; pre-condition found=false confirmed)
**Full trial reports:** results/raw/B8-multiagent-v0221-alpha.md, results/raw/B8-multiagent-v0221-beta.md

### Results

| Key | Written by Alpha | Retrieved by Beta | Fidelity |
|-----|-----------------|-------------------|---------|
| decision_1_architecture | event-sourced CQRS with Kafka as primary broker | exact match | PASS |
| decision_2_retention | 7-day hot retention on Kafka; cold archival to S3 via Kafka Connect | exact match | PASS |
| decision_3_serialization | Apache Avro with Schema Registry; backward-compatible schema evolution only | exact match | PASS |
| decision_4_consumer_groups | max 3 consumer groups per topic; group isolation via Kafka ACLs per service | exact match | PASS |
| decision_5_dlq | dead letter queue per topic; 3 retries at 30s intervals then manual review | exact match | PASS |
| decision_6_monitoring | Prometheus via JMX exporter; consumer lag >10000 triggers PagerDuty | exact match | PASS |

**Retrieval score: 6/6 (100%). Source attribution (source field): 6/6 = "b8_alpha_session_v0221".**

### New finding — Discovery gap

iranti_search returned empty results for both discovery queries ('b8 coordination v0221 architectural decisions', 'b8_coordination_v0221'). Direct entity+key retrieval succeeded 6/6. This establishes an important distinction: the KB functions as a reliable addressed retrieval store (entity+key known), but not as a discoverable shared workspace via natural language search. Real multi-agent coordination requires agents to share a naming convention or schema, not just shared KB access.

iranti_who_knows was denied (permission not available in execution environment). Source attribution was verified via the `source` field in query responses only.

### Comparison to v0.2.16

v0.2.16 used entity project/lunar_api_v3 with 6 API architecture decisions. v0.2.21 uses entity project/b8_coordination_v0221 with 6 Kafka/event-sourced architecture decisions. Both executions produced 6/6 retrieval with exact value fidelity and source attribution intact. The discovery gap (search returns empty) was also present in prior executions. Baseline is definitional 0 in both runs.

---

## 9. Citations

Packer, C., et al. (2023). MemGPT: Towards LLMs as Operating Systems. arXiv:2310.08560.

---

## 10. v0.2.37 Installed-Product Rerun Results

**Executed:** 2026-03-26
**Runtime under test:** installed-product instance `bench_b4_v0236` reporting `0.2.37`
**Entity used:** `project/b8_coordination_v0237r1` (fresh; pre-condition found=false confirmed)
**Artifact:** `results/raw/B8-v0237r1-execution.json`
**Process boundary:** Alpha and Beta were executed as separate `powershell.exe` client processes against the same installed Iranti runtime.

### Results

| Dimension | Result |
|---|---|
| Alpha preflight contamination check | PASS (`found=false`) |
| Alpha writes | 6/6 created |
| Beta discovery target hits | 4/4 queries surfaced the target entity |
| Discovery lexical support | 1/4 target hits had positive lexical support |
| Discovery classification | `vector-led` |
| Explicit retrieval | 6/6 exact |
| Source attribution via query | 6/6 `source=b8_alpha_session_v0237` |
| Attribution via `whoKnows` | PASS (`b8_agent_alpha_v0237`, 6 contributions) |

### New finding - discovery is no longer sparse, it is vector-led and over-broad

The current rerun does not reproduce the v0.2.21 "search often empty" pattern.
Instead, all four prescribed discovery queries surfaced the target entity, but only one
of those hits had positive lexical support:

- Query a (`HorizonStream architecture decisions`) returned the target entity at rank 0 via vector similarity only.
- Query b (`Kafka event-sourced CQRS`) returned the target entity with positive lexical support.
- Queries c and d also surfaced the target, again via vector-led matches.

That means the honest current-version interpretation is:

- shared-KB addressed retrieval still works exactly across isolated client processes
- search is no longer too weak to discover the entity
- search is also not precise enough to treat as a reliable coordination primitive, because clearly off-target or structurally weak queries can still surface the target through broad vector similarity

### Comparison to v0.2.21

| Dimension | v0.2.21 | v0.2.37 |
|---|---|---|
| Explicit retrieval | 6/6 | 6/6 |
| Source-field attribution | 6/6 | 6/6 |
| `whoKnows` attribution | unavailable in that environment | available and correct |
| Search discovery | partial / sparse | vector-led / over-broad |

### Current family conclusion

The B8 family should now be stated more narrowly:

1. Iranti still supports exact cross-process addressed retrieval through the shared KB.
2. Provenance is preserved through both the `source` field and `whoKnows`.
3. The coordination story should not lean on search as a clean discovery primitive.
4. The honest current limitation is no longer "search cannot find the entity"; it is "search can find it too broadly, especially through vector-only matches."
