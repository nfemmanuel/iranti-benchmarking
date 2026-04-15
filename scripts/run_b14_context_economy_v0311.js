/**
 * B14: Context Economy — With vs Without Iranti Over Time
 *
 * Measures cumulative input_tokens per turn for a scripted 15-turn coding session
 * in two arms:
 *   NO_MEMORY  — agent re-reads files when it needs context from earlier turns
 *   WITH_IRANTI — agent receives compact inject blocks instead of re-reading
 *
 * Uses Anthropic's countTokens API (no generation, no LLM cost beyond API call overhead).
 * Token counts are exact — not char/4 estimates.
 *
 * Session: "DebugAuth" — agent debugging a JWT authentication system across 15 turns
 *   Turns 1-7  : Establishment — agent reads 7 knowledge files (both arms identical)
 *   Turns 8-15 : Recall — agent needs facts from earlier files
 *     NO_MEMORY : re-reads the relevant file(s) each recall turn
 *     WITH_IRANTI: inject block delivers compact facts (no re-read needed)
 *
 * No running Iranti instance required — inject blocks are pre-computed to match
 * what Iranti would return for these specific facts at v0.3.11 compact format.
 */

'use strict';

const fs   = require('fs');
const path = require('path');
const Anthropic = require('@anthropic-ai/sdk');

// ── Config ────────────────────────────────────────────────────────────────────
const MODEL = 'claude-sonnet-4-6';

const outputDir  = path.resolve('results/raw');
const outputJson = path.join(outputDir, 'B14-context-economy-v0311-execution.json');
const outputMd   = path.join(outputDir, 'B14-context-economy-v0311-trial.md');
fs.mkdirSync(outputDir, { recursive: true });

// ── API key resolution ────────────────────────────────────────────────────────
function readEnvValue(filePath, key) {
  if (!fs.existsSync(filePath)) return '';
  const line = fs.readFileSync(filePath, 'utf8').split(/\r?\n/).find(x => x.startsWith(`${key}=`));
  return line ? line.slice(key.length + 1).trim() : '';
}

function resolveAnthropicKey() {
  const runtimeRoot = process.env.IRANTI_BENCH_RUNTIME_ROOT || 'C:\\Users\\NF\\.iranti-runtime';
  const devEnv = path.join(runtimeRoot, 'instances', 'iranti_dev', '.env');
  let key = readEnvValue(devEnv, 'ANTHROPIC_API_KEY');
  if (!key) key = process.env.ANTHROPIC_API_KEY || '';
  if (!key) throw new Error('ANTHROPIC_API_KEY not found. Set it in iranti_dev .env or ANTHROPIC_API_KEY env var.');
  return key;
}

// ── Synthetic knowledge files ─────────────────────────────────────────────────
// Realistic-length TypeScript/SQL file content for a fictional auth system.
const FILES = {
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
  id            TEXT PRIMARY KEY,  -- session_id from JWT payload
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
  // Public routes — no auth
  router.post('/auth/login',    authController.login);
  router.post('/auth/register', authController.register);
  router.post('/auth/refresh',  authController.refresh);

  // Protected routes — require valid JWT
  router.use('/api', ...authMiddlewareStack);
  router.get('/api/user/profile',   userController.getProfile);
  router.put('/api/user/settings',  userController.updateSettings);
  router.get('/api/user/sessions',  userController.listSessions);
  router.delete('/api/user/sessions/:id', userController.revokeSession);

  // Admin routes — require admin role
  router.use('/admin', ...authMiddlewareStack, requireRole('admin'));
}`,

  'session-manager.ts': `// session-manager.ts — Session Lifecycle Management
import { db } from './db';
import { MAX_SESSIONS_PER_USER } from './config';

export async function validateSession(sessionId: string): Promise<boolean> {
  const result = await db.query(
    'SELECT invalidated FROM sessions WHERE id = $1',
    [sessionId]
  );
  return result.rows.length > 0 && !result.rows[0].invalidated;
}

