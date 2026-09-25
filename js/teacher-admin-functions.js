(function () {
    'use strict';

    function getFunctions() {
        if (typeof firebase === 'undefined' || typeof firebase.app !== 'function') {
  throw new Error('FIREBASE_NOT_READY');
        }
        const app = firebase.app();
        if (typeof app.functions !== 'function') {
  throw new Error('FIREBASE_FUNCTIONS_SDK_NOT_LOADED');
        }
        return app.functions('asia-southeast1');
    }

    async function call(name, payload) {
        const result = await getFunctions().httpsCallable(name)(payload || {});
        return result?.data || {};
    }

    window.TeacherAdminFunctions = Object.freeze({
        updateStudentPassword(uid, newPassword) {
  return call('updateStudentPassword', { uid, newPassword });
        },
        deleteStudentAuth(uid) {
  return call('deleteStudentAuth', { uid });
        },
        purgeLegacyPlaintextPasswords() {
  return call('purgeLegacyPlaintextPasswords');
        }
    });
})();
