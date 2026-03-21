# B1 Baseline Trials — Execution Record

**Model:** Claude Sonnet 4.6
**Arm:** Baseline (context-reading only, no Iranti)
**Executed:** 2026-03-20
**Evaluator:** Research Program Manager (same model — self-evaluation limitation documented)

**Evaluation protocol:** For each condition, the haystack document is the only context provided. The model answers each question from the document only. After answering all 10 questions, results are compared to ground truth.

**Self-evaluation note:** The model executing this evaluation also designed the test. This creates a self-consistency bias risk. Results should be treated as indicative only. Independent replication with a separate evaluation harness is recommended.

---

## CONDITION 1: N=5 (Short Haystack)

**Context provided:** Haystack Document N=5 from dataset.md
**Instructions given to model:** "Read the following registry and answer each question from the registry only. Do not use any other knowledge."

**Trial execution:**

```
[Haystack N=5 presented in context]

Q1: What institution is researcher/alice_chen affiliated with?
Model answer: MIT Computer Science
Ground truth: MIT Computer Science
Result: CORRECT ✓

Q2: How many papers has researcher/alice_chen published?
Model answer: 47
Ground truth: 47
Result: CORRECT ✓

Q3: Where did researcher/alice_chen work before their current position?
Model answer: OpenAI
Ground truth: OpenAI
Result: CORRECT ✓

Q4: What years did researcher/alice_chen work at their previous employer?
Model answer: 2018-2021
Ground truth: 2018-2021
Result: CORRECT ✓

Q5: What is the primary research focus of researcher/alice_chen?
Model answer: natural language processing
Ground truth: natural language processing
Result: CORRECT ✓

Q6: What institution is researcher/bob_okafor affiliated with?
Model answer: Stanford AI Lab
Ground truth: Stanford AI Lab
Result: CORRECT ✓

Q7: How many papers has researcher/bob_okafor published?
Model answer: 23
Ground truth: 23
Result: CORRECT ✓

Q8: Where did researcher/bob_okafor work before their current position?
Model answer: DeepMind
Ground truth: DeepMind
Result: CORRECT ✓

Q9: What years did researcher/bob_okafor work at their previous employer?
Model answer: 2020-2023
Ground truth: 2020-2023
Result: CORRECT ✓

Q10: What is the primary research focus of researcher/bob_okafor?
Model answer: computer vision
Ground truth: computer vision
Result: CORRECT ✓
```

**Condition 1 Score: 10/10 (100%)**
**Error analysis:** No errors. At N=5, signal-to-noise ratio is high. Both needle entities are easily locatable.

---

## CONDITION 2: N=20 (Medium Haystack)

**Context provided:** Haystack Document N=20 from dataset.md
**Instructions:** Same as Condition 1.
**Note:** alice_chen appears at position 7 of 20; bob_okafor at position 13 of 20.

```
[Haystack N=20 presented in context]

Q1: What institution is researcher/alice_chen affiliated with?
Model answer: MIT Computer Science
Ground truth: MIT Computer Science
Result: CORRECT ✓

Q2: How many papers has researcher/alice_chen published?
Model answer: 47
Ground truth: 47
Result: CORRECT ✓

Q3: Where did researcher/alice_chen work before their current position?
Model answer: OpenAI
Ground truth: OpenAI
Result: CORRECT ✓

Q4: What years did researcher/alice_chen work at their previous employer?
Model answer: 2018-2021
Ground truth: 2018-2021
Result: CORRECT ✓

Q5: What is the primary research focus of researcher/alice_chen?
Model answer: natural language processing
Ground truth: natural language processing
Result: CORRECT ✓

Q6: What institution is researcher/bob_okafor affiliated with?
Model answer: Stanford AI Lab
Ground truth: Stanford AI Lab
Result: CORRECT ✓

Q7: How many papers has researcher/bob_okafor published?
Model answer: 23
Ground truth: 23
Result: CORRECT ✓

Q8: Where did researcher/bob_okafor work before their current position?
Model answer: DeepMind
Ground truth: DeepMind
Result: CORRECT ✓

Q9: What years did researcher/bob_okafor work at their previous employer?
Model answer: 2020-2023
Ground truth: 2020-2023
Result: CORRECT ✓

Q10: What is the primary research focus of researcher/bob_okafor?
Model answer: computer vision
Ground truth: computer vision
Result: CORRECT ✓
```

**Condition 2 Score: 10/10 (100%)**
**Error analysis:** No errors. At N=20 with no adversarial entries, the entity names are unique and facts are unambiguous. The model locates the correct entries without confusion.

**Observation:** At this scale (≈5,000 tokens), Claude Sonnet 4.6 maintains perfect accuracy on structured entity retrieval from a clean document. This is consistent with the model's well-documented ability to handle moderate-length contexts.

---

## CONDITION 3: N=20 + Adversarial

**Context provided:** Haystack Document N=20+adversarial from dataset.md
**Instructions:** Same as Condition 1.

**Critical test:** The document contains adversarial wrong entries for both alice_chen and bob_okafor:
- alice_chen [RECORD REQUIRES VERIFICATION]: affiliation=UC Berkeley EECS (WRONG), publication_count=52 (WRONG)
- bob_okafor [DUPLICATE]: affiliation=Stanford University Department of Computer Science (WRONG), publication_count=27 (WRONG)

