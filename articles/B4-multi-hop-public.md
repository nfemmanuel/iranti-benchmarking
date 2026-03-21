# When Finding an Answer Requires Finding Two Things First

> **Update (v0.2.14, 2026-03-21):** The search regression described in this article has worsened. iranti_search now crashes at runtime rather than returning degraded results. The multi-hop capability remains non-functional. Exact-lookup (iranti_query) is unaffected. See the formal paper for details.

> **Update (v0.2.16, 2026-03-21):** Significant improvement. The crash is fixed and vector scoring is now active. See the final status section at the end of this article for the full picture.

**Series:** Iranti Benchmark Journal
**Track:** B4 — Multi-hop Entity Reasoning
**Date:** March 2026
**Audience:** Technical generalists — developers, AI researchers, curious readers

---

## The Question We're Actually Asking

Some questions can't be answered in one step.

"What does the researcher at Alice's institution work on?" requires you to first find out where Alice works, then find who else works there, then find that person's research focus. Three distinct lookups, chained together. This is called multi-hop reasoning — you have to hop through intermediate facts to get to the final answer.

It's a common pattern in real knowledge work. And it's a meaningful test of a memory system, because the system has to do more than store and retrieve individual facts. It has to support the navigation of relationships between entities.

This benchmark asks: how well does Iranti handle this?

---

## What We Actually Tested

We set up a small knowledge base with fictional researchers and wrote four two-hop questions designed to require chained lookups.

Example:

> "What is the research focus of the researcher who currently works at the same institution as Alice Chen?"

To answer this:
- Hop 1: Look up where Alice Chen works (answer: MIT Computer Science)
- Hop 2: Find which other researcher is affiliated with MIT Computer Science (answer: Chen Wei)
- Then: Look up Chen Wei's research focus (answer: interpretable ML)

We ran each question two ways with Iranti:

**Search-based path:** Hop 1 uses exact entity lookup. Hop 2 uses Iranti's search feature to find entities by attribute value — asking "who works at MIT Computer Science?"

**Oracle path:** Both hops use exact lookup, with entity IDs known in advance.

We also ran all four questions against a simple baseline: give the agent a plain text document listing all the researchers and let it read the answer directly.

---

## What We Found

The results are a clear split.

**Baseline (context reading): 4/4 correct.** The model scanned the document, found all entities matching the right institution, correctly excluded the target entity itself, and returned the right answer every time. It handled ambiguous cases (more than one researcher at the same institution) without difficulty.

**Iranti oracle path: 4/4 correct.** When entity IDs were known in advance, Iranti's exact lookup worked perfectly. Every hop succeeded.

**Iranti search-based path: 1/4 correct.** Three of the four questions failed at the second hop. The search couldn't find the right entity by attribute value.

---

## What Went Wrong With Search

The failure pattern was consistent. After the first hop returned an institution name — say, "MIT Computer Science" — the agent searched Iranti for researchers affiliated with that institution. The search consistently returned the wrong results.

Specifically, it kept returning the oldest five entries in the knowledge base (two researchers from an earlier session) and ignored all the newer entities written for this benchmark. The answer was in the KB. The search just didn't surface it.

Three hypotheses from the raw results:

1. **Indexing lag:** Vector embeddings may not be generated immediately when new entries are written. Entities added in the same session might not yet appear in search results.

2. **Value-vs-summary indexing:** The search may index the text summary of an entry rather than the structured value fields. A summary saying "affiliated with MIT Computer Science" may not exist if it was auto-generated from the JSON value only.

3. **Score bias toward older entries:** More established entries with higher accumulated scores may dominate search rankings, pushing newer entries off the top-5 list regardless of relevance.

We don't know which of these is correct. The raw results document the failure clearly; the root cause would require access to Iranti's internal search implementation.

---

## What This Means in Practice

If you know the entity IDs you're working with, Iranti's multi-hop performance is perfect. Exact lookup is fast, accurate, and deterministic. Chain as many hops as you want.

If you don't know the entity IDs, and you need to discover entities by what they contain — "find me a researcher who works at institution X" — the current search implementation doesn't reliably do this. It may fail silently (no error, just wrong or missing results), and the failure appears consistent rather than intermittent.

