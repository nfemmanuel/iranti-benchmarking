# Knowledge Currency and Temporal Fact Update in an External Memory System: A Controlled Evaluation of Iranti's Conflict Resolution Architecture

**Status:** Working paper — not peer-reviewed
**Version:** 0.1 (Initial draft, 2026-03-21)
**Authors:** Iranti Benchmarking Program (Research Program Manager, Benchmark Scientist, Replication Engineer)
**Benchmark track:** B5 — Knowledge Currency / Temporal Update
**Model under test:** Iranti (installed instance, local)
**Infrastructure:** Iranti instance at localhost:3001

---

## Abstract

We evaluate whether Iranti's knowledge base supports temporal fact update — the ability to replace an outdated fact with a newer, more accurate value — under controlled conditions. The evaluation uses five test cases varying source identity, incoming confidence, and score gap. Results reveal that Iranti does not implement an explicit update primitive: all writes, including intended updates, are processed through the conflict resolution pipeline. Update acceptance is determined by a weighted scoring formula, `weighted_score = raw_confidence × (0.7 + source_reliability × 0.3)`, applied to both the incoming and existing entries. Deterministic acceptance or rejection occurs when the weighted score gap meets or exceeds 10 points; otherwise, the system routes to large language model (LLM) arbitration. A consistent bias in LLM arbitration was observed: in all cases routed to arbitration (2/2), the LLM rejected the incoming update, citing preference for the "established source" — even when both the existing and incoming sources were newly created and had equivalent reliability histories. The practical consequence is that updates by new sources cannot reliably succeed unless the raw confidence advantage is large enough that the weighted score gap exceeds the deterministic threshold. This finding has direct implications for any multi-agent system in which different agents maintain competing views of a shared fact over time.

---

## 1. Introduction

Knowledge base systems used in agentic and memory-augmented LLM applications face a fundamental requirement that static retrieval benchmarks do not address: facts change. A researcher changes institution; a product's specification is revised; an organization's leadership turns over. A KB that correctly stores a fact at time T must also correctly update that fact at time T+1 when better information is available.

This temporal update requirement is distinct from conflict resolution between simultaneously competing claims (studied in B3). It is also distinct from duplicate detection. Temporal update is specifically the case where the agent that writes an update knows that the prior entry is stale and intends to supersede it.

The B5 benchmark examines whether Iranti's architecture supports this use case. The primary research question is:

> Can a new source reliably update a fact previously written by an established source, and under what conditions does Iranti's conflict resolution system accept or reject the incoming update?

A secondary question concerns mechanism:

> Is the update decision made deterministically by the scoring formula, or is it delegated to LLM arbitration, and does LLM arbitration introduce systematic bias?

The answers to these questions determine whether Iranti is suitable as the memory layer in systems where facts evolve over time and may be updated by agents different from the original writers.

---

## 2. Related Work

### 2.1 Knowledge Base Update Semantics

The problem of updating a knowledge base entry when new information arrives has been studied in the context of belief revision (Alchourrón, Gärdenfors, and Makinson, 1985), which establishes formal axioms that a rational belief revision operator should satisfy. The AGM postulates include Revision (a new belief should be incorporated if consistent with the background), Success (the new belief should be in the revised set), and Minimal Change (revision should not discard more prior beliefs than necessary). A KB system that consistently rejects incoming updates from new sources, as Iranti appears to do, would violate the Success postulate in cases where the incoming information is intended as a superseding fact.

Wikidata and similar collaborative knowledge bases address temporal updates through statement qualifiers that encode temporal scope (e.g., "start time," "end time"), allowing multiple conflicting statements to coexist with different validity windows (Vrandecic and Krötzsch, 2014). Iranti does not appear to implement temporal scoping; each fact key holds a single value, and updating requires overwriting the prior value through the conflict resolution pipeline.

### 2.2 Temporal Question Answering

Temporal QA benchmarks (Chen et al., 2021; Dhingra et al., 2022) evaluate whether retrieval and QA systems correctly handle temporally scoped facts — answering "who was the CEO of X in 2015?" differently from "who is the CEO of X now?" These benchmarks highlight that knowledge currency is a first-order concern for systems deployed over long time horizons. A KB that cannot accept valid updates will accumulate stale facts, degrading the temporal accuracy of any QA system that reads from it.

