# Production hardening: pending submission and redo / 2026-11-19

## Observed issue
A student redoing an exam regained primary access after a stale exam-finalizing lock was repaired, but a new `submission_submit` pending operation caused a subsequent read-only login. An uncertain HTTP response is **not** evidence that the submission failed.

## Backend API: `teacher_session_reconcile_operation`
Only verified teachers. Requires `studentUid`, `operationId`, `requestId`, `reason` (10–240 characters). Authenticated via Firebase ID token; student UID is rechecked against server profile. This is not a direct RTDB write by the browser.

The handler:
1. Reads the student's pending operation; supports **only** `submission_submit` / `year_review_activate`.
2. Reads an authoritative `economy_receipts/{uid}/{operationId}`; no receipt returns `unconfirmed` with **zero writes** (never create a synthetic cancelled receipt).
3. Verifies action + intent hash against pending record. A successful submission receipt must match `submissions/{key}` and `autoGradeAuthority.operationId`.
4. Rejects if any session `activeRequests` or `transition` exists.
5. Uses existing ETag/CAS `editSessionAccount` to remove **only the matched pending entry**; checks original action, hash, sessionId and nonce, records teacher, reason, timestamp, requestId and result for idempotent retry.

**Does not cancel or delete submissions, grade, Coin, inventory, exam sessions, receipts or active requests.** All unconfirmed outcomes are deliberately retained.

## Redo mechanism — design pending
- Redo has a unique `redoAttemptId`/revision; previous completed attempt remains immutable in an audit history.
- A redo request is prohibited until any outstanding `submission_submit` has a matching receipt, or is frozen into an explicit server-side resolution state after checking durable commit markers.
- On browser timeout, student resumes **same operationId**; do not generate a new operationId for the same attempt.
- On successful submit, atomically store completion marker keyed by attempt ID, operationId, persisted answer snapshot and receipt.
- On stale `finalizing` lease, server recovers the exam with CAS after checking current submission and active exam lock ownership; do not rewrite submitted exams as interrupted.
- Session transfer must only ignore **audited settled** operations, never unknown ones.

## Outstanding production gates
- Exercise real E2E tests on a test student account (failed network response after commit, duplicate submit, teacher redo while pending, lock expiry, active exam, cross-user teacher request).
- Verify RTDB deployed Rules exactly match intended rules; current supplied production snapshot is not proof of currently deployed Rules.
- Cancellation endpoint remains deliberately disabled (`OPERATION_NOT_CANCELLABLE`). A future safe cancel must fence the atomic commit, not simply flip pending.cancelled.
- The current `submission_submit` pending ID must be inspected **live**. Do not infer it is settled from an old database export or UI screenshot.

## Rollback
Preserve the prior worker version ID and GitHub commit. Rollback Worker does NOT reverse any Firebase changes. Deploy only after backup, rule validation, and test user confirmation.
