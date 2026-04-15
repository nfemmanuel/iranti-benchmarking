/**
 * B15: Token Overhead Reckoning — Full Iranti Cost Accounting
 *
 * Measures the FULL context-token cost of Iranti, including overhead B14 omitted:
 *   1. System injection overhead (session reminder in system prompt)
 *   2. iranti_attend call overhead per turn (tool_use + tool_result messages)
 *   3. Inject block savings on recall turns (same as B14)
 *
 * Three scenarios:
 *   A — No Recall (5 turns): pure overhead, zero savings
 *   B — Moderate (15 turns, 8 recall): B14 corrected for full overhead
 *   C — Heavy (30 turns, 25 recall, larger files): ceiling savings test
 *
 * Uses Anthropic's countTokens API (no generation, exact counts).
 * No live Iranti instance required — overhead templates are pre-measured.
 *
 * Key question answered: at what session length does Iranti become net-positive
 * in token terms, when all overhead is counted?
 */

'use strict';

const fs   = require('fs');
const path = require('path');
const Anthropic = require('@anthropic-ai/sdk');

// ── Config ────────────────────────────────────────────────────────────────────
const MODEL = 'claude-sonnet-4-6';

const outputDir  = path.resolve('results/raw');
const outputJson = path.join(outputDir, 'B15-token-overhead-v0312-execution.json');
const outputMd   = path.join(outputDir, 'B15-token-overhead-v0312-trial.md');
fs.mkdirSync(outputDir, { recursive: true });

// ── API key resolution (same as B14) ─────────────────────────────────────────
function readEnvValue(filePath, key) {
  if (!fs.existsSync(filePath)) return '';
  const line = fs.readFileSync(filePath, 'utf8').split(/\r?\n/).find(x => x.startsWith(`${key}=`));
  return line ? line.slice(key.length + 1).trim() : '';
}

function resolveAnthropicKey() {
  const runtimeRoot = process.env.IRANTI_BENCH_RUNTIME_ROOT || 'C:\\Users\\NF\\.iranti-runtime';
  const instancesToTry = ['iranti_dev', 'cofactor', 'game-night'];
  for (const inst of instancesToTry) {
    const envPath = path.join(runtimeRoot, 'instances', inst, '.env');
    const key = readEnvValue(envPath, 'ANTHROPIC_API_KEY');
    if (key) return key;
  }
  const key = process.env.ANTHROPIC_API_KEY || '';
  if (!key) throw new Error('ANTHROPIC_API_KEY not found in any known instance or environment.');
  return key;
}

// ── Overhead templates ────────────────────────────────────────────────────────
// These simulate the real overhead Iranti adds to every session/turn.
// Derived from production iranti_attend responses observed at v0.3.37.

// System prompt injection: the [Iranti Session Memory] block added by the
// SessionStart hook. Includes protocol rules + loaded session facts (3-5 facts
// typical). This is added to the system param, not messages.
const SYSTEM_INJECTION_BLOCK = `[Iranti Session Memory]
Project: datasync-pipeline
REQUIRED: Call mcp__iranti__iranti_handshake before responding to the first user message.
REQUIRED: Call mcp__iranti__iranti_attend(phase='pre-response') before every reply and before factual discovery.
REQUIRED: After every response, call mcp__iranti__iranti_attend(phase='post-response').
REQUIRED: Prefer injected Iranti facts before re-inferring project state.
REQUIRED: Call mcp__iranti__iranti_write after every file edit, confirmed finding, system state discovery, and subagent completion — write what changed, why, and what it means.
[Iranti Session Facts]
Use these loaded facts as the starting working-memory frame for this session.
Prefer them before re-inferring project state.
FACTS:
- F1 | entity=agent/main_agent | key=attendant_state | confidence=100 | source=attendant
  summary: Attendant state for main_agent
- F2 | entity=agent/main_agent | key=profile | confidence=100 | source=registry
  summary: Agent Claude Code Hook: Claude Code automatic memory hook
- F3 | entity=system/session_ledger | key=recent_learning_1 | confidence=100 | source=session_ledger
  summary: Recent host lesson: claude_code successfully completed memory injection.
- F4 | entity=system/session_ledger | key=recent_learning_2 | confidence=100 | source=session_ledger
  summary: Recent compliance lesson: write after every confirmed finding before the next pause.`;

// The attend tool call — appears in an assistant message before each response.
// In production, Claude calls mcp__iranti__iranti_attend with phase and message.
const ATTEND_TOOL_CALL_INPUT = JSON.stringify({
  phase: 'pre-response',
  latestMessage: 'User question about the datasync pipeline configuration and current sync status.',
});

// Attend response when NO facts are injected (most turns, especially establishment).
// This is the actual JSON shape returned by iranti_attend at v0.3.37.
// Stripped of the most session-specific volatile fields; core fields retained.
const ATTEND_RESPONSE_NO_INJECT = JSON.stringify({
  facts: [],
  entitiesDetected: [],
  alreadyPresent: 0,
  totalFound: 0,
  usageGuidance: {
    tool: 'attend',
    reminder: 'Iranti is a hive mind. MANDATORY: call iranti_attend before every reply and around knowledge discovery. MANDATORY: call iranti_write after every file edit, confirmed finding, environment state change, and subagent completion — write what changed, why, and what it means. Skipping writes means the next session starts blind and must rediscover everything from scratch. Reminder: if the previous turn produced durable findings, call iranti_write before continuing.',
    note: '',
  },
  shouldInject: false,
  reason: 'memory_checked_no_match',
  decision: { needed: true, confidence: 0.75, method: 'heuristic', explanation: 'substantive_project_prompt' },
  compliance: {
    status: 'healthy',
    summary: 'Lifecycle is currently compliant.',
    issues: [],
    lastUpdated: '2026-04-14T01:25:27.298Z',
    counters: {
      attendsWithoutPersist: 1,
      turnsWithoutWrite: 0,
      midTurnAttendsThisTurn: 0,
      consecutivePreResponseWithoutPost: 0,
      consecutiveUnusedMemoryInjections: 0,
      pendingPostResponse: true,
      lastAttendPhase: 'pre-response',
    },
  },
  memoryAttributions: [],
  memorySearchPerformed: true,
  memoryResultsConsidered: 0,
  refinementPass: {
    outcome: 'attempted_empty',
    attempted: true,
    initialFactCount: 0,
    addedFactCount: 0,
    fallbackTerms: ['datasync', 'pipeline', 'config', 'sync'],
    reason: 'initial_pass_empty_retry_planned',
  },
  attendantToolPlan: {
    proposed: [],
    basis: 'objective_signals',
    note: 'No follow-up tools proposed for this turn.',
  },
  injectionBlock: '',
});

// Attend response when facts ARE injected (recall turns).
// Includes the injection block and a representative fact array.
const ATTEND_RESPONSE_WITH_INJECT = JSON.stringify({
  facts: [
    {
      entityKey: 'project/datasync/sync_config',
      summary: 'Sync interval: 30s default, 5s in fast-mode. Max batch: 100 records. Retry limit: 3 with exponential backoff (1s base). Dead-letter threshold: 5 consecutive failures triggers DLQ routing.',
      confidence: 100,
      source: 'checkpoint',
      lastUpdated: '2026-04-14T00:00:00.000Z',
    },
  ],
  entitiesDetected: ['project/datasync'],
  alreadyPresent: 0,
  totalFound: 1,
  usageGuidance: {
    tool: 'attend',
    reminder: 'Iranti is a hive mind. MANDATORY: call iranti_attend before every reply and around knowledge discovery. MANDATORY: call iranti_write after every file edit, confirmed finding, environment state change, and subagent completion — write what changed, why, and what it means. Skipping writes means the next session starts blind and must rediscover everything from scratch.',
    note: '',
  },
  shouldInject: true,
  reason: 'memory_matched_high_confidence',
  decision: { needed: true, confidence: 0.95, method: 'exact_match', explanation: 'entity_key_match' },
  compliance: {
    status: 'healthy',
    summary: 'Lifecycle is currently compliant.',
    issues: [],
    lastUpdated: '2026-04-14T01:25:27.298Z',
    counters: {
      attendsWithoutPersist: 1,
      turnsWithoutWrite: 0,
      midTurnAttendsThisTurn: 0,
      consecutivePreResponseWithoutPost: 0,
      consecutiveUnusedMemoryInjections: 0,
      pendingPostResponse: true,
      lastAttendPhase: 'pre-response',
    },
  },
  memoryAttributions: [{ used: true, phase: 'pre-response', helpful: true, injectedKeys: ['project/datasync/sync_config'] }],
  memorySearchPerformed: true,
  memoryResultsConsidered: 1,
  refinementPass: { outcome: 'matched', attempted: false, initialFactCount: 1, addedFactCount: 0 },
  injectionBlock: `[Iranti Retrieved Memory]
REQUIRED: Prefer the injected facts below before re-inference.
If an injected fact conflicts with your guess, use the injected fact.
FACTS:
- F1 | project/datasync/sync_config
  summary: Sync interval: 30s default, 5s in fast-mode. Max batch: 100 records. Retry limit: 3 with exponential backoff (1s base). Dead-letter threshold: 5 consecutive failures triggers DLQ routing.`,
});

// ── Synthetic knowledge files — B15 uses two domains ─────────────────────────
// Scenario B reuses B14's DebugAuth files (for direct comparison).
// Scenario C uses DataSync files (larger, ~600-900 tok each).

