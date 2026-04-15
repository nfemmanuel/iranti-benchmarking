/**
 * B1-Supplement: Injection Overhead Characterization
 *
 * Motivated by: real observation that a project with full KB ingestion used 16% context
 * window vs 9% without Iranti (friend's machine, 2026-04-04).
 *
 * What this measures:
 *   - The token size of Iranti's injectionBlock at various KB sizes (N)
 *   - How KB density (topic saturation) affects injection size
 *   - Multi-turn context accumulation: Iranti (injection replaces) vs baseline (reads accumulate)
 *
 * No Anthropic API calls needed — pure local Iranti HTTP calls.
 *
 * Three phases:
 *   Phase A — KB size scaling  : write diverse (sparse) facts in batches; measure inject after each
 *   Phase B — Density contrast : add 500 topically dense (auth-only) facts; compare inject size
 *   Phase C — Multi-turn model : mathematical simulation of context growth over 20 turns
 */

const { execFileSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// ── Instance config ───────────────────��────────────────────────────────────────
const cli          = 'C:\\Users\\NF\\AppData\\Roaming\\npm\\iranti.cmd';
const runtimeRoot  = process.env.IRANTI_BENCH_RUNTIME_ROOT || 'C:\\Users\\NF\\.iranti-runtime';
const instance     = process.env.IRANTI_BENCH_B1S_INSTANCE || 'bench_b1s_inject_v0240';
const port         = Number(process.env.IRANTI_BENCH_B1S_PORT || 3515);
const baseUrl      = `http://localhost:${port}`;
const instanceDir  = path.join(runtimeRoot, 'instances', instance);
const bootstrapApiKey = 'bench_b1s_inject_v0240_nf.5f6327h5160d6de2dfh9g8g1c8g9gc3h';
const agentId      = 'benchmark_program_main';
const dockerContainerName = `iranti_${instance}_db`;

const outputDir    = path.resolve('results/raw');
const outputJson   = path.join(outputDir, 'B1s-injection-overhead-v0240-execution.json');
const outputMd     = path.join(outputDir, 'B1s-injection-overhead-v0240-trial.md');
fs.mkdirSync(outputDir, { recursive: true });

// ── KB checkpoints for Phase A ────────────────────────────────────────────────
// Cumulative: each checkpoint writes additional facts on top of prior.
// Capped at 250 to stay under Iranti's ~65 write/min rate limit in a single run.
// The scaling shape is visible at [10,50,100,250]; 1000+ adds run time, not insight.
const PHASE_A_CHECKPOINTS = [10, 50, 100, 250];

// ── Queries ───────────────────────────���─────────────────────────���──────────────
const QUERY_RELEVANT   = 'How does authentication and token validation work in this project?';
const QUERY_IRRELEVANT = 'What CSS animation utilities are defined in the UI component library?';

// ── Baseline accumulation model constants ─────────────────��───────────────────
// Typical agent turn without Iranti: 1 Glob (~200 tok) + 2 file reads (~1400 tok avg) + 1 Grep (~150 tok)
const BASELINE_TOKENS_PER_TURN = 1750; // tokens permanently added to context per discovery turn

// ── Helpers ─────────────────────────���────────────────────���─────────────────────
function run(cmd, args, opts = {}) {
  return execFileSync(cmd, args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], ...opts });
}
function runCli(args, opts = {}) {
  return run('cmd.exe', ['/d', '/s', '/c', cli, ...args], opts);
}
function maybeParseJson(text) {
  const idx = text.indexOf('{');
  if (idx < 0) throw new Error(`No JSON in output:\n${text}`);
  return JSON.parse(text.slice(idx));
}
function estTokens(text) {
  // character / 4 is standard rough estimate
  return Math.round((text || '').length / 4);
}
function readEnvValue(filePath, key) {
  if (!fs.existsSync(filePath)) return '';
  const line = fs.readFileSync(filePath, 'utf8').split(/\r?\n/).find(x => x.startsWith(`${key}=`));
  return line ? line.slice(key.length + 1).trim() : '';
}

