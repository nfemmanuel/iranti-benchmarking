# Iranti Can Write Relationships Between Things — But Agents Can't Read Them Back

**Series:** Iranti Benchmark Journal
**Track:** B9 — Entity Relationship Graph (iranti_relate)
**Date:** March 2026
**Audience:** Technical generalists — developers, AI researchers, curious readers

---

## The Question Behind This Test

Facts about a single thing are straightforward. Alice Chen works at MIT. She has published 28 papers. Her research focus is interpretable machine learning. These are properties of one entity.

But knowledge isn't just a collection of isolated facts. It also includes connections between things. Alice Chen co-authored a paper with Bob Okafor. She and Lena Gross worked at the same organization for two years. Lena Gross's work cites Aisha Okonkwo's AI safety research.

These are relationships — directed, typed edges connecting two entities. They're what turns a collection of facts into a knowledge graph.

Iranti has a tool for writing these: `iranti_relate`. You specify two entities, a relationship type, and any supporting properties. This benchmark asks the obvious follow-up question: once you've written a relationship, can the agent read it back?

---

## What We Actually Tested

We wrote five relationship edges between researcher entities that already exist in the Iranti knowledge base from prior benchmark sessions:

- Alice Chen **co-authored** a paper with Bob Okafor (ACL 2024)
- Alice Chen **collaborates with** Chen Wei at MIT
- Alice Chen **was formerly colleagues with** Lena Gross (both at OpenAI, 2019–2021)
- Bob Okafor **collaborates with** Marcus Lin at Stanford
- Lena Gross **cites the work of** Aisha Okonkwo (RLHF citing AI safety research)

Each edge was written with structured properties — paper titles, venues, project names, context notes.

Then we tried to read them back.

---

## What We Found

The writes all succeeded. Every single one: `{ok: true}` across the board. The relationship data, including the structured JSON properties, was accepted without error.

Then we searched for the relationships using `iranti_search` — the standard tool agents use to find information in Iranti's knowledge base.

Zero results.

Not "low confidence results." Not "results without the right entity." No relationship edges appeared at all. The search returned five entries from the knowledge base — tickets and configuration entries — with all relevance scores at zero. The relationships Alice Chen's edges, the collaboration edges, the citation edge: none of them showed up.

We also looked for any other MCP tool that could query relationship edges directly. Something like `iranti_query_relationship` or `iranti_get_edges`. There isn't one.

What does exist is a control-plane REST API endpoint — `GET /relationships` — that can retrieve the stored edges. But agents operate through MCP tools, not direct HTTP calls. That endpoint is not wrapped as a tool agents can use.

---

## The Actual Situation

Here's the state of things:

| Action | Available to agents? |
|--------|---------------------|
| Write a relationship edge | Yes — iranti_relate works |
| Search for relationship edges | No — iranti_search doesn't index them |
| Query edges by entity | No — no such MCP tool |
| Read edge properties | No — no agent read path |
| Verify an edge was stored | No |

The relationships are written. They go somewhere — there's a separate `relationships` table in Iranti's storage layer, and the control-plane API can access it. But from an agent's perspective, those edges vanish the moment they're written. The agent cannot get them back.

This is what we mean when we call it a write-only relationship graph.

---

## Is This a Bug or a Missing Feature?

It's important to be precise here, because the framing matters for what comes next.

This is not a storage failure. The data is stored. It is not a fundamental architectural problem. The infrastructure to build a readable relationship graph is there — the storage layer exists, the data model supports typed edges with properties, and the control-plane API already reads them.

What's missing is an agent-accessible interface to that data. The MCP tool set — the set of tools agents can call — was never extended to include relationship reads. The write tool (`iranti_relate`) was added; the corresponding read tools were not.

In knowledge graph terms: you built a property graph database, implemented the write half, and left the read half for later. The graph exists but no agent can traverse it.

---

## Why This Matters

Knowledge graphs in computer science exist specifically because relationship traversal is valuable. The whole point of storing that Alice Chen co-authored with Bob Okafor, rather than just noting it as a text fact, is that you can then query the graph: "Who has Alice co-authored with?" "What are all the people in her collaboration network two hops away?" "Who cites Aisha Okonkwo's work?"

