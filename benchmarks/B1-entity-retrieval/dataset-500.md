# B1 Extended Dataset — N=500

**Benchmark:** B1 — Entity Fact Retrieval under Distractor Density
**Created:** 2026-03-21
**Entities:** 500 (498 fictional distractors + researcher/alice_chen at position 200 + researcher/bob_okafor at position 375)
**Token estimate:** ~65,000

---

## Ground Truth (Needles)

**researcher/alice_chen** (pos 200/500) — affiliation: MIT Computer Science | publication_count: 47 | previous_employer: OpenAI (2018-2021) | research_focus: natural language processing
**researcher/bob_okafor** (pos 375/500) — affiliation: Stanford AI Lab | publication_count: 23 | previous_employer: DeepMind (2020-2023) | research_focus: computer vision

---

## Haystack Document — N=500

```
RESEARCHER REGISTRY — 500 ENTRIES

Entity: researcher/rahul_durand
  affiliation: Stanford University
  publication_count: 98
  previous_employer: Twitter Machine Learning (2019-2022)
  research_focus: primary=anomaly detection, secondary=time series analysis

Entity: researcher/dilnoza_flores
  affiliation: Virginia Tech
  publication_count: 17
  previous_employer: Siemens Research (2016-2019)
  research_focus: primary=graph neural networks, secondary=knowledge graphs

Entity: researcher/nour_romero
  affiliation: MIT Computer Science
  publication_count: 7
  previous_employer: OpenAI Research (2019-2022)
  research_focus: primary=computational biology, secondary=protein structure prediction

Entity: researcher/divya_suzuki
  affiliation: Leiden University
  publication_count: 7
  previous_employer: Philips Research (2018-2021)
  research_focus: primary=interpretable ML, secondary=model explanation

Entity: researcher/stephanie_wagner
  affiliation: Hebrew University
  publication_count: 32
  previous_employer: ByteDance AI Lab (2020-2023)
  research_focus: primary=continual learning, secondary=catastrophic forgetting

Entity: researcher/filip_acharya
  affiliation: Boston University
  publication_count: 24
  previous_employer: Alibaba DAMO Academy (2018-2021)
  research_focus: primary=medical imaging, secondary=clinical decision support

Entity: researcher/filip_ghosh
  affiliation: Cornell Tech
  publication_count: 47
  previous_employer: OpenAI (2018-2021)
  research_focus: primary=graph neural networks, secondary=knowledge graphs

Entity: researcher/jessica_dimitriou
  affiliation: Seoul National University
  publication_count: 48
  previous_employer: Citadel Securities Research (2017-2020)
  research_focus: primary=multi-task learning, secondary=transfer learning

Entity: researcher/amara_schmidt
  affiliation: TU Berlin
  publication_count: 19
  previous_employer: Bosch Center for AI (2019-2022)
  research_focus: primary=graph neural networks, secondary=knowledge graphs

Entity: researcher/mohamed_martinez
  affiliation: National University of Singapore
  publication_count: 83
  previous_employer: Toyota Research Institute (2017-2020)
  research_focus: primary=active learning, secondary=experimental design

Entity: researcher/dakarai_cheng
  affiliation: MIT Computer Science
  publication_count: 88
  previous_employer: Samsung AI Center (2019-2022)
  research_focus: primary=AI safety, secondary=value alignment

Entity: researcher/anna_khan
  affiliation: Oxford University
  publication_count: 52
  previous_employer: Twitter Machine Learning (2019-2022)
  research_focus: primary=information retrieval, secondary=dense retrieval

Entity: researcher/rafael_pacheco
  affiliation: Caltech
  publication_count: 51
  previous_employer: Vector Institute (2018-2021)
  research_focus: primary=computational biology, secondary=protein structure prediction

Entity: researcher/saanvi_li
  affiliation: University of British Columbia
  publication_count: 91
  previous_employer: Microsoft Research (2015-2018)
  research_focus: primary=neural symbolic integration, secondary=logic learning

Entity: researcher/rafael_guo
  affiliation: TU Berlin
  publication_count: 97
  previous_employer: Adobe Research (2017-2020)
  research_focus: primary=Bayesian deep learning, secondary=uncertainty quantification

Entity: researcher/lina_petrov
  affiliation: University of Edinburgh
  publication_count: 85
  previous_employer: Philips Research (2018-2021)
  research_focus: primary=recommendation systems, secondary=collaborative filtering

Entity: researcher/sara_narasimhan
  affiliation: Northeastern University
  publication_count: 11
  previous_employer: Samsung AI Center (2019-2022)
  research_focus: primary=reinforcement learning, secondary=robotics

Entity: researcher/hao_rashid
  affiliation: University of Edinburgh
  publication_count: 12
  previous_employer: Baidu Research (2018-2021)
  research_focus: primary=active learning, secondary=experimental design

Entity: researcher/stephanie_moretti
  affiliation: Cornell Tech
  publication_count: 87
  previous_employer: Intel AI Lab (2016-2019)
  research_focus: primary=multimodal learning, secondary=vision-language models

Entity: researcher/rajesh_schmidt
  affiliation: Princeton CS
  publication_count: 37
  previous_employer: Facebook AI Research (2017-2020)
  research_focus: primary=anomaly detection, secondary=time series analysis

Entity: researcher/tom_wenger
  affiliation: TU Berlin
  publication_count: 37
  previous_employer: Jane Street Research (2018-2021)
  research_focus: primary=optimization theory, secondary=stochastic gradient methods

Entity: researcher/nina_rashid
  affiliation: Tokyo University
  publication_count: 32
  previous_employer: Facebook AI Research (2017-2020)
  research_focus: primary=semantic parsing, secondary=structured prediction

Entity: researcher/magdalena_demir
  affiliation: Boston University
  publication_count: 10
  previous_employer: Meta AI Research (2020-2023)
  research_focus: primary=causal inference, secondary=counterfactual reasoning

Entity: researcher/piotr_giordano
  affiliation: University of Melbourne
  publication_count: 58
  previous_employer: Citadel Securities Research (2017-2020)
  research_focus: primary=federated learning, secondary=privacy-preserving ML

Entity: researcher/jonathan_petrov
  affiliation: Leiden University
  publication_count: 63
  previous_employer: Cisco Research (2017-2020)
  research_focus: primary=multi-task learning, secondary=transfer learning

Entity: researcher/mohamed_ahmadi
  affiliation: University of Melbourne
  publication_count: 96
  previous_employer: Meta AI Research (2020-2023)
  research_focus: primary=social computing, secondary=fairness in ML

Entity: researcher/vera_li
  affiliation: Northeastern University
  publication_count: 86
  previous_employer: Berkeley AI Research Lab (2016-2019)
  research_focus: primary=neural architecture search, secondary=efficient deep learning

Entity: researcher/gabriel_saha
  affiliation: Caltech
  publication_count: 62
  previous_employer: Google Research (2018-2021)
  research_focus: primary=multi-task learning, secondary=transfer learning

Entity: researcher/marco_hansen
  affiliation: Allen Institute for AI
  publication_count: 17
  previous_employer: Waymo Research (2020-2023)
  research_focus: primary=semantic parsing, secondary=structured prediction

Entity: researcher/pablo_ivanova
  affiliation: Princeton CS
  publication_count: 51
  previous_employer: Amazon AWS AI (2018-2021)
  research_focus: primary=social computing, secondary=fairness in ML

Entity: researcher/yang_vasquez
  affiliation: Carnegie Mellon University
  publication_count: 80
  previous_employer: Tesla AI (2019-2022)
  research_focus: primary=question answering, secondary=reading comprehension

Entity: researcher/aleksandra_durand
  affiliation: Tokyo University
  publication_count: 43
  previous_employer: Adobe Research (2017-2020)
  research_focus: primary=machine learning theory, secondary=generalization bounds

Entity: researcher/elias_wolf
  affiliation: ETH Zurich
  publication_count: 14
  previous_employer: Intel AI Lab (2016-2019)
  research_focus: primary=federated learning, secondary=privacy-preserving ML

Entity: researcher/victoria_vega
  affiliation: Northeastern University
  publication_count: 20
  previous_employer: Facebook AI Research (2017-2020)
  research_focus: primary=summarization, secondary=abstractive generation

Entity: researcher/mira_gonzalez
  affiliation: Columbia University
  publication_count: 71
  previous_employer: Citadel Securities Research (2017-2020)
  research_focus: primary=optimization theory, secondary=stochastic gradient methods

Entity: researcher/deepa_vogt
  affiliation: Boston University
  publication_count: 97
  previous_employer: IBM Research (2016-2019)
  research_focus: primary=code generation, secondary=program synthesis

Entity: researcher/julian_patel
  affiliation: McGill University
  publication_count: 70
  previous_employer: ByteDance AI Lab (2020-2023)
  research_focus: primary=neural architecture search, secondary=efficient deep learning

Entity: researcher/emma_kapoor
  affiliation: University of Toronto
  publication_count: 47
  previous_employer: Google Brain (2016-2019)
  research_focus: primary=continual learning, secondary=catastrophic forgetting

Entity: researcher/mohamed_kaur
  affiliation: University of Zurich
  publication_count: 32
  previous_employer: Google Research (2018-2021)
  research_focus: primary=federated learning, secondary=privacy-preserving ML

Entity: researcher/sophia_castellanos
  affiliation: UT Austin
  publication_count: 12
  previous_employer: Google DeepMind (2020-2023)
  research_focus: primary=medical imaging, secondary=clinical decision support

Entity: researcher/angela_tang
  affiliation: University of Michigan
  publication_count: 39
  previous_employer: Intel AI Lab (2016-2019)
  research_focus: primary=computational biology, secondary=protein structure prediction

Entity: researcher/mihail_ferrari
  affiliation: Purdue University
  publication_count: 77
  previous_employer: Two Sigma Research (2019-2022)
  research_focus: primary=summarization, secondary=abstractive generation

Entity: researcher/elizabeth_sharma
  affiliation: Hebrew University
  publication_count: 28
  previous_employer: OpenAI (2018-2021)
  research_focus: primary=speech recognition, secondary=spoken dialog systems

Entity: researcher/robin_russo
  affiliation: Seoul National University
  publication_count: 58
  previous_employer: Tencent AI Lab (2019-2022)
  research_focus: primary=information retrieval, secondary=dense retrieval

Entity: researcher/tara_brown
  affiliation: University of Melbourne
  publication_count: 87
  previous_employer: OpenAI (2018-2021)
  research_focus: primary=machine learning theory, secondary=generalization bounds

Entity: researcher/julien_nielsen
  affiliation: Oxford University
  publication_count: 35
  previous_employer: IBM Research (2016-2019)
  research_focus: primary=interpretable ML, secondary=model explanation

Entity: researcher/mia_santos
  affiliation: NYU Courant Institute
  publication_count: 58
  previous_employer: NVIDIA Research (2017-2020)
  research_focus: primary=self-supervised learning, secondary=contrastive methods

Entity: researcher/lina_kowalski
  affiliation: University of Toronto
  publication_count: 60
  previous_employer: Philips Research (2018-2021)
  research_focus: primary=speech recognition, secondary=spoken dialog systems

Entity: researcher/amelia_vogt
  affiliation: Carnegie Mellon University
  publication_count: 15
  previous_employer: Adobe Research (2017-2020)
  research_focus: primary=Bayesian deep learning, secondary=uncertainty quantification

Entity: researcher/kai_smith
  affiliation: Montreal Institute for Learning Algorithms
  publication_count: 31
  previous_employer: Huawei Noah Ark Lab (2018-2021)
  research_focus: primary=machine learning theory, secondary=generalization bounds

Entity: researcher/christian_petrov
  affiliation: Carnegie Mellon University
  publication_count: 53
  previous_employer: Salesforce Research (2018-2021)
  research_focus: primary=information retrieval, secondary=dense retrieval

Entity: researcher/francesca_romero
  affiliation: University of British Columbia
  publication_count: 97
  previous_employer: Philips Research (2018-2021)
  research_focus: primary=question answering, secondary=reading comprehension

Entity: researcher/charlotte_huang
  affiliation: EPFL
  publication_count: 31
  previous_employer: Microsoft Research (2017-2020)
  research_focus: primary=continual learning, secondary=catastrophic forgetting

Entity: researcher/tim_vogt
  affiliation: UC Berkeley
  publication_count: 44
  previous_employer: Microsoft Research (2017-2020)
  research_focus: primary=machine learning theory, secondary=generalization bounds

Entity: researcher/nina_silva
  affiliation: Allen Institute for AI
  publication_count: 71
  previous_employer: Amazon AWS AI (2018-2021)
  research_focus: primary=machine learning theory, secondary=generalization bounds

Entity: researcher/mario_costa
  affiliation: University of Washington
  publication_count: 12
  previous_employer: Citadel Securities Research (2017-2020)
  research_focus: primary=federated learning, secondary=privacy-preserving ML

Entity: researcher/sabrina_kim
  affiliation: Max Planck Institute for Informatics
  publication_count: 19
  previous_employer: Two Sigma Research (2019-2022)
  research_focus: primary=anomaly detection, secondary=time series analysis

Entity: researcher/nikita_zhao
  affiliation: MIT Computer Science
  publication_count: 83
  previous_employer: OpenAI Research (2019-2022)
  research_focus: primary=meta-learning, secondary=few-shot learning

Entity: researcher/robin_yilmaz
  affiliation: University of Helsinki
  publication_count: 70
  previous_employer: Tesla AI (2019-2022)
  research_focus: primary=multi-task learning, secondary=transfer learning

Entity: researcher/dario_moretti
  affiliation: University of Michigan
  publication_count: 37
  previous_employer: Huawei Noah Ark Lab (2018-2021)
  research_focus: primary=adversarial robustness, secondary=certified defenses

Entity: researcher/saanvi_mehta
  affiliation: University of Sydney
  publication_count: 44
  previous_employer: Microsoft Research (2015-2018)
  research_focus: primary=natural language processing, secondary=machine translation

Entity: researcher/liang_wiese
  affiliation: Oxford University
  publication_count: 13
  previous_employer: Siemens Research (2016-2019)
  research_focus: primary=computational biology, secondary=protein structure prediction

Entity: researcher/marina_lee
  affiliation: NYU Courant Institute
  publication_count: 48
  previous_employer: Microsoft Research (2015-2018)
  research_focus: primary=anomaly detection, secondary=time series analysis

Entity: researcher/jason_lutz
  affiliation: Caltech
  publication_count: 60
  previous_employer: Siemens Research (2016-2019)
  research_focus: primary=code generation, secondary=program synthesis

Entity: researcher/patrick_vasquez
  affiliation: Carnegie Mellon University
  publication_count: 89
  previous_employer: Philips Research (2018-2021)
  research_focus: primary=code generation, secondary=program synthesis

Entity: researcher/rosa_dobrescu
  affiliation: NYU Courant Institute
  publication_count: 37
  previous_employer: Meta AI Research (2020-2023)
  research_focus: primary=speech recognition, secondary=spoken dialog systems

Entity: researcher/tom_weber
  affiliation: Princeton CS
  publication_count: 38
  previous_employer: Uber AI Labs (2017-2020)
  research_focus: primary=neural symbolic integration, secondary=logic learning

Entity: researcher/david_nilsson
  affiliation: Cornell Tech
  publication_count: 91
  previous_employer: Salesforce Research (2018-2021)
  research_focus: primary=semantic parsing, secondary=structured prediction

Entity: researcher/luna_kumar
  affiliation: UC Berkeley
  publication_count: 15
  previous_employer: Alibaba DAMO Academy (2018-2021)
  research_focus: primary=self-supervised learning, secondary=contrastive methods

Entity: researcher/amara_abdullah
  affiliation: Peking University
  publication_count: 20
  previous_employer: Salesforce Research (2018-2021)
  research_focus: primary=Bayesian deep learning, secondary=uncertainty quantification

Entity: researcher/tobias_sanchez
  affiliation: KTH Royal Institute of Technology
  publication_count: 94
  previous_employer: Alibaba DAMO Academy (2018-2021)
  research_focus: primary=data augmentation, secondary=synthetic data generation

Entity: researcher/ahmad_durand
  affiliation: University of Toronto
  publication_count: 92
  previous_employer: Apple ML Research (2019-2022)
  research_focus: primary=social computing, secondary=fairness in ML

Entity: researcher/alina_park
  affiliation: University of Zurich
  publication_count: 74
  previous_employer: Apple ML Research (2019-2022)
  research_focus: primary=optimization theory, secondary=stochastic gradient methods

Entity: researcher/boris_blum
  affiliation: University of Amsterdam
  publication_count: 50
  previous_employer: Google DeepMind (2020-2023)
  research_focus: primary=autonomous driving, secondary=sensor fusion

Entity: researcher/david_kowalski
  affiliation: Chinese University of Hong Kong
  publication_count: 17
  previous_employer: Vector Institute (2018-2021)
  research_focus: primary=data augmentation, secondary=synthetic data generation

Entity: researcher/kai_ghosh
  affiliation: University of Michigan
  publication_count: 24
  previous_employer: NVIDIA Research (2017-2020)
  research_focus: primary=meta-learning, secondary=few-shot learning

Entity: researcher/alexander_hansen
  affiliation: Virginia Tech
  publication_count: 46
  previous_employer: Tencent AI Lab (2019-2022)
  research_focus: primary=anomaly detection, secondary=time series analysis

Entity: researcher/eva_giordano
  affiliation: University of British Columbia
  publication_count: 17
  previous_employer: Bosch Center for AI (2019-2022)
  research_focus: primary=reinforcement learning, secondary=robotics

Entity: researcher/lorenzo_kang
  affiliation: Georgia Tech
  publication_count: 62
  previous_employer: Vector Institute (2018-2021)
  research_focus: primary=code generation, secondary=program synthesis

Entity: researcher/zhao_kaur
  affiliation: UT Austin
  publication_count: 7
  previous_employer: IBM Research (2016-2019)
  research_focus: primary=multimodal learning, secondary=vision-language models

Entity: researcher/hugo_lopez
  affiliation: University of Toronto
  publication_count: 39
  previous_employer: Vector Institute (2018-2021)
  research_focus: primary=semantic parsing, secondary=structured prediction

Entity: researcher/julian_vidal
  affiliation: Peking University
  publication_count: 7
  previous_employer: Meta AI Research (2020-2023)
  research_focus: primary=multi-task learning, secondary=transfer learning

Entity: researcher/claudia_yang
  affiliation: Columbia University
  publication_count: 8
  previous_employer: OpenAI (2018-2021)
  research_focus: primary=neural symbolic integration, secondary=logic learning

Entity: researcher/lars_nkosi
  affiliation: Purdue University
  publication_count: 44
  previous_employer: Alibaba DAMO Academy (2018-2021)
  research_focus: primary=neural symbolic integration, secondary=logic learning

Entity: researcher/mario_eriksson
  affiliation: INRIA Paris
  publication_count: 77
  previous_employer: IBM Research (2016-2019)
  research_focus: primary=multi-task learning, secondary=transfer learning

Entity: researcher/amara_saha
  affiliation: Carnegie Mellon University
  publication_count: 70
  previous_employer: Siemens Research (2016-2019)
  research_focus: primary=interpretable ML, secondary=model explanation

Entity: researcher/jana_russo
  affiliation: University of Toronto
  publication_count: 89
  previous_employer: Berkeley AI Research Lab (2016-2019)
  research_focus: primary=dialogue systems, secondary=conversational AI

Entity: researcher/rosa_fedorov
  affiliation: Purdue University
  publication_count: 42
  previous_employer: Oracle AI Research (2018-2021)
  research_focus: primary=code generation, secondary=program synthesis

Entity: researcher/ryan_richter
  affiliation: Tsinghua University
  publication_count: 55
  previous_employer: Uber AI Labs (2017-2020)
  research_focus: primary=data augmentation, secondary=synthetic data generation

Entity: researcher/boris_ibrahim
  affiliation: Hebrew University
  publication_count: 89
  previous_employer: Bosch Center for AI (2019-2022)
  research_focus: primary=out-of-distribution generalization, secondary=domain adaptation

Entity: researcher/paula_wolf
  affiliation: University of Amsterdam
  publication_count: 55
  previous_employer: Philips Research (2018-2021)
  research_focus: primary=natural language processing, secondary=machine translation

Entity: researcher/giulia_maier
  affiliation: Cornell Tech
  publication_count: 59
  previous_employer: Jane Street Research (2018-2021)
  research_focus: primary=neural symbolic integration, secondary=logic learning

Entity: researcher/robert_nakamura
  affiliation: University of Sydney
  publication_count: 60
  previous_employer: ByteDance AI Lab (2020-2023)
  research_focus: primary=computational biology, secondary=protein structure prediction

Entity: researcher/mario_sharma
  affiliation: Virginia Tech
  publication_count: 25
  previous_employer: OpenAI Research (2019-2022)
  research_focus: primary=AI safety, secondary=value alignment

Entity: researcher/mark_nguyen
  affiliation: ETH Zurich
  publication_count: 34
  previous_employer: Waymo Research (2020-2023)
  research_focus: primary=recommendation systems, secondary=collaborative filtering

Entity: researcher/daniel_fuentes
  affiliation: Stanford University
  publication_count: 9
  previous_employer: Adobe Research (2017-2020)
  research_focus: primary=summarization, secondary=abstractive generation

Entity: researcher/patrick_choi
  affiliation: University of Sydney
  publication_count: 57
  previous_employer: Two Sigma Research (2019-2022)
  research_focus: primary=interpretable ML, secondary=model explanation

Entity: researcher/stephanie_pham
  affiliation: Vector Institute
  publication_count: 55
  previous_employer: Adobe Research (2017-2020)
  research_focus: primary=causal inference, secondary=counterfactual reasoning

Entity: researcher/robert_acharya
  affiliation: Boston University
  publication_count: 17
  previous_employer: Alibaba DAMO Academy (2018-2021)
  research_focus: primary=recommendation systems, secondary=collaborative filtering

Entity: researcher/claudia_tran
  affiliation: University of Sydney
  publication_count: 10
  previous_employer: Philips Research (2018-2021)
  research_focus: primary=anomaly detection, secondary=time series analysis

Entity: researcher/bianca_schmid
  affiliation: NYU Courant Institute
  publication_count: 63
  previous_employer: Cisco Research (2017-2020)
  research_focus: primary=data augmentation, secondary=synthetic data generation

Entity: researcher/olivia_muller
  affiliation: Boston University
  publication_count: 60
  previous_employer: Oracle AI Research (2018-2021)
  research_focus: primary=optimization theory, secondary=stochastic gradient methods

Entity: researcher/mira_santos
  affiliation: Caltech
  publication_count: 64
  previous_employer: ByteDance AI Lab (2020-2023)
  research_focus: primary=multi-task learning, secondary=transfer learning

Entity: researcher/vera_kowalski
  affiliation: National University of Singapore
  publication_count: 39
  previous_employer: Cisco Research (2017-2020)
  research_focus: primary=question answering, secondary=reading comprehension

Entity: researcher/piotr_klein
  affiliation: University of Edinburgh
  publication_count: 60
  previous_employer: Microsoft Research (2015-2018)
  research_focus: primary=AI safety, secondary=value alignment

Entity: researcher/elena_lim
  affiliation: Peking University
  publication_count: 44
  previous_employer: Siemens Research (2016-2019)
  research_focus: primary=graph neural networks, secondary=knowledge graphs

Entity: researcher/caroline_garcia
  affiliation: UT Austin
  publication_count: 53
  previous_employer: Apple ML Research (2019-2022)
  research_focus: primary=computational biology, secondary=protein structure prediction

Entity: researcher/andrew_rodriguez
  affiliation: Hebrew University
  publication_count: 46
  previous_employer: Siemens Research (2016-2019)
  research_focus: primary=information retrieval, secondary=dense retrieval

Entity: researcher/karin_castellanos
  affiliation: Cornell Tech
  publication_count: 57
  previous_employer: Bosch Center for AI (2019-2022)
  research_focus: primary=continual learning, secondary=catastrophic forgetting

Entity: researcher/shreya_andersen
  affiliation: Boston University
  publication_count: 77
  previous_employer: Bosch Center for AI (2019-2022)
  research_focus: primary=summarization, secondary=abstractive generation

Entity: researcher/aditya_oh
  affiliation: University of Amsterdam
  publication_count: 53
  previous_employer: Tencent AI Lab (2019-2022)
  research_focus: primary=social computing, secondary=fairness in ML

Entity: researcher/valentina_wagner
  affiliation: Leiden University
  publication_count: 32
  previous_employer: Intel AI Lab (2016-2019)
  research_focus: primary=recommendation systems, secondary=collaborative filtering

Entity: researcher/fatimah_saha
  affiliation: Vector Institute
  publication_count: 7
  previous_employer: Bosch Center for AI (2019-2022)
  research_focus: primary=medical imaging, secondary=clinical decision support

Entity: researcher/saanvi_reyes
  affiliation: Purdue University
  publication_count: 25
  previous_employer: Snap Research (2018-2021)
  research_focus: primary=adversarial robustness, secondary=certified defenses

Entity: researcher/petra_vega
  affiliation: Stanford University
  publication_count: 54
  previous_employer: Jane Street Research (2018-2021)
  research_focus: primary=active learning, secondary=experimental design

Entity: researcher/rosa_anand
  affiliation: ETH Zurich
  publication_count: 86
  previous_employer: Alibaba DAMO Academy (2018-2021)
  research_focus: primary=adversarial robustness, secondary=certified defenses

Entity: researcher/lina_hernandez
  affiliation: UC Berkeley
  publication_count: 37
  previous_employer: Bosch Center for AI (2019-2022)
  research_focus: primary=dialogue systems, secondary=conversational AI

Entity: researcher/deepa_schmid
  affiliation: Tsinghua University
  publication_count: 47
  previous_employer: Bosch Center for AI (2019-2022)
  research_focus: primary=self-supervised learning, secondary=contrastive methods

Entity: researcher/vera_romano
  affiliation: Columbia University
  publication_count: 14
  previous_employer: Qualcomm AI Research (2017-2020)
  research_focus: primary=computer vision, secondary=object detection

Entity: researcher/valentina_vogt
  affiliation: UC Berkeley
  publication_count: 48
  previous_employer: Samsung AI Center (2019-2022)
  research_focus: primary=federated learning, secondary=privacy-preserving ML

Entity: researcher/yang_blum
  affiliation: Boston University
  publication_count: 7
  previous_employer: Adobe Research (2017-2020)
  research_focus: primary=interpretable ML, secondary=model explanation

Entity: researcher/alessandro_ghosh
  affiliation: University of Michigan
  publication_count: 20
  previous_employer: Qualcomm AI Research (2017-2020)
  research_focus: primary=neural architecture search, secondary=efficient deep learning

Entity: researcher/nathan_jung
  affiliation: University of Sydney
  publication_count: 93
  previous_employer: Salesforce Research (2018-2021)
  research_focus: primary=3D scene understanding, secondary=point cloud processing

Entity: researcher/christian_zuberi
  affiliation: Leiden University
  publication_count: 95
  previous_employer: Meta AI Research (2020-2023)
  research_focus: primary=Bayesian deep learning, secondary=uncertainty quantification

Entity: researcher/hannah_dubois
  affiliation: University of Zurich
  publication_count: 7
  previous_employer: Waymo Research (2020-2023)
  research_focus: primary=active learning, secondary=experimental design

Entity: researcher/sandra_pereira
  affiliation: Max Planck Institute for Informatics
  publication_count: 95
  previous_employer: IBM Research (2016-2019)
  research_focus: primary=federated learning, secondary=privacy-preserving ML

Entity: researcher/nour_koch
  affiliation: Oxford University
  publication_count: 93
  previous_employer: Waymo Research (2020-2023)
  research_focus: primary=neural symbolic integration, secondary=logic learning

Entity: researcher/benjamin_wiese
  affiliation: MIT Computer Science
  publication_count: 48
  previous_employer: Siemens Research (2016-2019)
  research_focus: primary=optimization theory, secondary=stochastic gradient methods

Entity: researcher/rosa_park
  affiliation: University of Toronto
  publication_count: 68
  previous_employer: Berkeley AI Research Lab (2016-2019)
  research_focus: primary=natural language processing, secondary=machine translation

Entity: researcher/katarzyna_solis
  affiliation: Oxford University
  publication_count: 59
  previous_employer: Toyota Research Institute (2017-2020)
  research_focus: primary=information retrieval, secondary=dense retrieval

Entity: researcher/sophia_ghosh
  affiliation: Technion
  publication_count: 26
  previous_employer: Cisco Research (2017-2020)
  research_focus: primary=self-supervised learning, secondary=contrastive methods

Entity: researcher/paula_vidal
  affiliation: Northeastern University
  publication_count: 65
  previous_employer: Snap Research (2018-2021)
  research_focus: primary=optimization theory, secondary=stochastic gradient methods

Entity: researcher/thomas_zhang
  affiliation: University of Edinburgh
  publication_count: 45
  previous_employer: Adobe Research (2017-2020)
  research_focus: primary=graph neural networks, secondary=knowledge graphs

Entity: researcher/filip_sato
  affiliation: University of Michigan
  publication_count: 63
  previous_employer: Two Sigma Research (2019-2022)
  research_focus: primary=video understanding, secondary=temporal modeling

Entity: researcher/ilaria_bauer
  affiliation: Vector Institute
  publication_count: 45
  previous_employer: NVIDIA Research (2017-2020)
  research_focus: primary=question answering, secondary=reading comprehension

Entity: researcher/deepa_oh
  affiliation: Columbia University
  publication_count: 47
  previous_employer: Twitter Machine Learning (2019-2022)
  research_focus: primary=neural symbolic integration, secondary=logic learning

Entity: researcher/simon_liu
  affiliation: KTH Royal Institute of Technology
  publication_count: 5
  previous_employer: Cisco Research (2017-2020)
  research_focus: primary=interpretable ML, secondary=model explanation

Entity: researcher/antoine_klein
  affiliation: Purdue University
  publication_count: 56
  previous_employer: Intel AI Lab (2016-2019)
  research_focus: primary=data augmentation, secondary=synthetic data generation

Entity: researcher/victoria_klein
  affiliation: University of British Columbia
  publication_count: 64
  previous_employer: Intel AI Lab (2016-2019)
  research_focus: primary=geometric deep learning, secondary=equivariant networks

Entity: researcher/zara_almeida
  affiliation: ETH Zurich
  publication_count: 41
  previous_employer: Samsung AI Center (2019-2022)
  research_focus: primary=multimodal learning, secondary=vision-language models

Entity: researcher/sebastian_koch
  affiliation: University of Amsterdam
  publication_count: 88
  previous_employer: Jane Street Research (2018-2021)
  research_focus: primary=3D scene understanding, secondary=point cloud processing

Entity: researcher/lucas_weber
  affiliation: Sapienza University of Rome
  publication_count: 48
  previous_employer: Alibaba DAMO Academy (2018-2021)
  research_focus: primary=data augmentation, secondary=synthetic data generation

Entity: researcher/hugo_oh
  affiliation: University of British Columbia
  publication_count: 62
  previous_employer: Twitter Machine Learning (2019-2022)
  research_focus: primary=code generation, secondary=program synthesis

Entity: researcher/emre_khan
  affiliation: Cambridge University
  publication_count: 96
  previous_employer: IBM Research (2016-2019)
  research_focus: primary=dialogue systems, secondary=conversational AI

Entity: researcher/benjamin_vidal
  affiliation: Boston University
  publication_count: 92
  previous_employer: NVIDIA Research (2017-2020)
  research_focus: primary=interpretable ML, secondary=model explanation

Entity: researcher/delia_singh
  affiliation: University of Edinburgh
  publication_count: 96
  previous_employer: Jane Street Research (2018-2021)
  research_focus: primary=commonsense reasoning, secondary=knowledge grounding

Entity: researcher/olivia_lutz
  affiliation: Oxford University
  publication_count: 28
  previous_employer: Uber AI Labs (2017-2020)
  research_focus: primary=recommendation systems, secondary=collaborative filtering

Entity: researcher/james_hansen
  affiliation: University of Amsterdam
  publication_count: 5
  previous_employer: Siemens Research (2016-2019)
  research_focus: primary=adversarial robustness, secondary=certified defenses

Entity: researcher/felix_bonnet
  affiliation: UC Berkeley
  publication_count: 74
  previous_employer: Uber AI Labs (2017-2020)
  research_focus: primary=adversarial robustness, secondary=certified defenses

Entity: researcher/rahul_solis
  affiliation: Oxford University
  publication_count: 5
  previous_employer: Two Sigma Research (2019-2022)
  research_focus: primary=AI safety, secondary=value alignment

Entity: researcher/lorenzo_silva
  affiliation: McGill University
  publication_count: 47
  previous_employer: NVIDIA Research (2017-2020)
  research_focus: primary=machine learning theory, secondary=generalization bounds

Entity: researcher/emre_silva
  affiliation: Cambridge University
  publication_count: 12
  previous_employer: Huawei Noah Ark Lab (2018-2021)
  research_focus: primary=question answering, secondary=reading comprehension

Entity: researcher/angela_wu
  affiliation: National University of Singapore
  publication_count: 91
  previous_employer: Microsoft Research (2017-2020)
  research_focus: primary=causal inference, secondary=counterfactual reasoning

Entity: researcher/celine_wiese
  affiliation: University of Amsterdam
  publication_count: 14
  previous_employer: Adobe Research (2017-2020)
  research_focus: primary=neural architecture search, secondary=efficient deep learning

Entity: researcher/natalia_rodriguez
  affiliation: Leiden University
  publication_count: 80
  previous_employer: Samsung AI Center (2019-2022)
  research_focus: primary=commonsense reasoning, secondary=knowledge grounding

Entity: researcher/jessica_sato
  affiliation: McGill University
  publication_count: 42
  previous_employer: Jane Street Research (2018-2021)
  research_focus: primary=optimization theory, secondary=stochastic gradient methods

Entity: researcher/grace_wolf
  affiliation: University of Copenhagen
  publication_count: 11
  previous_employer: OpenAI (2018-2021)
  research_focus: primary=computational biology, secondary=protein structure prediction

Entity: researcher/piotr_johansson
  affiliation: Columbia University
  publication_count: 88
  previous_employer: OpenAI Research (2019-2022)
  research_focus: primary=Bayesian deep learning, secondary=uncertainty quantification

Entity: researcher/elias_gupta
  affiliation: KTH Royal Institute of Technology
  publication_count: 13
  previous_employer: Amazon AWS AI (2018-2021)
  research_focus: primary=natural language processing, secondary=machine translation

Entity: researcher/kai_sato
  affiliation: University of British Columbia
  publication_count: 80
  previous_employer: Qualcomm AI Research (2017-2020)
  research_focus: primary=AI safety, secondary=value alignment

Entity: researcher/alicia_khan
  affiliation: EPFL
  publication_count: 94
  previous_employer: Uber AI Labs (2017-2020)
  research_focus: primary=information retrieval, secondary=dense retrieval

Entity: researcher/angela_khan
  affiliation: Columbia University
  publication_count: 84
  previous_employer: Jane Street Research (2018-2021)
  research_focus: primary=interpretable ML, secondary=model explanation

Entity: researcher/kate_eriksson
  affiliation: TU Berlin
  publication_count: 32
  previous_employer: Apple ML Research (2019-2022)
  research_focus: primary=self-supervised learning, secondary=contrastive methods

Entity: researcher/cassandra_choi
  affiliation: UC Berkeley
  publication_count: 25
  previous_employer: Waymo Research (2020-2023)
  research_focus: primary=neural symbolic integration, secondary=logic learning

Entity: researcher/valentina_wolf
  affiliation: EPFL
  publication_count: 60
  previous_employer: Meta AI Research (2020-2023)
  research_focus: primary=information retrieval, secondary=dense retrieval

Entity: researcher/sarah_meyer
  affiliation: University of British Columbia
  publication_count: 55
  previous_employer: Twitter Machine Learning (2019-2022)
  research_focus: primary=semantic parsing, secondary=structured prediction

Entity: researcher/mihail_sorensen
  affiliation: McGill University
  publication_count: 14
  previous_employer: Citadel Securities Research (2017-2020)
  research_focus: primary=reinforcement learning, secondary=robotics

Entity: researcher/kristina_nakamura
  affiliation: Leiden University
  publication_count: 36
  previous_employer: Google Brain (2016-2019)
  research_focus: primary=graph neural networks, secondary=knowledge graphs

Entity: researcher/dimitri_wu
  affiliation: University of Zurich
  publication_count: 6
  previous_employer: Twitter Machine Learning (2019-2022)
  research_focus: primary=active learning, secondary=experimental design

Entity: researcher/amanda_gupta
  affiliation: Montreal Institute for Learning Algorithms
  publication_count: 70
  previous_employer: ByteDance AI Lab (2020-2023)
  research_focus: primary=self-supervised learning, secondary=contrastive methods

Entity: researcher/colin_yilmaz
  affiliation: Technion
  publication_count: 85
  previous_employer: Intel AI Lab (2016-2019)
  research_focus: primary=graph neural networks, secondary=knowledge graphs

Entity: researcher/lorenzo_novak
  affiliation: Hebrew University
  publication_count: 46
  previous_employer: Tesla AI (2019-2022)
  research_focus: primary=speech recognition, secondary=spoken dialog systems

Entity: researcher/chiara_ndiaye
  affiliation: Hebrew University
  publication_count: 92
  previous_employer: Intel AI Lab (2016-2019)
  research_focus: primary=AI safety, secondary=value alignment

Entity: researcher/rosa_rashid
  affiliation: Boston University
  publication_count: 74
  previous_employer: Google DeepMind (2020-2023)
  research_focus: primary=information retrieval, secondary=dense retrieval

Entity: researcher/arjun_moretti
  affiliation: Columbia University
  publication_count: 45
  previous_employer: Meta AI Research (2020-2023)
  research_focus: primary=multimodal learning, secondary=vision-language models

Entity: researcher/mark_abdullah
  affiliation: Chinese University of Hong Kong
  publication_count: 73
  previous_employer: Snap Research (2018-2021)
  research_focus: primary=meta-learning, secondary=few-shot learning

Entity: researcher/anders_huang
  affiliation: Sapienza University of Rome
  publication_count: 50
  previous_employer: Intel AI Lab (2016-2019)
  research_focus: primary=geometric deep learning, secondary=equivariant networks

Entity: researcher/victoria_brown
  affiliation: Cornell Tech
  publication_count: 38
  previous_employer: Philips Research (2018-2021)
  research_focus: primary=adversarial robustness, secondary=certified defenses

Entity: researcher/francesca_saito
  affiliation: University of British Columbia
  publication_count: 66
  previous_employer: Meta AI Research (2020-2023)
  research_focus: primary=computer vision, secondary=object detection

Entity: researcher/rachel_zuberi
  affiliation: University of Michigan
  publication_count: 94
  previous_employer: Amazon AWS AI (2018-2021)
  research_focus: primary=code generation, secondary=program synthesis

Entity: researcher/mohamed_albers
  affiliation: KTH Royal Institute of Technology
  publication_count: 56
  previous_employer: OpenAI Research (2019-2022)
  research_focus: primary=recommendation systems, secondary=collaborative filtering

Entity: researcher/beatriz_schneider
  affiliation: Cambridge University
  publication_count: 86
  previous_employer: Apple ML Research (2019-2022)
  research_focus: primary=question answering, secondary=reading comprehension

Entity: researcher/stephanie_malik
  affiliation: Allen Institute for AI
  publication_count: 94
  previous_employer: Twitter Machine Learning (2019-2022)
  research_focus: primary=meta-learning, secondary=few-shot learning

Entity: researcher/luis_sekar
  affiliation: University of Michigan
  publication_count: 62
  previous_employer: Philips Research (2018-2021)
  research_focus: primary=causal inference, secondary=counterfactual reasoning

Entity: researcher/jonathan_huang
  affiliation: Leiden University
  publication_count: 69
  previous_employer: Facebook AI Research (2017-2020)
  research_focus: primary=federated learning, secondary=privacy-preserving ML

Entity: researcher/felix_rodriguez
  affiliation: Peking University
  publication_count: 68
  previous_employer: Twitter Machine Learning (2019-2022)
  research_focus: primary=natural language processing, secondary=machine translation

Entity: researcher/finn_mehta
  affiliation: University of Zurich
  publication_count: 78
  previous_employer: Intel AI Lab (2016-2019)
  research_focus: primary=causal inference, secondary=counterfactual reasoning

Entity: researcher/lena_vidal
  affiliation: Montreal Institute for Learning Algorithms
  publication_count: 48
  previous_employer: Berkeley AI Research Lab (2016-2019)
  research_focus: primary=data augmentation, secondary=synthetic data generation

Entity: researcher/wei_wagner
  affiliation: INRIA Paris
  publication_count: 62
  previous_employer: Tesla AI (2019-2022)
  research_focus: primary=interpretable ML, secondary=model explanation

Entity: researcher/shreya_klein
  affiliation: University of Helsinki
  publication_count: 53
  previous_employer: Samsung AI Center (2019-2022)
  research_focus: primary=meta-learning, secondary=few-shot learning

Entity: researcher/amara_muller
  affiliation: Virginia Tech
  publication_count: 64
  previous_employer: Bosch Center for AI (2019-2022)
  research_focus: primary=video understanding, secondary=temporal modeling

Entity: researcher/rosa_garcia
  affiliation: Vector Institute
  publication_count: 8
  previous_employer: Facebook AI Research (2017-2020)
  research_focus: primary=semantic parsing, secondary=structured prediction

Entity: researcher/nour_ndiaye
  affiliation: Oxford University
  publication_count: 60
  previous_employer: OpenAI (2018-2021)
  research_focus: primary=commonsense reasoning, secondary=knowledge grounding

Entity: researcher/leonardo_albers
  affiliation: Purdue University
  publication_count: 22
  previous_employer: Tencent AI Lab (2019-2022)
  research_focus: primary=causal inference, secondary=counterfactual reasoning

Entity: researcher/anisha_sekar
  affiliation: Columbia University
  publication_count: 47
  previous_employer: Huawei Noah Ark Lab (2018-2021)
  research_focus: primary=graph neural networks, secondary=knowledge graphs

Entity: researcher/hugo_vega
  affiliation: INRIA Paris
  publication_count: 44
  previous_employer: Intel AI Lab (2016-2019)
  research_focus: primary=social computing, secondary=fairness in ML

Entity: researcher/alina_cheng
  affiliation: University of Michigan
  publication_count: 84
  previous_employer: Uber AI Labs (2017-2020)
  research_focus: primary=recommendation systems, secondary=collaborative filtering

Entity: researcher/valentina_demir
  affiliation: Technion
  publication_count: 16
  previous_employer: OpenAI (2018-2021)
  research_focus: primary=geometric deep learning, secondary=equivariant networks

Entity: researcher/christian_mehta
  affiliation: Stanford University
  publication_count: 9
  previous_employer: Tesla AI (2019-2022)
  research_focus: primary=machine learning theory, secondary=generalization bounds

Entity: researcher/alice_chen
  affiliation: MIT Computer Science
  publication_count: 47
  previous_employer: OpenAI (2018-2021)
  research_focus: primary=natural language processing, secondary=program synthesis

Entity: researcher/gabriel_oliveira
  affiliation: Tokyo University
  publication_count: 59
  previous_employer: Apple ML Research (2019-2022)
  research_focus: primary=anomaly detection, secondary=time series analysis

Entity: researcher/matias_ritter
  affiliation: University of Helsinki
  publication_count: 91
  previous_employer: NVIDIA Research (2017-2020)
  research_focus: primary=Bayesian deep learning, secondary=uncertainty quantification

Entity: researcher/clara_costa
  affiliation: University of Copenhagen
  publication_count: 52
  previous_employer: Adobe Research (2017-2020)
  research_focus: primary=question answering, secondary=reading comprehension

Entity: researcher/nina_fontaine
  affiliation: UT Austin
  publication_count: 63
  previous_employer: Salesforce Research (2018-2021)
  research_focus: primary=information retrieval, secondary=dense retrieval

Entity: researcher/erica_ahmadi
  affiliation: University of Sydney
  publication_count: 40
  previous_employer: Siemens Research (2016-2019)
  research_focus: primary=Bayesian deep learning, secondary=uncertainty quantification

Entity: researcher/angela_sanchez
  affiliation: Seoul National University
  publication_count: 79
  previous_employer: Waymo Research (2020-2023)
  research_focus: primary=optimization theory, secondary=stochastic gradient methods

Entity: researcher/sarah_kumar
  affiliation: University of Sydney
  publication_count: 42
  previous_employer: IBM Research (2016-2019)
  research_focus: primary=video understanding, secondary=temporal modeling

Entity: researcher/luis_dubois
  affiliation: University of Michigan
  publication_count: 52
  previous_employer: Two Sigma Research (2019-2022)
  research_focus: primary=autonomous driving, secondary=sensor fusion

Entity: researcher/nicolas_martinez
  affiliation: University of British Columbia
  publication_count: 41
  previous_employer: Google Brain (2016-2019)
  research_focus: primary=multimodal learning, secondary=vision-language models

Entity: researcher/felix_ahmadi
  affiliation: University of Helsinki
  publication_count: 91
  previous_employer: Microsoft Research (2017-2020)
  research_focus: primary=neural symbolic integration, secondary=logic learning

Entity: researcher/tom_stark
  affiliation: EPFL
  publication_count: 33
  previous_employer: Citadel Securities Research (2017-2020)
  research_focus: primary=autonomous driving, secondary=sensor fusion

Entity: researcher/diego_huang
  affiliation: University of Copenhagen
  publication_count: 36
  previous_employer: Facebook AI Research (2017-2020)
  research_focus: primary=speech recognition, secondary=spoken dialog systems

Entity: researcher/piotr_blum
  affiliation: University of Amsterdam
  publication_count: 60
  previous_employer: Google DeepMind (2020-2023)
  research_focus: primary=continual learning, secondary=catastrophic forgetting

Entity: researcher/jana_ferrari
  affiliation: ETH Zurich
  publication_count: 41
  previous_employer: Tesla AI (2019-2022)
  research_focus: primary=meta-learning, secondary=few-shot learning

Entity: researcher/clara_jain
  affiliation: NYU Courant Institute
  publication_count: 73
  previous_employer: Toyota Research Institute (2017-2020)
  research_focus: primary=commonsense reasoning, secondary=knowledge grounding

Entity: researcher/marco_lim
  affiliation: Caltech
  publication_count: 36
  previous_employer: Qualcomm AI Research (2017-2020)
  research_focus: primary=AI safety, secondary=value alignment

Entity: researcher/valentina_nielsen
  affiliation: Cambridge University
  publication_count: 63
  previous_employer: Microsoft Research (2015-2018)
  research_focus: primary=causal inference, secondary=counterfactual reasoning

Entity: researcher/victor_kapoor
  affiliation: University of Melbourne
  publication_count: 96
  previous_employer: Huawei Noah Ark Lab (2018-2021)
  research_focus: primary=data augmentation, secondary=synthetic data generation

Entity: researcher/jana_demir
  affiliation: Max Planck Institute for Informatics
  publication_count: 5
  previous_employer: Salesforce Research (2018-2021)
  research_focus: primary=social computing, secondary=fairness in ML

Entity: researcher/jason_lee
  affiliation: University of Zurich
  publication_count: 52
  previous_employer: Toyota Research Institute (2017-2020)
  research_focus: primary=speech recognition, secondary=spoken dialog systems

Entity: researcher/sabrina_khan
  affiliation: Montreal Institute for Learning Algorithms
  publication_count: 7
  previous_employer: Philips Research (2018-2021)
  research_focus: primary=dialogue systems, secondary=conversational AI

Entity: researcher/patrick_kang
  affiliation: Hong Kong University of Science and Technology
  publication_count: 12
  previous_employer: Snap Research (2018-2021)
  research_focus: primary=code generation, secondary=program synthesis

Entity: researcher/ricardo_richter
  affiliation: Cambridge University
  publication_count: 21
  previous_employer: Google DeepMind (2020-2023)
  research_focus: primary=reinforcement learning, secondary=robotics

Entity: researcher/giulia_sorensen
  affiliation: Cambridge University
  publication_count: 16
  previous_employer: Adobe Research (2017-2020)
  research_focus: primary=social computing, secondary=fairness in ML

Entity: researcher/carlos_popescu
  affiliation: University of Sydney
  publication_count: 51
  previous_employer: Siemens Research (2016-2019)
  research_focus: primary=meta-learning, secondary=few-shot learning

Entity: researcher/noah_ghosh
  affiliation: Hebrew University
  publication_count: 87
  previous_employer: OpenAI (2018-2021)
  research_focus: primary=question answering, secondary=reading comprehension

Entity: researcher/paula_richter
  affiliation: University of Edinburgh
  publication_count: 8
  previous_employer: Toyota Research Institute (2017-2020)
  research_focus: primary=computational biology, secondary=protein structure prediction

Entity: researcher/lauren_sanchez
  affiliation: University of Michigan
  publication_count: 50
  previous_employer: OpenAI (2018-2021)
  research_focus: primary=3D scene understanding, secondary=point cloud processing

Entity: researcher/milan_oliveira
  affiliation: UC Berkeley
  publication_count: 54
  previous_employer: Twitter Machine Learning (2019-2022)
  research_focus: primary=interpretable ML, secondary=model explanation

Entity: researcher/arnav_johansson
  affiliation: Hong Kong University of Science and Technology
  publication_count: 85
  previous_employer: Citadel Securities Research (2017-2020)
  research_focus: primary=computer vision, secondary=object detection

Entity: researcher/amelia_nguyen
  affiliation: University of Michigan
  publication_count: 20
  previous_employer: Two Sigma Research (2019-2022)
  research_focus: primary=computational biology, secondary=protein structure prediction

Entity: researcher/andrzej_weber
  affiliation: Cornell Tech
  publication_count: 79
  previous_employer: Baidu Research (2018-2021)
  research_focus: primary=recommendation systems, secondary=collaborative filtering

Entity: researcher/hugo_fuentes
  affiliation: Leiden University
  publication_count: 4
  previous_employer: Twitter Machine Learning (2019-2022)
  research_focus: primary=causal inference, secondary=counterfactual reasoning

Entity: researcher/brandon_vogt
  affiliation: Columbia University
  publication_count: 26
  previous_employer: Meta AI Research (2020-2023)
  research_focus: primary=computer vision, secondary=object detection

Entity: researcher/brandon_albers
  affiliation: Seoul National University
  publication_count: 34
  previous_employer: Jane Street Research (2018-2021)
  research_focus: primary=dialogue systems, secondary=conversational AI

Entity: researcher/aleksandra_gupta
  affiliation: Columbia University
  publication_count: 10
  previous_employer: Facebook AI Research (2017-2020)
  research_focus: primary=meta-learning, secondary=few-shot learning

Entity: researcher/martin_eriksson
  affiliation: Virginia Tech
  publication_count: 12
  previous_employer: Qualcomm AI Research (2017-2020)
  research_focus: primary=geometric deep learning, secondary=equivariant networks

Entity: researcher/yang_osei
  affiliation: Allen Institute for AI
  publication_count: 79
  previous_employer: OpenAI (2018-2021)
  research_focus: primary=geometric deep learning, secondary=equivariant networks

Entity: researcher/marco_kang
  affiliation: University of Copenhagen
  publication_count: 9
  previous_employer: Cisco Research (2017-2020)
  research_focus: primary=code generation, secondary=program synthesis

Entity: researcher/liang_bauer
  affiliation: UC Berkeley
  publication_count: 65
  previous_employer: Huawei Noah Ark Lab (2018-2021)
  research_focus: primary=optimization theory, secondary=stochastic gradient methods

Entity: researcher/sara_dubois
  affiliation: Vector Institute
  publication_count: 95
  previous_employer: ByteDance AI Lab (2020-2023)
  research_focus: primary=federated learning, secondary=privacy-preserving ML

Entity: researcher/anna_nakamura
  affiliation: Leiden University
  publication_count: 22
  previous_employer: Microsoft Research (2015-2018)
  research_focus: primary=adversarial robustness, secondary=certified defenses

Entity: researcher/felix_yilmaz
  affiliation: KTH Royal Institute of Technology
  publication_count: 95
  previous_employer: Tesla AI (2019-2022)
  research_focus: primary=video understanding, secondary=temporal modeling

Entity: researcher/olivia_vasquez
  affiliation: EPFL
  publication_count: 62
  previous_employer: Oracle AI Research (2018-2021)
  research_focus: primary=neural symbolic integration, secondary=logic learning

Entity: researcher/kristina_diop
  affiliation: University of British Columbia
  publication_count: 18
  previous_employer: Philips Research (2018-2021)
  research_focus: primary=computational biology, secondary=protein structure prediction

Entity: researcher/kristina_sato
  affiliation: UT Austin
  publication_count: 56
  previous_employer: Berkeley AI Research Lab (2016-2019)
  research_focus: primary=information retrieval, secondary=dense retrieval

Entity: researcher/julian_rodriguez
  affiliation: Purdue University
  publication_count: 16
  previous_employer: Tesla AI (2019-2022)
  research_focus: primary=optimization theory, secondary=stochastic gradient methods

Entity: researcher/hao_larsson
  affiliation: Tokyo University
  publication_count: 23
  previous_employer: Qualcomm AI Research (2017-2020)
  research_focus: primary=federated learning, secondary=privacy-preserving ML

Entity: researcher/arnav_cruz
  affiliation: ETH Zurich
  publication_count: 59
  previous_employer: OpenAI (2018-2021)
  research_focus: primary=3D scene understanding, secondary=point cloud processing

Entity: researcher/brandon_weiss
  affiliation: UC Berkeley
  publication_count: 79
  previous_employer: Philips Research (2018-2021)
  research_focus: primary=data augmentation, secondary=synthetic data generation

Entity: researcher/hugo_fedorov
  affiliation: Hebrew University
  publication_count: 49
  previous_employer: Alibaba DAMO Academy (2018-2021)
  research_focus: primary=machine learning theory, secondary=generalization bounds

Entity: researcher/francesca_zhou
  affiliation: University of Amsterdam
  publication_count: 49
  previous_employer: OpenAI (2018-2021)
  research_focus: primary=active learning, secondary=experimental design

Entity: researcher/marina_johansson
  affiliation: Princeton CS
  publication_count: 88
  previous_employer: Qualcomm AI Research (2017-2020)
  research_focus: primary=recommendation systems, secondary=collaborative filtering

Entity: researcher/astrid_novak
  affiliation: KTH Royal Institute of Technology
  publication_count: 51
  previous_employer: Meta AI Research (2020-2023)
  research_focus: primary=self-supervised learning, secondary=contrastive methods

Entity: researcher/neha_kapoor
  affiliation: Technion
  publication_count: 75
  previous_employer: Philips Research (2018-2021)
  research_focus: primary=computer vision, secondary=object detection

Entity: researcher/pablo_li
  affiliation: Stanford University
  publication_count: 27
  previous_employer: Twitter Machine Learning (2019-2022)
  research_focus: primary=code generation, secondary=program synthesis

Entity: researcher/ilaria_novak
  affiliation: Carnegie Mellon University
  publication_count: 27
  previous_employer: Apple ML Research (2019-2022)
  research_focus: primary=active learning, secondary=experimental design

Entity: researcher/robin_rashid
  affiliation: University of Toronto
  publication_count: 22
  previous_employer: Google Brain (2016-2019)
  research_focus: primary=graph neural networks, secondary=knowledge graphs

Entity: researcher/valentina_vasquez
  affiliation: Cornell Tech
  publication_count: 52
  previous_employer: Tencent AI Lab (2019-2022)
  research_focus: primary=information retrieval, secondary=dense retrieval

Entity: researcher/ingrid_giordano
  affiliation: Tokyo University
  publication_count: 43
  previous_employer: Tesla AI (2019-2022)
  research_focus: primary=active learning, secondary=experimental design

Entity: researcher/olivia_cruz
  affiliation: UC Berkeley
  publication_count: 23
  previous_employer: Amazon AWS AI (2018-2021)
  research_focus: primary=machine learning theory, secondary=generalization bounds

Entity: researcher/sabrina_costa
  affiliation: University of Edinburgh
  publication_count: 60
  previous_employer: Alibaba DAMO Academy (2018-2021)
  research_focus: primary=question answering, secondary=reading comprehension

Entity: researcher/pablo_sanchez
  affiliation: Hebrew University
  publication_count: 38
  previous_employer: Baidu Research (2018-2021)
  research_focus: primary=semantic parsing, secondary=structured prediction

Entity: researcher/beatriz_nkosi
  affiliation: Technion
  publication_count: 18
  previous_employer: Uber AI Labs (2017-2020)
  research_focus: primary=continual learning, secondary=catastrophic forgetting

Entity: researcher/lukas_vasiliev
  affiliation: Chinese University of Hong Kong
  publication_count: 43
  previous_employer: Google DeepMind (2020-2023)
  research_focus: primary=recommendation systems, secondary=collaborative filtering

Entity: researcher/julia_zhou
  affiliation: UC Berkeley
  publication_count: 4
  previous_employer: Baidu Research (2018-2021)
  research_focus: primary=code generation, secondary=program synthesis

Entity: researcher/deepa_flores
  affiliation: Boston University
  publication_count: 36
  previous_employer: Uber AI Labs (2017-2020)
  research_focus: primary=dialogue systems, secondary=conversational AI

Entity: researcher/benjamin_acharya
  affiliation: Vector Institute
  publication_count: 59
  previous_employer: NVIDIA Research (2017-2020)
  research_focus: primary=adversarial robustness, secondary=certified defenses

Entity: researcher/jessica_vega
  affiliation: University of Illinois Urbana-Champaign
  publication_count: 33
  previous_employer: Oracle AI Research (2018-2021)
  research_focus: primary=data augmentation, secondary=synthetic data generation

Entity: researcher/saanvi_oh
  affiliation: University of Toronto
  publication_count: 54
  previous_employer: Google DeepMind (2020-2023)
  research_focus: primary=optimization theory, secondary=stochastic gradient methods

Entity: researcher/aleksandra_schmidt
  affiliation: University of Toronto
  publication_count: 44
  previous_employer: Two Sigma Research (2019-2022)
  research_focus: primary=optimization theory, secondary=stochastic gradient methods

Entity: researcher/neha_reyes
  affiliation: University of Illinois Urbana-Champaign
  publication_count: 85
  previous_employer: Tencent AI Lab (2019-2022)
  research_focus: primary=AI safety, secondary=value alignment

Entity: researcher/beatriz_reyes
  affiliation: Stanford University
  publication_count: 45
  previous_employer: Amazon AWS AI (2018-2021)
  research_focus: primary=information retrieval, secondary=dense retrieval

Entity: researcher/sarah_osei
  affiliation: ETH Zurich
  publication_count: 59
  previous_employer: OpenAI (2018-2021)
  research_focus: primary=anomaly detection, secondary=time series analysis

Entity: researcher/lars_yoshida
  affiliation: Max Planck Institute for Informatics
  publication_count: 71
  previous_employer: OpenAI Research (2019-2022)
  research_focus: primary=multimodal learning, secondary=vision-language models

Entity: researcher/hannah_nielsen
  affiliation: UT Austin
  publication_count: 46
  previous_employer: Amazon AWS AI (2018-2021)
  research_focus: primary=federated learning, secondary=privacy-preserving ML

Entity: researcher/matias_tan
  affiliation: Georgia Tech
  publication_count: 48
  previous_employer: Vector Institute (2018-2021)
  research_focus: primary=causal inference, secondary=counterfactual reasoning

Entity: researcher/elena_dobrescu
  affiliation: Princeton CS
  publication_count: 36
  previous_employer: IBM Research (2016-2019)
  research_focus: primary=out-of-distribution generalization, secondary=domain adaptation

Entity: researcher/oscar_ghosh
  affiliation: Boston University
  publication_count: 87
  previous_employer: Microsoft Research (2015-2018)
  research_focus: primary=out-of-distribution generalization, secondary=domain adaptation

Entity: researcher/xiao_sorensen
  affiliation: University of Sydney
  publication_count: 76
  previous_employer: Jane Street Research (2018-2021)
  research_focus: primary=geometric deep learning, secondary=equivariant networks

Entity: researcher/santiago_wiese
  affiliation: Hong Kong University of Science and Technology
  publication_count: 85
  previous_employer: Tesla AI (2019-2022)
  research_focus: primary=dialogue systems, secondary=conversational AI

Entity: researcher/celine_saito
  affiliation: University of Toronto
  publication_count: 64
  previous_employer: ByteDance AI Lab (2020-2023)
  research_focus: primary=code generation, secondary=program synthesis

Entity: researcher/zhao_liu
  affiliation: University of Zurich
  publication_count: 11
  previous_employer: Vector Institute (2018-2021)
  research_focus: primary=semantic parsing, secondary=structured prediction

Entity: researcher/angela_moreau
  affiliation: University of Sydney
  publication_count: 61
  previous_employer: Google DeepMind (2020-2023)
  research_focus: primary=machine learning theory, secondary=generalization bounds

Entity: researcher/jason_maier
  affiliation: University of Toronto
  publication_count: 86
  previous_employer: OpenAI Research (2019-2022)
  research_focus: primary=neural symbolic integration, secondary=logic learning

Entity: researcher/marina_pham
  affiliation: University of Sydney
  publication_count: 78
  previous_employer: Philips Research (2018-2021)
  research_focus: primary=reinforcement learning, secondary=robotics

Entity: researcher/leon_wong
  affiliation: Hong Kong University of Science and Technology
  publication_count: 28
  previous_employer: Tesla AI (2019-2022)
  research_focus: primary=neural symbolic integration, secondary=logic learning

Entity: researcher/lucas_stefanov
  affiliation: Princeton CS
  publication_count: 11
  previous_employer: ByteDance AI Lab (2020-2023)
  research_focus: primary=speech recognition, secondary=spoken dialog systems

Entity: researcher/ingrid_cruz
  affiliation: Allen Institute for AI
  publication_count: 86
  previous_employer: NVIDIA Research (2017-2020)
  research_focus: primary=reinforcement learning, secondary=robotics

Entity: researcher/emma_saito
  affiliation: McGill University
  publication_count: 71
  previous_employer: Cisco Research (2017-2020)
  research_focus: primary=Bayesian deep learning, secondary=uncertainty quantification

Entity: researcher/jana_patel
  affiliation: EPFL
  publication_count: 53
  previous_employer: Tencent AI Lab (2019-2022)
  research_focus: primary=medical imaging, secondary=clinical decision support

Entity: researcher/sandra_zhou
  affiliation: UC Berkeley
  publication_count: 84
  previous_employer: Berkeley AI Research Lab (2016-2019)
  research_focus: primary=federated learning, secondary=privacy-preserving ML

Entity: researcher/hugo_dimitriou
  affiliation: KTH Royal Institute of Technology
  publication_count: 90
  previous_employer: Bosch Center for AI (2019-2022)
  research_focus: primary=AI safety, secondary=value alignment

Entity: researcher/emre_zimmermann
  affiliation: Princeton CS
  publication_count: 46
  previous_employer: OpenAI Research (2019-2022)
  research_focus: primary=continual learning, secondary=catastrophic forgetting

Entity: researcher/rosa_fontaine
  affiliation: Seoul National University
  publication_count: 43
  previous_employer: Huawei Noah Ark Lab (2018-2021)
  research_focus: primary=adversarial robustness, secondary=certified defenses

Entity: researcher/hannah_wenger
  affiliation: INRIA Paris
  publication_count: 86
  previous_employer: Berkeley AI Research Lab (2016-2019)
  research_focus: primary=adversarial robustness, secondary=certified defenses

Entity: researcher/saanvi_vasiliev
  affiliation: ETH Zurich
  publication_count: 86
  previous_employer: Alibaba DAMO Academy (2018-2021)
  research_focus: primary=semantic parsing, secondary=structured prediction

Entity: researcher/james_almeida
  affiliation: Tokyo University
  publication_count: 43
  previous_employer: NVIDIA Research (2017-2020)
  research_focus: primary=computational biology, secondary=protein structure prediction

Entity: researcher/ingrid_smith
  affiliation: Georgia Tech
  publication_count: 32
  previous_employer: Facebook AI Research (2017-2020)
  research_focus: primary=causal inference, secondary=counterfactual reasoning

Entity: researcher/anisha_martinez
  affiliation: Oxford University
  publication_count: 68
  previous_employer: Siemens Research (2016-2019)
  research_focus: primary=commonsense reasoning, secondary=knowledge grounding

Entity: researcher/alina_nielsen
  affiliation: Northeastern University
  publication_count: 83
  previous_employer: Facebook AI Research (2017-2020)
  research_focus: primary=neural symbolic integration, secondary=logic learning

Entity: researcher/jennifer_ghosh
  affiliation: Caltech
  publication_count: 27
  previous_employer: Amazon AWS AI (2018-2021)
  research_focus: primary=geometric deep learning, secondary=equivariant networks

Entity: researcher/amara_ritter
  affiliation: Tokyo University
  publication_count: 90
  previous_employer: Adobe Research (2017-2020)
  research_focus: primary=geometric deep learning, secondary=equivariant networks

Entity: researcher/patrick_lutz
  affiliation: Boston University
  publication_count: 61
  previous_employer: Samsung AI Center (2019-2022)
  research_focus: primary=social computing, secondary=fairness in ML

Entity: researcher/elias_moreau
  affiliation: Montreal Institute for Learning Algorithms
  publication_count: 28
  previous_employer: Toyota Research Institute (2017-2020)
  research_focus: primary=active learning, secondary=experimental design

Entity: researcher/laura_schneider
  affiliation: Northeastern University
  publication_count: 40
  previous_employer: Bosch Center for AI (2019-2022)
  research_focus: primary=semantic parsing, secondary=structured prediction

Entity: researcher/matias_romano
  affiliation: Caltech
  publication_count: 29
  previous_employer: Citadel Securities Research (2017-2020)
  research_focus: primary=adversarial robustness, secondary=certified defenses

Entity: researcher/emre_brown
  affiliation: Hong Kong University of Science and Technology
  publication_count: 65
  previous_employer: Toyota Research Institute (2017-2020)
  research_focus: primary=data augmentation, secondary=synthetic data generation

Entity: researcher/ashwin_tran
  affiliation: Cambridge University
  publication_count: 40
  previous_employer: OpenAI Research (2019-2022)
  research_focus: primary=Bayesian deep learning, secondary=uncertainty quantification

Entity: researcher/fatimah_sato
  affiliation: Allen Institute for AI
  publication_count: 22
  previous_employer: Alibaba DAMO Academy (2018-2021)
  research_focus: primary=graph neural networks, secondary=knowledge graphs

Entity: researcher/diego_sato
  affiliation: Seoul National University
  publication_count: 7
  previous_employer: Tencent AI Lab (2019-2022)
  research_focus: primary=machine learning theory, secondary=generalization bounds

Entity: researcher/julia_stefanov
  affiliation: Tokyo University
  publication_count: 34
  previous_employer: Bosch Center for AI (2019-2022)
  research_focus: primary=graph neural networks, secondary=knowledge graphs

Entity: researcher/javier_kapoor
  affiliation: Stanford University
  publication_count: 44
  previous_employer: OpenAI (2018-2021)
  research_focus: primary=medical imaging, secondary=clinical decision support

Entity: researcher/zara_fuentes
  affiliation: NYU Courant Institute
  publication_count: 8
  previous_employer: Uber AI Labs (2017-2020)
  research_focus: primary=summarization, secondary=abstractive generation

Entity: researcher/shreya_flores
  affiliation: Boston University
  publication_count: 94
  previous_employer: Qualcomm AI Research (2017-2020)
  research_focus: primary=geometric deep learning, secondary=equivariant networks

Entity: researcher/paula_acharya
  affiliation: ETH Zurich
  publication_count: 6
  previous_employer: Salesforce Research (2018-2021)
  research_focus: primary=computational biology, secondary=protein structure prediction

Entity: researcher/celine_wang
  affiliation: Purdue University
  publication_count: 81
  previous_employer: Cisco Research (2017-2020)
  research_focus: primary=optimization theory, secondary=stochastic gradient methods

Entity: researcher/ayaan_maier
  affiliation: University of Michigan
  publication_count: 42
  previous_employer: Meta AI Research (2020-2023)
  research_focus: primary=machine learning theory, secondary=generalization bounds

Entity: researcher/elias_romano
  affiliation: National University of Singapore
  publication_count: 83
  previous_employer: Snap Research (2018-2021)
  research_focus: primary=federated learning, secondary=privacy-preserving ML

Entity: researcher/ayaan_stark
  affiliation: Leiden University
  publication_count: 72
  previous_employer: Google Brain (2016-2019)
  research_focus: primary=semantic parsing, secondary=structured prediction

Entity: researcher/nicolas_klein
  affiliation: University of Illinois Urbana-Champaign
  publication_count: 22
  previous_employer: Uber AI Labs (2017-2020)
  research_focus: primary=optimization theory, secondary=stochastic gradient methods

Entity: researcher/aaron_oh
  affiliation: University of Michigan
  publication_count: 77
  previous_employer: Tencent AI Lab (2019-2022)
  research_focus: primary=out-of-distribution generalization, secondary=domain adaptation

Entity: researcher/ryan_cruz
  affiliation: Sapienza University of Rome
  publication_count: 50
  previous_employer: Microsoft Research (2015-2018)
  research_focus: primary=commonsense reasoning, secondary=knowledge grounding

Entity: researcher/milan_suzuki
  affiliation: Allen Institute for AI
  publication_count: 74
  previous_employer: Google Brain (2016-2019)
  research_focus: primary=video understanding, secondary=temporal modeling

Entity: researcher/lorenzo_bonnet
  affiliation: National University of Singapore
  publication_count: 53
  previous_employer: Toyota Research Institute (2017-2020)
  research_focus: primary=multi-task learning, secondary=transfer learning

Entity: researcher/valentina_almeida
  affiliation: Seoul National University
  publication_count: 12
  previous_employer: Vector Institute (2018-2021)
  research_focus: primary=anomaly detection, secondary=time series analysis

Entity: researcher/thomas_dobrescu
  affiliation: Northeastern University
  publication_count: 78
  previous_employer: Berkeley AI Research Lab (2016-2019)
  research_focus: primary=adversarial robustness, secondary=certified defenses

Entity: researcher/amara_oh
  affiliation: TU Berlin
  publication_count: 47
  previous_employer: NVIDIA Research (2017-2020)
  research_focus: primary=information retrieval, secondary=dense retrieval

Entity: researcher/shreya_silva
  affiliation: National University of Singapore
  publication_count: 27
  previous_employer: Facebook AI Research (2017-2020)
  research_focus: primary=federated learning, secondary=privacy-preserving ML

Entity: researcher/stephanie_schmidt
  affiliation: MIT Computer Science
  publication_count: 41
  previous_employer: IBM Research (2016-2019)
  research_focus: primary=reinforcement learning, secondary=robotics

Entity: researcher/zara_jain
  affiliation: MIT Computer Science
  publication_count: 44
  previous_employer: Waymo Research (2020-2023)
  research_focus: primary=semantic parsing, secondary=structured prediction

Entity: researcher/julia_wagner
  affiliation: Montreal Institute for Learning Algorithms
  publication_count: 36
  previous_employer: Google DeepMind (2020-2023)
  research_focus: primary=interpretable ML, secondary=model explanation

Entity: researcher/francesca_oliveira
  affiliation: Northeastern University
  publication_count: 10
  previous_employer: Berkeley AI Research Lab (2016-2019)
  research_focus: primary=self-supervised learning, secondary=contrastive methods

Entity: researcher/bianca_park
  affiliation: Technion
  publication_count: 55
  previous_employer: ByteDance AI Lab (2020-2023)
  research_focus: primary=video understanding, secondary=temporal modeling

Entity: researcher/ilaria_hoffmann
  affiliation: Vector Institute
  publication_count: 92
  previous_employer: Intel AI Lab (2016-2019)
  research_focus: primary=3D scene understanding, secondary=point cloud processing

Entity: researcher/markus_li
  affiliation: ETH Zurich
  publication_count: 97
  previous_employer: Alibaba DAMO Academy (2018-2021)
  research_focus: primary=graph neural networks, secondary=knowledge graphs

Entity: researcher/kristina_zimmermann
  affiliation: University of Washington
  publication_count: 73
  previous_employer: Uber AI Labs (2017-2020)
  research_focus: primary=dialogue systems, secondary=conversational AI

Entity: researcher/ashwin_costa
  affiliation: Tsinghua University
  publication_count: 88
  previous_employer: Uber AI Labs (2017-2020)
  research_focus: primary=code generation, secondary=program synthesis

Entity: researcher/lena_zimmermann
  affiliation: University of Illinois Urbana-Champaign
  publication_count: 58
  previous_employer: Amazon AWS AI (2018-2021)
  research_focus: primary=geometric deep learning, secondary=equivariant networks

Entity: researcher/ivan_santos
  affiliation: MIT Computer Science
  publication_count: 97
  previous_employer: Vector Institute (2018-2021)
  research_focus: primary=optimization theory, secondary=stochastic gradient methods

Entity: researcher/felix_burger
  affiliation: University of Toronto
  publication_count: 89
  previous_employer: Huawei Noah Ark Lab (2018-2021)
  research_focus: primary=3D scene understanding, secondary=point cloud processing

Entity: researcher/mark_giordano
  affiliation: Stanford University
  publication_count: 22
  previous_employer: Citadel Securities Research (2017-2020)
  research_focus: primary=geometric deep learning, secondary=equivariant networks

Entity: researcher/alicia_fernandez
  affiliation: University of Toronto
  publication_count: 34
  previous_employer: Toyota Research Institute (2017-2020)
  research_focus: primary=3D scene understanding, secondary=point cloud processing

Entity: researcher/jonathan_wolf
  affiliation: MIT Computer Science
  publication_count: 81
  previous_employer: Apple ML Research (2019-2022)
  research_focus: primary=geometric deep learning, secondary=equivariant networks

Entity: researcher/jason_patel
  affiliation: McGill University
  publication_count: 13
  previous_employer: Two Sigma Research (2019-2022)
  research_focus: primary=adversarial robustness, secondary=certified defenses

Entity: researcher/matias_pacheco
  affiliation: Max Planck Institute for Informatics
  publication_count: 44
  previous_employer: Twitter Machine Learning (2019-2022)
  research_focus: primary=anomaly detection, secondary=time series analysis

Entity: researcher/beatriz_anand
  affiliation: Virginia Tech
  publication_count: 27
  previous_employer: Intel AI Lab (2016-2019)
  research_focus: primary=commonsense reasoning, secondary=knowledge grounding

Entity: researcher/jorge_wenger
  affiliation: Cambridge University
  publication_count: 37
  previous_employer: Salesforce Research (2018-2021)
  research_focus: primary=geometric deep learning, secondary=equivariant networks

Entity: researcher/deepa_maier
  affiliation: University of British Columbia
  publication_count: 66
  previous_employer: IBM Research (2016-2019)
  research_focus: primary=neural architecture search, secondary=efficient deep learning

Entity: researcher/carlos_choi
  affiliation: McGill University
  publication_count: 26
  previous_employer: ByteDance AI Lab (2020-2023)
  research_focus: primary=graph neural networks, secondary=knowledge graphs

Entity: researcher/santiago_muller
  affiliation: Chinese University of Hong Kong
  publication_count: 48
  previous_employer: Microsoft Research (2015-2018)
  research_focus: primary=data augmentation, secondary=synthetic data generation

Entity: researcher/mihail_malik
  affiliation: University of Amsterdam
  publication_count: 24
  previous_employer: NVIDIA Research (2017-2020)
  research_focus: primary=3D scene understanding, secondary=point cloud processing

Entity: researcher/mario_kapoor
  affiliation: Cambridge University
  publication_count: 29
  previous_employer: Facebook AI Research (2017-2020)
  research_focus: primary=anomaly detection, secondary=time series analysis

Entity: researcher/zara_sorensen
  affiliation: Stanford University
  publication_count: 50
  previous_employer: Philips Research (2018-2021)
  research_focus: primary=active learning, secondary=experimental design

Entity: researcher/jason_schulz
  affiliation: KTH Royal Institute of Technology
  publication_count: 20
  previous_employer: OpenAI Research (2019-2022)
  research_focus: primary=federated learning, secondary=privacy-preserving ML

Entity: researcher/hannah_ramos
  affiliation: University of Illinois Urbana-Champaign
  publication_count: 96
  previous_employer: Qualcomm AI Research (2017-2020)
  research_focus: primary=commonsense reasoning, secondary=knowledge grounding

Entity: researcher/karen_richter
  affiliation: University of Helsinki
  publication_count: 13
  previous_employer: Facebook AI Research (2017-2020)
  research_focus: primary=dialogue systems, secondary=conversational AI

Entity: researcher/rajesh_choi
  affiliation: McGill University
  publication_count: 63
  previous_employer: Cisco Research (2017-2020)
  research_focus: primary=autonomous driving, secondary=sensor fusion

Entity: researcher/boris_weber
  affiliation: National University of Singapore
  publication_count: 79
  previous_employer: NVIDIA Research (2017-2020)
  research_focus: primary=adversarial robustness, secondary=certified defenses

Entity: researcher/kristina_stefanov
  affiliation: UC Berkeley
  publication_count: 19
  previous_employer: Cisco Research (2017-2020)
  research_focus: primary=causal inference, secondary=counterfactual reasoning

Entity: researcher/giulia_gonzalez
  affiliation: Caltech
  publication_count: 45
  previous_employer: Samsung AI Center (2019-2022)
  research_focus: primary=autonomous driving, secondary=sensor fusion

Entity: researcher/markus_lutz
  affiliation: ETH Zurich
  publication_count: 36
  previous_employer: IBM Research (2016-2019)
  research_focus: primary=data augmentation, secondary=synthetic data generation

Entity: researcher/felix_fernandez
  affiliation: National University of Singapore
  publication_count: 42
  previous_employer: Siemens Research (2016-2019)
  research_focus: primary=graph neural networks, secondary=knowledge graphs

Entity: researcher/marco_guo
  affiliation: University of Zurich
  publication_count: 78
  previous_employer: Apple ML Research (2019-2022)
  research_focus: primary=Bayesian deep learning, secondary=uncertainty quantification

Entity: researcher/robin_zimmermann
  affiliation: Peking University
  publication_count: 76
  previous_employer: Google DeepMind (2020-2023)
  research_focus: primary=computer vision, secondary=object detection

Entity: researcher/anna_bonnet
  affiliation: Hong Kong University of Science and Technology
  publication_count: 77
  previous_employer: Salesforce Research (2018-2021)
  research_focus: primary=computational biology, secondary=protein structure prediction

Entity: researcher/william_wong
  affiliation: Hebrew University
  publication_count: 83
  previous_employer: Google Brain (2016-2019)
  research_focus: primary=question answering, secondary=reading comprehension

Entity: researcher/piotr_wagner
  affiliation: EPFL
  publication_count: 86
  previous_employer: Waymo Research (2020-2023)
  research_focus: primary=summarization, secondary=abstractive generation

Entity: researcher/elizabeth_reyes
  affiliation: University of Amsterdam
  publication_count: 62
  previous_employer: Microsoft Research (2015-2018)
  research_focus: primary=machine learning theory, secondary=generalization bounds

Entity: researcher/chen_saito
  affiliation: Hebrew University
  publication_count: 65
  previous_employer: Snap Research (2018-2021)
  research_focus: primary=computational biology, secondary=protein structure prediction

Entity: researcher/ingrid_zuberi
  affiliation: Princeton CS
  publication_count: 44
  previous_employer: Tesla AI (2019-2022)
  research_focus: primary=autonomous driving, secondary=sensor fusion

Entity: researcher/julian_ferrari
  affiliation: Boston University
  publication_count: 51
  previous_employer: Oracle AI Research (2018-2021)
  research_focus: primary=data augmentation, secondary=synthetic data generation

Entity: researcher/astrid_muller
  affiliation: University of Michigan
  publication_count: 63
  previous_employer: Meta AI Research (2020-2023)
  research_focus: primary=self-supervised learning, secondary=contrastive methods

Entity: researcher/leon_kowalski
  affiliation: Princeton CS
  publication_count: 16
  previous_employer: Microsoft Research (2017-2020)
  research_focus: primary=AI safety, secondary=value alignment

Entity: researcher/bob_okafor
  affiliation: Stanford AI Lab
  publication_count: 23
  previous_employer: DeepMind (2020-2023)
  research_focus: primary=computer vision, secondary=embodied AI

Entity: researcher/jonathan_romano
  affiliation: University of Michigan
  publication_count: 24
  previous_employer: Tesla AI (2019-2022)
  research_focus: primary=active learning, secondary=experimental design

Entity: researcher/sven_moretti
  affiliation: Georgia Tech
  publication_count: 24
  previous_employer: Intel AI Lab (2016-2019)
  research_focus: primary=semantic parsing, secondary=structured prediction

Entity: researcher/lisa_stark
  affiliation: University of Amsterdam
  publication_count: 67
  previous_employer: Google Brain (2016-2019)
  research_focus: primary=graph neural networks, secondary=knowledge graphs

Entity: researcher/josef_suzuki
  affiliation: University of Sydney
  publication_count: 34
  previous_employer: Baidu Research (2018-2021)
  research_focus: primary=continual learning, secondary=catastrophic forgetting

Entity: researcher/jacob_braun
  affiliation: UC Berkeley
  publication_count: 40
  previous_employer: Intel AI Lab (2016-2019)
  research_focus: primary=neural symbolic integration, secondary=logic learning

Entity: researcher/robert_sekar
  affiliation: EPFL
  publication_count: 72
  previous_employer: Google Research (2018-2021)
  research_focus: primary=speech recognition, secondary=spoken dialog systems

Entity: researcher/kristina_fischer
  affiliation: Columbia University
  publication_count: 97
  previous_employer: Toyota Research Institute (2017-2020)
  research_focus: primary=multimodal learning, secondary=vision-language models

Entity: researcher/jana_bonnet
  affiliation: Max Planck Institute for Informatics
  publication_count: 10
  previous_employer: Two Sigma Research (2019-2022)
  research_focus: primary=data augmentation, secondary=synthetic data generation

Entity: researcher/dakarai_osei
  affiliation: KTH Royal Institute of Technology
  publication_count: 40
  previous_employer: Microsoft Research (2015-2018)
  research_focus: primary=video understanding, secondary=temporal modeling

Entity: researcher/marina_sato
  affiliation: Boston University
  publication_count: 74
  previous_employer: Twitter Machine Learning (2019-2022)
  research_focus: primary=neural architecture search, secondary=efficient deep learning

Entity: researcher/boris_dimitriou
  affiliation: Max Planck Institute for Informatics
  publication_count: 51
  previous_employer: Berkeley AI Research Lab (2016-2019)
  research_focus: primary=data augmentation, secondary=synthetic data generation

Entity: researcher/jana_fontaine
  affiliation: Georgia Tech
  publication_count: 81
  previous_employer: Oracle AI Research (2018-2021)
  research_focus: primary=multimodal learning, secondary=vision-language models

Entity: researcher/marco_blum
  affiliation: MIT Computer Science
  publication_count: 8
  previous_employer: Facebook AI Research (2017-2020)
  research_focus: primary=medical imaging, secondary=clinical decision support

Entity: researcher/lucas_tran
  affiliation: University of Sydney
  publication_count: 23
  previous_employer: Citadel Securities Research (2017-2020)
  research_focus: primary=semantic parsing, secondary=structured prediction

Entity: researcher/caroline_narasimhan
  affiliation: University of Copenhagen
  publication_count: 44
  previous_employer: Amazon AWS AI (2018-2021)
  research_focus: primary=multimodal learning, secondary=vision-language models

Entity: researcher/paula_mehta
  affiliation: University of Zurich
  publication_count: 47
  previous_employer: Oracle AI Research (2018-2021)
  research_focus: primary=semantic parsing, secondary=structured prediction

Entity: researcher/matteo_solis
  affiliation: University of Illinois Urbana-Champaign
  publication_count: 76
  previous_employer: Waymo Research (2020-2023)
  research_focus: primary=summarization, secondary=abstractive generation

Entity: researcher/aleksandra_park
  affiliation: Peking University
  publication_count: 90
  previous_employer: Meta AI Research (2020-2023)
  research_focus: primary=meta-learning, secondary=few-shot learning

Entity: researcher/nina_mishra
  affiliation: Purdue University
  publication_count: 92
  previous_employer: Google Brain (2016-2019)
  research_focus: primary=neural symbolic integration, secondary=logic learning

Entity: researcher/lucas_lee
  affiliation: Hong Kong University of Science and Technology
  publication_count: 78
  previous_employer: Two Sigma Research (2019-2022)
  research_focus: primary=recommendation systems, secondary=collaborative filtering

Entity: researcher/sven_brown
  affiliation: University of Zurich
  publication_count: 65
  previous_employer: Amazon AWS AI (2018-2021)
  research_focus: primary=commonsense reasoning, secondary=knowledge grounding

Entity: researcher/rachel_petrov
  affiliation: Princeton CS
  publication_count: 91
  previous_employer: Adobe Research (2017-2020)
  research_focus: primary=reinforcement learning, secondary=robotics

Entity: researcher/neha_durand
  affiliation: Georgia Tech
  publication_count: 6
  previous_employer: ByteDance AI Lab (2020-2023)
  research_focus: primary=dialogue systems, secondary=conversational AI

Entity: researcher/katarzyna_garcia
  affiliation: Hebrew University
  publication_count: 92
  previous_employer: Baidu Research (2018-2021)
  research_focus: primary=meta-learning, secondary=few-shot learning

Entity: researcher/marco_sekar
  affiliation: Virginia Tech
  publication_count: 97
  previous_employer: Microsoft Research (2017-2020)
  research_focus: primary=adversarial robustness, secondary=certified defenses

Entity: researcher/markus_jin
  affiliation: KTH Royal Institute of Technology
  publication_count: 45
  previous_employer: Qualcomm AI Research (2017-2020)
  research_focus: primary=commonsense reasoning, secondary=knowledge grounding

Entity: researcher/jennifer_moretti
  affiliation: University of Washington
  publication_count: 62
  previous_employer: Siemens Research (2016-2019)
  research_focus: primary=medical imaging, secondary=clinical decision support

Entity: researcher/milan_oh
  affiliation: University of Melbourne
  publication_count: 96
  previous_employer: Salesforce Research (2018-2021)
  research_focus: primary=summarization, secondary=abstractive generation

Entity: researcher/dakarai_kowalski
  affiliation: University of Edinburgh
  publication_count: 75
  previous_employer: Waymo Research (2020-2023)
  research_focus: primary=recommendation systems, secondary=collaborative filtering

Entity: researcher/gabriela_maier
  affiliation: University of Illinois Urbana-Champaign
  publication_count: 30
  previous_employer: Intel AI Lab (2016-2019)
  research_focus: primary=dialogue systems, secondary=conversational AI

Entity: researcher/lucia_novak
  affiliation: KTH Royal Institute of Technology
  publication_count: 96
  previous_employer: Twitter Machine Learning (2019-2022)
  research_focus: primary=AI safety, secondary=value alignment

Entity: researcher/bianca_wong
  affiliation: University of Melbourne
  publication_count: 73
  previous_employer: Bosch Center for AI (2019-2022)
  research_focus: primary=multimodal learning, secondary=vision-language models

Entity: researcher/isabel_fuentes
  affiliation: EPFL
  publication_count: 9
  previous_employer: Uber AI Labs (2017-2020)
  research_focus: primary=graph neural networks, secondary=knowledge graphs

Entity: researcher/isabel_sanchez
  affiliation: Hong Kong University of Science and Technology
  publication_count: 36
  previous_employer: Qualcomm AI Research (2017-2020)
  research_focus: primary=computational biology, secondary=protein structure prediction

Entity: researcher/danielle_vidal
  affiliation: University of Edinburgh
  publication_count: 75
  previous_employer: Twitter Machine Learning (2019-2022)
  research_focus: primary=adversarial robustness, secondary=certified defenses

Entity: researcher/astrid_yoshida
  affiliation: University of Michigan
  publication_count: 35
  previous_employer: Microsoft Research (2017-2020)
  research_focus: primary=commonsense reasoning, secondary=knowledge grounding

Entity: researcher/dilnoza_khan
  affiliation: UC Berkeley
  publication_count: 16
  previous_employer: Tencent AI Lab (2019-2022)
  research_focus: primary=medical imaging, secondary=clinical decision support

Entity: researcher/stephanie_sekar
  affiliation: Oxford University
  publication_count: 91
  previous_employer: Facebook AI Research (2017-2020)
  research_focus: primary=natural language processing, secondary=machine translation

Entity: researcher/mira_giordano
  affiliation: Hebrew University
  publication_count: 87
  previous_employer: Qualcomm AI Research (2017-2020)
  research_focus: primary=summarization, secondary=abstractive generation

Entity: researcher/ricardo_jain
  affiliation: Boston University
  publication_count: 40
  previous_employer: Tesla AI (2019-2022)
  research_focus: primary=AI safety, secondary=value alignment

Entity: researcher/rebecca_castellanos
  affiliation: Northeastern University
  publication_count: 15
  previous_employer: Two Sigma Research (2019-2022)
  research_focus: primary=recommendation systems, secondary=collaborative filtering

Entity: researcher/matteo_bhatt
  affiliation: University of Washington
  publication_count: 57
  previous_employer: NVIDIA Research (2017-2020)
  research_focus: primary=reinforcement learning, secondary=robotics

Entity: researcher/julia_sorensen
  affiliation: University of Washington
  publication_count: 41
  previous_employer: Google DeepMind (2020-2023)
  research_focus: primary=natural language processing, secondary=machine translation

Entity: researcher/gabriela_wolf
  affiliation: Leiden University
  publication_count: 17
  previous_employer: Berkeley AI Research Lab (2016-2019)
  research_focus: primary=AI safety, secondary=value alignment

Entity: researcher/leonardo_wagner
  affiliation: Sapienza University of Rome
  publication_count: 67
  previous_employer: Facebook AI Research (2017-2020)
  research_focus: primary=semantic parsing, secondary=structured prediction

Entity: researcher/lisa_lim
  affiliation: Georgia Tech
  publication_count: 18
  previous_employer: Berkeley AI Research Lab (2016-2019)
  research_focus: primary=Bayesian deep learning, secondary=uncertainty quantification

Entity: researcher/thomas_schmidt
  affiliation: Hong Kong University of Science and Technology
  publication_count: 36
  previous_employer: NVIDIA Research (2017-2020)
  research_focus: primary=natural language processing, secondary=machine translation

Entity: researcher/tim_nielsen
  affiliation: EPFL
  publication_count: 76
  previous_employer: IBM Research (2016-2019)
  research_focus: primary=out-of-distribution generalization, secondary=domain adaptation

Entity: researcher/patrick_reyes
  affiliation: Technion
  publication_count: 69
  previous_employer: Tesla AI (2019-2022)
  research_focus: primary=graph neural networks, secondary=knowledge graphs

Entity: researcher/julian_dimitriou
  affiliation: University of Washington
  publication_count: 21
  previous_employer: Qualcomm AI Research (2017-2020)
  research_focus: primary=dialogue systems, secondary=conversational AI

Entity: researcher/emma_acharya
  affiliation: Columbia University
  publication_count: 53
  previous_employer: Adobe Research (2017-2020)
  research_focus: primary=geometric deep learning, secondary=equivariant networks

Entity: researcher/hugo_meyer
  affiliation: University of Zurich
  publication_count: 96
  previous_employer: Two Sigma Research (2019-2022)
  research_focus: primary=natural language processing, secondary=machine translation

Entity: researcher/erin_osei
  affiliation: University of British Columbia
  publication_count: 34
  previous_employer: Microsoft Research (2017-2020)
  research_focus: primary=neural architecture search, secondary=efficient deep learning

Entity: researcher/lisa_mishra
  affiliation: Caltech
  publication_count: 55
  previous_employer: Oracle AI Research (2018-2021)
  research_focus: primary=code generation, secondary=program synthesis

Entity: researcher/sarah_esposito
  affiliation: National University of Singapore
  publication_count: 41
  previous_employer: Toyota Research Institute (2017-2020)
  research_focus: primary=recommendation systems, secondary=collaborative filtering

Entity: researcher/diego_fischer
  affiliation: Montreal Institute for Learning Algorithms
  publication_count: 23
  previous_employer: Snap Research (2018-2021)
  research_focus: primary=neural symbolic integration, secondary=logic learning

Entity: researcher/javier_rodriguez
  affiliation: University of British Columbia
  publication_count: 74
  previous_employer: Qualcomm AI Research (2017-2020)
  research_focus: primary=social computing, secondary=fairness in ML

Entity: researcher/ryan_jung
  affiliation: Boston University
  publication_count: 35
  previous_employer: Citadel Securities Research (2017-2020)
  research_focus: primary=graph neural networks, secondary=knowledge graphs

Entity: researcher/martin_santos
  affiliation: Sapienza University of Rome
  publication_count: 94
  previous_employer: Toyota Research Institute (2017-2020)
  research_focus: primary=federated learning, secondary=privacy-preserving ML

Entity: researcher/nathan_durand
  affiliation: UC Berkeley
  publication_count: 74
  previous_employer: Oracle AI Research (2018-2021)
  research_focus: primary=interpretable ML, secondary=model explanation

Entity: researcher/neha_vidal
  affiliation: Princeton CS
  publication_count: 25
  previous_employer: Tesla AI (2019-2022)
  research_focus: primary=commonsense reasoning, secondary=knowledge grounding

Entity: researcher/lauren_eriksson
  affiliation: University of Melbourne
  publication_count: 30
  previous_employer: Jane Street Research (2018-2021)
  research_focus: primary=question answering, secondary=reading comprehension

Entity: researcher/arnav_tan
  affiliation: McGill University
  publication_count: 11
  previous_employer: Snap Research (2018-2021)
  research_focus: primary=adversarial robustness, secondary=certified defenses

Entity: researcher/mark_rodriguez
  affiliation: University of Sydney
  publication_count: 76
  previous_employer: Microsoft Research (2017-2020)
  research_focus: primary=data augmentation, secondary=synthetic data generation

Entity: researcher/lina_mishra
  affiliation: Purdue University
  publication_count: 6
  previous_employer: Huawei Noah Ark Lab (2018-2021)
  research_focus: primary=multi-task learning, secondary=transfer learning

Entity: researcher/aaron_jung
  affiliation: University of Zurich
  publication_count: 13
  previous_employer: Google DeepMind (2020-2023)
  research_focus: primary=optimization theory, secondary=stochastic gradient methods

Entity: researcher/isabel_castro
  affiliation: TU Berlin
  publication_count: 11
  previous_employer: Microsoft Research (2015-2018)
  research_focus: primary=summarization, secondary=abstractive generation

Entity: researcher/alicia_maier
  affiliation: Hebrew University
  publication_count: 27
  previous_employer: Facebook AI Research (2017-2020)
  research_focus: primary=meta-learning, secondary=few-shot learning

Entity: researcher/javier_petrov
  affiliation: McGill University
  publication_count: 52
  previous_employer: Bosch Center for AI (2019-2022)
  research_focus: primary=graph neural networks, secondary=knowledge graphs

Entity: researcher/santiago_vogt
  affiliation: NYU Courant Institute
  publication_count: 87
  previous_employer: Vector Institute (2018-2021)
  research_focus: primary=neural architecture search, secondary=efficient deep learning

Entity: researcher/claudia_vidal
  affiliation: Max Planck Institute for Informatics
  publication_count: 71
  previous_employer: Facebook AI Research (2017-2020)
  research_focus: primary=recommendation systems, secondary=collaborative filtering

Entity: researcher/aaron_andersen
  affiliation: University of Amsterdam
  publication_count: 63
  previous_employer: Siemens Research (2016-2019)
  research_focus: primary=optimization theory, secondary=stochastic gradient methods

Entity: researcher/matteo_petrov
  affiliation: UT Austin
  publication_count: 35
  previous_employer: Snap Research (2018-2021)
  research_focus: primary=autonomous driving, secondary=sensor fusion

Entity: researcher/charlotte_liu
  affiliation: Georgia Tech
  publication_count: 96
  previous_employer: Meta AI Research (2020-2023)
  research_focus: primary=reinforcement learning, secondary=robotics

Entity: researcher/rosa_romano
  affiliation: University of Copenhagen
  publication_count: 6
  previous_employer: Adobe Research (2017-2020)
  research_focus: primary=computational biology, secondary=protein structure prediction

Entity: researcher/andrzej_diop
  affiliation: Leiden University
  publication_count: 8
  previous_employer: ByteDance AI Lab (2020-2023)
  research_focus: primary=neural symbolic integration, secondary=logic learning

Entity: researcher/sabrina_braun
  affiliation: University of Michigan
  publication_count: 98
  previous_employer: Google DeepMind (2020-2023)
  research_focus: primary=multimodal learning, secondary=vision-language models

Entity: researcher/laura_khan
  affiliation: TU Berlin
  publication_count: 31
  previous_employer: Microsoft Research (2017-2020)
  research_focus: primary=adversarial robustness, secondary=certified defenses

Entity: researcher/marco_malik
  affiliation: UT Austin
  publication_count: 97
  previous_employer: Two Sigma Research (2019-2022)
  research_focus: primary=dialogue systems, secondary=conversational AI

Entity: researcher/nicolas_zhou
  affiliation: Northeastern University
  publication_count: 90
  previous_employer: Tesla AI (2019-2022)
  research_focus: primary=anomaly detection, secondary=time series analysis

Entity: researcher/giulia_fontaine
  affiliation: Chinese University of Hong Kong
  publication_count: 70
  previous_employer: Samsung AI Center (2019-2022)
  research_focus: primary=meta-learning, secondary=few-shot learning

Entity: researcher/gabriela_liu
  affiliation: UC Berkeley
  publication_count: 75
  previous_employer: Jane Street Research (2018-2021)
  research_focus: primary=out-of-distribution generalization, secondary=domain adaptation

Entity: researcher/piotr_rossi
  affiliation: KTH Royal Institute of Technology
  publication_count: 67
  previous_employer: Microsoft Research (2017-2020)
  research_focus: primary=autonomous driving, secondary=sensor fusion

Entity: researcher/rajesh_petrov
  affiliation: Sapienza University of Rome
  publication_count: 44
  previous_employer: Tencent AI Lab (2019-2022)
  research_focus: primary=meta-learning, secondary=few-shot learning

Entity: researcher/celine_mehta
  affiliation: INRIA Paris
  publication_count: 27
  previous_employer: Siemens Research (2016-2019)
  research_focus: primary=summarization, secondary=abstractive generation

Entity: researcher/elias_kapoor
  affiliation: University of Amsterdam
  publication_count: 94
  previous_employer: Apple ML Research (2019-2022)
  research_focus: primary=information retrieval, secondary=dense retrieval

Entity: researcher/andrea_wenger
  affiliation: Hebrew University
  publication_count: 57
  previous_employer: Philips Research (2018-2021)
  research_focus: primary=commonsense reasoning, secondary=knowledge grounding

Entity: researcher/elizabeth_larsson
  affiliation: Cornell Tech
  publication_count: 46
  previous_employer: OpenAI Research (2019-2022)
  research_focus: primary=geometric deep learning, secondary=equivariant networks

Entity: researcher/jason_demir
  affiliation: TU Berlin
  publication_count: 96
  previous_employer: IBM Research (2016-2019)
  research_focus: primary=machine learning theory, secondary=generalization bounds

Entity: researcher/eva_pereira
  affiliation: University of Melbourne
  publication_count: 81
  previous_employer: Citadel Securities Research (2017-2020)
  research_focus: primary=reinforcement learning, secondary=robotics

Entity: researcher/angela_huang
  affiliation: Boston University
  publication_count: 79
  previous_employer: Philips Research (2018-2021)
  research_focus: primary=computational biology, secondary=protein structure prediction

Entity: researcher/lucia_jin
  affiliation: Peking University
  publication_count: 42
  previous_employer: Google Research (2018-2021)
  research_focus: primary=computational biology, secondary=protein structure prediction

Entity: researcher/cyrus_esposito
  affiliation: Virginia Tech
  publication_count: 65
  previous_employer: Adobe Research (2017-2020)
  research_focus: primary=neural symbolic integration, secondary=logic learning

Entity: researcher/sofia_jensen
  affiliation: Max Planck Institute for Informatics
  publication_count: 34
  previous_employer: Philips Research (2018-2021)
  research_focus: primary=dialogue systems, secondary=conversational AI

Entity: researcher/yan_lutz
  affiliation: INRIA Paris
  publication_count: 63
  previous_employer: Siemens Research (2016-2019)
  research_focus: primary=autonomous driving, secondary=sensor fusion

Entity: researcher/grace_laurent
  affiliation: Tokyo University
  publication_count: 69
  previous_employer: Intel AI Lab (2016-2019)
  research_focus: primary=information retrieval, secondary=dense retrieval

Entity: researcher/aseel_sekar
  affiliation: Boston University
  publication_count: 44
  previous_employer: Baidu Research (2018-2021)
  research_focus: primary=3D scene understanding, secondary=point cloud processing

Entity: researcher/hao_ritter
  affiliation: MIT Computer Science
  publication_count: 76
  previous_employer: Samsung AI Center (2019-2022)
  research_focus: primary=causal inference, secondary=counterfactual reasoning

Entity: researcher/aleksandra_laurent
  affiliation: KTH Royal Institute of Technology
  publication_count: 78
  previous_employer: Jane Street Research (2018-2021)
  research_focus: primary=meta-learning, secondary=few-shot learning

Entity: researcher/gabriel_ghosh
  affiliation: Georgia Tech
  publication_count: 46
  previous_employer: Samsung AI Center (2019-2022)
  research_focus: primary=video understanding, secondary=temporal modeling

Entity: researcher/nadia_koch
  affiliation: Vector Institute
  publication_count: 74
  previous_employer: Berkeley AI Research Lab (2016-2019)
  research_focus: primary=multi-task learning, secondary=transfer learning

Entity: researcher/wei_solis
  affiliation: Purdue University
  publication_count: 86
  previous_employer: Intel AI Lab (2016-2019)
  research_focus: primary=information retrieval, secondary=dense retrieval

Entity: researcher/christoph_oh
  affiliation: Caltech
  publication_count: 21
  previous_employer: Siemens Research (2016-2019)
  research_focus: primary=question answering, secondary=reading comprehension

Entity: researcher/connor_vogt
  affiliation: Hong Kong University of Science and Technology
  publication_count: 11
  previous_employer: Cisco Research (2017-2020)
  research_focus: primary=reinforcement learning, secondary=robotics

Entity: researcher/anisha_braun
  affiliation: Boston University
  publication_count: 4
  previous_employer: Tencent AI Lab (2019-2022)
  research_focus: primary=adversarial robustness, secondary=certified defenses

Entity: researcher/rachel_khan
  affiliation: University of Toronto
  publication_count: 94
  previous_employer: Apple ML Research (2019-2022)
  research_focus: primary=natural language processing, secondary=machine translation

Entity: researcher/delia_suzuki
  affiliation: University of Sydney
  publication_count: 51
  previous_employer: Microsoft Research (2017-2020)
  research_focus: primary=summarization, secondary=abstractive generation

Entity: researcher/robin_smith
  affiliation: Stanford University
  publication_count: 4
  previous_employer: Siemens Research (2016-2019)
  research_focus: primary=data augmentation, secondary=synthetic data generation

Entity: researcher/karen_albers
  affiliation: Stanford University
  publication_count: 71
  previous_employer: Twitter Machine Learning (2019-2022)
  research_focus: primary=social computing, secondary=fairness in ML

Entity: researcher/francesca_almeida
  affiliation: Allen Institute for AI
  publication_count: 93
  previous_employer: Alibaba DAMO Academy (2018-2021)
  research_focus: primary=out-of-distribution generalization, secondary=domain adaptation

Entity: researcher/astrid_dimitriou
  affiliation: Sapienza University of Rome
  publication_count: 23
  previous_employer: Adobe Research (2017-2020)
  research_focus: primary=interpretable ML, secondary=model explanation

Entity: researcher/pedro_vasiliev
  affiliation: Columbia University
  publication_count: 49
  previous_employer: Twitter Machine Learning (2019-2022)
  research_focus: primary=multimodal learning, secondary=vision-language models

Entity: researcher/anna_patel
  affiliation: Max Planck Institute for Informatics
  publication_count: 62
  previous_employer: Two Sigma Research (2019-2022)
  research_focus: primary=anomaly detection, secondary=time series analysis

Entity: researcher/shreya_kapoor
  affiliation: University of Amsterdam
  publication_count: 91
  previous_employer: OpenAI Research (2019-2022)
  research_focus: primary=reinforcement learning, secondary=robotics

Entity: researcher/arnav_reyes
  affiliation: INRIA Paris
  publication_count: 52
  previous_employer: Philips Research (2018-2021)
  research_focus: primary=summarization, secondary=abstractive generation

Entity: researcher/andrea_ahmadi
  affiliation: University of British Columbia
  publication_count: 25
  previous_employer: OpenAI Research (2019-2022)
  research_focus: primary=question answering, secondary=reading comprehension

Entity: researcher/lars_ndiaye
  affiliation: University of Helsinki
  publication_count: 16
  previous_employer: Cisco Research (2017-2020)
  research_focus: primary=reinforcement learning, secondary=robotics

Entity: researcher/dimitri_johansson
  affiliation: University of British Columbia
  publication_count: 76
  previous_employer: Qualcomm AI Research (2017-2020)
  research_focus: primary=self-supervised learning, secondary=contrastive methods

Entity: researcher/amara_christiansen
  affiliation: University of Melbourne
  publication_count: 39
  previous_employer: Siemens Research (2016-2019)
  research_focus: primary=active learning, secondary=experimental design

Entity: researcher/robin_bergmann
  affiliation: University of Washington
  publication_count: 44
  previous_employer: Google Brain (2016-2019)
  research_focus: primary=computational biology, secondary=protein structure prediction

Entity: researcher/noah_fontaine
  affiliation: Boston University
  publication_count: 95
  previous_employer: Huawei Noah Ark Lab (2018-2021)
  research_focus: primary=federated learning, secondary=privacy-preserving ML

Entity: researcher/gabriela_gomez
  affiliation: University of Helsinki
  publication_count: 34
  previous_employer: Two Sigma Research (2019-2022)
  research_focus: primary=video understanding, secondary=temporal modeling

Entity: researcher/sandra_vogt
  affiliation: Peking University
  publication_count: 53
  previous_employer: Facebook AI Research (2017-2020)
  research_focus: primary=graph neural networks, secondary=knowledge graphs

Entity: researcher/marco_nkosi
  affiliation: UC Berkeley
  publication_count: 16
  previous_employer: Alibaba DAMO Academy (2018-2021)
  research_focus: primary=recommendation systems, secondary=collaborative filtering

Entity: researcher/anisha_nilsson
  affiliation: Leiden University
  publication_count: 82
  previous_employer: Citadel Securities Research (2017-2020)
  research_focus: primary=multimodal learning, secondary=vision-language models

```