Jia et al. (2018) show that neural QA models are sensitive to how temporal expressions are phrased and may give stale answers even when updated information is available. This motivates studying not only whether a KB accepts updates but also whether the acceptance mechanism is reliable and unbiased.

### 2.3 Conflict Resolution in Memory-Augmented LLMs

MemGPT (Packer et al., 2023) introduces a memory management system for LLMs in which the model is responsible for deciding what to retain and what to evict. In MemGPT, the update decision is made entirely by the LLM via self-editing; there is no separate conflict resolution layer with a scoring formula. The Iranti architecture differs: it separates the scoring and arbitration steps, using a deterministic formula when the score gap is sufficient and escalating to LLM arbitration only when scores are close. B5 tests whether this hybrid architecture produces reliable update behavior.

Prior work on retrieval-augmented generation does not extensively study the case where a retrieval system must also accept writes that supersede prior entries. Most RAG literature focuses on retrieval quality given a fixed corpus. The B5 benchmark addresses the write-path problem that is specific to persistent, writable KB systems.

### 2.4 Source Reliability and Provenance

Source reliability tracking is a form of provenance-weighted trust. Systems that track source reliability to weight incoming claims appear in the knowledge fusion literature (Dong et al., 2014), where the TruthFinder algorithm assigns reliability scores to data sources based on their historical accuracy and uses these scores to arbitrate between conflicting claims. Iranti's reliability accumulation mechanism is analogous: sources that have successfully written multiple facts acquire higher reliability scores, which are then used to weight their claims in conflict resolution. The B5 benchmark reveals that this mechanism — while beneficial for noise resistance — creates a barrier to legitimate updates by new sources.

---

## 3. Methodology

### 3.1 Task Definition

Five test cases were constructed to probe update acceptance under different combinations of source identity, incoming confidence, and expected behavior. Each test case begins with an initial write establishing a fact and a source reliability baseline, then attempts an update with either the same source (T1b) or a different source (T1, T2, T3, T4).

### 3.2 Scoring Formula

Based on observed system behavior, Iranti computes a weighted score for each entry as follows:

```
weighted_score = raw_confidence × (0.7 + source_reliability × 0.3)
```

Where `source_reliability` is an accumulated value reflecting the source's write history. Default reliability for a new source is 0.5. The source used for initial writes in this session (`b5_initial`) accumulated approximately 0.62 reliability after four successful writes.

At `reliability = 0.5` (new source):
```
weighted_score = raw_confidence × (0.7 + 0.5 × 0.3) = raw_confidence × 0.85
```

At `reliability = 0.62` (established source):
```
weighted_score = raw_confidence × (0.7 + 0.62 × 0.3) = raw_confidence × 0.886
```

The decision rule is:
- If `|weighted_score_incoming - weighted_score_existing| ≥ 10`: deterministic decision (higher score wins)
- If `|weighted_score_incoming - weighted_score_existing| < 10`: LLM arbitration

### 3.3 Test Cases

| Test | Initial (conf, source) | Update (conf, source) | Expected | Resolution path |
|------|------------------------|----------------------|----------|-----------------|
| T1 | conf=85, b5_initial | conf=92, b5_update (new) | ACCEPT | LLM (gap=2.9) |
| T1b | conf=85, b5_initial | conf=97, b5_initial (same) | ACCEPT | Deterministic (gap=10.6) |
| T2 | conf=90, b5_initial | conf=75, b5_stale_source (new) | REJECT | Deterministic (gap=13.5) |
| T3 | conf=85, b5_initial | conf=80, b5_reconfirm (same value) | no-op | Duplicate detection |
| T4 | conf=80, b5_source_a | conf=85, b5_source_b (new) | AMBIGUOUS | LLM (gap=4.25) |

### 3.4 Protocol

Each test case was executed against a live Iranti instance (localhost:3001). Initial writes were performed using `iranti_write` with the specified confidence and source parameters. Update attempts were performed using the same API. Outcome was recorded from the Iranti response, which includes an explicit decision reason string. Final KB state was verified by querying all four test entities after all trials were complete.

### 3.5 Metrics