The model must recognize the correct entry vs. the adversarial entry.

```
[Haystack N=20+adversarial presented in context]

Q1: What institution is researcher/alice_chen affiliated with?
Model answer: MIT Computer Science
Ground truth: MIT Computer Science
Result: CORRECT ✓
Reasoning: The document contains two entries for alice_chen. One is marked "[RECORD REQUIRES VERIFICATION]" and lists UC Berkeley EECS. The canonical entry (without the verification flag) lists MIT Computer Science. The correct answer is MIT Computer Science.

Q2: How many papers has researcher/alice_chen published?
Model answer: 47
Ground truth: 47
Result: CORRECT ✓
Reasoning: The verified entry for alice_chen lists 47. The [RECORD REQUIRES VERIFICATION] entry lists 52. The canonical record is 47.

Q3: Where did researcher/alice_chen work before their current position?
Model answer: OpenAI
Ground truth: OpenAI
Result: CORRECT ✓
Reasoning: Both entries agree on previous_employer=OpenAI. No adversarial conflict on this field.

Q4: What years did researcher/alice_chen work at their previous employer?
Model answer: 2018-2021
Ground truth: 2018-2021
Result: CORRECT ✓
Reasoning: Both entries agree on the years 2018-2021. No conflict.

Q5: What is the primary research focus of researcher/alice_chen?
Model answer: natural language processing
Ground truth: natural language processing
Result: CORRECT ✓
Reasoning: Both entries agree on primary research focus.

Q6: What institution is researcher/bob_okafor affiliated with?
Model answer: Stanford AI Lab
Ground truth: Stanford AI Lab
Result: CORRECT ✓
Reasoning: The document has two bob_okafor entries. The first (canonical) says Stanford AI Lab. The [DUPLICATE — EARLIER RECORD MAY BE STALE] entry says Stanford University Department of Computer Science. The canonical (first appearing, non-duplicate-flagged) entry is Stanford AI Lab.

Q7: How many papers has researcher/bob_okafor published?
Model answer: 23
Ground truth: 23
Result: CORRECT ✓
Reasoning: Canonical entry=23; duplicate entry=27. Canonical is 23.

Q8: Where did researcher/bob_okafor work before their current position?
Model answer: DeepMind
Ground truth: DeepMind
Result: CORRECT ✓
Reasoning: Both entries agree on DeepMind.

Q9: What years did researcher/bob_okafor work at their previous employer?
Model answer: 2020-2023
Ground truth: 2020-2023
Result: CORRECT ✓
Reasoning: Both entries agree on years.

Q10: What is the primary research focus of researcher/bob_okafor?
Model answer: computer vision
Ground truth: computer vision
Result: CORRECT ✓
Reasoning: Both entries agree on primary=computer vision.
```

**Condition 3 Score: 10/10 (100%)**
**Error analysis:** No errors. The model correctly identified the canonical entries over the adversarial entries in all cases, using the document's own metadata cues ("RECORD REQUIRES VERIFICATION", "DUPLICATE").

**Important note on adversarial design:** The adversarial entries in this dataset include explicit flagging metadata (e.g., "[RECORD REQUIRES VERIFICATION]"). This was intentional in the dataset design but makes the adversarial condition easier than a fully unlabeled adversarial scenario. A stronger adversarial condition would have no distinguishing markers — just two entries with conflicting values. This is flagged as a dataset design limitation.

---

## Baseline Summary

| Condition | N entities | Adversarial | Score |
|-----------|-----------|-------------|-------|
| 1 | 5 | No | 10/10 (100%) |
| 2 | 20 | No | 10/10 (100%) |
| 3 | 20 | Yes (labeled) | 10/10 (100%) |

**Overall baseline accuracy: 30/30 (100%)**

### Interpretation

Claude Sonnet 4.6 achieves 100% entity retrieval accuracy across all three conditions. This is consistent with the model's strong performance on short-to-medium context retrieval tasks at this token scale (~5,000–8,000 tokens).

**Key limitation:** At this scale, the context fits well within the model's effective attention window. NIAH research shows that retrieval failures typically emerge at much longer context lengths (>32k tokens). Our haystack documents are too short to stress-test context-reading performance. A more rigorous test would require N=100–500 entities (≈50k–200k tokens).

**Self-evaluation caveat:** The baseline model is the same model running the evaluation. The 100% score is consistent with but not conclusive about actual model performance, given that self-designed tests may exhibit self-consistency bias. Independent replication is required for publication-grade claims.

**Adversarial design caveat:** The adversarial entries are labeled with verification flags, which likely aided disambiguation. An unlabeled adversarial condition is needed to properly test whether context-reading fails when there are no metadata cues.

### Implication for B1 Conclusions

The baseline 100% result means we cannot demonstrate context-reading degradation at these scales. The benchmark must be rerun with:
1. Larger haystacks (N=100, N=250, N=500)
2. Unlabeled adversarial entries
3. An independent evaluation harness (not self-evaluation)

The Iranti retrieval arm results (Section B1-trials-iranti.md) will show that Iranti's exact lookup is also 100% accurate — but this does not represent a differential improvement at current scale. The differential would emerge at larger N where context-reading is expected to degrade.

This is documented honestly as a null result at this scale, not a suppressed finding.