// ---- B14 DebugAuth files (Scenario B) ----------------------------------------
const B14_FILES = {
  'auth.ts': `// auth.ts — JWT Authentication Middleware
import jwt from 'jsonwebtoken';
import { JWT_SECRET, TOKEN_EXPIRY, REFRESH_EXPIRY } from './config';
import { validateSession } from './session-manager';
import { UserRepository } from './db/user-repo';

export interface AuthPayload {
  userId: string;
  sessionId: string;
  roles: string[];
  iat: number;
  exp: number;
}

export async function verifyToken(token: string): Promise<AuthPayload> {
  try {
    const payload = jwt.verify(token, JWT_SECRET) as AuthPayload;
    const sessionValid = await validateSession(payload.sessionId);
    if (!sessionValid) throw new Error('Session invalidated');
    return payload;
  } catch (err) {
    throw new Error(\`Token verification failed: \${err.message}\`);
  }
}

export function signToken(userId: string, sessionId: string, roles: string[]): string {
  return jwt.sign({ userId, sessionId, roles }, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
}

export function signRefreshToken(userId: string, sessionId: string): string {
  return jwt.sign({ userId, sessionId, type: 'refresh' }, JWT_SECRET, { expiresIn: REFRESH_EXPIRY });
}`,

  'config.ts': `// config.ts — Authentication Configuration Constants
import { env } from './env-validator';

export const JWT_SECRET     = env.require('JWT_SECRET');          // min 32 chars
export const TOKEN_EXPIRY   = env.int('TOKEN_EXPIRY_SECONDS', 900);     // 15 minutes
export const REFRESH_EXPIRY = env.int('REFRESH_EXPIRY_SECONDS', 604800); // 7 days
export const BCRYPT_ROUNDS  = env.int('BCRYPT_ROUNDS', 12);
export const MAX_SESSIONS_PER_USER = env.int('MAX_SESSIONS_PER_USER', 5);
export const RATE_LIMIT_WINDOW_MS  = env.int('RATE_LIMIT_WINDOW_MS', 60000);  // 1 min
export const RATE_LIMIT_MAX_REQS   = env.int('RATE_LIMIT_MAX_REQS', 20);
export const COOKIE_SECURE  = env.bool('COOKIE_SECURE', true);
export const COOKIE_SAMESITE: 'strict' | 'lax' | 'none' = 'strict';`,

  'tokens.ts': `// tokens.ts — Token Generation and Validation
import { randomBytes, createHash } from 'crypto';
import { TOKEN_EXPIRY, REFRESH_EXPIRY } from './config';
import { db } from './db';

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export async function issueTokenPair(userId: string): Promise<TokenPair> {
  const sessionId = randomBytes(16).toString('hex');
  const accessToken = signToken(userId, sessionId, await getUserRoles(userId));
  const refreshToken = signRefreshToken(userId, sessionId);

  await db.query(
    'INSERT INTO refresh_tokens (session_id, user_id, token_hash, expires_at) VALUES ($1, $2, $3, NOW() + $4::interval)',
    [sessionId, userId, hashToken(refreshToken), \`\${REFRESH_EXPIRY} seconds\`]
  );

  return { accessToken, refreshToken, expiresIn: TOKEN_EXPIRY };
}

export async function rotateRefreshToken(oldRefreshToken: string): Promise<TokenPair> {
  const payload = verifyToken(oldRefreshToken);
  await invalidateSession(payload.sessionId);
  return issueTokenPair(payload.userId);
}

export function hashToken(token: string): string {
  return createHash('sha256').update(token).digest('hex');
}`,

  'middleware.ts': `// middleware.ts — Express Authentication Middleware Stack
import { Request, Response, NextFunction } from 'express';
import { verifyToken } from './auth';
import { rateLimiter } from './rate-limiter';

// Middleware execution order: rateLimiter → extractBearer → verifyJWT → attachUser
export const authMiddlewareStack = [rateLimiter, extractBearer, verifyJWT, attachUser];

function extractBearer(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) return res.status(401).json({ error: 'Missing bearer token' });
  req.rawToken = header.slice(7);
  next();
}

async function verifyJWT(req: Request, res: Response, next: NextFunction) {
  try {
    req.auth = await verifyToken(req.rawToken);
    next();
  } catch {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
}

function attachUser(req: Request, res: Response, next: NextFunction) {
  req.userId = req.auth.userId;
  req.roles  = req.auth.roles;
  next();
}`,

  'db-schema.sql': `-- db-schema.sql — Auth-related table definitions
CREATE TABLE users (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email         TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  roles         TEXT[] DEFAULT ARRAY['user'],
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE sessions (
  id            TEXT PRIMARY KEY,
  user_id       UUID REFERENCES users(id) ON DELETE CASCADE,
  invalidated   BOOLEAN DEFAULT FALSE,
  invalidated_at TIMESTAMPTZ,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE refresh_tokens (
  id          SERIAL PRIMARY KEY,
  session_id  TEXT REFERENCES sessions(id) ON DELETE CASCADE,
  user_id     UUID REFERENCES users(id) ON DELETE CASCADE,
  token_hash  TEXT UNIQUE NOT NULL,
  used        BOOLEAN DEFAULT FALSE,
  expires_at  TIMESTAMPTZ NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_refresh_tokens_session ON refresh_tokens(session_id);
CREATE INDEX idx_sessions_user ON sessions(user_id);`,

  'api-routes.ts': `// api-routes.ts — Protected and Public API Route Definitions
import { authMiddlewareStack } from './middleware';
import { Router } from 'express';

export const publicRoutes  = ['/auth/login', '/auth/register', '/auth/refresh', '/health'];
export const protectedRoutes = [
  '/api/user/profile', '/api/user/settings', '/api/user/sessions',
  '/api/projects', '/api/projects/:id', '/api/projects/:id/members',
  '/api/billing', '/api/billing/invoices',
];
export const adminRoutes   = ['/admin/users', '/admin/sessions', '/admin/audit-log'];

export function registerRoutes(router: Router) {
  router.post('/auth/login',    authController.login);
  router.post('/auth/register', authController.register);
  router.post('/auth/refresh',  authController.refresh);
  router.use('/api', ...authMiddlewareStack);
  router.get('/api/user/profile',   userController.getProfile);
  router.put('/api/user/settings',  userController.updateSettings);
  router.get('/api/user/sessions',  userController.listSessions);
  router.delete('/api/user/sessions/:id', userController.revokeSession);
  router.use('/admin', ...authMiddlewareStack, requireRole('admin'));
  router.get('/admin/users',     adminController.listUsers);
  router.delete('/admin/users/:id', adminController.deleteUser);
  router.get('/admin/audit-log', adminController.getAuditLog);
}`,

  'session-manager.ts': `// session-manager.ts — Session Lifecycle Management
import { db } from './db';
import { MAX_SESSIONS_PER_USER } from './config';

export async function validateSession(sessionId: string): Promise<boolean> {
  const result = await db.query('SELECT invalidated FROM sessions WHERE id = $1', [sessionId]);
  return result.rows.length > 0 && !result.rows[0].invalidated;
}

export async function invalidateSession(sessionId: string): Promise<void> {
  await db.query('UPDATE sessions SET invalidated = TRUE, invalidated_at = NOW() WHERE id = $1', [sessionId]);
  await db.query('UPDATE refresh_tokens SET used = TRUE WHERE session_id = $1', [sessionId]);
}

export async function invalidateAllUserSessions(userId: string): Promise<number> {
  const r = await db.query(
    'UPDATE sessions SET invalidated = TRUE, invalidated_at = NOW() WHERE user_id = $1 AND NOT invalidated RETURNING id',
    [userId]
  );
  for (const row of r.rows) await invalidateSession(row.id);
  return r.rows.length;
}

export async function enforceSessionLimit(userId: string): Promise<void> {
  const active = await db.query(
    'SELECT id, created_at FROM sessions WHERE user_id = $1 AND NOT invalidated ORDER BY created_at ASC',
    [userId]
  );
  if (active.rows.length >= MAX_SESSIONS_PER_USER) await invalidateSession(active.rows[0].id);
}`,
};

