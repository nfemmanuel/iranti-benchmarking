import random
random.seed(7)

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
    'Vrije Universiteit Amsterdam','Delft University of Technology',
    'University of Warsaw','Jagiellonian University','Charles University Prague',
    'University of Vienna','Graz University of Technology','University of Innsbruck',
    'LMU Munich','University of Freiburg','University of Stuttgart',
    'RWTH Aachen','University of Bonn','Heidelberg University',
    'University of Hamburg','University of Kiel','Dresden University of Technology',
    'University of Groningen','Maastricht University','Radboud University',
    'Uppsala University','Lund University','University of Gothenburg',
    'University of Oslo','University of Bergen','Aalto University',
    'University of Turku','University of Oulu','IT University Copenhagen',
    'Aarhus University','Technical University of Denmark','University of Iceland',
    'Reykjavik University','University of Tartu','Tallinn University of Technology',
    'University of Latvia','Vilnius University','Warsaw University of Technology',
    'AGH University Krakow','Wroclaw University of Technology','Poznan University of Technology',
    'University of Ljubljana','University of Zagreb','University of Belgrade',
    'Sofia University','University of Bucharest','Alexandru Ioan Cuza University',
    'Babes-Bolyai University','University of Lisbon','University of Porto',
    'University of Coimbra','University of Seville','Universidad Autónoma Madrid',
    'Universidad Politécnica Madrid','University of Granada','University of Valencia',
    'Universitat Pompeu Fabra','Universitat Politècnica de Catalunya',
    'Scuola Normale Superiore','University of Bologna','Politecnico di Milano',
    'University of Turin','University of Florence','University of Pisa',
    'University of Genoa','University of Naples Federico II','University of Catania',
    'Université Paris-Saclay','Sorbonne Université','École Polytechnique',
    'École Normale Supérieure','Université Grenoble Alpes','Université Côte d\'Azur',
    'Université Paul Sabatier Toulouse','Université de Bordeaux','Université de Strasbourg',
    'Université de Rennes','Université de Lyon','Université Paris Cité',
    'Ghent University','KU Leuven','Université libre de Bruxelles',
    'University of Luxembourg','University of Bern','University of Basel',
    'University of Geneva','University of Lausanne','University of Neuchâtel',
    'Ben-Gurion University','Bar-Ilan University','Weizmann Institute of Science',
    'Tel Aviv University','University of Haifa','Boğaziçi University',
    'Middle East Technical University','Bilkent University','Sabanci University',
    'Cairo University','American University of Cairo','University of Cape Town',
    'University of Pretoria','Stellenbosch University','Wits University',
    'University of Nairobi','Makerere University','University of Ghana',
    'IIT Bombay','IIT Delhi','IIT Madras','IIT Kanpur','IIT Kharagpur',
    'IISc Bangalore','University of Hyderabad','TIFR Mumbai',
    'Peking University AI Institute','Zhejiang University','Fudan University',
    'Shanghai Jiao Tong University','University of Science and Technology of China',
    'Nankai University','Sun Yat-sen University','Harbin Institute of Technology',
    'Nanjing University','Wuhan University','Xi\'an Jiaotong University',
    'KAIST','POSTECH','Yonsei University','Korea University',
    'Osaka University','Kyoto University','Tohoku University','Nagoya University',
    'Waseda University','Keio University','NTT Research',
    'National Taiwan University','Academia Sinica Taiwan',
    'University of Queensland','Monash University','University of Adelaide',
    'University of Western Australia','RMIT University','Macquarie University',
    'University of Auckland','Victoria University Wellington',
    'University of Alberta','University of Waterloo','University of Ottawa',
    'Dalhousie University','Simon Fraser University','Queen\'s University',
    'Université de Montréal','HEC Montréal','Concordia University',
    'University of Calgary','University of Manitoba',
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
    'DeepMind London (2019-2022)','Cohere Research (2021-2023)',
    'Anthropic (2021-2023)','Mistral AI (2023)','Stability AI (2022-2023)',
    'Cerebras Research (2020-2023)','SambaNova Systems (2019-2022)',
    'Graphcore Research (2018-2021)','Arm Research (2017-2020)',
    'Siemens AI Lab (2018-2021)','Philips Research (2017-2020)',
    'Roche Informatics (2019-2022)','Novartis AI (2020-2023)',
    'Goldman Sachs Research (2018-2021)','JPMorgan AI Research (2019-2022)',
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
    ('neuro-symbolic AI','logical reasoning'),
    ('3D scene understanding','depth estimation'),
    ('video understanding','temporal modeling'),
    ('audio processing','music generation'),
    ('optimization theory','convex optimization'),
    ('active learning','data-efficient ML'),
    ('curriculum learning','sample efficiency'),
    ('neural ODEs','dynamical systems'),
    ('geometric deep learning','equivariant networks'),
    ('diffusion models','generative modeling'),
    ('large language models','instruction tuning'),
    ('prompt engineering','in-context learning'),
    ('retrieval-augmented generation','knowledge grounding'),
    ('agent systems','tool use'),
    ('multi-agent learning','emergent communication'),
    ('reward modeling','RLHF'),
    ('constitutional AI','alignment techniques'),
    ('mechanistic interpretability','circuit analysis'),
    ('scaling laws','emergent capabilities'),
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
'William','Xiao','Yan','Yang','Yuki','Zachary','Zara','Zhao','Aditi','Aiko','Aleksei',
'Alinta','Aliya','Amaru','Ambrogio','Amira','Andile','Andrei','Anika','Aoife','Arash',
'Ariana','Ariel','Arjuna','Arnaldo','Arno','Aryan','Asher','Ashoka','Astrid','Athos',
'Ayasha','Aziz','Aziz','Badr','Bahar','Balthazar','Bao','Barnabas','Basil','Bastian',
'Belinda','Benedikt','Beniamino','Bernadette','Berthold','Birgit','Bogdan','Bram','Brice',
'Brigitte','Bruno','Callum','Camila','Cansu','Caterina','Cathal','Cedric','Chidinma',
'Chisom','Chukwuemeka','Clarice','Clement','Colm','Conor','Corentin','Cornelius','Cosimo',
'Dagmar','Damian','Davide','Declan','Deniz','Despina','Dieter','Dimitrios','Dirk',
'Dóra','Ebrahim','Edmund','Eduardo','Edvard','Eiji','Ekaterina','Eleonora','Elfriede',
'Elisabetta','Elke','Emeka','Emil','Emilia','Emiliano','Emilio','Emmanuella','Enrique',
'Ernst','Esmeralda','Esperanza','Estela','Esteban','Eugenia','Ezra','Fabian','Farrukh',
'Federica','Fernanda','Fernando','Filippo','Flavia','Florent','Florian','Folake','Franca']
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
'Yoshida','Zhang','Zhao','Zhou','Zimmermann','Zuberi','Aberg','Abrahamsen','Achebe',
'Adamczyk','Adebayo','Adeyemi','Adjei','Aguilar','Ahlberg','Ahlstrom','Ahmed','Akande',
'Akbar','Akintola','Alarcon','Alatorre','Albrecht','Alejandro','Aleksic','Alexandros',
'Alfarsi','Alfiori','Alimov','Alkhatib','Allard','Almeida','Almendros','Alonso',
'Alsaeed','Altun','Aluoch','Alvarado','Amara','Amaral','Amari','Amaru','Amato',
'Ambrose','Amendola','Amherd','Amini','Ammaniti','Amnuay','Amore','Amrani','Amundsen',
'Anagnos','Anand','Anandakrishnan','Anastasi','Andrade','Andreev','Andreeva','Andreis',
'Andreoli','Andrés','Andriessen','Andronescu','Anello','Ang','Angell','Angelo',
'Angelova','Angelini','Angermeier','Anglade','Angulo','Anker','Annan','Annesley',
'Anokye','Anselmi','Ansong','Antes','Antonescu','Antonini','Antonopoulos','Antonova',
'Antunes','Anwar','Aoki','Aponte','Appiah','Appleton','Aprile','Apted','Aquilino',
'Aquino','Aranda','Arango','Araujo','Arbel','Arber','Arcand','Arcari','Arch',
'Archambault','Archen','Archetti','Archer','Archibald','Ardila','Arditi','Arellano',
'Arenas','Arendse','Arends','Arese','Argyris','Arif','Arikan','Arino','Arion',
'Aristegui','Arizmendi','Arjunan','Arkhipov','Arlt','Armand','Armando','Armas']

