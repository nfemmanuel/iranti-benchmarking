# Changing a Fact That's Already in the System

**Series:** Iranti Benchmark Journal
**Track:** B5 — Knowledge Currency
**Date:** March 2026 (updated March 2026 — v0.2.16 rerun)
**Audience:** Technical generalists — developers, AI researchers, curious readers

---

> **Update — v0.2.16 rerun (2026-03-21)**
>
> We re-ran B5 against Iranti v0.2.16 using a real OpenAI provider instead of a mock. Three findings from the original run were confirmed unchanged. One new finding was added. And one serious infrastructure defect was discovered.
>
> **Short version for practitioners:** The parts of the system that work deterministically — stale-fact rejection, duplicate detection, same-source updates, and large-gap cross-source updates — all still work correctly. The AI-mediated path — for close-call conflicts between different sources — currently times out under a real AI provider and does not complete. For now: if you need to update a fact from a different source, use a confidence gap large enough to trigger deterministic resolution (aim for a weighted gap > 10, which in practice means a large raw confidence advantage, e.g. incoming conf ≥ 95 when existing is ≤ 75). Do not rely on the AI arbitration path in production.
>
> Details follow at the end of this article.

---

## The Question We're Actually Asking

Facts change. People change jobs. Projects get renamed. Numbers get updated. A memory system that only ever grows — accumulating facts but unable to correct old ones — isn't actually useful for long-lived agents working on real problems.

So: how do you update a fact in Iranti?

The answer turns out to be less straightforward than you might expect.

---

## What We Actually Tested

We designed five test cases examining what happens when you try to write a new value for a fact that already exists in the knowledge base.

Each test varied the relationship between the old and new write: different confidence levels, different sources, same source, same value, different source identity. We then checked whether the update landed and why.

---

## What We Found

The results broke down into a pattern that took some working through to understand.

**The one clean success (T1b):** An update from the same source that wrote the original fact, with confidence raised from 85 to 97, was accepted. The score gap between old and new was 10.6 points — just above the threshold where the system makes a deterministic decision. Update landed.

**The stale-data rejection (T2):** A lower-confidence update to a high-confidence existing fact was correctly rejected. This is the right behavior — you shouldn't be able to overwrite a confident fact with a less confident one.

**The duplicate detection (T3):** Writing the same value again at lower confidence was rejected with a "duplicate value with lower score" message. Useful behavior — it prevents noise rewrites from eroding confidence without adding information.

**Two unexpected rejections (T1, T4):** These are the interesting cases.

In T1, a new source tried to update a fact with confidence 92, replacing an existing fact at confidence 85. The raw confidence was higher. The weighted score was also slightly higher. But the score gap was only 2.9 points — small enough to trigger LLM arbitration rather than automatic acceptance.

The LLM rejected the update, citing the existing entry's "more established source."

In T4, a different new source tried to update with a small confidence increase (80 to 85). Same result: LLM arbitration, rejection, same reason.

---

## Why "Established Source" Is Doing a Lot of Work

There's no simple "update this fact" operation in Iranti. Every write goes through the same conflict detection machinery. If you want to update a fact, you're functionally competing with the old fact for which score is higher.

Source reliability accumulates over time. A source that has written several successful facts in a session builds up a reliability score above the default. In B5, the source `b5_initial` had written facts in several prior operations and had reliability around 0.62. The default for any new source is 0.5.

This means `b5_initial`'s entries have a built-in edge over anything written by a new source — even at higher raw confidence. When the gap falls below 10 points and the LLM is called in, it consistently chose the established source.

**The practical effect:** If a fact was written by a well-established source (an agent that has been operating for a while), a new agent cannot reliably update it. Not because the new information is wrong — the LLM has no way to know — but because "this source is newer and less established" is treated as a reason to be suspicious.

To update a fact written by source A, you effectively need to either:
- Be source A, and write with enough confidence to generate a score gap of at least 10 points
- Somehow get a new source to accumulate enough reliability to compete on even terms — which takes time and prior writes

This is a conservative design. It protects against noisy agents overwriting stable facts. But it also means that legitimate corrections from new agents are systematically harder to land. The system has no way to distinguish "new agent with a correct correction" from "new agent with noise."

---

## The Stale-Fact Problem

One implication is that stale facts can persist even when something better is available.

In T1, the updated fact genuinely reflected a changed status (a researcher was promoted from junior researcher to research lead). The update was written with higher confidence than the original. It was rejected anyway.

The existing fact is now stale. The system "knows" the old title. It has no record that an update was attempted. The contested flag remains false — from the outside, it looks like uncontested settled knowledge.

Anyone relying on that fact downstream would receive the wrong answer, confidently.

---

## What Duplicate Detection Gets Right

T3 deserves a mention because it's actually good behavior. When the same value is submitted again at lower confidence, Iranti detects it as a duplicate and rejects it explicitly. This prevents well-meaning "re-confirmation" writes from eroding the confidence of stable facts without adding anything. The rejection message is clear about why.

---

## What We Can Claim