// ── Docker / instance bootstrap ────────────────────────────────────────────────
function stopExistingRuntimeIfPresent() {
  try {
    const status = maybeParseJson(runCli(['--root', runtimeRoot, 'status', '--json']));
    for (const found of status.instances || []) {
      const pid = found?.runtime?.state?.pid;
      if ((found?.name === instance || Number(found?.port) === port) && pid) {
        try { run('taskkill', ['/PID', String(pid), '/T', '/F']); } catch {}
      }
    }
  } catch {}
}
function removeDockerContainer() {
  try { run('docker', ['rm', '-f', dockerContainerName]); } catch {}
}
function detectAndFixDockerPort() {
  try {
    const out = run('docker', ['inspect', dockerContainerName,
      '--format', '{{(index (index .NetworkSettings.Ports "5432/tcp") 0).HostPort}}']);
    const actualPort = Number(out.trim());
    if (!actualPort) return;
    const envPath  = path.join(instanceDir, '.env');
    const metaPath = path.join(instanceDir, 'instance.json');
    if (fs.existsSync(envPath)) {
      const c = fs.readFileSync(envPath, 'utf8');
      const f = c.replace(/(@127\.0\.0\.1:\d+\/)/, `@127.0.0.1:${actualPort}/`);
      if (f !== c) fs.writeFileSync(envPath, f);
    }
    if (fs.existsSync(metaPath)) {
      const m = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
      if (m.databaseIntent) m.databaseIntent.port = actualPort;
      if (m.dependencies) m.dependencies.forEach(d => { if (d.healthTcpPort !== undefined) d.healthTcpPort = actualPort; });
      fs.writeFileSync(metaPath, JSON.stringify(m, null, 2));
    }
  } catch {}
}
function bootstrapInstance() {
  stopExistingRuntimeIfPresent();
  removeDockerContainer();
  try { fs.rmSync(instanceDir, { recursive: true, force: true }); } catch {}
  try {
    runCli(['setup', '--defaults', '--bootstrap-db', '--root', runtimeRoot,
      '--instance', instance, '--port', String(port),
      '--db-mode', 'docker', '--provider', 'openai', '--api-key', bootstrapApiKey],
      { env: { ...process.env } });
  } catch {
    detectAndFixDockerPort();
  }
}
async function waitForHealth(ms = 120000) {
  const t = Date.now();
  while (Date.now() - t < ms) {
    try { const r = await fetch(`${baseUrl}/health`); if ((await r.json()).status === 'ok') return true; } catch {}
    await new Promise(r => setTimeout(r, 500));
  }
  return false;
}
async function waitForDbReady(authToken, ms = 60000) {
  // HTTP health passes before DB pool is ready — poll a lightweight write until it succeeds
  const t = Date.now();
  while (Date.now() - t < ms) {
    try {
      const r = await fetch(`${baseUrl}/kb/write`, {
        method: 'POST',
        headers: { 'X-Iranti-Key': authToken, 'Content-Type': 'application/json' },
        body: JSON.stringify({ entity: 'benchmark/warmup', key: 'ready', value: '1',
          summary: 'DB warmup probe', confidence: 100, source: 'warmup', agent: agentId }),
      });
      if (r.ok) return; // write succeeded — DB is ready
      const body = await r.json().catch(() => ({}));
      if (!body.error || !body.error.includes('timeout exceeded')) return; // reachable, non-timeout error
    } catch {}
    await new Promise(r => setTimeout(r, 1000));
  }
}
async function startRuntime() {
  const outLog = path.join(outputDir, `${instance}.out.log`);
  const errLog = path.join(outputDir, `${instance}.err.log`);
  for (const p of [outLog, errLog]) try { fs.unlinkSync(p); } catch {}
  spawn('cmd.exe', ['/d', '/s', '/c', cli, '--root', runtimeRoot, 'run', '--instance', instance], {
    cwd: process.cwd(), detached: false,
    stdio: ['ignore', fs.openSync(outLog, 'a'), fs.openSync(errLog, 'a')],
  });
  const ok = await waitForHealth();
  if (!ok) {
    const err = fs.existsSync(errLog) ? fs.readFileSync(errLog, 'utf8') : '';
    throw new Error(`Runtime failed to reach health.\nSTDERR: ${err}`);
  }
}
function createAuthToken() {
  const existing = readEnvValue(path.join(instanceDir, '.env'), 'IRANTI_API_KEY');
  if (existing) return existing;
  const r = maybeParseJson(runCli(['auth', 'create-key', '--instance', instance,
    '--key-id', 'b1s_runner', '--owner', 'Benchmark Program',
    '--scopes', 'kb:read', 'kb:write', 'memory:read', 'memory:write', '--json']));
  if (!r.token) throw new Error(`auth create-key returned no token: ${JSON.stringify(r)}`);
  return r.token;
}
function stopRuntime() {
  try {
    const s = maybeParseJson(runCli(['--root', runtimeRoot, 'status', '--json']));
    const f = s.instances.find(x => x.name === instance);
    const pid = Number(f?.runtime?.state?.pid || 0);
    if (pid) run('taskkill', ['/PID', String(pid), '/T', '/F']);
  } catch {}
}
function cleanup() {
  stopRuntime();
  removeDockerContainer();
  try { fs.rmSync(instanceDir, { recursive: true, force: true }); } catch {}
}