reserved = {'elena_torres', 'marcus_delacroix', 'viktor_sokolov', 'jean_pierre_lambert'}
used = set(reserved)
entities = []

while len(entities) < 4996:
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

# Target entity 1: elena_torres at position 1000 (0-indexed: 999)
elena = {
    'id': 'researcher/elena_torres',
    'affiliation': 'Vienna Institute for Advanced Computation',
    'publication_count': 83,
    'previous_employer': 'Max Planck Institute (2018-2022)',
    'research_focus': 'primary=numerical methods, secondary=high-performance computing',
}

# Adversarial distractor near elena_torres at position 1010 (0-indexed: 1009)
# Same publication_count=83 but different name/affiliation
distractor_elena = {
    'id': 'researcher/viktor_sokolov',
    'affiliation': 'Technical University of Graz',
    'publication_count': 83,
    'previous_employer': 'CERN Computing Division (2017-2021)',
    'research_focus': 'primary=scientific computing, secondary=distributed systems',
}

# Target entity 2: marcus_delacroix at position 3750 (0-indexed: 3749)
marcus = {
    'id': 'researcher/marcus_delacroix',
    'affiliation': 'Université de Montréal MILA',
    'publication_count': 29,
    'previous_employer': 'CIFAR (2019-2022)',
    'research_focus': 'primary=deep generative models, secondary=representation learning',
}

