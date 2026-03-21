# When You Ask Iranti "Who Knows This?" — What It Actually Tracks

**Series:** Iranti Benchmark Journal
**Track:** B10 — Knowledge Provenance (iranti_who_knows)
**Date:** March 2026
**Audience:** Technical generalists — developers, AI researchers, curious readers

---

## The Question Behind This Test

In a system where agents write facts to a shared knowledge base, attribution matters. If an agent writes a wrong fact, you want to know which agent wrote it. If two agents disagree about a fact, you want to know who contributed each version. If you want to weight facts by the reliability of their source, you need to know who that source was.

Iranti has a tool for this: `iranti_who_knows`. You ask it about an entity and it tells you which agents have contributed facts about that entity, which specific keys they wrote, and how many contributions they made.

This benchmark runs systematic tests on `iranti_who_knows` to find out how accurately it tracks contributions — and, more specifically, to answer a question that came out of earlier benchmark work: when an agent writes a fact with a `source` label naming a different agent, does `who_knows` track the `source` label or the actual agent identity?

The answer turns out to be clear and interesting.

---

## Two Kinds of Attribution

Before getting to results, it helps to understand that Iranti maintains two separate attribution layers. They sound similar but serve different purposes.

**Agent identity (`agentId`):** This is set when an agent session is configured. It is the system-level identity of the agent making API calls. Think of it like a database user account — the infrastructure records it automatically on every write, regardless of what the caller specifies. It answers the question: "who actually called this API?"

**Source label (`source`):** This is an optional field the calling agent can set on individual write operations. It is a provenance claim — the agent is stating where it believes the information came from. Think of it like a citation in a Wikipedia article. It answers the question: "where does the caller say this information originated?"

These are not the same thing. An agent session with identity `benchmark_program_main` can write a fact with `source=agent_alpha` to indicate that the information was sourced from Agent Alpha. But the entity doing the writing is still `benchmark_program_main`.

B10 tests which of these layers `iranti_who_knows` tracks.

---

## What We Tested

We called `iranti_who_knows` on three entities:

**alice_chen and bob_okafor:** Two researcher entities written with four facts each by the current session (`agentId=benchmark_program_main`). No special source labels. Straightforward attribution test.

**project/lunar_api_v3:** An entity written in B8 (the multi-agent coordination benchmark). All six facts were written with `source=agent_alpha` to simulate a different agent's contributions. The critical question: does `who_knows` return `agent_alpha` or `benchmark_program_main`?

We also checked whether the five relationship edges written in B9 — three of which involve alice_chen as the source entity — show up in alice_chen's `who_knows` result.

---

## What We Found

### The basic attribution works correctly

For alice_chen and bob_okafor, the results were exact:

```
iranti_who_knows(researcher/alice_chen)
→ agentId: "benchmark_program_main"
  keys: ["affiliation", "previous_employer", "publication_count", "research_focus"]
  totalContributions: 4
```

The right agent, the right keys, the right count. Both entities returned results that matched what was actually written, with no missing or extra keys.

### iranti_who_knows tracks agentId, not source labels

For project/lunar_api_v3 — the entity where all six facts were written with `source=agent_alpha`:

```
iranti_who_knows(project/lunar_api_v3)
→ agentId: "benchmark_program_main"
  keys: ["api_versioning", "auth_strategy", "database_engine", "deployment_region", "rate_limit", "sla_uptime"]
  totalContributions: 6
```

The result shows `benchmark_program_main` — the actual session identity — not `agent_alpha`. Key enumeration is exact, contribution count is correct.

`iranti_who_knows` tracks `agentId`. The `source` label is not what it records.

### Relationship edges are not tracked

The three `iranti_relate` edges with alice_chen as the source entity are not reflected in her `who_knows` result. `totalContributions` remains 4 (just the KB facts). The relationship edges written in B9 do not count.

---

## Why Tracking agentId Is the Right Design

This behavior might seem like a limitation — if you labeled facts as coming from `agent_alpha`, shouldn't `who_knows` reflect that? But tracking the actual session identity rather than the caller-supplied label is correct design for an accountability system, and the reason is straightforward.

`source` labels are completely caller-controlled. Any agent, at any time, can write a fact with `source=trusted_system` or `source=admin_agent`. There is nothing preventing that. If `who_knows` tracked source labels as identities, any agent could impersonate any other agent simply by setting the right `source` field.

`agentId`, by contrast, is set at session configuration time — it's tied to the actual authenticated agent session. You cannot change your `agentId` on a per-write basis from within a session. This makes `agentId` a meaningful accountability identifier in a way that `source` labels cannot be.

This is the same principle that database audit logs follow: they record the database user who made a change, not the business reason the user claimed for making it. The user's justification can say anything. The logged identity is what the system can actually vouch for.

The two layers serve different purposes:

| Layer | What it records | Who controls it | What it's for |
|-------|-----------------|-----------------|---------------|
| agentId | Actual session identity | Session infrastructure | Accountability — who made the call |
| source label | Claimed provenance | Calling agent | Provenance — where the info came from |

Both can be useful. They just answer different questions.

---

## What This Means for Multi-Agent Scenarios

