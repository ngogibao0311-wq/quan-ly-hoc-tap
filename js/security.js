/* Compatibility API only. Authorization belongs to Worker/Auth/Rules.
 * Opening DevTools or resizing must never destroy a student's work. */
(() => {
    'use strict';
    const VERSION = '4.4.5-observer-only';
    function resolvePageRole() {
        const role = String(window.__APP_PAGE_ROLE__ || document.documentElement?.dataset?.appRole || document.body?.dataset?.appRole || '').trim().toLowerCase();
        if (role === 'teacher' || role === 'student') return role;
        const title = String(document.title || '').toLowerCase();
        if (title.includes('giáo viên') || document.querySelector('#tab-manage-students')) return 'teacher';
        if (title.includes('học sinh') || document.querySelector('#studentName')) return 'student';
        return 'unknown';
    }
    function getTeacherVerificationState() {
        return window.isVerifiedTeacher === true ? 'verified' : String(window.__teacherSecurityVerificationState || 'pending').trim().toLowerCase();
    }
    // These describe the UI only; callers must not use them to authorize a write.
    function isVerifiedTeacher() { return resolvePageRole() === 'teacher' && window.isVerifiedTeacher === true && getTeacherVerificationState() === 'verified'; }
    function isStudentPage() { return resolvePageRole() === 'student'; }
    function kickUser() { return false; }
    function probeDevToolsNow() { return false; }
    function getState() {
        return {version:VERSION,role:resolvePageRole(),verifiedTeacher:isVerifiedTeacher(),
            teacherVerificationState:getTeacherVerificationState(),devtoolsLikelyOpen:false,
            dimensionHits:0,lastReason:'',lastMetrics:null,config:Object.freeze({enforcement:false})};
    }
    window.SecurityGuard = Object.freeze({version:VERSION,resolvePageRole,getTeacherVerificationState,
        isVerifiedTeacher,isStudentPage,kickUser,probeDevToolsNow,getState});
})();