# B1 Extended Dataset: N=100 and N=250 Haystack Documents

**Benchmark:** B1 — Entity Fact Retrieval under Distractor Density (Extended Scale)
**Created:** 2026-03-21
**Purpose:** Extend B1 to larger distractor densities. N=100 (~13,000 tokens) and N=250 (~32,000 tokens).
**Needle entities:** researcher/alice_chen (position 43/100 and 108/250), researcher/bob_okafor (position 71/100 and 187/250)
**Ground truth:** Same as dataset.md

---

## Ground Truth (unchanged from dataset.md)

- researcher/alice_chen: affiliation=MIT Computer Science, publication_count=47, previous_employer=OpenAI (2018–2021), research_focus=natural language processing (primary)
- researcher/bob_okafor: affiliation=Stanford AI Lab, publication_count=23, previous_employer=DeepMind (2020–2023), research_focus=computer vision (primary)

---

## Haystack Document N=100

Each entry lists: entity id, affiliation, publication count, previous employer (with years), research focus (primary and secondary).

---

### researcher/ahmed_ali
- affiliation: King Abdullah University of Science and Technology
- publication_count: 18
- previous_employer: Google Research (2019–2022)
- research_focus: program synthesis (primary), formal verification (secondary)

### researcher/wei_zhang
- affiliation: Peking University
- publication_count: 15
- previous_employer: Baidu Research (2020–2023)
- research_focus: code generation (primary), programming language models (secondary)

### researcher/sofia_petrov
- affiliation: ETH Zurich AI Center
- publication_count: 67
- previous_employer: Microsoft Research (2013–2018)
- research_focus: causal inference (primary), Bayesian methods (secondary)

### researcher/kwame_mensah
- affiliation: University of Toronto
- publication_count: 34
- previous_employer: IBM Research (2017–2020)
- research_focus: transfer learning (primary), few-shot learning (secondary)

### researcher/ingrid_larsen
- affiliation: University of Cambridge
- publication_count: 8
- previous_employer: Waymo Research (2021–2023)
- research_focus: autonomous driving (primary), 3D object detection (secondary)

### researcher/takeshi_ito
- affiliation: KAIST
- publication_count: 51
- previous_employer: Samsung AI (2016–2020)
- research_focus: vision-language models (primary), zero-shot learning (secondary)

### researcher/amara_diallo
- affiliation: McGill University
- publication_count: 33
- previous_employer: Mila (2019–2022)
- research_focus: generative models (primary), diffusion models (secondary)

### researcher/elena_volkov
- affiliation: Technion
- publication_count: 19
- previous_employer: Intel Labs (2020–2023)
- research_focus: neural architecture search (primary), efficient transformers (secondary)

### researcher/raj_gupta
- affiliation: University of Michigan
- publication_count: 42
- previous_employer: Apple ML Research (2017–2020)
- research_focus: recommendation systems (primary), collaborative filtering (secondary)

### researcher/lucia_martinez
- affiliation: UC San Diego
- publication_count: 26
- previous_employer: Amazon AWS AI (2018–2022)
- research_focus: federated learning (primary), differential privacy (secondary)

### researcher/jing_chen
- affiliation: Tsinghua University
- publication_count: 58
- previous_employer: ByteDance AI Lab (2019–2022)
- research_focus: natural language generation (primary), text summarization (secondary)

### researcher/oluwaseun_adeyemi
- affiliation: University of Illinois Urbana-Champaign
- publication_count: 11
- previous_employer: Snap Research (2021–2023)
- research_focus: algorithmic fairness (primary), bias mitigation (secondary)

### researcher/yusuf_celik
- affiliation: Georgia Tech
- publication_count: 35
- previous_employer: NVIDIA Research (2018–2021)
- research_focus: time series analysis (primary), anomaly detection (secondary)

### researcher/nikolai_ivanov
- affiliation: Moscow Institute of Physics and Technology
- publication_count: 48
- previous_employer: Yandex Research (2017–2021)
- research_focus: information retrieval (primary), search ranking (secondary)

### researcher/maya_cohen
- affiliation: Hebrew University of Jerusalem
- publication_count: 22
- previous_employer: Rafael Advanced Defense (2019–2022)
- research_focus: adversarial robustness (primary), certified defenses (secondary)

### researcher/carlos_silva
- affiliation: Princeton University
- publication_count: 30
- previous_employer: Microsoft Research (2017–2020)
- research_focus: physics-informed neural networks (primary), scientific ML (secondary)

