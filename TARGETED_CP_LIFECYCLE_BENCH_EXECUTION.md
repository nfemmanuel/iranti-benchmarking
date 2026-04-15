# Targeted Control-Plane Lifecycle Benchmark Execution

## Scope Executed
Bounded execution against the repaired stopped-instance slice only:
- stopped-instance `Run Doctor`
- stopped-instance `Start`
- post-start status convergence

## Environment Details
- Benchmarking repo: `C:\Users\NF\Documents\Projects\iranti-benchmarking`
- Control-plane repo: `C:\Users\NF\Documents\Projects\iranti-control-plane`
- Iranti repo: `C:\Users\NF\Documents\Projects\iranti`
- Runtime root: `C:\Users\NF\.iranti-runtime`
- Target instance: `iranti_dev`
- Control-plane backend: `http://localhost:3002/api/control-plane`
- Control-plane backend process:
  - PID: `12472`
  - executable: `C:\Program Files\nodejs\node.exe`
  - command line points to `iranti-control-plane/src/server/index.ts`
- Installed CLI used for truth checks:
  - `C:\Users\NF\AppData\Roaming\npm\iranti.cmd`

## Environment Truth Verification
- `GET http://localhost:3002/api/control-plane/instances`
  - returned `iranti_dev` as the only configured/running instance
- `iranti status --root C:\Users\NF\.iranti-runtime --json`
  - confirmed:
    - runtime root
    - bound instance env
    - `iranti_dev` on port `3500`
    - live runtime PID and health state

## Files Reviewed
- `CLAUDE.md`
- `benchmarks/README.md`
- `benchmarks/B13-upgrade-behavior/benchmark.md`
- lifecycle-adjacent benchmark docs and published result summaries
- `CONTROL_PLANE_AUDIT_*` artifacts in `iranti-control-plane`
- `src/server/routes/control-plane/lifecycle.ts`
- `src/server/routes/control-plane/repair.ts`
- `src/server/routes/control-plane/instances.ts`
- `scripts/iranti-cli.ts`
- `src/lib/runtimeLifecycle.ts`

## Commands, Endpoints, and Actions Measured

### Harness command
```powershell
& 'C:\Users\NF\Documents\Projects\iranti-benchmarking\scripts\measure_cp_lifecycle_slice.ps1' `
  -ControlPlaneBaseUrl 'http://localhost:3002/api/control-plane' `
  -RuntimeRoot 'C:\Users\NF\.iranti-runtime' `
  -InstanceName 'iranti_dev' `
  -Iterations 5 `
  -PollMs 250 `
  -OutputJsonPath 'C:\Users\NF\Documents\Projects\iranti-benchmarking\results\raw\targeted-cp-lifecycle-bench-20260325.json'
```

### Underlying actions per iteration
1. `iranti status --root C:\Users\NF\.iranti-runtime --json`
2. `Stop-Process -Id <runtime-pid> -Force`
3. wait until CLI status classifies the instance as not running
4. `POST http://localhost:3002/api/control-plane/instances/iranti_dev/doctor`
5. `POST http://localhost:3002/api/control-plane/instances/iranti_dev/start`
6. poll:
   - `iranti status --json`
   - `GET /api/control-plane/instances`
   until both agree on running-state truth and PID

## Raw Results

| Iteration | Stopped class | Doctor ms | Checks | Pass | Warn | Fail | Runtime check | Start ms | PID | Convergence ms | Polls | Final class |
|---|---:|---:|---:|---:|---:|---:|---|---:|---:|---:|---:|---|
| 1 | stale | 500.616 | 27 | 21 | 6 | 0 | warn | 4005.061 | 27328 | 585.994 | 1 | running |
| 2 | stale | 357.570 | 27 | 21 | 6 | 0 | warn | 2036.862 | 12136 | 596.328 | 1 | running |
| 3 | stale | 350.958 | 27 | 21 | 6 | 0 | warn | 2069.766 | 31584 | 575.630 | 1 | running |
| 4 | stale | 397.235 | 27 | 21 | 6 | 0 | warn | 2310.867 | 13804 | 470.108 | 1 | running |
| 5 | stale | 375.484 | 27 | 21 | 6 | 0 | warn | 2088.345 | 28748 | 570.141 | 1 | running |

## Aggregates
- Doctor latency:
  - mean: `396.373 ms`
  - min: `350.958 ms`
  - max: `500.616 ms`
- Start latency:
  - mean: `2502.180 ms`
  - median: `2088.345 ms`
  - warm mean (iterations 2-5): `2126.460 ms`
  - min: `2036.862 ms`
  - max: `4005.061 ms`
- Post-start convergence:
  - mean: `559.640 ms`
  - min: `470.108 ms`
  - max: `596.328 ms`
  - polls required: always `1`

## Result Validity Notes
- This pass used a real configured local instance, not a simulated fixture.
- The harness measured HTTP wall-clock time with `Stopwatch`.
- The convergence check used the same authority surfaces the control plane relies on:
  - `iranti status --json`
  - `/api/control-plane/instances`
- Final state after the run:
  - `iranti_dev` returned to `running`
  - runtime health `200`

## Files Changed
- `scripts/measure_cp_lifecycle_slice.ps1`
- `TARGETED_CP_LIFECYCLE_BENCH_PLAN.md`
- `TARGETED_CP_LIFECYCLE_BENCH_EXECUTION.md`
- `TARGETED_CP_LIFECYCLE_BENCH_RESULTS.md`
- `TARGETED_CP_LIFECYCLE_BENCH_RECOMMENDATION.md`

## Reviewed but Unchanged
- all reviewed benchmark inventory and published result files
- control-plane and Iranti source files used as truth references

Reason:
- this pass was bounded to verification
- no product code changes were required from the benchmarking repo side
