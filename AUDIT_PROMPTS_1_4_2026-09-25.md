# Audit Prompts 1–4 — 2026-09-25

Repository `ngogibao0311-wq/quan-ly-hoc-tap` is the source of truth. The DOCX reports are treated only as leads; each item below was rechecked against the current `main` branch at base commit `4c979fc607d963706f5262e548154f66a22a1453`.

## Status legend

- `VERIFIED_OPEN`: issue exists on current main and is not safely fixed yet.
- `VERIFIED_WIP`: replacement exists on this audit branch but remains blocked by related authority/rules work.
- `VERIFIED_NO_CHANGE`: warning was checked and does not justify a code replacement on current main.
- `STALE_REPORT`: report assertion is no longer true on current main.

## Findings

| Status | Issue | Current evidence | Root cause / disposition |
|---|---|---|---|
| VERIFIED_OPEN | `student_coins` self-write | `database.rules.patched.json` lets a student write their own numeric Coin balance over a very large non-negative range. `student.js` has many direct Coin mutations. | Client transaction/operationId prevents some races but is not authority. Do not tighten the rule until every legitimate caller has an authoritative replacement. |
| VERIFIED_OPEN | `student_money_offset` / `student_bonus_tickets` / historical tickets self-write | Rules allow own-student writes; multiple student callsites depend on them. | Same authority gap as Coin. |
| VERIFIED_OPEN | `student_discounts` self-write | Parent write allows own student; child validation only strongly binds `teacher_gift`, leaving other sources broad. | Discount creation/consume must be bound to a trusted operation before rule tightening. |
| VERIFIED_OPEN | Daily Login asset authority | `js/daily-login.js` first commits `student_daily_login`, then separately mutates Coin/ticket/money/item/discount. Item source is `daily_login`, which inventory Rules do not whitelist. | Split writes + student authority. Requires one authoritative grant path; do not solve by whitelisting the inventory source. |
| VERIFIED_OPEN | Leaderboard reward authority | `js/leaderboard.js` computes rank on student client, creates claim state, then grants Coin/discount/chest rewards. Chest RNG is client-side. Inventory source `leaderboard_chest` is not allowed. | Claim Rules validate internal fields but do not bind rank to a teacher/server canonical ranking. Do not widen inventory Rules. |
| VERIFIED_WIP | Royal Ball client RNG and partial commit | On main, `calculateReward()` grants Coin/item before `spin_history`; failure can reopen the daily limit and refund fee after the reward already succeeded. | Branch replacement converts reward result to `pending` proposal and teacher approve/reject before grant. Still blocked by permissive `royal_ball_limits` Rules and global Coin self-write. Not merge-ready. |
| VERIFIED_OPEN | Royal Ball request Rules | `royal_ball_limits/{username}` currently lets own student write the whole node; validation only requires `lastDate` string. | Student could mutate proposal/status fields. Rules must enforce immutable proposal fields and teacher-only approval/rejection before the WIP is merge-ready. |
| VERIFIED_OPEN | Bellum reward mismatch + client authority | `js/bellum-event.js` selects every regular Store item tagged `Thất Đại Tội`; Rules completion accepts only three item IDs. Story completion is held in localStorage. | Adding `bellum_completion_reward` or widening item whitelist would turn client-controlled progress into authority. Needs teacher/server verification or another canonical completion source. |
| VERIFIED_OPEN | Bellum stale claim takeover | Claim reservation becomes stale after 120s; final multi-location update does not re-check ownership token immediately before finalization. | Old claimant can theoretically resume after takeover. Fix only together with an authoritative Bellum claim design. |
| VERIFIED_OPEN | Painting partial reward | `rewardSeasonStudents()` moves to processing, writes Coin separately, then writes other rewards/status. | Teacher-authoritative but non-atomic. Convert the reward + `done` status to one idempotent root update. |
| VERIFIED_OPEN | Painting `status=error` season cannot auto-retry | `tryBuildSeason()` only acquires when the season record does not exist. | Existing error record prevents reacquisition. Add an explicit teacher-authorized error/retry state transition. |
| VERIFIED_OPEN | Plaintext passwords in RTDB/UI | `teacher.js` stores student password in `users/{uid}`, renders it in the management table, and uses it to sign into a secondary Firebase Auth instance for change/delete. | Correct replacement requires privileged Auth administration (Admin SDK/callable backend). Deleting the field alone would break account management. Existing repo has an Admin SDK scheduled function, but no client Functions SDK/deployment contract is present. |
| STALE_REPORT | Student listens to all `cash_requests` | Current `student.js` uses username-scoped query; current Rules require own-username query for student collection reads. | No replacement required for this old warning. |
| VERIFIED_NO_CHANGE | Effect duplicate timer / duplicate MutationObserver | `EffectManager.applyEffect()` clears the existing effect first; `clearEffects()` stops central intervals. `EffectQualityManager` has a singleton guard and `installObserver()` refuses to create a second observer. | No evidence for adding watchdog/timer/observer. Keep current lifecycle; investigate only a concrete reproducible disappearing-effect case. |
| VERIFIED_NO_CHANGE | StudentFeatureLoader duplicate runtime load | Current loader normalizes resource identity and shares one promise; existing regression tests cover query-version dedupe, externally inserted scripts, and load failures. | No replacement required for the warning as stated. |

## Royal Ball WIP replacement on this branch

Replacement-only change in `js/royal-ball.js`:

1. Event gate now uses Firebase server-time offset.
2. Student RNG result no longer directly grants Coin/item or writes final `spin_history`.
3. One daily `pendingReward` proposal is stored under the existing Royal Ball limit node.
4. Ambiguous network failure re-reads the request before deciding whether the fee/limit can be rolled back.
5. Teacher gets an approve/reject review surface in the existing Royal Ball management view.
6. Approval uses a processing token and performs reward + deterministic history record + approved state in one root update.
7. Rejection does not grant an asset.
8. Regression tests were added in `tests/royal-ball-authority.test.cjs`.

### WIP blockers before merge

- Harden `royal_ball_limits` Rules so student may create exactly one immutable `pending` proposal for their own current daily attempt, cannot set `processing/approved/rejected`, cannot alter proposal fields after creation, and cannot delete an active request to bypass the state machine.
- Global `student_coins` self-write remains a system-wide authority hole; the Royal Ball entry fee is still a student transaction because replacing it safely requires the same economy migration as Store/tickets/conversion/rewards.
- Replace dynamically generated teacher request actions with non-inline event binding before merge.
- Add Firebase Rules emulator tests once a deploy/test harness exists; current repository test suite only parses Rules JSON and does not execute Rules semantics.

## Rules change policy used by this audit

No economic Rules were widened merely to eliminate `permission_denied`. No `daily_login`, `leaderboard_chest`, `royal_ball`, or `bellum_completion_reward` source was added to inventory allowlists. Broad Coin/ticket/offset/discount writes were not closed in isolation because current student callers still depend on those paths; doing so now would knowingly break Store, ticket, conversion, reward, and refund flows.
