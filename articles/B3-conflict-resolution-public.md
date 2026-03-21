# When Two Sources Disagree, Which One Wins?

**Series:** Iranti Benchmark Journal
**Track:** B3 — Conflict Resolution
**Date:** March 2026
**Audience:** Technical generalists — developers, AI researchers, curious readers

---

## The Question We're Actually Asking

Suppose two different agents write conflicting facts to the same knowledge base. One says a researcher works at Princeton. Another says Yale. Iranti can't know which is right — it wasn't there. So what does it do?

Any system that accepts writes from multiple sources has to answer this question. If it accepts everything, the knowledge base fills up with contradictions. If it rejects everything that disagrees with what's already stored, genuine corrections never land.

Iranti uses a scoring system to decide: each fact has a confidence score, and each source has a reliability score that accumulates over time. When two facts conflict, the higher-scoring one wins — unless the scores are too close, in which case it calls in an LLM to adjudicate.

This benchmark tests whether that system works, and where it breaks.

---

## What We Actually Tested

We designed five conflict scenarios, each probing a different edge case.

Each scenario stored a "correct" fact first, then attempted to overwrite it with a wrong one — or vice versa. We then checked which value ended up in the knowledge base.

| Scenario | Setup | What we wanted to know |
|----------|-------|----------------------|
| C1 | Correct fact at confidence 90; wrong fact at 70 | Does the scoring system reject the wrong fact? |
| C2 | Wrong fact written first at confidence 90; correct fact at 70 | Can you fix a high-confidence error with a lower-confidence correction? |
| C3 | Correct at 78, wrong at 75 | Does LLM arbitration get it right when scores are close? |
| C4 | Correct at 76, wrong at 75 | Does it still work when scores are nearly identical? |
| C5 | Correct from a "trusted" source at 70; wrong from a "low reliability" source at 80 | Does source reputation override raw confidence? |

---

## What We Found

Four out of five scenarios ended with the correct fact in the knowledge base. One did not.

**C1:** The system correctly rejected the lower-confidence wrong fact. No surprise here — this is the scenario the system is designed for.

**C3 and C4:** Both very-close-confidence cases were resolved correctly by LLM arbitration. The LLM looked at both candidates, noted that the existing entry had a more established source, and kept the correct one. This worked even when the confidence gap was less than 1 point.

**C5:** The adversarial fact had higher raw confidence (80 vs 70) and a higher weighted score. Despite this, LLM arbitration kept the correct fact — citing the existing entry's "more established source." The correct fact was preserved.

**C2:** The wrong fact was never corrected. This is the failure case.

---

## The C2 Problem Is Real

In C2, a wrong fact was written first with confidence 90. The correct value was then written with confidence 70.

Iranti looked at the scores and did the math: existing score 76.5, incoming score 60.1. Gap is 16.4 points. No ambiguity — reject the incoming write. The wrong fact stays.

This is the system working as designed. Iranti has no way to know which source is actually right. It can only compare scores. If the wrong fact has a high enough score, it blocks corrections.

This matters in practice. Imagine an automated agent that wrote a confident but wrong fact early in a project. Later, a human reviewer tries to correct it but doesn't know they need to use a higher confidence score — or the same original source — to get past the gate. The correction gets silently rejected. No error, no warning. The KB looks fine. The fact is still wrong.

The documented mitigations are: use the same source with a confidence high enough to create a score gap of at least 10, or use a forced-write if one exists. We didn't test a forced-write in this benchmark — that interface may or may not be available.

---

## The C5 Finding Is Interesting — And Worth Being Cautious About

In C5, the adversarial fact had both a higher raw confidence and a higher weighted score. The only thing going for the correct fact was its source name: `b3_trusted_reviewer` versus `b3_low_reliability`.

The LLM picked the correct fact, citing its "more established source."

The mechanism is worth examining. Iranti's scoring system assigns default reliability to sources it hasn't seen before — it can't distinguish between `b3_trusted_reviewer` and `b3_low_reliability` based on track record, because both were new in this test. But the LLM read those source names as semantic signals and drew the right conclusion.

This is emergent behavior: the LLM is doing something Iranti's scoring system hasn't learned yet. That's useful. It also means the outcome can be influenced by choosing flattering source names — name your write source `authoritative_reviewer` and the LLM may weight it more favorably than a source named `draft_notes`, even if both are equally reliable in practice.

We're not saying this is a major exploit. We're saying it's worth knowing.

---

## What the Contested Flag Does (and Doesn't Do)

After a conflict is resolved, you might expect the winning fact to be marked as "contested" — a flag saying "someone else tried to overwrite this." That didn't happen in any of the five cases.

Rejected writes don't mark the retained entry as contested. The knowledge base has no record that a conflict occurred at all. A reader of the KB can't tell that C2's wrong Yale fact was written first and the correct Princeton fact was later rejected. From the outside, it looks like uncontested knowledge.

This is a meaningful gap. Auditability of conflicts — knowing that a fact has been challenged — would be useful for any system that needs to reason about uncertainty.

---

## What We Can Claim

**Confirmed:**
- The scoring system correctly handles the common case (higher-confidence correct fact blocks lower-confidence wrong one)
- LLM arbitration gets the right answer in close-score cases — at least in the three cases we tested
- 4 of 5 conflict scenarios end with the correct fact in the KB

**Real limitations identified:**
- High-confidence wrong facts block lower-confidence corrections. This is the C2 problem and it is a genuine operational risk.
- LLM arbitration uses source names as credibility signals, which it cannot verify. Source names can influence outcomes.
- The knowledge base does not record that conflicts occurred. There's no audit trail for rejected writes.

**Not confirmed:**
- Whether LLM arbitration is reliable in general — we only have three cases. Any of them could have gone differently with different source names or confidence values.
- Whether the C2 failure is representative of real-world conflict rates in deployed systems.

---

## Why It Matters

Conflict resolution is one of the most operationally important capabilities in any multi-agent knowledge system. If multiple agents are writing facts, conflicts will happen — not always from malicious input, usually from genuine disagreement between sources.

The B3 results suggest that Iranti's conflict resolution is solid for the most common case (wrong fact with lower confidence gets rejected), handles ambiguous cases reasonably via LLM arbitration, and fails in a specific and predictable way (high-confidence wrong first write locks out corrections). Knowing exactly how and when it fails is more useful than a vague assurance that it works.

The 4/5 score is honest. It's not a failure. It's also not 5/5.

---

*This article is part of the Iranti Benchmark Journal, a running record of the Iranti benchmarking program. Each entry documents what was tested, what was found, what wasn't found, and why the interpretation is bounded. Formal technical papers accompany each entry.*

*Full technical writeup: `papers/B3-conflict-resolution-paper.md`*
*Raw results: `results/raw/B3-conflict-resolution.md`*
