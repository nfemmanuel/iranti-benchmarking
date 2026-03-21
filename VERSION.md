# Software Versions

## Current (v2.0 rerun)

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
