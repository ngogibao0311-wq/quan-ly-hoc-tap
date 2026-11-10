/* Manual adjustments: receipt, balance, audit and notification commit together. */
(() => {
    'use strict';
    const paths = { coin: 'student_coins', ticket: 'student_bonus_tickets', money: 'student_money_offset' };
    const units = { coin: 'Coin', ticket: 'Vé', money: 'đ' };
    function requireTransactionShield() {
        if (window.ECONOMY_SERVER_ENABLED !== true || typeof window.EconomyClient?.execute !== 'function') {
            const error = Error('TRANSACTION_SHIELD_UNAVAILABLE');
            error.code = 'TRANSACTION_SHIELD_UNAVAILABLE';
            throw error;
        }
    }
    const read = async path => (await db.ref(path).once('value')).val();
    const batchLock = task => typeof navigator !== 'undefined' && navigator.locks
        ? navigator.locks.request('teacher-penalty-batch', task) : Promise.resolve().then(task);
    async function batch(signature, recipients) {
        return batchLock(() => {
        const key = `teacher_penalty_pending_${firebase.auth().currentUser.uid}`;
        let saved; try { saved = JSON.parse(localStorage.getItem(key)); } catch (_) { }
        if (saved && saved.signature !== signature) throw Error('Có đợt trừ tài sản chưa đối soát. Hãy hoàn tất đợt cũ với cùng học sinh, loại, số lượng và lý do trước.');
        if (!saved) {
            saved = { signature, ids: Object.fromEntries(recipients.map(u => [u, db.ref('teacher_money_operations').push().key])) };
            localStorage.setItem(key, JSON.stringify(saved));
        }
        const expected = JSON.stringify(saved);
        return { ids: saved.ids, finish: () => batchLock(() => {
            if (localStorage.getItem(key) === expected) localStorage.removeItem(key);
        }) };
        });
    }
    // Safety Shield: permissions, balance checks and commit must be atomic in Worker.
    async function commit(options) {
        const { id, username, type, delta, reason, originalId = '' } = options;
        const ticketAdjustment = options.kind === 'ticket_adjust';
        if (!id || !paths[type] || !Number.isSafeInteger(delta) || !delta ||
            typeof reason !== 'string' || !reason.trim()) throw Error('Giao dịch không hợp lệ');
        if (ticketAdjustment && (type !== 'ticket' || originalId)) throw Error('Điều chỉnh vé không hợp lệ');
        requireTransactionShield();
        if (ticketAdjustment) return window.EconomyClient.execute('teacher_tickets', {
            studentUsername:String(username), mode:delta>0?'add':'sub',
            amount:String(Math.abs(delta))
        }, {slot:'teacher-tickets:'+username});
        return window.EconomyClient.execute('teacher_adjust', {
            ledgerId:String(id), studentUsername:String(username), type:String(type),
            delta:String(delta), reason:String(reason), originalId:String(originalId||'none')
        }, {slot:'teacher-ledger:'+id});
    }
    const ticketActions = new Map();
    async function adjustTickets({ username, mode, amount, name = username }) {
        if (!username || !['add', 'sub'].includes(mode) || !Number.isSafeInteger(amount) || amount <= 0 || amount > 9999) throw Error('Số vé điều chỉnh không hợp lệ');
        const key = `teacher_ticket_pending_${firebase.auth().currentUser.uid}_${username}`;
        if (ticketActions.has(key)) return ticketActions.get(key);
        const run = async () => {
            const signature = JSON.stringify({ username, mode, amount });
            let saved;
            try { saved = JSON.parse(localStorage.getItem(key)); } catch (_) { }
            if (saved && saved.signature !== signature) throw Error('Có lần điều chỉnh vé chưa được xác nhận. Hãy thử lại cùng học sinh, thao tác và số vé trước để đối soát.');
            if (!saved) {
                saved = { signature, id: db.ref('teacher_money_operations').push().key };
                localStorage.setItem(key, JSON.stringify(saved));
            }
            const expected = JSON.stringify(saved);
            const finish = () => { if (localStorage.getItem(key) === expected) localStorage.removeItem(key); };
            try {
                const receipt = await commit({ id: saved.id, username, type: 'ticket', kind: 'ticket_adjust', delta: mode === 'add' ? amount : -amount, reason: mode === 'add' ? 'Giáo viên cộng vé thủ công' : 'Giáo viên trừ vé thủ công', name });
                finish();
                return receipt;
            } catch (error) {
                // This failure is certain and precedes any write. Other failures keep the ID for reconciliation.
                if (error.code === 'TICKET_INSUFFICIENT' || error.code === 'LEDGER_BALANCE_LIMIT') finish();
                throw error;
            }
        };
        const work = typeof navigator !== 'undefined' && navigator.locks
            ? navigator.locks.request(key, run) : run();
        ticketActions.set(key, work);
        try { return await work; } finally { ticketActions.delete(key); }
    }
    const counterBusy = new Set();
    async function counter(id) {
        if (counterBusy.has(id)) return;
        counterBusy.add(id);
        try {
            const original = await read(`teacher_money_operations/${id}`);
            if (!original || original.kind !== 'penalty') throw Error('Chỉ đối ứng khoản trừ được tạo bằng cơ chế mới');
            if (await read(`teacher_money_operations/counter_${id}`)) { await AppDialog.alert('Khoản này đã được đối ứng. Không cộng thêm.'); return; }
            if (!await AppDialog.confirm(`Hoàn lại ${(-original.delta).toLocaleString('vi-VN')} ${units[original.type]} cho ${original.username}?\nGiao dịch gốc: ${id}\nKhoản gốc vẫn được giữ trong lịch sử; chỉ được đối ứng một lần.`)) return;
            if (!await reauthenticateTeacherForDangerousAction('tạo giao dịch đối ứng')) return;
            await commit({ id: `counter_${id}`, username: original.username, type: original.type, delta: -original.delta, reason: 'Hoàn lại khoản trừ thủ công ' + id, originalId: id });
            await AppDialog.alert('Đã ghi giao dịch đối ứng và gửi thư thông báo.');
            await TransactionHistory.loadTeacherLogs();
        } catch (e) { await AppDialog.alert(e.message); } finally { counterBusy.delete(id); }
    }
    function recoveryControl() {
        const submit = document.getElementById('penaltySubmitButton');
        if (!submit) return;
        const button = document.createElement('button'); button.type = 'button';
        button.textContent = 'Khôi phục đợt trừ chưa hoàn tất';
        button.style.cssText = 'margin:10px 0;padding:10px 14px';
        button.onclick = async () => {
            try {
                const pending = JSON.parse(localStorage.getItem(`teacher_penalty_pending_${firebase.auth().currentUser.uid}`) || 'null');
                if (!pending) { await AppDialog.alert('Không có đợt trừ đang chờ trên trình duyệt này.'); return; }
                const value = JSON.parse(pending.signature);
                document.getElementById('penaltyType').value = value.type;
                document.getElementById('penaltyAmount').value = value.amount;
                document.getElementById('penaltyReason').value = value.reason;
                const select = document.getElementById('penaltyTargetStudent');
                for (const option of select.options) option.selected = value.recipients.includes(option.value);
                const label = document.getElementById('penaltyTargetStudent_displayText');
                if (label) label.textContent = value.recipients.join(', ');
                await AppDialog.alert('Đã khôi phục thông tin đợt chờ. Bấm xác nhận để đối soát với các mã cũ; khoản đã ghi thành công sẽ không bị trừ lại.');
            } catch (e) { await AppDialog.alert('Không khôi phục được: ' + e.message); }
        };
        submit.after(button);
    }
    window.TeacherLedger = { batch, commit, counter, adjustTickets };
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', recoveryControl, { once: true }); else recoveryControl();
})();
