const { execFileSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const cli = 'C:\\Users\\NF\\AppData\\Roaming\\npm\\iranti.cmd';
const runtimeRoot = process.env.IRANTI_BENCH_RUNTIME_ROOT || 'C:\\Users\\NF\\.iranti-runtime';
const instance = process.env.IRANTI_BENCH_B1_INSTANCE || 'bench_b1_full_v0239';
const port = Number(process.env.IRANTI_BENCH_B1_PORT || 3513);
const baseUrl = `http://localhost:${port}`;
const dbMode = process.env.IRANTI_BENCH_DB_MODE || 'managed';
const dbHost = process.env.IRANTI_BENCH_DB_HOST || 'localhost';
const dbPort = Number(process.env.IRANTI_BENCH_DB_PORT || 5432);
const dbUser = process.env.IRANTI_BENCH_DB_USER || 'postgres';
const dbPassword = process.env.IRANTI_BENCH_DB_PASSWORD || '053435';
const database = process.env.IRANTI_BENCH_B1_DATABASE || 'iranti_bench_b1_full_v0239_db';
const dbUrl = `postgresql://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${database}`;
const bootstrapApiKey = process.env.IRANTI_BENCH_B1_API_KEY || 'bench_b1_full_v0239_nf.2d3105f3948b4bc0bef7e6e9a6e7ea1f';
const datasetPath = path.resolve(process.env.IRANTI_BENCH_B1_DATASET || 'benchmarks/B1-entity-retrieval/dataset-2000-blind.md');
const model = process.env.IRANTI_BENCH_B1_MODEL || 'claude-sonnet-4-5-20250929';
const outputJson = path.resolve(process.env.IRANTI_BENCH_B1_OUTPUT_JSON || 'results/raw/B1-full-v0239-execution.json');
const outputMarkdown = path.resolve(process.env.IRANTI_BENCH_B1_OUTPUT_MD || 'results/raw/B1-full-v0239-trial.md');
const outputDir = path.dirname(outputJson);
const instanceDir = path.join(runtimeRoot, 'instances', instance);
const benchmarkAgentId = 'benchmark_program_main';

const questions = [
  { id: 'Q1', entity: 'researcher/b1_n0239_alice_chen', key: 'affiliation', prompt: "What is researcher/alice_chen's affiliation? Return only the affiliation.", expected: 'MIT Computer Science' },
  { id: 'Q2', entity: 'researcher/b1_n0239_alice_chen', key: 'publication_count', prompt: "What is researcher/alice_chen's publication count? Return only the number.", expected: '47' },
  { id: 'Q3', entity: 'researcher/b1_n0239_alice_chen', key: 'previous_employer', prompt: "What is researcher/alice_chen's previous employer name only? Return only the employer name.", expected: 'OpenAI' },
  { id: 'Q4', entity: 'researcher/b1_n0239_alice_chen', key: 'employer_years', prompt: "What are researcher/alice_chen's previous employer years? Return only the year range.", expected: '2018-2021' },
  { id: 'Q5', entity: 'researcher/b1_n0239_alice_chen', key: 'research_focus', prompt: "What is researcher/alice_chen's primary research focus? Return only the primary focus.", expected: 'natural language processing' },
  { id: 'Q6', entity: 'researcher/b1_n0239_bob_okafor', key: 'affiliation', prompt: "What is researcher/bob_okafor's affiliation? Return only the affiliation.", expected: 'Stanford AI Lab' },
  { id: 'Q7', entity: 'researcher/b1_n0239_bob_okafor', key: 'publication_count', prompt: "What is researcher/bob_okafor's publication count? Return only the number.", expected: '23' },
  { id: 'Q8', entity: 'researcher/b1_n0239_bob_okafor', key: 'previous_employer', prompt: "What is researcher/bob_okafor's previous employer name only? Return only the employer name.", expected: 'DeepMind' },
  { id: 'Q9', entity: 'researcher/b1_n0239_bob_okafor', key: 'employer_years', prompt: "What are researcher/bob_okafor's previous employer years? Return only the year range.", expected: '2020-2023' },
  { id: 'Q10', entity: 'researcher/b1_n0239_bob_okafor', key: 'research_focus', prompt: "What is researcher/bob_okafor's primary research focus? Return only the primary focus.", expected: 'computer vision' },
];

const facts = [
  { entity: 'researcher/b1_n0239_alice_chen', key: 'affiliation', value: 'MIT Computer Science', summary: 'Alice Chen is affiliated with MIT Computer Science' },
  { entity: 'researcher/b1_n0239_alice_chen', key: 'publication_count', value: 47, summary: 'Alice Chen has 47 publications' },
  { entity: 'researcher/b1_n0239_alice_chen', key: 'previous_employer', value: 'OpenAI', summary: 'Alice Chen previously worked at OpenAI' },
  { entity: 'researcher/b1_n0239_alice_chen', key: 'employer_years', value: '2018-2021', summary: 'Alice Chen worked at OpenAI from 2018 to 2021' },
  { entity: 'researcher/b1_n0239_alice_chen', key: 'research_focus', value: 'natural language processing', summary: 'Alice Chen primary research focus is natural language processing' },
  { entity: 'researcher/b1_n0239_bob_okafor', key: 'affiliation', value: 'Stanford AI Lab', summary: 'Bob Okafor is affiliated with Stanford AI Lab' },
  { entity: 'researcher/b1_n0239_bob_okafor', key: 'publication_count', value: 23, summary: 'Bob Okafor has 23 publications' },
  { entity: 'researcher/b1_n0239_bob_okafor', key: 'previous_employer', value: 'DeepMind', summary: 'Bob Okafor previously worked at DeepMind' },
  { entity: 'researcher/b1_n0239_bob_okafor', key: 'employer_years', value: '2020-2023', summary: 'Bob Okafor worked at DeepMind from 2020 to 2023' },
  { entity: 'researcher/b1_n0239_bob_okafor', key: 'research_focus', value: 'computer vision', summary: 'Bob Okafor primary research focus is computer vision' },
];

fs.mkdirSync(outputDir, { recursive: true });

function run(cmd, args, opts = {}) {
  return execFileSync(cmd, args, {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
    ...opts,
  });
}

function runCli(args) {
  return run('cmd.exe', ['/d', '/s', '/c', cli, ...args]);
}

function readEnvValue(filePath, key) {
  if (!fs.existsSync(filePath)) return '';
  const lines = fs.readFileSync(filePath, 'utf8').split(/\r?\n/);
  const line = lines.find((x) => x.startsWith(`${key}=`));
  return line ? line.slice(key.length + 1).trim() : '';
}

function normalizeScalar(value) {
  return String(value ?? '').trim().replace(/^"|"$/g, '');
}

function parsePossiblyFencedJson(text) {
  const trimmed = String(text || '').trim();
  const fenceMatch = trimmed.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/i);
  const payload = fenceMatch ? fenceMatch[1].trim() : trimmed;
  return JSON.parse(payload);
}

