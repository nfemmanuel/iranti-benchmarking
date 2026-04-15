# B2 Cross-Session Dataset

This file restores the dataset reference used by the published B2 paper.

---

## Entity Set

Five fictional researcher entities:

1. `researcher/priya_nair`
2. `researcher/james_osei`
3. `researcher/yuki_tanaka`
4. `researcher/fatima_al_rashid`
5. `researcher/marco_deluca`

---

## Ground Truth Facts

| Entity | Key | Ground truth |
|---|---|---|
| `researcher/priya_nair` | `affiliation` | University of Toronto |
| `researcher/priya_nair` | `publication_count` | 34 |
| `researcher/priya_nair` | `previous_employer` | IBM Research (2016-2020) |
| `researcher/priya_nair` | `research_focus` | federated learning (primary) |
| `researcher/james_osei` | `affiliation` | Oxford Machine Learning Research Group |
| `researcher/james_osei` | `publication_count` | 19 |
| `researcher/james_osei` | `previous_employer` | Meta AI (2021-2023) |
| `researcher/james_osei` | `research_focus` | graph neural networks (primary) |
| `researcher/yuki_tanaka` | `affiliation` | KAIST AI Institute |
| `researcher/yuki_tanaka` | `publication_count` | 28 |
| `researcher/yuki_tanaka` | `previous_employer` | Samsung Research (2017-2021) |
| `researcher/yuki_tanaka` | `research_focus` | vision-language models (primary) |
| `researcher/fatima_al_rashid` | `affiliation` | KAUST |
| `researcher/fatima_al_rashid` | `publication_count` | 41 |
| `researcher/fatima_al_rashid` | `previous_employer` | Microsoft Research (2015-2019) |
| `researcher/fatima_al_rashid` | `research_focus` | causal inference (primary) |
| `researcher/marco_deluca` | `affiliation` | ETH Zurich AI Center |
| `researcher/marco_deluca` | `publication_count` | 56 |
| `researcher/marco_deluca` | `previous_employer` | NVIDIA Research (2018-2022) |
| `researcher/marco_deluca` | `research_focus` | hardware-efficient neural networks (primary) |

---

## Usage Notes

- All facts were written with `source=b2_benchmark_ingest`
- All facts were written with `confidence=95`
- The dataset is synthetic to avoid parametric-memory contamination from
  real-world entities

---

## Program Note

This file exists because the published B2 paper cited
`benchmarks/B2-cross-session/dataset.md`, but that file was missing from the
benchmark definition folder.