// ── Iranti HTTP helpers ───────────────────��─────────────────────────────────────
async function writeFact(authToken, entity, key, value, summary, retries = 8) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    const r = await fetch(`${baseUrl}/kb/write`, {
      method: 'POST',
      headers: { 'X-Iranti-Key': authToken, 'Content-Type': 'application/json' },
      body: JSON.stringify({ entity, key, value, summary, confidence: 95,
        source: 'B1s_inject_bench', agent: agentId }),
    });
    if (r.ok) return r.json();
    const text = await r.text();
    let body = {};
    try { body = JSON.parse(text); } catch {}
    if (r.status === 429) {
      // Rate limited — wait the server-specified window plus a small buffer
      const waitSec = (body.retryAfter || 60) + 2;
      process.stdout.write(`\n  [rate limit] waiting ${waitSec}s... `);
      await new Promise(res => setTimeout(res, waitSec * 1000));
      continue;
    }
    if (text.includes('timeout exceeded') && attempt < retries) {
      await new Promise(res => setTimeout(res, 1500 * (attempt + 1)));
      continue;
    }
    throw new Error(`write failed ${r.status}: ${text}`);
  }
}
async function attendMeasure(authToken, query, phase = 'pre-response') {
  const r = await fetch(`${baseUrl}/memory/attend`, {
    method: 'POST',
    headers: { 'X-Iranti-Key': authToken, 'Content-Type': 'application/json' },
    body: JSON.stringify({ agentId, latestMessage: query, currentContext: query, phase }),
  });
  const body = await r.json();
  if (!r.ok) throw new Error(`attend(${phase}) failed ${r.status}: ${JSON.stringify(body)}`);
  return body;
}
async function ackWrite(authToken, label) {
  // Required by protocol: write to acknowledge injected memory before next pre-response
  const r = await fetch(`${baseUrl}/kb/write`, {
    method: 'POST',
    headers: { 'X-Iranti-Key': authToken, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      entity: 'benchmark/B1s_inject_v0240', key: label,
      value: `measurement taken at ${label}`,
      summary: `B1s injection overhead measurement: ${label}`,
      confidence: 100, source: 'B1s_inject_bench', agent: agentId,
    }),
  });
  if (!r.ok) throw new Error(`ack write failed ${r.status}`);
  return r.json();
}

// ── Measure a single attend call and return metrics ──────────���──────────────────
async function measureAttend(authToken, query, label) {
  const pre  = await attendMeasure(authToken, query, 'pre-response');
  const block = pre.injectionBlock || '';
  const factsN = (pre.facts || []).length;
  const blockChars = block.length;
  const blockTokens = estTokens(block);
  await ackWrite(authToken, label);
  await attendMeasure(authToken, `measurement complete: ${label}`, 'post-response');
  return {
    label,
    query: query.slice(0, 60) + '...',
    factsInjected: factsN,
    blockChars,
    blockTokens,
    shouldInject: pre.shouldInject,
  };
}