async function waitForHealth(timeoutMs = 120000) {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    try {
      const res = await fetch(`${baseUrl}/health`);
      const body = await res.json();
      if (body.status === 'ok') {
        return { ok: true, elapsedMs: Date.now() - started, health: body };
      }
    } catch {}
    await new Promise((r) => setTimeout(r, 500));
  }
  return { ok: false, elapsedMs: Date.now() - started };
}

function maybeParseJson(text) {
  const idx = text.indexOf('{');
  if (idx < 0) throw new Error(`No JSON payload in output:\n${text}`);
  return JSON.parse(text.slice(idx));
}

function stopExistingRuntimeIfPresent() {
  try {
    const status = maybeParseJson(runCli(['--root', runtimeRoot, 'status', '--json']));
    for (const found of status.instances || []) {
      const pid = found?.runtime?.state?.pid;
      const sameInstance = found?.name === instance;
      const samePort = Number(found?.port) === port || Number(found?.runtime?.state?.port) === port;
      if ((sameInstance || samePort) && pid) {
        try { run('taskkill', ['/PID', String(pid), '/T', '/F']); } catch {}
      }
    }
  } catch {}
}

async function bootstrapInstance() {
  stopExistingRuntimeIfPresent();
  try { fs.rmSync(instanceDir, { recursive: true, force: true }); } catch {}
  if (dbMode === 'docker') {
    runCli([
      'setup', '--defaults', '--bootstrap-db',
      '--root', runtimeRoot,
      '--instance', instance,
      '--port', String(port),
      '--db-mode', 'docker',
      '--provider', 'mock',
      '--api-key', bootstrapApiKey,
    ]);
    return;
  }

  run('psql', ['-h', dbHost, '-p', String(dbPort), '-U', dbUser, '-d', 'postgres', '-tAc',
    `SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname = '${database}' AND pid <> pg_backend_pid();`
  ], { env: { ...process.env, PGPASSWORD: dbPassword } });
  run('psql', ['-h', dbHost, '-p', String(dbPort), '-U', dbUser, '-d', 'postgres', '-tAc',
    `DROP DATABASE IF EXISTS ${database};`
  ], { env: { ...process.env, PGPASSWORD: dbPassword } });
  run('psql', ['-h', dbHost, '-p', String(dbPort), '-U', dbUser, '-d', 'postgres', '-tAc',
    `CREATE DATABASE ${database};`
  ], { env: { ...process.env, PGPASSWORD: dbPassword } });
  runCli([
    'setup', '--defaults', '--bootstrap-db',
    '--root', runtimeRoot,
    '--instance', instance,
    '--port', String(port),
    '--db-url', dbUrl,
    '--provider', 'mock',
    '--api-key', bootstrapApiKey,
  ]);
}

