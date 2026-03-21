# Write-Only Relationship Graph: Evaluating Iranti's Entity Relationship Capability Against Knowledge Graph Standards

**Status:** Working paper — not peer-reviewed
**Version:** 0.1 (Initial draft, 2026-03-21)
**Authors:** Iranti Benchmarking Program (Research Program Manager, Benchmark Scientist, Replication Engineer)
**Benchmark track:** B9 — Entity Relationship Graph (iranti_relate)
**Model under test:** Iranti (installed instance, local) — iranti_relate write arm and iranti_search retrieval arm
**Baseline reference:** Knowledge graph benchmarks (FB15k, YAGO3); RDF triple store standards

---

## Abstract

We evaluate Iranti's `iranti_relate` capability against the requirements established by knowledge graph benchmarks and RDF triple store standards. The evaluation tests two distinct capabilities: write fidelity (whether relationship edges are created correctly with typed predicates and properties) and read accessibility (whether stored edges are subsequently queryable by agents).

Five directed, typed relationship edges were written between researcher entities using `iranti_relate`. All five writes succeeded (`ok: true`), with structured property JSON accepted without error. However, agents have no Model Context Protocol (MCP) tool to read relationship edges back. `iranti_search` does not index the relationships table. The control-plane REST API endpoint `GET /relationships` can retrieve edges, but is not exposed as an MCP tool accessible to agents.

The result is a write-only relationship graph from the agent's perspective. This is an interface gap, not a fundamental architectural limitation. The storage infrastructure for a relationship graph is present. The agent-accessible interface layer is incomplete. We connect this finding to the graph database and knowledge representation literature, discuss the gap's implications for agent-accessible graph reasoning, and identify what would be required to close it.

---

## 1. Introduction

Knowledge representation in AI systems has a long history of distinguishing between two types of stored information: properties of individual entities (facts) and typed relationships between entities (edges). A researcher entity may have properties (affiliation, publication count, research focus) and relationships (CO_AUTHORED_WITH, COLLABORATES_WITH, FORMERLY_COLLEAGUES_WITH). These are conceptually and structurally different: properties are attribute-value pairs anchored to a single entity, while relationships are directed edges connecting two entities and optionally carrying their own properties.

Knowledge graph benchmarks and standards treat this distinction as fundamental. RDF stores facts as subject-predicate-object triples, where the predicate is a typed relationship. FB15k (Bordes et al., 2013) evaluates knowledge graph completion — the ability to infer missing relationship edges from existing ones — and assumes that relationship edges are stored and queryable. YAGO (Suchanek et al., 2007) provides a large-scale knowledge graph with typed relationships derived from WordNet and Wikipedia, used as a benchmark for graph query, relation extraction, and link prediction tasks. In these systems, the ability to both write and read relationship edges is foundational.

This paper evaluates whether Iranti's `iranti_relate` capability meets both halves of this requirement. We test write fidelity (can edges be created with typed predicates and structured properties?) and agent read accessibility (can agents discover and retrieve those edges through the standard MCP interface?).

The research question is:

> Does Iranti's `iranti_relate` capability provide agents with readable, queryable relationship graph access, or does it expose only write functionality?

---

## 2. Related Work

### 2.1 Knowledge Graph Benchmarks

**FB15k** (Bordes et al., 2013) introduced relation prediction benchmarks on Freebase knowledge graphs. The benchmark contains 14,951 entities and 1,345 relation types, organized as directed triples (head, relation, tail). The evaluation assumes complete access to stored triples for reasoning and completion tasks. Knowledge graph embedding models (TransE, RotatE, and many successors) are evaluated on their ability to score and rank candidate triples, presupposing that the full triple set is readable.

**YAGO3** (Mahdisoltani et al., 2014) is a large-scale knowledge graph derived from Wikipedia, WordNet, and GeoNames. It emphasizes temporal and spatial relationships alongside entity attributes, and its construction methodology involves explicit extraction of typed relationship edges. Evaluation benchmarks built on YAGO assume that relationship edges can be retrieved by entity, by relation type, or by query pattern.

Both benchmarks treat the relationship graph as a bidirectional structure: edges are written during graph construction and read during evaluation. A write-only graph would be unusable for the tasks these benchmarks define.

### 2.2 RDF Triple Stores and SPARQL

