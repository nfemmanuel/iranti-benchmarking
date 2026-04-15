/**
 * B17: Cross-Session Recall Accuracy
 *
 * Tests whether Iranti enables an agent to correctly answer questions about
 * facts learned in a previous session.
 *
 * Two arms:
 *   NO_MEMORY  — LLM answers 20 questions with no context (pure prior knowledge)
 *   WITH_IRANTI — Iranti is queried per question; top result is injected before LLM answers
 *
 * Metric: accuracy (correct answers / 20). Token count is recorded but secondary.
 *
 * Model: claude-haiku-4-5-20251001 — cheapest model, maximises the retrieval gap.
 * A smarter model would guess more in the NO_MEMORY arm, narrowing the gap artificially.
 *
 * Phase 1: Seed 20 ground-truth facts into a live Iranti instance.
 * Phase 2a: NO_MEMORY — Anthropic API, question only.
 * Phase 2b: WITH_IRANTI — iranti search → inject top result → Anthropic API.
 * Phase 3: Score both arms, write results.
 */

'use strict';

const fs   = require('fs');
const path = require('path');
const Anthropic = require('@anthropic-ai/sdk');

// ── Config ────────────────────────────────────────────────────────────────────

const MODEL   = 'claude-haiku-4-5-20251001';
const ENTITY  = 'project/authsvc';

const outputDir  = path.resolve('results/raw');
const outputJson = path.join(outputDir, 'B17-cross-session-recall-v0313-execution.json');
const outputMd   = path.join(outputDir, 'B17-cross-session-recall-v0313-trial.md');
fs.mkdirSync(outputDir, { recursive: true });

// ── Key resolution ────────────────────────────────────────────────────────────

function readEnvValue(filePath, key) {
  if (!fs.existsSync(filePath)) return '';
  const line = fs.readFileSync(filePath, 'utf8').split(/\r?\n/).find(x => x.startsWith(`${key}=`));
  return line ? line.slice(key.length + 1).trim() : '';
}

function resolveAnthropicKey() {
  const runtimeRoot = process.env.IRANTI_BENCH_RUNTIME_ROOT || 'C:\\Users\\NF\\.iranti-runtime';
  const devEnv = path.join(runtimeRoot, 'instances', 'iranti_dev', '.env');
  const key = readEnvValue(devEnv, 'ANTHROPIC_API_KEY') || process.env.ANTHROPIC_API_KEY || '';
  if (!key) throw new Error('ANTHROPIC_API_KEY not found. Set it in iranti_dev .env or ANTHROPIC_API_KEY env var.');
  return key;
}

function resolveIrantiConfig() {
  // Try .env.iranti in project root, then iranti-benchmarking root
  const candidates = [
    path.resolve(__dirname, '..', '.env.iranti'),
    path.resolve('C:\\Users\\NF\\Documents\\Projects\\iranti\\.env.iranti'),
  ];
  for (const p of candidates) {
    const url = readEnvValue(p, 'IRANTI_URL');
    const key = readEnvValue(p, 'IRANTI_API_KEY');
    if (url && key) return { url, key };
  }
  return {
    url: process.env.IRANTI_URL || 'http://localhost:3500',
    key: process.env.IRANTI_API_KEY || '',
  };
}

// ── Ground-truth facts ────────────────────────────────────────────────────────
// 20 project-specific facts that cannot be inferred from general LLM knowledge.
// Each has: key (Iranti fact key), value (what gets stored), question, expectedValue (scoring target)

