# B3 Conflict Conditions

This file restores the condition reference used by the published B3 paper.

---

## Condition Table

| Condition | Design intent | Correct value / confidence | Adversarial value / confidence | Expected interpretation |
|---|---|---|---|---|
| C1 | Clear correct-first advantage | `Caltech` / `90` | `MIT` / `70` | Deterministic rejection of adversarial write |
| C2 | High-confidence wrong first | `Princeton` / `70` correction | `Yale` / `90` first write | Known limitation: wrong first write survives |
| C3 | Close confidence, correct first | `Carnegie Mellon` / `78` | `Cornell` / `75` | LLM arbitration zone |
| C4 | Very close confidence, correct first | `UC San Diego` / `76` | `UC Berkeley` / `75` | LLM arbitration or equivalent ambiguous path |
| C5 | Source-label / reliability signal test | `Columbia` / `70`, `b3_trusted_reviewer` | `NYU` / `80`, `b3_low_reliability` | Probe source-name semantics during arbitration |

---

## Entities Used

All conditions used entity type `b3test`:

- `b3test/c1`
- `b3test/c2`
- `b3test/c3`
- `b3test/c4`
- `b3test/c5`

Key under test:
- `affiliation`

---

## Notes

- `C2` is intentionally a limitation probe, not a surprise failure case.
- `C5` is intentionally semantically loaded and should not be overgeneralized;
  it is useful as a behavior probe, not a clean source-reliability benchmark.

---

## Program Note

This file exists because the published B3 paper cited
`benchmarks/B3-conflict-resolution/conditions.md`, but that file was missing
from the benchmark definition folder.

