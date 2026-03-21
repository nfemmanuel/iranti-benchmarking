# Benchmark B13: Runtime Upgrade and Restart Behavior

**Family:** Durability and upgrade-safety
**Benchmark scientist:** `benchmark_scientist`
**First execution:** 2026-03-21 (v0.2.16)
**Versions covered:** 0.2.12, 0.2.14, 0.2.16
**Status:** Complete — PASS

---

## 1. What This Benchmark Measures

This benchmark tests whether Iranti preserves stored knowledge across runtime version upgrades and restarts. A production memory system must guarantee that:

1. Facts written in version N are readable in version N+1 and N+2 without degradation.
2. Conflict resolution state is not corrupted or reset across version boundaries.
3. The write/read pipeline continues to function on a freshly upgraded instance.
4. The MCP API surface (specifically `iranti_handshake`) remains schema-stable across versions.

The core hypothesis is:

> Iranti's persistence layer is version-agnostic at the data level. Upgrading the runtime does not alter, corrupt, or silently drop stored facts, conflict metadata, or confidence scores.

This is not a performance benchmark. It is a correctness and durability benchmark.

---

## 2. Motivation

The benchmarking program itself provides a natural test case: B1 through B11 data was written across Iranti versions 0.2.12 and 0.2.14 during a single program of work conducted on 2026-03-21. By the time B13 was executed, Iranti had been upgraded to 0.2.16. Any data written in earlier versions should still be accessible.

This scenario — writing data in one version, upgrading, and reading in a later version — is the standard production use case for a persistent memory system. Failure here (data loss, schema breakage, silent value change) would be a critical defect.

---

## 3. Benchmark Design

### Test 1: Cross-version data durability

**Procedure:** Query 5 entities that were written in prior versions (0.2.12 and 0.2.14). For each, record: found (true/false), current value, confidence, and whether the value matches the original write record.

**Scoring:** X/5 correct (where "correct" means: found=true AND value matches original write AND confidence is stable AND no spurious contested flag).

**Note on key selection:** The queried entity+key pairs must match exactly what was written in prior sessions. If a key was stored under a different name in the original write, the query will return found=false, which is a specification error rather than a durability failure. Benchmark scripts should verify key names against write records before scoring.

### Test 2: Write after upgrade

**Procedure:** Write 3 new facts on the current version (v0.2.16). Immediately query all 3 back. Verify value, confidence, and source are correct.

**Scoring:** X/3 correct.

### Test 3: Conflict resolution state preserved

**Procedure:** Query an entity that was involved in conflict resolution in a prior version. Verify that:
- The winning value is still the correct value.
- The contested flag has not been spuriously set or cleared.
- Resolution metadata has not been corrupted.

**Scoring:** PASS / PARTIAL / FAIL with qualitative description.

### Test 4: API surface stable

**Procedure:** Call `iranti_handshake` with a task description and agent ID. Verify that the response contains all expected fields: `sessionStarted`, `agentId`, `operatingRules`, `inferredTaskType`, `workingMemory`, `contextCallCount`, `sessionCheckpoint`, `sessionRecovery`.

**Scoring:** PASS / FAIL.

---

## 4. Entities Used

### Test 1 entities

| Entity | Key | Written in | Source | Expected value |
|--------|-----|-----------|--------|---------------|
| researcher/alice_chen | publication_count | v0.2.12 B1 | b1_benchmark_ingest | `{"count": 47}` |
| researcher/bob_okafor | affiliation | v0.2.12 B1 | b1_benchmark_ingest | `{"institution": "Stanford AI Lab"}` |
| project/lunar_api_v3 | database_engine | v0.2.14 B11 rerun | attendant_test | `{"engine": "PostgreSQL 16"}` |
| project/mars_gateway_v2 | auth_strategy | v0.2.14 B11 rerun | ClaudeCode | `"mTLS with certificate rotation every 7 days"` |
| researcher/v0214_rp_chen | profile | v0.2.14 B4 rerun | B4-rerun-v0214-setup | `{name, field, position, institution}` |

