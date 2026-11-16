(() => {
    'use strict';
    const game=globalThis.NoelMatch3,slot='noel:2026:mutation';
    // Keep the existing mutation slot so pending operations survive this update.
    const seasonYear=()=>{const d=new Date(Date.now()+25200000);return String(d.getUTCFullYear()-(d.getUTCMonth()===0&&d.getUTCDate()===1?1:0));};
    let view=null,activatedUid=null,audio=null,sound=false;
    const names=['Hộp quà','Chuông','Kẹo gậy','Bông tuyết','Quả châu'];
    const art=[
        '<rect x="9" y="23" width="46" height="33" rx="5" fill="#cf4264"/><path d="M7 20h50v11H7z" fill="#f47895"/><path d="M28 20h8v36h-8z" fill="#ffdb87"/><path d="M31 21C9 20 13 2 23 9l9 12C54 20 50 2 41 9Z" fill="none" stroke="#ffdb87" stroke-width="6"/>',
        '<path d="M13 45h38l-7-12V24a12 12 0 0 0-24 0v9Z" fill="#f8c65f" stroke="#b97a1e" stroke-width="2"/><path d="M8 46h48" stroke="#ffdf89" stroke-width="6" stroke-linecap="round"/><circle cx="32" cy="53" r="6" fill="#ba7a2c"/><circle cx="32" cy="10" r="4" fill="#f8c65f"/>',
        '<path d="M23 54V21a12 12 0 0 1 24 0v5" fill="none" stroke="#fff4e8" stroke-width="13" stroke-linecap="round"/><path d="m17 30 12 5m-12 8 12 5m-6-33 11 6m5-10 5 11" stroke="#ec5873" stroke-width="7"/>',
        '<g stroke="#8de8f7" stroke-width="5" stroke-linecap="round"><path d="M32 7v50M10 19l44 26M10 45l44-26M24 12l8 7 8-7M24 52l8-7 8 7M11 28l10-2-1-11M53 36l-10 2 1 11M11 36l10 2-1 11M53 28l-10-2 1-11"/></g>',
        '<path d="M27 8h10v12H27z" fill="#ffda80"/><circle cx="32" cy="37" r="21" fill="#ad87e8"/><path d="M12 35q20 18 40 0" fill="none" stroke="#dfc7ff" stroke-width="7"/><ellipse cx="24" cy="26" rx="6" ry="4" fill="#fff" opacity=".6"/>'];
    const star='<path d="m32 4 8 18 20 2-15 14 4 21-17-10-18 10 4-21L3 24l21-2Z" fill="#ffe18d" stroke="#c6913c" stroke-width="2"/>';
    function node(tag,cls,text){const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n;}
    function button(label,fn,disabled=false,cls='noel-button'){const b=node('button',cls,label);b.type='button';b.disabled=disabled;b.addEventListener('click',fn);return b;}
    const auth=()=>window.firebase?.auth?.().currentUser;
    const owner=()=>auth()?.uid;
    const busyStudy=()=>!!window.currentActiveExamId||!!document.querySelector('#mcWorkspace.active');
    const date=n=>new Intl.DateTimeFormat('vi-VN',{timeZone:'Asia/Ho_Chi_Minh',dateStyle:'short',timeStyle:'short'}).format(n);
    const errors={NOEL_DAILY_LIMIT:'Bạn đã dùng hết 2 lượt hôm nay. Lượt mới có lúc 00:00 giờ Việt Nam.',NOEL_LEGACY_ROUND:'Màn này thuộc luật cũ. Hãy kết thúc màn rồi đồng bộ để xem lượt còn lại.',NOEL_YEAR_INVALID:'Mùa sự kiện đã thay đổi hoặc giờ trên thiết bị chưa đúng. Đóng và mở lại Xưởng để đồng bộ.',NOEL_NOT_OPEN:'Sự kiện chưa được công bố.',NOEL_START_CLOSED:'Đã ngoài thời gian mở lượt chơi mới.',NOEL_MOVE_CLOSED:'Đã hết thời gian hoàn thành lượt chơi.',
        NOEL_REDEEM_CLOSED:'Đã hết thời gian đổi quà.',NOEL_LEVEL_LOCKED:'Hãy hoàn thành màn trước.',NOEL_ACTIVE_ROUND:'Bạn đang có một lượt chơi. Tiếp tục hoặc kết thúc lượt đó trước.',
        NOEL_STALE_ROUND:'Tiến độ đã thay đổi ở cửa sổ khác. Bấm Đồng bộ để xem đúng bàn hiện tại.',NOEL_NO_MATCH:'Đổi chỗ này không tạo nhóm hợp lệ; bạn chưa mất lượt.',
        NOEL_NOT_ENOUGH_CANDY:'Bạn chưa đủ Kẹo Noel.',ITEM_ALREADY_OWNED:'Bạn đã có món này; không trừ Kẹo Noel.',STORE_GAME_ACCESS_DISABLED:'Giáo viên đang khóa quyền trò chơi của tài khoản.',
        NOEL_UPDATE_REQUIRED:'Cần cập nhật trang để dùng đúng phiên bản trò chơi.',NOEL_CONFIG_INVALID:'Sự kiện đang chờ kiểm tra cấu hình.',NOEL_GAME_CLOSED:'Giáo viên đang tạm khóa khu trò chơi.'};
    function message(s,text){if(view===s)s.status.textContent=text;}
    async function request(action,args={}) {
        if(!navigator.onLine)throw Error('Đang mất mạng. Chưa gửi nước đi mới. Kết nối lại rồi bấm Đồng bộ.');
        if(!auth()||window.ECONOMY_SERVER_ENABLED!==true||!window.EconomyClient)throw Error('Chưa kết nối được máy chủ trò chơi. Vui lòng đăng nhập và thử lại.');
        if(activatedUid!==auth().uid){
            const uid=auth().uid;
            const r=await window.EconomyClient.execute('noel_activate',{protocol:'1'},{slot:'noel:activate',feedback:false});
            if(auth()?.uid!==uid||r?.activated!==true||r.protocol!=='1')throw Error('Tài khoản vừa thay đổi.');
            activatedUid=uid;
        }
        if(action==='open')await window.EconomyClient.resume(slot);
        const year=action==='open'?seasonYear():(view?.data?.year||seasonYear());
        return window.EconomyClient.execute('noel_'+action,{protocol:'1',year,...args},{slot:action==='open'?'noel:'+year+':open':slot,feedback:false});
    }
    function beep(){
        if(!sound)return;
        try{audio??=new (window.AudioContext||window.webkitAudioContext)();void audio.resume();const o=audio.createOscillator(),g=audio.createGain();o.connect(g);g.connect(audio.destination);o.frequency.value=660;g.gain.setValueAtTime(.04,audio.currentTime);g.gain.exponentialRampToValueAtTime(.001,audio.currentTime+.12);o.start();o.stop(audio.currentTime+.13);}catch(_){sound=false;}
    }
    async function act(s,action,args={}) {
        if(view!==s||s.busy)return;
        if(s.owner!==owner()){close();return;}
        if(busyStudy()){message(s,'Hãy hoàn tất bài đang làm trước khi chơi.');return;}
        s.busy=true;s.selected=null;render(s);message(s,'Đang xác nhận với máy chủ…');
        try{
            const data=await request(action,args);
            if(view!==s||s.owner!==owner())return;
            if(!data||typeof data.ready!=='boolean'||!data.player)throw Error('Phản hồi không hợp lệ. Bấm Đồng bộ để kiểm tra.');
            if(data.ready&&!data.practice&&(data.config?.rulesVersion!==2||!data.daily))throw Error('NOEL_UPDATE_REQUIRED');
            s.data=data;s.pending=false;s.boardMode=action==='start'||action==='move'||action==='open'&&data.player.round?.game?.status==='active';
            s.animate=action==='move';if(action==='move')beep();message(s,action==='move'?'Đã lưu nước đi.':data.ready?'Tiến độ đã được xác nhận.':'Sự kiện đang chờ công bố lịch và phần thưởng.');
        }catch(error){
            if(view!==s)return;
            s.pending=(error.code||error.message)!=='NOEL_NO_MATCH';message(s,errors[error.code||error.message]||'Chưa xác nhận được kết quả. Bấm Đồng bộ để kiểm tra yêu cầu cũ; không tạo lượt hay đổi quà mới.');
            if(/^(Đang mất|Chưa kết nối|Tài khoản)/.test(error.message))message(s,error.message);
        }finally{if(view===s){s.busy=false;render(s);}}
    }
    function select(s,i){
        if(s.busy||s.pending||!s.boardMode)return;
        if(s.selected===null){s.selected=i;render(s);s.body.querySelector('[data-index="'+i+'"]')?.focus({preventScroll:true});return;}
        const a=s.selected;s.selected=null;
        if(a===i){render(s);return;}
        if(!game.adjacent(a,i)){s.selected=i;render(s);return;}
        const round=s.data.player.round;
        void act(s,'move',{roundId:round.id,seq:String(round.game.seq),a:String(a),b:String(i)});
    }
    function board(s){
        const round=s.data.player.round,g=round.game,cfg=game.config(g);
        const heading=node('div','noel-goals');
        heading.append(node('h2','',`Màn ${g.level} · ${g.remaining} nước đi`),node('p','',`${names[cfg.color]}: ${g.collected[cfg.color]} / ${cfg.target}${cfg.ice?' · Phá băng: '+g.brokenIce+' / '+cfg.ice:''}`));
        s.body.append(heading);
        const grid=node('div','noel-board'+(s.animate?' noel-board-settled':''));s.animate=false;grid.setAttribute('role','group');grid.setAttribute('aria-label','Bàn ghép 3. Chọn hai ô cạnh nhau bằng chuột hoặc phím Enter.');
        g.board.forEach((cell,i)=>{
            const name=cell.special==='star'?'Ngôi Sao Noel':names[cell.color];
            const b=button('',()=>select(s,i),s.busy||s.pending||g.status!=='active','noel-cell');
            b.dataset.index=i;b.dataset.color=String(cell.color);b.setAttribute('aria-pressed',String(s.selected===i));
            b.setAttribute('aria-label',`Hàng ${Math.floor(i/8)+1}, cột ${i%8+1}: ${name}${cell.special?' · '+({row:'Kẹo Sọc ngang',col:'Kẹo Sọc dọc',bomb:'Hộp Quà Nổ',star:'Ngôi sao'}[cell.special]):''}${g.ice[i]?' · có băng':''}`);
            b.innerHTML='<svg viewBox="0 0 64 64" aria-hidden="true">'+(cell.special==='star'?star:art[cell.color])+'</svg>';
            if(cell.special&&cell.special!=='star')b.append(node('span','noel-special',cell.special==='row'?'↔':cell.special==='col'?'↕':'✦'));
            if(g.ice[i]){b.classList.add('noel-ice');b.append(node('span','noel-ice-label','❄'));}
            b.addEventListener('keydown',e=>{const delta={ArrowLeft:-1,ArrowRight:1,ArrowUp:-8,ArrowDown:8}[e.key];if(delta){e.preventDefault();grid.children[Math.max(0,Math.min(63,i+delta))]?.focus();}});
            grid.append(b);
        });
        let down=null,suppress=false;
        grid.addEventListener('pointerdown',e=>{const b=e.target.closest('[data-index]');if(b)down={i:Number(b.dataset.index),x:e.clientX,y:e.clientY};});
        grid.addEventListener('pointerup',e=>{if(!down)return;const {i,x,y}=down;down=null;const dx=e.clientX-x,dy=e.clientY-y;
            if(Math.max(Math.abs(dx),Math.abs(dy))<15)return;const target=i+(Math.abs(dx)>Math.abs(dy)?Math.sign(dx):Math.sign(dy)*8);
            if(game.adjacent(i,target)){suppress=true;s.selected=i;select(s,target);}});
        grid.addEventListener('pointercancel',()=>{down=null;});
        grid.addEventListener('click',e=>{if(suppress){suppress=false;e.stopImmediatePropagation();e.preventDefault();}},true);
        s.body.append(grid);
        const controls=node('div','noel-controls');
        controls.append(button('Chọn màn',()=>{s.boardMode=false;s.selected=null;render(s);},s.busy));
        if(g.status==='active')controls.append(button('Kết thúc lượt này',()=>{
            s.body.replaceChildren(node('p','','Bỏ màn này? Lượt đã dùng không được hoàn lại. Bạn chỉ có thể bắt đầu màn khác nếu hôm nay còn lượt.'));
            s.body.append(button('Giữ lượt chơi',()=>render(s)),button('Kết thúc lượt',()=>act(s,'abandon',{roundId:round.id,seq:String(g.seq)})));
        },s.busy||s.pending,'noel-button noel-secondary'));
        else s.body.append(node('p','noel-result',g.status==='won'?`Hoàn thành! ${'★'.repeat(g.stars)} · +${round.reward?.candy??0} Kẹo Noel đã lưu.`:'Màn đã kết thúc. Chơi lại tốn 1 lượt trong ngày.'));
        s.body.append(controls);
    }
    function lobby(s){
        const {config,player,practice}=s.data;
        if(!s.data.ready){s.body.append(node('h2','','Xưởng đang chuẩn bị quà'),node('p','','Lịch chơi, mức Kẹo Noel và danh sách quà sẽ được công bố trước khi sự kiện mở.'));return;}
        const remaining=s.data.daily?.remaining??0,closed=s.data.serverNow<config.startAt||s.data.serverNow>=config.stopStartsAt;
        const summary=node('div','noel-daily');summary.append(node('strong','',`${remaining}/2 lượt còn lại hôm nay`),node('span','','Làm mới lúc 00:00 giờ Việt Nam · Thua hoặc bỏ màn vẫn mất lượt'));
        s.body.append(summary);
        if(!practice){const time=node('p','noel-schedule',`Giờ Việt Nam · Mở ${date(config.startAt)} · Ngừng lượt mới ${date(config.stopStartsAt)} · Hoàn tất lượt ${date(config.finishAt)} · Đổi quà đến ${date(config.redeemUntil)}`);s.body.append(time);}
        if(player.round?.game?.status==='active')s.body.append(button(`Tiếp tục màn ${player.round.game.level}`,()=>{s.boardMode=true;render(s);},s.busy||s.pending));
        const stageTitles=['Chuẩn bị quà','Dọn xưởng tuyết','Chuyến xe Noel'];
        for(let stage=0;stage<3;stage++){
            s.body.append(node('h2','noel-stage',`${stage+1}. ${stageTitles[stage]}`));
            const list=node('div','noel-levels');
            for(let n=1;n<=4;n++){
                const id=stage*4+n,cfg=game.levels[id-1],done=player.completed?.[id],locked=!practice&&id>1&&!player.completed?.[id-1];
                const b=button('',()=>{
                    s.body.replaceChildren(node('h2','',`Màn ${id}`),node('p','',`${cfg.moves} nước đi · Thu thập ${cfg.target} ${names[cfg.color]}${cfg.ice?', phá '+cfg.ice+' ô băng':''}.`),
                        node('p','',`Thắng: 1 sao. Còn ít nhất ${cfg.stars[0]} / ${cfg.stars[1]} nước: 2 / 3 sao. Mỗi lần thắng: ${2*id-1} Kẹo, kể cả chơi lại. Bắt đầu tốn 1 lượt trong ngày; không hoàn khi thua hoặc bỏ màn.`),
                        button('Bắt đầu',()=>act(s,'start',{level:String(id)})),button('Quay lại',()=>render(s)));
                },locked||s.busy||s.pending||(!practice&&(closed||remaining===0))||player.round?.game?.status==='active','noel-level');
                b.append(node('strong','',locked?'🔒':String(id)),node('span','',done?'★'.repeat(done.stars):'Ghép & thu thập'),node('span','noel-level-reward',`+${2*id-1} Kẹo / thắng`));list.append(b);
            }
            s.body.append(list);
        }
        s.body.append(node('h2','noel-stage','Góc đổi quà'));
        if(!config.prizes.length)s.body.append(node('p','','Chưa công bố danh sách quà. Kẹo Noel tách biệt với Coin.'));
        for(const prize of config.prizes){
            const row=node('div','noel-prize');row.append(node('span','',`${prize.name} · ${prize.cost} Kẹo · sở hữu vĩnh viễn`));
            row.append(button(player.redemptions?.[prize.itemId]?'Đã đổi':'Xem & đổi',()=>{
                s.body.replaceChildren(node('h2','',prize.name),node('p','',`Đổi ${prize.cost} Kẹo Noel để nhận vật phẩm vĩnh viễn. Nếu đã sở hữu thì không trừ Kẹo. Số dư sau đổi: ${player.balance-prize.cost}.`),
                    button('Xác nhận đổi',()=>act(s,'redeem',{itemId:prize.itemId})),button('Quay lại',()=>render(s)));
            },s.busy||s.pending||!!player.redemptions?.[prize.itemId]||player.balance<prize.cost));s.body.append(row);
        }
        const history=node('details','noel-help');history.append(node('summary','','Lịch sử Kẹo Noel'));
        for(const [id,c]of Object.entries(player.completed||{}))history.append(node('p','',`Màn ${id}: tổng +${c.candy||0} Kẹo${c.wins?' · '+c.wins+' lần thắng theo luật mới':''}`));
        for(const [id,c]of Object.entries(player.stages||{}))history.append(node('p','',`Hoàn thành chặng ${id}: +${c.candy} Kẹo (một lần)`));
        for(const [id,c]of Object.entries(player.redemptions||{}))history.append(node('p','',`Đổi ${config.prizes.find(p=>p.itemId===id)?.name||id}: −${c.cost} Kẹo`));
        s.body.append(history);
    }
    function render(s){
        if(view!==s)return;s.body.replaceChildren();s.refresh.disabled=s.busy;
        s.balance.textContent=s.data?`${s.data.player.balance} Kẹo Noel${s.data.practice?' · chơi thử':''}`:s.pending?'Chưa kết nối được':'Đang kết nối…';
        s.dialog.setAttribute('aria-busy',String(s.busy));
        if(!s.data){s.body.append(node('p','',s.pending?'Chưa tải được tiến độ. Bạn có thể thử Đồng bộ hoặc đóng cửa sổ và quay lại sau.':'Đang kiểm tra tiến độ và lịch sự kiện…'));return;}
        if(s.boardMode&&s.data.player.round)board(s);else lobby(s);
    }
    function close(){const s=view;if(!s)return;view=null;s.dialog.close();s.dialog.remove();window.removeEventListener('offline',s.offline);window.removeEventListener('online',s.online);clearInterval(s.accountTimer);s.opener?.focus();}
    async function open(){
        if(view){view.dialog.focus();return;}
        if(window.isGameEnabled===false||window.__studentStoreGameAccessEnabled===false){window.AppDialog?.notify?.('Giáo viên đang khóa khu trò chơi.');return;}
        if(busyStudy()){window.AppDialog?.notify?.('Hãy hoàn tất bài đang làm trước khi chơi.');return;}
        const dialog=node('dialog','noel-dialog ui-theme-immune');dialog.setAttribute('data-theme-immune','true');dialog.setAttribute('aria-label','Xưởng Quà Noel');
        const s={dialog,owner:owner(),opener:document.activeElement,busy:false,pending:false,selected:null,data:null,body:node('div','noel-body'),status:node('p','noel-status')};view=s;
        const top=node('header','noel-header'),title=node('div');title.append(node('span','noel-eyebrow','GIÁNG SINH · GHÉP 3'),node('h1','','Xưởng Quà Noel'));
        top.append(title,button('Đóng ×',close,false,'noel-button noel-secondary'));
        const bar=node('div','noel-bar');s.balance=node('strong');s.refresh=button('Đồng bộ',()=>act(s,'open'));
        const soundButton=button('Âm thanh: '+(sound?'bật':'tắt'),()=>{sound=!sound;soundButton.textContent='Âm thanh: '+(sound?'bật':'tắt');if(sound)beep();},false,'noel-button noel-secondary');bar.append(s.balance,s.refresh,soundButton);
        s.status.setAttribute('role','status');s.status.setAttribute('aria-live','polite');
        const help=node('details','noel-help');help.append(node('summary','','Cách chơi & luật đang dùng'),node('p','','Chọn hoặc kéo hai ô cạnh nhau để ghép ít nhất 3 hình. Đổi không tạo nhóm: trả chỗ cũ, không mất lượt. Ghép nối tiếp không tốn lượt thêm. Hàng 4 tạo Kẹo Sọc ↔/↕; T/L gồm 5 ô tạo Hộp Quà Nổ 3×3; hàng 5 tạo Ngôi Sao Noel. Đổi sao với hình thường để xóa loại đó. Hai đặc biệt chỉ đổi khi tạo nhóm; chưa có combo riêng. Sao bị hiệu ứng chạm sẽ xóa màu nhiều nhất, hòa thì theo thứ tự Quà, Chuông, Kẹo, Tuyết, Châu. Hết nước tự xáo, giữ băng và đặc biệt.'));
        dialog.append(top,bar,s.status,s.body,help);document.body.append(dialog);dialog.showModal();dialog.addEventListener('cancel',e=>{e.preventDefault();close();});
        s.offline=()=>message(s,'Mất mạng: dừng nước đi mới. Khi có mạng, bấm Đồng bộ để kiểm tra nước đi cuối.');s.online=()=>message(s,'Đã có mạng. Bấm Đồng bộ để khôi phục trạng thái được xác nhận.');
        window.addEventListener('offline',s.offline);window.addEventListener('online',s.online);s.accountTimer=setInterval(()=>{if(owner()!==s.owner||busyStudy())close();},500);
        await act(s,'open');
    }
    window.NoelWorkshop={open,close,names};
})();