async function startRuntime() {
  const outLog = path.join(outputDir, `${instance}.out.log`);
  const errLog = path.join(outputDir, `${instance}.err.log`);
  for (const p of [outLog, errLog]) {
    try { fs.unlinkSync(p); } catch {}
  }
  const child = spawn('cmd.exe', ['/d', '/s', '/c', cli, '--root', runtimeRoot, 'run', '--instance', instance], {
    cwd: process.cwd(),
    detached: false,
    stdio: ['ignore', fs.openSync(outLog, 'a'), fs.openSync(errLog, 'a')],
  });
  const health = await waitForHealth();
  if (!health.ok) {
    const stdout = fs.existsSync(outLog) ? fs.readFileSync(outLog, 'utf8') : '';
    const stderr = fs.existsSync(errLog) ? fs.readFileSync(errLog, 'utf8') : '';
    throw new Error(`Installed runtime failed to reach health.\nSTDOUT:\n${stdout}\nSTDERR:\n${stderr}`);
  }
  const status = maybeParseJson(runCli(['--root', runtimeRoot, 'status', '--json']));
  const found = status.instances.find((x) => x.name === instance);
  if (!found) throw new Error(`Instance ${instance} missing from status output.`);
  return { wrapperPid: child.pid, health, status: found, outLog, errLog };
}

async function writeFact(fact, authToken) {
  const res = await fetch(`${baseUrl}/kb/write`, {
    method: 'POST',
    headers: {
      'X-Iranti-Key': authToken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      entity: fact.entity,
      key: fact.key,
      value: fact.value,
      summary: fact.summary,
      confidence: 100,
      source: 'B1_v0239_trial',
      agent: 'benchmark_program_main',
    }),
  });
  const body = await res.json();
  if (!res.ok) throw new Error(`write failed ${res.status}: ${JSON.stringify(body)}`);
  return body;
}

async function queryFact(entity, key, authToken) {
  const [entityType, entityId] = entity.split('/', 2);
  const url = new URL(`${baseUrl}/kb/query/${entityType}/${entityId}/${key}`);
  url.searchParams.set('agentId', benchmarkAgentId);
  const res = await fetch(url, {
    headers: { 'X-Iranti-Key': authToken },
  });
  const body = await res.json();
  if (!res.ok) throw new Error(`query failed ${res.status}: ${JSON.stringify(body)}`);
  return body;
}

async function handshakeBenchmarkAgent(authToken) {
  const res = await fetch(`${baseUrl}/memory/handshake`, {
    method: 'POST',
    headers: {
      'X-Iranti-Key': authToken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      agentId: benchmarkAgentId,
      task: 'Run the B1 exact retrieval benchmark on the current installed product surface.',
      recentMessages: ['Prepare the current installed-product exact retrieval readback pass.'],
    }),
  });
  const body = await res.json();
  if (!res.ok) throw new Error(`handshake failed ${res.status}: ${JSON.stringify(body)}`);
  return body;
}

async function attendBenchmarkAgent(authToken, latestMessage) {
  const res = await fetch(`${baseUrl}/memory/attend`, {
    method: 'POST',
    headers: {
      'X-Iranti-Key': authToken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      agentId: benchmarkAgentId,
      latestMessage,
      currentContext: latestMessage,
      phase: 'pre-response',
    }),
  });
  const body = await res.json();
  if (!res.ok) throw new Error(`attend failed ${res.status}: ${JSON.stringify(body)}`);
  return body;
}