**Note:** The fifth entity is stored under key `profile`, not `affiliation`. Future reruns of this benchmark should query the `profile` key. The initial benchmark specification used `affiliation` in error.

### Test 2 entities (written by B13)

| Entity | Key | Value | Version |
|--------|-----|-------|---------|
| v0216_b13_post_upgrade/test_a | written_on | `"0.2.16"` | v0.2.16 |
| v0216_b13_post_upgrade/test_b | written_on | `"0.2.16"` | v0.2.16 |
| v0216_b13_post_upgrade/test_c | written_on | `"0.2.16"` | v0.2.16 |

---

## 5. Results Summary (First Execution, v0.2.16)

| Test | Score | Result |
|------|-------|--------|
| Test 1 — Cross-version durability | 4/4 correct queries (5/5 entities present) | PASS |
| Test 2 — Write after upgrade | 3/3 | PASS |
| Test 3 — Conflict state preserved | No corruption detected | PASS |
| Test 4 — API surface stable | All fields present | PASS |
| **Overall** | | **PASS** |

Full results: `results/raw/B13-upgrade-behavior-v0216.md`

---

## 6. Caveats and Threats to Validity

### C1 — No explicit version tagging in KB records

Iranti does not currently store the runtime version at write time as a native metadata field. The "written in version X" provenance in this benchmark is inferred from source labels and `validFrom` timestamps correlated against session logs. There is no guarantee that a future schema change could not silently alter records between versions without detection by this test design.

**Mitigation:** The test uses concrete expected values cross-referenced against documented write records. A silent value change would be detectable by value mismatch.

### C2 — Same underlying database

This benchmark was run against a single Iranti instance whose database was not snapshotted or migrated between version upgrades. The "upgrade" is a runtime upgrade, not a database migration. If Iranti were to perform a destructive database migration during upgrade (dropping tables, changing column types), this test would detect it only as data loss — it would not distinguish migration-caused loss from a genuine durability bug.

**Mitigation:** Future runs of B13 should capture the database schema before and after upgrade using `iranti doctor` output.

### C3 — Benchmark specification error in Test 1 item 5

The initial specification queried `researcher/v0214_rp_chen / affiliation`, but the entity was written under key `profile`. This is corrected in the benchmark definition above for future reruns. It does not affect the durability conclusion.

### C4 — iranti_search not retested

The B4 rerun (v0.2.14) documented a runtime crash in `iranti_search`. B13 did not retest this defect against v0.2.16. The upgrade-safety result applies to the `iranti_query`, `iranti_write`, and `iranti_handshake` surfaces only.

---

## 7. Reproducibility Notes

To rerun this benchmark against a future version:

1. Verify Iranti instance is running: `iranti doctor --instance local`
2. Run `iranti_handshake(task="B13 upgrade behavior test", agent="benchmark_program_main")` and record schema.
3. Query each Test 1 entity+key pair and compare against expected values in section 4.
4. Write 3 new `v{VERSION}_b13_post_upgrade/test_{a,b,c}` entities with `written_on = "{VERSION}"` and read them back.
5. Query `researcher/alice_chen / publication_count`, verify value=47, contested=false.
6. Score and record in `results/raw/B13-upgrade-behavior-v{VERSION}.md`.

---

## 8. Reference Documents

- `results/raw/B13-upgrade-behavior-v0216.md` — first execution raw results
- `results/raw/B1-entity-retrieval.md` — alice_chen and bob_okafor write records
- `results/raw/B4-search-rerun-v0214.md` — v0214_rp_chen write record
- `results/raw/B11-context-recovery-rerun-v0214.md` — lunar_api_v3 and mars_gateway_v2 write records
- `results/raw/B3-conflict-resolution.md` — conflict resolution methodology
- `VERSION.md` — Iranti version history for this program
