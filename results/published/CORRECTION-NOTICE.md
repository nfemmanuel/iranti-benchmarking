# Iranti Benchmarking Program — Correction Notice

**Date:** 2026-03-22
**Issued by:** research_program_manager
**Scope:** Corrections to findings published in this benchmark program (v1.0 through v6.0)

---

## Section 1: Purpose

Benchmark programs sometimes produce wrong conclusions — whether from measurement error, insufficient replication, artifact contamination, or misattribution of signals. Publishing corrections is part of the scientific record, not an embarrassment to it. A program that retracts a finding when the evidence does not support it is more trustworthy than one that does not. This notice documents the two findings in this program that were found to be incorrect after initial publication and have since been corrected in all affected documents. In both cases, the correction process followed the same evidence standards as the original claims: the characterization was narrowed, the reproduction was attempted, the upstream evidence was checked, and the conclusion was revised based on what the evidence showed.

---

## Section 2: Correction 1 — Forward Slash in Fact Values Causes Silent Retrieval Loss (RETRACTED)

### Original claim

First stated in the v3.0 program pass (2026-03-21), B11 new findings section:

> "Values containing `/` or `%` trigger `parse_error` during attend/observe scoring, causing silent fact exclusion. Facts stored with slash or percent characters in their values are silently dropped from iranti_observe and iranti_attend results."

The v4.0 pass narrowed this to `/` only after `%` was not reproduced. The narrowed claim carried forward as an open HIGH defect: "Forward slash in fact values causes silent retrieval drop."

### Where it appeared

- rpm-signoff-v3.md (2026-03-21): first claim, with both `/` and `%`
- rpm-signoff-v4.md (2026-03-21): narrowed to `/` only; defect retained as HIGH
- rpm-signoff-v5.md (2026-03-21): RETRACTED — defect table updated to RETRACTED status
- rpm-signoff-v6.md (2026-03-22): RETRACTED confirmed — 6-path fresh reproduction
- statistical-review.md: defect characterization table updated to RETRACTED

### Why it was wrong

The `parse_error/invalid_json` entries observed in `debug.dropped` during iranti_observe and iranti_attend calls are produced by the entity-extraction NLP pipeline. This pipeline attempts to classify arbitrary text fragments in context strings as entity references and drops candidates that fail classification. The signals appear in debug output whether or not the stored fact values contain slash characters. They reflect NLP classification noise in the entity-detection layer, not loss of stored facts. The retrieval path for facts stored against known entity+key pairs operates independently of this NLP pipeline. Slash characters in fact values are stored and returned verbatim.

The original error was misreading the debug output: `parse_error` entries in `debug.dropped` were interpreted as evidence that the retrieval pipeline was dropping facts with slash-bearing values, when in fact they were evidence that the entity-extraction pipeline was discarding text fragments it could not classify as entity references. These are different subsystems.

### How we found out

v5.0 minimal reproduction (2026-03-21): a fresh entity was written with slash characters placed in structurally significant positions across multiple key values (not incidentally, but as the test stimulus). All four retrieval paths were probed independently: iranti_query, iranti_search, iranti_observe, iranti_attend. All four returned the slash-bearing values correctly and completely. The `parse_error` signals appeared in debug output in the same form regardless of whether slash characters were present in the stored values. This made clear that the signals were not triggered by slash content in fact values.

v6.0 fresh reproduction (2026-03-22): a new entity (`project/v6_slash_repro`) was written with slash characters in URLs, file paths, ratios, and email+path strings. 6 calls across 4 retrieval paths — all PASS. No fact loss. `parse_error` present in debug output as expected NLP noise.

Upstream confirmation: commit d03781a1 in the Iranti source repository added `tests/memory-retrieval-regressions.ts`, which includes explicit regression coverage for slash-value retrieval across all four retrieval paths. All tests pass. The upstream team independently confirmed the same conclusion through a different test pathway.

### What the correct conclusion is

Slash characters (and other special characters including `%`) in stored fact values do not cause silent retrieval loss through any of the four tested retrieval paths. The `parse_error` signals in debug output are entity-extraction NLP classification noise and have no bearing on fact value retrieval. This is not a defect.

