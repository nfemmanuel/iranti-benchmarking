/**
 * B2a: Summary Accuracy Benchmark — v0.3.9
 *
 * Motivated by: A1 change (v0.3.9) removed value JSON from injection blocks.
 * Agents now see only summary text. This benchmark asks:
 *   (a) Do summaries capture enough of the value content to answer recall questions?
 *   (b) Which facts are at HIGH RISK of accuracy loss under summary-only injection?
 *
 * Two phases:
 *   Phase A — Static completeness: for each fact, score % of value keywords found in summary.
 *             No LLM, no running instance. Pure text analysis.
 *   Phase B — LLM recall test: inject summary-only block, ask recall questions, score answers.
 *             Requires: IRANTI_BENCH_LLM=1 and IRANTI_BENCH_URL (running instance + proxy scope).
 *             Falls back to Phase A only if unavailable.
 *
 * Outputs:
 *   results/raw/B2a-summary-accuracy-v039-execution.json
 *   results/raw/B2a-summary-accuracy-v039-trial.md
 */

'use strict';
const fs = require('fs');
const path = require('path');

const BENCH_URL = process.env.IRANTI_BENCH_URL || 'http://localhost:3500';
const BENCH_API_KEY = process.env.IRANTI_BENCH_API_KEY || '';
const RUN_LLM = process.env.IRANTI_BENCH_LLM === '1' && BENCH_API_KEY.length > 0;
const LLM_MODEL = process.env.IRANTI_BENCH_LLM_MODEL || 'claude-haiku-4-5-20251001';

const outputDir = path.resolve(__dirname, '..', 'results', 'raw');
fs.mkdirSync(outputDir, { recursive: true });
const outputJson = path.join(outputDir, 'B2a-summary-accuracy-v039-execution.json');
const outputMd = path.join(outputDir, 'B2a-summary-accuracy-v039-trial.md');

