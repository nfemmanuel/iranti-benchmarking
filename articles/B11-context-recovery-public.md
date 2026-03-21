# When the AI Forgets: Testing Whether Iranti Can Recover What Fell Out of Context

**Published:** 2026-03-21
**Series:** Iranti Benchmarking Program — Public Reports
**Track:** B11 — Context Recovery

---

One of the quieter problems in AI systems is that they forget.

Not permanently — the information isn't gone. But if a conversation or task session runs long enough, the things the AI knew at the beginning are no longer in its active working memory. The context window fills up. Earlier facts get pushed out to make room for newer ones. The AI can still reason fine, but it's reasoning without facts it used to have.

This is the "context window problem," and it's one of the main reasons AI memory systems like Iranti exist. The idea is that instead of letting facts fall out of reach, you offload them to a knowledge base — and then retrieve them later when you need them again.

We ran a benchmark to test whether that retrieval actually works.

---

## The Setup

We simulated a realistic scenario. Imagine an AI agent ("Agent Alpha") that helped design a software project — let's call it "lunar_api_v3" — and recorded six key decisions along the way: what database to use, what authentication method to use, what the SLA commitment was, where to deploy it, what the rate limits would be, and how versioning would work.

Those six facts were stored in Iranti's knowledge base.

Then, in a new session, another agent (or the same agent after its context was cleared) needed those facts. Its active working memory had moved on. It was now planning the deployment and needed to remember what had been decided. It said, roughly:

> "We are planning the lunar_api_v3 deployment. I need to remember what auth method we decided on and what our SLA commitment is. Also need to recall what database we chose."

We gave this context text to `iranti_observe` — the Iranti tool designed for exactly this scenario — and watched what came back.

---

## What Worked: The Recovery Itself

With one hint provided — telling the system to look at the entity called `project/lunar_api_v3` — the recovery was mostly successful.

Of the six stored facts, five came back:

- The database choice (PostgreSQL 16): returned, ranked first
- The authentication strategy (JWT with 60-minute tokens): returned, ranked second
- The SLA uptime target (99.9% monthly): returned, ranked third
- The deployment region (primary us-east-1, failover eu-west-1): returned, ranked fourth
- The rate limit (500 requests per minute per key): returned, ranked fifth

The sixth fact — API versioning policy — was not returned. Based on the system debug output, it appears to have been dropped due to a technical error in parsing rather than being ranked least relevant. We've flagged this for investigation.

That's 5 of 6 facts recovered, and the ranking made sense. The three facts the context explicitly asked about came back first. Two additional facts the agent didn't explicitly ask for — but that are relevant to a deployment discussion — were surfaced proactively. That's the right behavior.

---

## What Didn't Work: The System Couldn't Find the Entity on Its Own

Here's the critical part.

The recovery only worked because we told the system exactly which entity to look for: `project/lunar_api_v3`. We provided an explicit "entity hint."

We can see in the system's own debug output what happened before that hint was applied:

```
detectedCandidates: 0
```

Zero. The system looked at the context text — which contains the phrase "lunar_api_v3" spelled out exactly — and found no relevant entities on its own.

Without the hint, the observe call would have returned nothing.

This matters because the entity hint had to come from somewhere. In this test, we supplied it manually. But in a real deployment, the AI agent would have to know to provide that hint. That means the agent needs to be tracking which entities it has stored in Iranti — even after those entities have fallen out of its active context window.

The very scenario where you'd want automatic recovery — the agent has lost track of what it stored — is exactly the scenario where the agent might not know which entity ID to provide as a hint.

---

## The Plain-Language Version of Both Findings

Think of Iranti's observe function like a personal assistant you can ask to pull your files.

The good news: when you tell the assistant which drawer to look in, they come back with most of what you need, in the right order.

The limitation: if you say "could you pull the lunar_api_v3 files?" without specifying where they're filed, the assistant looks around and says "I don't see anything by that name." Even though the filing cabinet has a label on it that says "lunar_api_v3."

