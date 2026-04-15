# What Happens When Your AI Agent Loses Its Train of Thought? We Tested Whether Iranti Can Pick Up Where It Left Off.

**Published:** 2026-03-21
**Series:** Iranti Benchmarking Program — Public Reports
**Track:** B12 — Interrupted Session Recovery

---

Every AI agent working on a long task faces a quiet threat: the session ends before the task does.

It might be a timeout. It might be a planned handoff to a different agent. It might be a process restart after a system update. Whatever the cause, the working state — everything the agent had figured out, every partial result, every decision still in flight — is at risk of evaporating.

This is the session recovery problem. And it matters more than it might seem, because "long tasks" aren't edge cases. They're what AI agents are increasingly being used for.

We ran a benchmark to test whether Iranti solves this problem. Here's what we found.


> **Current-version note (2026-03-26):** The refreshed rerun keeps the durability and explicit-query recovery story positive, but automatic interrupted-session recovery remains weak. Do not read this article as proof that Iranti generally restores task state on its own after interruption. The current claim is narrower: durability is strong, explicit recovery works, automatic recovery is partial at best.

---

## The Setup

We created a scenario that mirrors real agent work. An AI agent is running an analysis: comparing how three large language models perform on a challenging reasoning task. During the session, the agent writes structured notes to Iranti — two batches of facts, representing two different kinds of working state:

**Setup facts** (what the task is): the evaluation goal, the dataset being used, which models are being tested, and which metric matters.

**Progress facts** (how far along the task is): a preliminary finding from the analysis so far, the next step queued up, an open question that needs resolving, and a partial result from a subset of the data.

Then the session is interrupted.

A fresh session opens. The context window is empty. The recovery agent needs to reconstruct what was going on.

We tested four different ways of doing that recovery.

---

## The First Question: Did the Data Survive?

Before asking whether the data can be found, we need to ask whether it's still there.

The answer is unambiguous: yes. All eight facts survived the session break with full fidelity. Nothing was lost. Nothing was corrupted.

This is worth stating clearly, because write durability is not something to take for granted. Systems that only commit data at session end — or that keep working state in volatile memory — would lose everything in this scenario. Iranti writes to persistent storage as each fact is recorded. The session break doesn't affect what's already written.

That's the foundation. Now the question is: can the new session find it?

---

## Recovery Modality 1: No Iranti

Without a memory system, the recovery agent has nothing. The eight facts were in the interrupted session's context. When that context ended, they ended with it.

**Recovery: 0/8.**

This is the baseline. It's also the normal state of affairs for any AI agent workflow that doesn't use external persistent memory.

---

## Recovery Modality 2: The Standard Session Start (iranti_handshake)

When a new Iranti session begins, the agent can call `iranti_handshake`. This returns session metadata: which agent is running, what instance it's connected to, configuration information.

We tested whether handshake also incidentally returns any task-entity facts from the prior session.

**Recovery: 0/8.**

It doesn't. Handshake is a session initialization tool, not a recovery tool. This is expected behavior, and we document it here specifically because an agent designed without this knowledge might call handshake hoping to "pick up where it left off" — and find nothing.

---

## Recovery Modality 3: Hint-Assisted Observe (iranti_observe)

`iranti_observe` is Iranti's context recovery tool. You give it a description of your current situation and (optionally) a hint about which entity you're looking for. It retrieves the most relevant facts from the knowledge base.

We called it with a context string explaining the situation ("Resuming interrupted session. Was analyzing LLM multi-hop reasoning performance. Need to recover what was being tested and current progress.") and a hint pointing at the right entity.

**Recovery: 5/8.**

Five facts came back. Here's which five:

- The evaluation goal
- The dataset being used
- Which models were under test
- The primary metric

...and one progress fact: the preliminary finding.

**Not returned:** the next step, the open question, and the partial in-flight result.

The pattern is striking. All four setup facts came back. Only one of four progress facts came back. The agent recovers enough to know what it was working on — but not enough to know how far it had gotten.

This happens because of how the facts were written. Setup facts were stored at confidence 95; progress facts at confidence 90. When observe ranks results, higher-confidence facts come first. With eight facts and eight result slots, you might expect all eight to appear — but the ranking fills the top spots with setup facts, and only the most contextually relevant progress fact (the preliminary finding) squeezes into the fifth position. The other three progress facts don't surface.

---

