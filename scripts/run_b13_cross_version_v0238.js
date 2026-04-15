const { execFileSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const runtimeRoot = process.env.IRANTI_BENCH_RUNTIME_ROOT || 'C:\\Users\\NF\\.iranti-runtime';
const instance = process.env.IRANTI_BENCH_B13_INSTANCE || 'bench_b13_xver_v0238';
const port = Number(process.env.IRANTI_BENCH_B13_PORT || 3512);
const baseUrl = `http://localhost:${port}`;
const dbMode = process.env.IRANTI_BENCH_DB_MODE || 'managed';
const dbHost = process.env.IRANTI_BENCH_DB_HOST || 'localhost';
const dbPort = Number(process.env.IRANTI_BENCH_DB_PORT || 5432);
const dbUser = process.env.IRANTI_BENCH_DB_USER || 'postgres';
const dbPassword = process.env.IRANTI_BENCH_DB_PASSWORD || '053435';
const database = process.env.IRANTI_BENCH_B13_DATABASE || 'iranti_bench_b13_xver_v0238_db';
const dbUrl = `postgresql://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${database}`;
const apiKey = process.env.IRANTI_BENCH_B13_API_KEY || 'bench_b13_xver_v0238_nf.4b4c0f9d8c0b4f30a3a9c6370ab3a1de';
const versions = (process.env.IRANTI_BENCH_B13_VERSIONS || '0.2.35,0.2.36,0.2.37,0.2.38')
  .split(',')
  .map((value) => value.trim())
  .filter(Boolean);
const outputJson = path.resolve(process.env.IRANTI_BENCH_B13_OUTPUT_JSON || 'results/raw/B13-cross-version-v0238-execution.json');
const outputMarkdown = path.resolve(process.env.IRANTI_BENCH_B13_OUTPUT_MD || 'results/raw/B13-cross-version-v0238-trial.md');
const outDir = path.dirname(outputJson);
const instanceDir = path.join(runtimeRoot, 'instances', instance);
const benchmarkAgentId = 'benchmark_program_main';

fs.mkdirSync(outDir, { recursive: true });

function run(cmd, args, opts = {}) {
  return execFileSync(cmd, args, {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
    ...opts,
  });
}

function runShell(command, env = {}) {
  return execFileSync('cmd.exe', ['/d', '/s', '/c', command], {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
    env: { ...process.env, ...env },
  });
}

function runNpxPackage(version, args, opts = {}) {
  return runShell(
    ['npx', '-y', '-p', `iranti@${version}`, 'iranti', ...args].join(' '),
    opts.env || {}
  );
}

function isInstalledVersion(version) {
  return version === 'installed' || version === 'current-installed' || version === 'local-installed';
}

function versionLabel(version) {
  return version.replaceAll('.', '_').replace(/[^a-z0-9_]+/gi, '_');
}

function runVersionCli(version, args, opts = {}) {
  if (isInstalledVersion(version)) {
    return runShell(['iranti', ...args].join(' '), opts.env || {});
  }
  return runNpxPackage(version, args, opts);
}

function maybeParseJson(text) {
  const idx = text.indexOf('{');
  if (idx < 0) throw new Error(`No JSON payload in output:\n${text}`);
  return JSON.parse(text.slice(idx));
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
    await new Promise((r) => setTimeout(r, 400));
  }
  return { ok: false, elapsedMs: Date.now() - started };
}

function stopStaleRuntimeIfPresent() {
  const runtimeFile = path.join(instanceDir, 'runtime.json');
  if (!fs.existsSync(runtimeFile)) return;
  try {
    const runtime = JSON.parse(fs.readFileSync(runtimeFile, 'utf8'));
    if (runtime.pid) {
      try { run('taskkill', ['/PID', String(runtime.pid), '/T', '/F']); } catch {}
    }
  } catch {}
}

