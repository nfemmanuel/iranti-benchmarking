# B15: Token Overhead Reckoning — Full Iranti Cost Accounting

**Track:** B15 - Token Overhead  
**Domain:** Context economy, token cost analysis  
**Motivation:** B14 measured inject savings but omitted Iranti's own per-turn overhead. B15 accounts for the full cost.

---

## What B14 Measured (And Missed)

B14 showed 37% savings at turn 15 by comparing:
- **NO_MEMORY**: re-reads full files on recall turns (~400-600 tok/file)
- **WITH_IRANTI**: receives inject blocks (~100 tok/fact)

B14 did NOT include in the WITH_IRANTI arm:
1. **System injection overhead** — the `[Iranti Session Memory]` block injected into the system prompt each session
2. **Attend call overhead** — each turn in a real Iranti session includes an `iranti_attend` MCP call and response, which adds ~700-1,100 tokens to context

This means B14's reported savings are the *raw injection savings* before overhead, not the *net* savings actually experienced.

---

## Research Questions

1. What is Iranti's measurable per-session overhead (system injection)?
2. What is the per-turn overhead from `iranti_attend` calls?
3. At what turn does WITH_IRANTI first become cheaper than NO_MEMORY, accounting for overhead?
4. Is there a session length / recall density below which Iranti is a net token cost?
5. What are ceiling savings under sustained heavy recall?

---

## Method

Same as B14: Anthropic `countTokens` API. No generation, no LLM cost. Exact counts.

### Arms

**NO_MEMORY**: standard agent with `read_file` tool; re-reads files on recall turns.

**WITH_IRANTI**: same agent with:
- `system`: base prompt + realistic `[Iranti Session Memory]` injection block
- Each turn: `iranti_attend` tool call (tool_use) + attend response (tool_result) added to conversation
- Recall turns: inject block prepended to user message (as in B14)

### Overhead Components Measured

| Component | Where it appears | Measured by |
|-----------|-----------------|-------------|
| System injection | `system` param | countTokens on template |
| Attend call | `tool_use` in assistant message | countTokens on template |
| Attend response (no inject) | `tool_result` in user message | countTokens on template |
| Attend response (with inject) | `tool_result` in user message | countTokens on template |

Templates are derived from real `iranti_attend` responses observed in production sessions.

---

## Scenarios

### Scenario A — No Recall (5 turns)

5-turn exploration session. Agent reads new files each turn. No recall required.

- **Purpose**: Measure pure overhead. If recall never happens, Iranti adds cost with zero benefit.
- **Expected**: WITH_IRANTI significantly more expensive at turn 5.

### Scenario B — Moderate (15 turns, 7 establishment + 8 recall)

Identical session to B14 "DebugAuth". Direct corrected comparison.

- **Purpose**: Show what B14's numbers would have been with full overhead accounting.
- **Expected**: Savings persist but smaller than B14's reported 37%.
- **Key metric**: Crossover turn (when does WITH_IRANTI ≤ NO_MEMORY?).

### Scenario C — Heavy (30 turns, 5 establishment + 25 recall)

Extended DataSync session with 8 larger files (~600-900 tok each). 25 of 30 turns are recall turns, each requiring 1-2 file lookups.

- **Purpose**: Show ceiling savings and compounding advantage under sustained heavy recall.
- **Expected**: WITH_IRANTI wins by a large margin despite overhead.
- **Key metric**: Final savings % and crossover turn.

---

## Session Domain — DataSync Pipeline

Scenario C uses a different domain than B14 to stress larger files:

```
sync-engine.ts      — main sync orchestrator (~700 tok)
schema.graphql      — GraphQL schema (~800 tok)
api-client.ts       — external API client with retry (~750 tok)
config.ts           — configuration constants (~500 tok)
transformers.ts     — record transformation functions (~700 tok)
queue.ts            — job queue management (~650 tok)
error-handler.ts    — error handling and retry logic (~600 tok)
db-models.ts        — database models (~700 tok)
```

Average file size: ~675 tokens. Each NO_MEMORY re-read costs ~675 tokens.
Each WITH_IRANTI inject block: ~90-130 tokens.

Gross saving per recall event: ~545-585 tokens.
Attend overhead per turn: measured at script start.

---

## Key Metrics Reported

For each scenario:
- Per-turn token counts: NO_MEMORY, WITH_IRANTI, delta, delta%
- Crossover turn (first turn where WITH_IRANTI ≤ NO_MEMORY, or N/A if never)
- Cumulative overhead at final turn (total Iranti overhead tokens)
- Cumulative savings at final turn (total avoided re-read tokens)
- Net saving (savings − overhead)

Cross-scenario summary:
- Overhead breakdown table
- Breakeven analysis (minimum recall turns for Iranti to be net positive)
- Savings trajectory chart data

---

## Caveats

- Attend response templates are derived from real responses but are static; actual response size varies by session state.
- B14 established sessions had different file content than this benchmark; direct numeric comparison is informative but not definitive.
- Real sessions also include `iranti_write` calls (not counted here); actual overhead is higher.
- Simulated sessions use scripted re-read behavior. Actual agent re-read frequency varies.

---

## Validity

- Token counts: exact (Anthropic countTokens API, not estimates)
- Overhead templates: derived from production attend responses, v0.3.37
- Comparison: B14 vs B15/Scenario-B is direct (same session script)
- Threats: static templates may underestimate attend response verbosity in complex sessions