That label-recognition step is what's currently not working. The system should be able to read the context text, see "lunar_api_v3," and infer "this probably refers to the entity called project/lunar_api_v3." It's not doing that yet.

---

## How This Compares to What We Found in B7

In an earlier test (B7), we evaluated a different Iranti pattern: rather than recovering facts after they're needed, the agent writes them as they're decided.

That approach worked well. It sidesteps the entity-detection problem entirely: when you're writing a fact, you already have the entity ID in front of you. You don't need to detect it from text later.

The comparison is important. The two approaches aren't in competition — they serve different situations. But it does mean that the "write early, write proactively" pattern is currently more reliable than the "recover later on demand" pattern. If an agent knows it will need information later, it should write it explicitly at the time. Relying on observe to page it back in requires entity-ID awareness that may not always be present.

---

## The Honest Summary

What we found:

- `iranti_observe` can recover relevant facts from the knowledge base at 83% coverage when the right entity is identified.
- Relevance ranking is working correctly: explicitly requested facts come first.
- Entity auto-detection from context text is not currently working. The system could not identify a relevant entity even when the entity's name appeared verbatim in the context.
- Hints are required. Without them, recovery returns nothing.

What this means for users and developers:

- The page-in mechanism works, but only when you already know where to look.
- Agents using `iranti_observe` should be designed to track entity IDs throughout their sessions, so they can supply accurate hints later.
- Auto-detection needs to be fixed before context recovery can work "automatically" for agents that have genuinely lost track of what they've stored.

What this does not mean:

- It does not mean Iranti's memory is broken. Storing and retrieving facts with known entity IDs works reliably (confirmed in B1, B4, and here).
- It does not mean the 83% recovery rate is a permanent ceiling. That figure is from one test with one entity. It needs to be confirmed across a wider set of entities and fact types before we treat it as a stable number.

---

## What We're Testing Next

The auto-detection failure is the most important thing to understand from this benchmark. We want to know:

- Does detection work if the full namespace-qualified entity ID (`project/lunar_api_v3`) appears in context, rather than just the bare name?
- Is this a lexical matching problem, or does it involve the vector embedding index?
- Can agents be designed to maintain entity registries that make hint construction automatic?

We'll also be expanding the coverage test to entities with more facts and testing whether the maxFacts cap interacts with coverage in predictable ways.

---

## Bounded Claim

This benchmark ran one test with one entity. The 83% figure should be read as: "In one controlled trial, observe recovered 5 of 6 facts when the entity was correctly identified." Not as a general performance guarantee.

The auto-detection failure should be read as: "In one controlled trial, the system failed to detect a relevant entity from context text, even with verbatim matching." This is a concrete finding worth investigating.

Both findings are real. Neither should be overstated.

---

**Update (v0.2.14, 2026-03-21):** One capability improved in v0.2.14 — the `iranti_attend` classifier no longer crashes and now correctly identifies that memory injection is needed. This is a real fix. In v0.2.12, the classifier silently failed and defaulted to not injecting anything. In v0.2.14, it evaluates the context, recognizes that a memory reference is present, and correctly decides to proceed with injection (confidence=0.93). The decision layer works.

However, the content it injects is still wrong, because entity auto-detection remains broken. The original finding from v0.2.12 — that `iranti_observe` cannot identify relevant entities from context text alone — is unchanged in v0.2.14. When `iranti_attend` fires and asks "what should I inject?", the retrieval layer still can't find the right entity on its own. So the tool now makes the right call; it just can't yet find the right facts to back it up.

There's also a new observation worth flagging: an irrelevant entry (`user/main/favorite_city`) appears in retrieval results that should contain only benchmark-relevant facts. This entry appears to have been written by Iranti itself during a prior session, not by anything in this benchmark. It's consuming result slots and slightly reducing measured coverage. We're treating this as a methodology issue to clean up before further reruns.

