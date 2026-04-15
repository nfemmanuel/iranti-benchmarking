# Benchmark B9: Entity Relationship Graph (iranti_relate)

**Family:** API capability audit (iranti_relate / iranti_related / iranti_related_deep)
**Original design:** API capability audit for iranti_relate, iranti_related, and iranti_related_deep. Note: Knowledge graph embedding benchmarks (FB15k, YAGO) are not applicable here — those benchmarks evaluate link prediction accuracy for trained embedding models. This benchmark evaluates whether the relationship graph API is functional end-to-end.
**Executed:** 2026-03-21
**Status:** Complete — first execution


> **Program context:** For the canonical current benchmark state, start with [`articles/CURRENT-BENCHMARK-STATE.md`](../../articles/CURRENT-BENCHMARK-STATE.md) and [`papers/CURRENT-BENCHMARK-STATE-TECHNICAL.md`](../../papers/CURRENT-BENCHMARK-STATE-TECHNICAL.md). This family document should be read as one track within that broader current-state record.

---

## 1. What This Benchmark Measures

Whether Iranti's `iranti_relate` capability can store typed relationship edges between entities and whether those edges are subsequently queryable by agents.

This tests:
- **Write fidelity**: Are relationship edges created successfully with properties?
- **Discoverability**: Can agents find relationship edges via iranti_search?
- **Agent interface completeness**: Is the relationship graph readable through MCP tools?

---

## 2. Setup

5 directed relationship edges written between researcher entities:

| From | Type | To | Properties |
|------|------|----|------------|
| researcher/alice_chen | CO_AUTHORED_WITH | researcher/bob_okafor | ACL 2024 paper |
| researcher/alice_chen | COLLABORATES_WITH | researcher/chen_wei_mit | MIT NLP Lab project |
| researcher/alice_chen | FORMERLY_COLLEAGUES_WITH | researcher/lena_gross | OpenAI overlap 2019-2021 |
| researcher/bob_okafor | COLLABORATES_WITH | researcher/marcus_lin | Stanford Embodied AI |
| researcher/lena_gross | CITES_WORK_OF | researcher/aisha_okonkwo | RLHF citing AI safety |

---

## 3. Results

| Test | Result |
|------|--------|
| All 5 edges created | ✓ (ok=true for all) |
| Properties stored | ✓ (JSON accepted) |
| iranti_search returns edges | ✗ (relationships not in search index) |
| MCP query tool available | ✗ (no iranti_query_relationship tool) |

---

## 4. Key Finding: Write-Only Relationship Graph for Agents

iranti_relate successfully writes relationship edges. However, agents have no MCP tool to read them back. The relationships table is not indexed by iranti_search. The control-plane REST API (GET /relationships) can retrieve edges, but this endpoint is not accessible as an MCP tool.

The relationship graph is currently a write-only store from the agent's perspective. This limits its utility for agent-accessible graph reasoning.

---

## 5. Threats to Validity

1. The REST API (GET /relationships) may be usable if agents had HTTP access — not tested
2. iranti_search may index relationship data in future versions — current test is version-specific
3. Only write success was confirmed; edge deduplication behavior is not tested
4. Relationship direction and type conventions are caller-defined with no schema enforcement

---

## 6. v0.2.37 Installed-Product Rerun (2026-03-26)

Rerun executed against a fresh disposable installed-product instance:

- instance: `bench_b4_v0236`
- product version: `0.2.37`
- surface: HTTP API on `http://localhost:3511`
- raw artifact: `results/raw/B9-v0237-execution.json`

### Setup

4 directed relationship edges were written:

| From | Type | To | Properties |
|------|------|----|------------|
| researcher/b9_v0237_ada_osei | CO_AUTHORED_WITH | researcher/b9_v0237_ben_marchetti | Federated Graph Learning / ACL 2025 |
| researcher/b9_v0237_ada_osei | COLLABORATES_WITH | researcher/b9_v0237_chen_park | NeuroSym Initiative |
| researcher/b9_v0237_ben_marchetti | CITES_WORK_OF | researcher/b9_v0237_diana_sato | citation_count=7 |
| researcher/b9_v0237_diana_sato | FORMERLY_COLLEAGUES_WITH | researcher/b9_v0237_ada_osei | Google Brain 2020-2022 |

### Results

| Test | Result |
|------|--------|
| 4/4 relationship writes | yes |
| 1-hop read from ada | yes, 3/3 expected edges present |
| Deep traversal from ada (depth=2) | yes, expected second-hop citation edge present |
| Plain search returns relationship edges | no |

Observed timings:

- first relationship write: `246.506 ms`
- subsequent relationship writes: `5.652-6.253 ms`
- 1-hop retrieval: `47.608 ms`
- depth-2 traversal: `27.071 ms`
- lexical search probe: `46.667 ms`
- natural-language search probe: `28.089 ms`

### Updated Finding

The installed `0.2.37` product confirms that the relationship subsystem is a functional read-write graph surface:

- typed edges can be written successfully
- 1-hop reads preserve direction and properties
- deep traversal works and surfaces second-hop edges

The old v0.2.21 permission-gated result should no longer be treated as a product-level relationship failure. It was a session-surface problem, not evidence that the underlying relationship subsystem had regressed.

### Limitation That Still Stands

`iranti_search` still does not surface relationship edges. Search returned seeded codebase facts, not relationship rows. The graph is now readable and traversable through the dedicated relationship surface, but relationship discovery still does not occur through the standard fact-search index.

### Current Honest Claim

`B9` now stands as:

- relationship graph usability refreshed on installed `0.2.37`
- write/read/traversal works
- search-index integration still absent