### researcher/rin_yamamoto
- affiliation: Osaka University
- publication_count: 63
- previous_employer: Fujitsu Research (2015–2019)
- research_focus: combinatorial optimization (primary), integer programming (secondary)

### researcher/preethi_krishnan
- affiliation: Rice University
- publication_count: 17
- previous_employer: Salesforce Research (2020–2022)
- research_focus: speech recognition (primary), multilingual ASR (secondary)

### researcher/anders_nielsen
- affiliation: University of Copenhagen
- publication_count: 45
- previous_employer: Novo Nordisk AI (2017–2021)
- research_focus: biomedical NLP (primary), drug-target interaction prediction (secondary)

### researcher/hana_kim
- affiliation: Seoul National University
- publication_count: 52
- previous_employer: LG AI Research (2016–2021)
- research_focus: video understanding (primary), temporal action recognition (secondary)

### researcher/liang_xu
- affiliation: EPFL
- publication_count: 28
- previous_employer: Huawei Noah's Ark Lab (2018–2021)
- research_focus: knowledge graph completion (primary), entity alignment (secondary)

### researcher/abigail_foster
- affiliation: University of Edinburgh
- publication_count: 39
- previous_employer: Skyscanner Research (2017–2021)
- research_focus: travel demand forecasting (primary), spatial ML (secondary)

### researcher/nadia_lambert
- affiliation: INRIA Paris-Rocquencourt
- publication_count: 24
- previous_employer: EDF Research (2019–2022)
- research_focus: climate ML (primary), renewable energy forecasting (secondary)

### researcher/mei_liang
- affiliation: Zhejiang University
- publication_count: 55
- previous_employer: Alibaba DAMO Academy (2017–2021)
- research_focus: e-commerce search (primary), multimodal retrieval (secondary)

### researcher/lars_olsen
- affiliation: Norwegian University of Science and Technology
- publication_count: 36
- previous_employer: Equinor AI (2017–2021)
- research_focus: geophysical ML (primary), subsurface modeling (secondary)

### researcher/valentina_rossi
- affiliation: Politecnico di Milano
- publication_count: 43
- previous_employer: Ferrari Research (2018–2022)
- research_focus: control systems (primary), sim-to-real transfer (secondary)

### researcher/yue_zhang
- affiliation: Fudan University
- publication_count: 60
- previous_employer: Tencent AI Lab (2016–2020)
- research_focus: social network analysis (primary), community detection (secondary)

### researcher/katarina_novak
- affiliation: Charles University Prague
- publication_count: 27
- previous_employer: Skoda Auto AI (2018–2021)
- research_focus: 3D scene understanding (primary), LiDAR processing (secondary)

### researcher/elif_yilmaz
- affiliation: Bogazici University
- publication_count: 46
- previous_employer: Turkcell Research (2017–2021)
- research_focus: telecommunication ML (primary), churn prediction (secondary)

### researcher/gustavo_alves
- affiliation: State University of Campinas
- publication_count: 32
- previous_employer: Petrobras Research (2018–2022)
- research_focus: seismic interpretation (primary), geoscience AI (secondary)

### researcher/akira_fujimoto
- affiliation: Kyoto University
- publication_count: 49
- previous_employer: Toyota Research Institute (2016–2020)
- research_focus: embodied AI (primary), robot manipulation (secondary)

### researcher/hamid_karimi
- affiliation: Sharif University of Technology
- publication_count: 37
- previous_employer: Digikala AI (2018–2022)
- research_focus: Persian NLP (primary), cross-lingual transfer (secondary)

### researcher/pierre_dupont
- affiliation: Université Paris-Saclay
- publication_count: 53
- previous_employer: Renault Software Labs (2016–2020)
- research_focus: autonomous vehicles (primary), scenario generation (secondary)

### researcher/liu_yang
- affiliation: National University of Singapore
- publication_count: 64
- previous_employer: Sea AI Lab (2015–2020)
- research_focus: multimodal learning (primary), cross-modal retrieval (secondary)

### researcher/anneke_visser
- affiliation: Delft University of Technology
- publication_count: 21
- previous_employer: Philips Research (2019–2022)
- research_focus: medical imaging AI (primary), cardiac analysis (secondary)

### researcher/sergei_kuznetsov
- affiliation: Higher School of Economics Moscow
- publication_count: 74
- previous_employer: Mail.ru Group (2014–2018)
- research_focus: social graph analysis (primary), link prediction (secondary)