// ---- DataSync files (Scenarios A and C) ----------------------------------------
// Larger files (~600-900 tok each) to stress-test savings under heavy recall.
const DATASYNC_FILES = {
  'sync-engine.ts': `// sync-engine.ts — DataSync Main Orchestrator
import { SyncQueue } from './queue';
import { ApiClient } from './api-client';
import { RecordTransformer } from './transformers';
import { ErrorHandler } from './error-handler';
import { SyncMetrics } from './monitoring';
import { SYNC_INTERVAL_MS, FAST_MODE_INTERVAL_MS, MAX_BATCH_SIZE, RETRY_LIMIT } from './config';
import { db } from './db-models';

export interface SyncJob {
  id: string;
  sourceId: string;
  destinationId: string;
  recordType: 'contact' | 'company' | 'deal' | 'event';
  direction: 'push' | 'pull' | 'bidirectional';
  priority: 'high' | 'normal' | 'low';
  scheduledAt: Date;
  lastSyncAt?: Date;
  status: 'pending' | 'running' | 'completed' | 'failed' | 'dead-lettered';
}

export interface SyncResult {
  jobId: string;
  recordsSynced: number;
  recordsFailed: number;
  duration: number;
  errors: SyncError[];
}

export class SyncEngine {
  private queue: SyncQueue;
  private client: ApiClient;
  private transformer: RecordTransformer;
  private errorHandler: ErrorHandler;
  private metrics: SyncMetrics;
  private running = false;

  constructor() {
    this.queue   = new SyncQueue();
    this.client  = new ApiClient();
    this.transformer = new RecordTransformer();
    this.errorHandler = new ErrorHandler();
    this.metrics = new SyncMetrics();
  }

  async start(fastMode = false): Promise<void> {
    this.running = true;
    const interval = fastMode ? FAST_MODE_INTERVAL_MS : SYNC_INTERVAL_MS;
    this.metrics.recordEngineStart({ fastMode, interval });
    while (this.running) {
      const batch = await this.queue.dequeue(MAX_BATCH_SIZE);
      if (batch.length > 0) await this.processBatch(batch);
      await new Promise(r => setTimeout(r, interval));
    }
  }

  async stop(): Promise<void> {
    this.running = false;
    await this.queue.drain();
    this.metrics.recordEngineStop();
  }

  private async processBatch(jobs: SyncJob[]): Promise<void> {
    const results = await Promise.allSettled(jobs.map(j => this.processJob(j)));
    const failures = results.filter(r => r.status === 'rejected');
    if (failures.length > 0) this.metrics.recordBatchFailures(failures.length);
  }

  private async processJob(job: SyncJob): Promise<SyncResult> {
    const start = Date.now();
    try {
      const records = await this.client.fetchRecords(job.sourceId, job.recordType);
      const transformed = await this.transformer.transform(records, job.recordType);
      const pushResult  = await this.client.pushRecords(job.destinationId, transformed);
      await db.updateJobStatus(job.id, 'completed', { recordsSynced: pushResult.count });
      this.metrics.recordJobSuccess(job.id, Date.now() - start);
      return { jobId: job.id, recordsSynced: pushResult.count, recordsFailed: 0, duration: Date.now() - start, errors: [] };
    } catch (err) {
      return this.errorHandler.handleJobError(job, err, start);
    }
  }
}`,

  'schema.graphql': `# schema.graphql — DataSync GraphQL Schema
# Defines the public API surface for managing sync jobs and querying sync state.

type Query {
  syncJob(id: ID!): SyncJob
  syncJobs(filter: SyncJobFilter, pagination: PaginationInput): SyncJobPage!
  syncStats(sourceId: ID, destinationId: ID, since: DateTime): SyncStats!
  deadLetterQueue(connectionId: ID): [DeadLetterEntry!]!
  connectionHealth(id: ID!): ConnectionHealth!
}

type Mutation {
  createSyncJob(input: CreateSyncJobInput!): SyncJob!
  cancelSyncJob(id: ID!): SyncJob!
  retrySyncJob(id: ID!): SyncJob!
  requeueDeadLetter(id: ID!): SyncJob!
  updateSyncConfig(connectionId: ID!, input: SyncConfigInput!): SyncConfig!
  pauseConnection(id: ID!): Connection!
  resumeConnection(id: ID!): Connection!
}

type Subscription {
  syncJobUpdated(jobId: ID!): SyncJob!
  connectionStatusChanged(id: ID!): Connection!
}

type SyncJob {
  id: ID!
  sourceId: ID!
  destinationId: ID!
  recordType: RecordType!
  direction: SyncDirection!
  priority: Priority!
  status: SyncStatus!
  scheduledAt: DateTime!
  startedAt: DateTime
  completedAt: DateTime
  lastSyncAt: DateTime
  recordsSynced: Int
  recordsFailed: Int
  errors: [SyncError!]
  retryCount: Int!
  nextRetryAt: DateTime
}

type SyncStats {
  totalJobs: Int!
  successfulJobs: Int!
  failedJobs: Int!
  deadLettered: Int!
  averageDuration: Float!
  totalRecordsSynced: Int!
  errorRate: Float!
}

type DeadLetterEntry {
  id: ID!
  originalJobId: ID!
  reason: String!
  failureCount: Int!
  firstFailedAt: DateTime!
  lastFailedAt: DateTime!
  payload: JSON
}

type ConnectionHealth {
  id: ID!
  status: HealthStatus!
  latency: Float
  lastChecked: DateTime!
  consecutiveFailures: Int!
  errorMessage: String
}

enum RecordType { CONTACT COMPANY DEAL EVENT TASK NOTE DOCUMENT }
enum SyncDirection { PUSH PULL BIDIRECTIONAL }
enum Priority { HIGH NORMAL LOW }
enum SyncStatus { PENDING RUNNING COMPLETED FAILED DEAD_LETTERED CANCELLED }
enum HealthStatus { HEALTHY DEGRADED FAILING UNREACHABLE }

input CreateSyncJobInput {
  sourceId: ID!
  destinationId: ID!
  recordType: RecordType!
  direction: SyncDirection!
  priority: Priority
  scheduledAt: DateTime
}

input SyncJobFilter {
  status: [SyncStatus!]
  recordType: [RecordType!]
  sourceId: ID
  destinationId: ID
  since: DateTime
  until: DateTime
}

input SyncConfigInput {
  syncIntervalMs: Int
  maxBatchSize: Int
  retryLimit: Int
  fastMode: Boolean
  deadLetterThreshold: Int
}`,

  'api-client.ts': `// api-client.ts — External API Client with Retry and Circuit Breaker
import { RETRY_LIMIT, RETRY_BASE_MS, REQUEST_TIMEOUT_MS, CIRCUIT_BREAKER_THRESHOLD } from './config';
import { SyncMetrics } from './monitoring';

export interface FetchOptions {
  timeout?: number;
  retries?: number;
  headers?: Record<string, string>;
}

export interface PushResult {
  count: number;
  errors: Array<{ recordId: string; message: string }>;
}

export class ApiClient {
  private circuitState: Map<string, { open: boolean; failures: number; resetAt: number }> = new Map();
  private metrics = new SyncMetrics();

  async fetchRecords(connectionId: string, recordType: string, opts?: FetchOptions): Promise<unknown[]> {
    const url = \`/connections/\${connectionId}/records/\${recordType}\`;
    return this.withRetry(url, () => this.get(url, opts));
  }

  async pushRecords(connectionId: string, records: unknown[]): Promise<PushResult> {
    const url = \`/connections/\${connectionId}/records\`;
    return this.withRetry(url, () => this.post(url, { records }));
  }

  async checkHealth(connectionId: string): Promise<{ status: string; latency: number }> {
    const start = Date.now();
    try {
      await this.get(\`/connections/\${connectionId}/health\`);
      return { status: 'healthy', latency: Date.now() - start };
    } catch {
      return { status: 'failing', latency: Date.now() - start };
    }
  }

  private async withRetry<T>(key: string, fn: () => Promise<T>, attempt = 0): Promise<T> {
    const circuit = this.circuitState.get(key);
    if (circuit?.open && Date.now() < circuit.resetAt) throw new Error(\`Circuit open for \${key}\`);

    try {
      const result = await fn();
      this.recordSuccess(key);
      return result;
    } catch (err) {
      this.recordFailure(key);
      const retries = RETRY_LIMIT;
      if (attempt >= retries) throw err;
      const delay = RETRY_BASE_MS * Math.pow(2, attempt);
      await new Promise(r => setTimeout(r, delay));
      return this.withRetry(key, fn, attempt + 1);
    }
  }

  private recordSuccess(key: string): void {
    const c = this.circuitState.get(key);
    if (c) { c.failures = 0; c.open = false; }
    this.metrics.recordApiSuccess(key);
  }

  private recordFailure(key: string): void {
    const c = this.circuitState.get(key) || { open: false, failures: 0, resetAt: 0 };
    c.failures++;
    if (c.failures >= CIRCUIT_BREAKER_THRESHOLD) {
      c.open = true;
      c.resetAt = Date.now() + 60_000; // 60s circuit reset
      this.metrics.recordCircuitOpen(key);
    }
    this.circuitState.set(key, c);
    this.metrics.recordApiFailure(key);
  }

  private async get(url: string, opts?: FetchOptions): Promise<unknown> {
    const resp = await fetch(url, { headers: opts?.headers, signal: AbortSignal.timeout(opts?.timeout ?? REQUEST_TIMEOUT_MS) });
    if (!resp.ok) throw new Error(\`GET \${url} failed: \${resp.status}\`);
    return resp.json();
  }

  private async post(url: string, body: unknown): Promise<unknown> {
    const resp = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
    if (!resp.ok) throw new Error(\`POST \${url} failed: \${resp.status}\`);
    return resp.json();
  }
}`,

  'config.ts': `// config.ts — DataSync Configuration Constants
import { env } from './env-validator';

// Sync timing
export const SYNC_INTERVAL_MS       = env.int('SYNC_INTERVAL_MS', 30_000);       // 30s default
export const FAST_MODE_INTERVAL_MS  = env.int('FAST_MODE_INTERVAL_MS', 5_000);   // 5s fast mode
export const REQUEST_TIMEOUT_MS     = env.int('REQUEST_TIMEOUT_MS', 10_000);     // 10s per request

// Batch and retry
export const MAX_BATCH_SIZE         = env.int('MAX_BATCH_SIZE', 100);
export const RETRY_LIMIT            = env.int('RETRY_LIMIT', 3);
export const RETRY_BASE_MS          = env.int('RETRY_BASE_MS', 1_000);           // exponential from 1s
export const DEAD_LETTER_THRESHOLD  = env.int('DEAD_LETTER_THRESHOLD', 5);       // after 5 failures → DLQ

// Circuit breaker
export const CIRCUIT_BREAKER_THRESHOLD = env.int('CIRCUIT_BREAKER_THRESHOLD', 5); // failures before open
export const CIRCUIT_RESET_MS          = env.int('CIRCUIT_RESET_MS', 60_000);     // 60s reset window

// Concurrency
export const MAX_CONCURRENT_JOBS    = env.int('MAX_CONCURRENT_JOBS', 10);
export const WORKER_POOL_SIZE       = env.int('WORKER_POOL_SIZE', 4);

// Monitoring
export const METRICS_FLUSH_INTERVAL_MS = env.int('METRICS_FLUSH_INTERVAL_MS', 10_000);
export const HEALTH_CHECK_INTERVAL_MS  = env.int('HEALTH_CHECK_INTERVAL_MS', 15_000);

// API credentials (loaded from per-connection env vars, not global)
export const API_KEY_PREFIX = env.require('DATASYNC_API_KEY_PREFIX');   // 'dsync_'
export const WEBHOOK_SECRET = env.require('WEBHOOK_SECRET');             // min 32 chars`,

  'transformers.ts': `// transformers.ts — Record Transformation Functions
// Maps between internal canonical record format and per-integration schemas.

export interface CanonicalContact {
  id: string;
  externalId?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  tags: string[];
  customFields: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

export interface CanonicalDeal {
  id: string;
  externalId?: string;
  title: string;
  value: number;
  currency: string;
  stage: string;
  ownerId: string;
  contactIds: string[];
  closedAt?: Date;
  probability?: number;
  customFields: Record<string, unknown>;
}

export class RecordTransformer {
  private registry: Map<string, TransformFn> = new Map();

  register(recordType: string, fromIntegration: string, fn: TransformFn): void {
    this.registry.set(\`\${recordType}:\${fromIntegration}\`, fn);
  }

  async transform(records: unknown[], recordType: string, integration = 'default'): Promise<unknown[]> {
    const key = \`\${recordType}:\${integration}\`;
    const fn = this.registry.get(key) || this.registry.get(\`\${recordType}:default\`);
    if (!fn) throw new Error(\`No transformer registered for \${key}\`);
    return Promise.all(records.map(r => fn(r)));
  }

  // Built-in contact normalizer — maps common field names to canonical format
  static normalizeContact(raw: Record<string, unknown>): CanonicalContact {
    return {
      id:           String(raw.id || raw._id || raw.record_id || ''),
      externalId:   raw.external_id ? String(raw.external_id) : undefined,
      firstName:    String(raw.firstName || raw.first_name || raw.fname || ''),
      lastName:     String(raw.lastName || raw.last_name || raw.lname || ''),
      email:        String(raw.email || raw.emailAddress || '').toLowerCase(),
      phone:        raw.phone ? String(raw.phone || raw.phoneNumber || '') : undefined,
      company:      raw.company ? String(raw.company || raw.organization || '') : undefined,
      tags:         Array.isArray(raw.tags) ? raw.tags.map(String) : [],
      customFields: (raw.customFields as Record<string, unknown>) || {},
      createdAt:    new Date(String(raw.createdAt || raw.created_at || Date.now())),
      updatedAt:    new Date(String(raw.updatedAt || raw.updated_at || Date.now())),
    };
  }
}

type TransformFn = (record: unknown) => Promise<unknown> | unknown;`,

  'queue.ts': `// queue.ts — Job Queue Management (PostgreSQL-backed)
import { db } from './db-models';
import { MAX_CONCURRENT_JOBS, DEAD_LETTER_THRESHOLD } from './config';

export class SyncQueue {
  async enqueue(job: Omit<import('./sync-engine').SyncJob, 'id' | 'status'>): Promise<string> {
    const result = await db.query(
      \`INSERT INTO sync_jobs (source_id, destination_id, record_type, direction, priority, scheduled_at)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING id\`,
      [job.sourceId, job.destinationId, job.recordType, job.direction, job.priority, job.scheduledAt]
    );
    return result.rows[0].id;
  }

  async dequeue(limit: number): Promise<import('./sync-engine').SyncJob[]> {
    // Claim up to \`limit\` jobs atomically using SKIP LOCKED to avoid contention
    const result = await db.query(
      \`UPDATE sync_jobs SET status = 'running', started_at = NOW()
       WHERE id IN (
         SELECT id FROM sync_jobs
         WHERE status = 'pending' AND scheduled_at <= NOW()
           AND retry_count < $2
         ORDER BY priority DESC, scheduled_at ASC
         LIMIT $1
         FOR UPDATE SKIP LOCKED
       ) RETURNING *\`,
      [Math.min(limit, MAX_CONCURRENT_JOBS), DEAD_LETTER_THRESHOLD]
    );
    return result.rows.map(rowToJob);
  }

  async markCompleted(jobId: string, recordsSynced: number): Promise<void> {
    await db.query(
      'UPDATE sync_jobs SET status = \'completed\', completed_at = NOW(), records_synced = $2 WHERE id = $1',
      [jobId, recordsSynced]
    );
  }

  async markFailed(jobId: string, error: string): Promise<void> {
    await db.query(
      \`UPDATE sync_jobs SET
         status = CASE WHEN retry_count + 1 >= $3 THEN 'dead-lettered' ELSE 'pending' END,
         retry_count = retry_count + 1,
         last_error = $2,
         next_retry_at = NOW() + (INTERVAL '1 second' * POWER(2, retry_count))
       WHERE id = $1\`,
      [jobId, error, DEAD_LETTER_THRESHOLD]
    );
  }

  async drain(): Promise<void> {
    // Wait for all running jobs to settle before shutdown
    for (let i = 0; i < 30; i++) {
      const r = await db.query("SELECT COUNT(*) FROM sync_jobs WHERE status = 'running'");
      if (parseInt(r.rows[0].count) === 0) return;
      await new Promise(res => setTimeout(res, 1000));
    }
  }
}

function rowToJob(row: Record<string, unknown>): import('./sync-engine').SyncJob {
  return {
    id: String(row.id), sourceId: String(row.source_id), destinationId: String(row.destination_id),
    recordType: row.record_type as any, direction: row.direction as any, priority: row.priority as any,
    status: row.status as any, scheduledAt: new Date(String(row.scheduled_at)),
    lastSyncAt: row.last_sync_at ? new Date(String(row.last_sync_at)) : undefined,
  };
}`,

  'error-handler.ts': `// error-handler.ts — Error Handling, Classification, and Dead-Letter Routing
import { SyncJob, SyncResult } from './sync-engine';
import { SyncMetrics } from './monitoring';
import { DEAD_LETTER_THRESHOLD } from './config';
import { db } from './db-models';

export type ErrorClass = 'transient' | 'permanent' | 'rate-limit' | 'auth' | 'schema' | 'unknown';

export interface ClassifiedError {
  class: ErrorClass;
  message: string;
  retryable: boolean;
  retryAfterMs?: number;
}

export class ErrorHandler {
  private metrics = new SyncMetrics();

  classify(err: unknown): ClassifiedError {
    const msg = err instanceof Error ? err.message : String(err);
    if (msg.includes('429') || msg.includes('rate limit')) {
      const retryAfter = this.parseRetryAfter(msg);
      return { class: 'rate-limit', message: msg, retryable: true, retryAfterMs: retryAfter || 60_000 };
    }
    if (msg.includes('401') || msg.includes('403') || msg.includes('Unauthorized')) {
      return { class: 'auth', message: msg, retryable: false };
    }
    if (msg.includes('400') || msg.includes('schema') || msg.includes('validation')) {
      return { class: 'schema', message: msg, retryable: false };
    }
    if (msg.includes('Circuit open')) {
      return { class: 'transient', message: msg, retryable: true, retryAfterMs: 60_000 };
    }
    if (msg.includes('timeout') || msg.includes('ECONNRESET') || msg.includes('ETIMEDOUT')) {
      return { class: 'transient', message: msg, retryable: true };
    }
    if (msg.includes('500') || msg.includes('502') || msg.includes('503')) {
      return { class: 'transient', message: msg, retryable: true };
    }
    return { class: 'unknown', message: msg, retryable: true };
  }

  async handleJobError(job: SyncJob, err: unknown, startMs: number): Promise<SyncResult> {
    const classified = this.classify(err);
    this.metrics.recordJobError(job.id, classified.class);

    // Permanent errors → immediate dead-letter
    if (!classified.retryable) {
      await db.query("UPDATE sync_jobs SET status = 'dead-lettered', last_error = $2 WHERE id = $1", [job.id, classified.message]);
      await this.writeDeadLetter(job, classified.message, 'non-retryable');
      return { jobId: job.id, recordsSynced: 0, recordsFailed: 1, duration: Date.now() - startMs, errors: [{ recordId: 'batch', message: classified.message }] };
    }

    const newRetryCount = (job as any).retryCount + 1 || 1;
    if (newRetryCount >= DEAD_LETTER_THRESHOLD) {
      await this.writeDeadLetter(job, classified.message, 'retry-exhausted');
    }

    return { jobId: job.id, recordsSynced: 0, recordsFailed: 1, duration: Date.now() - startMs, errors: [{ recordId: 'batch', message: classified.message }] };
  }

  private async writeDeadLetter(job: SyncJob, reason: string, cause: string): Promise<void> {
    await db.query(
      'INSERT INTO dead_letter_queue (original_job_id, reason, cause, payload) VALUES ($1, $2, $3, $4)',
      [job.id, reason, cause, JSON.stringify(job)]
    );
  }

  private parseRetryAfter(msg: string): number | undefined {
    const m = msg.match(/retry.after[:\s]+(\d+)/i);
    return m ? parseInt(m[1]) * 1000 : undefined;
  }
}`,

  'db-models.ts': `// db-models.ts — Database Models and Query Helpers for DataSync
import { Pool } from 'pg';

let pool: Pool;

export function initDb(connectionString: string): void {
  pool = new Pool({ connectionString, max: 10, idleTimeoutMillis: 30_000, connectionTimeoutMillis: 5_000 });
}

export const db = {
  query: <T = unknown>(text: string, params?: unknown[]): Promise<{ rows: T[]; rowCount: number }> =>
    pool.query(text, params) as any,
  updateJobStatus: async (jobId: string, status: string, meta?: Record<string, unknown>): Promise<void> => {
    await pool.query(
      'UPDATE sync_jobs SET status = $2, completed_at = NOW(), records_synced = $3 WHERE id = $1',
      [jobId, status, meta?.recordsSynced ?? 0]
    );
  },
};

// Database schema for reference:
// sync_jobs: id(uuid), source_id, destination_id, record_type, direction, priority,
//            status, scheduled_at, started_at, completed_at, last_sync_at,
//            records_synced, records_failed, last_error, retry_count, next_retry_at
//
// dead_letter_queue: id(uuid), original_job_id(FK→sync_jobs), reason, cause,
//                   failure_count, first_failed_at, last_failed_at, payload(jsonb)
//
// connections: id(uuid), name, type(crm|erp|marketing|support), api_key_enc,
//              base_url, status(active|paused|failing), created_at, updated_at
//
// sync_configs: id(uuid), connection_id(FK→connections), sync_interval_ms,
//               max_batch_size, retry_limit, fast_mode(bool), dead_letter_threshold,
//               updated_at
//
// metrics_hourly: connection_id, hour_bucket(timestamptz), jobs_total, jobs_ok,
//                 jobs_failed, records_synced, avg_duration_ms, error_rate
//
// Indexes:
//   sync_jobs(status, scheduled_at) WHERE status = 'pending'  -- dequeue index
//   sync_jobs(source_id, record_type)
//   dead_letter_queue(original_job_id)
//   connections(type, status)`,
};

