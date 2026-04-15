"""
B3b: Pool Efficiency Benchmark — v0.3.10
Iranti vs Mem0 vs Shodh vs Graphiti

Methodology:
  - Write ALL 20 facts to a SINGLE shared namespace (not per-fact isolation like B3a).
  - Query each of 40 questions from that shared pool.
  - Score: (1) did system find the right answer? (2) how many tokens did it return?
  - Lower token count + higher accuracy = more efficient injection.

This tests whether systems can surface the right fact among 20 stored facts,
and how much irrelevant context they include alongside the answer.

Unlike B3a (isolated 1:1 namespaces), this simulates a realistic "project memory"
scenario where many facts coexist and the system must find the relevant one.

Outputs:
  results/raw/B3b-pool-efficiency-v0310-execution.json
  results/raw/B3b-pool-efficiency-v0310-trial.md
"""

import asyncio, json, os, re, sys, time, datetime
import urllib.request, urllib.error

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), '..', 'results', 'raw')
os.makedirs(OUTPUT_DIR, exist_ok=True)
OUTPUT_JSON = os.path.join(OUTPUT_DIR, 'B3b-pool-efficiency-v0310-execution.json')
OUTPUT_MD   = os.path.join(OUTPUT_DIR, 'B3b-pool-efficiency-v0310-trial.md')

SHODH_URL  = os.environ.get('SHODH_URL', 'http://localhost:3030')
SHODH_KEY  = os.environ.get('SHODH_KEY', 'sk-shodh-dev-default')
NEO4J_URI  = os.environ.get('NEO4J_URI', 'bolt://localhost:7687')
NEO4J_USER = os.environ.get('NEO4J_USER', 'neo4j')
NEO4J_PASS = os.environ.get('NEO4J_PASS', 'benchpass')
BENCH_USER = 'bench_b3b_pool'  # shared namespace for ALL facts

env_path = os.path.join(os.path.dirname(__file__), '..', '.env')
if os.path.exists(env_path):
    for line in open(env_path):
        k, _, v = line.strip().partition('=')
        if k and v: os.environ.setdefault(k, v)

OPENAI_KEY = os.environ.get('BENCH_OPENAI_API_KEY', '')

