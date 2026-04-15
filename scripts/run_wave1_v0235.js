const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = 'C:/Users/NF/Documents/Projects/iranti-benchmarking';
const RAW_DIR = path.join(ROOT, 'results', 'raw');
const IRANTI_CLI = 'C:/Users/NF/AppData/Roaming/npm/iranti.cmd';
const RUNTIME_ROOT = 'C:/Users/NF/.iranti-runtime';
const INSTANCE = 'bench_v0235';
const BASE_URL = 'http://localhost:3510';
const API_KEY = 'bench_v0235_nf.kJUkv3Omndlid1i1pPZ6OsnlhOCYshykJEy6-m4unlI';
const AGENT = 'benchmark_program_main';
const NOW = new Date();
const DATE_STAMP = NOW.toISOString().replace(/[:.]/g, '-');

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

ensureDir(RAW_DIR);

function mdCodeBlock(value) {
  return `\`\`\`json\n${JSON.stringify(value, null, 2)}\n\`\`\``;
}

function textCodeBlock(value) {
  return `\`\`\`\n${value}\n\`\`\``;
}

function normalizeText(value) {
  return String(value ?? '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function powershell(command) {
  return execFileSync(
    'powershell.exe',
    ['-NoProfile', '-ExecutionPolicy', 'Bypass', '-Command', command],
    { encoding: 'utf8' }
  ).trim();
}

function getInstalledVersion() {
  return powershell(`& '${IRANTI_CLI}' --version`);
}

function getStatusJson() {
  const raw = powershell(`& '${IRANTI_CLI}' status --instance ${INSTANCE} --root '${RUNTIME_ROOT}' --json`);
  return JSON.parse(raw);
}

function makeHeaders() {
  return {
    'X-Iranti-Key': API_KEY,
    'Content-Type': 'application/json',
  };
}

async function request(method, route, body) {
  const started = Date.now();
  const response = await fetch(`${BASE_URL}${route}`, {
    method,
    headers: makeHeaders(),
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const elapsedMs = Date.now() - started;
  const text = await response.text();
  let json = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    json = null;
  }
  return {
    ok: response.ok,
    status: response.status,
    elapsedMs,
    json,
    text,
  };
}

async function get(route) {
  return request('GET', route);
}

async function post(route, body) {
  return request('POST', route, body);
}

async function writeFact(entity, key, value, summary, confidence, source, agent = AGENT) {
  return post('/kb/write', { entity, key, value, summary, confidence, source, agent });
}

async function queryFact(entity, key) {
  const [entityType, entityId] = entity.split('/');
  return get(`/kb/query/${encodeURIComponent(entityType)}/${encodeURIComponent(entityId)}/${encodeURIComponent(key)}`);
}

async function queryAll(entity) {
  const [entityType, entityId] = entity.split('/');
  return get(`/kb/query/${encodeURIComponent(entityType)}/${encodeURIComponent(entityId)}`);
}

async function handshake(agentId, task, recentMessages) {
  return post('/memory/handshake', { agentId, task, recentMessages });
}

async function observe(agentId, currentContext, entityHints = [], maxFacts = 8) {
  return post('/memory/observe', { agentId, currentContext, entityHints, maxFacts });
}

async function attend(agentId, latestMessage, currentContext, entityHints = [], forceInject = false, maxFacts = 8) {
  return post('/memory/attend', { agentId, latestMessage, currentContext, entityHints, forceInject, maxFacts });
}

async function ingest(entity, content, confidence, source, agent = AGENT) {
  return post('/kb/ingest', { entity, content, confidence, source, agent });
}

function scoreExpectedKeysFromFacts(facts, expectedKeys) {
  const present = new Set((facts ?? []).map((fact) => String(fact.entityKey || '').split('/').pop()));
  return expectedKeys.filter((key) => present.has(key));
}

function lookupValue(allEntries, keyCandidates) {
  const entries = Array.isArray(allEntries?.json)
    ? allEntries.json
    : Array.isArray(allEntries?.json?.value)
      ? allEntries.json.value
      : [];
  for (const key of keyCandidates) {
    const match = entries.find((entry) => entry.key === key);
    if (match) return match.value;
  }
  return null;
}

async function runB11(tag) {
  const entity = `project/b11_recovery_${tag}`;
  const source = `B11_${tag}_trial`;
  const keys = [
    ['database_engine', 'PostgreSQL 16', 'Project uses PostgreSQL 16 as its database engine'],
    ['auth_strategy', 'mTLS with certificate rotation every 7 days', 'Project uses mTLS auth with certificate rotation every 7 days'],
    ['cache_strategy', 'Redis Cluster with 2-hour TTL', 'Project uses Redis Cluster with 2-hour TTL for caching'],
    ['api_version', 'v3.2.1', 'Project is on API version v3.2.1'],
    ['deployment_target', 'GKE us-central1-a', 'Project deploys to GKE us-central1-a'],
    ['sla_uptime', '99.9%', 'Project SLA uptime is 99.9%'],
  ];

  const pre = await queryFact(entity, 'database_engine');
  const writes = [];
  for (const [key, value, summary] of keys) {
    writes.push({ key, response: await writeFact(entity, key, value, summary, 85, source) });
  }

  const hintContext = `Review ${entity} deployment config before the next sprint.`;
  const observeHint = await observe(AGENT, hintContext, [entity], 6);
  const coldContext = `I'm working on the ${entity} project deployment. I need to review the current technical decisions we've made. The team is discussing database options and auth strategies for the infrastructure.`;
  const observeCold = await observe(AGENT, coldContext, [], 6);
  const attendNaturalMessage = `I'm working on ${entity}. We need to review the deployment configuration decisions before the next sprint.`;
  const attendNatural = await attend(AGENT, attendNaturalMessage, attendNaturalMessage, [entity], false, 6);
  const attendForced = await attend(AGENT, `Review ${entity} deployment config`, `Review ${entity} deployment config`, [entity], true, 6);

  const expectedKeys = keys.map(([key]) => key);
  const observeHintKeys = scoreExpectedKeysFromFacts(observeHint.json?.facts, expectedKeys);
  const observeColdKeys = scoreExpectedKeysFromFacts(observeCold.json?.facts, expectedKeys);
  const attendForcedKeys = scoreExpectedKeysFromFacts(attendForced.json?.facts, expectedKeys);

  const md = [
    `# B11 - Context Recovery (iranti_observe + iranti_attend): v0.2.35 Trial`,
    ``,
    `**Version:** v0.2.35`,
    `**Date:** ${NOW.toISOString().slice(0, 10)}`,
    `**Track:** B11 - Context Recovery`,
    `**Executor:** benchmark_scientist`,
    ``,
    `---`,
    ``,
    `## Step 1 - KB Pre-Condition`,
    ``,
    mdCodeBlock(pre.json),
    ``,
    `## Step 2 - Write 6 Facts`,
    ``,
    ...writes.map((item) => `### ${item.key}\n${mdCodeBlock(item.response.json)}`),
    ``,
    `## Step 3 - iranti_observe With Entity Hint`,
    ``,
    mdCodeBlock(observeHint.json),
    ``,
    `**Facts returned:** ${observeHint.json?.facts?.length ?? 0} of 6`,
    `**Keys returned:** ${observeHintKeys.join(', ') || '(none)'}`,
    ``,
    `## Step 4 - iranti_observe Without Entity Hint`,
    ``,
    mdCodeBlock(observeCold.json),
    ``,
    `**Facts returned:** ${observeCold.json?.facts?.length ?? 0} of 6`,
    `**Keys returned:** ${observeColdKeys.join(', ') || '(none)'}`,
    ``,
    `## Step 5 - iranti_attend Natural`,
    ``,
    mdCodeBlock(attendNatural.json),
    ``,
    `## Step 6 - iranti_attend forceInject=true`,
    ``,
    mdCodeBlock(attendForced.json),
    ``,
    `**Facts injected:** ${attendForced.json?.facts?.length ?? 0} of 6`,
    `**Keys injected:** ${attendForcedKeys.join(', ') || '(none)'}`,
    ``,
    `## Score Summary`,
    ``,
    `| Pathway | Score | Notes |`,
    `|---------|-------|-------|`,
    `| observe_with_hint | ${observeHintKeys.length}/6 | ${observeHint.json?.facts?.length ?? 0} facts surfaced |`,
    `| observe_cold | ${observeColdKeys.length}/6 | ${observeCold.json?.facts?.length ?? 0} facts surfaced |`,
    `| attend_natural | ${(attendNatural.json?.facts?.length ?? 0) > 0 ? `${scoreExpectedKeysFromFacts(attendNatural.json?.facts, expectedKeys).length}/6` : '0/6'} | shouldInject=${String(attendNatural.json?.shouldInject)} |`,
    `| attend_forceInject | ${attendForcedKeys.length}/6 | ${attendForced.json?.facts?.length ?? 0} facts injected |`,
    ``,
  ].join('\n');

  fs.writeFileSync(path.join(RAW_DIR, 'B11-context-recovery-v0235-trial.md'), md);

  return {
    entity,
    pre,
    writes,
    observeHint,
    observeCold,
    attendNatural,
    attendForced,
    scores: {
      observeWithHint: observeHintKeys.length,
      observeCold: observeColdKeys.length,
      attendNatural: scoreExpectedKeysFromFacts(attendNatural.json?.facts, expectedKeys).length,
      attendForce: attendForcedKeys.length,
    },
  };
}

async function runB12(tag) {
  const entity = `project/b12_recovery_${tag}`;
  const source = `B12_${tag}_session_a`;
  const facts = [
    ['task_goal', 'benchmark v0.2.35 rerun: test cross-session fact durability and recovery pathway accuracy', 'B12 v0.2.35 session A - task goal for benchmark rerun session recovery test', 95],
    ['dataset_selected', 'iranti-benchmarking v0.2.35 rerun suite, wave1 active tracks', 'B12 v0.2.35 session A - dataset selected for benchmark rerun', 95],
    ['baseline_model', 'claude-sonnet-4-6 context-reading baseline', 'B12 v0.2.35 session A - baseline model for benchmark comparison', 95],
    ['iranti_arm_model', 'claude-sonnet-4-6 with iranti v0.2.35 MCP tools', 'B12 v0.2.35 session A - Iranti-arm model for benchmark comparison', 95],
    ['evaluation_metric', 'per-track accuracy score 0-10 plus qualitative capability assessment', 'B12 v0.2.35 session A - evaluation metric for benchmark scoring', 95],
    ['preliminary_finding', 'current-wave focus is B11 through B6 reruns on installed v0.2.35', 'B12 v0.2.35 session A - preliminary finding about current rerun wave', 90],
    ['next_step', 'complete wave1 then update published benchmark claims', 'B12 v0.2.35 session A - next step after completing wave1', 90],
    ['open_question', 'whether current handshake now surfaces any task state without explicit checkpointing', 'B12 v0.2.35 session A - open question about handshake behavior', 90],
  ];

  const writes = [];
  for (const [key, value, summary, confidence] of facts) {
    writes.push({ key, response: await writeFact(entity, key, value, summary, confidence, source) });
  }

  const oracleQueries = [];
  for (const [key] of facts) {
    oracleQueries.push({ key, response: await queryFact(entity, key) });
  }

  const hs = await handshake(AGENT, 'Continue the v0.2.35 rerun study. What did we decide and what is the next step?', [
    `I am resuming work on ${entity}.`,
    'I need the current task decisions and the next step.',
  ]);
  const observeHint = await observe(AGENT, entity, [entity], 8);
  const observeCold = await observe(
    AGENT,
    "I'm the benchmark program main agent working on a benchmarking study. I need to review what's been decided about the experimental methodology and evaluation design for the rerun study.",
    [],
    8
  );
  const attendHintMessage = `I'm continuing work on the benchmark v0.2.35 rerun project. I need to check the current status of ${entity} and review our experimental setup.`;
  const attendHint = await attend(AGENT, attendHintMessage, attendHintMessage, [entity], false, 8);

  const expectedKeys = facts.map(([key]) => key);
  const observeHintKeys = scoreExpectedKeysFromFacts(observeHint.json?.facts, expectedKeys);
  const observeColdKeys = scoreExpectedKeysFromFacts(observeCold.json?.facts, expectedKeys);
  const attendHintKeys = scoreExpectedKeysFromFacts(attendHint.json?.facts, expectedKeys);
  const oracleScore = oracleQueries.filter((item) => item.response.json?.found === true).length;

  const md = [
    `# B12 Interrupted Session Recovery - v0.2.35`,
    ``,
    `**Track:** B12 Session B - Cold Recovery`,
    `**Version confirmed by RPM:** v0.2.35`,
    `**Iranti version:** 0.2.35`,
    `**Date:** ${NOW.toISOString().slice(0, 10)}`,
    `**Agent:** ${AGENT}`,
    `**Status:** COMPLETE`,
    ``,
    `---`,
    ``,
    `## Session Boundary Declaration`,
    ``,
    `This run treats recovery as a fresh API session with zero prior conversation state. All recovery targets were written to \`${entity}\` immediately before measurement.`,
    ``,
    `## Oracle (explicit query)`,
    ``,
    ...oracleQueries.map((item) => `### ${item.key}\n${mdCodeBlock(item.response.json)}`),
    ``,
    `**Oracle Score:** ${oracleScore}/8`,
    ``,
    `## Handshake`,
    ``,
    mdCodeBlock(hs.json),
    ``,
    `## Observe with Entity Hint`,
    ``,
    mdCodeBlock(observeHint.json),
    ``,
    `**Observe+hint Score:** ${observeHintKeys.length}/8`,
    ``,
    `## Observe Cold`,
    ``,
    mdCodeBlock(observeCold.json),
    ``,
    `**Observe cold Score:** ${observeColdKeys.length}/8`,
    ``,
    `## Attend with Entity Hint`,
    ``,
    mdCodeBlock(attendHint.json),
    ``,
    `**Attend Score:** ${attendHintKeys.length}/8`,
    ``,
    `## Score Summary`,
    ``,
    `| Recovery modality | Score | Notes |`,
    `|------------------|-------|-------|`,
    `| iranti_query (oracle, explicit lookup) | ${oracleScore}/8 | explicit query path |`,
    `| iranti_handshake | ${Array.isArray(hs.json?.workingMemory) ? hs.json.workingMemory.length : 0} workingMemory items | task-state auto-recovery check |`,
    `| iranti_observe (with entity hint) | ${observeHintKeys.length}/8 | ${observeHint.json?.facts?.length ?? 0} facts surfaced |`,
    `| iranti_observe (cold, no hint) | ${observeColdKeys.length}/8 | ${observeCold.json?.facts?.length ?? 0} facts surfaced |`,
    `| iranti_attend (with entity hint) | ${attendHintKeys.length}/8 | shouldInject=${String(attendHint.json?.shouldInject)} |`,
    ``,
  ].join('\n');

  fs.writeFileSync(path.join(RAW_DIR, 'B12-session-recovery-v0235.md'), md);

  return {
    entity,
    writes,
    oracleQueries,
    handshake: hs,
    observeHint,
    observeCold,
    attendHint,
    scores: {
      oracle: oracleScore,
      handshakeItems: Array.isArray(hs.json?.workingMemory) ? hs.json.workingMemory.length : 0,
      observeHint: observeHintKeys.length,
      observeCold: observeColdKeys.length,
      attendHint: attendHintKeys.length,
    },
  };
}

async function runB3(tag) {
  const prefix = `project/${tag}_b3`;
  const cases = [
    {
      name: 'C1',
      entity: `${prefix}_c1`,
      w1: { key: 'verdict', value: { decision: 'approved' }, confidence: 90, source: `${tag}_b3_auditor` },
      w2: { key: 'verdict', value: { decision: 'rejected' }, confidence: 60, source: `${tag}_b3_auditor` },
      expected: 'deterministic_reject',
    },
    {
      name: 'C2',
      entity: `${prefix}_c2`,
      w1: { key: 'verdict', value: { decision: 'approved' }, confidence: 95, source: `${tag}_b3_primary` },
      w2: { key: 'verdict', value: { decision: 'pending' }, confidence: 55, source: `${tag}_b3_secondary` },
      expected: 'deterministic_reject',
    },
    {
      name: 'C3',
      entity: `${prefix}_c3`,
      w1: { key: 'verdict', value: { decision: 'approved' }, confidence: 80, source: `${tag}_b3_src_a` },
      w2: { key: 'verdict', value: { decision: 'rejected' }, confidence: 85, source: `${tag}_b3_src_b` },
      expected: 'llm_or_timeout',
    },
    {
      name: 'C4',
      entity: `${prefix}_c4`,
      w1: { key: 'verdict', value: { decision: 'approved' }, confidence: 88, source: `${tag}_b3_auditor` },
      w2: { key: 'verdict', value: { decision: 'approved' }, confidence: 75, source: `${tag}_b3_auditor` },
      expected: 'duplicate_reject',
    },
    {
      name: 'C5',
      entity: `${prefix}_c5`,
      w1: { key: 'verdict', value: { decision: 'approved' }, confidence: 70, source: `${tag}_b3_old` },
      w2: { key: 'verdict', value: { decision: 'rejected' }, confidence: 99, source: `${tag}_b3_new` },
      expected: 'deterministic_update',
    },
  ];

  const results = [];
  for (const test of cases) {
    const write1 = await writeFact(test.entity, test.w1.key, test.w1.value, `${test.name} initial`, test.w1.confidence, test.w1.source);
    const write2 = await writeFact(test.entity, test.w2.key, test.w2.value, `${test.name} challenger`, test.w2.confidence, test.w2.source);
    const final = await queryFact(test.entity, 'verdict');
    results.push({ ...test, write1, write2, final });
    await sleep(250);
  }

  const md = [
    `# B3 Conflict Resolution Rerun - v0.2.35`,
    `**Provider:** openai`,
    `**Iranti version:** v0.2.35`,
    `**Date:** ${NOW.toISOString().slice(0, 10)}`,
    `**Entity prefix:** ${prefix}`,
    ``,
    `---`,
    ``,
    `## Results`,
    ``,
    `| Case | Expected path | Write 2 status | Action | Reason | Final value |`,
    `|------|---------------|----------------|--------|--------|-------------|`,
    ...results.map((item) => {
      const action = item.write2.json?.action || `HTTP ${item.write2.status}`;
      const reason = (item.write2.json?.reason || item.write2.json?.error || item.write2.text || '').replace(/\|/g, '\\|');
      const finalValue = JSON.stringify(item.final.json?.value ?? null).replace(/\|/g, '\\|');
      return `| ${item.name} | ${item.expected} | ${item.write2.status} | ${action} | ${reason} | ${finalValue} |`;
    }),
    ``,
    ...results.map((item) => [
      `### ${item.name}`,
      mdCodeBlock({ write1: item.write1.json || item.write1.text, write2: item.write2.json || item.write2.text, final: item.final.json || item.final.text }),
      ``,
    ].join('\n')),
  ].join('\n');

  fs.writeFileSync(path.join(RAW_DIR, 'B3-conflict-rerun-v0235.md'), md);
  return { prefix, results };
}

async function runB5(tag) {
  const entity = `researcher/b5_currency_${tag}_subject`;
  const results = [];

  async function writeWithOptionalRetry(payload, retries = 0) {
    const attempts = [];
    for (let i = 0; i <= retries; i += 1) {
      const response = await writeFact(entity, payload.key, payload.value, payload.summary, payload.confidence, payload.source);
      attempts.push(response);
      if (response.ok) return { attempts, final: response };
      await sleep(500);
    }
    return { attempts, final: attempts[attempts.length - 1] };
  }

  // T1
  const t1Initial = await writeFact(entity, 'affiliation', 'University of Edinburgh', 'B5 subject researcher is affiliated with University of Edinburgh', 85, `${tag}_initial`);
  const t1Update = await writeWithOptionalRetry({
    key: 'affiliation',
    value: 'University of Oxford',
    summary: 'B5 subject researcher affiliation updated to University of Oxford',
    confidence: 92,
    source: `${tag}_updater`,
  }, 1);
  const t1Final = await queryFact(entity, 'affiliation');
  results.push({ name: 'T1', initial: t1Initial, updateAttempts: t1Update.attempts, final: t1Final });

  // T1b
  const t1bInitial = await writeFact(entity, 'lab', 'Cognitive Systems Lab', 'B5 subject researcher is in Cognitive Systems Lab', 85, `${tag}_initial`);
  const t1bUpdate = await writeFact(entity, 'lab', 'Neural Dynamics Lab', 'B5 subject researcher lab updated to Neural Dynamics Lab', 97, `${tag}_initial`);
  const t1bFinal = await queryFact(entity, 'lab');
  results.push({ name: 'T1b', initial: t1bInitial, updateAttempts: [t1bUpdate], final: t1bFinal });

  // T2
  const t2Initial = await writeFact(entity, 'country', 'Scotland', 'B5 subject researcher is based in Scotland', 90, `${tag}_initial`);
  const t2Update = await writeFact(entity, 'country', 'England', 'B5 subject researcher is based in England', 75, `${tag}_lowconf`);
  const t2Final = await queryFact(entity, 'country');
  results.push({ name: 'T2', initial: t2Initial, updateAttempts: [t2Update], final: t2Final });

  // T3
  const t3Initial = await writeFact(entity, 'department', 'Informatics', 'B5 subject researcher is in the Informatics department', 85, `${tag}_initial`);
  const t3Update = await writeFact(entity, 'department', 'Informatics', 'B5 subject researcher is in the Informatics department', 80, `${tag}_initial`);
  const t3Final = await queryFact(entity, 'department');
  results.push({ name: 'T3', initial: t3Initial, updateAttempts: [t3Update], final: t3Final });

  // T4
  const t4Initial = await writeFact(entity, 'title', 'Professor', 'B5 subject researcher holds the title of Professor', 80, `${tag}_source_a`);
  const t4Update = await writeWithOptionalRetry({
    key: 'title',
    value: 'Associate Professor',
    summary: 'B5 subject researcher holds the title of Associate Professor',
    confidence: 85,
    source: `${tag}_source_b`,
  }, 1);
  const t4Final = await queryFact(entity, 'title');
  results.push({ name: 'T4', initial: t4Initial, updateAttempts: t4Update.attempts, final: t4Final });

  const md = [
    `# B5 Knowledge Currency / Update Semantics - v0.2.35 Trial`,
    ``,
    `**Version confirmed by RPM:** v0.2.35`,
    `**Track:** B5 - Knowledge Currency / Temporal Update`,
    `**Entity used:** ${entity}`,
    `**Executed:** ${NOW.toISOString().slice(0, 10)}`,
    ``,
    `---`,
    ``,
    `| Test | Initial action | Update attempts | Final value | Final source |`,
    `|------|----------------|-----------------|-------------|--------------|`,
    ...results.map((item) => {
      const lastAttempt = item.updateAttempts[item.updateAttempts.length - 1];
      return `| ${item.name} | ${item.initial.json?.action || item.initial.status} | ${item.updateAttempts.map((a) => a.json?.action || `HTTP ${a.status}`).join(', ')} | ${JSON.stringify(item.final.json?.value ?? null)} | ${item.final.json?.source || ''} |`;
    }),
    ``,
    ...results.map((item) => [
      `### ${item.name}`,
      mdCodeBlock({
        initial: item.initial.json || item.initial.text,
        updateAttempts: item.updateAttempts.map((attempt) => attempt.json || attempt.text),
        final: item.final.json || item.final.text,
      }),
      ``,
    ].join('\n')),
  ].join('\n');

  fs.writeFileSync(path.join(RAW_DIR, 'B5-knowledge-update-v0235-trial.md'), md);
  return { entity, results };
}

async function runB6(tag) {
  const cleanEntity = `researcher/b6_closeout_${tag}_petrov_ivan`;
  const conflictEntity = `researcher/b6_closeout_${tag}_petrov_ivan_conflict`;
  const prose = 'Ivan Petrov is a researcher at the Moscow Institute of Physics and Technology, where he leads the Computational Fluid Dynamics Laboratory. He completed his doctorate at Lomonosov Moscow State University in 2015. Before his current position, he worked at the Skolkovo Institute of Science and Technology from 2015 to 2019. His primary research area is turbulence modeling, with secondary work in numerical methods for partial differential equations. He has published 41 papers.';

  const cleanPre = await queryFact(cleanEntity, 'affiliation');
  const cleanIngest = await ingest(cleanEntity, prose, 90, `B6_${tag}_ingest`);
  const cleanAll = await queryAll(cleanEntity);

  const scoreChecks = [
    ['affiliation', ['affiliation'], 'moscow institute of physics and technology'],
    ['lab', ['leads_laboratory', 'lab_leader_of', 'lab'], 'computational fluid dynamics laboratory'],
    ['education', ['doctorate_institution', 'degree_institution', 'education'], 'lomonosov moscow state university'],
    ['previous_employer', ['previous_affiliation', 'previous_employer'], 'skolkovo institute of science and technology'],
    ['research_focus_primary', ['primary_research_area', 'research_focus'], 'turbulence modeling'],
    ['publication_count', ['publication_count'], '41'],
  ];
  const cleanScore = scoreChecks.map(([label, candidates, expected]) => {
    const value = lookupValue(cleanAll, candidates);
    return {
      label,
      value,
      expected,
      ok: normalizeText(typeof value === 'object' ? JSON.stringify(value) : value).includes(normalizeText(expected)),
    };
  });

  const baselineWrites = [
    ['affiliation', 'Moscow Institute of Physics and Technology', 'B6 closeout baseline affiliation'],
    ['publication_count', { count: 41 }, 'B6 closeout baseline publication count'],
    ['lab', 'Computational Fluid Dynamics Laboratory', 'B6 closeout baseline lab'],
    ['education', 'doctorate Lomonosov Moscow State University 2015', 'B6 closeout baseline education'],
    ['previous_employer', 'Skolkovo Institute of Science and Technology (2015-2019)', 'B6 closeout baseline previous employer'],
    ['research_focus', 'turbulence modeling (primary), numerical methods for partial differential equations (secondary)', 'B6 closeout baseline research focus'],
  ];
  const conflictBaseline = [];
  for (const [key, value, summary] of baselineWrites) {
    conflictBaseline.push(await writeFact(conflictEntity, key, value, summary, 95, 'B6_closeout_baseline'));
  }
  const conflictIngest = await ingest(conflictEntity, prose, 90, `B6_${tag}_ingest`);

  const md = [
    `# B6 Ingest Pipeline - v0.2.35`,
    `**Track:** B6 - iranti_ingest Pipeline`,
    `**Version confirmed by RPM:** v0.2.35`,
    `**Date:** ${NOW.toISOString().slice(0, 10)}`,
    `**Status:** COMPLETE`,
    ``,
    `---`,
    ``,
    `## Trial 1 - Clean Entity`,
    mdCodeBlock(cleanPre.json),
    mdCodeBlock(cleanIngest.json || { error: cleanIngest.text, status: cleanIngest.status }),
    `**Trial 1 Score:** ${cleanScore.filter((item) => item.ok).length}/${cleanScore.length}`,
    ``,
    `| Ground truth fact | Extracted value | Verdict |`,
    `|---|---|---|`,
    ...cleanScore.map((item) => `| ${item.label} | ${JSON.stringify(item.value)} | ${item.ok ? 'CORRECT' : 'INCORRECT'} |`),
    ``,
    `## Trial 2 - Pre-Populated Entity`,
    ...conflictBaseline.map((item, index) => `### Baseline write ${index + 1}\n${mdCodeBlock(item.json || item.text)}`),
    ``,
    mdCodeBlock(conflictIngest.json || { error: conflictIngest.text, status: conflictIngest.status }),
    ``,
  ].join('\n');

  fs.writeFileSync(path.join(RAW_DIR, 'B6-ingest-rerun-v0235.md'), md);
  return { cleanEntity, conflictEntity, cleanPre, cleanIngest, cleanAll, cleanScore, conflictBaseline, conflictIngest };
}

async function main() {
  const tag = `v0235_${DATE_STAMP.toLowerCase()}`;
  const environment = {
    date: NOW.toISOString(),
    installedVersion: getInstalledVersion(),
    runtimeStatus: getStatusJson(),
    baseUrl: BASE_URL,
    instance: INSTANCE,
    runtimeRoot: RUNTIME_ROOT,
  };

  const b11 = await runB11(tag);
  const b12 = await runB12(tag);
  const b3 = await runB3(tag);
  const b5 = await runB5(tag);
  const b6 = await runB6(tag);

  const combined = { environment, tag, b11, b12, b3, b5, b6 };
  fs.writeFileSync(path.join(RAW_DIR, 'wave1-v0235-execution.json'), JSON.stringify(combined, null, 2));
  console.log(JSON.stringify({
    ok: true,
    raw: [
      'B11-context-recovery-v0235-trial.md',
      'B12-session-recovery-v0235.md',
      'B3-conflict-rerun-v0235.md',
      'B5-knowledge-update-v0235-trial.md',
      'B6-ingest-rerun-v0235.md',
      'wave1-v0235-execution.json',
    ],
  }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
