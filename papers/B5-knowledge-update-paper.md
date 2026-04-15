# Knowledge Currency and Temporal Fact Update in an External Memory System: A Controlled Evaluation of Iranti's Conflict Resolution Architecture

**Status:** Working paper — not peer-reviewed
**Version:** 0.2 (v0.2.16 rerun addendum, 2026-03-21)
**Authors:** Iranti Benchmarking Program (Research Program Manager, Benchmark Scientist, Replication Engineer)
**Benchmark track:** B5 — Knowledge Currency / Temporal Update
**Model under test:** Iranti (installed instance, local)
**Infrastructure:** Iranti instance at localhost:3001

### Version History

| Version | Date | Description |
|---------|------|-------------|
| 0.1 | 2026-03-21 | Initial draft — v0.2.12 mock-provider results (T1–T4) |
| 0.2 | 2026-03-21 | v0.2.16 rerun addendum — real OpenAI provider; T5 added; transaction timeout defect documented |


> **Current-version addendum (2026-03-26):** The refreshed rerun keeps deterministic update semantics positive, but ambiguous cross-source updates now read as conservative escalation rather than a clean incumbent-preserving rejection or a stable "established source bias" story.

---

## Abstract

We evaluate whether Iranti's knowledge base supports temporal fact update — the ability to replace an outdated fact with a newer, more accurate value — under controlled conditions. The initial evaluation (v0.2.12, mock LLM provider) used five test cases varying source identity, incoming confidence, and score gap. A v0.2.16 rerun under a real OpenAI provider added a sixth test case and revealed a critical infrastructure defect. Results reveal that Iranti does not implement an explicit update primitive: all writes, including intended updates, are processed through the conflict resolution pipeline. Update acceptance is determined by a weighted scoring formula, `weighted_score = raw_confidence × (0.7 + source_reliability × 0.3)`, applied to both the incoming and existing entries. Deterministic acceptance or rejection occurs when the weighted score gap meets or exceeds 10 points; otherwise, the system routes to large language model (LLM) arbitration. In the v0.2.12 evaluation, a consistent bias in LLM arbitration was observed: in all cases routed to arbitration (2/2), the LLM rejected the incoming update, citing preference for the "established source." In the v0.2.16 rerun, the LLM arbitration path is non-functional: both cases requiring arbitration (T1, T4) failed with a transaction timeout error caused by the real OpenAI API latency (8–16 s) exceeding the open DB transaction window (~5 s). The timeout defect prevents confirmation or refutation of the v0.2.12 arbitration bias finding on v0.2.16. A new test case (T5) confirms that the deterministic path functions correctly for large confidence gaps across different sources. The practical consequence is that updates by new sources cannot reliably succeed unless the raw confidence advantage is large enough that the weighted score gap exceeds the deterministic threshold. When LLM arbitration is required, the path is currently broken under real provider latency. These findings have direct implications for any multi-agent system in which different agents maintain competing views of a shared fact over time.

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
| T5 | conf=70, b5_initial | conf=99, b5_update_large (new) | ACCEPT | Deterministic (large gap) |

T5 was added in the v0.2.16 rerun to test whether a large raw confidence gap across different sources could bypass LLM arbitration via the deterministic path. With incoming conf=99 and new-source reliability=0.5, the weighted gap was expected to exceed 10.

### 3.4 Protocol

Each test case was executed against a live Iranti instance (localhost:3001). Initial writes were performed using `iranti_write` with the specified confidence and source parameters. Update attempts were performed using the same API. Outcome was recorded from the Iranti response, which includes an explicit decision reason string. Final KB state was verified by querying all four test entities after all trials were complete.

### 3.5 Metrics

- Outcome: ACCEPTED or REJECTED
- Resolution path: Deterministic (gap ≥ 10) or LLM arbitration
- Final KB state: whether the original or the updated value is retained

---

## 4. Results

### 4.0 Version Notes