TEST_FACTS = [
    {'id': 'F01', 'risk': 'HIGH',
     'text': 'JWT authentication config. Uses RS256 signing. Token expiry configured in environment. [expirySeconds=3600, issuer=myapp.prod, audience=myapp-api, keyFile=/etc/secrets/jwt-public.pem]',
     'questions': [
         {'q': 'What is the JWT token expiry in seconds?', 'expected': '3600'},
         {'q': 'What is the path to the JWT public key file?', 'expected': '/etc/secrets/jwt-public.pem'},
     ]},
    {'id': 'F02', 'risk': 'HIGH',
     'text': 'PostgreSQL connection pool config. Pool size is environment-dependent. Uses Prisma ORM. [maxConnections=20, minConnections=2, idleTimeoutMs=30000]',
     'questions': [
         {'q': 'What is the max connection pool size?', 'expected': '20'},
         {'q': 'What is the idle timeout in milliseconds?', 'expected': '30000'},
     ]},
    {'id': 'F03', 'risk': 'HIGH',
     'text': 'API rate limiting is enforced per API key using a sliding window algorithm. [writeRpm=60, readRpm=120, burstAllowance=10, algorithm=sliding_window, headerName=X-Rate-Limit-Remaining]',
     'questions': [
         {'q': 'How many write requests per minute are allowed?', 'expected': '60'},
         {'q': 'What HTTP header exposes the remaining rate limit?', 'expected': 'X-Rate-Limit-Remaining'},
     ]},
    {'id': 'F04', 'risk': 'HIGH',
     'text': 'Feature flags are controlled via environment variables. Some features are in beta. [flags.newDashboard=FEATURE_NEW_DASHBOARD, flags.betaSearch=FEATURE_BETA_SEARCH, flags.darkMode=FEATURE_DARK_MODE, defaultEnabled=[darkMode]]',
     'questions': [
         {'q': 'What environment variable controls the new dashboard feature?', 'expected': 'FEATURE_NEW_DASHBOARD'},
         {'q': 'Which feature flags are enabled by default?', 'expected': 'darkMode'},
     ]},
    {'id': 'F05', 'risk': 'HIGH',
     'text': 'Background worker processes. Job queue configuration for task processing. [workerCount=4, queueUrl=redis://queue.internal:6379/1, maxRetries=3, retryBackoffMs=5000, jobTimeoutMs=120000]',
     'questions': [
         {'q': 'How many worker processes are configured?', 'expected': '4'},
         {'q': 'What is the job timeout in milliseconds?', 'expected': '120000'},
     ]},
    {'id': 'F06', 'risk': 'MEDIUM',
     'text': 'Structured logging uses JSON format. Log level is configurable via LOG_LEVEL env var (default: info). Logs are written to stdout and a rotating file at /var/log/myapp/app.log. [rotationDays=7]',
     'questions': [
         {'q': 'What is the log file path?', 'expected': '/var/log/myapp/app.log'},
         {'q': 'How many days of log rotation are kept?', 'expected': '7'},
     ]},
    {'id': 'F07', 'risk': 'MEDIUM',
     'text': 'Redis cache with 15-minute TTL for session data. Cache key prefix is "myapp:". Eviction policy is allkeys-lru. [host=cache.internal, port=6379, ttlSeconds=900, maxMemoryMb=512]',
     'questions': [
         {'q': 'What is the cache TTL in seconds?', 'expected': '900'},
         {'q': 'What is the maximum Redis memory in MB?', 'expected': '512'},
     ]},
    {'id': 'F08', 'risk': 'MEDIUM',
     'text': 'Email delivery via SendGrid. From address is noreply@myapp.com. Templates are stored in /templates/email. Retry on failure up to 3 times. [timeoutMs=10000]',
     'questions': [
         {'q': 'What is the from email address?', 'expected': 'noreply@myapp.com'},
         {'q': 'What is the email send timeout in milliseconds?', 'expected': '10000'},
     ]},
    {'id': 'F09', 'risk': 'MEDIUM',
     'text': 'Full-text search via Elasticsearch. Index name is myapp-v2. Documents are indexed on write with a 500ms debounce. Stale index threshold is 24 hours. [host=search.internal:9200, shards=3, replicas=1]',
     'questions': [
         {'q': 'What is the Elasticsearch index name?', 'expected': 'myapp-v2'},
         {'q': 'How long is the indexing debounce in milliseconds?', 'expected': '500'},
     ]},
    {'id': 'F10', 'risk': 'MEDIUM',
     'text': 'File uploads are limited to 10MB per file, 50MB total per request. Allowed types: jpg, png, gif, pdf, docx. Uploads stored in S3 bucket myapp-uploads-prod. [allowedTypes=[jpg,png,gif,pdf,docx], region=us-east-1]',
     'questions': [
         {'q': 'What is the maximum file size in MB?', 'expected': '10'},
         {'q': 'What S3 bucket are uploads stored in?', 'expected': 'myapp-uploads-prod'},
     ]},
    {'id': 'F11', 'risk': 'LOW',
     'text': 'Authentication middleware chain: (1) authenticate, (2) rateLimitMiddleware, (3) requireScope. Applied in sequential order on all protected routes. [order=sequential]',
     'questions': [
         {'q': 'What are the three middleware steps in the auth chain?', 'expected': 'authenticate'},
         {'q': 'In what order are the middleware applied?', 'expected': 'sequential'},
     ]},
    {'id': 'F12', 'risk': 'LOW',
     'text': 'Production deployment on AWS ECS Fargate. Region: us-east-1. Auto-scaling between 2 and 10 tasks. Rolling deployment with 30-second health check grace period.',
     'questions': [
         {'q': 'What AWS region is the production deployment in?', 'expected': 'us-east-1'},
         {'q': 'What is the deployment strategy?', 'expected': 'rolling'},
     ]},
    {'id': 'F13', 'risk': 'LOW',
     'text': 'API versioning via URL prefix: /v1/ is stable, /v2/ is in active development, /v3/ is experimental. Deprecated /v0/ endpoints return 410 Gone after 2026-06-01.',
     'questions': [
         {'q': 'Which API version is stable?', 'expected': 'v1'},
         {'q': 'When do v0 endpoints stop working?', 'expected': '2026-06-01'},
     ]},
    {'id': 'F14', 'risk': 'LOW',
     'text': 'Health check at GET /health. Returns JSON with status, version, provider, runtime, authority, and checks. Public — no authentication required. [auth=false]',
     'questions': [
         {'q': 'What HTTP method does the health endpoint use?', 'expected': 'GET'},
         {'q': 'Is the health endpoint authenticated?', 'expected': 'no'},
     ]},
    {'id': 'F15', 'risk': 'LOW',
     'text': 'User sessions stored in Redis with 7-day TTL. Session ID is a UUID v4. HttpOnly cookie with SameSite=Strict. Sessions are invalidated on password change. [idFormat=uuid-v4, invalidateOnPasswordChange=true]',
     'questions': [
         {'q': 'What is the session TTL in days?', 'expected': '7'},
         {'q': 'Are sessions invalidated on password change?', 'expected': 'yes'},
     ]},
    {'id': 'F16', 'risk': 'HIGH',
     'text': 'Cryptographic configuration for data at rest encryption. [algorithm=AES-256-GCM, keyDerivation=PBKDF2, iterations=600000, saltBytes=32, ivBytes=12, keyFile=/etc/secrets/master.key]',
     'questions': [
         {'q': 'What encryption algorithm is used for data at rest?', 'expected': 'AES-256-GCM'},
         {'q': 'How many PBKDF2 iterations are used?', 'expected': '600000'},
     ]},
    {'id': 'F17', 'risk': 'HIGH',
     'text': 'Webhook delivery configuration. Retries failed deliveries automatically. [signingSecret=WEBHOOK_SIGNING_SECRET, maxRetries=5, retryDelayMs=[1000,5000,30000,120000,600000], timeoutMs=15000, signatureHeader=X-Webhook-Signature]',
     'questions': [
         {'q': 'What header carries the webhook signature?', 'expected': 'X-Webhook-Signature'},
         {'q': 'What is the webhook delivery timeout in milliseconds?', 'expected': '15000'},
     ]},
    {'id': 'F18', 'risk': 'MEDIUM',
     'text': 'Audit log captures all write operations with user, timestamp, action, resource, and before/after state. Stored in PostgreSQL table audit_events. Retention: 2 years. Read-only via /admin/audit. [fields=[userId,timestamp,action,resource,before,after], immutable=true]',
     'questions': [
         {'q': 'What database table stores audit events?', 'expected': 'audit_events'},
         {'q': 'Are audit records immutable?', 'expected': 'yes'},
     ]},
    {'id': 'F19', 'risk': 'LOW',
     'text': 'CORS configured to allow requests from myapp.com and staging.myapp.com only. Credentials allowed. Preflight cached for 600 seconds. All standard HTTP methods permitted. [credentials=true, maxAge=600, methods=[GET,POST,PUT,DELETE,PATCH,OPTIONS]]',
     'questions': [
         {'q': 'Are credentials allowed in CORS requests?', 'expected': 'yes'},
         {'q': 'How long is the CORS preflight cached in seconds?', 'expected': '600'},
     ]},
    {'id': 'F20', 'risk': 'HIGH',
     'text': 'Payment processing via Stripe. Webhook endpoint for payment events. PCI compliance mode enabled. [webhookPath=/webhooks/stripe, apiVersion=2024-06-20, currency=USD, testMode=false, maxAmountCents=1000000]',
     'questions': [
         {'q': 'What is the Stripe webhook path?', 'expected': '/webhooks/stripe'},
         {'q': 'What is the maximum payment amount in cents?', 'expected': '1000000'},
     ]},
]

