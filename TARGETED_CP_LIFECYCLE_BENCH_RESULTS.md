# Targeted Control-Plane Lifecycle Benchmark Results

## What Was Measured
1. stopped-instance doctor latency and decomposition completeness
2. stopped-instance start latency to confirmed success
3. post-start status convergence latency

## What Was Not Measured
- UI polling overhead
- broad control-plane UI render timing
- unrelated KB, ingest, archive, agent, or memory paths
- full benchmark suite reruns

Why:
- no existing harness in `iranti-benchmarking` mapped cleanly to UI polling overhead
- those paths are outside the repaired lifecycle/doctor slice
- reopening them would violate the bounded scope

## Comparison / Baseline Interpretation

### Available baseline
There is no historical published lifecycle-latency benchmark in `iranti-benchmarking` that directly measures:
- stopped-instance doctor latency
- start confirmation latency
- status convergence latency

The nearest comparison points are:
1. control-plane stopped-instance validation note
   - recorded confirmed start path of about `2.93s`
2. single real execution sample in this pass from the execution worker
   - doctor `481.350 ms`
   - start `2478.865 ms`
   - convergence `325.134 ms`
3. B13 upgrade behavior
   - lifecycle-adjacent procedural evidence only, not timing evidence

### Current measured slice
- doctor mean: `396.373 ms`
- start mean: `2502.180 ms`
- start warm mean: `2126.460 ms`
- convergence mean: `559.640 ms`

## Interpretation by Slice

### 1. Stopped-instance `Run Doctor`
Classification:
- `no meaningful change`

Reason:
- latency remained stable inside a narrow `351-501 ms` band
- every run returned the same decomposed truth:
  - `runtime_availability = warn`
  - `21 pass / 6 warn / 0 fail`
- no repeated collapse into a coarse failure state

Risk:
- no direct historical doctor-latency baseline exists
- classification therefore relies on absolute stability and decomposition correctness, not comparison to an older timing series

### 2. Stopped-instance `Start`
Classification:
- `no meaningful regression`

Reason:
- the repaired start path now waits for upstream running-state confirmation
- despite the added confirmation loop, warm runs averaged only `2126.460 ms`
- even including the colder first run, the mean was `2502.180 ms`
- that remains within the same practical band as the earlier control-plane validation sample of about `2.93s`

Observed variance:
- iteration 1: `4005.061 ms`
- iterations 2-5: `2036-2311 ms`

Interpretation:
- the first run looks like cold-start variance, not sustained degradation
- no failed starts or false-success responses were observed

### 3. Post-start status convergence
Classification:
- `expected variance`

Reason:
- convergence completed in one poll every time
- mean `559.640 ms`
- range `470-596 ms`
- this suggests the control-plane state and `iranti status --json` become consistent almost immediately after the confirmed start response

### 4. Optional UI/API polling overhead
Classification:
- `benchmark not run`

Reason:
- no existing dedicated harness
- not necessary to answer the regression question for the repaired slice

## Unresolved Risks
1. Doctor latency has no older direct timing baseline, so “no regression” is based on current stability rather than time-series comparison.
2. Start latency is measured on a single real local machine with one instance shape.
3. The colder first iteration suggests startup caches or process cold-start effects remain part of the observed path.
4. This pass validates operator truth and bounded performance, not full lifecycle scalability.

## Raw Evidence Pointers
- Harness: `scripts/measure_cp_lifecycle_slice.ps1`
- Raw JSON: `results/raw/targeted-cp-lifecycle-bench-20260325.json`

## Bottom Line
The repaired stopped-instance slice does not show a meaningful performance regression.

What changed is correctness:
- start now waits for real running-state truth
- doctor now returns useful partial truth when stopped

What did not appear:
- large repeated latency inflation
- instability
- noisy convergence behavior
- collapse of doctor output into unusable failure
