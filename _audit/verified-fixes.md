# Verified replacements applied — 2026-09-25

- Plaintext password mirroring removed from teacher account/student account flows. Student password mutation/deletion is delegated to callable Admin SDK functions.
- Unknown login roles no longer fall through to the student page; orphan Auth sessions are signed out.
- `question_bank` legacy read removed; only canonical `questionBank` remains.
- Sensitive economic-node reads restricted to teacher globally and owner at `$username`.
- Hội Họa weighted config must total 100; per-user vote usage is bounded by `maxVotes` (default 3).
- `store_purchase_ops` may recover `refund_pending -> failed_refunded`.
- Client writes cannot create/update `users/*/password`; backend purge helper provided for legacy plaintext.

Deliberately **not** whitelisted: `daily_login`, `leaderboard_chest`, `royal_ball`, `bellum_completion_reward`, `hoihoa_season`, `hoihoa_runner_up` inventory sources. Those flows are not made trustworthy merely by allowing their client writes.
