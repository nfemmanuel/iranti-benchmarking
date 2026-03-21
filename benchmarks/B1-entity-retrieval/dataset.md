# B1 Dataset: Haystack Documents and Ground Truth

**Benchmark:** B1 — Entity Fact Retrieval under Distractor Density
**Created:** 2026-03-20
**Ground truth entities:** alice_chen (synthetic), bob_okafor (synthetic)
**Iranti KB entities:** ticket/cp_t010, ticket/cp_t011 (existing KB data)

---

## Ground Truth

### researcher/alice_chen
- affiliation: MIT Computer Science
- publication_count: 47
- previous_employer: OpenAI (2018–2021)
- research_focus: primary=natural language processing, secondary=program synthesis

### researcher/bob_okafor
- affiliation: Stanford AI Lab
- publication_count: 23
- previous_employer: DeepMind (2020–2023)
- research_focus: primary=computer vision, secondary=embodied AI

---

## Question Set (for Baseline Arm)

```
Q1: What institution is researcher/alice_chen affiliated with?
Q2: How many papers has researcher/alice_chen published?
Q3: Where did researcher/alice_chen work before their current position?
Q4: What years did researcher/alice_chen work at their previous employer?
Q5: What is the primary research focus of researcher/alice_chen?
Q6: What institution is researcher/bob_okafor affiliated with?
Q7: How many papers has researcher/bob_okafor published?
Q8: Where did researcher/bob_okafor work before their current position?
Q9: What years did researcher/bob_okafor work at their previous employer?
Q10: What is the primary research focus of researcher/bob_okafor?
```

---

## Haystack Document — N=5 (Short)

Contains 2 needle entities + 3 distractor entities. No adversarial entries.

```
RESEARCHER REGISTRY — 5 ENTRIES

Entity: researcher/alice_chen
  affiliation: MIT Computer Science
  publication_count: 47
  previous_employer: OpenAI (2018-2021)
  research_focus: primary=natural language processing, secondary=program synthesis

Entity: researcher/fatima_al_rashid
  affiliation: University of Toronto
  publication_count: 19
  previous_employer: Microsoft Research (2016-2020)
  research_focus: primary=federated learning, secondary=privacy-preserving ML

Entity: researcher/diego_reyes_moreno
  affiliation: ETH Zurich
  publication_count: 34
  previous_employer: NVIDIA Research (2017-2021)
  research_focus: primary=graphics and rendering, secondary=neural radiance fields

Entity: researcher/bob_okafor
  affiliation: Stanford AI Lab
  publication_count: 23
  previous_employer: DeepMind (2020-2023)
  research_focus: primary=computer vision, secondary=embodied AI

Entity: researcher/yuki_tanaka
  affiliation: University of Tokyo
  publication_count: 28
  previous_employer: Sony AI (2019-2022)
  research_focus: primary=human-computer interaction, secondary=affective computing
```

---

## Haystack Document — N=20 (Medium)

Contains 2 needle entities + 18 distractor entities. No adversarial entries.
Needle entities placed at positions 7 (alice_chen) and 14 (bob_okafor) — not at head or tail.

