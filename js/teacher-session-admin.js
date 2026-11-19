/* Teacher-only UI. All authorization, revocation and cancellation must happen in Account Access Worker. */
(() => {
    'use strict';
    if (!/(?:^|\/)teacher\.html$/.test(location.pathname)) return;

    const ACTIONS = Object.freeze({
        list: 'teacher_session_list',
        revoke: 'teacher_session_revoke',
        cancel: 'teacher_session_cancel_operation'
    });
    const text = (tag, value, className) => {
        const el = document.createElement(tag);
        el.textContent = String(value ?? '');
        if (className) el.className = className;
        return el;
    };
    let root, select, status, results, reason, busy = false, sequence = 0;

    function report(message, error = false) {
        status.textContent = message;
        status.dataset.error = error ? 'true' : 'false';
    }

    function explain(error) {
        const code = String(error?.message || error?.code || '');
        if (/^(ACCESS_NOT_ENABLED|ACCESS_UNAVAILABLE|UNKNOWN_ACTION|UNSUPPORTED_ACTION|NOT_IMPLEMENTED)$/.test(code)) {
            return 'Worker chưa hỗ trợ chức năng giáo viên quản lý phiên. Chưa thay đổi bất kỳ phiên hay giao dịch nào.';
        }
        const known = {
            PERMISSION_DENIED: 'Tài khoản hiện tại không có quyền quản trị phiên này.',
            ACCESS_CHANGED: 'Phiên giáo viên vừa thay đổi. Vui lòng đăng nhập lại.',
            DEVICE_VERIFICATION_REQUIRED: 'Phiên xác thực đã hết hiệu lực. Hãy đăng nhập lại.',
            SESSION_EXAM_ACTIVE: 'Học sinh đang thi. Cần chờ hoàn thành hoặc đối soát bài thi trước khi xử lý.',
            SESSION_PENDING_OPERATIONS: 'Còn giao dịch chưa rõ kết quả. Phải đối soát trước khi ngắt phiên.',
            SESSION_OPERATION_UNCONFIRMED: 'Chưa xác định được giao dịch đã ghi hay chưa. Không được hủy trực tiếp.',
            OPERATION_ALREADY_COMMITTED: 'Giao dịch đã ghi thành công. Không thể hủy; cần xử lý bằng giao dịch đối soát riêng.',
            OPERATION_NOT_CANCELLABLE: 'Giao dịch đã qua điểm có thể dừng an toàn. Chưa thay đổi dữ liệu.',
            SHIELD_GROUP_PAUSED: 'Nhóm giao dịch này đang tạm khóa để kiểm tra an toàn.'
        };
        return known[code] || 'Máy chủ không xác nhận thao tác. Giữ nguyên trạng thái, tải lại danh sách để kiểm tra.';
    }

    function authorized() {
        return window.isVerifiedTeacher === true &&
            !!firebase?.auth?.().currentUser &&
            typeof window.StudentAccountAccess?.call === 'function';
    }

    function setBusy(value) {
        busy = value;
        root.setAttribute('aria-busy', String(value));
        root.querySelectorAll('button, select, textarea').forEach(el => { el.disabled = value; });
    }

    async function call(action, payload) {
        if (!authorized()) throw Error('PERMISSION_DENIED');
        // The Worker must independently verify teacher identity and student ownership.
        return window.StudentAccountAccess.call(action, payload);
    }

    function clearResults() {
        sequence++;
        results.replaceChildren();
    }

    async function students() {
        if (busy) return;
        if (!authorized()) { report('Cần xác thực tài khoản giáo viên trước khi xem các phiên.', true); return; }
        setBusy(true);
        report('Đang đọc danh sách học sinh…');
        try {
            if (typeof window.getDB !== 'function') throw Error('ACCESS_UNAVAILABLE');
            const records = await window.getDB('users');
            if (!Array.isArray(records)) throw Error('ACCESS_UNAVAILABLE');
            const found = records
                .filter(row => row && row.role === 'student' && String(row._fbKey || '').trim())
                .sort((a, b) => String(a.name || a.username || '').localeCompare(String(b.name || b.username || ''), 'vi'));
            const previous = select.value;
            select.replaceChildren(new Option('Chọn học sinh…', ''));
            for (const student of found) {
                const id = String(student._fbKey);
                const name = String(student.name || student.username || id);
                select.append(new Option(name + ' (' + String(student.username || id) + ')', id));
            }
            if (found.some(row => String(row._fbKey) === previous)) select.value = previous;
            clearResults();
            report('Có ' + found.length + ' học sinh. Chọn một người rồi bấm Xem phiên.');
        } catch (error) {
            report(explain(error), true);
        } finally {
            setBusy(false);
        }
    }

    function ticket(action, studentUid, targetId) {
        const key = 'teacher-session-action:v1:' + action + ':' + studentUid + ':' + targetId;
        try {
            let id = sessionStorage.getItem(key);
            if (!id) { id = crypto.randomUUID(); sessionStorage.setItem(key, id); }
            return {key, id};
        } catch (_) {
            return {key: null, id: crypto.randomUUID()};
        }
    }

    async function mutate(action, targetId, description) {
        const studentUid = select.value;
        if (!studentUid || !targetId || busy) return;
        const rationale = reason.value.trim();
        if (rationale.length < 10 || rationale.length > 240) {
            report('Vui lòng nhập lý do từ 10 đến 240 ký tự trước khi xử lý.', true);
            reason.focus();
            return;
        }
        // Reject the operation if the application's safe confirmation UI is unavailable.
        if (typeof window.AppDialog?.confirm !== 'function') {
            report('Chưa tải được hộp xác nhận an toàn. Không gửi yêu cầu.', true);
            return;
        }
        const accepted = await window.AppDialog.confirm(description + '\n\nHọc sinh: ' +
            select.options[select.selectedIndex].text + '\nLý do: ' + rationale);
        if (!accepted || studentUid !== select.value) return;
        const request = ticket(action, studentUid, targetId);
        setBusy(true);
        report('Đang yêu cầu máy chủ kiểm tra và xử lý an toàn…');
        try {
            const payload = {studentUid, reason: rationale, requestId: request.id};
            if (action === ACTIONS.revoke) payload.sessionId = targetId;
            else payload.operationId = targetId;
            const response = await call(action, payload);
            if (request.key) sessionStorage.removeItem(request.key);
            report(response.status === 'cancel_requested' ?
                'Máy chủ đã ghi nhận yêu cầu dừng. Giao dịch chưa được xác nhận là đã hủy; hãy kiểm tra lại.' :
                'Máy chủ đã trả kết quả. Hãy kiểm tra danh sách cập nhật để xác nhận trạng thái cuối.');
        } catch (error) {
            // Preserve requestId if the response was lost; retries must be idempotent.
            report(explain(error), true);
        } finally {
            setBusy(false);
        }
        await sessions();
    }

    function renderSession(row, index) {
        const id = String(row?.id || '');
        if (!id) return null;
        const item = text('li', '', 'teacher-session-row');
        const detail = text('div', '', 'teacher-session-row-text');
        detail.append(text('strong', 'Phiên ' + (index + 1) + (row.primary ? ' · Phiên chính' : ' · Chỉ xem')));
        const last = row.lastSeenAt ? new Date(row.lastSeenAt).toLocaleString('vi-VN') : 'chưa có';
        detail.append(text('span', 'Hoạt động gần nhất: ' + last));
        const revoke = text('button', 'Buộc đăng xuất');
        revoke.type = 'button';
        revoke.addEventListener('click', () => void mutate(
            ACTIONS.revoke, id, 'Buộc đăng xuất đúng phiên này? Mọi giao dịch chưa chốt phải được máy chủ bảo toàn để đối soát.'
        ));
        item.append(detail, revoke);
        return item;
    }

    function renderOperation(row) {
        const id = String(row?.id || '');
        if (!id) return null;
        const item = text('li', '', 'teacher-session-row');
        const detail = text('div', '', 'teacher-session-row-text');
        detail.append(text('strong', String(row.kind || 'Giao dịch') + ' · ' + String(row.status || 'chờ xử lý')));
        detail.append(text('span', 'Mã giao dịch: ' + id));
        item.append(detail);
        if (row.cancellable === true) {
            const cancel = text('button', 'Yêu cầu dừng an toàn');
            cancel.type = 'button';
            cancel.addEventListener('click', () => void mutate(
                ACTIONS.cancel, id, 'Yêu cầu Worker dừng giao dịch trước điểm ghi dữ liệu? Nếu đã chốt, Worker phải từ chối và yêu cầu đối soát.'
            ));
            item.append(cancel);
        } else {
            item.append(text('span', 'Chỉ được đối soát, không thể hủy trực tiếp.', 'teacher-session-warning'));
        }
        return item;
    }

    async function sessions() {
        const studentUid = select.value;
        clearResults();
        if (!studentUid || busy) return;
        setBusy(true);
        report('Đang lấy trạng thái từ Worker…');
        const current = sequence;
        try {
            const response = await call(ACTIONS.list, {studentUid});
            if (current !== sequence || studentUid !== select.value) return;
            if (!Array.isArray(response.sessions) || !Array.isArray(response.pendingOperations)) {
                throw Error('UNSUPPORTED_ACTION');
            }
            const title = text('h4', 'Thiết bị đang đăng nhập');
            const list = text('ul', '', 'teacher-session-list');
            response.sessions.forEach((row, index) => {
                const node = renderSession(row, index);
                if (node) list.append(node);
            });
            if (!list.childElementCount) list.append(text('li', 'Không có phiên đang hoạt động.'));
            const opTitle = text('h4', 'Giao dịch đang xử lý / chờ đối soát');
            const operations = text('ul', '', 'teacher-session-list');
            response.pendingOperations.forEach(row => {
                const node = renderOperation(row);
                if (node) operations.append(node);
            });
            if (!operations.childElementCount) operations.append(text('li', 'Không có giao dịch chờ được máy chủ báo cáo.'));
            results.append(title, list, opTitle, operations);
            report('Danh sách lấy từ Worker. Thao tác chỉ có hiệu lực sau khi máy chủ xác nhận.');
        } catch (error) {
            report(explain(error), true);
        } finally {
            setBusy(false);
        }
    }

    function mount() {
        const guide = document.getElementById('nugDetailedGuideSetting');
        if (!guide || document.getElementById('teacherSessionAdministration')) return false;
        root = text('section', '', 'card teacher-session-admin-card');
        root.id = 'teacherSessionAdministration';
        const heading = text('h3', '🛡️ Quản lý thiết bị đăng nhập & giao dịch');
        const description = text('p', 'Giáo viên có thể buộc đăng xuất một phiên học sinh hoặc yêu cầu Worker dừng giao dịch chưa chốt. Không xóa dữ liệu giao dịch hay bài thi từ trình duyệt.');
        const selectLabel = text('label', 'Học sinh');
        select = document.createElement('select');
        select.id = 'teacherSessionStudent';
        select.append(new Option('Bấm Tải học sinh để bắt đầu…', ''));
        selectLabel.append(select);
        const actions = text('div', '', 'teacher-session-actions');
        const loadStudents = text('button', 'Tải học sinh');
        const loadSessions = text('button', 'Xem phiên và giao dịch');
        loadStudents.type = loadSessions.type = 'button';
        loadStudents.addEventListener('click', () => void students());
        loadSessions.addEventListener('click', () => void sessions());
        select.addEventListener('change', clearResults);
        actions.append(loadStudents, loadSessions);
        const reasonLabel = text('label', 'Lý do xử lý (bắt buộc)');
        reason = document.createElement('textarea');
        reason.id = 'teacherSessionReason';
        reason.maxLength = 240;
        reason.rows = 2;
        reason.placeholder = 'Nêu rõ lý do (ít nhất 10 ký tự)…';
        reasonLabel.append(reason);
        status = text('p', 'Chỉ hoạt động khi Worker hỗ trợ API quản trị và xác thực quyền giáo viên.', 'teacher-session-status');
        status.setAttribute('role', 'status');
        status.setAttribute('aria-live', 'polite');
        results = text('div', '', 'teacher-session-results');
        root.append(heading, description, selectLabel, actions, reasonLabel, status, results);
        guide.insertAdjacentElement('afterend', root);
        return true;
    }

    function init() {
        if (mount()) return;
        const settings = document.getElementById('tab-settings');
        if (!settings) return;
        const observer = new MutationObserver(() => {
            if (mount()) observer.disconnect();
        });
        observer.observe(settings, {childList: true, subtree: true});
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, {once: true});
    else init();
})();