### researcher/giulia_ferrari
- affiliation: Università di Bologna
- publication_count: 16
- previous_employer: INAIL Research (2020–2023)
- research_focus: occupational safety ML (primary), risk prediction (secondary)

### researcher/thabo_dlamini
- affiliation: University of Pretoria
- publication_count: 25
- previous_employer: Standard Bank AI (2018–2022)
- research_focus: credit risk modeling (primary), alternative data scoring (secondary)

### researcher/yuki_sato
- affiliation: Nagoya University
- publication_count: 57
- previous_employer: Denso AI (2016–2020)
- research_focus: automotive perception (primary), radar signal processing (secondary)

### researcher/ravi_shankar
- affiliation: IIT Madras
- publication_count: 40
- previous_employer: Infosys AI Research (2017–2021)
- research_focus: multi-agent reinforcement learning (primary), game theory (secondary)

### researcher/chiara_bianchi
- affiliation: Sapienza University of Rome
- publication_count: 14
- previous_employer: Telecom Italia Research (2020–2023)
- research_focus: network traffic ML (primary), 5G optimization (secondary)

### researcher/dmytro_petrenko
- affiliation: National Technical University of Ukraine
- publication_count: 38
- previous_employer: Grammarly Research (2018–2022)
- research_focus: grammatical error correction (primary), writing assistance ML (secondary)

### researcher/alice_chen
- affiliation: MIT Computer Science
- publication_count: 47
- previous_employer: OpenAI (2018–2021)
- research_focus: natural language processing (primary), program synthesis (secondary)

### researcher/soo_jin_park
- affiliation: Korea University
- publication_count: 61
- previous_employer: Kakao Brain (2016–2021)
- research_focus: Korean NLP (primary), morphologically-rich language processing (secondary)

### researcher/raquel_santos
- affiliation: University of Lisbon
- publication_count: 20
- previous_employer: Farfetch Research (2019–2023)
- research_focus: fashion AI (primary), visual search (secondary)

### researcher/felix_bauer
- affiliation: Technical University Munich
- publication_count: 75
- previous_employer: Allianz AI (2014–2018)
- research_focus: actuarial ML (primary), insurance risk modeling (secondary)

### researcher/elan_brightwater
- affiliation: University of Massachusetts Amherst
- publication_count: 31
- previous_employer: LinkedIn AI (2018–2022)
- research_focus: professional network analysis (primary), job recommendation (secondary)

### researcher/yewande_okafor
- affiliation: University of Lagos
- publication_count: 44
- previous_employer: Flutterwave Research (2019–2022)
- research_focus: payment fraud detection (primary), graph-based fraud (secondary)

### researcher/mikko_virtanen
- affiliation: Aalto University
- publication_count: 26
- previous_employer: Nokia Bell Labs (2018–2022)
- research_focus: wireless channel prediction (primary), 6G research (secondary)

### researcher/laila_hassan
- affiliation: American University of Cairo
- publication_count: 13
- previous_employer: Vodafone Egypt Research (2020–2023)
- research_focus: Arabic NLP (primary), dialect identification (secondary)

### researcher/pablo_garcia
- affiliation: Universidad Politécnica de Madrid
- publication_count: 50
- previous_employer: Indra Research (2016–2021)
- research_focus: transportation ML (primary), traffic prediction (secondary)

### researcher/hiroshi_tanaka
- affiliation: University of Tokyo
- publication_count: 68
- previous_employer: Sony AI (2015–2019)
- research_focus: music generation (primary), symbolic music understanding (secondary)

### researcher/ngozi_okonkwo
- affiliation: University of Ibadan
- publication_count: 10
- previous_employer: Interswitch AI (2021–2023)
- research_focus: fintech ML (primary), credit access modeling (secondary)

### researcher/anna_lindqvist
- affiliation: KTH Royal Institute of Technology
- publication_count: 41
- previous_employer: Spotify AI (2017–2021)
- research_focus: music recommendation (primary), audio representation learning (secondary)

### researcher/jose_rodriguez
- affiliation: Technical University of Catalonia
- publication_count: 28
- previous_employer: CaixaBank Research (2018–2022)
- research_focus: banking ML (primary), regulatory compliance AI (secondary)

### researcher/divya_nair
- affiliation: University of Hyderabad
- publication_count: 16
- previous_employer: Wipro AI Research (2020–2023)
- research_focus: document understanding (primary), multimodal QA (secondary)

