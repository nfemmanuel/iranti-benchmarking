# Targeted Control-Plane Lifecycle Benchmark Recommendation

## Recommendation
Keep only a lightweight regression benchmark for this slice.

## Recommendation Class
- `2. keep only a lightweight regression benchmark for this slice`

## What Was Measured
- stopped-instance `Run Doctor`
- stopped-instance `Start`
- post-start status convergence

## What Was Not Measured And Why
- UI polling overhead
  - no existing harness
  - not required to answer the slice-level regression question
- unrelated KB / ingest / archive / agent / memory surfaces
  - out of scope
  - no evidence of direct coupling
- full benchmark suite rerun
  - not justified by these results

## Whether Any Meaningful Regression Was Found
No.

Detailed conclusion:
- stopped-instance doctor: no meaningful regression
- stopped-instance start: no meaningful regression
- post-start convergence: no meaningful regression

## Whether Any Result Is Too Noisy To Trust
No result is too noisy to use for a bounded recommendation.

Nuance:
- doctor has no historical timing baseline, so the evidence is “stable and operator-safe” rather than “improved versus old benchmark X”
- start has mild cold-start variance, but warm behavior is stable and within the same practical band as prior validation

## Whether Further Benchmarking Is Justified
No broader rerun is justified from this slice alone.

What is justified:
- keep the new lightweight harness for future regression checks on stopped-instance doctor/start behavior

What is not justified:
- full `iranti-benchmarking` rerun
- product-wide performance investigation
- unrelated benchmark family re-execution

## Whether Any Control-Plane Performance Fix Is Needed
No control-plane performance fix is indicated by this pass.

The repaired slice appears to have paid a small, acceptable confirmation cost in exchange for correct semantics.
That trade is justified.

## If This Slice Regresses Later, Where To Look First
1. added status confirmation loop in control-plane start handling
2. upstream `iranti status --json` latency
3. local runtime cold-start effects
4. runtime health readiness timing
5. benchmark harness drift

## Smallest Safe Next Decision
- accept the stopped-instance lifecycle/doctor hardening as performance-safe
- retain `scripts/measure_cp_lifecycle_slice.ps1` as the ongoing regression check
- do not reopen broader benchmarking work unless a later release changes lifecycle/status/doctor semantics again
