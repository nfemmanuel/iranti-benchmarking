import random
random.seed(99)

affiliations = [
    'Carnegie Mellon University','Stanford University','MIT Computer Science',
    'UC Berkeley','University of Toronto','ETH Zurich','Oxford University',
    'Cambridge University','NYU Courant Institute','Princeton CS',
    'Caltech','University of Washington','Georgia Tech','Cornell Tech',
    'UT Austin','University of Michigan','Columbia University',
    'University of Edinburgh','EPFL','University of Amsterdam',
    'Tsinghua University','Peking University','Seoul National University',
    'Tokyo University','INRIA Paris','Max Planck Institute for Informatics',
    'Hebrew University','Technion','McGill University','University of Sydney',
    'Montreal Institute for Learning Algorithms','Vector Institute',
    'Allen Institute for AI','Sapienza University of Rome','TU Berlin',
    'KTH Royal Institute of Technology','University of Helsinki',
    'University of Zurich','Leiden University','University of Copenhagen',
    'National University of Singapore','Hong Kong University of Science and Technology',
    'Chinese University of Hong Kong','University of Melbourne',
    'University of British Columbia','University of Illinois Urbana-Champaign',
    'Purdue University','Virginia Tech','Boston University','Northeastern University',
]
prev_employers = [
    'Google Research (2018-2021)','Google Brain (2016-2019)','Google DeepMind (2020-2023)',
    'Microsoft Research (2017-2020)','Microsoft Research (2015-2018)',
    'OpenAI Research (2019-2022)','OpenAI (2018-2021)',
    'Meta AI Research (2020-2023)','Facebook AI Research (2017-2020)',
    'Apple ML Research (2019-2022)','Amazon AWS AI (2018-2021)',
    'NVIDIA Research (2017-2020)','IBM Research (2016-2019)',
    'Baidu Research (2018-2021)','Samsung AI Center (2019-2022)',
    'Adobe Research (2017-2020)','Salesforce Research (2018-2021)',
    'Twitter Machine Learning (2019-2022)','Uber AI Labs (2017-2020)',
    'Waymo Research (2020-2023)','Tesla AI (2019-2022)',
    'Berkeley AI Research Lab (2016-2019)','Vector Institute (2018-2021)',
    'Toyota Research Institute (2017-2020)','Bosch Center for AI (2019-2022)',
    'Huawei Noah Ark Lab (2018-2021)','Tencent AI Lab (2019-2022)',
    'Alibaba DAMO Academy (2018-2021)','ByteDance AI Lab (2020-2023)',
    'Snap Research (2018-2021)','Qualcomm AI Research (2017-2020)',
    'Intel AI Lab (2016-2019)','Two Sigma Research (2019-2022)',
    'Jane Street Research (2018-2021)','Citadel Securities Research (2017-2020)',
]
research_focuses = [
    ('natural language processing','machine translation'),
    ('computer vision','object detection'),
    ('reinforcement learning','robotics'),
    ('machine learning theory','generalization bounds'),
    ('federated learning','privacy-preserving ML'),
    ('graph neural networks','knowledge graphs'),
    ('speech recognition','spoken dialog systems'),
    ('neural architecture search','efficient deep learning'),
    ('adversarial robustness','certified defenses'),
    ('causal inference','counterfactual reasoning'),
    ('Bayesian deep learning','uncertainty quantification'),
    ('out-of-distribution generalization','domain adaptation'),
    ('interpretable ML','model explanation'),
    ('computational biology','protein structure prediction'),
    ('recommendation systems','collaborative filtering'),
    ('anomaly detection','time series analysis'),
    ('multi-task learning','transfer learning'),
    ('self-supervised learning','contrastive methods'),
    ('AI safety','value alignment'),
    ('code generation','program synthesis'),
    ('dialogue systems','conversational AI'),
    ('medical imaging','clinical decision support'),
    ('autonomous driving','sensor fusion'),
    ('multimodal learning','vision-language models'),
    ('meta-learning','few-shot learning'),
    ('information retrieval','dense retrieval'),
    ('summarization','abstractive generation'),
    ('question answering','reading comprehension'),
    ('semantic parsing','structured prediction'),
    ('commonsense reasoning','knowledge grounding'),
    ('continual learning','catastrophic forgetting'),
]
first_names=['Aaron','Aditya','Ahmad','Akira','Aleksandra','Alessandro','Alexander','Alexei',
'Alicia','Alina','Amanda','Amara','Amelia','Anders','Andrea','Andrei','Andrew','Andrzej',
'Angela','Anisha','Anna','Antoine','Arjun','Arnav','Aryan','Aseel','Ashwin','Astrid',
'Ayaan','Beatriz','Benjamin','Bianca','Boris','Brandon','Carlos','Caroline','Cassandra',
'Catherine','Celine','Charlotte','Chen','Chiara','Christian','Christoph','Clara','Claudia',
'Colin','Connor','Cyrus','Dakarai','Daniel','Danielle','Dario','David','Deepa','Delia',
'Diego','Dilnoza','Dimitri','Divya','Elena','Elias','Elizabeth','Emma','Emre','Erica',
'Erin','Ethan','Eva','Fatimah','Felix','Filip','Finn','Francesca','Francesco','Gabriel',
'Gabriela','Giulia','Grace','Hannah','Hao','Hassan','Heidi','Henrik','Hugo','Ibrahim',
'Ilaria','Ingrid','Isabel','Ivan','Jacob','Jakub','James','Jana','Jason','Javier',
'Jennifer','Jessica','Jonathan','Jorge','Josef','Julia','Julian','Julien','Kai','Karen',
'Karin','Katarzyna','Kate','Kiran','Kristina','Lars','Laura','Lauren','Lena','Leon',
'Leonardo','Liang','Lina','Lisa','Lorenzo','Lucas','Lucia','Luis','Lukas','Luna',
'Magdalena','Mahsa','Marco','Marina','Mario','Mark','Markus','Marta','Martin','Matias',
'Matteo','Mia','Mihail','Milan','Mira','Mohamed','Natalia','Natalie','Nathan','Nadia',
'Neha','Nicolas','Nikita','Nina','Noah','Nour','Olivia','Omar','Oscar','Pablo','Patrick',
'Paula','Pedro','Petra','Piotr','Rachel','Rafael','Rahul','Rajesh','Rebecca','Ricardo',
'Robert','Robin','Rosa','Ryan','Saanvi','Sabrina','Sandra','Santiago','Sara','Sarah',
'Sebastian','Shreya','Simon','Sofia','Sophia','Stefan','Stephanie','Sven','Takahiro',
'Tara','Thomas','Tim','Tobias','Tom','Valentina','Vera','Victor','Victoria','Wei',
'William','Xiao','Yan','Yang','Yuki','Zachary','Zara','Zhao']
last_names=['Abdullah','Acharya','Ahmadi','Albers','Almeida','Andersen','Anand','Bauer',
'Bergmann','Bhatt','Blum','Bonnet','Braun','Brown','Burger','Castellanos','Castro',
'Cheng','Choi','Christiansen','Costa','Cruz','Dawit','Demir','Dimitriou','Diop',
'Dobrescu','Dubois','Durand','Eriksson','Esposito','Fedorov','Fernandez','Ferrari',
'Fischer','Flores','Fontaine','Fuentes','Garcia','Ghosh','Giordano','Gomez','Gonzalez',
'Guo','Gupta','Hansen','Hernandez','Hoffmann','Huang','Ibrahim','Ivanova','Jain',
'Jensen','Jin','Johansson','Jung','Kang','Kapoor','Kaur','Khan','Kim','Klein','Koch',
'Kowalski','Kumar','Larsson','Laurent','Lee','Li','Lim','Liu','Lopez','Lutz','Maier',
'Malik','Martinez','Mehta','Meyer','Mishra','Moreau','Moretti','Muller','Nakamura',
'Narasimhan','Ndiaye','Nguyen','Nielsen','Nilsson','Nkosi','Novak','Oh','Oliveira',
'Osei','Pacheco','Park','Patel','Pereira','Petrov','Pham','Popescu','Ramirez','Ramos',
'Rashid','Reyes','Richter','Ritter','Rodriguez','Romano','Romero','Rossi','Russo',
'Saha','Saito','Sanchez','Santos','Sato','Schmid','Schmidt','Schneider','Schulz',
'Sekar','Sharma','Silva','Singh','Smith','Solis','Sorensen','Stark','Stefanov',
'Suzuki','Tan','Tang','Tran','Tremblay','Vasiliev','Vasquez','Vega','Vidal','Vogt',
'Wagner','Wang','Weber','Weiss','Wenger','Wiese','Wolf','Wong','Wu','Yang','Yilmaz',
'Yoshida','Zhang','Zhao','Zhou','Zimmermann','Zuberi']