export async function invalidateSession(sessionId: string): Promise<void> {
  await db.query(
    'UPDATE sessions SET invalidated = TRUE, invalidated_at = NOW() WHERE id = $1',
    [sessionId]
  );
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
  if (active.rows.length >= MAX_SESSIONS_PER_USER) {
    await invalidateSession(active.rows[0].id);
  }
}`,
};

// ── Iranti inject blocks (pre-computed, v0.3.11 compact format) ───────────────
// These simulate exactly what iranti_attend would return for these specific facts
// at confidence=100, age<7 days (compact format applies).
const INJECT_BLOCKS = {
  config: `[Iranti Retrieved Memory]
REQUIRED: Prefer the injected facts below before re-inference.
If an injected fact conflicts with your guess, use the injected fact.
FACTS:
- F1 | project/sampleapp/jwt_config
  summary: JWT_SECRET from env (min 32 chars). TOKEN_EXPIRY=900s (15 min). REFRESH_EXPIRY=604800s (7 days). BCRYPT_ROUNDS=12. MAX_SESSIONS_PER_USER=5.`,

  api_routes: `[Iranti Retrieved Memory]
REQUIRED: Prefer the injected facts below before re-inference.
If an injected fact conflicts with your guess, use the injected fact.
FACTS:
- F1 | project/sampleapp/api_route_protection
  summary: Public: /auth/login, /auth/register, /auth/refresh, /health. Protected (/api/*): require valid JWT via authMiddlewareStack. Admin (/admin/*): require JWT + admin role.`,

  token_expiry: `[Iranti Retrieved Memory]
REQUIRED: Prefer the injected facts below before re-inference.
If an injected fact conflicts with your guess, use the injected fact.
FACTS:
- F1 | project/sampleapp/token_lifecycle
  summary: Access token: 900s (15 min), signed with JWT_SECRET. Refresh token: 604800s (7 days), stored as SHA-256 hash in refresh_tokens table. Rotation invalidates old session and issues new pair.`,

  session_invalidation: `[Iranti Retrieved Memory]
REQUIRED: Prefer the injected facts below before re-inference.
If an injected fact conflicts with your guess, use the injected fact.
FACTS:
- F1 | project/sampleapp/session_invalidation
  summary: invalidateSession() sets sessions.invalidated=TRUE and marks all refresh_tokens for that session as used. invalidateAllUserSessions() walks all active sessions for a user. Session limit enforced by enforceSessionLimit() on login (evicts oldest).`,

  db_refresh_table: `[Iranti Retrieved Memory]
REQUIRED: Prefer the injected facts below before re-inference.
If an injected fact conflicts with your guess, use the injected fact.
FACTS:
- F1 | project/sampleapp/db_schema_auth
  summary: refresh_tokens table: id(serial), session_id(FK→sessions), user_id(FK→users), token_hash(unique SHA-256), used(bool), expires_at. sessions table: id(text PK=sessionId), user_id(FK), invalidated(bool). Indexed on session_id and user_id.`,

  middleware_order: `[Iranti Retrieved Memory]
REQUIRED: Prefer the injected facts below before re-inference.
If an injected fact conflicts with your guess, use the injected fact.
FACTS:
- F1 | project/sampleapp/middleware_stack
  summary: Middleware execution order: rateLimiter → extractBearer → verifyJWT → attachUser. extractBearer requires 'Bearer ' prefix (401 if missing). verifyJWT calls verifyToken() (401 on failure). attachUser sets req.userId and req.roles.`,

  auth_flow_summary: `[Iranti Retrieved Memory]
REQUIRED: Prefer the injected facts below before re-inference.
If an injected fact conflicts with your guess, use the injected fact.
FACTS:
- F1 | project/sampleapp/auth_flow
  summary: verifyToken() calls jwt.verify(token, JWT_SECRET) then validateSession(sessionId). signToken() issues JWT with userId/sessionId/roles, expiresIn=TOKEN_EXPIRY. signRefreshToken() issues longer-lived token.
- F2 | project/sampleapp/token_lifecycle
  summary: Access token: 900s (15 min), signed with JWT_SECRET. Refresh token: 604800s (7 days), stored as SHA-256 hash in refresh_tokens table. Rotation invalidates old session and issues new pair.
- F3 | project/sampleapp/middleware_stack
  summary: Middleware execution order: rateLimiter → extractBearer → verifyJWT → attachUser. extractBearer requires 'Bearer ' prefix (401 if missing). verifyJWT calls verifyToken() (401 on failure). attachUser sets req.userId and req.roles.`,

  jwt_validation_test: `[Iranti Retrieved Memory]
REQUIRED: Prefer the injected facts below before re-inference.
If an injected fact conflicts with your guess, use the injected fact.
FACTS:
- F1 | project/sampleapp/token_lifecycle
  summary: Access token: 900s (15 min), signed with JWT_SECRET. Refresh token: 604800s (7 days), stored as SHA-256 hash in refresh_tokens table. Rotation invalidates old session and issues new pair.
- F2 | project/sampleapp/jwt_config
  summary: JWT_SECRET from env (min 32 chars). TOKEN_EXPIRY=900s (15 min). REFRESH_EXPIRY=604800s (7 days). BCRYPT_ROUNDS=12. MAX_SESSIONS_PER_USER=5.`,
};

// ── System prompt ─────────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are an expert TypeScript developer helping debug and understand a codebase.
You have access to a read_file tool to read source files. Be precise and cite specific values from files when answering questions.
When you need to answer a question that requires knowing the content of a file, use the read_file tool to retrieve it first.`;

// ── Tool definition ───────────────────────────────────────────────────────────
const TOOLS = [
  {
    name: 'read_file',
    description: 'Read the content of a source file by filename.',
    input_schema: {
      type: 'object',
      properties: { path: { type: 'string', description: 'The filename to read' } },
      required: ['path'],
    },
  },
];

// ── Session script ────────────────────────────────────────────────────────────
// Each turn: { user, assistantText, toolCall?, toolResult?, injectBlock? }
//   toolCall   present in establishment and NO_MEMORY recall re-reads
//   injectBlock present in WITH_IRANTI recall turns (replaces toolCall+toolResult)
const SESSION_TURNS = [
  // ── Establishment (turns 1-7) — identical in both arms ──────────────────────
  {
    turn: 1, phase: 'establishment',
    user: 'I need to understand the auth system. Can you start by reading auth.ts?',
    assistantText: "I'll read auth.ts to understand the JWT authentication implementation.",
    toolCall: { name: 'read_file', input: { path: 'auth.ts' } },
    fileRead: 'auth.ts',
  },
  {
    turn: 2, phase: 'establishment',
    user: 'Good. Now check tokens.ts — I want to know how token pairs are issued.',
    assistantText: "Let me read tokens.ts to see the token issuance logic.",
    toolCall: { name: 'read_file', input: { path: 'tokens.ts' } },
    fileRead: 'tokens.ts',
  },
  {
    turn: 3, phase: 'establishment',
    user: 'And middleware.ts — what middleware stack does this use?',
    assistantText: "I'll check the middleware stack configuration.",
    toolCall: { name: 'read_file', input: { path: 'middleware.ts' } },
    fileRead: 'middleware.ts',
  },
  {
    turn: 4, phase: 'establishment',
    user: "What does the database schema look like for auth?",
    assistantText: "Let me read the DB schema to understand the auth tables.",
    toolCall: { name: 'read_file', input: { path: 'db-schema.sql' } },
    fileRead: 'db-schema.sql',
  },
  {
    turn: 5, phase: 'establishment',
    user: 'Can you check config.ts for the configuration values?',
    assistantText: "I'll read config.ts for the auth configuration constants.",
    toolCall: { name: 'read_file', input: { path: 'config.ts' } },
    fileRead: 'config.ts',
  },
  {
    turn: 6, phase: 'establishment',
    user: 'Which routes require authentication? Check api-routes.ts.',
    assistantText: "Let me read the route definitions.",
    toolCall: { name: 'read_file', input: { path: 'api-routes.ts' } },
    fileRead: 'api-routes.ts',
  },
  {
    turn: 7, phase: 'establishment',
    user: 'Last one — read session-manager.ts so we have the full picture.',
    assistantText: "I'll read session-manager.ts to understand session lifecycle.",
    toolCall: { name: 'read_file', input: { path: 'session-manager.ts' } },
    fileRead: 'session-manager.ts',
  },

  // ── Recall (turns 8-15) — diverge here ─────────────────────────────────────
  {
    turn: 8, phase: 'recall',
    user: "Quick question — what's the exact JWT secret config key name and what's the token expiry in seconds?",
    // NO_MEMORY: re-reads config.ts (read 3 turns ago)
    noMemoryAssistant: "Let me re-check config.ts to give you the exact values.",
    noMemoryToolCall: { name: 'read_file', input: { path: 'config.ts' } },
    noMemoryFileRead: 'config.ts',
    noMemoryFinalText: "From config.ts: JWT_SECRET comes from env, TOKEN_EXPIRY=900s (15min), REFRESH_EXPIRY=604800s (7d).",
    // WITH_IRANTI: inject delivers the answer
    irantiInjectKey: 'config',
    irantiAssistant: "Based on the injected memory: JWT_SECRET comes from env (min 32 chars), TOKEN_EXPIRY=900s (15min), REFRESH_EXPIRY=604800s (7d).",
  },
  {
    turn: 9, phase: 'recall',
    user: 'Which API endpoints are public vs protected? I need to know what requires auth.',
    noMemoryAssistant: "I'll re-check api-routes.ts for the route protection rules.",
    noMemoryToolCall: { name: 'read_file', input: { path: 'api-routes.ts' } },
    noMemoryFileRead: 'api-routes.ts',
    noMemoryFinalText: "Public: /auth/login, /auth/register, /auth/refresh, /health. Protected: /api/* requires JWT. Admin: /admin/* requires JWT + admin role.",
    irantiInjectKey: 'api_routes',
    irantiAssistant: "From injected memory: Public routes: /auth/login, /auth/register, /auth/refresh, /health. /api/* is protected by authMiddlewareStack. /admin/* requires JWT + admin role.",
  },
  {
    turn: 10, phase: 'recall',
    user: "How long does an access token last, and what happens when I call rotateRefreshToken?",
    noMemoryAssistant: "Let me look at tokens.ts again for the token expiry and rotation logic.",
    noMemoryToolCall: { name: 'read_file', input: { path: 'tokens.ts' } },
    noMemoryFileRead: 'tokens.ts',
    noMemoryFinalText: "Access tokens last 900s (15min). rotateRefreshToken() verifies the old token, invalidates the session, then calls issueTokenPair() for a fresh pair.",
    irantiInjectKey: 'token_expiry',
    irantiAssistant: "From injected memory: Access token is 900s (15min). Refresh token is 7 days, stored as SHA-256 hash. rotateRefreshToken invalidates the old session then issues a new pair.",
  },
  {
    turn: 11, phase: 'recall',
    user: "I'm seeing sessions not getting invalidated properly. Walk me through how session invalidation works.",
    noMemoryAssistant: "Let me re-read session-manager.ts to trace the invalidation logic.",
    noMemoryToolCall: { name: 'read_file', input: { path: 'session-manager.ts' } },
    noMemoryFileRead: 'session-manager.ts',
    noMemoryFinalText: "invalidateSession() sets sessions.invalidated=TRUE and marks all refresh_tokens for that session as used. enforceSessionLimit() evicts oldest session when MAX_SESSIONS_PER_USER is reached.",
    irantiInjectKey: 'session_invalidation',
    irantiAssistant: "From injected memory: invalidateSession() sets sessions.invalidated=TRUE and marks all matching refresh_tokens as used=TRUE. Max sessions enforced on login by evicting the oldest active session.",
  },
  {
    turn: 12, phase: 'recall',
    user: 'Which database table stores the refresh tokens, and what columns does it have?',
    noMemoryAssistant: "I'll re-check the DB schema for the refresh_tokens table structure.",
    noMemoryToolCall: { name: 'read_file', input: { path: 'db-schema.sql' } },
    noMemoryFileRead: 'db-schema.sql',
    noMemoryFinalText: "refresh_tokens has: id(serial), session_id(FK→sessions), user_id(FK→users), token_hash(unique), used(bool), expires_at. Indexed on session_id and user_id.",
    irantiInjectKey: 'db_refresh_table',
    irantiAssistant: "From injected memory: refresh_tokens table has id(serial PK), session_id(FK→sessions), user_id(FK→users), token_hash(unique SHA-256), used(bool), expires_at(timestamptz). Indexed on session_id and user_id.",
  },
  {
    turn: 13, phase: 'recall',
    user: 'What order does the middleware execute in, and what does each step do?',
    noMemoryAssistant: "Let me re-read middleware.ts to confirm the execution order.",
    noMemoryToolCall: { name: 'read_file', input: { path: 'middleware.ts' } },
    noMemoryFileRead: 'middleware.ts',
    noMemoryFinalText: "Order: rateLimiter → extractBearer → verifyJWT → attachUser. extractBearer requires Bearer prefix. verifyJWT calls verifyToken. attachUser sets req.userId and req.roles.",
    irantiInjectKey: 'middleware_order',
    irantiAssistant: "From injected memory: rateLimiter → extractBearer → verifyJWT → attachUser. extractBearer requires 'Bearer ' prefix (401 if missing). verifyJWT calls verifyToken() → 401 on failure. attachUser sets req.userId, req.roles.",
  },
  {
    turn: 14, phase: 'recall',
    user: "Can you give me a complete summary of the auth flow from login to API call? I want auth.ts, tokens.ts, and middleware.ts covered.",
    // NO_MEMORY: re-reads 3 files
    noMemoryAssistant: "I'll re-read auth.ts, tokens.ts, and middleware.ts to give you a complete picture.",
    noMemoryToolCalls: [
      { name: 'read_file', input: { path: 'auth.ts' } },
      { name: 'read_file', input: { path: 'tokens.ts' } },
      { name: 'read_file', input: { path: 'middleware.ts' } },
    ],
    noMemoryFilesRead: ['auth.ts', 'tokens.ts', 'middleware.ts'],
    noMemoryFinalText: "Full auth flow: Login → issueTokenPair() → stores refresh hash in DB. API call → rateLimiter → extractBearer → verifyJWT (jwt.verify + validateSession) → attachUser. Refresh → rotateRefreshToken → invalidates old session, issues new pair.",
    irantiInjectKey: 'auth_flow_summary',
    irantiAssistant: "From injected memory: Full flow: Login issues JWT (900s) + refresh token (7d, stored as hash). API calls go through rateLimiter→extractBearer→verifyJWT→attachUser. verifyToken checks jwt.verify AND validateSession. Refresh rotation invalidates old session.",
  },
  {
    turn: 15, phase: 'recall',
    user: "Write me a unit test for the JWT token validation — both valid and expired token cases.",
    // NO_MEMORY: re-reads tokens.ts and config.ts
    noMemoryAssistant: "Let me re-read tokens.ts and config.ts to write accurate tests.",
    noMemoryToolCalls: [
      { name: 'read_file', input: { path: 'tokens.ts' } },
      { name: 'read_file', input: { path: 'config.ts' } },
    ],
    noMemoryFilesRead: ['tokens.ts', 'config.ts'],
    noMemoryFinalText: "Here's the unit test:\n```typescript\ndescribe('verifyToken', () => {\n  it('accepts valid token', async () => { /* ... */ });\n  it('rejects expired token (>900s)', async () => { /* ... */ });\n  it('rejects invalidated session', async () => { /* ... */ });\n});\n```",
    irantiInjectKey: 'jwt_validation_test',
    irantiAssistant: "Based on injected memory (TOKEN_EXPIRY=900s, JWT_SECRET from env):\n```typescript\ndescribe('verifyToken', () => {\n  it('accepts valid token', async () => { /* ... */ });\n  it('rejects expired token (>900s)', async () => { /* ... */ });\n  it('rejects invalidated session', async () => { /* ... */ });\n});\n```",
  },
];

// ── Message builder ───────────────────────────────────────────────────────────
function buildMessages(turns, arm) {
  const messages = [];
  let toolIdCounter = 1;

  for (const t of turns) {
    if (t.phase === 'establishment') {
      // Both arms: read the file
      const toolId = `tu_${toolIdCounter++}`;
      messages.push({ role: 'user', content: t.user });
      messages.push({
        role: 'assistant',
        content: [
          { type: 'text', text: t.assistantText },
          { type: 'tool_use', id: toolId, name: t.toolCall.name, input: t.toolCall.input },
        ],
      });
      messages.push({
        role: 'user',
        content: [{ type: 'tool_result', tool_use_id: toolId, content: FILES[t.fileRead] }],
      });
      messages.push({
        role: 'assistant',
        content: `I've read ${t.fileRead} and noted the key implementation details.`,
      });
    } else {
      // Recall phase — diverge by arm
      if (arm === 'NO_MEMORY') {
        messages.push({ role: 'user', content: t.user });

        const calls = t.noMemoryToolCalls || [t.noMemoryToolCall];
        const files = t.noMemoryFilesRead || [t.noMemoryFileRead];

        // Multi-file re-reads (turn 14, 15) — sequential tool calls
        for (let i = 0; i < calls.length; i++) {
          const toolId = `tu_${toolIdCounter++}`;
          const assistText = i === 0 ? t.noMemoryAssistant : `Now reading ${files[i]}.`;
          messages.push({
            role: 'assistant',
            content: [
              { type: 'text', text: assistText },
              { type: 'tool_use', id: toolId, name: calls[i].name, input: calls[i].input },
            ],
          });
          messages.push({
            role: 'user',
            content: [{ type: 'tool_result', tool_use_id: toolId, content: FILES[files[i]] }],
          });
        }
        messages.push({ role: 'assistant', content: t.noMemoryFinalText });
      } else {
        // WITH_IRANTI: inject block in the user message, no re-read
        messages.push({
          role: 'user',
          content: `${INJECT_BLOCKS[t.irantiInjectKey]}\n\n${t.user}`,
        });
        messages.push({ role: 'assistant', content: t.irantiAssistant });
      }
    }
  }

  return messages;
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  const apiKey = resolveAnthropicKey();
  const client = new Anthropic({ apiKey });

  console.log('B14: Context Economy — With vs Without Iranti');
  console.log(`Model: ${MODEL}`);
  console.log('Counting tokens per turn for 15-turn "DebugAuth" session...\n');

  const results = { turns: [], summary: {} };

  for (let i = 0; i < SESSION_TURNS.length; i++) {
    const turnsUpTo = SESSION_TURNS.slice(0, i + 1);

    const [nmTokens, wiTokens] = await Promise.all([
      client.beta.messages.countTokens({
        model: MODEL,
        system: SYSTEM_PROMPT,
        tools: TOOLS,
        messages: buildMessages(turnsUpTo, 'NO_MEMORY'),
      }),
      client.beta.messages.countTokens({
        model: MODEL,
        system: SYSTEM_PROMPT,
        tools: TOOLS,
        messages: buildMessages(turnsUpTo, 'WITH_IRANTI'),
      }),
    ]);

    const turn = SESSION_TURNS[i];
    const row = {
      turn: turn.turn,
      phase: turn.phase,
      noMemory: nmTokens.input_tokens,
      withIranti: wiTokens.input_tokens,
      delta: nmTokens.input_tokens - wiTokens.input_tokens,
      deltaPct: Math.round(((nmTokens.input_tokens - wiTokens.input_tokens) / nmTokens.input_tokens) * 100),
    };
    results.turns.push(row);

    const indicator = turn.phase === 'establishment' ? '  ' : '↑↓';
    console.log(
      `Turn ${String(turn.turn).padStart(2)} [${turn.phase.padEnd(13)}] ${indicator}  ` +
      `NO_MEMORY: ${String(row.noMemory).padStart(6)} tok  ` +
      `WITH_IRANTI: ${String(row.withIranti).padStart(6)} tok  ` +
      `Δ: ${String(row.delta).padStart(5)} tok (${row.deltaPct}%)`
    );
  }

  const lastRow = results.turns[results.turns.length - 1];
  const firstRecall = results.turns.find(r => r.phase === 'recall');

  results.summary = {
    finalTurn: lastRow.turn,
    noMemoryFinal: lastRow.noMemory,
    withIrantiFinal: lastRow.withIranti,
    absoluteSaving: lastRow.delta,
    relativeSaving: lastRow.deltaPct,
    firstDivergenceTurn: firstRecall?.turn,
    firstDivergenceDelta: firstRecall?.delta,
    contextWindow200k: {
      noMemoryPct: ((lastRow.noMemory / 200000) * 100).toFixed(1),
      withIrantiPct: ((lastRow.withIranti / 200000) * 100).toFixed(1),
    },
  };

  console.log('\n─── Summary ────────────────────────────────────────');
  console.log(`Final turn: NO_MEMORY=${lastRow.noMemory} tok  WITH_IRANTI=${lastRow.withIranti} tok`);
  console.log(`Total saved: ${lastRow.delta} tokens (${lastRow.deltaPct}%)`);
  console.log(`Context window usage at turn 15: NO_MEMORY=${results.summary.contextWindow200k.noMemoryPct}%  WITH_IRANTI=${results.summary.contextWindow200k.withIrantiPct}%`);

  // ── Write outputs ───────────────────────────────────────────────────────────
  fs.writeFileSync(outputJson, JSON.stringify(results, null, 2));

  const md = buildMarkdown(results);
  fs.writeFileSync(outputMd, md);

  console.log(`\nResults written to:\n  ${outputJson}\n  ${outputMd}`);
}