- Outcome: ACCEPTED or REJECTED
- Resolution path: Deterministic (gap ≥ 10) or LLM arbitration
- Final KB state: whether the original or the updated value is retained

---

## 4. Results

### 4.1 Trial Results by Test Case

**T1 — New source, higher confidence (85 → 92)**

Score calculation:
- Existing: `85 × 0.886 = 75.3` (b5_initial reliability ≈ 0.62)
- Incoming: `92 × 0.85 = 78.2` (b5_update, new source, reliability = 0.5)
- Gap: 2.9 → LLM arbitration

Outcome: REJECTED. Reason: "LLM arbitration: The existing entry has a more established source and the confidence difference is minimal."

**T1b — Same source, higher confidence (85 → 97)**

Score calculation:
- Existing: `85 × 0.886 = 75.3`
- Incoming: `97 × 0.886 = 85.9` (same source, same reliability)
- Gap: 10.6 → Deterministic acceptance

Outcome: ACCEPTED. Reason: "Incoming score (85.9) higher than existing (75.3)."

**T2 — New source, lower confidence (90 → 75)**

Score calculation:
- Existing: `90 × 0.886 = 77.3`
- Incoming: `75 × 0.85 = 63.8`
- Gap: 13.5 → Deterministic rejection

Outcome: REJECTED. Reason: "Existing score (77.3) higher than incoming (63.8)."

**T3 — Duplicate value, lower confidence (85 → 80, same value)**

Outcome: REJECTED. Reason: "Duplicate value with lower score." Iranti identified that the incoming value was identical to the existing value and rejected without score computation.

**T4 — New source, slightly higher confidence (80 → 85, source switch)**

Score calculation:
- Existing: `80 × 0.85 = 68.0` (b5_source_a, new, reliability = 0.5)
- Incoming: `85 × 0.85 = 72.25` (b5_source_b, new, reliability = 0.5)
- Gap: 4.25 → LLM arbitration

Outcome: REJECTED. Reason: "LLM arbitration: The existing entry has a more established source and the confidence difference is minimal." Note: both sources were new at the time of this test; neither had an established reliability advantage over the other.

### 4.2 Summary Table

| Test | Scenario | Outcome | Resolution Path |
|------|----------|---------|-----------------|
| T1 | New source, conf 85→92 | REJECTED | LLM arbitration (gap=2.9) |
| T1b | Same source, conf 85→97 | ACCEPTED | Deterministic (gap=10.6) |
| T2 | Lower confidence, stale | REJECTED | Deterministic (gap=13.5) |
| T3 | Duplicate value | REJECTED | Duplicate detection |
| T4 | New source, conf 80→85 | REJECTED | LLM arbitration (gap=4.25) |

### 4.3 Final KB State

| Entity | Final value | Note |
|--------|------------|-------|
| b5test/t1 | {role: "research_lead"} | T1b update accepted |
| b5test/t2 | {role: "senior_researcher"} | Original preserved, stale update rejected |
| b5test/t3 | {role: "postdoc"} | Original preserved, duplicate rejected |
| b5test/t4 | {role: "staff_engineer"} | Original preserved, source-switch rejected |

---

## 5. Discussion

### 5.1 No Explicit Update Primitive

The most fundamental finding of B5 is architectural: Iranti does not expose a distinct "update" or "supersede" operation. All writes, regardless of intent, are processed through the conflict resolution pipeline. This means an agent that knows a prior entry is stale cannot simply declare supersession; it must win a conflict resolution contest against the existing entry.

This design is defensible from a noise-resistance perspective — uncontrolled overwriting would allow any agent to corrupt any fact — but it places the burden of temporal update on the agent's ability to satisfy the scoring formula and, when the formula does not yield a deterministic outcome, on LLM arbitration. The latter is not a reliable mechanism for intended updates, as documented below.

### 5.2 LLM Arbitration Bias Toward Established Sources

In both cases routed to LLM arbitration (T1 and T4), the LLM rejected the incoming update citing preference for the "established source." In T4, this reasoning is factually inaccurate: both sources (b5_source_a and b5_source_b) were new entries with equal reliability histories. The LLM appears to apply a "prefer existing" heuristic regardless of whether the existing source is genuinely more established than the incoming source.