## The Most Important Gap

Stop and consider what's missing. The three unreturned facts are:

- **What to do next** (next step)
- **What question is still open** (open question)
- **Where the in-progress work stands** (partial result: questions 1–80 processed, GPT-4o EM=0.74 on bridge subset so far)

These are exactly the facts that are hardest to reconstruct from scratch. The setup facts — which task, which dataset, which models, which metric — can be re-derived from task documentation. The progress facts cannot. They represent work already done, findings already reached, and questions already identified as important. Losing them doesn't just delay the task; it may mean redoing work.

And `iranti_observe` recovers these at 1 out of 4.

---

## Recovery Modality 4: Explicit Key Query (iranti_query)

The fourth modality is the most powerful and the most demanding. `iranti_query` lets you directly request specific facts by entity ID and key name. If you know you want `task/session_recovery_eval → next_step`, you ask for it and get it.

We queried all eight keys explicitly.

**Recovery: 8/8.**

All eight facts came back. Setup facts. Progress facts. Everything. Exactly as written.

This result requires the recovery agent to have prior knowledge of the entity ID and key names — information that must be designed into the agent's session handoff protocol. Without this oracle knowledge, recovery defaults to the observe path (5/8) or is not possible.

This is lossless recovery. The data is all there; a targeted query retrieves it all.

---

## The Honest Picture

Here's the full comparison:

| Recovery method | Facts recovered | Setup (4) | Progress (4) |
|----------------|----------------|-----------|--------------|
| No Iranti | 0/8 | 0/4 | 0/4 |
| Handshake | 0/8 | 0/4 | 0/4 |
| Observe + hint | 5/8 | 4/4 | 1/4 |
| Explicit query | 8/8 | 4/4 | 4/4 |

The data is always safe. The question is how easily the new session can find it.

With explicit query, recovery is perfect — but it requires the recovery agent to know the entity ID and the key names to ask for. In this evaluation, we supplied those explicitly. In a real deployment, the interrupted session would need to communicate this information to the recovery session through some kind of handoff artifact or naming convention.

With hint-based observe, recovery is partial: complete for setup context, incomplete for progress state. The agent wakes up knowing what it was doing but not fully knowing where it left off.

---

## What This Means for Anyone Building Agent Workflows

If you're building AI agent workflows that need to survive interruption, the B12 benchmark suggests a few practical principles:

**Write facts early, not just at the end.** Iranti's persistence works because facts are written during the session, not committed at the end. An agent that "plans to write everything when it's done" loses everything if it doesn't finish.

**Progress facts matter more, but rank lower.** If you want hint-based observe to surface your in-flight state, consider writing progress facts at the same confidence level as setup facts — or higher. The confidence parameter isn't just a data quality signal; it affects what gets retrieved.

**Design for handoff, not just recovery.** Full recovery (8/8) is achievable, but it requires the recovery agent to know what to ask for. A well-designed agent workflow should leave a handoff record — a list of entity IDs and key names the recovery agent can use to issue targeted queries.

**The data is never the problem.** All eight facts survived. Write durability works. The question of session recovery is entirely a retrieval design question.

---

## What This Doesn't Mean

This benchmark ran one test with one set of facts. The numbers (5/8, 8/8) are from a single trial, not a distribution. They describe what happened in one controlled scenario; they don't guarantee the same results across all fact types, entity sizes, or session structures.

The session break was also simulated — we cleared the context and opened a fresh session, but we didn't actually kill the process. Real interruptions (crashes, timeouts, network failures) may involve edge cases that a clean simulation doesn't capture.

We're not claiming Iranti solves the session recovery problem completely. We're reporting what the tools do when they're used, under what conditions they succeed, and where the gaps are.

---

## The Short Version

The data never gets lost. Iranti's write durability is solid.

The question is how easily the new session can find it. Explicit query: perfect recovery. Hint-based observe: complete for setup, incomplete for progress. Handshake: not a recovery tool.

The biggest gap is in progress facts — the hardest to reconstruct, and the least reliably surfaced by automatic recovery. Closing that gap is partly a tool design question (should observe weight in-flight state differently?) and partly an agent design question (should agents maintain handoff artifacts?). Both are solvable.

---

*This report is part of the Iranti Benchmarking Program. All results are from controlled evaluations using the installed Iranti instance (v0.2.16). Raw results and full methodology are available in the accompanying technical paper.*
