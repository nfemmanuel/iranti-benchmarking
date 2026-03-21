# Iranti Benchmarking

Fresh research workspace for evaluating Iranti against standard LLM and memory-system benchmarks.

This repo is not for product implementation.
It is for:
- selecting credible external benchmarks
- replicating published or standard benchmark setups as faithfully as possible
- rerunning comparable tasks with an installed Iranti instance in the loop
- producing defensible scientific writeups
- producing a separate plain-language public writeup

## Operating Rule

Benchmark against the installed Iranti surface, not the source checkout.

Use:
- installed `iranti` CLI
- installed/running Iranti instance
- published/public API shapes where possible

Do not benchmark by importing unpublished local source from `C:\Users\NF\Documents\Projects\iranti`.

## Start Iranti

In a separate terminal:

```powershell
iranti run --instance local
```

Check it:

```powershell
iranti doctor --instance local
iranti status
```

## Bind This Repo

From this repo:

```powershell
iranti project init . --instance local --agent-id benchmark_program_main --mode isolated
iranti claude-setup . --project-env .env.iranti
```

## Repo Layout

- `CLAUDE.md` - operating context for Claude Code and the research team
- `.claude/agents/` - benchmark specialists
- `docs/research-program.md` - detailed research charter and publication goals
- `docs/roadmap.md` - phased execution plan
- `docs/backlog.md` - prioritized work
- `docs/publication-plan.md` - paper and public-writing outputs
- `benchmarks/` - benchmark definitions and benchmark notes
- `results/` - raw and published result artifacts
- `papers/` - formal scientific paper drafts
- `articles/` - public-facing explainers and blog blurbs

## Standard

This workspace should favor:
- methodological clarity
- benchmark honesty
- reproducibility
- baseline rigor
- conservative claims