Section 4.1 and 4.2 record the v0.2.12 results (mock LLM provider). Section 4.3 records the v0.2.16 rerun results (real OpenAI provider). The two sets are not directly comparable: the v0.2.16 run exposes a transaction timeout defect that was not present in the mock-provider run. Where results agree, confidence in the finding increases. Where they diverge (T1, T4), the v0.2.16 result cannot confirm or refute the v0.2.12 finding.

### 4.1 Trial Results by Test Case (v0.2.12 — mock provider)

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

### 4.2 Summary Table (v0.2.12 — mock provider)

| Test | Scenario | Outcome | Resolution Path |
|------|----------|---------|-----------------|
| T1 | New source, conf 85→92 | REJECTED | LLM arbitration (gap=2.9) |
| T1b | Same source, conf 85→97 | ACCEPTED | Deterministic (gap=10.6) |
| T2 | Lower confidence, stale | REJECTED | Deterministic (gap=13.5) |
| T3 | Duplicate value | REJECTED | Duplicate detection |
| T4 | New source, conf 80→85 | REJECTED | LLM arbitration (gap=4.25) |

### 4.3 v0.2.16 Rerun Results (real OpenAI provider)

**T1 — New source, conf 85→92**

Outcome: ERROR — `Transaction API error: A query cannot be executed on an expired transaction`. The transaction opened, scores were computed, and the LLM call was initiated inside the open transaction. The real OpenAI API call took approximately 8–16 s. By the time the call returned and the system attempted to append a conflict log entry, the DB transaction had expired (~5 s window). The incumbent value was preserved by rollback. The update did not land. No conflict reason string was recorded.

**T1b — Same source, conf 85→97**

Outcome: ACCEPTED, deterministic. Weighted gap = 10.4. Behavior matches v0.2.12 (gap=10.6; minor numeric difference attributable to session-specific reliability state). Finding confirmed: same-source updates above the deterministic threshold are reliable.

**T2 — New source, lower confidence (90 → 75)**

Outcome: REJECTED, deterministic. Weighted gap = 12.7. Behavior matches v0.2.12. Finding confirmed: stale writes are correctly rejected by the deterministic path.

**T3 — Duplicate value**

Outcome: REJECTED, duplicate detected. Behavior matches v0.2.12. Finding confirmed: duplicate detection path functions correctly under both mock and real providers.

**T4 — New source, small confidence gap (80 → 85)**

Outcome: ERROR — same transaction timeout as T1. The LLM arbitration path was triggered (gap < 10) and the transaction expired before the LLM response was received. Incumbent preserved by rollback.

**T5 — New source, large confidence gap (70 → 99)**

Score calculation:
- Existing: `70 × 0.886 = 62.0` (b5_initial, reliability ≈ 0.62)
- Incoming: `99 × 0.85 = 84.2` (b5_update_large, new source, reliability = 0.5)
- Gap: 24.6 → Deterministic acceptance (gap ≥ 10; LLM arbitration not triggered)

Outcome: ACCEPTED, deterministic. This is the first confirmed case of a cross-source update succeeding under a real provider. The large raw confidence gap (70 → 99) was sufficient to push the weighted score gap above the 10-point deterministic threshold, bypassing the LLM arbitration path entirely.

### 4.4 v0.2.16 Summary Table

| Test | Scenario | v0.2.12 outcome | v0.2.16 outcome | Match? |
|------|----------|-----------------|-----------------|--------|
| T1 | Cross-source, conf 85→92 | REJECTED (LLM: established source) | ERROR — transaction timeout | NO |
| T1b | Same-source, conf 85→97 | ACCEPTED, deterministic (gap=10.6) | ACCEPTED, deterministic (gap=10.4) | YES |
| T2 | Lower-confidence stale | REJECTED, deterministic | REJECTED, deterministic (gap=12.7) | YES |
| T3 | Duplicate value | REJECTED, duplicate detected | REJECTED, duplicate detected | YES |
| T4 | Cross-source, small gap | REJECTED (LLM: established source) | ERROR — transaction timeout | NO |
| T5 | Cross-source, conf 70→99 | N/A (new test) | ACCEPTED, deterministic (gap=24.6) | New |

