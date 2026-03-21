# Iranti Benchmarking - Research Operating Context

## Mission
Build a serious benchmarking and publication program for Iranti.

This repo exists to answer one question rigorously:

> When benchmarked against recognized or commonly used LLM/memory evaluation tasks, what changes when an otherwise comparable system is rerun with an installed Iranti instance in the loop?

This repo is not for vague demo work.
It is for:
- benchmark selection
- replication
- controlled reruns with Iranti
- statistical review
- scientific publication
- public communication of the findings

## Core Rule

Use the installed Iranti product surface, not the local source checkout.

That means:
- start Iranti with `iranti run --instance local`
- bind this repo to the installed instance
- benchmark through the installed CLI / HTTP API / project binding
- avoid direct imports from `C:\Users\NF\Documents\Projects\iranti`

## What The Researchers Must Do

1. Identify standard or at least recognizable benchmark tasks used in LLM evaluation, memory evaluation, retrieval evaluation, or multi-agent evaluation.
2. Reconstruct or replicate them as faithfully as possible.
3. Record baseline methodology and any unavoidable deviations from the original papers or public benchmark specs.
4. Run the benchmark without Iranti.
5. Run the benchmark again with Iranti integrated through the installed instance.
6. Compare results conservatively.
7. Write a formal scientific paper/report.
8. Write a plain-language blog/journal version for non-specialist readers.

## Publication Rule

Every benchmark track should produce two outputs:

1. Formal output
- method
- setup
- dataset/task definition
- baseline
- Iranti-assisted condition
- results
- caveats
- threats to validity

2. Public output
- what was tested
- what changed
- what did not change
- why it matters
- why the claim is still bounded

## Installed Iranti Commands

Start the installed instance in another terminal:

```powershell
iranti run --instance local
```

Check the instance:

```powershell
iranti doctor --instance local
iranti status
```

Bind this repo if needed:

```powershell
iranti project init . --instance local --agent-id benchmark_program_main --mode isolated
iranti claude-setup . --project-env .env.iranti
```

## Research Priorities

Priority order:
1. benchmark selection and replication quality
2. defensible experimental design
3. reproducibility
4. conservative interpretation
5. scientific publication
6. public communication

## Team Model

Core agents:
- Research Program Manager: `research_program_manager`
- Literature Reviewer: `literature_reviewer`
- Benchmark Scientist: `benchmark_scientist`
- Replication Engineer: `replication_engineer`
- Statistics Reviewer: `statistics_reviewer`
- Paper Author: `paper_author`
- Science Communicator: `science_communicator`
- Reproducibility Auditor: `reproducibility_auditor`

## Coordination Rule

The Research Program Manager should periodically align with:
- the Iranti site PM in `C:\Users\NF\Documents\Projects\iranti-site`
- the control-plane PM in `C:\Users\NF\Documents\Projects\iranti-control-plane`

Reason:
- benchmark claims will affect public messaging
- scientific caution and product positioning must stay aligned

## Completion Rule

A benchmark track is not done when numbers exist.
It is done when:
- the benchmark choice is justified
- the replication is documented
- the with-Iranti condition is controlled
- results are analyzed conservatively
- the formal writeup exists
- the public writeup exists
- the Research Program Manager signs off