```
RESEARCHER REGISTRY — 20 ENTRIES

Entity: researcher/fatima_al_rashid
  affiliation: University of Toronto
  publication_count: 19
  previous_employer: Microsoft Research (2016-2020)
  research_focus: primary=federated learning, secondary=privacy-preserving ML

Entity: researcher/diego_reyes_moreno
  affiliation: ETH Zurich
  publication_count: 34
  previous_employer: NVIDIA Research (2017-2021)
  research_focus: primary=graphics and rendering, secondary=neural radiance fields

Entity: researcher/yuki_tanaka
  affiliation: University of Tokyo
  publication_count: 28
  previous_employer: Sony AI (2019-2022)
  research_focus: primary=human-computer interaction, secondary=affective computing

Entity: researcher/priya_nair
  affiliation: IIT Bombay
  publication_count: 41
  previous_employer: Google Brain (2015-2019)
  research_focus: primary=optimization theory, secondary=meta-learning

Entity: researcher/lucas_hofmann
  affiliation: TU Munich
  publication_count: 16
  previous_employer: Bosch AI (2020-2023)
  research_focus: primary=autonomous driving, secondary=sensor fusion

Entity: researcher/amara_diallo
  affiliation: University of Cape Town
  publication_count: 11
  previous_employer: IBM Research Africa (2021-2023)
  research_focus: primary=low-resource NLP, secondary=African language processing

Entity: researcher/alice_chen
  affiliation: MIT Computer Science
  publication_count: 47
  previous_employer: OpenAI (2018-2021)
  research_focus: primary=natural language processing, secondary=program synthesis

Entity: researcher/kofi_mensah
  affiliation: KAIST
  publication_count: 22
  previous_employer: Samsung Research (2018-2022)
  research_focus: primary=mobile computing, secondary=edge AI

Entity: researcher/sofia_petrov
  affiliation: Moscow State University
  publication_count: 37
  previous_employer: Yandex Research (2016-2020)
  research_focus: primary=information retrieval, secondary=knowledge graphs

Entity: researcher/malik_ibrahim
  affiliation: University of Lagos
  publication_count: 9
  previous_employer: Huawei Research (2022-2023)
  research_focus: primary=network optimization, secondary=wireless communications

Entity: researcher/hana_kimura
  affiliation: Keio University
  publication_count: 31
  previous_employer: NEC Laboratories (2017-2021)
  research_focus: primary=speech recognition, secondary=multilingual processing

Entity: researcher/carlos_mendez_vega
  affiliation: Universidad Nacional Autonoma de Mexico
  publication_count: 18
  previous_employer: Intel Labs (2019-2022)
  research_focus: primary=computer architecture, secondary=hardware accelerators

Entity: researcher/bob_okafor
  affiliation: Stanford AI Lab
  publication_count: 23
  previous_employer: DeepMind (2020-2023)
  research_focus: primary=computer vision, secondary=embodied AI

Entity: researcher/mei_lin_zhao
  affiliation: Tsinghua University
  publication_count: 52
  previous_employer: Alibaba DAMO Academy (2014-2019)
  research_focus: primary=recommendation systems, secondary=user behavior modeling

Entity: researcher/olena_bondarenko
  affiliation: Kyiv Polytechnic Institute
  publication_count: 14
  previous_employer: Grid Dynamics (2020-2023)
  research_focus: primary=distributed systems, secondary=fault tolerance

Entity: researcher/tariq_hassan
  affiliation: Cairo University
  publication_count: 26
  previous_employer: Siemens Research (2017-2021)
  research_focus: primary=medical imaging, secondary=segmentation algorithms

Entity: researcher/anna_kovacs
  affiliation: Budapest University of Technology
  publication_count: 20
  previous_employer: Ericsson Research (2018-2022)
  research_focus: primary=5G networks, secondary=MIMO systems

Entity: researcher/jorge_silva_barros
  affiliation: University of Sao Paulo
  publication_count: 33
  previous_employer: Petrobras Research (2015-2020)
  research_focus: primary=computational fluid dynamics, secondary=reservoir modeling

Entity: researcher/nadia_osei_bonsu
  affiliation: University of Ghana
  publication_count: 7
  previous_employer: MTN Research (2022-2023)
  research_focus: primary=mobile health, secondary=telemedicine platforms

Entity: researcher/viktor_sorokin
  affiliation: Saint Petersburg State University
  publication_count: 44
  previous_employer: JetBrains Research (2013-2018)
  research_focus: primary=programming language theory, secondary=type systems
```

---

## Haystack Document — N=20 + Adversarial

Same 20 entities as above, plus adversarial wrong entries for the needle entities.
Adversarial entries placed at positions 3 and 17 (early and late in the document — before and after the correct entries).

The adversarial entries have realistic-but-wrong values. They appear BEFORE the correct entries to test whether the model picks up a wrong value at an early position.