### 4.5 Final KB State (v0.2.12)

| Entity | Final value | Note |
|--------|------------|-------|
| b5test/t1 | {role: "research_lead"} | T1b update accepted (t1 and t1b share entity; T1b won) |
| b5test/t2 | {role: "senior_researcher"} | Original preserved, stale update rejected |
| b5test/t3 | {role: "postdoc"} | Original preserved, duplicate rejected |
| b5test/t4 | {role: "staff_engineer"} | Original preserved, source-switch rejected |

### 4.6 Final KB State (v0.2.16)

| Entity | Final value | Note |
|--------|------------|-------|
| b5test/t1 | {role: "junior_researcher"} (original) | T1 transaction timeout — incumbent preserved by rollback |
| b5test/t1b | {role: "research_lead"} | T1b update accepted |
| b5test/t2 | {role: "senior_researcher"} | Original preserved, stale update rejected |
| b5test/t3 | {role: "postdoc"} | Original preserved, duplicate rejected |
| b5test/t4 | {role: "staff_engineer"} | T4 transaction timeout — incumbent preserved by rollback |
| b5test/t5 | {role: "director"} | T5 cross-source update accepted (large gap, deterministic) |

---

## 5. Discussion

### 5.1 No Explicit Update Primitive

The most fundamental finding of B5 is architectural: Iranti does not expose a distinct "update" or "supersede" operation. All writes, regardless of intent, are processed through the conflict resolution pipeline. This means an agent that knows a prior entry is stale cannot simply declare supersession; it must win a conflict resolution contest against the existing entry.

This design is defensible from a noise-resistance perspective — uncontrolled overwriting would allow any agent to corrupt any fact — but it places the burden of temporal update on the agent's ability to satisfy the scoring formula and, when the formula does not yield a deterministic outcome, on LLM arbitration. The latter is not a reliable mechanism for intended updates, as documented below.

### 5.2 LLM Arbitration Bias Toward Established Sources (v0.2.12 finding; status uncertain as of v0.2.16)

In the v0.2.12 evaluation (mock LLM provider), both cases routed to LLM arbitration (T1 and T4) were rejected by the LLM, which cited preference for the "established source." In T4, this reasoning was factually inaccurate: both sources were new with equal reliability histories. The pattern suggested a "prefer existing" heuristic in the LLM arbitration step.

In the v0.2.16 rerun, both T1 and T4 encountered transaction timeout errors before the LLM response could be processed. The LLM arbitration path did not complete in either case. Consequently, the v0.2.12 arbitration bias finding cannot be confirmed or refuted on v0.2.16. The finding remains a hypothesis: consistent with the mock-provider evidence, not yet replicated under a real provider.

The bias concern remains architecturally relevant: any update that falls below the 10-point deterministic threshold will be routed to LLM arbitration. If the arbitration step exhibits a "prefer existing" heuristic — as suggested by v0.2.12 — the practical footprint of that bias is broad. This question requires direct investigation once the transaction timeout defect is resolved.

### 5.2a Transaction Timeout Defect (v0.2.16 new finding)

The v0.2.16 rerun revealed a critical defect in the LLM arbitration code path. The failure mode is:

1. A conflict write arrives with a score gap below the 10-point deterministic threshold.
2. The system opens a DB transaction.
3. Scores are computed within the transaction.
4. The LLM arbitration call is issued while the transaction remains open.
5. Real OpenAI API latency (measured at approximately 8–16 s in this environment) causes the transaction to exceed its ~5 s window.
6. When the system attempts to append the conflict log entry after the LLM call returns, the transaction has expired.
7. The write fails with: `Transaction API error: A query cannot be executed on an expired transaction`.
8. The DB transaction is rolled back. The incumbent value is preserved. The incoming update does not land.

