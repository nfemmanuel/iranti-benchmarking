# What Happens When You Ask Iranti to Read a Document and Extract the Facts?

**Series:** Iranti Benchmark Journal
**Track:** B6 — Text Ingestion Pipeline
**Date:** March 2026
**Audience:** Technical generalists — developers, AI researchers, curious readers

---

> **Update (v0.2.14, 2026-03-21):** The contamination finding from this article has been complicated by a new discovery. The Iranti test instance uses a mock LLM provider, which may have caused the earlier contamination pattern. In v0.2.14, contamination was not reproduced, but a new coverage failure appeared. We cannot yet evaluate iranti_ingest fairly until a real LLM provider is configured. See the formal paper for full details.

---

## The Question We're Actually Asking

Writing facts to Iranti one at a time is precise but slow. The alternative is to hand it a chunk of text and let it figure out the facts itself. This is what the `iranti_ingest` command does — it takes a passage of text, runs it through an internal extraction process (called the Librarian), and writes the extracted facts to the knowledge base.

This is a compelling capability. But it only helps if the extracted facts are actually correct.

This benchmark tests that.

---

## What We Actually Tested

We submitted a single text passage to `iranti_ingest` describing a fictional researcher — Dr. Diana Voronova — and checked whether the extracted facts matched the source text.

The passage was clear and unambiguous. It stated her institution (Carnegie Mellon University), her paper count (38), her previous employer (Google Brain, 2016–2018), and her primary research focus (out-of-distribution generalization). We asked for these four canonical facts.

The Librarian processed the text, extracted four facts, and wrote all four to the KB without errors or rejections.

Then we queried what was actually stored.

---

## What We Found

One of the four extracted facts was correct. Three were wrong.

| Fact | Ground truth | What Iranti stored | Correct? |
|------|-------------|-------------------|---------|
| Institution | Carnegie Mellon University | Carnegie Mellon University | Yes |
| Publication count | 38 | 31 | No |
| Previous employer | Google Brain (2016–2018) | Google DeepMind (2019–2022) | No |
| Research focus | out-of-distribution generalization | reinforcement learning | No |

The institution was right. Everything else was wrong.

This is a 25% accuracy rate on a short, clear, unambiguous passage. And the system reported high confidence in all four extractions (87–92), including the three that were incorrect.

---

## What the Errors Look Like

The error pattern is striking.

**Publication count:** The text says 38. Iranti stored 31. Where does 31 come from? A researcher named Lena Gross, whose publication count was written to the KB earlier in the same session.

**Previous employer:** The text says Google Brain, 2016–2018. Iranti stored Google DeepMind, 2019–2022. The institution name is close — Google Brain became Google DeepMind in 2023, so the Librarian may have "normalized" the name. But the dates are completely wrong. A researcher named Aisha Okonkwo, written earlier in the session, has previous employer Google DeepMind with dates 2020–2023. The Librarian appears to have pulled the dates from her entry rather than from the source text.

**Research focus:** The text clearly says "primary research focus is out-of-distribution generalization." Iranti stored "reinforcement learning" as the primary focus. The oldest entries in this knowledge base — written in a prior session, a day earlier — have exactly this research focus.

Every wrong value matches something already in the KB. The probability of that happening by chance across three independent errors is very low.

The hypothesis from the raw results: the Librarian has access to existing KB content when it performs extractions and is mixing that content with the source text. Instead of purely reading the passage, it appears to be "grounding" extractions against what it already knows — and sometimes substituting KB data for what the text actually says.

This is contamination. The ingest pipeline doesn't appear to be reading only the document you give it.

---

## Why This Is a Significant Problem

The failure mode here is worse than random extraction errors. Random errors would be distributed — some facts right, some wrong, no clear pattern. What we see instead is systematic substitution of existing KB data. The extracted facts look plausible. They're structured correctly. The confidence values are high. Nothing in the output signals that anything went wrong.

If you used `iranti_ingest` in production and trusted the output, you would end up with a KB that looks internally consistent but contains facts from entirely different entities. The system wouldn't warn you. The written facts would be treated as authoritative unless something specifically challenged them.

The practical consequence: you cannot currently rely on `iranti_ingest` to correctly extract facts from a text passage if the KB already contains related entities. The contamination risk is real and the confidence scores don't reflect it.

---

## What We Do Know Works

The rest of the benchmark program — B1, B2, B3, B4 — used structured writes via `iranti_write`, not `iranti_ingest`. Those results (100% retrieval accuracy in B1/B2, reliable structured storage throughout) reflect the performance of direct writes, not the ingest pipeline.

`iranti_ingest` is a different code path. The structured-write results don't tell you anything about ingest quality. B6 does.

---

## What We Can't Conclude Yet

This benchmark ran one test case: one entity, one passage, one session. That's not enough to characterize the pipeline's behavior generally.

