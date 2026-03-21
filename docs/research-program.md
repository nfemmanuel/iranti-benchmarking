# Iranti Benchmark Research Program

## Objective

Create a benchmark program that compares standard or recognizable LLM evaluation tasks under two conditions:

1. baseline system behavior without Iranti
2. comparable behavior with an installed Iranti instance integrated

The program should generate material suitable for:
- a formal scientific paper, report, or preprint
- a public blog or journal-style writeup

## Why This Exists

Iranti has internal benchmarks and validation already, but that is not enough.

This research program is intended to answer external scrutiny:
- Can the effect be shown on tasks other people recognize?
- Can the benchmark setup be replicated honestly?
- Can the result be interpreted conservatively?
- Can the comparison survive publication-level criticism?

## Research Principles

- use recognized benchmarks where possible
- if exact replication is impossible, document the deviation explicitly
- do not overclaim from proxy benchmarks
- keep the Iranti condition operationally realistic
- favor reproducibility over spectacle
- publish caveats, not just wins

## Benchmark Selection Criteria

Candidate benchmarks should score well on:
- external recognizability
- clarity of task definition
- practical reproducibility
- relevance to memory, retrieval, long-context, multi-step reasoning, or cross-agent handoff
- ability to define a fair with-Iranti condition

Reject benchmarks that:
- cannot be reproduced credibly
- collapse into marketing theater
- make Iranti look better only because the baseline is misconfigured
- require hidden proprietary evaluation logic without any faithful public proxy

## Target Benchmark Families

### Family A - Long-context retention and retrieval
Goal:
- determine whether Iranti changes factual recovery under transcript saturation or long-context pressure

Potential sources:
- long-context retrieval tasks
- needle-in-a-haystack style tasks
- memory QA tasks

### Family B - Multi-step reasoning under memory pressure
Goal:
- test whether externalized memory improves task completion, stability, or recovery when intermediate state would otherwise degrade

### Family C - Multi-agent handoff and coordination
Goal:
- test whether explicit persistent memory changes cross-agent factual continuity and conflict handling

### Family D - Retrieval-grounded factual recall
Goal:
- test whether structured memory improves exact factual recovery compared with baseline prompting or transcript-only context

## Experiment Design Template

For every chosen benchmark:

1. Original benchmark/source
- citation or public reference
- what it measures
- known evaluation protocol

2. Replication design
- exact task as reproduced here
- unavoidable deviations
- reasons for those deviations

3. Baseline arm
- no Iranti in the loop
- same model/provider where possible
- same prompt family where possible

4. Iranti arm
- installed Iranti instance only
- project-bound or API-bound integration
- same model/provider where possible
- only the memory/retrieval layer changes

5. Metrics
- success/failure
- accuracy
- recall / precision if relevant
- latency if relevant
- confidence intervals where feasible
- failure categories

6. Validity review
- threats to validity
- benchmark mismatch risk
- integration confounds
- publication caution

## Publication Outputs

### Formal Output

Each benchmark family should ultimately feed:
- an internal technical report or preprint-ready paper
- method appendix
- result tables
- limitations section

### Public Output

Each benchmark family should also produce:
- a short, clear blog/journal article
- plain-language explanation
- bounded interpretation

## Success Criteria

The program is successful when:
- at least 3 benchmark families are selected with defensible rationale
- at least 1 benchmark family is fully replicated and rerun with Iranti
- at least 1 formal paper/report draft exists
- at least 1 public article exists
- every major claim is tied back to actual evidence and caveats

## Non-Goals

- optimizing for vanity metrics
- claiming benchmark coverage that does not exist
- turning every experiment into product marketing
- using unpublished Iranti internals to produce inflated numbers

