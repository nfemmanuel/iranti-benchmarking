# B7 Conversation Transcript — Research Project Planning Session

**Generated for:** B7 Episodic Memory Benchmark
**Format:** Simulated multi-turn research planning meeting
**Total turns:** 48
**Embedded facts:** 12 (facts marked with [FACT-N] inline — remove markers for baseline arm)
**Purpose:** Test recall of facts stated early in conversation after long intervening discussion

---

RESEARCHER REGISTRY — PROJECT ALIGNMENT MEETING
Participants: PM (project manager), Dr. Rivera (lead researcher), Dr. Tanaka (ML engineer)
Date: March 2026

---

Turn 1 — PM: Alright, let's get the weekly sync started. Dr. Rivera, can you give us the quick state of the project?

Turn 2 — Rivera: Sure. We're making solid progress on the embedding layer. The main blocker right now is the training data pipeline — we've been waiting on the licensing approval from our data partner.

Turn 3 — PM: Right. Speaking of which — I heard from Legal this morning. [FACT-1: The data licensing agreement was signed on March 15th.] So that blocker should be resolved. How long until you can integrate the new data?

Turn 4 — Rivera: Maybe a week to validate the format and run initial quality checks. If everything looks clean, we can start training by end of the month.

Turn 5 — Tanaka: I've been looking at the pipeline while we were waiting. One thing I want to flag: the current preprocessing script assumes UTF-8 encoding, but about 12% of the new dataset is ISO-8859-1. We'll need to handle that.

Turn 6 — Rivera: Good catch. Can you own that fix? We probably need it done before the integration.

Turn 7 — Tanaka: Already started. I'd say two days for a proper fix with tests.

Turn 8 — PM: Great. Let's talk about the model architecture decisions. [FACT-2: The target parameter count for the production model is 7 billion.] I want to make sure we're all aligned on that before we commit infrastructure resources.

Turn 9 — Rivera: Yes, 7B is what we scoped. We looked at 13B briefly but the inference cost makes it impractical for our latency requirements.

Turn 10 — Tanaka: We benchmarked latency last week. At 7B we're getting 95ms p50 on the current hardware, which is within spec. 13B pushed us to 210ms which is double the budget.

Turn 11 — PM: Glad we have that data. What about training compute? Do we have enough reserved?

Turn 12 — Rivera: [FACT-3: We have 512 A100 GPU-hours reserved through the end of Q2.] That should be enough for three training runs at 7B if we're efficient.

Turn 13 — Tanaka: Actually I want to revisit the training schedule. With the data licensing delay, we've shifted later than planned. Can we extend the reservation?

Turn 14 — PM: I'll check with infrastructure. Let's assume for now that we work within the existing allocation and plan accordingly.

Turn 15 — Rivera: Makes sense. On the evaluation side — I've started drafting the evaluation protocol. We're planning to use three standard benchmarks plus an internal holdout set.

Turn 16 — PM: Which standard benchmarks?

Turn 17 — Rivera: MMLU, HumanEval, and HellaSwag. [FACT-4: The internal holdout set contains 2,400 curated examples from production traffic.] It's the one Dr. Kim's team assembled over Q4.

Turn 18 — PM: Good. Has Dr. Kim signed off on the holdout usage?

Turn 19 — Rivera: Yes, we have written approval. I'll forward it to you.

Turn 20 — Tanaka: On the infrastructure side — I want to bring up the serving architecture. We're debating between two options. Option A is a single monolithic model server. Option B is an ensemble of smaller specialized models.

Turn 21 — PM: What's the trade-off?

Turn 22 — Tanaka: Option A is simpler to deploy and has lower operational overhead. Option B has potentially better accuracy on domain-specific tasks but requires routing logic and is harder to debug. [FACT-5: The estimated engineering cost for Option B is 6 weeks of additional work.]

Turn 23 — PM: That's significant. Given our timeline pressure, I'd lean toward Option A for the initial release. We can always migrate to ensemble later if the benchmark numbers justify it.

Turn 24 — Rivera: I agree. Option A also makes our evaluation cleaner — we're evaluating one model, not a complex system.

Turn 25 — Tanaka: Fair. One more thing on infrastructure: I've been talking to the cloud team about auto-scaling. There's a new provisioning API they rolled out last month that can cut scale-up time from 90 seconds to about 8 seconds.

Turn 26 — PM: That's a big deal for latency spikes. Is it stable?

Turn 27 — Tanaka: They say it's been in production for 6 weeks with no incidents. I'd want to do a brief canary test before we depend on it.

Turn 28 — Rivera: Makes sense. Can we time that with the initial deployment of the serving layer?

Turn 29 — Tanaka: Sure. I'll plan a 5% traffic canary for the first week.

Turn 30 — PM: Good. Let's move to risks. What's keeping you up at night, Dr. Rivera?

