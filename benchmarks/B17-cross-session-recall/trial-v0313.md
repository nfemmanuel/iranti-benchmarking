# B17: Cross-Session Recall Accuracy

**Track:** B17 - Cross-Session Recall
**Executed:** 2026-04-15
**Model:** claude-haiku-4-5-20251001
**Method:** Anthropic Messages API (real generation)
**Facts:** 20

---

## Summary

| Arm | Correct | Accuracy |
|-----|---------|----------|
| NO_MEMORY | 3/20 | **15%** |
| WITH_IRANTI | 17/20 | **85%** |
| Gap | | **+70 pp** |

---

## Per-Question Results

| # | Question | NO_MEMORY | WITH_IRANTI |
|---|----------|-----------|-------------|
| 1 | What is the name of the environment variable that holds… | fail | PASS |
| 2 | How long do AuthService access tokens last before expir… | fail | PASS |
| 3 | What database table stores refresh tokens in the AuthSe… | fail | PASS |
| 4 | What is the bug described in issue #47 for the AuthServ… | fail | PASS |
| 5 | What is the file path for the AuthService authenticatio… | fail | PASS |
| 6 | What is the API endpoint to invalidate a specific user … | fail | fail |
| 7 | What bcrypt cost factor does the AuthService use for pa… | fail | PASS |
| 8 | What Redis key prefix does the AuthService use for sess… | fail | PASS |
| 9 | What is the correct enum value for the admin role in th… | fail | PASS |
| 10 | What is the current OAuth callback URL path in the Auth… | fail | PASS |
| 11 | Where does JWT token validation happen in the AuthServi… | PASS | PASS |
| 12 | Does the AuthService logout endpoint invalidate a singl… | PASS | fail |
| 13 | What database table stores user credentials in the Auth… | fail | PASS |
| 14 | What port does the AuthService run on?… | fail | PASS |
| 15 | Under what condition is MFA bypassed in the AuthService… | fail | PASS |
| 16 | What are the credentials for the default test user in t… | fail | PASS |
| 17 | What common client mistake causes token refresh to fail… | fail | PASS |
| 18 | What JWT signing algorithm does the AuthService use sin… | fail | PASS |
| 19 | What is the login rate limit configuration in the AuthS… | PASS | fail |
| 20 | What unique constraint exists on the user_refresh_sessi… | fail | PASS |

---

## Interpretation

The gap of **+70 percentage points** represents Iranti's contribution to cross-session
recall. The NO_MEMORY arm reflects what users experience without memory: the agent
either guesses incorrectly or admits ignorance on project-specific facts. The
WITH_IRANTI arm reflects what users experience when the agent can query what was
learned in the previous session.

Token counts (secondary metric):
- NO_MEMORY total input tokens across 20 questions: 1,610
- WITH_IRANTI total input tokens across 20 questions: 2,647

Note: WITH_IRANTI input tokens include the injected memory block per question, so
are expected to be higher. The primary metric here is correctness, not token count.