function bootstrapInstance() {
  stopStaleRuntimeIfPresent();
  try { fs.rmSync(instanceDir, { recursive: true, force: true }); } catch {}
  if (dbMode === 'docker') {
    runNpxPackage('0.2.35', [
      'setup', '--defaults', '--bootstrap-db',
      '--root', runtimeRoot,
      '--instance', instance,
      '--port', String(port),
      '--db-mode', 'docker',
      '--provider', 'mock',
      '--api-key', apiKey,
    ]);
    if (!fs.existsSync(instanceDir)) {
      throw new Error(`Bootstrap completed without creating ${instanceDir}`);
    }
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

  runNpxPackage('0.2.35', [
    'setup', '--defaults', '--bootstrap-db',
    '--root', runtimeRoot,
    '--instance', instance,
    '--port', String(port),
    '--db-url', dbUrl,
    '--provider', 'mock',
    '--api-key', apiKey,
  ]);
  if (!fs.existsSync(instanceDir)) {
    throw new Error(`Bootstrap completed without creating ${instanceDir}`);
  }
}

async function startVersion(version) {
  const label = versionLabel(version);
  const outLog = path.join(outDir, `${instance}_run_v${label}.out.log`);
  const errLog = path.join(outDir, `${instance}_run_v${label}.err.log`);
  for (const p of [outLog, errLog]) { try { fs.unlinkSync(p); } catch {} }
  const cmd = isInstalledVersion(version)
    ? `iranti --root ${runtimeRoot} run --instance ${instance}`
    : `npx -y -p iranti@${version} iranti --root ${runtimeRoot} run --instance ${instance}`;
  const child = spawn('cmd.exe', ['/d', '/s', '/c', cmd], {
    cwd: process.cwd(),
    detached: false,
    stdio: ['ignore', fs.openSync(outLog, 'a'), fs.openSync(errLog, 'a')],
  });
  const health = await waitForHealth();
  if (!health.ok) {
    const stdout = fs.existsSync(outLog) ? fs.readFileSync(outLog, 'utf8') : '';
    const stderr = fs.existsSync(errLog) ? fs.readFileSync(errLog, 'utf8') : '';
    throw new Error(`Version ${version} failed to reach health.\nSTDOUT:\n${stdout}\nSTDERR:\n${stderr}`);
  }
  const status = maybeParseJson(runVersionCli(version, ['--root', runtimeRoot, 'status', '--json']));
  const inst = status.instances.find((x) => x.name === instance);
  if (!inst) throw new Error(`Instance ${instance} missing from status for ${version}`);
  return { wrapperPid: child.pid, health, status: inst, outLog, errLog };
}

function stopVersion(version) {
  const status = maybeParseJson(runVersionCli(version, ['--root', runtimeRoot, 'status', '--json']));
  const inst = status.instances.find((x) => x.name === instance);
  if (!inst || !inst.runtime.running) return { attempted: false, reason: 'not running' };
  const pid = Number(inst.runtime.state.pid);
  const started = Date.now();
  try { run('taskkill', ['/PID', String(pid), '/T', '/F']); } catch {}
  return { attempted: true, pid, elapsedMs: Date.now() - started };
}

async function writeFact(entity, key, value, summary, source) {
  const res = await fetch(`${baseUrl}/kb/write`, {
    method: 'POST',
    headers: { 'X-Iranti-Key': apiKey, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      entity, key, value, summary, confidence: 95, source, agent: 'benchmark_program_main',
    }),
  });
  const body = await res.json();
  if (!res.ok) throw new Error(`write failed ${res.status}: ${JSON.stringify(body)}`);
  return body;
}

async function queryFact(entity, key) {
  const [entityType, entityId] = entity.split('/');
  const url = new URL(`${baseUrl}/kb/query/${entityType}/${entityId}/${key}`);
  url.searchParams.set('agentId', benchmarkAgentId);
  const res = await fetch(url, {
    headers: { 'X-Iranti-Key': apiKey },
  });
  const body = await res.json();
  if (!res.ok) throw new Error(`query failed ${res.status}: ${JSON.stringify(body)}`);
  return body;
}

async function handshake(task) {
  const res = await fetch(`${baseUrl}/memory/handshake`, {
    method: 'POST',
    headers: { 'X-Iranti-Key': apiKey, 'Content-Type': 'application/json' },
    body: JSON.stringify({ agentId: benchmarkAgentId, task, recentMessages: [] }),
  });
  const body = await res.json();
  if (!res.ok) throw new Error(`handshake failed ${res.status}: ${JSON.stringify(body)}`);
  return body;
}