Turn 31 — Rivera: Honestly, the main risk right now is evaluation overfitting. Because we've been iterating partly based on the MMLU score, I'm worried our model will be good on MMLU but weak on the holdout set. The holdout is harder — it's production traffic with real distribution.

Turn 32 — PM: How do we mitigate that?

Turn 33 — Rivera: We need to be disciplined about not looking at holdout performance until we're actually done with training iterations. I want to enforce a formal gate: nobody touches the holdout evaluation until we've frozen the model checkpoint.

Turn 34 — PM: Agreed. Let's make that an official process requirement. [FACT-6: The model checkpoint freeze date is April 10th.] After that, no more architecture changes, just final evaluation.

Turn 35 — Tanaka: That gives us roughly 3 weeks from now. Is that enough?

Turn 36 — Rivera: It's tight but workable if the data pipeline is unblocked now.

Turn 37 — PM: Dr. Tanaka, let's also discuss the deployment rollout plan. What's the current thinking?

Turn 38 — Tanaka: We're planning a three-phase rollout. [FACT-7: Phase 1 targets 5% of traffic in the EU region only.] This minimizes blast radius if there's an issue.

Turn 39 — PM: What's the criteria for advancing to Phase 2?

Turn 40 — Tanaka: Two things: first, 7 days of stable operation at Phase 1 with no P0 incidents. Second, the production accuracy on the EU traffic must be within 2% of the benchmark accuracy we measured offline.

Turn 41 — Rivera: What about the NLP-specific metrics? BLEU scores tend to be unstable for short interactions.

Turn 42 — Tanaka: We're using ROUGE-L for summarization tasks and exact match for structured outputs. [FACT-8: The minimum passing ROUGE-L score for Phase 2 advancement is 0.68.] We calibrated that threshold against the current production model.

Turn 43 — Rivera: Is that achievable? What does the 7B model score on that task in offline evaluation?

Turn 44 — Tanaka: 0.71 on our holdout set, so we have a 3-point buffer. But the holdout distribution and live traffic can diverge.

Turn 45 — PM: Let's be conservative. If live ROUGE-L drops below 0.68, we roll back immediately. No debates. [FACT-9: The rollback decision owner is Dr. Tanaka.] She has final authority on rollback.

Turn 46 — Rivera: Agreed. I'd rather roll back quickly than chase a live distribution shift.

Turn 47 — PM: Last item — the stakeholder briefing. [FACT-10: The stakeholder demo is scheduled for April 22nd.] We need the model deployed and stable by then.

Turn 48 — Tanaka: That's 12 days after the checkpoint freeze. Should be enough for deployment and a Phase 1 soak. Rivera, can you own the demo preparation?

Turn 49 — Rivera: Yes. I'll need 3 days for demo materials. So I need deployment complete by April 19th at the latest. [FACT-11: The deployment deadline is April 19th.] Tanaka, does that work?

Turn 50 — Tanaka: That's tight but I can make it work if Phase 1 starts by April 12th. [FACT-12: Phase 1 deployment starts April 12th.] Let's make that the hard target.

Turn 51 — PM: Alright. Let's lock in those dates. I'll send a calendar invite with the key milestones. Thanks everyone, good meeting.

---

## Ground Truth — 12 Facts

| Fact | Key | Value |
|------|-----|-------|
| FACT-1 | data_license_signed | March 15th |
| FACT-2 | target_parameter_count | 7 billion |
| FACT-3 | gpu_hours_reserved | 512 A100 GPU-hours through end of Q2 |
| FACT-4 | holdout_set_size | 2,400 examples |
| FACT-5 | option_b_engineering_cost | 6 weeks |
| FACT-6 | checkpoint_freeze_date | April 10th |
| FACT-7 | phase1_rollout_scope | 5% of traffic, EU region only |
| FACT-8 | rouge_l_threshold | 0.68 |
| FACT-9 | rollback_decision_owner | Dr. Tanaka |
| FACT-10 | stakeholder_demo_date | April 22nd |
| FACT-11 | deployment_deadline | April 19th |
| FACT-12 | phase1_start_date | April 12th |

---

## Probe Questions (10 of 12 facts, omitting FACT-3 and FACT-7)

Q1: When was the data licensing agreement signed?
Q2: What is the target parameter count for the production model?
Q3: How many examples are in the internal holdout set?
Q4: What is the estimated additional engineering cost for Option B (ensemble architecture)?
Q5: What is the model checkpoint freeze date?
Q6: Who has final authority on the rollback decision?
Q7: What is the minimum ROUGE-L score required to advance from Phase 1 to Phase 2?
Q8: When is the stakeholder demo scheduled?
Q9: What is the deployment deadline?
Q10: When does Phase 1 deployment start?