// ---------------------------------------------------------------------------
// Test facts: 20 facts spanning HIGH / MEDIUM / LOW accuracy-risk categories.
// Each fact has: summary (what A1 injects), value (what OLD format included),
// questions (specific recall queries), expected (correct answers, from value).
// ---------------------------------------------------------------------------
const TEST_FACTS = [
  // ── HIGH RISK: value has specific numeric / path info not captured in summary ──
  {
    id: 'F01',
    risk: 'HIGH',
    entityKey: 'project/myapp/auth_config',
    summary: 'JWT authentication config. Uses RS256 signing. Token expiry configured in environment.',
    value: { algorithm: 'RS256', expirySeconds: 3600, issuer: 'myapp.prod', audience: 'myapp-api', keyFile: '/etc/secrets/jwt-public.pem' },
    questions: [
      { q: 'What is the JWT token expiry in seconds?', expected: '3600' },
      { q: 'What is the path to the JWT public key file?', expected: '/etc/secrets/jwt-public.pem' },
    ],
  },
  {
    id: 'F02',
    risk: 'HIGH',
    entityKey: 'project/myapp/db_pool',
    summary: 'PostgreSQL connection pool config. Pool size is environment-dependent. Uses Prisma ORM.',
    value: { maxConnections: 20, minConnections: 2, idleTimeoutMs: 30000, connectionString: 'postgresql://app:***@db.internal:5432/myapp' },
    questions: [
      { q: 'What is the max connection pool size?', expected: '20' },
      { q: 'What is the idle timeout in milliseconds?', expected: '30000' },
    ],
  },
  {
    id: 'F03',
    risk: 'HIGH',
    entityKey: 'project/myapp/rate_limits',
    summary: 'API rate limiting is enforced per API key using a sliding window algorithm.',
    value: { writeRpm: 60, readRpm: 120, burstAllowance: 10, algorithm: 'sliding_window', headerName: 'X-Rate-Limit-Remaining' },
    questions: [
      { q: 'How many write requests per minute are allowed?', expected: '60' },
      { q: 'What HTTP header exposes the remaining rate limit?', expected: 'X-Rate-Limit-Remaining' },
    ],
  },
  {
    id: 'F04',
    risk: 'HIGH',
    entityKey: 'project/myapp/feature_flags',
    summary: 'Feature flags are controlled via environment variables. Some features are in beta.',
    value: { flags: { newDashboard: 'FEATURE_NEW_DASHBOARD', betaSearch: 'FEATURE_BETA_SEARCH', darkMode: 'FEATURE_DARK_MODE' }, defaultEnabled: ['darkMode'] },
    questions: [
      { q: 'What environment variable controls the new dashboard feature?', expected: 'FEATURE_NEW_DASHBOARD' },
      { q: 'Which feature flags are enabled by default?', expected: 'darkMode' },
    ],
  },
  {
    id: 'F05',
    risk: 'HIGH',
    entityKey: 'project/myapp/worker_config',
    summary: 'Background worker processes. Job queue configuration for task processing.',
    value: { workerCount: 4, queueUrl: 'redis://queue.internal:6379/1', maxRetries: 3, retryBackoffMs: 5000, jobTimeoutMs: 120000 },
    questions: [
      { q: 'How many worker processes are configured?', expected: '4' },
      { q: 'What is the job timeout in milliseconds?', expected: '120000' },
    ],
  },
  // ── MEDIUM RISK: summary captures the concept but not all specifics ──────
  {
    id: 'F06',
    risk: 'MEDIUM',
    entityKey: 'project/myapp/logging',
    summary: 'Structured logging uses JSON format. Log level is configurable via LOG_LEVEL env var (default: info). Logs are written to stdout and a rotating file at /var/log/myapp/app.log.',
    value: { format: 'json', defaultLevel: 'info', envVar: 'LOG_LEVEL', logFile: '/var/log/myapp/app.log', rotationDays: 7 },
    questions: [
      { q: 'What is the log file path?', expected: '/var/log/myapp/app.log' },
      { q: 'How many days of log rotation are kept?', expected: '7' },
    ],
  },
  {
    id: 'F07',
    risk: 'MEDIUM',
    entityKey: 'project/myapp/cache_config',
    summary: 'Redis cache with 15-minute TTL for session data. Cache key prefix is "myapp:". Eviction policy is allkeys-lru.',
    value: { host: 'cache.internal', port: 6379, ttlSeconds: 900, keyPrefix: 'myapp:', eviction: 'allkeys-lru', maxMemoryMb: 512 },
    questions: [
      { q: 'What is the cache TTL in seconds?', expected: '900' },
      { q: 'What is the maximum Redis memory in MB?', expected: '512' },
    ],
  },
  {
    id: 'F08',
    risk: 'MEDIUM',
    entityKey: 'project/myapp/email_service',
    summary: 'Email delivery via SendGrid. From address is noreply@myapp.com. Templates are stored in /templates/email. Retry on failure up to 3 times.',
    value: { provider: 'sendgrid', fromAddress: 'noreply@myapp.com', templateDir: '/templates/email', maxRetries: 3, timeoutMs: 10000 },
    questions: [
      { q: 'What is the from email address?', expected: 'noreply@myapp.com' },
      { q: 'What is the email send timeout in milliseconds?', expected: '10000' },
    ],
  },
  {
    id: 'F09',
    risk: 'MEDIUM',
    entityKey: 'project/myapp/search_index',
    summary: 'Full-text search via Elasticsearch. Index name is myapp-v2. Documents are indexed on write with a 500ms debounce. Stale index threshold is 24 hours.',
    value: { host: 'search.internal:9200', indexName: 'myapp-v2', debounceMs: 500, staleThresholdHours: 24, shards: 3, replicas: 1 },
    questions: [
      { q: 'What is the Elasticsearch index name?', expected: 'myapp-v2' },
      { q: 'How long is the indexing debounce in milliseconds?', expected: '500' },
    ],
  },
  {
    id: 'F10',
    risk: 'MEDIUM',
    entityKey: 'project/myapp/upload_limits',
    summary: 'File uploads are limited to 10MB per file, 50MB total per request. Allowed types: jpg, png, gif, pdf, docx. Uploads stored in S3 bucket myapp-uploads-prod.',
    value: { maxFileSizeMb: 10, maxTotalMb: 50, allowedTypes: ['jpg', 'png', 'gif', 'pdf', 'docx'], bucket: 'myapp-uploads-prod', region: 'us-east-1' },
    questions: [
      { q: 'What is the maximum file size in MB?', expected: '10' },
      { q: 'What S3 bucket are uploads stored in?', expected: 'myapp-uploads-prod' },
    ],
  },
  // ── LOW RISK: summary is self-contained; value adds no unique information ─
  {
    id: 'F11',
    risk: 'LOW',
    entityKey: 'project/myapp/auth_middleware_chain',
    summary: 'Authentication middleware chain: (1) authenticate — validates API key hash against database, (2) rateLimitMiddleware — enforces per-key sliding window limits, (3) requireScope — checks RBAC scope for the route. Applied in this order on all protected routes.',
    value: { steps: ['authenticate', 'rateLimitMiddleware', 'requireScope'], order: 'sequential', appliesTo: 'all protected routes' },
    questions: [
      { q: 'What are the three middleware steps in the auth chain?', expected: 'authenticate' },
      { q: 'In what order are the middleware applied?', expected: 'sequential' },
    ],
  },
  {
    id: 'F12',
    risk: 'LOW',
    entityKey: 'project/myapp/deploy_environment',
    summary: 'Production deployment on AWS ECS Fargate. Region: us-east-1. Auto-scaling between 2 and 10 tasks. Rolling deployment with 30-second health check grace period.',
    value: { platform: 'AWS ECS Fargate', region: 'us-east-1', minTasks: 2, maxTasks: 10, deployType: 'rolling', healthCheckGraceSec: 30 },
    questions: [
      { q: 'What AWS region is the production deployment in?', expected: 'us-east-1' },
      { q: 'What is the deployment strategy?', expected: 'rolling' },
    ],
  },
  {
    id: 'F13',
    risk: 'LOW',
    entityKey: 'project/myapp/api_versioning',
    summary: 'API versioning via URL prefix: /v1/ is stable, /v2/ is in active development, /v3/ is experimental. Deprecated /v0/ endpoints return 410 Gone after 2026-06-01.',
    value: { stable: 'v1', active: 'v2', experimental: 'v3', deprecated: { version: 'v0', endOfLife: '2026-06-01', status: 410 } },
    questions: [
      { q: 'Which API version is stable?', expected: 'v1' },
      { q: 'When do v0 endpoints stop working?', expected: '2026-06-01' },
    ],
  },
  {
    id: 'F14',
    risk: 'LOW',
    entityKey: 'project/myapp/health_endpoint',
    summary: 'Health check at GET /health. Returns JSON with status (ok/degraded), version, provider, runtime, authority, and checks (runtimeMetadata, vectorBackend). Public — no authentication required.',
    value: { path: '/health', method: 'GET', auth: false, fields: ['status', 'version', 'provider', 'runtime', 'authority', 'checks'] },
    questions: [
      { q: 'What HTTP method does the health endpoint use?', expected: 'GET' },
      { q: 'Is the health endpoint authenticated?', expected: 'no' },
    ],
  },
  {
    id: 'F15',
    risk: 'LOW',
    entityKey: 'project/myapp/session_storage',
    summary: 'User sessions stored in Redis with 7-day TTL. Session ID is a UUID v4. HttpOnly cookie with SameSite=Strict. Sessions are invalidated on password change.',
    value: { store: 'redis', ttlDays: 7, idFormat: 'uuid-v4', cookieFlags: ['HttpOnly', 'SameSite=Strict'], invalidateOnPasswordChange: true },
    questions: [
      { q: 'What is the session TTL in days?', expected: '7' },
      { q: 'Are sessions invalidated on password change?', expected: 'yes' },
    ],
  },
  // ── STRESS / EDGE CASES ─────────────────────────────────────────────────
  {
    id: 'F16',
    risk: 'HIGH',
    entityKey: 'project/myapp/crypto_config',
    summary: 'Cryptographic configuration for data at rest encryption.',
    value: { algorithm: 'AES-256-GCM', keyDerivation: 'PBKDF2', iterations: 600000, saltBytes: 32, ivBytes: 12, keyFile: '/etc/secrets/master.key' },
    questions: [
      { q: 'What encryption algorithm is used for data at rest?', expected: 'AES-256-GCM' },
      { q: 'How many PBKDF2 iterations are used?', expected: '600000' },
    ],
  },
  {
    id: 'F17',
    risk: 'HIGH',
    entityKey: 'project/myapp/webhook_config',
    summary: 'Webhook delivery configuration. Retries failed deliveries automatically.',
    value: { signingSecret: 'WEBHOOK_SIGNING_SECRET', maxRetries: 5, retryDelayMs: [1000, 5000, 30000, 120000, 600000], timeoutMs: 15000, signatureHeader: 'X-Webhook-Signature' },
    questions: [
      { q: 'What header carries the webhook signature?', expected: 'X-Webhook-Signature' },
      { q: 'What is the webhook delivery timeout in milliseconds?', expected: '15000' },
    ],
  },
  {
    id: 'F18',
    risk: 'MEDIUM',
    entityKey: 'project/myapp/audit_log',
    summary: 'Audit log captures all write operations with user, timestamp, action, resource, and before/after state. Stored in PostgreSQL table audit_events. Retention: 2 years. Read-only via /admin/audit.',
    value: { table: 'audit_events', retention: '2 years', fields: ['userId', 'timestamp', 'action', 'resource', 'before', 'after'], readPath: '/admin/audit', immutable: true },
    questions: [
      { q: 'What database table stores audit events?', expected: 'audit_events' },
      { q: 'Are audit records immutable?', expected: 'yes' },
    ],
  },
  {
    id: 'F19',
    risk: 'LOW',
    entityKey: 'project/myapp/cors_config',
    summary: 'CORS configured to allow requests from myapp.com and staging.myapp.com only. Credentials allowed. Preflight cached for 600 seconds. All standard HTTP methods permitted.',
    value: { origins: ['https://myapp.com', 'https://staging.myapp.com'], credentials: true, maxAge: 600, methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'] },
    questions: [
      { q: 'Are credentials allowed in CORS requests?', expected: 'yes' },
      { q: 'How long is the CORS preflight cached in seconds?', expected: '600' },
    ],
  },
  {
    id: 'F20',
    risk: 'HIGH',
    entityKey: 'project/myapp/payment_gateway',
    summary: 'Payment processing via Stripe. Webhook endpoint for payment events. PCI compliance mode enabled.',
    value: { provider: 'stripe', webhookPath: '/webhooks/stripe', apiVersion: '2024-06-20', currency: 'USD', testMode: false, maxAmountCents: 1000000 },
    questions: [
      { q: 'What is the Stripe webhook path?', expected: '/webhooks/stripe' },
      { q: 'What is the maximum payment amount in cents?', expected: '1000000' },
    ],
  },
];

// ---------------------------------------------------------------------------
// Phase A: Static completeness analysis
// ---------------------------------------------------------------------------
function extractLeafStrings(obj, depth = 0) {
  if (depth > 6) return [];
  const leaves = [];
  if (obj === null || obj === undefined) return leaves;
  if (typeof obj === 'string' && obj.length > 0) return [obj];
  if (typeof obj === 'number' || typeof obj === 'boolean') return [String(obj)];
  if (Array.isArray(obj)) {
    for (const item of obj) leaves.push(...extractLeafStrings(item, depth + 1));
    return leaves;
  }
  if (typeof obj === 'object') {
    for (const v of Object.values(obj)) leaves.push(...extractLeafStrings(v, depth + 1));
    return leaves;
  }
  return leaves;
}

function tokenize(text) {
  return String(text).toLowerCase().split(/[^a-z0-9_.\-\/]+/).filter(t => t.length >= 2);
}

function computeCompleteness(fact) {
  const summaryTokens = new Set(tokenize(fact.summary));
  const valueLeaves = extractLeafStrings(fact.value);
  if (valueLeaves.length === 0) return { score: 1.0, total: 0, found: 0, missed: [] };

  const allValueTokens = [];
  const missed = [];
  let found = 0;

  for (const leaf of valueLeaves) {
    const leafTokens = tokenize(leaf);
    for (const tok of leafTokens) {
      if (tok.length < 2) continue;
      allValueTokens.push(tok);
      if (summaryTokens.has(tok)) {
        found++;
      } else {
        missed.push(tok);
      }
    }
  }

  const total = allValueTokens.length;
  const score = total === 0 ? 1.0 : found / total;
  return { score: Math.round(score * 100) / 100, total, found, missed: [...new Set(missed)].slice(0, 8) };
}

// ---------------------------------------------------------------------------
// Phase B: LLM recall test (optional)
// ---------------------------------------------------------------------------
async function llmRecallTest(fact, injectionMode) {
  const blockLines = [];
  blockLines.push('[Iranti Retrieved Memory]');
  blockLines.push('FACTS:');
  blockLines.push(`- ${fact.id} | entity=${fact.entityKey}`);
  blockLines.push(`  summary: ${fact.summary}`);
  if (injectionMode === 'full' && fact.value) {
    blockLines.push(`  value: ${JSON.stringify(fact.value)}`);
  }

  const blockText = blockLines.join('\n');
  const results = [];

  for (const { q, expected } of fact.questions) {
    const messages = [
      {
        role: 'user',
        content: `${blockText}\n\nBased only on the information above, answer this question in one sentence or less. Do not add information not present above.\n\nQuestion: ${q}`,
      },
    ];

    try {
      const resp = await fetch(`${BENCH_URL}/v1/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${BENCH_API_KEY}`,
        },
        body: JSON.stringify({ model: LLM_MODEL, messages, max_tokens: 100 }),
      });
      const data = await resp.json();
      const answer = (data?.choices?.[0]?.message?.content || '').toLowerCase().trim();
      const hit = answer.includes(expected.toLowerCase());
      results.push({ q, expected, answer, hit, mode: injectionMode });
    } catch (err) {
      results.push({ q, expected, answer: `[ERROR: ${err.message}]`, hit: false, mode: injectionMode });
    }
  }

  return results;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  console.log('B2a: Summary Accuracy Benchmark — v0.3.9');
  console.log('==========================================');
  console.log('');
  console.log(`LLM recall test: ${RUN_LLM ? 'ENABLED (model: ' + LLM_MODEL + ')' : 'DISABLED — Phase A (static) only'}`);
  console.log('');

  // Phase A
  console.log('[Phase A] Static completeness analysis...');
  console.log('');

  const phaseAResults = [];
  const riskGroups = { HIGH: [], MEDIUM: [], LOW: [] };

  for (const fact of TEST_FACTS) {
    const c = computeCompleteness(fact);
    const result = { id: fact.id, risk: fact.risk, entityKey: fact.entityKey, ...c };
    phaseAResults.push(result);
    riskGroups[fact.risk].push(result);

    const bar = '█'.repeat(Math.round(c.score * 10)) + '░'.repeat(10 - Math.round(c.score * 10));
    console.log(`  ${fact.id} [${fact.risk.padEnd(6)}] ${bar} ${Math.round(c.score * 100)}%  (${c.found}/${c.total} tokens found)`);
    if (c.missed.length > 0) {
      console.log(`           missed: ${c.missed.slice(0, 5).join(', ')}`);
    }
  }

  const avgByRisk = {};
  for (const [risk, results] of Object.entries(riskGroups)) {
    avgByRisk[risk] = results.length > 0
      ? Math.round((results.reduce((s, r) => s + r.score, 0) / results.length) * 100) / 100
      : null;
  }

  console.log('');
  console.log('  Summary:');
  for (const [risk, avg] of Object.entries(avgByRisk)) {
    console.log(`    ${risk.padEnd(6)} avg completeness: ${Math.round((avg ?? 0) * 100)}%  (n=${riskGroups[risk].length})`);
  }
  console.log('');

  // Phase B
  const phaseBResults = [];
  let phaseBSummaryOnly = null;
  let phaseBFull = null;

  if (RUN_LLM) {
    console.log('[Phase B] LLM recall test...');
    console.log('');

    for (const fact of TEST_FACTS) {
      process.stdout.write(`  ${fact.id} [${fact.risk}] summary-only...`);
      const summaryResults = await llmRecallTest(fact, 'summary-only');
      process.stdout.write(' full...');
      const fullResults = await llmRecallTest(fact, 'full');
      process.stdout.write(' done\n');
      phaseBResults.push({ factId: fact.id, risk: fact.risk, summaryOnly: summaryResults, full: fullResults });
    }

    const summaryHits = phaseBResults.flatMap(r => r.summaryOnly).filter(q => q.hit).length;
    const fullHits = phaseBResults.flatMap(r => r.full).filter(q => q.hit).length;
    const totalQ = phaseBResults.flatMap(r => r.summaryOnly).length;

    phaseBSummaryOnly = { hits: summaryHits, total: totalQ, accuracy: Math.round(summaryHits / totalQ * 100) };
    phaseBFull = { hits: fullHits, total: totalQ, accuracy: Math.round(fullHits / totalQ * 100) };

    console.log('');
    console.log('  LLM recall accuracy:');
    console.log(`    Summary-only:  ${summaryHits}/${totalQ} (${phaseBSummaryOnly.accuracy}%)`);
    console.log(`    Full (values): ${fullHits}/${totalQ} (${phaseBFull.accuracy}%)`);
    console.log(`    Delta:         ${fullHits - summaryHits} questions better with full values`);
    console.log('');

    // Per-risk breakdown
    for (const risk of ['HIGH', 'MEDIUM', 'LOW']) {
      const rr = phaseBResults.filter(r => r.risk === risk);
      const so = rr.flatMap(r => r.summaryOnly).filter(q => q.hit).length;
      const fu = rr.flatMap(r => r.full).filter(q => q.hit).length;
      const tot = rr.flatMap(r => r.summaryOnly).length;
      console.log(`    ${risk.padEnd(6)}: summary-only ${so}/${tot} (${tot > 0 ? Math.round(so/tot*100) : 'n/a'}%)  full ${fu}/${tot} (${tot > 0 ? Math.round(fu/tot*100) : 'n/a'}%)`);
    }
  } else {
    console.log('[Phase B] Skipped — set IRANTI_BENCH_LLM=1 and IRANTI_BENCH_API_KEY to enable LLM recall testing.');
  }

  // Risk classification
  console.log('');
  console.log('[Phase C] Risk classification...');
  const classified = phaseAResults.map(r => ({
    ...r,
    staticRisk: r.score >= 0.7 ? 'LOW' : r.score >= 0.4 ? 'MEDIUM' : 'HIGH',
    labelledRisk: TEST_FACTS.find(f => f.id === r.id).risk,
    agreement: (() => {
      const s = r.score >= 0.7 ? 'LOW' : r.score >= 0.4 ? 'MEDIUM' : 'HIGH';
      return s === TEST_FACTS.find(f => f.id === r.id).risk;
    })(),
  }));
  const agreementCount = classified.filter(r => r.agreement).length;
  console.log(`  Static analysis agreed with manual labels: ${agreementCount}/${classified.length} (${Math.round(agreementCount/classified.length*100)}%)`);

  // Write outputs
  const execution = {
    recordedAt: new Date().toISOString(),
    benchmark: 'B2a: Summary Accuracy Benchmark',
    irantiVersion: '0.3.9',
    llmEnabled: RUN_LLM,
    llmModel: RUN_LLM ? LLM_MODEL : null,
    phaseA: phaseAResults,
    phaseB: phaseBResults,
    phaseBSummary: { summaryOnly: phaseBSummaryOnly, full: phaseBFull },
    phaseC: classified,
    avgCompletenessbyRisk: avgByRisk,
    staticAgreement: { count: agreementCount, total: classified.length },
  };

  fs.writeFileSync(outputJson, JSON.stringify(execution, null, 2));
  console.log('');
  console.log(`Wrote: ${outputJson}`);

  writeMd(execution);
  console.log(`Wrote: ${outputMd}`);
}