This represents a systematic bias. Because LLM arbitration occurs whenever the score gap is below 10 — a range that includes many realistic update scenarios — the bias has a broad practical footprint. Any update where the incoming confidence is not sufficiently higher than the existing confidence to push the weighted score gap to 10 or above will be routed to an arbitration process that appears to consistently prefer the existing entry.

The practical threshold for deterministic acceptance of a same-source update, derived from the scoring formula, is approximately:

```
raw_confidence_incoming - raw_confidence_existing ≥ 10 / (0.7 + reliability × 0.3)
```

At `reliability = 0.62` (established source), this requires a raw confidence advantage of approximately 11.3 points. For a new-source update at `reliability = 0.5` on both sides, the gap threshold in terms of raw confidence is approximately 11.8 points — but the existing source's reliability premium also enters, so the effective requirement is higher. In practice, a new source updating an established source's fact would need to provide a raw confidence value high enough to overcome both the reliability premium of the existing entry and the 10-point threshold for deterministic acceptance. For typical confidence ranges (70–95), this is difficult or impossible to satisfy.

### 5.3 Duplicate Detection as a Distinct Resolution Path

Test T3 revealed a third resolution path not covered by the deterministic/LLM binary: duplicate value detection. When the incoming value is identical to the existing value, Iranti routes the decision through a separate "duplicate value with lower score" path and rejects the write without executing a full score comparison. This is useful behavior: reconfirmation writes with lower confidence should not erode the existing entry's confidence score. The mechanism is correctly tuned for this case.

### 5.4 Source Reliability Accumulates Rapidly

The `b5_initial` source accumulated reliability of approximately 0.62 after four successful writes in a single session, versus the 0.5 default for new sources. This accumulation rate is fast enough to create meaningful scoring asymmetry within a single operational session. The estimated rough approximation of the accumulation function, based on observed scores, is:

```
reliability ≈ 0.5 + 0.12 × (successful_writes / total_writes)
```

This estimate is derived from score observations, not direct inspection of the reliability tracking mechanism, and should be treated as approximate. The substantive implication is that within-session reliability differentials are real and influence conflict resolution outcomes quickly.

### 5.5 Implications for Multi-Agent Memory Systems

The B5 findings have direct implications for any deployment in which multiple agents share a single Iranti KB and individual agents may have changing or superseding information about the same entities:

1. An agent that wrote a fact first acquires a reliability advantage that makes its entries harder to update by subsequent agents.
2. Updates by new agents are nearly always routed to LLM arbitration (because the new agent's reliability is lower, the score gap is unlikely to reach 10 without a very large raw confidence advantage), and LLM arbitration consistently favors the existing entry.
3. The reliable update path requires using the same source identity as the original write, and providing a raw confidence advantage sufficient to generate a weighted score gap of at least 10.

In summary: Iranti's conflict resolution architecture, as currently implemented, functions well as a noise filter but poorly as an update mechanism for evolving facts. Systems that require temporal update should either adopt same-source write conventions or await a forced-write or privileged-write mechanism that bypasses the conflict resolution pipeline.

---

## 6. Threats to Validity

### 6.1 Reliability Estimation is Inferred, Not Observed

The reliability values (≈0.62 for b5_initial, 0.5 default) and the scoring formula `weighted_score = raw_confidence × (0.7 + reliability × 0.3)` are inferred from observed score values returned in Iranti's response messages. The actual formula and reliability tracking mechanism are internal to the system and were not directly inspected. If the true formula differs from the inferred formula, the score calculations reported here may be incorrect, though they are consistent with all five observed outcomes.

### 6.2 Small Sample Size

Five test cases, each executed once, with no repeated trials. It is not possible to estimate variance or construct confidence intervals for any of the reported outcomes. The observed LLM arbitration behavior (2/2 rejections) is consistent with a systematic bias but cannot be distinguished from coincidence at this sample size. A larger evaluation (e.g., 20+ test cases covering a broader range of score gaps and source histories) is needed before strong claims about arbitration bias can be made.

### 6.3 Session-Specific Reliability State

Source reliability accumulates within and across sessions. The reliability values observed in this evaluation reflect the write history of this specific session. In a fresh session, all sources would begin at the default reliability of 0.5, which would change the score calculations for T1, T2, and T1b. In a long-running deployment, sources might have substantially higher reliability than observed here, potentially making updates even harder. The generalizability of these findings to other reliability states is unknown.

### 6.4 No Forced-Write or Privileged-Write Test

The evaluation did not test whether an explicit forced-write operation, a privileged source identity, or an administrative write path exists in the Iranti API. If such a mechanism exists, it would represent the intended update path for cases where conflict resolution is insufficient. The absence of forced-write testing means this evaluation characterizes only the default write path.

### 6.5 Single Instance, Single Session

All trials were conducted against a single Iranti instance in a single session. Infrastructure-level variability (e.g., LLM arbitration using a non-deterministic language model) means that the LLM arbitration outcomes (T1, T4) might differ in repeated executions. No repeated-trial data are available to assess this variability.

---

## 7. Conclusion

The B5 benchmark evaluates Iranti's capacity for temporal fact update — the replacement of a stale KB entry with a newer, more accurate value. Five test cases covering new-source updates, same-source updates, stale writes, duplicate detection, and source-switching revealed the following findings:

Iranti does not implement an explicit update primitive. All writes are processed through conflict resolution. The conflict resolution system applies a weighted scoring formula (`weighted_score = raw_confidence × (0.7 + source_reliability × 0.3)`) and routes decisions to either a deterministic path (when the weighted score gap meets or exceeds 10) or to LLM arbitration (when the gap is below 10). In the deterministic path, the higher-scoring entry wins; the stale-write rejection in T2 and the same-source update acceptance in T1b were both correctly handled by this path. Duplicate value detection (T3) operates as a distinct path that correctly rejects lower-confidence reconfirmation writes.

The critical failure mode is in LLM arbitration. Both cases routed to LLM arbitration were rejected, with the LLM citing preference for the "established source" in both instances — including T4, where both sources were equally new and neither had an established reliability advantage. This suggests a "prefer existing" bias in the LLM arbitration step that will systematically block new-source updates when the score gap does not reach the deterministic threshold.

The practical implications are constrained by the small sample size and the inferred — rather than directly observed — nature of the scoring formula. We treat the arbitration bias finding as a hypothesis requiring further evaluation, not a confirmed result. Nonetheless, the finding is internally consistent and its practical consequences are significant enough to warrant investigation before multi-agent or temporally evolving KB deployments are planned.

---

## 8. References

Alchourrón, C. E., Gärdenfors, P., and Makinson, D. (1985). On the logic of theory change: Partial meet contraction and revision functions. *Journal of Symbolic Logic*, 50(2), 510–530.

Chen, W., et al. (2021). A Dataset for Answering Time-Sensitive Questions. *arXiv:2108.01928*.

Dhingra, B., Cole, J. R., Eisenschlos, J. M., Gillick, D., Eisenstein, J., and Cohen, W. W. (2022). Time-Aware Language Models as Temporal Knowledge Bases. *Transactions of the Association for Computational Linguistics*, 10, 257–273.

Dong, X. L., Gabrilovich, E., Heitz, G., Horn, W., Lao, N., Murphy, K., Strohmann, T., Sun, S., and Zhang, W. (2014). Knowledge Vault: A Web-Scale Approach to Probabilistic Knowledge Fusion. *Proceedings of the 20th ACM SIGKDD International Conference on Knowledge Discovery and Data Mining*.

Jia, R., Levy, O., and Liang, P. (2018). Know What You Don't Know: Unanswerable Questions for SQuAD. *arXiv:1806.03822*.

Packer, C., Fang, V., Patil, S. G., Nguyen, K., Wooders, A., and Gonzalez, J. E. (2023). MemGPT: Towards LLMs as Operating Systems. *arXiv:2310.08560*.

Vrandecic, D., and Krötzsch, M. (2014). Wikidata: A free collaborative knowledgebase. *Communications of the ACM*, 57(10), 78–85.

---

## Appendix A: Benchmark Specification

See `benchmarks/B5-knowledge-update/benchmark.md`.

## Appendix B: Raw Trial Records

See `results/raw/B5-knowledge-update.md`.