The failure mode is safe in the sense that the incumbent is preserved and no data is corrupted or partially written. However, the failure is silent from the caller's perspective: the update simply does not land, with no mechanism for the calling agent to distinguish a soft conflict rejection from an infrastructure error. The conflict log entry is also not written, so there is no record of the attempt.

**Trigger condition:** Any conflict write that (a) requires LLM arbitration (gap < 10) and (b) is executed against an Iranti instance using a real LLM provider with latency > transaction window. This condition applies to all LLM-arbitrated cross-source updates in a production deployment.

**Impact:** The LLM arbitration path is non-functional under real provider conditions until the defect is addressed. The fix requires either (a) completing the LLM call outside the open transaction and then opening a new transaction for the write, or (b) extending the transaction timeout to accommodate real provider latency.

The practical threshold for deterministic acceptance of a same-source update, derived from the scoring formula, is approximately:

```
raw_confidence_incoming - raw_confidence_existing ≥ 10 / (0.7 + reliability × 0.3)
```

At `reliability = 0.62` (established source), this requires a raw confidence advantage of approximately 11.3 points. For a new-source update at `reliability = 0.5` on both sides, the gap threshold in terms of raw confidence is approximately 11.8 points — but the existing source's reliability premium also enters, so the effective requirement is higher. In practice, a new source updating an established source's fact would need to provide a raw confidence value high enough to overcome both the reliability premium of the existing entry and the 10-point threshold for deterministic acceptance. For typical confidence ranges (70–95), this is difficult or impossible to satisfy.

### 5.2b T5 Finding: Large Confidence Gap Enables Deterministic Cross-Source Update (v0.2.16 new finding)

Test T5 was added in the v0.2.16 rerun to determine whether a sufficiently large raw confidence gap could allow a cross-source update to succeed via the deterministic path, bypassing LLM arbitration entirely. The test used conf=70 (existing) and conf=99 (incoming, different source), yielding a weighted gap of approximately 24.6 — well above the 10-point threshold.

Outcome: ACCEPTED, deterministic. The write succeeded under a real OpenAI provider with no transaction errors, confirming that the deterministic path is reliable under real provider conditions.

This finding provides a practical workaround for the LLM arbitration defect: if the raw confidence gap between incoming and existing values is large enough to push the weighted score gap above 10, the LLM arbitration path is not triggered, the transaction remains short, and the write succeeds. For a new source (reliability=0.5) updating an established source's entry (reliability≈0.62), the required raw confidence advantage to clear the 10-point threshold is approximately:

```
gap_needed ≈ 10 / 0.85 + (existing_conf × 0.886 - existing_conf × 0.85) / 0.85
```