function writeMd(ex) {
  const lines = [];
  lines.push('# B2a: Summary Accuracy Benchmark — v0.3.9');
  lines.push('');
  lines.push(`**Executed:** ${ex.recordedAt.slice(0, 10)}`);
  lines.push(`**Iranti version:** ${ex.irantiVersion}`);
  lines.push(`**LLM recall test:** ${ex.llmEnabled ? 'Enabled — model: ' + ex.llmModel : 'Disabled — static analysis only'}`);
  lines.push('**Motivation:** A1 (v0.3.9) removed value JSON from injection blocks. Does summary-only injection maintain recall accuracy?');
  lines.push('');
  lines.push('---');
  lines.push('');
  lines.push('## Phase A — Static Completeness Analysis');
  lines.push('');
  lines.push('Scoring method: extract all leaf strings/numbers from `value` JSON, tokenize, check which appear in `summary` text.');
  lines.push('Score = found_tokens / total_tokens. HIGH: <40%, MEDIUM: 40-70%, LOW (safe): ≥70%.');
  lines.push('');
  lines.push('| Fact | Labelled Risk | Score | Found/Total | Top Missed Tokens |');
  lines.push('|------|---------------|-------|-------------|-------------------|');
  for (const r of ex.phaseA) {
    const missed = r.missed.slice(0, 4).join(', ') || '—';
    lines.push(`| ${r.id} | ${r.labelledRisk || r.risk} | ${Math.round(r.score * 100)}% | ${r.found}/${r.total} | ${missed} |`);
  }
  lines.push('');
  lines.push('**Averages by risk tier:**');
  lines.push('');
  lines.push('| Risk tier | Facts | Avg completeness | Interpretation |');
  lines.push('|-----------|-------|-----------------|----------------|');
  for (const [risk, avg] of Object.entries(ex.avgCompletenessbyRisk)) {
    const interp = avg >= 0.7 ? 'Safe — summary captures core info'
      : avg >= 0.4 ? 'Partial — some specifics may be lost'
      : 'Risky — value has critical data missing from summary';
    lines.push(`| ${risk} | ${ex.phaseA.filter(r => (r.labelledRisk || r.risk) === risk).length} | ${Math.round((avg ?? 0) * 100)}% | ${interp} |`);
  }
  lines.push('');

  if (ex.llmEnabled && ex.phaseBSummary?.summaryOnly) {
    lines.push('## Phase B — LLM Recall Test');
    lines.push('');
    lines.push('Each fact injected once with summary-only, once with full value JSON. LLM asked specific recall questions. Score = % questions answered correctly.');
    lines.push('');
    lines.push('| Condition | Questions correct | Accuracy |');
    lines.push('|-----------|------------------|---------|');
    const so = ex.phaseBSummary.summaryOnly;
    const fu = ex.phaseBSummary.full;
    lines.push(`| Summary-only (A1) | ${so.hits}/${so.total} | ${so.accuracy}% |`);
    lines.push(`| Full with values | ${fu.hits}/${fu.total} | ${fu.accuracy}% |`);
    lines.push(`| Accuracy delta | ${fu.hits - so.hits} more correct with values | ${fu.accuracy - so.accuracy} pp |`);
    lines.push('');
    lines.push('**Per risk tier:**');
    lines.push('');
    lines.push('| Risk | Summary-only | Full | Delta |');
    lines.push('|------|-------------|------|-------|');
    for (const risk of ['HIGH', 'MEDIUM', 'LOW']) {
      const rr = ex.phaseB.filter(r => r.risk === risk);
      const so2 = rr.flatMap(r => r.summaryOnly).filter(q => q.hit).length;
      const fu2 = rr.flatMap(r => r.full).filter(q => q.hit).length;
      const tot = rr.flatMap(r => r.summaryOnly).length;
      lines.push(`| ${risk} | ${tot > 0 ? Math.round(so2/tot*100) : 'n/a'}% | ${tot > 0 ? Math.round(fu2/tot*100) : 'n/a'}% | ${tot > 0 ? (fu2-so2) + ' q' : 'n/a'} |`);
    }
  } else {
    lines.push('## Phase B — LLM Recall Test');
    lines.push('');
    lines.push('**Not run.** Set `IRANTI_BENCH_LLM=1` and `IRANTI_BENCH_API_KEY=<key>` to enable.');
    lines.push('');
    lines.push('The LLM test injects facts in summary-only vs full-value mode, asks recall questions, and');
    lines.push('compares answer accuracy. Run against any Iranti instance with `proxy:chat` scope.');
  }

  lines.push('');
  lines.push('## Phase C — Risk Classification');
  lines.push('');
  lines.push('Static score mapped to risk tier: ≥70% = LOW, 40-70% = MEDIUM, <40% = HIGH.');
  lines.push('');
  lines.push(`Static analysis agreement with manual labels: **${ex.staticAgreement.count}/${ex.staticAgreement.total}** (${Math.round(ex.staticAgreement.count/ex.staticAgreement.total*100)}%)`);
  lines.push('');
  lines.push('## Summary and Recommendations');
  lines.push('');
  lines.push('### A1 accuracy risk verdict');
  lines.push('');
  const highRisk = ex.phaseA.filter(r => (r.labelledRisk || r.risk) === 'HIGH');
  const avgHighScore = highRisk.reduce((s, r) => s + r.score, 0) / (highRisk.length || 1);
  lines.push(`HIGH-risk facts average completeness: **${Math.round(avgHighScore * 100)}%**`);
  lines.push('');
  lines.push('### Recommendations for summary writers');
  lines.push('');
  lines.push('1. **Numeric values**: always include specific numbers in summary (port, timeout, size, count, limit)');
  lines.push('2. **Path values**: include full paths — not just "stored in a file" but "stored at /etc/secrets/jwt.pem"');
  lines.push('3. **Enum/flag names**: include exact env var and header names, not just their description');
  lines.push('4. **The 70% rule**: if > 30% of your value tokens are not in your summary, rewrite the summary');
  lines.push('');
  lines.push('### Tooling recommendation');
  lines.push('');
  lines.push('Add a `--check-completeness` flag to `iranti_write` that warns when score < 0.7 so authors');
  lines.push('improve summaries at write time rather than discovering gaps at recall time.');

  fs.writeFileSync(outputMd, lines.join('\n') + '\n');
}

main().catch(err => {
  console.error('[fatal]', err);
  process.exit(1);
});
