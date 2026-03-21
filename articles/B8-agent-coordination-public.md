# Can Two AI Agents Share Decisions Without Talking to Each Other?

**Series:** Iranti Benchmark Journal
**Track:** B8 — Multi-Agent Coordination via Shared KB
**Date:** March 2026
**Audience:** Technical generalists — developers, AI researchers, curious readers

---

## The Problem

Imagine you have two AI agents working on the same project.

Agent Alpha is designing the architecture. It decides: use JWT for authentication, 60-minute token expiry, refresh tokens enabled. PostgreSQL 16 for the database, connection pool of 50. Deploy to us-east-1, with eu-west-1 as failover. SLA is 99.9% monthly uptime.

Agent Beta is handling implementation planning. It needs to know all of those decisions. It needs to know them accurately, not vaguely. "Use JWT" isn't enough — it needs the expiry time and the refresh token behavior, because those determine what the token validation code has to do.

In a typical setup, Alpha would tell Beta. It would write a summary, send a message, or share a document. But there's a coordination overhead problem here: Alpha has to know that Beta exists, Beta has to be available to receive the information, and the two agents need to be synchronized in some way.

What if they didn't have to coordinate directly at all?

---

## The Idea: A Shared Memory Layer

The concept Iranti implements for this use case is straightforward: a shared, structured knowledge base that both agents can read from and write to, without ever talking to each other directly.

Alpha writes its decisions to the shared KB. It labels them clearly — here is the auth strategy for project lunar_api_v3, here is the rate limiting policy, here is the database choice. It attaches its identity as the author. Then it moves on.

Later, Beta comes along. It knows the project exists. It knows the KB namespace. It queries those same keys, cold, without any context from Alpha's session. It retrieves the decisions and uses them.

Alpha and Beta never shared a context window. They never exchanged a message. They coordinated entirely through the state of a shared store.

This is a well-established pattern in distributed systems — it goes back to something called a "blackboard architecture" from the 1980s, where agents in a multi-expert AI system communicated by writing to and reading from a shared data structure rather than calling each other directly. Iranti's KB is a modern instantiation of the same idea, applied to LLM-based agent systems.

---

## What We Actually Tested

We set up a scenario with a fictional API project called lunar_api_v3. Agent Alpha was given the architectural decision-maker role and asked to write six decisions to the KB:

- Authentication strategy (JWT, 60-minute expiry, refresh tokens)
- Rate limiting (500 requests per minute per API key, burst to 1200)
- Database choice (PostgreSQL 16, connection pool of 50)
- Deployment regions (primary: us-east-1, failover: eu-west-1)
- SLA commitment (99.9% monthly uptime, credits trigger at 99.5%)
- API versioning (URL path versioning, /v3/ format, 180-day deprecation notice)

Each decision was stored as a structured JSON object under the project's entity namespace.

Then we put Agent Beta in a cold start — no knowledge of Alpha's session, no prior context — and asked it to retrieve all six decisions by querying the same namespace.

---

## What We Found

Beta got all six decisions back, exactly as Alpha wrote them.

Not paraphrased. Not summarized. The exact values: `{"method":"JWT","expiry_minutes":60,"refresh":true}`. The exact numbers: 500 rpm, burst to 1200. The exact strings: "us-east-1", "eu-west-1", "URL path", "/v{N}/".

There was one minor technical detail worth noting: JSON key ordering differed between what Alpha wrote and what Beta received. Alpha wrote `{"method":"JWT","expiry_minutes":60,"refresh":true}` and Beta got back `{"method":"JWT","refresh":true,"expiry_minutes":60}` — the keys are in a different order. This is a PostgreSQL behavior: it normalizes JSON key ordering when storing. The values are identical; the order isn't meaningful. But it's worth knowing if you're doing byte-for-byte comparisons in code.

Beyond the values themselves, Beta received two pieces of metadata it didn't have to ask Alpha for:

**Source attribution.** Every retrieval response included `source=agent_alpha`. Beta could see who wrote each decision without Alpha telling it. This is stored at the infrastructure level, not in the value payload — Alpha didn't have to remember to write "I decided this." The storage layer tracked it automatically.