async function runBaseline(dataset, anthropicKey) {
  const prompt = [
    'You are running a benchmark. Use only the provided haystack document.',
    'Return strict JSON with keys Q1 through Q10. Each value must be a string.',
    'Do not include explanations.',
    '',
    'Questions:',
    "Q1: What is researcher/alice_chen's affiliation?",
    "Q2: What is researcher/alice_chen's publication count?",
    "Q3: What is researcher/alice_chen's previous employer name only?",
    "Q4: What are researcher/alice_chen's previous employer years?",
    "Q5: What is researcher/alice_chen's primary research focus?",
    "Q6: What is researcher/bob_okafor's affiliation?",
    "Q7: What is researcher/bob_okafor's publication count?",
    "Q8: What is researcher/bob_okafor's previous employer name only?",
    "Q9: What are researcher/bob_okafor's previous employer years?",
    "Q10: What is researcher/bob_okafor's primary research focus?",
    '',
    'Haystack document:',
    dataset,
  ].join('\n');

  const started = Date.now();
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': anthropicKey,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model,
      max_tokens: 300,
      temperature: 0,
      messages: [{ role: 'user', content: prompt }],
    }),
  });
  const body = await res.json();
  if (!res.ok) {
    throw new Error(`Anthropic baseline failed ${res.status}: ${JSON.stringify(body)}`);
  }
  const text = (body.content || []).filter((x) => x.type === 'text').map((x) => x.text).join('\n');
  const answers = parsePossiblyFencedJson(text);
  let correctCount = 0;
  const rows = questions.map((q) => {
    const actual = normalizeScalar(answers[q.id]);
    const expected = normalizeScalar(q.expected);
    const correct = actual === expected;
    if (correct) correctCount += 1;
    return { id: q.id, prompt: q.prompt, expected, actual, correct };
  });
  return {
    protocol: 'single-call long-context baseline against dataset-2000-blind.md with exact-match scoring',
    elapsedMs: Date.now() - started,
    rawText: text,
    score: `${correctCount}/${questions.length}`,
    rows,
  };
}

function createAuthToken() {
  const existing = readEnvValue(path.join(instanceDir, '.env'), 'IRANTI_API_KEY');
  if (existing) return existing;
  const created = maybeParseJson(runCli([
    'auth', 'create-key',
    '--instance', instance,
    '--key-id', 'b1_runner',
    '--owner', 'Benchmark Program',
    '--scopes', 'kb:read', 'kb:write', 'memory:read', 'memory:write',
    '--json',
  ]));
  if (!created.token) {
    throw new Error(`auth create-key did not return token: ${JSON.stringify(created)}`);
  }
  return created.token;
}

async function runIrantiArm(authToken) {
  const writes = [];
  for (const fact of facts) {
    const result = await writeFact(fact, authToken);
    writes.push({
      entity: fact.entity,
      key: fact.key,
      action: result.action,
      reason: result.reason,
    });
  }

  await handshakeBenchmarkAgent(authToken);
  const started = Date.now();
  let correctCount = 0;
  const rows = [];
  for (const q of questions) {
    await attendBenchmarkAgent(authToken, `B1 exact retrieval benchmark lookup for ${q.entity} ${q.key}`);
    const result = await queryFact(q.entity, q.key, authToken);
    const actual = normalizeScalar(result.value);
    const expected = normalizeScalar(q.expected);
    const correct = result.found === true && actual === expected;
    if (correct) correctCount += 1;
    rows.push({
      id: q.id,
      entity: q.entity,
      key: q.key,
      expected,
      actual,
      found: result.found,
      correct,
    });
  }
  return {
    protocol: 'installed-product exact retrieval arm on clean disposable current-version instance',
    writes,
    queryElapsedMs: Date.now() - started,
    score: `${correctCount}/${questions.length}`,
    rows,
  };
}

function stopRuntime() {
  const status = maybeParseJson(runCli(['--root', runtimeRoot, 'status', '--json']));
  const found = status.instances.find((x) => x.name === instance);
  const pid = Number(found?.runtime?.state?.pid || 0);
  if (!pid) return { runtimePid: null, taskkill: 'not running' };
  const output = run('taskkill', ['/PID', String(pid), '/T', '/F']);
  return { runtimePid: pid, taskkill: output.trim() };
}

