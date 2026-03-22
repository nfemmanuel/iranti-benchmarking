# B1 Extended Dataset - N=2000

**Benchmark:** B1 - Entity Fact Retrieval under Distractor Density
**Created:** 2026-03-22
**Entities:** 1938 (1936 fictional distractors + researcher/alice_chen at position 800 + researcher/bob_okafor at position 1500)
**Token estimate:** ~107,000

---

## Ground Truth (Needles)

**researcher/alice_chen** (pos 800/1938) - affiliation: MIT Computer Science | publication_count: 47 | previous_employer: OpenAI (2018-2021) | research_focus: natural language processing
**researcher/bob_okafor** (pos 1500/1938) - affiliation: Stanford AI Lab | publication_count: 23 | previous_employer: DeepMind (2020-2023) | research_focus: computer vision

---

## Haystack Document - N=2000

```
RESEARCHER REGISTRY - 2000 ENTRIES

Entity: researcher/priya_volkov
  affiliation: MIT CSAIL
  publication_count: 34
  previous_employer: Google Brain (2015-2018)
  research_focus: primary=machine learning, secondary=fairness and bias

Entity: researcher/tobias_osei
  affiliation: Stanford AI Lab
  publication_count: 58
  previous_employer: Microsoft Research (2017-2020)
  research_focus: primary=reinforcement learning, secondary=robotics

Entity: researcher/amina_korhonen
  affiliation: Carnegie Mellon SCS
  publication_count: 42
  previous_employer: Meta AI (2018-2021)
  research_focus: primary=computer vision, secondary=3D scene understanding

Entity: researcher/dmitri_okonkwo
  affiliation: UC Berkeley EECS
  publication_count: 67
  previous_employer: IBM Research (2016-2019)
  research_focus: primary=knowledge graphs, secondary=semantic parsing

Entity: researcher/yuna_bergstrom
  affiliation: Oxford CS
  publication_count: 29
  previous_employer: Apple Machine Learning Research (2019-2022)
  research_focus: primary=speech recognition, secondary=dialog systems

Entity: researcher/kwame_lindqvist
  affiliation: Cambridge AI
  publication_count: 51
  previous_employer: DeepMind (2017-2020)
  research_focus: primary=causal inference, secondary=counterfactual reasoning

Entity: researcher/fatou_becker
  affiliation: ETH Zurich
  publication_count: 38
  previous_employer: Amazon Science (2018-2021)
  research_focus: primary=federated learning, secondary=privacy

Entity: researcher/aleksei_dubois
  affiliation: EPFL
  publication_count: 73
  previous_employer: NVIDIA Research (2015-2018)
  research_focus: primary=efficient deep learning, secondary=neural architecture search

Entity: researcher/zainab_fischer
  affiliation: TU Berlin
  publication_count: 45
  previous_employer: Waymo Research (2019-2022)
  research_focus: primary=autonomous driving, secondary=3D scene understanding

Entity: researcher/ryo_castellano
  affiliation: University of Toronto
  publication_count: 61
  previous_employer: Samsung AI Center (2016-2019)
  research_focus: primary=graph neural networks, secondary=social network analysis

Entity: researcher/nadia_kimura
  affiliation: University of Amsterdam
  publication_count: 27
  previous_employer: Huawei Noah Ark Lab (2018-2021)
  research_focus: primary=continual learning, secondary=catastrophic forgetting

Entity: researcher/pierre_adeyemi
  affiliation: KU Leuven
  publication_count: 84
  previous_employer: Baidu Research (2015-2018)
  research_focus: primary=natural language processing, secondary=question answering

Entity: researcher/sunita_johansson
  affiliation: Peking University
  publication_count: 39
  previous_employer: Tencent AI Lab (2017-2020)
  research_focus: primary=recommender systems, secondary=information retrieval

Entity: researcher/mikhail_eze
  affiliation: Tsinghua CS
  publication_count: 56
  previous_employer: Alibaba DAMO Academy (2018-2021)
  research_focus: primary=multimodal learning, secondary=video understanding

Entity: researcher/ingeborg_takahashi
  affiliation: University of Tokyo
  publication_count: 48
  previous_employer: ByteDance AI (2019-2022)
  research_focus: primary=summarization, secondary=machine translation

Entity: researcher/kofi_petersen
  affiliation: Seoul National University
  publication_count: 33
  previous_employer: Kakao AI (2016-2019)
  research_focus: primary=zero-shot learning, secondary=few-shot learning

Entity: researcher/valentina_krishnamurthy
  affiliation: IIT Bombay
  publication_count: 62
  previous_employer: Google DeepMind (2017-2020)
  research_focus: primary=program synthesis, secondary=code generation

Entity: researcher/oluseun_wagner
  affiliation: University of Cape Town
  publication_count: 44
  previous_employer: Intel Labs (2018-2021)
  research_focus: primary=adversarial robustness, secondary=interpretability

Entity: researcher/camila_ostrowski
  affiliation: Universidade de São Paulo
  publication_count: 71
  previous_employer: Qualcomm AI Research (2015-2018)
  research_focus: primary=time series forecasting, secondary=financial machine learning

Entity: researcher/ibrahim_sorensen
  affiliation: Tel Aviv University
  publication_count: 37
  previous_employer: J.P. Morgan AI Research (2019-2022)
  research_focus: primary=financial machine learning, secondary=risk modeling

Entity: researcher/mei_grabowski
  affiliation: Hebrew University
  publication_count: 55
  previous_employer: Goldman Sachs AI (2017-2020)
  research_focus: primary=causal inference, secondary=fairness and bias

Entity: researcher/fredrik_nakamura
  affiliation: Technion
  publication_count: 43
  previous_employer: Two Sigma AI (2016-2019)
  research_focus: primary=reinforcement learning, secondary=multi-task learning

Entity: researcher/adaeze_lindstrom
  affiliation: Leiden University
  publication_count: 68
  previous_employer: D.E. Shaw Research (2018-2021)
  research_focus: primary=drug discovery, secondary=protein structure prediction

Entity: researcher/hamid_nakagawa
  affiliation: University of Helsinki
  publication_count: 31
  previous_employer: Pfizer AI (2017-2020)
  research_focus: primary=computational biology, secondary=drug discovery

Entity: researcher/anna_mensah
  affiliation: Warsaw University of Technology
  publication_count: 59
  previous_employer: Recursion Pharmaceuticals (2019-2022)
  research_focus: primary=medical imaging, secondary=computational biology

Entity: researcher/leon_balogun
  affiliation: Ghent University
  publication_count: 47
  previous_employer: AbSci (2018-2021)
  research_focus: primary=protein structure prediction, secondary=drug discovery

Entity: researcher/hana_stromberg
  affiliation: University of Copenhagen
  publication_count: 36
  previous_employer: Novartis AI (2016-2019)
  research_focus: primary=drug discovery, secondary=medical imaging

Entity: researcher/victor_asante
  affiliation: Université Paris-Saclay
  publication_count: 74
  previous_employer: Roche Informatics (2017-2020)
  research_focus: primary=computational biology, secondary=protein structure prediction

Entity: researcher/liu_bergmann
  affiliation: Max Planck Institute for Intelligent Systems
  publication_count: 52
  previous_employer: Google Brain (2018-2021)
  research_focus: primary=generative models, secondary=contrastive methods

Entity: researcher/fatima_andersson
  affiliation: Vector Institute
  publication_count: 41
  previous_employer: Microsoft Research (2015-2018)
  research_focus: primary=natural language processing, secondary=commonsense reasoning

Entity: researcher/jose_nwosu
  affiliation: Mila
  publication_count: 66
  previous_employer: Meta AI (2017-2020)
  research_focus: primary=graph neural networks, secondary=knowledge graphs

Entity: researcher/elena_mwangi
  affiliation: Allen Institute for AI
  publication_count: 28
  previous_employer: Amazon Science (2019-2022)
  research_focus: primary=question answering, secondary=information retrieval

Entity: researcher/tanvir_holmberg
  affiliation: National University of Singapore
  publication_count: 83
  previous_employer: Google DeepMind (2016-2019)
  research_focus: primary=speech recognition, secondary=audio processing

Entity: researcher/nkechi_eriksen
  affiliation: Nanyang Technological University
  publication_count: 46
  previous_employer: Qualcomm AI Research (2018-2021)
  research_focus: primary=efficient deep learning, secondary=federated learning

Entity: researcher/lucas_yamamoto
  affiliation: KAIST
  publication_count: 57
  previous_employer: Samsung AI Center (2017-2020)
  research_focus: primary=computer vision, secondary=medical imaging

Entity: researcher/sofie_obi
  affiliation: Hong Kong University of Science and Technology
  publication_count: 35
  previous_employer: Huawei Noah Ark Lab (2019-2022)
  research_focus: primary=multimodal learning, secondary=video understanding

Entity: researcher/aryan_gustafsson
  affiliation: Purdue University
  publication_count: 72
  previous_employer: IBM Research (2015-2018)
  research_focus: primary=reinforcement learning, secondary=robotics

Entity: researcher/zara_iwamoto
  affiliation: University of Michigan
  publication_count: 49
  previous_employer: Ford Research (2017-2020)
  research_focus: primary=autonomous driving, secondary=reinforcement learning

Entity: researcher/emeka_lindahl
  affiliation: UT Austin CS
  publication_count: 64
  previous_employer: NVIDIA Research (2018-2021)
  research_focus: primary=neural architecture search, secondary=efficient deep learning

Entity: researcher/soo_jin_hartmann
  affiliation: University of Washington
  publication_count: 38
  previous_employer: Apple Machine Learning Research (2016-2019)
  research_focus: primary=fairness and bias, secondary=interpretability

Entity: researcher/andile_ferrari
  affiliation: NYU CS
  publication_count: 53
  previous_employer: Bloomberg AI (2019-2022)
  research_focus: primary=financial machine learning, secondary=time series forecasting

Entity: researcher/astrid_okonkwo
  affiliation: Princeton CS
  publication_count: 77
  previous_employer: Jane Street Research (2017-2020)
  research_focus: primary=financial machine learning, secondary=causal inference

Entity: researcher/rodrigo_larsen
  affiliation: Yale CS
  publication_count: 42
  previous_employer: Optiver AI (2018-2021)
  research_focus: primary=machine learning, secondary=time series forecasting

Entity: researcher/chidinma_bergqvist
  affiliation: Johns Hopkins CS
  publication_count: 61
  previous_employer: J.P. Morgan AI Research (2016-2019)
  research_focus: primary=financial machine learning, secondary=risk modeling

Entity: researcher/niklas_oyewole
  affiliation: University of Edinburgh
  publication_count: 33
  previous_employer: Goldman Sachs AI (2018-2021)
  research_focus: primary=machine learning, secondary=financial machine learning

Entity: researcher/amara_tanaka
  affiliation: University of Glasgow
  publication_count: 55
  previous_employer: Palantir (2017-2020)
  research_focus: primary=cybersecurity, secondary=social network analysis

Entity: researcher/hassan_pettersson
  affiliation: University of Bristol
  publication_count: 68
  previous_employer: Google Brain (2019-2022)
  research_focus: primary=natural language processing, secondary=summarization

Entity: researcher/nneka_voss
  affiliation: Aalborg University
  publication_count: 44
  previous_employer: Microsoft Research (2015-2018)
  research_focus: primary=human-robot interaction, secondary=robotics

Entity: researcher/siddharth_engstrom
  affiliation: Delft University of Technology
  publication_count: 78
  previous_employer: Meta AI (2017-2020)
  research_focus: primary=computer vision, secondary=3D scene understanding

Entity: researcher/yuki_adebayo
  affiliation: University of Zurich
  publication_count: 36
  previous_employer: Amazon Science (2018-2021)
  research_focus: primary=continual learning, secondary=few-shot learning

Entity: researcher/vera_osei
  affiliation: MIT CSAIL
  publication_count: 63
  previous_employer: DeepMind (2016-2019)
  research_focus: primary=reinforcement learning, secondary=game theory

Entity: researcher/benedikt_nwosu
  affiliation: Stanford AI Lab
  publication_count: 47
  previous_employer: OpenAI (2019-2022)
  research_focus: primary=large language models, secondary=alignment

Entity: researcher/ishaan_lindqvist
  affiliation: Carnegie Mellon SCS
  publication_count: 54
  previous_employer: Anthropic (2020-2023)
  research_focus: primary=interpretability, secondary=alignment

Entity: researcher/oluwakemi_haugen
  affiliation: UC Berkeley EECS
  publication_count: 29
  previous_employer: Cohere AI (2021-2023)
  research_focus: primary=natural language processing, secondary=few-shot learning

Entity: researcher/anders_iwata
  affiliation: Oxford CS
  publication_count: 71
  previous_employer: Google DeepMind (2017-2020)
  research_focus: primary=reinforcement learning, secondary=planning

Entity: researcher/nour_lindberg
  affiliation: Cambridge AI
  publication_count: 38
  previous_employer: Microsoft Research (2018-2021)
  research_focus: primary=machine translation, secondary=multilingual NLP

Entity: researcher/chen_adeyemi
  affiliation: ETH Zurich
  publication_count: 82
  previous_employer: Baidu Research (2016-2019)
  research_focus: primary=computer vision, secondary=image generation

Entity: researcher/sigrid_okafor
  affiliation: EPFL
  publication_count: 45
  previous_employer: NVIDIA Research (2017-2020)
  research_focus: primary=3D scene understanding, secondary=robotics

Entity: researcher/abel_johansson
  affiliation: TU Berlin
  publication_count: 60
  previous_employer: Intel Labs (2018-2021)
  research_focus: primary=efficient deep learning, secondary=hardware acceleration

Entity: researcher/preethi_sorensen
  affiliation: University of Toronto
  publication_count: 34
  previous_employer: Samsung AI Center (2019-2022)
  research_focus: primary=speech recognition, secondary=multilingual NLP

Entity: researcher/emre_adesanya
  affiliation: University of Amsterdam
  publication_count: 76
  previous_employer: Tencent AI Lab (2015-2018)
  research_focus: primary=recommender systems, secondary=graph neural networks

Entity: researcher/sonja_krishnamurthy
  affiliation: KU Leuven
  publication_count: 41
  previous_employer: Alibaba DAMO Academy (2017-2020)
  research_focus: primary=knowledge graphs, secondary=information retrieval

Entity: researcher/kweku_lindgren
  affiliation: Peking University
  publication_count: 57
  previous_employer: ByteDance AI (2018-2021)
  research_focus: primary=natural language processing, secondary=code generation

Entity: researcher/aya_bjornsen
  affiliation: Tsinghua CS
  publication_count: 43
  previous_employer: Alibaba DAMO Academy (2019-2022)
  research_focus: primary=multimodal learning, secondary=image-text retrieval

Entity: researcher/adebayo_lindstrom
  affiliation: University of Tokyo
  publication_count: 65
  previous_employer: Google Brain (2016-2019)
  research_focus: primary=machine learning, secondary=Bayesian inference

Entity: researcher/hina_kristiansen
  affiliation: Seoul National University
  publication_count: 28
  previous_employer: Kakao AI (2018-2021)
  research_focus: primary=dialog systems, secondary=conversational AI

Entity: researcher/marco_osei
  affiliation: IIT Bombay
  publication_count: 79
  previous_employer: Google DeepMind (2015-2018)
  research_focus: primary=computer vision, secondary=object detection

Entity: researcher/thandi_kato
  affiliation: University of Cape Town
  publication_count: 36
  previous_employer: Microsoft Research (2017-2020)
  research_focus: primary=educational technology, secondary=human-computer interaction

Entity: researcher/renata_bergstrom
  affiliation: Universidade de São Paulo
  publication_count: 52
  previous_employer: Meta AI (2018-2021)
  research_focus: primary=social network analysis, secondary=misinformation detection

Entity: researcher/bilal_gustafsson
  affiliation: Tel Aviv University
  publication_count: 44
  previous_employer: Huawei Noah Ark Lab (2016-2019)
  research_focus: primary=adversarial robustness, secondary=security

Entity: researcher/chioma_berg
  affiliation: Hebrew University
  publication_count: 68
  previous_employer: IBM Research (2019-2022)
  research_focus: primary=natural language processing, secondary=entity recognition

Entity: researcher/fredrik_otieno
  affiliation: Technion
  publication_count: 37
  previous_employer: Intel Labs (2017-2020)
  research_focus: primary=efficient deep learning, secondary=edge computing

Entity: researcher/giulia_watanabe
  affiliation: Leiden University
  publication_count: 83
  previous_employer: NVIDIA Research (2018-2021)
  research_focus: primary=computer vision, secondary=video understanding

Entity: researcher/tariq_henriksen
  affiliation: University of Helsinki
  publication_count: 55
  previous_employer: Qualcomm AI Research (2016-2019)
  research_focus: primary=signal processing, secondary=speech recognition

Entity: researcher/oluwatobi_stromberg
  affiliation: Warsaw University of Technology
  publication_count: 42
  previous_employer: Samsung AI Center (2018-2021)
  research_focus: primary=computer vision, secondary=autonomous driving

Entity: researcher/paloma_nakamura
  affiliation: Ghent University
  publication_count: 61
  previous_employer: Amazon Science (2017-2020)
  research_focus: primary=natural language processing, secondary=document understanding

Entity: researcher/leif_eze
  affiliation: University of Copenhagen
  publication_count: 48
  previous_employer: Microsoft Research (2019-2022)
  research_focus: primary=machine learning, secondary=active learning

Entity: researcher/yasmin_holm
  affiliation: Université Paris-Saclay
  publication_count: 74
  previous_employer: Google Brain (2015-2018)
  research_focus: primary=generative models, secondary=image synthesis

Entity: researcher/oluwafemi_lindahl
  affiliation: Max Planck Institute for Intelligent Systems
  publication_count: 33
  previous_employer: Meta AI (2016-2019)
  research_focus: primary=representation learning, secondary=contrastive methods

Entity: researcher/zuzanna_tanaka
  affiliation: Vector Institute
  publication_count: 69
  previous_employer: DeepMind (2017-2020)
  research_focus: primary=reinforcement learning, secondary=model-based RL

Entity: researcher/magnus_eze
  affiliation: Mila
  publication_count: 46
  previous_employer: Google DeepMind (2018-2021)
  research_focus: primary=graph neural networks, secondary=chemistry

Entity: researcher/adaora_henriksson
  affiliation: Allen Institute for AI
  publication_count: 57
  previous_employer: Amazon Science (2019-2022)
  research_focus: primary=question answering, secondary=knowledge graphs

Entity: researcher/ismail_gronqvist
  affiliation: National University of Singapore
  publication_count: 38
  previous_employer: Baidu Research (2017-2020)
  research_focus: primary=speech recognition, secondary=audio processing

Entity: researcher/nneka_pettersson
  affiliation: Nanyang Technological University
  publication_count: 72
  previous_employer: Qualcomm AI Research (2016-2019)
  research_focus: primary=computer vision, secondary=image recognition

Entity: researcher/taeyang_eriksson
  affiliation: KAIST
  publication_count: 43
  previous_employer: Samsung AI Center (2018-2021)
  research_focus: primary=natural language processing, secondary=Korean NLP

Entity: researcher/lena_okonkwo
  affiliation: Hong Kong University of Science and Technology
  publication_count: 65
  previous_employer: Huawei Noah Ark Lab (2016-2019)
  research_focus: primary=multimodal learning, secondary=cross-lingual transfer

Entity: researcher/hugo_nakagawa
  affiliation: Purdue University
  publication_count: 28
  previous_employer: IBM Research (2018-2021)
  research_focus: primary=machine learning, secondary=optimization

Entity: researcher/chiamaka_voss
  affiliation: University of Michigan
  publication_count: 81
  previous_employer: Ford Research (2017-2020)
  research_focus: primary=autonomous driving, secondary=sensor fusion

Entity: researcher/rasmus_oyewale
  affiliation: UT Austin CS
  publication_count: 54
  previous_employer: Intel Labs (2016-2019)
  research_focus: primary=computer architecture, secondary=hardware-aware ML

Entity: researcher/mei_lin_Lindqvist
  affiliation: University of Washington
  publication_count: 39
  previous_employer: Microsoft Research (2019-2022)
  research_focus: primary=natural language processing, secondary=semantic parsing

Entity: researcher/kwabena_holm
  affiliation: NYU CS
  publication_count: 76
  previous_employer: Bloomberg AI (2017-2020)
  research_focus: primary=financial machine learning, secondary=NLP for finance

Entity: researcher/olga_nakamura
  affiliation: Princeton CS
  publication_count: 45
  previous_employer: Two Sigma AI (2018-2021)
  research_focus: primary=machine learning, secondary=statistics

Entity: researcher/chukwuemeka_lindgren
  affiliation: Yale CS
  publication_count: 63
  previous_employer: Jane Street Research (2016-2019)
  research_focus: primary=optimization, secondary=financial machine learning

Entity: researcher/nadia_watanabe
  affiliation: Johns Hopkins CS
  publication_count: 37
  previous_employer: Genentech Computational Biology (2019-2022)
  research_focus: primary=medical imaging, secondary=clinical NLP

Entity: researcher/per_adebayo
  affiliation: University of Edinburgh
  publication_count: 58
  previous_employer: Roche Informatics (2017-2020)
  research_focus: primary=drug discovery, secondary=cheminformatics

Entity: researcher/aisling_yamamoto
  affiliation: University of Glasgow
  publication_count: 44
  previous_employer: Pfizer AI (2018-2021)
  research_focus: primary=computational biology, secondary=genomics

Entity: researcher/ibrahim_pettersson
  affiliation: University of Bristol
  publication_count: 79
  previous_employer: Novartis AI (2016-2019)
  research_focus: primary=drug discovery, secondary=molecular generation

Entity: researcher/astrid_mensah
  affiliation: Aalborg University
  publication_count: 31
  previous_employer: AbSci (2018-2021)
  research_focus: primary=protein structure prediction, secondary=drug design

Entity: researcher/yusuf_lindqvist
  affiliation: Delft University of Technology
  publication_count: 67
  previous_employer: Google Brain (2017-2020)
  research_focus: primary=machine learning, secondary=Bayesian optimization

Entity: researcher/chidera_johansson
  affiliation: University of Zurich
  publication_count: 42
  previous_employer: Microsoft Research (2019-2022)
  research_focus: primary=natural language processing, secondary=biomedical NLP

Entity: researcher/ingrid_okafor
  affiliation: MIT CSAIL
  publication_count: 56
  previous_employer: DeepMind (2015-2018)
  research_focus: primary=reinforcement learning, secondary=multi-agent systems

Entity: researcher/takumi_abara
  affiliation: Stanford AI Lab
  publication_count: 73
  previous_employer: OpenAI (2018-2021)
  research_focus: primary=large language models, secondary=code generation

Entity: researcher/amalie_krishnan
  affiliation: Carnegie Mellon SCS
  publication_count: 35
  previous_employer: Anthropic (2021-2023)
  research_focus: primary=alignment, secondary=interpretability

Entity: researcher/seun_lindahl
  affiliation: UC Berkeley EECS
  publication_count: 61
  previous_employer: Google Brain (2017-2020)
  research_focus: primary=machine learning, secondary=optimization

Entity: researcher/yuki_mensah
  affiliation: Oxford CS
  publication_count: 48
  previous_employer: Apple Machine Learning Research (2018-2021)
  research_focus: primary=on-device ML, secondary=efficient deep learning

Entity: researcher/hector_nakagawa
  affiliation: Cambridge AI
  publication_count: 82
  previous_employer: Microsoft Research (2015-2018)
  research_focus: primary=computer vision, secondary=scene understanding

Entity: researcher/fatou_lindstrom
  affiliation: ETH Zurich
  publication_count: 39
  previous_employer: EPFL (2017-2020)
  research_focus: primary=federated learning, secondary=differential privacy

Entity: researcher/bogdan_tanaka
  affiliation: EPFL
  publication_count: 54
  previous_employer: Google DeepMind (2018-2021)
  research_focus: primary=graph neural networks, secondary=combinatorial optimization

Entity: researcher/chidinma_oberg
  affiliation: TU Berlin
  publication_count: 66
  previous_employer: Fraunhofer IKS (2016-2019)
  research_focus: primary=autonomous systems, secondary=safety verification

Entity: researcher/kazuki_adeyemi
  affiliation: University of Toronto
  publication_count: 44
  previous_employer: Vector Institute (2019-2022)
  research_focus: primary=machine learning, secondary=few-shot learning

Entity: researcher/ingeborg_nwosu
  affiliation: University of Amsterdam
  publication_count: 57
  previous_employer: Booking.com AI (2017-2020)
  research_focus: primary=recommender systems, secondary=personalization

Entity: researcher/kweku_bjornsen
  affiliation: KU Leuven
  publication_count: 71
  previous_employer: Spotify Research (2018-2021)
  research_focus: primary=recommender systems, secondary=music information retrieval

Entity: researcher/olena_nakamura
  affiliation: Peking University
  publication_count: 36
  previous_employer: Baidu Research (2016-2019)
  research_focus: primary=natural language processing, secondary=Chinese NLP

Entity: researcher/emeka_gronqvist
  affiliation: Tsinghua CS
  publication_count: 79
  previous_employer: ByteDance AI (2017-2020)
  research_focus: primary=video understanding, secondary=action recognition

Entity: researcher/sigrid_mensah
  affiliation: University of Tokyo
  publication_count: 43
  previous_employer: Sony AI (2018-2021)
  research_focus: primary=computer vision, secondary=image generation

Entity: researcher/ahmed_engstrom
  affiliation: Seoul National University
  publication_count: 68
  previous_employer: Samsung AI Center (2016-2019)
  research_focus: primary=natural language processing, secondary=question answering

Entity: researcher/oluwabunmi_jorgensen
  affiliation: IIT Bombay
  publication_count: 52
  previous_employer: Google Brain India (2018-2021)
  research_focus: primary=machine learning, secondary=low-resource NLP

Entity: researcher/ingrid_kimura
  affiliation: University of Cape Town
  publication_count: 37
  previous_employer: Microsoft Research (2019-2022)
  research_focus: primary=fairness and bias, secondary=AI for social good

Entity: researcher/joao_lindqvist
  affiliation: Universidade de São Paulo
  publication_count: 74
  previous_employer: Meta AI (2017-2020)
  research_focus: primary=natural language processing, secondary=Portuguese NLP

Entity: researcher/chidera_eriksen
  affiliation: Tel Aviv University
  publication_count: 46
  previous_employer: Huawei Noah Ark Lab (2018-2021)
  research_focus: primary=adversarial robustness, secondary=certified defenses

Entity: researcher/hiroshi_mensah
  affiliation: Hebrew University
  publication_count: 61
  previous_employer: IBM Research (2015-2018)
  research_focus: primary=machine learning, secondary=active learning

Entity: researcher/oluwatoyin_lindberg
  affiliation: Technion
  publication_count: 33
  previous_employer: Waymo Research (2017-2020)
  research_focus: primary=autonomous driving, secondary=perception

Entity: researcher/malin_eze
  affiliation: Leiden University
  publication_count: 86
  previous_employer: Volkswagen AI (2018-2021)
  research_focus: primary=autonomous driving, secondary=safety

Entity: researcher/chukwuebuka_henriksen
  affiliation: University of Helsinki
  publication_count: 49
  previous_employer: Nokia Bell Labs (2016-2019)
  research_focus: primary=communications, secondary=distributed ML

Entity: researcher/sakura_balogun
  affiliation: Warsaw University of Technology
  publication_count: 65
  previous_employer: Samsung AI Center (2018-2021)
  research_focus: primary=speech recognition, secondary=Polish NLP

Entity: researcher/kwame_bergstrom
  affiliation: Ghent University
  publication_count: 41
  previous_employer: Amazon Science (2017-2020)
  research_focus: primary=natural language processing, secondary=summarization

Entity: researcher/naomi_otieno
  affiliation: University of Copenhagen
  publication_count: 58
  previous_employer: Maersk AI (2019-2022)
  research_focus: primary=logistics optimization, secondary=reinforcement learning

Entity: researcher/antonio_nwosu
  affiliation: Université Paris-Saclay
  publication_count: 77
  previous_employer: Thales AI (2016-2019)
  research_focus: primary=computer vision, secondary=defense applications

Entity: researcher/priya_adeyemi
  affiliation: Max Planck Institute for Intelligent Systems
  publication_count: 44
  previous_employer: Google Brain (2018-2021)
  research_focus: primary=generative models, secondary=disentangled representations

Entity: researcher/nkechi_tanaka
  affiliation: Vector Institute
  publication_count: 68
  previous_employer: DeepMind (2017-2020)
  research_focus: primary=reinforcement learning, secondary=safe RL

Entity: researcher/anders_mensah
  affiliation: Mila
  publication_count: 53
  previous_employer: Microsoft Research (2018-2021)
  research_focus: primary=natural language processing, secondary=dialogue

Entity: researcher/oluwaseun_lindstrom
  affiliation: Allen Institute for AI
  publication_count: 39
  previous_employer: Meta AI (2016-2019)
  research_focus: primary=commonsense reasoning, secondary=knowledge graphs

Entity: researcher/sophy_nakagawa
  affiliation: National University of Singapore
  publication_count: 72
  previous_employer: Grab AI (2018-2021)
  research_focus: primary=recommender systems, secondary=mobility prediction

Entity: researcher/chukwudi_lindgren
  affiliation: Nanyang Technological University
  publication_count: 45
  previous_employer: DBS AI (2019-2022)
  research_focus: primary=financial machine learning, secondary=fraud detection

Entity: researcher/seungmin_eriksson
  affiliation: KAIST
  publication_count: 67
  previous_employer: LG AI Research (2017-2020)
  research_focus: primary=computer vision, secondary=object detection

Entity: researcher/oluwatobi_lindqvist
  affiliation: Hong Kong University of Science and Technology
  publication_count: 34
  previous_employer: Huawei Noah Ark Lab (2018-2021)
  research_focus: primary=federated learning, secondary=privacy

Entity: researcher/giulia_okonkwo
  affiliation: Purdue University
  publication_count: 81
  previous_employer: IBM Research (2016-2019)
  research_focus: primary=machine learning, secondary=fairness

Entity: researcher/nina_nakamura
  affiliation: University of Michigan
  publication_count: 56
  previous_employer: Ford Research (2017-2020)
  research_focus: primary=human-robot interaction, secondary=autonomous systems

Entity: researcher/chidi_engstrom
  affiliation: UT Austin CS
  publication_count: 43
  previous_employer: NVIDIA Research (2019-2022)
  research_focus: primary=GPU computing, secondary=efficient deep learning

Entity: researcher/hana_obi
  affiliation: University of Washington
  publication_count: 69
  previous_employer: Microsoft Research (2015-2018)
  research_focus: primary=natural language processing, secondary=information extraction

Entity: researcher/emeka_tanaka
  affiliation: NYU CS
  publication_count: 38
  previous_employer: NYU Courant (2017-2020)
  research_focus: primary=machine learning, secondary=theory

Entity: researcher/soren_adeyemi
  affiliation: Princeton CS
  publication_count: 75
  previous_employer: Google Brain (2018-2021)
  research_focus: primary=optimization, secondary=distributed learning

Entity: researcher/adaeze_ostrowski
  affiliation: Yale CS
  publication_count: 48
  previous_employer: Goldman Sachs AI (2016-2019)
  research_focus: primary=financial machine learning, secondary=portfolio optimization

Entity: researcher/jiro_sorensen
  affiliation: Johns Hopkins CS
  publication_count: 62
  previous_employer: Genentech Computational Biology (2018-2021)
  research_focus: primary=medical imaging, secondary=pathology

Entity: researcher/fatou_nwosu
  affiliation: University of Edinburgh
  publication_count: 33
  previous_employer: Roche Informatics (2019-2022)
  research_focus: primary=computational biology, secondary=bioinformatics

Entity: researcher/oluwabimpe_lindstrom
  affiliation: University of Glasgow
  publication_count: 57
  previous_employer: Recursion Pharmaceuticals (2017-2020)
  research_focus: primary=drug discovery, secondary=high-throughput screening

Entity: researcher/yuka_mensah
  affiliation: University of Bristol
  publication_count: 44
  previous_employer: GSK AI (2018-2021)
  research_focus: primary=computational biology, secondary=target identification

Entity: researcher/chibueze_lindqvist
  affiliation: Aalborg University
  publication_count: 76
  previous_employer: Novartis AI (2015-2018)
  research_focus: primary=drug discovery, secondary=ADMET prediction

Entity: researcher/katrin_osei
  affiliation: Delft University of Technology
  publication_count: 39
  previous_employer: Booking.com AI (2017-2020)
  research_focus: primary=recommender systems, secondary=natural language processing

Entity: researcher/obinna_johansson
  affiliation: University of Zurich
  publication_count: 63
  previous_employer: ABB Research (2018-2021)
  research_focus: primary=robotics, secondary=industrial automation

Entity: researcher/ryo_mensah
  affiliation: MIT CSAIL
  publication_count: 54
  previous_employer: Toyota Research Institute (2016-2019)
  research_focus: primary=autonomous driving, secondary=prediction

Entity: researcher/alinta_okafor
  affiliation: Stanford AI Lab
  publication_count: 71
  previous_employer: Tesla AI (2018-2021)
  research_focus: primary=autonomous driving, secondary=computer vision

Entity: researcher/joachim_nwosu
  affiliation: Carnegie Mellon SCS
  publication_count: 37
  previous_employer: Uber AI (2017-2020)
  research_focus: primary=machine learning, secondary=transportation

Entity: researcher/efua_lindstrom
  affiliation: UC Berkeley EECS
  publication_count: 85
  previous_employer: Lyft AI (2019-2022)
  research_focus: primary=reinforcement learning, secondary=ride sharing optimization

Entity: researcher/soren_kimura
  affiliation: Oxford CS
  publication_count: 42
  previous_employer: DeepMind (2016-2019)
  research_focus: primary=game playing, secondary=reinforcement learning

Entity: researcher/naomi_watanabe
  affiliation: Cambridge AI
  publication_count: 58
  previous_employer: Google Brain (2018-2021)
  research_focus: primary=natural language processing, secondary=language grounding

Entity: researcher/tariq_lindstrom
  affiliation: ETH Zurich
  publication_count: 67
  previous_employer: Microsoft Research (2015-2018)
  research_focus: primary=distributed systems, secondary=distributed ML

Entity: researcher/oluwakayode_berg
  affiliation: EPFL
  publication_count: 35
  previous_employer: CERN ML (2017-2020)
  research_focus: primary=physics-informed ML, secondary=scientific computing

Entity: researcher/haruki_adeyemi
  affiliation: TU Berlin
  publication_count: 79
  previous_employer: Volkswagen AI (2018-2021)
  research_focus: primary=autonomous driving, secondary=end-to-end learning

Entity: researcher/chiamaka_lindgren
  affiliation: University of Toronto
  publication_count: 46
  previous_employer: Rogers AI (2019-2022)
  research_focus: primary=natural language processing, secondary=telecommunication

Entity: researcher/nikolai_osei
  affiliation: University of Amsterdam
  publication_count: 61
  previous_employer: Booking.com AI (2017-2020)
  research_focus: primary=recommender systems, secondary=travel recommendation

Entity: researcher/oluwafunmilayo_lindahl
  affiliation: KU Leuven
  publication_count: 43
  previous_employer: IMEC Research (2018-2021)
  research_focus: primary=hardware-aware ML, secondary=efficient deep learning

Entity: researcher/hyunjin_pettersson
  affiliation: Peking University
  publication_count: 78
  previous_employer: Baidu Research (2015-2018)
  research_focus: primary=search, secondary=information retrieval

Entity: researcher/chioma_bjornsen
  affiliation: Tsinghua CS
  publication_count: 54
  previous_employer: Tencent AI Lab (2017-2020)
  research_focus: primary=game AI, secondary=reinforcement learning

Entity: researcher/rasmus_nakamura
  affiliation: University of Tokyo
  publication_count: 33
  previous_employer: Sony AI (2018-2021)
  research_focus: primary=music generation, secondary=audio processing

Entity: researcher/adaeze_erikssen
  affiliation: Seoul National University
  publication_count: 70
  previous_employer: Kakao AI (2016-2019)
  research_focus: primary=Korean NLP, secondary=machine translation

Entity: researcher/bogdan_krishnan
  affiliation: IIT Bombay
  publication_count: 47
  previous_employer: Flipkart AI (2018-2021)
  research_focus: primary=recommender systems, secondary=e-commerce

Entity: researcher/amara_lindstrom
  affiliation: University of Cape Town
  publication_count: 66
  previous_employer: Discovery AI (2017-2020)
  research_focus: primary=insurance AI, secondary=risk modeling

Entity: researcher/fumiko_osei
  affiliation: Universidade de São Paulo
  publication_count: 39
  previous_employer: Nubank AI (2019-2022)
  research_focus: primary=financial machine learning, secondary=credit scoring

Entity: researcher/leon_adeyemi
  affiliation: Tel Aviv University
  publication_count: 52
  previous_employer: Checkpoint AI (2017-2020)
  research_focus: primary=cybersecurity, secondary=adversarial attacks

Entity: researcher/oluwafemi_tanaka
  affiliation: Hebrew University
  publication_count: 74
  previous_employer: Rafael AI (2018-2021)
  research_focus: primary=computer vision, secondary=defense imaging

Entity: researcher/kristoffer_okonkwo
  affiliation: Technion
  publication_count: 44
  previous_employer: Intel Labs (2015-2018)
  research_focus: primary=efficient deep learning, secondary=chip design

Entity: researcher/yuna_pettersson
  affiliation: Leiden University
  publication_count: 67
  previous_employer: ASML Research (2017-2020)
  research_focus: primary=semiconductor inspection, secondary=computer vision

Entity: researcher/oluwakemi_gronqvist
  affiliation: University of Helsinki
  publication_count: 35
  previous_employer: Nokia Bell Labs (2018-2021)
  research_focus: primary=network optimization, secondary=reinforcement learning

Entity: researcher/daichi_mensah
  affiliation: Warsaw University of Technology
  publication_count: 81
  previous_employer: Samsung AI Center (2016-2019)
  research_focus: primary=signal processing, secondary=efficient deep learning

Entity: researcher/amira_lindqvist
  affiliation: Ghent University
  publication_count: 48
  previous_employer: IMEC Research (2018-2021)
  research_focus: primary=neuromorphic computing, secondary=hardware-aware ML

Entity: researcher/emre_osei
  affiliation: University of Copenhagen
  publication_count: 57
  previous_employer: Maersk AI (2017-2020)
  research_focus: primary=supply chain optimization, secondary=ML

Entity: researcher/chidinma_lindberg
  affiliation: Université Paris-Saclay
  publication_count: 73
  previous_employer: Dassault Systèmes AI (2018-2021)
  research_focus: primary=simulation, secondary=scientific ML

Entity: researcher/yuya_adeyemi
  affiliation: Max Planck Institute for Intelligent Systems
  publication_count: 41
  previous_employer: Google Brain (2016-2019)
  research_focus: primary=representation learning, secondary=self-supervised learning

Entity: researcher/oluwaseun_tanaka
  affiliation: Vector Institute
  publication_count: 65
  previous_employer: Shopify AI (2019-2022)
  research_focus: primary=e-commerce, secondary=recommender systems

Entity: researcher/sigrid_okonkwo
  affiliation: Mila
  publication_count: 38
  previous_employer: Desjardins AI (2017-2020)
  research_focus: primary=financial machine learning, secondary=fraud detection

Entity: researcher/oluwabunmi_tanaka
  affiliation: Allen Institute for AI
  publication_count: 76
  previous_employer: Microsoft Research (2018-2021)
  research_focus: primary=biomedical NLP, secondary=knowledge extraction

Entity: researcher/kenta_nwosu
  affiliation: National University of Singapore
  publication_count: 52
  previous_employer: Sea AI Lab (2016-2019)
  research_focus: primary=computer vision, secondary=Southeast Asian language NLP

Entity: researcher/chibueze_oberg
  affiliation: Nanyang Technological University
  publication_count: 43
  previous_employer: Grab AI (2018-2021)
  research_focus: primary=mobility AI, secondary=time series forecasting

Entity: researcher/sung_jun_lindstrom
  affiliation: KAIST
  publication_count: 69
  previous_employer: SK Telecom AI (2017-2020)
  research_focus: primary=telecommunications, secondary=network ML

Entity: researcher/oluwatoyin_henriksen
  affiliation: Hong Kong University of Science and Technology
  publication_count: 34
  previous_employer: HSBC AI (2019-2022)
  research_focus: primary=financial machine learning, secondary=risk management

Entity: researcher/astrid_obi
  affiliation: Purdue University
  publication_count: 88
  previous_employer: Caterpillar AI (2016-2019)
  research_focus: primary=industrial ML, secondary=predictive maintenance

Entity: researcher/mikael_eze
  affiliation: University of Michigan
  publication_count: 47
  previous_employer: General Motors AI (2018-2021)
  research_focus: primary=autonomous driving, secondary=simulation

Entity: researcher/oluwatobi_pettersson
  affiliation: UT Austin CS
  publication_count: 60
  previous_employer: Dell AI (2017-2020)
  research_focus: primary=systems ML, secondary=distributed computing

Entity: researcher/kazuya_mensah
  affiliation: University of Washington
  publication_count: 36
  previous_employer: Amazon Science (2019-2022)
  research_focus: primary=natural language processing, secondary=Alexa research

Entity: researcher/oluwakayode_johansson
  affiliation: NYU CS
  publication_count: 72
  previous_employer: Bloomberg AI (2015-2018)
  research_focus: primary=NLP for finance, secondary=information extraction

Entity: researcher/chidera_lindstrom
  affiliation: Princeton CS
  publication_count: 49
  previous_employer: Two Sigma AI (2017-2020)
  research_focus: primary=quantitative finance, secondary=ML

Entity: researcher/fumiya_osei
  affiliation: Yale CS
  publication_count: 63
  previous_employer: AQR Capital AI (2018-2021)
  research_focus: primary=financial ML, secondary=factor investing

Entity: researcher/oluwafunmilayo_voss
  affiliation: Johns Hopkins CS
  publication_count: 37
  previous_employer: Genentech Computational Biology (2016-2019)
  research_focus: primary=bioinformatics, secondary=genomics

Entity: researcher/nkechi_lindstrom
  affiliation: University of Edinburgh
  publication_count: 55
  previous_employer: AstraZeneca AI (2018-2021)
  research_focus: primary=drug discovery, secondary=molecular ML

Entity: researcher/hirotaka_balogun
  affiliation: University of Glasgow
  publication_count: 42
  previous_employer: GSK AI (2017-2020)
  research_focus: primary=computational biology, secondary=drug repurposing

Entity: researcher/oluwabimpe_tanaka
  affiliation: University of Bristol
  publication_count: 77
  previous_employer: UCB AI (2018-2021)
  research_focus: primary=immunology AI, secondary=drug discovery

Entity: researcher/emeka_ostrowski
  affiliation: Aalborg University
  publication_count: 46
  previous_employer: Vestas AI (2016-2019)
  research_focus: primary=wind energy, secondary=time series forecasting

Entity: researcher/hana_lindqvist
  affiliation: Delft University of Technology
  publication_count: 61
  previous_employer: Shell AI (2018-2021)
  research_focus: primary=energy optimization, secondary=reinforcement learning

Entity: researcher/chiamaka_nakagawa
  affiliation: University of Zurich
  publication_count: 38
  previous_employer: UBS AI (2017-2020)
  research_focus: primary=financial ML, secondary=risk assessment

Entity: researcher/riku_adeyemi
  affiliation: MIT CSAIL
  publication_count: 74
  previous_employer: Google Brain (2018-2021)
  research_focus: primary=language models, secondary=few-shot learning

Entity: researcher/chidinma_mensah
  affiliation: Stanford AI Lab
  publication_count: 53
  previous_employer: OpenAI (2019-2022)
  research_focus: primary=alignment, secondary=RLHF

Entity: researcher/felix_okonkwo
  affiliation: Carnegie Mellon SCS
  publication_count: 44
  previous_employer: DeepMind (2017-2020)
  research_focus: primary=multi-agent RL, secondary=game theory

Entity: researcher/naomi_kimura
  affiliation: UC Berkeley EECS
  publication_count: 66
  previous_employer: Meta AI (2018-2021)
  research_focus: primary=computer vision, secondary=AR/VR

Entity: researcher/chukwudi_johansson
  affiliation: Oxford CS
  publication_count: 39
  previous_employer: Amazon Science (2016-2019)
  research_focus: primary=NLP, secondary=product search

Entity: researcher/sigrid_yamamoto
  affiliation: Cambridge AI
  publication_count: 78
  previous_employer: ARM AI (2018-2021)
  research_focus: primary=hardware ML, secondary=embedded systems

Entity: researcher/adaobi_lindstrom
  affiliation: ETH Zurich
  publication_count: 47
  previous_employer: ABB Research (2017-2020)
  research_focus: primary=robotics, secondary=motion planning

Entity: researcher/soren_osei
  affiliation: EPFL
  publication_count: 60
  previous_employer: Nestlé AI (2019-2022)
  research_focus: primary=food science ML, secondary=supply chain

Entity: researcher/yuriko_adeyemi
  affiliation: TU Berlin
  publication_count: 33
  previous_employer: Siemens AI (2016-2019)
  research_focus: primary=industrial automation, secondary=predictive maintenance

Entity: researcher/oluwakemi_tanaka
  affiliation: University of Toronto
  publication_count: 85
  previous_employer: RBC AI (2018-2021)
  research_focus: primary=financial ML, secondary=credit risk

Entity: researcher/nicholas_obi
  affiliation: University of Amsterdam
  publication_count: 52
  previous_employer: Adyen AI (2017-2020)
  research_focus: primary=payment fraud detection, secondary=ML

Entity: researcher/chukwuebuka_pettersson
  affiliation: KU Leuven
  publication_count: 41
  previous_employer: IMEC Research (2019-2022)
  research_focus: primary=nanoelectronics ML, secondary=materials science

Entity: researcher/sakura_okonkwo
  affiliation: Peking University
  publication_count: 68
  previous_employer: Huawei Noah Ark Lab (2016-2019)
  research_focus: primary=NLP, secondary=Chinese language models

Entity: researcher/adebayo_lindahl
  affiliation: Tsinghua CS
  publication_count: 75
  previous_employer: Alibaba DAMO Academy (2018-2021)
  research_focus: primary=computer vision, secondary=image recognition

Entity: researcher/ryo_osei
  affiliation: University of Tokyo
  publication_count: 44
  previous_employer: NTT Research (2017-2020)
  research_focus: primary=quantum computing, secondary=quantum ML

Entity: researcher/christel_eze
  affiliation: Seoul National University
  publication_count: 57
  previous_employer: NAVER AI (2018-2021)
  research_focus: primary=NLP, secondary=search

Entity: researcher/kwabena_tanaka
  affiliation: IIT Bombay
  publication_count: 36
  previous_employer: Infosys AI (2016-2019)
  research_focus: primary=machine learning, secondary=software engineering

Entity: researcher/oluwafunke_lindstrom
  affiliation: University of Cape Town
  publication_count: 79
  previous_employer: MTN AI (2018-2021)
  research_focus: primary=telecommunications ML, secondary=network optimization

Entity: researcher/jiro_mensah
  affiliation: Universidade de São Paulo
  publication_count: 43
  previous_employer: Embraer AI (2017-2020)
  research_focus: primary=aerospace ML, secondary=predictive maintenance

Entity: researcher/nneka_watanabe
  affiliation: Tel Aviv University
  publication_count: 65
  previous_employer: IDF Technology (2018-2021)
  research_focus: primary=computer vision, secondary=defense systems

Entity: researcher/bjoern_adeyemi
  affiliation: Hebrew University
  publication_count: 38
  previous_employer: Check Point AI (2016-2019)
  research_focus: primary=cybersecurity ML, secondary=threat detection

Entity: researcher/chiamaka_ostrowski
  affiliation: Technion
  publication_count: 72
  previous_employer: Elbit Systems AI (2018-2021)
  research_focus: primary=computer vision, secondary=UAV systems

Entity: researcher/haruto_mensah
  affiliation: Leiden University
  publication_count: 54
  previous_employer: ASML Research (2017-2020)
  research_focus: primary=lithography ML, secondary=defect detection

Entity: researcher/adaeze_gronqvist
  affiliation: University of Helsinki
  publication_count: 41
  previous_employer: Nokia Bell Labs (2019-2022)
  research_focus: primary=5G networks, secondary=resource allocation ML

Entity: researcher/kweku_nakamura
  affiliation: Warsaw University of Technology
  publication_count: 67
  previous_employer: CD Projekt AI (2016-2019)
  research_focus: primary=game AI, secondary=procedural generation

Entity: researcher/oluwasegun_lindstrom
  affiliation: Ghent University
  publication_count: 45
  previous_employer: UCB AI (2018-2021)
  research_focus: primary=pharma ML, secondary=clinical trials

Entity: researcher/yuki_okonkwo
  affiliation: University of Copenhagen
  publication_count: 58
  previous_employer: Novo Nordisk AI (2017-2020)
  research_focus: primary=diabetes ML, secondary=personalized medicine

Entity: researcher/adeola_lindqvist
  affiliation: Université Paris-Saclay
  publication_count: 82
  previous_employer: Sanofi AI (2018-2021)
  research_focus: primary=drug discovery, secondary=target identification

Entity: researcher/tobias_mensah
  affiliation: Max Planck Institute for Intelligent Systems
  publication_count: 37
  previous_employer: Merck AI (2016-2019)
  research_focus: primary=molecular ML, secondary=drug design

Entity: researcher/chibuike_oberg
  affiliation: Vector Institute
  publication_count: 71
  previous_employer: Borealis AI (2018-2021)
  research_focus: primary=financial ML, secondary=risk modeling

Entity: researcher/fumika_adeyemi
  affiliation: Mila
  publication_count: 48
  previous_employer: Intact AI (2017-2020)
  research_focus: primary=insurance ML, secondary=NLP

Entity: researcher/obafemi_tanaka
  affiliation: Allen Institute for AI
  publication_count: 63
  previous_employer: Microsoft Research (2019-2022)
  research_focus: primary=scientific NLP, secondary=knowledge extraction

Entity: researcher/kenta_osei
  affiliation: National University of Singapore
  publication_count: 39
  previous_employer: ST Engineering AI (2016-2019)
  research_focus: primary=aerospace ML, secondary=maintenance prediction

Entity: researcher/oluwakayode_voss
  affiliation: Nanyang Technological University
  publication_count: 76
  previous_employer: Sembcorp AI (2018-2021)
  research_focus: primary=energy ML, secondary=grid optimization

Entity: researcher/daichi_lindqvist
  affiliation: KAIST
  publication_count: 52
  previous_employer: Hyundai AI (2017-2020)
  research_focus: primary=autonomous driving, secondary=perception

Entity: researcher/chiamaka_lindahl
  affiliation: Hong Kong University of Science and Technology
  publication_count: 44
  previous_employer: Cathay Pacific AI (2018-2021)
  research_focus: primary=operations research, secondary=ML

Entity: researcher/nikolai_obi
  affiliation: Purdue University
  publication_count: 68
  previous_employer: Cummins AI (2016-2019)
  research_focus: primary=industrial ML, secondary=engine optimization

Entity: researcher/bjoern_kimura
  affiliation: University of Michigan
  publication_count: 35
  previous_employer: Whirlpool AI (2018-2021)
  research_focus: primary=IoT ML, secondary=smart appliances

Entity: researcher/adeola_okonkwo
  affiliation: UT Austin CS
  publication_count: 79
  previous_employer: Apple Machine Learning Research (2016-2019)
  research_focus: primary=on-device ML, secondary=privacy

Entity: researcher/fumio_mensah
  affiliation: University of Washington
  publication_count: 46
  previous_employer: Microsoft Research (2018-2021)
  research_focus: primary=human-computer interaction, secondary=ML

Entity: researcher/chidinma_okafor
  affiliation: NYU CS
  publication_count: 61
  previous_employer: Citigroup AI (2017-2020)
  research_focus: primary=financial ML, secondary=algorithmic trading

Entity: researcher/yngve_adeyemi
  affiliation: Princeton CS
  publication_count: 33
  previous_employer: Morgan Stanley AI (2019-2022)
  research_focus: primary=quantitative finance, secondary=ML

Entity: researcher/afolabi_lindstrom
  affiliation: Yale CS
  publication_count: 74
  previous_employer: Bridgewater AI (2015-2018)
  research_focus: primary=macro finance ML, secondary=prediction

Entity: researcher/sakura_mensah
  affiliation: Johns Hopkins CS
  publication_count: 49
  previous_employer: Becton Dickinson AI (2018-2021)
  research_focus: primary=medical devices ML, secondary=diagnostic imaging

Entity: researcher/per_osei
  affiliation: University of Edinburgh
  publication_count: 66
  previous_employer: GSK AI (2017-2020)
  research_focus: primary=genomics ML, secondary=drug target identification

Entity: researcher/adaeze_kimura
  affiliation: University of Glasgow
  publication_count: 41
  previous_employer: Pfizer AI (2018-2021)
  research_focus: primary=clinical trial AI, secondary=patient stratification

Entity: researcher/soren_nwosu
  affiliation: University of Bristol
  publication_count: 78
  previous_employer: AZ AI (2016-2019)
  research_focus: primary=oncology AI, secondary=biomarker discovery

Entity: researcher/oluwafemi_ostrowski
  affiliation: Aalborg University
  publication_count: 55
  previous_employer: Vestas AI (2018-2021)
  research_focus: primary=wind turbine ML, secondary=condition monitoring

Entity: researcher/yuriko_mensah
  affiliation: Delft University of Technology
  publication_count: 43
  previous_employer: Philips AI (2017-2020)
  research_focus: primary=medical imaging, secondary=ultrasound AI

Entity: researcher/chukwuemeka_tanaka
  affiliation: University of Zurich
  publication_count: 69
  previous_employer: Roche Informatics (2018-2021)
  research_focus: primary=digital pathology, secondary=computer vision

Entity: researcher/takumi_mensah
  affiliation: MIT CSAIL
  publication_count: 38
  previous_employer: Broad Institute AI (2016-2019)
  research_focus: primary=genomics ML, secondary=single-cell analysis

Entity: researcher/adaora_okonkwo
  affiliation: Stanford AI Lab
  publication_count: 82
  previous_employer: Chan Zuckerberg AI (2018-2021)
  research_focus: primary=biomedical AI, secondary=cell biology

Entity: researcher/fumiko_lindstrom
  affiliation: Carnegie Mellon SCS
  publication_count: 47
  previous_employer: Carnegie Mellon School of Medicine (2019-2022)
  research_focus: primary=clinical NLP, secondary=EHR analysis

Entity: researcher/obinna_osei
  affiliation: UC Berkeley EECS
  publication_count: 63
  previous_employer: UCSF Bakar Institute (2016-2019)
  research_focus: primary=medical imaging, secondary=clinical decision support

Entity: researcher/hana_adeyemi
  affiliation: Oxford CS
  publication_count: 35
  previous_employer: Oxford University Hospitals AI (2018-2021)
  research_focus: primary=clinical AI, secondary=radiology

Entity: researcher/ekundayo_tanaka
  affiliation: Cambridge AI
  publication_count: 77
  previous_employer: Cambridge University Hospitals AI (2017-2020)
  research_focus: primary=clinical NLP, secondary=patient records

Entity: researcher/adaeze_pettersson
  affiliation: ETH Zurich
  publication_count: 52
  previous_employer: University Hospital Zurich AI (2018-2021)
  research_focus: primary=medical informatics, secondary=decision support

Entity: researcher/yuki_nwosu
  affiliation: EPFL
  publication_count: 44
  previous_employer: CHUV AI (2016-2019)
  research_focus: primary=clinical imaging AI, secondary=neurology

Entity: researcher/chibueze_mensah
  affiliation: TU Berlin
  publication_count: 68
  previous_employer: Charité AI (2018-2021)
  research_focus: primary=medical NLP, secondary=German health records

Entity: researcher/ingeborg_adeyemi
  affiliation: University of Toronto
  publication_count: 39
  previous_employer: Toronto General AI (2017-2020)
  research_focus: primary=ICU prediction, secondary=time series

Entity: researcher/rasmus_okonkwo
  affiliation: University of Amsterdam
  publication_count: 75
  previous_employer: AMC AI (2019-2022)
  research_focus: primary=radiology AI, secondary=computer vision

Entity: researcher/naomi_ostrowski
  affiliation: KU Leuven
  publication_count: 48
  previous_employer: KU Leuven Hospital AI (2016-2019)
  research_focus: primary=clinical decision support, secondary=biostatistics

Entity: researcher/emre_lindqvist
  affiliation: Peking University
  publication_count: 61
  previous_employer: Peking Union Hospital AI (2018-2021)
  research_focus: primary=Chinese health NLP, secondary=clinical AI

Entity: researcher/chioma_oberg
  affiliation: Tsinghua CS
  publication_count: 33
  previous_employer: Tsinghua Hospital AI (2017-2020)
  research_focus: primary=medical image analysis, secondary=AI diagnostics

Entity: researcher/oluwabunmi_okonkwo
  affiliation: University of Tokyo
  publication_count: 87
  previous_employer: University of Tokyo Hospital AI (2018-2021)
  research_focus: primary=Japanese clinical NLP, secondary=EHR analysis

Entity: researcher/magdalena_osei
  affiliation: Seoul National University
  publication_count: 54
  previous_employer: Seoul National University Hospital AI (2016-2019)
  research_focus: primary=clinical AI, secondary=Korean health records

Entity: researcher/oluseun_lindstrom
  affiliation: IIT Bombay
  publication_count: 42
  previous_employer: AIIMS AI (2018-2021)
  research_focus: primary=Indian health informatics, secondary=clinical NLP

Entity: researcher/fatou_okonkwo
  affiliation: University of Cape Town
  publication_count: 66
  previous_employer: Groote Schuur Hospital AI (2017-2020)
  research_focus: primary=African health AI, secondary=medical imaging

Entity: researcher/adekunle_lindstrom
  affiliation: Universidade de São Paulo
  publication_count: 79
  previous_employer: Hospital das Clínicas AI (2018-2021)
  research_focus: primary=Brazilian clinical AI, secondary=EHR analysis

Entity: researcher/hiro_adeyemi
  affiliation: Tel Aviv University
  publication_count: 45
  previous_employer: Sheba Medical Center AI (2016-2019)
  research_focus: primary=clinical informatics, secondary=prediction models

Entity: researcher/nkechi_okafor
  affiliation: Hebrew University
  publication_count: 72
  previous_employer: Hadassah AI (2018-2021)
  research_focus: primary=medical imaging, secondary=oncology AI

Entity: researcher/kofi_lindstrom
  affiliation: Technion
  publication_count: 37
  previous_employer: Rambam AI (2017-2020)
  research_focus: primary=clinical NLP, secondary=health informatics

Entity: researcher/sakura_oberg
  affiliation: Leiden University
  publication_count: 58
  previous_employer: Leiden University Medical Center AI (2018-2021)
  research_focus: primary=oncology imaging AI, secondary=radiomics

Entity: researcher/obafemi_lindahl
  affiliation: University of Helsinki
  publication_count: 43
  previous_employer: HUS AI (2016-2019)
  research_focus: primary=Finnish health informatics, secondary=EHR ML

Entity: researcher/chidera_ostrowski
  affiliation: Warsaw University of Technology
  publication_count: 76
  previous_employer: Warsaw Medical University AI (2018-2021)
  research_focus: primary=Polish clinical AI, secondary=NLP

Entity: researcher/oluwatobi_berg
  affiliation: Ghent University
  publication_count: 52
  previous_employer: Ghent University Hospital AI (2017-2020)
  research_focus: primary=clinical decision support, secondary=ML

Entity: researcher/yuki_ostrowski
  affiliation: University of Copenhagen
  publication_count: 41
  previous_employer: Rigshospitalet AI (2019-2022)
  research_focus: primary=cardiology AI, secondary=ECG analysis

Entity: researcher/adaeze_lindahl
  affiliation: Université Paris-Saclay
  publication_count: 65
  previous_employer: AP-HP AI (2016-2019)
  research_focus: primary=French clinical NLP, secondary=clinical coding

Entity: researcher/takumi_okonkwo
  affiliation: Max Planck Institute for Intelligent Systems
  publication_count: 38
  previous_employer: Max Planck Institute for Biology of Ageing (2018-2021)
  research_focus: primary=aging biology ML, secondary=longevity research

Entity: researcher/oluwafemi_lindqvist
  affiliation: Vector Institute
  publication_count: 73
  previous_employer: Sunnybrook AI (2017-2020)
  research_focus: primary=medical imaging, secondary=MRI analysis

Entity: researcher/chidinma_voss
  affiliation: Mila
  publication_count: 46
  previous_employer: Centre hospitalier de l'Université de Montréal AI (2018-2021)
  research_focus: primary=clinical AI, secondary=French health NLP

Entity: researcher/seun_adeyemi
  affiliation: Allen Institute for AI
  publication_count: 61
  previous_employer: Allen Institute for Brain Science (2016-2019)
  research_focus: primary=neuroscience ML, secondary=brain mapping

Entity: researcher/kwabena_osei
  affiliation: National University of Singapore
  publication_count: 35
  previous_employer: Singapore General Hospital AI (2018-2021)
  research_focus: primary=clinical AI, secondary=Asian health informatics

Entity: researcher/oluwabimpe_berg
  affiliation: Nanyang Technological University
  publication_count: 78
  previous_employer: Tan Tock Seng Hospital AI (2017-2020)
  research_focus: primary=infectious disease ML, secondary=pandemic modeling

Entity: researcher/jiro_adeyemi
  affiliation: KAIST
  publication_count: 54
  previous_employer: Samsung Medical Center AI (2018-2021)
  research_focus: primary=medical AI, secondary=Korean EHR

Entity: researcher/chiamaka_tanaka
  affiliation: Hong Kong University of Science and Technology
  publication_count: 42
  previous_employer: Queen Mary Hospital AI (2016-2019)
  research_focus: primary=clinical NLP, secondary=Cantonese health records

Entity: researcher/fumika_osei
  affiliation: Purdue University
  publication_count: 67
  previous_employer: Eli Lilly AI (2018-2021)
  research_focus: primary=drug discovery ML, secondary=clinical biomarkers

Entity: researcher/nikolai_adeyemi
  affiliation: University of Michigan
  publication_count: 39
  previous_employer: University of Michigan Hospital AI (2017-2020)
  research_focus: primary=clinical informatics, secondary=EHR analysis

Entity: researcher/rashida_lindstrom
  affiliation: UT Austin CS
  publication_count: 82
  previous_employer: Dell Medical School AI (2018-2021)
  research_focus: primary=medical imaging, secondary=clinical AI

Entity: researcher/oluwakemi_oberg
  affiliation: University of Washington
  publication_count: 55
  previous_employer: UW Medicine AI (2016-2019)
  research_focus: primary=clinical AI, secondary=precision medicine

Entity: researcher/haruki_osei
  affiliation: NYU CS
  publication_count: 43
  previous_employer: NYU Langone AI (2018-2021)
  research_focus: primary=clinical NLP, secondary=EHR coding

Entity: researcher/adekunle_tanaka
  affiliation: Princeton CS
  publication_count: 70
  previous_employer: Princeton Health AI (2017-2020)
  research_focus: primary=computational epidemiology, secondary=ML

Entity: researcher/adaeze_ostrowski
  affiliation: Yale CS
  publication_count: 47
  previous_employer: Yale Medicine AI (2019-2022)
  research_focus: primary=clinical AI, secondary=imaging

Entity: researcher/zara_adeyemi
  affiliation: Johns Hopkins CS
  publication_count: 63
  previous_employer: Johns Hopkins Medicine AI (2015-2018)
  research_focus: primary=clinical NLP, secondary=patient safety

Entity: researcher/chukwudi_osei
  affiliation: University of Edinburgh
  publication_count: 35
  previous_employer: Edinburgh BioQuarter AI (2017-2020)
  research_focus: primary=precision medicine, secondary=genomics

Entity: researcher/sigrid_tanaka
  affiliation: University of Glasgow
  publication_count: 76
  previous_employer: NHS Greater Glasgow AI (2018-2021)
  research_focus: primary=population health ML, secondary=disease prediction

Entity: researcher/oluwaseun_okafor
  affiliation: University of Bristol
  publication_count: 51
  previous_employer: Southmead Hospital AI (2016-2019)
  research_focus: primary=surgical AI, secondary=outcome prediction

Entity: researcher/fumio_okonkwo
  affiliation: Aalborg University
  publication_count: 44
  previous_employer: Aalborg University Hospital AI (2018-2021)
  research_focus: primary=Danish health informatics, secondary=registry ML

Entity: researcher/chibuike_lindstrom
  affiliation: Delft University of Technology
  publication_count: 68
  previous_employer: Erasmus MC AI (2017-2020)
  research_focus: primary=radiology AI, secondary=deep learning

Entity: researcher/yuki_berg
  affiliation: University of Zurich
  publication_count: 37
  previous_employer: University Hospital Zurich Imaging AI (2018-2021)
  research_focus: primary=brain imaging AI, secondary=neuroimaging

Entity: researcher/oluwafunmilayo_osei
  affiliation: MIT CSAIL
  publication_count: 72
  previous_employer: MIT Lincoln Laboratory (2016-2019)
  research_focus: primary=radar ML, secondary=signal processing

Entity: researcher/adaeze_johansson
  affiliation: Stanford AI Lab
  publication_count: 48
  previous_employer: SLAC National Accelerator AI (2018-2021)
  research_focus: primary=physics ML, secondary=particle detection

Entity: researcher/haruto_okonkwo
  affiliation: Carnegie Mellon SCS
  publication_count: 61
  previous_employer: Software Engineering Institute AI (2017-2020)
  research_focus: primary=software security ML, secondary=code analysis

Entity: researcher/oluwabunmi_lindstrom
  affiliation: UC Berkeley EECS
  publication_count: 39
  previous_employer: Lawrence Berkeley National Lab AI (2018-2021)
  research_focus: primary=scientific ML, secondary=climate modeling

Entity: researcher/sakura_lindstrom
  affiliation: Oxford CS
  publication_count: 83
  previous_employer: UKAEA AI (2016-2019)
  research_focus: primary=nuclear fusion ML, secondary=plasma control

Entity: researcher/chidinma_adeyemi
  affiliation: Cambridge AI
  publication_count: 56
  previous_employer: MRC Laboratory of Molecular Biology AI (2018-2021)
  research_focus: primary=structural biology ML, secondary=protein design

Entity: researcher/per_lindstrom
  affiliation: ETH Zurich
  publication_count: 43
  previous_employer: Paul Scherrer Institute AI (2017-2020)
  research_focus: primary=materials ML, secondary=synchrotron data

Entity: researcher/ekundayo_osei
  affiliation: EPFL
  publication_count: 67
  previous_employer: CERN ML Group (2018-2021)
  research_focus: primary=high energy physics ML, secondary=event classification

Entity: researcher/chioma_lindstrom
  affiliation: TU Berlin
  publication_count: 34
  previous_employer: DLR AI (2016-2019)
  research_focus: primary=aerospace ML, secondary=earth observation

Entity: researcher/kweku_pettersson
  affiliation: University of Toronto
  publication_count: 77
  previous_employer: Environment Canada AI (2018-2021)
  research_focus: primary=climate ML, secondary=weather forecasting

Entity: researcher/oluwatobi_osei
  affiliation: University of Amsterdam
  publication_count: 53
  previous_employer: KNMI AI (2017-2020)
  research_focus: primary=meteorology ML, secondary=precipitation forecasting

Entity: researcher/fumika_lindstrom
  affiliation: KU Leuven
  publication_count: 42
  previous_employer: European Centre for Medium-Range Weather Forecasts AI (2018-2021)
  research_focus: primary=numerical weather prediction ML, secondary=ensemble methods

Entity: researcher/adaeze_mensah
  affiliation: Peking University
  publication_count: 65
  previous_employer: China Meteorological Administration AI (2016-2019)
  research_focus: primary=climate prediction ML, secondary=extreme weather

Entity: researcher/riku_okonkwo
  affiliation: Tsinghua CS
  publication_count: 38
  previous_employer: Tsinghua Climate AI (2018-2021)
  research_focus: primary=carbon emission ML, secondary=energy modeling

Entity: researcher/sigrid_voss
  affiliation: University of Tokyo
  publication_count: 74
  previous_employer: Japan Meteorological Agency AI (2017-2020)
  research_focus: primary=typhoon prediction ML, secondary=satellite analysis

Entity: researcher/oluwafemi_okafor
  affiliation: Seoul National University
  publication_count: 46
  previous_employer: Korea Meteorological Administration AI (2018-2021)
  research_focus: primary=East Asian weather ML, secondary=monsoon prediction

Entity: researcher/haruki_lindstrom
  affiliation: IIT Bombay
  publication_count: 61
  previous_employer: Indian Meteorological Department AI (2016-2019)
  research_focus: primary=Indian monsoon ML, secondary=flood prediction

Entity: researcher/chiamaka_okafor
  affiliation: University of Cape Town
  publication_count: 33
  previous_employer: South African Weather Service AI (2018-2021)
  research_focus: primary=African climate ML, secondary=drought prediction

Entity: researcher/adeola_osei
  affiliation: Universidade de São Paulo
  publication_count: 79
  previous_employer: INPE AI (2017-2020)
  research_focus: primary=Amazon monitoring ML, secondary=deforestation detection

Entity: researcher/fumiko_tanaka
  affiliation: Tel Aviv University
  publication_count: 55
  previous_employer: Hebrew University Earth Sciences AI (2018-2021)
  research_focus: primary=Dead Sea environment ML, secondary=earth observation

Entity: researcher/oluwaseun_berg
  affiliation: Hebrew University
  publication_count: 43
  previous_employer: Weizmann Institute Climate AI (2016-2019)
  research_focus: primary=Middle East climate ML, secondary=desertification

Entity: researcher/kenta_mensah
  affiliation: Technion
  publication_count: 67
  previous_employer: Israel Oceanographic AI (2018-2021)
  research_focus: primary=Mediterranean ML, secondary=marine prediction

Entity: researcher/chibuize_lindstrom
  affiliation: Leiden University
  publication_count: 39
  previous_employer: KNAW AI (2017-2020)
  research_focus: primary=Dutch climate ML, secondary=sea level prediction

Entity: researcher/rashida_okonkwo
  affiliation: University of Helsinki
  publication_count: 72
  previous_employer: Finnish Meteorological Institute AI (2018-2021)
  research_focus: primary=Arctic ML, secondary=sea ice prediction

Entity: researcher/bjoern_osei
  affiliation: Warsaw University of Technology
  publication_count: 48
  previous_employer: Polish Meteorological Institute AI (2016-2019)
  research_focus: primary=Central European weather ML, secondary=precipitation

Entity: researcher/oluwakayode_okonkwo
  affiliation: Ghent University
  publication_count: 64
  previous_employer: Royal Meteorological Institute of Belgium AI (2018-2021)
  research_focus: primary=Belgian climate ML, secondary=flood risk

Entity: researcher/yuriko_lindstrom
  affiliation: University of Copenhagen
  publication_count: 37
  previous_employer: Danish Meteorological Institute AI (2017-2020)
  research_focus: primary=North Sea ML, secondary=wind prediction

Entity: researcher/oluwabimpe_okonkwo
  affiliation: Université Paris-Saclay
  publication_count: 81
  previous_employer: Météo-France AI (2018-2021)
  research_focus: primary=French climate ML, secondary=storm tracking

Entity: researcher/adaeze_berg
  affiliation: Max Planck Institute for Intelligent Systems
  publication_count: 56
  previous_employer: Max Planck Institute for Meteorology AI (2016-2019)
  research_focus: primary=global climate ML, secondary=ocean-atmosphere coupling

Entity: researcher/daichi_osei
  affiliation: Vector Institute
  publication_count: 44
  previous_employer: Environment and Climate Change Canada AI (2018-2021)
  research_focus: primary=Canadian permafrost ML, secondary=cryosphere

Entity: researcher/oluwatoyin_okonkwo
  affiliation: Mila
  publication_count: 68
  previous_employer: Ouranos AI (2017-2020)
  research_focus: primary=Quebec climate adaptation ML, secondary=hydrology

Entity: researcher/kwame_osei
  affiliation: Allen Institute for AI
  publication_count: 35
  previous_employer: Allen Institute for Ocean Science AI (2018-2021)
  research_focus: primary=ocean ML, secondary=marine biology

Entity: researcher/chidinma_tanaka
  affiliation: National University of Singapore
  publication_count: 73
  previous_employer: Centre for Climate Research Singapore (2016-2019)
  research_focus: primary=tropical climate ML, secondary=ENSO prediction

Entity: researcher/nkechi_adeyemi
  affiliation: Nanyang Technological University
  publication_count: 49
  previous_employer: Earth Observatory Singapore AI (2018-2021)
  research_focus: primary=Southeast Asia climate ML, secondary=haze prediction

Entity: researcher/takumi_osei
  affiliation: KAIST
  publication_count: 63
  previous_employer: Korea Institute of Ocean Science AI (2017-2020)
  research_focus: primary=Korean coastal ML, secondary=tide prediction

Entity: researcher/oluwafunke_tanaka
  affiliation: Hong Kong University of Science and Technology
  publication_count: 38
  previous_employer: Hong Kong Observatory AI (2018-2021)
  research_focus: primary=South China Sea ML, secondary=typhoon forecasting

Entity: researcher/haruto_lindstrom
  affiliation: Purdue University
  publication_count: 76
  previous_employer: NOAA AI (2016-2019)
  research_focus: primary=Atlantic hurricane ML, secondary=intensity prediction

Entity: researcher/chibueze_okonkwo
  affiliation: University of Michigan
  publication_count: 42
  previous_employer: Great Lakes Research Center AI (2018-2021)
  research_focus: primary=freshwater ML, secondary=lake ecology

Entity: researcher/oluwafunmilayo_tanaka
  affiliation: UT Austin CS
  publication_count: 57
  previous_employer: Texas Advanced Computing Center AI (2017-2020)
  research_focus: primary=HPC ML, secondary=scientific simulation

Entity: researcher/sakura_voss
  affiliation: University of Washington
  publication_count: 45
  previous_employer: Pacific Northwest National Laboratory AI (2018-2021)
  research_focus: primary=energy grid ML, secondary=renewable integration

Entity: researcher/ekundayo_lindstrom
  affiliation: NYU CS
  publication_count: 69
  previous_employer: Flatiron Institute AI (2016-2019)
  research_focus: primary=computational physics ML, secondary=many-body systems

Entity: researcher/chioma_osei
  affiliation: Princeton CS
  publication_count: 36
  previous_employer: Princeton Plasma Physics Lab AI (2018-2021)
  research_focus: primary=plasma physics ML, secondary=fusion control

Entity: researcher/adaobi_okonkwo
  affiliation: Yale CS
  publication_count: 80
  previous_employer: Yale School of Environment AI (2017-2020)
  research_focus: primary=ecology ML, secondary=biodiversity modeling

Entity: researcher/rashida_voss
  affiliation: Johns Hopkins CS
  publication_count: 53
  previous_employer: Hopkins Marine Station AI (2018-2021)
  research_focus: primary=marine ecology ML, secondary=coral reef monitoring

Entity: researcher/fumio_lindstrom
  affiliation: University of Edinburgh
  publication_count: 41
  previous_employer: Scottish Association for Marine Science AI (2016-2019)
  research_focus: primary=North Atlantic ML, secondary=fisheries prediction

Entity: researcher/nikolai_lindstrom
  affiliation: University of Glasgow
  publication_count: 66
  previous_employer: SRUC AI (2018-2021)
  research_focus: primary=agricultural ML, secondary=crop yield prediction

Entity: researcher/oluwabunmi_voss
  affiliation: University of Bristol
  publication_count: 39
  previous_employer: Bristol Veterinary School AI (2017-2020)
  research_focus: primary=veterinary ML, secondary=disease surveillance

Entity: researcher/jiro_osei
  affiliation: Aalborg University
  publication_count: 75
  previous_employer: Aalborg University Hospital Veterinary AI (2018-2021)
  research_focus: primary=animal health ML, secondary=herd management

Entity: researcher/chibuike_tanaka
  affiliation: Delft University of Technology
  publication_count: 48
  previous_employer: Deltares AI (2016-2019)
  research_focus: primary=water management ML, secondary=flood modeling

Entity: researcher/oluwakemi_lindstrom
  affiliation: University of Zurich
  publication_count: 62
  previous_employer: Swiss Federal Institute for Forest, Snow and Landscape Research AI (2018-2021)
  research_focus: primary=forest ML, secondary=biodiversity

Entity: researcher/adaeze_voss
  affiliation: MIT CSAIL
  publication_count: 37
  previous_employer: MIT Energy Initiative AI (2016-2019)
  research_focus: primary=energy systems ML, secondary=grid optimization

Entity: researcher/haruki_tanaka
  affiliation: Stanford AI Lab
  publication_count: 71
  previous_employer: Stanford Woods Institute AI (2018-2021)
  research_focus: primary=environmental ML, secondary=sustainability

Entity: researcher/oluseun_tanaka
  affiliation: Carnegie Mellon SCS
  publication_count: 54
  previous_employer: CMU Scott Institute for Energy Innovation AI (2017-2020)
  research_focus: primary=energy ML, secondary=smart grid

Entity: researcher/yuki_lindstrom
  affiliation: UC Berkeley EECS
  publication_count: 43
  previous_employer: Lawrence Berkeley National Lab Energy AI (2018-2021)
  research_focus: primary=building energy ML, secondary=demand response

Entity: researcher/chioma_tanaka
  affiliation: Oxford CS
  publication_count: 68
  previous_employer: UK Centre for Ecology and Hydrology AI (2016-2019)
  research_focus: primary=hydrology ML, secondary=river prediction

Entity: researcher/fumika_okonkwo
  affiliation: Cambridge AI
  publication_count: 35
  previous_employer: Cambridge Centre for Carbon Credits AI (2018-2021)
  research_focus: primary=carbon market ML, secondary=emissions modeling

Entity: researcher/oluwafemi_berg
  affiliation: ETH Zurich
  publication_count: 79
  previous_employer: ETH Zurich Climate AI (2017-2020)
  research_focus: primary=Swiss Alpine climate ML, secondary=glacier dynamics

Entity: researcher/kofi_osei
  affiliation: EPFL
  publication_count: 52
  previous_employer: EPFL Climate AI (2018-2021)
  research_focus: primary=lake Geneva ML, secondary=water quality prediction

Entity: researcher/adaeze_lindgren
  affiliation: TU Berlin
  publication_count: 41
  previous_employer: Fraunhofer ISE AI (2016-2019)
  research_focus: primary=solar energy ML, secondary=PV optimization

Entity: researcher/oluwabimpe_mensah
  affiliation: University of Toronto
  publication_count: 65
  previous_employer: MaRS Discovery District AI (2018-2021)
  research_focus: primary=cleantech ML, secondary=energy transition

Entity: researcher/kazuki_mensah
  affiliation: University of Amsterdam
  publication_count: 38
  previous_employer: Amsterdam Smart City AI (2017-2020)
  research_focus: primary=urban ML, secondary=smart city optimization

Entity: researcher/chidinma_okonkwo
  affiliation: KU Leuven
  publication_count: 74
  previous_employer: EnergyVille AI (2018-2021)
  research_focus: primary=Belgian energy ML, secondary=demand forecasting

Entity: researcher/oluwasegun_osei
  affiliation: Peking University
  publication_count: 46
  previous_employer: Peking University Energy AI (2016-2019)
  research_focus: primary=Chinese energy grid ML, secondary=coal-to-renewables

Entity: researcher/rashida_tanaka
  affiliation: Tsinghua CS
  publication_count: 60
  previous_employer: State Grid Corporation AI (2018-2021)
  research_focus: primary=power grid ML, secondary=stability prediction

Entity: researcher/kweku_okonkwo
  affiliation: University of Tokyo
  publication_count: 33
  previous_employer: TEPCO AI (2017-2020)
  research_focus: primary=nuclear power ML, secondary=safety monitoring

Entity: researcher/oluwafunke_osei
  affiliation: Seoul National University
  publication_count: 77
  previous_employer: KEPCO AI (2018-2021)
  research_focus: primary=Korean energy ML, secondary=renewable integration

Entity: researcher/yuriko_okonkwo
  affiliation: IIT Bombay
  publication_count: 51
  previous_employer: PowerGrid Corporation AI (2016-2019)
  research_focus: primary=Indian power grid ML, secondary=load forecasting

Entity: researcher/chibueze_lindahl
  affiliation: University of Cape Town
  publication_count: 44
  previous_employer: Eskom AI (2018-2021)
  research_focus: primary=South African power ML, secondary=load shedding prediction

Entity: researcher/adekunle_osei
  affiliation: Universidade de São Paulo
  publication_count: 68
  previous_employer: Eletrobras AI (2017-2020)
  research_focus: primary=Brazilian energy ML, secondary=hydropower optimization

Entity: researcher/fumiko_okonkwo
  affiliation: Tel Aviv University
  publication_count: 39
  previous_employer: Israel Electric Corporation AI (2018-2021)
  research_focus: primary=Israeli grid ML, secondary=solar integration

Entity: researcher/oluwakayode_mensah
  affiliation: Hebrew University
  publication_count: 82
  previous_employer: Weizmann Institute Energy AI (2016-2019)
  research_focus: primary=energy storage ML, secondary=battery optimization

Entity: researcher/chidinma_lindstrom
  affiliation: Technion
  publication_count: 55
  previous_employer: Technion Energy Center AI (2018-2021)
  research_focus: primary=fuel cell ML, secondary=hydrogen production

Entity: researcher/adaeze_okafor
  affiliation: Leiden University
  publication_count: 43
  previous_employer: TNO Energy AI (2017-2020)
  research_focus: primary=Dutch offshore wind ML, secondary=asset management

Entity: researcher/emeka_voss
  affiliation: University of Helsinki
  publication_count: 67
  previous_employer: Fortum AI (2018-2021)
  research_focus: primary=Nordic energy ML, secondary=hydropower optimization

Entity: researcher/kwabena_adeyemi
  affiliation: Warsaw University of Technology
  publication_count: 34
  previous_employer: PGE AI (2016-2019)
  research_focus: primary=Polish energy ML, secondary=coal transition

Entity: researcher/oluwaseun_okonkwo
  affiliation: Ghent University
  publication_count: 71
  previous_employer: Engie AI (2018-2021)
  research_focus: primary=Belgian energy ML, secondary=nuclear power

Entity: researcher/soo_jin_osei
  affiliation: University of Copenhagen
  publication_count: 48
  previous_employer: Ørsted AI (2017-2020)
  research_focus: primary=offshore wind ML, secondary=maintenance optimization

Entity: researcher/chibuike_berg
  affiliation: Université Paris-Saclay
  publication_count: 63
  previous_employer: EDF AI (2018-2021)
  research_focus: primary=French nuclear ML, secondary=reactor monitoring

Entity: researcher/adaora_lindstrom
  affiliation: Max Planck Institute for Intelligent Systems
  publication_count: 37
  previous_employer: Max Planck Institute for Plasma Physics AI (2016-2019)
  research_focus: primary=fusion energy ML, secondary=magnetics

Entity: researcher/haruki_okonkwo
  affiliation: Vector Institute
  publication_count: 74
  previous_employer: Ontario Power Generation AI (2018-2021)
  research_focus: primary=Canadian nuclear ML, secondary=safety monitoring

Entity: researcher/nneka_osei
  affiliation: Mila
  publication_count: 52
  previous_employer: Hydro-Québec AI (2017-2020)
  research_focus: primary=hydropower ML, secondary=demand forecasting

Entity: researcher/oluwabunmi_osei
  affiliation: Allen Institute for AI
  publication_count: 41
  previous_employer: Pacific Northwest National Laboratory Energy AI (2018-2021)
  research_focus: primary=energy storage ML, secondary=grid-scale batteries

Entity: researcher/rashida_osei
  affiliation: National University of Singapore
  publication_count: 65
  previous_employer: SP Group AI (2016-2019)
  research_focus: primary=Singapore grid ML, secondary=demand response

Entity: researcher/daichi_okonkwo
  affiliation: Nanyang Technological University
  publication_count: 38
  previous_employer: Nanyang Technological University Energy Research Institute AI (2018-2021)
  research_focus: primary=clean energy ML, secondary=fuel cells

Entity: researcher/chukwuemeka_osei
  affiliation: KAIST
  publication_count: 76
  previous_employer: Korean Institute of Energy Research AI (2017-2020)
  research_focus: primary=Korean clean energy ML, secondary=hydrogen

Entity: researcher/oluwafemi_mensah
  affiliation: Hong Kong University of Science and Technology
  publication_count: 49
  previous_employer: HK Electric AI (2018-2021)
  research_focus: primary=Hong Kong energy ML, secondary=demand prediction

Entity: researcher/haruto_osei
  affiliation: Purdue University
  publication_count: 63
  previous_employer: Exelon AI (2016-2019)
  research_focus: primary=US nuclear ML, secondary=fleet optimization

Entity: researcher/chibueze_voss
  affiliation: University of Michigan
  publication_count: 35
  previous_employer: DTE Energy AI (2018-2021)
  research_focus: primary=Michigan grid ML, secondary=renewable integration

Entity: researcher/oluwakemi_adeyemi
  affiliation: UT Austin CS
  publication_count: 78
  previous_employer: ERCOT AI (2017-2020)
  research_focus: primary=Texas grid ML, secondary=wind forecasting

Entity: researcher/fumio_adeyemi
  affiliation: University of Washington
  publication_count: 44
  previous_employer: Seattle City Light AI (2018-2021)
  research_focus: primary=Pacific Northwest energy ML, secondary=hydropower

Entity: researcher/sigrid_lindahl
  affiliation: NYU CS
  publication_count: 62
  previous_employer: Con Edison AI (2016-2019)
  research_focus: primary=NYC grid ML, secondary=outage prediction

Entity: researcher/adeola_lindstrom
  affiliation: Princeton CS
  publication_count: 37
  previous_employer: NJ Resources AI (2018-2021)
  research_focus: primary=gas grid ML, secondary=demand forecasting

Entity: researcher/chidinma_lindahl
  affiliation: Yale CS
  publication_count: 81
  previous_employer: Eversource AI (2017-2020)
  research_focus: primary=New England grid ML, secondary=storm resilience

Entity: researcher/fumika_lindahl
  affiliation: Johns Hopkins CS
  publication_count: 53
  previous_employer: BGE AI (2018-2021)
  research_focus: primary=Mid-Atlantic grid ML, secondary=smart meter analytics

Entity: researcher/oluwabimpe_lindstrom
  affiliation: University of Edinburgh
  publication_count: 42
  previous_employer: SSE AI (2016-2019)
  research_focus: primary=Scottish renewable ML, secondary=grid balancing

Entity: researcher/christel_osei
  affiliation: University of Glasgow
  publication_count: 66
  previous_employer: ScottishPower AI (2018-2021)
  research_focus: primary=UK wind ML, secondary=transmission planning

Entity: researcher/adaeze_tanaka
  affiliation: University of Bristol
  publication_count: 39
  previous_employer: Western Power Distribution AI (2017-2020)
  research_focus: primary=UK distribution ML, secondary=EV charging

Entity: researcher/oluwafunke_okonkwo
  affiliation: Aalborg University
  publication_count: 73
  previous_employer: Energinet AI (2018-2021)
  research_focus: primary=Danish grid ML, secondary=sector coupling

Entity: researcher/kweku_voss
  affiliation: Delft University of Technology
  publication_count: 48
  previous_employer: TenneT AI (2016-2019)
  research_focus: primary=Dutch transmission ML, secondary=cross-border flows

Entity: researcher/chioma_lindahl
  affiliation: University of Zurich
  publication_count: 61
  previous_employer: Swissgrid AI (2018-2021)
  research_focus: primary=Swiss grid ML, secondary=alpine pumped storage

Entity: researcher/priya_bjornsen
  affiliation: MIT CSAIL
  publication_count: 58
  previous_employer: Google Brain (2019-2022)
  research_focus: primary=natural language processing, secondary=text generation

Entity: researcher/oluwatobiloba_lindstrom
  affiliation: Stanford AI Lab
  publication_count: 43
  previous_employer: OpenAI (2017-2020)
  research_focus: primary=reinforcement learning, secondary=language grounding

Entity: researcher/amina_tanaka
  affiliation: Carnegie Mellon SCS
  publication_count: 71
  previous_employer: Meta AI (2019-2022)
  research_focus: primary=computer vision, secondary=video generation

Entity: researcher/bogdan_okonkwo
  affiliation: UC Berkeley EECS
  publication_count: 36
  previous_employer: DeepMind (2016-2019)
  research_focus: primary=reinforcement learning, secondary=robotics

Entity: researcher/yuna_adeyemi
  affiliation: Oxford CS
  publication_count: 64
  previous_employer: Microsoft Research (2018-2021)
  research_focus: primary=machine learning, secondary=fairness

Entity: researcher/kwabena_pettersson
  affiliation: Cambridge AI
  publication_count: 49
  previous_employer: Amazon Science (2017-2020)
  research_focus: primary=NLP, secondary=information retrieval

Entity: researcher/fatou_eriksen
  affiliation: ETH Zurich
  publication_count: 83
  previous_employer: Google DeepMind (2018-2021)
  research_focus: primary=graph neural networks, secondary=molecular design

Entity: researcher/aleksei_mensah
  affiliation: EPFL
  publication_count: 37
  previous_employer: NVIDIA Research (2016-2019)
  research_focus: primary=efficient deep learning, secondary=model compression

Entity: researcher/zainab_osei
  affiliation: TU Berlin
  publication_count: 55
  previous_employer: Intel Labs (2019-2022)
  research_focus: primary=hardware-aware ML, secondary=neural architecture search

Entity: researcher/ryo_lindqvist
  affiliation: University of Toronto
  publication_count: 68
  previous_employer: Samsung AI Center (2017-2020)
  research_focus: primary=speech recognition, secondary=multilingual models

Entity: researcher/nadia_okonkwo
  affiliation: University of Amsterdam
  publication_count: 42
  previous_employer: Booking.com AI (2018-2021)
  research_focus: primary=recommender systems, secondary=NLP

Entity: researcher/pierre_tanaka
  affiliation: KU Leuven
  publication_count: 76
  previous_employer: Baidu Research (2016-2019)
  research_focus: primary=knowledge graphs, secondary=reasoning

Entity: researcher/sunita_adeyemi
  affiliation: Peking University
  publication_count: 53
  previous_employer: Tencent AI Lab (2018-2021)
  research_focus: primary=social media analysis, secondary=NLP

Entity: researcher/mikhail_okafor
  affiliation: Tsinghua CS
  publication_count: 39
  previous_employer: Alibaba DAMO Academy (2017-2020)
  research_focus: primary=multimodal learning, secondary=image captioning

Entity: researcher/ingeborg_mensah
  affiliation: University of Tokyo
  publication_count: 74
  previous_employer: Sony AI (2018-2021)
  research_focus: primary=generative models, secondary=audio synthesis

Entity: researcher/kofi_adeyemi
  affiliation: Seoul National University
  publication_count: 47
  previous_employer: Kakao AI (2019-2022)
  research_focus: primary=Korean NLP, secondary=dialogue systems

Entity: researcher/valentina_osei
  affiliation: IIT Bombay
  publication_count: 60
  previous_employer: Flipkart AI (2017-2020)
  research_focus: primary=e-commerce ML, secondary=search ranking

Entity: researcher/oluseun_okonkwo
  affiliation: University of Cape Town
  publication_count: 35
  previous_employer: Standard Bank AI (2018-2021)
  research_focus: primary=financial ML, secondary=credit risk

Entity: researcher/camila_lindstrom
  affiliation: Universidade de São Paulo
  publication_count: 79
  previous_employer: Itaú Unibanco AI (2016-2019)
  research_focus: primary=Brazilian financial ML, secondary=fraud detection

Entity: researcher/ibrahim_tanaka
  affiliation: Tel Aviv University
  publication_count: 44
  previous_employer: Bank Leumi AI (2018-2021)
  research_focus: primary=Israeli financial ML, secondary=anti-money laundering

Entity: researcher/mei_osei
  affiliation: Hebrew University
  publication_count: 67
  previous_employer: Bank of Israel AI (2017-2020)
  research_focus: primary=central bank ML, secondary=monetary policy

Entity: researcher/fredrik_adeyemi
  affiliation: Technion
  publication_count: 52
  previous_employer: Hapoalim AI (2018-2021)
  research_focus: primary=retail banking ML, secondary=customer analytics

Entity: researcher/adaeze_pettersson
  affiliation: Leiden University
  publication_count: 41
  previous_employer: ING AI (2016-2019)
  research_focus: primary=Dutch banking ML, secondary=credit scoring

Entity: researcher/hamid_lindstrom
  affiliation: University of Helsinki
  publication_count: 65
  previous_employer: Nordea AI (2018-2021)
  research_focus: primary=Nordic banking ML, secondary=fraud detection

Entity: researcher/anna_osei
  affiliation: Warsaw University of Technology
  publication_count: 38
  previous_employer: PKO BP AI (2017-2020)
  research_focus: primary=Polish banking ML, secondary=mortgage prediction

Entity: researcher/leon_tanaka
  affiliation: Ghent University
  publication_count: 73
  previous_employer: KBC AI (2018-2021)
  research_focus: primary=Belgian insurance ML, secondary=claims prediction

Entity: researcher/hana_adeyemi
  affiliation: University of Copenhagen
  publication_count: 56
  previous_employer: Danske Bank AI (2016-2019)
  research_focus: primary=Scandinavian banking ML, secondary=anti-fraud

Entity: researcher/victor_lindstrom
  affiliation: Université Paris-Saclay
  publication_count: 44
  previous_employer: BNP Paribas AI (2018-2021)
  research_focus: primary=French banking ML, secondary=risk modeling

Entity: researcher/liu_adeyemi
  affiliation: Max Planck Institute for Intelligent Systems
  publication_count: 68
  previous_employer: Deutsche Bank AI (2017-2020)
  research_focus: primary=German banking ML, secondary=trading algorithms

Entity: researcher/fatima_tanaka
  affiliation: Vector Institute
  publication_count: 35
  previous_employer: TD Bank AI (2018-2021)
  research_focus: primary=Canadian banking ML, secondary=customer churn

Entity: researcher/jose_lindstrom
  affiliation: Mila
  publication_count: 81
  previous_employer: Royal Bank of Canada AI (2016-2019)
  research_focus: primary=RBC customer ML, secondary=personalization

Entity: researcher/elena_adeyemi
  affiliation: Allen Institute for AI
  publication_count: 47
  previous_employer: Bank of Montreal AI (2018-2021)
  research_focus: primary=Canadian financial NLP, secondary=earnings calls

Entity: researcher/tanvir_osei
  affiliation: National University of Singapore
  publication_count: 62
  previous_employer: DBS AI Lab (2017-2020)
  research_focus: primary=Singapore banking ML, secondary=digital payments

Entity: researcher/nkechi_lindqvist
  affiliation: Nanyang Technological University
  publication_count: 39
  previous_employer: OCBC AI (2018-2021)
  research_focus: primary=Southeast Asian banking ML, secondary=compliance

Entity: researcher/lucas_okonkwo
  affiliation: KAIST
  publication_count: 74
  previous_employer: Hana Financial AI (2016-2019)
  research_focus: primary=Korean fintech ML, secondary=mobile payments

Entity: researcher/sofie_lindstrom
  affiliation: Hong Kong University of Science and Technology
  publication_count: 53
  previous_employer: HSBC AI Center (2018-2021)
  research_focus: primary=wealth management ML, secondary=portfolio optimization

Entity: researcher/aryan_adeyemi
  affiliation: Purdue University
  publication_count: 41
  previous_employer: Fifth Third Bank AI (2017-2020)
  research_focus: primary=US regional banking ML, secondary=branch optimization

Entity: researcher/zara_lindstrom
  affiliation: University of Michigan
  publication_count: 66
  previous_employer: Ally Financial AI (2018-2021)
  research_focus: primary=auto lending ML, secondary=risk assessment

Entity: researcher/emeka_adeyemi
  affiliation: UT Austin CS
  publication_count: 38
  previous_employer: Capital One AI (2016-2019)
  research_focus: primary=credit card ML, secondary=fraud detection

Entity: researcher/soo_jin_adeyemi
  affiliation: University of Washington
  publication_count: 79
  previous_employer: Chase AI (2018-2021)
  research_focus: primary=digital banking ML, secondary=chatbots

Entity: researcher/andile_okonkwo
  affiliation: NYU CS
  publication_count: 54
  previous_employer: American Express AI (2017-2020)
  research_focus: primary=card network ML, secondary=transaction monitoring

Entity: researcher/astrid_lindstrom
  affiliation: Princeton CS
  publication_count: 43
  previous_employer: Mastercard AI (2018-2021)
  research_focus: primary=payment ML, secondary=real-time fraud

Entity: researcher/rodrigo_adeyemi
  affiliation: Yale CS
  publication_count: 67
  previous_employer: Visa AI (2016-2019)
  research_focus: primary=global payment ML, secondary=merchant analytics

Entity: researcher/chidinma_watanabe
  affiliation: Johns Hopkins CS
  publication_count: 35
  previous_employer: Square AI (2018-2021)
  research_focus: primary=small business ML, secondary=payment processing

Entity: researcher/niklas_lindstrom
  affiliation: University of Edinburgh
  publication_count: 72
  previous_employer: Stripe AI (2017-2020)
  research_focus: primary=payment infrastructure ML, secondary=fraud prevention

Entity: researcher/amara_okonkwo
  affiliation: University of Glasgow
  publication_count: 48
  previous_employer: PayPal AI (2018-2021)
  research_focus: primary=digital wallet ML, secondary=identity verification

Entity: researcher/hassan_adeyemi
  affiliation: University of Bristol
  publication_count: 63
  previous_employer: Coinbase AI (2019-2022)
  research_focus: primary=crypto ML, secondary=blockchain analytics

Entity: researcher/nneka_okonkwo
  affiliation: Aalborg University
  publication_count: 37
  previous_employer: Binance AI (2020-2023)
  research_focus: primary=DeFi ML, secondary=smart contract analysis

Entity: researcher/siddharth_tanaka
  affiliation: Delft University of Technology
  publication_count: 76
  previous_employer: ABN AMRO AI (2018-2021)
  research_focus: primary=mortgage ML, secondary=credit risk

Entity: researcher/yuki_lindqvist
  affiliation: University of Zurich
  publication_count: 52
  previous_employer: Credit Suisse AI (2017-2020)
  research_focus: primary=private banking ML, secondary=wealth management

Entity: researcher/vera_adeyemi
  affiliation: MIT CSAIL
  publication_count: 44
  previous_employer: Julius Baer AI (2018-2021)
  research_focus: primary=Swiss wealth ML, secondary=ESG scoring

Entity: researcher/benedikt_lindstrom
  affiliation: Stanford AI Lab
  publication_count: 69
  previous_employer: UBS Wealth AI (2016-2019)
  research_focus: primary=ultra-high-net-worth ML, secondary=estate planning

Entity: researcher/ishaan_osei
  affiliation: Carnegie Mellon SCS
  publication_count: 41
  previous_employer: BlackRock AI (2018-2021)
  research_focus: primary=asset management ML, secondary=systematic strategies

Entity: researcher/oluwakemi_pettersson
  affiliation: UC Berkeley EECS
  publication_count: 84
  previous_employer: Vanguard AI (2017-2020)
  research_focus: primary=index fund ML, secondary=factor analysis

Entity: researcher/anders_lindstrom
  affiliation: Oxford CS
  publication_count: 55
  previous_employer: Fidelity AI (2018-2021)
  research_focus: primary=equity research ML, secondary=earnings prediction

Entity: researcher/nour_adeyemi
  affiliation: Cambridge AI
  publication_count: 43
  previous_employer: Wellington Management AI (2016-2019)
  research_focus: primary=fundamental investing ML, secondary=company analysis

Entity: researcher/chen_lindstrom
  affiliation: ETH Zurich
  publication_count: 67
  previous_employer: PIMCO AI (2018-2021)
  research_focus: primary=fixed income ML, secondary=bond pricing

Entity: researcher/sigrid_lindstrom
  affiliation: EPFL
  publication_count: 36
  previous_employer: Schroders AI (2017-2020)
  research_focus: primary=UK asset ML, secondary=quantitative strategies

Entity: researcher/abel_lindstrom
  affiliation: TU Berlin
  publication_count: 78
  previous_employer: DWS AI (2018-2021)
  research_focus: primary=German asset ML, secondary=systematic trading

Entity: researcher/preethi_adeyemi
  affiliation: University of Toronto
  publication_count: 47
  previous_employer: CPP Investments AI (2016-2019)
  research_focus: primary=pension fund ML, secondary=infrastructure investment

Entity: researcher/emre_lindstrom
  affiliation: University of Amsterdam
  publication_count: 62
  previous_employer: APG Asset Management AI (2018-2021)
  research_focus: primary=Dutch pension ML, secondary=ESG integration

Entity: researcher/sonja_adeyemi
  affiliation: KU Leuven
  publication_count: 39
  previous_employer: KBC Asset Management AI (2017-2020)
  research_focus: primary=Belgian investment ML, secondary=portfolio construction

Entity: researcher/kweku_adeyemi
  affiliation: Peking University
  publication_count: 73
  previous_employer: CITIC Securities AI (2018-2021)
  research_focus: primary=Chinese equity ML, secondary=algorithmic trading

Entity: researcher/aya_osei
  affiliation: Tsinghua CS
  publication_count: 54
  previous_employer: China International Capital Corporation AI (2016-2019)
  research_focus: primary=A-share ML, secondary=IPO prediction

Entity: researcher/adebayo_adeyemi
  affiliation: University of Tokyo
  publication_count: 41
  previous_employer: Nomura AI (2018-2021)
  research_focus: primary=Japanese equity ML, secondary=quant strategies

Entity: researcher/hina_adeyemi
  affiliation: Seoul National University
  publication_count: 66
  previous_employer: Korea Investment Corporation AI (2017-2020)
  research_focus: primary=Korean institutional ML, secondary=sovereign wealth

Entity: researcher/marco_lindstrom
  affiliation: IIT Bombay
  publication_count: 35
  previous_employer: HDFC AMC AI (2018-2021)
  research_focus: primary=Indian mutual fund ML, secondary=NAV prediction

Entity: researcher/thandi_adeyemi
  affiliation: University of Cape Town
  publication_count: 79
  previous_employer: Allan Gray AI (2016-2019)
  research_focus: primary=South African equity ML, secondary=value investing

Entity: researcher/renata_osei
  affiliation: Universidade de São Paulo
  publication_count: 52
  previous_employer: BTG Pactual AI (2018-2021)
  research_focus: primary=Brazilian capital markets ML, secondary=commodities

Entity: researcher/bilal_tanaka
  affiliation: Tel Aviv University
  publication_count: 44
  previous_employer: Migdal Insurance AI (2017-2020)
  research_focus: primary=Israeli insurance ML, secondary=actuarial ML

Entity: researcher/chioma_adeyemi
  affiliation: Hebrew University
  publication_count: 68
  previous_employer: Allianz Israel AI (2018-2021)
  research_focus: primary=Israeli market ML, secondary=property insurance

Entity: researcher/fredrik_lindstrom
  affiliation: Technion
  publication_count: 37
  previous_employer: Clal Insurance AI (2016-2019)
  research_focus: primary=life insurance ML, secondary=mortality modeling

Entity: researcher/giulia_osei
  affiliation: Leiden University
  publication_count: 83
  previous_employer: Aegon AI (2018-2021)
  research_focus: primary=Dutch insurance ML, secondary=annuity pricing

Entity: researcher/tariq_adeyemi
  affiliation: University of Helsinki
  publication_count: 56
  previous_employer: Sampo Group AI (2017-2020)
  research_focus: primary=Nordic insurance ML, secondary=claims automation

Entity: researcher/oluwatobi_lindstrom
  affiliation: Warsaw University of Technology
  publication_count: 43
  previous_employer: PZU AI (2018-2021)
  research_focus: primary=Polish insurance ML, secondary=telematics

Entity: researcher/paloma_adeyemi
  affiliation: Ghent University
  publication_count: 61
  previous_employer: Ageas AI (2016-2019)
  research_focus: primary=Belgian insurance ML, secondary=motor claims

Entity: researcher/leif_lindstrom
  affiliation: University of Copenhagen
  publication_count: 48
  previous_employer: Tryg AI (2018-2021)
  research_focus: primary=Scandinavian non-life ML, secondary=risk scoring

Entity: researcher/yasmin_adeyemi
  affiliation: Université Paris-Saclay
  publication_count: 74
  previous_employer: AXA AI (2017-2020)
  research_focus: primary=French insurance ML, secondary=telematics pricing

Entity: researcher/oluwafemi_voss
  affiliation: Max Planck Institute for Intelligent Systems
  publication_count: 33
  previous_employer: Allianz AI (2018-2021)
  research_focus: primary=German insurance ML, secondary=claims triage

Entity: researcher/zuzanna_adeyemi
  affiliation: Vector Institute
  publication_count: 69
  previous_employer: Manulife AI (2016-2019)
  research_focus: primary=Canadian life insurance ML, secondary=lapse prediction

Entity: researcher/magnus_lindstrom
  affiliation: Mila
  publication_count: 46
  previous_employer: Sun Life AI (2018-2021)
  research_focus: primary=group benefits ML, secondary=disability claims

Entity: researcher/adaora_adeyemi
  affiliation: Allen Institute for AI
  publication_count: 57
  previous_employer: Great-West Life AI (2017-2020)
  research_focus: primary=Canadian group insurance ML, secondary=HR analytics

Entity: researcher/ismail_lindstrom
  affiliation: National University of Singapore
  publication_count: 38
  previous_employer: AIA Singapore AI (2018-2021)
  research_focus: primary=Asian life insurance ML, secondary=customer lifetime value

Entity: researcher/nneka_lindstrom
  affiliation: Nanyang Technological University
  publication_count: 72
  previous_employer: Prudential Singapore AI (2016-2019)
  research_focus: primary=Singapore insurance ML, secondary=agent performance ML

Entity: researcher/taeyang_adeyemi
  affiliation: KAIST
  publication_count: 43
  previous_employer: Samsung Life AI (2018-2021)
  research_focus: primary=Korean life insurance ML, secondary=mortality tables

Entity: researcher/lena_lindstrom
  affiliation: Hong Kong University of Science and Technology
  publication_count: 65
  previous_employer: Hang Seng Insurance AI (2017-2020)
  research_focus: primary=Hong Kong insurance ML, secondary=claims fraud

Entity: researcher/hugo_adeyemi
  affiliation: Purdue University
  publication_count: 28
  previous_employer: Chubb AI (2018-2021)
  research_focus: primary=specialty insurance ML, secondary=catastrophe modeling

Entity: researcher/chiamaka_voss
  affiliation: University of Michigan
  publication_count: 81
  previous_employer: Zurich Insurance AI (2016-2019)
  research_focus: primary=commercial insurance ML, secondary=property risk

Entity: researcher/rasmus_lindstrom
  affiliation: UT Austin CS
  publication_count: 54
  previous_employer: Travelers AI (2018-2021)
  research_focus: primary=US P&C insurance ML, secondary=catastrophe claims

Entity: researcher/mei_lin_adeyemi
  affiliation: University of Washington
  publication_count: 39
  previous_employer: PEMCO AI (2017-2020)
  research_focus: primary=Pacific Northwest insurance ML, secondary=weather risk

Entity: researcher/kwabena_lindstrom
  affiliation: NYU CS
  publication_count: 76
  previous_employer: MetLife AI (2018-2021)
  research_focus: primary=US life insurance ML, secondary=underwriting automation

Entity: researcher/olga_adeyemi
  affiliation: Princeton CS
  publication_count: 45
  previous_employer: New York Life AI (2016-2019)
  research_focus: primary=mutual life insurance ML, secondary=policyholder analytics

Entity: researcher/chukwuemeka_lindstrom
  affiliation: Yale CS
  publication_count: 63
  previous_employer: Northwestern Mutual AI (2018-2021)
  research_focus: primary=financial planning ML, secondary=retirement prediction

Entity: researcher/nadia_lindstrom
  affiliation: Johns Hopkins CS
  publication_count: 37
  previous_employer: Cigna AI (2017-2020)
  research_focus: primary=health insurance ML, secondary=utilization prediction

Entity: researcher/per_lindstrom
  affiliation: University of Edinburgh
  publication_count: 58
  previous_employer: Aetna AI (2018-2021)
  research_focus: primary=US health ML, secondary=prior authorization

Entity: researcher/aisling_adeyemi
  affiliation: University of Glasgow
  publication_count: 44
  previous_employer: Anthem AI (2016-2019)
  research_focus: primary=managed care ML, secondary=care gap identification

Entity: researcher/ibrahim_lindstrom
  affiliation: University of Bristol
  publication_count: 79
  previous_employer: Humana AI (2018-2021)
  research_focus: primary=Medicare Advantage ML, secondary=chronic disease prediction

Entity: researcher/astrid_lindstrom
  affiliation: Aalborg University
  publication_count: 31
  previous_employer: UnitedHealth AI (2017-2020)
  research_focus: primary=US health system ML, secondary=readmission prediction

Entity: researcher/yusuf_adeyemi
  affiliation: Delft University of Technology
  publication_count: 67
  previous_employer: Optum AI (2018-2021)
  research_focus: primary=pharmacy ML, secondary=drug adherence

Entity: researcher/chidera_adeyemi
  affiliation: University of Zurich
  publication_count: 42
  previous_employer: CSS Health AI (2016-2019)
  research_focus: primary=Swiss health ML, secondary=claims analysis

Entity: researcher/ingrid_adeyemi
  affiliation: MIT CSAIL
  publication_count: 56
  previous_employer: SWICA AI (2018-2021)
  research_focus: primary=Swiss insurance ML, secondary=preventive care

Entity: researcher/takumi_lindstrom
  affiliation: Stanford AI Lab
  publication_count: 73
  previous_employer: Helsana AI (2017-2020)
  research_focus: primary=Swiss managed care ML, secondary=utilization

Entity: researcher/amalie_adeyemi
  affiliation: Carnegie Mellon SCS
  publication_count: 35
  previous_employer: Barmer AI (2018-2021)
  research_focus: primary=German statutory health ML, secondary=DRG coding

Entity: researcher/seun_lindstrom
  affiliation: UC Berkeley EECS
  publication_count: 61
  previous_employer: TK AI (2016-2019)
  research_focus: primary=German public health ML, secondary=chronic care

Entity: researcher/yuki_adeyemi
  affiliation: Oxford CS
  publication_count: 48
  previous_employer: AOK AI (2018-2021)
  research_focus: primary=German regional health ML, secondary=prevention

Entity: researcher/hector_adeyemi
  affiliation: Cambridge AI
  publication_count: 82
  previous_employer: NHS England AI (2017-2020)
  research_focus: primary=UK national health ML, secondary=waiting times

Entity: researcher/fatou_adeyemi
  affiliation: ETH Zurich
  publication_count: 39
  previous_employer: NHS Scotland AI (2018-2021)
  research_focus: primary=Scottish health ML, secondary=health equity

Entity: researcher/bogdan_adeyemi
  affiliation: EPFL
  publication_count: 54
  previous_employer: CPAM AI (2016-2019)
  research_focus: primary=French social health ML, secondary=reimbursement

Entity: researcher/chidinma_lindqvist
  affiliation: TU Berlin
  publication_count: 66
  previous_employer: DAK AI (2018-2021)
  research_focus: primary=German health fund ML, secondary=disease management

Entity: researcher/kazuki_lindstrom
  affiliation: University of Toronto
  publication_count: 44
  previous_employer: OHIP AI (2017-2020)
  research_focus: primary=Ontario health insurance ML, secondary=billing analysis

Entity: researcher/ingeborg_lindstrom
  affiliation: University of Amsterdam
  publication_count: 57
  previous_employer: Zilveren Kruis AI (2018-2021)
  research_focus: primary=Dutch health insurance ML, secondary=bundled payments

Entity: researcher/kweku_lindstrom
  affiliation: KU Leuven
  publication_count: 71
  previous_employer: Mutualité Chrétienne AI (2016-2019)
  research_focus: primary=Belgian mutuality ML, secondary=population health

Entity: researcher/olena_adeyemi
  affiliation: Peking University
  publication_count: 36
  previous_employer: NHSA China AI (2018-2021)
  research_focus: primary=Chinese national health ML, secondary=diagnosis coding

Entity: researcher/emeka_lindstrom
  affiliation: Tsinghua CS
  publication_count: 79
  previous_employer: Beijing Municipal Health AI (2017-2020)
  research_focus: primary=Beijing health system ML, secondary=chronic disease

Entity: researcher/sigrid_lindqvist
  affiliation: University of Tokyo
  publication_count: 43
  previous_employer: MHLW AI (2018-2021)
  research_focus: primary=Japanese national health ML, secondary=DPC coding

Entity: researcher/ahmed_lindstrom
  affiliation: Seoul National University
  publication_count: 68
  previous_employer: NHIS Korea AI (2016-2019)
  research_focus: primary=Korean national health ML, secondary=cancer screening

Entity: researcher/oluwabunmi_lindqvist
  affiliation: IIT Bombay
  publication_count: 52
  previous_employer: IRDAI AI (2018-2021)
  research_focus: primary=Indian health insurance ML, secondary=claims fraud

Entity: researcher/ingrid_lindstrom
  affiliation: University of Cape Town
  publication_count: 37
  previous_employer: Discovery Health AI (2017-2020)
  research_focus: primary=South African health ML, secondary=Vitality programme

Entity: researcher/joao_adeyemi
  affiliation: Universidade de São Paulo
  publication_count: 74
  previous_employer: ANS Brazil AI (2018-2021)
  research_focus: primary=Brazilian private health ML, secondary=OPS network

Entity: researcher/chidera_lindstrom
  affiliation: Tel Aviv University
  publication_count: 46
  previous_employer: Maccabi Health AI (2016-2019)
  research_focus: primary=Israeli HMO ML, secondary=chronic disease management

Entity: researcher/hiroshi_adeyemi
  affiliation: Hebrew University
  publication_count: 61
  previous_employer: Clalit Health AI (2018-2021)
  research_focus: primary=Israeli largest HMO ML, secondary=early detection

Entity: researcher/oluwatoyin_lindstrom
  affiliation: Technion
  publication_count: 33
  previous_employer: Meuhedet AI (2017-2020)
  research_focus: primary=Israeli preventive care ML, secondary=population health

Entity: researcher/malin_lindstrom
  affiliation: Leiden University
  publication_count: 86
  previous_employer: VGZ AI (2018-2021)
  research_focus: primary=Dutch health cooperative ML, secondary=member engagement

Entity: researcher/chukwuebuka_adeyemi
  affiliation: University of Helsinki
  publication_count: 49
  previous_employer: Kela AI (2016-2019)
  research_focus: primary=Finnish social insurance ML, secondary=disability benefits

Entity: researcher/sakura_adeyemi
  affiliation: Warsaw University of Technology
  publication_count: 65
  previous_employer: ZUS AI (2018-2021)
  research_focus: primary=Polish social insurance ML, secondary=pension prediction

Entity: researcher/kwame_lindstrom
  affiliation: Ghent University
  publication_count: 41
  previous_employer: INAMI AI (2017-2020)
  research_focus: primary=Belgian health insurance ML, secondary=healthcare spending

Entity: researcher/naomi_lindstrom
  affiliation: University of Copenhagen
  publication_count: 58
  previous_employer: Danish Health Authority AI (2018-2021)
  research_focus: primary=Danish public health ML, secondary=preventive care

Entity: researcher/antonio_lindstrom
  affiliation: Université Paris-Saclay
  publication_count: 77
  previous_employer: CNAMTS AI (2016-2019)
  research_focus: primary=French national health ML, secondary=prescription analytics

Entity: researcher/priya_lindstrom
  affiliation: Max Planck Institute for Intelligent Systems
  publication_count: 44
  previous_employer: Charité Hospital AI (2018-2021)
  research_focus: primary=German university hospital ML, secondary=sepsis prediction

Entity: researcher/nkechi_oberg
  affiliation: Vector Institute
  publication_count: 68
  previous_employer: University Health Network AI (2017-2020)
  research_focus: primary=Canadian academic health ML, secondary=patient flow

Entity: researcher/anders_adeyemi
  affiliation: Mila
  publication_count: 53
  previous_employer: CHUM AI (2018-2021)
  research_focus: primary=Québec academic health ML, secondary=ED prediction

Entity: researcher/oluwaseun_lindqvist
  affiliation: Allen Institute for AI
  publication_count: 39
  previous_employer: Mayo Clinic AI (2016-2019)
  research_focus: primary=precision medicine ML, secondary=rare disease

Entity: researcher/sophy_adeyemi
  affiliation: National University of Singapore
  publication_count: 72
  previous_employer: National University Hospital AI (2018-2021)
  research_focus: primary=Singapore academic health ML, secondary=cardiac prediction

Entity: researcher/chukwudi_lindstrom
  affiliation: Nanyang Technological University
  publication_count: 45
  previous_employer: Tan Tock Seng AI (2017-2020)
  research_focus: primary=infectious disease ML, secondary=contact tracing

Entity: researcher/seungmin_lindstrom
  affiliation: KAIST
  publication_count: 67
  previous_employer: Asan Medical Center AI (2018-2021)
  research_focus: primary=Korean academic hospital ML, secondary=lung cancer

Entity: researcher/oluwatobi_lindahl
  affiliation: Hong Kong University of Science and Technology
  publication_count: 34
  previous_employer: Pamela Youde Nethersole Eastern Hospital AI (2016-2019)
  research_focus: primary=Hong Kong public hospital ML, secondary=triage

Entity: researcher/giulia_lindstrom
  affiliation: Purdue University
  publication_count: 81
  previous_employer: Indiana University Health AI (2018-2021)
  research_focus: primary=Midwest academic health ML, secondary=opioid prediction

Entity: researcher/nina_adeyemi
  affiliation: University of Michigan
  publication_count: 56
  previous_employer: Michigan Medicine AI (2017-2020)
  research_focus: primary=academic medical center ML, secondary=sepsis

Entity: researcher/chidi_lindstrom
  affiliation: UT Austin CS
  publication_count: 43
  previous_employer: Seton Medical Center AI (2018-2021)
  research_focus: primary=Texas health system ML, secondary=length of stay

Entity: researcher/hana_lindstrom
  affiliation: University of Washington
  publication_count: 69
  previous_employer: UW Medical Center AI (2016-2019)
  research_focus: primary=Pacific Northwest academic health ML, secondary=ICU

Entity: researcher/emeka_lindqvist
  affiliation: NYU CS
  publication_count: 38
  previous_employer: NYU Langone Health AI (2018-2021)
  research_focus: primary=Manhattan health ML, secondary=clinical phenotyping

Entity: researcher/soren_lindstrom
  affiliation: Princeton CS
  publication_count: 75
  previous_employer: Princeton Medical Center AI (2017-2020)
  research_focus: primary=NJ health system ML, secondary=preventive analytics

Entity: researcher/adaeze_lindstrom
  affiliation: Yale CS
  publication_count: 48
  previous_employer: Yale New Haven Health AI (2018-2021)
  research_focus: primary=Connecticut health ML, secondary=care coordination

Entity: researcher/jiro_lindstrom
  affiliation: Johns Hopkins CS
  publication_count: 62
  previous_employer: Johns Hopkins Health System AI (2016-2019)
  research_focus: primary=Baltimore health ML, secondary=health disparities

Entity: researcher/fatou_lindstrom
  affiliation: University of Edinburgh
  publication_count: 33
  previous_employer: Edinburgh Royal Infirmary AI (2018-2021)
  research_focus: primary=Scottish academic health ML, secondary=elective surgery

Entity: researcher/oluwabimpe_adeyemi
  affiliation: University of Glasgow
  publication_count: 57
  previous_employer: Glasgow Royal Infirmary AI (2017-2020)
  research_focus: primary=West Scotland health ML, secondary=emergency medicine

Entity: researcher/yuka_adeyemi
  affiliation: University of Bristol
  publication_count: 44
  previous_employer: Bristol Royal Hospital AI (2018-2021)
  research_focus: primary=Southwest England health ML, secondary=maternity

Entity: researcher/chibueze_adeyemi
  affiliation: Aalborg University
  publication_count: 76
  previous_employer: Aalborg University Hospital AI (2016-2019)
  research_focus: primary=North Denmark health ML, secondary=geriatrics

Entity: researcher/katrin_lindstrom
  affiliation: Delft University of Technology
  publication_count: 39
  previous_employer: Erasmus University Medical Center AI (2018-2021)
  research_focus: primary=Rotterdam health ML, secondary=oncology

Entity: researcher/obinna_lindstrom
  affiliation: University of Zurich
  publication_count: 63
  previous_employer: Zurich UniversitätsSpital AI (2017-2020)
  research_focus: primary=Swiss university hospital ML, secondary=rare diseases

Entity: researcher/ryo_lindstrom
  affiliation: MIT CSAIL
  publication_count: 54
  previous_employer: Massachusetts General Hospital AI (2018-2021)
  research_focus: primary=Boston health ML, secondary=radiology AI

Entity: researcher/alinta_lindstrom
  affiliation: Stanford AI Lab
  publication_count: 71
  previous_employer: Stanford Medicine AI (2016-2019)
  research_focus: primary=California academic health ML, secondary=genomics

Entity: researcher/joachim_lindstrom
  affiliation: Carnegie Mellon SCS
  publication_count: 37
  previous_employer: UPMC AI (2018-2021)
  research_focus: primary=Pittsburgh health ML, secondary=surgical robotics

Entity: researcher/efua_adeyemi
  affiliation: UC Berkeley EECS
  publication_count: 85
  previous_employer: UCSF Medical Center AI (2017-2020)
  research_focus: primary=Bay Area health ML, secondary=precision oncology

Entity: researcher/soren_adeyemi_jr
  affiliation: Oxford CS
  publication_count: 42
  previous_employer: Oxford University Hospitals AI (2018-2021)
  research_focus: primary=UK academic health ML, secondary=cardiac surgery

Entity: researcher/naomi_adeyemi
  affiliation: Cambridge AI
  publication_count: 58
  previous_employer: Addenbrooke's Hospital AI (2016-2019)
  research_focus: primary=Cambridge health ML, secondary=metabolic disease

Entity: researcher/tariq_lindstrom
  affiliation: ETH Zurich
  publication_count: 67
  previous_employer: Inselspital AI (2018-2021)
  research_focus: primary=Swiss federal health ML, secondary=intensive care

Entity: researcher/oluwakayode_adeyemi
  affiliation: EPFL
  publication_count: 35
  previous_employer: CHUV Lausanne AI (2017-2020)
  research_focus: primary=Romandy health ML, secondary=pediatrics

Entity: researcher/haruki_lindstrom
  affiliation: TU Berlin
  publication_count: 79
  previous_employer: Vivantes AI (2018-2021)
  research_focus: primary=Berlin public hospital ML, secondary=stroke

Entity: researcher/chiamaka_adeyemi
  affiliation: University of Toronto
  publication_count: 46
  previous_employer: Sunnybrook Health Sciences AI (2016-2019)
  research_focus: primary=Toronto academic health ML, secondary=trauma

Entity: researcher/nikolai_lindstrom
  affiliation: University of Amsterdam
  publication_count: 61
  previous_employer: Amsterdam UMC AI (2018-2021)
  research_focus: primary=Amsterdam health ML, secondary=transplantation

Entity: researcher/oluwafunmilayo_lindstrom
  affiliation: KU Leuven
  publication_count: 43
  previous_employer: UZ Leuven AI (2017-2020)
  research_focus: primary=Belgian academic health ML, secondary=hematology

Entity: researcher/hyunjin_adeyemi
  affiliation: Peking University
  publication_count: 78
  previous_employer: Peking University First Hospital AI (2018-2021)
  research_focus: primary=Beijing academic health ML, secondary=nephrology

Entity: researcher/chioma_lindstrom
  affiliation: Tsinghua CS
  publication_count: 54
  previous_employer: Beijing Tsinghua Changgung Hospital AI (2016-2019)
  research_focus: primary=Tsinghua medical AI, secondary=hepatology

Entity: researcher/rasmus_adeyemi
  affiliation: University of Tokyo
  publication_count: 33
  previous_employer: University of Tokyo Hospital AI (2018-2021)
  research_focus: primary=Japanese academic hospital ML, secondary=endocrinology

Entity: researcher/adaeze_erikssen
  affiliation: Seoul National University
  publication_count: 70
  previous_employer: Seoul National University Bundang Hospital AI (2017-2020)
  research_focus: primary=Seoul academic health ML, secondary=neurology

Entity: researcher/bogdan_lindstrom
  affiliation: IIT Bombay
  publication_count: 47
  previous_employer: Tata Memorial Centre AI (2018-2021)
  research_focus: primary=Mumbai oncology ML, secondary=cancer genomics

Entity: researcher/amara_adeyemi
  affiliation: University of Cape Town
  publication_count: 66
  previous_employer: Groote Schuur Hospital AI (2016-2019)
  research_focus: primary=Cape Town academic health ML, secondary=HIV care

Entity: researcher/fumiko_voss
  affiliation: Universidade de São Paulo
  publication_count: 39
  previous_employer: InCor AI (2018-2021)
  research_focus: primary=Brazilian cardiac ML, secondary=heart failure

Entity: researcher/leon_lindstrom
  affiliation: Tel Aviv University
  publication_count: 52
  previous_employer: Sheba Academic Medical Center AI (2017-2020)
  research_focus: primary=Israeli academic health ML, secondary=immunotherapy

Entity: researcher/oluwafemi_lindstrom
  affiliation: Hebrew University
  publication_count: 74
  previous_employer: Hadassah Medical Center AI (2018-2021)
  research_focus: primary=Jerusalem academic health ML, secondary=neurosurgery

Entity: researcher/kristoffer_lindstrom
  affiliation: Technion
  publication_count: 44
  previous_employer: Rambam Medical Center AI (2016-2019)
  research_focus: primary=Haifa academic health ML, secondary=rehabilitation

Entity: researcher/yuna_lindstrom
  affiliation: Leiden University
  publication_count: 67
  previous_employer: LUMC AI (2018-2021)
  research_focus: primary=Leiden academic health ML, secondary=genetics

Entity: researcher/oluwakemi_lindstrom_jr
  affiliation: University of Helsinki
  publication_count: 35
  previous_employer: Helsinki University Hospital AI (2017-2020)
  research_focus: primary=Finnish academic health ML, secondary=epilepsy

Entity: researcher/daichi_lindstrom
  affiliation: Warsaw University of Technology
  publication_count: 81
  previous_employer: Medical University of Warsaw AI (2018-2021)
  research_focus: primary=Warsaw academic health ML, secondary=cardiology

Entity: researcher/amira_adeyemi
  affiliation: Ghent University
  publication_count: 48
  previous_employer: UZ Ghent AI (2016-2019)
  research_focus: primary=Ghent academic health ML, secondary=rheumatology

Entity: researcher/emre_adeyemi
  affiliation: University of Copenhagen
  publication_count: 57
  previous_employer: Rigshospitalet AI (2018-2021)
  research_focus: primary=Copenhagen academic health ML, secondary=oncology

Entity: researcher/chidinma_lindstrom_jr
  affiliation: Université Paris-Saclay
  publication_count: 73
  previous_employer: Gustave Roussy AI (2017-2020)
  research_focus: primary=Paris cancer center ML, secondary=radiotherapy

Entity: researcher/yuya_lindstrom
  affiliation: Max Planck Institute for Intelligent Systems
  publication_count: 41
  previous_employer: MPI for Informatics AI (2018-2021)
  research_focus: primary=computational biology ML, secondary=bioinformatics

Entity: researcher/oluwaseun_adeyemi
  affiliation: Vector Institute
  publication_count: 65
  previous_employer: OICR AI (2016-2019)
  research_focus: primary=Ontario cancer ML, secondary=biomarker discovery

Entity: researcher/sigrid_adeyemi
  affiliation: Mila
  publication_count: 38
  previous_employer: Princess Margaret Cancer Centre AI (2018-2021)
  research_focus: primary=Toronto oncology ML, secondary=radiomics

Entity: researcher/oluwabunmi_adeyemi
  affiliation: Allen Institute for AI
  publication_count: 76
  previous_employer: Fred Hutchinson Cancer AI (2017-2020)
  research_focus: primary=Seattle oncology ML, secondary=immunology

Entity: researcher/kenta_lindstrom
  affiliation: National University of Singapore
  publication_count: 52
  previous_employer: National Cancer Centre Singapore AI (2018-2021)
  research_focus: primary=Singapore oncology ML, secondary=Asian cancer genomics

Entity: researcher/chibueze_lindstrom_jr
  affiliation: Nanyang Technological University
  publication_count: 43
  previous_employer: SingHealth AI (2016-2019)
  research_focus: primary=Singapore academic health ML, secondary=tertiary care

Entity: researcher/sung_jun_adeyemi
  affiliation: KAIST
  publication_count: 69
  previous_employer: National Cancer Center Korea AI (2018-2021)
  research_focus: primary=Korean oncology ML, secondary=gastric cancer

Entity: researcher/oluwatoyin_adeyemi
  affiliation: Hong Kong University of Science and Technology
  publication_count: 34
  previous_employer: Queen Elizabeth Hospital AI (2017-2020)
  research_focus: primary=Hong Kong academic health ML, secondary=orthopedics

Entity: researcher/astrid_adeyemi
  affiliation: Purdue University
  publication_count: 88
  previous_employer: Purdue University Health Center AI (2018-2021)
  research_focus: primary=Midwest college health ML, secondary=mental health

Entity: researcher/mikael_lindstrom
  affiliation: University of Michigan
  publication_count: 47
  previous_employer: Michigan Medicine Oncology AI (2016-2019)
  research_focus: primary=Michigan oncology ML, secondary=hematological malignancy

Entity: researcher/oluwatobi_adeyemi
  affiliation: UT Austin CS
  publication_count: 60
  previous_employer: UT MD Anderson AI (2018-2021)
  research_focus: primary=Texas cancer ML, secondary=precision oncology

Entity: researcher/kazuya_adeyemi
  affiliation: University of Washington
  publication_count: 36
  previous_employer: Fred Hutch AI (2017-2020)
  research_focus: primary=Pacific Northwest cancer ML, secondary=stem cell transplant

Entity: researcher/oluwakayode_lindstrom
  affiliation: NYU CS
  publication_count: 72
  previous_employer: NYU Langone Perlmutter Cancer AI (2018-2021)
  research_focus: primary=New York oncology ML, secondary=melanoma

Entity: researcher/chidera_lindstrom_jr
  affiliation: Princeton CS
  publication_count: 49
  previous_employer: Rutgers Cancer Institute AI (2016-2019)
  research_focus: primary=New Jersey oncology ML, secondary=breast cancer

Entity: researcher/fumiya_adeyemi
  affiliation: Yale CS
  publication_count: 63
  previous_employer: Smilow Cancer Hospital AI (2018-2021)
  research_focus: primary=Yale oncology ML, secondary=lung cancer

Entity: researcher/oluwafunmilayo_adeyemi
  affiliation: Johns Hopkins CS
  publication_count: 37
  previous_employer: Kimmel Cancer Center AI (2017-2020)
  research_focus: primary=Johns Hopkins oncology ML, secondary=pancreatic cancer

Entity: researcher/nkechi_lindstrom_jr
  affiliation: University of Edinburgh
  publication_count: 55
  previous_employer: Edinburgh Cancer Research AI (2018-2021)
  research_focus: primary=Scottish oncology ML, secondary=colorectal cancer

Entity: researcher/hirotaka_adeyemi
  affiliation: University of Glasgow
  publication_count: 42
  previous_employer: Beatson Cancer Centre AI (2016-2019)
  research_focus: primary=Glasgow oncology ML, secondary=ovarian cancer

Entity: researcher/oluwabimpe_lindstrom_jr
  affiliation: University of Bristol
  publication_count: 77
  previous_employer: Bristol Cancer Institute AI (2018-2021)
  research_focus: primary=Southwest England oncology ML, secondary=prostate cancer

Entity: researcher/emeka_lindstrom_jr
  affiliation: Aalborg University
  publication_count: 46
  previous_employer: Aalborg AKH AI (2017-2020)
  research_focus: primary=Danish oncology ML, secondary=lymphoma

Entity: researcher/hana_lindstrom_jr
  affiliation: Delft University of Technology
  publication_count: 61
  previous_employer: Erasmus Cancer Institute AI (2018-2021)
  research_focus: primary=Rotterdam oncology ML, secondary=sarcoma

Entity: researcher/chiamaka_lindstrom_jr
  affiliation: University of Zurich
  publication_count: 38
  previous_employer: Comprehensive Cancer Center Zurich AI (2016-2019)
  research_focus: primary=Swiss oncology ML, secondary=glioblastoma

Entity: researcher/riku_lindstrom
  affiliation: MIT CSAIL
  publication_count: 74
  previous_employer: Koch Institute AI (2018-2021)
  research_focus: primary=MIT cancer ML, secondary=drug delivery

Entity: researcher/chidinma_mensah_jr
  affiliation: Stanford AI Lab
  publication_count: 53
  previous_employer: Stanford Cancer Institute AI (2017-2020)
  research_focus: primary=Stanford oncology ML, secondary=immunotherapy

Entity: researcher/felix_lindstrom
  affiliation: Carnegie Mellon SCS
  publication_count: 44
  previous_employer: Hillman Cancer Center AI (2018-2021)
  research_focus: primary=Pittsburgh oncology ML, secondary=neuro-oncology

Entity: researcher/naomi_lindqvist
  affiliation: UC Berkeley EECS
  publication_count: 66
  previous_employer: UCSF Helen Diller AI (2016-2019)
  research_focus: primary=Bay Area oncology ML, secondary=clinical trials

Entity: researcher/chukwudi_lindstrom_jr
  affiliation: Oxford CS
  publication_count: 39
  previous_employer: Oxford Cancer Centre AI (2018-2021)
  research_focus: primary=Oxford oncology ML, secondary=tumor microenvironment

Entity: researcher/sigrid_lindgren
  affiliation: Cambridge AI
  publication_count: 78
  previous_employer: Cambridge Cancer Centre AI (2017-2020)
  research_focus: primary=Cambridge oncology ML, secondary=liquid biopsy

Entity: researcher/adaobi_lindstrom_jr
  affiliation: ETH Zurich
  publication_count: 47
  previous_employer: ETHZ Cancer Biology AI (2018-2021)
  research_focus: primary=Swiss cancer biology ML, secondary=single-cell

Entity: researcher/soren_lindstrom_jr
  affiliation: EPFL
  publication_count: 60
  previous_employer: EPFL Cancer Research AI (2016-2019)
  research_focus: primary=Lausanne oncology ML, secondary=epigenomics

Entity: researcher/yuriko_lindstrom_jr
  affiliation: TU Berlin
  publication_count: 33
  previous_employer: BIH AI (2018-2021)
  research_focus: primary=Berlin Health Institute ML, secondary=translational research

Entity: researcher/oluwakemi_lindstrom_sr
  affiliation: University of Toronto
  publication_count: 85
  previous_employer: OICR AI (2017-2020)
  research_focus: primary=Toronto cancer ML, secondary=single-cell genomics

Entity: researcher/nicholas_lindstrom
  affiliation: University of Amsterdam
  publication_count: 52
  previous_employer: NKI AI (2018-2021)
  research_focus: primary=Amsterdam oncology ML, secondary=breast cancer genomics

Entity: researcher/chukwuebuka_lindstrom
  affiliation: KU Leuven
  publication_count: 41
  previous_employer: VIB AI (2016-2019)
  research_focus: primary=Belgian cancer biology ML, secondary=immuno-oncology

Entity: researcher/sakura_lindqvist
  affiliation: Peking University
  publication_count: 68
  previous_employer: Peking University Cancer Hospital AI (2018-2021)
  research_focus: primary=Beijing oncology ML, secondary=esophageal cancer

Entity: researcher/adebayo_lindstrom
  affiliation: Tsinghua CS
  publication_count: 75
  previous_employer: Tsinghua University School of Medicine AI (2017-2020)
  research_focus: primary=Tsinghua oncology ML, secondary=hepatocellular carcinoma

Entity: researcher/ryo_lindstrom_jr
  affiliation: University of Tokyo
  publication_count: 44
  previous_employer: National Cancer Center Japan AI (2018-2021)
  research_focus: primary=Japanese oncology ML, secondary=colorectal cancer

Entity: researcher/christel_lindstrom
  affiliation: Seoul National University
  publication_count: 57
  previous_employer: Asan Cancer Center AI (2016-2019)
  research_focus: primary=Korean oncology ML, secondary=thyroid cancer

Entity: researcher/kwabena_lindstrom_jr
  affiliation: IIT Bombay
  publication_count: 36
  previous_employer: Tata Memorial Hospital AI (2018-2021)
  research_focus: primary=Indian oncology ML, secondary=oral cancer

Entity: researcher/oluwafunke_lindstrom_jr
  affiliation: University of Cape Town
  publication_count: 79
  previous_employer: CANSA AI (2017-2020)
  research_focus: primary=South African oncology ML, secondary=cervical cancer

Entity: researcher/jiro_lindstrom_jr
  affiliation: Universidade de São Paulo
  publication_count: 43
  previous_employer: A.C. Camargo Cancer Center AI (2018-2021)
  research_focus: primary=Brazilian oncology ML, secondary=head and neck cancer

Entity: researcher/nneka_lindstrom
  affiliation: Tel Aviv University
  publication_count: 65
  previous_employer: Sheba Cancer Institute AI (2016-2019)
  research_focus: primary=Israeli oncology ML, secondary=renal cell carcinoma

Entity: researcher/bjoern_lindstrom
  affiliation: Hebrew University
  publication_count: 38
  previous_employer: Shaare Zedek Cancer AI (2018-2021)
  research_focus: primary=Jerusalem oncology ML, secondary=leukemia

Entity: researcher/chiamaka_lindstrom_sr
  affiliation: Technion
  publication_count: 72
  previous_employer: Technion Institute for Cancer Research AI (2017-2020)
  research_focus: primary=Haifa oncology ML, secondary=bladder cancer

Entity: researcher/haruto_lindstrom_jr
  affiliation: Leiden University
  publication_count: 54
  previous_employer: LUMC Oncology AI (2018-2021)
  research_focus: primary=Leiden oncology ML, secondary=mesothelioma

Entity: researcher/adaeze_gronqvist_jr
  affiliation: University of Helsinki
  publication_count: 41
  previous_employer: Helsinki Comprehensive Cancer Centre AI (2016-2019)
  research_focus: primary=Finnish oncology ML, secondary=lymphoma

Entity: researcher/kweku_nakamura_jr
  affiliation: Warsaw University of Technology
  publication_count: 67
  previous_employer: Centrum Onkologii Warsaw AI (2018-2021)
  research_focus: primary=Polish oncology ML, secondary=lung cancer

Entity: researcher/oluwasegun_lindstrom_jr
  affiliation: Ghent University
  publication_count: 45
  previous_employer: UZ Ghent Oncology AI (2017-2020)
  research_focus: primary=Ghent oncology ML, secondary=thyroid cancer

Entity: researcher/yuki_lindstrom_jr
  affiliation: University of Copenhagen
  publication_count: 58
  previous_employer: Rigshospitalet Oncology AI (2018-2021)
  research_focus: primary=Copenhagen oncology ML, secondary=skin cancer

Entity: researcher/adeola_lindstrom_jr
  affiliation: Université Paris-Saclay
  publication_count: 82
  previous_employer: Institut Curie AI (2016-2019)
  research_focus: primary=Paris oncology ML, secondary=breast cancer genomics

Entity: researcher/tobias_lindstrom
  affiliation: Max Planck Institute for Intelligent Systems
  publication_count: 37
  previous_employer: DKFZ AI (2018-2021)
  research_focus: primary=German cancer center ML, secondary=translational imaging

Entity: researcher/chibuike_lindstrom_jr
  affiliation: Vector Institute
  publication_count: 71
  previous_employer: OCC AI (2017-2020)
  research_focus: primary=Ontario cancer research ML, secondary=endometrial cancer

Entity: researcher/fumika_lindstrom_jr
  affiliation: Mila
  publication_count: 48
  previous_employer: CHUM Cancer Centre AI (2018-2021)
  research_focus: primary=Montréal oncology ML, secondary=colorectal cancer

Entity: researcher/obafemi_lindstrom_jr
  affiliation: Allen Institute for AI
  publication_count: 63
  previous_employer: Allen Institute for Cell Science AI (2016-2019)
  research_focus: primary=cell biology ML, secondary=organoid modeling

Entity: researcher/kenta_lindstrom_jr
  affiliation: National University of Singapore
  publication_count: 39
  previous_employer: NUS Cancer Science Institute AI (2018-2021)
  research_focus: primary=Singapore cancer ML, secondary=drug resistance

Entity: researcher/oluwakayode_lindstrom_jr
  affiliation: Nanyang Technological University
  publication_count: 76
  previous_employer: NTU Cancer Research AI (2017-2020)
  research_focus: primary=Nanyang cancer ML, secondary=nanomedicine

Entity: researcher/daichi_lindstrom_jr
  affiliation: KAIST
  publication_count: 52
  previous_employer: KAIST Cancer Research AI (2018-2021)
  research_focus: primary=Korean cancer ML, secondary=cell signaling

Entity: researcher/chiamaka_lindstrom_ii
  affiliation: Hong Kong University of Science and Technology
  publication_count: 44
  previous_employer: HKUST Cancer Research AI (2016-2019)
  research_focus: primary=Hong Kong cancer ML, secondary=microbiome

Entity: researcher/nikolai_lindstrom_jr
  affiliation: Purdue University
  publication_count: 68
  previous_employer: Purdue Cancer Center AI (2018-2021)
  research_focus: primary=Midwestern cancer ML, secondary=pancreatic cancer

Entity: researcher/bjoern_lindstrom_jr
  affiliation: University of Michigan
  publication_count: 35
  previous_employer: Rogel Cancer Center AI (2017-2020)
  research_focus: primary=Michigan cancer ML, secondary=brain tumor

Entity: researcher/adeola_lindstrom_sr
  affiliation: UT Austin CS
  publication_count: 79
  previous_employer: MD Anderson Cancer Center AI (2018-2021)
  research_focus: primary=Texas cancer ML, secondary=acute leukemia

Entity: researcher/fumio_lindstrom_jr
  affiliation: University of Washington
  publication_count: 44
  previous_employer: Seattle Cancer Care Alliance AI (2016-2019)
  research_focus: primary=Washington cancer ML, secondary=multiple myeloma

Entity: researcher/sigrid_lindstrom_jr
  affiliation: NYU CS
  publication_count: 62
  previous_employer: NYU Perlmutter Cancer AI (2018-2021)
  research_focus: primary=New York cancer ML, secondary=pancreatic oncology

Entity: researcher/adeola_lindstrom_ii
  affiliation: Princeton CS
  publication_count: 37
  previous_employer: Princeton Cancer Institute AI (2017-2020)
  research_focus: primary=NJ cancer ML, secondary=prostate cancer genomics

Entity: researcher/chidinma_lindstrom_ii
  affiliation: Yale CS
  publication_count: 81
  previous_employer: Yale Cancer Center AI (2018-2021)
  research_focus: primary=Yale cancer ML, secondary=ovarian cancer

Entity: researcher/fumika_lindstrom_ii
  affiliation: Johns Hopkins CS
  publication_count: 53
  previous_employer: Sidney Kimmel Comprehensive Cancer Center AI (2016-2019)
  research_focus: primary=Hopkins cancer ML, secondary=bladder cancer

Entity: researcher/oluwabimpe_lindstrom_ii
  affiliation: University of Edinburgh
  publication_count: 42
  previous_employer: Edinburgh Cancer Research Centre AI (2018-2021)
  research_focus: primary=Edinburgh cancer ML, secondary=melanoma

Entity: researcher/christel_lindstrom_jr
  affiliation: University of Glasgow
  publication_count: 66
  previous_employer: CRUK Beatson Institute AI (2017-2020)
  research_focus: primary=Glasgow cancer ML, secondary=RAS signaling

Entity: researcher/adaeze_lindstrom_ii
  affiliation: University of Bristol
  publication_count: 39
  previous_employer: Bristol Cancer Research UK AI (2018-2021)
  research_focus: primary=Bristol cancer ML, secondary=tumor heterogeneity

Entity: researcher/oluwafunke_lindstrom_ii
  affiliation: Aalborg University
  publication_count: 73
  previous_employer: Danish Cancer Society AI (2016-2019)
  research_focus: primary=Danish cancer ML, secondary=cancer registry ML

Entity: researcher/kweku_lindstrom_jr
  affiliation: Delft University of Technology
  publication_count: 48
  previous_employer: Netherlands Cancer Institute AI (2018-2021)
  research_focus: primary=Dutch cancer ML, secondary=chromosomal instability

Entity: researcher/chioma_lindstrom_jr
  affiliation: University of Zurich
  publication_count: 61
  previous_employer: Zurich University Cancer Centre AI (2017-2020)
  research_focus: primary=Swiss cancer ML, secondary=personalized radiotherapy

Entity: researcher/priya_ostrowski
  affiliation: MIT CSAIL
  publication_count: 63
  previous_employer: Google Brain (2017-2020)
  research_focus: primary=natural language processing, secondary=dialogue systems

Entity: researcher/oluwatobiloba_osei
  affiliation: Stanford AI Lab
  publication_count: 47
  previous_employer: Microsoft Research (2018-2021)
  research_focus: primary=machine learning, secondary=graph neural networks

Entity: researcher/amina_voss
  affiliation: Carnegie Mellon SCS
  publication_count: 75
  previous_employer: Amazon Science (2016-2019)
  research_focus: primary=reinforcement learning, secondary=planning

Entity: researcher/bogdan_lindahl
  affiliation: UC Berkeley EECS
  publication_count: 39
  previous_employer: DeepMind (2019-2022)
  research_focus: primary=computer vision, secondary=image segmentation

Entity: researcher/yuna_lindahl
  affiliation: Oxford CS
  publication_count: 68
  previous_employer: Meta AI (2017-2020)
  research_focus: primary=NLP, secondary=cross-lingual transfer

Entity: researcher/kwabena_voss
  affiliation: Cambridge AI
  publication_count: 53
  previous_employer: Apple Machine Learning Research (2018-2021)
  research_focus: primary=speech recognition, secondary=acoustic modeling

Entity: researcher/fatou_lindahl
  affiliation: ETH Zurich
  publication_count: 84
  previous_employer: NVIDIA Research (2016-2019)
  research_focus: primary=generative models, secondary=diffusion models

Entity: researcher/aleksei_lindahl
  affiliation: EPFL
  publication_count: 41
  previous_employer: Intel Labs (2018-2021)
  research_focus: primary=hardware-aware ML, secondary=energy efficiency

Entity: researcher/zainab_lindahl
  affiliation: TU Berlin
  publication_count: 57
  previous_employer: Siemens AI (2017-2020)
  research_focus: primary=industrial IoT ML, secondary=predictive maintenance

Entity: researcher/ryo_voss
  affiliation: University of Toronto
  publication_count: 70
  previous_employer: IBM Research (2018-2021)
  research_focus: primary=knowledge graphs, secondary=entity alignment

Entity: researcher/nadia_lindahl
  affiliation: University of Amsterdam
  publication_count: 44
  previous_employer: Booking.com AI (2016-2019)
  research_focus: primary=personalization, secondary=multi-armed bandits

Entity: researcher/pierre_lindahl
  affiliation: KU Leuven
  publication_count: 78
  previous_employer: Baidu Research (2018-2021)
  research_focus: primary=vision-language models, secondary=image captioning

Entity: researcher/sunita_lindahl
  affiliation: Peking University
  publication_count: 55
  previous_employer: Tencent AI Lab (2017-2020)
  research_focus: primary=social graph analysis, secondary=community detection

Entity: researcher/mikhail_lindahl
  affiliation: Tsinghua CS
  publication_count: 41
  previous_employer: Alibaba DAMO Academy (2018-2021)
  research_focus: primary=e-commerce ML, secondary=search optimization

Entity: researcher/ingeborg_lindahl
  affiliation: University of Tokyo
  publication_count: 76
  previous_employer: NTT Research (2016-2019)
  research_focus: primary=distributed ML, secondary=federated learning

Entity: researcher/kofi_lindahl
  affiliation: Seoul National University
  publication_count: 49
  previous_employer: Naver AI (2018-2021)
  research_focus: primary=Korean NLP, secondary=question answering

Entity: researcher/valentina_lindahl
  affiliation: IIT Bombay
  publication_count: 62
  previous_employer: Google Brain India (2017-2020)
  research_focus: primary=low-resource NLP, secondary=multilingual models

Entity: researcher/oluseun_lindahl
  affiliation: University of Cape Town
  publication_count: 37
  previous_employer: Telkom AI (2018-2021)
  research_focus: primary=African language NLP, secondary=code-switching

Entity: researcher/camila_lindahl
  affiliation: Universidade de São Paulo
  publication_count: 81
  previous_employer: Globo AI (2016-2019)
  research_focus: primary=Brazilian Portuguese NLP, secondary=content recommendation

Entity: researcher/ibrahim_lindahl
  affiliation: Tel Aviv University
  publication_count: 46
  previous_employer: Wix AI (2018-2021)
  research_focus: primary=web NLP, secondary=information extraction

Entity: researcher/mei_lindahl
  affiliation: Hebrew University
  publication_count: 69
  previous_employer: Mobileye AI (2017-2020)
  research_focus: primary=autonomous driving perception, secondary=computer vision

Entity: researcher/fredrik_lindahl
  affiliation: Technion
  publication_count: 54
  previous_employer: Applied Materials AI (2018-2021)
  research_focus: primary=semiconductor manufacturing ML, secondary=yield optimization

Entity: researcher/adaeze_lindhal
  affiliation: Leiden University
  publication_count: 43
  previous_employer: ASML Research (2016-2019)
  research_focus: primary=photolithography ML, secondary=overlay metrology

Entity: researcher/hamid_lindahl
  affiliation: University of Helsinki
  publication_count: 67
  previous_employer: Nokia AI (2018-2021)
  research_focus: primary=5G resource ML, secondary=interference management

Entity: researcher/anna_lindahl
  affiliation: Warsaw University of Technology
  publication_count: 40
  previous_employer: Orange Labs AI (2017-2020)
  research_focus: primary=telecom ML, secondary=customer experience

Entity: researcher/leon_lindahl
  affiliation: Ghent University
  publication_count: 75
  previous_employer: Proximus AI (2018-2021)
  research_focus: primary=Belgian telecom ML, secondary=network anomaly detection

Entity: researcher/hana_lindahl_jr
  affiliation: University of Copenhagen
  publication_count: 58
  previous_employer: TDC AI (2016-2019)
  research_focus: primary=Scandinavian telecom ML, secondary=churn prediction

Entity: researcher/victor_lindahl
  affiliation: Université Paris-Saclay
  publication_count: 46
  previous_employer: Orange France AI (2018-2021)
  research_focus: primary=French telecom ML, secondary=network planning

Entity: researcher/liu_lindahl
  affiliation: Max Planck Institute for Intelligent Systems
  publication_count: 70
  previous_employer: Ericsson AI (2017-2020)
  research_focus: primary=radio access network ML, secondary=beamforming

Entity: researcher/fatima_lindahl
  affiliation: Vector Institute
  publication_count: 37
  previous_employer: Telus AI (2018-2021)
  research_focus: primary=Canadian telecom ML, secondary=customer analytics

Entity: researcher/jose_lindahl
  affiliation: Mila
  publication_count: 83
  previous_employer: Bell Canada AI (2016-2019)
  research_focus: primary=Canadian network ML, secondary=traffic prediction

Entity: researcher/elena_lindahl
  affiliation: Allen Institute for AI
  publication_count: 49
  previous_employer: Verizon AI (2018-2021)
  research_focus: primary=US telecom ML, secondary=network quality

Entity: researcher/tanvir_lindahl
  affiliation: National University of Singapore
  publication_count: 64
  previous_employer: Singtel AI (2017-2020)
  research_focus: primary=Singapore telecom ML, secondary=predictive maintenance

Entity: researcher/nkechi_lindahl
  affiliation: Nanyang Technological University
  publication_count: 41
  previous_employer: StarHub AI (2018-2021)
  research_focus: primary=Southeast Asia telecom ML, secondary=spectrum management

Entity: researcher/lucas_lindahl
  affiliation: KAIST
  publication_count: 76
  previous_employer: KT AI (2016-2019)
  research_focus: primary=Korean telecom ML, secondary=5G optimization

Entity: researcher/sofie_lindahl
  affiliation: Hong Kong University of Science and Technology
  publication_count: 55
  previous_employer: PCCW AI (2018-2021)
  research_focus: primary=Hong Kong telecom ML, secondary=fiber network optimization

Entity: researcher/aryan_lindahl
  affiliation: Purdue University
  publication_count: 43
  previous_employer: AT&T AI (2017-2020)
  research_focus: primary=US broadband ML, secondary=quality of service

Entity: researcher/zara_lindahl
  affiliation: University of Michigan
  publication_count: 68
  previous_employer: Comcast AI (2018-2021)
  research_focus: primary=cable network ML, secondary=content delivery

Entity: researcher/emeka_lindahl
  affiliation: UT Austin CS
  publication_count: 40
  previous_employer: Charter Communications AI (2016-2019)
  research_focus: primary=US cable ML, secondary=customer retention

Entity: researcher/soo_jin_lindahl
  affiliation: University of Washington
  publication_count: 81
  previous_employer: T-Mobile AI (2018-2021)
  research_focus: primary=wireless ML, secondary=handover optimization

Entity: researcher/andile_lindahl
  affiliation: NYU CS
  publication_count: 56
  previous_employer: Sprint AI (2017-2020)
  research_focus: primary=US wireless ML, secondary=network densification

Entity: researcher/astrid_lindahl
  affiliation: Princeton CS
  publication_count: 45
  previous_employer: Dish Network AI (2018-2021)
  research_focus: primary=satellite ML, secondary=coverage optimization

Entity: researcher/rodrigo_lindahl
  affiliation: Yale CS
  publication_count: 69
  previous_employer: Intelsat AI (2016-2019)
  research_focus: primary=satellite communication ML, secondary=capacity planning

Entity: researcher/chidinma_lindahl
  affiliation: Johns Hopkins CS
  publication_count: 37
  previous_employer: Hughes Network AI (2018-2021)
  research_focus: primary=satellite internet ML, secondary=latency reduction

Entity: researcher/niklas_lindahl
  affiliation: University of Edinburgh
  publication_count: 74
  previous_employer: SES AI (2017-2020)
  research_focus: primary=European satellite ML, secondary=orbital optimization

Entity: researcher/amara_lindahl
  affiliation: University of Glasgow
  publication_count: 50
  previous_employer: Eutelsat AI (2018-2021)
  research_focus: primary=French satellite ML, secondary=direct-to-home optimization

Entity: researcher/hassan_lindahl
  affiliation: University of Bristol
  publication_count: 65
  previous_employer: OneWeb AI (2019-2022)
  research_focus: primary=LEO satellite ML, secondary=constellation management

Entity: researcher/nneka_lindahl
  affiliation: Aalborg University
  publication_count: 39
  previous_employer: SpaceX Starlink AI (2020-2023)
  research_focus: primary=megaconstellation ML, secondary=interference coordination

Entity: researcher/siddharth_lindahl
  affiliation: Delft University of Technology
  publication_count: 78
  previous_employer: Amazon Kuiper AI (2021-2023)
  research_focus: primary=LEO satellite NLP, secondary=ground station optimization

Entity: researcher/yuki_lindahl
  affiliation: University of Zurich
  publication_count: 54
  previous_employer: Eumetsat AI (2018-2021)
  research_focus: primary=meteorological satellite ML, secondary=cloud detection

Entity: researcher/vera_lindahl
  affiliation: MIT CSAIL
  publication_count: 46
  previous_employer: Planet Labs AI (2017-2020)
  research_focus: primary=Earth observation ML, secondary=change detection

Entity: researcher/benedikt_lindahl
  affiliation: Stanford AI Lab
  publication_count: 71
  previous_employer: Maxar AI (2018-2021)
  research_focus: primary=high-resolution satellite ML, secondary=object recognition

Entity: researcher/ishaan_lindahl
  affiliation: Carnegie Mellon SCS
  publication_count: 43
  previous_employer: DigitalGlobe AI (2016-2019)
  research_focus: primary=satellite imagery ML, secondary=geospatial analysis

Entity: researcher/oluwakemi_lindahl
  affiliation: UC Berkeley EECS
  publication_count: 86
  previous_employer: Google Earth Engine AI (2018-2021)
  research_focus: primary=geospatial ML, secondary=land use classification

Entity: researcher/anders_lindahl
  affiliation: Oxford CS
  publication_count: 57
  previous_employer: ESA AI Centre (2017-2020)
  research_focus: primary=European space ML, secondary=synthetic aperture radar

Entity: researcher/nour_lindahl
  affiliation: Cambridge AI
  publication_count: 45
  previous_employer: Airbus Defence AI (2018-2021)
  research_focus: primary=aerospace imaging ML, secondary=target recognition

Entity: researcher/chen_lindahl
  affiliation: ETH Zurich
  publication_count: 69
  previous_employer: RUAG AI (2016-2019)
  research_focus: primary=Swiss aerospace ML, secondary=maintenance prediction

Entity: researcher/sigrid_lindahl_jr
  affiliation: EPFL
  publication_count: 38
  previous_employer: EPFL Space Centre AI (2018-2021)
  research_focus: primary=space robotics ML, secondary=proximity operations

Entity: researcher/abel_lindahl
  affiliation: TU Berlin
  publication_count: 80
  previous_employer: DLR Space AI (2017-2020)
  research_focus: primary=German space ML, secondary=debris tracking

Entity: researcher/preethi_lindahl
  affiliation: University of Toronto
  publication_count: 49
  previous_employer: MDA Space AI (2018-2021)
  research_focus: primary=Canadian space ML, secondary=radar imagery

Entity: researcher/emre_lindahl
  affiliation: University of Amsterdam
  publication_count: 64
  previous_employer: ISIS Space AI (2016-2019)
  research_focus: primary=Dutch small satellite ML, secondary=attitude control

Entity: researcher/sonja_lindahl
  affiliation: KU Leuven
  publication_count: 41
  previous_employer: QinetiQ AI (2018-2021)
  research_focus: primary=Belgian defence ML, secondary=target tracking

Entity: researcher/kweku_lindahl_jr
  affiliation: Peking University
  publication_count: 75
  previous_employer: CAST AI (2017-2020)
  research_focus: primary=Chinese space ML, secondary=remote sensing

Entity: researcher/aya_lindahl
  affiliation: Tsinghua CS
  publication_count: 56
  previous_employer: CASC AI (2018-2021)
  research_focus: primary=Chinese launch vehicle ML, secondary=trajectory optimization

Entity: researcher/adebayo_lindahl_jr
  affiliation: University of Tokyo
  publication_count: 43
  previous_employer: JAXA AI (2016-2019)
  research_focus: primary=Japanese space ML, secondary=planetary exploration

Entity: researcher/hina_lindahl
  affiliation: Seoul National University
  publication_count: 68
  previous_employer: KARI AI (2018-2021)
  research_focus: primary=Korean space ML, secondary=satellite attitude control

Entity: researcher/marco_lindahl
  affiliation: IIT Bombay
  publication_count: 37
  previous_employer: ISRO AI (2017-2020)
  research_focus: primary=Indian space ML, secondary=Mars mission data

Entity: researcher/thandi_lindahl
  affiliation: University of Cape Town
  publication_count: 81
  previous_employer: SANSA AI (2018-2021)
  research_focus: primary=South African space ML, secondary=ionospheric monitoring

Entity: researcher/renata_lindahl
  affiliation: Universidade de São Paulo
  publication_count: 54
  previous_employer: AEB AI (2016-2019)
  research_focus: primary=Brazilian space ML, secondary=Amazonia satellite

Entity: researcher/bilal_lindahl
  affiliation: Tel Aviv University
  publication_count: 46
  previous_employer: IAI AI (2018-2021)
  research_focus: primary=Israeli aerospace ML, secondary=UAV guidance

Entity: researcher/chioma_lindahl_jr
  affiliation: Hebrew University
  publication_count: 70
  previous_employer: Elbit Space AI (2017-2020)
  research_focus: primary=Israeli satellite ML, secondary=electronic intelligence

Entity: researcher/fredrik_lindahl_jr
  affiliation: Technion
  publication_count: 38
  previous_employer: Rafael Advanced Defence AI (2018-2021)
  research_focus: primary=missile guidance ML, secondary=trajectory estimation

Entity: researcher/giulia_lindahl
  affiliation: Leiden University
  publication_count: 85
  previous_employer: Airbus Netherlands AI (2016-2019)
  research_focus: primary=Dutch aerospace ML, secondary=aeroelasticity

Entity: researcher/tariq_lindahl
  affiliation: University of Helsinki
  publication_count: 58
  previous_employer: Patria AI (2018-2021)
  research_focus: primary=Finnish defence ML, secondary=situation awareness

Entity: researcher/oluwatobi_lindahl_jr
  affiliation: Warsaw University of Technology
  publication_count: 45
  previous_employer: WB Electronics AI (2017-2020)
  research_focus: primary=Polish defence ML, secondary=radar signal processing

Entity: researcher/paloma_lindahl
  affiliation: Ghent University
  publication_count: 63
  previous_employer: Sabca AI (2018-2021)
  research_focus: primary=Belgian aerospace ML, secondary=flight control

Entity: researcher/leif_lindahl
  affiliation: University of Copenhagen
  publication_count: 50
  previous_employer: Terma AI (2016-2019)
  research_focus: primary=Danish aerospace ML, secondary=C2 systems

Entity: researcher/yasmin_lindahl
  affiliation: Université Paris-Saclay
  publication_count: 76
  previous_employer: Safran AI (2018-2021)
  research_focus: primary=French aerospace ML, secondary=engine health monitoring

Entity: researcher/oluwafemi_lindahl_jr
  affiliation: Max Planck Institute for Intelligent Systems
  publication_count: 35
  previous_employer: Diehl Defence AI (2017-2020)
  research_focus: primary=German defence ML, secondary=signal classification

Entity: researcher/zuzanna_lindahl
  affiliation: Vector Institute
  publication_count: 71
  previous_employer: L3Harris AI (2018-2021)
  research_focus: primary=ISR ML, secondary=sensor fusion

Entity: researcher/magnus_lindahl
  affiliation: Mila
  publication_count: 48
  previous_employer: CAE AI (2016-2019)
  research_focus: primary=flight simulation ML, secondary=pilot training

Entity: researcher/adaora_lindahl
  affiliation: Allen Institute for AI
  publication_count: 59
  previous_employer: Sierra Nevada Corporation AI (2018-2021)
  research_focus: primary=space vehicle ML, secondary=orbital mechanics

Entity: researcher/ismail_lindahl
  affiliation: National University of Singapore
  publication_count: 40
  previous_employer: ST Engineering AI (2017-2020)
  research_focus: primary=Singapore aerospace ML, secondary=MRO prediction

Entity: researcher/nneka_lindahl_jr
  affiliation: Nanyang Technological University
  publication_count: 74
  previous_employer: SIA Engineering AI (2018-2021)
  research_focus: primary=airline maintenance ML, secondary=engine diagnostics

Entity: researcher/taeyang_lindahl
  affiliation: KAIST
  publication_count: 45
  previous_employer: Korean Air AI (2016-2019)
  research_focus: primary=airline operations ML, secondary=fuel optimization

Entity: researcher/lena_lindahl
  affiliation: Hong Kong University of Science and Technology
  publication_count: 67
  previous_employer: Cathay Pacific AI (2018-2021)
  research_focus: primary=Hong Kong airline ML, secondary=revenue management

Entity: researcher/hugo_lindahl
  affiliation: Purdue University
  publication_count: 30
  previous_employer: United Airlines AI (2017-2020)
  research_focus: primary=US airline ML, secondary=crew scheduling

Entity: researcher/chiamaka_lindahl_jr
  affiliation: University of Michigan
  publication_count: 83
  previous_employer: Delta Air Lines AI (2018-2021)
  research_focus: primary=airline network ML, secondary=disruption management

Entity: researcher/rasmus_lindahl
  affiliation: UT Austin CS
  publication_count: 56
  previous_employer: Southwest Airlines AI (2016-2019)
  research_focus: primary=low-cost carrier ML, secondary=yield management

Entity: researcher/mei_lin_lindahl
  affiliation: University of Washington
  publication_count: 41
  previous_employer: Alaska Airlines AI (2018-2021)
  research_focus: primary=Pacific Northwest airline ML, secondary=on-time prediction

Entity: researcher/kwabena_lindahl_jr
  affiliation: NYU CS
  publication_count: 78
  previous_employer: JetBlue AI (2017-2020)
  research_focus: primary=airline experience ML, secondary=delay prediction

Entity: researcher/olga_lindahl
  affiliation: Princeton CS
  publication_count: 47
  previous_employer: American Airlines AI (2018-2021)
  research_focus: primary=hub-and-spoke ML, secondary=baggage tracking

Entity: researcher/chukwuemeka_lindahl
  affiliation: Yale CS
  publication_count: 65
  previous_employer: United Parcel Service AI (2016-2019)
  research_focus: primary=logistics ML, secondary=route optimization

Entity: researcher/nadia_lindahl_jr
  affiliation: Johns Hopkins CS
  publication_count: 39
  previous_employer: FedEx AI (2018-2021)
  research_focus: primary=express delivery ML, secondary=demand forecasting

Entity: researcher/per_lindahl_jr
  affiliation: University of Edinburgh
  publication_count: 60
  previous_employer: DHL AI (2017-2020)
  research_focus: primary=global logistics ML, secondary=customs prediction

Entity: researcher/aisling_lindahl
  affiliation: University of Glasgow
  publication_count: 46
  previous_employer: Royal Mail AI (2018-2021)
  research_focus: primary=UK postal ML, secondary=delivery time prediction

Entity: researcher/ibrahim_lindahl_jr
  affiliation: University of Bristol
  publication_count: 81
  previous_employer: Deutsche Post AI (2016-2019)
  research_focus: primary=German postal ML, secondary=sorting optimization

Entity: researcher/astrid_lindahl_jr
  affiliation: Aalborg University
  publication_count: 33
  previous_employer: Post Nord AI (2018-2021)
  research_focus: primary=Scandinavian postal ML, secondary=last-mile delivery

Entity: researcher/yusuf_lindahl
  affiliation: Delft University of Technology
  publication_count: 69
  previous_employer: PostNL AI (2017-2020)
  research_focus: primary=Dutch postal ML, secondary=parcel routing

Entity: researcher/chidera_lindahl_jr
  affiliation: University of Zurich
  publication_count: 44
  previous_employer: Swiss Post AI (2018-2021)
  research_focus: primary=Swiss postal ML, secondary=address recognition

Entity: researcher/ingrid_lindahl_jr
  affiliation: MIT CSAIL
  publication_count: 58
  previous_employer: Amazon Logistics AI (2016-2019)
  research_focus: primary=last-mile delivery ML, secondary=route sequencing

Entity: researcher/takumi_lindahl
  affiliation: Stanford AI Lab
  publication_count: 75
  previous_employer: Amazon Robotics AI (2018-2021)
  research_focus: primary=warehouse robotics ML, secondary=pick and place

Entity: researcher/amalie_lindahl
  affiliation: Carnegie Mellon SCS
  publication_count: 37
  previous_employer: Walmart AI (2017-2020)
  research_focus: primary=retail supply chain ML, secondary=inventory forecasting

Entity: researcher/seun_lindahl_jr
  affiliation: UC Berkeley EECS
  publication_count: 63
  previous_employer: Target AI (2018-2021)
  research_focus: primary=retail ML, secondary=markdown optimization

Entity: researcher/yuki_lindahl_jr
  affiliation: Oxford CS
  publication_count: 50
  previous_employer: Costco AI (2016-2019)
  research_focus: primary=wholesale retail ML, secondary=assortment planning

Entity: researcher/hector_lindahl
  affiliation: Cambridge AI
  publication_count: 84
  previous_employer: Kroger AI (2018-2021)
  research_focus: primary=grocery retail ML, secondary=personalized promotions

Entity: researcher/fatou_lindahl_jr
  affiliation: ETH Zurich
  publication_count: 41
  previous_employer: Migros AI (2017-2020)
  research_focus: primary=Swiss retail ML, secondary=fresh produce forecasting

Entity: researcher/bogdan_lindahl_jr
  affiliation: EPFL
  publication_count: 56
  previous_employer: Coop Switzerland AI (2018-2021)
  research_focus: primary=Swiss grocery ML, secondary=supplier optimization

Entity: researcher/chidinma_lindahl_jr
  affiliation: TU Berlin
  publication_count: 68
  previous_employer: Rewe AI (2016-2019)
  research_focus: primary=German grocery ML, secondary=waste reduction

Entity: researcher/kazuki_lindahl_jr
  affiliation: University of Toronto
  publication_count: 46
  previous_employer: Loblaw AI (2018-2021)
  research_focus: primary=Canadian grocery ML, secondary=private label prediction

Entity: researcher/ingeborg_lindahl_jr
  affiliation: University of Amsterdam
  publication_count: 73
  previous_employer: Albert Heijn AI (2017-2020)
  research_focus: primary=Dutch grocery ML, secondary=click-and-collect optimization

Entity: researcher/kweku_lindahl_sr
  affiliation: KU Leuven
  publication_count: 52
  previous_employer: Colruyt AI (2018-2021)
  research_focus: primary=Belgian retail ML, secondary=price optimization

Entity: researcher/olena_lindahl
  affiliation: Peking University
  publication_count: 37
  previous_employer: JD.com AI (2016-2019)
  research_focus: primary=Chinese e-commerce ML, secondary=logistics optimization

Entity: researcher/emeka_lindahl_jr
  affiliation: Tsinghua CS
  publication_count: 81
  previous_employer: Pinduoduo AI (2018-2021)
  research_focus: primary=Chinese social commerce ML, secondary=group buying

Entity: researcher/sigrid_lindahl_sr
  affiliation: University of Tokyo
  publication_count: 45
  previous_employer: Rakuten AI (2017-2020)
  research_focus: primary=Japanese e-commerce ML, secondary=loyalty programs

Entity: researcher/ahmed_lindahl
  affiliation: Seoul National University
  publication_count: 70
  previous_employer: Coupang AI (2018-2021)
  research_focus: primary=Korean e-commerce ML, secondary=rocket delivery ML

Entity: researcher/oluwabunmi_lindahl
  affiliation: IIT Bombay
  publication_count: 54
  previous_employer: Meesho AI (2016-2019)
  research_focus: primary=Indian social commerce ML, secondary=reseller analytics

Entity: researcher/ingrid_lindahl_sr
  affiliation: University of Cape Town
  publication_count: 43
  previous_employer: Takealot AI (2018-2021)
  research_focus: primary=South African e-commerce ML, secondary=demand forecasting

Entity: researcher/joao_lindahl
  affiliation: Universidade de São Paulo
  publication_count: 76
  previous_employer: Magazine Luiza AI (2017-2020)
  research_focus: primary=Brazilian retail ML, secondary=omnichannel optimization

Entity: researcher/chidera_lindahl_sr
  affiliation: Tel Aviv University
  publication_count: 48
  previous_employer: Shufersal AI (2018-2021)
  research_focus: primary=Israeli supermarket ML, secondary=category management

Entity: researcher/hiroshi_lindahl
  affiliation: Hebrew University
  publication_count: 63
  previous_employer: Rami Levy AI (2016-2019)
  research_focus: primary=Israeli retail ML, secondary=price competitiveness

Entity: researcher/oluwatoyin_lindahl
  affiliation: Technion
  publication_count: 35
  previous_employer: Sonder AI (2018-2021)
  research_focus: primary=short-term rental ML, secondary=dynamic pricing

Entity: researcher/malin_lindahl
  affiliation: Leiden University
  publication_count: 88
  previous_employer: Airbnb AI (2017-2020)
  research_focus: primary=home sharing ML, secondary=host quality scoring

Entity: researcher/chukwuebuka_lindahl
  affiliation: University of Helsinki
  publication_count: 51
  previous_employer: Vrbo AI (2018-2021)
  research_focus: primary=vacation rental ML, secondary=pricing optimization

Entity: researcher/sakura_lindahl_jr
  affiliation: Warsaw University of Technology
  publication_count: 67
  previous_employer: Booking.com AI (2016-2019)
  research_focus: primary=hotel recommendation ML, secondary=price prediction

Entity: researcher/kwame_lindahl
  affiliation: Ghent University
  publication_count: 43
  previous_employer: Trivago AI (2018-2021)
  research_focus: primary=hotel meta-search ML, secondary=demand forecasting

Entity: researcher/naomi_lindahl
  affiliation: University of Copenhagen
  publication_count: 60
  previous_employer: Hotels.com AI (2017-2020)
  research_focus: primary=hospitality ML, secondary=review analytics

Entity: researcher/antonio_lindahl
  affiliation: Université Paris-Saclay
  publication_count: 79
  previous_employer: Accor AI (2018-2021)
  research_focus: primary=French hospitality ML, secondary=loyalty optimization

Entity: researcher/priya_lindahl_jr
  affiliation: Max Planck Institute for Intelligent Systems
  publication_count: 46
  previous_employer: Hilton AI (2016-2019)
  research_focus: primary=hotel chain ML, secondary=revenue management

Entity: researcher/nkechi_lindahl_sr
  affiliation: Vector Institute
  publication_count: 70
  previous_employer: Marriott AI (2018-2021)
  research_focus: primary=global hotel ML, secondary=distribution channel optimization

Entity: researcher/anders_lindahl_jr
  affiliation: Mila
  publication_count: 55
  previous_employer: IHG AI (2017-2020)
  research_focus: primary=international hotel ML, secondary=ancillary revenue ML

Entity: researcher/oluwaseun_lindahl
  affiliation: Allen Institute for AI
  publication_count: 41
  previous_employer: Hyatt AI (2018-2021)
  research_focus: primary=luxury hotel ML, secondary=personalization

Entity: researcher/sophy_lindahl
  affiliation: National University of Singapore
  publication_count: 74
  previous_employer: Pan Pacific Hotels AI (2016-2019)
  research_focus: primary=Singapore hotel ML, secondary=occupancy forecasting

Entity: researcher/chukwudi_lindahl
  affiliation: Nanyang Technological University
  publication_count: 47
  previous_employer: Mandarin Oriental AI (2018-2021)
  research_focus: primary=luxury hospitality ML, secondary=guest satisfaction

Entity: researcher/seungmin_lindahl
  affiliation: KAIST
  publication_count: 69
  previous_employer: Lotte Hotels AI (2017-2020)
  research_focus: primary=Korean hospitality ML, secondary=conference room prediction

Entity: researcher/oluwatobi_lindahl_sr
  affiliation: Hong Kong University of Science and Technology
  publication_count: 36
  previous_employer: Shangri-La AI (2018-2021)
  research_focus: primary=Hong Kong luxury ML, secondary=VIP prediction

Entity: researcher/giulia_lindahl_jr
  affiliation: Purdue University
  publication_count: 83
  previous_employer: Wyndham AI (2016-2019)
  research_focus: primary=economy hotel ML, secondary=franchise ML

Entity: researcher/nina_lindahl
  affiliation: University of Michigan
  publication_count: 58
  previous_employer: Choice Hotels AI (2018-2021)
  research_focus: primary=midscale hotel ML, secondary=franchise performance

Entity: researcher/chidi_lindahl
  affiliation: UT Austin CS
  publication_count: 45
  previous_employer: La Quinta AI (2017-2020)
  research_focus: primary=highway hotel ML, secondary=travel pattern ML

Entity: researcher/hana_lindahl_sr
  affiliation: University of Washington
  publication_count: 71
  previous_employer: Extended Stay AI (2018-2021)
  research_focus: primary=extended stay ML, secondary=corporate travel

Entity: researcher/emeka_lindahl_sr
  affiliation: NYU CS
  publication_count: 40
  previous_employer: Expedia AI (2016-2019)
  research_focus: primary=online travel ML, secondary=cross-sell optimization

Entity: researcher/soren_lindahl
  affiliation: Princeton CS
  publication_count: 77
  previous_employer: Kayak AI (2018-2021)
  research_focus: primary=travel search ML, secondary=price alert ML

Entity: researcher/adaeze_lindahl_jr
  affiliation: Yale CS
  publication_count: 50
  previous_employer: Google Travel AI (2017-2020)
  research_focus: primary=travel intent ML, secondary=destination recommendation

Entity: researcher/jiro_lindahl_jr
  affiliation: Johns Hopkins CS
  publication_count: 64
  previous_employer: TripAdvisor AI (2018-2021)
  research_focus: primary=travel review ML, secondary=point of interest ranking

Entity: researcher/fatou_lindahl_sr
  affiliation: University of Edinburgh
  publication_count: 35
  previous_employer: Skyscanner AI (2016-2019)
  research_focus: primary=European travel search ML, secondary=flight prediction

Entity: researcher/oluwabimpe_lindahl_jr
  affiliation: University of Glasgow
  publication_count: 59
  previous_employer: lastminute.com AI (2018-2021)
  research_focus: primary=last-minute travel ML, secondary=flash sale optimization

Entity: researcher/yuka_lindahl
  affiliation: University of Bristol
  publication_count: 46
  previous_employer: On the Beach AI (2017-2020)
  research_focus: primary=UK beach holiday ML, secondary=package recommendation

Entity: researcher/chibueze_lindahl_jr
  affiliation: Aalborg University
  publication_count: 78
  previous_employer: Momondo AI (2018-2021)
  research_focus: primary=Scandinavian travel ML, secondary=flight price forecasting

Entity: researcher/katrin_lindahl
  affiliation: Delft University of Technology
  publication_count: 41
  previous_employer: TUI AI (2016-2019)
  research_focus: primary=tour operator ML, secondary=all-inclusive optimization

Entity: researcher/alice_chen
  affiliation: MIT Computer Science
  publication_count: 47
  previous_employer: OpenAI (2018-2021)
  research_focus: primary=natural language processing, secondary=dialogue systems

Entity: researcher/obinna_lindahl
  affiliation: University of Zurich
  publication_count: 65
  previous_employer: Kuoni AI (2018-2021)
  research_focus: primary=luxury travel ML, secondary=itinerary personalization

Entity: researcher/ryo_lindahl_jr
  affiliation: MIT CSAIL
  publication_count: 56
  previous_employer: Uber Eats AI (2017-2020)
  research_focus: primary=food delivery ML, secondary=restaurant recommendation

Entity: researcher/alinta_lindahl
  affiliation: Stanford AI Lab
  publication_count: 73
  previous_employer: DoorDash AI (2018-2021)
  research_focus: primary=US food delivery ML, secondary=delivery time prediction

Entity: researcher/joachim_lindahl
  affiliation: Carnegie Mellon SCS
  publication_count: 39
  previous_employer: Instacart AI (2016-2019)
  research_focus: primary=grocery delivery ML, secondary=pick time estimation

Entity: researcher/efua_lindahl
  affiliation: UC Berkeley EECS
  publication_count: 87
  previous_employer: Lyft Delivery AI (2018-2021)
  research_focus: primary=on-demand delivery ML, secondary=driver assignment

Entity: researcher/soren_lindahl_jr
  affiliation: Oxford CS
  publication_count: 44
  previous_employer: Deliveroo AI (2017-2020)
  research_focus: primary=UK food delivery ML, secondary=restaurant supply forecasting

Entity: researcher/naomi_lindahl_jr
  affiliation: Cambridge AI
  publication_count: 60
  previous_employer: Just Eat Takeaway AI (2018-2021)
  research_focus: primary=European food delivery ML, secondary=multi-country routing

Entity: researcher/tariq_lindahl_jr
  affiliation: ETH Zurich
  publication_count: 69
  previous_employer: Smood AI (2016-2019)
  research_focus: primary=Swiss food delivery ML, secondary=urban logistics

Entity: researcher/oluwakayode_lindahl
  affiliation: EPFL
  publication_count: 37
  previous_employer: Mealpal AI (2018-2021)
  research_focus: primary=office lunch ML, secondary=cafeteria demand forecasting

Entity: researcher/haruki_lindahl_jr
  affiliation: TU Berlin
  publication_count: 81
  previous_employer: Lieferando AI (2017-2020)
  research_focus: primary=German food delivery ML, secondary=real-time dispatch

Entity: researcher/chiamaka_lindahl_sr
  affiliation: University of Toronto
  publication_count: 48
  previous_employer: SkipTheDishes AI (2018-2021)
  research_focus: primary=Canadian food delivery ML, secondary=cold weather logistics

Entity: researcher/nikolai_lindahl_jr
  affiliation: University of Amsterdam
  publication_count: 63
  previous_employer: Thuisbezorgd AI (2016-2019)
  research_focus: primary=Dutch food delivery ML, secondary=kitchen optimization

Entity: researcher/oluwafunmilayo_lindahl_jr
  affiliation: KU Leuven
  publication_count: 45
  previous_employer: Takeaway.com AI (2018-2021)
  research_focus: primary=Belgian food delivery ML, secondary=estimated delivery accuracy

Entity: researcher/hyunjin_lindahl
  affiliation: Peking University
  publication_count: 80
  previous_employer: Meituan AI (2017-2020)
  research_focus: primary=Chinese food delivery ML, secondary=rider dispatch

Entity: researcher/chioma_lindahl_sr
  affiliation: Tsinghua CS
  publication_count: 56
  previous_employer: Ele.me AI (2018-2021)
  research_focus: primary=Alibaba food delivery ML, secondary=restaurant quality prediction

Entity: researcher/rasmus_lindahl_jr
  affiliation: University of Tokyo
  publication_count: 35
  previous_employer: Demae-can AI (2016-2019)
  research_focus: primary=Japanese food delivery ML, secondary=menu recommendation

Entity: researcher/adaeze_erikssen_jr
  affiliation: Seoul National University
  publication_count: 72
  previous_employer: Baemin AI (2018-2021)
  research_focus: primary=Korean food delivery ML, secondary=peak demand forecasting

Entity: researcher/bogdan_lindahl_sr
  affiliation: IIT Bombay
  publication_count: 49
  previous_employer: Swiggy AI (2017-2020)
  research_focus: primary=Indian food delivery ML, secondary=hyperlocal routing

Entity: researcher/amara_lindahl_jr
  affiliation: University of Cape Town
  publication_count: 67
  previous_employer: Yango Deli AI (2018-2021)
  research_focus: primary=African food delivery ML, secondary=coverage expansion

Entity: researcher/fumiko_lindahl_jr
  affiliation: Universidade de São Paulo
  publication_count: 41
  previous_employer: iFood AI (2016-2019)
  research_focus: primary=Brazilian food delivery ML, secondary=restaurant scoring

Entity: researcher/leon_lindahl_jr
  affiliation: Tel Aviv University
  publication_count: 54
  previous_employer: Wolt AI (2018-2021)
  research_focus: primary=Israeli food delivery ML, secondary=dark store optimization

Entity: researcher/oluwafemi_lindahl_sr
  affiliation: Hebrew University
  publication_count: 76
  previous_employer: Glovo AI (2017-2020)
  research_focus: primary=Spanish on-demand delivery ML, secondary=courier optimization

Entity: researcher/kristoffer_lindahl
  affiliation: Technion
  publication_count: 46
  previous_employer: Rappi AI (2018-2021)
  research_focus: primary=Latin America delivery ML, secondary=dark grocery optimization

Entity: researcher/yuna_lindahl_jr
  affiliation: Leiden University
  publication_count: 69
  previous_employer: Gorillas AI (2016-2019)
  research_focus: primary=European quick-commerce ML, secondary=10-minute delivery

Entity: researcher/oluwakemi_lindahl_jr
  affiliation: University of Helsinki
  publication_count: 37
  previous_employer: Getir AI (2020-2023)
  research_focus: primary=Turkish quick-commerce ML, secondary=dark store network

Entity: researcher/daichi_lindahl_jr
  affiliation: Warsaw University of Technology
  publication_count: 83
  previous_employer: Flink AI (2021-2023)
  research_focus: primary=German quick-commerce ML, secondary=demand prediction

Entity: researcher/amira_lindahl_jr
  affiliation: Ghent University
  publication_count: 50
  previous_employer: Zapp AI (2021-2023)
  research_focus: primary=Belgian quick-commerce ML, secondary=assortment optimization

Entity: researcher/emre_lindahl_jr
  affiliation: University of Copenhagen
  publication_count: 65
  previous_employer: Buyk AI (2021-2023)
  research_focus: primary=Scandinavian quick-commerce ML, secondary=hyperlocal forecasting

Entity: researcher/chidinma_lindahl_sr
  affiliation: Université Paris-Saclay
  publication_count: 75
  previous_employer: Cajoo AI (2021-2023)
  research_focus: primary=French quick-commerce ML, secondary=warehouse microhub siting

Entity: researcher/yuya_lindahl_jr
  affiliation: Max Planck Institute for Intelligent Systems
  publication_count: 43
  previous_employer: Knuspr AI (2021-2023)
  research_focus: primary=European online supermarket ML, secondary=cold chain optimization

Entity: researcher/oluwaseun_lindahl_jr
  affiliation: Vector Institute
  publication_count: 67
  previous_employer: GoodFood AI (2018-2021)
  research_focus: primary=Canadian meal kit ML, secondary=churn prediction

Entity: researcher/sigrid_lindahl_ii
  affiliation: Mila
  publication_count: 40
  previous_employer: HelloFresh AI (2017-2020)
  research_focus: primary=global meal kit ML, secondary=menu optimization

Entity: researcher/oluwabunmi_lindahl_jr
  affiliation: Allen Institute for AI
  publication_count: 78
  previous_employer: Blue Apron AI (2016-2019)
  research_focus: primary=US meal kit ML, secondary=recipe recommendation

Entity: researcher/kenta_lindahl_jr
  affiliation: National University of Singapore
  publication_count: 54
  previous_employer: Grain AI (2018-2021)
  research_focus: primary=Singapore meal delivery ML, secondary=corporate catering

Entity: researcher/chibueze_lindahl_sr
  affiliation: Nanyang Technological University
  publication_count: 43
  previous_employer: Grain AI (2017-2020)
  research_focus: primary=Singapore office lunch ML, secondary=dietary preference ML

Entity: researcher/sung_jun_lindahl
  affiliation: KAIST
  publication_count: 71
  previous_employer: Kurly AI (2019-2022)
  research_focus: primary=Korean fresh food ML, secondary=cold chain optimization

Entity: researcher/oluwatoyin_lindahl_jr
  affiliation: Hong Kong University of Science and Technology
  publication_count: 36
  previous_employer: Honestbee AI (2018-2021)
  research_focus: primary=Hong Kong grocery ML, secondary=personal shopper assignment

Entity: researcher/astrid_lindahl_sr
  affiliation: Purdue University
  publication_count: 90
  previous_employer: FreshDirect AI (2016-2019)
  research_focus: primary=NYC online grocery ML, secondary=freshness prediction

Entity: researcher/mikael_lindahl
  affiliation: University of Michigan
  publication_count: 49
  previous_employer: Shipt AI (2018-2021)
  research_focus: primary=US same-day grocery ML, secondary=shopper incentive ML

Entity: researcher/oluwatobi_lindahl_ii
  affiliation: UT Austin CS
  publication_count: 62
  previous_employer: H-E-B AI (2017-2020)
  research_focus: primary=Texas grocery ML, secondary=store operations

Entity: researcher/kazuya_lindahl
  affiliation: University of Washington
  publication_count: 38
  previous_employer: QFC AI (2018-2021)
  research_focus: primary=Pacific Northwest grocery ML, secondary=organic produce forecasting

Entity: researcher/oluwakayode_lindahl_jr
  affiliation: NYU CS
  publication_count: 74
  previous_employer: Whole Foods AI (2016-2019)
  research_focus: primary=premium grocery ML, secondary=local supplier analytics

Entity: researcher/chidera_lindahl_ii
  affiliation: Princeton CS
  publication_count: 51
  previous_employer: Trader Joe's AI (2018-2021)
  research_focus: primary=specialty grocery ML, secondary=SKU rationalization

Entity: researcher/fumiya_lindahl
  affiliation: Yale CS
  publication_count: 65
  previous_employer: Aldi AI (2017-2020)
  research_focus: primary=hard discount ML, secondary=private label optimization

Entity: researcher/oluwafunmilayo_lindahl_sr
  affiliation: Johns Hopkins CS
  publication_count: 39
  previous_employer: Lidl AI (2018-2021)
  research_focus: primary=European hard discount ML, secondary=weekly leaflet ML

Entity: researcher/nkechi_lindahl_ii
  affiliation: University of Edinburgh
  publication_count: 57
  previous_employer: Aldi UK AI (2016-2019)
  research_focus: primary=UK grocery discounter ML, secondary=store clustering

Entity: researcher/hirotaka_lindahl
  affiliation: University of Glasgow
  publication_count: 44
  previous_employer: Iceland Foods AI (2018-2021)
  research_focus: primary=UK frozen food ML, secondary=promotions analytics

Entity: researcher/oluwabimpe_lindahl_sr
  affiliation: University of Bristol
  publication_count: 79
  previous_employer: Ocado AI (2017-2020)
  research_focus: primary=UK online grocery ML, secondary=warehouse robotics

Entity: researcher/emeka_lindahl_ii
  affiliation: Aalborg University
  publication_count: 48
  previous_employer: Salling Group AI (2018-2021)
  research_focus: primary=Danish retail ML, secondary=sustainability reporting

Entity: researcher/hana_lindahl_ii
  affiliation: Delft University of Technology
  publication_count: 63
  previous_employer: Ahold Delhaize AI (2016-2019)
  research_focus: primary=Dutch supermarket ML, secondary=private label expansion

Entity: researcher/chiamaka_lindahl_ii
  affiliation: University of Zurich
  publication_count: 40
  previous_employer: Coop Genossenschaft AI (2018-2021)
  research_focus: primary=Swiss cooperative ML, secondary=zero-waste optimization

Entity: researcher/riku_lindahl_jr
  affiliation: MIT CSAIL
  publication_count: 76
  previous_employer: Lowe's AI (2017-2020)
  research_focus: primary=home improvement ML, secondary=project recommendation

Entity: researcher/chidinma_lindahl_iii
  affiliation: Stanford AI Lab
  publication_count: 55
  previous_employer: Home Depot AI (2018-2021)
  research_focus: primary=US DIY retail ML, secondary=professional contractor ML

Entity: researcher/felix_lindahl
  affiliation: Carnegie Mellon SCS
  publication_count: 46
  previous_employer: IKEA AI (2016-2019)
  research_focus: primary=furniture retail ML, secondary=interior design recommendation

Entity: researcher/naomi_lindahl_sr
  affiliation: UC Berkeley EECS
  publication_count: 68
  previous_employer: Wayfair AI (2018-2021)
  research_focus: primary=online furniture ML, secondary=room visualization

Entity: researcher/chukwudi_lindahl_jr
  affiliation: Oxford CS
  publication_count: 41
  previous_employer: Overstock AI (2017-2020)
  research_focus: primary=US home goods ML, secondary=surplus inventory prediction

Entity: researcher/sigrid_lindahl_iii
  affiliation: Cambridge AI
  publication_count: 80
  previous_employer: Zara AI (2018-2021)
  research_focus: primary=fast fashion ML, secondary=trend forecasting

Entity: researcher/adaobi_lindahl_jr
  affiliation: ETH Zurich
  publication_count: 49
  previous_employer: H&M AI (2016-2019)
  research_focus: primary=Swedish fashion ML, secondary=sustainability ML

Entity: researcher/soren_lindahl_sr
  affiliation: EPFL
  publication_count: 62
  previous_employer: Inditex AI (2018-2021)
  research_focus: primary=Spanish fashion ML, secondary=micro-collection optimization

Entity: researcher/yuriko_lindahl_sr
  affiliation: TU Berlin
  publication_count: 35
  previous_employer: C&A AI (2017-2020)
  research_focus: primary=European value fashion ML, secondary=size recommendation

Entity: researcher/oluwakemi_lindahl_sr
  affiliation: University of Toronto
  publication_count: 87
  previous_employer: Reitmans AI (2018-2021)
  research_focus: primary=Canadian women's fashion ML, secondary=return prediction

Entity: researcher/nicholas_lindahl
  affiliation: University of Amsterdam
  publication_count: 54
  previous_employer: Zalando AI (2016-2019)
  research_focus: primary=European fashion e-commerce ML, secondary=virtual try-on

Entity: researcher/chukwuebuka_lindahl_jr
  affiliation: KU Leuven
  publication_count: 43
  previous_employer: Bestseller AI (2018-2021)
  research_focus: primary=Danish fashion ML, secondary=brand portfolio ML

Entity: researcher/sakura_lindahl_sr
  affiliation: Peking University
  publication_count: 70
  previous_employer: Shein AI (2019-2022)
  research_focus: primary=fast fashion ML, secondary=real-time trend detection

Entity: researcher/adebayo_lindahl_sr
  affiliation: Tsinghua CS
  publication_count: 77
  previous_employer: Li-Ning AI (2018-2021)
  research_focus: primary=Chinese sportswear ML, secondary=product development

Entity: researcher/ryo_lindahl_sr
  affiliation: University of Tokyo
  publication_count: 46
  previous_employer: Uniqlo AI (2017-2020)
  research_focus: primary=Japanese fashion ML, secondary=basic apparel optimization

Entity: researcher/christel_lindahl_jr
  affiliation: Seoul National University
  publication_count: 59
  previous_employer: Samsung Fashion AI (2018-2021)
  research_focus: primary=Korean fashion tech ML, secondary=AI styling

Entity: researcher/kwabena_lindahl_sr
  affiliation: IIT Bombay
  publication_count: 38
  previous_employer: Myntra AI (2016-2019)
  research_focus: primary=Indian fashion ML, secondary=occasion-based recommendation

Entity: researcher/oluwafunke_lindahl_sr
  affiliation: University of Cape Town
  publication_count: 81
  previous_employer: Superbalist AI (2018-2021)
  research_focus: primary=South African fashion ML, secondary=local trend detection

Entity: researcher/jiro_lindahl_sr
  affiliation: Universidade de São Paulo
  publication_count: 45
  previous_employer: Dafiti AI (2017-2020)
  research_focus: primary=Brazilian fashion ML, secondary=influencer analytics

Entity: researcher/nneka_lindahl_sr
  affiliation: Tel Aviv University
  publication_count: 67
  previous_employer: Castro Fashion AI (2018-2021)
  research_focus: primary=Israeli fashion ML, secondary=size fit prediction

Entity: researcher/bjoern_lindahl_sr
  affiliation: Hebrew University
  publication_count: 40
  previous_employer: Renuar AI (2016-2019)
  research_focus: primary=Israeli mid-market fashion ML, secondary=visual search

Entity: researcher/chiamaka_lindahl_iii
  affiliation: Technion
  publication_count: 74
  previous_employer: Fox Fashion AI (2018-2021)
  research_focus: primary=Israeli fast fashion ML, secondary=demand sensing

Entity: researcher/haruto_lindahl_sr
  affiliation: Leiden University
  publication_count: 56
  previous_employer: Scotch & Soda AI (2017-2020)
  research_focus: primary=Dutch premium fashion ML, secondary=wholesale channel ML

Entity: researcher/adaeze_gronqvist_sr
  affiliation: University of Helsinki
  publication_count: 43
  previous_employer: Marimekko AI (2018-2021)
  research_focus: primary=Finnish design brand ML, secondary=print trend prediction

Entity: researcher/kweku_nakamura_sr
  affiliation: Warsaw University of Technology
  publication_count: 69
  previous_employer: Reserved AI (2016-2019)
  research_focus: primary=Polish fashion ML, secondary=retail expansion ML

Entity: researcher/oluwasegun_lindahl_jr
  affiliation: Ghent University
  publication_count: 47
  previous_employer: JBC AI (2018-2021)
  research_focus: primary=Belgian family fashion ML, secondary=loyalty ML

Entity: researcher/yuki_lindahl_sr
  affiliation: University of Copenhagen
  publication_count: 60
  previous_employer: Bestseller Danes AI (2017-2020)
  research_focus: primary=Scandinavian fashion ML, secondary=sustainability impact ML

Entity: researcher/adeola_lindahl_jr
  affiliation: Université Paris-Saclay
  publication_count: 84
  previous_employer: LVMH AI (2018-2021)
  research_focus: primary=luxury fashion ML, secondary=authentication

Entity: researcher/tobias_lindahl_jr
  affiliation: Max Planck Institute for Intelligent Systems
  publication_count: 39
  previous_employer: Kering AI (2017-2020)
  research_focus: primary=French luxury group ML, secondary=brand equity analytics

Entity: researcher/chibuike_lindahl_sr
  affiliation: Vector Institute
  publication_count: 73
  previous_employer: Richemont AI (2018-2021)
  research_focus: primary=Swiss luxury watchmaking ML, secondary=production quality

Entity: researcher/fumika_lindahl_sr
  affiliation: Mila
  publication_count: 50
  previous_employer: Burberry AI (2016-2019)
  research_focus: primary=British luxury ML, secondary=heritage brand analytics

Entity: researcher/obafemi_lindahl_sr
  affiliation: Allen Institute for AI
  publication_count: 65
  previous_employer: Prada AI (2018-2021)
  research_focus: primary=Italian luxury ML, secondary=artisan process ML

Entity: researcher/kenta_lindahl_sr
  affiliation: National University of Singapore
  publication_count: 41
  previous_employer: Coach AI (2017-2020)
  research_focus: primary=US accessible luxury ML, secondary=outlet channel ML

Entity: researcher/oluwakayode_lindahl_sr
  affiliation: Nanyang Technological University
  publication_count: 78
  previous_employer: Kate Spade AI (2018-2021)
  research_focus: primary=millennial luxury ML, secondary=pop-up store analytics

Entity: researcher/daichi_lindahl_sr
  affiliation: KAIST
  publication_count: 54
  previous_employer: MCM AI (2016-2019)
  research_focus: primary=Korean luxury brand ML, secondary=Asian market expansion

Entity: researcher/chiamaka_lindahl_iv
  affiliation: Hong Kong University of Science and Technology
  publication_count: 46
  previous_employer: Chow Tai Fook AI (2018-2021)
  research_focus: primary=Hong Kong jewellery ML, secondary=diamond pricing ML

Entity: researcher/nikolai_lindahl_sr
  affiliation: Purdue University
  publication_count: 70
  previous_employer: Tiffany AI (2017-2020)
  research_focus: primary=US luxury jewellery ML, secondary=design trend prediction

Entity: researcher/bjoern_lindahl_sr_jr
  affiliation: University of Michigan
  publication_count: 37
  previous_employer: Cartier AI (2018-2021)
  research_focus: primary=French fine jewellery ML, secondary=bespoke design ML

Entity: researcher/adeola_lindahl_sr_jr
  affiliation: UT Austin CS
  publication_count: 81
  previous_employer: Signet Jewelers AI (2016-2019)
  research_focus: primary=US jewellery retail ML, secondary=engagement ring ML

Entity: researcher/fumio_lindahl_sr
  affiliation: University of Washington
  publication_count: 46
  previous_employer: Pandora AI (2018-2021)
  research_focus: primary=Danish charm brand ML, secondary=personalization

Entity: researcher/sigrid_lindahl_iv
  affiliation: NYU CS
  publication_count: 64
  previous_employer: Swarovski AI (2017-2020)
  research_focus: primary=Austrian crystal brand ML, secondary=licensing analytics

Entity: researcher/adeola_lindahl_iii
  affiliation: Princeton CS
  publication_count: 39
  previous_employer: De Beers AI (2018-2021)
  research_focus: primary=diamond market ML, secondary=provenance tracing

Entity: researcher/chidinma_lindahl_iv
  affiliation: Yale CS
  publication_count: 83
  previous_employer: Alrosa AI (2016-2019)
  research_focus: primary=Russian diamond mining ML, secondary=sorting optimization

Entity: researcher/fumika_lindahl_iii
  affiliation: Johns Hopkins CS
  publication_count: 55
  previous_employer: Rio Tinto Diamonds AI (2018-2021)
  research_focus: primary=mining operations ML, secondary=gemstone grading

Entity: researcher/priya_nakamura
  affiliation: MIT CSAIL
  publication_count: 62
  previous_employer: Google Brain (2016-2019)
  research_focus: primary=natural language processing, secondary=semantic parsing

Entity: researcher/oluwatobiloba_adeyemi
  affiliation: Stanford AI Lab
  publication_count: 46
  previous_employer: OpenAI (2018-2021)
  research_focus: primary=large language models, secondary=RLHF

Entity: researcher/amina_bergstrom
  affiliation: Carnegie Mellon SCS
  publication_count: 74
  previous_employer: Meta AI (2017-2020)
  research_focus: primary=computer vision, secondary=video recognition

Entity: researcher/bogdan_osei
  affiliation: UC Berkeley EECS
  publication_count: 38
  previous_employer: DeepMind (2018-2021)
  research_focus: primary=reinforcement learning, secondary=multi-agent systems

Entity: researcher/yuna_ostrowski
  affiliation: Oxford CS
  publication_count: 67
  previous_employer: Microsoft Research (2016-2019)
  research_focus: primary=machine learning, secondary=causal inference

Entity: researcher/kwabena_ostrowski
  affiliation: Cambridge AI
  publication_count: 52
  previous_employer: Amazon Science (2019-2022)
  research_focus: primary=NLP, secondary=information extraction

Entity: researcher/fatou_mensah
  affiliation: ETH Zurich
  publication_count: 83
  previous_employer: Google DeepMind (2017-2020)
  research_focus: primary=graph neural networks, secondary=link prediction

Entity: researcher/aleksei_ostrowski
  affiliation: EPFL
  publication_count: 40
  previous_employer: NVIDIA Research (2018-2021)
  research_focus: primary=3D vision, secondary=point cloud processing

Entity: researcher/zainab_ostrowski
  affiliation: TU Berlin
  publication_count: 56
  previous_employer: Intel Labs (2016-2019)
  research_focus: primary=edge ML, secondary=model compression

Entity: researcher/ryo_ostrowski
  affiliation: University of Toronto
  publication_count: 69
  previous_employer: Vector Institute (2018-2021)
  research_focus: primary=generative models, secondary=VAEs

Entity: researcher/nadia_ostrowski
  affiliation: University of Amsterdam
  publication_count: 43
  previous_employer: Booking.com AI (2017-2020)
  research_focus: primary=user behavior modeling, secondary=session prediction

Entity: researcher/pierre_ostrowski
  affiliation: KU Leuven
  publication_count: 77
  previous_employer: Baidu Research (2019-2022)
  research_focus: primary=knowledge representation, secondary=ontology learning

Entity: researcher/sunita_ostrowski
  affiliation: Peking University
  publication_count: 54
  previous_employer: Tencent AI Lab (2016-2019)
  research_focus: primary=advertising ML, secondary=click-through rate

Entity: researcher/mikhail_ostrowski
  affiliation: Tsinghua CS
  publication_count: 40
  previous_employer: Alibaba DAMO Academy (2018-2021)
  research_focus: primary=multimodal search, secondary=cross-modal retrieval

Entity: researcher/ingeborg_ostrowski
  affiliation: University of Tokyo
  publication_count: 75
  previous_employer: Sony AI (2017-2020)
  research_focus: primary=music AI, secondary=melody generation

Entity: researcher/kofi_ostrowski
  affiliation: Seoul National University
  publication_count: 48
  previous_employer: Kakao AI (2018-2021)
  research_focus: primary=Korean speech, secondary=TTS

Entity: researcher/valentina_ostrowski
  affiliation: IIT Bombay
  publication_count: 61
  previous_employer: Google Brain India (2016-2019)
  research_focus: primary=Indic NLP, secondary=multilingual models

Entity: researcher/oluseun_ostrowski
  affiliation: University of Cape Town
  publication_count: 36
  previous_employer: Vodacom AI (2018-2021)
  research_focus: primary=African language MT, secondary=low-resource NLP

Entity: researcher/camila_ostrowski
  affiliation: Universidade de São Paulo
  publication_count: 80
  previous_employer: Natura AI (2016-2019)
  research_focus: primary=consumer analytics, secondary=NLP

Entity: researcher/ibrahim_ostrowski
  affiliation: Tel Aviv University
  publication_count: 45
  previous_employer: Fiverr AI (2018-2021)
  research_focus: primary=marketplace ML, secondary=gig worker matching

Entity: researcher/mei_ostrowski
  affiliation: Hebrew University
  publication_count: 68
  previous_employer: Monday.com AI (2017-2020)
  research_focus: primary=project management ML, secondary=task prediction

Entity: researcher/fredrik_ostrowski
  affiliation: Technion
  publication_count: 53
  previous_employer: Infosys AI (2018-2021)
  research_focus: primary=enterprise ML, secondary=process automation

Entity: researcher/adaeze_okafor_jr
  affiliation: Leiden University
  publication_count: 42
  previous_employer: KPMG AI (2016-2019)
  research_focus: primary=audit ML, secondary=anomaly detection

Entity: researcher/hamid_ostrowski
  affiliation: University of Helsinki
  publication_count: 66
  previous_employer: EY AI (2018-2021)
  research_focus: primary=tax ML, secondary=compliance automation

Entity: researcher/anna_ostrowski
  affiliation: Warsaw University of Technology
  publication_count: 39
  previous_employer: Deloitte AI (2017-2020)
  research_focus: primary=consulting ML, secondary=workforce analytics

Entity: researcher/leon_ostrowski
  affiliation: Ghent University
  publication_count: 74
  previous_employer: Accenture AI (2018-2021)
  research_focus: primary=digital transformation ML, secondary=process mining

Entity: researcher/hana_ostrowski
  affiliation: University of Copenhagen
  publication_count: 57
  previous_employer: McKinsey QuantumBlack (2016-2019)
  research_focus: primary=analytics, secondary=optimization

Entity: researcher/victor_ostrowski
  affiliation: Université Paris-Saclay
  publication_count: 45
  previous_employer: BCG Gamma (2018-2021)
  research_focus: primary=data science, secondary=predictive analytics

Entity: researcher/liu_ostrowski
  affiliation: Max Planck Institute for Intelligent Systems
  publication_count: 69
  previous_employer: Google Brain (2017-2020)
  research_focus: primary=representation learning, secondary=metric learning

Entity: researcher/fatima_ostrowski
  affiliation: Vector Institute
  publication_count: 36
  previous_employer: Shopify AI (2018-2021)
  research_focus: primary=e-commerce NLP, secondary=product categorization

Entity: researcher/jose_ostrowski
  affiliation: Mila
  publication_count: 82
  previous_employer: Unity AI (2016-2019)
  research_focus: primary=game AI, secondary=procedural content generation

Entity: researcher/elena_ostrowski
  affiliation: Allen Institute for AI
  publication_count: 48
  previous_employer: Epic Games AI (2018-2021)
  research_focus: primary=character animation ML, secondary=game physics

Entity: researcher/tanvir_ostrowski
  affiliation: National University of Singapore
  publication_count: 63
  previous_employer: Razer AI (2017-2020)
  research_focus: primary=gaming peripheral ML, secondary=player behavior

Entity: researcher/nkechi_ostrowski
  affiliation: Nanyang Technological University
  publication_count: 40
  previous_employer: Ubisoft AI (2018-2021)
  research_focus: primary=game design ML, secondary=player engagement

Entity: researcher/lucas_ostrowski
  affiliation: KAIST
  publication_count: 75
  previous_employer: Nexon AI (2016-2019)
  research_focus: primary=Korean gaming ML, secondary=churn prediction

Entity: researcher/sofie_ostrowski
  affiliation: Hong Kong University of Science and Technology
  publication_count: 54
  previous_employer: NetEase AI (2018-2021)
  research_focus: primary=Chinese gaming ML, secondary=toxicity detection

Entity: researcher/aryan_ostrowski
  affiliation: Purdue University
  publication_count: 42
  previous_employer: EA AI (2017-2020)
  research_focus: primary=sports game ML, secondary=difficulty balancing

Entity: researcher/zara_ostrowski
  affiliation: University of Michigan
  publication_count: 67
  previous_employer: Activision AI (2018-2021)
  research_focus: primary=FPS game ML, secondary=matchmaking

Entity: researcher/emeka_ostrowski
  affiliation: UT Austin CS
  publication_count: 39
  previous_employer: Blizzard AI (2016-2019)
  research_focus: primary=MMORPG ML, secondary=NPC behavior

Entity: researcher/soo_jin_ostrowski
  affiliation: University of Washington
  publication_count: 80
  previous_employer: Valve AI (2018-2021)
  research_focus: primary=Steam ML, secondary=game recommendation

Entity: researcher/andile_ostrowski
  affiliation: NYU CS
  publication_count: 55
  previous_employer: Riot Games AI (2017-2020)
  research_focus: primary=MOBA ML, secondary=team composition

Entity: researcher/astrid_ostrowski
  affiliation: Princeton CS
  publication_count: 44
  previous_employer: Supercell AI (2018-2021)
  research_focus: primary=mobile game ML, secondary=battle pass optimization

Entity: researcher/rodrigo_ostrowski
  affiliation: Yale CS
  publication_count: 68
  previous_employer: King AI (2016-2019)
  research_focus: primary=casual game ML, secondary=social features

Entity: researcher/chidinma_ostrowski
  affiliation: Johns Hopkins CS
  publication_count: 36
  previous_employer: Zynga AI (2018-2021)
  research_focus: primary=social casino ML, secondary=spend prediction

Entity: researcher/niklas_ostrowski
  affiliation: University of Edinburgh
  publication_count: 73
  previous_employer: CD Projekt Red AI (2017-2020)
  research_focus: primary=open-world ML, secondary=NPC dialogue

Entity: researcher/amara_ostrowski
  affiliation: University of Glasgow
  publication_count: 49
  previous_employer: Square Enix AI (2018-2021)
  research_focus: primary=JRPG ML, secondary=story generation

Entity: researcher/hassan_ostrowski
  affiliation: University of Bristol
  publication_count: 64
  previous_employer: Capcom AI (2016-2019)
  research_focus: primary=action game ML, secondary=boss AI

Entity: researcher/nneka_ostrowski
  affiliation: Aalborg University
  publication_count: 38
  previous_employer: FromSoftware AI (2018-2021)
  research_focus: primary=soulslike ML, secondary=combat balance

Entity: researcher/siddharth_ostrowski
  affiliation: Delft University of Technology
  publication_count: 77
  previous_employer: Guerrilla Games AI (2017-2020)
  research_focus: primary=open world ML, secondary=terrain generation

Entity: researcher/yuki_ostrowski
  affiliation: University of Zurich
  publication_count: 53
  previous_employer: Paradox AI (2018-2021)
  research_focus: primary=strategy game ML, secondary=campaign balancing

Entity: researcher/vera_ostrowski
  affiliation: MIT CSAIL
  publication_count: 45
  previous_employer: Bethesda AI (2016-2019)
  research_focus: primary=RPG ML, secondary=quest generation

Entity: researcher/benedikt_ostrowski
  affiliation: Stanford AI Lab
  publication_count: 70
  previous_employer: Obsidian AI (2018-2021)
  research_focus: primary=RPG narrative ML, secondary=choice modeling

Entity: researcher/ishaan_ostrowski
  affiliation: Carnegie Mellon SCS
  publication_count: 42
  previous_employer: BioWare AI (2017-2020)
  research_focus: primary=narrative AI, secondary=companion behavior

Entity: researcher/oluwakemi_ostrowski
  affiliation: UC Berkeley EECS
  publication_count: 85
  previous_employer: Bungie AI (2018-2021)
  research_focus: primary=looter shooter ML, secondary=loot distribution

Entity: researcher/anders_ostrowski
  affiliation: Oxford CS
  publication_count: 56
  previous_employer: Insomniac AI (2016-2019)
  research_focus: primary=action game ML, secondary=traversal behavior

Entity: researcher/nour_ostrowski
  affiliation: Cambridge AI
  publication_count: 44
  previous_employer: Rockstar AI (2018-2021)
  research_focus: primary=open world simulation ML, secondary=crowd behavior

Entity: researcher/chen_ostrowski
  affiliation: ETH Zurich
  publication_count: 68
  previous_employer: Naughty Dog AI (2017-2020)
  research_focus: primary=cinematic game ML, secondary=motion capture

Entity: researcher/sigrid_ostrowski
  affiliation: EPFL
  publication_count: 37
  previous_employer: Santa Monica Studio AI (2018-2021)
  research_focus: primary=combat ML, secondary=enemy AI

Entity: researcher/abel_ostrowski
  affiliation: TU Berlin
  publication_count: 79
  previous_employer: Crystal Dynamics AI (2016-2019)
  research_focus: primary=stealth game ML, secondary=patrol behavior

Entity: researcher/preethi_ostrowski
  affiliation: University of Toronto
  publication_count: 48
  previous_employer: IO Interactive AI (2018-2021)
  research_focus: primary=sandbox ML, secondary=NPC scheduling

Entity: researcher/emre_ostrowski
  affiliation: University of Amsterdam
  publication_count: 63
  previous_employer: CDPR AI (2017-2020)
  research_focus: primary=futuristic world ML, secondary=AI citizen behavior

Entity: researcher/sonja_ostrowski
  affiliation: KU Leuven
  publication_count: 40
  previous_employer: 4A Games AI (2018-2021)
  research_focus: primary=post-apocalyptic ML, secondary=survival AI

Entity: researcher/kweku_ostrowski
  affiliation: Peking University
  publication_count: 74
  previous_employer: miHoYo AI (2019-2022)
  research_focus: primary=gacha game ML, secondary=player monetization

Entity: researcher/aya_ostrowski
  affiliation: Tsinghua CS
  publication_count: 55
  previous_employer: HoYoverse AI (2020-2023)
  research_focus: primary=open world anime ML, secondary=quest optimization

Entity: researcher/adebayo_ostrowski
  affiliation: University of Tokyo
  publication_count: 43
  previous_employer: Bandai Namco AI (2018-2021)
  research_focus: primary=arcade ML, secondary=difficulty adaptation

Entity: researcher/hina_ostrowski
  affiliation: Seoul National University
  publication_count: 67
  previous_employer: NCSoft AI (2016-2019)
  research_focus: primary=online RPG ML, secondary=guild dynamics

Entity: researcher/marco_ostrowski
  affiliation: IIT Bombay
  publication_count: 36
  previous_employer: Composant AI (2018-2021)
  research_focus: primary=Indian gaming ML, secondary=regional content

Entity: researcher/thandi_ostrowski
  affiliation: University of Cape Town
  publication_count: 80
  previous_employer: Carry1st AI (2017-2020)
  research_focus: primary=African gaming ML, secondary=mobile payment integration

Entity: researcher/renata_ostrowski
  affiliation: Universidade de São Paulo
  publication_count: 53
  previous_employer: Wildlife Studios AI (2018-2021)
  research_focus: primary=Brazilian casual ML, secondary=hyper-casual games

Entity: researcher/bilal_ostrowski
  affiliation: Tel Aviv University
  publication_count: 45
  previous_employer: GiGi Games AI (2016-2019)
  research_focus: primary=Israeli mobile gaming ML, secondary=live ops

Entity: researcher/chioma_ostrowski
  affiliation: Hebrew University
  publication_count: 69
  previous_employer: Playtika AI (2018-2021)
  research_focus: primary=social casino ML, secondary=retention

Entity: researcher/fredrik_okafor
  affiliation: Technion
  publication_count: 38
  previous_employer: Plarium AI (2017-2020)
  research_focus: primary=mid-core ML, secondary=alliance mechanics

Entity: researcher/giulia_ostrowski
  affiliation: Leiden University
  publication_count: 84
  previous_employer: Kixeye AI (2018-2021)
  research_focus: primary=strategy game ML, secondary=whale prediction

Entity: researcher/tariq_ostrowski
  affiliation: University of Helsinki
  publication_count: 57
  previous_employer: Rovio AI (2016-2019)
  research_focus: primary=Finnish mobile ML, secondary=Angry Birds analytics

Entity: researcher/oluwatobi_ostrowski
  affiliation: Warsaw University of Technology
  publication_count: 44
  previous_employer: Techland AI (2018-2021)
  research_focus: primary=Polish AAA ML, secondary=zombie crowd AI

Entity: researcher/paloma_ostrowski
  affiliation: Ghent University
  publication_count: 62
  previous_employer: Larian Studios AI (2017-2020)
  research_focus: primary=Belgian RPG ML, secondary=dialogue AI

Entity: researcher/leif_ostrowski
  affiliation: University of Copenhagen
  publication_count: 49
  previous_employer: IO Interactive AI (2018-2021)
  research_focus: primary=Danish stealth ML, secondary=mission design AI

Entity: researcher/yasmin_ostrowski
  affiliation: Université Paris-Saclay
  publication_count: 75
  previous_employer: Ubisoft Paris AI (2016-2019)
  research_focus: primary=French AAA ML, secondary=Assassin's Creed world AI

Entity: researcher/oluwafemi_ostrowski
  affiliation: Max Planck Institute for Intelligent Systems
  publication_count: 34
  previous_employer: Crytek AI (2018-2021)
  research_focus: primary=rendering ML, secondary=photorealistic textures

Entity: researcher/zuzanna_ostrowski
  affiliation: Vector Institute
  publication_count: 70
  previous_employer: Deep Silver AI (2017-2020)
  research_focus: primary=RPG ML, secondary=inventory management

Entity: researcher/magnus_ostrowski
  affiliation: Mila
  publication_count: 47
  previous_employer: THQ Nordic AI (2018-2021)
  research_focus: primary=Nordic studio ML, secondary=game remasters

Entity: researcher/adaora_ostrowski
  affiliation: Allen Institute for AI
  publication_count: 58
  previous_employer: Double Fine AI (2016-2019)
  research_focus: primary=adventure game ML, secondary=puzzle generation

Entity: researcher/ismail_ostrowski
  affiliation: National University of Singapore
  publication_count: 39
  previous_employer: Gumi AI (2018-2021)
  research_focus: primary=Singapore mobile ML, secondary=anime RPG analytics

Entity: researcher/nneka_ostrowski_jr
  affiliation: Nanyang Technological University
  publication_count: 73
  previous_employer: Kooapps AI (2017-2020)
  research_focus: primary=hyper-casual ML, secondary=ad monetization

Entity: researcher/taeyang_ostrowski
  affiliation: KAIST
  publication_count: 44
  previous_employer: Pearl Abyss AI (2018-2021)
  research_focus: primary=Korean MMORPG ML, secondary=economy simulation

Entity: researcher/lena_ostrowski
  affiliation: Hong Kong University of Science and Technology
  publication_count: 66
  previous_employer: HKJC AI (2017-2020)
  research_focus: primary=horse racing ML, secondary=betting analytics

Entity: researcher/hugo_ostrowski
  affiliation: Purdue University
  publication_count: 29
  previous_employer: DraftKings AI (2018-2021)
  research_focus: primary=sports betting ML, secondary=daily fantasy

Entity: researcher/chiamaka_ostrowski_jr
  affiliation: University of Michigan
  publication_count: 82
  previous_employer: FanDuel AI (2016-2019)
  research_focus: primary=fantasy sports ML, secondary=player projection

Entity: researcher/rasmus_ostrowski
  affiliation: UT Austin CS
  publication_count: 55
  previous_employer: Penn Interactive AI (2018-2021)
  research_focus: primary=sports wagering ML, secondary=in-game betting

Entity: researcher/mei_lin_ostrowski
  affiliation: University of Washington
  publication_count: 40
  previous_employer: BetMGM AI (2017-2020)
  research_focus: primary=casino online ML, secondary=player risk

Entity: researcher/kwabena_ostrowski
  affiliation: NYU CS
  publication_count: 77
  previous_employer: William Hill AI (2018-2021)
  research_focus: primary=UK sports betting ML, secondary=odds compilation

Entity: researcher/olga_ostrowski
  affiliation: Princeton CS
  publication_count: 46
  previous_employer: Paddy Power AI (2016-2019)
  research_focus: primary=Irish bookmaker ML, secondary=customer analytics

Entity: researcher/chukwuemeka_ostrowski
  affiliation: Yale CS
  publication_count: 64
  previous_employer: Ladbrokes AI (2018-2021)
  research_focus: primary=UK betting ML, secondary=safer gambling

Entity: researcher/nadia_ostrowski_jr
  affiliation: Johns Hopkins CS
  publication_count: 38
  previous_employer: Kindred Group AI (2017-2020)
  research_focus: primary=Nordic gambling ML, secondary=responsible gaming

Entity: researcher/per_ostrowski
  affiliation: University of Edinburgh
  publication_count: 59
  previous_employer: Flutter Entertainment AI (2018-2021)
  research_focus: primary=global gambling ML, secondary=geolocation compliance

Entity: researcher/aisling_ostrowski
  affiliation: University of Glasgow
  publication_count: 45
  previous_employer: Entain AI (2016-2019)
  research_focus: primary=multi-brand gambling ML, secondary=cross-sell

Entity: researcher/ibrahim_ostrowski
  affiliation: University of Bristol
  publication_count: 80
  previous_employer:888 Holdings AI (2018-2021)
  research_focus: primary=online casino ML, secondary=churn prediction

Entity: researcher/astrid_ostrowski_jr
  affiliation: Aalborg University
  publication_count: 32
  previous_employer: Betway AI (2017-2020)
  research_focus: primary=esports betting ML, secondary=live odds

Entity: researcher/yusuf_ostrowski
  affiliation: Delft University of Technology
  publication_count: 68
  previous_employer: Unibet AI (2018-2021)
  research_focus: primary=European betting ML, secondary=player modeling

Entity: researcher/chidera_ostrowski
  affiliation: University of Zurich
  publication_count: 43
  previous_employer: Tipico AI (2016-2019)
  research_focus: primary=German sports betting ML, secondary=bonus prediction

Entity: researcher/ingrid_ostrowski
  affiliation: MIT CSAIL
  publication_count: 57
  previous_employer: PokerStars AI (2018-2021)
  research_focus: primary=online poker ML, secondary=bot detection

Entity: researcher/takumi_ostrowski
  affiliation: Stanford AI Lab
  publication_count: 74
  previous_employer: GGPoker AI (2019-2022)
  research_focus: primary=poker analytics ML, secondary=hand history ML

Entity: researcher/amalie_ostrowski
  affiliation: Carnegie Mellon SCS
  publication_count: 36
  previous_employer: Zynga Poker AI (2018-2021)
  research_focus: primary=social poker ML, secondary=player retention

Entity: researcher/seun_ostrowski
  affiliation: UC Berkeley EECS
  publication_count: 62
  previous_employer: Konami AI (2017-2020)
  research_focus: primary=slot machine ML, secondary=PAR sheet optimization

Entity: researcher/yuki_ostrowski_jr
  affiliation: Oxford CS
  publication_count: 49
  previous_employer: IGT AI (2018-2021)
  research_focus: primary=lottery ML, secondary=jackpot prediction

Entity: researcher/hector_ostrowski
  affiliation: Cambridge AI
  publication_count: 83
  previous_employer: Scientific Games AI (2016-2019)
  research_focus: primary=gaming technology ML, secondary=instant win

Entity: researcher/fatou_ostrowski
  affiliation: ETH Zurich
  publication_count: 40
  previous_employer: Everi AI (2018-2021)
  research_focus: primary=casino floor ML, secondary=slot performance

Entity: researcher/bogdan_ostrowski_jr
  affiliation: EPFL
  publication_count: 55
  previous_employer: Aristocrat AI (2017-2020)
  research_focus: primary=Australian gaming ML, secondary=electronic gaming machines

Entity: researcher/chidinma_ostrowski_jr
  affiliation: TU Berlin
  publication_count: 67
  previous_employer: Novomatic AI (2018-2021)
  research_focus: primary=Austrian gaming ML, secondary=land-based casino

Entity: researcher/kazuki_ostrowski
  affiliation: University of Toronto
  publication_count: 45
  previous_employer: Ainsworth AI (2016-2019)
  research_focus: primary=gaming machine ML, secondary=cabinet optimization

Entity: researcher/ingeborg_ostrowski
  affiliation: University of Amsterdam
  publication_count: 58
  previous_employer: Merkur Gaming AI (2018-2021)
  research_focus: primary=German gaming ML, secondary=player segmentation

Entity: researcher/kweku_ostrowski_jr
  affiliation: KU Leuven
  publication_count: 72
  previous_employer: Amatic AI (2017-2020)
  research_focus: primary=Belgian gaming ML, secondary=jackpot network

Entity: researcher/olena_ostrowski
  affiliation: Peking University
  publication_count: 37
  previous_employer: AGS AI (2018-2021)
  research_focus: primary=US gaming ML, secondary=tribal casino analytics

Entity: researcher/emeka_ostrowski_jr
  affiliation: Tsinghua CS
  publication_count: 80
  previous_employer: Zitro AI (2016-2019)
  research_focus: primary=Spanish gaming ML, secondary=bingo analytics

Entity: researcher/sigrid_ostrowski_jr
  affiliation: University of Tokyo
  publication_count: 44
  previous_employer: Sega Sammy AI (2018-2021)
  research_focus: primary=Japanese pachinko ML, secondary=machine utilization

Entity: researcher/ahmed_ostrowski
  affiliation: Seoul National University
  publication_count: 69
  previous_employer: Krafton AI (2017-2020)
  research_focus: primary=Korean battle royale ML, secondary=anti-cheat

Entity: researcher/oluwabunmi_ostrowski
  affiliation: IIT Bombay
  publication_count: 53
  previous_employer: Nazara Technologies AI (2018-2021)
  research_focus: primary=Indian gaming ML, secondary=regional language games

Entity: researcher/ingrid_ostrowski_jr
  affiliation: University of Cape Town
  publication_count: 38
  previous_employer: Carry1st AI (2016-2019)
  research_focus: primary=African mobile gaming ML, secondary=monetization localization

Entity: researcher/joao_ostrowski
  affiliation: Universidade de São Paulo
  publication_count: 75
  previous_employer: Gazeus Games AI (2018-2021)
  research_focus: primary=Brazilian card game ML, secondary=Truco analytics

Entity: researcher/chidera_ostrowski_jr
  affiliation: Tel Aviv University
  publication_count: 47
  previous_employer: Plarium AI (2017-2020)
  research_focus: primary=Israeli mid-core ML, secondary=player coalition

Entity: researcher/hiroshi_ostrowski
  affiliation: Hebrew University
  publication_count: 62
  previous_employer: 888casino AI (2018-2021)
  research_focus: primary=live casino ML, secondary=dealer performance

Entity: researcher/oluwatoyin_ostrowski
  affiliation: Technion
  publication_count: 34
  previous_employer: Evolution Gaming AI (2016-2019)
  research_focus: primary=live dealer ML, secondary=game capacity prediction

Entity: researcher/malin_ostrowski
  affiliation: Leiden University
  publication_count: 87
  previous_employer: Pragmatic Play AI (2018-2021)
  research_focus: primary=slot content ML, secondary=RTP optimization

Entity: researcher/chukwuebuka_ostrowski
  affiliation: University of Helsinki
  publication_count: 50
  previous_employer: Play'n GO AI (2017-2020)
  research_focus: primary=Swedish slot ML, secondary=theme performance

Entity: researcher/sakura_ostrowski
  affiliation: Warsaw University of Technology
  publication_count: 66
  previous_employer: NetEnt AI (2018-2021)
  research_focus: primary=Swedish online slot ML, secondary=branded game ML

Entity: researcher/kwame_ostrowski
  affiliation: Ghent University
  publication_count: 42
  previous_employer: Microgaming AI (2016-2019)
  research_focus: primary=Isle of Man gaming ML, secondary=platform analytics

Entity: researcher/naomi_ostrowski
  affiliation: University of Copenhagen
  publication_count: 59
  previous_employer: Quickspin AI (2018-2021)
  research_focus: primary=boutique slot ML, secondary=volatility calibration

Entity: researcher/antonio_ostrowski
  affiliation: Université Paris-Saclay
  publication_count: 78
  previous_employer: Yggdrasil AI (2017-2020)
  research_focus: primary=Nordic gaming ML, secondary=mechanic innovation

Entity: researcher/priya_ostrowski_jr
  affiliation: Max Planck Institute for Intelligent Systems
  publication_count: 45
  previous_employer: Hacksaw Gaming AI (2018-2021)
  research_focus: primary=hyper-casual slot ML, secondary=mechanic trending

Entity: researcher/nkechi_ostrowski_jr
  affiliation: Vector Institute
  publication_count: 69
  previous_employer: Thunderkick AI (2016-2019)
  research_focus: primary=Swedish premium slot ML, secondary=design analytics

Entity: researcher/anders_ostrowski_jr
  affiliation: Mila
  publication_count: 54
  previous_employer: Relax Gaming AI (2018-2021)
  research_focus: primary=aggregator ML, secondary=B2B content analytics

Entity: researcher/oluwaseun_ostrowski
  affiliation: Allen Institute for AI
  publication_count: 40
  previous_employer: Atomic Slot Lab AI (2017-2020)
  research_focus: primary=slot performance ML, secondary=launch timing

Entity: researcher/sophy_ostrowski
  affiliation: National University of Singapore
  publication_count: 73
  previous_employer: Gamevy AI (2018-2021)
  research_focus: primary=skill game ML, secondary=player matching

Entity: researcher/chukwudi_ostrowski
  affiliation: Nanyang Technological University
  publication_count: 46
  previous_employer: Skillz AI (2019-2022)
  research_focus: primary=competitive mobile ML, secondary=prize pool optimization

Entity: researcher/seungmin_ostrowski
  affiliation: KAIST
  publication_count: 68
  previous_employer: Kakao Games AI (2018-2021)
  research_focus: primary=Korean competitive ML, secondary=esports ML

Entity: researcher/oluwatobi_ostrowski_jr
  affiliation: Hong Kong University of Science and Technology
  publication_count: 35
  previous_employer: VSPN AI (2016-2019)
  research_focus: primary=Chinese esports ML, secondary=broadcast analytics

Entity: researcher/giulia_ostrowski_jr
  affiliation: Purdue University
  publication_count: 82
  previous_employer: ESL AI (2018-2021)
  research_focus: primary=global esports ML, secondary=player performance

Entity: researcher/nina_ostrowski
  affiliation: University of Michigan
  publication_count: 57
  previous_employer: FACEIT AI (2017-2020)
  research_focus: primary=competitive CS:GO ML, secondary=cheater detection

Entity: researcher/chidi_ostrowski
  affiliation: UT Austin CS
  publication_count: 44
  previous_employer: PGL AI (2018-2021)
  research_focus: primary=Dota 2 tournament ML, secondary=draft analytics

Entity: researcher/hana_ostrowski_jr
  affiliation: University of Washington
  publication_count: 70
  previous_employer: Blast AI (2016-2019)
  research_focus: primary=European esports ML, secondary=sponsor analytics

Entity: researcher/emeka_ostrowski_sr
  affiliation: NYU CS
  publication_count: 39
  previous_employer: Immortals Gaming AI (2018-2021)
  research_focus: primary=North American esports ML, secondary=team synergy

Entity: researcher/soren_ostrowski
  affiliation: Princeton CS
  publication_count: 76
  previous_employer: Team Liquid AI (2017-2020)
  research_focus: primary=multi-game org ML, secondary=player development

Entity: researcher/adaeze_ostrowski_jr
  affiliation: Yale CS
  publication_count: 49
  previous_employer: Cloud9 AI (2018-2021)
  research_focus: primary=US esports org ML, secondary=viewership prediction

Entity: researcher/jiro_ostrowski
  affiliation: Johns Hopkins CS
  publication_count: 63
  previous_employer: FaZe Clan AI (2016-2019)
  research_focus: primary=lifestyle esports ML, secondary=brand analytics

Entity: researcher/fatou_ostrowski_jr
  affiliation: University of Edinburgh
  publication_count: 34
  previous_employer: G2 Esports AI (2018-2021)
  research_focus: primary=European esports ML, secondary=content creator analytics

Entity: researcher/oluwabimpe_ostrowski
  affiliation: University of Glasgow
  publication_count: 58
  previous_employer: Astralis AI (2017-2020)
  research_focus: primary=Danish esports ML, secondary=practice regime optimization

Entity: researcher/yuka_ostrowski
  affiliation: University of Bristol
  publication_count: 45
  previous_employer: Fnatic AI (2018-2021)
  research_focus: primary=UK esports ML, secondary=player analytics

Entity: researcher/chibueze_ostrowski
  affiliation: Aalborg University
  publication_count: 77
  previous_employer: North Esports AI (2016-2019)
  research_focus: primary=Scandinavian esports ML, secondary=fantasy esports

Entity: researcher/katrin_ostrowski
  affiliation: Delft University of Technology
  publication_count: 40
  previous_employer: NAVI AI (2018-2021)
  research_focus: primary=CIS esports ML, secondary=tactical analysis

Entity: researcher/obinna_ostrowski
  affiliation: University of Zurich
  publication_count: 64
  previous_employer: Vitality AI (2017-2020)
  research_focus: primary=French esports ML, secondary=crowd analytics

Entity: researcher/ryo_ostrowski_jr
  affiliation: MIT CSAIL
  publication_count: 55
  previous_employer: Twitch AI (2018-2021)
  research_focus: primary=streaming ML, secondary=clip recommendation

Entity: researcher/alinta_ostrowski
  affiliation: Stanford AI Lab
  publication_count: 72
  previous_employer: YouTube Gaming AI (2016-2019)
  research_focus: primary=gaming content ML, secondary=creator growth

Entity: researcher/joachim_ostrowski
  affiliation: Carnegie Mellon SCS
  publication_count: 38
  previous_employer: Discord AI (2018-2021)
  research_focus: primary=community ML, secondary=toxicity detection

Entity: researcher/efua_ostrowski
  affiliation: UC Berkeley EECS
  publication_count: 86
  previous_employer: Reddit AI (2017-2020)
  research_focus: primary=social news ML, secondary=comment ranking

Entity: researcher/soren_ostrowski_jr
  affiliation: Oxford CS
  publication_count: 43
  previous_employer: Imgur AI (2018-2021)
  research_focus: primary=image community ML, secondary=meme detection

Entity: researcher/naomi_ostrowski_jr
  affiliation: Cambridge AI
  publication_count: 59
  previous_employer: Stack Overflow AI (2016-2019)
  research_focus: primary=developer community ML, secondary=question routing

Entity: researcher/tariq_ostrowski
  affiliation: ETH Zurich
  publication_count: 68
  previous_employer: GitHub AI (2018-2021)
  research_focus: primary=code community ML, secondary=issue triage

Entity: researcher/oluwakayode_ostrowski
  affiliation: EPFL
  publication_count: 36
  previous_employer: GitLab AI (2017-2020)
  research_focus: primary=DevOps ML, secondary=CI/CD optimization

Entity: researcher/haruki_ostrowski
  affiliation: TU Berlin
  publication_count: 80
  previous_employer: Bitbucket AI (2018-2021)
  research_focus: primary=code review ML, secondary=PR quality prediction

Entity: researcher/chiamaka_ostrowski_sr
  affiliation: University of Toronto
  publication_count: 47
  previous_employer: JetBrains AI (2016-2019)
  research_focus: primary=IDE ML, secondary=code completion

Entity: researcher/nikolai_ostrowski
  affiliation: University of Amsterdam
  publication_count: 62
  previous_employer: IntelliJ AI (2018-2021)
  research_focus: primary=Java development ML, secondary=refactoring suggestion

Entity: researcher/oluwafunmilayo_ostrowski
  affiliation: KU Leuven
  publication_count: 44
  previous_employer: Tabnine AI (2017-2020)
  research_focus: primary=code ML, secondary=language-agnostic completion

Entity: researcher/hyunjin_ostrowski
  affiliation: Peking University
  publication_count: 79
  previous_employer: Baidu Comate AI (2018-2021)
  research_focus: primary=Chinese code ML, secondary=low-level code optimization

Entity: researcher/chioma_ostrowski_jr
  affiliation: Tsinghua CS
  publication_count: 55
  previous_employer: Alibaba Codesense AI (2016-2019)
  research_focus: primary=enterprise code ML, secondary=code clone detection

Entity: researcher/rasmus_ostrowski_jr
  affiliation: University of Tokyo
  publication_count: 34
  previous_employer: NEC AI (2018-2021)
  research_focus: primary=Japanese software ML, secondary=legacy code modernization

Entity: researcher/adaeze_erikssen_sr
  affiliation: Seoul National University
  publication_count: 71
  previous_employer: Samsung SDS AI (2017-2020)
  research_focus: primary=Korean enterprise software ML, secondary=ERP analytics

Entity: researcher/bogdan_ostrowski_sr
  affiliation: IIT Bombay
  publication_count: 48
  previous_employer: HCL Technologies AI (2018-2021)
  research_focus: primary=Indian IT services ML, secondary=ticket classification

Entity: researcher/amara_ostrowski_jr
  affiliation: University of Cape Town
  publication_count: 66
  previous_employer: Dimension Data AI (2016-2019)
  research_focus: primary=South African IT ML, secondary=network operations

Entity: researcher/fumiko_ostrowski
  affiliation: Universidade de São Paulo
  publication_count: 40
  previous_employer: Stefanini AI (2018-2021)
  research_focus: primary=Brazilian IT services ML, secondary=ITSM automation

Entity: researcher/leon_ostrowski
  affiliation: Tel Aviv University
  publication_count: 53
  previous_employer: NICE Systems AI (2017-2020)
  research_focus: primary=Israeli enterprise ML, secondary=contact center AI

Entity: researcher/oluwafemi_ostrowski_jr
  affiliation: Hebrew University
  publication_count: 75
  previous_employer: Amdocs AI (2018-2021)
  research_focus: primary=telecom BSS ML, secondary=billing anomaly detection

Entity: researcher/kristoffer_ostrowski
  affiliation: Technion
  publication_count: 45
  previous_employer: Sapiens AI (2016-2019)
  research_focus: primary=insurance software ML, secondary=claims automation

Entity: researcher/yuna_ostrowski_jr
  affiliation: Leiden University
  publication_count: 68
  previous_employer: UNIT4 AI (2018-2021)
  research_focus: primary=ERP ML, secondary=finance automation

Entity: researcher/oluwakemi_ostrowski_jr
  affiliation: University of Helsinki
  publication_count: 36
  previous_employer: Basware AI (2017-2020)
  research_focus: primary=Finnish purchase-to-pay ML, secondary=invoice processing

Entity: researcher/daichi_ostrowski
  affiliation: Warsaw University of Technology
  publication_count: 82
  previous_employer: Comarch AI (2018-2021)
  research_focus: primary=Polish enterprise ML, secondary=loyalty program analytics

Entity: researcher/amira_ostrowski
  affiliation: Ghent University
  publication_count: 49
  previous_employer: Cegeka AI (2016-2019)
  research_focus: primary=Belgian IT services ML, secondary=infrastructure prediction

Entity: researcher/emre_ostrowski
  affiliation: University of Copenhagen
  publication_count: 58
  previous_employer: Trifork AI (2018-2021)
  research_focus: primary=Danish software ML, secondary=healthcare IT

Entity: researcher/chidinma_ostrowski_sr
  affiliation: Université Paris-Saclay
  publication_count: 74
  previous_employer: Capgemini AI (2017-2020)
  research_focus: primary=French IT services ML, secondary=project risk

Entity: researcher/yuya_ostrowski
  affiliation: Max Planck Institute for Intelligent Systems
  publication_count: 42
  previous_employer: SAP AI (2018-2021)
  research_focus: primary=German ERP ML, secondary=business process mining

Entity: researcher/oluwaseun_ostrowski_jr
  affiliation: Vector Institute
  publication_count: 66
  previous_employer: OpenText AI (2016-2019)
  research_focus: primary=content management ML, secondary=document classification

Entity: researcher/sigrid_ostrowski_sr
  affiliation: Mila
  publication_count: 39
  previous_employer: CGI AI (2018-2021)
  research_focus: primary=Canadian IT services ML, secondary=government analytics

Entity: researcher/oluwabunmi_ostrowski
  affiliation: Allen Institute for AI
  publication_count: 77
  previous_employer: SAIC AI (2017-2020)
  research_focus: primary=US government IT ML, secondary=defense analytics

Entity: researcher/kenta_ostrowski
  affiliation: National University of Singapore
  publication_count: 53
  previous_employer: NCS AI (2018-2021)
  research_focus: primary=Singapore government IT ML, secondary=smart nation

Entity: researcher/chibueze_ostrowski_jr
  affiliation: Nanyang Technological University
  publication_count: 44
  previous_employer: GovTech AI (2016-2019)
  research_focus: primary=Singapore public sector ML, secondary=citizen services

Entity: researcher/sung_jun_ostrowski
  affiliation: KAIST
  publication_count: 70
  previous_employer: NIA Korea AI (2018-2021)
  research_focus: primary=Korean e-government ML, secondary=public data analytics

Entity: researcher/oluwatoyin_ostrowski
  affiliation: Hong Kong University of Science and Technology
  publication_count: 35
  previous_employer: OGCIO AI (2017-2020)
  research_focus: primary=Hong Kong e-government ML, secondary=digital ID

Entity: researcher/astrid_ostrowski_sr
  affiliation: Purdue University
  publication_count: 89
  previous_employer: Booz Allen Hamilton AI (2018-2021)
  research_focus: primary=US federal AI, secondary=mission analytics

Entity: researcher/mikael_ostrowski
  affiliation: University of Michigan
  publication_count: 48
  previous_employer: Leidos AI (2016-2019)
  research_focus: primary=defence IT ML, secondary=surveillance analytics

Entity: researcher/oluwatobi_ostrowski_sr
  affiliation: UT Austin CS
  publication_count: 61
  previous_employer: SAIC Defence AI (2018-2021)
  research_focus: primary=US military ML, secondary=ISR processing

Entity: researcher/kazuya_ostrowski
  affiliation: University of Washington
  publication_count: 37
  previous_employer: L3Harris Government AI (2017-2020)
  research_focus: primary=command and control ML, secondary=decision support

Entity: researcher/oluwakayode_ostrowski_jr
  affiliation: NYU CS
  publication_count: 73
  previous_employer: Raytheon AI (2018-2021)
  research_focus: primary=radar ML, secondary=target classification

Entity: researcher/chidera_ostrowski_sr
  affiliation: Princeton CS
  publication_count: 50
  previous_employer: Northrop Grumman AI (2016-2019)
  research_focus: primary=autonomous systems ML, secondary=mission planning

Entity: researcher/fumiya_ostrowski
  affiliation: Yale CS
  publication_count: 64
  previous_employer: Lockheed Martin AI (2018-2021)
  research_focus: primary=aerospace ML, secondary=sensor fusion

Entity: researcher/oluwafunmilayo_ostrowski
  affiliation: Johns Hopkins CS
  publication_count: 38
  previous_employer: Boeing Defence AI (2017-2020)
  research_focus: primary=aircraft ML, secondary=avionics systems

Entity: researcher/nkechi_ostrowski_sr
  affiliation: University of Edinburgh
  publication_count: 56
  previous_employer: BAE Systems AI (2018-2021)
  research_focus: primary=UK defence ML, secondary=electronic warfare

Entity: researcher/hirotaka_ostrowski
  affiliation: University of Glasgow
  publication_count: 43
  previous_employer: Thales UK AI (2016-2019)
  research_focus: primary=Scottish defence ML, secondary=sonar analytics

Entity: researcher/oluwabimpe_ostrowski_jr
  affiliation: University of Bristol
  publication_count: 78
  previous_employer: Leonardo UK AI (2018-2021)
  research_focus: primary=helicopter systems ML, secondary=rotor diagnostics

Entity: researcher/emeka_ostrowski_ii
  affiliation: Aalborg University
  publication_count: 47
  previous_employer: Terma Denmark AI (2017-2020)
  research_focus: primary=Danish defence ML, secondary=AESA radar

Entity: researcher/hana_ostrowski_sr
  affiliation: Delft University of Technology
  publication_count: 62
  previous_employer: Fokker AI (2018-2021)
  research_focus: primary=Dutch aircraft ML, secondary=structural health monitoring

Entity: researcher/chiamaka_ostrowski_ii
  affiliation: University of Zurich
  publication_count: 39
  previous_employer: RUAG Defence AI (2016-2019)
  research_focus: primary=Swiss defence ML, secondary=armoured vehicle ML

Entity: researcher/riku_ostrowski
  affiliation: MIT CSAIL
  publication_count: 75
  previous_employer: DARPA AI (2018-2021)
  research_focus: primary=US advanced research ML, secondary=explainability

Entity: researcher/chidinma_ostrowski_iv
  affiliation: Stanford AI Lab
  publication_count: 54
  previous_employer: IARPA AI (2017-2020)
  research_focus: primary=intelligence ML, secondary=forecasting

Entity: researcher/felix_ostrowski
  affiliation: Carnegie Mellon SCS
  publication_count: 45
  previous_employer: AFRL AI (2018-2021)
  research_focus: primary=US Air Force ML, secondary=flight control

Entity: researcher/naomi_ostrowski_sr
  affiliation: UC Berkeley EECS
  publication_count: 67
  previous_employer: ONR AI (2016-2019)
  research_focus: primary=US Navy ML, secondary=sonar processing

Entity: researcher/chukwudi_ostrowski_jr
  affiliation: Oxford CS
  publication_count: 40
  previous_employer: DSTL AI (2018-2021)
  research_focus: primary=UK science and technology ML, secondary=CBRN analytics

Entity: researcher/sigrid_ostrowski_ii
  affiliation: Cambridge AI
  publication_count: 81
  previous_employer: Fraunhofer FKIE AI (2017-2020)
  research_focus: primary=German defence ML, secondary=communication ML

Entity: researcher/adaobi_ostrowski
  affiliation: ETH Zurich
  publication_count: 48
  previous_employer: armasuisse AI (2018-2021)
  research_focus: primary=Swiss armed forces ML, secondary=tactical networks

Entity: researcher/soren_ostrowski_sr
  affiliation: EPFL
  publication_count: 61
  previous_employer: GAMMA AI (2016-2019)
  research_focus: primary=Swiss military ML, secondary=geospatial analytics

Entity: researcher/yuriko_ostrowski
  affiliation: TU Berlin
  publication_count: 34
  previous_employer: Bundeswehr AI (2018-2021)
  research_focus: primary=German military ML, secondary=logistics prediction

Entity: researcher/oluwakemi_ostrowski_sr
  affiliation: University of Toronto
  publication_count: 86
  previous_employer: DND Canada AI (2017-2020)
  research_focus: primary=Canadian defence ML, secondary=Arctic surveillance

Entity: researcher/nicholas_ostrowski
  affiliation: University of Amsterdam
  publication_count: 53
  previous_employer: TNO Defence AI (2018-2021)
  research_focus: primary=Dutch military ML, secondary=chemical detection

Entity: researcher/chukwuebuka_ostrowski
  affiliation: KU Leuven
  publication_count: 42
  previous_employer: Belgian Defence AI (2016-2019)
  research_focus: primary=Belgian military ML, secondary=infantry analytics

Entity: researcher/sakura_ostrowski_jr
  affiliation: Peking University
  publication_count: 69
  previous_employer: PLA AI (2018-2021)
  research_focus: primary=Chinese military ML, secondary=C4ISR

Entity: researcher/adebayo_ostrowski
  affiliation: Tsinghua CS
  publication_count: 76
  previous_employer: CASIC AI (2017-2020)
  research_focus: primary=Chinese aerospace ML, secondary=missile guidance

Entity: researcher/ryo_ostrowski_sr
  affiliation: University of Tokyo
  publication_count: 45
  previous_employer: TRDI AI (2018-2021)
  research_focus: primary=Japanese defence ML, secondary=radar signal processing

Entity: researcher/christel_ostrowski
  affiliation: Seoul National University
  publication_count: 58
  previous_employer: ADD Korea AI (2016-2019)
  research_focus: primary=Korean defence ML, secondary=UAV swarms

Entity: researcher/kwabena_ostrowski_jr
  affiliation: IIT Bombay
  publication_count: 37
  previous_employer: DRDO AI (2018-2021)
  research_focus: primary=Indian defence ML, secondary=sonar processing

Entity: researcher/oluwafunke_ostrowski
  affiliation: University of Cape Town
  publication_count: 80
  previous_employer: Armscor AI (2017-2020)
  research_focus: primary=South African defence ML, secondary=border surveillance

Entity: researcher/jiro_ostrowski_jr
  affiliation: Universidade de São Paulo
  publication_count: 44
  previous_employer: Embraer Defence AI (2018-2021)
  research_focus: primary=Brazilian military ML, secondary=fleet management

Entity: researcher/nneka_ostrowski_sr
  affiliation: Tel Aviv University
  publication_count: 66
  previous_employer: Elbit Systems AI (2016-2019)
  research_focus: primary=Israeli defence ML, secondary=EO/IR systems

Entity: researcher/bjoern_ostrowski
  affiliation: Hebrew University
  publication_count: 39
  previous_employer: IAI Defence AI (2018-2021)
  research_focus: primary=Israeli aerospace ML, secondary=EW systems

Entity: researcher/chiamaka_ostrowski_iii
  affiliation: Technion
  publication_count: 73
  previous_employer: Rafael AI (2017-2020)
  research_focus: primary=Israeli weapons systems ML, secondary=precision guidance

Entity: researcher/haruto_ostrowski
  affiliation: Leiden University
  publication_count: 55
  previous_employer: Thales Netherlands AI (2018-2021)
  research_focus: primary=Dutch defence ML, secondary=frigate combat systems

Entity: researcher/adaeze_gronqvist_ii
  affiliation: University of Helsinki
  publication_count: 42
  previous_employer: Patria Defence AI (2016-2019)
  research_focus: primary=Finnish military ML, secondary=C2 analytics

Entity: researcher/kweku_nakamura_ii
  affiliation: Warsaw University of Technology
  publication_count: 68
  previous_employer: PGZ AI (2018-2021)
  research_focus: primary=Polish armaments ML, secondary=self-propelled howitzer ML

Entity: researcher/oluwasegun_ostrowski
  affiliation: Ghent University
  publication_count: 46
  previous_employer: FN Herstal AI (2017-2020)
  research_focus: primary=Belgian small arms ML, secondary=ballistics prediction

Entity: researcher/yuki_ostrowski_sr
  affiliation: University of Copenhagen
  publication_count: 59
  previous_employer: Terma Defence AI (2018-2021)
  research_focus: primary=Danish defence electronics ML, secondary=pod analytics

Entity: researcher/adeola_ostrowski
  affiliation: Université Paris-Saclay
  publication_count: 83
  previous_employer: MBDA AI (2016-2019)
  research_focus: primary=European missile ML, secondary=guidance optimization

Entity: researcher/tobias_ostrowski
  affiliation: Max Planck Institute for Intelligent Systems
  publication_count: 38
  previous_employer: Diehl AI (2018-2021)
  research_focus: primary=German defence ML, secondary=ammunition ML

Entity: researcher/chibuike_ostrowski
  affiliation: Vector Institute
  publication_count: 72
  previous_employer: CAE Defence AI (2017-2020)
  research_focus: primary=Canadian military training ML, secondary=simulation fidelity

Entity: researcher/fumika_ostrowski_jr
  affiliation: Mila
  publication_count: 49
  previous_employer: SNC-Lavalin AI (2018-2021)
  research_focus: primary=Canadian engineering ML, secondary=nuclear safety

Entity: researcher/obafemi_ostrowski
  affiliation: Allen Institute for AI
  publication_count: 64
  previous_employer: TRIUMF AI (2016-2019)
  research_focus: primary=Canadian nuclear physics ML, secondary=particle tracking

Entity: researcher/kenta_ostrowski_jr
  affiliation: National University of Singapore
  publication_count: 40
  previous_employer: DSO National Laboratories AI (2018-2021)
  research_focus: primary=Singapore defence research ML, secondary=signals analytics

Entity: researcher/oluwakayode_ostrowski_sr
  affiliation: Nanyang Technological University
  publication_count: 77
  previous_employer: ST Kinetics AI (2017-2020)
  research_focus: primary=Singapore land systems ML, secondary=autonomous vehicles

Entity: researcher/daichi_ostrowski_jr
  affiliation: KAIST
  publication_count: 53
  previous_employer: Hanwha Systems AI (2018-2021)
  research_focus: primary=Korean defence systems ML, secondary=AESA radar ML

Entity: researcher/chiamaka_ostrowski_iv
  affiliation: Hong Kong University of Science and Technology
  publication_count: 45
  previous_employer: HKUST Applied Science AI (2016-2019)
  research_focus: primary=Hong Kong security ML, secondary=crowd analytics

Entity: researcher/nikolai_ostrowski_jr
  affiliation: Purdue University
  publication_count: 69
  previous_employer: Rolls-Royce Defence AI (2018-2021)
  research_focus: primary=turbofan ML, secondary=hot section diagnostics

Entity: researcher/bjoern_ostrowski_jr
  affiliation: University of Michigan
  publication_count: 36
  previous_employer: GE Aviation AI (2017-2020)
  research_focus: primary=aircraft engine ML, secondary=prognostic health management

Entity: researcher/adeola_ostrowski_jr
  affiliation: UT Austin CS
  publication_count: 80
  previous_employer: Pratt & Whitney AI (2018-2021)
  research_focus: primary=jet engine ML, secondary=compressor stall prediction

Entity: researcher/fumio_ostrowski
  affiliation: University of Washington
  publication_count: 45
  previous_employer: Safran Aircraft Engines AI (2016-2019)
  research_focus: primary=French engine ML, secondary=LEAP engine analytics

Entity: researcher/sigrid_ostrowski_iii
  affiliation: NYU CS
  publication_count: 63
  previous_employer: MTU Aero Engines AI (2018-2021)
  research_focus: primary=German engine ML, secondary=compressor blade ML

Entity: researcher/adeola_ostrowski_sr
  affiliation: Princeton CS
  publication_count: 38
  previous_employer: Honeywell Aerospace AI (2017-2020)
  research_focus: primary=avionics ML, secondary=flight data analytics

Entity: researcher/chidinma_ostrowski_v
  affiliation: Yale CS
  publication_count: 82
  previous_employer: Collins Aerospace AI (2018-2021)
  research_focus: primary=aerostructures ML, secondary=composite inspection

Entity: researcher/fumika_ostrowski_sr
  affiliation: Johns Hopkins CS
  publication_count: 54
  previous_employer: Spirit AeroSystems AI (2016-2019)
  research_focus: primary=aircraft assembly ML, secondary=defect detection

Entity: researcher/oluwabimpe_ostrowski_sr
  affiliation: University of Edinburgh
  publication_count: 43
  previous_employer: GKN Aerospace AI (2018-2021)
  research_focus: primary=UK composite ML, secondary=wing box analytics

Entity: researcher/christel_ostrowski_jr
  affiliation: University of Glasgow
  publication_count: 67
  previous_employer: Stelia Aerospace AI (2017-2020)
  research_focus: primary=French fuselage ML, secondary=assembly sequencing

Entity: researcher/adaeze_ostrowski_sr
  affiliation: University of Bristol
  publication_count: 40
  previous_employer: GE Additive AI (2018-2021)
  research_focus: primary=additive manufacturing ML, secondary=metal powder analytics

Entity: researcher/oluwafunke_ostrowski_jr
  affiliation: Aalborg University
  publication_count: 74
  previous_employer: 3D Systems AI (2016-2019)
  research_focus: primary=SLA/SLS ML, secondary=build failure prediction

Entity: researcher/kweku_ostrowski_sr
  affiliation: Delft University of Technology
  publication_count: 50
  previous_employer: Materialise AI (2018-2021)
  research_focus: primary=Belgian 3D printing ML, secondary=medical device manufacturing

Entity: researcher/chioma_ostrowski_sr
  affiliation: University of Zurich
  publication_count: 62
  previous_employer: Stratasys AI (2017-2020)
  research_focus: primary=polymer AM ML, secondary=part quality prediction

Entity: researcher/priya_berg
  affiliation: MIT CSAIL
  publication_count: 61
  previous_employer: Google Brain (2018-2021)
  research_focus: primary=natural language processing, secondary=question answering

Entity: researcher/oluwatobiloba_berg
  affiliation: Stanford AI Lab
  publication_count: 45
  previous_employer: OpenAI (2016-2019)
  research_focus: primary=few-shot learning, secondary=meta-learning

Entity: researcher/amina_berg
  affiliation: Carnegie Mellon SCS
  publication_count: 73
  previous_employer: Meta AI (2018-2021)
  research_focus: primary=robotics, secondary=manipulation

Entity: researcher/bogdan_berg
  affiliation: UC Berkeley EECS
  publication_count: 37
  previous_employer: DeepMind (2017-2020)
  research_focus: primary=model-based RL, secondary=world models

Entity: researcher/yuna_berg
  affiliation: Oxford CS
  publication_count: 66
  previous_employer: Microsoft Research (2019-2022)
  research_focus: primary=machine learning, secondary=active learning

Entity: researcher/kwabena_berg
  affiliation: Cambridge AI
  publication_count: 51
  previous_employer: Amazon Science (2016-2019)
  research_focus: primary=NLP, secondary=entity linking

Entity: researcher/fatou_berg
  affiliation: ETH Zurich
  publication_count: 82
  previous_employer: Google DeepMind (2018-2021)
  research_focus: primary=generative models, secondary=flow matching

Entity: researcher/aleksei_berg
  affiliation: EPFL
  publication_count: 39
  previous_employer: NVIDIA Research (2017-2020)
  research_focus: primary=3D generation, secondary=NeRF

Entity: researcher/zainab_berg
  affiliation: TU Berlin
  publication_count: 55
  previous_employer: Intel Labs (2018-2021)
  research_focus: primary=embedded ML, secondary=TinyML

Entity: researcher/ryo_berg
  affiliation: University of Toronto
  publication_count: 68
  previous_employer: Samsung AI Center (2016-2019)
  research_focus: primary=on-device speech, secondary=keyword spotting

Entity: researcher/nadia_berg
  affiliation: University of Amsterdam
  publication_count: 42
  previous_employer: Spotify Research (2018-2021)
  research_focus: primary=music recommendation, secondary=audio ML

Entity: researcher/pierre_berg
  affiliation: KU Leuven
  publication_count: 76
  previous_employer: Baidu Research (2017-2020)
  research_focus: primary=knowledge graph completion, secondary=embedding

Entity: researcher/sunita_berg
  affiliation: Peking University
  publication_count: 53
  previous_employer: Tencent AI Lab (2018-2021)
  research_focus: primary=video recommendation, secondary=user modeling

Entity: researcher/mikhail_berg
  affiliation: Tsinghua CS
  publication_count: 39
  previous_employer: Alibaba DAMO Academy (2016-2019)
  research_focus: primary=product search, secondary=visual search

Entity: researcher/ingeborg_berg
  affiliation: University of Tokyo
  publication_count: 74
  previous_employer: NTT AI (2018-2021)
  research_focus: primary=quantum computing, secondary=variational algorithms

Entity: researcher/kofi_berg
  affiliation: Seoul National University
  publication_count: 47
  previous_employer: Samsung Research (2017-2020)
  research_focus: primary=memory systems, secondary=DRAM ML

Entity: researcher/valentina_berg
  affiliation: IIT Bombay
  publication_count: 60
  previous_employer: TCS Research (2018-2021)
  research_focus: primary=enterprise NLP, secondary=document understanding

Entity: researcher/oluseun_berg
  affiliation: University of Cape Town
  publication_count: 35
  previous_employer: Naspers AI (2016-2019)
  research_focus: primary=African e-commerce ML, secondary=cross-border trade

Entity: researcher/camila_berg
  affiliation: Universidade de São Paulo
  publication_count: 79
  previous_employer: Vale AI (2018-2021)
  research_focus: primary=mining ML, secondary=ore grade prediction

Entity: researcher/ibrahim_berg
  affiliation: Tel Aviv University
  publication_count: 44
  previous_employer: Mobileye AI (2017-2020)
  research_focus: primary=autonomous driving perception, secondary=lane detection

Entity: researcher/mei_berg
  affiliation: Hebrew University
  publication_count: 67
  previous_employer: AudioCodes AI (2018-2021)
  research_focus: primary=speech processing, secondary=voice AI

Entity: researcher/fredrik_berg
  affiliation: Technion
  publication_count: 52
  previous_employer: Elbit Imaging AI (2016-2019)
  research_focus: primary=medical imaging ML, secondary=MRI reconstruction

Entity: researcher/adaeze_nakamura_jr
  affiliation: Leiden University
  publication_count: 41
  previous_employer: Philips Research (2018-2021)
  research_focus: primary=interventional imaging ML, secondary=CT reconstruction

Entity: researcher/hamid_berg
  affiliation: University of Helsinki
  publication_count: 65
  previous_employer: GE Healthcare AI (2016-2019)
  research_focus: primary=ultrasound ML, secondary=cardiac assessment

Entity: researcher/anna_berg
  affiliation: Warsaw University of Technology
  publication_count: 38
  previous_employer: Siemens Healthineers AI (2018-2021)
  research_focus: primary=MRI ML, secondary=brain segmentation

Entity: researcher/leon_berg
  affiliation: Ghent University
  publication_count: 73
  previous_employer: Agfa HealthCare AI (2017-2020)
  research_focus: primary=radiology workflow ML, secondary=PACS analytics

Entity: researcher/hana_berg
  affiliation: University of Copenhagen
  publication_count: 56
  previous_employer: Sectra AI (2018-2021)
  research_focus: primary=Scandinavian radiology ML, secondary=mammography

Entity: researcher/victor_berg
  affiliation: Université Paris-Saclay
  publication_count: 44
  previous_employer: Guerbet AI (2016-2019)
  research_focus: primary=contrast agent ML, secondary=MRI enhancement

Entity: researcher/liu_berg
  affiliation: Max Planck Institute for Intelligent Systems
  publication_count: 68
  previous_employer: Google Brain (2018-2021)
  research_focus: primary=self-supervised vision, secondary=MAE

Entity: researcher/fatima_berg
  affiliation: Vector Institute
  publication_count: 35
  previous_employer: Cerebras AI (2017-2020)
  research_focus: primary=wafer-scale ML, secondary=sparse computation

Entity: researcher/jose_berg
  affiliation: Mila
  publication_count: 81
  previous_employer: Graphcore AI (2018-2021)
  research_focus: primary=IPU computing, secondary=graph ML hardware

Entity: researcher/elena_berg
  affiliation: Allen Institute for AI
  publication_count: 47
  previous_employer: SambaNova AI (2016-2019)
  research_focus: primary=reconfigurable dataflow ML, secondary=DNN optimization

Entity: researcher/tanvir_berg
  affiliation: National University of Singapore
  publication_count: 62
  previous_employer: Groq AI (2018-2021)
  research_focus: primary=LPU computing, secondary=inference optimization

Entity: researcher/nkechi_berg
  affiliation: Nanyang Technological University
  publication_count: 39
  previous_employer: Habana Labs AI (2017-2020)
  research_focus: primary=Gaudi accelerator ML, secondary=training efficiency

Entity: researcher/lucas_berg
  affiliation: KAIST
  publication_count: 74
  previous_employer: Rebellions AI (2018-2021)
  research_focus: primary=Korean NPU ML, secondary=on-chip memory optimization

Entity: researcher/sofie_berg
  affiliation: Hong Kong University of Science and Technology
  publication_count: 53
  previous_employer: Baidu AI Chip (2016-2019)
  research_focus: primary=Chinese AI chip ML, secondary=Kunlun performance

Entity: researcher/aryan_berg
  affiliation: Purdue University
  publication_count: 41
  previous_employer: AMD AI (2018-2021)
  research_focus: primary=GPU ML, secondary=ROCm optimization

Entity: researcher/zara_berg
  affiliation: University of Michigan
  publication_count: 66
  previous_employer: Qualcomm AI Research (2017-2020)
  research_focus: primary=mobile NPU ML, secondary=DSP optimization

Entity: researcher/emeka_berg
  affiliation: UT Austin CS
  publication_count: 38
  previous_employer: Texas Instruments AI (2018-2021)
  research_focus: primary=embedded ML, secondary=DSP for ML

Entity: researcher/soo_jin_berg
  affiliation: University of Washington
  publication_count: 79
  previous_employer: Microsoft AI Hardware (2016-2019)
  research_focus: primary=FPGA ML, secondary=custom silicon

Entity: researcher/andile_berg
  affiliation: NYU CS
  publication_count: 54
  previous_employer: IBM Research (2018-2021)
  research_focus: primary=analog computing ML, secondary=phase-change memory

Entity: researcher/astrid_berg
  affiliation: Princeton CS
  publication_count: 43
  previous_employer: HP Labs AI (2017-2020)
  research_focus: primary=neuromorphic ML, secondary=memristor arrays

Entity: researcher/rodrigo_berg
  affiliation: Yale CS
  publication_count: 67
  previous_employer: Mythic AI (2018-2021)
  research_focus: primary=analog inference ML, secondary=power efficiency

Entity: researcher/chidinma_berg
  affiliation: Johns Hopkins CS
  publication_count: 35
  previous_employer: BrainChip AI (2016-2019)
  research_focus: primary=neuromorphic ML, secondary=spiking neural networks

Entity: researcher/niklas_berg
  affiliation: University of Edinburgh
  publication_count: 72
  previous_employer: Kalray AI (2018-2021)
  research_focus: primary=MPPA computing, secondary=dataflow ML

Entity: researcher/amara_berg
  affiliation: University of Glasgow
  publication_count: 48
  previous_employer: Arm AI (2017-2020)
  research_focus: primary=microarchitecture ML, secondary=energy efficiency

Entity: researcher/hassan_berg
  affiliation: University of Bristol
  publication_count: 63
  previous_employer: RISC-V Foundation AI (2018-2021)
  research_focus: primary=open ISA ML, secondary=hardware-software co-design

Entity: researcher/nneka_berg
  affiliation: Aalborg University
  publication_count: 37
  previous_employer: Synopsys AI (2016-2019)
  research_focus: primary=EDA ML, secondary=timing closure

Entity: researcher/siddharth_berg
  affiliation: Delft University of Technology
  publication_count: 76
  previous_employer: ASML AI (2018-2021)
  research_focus: primary=lithography ML, secondary=overlay control

Entity: researcher/yuki_berg_jr
  affiliation: University of Zurich
  publication_count: 52
  previous_employer: Cadence AI (2017-2020)
  research_focus: primary=EDA optimization ML, secondary=circuit synthesis

Entity: researcher/vera_berg
  affiliation: MIT CSAIL
  publication_count: 44
  previous_employer: Mentor Graphics AI (2018-2021)
  research_focus: primary=PCB ML, secondary=signal integrity

Entity: researcher/benedikt_berg
  affiliation: Stanford AI Lab
  publication_count: 69
  previous_employer: Ansys AI (2016-2019)
  research_focus: primary=simulation ML, secondary=FEA surrogate models

Entity: researcher/ishaan_berg
  affiliation: Carnegie Mellon SCS
  publication_count: 41
  previous_employer: Comsol AI (2018-2021)
  research_focus: primary=multiphysics ML, secondary=surrogate modeling

Entity: researcher/oluwakemi_berg
  affiliation: UC Berkeley EECS
  publication_count: 84
  previous_employer: Altair AI (2017-2020)
  research_focus: primary=structural ML, secondary=topology optimization

Entity: researcher/anders_berg
  affiliation: Oxford CS
  publication_count: 55
  previous_employer: Siemens PLM AI (2018-2021)
  research_focus: primary=CAD ML, secondary=design automation

Entity: researcher/nour_berg
  affiliation: Cambridge AI
  publication_count: 43
  previous_employer: Dassault Systèmes AI (2016-2019)
  research_focus: primary=PLM ML, secondary=product lifecycle analytics

Entity: researcher/chen_berg
  affiliation: ETH Zurich
  publication_count: 67
  previous_employer: Autodesk AI (2018-2021)
  research_focus: primary=generative design ML, secondary=CAM optimization

Entity: researcher/sigrid_berg
  affiliation: EPFL
  publication_count: 36
  previous_employer: PTC AI (2017-2020)
  research_focus: primary=IoT ML, secondary=industrial digital twin

Entity: researcher/abel_berg
  affiliation: TU Berlin
  publication_count: 78
  previous_employer: SAP IoT AI (2018-2021)
  research_focus: primary=manufacturing ML, secondary=process control

Entity: researcher/preethi_berg
  affiliation: University of Toronto
  publication_count: 47
  previous_employer: Rockwell Automation AI (2016-2019)
  research_focus: primary=industrial ML, secondary=PLC analytics

Entity: researcher/emre_berg
  affiliation: University of Amsterdam
  publication_count: 62
  previous_employer: ABB AI (2018-2021)
  research_focus: primary=power systems ML, secondary=grid automation

Entity: researcher/sonja_berg
  affiliation: KU Leuven
  publication_count: 39
  previous_employer: Schneider Electric AI (2017-2020)
  research_focus: primary=building management ML, secondary=HVAC optimization

Entity: researcher/kweku_berg
  affiliation: Peking University
  publication_count: 73
  previous_employer: Honeywell AI (2018-2021)
  research_focus: primary=process control ML, secondary=refinery optimization

Entity: researcher/aya_berg
  affiliation: Tsinghua CS
  publication_count: 54
  previous_employer: Emerson AI (2016-2019)
  research_focus: primary=DCS ML, secondary=valve diagnostics

Entity: researcher/adebayo_berg
  affiliation: University of Tokyo
  publication_count: 42
  previous_employer: Yokogawa AI (2018-2021)
  research_focus: primary=Japanese process ML, secondary=distributed control

Entity: researcher/hina_berg
  affiliation: Seoul National University
  publication_count: 66
  previous_employer: LS Electric AI (2017-2020)
  research_focus: primary=Korean industrial ML, secondary=switchgear analytics

Entity: researcher/marco_berg
  affiliation: IIT Bombay
  publication_count: 35
  previous_employer: L&T Technology AI (2018-2021)
  research_focus: primary=Indian industrial ML, secondary=engineering services

Entity: researcher/thandi_berg
  affiliation: University of Cape Town
  publication_count: 80
  previous_employer: Sasol AI (2016-2019)
  research_focus: primary=petrochemical ML, secondary=plant optimization

Entity: researcher/renata_berg
  affiliation: Universidade de São Paulo
  publication_count: 53
  previous_employer: Petrobras AI (2018-2021)
  research_focus: primary=oil and gas ML, secondary=reservoir simulation

Entity: researcher/bilal_berg
  affiliation: Tel Aviv University
  publication_count: 45
  previous_employer: Orpak AI (2017-2020)
  research_focus: primary=fuel retail ML, secondary=station optimization

Entity: researcher/chioma_berg_jr
  affiliation: Hebrew University
  publication_count: 69
  previous_employer: Delek AI (2018-2021)
  research_focus: primary=Israeli oil ML, secondary=pipeline management

Entity: researcher/fredrik_berg_jr
  affiliation: Technion
  publication_count: 38
  previous_employer: Tower Semiconductor AI (2016-2019)
  research_focus: primary=fab ML, secondary=yield prediction

Entity: researcher/giulia_berg
  affiliation: Leiden University
  publication_count: 84
  previous_employer: NXP Semiconductors AI (2018-2021)
  research_focus: primary=automotive chip ML, secondary=functional safety

Entity: researcher/tariq_berg
  affiliation: University of Helsinki
  publication_count: 57
  previous_employer: Nordic Semiconductor AI (2017-2020)
  research_focus: primary=IoT chip ML, secondary=BLE analytics

Entity: researcher/oluwatobi_berg_jr
  affiliation: Warsaw University of Technology
  publication_count: 44
  previous_employer: Aptiv AI (2018-2021)
  research_focus: primary=automotive ML, secondary=ADAS

Entity: researcher/paloma_berg
  affiliation: Ghent University
  publication_count: 62
  previous_employer: Melexis AI (2016-2019)
  research_focus: primary=Belgian automotive chip ML, secondary=sensor fusion

Entity: researcher/leif_berg
  affiliation: University of Copenhagen
  publication_count: 49
  previous_employer: Kamstrup AI (2018-2021)
  research_focus: primary=Danish smart meter ML, secondary=utility analytics

Entity: researcher/yasmin_berg
  affiliation: Université Paris-Saclay
  publication_count: 75
  previous_employer: Valeo AI (2017-2020)
  research_focus: primary=automotive perception ML, secondary=LIDAR processing

Entity: researcher/oluwafemi_berg_jr
  affiliation: Max Planck Institute for Intelligent Systems
  publication_count: 33
  previous_employer: Continental AI (2018-2021)
  research_focus: primary=German automotive ML, secondary=brake systems

Entity: researcher/zuzanna_berg
  affiliation: Vector Institute
  publication_count: 70
  previous_employer: Magna AI (2016-2019)
  research_focus: primary=Canadian tier-1 ML, secondary=seating systems

Entity: researcher/magnus_berg
  affiliation: Mila
  publication_count: 47
  previous_employer: Martinrea AI (2018-2021)
  research_focus: primary=metal stamping ML, secondary=die maintenance

Entity: researcher/adaora_berg
  affiliation: Allen Institute for AI
  publication_count: 58
  previous_employer: Linamar AI (2017-2020)
  research_focus: primary=precision machining ML, secondary=CNC optimization

Entity: researcher/ismail_berg
  affiliation: National University of Singapore
  publication_count: 39
  previous_employer: ST Engineering AI (2018-2021)
  research_focus: primary=Singapore precision engineering ML, secondary=smart manufacturing

Entity: researcher/nneka_berg_jr
  affiliation: Nanyang Technological University
  publication_count: 73
  previous_employer: Sembcorp Industries AI (2016-2019)
  research_focus: primary=industrial park ML, secondary=energy management

Entity: researcher/taeyang_berg
  affiliation: KAIST
  publication_count: 44
  previous_employer: LG Innotek AI (2018-2021)
  research_focus: primary=component ML, secondary=camera module analytics

Entity: researcher/lena_berg
  affiliation: Hong Kong University of Science and Technology
  publication_count: 66
  previous_employer: AAC Technologies AI (2017-2020)
  research_focus: primary=miniaturization ML, secondary=acoustic component

Entity: researcher/hugo_berg_jr
  affiliation: Purdue University
  publication_count: 29
  previous_employer: Flex AI (2018-2021)
  research_focus: primary=EMS ML, secondary=supply chain analytics

Entity: researcher/chiamaka_berg_jr
  affiliation: University of Michigan
  publication_count: 82
  previous_employer: Jabil AI (2016-2019)
  research_focus: primary=contract manufacturing ML, secondary=quality prediction

Entity: researcher/rasmus_berg
  affiliation: UT Austin CS
  publication_count: 55
  previous_employer: Celestica AI (2018-2021)
  research_focus: primary=Canadian EMS ML, secondary=SMT analytics

Entity: researcher/mei_lin_berg
  affiliation: University of Washington
  publication_count: 40
  previous_employer: Benchmark Electronics AI (2017-2020)
  research_focus: primary=electronic assembly ML, secondary=test coverage

Entity: researcher/kwabena_berg
  affiliation: NYU CS
  publication_count: 77
  previous_employer: Foxconn AI (2018-2021)
  research_focus: primary=Taiwanese EMS ML, secondary=final assembly

Entity: researcher/olga_berg
  affiliation: Princeton CS
  publication_count: 46
  previous_employer: Pegatron AI (2016-2019)
  research_focus: primary=contract manufacturing ML, secondary=yield optimization

Entity: researcher/chukwuemeka_berg
  affiliation: Yale CS
  publication_count: 64
  previous_employer: Wistron AI (2018-2021)
  research_focus: primary=PC assembly ML, secondary=component shortage prediction

Entity: researcher/nadia_berg_jr
  affiliation: Johns Hopkins CS
  publication_count: 38
  previous_employer: Compal AI (2017-2020)
  research_focus: primary=notebook assembly ML, secondary=display quality

Entity: researcher/per_berg
  affiliation: University of Edinburgh
  publication_count: 59
  previous_employer: Quanta Computer AI (2018-2021)
  research_focus: primary=server assembly ML, secondary=data center supply

Entity: researcher/aisling_berg
  affiliation: University of Glasgow
  publication_count: 45
  previous_employer: Inventec AI (2016-2019)
  research_focus: primary=white-box server ML, secondary=thermal management

Entity: researcher/ibrahim_berg_jr
  affiliation: University of Bristol
  publication_count: 80
  previous_employer: Hon Hai AI (2018-2021)
  research_focus: primary=precision connector ML, secondary=insertion force

Entity: researcher/astrid_berg_jr
  affiliation: Aalborg University
  publication_count: 32
  previous_employer: TE Connectivity AI (2017-2020)
  research_focus: primary=electronic connector ML, secondary=crimp quality

Entity: researcher/yusuf_berg
  affiliation: Delft University of Technology
  publication_count: 68
  previous_employer: Amphenol AI (2018-2021)
  research_focus: primary=RF connector ML, secondary=impedance prediction

Entity: researcher/chidera_berg_jr
  affiliation: University of Zurich
  publication_count: 43
  previous_employer: Molex AI (2016-2019)
  research_focus: primary=high-speed connector ML, secondary=signal integrity

Entity: researcher/ingrid_berg_jr
  affiliation: MIT CSAIL
  publication_count: 57
  previous_employer: Yazaki AI (2018-2021)
  research_focus: primary=automotive wiring ML, secondary=harness design

Entity: researcher/takumi_berg
  affiliation: Stanford AI Lab
  publication_count: 74
  previous_employer: Sumitomo Wiring AI (2017-2020)
  research_focus: primary=wire harness ML, secondary=routing optimization

Entity: researcher/amalie_berg
  affiliation: Carnegie Mellon SCS
  publication_count: 36
  previous_employer: Leoni AI (2018-2021)
  research_focus: primary=German wiring ML, secondary=EV cable systems

Entity: researcher/seun_berg
  affiliation: UC Berkeley EECS
  publication_count: 62
  previous_employer: Nexans AI (2016-2019)
  research_focus: primary=cable ML, secondary=subsea cable monitoring

Entity: researcher/yuki_berg_sr
  affiliation: Oxford CS
  publication_count: 49
  previous_employer: Prysmian AI (2018-2021)
  research_focus: primary=Italian cable ML, secondary=HVDC prediction

Entity: researcher/hector_berg
  affiliation: Cambridge AI
  publication_count: 83
  previous_employer: Southwire AI (2017-2020)
  research_focus: primary=US wire ML, secondary=rod breakdown analytics

Entity: researcher/fatou_berg_jr
  affiliation: ETH Zurich
  publication_count: 40
  previous_employer: Belden AI (2018-2021)
  research_focus: primary=industrial cable ML, secondary=Profinet analytics

Entity: researcher/bogdan_berg_jr
  affiliation: EPFL
  publication_count: 55
  previous_employer: General Cable AI (2016-2019)
  research_focus: primary=copper wire ML, secondary=scrap prediction

Entity: researcher/chidinma_berg_jr
  affiliation: TU Berlin
  publication_count: 67
  previous_employer: Siemens Cable AI (2018-2021)
  research_focus: primary=medium voltage ML, secondary=grid cable health

Entity: researcher/kazuki_berg
  affiliation: University of Toronto
  publication_count: 45
  previous_employer: Hydro One AI (2017-2020)
  research_focus: primary=Canadian transmission ML, secondary=line monitoring

Entity: researcher/ingeborg_berg_jr
  affiliation: University of Amsterdam
  publication_count: 58
  previous_employer: Alliander AI (2018-2021)
  research_focus: primary=Dutch grid ML, secondary=cable fault prediction

Entity: researcher/kweku_berg_jr
  affiliation: KU Leuven
  publication_count: 72
  previous_employer: Elia AI (2016-2019)
  research_focus: primary=Belgian high-voltage ML, secondary=congestion management

Entity: researcher/olena_berg
  affiliation: Peking University
  publication_count: 37
  previous_employer: China Southern Grid AI (2018-2021)
  research_focus: primary=South China grid ML, secondary=UHVDC

Entity: researcher/emeka_berg_jr
  affiliation: Tsinghua CS
  publication_count: 80
  previous_employer: State Grid SGCC AI (2016-2019)
  research_focus: primary=Chinese transmission ML, secondary=UHV line analytics

Entity: researcher/sigrid_berg_jr
  affiliation: University of Tokyo
  publication_count: 44
  previous_employer: TEPCO Power Grid AI (2018-2021)
  research_focus: primary=Tokyo distribution ML, secondary=outage prediction

Entity: researcher/ahmed_berg
  affiliation: Seoul National University
  publication_count: 69
  previous_employer: KEPCO Engineering AI (2017-2020)
  research_focus: primary=Korean HV transmission ML, secondary=substation analytics

Entity: researcher/oluwabunmi_berg_jr
  affiliation: IIT Bombay
  publication_count: 53
  previous_employer: Power Grid India AI (2018-2021)
  research_focus: primary=Indian transmission ML, secondary=reactive power

Entity: researcher/ingrid_berg_sr
  affiliation: University of Cape Town
  publication_count: 38
  previous_employer: Eskom Transmission AI (2016-2019)
  research_focus: primary=South African transmission ML, secondary=Koeberg analytics

Entity: researcher/joao_berg
  affiliation: Universidade de São Paulo
  publication_count: 75
  previous_employer: CTEEP AI (2018-2021)
  research_focus: primary=Brazilian HV ML, secondary=blackout prediction

Entity: researcher/chidera_berg_sr
  affiliation: Tel Aviv University
  publication_count: 47
  previous_employer: IEC Israel AI (2017-2020)
  research_focus: primary=Israeli distribution ML, secondary=fault location

Entity: researcher/hiroshi_berg
  affiliation: Hebrew University
  publication_count: 62
  previous_employer: Doral Energy AI (2018-2021)
  research_focus: primary=Israeli renewable ML, secondary=PV curtailment

Entity: researcher/oluwatoyin_berg
  affiliation: Technion
  publication_count: 34
  previous_employer: Energix AI (2016-2019)
  research_focus: primary=Israeli wind ML, secondary=turbine SCADA analytics

Entity: researcher/malin_berg
  affiliation: Leiden University
  publication_count: 88
  previous_employer: SolarEdge AI (2018-2021)
  research_focus: primary=inverter ML, secondary=yield assurance

Entity: researcher/chukwuebuka_berg
  affiliation: University of Helsinki
  publication_count: 51
  previous_employer: Neste AI (2017-2020)
  research_focus: primary=renewable fuels ML, secondary=feedstock optimization

Entity: researcher/sakura_berg
  affiliation: Warsaw University of Technology
  publication_count: 67
  previous_employer: PKN Orlen AI (2018-2021)
  research_focus: primary=Polish refinery ML, secondary=unit optimization

Entity: researcher/kwame_berg
  affiliation: Ghent University
  publication_count: 42
  previous_employer: TotalEnergies AI (2016-2019)
  research_focus: primary=French energy ML, secondary=LNG analytics

Entity: researcher/naomi_berg
  affiliation: University of Copenhagen
  publication_count: 59
  previous_employer: Equinor AI (2018-2021)
  research_focus: primary=Norwegian offshore ML, secondary=subsea analytics

Entity: researcher/antonio_berg
  affiliation: Université Paris-Saclay
  publication_count: 78
  previous_employer: Repsol AI (2017-2020)
  research_focus: primary=Spanish oil ML, secondary=deepwater prediction

Entity: researcher/priya_berg_jr
  affiliation: Max Planck Institute for Intelligent Systems
  publication_count: 45
  previous_employer: ENI AI (2018-2021)
  research_focus: primary=Italian oil ML, secondary=seismic interpretation

Entity: researcher/nkechi_berg_jr
  affiliation: Vector Institute
  publication_count: 69
  previous_employer: Suncor AI (2016-2019)
  research_focus: primary=Canadian oil sands ML, secondary=upgrader optimization

Entity: researcher/anders_berg_jr
  affiliation: Mila
  publication_count: 54
  previous_employer: Cenovus AI (2018-2021)
  research_focus: primary=Alberta oil ML, secondary=SAGD analytics

Entity: researcher/oluwaseun_berg_jr
  affiliation: Allen Institute for AI
  publication_count: 40
  previous_employer: ConocoPhillips AI (2017-2020)
  research_focus: primary=US upstream ML, secondary=reservoir characterization

Entity: researcher/sophy_berg
  affiliation: National University of Singapore
  publication_count: 73
  previous_employer: Shell Upstream AI (2018-2021)
  research_focus: primary=global upstream ML, secondary=well placement

Entity: researcher/chukwudi_berg
  affiliation: Nanyang Technological University
  publication_count: 46
  previous_employer: ExxonMobil AI (2016-2019)
  research_focus: primary=refinery ML, secondary=catalyst optimization

Entity: researcher/seungmin_berg
  affiliation: KAIST
  publication_count: 68
  previous_employer: SK Energy AI (2018-2021)
  research_focus: primary=Korean refinery ML, secondary=blending optimization

Entity: researcher/oluwatobi_berg_sr
  affiliation: Hong Kong University of Science and Technology
  publication_count: 35
  previous_employer: CNOOC AI (2017-2020)
  research_focus: primary=Chinese offshore ML, secondary=subsea tree analytics

Entity: researcher/giulia_berg_jr
  affiliation: Purdue University
  publication_count: 82
  previous_employer: Halliburton AI (2018-2021)
  research_focus: primary=drilling ML, secondary=bit wear prediction

Entity: researcher/nina_berg
  affiliation: University of Michigan
  publication_count: 57
  previous_employer: Schlumberger AI (2016-2019)
  research_focus: primary=well logging ML, secondary=formation evaluation

Entity: researcher/chidi_berg
  affiliation: UT Austin CS
  publication_count: 44
  previous_employer: Baker Hughes AI (2018-2021)
  research_focus: primary=oilfield services ML, secondary=ESP diagnostics

Entity: researcher/hana_berg_jr
  affiliation: University of Washington
  publication_count: 70
  previous_employer: Weatherford AI (2017-2020)
  research_focus: primary=lift optimization ML, secondary=rod pump analytics

Entity: researcher/emeka_berg_sr
  affiliation: NYU CS
  publication_count: 39
  previous_employer: NOV AI (2018-2021)
  research_focus: primary=drilling equipment ML, secondary=BHA analytics

Entity: researcher/soren_berg
  affiliation: Princeton CS
  publication_count: 76
  previous_employer: TechnipFMC AI (2016-2019)
  research_focus: primary=subsea ML, secondary=flow assurance

Entity: researcher/adaeze_berg_jr
  affiliation: Yale CS
  publication_count: 49
  previous_employer: Saipem AI (2018-2021)
  research_focus: primary=Italian offshore ML, secondary=pipeline installation

Entity: researcher/jiro_berg
  affiliation: Johns Hopkins CS
  publisher: (AI Research dept)
  publication_count: 63
  previous_employer: Petrofac AI (2016-2019)
  research_focus: primary=UK EPC ML, secondary=project schedule analytics

Entity: researcher/fatou_berg_sr
  affiliation: University of Edinburgh
  publication_count: 34
  previous_employer: Wood Group AI (2018-2021)
  research_focus: primary=asset integrity ML, secondary=corrosion prediction

Entity: researcher/oluwabimpe_berg_jr
  affiliation: University of Glasgow
  publication_count: 58
  previous_employer: Amec Foster Wheeler AI (2017-2020)
  research_focus: primary=UK engineering ML, secondary=brownfield analytics

Entity: researcher/yuka_berg
  affiliation: University of Bristol
  publication_count: 45
  previous_employer: Jacobs AI (2018-2021)
  research_focus: primary=infrastructure ML, secondary=asset management

Entity: researcher/chibueze_berg_jr
  affiliation: Aalborg University
  publication_count: 77
  previous_employer: Ramboll AI (2016-2019)
  research_focus: primary=Danish engineering ML, secondary=structural monitoring

Entity: researcher/katrin_berg
  affiliation: Delft University of Technology
  publication_count: 40
  previous_employer: Arcadis AI (2018-2021)
  research_focus: primary=Dutch infrastructure ML, secondary=flood risk modeling

Entity: researcher/obinna_berg
  affiliation: University of Zurich
  publication_count: 64
  previous_employer: Sweco AI (2017-2020)
  research_focus: primary=Swedish infrastructure ML, secondary=traffic ML

Entity: researcher/ryo_berg_jr
  affiliation: MIT CSAIL
  publication_count: 55
  previous_employer: WSP AI (2018-2021)
  research_focus: primary=global consulting ML, secondary=transport modeling

Entity: researcher/alinta_berg
  affiliation: Stanford AI Lab
  publication_count: 72
  previous_employer: AECOM AI (2016-2019)
  research_focus: primary=US infrastructure ML, secondary=bridge health

Entity: researcher/joachim_berg
  affiliation: Carnegie Mellon SCS
  publication_count: 38
  previous_employer: Stantec AI (2018-2021)
  research_focus: primary=Canadian engineering ML, secondary=environmental ML

Entity: researcher/efua_berg
  affiliation: UC Berkeley EECS
  publication_count: 86
  previous_employer: CH2M AI (2017-2020)
  research_focus: primary=water treatment ML, secondary=plant optimization

Entity: researcher/soren_berg_jr
  affiliation: Oxford CS
  publication_count: 43
  previous_employer: Arup AI (2018-2021)
  research_focus: primary=UK consulting ML, secondary=building performance

Entity: researcher/naomi_berg_jr
  affiliation: Cambridge AI
  publication_count: 59
  previous_employer: Atkins AI (2016-2019)
  research_focus: primary=UK infrastructure ML, secondary=rail analytics

Entity: researcher/tariq_berg_jr
  affiliation: ETH Zurich
  publication_count: 68
  previous_employer: Implenia AI (2018-2021)
  research_focus: primary=Swiss construction ML, secondary=tunnel analytics

Entity: researcher/oluwakayode_berg_jr
  affiliation: EPFL
  publication_count: 36
  previous_employer: CFF Holding AI (2017-2020)
  research_focus: primary=Swiss rail ML, secondary=timetable optimization

Entity: researcher/haruki_berg_jr
  affiliation: TU Berlin
  publication_count: 80
  previous_employer: DB AI (2018-2021)
  research_focus: primary=German rail ML, secondary=punctuality prediction

Entity: researcher/chiamaka_berg_sr
  affiliation: University of Toronto
  publication_count: 47
  previous_employer: Metrolinx AI (2016-2019)
  research_focus: primary=Toronto transit ML, secondary=GO train analytics

Entity: researcher/nikolai_berg_jr
  affiliation: University of Amsterdam
  publication_count: 62
  previous_employer: NS AI (2018-2021)
  research_focus: primary=Dutch rail ML, secondary=delay propagation

Entity: researcher/oluwafunmilayo_berg_jr
  affiliation: KU Leuven
  publication_count: 44
  previous_employer: Infrabel AI (2017-2020)
  research_focus: primary=Belgian rail ML, secondary=switch health monitoring

Entity: researcher/hyunjin_berg
  affiliation: Peking University
  publication_count: 79
  previous_employer: China Railway AI (2018-2021)
  research_focus: primary=Chinese HSR ML, secondary=track irregularity

Entity: researcher/chioma_berg_sr
  affiliation: Tsinghua CS
  publication_count: 55
  previous_employer: CRRC AI (2016-2019)
  research_focus: primary=rolling stock ML, secondary=bogie diagnostics

Entity: researcher/rasmus_berg_jr
  affiliation: University of Tokyo
  publication_count: 34
  previous_employer: JR East AI (2018-2021)
  research_focus: primary=Japanese Shinkansen ML, secondary=pantograph analytics

Entity: researcher/adaeze_erikssen_ii
  affiliation: Seoul National University
  publication_count: 71
  previous_employer: Korail AI (2017-2020)
  research_focus: primary=Korean rail ML, secondary=KTCS analytics

Entity: researcher/bogdan_berg_sr
  affiliation: IIT Bombay
  publication_count: 48
  previous_employer: Indian Railways AI (2018-2021)
  research_focus: primary=Indian rail ML, secondary=freight analytics

Entity: researcher/amara_berg_jr
  affiliation: University of Cape Town
  publication_count: 66
  previous_employer: Transnet AI (2016-2019)
  research_focus: primary=South African freight ML, secondary=loco health

Entity: researcher/fumiko_berg
  affiliation: Universidade de São Paulo
  publication_count: 40
  previous_employer: CBTU AI (2018-2021)
  research_focus: primary=Brazilian urban rail ML, secondary=metro analytics

Entity: researcher/leon_berg_jr
  affiliation: Tel Aviv University
  publication_count: 53
  previous_employer: Israel Railways AI (2017-2020)
  research_focus: primary=Israeli rail ML, secondary=crossing safety

Entity: researcher/oluwafemi_berg_sr
  affiliation: Hebrew University
  publication_count: 75
  previous_employer: LTR Israel AI (2018-2021)
  research_focus: primary=light rail ML, secondary=headway optimization

Entity: researcher/kristoffer_berg
  affiliation: Technion
  publication_count: 45
  previous_employer: NTA Israel AI (2016-2019)
  research_focus: primary=Israeli mass transit ML, secondary=BRT analytics

Entity: researcher/yuna_berg_jr
  affiliation: Leiden University
  publication_count: 68
  previous_employer: RET AI (2018-2021)
  research_focus: primary=Rotterdam metro ML, secondary=fare evasion detection

Entity: researcher/oluwakemi_berg_jr
  affiliation: University of Helsinki
  publication_count: 36
  previous_employer: HSL AI (2017-2020)
  research_focus: primary=Helsinki transit ML, secondary=real-time passenger

Entity: researcher/daichi_berg
  affiliation: Warsaw University of Technology
  publication_count: 82
  previous_employer: ZTM Warsaw AI (2018-2021)
  research_focus: primary=Warsaw transit ML, secondary=bus bunching

Entity: researcher/amira_berg_jr
  affiliation: Ghent University
  publication_count: 49
  previous_employer: De Lijn AI (2016-2019)
  research_focus: primary=Belgian bus ML, secondary=service reliability

Entity: researcher/emre_berg_jr
  affiliation: University of Copenhagen
  publication_count: 58
  previous_employer: Movia AI (2018-2021)
  research_focus: primary=Danish bus ML, secondary=transfer optimization

Entity: researcher/chidinma_berg_sr
  affiliation: Université Paris-Saclay
  publication_count: 74
  previous_employer: RATP AI (2017-2020)
  research_focus: primary=Paris metro ML, secondary=crowd flow

Entity: researcher/yuya_berg
  affiliation: Max Planck Institute for Intelligent Systems
  publication_count: 42
  previous_employer: Google Maps AI (2018-2021)
  research_focus: primary=navigation ML, secondary=ETA prediction

Entity: researcher/oluwaseun_berg_sr
  affiliation: Vector Institute
  publication_count: 66
  previous_employer: HERE Technologies AI (2016-2019)
  research_focus: primary=map ML, secondary=map freshness prediction

Entity: researcher/sigrid_berg_sr
  affiliation: Mila
  publication_count: 39
  previous_employer: TomTom AI (2018-2021)
  research_focus: primary=Dutch navigation ML, secondary=speed prediction

Entity: researcher/oluwabunmi_berg_sr
  affiliation: Allen Institute for AI
  publication_count: 77
  previous_employer: Apple Maps AI (2017-2020)
  research_focus: primary=indoor mapping ML, secondary=AR navigation

Entity: researcher/kenta_berg
  affiliation: National University of Singapore
  publication_count: 53
  previous_employer: Grab Maps AI (2018-2021)
  research_focus: primary=Southeast Asia navigation ML, secondary=two-wheel routing

Entity: researcher/chibueze_berg_sr
  affiliation: Nanyang Technological University
  publication_count: 43
  previous_employer: Waze AI (2016-2019)
  research_focus: primary=crowdsourced routing ML, secondary=incident detection

Entity: researcher/sung_jun_berg
  affiliation: KAIST
  publication_count: 70
  previous_employer: Kakao Maps AI (2018-2021)
  research_focus: primary=Korean navigation ML, secondary=POI ranking

Entity: researcher/oluwatoyin_berg_jr
  affiliation: Hong Kong University of Science and Technology
  publication_count: 35
  previous_employer: MTR AI (2017-2020)
  research_focus: primary=Hong Kong transit ML, secondary=interchange optimization

Entity: researcher/astrid_berg_sr
  affiliation: Purdue University
  publication_count: 89
  previous_employer: Mobileye Maps AI (2018-2021)
  research_focus: primary=autonomous map ML, secondary=HD map updating

Entity: researcher/mikael_berg
  affiliation: University of Michigan
  publication_count: 48
  previous_employer: GM Maps AI (2016-2019)
  research_focus: primary=in-vehicle map ML, secondary=lane-level prediction

Entity: researcher/oluwatobi_berg_ii
  affiliation: UT Austin CS
  publication_count: 61
  previous_employer: Tesla Maps AI (2018-2021)
  research_focus: primary=autonomous navigation ML, secondary=occupancy network

Entity: researcher/kazuya_berg
  affiliation: University of Washington
  publication_count: 37
  previous_employer: Zoox AI (2017-2020)
  research_focus: primary=robotaxi ML, secondary=bidirectional vehicle prediction

Entity: researcher/oluwakayode_berg_sr
  affiliation: NYU CS
  publication_count: 73
  previous_employer: Cruise AI (2018-2021)
  research_focus: primary=SF autonomous ML, secondary=urban corner case

Entity: researcher/chidera_berg_ii
  affiliation: Princeton CS
  publication_count: 50
  previous_employer: Motional AI (2016-2019)
  research_focus: primary=Las Vegas robotaxi ML, secondary=multi-sensor fusion

Entity: researcher/fumiya_berg
  affiliation: Yale CS
  publication_count: 64
  previous_employer: Aurora AI (2018-2021)
  research_focus: primary=long-haul autonomous ML, secondary=highway driving

Entity: researcher/oluwafunmilayo_berg_sr
  affiliation: Johns Hopkins CS
  publication_count: 38
  previous_employer: TuSimple AI (2016-2019)
  research_focus: primary=autonomous trucking ML, secondary=platooning

Entity: researcher/nkechi_berg_sr
  affiliation: University of Edinburgh
  publication_count: 56
  previous_employer: Einride AI (2018-2021)
  research_focus: primary=electric trucking ML, secondary=freight network

Entity: researcher/hirotaka_berg
  affiliation: University of Glasgow
  publication_count: 43
  previous_employer: Volta Trucks AI (2017-2020)
  research_focus: primary=Swedish EV truck ML, secondary=charging station

Entity: researcher/oluwabimpe_berg_sr
  affiliation: University of Bristol
  publication_count: 78
  previous_employer: Arrival AI (2018-2021)
  research_focus: primary=UK EV truck ML, secondary=microfactory analytics

Entity: researcher/emeka_berg_ii
  affiliation: Aalborg University
  publication_count: 47
  previous_employer: Scania AI (2016-2019)
  research_focus: primary=Swedish truck ML, secondary=predictive maintenance

Entity: researcher/hana_berg_sr
  affiliation: Delft University of Technology
  publication_count: 62
  previous_employer: DAF AI (2018-2021)
  research_focus: primary=Dutch truck ML, secondary=fuel consumption

Entity: researcher/chiamaka_berg_ii
  affiliation: University of Zurich
  publication_count: 39
  previous_employer: MAN AI (2017-2020)
  research_focus: primary=German commercial vehicle ML, secondary=driver behavior

Entity: researcher/riku_berg
  affiliation: MIT CSAIL
  publication_count: 75
  previous_employer: Daimler Truck AI (2018-2021)
  research_focus: primary=commercial truck ML, secondary=predictive safety

Entity: researcher/chidinma_berg_iv
  affiliation: Stanford AI Lab
  publication_count: 54
  previous_employer: Volvo Trucks AI (2016-2019)
  research_focus: primary=Swedish commercial ML, secondary=e-mobility analytics

Entity: researcher/felix_berg
  affiliation: Carnegie Mellon SCS
  publication_count: 45
  previous_employer: Paccar AI (2018-2021)
  research_focus: primary=US commercial truck ML, secondary=fleet telematics

Entity: researcher/naomi_berg_sr
  affiliation: UC Berkeley EECS
  publication_count: 67
  previous_employer: Peterbilt AI (2016-2019)
  research_focus: primary=North American truck ML, secondary=aerodynamics

Entity: researcher/chukwudi_berg_jr
  affiliation: Oxford CS
  publication_count: 40
  previous_employer: Kenworth AI (2018-2021)
  research_focus: primary=US truck ML, secondary=sleeper cab analytics

Entity: researcher/sigrid_berg_ii
  affiliation: Cambridge AI
  publication_count: 81
  previous_employer: Freightliner AI (2017-2020)
  research_focus: primary=Daimler US truck ML, secondary=connected vehicle

Entity: researcher/adaobi_berg_jr
  affiliation: ETH Zurich
  publication_count: 48
  previous_employer: IVECO AI (2018-2021)
  research_focus: primary=Italian truck ML, secondary=natural gas vehicle

Entity: researcher/soren_berg_sr
  affiliation: EPFL
  publication_count: 61
  previous_employer: Hino AI (2016-2019)
  research_focus: primary=Japanese light truck ML, secondary=hybrid drivetrain

Entity: researcher/yuriko_berg_jr
  affiliation: TU Berlin
  publication_count: 34
  previous_employer: Fuso AI (2018-2021)
  research_focus: primary=light commercial ML, secondary=last-mile delivery analytics

Entity: researcher/oluwakemi_berg_sr
  affiliation: University of Toronto
  publication_count: 86
  previous_employer: Toyota Commercial AI (2017-2020)
  research_focus: primary=commercial vehicle ML, secondary=hybrid truck analytics

Entity: researcher/nicholas_berg
  affiliation: University of Amsterdam
  publication_count: 53
  previous_employer: Renault Trucks AI (2018-2021)
  research_focus: primary=French commercial ML, secondary=Euro 7 compliance

Entity: researcher/chukwuebuka_berg_jr
  affiliation: KU Leuven
  publication_count: 42
  previous_employer: Volvo Group AI (2016-2019)
  research_focus: primary=multi-brand truck ML, secondary=connected services

Entity: researcher/sakura_berg_jr
  affiliation: Peking University
  publication_count: 69
  previous_employer: XCMG AI (2018-2021)
  research_focus: primary=Chinese heavy equipment ML, secondary=crane optimization

Entity: researcher/adebayo_berg_jr
  affiliation: Tsinghua CS
  publication_count: 76
  previous_employer: Sany AI (2017-2020)
  research_focus: primary=Chinese construction ML, secondary=excavator AI

Entity: researcher/ryo_berg_sr
  affiliation: University of Tokyo
  publication_count: 45
  previous_employer: Komatsu AI (2018-2021)
  research_focus: primary=Japanese mining equipment ML, secondary=haul road analytics

Entity: researcher/christel_berg_jr
  affiliation: Seoul National University
  publication_count: 58
  previous_employer: Doosan Bobcat AI (2016-2019)
  research_focus: primary=compact equipment ML, secondary=skid steer analytics

Entity: researcher/kwabena_berg_jr
  affiliation: IIT Bombay
  publication_count: 37
  previous_employer: JCB AI (2018-2021)
  research_focus: primary=UK construction ML, secondary=backhoe loader

Entity: researcher/oluwafunke_berg_sr
  affiliation: University of Cape Town
  publication_count: 80
  previous_employer: Bell Equipment AI (2017-2020)
  research_focus: primary=South African articulated dump truck ML, secondary=payload analytics

Entity: researcher/jiro_berg_jr
  affiliation: Universidade de São Paulo
  publication_count: 43
  previous_employer: CNH Industrial AI (2018-2021)
  research_focus: primary=agricultural machinery ML, secondary=precision farming

Entity: researcher/nneka_berg_sr
  affiliation: Tel Aviv University
  publication_count: 66
  previous_employer: Netafim AI (2016-2019)
  research_focus: primary=Israeli precision irrigation ML, secondary=soil moisture

Entity: researcher/bjoern_berg_jr
  affiliation: Hebrew University
  publication_count: 39
  previous_employer: Taranis AI (2018-2021)
  research_focus: primary=Israeli agritech ML, secondary=crop disease detection

Entity: researcher/chiamaka_berg_iii
  affiliation: Technion
  publication_count: 73
  previous_employer: CropX AI (2017-2020)
  research_focus: primary=Israeli ag-soil ML, secondary=fertigation optimization

Entity: researcher/haruto_berg
  affiliation: Leiden University
  publication_count: 55
  previous_employer: Trimble Agriculture AI (2018-2021)
  research_focus: primary=precision farming ML, secondary=yield mapping

Entity: researcher/adaeze_gronqvist_iii
  affiliation: University of Helsinki
  publication_count: 42
  previous_employer: John Deere AI (2016-2019)
  research_focus: primary=US farm equipment ML, secondary=see-and-spray

Entity: researcher/kweku_nakamura_iii
  affiliation: Warsaw University of Technology
  publication_count: 68
  previous_employer: AGCO AI (2018-2021)
  research_focus: primary=agricultural ML, secondary=combine harvester analytics

Entity: researcher/oluwasegun_berg
  affiliation: Ghent University
  publication_count: 46
  previous_employer: CNH Case IH AI (2017-2020)
  research_focus: primary=Belgian farming ML, secondary=tractor autonomy

Entity: researcher/yuki_berg_ii
  affiliation: University of Copenhagen
  publication_count: 59
  previous_employer: DLG AI (2018-2021)
  research_focus: primary=Danish ag machinery ML, secondary=manure analytics

Entity: researcher/adeola_berg
  affiliation: Université Paris-Saclay
  publication_count: 83
  previous_employer: Claas AI (2016-2019)
  research_focus: primary=German ag ML, secondary=harvester routing

Entity: researcher/tobias_berg_jr
  affiliation: Max Planck Institute for Intelligent Systems
  publication_count: 38
  previous_employer: Fendt AI (2018-2021)
  research_focus: primary=precision tractor ML, secondary=headland turning

Entity: researcher/chibuike_berg_jr
  affiliation: Vector Institute
  publication_count: 71
  previous_employer: MacDon AI (2017-2020)
  research_focus: primary=Canadian grain header ML, secondary=draper performance

Entity: researcher/fumika_berg_jr
  affiliation: Mila
  publication_count: 48
  previous_employer: Versatile AI (2018-2021)
  research_focus: primary=Manitoba farming ML, secondary=canola yield

Entity: researcher/obafemi_berg
  affiliation: Allen Institute for AI
  publication_count: 63
  previous_employer: Raven Industries AI (2016-2019)
  research_focus: primary=precision ag ML, secondary=auto-steer analytics

Entity: researcher/kenta_berg_jr
  affiliation: National University of Singapore
  publication_count: 39
  previous_employer: Alibaba Agriculture AI (2018-2021)
  research_focus: primary=Chinese agritech ML, secondary=tea leaf grading

Entity: researcher/oluwakayode_berg_ii
  affiliation: Nanyang Technological University
  publication_count: 76
  previous_employer: Meituan Agriculture AI (2017-2020)
  research_focus: primary=Chinese fresh produce ML, secondary=farm-to-fork analytics

Entity: researcher/daichi_berg_jr
  affiliation: KAIST
  publication_count: 52
  previous_employer: LG Agriculture AI (2018-2021)
  research_focus: primary=Korean vertical farm ML, secondary=LED optimization

Entity: researcher/chiamaka_berg_iv
  affiliation: Hong Kong University of Science and Technology
  publication_count: 44
  previous_employer: Gotham Greens AI (2016-2019)
  research_focus: primary=hydroponic ML, secondary=nutrient management

Entity: researcher/nikolai_berg_sr
  affiliation: Purdue University
  publication_count: 68
  previous_employer: AppHarvest AI (2018-2021)
  research_focus: primary=US controlled-environment ML, secondary=tomato yield

Entity: researcher/bjoern_berg_sr
  affiliation: University of Michigan
  publication_count: 35
  previous_employer: AeroFarms AI (2017-2020)
  research_focus: primary=vertical farming ML, secondary=aeroponic optimization

Entity: researcher/adeola_berg_jr
  affiliation: UT Austin CS
  publication_count: 79
  previous_employer: Plenty AI (2018-2021)
  research_focus: primary=indoor farming ML, secondary=lighting AI

Entity: researcher/fumio_berg_jr
  affiliation: University of Washington
  publication_count: 44
  previous_employer: Bowery Farming AI (2016-2019)
  research_focus: primary=NYC vertical farm ML, secondary=HVAC optimization

Entity: researcher/sigrid_berg_iii
  affiliation: NYU CS
  publication_count: 62
  previous_employer: Infarm AI (2018-2021)
  research_focus: primary=German distributed farm ML, secondary=retail farm analytics

Entity: researcher/adeola_berg_sr
  affiliation: Princeton CS
  publication_count: 37
  previous_employer: Kalera AI (2017-2020)
  research_focus: primary=Hawaiian lettuce ML, secondary=water recirculation

Entity: researcher/chidinma_berg_v
  affiliation: Yale CS
  publication_count: 81
  previous_employer: Fifth Season AI (2018-2021)
  research_focus: primary=Pittsburgh vertical farm ML, secondary=robot harvesting

Entity: researcher/fumika_berg_sr
  affiliation: Johns Hopkins CS
  publication_count: 53
  previous_employer: Revol Greens AI (2016-2019)
  research_focus: primary=US greenhouse ML, secondary=energy efficiency

Entity: researcher/priya_kimura
  affiliation: MIT CSAIL
  publication_count: 59
  previous_employer: Google Brain (2017-2020)
  research_focus: primary=natural language processing, secondary=sentence embeddings

Entity: researcher/oluwatobiloba_kimura
  affiliation: Stanford AI Lab
  publication_count: 43
  previous_employer: OpenAI (2019-2022)
  research_focus: primary=large language models, secondary=instruction tuning

Entity: researcher/amina_kimura
  affiliation: Carnegie Mellon SCS
  publication_count: 71
  previous_employer: Meta AI (2016-2019)
  research_focus: primary=computer vision, secondary=panoptic segmentation

Entity: researcher/bogdan_kimura
  affiliation: UC Berkeley EECS
  publication_count: 35
  previous_employer: DeepMind (2018-2021)
  research_focus: primary=multi-task RL, secondary=curriculum learning

Entity: researcher/yuna_kimura
  affiliation: Oxford CS
  publication_count: 64
  previous_employer: Microsoft Research (2017-2020)
  research_focus: primary=machine learning, secondary=semi-supervised learning

Entity: researcher/kwabena_kimura
  affiliation: Cambridge AI
  publication_count: 49
  previous_employer: Amazon Science (2018-2021)
  research_focus: primary=NLP, secondary=coreference resolution

Entity: researcher/fatou_kimura
  affiliation: ETH Zurich
  publication_count: 80
  previous_employer: Google DeepMind (2016-2019)
  research_focus: primary=graph transformers, secondary=molecular property prediction

Entity: researcher/aleksei_kimura
  affiliation: EPFL
  publication_count: 37
  previous_employer: NVIDIA Research (2019-2022)
  research_focus: primary=efficient transformers, secondary=linear attention

Entity: researcher/zainab_kimura
  affiliation: TU Berlin
  publication_count: 53
  previous_employer: Intel Labs (2017-2020)
  research_focus: primary=distributed ML, secondary=gradient compression

Entity: researcher/ryo_kimura
  affiliation: University of Toronto
  publication_count: 66
  previous_employer: Vector Institute (2018-2021)
  research_focus: primary=Bayesian deep learning, secondary=uncertainty quantification

Entity: researcher/nadia_kimura_jr
  affiliation: University of Amsterdam
  publication_count: 40
  previous_employer: Booking.com AI (2019-2022)
  research_focus: primary=demand modeling, secondary=price elasticity

Entity: researcher/pierre_kimura
  affiliation: KU Leuven
  publication_count: 74
  previous_employer: Baidu Research (2016-2019)
  research_focus: primary=vision-language pretraining, secondary=CLIP variants

Entity: researcher/sunita_kimura
  affiliation: Peking University
  publication_count: 51
  previous_employer: Tencent AI Lab (2018-2021)
  research_focus: primary=social network ML, secondary=influence maximization

Entity: researcher/mikhail_kimura
  affiliation: Tsinghua CS
  publication_count: 37
  previous_employer: Alibaba DAMO Academy (2017-2020)
  research_focus: primary=ranking ML, secondary=learning-to-rank

Entity: researcher/ingeborg_kimura
  affiliation: University of Tokyo
  publication_count: 72
  previous_employer: NTT AI (2018-2021)
  research_focus: primary=quantum ML, secondary=QAOA optimization

Entity: researcher/kofi_kimura
  affiliation: Seoul National University
  publication_count: 45
  previous_employer: Samsung Research (2016-2019)
  research_focus: primary=on-device NLP, secondary=quantization

Entity: researcher/valentina_kimura
  affiliation: IIT Bombay
  publication_count: 58
  previous_employer: Infosys AI (2018-2021)
  research_focus: primary=enterprise NLP, secondary=document summarization

Entity: researcher/oluseun_kimura
  affiliation: University of Cape Town
  publication_count: 33
  previous_employer: Standard Bank AI (2017-2020)
  research_focus: primary=credit ML, secondary=default prediction

Entity: researcher/camila_kimura
  affiliation: Universidade de São Paulo
  publication_count: 77
  previous_employer: Bradesco AI (2018-2021)
  research_focus: primary=Brazilian banking ML, secondary=PIX analytics

Entity: researcher/ibrahim_kimura
  affiliation: Tel Aviv University
  publication_count: 42
  previous_employer: PayoneerAI (2016-2019)
  research_focus: primary=global payment ML, secondary=compliance

Entity: researcher/mei_kimura
  affiliation: Hebrew University
  publication_count: 65
  previous_employer: Papaya Global AI (2018-2021)
  research_focus: primary=payroll ML, secondary=tax compliance

Entity: researcher/fredrik_kimura
  affiliation: Technion
  publication_count: 50
  previous_employer: Tipalti AI (2017-2020)
  research_focus: primary=AP automation ML, secondary=supplier risk

Entity: researcher/adaeze_nakamura_sr
  affiliation: Leiden University
  publication_count: 39
  previous_employer: Unit4 AI (2018-2021)
  research_focus: primary=ERP ML, secondary=budget forecasting

Entity: researcher/hamid_kimura
  affiliation: University of Helsinki
  publication_count: 63
  previous_employer: Visma AI (2016-2019)
  research_focus: primary=Scandinavian SME ML, secondary=invoicing analytics

Entity: researcher/anna_kimura
  affiliation: Warsaw University of Technology
  publication_count: 36
  previous_employer: Sage AI (2018-2021)
  research_focus: primary=UK SME accounting ML, secondary=cash flow prediction

Entity: researcher/leon_kimura
  affiliation: Ghent University
  publication_count: 71
  previous_employer: Exact AI (2017-2020)
  research_focus: primary=Dutch SME ML, secondary=bookkeeping automation

Entity: researcher/hana_kimura
  affiliation: University of Copenhagen
  publication_count: 54
  previous_employer: Billy AI (2018-2021)
  research_focus: primary=Danish freelancer ML, secondary=VAT prediction

Entity: researcher/victor_kimura
  affiliation: Université Paris-Saclay
  publication_count: 42
  previous_employer: Pennylane AI (2017-2020)
  research_focus: primary=French accounting ML, secondary=FEC analytics

Entity: researcher/liu_kimura
  affiliation: Max Planck Institute for Intelligent Systems
  publication_count: 66
  previous_employer: Google Brain (2018-2021)
  research_focus: primary=program synthesis, secondary=neural code search

Entity: researcher/fatima_kimura
  affiliation: Vector Institute
  publication_count: 33
  previous_employer: GitLab AI (2016-2019)
  research_focus: primary=DevSecOps ML, secondary=vulnerability detection

Entity: researcher/jose_kimura
  affiliation: Mila
  publication_count: 79
  previous_employer: Snyk AI (2018-2021)
  research_focus: primary=dependency ML, secondary=supply chain security

Entity: researcher/elena_kimura
  affiliation: Allen Institute for AI
  publication_count: 45
  previous_employer: Veracode AI (2017-2020)
  research_focus: primary=SAST ML, secondary=false positive reduction

Entity: researcher/tanvir_kimura
  affiliation: National University of Singapore
  publication_count: 60
  previous_employer: Checkmarx AI (2018-2021)
  research_focus: primary=code security ML, secondary=taint analysis

Entity: researcher/nkechi_kimura
  affiliation: Nanyang Technological University
  publication_count: 37
  previous_employer: CrowdStrike AI (2016-2019)
  research_focus: primary=endpoint ML, secondary=malware classification

Entity: researcher/lucas_kimura
  affiliation: KAIST
  publication_count: 72
  previous_employer: AhnLab AI (2018-2021)
  research_focus: primary=Korean cybersecurity ML, secondary=APT detection

Entity: researcher/sofie_kimura
  affiliation: Hong Kong University of Science and Technology
  publication_count: 51
  previous_employer: ASTRI AI (2017-2020)
  research_focus: primary=Hong Kong cybersecurity ML, secondary=IoT security

Entity: researcher/aryan_kimura
  affiliation: Purdue University
  publication_count: 39
  previous_employer: Palo Alto Networks AI (2018-2021)
  research_focus: primary=network security ML, secondary=firewall analytics

Entity: researcher/zara_kimura
  affiliation: University of Michigan
  publication_count: 64
  previous_employer: Duo Security AI (2016-2019)
  research_focus: primary=identity ML, secondary=MFA risk scoring

Entity: researcher/emeka_kimura
  affiliation: UT Austin CS
  publication_count: 36
  previous_employer: SailPoint AI (2018-2021)
  research_focus: primary=identity governance ML, secondary=access analytics

Entity: researcher/soo_jin_kimura
  affiliation: University of Washington
  publication_count: 77
  previous_employer: Okta AI (2017-2020)
  research_focus: primary=SSO ML, secondary=anomalous login detection

Entity: researcher/andile_kimura
  affiliation: NYU CS
  publication_count: 52
  previous_employer: Auth0 AI (2018-2021)
  research_focus: primary=authentication ML, secondary=bot detection

Entity: researcher/astrid_kimura
  affiliation: Princeton CS
  publication_count: 41
  previous_employer: Cloudflare AI (2016-2019)
  research_focus: primary=DDoS ML, secondary=traffic classification

Entity: researcher/rodrigo_kimura
  affiliation: Yale CS
  publication_count: 65
  previous_employer: Fastly AI (2018-2021)
  research_focus: primary=edge network ML, secondary=WAF analytics

Entity: researcher/chidinma_kimura
  affiliation: Johns Hopkins CS
  publication_count: 33
  previous_employer: Akamai AI (2017-2020)
  research_focus: primary=CDN ML, secondary=DDoS mitigation

Entity: researcher/niklas_kimura
  affiliation: University of Edinburgh
  publication_count: 70
  previous_employer: Imperva AI (2018-2021)
  research_focus: primary=web application ML, secondary=bot management

Entity: researcher/amara_kimura
  affiliation: University of Glasgow
  publication_count: 46
  previous_employer: F5 AI (2016-2019)
  research_focus: primary=application delivery ML, secondary=SSL inspection

Entity: researcher/hassan_kimura
  affiliation: University of Bristol
  publication_count: 61
  previous_employer: Fortinet AI (2018-2021)
  research_focus: primary=network security ML, secondary=SD-WAN analytics

Entity: researcher/nneka_kimura
  affiliation: Aalborg University
  publication_count: 35
  previous_employer: Check Point AI (2017-2020)
  research_focus: primary=threat prevention ML, secondary=sandboxing

Entity: researcher/siddharth_kimura
  affiliation: Delft University of Technology
  publication_count: 74
  previous_employer: Darktrace AI (2018-2021)
  research_focus: primary=unsupervised network ML, secondary=self-learning AI

Entity: researcher/yuki_kimura_jr
  affiliation: University of Zurich
  publication_count: 50
  previous_employer: Vectra AI (2016-2019)
  research_focus: primary=AI-driven NDR, secondary=lateral movement detection

Entity: researcher/vera_kimura
  affiliation: MIT CSAIL
  publication_count: 42
  previous_employer: ExtraHop AI (2018-2021)
  research_focus: primary=network traffic ML, secondary=encrypted threat detection

Entity: researcher/benedikt_kimura
  affiliation: Stanford AI Lab
  publication_count: 67
  previous_employer: Illumio AI (2016-2019)
  research_focus: primary=zero trust ML, secondary=microsegmentation analytics

Entity: researcher/ishaan_kimura
  affiliation: Carnegie Mellon SCS
  publication_count: 39
  previous_employer: Cybereason AI (2018-2021)
  research_focus: primary=endpoint detection ML, secondary=ransomware prediction

Entity: researcher/oluwakemi_kimura
  affiliation: UC Berkeley EECS
  publication_count: 82
  previous_employer: SentinelOne AI (2017-2020)
  research_focus: primary=autonomous endpoint ML, secondary=threat hunting

Entity: researcher/anders_kimura
  affiliation: Oxford CS
  publication_count: 53
  previous_employer: Carbon Black AI (2018-2021)
  research_focus: primary=behavioral ML, secondary=process tree analytics

Entity: researcher/nour_kimura
  affiliation: Cambridge AI
  publication_count: 41
  previous_employer: Cylance AI (2016-2019)
  research_focus: primary=predictive threat ML, secondary=zero-day prevention

Entity: researcher/chen_kimura
  affiliation: ETH Zurich
  publication_count: 65
  previous_employer: Sophos AI (2018-2021)
  research_focus: primary=UK endpoint ML, secondary=ransomware rollback

Entity: researcher/sigrid_kimura
  affiliation: EPFL
  publication_count: 34
  previous_employer: Bitdefender AI (2017-2020)
  research_focus: primary=Romanian AV ML, secondary=polymorphic malware

Entity: researcher/abel_kimura
  affiliation: TU Berlin
  publication_count: 76
  previous_employer: ESET AI (2018-2021)
  research_focus: primary=Slovak AV ML, secondary=exploit detection

Entity: researcher/preethi_kimura
  affiliation: University of Toronto
  publication_count: 45
  previous_employer: Trend Micro AI (2016-2019)
  research_focus: primary=Japanese AV ML, secondary=cloud threat intelligence

Entity: researcher/emre_kimura
  affiliation: University of Amsterdam
  publication_count: 60
  previous_employer: McAfee AI (2018-2021)
  research_focus: primary=US AV ML, secondary=threat intelligence sharing

Entity: researcher/sonja_kimura
  affiliation: KU Leuven
  publication_count: 37
  previous_employer: Norton LifeLock AI (2017-2020)
  research_focus: primary=consumer security ML, secondary=identity theft detection

Entity: researcher/kweku_kimura
  affiliation: Peking University
  publication_count: 71
  previous_employer: 360 Security AI (2018-2021)
  research_focus: primary=Chinese security ML, secondary=mobile threat

Entity: researcher/aya_kimura
  affiliation: Tsinghua CS
  publication_count: 52
  previous_employer: Qihoo AI (2016-2019)
  research_focus: primary=Chinese AV ML, secondary=browser security

Entity: researcher/adebayo_kimura
  affiliation: University of Tokyo
  publication_count: 40
  previous_employer: Trend Micro Japan AI (2018-2021)
  research_focus: primary=Japanese enterprise security ML, secondary=ICS protection

Entity: researcher/hina_kimura
  affiliation: Seoul National University
  publication_count: 64
  previous_employer: Ahnlab AI (2016-2019)
  research_focus: primary=Korean enterprise security ML, secondary=APT analytics

Entity: researcher/marco_kimura
  affiliation: IIT Bombay
  publication_count: 33
  previous_employer: Quick Heal AI (2018-2021)
  research_focus: primary=Indian AV ML, secondary=ransomware defense

Entity: researcher/thandi_kimura
  affiliation: University of Cape Town
  publication_count: 78
  previous_employer: Sanlam AI (2016-2019)
  research_focus: primary=South African financial ML, secondary=fraud detection

Entity: researcher/renata_kimura
  affiliation: Universidade de São Paulo
  publication_count: 51
  previous_employer: Cielo AI (2018-2021)
  research_focus: primary=Brazilian payment ML, secondary=authorization analytics

Entity: researcher/bilal_kimura
  affiliation: Tel Aviv University
  publication_count: 43
  previous_employer: Riskified AI (2017-2020)
  research_focus: primary=e-commerce fraud ML, secondary=chargeback prediction

Entity: researcher/chioma_kimura
  affiliation: Hebrew University
  publication_count: 67
  previous_employer: Forter AI (2018-2021)
  research_focus: primary=real-time fraud ML, secondary=account takeover

Entity: researcher/fredrik_kimura_jr
  affiliation: Technion
  publication_count: 36
  previous_employer: Kount AI (2016-2019)
  research_focus: primary=identity trust ML, secondary=device fingerprinting

Entity: researcher/giulia_kimura
  affiliation: Leiden University
  publication_count: 82
  previous_employer: Sift AI (2018-2021)
  research_focus: primary=digital trust ML, secondary=content abuse

Entity: researcher/tariq_kimura
  affiliation: University of Helsinki
  publication_count: 55
  previous_employer: Accertify AI (2017-2020)
  research_focus: primary=Amex fraud ML, secondary=friendly fraud

Entity: researcher/oluwatobi_kimura
  affiliation: Warsaw University of Technology
  publication_count: 42
  previous_employer: Feedzai AI (2018-2021)
  research_focus: primary=Portuguese banking ML, secondary=AML analytics

Entity: researcher/paloma_kimura
  affiliation: Ghent University
  publication_count: 60
  previous_employer: SEON AI (2016-2019)
  research_focus: primary=Hungarian fraud ML, secondary=digital footprint

Entity: researcher/leif_kimura
  affiliation: University of Copenhagen
  publication_count: 47
  previous_employer: Signifyd AI (2018-2021)
  research_focus: primary=US commerce ML, secondary=guaranteed fraud protection

Entity: researcher/yasmin_kimura
  affiliation: Université Paris-Saclay
  publication_count: 73
  previous_employer: Ravelin AI (2017-2020)
  research_focus: primary=UK fraud ML, secondary=marketplace trust

Entity: researcher/oluwafemi_kimura
  affiliation: Max Planck Institute for Intelligent Systems
  publication_count: 31
  previous_employer: Nethone AI (2018-2021)
  research_focus: primary=Polish behavioral ML, secondary=mouse dynamics

Entity: researcher/zuzanna_kimura
  affiliation: Vector Institute
  publication_count: 68
  previous_employer: DataVisor AI (2016-2019)
  research_focus: primary=unsupervised fraud ML, secondary=money mule detection

Entity: researcher/magnus_kimura
  affiliation: Mila
  publication_count: 45
  previous_employer: ThetaRay AI (2018-2021)
  research_focus: primary=Israeli AI fraud ML, secondary=correspondent banking

Entity: researcher/adaora_kimura
  affiliation: Allen Institute for AI
  publication_count: 56
  previous_employer: BioCatch AI (2017-2020)
  research_focus: primary=behavioral biometrics ML, secondary=continuous authentication

Entity: researcher/ismail_kimura
  affiliation: National University of Singapore
  publication_count: 38
  previous_employer: Jumio AI (2018-2021)
  research_focus: primary=identity verification ML, secondary=document forgery

Entity: researcher/nneka_kimura_jr
  affiliation: Nanyang Technological University
  publication_count: 71
  previous_employer: Onfido AI (2016-2019)
  research_focus: primary=UK KYC ML, secondary=face liveness detection

Entity: researcher/taeyang_kimura
  affiliation: KAIST
  publication_count: 42
  previous_employer: NHN AI (2018-2021)
  research_focus: primary=Korean KYC ML, secondary=identity matching

Entity: researcher/lena_kimura
  affiliation: Hong Kong University of Science and Technology
  publication_count: 64
  previous_employer: Synapse AI (2017-2020)
  research_focus: primary=banking-as-a-service ML, secondary=compliance analytics

Entity: researcher/hugo_kimura
  affiliation: Purdue University
  publication_count: 27
  previous_employer: Unit21 AI (2018-2021)
  research_focus: primary=US fintech ML, secondary=transaction monitoring

Entity: researcher/chiamaka_kimura
  affiliation: University of Michigan
  publication_count: 80
  previous_employer: ComplyAdvantage AI (2016-2019)
  research_focus: primary=AML ML, secondary=sanctions screening

Entity: researcher/rasmus_kimura
  affiliation: UT Austin CS
  publication_count: 53
  previous_employer: Actico AI (2018-2021)
  research_focus: primary=decision ML, secondary=GDPR compliance

Entity: researcher/mei_lin_kimura
  affiliation: University of Washington
  publication_count: 38
  previous_employer: Napier AI (2017-2020)
  research_focus: primary=UK AML ML, secondary=typology detection

Entity: researcher/kwabena_kimura
  affiliation: NYU CS
  publication_count: 75
  previous_employer: Lucinity AI (2018-2021)
  research_focus: primary=Icelandic AML ML, secondary=human-AI collaboration

Entity: researcher/olga_kimura
  affiliation: Princeton CS
  publication_count: 44
  previous_employer: Tookitaki AI (2016-2019)
  research_focus: primary=Singapore AML ML, secondary=federated AML

Entity: researcher/chukwuemeka_kimura
  affiliation: Yale CS
  publication_count: 62
  previous_employer: Nice Actimize AI (2018-2021)
  research_focus: primary=US financial crime ML, secondary=market surveillance

Entity: researcher/nadia_kimura_sr
  affiliation: Johns Hopkins CS
  publication_count: 36
  previous_employer: ACAMS AI (2017-2020)
  research_focus: primary=AML certification ML, secondary=risk rating

Entity: researcher/per_kimura
  affiliation: University of Edinburgh
  publication_count: 57
  previous_employer: Refinitiv AI (2018-2021)
  research_focus: primary=financial data ML, secondary=news analytics

Entity: researcher/aisling_kimura
  affiliation: University of Glasgow
  publication_count: 43
  previous_employer: FactSet AI (2016-2019)
  research_focus: primary=equity data ML, secondary=earnings surprise

Entity: researcher/ibrahim_kimura_jr
  affiliation: University of Bristol
  publication_count: 78
  previous_employer: Bloomberg LP AI (2018-2021)
  research_focus: primary=financial news ML, secondary=sentiment analysis

Entity: researcher/astrid_kimura_jr
  affiliation: Aalborg University
  publication_count: 30
  previous_employer: S&P Global AI (2017-2020)
  research_focus: primary=credit rating ML, secondary=ESG scoring

Entity: researcher/yusuf_kimura
  affiliation: Delft University of Technology
  publication_count: 66
  previous_employer: Moody's AI (2018-2021)
  research_focus: primary=bond rating ML, secondary=default prediction

Entity: researcher/chidera_kimura_jr
  affiliation: University of Zurich
  publication_count: 41
  previous_employer: Fitch Ratings AI (2016-2019)
  research_focus: primary=structured finance ML, secondary=ABS analytics

Entity: researcher/ingrid_kimura_jr
  affiliation: MIT CSAIL
  publication_count: 55
  previous_employer: MSCI AI (2018-2021)
  research_focus: primary=index ML, secondary=factor analytics

Entity: researcher/takumi_kimura
  affiliation: Stanford AI Lab
  publication_count: 72
  previous_employer: FTSE Russell AI (2017-2020)
  research_focus: primary=index construction ML, secondary=country classification

Entity: researcher/amalie_kimura
  affiliation: Carnegie Mellon SCS
  publication_count: 34
  previous_employer: ICE Data AI (2018-2021)
  research_focus: primary=fixed income ML, secondary=curve construction

Entity: researcher/seun_kimura
  affiliation: UC Berkeley EECS
  publication_count: 60
  previous_employer: Tradeweb AI (2016-2019)
  research_focus: primary=electronic trading ML, secondary=RFQ analytics

Entity: researcher/yuki_kimura_sr
  affiliation: Oxford CS
  publication_count: 47
  previous_employer: MarketAxess AI (2018-2021)
  research_focus: primary=bond trading ML, secondary=liquidity prediction

Entity: researcher/hector_kimura
  affiliation: Cambridge AI
  publication_count: 81
  previous_employer: Liquidnet AI (2017-2020)
  research_focus: primary=block trading ML, secondary=dark pool analytics

Entity: researcher/fatou_kimura_jr
  affiliation: ETH Zurich
  publication_count: 38
  previous_employer: IEX AI (2018-2021)
  research_focus: primary=exchange ML, secondary=speed bump analytics

Entity: researcher/bogdan_kimura_jr
  affiliation: EPFL
  publication_count: 53
  previous_employer: Cboe AI (2016-2019)
  research_focus: primary=options exchange ML, secondary=VIX prediction

Entity: researcher/chidinma_kimura_jr
  affiliation: TU Berlin
  publication_count: 65
  previous_employer: Eurex AI (2018-2021)
  research_focus: primary=European derivatives ML, secondary=clearing analytics

Entity: researcher/kazuki_kimura
  affiliation: University of Toronto
  publication_count: 43
  previous_employer: TMX Group AI (2017-2020)
  research_focus: primary=Canadian exchange ML, secondary=dark pool optimization

Entity: researcher/bob_okafor
  affiliation: Stanford AI Lab
  publication_count: 23
  previous_employer: DeepMind (2020-2023)
  research_focus: primary=computer vision, secondary=image segmentation

Entity: researcher/amara_osei
  affiliation: University of Ghana CS
  publication_count: 34
  previous_employer: Google Brain (2018-2021)
  research_focus: primary=natural language processing, secondary=low-resource languages

Entity: researcher/felix_kruger
  affiliation: TU Berlin
  publication_count: 47
  previous_employer: Fraunhofer AI (2017-2020)
  research_focus: primary=efficient deep learning, secondary=neural architecture search

Entity: researcher/priya_sundaram
  affiliation: IIT Bombay
  publication_count: 61
  previous_employer: Microsoft Research (2016-2019)
  research_focus: primary=machine learning, secondary=Bayesian optimization

Entity: researcher/yuki_tanaka_3
  affiliation: University of Tokyo
  publication_count: 55
  previous_employer: NTT Research (2018-2021)
  research_focus: primary=speech recognition, secondary=acoustic modeling

Entity: researcher/carlos_mendez_2
  affiliation: University of Sao Paulo
  publication_count: 29
  previous_employer: Nubank AI (2019-2022)
  research_focus: primary=federated learning, secondary=privacy-preserving ML

Entity: researcher/nadia_petrov
  affiliation: Moscow State University CS
  publication_count: 42
  previous_employer: Yandex Research (2017-2020)
  research_focus: primary=information retrieval, secondary=neural ranking

Entity: researcher/liang_chen_2
  affiliation: Tsinghua CS
  publication_count: 78
  previous_employer: Baidu Research (2015-2018)
  research_focus: primary=knowledge graphs, secondary=entity alignment

Entity: researcher/abebe_tesfaye
  affiliation: Addis Ababa University CS
  publication_count: 23
  previous_employer: IBM Research Africa (2019-2022)
  research_focus: primary=machine learning, secondary=agricultural applications

Entity: researcher/ingrid_holm
  affiliation: University of Copenhagen
  publication_count: 51
  previous_employer: Novo Nordisk AI (2016-2019)
  research_focus: primary=computational biology, secondary=drug discovery

Entity: researcher/rafael_silva_2
  affiliation: University of Sao Paulo
  publication_count: 38
  previous_employer: Embraer AI (2018-2021)
  research_focus: primary=reinforcement learning, secondary=autonomous systems

Entity: researcher/meera_nair
  affiliation: IIT Bombay
  publication_count: 66
  previous_employer: TCS Research (2017-2020)
  research_focus: primary=multimodal learning, secondary=visual question answering

Entity: researcher/dmitri_volkov
  affiliation: St. Petersburg State University
  publication_count: 44
  previous_employer: Sberbank AI (2018-2021)
  research_focus: primary=time series forecasting, secondary=financial ML

Entity: researcher/fatou_diallo
  affiliation: University of Dakar
  publication_count: 19
  previous_employer: Orange Labs Africa (2019-2022)
  research_focus: primary=natural language processing, secondary=African language NLP

Entity: researcher/oskar_lindgren
  affiliation: KTH Royal Institute of Technology
  publication_count: 57
  previous_employer: Ericsson AI (2016-2019)
  research_focus: primary=graph neural networks, secondary=network topology

Entity: researcher/zara_ali
  affiliation: University of Edinburgh CS
  publication_count: 33
  previous_employer: Huawei Noah Ark Lab (2019-2022)
  research_focus: primary=fairness and bias, secondary=algorithmic auditing

Entity: researcher/chen_wei_2
  affiliation: Peking University
  publication_count: 72
  previous_employer: Alibaba DAMO Academy (2016-2019)
  research_focus: primary=recommender systems, secondary=collaborative filtering

Entity: researcher/kofi_asante
  affiliation: University of Cape Town
  publication_count: 28
  previous_employer: Google DeepMind (2019-2022)
  research_focus: primary=computer vision, secondary=medical imaging

Entity: researcher/valentina_russo
  affiliation: University of Milan CS
  publication_count: 49
  previous_employer: Telecom Italia AI (2017-2020)
  research_focus: primary=dialog systems, secondary=conversational AI

Entity: researcher/hamid_hosseini
  affiliation: Sharif University CS
  publication_count: 63
  previous_employer: Aparat AI (2018-2021)
  research_focus: primary=video understanding, secondary=action recognition

Entity: researcher/sara_lindqvist
  affiliation: Chalmers University
  publication_count: 45
  previous_employer: Volvo AI (2016-2019)
  research_focus: primary=autonomous driving, secondary=sensor fusion

Entity: researcher/pierre_moreau
  affiliation: Universite Paris-Saclay
  publication_count: 58
  previous_employer: Thales AI (2018-2021)
  research_focus: primary=adversarial robustness, secondary=certified defenses

Entity: researcher/akosua_mensah
  affiliation: University of Cape Town
  publication_count: 31
  previous_employer: MTN AI (2019-2022)
  research_focus: primary=speech recognition, secondary=code-switching

Entity: researcher/takeshi_mori
  affiliation: University of Tokyo
  publication_count: 54
  previous_employer: Sony AI (2017-2020)
  research_focus: primary=generative models, secondary=image synthesis

Entity: researcher/elena_popescu
  affiliation: Politehnica University Bucharest
  publication_count: 40
  previous_employer: Adobe Research (2018-2021)
  research_focus: primary=computer vision, secondary=style transfer

Entity: researcher/bashir_rahman
  affiliation: BUET CS
  publication_count: 27
  previous_employer: Samsung AI Center (2019-2022)
  research_focus: primary=natural language processing, secondary=Bengali NLP

Entity: researcher/astrid_johansson
  affiliation: Uppsala University CS
  publication_count: 69
  previous_employer: Spotify AI (2015-2018)
  research_focus: primary=recommender systems, secondary=music recommendation

Entity: researcher/kwame_boateng
  affiliation: KNUST CS
  publication_count: 22
  previous_employer: Microsoft Africa Research (2019-2022)
  research_focus: primary=machine learning, secondary=healthcare applications

Entity: researcher/marco_ferrari
  affiliation: Politecnico di Milano
  publication_count: 56
  previous_employer: Ferrari AI (2017-2020)
  research_focus: primary=reinforcement learning, secondary=control systems

Entity: researcher/fatima_zahra
  affiliation: Mohammed V University CS
  publication_count: 35
  previous_employer: OCP AI (2018-2021)
  research_focus: primary=causal inference, secondary=interventional learning

Entity: researcher/nikolai_fedorov
  affiliation: MIPT CS
  publication_count: 48
  previous_employer: Kaspersky AI (2016-2019)
  research_focus: primary=cybersecurity, secondary=malware detection

Entity: researcher/amira_hassan_2
  affiliation: Cairo University CS
  publication_count: 37
  previous_employer: Careem AI (2018-2021)
  research_focus: primary=natural language processing, secondary=Arabic NLP

Entity: researcher/bjorn_andersen
  affiliation: University of Oslo CS
  publication_count: 62
  previous_employer: Equinor AI (2015-2018)
  research_focus: primary=machine learning, secondary=energy forecasting

Entity: researcher/soo_jin_park
  affiliation: KAIST
  publication_count: 74
  previous_employer: Kakao AI (2016-2019)
  research_focus: primary=graph neural networks, secondary=social network analysis

Entity: researcher/chisom_eze
  affiliation: University of Nigeria CS
  publication_count: 18
  previous_employer: Interswitch AI (2019-2022)
  research_focus: primary=machine learning, secondary=financial inclusion

Entity: researcher/henrik_christensen
  affiliation: University of Copenhagen
  publication_count: 53
  previous_employer: Maersk AI (2017-2020)
  research_focus: primary=time series forecasting, secondary=supply chain optimization

Entity: researcher/pooja_iyer
  affiliation: IIT Delhi
  publication_count: 41
  previous_employer: Paytm AI (2018-2021)
  research_focus: primary=fraud detection, secondary=anomaly detection

Entity: researcher/ali_hassan_2
  affiliation: University of Tehran CS
  publication_count: 59
  previous_employer: Digikala AI (2016-2019)
  research_focus: primary=recommender systems, secondary=Persian NLP

Entity: researcher/giulia_bernardi
  affiliation: University of Bologna CS
  publication_count: 46
  previous_employer: Lamborghini AI (2018-2021)
  research_focus: primary=computer vision, secondary=defect detection

Entity: researcher/tobias_weiss
  affiliation: ETH Zurich
  publication_count: 68
  previous_employer: Roche AI (2016-2019)
  research_focus: primary=computational biology, secondary=genomics

Entity: researcher/amara_coulibaly
  affiliation: Universite de Bamako
  publication_count: 14
  previous_employer: Orange Mali AI (2019-2022)
  research_focus: primary=natural language processing, secondary=Bambara NLP

Entity: researcher/elan_shapiro
  affiliation: Tel Aviv University
  publication_count: 71
  previous_employer: Mobileye AI (2015-2018)
  research_focus: primary=autonomous driving, secondary=object detection

Entity: researcher/maria_ivanova
  affiliation: Sofia University CS
  publication_count: 33
  previous_employer: Bosch AI (2017-2020)
  research_focus: primary=computer vision, secondary=industrial inspection

Entity: researcher/vikram_patel
  affiliation: IIT Madras
  publication_count: 55
  previous_employer: Flipkart AI (2018-2021)
  research_focus: primary=natural language processing, secondary=e-commerce search

Entity: researcher/chan_young_oh
  affiliation: Seoul National University
  publication_count: 43
  previous_employer: Naver AI (2017-2020)
  research_focus: primary=question answering, secondary=Korean NLP

Entity: researcher/leila_benali
  affiliation: University of Algiers CS
  publication_count: 26
  previous_employer: Sonatrach AI (2019-2022)
  research_focus: primary=time series forecasting, secondary=energy optimization

Entity: researcher/joao_costa
  affiliation: University of Lisbon CS
  publication_count: 38
  previous_employer: Farfetch AI (2018-2021)
  research_focus: primary=recommender systems, secondary=fashion ML

Entity: researcher/maya_goldberg
  affiliation: Hebrew University
  publication_count: 60
  previous_employer: Check Point AI (2016-2019)
  research_focus: primary=adversarial robustness, secondary=network security

Entity: researcher/karin_larsson
  affiliation: Lund University CS
  publication_count: 47
  previous_employer: IKEA AI (2017-2020)
  research_focus: primary=computer vision, secondary=retail analytics

Entity: researcher/emmanuel_osei_2
  affiliation: University of Ghana CS
  publication_count: 29
  previous_employer: Vodafone Ghana AI (2019-2022)
  research_focus: primary=machine learning, secondary=network optimization

Entity: researcher/aiko_nakamura
  affiliation: University of Tokyo
  publication_count: 64
  previous_employer: Toyota Research (2016-2019)
  research_focus: primary=autonomous driving, secondary=decision making under uncertainty

Entity: researcher/stefan_mihalache
  affiliation: Babes-Bolyai University CS
  publication_count: 36
  previous_employer: UiPath AI (2018-2021)
  research_focus: primary=natural language processing, secondary=robotic process automation

Entity: researcher/aditi_sharma
  affiliation: IIT Kanpur
  publication_count: 52
  previous_employer: Zomato AI (2017-2020)
  research_focus: primary=recommender systems, secondary=food delivery optimization

Entity: researcher/lars_erikson
  affiliation: Linkoping University
  publication_count: 44
  previous_employer: ABB AI (2018-2021)
  research_focus: primary=reinforcement learning, secondary=industrial automation

Entity: researcher/nneka_obi
  affiliation: University of Lagos CS
  publication_count: 21
  previous_employer: Jumia AI (2019-2022)
  research_focus: primary=machine learning, secondary=e-commerce fraud

Entity: researcher/mehmet_yilmaz
  affiliation: Middle East Technical University
  publication_count: 49
  previous_employer: Getir AI (2018-2021)
  research_focus: primary=operations research, secondary=delivery optimization

Entity: researcher/clara_santos
  affiliation: Universidade de Coimbra CS
  publication_count: 57
  previous_employer: Farfetch AI (2016-2019)
  research_focus: primary=computer vision, secondary=product image classification

Entity: researcher/ravi_kumar_2
  affiliation: IIT Hyderabad
  publication_count: 39
  previous_employer: Ola AI (2017-2020)
  research_focus: primary=reinforcement learning, secondary=ride-sharing optimization

Entity: researcher/anaelle_fontaine
  affiliation: Sorbonne Universite CS
  publication_count: 66
  previous_employer: BNP Paribas AI (2015-2018)
  research_focus: primary=causal inference, secondary=financial risk

Entity: researcher/kweku_adjei
  affiliation: University of Education Winneba
  publication_count: 17
  previous_employer: GCB Bank AI (2019-2022)
  research_focus: primary=machine learning, secondary=credit scoring

Entity: researcher/hana_kimura_2
  affiliation: Osaka University CS
  publication_count: 48
  previous_employer: Panasonic AI (2017-2020)
  research_focus: primary=multi-task learning, secondary=home appliance intelligence

Entity: researcher/andres_garcia
  affiliation: Universidad Autonoma de Madrid
  publication_count: 61
  previous_employer: Telefonica AI (2016-2019)
  research_focus: primary=natural language processing, secondary=Spanish NLP

Entity: researcher/blessing_nwosu
  affiliation: Covenant University CS
  publication_count: 24
  previous_employer: Access Bank AI (2019-2022)
  research_focus: primary=machine learning, secondary=financial fraud detection

Entity: researcher/jens_muller
  affiliation: RWTH Aachen University
  publication_count: 53
  previous_employer: Continental AI (2017-2020)
  research_focus: primary=autonomous driving, secondary=lidar processing

Entity: researcher/asel_nurlanovna
  affiliation: Nazarbayev University CS
  publication_count: 30
  previous_employer: Kaspi AI (2018-2021)
  research_focus: primary=natural language processing, secondary=Kazakh NLP

Entity: researcher/tomasz_wisnewski
  affiliation: Warsaw University of Technology
  publication_count: 58
  previous_employer: Allegro AI (2016-2019)
  research_focus: primary=recommender systems, secondary=marketplace search

Entity: researcher/blessing_adeyemi
  affiliation: University of Ibadan CS
  publication_count: 20
  previous_employer: Kuda Bank AI (2019-2022)
  research_focus: primary=machine learning, secondary=mobile banking

Entity: researcher/andrea_conti
  affiliation: La Sapienza University Rome
  publication_count: 45
  previous_employer: Enel AI (2017-2020)
  research_focus: primary=time series forecasting, secondary=renewable energy

Entity: researcher/selin_aydin
  affiliation: Istanbul Technical University
  publication_count: 42
  previous_employer: Hepsiburada AI (2018-2021)
  research_focus: primary=recommender systems, secondary=Turkish e-commerce

Entity: researcher/kagiso_sithole
  affiliation: University of Pretoria CS
  publication_count: 27
  previous_employer: Naspers AI (2019-2022)
  research_focus: primary=computer vision, secondary=document understanding

Entity: researcher/hiroshi_watanabe
  affiliation: Kyoto University CS
  publication_count: 73
  previous_employer: NEC Research (2014-2017)
  research_focus: primary=knowledge graphs, secondary=ontology learning

Entity: researcher/isabela_rocha
  affiliation: UNICAMP CS
  publication_count: 36
  previous_employer: iFood AI (2018-2021)
  research_focus: primary=reinforcement learning, secondary=delivery route optimization

Entity: researcher/tomas_novak
  affiliation: Charles University Prague
  publication_count: 50
  previous_employer: Avast AI (2017-2020)
  research_focus: primary=cybersecurity, secondary=threat detection

Entity: researcher/aminata_diallo
  affiliation: Universite Cheikh Anta Diop
  publication_count: 16
  previous_employer: Wari AI (2019-2022)
  research_focus: primary=machine learning, secondary=mobile payments

Entity: researcher/sang_woo_lee
  affiliation: POSTECH CS
  publication_count: 67
  previous_employer: Samsung AI Center (2016-2019)
  research_focus: primary=computer vision, secondary=display intelligence

Entity: researcher/miriam_goldstein
  affiliation: Technion
  publication_count: 54
  previous_employer: Elbit Systems AI (2015-2018)
  research_focus: primary=adversarial robustness, secondary=defense systems ML

Entity: researcher/ondrej_blazek
  affiliation: CTU Prague
  publication_count: 39
  previous_employer: Kiwi.com AI (2017-2020)
  research_focus: primary=combinatorial optimization, secondary=flight search

Entity: researcher/leilani_kahale
  affiliation: University of Hawaii CS
  publication_count: 32
  previous_employer: Booz Allen Hamilton AI (2018-2021)
  research_focus: primary=machine learning, secondary=ocean monitoring

Entity: researcher/sven_bergstrom
  affiliation: Royal Institute of Technology
  publication_count: 56
  previous_employer: Northvolt AI (2017-2020)
  research_focus: primary=time series forecasting, secondary=battery performance

Entity: researcher/grace_achieng
  affiliation: University of Nairobi CS
  publication_count: 23
  previous_employer: Safaricom AI (2019-2022)
  research_focus: primary=natural language processing, secondary=Swahili NLP

Entity: researcher/pablo_rios
  affiliation: Universidad de Chile CS
  publication_count: 44
  previous_employer: Falabella AI (2017-2020)
  research_focus: primary=recommender systems, secondary=retail demand forecasting

Entity: researcher/marta_kowalska
  affiliation: Jagiellonian University CS
  publication_count: 37
  previous_employer: CD Projekt AI (2018-2021)
  research_focus: primary=generative models, secondary=procedural content generation

Entity: researcher/oluwatobi_adeyemi
  affiliation: Obafemi Awolowo University
  publication_count: 19
  previous_employer: Sterling Bank AI (2019-2022)
  research_focus: primary=machine learning, secondary=risk assessment

Entity: researcher/hailey_kim
  affiliation: KAIST
  publication_count: 61
  previous_employer: LG AI Research (2016-2019)
  research_focus: primary=few-shot learning, secondary=meta-learning

Entity: researcher/valentina_gonzalez
  affiliation: Universidad Nacional de Colombia
  publication_count: 33
  previous_employer: Bancolombia AI (2018-2021)
  research_focus: primary=natural language processing, secondary=Colombian Spanish NLP

Entity: researcher/pieter_vanderberg
  affiliation: Ghent University
  publication_count: 48
  previous_employer: Bekaert AI (2017-2020)
  research_focus: primary=computer vision, secondary=materials inspection

Entity: researcher/yusuf_ibrahim
  affiliation: Ahmadu Bello University CS
  publication_count: 25
  previous_employer: Guaranty Trust AI (2019-2022)
  research_focus: primary=machine learning, secondary=Islamic finance ML

Entity: researcher/zuzanna_kowalczyk
  affiliation: Poznan University of Technology
  publication_count: 43
  previous_employer: Allegro AI (2018-2021)
  research_focus: primary=natural language processing, secondary=Polish NLP

Entity: researcher/kwabena_antwi
  affiliation: University of Ghana CS
  publication_count: 28
  previous_employer: MTN Ghana AI (2019-2022)
  research_focus: primary=machine learning, secondary=telecom churn prediction

Entity: researcher/mingzhu_li
  affiliation: Tsinghua CS
  publication_count: 65
  previous_employer: Tencent AI Lab (2016-2019)
  research_focus: primary=graph neural networks, secondary=social recommendation

Entity: researcher/ingrid_sorensen
  affiliation: Norwegian University of Science and Technology
  publication_count: 52
  previous_employer: Statoil AI (2017-2020)
  research_focus: primary=time series forecasting, secondary=oil and gas ML

Entity: researcher/oluwaseun_adekunle
  affiliation: Lagos State University CS
  publication_count: 20
  previous_employer: PiggyVest AI (2019-2022)
  research_focus: primary=machine learning, secondary=savings behavior

Entity: researcher/reza_tehrani
  affiliation: University of Tehran CS
  publication_count: 46
  previous_employer: Snapp AI (2018-2021)
  research_focus: primary=reinforcement learning, secondary=ride-hailing optimization

Entity: researcher/ana_kovacevic
  affiliation: University of Zagreb CS
  publication_count: 35
  previous_employer: Infobip AI (2017-2020)
  research_focus: primary=natural language processing, secondary=Croatian NLP

Entity: researcher/mateus_barbosa
  affiliation: Federal University of Pernambuco
  publication_count: 31
  previous_employer: Totvs AI (2018-2021)
  research_focus: primary=knowledge graphs, secondary=enterprise data integration

Entity: researcher/anna_berg
  affiliation: University of Helsinki
  publication_count: 57
  previous_employer: Nokia AI (2015-2018)
  research_focus: primary=natural language processing, secondary=Finnish NLP

Entity: researcher/adia_traore
  affiliation: Universite de Ouagadougou
  publication_count: 15
  previous_employer: Airtel Burkina AI (2019-2022)
  research_focus: primary=machine learning, secondary=rural connectivity

Entity: researcher/bogdan_ionescu
  affiliation: Politehnica University Bucharest
  publication_count: 50
  previous_employer: Bitdefender AI (2016-2019)
  research_focus: primary=cybersecurity, secondary=ransomware detection

Entity: researcher/sato_yoshi
  affiliation: Nagoya University CS
  publication_count: 42
  previous_employer: Denso AI (2017-2020)
  research_focus: primary=autonomous driving, secondary=embedded ML

Entity: researcher/nkechi_okonkwo
  affiliation: University of Nigeria Nsukka
  publication_count: 22
  previous_employer: Fidelity Bank AI (2019-2022)
  research_focus: primary=machine learning, secondary=Igbo language processing

Entity: researcher/florian_wagner
  affiliation: Technical University Munich
  publication_count: 59
  previous_employer: BMW AI (2016-2019)
  research_focus: primary=autonomous driving, secondary=deep reinforcement learning

Entity: researcher/camille_bernard
  affiliation: Ecole Polytechnique
  publication_count: 54
  previous_employer: Dassault Systemes AI (2015-2018)
  research_focus: primary=generative models, secondary=CAD generation

Entity: researcher/ibrahim_al_rashid
  affiliation: King Abdullah University of Science and Technology
  publication_count: 47
  previous_employer: Saudi Aramco AI (2017-2020)
  research_focus: primary=time series forecasting, secondary=petroleum reservoir ML

Entity: researcher/agata_nowak
  affiliation: Warsaw University of Technology
  publication_count: 36
  previous_employer: PKO BP AI (2018-2021)
  research_focus: primary=machine learning, secondary=banking analytics

Entity: researcher/sung_min_cho
  affiliation: POSTECH CS
  publication_count: 70
  previous_employer: SK Telecom AI (2015-2018)
  research_focus: primary=speech recognition, secondary=Korean ASR

Entity: researcher/amobi_nwachukwu
  affiliation: Enugu State University CS
  publication_count: 18
  previous_employer: Paga AI (2019-2022)
  research_focus: primary=machine learning, secondary=mobile money

Entity: researcher/luisa_martinez
  affiliation: Universidad Complutense de Madrid
  publication_count: 44
  previous_employer: Repsol AI (2017-2020)
  research_focus: primary=time series forecasting, secondary=energy trading

Entity: researcher/pawel_wisniewski
  affiliation: Adam Mickiewicz University
  publication_count: 39
  previous_employer: Comarch AI (2018-2021)
  research_focus: primary=natural language processing, secondary=Polish information extraction

Entity: researcher/fatimah_al_zahra
  affiliation: King Abdulaziz University CS
  publication_count: 33
  previous_employer: STC AI (2017-2020)
  research_focus: primary=computer vision, secondary=Arabic document OCR

Entity: researcher/viktor_novikov
  affiliation: Novosibirsk State University
  publication_count: 48
  previous_employer: Mail.ru AI (2016-2019)
  research_focus: primary=recommender systems, secondary=social media ML

Entity: researcher/chidera_agu
  affiliation: Anambra State University CS
  publication_count: 16
  previous_employer: Opay AI (2019-2022)
  research_focus: primary=machine learning, secondary=digital payments

Entity: researcher/emre_kaya
  affiliation: Istanbul Technical University
  publication_count: 55
  previous_employer: Trendyol AI (2017-2020)
  research_focus: primary=recommender systems, secondary=fashion e-commerce

Entity: researcher/ronja_hakkarainen
  affiliation: Aalto University CS
  publication_count: 41
  previous_employer: Wolt AI (2018-2021)
  research_focus: primary=reinforcement learning, secondary=courier routing

Entity: researcher/adewale_adesanya
  affiliation: University of Ilorin CS
  publication_count: 23
  previous_employer: FirstBank AI (2019-2022)
  research_focus: primary=machine learning, secondary=loan default prediction

Entity: researcher/mikhail_sokolov
  affiliation: Higher School of Economics Moscow
  publication_count: 62
  previous_employer: Group-IB AI (2016-2019)
  research_focus: primary=cybersecurity, secondary=intrusion detection

Entity: researcher/amara_coulibaly_2
  affiliation: Universite Felix Houphouet-Boigny
  publication_count: 17
  previous_employer: Orange Cote dIvoire AI (2019-2022)
  research_focus: primary=machine learning, secondary=agricultural yield prediction

Entity: researcher/kenji_hashimoto
  affiliation: Tokyo Institute of Technology
  publication_count: 69
  previous_employer: Fujitsu AI (2014-2017)
  research_focus: primary=knowledge graphs, secondary=enterprise knowledge management

Entity: researcher/beatriz_carvalho
  affiliation: Universidade Federal do Rio de Janeiro
  publication_count: 45
  previous_employer: Petrobras AI (2017-2020)
  research_focus: primary=time series forecasting, secondary=oil price prediction

Entity: researcher/nadia_aziz
  affiliation: Lebanese American University
  publication_count: 31
  previous_employer: Cedars-Sinai AI (2018-2021)
  research_focus: primary=medical imaging, secondary=radiology AI

Entity: researcher/jan_horak
  affiliation: Brno University of Technology
  publication_count: 46
  previous_employer: Red Hat AI (2017-2020)
  research_focus: primary=machine learning, secondary=open source ML

Entity: researcher/yaw_darko
  affiliation: Kwame Nkrumah University
  publication_count: 26
  previous_employer: Ghana Water AI (2019-2022)
  research_focus: primary=machine learning, secondary=water quality monitoring

Entity: researcher/elena_kozlova
  affiliation: Moscow State University CS
  publication_count: 53
  previous_employer: Avito AI (2016-2019)
  research_focus: primary=recommender systems, secondary=classified ads ML

Entity: researcher/kwabena_ofosu
  affiliation: University of Cape Coast CS
  publication_count: 21
  previous_employer: Ecobank AI (2019-2022)
  research_focus: primary=machine learning, secondary=Pan-African banking

Entity: researcher/jose_hernandez
  affiliation: Universidad de Buenos Aires
  publication_count: 38
  previous_employer: MercadoLibre AI (2018-2021)
  research_focus: primary=recommender systems, secondary=Latin American e-commerce

Entity: researcher/kira_mueller
  affiliation: Heidelberg University
  publication_count: 60
  previous_employer: Siemens Healthineers AI (2015-2018)
  research_focus: primary=medical imaging, secondary=CT analysis

Entity: researcher/adaeze_nwankwo
  affiliation: Imo State University CS
  publication_count: 19
  previous_employer: Bamboo AI (2019-2022)
  research_focus: primary=machine learning, secondary=investment analytics

Entity: researcher/lubomir_stankovic
  affiliation: University of Novi Sad
  publication_count: 43
  previous_employer: Levi9 AI (2017-2020)
  research_focus: primary=natural language processing, secondary=Serbian NLP

Entity: researcher/yingying_zhang
  affiliation: Zhejiang University CS
  publication_count: 76
  previous_employer: Ant Group AI (2015-2018)
  research_focus: primary=federated learning, secondary=financial privacy

Entity: researcher/siobhan_omalley
  affiliation: University College Dublin
  publication_count: 48
  previous_employer: Stripe AI (2017-2020)
  research_focus: primary=fraud detection, secondary=payment network analysis

Entity: researcher/amadou_barry
  affiliation: Universite de Conakry
  publication_count: 14
  previous_employer: Orange Guinee AI (2019-2022)
  research_focus: primary=machine learning, secondary=French West African NLP

Entity: researcher/hisham_al_ghosain
  affiliation: American University of Beirut
  publication_count: 37
  previous_employer: Aramex AI (2017-2020)
  research_focus: primary=operations research, secondary=last-mile logistics

Entity: researcher/yelena_morozova
  affiliation: Tomsk State University
  publication_count: 50
  previous_employer: Magnit AI (2016-2019)
  research_focus: primary=computer vision, secondary=retail shelf monitoring

Entity: researcher/olumide_ajayi
  affiliation: Redeemers University CS
  publication_count: 22
  previous_employer: CowryWise AI (2019-2022)
  research_focus: primary=machine learning, secondary=personal finance

Entity: researcher/lucian_popa
  affiliation: West University of Timisoara
  publication_count: 40
  previous_employer: Endava AI (2018-2021)
  research_focus: primary=natural language processing, secondary=Romanian NLP

Entity: researcher/maya_cohen
  affiliation: Technion
  publication_count: 67
  previous_employer: Mellanox AI (2015-2018)
  research_focus: primary=efficient deep learning, secondary=hardware-aware ML

Entity: researcher/adwoa_sarpong
  affiliation: University of Mines Tarkwa
  publication_count: 25
  previous_employer: AngloGold AI (2019-2022)
  research_focus: primary=machine learning, secondary=mining operations

Entity: researcher/mikhail_volkov
  affiliation: Skoltech
  publication_count: 55
  previous_employer: Sber AI (2017-2020)
  research_focus: primary=generative models, secondary=Russian text generation

Entity: researcher/nathalie_lambert
  affiliation: Universite de Montreal
  publication_count: 58
  previous_employer: Mila (2016-2019)
  research_focus: primary=continual learning, secondary=catastrophic forgetting

Entity: researcher/kwame_darko
  affiliation: University of Development Studies
  publication_count: 20
  previous_employer: ADB AI (2019-2022)
  research_focus: primary=machine learning, secondary=rural poverty estimation

Entity: researcher/takahiro_suzuki
  affiliation: Tohoku University CS
  publication_count: 63
  previous_employer: Hitachi AI (2015-2018)
  research_focus: primary=natural language processing, secondary=Japanese information extraction

Entity: researcher/monika_schwarz
  affiliation: Vienna University of Technology
  publication_count: 44
  previous_employer: Erste Bank AI (2017-2020)
  research_focus: primary=machine learning, secondary=Austrian banking

Entity: researcher/chibueze_okafor
  affiliation: University of Benin CS
  publication_count: 21
  previous_employer: Cowbell AI (2019-2022)
  research_focus: primary=machine learning, secondary=microinsurance

Entity: researcher/aleksandra_wojcik
  affiliation: Wroclaw University of Technology
  publication_count: 46
  previous_employer: Netguru AI (2018-2021)
  research_focus: primary=computer vision, secondary=augmented reality

Entity: researcher/yuki_ishida
  affiliation: Hokkaido University CS
  publication_count: 52
  previous_employer: Sapporo AI (2017-2020)
  research_focus: primary=multi-task learning, secondary=weather prediction

Entity: researcher/kolade_adewusi
  affiliation: Federal University of Technology Akure
  publication_count: 18
  previous_employer: TeamApt AI (2019-2022)
  research_focus: primary=machine learning, secondary=fintech fraud

Entity: researcher/sergio_fernandez
  affiliation: Universidad de Sevilla CS
  publication_count: 41
  previous_employer: Inditex AI (2017-2020)
  research_focus: primary=computer vision, secondary=fashion attribute recognition

Entity: researcher/oksana_marchenko
  affiliation: National Technical University of Ukraine
  publication_count: 35
  previous_employer: Grammarly AI (2018-2021)
  research_focus: primary=natural language processing, secondary=grammatical error correction

Entity: researcher/emeka_okonkwo
  affiliation: University of Nigeria Nsukka
  publication_count: 24
  previous_employer: Paystack AI (2019-2022)
  research_focus: primary=machine learning, secondary=payment gateway optimization

Entity: researcher/kristoffer_lindqvist
  affiliation: Stockholm University CS
  publication_count: 57
  previous_employer: Klarna AI (2016-2019)
  research_focus: primary=fraud detection, secondary=buy-now-pay-later risk

Entity: researcher/laila_benhamou
  affiliation: Ecole Nationale Superieure Informatique
  publication_count: 32
  previous_employer: Algerie Telecom AI (2018-2021)
  research_focus: primary=natural language processing, secondary=Darija NLP

Entity: researcher/tetsuya_yamamoto
  affiliation: Keio University CS
  publication_count: 65
  previous_employer: Recruit AI (2014-2017)
  research_focus: primary=recommender systems, secondary=job matching

Entity: researcher/blessing_okeke
  affiliation: Federal University Oye-Ekiti
  publication_count: 16
  previous_employer: Flutterwave AI (2019-2022)
  research_focus: primary=machine learning, secondary=cross-border payments

Entity: researcher/nuno_vasconcelos
  affiliation: University of Porto CS
  publication_count: 48
  previous_employer: Farfetch AI (2017-2020)
  research_focus: primary=computer vision, secondary=luxury retail

Entity: researcher/saoirse_brennan
  affiliation: Trinity College Dublin CS
  publication_count: 39
  previous_employer: Accenture AI (2018-2021)
  research_focus: primary=natural language processing, secondary=enterprise NLP

Entity: researcher/rashida_mensah
  affiliation: Ghana Institute of Management CS
  publication_count: 23
  previous_employer: ExpressPay AI (2019-2022)
  research_focus: primary=machine learning, secondary=payment behavior

Entity: researcher/jan_novotny
  affiliation: Masaryk University CS
  publication_count: 44
  previous_employer: JetBrains AI (2017-2020)
  research_focus: primary=program synthesis, secondary=code completion

Entity: researcher/soo_young_kim
  affiliation: Seoul National University
  publication_count: 71
  previous_employer: Hyundai AI (2014-2017)
  research_focus: primary=autonomous driving, secondary=HD map generation

Entity: researcher/fatima_al_shamsi
  affiliation: UAE University CS
  publication_count: 36
  previous_employer: Etisalat AI (2017-2020)
  research_focus: primary=natural language processing, secondary=Emirati Arabic NLP

Entity: researcher/olena_kovalenko
  affiliation: National University of Kyiv-Mohyla Academy
  publication_count: 40
  previous_employer: Ajax Systems AI (2018-2021)
  research_focus: primary=machine learning, secondary=smart home security

Entity: researcher/kojo_asiedu
  affiliation: Valley View University CS
  publication_count: 17
  previous_employer: Blue Financial AI (2019-2022)
  research_focus: primary=machine learning, secondary=microfinance scoring

Entity: researcher/andrea_horvath
  affiliation: Budapest University of Technology
  publication_count: 54
  previous_employer: OTP Bank AI (2016-2019)
  research_focus: primary=machine learning, secondary=Hungarian banking

Entity: researcher/mika_virtanen
  affiliation: University of Helsinki
  publication_count: 46
  previous_employer: Rovio AI (2017-2020)
  research_focus: primary=reinforcement learning, secondary=mobile game AI

Entity: researcher/chiamaka_uche
  affiliation: Nnamdi Azikiwe University CS
  publication_count: 19
  previous_employer: Carbon AI (2019-2022)
  research_focus: primary=machine learning, secondary=credit access

Entity: researcher/alejandro_vargas
  affiliation: Universidad de los Andes Colombia
  publication_count: 43
  previous_employer: Rappi AI (2018-2021)
  research_focus: primary=reinforcement learning, secondary=delivery fleet management

Entity: researcher/zuzanna_wojcik
  affiliation: University of Wroclaw CS
  publication_count: 37
  previous_employer: Brainly AI (2017-2020)
  research_focus: primary=natural language processing, secondary=educational NLP

Entity: researcher/rashid_al_omari
  affiliation: Jordan University of Science and Technology
  publication_count: 30
  previous_employer: Zain AI (2018-2021)
  research_focus: primary=natural language processing, secondary=Levantine Arabic

Entity: researcher/haruna_tanaka
  affiliation: Kyushu University CS
  publication_count: 59
  previous_employer: Kyushu Electric AI (2015-2018)
  research_focus: primary=time series forecasting, secondary=grid stability

Entity: researcher/olumuyiwa_adebiyi
  affiliation: Babcock University CS
  publication_count: 20
  previous_employer: Remita AI (2019-2022)
  research_focus: primary=machine learning, secondary=government payments

Entity: researcher/simona_brambilla
  affiliation: Politecnico di Torino
  publication_count: 51
  previous_employer: Fiat AI (2016-2019)
  research_focus: primary=autonomous driving, secondary=urban mobility

Entity: researcher/wei_guo
  affiliation: Zhejiang University CS
  publication_count: 80
  previous_employer: NetEase AI (2014-2017)
  research_focus: primary=graph neural networks, secondary=game AI

Entity: researcher/abena_asante
  affiliation: University of Professional Studies
  publication_count: 22
  previous_employer: GTP Vodafone AI (2019-2022)
  research_focus: primary=machine learning, secondary=customer segmentation

Entity: researcher/ivan_petrov_2
  affiliation: SPbPU
  publication_count: 45
  previous_employer: Rosatom AI (2016-2019)
  research_focus: primary=machine learning, secondary=nuclear safety monitoring

Entity: researcher/yemi_adesanya
  affiliation: University of Lagos CS
  publication_count: 27
  previous_employer: Interswitch AI (2019-2022)
  research_focus: primary=natural language processing, secondary=Yoruba NLP

Entity: researcher/celine_martin
  affiliation: Universite de Lyon CS
  publication_count: 53
  previous_employer: Michelin AI (2017-2020)
  research_focus: primary=computer vision, secondary=tire defect detection

Entity: researcher/suresh_babu
  affiliation: Anna University CS
  publication_count: 40
  previous_employer: Infosys AI (2018-2021)
  research_focus: primary=natural language processing, secondary=code review automation

Entity: researcher/ama_boateng
  affiliation: Regent University College CS
  publication_count: 19
  previous_employer: Hubtel AI (2019-2022)
  research_focus: primary=machine learning, secondary=messaging platform analytics

Entity: researcher/christoph_bauer
  affiliation: Karlsruhe Institute of Technology
  publication_count: 61
  previous_employer: Porsche AI (2016-2019)
  research_focus: primary=reinforcement learning, secondary=vehicle dynamics

Entity: researcher/akua_amponsah
  affiliation: Ghana Technology University College
  publication_count: 21
  previous_employer: Rancard AI (2019-2022)
  research_focus: primary=machine learning, secondary=mobile marketing

Entity: researcher/rodrigo_gutierrez
  affiliation: Pontificia Universidad Catolica de Chile
  publication_count: 48
  previous_employer: Entel AI (2017-2020)
  research_focus: primary=natural language processing, secondary=Chilean Spanish NLP

Entity: researcher/diana_stoian
  affiliation: Technical University of Cluj-Napoca
  publication_count: 36
  previous_employer: Tremend AI (2018-2021)
  research_focus: primary=machine learning, secondary=automotive software

Entity: researcher/obi_anyanwu
  affiliation: Federal University of Technology Owerri
  publication_count: 18
  previous_employer: Moniepoint AI (2019-2022)
  research_focus: primary=machine learning, secondary=agent banking

Entity: researcher/lars_petersen
  affiliation: Technical University of Denmark
  publication_count: 56
  previous_employer: Vestas AI (2016-2019)
  research_focus: primary=time series forecasting, secondary=wind energy

Entity: researcher/nataliya_kovalchuk
  affiliation: Ukrainian Catholic University CS
  publication_count: 34
  previous_employer: Intellias AI (2018-2021)
  research_focus: primary=computer vision, secondary=satellite imagery analysis

Entity: researcher/akintunde_adesola
  affiliation: Obafemi Awolowo University
  publication_count: 23
  previous_employer: Zenith Bank AI (2019-2022)
  research_focus: primary=machine learning, secondary=corporate banking

Entity: researcher/frederik_storm
  affiliation: Aarhus University CS
  publication_count: 66
  previous_employer: Grundfos AI (2015-2018)
  research_focus: primary=time series forecasting, secondary=pump efficiency

Entity: researcher/mei_lin_chen
  affiliation: National Taiwan University CS
  publication_count: 74
  previous_employer: TSMC AI (2014-2017)
  research_focus: primary=machine learning, secondary=semiconductor yield

Entity: researcher/olumide_bakare
  affiliation: University of Benin CS
  publication_count: 20
  previous_employer: Providus Bank AI (2019-2022)
  research_focus: primary=machine learning, secondary=transaction monitoring

Entity: researcher/kateřina_horakova
  affiliation: Palacky University Olomouc
  publication_count: 39
  previous_employer: Bohemia Interactive AI (2017-2020)
  research_focus: primary=reinforcement learning, secondary=game simulation

Entity: researcher/tanaka_hiroki
  affiliation: Waseda University CS
  publication_count: 58
  previous_employer: SoftBank AI (2016-2019)
  research_focus: primary=natural language processing, secondary=Japanese dialogue

Entity: researcher/chika_eze
  affiliation: Imo State University CS
  publication_count: 17
  previous_employer: Bundle AI (2019-2022)
  research_focus: primary=machine learning, secondary=crypto trading

Entity: researcher/aleksandr_voloshyn
  affiliation: Kharkiv National University CS
  publication_count: 47
  previous_employer: EPAM AI (2017-2020)
  research_focus: primary=natural language processing, secondary=Ukrainian text analysis

Entity: researcher/hana_novotna
  affiliation: Brno University of Technology
  publication_count: 44
  previous_employer: Seznam AI (2018-2021)
  research_focus: primary=information retrieval, secondary=Czech search

Entity: researcher/kofi_ampomah
  affiliation: University of Ghana Business School
  publication_count: 26
  previous_employer: Fido AI (2019-2022)
  research_focus: primary=machine learning, secondary=alternative credit scoring

Entity: researcher/anastasiya_belova
  affiliation: Belarusian State University CS
  publication_count: 42
  previous_employer: Wargaming AI (2017-2020)
  research_focus: primary=reinforcement learning, secondary=multiplayer game balance

Entity: researcher/jose_miguel_perez
  affiliation: Universidad de Valencia
  publication_count: 50
  previous_employer: Banco Santander AI (2016-2019)
  research_focus: primary=machine learning, secondary=mortgage risk

Entity: researcher/oluwafemi_adesina
  affiliation: Pan-Atlantic University CS
  publication_count: 22
  previous_employer: PalmPay AI (2019-2022)
  research_focus: primary=machine learning, secondary=agent network management

Entity: researcher/laila_siddiqui
  affiliation: Lahore University of Management Sciences
  publication_count: 38
  previous_employer: Jazz AI (2018-2021)
  research_focus: primary=natural language processing, secondary=Urdu NLP

Entity: researcher/jiri_dvoracek
  affiliation: Czech Technical University Prague
  publication_count: 55
  previous_employer: Skoda AI (2016-2019)
  research_focus: primary=computer vision, secondary=automotive perception

Entity: researcher/fatou_sow
  affiliation: Universite Gaston Berger
  publication_count: 16
  previous_employer: Sonatel AI (2019-2022)
  research_focus: primary=machine learning, secondary=rural broadband optimization

Entity: researcher/takuya_honda
  affiliation: Kobe University CS
  publication_count: 61
  previous_employer: Kobe Steel AI (2015-2018)
  research_focus: primary=computer vision, secondary=metal quality inspection

Entity: researcher/ifeoma_okeke
  affiliation: Enugu State University CS
  publication_count: 20
  previous_employer: VFD Group AI (2019-2022)
  research_focus: primary=machine learning, secondary=Nigerian fintech

Entity: researcher/marcus_lindberg
  affiliation: Umea University CS
  publication_count: 53
  previous_employer: Vattenfall AI (2016-2019)
  research_focus: primary=time series forecasting, secondary=hydroelectric power

Entity: researcher/miroslava_horvatova
  affiliation: Slovak Technical University
  publication_count: 37
  previous_employer: Slovak Telekom AI (2017-2020)
  research_focus: primary=natural language processing, secondary=Slovak NLP

Entity: researcher/emeka_onuoha
  affiliation: Imo State University CS
  publication_count: 24
  previous_employer: Lidya AI (2019-2022)
  research_focus: primary=machine learning, secondary=SME lending

Entity: researcher/arnav_desai
  affiliation: IIT Gandhinagar
  publication_count: 46
  previous_employer: CRED AI (2018-2021)
  research_focus: primary=machine learning, secondary=credit card analytics

Entity: researcher/yumiko_saito
  affiliation: Nagoya Institute of Technology
  publication_count: 64
  previous_employer: Toyota AI (2015-2018)
  research_focus: primary=multi-task learning, secondary=manufacturing defect detection

Entity: researcher/adaeze_okonkwo
  affiliation: University of Nigeria CS
  publication_count: 19
  previous_employer: Helios AI (2019-2022)
  research_focus: primary=machine learning, secondary=African startup analytics

Entity: researcher/thibaut_leclerc
  affiliation: Universite de Bordeaux CS
  publication_count: 49
  previous_employer: Airbus AI (2016-2019)
  research_focus: primary=reinforcement learning, secondary=aircraft scheduling

Entity: researcher/ming_xiang
  affiliation: Fudan University CS
  publication_count: 82
  previous_employer: JD.com AI (2014-2017)
  research_focus: primary=recommender systems, secondary=logistics ML

Entity: researcher/olabisi_adewale
  affiliation: Tai Solarin University
  publication_count: 21
  previous_employer: Opay AI (2019-2022)
  research_focus: primary=machine learning, secondary=payment routing

Entity: researcher/petra_horakova
  affiliation: University of South Bohemia
  publication_count: 41
  previous_employer: Ceska Sporitelna AI (2017-2020)
  research_focus: primary=machine learning, secondary=retail banking automation

Entity: researcher/kwesi_antwi
  affiliation: University of Cape Coast CS
  publication_count: 25
  previous_employer: GCNet AI (2019-2022)
  research_focus: primary=machine learning, secondary=customs clearance prediction

Entity: researcher/volodymyr_koval
  affiliation: Lviv Polytechnic National University
  publication_count: 43
  previous_employer: MacPaw AI (2017-2020)
  research_focus: primary=machine learning, secondary=software optimization

Entity: researcher/amara_dieng
  affiliation: Universite Alioune Diop
  publication_count: 15
  previous_employer: Ecobank Senegal AI (2019-2022)
  research_focus: primary=machine learning, secondary=Wolof language processing

Entity: researcher/shu_ming_wang
  affiliation: Shanghai Jiao Tong University
  publication_count: 79
  previous_employer: Xiaomi AI (2014-2017)
  research_focus: primary=computer vision, secondary=mobile device photography

Entity: researcher/olumide_olatunji
  affiliation: Federal University Otuoke
  publication_count: 20
  previous_employer: Max.ng AI (2019-2022)
  research_focus: primary=machine learning, secondary=motorcycle logistics

Entity: researcher/anna_karolina_witek
  affiliation: Lodz University of Technology
  publication_count: 38
  previous_employer: PGE AI (2017-2020)
  research_focus: primary=time series forecasting, secondary=electricity demand

Entity: researcher/kenta_sato
  affiliation: Tokyo University of Science
  publication_count: 56
  previous_employer: Mitsubishi Electric AI (2015-2018)
  research_focus: primary=computer vision, secondary=industrial robotics

Entity: researcher/chinyere_obiora
  affiliation: Nnamdi Azikiwe University CS
  publication_count: 18
  previous_employer: Piggytech AI (2019-2022)
  research_focus: primary=machine learning, secondary=savings gamification

Entity: researcher/boris_petrov
  affiliation: Technical University Sofia
  publication_count: 47
  previous_employer: Telerik AI (2016-2019)
  research_focus: primary=natural language processing, secondary=Bulgarian NLP

Entity: researcher/hana_lee
  affiliation: Ewha Womans University CS
  publication_count: 53
  previous_employer: Kakao AI (2017-2020)
  research_focus: primary=natural language processing, secondary=Korean social media analysis

Entity: researcher/oluwakemi_afolabi
  affiliation: Federal University Oye-Ekiti
  publication_count: 22
  previous_employer: Brass AI (2019-2022)
  research_focus: primary=machine learning, secondary=SME financial health

Entity: researcher/konstantinos_papadopoulos
  affiliation: National Technical University of Athens
  publication_count: 60
  previous_employer: Cosmote AI (2015-2018)
  research_focus: primary=graph neural networks, secondary=telecom network planning

Entity: researcher/wanjiku_mwangi
  affiliation: Strathmore University CS
  publication_count: 27
  previous_employer: M-Kopa AI (2019-2022)
  research_focus: primary=machine learning, secondary=pay-as-you-go energy

Entity: researcher/nils_andersen
  affiliation: University of Bergen CS
  publication_count: 48
  previous_employer: DNB AI (2016-2019)
  research_focus: primary=machine learning, secondary=Norwegian banking

Entity: researcher/ayesha_khalid
  affiliation: NUST Islamabad
  publication_count: 35
  previous_employer: Telenor Pakistan AI (2017-2020)
  research_focus: primary=natural language processing, secondary=Pakistani language NLP

Entity: researcher/emeka_chukwu
  affiliation: University of Nigeria Nsukka
  publication_count: 21
  previous_employer: VBank AI (2019-2022)
  research_focus: primary=machine learning, secondary=virtual banking

Entity: researcher/ole_kristian_berg
  affiliation: University of Tromso
  publication_count: 44
  previous_employer: Kongsberg AI (2017-2020)
  research_focus: primary=autonomous systems, secondary=underwater robotics

Entity: researcher/zhu_xiao_feng
  affiliation: Peking University
  publication_count: 83
  previous_employer: Didi AI (2014-2017)
  research_focus: primary=reinforcement learning, secondary=urban traffic control

Entity: researcher/oluwasegun_babatunde
  affiliation: Lagos State University CS
  publication_count: 20
  previous_employer: PayHippo AI (2019-2022)
  research_focus: primary=machine learning, secondary=working capital financing

Entity: researcher/bogumila_pawlak
  affiliation: AGH University of Science and Technology
  publication_count: 42
  previous_employer: PKN Orlen AI (2017-2020)
  research_focus: primary=time series forecasting, secondary=refinery operations

Entity: researcher/kiyoshi_yamada
  affiliation: Ritsumeikan University CS
  publication_count: 67
  previous_employer: Kyocera AI (2014-2017)
  research_focus: primary=machine learning, secondary=ceramic materials

Entity: researcher/sena_agbenyega
  affiliation: University of Health and Allied Sciences
  publication_count: 23
  previous_employer: mPharma AI (2019-2022)
  research_focus: primary=machine learning, secondary=pharmaceutical supply chain

Entity: researcher/miroslav_janacek
  affiliation: Technical University of Kosice
  publication_count: 39
  previous_employer: Asseco AI (2017-2020)
  research_focus: primary=natural language processing, secondary=Slovak information extraction

Entity: researcher/lindiwe_dlamini
  affiliation: University of Eswatini CS
  publication_count: 16
  previous_employer: MTN Eswatini AI (2019-2022)
  research_focus: primary=machine learning, secondary=SiSwati language processing

Entity: researcher/yoshiki_tanaka
  affiliation: Gifu University CS
  publication_count: 51
  previous_employer: Tokai Carbon AI (2016-2019)
  research_focus: primary=computer vision, secondary=carbon fiber inspection

Entity: researcher/yetunde_abiodun
  affiliation: Ekiti State University CS
  publication_count: 19
  previous_employer: Bankly AI (2019-2022)
  research_focus: primary=machine learning, secondary=rural financial inclusion

Entity: researcher/dagmar_fischer
  affiliation: Freie Universitat Berlin
  publication_count: 54
  previous_employer: Delivery Hero AI (2017-2020)
  research_focus: primary=reinforcement learning, secondary=food delivery logistics

Entity: researcher/kweku_asante
  affiliation: Koforidua Technical University
  publication_count: 18
  previous_employer: DreamOval AI (2019-2022)
  research_focus: primary=machine learning, secondary=mobile money interoperability

Entity: researcher/piotr_wisniewski
  affiliation: Silesian University of Technology
  publication_count: 46
  previous_employer: KGHM AI (2016-2019)
  research_focus: primary=time series forecasting, secondary=copper mining operations

Entity: researcher/naomi_wanjiku
  affiliation: Kenyatta University CS
  publication_count: 24
  previous_employer: Twiga Foods AI (2019-2022)
  research_focus: primary=machine learning, secondary=agricultural supply chain

Entity: researcher/konstantin_nikitin
  affiliation: Ural Federal University
  publication_count: 58
  previous_employer: Evraz AI (2016-2019)
  research_focus: primary=computer vision, secondary=steel quality control

Entity: researcher/oluwabunmi_olawoye
  affiliation: Ladoke Akintola University CS
  publication_count: 21
  previous_employer: Aella Credit AI (2019-2022)
  research_focus: primary=machine learning, secondary=consumer lending

Entity: researcher/andrea_rossi_2
  affiliation: University of Pisa CS
  publication_count: 49
  previous_employer: Piaggio AI (2017-2020)
  research_focus: primary=autonomous systems, secondary=two-wheel vehicle automation

Entity: researcher/amara_ngom
  affiliation: Universite de Thies
  publication_count: 17
  previous_employer: Wave Senegal AI (2019-2022)
  research_focus: primary=machine learning, secondary=mobile wallet optimization

Entity: researcher/haruto_yoshida
  affiliation: Chiba University CS
  publication_count: 60
  previous_employer: Canon AI (2015-2018)
  research_focus: primary=computer vision, secondary=medical device imaging

Entity: researcher/chibuike_nwosu
  affiliation: University of Port Harcourt CS
  publication_count: 20
  previous_employer: SeamlessHR AI (2019-2022)
  research_focus: primary=machine learning, secondary=HR analytics

Entity: researcher/stefan_popp
  affiliation: Graz University of Technology
  publication_count: 44
  previous_employer: AVL AI (2016-2019)
  research_focus: primary=time series forecasting, secondary=powertrain calibration

Entity: researcher/bo_ram_kim
  affiliation: KAIST
  publication_count: 68
  previous_employer: Krafton AI (2016-2019)
  research_focus: primary=reinforcement learning, secondary=online game AI

Entity: researcher/oluwadamilola_adeyeye
  affiliation: Federal University of Agriculture Abeokuta
  publication_count: 22
  previous_employer: Thrive Agric AI (2019-2022)
  research_focus: primary=machine learning, secondary=precision agriculture

Entity: researcher/jan_blazejewski
  affiliation: Gdansk University of Technology
  publication_count: 43
  previous_employer: Lotos AI (2017-2020)
  research_focus: primary=time series forecasting, secondary=fuel price prediction

Entity: researcher/yuki_nakashima
  affiliation: Hiroshima University CS
  publication_count: 57
  previous_employer: Mazda AI (2015-2018)
  research_focus: primary=computer vision, secondary=automotive quality inspection

Entity: researcher/chidubem_nwachukwu
  affiliation: University of Nigeria Nsukka
  publication_count: 19
  previous_employer: Bankbox AI (2019-2022)
  research_focus: primary=machine learning, secondary=BNPL risk scoring

Entity: researcher/maximilian_schreiber
  affiliation: University of Stuttgart
  publication_count: 52
  previous_employer: Daimler AI (2016-2019)
  research_focus: primary=autonomous driving, secondary=pedestrian detection

Entity: researcher/adaora_nwosu
  affiliation: Abia State University CS
  publication_count: 21
  previous_employer: Kuda AI (2019-2022)
  research_focus: primary=machine learning, secondary=neobank analytics

Entity: researcher/yusra_al_hussein
  affiliation: Jordan University CS
  publication_count: 34
  previous_employer: Orange Jordan AI (2017-2020)
  research_focus: primary=natural language processing, secondary=Jordanian Arabic NLP

Entity: researcher/riku_leinonen
  affiliation: Tampere University CS
  publication_count: 48
  previous_employer: Fiskars AI (2018-2021)
  research_focus: primary=computer vision, secondary=product design inspection

Entity: researcher/oluwakayode_awojobi
  affiliation: University of Ado-Ekiti CS
  publication_count: 18
  previous_employer: Ventures Platform AI (2019-2022)
  research_focus: primary=machine learning, secondary=startup investment screening

Entity: researcher/katarzyna_rogalska
  affiliation: Warsaw University
  publication_count: 40
  previous_employer: ING Poland AI (2017-2020)
  research_focus: primary=machine learning, secondary=mortgage analytics

Entity: researcher/yu_shan_lin
  affiliation: National Chiao Tung University
  publication_count: 72
  previous_employer: MediaTek AI (2014-2017)
  research_focus: primary=efficient deep learning, secondary=mobile chip ML

Entity: researcher/tobenna_okafor
  affiliation: Ebonyi State University CS
  publication_count: 17
  previous_employer: Chipper Cash AI (2019-2022)
  research_focus: primary=machine learning, secondary=diaspora remittances

Entity: researcher/tanja_becker
  affiliation: University of Frankfurt CS
  publication_count: 57
  previous_employer: Deutsche Bank AI (2015-2018)
  research_focus: primary=machine learning, secondary=algorithmic trading

Entity: researcher/liu_yang_2
  affiliation: Renmin University CS
  publication_count: 76
  previous_employer: Pinduoduo AI (2015-2018)
  research_focus: primary=recommender systems, secondary=social commerce

Entity: researcher/ngozi_ekwueme
  affiliation: University of Nigeria CS
  publication_count: 23
  previous_employer: Carbon Finance AI (2019-2022)
  research_focus: primary=machine learning, secondary=credit risk ML

Entity: researcher/svein_hakon_roald
  affiliation: Norwegian School of Economics
  publication_count: 46
  previous_employer: Aker AI (2016-2019)
  research_focus: primary=machine learning, secondary=offshore energy ML

Entity: researcher/atieno_aluoch
  affiliation: Technical University of Kenya
  publication_count: 25
  previous_employer: Sendy AI (2019-2022)
  research_focus: primary=reinforcement learning, secondary=logistics routing

Entity: researcher/florin_barbu
  affiliation: University of Craiova CS
  publication_count: 39
  previous_employer: Cognizant AI (2017-2020)
  research_focus: primary=natural language processing, secondary=Romanian text classification

Entity: researcher/masato_iwata
  affiliation: Hiroshima Institute of Technology
  publication_count: 55
  previous_employer: Ricoh AI (2015-2018)
  research_focus: primary=document understanding, secondary=OCR post-processing

Entity: researcher/olayemi_awosanya
  affiliation: Bowen University CS
  publication_count: 20
  previous_employer: FairMoney AI (2019-2022)
  research_focus: primary=machine learning, secondary=Nigerian microloans

Entity: researcher/jan_klement
  affiliation: University of Regensburg CS
  publication_count: 44
  previous_employer: Sixt AI (2016-2019)
  research_focus: primary=reinforcement learning, secondary=vehicle fleet management

Entity: researcher/park_ji_young
  affiliation: Yonsei University CS
  publication_count: 65
  previous_employer: Kakao Bank AI (2016-2019)
  research_focus: primary=machine learning, secondary=mobile banking risk

Entity: researcher/chukwuemeka_nweke
  affiliation: Imo State University CS
  publication_count: 19
  previous_employer: Renmoney AI (2019-2022)
  research_focus: primary=machine learning, secondary=consumer credit

Entity: researcher/jana_moravcova
  affiliation: Masaryk University CS
  publication_count: 41
  previous_employer: Kentico AI (2017-2020)
  research_focus: primary=natural language processing, secondary=content management NLP

Entity: researcher/yuki_sato_2
  affiliation: Shibaura Institute of Technology
  publication_count: 52
  previous_employer: Yokohama Rubber AI (2015-2018)
  research_focus: primary=computer vision, secondary=rubber inspection

Entity: researcher/chiamaka_nwosu
  affiliation: Anambra State University CS
  publication_count: 22
  previous_employer: Uzondu AI (2019-2022)
  research_focus: primary=machine learning, secondary=African logistics

Entity: researcher/lasse_christoffersen
  affiliation: University of Southern Denmark
  publication_count: 50
  previous_employer: Danfoss AI (2016-2019)
  research_focus: primary=time series forecasting, secondary=HVAC optimization

Entity: researcher/samuel_owusu
  affiliation: University of Ghana CS
  publication_count: 28
  previous_employer: Kofa AI (2019-2022)
  research_focus: primary=machine learning, secondary=spare parts supply chain

Entity: researcher/igor_bykow
  affiliation: National University of Lviv CS
  publication_count: 44
  previous_employer: GlobalLogic AI (2017-2020)
  research_focus: primary=machine learning, secondary=embedded systems ML

Entity: researcher/ximena_rojas
  affiliation: Universidad de Concepcion
  publication_count: 36
  previous_employer: BCI AI (2018-2021)
  research_focus: primary=machine learning, secondary=Chilean banking

Entity: researcher/emeka_agwu
  affiliation: Enugu State University CS
  publication_count: 18
  previous_employer: Kippa AI (2019-2022)
  research_focus: primary=machine learning, secondary=bookkeeping automation

Entity: researcher/dmitry_nikiforov
  affiliation: Samara University
  publication_count: 53
  previous_employer: AliExpress AI (2016-2019)
  research_focus: primary=recommender systems, secondary=cross-border e-commerce

Entity: researcher/jae_won_han
  affiliation: UNIST CS
  publication_count: 67
  previous_employer: Posco AI (2015-2018)
  research_focus: primary=computer vision, secondary=steel manufacturing

Entity: researcher/ngozi_obiora
  affiliation: Federal University Ndufu-Alike
  publication_count: 21
  previous_employer: 54gene AI (2019-2022)
  research_focus: primary=machine learning, secondary=African genomics

Entity: researcher/jan_straka
  affiliation: Faculty of Mathematics and Physics Prague
  publication_count: 47
  previous_employer: Rossum AI (2017-2020)
  research_focus: primary=document understanding, secondary=invoice processing

Entity: researcher/nana_kofi_mensah
  affiliation: GIMPA CS
  publication_count: 24
  previous_employer: Zeepay AI (2019-2022)
  research_focus: primary=machine learning, secondary=cross-border mobile payments

Entity: researcher/galina_sorokina
  affiliation: Irkutsk State University CS
  publication_count: 41
  previous_employer: En+ AI (2016-2019)
  research_focus: primary=time series forecasting, secondary=aluminum smelting

Entity: researcher/atsushi_nakano
  affiliation: Nara Institute of Science and Technology
  publication_count: 64
  previous_employer: Sharp AI (2014-2017)
  research_focus: primary=computer vision, secondary=display technology

Entity: researcher/olubunmi_oke
  affiliation: Crawford University CS
  publication_count: 19
  previous_employer: Pivo AI (2019-2022)
  research_focus: primary=machine learning, secondary=supply chain finance

Entity: researcher/soren_nielsen
  affiliation: IT University of Copenhagen
  publication_count: 54
  previous_employer: Saxo Bank AI (2015-2018)
  research_focus: primary=machine learning, secondary=trading platform analytics

Entity: researcher/amira_ben_salah
  affiliation: University of Tunis CS
  publication_count: 33
  previous_employer: Telnet AI (2017-2020)
  research_focus: primary=natural language processing, secondary=Tunisian Arabic NLP

Entity: researcher/oluwafunmilayo_alabi
  affiliation: Kwara State University CS
  publication_count: 20
  previous_employer: Chaka AI (2019-2022)
  research_focus: primary=machine learning, secondary=African stocks analytics

Entity: researcher/petr_cerny
  affiliation: University of Hradec Kralove
  publication_count: 38
  previous_employer: Socialbakers AI (2017-2020)
  research_focus: primary=natural language processing, secondary=social media analytics

Entity: researcher/nana_yaa_acheampong
  affiliation: University of Ghana CS
  publication_count: 26
  previous_employer: Paysail AI (2019-2022)
  research_focus: primary=machine learning, secondary=African trade finance

Entity: researcher/michiya_yamamoto
  affiliation: Kwansei Gakuin University
  publication_count: 58
  previous_employer: Sumitomo AI (2015-2018)
  research_focus: primary=time series forecasting, secondary=commodity trading

Entity: researcher/chinyere_udeh
  affiliation: University of Calabar CS
  publication_count: 17
  previous_employer: Paga AI (2019-2022)
  research_focus: primary=machine learning, secondary=payment network expansion

Entity: researcher/mirko_maric
  affiliation: University of Split CS
  publication_count: 43
  previous_employer: Infobip AI (2016-2019)
  research_focus: primary=natural language processing, secondary=Croatian customer service NLP

Entity: researcher/jing_wei_zhang
  affiliation: Tongji University CS
  publication_count: 77
  previous_employer: SAIC AI (2014-2017)
  research_focus: primary=autonomous driving, secondary=Chinese urban traffic

Entity: researcher/oluwatobiloba_olanrewaju
  affiliation: University of Ilorin CS
  publication_count: 22
  previous_employer: Credpal AI (2019-2022)
  research_focus: primary=machine learning, secondary=installment payment risk

Entity: researcher/vilma_daugirdaite
  affiliation: Vilnius University CS
  publication_count: 40
  previous_employer: Vinted AI (2017-2020)
  research_focus: primary=recommender systems, secondary=second-hand fashion

Entity: researcher/kwabena_mensah_2
  affiliation: University of Mines Tarkwa
  publication_count: 24
  previous_employer: Gold Fields AI (2019-2022)
  research_focus: primary=machine learning, secondary=mineral processing

Entity: researcher/nataliya_shevchenko
  affiliation: Kyiv Polytechnic Institute
  publication_count: 47
  previous_employer: Ciklum AI (2017-2020)
  research_focus: primary=natural language processing, secondary=Ukrainian NLP

Entity: researcher/seun_akerele
  affiliation: Bells University CS
  publication_count: 21
  previous_employer: Motito AI (2019-2022)
  research_focus: primary=machine learning, secondary=used car pricing

Entity: researcher/nikoleta_vassileva
  affiliation: University of Sofia CS
  publication_count: 45
  previous_employer: Paynetics AI (2016-2019)
  research_focus: primary=machine learning, secondary=Bulgarian fintech

Entity: researcher/tosin_adewuyi
  affiliation: Covenant University CS
  publication_count: 20
  previous_employer: Autochek AI (2019-2022)
  research_focus: primary=machine learning, secondary=African automotive ML

Entity: researcher/alexander_gross
  affiliation: Mannheim University CS
  publication_count: 61
  previous_employer: SAP AI (2015-2018)
  research_focus: primary=natural language processing, secondary=enterprise knowledge extraction

Entity: researcher/kwame_tawiah
  affiliation: University of Cape Coast CS
  publication_count: 23
  previous_employer: Affinity AI (2019-2022)
  research_focus: primary=machine learning, secondary=health insurance claims

Entity: researcher/valeria_lombardi
  affiliation: University of Florence CS
  publication_count: 49
  previous_employer: Eni AI (2016-2019)
  research_focus: primary=time series forecasting, secondary=natural gas production

Entity: researcher/oluwasegun_ajayi
  affiliation: Bells University CS
  publication_count: 18
  previous_employer: Bumpa AI (2019-2022)
  research_focus: primary=machine learning, secondary=SME inventory management

Entity: researcher/michal_dvorak
  affiliation: Czech University of Life Sciences
  publication_count: 37
  previous_employer: Rohlik AI (2017-2020)
  research_focus: primary=machine learning, secondary=grocery delivery optimization

Entity: researcher/rin_hayashi
  affiliation: Shinshu University CS
  publication_count: 53
  previous_employer: Seiko Epson AI (2015-2018)
  research_focus: primary=computer vision, secondary=precision parts inspection

Entity: researcher/adaeze_nmachi
  affiliation: Imo State Polytechnic
  publication_count: 16
  previous_employer: OKash AI (2019-2022)
  research_focus: primary=machine learning, secondary=micro-lending

Entity: researcher/matus_banas
  affiliation: Pavol Jozef Safarik University
  publication_count: 42
  previous_employer: ESET AI (2016-2019)
  research_focus: primary=cybersecurity, secondary=antivirus ML

Entity: researcher/so_young_park
  affiliation: Sungkyunkwan University CS
  publication_count: 70
  previous_employer: Coupang AI (2015-2018)
  research_focus: primary=recommender systems, secondary=Korean logistics ML

Entity: researcher/chukwudi_eze
  affiliation: Anambra State University CS
  publication_count: 20
  previous_employer: Wallets Africa AI (2019-2022)
  research_focus: primary=machine learning, secondary=multi-currency management

Entity: researcher/petar_pavlov
  affiliation: Ss. Cyril and Methodius University
  publication_count: 36
  previous_employer: Telecom Macedonia AI (2017-2020)
  research_focus: primary=natural language processing, secondary=Macedonian NLP

Entity: researcher/sho_yamamoto
  affiliation: Kanazawa University CS
  publication_count: 57
  previous_employer: Komatsu AI (2015-2018)
  research_focus: primary=computer vision, secondary=construction equipment monitoring

Entity: researcher/adaeze_nwoke
  affiliation: Federal Polytechnic Nekede
  publication_count: 17
  previous_employer: Lipa Later AI (2019-2022)
  research_focus: primary=machine learning, secondary=East African BNPL

Entity: researcher/lukas_novak_2
  affiliation: University of Ostrava CS
  publication_count: 43
  previous_employer: Kofola AI (2016-2019)
  research_focus: primary=machine learning, secondary=FMCG demand forecasting

Entity: researcher/ifeoluwa_akinola
  affiliation: Redeemers University CS
  publication_count: 21
  previous_employer: Duplo AI (2019-2022)
  research_focus: primary=machine learning, secondary=B2B payments

Entity: researcher/ariane_weber
  affiliation: University of Hamburg CS
  publication_count: 55
  previous_employer: Otto AI (2016-2019)
  research_focus: primary=recommender systems, secondary=German e-commerce

Entity: researcher/seun_adeleke
  affiliation: Caleb University CS
  publication_count: 20
  previous_employer: Mono AI (2019-2022)
  research_focus: primary=machine learning, secondary=open banking Africa

Entity: researcher/tae_hoon_kim
  affiliation: Sookmyung Womens University
  publication_count: 62
  previous_employer: Naver AI (2015-2018)
  research_focus: primary=natural language processing, secondary=Korean question answering

Entity: researcher/diana_lukic
  affiliation: University of Rijeka CS
  publication_count: 37
  previous_employer: Rimac AI (2017-2020)
  research_focus: primary=reinforcement learning, secondary=electric vehicle optimization

Entity: researcher/nkechinyere_nwosu
  affiliation: Federal University Oye-Ekiti
  publication_count: 19
  previous_employer: Evolve Credit AI (2019-2022)
  research_focus: primary=machine learning, secondary=payroll lending

Entity: researcher/tobias_gruner
  affiliation: TU Braunschweig
  publication_count: 48
  previous_employer: Volkswagen AI (2016-2019)
  research_focus: primary=autonomous driving, secondary=intersection handling

Entity: researcher/amara_traore_2
  affiliation: Universite de Ouagadougou
  publication_count: 14
  previous_employer: Sama AI (2019-2022)
  research_focus: primary=machine learning, secondary=data annotation quality

Entity: researcher/yasuhiro_kobayashi
  affiliation: Ehime University CS
  publication_count: 59
  previous_employer: Shikoku Electric AI (2015-2018)
  research_focus: primary=time series forecasting, secondary=regional grid management

Entity: researcher/oluwakemi_odunsi
  affiliation: Olabisi Onabanjo University CS
  publication_count: 22
  previous_employer: TechAdvance AI (2019-2022)
  research_focus: primary=machine learning, secondary=POS terminal analytics

Entity: researcher/miroslav_kopecky
  affiliation: University of West Bohemia
  publication_count: 42
  previous_employer: Doosan Skoda AI (2016-2019)
  research_focus: primary=computer vision, secondary=turbine blade inspection

Entity: researcher/yuki_hayashi
  affiliation: Yokohama National University CS
  publication_count: 67
  previous_employer: Nissan AI (2014-2017)
  research_focus: primary=autonomous driving, secondary=parking automation

Entity: researcher/adaeze_nwobi
  affiliation: University of Nigeria Enugu Campus
  publication_count: 18
  previous_employer: Opigo AI (2019-2022)
  research_focus: primary=machine learning, secondary=cooperative finance

Entity: researcher/henrik_osterberg
  affiliation: University of Gothenburg CS
  publication_count: 51
  previous_employer: Volvo Cars AI (2015-2018)
  research_focus: primary=reinforcement learning, secondary=energy management in EVs

Entity: researcher/feng_li_2
  affiliation: Sun Yat-sen University
  publication_count: 80
  previous_employer: WeBank AI (2014-2017)
  research_focus: primary=federated learning, secondary=financial privacy preservation

Entity: researcher/oluwatunde_fashola
  affiliation: University of Ilorin CS
  publication_count: 23
  previous_employer: Spleet AI (2019-2022)
  research_focus: primary=machine learning, secondary=rental market ML

Entity: researcher/radim_vesely
  affiliation: Brno University of Technology
  publication_count: 40
  previous_employer: Y Soft AI (2017-2020)
  research_focus: primary=computer vision, secondary=document scanner intelligence

Entity: researcher/park_sun_young
  affiliation: Sogang University CS
  publication_count: 63
  previous_employer: Lotte AI (2015-2018)
  research_focus: primary=recommender systems, secondary=Korean retail

Entity: researcher/chiamaka_eze_2
  affiliation: University of Nigeria CS
  publication_count: 20
  previous_employer: Pagatech AI (2019-2022)
  research_focus: primary=machine learning, secondary=agent network intelligence

Entity: researcher/milo_cernik
  affiliation: Silesian University in Opava
  publication_count: 36
  previous_employer: Komerci Banka AI (2016-2019)
  research_focus: primary=machine learning, secondary=Czech mortgage risk

Entity: researcher/sosuke_ito
  affiliation: Kumamoto University CS
  publication_count: 54
  previous_employer: Honda AI (2015-2018)
  research_focus: primary=reinforcement learning, secondary=motorcycle dynamics

Entity: researcher/adaeze_onwuasoanya
  affiliation: Imo State University CS
  publication_count: 16
  previous_employer: OnePipe AI (2019-2022)
  research_focus: primary=machine learning, secondary=banking-as-a-service

Entity: researcher/frederike_braun
  affiliation: Georg August University Gottingen
  publication_count: 49
  previous_employer: Sartorius AI (2016-2019)
  research_focus: primary=machine learning, secondary=bioprocess optimization

Entity: researcher/lee_jae_hyun
  affiliation: Inha University CS
  publication_count: 61
  previous_employer: Hyundai Motor AI (2015-2018)
  research_focus: primary=computer vision, secondary=weld quality inspection

Entity: researcher/oluwafemi_olawoye
  affiliation: Kwara State University CS
  publication_count: 22
  previous_employer: Trove AI (2019-2022)
  research_focus: primary=machine learning, secondary=African investment platforms

Entity: researcher/jan_blazek
  affiliation: Mendel University in Brno
  publication_count: 39
  previous_employer: CzechInvest AI (2017-2020)
  research_focus: primary=machine learning, secondary=foreign direct investment analytics

Entity: researcher/eri_kobayashi
  affiliation: Ochanomizu University CS
  publication_count: 56
  previous_employer: Rakuten AI (2015-2018)
  research_focus: primary=multimodal learning, secondary=product search

Entity: researcher/odinaka_nwosu
  affiliation: University of Nigeria Nsukka
  publication_count: 19
  previous_employer: Opay AI (2019-2022)
  research_focus: primary=machine learning, secondary=digital wallet analytics

Entity: researcher/signe_karlsson
  affiliation: University of Lund CS
  publication_count: 47
  previous_employer: H and M AI (2016-2019)
  research_focus: primary=recommender systems, secondary=fashion demand

Entity: researcher/femi_olawale
  affiliation: Osun State University CS
  publication_count: 21
  previous_employer: CredPal AI (2019-2022)
  research_focus: primary=machine learning, secondary=lifestyle credit

Entity: researcher/stefan_krajcik
  affiliation: Comenius University CS
  publication_count: 44
  previous_employer: Sygic AI (2017-2020)
  research_focus: primary=reinforcement learning, secondary=navigation optimization

Entity: researcher/zhao_lei
  affiliation: Wuhan University CS
  publication_count: 78
  previous_employer: Huawei Noah Ark Lab (2014-2017)
  research_focus: primary=efficient deep learning, secondary=on-device AI

Entity: researcher/oluwatomiwa_adesanya
  affiliation: Mountain Top University CS
  publication_count: 20
  previous_employer: Sudo Africa AI (2019-2022)
  research_focus: primary=machine learning, secondary=card infrastructure

Entity: researcher/radovan_kuchta
  affiliation: Faculty of Electrical Engineering Prague
  publication_count: 41
  previous_employer: Seznam.cz AI (2016-2019)
  research_focus: primary=information retrieval, secondary=Czech web search

Entity: researcher/yuichi_okada
  affiliation: Kyoto Sangyo University
  publication_count: 64
  previous_employer: Shimadzu AI (2014-2017)
  research_focus: primary=machine learning, secondary=scientific instrument analytics

Entity: researcher/chiamaka_ogu
  affiliation: Cross River State University CS
  publication_count: 18
  previous_employer: Bloc AI (2019-2022)
  research_focus: primary=machine learning, secondary=developer-first banking

Entity: researcher/simon_bergqvist
  affiliation: Malmo University CS
  publication_count: 52
  previous_employer: Axis AI (2016-2019)
  research_focus: primary=computer vision, secondary=surveillance analytics

Entity: researcher/adaeze_nzelu
  affiliation: University of Nigeria CS
  publication_count: 20
  previous_employer: Paylater AI (2019-2022)
  research_focus: primary=machine learning, secondary=digital consumer lending

Entity: researcher/petra_dvorakova
  affiliation: Czech University of Technology
  publication_count: 38
  previous_employer: Productboard AI (2017-2020)
  research_focus: primary=natural language processing, secondary=product feedback analysis

Entity: researcher/jun_woo_park
  affiliation: DGIST CS
  publication_count: 68
  previous_employer: Daewoo Shipbuilding AI (2015-2018)
  research_focus: primary=computer vision, secondary=shipbuilding inspection

Entity: researcher/oluwatobiloba_adesanya
  affiliation: Federal University of Agriculture Makurdi
  publication_count: 21
  previous_employer: Agrocenta AI (2019-2022)
  research_focus: primary=machine learning, secondary=smallholder farmer analytics

Entity: researcher/martin_pospichal
  affiliation: University of Pardubice
  publication_count: 43
  previous_employer: Foxconn AI (2016-2019)
  research_focus: primary=computer vision, secondary=electronics manufacturing

Entity: researcher/amara_kone
  affiliation: Universite Peleforo Gon Coulibaly
  publication_count: 15
  previous_employer: Coris Bank AI (2019-2022)
  research_focus: primary=machine learning, secondary=Ivorian banking

Entity: researcher/hiroaki_fujita
  affiliation: Tohoku University CS
  publication_count: 70
  previous_employer: Tohoku Electric AI (2014-2017)
  research_focus: primary=time series forecasting, secondary=smart grid balancing

Entity: researcher/oluwafunmbi_oyewole
  affiliation: Ogun State University CS
  publication_count: 22
  previous_employer: Raenest AI (2019-2022)
  research_focus: primary=machine learning, secondary=global payroll

Entity: researcher/lukas_hruby
  affiliation: Czech Technical University Prague
  publication_count: 46
  previous_employer: O2 Czech Republic AI (2017-2020)
  research_focus: primary=natural language processing, secondary=telecom customer service

Entity: researcher/so_hyun_kim
  affiliation: Ulsan University CS
  publication_count: 58
  previous_employer: SK Innovation AI (2015-2018)
  research_focus: primary=time series forecasting, secondary=battery lifecycle prediction

Entity: researcher/oluwatimilehin_adenola
  affiliation: Osun State University CS
  publication_count: 19
  previous_employer: Nomba AI (2019-2022)
  research_focus: primary=machine learning, secondary=merchant POS analytics

Entity: researcher/zuzana_bartosova
  affiliation: University of Economics Prague
  publication_count: 40
  previous_employer: Home Credit AI (2016-2019)
  research_focus: primary=machine learning, secondary=consumer credit scoring

Entity: researcher/makoto_shimizu
  affiliation: Yokohama City University
  publication_count: 61
  previous_employer: Asahi AI (2014-2017)
  research_focus: primary=computer vision, secondary=beverage quality inspection

Entity: researcher/adaeze_nwachukwu_2
  affiliation: University of Nigeria CS
  publication_count: 17
  previous_employer: eBanqo AI (2019-2022)
  research_focus: primary=machine learning, secondary=conversational banking

Entity: researcher/frantisek_havelka
  affiliation: Tomas Bata University
  publication_count: 39
  previous_employer: Bata AI (2016-2019)
  research_focus: primary=computer vision, secondary=footwear defect detection

Entity: researcher/young_soo_kim
  affiliation: Hanyang University CS
  publication_count: 72
  previous_employer: Samsung Research (2014-2017)
  research_focus: primary=multi-task learning, secondary=mobile device intelligence

Entity: researcher/oluwatomiwa_akinola
  affiliation: Redeemers University CS
  publication_count: 23
  previous_employer: Maplerad AI (2019-2022)
  research_focus: primary=machine learning, secondary=fintech infrastructure

Entity: researcher/petra_janeckova
  affiliation: University of Liberec
  publication_count: 37
  previous_employer: Magna International AI (2016-2019)
  research_focus: primary=computer vision, secondary=auto parts quality

Entity: researcher/ryo_matsumoto
  affiliation: Osaka City University CS
  publication_count: 63
  previous_employer: Sumitomo Electric AI (2014-2017)
  research_focus: primary=machine learning, secondary=optical fiber analytics

Entity: researcher/chukwuebuka_okafor
  affiliation: Imo State University CS
  publication_count: 18
  previous_employer: Bankly AI (2019-2022)
  research_focus: primary=machine learning, secondary=agent banking expansion

Entity: researcher/stepan_urban
  affiliation: University of South Bohemia CS
  publication_count: 44
  previous_employer: EG.D AI (2017-2020)
  research_focus: primary=time series forecasting, secondary=electricity distribution

Entity: researcher/min_ji_yoon
  affiliation: Ewha Womans University CS
  publication_count: 65
  previous_employer: Krafton AI (2015-2018)
  research_focus: primary=generative models, secondary=game character design

Entity: researcher/oluwakemi_adeyemi_2
  affiliation: Lagos State University CS
  publication_count: 21
  previous_employer: Woven Finance AI (2019-2022)
  research_focus: primary=machine learning, secondary=digital savings

Entity: researcher/jan_cech
  affiliation: Czech Technical University
  publication_count: 47
  previous_employer: Kentico AI (2016-2019)
  research_focus: primary=computer vision, secondary=web content analysis

Entity: researcher/haruka_mori
  affiliation: Kansai University CS
  publication_count: 59
  previous_employer: Panasonic AI (2015-2018)
  research_focus: primary=multi-task learning, secondary=factory automation

Entity: researcher/chukwuma_okoye
  affiliation: Nnamdi Azikiwe University CS
  publication_count: 20
  previous_employer: EasyBuy AI (2019-2022)
  research_focus: primary=machine learning, secondary=device financing

Entity: researcher/filip_sedlak
  affiliation: Slovak University of Technology
  publication_count: 41
  previous_employer: Eset AI (2016-2019)
  research_focus: primary=cybersecurity, secondary=phishing detection

Entity: researcher/jaeho_lee
  affiliation: GIST CS
  publication_count: 66
  previous_employer: Hyundai AI (2015-2018)
  research_focus: primary=computer vision, secondary=vehicle damage assessment

Entity: researcher/oluwateniola_adeyemo
  affiliation: Covenant University CS
  publication_count: 22
  previous_employer: Kippa AI (2019-2022)
  research_focus: primary=machine learning, secondary=African SME analytics

Entity: researcher/lukas_prikryl
  affiliation: Brno University
  publication_count: 44
  previous_employer: GoodData AI (2017-2020)
  research_focus: primary=machine learning, secondary=business intelligence

Entity: researcher/rin_yamamoto
  affiliation: Osaka Prefecture University CS
  publication_count: 55
  previous_employer: Daikin AI (2015-2018)
  research_focus: primary=time series forecasting, secondary=HVAC performance

Entity: researcher/oluwafemi_adewale
  affiliation: Caleb University CS
  publication_count: 19
  previous_employer: PaddyCover AI (2019-2022)
  research_focus: primary=machine learning, secondary=agricultural insurance

Entity: researcher/martin_hosek
  affiliation: Charles University Prague
  publication_count: 40
  previous_employer: Skolicka AI (2016-2019)
  research_focus: primary=natural language processing, secondary=educational Czech NLP

Entity: researcher/tae_young_kim
  affiliation: Kwangwoon University CS
  publication_count: 63
  previous_employer: Hyundai Mobis AI (2015-2018)
  research_focus: primary=reinforcement learning, secondary=vehicle control

Entity: researcher/adaeze_nwogu
  affiliation: Imo State University CS
  publication_count: 17
  previous_employer: Clane AI (2019-2022)
  research_focus: primary=machine learning, secondary=savings management

Entity: researcher/natasa_jovanovic
  affiliation: University of Novi Sad CS
  publication_count: 43
  previous_employer: Nordeus AI (2017-2020)
  research_focus: primary=reinforcement learning, secondary=social game AI

Entity: researcher/kaho_tanaka
  affiliation: Kyoto Institute of Technology
  publication_count: 61
  previous_employer: Kyocera AI (2014-2017)
  research_focus: primary=computer vision, secondary=ceramic quality control

Entity: researcher/oluwaseun_olawale
  affiliation: Osun State University CS
  publication_count: 21
  previous_employer: TeamApt AI (2019-2022)
  research_focus: primary=machine learning, secondary=financial inclusion Nigeria

Entity: researcher/jiri_blazek
  affiliation: Mendel University
  publication_count: 38
  previous_employer: Penam AI (2017-2020)
  research_focus: primary=machine learning, secondary=bakery operations

Entity: researcher/ayako_sato
  affiliation: Tokyo Metropolitan University CS
  publication_count: 58
  previous_employer: Shiseido AI (2015-2018)
  research_focus: primary=computer vision, secondary=beauty product analytics

Entity: researcher/seun_ogundimu
  affiliation: Babcock University CS
  publication_count: 20
  previous_employer: Earnipay AI (2019-2022)
  research_focus: primary=machine learning, secondary=earned wage access

Entity: researcher/ondrej_kucera
  affiliation: University of Economics and Business Prague
  publication_count: 42
  previous_employer: Zonky AI (2016-2019)
  research_focus: primary=machine learning, secondary=peer-to-peer lending

Entity: researcher/min_kyung_lee
  affiliation: KAIST
  publication_count: 67
  previous_employer: Naver AI (2015-2018)
  research_focus: primary=natural language processing, secondary=Korean semantic search

Entity: researcher/oluwafunmi_ajayi
  affiliation: Kwara State University CS
  publication_count: 22
  previous_employer: Bumpa AI (2019-2022)
  research_focus: primary=machine learning, secondary=social commerce

Entity: researcher/vilem_vrabec
  affiliation: University of Hradec Kralove
  publication_count: 39
  previous_employer: Liftago AI (2016-2019)
  research_focus: primary=reinforcement learning, secondary=ride-hailing matching

Entity: researcher/akemi_nakayama
  affiliation: Kyushu Institute of Technology
  publication_count: 57
  previous_employer: Yaskawa AI (2014-2017)
  research_focus: primary=reinforcement learning, secondary=industrial robot programming

Entity: researcher/blessing_emeka
  affiliation: University of Lagos CS
  publication_count: 19
  previous_employer: Fliqpay AI (2019-2022)
  research_focus: primary=machine learning, secondary=FX conversion

Entity: researcher/radek_marek
  affiliation: Palacky University CS
  publication_count: 44
  previous_employer: Auto ESA AI (2017-2020)
  research_focus: primary=machine learning, secondary=automotive insurance

Entity: researcher/jae_eun_park
  affiliation: Korea University CS
  publication_count: 70
  previous_employer: Kakao AI (2015-2018)
  research_focus: primary=multimodal learning, secondary=Korean vision-language

Entity: researcher/oluwabukola_adesola
  affiliation: Ekiti State University CS
  publication_count: 20
  previous_employer: Indicina AI (2019-2022)
  research_focus: primary=machine learning, secondary=open banking scoring

Entity: researcher/martin_vlcek
  affiliation: Technical University of Liberec
  publication_count: 41
  previous_employer: Skoda Auto AI (2016-2019)
  research_focus: primary=computer vision, secondary=vehicle assembly inspection

Entity: researcher/miyu_yoshida
  affiliation: Yamanashi University CS
  publication_count: 54
  previous_employer: Fuji Xerox AI (2015-2018)
  research_focus: primary=document understanding, secondary=forms extraction

Entity: researcher/adaeze_onwuegbu
  affiliation: University of Nigeria CS
  publication_count: 18
  previous_employer: GetEquity AI (2019-2022)
  research_focus: primary=machine learning, secondary=African startup equity

Entity: researcher/lubomir_havelka
  affiliation: University of Pardubice CS
  publication_count: 40
  previous_employer: Zentiva AI (2016-2019)
  research_focus: primary=machine learning, secondary=pharmaceutical analytics

Entity: researcher/seo_yeon_park
  affiliation: Sogang University CS
  publication_count: 64
  previous_employer: Coupang AI (2015-2018)
  research_focus: primary=graph neural networks, secondary=supply chain optimization

Entity: researcher/chidinma_amuzie
  affiliation: Abia State University CS
  publication_count: 21
  previous_employer: EasySend AI (2019-2022)
  research_focus: primary=machine learning, secondary=remittance analytics

Entity: researcher/robert_kopriva
  affiliation: Masaryk University
  publication_count: 46
  previous_employer: Kiwi.com AI (2018-2021)
  research_focus: primary=combinatorial optimization, secondary=multi-city travel planning

Entity: researcher/tomoki_hashimoto
  affiliation: Osaka University CS
  publication_count: 68
  previous_employer: Panasonic AI (2014-2017)
  research_focus: primary=speech recognition, secondary=noise-robust ASR

Entity: researcher/oluwatobiloba_adeyemi
  affiliation: Redeemers University CS
  publication_count: 22
  previous_employer: Paylater AI (2019-2022)
  research_focus: primary=machine learning, secondary=instant credit scoring

Entity: researcher/ivan_cervenka
  affiliation: Czech University of Agriculture
  publication_count: 38
  previous_employer: AgriProtein AI (2016-2019)
  research_focus: primary=machine learning, secondary=insect farming optimization

Entity: researcher/yuna_lee_2
  affiliation: Hanyang University CS
  publication_count: 57
  previous_employer: Krafton AI (2015-2018)
  research_focus: primary=generative models, secondary=narrative generation

Entity: researcher/ifeoma_obi
  affiliation: University of Nigeria CS
  publication_count: 19
  previous_employer: Stears AI (2019-2022)
  research_focus: primary=machine learning, secondary=African economic data

Entity: researcher/jan_sedlacek
  affiliation: CTU Prague
  publication_count: 43
  previous_employer: Oracle AI (2017-2020)
  research_focus: primary=machine learning, secondary=database query optimization

Entity: researcher/nao_yamamoto
  affiliation: Sophia University CS
  publication_count: 60
  previous_employer: Kao AI (2014-2017)
  research_focus: primary=computer vision, secondary=cosmetic packaging inspection

Entity: researcher/adaeze_nwachukwu_3
  affiliation: Federal University of Technology Owerri
  publication_count: 17
  previous_employer: TeamApt AI (2019-2022)
  research_focus: primary=machine learning, secondary=switching cost modeling

Entity: researcher/radoslav_kopecny
  affiliation: University of Olomouc CS
  publication_count: 39
  previous_employer: Comap AI (2016-2019)
  research_focus: primary=time series forecasting, secondary=heating system control

Entity: researcher/sung_jin_lee
  affiliation: UNIST CS
  publication_count: 74
  previous_employer: SK Telecom AI (2014-2017)
  research_focus: primary=reinforcement learning, secondary=network resource allocation

Entity: researcher/oluwakemi_adeleye
  affiliation: Caleb University CS
  publication_count: 21
  previous_employer: Brass AI (2019-2022)
  research_focus: primary=machine learning, secondary=corporate treasury analytics

Entity: researcher/lubomir_hajek
  affiliation: University of Ostrava
  publication_count: 42
  previous_employer: ČEZ AI (2016-2019)
  research_focus: primary=time series forecasting, secondary=nuclear plant monitoring

Entity: researcher/rei_matsuda
  affiliation: Meiji University CS
  publication_count: 55
  previous_employer: Meiji Dairies AI (2015-2018)
  research_focus: primary=computer vision, secondary=food safety inspection

Entity: researcher/chukwudi_anyanwu
  affiliation: Federal University of Technology Akure
  publication_count: 19
  previous_employer: Vendease AI (2019-2022)
  research_focus: primary=machine learning, secondary=food supply chain

Entity: researcher/ondrej_jelinek
  affiliation: Brno University of Technology
  publication_count: 41
  previous_employer: FlowMon AI (2017-2020)
  research_focus: primary=cybersecurity, secondary=network flow analysis

Entity: researcher/yuki_watanabe
  affiliation: Tokyo University of Science
  publication_count: 63
  previous_employer: Shimizu AI (2015-2018)
  research_focus: primary=computer vision, secondary=construction site monitoring

Entity: researcher/oluwatobiloba_olawale
  affiliation: Kwara State University CS
  publication_count: 22
  previous_employer: FairMoney AI (2019-2022)
  research_focus: primary=machine learning, secondary=payroll analytics

Entity: researcher/lukas_bartak
  affiliation: Czech Technical University Prague
  publication_count: 48
  previous_employer: Deutsche Telekom AI (2016-2019)
  research_focus: primary=natural language processing, secondary=multilingual customer support

Entity: researcher/mika_tanaka
  affiliation: Ritsumeikan University CS
  publication_count: 56
  previous_employer: Nintendo AI (2014-2017)
  research_focus: primary=reinforcement learning, secondary=game level generation

Entity: researcher/oluwasegun_adesina
  affiliation: Federal University of Oye-Ekiti
  publication_count: 20
  previous_employer: GetSocial AI (2019-2022)
  research_focus: primary=machine learning, secondary=social media virality prediction

Entity: researcher/martin_stransky
  affiliation: University of West Bohemia CS
  publication_count: 43
  previous_employer: Plzen Power AI (2016-2019)
  research_focus: primary=time series forecasting, secondary=industrial energy

Entity: researcher/haruna_sato
  affiliation: Niigata University CS
  publication_count: 61
  previous_employer: Niigata Steel AI (2014-2017)
  research_focus: primary=computer vision, secondary=alloy defect detection

Entity: researcher/oluwakemi_adebiyi
  affiliation: Babcock University CS
  publication_count: 21
  previous_employer: Payday AI (2019-2022)
  research_focus: primary=machine learning, secondary=earned income analytics

Entity: researcher/david_pokorny
  affiliation: University of Bohemia CS
  publication_count: 40
  previous_employer: Accenture AI (2017-2020)
  research_focus: primary=natural language processing, secondary=Czech business NLP

Entity: researcher/yuka_fujiwara
  affiliation: Konan University CS
  publication_count: 57
  previous_employer: Kobe Biomedical AI (2015-2018)
  research_focus: primary=computational biology, secondary=drug interaction prediction

Entity: researcher/oluwatomiwa_olatunji
  affiliation: Ekiti State University CS
  publication_count: 23
  previous_employer: Cleva AI (2019-2022)
  research_focus: primary=machine learning, secondary=African banking infrastructure

Entity: researcher/jan_kukucka
  affiliation: Slovak University of Technology
  publication_count: 45
  previous_employer: Moneta Money Bank AI (2017-2020)
  research_focus: primary=machine learning, secondary=Slovak retail banking

Entity: researcher/adaeze_obi
  affiliation: University of Nigeria CS
  publication_count: 31
  previous_employer: Zenith Bank AI (2019-2022)
  research_focus: primary=machine learning, secondary=credit risk Nigeria

Entity: researcher/rasmus_pedersen
  affiliation: Roskilde University CS
  publication_count: 46
  previous_employer: Vestas AI (2017-2020)
  research_focus: primary=time series forecasting, secondary=wind farm optimization

Entity: researcher/florencia_benitez
  affiliation: Universidad de Chile
  publication_count: 27
  previous_employer: Banco Estado AI (2020-2023)
  research_focus: primary=natural language processing, secondary=Chilean Spanish NLP

Entity: researcher/viktor_nikitin
  affiliation: Novosibirsk State University CS
  publication_count: 53
  previous_employer: Siberian Coal AI (2016-2019)
  research_focus: primary=reinforcement learning, secondary=mine logistics

Entity: researcher/priscilla_asante
  affiliation: Kwame Nkrumah University CS
  publication_count: 38
  previous_employer: AngloGold AI (2018-2021)
  research_focus: primary=computer vision, secondary=gold ore grading

Entity: researcher/thibault_moreau
  affiliation: Université de Toulouse
  publication_count: 42
  previous_employer: Airbus AI (2017-2020)
  research_focus: primary=machine learning, secondary=avionics fault detection

Entity: researcher/sung_jin_park
  affiliation: Yonsei University CS
  publication_count: 57
  previous_employer: Samsung SDS AI (2015-2018)
  research_focus: primary=deep learning, secondary=enterprise IT automation

Entity: researcher/amina_diallo
  affiliation: Université Cheikh Anta Diop
  publication_count: 29
  previous_employer: Orange Senegal AI (2019-2022)
  research_focus: primary=natural language processing, secondary=Wolof language AI

Entity: researcher/ondrej_blaha
  affiliation: Masaryk University CS
  publication_count: 44
  previous_employer: Red Hat AI (2017-2020)
  research_focus: primary=machine learning, secondary=open source security

Entity: researcher/gabriela_ruiz
  affiliation: Universidad Autónoma de México
  publication_count: 36
  previous_employer: BBVA Mexico AI (2018-2021)
  research_focus: primary=natural language processing, secondary=financial Spanish NLP

Entity: researcher/tobias_engel
  affiliation: Universität Freiburg
  publication_count: 61
  previous_employer: Bosch AI (2014-2017)
  research_focus: primary=computer vision, secondary=automotive sensor fusion

Entity: researcher/nkechi_eze
  affiliation: Enugu State University CS
  publication_count: 23
  previous_employer: NNPC Digital (2020-2023)
  research_focus: primary=machine learning, secondary=oil pipeline monitoring

Entity: researcher/vladislav_novak
  affiliation: Charles University Prague
  publication_count: 50
  previous_employer: Skoda AI (2016-2019)
  research_focus: primary=reinforcement learning, secondary=automotive manufacturing

Entity: researcher/himari_tanaka
  affiliation: Kyushu University CS
  publication_count: 34
  previous_employer: Mitsubishi Electric AI (2018-2021)
  research_focus: primary=deep learning, secondary=factory quality control

Entity: researcher/fatou_ndiaye
  affiliation: Université Gaston Berger
  publication_count: 26
  previous_employer: Wave Mobile AI (2020-2023)
  research_focus: primary=machine learning, secondary=mobile payment fraud

Entity: researcher/bjorn_halvorsen
  affiliation: Norwegian University of Science CS
  publication_count: 48
  previous_employer: Equinor AI (2017-2020)
  research_focus: primary=time series forecasting, secondary=subsea pipeline monitoring

Entity: researcher/celeste_romano
  affiliation: Sapienza University Rome
  publication_count: 40
  previous_employer: Leonardo AI (2017-2020)
  research_focus: primary=computer vision, secondary=defence surveillance

Entity: researcher/kweku_mensah
  affiliation: University of Cape Coast CS
  publication_count: 31
  previous_employer: Fidelity Bank AI (2019-2022)
  research_focus: primary=machine learning, secondary=rural credit scoring

Entity: researcher/mikhail_volkov
  affiliation: Higher School of Economics Moscow
  publication_count: 55
  previous_employer: Tinkoff AI (2015-2018)
  research_focus: primary=deep learning, secondary=digital banking UX

Entity: researcher/aiko_fujimoto
  affiliation: Osaka University CS
  publication_count: 37
  previous_employer: Panasonic AI (2018-2021)
  research_focus: primary=computer vision, secondary=smart home devices

Entity: researcher/petra_vokurka
  affiliation: Brno University of Technology
  publication_count: 46
  previous_employer: Honeywell AI (2017-2020)
  research_focus: primary=time series forecasting, secondary=building energy systems

Entity: researcher/mariana_santos
  affiliation: Universidade Federal de Pernambuco
  publication_count: 39
  previous_employer: Porto Seguro AI (2018-2021)
  research_focus: primary=machine learning, secondary=insurance fraud Brazil

Entity: researcher/sven_lindqvist
  affiliation: Uppsala University CS
  publication_count: 52
  previous_employer: Spotify AI (2015-2018)
  research_focus: primary=deep learning, secondary=music recommendation

Entity: researcher/chiamaka_nwosu
  affiliation: University of Calabar CS
  publication_count: 28
  previous_employer: Access Bank AI (2019-2022)
  research_focus: primary=natural language processing, secondary=Igbo language processing

Entity: researcher/luca_ferrari
  affiliation: Politecnico di Torino
  publication_count: 44
  previous_employer: Fiat AI (2017-2020)
  research_focus: primary=computer vision, secondary=vehicle defect detection

Entity: researcher/yuki_matsuda
  affiliation: Hokkaido University CS
  publication_count: 33
  previous_employer: Sapporo Breweries AI (2018-2021)
  research_focus: primary=machine learning, secondary=quality control beverages

Entity: researcher/adwoa_boateng
  affiliation: University of Education Winneba
  publication_count: 25
  previous_employer: Vodafone Ghana AI (2020-2023)
  research_focus: primary=machine learning, secondary=rural connectivity ML

Entity: researcher/ivan_marchetti
  affiliation: University of Bologna
  publication_count: 57
  previous_employer: Ducati AI (2014-2017)
  research_focus: primary=reinforcement learning, secondary=motorsport telemetry

Entity: researcher/kenji_hayashi
  affiliation: Nagoya University CS
  publication_count: 41
  previous_employer: Toyota Motor AI (2016-2019)
  research_focus: primary=deep learning, secondary=autonomous vehicle perception

Entity: researcher/nnenna_okafor
  affiliation: Federal University of Technology Owerri
  publication_count: 30
  previous_employer: Nigerian Breweries AI (2019-2022)
  research_focus: primary=machine learning, secondary=FMCG demand forecasting

Entity: researcher/dagmar_kral
  affiliation: Czech Technical University Prague
  publication_count: 48
  previous_employer: OKD Mining AI (2016-2019)
  research_focus: primary=time series forecasting, secondary=coal extraction safety

Entity: researcher/beatriz_almeida
  affiliation: Universidade de Brasília
  publication_count: 35
  previous_employer: Embraer AI (2018-2021)
  research_focus: primary=machine learning, secondary=aircraft maintenance prediction

Entity: researcher/haruto_yamamoto
  affiliation: Tohoku University CS
  publication_count: 64
  previous_employer: NEC AI (2013-2016)
  research_focus: primary=deep learning, secondary=disaster response systems

Entity: researcher/abena_amponsah
  affiliation: Ashesi University CS
  publication_count: 27
  previous_employer: GCB Bank AI (2020-2023)
  research_focus: primary=machine learning, secondary=agricultural lending Ghana

Entity: researcher/stanislav_horak
  affiliation: Palacky University Olomouc
  publication_count: 43
  previous_employer: Tesco Central Europe AI (2017-2020)
  research_focus: primary=natural language processing, secondary=Czech retail NLP

Entity: researcher/ingrid_sorensen
  affiliation: University of Bergen CS
  publication_count: 51
  previous_employer: BKK Power AI (2016-2019)
  research_focus: primary=time series forecasting, secondary=hydroelectric generation

Entity: researcher/emeka_okwu
  affiliation: University of Lagos CS
  publication_count: 32
  previous_employer: Ecobank AI (2019-2022)
  research_focus: primary=machine learning, secondary=pan-African banking AI

Entity: researcher/fumiko_hayashi
  affiliation: Waseda University CS
  publication_count: 46
  previous_employer: Recruit AI (2017-2020)
  research_focus: primary=natural language processing, secondary=Japanese job matching

Entity: researcher/rodrigo_vargas
  affiliation: Pontificia Universidad Católica Chile
  publication_count: 38
  previous_employer: Codelco AI (2018-2021)
  research_focus: primary=machine learning, secondary=copper mine optimization

Entity: researcher/jana_dvorakova
  affiliation: Czech University of Life Sciences
  publication_count: 29
  previous_employer: AgriCzech AI (2020-2023)
  research_focus: primary=machine learning, secondary=crop yield prediction Czech

Entity: researcher/hiroshi_kimura
  affiliation: University of Tokyo CS
  publication_count: 72
  previous_employer: Fujitsu AI (2012-2015)
  research_focus: primary=deep learning, secondary=large-scale distributed systems

Entity: researcher/siobhan_oconnor
  affiliation: University College Cork CS
  publication_count: 40
  previous_employer: Kerry Group AI (2017-2020)
  research_focus: primary=machine learning, secondary=food ingredients optimization

Entity: researcher/ekundayo_adeleke
  affiliation: University of Ilorin CS
  publication_count: 24
  previous_employer: Stanbic IBTC AI (2020-2023)
  research_focus: primary=machine learning, secondary=pension fund management ML

Entity: researcher/marta_wisniewska
  affiliation: Jagiellonian University CS
  publication_count: 44
  previous_employer: PKN Orlen AI (2017-2020)
  research_focus: primary=time series forecasting, secondary=fuel demand Poland

Entity: researcher/atsushi_nakagawa
  affiliation: Keio University CS
  publication_count: 55
  previous_employer: Dentsu AI (2015-2018)
  research_focus: primary=deep learning, secondary=advertising audience prediction

Entity: researcher/ngozi_nwachukwu
  affiliation: Nnamdi Azikiwe University CS
  publication_count: 29
  previous_employer: First City Monument AI (2019-2022)
  research_focus: primary=natural language processing, secondary=Nigerian Pidgin NLP

Entity: researcher/lukas_schwarz
  affiliation: University of Vienna CS
  publication_count: 47
  previous_employer: Wien Energie AI (2017-2020)
  research_focus: primary=time series forecasting, secondary=district heating load

Entity: researcher/abiodun_salako
  affiliation: Obafemi Awolowo University CS
  publication_count: 33
  previous_employer: Dangote Group AI (2018-2021)
  research_focus: primary=machine learning, secondary=cement production optimization

Entity: researcher/naomi_whitfield
  affiliation: University of Auckland CS
  publication_count: 41
  previous_employer: Air New Zealand AI (2016-2019)
  research_focus: primary=machine learning, secondary=airline seat optimization

Entity: researcher/kazuki_ito
  affiliation: Tokyo Institute of Technology
  publication_count: 58
  previous_employer: Kawasaki Heavy Industries AI (2014-2017)
  research_focus: primary=reinforcement learning, secondary=industrial robot control

Entity: researcher/ifeoma_anioke
  affiliation: University of Nigeria Enugu CS
  publication_count: 26
  previous_employer: Coronation Merchant AI (2020-2023)
  research_focus: primary=machine learning, secondary=capital markets Nigeria

Entity: researcher/mikkel_christiansen
  affiliation: University of Southern Denmark
  publication_count: 45
  previous_employer: Grundfos AI (2017-2020)
  research_focus: primary=time series forecasting, secondary=pump system efficiency

Entity: researcher/liliana_gheorghe
  affiliation: University of Bucharest CS
  publication_count: 37
  previous_employer: Digi Communications AI (2018-2021)
  research_focus: primary=machine learning, secondary=telecom network optimization

Entity: researcher/takehiro_ueda
  affiliation: Kobe University CS
  publication_count: 43
  previous_employer: Kobe Steel AI (2016-2019)
  research_focus: primary=computer vision, secondary=steel plate surface inspection

Entity: researcher/hana_blazkova
  affiliation: University of Economics Prague
  publication_count: 41
  previous_employer: Ceska Sporitelna AI (2017-2020)
  research_focus: primary=machine learning, secondary=Czech retail banking AI

Entity: researcher/sebastiao_ferreira
  affiliation: Universidade do Porto
  publication_count: 50
  previous_employer: Galp Energia AI (2015-2018)
  research_focus: primary=time series forecasting, secondary=oil refinery operations

Entity: researcher/makoto_ogawa
  affiliation: Ritsumeikan University CS
  publication_count: 36
  previous_employer: Omron AI (2018-2021)
  research_focus: primary=computer vision, secondary=industrial sensor vision

Entity: researcher/artur_kowalski
  affiliation: Warsaw University of Technology
  publication_count: 53
  previous_employer: KGHM AI (2015-2018)
  research_focus: primary=machine learning, secondary=copper smelting optimization

Entity: researcher/erik_martinsson
  affiliation: Chalmers University of Technology
  publication_count: 61
  previous_employer: SKF AI (2013-2016)
  research_focus: primary=deep learning, secondary=bearing failure prediction

Entity: researcher/miroslav_blazej
  affiliation: Slovak University of Technology Trnava
  publication_count: 42
  previous_employer: Slovak Telekom AI (2017-2020)
  research_focus: primary=natural language processing, secondary=Slovak language models

Entity: researcher/naoko_shimizu
  affiliation: Sophia University CS
  publication_count: 35
  previous_employer: Shiseido AI (2018-2021)
  research_focus: primary=computer vision, secondary=cosmetic product analysis

Entity: researcher/babajide_adewale
  affiliation: Fountain University Osogbo CS
  publication_count: 21
  previous_employer: SunTrust Bank AI (2021-2024)
  research_focus: primary=machine learning, secondary=Islamic banking Nigeria

```
