'use strict';

const { onCall, HttpsError } = require('firebase-functions/v2/https');
const admin = require('firebase-admin');

if (!admin.apps.length) admin.initializeApp();
const db = admin.database();

const REGION = 'asia-southeast1';

function normalizeText(value) {
  return String(value ?? '').trim();
}

function passwordPolicyError(password, username = '') {
  const value = String(password ?? '');
  const normalizedUsername = normalizeText(username).toLowerCase();
  if (value.length < 10) return 'Mật khẩu phải có ít nhất 10 ký tự.';
  if (value.length > 128) return 'Mật khẩu tối đa 128 ký tự.';
  if (/\s/.test(value)) return 'Mật khẩu không được chứa khoảng trắng.';
  if (!/[a-z]/.test(value)) return 'Mật khẩu phải có ít nhất 1 chữ thường.';
  if (!/[A-Z]/.test(value)) return 'Mật khẩu phải có ít nhất 1 chữ hoa.';
  if (!/\d/.test(value)) return 'Mật khẩu phải có ít nhất 1 chữ số.';
  if (!/[^A-Za-z0-9]/.test(value)) return 'Mật khẩu phải có ít nhất 1 ký tự đặc biệt.';
  if (normalizedUsername && value.toLowerCase().includes(normalizedUsername)) {
    return 'Mật khẩu không được chứa tên đăng nhập.';
  }
  return '';
}

async function requireTeacher(request) {
  if (!request.auth?.uid) throw new HttpsError('unauthenticated', 'AUTH_REQUIRED');
  const snap = await db.ref(`users/${request.auth.uid}`).once('value');
  const user = snap.val();
  if (!user || user.role !== 'teacher' || user.isLocked === true) {
    throw new HttpsError('permission-denied', 'TEACHER_REQUIRED');
  }
  return user;
}

async function requireManagedStudent(uid) {
  const targetUid = normalizeText(uid);
  if (!targetUid) throw new HttpsError('invalid-argument', 'TARGET_UID_REQUIRED');
  const snap = await db.ref(`users/${targetUid}`).once('value');
  const user = snap.val();
  if (!user || user.role !== 'student') {
    throw new HttpsError('not-found', 'STUDENT_NOT_FOUND');
  }
  return { uid: targetUid, user };
}

exports.updateStudentPassword = onCall({ region: REGION }, async request => {
  const actor = await requireTeacher(request);
  const { uid, user } = await requireManagedStudent(request.data?.uid);
  const newPassword = String(request.data?.newPassword ?? '');
  const error = passwordPolicyError(newPassword, user.username);
  if (error) throw new HttpsError('invalid-argument', error);

  await admin.auth().updateUser(uid, { password: newPassword });
  // Password is never mirrored back to RTDB. Remove legacy plaintext if present.
  await db.ref(`users/${uid}/password`).remove();

  await db.ref('teacher_security_audit').push({
    type: 'student_password_changed', targetUid: uid,
    targetUsername: normalizeText(user.username),
    actorUid: request.auth.uid, actorUsername: normalizeText(actor.username),
    createdAt: admin.database.ServerValue.TIMESTAMP
  });
  return { ok: true };
});

exports.deleteStudentAuth = onCall({ region: REGION }, async request => {
  const actor = await requireTeacher(request);
  const { uid, user } = await requireManagedStudent(request.data?.uid);
  await admin.auth().deleteUser(uid);
  await db.ref('teacher_security_audit').push({
    type: 'student_auth_deleted', targetUid: uid,
    targetUsername: normalizeText(user.username),
    actorUid: request.auth.uid, actorUsername: normalizeText(actor.username),
    createdAt: admin.database.ServerValue.TIMESTAMP
  });
  return { ok: true };
});

exports.purgeLegacyPlaintextPasswords = onCall({ region: REGION }, async request => {
  await requireTeacher(request);
  const snap = await db.ref('users').once('value');
  const updates = {};
  snap.forEach(child => {
    if (child.child('password').exists()) updates[`${child.key}/password`] = null;
  });
  if (Object.keys(updates).length) await db.ref('users').update(updates);
  return { ok: true, removed: Object.keys(updates).length };
});

// Existing scheduled retention function remains the single implementation.
Object.assign(exports, require('./history-retention-function'));
