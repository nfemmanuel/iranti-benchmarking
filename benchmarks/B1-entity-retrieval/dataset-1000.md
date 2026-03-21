# B1 Extended Dataset - N=1000

**Benchmark:** B1 - Entity Fact Retrieval under Distractor Density
**Created:** 2026-03-21
**Entities:** 1000 (998 fictional distractors + researcher/alice_chen at position 400 + researcher/bob_okafor at position 750)
**Token estimate:** ~57,000

---

## Ground Truth (Needles)

**researcher/alice_chen** (pos 400/1000) - affiliation: MIT Computer Science | publication_count: 47 | previous_employer: OpenAI (2018-2021) | research_focus: natural language processing
**researcher/bob_okafor** (pos 750/1000) - affiliation: Stanford AI Lab | publication_count: 23 | previous_employer: DeepMind (2020-2023) | research_focus: computer vision

---

## Haystack Document - N=1000

```
RESEARCHER REGISTRY - 1000 ENTRIES

Entity: researcher/julien_petrov
  affiliation: Leiden University
  publication_count: 26
  previous_employer: Samsung AI Center (2019-2022)
  research_focus: primary=speech recognition, secondary=efficient deep learning

Entity: researcher/carlos_dawit
  affiliation: Purdue University
  publication_count: 53
  previous_employer: Jane Street Research (2018-2021)
  research_focus: primary=adversarial robustness, secondary=clinical decision support

Entity: researcher/simon_vidal
  affiliation: University of Copenhagen
  publication_count: 66
  previous_employer: IBM Research (2016-2019)
  research_focus: primary=reinforcement learning, secondary=protein structure prediction

Entity: researcher/sven_yoshida
  affiliation: Tokyo University
  publication_count: 53
  previous_employer: Baidu Research (2018-2021)
  research_focus: primary=speech recognition, secondary=privacy-preserving ML

Entity: researcher/lina_hansen
  affiliation: University of Helsinki
  publication_count: 47
  previous_employer: OpenAI Research (2019-2022)
  research_focus: primary=question answering, secondary=catastrophic forgetting

Entity: researcher/stephanie_vasquez
  affiliation: Northeastern University
  publication_count: 15
  previous_employer: Qualcomm AI Research (2017-2020)
  research_focus: primary=medical imaging, secondary=uncertainty quantification

Entity: researcher/julien_blum
  affiliation: KTH Royal Institute of Technology
  publication_count: 4
  previous_employer: Alibaba DAMO Academy (2018-2021)
  research_focus: primary=adversarial robustness, secondary=spoken dialog systems

Entity: researcher/james_vega
  affiliation: University of Sydney
  publication_count: 70
  previous_employer: IBM Research (2016-2019)
  research_focus: primary=reinforcement learning, secondary=program synthesis

Entity: researcher/lina_brown
  affiliation: NYU Courant Institute
  publication_count: 31
  previous_employer: Amazon AWS AI (2018-2021)
  research_focus: primary=out-of-distribution generalization, secondary=vision-language models

Entity: researcher/zara_sanchez
  affiliation: University of Washington
  publication_count: 68
  previous_employer: NVIDIA Research (2017-2020)
  research_focus: primary=code generation, secondary=object detection

Entity: researcher/ayaan_andersen
  affiliation: Montreal Institute for Learning Algorithms
  publication_count: 91
  previous_employer: Tencent AI Lab (2019-2022)
  research_focus: primary=graph neural networks, secondary=robotics

Entity: researcher/kate_dawit
  affiliation: University of Amsterdam
  publication_count: 83
  previous_employer: Google Research (2018-2021)
  research_focus: primary=federated learning, secondary=model explanation

Entity: researcher/hugo_fischer
  affiliation: Max Planck Institute for Informatics
  publication_count: 29
  previous_employer: Microsoft Research (2017-2020)
  research_focus: primary=multi-task learning, secondary=conversational AI

Entity: researcher/deepa_sanchez
  affiliation: TU Berlin
  publication_count: 55
  previous_employer: Facebook AI Research (2017-2020)
  research_focus: primary=adversarial robustness, secondary=domain adaptation

Entity: researcher/sebastian_sharma
  affiliation: UC Berkeley
  publication_count: 20
  previous_employer: Apple ML Research (2019-2022)
  research_focus: primary=commonsense reasoning, secondary=program synthesis

Entity: researcher/kai_fedorov
  affiliation: Cambridge University
  publication_count: 22
  previous_employer: Uber AI Labs (2017-2020)
  research_focus: primary=machine learning theory, secondary=knowledge graphs

Entity: researcher/claudia_richter
  affiliation: Cornell Tech
  publication_count: 75
  previous_employer: Tesla AI (2019-2022)
  research_focus: primary=federated learning, secondary=few-shot learning

Entity: researcher/mahsa_khan
  affiliation: Columbia University
  publication_count: 19
  previous_employer: Toyota Research Institute (2017-2020)
  research_focus: primary=question answering, secondary=knowledge graphs

Entity: researcher/sandra_choi
  affiliation: EPFL
  publication_count: 5
  previous_employer: Microsoft Research (2017-2020)
  research_focus: primary=multi-task learning, secondary=uncertainty quantification

Entity: researcher/delia_pereira
  affiliation: Peking University
  publication_count: 55
  previous_employer: Bosch Center for AI (2019-2022)
  research_focus: primary=interpretable ML, secondary=protein structure prediction

Entity: researcher/jason_vega
  affiliation: University of Washington
  publication_count: 8
  previous_employer: Toyota Research Institute (2017-2020)
  research_focus: primary=reinforcement learning, secondary=vision-language models

Entity: researcher/julian_sanchez
  affiliation: University of Amsterdam
  publication_count: 87
  previous_employer: Samsung AI Center (2019-2022)
  research_focus: primary=neural architecture search, secondary=conversational AI

Entity: researcher/sven_moreau
  affiliation: University of British Columbia
  publication_count: 96
  previous_employer: Tesla AI (2019-2022)
  research_focus: primary=machine learning theory, secondary=spoken dialog systems

Entity: researcher/wei_kowalski
  affiliation: EPFL
  publication_count: 60
  previous_employer: OpenAI Research (2019-2022)
  research_focus: primary=interpretable ML, secondary=structured prediction

Entity: researcher/laura_romano
  affiliation: Columbia University
  publication_count: 12
  previous_employer: Two Sigma Research (2019-2022)
  research_focus: primary=continual learning, secondary=counterfactual reasoning

Entity: researcher/sara_nakamura
  affiliation: Montreal Institute for Learning Algorithms
  publication_count: 72
  previous_employer: Facebook AI Research (2017-2020)
  research_focus: primary=information retrieval, secondary=knowledge grounding

Entity: researcher/erica_russo
  affiliation: EPFL
  publication_count: 56
  previous_employer: Amazon AWS AI (2018-2021)
  research_focus: primary=semantic parsing, secondary=counterfactual reasoning

Entity: researcher/jessica_zimmermann
  affiliation: University of Copenhagen
  publication_count: 89
  previous_employer: ByteDance AI Lab (2020-2023)
  research_focus: primary=question answering, secondary=spoken dialog systems

Entity: researcher/jessica_nielsen
  affiliation: Georgia Tech
  publication_count: 48
  previous_employer: Google Research (2018-2021)
  research_focus: primary=semantic parsing, secondary=clinical decision support

Entity: researcher/jacob_martinez
  affiliation: Georgia Tech
  publication_count: 89
  previous_employer: Amazon AWS AI (2018-2021)
  research_focus: primary=continual learning, secondary=dense retrieval

Entity: researcher/rahul_laurent
  affiliation: Hebrew University
  publication_count: 94
  previous_employer: Samsung AI Center (2019-2022)
  research_focus: primary=medical imaging, secondary=protein structure prediction

Entity: researcher/isabel_rashid
  affiliation: Cambridge University
  publication_count: 68
  previous_employer: Citadel Securities Research (2017-2020)
  research_focus: primary=natural language processing, secondary=spoken dialog systems

Entity: researcher/aaron_tremblay
  affiliation: University of Melbourne
  publication_count: 25
  previous_employer: Two Sigma Research (2019-2022)
  research_focus: primary=causal inference, secondary=dense retrieval

Entity: researcher/lauren_jensen
  affiliation: Virginia Tech
  publication_count: 98
  previous_employer: Tencent AI Lab (2019-2022)
  research_focus: primary=adversarial robustness, secondary=collaborative filtering

Entity: researcher/natalie_vasquez
  affiliation: University of Copenhagen
  publication_count: 84
  previous_employer: Uber AI Labs (2017-2020)
  research_focus: primary=dialogue systems, secondary=spoken dialog systems

Entity: researcher/tobias_andersen
  affiliation: University of Amsterdam
  publication_count: 13
  previous_employer: Google DeepMind (2020-2023)
  research_focus: primary=machine learning theory, secondary=catastrophic forgetting

Entity: researcher/andrea_rodriguez
  affiliation: Tokyo University
  publication_count: 75
  previous_employer: Uber AI Labs (2017-2020)
  research_focus: primary=causal inference, secondary=spoken dialog systems

Entity: researcher/victor_diop
  affiliation: Max Planck Institute for Informatics
  publication_count: 55
  previous_employer: NVIDIA Research (2017-2020)
  research_focus: primary=question answering, secondary=certified defenses

Entity: researcher/liang_ndiaye
  affiliation: NYU Courant Institute
  publication_count: 61
  previous_employer: Bosch Center for AI (2019-2022)
  research_focus: primary=federated learning, secondary=protein structure prediction

Entity: researcher/natalie_hansen
  affiliation: Columbia University
  publication_count: 30
  previous_employer: Twitter Machine Learning (2019-2022)
  research_focus: primary=out-of-distribution generalization, secondary=collaborative filtering

Entity: researcher/neha_petrov
  affiliation: Montreal Institute for Learning Algorithms
  publication_count: 77
  previous_employer: Qualcomm AI Research (2017-2020)
  research_focus: primary=graph neural networks, secondary=clinical decision support

Entity: researcher/christoph_christiansen
  affiliation: University of Michigan
  publication_count: 62
  previous_employer: Jane Street Research (2018-2021)
  research_focus: primary=self-supervised learning, secondary=machine translation

Entity: researcher/beatriz_ndiaye
  affiliation: Vector Institute
  publication_count: 13
  previous_employer: Berkeley AI Research Lab (2016-2019)
  research_focus: primary=information retrieval, secondary=conversational AI

Entity: researcher/thomas_acharya
  affiliation: University of Melbourne
  publication_count: 72
  previous_employer: Twitter Machine Learning (2019-2022)
  research_focus: primary=AI safety, secondary=conversational AI

Entity: researcher/akira_yilmaz
  affiliation: Hebrew University
  publication_count: 37
  previous_employer: Amazon AWS AI (2018-2021)
  research_focus: primary=Bayesian deep learning, secondary=privacy-preserving ML

Entity: researcher/noah_braun
  affiliation: MIT Computer Science
  publication_count: 10
  previous_employer: Berkeley AI Research Lab (2016-2019)
  research_focus: primary=interpretable ML, secondary=transfer learning

Entity: researcher/dimitri_weiss
  affiliation: EPFL
  publication_count: 24
  previous_employer: ByteDance AI Lab (2020-2023)
  research_focus: primary=meta-learning, secondary=object detection

Entity: researcher/shreya_rodriguez
  affiliation: Georgia Tech
  publication_count: 18
  previous_employer: Intel AI Lab (2016-2019)
  research_focus: primary=neural architecture search, secondary=knowledge graphs

Entity: researcher/fatimah_liu
  affiliation: Tokyo University
  publication_count: 13
  previous_employer: IBM Research (2016-2019)
  research_focus: primary=medical imaging, secondary=few-shot learning

Entity: researcher/natalie_gupta
  affiliation: Seoul National University
  publication_count: 87
  previous_employer: Citadel Securities Research (2017-2020)
  research_focus: primary=autonomous driving, secondary=robotics

Entity: researcher/tom_eriksson
  affiliation: NYU Courant Institute
  publication_count: 21
  previous_employer: Apple ML Research (2019-2022)
  research_focus: primary=multimodal learning, secondary=contrastive methods

Entity: researcher/arjun_bergmann
  affiliation: Allen Institute for AI
  publication_count: 86
  previous_employer: Bosch Center for AI (2019-2022)
  research_focus: primary=meta-learning, secondary=knowledge graphs

Entity: researcher/jacob_khan
  affiliation: Leiden University
  publication_count: 82
  previous_employer: Amazon AWS AI (2018-2021)
  research_focus: primary=code generation, secondary=uncertainty quantification

Entity: researcher/xiao_brown
  affiliation: Peking University
  publication_count: 84
  previous_employer: Alibaba DAMO Academy (2018-2021)
  research_focus: primary=semantic parsing, secondary=spoken dialog systems

Entity: researcher/grace_hansen
  affiliation: Cambridge University
  publication_count: 22
  previous_employer: Intel AI Lab (2016-2019)
  research_focus: primary=multimodal learning, secondary=conversational AI

Entity: researcher/marta_albers
  affiliation: INRIA Paris
  publication_count: 91
  previous_employer: OpenAI (2018-2021)
  research_focus: primary=neural architecture search, secondary=dense retrieval

Entity: researcher/zhao_kim
  affiliation: McGill University
  publication_count: 97
  previous_employer: OpenAI Research (2019-2022)
  research_focus: primary=AI safety, secondary=structured prediction

Entity: researcher/chiara_gonzalez
  affiliation: McGill University
  publication_count: 51
  previous_employer: Salesforce Research (2018-2021)
  research_focus: primary=meta-learning, secondary=uncertainty quantification

Entity: researcher/noah_bonnet
  affiliation: Max Planck Institute for Informatics
  publication_count: 6
  previous_employer: Waymo Research (2020-2023)
  research_focus: primary=AI safety, secondary=catastrophic forgetting

Entity: researcher/chen_ferrari
  affiliation: Carnegie Mellon University
  publication_count: 40
  previous_employer: Uber AI Labs (2017-2020)
  research_focus: primary=continual learning, secondary=counterfactual reasoning

Entity: researcher/bianca_sorensen
  affiliation: University of Toronto
  publication_count: 9
  previous_employer: Vector Institute (2018-2021)
  research_focus: primary=computational biology, secondary=knowledge graphs

Entity: researcher/pablo_muller
  affiliation: Peking University
  publication_count: 88
  previous_employer: Tesla AI (2019-2022)
  research_focus: primary=question answering, secondary=dense retrieval

Entity: researcher/alicia_pereira
  affiliation: University of Edinburgh
  publication_count: 82
  previous_employer: Samsung AI Center (2019-2022)
  research_focus: primary=summarization, secondary=contrastive methods

Entity: researcher/celine_almeida
  affiliation: EPFL
  publication_count: 98
  previous_employer: Huawei Noah Ark Lab (2018-2021)
  research_focus: primary=meta-learning, secondary=protein structure prediction

Entity: researcher/mark_kaur
  affiliation: Sapienza University of Rome
  publication_count: 56
  previous_employer: Microsoft Research (2017-2020)
  research_focus: primary=graph neural networks, secondary=spoken dialog systems

Entity: researcher/elias_laurent
  affiliation: University of Helsinki
  publication_count: 16
  previous_employer: Alibaba DAMO Academy (2018-2021)
  research_focus: primary=graph neural networks, secondary=machine translation

Entity: researcher/nathan_bauer
  affiliation: Georgia Tech
  publication_count: 20
  previous_employer: NVIDIA Research (2017-2020)
  research_focus: primary=summarization, secondary=conversational AI

Entity: researcher/gabriela_castellanos
  affiliation: Columbia University
  publication_count: 27
  previous_employer: Alibaba DAMO Academy (2018-2021)
  research_focus: primary=semantic parsing, secondary=privacy-preserving ML

Entity: researcher/aaron_bhatt
  affiliation: Max Planck Institute for Informatics
  publication_count: 61
  previous_employer: Microsoft Research (2015-2018)
  research_focus: primary=multi-task learning, secondary=knowledge graphs

Entity: researcher/noah_khan
  affiliation: Technion
  publication_count: 20
  previous_employer: Qualcomm AI Research (2017-2020)
  research_focus: primary=Bayesian deep learning, secondary=knowledge grounding

Entity: researcher/patrick_demir
  affiliation: Allen Institute for AI
  publication_count: 24
  previous_employer: Samsung AI Center (2019-2022)
  research_focus: primary=out-of-distribution generalization, secondary=vision-language models

Entity: researcher/neha_smith
  affiliation: University of Illinois Urbana-Champaign
  publication_count: 16
  previous_employer: Alibaba DAMO Academy (2018-2021)
  research_focus: primary=speech recognition, secondary=program synthesis

Entity: researcher/danielle_gupta
  affiliation: Montreal Institute for Learning Algorithms
  publication_count: 98
  previous_employer: Adobe Research (2017-2020)
  research_focus: primary=federated learning, secondary=knowledge graphs

Entity: researcher/sara_larsson
  affiliation: Hong Kong University of Science and Technology
  publication_count: 70
  previous_employer: Two Sigma Research (2019-2022)
  research_focus: primary=graph neural networks, secondary=knowledge grounding

Entity: researcher/milan_christiansen
  affiliation: University of Michigan
  publication_count: 71
  previous_employer: Samsung AI Center (2019-2022)
  research_focus: primary=neural architecture search, secondary=clinical decision support

Entity: researcher/sofia_romano
  affiliation: Sapienza University of Rome
  publication_count: 75
  previous_employer: Microsoft Research (2015-2018)
  research_focus: primary=interpretable ML, secondary=efficient deep learning

Entity: researcher/emre_nakamura
  affiliation: University of Helsinki
  publication_count: 46
  previous_employer: Intel AI Lab (2016-2019)
  research_focus: primary=meta-learning, secondary=spoken dialog systems

Entity: researcher/aryan_bauer
  affiliation: MIT Computer Science
  publication_count: 59
  previous_employer: Microsoft Research (2017-2020)
  research_focus: primary=continual learning, secondary=uncertainty quantification

Entity: researcher/cyrus_braun
  affiliation: EPFL
  publication_count: 27
  previous_employer: Twitter Machine Learning (2019-2022)
  research_focus: primary=medical imaging, secondary=structured prediction

Entity: researcher/saanvi_larsson
  affiliation: University of Helsinki
  publication_count: 71
  previous_employer: Uber AI Labs (2017-2020)
  research_focus: primary=natural language processing, secondary=spoken dialog systems

Entity: researcher/takahiro_pacheco
  affiliation: Caltech
  publication_count: 48
  previous_employer: Bosch Center for AI (2019-2022)
  research_focus: primary=machine learning theory, secondary=privacy-preserving ML

Entity: researcher/shreya_mishra
  affiliation: Columbia University
  publication_count: 29
  previous_employer: ByteDance AI Lab (2020-2023)
  research_focus: primary=multi-task learning, secondary=object detection

Entity: researcher/alexander_oh
  affiliation: Princeton CS
  publication_count: 81
  previous_employer: OpenAI Research (2019-2022)
  research_focus: primary=neural architecture search, secondary=abstractive generation

Entity: researcher/jessica_almeida
  affiliation: Tsinghua University
  publication_count: 52
  previous_employer: Adobe Research (2017-2020)
  research_focus: primary=out-of-distribution generalization, secondary=contrastive methods

Entity: researcher/charlotte_choi
  affiliation: Stanford University
  publication_count: 26
  previous_employer: Baidu Research (2018-2021)
  research_focus: primary=natural language processing, secondary=efficient deep learning

Entity: researcher/ingrid_larsson
  affiliation: University of Toronto
  publication_count: 86
  previous_employer: Google Research (2018-2021)
  research_focus: primary=meta-learning, secondary=protein structure prediction

Entity: researcher/beatriz_saha
  affiliation: University of British Columbia
  publication_count: 97
  previous_employer: Toyota Research Institute (2017-2020)
  research_focus: primary=reinforcement learning, secondary=time series analysis

Entity: researcher/kate_weiss
  affiliation: INRIA Paris
  publication_count: 75
  previous_employer: Salesforce Research (2018-2021)
  research_focus: primary=semantic parsing, secondary=uncertainty quantification

Entity: researcher/stefan_nkosi
  affiliation: Cambridge University
  publication_count: 38
  previous_employer: Jane Street Research (2018-2021)
  research_focus: primary=information retrieval, secondary=efficient deep learning

Entity: researcher/andrew_bergmann
  affiliation: University of Edinburgh
  publication_count: 45
  previous_employer: OpenAI (2018-2021)
  research_focus: primary=neural architecture search, secondary=certified defenses

Entity: researcher/grace_koch
  affiliation: McGill University
  publication_count: 89
  previous_employer: ByteDance AI Lab (2020-2023)
  research_focus: primary=speech recognition, secondary=transfer learning

Entity: researcher/aleksandra_zimmermann
  affiliation: Columbia University
  publication_count: 13
  previous_employer: Bosch Center for AI (2019-2022)
  research_focus: primary=multimodal learning, secondary=generalization bounds

Entity: researcher/tim_almeida
  affiliation: Vector Institute
  publication_count: 94
  previous_employer: ByteDance AI Lab (2020-2023)
  research_focus: primary=causal inference, secondary=protein structure prediction

Entity: researcher/zhao_nakamura
  affiliation: University of Michigan
  publication_count: 81
  previous_employer: Citadel Securities Research (2017-2020)
  research_focus: primary=multi-task learning, secondary=knowledge grounding

Entity: researcher/astrid_maier
  affiliation: Northeastern University
  publication_count: 30
  previous_employer: Microsoft Research (2015-2018)
  research_focus: primary=interpretable ML, secondary=value alignment

Entity: researcher/filip_schmid
  affiliation: Vector Institute
  publication_count: 47
  previous_employer: OpenAI Research (2019-2022)
  research_focus: primary=multimodal learning, secondary=sensor fusion

Entity: researcher/alessandro_braun
  affiliation: ETH Zurich
  publication_count: 85
  previous_employer: Facebook AI Research (2017-2020)
  research_focus: primary=AI safety, secondary=reading comprehension

Entity: researcher/kai_ibrahim
  affiliation: Chinese University of Hong Kong
  publication_count: 88
  previous_employer: Google Brain (2016-2019)
  research_focus: primary=computational biology, secondary=machine translation

Entity: researcher/bianca_nakamura
  affiliation: Cornell Tech
  publication_count: 89
  previous_employer: OpenAI (2018-2021)
  research_focus: primary=speech recognition, secondary=machine translation

Entity: researcher/kristina_maier
  affiliation: NYU Courant Institute
  publication_count: 92
  previous_employer: Uber AI Labs (2017-2020)
  research_focus: primary=graph neural networks, secondary=knowledge graphs

Entity: researcher/sofia_rodriguez
  affiliation: University of Amsterdam
  publication_count: 27
  previous_employer: Tencent AI Lab (2019-2022)
  research_focus: primary=machine learning theory, secondary=model explanation

Entity: researcher/rachel_dimitriou
  affiliation: University of Edinburgh
  publication_count: 71
  previous_employer: Waymo Research (2020-2023)
  research_focus: primary=reinforcement learning, secondary=certified defenses

Entity: researcher/tara_giordano
  affiliation: University of Edinburgh
  publication_count: 97
  previous_employer: Meta AI Research (2020-2023)
  research_focus: primary=meta-learning, secondary=object detection

Entity: researcher/valentina_zimmermann
  affiliation: University of Toronto
  publication_count: 36
  previous_employer: Qualcomm AI Research (2017-2020)
  research_focus: primary=summarization, secondary=model explanation

Entity: researcher/boris_malik
  affiliation: Montreal Institute for Learning Algorithms
  publication_count: 31
  previous_employer: Two Sigma Research (2019-2022)
  research_focus: primary=code generation, secondary=counterfactual reasoning

Entity: researcher/lena_kumar
  affiliation: Columbia University
  publication_count: 85
  previous_employer: NVIDIA Research (2017-2020)
  research_focus: primary=multi-task learning, secondary=collaborative filtering

Entity: researcher/finn_garcia
  affiliation: Peking University
  publication_count: 69
  previous_employer: Facebook AI Research (2017-2020)
  research_focus: primary=speech recognition, secondary=dense retrieval

Entity: researcher/marco_kaur
  affiliation: Seoul National University
  publication_count: 81
  previous_employer: Jane Street Research (2018-2021)
  research_focus: primary=code generation, secondary=robotics

Entity: researcher/lars_fuentes
  affiliation: Carnegie Mellon University
  publication_count: 47
  previous_employer: Huawei Noah Ark Lab (2018-2021)
  research_focus: primary=AI safety, secondary=value alignment

Entity: researcher/zhao_cruz
  affiliation: Technion
  publication_count: 15
  previous_employer: Alibaba DAMO Academy (2018-2021)
  research_focus: primary=natural language processing, secondary=collaborative filtering

Entity: researcher/astrid_cruz
  affiliation: Georgia Tech
  publication_count: 15
  previous_employer: Adobe Research (2017-2020)
  research_focus: primary=natural language processing, secondary=counterfactual reasoning

Entity: researcher/dakarai_eriksson
  affiliation: Purdue University
  publication_count: 37
  previous_employer: Waymo Research (2020-2023)
  research_focus: primary=federated learning, secondary=knowledge graphs

Entity: researcher/natalia_huang
  affiliation: University of Copenhagen
  publication_count: 18
  previous_employer: Tesla AI (2019-2022)
  research_focus: primary=reinforcement learning, secondary=machine translation

Entity: researcher/delia_mehta
  affiliation: Peking University
  publication_count: 68
  previous_employer: Google DeepMind (2020-2023)
  research_focus: primary=interpretable ML, secondary=collaborative filtering

Entity: researcher/ricardo_kumar
  affiliation: TU Berlin
  publication_count: 82
  previous_employer: Vector Institute (2018-2021)
  research_focus: primary=anomaly detection, secondary=spoken dialog systems

Entity: researcher/ivan_ferrari
  affiliation: University of British Columbia
  publication_count: 45
  previous_employer: Samsung AI Center (2019-2022)
  research_focus: primary=computer vision, secondary=reading comprehension

Entity: researcher/david_tremblay
  affiliation: Technion
  publication_count: 95
  previous_employer: Qualcomm AI Research (2017-2020)
  research_focus: primary=code generation, secondary=catastrophic forgetting

Entity: researcher/chiara_zimmermann
  affiliation: KTH Royal Institute of Technology
  publication_count: 26
  previous_employer: Jane Street Research (2018-2021)
  research_focus: primary=out-of-distribution generalization, secondary=reading comprehension

Entity: researcher/matteo_mishra
  affiliation: Stanford University
  publication_count: 81
  previous_employer: Vector Institute (2018-2021)
  research_focus: primary=natural language processing, secondary=privacy-preserving ML

Entity: researcher/boris_saha
  affiliation: University of Toronto
  publication_count: 72
  previous_employer: Tesla AI (2019-2022)
  research_focus: primary=computer vision, secondary=catastrophic forgetting

Entity: researcher/sabrina_weiss
  affiliation: Tokyo University
  publication_count: 26
  previous_employer: Berkeley AI Research Lab (2016-2019)
  research_focus: primary=causal inference, secondary=sensor fusion

Entity: researcher/xiao_diop
  affiliation: KTH Royal Institute of Technology
  publication_count: 41
  previous_employer: Google DeepMind (2020-2023)
  research_focus: primary=multimodal learning, secondary=clinical decision support

Entity: researcher/ingrid_romero
  affiliation: National University of Singapore
  publication_count: 24
  previous_employer: Google DeepMind (2020-2023)
  research_focus: primary=speech recognition, secondary=knowledge graphs

Entity: researcher/piotr_demir
  affiliation: Max Planck Institute for Informatics
  publication_count: 58
  previous_employer: Citadel Securities Research (2017-2020)
  research_focus: primary=anomaly detection, secondary=contrastive methods

Entity: researcher/jessica_patel
  affiliation: Hong Kong University of Science and Technology
  publication_count: 52
  previous_employer: Salesforce Research (2018-2021)
  research_focus: primary=AI safety, secondary=generalization bounds

Entity: researcher/dario_oh
  affiliation: University of Toronto
  publication_count: 37
  previous_employer: OpenAI (2018-2021)
  research_focus: primary=federated learning, secondary=knowledge grounding

Entity: researcher/aditya_park
  affiliation: Tsinghua University
  publication_count: 79
  previous_employer: Adobe Research (2017-2020)
  research_focus: primary=interpretable ML, secondary=value alignment

Entity: researcher/bianca_zimmermann
  affiliation: EPFL
  publication_count: 39
  previous_employer: Tencent AI Lab (2019-2022)
  research_focus: primary=medical imaging, secondary=structured prediction

Entity: researcher/brandon_fischer
  affiliation: NYU Courant Institute
  publication_count: 40
  previous_employer: Google Brain (2016-2019)
  research_focus: primary=medical imaging, secondary=contrastive methods

Entity: researcher/mario_vega
  affiliation: Princeton CS
  publication_count: 35
  previous_employer: Tencent AI Lab (2019-2022)
  research_focus: primary=adversarial robustness, secondary=transfer learning

Entity: researcher/mohamed_fernandez
  affiliation: University of Amsterdam
  publication_count: 59
  previous_employer: Bosch Center for AI (2019-2022)
  research_focus: primary=adversarial robustness, secondary=robotics

Entity: researcher/isabel_bauer
  affiliation: Vector Institute
  publication_count: 33
  previous_employer: Qualcomm AI Research (2017-2020)
  research_focus: primary=semantic parsing, secondary=conversational AI

Entity: researcher/andrew_stark
  affiliation: University of Amsterdam
  publication_count: 34
  previous_employer: Two Sigma Research (2019-2022)
  research_focus: primary=semantic parsing, secondary=object detection

Entity: researcher/boris_schmid
  affiliation: University of Toronto
  publication_count: 49
  previous_employer: Facebook AI Research (2017-2020)
  research_focus: primary=information retrieval, secondary=catastrophic forgetting

Entity: researcher/rajesh_oh
  affiliation: Virginia Tech
  publication_count: 72
  previous_employer: Google DeepMind (2020-2023)
  research_focus: primary=meta-learning, secondary=robotics

Entity: researcher/akira_jung
  affiliation: Virginia Tech
  publication_count: 5
  previous_employer: ByteDance AI Lab (2020-2023)
  research_focus: primary=multimodal learning, secondary=spoken dialog systems

Entity: researcher/rajesh_vasiliev
  affiliation: University of Sydney
  publication_count: 67
  previous_employer: Google Research (2018-2021)
  research_focus: primary=meta-learning, secondary=spoken dialog systems

Entity: researcher/tara_bonnet
  affiliation: UT Austin
  publication_count: 23
  previous_employer: Alibaba DAMO Academy (2018-2021)
  research_focus: primary=code generation, secondary=knowledge graphs

Entity: researcher/boris_wang
  affiliation: EPFL
  publication_count: 81
  previous_employer: Google Brain (2016-2019)
  research_focus: primary=recommendation systems, secondary=few-shot learning

Entity: researcher/sven_bergmann
  affiliation: UC Berkeley
  publication_count: 84
  previous_employer: Google DeepMind (2020-2023)
  research_focus: primary=causal inference, secondary=clinical decision support

Entity: researcher/emma_wolf
  affiliation: Tokyo University
  publication_count: 67
  previous_employer: Facebook AI Research (2017-2020)
  research_focus: primary=interpretable ML, secondary=counterfactual reasoning

Entity: researcher/neha_novak
  affiliation: Princeton CS
  publication_count: 92
  previous_employer: Google DeepMind (2020-2023)
  research_focus: primary=autonomous driving, secondary=dense retrieval

Entity: researcher/hugo_wu
  affiliation: Tokyo University
  publication_count: 72
  previous_employer: IBM Research (2016-2019)
  research_focus: primary=summarization, secondary=clinical decision support

Entity: researcher/karin_lee
  affiliation: Allen Institute for AI
  publication_count: 36
  previous_employer: Qualcomm AI Research (2017-2020)
  research_focus: primary=graph neural networks, secondary=abstractive generation

Entity: researcher/anna_popescu
  affiliation: Hebrew University
  publication_count: 96
  previous_employer: Salesforce Research (2018-2021)
  research_focus: primary=autonomous driving, secondary=catastrophic forgetting

Entity: researcher/pablo_meyer
  affiliation: Carnegie Mellon University
  publication_count: 75
  previous_employer: NVIDIA Research (2017-2020)
  research_focus: primary=anomaly detection, secondary=few-shot learning

Entity: researcher/alexei_kumar
  affiliation: University of Washington
  publication_count: 90
  previous_employer: Google Brain (2016-2019)
  research_focus: primary=neural architecture search, secondary=knowledge graphs

Entity: researcher/matias_kang
  affiliation: Columbia University
  publication_count: 45
  previous_employer: Huawei Noah Ark Lab (2018-2021)
  research_focus: primary=causal inference, secondary=domain adaptation

Entity: researcher/julian_gomez
  affiliation: Columbia University
  publication_count: 51
  previous_employer: Amazon AWS AI (2018-2021)
  research_focus: primary=semantic parsing, secondary=machine translation

Entity: researcher/charlotte_wang
  affiliation: University of Sydney
  publication_count: 39
  previous_employer: Qualcomm AI Research (2017-2020)
  research_focus: primary=recommendation systems, secondary=conversational AI

Entity: researcher/hassan_hansen
  affiliation: University of Helsinki
  publication_count: 22
  previous_employer: Microsoft Research (2017-2020)
  research_focus: primary=Bayesian deep learning, secondary=transfer learning

Entity: researcher/julian_weiss
  affiliation: University of Zurich
  publication_count: 23
  previous_employer: Snap Research (2018-2021)
  research_focus: primary=medical imaging, secondary=spoken dialog systems

Entity: researcher/marco_esposito
  affiliation: University of British Columbia
  publication_count: 54
  previous_employer: Berkeley AI Research Lab (2016-2019)
  research_focus: primary=information retrieval, secondary=few-shot learning

Entity: researcher/kate_vega
  affiliation: Peking University
  publication_count: 31
  previous_employer: Microsoft Research (2015-2018)
  research_focus: primary=Bayesian deep learning, secondary=robotics

Entity: researcher/dilnoza_kowalski
  affiliation: INRIA Paris
  publication_count: 24
  previous_employer: Adobe Research (2017-2020)
  research_focus: primary=information retrieval, secondary=sensor fusion

Entity: researcher/kai_kaur
  affiliation: ETH Zurich
  publication_count: 27
  previous_employer: Microsoft Research (2017-2020)
  research_focus: primary=Bayesian deep learning, secondary=vision-language models

Entity: researcher/andrea_dawit
  affiliation: Montreal Institute for Learning Algorithms
  publication_count: 52
  previous_employer: Baidu Research (2018-2021)
  research_focus: primary=dialogue systems, secondary=vision-language models

Entity: researcher/ethan_saito
  affiliation: Allen Institute for AI
  publication_count: 4
  previous_employer: NVIDIA Research (2017-2020)
  research_focus: primary=Bayesian deep learning, secondary=conversational AI

Entity: researcher/natalia_rossi
  affiliation: Hong Kong University of Science and Technology
  publication_count: 59
  previous_employer: Tesla AI (2019-2022)
  research_focus: primary=code generation, secondary=certified defenses

Entity: researcher/tim_guo
  affiliation: Princeton CS
  publication_count: 65
  previous_employer: Toyota Research Institute (2017-2020)
  research_focus: primary=code generation, secondary=sensor fusion

Entity: researcher/carlos_singh
  affiliation: University of Sydney
  publication_count: 27
  previous_employer: Snap Research (2018-2021)
  research_focus: primary=recommendation systems, secondary=clinical decision support

Entity: researcher/markus_smith
  affiliation: Leiden University
  publication_count: 42
  previous_employer: Citadel Securities Research (2017-2020)
  research_focus: primary=code generation, secondary=collaborative filtering

Entity: researcher/paula_schneider
  affiliation: Oxford University
  publication_count: 65
  previous_employer: Google DeepMind (2020-2023)
  research_focus: primary=meta-learning, secondary=catastrophic forgetting

Entity: researcher/sabrina_schmid
  affiliation: Cambridge University
  publication_count: 48
  previous_employer: Intel AI Lab (2016-2019)
  research_focus: primary=speech recognition, secondary=machine translation

Entity: researcher/jessica_saha
  affiliation: Tsinghua University
  publication_count: 11
  previous_employer: IBM Research (2016-2019)
  research_focus: primary=semantic parsing, secondary=privacy-preserving ML

Entity: researcher/yuki_fedorov
  affiliation: KTH Royal Institute of Technology
  publication_count: 58
  previous_employer: Citadel Securities Research (2017-2020)
  research_focus: primary=commonsense reasoning, secondary=knowledge grounding

Entity: researcher/victor_abdullah
  affiliation: NYU Courant Institute
  publication_count: 79
  previous_employer: IBM Research (2016-2019)
  research_focus: primary=machine learning theory, secondary=privacy-preserving ML

Entity: researcher/diego_kumar
  affiliation: Seoul National University
  publication_count: 94
  previous_employer: Microsoft Research (2017-2020)
  research_focus: primary=natural language processing, secondary=catastrophic forgetting

Entity: researcher/amara_jain
  affiliation: Georgia Tech
  publication_count: 32
  previous_employer: Baidu Research (2018-2021)
  research_focus: primary=computer vision, secondary=spoken dialog systems

Entity: researcher/markus_acharya
  affiliation: University of Sydney
  publication_count: 37
  previous_employer: Qualcomm AI Research (2017-2020)
  research_focus: primary=graph neural networks, secondary=domain adaptation

Entity: researcher/jana_nkosi
  affiliation: Peking University
  publication_count: 35
  previous_employer: Uber AI Labs (2017-2020)
  research_focus: primary=commonsense reasoning, secondary=machine translation

Entity: researcher/rebecca_sato
  affiliation: Caltech
  publication_count: 78
  previous_employer: Google DeepMind (2020-2023)
  research_focus: primary=machine learning theory, secondary=abstractive generation

Entity: researcher/deepa_rashid
  affiliation: EPFL
  publication_count: 51
  previous_employer: Berkeley AI Research Lab (2016-2019)
  research_focus: primary=commonsense reasoning, secondary=knowledge graphs

Entity: researcher/sophia_sekar
  affiliation: Hong Kong University of Science and Technology
  publication_count: 42
  previous_employer: Qualcomm AI Research (2017-2020)
  research_focus: primary=Bayesian deep learning, secondary=conversational AI

Entity: researcher/magdalena_albers
  affiliation: Stanford University
  publication_count: 36
  previous_employer: Citadel Securities Research (2017-2020)
  research_focus: primary=anomaly detection, secondary=program synthesis

Entity: researcher/arnav_ndiaye
  affiliation: Stanford University
  publication_count: 58
  previous_employer: Toyota Research Institute (2017-2020)
  research_focus: primary=machine learning theory, secondary=sensor fusion

Entity: researcher/sofia_abdullah
  affiliation: Tokyo University
  publication_count: 49
  previous_employer: Toyota Research Institute (2017-2020)
  research_focus: primary=graph neural networks, secondary=value alignment

Entity: researcher/ilaria_lim
  affiliation: Tsinghua University
  publication_count: 37
  previous_employer: Bosch Center for AI (2019-2022)
  research_focus: primary=continual learning, secondary=knowledge graphs

Entity: researcher/oscar_khan
  affiliation: University of Amsterdam
  publication_count: 72
  previous_employer: OpenAI Research (2019-2022)
  research_focus: primary=medical imaging, secondary=robotics

Entity: researcher/saanvi_singh
  affiliation: ETH Zurich
  publication_count: 91
  previous_employer: IBM Research (2016-2019)
  research_focus: primary=reinforcement learning, secondary=generalization bounds

Entity: researcher/isabel_popescu
  affiliation: Tsinghua University
  publication_count: 32
  previous_employer: Adobe Research (2017-2020)
  research_focus: primary=question answering, secondary=object detection

Entity: researcher/brandon_weber
  affiliation: KTH Royal Institute of Technology
  publication_count: 54
  previous_employer: Amazon AWS AI (2018-2021)
  research_focus: primary=adversarial robustness, secondary=abstractive generation

Entity: researcher/ricardo_acharya
  affiliation: Peking University
  publication_count: 44
  previous_employer: IBM Research (2016-2019)
  research_focus: primary=question answering, secondary=model explanation

Entity: researcher/eva_stark
  affiliation: University of Washington
  publication_count: 25
  previous_employer: Google Brain (2016-2019)
  research_focus: primary=multimodal learning, secondary=clinical decision support

Entity: researcher/andrei_ghosh
  affiliation: University of Amsterdam
  publication_count: 49
  previous_employer: Qualcomm AI Research (2017-2020)
  research_focus: primary=computer vision, secondary=privacy-preserving ML

Entity: researcher/andrei_flores
  affiliation: Hong Kong University of Science and Technology
  publication_count: 49
  previous_employer: Salesforce Research (2018-2021)
  research_focus: primary=causal inference, secondary=efficient deep learning

Entity: researcher/hao_klein
  affiliation: University of Michigan
  publication_count: 36
  previous_employer: Alibaba DAMO Academy (2018-2021)
  research_focus: primary=computer vision, secondary=knowledge grounding

Entity: researcher/ayaan_zhou
  affiliation: KTH Royal Institute of Technology
  publication_count: 26
  previous_employer: Google Research (2018-2021)
  research_focus: primary=reinforcement learning, secondary=conversational AI

Entity: researcher/nour_ibrahim
  affiliation: Vector Institute
  publication_count: 53
  previous_employer: Toyota Research Institute (2017-2020)
  research_focus: primary=Bayesian deep learning, secondary=privacy-preserving ML

Entity: researcher/paula_khan
  affiliation: Technion
  publication_count: 69
  previous_employer: Snap Research (2018-2021)
  research_focus: primary=speech recognition, secondary=certified defenses

Entity: researcher/karin_ivanova
  affiliation: UT Austin
  publication_count: 40
  previous_employer: Jane Street Research (2018-2021)
  research_focus: primary=recommendation systems, secondary=object detection

Entity: researcher/stephanie_jung
  affiliation: Peking University
  publication_count: 63
  previous_employer: Baidu Research (2018-2021)
  research_focus: primary=question answering, secondary=generalization bounds

Entity: researcher/mohamed_bhatt
  affiliation: MIT Computer Science
  publication_count: 29
  previous_employer: Twitter Machine Learning (2019-2022)
  research_focus: primary=graph neural networks, secondary=reading comprehension

Entity: researcher/lars_albers
  affiliation: ETH Zurich
  publication_count: 25
  previous_employer: Google Brain (2016-2019)
  research_focus: primary=reinforcement learning, secondary=efficient deep learning

Entity: researcher/arjun_fedorov
  affiliation: University of Toronto
  publication_count: 14
  previous_employer: Google Brain (2016-2019)
  research_focus: primary=reinforcement learning, secondary=vision-language models

Entity: researcher/eva_patel
  affiliation: Tokyo University
  publication_count: 26
  previous_employer: ByteDance AI Lab (2020-2023)
  research_focus: primary=meta-learning, secondary=model explanation

Entity: researcher/omar_braun
  affiliation: University of Washington
  publication_count: 64
  previous_employer: IBM Research (2016-2019)
  research_focus: primary=computational biology, secondary=transfer learning

Entity: researcher/lina_nakamura
  affiliation: University of Toronto
  publication_count: 49
  previous_employer: NVIDIA Research (2017-2020)
  research_focus: primary=commonsense reasoning, secondary=sensor fusion

Entity: researcher/hannah_mishra
  affiliation: MIT Computer Science
  publication_count: 85
  previous_employer: Baidu Research (2018-2021)
  research_focus: primary=code generation, secondary=clinical decision support

Entity: researcher/danielle_bonnet
  affiliation: KTH Royal Institute of Technology
  publication_count: 44
  previous_employer: Adobe Research (2017-2020)
  research_focus: primary=multi-task learning, secondary=program synthesis

Entity: researcher/lisa_durand
  affiliation: KTH Royal Institute of Technology
  publication_count: 57
  previous_employer: Baidu Research (2018-2021)
  research_focus: primary=adversarial robustness, secondary=generalization bounds

Entity: researcher/alicia_gomez
  affiliation: Cambridge University
  publication_count: 27
  previous_employer: IBM Research (2016-2019)
  research_focus: primary=anomaly detection, secondary=privacy-preserving ML

Entity: researcher/christoph_rossi
  affiliation: University of Toronto
  publication_count: 79
  previous_employer: Salesforce Research (2018-2021)
  research_focus: primary=summarization, secondary=robotics

Entity: researcher/yuki_klein
  affiliation: Sapienza University of Rome
  publication_count: 72
  previous_employer: Google Brain (2016-2019)
  research_focus: primary=speech recognition, secondary=clinical decision support

Entity: researcher/paula_saito
  affiliation: Leiden University
  publication_count: 62
  previous_employer: Twitter Machine Learning (2019-2022)
  research_focus: primary=medical imaging, secondary=vision-language models

Entity: researcher/nicolas_kumar
  affiliation: McGill University
  publication_count: 20
  previous_employer: Snap Research (2018-2021)
  research_focus: primary=multi-task learning, secondary=contrastive methods

Entity: researcher/isabel_silva
  affiliation: University of Michigan
  publication_count: 69
  previous_employer: OpenAI (2018-2021)
  research_focus: primary=meta-learning, secondary=structured prediction

Entity: researcher/carlos_cheng
  affiliation: Hong Kong University of Science and Technology
  publication_count: 12
  previous_employer: Amazon AWS AI (2018-2021)
  research_focus: primary=question answering, secondary=program synthesis

Entity: researcher/elena_vasquez
  affiliation: Sapienza University of Rome
  publication_count: 78
  previous_employer: Tencent AI Lab (2019-2022)
  research_focus: primary=federated learning, secondary=few-shot learning

Entity: researcher/robin_malik
  affiliation: Stanford University
  publication_count: 40
  previous_employer: Bosch Center for AI (2019-2022)
  research_focus: primary=information retrieval, secondary=knowledge graphs

Entity: researcher/saanvi_osei
  affiliation: Leiden University
  publication_count: 10
  previous_employer: Microsoft Research (2015-2018)
  research_focus: primary=semantic parsing, secondary=program synthesis

Entity: researcher/daniel_tan
  affiliation: Columbia University
  publication_count: 50
  previous_employer: Facebook AI Research (2017-2020)
  research_focus: primary=multimodal learning, secondary=catastrophic forgetting

Entity: researcher/charlotte_singh
  affiliation: University of Helsinki
  publication_count: 63
  previous_employer: Amazon AWS AI (2018-2021)
  research_focus: primary=out-of-distribution generalization, secondary=uncertainty quantification

Entity: researcher/javier_koch
  affiliation: Chinese University of Hong Kong
  publication_count: 39
  previous_employer: Twitter Machine Learning (2019-2022)
  research_focus: primary=speech recognition, secondary=efficient deep learning

Entity: researcher/patrick_suzuki
  affiliation: Oxford University
  publication_count: 97
  previous_employer: Qualcomm AI Research (2017-2020)
  research_focus: primary=AI safety, secondary=sensor fusion

Entity: researcher/neha_fernandez
  affiliation: University of Edinburgh
  publication_count: 86
  previous_employer: Salesforce Research (2018-2021)
  research_focus: primary=anomaly detection, secondary=collaborative filtering

Entity: researcher/clara_jung
  affiliation: University of Copenhagen
  publication_count: 42
  previous_employer: Google Brain (2016-2019)
  research_focus: primary=commonsense reasoning, secondary=transfer learning

Entity: researcher/liang_lopez
  affiliation: Tokyo University
  publication_count: 5
  previous_employer: Bosch Center for AI (2019-2022)
  research_focus: primary=natural language processing, secondary=few-shot learning

Entity: researcher/boris_vidal
  affiliation: KTH Royal Institute of Technology
  publication_count: 15
  previous_employer: Facebook AI Research (2017-2020)
  research_focus: primary=adversarial robustness, secondary=model explanation

Entity: researcher/victoria_tang
  affiliation: University of Helsinki
  publication_count: 81
  previous_employer: NVIDIA Research (2017-2020)
  research_focus: primary=question answering, secondary=contrastive methods

Entity: researcher/javier_ibrahim
  affiliation: Stanford University
  publication_count: 69
  previous_employer: OpenAI (2018-2021)
  research_focus: primary=federated learning, secondary=time series analysis

Entity: researcher/ashwin_zuberi
  affiliation: Technion
  publication_count: 43
  previous_employer: Two Sigma Research (2019-2022)
  research_focus: primary=semantic parsing, secondary=catastrophic forgetting

Entity: researcher/julian_yilmaz
  affiliation: Sapienza University of Rome
  publication_count: 98
  previous_employer: Intel AI Lab (2016-2019)
  research_focus: primary=semantic parsing, secondary=machine translation

Entity: researcher/patrick_cruz
  affiliation: University of Zurich
  publication_count: 79
  previous_employer: Toyota Research Institute (2017-2020)
  research_focus: primary=recommendation systems, secondary=efficient deep learning

Entity: researcher/isabel_nakamura
  affiliation: University of British Columbia
  publication_count: 90
  previous_employer: Google Brain (2016-2019)
  research_focus: primary=machine learning theory, secondary=conversational AI

Entity: researcher/benjamin_gomez
  affiliation: University of Michigan
  publication_count: 94
  previous_employer: Uber AI Labs (2017-2020)
  research_focus: primary=multimodal learning, secondary=structured prediction

Entity: researcher/nathan_jin
  affiliation: UT Austin
  publication_count: 76
  previous_employer: Qualcomm AI Research (2017-2020)
  research_focus: primary=information retrieval, secondary=dense retrieval

Entity: researcher/amara_moreau
  affiliation: INRIA Paris
  publication_count: 89
  previous_employer: Snap Research (2018-2021)
  research_focus: primary=speech recognition, secondary=abstractive generation

Entity: researcher/erica_burger
  affiliation: Cornell Tech
  publication_count: 79
  previous_employer: OpenAI Research (2019-2022)
  research_focus: primary=graph neural networks, secondary=robotics

Entity: researcher/jessica_hoffmann
  affiliation: Technion
  publication_count: 92
  previous_employer: Apple ML Research (2019-2022)
  research_focus: primary=self-supervised learning, secondary=spoken dialog systems

Entity: researcher/nadia_rossi
  affiliation: University of Amsterdam
  publication_count: 17
  previous_employer: OpenAI Research (2019-2022)
  research_focus: primary=semantic parsing, secondary=structured prediction

Entity: researcher/andrzej_ndiaye
  affiliation: Vector Institute
  publication_count: 22
  previous_employer: Samsung AI Center (2019-2022)
  research_focus: primary=information retrieval, secondary=abstractive generation

Entity: researcher/marina_christiansen
  affiliation: Max Planck Institute for Informatics
  publication_count: 35
  previous_employer: Two Sigma Research (2019-2022)
  research_focus: primary=reinforcement learning, secondary=counterfactual reasoning

Entity: researcher/lucas_ivanova
  affiliation: KTH Royal Institute of Technology
  publication_count: 97
  previous_employer: Berkeley AI Research Lab (2016-2019)
  research_focus: primary=question answering, secondary=value alignment

Entity: researcher/kristina_yoshida
  affiliation: Tsinghua University
  publication_count: 97
  previous_employer: Amazon AWS AI (2018-2021)
  research_focus: primary=code generation, secondary=collaborative filtering

Entity: researcher/carlos_khan
  affiliation: Hebrew University
  publication_count: 63
  previous_employer: Qualcomm AI Research (2017-2020)
  research_focus: primary=federated learning, secondary=certified defenses

Entity: researcher/javier_petrov
  affiliation: University of Toronto
  publication_count: 83
  previous_employer: Two Sigma Research (2019-2022)
  research_focus: primary=out-of-distribution generalization, secondary=object detection

Entity: researcher/deepa_solis
  affiliation: University of Melbourne
  publication_count: 72
  previous_employer: Google Brain (2016-2019)
  research_focus: primary=multi-task learning, secondary=collaborative filtering

Entity: researcher/sandra_rossi
  affiliation: UC Berkeley
  publication_count: 90
  previous_employer: Baidu Research (2018-2021)
  research_focus: primary=self-supervised learning, secondary=knowledge grounding

Entity: researcher/arnav_sanchez
  affiliation: National University of Singapore
  publication_count: 56
  previous_employer: Qualcomm AI Research (2017-2020)
  research_focus: primary=AI safety, secondary=machine translation

Entity: researcher/cyrus_kapoor
  affiliation: University of Michigan
  publication_count: 72
  previous_employer: Bosch Center for AI (2019-2022)
  research_focus: primary=reinforcement learning, secondary=knowledge graphs

Entity: researcher/caroline_kapoor
  affiliation: INRIA Paris
  publication_count: 87
  previous_employer: Vector Institute (2018-2021)
  research_focus: primary=Bayesian deep learning, secondary=sensor fusion

Entity: researcher/andrew_yilmaz
  affiliation: University of Helsinki
  publication_count: 85
  previous_employer: Qualcomm AI Research (2017-2020)
  research_focus: primary=meta-learning, secondary=object detection

Entity: researcher/victor_ivanova
  affiliation: KTH Royal Institute of Technology
  publication_count: 55
  previous_employer: Facebook AI Research (2017-2020)
  research_focus: primary=computational biology, secondary=machine translation

Entity: researcher/hao_vidal
  affiliation: Georgia Tech
  publication_count: 38
  previous_employer: Toyota Research Institute (2017-2020)
  research_focus: primary=Bayesian deep learning, secondary=generalization bounds

Entity: researcher/emma_sekar
  affiliation: University of Sydney
  publication_count: 51
  previous_employer: Huawei Noah Ark Lab (2018-2021)
  research_focus: primary=causal inference, secondary=knowledge grounding

Entity: researcher/zachary_giordano
  affiliation: Stanford University
  publication_count: 13
  previous_employer: Two Sigma Research (2019-2022)
  research_focus: primary=commonsense reasoning, secondary=object detection

Entity: researcher/marta_muller
  affiliation: EPFL
  publication_count: 63
  previous_employer: Google DeepMind (2020-2023)
  research_focus: primary=multi-task learning, secondary=reading comprehension

Entity: researcher/tim_bonnet
  affiliation: University of Washington
  publication_count: 24
  previous_employer: Uber AI Labs (2017-2020)
  research_focus: primary=anomaly detection, secondary=knowledge grounding

Entity: researcher/rafael_pereira
  affiliation: MIT Computer Science
  publication_count: 28
  previous_employer: Twitter Machine Learning (2019-2022)
  research_focus: primary=Bayesian deep learning, secondary=value alignment

Entity: researcher/lucia_wolf
  affiliation: University of Zurich
  publication_count: 97
  previous_employer: Huawei Noah Ark Lab (2018-2021)
  research_focus: primary=AI safety, secondary=object detection

Entity: researcher/danielle_zhou
  affiliation: ETH Zurich
  publication_count: 67
  previous_employer: Jane Street Research (2018-2021)
  research_focus: primary=question answering, secondary=privacy-preserving ML

Entity: researcher/delia_gomez
  affiliation: Northeastern University
  publication_count: 64
  previous_employer: Berkeley AI Research Lab (2016-2019)
  research_focus: primary=autonomous driving, secondary=generalization bounds

Entity: researcher/lucas_stefanov
  affiliation: McGill University
  publication_count: 95
  previous_employer: Apple ML Research (2019-2022)
  research_focus: primary=machine learning theory, secondary=object detection

Entity: researcher/vera_vasquez
  affiliation: Max Planck Institute for Informatics
  publication_count: 33
  previous_employer: Samsung AI Center (2019-2022)
  research_focus: primary=federated learning, secondary=certified defenses

Entity: researcher/sven_fischer
  affiliation: Princeton CS
  publication_count: 6
  previous_employer: Salesforce Research (2018-2021)
  research_focus: primary=dialogue systems, secondary=certified defenses

Entity: researcher/isabel_sekar
  affiliation: Georgia Tech
  publication_count: 52
  previous_employer: ByteDance AI Lab (2020-2023)
  research_focus: primary=information retrieval, secondary=value alignment

Entity: researcher/hannah_dimitriou
  affiliation: Vector Institute
  publication_count: 85
  previous_employer: Microsoft Research (2017-2020)
  research_focus: primary=multi-task learning, secondary=clinical decision support

Entity: researcher/jason_kaur
  affiliation: NYU Courant Institute
  publication_count: 44
  previous_employer: Google Research (2018-2021)
  research_focus: primary=dialogue systems, secondary=machine translation

Entity: researcher/zhao_ferrari
  affiliation: Allen Institute for AI
  publication_count: 5
  previous_employer: Berkeley AI Research Lab (2016-2019)
  research_focus: primary=computational biology, secondary=transfer learning

Entity: researcher/lars_petrov
  affiliation: Tokyo University
  publication_count: 33
  previous_employer: Microsoft Research (2015-2018)
  research_focus: primary=multimodal learning, secondary=domain adaptation

Entity: researcher/nicolas_gonzalez
  affiliation: Princeton CS
  publication_count: 17
  previous_employer: Google DeepMind (2020-2023)
  research_focus: primary=code generation, secondary=contrastive methods

Entity: researcher/jacob_rashid
  affiliation: Tsinghua University
  publication_count: 92
  previous_employer: Uber AI Labs (2017-2020)
  research_focus: primary=computer vision, secondary=structured prediction

Entity: researcher/erica_fuentes
  affiliation: University of Toronto
  publication_count: 35
  previous_employer: Microsoft Research (2017-2020)
  research_focus: primary=multimodal learning, secondary=counterfactual reasoning

Entity: researcher/aryan_vega
  affiliation: University of Copenhagen
  publication_count: 59
  previous_employer: Jane Street Research (2018-2021)
  research_focus: primary=reinforcement learning, secondary=generalization bounds

Entity: researcher/giulia_suzuki
  affiliation: University of Sydney
  publication_count: 32
  previous_employer: Apple ML Research (2019-2022)
  research_focus: primary=machine learning theory, secondary=vision-language models

Entity: researcher/carlos_osei
  affiliation: Oxford University
  publication_count: 45
  previous_employer: Two Sigma Research (2019-2022)
  research_focus: primary=medical imaging, secondary=certified defenses

Entity: researcher/kristina_choi
  affiliation: University of Zurich
  publication_count: 66
  previous_employer: NVIDIA Research (2017-2020)
  research_focus: primary=speech recognition, secondary=domain adaptation

Entity: researcher/rajesh_vogt
  affiliation: University of Edinburgh
  publication_count: 66
  previous_employer: Meta AI Research (2020-2023)
  research_focus: primary=AI safety, secondary=program synthesis

Entity: researcher/akira_gomez
  affiliation: MIT Computer Science
  publication_count: 12
  previous_employer: Samsung AI Center (2019-2022)
  research_focus: primary=code generation, secondary=domain adaptation

Entity: researcher/mario_santos
  affiliation: Cornell Tech
  publication_count: 79
  previous_employer: Bosch Center for AI (2019-2022)
  research_focus: primary=multi-task learning, secondary=sensor fusion

Entity: researcher/lena_hansen
  affiliation: Vector Institute
  publication_count: 81
  previous_employer: Berkeley AI Research Lab (2016-2019)
  research_focus: primary=speech recognition, secondary=counterfactual reasoning

Entity: researcher/zachary_santos
  affiliation: Cambridge University
  publication_count: 4
  previous_employer: Microsoft Research (2017-2020)
  research_focus: primary=question answering, secondary=uncertainty quantification

Entity: researcher/josef_kumar
  affiliation: University of Michigan
  publication_count: 42
  previous_employer: Waymo Research (2020-2023)
  research_focus: primary=semantic parsing, secondary=vision-language models

Entity: researcher/arnav_ferrari
  affiliation: UC Berkeley
  publication_count: 13
  previous_employer: Tesla AI (2019-2022)
  research_focus: primary=AI safety, secondary=dense retrieval

Entity: researcher/neha_nielsen
  affiliation: Georgia Tech
  publication_count: 27
  previous_employer: Samsung AI Center (2019-2022)
  research_focus: primary=AI safety, secondary=sensor fusion

Entity: researcher/kristina_gupta
  affiliation: UC Berkeley
  publication_count: 78
  previous_employer: Google DeepMind (2020-2023)
  research_focus: primary=speech recognition, secondary=vision-language models

Entity: researcher/aaron_narasimhan
  affiliation: Technion
  publication_count: 61
  previous_employer: Salesforce Research (2018-2021)
  research_focus: primary=natural language processing, secondary=sensor fusion

Entity: researcher/jason_ibrahim
  affiliation: UT Austin
  publication_count: 57
  previous_employer: Adobe Research (2017-2020)
  research_focus: primary=self-supervised learning, secondary=vision-language models

Entity: researcher/nikita_liu
  affiliation: Chinese University of Hong Kong
  publication_count: 33
  previous_employer: OpenAI (2018-2021)
  research_focus: primary=semantic parsing, secondary=uncertainty quantification

Entity: researcher/anders_abdullah
  affiliation: ETH Zurich
  publication_count: 13
  previous_employer: Microsoft Research (2017-2020)
  research_focus: primary=multimodal learning, secondary=knowledge grounding

Entity: researcher/rosa_ramos
  affiliation: UT Austin
  publication_count: 73
  previous_employer: OpenAI Research (2019-2022)
  research_focus: primary=graph neural networks, secondary=abstractive generation

Entity: researcher/olivia_kowalski
  affiliation: McGill University
  publication_count: 78
  previous_employer: Tencent AI Lab (2019-2022)
  research_focus: primary=out-of-distribution generalization, secondary=privacy-preserving ML

Entity: researcher/erica_reyes
  affiliation: McGill University
  publication_count: 43
  previous_employer: Bosch Center for AI (2019-2022)
  research_focus: primary=speech recognition, secondary=collaborative filtering

Entity: researcher/xiao_laurent
  affiliation: Vector Institute
  publication_count: 81
  previous_employer: Jane Street Research (2018-2021)
  research_focus: primary=out-of-distribution generalization, secondary=efficient deep learning

Entity: researcher/thomas_smith
  affiliation: National University of Singapore
  publication_count: 74
  previous_employer: Facebook AI Research (2017-2020)
  research_focus: primary=autonomous driving, secondary=domain adaptation

Entity: researcher/delia_yang
  affiliation: KTH Royal Institute of Technology
  publication_count: 57
  previous_employer: Salesforce Research (2018-2021)
  research_focus: primary=multimodal learning, secondary=collaborative filtering

Entity: researcher/marta_martinez
  affiliation: University of Amsterdam
  publication_count: 49
  previous_employer: IBM Research (2016-2019)
  research_focus: primary=causal inference, secondary=certified defenses

Entity: researcher/clara_maier
  affiliation: University of Amsterdam
  publication_count: 10
  previous_employer: Uber AI Labs (2017-2020)
  research_focus: primary=machine learning theory, secondary=catastrophic forgetting

Entity: researcher/kiran_yilmaz
  affiliation: Northeastern University
  publication_count: 61
  previous_employer: Meta AI Research (2020-2023)
  research_focus: primary=speech recognition, secondary=model explanation

Entity: researcher/claudia_ramirez
  affiliation: University of Sydney
  publication_count: 80
  previous_employer: Snap Research (2018-2021)
  research_focus: primary=machine learning theory, secondary=efficient deep learning

Entity: researcher/anders_bauer
  affiliation: Vector Institute
  publication_count: 78
  previous_employer: Citadel Securities Research (2017-2020)
  research_focus: primary=self-supervised learning, secondary=clinical decision support

Entity: researcher/pablo_jung
  affiliation: Oxford University
  publication_count: 11
  previous_employer: Tesla AI (2019-2022)
  research_focus: primary=computer vision, secondary=time series analysis

Entity: researcher/marta_khan
  affiliation: University of Amsterdam
  publication_count: 34
  previous_employer: Salesforce Research (2018-2021)
  research_focus: primary=AI safety, secondary=sensor fusion

Entity: researcher/hugo_yang
  affiliation: Max Planck Institute for Informatics
  publication_count: 19
  previous_employer: OpenAI (2018-2021)
  research_focus: primary=summarization, secondary=generalization bounds

Entity: researcher/liang_gupta
  affiliation: Cornell Tech
  publication_count: 74
  previous_employer: IBM Research (2016-2019)
  research_focus: primary=semantic parsing, secondary=clinical decision support

Entity: researcher/piotr_acharya
  affiliation: KTH Royal Institute of Technology
  publication_count: 72
  previous_employer: Two Sigma Research (2019-2022)
  research_focus: primary=federated learning, secondary=spoken dialog systems

Entity: researcher/celine_martinez
  affiliation: Boston University
  publication_count: 7
  previous_employer: Toyota Research Institute (2017-2020)
  research_focus: primary=graph neural networks, secondary=uncertainty quantification

Entity: researcher/ethan_eriksson
  affiliation: Georgia Tech
  publication_count: 71
  previous_employer: Toyota Research Institute (2017-2020)
  research_focus: primary=reinforcement learning, secondary=conversational AI

Entity: researcher/gabriel_reyes
  affiliation: National University of Singapore
  publication_count: 28
  previous_employer: Tesla AI (2019-2022)
  research_focus: primary=commonsense reasoning, secondary=counterfactual reasoning

Entity: researcher/jonathan_lim
  affiliation: TU Berlin
  publication_count: 15
  previous_employer: Huawei Noah Ark Lab (2018-2021)
  research_focus: primary=semantic parsing, secondary=conversational AI

Entity: researcher/aryan_nguyen
  affiliation: Carnegie Mellon University
  publication_count: 67
  previous_employer: OpenAI (2018-2021)
  research_focus: primary=code generation, secondary=abstractive generation

Entity: researcher/jacob_flores
  affiliation: Technion
  publication_count: 63
  previous_employer: Vector Institute (2018-2021)
  research_focus: primary=graph neural networks, secondary=robotics

Entity: researcher/julian_hoffmann
  affiliation: Montreal Institute for Learning Algorithms
  publication_count: 53
  previous_employer: Tesla AI (2019-2022)
  research_focus: primary=anomaly detection, secondary=collaborative filtering

Entity: researcher/patrick_saha
  affiliation: University of Zurich
  publication_count: 65
  previous_employer: Salesforce Research (2018-2021)
  research_focus: primary=speech recognition, secondary=generalization bounds

Entity: researcher/benjamin_yilmaz
  affiliation: Princeton CS
  publication_count: 67
  previous_employer: Uber AI Labs (2017-2020)
  research_focus: primary=medical imaging, secondary=knowledge graphs

Entity: researcher/lauren_vidal
  affiliation: Cambridge University
  publication_count: 5
  previous_employer: Waymo Research (2020-2023)
  research_focus: primary=interpretable ML, secondary=object detection

Entity: researcher/aaron_cheng
  affiliation: Carnegie Mellon University
  publication_count: 10
  previous_employer: Alibaba DAMO Academy (2018-2021)
  research_focus: primary=AI safety, secondary=model explanation

Entity: researcher/hannah_zhao
  affiliation: Chinese University of Hong Kong
  publication_count: 53
  previous_employer: Meta AI Research (2020-2023)
  research_focus: primary=Bayesian deep learning, secondary=contrastive methods

Entity: researcher/rachel_fuentes
  affiliation: Cambridge University
  publication_count: 58
  previous_employer: ByteDance AI Lab (2020-2023)
  research_focus: primary=recommendation systems, secondary=spoken dialog systems

Entity: researcher/brandon_castellanos
  affiliation: Montreal Institute for Learning Algorithms
  publication_count: 4
  previous_employer: Salesforce Research (2018-2021)
  research_focus: primary=information retrieval, secondary=object detection

Entity: researcher/anisha_braun
  affiliation: University of Washington
  publication_count: 8
  previous_employer: Huawei Noah Ark Lab (2018-2021)
  research_focus: primary=interpretable ML, secondary=value alignment

Entity: researcher/andrew_nakamura
  affiliation: University of British Columbia
  publication_count: 32
  previous_employer: Vector Institute (2018-2021)
  research_focus: primary=speech recognition, secondary=clinical decision support

Entity: researcher/mario_lopez
  affiliation: University of Zurich
  publication_count: 19
  previous_employer: Jane Street Research (2018-2021)
  research_focus: primary=question answering, secondary=certified defenses

Entity: researcher/sophia_almeida
  affiliation: Peking University
  publication_count: 89
  previous_employer: Facebook AI Research (2017-2020)
  research_focus: primary=computer vision, secondary=domain adaptation

Entity: researcher/rafael_zimmermann
  affiliation: Carnegie Mellon University
  publication_count: 61
  previous_employer: Qualcomm AI Research (2017-2020)
  research_focus: primary=autonomous driving, secondary=value alignment

Entity: researcher/sandra_wagner
  affiliation: University of Sydney
  publication_count: 16
  previous_employer: Meta AI Research (2020-2023)
  research_focus: primary=graph neural networks, secondary=object detection

Entity: researcher/josef_li
  affiliation: Caltech
  publication_count: 13
  previous_employer: Snap Research (2018-2021)
  research_focus: primary=information retrieval, secondary=model explanation

Entity: researcher/cyrus_novak
  affiliation: Tsinghua University
  publication_count: 7
  previous_employer: Amazon AWS AI (2018-2021)
  research_focus: primary=question answering, secondary=counterfactual reasoning

Entity: researcher/shreya_popescu
  affiliation: UC Berkeley
  publication_count: 11
  previous_employer: Meta AI Research (2020-2023)
  research_focus: primary=information retrieval, secondary=abstractive generation

Entity: researcher/matias_moretti
  affiliation: Leiden University
  publication_count: 79
  previous_employer: Google Research (2018-2021)
  research_focus: primary=dialogue systems, secondary=knowledge grounding

Entity: researcher/amanda_ghosh
  affiliation: University of Amsterdam
  publication_count: 40
  previous_employer: NVIDIA Research (2017-2020)
  research_focus: primary=out-of-distribution generalization, secondary=few-shot learning

Entity: researcher/javier_choi
  affiliation: NYU Courant Institute
  publication_count: 92
  previous_employer: Bosch Center for AI (2019-2022)
  research_focus: primary=machine learning theory, secondary=sensor fusion

Entity: researcher/felix_jain
  affiliation: KTH Royal Institute of Technology
  publication_count: 29
  previous_employer: Twitter Machine Learning (2019-2022)
  research_focus: primary=medical imaging, secondary=time series analysis

Entity: researcher/tom_suzuki
  affiliation: Carnegie Mellon University
  publication_count: 20
  previous_employer: Apple ML Research (2019-2022)
  research_focus: primary=continual learning, secondary=protein structure prediction

Entity: researcher/giulia_narasimhan
  affiliation: Max Planck Institute for Informatics
  publication_count: 75
  previous_employer: NVIDIA Research (2017-2020)
  research_focus: primary=natural language processing, secondary=contrastive methods

Entity: researcher/jennifer_ramos
  affiliation: Georgia Tech
  publication_count: 18
  previous_employer: Facebook AI Research (2017-2020)
  research_focus: primary=interpretable ML, secondary=counterfactual reasoning

Entity: researcher/lars_vasquez
  affiliation: Sapienza University of Rome
  publication_count: 77
  previous_employer: OpenAI (2018-2021)
  research_focus: primary=computational biology, secondary=efficient deep learning

Entity: researcher/ivan_rashid
  affiliation: Carnegie Mellon University
  publication_count: 17
  previous_employer: Uber AI Labs (2017-2020)
  research_focus: primary=summarization, secondary=efficient deep learning

Entity: researcher/tom_klein
  affiliation: Max Planck Institute for Informatics
  publication_count: 81
  previous_employer: Qualcomm AI Research (2017-2020)
  research_focus: primary=code generation, secondary=knowledge grounding

Entity: researcher/marina_romano
  affiliation: Allen Institute for AI
  publication_count: 71
  previous_employer: Waymo Research (2020-2023)
  research_focus: primary=natural language processing, secondary=spoken dialog systems

Entity: researcher/simon_blum
  affiliation: Hong Kong University of Science and Technology
  publication_count: 27
  previous_employer: Google DeepMind (2020-2023)
  research_focus: primary=machine learning theory, secondary=transfer learning

Entity: researcher/hassan_ahmadi
  affiliation: Northeastern University
  publication_count: 97
  previous_employer: Baidu Research (2018-2021)
  research_focus: primary=Bayesian deep learning, secondary=certified defenses

Entity: researcher/kai_huang
  affiliation: Cornell Tech
  publication_count: 11
  previous_employer: NVIDIA Research (2017-2020)
  research_focus: primary=recommendation systems, secondary=protein structure prediction

Entity: researcher/aryan_huang
  affiliation: Seoul National University
  publication_count: 35
  previous_employer: Alibaba DAMO Academy (2018-2021)
  research_focus: primary=anomaly detection, secondary=domain adaptation

Entity: researcher/marco_rodriguez
  affiliation: University of Michigan
  publication_count: 92
  previous_employer: Apple ML Research (2019-2022)
  research_focus: primary=information retrieval, secondary=knowledge grounding

Entity: researcher/carlos_andersen
  affiliation: EPFL
  publication_count: 66
  previous_employer: Salesforce Research (2018-2021)
  research_focus: primary=autonomous driving, secondary=generalization bounds

Entity: researcher/nina_klein
  affiliation: Columbia University
  publication_count: 86
  previous_employer: Google Brain (2016-2019)
  research_focus: primary=medical imaging, secondary=contrastive methods

Entity: researcher/tara_klein
  affiliation: University of Michigan
  publication_count: 98
  previous_employer: OpenAI Research (2019-2022)
  research_focus: primary=interpretable ML, secondary=collaborative filtering

Entity: researcher/danielle_vasquez
  affiliation: Princeton CS
  publication_count: 18
  previous_employer: Samsung AI Center (2019-2022)
  research_focus: primary=recommendation systems, secondary=sensor fusion

Entity: researcher/valentina_vidal
  affiliation: McGill University
  publication_count: 12
  previous_employer: Bosch Center for AI (2019-2022)
  research_focus: primary=summarization, secondary=spoken dialog systems

Entity: researcher/nathan_patel
  affiliation: University of Sydney
  publication_count: 18
  previous_employer: OpenAI Research (2019-2022)
  research_focus: primary=out-of-distribution generalization, secondary=reading comprehension

Entity: researcher/christoph_ndiaye
  affiliation: Stanford University
  publication_count: 61
  previous_employer: ByteDance AI Lab (2020-2023)
  research_focus: primary=Bayesian deep learning, secondary=uncertainty quantification

Entity: researcher/divya_rodriguez
  affiliation: University of Michigan
  publication_count: 60
  previous_employer: Tencent AI Lab (2019-2022)
  research_focus: primary=question answering, secondary=model explanation

Entity: researcher/ayaan_liu
  affiliation: TU Berlin
  publication_count: 12
  previous_employer: Facebook AI Research (2017-2020)
  research_focus: primary=summarization, secondary=robotics

Entity: researcher/andrew_zhou
  affiliation: Tsinghua University
  publication_count: 93
  previous_employer: Tesla AI (2019-2022)
  research_focus: primary=federated learning, secondary=program synthesis

Entity: researcher/victoria_nkosi
  affiliation: UC Berkeley
  publication_count: 47
  previous_employer: Microsoft Research (2015-2018)
  research_focus: primary=question answering, secondary=privacy-preserving ML

Entity: researcher/markus_koch
  affiliation: Carnegie Mellon University
  publication_count: 9
  previous_employer: Twitter Machine Learning (2019-2022)
  research_focus: primary=neural architecture search, secondary=time series analysis

Entity: researcher/omar_ritter
  affiliation: Technion
  publication_count: 87
  previous_employer: Qualcomm AI Research (2017-2020)
  research_focus: primary=graph neural networks, secondary=reading comprehension

Entity: researcher/neha_huang
  affiliation: University of British Columbia
  publication_count: 86
  previous_employer: Uber AI Labs (2017-2020)
  research_focus: primary=causal inference, secondary=few-shot learning

Entity: researcher/angela_brown
  affiliation: Oxford University
  publication_count: 31
  previous_employer: ByteDance AI Lab (2020-2023)
  research_focus: primary=information retrieval, secondary=dense retrieval

Entity: researcher/lena_wu
  affiliation: Purdue University
  publication_count: 79
  previous_employer: Tesla AI (2019-2022)
  research_focus: primary=summarization, secondary=machine translation

Entity: researcher/rajesh_pham
  affiliation: INRIA Paris
  publication_count: 7
  previous_employer: Waymo Research (2020-2023)
  research_focus: primary=summarization, secondary=abstractive generation

Entity: researcher/javier_blum
  affiliation: Technion
  publication_count: 62
  previous_employer: Baidu Research (2018-2021)
  research_focus: primary=meta-learning, secondary=certified defenses

Entity: researcher/katarzyna_ndiaye
  affiliation: University of Washington
  publication_count: 43
  previous_employer: Toyota Research Institute (2017-2020)
  research_focus: primary=natural language processing, secondary=program synthesis

Entity: researcher/julian_ramirez
  affiliation: Georgia Tech
  publication_count: 56
  previous_employer: Qualcomm AI Research (2017-2020)
  research_focus: primary=federated learning, secondary=robotics

Entity: researcher/hao_saha
  affiliation: McGill University
  publication_count: 25
  previous_employer: Citadel Securities Research (2017-2020)
  research_focus: primary=medical imaging, secondary=catastrophic forgetting

Entity: researcher/isabel_pacheco
  affiliation: University of Washington
  publication_count: 96
  previous_employer: Google DeepMind (2020-2023)
  research_focus: primary=anomaly detection, secondary=privacy-preserving ML

Entity: researcher/alicia_wolf
  affiliation: University of Michigan
  publication_count: 55
  previous_employer: Meta AI Research (2020-2023)
  research_focus: primary=Bayesian deep learning, secondary=dense retrieval

Entity: researcher/hannah_choi
  affiliation: Columbia University
  publication_count: 12
  previous_employer: Google DeepMind (2020-2023)
  research_focus: primary=out-of-distribution generalization, secondary=abstractive generation

Entity: researcher/ethan_fuentes
  affiliation: University of Edinburgh
  publication_count: 83
  previous_employer: Salesforce Research (2018-2021)
  research_focus: primary=summarization, secondary=collaborative filtering

Entity: researcher/benjamin_santos
  affiliation: University of Copenhagen
  publication_count: 42
  previous_employer: Baidu Research (2018-2021)
  research_focus: primary=AI safety, secondary=model explanation

Entity: researcher/mihail_ahmadi
  affiliation: NYU Courant Institute
  publication_count: 93
  previous_employer: Microsoft Research (2017-2020)
  research_focus: primary=question answering, secondary=reading comprehension

Entity: researcher/isabel_solis
  affiliation: Cambridge University
  publication_count: 35
  previous_employer: Microsoft Research (2017-2020)
  research_focus: primary=graph neural networks, secondary=time series analysis

Entity: researcher/ahmad_tran
  affiliation: University of Zurich
  publication_count: 91
  previous_employer: Twitter Machine Learning (2019-2022)
  research_focus: primary=graph neural networks, secondary=conversational AI

Entity: researcher/wei_wang
  affiliation: UC Berkeley
  publication_count: 16
  previous_employer: Tesla AI (2019-2022)
  research_focus: primary=reinforcement learning, secondary=uncertainty quantification

Entity: researcher/natalia_guo
  affiliation: University of Illinois Urbana-Champaign
  publication_count: 31
  previous_employer: Uber AI Labs (2017-2020)
  research_focus: primary=semantic parsing, secondary=sensor fusion

Entity: researcher/clara_zhang
  affiliation: Columbia University
  publication_count: 61
  previous_employer: Google Brain (2016-2019)
  research_focus: primary=machine learning theory, secondary=spoken dialog systems

Entity: researcher/marco_brown
  affiliation: Sapienza University of Rome
  publication_count: 22
  previous_employer: OpenAI Research (2019-2022)
  research_focus: primary=information retrieval, secondary=domain adaptation

Entity: researcher/sarah_bonnet
  affiliation: University of Michigan
  publication_count: 15
  previous_employer: Tencent AI Lab (2019-2022)
  research_focus: primary=medical imaging, secondary=machine translation

Entity: researcher/mia_eriksson
  affiliation: INRIA Paris
  publication_count: 7
  previous_employer: Qualcomm AI Research (2017-2020)
  research_focus: primary=Bayesian deep learning, secondary=robotics

Entity: researcher/gabriela_dimitriou
  affiliation: UC Berkeley
  publication_count: 63
  previous_employer: OpenAI (2018-2021)
  research_focus: primary=summarization, secondary=abstractive generation

Entity: researcher/lukas_kim
  affiliation: University of Melbourne
  publication_count: 32
  previous_employer: Vector Institute (2018-2021)
  research_focus: primary=summarization, secondary=spoken dialog systems

Entity: researcher/charlotte_wagner
  affiliation: Carnegie Mellon University
  publication_count: 41
  previous_employer: Jane Street Research (2018-2021)
  research_focus: primary=semantic parsing, secondary=efficient deep learning

Entity: researcher/claudia_singh
  affiliation: University of Copenhagen
  publication_count: 64
  previous_employer: Two Sigma Research (2019-2022)
  research_focus: primary=continual learning, secondary=clinical decision support

Entity: researcher/alexander_esposito
  affiliation: Seoul National University
  publication_count: 75
  previous_employer: Baidu Research (2018-2021)
  research_focus: primary=AI safety, secondary=structured prediction

Entity: researcher/isabel_rodriguez
  affiliation: University of Illinois Urbana-Champaign
  publication_count: 28
  previous_employer: Meta AI Research (2020-2023)
  research_focus: primary=computational biology, secondary=machine translation

Entity: researcher/mark_park
  affiliation: Peking University
  publication_count: 26
  previous_employer: Jane Street Research (2018-2021)
  research_focus: primary=reinforcement learning, secondary=domain adaptation

Entity: researcher/rosa_vidal
  affiliation: Boston University
  publication_count: 42
  previous_employer: Google Research (2018-2021)
  research_focus: primary=out-of-distribution generalization, secondary=knowledge graphs

Entity: researcher/diego_brown
  affiliation: Georgia Tech
  publication_count: 79
  previous_employer: Vector Institute (2018-2021)
  research_focus: primary=dialogue systems, secondary=efficient deep learning

Entity: researcher/natalie_zimmermann
  affiliation: Oxford University
  publication_count: 86
  previous_employer: IBM Research (2016-2019)
  research_focus: primary=self-supervised learning, secondary=model explanation

Entity: researcher/lucas_maier
  affiliation: Peking University
  publication_count: 40
  previous_employer: Intel AI Lab (2016-2019)
  research_focus: primary=multi-task learning, secondary=reading comprehension

Entity: researcher/erin_rodriguez
  affiliation: TU Berlin
  publication_count: 47
  previous_employer: Salesforce Research (2018-2021)
  research_focus: primary=recommendation systems, secondary=value alignment

Entity: researcher/deepa_kapoor
  affiliation: University of Copenhagen
  publication_count: 98
  previous_employer: Alibaba DAMO Academy (2018-2021)
  research_focus: primary=adversarial robustness, secondary=object detection

Entity: researcher/luna_lim
  affiliation: McGill University
  publication_count: 5
  previous_employer: Facebook AI Research (2017-2020)
  research_focus: primary=interpretable ML, secondary=time series analysis

Entity: researcher/mohamed_khan
  affiliation: Vector Institute
  publication_count: 69
  previous_employer: Salesforce Research (2018-2021)
  research_focus: primary=medical imaging, secondary=domain adaptation

Entity: researcher/julien_saha
  affiliation: Columbia University
  publication_count: 95
  previous_employer: Vector Institute (2018-2021)
  research_focus: primary=continual learning, secondary=catastrophic forgetting

Entity: researcher/caroline_ibrahim
  affiliation: Princeton CS
  publication_count: 72
  previous_employer: Bosch Center for AI (2019-2022)
  research_focus: primary=semantic parsing, secondary=contrastive methods

Entity: researcher/lisa_tremblay
  affiliation: Princeton CS
  publication_count: 61
  previous_employer: Meta AI Research (2020-2023)
  research_focus: primary=autonomous driving, secondary=dense retrieval

Entity: researcher/clara_weiss
  affiliation: EPFL
  publication_count: 17
  previous_employer: Microsoft Research (2017-2020)
  research_focus: primary=recommendation systems, secondary=protein structure prediction

Entity: researcher/omar_reyes
  affiliation: Virginia Tech
  publication_count: 74
  previous_employer: ByteDance AI Lab (2020-2023)
  research_focus: primary=dialogue systems, secondary=transfer learning

Entity: researcher/benjamin_wiese
  affiliation: University of Edinburgh
  publication_count: 12
  previous_employer: Apple ML Research (2019-2022)
  research_focus: primary=graph neural networks, secondary=uncertainty quantification

Entity: researcher/emre_novak
  affiliation: Stanford University
  publication_count: 87
  previous_employer: Baidu Research (2018-2021)
  research_focus: primary=neural architecture search, secondary=sensor fusion

Entity: researcher/catherine_ritter
  affiliation: University of Helsinki
  publication_count: 48
  previous_employer: Tesla AI (2019-2022)
  research_focus: primary=neural architecture search, secondary=collaborative filtering

Entity: researcher/neha_tremblay
  affiliation: University of Copenhagen
  publication_count: 19
  previous_employer: Microsoft Research (2015-2018)
  research_focus: primary=graph neural networks, secondary=protein structure prediction

Entity: researcher/yuki_reyes
  affiliation: EPFL
  publication_count: 21
  previous_employer: Google Research (2018-2021)
  research_focus: primary=Bayesian deep learning, secondary=protein structure prediction

Entity: researcher/hugo_kapoor
  affiliation: University of Edinburgh
  publication_count: 44
  previous_employer: IBM Research (2016-2019)
  research_focus: primary=computer vision, secondary=machine translation

Entity: researcher/gabriel_hansen
  affiliation: Vector Institute
  publication_count: 79
  previous_employer: Toyota Research Institute (2017-2020)
  research_focus: primary=multi-task learning, secondary=knowledge graphs

Entity: researcher/benjamin_stark
  affiliation: University of Washington
  publication_count: 75
  previous_employer: NVIDIA Research (2017-2020)
  research_focus: primary=information retrieval, secondary=generalization bounds

Entity: researcher/alice_chen
  affiliation: MIT Computer Science
  publication_count: 47
  previous_employer: OpenAI (2018-2021)
  research_focus: primary=natural language processing, secondary=program synthesis

Entity: researcher/jonathan_reyes
  affiliation: ETH Zurich
  publication_count: 27
  previous_employer: OpenAI Research (2019-2022)
  research_focus: primary=summarization, secondary=time series analysis

Entity: researcher/anisha_fuentes
  affiliation: Sapienza University of Rome
  publication_count: 37
  previous_employer: Jane Street Research (2018-2021)
  research_focus: primary=recommendation systems, secondary=catastrophic forgetting

Entity: researcher/finn_tran
  affiliation: University of Zurich
  publication_count: 57
  previous_employer: Alibaba DAMO Academy (2018-2021)
  research_focus: primary=self-supervised learning, secondary=domain adaptation

Entity: researcher/kate_jain
  affiliation: Princeton CS
  publication_count: 63
  previous_employer: Jane Street Research (2018-2021)
  research_focus: primary=machine learning theory, secondary=value alignment

Entity: researcher/ayaan_kang
  affiliation: Leiden University
  publication_count: 33
  previous_employer: Vector Institute (2018-2021)
  research_focus: primary=multi-task learning, secondary=counterfactual reasoning

Entity: researcher/lucas_guo
  affiliation: UT Austin
  publication_count: 71
  previous_employer: Qualcomm AI Research (2017-2020)
  research_focus: primary=causal inference, secondary=collaborative filtering

Entity: researcher/hassan_bhatt
  affiliation: University of Edinburgh
  publication_count: 35
  previous_employer: Meta AI Research (2020-2023)
  research_focus: primary=continual learning, secondary=model explanation

Entity: researcher/victor_dobrescu
  affiliation: National University of Singapore
  publication_count: 90
  previous_employer: Amazon AWS AI (2018-2021)
  research_focus: primary=commonsense reasoning, secondary=model explanation

Entity: researcher/zachary_dobrescu
  affiliation: Cornell Tech
  publication_count: 62
  previous_employer: Tencent AI Lab (2019-2022)
  research_focus: primary=continual learning, secondary=sensor fusion

Entity: researcher/milan_laurent
  affiliation: National University of Singapore
  publication_count: 8
  previous_employer: Baidu Research (2018-2021)
  research_focus: primary=commonsense reasoning, secondary=time series analysis

Entity: researcher/arnav_fontaine
  affiliation: Cambridge University
  publication_count: 70
  previous_employer: Baidu Research (2018-2021)
  research_focus: primary=graph neural networks, secondary=privacy-preserving ML

Entity: researcher/ethan_meyer
  affiliation: University of Copenhagen
  publication_count: 45
  previous_employer: Microsoft Research (2017-2020)
  research_focus: primary=multimodal learning, secondary=time series analysis

Entity: researcher/natalia_li
  affiliation: University of Sydney
  publication_count: 23
  previous_employer: Intel AI Lab (2016-2019)
  research_focus: primary=Bayesian deep learning, secondary=conversational AI

Entity: researcher/celine_wong
  affiliation: University of Edinburgh
  publication_count: 76
  previous_employer: Alibaba DAMO Academy (2018-2021)
  research_focus: primary=graph neural networks, secondary=few-shot learning

Entity: researcher/arjun_smith
  affiliation: TU Berlin
  publication_count: 17
  previous_employer: Apple ML Research (2019-2022)
  research_focus: primary=dialogue systems, secondary=efficient deep learning

Entity: researcher/luna_martinez
  affiliation: Sapienza University of Rome
  publication_count: 73
  previous_employer: Uber AI Labs (2017-2020)
  research_focus: primary=multimodal learning, secondary=contrastive methods

Entity: researcher/elias_ritter
  affiliation: Vector Institute
  publication_count: 92
  previous_employer: IBM Research (2016-2019)
  research_focus: primary=computer vision, secondary=few-shot learning

Entity: researcher/tim_bauer
  affiliation: University of Michigan
  publication_count: 10
  previous_employer: Google Research (2018-2021)
  research_focus: primary=self-supervised learning, secondary=abstractive generation

Entity: researcher/alessandro_dobrescu
  affiliation: Georgia Tech
  publication_count: 56
  previous_employer: ByteDance AI Lab (2020-2023)
  research_focus: primary=recommendation systems, secondary=conversational AI

Entity: researcher/andrzej_castro
  affiliation: Oxford University
  publication_count: 12
  previous_employer: ByteDance AI Lab (2020-2023)
  research_focus: primary=reinforcement learning, secondary=program synthesis

Entity: researcher/paula_vogt
  affiliation: University of Edinburgh
  publication_count: 66
  previous_employer: Waymo Research (2020-2023)
  research_focus: primary=adversarial robustness, secondary=abstractive generation

Entity: researcher/ibrahim_popescu
  affiliation: Columbia University
  publication_count: 90
  previous_employer: Tencent AI Lab (2019-2022)
  research_focus: primary=self-supervised learning, secondary=collaborative filtering

Entity: researcher/hannah_blum
  affiliation: UC Berkeley
  publication_count: 75
  previous_employer: Uber AI Labs (2017-2020)
  research_focus: primary=computer vision, secondary=clinical decision support

Entity: researcher/kai_wong
  affiliation: ETH Zurich
  publication_count: 94
  previous_employer: Snap Research (2018-2021)
  research_focus: primary=summarization, secondary=conversational AI

Entity: researcher/nikita_wagner
  affiliation: NYU Courant Institute
  publication_count: 30
  previous_employer: Google Research (2018-2021)
  research_focus: primary=code generation, secondary=contrastive methods

Entity: researcher/stephanie_choi
  affiliation: University of British Columbia
  publication_count: 57
  previous_employer: Citadel Securities Research (2017-2020)
  research_focus: primary=neural architecture search, secondary=generalization bounds

Entity: researcher/nathan_wong
  affiliation: Seoul National University
  publication_count: 48
  previous_employer: Qualcomm AI Research (2017-2020)
  research_focus: primary=Bayesian deep learning, secondary=generalization bounds

Entity: researcher/vera_fischer
  affiliation: Carnegie Mellon University
  publication_count: 22
  previous_employer: OpenAI Research (2019-2022)
  research_focus: primary=meta-learning, secondary=abstractive generation

Entity: researcher/jana_christiansen
  affiliation: Leiden University
  publication_count: 78
  previous_employer: Bosch Center for AI (2019-2022)
  research_focus: primary=information retrieval, secondary=conversational AI

Entity: researcher/javier_vega
  affiliation: EPFL
  publication_count: 49
  previous_employer: Jane Street Research (2018-2021)
  research_focus: primary=question answering, secondary=clinical decision support

Entity: researcher/oscar_jain
  affiliation: Chinese University of Hong Kong
  publication_count: 9
  previous_employer: Huawei Noah Ark Lab (2018-2021)
  research_focus: primary=recommendation systems, secondary=counterfactual reasoning

Entity: researcher/connor_choi
  affiliation: National University of Singapore
  publication_count: 22
  previous_employer: NVIDIA Research (2017-2020)
  research_focus: primary=autonomous driving, secondary=reading comprehension

Entity: researcher/vera_andersen
  affiliation: UC Berkeley
  publication_count: 84
  previous_employer: Citadel Securities Research (2017-2020)
  research_focus: primary=computational biology, secondary=robotics

Entity: researcher/francesco_ramos
  affiliation: University of British Columbia
  publication_count: 17
  previous_employer: Samsung AI Center (2019-2022)
  research_focus: primary=anomaly detection, secondary=conversational AI

Entity: researcher/takahiro_dimitriou
  affiliation: University of Toronto
  publication_count: 93
  previous_employer: Jane Street Research (2018-2021)
  research_focus: primary=autonomous driving, secondary=model explanation

Entity: researcher/oscar_oliveira
  affiliation: Seoul National University
  publication_count: 29
  previous_employer: Meta AI Research (2020-2023)
  research_focus: primary=speech recognition, secondary=transfer learning

Entity: researcher/jacob_osei
  affiliation: University of Illinois Urbana-Champaign
  publication_count: 42
  previous_employer: NVIDIA Research (2017-2020)
  research_focus: primary=question answering, secondary=dense retrieval

Entity: researcher/kristina_gomez
  affiliation: University of Copenhagen
  publication_count: 21
  previous_employer: Alibaba DAMO Academy (2018-2021)
  research_focus: primary=AI safety, secondary=contrastive methods

Entity: researcher/zara_braun
  affiliation: University of Illinois Urbana-Champaign
  publication_count: 95
  previous_employer: Baidu Research (2018-2021)
  research_focus: primary=multimodal learning, secondary=structured prediction

Entity: researcher/karin_dimitriou
  affiliation: Peking University
  publication_count: 43
  previous_employer: Samsung AI Center (2019-2022)
  research_focus: primary=computer vision, secondary=abstractive generation

Entity: researcher/emre_braun
  affiliation: Cambridge University
  publication_count: 87
  previous_employer: Snap Research (2018-2021)
  research_focus: primary=neural architecture search, secondary=certified defenses

Entity: researcher/arnav_saha
  affiliation: MIT Computer Science
  publication_count: 16
  previous_employer: NVIDIA Research (2017-2020)
  research_focus: primary=graph neural networks, secondary=value alignment

Entity: researcher/nikita_wenger
  affiliation: McGill University
  publication_count: 4
  previous_employer: Microsoft Research (2015-2018)
  research_focus: primary=natural language processing, secondary=robotics

Entity: researcher/jana_wong
  affiliation: Max Planck Institute for Informatics
  publication_count: 88
  previous_employer: Google DeepMind (2020-2023)
  research_focus: primary=natural language processing, secondary=program synthesis

Entity: researcher/sara_reyes
  affiliation: Columbia University
  publication_count: 33
  previous_employer: Google Brain (2016-2019)
  research_focus: primary=graph neural networks, secondary=generalization bounds

Entity: researcher/yang_acharya
  affiliation: Tokyo University
  publication_count: 85
  previous_employer: Facebook AI Research (2017-2020)
  research_focus: primary=semantic parsing, secondary=robotics

Entity: researcher/liang_sekar
  affiliation: Hebrew University
  publication_count: 34
  previous_employer: Tesla AI (2019-2022)
  research_focus: primary=semantic parsing, secondary=dense retrieval

Entity: researcher/saanvi_jain
  affiliation: University of Melbourne
  publication_count: 62
  previous_employer: NVIDIA Research (2017-2020)
  research_focus: primary=commonsense reasoning, secondary=robotics

Entity: researcher/lucas_burger
  affiliation: MIT Computer Science
  publication_count: 42
  previous_employer: NVIDIA Research (2017-2020)
  research_focus: primary=medical imaging, secondary=program synthesis

Entity: researcher/ivan_wong
  affiliation: University of Toronto
  publication_count: 37
  previous_employer: Jane Street Research (2018-2021)
  research_focus: primary=neural architecture search, secondary=model explanation

Entity: researcher/patrick_hansen
  affiliation: Tokyo University
  publication_count: 75
  previous_employer: Baidu Research (2018-2021)
  research_focus: primary=dialogue systems, secondary=counterfactual reasoning

Entity: researcher/bianca_braun
  affiliation: University of Sydney
  publication_count: 92
  previous_employer: ByteDance AI Lab (2020-2023)
  research_focus: primary=neural architecture search, secondary=dense retrieval

Entity: researcher/rosa_acharya
  affiliation: Stanford University
  publication_count: 13
  previous_employer: Amazon AWS AI (2018-2021)
  research_focus: primary=semantic parsing, secondary=certified defenses

Entity: researcher/ryan_sato
  affiliation: Boston University
  publication_count: 77
  previous_employer: Microsoft Research (2015-2018)
  research_focus: primary=information retrieval, secondary=counterfactual reasoning

Entity: researcher/petra_lopez
  affiliation: Stanford University
  publication_count: 26
  previous_employer: Jane Street Research (2018-2021)
  research_focus: primary=federated learning, secondary=value alignment

Entity: researcher/william_sanchez
  affiliation: University of Zurich
  publication_count: 23
  previous_employer: ByteDance AI Lab (2020-2023)
  research_focus: primary=meta-learning, secondary=spoken dialog systems

Entity: researcher/laura_kim
  affiliation: MIT Computer Science
  publication_count: 78
  previous_employer: Salesforce Research (2018-2021)
  research_focus: primary=causal inference, secondary=knowledge graphs

Entity: researcher/vera_brown
  affiliation: Columbia University
  publication_count: 88
  previous_employer: Tencent AI Lab (2019-2022)
  research_focus: primary=question answering, secondary=few-shot learning

Entity: researcher/marina_narasimhan
  affiliation: Caltech
  publication_count: 52
  previous_employer: Microsoft Research (2015-2018)
  research_focus: primary=autonomous driving, secondary=collaborative filtering

Entity: researcher/brandon_smith
  affiliation: Georgia Tech
  publication_count: 14
  previous_employer: Tesla AI (2019-2022)
  research_focus: primary=AI safety, secondary=collaborative filtering

Entity: researcher/jorge_sharma
  affiliation: MIT Computer Science
  publication_count: 88
  previous_employer: Snap Research (2018-2021)
  research_focus: primary=speech recognition, secondary=few-shot learning

Entity: researcher/boris_kapoor
  affiliation: National University of Singapore
  publication_count: 50
  previous_employer: Citadel Securities Research (2017-2020)
  research_focus: primary=neural architecture search, secondary=value alignment

Entity: researcher/claudia_kowalski
  affiliation: Montreal Institute for Learning Algorithms
  publication_count: 72
  previous_employer: IBM Research (2016-2019)
  research_focus: primary=computational biology, secondary=machine translation

Entity: researcher/andrea_ibrahim
  affiliation: KTH Royal Institute of Technology
  publication_count: 18
  previous_employer: Microsoft Research (2015-2018)
  research_focus: primary=adversarial robustness, secondary=knowledge graphs

Entity: researcher/rahul_petrov
  affiliation: Hebrew University
  publication_count: 5
  previous_employer: Citadel Securities Research (2017-2020)
  research_focus: primary=multi-task learning, secondary=generalization bounds

Entity: researcher/marina_nguyen
  affiliation: Sapienza University of Rome
  publication_count: 14
  previous_employer: Two Sigma Research (2019-2022)
  research_focus: primary=machine learning theory, secondary=counterfactual reasoning

Entity: researcher/karin_demir
  affiliation: University of Melbourne
  publication_count: 44
  previous_employer: Two Sigma Research (2019-2022)
  research_focus: primary=AI safety, secondary=clinical decision support

Entity: researcher/sven_andersen
  affiliation: National University of Singapore
  publication_count: 70
  previous_employer: ByteDance AI Lab (2020-2023)
  research_focus: primary=out-of-distribution generalization, secondary=uncertainty quantification

Entity: researcher/stephanie_martinez
  affiliation: University of Toronto
  publication_count: 55
  previous_employer: Google Brain (2016-2019)
  research_focus: primary=causal inference, secondary=clinical decision support

Entity: researcher/martin_jung
  affiliation: Purdue University
  publication_count: 82
  previous_employer: Toyota Research Institute (2017-2020)
  research_focus: primary=federated learning, secondary=robotics

Entity: researcher/amanda_bauer
  affiliation: TU Berlin
  publication_count: 96
  previous_employer: Bosch Center for AI (2019-2022)
  research_focus: primary=question answering, secondary=machine translation

Entity: researcher/yuki_castellanos
  affiliation: Leiden University
  publication_count: 59
  previous_employer: Amazon AWS AI (2018-2021)
  research_focus: primary=self-supervised learning, secondary=catastrophic forgetting

Entity: researcher/ahmad_patel
  affiliation: Purdue University
  publication_count: 87
  previous_employer: Intel AI Lab (2016-2019)
  research_focus: primary=causal inference, secondary=catastrophic forgetting

Entity: researcher/katarzyna_albers
  affiliation: Max Planck Institute for Informatics
  publication_count: 43
  previous_employer: Baidu Research (2018-2021)
  research_focus: primary=natural language processing, secondary=efficient deep learning

Entity: researcher/xiao_costa
  affiliation: Tsinghua University
  publication_count: 45
  previous_employer: Apple ML Research (2019-2022)
  research_focus: primary=information retrieval, secondary=generalization bounds

Entity: researcher/alessandro_stefanov
  affiliation: Hong Kong University of Science and Technology
  publication_count: 93
  previous_employer: Citadel Securities Research (2017-2020)
  research_focus: primary=autonomous driving, secondary=certified defenses

Entity: researcher/danielle_huang
  affiliation: Columbia University
  publication_count: 74
  previous_employer: Alibaba DAMO Academy (2018-2021)
  research_focus: primary=information retrieval, secondary=knowledge graphs

Entity: researcher/lucia_tran
  affiliation: University of Washington
  publication_count: 29
  previous_employer: Two Sigma Research (2019-2022)
  research_focus: primary=information retrieval, secondary=program synthesis

Entity: researcher/hassan_wiese
  affiliation: McGill University
  publication_count: 65
  previous_employer: Berkeley AI Research Lab (2016-2019)
  research_focus: primary=code generation, secondary=structured prediction

Entity: researcher/martin_abdullah
  affiliation: Montreal Institute for Learning Algorithms
  publication_count: 29
  previous_employer: Snap Research (2018-2021)
  research_focus: primary=multimodal learning, secondary=model explanation

Entity: researcher/ayaan_bonnet
  affiliation: TU Berlin
  publication_count: 11
  previous_employer: Google DeepMind (2020-2023)
  research_focus: primary=autonomous driving, secondary=sensor fusion

Entity: researcher/magdalena_khan
  affiliation: Virginia Tech
  publication_count: 55
  previous_employer: Waymo Research (2020-2023)
  research_focus: primary=medical imaging, secondary=object detection

Entity: researcher/markus_wu
  affiliation: Cambridge University
  publication_count: 36
  previous_employer: Samsung AI Center (2019-2022)
  research_focus: primary=summarization, secondary=structured prediction

Entity: researcher/chen_giordano
  affiliation: Cornell Tech
  publication_count: 47
  previous_employer: Bosch Center for AI (2019-2022)
  research_focus: primary=out-of-distribution generalization, secondary=model explanation

Entity: researcher/matteo_martinez
  affiliation: University of Amsterdam
  publication_count: 50
  previous_employer: Adobe Research (2017-2020)
  research_focus: primary=dialogue systems, secondary=time series analysis

Entity: researcher/yuki_tremblay
  affiliation: EPFL
  publication_count: 6
  previous_employer: ByteDance AI Lab (2020-2023)
  research_focus: primary=Bayesian deep learning, secondary=time series analysis

Entity: researcher/julian_pereira
  affiliation: Peking University
  publication_count: 87
  previous_employer: Amazon AWS AI (2018-2021)
  research_focus: primary=autonomous driving, secondary=reading comprehension

Entity: researcher/andrew_pham
  affiliation: University of Zurich
  publication_count: 48
  previous_employer: Google DeepMind (2020-2023)
  research_focus: primary=adversarial robustness, secondary=vision-language models

Entity: researcher/jorge_zhao
  affiliation: Tsinghua University
  publication_count: 44
  previous_employer: Alibaba DAMO Academy (2018-2021)
  research_focus: primary=computational biology, secondary=structured prediction

Entity: researcher/francesco_meyer
  affiliation: McGill University
  publication_count: 39
  previous_employer: Samsung AI Center (2019-2022)
  research_focus: primary=AI safety, secondary=clinical decision support

Entity: researcher/jason_fedorov
  affiliation: Cambridge University
  publication_count: 35
  previous_employer: Samsung AI Center (2019-2022)
  research_focus: primary=natural language processing, secondary=few-shot learning

Entity: researcher/andrea_yoshida
  affiliation: Hebrew University
  publication_count: 66
  previous_employer: Alibaba DAMO Academy (2018-2021)
  research_focus: primary=interpretable ML, secondary=model explanation

Entity: researcher/javier_fernandez
  affiliation: Vector Institute
  publication_count: 65
  previous_employer: Adobe Research (2017-2020)
  research_focus: primary=multi-task learning, secondary=privacy-preserving ML

Entity: researcher/paula_richter
  affiliation: University of Washington
  publication_count: 80
  previous_employer: Two Sigma Research (2019-2022)
  research_focus: primary=federated learning, secondary=generalization bounds

Entity: researcher/pablo_jain
  affiliation: TU Berlin
  publication_count: 72
  previous_employer: Waymo Research (2020-2023)
  research_focus: primary=dialogue systems, secondary=clinical decision support

Entity: researcher/grace_romero
  affiliation: UC Berkeley
  publication_count: 5
  previous_employer: Google Research (2018-2021)
  research_focus: primary=AI safety, secondary=clinical decision support

Entity: researcher/hassan_wolf
  affiliation: Leiden University
  publication_count: 29
  previous_employer: ByteDance AI Lab (2020-2023)
  research_focus: primary=multimodal learning, secondary=reading comprehension

Entity: researcher/yang_romero
  affiliation: Leiden University
  publication_count: 34
  previous_employer: Berkeley AI Research Lab (2016-2019)
  research_focus: primary=speech recognition, secondary=protein structure prediction

Entity: researcher/ingrid_demir
  affiliation: Sapienza University of Rome
  publication_count: 13
  previous_employer: Meta AI Research (2020-2023)
  research_focus: primary=question answering, secondary=conversational AI

Entity: researcher/kiran_ghosh
  affiliation: Boston University
  publication_count: 52
  previous_employer: Twitter Machine Learning (2019-2022)
  research_focus: primary=code generation, secondary=catastrophic forgetting

Entity: researcher/eva_dubois
  affiliation: Oxford University
  publication_count: 47
  previous_employer: Citadel Securities Research (2017-2020)
  research_focus: primary=autonomous driving, secondary=robotics

Entity: researcher/connor_lopez
  affiliation: Hebrew University
  publication_count: 92
  previous_employer: Huawei Noah Ark Lab (2018-2021)
  research_focus: primary=graph neural networks, secondary=program synthesis

Entity: researcher/mahsa_wiese
  affiliation: KTH Royal Institute of Technology
  publication_count: 56
  previous_employer: Meta AI Research (2020-2023)
  research_focus: primary=federated learning, secondary=spoken dialog systems

Entity: researcher/markus_tran
  affiliation: Leiden University
  publication_count: 70
  previous_employer: Intel AI Lab (2016-2019)
  research_focus: primary=code generation, secondary=efficient deep learning

Entity: researcher/francesco_yang
  affiliation: Stanford University
  publication_count: 63
  previous_employer: Snap Research (2018-2021)
  research_focus: primary=medical imaging, secondary=reading comprehension

Entity: researcher/laura_brown
  affiliation: Tokyo University
  publication_count: 9
  previous_employer: Bosch Center for AI (2019-2022)
  research_focus: primary=speech recognition, secondary=contrastive methods

Entity: researcher/clara_sanchez
  affiliation: National University of Singapore
  publication_count: 34
  previous_employer: Berkeley AI Research Lab (2016-2019)
  research_focus: primary=AI safety, secondary=few-shot learning

Entity: researcher/saanvi_sorensen
  affiliation: University of Copenhagen
  publication_count: 69
  previous_employer: Uber AI Labs (2017-2020)
  research_focus: primary=autonomous driving, secondary=spoken dialog systems

Entity: researcher/clara_esposito
  affiliation: Oxford University
  publication_count: 17
  previous_employer: Adobe Research (2017-2020)
  research_focus: primary=graph neural networks, secondary=catastrophic forgetting

Entity: researcher/aaron_nilsson
  affiliation: Max Planck Institute for Informatics
  publication_count: 77
  previous_employer: Apple ML Research (2019-2022)
  research_focus: primary=code generation, secondary=uncertainty quantification

Entity: researcher/thomas_fedorov
  affiliation: University of Copenhagen
  publication_count: 69
  previous_employer: Facebook AI Research (2017-2020)
  research_focus: primary=reinforcement learning, secondary=contrastive methods

Entity: researcher/william_martinez
  affiliation: Peking University
  publication_count: 85
  previous_employer: Apple ML Research (2019-2022)
  research_focus: primary=continual learning, secondary=privacy-preserving ML

Entity: researcher/marta_maier
  affiliation: University of Helsinki
  publication_count: 38
  previous_employer: Intel AI Lab (2016-2019)
  research_focus: primary=medical imaging, secondary=generalization bounds

Entity: researcher/jonathan_kumar
  affiliation: Allen Institute for AI
  publication_count: 89
  previous_employer: Amazon AWS AI (2018-2021)
  research_focus: primary=natural language processing, secondary=collaborative filtering

Entity: researcher/simon_mehta
  affiliation: EPFL
  publication_count: 5
  previous_employer: Two Sigma Research (2019-2022)
  research_focus: primary=natural language processing, secondary=collaborative filtering

Entity: researcher/astrid_lopez
  affiliation: EPFL
  publication_count: 22
  previous_employer: ByteDance AI Lab (2020-2023)
  research_focus: primary=autonomous driving, secondary=uncertainty quantification

Entity: researcher/alessandro_vega
  affiliation: Stanford University
  publication_count: 53
  previous_employer: Amazon AWS AI (2018-2021)
  research_focus: primary=summarization, secondary=few-shot learning

Entity: researcher/alina_wolf
  affiliation: Georgia Tech
  publication_count: 95
  previous_employer: Uber AI Labs (2017-2020)
  research_focus: primary=computer vision, secondary=vision-language models

Entity: researcher/hugo_huang
  affiliation: University of Amsterdam
  publication_count: 44
  previous_employer: Meta AI Research (2020-2023)
  research_focus: primary=reinforcement learning, secondary=certified defenses

Entity: researcher/brandon_choi
  affiliation: University of Illinois Urbana-Champaign
  publication_count: 86
  previous_employer: Two Sigma Research (2019-2022)
  research_focus: primary=code generation, secondary=transfer learning

Entity: researcher/ingrid_gupta
  affiliation: Caltech
  publication_count: 92
  previous_employer: Qualcomm AI Research (2017-2020)
  research_focus: primary=question answering, secondary=protein structure prediction

Entity: researcher/erin_dubois
  affiliation: Sapienza University of Rome
  publication_count: 30
  previous_employer: Vector Institute (2018-2021)
  research_focus: primary=self-supervised learning, secondary=value alignment

Entity: researcher/christoph_yang
  affiliation: INRIA Paris
  publication_count: 53
  previous_employer: Uber AI Labs (2017-2020)
  research_focus: primary=autonomous driving, secondary=sensor fusion

Entity: researcher/hugo_ramirez
  affiliation: Hong Kong University of Science and Technology
  publication_count: 96
  previous_employer: Baidu Research (2018-2021)
  research_focus: primary=self-supervised learning, secondary=few-shot learning

Entity: researcher/sandra_castro
  affiliation: Hong Kong University of Science and Technology
  publication_count: 77
  previous_employer: Toyota Research Institute (2017-2020)
  research_focus: primary=information retrieval, secondary=domain adaptation

Entity: researcher/noah_dawit
  affiliation: UC Berkeley
  publication_count: 57
  previous_employer: Two Sigma Research (2019-2022)
  research_focus: primary=computer vision, secondary=knowledge graphs

Entity: researcher/noah_blum
  affiliation: University of Washington
  publication_count: 7
  previous_employer: Twitter Machine Learning (2019-2022)
  research_focus: primary=Bayesian deep learning, secondary=object detection

Entity: researcher/shreya_ritter
  affiliation: Sapienza University of Rome
  publication_count: 60
  previous_employer: Google Research (2018-2021)
  research_focus: primary=summarization, secondary=domain adaptation

Entity: researcher/mario_nguyen
  affiliation: Chinese University of Hong Kong
  publication_count: 85
  previous_employer: ByteDance AI Lab (2020-2023)
  research_focus: primary=computational biology, secondary=transfer learning

Entity: researcher/jason_moretti
  affiliation: Princeton CS
  publication_count: 86
  previous_employer: ByteDance AI Lab (2020-2023)
  research_focus: primary=computational biology, secondary=generalization bounds

Entity: researcher/arnav_zimmermann
  affiliation: MIT Computer Science
  publication_count: 60
  previous_employer: ByteDance AI Lab (2020-2023)
  research_focus: primary=computer vision, secondary=privacy-preserving ML

Entity: researcher/grace_wolf
  affiliation: University of Melbourne
  publication_count: 10
  previous_employer: Microsoft Research (2015-2018)
  research_focus: primary=out-of-distribution generalization, secondary=efficient deep learning

Entity: researcher/sofia_koch
  affiliation: MIT Computer Science
  publication_count: 76
  previous_employer: Two Sigma Research (2019-2022)
  research_focus: primary=neural architecture search, secondary=dense retrieval

Entity: researcher/jana_saito
  affiliation: McGill University
  publication_count: 98
  previous_employer: Baidu Research (2018-2021)
  research_focus: primary=out-of-distribution generalization, secondary=counterfactual reasoning

Entity: researcher/nicolas_ritter
  affiliation: Columbia University
  publication_count: 48
  previous_employer: Qualcomm AI Research (2017-2020)
  research_focus: primary=multimodal learning, secondary=abstractive generation

Entity: researcher/diego_vega
  affiliation: Max Planck Institute for Informatics
  publication_count: 33
  previous_employer: Jane Street Research (2018-2021)
  research_focus: primary=dialogue systems, secondary=time series analysis

Entity: researcher/zhao_dimitriou
  affiliation: Chinese University of Hong Kong
  publication_count: 63
  previous_employer: Alibaba DAMO Academy (2018-2021)
  research_focus: primary=graph neural networks, secondary=domain adaptation

Entity: researcher/anders_laurent
  affiliation: Cornell Tech
  publication_count: 87
  previous_employer: Waymo Research (2020-2023)
  research_focus: primary=question answering, secondary=vision-language models

Entity: researcher/lucia_khan
  affiliation: University of Illinois Urbana-Champaign
  publication_count: 72
  previous_employer: Tencent AI Lab (2019-2022)
  research_focus: primary=question answering, secondary=sensor fusion

Entity: researcher/alexei_jung
  affiliation: MIT Computer Science
  publication_count: 8
  previous_employer: Meta AI Research (2020-2023)
  research_focus: primary=computational biology, secondary=spoken dialog systems

Entity: researcher/rafael_kapoor
  affiliation: INRIA Paris
  publication_count: 70
  previous_employer: Alibaba DAMO Academy (2018-2021)
  research_focus: primary=computational biology, secondary=collaborative filtering

Entity: researcher/ilaria_larsson
  affiliation: Stanford University
  publication_count: 54
  previous_employer: Microsoft Research (2017-2020)
  research_focus: primary=anomaly detection, secondary=collaborative filtering

Entity: researcher/tom_smith
  affiliation: University of British Columbia
  publication_count: 21
  previous_employer: Jane Street Research (2018-2021)
  research_focus: primary=natural language processing, secondary=uncertainty quantification

Entity: researcher/neha_braun
  affiliation: Northeastern University
  publication_count: 45
  previous_employer: Adobe Research (2017-2020)
  research_focus: primary=information retrieval, secondary=object detection

Entity: researcher/delia_popescu
  affiliation: Cornell Tech
  publication_count: 31
  previous_employer: Salesforce Research (2018-2021)
  research_focus: primary=interpretable ML, secondary=reading comprehension

Entity: researcher/catherine_castellanos
  affiliation: University of Amsterdam
  publication_count: 98
  previous_employer: Adobe Research (2017-2020)
  research_focus: primary=question answering, secondary=generalization bounds

Entity: researcher/beatriz_fischer
  affiliation: Tokyo University
  publication_count: 97
  previous_employer: Salesforce Research (2018-2021)
  research_focus: primary=recommendation systems, secondary=value alignment

Entity: researcher/marco_fedorov
  affiliation: Hong Kong University of Science and Technology
  publication_count: 14
  previous_employer: Alibaba DAMO Academy (2018-2021)
  research_focus: primary=adversarial robustness, secondary=clinical decision support

Entity: researcher/mario_esposito
  affiliation: University of Toronto
  publication_count: 35
  previous_employer: Google Brain (2016-2019)
  research_focus: primary=machine learning theory, secondary=clinical decision support

Entity: researcher/shreya_moreau
  affiliation: Allen Institute for AI
  publication_count: 29
  previous_employer: Adobe Research (2017-2020)
  research_focus: primary=interpretable ML, secondary=generalization bounds

Entity: researcher/grace_christiansen
  affiliation: Sapienza University of Rome
  publication_count: 62
  previous_employer: Microsoft Research (2015-2018)
  research_focus: primary=anomaly detection, secondary=generalization bounds

Entity: researcher/neha_burger
  affiliation: Cornell Tech
  publication_count: 37
  previous_employer: Berkeley AI Research Lab (2016-2019)
  research_focus: primary=adversarial robustness, secondary=value alignment

Entity: researcher/anna_vasquez
  affiliation: University of Zurich
  publication_count: 75
  previous_employer: Google Research (2018-2021)
  research_focus: primary=dialogue systems, secondary=uncertainty quantification

Entity: researcher/heidi_richter
  affiliation: Tokyo University
  publication_count: 9
  previous_employer: Qualcomm AI Research (2017-2020)
  research_focus: primary=computer vision, secondary=time series analysis

Entity: researcher/rafael_reyes
  affiliation: EPFL
  publication_count: 79
  previous_employer: Salesforce Research (2018-2021)
  research_focus: primary=out-of-distribution generalization, secondary=generalization bounds

Entity: researcher/charlotte_wolf
  affiliation: TU Berlin
  publication_count: 55
  previous_employer: Twitter Machine Learning (2019-2022)
  research_focus: primary=adversarial robustness, secondary=domain adaptation

Entity: researcher/mahsa_castro
  affiliation: McGill University
  publication_count: 81
  previous_employer: NVIDIA Research (2017-2020)
  research_focus: primary=machine learning theory, secondary=sensor fusion

Entity: researcher/chen_santos
  affiliation: Caltech
  publication_count: 91
  previous_employer: Citadel Securities Research (2017-2020)
  research_focus: primary=medical imaging, secondary=sensor fusion

Entity: researcher/james_wenger
  affiliation: Princeton CS
  publication_count: 69
  previous_employer: Adobe Research (2017-2020)
  research_focus: primary=machine learning theory, secondary=clinical decision support

Entity: researcher/astrid_lee
  affiliation: University of Illinois Urbana-Champaign
  publication_count: 57
  previous_employer: Qualcomm AI Research (2017-2020)
  research_focus: primary=computational biology, secondary=domain adaptation

Entity: researcher/petra_castellanos
  affiliation: University of Illinois Urbana-Champaign
  publication_count: 66
  previous_employer: Amazon AWS AI (2018-2021)
  research_focus: primary=multi-task learning, secondary=catastrophic forgetting

Entity: researcher/tara_ritter
  affiliation: Vector Institute
  publication_count: 98
  previous_employer: IBM Research (2016-2019)
  research_focus: primary=graph neural networks, secondary=program synthesis

Entity: researcher/caroline_fuentes
  affiliation: UC Berkeley
  publication_count: 80
  previous_employer: Salesforce Research (2018-2021)
  research_focus: primary=anomaly detection, secondary=dense retrieval

Entity: researcher/cyrus_stark
  affiliation: Chinese University of Hong Kong
  publication_count: 96
  previous_employer: Jane Street Research (2018-2021)
  research_focus: primary=adversarial robustness, secondary=robotics

Entity: researcher/delia_ramos
  affiliation: National University of Singapore
  publication_count: 92
  previous_employer: Meta AI Research (2020-2023)
  research_focus: primary=commonsense reasoning, secondary=value alignment

Entity: researcher/natalie_khan
  affiliation: Max Planck Institute for Informatics
  publication_count: 22
  previous_employer: Samsung AI Center (2019-2022)
  research_focus: primary=out-of-distribution generalization, secondary=knowledge graphs

Entity: researcher/andrea_pacheco
  affiliation: Tsinghua University
  publication_count: 98
  previous_employer: Twitter Machine Learning (2019-2022)
  research_focus: primary=federated learning, secondary=counterfactual reasoning

Entity: researcher/claudia_schmid
  affiliation: University of Edinburgh
  publication_count: 52
  previous_employer: Berkeley AI Research Lab (2016-2019)
  research_focus: primary=multi-task learning, secondary=vision-language models

Entity: researcher/olivia_johansson
  affiliation: McGill University
  publication_count: 37
  previous_employer: OpenAI Research (2019-2022)
  research_focus: primary=interpretable ML, secondary=program synthesis

Entity: researcher/alexei_huang
  affiliation: Virginia Tech
  publication_count: 53
  previous_employer: Microsoft Research (2017-2020)
  research_focus: primary=reinforcement learning, secondary=uncertainty quantification

Entity: researcher/mira_narasimhan
  affiliation: University of Illinois Urbana-Champaign
  publication_count: 97
  previous_employer: Toyota Research Institute (2017-2020)
  research_focus: primary=multi-task learning, secondary=structured prediction

Entity: researcher/hannah_kumar
  affiliation: Oxford University
  publication_count: 48
  previous_employer: OpenAI (2018-2021)
  research_focus: primary=recommendation systems, secondary=spoken dialog systems

Entity: researcher/aryan_gupta
  affiliation: Columbia University
  publication_count: 83
  previous_employer: Toyota Research Institute (2017-2020)
  research_focus: primary=adversarial robustness, secondary=structured prediction

Entity: researcher/nathan_sekar
  affiliation: Northeastern University
  publication_count: 36
  previous_employer: Waymo Research (2020-2023)
  research_focus: primary=neural architecture search, secondary=transfer learning

Entity: researcher/sofia_moretti
  affiliation: University of Zurich
  publication_count: 51
  previous_employer: Intel AI Lab (2016-2019)
  research_focus: primary=out-of-distribution generalization, secondary=sensor fusion

Entity: researcher/dilnoza_moretti
  affiliation: Technion
  publication_count: 40
  previous_employer: Uber AI Labs (2017-2020)
  research_focus: primary=AI safety, secondary=certified defenses

Entity: researcher/antoine_laurent
  affiliation: UT Austin
  publication_count: 58
  previous_employer: Google DeepMind (2020-2023)
  research_focus: primary=recommendation systems, secondary=time series analysis

Entity: researcher/jakub_wiese
  affiliation: Cornell Tech
  publication_count: 58
  previous_employer: Salesforce Research (2018-2021)
  research_focus: primary=recommendation systems, secondary=counterfactual reasoning

Entity: researcher/colin_singh
  affiliation: University of Zurich
  publication_count: 29
  previous_employer: IBM Research (2016-2019)
  research_focus: primary=computer vision, secondary=reading comprehension

Entity: researcher/lorenzo_ahmadi
  affiliation: Technion
  publication_count: 48
  previous_employer: Microsoft Research (2017-2020)
  research_focus: primary=multi-task learning, secondary=transfer learning

Entity: researcher/jorge_flores
  affiliation: University of Toronto
  publication_count: 37
  previous_employer: Bosch Center for AI (2019-2022)
  research_focus: primary=out-of-distribution generalization, secondary=privacy-preserving ML

Entity: researcher/carlos_silva
  affiliation: Purdue University
  publication_count: 6
  previous_employer: Jane Street Research (2018-2021)
  research_focus: primary=graph neural networks, secondary=catastrophic forgetting

Entity: researcher/ahmad_silva
  affiliation: University of Melbourne
  publication_count: 18
  previous_employer: Meta AI Research (2020-2023)
  research_focus: primary=commonsense reasoning, secondary=object detection

Entity: researcher/zara_novak
  affiliation: Sapienza University of Rome
  publication_count: 90
  previous_employer: Jane Street Research (2018-2021)
  research_focus: primary=recommendation systems, secondary=dense retrieval

Entity: researcher/lena_richter
  affiliation: McGill University
  publication_count: 98
  previous_employer: Baidu Research (2018-2021)
  research_focus: primary=causal inference, secondary=conversational AI

Entity: researcher/lauren_schmid
  affiliation: Hebrew University
  publication_count: 93
  previous_employer: Google Research (2018-2021)
  research_focus: primary=machine learning theory, secondary=sensor fusion

Entity: researcher/ayaan_pham
  affiliation: Columbia University
  publication_count: 71
  previous_employer: ByteDance AI Lab (2020-2023)
  research_focus: primary=medical imaging, secondary=program synthesis

Entity: researcher/julien_hoffmann
  affiliation: Carnegie Mellon University
  publication_count: 52
  previous_employer: Salesforce Research (2018-2021)
  research_focus: primary=recommendation systems, secondary=machine translation

Entity: researcher/deepa_acharya
  affiliation: Tokyo University
  publication_count: 33
  previous_employer: NVIDIA Research (2017-2020)
  research_focus: primary=adversarial robustness, secondary=vision-language models

Entity: researcher/zara_rossi
  affiliation: TU Berlin
  publication_count: 76
  previous_employer: Google Research (2018-2021)
  research_focus: primary=neural architecture search, secondary=time series analysis

Entity: researcher/giulia_esposito
  affiliation: Sapienza University of Rome
  publication_count: 29
  previous_employer: Samsung AI Center (2019-2022)
  research_focus: primary=semantic parsing, secondary=dense retrieval

Entity: researcher/marina_malik
  affiliation: Chinese University of Hong Kong
  publication_count: 37
  previous_employer: Amazon AWS AI (2018-2021)
  research_focus: primary=commonsense reasoning, secondary=dense retrieval

Entity: researcher/filip_hansen
  affiliation: Princeton CS
  publication_count: 98
  previous_employer: Google Research (2018-2021)
  research_focus: primary=Bayesian deep learning, secondary=knowledge graphs

Entity: researcher/pablo_tran
  affiliation: Peking University
  publication_count: 57
  previous_employer: Waymo Research (2020-2023)
  research_focus: primary=self-supervised learning, secondary=dense retrieval

Entity: researcher/eva_brown
  affiliation: University of Toronto
  publication_count: 78
  previous_employer: Apple ML Research (2019-2022)
  research_focus: primary=multi-task learning, secondary=model explanation

Entity: researcher/jorge_vasquez
  affiliation: ETH Zurich
  publication_count: 9
  previous_employer: Baidu Research (2018-2021)
  research_focus: primary=multimodal learning, secondary=vision-language models

Entity: researcher/william_zuberi
  affiliation: TU Berlin
  publication_count: 89
  previous_employer: Apple ML Research (2019-2022)
  research_focus: primary=neural architecture search, secondary=efficient deep learning

Entity: researcher/luis_liu
  affiliation: Carnegie Mellon University
  publication_count: 69
  previous_employer: Toyota Research Institute (2017-2020)
  research_focus: primary=semantic parsing, secondary=domain adaptation

Entity: researcher/hassan_larsson
  affiliation: Boston University
  publication_count: 57
  previous_employer: Bosch Center for AI (2019-2022)
  research_focus: primary=graph neural networks, secondary=abstractive generation

Entity: researcher/dimitri_muller
  affiliation: University of Michigan
  publication_count: 30
  previous_employer: Microsoft Research (2017-2020)
  research_focus: primary=continual learning, secondary=clinical decision support

Entity: researcher/finn_ndiaye
  affiliation: Allen Institute for AI
  publication_count: 46
  previous_employer: Two Sigma Research (2019-2022)
  research_focus: primary=computer vision, secondary=sensor fusion

Entity: researcher/elizabeth_smith
  affiliation: University of Sydney
  publication_count: 50
  previous_employer: Waymo Research (2020-2023)
  research_focus: primary=multimodal learning, secondary=reading comprehension

Entity: researcher/finn_kang
  affiliation: Leiden University
  publication_count: 51
  previous_employer: OpenAI (2018-2021)
  research_focus: primary=semantic parsing, secondary=structured prediction

Entity: researcher/rahul_wolf
  affiliation: Boston University
  publication_count: 63
  previous_employer: ByteDance AI Lab (2020-2023)
  research_focus: primary=graph neural networks, secondary=time series analysis

Entity: researcher/luis_garcia
  affiliation: McGill University
  publication_count: 88
  previous_employer: Citadel Securities Research (2017-2020)
  research_focus: primary=medical imaging, secondary=catastrophic forgetting

Entity: researcher/tara_fuentes
  affiliation: Tsinghua University
  publication_count: 93
  previous_employer: Tencent AI Lab (2019-2022)
  research_focus: primary=self-supervised learning, secondary=knowledge graphs

Entity: researcher/andrei_zhang
  affiliation: UT Austin
  publication_count: 79
  previous_employer: Citadel Securities Research (2017-2020)
  research_focus: primary=natural language processing, secondary=model explanation

Entity: researcher/ethan_maier
  affiliation: Leiden University
  publication_count: 12
  previous_employer: Snap Research (2018-2021)
  research_focus: primary=graph neural networks, secondary=value alignment

Entity: researcher/luis_santos
  affiliation: Hong Kong University of Science and Technology
  publication_count: 96
  previous_employer: NVIDIA Research (2017-2020)
  research_focus: primary=medical imaging, secondary=catastrophic forgetting

Entity: researcher/ivan_andersen
  affiliation: TU Berlin
  publication_count: 55
  previous_employer: Qualcomm AI Research (2017-2020)
  research_focus: primary=federated learning, secondary=vision-language models

Entity: researcher/charlotte_flores
  affiliation: University of British Columbia
  publication_count: 78
  previous_employer: Amazon AWS AI (2018-2021)
  research_focus: primary=medical imaging, secondary=uncertainty quantification

Entity: researcher/felix_lee
  affiliation: UT Austin
  publication_count: 5
  previous_employer: Apple ML Research (2019-2022)
  research_focus: primary=medical imaging, secondary=conversational AI

Entity: researcher/erica_wenger
  affiliation: Seoul National University
  publication_count: 94
  previous_employer: Waymo Research (2020-2023)
  research_focus: primary=information retrieval, secondary=transfer learning

Entity: researcher/boris_weber
  affiliation: University of British Columbia
  publication_count: 52
  previous_employer: Google Research (2018-2021)
  research_focus: primary=semantic parsing, secondary=machine translation

Entity: researcher/aryan_ritter
  affiliation: University of Illinois Urbana-Champaign
  publication_count: 45
  previous_employer: Google Brain (2016-2019)
  research_focus: primary=information retrieval, secondary=structured prediction

Entity: researcher/hassan_kang
  affiliation: Purdue University
  publication_count: 42
  previous_employer: NVIDIA Research (2017-2020)
  research_focus: primary=continual learning, secondary=spoken dialog systems

Entity: researcher/rajesh_zhang
  affiliation: University of British Columbia
  publication_count: 80
  previous_employer: Qualcomm AI Research (2017-2020)
  research_focus: primary=information retrieval, secondary=knowledge graphs

Entity: researcher/luna_dobrescu
  affiliation: Hebrew University
  publication_count: 36
  previous_employer: Vector Institute (2018-2021)
  research_focus: primary=causal inference, secondary=model explanation

Entity: researcher/mahsa_costa
  affiliation: University of Toronto
  publication_count: 49
  previous_employer: ByteDance AI Lab (2020-2023)
  research_focus: primary=speech recognition, secondary=contrastive methods

Entity: researcher/aditya_albers
  affiliation: Virginia Tech
  publication_count: 17
  previous_employer: Waymo Research (2020-2023)
  research_focus: primary=code generation, secondary=model explanation

Entity: researcher/andrea_koch
  affiliation: Georgia Tech
  publication_count: 10
  previous_employer: OpenAI Research (2019-2022)
  research_focus: primary=neural architecture search, secondary=time series analysis

Entity: researcher/benjamin_diop
  affiliation: UC Berkeley
  publication_count: 68
  previous_employer: Microsoft Research (2015-2018)
  research_focus: primary=reinforcement learning, secondary=spoken dialog systems

Entity: researcher/katarzyna_pacheco
  affiliation: Chinese University of Hong Kong
  publication_count: 92
  previous_employer: Vector Institute (2018-2021)
  research_focus: primary=commonsense reasoning, secondary=structured prediction

Entity: researcher/andrzej_osei
  affiliation: EPFL
  publication_count: 43
  previous_employer: Adobe Research (2017-2020)
  research_focus: primary=speech recognition, secondary=uncertainty quantification

Entity: researcher/julien_sharma
  affiliation: MIT Computer Science
  publication_count: 5
  previous_employer: IBM Research (2016-2019)
  research_focus: primary=summarization, secondary=conversational AI

Entity: researcher/connor_fernandez
  affiliation: Tokyo University
  publication_count: 78
  previous_employer: Toyota Research Institute (2017-2020)
  research_focus: primary=reinforcement learning, secondary=transfer learning

Entity: researcher/milan_rashid
  affiliation: UT Austin
  publication_count: 93
  previous_employer: Qualcomm AI Research (2017-2020)
  research_focus: primary=self-supervised learning, secondary=certified defenses

Entity: researcher/dakarai_sekar
  affiliation: MIT Computer Science
  publication_count: 54
  previous_employer: Waymo Research (2020-2023)
  research_focus: primary=multimodal learning, secondary=privacy-preserving ML

Entity: researcher/amanda_lee
  affiliation: University of Illinois Urbana-Champaign
  publication_count: 86
  previous_employer: Microsoft Research (2017-2020)
  research_focus: primary=anomaly detection, secondary=conversational AI

Entity: researcher/lauren_hoffmann
  affiliation: Columbia University
  publication_count: 55
  previous_employer: OpenAI (2018-2021)
  research_focus: primary=causal inference, secondary=few-shot learning

Entity: researcher/matteo_yoshida
  affiliation: Tokyo University
  publication_count: 66
  previous_employer: Google Brain (2016-2019)
  research_focus: primary=adversarial robustness, secondary=robotics

Entity: researcher/anna_zhang
  affiliation: Vector Institute
  publication_count: 88
  previous_employer: Snap Research (2018-2021)
  research_focus: primary=autonomous driving, secondary=counterfactual reasoning

Entity: researcher/lucia_johansson
  affiliation: Max Planck Institute for Informatics
  publication_count: 87
  previous_employer: OpenAI Research (2019-2022)
  research_focus: primary=continual learning, secondary=knowledge graphs

Entity: researcher/leon_ferrari
  affiliation: University of Copenhagen
  publication_count: 42
  previous_employer: Meta AI Research (2020-2023)
  research_focus: primary=medical imaging, secondary=object detection

Entity: researcher/rafael_yang
  affiliation: University of Michigan
  publication_count: 89
  previous_employer: Huawei Noah Ark Lab (2018-2021)
  research_focus: primary=federated learning, secondary=vision-language models

Entity: researcher/matteo_saito
  affiliation: Boston University
  publication_count: 34
  previous_employer: Microsoft Research (2015-2018)
  research_focus: primary=meta-learning, secondary=machine translation

Entity: researcher/james_lee
  affiliation: Stanford University
  publication_count: 98
  previous_employer: Meta AI Research (2020-2023)
  research_focus: primary=dialogue systems, secondary=efficient deep learning

Entity: researcher/cassandra_malik
  affiliation: Purdue University
  publication_count: 47
  previous_employer: Toyota Research Institute (2017-2020)
  research_focus: primary=interpretable ML, secondary=value alignment

Entity: researcher/francesca_schmidt
  affiliation: TU Berlin
  publication_count: 67
  previous_employer: OpenAI (2018-2021)
  research_focus: primary=graph neural networks, secondary=model explanation

Entity: researcher/fatimah_hansen
  affiliation: University of Helsinki
  publication_count: 6
  previous_employer: Alibaba DAMO Academy (2018-2021)
  research_focus: primary=federated learning, secondary=uncertainty quantification

Entity: researcher/alessandro_ramirez
  affiliation: Tokyo University
  publication_count: 35
  previous_employer: Huawei Noah Ark Lab (2018-2021)
  research_focus: primary=self-supervised learning, secondary=efficient deep learning

Entity: researcher/felix_saito
  affiliation: University of Washington
  publication_count: 5
  previous_employer: Microsoft Research (2017-2020)
  research_focus: primary=federated learning, secondary=privacy-preserving ML

Entity: researcher/celine_schmid
  affiliation: Purdue University
  publication_count: 80
  previous_employer: Samsung AI Center (2019-2022)
  research_focus: primary=continual learning, secondary=reading comprehension

Entity: researcher/jennifer_cruz
  affiliation: Cornell Tech
  publication_count: 96
  previous_employer: Google Research (2018-2021)
  research_focus: primary=graph neural networks, secondary=knowledge graphs

Entity: researcher/caroline_oh
  affiliation: Cornell Tech
  publication_count: 68
  previous_employer: Snap Research (2018-2021)
  research_focus: primary=federated learning, secondary=privacy-preserving ML

Entity: researcher/jacob_vasquez
  affiliation: University of Michigan
  publication_count: 93
  previous_employer: ByteDance AI Lab (2020-2023)
  research_focus: primary=autonomous driving, secondary=structured prediction

Entity: researcher/ashwin_zhang
  affiliation: Sapienza University of Rome
  publication_count: 41
  previous_employer: Toyota Research Institute (2017-2020)
  research_focus: primary=multi-task learning, secondary=contrastive methods

Entity: researcher/delia_klein
  affiliation: Seoul National University
  publication_count: 26
  previous_employer: Microsoft Research (2015-2018)
  research_focus: primary=causal inference, secondary=catastrophic forgetting

Entity: researcher/emma_weber
  affiliation: University of Amsterdam
  publication_count: 36
  previous_employer: Waymo Research (2020-2023)
  research_focus: primary=medical imaging, secondary=model explanation

Entity: researcher/mahsa_giordano
  affiliation: Peking University
  publication_count: 91
  previous_employer: Huawei Noah Ark Lab (2018-2021)
  research_focus: primary=interpretable ML, secondary=conversational AI

Entity: researcher/lisa_hernandez
  affiliation: University of Illinois Urbana-Champaign
  publication_count: 64
  previous_employer: Samsung AI Center (2019-2022)
  research_focus: primary=code generation, secondary=sensor fusion

Entity: researcher/alicia_rossi
  affiliation: NYU Courant Institute
  publication_count: 30
  previous_employer: Twitter Machine Learning (2019-2022)
  research_focus: primary=commonsense reasoning, secondary=reading comprehension

Entity: researcher/chen_rodriguez
  affiliation: MIT Computer Science
  publication_count: 87
  previous_employer: Samsung AI Center (2019-2022)
  research_focus: primary=multimodal learning, secondary=catastrophic forgetting

Entity: researcher/francesca_eriksson
  affiliation: University of Copenhagen
  publication_count: 84
  previous_employer: Facebook AI Research (2017-2020)
  research_focus: primary=anomaly detection, secondary=time series analysis

Entity: researcher/ricardo_silva
  affiliation: Princeton CS
  publication_count: 18
  previous_employer: Two Sigma Research (2019-2022)
  research_focus: primary=recommendation systems, secondary=few-shot learning

Entity: researcher/deepa_martinez
  affiliation: Allen Institute for AI
  publication_count: 59
  previous_employer: Samsung AI Center (2019-2022)
  research_focus: primary=graph neural networks, secondary=program synthesis

Entity: researcher/lucia_weiss
  affiliation: Virginia Tech
  publication_count: 85
  previous_employer: Intel AI Lab (2016-2019)
  research_focus: primary=commonsense reasoning, secondary=contrastive methods

Entity: researcher/robert_larsson
  affiliation: Virginia Tech
  publication_count: 50
  previous_employer: Tesla AI (2019-2022)
  research_focus: primary=dialogue systems, secondary=certified defenses

Entity: researcher/karen_zimmermann
  affiliation: Columbia University
  publication_count: 70
  previous_employer: Tencent AI Lab (2019-2022)
  research_focus: primary=federated learning, secondary=knowledge grounding

Entity: researcher/takahiro_hansen
  affiliation: Seoul National University
  publication_count: 19
  previous_employer: OpenAI Research (2019-2022)
  research_focus: primary=causal inference, secondary=counterfactual reasoning

Entity: researcher/karin_schmid
  affiliation: MIT Computer Science
  publication_count: 56
  previous_employer: Baidu Research (2018-2021)
  research_focus: primary=recommendation systems, secondary=object detection

Entity: researcher/connor_ivanova
  affiliation: Montreal Institute for Learning Algorithms
  publication_count: 81
  previous_employer: Toyota Research Institute (2017-2020)
  research_focus: primary=natural language processing, secondary=catastrophic forgetting

Entity: researcher/katarzyna_giordano
  affiliation: Virginia Tech
  publication_count: 35
  previous_employer: Microsoft Research (2017-2020)
  research_focus: primary=speech recognition, secondary=clinical decision support

Entity: researcher/jacob_andersen
  affiliation: Montreal Institute for Learning Algorithms
  publication_count: 44
  previous_employer: Microsoft Research (2015-2018)
  research_focus: primary=speech recognition, secondary=vision-language models

Entity: researcher/ivan_braun
  affiliation: National University of Singapore
  publication_count: 26
  previous_employer: Waymo Research (2020-2023)
  research_focus: primary=meta-learning, secondary=uncertainty quantification

Entity: researcher/ilaria_sanchez
  affiliation: KTH Royal Institute of Technology
  publication_count: 42
  previous_employer: Microsoft Research (2015-2018)
  research_focus: primary=out-of-distribution generalization, secondary=structured prediction

Entity: researcher/kate_dimitriou
  affiliation: Sapienza University of Rome
  publication_count: 96
  previous_employer: Tesla AI (2019-2022)
  research_focus: primary=medical imaging, secondary=sensor fusion

Entity: researcher/nour_narasimhan
  affiliation: McGill University
  publication_count: 23
  previous_employer: ByteDance AI Lab (2020-2023)
  research_focus: primary=interpretable ML, secondary=spoken dialog systems

Entity: researcher/andrei_santos
  affiliation: Vector Institute
  publication_count: 69
  previous_employer: Twitter Machine Learning (2019-2022)
  research_focus: primary=semantic parsing, secondary=counterfactual reasoning

Entity: researcher/mihail_santos
  affiliation: Vector Institute
  publication_count: 47
  previous_employer: Qualcomm AI Research (2017-2020)
  research_focus: primary=adversarial robustness, secondary=domain adaptation

Entity: researcher/robin_muller
  affiliation: University of Michigan
  publication_count: 97
  previous_employer: Facebook AI Research (2017-2020)
  research_focus: primary=medical imaging, secondary=abstractive generation

Entity: researcher/jessica_kim
  affiliation: University of Sydney
  publication_count: 53
  previous_employer: Waymo Research (2020-2023)
  research_focus: primary=speech recognition, secondary=privacy-preserving ML

Entity: researcher/elizabeth_yang
  affiliation: EPFL
  publication_count: 55
  previous_employer: Twitter Machine Learning (2019-2022)
  research_focus: primary=summarization, secondary=knowledge graphs

Entity: researcher/aditya_dobrescu
  affiliation: University of Melbourne
  publication_count: 16
  previous_employer: Twitter Machine Learning (2019-2022)
  research_focus: primary=out-of-distribution generalization, secondary=robotics

Entity: researcher/dario_yoshida
  affiliation: McGill University
  publication_count: 15
  previous_employer: Two Sigma Research (2019-2022)
  research_focus: primary=information retrieval, secondary=privacy-preserving ML

Entity: researcher/dimitri_abdullah
  affiliation: UC Berkeley
  publication_count: 22
  previous_employer: Samsung AI Center (2019-2022)
  research_focus: primary=meta-learning, secondary=model explanation

Entity: researcher/angela_fedorov
  affiliation: Purdue University
  publication_count: 12
  previous_employer: Vector Institute (2018-2021)
  research_focus: primary=interpretable ML, secondary=abstractive generation

Entity: researcher/oscar_smith
  affiliation: Seoul National University
  publication_count: 15
  previous_employer: IBM Research (2016-2019)
  research_focus: primary=self-supervised learning, secondary=spoken dialog systems

Entity: researcher/jorge_park
  affiliation: University of Washington
  publication_count: 9
  previous_employer: Uber AI Labs (2017-2020)
  research_focus: primary=natural language processing, secondary=spoken dialog systems

Entity: researcher/erin_sekar
  affiliation: Vector Institute
  publication_count: 75
  previous_employer: Microsoft Research (2015-2018)
  research_focus: primary=computational biology, secondary=time series analysis

Entity: researcher/tom_saha
  affiliation: Caltech
  publication_count: 67
  previous_employer: ByteDance AI Lab (2020-2023)
  research_focus: primary=AI safety, secondary=catastrophic forgetting

Entity: researcher/delia_oh
  affiliation: University of Edinburgh
  publication_count: 81
  previous_employer: Waymo Research (2020-2023)
  research_focus: primary=graph neural networks, secondary=certified defenses

Entity: researcher/hugo_khan
  affiliation: University of Zurich
  publication_count: 52
  previous_employer: Huawei Noah Ark Lab (2018-2021)
  research_focus: primary=multi-task learning, secondary=clinical decision support

Entity: researcher/christoph_dawit
  affiliation: University of Edinburgh
  publication_count: 79
  previous_employer: Google Brain (2016-2019)
  research_focus: primary=continual learning, secondary=counterfactual reasoning

Entity: researcher/eva_kang
  affiliation: Vector Institute
  publication_count: 35
  previous_employer: Jane Street Research (2018-2021)
  research_focus: primary=out-of-distribution generalization, secondary=conversational AI

Entity: researcher/sarah_ivanova
  affiliation: Tsinghua University
  publication_count: 20
  previous_employer: Microsoft Research (2015-2018)
  research_focus: primary=speech recognition, secondary=protein structure prediction

Entity: researcher/jacob_wagner
  affiliation: EPFL
  publication_count: 5
  previous_employer: Amazon AWS AI (2018-2021)
  research_focus: primary=neural architecture search, secondary=spoken dialog systems

Entity: researcher/emma_ritter
  affiliation: Caltech
  publication_count: 86
  previous_employer: Berkeley AI Research Lab (2016-2019)
  research_focus: primary=dialogue systems, secondary=spoken dialog systems

Entity: researcher/boris_lutz
  affiliation: University of Edinburgh
  publication_count: 73
  previous_employer: Adobe Research (2017-2020)
  research_focus: primary=federated learning, secondary=domain adaptation

Entity: researcher/finn_wolf
  affiliation: Georgia Tech
  publication_count: 47
  previous_employer: Tesla AI (2019-2022)
  research_focus: primary=autonomous driving, secondary=collaborative filtering

Entity: researcher/karen_wagner
  affiliation: Oxford University
  publication_count: 98
  previous_employer: Twitter Machine Learning (2019-2022)
  research_focus: primary=computational biology, secondary=robotics

Entity: researcher/jessica_petrov
  affiliation: Cornell Tech
  publication_count: 86
  previous_employer: Tesla AI (2019-2022)
  research_focus: primary=semantic parsing, secondary=conversational AI

Entity: researcher/sophia_gonzalez
  affiliation: INRIA Paris
  publication_count: 76
  previous_employer: OpenAI (2018-2021)
  research_focus: primary=machine learning theory, secondary=uncertainty quantification

Entity: researcher/elizabeth_dawit
  affiliation: Tokyo University
  publication_count: 37
  previous_employer: Salesforce Research (2018-2021)
  research_focus: primary=autonomous driving, secondary=spoken dialog systems

Entity: researcher/luna_hansen
  affiliation: Hebrew University
  publication_count: 68
  previous_employer: Facebook AI Research (2017-2020)
  research_focus: primary=out-of-distribution generalization, secondary=knowledge grounding

Entity: researcher/lauren_fontaine
  affiliation: University of Edinburgh
  publication_count: 33
  previous_employer: Uber AI Labs (2017-2020)
  research_focus: primary=computer vision, secondary=value alignment

Entity: researcher/piotr_fernandez
  affiliation: University of Copenhagen
  publication_count: 4
  previous_employer: Baidu Research (2018-2021)
  research_focus: primary=speech recognition, secondary=reading comprehension

Entity: researcher/charlotte_klein
  affiliation: University of Toronto
  publication_count: 86
  previous_employer: Alibaba DAMO Academy (2018-2021)
  research_focus: primary=adversarial robustness, secondary=certified defenses

Entity: researcher/yuki_russo
  affiliation: McGill University
  publication_count: 62
  previous_employer: Bosch Center for AI (2019-2022)
  research_focus: primary=computer vision, secondary=vision-language models

Entity: researcher/akira_lee
  affiliation: University of Sydney
  publication_count: 16
  previous_employer: Salesforce Research (2018-2021)
  research_focus: primary=question answering, secondary=catastrophic forgetting

Entity: researcher/daniel_ferrari
  affiliation: Oxford University
  publication_count: 46
  previous_employer: Intel AI Lab (2016-2019)
  research_focus: primary=speech recognition, secondary=machine translation

Entity: researcher/jason_huang
  affiliation: Sapienza University of Rome
  publication_count: 43
  previous_employer: Amazon AWS AI (2018-2021)
  research_focus: primary=federated learning, secondary=sensor fusion

Entity: researcher/cassandra_gupta
  affiliation: University of Illinois Urbana-Champaign
  publication_count: 28
  previous_employer: Meta AI Research (2020-2023)
  research_focus: primary=reinforcement learning, secondary=structured prediction

Entity: researcher/erica_muller
  affiliation: TU Berlin
  publication_count: 47
  previous_employer: Tesla AI (2019-2022)
  research_focus: primary=graph neural networks, secondary=efficient deep learning

Entity: researcher/beatriz_moreau
  affiliation: Northeastern University
  publication_count: 26
  previous_employer: Google Brain (2016-2019)
  research_focus: primary=causal inference, secondary=generalization bounds

Entity: researcher/boris_romero
  affiliation: University of Edinburgh
  publication_count: 17
  previous_employer: Toyota Research Institute (2017-2020)
  research_focus: primary=speech recognition, secondary=dense retrieval

Entity: researcher/ivan_nguyen
  affiliation: Tokyo University
  publication_count: 44
  previous_employer: Toyota Research Institute (2017-2020)
  research_focus: primary=reinforcement learning, secondary=object detection

Entity: researcher/cyrus_gomez
  affiliation: National University of Singapore
  publication_count: 55
  previous_employer: Salesforce Research (2018-2021)
  research_focus: primary=multimodal learning, secondary=object detection

Entity: researcher/beatriz_jin
  affiliation: NYU Courant Institute
  publication_count: 37
  previous_employer: Intel AI Lab (2016-2019)
  research_focus: primary=speech recognition, secondary=machine translation

Entity: researcher/elena_fischer
  affiliation: Allen Institute for AI
  publication_count: 47
  previous_employer: Samsung AI Center (2019-2022)
  research_focus: primary=continual learning, secondary=contrastive methods

Entity: researcher/ilaria_ibrahim
  affiliation: National University of Singapore
  publication_count: 44
  previous_employer: Microsoft Research (2015-2018)
  research_focus: primary=multi-task learning, secondary=conversational AI

Entity: researcher/christian_wang
  affiliation: National University of Singapore
  publication_count: 69
  previous_employer: Intel AI Lab (2016-2019)
  research_focus: primary=question answering, secondary=counterfactual reasoning

Entity: researcher/natalia_wu
  affiliation: McGill University
  publication_count: 24
  previous_employer: Toyota Research Institute (2017-2020)
  research_focus: primary=speech recognition, secondary=uncertainty quantification

Entity: researcher/matias_meyer
  affiliation: Tsinghua University
  publication_count: 55
  previous_employer: Google Research (2018-2021)
  research_focus: primary=autonomous driving, secondary=protein structure prediction

Entity: researcher/zachary_weber
  affiliation: Max Planck Institute for Informatics
  publication_count: 63
  previous_employer: Citadel Securities Research (2017-2020)
  research_focus: primary=Bayesian deep learning, secondary=knowledge grounding

Entity: researcher/sofia_castellanos
  affiliation: Carnegie Mellon University
  publication_count: 40
  previous_employer: Amazon AWS AI (2018-2021)
  research_focus: primary=autonomous driving, secondary=vision-language models

Entity: researcher/luna_malik
  affiliation: EPFL
  publication_count: 18
  previous_employer: Facebook AI Research (2017-2020)
  research_focus: primary=multimodal learning, secondary=uncertainty quantification

Entity: researcher/alicia_ivanova
  affiliation: Tokyo University
  publication_count: 61
  previous_employer: Samsung AI Center (2019-2022)
  research_focus: primary=out-of-distribution generalization, secondary=transfer learning

Entity: researcher/ilaria_vogt
  affiliation: University of Michigan
  publication_count: 15
  previous_employer: Twitter Machine Learning (2019-2022)
  research_focus: primary=graph neural networks, secondary=clinical decision support

Entity: researcher/nadia_anand
  affiliation: Purdue University
  publication_count: 84
  previous_employer: NVIDIA Research (2017-2020)
  research_focus: primary=graph neural networks, secondary=contrastive methods

Entity: researcher/sandra_rashid
  affiliation: Chinese University of Hong Kong
  publication_count: 83
  previous_employer: Snap Research (2018-2021)
  research_focus: primary=recommendation systems, secondary=sensor fusion

Entity: researcher/sara_guo
  affiliation: University of Zurich
  publication_count: 25
  previous_employer: Facebook AI Research (2017-2020)
  research_focus: primary=AI safety, secondary=program synthesis

Entity: researcher/felix_mehta
  affiliation: University of Helsinki
  publication_count: 28
  previous_employer: Microsoft Research (2017-2020)
  research_focus: primary=information retrieval, secondary=spoken dialog systems

Entity: researcher/fatimah_wenger
  affiliation: McGill University
  publication_count: 69
  previous_employer: Waymo Research (2020-2023)
  research_focus: primary=multi-task learning, secondary=few-shot learning

Entity: researcher/victor_moreau
  affiliation: McGill University
  publication_count: 92
  previous_employer: ByteDance AI Lab (2020-2023)
  research_focus: primary=machine learning theory, secondary=object detection

Entity: researcher/nina_yilmaz
  affiliation: University of Illinois Urbana-Champaign
  publication_count: 44
  previous_employer: Adobe Research (2017-2020)
  research_focus: primary=summarization, secondary=vision-language models

Entity: researcher/alessandro_sanchez
  affiliation: KTH Royal Institute of Technology
  publication_count: 30
  previous_employer: Baidu Research (2018-2021)
  research_focus: primary=recommendation systems, secondary=protein structure prediction

Entity: researcher/milan_dawit
  affiliation: INRIA Paris
  publication_count: 88
  previous_employer: Citadel Securities Research (2017-2020)
  research_focus: primary=Bayesian deep learning, secondary=dense retrieval

Entity: researcher/saanvi_romano
  affiliation: Princeton CS
  publication_count: 25
  previous_employer: Microsoft Research (2015-2018)
  research_focus: primary=continual learning, secondary=knowledge graphs

Entity: researcher/francesca_lutz
  affiliation: Oxford University
  publication_count: 39
  previous_employer: Tencent AI Lab (2019-2022)
  research_focus: primary=summarization, secondary=sensor fusion

Entity: researcher/clara_costa
  affiliation: INRIA Paris
  publication_count: 19
  previous_employer: Tencent AI Lab (2019-2022)
  research_focus: primary=federated learning, secondary=transfer learning

Entity: researcher/christian_anand
  affiliation: Cambridge University
  publication_count: 85
  previous_employer: ByteDance AI Lab (2020-2023)
  research_focus: primary=continual learning, secondary=few-shot learning

Entity: researcher/christoph_oh
  affiliation: Northeastern University
  publication_count: 51
  previous_employer: Facebook AI Research (2017-2020)
  research_focus: primary=medical imaging, secondary=privacy-preserving ML

Entity: researcher/nadia_russo
  affiliation: Tokyo University
  publication_count: 76
  previous_employer: Huawei Noah Ark Lab (2018-2021)
  research_focus: primary=autonomous driving, secondary=certified defenses

Entity: researcher/sophia_vasquez
  affiliation: Columbia University
  publication_count: 12
  previous_employer: Uber AI Labs (2017-2020)
  research_focus: primary=computational biology, secondary=machine translation

Entity: researcher/ivan_yang
  affiliation: Seoul National University
  publication_count: 93
  previous_employer: Twitter Machine Learning (2019-2022)
  research_focus: primary=information retrieval, secondary=contrastive methods

Entity: researcher/dario_nilsson
  affiliation: Georgia Tech
  publication_count: 36
  previous_employer: Vector Institute (2018-2021)
  research_focus: primary=self-supervised learning, secondary=abstractive generation

Entity: researcher/yan_durand
  affiliation: Hong Kong University of Science and Technology
  publication_count: 48
  previous_employer: Google Brain (2016-2019)
  research_focus: primary=computational biology, secondary=knowledge grounding

Entity: researcher/henrik_park
  affiliation: INRIA Paris
  publication_count: 17
  previous_employer: Citadel Securities Research (2017-2020)
  research_focus: primary=self-supervised learning, secondary=knowledge grounding

Entity: researcher/tim_jin
  affiliation: Tsinghua University
  publication_count: 79
  previous_employer: Uber AI Labs (2017-2020)
  research_focus: primary=natural language processing, secondary=catastrophic forgetting

Entity: researcher/ivan_ivanova
  affiliation: Carnegie Mellon University
  publication_count: 63
  previous_employer: Waymo Research (2020-2023)
  research_focus: primary=multimodal learning, secondary=collaborative filtering

Entity: researcher/victor_nguyen
  affiliation: Sapienza University of Rome
  publication_count: 55
  previous_employer: Uber AI Labs (2017-2020)
  research_focus: primary=computational biology, secondary=program synthesis

Entity: researcher/mihail_dobrescu
  affiliation: Columbia University
  publication_count: 6
  previous_employer: Twitter Machine Learning (2019-2022)
  research_focus: primary=multimodal learning, secondary=privacy-preserving ML

Entity: researcher/julian_larsson
  affiliation: Georgia Tech
  publication_count: 23
  previous_employer: Uber AI Labs (2017-2020)
  research_focus: primary=federated learning, secondary=reading comprehension

Entity: researcher/jessica_popescu
  affiliation: Cornell Tech
  publication_count: 59
  previous_employer: Meta AI Research (2020-2023)
  research_focus: primary=continual learning, secondary=collaborative filtering

Entity: researcher/isabel_vogt
  affiliation: Purdue University
  publication_count: 82
  previous_employer: Microsoft Research (2015-2018)
  research_focus: primary=anomaly detection, secondary=privacy-preserving ML

Entity: researcher/francesco_johansson
  affiliation: Seoul National University
  publication_count: 70
  previous_employer: Snap Research (2018-2021)
  research_focus: primary=causal inference, secondary=contrastive methods

Entity: researcher/dilnoza_brown
  affiliation: Montreal Institute for Learning Algorithms
  publication_count: 24
  previous_employer: Toyota Research Institute (2017-2020)
  research_focus: primary=commonsense reasoning, secondary=certified defenses

Entity: researcher/alicia_zimmermann
  affiliation: UT Austin
  publication_count: 89
  previous_employer: Berkeley AI Research Lab (2016-2019)
  research_focus: primary=summarization, secondary=machine translation

Entity: researcher/bob_okafor
  affiliation: Stanford AI Lab
  publication_count: 23
  previous_employer: DeepMind (2020-2023)
  research_focus: primary=computer vision, secondary=embodied AI

Entity: researcher/chen_andersen
  affiliation: Cambridge University
  publication_count: 39
  previous_employer: Bosch Center for AI (2019-2022)
  research_focus: primary=computer vision, secondary=knowledge grounding

Entity: researcher/javier_nilsson
  affiliation: University of British Columbia
  publication_count: 96
  previous_employer: Intel AI Lab (2016-2019)
  research_focus: primary=speech recognition, secondary=privacy-preserving ML

Entity: researcher/leon_bonnet
  affiliation: Sapienza University of Rome
  publication_count: 47
  previous_employer: Amazon AWS AI (2018-2021)
  research_focus: primary=information retrieval, secondary=robotics

Entity: researcher/benjamin_larsson
  affiliation: Max Planck Institute for Informatics
  publication_count: 48
  previous_employer: Samsung AI Center (2019-2022)
  research_focus: primary=adversarial robustness, secondary=knowledge graphs

Entity: researcher/arjun_gonzalez
  affiliation: Tsinghua University
  publication_count: 24
  previous_employer: ByteDance AI Lab (2020-2023)
  research_focus: primary=reinforcement learning, secondary=collaborative filtering

Entity: researcher/filip_nakamura
  affiliation: Princeton CS
  publication_count: 60
  previous_employer: Microsoft Research (2015-2018)
  research_focus: primary=graph neural networks, secondary=catastrophic forgetting

Entity: researcher/neha_wang
  affiliation: Cornell Tech
  publication_count: 47
  previous_employer: ByteDance AI Lab (2020-2023)
  research_focus: primary=autonomous driving, secondary=vision-language models

Entity: researcher/wei_yilmaz
  affiliation: University of Edinburgh
  publication_count: 98
  previous_employer: Microsoft Research (2017-2020)
  research_focus: primary=continual learning, secondary=conversational AI

Entity: researcher/hannah_jensen
  affiliation: University of Illinois Urbana-Champaign
  publication_count: 71
  previous_employer: Google DeepMind (2020-2023)
  research_focus: primary=AI safety, secondary=spoken dialog systems

Entity: researcher/ryan_ritter
  affiliation: University of Washington
  publication_count: 5
  previous_employer: OpenAI (2018-2021)
  research_focus: primary=computational biology, secondary=domain adaptation

Entity: researcher/elias_garcia
  affiliation: Virginia Tech
  publication_count: 77
  previous_employer: Waymo Research (2020-2023)
  research_focus: primary=multimodal learning, secondary=reading comprehension

Entity: researcher/diego_maier
  affiliation: Purdue University
  publication_count: 27
  previous_employer: IBM Research (2016-2019)
  research_focus: primary=medical imaging, secondary=protein structure prediction

Entity: researcher/pablo_liu
  affiliation: Stanford University
  publication_count: 79
  previous_employer: Intel AI Lab (2016-2019)
  research_focus: primary=reinforcement learning, secondary=collaborative filtering

Entity: researcher/caroline_maier
  affiliation: Cornell Tech
  publication_count: 86
  previous_employer: Jane Street Research (2018-2021)
  research_focus: primary=neural architecture search, secondary=generalization bounds

Entity: researcher/astrid_demir
  affiliation: University of Sydney
  publication_count: 37
  previous_employer: OpenAI (2018-2021)
  research_focus: primary=Bayesian deep learning, secondary=robotics

Entity: researcher/kristina_vasquez
  affiliation: Max Planck Institute for Informatics
  publication_count: 6
  previous_employer: Amazon AWS AI (2018-2021)
  research_focus: primary=interpretable ML, secondary=certified defenses

Entity: researcher/ashwin_bergmann
  affiliation: Tsinghua University
  publication_count: 22
  previous_employer: Apple ML Research (2019-2022)
  research_focus: primary=Bayesian deep learning, secondary=privacy-preserving ML

Entity: researcher/celine_lopez
  affiliation: University of Copenhagen
  publication_count: 50
  previous_employer: Citadel Securities Research (2017-2020)
  research_focus: primary=reinforcement learning, secondary=generalization bounds

Entity: researcher/oscar_almeida
  affiliation: ETH Zurich
  publication_count: 50
  previous_employer: Samsung AI Center (2019-2022)
  research_focus: primary=multi-task learning, secondary=uncertainty quantification

Entity: researcher/david_nilsson
  affiliation: UC Berkeley
  publication_count: 24
  previous_employer: Alibaba DAMO Academy (2018-2021)
  research_focus: primary=machine learning theory, secondary=knowledge graphs

Entity: researcher/lukas_durand
  affiliation: ETH Zurich
  publication_count: 61
  previous_employer: Citadel Securities Research (2017-2020)
  research_focus: primary=code generation, secondary=vision-language models

Entity: researcher/elias_vogt
  affiliation: Hebrew University
  publication_count: 29
  previous_employer: Twitter Machine Learning (2019-2022)
  research_focus: primary=causal inference, secondary=uncertainty quantification

Entity: researcher/david_ramirez
  affiliation: Cornell Tech
  publication_count: 26
  previous_employer: Google Brain (2016-2019)
  research_focus: primary=meta-learning, secondary=machine translation

Entity: researcher/connor_zhou
  affiliation: University of Melbourne
  publication_count: 36
  previous_employer: OpenAI (2018-2021)
  research_focus: primary=natural language processing, secondary=program synthesis

Entity: researcher/aditya_moreau
  affiliation: National University of Singapore
  publication_count: 74
  previous_employer: Waymo Research (2020-2023)
  research_focus: primary=computer vision, secondary=privacy-preserving ML

Entity: researcher/marina_tran
  affiliation: Oxford University
  publication_count: 83
  previous_employer: Baidu Research (2018-2021)
  research_focus: primary=autonomous driving, secondary=domain adaptation

Entity: researcher/andrea_kumar
  affiliation: Max Planck Institute for Informatics
  publication_count: 89
  previous_employer: Citadel Securities Research (2017-2020)
  research_focus: primary=graph neural networks, secondary=program synthesis

Entity: researcher/alexander_vasiliev
  affiliation: National University of Singapore
  publication_count: 94
  previous_employer: Toyota Research Institute (2017-2020)
  research_focus: primary=dialogue systems, secondary=program synthesis

Entity: researcher/luis_lee
  affiliation: McGill University
  publication_count: 46
  previous_employer: Facebook AI Research (2017-2020)
  research_focus: primary=self-supervised learning, secondary=vision-language models

Entity: researcher/jorge_osei
  affiliation: Purdue University
  publication_count: 13
  previous_employer: Intel AI Lab (2016-2019)
  research_focus: primary=meta-learning, secondary=sensor fusion

Entity: researcher/ethan_narasimhan
  affiliation: TU Berlin
  publication_count: 86
  previous_employer: Baidu Research (2018-2021)
  research_focus: primary=speech recognition, secondary=structured prediction

Entity: researcher/jana_tremblay
  affiliation: Cornell Tech
  publication_count: 22
  previous_employer: Adobe Research (2017-2020)
  research_focus: primary=meta-learning, secondary=machine translation

Entity: researcher/tom_lopez
  affiliation: Tokyo University
  publication_count: 91
  previous_employer: Samsung AI Center (2019-2022)
  research_focus: primary=multimodal learning, secondary=machine translation

Entity: researcher/victor_sharma
  affiliation: TU Berlin
  publication_count: 17
  previous_employer: Adobe Research (2017-2020)
  research_focus: primary=question answering, secondary=transfer learning

Entity: researcher/danielle_wang
  affiliation: Seoul National University
  publication_count: 34
  previous_employer: Amazon AWS AI (2018-2021)
  research_focus: primary=recommendation systems, secondary=structured prediction

Entity: researcher/vera_wiese
  affiliation: Columbia University
  publication_count: 60
  previous_employer: Tencent AI Lab (2019-2022)
  research_focus: primary=self-supervised learning, secondary=value alignment

Entity: researcher/cyrus_vasquez
  affiliation: University of Edinburgh
  publication_count: 50
  previous_employer: Berkeley AI Research Lab (2016-2019)
  research_focus: primary=causal inference, secondary=catastrophic forgetting

Entity: researcher/claudia_hernandez
  affiliation: Hong Kong University of Science and Technology
  publication_count: 81
  previous_employer: Waymo Research (2020-2023)
  research_focus: primary=autonomous driving, secondary=transfer learning

Entity: researcher/clara_flores
  affiliation: Purdue University
  publication_count: 64
  previous_employer: Amazon AWS AI (2018-2021)
  research_focus: primary=anomaly detection, secondary=knowledge graphs

Entity: researcher/ashwin_jensen
  affiliation: University of Michigan
  publication_count: 47
  previous_employer: Alibaba DAMO Academy (2018-2021)
  research_focus: primary=interpretable ML, secondary=domain adaptation

Entity: researcher/laura_guo
  affiliation: Seoul National University
  publication_count: 17
  previous_employer: Microsoft Research (2017-2020)
  research_focus: primary=machine learning theory, secondary=efficient deep learning

Entity: researcher/dimitri_khan
  affiliation: ETH Zurich
  publication_count: 40
  previous_employer: Google DeepMind (2020-2023)
  research_focus: primary=computational biology, secondary=counterfactual reasoning

Entity: researcher/connor_maier
  affiliation: Max Planck Institute for Informatics
  publication_count: 23
  previous_employer: Toyota Research Institute (2017-2020)
  research_focus: primary=neural architecture search, secondary=efficient deep learning

Entity: researcher/sebastian_eriksson
  affiliation: Seoul National University
  publication_count: 42
  previous_employer: Microsoft Research (2015-2018)
  research_focus: primary=code generation, secondary=contrastive methods

Entity: researcher/rosa_tremblay
  affiliation: Tsinghua University
  publication_count: 13
  previous_employer: Toyota Research Institute (2017-2020)
  research_focus: primary=machine learning theory, secondary=contrastive methods

Entity: researcher/marina_saha
  affiliation: University of Edinburgh
  publication_count: 16
  previous_employer: Samsung AI Center (2019-2022)
  research_focus: primary=graph neural networks, secondary=conversational AI

Entity: researcher/aseel_zimmermann
  affiliation: Georgia Tech
  publication_count: 96
  previous_employer: Intel AI Lab (2016-2019)
  research_focus: primary=multi-task learning, secondary=uncertainty quantification

Entity: researcher/julia_romano
  affiliation: Seoul National University
  publication_count: 35
  previous_employer: Huawei Noah Ark Lab (2018-2021)
  research_focus: primary=recommendation systems, secondary=machine translation

Entity: researcher/deepa_schmid
  affiliation: Hong Kong University of Science and Technology
  publication_count: 16
  previous_employer: ByteDance AI Lab (2020-2023)
  research_focus: primary=commonsense reasoning, secondary=uncertainty quantification

Entity: researcher/brandon_narasimhan
  affiliation: Cornell Tech
  publication_count: 72
  previous_employer: Qualcomm AI Research (2017-2020)
  research_focus: primary=semantic parsing, secondary=abstractive generation

Entity: researcher/elizabeth_pacheco
  affiliation: ETH Zurich
  publication_count: 47
  previous_employer: Citadel Securities Research (2017-2020)
  research_focus: primary=computational biology, secondary=uncertainty quantification

Entity: researcher/sven_weber
  affiliation: Georgia Tech
  publication_count: 41
  previous_employer: Google Brain (2016-2019)
  research_focus: primary=commonsense reasoning, secondary=reading comprehension

Entity: researcher/sarah_rossi
  affiliation: Hebrew University
  publication_count: 44
  previous_employer: Vector Institute (2018-2021)
  research_focus: primary=speech recognition, secondary=protein structure prediction

Entity: researcher/cassandra_nakamura
  affiliation: Seoul National University
  publication_count: 38
  previous_employer: Facebook AI Research (2017-2020)
  research_focus: primary=recommendation systems, secondary=clinical decision support

Entity: researcher/sophia_gomez
  affiliation: Montreal Institute for Learning Algorithms
  publication_count: 51
  previous_employer: Jane Street Research (2018-2021)
  research_focus: primary=semantic parsing, secondary=reading comprehension

Entity: researcher/liang_gomez
  affiliation: Tokyo University
  publication_count: 6
  previous_employer: Meta AI Research (2020-2023)
  research_focus: primary=commonsense reasoning, secondary=few-shot learning

Entity: researcher/robert_muller
  affiliation: EPFL
  publication_count: 73
  previous_employer: Baidu Research (2018-2021)
  research_focus: primary=code generation, secondary=counterfactual reasoning

Entity: researcher/karin_vasiliev
  affiliation: Oxford University
  publication_count: 85
  previous_employer: ByteDance AI Lab (2020-2023)
  research_focus: primary=commonsense reasoning, secondary=counterfactual reasoning

Entity: researcher/simon_schmidt
  affiliation: Oxford University
  publication_count: 71
  previous_employer: Microsoft Research (2015-2018)
  research_focus: primary=meta-learning, secondary=counterfactual reasoning

Entity: researcher/james_rashid
  affiliation: ETH Zurich
  publication_count: 59
  previous_employer: Vector Institute (2018-2021)
  research_focus: primary=multi-task learning, secondary=generalization bounds

Entity: researcher/javier_lopez
  affiliation: Tsinghua University
  publication_count: 65
  previous_employer: Tesla AI (2019-2022)
  research_focus: primary=graph neural networks, secondary=transfer learning

Entity: researcher/ibrahim_kowalski
  affiliation: UC Berkeley
  publication_count: 84
  previous_employer: Google Research (2018-2021)
  research_focus: primary=code generation, secondary=conversational AI

Entity: researcher/claudia_liu
  affiliation: Georgia Tech
  publication_count: 14
  previous_employer: Qualcomm AI Research (2017-2020)
  research_focus: primary=out-of-distribution generalization, secondary=vision-language models

Entity: researcher/mahsa_ghosh
  affiliation: Leiden University
  publication_count: 76
  previous_employer: IBM Research (2016-2019)
  research_focus: primary=federated learning, secondary=knowledge grounding

Entity: researcher/leonardo_liu
  affiliation: Allen Institute for AI
  publication_count: 47
  previous_employer: Microsoft Research (2017-2020)
  research_focus: primary=neural architecture search, secondary=privacy-preserving ML

Entity: researcher/ibrahim_larsson
  affiliation: University of British Columbia
  publication_count: 48
  previous_employer: Vector Institute (2018-2021)
  research_focus: primary=natural language processing, secondary=abstractive generation

Entity: researcher/mario_nkosi
  affiliation: National University of Singapore
  publication_count: 87
  previous_employer: Meta AI Research (2020-2023)
  research_focus: primary=question answering, secondary=counterfactual reasoning

Entity: researcher/isabel_ferrari
  affiliation: Princeton CS
  publication_count: 47
  previous_employer: Microsoft Research (2017-2020)
  research_focus: primary=AI safety, secondary=structured prediction

Entity: researcher/rafael_nakamura
  affiliation: National University of Singapore
  publication_count: 70
  previous_employer: Google Brain (2016-2019)
  research_focus: primary=medical imaging, secondary=robotics

Entity: researcher/francesca_dimitriou
  affiliation: University of Edinburgh
  publication_count: 26
  previous_employer: Toyota Research Institute (2017-2020)
  research_focus: primary=medical imaging, secondary=collaborative filtering

Entity: researcher/hassan_nielsen
  affiliation: Georgia Tech
  publication_count: 64
  previous_employer: Twitter Machine Learning (2019-2022)
  research_focus: primary=adversarial robustness, secondary=contrastive methods

Entity: researcher/rosa_wenger
  affiliation: Boston University
  publication_count: 14
  previous_employer: Bosch Center for AI (2019-2022)
  research_focus: primary=computational biology, secondary=few-shot learning

Entity: researcher/nathan_liu
  affiliation: Stanford University
  publication_count: 9
  previous_employer: OpenAI (2018-2021)
  research_focus: primary=out-of-distribution generalization, secondary=value alignment

Entity: researcher/karin_burger
  affiliation: EPFL
  publication_count: 42
  previous_employer: Microsoft Research (2015-2018)
  research_focus: primary=graph neural networks, secondary=sensor fusion

Entity: researcher/emma_dawit
  affiliation: Virginia Tech
  publication_count: 90
  previous_employer: NVIDIA Research (2017-2020)
  research_focus: primary=question answering, secondary=time series analysis

Entity: researcher/kiran_nkosi
  affiliation: EPFL
  publication_count: 52
  previous_employer: Twitter Machine Learning (2019-2022)
  research_focus: primary=out-of-distribution generalization, secondary=reading comprehension

Entity: researcher/rosa_kumar
  affiliation: University of Illinois Urbana-Champaign
  publication_count: 47
  previous_employer: Microsoft Research (2015-2018)
  research_focus: primary=interpretable ML, secondary=clinical decision support

Entity: researcher/leon_kumar
  affiliation: University of Michigan
  publication_count: 52
  previous_employer: Jane Street Research (2018-2021)
  research_focus: primary=dialogue systems, secondary=contrastive methods

Entity: researcher/antoine_khan
  affiliation: University of Amsterdam
  publication_count: 37
  previous_employer: Salesforce Research (2018-2021)
  research_focus: primary=commonsense reasoning, secondary=clinical decision support

Entity: researcher/ashwin_yilmaz
  affiliation: Purdue University
  publication_count: 41
  previous_employer: Microsoft Research (2017-2020)
  research_focus: primary=reinforcement learning, secondary=machine translation

Entity: researcher/clara_stefanov
  affiliation: Vector Institute
  publication_count: 52
  previous_employer: Salesforce Research (2018-2021)
  research_focus: primary=Bayesian deep learning, secondary=abstractive generation

Entity: researcher/francesco_khan
  affiliation: Seoul National University
  publication_count: 28
  previous_employer: Two Sigma Research (2019-2022)
  research_focus: primary=question answering, secondary=dense retrieval

Entity: researcher/akira_petrov
  affiliation: Montreal Institute for Learning Algorithms
  publication_count: 20
  previous_employer: Alibaba DAMO Academy (2018-2021)
  research_focus: primary=dialogue systems, secondary=value alignment

Entity: researcher/kiran_rodriguez
  affiliation: Georgia Tech
  publication_count: 23
  previous_employer: Tesla AI (2019-2022)
  research_focus: primary=neural architecture search, secondary=structured prediction

Entity: researcher/catherine_moretti
  affiliation: Leiden University
  publication_count: 19
  previous_employer: Two Sigma Research (2019-2022)
  research_focus: primary=summarization, secondary=few-shot learning

Entity: researcher/ilaria_kaur
  affiliation: Princeton CS
  publication_count: 69
  previous_employer: Google DeepMind (2020-2023)
  research_focus: primary=causal inference, secondary=clinical decision support

Entity: researcher/lars_lopez
  affiliation: MIT Computer Science
  publication_count: 94
  previous_employer: Twitter Machine Learning (2019-2022)
  research_focus: primary=commonsense reasoning, secondary=dense retrieval

Entity: researcher/grace_romano
  affiliation: Caltech
  publication_count: 67
  previous_employer: Vector Institute (2018-2021)
  research_focus: primary=natural language processing, secondary=structured prediction

Entity: researcher/rafael_vasquez
  affiliation: Tsinghua University
  publication_count: 59
  previous_employer: Tesla AI (2019-2022)
  research_focus: primary=computer vision, secondary=collaborative filtering

Entity: researcher/oscar_zhao
  affiliation: National University of Singapore
  publication_count: 86
  previous_employer: Apple ML Research (2019-2022)
  research_focus: primary=natural language processing, secondary=clinical decision support

Entity: researcher/anisha_mehta
  affiliation: McGill University
  publication_count: 81
  previous_employer: Toyota Research Institute (2017-2020)
  research_focus: primary=information retrieval, secondary=machine translation

Entity: researcher/marta_sanchez
  affiliation: National University of Singapore
  publication_count: 50
  previous_employer: Two Sigma Research (2019-2022)
  research_focus: primary=computer vision, secondary=efficient deep learning

Entity: researcher/andrew_kapoor
  affiliation: Leiden University
  publication_count: 22
  previous_employer: Baidu Research (2018-2021)
  research_focus: primary=medical imaging, secondary=reading comprehension

Entity: researcher/zachary_flores
  affiliation: Sapienza University of Rome
  publication_count: 94
  previous_employer: Baidu Research (2018-2021)
  research_focus: primary=computational biology, secondary=program synthesis

Entity: researcher/rajesh_esposito
  affiliation: Tokyo University
  publication_count: 60
  previous_employer: Qualcomm AI Research (2017-2020)
  research_focus: primary=medical imaging, secondary=privacy-preserving ML

Entity: researcher/celine_romano
  affiliation: INRIA Paris
  publication_count: 23
  previous_employer: NVIDIA Research (2017-2020)
  research_focus: primary=dialogue systems, secondary=knowledge grounding

Entity: researcher/eva_zhou
  affiliation: Cornell Tech
  publication_count: 46
  previous_employer: Toyota Research Institute (2017-2020)
  research_focus: primary=speech recognition, secondary=time series analysis

Entity: researcher/jorge_dimitriou
  affiliation: University of Toronto
  publication_count: 97
  previous_employer: Google DeepMind (2020-2023)
  research_focus: primary=information retrieval, secondary=spoken dialog systems

Entity: researcher/nadia_fontaine
  affiliation: University of Illinois Urbana-Champaign
  publication_count: 55
  previous_employer: Samsung AI Center (2019-2022)
  research_focus: primary=adversarial robustness, secondary=structured prediction

Entity: researcher/ashwin_nakamura
  affiliation: Princeton CS
  publication_count: 48
  previous_employer: IBM Research (2016-2019)
  research_focus: primary=multi-task learning, secondary=machine translation

Entity: researcher/lukas_romano
  affiliation: ETH Zurich
  publication_count: 11
  previous_employer: Berkeley AI Research Lab (2016-2019)
  research_focus: primary=adversarial robustness, secondary=knowledge grounding

Entity: researcher/bianca_suzuki
  affiliation: Georgia Tech
  publication_count: 32
  previous_employer: Google DeepMind (2020-2023)
  research_focus: primary=meta-learning, secondary=protein structure prediction

Entity: researcher/elizabeth_diop
  affiliation: UC Berkeley
  publication_count: 22
  previous_employer: Twitter Machine Learning (2019-2022)
  research_focus: primary=graph neural networks, secondary=contrastive methods

Entity: researcher/lorenzo_pacheco
  affiliation: University of Zurich
  publication_count: 42
  previous_employer: Salesforce Research (2018-2021)
  research_focus: primary=recommendation systems, secondary=contrastive methods

Entity: researcher/lisa_schulz
  affiliation: Purdue University
  publication_count: 41
  previous_employer: Adobe Research (2017-2020)
  research_focus: primary=meta-learning, secondary=collaborative filtering

Entity: researcher/rajesh_tremblay
  affiliation: EPFL
  publication_count: 93
  previous_employer: Adobe Research (2017-2020)
  research_focus: primary=causal inference, secondary=certified defenses

Entity: researcher/luna_dubois
  affiliation: Allen Institute for AI
  publication_count: 38
  previous_employer: Berkeley AI Research Lab (2016-2019)
  research_focus: primary=out-of-distribution generalization, secondary=counterfactual reasoning

Entity: researcher/rajesh_kowalski
  affiliation: Tsinghua University
  publication_count: 16
  previous_employer: Google Brain (2016-2019)
  research_focus: primary=question answering, secondary=knowledge graphs

Entity: researcher/colin_garcia
  affiliation: University of British Columbia
  publication_count: 39
  previous_employer: Jane Street Research (2018-2021)
  research_focus: primary=machine learning theory, secondary=privacy-preserving ML

Entity: researcher/deepa_koch
  affiliation: Montreal Institute for Learning Algorithms
  publication_count: 49
  previous_employer: NVIDIA Research (2017-2020)
  research_focus: primary=AI safety, secondary=vision-language models

Entity: researcher/chen_ramirez
  affiliation: Stanford University
  publication_count: 53
  previous_employer: Twitter Machine Learning (2019-2022)
  research_focus: primary=summarization, secondary=machine translation

Entity: researcher/patrick_petrov
  affiliation: Tsinghua University
  publication_count: 10
  previous_employer: Vector Institute (2018-2021)
  research_focus: primary=dialogue systems, secondary=uncertainty quantification

Entity: researcher/william_dawit
  affiliation: Stanford University
  publication_count: 77
  previous_employer: OpenAI Research (2019-2022)
  research_focus: primary=computational biology, secondary=transfer learning

Entity: researcher/rosa_ndiaye
  affiliation: Princeton CS
  publication_count: 5
  previous_employer: Alibaba DAMO Academy (2018-2021)
  research_focus: primary=continual learning, secondary=model explanation

Entity: researcher/elizabeth_martinez
  affiliation: Hebrew University
  publication_count: 33
  previous_employer: Alibaba DAMO Academy (2018-2021)
  research_focus: primary=continual learning, secondary=spoken dialog systems

Entity: researcher/luis_gupta
  affiliation: Allen Institute for AI
  publication_count: 75
  previous_employer: OpenAI Research (2019-2022)
  research_focus: primary=meta-learning, secondary=catastrophic forgetting

Entity: researcher/aseel_ahmadi
  affiliation: Virginia Tech
  publication_count: 81
  previous_employer: Google Brain (2016-2019)
  research_focus: primary=computer vision, secondary=time series analysis

Entity: researcher/matias_tremblay
  affiliation: ETH Zurich
  publication_count: 37
  previous_employer: Alibaba DAMO Academy (2018-2021)
  research_focus: primary=out-of-distribution generalization, secondary=program synthesis

Entity: researcher/giulia_schneider
  affiliation: Northeastern University
  publication_count: 28
  previous_employer: Facebook AI Research (2017-2020)
  research_focus: primary=Bayesian deep learning, secondary=few-shot learning

Entity: researcher/alessandro_choi
  affiliation: ETH Zurich
  publication_count: 86
  previous_employer: Bosch Center for AI (2019-2022)
  research_focus: primary=Bayesian deep learning, secondary=knowledge grounding

Entity: researcher/erin_giordano
  affiliation: Montreal Institute for Learning Algorithms
  publication_count: 33
  previous_employer: Microsoft Research (2015-2018)
  research_focus: primary=autonomous driving, secondary=robotics

Entity: researcher/javier_ndiaye
  affiliation: INRIA Paris
  publication_count: 85
  previous_employer: OpenAI Research (2019-2022)
  research_focus: primary=Bayesian deep learning, secondary=knowledge graphs

Entity: researcher/rahul_ritter
  affiliation: EPFL
  publication_count: 47
  previous_employer: ByteDance AI Lab (2020-2023)
  research_focus: primary=graph neural networks, secondary=time series analysis

Entity: researcher/nina_hoffmann
  affiliation: Boston University
  publication_count: 55
  previous_employer: Amazon AWS AI (2018-2021)
  research_focus: primary=medical imaging, secondary=uncertainty quantification

Entity: researcher/matias_sato
  affiliation: Sapienza University of Rome
  publication_count: 68
  previous_employer: Apple ML Research (2019-2022)
  research_focus: primary=machine learning theory, secondary=efficient deep learning

Entity: researcher/victor_vidal
  affiliation: McGill University
  publication_count: 33
  previous_employer: Tencent AI Lab (2019-2022)
  research_focus: primary=semantic parsing, secondary=privacy-preserving ML

Entity: researcher/martin_popescu
  affiliation: Chinese University of Hong Kong
  publication_count: 8
  previous_employer: Citadel Securities Research (2017-2020)
  research_focus: primary=semantic parsing, secondary=structured prediction

Entity: researcher/eva_reyes
  affiliation: Cambridge University
  publication_count: 48
  previous_employer: ByteDance AI Lab (2020-2023)
  research_focus: primary=neural architecture search, secondary=sensor fusion

Entity: researcher/elena_wong
  affiliation: Columbia University
  publication_count: 82
  previous_employer: IBM Research (2016-2019)
  research_focus: primary=AI safety, secondary=reading comprehension

Entity: researcher/rachel_laurent
  affiliation: Princeton CS
  publication_count: 66
  previous_employer: Jane Street Research (2018-2021)
  research_focus: primary=federated learning, secondary=program synthesis

Entity: researcher/dario_richter
  affiliation: UT Austin
  publication_count: 37
  previous_employer: Samsung AI Center (2019-2022)
  research_focus: primary=causal inference, secondary=vision-language models

Entity: researcher/marta_ahmadi
  affiliation: Cambridge University
  publication_count: 7
  previous_employer: Snap Research (2018-2021)
  research_focus: primary=causal inference, secondary=knowledge grounding

Entity: researcher/sandra_tremblay
  affiliation: EPFL
  publication_count: 20
  previous_employer: ByteDance AI Lab (2020-2023)
  research_focus: primary=multimodal learning, secondary=conversational AI

Entity: researcher/boris_anand
  affiliation: Sapienza University of Rome
  publication_count: 93
  previous_employer: OpenAI (2018-2021)
  research_focus: primary=causal inference, secondary=certified defenses

Entity: researcher/ryan_ramirez
  affiliation: TU Berlin
  publication_count: 85
  previous_employer: OpenAI Research (2019-2022)
  research_focus: primary=commonsense reasoning, secondary=value alignment

Entity: researcher/robin_castellanos
  affiliation: Carnegie Mellon University
  publication_count: 91
  previous_employer: Bosch Center for AI (2019-2022)
  research_focus: primary=speech recognition, secondary=program synthesis

Entity: researcher/xiao_kim
  affiliation: Virginia Tech
  publication_count: 78
  previous_employer: Bosch Center for AI (2019-2022)
  research_focus: primary=interpretable ML, secondary=robotics

Entity: researcher/filip_jin
  affiliation: Chinese University of Hong Kong
  publication_count: 18
  previous_employer: Google Brain (2016-2019)
  research_focus: primary=federated learning, secondary=uncertainty quantification

Entity: researcher/hassan_zuberi
  affiliation: University of Washington
  publication_count: 90
  previous_employer: Toyota Research Institute (2017-2020)
  research_focus: primary=self-supervised learning, secondary=object detection

Entity: researcher/lucas_novak
  affiliation: KTH Royal Institute of Technology
  publication_count: 82
  previous_employer: Google Brain (2016-2019)
  research_focus: primary=commonsense reasoning, secondary=vision-language models

Entity: researcher/ayaan_vidal
  affiliation: National University of Singapore
  publication_count: 11
  previous_employer: Berkeley AI Research Lab (2016-2019)
  research_focus: primary=multimodal learning, secondary=uncertainty quantification

Entity: researcher/sabrina_vidal
  affiliation: University of Helsinki
  publication_count: 88
  previous_employer: Snap Research (2018-2021)
  research_focus: primary=multimodal learning, secondary=spoken dialog systems

Entity: researcher/victoria_sharma
  affiliation: University of Zurich
  publication_count: 90
  previous_employer: Google Brain (2016-2019)
  research_focus: primary=computer vision, secondary=knowledge graphs

Entity: researcher/andrew_jin
  affiliation: University of Helsinki
  publication_count: 41
  previous_employer: Tesla AI (2019-2022)
  research_focus: primary=causal inference, secondary=object detection

Entity: researcher/hassan_jin
  affiliation: ETH Zurich
  publication_count: 81
  previous_employer: Intel AI Lab (2016-2019)
  research_focus: primary=machine learning theory, secondary=certified defenses

Entity: researcher/elena_park
  affiliation: University of Helsinki
  publication_count: 38
  previous_employer: Intel AI Lab (2016-2019)
  research_focus: primary=question answering, secondary=reading comprehension

Entity: researcher/caroline_yilmaz
  affiliation: McGill University
  publication_count: 89
  previous_employer: Amazon AWS AI (2018-2021)
  research_focus: primary=commonsense reasoning, secondary=program synthesis

Entity: researcher/caroline_pacheco
  affiliation: UC Berkeley
  publication_count: 5
  previous_employer: Huawei Noah Ark Lab (2018-2021)
  research_focus: primary=question answering, secondary=robotics

Entity: researcher/cassandra_ghosh
  affiliation: EPFL
  publication_count: 58
  previous_employer: Google DeepMind (2020-2023)
  research_focus: primary=computational biology, secondary=machine translation

Entity: researcher/patrick_pham
  affiliation: University of Washington
  publication_count: 25
  previous_employer: Facebook AI Research (2017-2020)
  research_focus: primary=summarization, secondary=abstractive generation

Entity: researcher/andrzej_sato
  affiliation: MIT Computer Science
  publication_count: 54
  previous_employer: Twitter Machine Learning (2019-2022)
  research_focus: primary=meta-learning, secondary=structured prediction

Entity: researcher/marina_maier
  affiliation: UC Berkeley
  publication_count: 32
  previous_employer: Adobe Research (2017-2020)
  research_focus: primary=out-of-distribution generalization, secondary=protein structure prediction

Entity: researcher/rosa_jin
  affiliation: Tsinghua University
  publication_count: 34
  previous_employer: OpenAI Research (2019-2022)
  research_focus: primary=semantic parsing, secondary=catastrophic forgetting

Entity: researcher/jana_novak
  affiliation: Georgia Tech
  publication_count: 15
  previous_employer: Microsoft Research (2017-2020)
  research_focus: primary=commonsense reasoning, secondary=domain adaptation

Entity: researcher/jorge_bhatt
  affiliation: Boston University
  publication_count: 90
  previous_employer: Twitter Machine Learning (2019-2022)
  research_focus: primary=information retrieval, secondary=knowledge grounding

Entity: researcher/jakub_saito
  affiliation: University of Washington
  publication_count: 63
  previous_employer: Meta AI Research (2020-2023)
  research_focus: primary=neural architecture search, secondary=object detection

Entity: researcher/luna_sorensen
  affiliation: University of Illinois Urbana-Champaign
  publication_count: 43
  previous_employer: Twitter Machine Learning (2019-2022)
  research_focus: primary=multimodal learning, secondary=catastrophic forgetting

Entity: researcher/aaron_meyer
  affiliation: Chinese University of Hong Kong
  publication_count: 34
  previous_employer: Waymo Research (2020-2023)
  research_focus: primary=multimodal learning, secondary=spoken dialog systems

Entity: researcher/caroline_ferrari
  affiliation: Hong Kong University of Science and Technology
  publication_count: 16
  previous_employer: Salesforce Research (2018-2021)
  research_focus: primary=commonsense reasoning, secondary=protein structure prediction

Entity: researcher/lauren_dimitriou
  affiliation: Caltech
  publication_count: 51
  previous_employer: Two Sigma Research (2019-2022)
  research_focus: primary=neural architecture search, secondary=counterfactual reasoning

Entity: researcher/neha_kowalski
  affiliation: EPFL
  publication_count: 6
  previous_employer: Toyota Research Institute (2017-2020)
  research_focus: primary=federated learning, secondary=time series analysis

Entity: researcher/james_klein
  affiliation: Leiden University
  publication_count: 11
  previous_employer: Amazon AWS AI (2018-2021)
  research_focus: primary=interpretable ML, secondary=uncertainty quantification

Entity: researcher/ethan_wang
  affiliation: Seoul National University
  publication_count: 33
  previous_employer: Google DeepMind (2020-2023)
  research_focus: primary=dialogue systems, secondary=privacy-preserving ML

Entity: researcher/matteo_ramos
  affiliation: University of Copenhagen
  publication_count: 71
  previous_employer: Berkeley AI Research Lab (2016-2019)
  research_focus: primary=speech recognition, secondary=program synthesis

Entity: researcher/patrick_stark
  affiliation: Seoul National University
  publication_count: 47
  previous_employer: Tencent AI Lab (2019-2022)
  research_focus: primary=computational biology, secondary=machine translation

Entity: researcher/ibrahim_schmidt
  affiliation: Tsinghua University
  publication_count: 87
  previous_employer: Berkeley AI Research Lab (2016-2019)
  research_focus: primary=out-of-distribution generalization, secondary=sensor fusion

Entity: researcher/chiara_tang
  affiliation: Leiden University
  publication_count: 73
  previous_employer: Huawei Noah Ark Lab (2018-2021)
  research_focus: primary=question answering, secondary=vision-language models

Entity: researcher/wei_huang
  affiliation: UT Austin
  publication_count: 35
  previous_employer: Tencent AI Lab (2019-2022)
  research_focus: primary=autonomous driving, secondary=few-shot learning

Entity: researcher/alessandro_anand
  affiliation: University of Edinburgh
  publication_count: 54
  previous_employer: Jane Street Research (2018-2021)
  research_focus: primary=meta-learning, secondary=clinical decision support

Entity: researcher/nadia_weiss
  affiliation: Cornell Tech
  publication_count: 94
  previous_employer: Twitter Machine Learning (2019-2022)
  research_focus: primary=summarization, secondary=uncertainty quantification

Entity: researcher/takahiro_klein
  affiliation: Seoul National University
  publication_count: 86
  previous_employer: Facebook AI Research (2017-2020)
  research_focus: primary=semantic parsing, secondary=machine translation

Entity: researcher/lars_klein
  affiliation: EPFL
  publication_count: 62
  previous_employer: Two Sigma Research (2019-2022)
  research_focus: primary=federated learning, secondary=collaborative filtering

Entity: researcher/elizabeth_gomez
  affiliation: Hebrew University
  publication_count: 93
  previous_employer: Google Brain (2016-2019)
  research_focus: primary=question answering, secondary=value alignment

Entity: researcher/erica_fischer
  affiliation: INRIA Paris
  publication_count: 58
  previous_employer: Snap Research (2018-2021)
  research_focus: primary=multimodal learning, secondary=generalization bounds

Entity: researcher/mia_bauer
  affiliation: Carnegie Mellon University
  publication_count: 74
  previous_employer: Huawei Noah Ark Lab (2018-2021)
  research_focus: primary=computer vision, secondary=program synthesis

Entity: researcher/arnav_reyes
  affiliation: Caltech
  publication_count: 36
  previous_employer: Intel AI Lab (2016-2019)
  research_focus: primary=neural architecture search, secondary=time series analysis

Entity: researcher/heidi_bergmann
  affiliation: Boston University
  publication_count: 5
  previous_employer: Tesla AI (2019-2022)
  research_focus: primary=computer vision, secondary=robotics

Entity: researcher/aaron_schmid
  affiliation: Technion
  publication_count: 66
  previous_employer: Samsung AI Center (2019-2022)
  research_focus: primary=Bayesian deep learning, secondary=time series analysis

Entity: researcher/ivan_yilmaz
  affiliation: Sapienza University of Rome
  publication_count: 14
  previous_employer: Vector Institute (2018-2021)
  research_focus: primary=question answering, secondary=conversational AI

Entity: researcher/lisa_kang
  affiliation: Princeton CS
  publication_count: 41
  previous_employer: Baidu Research (2018-2021)
  research_focus: primary=recommendation systems, secondary=privacy-preserving ML

Entity: researcher/jorge_albers
  affiliation: University of Illinois Urbana-Champaign
  publication_count: 92
  previous_employer: Uber AI Labs (2017-2020)
  research_focus: primary=question answering, secondary=contrastive methods

Entity: researcher/lars_oliveira
  affiliation: Stanford University
  publication_count: 80
  previous_employer: Google DeepMind (2020-2023)
  research_focus: primary=machine learning theory, secondary=domain adaptation

Entity: researcher/rahul_ghosh
  affiliation: Stanford University
  publication_count: 7
  previous_employer: Apple ML Research (2019-2022)
  research_focus: primary=federated learning, secondary=time series analysis

Entity: researcher/boris_huang
  affiliation: Technion
  publication_count: 55
  previous_employer: Huawei Noah Ark Lab (2018-2021)
  research_focus: primary=self-supervised learning, secondary=domain adaptation

Entity: researcher/felix_dubois
  affiliation: Virginia Tech
  publication_count: 83
  previous_employer: Intel AI Lab (2016-2019)
  research_focus: primary=anomaly detection, secondary=collaborative filtering

Entity: researcher/lina_tan
  affiliation: Hebrew University
  publication_count: 29
  previous_employer: Google DeepMind (2020-2023)
  research_focus: primary=adversarial robustness, secondary=model explanation

Entity: researcher/marco_diop
  affiliation: Cornell Tech
  publication_count: 95
  previous_employer: Intel AI Lab (2016-2019)
  research_focus: primary=Bayesian deep learning, secondary=efficient deep learning

Entity: researcher/santiago_muller
  affiliation: Cambridge University
  publication_count: 76
  previous_employer: OpenAI (2018-2021)
  research_focus: primary=reinforcement learning, secondary=privacy-preserving ML

Entity: researcher/jessica_demir
  affiliation: UC Berkeley
  publication_count: 39
  previous_employer: OpenAI (2018-2021)
  research_focus: primary=graph neural networks, secondary=knowledge grounding

Entity: researcher/markus_zhou
  affiliation: University of Edinburgh
  publication_count: 80
  previous_employer: OpenAI (2018-2021)
  research_focus: primary=autonomous driving, secondary=counterfactual reasoning

Entity: researcher/ryan_ghosh
  affiliation: Princeton CS
  publication_count: 62
  previous_employer: Twitter Machine Learning (2019-2022)
  research_focus: primary=meta-learning, secondary=domain adaptation

Entity: researcher/nour_yang
  affiliation: Vector Institute
  publication_count: 50
  previous_employer: Snap Research (2018-2021)
  research_focus: primary=interpretable ML, secondary=clinical decision support

Entity: researcher/arjun_mehta
  affiliation: KTH Royal Institute of Technology
  publication_count: 97
  previous_employer: Tencent AI Lab (2019-2022)
  research_focus: primary=reinforcement learning, secondary=vision-language models

Entity: researcher/marta_abdullah
  affiliation: University of Edinburgh
  publication_count: 6
  previous_employer: OpenAI Research (2019-2022)
  research_focus: primary=anomaly detection, secondary=certified defenses

Entity: researcher/erica_schmidt
  affiliation: Columbia University
  publication_count: 67
  previous_employer: ByteDance AI Lab (2020-2023)
  research_focus: primary=Bayesian deep learning, secondary=value alignment

Entity: researcher/julian_stark
  affiliation: University of Copenhagen
  publication_count: 87
  previous_employer: Google DeepMind (2020-2023)
  research_focus: primary=neural architecture search, secondary=time series analysis

Entity: researcher/yan_nkosi
  affiliation: Stanford University
  publication_count: 38
  previous_employer: Jane Street Research (2018-2021)
  research_focus: primary=reinforcement learning, secondary=structured prediction

Entity: researcher/victoria_ferrari
  affiliation: University of Melbourne
  publication_count: 13
  previous_employer: Samsung AI Center (2019-2022)
  research_focus: primary=speech recognition, secondary=sensor fusion

Entity: researcher/hao_tran
  affiliation: Hebrew University
  publication_count: 62
  previous_employer: Snap Research (2018-2021)
  research_focus: primary=speech recognition, secondary=domain adaptation

Entity: researcher/elias_weber
  affiliation: Montreal Institute for Learning Algorithms
  publication_count: 28
  previous_employer: Twitter Machine Learning (2019-2022)
  research_focus: primary=graph neural networks, secondary=reading comprehension

Entity: researcher/rebecca_lim
  affiliation: UC Berkeley
  publication_count: 70
  previous_employer: Twitter Machine Learning (2019-2022)
  research_focus: primary=adversarial robustness, secondary=program synthesis

Entity: researcher/dimitri_hansen
  affiliation: University of Melbourne
  publication_count: 59
  previous_employer: Google DeepMind (2020-2023)
  research_focus: primary=continual learning, secondary=clinical decision support

Entity: researcher/rahul_tan
  affiliation: NYU Courant Institute
  publication_count: 32
  previous_employer: Alibaba DAMO Academy (2018-2021)
  research_focus: primary=interpretable ML, secondary=clinical decision support

Entity: researcher/mira_wang
  affiliation: University of Helsinki
  publication_count: 64
  previous_employer: Microsoft Research (2015-2018)
  research_focus: primary=federated learning, secondary=program synthesis

Entity: researcher/lauren_zhang
  affiliation: University of Edinburgh
  publication_count: 95
  previous_employer: OpenAI Research (2019-2022)
  research_focus: primary=autonomous driving, secondary=domain adaptation

Entity: researcher/caroline_cheng
  affiliation: University of Edinburgh
  publication_count: 53
  previous_employer: Vector Institute (2018-2021)
  research_focus: primary=code generation, secondary=knowledge grounding

Entity: researcher/erica_castro
  affiliation: University of Helsinki
  publication_count: 16
  previous_employer: Baidu Research (2018-2021)
  research_focus: primary=adversarial robustness, secondary=sensor fusion

Entity: researcher/lucia_kumar
  affiliation: University of Copenhagen
  publication_count: 67
  previous_employer: Two Sigma Research (2019-2022)
  research_focus: primary=adversarial robustness, secondary=domain adaptation

Entity: researcher/valentina_lopez
  affiliation: Tokyo University
  publication_count: 46
  previous_employer: Microsoft Research (2015-2018)
  research_focus: primary=summarization, secondary=machine translation

Entity: researcher/sabrina_zhao
  affiliation: UT Austin
  publication_count: 59
  previous_employer: Jane Street Research (2018-2021)
  research_focus: primary=recommendation systems, secondary=abstractive generation

Entity: researcher/lucas_jensen
  affiliation: McGill University
  publication_count: 16
  previous_employer: Tesla AI (2019-2022)
  research_focus: primary=semantic parsing, secondary=spoken dialog systems

Entity: researcher/alexei_kapoor
  affiliation: Hong Kong University of Science and Technology
  publication_count: 98
  previous_employer: NVIDIA Research (2017-2020)
  research_focus: primary=adversarial robustness, secondary=spoken dialog systems

Entity: researcher/pablo_guo
  affiliation: University of Melbourne
  publication_count: 73
  previous_employer: Samsung AI Center (2019-2022)
  research_focus: primary=graph neural networks, secondary=catastrophic forgetting

Entity: researcher/elias_sekar
  affiliation: University of Copenhagen
  publication_count: 97
  previous_employer: IBM Research (2016-2019)
  research_focus: primary=multimodal learning, secondary=generalization bounds

Entity: researcher/sven_sato
  affiliation: Chinese University of Hong Kong
  publication_count: 18
  previous_employer: Two Sigma Research (2019-2022)
  research_focus: primary=reinforcement learning, secondary=collaborative filtering

Entity: researcher/dilnoza_cruz
  affiliation: Vector Institute
  publication_count: 40
  previous_employer: Bosch Center for AI (2019-2022)
  research_focus: primary=machine learning theory, secondary=spoken dialog systems

Entity: researcher/pablo_almeida
  affiliation: Cornell Tech
  publication_count: 86
  previous_employer: Jane Street Research (2018-2021)
  research_focus: primary=meta-learning, secondary=efficient deep learning

Entity: researcher/julien_malik
  affiliation: University of Helsinki
  publication_count: 23
  previous_employer: Google Brain (2016-2019)
  research_focus: primary=semantic parsing, secondary=catastrophic forgetting

Entity: researcher/diego_eriksson
  affiliation: University of British Columbia
  publication_count: 70
  previous_employer: Tesla AI (2019-2022)
  research_focus: primary=information retrieval, secondary=vision-language models

Entity: researcher/gabriel_tang
  affiliation: Georgia Tech
  publication_count: 13
  previous_employer: Snap Research (2018-2021)
  research_focus: primary=AI safety, secondary=privacy-preserving ML

Entity: researcher/marco_nilsson
  affiliation: Tsinghua University
  publication_count: 18
  previous_employer: Apple ML Research (2019-2022)
  research_focus: primary=Bayesian deep learning, secondary=knowledge grounding

Entity: researcher/colin_wenger
  affiliation: UC Berkeley
  publication_count: 84
  previous_employer: Salesforce Research (2018-2021)
  research_focus: primary=machine learning theory, secondary=collaborative filtering

Entity: researcher/celine_wenger
  affiliation: Carnegie Mellon University
  publication_count: 13
  previous_employer: Citadel Securities Research (2017-2020)
  research_focus: primary=dialogue systems, secondary=program synthesis

Entity: researcher/ivan_moretti
  affiliation: Leiden University
  publication_count: 65
  previous_employer: NVIDIA Research (2017-2020)
  research_focus: primary=anomaly detection, secondary=uncertainty quantification

Entity: researcher/shreya_brown
  affiliation: Peking University
  publication_count: 35
  previous_employer: Google DeepMind (2020-2023)
  research_focus: primary=autonomous driving, secondary=structured prediction

Entity: researcher/andrew_smith
  affiliation: ETH Zurich
  publication_count: 30
  previous_employer: Baidu Research (2018-2021)
  research_focus: primary=neural architecture search, secondary=robotics

Entity: researcher/oscar_fuentes
  affiliation: University of Amsterdam
  publication_count: 63
  previous_employer: Waymo Research (2020-2023)
  research_focus: primary=Bayesian deep learning, secondary=efficient deep learning

Entity: researcher/francesco_nielsen
  affiliation: Sapienza University of Rome
  publication_count: 18
  previous_employer: Baidu Research (2018-2021)
  research_focus: primary=multi-task learning, secondary=object detection

Entity: researcher/nikita_burger
  affiliation: University of Toronto
  publication_count: 87
  previous_employer: ByteDance AI Lab (2020-2023)
  research_focus: primary=AI safety, secondary=efficient deep learning

Entity: researcher/mia_richter
  affiliation: INRIA Paris
  publication_count: 78
  previous_employer: Huawei Noah Ark Lab (2018-2021)
  research_focus: primary=code generation, secondary=domain adaptation

Entity: researcher/luna_saito
  affiliation: Technion
  publication_count: 39
  previous_employer: Huawei Noah Ark Lab (2018-2021)
  research_focus: primary=computational biology, secondary=reading comprehension

Entity: researcher/nicolas_vega
  affiliation: KTH Royal Institute of Technology
  publication_count: 26
  previous_employer: Tencent AI Lab (2019-2022)
  research_focus: primary=question answering, secondary=abstractive generation

Entity: researcher/henrik_lim
  affiliation: TU Berlin
  publication_count: 53
  previous_employer: Bosch Center for AI (2019-2022)
  research_focus: primary=multi-task learning, secondary=spoken dialog systems

Entity: researcher/saanvi_meyer
  affiliation: National University of Singapore
  publication_count: 78
  previous_employer: OpenAI Research (2019-2022)
  research_focus: primary=speech recognition, secondary=sensor fusion

Entity: researcher/aaron_wiese
  affiliation: Max Planck Institute for Informatics
  publication_count: 87
  previous_employer: Google Research (2018-2021)
  research_focus: primary=computational biology, secondary=efficient deep learning

Entity: researcher/caroline_demir
  affiliation: Cambridge University
  publication_count: 52
  previous_employer: Qualcomm AI Research (2017-2020)
  research_focus: primary=self-supervised learning, secondary=catastrophic forgetting

Entity: researcher/magdalena_maier
  affiliation: University of Melbourne
  publication_count: 83
  previous_employer: Tesla AI (2019-2022)
  research_focus: primary=meta-learning, secondary=reading comprehension

Entity: researcher/francesca_durand
  affiliation: KTH Royal Institute of Technology
  publication_count: 85
  previous_employer: Vector Institute (2018-2021)
  research_focus: primary=computational biology, secondary=dense retrieval

Entity: researcher/connor_christiansen
  affiliation: NYU Courant Institute
  publication_count: 10
  previous_employer: ByteDance AI Lab (2020-2023)
  research_focus: primary=self-supervised learning, secondary=uncertainty quantification

Entity: researcher/danielle_wagner
  affiliation: Peking University
  publication_count: 63
  previous_employer: Adobe Research (2017-2020)
  research_focus: primary=multimodal learning, secondary=structured prediction

Entity: researcher/sara_russo
  affiliation: UT Austin
  publication_count: 59
  previous_employer: Qualcomm AI Research (2017-2020)
  research_focus: primary=reinforcement learning, secondary=abstractive generation

Entity: researcher/jennifer_ramirez
  affiliation: Georgia Tech
  publication_count: 65
  previous_employer: Google Research (2018-2021)
  research_focus: primary=out-of-distribution generalization, secondary=object detection

Entity: researcher/zachary_vidal
  affiliation: Boston University
  publication_count: 76
  previous_employer: OpenAI Research (2019-2022)
  research_focus: primary=self-supervised learning, secondary=model explanation

Entity: researcher/martin_liu
  affiliation: Allen Institute for AI
  publication_count: 78
  previous_employer: Microsoft Research (2015-2018)
  research_focus: primary=medical imaging, secondary=certified defenses

Entity: researcher/christoph_osei
  affiliation: University of British Columbia
  publication_count: 6
  previous_employer: Bosch Center for AI (2019-2022)
  research_focus: primary=computational biology, secondary=machine translation

Entity: researcher/aseel_klein
  affiliation: Purdue University
  publication_count: 20
  previous_employer: Google Research (2018-2021)
  research_focus: primary=causal inference, secondary=uncertainty quantification

Entity: researcher/lukas_castro
  affiliation: Chinese University of Hong Kong
  publication_count: 76
  previous_employer: Jane Street Research (2018-2021)
  research_focus: primary=commonsense reasoning, secondary=counterfactual reasoning

Entity: researcher/hassan_rashid
  affiliation: TU Berlin
  publication_count: 76
  previous_employer: Huawei Noah Ark Lab (2018-2021)
  research_focus: primary=multi-task learning, secondary=contrastive methods

Entity: researcher/jessica_richter
  affiliation: Hong Kong University of Science and Technology
  publication_count: 57
  previous_employer: Microsoft Research (2017-2020)
  research_focus: primary=code generation, secondary=catastrophic forgetting

Entity: researcher/victor_singh
  affiliation: Princeton CS
  publication_count: 82
  previous_employer: OpenAI (2018-2021)
  research_focus: primary=computational biology, secondary=knowledge graphs

```