We don't know:
- Whether the contamination is consistent across different entity types or KB sizes
- Whether it happens when the KB contains fewer (or no) related entries — the problem might be partly proximity-based
- Whether specific extraction configurations reduce the contamination rate
- Whether the "Google Brain → Google DeepMind normalization" is a separate effect from the contamination, or the same one

The B6 raw results make a strong case for contamination based on the matching pattern, but a single test case is not a proof. It is a finding that warrants serious investigation.

---

## What We Can Claim

**Confirmed:**
- `iranti_ingest` successfully processed the passage and returned four extracted facts with no ingestion errors
- 1/4 extracted facts correctly matched the source text
- All three wrong values match existing KB entries from the same session
- The Librarian returned high confidence (87–92) for all four extractions, including the wrong ones

**Real concern identified:**
- KB contamination during ingest extraction is the most plausible explanation for the error pattern
- Confidence values do not reflect extraction accuracy — they appear to be inflated for wrong extractions
- There is no output signal indicating that extracted values may have been contaminated

**Not confirmed:**
- Whether this failure mode is universal or condition-dependent
- The root cause of the contamination (RAG during extraction, context window leakage, or something else)
- Whether any configuration options mitigate the issue

---

## What This Means for the Benchmark Program

`iranti_ingest` is excluded from benchmark trials until this is understood. All writes in the benchmark program will continue to use `iranti_write` for structured facts. The ingest pipeline needs a dedicated investigation before it can be treated as a reliable data entry path.

This is an honest finding. The B6 result is not a minor caveat — it is a significant quality concern about a core pipeline feature. Users of Iranti who rely on text ingestion to populate their knowledge bases should be aware of this before drawing conclusions from what they find stored.

---

## Update: What the v0.2.14 Rerun Told Us (And Why It Changes Things)

After this article was published, we ran the same test against Iranti v0.2.14. The result was different — but not in a simple "better" or "worse" way. It revealed something about the original test that changes how we should read the findings above.

### What the rerun found

The contamination pattern — where every wrong value matched something already in the KB — did not appear in v0.2.14. So the specific claim that "the Librarian is pulling in existing KB data and substituting it for what the text says" was not reproduced.

Instead, a different problem showed up: when we submitted the same prose passage, the extractor returned zero extracted candidates. Nothing was extracted at all. The pipeline didn't produce wrong values; it produced no values.

When we reformatted the input as structured key:value pairs instead of prose, the extractor did extract some facts — two out of four, both correctly. The other two keys (affiliation and previous employer) were not extracted under any format we tried.

### The thing we missed the first time

Here's the part that changes the interpretation of the original article.

Both evaluations — v0.2.12 and v0.2.14 — ran with the Iranti instance configured to use a **mock LLM provider**. That means the "LLM" inside the Librarian was not a real language model. It was a test stub.

In v0.2.12, the mock LLM appears to have returned canned data from the KB when asked to extract facts. That produced the contamination pattern we described above — every wrong value matched a KB entry because the mock was echoing KB state back at us, not because the Librarian has a design defect that causes it to pull in other entities' data.

In v0.2.14, the mock LLM appears to behave differently — returning empty responses for most queries, which is why extraction returns nothing for prose input.

Neither result tells us what the Librarian actually does when backed by a real LLM.

### What this means for what we claimed

The original article said: "This is contamination. The ingest pipeline doesn't appear to be reading only the document you give it."

That claim needs to be walked back. It may have been wrong.

The contamination pattern was real — we described it accurately. But its cause was probably the mock LLM behaving like a mock, not the Librarian systematically corrupting extractions. Those are very different problems. One is a fundamental architectural issue; the other is a testing infrastructure issue.

We cannot confirm or deny the contamination hypothesis on the actual production-path code until the instance is configured with a real LLM provider. Until that happens, we don't know what `iranti_ingest` actually does.

### What we can say now

**Still accurate:**
- The original test ran as described. The numbers (1/4 accuracy, specific wrong values) are correct for what was tested.
- `iranti_write` and `iranti_ingest` are different code paths. The structured-write results from B1–B4 say nothing about ingest quality.
- A real-provider test is required before any conclusion about ingest accuracy is valid.

**Downgraded:**
- The contamination claim is now "plausible mock artifact, not confirmed defect." We believe the original v0.2.12 errors were caused by mock LLM behavior, not by the Librarian design.
- The severity characterization from this article ("significant quality concern about a core pipeline feature") was premature given the testing conditions. We should have checked the LLM provider configuration before publishing.

**Still open:**
- What does iranti_ingest actually do with a real LLM? We don't know yet.
- Why were affiliation and previous_employer not extracted under any tested phrasing in v0.2.14? That gap is unexplained and warrants investigation even after a real-provider test is run.

### The honest summary

We published a finding that was more confident than the evidence warranted. The contamination pattern was striking and the hypothesis was plausible — but we did not verify that the underlying LLM was functioning as a real model before interpreting the results. That was an error in the evaluation process.

The rerun did not rescue the original finding. It complicated it. The B6 benchmark track is now marked incomplete, pending a retest with a real LLM provider. That test has now run — see the Final Update below.