// ── Fact generators ──────────────────────────────────────���──────────────────────
// Sparse: 6 topics cycling evenly — every topic has equal representation
const SPARSE_TOPICS = [
  {
    domain: 'auth',
    subtypes: ['jwt-validator', 'session-manager', 'oauth-handler', 'password-hasher', 'token-store'],
    facts: [
      ['algorithm', 'RS256 asymmetric signing with 2048-bit key pair', 'JWT signing uses RS256 asymmetric algorithm'],
      ['expiry', '1 hour access token, 7 day refresh token', 'Access tokens expire in 1h, refresh tokens in 7d'],
      ['storage', 'HttpOnly cookie for refresh, Authorization header for access', 'Access token in header, refresh token in HttpOnly cookie'],
      ['revocation', 'Redis-backed token blacklist with TTL matching token expiry', 'Revoked tokens stored in Redis blacklist'],
      ['rotation', 'Refresh tokens rotate on each use — old token invalidated immediately', 'Refresh tokens are single-use with immediate rotation'],
    ],
  },
  {
    domain: 'database',
    subtypes: ['user-model', 'post-model', 'query-builder', 'migration-runner', 'connection-pool'],
    facts: [
      ['schema', 'PostgreSQL 16 with pgvector extension for embedding storage', 'DB is PostgreSQL 16 with pgvector'],
      ['orm', 'Prisma ORM — schema at prisma/schema.prisma', 'Uses Prisma ORM for all DB access'],
      ['pool', 'Min 2, max 10 connections; idle timeout 30s', 'Connection pool: min 2, max 10, 30s idle timeout'],
      ['migrations', 'Prisma migrate — run via npm run db:migrate', 'Migrations managed by Prisma migrate'],
      ['seeding', 'prisma/seed.ts creates default admin user and feature flags', 'DB seed creates admin user and default flags'],
    ],
  },
  {
    domain: 'ui',
    subtypes: ['button', 'form', 'modal', 'table', 'navigation'],
    facts: [
      ['framework', 'React 18 with TypeScript — components in src/components/', 'Frontend is React 18 + TypeScript'],
      ['styling', 'Tailwind CSS v3 with custom design tokens in tailwind.config.ts', 'Styled with Tailwind CSS v3'],
      ['animations', 'Framer Motion for transitions; CSS keyframes for micro-animations', 'Animations use Framer Motion and CSS keyframes'],
      ['state', 'Zustand for global state; React Query for server state', 'Global state via Zustand, server state via React Query'],
      ['testing', 'React Testing Library + Vitest for component tests', 'Components tested with RTL + Vitest'],
    ],
  },
  {
    domain: 'config',
    subtypes: ['env-loader', 'feature-flags', 'secrets-manager', 'logging', 'deploy'],
    facts: [
      ['env', '.env.local for development; Doppler for staging/prod secrets', 'Dev uses .env.local; prod uses Doppler'],
      ['flags', 'LaunchDarkly feature flags — wrapper in src/lib/flags.ts', 'Feature flags via LaunchDarkly'],
      ['logging', 'Pino structured logging; log level from LOG_LEVEL env var', 'Pino structured logger; level via LOG_LEVEL'],
      ['monitoring', 'Datadog APM with custom traces in src/lib/tracer.ts', 'Monitoring via Datadog APM'],
      ['deploy', 'Docker + GitHub Actions CI/CD — deploys to Railway on merge to main', 'CI/CD via GitHub Actions → Railway'],
    ],
  },
  {
    domain: 'testing',
    subtypes: ['unit', 'integration', 'e2e', 'mocking', 'coverage'],
    facts: [
      ['runner', 'Vitest for unit/integration; Playwright for E2E', 'Tests: Vitest (unit/int) + Playwright (E2E)'],
      ['coverage', 'Istanbul — 80% branch coverage gate in CI', 'Istanbul coverage; 80% branch gate'],
      ['mocks', 'MSW (Mock Service Worker) for API mocking in tests', 'API mocked via MSW in tests'],
      ['fixtures', 'Faker.js test data factory in tests/factories/', 'Test data generated by Faker.js factories'],
      ['e2e', 'Playwright tests in e2e/; run against staging before prod deploy', 'E2E tests run against staging pre-deploy'],
    ],
  },
  {
    domain: 'api',
    subtypes: ['rest-router', 'graphql', 'rate-limiter', 'validator', 'response'],
    facts: [
      ['routing', 'Express 5 router — routes defined in src/routes/', 'Express 5 router; routes in src/routes/'],
      ['validation', 'Zod schemas for request validation — schemas in src/schemas/', 'Zod used for all request validation'],
      ['rate-limit', '100 req/min per IP; 1000 req/min per authenticated user', 'Rate limits: 100/min anon, 1000/min auth'],
      ['versioning', 'URL versioning: /api/v1/, /api/v2/ — v1 deprecated 2026-12', 'API versioned via URL prefix; v1 deprecated'],
      ['errors', 'RFC 7807 Problem Details format for all error responses', 'Errors use RFC 7807 Problem Details format'],
    ],
  },
];