// ── Inject blocks for DataSync recall turns (Scenarios A and C) ───────────────
const DATASYNC_INJECT_BLOCKS = {
  sync_config: `[Iranti Retrieved Memory]
REQUIRED: Prefer the injected facts below before re-inference.
FACTS:
- F1 | project/datasync/sync_config
  summary: Sync interval: 30s default, 5s fast-mode. Max batch: 100 records. Retry limit: 3 with exponential backoff (1s base). Dead-letter threshold: 5 failures.`,

  retry_policy: `[Iranti Retrieved Memory]
REQUIRED: Prefer the injected facts below before re-inference.
FACTS:
- F1 | project/datasync/retry_policy
  summary: Retry strategy: exponential backoff from 1s base (1s, 2s, 4s). After DEAD_LETTER_THRESHOLD (5) failures job moves to dead_letter_queue. Rate-limit errors get retryAfterMs from response header (fallback 60s).`,

  circuit_breaker: `[Iranti Retrieved Memory]
REQUIRED: Prefer the injected facts below before re-inference.
FACTS:
- F1 | project/datasync/circuit_breaker
  summary: Circuit breaker: opens after 5 consecutive failures, resets after 60s. Per-connection key. Closed circuit records success+failure counts; open circuit throws immediately without calling external API.`,

  dead_letter: `[Iranti Retrieved Memory]
REQUIRED: Prefer the injected facts below before re-inference.
FACTS:
- F1 | project/datasync/dead_letter
  summary: Dead-letter queue (DLQ): job enters DLQ when retry_count >= DEAD_LETTER_THRESHOLD (5) OR error class is 'permanent' (auth, schema). DLQ stored in dead_letter_queue table. Requeue via requeueDeadLetter mutation.`,

  db_schema: `[Iranti Retrieved Memory]
REQUIRED: Prefer the injected facts below before re-inference.
FACTS:
- F1 | project/datasync/db_schema
  summary: sync_jobs table: id(uuid), status, retry_count, next_retry_at. Dequeue uses SKIP LOCKED. dead_letter_queue: original_job_id(FK), reason, cause, payload(jsonb). connections: type(crm|erp|marketing|support), status(active|paused|failing).`,

  graphql_api: `[Iranti Retrieved Memory]
REQUIRED: Prefer the injected facts below before re-inference.
FACTS:
- F1 | project/datasync/graphql_api
  summary: Public mutations: createSyncJob, cancelSyncJob, retrySyncJob, requeueDeadLetter, updateSyncConfig, pauseConnection, resumeConnection. Subscriptions: syncJobUpdated, connectionStatusChanged. Query: syncStats returns errorRate, averageDuration.`,

  error_classes: `[Iranti Retrieved Memory]
REQUIRED: Prefer the injected facts below before re-inference.
FACTS:
- F1 | project/datasync/error_classes
  summary: Error classes: transient(retryable=true), permanent(retryable=false), rate-limit(retryable=true,retryAfterMs), auth(retryable=false), schema(retryable=false), unknown(retryable=true). Permanent errors bypass retry and go straight to DLQ.`,

  concurrency: `[Iranti Retrieved Memory]
REQUIRED: Prefer the injected facts below before re-inference.
FACTS:
- F1 | project/datasync/concurrency
  summary: MAX_CONCURRENT_JOBS=10, WORKER_POOL_SIZE=4. Dequeue uses SKIP LOCKED for parallel-safe job claiming. processBatch uses Promise.allSettled (partial failure allowed). Engine start loops at SYNC_INTERVAL_MS, drain() waits up to 30s on stop().`,

  transformer_api: `[Iranti Retrieved Memory]
REQUIRED: Prefer the injected facts below before re-inference.
FACTS:
- F1 | project/datasync/transformer_api
  summary: RecordTransformer.transform(records, recordType, integration). Falls back to recordType:default if no integration-specific transform registered. normalizeContact() maps firstName/first_name/fname, email→lowercase, tags→string[]. Custom fields passed through as-is.`,

  monitoring: `[Iranti Retrieved Memory]
REQUIRED: Prefer the injected facts below before re-inference.
FACTS:
- F1 | project/datasync/monitoring
  summary: SyncMetrics: recordEngineStart, recordEngineStop, recordJobSuccess, recordJobError(class), recordBatchFailures, recordApiSuccess/Failure, recordCircuitOpen. Metrics flushed every METRICS_FLUSH_INTERVAL_MS (10s). Health checks run every 15s.`,

  api_client_retry: `[Iranti Retrieved Memory]
REQUIRED: Prefer the injected facts below before re-inference.
FACTS:
- F1 | project/datasync/api_client
  summary: ApiClient.withRetry: max RETRY_LIMIT attempts, exponential backoff from RETRY_BASE_MS (1s). Circuit breaker integrated per-URL key. fetchRecords(connectionId, recordType), pushRecords(connectionId, records). REQUEST_TIMEOUT_MS=10s per call.`,

  fast_mode: `[Iranti Retrieved Memory]
REQUIRED: Prefer the injected facts below before re-inference.
FACTS:
- F1 | project/datasync/fast_mode
  summary: Fast mode: FAST_MODE_INTERVAL_MS=5s (vs 30s default). Triggered via SyncEngine.start(fastMode=true). Config key FAST_MODE_INTERVAL_MS can override. No other behavioral changes; same batch size, retry, DLQ rules apply.`,
};

