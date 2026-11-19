# Teacher Session Administration — Worker integration contract

**Status:** Frontend is staged on a feature branch; **not active on server**. This is not a production deploy or a claim that a session can already be revoked.

## Placement

Teacher Settings `#tab-settings` → immediately after dynamically inserted `#nugDetailedGuideSetting`. UI: `js/teacher-session-admin.js`, stylesheet: `css/teacher-session-admin.css`, loaded by `teacher.html`.

## Existing functionality reused

Student `js/session-devices.js` uses `session_list`, `session_revoke`, `session_reconcile_operation` and listens to `account_access_accounts/$uid/signal`. Student `js/common.js` performs regular `state` checks and signs out when server validation fails. `js/economy-client.js` uses `session_ack_operation` and preserves pending operation IDs when results are uncertain. Do **not** replace or bypass those flows.

## Required new POST /account-access actions

Each request requires a valid Firebase bearer ID token for an authenticated, **currently verified teacher** and `clientVersion:3`. Check teacher authority **on Worker** from trusted Firebase user/profile state, not from request body or JavaScript flags. Enforce teacher-to-student scope if applicable, validate projectId, rate-limit, audit every admin action, reject unknown fields, and fail closed.

1. `teacher_session_list` request: `{studentUid}`. Response `{ok:true, sessions:[{id,primary,lastSeenAt}],pendingOperations:[{id,kind,status,cancellable}]}`. Return only metadata necessary for management. Do not reveal session secrets, bearer tokens, passwords, device fingerprints or raw payloads. The `cancellable` field MUST be computed by the Worker under the same state machine used by the cancellation endpoint.
2. `teacher_session_revoke` request: `{studentUid,sessionId,reason,requestId}`. Verify the session belongs to the student; reject already invalid or expired sessions idempotently; **block** revocation when an exam, active upload or unresolved economic transaction would be corrupted, or mark it revoke-pending until safe. Atomically mark target session invalid, adjust primary pointer/transition as required, advance `signal.revision` and write audit record. Never replace other active sessions' order or grant primary write permission to a read-only device implicitly. Return new status and revision.
3. `teacher_session_cancel_operation` request: `{studentUid,operationId,reason,requestId}`. Look up server-owned operation state; reject for any committed/debited/partially applied or unknown state unless an existing *atomic*, auditable compensation/reconciliation protocol explicitly supports it. Use compare-and-swap/transactional state transition before the commit boundary: `queued/reserved -> cancellation_requested -> cancelled` or return `not_cancellable/reconcile_required`. Persist an idempotent record keyed by `requestId`. Never delete operation records, delete quiz answers, erase uploads, reset time limits, refund or debit Coin, or modify inventory from the UI. Ensure an in-flight Worker checks cancellation at a safe point before committing. A cancellation request is **not** proof of cancellation.

## Rules and transaction safety

- No teacher write access directly to `account_access_accounts/$uid/sessions`, `signal` or any financial ledger solely for this feature. Server-side administrative writes use privileged credentials with audited operations; students may read only their own permitted metadata, as before.
- The existing Firebase RTDB Rules, deployed Worker, student session v3 checks and TSS must be updated **together** where necessary. Audit whether server endpoints already support these actions before implementing and deploying.
- Use long-lived idempotency keys for retries after uncertain HTTP 409/timeout and record action/actor/student/target/timestamp/reason/outcome without leaking credentials.
- Test with both `quan-ly-bai-tap` production and the test Firebase project/Worker in isolation. Never point test UI to the production account-access endpoint.
- A plain client-side logout is not revocation; the Worker must invalidate session authorization and advance signal. Existing student polling may take up to 10 seconds plus network latency to redirect; all server mutations must reject revoked sessions immediately, independent of the browser UI.

## Acceptance tests for Worker integration

1. Verified teacher lists own authorized students' sessions; student/unverified teacher cannot call the 3 new actions.
2. Teacher revokes one read-only session without affecting another; revocation invalidates server authorization and later student `state` check.
3. Teacher revokes primary session with no pending work, and all devices remain read-only until the documented safe primary transition.
4. Active exam, upload, pending Coin, purchase, assignment-extension and submission prevent unsafe termination; no partial write or loss of recovery data.
5. Cancellation of queued operation succeeds once; identical `requestId` retries return the same outcome.
6. Committed debit, inventory grant, and completed submission are never marked cancelled; reconciliation is offered instead.
7. Concurrent commit and cancel racing on the same operation have a single deterministic authoritative winner.
8. Worker down, unauthorized, malformed response, or timeout: UI reports failure and makes no local permission change.
9. Verify the panel appears below `#nugDetailedGuideSetting` in both desktop and mobile teacher layouts. Other teacher settings and student UI unchanged.

**Deployment order:** implement/test Worker + safety checks → Firebase Rules if required → deploy to test Worker → manual browser E2E → confirm backward compatibility and backups → production Worker → enable/merge frontend after approval. Frontend in this branch has no direct Firebase writes.
