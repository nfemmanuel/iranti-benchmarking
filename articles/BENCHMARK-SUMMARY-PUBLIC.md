# What We Found When We Put Iranti Through Its Paces

**Published by the Iranti Benchmarking Program**
**Version under test:** 0.2.16
**Date:** 2026-03-22

---

## What We Did

We ran Iranti through 13 benchmark tests over six rounds of evaluation. Some tests were about whether it could store and retrieve facts reliably — find the right record instantly, at large scale, across session breaks. Some were about whether it could handle conflicts: two agents writing contradictory facts about the same thing, or a new agent trying to correct something an older agent got wrong. Some were about what happens when an AI agent loses its working memory mid-task and needs to recover it from the knowledge base. Others pushed into more specific territory: version upgrades, multi-agent coordination, graph traversal across linked entities, automatic extraction from prose, and whether facts survive when the agent that wrote them is gone. We compared performance with and without Iranti in every case where a meaningful baseline existed.

This document covers all 13 tracks. It is honest about what worked, what didn't, what we got wrong the first time, and what remains unsolved.

---

## What Works Well

### Exact lookup at scale

The clearest finding in the program came from a test called B1. We stored facts in Iranti's knowledge base and asked the system to find them — first with a small number of facts, then scaling up. At low volumes (up to 500 facts, which translates to roughly tens of thousands of tokens of context), there was no measurable advantage over a baseline system that just kept everything in the AI's active memory. Both worked fine.

At N=5000 facts — about 276,000 tokens of context — the picture changed completely. The baseline system got 0/4 correct. The context window was too large; the AI simply couldn't hold all that information in mind at once. Iranti got 4/4. The lookup operation (`iranti_query`) runs in constant time regardless of how many facts are stored: it finds the exact record you ask for directly, without scanning everything. This is the kind of advantage that only shows up when the scale actually matters.

### Facts survive

We specifically tested whether information stored in Iranti persists across the boundaries that normally reset an AI agent's memory: session breaks, restarts, and version upgrades. The results were clean. In B2, all 20 written facts were retrievable in a new session with no degradation. In B13, we upgraded through three versions (0.2.12 to 0.2.14 to 0.2.16) and checked facts written at each stage — all durable. Iranti has also formalized this as an explicit compatibility policy (ADR 007), which means the behavior we observed empirically now has a documented upstream commitment behind it.

### Extracting facts from text

B6 tested `iranti_ingest`, which takes unstructured prose — a paragraph describing a person, a project update, a document — and automatically extracts structured facts from it. Under a real AI provider, this scored 8/8. The system read biographical text, identified the meaningful facts in it, and stored them correctly without being hand-held through the structure. One nuance: the system sometimes decomposes a single conceptual fact into sub-keys rather than storing it as a flat string. That behavior is documented, and users should be aware of it when writing queries.

### Relationship graphs

B9 tested whether Iranti's relationship layer — the part that lets you record that one entity relates to another — actually works end to end. Write a relationship, read it back, traverse it to depth. All 4/4. This was actually an area that had partial failures in earlier versions (the system would accept writes but not expose the results correctly). It's been fixed and confirmed across multiple reruns.

### Context recovery with hints

B11 is one of the more interesting tests because it addresses a real problem in long-running AI workflows: the agent has been working for a while, its earlier context has scrolled out of its working memory, and it now needs those earlier facts back. We stored six facts about a software project and then asked Iranti to recover them from a new context that referenced the project.

With a hint — pointing the system at the right entity — the recovery returned 5/6 facts, in a sensible relevance order. The three facts explicitly requested came first. Two additional relevant facts were surfaced proactively. That's the right behavior. (The sixth fact was dropped due to a parsing quirk; see the formal paper for details.)

We also confirmed that automatic entity detection now works. In earlier versions, even if the project's name appeared verbatim in the context text, the system couldn't find it on its own. That's fixed in v0.2.16. Detection operates by matching entity names and registered aliases — so it works reliably when the entity's name is in the context, and won't work for purely indirect references like "the project we started last quarter." Knowing this boundary matters for anyone designing agents that use `iranti_observe`.

### Multi-agent attribution

B8 tested whether Iranti correctly tracks which agent wrote which fact — and whether that attribution is preserved when two agents write to the same entity. It is. In B10, we pushed further: two agents writing different facts about a shared entity, then verifying that each write was attributed correctly to the right agent. The records are correct per agent ID. This matters for audit, debugging, and any scenario where an agent needs to know what it previously wrote versus what other agents wrote.

### Session recovery

