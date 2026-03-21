# Software Versions

## Iranti

| Component | Version |
|-----------|---------|
| iranti CLI | 0.2.12 |
| iranti runtime | 0.2.12 |
| Instance | local (localhost:3001) |
| Instance mode | isolated |

All 11 benchmark tracks (B1–B11) were executed against Iranti 0.2.12.

Confirmed at: `iranti upgrade --check` on 2026-03-21.

## Evaluation Model

All baseline and Iranti-arm trials were run using **Claude Sonnet 4.6** (`claude-sonnet-4-6`).

> **Note:** The same model was used to generate stimuli and evaluate responses throughout. This is a known reproducibility risk — see `results/published/reproducibility-audit.md` §C1.

## Infrastructure

- OS: Windows 11
- Shell: bash (Git Bash)
- Iranti transport: MCP over stdio (Claude Code integration)
- Project binding: `.env.iranti`, agent-id `benchmark_program_main`, mode `isolated`