**Timestamp.** The write time was available on retrieved facts. Beta could see that the auth_strategy decision was recorded at 2026-03-21T08:59:37Z. In a real scenario with many decisions across many sessions, this lets Beta determine which decisions are current and which might be stale.

---

## Why This Matters

The coordination pattern here is genuinely different from message-passing. In a message-passing system, information flows from a specific sender to a specific receiver at a specific time. If Beta isn't available when Alpha sends, or Alpha doesn't know Beta needs the information, or the message gets lost, the coordination fails.

In the shared-KB pattern, none of that applies. Alpha writes to the KB when it has decisions to record. Beta reads from the KB when it needs to know something. The timing doesn't matter — the decisions persist. The coupling doesn't matter — Alpha doesn't need to know Beta exists. The source attribution is automatic — Beta knows who wrote what without anyone embedding that information manually.

This is the same reason databases beat message-passing for sharing data between services at scale. The shared store is more resilient, more inspectable, and less coupled than point-to-point communication.

---

## What We're Honest About

A few things need to be said plainly.

**The baseline comparison is not a real comparison.** We report a score of 0% without Iranti and 100% with it. That sounds dramatic, but it's not a measured result — it's a logical consequence. Of course Beta gets 0% of Alpha's decisions if there's no shared store and they never talk. The interesting result is not the score. The interesting result is the fidelity properties: values are exact, provenance is intact, timestamps are available. Those are real measurements.

**Alpha and Beta weren't truly separate.** In this execution, both agents were simulated within the same session. True multi-agent coordination would have Alpha and Beta running in separate processes, making separate API calls to Iranti, with genuine session isolation. We didn't do that. The fidelity findings are almost certainly real — they depend on how Iranti stores and retrieves data, not on the session boundary — but a proper replication would use separate agent processes.

**Six decisions is a small test.** We wrote six facts and read six facts. Real coordination tasks involve hundreds of interdependent decisions, written over days or weeks by multiple agents. We haven't tested that.

**We didn't test conflicts.** This is the most significant gap. What happens when Agent Beta also writes to auth_strategy — maybe Beta disagrees with Alpha's choice, or needs to update it? Does the second write overwrite the first? Does Iranti record both with different timestamps? Does it reject the write? We have no idea, because we didn't test it. The conflict case is central to whether this pattern is safe to rely on in real multi-agent systems where agents might make overlapping or contradictory updates.

---

## What the Pattern Looks Like in a Real System

The B8 scenario maps directly to a real software development workflow:

An architecture agent reviews requirements and writes technical decisions to a project KB. An implementation agent consults the KB when it generates code, ensuring its implementation matches the architectural choices. A security review agent can query the KB to verify that authentication decisions meet requirements, and can see from the source attribution who made those decisions and when. A documentation agent can pull all decisions from the KB and generate architecture documentation without any of the other agents having to brief it.

None of these agents need to know about the others. None need to be running simultaneously. The KB is the coordination layer. The source attribution tells you who to follow up with if a decision turns out to be wrong.

This is the specific pattern that B8 tests — and the fidelity results suggest Iranti's storage layer supports it, at least for small-scale, non-conflicting coordination.

---

## What We Can Claim

The B8 results support these specific claims:

- Structured JSON decisions written by Agent Alpha are retrieved by Agent Beta with full value fidelity (accounting for JSONB key normalization)
- Source attribution is preserved end-to-end through the storage layer without any manual embedding
- Timestamp metadata is available for reasoning about decision recency
- The coordination requires no direct communication between agents

The results do not support claims about performance at scale, behavior in the presence of conflicting writes, or behavior in true multi-process agent deployments. Those require additional testing.

The honest summary: Iranti's KB can serve as an implicit coordination channel between isolated agents. For the specific use case of writing structured decisions and reading them back cold, it works exactly as intended. The open questions are about what happens when the scenario gets harder — more agents, more facts, and agents that disagree with each other.

---

*This article is part of the Iranti Benchmark Journal, a running record of the Iranti benchmarking program. Each entry documents what was tested, what was found, what wasn't found, and why the interpretation is bounded. Formal technical papers accompany each entry.*

*Full technical writeup: `papers/B8-agent-coordination-paper.md`*
*Raw results: `results/raw/B8-agent-coordination.md`*