// ── B14 inject blocks (Scenario B) ────────────────────────────────────────────
const B14_INJECT_BLOCKS = {
  config: `[Iranti Retrieved Memory]
REQUIRED: Prefer the injected facts below before re-inference.
FACTS:
- F1 | project/sampleapp/jwt_config
  summary: JWT_SECRET from env (min 32 chars). TOKEN_EXPIRY=900s (15 min). REFRESH_EXPIRY=604800s (7 days). BCRYPT_ROUNDS=12. MAX_SESSIONS_PER_USER=5.`,

  api_routes: `[Iranti Retrieved Memory]
REQUIRED: Prefer the injected facts below before re-inference.
FACTS:
- F1 | project/sampleapp/api_route_protection
  summary: Public: /auth/login, /auth/register, /auth/refresh, /health. Protected (/api/*): require valid JWT via authMiddlewareStack. Admin (/admin/*): require JWT + admin role.`,

  token_expiry: `[Iranti Retrieved Memory]
REQUIRED: Prefer the injected facts below before re-inference.
FACTS:
- F1 | project/sampleapp/token_lifecycle
  summary: Access token: 900s (15 min), signed with JWT_SECRET. Refresh token: 604800s (7 days), stored as SHA-256 hash. Rotation invalidates old session and issues new pair.`,

  session_invalidation: `[Iranti Retrieved Memory]
REQUIRED: Prefer the injected facts below before re-inference.
FACTS:
- F1 | project/sampleapp/session_invalidation
  summary: invalidateSession() sets sessions.invalidated=TRUE and marks all refresh_tokens for that session as used. Max sessions enforced on login by evicting the oldest active session.`,

  db_refresh_table: `[Iranti Retrieved Memory]
REQUIRED: Prefer the injected facts below before re-inference.
FACTS:
- F1 | project/sampleapp/db_schema_auth
  summary: refresh_tokens: id(serial), session_id(FK→sessions), user_id(FK→users), token_hash(unique SHA-256), used(bool), expires_at. Indexed on session_id and user_id.`,

  middleware_order: `[Iranti Retrieved Memory]
REQUIRED: Prefer the injected facts below before re-inference.
FACTS:
- F1 | project/sampleapp/middleware_stack
  summary: Middleware order: rateLimiter → extractBearer → verifyJWT → attachUser. extractBearer requires 'Bearer ' prefix. verifyJWT calls verifyToken() (401 on failure). attachUser sets req.userId and req.roles.`,

  auth_flow: `[Iranti Retrieved Memory]
REQUIRED: Prefer the injected facts below before re-inference.
FACTS:
- F1 | project/sampleapp/auth_flow
  summary: verifyToken() calls jwt.verify(token, JWT_SECRET) then validateSession(sessionId). signToken() issues JWT with userId/sessionId/roles, expiresIn=TOKEN_EXPIRY.
- F2 | project/sampleapp/token_lifecycle
  summary: Access token: 900s (15 min). Refresh token: 7 days, SHA-256 hash. Rotation invalidates old session.
- F3 | project/sampleapp/middleware_stack
  summary: Order: rateLimiter → extractBearer → verifyJWT → attachUser.`,

  jwt_test: `[Iranti Retrieved Memory]
REQUIRED: Prefer the injected facts below before re-inference.
FACTS:
- F1 | project/sampleapp/token_lifecycle
  summary: Access token: 900s (15 min). Refresh token: 7 days, SHA-256 hash.
- F2 | project/sampleapp/jwt_config
  summary: JWT_SECRET from env (min 32 chars). TOKEN_EXPIRY=900s. REFRESH_EXPIRY=604800s.`,
};

// ── System prompts ────────────────────────────────────────────────────────────
const BASE_SYSTEM = `You are an expert software engineer helping debug and understand a codebase.
You have access to a read_file tool to read source files. Be precise and cite specific values from files when answering.
When you need a specific value from a file to answer a question, use read_file to retrieve it.`;

const WITH_IRANTI_SYSTEM = BASE_SYSTEM + '\n\n' + SYSTEM_INJECTION_BLOCK;

// ── Tool definition ───────────────────────────────────────────────────────────
const TOOLS = [
  {
    name: 'read_file',
    description: 'Read the content of a source file by filename.',
    input_schema: {
      type: 'object',
      properties: { path: { type: 'string' } },
      required: ['path'],
    },
  },
  // WITH_IRANTI arm also has the attend tool available
  {
    name: 'mcp__iranti__iranti_attend',
    description: 'Ask Iranti whether memory should be injected before the next LLM turn.',
    input_schema: {
      type: 'object',
      properties: {
        phase: { type: 'string', enum: ['pre-response', 'post-response', 'mid-turn'] },
        latestMessage: { type: 'string' },
      },
      required: ['phase'],
    },
  },
];

const BASE_TOOLS = [TOOLS[0]]; // NO_MEMORY: only read_file
const IRANTI_TOOLS = TOOLS;    // WITH_IRANTI: read_file + attend

// ── Message builder helpers ───────────────────────────────────────────────────
function fileReadToolUse(filename) {
  return { type: 'tool_use', id: `toolu_${filename.replace(/\W/g, '_')}`, name: 'read_file', input: { path: filename } };
}
function fileReadToolResult(filename, files) {
  return {
    type: 'tool_result',
    tool_use_id: `toolu_${filename.replace(/\W/g, '_')}`,
    content: [{ type: 'text', text: files[filename] || `// ${filename} not found` }],
  };
}
function attendToolUse(turnNum) {
  return {
    type: 'tool_use',
    id: `toolu_attend_t${turnNum}`,
    name: 'mcp__iranti__iranti_attend',
    input: JSON.parse(ATTEND_TOOL_CALL_INPUT),
  };
}
function attendToolResult(turnNum, withInject) {
  return {
    type: 'tool_result',
    tool_use_id: `toolu_attend_t${turnNum}`,
    content: [{ type: 'text', text: withInject ? ATTEND_RESPONSE_WITH_INJECT : ATTEND_RESPONSE_NO_INJECT }],
  };
}

// ── Session turn definitions ──────────────────────────────────────────────────

// Scenario A — DataSync, 5 turns, NO recall
const SCENARIO_A_TURNS = [
  { turn: 1, phase: 'establishment', user: 'Walk me through how the sync engine works. Start by reading sync-engine.ts.', assistantText: "I'll read sync-engine.ts to understand the orchestration.", fileRead: 'sync-engine.ts' },
  { turn: 2, phase: 'establishment', user: 'Now check the GraphQL schema — what mutations are available?', assistantText: "Let me read schema.graphql to see the full API surface.", fileRead: 'schema.graphql' },
  { turn: 3, phase: 'establishment', user: 'Read the API client to understand how external calls are made.', assistantText: "I'll read api-client.ts.", fileRead: 'api-client.ts' },
  { turn: 4, phase: 'establishment', user: "What configuration values control sync timing? Read config.ts.", assistantText: "Reading config.ts for timing constants.", fileRead: 'config.ts' },
  { turn: 5, phase: 'establishment', user: "Check the error handler — how are errors classified?", assistantText: "I'll read error-handler.ts.", fileRead: 'error-handler.ts' },
];

