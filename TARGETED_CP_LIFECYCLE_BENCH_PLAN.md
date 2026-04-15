# Targeted Control-Plane Lifecycle Benchmark Plan

## Scope
Bounded regression pass for the repaired stopped-instance slice in `iranti-control-plane`.

Question:
Did the stopped-instance lifecycle and doctor hardening materially slow down or destabilize the operator-facing paths that were just repaired?

## Ownership
- Lead execution and artifact integration: Codex
- Worker A, benchmark inventory and mapping: `cp_bench_inventory` / Lorentz
- Worker B, environment truth and execution: `cp_bench_exec` / Meitner
- Worker C, interpretation and baseline review: `cp_bench_interp` / Averroes

## Inputs Reviewed First

### Benchmarking repo
- `CLAUDE.md`
- `README.md`
- `VERSION.md`
- `benchmarks/README.md`
- `benchmarks/B13-upgrade-behavior/benchmark.md`
- lifecycle-adjacent ticketing and published result artifacts

Important note:
- `AGENTS.md` is not present in `iranti-benchmarking`; `CLAUDE.md` and benchmark methodology documents were used instead.

### Control plane repo
- `AGENTS.md`
- `CONTROL_PLANE_AUDIT_PLAN.md`
- `CONTROL_PLANE_AUDIT_EXECUTION.md`
- `CONTROL_PLANE_AUDIT_VALIDATION.md`
- `CONTROL_PLANE_AUDIT_RELEASE_RECOMMENDATION.md`
- `CONTROL_PLANE_USER_TEST_MATRIX.md`
- `src/server/routes/control-plane/lifecycle.ts`
- `src/server/routes/control-plane/repair.ts`
- `src/server/lib/iranti-cli.ts`
- `src/client/src/components/instances/DoctorDrawer.tsx`
- `src/client/src/components/instances/InstanceManager.tsx`

### Iranti repo
- `AGENTS.md`
- `docs/features/cli-status/spec.md`
- `docs/features/cli-doctor/spec.md`
- `src/lib/runtimeLifecycle.ts`
- `scripts/iranti-cli.ts`

## Selected Benchmark Slices
Only these slices were selected:
1. stopped-instance `Run Doctor` latency and decomposition completeness
2. stopped-instance `Start` latency to confirmed success
3. post-start status convergence latency

## Explicitly Rejected Slices
- KB write/query/search performance
- ingest/chunker performance
- archive/conflict/agent/session benchmark families unrelated to lifecycle
- broad UI benchmarking
- optional UI/API polling overhead

Rejection reason:
- no direct coupling to the repaired slice
- no need to reopen broad benchmarking to answer the regression question
- no existing lightweight UI polling harness worth extending for this pass

## Baseline Assumptions
1. Recent work was correctness hardening, not a performance feature.
2. The most likely regression-sensitive behavior is the added start confirmation loop and stopped-instance doctor decomposition.
3. No published historical lifecycle latency benchmark exists in `iranti-benchmarking`.
4. The closest start-path comparison point is the control-plane validation note, which recorded a confirmed start path of about `2.93s` on an earlier local validation target.
5. B13 upgrade behavior is lifecycle-adjacent but not a direct timing baseline.

## Environment Plan
- Target control-plane backend: `http://localhost:3002/api/control-plane`
- Target runtime root: `C:\Users\NF\.iranti-runtime`
- Target runtime instance: `iranti_dev`
- Operating system: Windows
- Product oracle: installed Iranti CLI from the user machine, not direct source imports

The pass intentionally uses the real configured `iranti_dev` instance rather than inventing a new benchmark category or re-running the full benchmark universe.

## Execution Method
1. Verify the control-plane backend target and the installed CLI path.
2. Verify `iranti_dev` is the instance surfaced by both the control plane and `iranti status --json`.
3. Force the instance into a stopped state by terminating the runtime PID directly.
4. Measure stopped-instance doctor endpoint latency.
5. Measure stopped-instance start endpoint latency to confirmed success.
6. Measure time until control-plane state and `iranti status --json` agree on running-state truth.
7. Repeat the cycle enough times to separate obvious noise from steady-state behavior.

## Repeat Count
- `n = 5` stop -> doctor -> start -> convergence cycles

Rationale:
- enough to expose obvious instability or large variance
- still narrow and cheap

## Benchmark Harness
- Added narrow harness:
  - `scripts/measure_cp_lifecycle_slice.ps1`

Reason:
- no existing lifecycle timing harness existed in the benchmarking repo
- a small repeatable script was justified for this slice only

## Success Criteria
The repaired slice is considered performance-safe if:
1. stopped-instance doctor remains sub-second and returns useful decomposed truth
2. start confirmation latency remains in the same practical band as the prior control-plane validation sample
3. post-start convergence remains near-immediate after the start response
4. no repeated instability or false-success behavior appears

## Stop Conditions
Conclude one of:
1. no further benchmarking needed for this slice
2. keep only a lightweight regression benchmark for this slice
3. targeted control-plane performance fix needed
4. broader benchmark rerun justified