B12 set up an interrupted session: an agent had been working on a project, context was cleared mid-task, and it now needed to reconstruct what it knew. The explicit query arm — where the agent knows what it needs and asks for it directly — got 8/8. The baseline (no Iranti, relying only on the AI's context window) got 0/8 after the session was interrupted. The `iranti_observe` passive recovery arm got 5/8 — partial, but substantially better than nothing.

---

## What Has Known Limitations

### Search on meaning vs. search on names

`iranti_search` works well for what you might call named attribute queries: you give it something like "find the database engine field for the lunar api project" and it finds the right record. It does not work well for semantic paraphrase queries: asking for "facts about our infrastructure choices" or "the authentication approach used for the API that serves the lunar project" reliably fails to return the right record.

The vector search underlying `iranti_search` is not yet strong enough for that kind of language-level matching. This isn't a bug — it's a documented boundary. The system is reliable for structured, attribute-level retrieval. It is not yet a semantic search engine.

### Context recovery misses low-confidence progress facts

The `iranti_observe` tool ranks what it surfaces by the stored confidence score of each fact. This is generally sensible — higher confidence facts are usually the ones you want first. But it means that progress facts, status updates, and transient notes — which are often stored at lower confidence because they're more tentative — can get missed in passive recovery.

The workaround is to query them explicitly with `iranti_query` if you know the key. But this requires the agent to know that the fact exists, which is precisely what's uncertain after a context break. This is an open design issue, not something you can configure around at the API level today.

### LLM-arbitrated conflict resolution: one real broken path

When two different agents or sources write conflicting facts about the same entity, Iranti uses a scoring system to decide which one wins. If the confidence gap between the two values is large enough, it decides automatically — and that path works correctly. But when the gap is small, the system escalates to an LLM to arbitrate the conflict.

That LLM call happens inside an open database transaction. The LLM call takes 8–16 seconds. The transaction window is about 5 seconds. The transaction expires before the LLM responds, the write fails, and the update is silently lost. The original value is safe — the transaction rolls back correctly — but the incoming update simply never lands, and the calling agent receives no clear signal about why.

This only affects cross-source writes in the small-gap zone. If you're updating a fact from a different source and you make the confidence gap large enough to clear the automatic threshold (roughly a weighted gap of 10 or more — in practice, use incoming confidence of 95 or higher when the existing value is 75 or below), the system routes around the LLM path entirely and the update succeeds. But there is no API-level way to force this. You have to calibrate your confidence values.

---

## What We Got Wrong and Corrected

### The slash defect that turned out not to be a defect

During early B11 testing, we observed what looked like a serious bug: fact values containing forward slashes — URLs, file paths, ratios like "3/4" — appeared to be silently dropped when Iranti tried to retrieve them through certain paths. We called it out as a HIGH severity defect and reported it as such.

When we went back to reproduce it with a careful minimal test — isolating exactly that behavior and nothing else — it didn't happen. The slash values came back correctly across all four retrieval paths. What we had originally observed was parsing noise from the entity-detection step of the pipeline: the system was doing some NLP processing of context text and producing parse errors, but those errors were not data loss. The actual fact values were being retrieved correctly all along.

We retracted the claim and reported the correction.

After we retracted it, something notable happened: the upstream engineering team, working independently, added explicit regression tests for exactly this scenario. Those tests exercise slash values, URL values, and email-path combinations across all four retrieval paths. They all pass. That's three independent checks — our original retraction, our v6.0 revalidation, and the upstream regression suite — all reaching the same conclusion. Slash values are fine.

We were wrong to report this as a defect. We are confident in the retraction.

### The noise entry that was a test artifact

During B11 evaluation, we found an entry called `user/main/favorite_city` with the value "NoiseTown" appearing in Iranti's memory and surfacing in retrieval results for benchmark contexts where it didn't belong. We documented this as a benchmark contamination issue: an irrelevant entry taking up a slot that should have contained a relevant fact.

What we later confirmed: this entry came from an upstream test script that was using `user/main` as a test fixture entity. The test wrote to that entity as part of a routine development test — not as any behavior Iranti itself exhibits in production. Our benchmark database picked it up because we were sharing infrastructure with the test environment. The entry is not something Iranti writes; it was written by the test harness.

The upstream engineering team has since fixed their test script to write to a properly isolated entity ID. The `user/main/favorite_city` entry still exists in our local benchmark database (it was written there by our own regression runs), but it no longer surfaces in retrieval results in natural contexts. We verified this in the v6.0 revalidation pass.

This was always a test artifact and a methodology concern, not a product defect. We called it correctly as contamination, and the upstream fix closes the pathway through which it was created.

---

## The One Real Thing Still Broken

The transaction timeout on LLM-arbitrated writes is the one confirmed open defect with no current workaround at the API level.

To be precise about what it affects: most writes in Iranti are fine. Same-source updates, high-confidence new writes, large-gap cross-source updates — all of these route through deterministic code paths that don't touch the LLM arbitration layer. The broken path is specifically cross-source conflict writes where the confidence gap is small. In that zone, the system tries to consult an LLM, the database transaction expires while it waits, and the write fails silently.

The practical guidance is to avoid that zone. If you know two agents might write conflicting facts about the same entity, size their confidence values so the better one wins by a large enough margin to bypass arbitration entirely. That's a design-time decision, not a runtime fix — but it's a reliable way to stay off the broken path.

Engineering is aware of this defect. It's the top priority item from this benchmarking program.

---

## What We Still Don't Know

A few things the benchmarks couldn't resolve:

The N=5000 scale finding shows a clear advantage for Iranti over the context-window baseline. We don't know how retrieval performance behaves at much larger scales — say, 50,000 or 500,000 facts. The B7 episodic memory test was a null result at around 5,000 tokens; we didn't test the regime where degradation would become meaningful.

We also don't know the real-world rate of cross-source writes that fall into the LLM arbitration zone in production deployments. In controlled benchmarks, we can construct cases that reliably trigger it. In normal use, it depends entirely on how agents are calibrating confidence values. Some deployments may never hit it; others might hit it frequently.

Finally, automatic entity detection works when entity names or aliases appear in context text. We don't have a clear picture of how it performs for entities that haven't been explicitly aliased and are referenced only by description. The mechanism is alias-index matching, not language understanding — so the boundary is reasonably predictable, but we haven't systematically measured it.

---

## The Correction History, Briefly

We published some wrong things during this program. A defect that turned out not to be one. A contamination finding that was real but whose cause we initially misidentified. We went back, tested again, and corrected the record. Every correction is documented in the repo with the full trail: what we said, when, what the correct finding is, and how we found out. Nothing was quietly updated without a paper trail.

We think that's how benchmarking should work. The goal isn't to have a clean record — the goal is to have an accurate one.

---

*Published by the Iranti benchmarking program. Version under test: 0.2.16. Date: 2026-03-22. Full technical details and correction history at results/published/.*