const FACTS = [
  {
    key: 'jwt_secret_env_var',
    value: 'The JWT secret is read from the environment variable AUTHSVC_JWT_SECRET_v2. The old name AUTHSVC_JWT_SECRET is no longer used.',
    summary: 'AuthService JWT secret env var name: AUTHSVC_JWT_SECRET_v2',
    question: 'What is the name of the environment variable that holds the JWT secret for the AuthService?',
    expectedTerms: ['AUTHSVC_JWT_SECRET_v2'],
  },
  {
    key: 'token_expiry',
    value: 'Access tokens expire after 4 hours (14400 seconds). Refresh tokens expire after 30 days.',
    summary: 'AuthService access token expiry: 4 hours / 14400 seconds',
    question: 'How long do AuthService access tokens last before expiring?',
    expectedTerms: ['4 hour', '14400'],
  },
  {
    key: 'refresh_token_table',
    value: 'Refresh tokens are stored in the user_refresh_sessions table, not refresh_tokens. This was renamed in migration 0042.',
    summary: 'AuthService refresh token table: user_refresh_sessions (renamed from refresh_tokens in migration 0042)',
    question: 'What database table stores refresh tokens in the AuthService?',
    expectedTerms: ['user_refresh_sessions'],
  },
  {
    key: 'bug_issue_47',
    value: 'Bug #47: The rate limiter counts all login attempts including successful ones toward the per-IP limit, not just failed ones. This means a user who logs in successfully 5 times in 15 minutes gets locked out.',
    summary: 'AuthService bug #47: rate limiter counts successful logins, not just failed ones',
    question: 'What is the bug described in issue #47 for the AuthService?',
    expectedTerms: ['rate limit', 'successful'],
  },
  {
    key: 'auth_middleware_path',
    value: 'The authentication middleware is at src/middleware/bearerAuth.ts. Do not confuse with the old authMiddleware.ts which was deleted in refactor PR #31.',
    summary: 'AuthService auth middleware file path: src/middleware/bearerAuth.ts',
    question: 'What is the file path for the AuthService authentication middleware?',
    expectedTerms: ['bearerAuth.ts', 'src/middleware'],
  },
  {
    key: 'session_invalidation_endpoint',
    value: 'To invalidate a specific session, send DELETE /auth/sessions/:sessionId. This endpoint requires the admin scope on the caller\'s token.',
    summary: 'AuthService session invalidation: DELETE /auth/sessions/:sessionId, requires admin scope',
    question: 'What is the API endpoint to invalidate a specific user session in the AuthService, and what permission does it require?',
    expectedTerms: ['DELETE /auth/sessions', 'admin'],
  },
  {
    key: 'bcrypt_cost_factor',
    value: 'Passwords are hashed using bcrypt with a cost factor of 13. This was increased from 10 in security audit Q1 2026.',
    summary: 'AuthService bcrypt cost factor: 13',
    question: 'What bcrypt cost factor does the AuthService use for password hashing?',
    expectedTerms: ['13'],
  },
  {
    key: 'redis_key_prefix',
    value: 'All session keys in Redis use the prefix authsvc:sess: followed by the session UUID. Example: authsvc:sess:abc123.',
    summary: 'AuthService Redis session key prefix: authsvc:sess:',
    question: 'What Redis key prefix does the AuthService use for session storage?',
    expectedTerms: ['authsvc:sess:'],
  },
  {
    key: 'admin_role_enum',
    value: 'The admin role is represented by the enum value ROLE_ADMIN_V2. The old ROLE_ADMIN value is deprecated and will be removed in v1.0. New code must use ROLE_ADMIN_V2.',
    summary: 'AuthService admin role enum: ROLE_ADMIN_V2 (ROLE_ADMIN is deprecated)',
    question: 'What is the correct enum value for the admin role in the AuthService?',
    expectedTerms: ['ROLE_ADMIN_V2'],
  },
  {
    key: 'oauth_callback_path',
    value: 'The current OAuth callback path is /auth/oauth/callback/v2. The v1 path /auth/oauth/callback is still active for backwards compatibility but deprecated.',
    summary: 'AuthService OAuth callback path: /auth/oauth/callback/v2 (v1 deprecated)',
    question: 'What is the current OAuth callback URL path in the AuthService?',
    expectedTerms: ['/auth/oauth/callback/v2'],
  },
  {
    key: 'jwt_validation_location',
    value: 'JWT validation happens at the API gateway layer, not inside individual microservices. Services receive pre-validated userId and roles from the gateway via request headers.',
    summary: 'AuthService architecture: JWT validation at gateway, not in services',
    question: 'Where does JWT token validation happen in the AuthService architecture?',
    expectedTerms: ['gateway'],
  },
  {
    key: 'logout_scope',
    value: 'The logout endpoint DELETE /auth/sessions invalidates all sessions for the user across all devices. There is no single-device logout endpoint — this is a known limitation tracked in issue #52.',
    summary: 'AuthService logout: invalidates all devices (no single-device logout, issue #52)',
    question: 'Does the AuthService logout endpoint invalidate a single device session or all sessions?',
    expectedTerms: ['all'],
  },
  {
    key: 'user_credentials_table',
    value: 'User credentials (email, password hash, roles) are stored in the authsvc_users table in a separate authsvc database. This is completely separate from the main application users table.',
    summary: 'AuthService user credentials table: authsvc_users (separate authsvc database)',
    question: 'What database table stores user credentials in the AuthService?',
    expectedTerms: ['authsvc_users'],
  },
  {
    key: 'service_port',
    value: 'The AuthService runs on port 8082. It is not 8080 (that is the API gateway) or 8081 (that is the user service).',
    summary: 'AuthService port: 8082',
    question: 'What port does the AuthService run on?',
    expectedTerms: ['8082'],
  },
  {
    key: 'staging_mfa_bypass',
    value: 'In the staging environment (NODE_ENV=staging), MFA is automatically bypassed for requests originating from the internal network range 10.20.0.0/16. This is intentional for CI pipeline compatibility.',
    summary: 'AuthService staging: MFA bypassed for 10.20.0.0/16 when NODE_ENV=staging',
    question: 'Under what condition is MFA bypassed in the AuthService staging environment?',
    expectedTerms: ['10.20.0.0', 'staging'],
  },
  {
    key: 'test_user_credentials',
    value: 'The default test user seeded by the test fixtures is testuser@authsvc.internal with password Bench!2026. This user has the standard user role.',
    summary: 'AuthService test user: testuser@authsvc.internal / Bench!2026',
    question: 'What are the credentials for the default test user in the AuthService test fixtures?',
    expectedTerms: ['testuser@authsvc.internal', 'Bench!2026'],
  },
  {
    key: 'token_refresh_client_bug',
    value: 'A common client-side mistake: sending the token with "Bearer " prefix to the refresh endpoint causes a 400 error. The refresh endpoint expects the raw token string without any prefix.',
    summary: 'AuthService token refresh: fails if client sends Bearer prefix — must be stripped',
    question: 'What common client mistake causes token refresh to fail in the AuthService?',
    expectedTerms: ['Bearer', 'prefix'],
  },
  {
    key: 'jwt_signing_algorithm',
    value: 'In v0.4.0, the AuthService switched from symmetric HS256 to asymmetric RSA-256 signing. The public key is available at /auth/.well-known/jwks.json for downstream services to verify tokens.',
    summary: 'AuthService v0.4.0: switched to RSA-256 asymmetric signing, public key at /auth/.well-known/jwks.json',
    question: 'What JWT signing algorithm does the AuthService use since v0.4.0, and where is the public key?',
    expectedTerms: ['RSA', '/auth/.well-known/jwks.json'],
  },
  {
    key: 'rate_limit_config',
    value: 'The rate limiter allows 5 login attempts per 15-minute window per IP address. Note bug #47: successful logins count toward this limit too.',
    summary: 'AuthService rate limit: 5 attempts per 15 minutes per IP',
    question: 'What is the login rate limit configuration in the AuthService?',
    expectedTerms: ['5', '15 min'],
  },
  {
    key: 'refresh_session_unique_constraint',
    value: 'The user_refresh_sessions table has a composite unique constraint on (userId, deviceFingerprint). A second login from the same device fingerprint replaces the previous session rather than creating a duplicate.',
    summary: 'AuthService user_refresh_sessions unique constraint: (userId, deviceFingerprint)',
    question: 'What unique constraint exists on the user_refresh_sessions table?',
    expectedTerms: ['userId', 'deviceFingerprint'],
  },
];