The short version: partial credit. One layer fixed, one layer still broken. See the formal paper addendum for the full sub-test breakdown and version comparison table.

> **Confirmed (OpenAI provider, 2026-03-21):** We retested with a real AI provider. The iranti_attend improvement is real — not a testing artifact. The tool now correctly decides when to activate memory. The remaining gap (finding the *right* memory automatically) is a deeper architectural issue that a better AI provider can't fix on its own. Both findings are now confirmed against a real provider.

---

**Update (v0.2.16, 2026-03-21):** This version brings the most significant improvement yet — and introduces one new quirk worth knowing about.

**The big fix: automatic entity detection.**

Through all of v0.2.12 and v0.2.14, there was a fundamental problem buried under the surface of B11: Iranti couldn't find the right project in memory on its own. Every time we asked it to "look up what we know about this project," it came back empty-handed unless we told it exactly which internal entity ID to look at. We had to hand-hold it. That was the core missing piece — and it's now fixed in v0.2.16.

The system can now take the context text, figure out which project is being referenced, and retrieve the relevant facts — with no hints from us. In the test, it resolved the correct entity with confidence 0.82 and returned 5 out of 6 facts, entirely on its own. That's the behavior the tool was always supposed to have.

This also improves the `iranti_attend` path — the tool that decides whether to inject memory into an AI response automatically. Previously, even though the tool correctly decided *to* inject memory (that was fixed in v0.2.14), it couldn't find the *right* memory because entity detection was broken. Now, with detection working, attend is firing correctly and injecting relevant facts. It's not perfectly clean — more on that below — but the full pipeline now functions end to end.

**One new quirk: special characters cause silent drops.**

We found a new defect in v0.2.16. If a fact's value contains special characters — specifically percent signs (%) or forward slashes (/) — Iranti silently drops it from retrieval results. The data is there; Iranti just can't serve it back. The technical cause appears to be a parsing failure in the result scoring pipeline when it encounters those characters.

The affected fact in our test was the SLA uptime entry: "99.99% weekly, incident response SLA 15min." Contains both a `%` and a `/`. It was returned successfully in v0.2.12 but is now silently excluded. We confirmed it still exists in the knowledge base — a direct query retrieves it fine — so this isn't data loss. It's a retrieval pipeline defect, and it's narrow but real.

If you're storing facts that include measurements, percentages, file paths, URLs, or anything with slashes, they may not come back through observe or attend in v0.2.16. Worth knowing.

**On the remaining noise in the natural attend path.**

When `iranti_attend` runs in its fully automatic mode — no hints, no force-injection — it still picks up one irrelevant fact alongside the project-specific ones. An entry called `user/main/favorite_city` (confidence=91) occupies one of the injection slots. This appears to come from the attend pipeline resolving the user's general context before the project-specific context, and it surfaces a piece of background user information that has nothing to do with the task.

This noise entry doesn't appear when you use explicit hints or force-injection — those paths are clean. It's specifically the "fully automatic, figure it out from context" mode that still has this quirk. That's honest: the fully autonomous path is better than before, but it's not yet perfectly focused.

**The short version of where things stand:**

| | Before v0.2.16 | v0.2.16 |
|---|---|---|
| Find the right entity automatically | Broken | Fixed |
| Recover facts with a hint | Works (83%) | Works (83%) |
| Attend: decide to inject | Works (fixed in v0.2.14) | Works |
| Attend: inject the right facts | Broken (couldn't find entity) | Mostly works |
| Facts with % or / in value | Works | Silently dropped (new defect) |
| Noise entry in auto attend | Present | Present (narrowed to auto path) |

The trajectory is clearly positive. The architectural issue that made hint-free recovery impossible is resolved. What remains is a new narrow defect and some noise in one specific path — much more tractable problems than "the whole retrieval layer doesn't work."

---

*This report is part of the Iranti Benchmarking Program. All results are from controlled evaluations using the installed Iranti instance. Raw results and full methodology are available in the accompanying technical paper.*