used = set(['alice_chen','bob_okafor'])
entities = []
while len(entities) < 998:
    fn = random.choice(first_names)
    ln = random.choice(last_names)
    k = fn.lower() + '_' + ln.lower()
    if k in used:
        continue
    used.add(k)
    rf = random.choice(research_focuses)
    entities.append({
        'id': 'researcher/' + k,
        'affiliation': random.choice(affiliations),
        'publication_count': random.randint(4, 98),
        'previous_employer': random.choice(prev_employers),
        'research_focus': 'primary=' + rf[0] + ', secondary=' + random.choice(research_focuses)[1],
    })

alice = {
    'id': 'researcher/alice_chen',
    'affiliation': 'MIT Computer Science',
    'publication_count': 47,
    'previous_employer': 'OpenAI (2018-2021)',
    'research_focus': 'primary=natural language processing, secondary=program synthesis',
}
bob = {
    'id': 'researcher/bob_okafor',
    'affiliation': 'Stanford AI Lab',
    'publication_count': 23,
    'previous_employer': 'DeepMind (2020-2023)',
    'research_focus': 'primary=computer vision, secondary=embodied AI',
}
entities.insert(399, alice)
entities.insert(749, bob)

lines = [
    '# B1 Extended Dataset - N=1000',
    '',
    '**Benchmark:** B1 - Entity Fact Retrieval under Distractor Density',
    '**Created:** 2026-03-21',
    '**Entities:** 1000 (998 fictional distractors + researcher/alice_chen at position 400 + researcher/bob_okafor at position 750)',
    '**Token estimate:** ~57,000',
    '',
    '---',
    '',
    '## Ground Truth (Needles)',
    '',
    '**researcher/alice_chen** (pos 400/1000) - affiliation: MIT Computer Science | publication_count: 47 | previous_employer: OpenAI (2018-2021) | research_focus: natural language processing',
    '**researcher/bob_okafor** (pos 750/1000) - affiliation: Stanford AI Lab | publication_count: 23 | previous_employer: DeepMind (2020-2023) | research_focus: computer vision',
    '',
    '---',
    '',
    '## Haystack Document - N=1000',
    '',
    '```',
    'RESEARCHER REGISTRY - 1000 ENTRIES',
    '',
]

for e in entities:
    lines.append('Entity: ' + e['id'])
    lines.append('  affiliation: ' + e['affiliation'])
    lines.append('  publication_count: ' + str(e['publication_count']))
    lines.append('  previous_employer: ' + e['previous_employer'])
    lines.append('  research_focus: ' + e['research_focus'])
    lines.append('')

lines.append('```')

outpath = 'benchmarks/B1-entity-retrieval/dataset-1000.md'
with open(outpath, 'w') as f:
    f.write('\n'.join(lines))

sz = len(open(outpath).read())
alice_pos = next(i for i,e in enumerate(entities) if e['id']=='researcher/alice_chen')
bob_pos = next(i for i,e in enumerate(entities) if e['id']=='researcher/bob_okafor')
print('Written', len(entities), 'entities')
print('alice_chen at position', alice_pos+1, '/ 1000')
print('bob_okafor at position', bob_pos+1, '/ 1000')
print('File size:', sz, 'chars (~', sz//4, 'tokens)')