None of those queries are possible through the current agent interface. An agent that wrote relationship edges in one session comes back in a new session knowing nothing about those edges. The relationships exist in the database but the agent can't see them. For any application that needs relationship reasoning — social graphs, citation networks, collaboration discovery, multi-hop traversal — this is a blocking limitation.

It also creates a peculiar situation where the agent must choose between two imperfect workarounds:

1. Duplicate the relationship as a fact in the knowledge base (e.g., write a key "co_authored_with" on the alice_chen entity with value "bob_okafor"). This is queryable but loses the property-graph structure.

2. Trust that the agent will remember the relationship IDs it created. This only works within a single session and is fragile.

Neither is a substitute for a proper read interface.

---

## What Would Fix It

The gap is specific and the fix is visible. Iranti's control-plane REST API already has `GET /relationships`. Making that accessible as an MCP tool — something like `iranti_query_relationship(entity, relationship_type?)` — would allow agents to traverse the graph.

A minimal version of that tool would answer: "Given an entity, return all relationship edges where that entity is the source." That covers the most common use case: an agent wants to know what relationships a known entity has.

A more complete version would also support querying by target entity ("who has a CO_AUTHORED_WITH relationship pointing to alice_chen?") and by relationship type across the whole graph.

Nothing about the current architecture prevents this. The data is there. The endpoint exists. It's an interface extension, not a rearchitecting.

---

## What This Benchmark Can and Cannot Claim

**Confirmed:**
- `iranti_relate` writes directed relationship edges successfully (5/5)
- Structured property JSON is accepted and preserved
- `iranti_search` returns zero relationship edges (all scores zero)
- No MCP read tool for relationships exists
- Control-plane REST API exists but is not agent-accessible

**Not confirmed:**
- What exactly `GET /relationships` returns (not tested directly)
- Whether edge deduplication is implemented
- Whether future Iranti versions will extend MCP access to relationship reads
- Whether the edges are correctly stored with all properties (confirmed only by `ok: true` response, not by retrieval)

**The main finding, stated conservatively:** Iranti's `iranti_relate` capability provides agent-accessible write access to a relationship graph. Agent-accessible read access does not currently exist through the MCP interface. This is an interface gap. The underlying storage infrastructure is present.

---

## Where This Fits in the Benchmark Program

Iranti's write capabilities have generally performed well across the benchmark program. `iranti_write` produces reliable structured storage. `iranti_query` retrieves exact-match facts correctly. This evaluation finds that the write-side reliability extends to relationships — `iranti_relate` works.

What B9 adds to the picture is the first clear case where a write capability has no corresponding read capability through the agent interface. The B4 evaluation found that `iranti_search` fails at attribute-value discovery for recently written entities. B9 finds that the relationships table is entirely outside the search index. Both are gaps in the read interface; B9's is more fundamental because no read path exists at all.

The B9 finding stands apart from the B4 finding: B4's search failure may be an indexing timing issue. B9's absence of a read tool is a categorical gap — there is simply no tool to call.

---

---

**Update (v0.2.14, 2026-03-21):** This finding is unchanged in v0.2.14. Relationship writes still succeed; agent-accessible relationship reads still do not exist. One additional note: `iranti_search` now crashes with a runtime error when called in conditions similar to the B9 search arm, rather than returning zero results as it did in v0.2.12. The substantive finding is the same — relationships are not indexed and not retrievable through the MCP interface — but the failure mode has become noisier. The formal paper also corrects an endpoint notation error from v0.2.12: the working REST path is `/kb/related/{entityType}/{entityId}`, not `/relationships` as previously stated. See the formal paper addendum for the full version comparison table.

---

*This article is part of the Iranti Benchmark Journal, a running record of the Iranti benchmarking program. Each entry documents what was tested, what was found, what wasn't found, and why the interpretation is bounded. Formal technical papers accompany each entry.*

*Full technical writeup: `papers/B9-entity-relationships-paper.md`*
*Raw results: `results/raw/B9-entity-relationships.md`*