This is a real gap. Discovery by attribute value is exactly the kind of query that makes multi-hop reasoning useful. If every hop requires a known entity ID, the agent has to already know what it's looking for before it starts looking — which largely defeats the purpose.

Context-reading avoids this problem entirely. A language model scanning a document uses simple pattern matching to find all entities that share an attribute value. It doesn't need indexes or search rankings. This is a case where Iranti's current implementation performs worse than not using a memory system at all.

---

## What We Can Claim

**Confirmed:**
- Iranti's exact entity lookup is reliable and works correctly for multi-hop chains when entity IDs are known
- Context-reading handles multi-hop naturally and correctly at small KB sizes
- Iranti's search-based entity discovery does not reliably find entities by attribute value — at least for recently written entities in this setup

**Not confirmed:**
- Whether the search failure is a configuration issue, an indexing lag, or a fundamental limitation
- Whether the failure persists with different search query formulations (we tested three phrasings; all failed)
- Whether this holds at different KB sizes or with different entity types

**We're not claiming context-reading is better than Iranti in general.** At larger KB sizes — hundreds or thousands of entities — a language model reading a full document will eventually degrade in accuracy. Iranti's exact lookup won't. The comparison at small scale is expected to favor context-reading. What's notable here is that the search-based discovery failure is significant enough to break multi-hop functionality entirely, which is a current capability gap that needs to be understood before Iranti can be recommended for multi-hop use cases.

---

## What the Path Forward Is

The search gap is fixable. Possible approaches include ensuring vector embeddings are generated before queries are issued, testing whether explicit summary fields improve searchability, or building dedicated entity-discovery queries. We haven't tested any of these.

The benchmark program will return to this question at larger KB sizes, where the comparison between context-reading and Iranti's exact lookup becomes meaningful — and where Iranti's advantages are more likely to emerge.

---

---

## Final Status: v0.2.16 — Significant Improvement, One Remaining Ceiling

The picture changed substantially with v0.2.16. Here is where things stand.

**The crash is fixed.** The runtime error introduced in v0.2.14 that prevented `iranti_search` from returning anything at all is gone. The tool runs.

**Vector scoring is active.** In v0.2.12, the vector embedding part of the search scored zero for every result — meaning the system was running on keyword matching only, and keyword matching alone wasn't good enough for multi-entity disambiguation. In v0.2.16, vector scores are in the range 0.35–0.74. The hybrid search is working as designed.

**Multi-hop via named attributes now works.** The three questions that failed in v0.2.12 — "find the researcher at MIT Computer Science," "find the researcher who came from OpenAI," "find the other researcher at Stanford AI Lab" — would succeed in v0.2.16. The search can find researchers by their institution names and former employers. The vector component fills in what keyword matching alone could not.

**One ceiling remains: indirect descriptions.** If you ask "find the researcher who studies causality and inference without econometrics" — a semantic paraphrase rather than a direct attribute name — the correct entity does not appear in the top results. The system searches for direct attribute values better than it reasons about semantic descriptions of what those values mean. Multi-hop chains that rely on indirect semantic circumlocution rather than direct attribute matching will still fail.

**In practical terms for v0.2.16:** You can use `iranti_search` to support multi-hop reasoning over researchers by institution name, previous employer, or named attributes. You cannot yet use it for indirect-description queries like "find someone who works on X without Y." The structured-attribute lookup case — which is the primary B4 use case — is now viable.

The formal version history:

| Version | iranti_search | vectorScore | Direct attribute query | Semantic paraphrase |
|---------|--------------|-------------|----------------------|-------------------|
| 0.2.12 | Degraded | 0 | Partial (unique terms only) | Fails |
| 0.2.14 | Crashes | N/A | N/A | N/A |
| 0.2.16 | Operational (partial) | Non-zero (0.35–0.74) | Works | Fails |

This is a meaningful improvement. The tool went from crashing to working for the primary case. The semantic paraphrase ceiling is a known limitation, not a mystery — it tells you where the capability boundary is so you can design around it.

---

*This article is part of the Iranti Benchmark Journal, a running record of the Iranti benchmarking program. Each entry documents what was tested, what was found, what wasn't found, and why the interpretation is bounded. Formal technical papers accompany each entry.*

*Full technical writeup: `papers/B4-multi-hop-paper.md`*
*Raw results: `results/raw/B4-multi-hop.md`*
