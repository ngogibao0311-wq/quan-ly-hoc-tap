/* Display only. Eligibility, random rewards and claiming belong to the server. */
(() => {
    'use strict';
    const protocol='1', busy=new Set();
    let uid=null, ref=null, rows={}, loadError=false;
    const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
    const yearOK=v=>/^20\d{2}$/.test(String(v));
    const refresh=()=>window.renderStudentInbox?.();
    function watch() {
        const current=firebase.auth().currentUser?.uid;
        if(current===uid&&ref)return;
        ref?.off();ref=null;rows={};uid=current||null;loadError=false;
        if(!uid)return;
        const expected=uid;
        ref=db.ref('oct20_inbox/'+uid);
        ref.on('value',snapshot=>{
            if(uid!==expected)return;
            rows=snapshot.val()||{};loadError=false;refresh();
        },()=>{if(uid===expected){loadError=true;refresh();}});
    }
    function rewardText(result) {
        const r=result?.rewards;
        if(!r)return 'Quà đang chờ được kiểm tra.';
        return `💞 ${Number(r.love)} xu tình yêu · 🎫 ${Number(r.tickets)} vé quay · 🪙 ${Number(r.coins).toLocaleString('vi-VN')} Coin · 💵 ${Number(r.money)} tiền lộ trình · 🎟️ 1 mã giảm ${Number(r.discount)}%`;
    }
    function renderLetter(year) {
        if(!yearOK(year))return '';
        const row=rows[year], received=row?.status==='claimed'&&row.result;
        const pending=busy.has(uid+':'+year);
        const result=received?`<p>${esc(rewardText(row.result))}</p><p>Mã giảm giá hết hạn: <strong>${esc(new Date(row.result.discountExpiry).toLocaleString('vi-VN',{timeZone:'Asia/Ho_Chi_Minh'}))}</strong> (giờ Việt Nam). Dùng một lần cho vật phẩm Coin hợp lệ; không thanh lý thành Coin.</p>`
            :'<p>💞 Xu tình yêu, vé quay may mắn, Coin, tiền lộ trình và một mã giảm giá đang chờ bạn.</p><p>Mã giảm giá có hạn <strong>72 giờ từ lúc nhận</strong>.</p>';
        return `<student-inbox-letter class="ui-theme-immune" subject="Quà tặng 20/10/${esc(year)}"><p slot="message">💝 Chúc bạn một ngày 20/10 thật vui!</p><div slot="gift" aria-live="polite">${result}${loadError?'<p>Chưa tải được trạng thái quà. Thử nhận lại để máy chủ kiểm tra.</p>':''}</div><div slot="actions"><button type="button" ${received||pending?'disabled':''} aria-busy="${pending}" onclick="window.Oct20Gift.claim('${year}')" style="width:100%;padding:12px;border:1px solid #be185d;border-radius:10px;background:${received?'#fce7f3':'#be185d'};color:${received?'#831843':'white'};font:700 15px/1.5 inherit;cursor:${received||pending?'default':'pointer'}">${received?'✓ Đã nhận quà':pending?'Đang kiểm tra quà…':'🎁 Nhận quà 20/10'}</button></div></student-inbox-letter>`;
    }
    function missingLetters(messages) {
        watch();
        const seen=new Set(messages.filter(m=>m?.giftType==='oct20_bundle'&&m.ownerUid===uid).map(m=>String(m.eventYear)));
        return Object.keys(rows).filter(year=>yearOK(year)&&!seen.has(year)).sort().reverse().map(renderLetter).join('');
    }
    async function claim(year) {
        watch();
        if(!uid||!yearOK(year))return;
        const owner=uid, slot=owner+':'+year;
        if(busy.has(slot))return;
        busy.add(slot);refresh();
        try {
            if(window.ECONOMY_SERVER_ENABLED!==true||!window.EconomyClient||!window.ServerActivity||!window.AppDialog)throw Error('Hãy cập nhật trang và chờ kết nối trước khi nhận quà.');
            const result=await window.ServerActivity.run('Đang mở quà 20/10…',async()=>{
                const activated=await window.EconomyClient.execute('oct20_activate',{protocol},{slot:'oct20:activate',feedback:false});
                if(activated.protocol!==protocol||!activated.activated)throw Error('Cần cập nhật trang để nhận quà.');
                return window.EconomyClient.execute('oct20_claim',{year:String(year),protocol},{slot:'oct20:'+year,feedback:false});
            });
            if(firebase.auth().currentUser?.uid!==owner)return;
            if(!result || String(result.year)!==String(year) || !result.rewards ||
                ['love','tickets','coins','money','discount'].some(k=>!Number.isSafeInteger(result.rewards[k])||result.rewards[k]<1) ||
                !Number.isFinite(result.claimedAt) || result.discountExpiry!==result.claimedAt+259200000)throw Error('OCT20_RESPONSE_INVALID');
            rows[year]={...rows[year],status:'claimed',result};refresh();
            await AppDialog.alert((result.recovered?'Quà này đã được nhận trước đó.\n':'Đã nhận quà 20/10!\n')+rewardText(result)+'\nMã giảm giá hết hạn: '+new Date(result.discountExpiry).toLocaleString('vi-VN',{timeZone:'Asia/Ho_Chi_Minh'})+' (giờ Việt Nam).');
            window.renderStudentRoadmap?.();
        } catch(error) {
            if(firebase.auth().currentUser?.uid!==owner)return;
            const messages={OCT20_PAUSED:'Quà 20/10 đang tạm bảo trì.',OCT20_RATE_LIMIT:'Bạn thao tác quá nhanh. Vui lòng chờ một phút.',OCT20_GIFT_UNAVAILABLE:'Chưa tìm thấy gói quà hợp lệ cho tài khoản này.',OCT20_REVIEW_REQUIRED:'Gói quà cần được giáo viên kiểm tra.',OCT20_UPDATE_REQUIRED:'Hãy cập nhật trang trước khi nhận quà.'};
            await AppDialog.alert((messages[error.message]||'Chưa xác nhận được kết quả nhận quà.')+' Bạn có thể thử lại cùng gói để kiểm tra; quà đã nhận sẽ không được cộng lần nữa.');
        } finally {busy.delete(slot);if(uid===owner)refresh();}
    }
    window.Oct20Gift=Object.freeze({renderLetter,missingLetters,claim,watch,result:year=>rows[year]?.status==='claimed'?rows[year].result:null,isBusy:year=>busy.has(uid+':'+year)});
    firebase.auth().onAuthStateChanged(()=>{ref?.off();ref=null;uid=null;rows={};});
})();
