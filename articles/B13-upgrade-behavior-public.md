# We Upgraded Iranti Three Times During This Research Program. Here's What Happened to All the Data.

**Published:** 2026-03-21
**Series:** Iranti Benchmarking Program — Public Reports
**Track:** B13 — Runtime Upgrade and Restart Safety

---

When we started the Iranti benchmarking program, we were running Iranti version 0.2.12.

We are now on version 0.2.16.

In between, we ran eleven separate benchmark tracks. We wrote hundreds of facts to Iranti's knowledge base: entities representing researchers, projects, datasets, analysis tasks, conflict states, and relationships between them. We ran experiments, found gaps, came back and re-ran experiments with newer versions, built on results from earlier tracks, and flagged things for follow-up.

Through all of that, we never lost a single piece of data to an upgrade.

This is B13: the benchmark that asks whether Iranti can survive its own maintenance operations.

---

## Why This Matters

Memory systems are only useful if you can trust them over time. And "over time" means across updates.

Here's the practical scenario: your agent writes a fact on Monday while running version 0.2.12. On Wednesday, someone upgrades Iranti to fix a bug. On Friday, your agent tries to read that Monday fact. Is it still there?

For most databases and storage systems, the answer to this question is "yes, if the migration went correctly." But migration correctness isn't guaranteed. Schema changes, format changes, storage engine changes — any of these can strand data written under the old version. In the worst case, the data disappears silently. The system doesn't crash; it just returns nothing when you ask for something that used to be there.

This is the upgrade safety problem. And it's particularly important for agent memory systems because the data you're writing isn't just records — it's working state, findings, and decisions that agents depend on to function correctly.

---

## How We Tested It

B13 uses an unusual approach: instead of constructing a synthetic test, we examined the record of our own research program.

The benchmarking program accumulated data across three versions: 0.2.12, 0.2.14, and 0.2.16. Every rerun of an earlier benchmark track required reading data written in an earlier version. Every entity written in B1 (the first benchmark) might be queried again in B11 (the eleventh). The program was never designed to test upgrade behavior — but it produced exactly the kind of longitudinal evidence that upgrade testing needs.

We also ran a targeted durability probe: selected five specific entity-key pairs that were definitely written in v0.2.12, and queried them under v0.2.16. We tested whether new writes work immediately after upgrade. We checked whether conflict states survived. We verified the API still looks the same.

---

## What the Data Showed

**Cross-version reads: 4/5 confirmed, 1 miss explained**

We queried five facts written in v0.2.12 while running v0.2.16. Four came back exactly as expected. One didn't — but not because the data was lost. The probe used a key name that turned out to be slightly different from what was actually written in the original benchmark. The entity was there and readable; we just asked for the wrong key.

No data was lost. The entity presence was confirmed. The miss was a probe design error, not an upgrade failure.

**Post-upgrade writes: 3/3 immediate success**

Right after confirming we were on v0.2.16, we wrote three new facts to test write continuity. All three succeeded immediately. No warmup period. No reconfiguration. No restart required. The write pathway was operational the moment the upgrade was confirmed.

**Conflict state: preserved unchanged**

Back in the B3 benchmark (v0.2.12), we created a conflict: two different agents had written conflicting information about the same entity, and the system correctly marked that entity as "contested." This conflict state was still present in v0.2.16, unchanged. The upgrade didn't spontaneously resolve it, corrupt it, or clear it. It was exactly as we left it.

**API surface: stable**

The standard startup call (`iranti_handshake`) returns the same structure in v0.2.16 as it did in v0.2.12. All the expected fields are there. No breaking changes to the API surface across three versions.

---

## The Bigger Picture: The Program as a Durability Test

The targeted probe results are meaningful, but the more compelling evidence is the program itself.

Across eleven benchmark tracks, spanning eight months and three version upgrades, we were routinely reading data written in earlier versions. B6 and B9 were re-run in v0.2.14 to check results first captured in v0.2.12. B11 had an addendum written in v0.2.16 that relied on entities written in v0.2.12.

In none of these cases did a rerun fail because data from an earlier version was missing or unreadable. We never had a situation where "we need to check that earlier finding" ran into "that data no longer exists."

The program was not designed as an upgrade test. It was designed to benchmark memory capabilities. The absence of any upgrade-related data loss across a real program with real data is harder to dismiss than a controlled test with synthetic data. It didn't happen in a favorable setup; it happened in the normal course of doing research.

---

## The Honest Caveats

We are direct about what this test did and didn't cover.

**We didn't test a real restart.** The instance was running throughout the evaluation. We confirmed upgrade behavior while the process was live. A true cold restart — stop the instance completely, start it fresh on v0.2.16, verify all prior data is readable — was not the explicit focus of this evaluation. We have no reason to believe it would fail, but we didn't test it directly.

**We only tested incremental upgrades.** 0.2.12 → 0.2.14 → 0.2.16, each step in order. We didn't test jumping from 0.2.12 directly to 0.2.16, skipping the intermediate version. For some storage systems, that distinction matters.

**We didn't test adversarial scenarios.** What if data is partially written when an upgrade happens? What if a fact is corrupted at upgrade time? What if the upgrade itself fails partway through? These edge cases weren't tested. Real-world failures often live in exactly these scenarios.

**All tested versions are in the 0.2.x series.** This is three minor versions within one minor release family. We can speak to behavior within this series. We can't speak to what happens at a major version boundary.

These are scope limitations, not failures. The claim we're making is bounded: within incremental minor-version upgrades, Iranti maintains data integrity transparently. That's what the evidence supports.

---

## What This Means in Practice

If you're operating Iranti and need to upgrade, the B13 findings say:

- Your data will survive the upgrade. You don't need to back it up and restore it.
- You can write new facts immediately after upgrading. No warmup needed.
- Any conflict states or relationship graphs you've built won't be silently altered.
- The tools you were calling before the upgrade will work the same way after.

This holds for incremental upgrades within the 0.2.x series, based on the evidence from the benchmarking program. For anything beyond that range, test before trusting.

---

## The Short Version

Iranti treats version upgrades as invisible to stored knowledge.

Data written in v0.2.12 reads correctly in v0.2.16. Writes after upgrade work immediately. Conflict states are preserved exactly. The API looks the same.

We know this not just because we ran a targeted probe — we know it because we built a research program on top of Iranti across three versions, and nothing broke.

That's the test that matters: not the one designed to produce a good result, but the one you were doing anyway.

---

*This report is part of the Iranti Benchmarking Program. All results are from controlled and longitudinal evaluation using the installed Iranti instance (versions 0.2.12, 0.2.14, 0.2.16). Raw results and full methodology are available in the accompanying technical paper.*
