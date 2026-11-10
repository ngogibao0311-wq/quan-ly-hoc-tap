/* Cash requests: stable submission IDs and an atomic teacher debit receipt. */
(() => {
    'use strict';
    const read = async path => (await db.ref(path).once('value')).val();
    const safeAmount = n => Number.isSafeInteger(n) && n > 0 && n <= 999999999;
    const owner = request => String(request?.studentUsername || request?.username || '');
    function requireTransactionShield() {
        if (window.ECONOMY_SERVER_ENABLED !== true || typeof window.EconomyClient?.execute !== 'function') {
            const error = Error('TRANSACTION_SHIELD_UNAVAILABLE');
            error.code = 'TRANSACTION_SHIELD_UNAVAILABLE';
            throw error;
        }
    }
    const session = () => {
        const uid = firebase.auth().currentUser?.uid;
        if (!uid) throw Error('Phiên đăng nhập đã kết thúc.');
        return () => { if (firebase.auth().currentUser?.uid !== uid) throw Error('Tài khoản vừa thay đổi; đã dừng thao tác.'); return uid; };
    };
    function clearPending(key, id) {
        // Another tab may already have stored a newer request.
        if (JSON.parse(localStorage.getItem(key) || 'null')?.id === id) localStorage.removeItem(key);
    }
    // Fail closed: legacy direct Firebase writes cannot bypass the Worker.
    async function approve(id, username, _getBaseMoney) {
        requireTransactionShield();
        return window.EconomyClient.execute('cash_approve', {
            requestId: String(id), studentUsername: String(username)
        }, {slot: 'cash-approve:' + id});
    }
    async function recoverPending(username) {
        const uid = firebase.auth().currentUser?.uid;
        if (!uid) return null;
        const assertSession = session();
        if (window.StudentAccountAccess && !window.StudentAccountAccess.canWrite()) return null;
        if (window.ECONOMY_SERVER_ENABLED === true) {
            const resumed = await window.EconomyClient.resume('cash-request');
            assertSession();
            if (resumed) {
                if (resumed.action !== 'cash_request') throw Error('Mã yêu cầu tiền mặt không khớp.');
                return {...resumed.result, recovered:true};
            }
        }
        const key = 'pending_cash_request_v3_' + uid;
        const pending = JSON.parse(localStorage.getItem(key) || 'null');
        if (!pending) return null;
        if (pending.payload?.studentUsername !== username || !pending.id) throw Error('Mã yêu cầu đang chờ không hợp lệ.');
        const existing = await read('cash_requests/' + pending.id);
        assertSession();
        if (!existing) return null;
        if (owner(existing) !== username || existing.amount !== pending.payload.amount) throw Error('Mã yêu cầu không khớp.');
        clearPending(key, pending.id);
        return { recovered: true, amount: existing.amount };
    }
    async function submit(payload) {
        if (window.StudentAccountAccess && !window.StudentAccountAccess.canWrite())
            throw Object.assign(Error('Phiên này chỉ được xem; không thể gửi yêu cầu đổi tiền.'), {code:'READ_ONLY_SESSION'});
        const uid = firebase.auth().currentUser?.uid;
        if (!uid || !safeAmount(payload.amount)) throw Error('Yêu cầu không hợp lệ.');
        requireTransactionShield();
        const assertSession = session();
        const storageKey = 'pending_cash_request_v3_' + uid;
        const pending = JSON.parse(localStorage.getItem(storageKey) || 'null');
        if (pending) {
            // Read-only reconciliation of legacy pending requests; never recreate
            // an old Firebase write when the Worker is unavailable.
            const recovered = await recoverPending(payload.studentUsername);
            assertSession();
            if (recovered) return recovered;
            if (pending.payload?.studentUsername !== payload.studentUsername || !pending.id)
                throw Error('Mã yêu cầu cũ không hợp lệ.');
            const resolved = await window.EconomyClient.execute('legacy_cash_recover', {
                requestId:String(pending.id), amount:String(pending.payload.amount)
            }, {slot:'cash-recover'});
            assertSession();
            clearPending(storageKey,pending.id);
            if (resolved.recovered) return resolved;
        }
        const result = await window.EconomyClient.execute('cash_request', {
            amount:String(payload.amount)
        }, {slot:'cash-request'});
        assertSession();
        return result;
    }
    const feedback = (label, task) => window.ServerActivity ? window.ServerActivity.run(label, task) : task();
    window.CashLedger = {
        approve: (...args) => feedback('Đang xác nhận duyệt tiền…', () => approve(...args)),
        submit: (...args) => feedback('Đang gửi yêu cầu đổi tiền…', () => submit(...args)),
        recoverPending: (...args) => feedback('Đang đối soát yêu cầu trước…', () => recoverPending(...args))
    };
})();
