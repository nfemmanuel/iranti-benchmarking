# B16: Token Economy Under Multi-File Recall

**Track:** B16 - Token Economy (Multi-Recall)
**Executed:** 2026-04-14
**Model:** claude-sonnet-4-6
**Method:** Anthropic countTokens API (exact counts)

---

## Context: What B15 Found

B15 showed that with **1 file re-read per recall turn** (~700 tok), Iranti's attend
overhead (~633–911 tok/turn) is larger than the savings per recall turn. Iranti was
net-negative in all scenarios tested.

Break-even requires more re-read cost per recall turn than attend overhead.
**Prediction:** ≥2 files/recall turn should flip Iranti positive.

---

## Overhead (re-measured)

| Component | Tokens |
|-----------|--------|
| System injection (one-time) | +461 tokens |
| Attend call overhead/turn | +495 tokens |

---

## Scenario A — 2 files/recall turn (15 turns, 10 recall)

| Turn | Phase | NO_MEMORY | WITH_IRANTI | Δ saved | Δ% |
|------|-------|-----------|-------------|---------|-----|
| 1 | establishment | 1,598 | 2,480 | -882 | -55% |
| 2 | establishment | 2,460 | 3,763 | -1303 | -53% |
| 3 | establishment | 3,501 | 5,225 | -1724 | -49% |
| 4 | establishment | 4,022 | 6,167 | -2145 | -53% |
| 5 | establishment | 5,078 | 7,644 | -2566 | -51% |
| 6 | recall | 6,689 | 8,314 | -1625 | -24% |
| 7 | recall | 8,324 | 8,986 | -662 | -8% |
| 8 | recall | 9,624 | 9,621 | +3 | +0% |
| 9 | recall | 11,591 | 10,291 | +1300 | +11% |
| 10 | recall | 13,177 | 10,962 | +2215 | +17% |
| 11 | recall | 15,120 | 11,592 | +3528 | +23% |
| 12 | recall | 16,689 | 12,248 | +4441 | +27% |
| 13 | recall | 18,019 | 12,922 | +5097 | +28% |
| 14 | recall | 19,594 | 13,565 | +6029 | +31% |
| 15 | recall | 21,201 | 14,225 | +6976 | +33% |

**Result:** WITH_IRANTI saves **6,976 tokens (33%)** at turn 15. Crossover at turn 8.

---

## Scenario B — 3 files/recall turn (15 turns, 10 recall)

| Turn | Phase | NO_MEMORY | WITH_IRANTI | Δ saved | Δ% |
|------|-------|-----------|-------------|---------|-----|
| 1 | establishment | 1,598 | 2,480 | -882 | -55% |
| 2 | establishment | 2,460 | 3,763 | -1303 | -53% |
| 3 | establishment | 3,501 | 5,225 | -1724 | -49% |
| 4 | establishment | 4,022 | 6,167 | -2145 | -53% |
| 5 | establishment | 5,078 | 7,644 | -2566 | -51% |
| 6 | recall | 7,428 | 8,361 | -933 | -13% |
| 7 | recall | 9,804 | 9,103 | +701 | +7% |
| 8 | recall | 11,931 | 9,814 | +2117 | +18% |
| 9 | recall | 14,559 | 10,556 | +4003 | +27% |
| 10 | recall | 17,221 | 11,235 | +5986 | +35% |
| 11 | recall | 19,927 | 11,974 | +7953 | +40% |
| 12 | recall | 22,054 | 12,700 | +9354 | +42% |
| 13 | recall | 24,669 | 13,402 | +11267 | +46% |
| 14 | recall | 27,034 | 14,143 | +12891 | +48% |
| 15 | recall | 29,469 | 14,857 | +14612 | +50% |

**Result:** WITH_IRANTI saves **14,612 tokens (50%)** at turn 15. Crossover at turn 7.

---

## Scenario C — 2 files/recall turn (30 turns, 25 recall)

| Turn | Phase | NO_MEMORY | WITH_IRANTI | Δ saved | Δ% |
|------|-------|-----------|-------------|---------|-----|
| 1 | establishment | 1,598 | 2,480 | -882 | -55% |
| 2 | establishment | 2,460 | 3,763 | -1303 | -53% |
| 3 | establishment | 3,501 | 5,225 | -1724 | -49% |
| 4 | establishment | 4,022 | 6,167 | -2145 | -53% |
| 5 | establishment | 5,078 | 7,644 | -2566 | -51% |
| 6 | recall | 6,689 | 8,314 | -1625 | -24% |
| 7 | recall | 8,324 | 8,986 | -662 | -8% |
| 8 | recall | 9,624 | 9,621 | +3 | +0% |
| 9 | recall | 11,591 | 10,291 | +1300 | +11% |
| 10 | recall | 13,177 | 10,962 | +2215 | +17% |
| 11 | recall | 15,120 | 11,592 | +3528 | +23% |
| 12 | recall | 16,689 | 12,248 | +4441 | +27% |
| 13 | recall | 18,019 | 12,922 | +5097 | +28% |
| 14 | recall | 19,594 | 13,565 | +6029 | +31% |
| 15 | recall | 21,201 | 14,225 | +6976 | +33% |
| 16 | recall | 22,799 | 14,882 | +7917 | +35% |
| 17 | recall | 24,415 | 15,535 | +8880 | +36% |
| 18 | recall | 25,712 | 16,167 | +9545 | +37% |
| 19 | recall | 27,667 | 16,825 | +10842 | +39% |
| 20 | recall | 29,237 | 17,480 | +11757 | +40% |
| 21 | recall | 31,172 | 18,102 | +13070 | +42% |
| 22 | recall | 32,723 | 18,740 | +13983 | +43% |
| 23 | recall | 34,038 | 19,399 | +14639 | +43% |
| 24 | recall | 35,607 | 20,036 | +15571 | +44% |
| 25 | recall | 37,203 | 20,685 | +16518 | +44% |
| 26 | recall | 38,797 | 21,338 | +17459 | +45% |
| 27 | recall | 40,405 | 21,983 | +18422 | +46% |
| 28 | recall | 41,712 | 22,625 | +19087 | +46% |
| 29 | recall | 43,621 | 23,279 | +20342 | +47% |
| 30 | recall | 45,193 | 23,936 | +21257 | +47% |

**Result:** WITH_IRANTI saves **21,257 tokens (47%)** at turn 30. Crossover at turn 8.

---

## Cross-Scenario Summary

| Scenario | Files/recall | Turns | Recall | Final NO_MEM | Final WITH_IRANTI | Net | % | Iranti wins | Crossover |
|----------|-------------|-------|--------|-------------|-------------------|-----|---|-------------|-----------|
| A | 2 | 15 | 10 | 21,201 | 14,225 | +6976 | 33% | Yes | 8 |
| B | 3 | 15 | 10 | 29,469 | 14,857 | +14612 | 50% | Yes | 7 |
| C | 2 | 30 | 25 | 45,193 | 23,936 | +21257 | 47% | Yes | 8 |

---

## B14 / B15 / B16 Comparison

| Benchmark | What it measured | Net saving at 15t | Key finding |
|-----------|-----------------|-------------------|-------------|
| B14 | Inject savings only (no overhead) | +37% (+3,272 tok) | Inject blocks cheaper than re-reads |
| B15 | Full overhead, 1 file/recall | -103% (-7,536 tok) | Attend overhead dominates |
| B16-A | Full overhead, 2 files/recall | +33% | Multi-file tips Iranti positive |
| B16-B | Full overhead, 3 files/recall | +50% | Clearly positive at 3 files |

---

**Token counts are exact** (Anthropic countTokens API).