// Scenario B — DebugAuth (same as B14), 15 turns, 7 est + 8 recall
const SCENARIO_B_TURNS = [
  { turn: 1,  phase: 'establishment', user: 'I need to understand the auth system. Can you start by reading auth.ts?', assistantText: "I'll read auth.ts to understand the JWT authentication implementation.", fileRead: 'auth.ts' },
  { turn: 2,  phase: 'establishment', user: 'Good. Now check tokens.ts — I want to know how token pairs are issued.', assistantText: "Let me read tokens.ts.", fileRead: 'tokens.ts' },
  { turn: 3,  phase: 'establishment', user: 'And middleware.ts — what middleware stack does this use?', assistantText: "I'll check the middleware stack.", fileRead: 'middleware.ts' },
  { turn: 4,  phase: 'establishment', user: 'What does the database schema look like for auth?', assistantText: "Let me read the DB schema.", fileRead: 'db-schema.sql' },
  { turn: 5,  phase: 'establishment', user: 'Can you check config.ts for the configuration values?', assistantText: "I'll read config.ts for the auth constants.", fileRead: 'config.ts' },
  { turn: 6,  phase: 'establishment', user: 'Which routes require authentication? Check api-routes.ts.', assistantText: "Let me read the route definitions.", fileRead: 'api-routes.ts' },
  { turn: 7,  phase: 'establishment', user: 'Last one — read session-manager.ts so we have the full picture.', assistantText: "I'll read session-manager.ts.", fileRead: 'session-manager.ts' },
  { turn: 8,  phase: 'recall', user: "What's the exact JWT secret config key name and what's the token expiry in seconds?", noMemoryFileRead: 'config.ts', noMemoryFinalText: "From config.ts: JWT_SECRET from env, TOKEN_EXPIRY=900s, REFRESH_EXPIRY=604800s.", irantiInjectKey: 'config', irantiAssistant: "From injected memory: JWT_SECRET from env (min 32 chars), TOKEN_EXPIRY=900s (15min), REFRESH_EXPIRY=604800s (7d)." },
  { turn: 9,  phase: 'recall', user: 'Which API endpoints are public vs protected?', noMemoryFileRead: 'api-routes.ts', noMemoryFinalText: "Public: /auth/login, /auth/register, /auth/refresh, /health. /api/* requires JWT. /admin/* requires JWT + admin role.", irantiInjectKey: 'api_routes', irantiAssistant: "From injected memory: public /auth/* routes, /api/* needs JWT, /admin/* needs JWT + admin role." },
  { turn: 10, phase: 'recall', user: "How long does an access token last, and what happens with rotateRefreshToken?", noMemoryFileRead: 'tokens.ts', noMemoryFinalText: "Access tokens: 900s. rotateRefreshToken invalidates old session and calls issueTokenPair.", irantiInjectKey: 'token_expiry', irantiAssistant: "From injected memory: access tokens 900s, refresh 7 days. Rotation invalidates old session." },
  { turn: 11, phase: 'recall', user: "Walk me through how session invalidation works.", noMemoryFileRead: 'session-manager.ts', noMemoryFinalText: "invalidateSession sets invalidated=TRUE and marks refresh_tokens as used. enforceSessionLimit evicts oldest.", irantiInjectKey: 'session_invalidation', irantiAssistant: "From injected memory: invalidateSession sets sessions.invalidated=TRUE and marks refresh_tokens used." },
  { turn: 12, phase: 'recall', user: 'Which database table stores the refresh tokens, and what columns does it have?', noMemoryFileRead: 'db-schema.sql', noMemoryFinalText: "refresh_tokens: id, session_id, user_id, token_hash(unique), used(bool), expires_at.", irantiInjectKey: 'db_refresh_table', irantiAssistant: "From injected memory: refresh_tokens has id(serial), session_id(FK), user_id(FK), token_hash(unique SHA-256), used(bool), expires_at." },
  { turn: 13, phase: 'recall', user: "What's the exact middleware execution order?", noMemoryFileRead: 'middleware.ts', noMemoryFinalText: "Order: rateLimiter → extractBearer → verifyJWT → attachUser.", irantiInjectKey: 'middleware_order', irantiAssistant: "From injected memory: rateLimiter → extractBearer → verifyJWT → attachUser." },
  { turn: 14, phase: 'recall', user: "Can you walk me through the full auth flow — from token signing to middleware validation?", noMemoryFileRead: 'auth.ts', noMemoryFinalText: "verifyToken calls jwt.verify then validateSession. signToken issues JWT with userId/sessionId/roles.", irantiInjectKey: 'auth_flow', irantiAssistant: "From injected memory: auth flow — signToken → jwt.sign(userId/sessionId/roles), verifyToken → jwt.verify + validateSession." },
  { turn: 15, phase: 'recall', user: "I'm writing tests for JWT validation. What values should I use for TOKEN_EXPIRY and REFRESH_EXPIRY?", noMemoryFileRead: 'config.ts', noMemoryFinalText: "TOKEN_EXPIRY=900 (15min), REFRESH_EXPIRY=604800 (7d). JWT_SECRET from env.", irantiInjectKey: 'jwt_test', irantiAssistant: "From injected memory: TOKEN_EXPIRY=900s, REFRESH_EXPIRY=604800s, JWT_SECRET from env (min 32 chars)." },
];

// Scenario C — DataSync, 30 turns, 5 est + 25 recall
// Each recall turn re-reads one large DataSync file (or gets inject block).
// File read keys cycle through the 8 DataSync files repeatedly.
const SCENARIO_C_EST = [
  { turn: 1,  phase: 'establishment', user: 'Read sync-engine.ts to understand the main orchestrator.', fileRead: 'sync-engine.ts' },
  { turn: 2,  phase: 'establishment', user: 'Now read schema.graphql to understand the API surface.', fileRead: 'schema.graphql' },
  { turn: 3,  phase: 'establishment', user: 'Read api-client.ts to understand how external calls are made.', fileRead: 'api-client.ts' },
  { turn: 4,  phase: 'establishment', user: 'Check config.ts for all configuration constants.', fileRead: 'config.ts' },
  { turn: 5,  phase: 'establishment', user: 'Read error-handler.ts to understand error classification.', fileRead: 'error-handler.ts' },
];

// 25 recall turns — each questions a different fact already established
const SCENARIO_C_RECALL = [
  { turn: 6,  phase: 'recall', user: "What's the default sync interval in milliseconds?", noMemoryFileRead: 'config.ts',       irantiInjectKey: 'sync_config' },
  { turn: 7,  phase: 'recall', user: "How does the retry strategy work — base delay and max attempts?", noMemoryFileRead: 'error-handler.ts', irantiInjectKey: 'retry_policy' },
  { turn: 8,  phase: 'recall', user: "Explain the circuit breaker — when does it open and when does it reset?", noMemoryFileRead: 'api-client.ts', irantiInjectKey: 'circuit_breaker' },
  { turn: 9,  phase: 'recall', user: "When does a job get moved to the dead-letter queue?", noMemoryFileRead: 'error-handler.ts', irantiInjectKey: 'dead_letter' },
  { turn: 10, phase: 'recall', user: "What tables are in the database schema and what are their key columns?", noMemoryFileRead: 'db-models.ts', irantiInjectKey: 'db_schema' },
  { turn: 11, phase: 'recall', user: "What GraphQL mutations are available for managing sync jobs?", noMemoryFileRead: 'schema.graphql', irantiInjectKey: 'graphql_api' },
  { turn: 12, phase: 'recall', user: "What are the different error classes and which ones are retryable?", noMemoryFileRead: 'error-handler.ts', irantiInjectKey: 'error_classes' },
  { turn: 13, phase: 'recall', user: "What's MAX_CONCURRENT_JOBS and how does parallel job claiming work?", noMemoryFileRead: 'queue.ts', irantiInjectKey: 'concurrency' },
  { turn: 14, phase: 'recall', user: "How does RecordTransformer.transform work and what's the fallback behavior?", noMemoryFileRead: 'transformers.ts', irantiInjectKey: 'transformer_api' },
  { turn: 15, phase: 'recall', user: "What metrics does SyncMetrics record and how often are they flushed?", noMemoryFileRead: 'sync-engine.ts', irantiInjectKey: 'monitoring' },
  { turn: 16, phase: 'recall', user: "Remind me how ApiClient handles retries — what's the backoff formula?", noMemoryFileRead: 'api-client.ts', irantiInjectKey: 'api_client_retry' },
  { turn: 17, phase: 'recall', user: "What's FAST_MODE_INTERVAL_MS and how is fast mode enabled?", noMemoryFileRead: 'config.ts', irantiInjectKey: 'fast_mode' },
  { turn: 18, phase: 'recall', user: "What's the dead-letter threshold and which error classes bypass retry entirely?", noMemoryFileRead: 'error-handler.ts', irantiInjectKey: 'dead_letter' },
  { turn: 19, phase: 'recall', user: "Remind me of the circuit breaker threshold and reset window.", noMemoryFileRead: 'api-client.ts', irantiInjectKey: 'circuit_breaker' },
  { turn: 20, phase: 'recall', user: "What SQL does the queue use to claim jobs safely under concurrent workers?", noMemoryFileRead: 'queue.ts', irantiInjectKey: 'concurrency' },
  { turn: 21, phase: 'recall', user: "I need the exact RETRY_LIMIT and RETRY_BASE_MS values for a test.", noMemoryFileRead: 'config.ts', irantiInjectKey: 'retry_policy' },
  { turn: 22, phase: 'recall', user: "Can you summarize all the config constants and their defaults?", noMemoryFileRead: 'config.ts', irantiInjectKey: 'sync_config' },
  { turn: 23, phase: 'recall', user: "Reconfirm the error classification logic for HTTP 429 responses.", noMemoryFileRead: 'error-handler.ts', irantiInjectKey: 'error_classes' },
  { turn: 24, phase: 'recall', user: "Walk me through requeueDeadLetter — what does it do at the API and DB level?", noMemoryFileRead: 'schema.graphql', irantiInjectKey: 'graphql_api' },
  { turn: 25, phase: 'recall', user: "What's the monitoring check interval and which metrics are tracked per-job?", noMemoryFileRead: 'sync-engine.ts', irantiInjectKey: 'monitoring' },
  { turn: 26, phase: 'recall', user: "Remind me of the transformer field mapping for contacts.", noMemoryFileRead: 'transformers.ts', irantiInjectKey: 'transformer_api' },
  { turn: 27, phase: 'recall', user: "What's the WEBHOOK_SECRET minimum length and where is it required?", noMemoryFileRead: 'config.ts', irantiInjectKey: 'sync_config' },
  { turn: 28, phase: 'recall', user: "How many concurrent jobs can run, and what's WORKER_POOL_SIZE?", noMemoryFileRead: 'config.ts', irantiInjectKey: 'concurrency' },
  { turn: 29, phase: 'recall', user: "What happens to a job's next_retry_at after each failed attempt?", noMemoryFileRead: 'queue.ts', irantiInjectKey: 'retry_policy' },
  { turn: 30, phase: 'recall', user: "Final check — what's the full dead-letter path for a non-retryable auth error?", noMemoryFileRead: 'error-handler.ts', irantiInjectKey: 'dead_letter' },
];

