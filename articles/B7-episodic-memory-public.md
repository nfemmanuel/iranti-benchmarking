# Can a Memory System Help an Agent Remember What Was Said Two Hours Ago?

**Series:** Iranti Benchmark Journal
**Track:** B7 — Conversational Episodic Memory
**Date:** March 2026
**Audience:** Technical generalists — developers, AI researchers, curious readers

---

## The Question

Imagine an AI agent sitting in on a long meeting. Facts come up — a signed date, a budget number, a deadline, a person's name — scattered across an hour of back-and-forth discussion. Forty minutes later, someone asks: "Wait, what did we say the deployment deadline was?"

A human with good notes would check the notes. A language model without persistent memory has to remember from the transcript, as long as the transcript is still in its context. An agent using Iranti writes each fact to a memory store as it's stated, then retrieves it with a direct lookup when needed.

B7 asks: does having Iranti in the loop improve recall accuracy compared to relying on the context window?

---

## What We Actually Did

We wrote a synthetic 51-turn meeting transcript — a research team working through a model deployment timeline. The meeting covered data licensing, model architecture, evaluation design, serving infrastructure, deployment phases, and risk planning. Buried throughout were 12 specific facts: dates, numbers, a ROUGE-L threshold, a person's name, a percentage.

Some facts came up early. The data license date was mentioned in turn 3, then the conversation moved on to infrastructure and never returned to it. Other facts appeared near the end, in a rapid exchange where four separate project dates were negotiated in six turns.

After the transcript was complete, we asked 10 recall questions drawn directly from those embedded facts.

We ran two conditions:

**Context-reading baseline:** The agent reads the complete transcript (about 5,500 tokens) and answers from memory. No tools. No lookups.

**Iranti-assisted arm:** As the agent processes the transcript, it writes each fact to an Iranti knowledge base under a named key. When the probe questions arrive, it retrieves answers via exact-match lookup.

---

## What We Found

Both conditions scored 10 out of 10. No errors. Uniformly high confidence.

There was no difference between them.

---

## Why That's Not the Whole Story

The honest answer to "did Iranti help?" in this particular test is: not measurably. But that answer requires context to be useful.

The transcript is about 5,500 tokens. The model we used for the baseline can hold roughly 200,000 tokens in its context window at once. So the "memory challenge" in this test is roughly equivalent to asking someone to recall a fact from a conversation that happened two minutes ago while reading a two-page document. No memory system is going to improve on that.

The context-reading baseline in B7 is basically a ceiling. Everything is visible. Nothing is truncated. The facts are stated plainly. Of course it works.

That's expected, and it's fine. But it means B7 at this length is not testing what we actually care about.

---

## What B7 Is Actually For

B7 is a methodology test. It establishes the evaluation setup, the transcript structure, the probe question format, and the Iranti write-and-retrieve pattern — all in a condition where we expect both arms to work perfectly. That gives us a clean baseline to scale from.

The same benchmark, run with a much longer transcript, becomes a genuinely discriminative test. There are specific, well-documented conditions where context-reading starts to break down:

**Transcript length beyond the context window.** At some point the full meeting doesn't fit. The model has to choose what to truncate. Facts in the truncated part are simply gone. Iranti, having written them to persistent storage as they appeared, can still retrieve them.

**Cross-session recall.** In a real long-running agent, yesterday's meeting is not in today's context. The baseline cannot access it at all. Iranti can.

**Fragmented attention at long lengths.** Research has shown that language models are less reliable at recalling facts from the middle of very long contexts — they tend to weight the beginning and end of what they read. At 100,000 tokens, a fact from turn 200 of a 500-turn transcript may not be recalled as reliably as a fact from turn 450. Iranti's exact-match lookup doesn't have this problem. It doesn't know or care where in a transcript a fact was stated.

B7 is designed so the same test can be run at any of these scales. The transcript structure supports it. The probe questions scale with it. We now have a clean execution at 5,500 tokens. The interesting executions are the ones at 50,000 and 200,000 tokens.

---

## The Four-Date Problem

There's one structural feature of the B7 transcript worth noting separately, because it's doing real work even if it didn't produce an error this time.

In the last few turns of the meeting, four project dates get established in quick succession:

- Checkpoint freeze: April 10
- Phase 1 deployment starts: April 12
- Deployment deadline: April 19
- Stakeholder demo: April 22

These are all distinct. All important. All within a 12-day window. All stated within six turns of each other.

In a 5,500-token transcript, this is manageable. The model has just read the whole thing and the dates are fresh. In a 100,000-token transcript with a lot of other content in between, asking "when does Phase 1 start?" becomes a more meaningful test — because the system has to return April 12, not April 10, 19, or 22.

Context-reading in a long document is probabilistic about this kind of precision. Exact-match retrieval from a keyed store is deterministic. That's the difference the four-date cluster is designed to expose, and it will start to show up as transcript length increases.

---

## What We Can and Cannot Claim From This Test

**We can say:**
- The Iranti write-and-retrieve pattern works correctly for this type of task. All 12 facts were written and all 10 probed successfully.
- The context-reading baseline handles this length without error, as expected.
- The benchmark infrastructure — transcript, probe questions, evaluation protocol — is functional and ready to scale.

**We cannot say:**
- That Iranti improves recall accuracy, because the test was too short to produce baseline degradation.
- Anything about how either system would perform with cross-session retrieval, truncated context, or realistic transcripts with implicit facts and conversational noise.
- That the results would generalize to a model other than the one we tested with, or to transcripts generated by a different process.

---

## What's Next

The benchmark program will return to B7 at longer transcript lengths. The four-date distractor cluster, the positional distribution of facts, and the Iranti exact-match retrieval pattern are all designed to produce interpretable results at scale. At 5,500 tokens, both approaches work. At 100,000 tokens, we expect to see a difference — and the benchmark is built to measure it cleanly.

This is what the null result in B7 is for: it's the before picture. The after picture requires more length, more turns, and more pressure on the context window.

---

*This article is part of the Iranti Benchmark Journal, a running record of controlled evaluations comparing Iranti-assisted agents against unassisted baselines. Each entry documents what was tested, what was found, what wasn't found, and why the interpretation is bounded.*

*Full technical paper: `papers/B7-episodic-memory-paper.md`*
*Benchmark specification: `benchmarks/B7-episodic-memory/benchmark.md`*
*Raw results: `results/raw/B7-baseline-trial.md`*

---

**Update — v0.2.16 rerun (2026-03-21):** The full B7 protocol was rerun on Iranti v0.2.16 with a real AI provider (OpenAI) replacing the previous mock configuration. Both arms — context-reading baseline and Iranti-assisted — scored 10/10. No errors. The provider change made no difference to either arm, as expected at this transcript length. The null differential is confirmed. The degradation regime (very long transcripts exceeding the context window, or cross-session retrieval) remains the target for future extended runs of this benchmark.