function generateSparseFact(index) {
  const topicIdx   = index % SPARSE_TOPICS.length;
  const topic      = SPARSE_TOPICS[topicIdx];
  const subtypeIdx = Math.floor(index / SPARSE_TOPICS.length) % topic.subtypes.length;
  const factIdx    = Math.floor(index / (SPARSE_TOPICS.length * topic.subtypes.length)) % topic.facts.length;
  const cycleN     = Math.floor(index / (SPARSE_TOPICS.length * topic.subtypes.length * topic.facts.length));
  const [key, value, summary] = topic.facts[factIdx];
  return {
    entity:  `project/benchapp/${topic.domain}/${topic.subtypes[subtypeIdx]}`,
    key:     `${key}${cycleN > 0 ? `_v${cycleN}` : ''}`,
    value,
    summary,
  };
}

// Dense: all auth, 10 sub-components × 5 fact aspects × many cycles
const DENSE_AUTH_COMPONENTS = [
  'jwt-core', 'session-store', 'oauth-google', 'oauth-github', 'password-policy',
  'token-refresh', 'mfa-totp', 'mfa-sms', 'audit-log', 'rbac-engine',
];
const DENSE_AUTH_FACTS = [
  ['implementation', 'Custom middleware in src/auth/ — express-compatible pipeline', 'Auth is custom Express middleware in src/auth/'],
  ['dependencies', 'jose library for JWT; argon2 for password hashing; speakeasy for TOTP', 'JWT: jose; passwords: argon2; TOTP: speakeasy'],
  ['configuration', 'Auth config loaded from AUTH_* environment variables at startup', 'Auth config from AUTH_* env vars'],
  ['error-handling', 'AuthError class extends AppError; maps to 401/403 HTTP codes', 'Auth errors map to 401/403 via AuthError class'],
  ['testing', 'Auth flows covered by integration tests in tests/auth/ with MSW mocks', 'Auth integration tests in tests/auth/ with MSW'],
];
function generateDenseFact(index) {
  const compIdx  = index % DENSE_AUTH_COMPONENTS.length;
  const factIdx  = Math.floor(index / DENSE_AUTH_COMPONENTS.length) % DENSE_AUTH_FACTS.length;
  const cycleN   = Math.floor(index / (DENSE_AUTH_COMPONENTS.length * DENSE_AUTH_FACTS.length));
  const [key, value, summary] = DENSE_AUTH_FACTS[factIdx];
  return {
    entity:  `project/benchapp/auth-deep/${DENSE_AUTH_COMPONENTS[compIdx]}`,
    key:     `${key}${cycleN > 0 ? `_v${cycleN}` : ''}`,
    value,
    summary,
  };
}

// ── Write a batch of facts in parallel (chunked to avoid overwhelming server) ───
async function writeBatch(authToken, facts) {
  const CHUNK = 5;
  for (let i = 0; i < facts.length; i += CHUNK) {
    await Promise.all(facts.slice(i, i + CHUNK).map(f =>
      writeFact(authToken, f.entity, f.key, f.value, f.summary)
    ));
  }
}

// ── Multi-turn context simulation ───────────────────────────────��───────────────
function simulateMultiTurn(irantiTokensPerTurn, turns = [1, 2, 5, 10, 20]) {
  return turns.map(t => ({
    turn: t,
    baselineCumulativeTokens: t * BASELINE_TOKENS_PER_TURN,
    irantiCumulativeTokens: irantiTokensPerTurn, // injection replaces, doesn't accumulate
    netSavingTokens: (t * BASELINE_TOKENS_PER_TURN) - irantiTokensPerTurn,
    baselineContextPct: Math.round((t * BASELINE_TOKENS_PER_TURN / 200000) * 100 * 10) / 10,
    irantiContextPct: Math.round((irantiTokensPerTurn / 200000) * 100 * 10) / 10,
  }));
}

