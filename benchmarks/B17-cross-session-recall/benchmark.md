# B17: Cross-Session Recall Accuracy

**Track:** B17 - Cross-Session Recall  
**Domain:** Memory correctness, cross-session persistence  
**Status:** Preregistered

---

## Motivation

B14/B15/B16 measured token counts within a single session. None of them test what users
actually expect from a memory system: that the agent remembers specific facts from a
previous session.

This benchmark tests recall accuracy — the percentage of ground-truth facts an agent
can correctly answer in a fresh session, with and without Iranti.

---

## What This Tests

A user works with an agent on a codebase in Session 1. Specific facts are discovered:
config values, architectural decisions, known bugs, file paths, API contracts. The
session ends.

In Session 2, the user asks questions about what was learned in Session 1. Without
memory, the agent guesses or admits ignorance. With Iranti, the agent queries memory
and answers correctly.

**The metric is accuracy — not token count.**

---

## Arms

### NO_MEMORY

Agent receives the question and a neutral system prompt explaining the project context.
No facts. No retrieval tools. Answers purely from LLM prior knowledge (which cannot
contain project-specific facts).

### WITH_IRANTI

Agent receives the question. Before answering, Iranti is queried (hybrid search) using
the question text. The top result is injected into the prompt as a memory block. Agent
answers using the injected fact.

This models what `iranti_attend` does on a pre-response call: searches for relevant
facts and injects them before the LLM generates its reply.

---

## Facts (20 ground-truth facts)

All 20 facts are about a fictional AuthService project. They are specific enough that
no LLM can infer them from general knowledge. Ground truth is checked by exact or
near-exact string match.

| # | Category | Fact |
|---|----------|------|
| 1 | Config | JWT secret env var name: `AUTHSVC_JWT_SECRET_v2` |
| 2 | Config | Access token expiry: 4 hours (14400 seconds) |
| 3 | Schema | Refresh token table: `user_refresh_sessions` (not `refresh_tokens`) |
| 4 | Bug | Issue #47: rate limiter counts successful logins, not just failed ones |
| 5 | File | Auth middleware: `src/middleware/bearerAuth.ts` |
| 6 | API | Session invalidation: `DELETE /auth/sessions/:sessionId` (requires admin scope) |
| 7 | Config | Password hashing: bcrypt cost factor 13 |
| 8 | Config | Redis key prefix: `authsvc:sess:` |
| 9 | Schema | Admin role enum: `ROLE_ADMIN_V2` (legacy `ROLE_ADMIN` deprecated) |
| 10 | API | OAuth callback: `/auth/oauth/callback/v2` (v1 still active but deprecated) |
| 11 | Architecture | JWT validation happens at the gateway, not in individual services |
| 12 | Limitation | Logout invalidates all devices, not a single device |
| 13 | Schema | User credentials: `authsvc_users` table (separate from main app DB) |
| 14 | Config | Auth service port: 8082 |
| 15 | Environment | `NODE_ENV=staging` skips MFA for internal IP range `10.20.0.0/16` |
| 16 | Testing | Default test user: `testuser@authsvc.internal` / `Bench!2026` |
| 17 | Bug | Token refresh fails if client sends `Bearer ` prefix (must be stripped) |
| 18 | Decision | v0.4.0 switched to asymmetric RSA-256; public key at `/auth/.well-known/jwks.json` |
| 19 | Config | Rate limit: 5 failed logins per 15 minutes per IP |
| 20 | Schema | `user_refresh_sessions` unique constraint: `(userId, deviceFingerprint)` |

---

## Scoring

Each answer is scored 0 or 1. An answer is correct if it contains the expected key
value (case-insensitive substring match). Composite answers require all key terms
to be present.

Total score: correct answers / 20. Reported as a percentage.

---

## Method

1. **Seed phase**: Write all 20 facts to a live Iranti instance via `POST /kb/write`.
   Entity: `project/authsvc`. Each fact gets its own key.

2. **NO_MEMORY arm**: For each of the 20 questions, call the Anthropic API with only
   a neutral system prompt and the question. Record the answer.

3. **WITH_IRANTI arm**: For each question, call `POST /kb/search` with the question as
   query. Take the top result's summary + value. Inject into the prompt as a memory
   block. Call Anthropic API. Record the answer.

4. **Score**: Compare both arms against ground truth. Report per-question results and
   final accuracy.

Token counts are also recorded but are not the primary metric.

---

## Model

`claude-haiku-4-5-20251001` — cheapest model, maximises the test of memory retrieval
rather than LLM inference. A smarter model would guess more correctly in the NO_MEMORY
arm, making the gap look smaller.

---

## Expected Results

| Arm | Expected Accuracy |
|-----|------------------|
| NO_MEMORY | 5–20% (some facts partially guessable) |
| WITH_IRANTI | 85–95% (retrieval may miss on ambiguous questions) |

A gap of 65+ percentage points is the expected finding. This directly answers the
user question: "does Iranti remember what we discussed?"
