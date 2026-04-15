/**
 * B16: Token Economy Under Multi-File Recall
 *
 * B15 showed that Iranti's attend overhead (~633-911 tok/turn) exceeds the
 * savings from replacing a single file re-read (~700 tok). This benchmark
 * tests whether multi-file recall turns flip the result.
 *
 * Each recall turn requires facts from 2 or 3 files simultaneously.
 *   NO_MEMORY: re-reads 2-3 files per recall turn (tool_use + tool_result per file)
 *   WITH_IRANTI: one attend call delivers a multi-fact inject block covering all files
 *
 * Break-even math from B15:
 *   Attend overhead (with inject): ~911 tok/turn
 *   Per-file re-read: ~700 tok
 *   For Iranti to win per recall turn: (N × 700) > (inject ~200 + 911) → N > ~1.6 files
 *   i.e. 2+ files/recall turn should flip positive.
 *
 * Three scenarios:
 *   A — 15 turns, 10 recall, 2 files/recall  (barely positive per-turn)
 *   B — 15 turns, 10 recall, 3 files/recall  (clearly positive per-turn)
 *   C — 30 turns, 25 recall, 2 files/recall  (sustained positive)
 *
 * Uses Anthropic countTokens API. Reuses B15 DataSync domain and overhead templates.
 */

'use strict';

const fs   = require('fs');
const path = require('path');
const Anthropic = require('@anthropic-ai/sdk');

// ── Config ────────────────────────────────────────────────────────────────────
const MODEL = 'claude-sonnet-4-6';

const outputDir  = path.resolve('results/raw');
const outputJson = path.join(outputDir, 'B16-multi-recall-v0312-execution.json');
const outputMd   = path.join(outputDir, 'B16-multi-recall-v0312-trial.md');
fs.mkdirSync(outputDir, { recursive: true });

// ── API key resolution ────────────────────────────────────────────────────────
function readEnvValue(filePath, key) {
  if (!fs.existsSync(filePath)) return '';
  const line = fs.readFileSync(filePath, 'utf8').split(/\r?\n/).find(x => x.startsWith(`${key}=`));
  return line ? line.slice(key.length + 1).trim() : '';
}

function resolveAnthropicKey() {
  const runtimeRoot = process.env.IRANTI_BENCH_RUNTIME_ROOT || 'C:\\Users\\NF\\.iranti-runtime';
  const instancesToTry = ['iranti_dev', 'cofactor', 'game-night'];
  for (const inst of instancesToTry) {
    const key = readEnvValue(path.join(runtimeRoot, 'instances', inst, '.env'), 'ANTHROPIC_API_KEY');
    if (key) return key;
  }
  const key = process.env.ANTHROPIC_API_KEY || '';
  if (!key) throw new Error('ANTHROPIC_API_KEY not found.');
  return key;
}

// ── Overhead templates (same as B15, measured there) ─────────────────────────
// B15 measured: system_injection=489, attend_no_inject=633, attend_with_inject=911
// We re-measure here for self-consistency; templates are identical.

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

const ATTEND_TOOL_CALL_INPUT = JSON.stringify({
  phase: 'pre-response',
  latestMessage: 'User question requiring facts from multiple DataSync files.',
});

const ATTEND_RESPONSE_NO_INJECT = JSON.stringify({
  facts: [],
  entitiesDetected: [],
  alreadyPresent: 0,
  totalFound: 0,
  usageGuidance: {
    tool: 'attend',
    reminder: 'Iranti is a hive mind. MANDATORY: call iranti_attend before every reply and around knowledge discovery. MANDATORY: call iranti_write after every file edit, confirmed finding, environment state change, and subagent completion — write what changed, why, and what it means. Skipping writes means the next session starts blind and must rediscover everything from scratch.',
    note: '',
  },
  shouldInject: false,
  reason: 'memory_checked_no_match',
  decision: { needed: true, confidence: 0.75, method: 'heuristic', explanation: 'substantive_project_prompt' },
  compliance: {
    status: 'healthy',
    summary: 'Lifecycle is currently compliant.',
    issues: [],
    counters: { attendsWithoutPersist: 1, turnsWithoutWrite: 0, pendingPostResponse: true, lastAttendPhase: 'pre-response' },
  },
  memoryAttributions: [],
  memorySearchPerformed: true,
  memoryResultsConsidered: 0,
  refinementPass: { outcome: 'attempted_empty', attempted: true, initialFactCount: 0, addedFactCount: 0 },
  attendantToolPlan: { proposed: [], basis: 'objective_signals', note: 'No follow-up tools proposed.' },
  injectionBlock: '',
});