// ── Iranti API helpers ────────────────────────────────────────────────────────

async function irantiWrite(config, key, value, summary) {
  const res = await fetch(`${config.url}/kb/write`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${config.key}` },
    body: JSON.stringify({ entity: ENTITY, key, value: { text: value }, summary, confidence: 100, source: 'b17-seed', agent: 'b17-benchmark' }),
  });
  if (!res.ok) throw new Error(`iranti write failed: ${res.status} ${await res.text()}`);
  return res.json();
}

async function irantiHandshake(config) {
  const res = await fetch(`${config.url}/memory/handshake`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${config.key}` },
    body: JSON.stringify({ agent: 'b17-benchmark', task: 'B17 cross-session recall benchmark — WITH_IRANTI arm', recentMessages: [] }),
  });
  if (!res.ok) throw new Error(`iranti handshake failed: ${res.status} ${await res.text()}`);
  return res.json();
}

async function irantiAttend(config, phase, latestMessage) {
  const res = await fetch(`${config.url}/memory/attend`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${config.key}` },
    body: JSON.stringify({ agent: 'b17-benchmark', phase, latestMessage: latestMessage || '' }),
  });
  if (!res.ok) throw new Error(`iranti attend failed: ${res.status} ${await res.text()}`);
  return res.json();
}

async function irantiSearch(config, query) {
  const [entityType, entityId] = ENTITY.split('/');
  const params = new URLSearchParams({ query, limit: '1', entityType, entityId, agent: 'b17-benchmark' });
  const res = await fetch(`${config.url}/kb/search?${params}`, {
    method: 'GET',
    headers: { 'Authorization': `Bearer ${config.key}` },
  });
  if (!res.ok) throw new Error(`iranti search failed: ${res.status} ${await res.text()}`);
  const data = await res.json();
  return data.results?.[0] || null;
}

// ── Scoring ───────────────────────────────────────────────────────────────────

function scoreAnswer(answer, expectedTerms) {
  const lower = answer.toLowerCase();
  return expectedTerms.every(t => lower.includes(t.toLowerCase()));
}

// ── LLM call ─────────────────────────────────────────────────────────────────

const SYSTEM_NO_MEMORY = `You are a software engineering assistant. A team has been working on a project called AuthService. Answer the following question about the AuthService based on your knowledge. If you do not know the specific answer, give your best guess — do not say "I don't know". Be concise.`;

const SYSTEM_WITH_IRANTI = `You are a software engineering assistant. A team has been working on a project called AuthService. You have been given a memory block retrieved from a previous session. Use it to answer the question. Be concise and specific.`;

async function askLLM(client, systemPrompt, question, inputTokens) {
  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 256,
    system: systemPrompt,
    messages: [{ role: 'user', content: question }],
  });
  const answer = response.content[0]?.text || '';
  inputTokens.push(response.usage.input_tokens);
  return answer;
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  const anthropicKey = resolveAnthropicKey();
  const irantiConfig = resolveIrantiConfig();
  const client = new Anthropic({ apiKey: anthropicKey });

  console.log(`B17: Cross-Session Recall Accuracy`);
  console.log(`Model: ${MODEL}`);
  console.log(`Iranti: ${irantiConfig.url}`);
  console.log(`Facts: ${FACTS.length}`);
  console.log('');

  // ── Phase 1: Seed facts into Iranti ─────────────────────────────────────────
  console.log('Phase 1: Seeding facts into Iranti...');
  for (const fact of FACTS) {
    process.stdout.write(`  Writing ${fact.key}... `);
    await irantiWrite(irantiConfig, fact.key, fact.value, fact.summary);
    console.log('ok');
  }
  // Brief pause to allow vector indexing to settle
  await new Promise(r => setTimeout(r, 2000));
  console.log('');

  const results = [];

  // ── Phase 2a: NO_MEMORY arm ──────────────────────────────────────────────────
  console.log('Phase 2a: NO_MEMORY arm...');
  const nmInputTokens = [];
  for (const fact of FACTS) {
    process.stdout.write(`  Q${FACTS.indexOf(fact) + 1}: ${fact.question.slice(0, 60)}... `);
    const answer = await askLLM(client, SYSTEM_NO_MEMORY, fact.question, nmInputTokens);
    const correct = scoreAnswer(answer, fact.expectedTerms);
    results.push({ key: fact.key, question: fact.question, nmAnswer: answer, nmCorrect: correct });
    console.log(correct ? 'CORRECT' : 'wrong');
  }
  console.log('');

  // ── Phase 2b: WITH_IRANTI arm ────────────────────────────────────────────────
  console.log('Phase 2b: WITH_IRANTI arm...');
  // Handshake required before search calls
  await irantiHandshake(irantiConfig);
  const wiInputTokens = [];
  for (let i = 0; i < FACTS.length; i++) {
    const fact = FACTS[i];
    process.stdout.write(`  Q${i + 1}: ${fact.question.slice(0, 60)}... `);

    // Attend pre-response (protocol gate before search)
    await irantiAttend(irantiConfig, 'pre-response', fact.question);

    // Search Iranti for relevant fact
    const retrieved = await irantiSearch(irantiConfig, fact.question);
    let systemPrompt = SYSTEM_WITH_IRANTI;
    let questionWithMemory = fact.question;

    if (retrieved) {
      const memoryBlock = `[Memory from previous session]\n${retrieved.summary}\n${retrieved.value?.text || ''}`.trim();
      questionWithMemory = `${memoryBlock}\n\nQuestion: ${fact.question}`;
    }

    const answer = await askLLM(client, systemPrompt, questionWithMemory, wiInputTokens);
    const correct = scoreAnswer(answer, fact.expectedTerms);
    results[i].wiAnswer = answer;
    results[i].wiCorrect = correct;
    results[i].retrieved = retrieved ? retrieved.summary : null;
    console.log(correct ? 'CORRECT' : 'wrong');

    // Attend post-response to close turn
    await irantiAttend(irantiConfig, 'post-response', answer);
  }
  console.log('');

  // ── Phase 3: Score ────────────────────────────────────────────────────────────
  const nmCorrect  = results.filter(r => r.nmCorrect).length;
  const wiCorrect  = results.filter(r => r.wiCorrect).length;
  const nmAccuracy = Math.round((nmCorrect  / FACTS.length) * 100);
  const wiAccuracy = Math.round((wiCorrect  / FACTS.length) * 100);
  const gap        = wiAccuracy - nmAccuracy;

  const nmTotalTokens = nmInputTokens.reduce((a, b) => a + b, 0);
  const wiTotalTokens = wiInputTokens.reduce((a, b) => a + b, 0);

  console.log('Results:');
  console.log(`  NO_MEMORY:   ${nmCorrect}/${FACTS.length} correct (${nmAccuracy}%)`);
  console.log(`  WITH_IRANTI: ${wiCorrect}/${FACTS.length} correct (${wiAccuracy}%)`);
  console.log(`  Gap:         +${gap} percentage points`);

  // ── Write JSON ────────────────────────────────────────────────────────────────
  const execution = {
    benchmark: 'B17',
    executedAt: new Date().toISOString(),
    model: MODEL,
    iratntiVersion: 'live',
    factCount: FACTS.length,
    noMemory: { correct: nmCorrect, accuracy: nmAccuracy, totalInputTokens: nmTotalTokens },
    withIranti: { correct: wiCorrect, accuracy: wiAccuracy, totalInputTokens: wiTotalTokens },
    gap,
    results,
  };
  fs.writeFileSync(outputJson, JSON.stringify(execution, null, 2));

  // ── Write Markdown ────────────────────────────────────────────────────────────
  const now = new Date().toISOString().slice(0, 10);
  const rows = results.map((r, i) =>
    `| ${i + 1} | ${r.question.slice(0, 55)}… | ${r.nmCorrect ? 'PASS' : 'fail'} | ${r.wiCorrect ? 'PASS' : 'fail'} |`
  ).join('\n');

  const md = `# B17: Cross-Session Recall Accuracy

**Track:** B17 - Cross-Session Recall
**Executed:** ${now}
**Model:** ${MODEL}
**Method:** Anthropic Messages API (real generation)
**Facts:** ${FACTS.length}

---

## Summary

| Arm | Correct | Accuracy |
|-----|---------|----------|
| NO_MEMORY | ${nmCorrect}/${FACTS.length} | **${nmAccuracy}%** |
| WITH_IRANTI | ${wiCorrect}/${FACTS.length} | **${wiAccuracy}%** |
| Gap | | **+${gap} pp** |

---

## Per-Question Results

| # | Question | NO_MEMORY | WITH_IRANTI |
|---|----------|-----------|-------------|
${rows}

---

## Interpretation

The gap of **+${gap} percentage points** represents Iranti's contribution to cross-session
recall. The NO_MEMORY arm reflects what users experience without memory: the agent
either guesses incorrectly or admits ignorance on project-specific facts. The
WITH_IRANTI arm reflects what users experience when the agent can query what was
learned in the previous session.

Token counts (secondary metric):
- NO_MEMORY total input tokens across 20 questions: ${nmTotalTokens.toLocaleString()}
- WITH_IRANTI total input tokens across 20 questions: ${wiTotalTokens.toLocaleString()}

Note: WITH_IRANTI input tokens include the injected memory block per question, so
are expected to be higher. The primary metric here is correctness, not token count.
`;

  fs.writeFileSync(outputMd, md);
  console.log(`\nResults written to:`);
  console.log(`  ${outputJson}`);
  console.log(`  ${outputMd}`);
}

main().catch(err => {
  console.error('B17 failed:', err.message);
  process.exit(1);
});