const SCENARIO_C_TURNS = [...SCENARIO_C_EST, ...SCENARIO_C_RECALL];

// ── Context builder ───────────────────────────────────────────────────────────
function buildNoMemoryMessages(turns, files) {
  const messages = [];
  for (const t of turns) {
    if (t.phase === 'establishment') {
      messages.push({
        role: 'user',
        content: [{ type: 'text', text: t.user }],
      });
      const assistantContent = [
        { type: 'text', text: t.assistantText || 'Let me read that file.' },
        fileReadToolUse(t.fileRead),
      ];
      messages.push({ role: 'assistant', content: assistantContent });
      messages.push({
        role: 'user',
        content: [fileReadToolResult(t.fileRead, files)],
      });
    } else {
      // recall turn: re-reads the file
      const fileToRead = t.noMemoryFileRead || t.fileRead;
      messages.push({ role: 'user', content: [{ type: 'text', text: t.user }] });
      messages.push({
        role: 'assistant',
        content: [
          { type: 'text', text: `Let me re-check ${fileToRead} for the exact values.` },
          fileReadToolUse(fileToRead),
        ],
      });
      messages.push({
        role: 'user',
        content: [fileReadToolResult(fileToRead, files)],
      });
    }
    // Assistant final text (closing the turn)
    if (t.noMemoryFinalText) {
      messages.push({ role: 'assistant', content: [{ type: 'text', text: t.noMemoryFinalText }] });
    } else if (t.assistantText && t.phase === 'establishment') {
      // Response already embedded in the tool-calling turn above; no extra message needed
    }
  }
  return messages;
}

function buildWithIrantiMessages(turns, files, injectBlocks) {
  const messages = [];
  for (const t of turns) {
    const turnNum = t.turn;
    const isRecall = t.phase === 'recall';
    const injectKey = t.irantiInjectKey;
    const injectBlock = injectKey ? injectBlocks[injectKey] : null;

    // Step 1: Pre-response attend tool call (in assistant message)
    // Step 2: Attend tool result (in user-role message)
    // Step 3: Assistant response (with inject block delivered via user message before)

    // User message — optionally prepend inject block (Iranti's UserPromptSubmit hook)
    const userContent = [];
    if (isRecall && injectBlock) {
      userContent.push({ type: 'text', text: injectBlock });
    }
    userContent.push({ type: 'text', text: t.user });
    messages.push({ role: 'user', content: userContent });

    // Assistant calls attend first (pre-response protocol)
    messages.push({
      role: 'assistant',
      content: [attendToolUse(turnNum)],
    });

    // Tool result for attend (with or without inject — for overhead measurement,
    // the response is the same shape; inject content was already in user message above)
    messages.push({
      role: 'user',
      content: [attendToolResult(turnNum, isRecall && !!injectBlock)],
    });

    // Assistant response
    if (t.phase === 'establishment') {
      messages.push({
        role: 'assistant',
        content: [
          { type: 'text', text: t.assistantText || 'Let me read that file.' },
          fileReadToolUse(t.fileRead),
        ],
      });
      messages.push({
        role: 'user',
        content: [fileReadToolResult(t.fileRead, files)],
      });
    } else {
      const responseText = t.irantiAssistant || `Based on injected memory, the ${injectKey} configuration is as described.`;
      messages.push({
        role: 'assistant',
        content: [{ type: 'text', text: responseText }],
      });
    }
  }
  return messages;
}

// ── countTokens wrapper ───────────────────────────────────────────────────────
async function countTokens(client, system, messages, tools) {
  const result = await client.beta.messages.countTokens({
    model: MODEL,
    system,
    messages,
    tools,
    betas: ['token-counting-2024-11-01'],
  });
  return result.input_tokens;
}

// ── Overhead measurement ──────────────────────────────────────────────────────
async function measureOverhead(client) {
  // Measure system injection overhead (delta between base and with-iranti system)
  const baseTokens   = await countTokens(client, BASE_SYSTEM, [{ role: 'user', content: 'Hello' }], BASE_TOOLS);
  const irantiTokens = await countTokens(client, WITH_IRANTI_SYSTEM, [{ role: 'user', content: 'Hello' }], IRANTI_TOOLS);
  const systemInjectionDelta = irantiTokens - baseTokens;

  // Measure attend tool call overhead (one turn with attend call vs without)
  const baseConvTokens = await countTokens(client, BASE_SYSTEM, [
    { role: 'user', content: 'What is the sync interval?' },
  ], BASE_TOOLS);

  const withAttendTokens = await countTokens(client, BASE_SYSTEM, [
    { role: 'user', content: 'What is the sync interval?' },
    { role: 'assistant', content: [attendToolUse(1)] },
    { role: 'user', content: [attendToolResult(1, false)] },
  ], IRANTI_TOOLS);

  const attendNoInjectOverhead = withAttendTokens - baseConvTokens;

  const withAttendInjectTokens = await countTokens(client, BASE_SYSTEM, [
    { role: 'user', content: [{ type: 'text', text: DATASYNC_INJECT_BLOCKS.sync_config }, { type: 'text', text: 'What is the sync interval?' }] },
    { role: 'assistant', content: [attendToolUse(1)] },
    { role: 'user', content: [attendToolResult(1, true)] },
  ], IRANTI_TOOLS);

  const attendWithInjectOverhead = withAttendInjectTokens - baseConvTokens;

  return {
    systemInjectionDelta,
    attendNoInjectOverhead,
    attendWithInjectOverhead,
    attendToolResponseNoInject: ATTEND_RESPONSE_NO_INJECT.length, // char count for reference
    attendToolResponseWithInject: ATTEND_RESPONSE_WITH_INJECT.length,
  };
}