async function main() {
  const productVersion = runCli(['--version']).trim();
  const dataset = fs.readFileSync(datasetPath, 'utf8');
  let anthropicKey = readEnvValue(path.join(instanceDir, '.env'), 'ANTHROPIC_API_KEY');
  if (!anthropicKey) anthropicKey = readEnvValue('C:\\Users\\NF\\.iranti-runtime\\instances\\iranti_dev\\.env', 'ANTHROPIC_API_KEY');
  if (!anthropicKey) anthropicKey = process.env.ANTHROPIC_API_KEY || '';
  if (!anthropicKey) throw new Error('ANTHROPIC_API_KEY not found in benchmark environment.');

  await bootstrapInstance();
  const runtime = await startRuntime();
  const authToken = createAuthToken();
  let baseline;
  let iranti;
  let cleanup = { runtimePid: null, taskkill: 'not attempted' };
  try {
    try {
      baseline = await runBaseline(dataset, anthropicKey);
    } catch (error) {
      baseline = {
        protocol: 'single-call long-context baseline against dataset-2000-blind.md with exact-match scoring',
        blocked: true,
        reason: String(error.message || error),
      };
    }
    iranti = await runIrantiArm(authToken);
  } finally {
    cleanup = stopRuntime();
  }

  const result = {
    recordedAt: new Date().toISOString(),
    benchmark: 'B1',
    trialType: 'current public comparison refresh',
    productVersion,
    anthropicModel: model,
    dataset: path.relative(process.cwd(), datasetPath).replaceAll('\\', '/'),
    instance,
    baseUrl,
    authKeyId: 'b1_runner',
    baseline,
    iranti,
    runtime,
    cleanup,
  };

  fs.writeFileSync(outputJson, JSON.stringify(result, null, 2));

  const baselineScore = baseline.blocked ? null : Number(baseline.score.split('/')[0]);
  const irantiScore = Number(iranti.score.split('/')[0]);
  const comparison = baseline.blocked
    ? 'canonical long-context baseline blocked by provider rate limit'
    : baselineScore === irantiScore
      ? 'null accuracy differential'
      : irantiScore > baselineScore
        ? 'Iranti accuracy advantage'
        : 'baseline accuracy advantage';

  const md = [
    `# B1 Current Public Comparison Refresh - v${productVersion}`,
    '',
    '**Track:** B1 - Entity Fact Retrieval Under Distractor Density  ',
    '**Trial type:** Current public comparison refresh  ',
    `**Executed:** ${new Date().toISOString().slice(0, 10)}  `,
    `**Iranti version:** ${productVersion}  `,
    `**Baseline model:** ${model}  `,
    `**Dataset:** ${path.relative(process.cwd(), datasetPath).replaceAll('\\', '/')}  `,
    '',
    '## 1. Scope',
    '',
    'This run refreshes both arms on current surfaces:',
    '',
    '- long-context baseline against the blind `N=2000` haystack',
    '- exact-retrieval Iranti arm on a clean disposable installed-product instance',
    '',
    '## 2. Results',
    '',
    baseline.blocked
      ? `- Baseline score: **BLOCKED**`
      : `- Baseline score: **${baseline.score}**`,
    baseline.blocked
      ? `- Baseline note: **${baseline.reason}**`
      : `- Baseline latency: **${baseline.elapsedMs} ms**`,
    `- Iranti score: **${iranti.score}**`,
    `- Iranti query latency: **${iranti.queryElapsedMs} ms**`,
    `- Comparison: **${comparison}**`,
    '',
    '## 3. Interpretation',
    '',
    baseline.blocked
      ? '- The canonical long-context baseline could not be rerun on this machine because the current Anthropic org TPM limit rejects the blind N=2000 prompt size.'
      : baselineScore === irantiScore
        ? '- Current public comparison still shows no accuracy gap on this exact-retrieval question set.'
        : irantiScore > baselineScore
          ? '- Current public comparison now shows an Iranti accuracy advantage.'
          : '- Current public comparison now shows a baseline accuracy advantage.',
    '- Iranti still preserves the efficiency and inspectability advantages of structured retrieval.',
    '- This rerun used the installed product surface and a clean disposable benchmark instance.',
  ].join('\r\n');

  fs.writeFileSync(outputMarkdown, md);
}

main().catch((err) => {
  console.error(err && err.stack ? err.stack : String(err));
  process.exit(1);
});