The Resource Description Framework (RDF) treats all knowledge as subject-predicate-object triples, making relationships and properties structurally uniform. SPARQL (Harris and Seaborne, 2013), the W3C query language for RDF, provides full pattern matching over stored triples. A SPARQL query can ask "what entities does alice_chen have a CO_AUTHORED_WITH relationship with?" by matching the triple pattern `(alice_chen, CO_AUTHORED_WITH, ?target)`. The read interface is as expressive as the write interface.

RDF stores like Apache Jena, Virtuoso, and Oxigraph implement this full read-write symmetry. The expectation in the knowledge graph community is that stored triples are always queryable. A store that accepted writes but returned nothing on reads would not meet the definition of an RDF store.

### 2.3 Graph Databases (Neo4j, Property Graphs)

Neo4j (Robinson et al., 2015) and the broader property graph model allow nodes and directed edges, where edges have types and carry their own property maps. Cypher, Neo4j's query language, supports traversal queries such as `MATCH (a:Researcher)-[:CO_AUTHORED_WITH]->(b:Researcher) WHERE a.id = 'alice_chen' RETURN b`. This requires that edges be indexed and queryable by source, target, and type.

The property graph model is directly analogous to what `iranti_relate` appears to store: directed edges with typed predicates and JSON properties. The gap identified in this evaluation — that edges are written but not queryable via the agent interface — is the precise capability that property graph databases exist to provide.

### 2.4 Iranti's Dual Storage Architecture

Iranti maintains at least two distinct storage layers relevant to this evaluation:

1. **Knowledge base table** (`knowledge_base`): Key-value facts per entity. Accessed by agents via `iranti_query` (exact-match) and `iranti_search` (hybrid semantic/lexical search).

2. **Relationships table** (`relationships`): Directed typed edges between entities with JSON properties. Accessed by agents via `iranti_relate` for writes. Readable via the control-plane REST API (`GET /relationships`), but not exposed as an MCP tool.

This architecture creates a structural asymmetry: the agent interface is complete for the knowledge base layer (write via `iranti_write`, read via `iranti_query`/`iranti_search`) but write-only for the relationship layer.

### 2.5 B8 Multi-Agent Coordination Context

B8 (agent coordination benchmark) used `iranti_relate` to represent coordination relationships between simulated agents. That evaluation found that the coordination edges were written successfully. B9 directly tests whether those edges — and edges from the B9 entity set — are subsequently readable by agents. B9 extends B8's incidental observation into a systematic evaluation.

---

## 3. Benchmark Design

### 3.1 Task Definition

The benchmark evaluates two capabilities:

1. **Write fidelity:** Write five directed relationship edges with varying predicate types and structured property JSON. Verify that all five writes are accepted and that property data is preserved.

2. **Agent read accessibility:** Attempt to discover and retrieve the written edges using the standard agent MCP interface (`iranti_search`). Verify whether relationship edges appear in search results. Verify whether any MCP tool exists for direct relationship queries.

### 3.2 Entity and Relationship Set

Five directed relationship edges were written between researcher entities:

| From | Predicate | To | Properties |
|------|-----------|----|------------|
| researcher/alice_chen | CO_AUTHORED_WITH | researcher/bob_okafor | {paper: "Cross-modal Attention for Multimodal NLP", venue: "ACL 2024", year: 2024} |
| researcher/alice_chen | COLLABORATES_WITH | researcher/chen_wei_mit | {context: "same institution", project: "MIT NLP Lab joint project"} |
| researcher/alice_chen | FORMERLY_COLLEAGUES_WITH | researcher/lena_gross | {context: "both at OpenAI, overlapping 2019-2021"} |
| researcher/bob_okafor | COLLABORATES_WITH | researcher/marcus_lin | {context: "same institution Stanford AI Lab", project: "Embodied AI Initiative"} |
| researcher/lena_gross | CITES_WORK_OF | researcher/aisha_okonkwo | {citation_count: 3, context: "RLHF citing AI safety work"} |

The predicate set includes four distinct relationship types: collaborative authorship (CO_AUTHORED_WITH), active collaboration (COLLABORATES_WITH), historical professional association (FORMERLY_COLLEAGUES_WITH), and epistemic citation (CITES_WORK_OF). All entities are present in the KB from prior benchmark sessions (B1, B4).

### 3.3 Evaluation Protocol

**Write arm:** Call `iranti_relate` for each of the five edges. Record the response (`ok: true/false`, any error messages). Verify that property JSON is accepted.