**Confirmed:**
- Iranti does not have a simple "update this fact" operation — all writes go through conflict detection
- A fact can be reliably updated if the same source writes it again with a score gap of at least 10 points
- Source reliability accumulates within and across sessions, biasing conflict resolution toward established sources
- Duplicate detection works correctly: same-value, lower-confidence writes are rejected cleanly

**Real limitations identified:**
- New agents cannot reliably update facts written by established agents, even at higher raw confidence, when LLM arbitration is triggered
- LLM arbitration consistently favors "established source" over "new source," regardless of which is actually more current or correct
- Stale facts can persist silently with no record that an update was attempted or rejected

**Not confirmed:**
- Whether a forced-write or privileged-write API exists that bypasses these restrictions
- How reliability values reset across sessions (we infer they are session-persistent but don't have direct visibility)
- Whether the update difficulty changes significantly at different confidence levels or with longer-established sources

---

## Why This Matters

Knowledge currency is one of the core promises of a persistent memory system. If the system can't be updated reliably, agents built on it will eventually operate on stale information — and worse, they'll do so confidently, with no flag indicating that the information is contested.

The B5 results show that Iranti's update behavior is not straightforward. It works in specific conditions (same source, sufficient confidence gap) and blocks updates in others (new source, small gap). Understanding this is essential for anyone designing multi-agent workflows that depend on fact correction over time.

The system isn't broken — it's conservative by design. But "conservative by design" has real costs that users need to understand before trusting it with information that changes.

---

---

## Update: What Changed in the v0.2.16 Rerun

We re-ran B5 against v0.2.16 using a real OpenAI API connection. Here is what we found.

### What stayed the same

Three behaviors confirmed unchanged:

- **Same-source updates still work.** Writing to a fact with the same source at higher confidence, where the score gap is large enough, still succeeds cleanly (T1b: conf 85→97, gap=10.4).
- **Stale writes are still rejected.** A lower-confidence incoming write against a higher-confidence existing fact is still rejected by the deterministic path (T2: gap=12.7).
- **Duplicate detection still works.** Writing the same value again at lower confidence is still caught and rejected correctly (T3).

### New finding: large-gap cross-source updates work

We added a new test case (T5) that we hadn't run before: a cross-source update with a very large confidence gap — incoming confidence 99 against an existing confidence of 70 from a different source.

It worked. The weighted score gap was 24.6, well above the 10-point threshold, so the system made the decision deterministically without involving the AI arbitration step. Update accepted.

This matters because it confirms a reliable path for cross-source updates: if the confidence difference is large enough, the system doesn't need to call out to an AI model at all. It just does the math and accepts the higher-confidence value. That path is robust.

### The defect: AI arbitration currently times out

The two test cases that required AI arbitration — T1 (conf 85→92, cross-source) and T4 (conf 80→85, cross-source) — both failed with a transaction error instead of producing a result.

What happens: when a conflict write falls into the "close call" range (score gap below 10), the system opens a database transaction, computes scores, and then makes an AI API call to ask the model to decide — all while that transaction is still open. With a real AI provider, that call takes 8–16 seconds. The database transaction window is about 5 seconds. By the time the model answers, the transaction has expired. The system tries to record the result and fails.

The failure is safe — the original value is preserved, nothing is corrupted — but the incoming update simply doesn't land, and there's no clear signal to the calling agent about whether it was rejected on the merits or just timed out. No record of the attempt is written either.

**The practical consequence:** You cannot currently rely on the AI arbitration path in production. Any fact update that would trigger a close-call conflict — which means any cross-source update where the confidence gap isn't large — will fail silently. The update won't land, and you won't know why.

### What this means for the original finding

In the first run (v0.2.12, mock provider), the AI arbitration path did complete, and the AI consistently rejected cross-source updates by citing the "established source." We couldn't confirm or refute that finding in the v0.2.16 run because the arbitration never ran — the timeout got there first.

So the "established source bias" question is still open. It may still be present in the AI's behavior; we just couldn't observe it. We'll need to retest once the transaction timeout is fixed.

### Where things stand

| What you're trying to do | Does it work? |
|--------------------------|--------------|
| Update a fact with the same source, large confidence increase | Yes — deterministic, reliable |
| Reject a lower-confidence stale write | Yes — deterministic, reliable |
| Detect and reject duplicate reconfirmation | Yes — deterministic, reliable |
| Update a fact from a different source, large confidence gap (aim for weighted gap > 10) | Yes — deterministic, reliable (T5 confirmed this) |
| Update a fact from a different source, small confidence gap | No — times out under real AI provider |

**Bottom line for right now:** Use the deterministic path. If you're updating a fact from a different source, make sure the confidence gap is large enough to clear the 10-point threshold without AI arbitration. If the gap isn't large enough, the update will silently fail in production until the transaction timeout issue is addressed.

---

*This article is part of the Iranti Benchmark Journal, a running record of the Iranti benchmarking program. Each entry documents what was tested, what was found, what wasn't found, and why the interpretation is bounded. Formal technical papers accompany each entry.*

*Full technical writeup: `papers/B5-knowledge-update-paper.md`*
*Raw results: `results/raw/B5-knowledge-update.md`*