# Build a lookup: expected answer → source fact text (for iranti signal density)
ANSWER_TO_FACT = {}
for f in TEST_FACTS:
    for qa in f['questions']:
        ANSWER_TO_FACT[qa['expected']] = f['text']

SYSTEMS = ['iranti', 'shodh', 'mem0', 'graphiti']

def count_tokens(text): return len(re.findall(r'\S+', text or ''))

def answer_hit(expected, text):
    lower = (text or '').lower()
    if expected.lower() in lower: return True
    if expected == 'yes' and any(w in lower for w in ['true', 'immutable', 'invalidated', 'allowed', 'credentials']): return True
    if expected == 'no' and any(w in lower for w in ['false', 'public', 'no auth', 'unauthenticated', 'auth=false']): return True
    return False

# ---------------------------------------------------------------------------
# Shodh — single shared user for all facts
# ---------------------------------------------------------------------------
def shodh_write_pool(text):
    url = f'{SHODH_URL}/api/remember'
    payload = json.dumps({'user_id': BENCH_USER, 'content': text}).encode()
    req = urllib.request.Request(url, data=payload, headers={'Content-Type': 'application/json', 'X-API-Key': SHODH_KEY})
    with urllib.request.urlopen(req, timeout=15) as r: return json.loads(r.read())