// ── Scenario runner ───────────────────────────────────────────────────────────
async function runScenario(client, name, turns, files, injectBlocks) {
  console.log(`\n  Running Scenario ${name}...`);
  const results = [];

  for (let i = 1; i <= turns.length; i++) {
    const turnSlice = turns.slice(0, i);

    // Build messages up to this turn
    const noMemMsgs     = buildNoMemoryMessages(turnSlice, files);
    const withIrantiMsgs = buildWithIrantiMessages(turnSlice, files, injectBlocks);

    const noMemTokens     = await countTokens(client, BASE_SYSTEM, noMemMsgs, BASE_TOOLS);
    const withIrantiTokens = await countTokens(client, WITH_IRANTI_SYSTEM, withIrantiMsgs, IRANTI_TOOLS);

    const delta    = noMemTokens - withIrantiTokens;
    const deltaPct = Math.round((delta / noMemTokens) * 100);

    const t = turns[i - 1];
    results.push({
      turn:         t.turn,
      phase:        t.phase,
      noMemory:     noMemTokens,
      withIranti:   withIrantiTokens,
      delta,
      deltaPct,
    });

    const sign = delta >= 0 ? '+' : '';
    process.stdout.write(`    Turn ${String(i).padStart(2)}: NO_MEM=${noMemTokens.toLocaleString().padStart(7)} | WITH_IRANTI=${withIrantiTokens.toLocaleString().padStart(7)} | Δ=${sign}${delta} (${sign}${deltaPct}%)\n`);
  }

  // Find crossover turn (first turn where WITH_IRANTI <= NO_MEMORY, i.e. delta >= 0)
  const crossoverTurn = results.find(r => r.delta >= 0)?.turn ?? null;
  const finalResult = results[results.length - 1];
  const recallTurns = turns.filter(t => t.phase === 'recall').length;

  const summary = {
    scenario:          name,
    totalTurns:        turns.length,
    recallTurns,
    establishmentTurns: turns.length - recallTurns,
    noMemoryFinal:     finalResult.noMemory,
    withIrantiFinal:   finalResult.withIranti,
    absoluteDelta:     finalResult.delta,
    relativeDeltaPct:  finalResult.deltaPct,
    crossoverTurn,
    withIrantiWins:    finalResult.delta > 0,
  };

  return { turns: results, summary };
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  const apiKey = resolveAnthropicKey();
  const client = new Anthropic({ apiKey });

  console.log('B15: Token Overhead Reckoning');
  console.log('='.repeat(60));
  console.log(`Model: ${MODEL}`);
  console.log('');

  // ── Phase 1: Measure overhead components ─────────────────────────────────
  console.log('Phase 1: Measuring overhead components...');
  const overhead = await measureOverhead(client);
  console.log(`  System injection overhead:      +${overhead.systemInjectionDelta} tokens`);
  console.log(`  Attend call overhead (no inject):  +${overhead.attendNoInjectOverhead} tokens/turn`);
  console.log(`  Attend call overhead (with inject): +${overhead.attendWithInjectOverhead} tokens/turn`);
  console.log('');

  // ── Phase 2: Run scenarios ────────────────────────────────────────────────
  const scenarioA = await runScenario(client, 'A', SCENARIO_A_TURNS,  DATASYNC_FILES, DATASYNC_INJECT_BLOCKS);
  const scenarioB = await runScenario(client, 'B', SCENARIO_B_TURNS,  B14_FILES,      B14_INJECT_BLOCKS);
  const scenarioC = await runScenario(client, 'C', SCENARIO_C_TURNS,  DATASYNC_FILES, DATASYNC_INJECT_BLOCKS);

  // ── Phase 3: Write outputs ────────────────────────────────────────────────
  const executionData = {
    benchmark:  'B15',
    title:      'Token Overhead Reckoning — Full Iranti Cost Accounting',
    executedAt: new Date().toISOString(),
    model:      MODEL,
    version:    'v0.3.12',
    overhead,
    scenarios: {
      A: scenarioA,
      B: scenarioB,
      C: scenarioC,
    },
  };

  fs.writeFileSync(outputJson, JSON.stringify(executionData, null, 2));
  console.log(`\nJSON → ${outputJson}`);

  // ── Markdown report ───────────────────────────────────────────────────────
  const aFinal = scenarioA.summary;
  const bFinal = scenarioB.summary;
  const cFinal = scenarioC.summary;

  function scenarioTable(turns) {
    const header = '| Turn | Phase | NO_MEMORY (tok) | WITH_IRANTI (tok) | Δ saved | Δ% |\n|------|-------|----------------|-------------------|---------|-----|';
    const rows = turns.map(r => {
      const dStr = r.delta >= 0 ? `+${r.delta}` : `${r.delta}`;
      const pStr = r.deltaPct >= 0 ? `+${r.deltaPct}%` : `${r.deltaPct}%`;
      return `| ${r.turn} | ${r.phase} | ${r.noMemory.toLocaleString()} | ${r.withIranti.toLocaleString()} | ${dStr} | ${pStr} |`;
    });
    return [header, ...rows].join('\n');
  }

  const md = `# B15: Token Overhead Reckoning — Full Iranti Cost Accounting

**Track:** B15 - Token Overhead
**Executed:** ${new Date().toISOString().slice(0, 10)}
**Iranti version:** ${executionData.version}
**Model:** ${MODEL}
**Method:** Anthropic countTokens API (exact token counts, no generation)

---

## What This Adds Over B14

B14 measured inject block savings but excluded Iranti's real per-turn overhead:
- **System injection**: the \`[Iranti Session Memory]\` block in the system prompt
- **Attend call overhead**: each turn in a live Iranti session calls \`iranti_attend\`,
  adding a tool_use + tool_result round-trip to the conversation context

This benchmark accounts for both costs, giving an accurate net-token picture.

---

## Overhead Components (Measured)

| Component | Tokens added |
|-----------|-------------|
| System injection (session reminder + facts) | **+${overhead.systemInjectionDelta} tokens** (one-time, per session) |
| Attend call overhead — no inject (tool_use + tool_result) | **+${overhead.attendNoInjectOverhead} tokens/turn** |
| Attend call overhead — with inject (includes inject block in response) | **+${overhead.attendWithInjectOverhead} tokens/turn** |

> Attend response template size: ${overhead.attendToolResponseNoInject} chars (no inject), ${overhead.attendToolResponseWithInject} chars (with inject).
> Derived from production iranti_attend responses at v0.3.37.

---

## Scenario A — No Recall (5 turns)
**Domain:** DataSync pipeline | **Turns:** 5 | **Recall:** 0

${scenarioTable(scenarioA.turns)}

**Result:** ${aFinal.withIrantiWins
  ? `WITH_IRANTI saves ${aFinal.absoluteDelta} tokens (${aFinal.relativeDeltaPct}%) even with no recall events.`
  : `WITH_IRANTI costs ${Math.abs(aFinal.absoluteDelta)} more tokens (${Math.abs(aFinal.relativeDeltaPct)}%) with no recall events. Iranti's overhead is a net cost when there is nothing to recall.`}

---

## Scenario B — Moderate Recall (15 turns, like B14)
**Domain:** JWT Auth (same as B14) | **Turns:** 15 | **Recall:** 8 | **Establishment:** 7

${scenarioTable(scenarioB.turns)}

**Result at turn 15:**

| Metric | Value |
|--------|-------|
| NO_MEMORY final tokens | ${bFinal.noMemoryFinal.toLocaleString()} |
| WITH_IRANTI final tokens | ${bFinal.withIrantiFinal.toLocaleString()} |
| Absolute saving | **${bFinal.absoluteDelta > 0 ? '+' : ''}${bFinal.absoluteDelta.toLocaleString()} tokens** |
| Relative saving | **${bFinal.relativeDeltaPct > 0 ? '+' : ''}${bFinal.relativeDeltaPct}%** |
| Crossover turn | ${bFinal.crossoverTurn ? `Turn ${bFinal.crossoverTurn}` : 'Never (WITH_IRANTI always more expensive)'} |

**B14 vs B15 comparison (same session, corrected overhead):**
B14 reported +3,272 tokens saved (37%) at turn 15.
B15 (full overhead) reports ${bFinal.absoluteDelta > 0 ? '+' : ''}${bFinal.absoluteDelta.toLocaleString()} tokens (${bFinal.relativeDeltaPct > 0 ? '+' : ''}${bFinal.relativeDeltaPct}%).

---

## Scenario C — Heavy Recall (30 turns, large files)
**Domain:** DataSync pipeline | **Turns:** 30 | **Recall:** 25 | **Establishment:** 5

${scenarioTable(scenarioC.turns)}

**Result at turn 30:**

| Metric | Value |
|--------|-------|
| NO_MEMORY final tokens | ${cFinal.noMemoryFinal.toLocaleString()} |
| WITH_IRANTI final tokens | ${cFinal.withIrantiFinal.toLocaleString()} |
| Absolute saving | **${cFinal.absoluteDelta > 0 ? '+' : ''}${cFinal.absoluteDelta.toLocaleString()} tokens** |
| Relative saving | **${cFinal.relativeDeltaPct > 0 ? '+' : ''}${cFinal.relativeDeltaPct}%** |
| Crossover turn | ${cFinal.crossoverTurn ? `Turn ${cFinal.crossoverTurn}` : 'Never (WITH_IRANTI always more expensive)'} |

---

## Cross-Scenario Summary

| Scenario | Turns | Recall | Final NO_MEM | Final WITH_IRANTI | Net Saving | Saving % | Iranti wins? | Crossover turn |
|----------|-------|--------|-------------|-------------------|------------|----------|--------------|----------------|
| A (no recall) | ${aFinal.totalTurns} | ${aFinal.recallTurns} | ${aFinal.noMemoryFinal.toLocaleString()} | ${aFinal.withIrantiFinal.toLocaleString()} | ${aFinal.absoluteDelta > 0 ? '+' : ''}${aFinal.absoluteDelta} | ${aFinal.relativeDeltaPct}% | ${aFinal.withIrantiWins ? 'Yes' : 'No'} | ${aFinal.crossoverTurn ?? 'Never'} |
| B (moderate recall, B14 corrected) | ${bFinal.totalTurns} | ${bFinal.recallTurns} | ${bFinal.noMemoryFinal.toLocaleString()} | ${bFinal.withIrantiFinal.toLocaleString()} | ${bFinal.absoluteDelta > 0 ? '+' : ''}${bFinal.absoluteDelta} | ${bFinal.relativeDeltaPct}% | ${bFinal.withIrantiWins ? 'Yes' : 'No'} | ${bFinal.crossoverTurn ?? 'Never'} |
| C (heavy recall, large files) | ${cFinal.totalTurns} | ${cFinal.recallTurns} | ${cFinal.noMemoryFinal.toLocaleString()} | ${cFinal.withIrantiFinal.toLocaleString()} | ${cFinal.absoluteDelta > 0 ? '+' : ''}${cFinal.absoluteDelta} | ${cFinal.relativeDeltaPct}% | ${cFinal.withIrantiWins ? 'Yes' : 'No'} | ${cFinal.crossoverTurn ?? 'Never'} |

---

## Interpretation

### Overhead accounting
Each Iranti session adds **${overhead.systemInjectionDelta} tokens of fixed overhead** (system injection)
plus **${overhead.attendNoInjectOverhead}-${overhead.attendWithInjectOverhead} tokens per turn** (attend call round-trips).

Across a 15-turn session that's approximately **${overhead.systemInjectionDelta + 15 * overhead.attendNoInjectOverhead}–${overhead.systemInjectionDelta + 15 * overhead.attendWithInjectOverhead} tokens** of overhead before counting any savings.

### When Iranti is net-negative
Short sessions with few recall events: the attend overhead is paid on every turn,
but savings only accumulate on recall turns. With zero recall (Scenario A), Iranti
adds net tokens.

### When Iranti wins
Once recall events accumulate enough file-re-read cost, Iranti's inject blocks
deliver savings that outpace attend overhead. In Scenario C (25/30 recall turns,
large files), the gross re-read cost dominates.

### Key caveat
Real sessions also include \`iranti_write\` calls (not modeled here), which add
further per-discovery overhead. Actual overhead in a productive session is higher
than these figures. This benchmark therefore represents a lower bound on Iranti's
true token cost.

---

**Token counts are exact** (Anthropic countTokens API).
`;

  fs.writeFileSync(outputMd, md);
  console.log(`Markdown → ${outputMd}`);

  console.log('\n' + '='.repeat(60));
  console.log('B15 Complete. Summary:');
  console.log(`  System injection overhead:     +${overhead.systemInjectionDelta} tokens (one-time)`);
  console.log(`  Per-turn attend overhead:       +${overhead.attendNoInjectOverhead} tokens (no inject) / +${overhead.attendWithInjectOverhead} tokens (with inject)`);
  console.log(`  Scenario A (5t, 0 recall):      ${aFinal.absoluteDelta > 0 ? '+' : ''}${aFinal.absoluteDelta} tokens (${aFinal.relativeDeltaPct}%) — Iranti ${aFinal.withIrantiWins ? 'wins' : 'costs more'}`);
  console.log(`  Scenario B (15t, 8 recall):     ${bFinal.absoluteDelta > 0 ? '+' : ''}${bFinal.absoluteDelta} tokens (${bFinal.relativeDeltaPct}%) — Iranti ${bFinal.withIrantiWins ? 'wins' : 'costs more'} [B14 corrected]`);
  console.log(`  Scenario C (30t, 25 recall):    ${cFinal.absoluteDelta > 0 ? '+' : ''}${cFinal.absoluteDelta} tokens (${cFinal.relativeDeltaPct}%) — Iranti ${cFinal.withIrantiWins ? 'wins' : 'costs more'}`);
}

main().catch(err => {
  console.error('B15 failed:', err.message);
  process.exit(1);
});
