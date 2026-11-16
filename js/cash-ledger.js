/* Cash requests: stable submission IDs and an atomic teacher debit receipt. */
(() => {
    'use strict';
    const read = async path => (await db.ref(path).once('value')).val();
    const safeAmount = n => Number.isSafeInteger(n) && n > 0 && n <= 999999999;
    const owner = request => String(request?.studentUsername || request?.username || '');
    // Transaction Safety Shield: never fall back to client-side balance writes.
    const requireWorker = () => {
        if(window.ECONOMY_SERVER_ENABLED!==true || typeof window.EconomyClient?.execute!=='function')
            throw Object.assign(Error('TRANSACTION_SHIELD_UNAVAILABLE'),{code:'TRANSACTION_SHIELD_UNAVAILABLE'});
    };
    const session = () => {
        const uid = firebase.auth().currentUser?.uid;
        if (!uid) throw Error('Phiên đăng nhập đã kết thúc.');
        return () => { if (firebase.auth().currentUser?.uid !== uid) throw Error('Tài khoản vừa thay đổi; đã dừng thao tác.'); return uid; };
    };
    function clearPending(key, id) {
        // Another tab may already have stored a newer request.
        if (JSON.parse(localStorage.getItem(key) || 'null')?.id === id) localStorage.removeItem(key);
    }
    async function approve(id, username, _getBaseMoney) {
        requireWorker();
        return window.EconomyClient.execute('cash_approve', {
            requestId:String(id), studentUsername:String(username)
        }, {slot:'cash-approve:'+id});
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
            throw Object.assign(Error('Phiên này chỉ được xem; không thể gửi yêu cầu đổi tiền.'),{code:'READ_ONLY_SESSION'});
        const uid = firebase.auth().currentUser?.uid;
        if(!uid || !safeAmount(payload.amount))throw Error('Yêu cầu không hợp lệ.');
        requireWorker();
        const assertSession=session();
        const storageKey='pending_cash_request_v3_'+uid;
        let pending;
        try{pending=JSON.parse(localStorage.getItem(storageKey)||'null');}
        catch(_){throw Error('Yêu cầu tiền mặt chưa xác nhận bị lỗi dữ liệu; cần đối soát.');}
        if(pending){
            // Read-only reconciliation; never replay a legacy Firebase .set().
            const recovered=await recoverPending(payload.studentUsername);
            assertSession();
            if(recovered)return recovered;
            if(pending.payload?.studentUsername!==payload.studentUsername||!pending.id)
                throw Error('Mã yêu cầu cũ không hợp lệ.');
            const resolved=await window.EconomyClient.execute('legacy_cash_recover', {
                requestId:String(pending.id),amount:String(pending.payload.amount)
            },{slot:'cash-recover'});
            assertSession();clearPending(storageKey,pending.id);
            if(resolved.recovered)return resolved;
        }
        const result=await window.EconomyClient.execute('cash_request',{
            amount:String(payload.amount)
        },{slot:'cash-request'});
        assertSession();return result;
    }
    const feedback = (label, task) => window.ServerActivity ? window.ServerActivity.run(label, task) : task();
    window.CashLedger = {
        approve: (...args) => feedback('Đang xác nhận duyệt tiền…', () => approve(...args)),
        submit: (...args) => feedback('Đang gửi yêu cầu đổi tiền…', () => submit(...args)),
        recoverPending: (...args) => feedback('Đang đối soát yêu cầu trước…', () => recoverPending(...args))
    };
})();