### Status of corrections to affected documents

The RETRACTED status was applied in rpm-signoff-v5.md (2026-03-21) and confirmed in rpm-signoff-v6.md (2026-03-22). The statistical-review.md defect table carries the RETRACTED classification. BENCHMARK-FINAL.md (2026-03-22) records this as a retracted finding in Section 4A. The original v3.0 and v4.0 sign-off documents retain the original claim as a historical record but are superseded by the v5.0 retraction and v6.0 confirmation. Do not cite the original claim as a current or valid defect.

---

## Section 3: Correction 2 — user/main Noise Entry Pollutes Retrieval Results (REVISED — RESOLVED)

### Original claim

First characterized in the v2.0 program pass (v0.2.14 evaluation), B11 evaluation:

> "A `user/main/favorite_city` entry (value: `{'city': 'NoiseTown'}`) written by Iranti's session memory infrastructure is occupying retrieval slots in attend and observe results, reducing B11 scores by returning an irrelevant entry in place of task-relevant facts."

This was classified as a MEDIUM defect attributing the entry to Iranti's session memory write behavior as a product-side artifact.

### Where it appeared

- rpm-signoff-v2.md (v0.2.14 pass): initial characterization
- rpm-signoff-v3.md, v4.md: defect carried forward as MEDIUM; slot-pollution behavior noted
- rpm-signoff-v5.md (2026-03-21): RESOLVED — source corrected; slot-pollution no longer observed
- rpm-signoff-v6.md (2026-03-22): RESOLVED confirmed
- statistical-review.md: defect table updated to RESOLVED

### What was right about the original characterization

The `user/main/favorite_city` entry did exist in the benchmark KB. During the v0.2.14 evaluation pass, it did surface in attend and observe retrieval results for unrelated queries and did occupy retrieval slots. The effect on B11 scores under v0.2.14 was real: the entry appeared where task-relevant facts should have, reducing the effective score in the affected conditions. The observation of the slot-pollution behavior was accurate.

### What was wrong about the original characterization

The source attribution was incorrect. The entry was attributed to Iranti's session memory infrastructure — implying that the product wrote an unexpected entry to `user/main` as part of its normal operation. This was wrong. The entry's source label in the KB is `memory_regression_noise`, indicating it was written by benchmark regression testing infrastructure, not by Iranti product behavior. Specifically, the entry originated from prior benchmark test runs that exercised test infrastructure similar to the upstream TypeScript smoke test, which at that time used `user/main` as a write target. This is a test-artifact contamination issue: the benchmark's own test infrastructure inadvertently polluted the KB that the benchmark was evaluating against.

This distinction matters for two reasons. First, it changes the defect attribution: the behavior that caused retrieval slot pollution was the test infrastructure's write to `user/main`, not a product behavior in Iranti. Second, it changes the reproducibility expectation: a replication run on a clean Iranti instance that does not exercise the same test infrastructure will not produce this entry, and therefore will not observe the slot-pollution behavior. Prior B11 scores from the v0.2.14 pass that reflected this artifact should be read with this in mind.

### How we found out

v5.0 revalidation (2026-03-21): the entry was re-examined in context. It no longer surfaced in attend/observe results in natural, production-representative contexts. The source label `memory_regression_noise` was identified, indicating it was written by test infrastructure. Upstream confirmation: commit d03781a1 changed the TypeScript smoke test to write to `person/${uniqueId('ts_client_person')}` instead of `user/main`, with the commit message noting this as a fix to avoid writing to a shared entity path. This confirmed that the upstream team independently identified the same issue: the smoke test's use of `user/main` as a write target was a test artifact, and the fix was to use a unique isolated entity path instead.

### What the correct conclusion is

The `user/main/favorite_city` entry in the local benchmark KB is a test artifact, not a product defect. It persists in the KB as a historical artifact from this program's regression testing. As of v5.0 and v6.0, it does not pollute retrieval results in natural contexts — it appears only under explicit forced injection targeting `user/main`, which is correct product behavior, not contamination. The slot-pollution behavior observed in v0.2.14 was caused by test-infrastructure contamination of the benchmark KB, not by a product defect. The classification is RESOLVED. The test-artifact write pathway has been closed upstream.