// ── DataSync knowledge files (same as B15 Scenario C) ────────────────────────
const FILES = {
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

input SyncConfigInput {
  syncIntervalMs: Int
  maxBatchSize: Int
  retryLimit: Int
  fastMode: Boolean
  deadLetterThreshold: Int
}`,

  'api-client.ts': `// api-client.ts — External API Client with Retry and Circuit Breaker
import { RETRY_LIMIT, RETRY_BASE_MS, REQUEST_TIMEOUT_MS, CIRCUIT_BREAKER_THRESHOLD, CIRCUIT_RESET_MS } from './config';
import { SyncMetrics } from './monitoring';

export class ApiClient {
  private circuitState: Map<string, { open: boolean; failures: number; resetAt: number }> = new Map();
  private metrics = new SyncMetrics();

  async fetchRecords(connectionId: string, recordType: string): Promise<unknown[]> {
    const url = \`/connections/\${connectionId}/records/\${recordType}\`;
    return this.withRetry(url, () => this.get(url));
  }

  async pushRecords(connectionId: string, records: unknown[]): Promise<{ count: number; errors: any[] }> {
    const url = \`/connections/\${connectionId}/records\`;
    return this.withRetry(url, () => this.post(url, { records })) as any;
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
      if (attempt >= RETRY_LIMIT) throw err;
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
      c.resetAt = Date.now() + CIRCUIT_RESET_MS;
      this.metrics.recordCircuitOpen(key);
    }
    this.circuitState.set(key, c);
    this.metrics.recordApiFailure(key);
  }

  private async get(url: string): Promise<unknown> {
    const resp = await fetch(url, { signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS) });
    if (!resp.ok) throw new Error(\`GET \${url} failed: \${resp.status}\`);
    return resp.json();
  }

  private async post(url: string, body: unknown): Promise<unknown> {
    const resp = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body), signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS) });
    if (!resp.ok) throw new Error(\`POST \${url} failed: \${resp.status}\`);
    return resp.json();
  }
}`,

  'config.ts': `// config.ts — DataSync Configuration Constants
import { env } from './env-validator';
export const SYNC_INTERVAL_MS          = env.int('SYNC_INTERVAL_MS', 30_000);
export const FAST_MODE_INTERVAL_MS     = env.int('FAST_MODE_INTERVAL_MS', 5_000);
export const REQUEST_TIMEOUT_MS        = env.int('REQUEST_TIMEOUT_MS', 10_000);
export const MAX_BATCH_SIZE            = env.int('MAX_BATCH_SIZE', 100);
export const RETRY_LIMIT               = env.int('RETRY_LIMIT', 3);
export const RETRY_BASE_MS             = env.int('RETRY_BASE_MS', 1_000);
export const DEAD_LETTER_THRESHOLD     = env.int('DEAD_LETTER_THRESHOLD', 5);
export const CIRCUIT_BREAKER_THRESHOLD = env.int('CIRCUIT_BREAKER_THRESHOLD', 5);
export const CIRCUIT_RESET_MS          = env.int('CIRCUIT_RESET_MS', 60_000);
export const MAX_CONCURRENT_JOBS       = env.int('MAX_CONCURRENT_JOBS', 10);
export const WORKER_POOL_SIZE          = env.int('WORKER_POOL_SIZE', 4);
export const METRICS_FLUSH_INTERVAL_MS = env.int('METRICS_FLUSH_INTERVAL_MS', 10_000);
export const HEALTH_CHECK_INTERVAL_MS  = env.int('HEALTH_CHECK_INTERVAL_MS', 15_000);
export const API_KEY_PREFIX            = env.require('DATASYNC_API_KEY_PREFIX');
export const WEBHOOK_SECRET            = env.require('WEBHOOK_SECRET');`,

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
    if (msg.includes('Circuit open') || msg.includes('timeout') || msg.includes('ECONNRESET')) {
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
    if (!classified.retryable) {
      await db.query("UPDATE sync_jobs SET status = 'dead-lettered', last_error = $2 WHERE id = $1", [job.id, classified.message]);
      await this.writeDeadLetter(job, classified.message, 'non-retryable');
      return { jobId: job.id, recordsSynced: 0, recordsFailed: 1, duration: Date.now() - startMs, errors: [{ recordId: 'batch', message: classified.message }] };
    }
    const newRetryCount = (job as any).retryCount + 1 || 1;
    if (newRetryCount >= DEAD_LETTER_THRESHOLD) await this.writeDeadLetter(job, classified.message, 'retry-exhausted');
    return { jobId: job.id, recordsSynced: 0, recordsFailed: 1, duration: Date.now() - startMs, errors: [{ recordId: 'batch', message: classified.message }] };
  }

  private async writeDeadLetter(job: SyncJob, reason: string, cause: string): Promise<void> {
    await db.query('INSERT INTO dead_letter_queue (original_job_id, reason, cause, payload) VALUES ($1, $2, $3, $4)', [job.id, reason, cause, JSON.stringify(job)]);
  }

  private parseRetryAfter(msg: string): number | undefined {
    const m = msg.match(/retry.after[:\s]+(\d+)/i);
    return m ? parseInt(m[1]) * 1000 : undefined;
  }
}`,

  'queue.ts': `// queue.ts — Job Queue Management (PostgreSQL-backed)
import { db } from './db-models';
import { MAX_CONCURRENT_JOBS, DEAD_LETTER_THRESHOLD } from './config';

export class SyncQueue {
  async enqueue(job: any): Promise<string> {
    const result = await db.query(
      'INSERT INTO sync_jobs (source_id, destination_id, record_type, direction, priority, scheduled_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
      [job.sourceId, job.destinationId, job.recordType, job.direction, job.priority, job.scheduledAt]
    );
    return result.rows[0].id;
  }

  async dequeue(limit: number): Promise<any[]> {
    const result = await db.query(
      \`UPDATE sync_jobs SET status = 'running', started_at = NOW()
       WHERE id IN (
         SELECT id FROM sync_jobs
         WHERE status = 'pending' AND scheduled_at <= NOW() AND retry_count < $2
         ORDER BY priority DESC, scheduled_at ASC
         LIMIT $1
         FOR UPDATE SKIP LOCKED
       ) RETURNING *\`,
      [Math.min(limit, MAX_CONCURRENT_JOBS), DEAD_LETTER_THRESHOLD]
    );
    return result.rows;
  }

  async markCompleted(jobId: string, recordsSynced: number): Promise<void> {
    await db.query("UPDATE sync_jobs SET status = 'completed', completed_at = NOW(), records_synced = $2 WHERE id = $1", [jobId, recordsSynced]);
  }

  async markFailed(jobId: string, error: string): Promise<void> {
    await db.query(
      \`UPDATE sync_jobs SET
         status = CASE WHEN retry_count + 1 >= $3 THEN 'dead-lettered' ELSE 'pending' END,
         retry_count = retry_count + 1, last_error = $2,
         next_retry_at = NOW() + (INTERVAL '1 second' * POWER(2, retry_count))
       WHERE id = $1\`,
      [jobId, error, DEAD_LETTER_THRESHOLD]
    );
  }

  async drain(): Promise<void> {
    for (let i = 0; i < 30; i++) {
      const r = await db.query("SELECT COUNT(*) FROM sync_jobs WHERE status = 'running'");
      if (parseInt(r.rows[0].count) === 0) return;
      await new Promise(res => setTimeout(res, 1000));
    }
  }
}`,

  'db-models.ts': `// db-models.ts — Database Models and Query Helpers
import { Pool } from 'pg';
let pool: Pool;
export function initDb(connectionString: string): void {
  pool = new Pool({ connectionString, max: 10, idleTimeoutMillis: 30_000, connectionTimeoutMillis: 5_000 });
}
export const db = {
  query: <T = unknown>(text: string, params?: unknown[]) => pool.query(text, params) as any,
  updateJobStatus: async (jobId: string, status: string, meta?: Record<string, unknown>) => {
    await pool.query('UPDATE sync_jobs SET status = $2, completed_at = NOW(), records_synced = $3 WHERE id = $1', [jobId, status, meta?.recordsSynced ?? 0]);
  },
};
// Schema summary (for reference):
// sync_jobs: id(uuid PK), source_id, destination_id, record_type, direction, priority,
//            status(pending|running|completed|failed|dead-lettered), scheduled_at,
//            started_at, completed_at, records_synced, records_failed, last_error,
//            retry_count(int default 0), next_retry_at(timestamptz)
// dead_letter_queue: id(uuid PK), original_job_id(FK→sync_jobs), reason, cause,
//                   failure_count, first_failed_at, last_failed_at, payload(jsonb)
// connections: id(uuid PK), name, type(crm|erp|marketing|support),
//              status(active|paused|failing), base_url, created_at, updated_at
// Indexes: sync_jobs(status, scheduled_at) WHERE status='pending';
//          sync_jobs(source_id, record_type); dead_letter_queue(original_job_id)`,

  'transformers.ts': `// transformers.ts — Record Transformation Functions
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

export class RecordTransformer {
  private registry: Map<string, (r: unknown) => unknown> = new Map();

  register(recordType: string, fromIntegration: string, fn: (r: unknown) => unknown): void {
    this.registry.set(\`\${recordType}:\${fromIntegration}\`, fn);
  }

  async transform(records: unknown[], recordType: string, integration = 'default'): Promise<unknown[]> {
    const key = \`\${recordType}:\${integration}\`;
    const fn = this.registry.get(key) || this.registry.get(\`\${recordType}:default\`);
    if (!fn) throw new Error(\`No transformer registered for \${key}\`);
    return Promise.all(records.map(r => fn(r)));
  }

  static normalizeContact(raw: Record<string, unknown>): CanonicalContact {
    return {
      id:          String(raw.id || raw._id || raw.record_id || ''),
      externalId:  raw.external_id ? String(raw.external_id) : undefined,
      firstName:   String(raw.firstName || raw.first_name || raw.fname || ''),
      lastName:    String(raw.lastName || raw.last_name || raw.lname || ''),
      email:       String(raw.email || raw.emailAddress || '').toLowerCase(),
      phone:       raw.phone ? String(raw.phone || raw.phoneNumber || '') : undefined,
      company:     raw.company ? String(raw.company || raw.organization || '') : undefined,
      tags:        Array.isArray(raw.tags) ? raw.tags.map(String) : [],
      customFields: (raw.customFields as Record<string, unknown>) || {},
      createdAt:   new Date(String(raw.createdAt || raw.created_at || Date.now())),
      updatedAt:   new Date(String(raw.updatedAt || raw.updated_at || Date.now())),
    };
  }
}`,
};

// ── Multi-fact inject blocks (2 and 3 facts per recall turn) ──────────────────
// Each block covers the facts from 2 or 3 files the agent would need to re-read.

const INJECT_2_FILE = {
  config_apiclient: `[Iranti Retrieved Memory]
REQUIRED: Prefer the injected facts below before re-inference.
FACTS:
- F1 | project/datasync/config
  summary: RETRY_LIMIT=3, RETRY_BASE_MS=1000ms (exponential backoff). CIRCUIT_BREAKER_THRESHOLD=5 failures. CIRCUIT_RESET_MS=60000ms. REQUEST_TIMEOUT_MS=10000ms.
- F2 | project/datasync/api_client
  summary: ApiClient.withRetry: opens circuit after CIRCUIT_BREAKER_THRESHOLD failures, sets resetAt=Date.now()+CIRCUIT_RESET_MS. Backoff delay = RETRY_BASE_MS * 2^attempt. Circuit-open throws immediately without calling external API.`,

  config_errorhandler: `[Iranti Retrieved Memory]
REQUIRED: Prefer the injected facts below before re-inference.
FACTS:
- F1 | project/datasync/error_classes
  summary: Error classes: transient(retryable=true), rate-limit(retryable=true,retryAfterMs from header), auth(retryable=false), schema(retryable=false), unknown(retryable=true). Permanent=non-retryable → immediate DLQ.
- F2 | project/datasync/config
  summary: DEAD_LETTER_THRESHOLD=5 consecutive failures. RETRY_LIMIT=3, RETRY_BASE_MS=1000ms. Rate-limit fallback retryAfterMs=60000ms if no header.`,

  queue_config: `[Iranti Retrieved Memory]
REQUIRED: Prefer the injected facts below before re-inference.
FACTS:
- F1 | project/datasync/queue
  summary: dequeue() uses SKIP LOCKED for safe parallel claiming. Claims MIN(limit, MAX_CONCURRENT_JOBS) jobs at once. WHERE status='pending' AND scheduled_at<=NOW() AND retry_count<DEAD_LETTER_THRESHOLD. Orders by priority DESC, scheduled_at ASC.
- F2 | project/datasync/config
  summary: MAX_CONCURRENT_JOBS=10, WORKER_POOL_SIZE=4. DEAD_LETTER_THRESHOLD=5 (gates dequeue retry_count filter).`,

  schema_errorhandler: `[Iranti Retrieved Memory]
REQUIRED: Prefer the injected facts below before re-inference.
FACTS:
- F1 | project/datasync/graphql_api
  summary: requeueDeadLetter(id: ID!): SyncJob! re-creates a job from a DLQ entry. createSyncJob requires sourceId, destinationId, recordType, direction. cancelSyncJob and retrySyncJob take job id.
- F2 | project/datasync/dead_letter
  summary: Jobs enter DLQ when: (a) error.retryable=false (auth/schema → immediate), or (b) retry_count>=DEAD_LETTER_THRESHOLD (5). DLQ table stores original_job_id, reason, cause, payload(jsonb).`,

  config_engine: `[Iranti Retrieved Memory]
REQUIRED: Prefer the injected facts below before re-inference.
FACTS:
- F1 | project/datasync/config
  summary: SYNC_INTERVAL_MS=30000ms (30s default). FAST_MODE_INTERVAL_MS=5000ms. MAX_BATCH_SIZE=100. METRICS_FLUSH_INTERVAL_MS=10000ms. HEALTH_CHECK_INTERVAL_MS=15000ms.
- F2 | project/datasync/engine
  summary: SyncEngine.start(fastMode=false): interval=fastMode?FAST_MODE_INTERVAL_MS:SYNC_INTERVAL_MS. processBatch() uses Promise.allSettled (partial failure OK). stop() calls queue.drain() then recordEngineStop.`,

  apiclient_schema: `[Iranti Retrieved Memory]
REQUIRED: Prefer the injected facts below before re-inference.
FACTS:
- F1 | project/datasync/api_client
  summary: ApiClient.checkHealth(connectionId): GET /connections/{id}/health, returns {status, latency}. Returns 'failing' on any error (does not throw). Latency is measured from call start.
- F2 | project/datasync/graphql_api
  summary: connectionHealth(id) query returns ConnectionHealth: status(HEALTHY|DEGRADED|FAILING|UNREACHABLE), latency(Float), lastChecked, consecutiveFailures, errorMessage.`,

  transformers_schema: `[Iranti Retrieved Memory]
REQUIRED: Prefer the injected facts below before re-inference.
FACTS:
- F1 | project/datasync/transformer_api
  summary: RecordTransformer.normalizeContact maps firstName/first_name/fname, lastName/last_name/lname, email→lowercase, phone/phoneNumber, company/organization, tags→string[], customFields pass-through. Falls back to recordType:default transformer if no integration-specific one registered.
- F2 | project/datasync/graphql_api
  summary: RecordType enum: CONTACT COMPANY DEAL EVENT TASK NOTE DOCUMENT. SyncDirection: PUSH PULL BIDIRECTIONAL. GraphQL SyncJob includes recordType, direction, priority, status, retryCount, nextRetryAt.`,

  dbmodels_queue: `[Iranti Retrieved Memory]
REQUIRED: Prefer the injected facts below before re-inference.
FACTS:
- F1 | project/datasync/db_schema
  summary: sync_jobs columns: id(uuid), status, retry_count(int default 0), next_retry_at(timestamptz). db.updateJobStatus sets status='completed', completed_at=NOW(), records_synced. dead_letter_queue: original_job_id(FK), reason, cause, payload(jsonb).
- F2 | project/datasync/queue
  summary: markCompleted sets status='completed', records_synced. markFailed increments retry_count, sets next_retry_at=NOW()+1s*2^retry_count, flips to 'dead-lettered' if retry_count+1>=DEAD_LETTER_THRESHOLD.`,

  engine_config_metrics: `[Iranti Retrieved Memory]
REQUIRED: Prefer the injected facts below before re-inference.
FACTS:
- F1 | project/datasync/monitoring
  summary: SyncMetrics tracks per-job: recordJobSuccess(id,duration), recordJobError(id,class), recordBatchFailures(n), recordApiSuccess/Failure(url), recordCircuitOpen(url). Metrics flushed every METRICS_FLUSH_INTERVAL_MS.
- F2 | project/datasync/config
  summary: METRICS_FLUSH_INTERVAL_MS=10000ms, HEALTH_CHECK_INTERVAL_MS=15000ms. Engine records recordEngineStart({fastMode,interval}) and recordEngineStop().`,

  config_apiclient_2: `[Iranti Retrieved Memory]
REQUIRED: Prefer the injected facts below before re-inference.
FACTS:
- F1 | project/datasync/config
  summary: CIRCUIT_BREAKER_THRESHOLD=5 failures, CIRCUIT_RESET_MS=60000ms. RETRY_LIMIT=3, RETRY_BASE_MS=1000ms. REQUEST_TIMEOUT_MS=10000ms per API call.
- F2 | project/datasync/api_client
  summary: Circuit-open state: open=true, resetAt=now+CIRCUIT_RESET_MS. withRetry checks open+resetAt before calling; if open AND now<resetAt, throws 'Circuit open' immediately. recordSuccess resets failures=0, open=false.`,
};

const INJECT_3_FILE = {
  engine_queue_db: `[Iranti Retrieved Memory]
REQUIRED: Prefer the injected facts below before re-inference.
FACTS:
- F1 | project/datasync/engine
  summary: processJob: fetchRecords → transform → pushRecords → db.updateJobStatus('completed') → recordJobSuccess. processBatch uses Promise.allSettled. stop() calls queue.drain() (waits up to 30s for running=0).
- F2 | project/datasync/queue
  summary: markCompleted: UPDATE sync_jobs SET status='completed', completed_at=NOW(), records_synced=$2. dequeue uses SKIP LOCKED, claims jobs WHERE retry_count<DEAD_LETTER_THRESHOLD.
- F3 | project/datasync/db_schema
  summary: sync_jobs: status(pending|running|completed|failed|dead-lettered), retry_count(int default 0), records_synced, last_error. db.updateJobStatus(id, 'completed', {recordsSynced}).`,

  errorhandler_config_queue: `[Iranti Retrieved Memory]
REQUIRED: Prefer the injected facts below before re-inference.
FACTS:
- F1 | project/datasync/error_classes
  summary: Rate-limit class: retryable=true, retryAfterMs parsed from 'retry-after: N' in message (fallback 60000ms). Auth/schema class: retryable=false → immediate DLQ (no retry).
- F2 | project/datasync/config
  summary: DEAD_LETTER_THRESHOLD=5. RETRY_LIMIT=3. RETRY_BASE_MS=1000ms. After 5 failures, job moves to DLQ regardless of error class.
- F3 | project/datasync/queue
  summary: markFailed sets next_retry_at=NOW()+1s*2^retry_count, increments retry_count. If retry_count+1>=DEAD_LETTER_THRESHOLD, sets status='dead-lettered'. Dequeue filter: retry_count<DEAD_LETTER_THRESHOLD.`,

  transformers_schema_db: `[Iranti Retrieved Memory]
REQUIRED: Prefer the injected facts below before re-inference.
FACTS:
- F1 | project/datasync/transformer_api
  summary: normalizeContact maps: firstName/first_name/fname, lastName/last_name/lname, email→lowercase, phone/phoneNumber, company/organization, tags→string[], customFields pass-through, createdAt/created_at, updatedAt/updated_at.
- F2 | project/datasync/graphql_api
  summary: RecordType enum: CONTACT COMPANY DEAL EVENT TASK NOTE DOCUMENT. SyncJob.recordType is RecordType. createSyncJob.recordType is required.
- F3 | project/datasync/db_schema
  summary: sync_jobs.record_type column maps to RecordType enum. records_synced and records_failed columns updated on completion. source_id and destination_id are connection UUIDs.`,

  apiclient_config_engine: `[Iranti Retrieved Memory]
REQUIRED: Prefer the injected facts below before re-inference.
FACTS:
- F1 | project/datasync/api_client
  summary: Circuit opens after CIRCUIT_BREAKER_THRESHOLD failures, resets after CIRCUIT_RESET_MS. recordFailure increments c.failures; if >=threshold sets open=true, resetAt=now+CIRCUIT_RESET_MS. withRetry: max RETRY_LIMIT attempts, delay=RETRY_BASE_MS*2^attempt.
- F2 | project/datasync/config
  summary: CIRCUIT_BREAKER_THRESHOLD=5, CIRCUIT_RESET_MS=60000ms, RETRY_LIMIT=3, RETRY_BASE_MS=1000ms, REQUEST_TIMEOUT_MS=10000ms.
- F3 | project/datasync/monitoring
  summary: recordCircuitOpen(url) called when circuit trips. recordApiSuccess resets circuit. recordApiFailure tracked per-URL key. SyncMetrics.recordJobError(id, errorClass).`,

  schema_queue_engine: `[Iranti Retrieved Memory]
REQUIRED: Prefer the injected facts below before re-inference.
FACTS:
- F1 | project/datasync/graphql_api
  summary: createSyncJob(input: CreateSyncJobInput!): requires sourceId, destinationId, recordType, direction. priority defaults to NORMAL. scheduledAt defaults to now.
- F2 | project/datasync/queue
  summary: enqueue inserts with priority. dequeue orders by priority DESC (HIGH first), then scheduledAt ASC. SKIP LOCKED prevents double-claiming under concurrent workers.
- F3 | project/datasync/engine
  summary: processBatch(jobs) calls processJob per job via Promise.allSettled. Workers pull batches at each SYNC_INTERVAL_MS tick. MAX_BATCH_SIZE=100 gates dequeue limit.`,

  errorhandler_queue_schema: `[Iranti Retrieved Memory]
REQUIRED: Prefer the injected facts below before re-inference.
FACTS:
- F1 | project/datasync/dead_letter
  summary: DLQ entry written when: (a) !classified.retryable (auth/schema) → status='dead-lettered' immediately, (b) retry_count>=DEAD_LETTER_THRESHOLD (5). dead_letter_queue stores original_job_id, reason, cause, payload(jsonb).
- F2 | project/datasync/queue
  summary: markFailed: if retry_count+1>=DEAD_LETTER_THRESHOLD → status='dead-lettered'. Otherwise status='pending' and schedules next_retry_at.
- F3 | project/datasync/graphql_api
  summary: requeueDeadLetter(id: ID!): SyncJob! re-creates job from DLQ entry. deadLetterQueue(connectionId) query returns [DeadLetterEntry]. DeadLetterEntry has failureCount, firstFailedAt, lastFailedAt, payload.`,

  config_db_engine: `[Iranti Retrieved Memory]
REQUIRED: Prefer the injected facts below before re-inference.
FACTS:
- F1 | project/datasync/config
  summary: SYNC_INTERVAL_MS=30000ms, FAST_MODE_INTERVAL_MS=5000ms. MAX_BATCH_SIZE=100. WORKER_POOL_SIZE=4. MAX_CONCURRENT_JOBS=10.
- F2 | project/datasync/db_schema
  summary: connections table: id(uuid), type(crm|erp|marketing|support), status(active|paused|failing), base_url. sync_configs: connection_id(FK), sync_interval_ms, max_batch_size, retry_limit, fast_mode(bool).
- F3 | project/datasync/engine
  summary: SyncEngine constructor initializes SyncQueue, ApiClient, RecordTransformer, ErrorHandler, SyncMetrics. start(fastMode) selects interval. stop() drains queue and calls recordEngineStop.`,

  transformers_apiclient_schema: `[Iranti Retrieved Memory]
REQUIRED: Prefer the injected facts below before re-inference.
FACTS:
- F1 | project/datasync/transformer_api
  summary: RecordTransformer.transform(records, recordType, integration='default'). Looks up key=recordType:integration, falls back to recordType:default. Runs Promise.all over records.
- F2 | project/datasync/api_client
  summary: fetchRecords(connectionId, recordType): GET /connections/{id}/records/{type}. pushRecords(connectionId, records): POST /connections/{id}/records with body {records}. Both use withRetry.
- F3 | project/datasync/graphql_api
  summary: SyncJob.recordType enum: CONTACT COMPANY DEAL EVENT TASK NOTE DOCUMENT. SyncJob.direction: PUSH PULL BIDIRECTIONAL. createSyncJob input requires recordType + direction.`,

  queue_errorhandler_config: `[Iranti Retrieved Memory]
REQUIRED: Prefer the injected facts below before re-inference.
FACTS:
- F1 | project/datasync/queue
  summary: dequeue WHERE retry_count<DEAD_LETTER_THRESHOLD ensures dead-lettered jobs are not re-queued. markFailed exponential next_retry_at = NOW() + 1s*2^retry_count (1s,2s,4s for retries 0,1,2).
- F2 | project/datasync/error_classes
  summary: Transient (timeout, ECONNRESET, 5xx, circuit-open): retryable=true. Rate-limit: retryable=true, delay from header. Auth(401/403)/Schema(400/validation): retryable=false → immediate DLQ.
- F3 | project/datasync/config
  summary: DEAD_LETTER_THRESHOLD=5, RETRY_LIMIT=3, RETRY_BASE_MS=1000ms. CIRCUIT_RESET_MS=60000ms (circuit half-open check interval).`,

  engine_config_schema: `[Iranti Retrieved Memory]
REQUIRED: Prefer the injected facts below before re-inference.
FACTS:
- F1 | project/datasync/engine
  summary: SyncEngine.processJob: fetchRecords→transform→pushRecords→updateJobStatus('completed'). Error path: errorHandler.handleJobError classifies and writes DLQ if needed.
- F2 | project/datasync/config
  summary: MAX_BATCH_SIZE=100, MAX_CONCURRENT_JOBS=10, SYNC_INTERVAL_MS=30000ms, FAST_MODE_INTERVAL_MS=5000ms, METRICS_FLUSH_INTERVAL_MS=10000ms.
- F3 | project/datasync/graphql_api
  summary: syncStats(since) returns totalJobs, successfulJobs, failedJobs, deadLettered, averageDuration, totalRecordsSynced, errorRate. Subscription: syncJobUpdated(jobId) fires on any status change.`,

  db_queue_config: `[Iranti Retrieved Memory]
REQUIRED: Prefer the injected facts below before re-inference.
FACTS:
- F1 | project/datasync/db_schema
  summary: sync_jobs indexes: (status,scheduled_at) WHERE status='pending' — critical for dequeue perf; (source_id,record_type). Pool: max=10, idleTimeoutMillis=30000, connectionTimeoutMillis=5000.
- F2 | project/datasync/queue
  summary: drain() polls every 1s up to 30s for running_count=0. Used by SyncEngine.stop() before shutdown. enqueue returns job id(uuid).
- F3 | project/datasync/config
  summary: API_KEY_PREFIX=env.require('DATASYNC_API_KEY_PREFIX'). WEBHOOK_SECRET=env.require('WEBHOOK_SECRET') (min length enforced by env-validator). All other values have defaults.`,
};

// ── Session turn definitions ──────────────────────────────────────────────────
// Establishment: 5 turns reading individual files (same in both arms)
const ESTABLISHMENT_TURNS = [
  { turn: 1, phase: 'establishment', user: 'Read sync-engine.ts to understand the orchestrator.', fileRead: 'sync-engine.ts', assistantText: "Reading sync-engine.ts." },
  { turn: 2, phase: 'establishment', user: 'Now schema.graphql for the API surface.', fileRead: 'schema.graphql', assistantText: "Reading schema.graphql." },
  { turn: 3, phase: 'establishment', user: 'Read api-client.ts.', fileRead: 'api-client.ts', assistantText: "Reading api-client.ts." },
  { turn: 4, phase: 'establishment', user: 'Check config.ts for all constants.', fileRead: 'config.ts', assistantText: "Reading config.ts." },
  { turn: 5, phase: 'establishment', user: 'Read error-handler.ts.', fileRead: 'error-handler.ts', assistantText: "Reading error-handler.ts." },
];

// 2-file recall turns: questions require checking 2 files
const RECALL_2FILE = [
  { turn: 6,  phase: 'recall', user: "What's the retry limit and how does the circuit breaker decide when to open?", noMemoryFileReads: ['config.ts', 'api-client.ts'], irantiInjectKey: 'config_apiclient', irantiAssistant: "From memory: RETRY_LIMIT=3, RETRY_BASE_MS=1000ms. Circuit opens after 5 failures, resets after 60s." },
  { turn: 7,  phase: 'recall', user: "A job hits a 429 rate-limit error. What's the error class and how does it interact with the DLQ threshold?", noMemoryFileReads: ['error-handler.ts', 'config.ts'], irantiInjectKey: 'config_errorhandler', irantiAssistant: "From memory: rate-limit class (retryable=true), retryAfterMs from header. DLQ after 5 total failures regardless." },
  { turn: 8,  phase: 'recall', user: "How does job claiming work and what's MAX_CONCURRENT_JOBS?", noMemoryFileReads: ['queue.ts', 'config.ts'], irantiInjectKey: 'queue_config', irantiAssistant: "From memory: SKIP LOCKED, MAX_CONCURRENT_JOBS=10, ORDER BY priority DESC." },
  { turn: 9,  phase: 'recall', user: "What GraphQL mutation requeues a dead-lettered job, and what puts a job in DLQ?", noMemoryFileReads: ['schema.graphql', 'error-handler.ts'], irantiInjectKey: 'schema_errorhandler', irantiAssistant: "From memory: requeueDeadLetter(id). DLQ from non-retryable errors or 5 retry exhaustions." },
  { turn: 10, phase: 'recall', user: "What's the default sync interval and how does the engine use fast mode?", noMemoryFileReads: ['config.ts', 'sync-engine.ts'], irantiInjectKey: 'config_engine', irantiAssistant: "From memory: SYNC_INTERVAL_MS=30s, FAST_MODE_INTERVAL_MS=5s. start(fastMode=true) switches interval." },
  { turn: 11, phase: 'recall', user: "How does ApiClient.checkHealth work and what does ConnectionHealth expose in the API?", noMemoryFileReads: ['api-client.ts', 'schema.graphql'], irantiInjectKey: 'apiclient_schema', irantiAssistant: "From memory: checkHealth GET /health, returns {status,latency}. Schema: ConnectionHealth with consecutiveFailures." },
  { turn: 12, phase: 'recall', user: "How does the contact transformer normalize field names, and what RecordType does a contact map to?", noMemoryFileReads: ['transformers.ts', 'schema.graphql'], irantiInjectKey: 'transformers_schema', irantiAssistant: "From memory: firstName/first_name/fname, email lowercase. RecordType.CONTACT." },
  { turn: 13, phase: 'recall', user: "What DB columns are updated when a job completes and how does the queue mark it?", noMemoryFileReads: ['db-models.ts', 'queue.ts'], irantiInjectKey: 'dbmodels_queue', irantiAssistant: "From memory: status='completed', completed_at=NOW(), records_synced. markCompleted handles it." },
  { turn: 14, phase: 'recall', user: "What metrics are tracked per job and what config controls the flush interval?", noMemoryFileReads: ['sync-engine.ts', 'config.ts'], irantiInjectKey: 'engine_config_metrics', irantiAssistant: "From memory: recordJobSuccess, recordJobError(class). METRICS_FLUSH_INTERVAL_MS=10s." },
  { turn: 15, phase: 'recall', user: "What's CIRCUIT_RESET_MS and what does withRetry do after a circuit opens?", noMemoryFileReads: ['config.ts', 'api-client.ts'], irantiInjectKey: 'config_apiclient_2', irantiAssistant: "From memory: CIRCUIT_RESET_MS=60000ms. withRetry throws immediately if open AND now<resetAt." },
];

// 3-file recall turns: questions require checking 3 files
const RECALL_3FILE = [
  { turn: 6,  phase: 'recall', user: "Walk me through a successful job — what does the engine do, how does the queue mark it, and what columns change in the DB?", noMemoryFileReads: ['sync-engine.ts', 'queue.ts', 'db-models.ts'], irantiInjectKey: 'engine_queue_db', irantiAssistant: "From memory: processJob→updateJobStatus('completed'). markCompleted sets records_synced." },
  { turn: 7,  phase: 'recall', user: "A job hits a rate-limit repeatedly. What class is it, what config gates the DLQ, and how does the queue schedule retries?", noMemoryFileReads: ['error-handler.ts', 'config.ts', 'queue.ts'], irantiInjectKey: 'errorhandler_config_queue', irantiAssistant: "From memory: rate-limit class retryable=true. DLQ after 5. markFailed uses exponential next_retry_at." },
  { turn: 8,  phase: 'recall', user: "A CRM contact comes in — how is it normalized, what GraphQL type does it become, and what DB columns store it?", noMemoryFileReads: ['transformers.ts', 'schema.graphql', 'db-models.ts'], irantiInjectKey: 'transformers_schema_db', irantiAssistant: "From memory: normalizeContact maps firstName/email/tags. RecordType.CONTACT. Stored in sync_jobs.record_type." },
  { turn: 9,  phase: 'recall', user: "End-to-end circuit breaker — open condition, key tracking, and what config gates threshold and reset?", noMemoryFileReads: ['api-client.ts', 'config.ts', 'sync-engine.ts'], irantiInjectKey: 'apiclient_config_engine', irantiAssistant: "From memory: 5 failures → circuit open, 60s reset. recordCircuitOpen called. CIRCUIT_BREAKER_THRESHOLD=5." },
  { turn: 10, phase: 'recall', user: "Priority flow — from createSyncJob in GraphQL, through queue ordering, to worker assignment in the engine?", noMemoryFileReads: ['schema.graphql', 'queue.ts', 'sync-engine.ts'], irantiInjectKey: 'schema_queue_engine', irantiAssistant: "From memory: createSyncJob sets priority. Dequeue orders by priority DESC. processBatch handles the batch." },
  { turn: 11, phase: 'recall', user: "Full dead-letter path — classification, queue state transition, and GraphQL surface for requeuing?", noMemoryFileReads: ['error-handler.ts', 'queue.ts', 'schema.graphql'], irantiInjectKey: 'errorhandler_queue_schema', irantiAssistant: "From memory: !retryable → DLQ immediately. retry_count>=5 → DLQ. requeueDeadLetter mutation." },
  { turn: 12, phase: 'recall', user: "What configuration controls the sync schedule, what DB tables store per-connection config, and how does the engine pick up these values?", noMemoryFileReads: ['config.ts', 'db-models.ts', 'sync-engine.ts'], irantiInjectKey: 'config_db_engine', irantiAssistant: "From memory: sync_configs table stores per-connection overrides. Engine uses SYNC_INTERVAL_MS from config." },
  { turn: 13, phase: 'recall', user: "How does a record get fetched, transformed, and pushed — transformer API, API client calls, and the GraphQL types involved?", noMemoryFileReads: ['transformers.ts', 'api-client.ts', 'schema.graphql'], irantiInjectKey: 'transformers_apiclient_schema', irantiAssistant: "From memory: fetchRecords→transform→pushRecords. RecordType enum governs transformer key lookup." },
  { turn: 14, phase: 'recall', user: "What's the retry backoff formula, how does error classification gate it, and what's the retry_count column behavior?", noMemoryFileReads: ['queue.ts', 'error-handler.ts', 'config.ts'], irantiInjectKey: 'queue_errorhandler_config', irantiAssistant: "From memory: delay=1s*2^attempt. Auth/schema bypass. Dequeue filters retry_count<5." },
  { turn: 15, phase: 'recall', user: "I need sync metrics + config stats + current job status API in one answer — what's available?", noMemoryFileReads: ['sync-engine.ts', 'config.ts', 'schema.graphql'], irantiInjectKey: 'engine_config_schema', irantiAssistant: "From memory: SyncMetrics tracks job success/error/class. syncStats GraphQL query returns errorRate+totals." },
];

// Extended 30-turn recall for Scenario C (uses 2-file recall, 25 recall turns)
const RECALL_2FILE_EXTENDED = [
  ...RECALL_2FILE, // turns 6-15
  // turns 16-30 (re-asking similar cross-file questions to build up context)
  { turn: 16, phase: 'recall', user: "Remind me: retry limit, base delay, and the circuit breaker threshold.", noMemoryFileReads: ['config.ts', 'api-client.ts'], irantiInjectKey: 'config_apiclient', irantiAssistant: "From memory: RETRY_LIMIT=3, 1s base, circuit at 5 failures." },
  { turn: 17, phase: 'recall', user: "What's the DEAD_LETTER_THRESHOLD and what error classes are non-retryable?", noMemoryFileReads: ['config.ts', 'error-handler.ts'], irantiInjectKey: 'config_errorhandler', irantiAssistant: "From memory: DLQ after 5. auth and schema classes are non-retryable." },
  { turn: 18, phase: 'recall', user: "What's MAX_CONCURRENT_JOBS and how does the queue prevent double-claiming?", noMemoryFileReads: ['queue.ts', 'config.ts'], irantiInjectKey: 'queue_config', irantiAssistant: "From memory: 10 concurrent max, SKIP LOCKED prevents race conditions." },
  { turn: 19, phase: 'recall', user: "Reconfirm requeueDeadLetter and what triggers DLQ entry.", noMemoryFileReads: ['schema.graphql', 'error-handler.ts'], irantiInjectKey: 'schema_errorhandler', irantiAssistant: "From memory: requeueDeadLetter mutation, triggered by non-retryable or retry exhaustion." },
  { turn: 20, phase: 'recall', user: "What's fast mode interval and what config key controls it?", noMemoryFileReads: ['config.ts', 'sync-engine.ts'], irantiInjectKey: 'config_engine', irantiAssistant: "From memory: FAST_MODE_INTERVAL_MS=5000ms, start(fastMode=true)." },
  { turn: 21, phase: 'recall', user: "What does ConnectionHealth expose and how does checkHealth measure latency?", noMemoryFileReads: ['api-client.ts', 'schema.graphql'], irantiInjectKey: 'apiclient_schema', irantiAssistant: "From memory: Date.now() diff, 'failing' on error. consecutiveFailures in schema." },
  { turn: 22, phase: 'recall', user: "What field aliases does normalizeContact handle for email?", noMemoryFileReads: ['transformers.ts', 'schema.graphql'], irantiInjectKey: 'transformers_schema', irantiAssistant: "From memory: email or emailAddress, lowercased." },
  { turn: 23, phase: 'recall', user: "What marks a job completed in both queue and db?", noMemoryFileReads: ['db-models.ts', 'queue.ts'], irantiInjectKey: 'dbmodels_queue', irantiAssistant: "From memory: status='completed', completed_at, records_synced." },
  { turn: 24, phase: 'recall', user: "How often do metrics flush and what engine events trigger metrics writes?", noMemoryFileReads: ['sync-engine.ts', 'config.ts'], irantiInjectKey: 'engine_config_metrics', irantiAssistant: "From memory: 10s flush, recordEngineStart/Stop/JobSuccess/BatchFailures." },
  { turn: 25, phase: 'recall', user: "What's CIRCUIT_RESET_MS and when does withRetry stop throwing after circuit opens?", noMemoryFileReads: ['config.ts', 'api-client.ts'], irantiInjectKey: 'config_apiclient_2', irantiAssistant: "From memory: 60000ms. Stops throwing once now >= resetAt." },
  { turn: 26, phase: 'recall', user: "Retry limit and circuit threshold — I keep forgetting both.", noMemoryFileReads: ['config.ts', 'api-client.ts'], irantiInjectKey: 'config_apiclient', irantiAssistant: "From memory: RETRY_LIMIT=3, CIRCUIT_BREAKER_THRESHOLD=5." },
  { turn: 27, phase: 'recall', user: "What error class does HTTP 401 produce and what happens next?", noMemoryFileReads: ['error-handler.ts', 'config.ts'], irantiInjectKey: 'config_errorhandler', irantiAssistant: "From memory: auth class (401/403), retryable=false → immediate DLQ." },
  { turn: 28, phase: 'recall', user: "What's WORKER_POOL_SIZE and how does the queue limit concurrency?", noMemoryFileReads: ['queue.ts', 'config.ts'], irantiInjectKey: 'queue_config', irantiAssistant: "From memory: WORKER_POOL_SIZE=4, MAX_CONCURRENT_JOBS=10, SKIP LOCKED." },
  { turn: 29, phase: 'recall', user: "What does the syncStats GraphQL query return?", noMemoryFileReads: ['schema.graphql', 'sync-engine.ts'], irantiInjectKey: 'config_engine', irantiAssistant: "From memory: totalJobs, successfulJobs, failedJobs, errorRate, averageDuration." },
  { turn: 30, phase: 'recall', user: "Final: default sync interval, max batch size, and how the engine loop is stopped cleanly.", noMemoryFileReads: ['config.ts', 'sync-engine.ts'], irantiInjectKey: 'config_engine', irantiAssistant: "From memory: 30s interval, batch 100, stop() drains queue." },
];

// ── System prompts ────────────────────────────────────────────────────────────
const BASE_SYSTEM    = `You are an expert software engineer helping debug and understand a DataSync codebase. Be precise and cite specific values.`;
const IRANTI_SYSTEM  = BASE_SYSTEM + '\n\n' + SYSTEM_INJECTION_BLOCK;

// ── Tools ─────────────────────────────────────────────────────────────────────
const READ_TOOL = { name: 'read_file', description: 'Read a source file.', input_schema: { type: 'object', properties: { path: { type: 'string' } }, required: ['path'] } };
const ATTEND_TOOL = { name: 'mcp__iranti__iranti_attend', description: 'Ask Iranti for memory injection.', input_schema: { type: 'object', properties: { phase: { type: 'string' }, latestMessage: { type: 'string' } }, required: ['phase'] } };
const BASE_TOOLS   = [READ_TOOL];
const IRANTI_TOOLS = [READ_TOOL, ATTEND_TOOL];

// ── Message helpers ───────────────────────────────────────────────────────────
function fileToolUse(filename)   { return { type: 'tool_use', id: `tu_${filename.replace(/\W/g,'_')}`, name: 'read_file', input: { path: filename } }; }
function fileToolResult(filename){ return { type: 'tool_result', tool_use_id: `tu_${filename.replace(/\W/g,'_')}`, content: [{ type: 'text', text: FILES[filename] || `// ${filename} not found` }] }; }
function attendToolUse(n)   { return { type: 'tool_use', id: `ta_t${n}`, name: 'mcp__iranti__iranti_attend', input: JSON.parse(ATTEND_TOOL_CALL_INPUT) }; }
function attendToolResult(n, withInject) {
  const resp = withInject
    ? JSON.stringify({ ...JSON.parse(ATTEND_RESPONSE_NO_INJECT), shouldInject: true, reason: 'memory_matched', facts: [{ summary: 'injected' }] })
    : ATTEND_RESPONSE_NO_INJECT;
  return { type: 'tool_result', tool_use_id: `ta_t${n}`, content: [{ type: 'text', text: resp }] };
}

// ── Context builders ──────────────────────────────────────────────────────────
function buildNoMemory(turns) {
  const msgs = [];
  for (const t of turns) {
    if (t.phase === 'establishment') {
      msgs.push({ role: 'user', content: [{ type: 'text', text: t.user }] });
      msgs.push({ role: 'assistant', content: [{ type: 'text', text: t.assistantText || 'Reading.' }, fileToolUse(t.fileRead)] });
      msgs.push({ role: 'user', content: [fileToolResult(t.fileRead)] });
    } else {
      // Multi-file recall: sequential reads
      const files = t.noMemoryFileReads;
      msgs.push({ role: 'user', content: [{ type: 'text', text: t.user }] });
      for (let i = 0; i < files.length; i++) {
        const isLast = i === files.length - 1;
        msgs.push({ role: 'assistant', content: [{ type: 'text', text: `Checking ${files[i]}${isLast ? '' : ' first'}.` }, fileToolUse(files[i])] });
        msgs.push({ role: 'user', content: [fileToolResult(files[i])] });
      }
      // Final assistant response after all reads
      msgs.push({ role: 'assistant', content: [{ type: 'text', text: `Based on ${files.join(' and ')}: ${t.irantiAssistant || 'Here are the values.'}` }] });
    }
  }
  return msgs;
}

function buildWithIranti(turns, injectBlocks) {
  const msgs = [];
  for (const t of turns) {
    const isRecall = t.phase === 'recall';
    const block = isRecall ? injectBlocks[t.irantiInjectKey] : null;

    // User message (with inject block prepended on recall turns)
    const userContent = [];
    if (block) userContent.push({ type: 'text', text: block });
    userContent.push({ type: 'text', text: t.user });
    msgs.push({ role: 'user', content: userContent });

    // Pre-response attend call
    msgs.push({ role: 'assistant', content: [attendToolUse(t.turn)] });
    msgs.push({ role: 'user', content: [attendToolResult(t.turn, isRecall && !!block)] });

    if (t.phase === 'establishment') {
      msgs.push({ role: 'assistant', content: [{ type: 'text', text: t.assistantText || 'Reading.' }, fileToolUse(t.fileRead)] });
      msgs.push({ role: 'user', content: [fileToolResult(t.fileRead)] });
    } else {
      msgs.push({ role: 'assistant', content: [{ type: 'text', text: t.irantiAssistant || 'From memory: confirmed.' }] });
    }
  }
  return msgs;
}

// ── countTokens ───────────────────────────────────────────────────────────────
async function countTokens(client, system, messages, tools) {
  const result = await client.beta.messages.countTokens({
    model: MODEL, system, messages, tools,
    betas: ['token-counting-2024-11-01'],
  });
  return result.input_tokens;
}

// ── Overhead measurement ──────────────────────────────────────────────────────
async function measureOverhead(client) {
  const base    = await countTokens(client, BASE_SYSTEM,   [{ role: 'user', content: 'Hello' }], BASE_TOOLS);
  const iranti  = await countTokens(client, IRANTI_SYSTEM, [{ role: 'user', content: 'Hello' }], IRANTI_TOOLS);
  const sysInj  = iranti - base;

  const baseTurn = await countTokens(client, BASE_SYSTEM,
    [{ role: 'user', content: 'Question?' }], BASE_TOOLS);
  const withAttendNoInj = await countTokens(client, BASE_SYSTEM, [
    { role: 'user', content: 'Question?' },
    { role: 'assistant', content: [attendToolUse(0)] },
    { role: 'user', content: [attendToolResult(0, false)] },
  ], IRANTI_TOOLS);

  return {
    systemInjection: sysInj,
    attendNoInject:  withAttendNoInj - baseTurn,
  };
}

// ── Scenario runner ───────────────────────────────────────────────────────────
async function runScenario(client, name, turns, injectBlocks, filesPerRecall) {
  console.log(`\n  Scenario ${name} (${filesPerRecall} files/recall)...`);
  const results = [];

  for (let i = 1; i <= turns.length; i++) {
    const slice  = turns.slice(0, i);
    const noMem  = buildNoMemory(slice);
    const iranti = buildWithIranti(slice, injectBlocks);

    const noMemTok  = await countTokens(client, BASE_SYSTEM,   noMem,  BASE_TOOLS);
    const irantiTok = await countTokens(client, IRANTI_SYSTEM, iranti, IRANTI_TOOLS);

    const delta    = noMemTok - irantiTok;
    const deltaPct = Math.round((delta / noMemTok) * 100);
    const t = turns[i - 1];
    results.push({ turn: t.turn, phase: t.phase, noMemory: noMemTok, withIranti: irantiTok, delta, deltaPct });
    const sign = delta >= 0 ? '+' : '';
    process.stdout.write(`    Turn ${String(i).padStart(2)}: NO_MEM=${noMemTok.toLocaleString().padStart(7)} | IRANTI=${irantiTok.toLocaleString().padStart(7)} | Δ=${sign}${delta} (${sign}${deltaPct}%)\n`);
  }

  const crossover = results.find(r => r.delta >= 0)?.turn ?? null;
  const final     = results[results.length - 1];
  const recallN   = turns.filter(t => t.phase === 'recall').length;

  return {
    turns: results,
    summary: {
      scenario: name, filesPerRecall, totalTurns: turns.length,
      recallTurns: recallN, establishmentTurns: turns.length - recallN,
      noMemoryFinal: final.noMemory, withIrantiFinal: final.withIranti,
      absoluteDelta: final.delta, relativeDeltaPct: final.deltaPct,
      crossoverTurn: crossover, irantiWins: final.delta > 0,
    },
  };
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  const client = new Anthropic({ apiKey: resolveAnthropicKey() });

  console.log('B16: Token Economy Under Multi-File Recall');
  console.log('='.repeat(60));
  console.log(`Model: ${MODEL}\n`);

  console.log('Phase 1: Measuring overhead...');
  const overhead = await measureOverhead(client);
  console.log(`  System injection:  +${overhead.systemInjection} tokens`);
  console.log(`  Attend/turn (no inject): +${overhead.attendNoInject} tokens`);

  // B15 break-even math for display
  const approxFileSize = 700; // avg DataSync file tokens
  const approxInjectPer2 = 200; // 2-fact inject block
  const approxInjectPer3 = 280; // 3-fact inject block
  const attendWithInject = overhead.attendNoInject + 100; // approx
  const netPerRecall2 = (2 * approxFileSize) - (approxInjectPer2 + attendWithInject);
  const netPerRecall3 = (3 * approxFileSize) - (approxInjectPer3 + attendWithInject);
  console.log(`\n  Expected per-recall savings (2 files): ~+${netPerRecall2} tok/turn`);
  console.log(`  Expected per-recall savings (3 files): ~+${netPerRecall3} tok/turn\n`);

  const scenA = await runScenario(client, 'A', [...ESTABLISHMENT_TURNS, ...RECALL_2FILE], INJECT_2_FILE, 2);
  const scenB = await runScenario(client, 'B', [...ESTABLISHMENT_TURNS, ...RECALL_3FILE], INJECT_3_FILE, 3);
  const scenC = await runScenario(client, 'C', [...ESTABLISHMENT_TURNS, ...RECALL_2FILE_EXTENDED], INJECT_2_FILE, 2);

  // ── Write outputs ───────────────────────────────────────────────────────────
  const execData = {
    benchmark: 'B16', title: 'Token Economy Under Multi-File Recall',
    executedAt: new Date().toISOString(), model: MODEL, version: 'v0.3.12',
    overhead,
    b15Reference: { attendOverheadPerTurn: 633, singleFileReread: 700, b15Finding: 'Iranti net-negative at 1 file/recall turn' },
    scenarios: { A: scenA, B: scenB, C: scenC },
  };
  fs.writeFileSync(outputJson, JSON.stringify(execData, null, 2));
  console.log(`\nJSON → ${outputJson}`);

  function table(turns) {
    const h = '| Turn | Phase | NO_MEMORY | WITH_IRANTI | Δ saved | Δ% |\n|------|-------|-----------|-------------|---------|-----|';
    return [h, ...turns.map(r => {
      const d = r.delta >= 0 ? `+${r.delta}` : `${r.delta}`;
      const p = r.deltaPct >= 0 ? `+${r.deltaPct}%` : `${r.deltaPct}%`;
      return `| ${r.turn} | ${r.phase} | ${r.noMemory.toLocaleString()} | ${r.withIranti.toLocaleString()} | ${d} | ${p} |`;
    })].join('\n');
  }

  const A = scenA.summary, B = scenB.summary, C = scenC.summary;

  const md = `# B16: Token Economy Under Multi-File Recall

**Track:** B16 - Token Economy (Multi-Recall)
**Executed:** ${new Date().toISOString().slice(0,10)}
**Model:** ${MODEL}
**Method:** Anthropic countTokens API (exact counts)

---

## Context: What B15 Found

B15 showed that with **1 file re-read per recall turn** (~700 tok), Iranti's attend
overhead (~633–911 tok/turn) is larger than the savings per recall turn. Iranti was
net-negative in all scenarios tested.

Break-even requires more re-read cost per recall turn than attend overhead.
**Prediction:** ≥2 files/recall turn should flip Iranti positive.

---

## Overhead (re-measured)

| Component | Tokens |
|-----------|--------|
| System injection (one-time) | +${overhead.systemInjection} tokens |
| Attend call overhead/turn | +${overhead.attendNoInject} tokens |

---

## Scenario A — 2 files/recall turn (15 turns, 10 recall)

${table(scenA.turns)}

**Result:** ${A.irantiWins
  ? `WITH_IRANTI saves **${A.absoluteDelta.toLocaleString()} tokens (${A.relativeDeltaPct}%)** at turn ${A.totalTurns}. Crossover at turn ${A.crossoverTurn}.`
  : `WITH_IRANTI still costs ${Math.abs(A.absoluteDelta).toLocaleString()} more tokens (${Math.abs(A.relativeDeltaPct)}%). Crossover: never in ${A.totalTurns} turns.`}

---

## Scenario B — 3 files/recall turn (15 turns, 10 recall)

${table(scenB.turns)}

**Result:** ${B.irantiWins
  ? `WITH_IRANTI saves **${B.absoluteDelta.toLocaleString()} tokens (${B.relativeDeltaPct}%)** at turn ${B.totalTurns}. Crossover at turn ${B.crossoverTurn}.`
  : `WITH_IRANTI still costs ${Math.abs(B.absoluteDelta).toLocaleString()} more tokens (${Math.abs(B.relativeDeltaPct)}%). Crossover: never.`}

---

## Scenario C — 2 files/recall turn (30 turns, 25 recall)

${table(scenC.turns)}

**Result:** ${C.irantiWins
  ? `WITH_IRANTI saves **${C.absoluteDelta.toLocaleString()} tokens (${C.relativeDeltaPct}%)** at turn ${C.totalTurns}. Crossover at turn ${C.crossoverTurn}.`
  : `WITH_IRANTI costs ${Math.abs(C.absoluteDelta).toLocaleString()} more (${Math.abs(C.relativeDeltaPct)}%). Crossover: never in ${C.totalTurns} turns.`}

---

## Cross-Scenario Summary

| Scenario | Files/recall | Turns | Recall | Final NO_MEM | Final WITH_IRANTI | Net | % | Iranti wins | Crossover |
|----------|-------------|-------|--------|-------------|-------------------|-----|---|-------------|-----------|
| A | 2 | ${A.totalTurns} | ${A.recallTurns} | ${A.noMemoryFinal.toLocaleString()} | ${A.withIrantiFinal.toLocaleString()} | ${A.absoluteDelta > 0 ? '+' : ''}${A.absoluteDelta} | ${A.relativeDeltaPct}% | ${A.irantiWins ? 'Yes' : 'No'} | ${A.crossoverTurn ?? 'Never'} |
| B | 3 | ${B.totalTurns} | ${B.recallTurns} | ${B.noMemoryFinal.toLocaleString()} | ${B.withIrantiFinal.toLocaleString()} | ${B.absoluteDelta > 0 ? '+' : ''}${B.absoluteDelta} | ${B.relativeDeltaPct}% | ${B.irantiWins ? 'Yes' : 'No'} | ${B.crossoverTurn ?? 'Never'} |
| C | 2 | ${C.totalTurns} | ${C.recallTurns} | ${C.noMemoryFinal.toLocaleString()} | ${C.withIrantiFinal.toLocaleString()} | ${C.absoluteDelta > 0 ? '+' : ''}${C.absoluteDelta} | ${C.relativeDeltaPct}% | ${C.irantiWins ? 'Yes' : 'No'} | ${C.crossoverTurn ?? 'Never'} |

---

## B14 / B15 / B16 Comparison

| Benchmark | What it measured | Net saving at 15t | Key finding |
|-----------|-----------------|-------------------|-------------|
| B14 | Inject savings only (no overhead) | +37% (+3,272 tok) | Inject blocks cheaper than re-reads |
| B15 | Full overhead, 1 file/recall | -103% (-7,536 tok) | Attend overhead dominates |
| B16-A | Full overhead, 2 files/recall | ${A.relativeDeltaPct >= 0 ? '+' : ''}${A.relativeDeltaPct}% | ${A.irantiWins ? 'Multi-file tips Iranti positive' : 'Still negative at 2 files'} |
| B16-B | Full overhead, 3 files/recall | ${B.relativeDeltaPct >= 0 ? '+' : ''}${B.relativeDeltaPct}% | ${B.irantiWins ? 'Clearly positive at 3 files' : 'Negative even at 3 files'} |

---

**Token counts are exact** (Anthropic countTokens API).
`;

  fs.writeFileSync(outputMd, md);
  console.log(`Markdown → ${outputMd}`);

  console.log('\n' + '='.repeat(60));
  console.log('B16 Complete:');
  console.log(`  Overhead: +${overhead.systemInjection} sys + ${overhead.attendNoInject} tok/turn attend`);
  console.log(`  Scenario A (2 files/recall, 15t): ${A.absoluteDelta > 0 ? '+' : ''}${A.absoluteDelta} tok (${A.relativeDeltaPct}%) — ${A.irantiWins ? 'IRANTI WINS' : 'iranti loses'} | crossover=${A.crossoverTurn ?? 'none'}`);
  console.log(`  Scenario B (3 files/recall, 15t): ${B.absoluteDelta > 0 ? '+' : ''}${B.absoluteDelta} tok (${B.relativeDeltaPct}%) — ${B.irantiWins ? 'IRANTI WINS' : 'iranti loses'} | crossover=${B.crossoverTurn ?? 'none'}`);
  console.log(`  Scenario C (2 files/recall, 30t): ${C.absoluteDelta > 0 ? '+' : ''}${C.absoluteDelta} tok (${C.relativeDeltaPct}%) — ${C.irantiWins ? 'IRANTI WINS' : 'iranti loses'} | crossover=${C.crossoverTurn ?? 'none'}`);
}

main().catch(err => { console.error('B16 failed:', err.message); process.exit(1); });