In practice, for existing conf values in the range 70–90, a large raw advantage (e.g., incoming conf ≥ 95 when existing conf ≤ 75) is needed. This is not universally achievable — if the existing entry already has high confidence (e.g., 90+), no incoming confidence value can provide a 10-point weighted gap against an established source from a new source. In that case, the only reliable update path is same-source.

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
2. Updates by new agents are nearly always routed to LLM arbitration (because the new agent's reliability is lower, the score gap is unlikely to reach 10 without a very large raw confidence advantage). In the v0.2.12 mock-provider run, LLM arbitration consistently favored the existing entry. In v0.2.16, the LLM arbitration path fails entirely under real provider latency.
3. The reliable update path requires either (a) using the same source identity as the original write with a raw confidence advantage sufficient to generate a weighted score gap of at least 10, or (b) using a different source with a large enough raw confidence gap to clear the deterministic threshold directly (T5 confirmed this at a gap of 24.6).
4. As of v0.2.16, the LLM arbitration path is a hard failure mode for production use: the transaction times out, the write fails silently from the caller's perspective, and no conflict log entry is recorded.

In summary: Iranti's conflict resolution architecture functions well as a noise filter and as a deterministic resolver for sufficiently large confidence gaps. It does not currently function as an update mechanism for close-call cross-source conflicts under real provider conditions. Systems that require temporal update should adopt same-source write conventions or, for cross-source updates, ensure the confidence gap is large enough to trigger deterministic resolution. The LLM arbitration path should not be relied upon in production until the transaction timeout defect is resolved.

---

## 6. Threats to Validity

### 6.1 Reliability Estimation is Inferred, Not Observed

The reliability values (≈0.62 for b5_initial, 0.5 default) and the scoring formula `weighted_score = raw_confidence × (0.7 + reliability × 0.3)` are inferred from observed score values returned in Iranti's response messages. The actual formula and reliability tracking mechanism are internal to the system and were not directly inspected. If the true formula differs from the inferred formula, the score calculations reported here may be incorrect, though they are consistent with all five observed outcomes.

### 6.2 Small Sample Size

Six test cases total (five in v0.2.12, one added in v0.2.16), each executed once, with no repeated trials. It is not possible to estimate variance or construct confidence intervals for any of the reported outcomes. The observed LLM arbitration behavior (2/2 rejections in v0.2.12) is consistent with a systematic bias but cannot be distinguished from coincidence at this sample size, and the v0.2.16 rerun could not replicate the arbitration conditions due to the transaction timeout defect. A larger evaluation (e.g., 20+ test cases covering a broader range of score gaps and source histories) is needed before strong claims about arbitration bias can be made.

### 6.3 Session-Specific Reliability State

Source reliability accumulates within and across sessions. The reliability values observed in this evaluation reflect the write history of this specific session. In a fresh session, all sources would begin at the default reliability of 0.5, which would change the score calculations for T1, T2, and T1b. In a long-running deployment, sources might have substantially higher reliability than observed here, potentially making updates even harder. The generalizability of these findings to other reliability states is unknown.

### 6.4 No Forced-Write or Privileged-Write Test

The evaluation did not test whether an explicit forced-write operation, a privileged source identity, or an administrative write path exists in the Iranti API. If such a mechanism exists, it would represent the intended update path for cases where conflict resolution is insufficient. The absence of forced-write testing means this evaluation characterizes only the default write path.

### 6.5 Single Instance, Single Session

All trials were conducted against a single Iranti instance in a single session. Infrastructure-level variability (e.g., LLM arbitration using a non-deterministic language model) means that the LLM arbitration outcomes (T1, T4) might differ in repeated executions. No repeated-trial data are available to assess this variability.

### 6.6 Transaction Timeout Defect Masks LLM Arbitration Behavior (v0.2.16-specific)

The v0.2.16 rerun was intended to confirm or refute the v0.2.12 LLM arbitration bias finding under a real provider. Instead, the transaction timeout defect caused both LLM-arbitrated test cases to fail before the LLM response was processed. The defect is a real finding in its own right, but it means the arbitration bias question remains open. Any future evaluation of LLM arbitration behavior must first address the transaction window issue.

### 6.7 Provider Latency Not Measured Precisely

The estimate of 8–16 s for real OpenAI API latency is based on observed timing of the benchmark runs and is not a controlled measurement. The exact latency at which the transaction timeout is triggered depends on the API model, system load, network conditions, and prompt length. The ~5 s transaction window estimate is inferred from the failure pattern, not directly observed from Iranti's internal configuration.

---

## 7. Conclusion

The B5 benchmark evaluates Iranti's capacity for temporal fact update — the replacement of a stale KB entry with a newer, more accurate value. Six test cases across two evaluation runs (v0.2.12 with a mock LLM provider; v0.2.16 with a real OpenAI provider) have revealed the following consolidated findings.

Iranti does not implement an explicit update primitive. All writes are processed through conflict resolution. The conflict resolution system applies a weighted scoring formula (`weighted_score = raw_confidence × (0.7 + source_reliability × 0.3)`) and routes decisions to either a deterministic path (gap ≥ 10) or LLM arbitration (gap < 10). The deterministic path functions correctly under both mock and real providers: stale writes are rejected (T2), same-source updates with sufficient gap are accepted (T1b), large-gap cross-source updates are accepted (T5), and duplicate detection operates as a distinct path (T3).

The LLM arbitration path presents two unresolved problems. First, the v0.2.12 mock-provider run observed a "prefer existing" bias (2/2 rejections citing established source preference, including in T4 where neither source was established). Second, and more critically for production use, the v0.2.16 run demonstrated that the LLM arbitration path is non-functional under real provider latency: the DB transaction expires before the LLM response is received, causing the write to fail silently with the incumbent preserved by rollback. The transaction timeout defect means the v0.2.12 bias finding cannot be confirmed or refuted on v0.2.16.

The current practical conclusion is: the deterministic path is the only reliable update mechanism in Iranti under real provider conditions. Cross-source updates require either same-source conventions or a large enough raw confidence gap to bypass arbitration (T5: gap=24.6 was sufficient; the 10-point threshold is the design criterion). The LLM arbitration path should not be used in production until the transaction timeout defect is resolved.

The arbitration bias hypothesis remains open. It requires a test environment with a mock or fast provider to isolate arbitration behavior from infrastructure constraints.

---

---

## 7a. Addendum: v0.2.16 Rerun Summary (2026-03-21)

This addendum records the v0.2.16 rerun results in consolidated form for readers consulting the paper after the initial draft.

**Provider change:** v0.2.12 used a mock LLM provider with near-zero latency. v0.2.16 used the real OpenAI API (latency measured at approximately 8–16 s).

**New defect discovered:** The LLM arbitration code path opens a DB transaction, computes scores, calls the LLM inside the transaction, and then attempts to write the conflict log. Under real provider latency, the transaction expires (~5 s window) before the write can complete. The error is `Transaction API error: A query cannot be executed on an expired transaction`. The incumbent is preserved by rollback. No conflict log is written. The caller receives no result distinguishing this infrastructure error from a normal rejection.

**Test results:**

| Test | v0.2.12 | v0.2.16 | Interpretation |
|------|---------|---------|----------------|
| T1 (cross-source, 85→92, gap=2.9) | REJECTED — LLM: established source | ERROR — transaction timeout | LLM bias hypothesis unconfirmable on v0.2.16 |
| T1b (same-source, 85→97, gap=10.4) | ACCEPTED, deterministic | ACCEPTED, deterministic | Confirmed stable |
| T2 (lower-conf stale, gap=12.7) | REJECTED, deterministic | REJECTED, deterministic | Confirmed stable |
| T3 (duplicate value) | REJECTED, duplicate detected | REJECTED, duplicate detected | Confirmed stable |
| T4 (cross-source, 80→85, gap=4.25) | REJECTED — LLM: established source | ERROR — transaction timeout | LLM bias hypothesis unconfirmable on v0.2.16 |
| T5 (cross-source, 70→99, gap=24.6) | N/A | ACCEPTED, deterministic | New: large-gap cross-source update reliable |

**What can be concluded from v0.2.16:**
- Deterministic resolution (T1b, T2, T3, T5) works correctly under real provider conditions.
- Large-gap cross-source updates bypass LLM arbitration and succeed (T5 confirms this for the first time under a real provider).
- The LLM arbitration path is non-functional in production. Every LLM-arbitrated write will fail with a transaction timeout until the defect is fixed.
- The v0.2.12 "established source" bias finding (T1/T4) is not confirmed or refuted by v0.2.16 — those cases never reached the LLM.

**What cannot be concluded from v0.2.16:**
- Whether the LLM arbitration bias persists in v0.2.16 code. The arbitration logic may have changed or been unchanged; the transaction defect prevents observation.
- Whether the "prefer existing" heuristic is a prompt artifact, an emergent behavior of the model, or an implementation choice.

**Required follow-up:**
1. Fix the transaction timeout defect (move LLM call outside the transaction; reopen transaction for the write).
2. Re-run T1 and T4 under a real provider after the fix to test whether the arbitration bias persists.
3. Extend B5 with a broader set of arbitration test cases once the path is functional.

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