function buildMarkdown(results) {
  const s = results.summary;
  const lines = [
    '# B14: Context Economy — With vs Without Iranti Over Time',
    '',
    `**Track:** B14 - Context Economy`,
    `**Executed:** ${new Date().toISOString().slice(0, 10)}`,
    `**Iranti version:** 0.3.11`,
    `**Model:** ${MODEL}`,
    `**Method:** Anthropic countTokens API (exact token counts, no generation)`,
    `**Session:** "DebugAuth" — 15-turn coding session, 7 establishment + 8 recall turns`,
    '',
    '---',
    '',
    '## Per-turn token count',
    '',
    '| Turn | Phase | NO_MEMORY (tok) | WITH_IRANTI (tok) | Δ saved | Δ% |',
    '|------|-------|----------------|-------------------|---------|-----|',
    ...results.turns.map(r =>
      `| ${r.turn} | ${r.phase} | ${r.noMemory.toLocaleString()} | ${r.withIranti.toLocaleString()} | ${r.delta.toLocaleString()} | ${r.deltaPct}% |`
    ),
    '',
    '---',
    '',
    '## Summary',
    '',
    `| Metric | Value |`,
    `|--------|-------|`,
    `| NO_MEMORY at turn 15 | ${s.noMemoryFinal.toLocaleString()} tokens |`,
    `| WITH_IRANTI at turn 15 | ${s.withIrantiFinal.toLocaleString()} tokens |`,
    `| Absolute saving | **${s.absoluteSaving.toLocaleString()} tokens** |`,
    `| Relative saving | **${s.relativeSaving}%** |`,
    `| First divergence | Turn ${s.firstDivergenceTurn} (+${s.firstDivergenceDelta} tok saved) |`,
    `| Context window % (NO_MEMORY) | ${s.contextWindow200k.noMemoryPct}% of 200k |`,
    `| Context window % (WITH_IRANTI) | ${s.contextWindow200k.withIrantiPct}% of 200k |`,
    '',
    '---',
    '',
    '## What this measures',
    '',
    '- **NO_MEMORY arm:** Agent re-reads files on recall turns (simulates real agent behavior when',
    '  specific values from earlier files are needed and context is long). All prior tool results',
    '  accumulate in the context window.',
    '- **WITH_IRANTI arm:** Agent receives compact inject blocks on recall turns. Iranti\'s',
    '  identity-first retrieval delivers only the relevant fact (~50-150 tok) instead of',
    '  re-adding the full file (~300-600 tok) to context.',
    '',
    '**Caveat:** Agent re-read behavior is scripted (deterministic). In real sessions, re-read',
    'frequency varies. This benchmark represents a moderate-re-read pattern.',
    '',
    '**Token counts are exact** (Anthropic countTokens API, not char/4 estimates).',
  ];
  return lines.join('\n');
}

main().catch(err => { console.error(err); process.exit(1); });