### Status of corrections to affected documents

The RESOLVED status and corrected source attribution were applied in rpm-signoff-v5.md (2026-03-21) and confirmed in rpm-signoff-v6.md (2026-03-22). The statistical-review.md defect table carries the RESOLVED classification. BENCHMARK-FINAL.md (2026-03-22) records this as a resolved finding in Section 4B, with the source correction noted. The original characterization in earlier sign-off documents (v2.0–v4.0) is superseded. Any citation of this finding should use the RESOLVED characterization and note the corrected source attribution.

---

## Section 4: Findings Not Subject to Correction

The following findings are confirmed, unchanged, and not subject to the corrections in this notice.

**Transaction timeout on LLM-arbitrated writes (OPEN — HIGH):** This defect is confirmed across two independent benchmark tracks (B3/C3 and B5/T1, T4) under a real LLM provider. Its trigger conditions (cross-source conflict, weighted score gap < 10), failure mode (silent write drop with data-safe rollback), and estimated scope (10–30% of cross-source writes, high uncertainty) are unchanged. The v6.0 revalidation pass did not re-exercise this path; the v5.0 characterization stands.

**Observe confidence ranking misses progress/transient facts (OPEN — MEDIUM):** This limitation is confirmed by the B12 result (observe+hint 5/8 vs. explicit query 8/8). It is a design characteristic of the confidence-ranked passive observe pathway, not a defect with an upstream fix pending. The workaround (explicit iranti_query for known progress-fact keys) is confirmed effective. Unchanged.

**All capability findings (B1–B13 positive results):** All confirmed capability findings documented in BENCHMARK-FINAL.md Section 2 are unchanged by these corrections. Neither retraction affected a capability claim: the slash retraction concerns a defect claim, not a capability claim; the user/main resolution is a source correction that does not alter capability assessment. The B1 N=5000 positive differential, the B2 persistence finding, the B6 ingest finding, the B8/B10 attribution findings, the B9 relationship graph finding, the B11 context recovery finding, the B12 session recovery finding, and the B13 upgrade safety finding are all unchanged.

---

## Section 5: Correction Timeline

| Date | Event |
|------|-------|
| 2026-03-21 v3.0 | Slash defect first claimed in B11 new findings: `/` and `%` in fact values cause silent retrieval drop via `parse_error` |
| 2026-03-21 v4.0 | Slash defect trigger narrowed: `%` not confirmed; `/` retained as open HIGH defect |
| 2026-03-21 v5.0 | Minimal repro: NOT REPRODUCED across all 4 retrieval paths. RETRACTED. `parse_error` identified as NLP pipeline noise unrelated to fact-value content. |
| 2026-03-21 v5.0 | user/main: slot-pollution no longer observed; source corrected to `memory_regression_noise` (test artifact, not product behavior). RESOLVED. |
| 2026-03-22 v6.0 | Fresh 6-path reproduction against new slash-bearing entity: all PASS. RETRACTED status confirmed for third time. |
| 2026-03-22 v6.0 | Upstream regression tests (commit d03781a1, `tests/memory-retrieval-regressions.ts`) confirm slash-value retrieval passes across all 4 paths. RETRACTED independently corroborated by upstream. |
| 2026-03-22 v6.0 | Upstream smoke test fix (commit d03781a1) confirms `user/main` write was test infrastructure artifact; pathway closed in source by switching to isolated `person/` entity. RESOLVED independently corroborated by upstream. |

---

## Footer

This correction notice is the authoritative record of the two findings in this program that required revision. All affected documents have been updated to reflect the corrected status. The correction trail is preserved in the document history across the sign-off sequence (v3.0 through v6.0) and in the statistical-review.md defect characterization table. Do not cite the original (pre-correction) claims — the slash-value defect and the Iranti-attributed user/main write — as current or valid conclusions. The correct citations are: slash-value RETRACTED (v5.0, confirmed v6.0); user/main RESOLVED (v5.0, confirmed v6.0), source was test infrastructure not product behavior.