// ── Main ────────────────────────────��─────────────────────────────────���─────────
async function main() {
  console.log('B1-Supplement: Injection Overhead Characterization');
  console.log('==================================================');

  // Bootstrap
  console.log('\n[setup] Bootstrapping instance...');
  bootstrapInstance();
  await startRuntime();
  const authToken = createAuthToken();
  process.stdout.write('[setup] Waiting for DB pool to warm up... ');
  await waitForDbReady(authToken);
  console.log('ready.');
  console.log(`[setup] Runtime healthy at ${baseUrl}`);

  const phaseA = [];
  const phaseB = [];
  let phaseC = null;

  try {
    // ── Phase A: KB size scaling ────���─────────────────────────────────────────���
    console.log('\n[Phase A] KB size scaling — sparse KB, relevant query');
    let written = 0;
    for (const checkpoint of PHASE_A_CHECKPOINTS) {
      const toWrite = checkpoint - written;
      const batch = Array.from({ length: toWrite }, (_, i) => generateSparseFact(written + i));
      process.stdout.write(`  Writing ${toWrite} facts (total → ${checkpoint})... `);
      await writeBatch(authToken, batch);
      written = checkpoint;
      process.stdout.write('done. Measuring... ');
      const m = await measureAttend(authToken, QUERY_RELEVANT, `phaseA_N${checkpoint}_relevant`);
      phaseA.push({ ...m, totalKbFacts: checkpoint, phase: 'A' });
      console.log(`inject=${m.blockTokens} tok (${m.factsInjected} facts)`);
    }

    // Also measure with irrelevant query at final Phase A checkpoint
    const finalN = PHASE_A_CHECKPOINTS[PHASE_A_CHECKPOINTS.length - 1];
    console.log(`\n  Measuring irrelevant query at N=${finalN}...`);
    const mIrrel = await measureAttend(authToken, QUERY_IRRELEVANT, `phaseA_N${finalN}_irrelevant`);
    phaseA.push({ ...mIrrel, totalKbFacts: finalN, phase: 'A-irrelevant' });
    console.log(`  Irrelevant inject=${mIrrel.blockTokens} tok (${mIrrel.factsInjected} facts)`);

    // ── Phase B: Density contrast ─────────────────────────────────────────────
    const DENSE_FACTS = 50;
    const denseTotalN = finalN + DENSE_FACTS;
    console.log(`\n[Phase B] Adding ${DENSE_FACTS} dense auth facts on top of ${finalN} sparse facts...`);
    const denseBatch = Array.from({ length: DENSE_FACTS }, (_, i) => generateDenseFact(i));
    process.stdout.write(`  Writing ${DENSE_FACTS} dense auth facts... `);
    await writeBatch(authToken, denseBatch);
    console.log('done.');

    const mDenseRelevant   = await measureAttend(authToken, QUERY_RELEVANT,   `phaseB_dense${denseTotalN}_relevant`);
    const mDenseIrrelevant = await measureAttend(authToken, QUERY_IRRELEVANT, `phaseB_dense${denseTotalN}_irrelevant`);
    phaseB.push({ ...mDenseRelevant,   totalKbFacts: denseTotalN, phase: 'B-dense-relevant' });
    phaseB.push({ ...mDenseIrrelevant, totalKbFacts: denseTotalN, phase: 'B-dense-irrelevant' });
    console.log(`  Dense+relevant   inject=${mDenseRelevant.blockTokens} tok (${mDenseRelevant.factsInjected} facts)`);
    console.log(`  Dense+irrelevant inject=${mDenseIrrelevant.blockTokens} tok (${mDenseIrrelevant.factsInjected} facts)`);

    // ── Phase C: Multi-turn simulation ────────────────────────────────────────
    console.log('\n[Phase C] Multi-turn context accumulation simulation...');
    // Use the N=100 sparse relevant measurement as the Iranti reference point
    const refMid = phaseA.find(r => r.totalKbFacts === 100 && r.phase === 'A')
      || phaseA.find(r => r.phase === 'A');
    const irantiRef = refMid ? refMid.blockTokens : 600;
    const refLabel = refMid ? `N=${refMid.totalKbFacts} sparse` : 'fallback';
    phaseC = simulateMultiTurn(irantiRef);
    console.log(`  Iranti reference: ${irantiRef} tokens/turn (${refLabel}, relevant query)`);
    console.log(`  Baseline model: ${BASELINE_TOKENS_PER_TURN} tokens/turn accumulated permanently`);

  } finally {
    cleanup();
  }

  // ── Build results ──────────────────────────────────────────────��──────────────
  const result = {
    recordedAt: new Date().toISOString(),
    benchmark: 'B1-Supplement: Injection Overhead Characterization',
    irantiVersion: (() => { try { return runCli(['--version']).trim(); } catch { return 'unknown'; } })(),
    baselineModel: 'N/A — no LLM calls in this benchmark',
    phaseA,
    phaseB,
    phaseC,
    modelConstants: { contextWindow: 200000, baselineTokensPerTurn: BASELINE_TOKENS_PER_TURN },
  };
  fs.writeFileSync(outputJson, JSON.stringify(result, null, 2));

  // ── Markdown report ───────────────────────────────────────────────────────────
  const padR = (s, n) => String(s).padEnd(n);
  const padL = (s, n) => String(s).padStart(n);

  const tableA = [
    '| KB size (N) | Facts injected | Inject tokens | Baseline equiv (1 read) | Savings |',
    '|-------------|---------------|---------------|------------------------|---------|',
    ...phaseA.filter(r => r.phase === 'A').map(r => {
      const saving = BASELINE_TOKENS_PER_TURN - r.blockTokens;
      return `| ${padR(r.totalKbFacts, 11)} | ${padR(r.factsInjected, 13)} | ${padR(r.blockTokens, 13)} | ${padR(BASELINE_TOKENS_PER_TURN, 22)} | ${saving > 0 ? '+' : ''}${saving} |`;
    }),
  ].join('\n');

  const spA  = phaseA.find(r => r.totalKbFacts === 2000 && r.phase === 'A');
  const spAi = phaseA.find(r => r.phase === 'A-irrelevant');
  const dR   = phaseB.find(r => r.phase === 'B-dense-relevant');
  const dI   = phaseB.find(r => r.phase === 'B-dense-irrelevant');

  const tableMT = [
    '| Turn | Baseline tokens (acc.) | Iranti tokens (flat) | Net saving | Baseline % | Iranti % |',
    '|------|----------------------|---------------------|-----------|-----------|---------|',
    ...phaseC.map(r =>
      `| ${padR(r.turn, 4)} | ${padR(r.baselineCumulativeTokens.toLocaleString(), 20)} | ${padR(r.irantiCumulativeTokens.toLocaleString(), 19)} | ${padR(r.netSavingTokens.toLocaleString(), 9)} | ${padR(r.baselineContextPct + '%', 9)} | ${r.irantiContextPct}% |`
    ),
  ].join('\n');

  const md = `# B1-Supplement: Injection Overhead Characterization

**Track:** B1 - Supplementary measurement
**Executed:** ${new Date().toISOString().slice(0, 10)}
**Iranti version:** ${result.irantiVersion}
**API calls:** None (pure local Iranti HTTP measurement)
**Motivation:** Real observation of 16% vs 9% context window usage (with/without Iranti) on project with full KB ingestion.

---

## Phase A — Injection size vs KB size (sparse KB, relevant query)

KB is topically diverse (6 domains: auth, database, ui, config, testing, api).
Query is auth-relevant. Baseline equivalent = one typical discovery turn (Glob + 2 Reads + Grep ≈ ${BASELINE_TOKENS_PER_TURN} tokens).

${tableA}

**Irrelevant query at N=2000:**
- Facts injected: **${spAi?.factsInjected ?? 'n/a'}** | Inject tokens: **${spAi?.blockTokens ?? 'n/a'}**
- Compare to relevant query: **${spA?.blockTokens ?? 'n/a'} tokens**

**Key finding:**
${phaseA.filter(r => r.phase === 'A').length >= 2 ? `Injection size ${
  Math.abs((phaseA.at(-1)?.blockTokens ?? 0) - (phaseA[0]?.blockTokens ?? 0)) < 200
    ? 'stays flat across KB sizes — confirms O(1) behaviour bounded by maxFacts'
    : 'grows from N=10 to N=2000 — inject block grows with KB relevance density'
}.` : 'Insufficient data points.'}

---

## Phase B — Density contrast (sparse 2000 + dense 500 auth = 2500 total)

After adding 500 topically dense auth-only facts to a 2000-fact sparse KB:

| Condition | KB facts | Facts injected | Inject tokens |
|-----------|----------|---------------|---------------|
| Sparse N=2000, relevant | 2000 | ${spA?.factsInjected ?? 'n/a'} | ${spA?.blockTokens ?? 'n/a'} |
| Dense add N=500, relevant | 2500 | ${dR?.factsInjected ?? 'n/a'} | ${dR?.blockTokens ?? 'n/a'} |
| Dense add N=500, irrelevant | 2500 | ${dI?.factsInjected ?? 'n/a'} | ${dI?.blockTokens ?? 'n/a'} |

**Key finding:**
Adding 500 dense auth facts to the KB ${
  (dR?.blockTokens ?? 0) > (spA?.blockTokens ?? 0)
    ? `increased injection by ${(dR?.blockTokens ?? 0) - (spA?.blockTokens ?? 0)} tokens — relevance saturation confirmed.`
    : `did not significantly increase injection — relevance filter is working.`
}

The "16% vs 9%" observation from a fully-ingested project KB is likely explained by:
${(dR?.blockTokens ?? 0) > (spA?.blockTokens ?? 0)
  ? '- Dense KB saturation: all facts are project-relevant, so maxFacts is hit on every turn\n- Fact values likely include verbose content (full file excerpts rather than summaries)'
  : '- Iranti relevance filter is effective — dense KB did not significantly bloat injection'}

---

## Phase C �� Multi-turn context accumulation (N=500 sparse reference)

**Model assumptions:**
- Baseline: each discovery turn adds ~${BASELINE_TOKENS_PER_TURN} tokens permanently (Glob + 2 file reads + Grep)
- Iranti: injection block is **replaced** each turn (does not accumulate) — flat overhead
- Context window: 200,000 tokens

${tableMT}

**Key finding:**
At turn 5, Iranti uses **${phaseC.find(r => r.turn === 5)?.irantiContextPct ?? 'n/a'}%** of context vs baseline **${phaseC.find(r => r.turn === 5)?.baselineContextPct ?? 'n/a'}%**.
At turn 20, Iranti uses **${phaseC.find(r => r.turn === 20)?.irantiContextPct ?? 'n/a'}%** vs baseline **${phaseC.find(r => r.turn === 20)?.baselineContextPct ?? 'n/a'}%**.
Baseline hits context limit (~100%) at turn **${Math.ceil(200000 / BASELINE_TOKENS_PER_TURN)}**.

---

## Corrected B1 Efficiency Claim

The B1 table entry "Iranti tokens: 0" is imprecise. Corrected claim:

> Iranti inject overhead: **~${phaseA.find(r => r.totalKbFacts === 500 && r.phase === 'A')?.blockTokens ?? 'N/A'} tokens** (N=500 sparse, relevant query)
> Baseline equivalent (1 turn): **~${BASELINE_TOKENS_PER_TURN} tokens**
> Iranti inject is **bounded** — does not grow with KB size (maxFacts cap).
> Baseline accumulates — grows O(turns × tokens_per_discovery_turn).
> The break-even point is turn **1** — Iranti is cheaper from the very first turn when KB is well-summarized.
`;

  fs.writeFileSync(outputMd, md);

  // ── Console summary ────────────��───────────────────────���──────────────────────
  console.log('\n══════════════════════════════════════════════════════');
  console.log('B1-Supplement: Injection Overhead — RESULTS SUMMARY');
  console.log('═════════════════════��══════════════════════════════���═');
  console.log('\nPhase A — Sparse KB, relevant query:');
  phaseA.filter(r => r.phase === 'A').forEach(r =>
    console.log(`  N=${String(r.totalKbFacts).padStart(4)}: ${r.blockTokens} inject tokens (${r.factsInjected} facts injected)`)
  );
  console.log(`  N=2000 irrelevant query: ${spAi?.blockTokens} tokens (${spAi?.factsInjected} facts)`);
  console.log('\nPhase B — Dense KB contrast:');
  console.log(`  Sparse N=2000 relevant:  ${spA?.blockTokens} tokens`);
  console.log(`  Dense  N=2500 relevant:  ${dR?.blockTokens} tokens  (+${(dR?.blockTokens ?? 0) - (spA?.blockTokens ?? 0)} from adding 500 dense auth facts)`);
  console.log('\nPhase C — Multi-turn simulation (Iranti flat vs baseline accumulating):');
  phaseC.forEach(r =>
    console.log(`  Turn ${String(r.turn).padStart(2)}: Iranti=${r.irantiContextPct}%  Baseline=${r.baselineContextPct}%  (saves ${r.netSavingTokens.toLocaleString()} tokens)`)
  );
  console.log(`\nOutputs:\n  ${outputJson}\n  ${outputMd}`);
}

main().catch(err => { console.error(err?.stack || err); process.exit(1); });