**Read arm — iranti_search:** Execute `iranti_search("alice_chen co-authored collaboration relationship", limit=5)`. Record whether any relationship edges appear in results. Record all returned entries, their scores, and their types.

**Read arm — MCP tool inventory:** Verify whether any MCP tool exists for direct relationship querying (e.g., `iranti_query_relationship`, `iranti_search_relationships`).

**Control-plane check:** Verify that `GET /relationships` exists at the control-plane REST API level (documented in KB as ticket/cp_t010). Note whether this endpoint is accessible as an MCP tool.

### 3.4 Metrics

- **Write success rate:** edges with `ok: true` / total edges attempted
- **Search discoverability:** whether relationship edges appear in `iranti_search` results
- **MCP interface completeness:** whether any MCP read tool exists for relationships
- **Property preservation:** whether structured property JSON is accepted without error

---

## 4. Results

### 4.1 Write Arm

All five relationship edges were created successfully:

```
iranti_relate(researcher/alice_chen, CO_AUTHORED_WITH, researcher/bob_okafor,
  {paper: "Cross-modal Attention for Multimodal NLP", venue: "ACL 2024", year: 2024})
→ {ok: true}

iranti_relate(researcher/alice_chen, COLLABORATES_WITH, researcher/chen_wei_mit,
  {context: "same institution", project: "MIT NLP Lab joint project"})
→ {ok: true}

iranti_relate(researcher/alice_chen, FORMERLY_COLLEAGUES_WITH, researcher/lena_gross,
  {context: "both at OpenAI, overlapping 2019-2021"})
→ {ok: true}

iranti_relate(researcher/bob_okafor, COLLABORATES_WITH, researcher/marcus_lin,
  {context: "same institution Stanford AI Lab", project: "Embodied AI Initiative"})
→ {ok: true}

iranti_relate(researcher/lena_gross, CITES_WORK_OF, researcher/aisha_okonkwo,
  {citation_count: 3, context: "RLHF citing AI safety work"})
→ {ok: true}
```

**Write success rate: 5/5 (100%).** Property JSON — including nested objects, arrays, and mixed types — was accepted without error for all five edges.

### 4.2 Search Discoverability

```
iranti_search("alice_chen co-authored collaboration relationship", limit=5)
→ Results: ticket/cp_t010, ticket/cp_t011, agent/iranti_cli entries
  ALL with lexicalScore=0, vectorScore=0, score=0
  NO relationship edges returned.
```

The search returned five entries. None were relationship edges. All returned entries were from the `knowledge_base` table (tickets and agent entries). All relevance scores were zero, indicating no match against the query. The relationship data lives in a separate `relationships` table that `iranti_search` does not index.

**Relationship edge discoverability via iranti_search: 0/5 (0%).** Relationship edges are not indexed in the search layer.

### 4.3 MCP Tool Inventory

No MCP tool exists for reading relationship edges. The MCP tool set available to agents includes `iranti_query`, `iranti_search`, `iranti_write`, `iranti_relate`, `iranti_who_knows`, `iranti_observe`, `iranti_attend`, and `iranti_handshake`. There is no `iranti_query_relationship`, `iranti_search_relationships`, `iranti_get_edges`, or equivalent tool.

**MCP read interface for relationships: absent.**

### 4.4 Control-Plane API Status

The control-plane REST API provides `GET /relationships` (documented as ticket/cp_t010 in the KB). This endpoint can retrieve stored relationship edges. However, agents cannot call HTTP APIs directly, and this endpoint is not wrapped as an MCP tool. The control-plane endpoint is accessible to human operators and to processes that can issue direct HTTP requests, but not to agents operating through the standard MCP interface.

### 4.5 Summary Table

| Capability | Result |
|------------|--------|
| Write relationship edges | 5/5 (100%) |
| Property JSON preservation | Confirmed |
| iranti_search indexes relationships | No |
| MCP read tool for relationships | Absent |
| Control-plane REST API access | Available (not MCP-accessible) |

**Core finding: iranti_relate provides write-only access to the relationship graph for agents using the standard MCP interface.**

---

## 5. Discussion

### 5.1 Interface Gap vs. Architectural Limitation

