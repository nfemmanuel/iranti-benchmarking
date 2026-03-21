# Benchmark B10: Knowledge Provenance (iranti_who_knows)

**Family:** Multi-agent attribution / knowledge provenance
**Inspired by:** Collaborative knowledge base construction; Wikipedia revision attribution; multi-agent trust models
**Executed:** 2026-03-21
**Status:** Complete — first execution

---

## 1. What This Benchmark Measures

Whether `iranti_who_knows` correctly tracks and returns which agents have contributed facts to an entity, and whether agent identity attribution is accurate and complete.

This tests:
- **Attribution accuracy**: Does who_knows return the correct agent(s) for a given entity?
- **Key enumeration**: Are all contributed keys listed correctly?
- **Identity layer clarity**: Does who_knows track system agentId or caller-supplied source labels?
- **Relationship tracking**: Are iranti_relate edges tracked alongside KB facts?

---

## 2. Test Cases

| Entity | Facts written by | Expected in who_knows |
|--------|-----------------|----------------------|
| researcher/alice_chen | benchmark_program_main (4 facts) | benchmark_program_main, 4 keys |
| researcher/bob_okafor | benchmark_program_main (4 facts) | benchmark_program_main, 4 keys |
| project/lunar_api_v3 | benchmark_program_main with source=agent_alpha (6 facts) | Test whether agentId or source is returned |

---

## 3. Results

| Test | Result |
|------|--------|
| alice_chen attribution | ✓ benchmark_program_main, 4 keys correct |
| bob_okafor attribution | ✓ benchmark_program_main, 4 keys correct |
| lunar_api_v3 source label test | Returns agentId (benchmark_program_main), NOT source label (agent_alpha) |
| Relationship edge tracking | ✗ iranti_relate edges not tracked by who_knows |

---

## 4. Key Finding: Two Attribution Layers

| Layer | Field | Set by | Tracked by who_knows |
|-------|-------|--------|---------------------|
| System identity | agentId | Session configuration | ✓ Yes |
| Provenance claim | source | Caller-specified | ✗ No |

`iranti_who_knows` tracks the **agentId** (system identity) not the **source** label. This is correct behavior for accountability — the source label can be any string and represents claimed provenance, while agentId represents actual calling identity.

**Implication for B8**: The B8 multi-agent coordination test used source=agent_alpha to simulate Agent Alpha, but this is a provenance claim, not an identity. True multi-agent attribution in who_knows requires separate agent sessions configured with different agentIds.

---

## 5. Positive Capabilities Confirmed

- Correct key enumeration for all tested entities
- Exact contribution counting
- Cross-entity-type tracking (researcher/ and project/ both tracked)
- Stable across session (facts written earlier in session correctly attributed)

---

## 6. Threats to Validity

1. Only one real agentId (benchmark_program_main) was active — cannot test multi-agent attribution without separate sessions
2. Relationship tracking gap may be intentional design (facts vs. edges are separate concepts)
3. Small test set (3 entities)
