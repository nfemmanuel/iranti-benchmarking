# Software Versions

## Current (v6.0 — Targeted Revalidation, 2026-03-22)

| Component | Version |
|-----------|---------|
| iranti CLI | 0.2.16 |
| iranti runtime | 0.2.16 |
| Instance | local (localhost:3001) |
| Instance mode | isolated |
| LLM_PROVIDER | openai |
| Vector backend | pgvector (unreachable — warn) |

v6.0 targeted revalidation executed on 2026-03-22. No new npm release — same 0.2.16 binary as v3.0–v5.0. Revalidation triggered by upstream commit d03781a1 ("Harden benchmark regressions and compatibility policy") in the iranti source repo. Commit is unreleased but documents upstream intent and adds regression coverage.

**Upstream state context:**
- `tests/typescript_client/smoke_test.ts`: fixed to use isolated `person/` entity, no longer writes to `user/main`
- `tests/memory-retrieval-regressions.ts`: new file; slash-value through query/search/observe/attend — all PASS
- `src/lib/runtimeLifecycle.ts`: permissive legacy runtime.json parsing; old version metadata files parse with defaults
- `docs/decisions/007-compatibility-policy.md`: ADR 007 — compatibility-first policy across CLI, API, SDKs, config, persisted state
- `README.md`: narrowed to defensible product claims aligned with benchmark findings

v6.0 revalidation confirmed: slash-value RETRACTED, user/main RESOLVED, B4/B11/B12/B13 findings unchanged.

## v5.0 — Complete Program Close-Out (v0.2.16, 2026-03-21)

B1–B13 all closed. Full-protocol reruns complete. See `results/published/rpm-signoff-v5.md`.

## v3.0–v4.0 — Full Rerun (B13 execution)

| Component | Version |
|-----------|---------|
| iranti CLI | 0.2.16 |
| iranti runtime | 0.2.16 |
| Instance | local (localhost:3001) |
| Instance mode | isolated |
| LLM_PROVIDER | openai |
| Vector backend | pgvector (unreachable — warn) |

B13 executed against Iranti 0.2.16 on 2026-03-21. Confirmed via handshake (`briefGeneratedAt: 2026-03-21T19:51:14.859Z`, `sessionStarted: 2026-03-21T07:27:57.030Z`).

## v2.0 rerun

| Component | Version |
|-----------|---------|
| iranti CLI | 0.2.14 |
| iranti runtime | 0.2.14 |
| Instance | local (localhost:3001) |
| Instance mode | isolated |
| LLM_PROVIDER | openai (upgraded from mock on 2026-03-21) |
| Vector backend | pgvector (unreachable — warn) |

B4, B6, B9, B11 rerun against Iranti 0.2.14 on 2026-03-21.

> **Note:** `LLM_PROVIDER=mock` is a critical confound for any benchmark exercising LLM-dependent Iranti subsystems (iranti_ingest, iranti_attend, iranti_observe entity detection). B6 and B11 conclusions are provisional until retested with a real LLM provider.

## Original (v1.0 program)

| Component | Version |
|-----------|---------|
| iranti CLI | 0.2.12 |
| iranti runtime | 0.2.12 |
| Instance | local (localhost:3001) |
| Instance mode | isolated |

All 11 benchmark tracks (B1–B11) were originally executed against Iranti 0.2.12.

Confirmed at: `iranti upgrade --check` on 2026-03-21.

> **Note:** v0.2.13 was skipped — upgrade pulled v0.2.14 as latest at time of execution.

## Evaluation Model

All baseline and Iranti-arm trials were run using **Claude Sonnet 4.6** (`claude-sonnet-4-6`).

> **Note:** The same model was used to generate stimuli and evaluate responses throughout. This is a known reproducibility risk — see `results/published/reproducibility-audit.md` §C1.

## Infrastructure

- OS: Windows 11
- Shell: bash (Git Bash)
- Iranti transport: MCP over stdio (Claude Code integration)
- Project binding: `.env.iranti`, agent-id `benchmark_program_main`, mode `isolated`