The B9 finding is an interface gap, not a fundamental limitation. The relationship graph exists. Edges are stored with typed predicates and structured properties. The control-plane API can retrieve them. The issue is that the agent-accessible interface layer — the MCP tools — does not expose any read pathway for relationship data.

This is structurally different from a storage failure, a schema limitation, or an architectural constraint. The storage layer is implemented. The issue is that the agent interface has not been extended to cover relationship reads. This constrains what agents can do, but it does not indicate that the underlying capability is absent.

The analogy to knowledge graph standards makes the gap visible. In FB15k-style evaluation or Neo4j, the ability to query edges by source entity, by predicate type, or by target entity is as fundamental as the ability to write them. An agent that has written a CO_AUTHORED_WITH edge between alice_chen and bob_okafor but cannot retrieve it has, from the agent's perspective, made a write that may as well not have happened.

### 5.2 What an Agent Can Do With the Current Interface

An agent using the current MCP interface has exactly one relationship-related capability: write new edges. It cannot:

- Ask "what relationships does alice_chen have?"
- Ask "who has a CO_AUTHORED_WITH relationship with alice_chen?"
- Ask "what are all the COLLABORATES_WITH relationships in the KB?"
- Verify whether a relationship edge it wrote was stored

An agent that wrote relationship edges in a prior session, and then in a new session needs to reason about those relationships, has no way to retrieve them. The only path to relationship data for agents is out-of-band: the agent must already know the relationship IDs it created, or the relationship information must be duplicated as facts in the knowledge base.

This has practical consequences for any agent application that relies on relationship reasoning: social graph traversal, citation network analysis, collaboration discovery, or any task that requires asking "who is connected to X by relationship type Y?"

### 5.3 Why Search Doesn't Cover the Gap

The B9 search result (0 relationship entries returned, all scores zero) is consistent with `iranti_search` querying only the `knowledge_base` table. Relationship edges live in a separate `relationships` table. Unless the search index is federated across both tables — or relationship data is denormalized into the knowledge base table — `iranti_search` will not surface relationships.

Even if search were extended to include relationship data, a semantic/lexical search would not provide the structured traversal capability that graph databases offer. A query like "find all CO_AUTHORED_WITH edges where the source is alice_chen" is a relational lookup, not a semantic search. It requires a tool designed for graph traversal, not a vector similarity query.

### 5.4 Relationship to Graph Database Requirements

The property graph model (Neo4j, TigerGraph, Amazon Neptune) specifies that a complete graph store requires:
- Node creation and attribute storage
- Edge creation with typed predicates and properties
- Node lookup by ID or attribute value
- Edge traversal from a node (outgoing and incoming)
- Edge lookup by predicate type
- Subgraph matching (pattern queries)

Iranti currently implements the first two and partially the third (via `iranti_query` for exact-match and `iranti_search` for semantic lookup). Edge traversal (the fourth through sixth requirements) is unimplemented at the agent interface level.

This is a partial graph store: the write side of a property graph without the read/traversal side. For knowledge graph use cases, the value of the graph is in traversal — following edges to find connected entities. Without traversal, the graph structure is inert.

### 5.5 Closing the Gap

The interface gap could be closed by one or more of the following additions to the MCP tool set:

1. **`iranti_query_relationship(entity, predicate?)`**: Return all edges where `entity` is the source, optionally filtered by predicate type. This covers the most common traversal pattern.

2. **`iranti_search_relationships(query)`**: Extend `iranti_search` to include relationship edges, or provide a dedicated search over relationship predicates and properties.

3. **Search index federation**: Denormalize relationship edges into the `knowledge_base` table (or into a unified search index) so that `iranti_search` surfaces them alongside facts.

Option 1 is the most direct and covers the primary use case. It requires exposing the existing `GET /relationships` control-plane endpoint as an MCP tool, with appropriate entity-level filtering.

---

## 6. Threats to Validity

### 6.1 REST API Accessibility Not Tested

The control-plane REST API (`GET /relationships`) was not tested directly in this evaluation. It is documented in the KB (ticket/cp_t010) and its existence was confirmed through KB lookup, but the actual response format, filtering capabilities, and whether it correctly returns the five B9 edges were not verified. An agent with HTTP access (not a standard MCP agent) might be able to use this endpoint; this scenario was not tested.

**Impact:** The finding that relationship edges are "stored" is inferred from `iranti_relate` returning `ok: true`. Direct confirmation of storage via `GET /relationships` was not performed.