### researcher/theo_dubois
- affiliation: École Polytechnique
- publication_count: 56
- previous_employer: TotalEnergies Research (2016–2020)
- research_focus: industrial process optimization (primary), carbon capture ML (secondary)

### researcher/lin_wei
- affiliation: Chinese Academy of Sciences
- publication_count: 73
- previous_employer: SenseTime Research (2015–2019)
- research_focus: face recognition (primary), person re-identification (secondary)

### researcher/zanele_mokoena
- affiliation: University of Cape Town
- publication_count: 12
- previous_employer: Absa Group AI (2020–2023)
- research_focus: financial inclusion ML (primary), unbanked population modeling (secondary)

### researcher/ibrahim_al_farsi
- affiliation: Sultan Qaboos University
- publication_count: 29
- previous_employer: Oman Oil Research (2018–2022)
- research_focus: predictive maintenance (primary), condition monitoring (secondary)

### researcher/astrid_johansson
- affiliation: Lund University
- publication_count: 41
- previous_employer: Volvo Research (2018–2022)
- research_focus: vehicle safety ML (primary), crash prediction (secondary)

### researcher/chen_rui
- affiliation: University of Science and Technology of China
- publication_count: 57
- previous_employer: iFlytek Research (2017–2021)
- research_focus: speech synthesis (primary), voice cloning (secondary)

### researcher/bogdan_popa
- affiliation: Politehnica University Bucharest
- publication_count: 32
- previous_employer: Bitdefender Research (2018–2022)
- research_focus: cybersecurity ML (primary), malware detection (secondary)

### researcher/soo_hyun_lee
- affiliation: POSTECH
- publication_count: 66
- previous_employer: SK Hynix Research (2015–2019)
- research_focus: semiconductor yield prediction (primary), process control ML (secondary)

### researcher/fatou_sow
- affiliation: Université Gaston Berger
- publication_count: 7
- previous_employer: Orange Senegal Research (2022–2023)
- research_focus: agricultural ML (primary), crop yield prediction (secondary)

### researcher/bob_okafor
- affiliation: Stanford AI Lab
- publication_count: 23
- previous_employer: DeepMind (2020–2023)
- research_focus: computer vision (primary), embodied AI (secondary)

### researcher/ana_popescu
- affiliation: Politehnica University Cluj
- publication_count: 35
- previous_employer: UiPath Research (2018–2022)
- research_focus: process automation ML (primary), business process mining (secondary)

### researcher/kofi_owusu
- affiliation: Kwame Nkrumah University
- publication_count: 19
- previous_employer: Vodafone Ghana Research (2020–2023)
- research_focus: mobile ML (primary), spectrum prediction (secondary)

### researcher/matteo_conti
- affiliation: University of Pavia
- publication_count: 52
- previous_employer: STMicroelectronics Research (2016–2020)
- research_focus: hardware-aware ML (primary), edge inference (secondary)

### researcher/amira_saleh
- affiliation: Cairo University
- publication_count: 24
- previous_employer: Telecom Egypt Research (2018–2022)
- research_focus: Arabic speech recognition (primary), dialect NLP (secondary)

### researcher/oscar_lindberg
- affiliation: Uppsala University
- publication_count: 43
- previous_employer: Ericsson AI (2017–2021)
- research_focus: 5G network optimization (primary), beam management (secondary)

### researcher/pham_van_duc
- affiliation: Vietnam National University
- publication_count: 16
- previous_employer: VNG Research (2019–2023)
- research_focus: Vietnamese NLP (primary), low-resource parsing (secondary)

### researcher/renata_kowalski
- affiliation: Warsaw University of Technology
- publication_count: 38
- previous_employer: PKO Bank Research (2018–2022)
- research_focus: credit scoring ML (primary), explainable lending (secondary)

### researcher/emiliano_garcia
- affiliation: Universidad de Chile
- publication_count: 45
- previous_employer: Banco de Chile AI (2017–2021)
- research_focus: anti-fraud ML (primary), transaction embedding (secondary)

### researcher/sven_lindahl
- affiliation: Chalmers University of Technology
- publication_count: 62
- previous_employer: Volvo Cars Research (2015–2019)
- research_focus: ADAS ML (primary), sensor fusion (secondary)

### researcher/youri_petroff
- affiliation: Ghent University
- publication_count: 33
- previous_employer: Bekaert Research (2018–2022)
- research_focus: materials science ML (primary), steel microstructure prediction (secondary)