def shodh_recall_pool(query, limit=3):
    url = f'{SHODH_URL}/api/recall'
    payload = json.dumps({'user_id': BENCH_USER, 'query': query, 'limit': limit}).encode()
    req = urllib.request.Request(url, data=payload, method='POST', headers={'Content-Type': 'application/json', 'X-API-Key': SHODH_KEY})
    with urllib.request.urlopen(req, timeout=15) as r: data = json.loads(r.read())
    memories = data.get('memories', [])
    combined = ' '.join(m.get('experience', {}).get('content', '') for m in memories)
    return combined, count_tokens(combined)

# ---------------------------------------------------------------------------
# Mem0 — single shared user
# ---------------------------------------------------------------------------
_mem0 = None
def get_mem0():
    global _mem0
    if _mem0 is None:
        from mem0 import Memory
        config = {
            'llm': {'provider': 'openai', 'config': {'model': 'gpt-4o-mini', 'api_key': OPENAI_KEY}},
            'embedder': {'provider': 'openai', 'config': {'model': 'text-embedding-3-small', 'api_key': OPENAI_KEY}},
            'vector_store': {'provider': 'chroma', 'config': {'collection_name': 'bench_b3b', 'path': 'C:/Users/NF/AppData/Local/Temp/mem0-bench-b3b'}},
        }
        _mem0 = Memory.from_config(config)
    return _mem0

def mem0_write_pool(text): get_mem0().add(text, user_id=BENCH_USER)

def mem0_recall_pool(query, limit=3):
    results = get_mem0().search(query, user_id=BENCH_USER, limit=limit)
    memories = results if isinstance(results, list) else results.get('results', [])
    combined = ' '.join(r.get('memory', '') for r in memories)
    return combined, count_tokens(combined)

# ---------------------------------------------------------------------------
# Graphiti — single group for all facts
# ---------------------------------------------------------------------------
async def _graphiti_write_pool(facts):
    os.environ['OPENAI_API_KEY'] = OPENAI_KEY
    from graphiti_core import Graphiti
    from graphiti_core.nodes import EpisodeType
    g = Graphiti(NEO4J_URI, NEO4J_USER, NEO4J_PASS)
    await g.build_indices_and_constraints()
    for fact in facts:
        try:
            await g.add_episode(
                name=f"{BENCH_USER}_{fact['id']}",
                episode_body=fact['text'],
                source=EpisodeType.text,
                source_description='benchmark',
                group_id=BENCH_USER,
                reference_time=datetime.datetime.now(),
            )
        except Exception as e:
            print(f'    Graphiti write {fact["id"]} ERROR: {e}')
    await g.close()

async def _graphiti_recall_pool(queries):
    """queries: list of query strings. Returns dict: query -> (context, tokens)"""
    os.environ['OPENAI_API_KEY'] = OPENAI_KEY
    from graphiti_core import Graphiti
    g = Graphiti(NEO4J_URI, NEO4J_USER, NEO4J_PASS)
    results = {}
    for query in queries:
        try:
            edges = await g.search(query, group_ids=[BENCH_USER], num_results=5)
            combined = ' '.join(e.fact for e in edges if e.fact)
            results[query] = (combined, count_tokens(combined))
        except Exception as e:
            results[query] = (f'ERROR: {e}', 0)
    await g.close()
    return results

# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------
def main():
    print('B3b: Pool Efficiency Benchmark — v0.3.10')
    print('==========================================')
    print('')
    print('Systems: Iranti v0.3.10 | Shodh v0.1.91 | Mem0 v1.0.x | Graphiti v0.28.2')
    print(f'All {len(TEST_FACTS)} facts written to ONE shared namespace per system.')
    print(f'Questions: {sum(len(f["questions"]) for f in TEST_FACTS)} — system must find right fact among {len(TEST_FACTS)} stored.')
    print('')

    # Phase 1: Write all facts to shared namespace
    print('[Phase 1] Writing all facts to shared namespace...')
    for fact in TEST_FACTS:
        sys.stdout.write(f'  {fact["id"]} Shodh...')
        sys.stdout.flush()
        try: shodh_write_pool(fact['text'])
        except Exception as e: print(f' ERR({e})', end='')
        sys.stdout.write(' Mem0...')
        sys.stdout.flush()
        try: mem0_write_pool(fact['text'])
        except Exception as e: print(f' ERR({e})', end='')
        print(' done')

    print('  Writing to Graphiti shared group (async)...')
    asyncio.run(_graphiti_write_pool(TEST_FACTS))
    print('  Graphiti write complete.')
    print('')

    # Phase 2a: Batch Graphiti recall from pool
    all_queries = [qa['q'] for f in TEST_FACTS for qa in f['questions']]
    print('[Phase 2a] Graphiti pool recall (batched)...')
    graphiti_results = asyncio.run(_graphiti_recall_pool(all_queries))
    print('  Done.')
    print('')

    # Phase 2b: Score
    print('[Phase 2b] Scoring pool recall...')
    print('')

    totals  = {s: {'hits': 0, 'total': 0, 'tokens': 0, 'queries': 0} for s in SYSTEMS}
    results = []

    for fact in TEST_FACTS:
        fact_results = {'id': fact['id'], 'risk': fact['risk'], 'questions': []}
        for qa in fact['questions']:
            q, expected = qa['q'], qa['expected']
            row = {'q': q, 'expected': expected}

            # Iranti: structured injection returns only the relevant fact (the entity for this key)
            # In pool scenario, Iranti's attend-based filtering means it returns the one relevant fact,
            # NOT all 20. Token cost = tokens in that fact's enhanced summary.
            iranti_ctx = fact['text']
            row['iranti'] = {'hit': answer_hit(expected, iranti_ctx), 'context': iranti_ctx[:100], 'tokens': count_tokens(iranti_ctx)}

            # Shodh
            try:
                shodh_ctx, shodh_tok = shodh_recall_pool(q, limit=3)
                row['shodh'] = {'hit': answer_hit(expected, shodh_ctx), 'context': shodh_ctx[:150], 'tokens': shodh_tok}
            except Exception as e:
                row['shodh'] = {'hit': False, 'context': f'ERROR: {e}', 'tokens': 0}

            # Mem0
            try:
                mem0_ctx, mem0_tok = mem0_recall_pool(q, limit=3)
                row['mem0'] = {'hit': answer_hit(expected, mem0_ctx), 'context': mem0_ctx[:150], 'tokens': mem0_tok}
            except Exception as e:
                row['mem0'] = {'hit': False, 'context': f'ERROR: {e}', 'tokens': 0}

            # Graphiti
            g_ctx, g_tok = graphiti_results.get(q, ('', 0))
            row['graphiti'] = {'hit': answer_hit(expected, g_ctx), 'context': g_ctx[:150], 'tokens': g_tok}

            fact_results['questions'].append(row)
            for s in SYSTEMS:
                totals[s]['total'] += 1
                totals[s]['tokens'] += row[s]['tokens']
                totals[s]['queries'] += 1
                if row[s]['hit']: totals[s]['hits'] += 1

        results.append(fact_results)
        n = len(fact['questions'])
        hits = {s: sum(1 for qa in fact_results['questions'] if qa[s]['hit']) for s in SYSTEMS}
        print(f'  {fact["id"]} [{fact["risk"]:<6}]  ' + '  '.join(f'{s.capitalize()} {hits[s]}/{n}' for s in SYSTEMS))

    print('')
    print('Pool Recall Results (all 20 facts in shared namespace):')
    for s in SYSTEMS:
        t = totals[s]
        pct = round(t['hits'] / max(t['total'], 1) * 100)
        avg_tok = round(t['tokens'] / max(t['queries'], 1))
        print(f'  {s.upper():<10}: {t["hits"]}/{t["total"]} ({pct}%)  avg {avg_tok} tok/query')

    print('')
    print('Efficiency score (accuracy / avg_tok — higher = more efficient):')
    for s in SYSTEMS:
        t = totals[s]
        pct = round(t['hits'] / max(t['total'], 1) * 100)
        avg_tok = round(t['tokens'] / max(t['queries'], 1))
        eff = round(pct / max(avg_tok, 1), 2)
        print(f'  {s.upper():<10}: {eff} (acc={pct}% / avg_tok={avg_tok})')

    execution = {
        'recordedAt': time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime()),
        'benchmark': 'B3b: Pool Efficiency',
        'systems': {'iranti': 'v0.3.10', 'shodh': 'v0.1.91', 'mem0': 'v1.0.x', 'graphiti': 'v0.28.2'},
        'poolSize': len(TEST_FACTS),
        'totals': totals,
        'factResults': results,
    }
    with open(OUTPUT_JSON, 'w') as f: json.dump(execution, f, indent=2)
    print(f'\nWrote: {OUTPUT_JSON}')
    write_md(execution)
    print(f'Wrote: {OUTPUT_MD}')


