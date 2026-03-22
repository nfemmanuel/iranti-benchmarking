# Benchmark B8: Multi-Agent Coordination via Shared KB

**Family:** Multi-agent coordination / shared persistent state
**Motivated by:** The general problem of inter-agent information sharing in stateless LLM systems. Background: Packer et al. (2023) sketch multi-agent KB coordination as a use case but do not provide a quantitative evaluation protocol for this scenario. This benchmark uses an original design (two isolated agent sessions coordinating via shared KB) with a definitional baseline (no shared store = zero information transfer by construction).
**Executed:** 2026-03-21
**Status:** Complete — first execution

---

## 1. What This Benchmark Measures

Whether Iranti enables two agents to coordinate on a shared task without explicit message-passing — using only the shared KB as a coordination medium.

The core scenario: Agent Alpha makes architectural decisions and writes them to the KB. Agent Beta, operating with no shared context with Alpha, needs those decisions to implement its own portion of the work. Without Iranti, Beta cannot access Alpha's decisions (0% information transfer). With Iranti, Beta queries the KB and retrieves all decisions exactly as written (exact information transfer).

This tests:
- **Information fidelity**: Are facts written by Agent A retrieved identically by Agent B?
- **Source attribution**: Can Agent B see who wrote the fact (source=agent_alpha)?
- **Structural coordination**: Can agents use a shared entity namespace as an implicit communication channel?
- **Baseline definitional**: Without Iranti, multi-agent coordination requires explicit context passing — the baseline is 0% by definition, not by measurement.

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

B8 demonstrates Iranti's core multi-agent value proposition directly. The differential is definitional rather than probabilistic: without a shared persistent store, two isolated agents cannot share information. With Iranti, the KB serves as an asynchronous, typed, versioned coordination channel.

The finding of interest is not the score (100% is expected) but the fidelity characteristics: exact value preservation, source visibility, temporal metadata. These properties distinguish Iranti's coordination pattern from loose message passing.

---

## 7. Threats to Validity

1. **Definitional baseline**: The 0% baseline is not measured — it is a logical consequence of agent isolation. This is scientifically honest but makes the differential appear stronger than an empirically measured comparison.
2. **Single-agent simulation**: Alpha and Beta are simulated within one session. True multi-agent coordination would involve separate sessions or processes.
3. **Small fact set**: 6 decisions is a minimal test. Real coordination tasks involve hundreds of interdependent facts.
4. **No conflict test**: Did not test what happens when Beta also writes to the same entity — conflict resolution in multi-agent writes is untested.

---

## 8. Citations

Packer, C., et al. (2023). MemGPT: Towards LLMs as Operating Systems. arXiv:2310.08560.
