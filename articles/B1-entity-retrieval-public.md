# When You Ask an AI to Find a Fact: What Changes When It Has a Memory System?

**Series:** Iranti Benchmark Journal
**Track:** B1 — Entity Fact Retrieval
**Date:** March 2026
**Audience:** Technical generalists — developers, AI researchers, curious readers

---

## The Question We're Actually Asking

When an AI agent needs to retrieve a specific fact — say, where someone works, or how many papers they've published — how does it find it?

There are two obvious answers:

**Option 1:** The information is in the conversation. The agent reads through what it's been told and finds the answer there.

**Option 2:** The information is stored in a separate memory system. The agent retrieves it by looking it up directly.

These sound equivalent, but they're structurally different. And the difference matters more as the amount of stored information grows.

We built a benchmark to start characterizing this difference with Iranti.

---

## What We Actually Tested

We adapted a well-known benchmark called Needle-in-a-Haystack. The original version tests whether an LLM can retrieve a specific sentence buried in a long document. We modified it to test structured entity retrieval — retrieving specific facts about specific named entities.

**The setup:**
- We constructed a researcher registry: a list of fictional researchers, each with four facts (institution, paper count, previous employer, research focus)
- Two researchers were the target entities. The rest were distractors.
- We asked 10 questions about the target researchers.

**Baseline condition:** The AI reads the registry document and answers from the text.

**Iranti condition:** The AI uses Iranti's exact entity/key lookup and answers from the retrieved structured value — no document needed.

We tested three versions of the registry: a short one (5 entities), a longer one (20 entities), and a 20-entity version with adversarial entries — places where the registry contained wrong information about the target researchers, with notes like "[RECORD REQUIRES VERIFICATION]."

---

## What We Found

Both approaches got 100% of questions right.

That's the honest answer. At the document sizes we tested, a capable AI (Claude Sonnet 4.6) reads a structured list of 20 researchers and correctly retrieves the right facts about the right researchers. No confusion, no mistakes.

The Iranti retrieval arm also got 100%. Every fact was found, every answer was correct.

---

## Why This Is a Null Result, Not a Failure

We're reporting 100% vs 100% as a null result — not as evidence that Iranti doesn't help.

Here's why this is the expected outcome at this scale:

Modern frontier AI models have effective context windows measured in tens of thousands of tokens. Our 20-entity registry is about 2,400 tokens — a tiny fraction of what the model can attend to. At this size, there's no stress on the model's retrieval capability. It's like asking someone to find a name in a 3-page list. Of course they get it right.

The NIAH research (Needle-in-a-Haystack) established that LLM retrieval accuracy degrades significantly at much longer contexts — particularly for information buried in the middle of very long documents. The interesting comparison between context-reading and structured retrieval emerges at those larger scales.

We didn't run at those scales yet. So we can't make the comparison that would be meaningful.

---

## What the Iranti Retrieval Actually Looked Like

Here's something concrete. When the baseline reads from a document, it returns an answer:

```
Q: What is the affiliation of ticket/cp_t010?
A: Carnegie Mellon University
```

When Iranti retrieves the same fact, it returns:

```json
{
  "found": true,
  "value": { "institution": "Carnegie Mellon University" },
  "summary": "Affiliated with Carnegie Mellon University.",
  "confidence": 95,
  "source": "pm_review",
  "validFrom": "2026-03-20T11:47:26.383Z",
  "contested": false
}
```

The answer is the same. But the Iranti retrieval comes with metadata the document-reading approach can't provide:
- A **confidence score** (how reliable the stored fact is)
- A **source label** (who wrote this fact and why)
- A **timestamp** (when the fact was recorded)
- A **contested flag** (whether any other agent has challenged this fact)

In contexts where you're managing many facts from many sources across many agents — which is the scenario Iranti is designed for — this provenance information is load-bearing. A bare text answer doesn't tell you whether it came from a highly-trusted source or a speculative one.

---

## What We Couldn't Test (And Why We're Being Honest About It)

During this evaluation, Iranti's write operations were unavailable. The database had too many open connections, which blocked any attempt to store new facts.

This meant we couldn't run the full test we wanted to run: write a set of facts into Iranti, then check if they were correctly retrieved. We could only test retrieval of facts that were already there from earlier work.

This is a real limitation. It means we're not demonstrating the full "write then retrieve" cycle that Iranti's cross-session memory is built around. That test is coming — we need to fix the infrastructure issue first.

We're calling this out explicitly because overstating the evidence isn't useful to anyone.

---

## What We Would Need to See a Meaningful Difference

To actually show a context-reading degradation that Iranti's structured retrieval avoids, we need:

1. **Much larger registries** — 100 to 500 entities (20,000 to 100,000 tokens)
2. **Unlabeled adversarial entries** — wrong facts that don't announce themselves as wrong
3. **Write capability restored** — so the same entities exist in both arms of the test
4. **Multiple repetitions** — so results reflect a distribution, not a single run
5. **Multiple models** — so we can see whether the null result holds for smaller models or just capable frontier ones

The program has designs for all of these. The blocking issue right now is the infrastructure fix.

---

## What We Can Claim

Here's what this evaluation actually supports:

**Confirmed:**
- Iranti's `iranti_query` retrieves stored facts correctly and deterministically
- Retrieval includes provenance metadata (confidence, source, timestamp, contested flag)
- Cross-session retrieval works — facts stored in an earlier session are retrievable now
- Iranti's exact lookup handles two-entity disambiguation correctly (ticket/cp_t010 vs ticket/cp_t011 don't bleed into each other)

**Not yet confirmed:**
- That Iranti retrieval outperforms context-reading at scale
- That the write-then-retrieve cycle works end to end (blocked by infrastructure)
- That the advantage generalizes across different model families

**We're not claiming Iranti retrieval is better than context-reading at the scales we tested.** We don't have evidence for that. We're saying the machinery works, the result matches expectation, and we know what we need to test next to make a defensible differential claim.

---

## What This Means for the Program

This evaluation is the first completed benchmark track. It establishes:

1. The methodology works (we can run controlled comparisons between arms)
2. The Iranti retrieval infrastructure is operational (queries return correct, well-structured results)
3. The null result at small scale is an honest finding, not suppressed
4. The path to a meaningful result is clear (larger scale, full write-retrieve cycle)

The next steps are: fix the write infrastructure, run at N=100 and N=250 entity scales, and run the cross-session persistence test (B2) which directly demonstrates Iranti's core value — knowledge surviving a full session reset.

That result will be more compelling. We'll report it the same way.

---

## One More Thing Worth Saying

Benchmark programs are supposed to produce convincing numbers quickly. That's not what we're doing.

We're reporting a null result where one might expect a positive result. We're being explicit about what we couldn't run. We're describing the limitations of the adversarial test we designed. We're noting that the same model ran both the evaluation and the baseline, which is a methodological problem.

This isn't weakness in the program. It's the standard the program is supposed to hold.

Every claim Iranti makes publicly needs to be traceable back to evidence that survives scrutiny. An honest null result with a clear path forward is more useful than an inflated positive claim that falls apart under review.

---

*This article is part of the Iranti Benchmark Journal, a running record of the Iranti benchmarking program. Each entry documents what was tested, what was found, what wasn't found, and why the interpretation is bounded. Formal technical papers accompany each entry.*

*Full technical writeup: `papers/B1-entity-retrieval-paper.md`*
*Benchmark specification: `benchmarks/B1-entity-retrieval/benchmark.md`*
*Trial records: `benchmarks/B1-entity-retrieval/trials-baseline.md`, `trials-iranti.md`*