This finding has a direct consequence for how you would build a genuinely multi-agent system with Iranti, and it clarifies something about B8 (the earlier multi-agent coordination benchmark).

In B8, different agents were simulated by writing facts with different `source` labels. From `who_knows`'s perspective, all of those facts were written by one agent: `benchmark_program_main`. The simulation worked for testing write behavior, but it does not produce distinct attribution entries.

To get true multi-agent attribution in `who_knows` — where Agent Alpha and Agent Beta appear as separate contributors — each agent would need to run as a separate Iranti-bound session configured with a distinct `agentId`. That is the only way to produce multiple entries in `who_knows` output for the same entity.

This is not a complicated architectural constraint. It is the correct way to run multiple agents: as separate sessions with separate identities. But it does mean that `source` labels are not a substitute for actual session separation in Iranti's attribution model.

---

## The Relationship Edge Gap

`iranti_who_knows` only tracks facts written to the knowledge base — not relationship edges written with `iranti_relate`. This is consistent with what B9 found: the relationship layer and the KB layer are architecturally separate, and the agent-accessible tooling covers KB facts but not relationship data.

Whether this is intentional design (facts and relationships are distinct attribution domains) or simply a gap (the relationship layer hasn't been integrated with the attribution system yet) is not clear from the benchmarks alone. The practical consequence is the same either way: an agent that spends significant effort mapping an entity's relationships gets no attribution for that work in `who_knows`.

Whether that matters depends on the use case. For knowledge base accountability ("who is responsible for the facts about this entity?"), the current behavior is reasonable — relationship edges serve a different purpose than facts. For a richer provenance model ("what has each agent contributed to our understanding of this entity?"), you would want relationship contributions tracked as well.

---

## What Iranti_who_knows Is Good For

The positive results from this benchmark are worth stating clearly. `iranti_who_knows` does what it is designed to do, correctly:

- It accurately attributes facts to the agent session that wrote them
- It enumerates every key that agent contributed, with no missing or spurious entries
- It counts contributions exactly
- It works across different entity types (researchers, projects, and presumably others)

For any application that needs to answer "which agent is responsible for the information about this entity?" — auditing, debugging, trust assignment, conflict resolution — `iranti_who_knows` is a reliable tool for the KB facts domain.

The two gaps identified (source labels not tracked; relationship edges not tracked) are not failures of the tool at its intended purpose. They are boundaries on what the tool covers, and understanding those boundaries is what this kind of evaluation is for.

---

## What We Can and Cannot Claim

**Confirmed:**
- `iranti_who_knows` attributes facts to `agentId`, not `source` labels
- Key enumeration is exact for all tested entities
- Contribution counts match actual writes
- Cross-entity-type tracking (researcher/ and project/) works correctly
- Relationship edges are not tracked by `who_knows`

**Not confirmed:**
- Whether separate `agentId` sessions produce distinct entries (single session tested; two-session behavior is expected but not empirically verified)
- Whether `source` labels are stored and accessible elsewhere in the API (only `who_knows` output was tested)
- Whether relationship attribution gap is intentional design or an omission

**The main finding, stated conservatively:** `iranti_who_knows` correctly tracks and enumerates agent contributions at the system identity (`agentId`) level for knowledge base facts. Source labels are a provenance claim, not an identity, and are not reflected in `who_knows` output. True multi-agent attribution requires separate agent sessions with distinct configured identities.

---

## Where This Fits in the Benchmark Program

The B9 and B10 results together give a consistent picture of Iranti's relationship layer: it is architecturally present but not integrated with the tools agents use for reading data (B9 finding) or tracking contributions (B10 finding). The KB facts layer is, by contrast, well-integrated: writable, searchable, attributable.

B10 also resolves a question that B8 left open. The B8 multi-agent simulation using `source` labels was a reasonable approximation for testing write coordination behavior. B10 confirms it was not a true multi-agent simulation from an attribution standpoint. That is not a failure of B8 — it was not designed to test attribution. But any future benchmark that specifically tests multi-agent attribution will need separate sessions, not source labels.

---

*This article is part of the Iranti Benchmark Journal, a running record of the Iranti benchmarking program. Each entry documents what was tested, what was found, what wasn't found, and why the interpretation is bounded. Formal technical papers accompany each entry.*

*Full technical writeup: `papers/B10-knowledge-provenance-paper.md`*
*Raw results: `results/raw/B10-knowledge-provenance.md`*

---

**Update — v0.2.16 rerun (2026-03-21):** The v0.2.16 rerun confirmed all prior findings and added one new significant result. The basic attribution (who wrote which facts) still works correctly. The finding that `who_knows` tracks actual agent identity rather than caller-supplied source labels is independently confirmed. The previously untested multi-agent case — what happens when two different agents both write to the same topic — was tested for the first time. Result: when multiple AI agents share the same knowledge base and both write to the same entity, Iranti keeps track of which agent wrote which fact. Calling `iranti_who_knows` on that entity returns two separate entries, one per agent, each correctly listing only the keys that agent contributed. This makes `iranti_who_knows` a functional multi-agent audit tool within a single instance: you can ask "who knows what about this project?" and get an answer broken down by contributor, not just a single name. That is a meaningful capability for any system where multiple agents are collaborating or where you need to trace accountability back to a specific agent.