async function attend(task) {
  const payload = {
    agentId: benchmarkAgentId,
    latestMessage: task,
    currentContext: task,
    phase: 'pre-response',
  };
  const res = await fetch(`${baseUrl}/memory/attend`, {
    method: 'POST',
    headers: { 'X-Iranti-Key': apiKey, 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const body = await res.json();
  if (!res.ok && typeof body?.error === 'string' && body.error.includes('Unexpected fields: phase')) {
    const retry = await fetch(`${baseUrl}/memory/attend`, {
      method: 'POST',
      headers: { 'X-Iranti-Key': apiKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        agentId: benchmarkAgentId,
        latestMessage: task,
        currentContext: task,
      }),
    });
    const retryBody = await retry.json();
    if (!retry.ok) throw new Error(`attend failed ${retry.status}: ${JSON.stringify(retryBody)}`);
    return retryBody;
  }
  if (!res.ok) throw new Error(`attend failed ${res.status}: ${JSON.stringify(body)}`);
  return body;
}

async function main() {
  bootstrapInstance();
  const markers = [];
  const runs = [];

  for (const version of versions) {
    const start = await startVersion(version);
    const hs = await handshake(`B13 cross-version continuity stage ${version}`);
    const tag = versionLabel(version);
    const stage = [
      { entity: `benchmark/b13_xver_${tag}`, key: 'runtime_version', value: version, summary: `B13 cross-version marker for ${version}` },
      { entity: `benchmark/b13_xver_${tag}`, key: 'continuity_stage', value: `stage_${tag}`, summary: `B13 continuity stage marker for ${version}` },
      { entity: `benchmark/b13_xver_${tag}`, key: 'continuity_assertion', value: `facts_written_on_${version}`, summary: `B13 continuity assertion for ${version}` },
    ];
    const writes = [];
    for (const marker of stage) {
      const resp = await writeFact(marker.entity, marker.key, marker.value, marker.summary, `B13_cross_version_${version}`);
      writes.push({ entity: marker.entity, key: marker.key, value: marker.value, action: resp.action, reason: resp.reason });
      markers.push(marker);
    }
    const reads = [];
    let correctReadCount = 0;
    for (const marker of markers) {
      await attend(`B13 cross-version continuity readback for ${marker.entity} ${marker.key} on ${version}`);
      const query = await queryFact(marker.entity, marker.key);
      const correct = query.found === true && String(query.value) === String(marker.value);
      if (correct) correctReadCount += 1;
      reads.push({ entity: marker.entity, key: marker.key, expected: marker.value, actual: query.value, found: query.found, correct });
    }
    const stop = stopVersion(version);
    runs.push({ version, start, writes, readCount: reads.length, correctReadCount, reads, handshakeFields: Object.keys(hs), stop });
  }

  const result = {
    recordedAt: new Date().toISOString(),
    benchmark: 'B13',
    trialType: 'true cross-version continuity rerun',
    runtimeRoot,
    instance,
    baseUrl,
    database,
    versions: runs,
  };
  fs.writeFileSync(outputJson, JSON.stringify(result, null, 2));

  const overallPass = runs.every((r) => r.correctReadCount === r.readCount);
  const rows = runs.map((r) => `| ${r.version} | ${r.correctReadCount} | ${r.readCount} | ${r.correctReadCount === r.readCount ? 'PASS' : 'FAIL'} |`);
  const versionChain = versions.join(' -> ');
  const md = [
    `# B13 True Cross-Version Continuity Rerun - ${versionChain}`,
    '',
    '**Track:** B13 - Runtime Upgrade and Restart Behavior  ',
    '**Trial type:** True cross-version continuity rerun  ',
    `**Executed:** ${new Date().toISOString().slice(0, 10)}  `,
    `**Instance:** ${instance} (${baseUrl})  `,
    `**Database:** ${database}  `,
    '',
    '## 1. Scope',
    '',
    `Published/install-surface continuity chain across ${versionChain} using one disposable instance and database.`,
    '',
    '## 2. Per-Version Readback',
    '',
    '| Version | Facts readable | Facts expected | Result |',
    '|---|---:|---:|---|',
    ...rows,
    '',
    '## 3. Result',
    '',
    `Overall result: **${overallPass ? 'PASS' : 'FAIL'}**`,
    overallPass
      ? '- Cross-version fact continuity held across the full chain.'
      : '- Cross-version fact continuity did not hold across the full chain.',
    isInstalledVersion(versions[versions.length - 1] || '')
      ? '- The rerun used published npm CLI surfaces plus the current installed local surface for the final hop.'
      : '- The rerun used published npm CLI surfaces only.',
    '- The initial 0.2.35 stage required setup --bootstrap-db; bare instance create + run did not initialize the benchmark database sufficiently for this track.',
  ].join('\r\n');
  fs.writeFileSync(outputMarkdown, md);
}

main().catch((err) => {
  console.error(err && err.stack ? err.stack : String(err));
  process.exit(1);
});