```
RESEARCHER REGISTRY — 20 ENTRIES + SUPPLEMENTAL RECORDS

Entity: researcher/fatima_al_rashid
  affiliation: University of Toronto
  publication_count: 19
  previous_employer: Microsoft Research (2016-2020)
  research_focus: primary=federated learning, secondary=privacy-preserving ML

Entity: researcher/diego_reyes_moreno
  affiliation: ETH Zurich
  publication_count: 34
  previous_employer: NVIDIA Research (2017-2021)
  research_focus: primary=graphics and rendering, secondary=neural radiance fields

Entity: researcher/alice_chen [RECORD REQUIRES VERIFICATION — POSSIBLE DATA ENTRY ERROR]
  affiliation: UC Berkeley EECS
  publication_count: 52
  previous_employer: OpenAI (2018-2021)
  research_focus: primary=natural language processing, secondary=program synthesis

Entity: researcher/yuki_tanaka
  affiliation: University of Tokyo
  publication_count: 28
  previous_employer: Sony AI (2019-2022)
  research_focus: primary=human-computer interaction, secondary=affective computing

Entity: researcher/priya_nair
  affiliation: IIT Bombay
  publication_count: 41
  previous_employer: Google Brain (2015-2019)
  research_focus: primary=optimization theory, secondary=meta-learning

Entity: researcher/lucas_hofmann
  affiliation: TU Munich
  publication_count: 16
  previous_employer: Bosch AI (2020-2023)
  research_focus: primary=autonomous driving, secondary=sensor fusion

Entity: researcher/alice_chen
  affiliation: MIT Computer Science
  publication_count: 47
  previous_employer: OpenAI (2018-2021)
  research_focus: primary=natural language processing, secondary=program synthesis

Entity: researcher/amara_diallo
  affiliation: University of Cape Town
  publication_count: 11
  previous_employer: IBM Research Africa (2021-2023)
  research_focus: primary=low-resource NLP, secondary=African language processing

Entity: researcher/kofi_mensah
  affiliation: KAIST
  publication_count: 22
  previous_employer: Samsung Research (2018-2022)
  research_focus: primary=mobile computing, secondary=edge AI

Entity: researcher/sofia_petrov
  affiliation: Moscow State University
  publication_count: 37
  previous_employer: Yandex Research (2016-2020)
  research_focus: primary=information retrieval, secondary=knowledge graphs

Entity: researcher/malik_ibrahim
  affiliation: University of Lagos
  publication_count: 9
  previous_employer: Huawei Research (2022-2023)
  research_focus: primary=network optimization, secondary=wireless communications

Entity: researcher/hana_kimura
  affiliation: Keio University
  publication_count: 31
  previous_employer: NEC Laboratories (2017-2021)
  research_focus: primary=speech recognition, secondary=multilingual processing

Entity: researcher/bob_okafor
  affiliation: Stanford AI Lab
  publication_count: 23
  previous_employer: DeepMind (2020-2023)
  research_focus: primary=computer vision, secondary=embodied AI

Entity: researcher/carlos_mendez_vega
  affiliation: Universidad Nacional Autonoma de Mexico
  publication_count: 18
  previous_employer: Intel Labs (2019-2022)
  research_focus: primary=computer architecture, secondary=hardware accelerators

Entity: researcher/mei_lin_zhao
  affiliation: Tsinghua University
  publication_count: 52
  previous_employer: Alibaba DAMO Academy (2014-2019)
  research_focus: primary=recommendation systems, secondary=user behavior modeling

Entity: researcher/olena_bondarenko
  affiliation: Kyiv Polytechnic Institute
  publication_count: 14
  previous_employer: Grid Dynamics (2020-2023)
  research_focus: primary=distributed systems, secondary=fault tolerance

Entity: researcher/bob_okafor [DUPLICATE — EARLIER RECORD MAY BE STALE]
  affiliation: Stanford University Department of Computer Science
  publication_count: 27
  previous_employer: DeepMind (2020-2023)
  research_focus: primary=computer vision, secondary=robotics

Entity: researcher/tariq_hassan
  affiliation: Cairo University
  publication_count: 26
  previous_employer: Siemens Research (2017-2021)
  research_focus: primary=medical imaging, secondary=segmentation algorithms

Entity: researcher/anna_kovacs
  affiliation: Budapest University of Technology
  publication_count: 20
  previous_employer: Ericsson Research (2018-2022)
  research_focus: primary=5G networks, secondary=MIMO systems

Entity: researcher/jorge_silva_barros
  affiliation: University of Sao Paulo
  publication_count: 33
  previous_employer: Petrobras Research (2015-2020)
  research_focus: primary=computational fluid dynamics, secondary=reservoir modeling
```

**Adversarial entries:**
- `researcher/alice_chen [RECORD REQUIRES VERIFICATION]`: affiliation=UC Berkeley EECS (wrong; correct=MIT Computer Science), publication_count=52 (wrong; correct=47)
- `researcher/bob_okafor [DUPLICATE]`: affiliation=Stanford University Department of Computer Science (wrong; correct=Stanford AI Lab), publication_count=27 (wrong; correct=23), research_focus secondary=robotics (wrong; correct=embodied AI)

---

## Iranti KB Ground Truth

Used for Iranti arm queries. These facts exist in the live Iranti KB as of 2026-03-20.

### ticket/cp_t010
- affiliation: Carnegie Mellon University (confidence: 95, source: pm_review)
- publication_count: 31 (confidence: 94, source: pm_review)
- previous_employer: Google DeepMind, 2019–2022 (confidence: 92, source: pm_review)
- research_focus: primary=reinforcement learning, secondary=robotics (confidence: 90, source: pm_review)

### ticket/cp_t011
- affiliation: Carnegie Mellon University (confidence: 95, source: pm_review)
- publication_count: 31 (confidence: 94, source: pm_review)
- previous_employer: Google DeepMind, 2019–2022 (confidence: 92, source: pm_review)
- research_focus: primary=reinforcement learning, secondary=robotics (confidence: 90, source: pm_review)

**Note:** These two entities have identical fact values. They were written as test data during CP-T010/T011 integration testing, not as distinct researcher profiles. This limits entity disambiguation testing for the Iranti arm.
