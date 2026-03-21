# When an AI Conversation Ends, What Survives?

**Series:** Iranti Benchmark Journal
**Track:** B2 — Cross-Session Memory Persistence
**Date:** March 2026
**Audience:** Technical generalists — developers, AI researchers, curious readers

---

## The Question We're Actually Asking

When an AI conversation ends, everything the agent knew from that conversation disappears. Start a new session tomorrow and it has no idea what you discussed yesterday. This isn't a bug — it's a defining property of how large language models work. They don't have memory between conversations. Each session starts from a blank slate.

A memory system like Iranti is supposed to change this. Facts get written to an external store during one session and read back in a later one. The agent doesn't "remember" in the way a person does — it looks up what was recorded.

This benchmark asks: does that actually work?

---

## What We Actually Tested

We set up a controlled write-then-retrieve test across two simulated sessions.

**Session 1 (write phase):** We wrote 20 facts about 5 fictional researchers directly into Iranti — things like where they work, how many papers they've published, where they worked before, and what they research. Each fact was stored with a confidence score and a source label.

**Session 2 (retrieval phase):** We then ran a fresh retrieval pass with no in-context knowledge of what had been written. The agent had to retrieve each fact purely by querying Iranti — it couldn't "remember" from the first session.

We also had additional cross-session evidence from the prior day: facts written in an earlier session (B1, March 20) were retrieved correctly on March 21, confirming that data doesn't disappear when Iranti is restarted.

---

## What We Found

All 20 facts were retrieved correctly. No errors, no hallucination, no cross-entity confusion.

The agent retrieved the right affiliation for each researcher, the right publication count, the right previous employer, the right research focus. Every time. This held across five distinct researchers with similar-sounding facts, and it matched what was in the KB exactly.

The cross-session evidence also held: facts written the day before were still there and still correct.

---

## Why This Result Has an Important Asterisk

The headline number — 20/20 correct — needs to be read carefully.

The comparison isn't really Iranti vs. another approach that also works. It's Iranti vs. the structural absence of memory. Without a memory system, a stateless LLM retrieves exactly 0 of 20 facts in Session 2. Not because it tries and fails, but because there's nowhere to look. The baseline is 0% by definition.

This makes the comparison mechanistic rather than empirical. We aren't discovering something surprising. We're confirming that the mechanism works as designed. A database that stores data correctly and retrieves it correctly isn't a remarkable finding — it's a prerequisite for everything else.

What we're actually establishing here is that Iranti's write-then-retrieve cycle functions end to end. That turns out to matter, because as recently as B1 (one day earlier), the write infrastructure was broken entirely due to a database connection problem. The B2 result confirms that problem is resolved and the full cycle works.

---

## What the Retrieval Actually Looks Like

When a fact is retrieved from Iranti, it returns more than just the value:

```json
{
  "found": true,
  "value": { "institution": "University of Toronto" },
  "confidence": 95,
  "source": "b2_benchmark_ingest",
  "validFrom": "2026-03-21T...",
  "contested": false
}
```

The fact comes with provenance — who wrote it, with what confidence, when, and whether any other agent has challenged it. A system that just reads from a document can't provide any of that. Over time, as an Iranti knowledge base accumulates facts from multiple agents and sources, this metadata is what lets you reason about trustworthiness. A fact written once at confidence 50 by an unverified source is different from a fact written at confidence 95 by an established source, even if the value is the same.

---

## What We Didn't Test

The retrieval phase technically occurred in the same session as the write phase — the agent simply chose not to use its in-context memory. True session isolation would mean closing the conversation entirely and starting a new one with zero access to the write phase context. We relied on the B1 prior-session evidence for that demonstration, rather than fully isolating it in this test.

We also only tested with synthetic (fictional) researchers. Performance on real entities with messier facts hasn't been evaluated. And we tested a single local Iranti instance — distributed deployments are a separate question.

---

## What We Can Claim

**Confirmed:**
- Iranti's write-then-retrieve cycle works: facts written in one session are retrievable in another
- 20/20 accuracy with no cross-entity contamination across 5 distinct entities
- Provenance metadata (confidence, source, timestamp, contested flag) is preserved through the round trip
- Cross-session persistence is genuine: facts survive between distinct Iranti invocations

**Not confirmed:**
- This is not a performance comparison with another approach — the baseline doesn't compete
- We haven't tested how this holds at larger KB sizes or with real-world, messier data
- We haven't tested failure modes: what happens when the KB is unavailable, when writes partially fail, or when a session ends before all facts are written

---

## Why It Still Matters

Confirming that the basic mechanism works is the foundation for every other test. If Iranti couldn't reliably store and retrieve facts across sessions, nothing else in this benchmark program would be worth running.

The more interesting questions — does Iranti's cross-session memory help agents perform better on tasks that require accumulated knowledge? does it degrade at scale? how does it behave when facts conflict across sessions? — all depend on this plumbing working first.

It works. That's what B2 establishes.

---

*This article is part of the Iranti Benchmark Journal, a running record of the Iranti benchmarking program. Each entry documents what was tested, what was found, what wasn't found, and why the interpretation is bounded. Formal technical papers accompany each entry.*

*Full technical writeup: `papers/B2-cross-session-paper.md`*
*Raw results: `results/raw/B2-cross-session.md`*