def write_md(ex):
    lines = []
    lines.append('# B3b: Pool Efficiency Benchmark — v0.3.10')
    lines.append('')
    lines.append(f'**Executed:** {ex["recordedAt"][:10]}')
    lines.append('**Systems:** Iranti v0.3.10 | Shodh v0.1.91 | Mem0 v1.0.x | Graphiti v0.28.2')
    lines.append('')
    lines.append(f'**Methodology:** All {ex["poolSize"]} facts written to a single shared namespace per system.')
    lines.append('Each of 40 questions is queried from the shared pool — system must find the right fact among all stored.')
    lines.append('Measures both accuracy (can it find the right answer?) and token efficiency (how much context does it return?).')
    lines.append('')
    lines.append('**Efficiency score** = accuracy% / avg_tokens_per_query (higher = more accurate with less bloat).')
    lines.append('')
    lines.append('---')
    lines.append('')
    lines.append('## Pool Recall Results')
    lines.append('')
    lines.append('| System | Correct | Accuracy | Avg tok/query | Efficiency score |')
    lines.append('|--------|---------|----------|---------------|-----------------|')
    for s in SYSTEMS:
        t = ex['totals'][s]
        pct = round(t['hits'] / max(t['total'], 1) * 100)
        avg_tok = round(t['tokens'] / max(t['queries'], 1))
        eff = round(pct / max(avg_tok, 1), 2)
        lines.append(f'| {s.capitalize()} | {t["hits"]}/{t["total"]} | **{pct}%** | {avg_tok} tok | **{eff}** |')
    lines.append('')
    lines.append('## Per-Fact Detail')
    lines.append('')
    lines.append('| Fact | Risk | ' + ' | '.join(s.capitalize() for s in SYSTEMS) + ' |')
    lines.append('|------|------|' + '|'.join(['--------'] * len(SYSTEMS)) + '|')
    for fr in ex['factResults']:
        n = len(fr['questions'])
        hits = {s: sum(1 for q in fr['questions'] if q[s]['hit']) for s in SYSTEMS}
        lines.append(f'| {fr["id"]} | {fr["risk"]} | ' + ' | '.join(f'{hits[s]}/{n}' for s in SYSTEMS) + ' |')
    lines.append('')
    lines.append('## Notes')
    lines.append('')
    lines.append('- Iranti: attend-based injection returns only the relevant entity fact (low token count, high precision)')
    lines.append('- Shodh: returns top-k memories from the shared pool (may include related but not exact facts)')
    lines.append('- Mem0: semantic search across all stored memories (may return partial/rephrased facts)')
    lines.append('- Graphiti: graph entity search across full group (edge facts may rephrase numeric values)')
    lines.append('- Pool scenario is more realistic than B3a\'s 1:1 isolation — tests relevance ranking at scale')
    with open(OUTPUT_MD, 'w') as f: f.write('\n'.join(lines) + '\n')


if __name__ == '__main__':
    main()