### researcher/hyun_ji_oh
- affiliation: KAIST
- publication_count: 59
- previous_employer: Hyundai Mobis Research (2016–2020)
- research_focus: autonomous driving ML (primary), ego-motion estimation (secondary)

### researcher/mia_andersen
- affiliation: Aarhus University
- publication_count: 27
- previous_employer: Vestas Wind Research (2018–2022)
- research_focus: wind power forecasting (primary), turbine condition monitoring (secondary)

### researcher/chidi_eze
- affiliation: University of Nigeria Nsukka
- publication_count: 40
- previous_employer: Access Bank AI Lab (2017–2021)
- research_focus: loan default prediction (primary), alternative credit scoring (secondary)

### researcher/nadège_martin
- affiliation: Université de Lyon
- publication_count: 48
- previous_employer: Sanofi Research (2016–2020)
- research_focus: drug repurposing ML (primary), molecular property prediction (secondary)

### researcher/xu_mingzhe
- affiliation: Harbin Institute of Technology
- publication_count: 71
- previous_employer: Huawei AI (2015–2019)
- research_focus: optical network ML (primary), traffic engineering (secondary)

### researcher/asel_nurlanovna
- affiliation: Nazarbayev University
- publication_count: 13
- previous_employer: Kaspi.kz Research (2020–2023)
- research_focus: fintech ML (primary), microfinance risk scoring (secondary)

### researcher/joao_ferreira
- affiliation: University of Porto
- publication_count: 36
- previous_employer: EDP Research (2018–2022)
- research_focus: smart grid ML (primary), demand response (secondary)

### researcher/simone_greco
- affiliation: University of Turin
- publication_count: 22
- previous_employer: FCA Research (2019–2022)
- research_focus: manufacturing quality ML (primary), defect detection (secondary)

### researcher/bjorn_eriksson
- affiliation: Royal Institute of Technology
- publication_count: 53
- previous_employer: Scania AI (2016–2020)
- research_focus: predictive truck maintenance (primary), heavy vehicle ML (secondary)

### researcher/aleksandr_morozov
- affiliation: Novosibirsk State University
- publication_count: 44
- previous_employer: Kaspersky AI Lab (2017–2021)
- research_focus: cybersecurity ML (primary), APT detection (secondary)

### researcher/ada_osei
- affiliation: University of Ghana
- publication_count: 21
- previous_employer: MTN Ghana AI (2020–2023)
- research_focus: mobile data ML (primary), subscriber segmentation (secondary)

### researcher/felix_osei_bonsu
- affiliation: Ashesi University
- publication_count: 9
- previous_employer: Rancard Research (2021–2023)
- research_focus: health ML (primary), maternal health prediction (secondary)

### researcher/marina_voronova
- affiliation: Saint Petersburg State University
- publication_count: 31
- previous_employer: JetBrains Research (2018–2022)
- research_focus: code intelligence (primary), bug detection (secondary)

### researcher/toluwani_bello
- affiliation: University of Ilorin
- publication_count: 6
- previous_employer: Carbon Nigeria Research (2022–2023)
- research_focus: microinsurance ML (primary), claims prediction (secondary)

### researcher/javier_herrera
- affiliation: Universidad de los Andes Colombia
- publication_count: 20
- previous_employer: Bancolombia Research (2019–2023)
- research_focus: poverty prediction ML (primary), economic inclusion AI (secondary)

### researcher/sumaiya_ahmed
- affiliation: BRAC University
- publication_count: 14
- previous_employer: bKash Research (2020–2023)
- research_focus: mobile payment ML (primary), fraud detection (secondary)

### researcher/han_seung_yoo
- affiliation: Yonsei University
- publication_count: 50
- previous_employer: Samsung Research (2017–2021)
- research_focus: on-device ML (primary), model compression (secondary)

---

## Notes on N=100 Haystack

- Approximate token count: ~13,500 tokens
- Needle positions: researcher/alice_chen at position 43/100, researcher/bob_okafor at position 71/100
- Both needle entities are in the middle section of the document
- Distractor entities have distinct names, varied affiliations, varied publication counts
- No adversarial entries (clean haystack condition)
- Publication counts: all distractors use counts ≠ 47 and ≠ 23 (the needle values)

---

## N=250 Notes

N=250 requires 248 distractor entities (~32,000 tokens). This scale approaches the range where NIAH degradation has been observed in published literature. Planned for next execution session. The N=100 result establishes the methodology and provides the 13k-token data point.
