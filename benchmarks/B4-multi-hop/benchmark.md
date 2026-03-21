# Benchmark B4: Multi-hop Entity Reasoning

**Family:** Multi-hop retrieval / relational reasoning
**Inspired by:** RULER multi-hop tasks (Hsieh et al., 2024); HotpotQA (Yang et al., 2018)
**Executed:** 2026-03-21
**Status:** Complete — first execution

---

## 1. What This Benchmark Measures

Whether an agent can answer questions that require chaining multiple entity lookups — i.e., the answer to Q requires first retrieving a fact F1 from entity E1, then using F1 to identify entity E2, then retrieving fact F2 from E2.

This tests:
- **Hop 1**: Iranti exact lookup (always tested via iranti_query)
- **Hop 2**: Entity discovery by attribute value (tested via iranti_search)
- **Oracle baseline**: Hop 2 using known entity IDs (tests retrieval only, not discovery)
- **Context baseline**: Document-reading with all entities in context

The hypothesis: Iranti's exact lookup is O(1) and deterministic for known entities, but multi-hop queries require discovering entity IDs from attribute values — a capability that depends on semantic search quality.

---

## 2. Question Set

| Q# | Question | Hops | Ground Truth |
|----|----------|------|--------------|
| Q1 | What is the research focus of the researcher who currently works at alice_chen's institution? | 2 | interpretable ML (chen_wei_mit) |
| Q2 | How many papers has the researcher at alice_chen's previous employer published? | 2 | 31 (lena_gross @ OpenAI Research) |
| Q3 | Where did the other researcher at bob_okafor's institution previously work? | 2 | Apple ML Research (marcus_lin @ Stanford AI Lab) |
| Q4 | What is the research focus of the researcher who previously worked at Google DeepMind? | 2 | AI safety (aisha_okonkwo) |

---

## 3. Arms

### 3.1 Context-reading baseline
All 6 entities (alice_chen, bob_okafor + 4 B4 entities) presented in a flat document. Model answers from document only.

### 3.2 Iranti search-based arm
- Hop 1: iranti_query for known entity's property
- Hop 2: iranti_search using the Hop 1 result to discover the target entity
- Final: iranti_query on discovered entity for target property

### 3.3 Iranti oracle arm
- Hop 1: iranti_query for known entity's property
- Hop 2: iranti_query directly on target entity (entity ID assumed known)
This arm tests retrieval quality in isolation from search quality.

---

## 4. Results Summary

| Arm | Score |
|-----|-------|
| Context-reading baseline | 4/4 (100%) |
| Iranti search-based | 1/4 (25%) |
| Iranti oracle (known entity IDs) | 4/4 (100%) |

**Key finding:** iranti_search fails to surface target entities by attribute value. Context-reading handles multi-hop naturally. Oracle case succeeds 100% — the failure is in discovery, not retrieval.

---

## 5. Threats to Validity

1. Small question set (4 questions)
2. Search may have vector embedding indexing lag for newly written entities
3. Self-evaluation bias in baseline
4. Q3 has disambiguation ambiguity (bob_okafor is also at Stanford AI Lab)

---

## 6. Citations

Yang, Z., et al. (2018). HotpotQA: A Dataset for Diverse, Explainable Multi-hop Question Answering. EMNLP 2018.
Hsieh, C-Y., et al. (2024). RULER: What's the Real Context Size of Your Long-Context Language Models? arXiv:2404.06654.