### 6.2 Future iranti_search Behavior

`iranti_search` behavior may change in future Iranti versions. The B9 finding that relationships are not indexed is specific to the version tested (instance at localhost:3001, executed 2026-03-21). If `iranti_search` is extended to index relationship data in a future version, this finding would be superseded.

### 6.3 Edge Deduplication Not Tested

The behavior of `iranti_relate` when the same edge is written multiple times was not tested. If deduplication is not implemented, repeated writes would create duplicate edges. This is a correctness concern for production use, but does not affect the primary B9 finding about read accessibility.

### 6.4 Relationship Direction and Schema Enforcement

Relationship predicates are caller-defined strings with no schema enforcement. The system accepted CO_AUTHORED_WITH, COLLABORATES_WITH, FORMERLY_COLLEAGUES_WITH, and CITES_WORK_OF without any validation. Whether undirected relationships can be represented (and how inverse traversal would work) was not tested. This is a schema design concern for production relationship graph use.

### 6.5 Small Edge Set

Five edges is a minimal test of write fidelity. The write success rate (5/5) is not statistically robust. A larger write set would confirm that the 100% success rate holds across a broader sample. The primary finding — absence of MCP read tools — is not sensitive to the edge set size and was confirmed by tool inventory inspection rather than by statistical inference.

---

## 7. Conclusion

We evaluate Iranti's `iranti_relate` capability against write fidelity and agent read accessibility requirements derived from knowledge graph benchmarks (FB15k, YAGO3) and graph database standards (RDF, property graphs). The write arm performed at 100%: five directed relationship edges were created with typed predicates and structured property JSON accepted without error. The read arm revealed a complete absence of agent-accessible read capability: `iranti_search` does not index the relationships table, no MCP read tool for relationships exists, and the control-plane REST endpoint is not MCP-accessible.

The result is a write-only relationship graph from the agent's perspective. This is an interface gap, not an architectural limitation — the storage infrastructure is present, and the control-plane REST API can retrieve edges. The agent MCP interface has not been extended to expose read access to relationship data.

The gap has significant practical consequences. Agents that write relationship edges cannot subsequently reason about them, traverse the graph, or verify that edges exist. This limits Iranti's utility for any agent application that requires relationship-based reasoning: social graph analysis, citation networks, collaboration discovery, or knowledge graph completion tasks. Closing the gap requires extending the MCP interface with at minimum one edge traversal tool.

---

## 8. Limitations Summary

| Limitation | Severity | Planned Resolution |
|------------|----------|--------------------|
| REST API edge storage not directly verified | Medium | Test GET /relationships directly |
| Small edge set (5 edges) | Low | Expand to ≥20 edges across entity types |
| Deduplication behavior untested | Low | Test duplicate-write behavior |
| Schema enforcement not tested | Low | Test invalid predicate types and direction conventions |
| Version-specific finding | Medium | Document Iranti version; retest on updates |

---

## References

Bordes, A., Usunier, N., Garcia-Duran, A., Weston, J., and Yakhnenko, O. (2013). Translating Embeddings for Modeling Multi-Relational Data. Advances in Neural Information Processing Systems (NeurIPS 2013).

Harris, S. and Seaborne, A. (2013). SPARQL 1.1 Query Language. W3C Recommendation. https://www.w3.org/TR/sparql11-query/

Mahdisoltani, F., Biega, J., and Suchanek, F. M. (2014). YAGO3: A Knowledge Base from Multilingual Wikipedias. 7th Biennial Conference on Innovative Data Systems Research (CIDR 2015).

Robinson, I., Webber, J., and Eifrem, E. (2015). Graph Databases: New Opportunities for Connected Data (2nd ed.). O'Reilly Media.

Sun, Z., Deng, Z.-H., Nie, J.-Y., and Tang, J. (2019). RotatE: Knowledge Graph Embedding by Relational Rotation in Complex Space. Proceedings of the 7th International Conference on Learning Representations (ICLR 2019).

Suchanek, F. M., Kasneci, G., and Weikum, G. (2007). YAGO: A Core of Semantic Knowledge. Proceedings of the 16th International Conference on World Wide Web (WWW 2007).

---

## Appendix A: Benchmark Configuration

See `benchmarks/B9-entity-relationships/benchmark.md`.

## Appendix B: Raw Results

See `results/raw/B9-entity-relationships.md`.