# Adversarial distractor near marcus_delacroix at position 3760 (0-indexed: 3759)
# Same affiliation="Université de Montréal MILA" but different publication_count
distractor_marcus = {
    'id': 'researcher/jean_pierre_lambert',
    'affiliation': 'Université de Montréal MILA',
    'publication_count': 61,
    'previous_employer': 'Yoshua Bengio Lab (2018-2021)',
    'research_focus': 'primary=probabilistic models, secondary=variational inference',
}

# Insert targets and distractors at correct positions (1-indexed positions -> 0-indexed inserts)
# Position 1000 -> index 999
entities.insert(999, elena)
# Position 1010 -> index 1009 (after elena insertion, this is still relative to final list)
# elena is at index 999, so distractor at final index 1009 means insert at 1009 now
entities.insert(1009, distractor_elena)
# Position 3750 -> index 3749
entities.insert(3749, marcus)
# Position 3760 -> index 3759
entities.insert(3759, distractor_marcus)

# Verify positions
elena_pos = next(i for i, e in enumerate(entities) if e['id'] == 'researcher/elena_torres')
distractor_elena_pos = next(i for i, e in enumerate(entities) if e['id'] == 'researcher/viktor_sokolov')
marcus_pos = next(i for i, e in enumerate(entities) if e['id'] == 'researcher/marcus_delacroix')
distractor_marcus_pos = next(i for i, e in enumerate(entities) if e['id'] == 'researcher/jean_pierre_lambert')

print(f'Total entities: {len(entities)}')
print(f'elena_torres at position {elena_pos + 1} / {len(entities)}')
print(f'viktor_sokolov (distractor) at position {distractor_elena_pos + 1} / {len(entities)}')
print(f'marcus_delacroix at position {marcus_pos + 1} / {len(entities)}')
print(f'jean_pierre_lambert (distractor) at position {distractor_marcus_pos + 1} / {len(entities)}')

lines = [
    '# B1 Extended Dataset - N=5000',
    '',
    '**Benchmark:** B1 - Entity Fact Retrieval under Degradation Regime',
    '**Created:** 2026-03-21',
    f'**Entities:** {len(entities)} (4996 fictional distractors + 2 targets + 2 adversarial distractors)',
    '**Approximate token count:** ~280,000 (estimated at ~56 chars/entity avg * 5000 / 4 chars/token)',
    '**Seed:** random.seed(7)',
    '',
    '---',
    '',
    '## Ground Truth (Needles)',
    '',
    f'**researcher/elena_torres** (pos {elena_pos+1}/{len(entities)}) - affiliation: Vienna Institute for Advanced Computation | publication_count: 83',
    f'**researcher/marcus_delacroix** (pos {marcus_pos+1}/{len(entities)}) - affiliation: Université de Montréal MILA | publication_count: 29',
    '',
    '## Adversarial Distractors',
    '',
    f'**researcher/viktor_sokolov** (pos {distractor_elena_pos+1}/{len(entities)}) - publication_count: 83 (same as elena_torres) | affiliation: Technical University of Graz (different)',
    f'**researcher/jean_pierre_lambert** (pos {distractor_marcus_pos+1}/{len(entities)}) - affiliation: Université de Montréal MILA (same as marcus_delacroix) | publication_count: 61 (different)',
    '',
    '---',
    '',
    '## Haystack Document - N=5000',
    '',
    '```',
    'RESEARCHER REGISTRY - 5000 ENTRIES',
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

outpath = 'C:/Users/NF/Documents/Projects/iranti-benchmarking/benchmarks/B1-entity-retrieval/dataset-5000.md'
with open(outpath, 'w', encoding='utf-8') as f:
    f.write('\n'.join(lines))

sz = len(open(outpath, encoding='utf-8').read())
token_estimate = sz // 4
print(f'File size: {sz} chars (~{token_estimate:,} tokens)')
print(f'Written to: {outpath}')