---

## Final Update: We Tested with a Real AI Provider. Here's What We Found.

> **Final update (v0.2.14 + OpenAI provider, 2026-03-21):** We've now tested iranti_ingest with a real AI provider. The contamination we originally reported was almost certainly caused by the test environment's mock AI, not by a bug in Iranti's extraction logic. However, the pipeline still doesn't work — it now fails silently, returning zero extracted facts for natural prose passages. The failure is in how the pipeline breaks text into chunks before it even reaches the AI. The original conclusion stands: iranti_ingest cannot be used to automatically build a knowledge base from text. The reason changed; the result didn't.

Here is what happened in full.

### What we tested this time

We ran `iranti_ingest` against two entities (four facts each, eight total) using natural biographical prose — the same format as the original article — but this time with the Iranti instance configured to use OpenAI as its actual AI provider. Both prior evaluations had used a test stub (a "mock" AI) without us realizing it when we drew conclusions from the first one.

The result: zero extracted candidates from both entities. The pipeline returned no facts at all.

### What this means for the original article

The original article said the Librarian was "pulling in existing KB data and substituting it for what the text says." That was our best explanation at the time, and the pattern was striking. But it was wrong, or at least not the right explanation.

The contamination pattern — where every wrong value matched something already in the KB — was almost certainly produced by the test AI stub, not by a design flaw in the Librarian. The stub returned canned data from the KB when asked to extract facts. We read that as a Librarian defect. It was a test infrastructure problem.

We said it clearly in the v0.2.14 update: we published a finding that was more confident than the evidence warranted. We should have verified the AI provider configuration before interpreting the results. This final update confirms that the contamination hypothesis does not hold under real conditions.

### The real problem

What the real-provider test reveals is a different and more fundamental failure: the pipeline never reaches the AI at all for natural prose input. The chunker or extraction dispatch layer — the part that processes text before handing it to the AI — returns zero candidates. The AI gets nothing to extract because the pipeline doesn't send it anything.

This is LLM-independent. It doesn't matter whether you use a mock, OpenAI, or any other provider. The extraction is dead before the AI is involved.

### What was true before is still true

The practical conclusion from the original article — that you cannot rely on `iranti_ingest` to correctly extract facts from a text passage — remains accurate. The mechanism is different from what we originally described, but the outcome is the same: the pipeline does not work for natural prose.

The findings from B1 through B4, which used `iranti_write` for direct structured writes, are unaffected. Those results reflect what happens when you write facts explicitly. They say nothing about what happens when you ask the pipeline to extract them from text.

### Where we stand

B6 is concluded. Three rounds of testing. Zero successful extractions from natural prose under any configuration — mock or real AI. The defect is in the pipeline layer that processes text before the AI sees it. Iranti's direct write path works; its text ingestion path does not, as of this version.

---

## Final Update: v0.2.16 — The Pipeline Is Fixed

We ran `iranti_ingest` one more time, against Iranti v0.2.16, with two complete researcher passages and the real OpenAI provider. Here is what we found.

It works.

Both passages produced non-zero extracted candidate counts (20 and 17, respectively). All four canonical facts were extracted correctly from each passage. The values match the input text. There is no contamination — the extracted facts come from the passages we submitted, not from prior KB entries.

Eight keys written. Eight correct. Zero errors.

The story has come full circle. The feature we thought was broken in three different ways — contamination, then chunker failure, then complete extraction silence — now works cleanly under a real AI provider. The defect was in the pipeline layer that broke text into chunks before passing it to the AI. That layer has been fixed between v0.2.14 and v0.2.16.

One behavioral note worth knowing: the Librarian decomposes compound facts. When we submitted "Research Scientist at Google Brain from 2016 to 2018," the pipeline did not store that as a single string under `previous_employer`. It stored it as structured sub-keys: `previous_employer.employer`, `previous_employer.employer_location`, `previous_employer.employment_start_year`, `previous_employer.employment_end_year`. The values are correct. But if you later query `previous_employer` as a single key, you will get nothing — you need to query the sub-keys. This is a design behavior to be aware of if you mix ingest-written entries with structured-write entries in the same knowledge base.

The practical conclusion: you can use `iranti_ingest` to build a knowledge base from text in v0.2.16. Give it a researcher profile, a meeting note, or a biographical paragraph, and it will extract the facts and write them. The extraction is accurate and the values come from the text you provide, not from other entries in the KB.

Three rounds of testing. The first two produced results we had to walk back. The third closes it out with a clean positive finding. B6 is done.

---

*This article is part of the Iranti Benchmark Journal, a running record of the Iranti benchmarking program. Each entry documents what was tested, what was found, what wasn't found, and why the interpretation is bounded. Formal technical papers accompany each entry.*

*Full technical writeup: `papers/B6-ingest-pipeline-paper.md`*
*Raw results: `results/raw/B6-ingest-pipeline.md`*
