/* Ready only after this module has executed. Never clears pending economy operations. */
(() => {
 'use strict';
 const labels={store:'Cửa hàng và vật phẩm',wallet:'Xu và điều chỉnh',rewards:'Quà và phần thưởng',study:'Nộp / chấm bài',assignments:'Giao bài và sửa nguồn',extensions:'Gia hạn',festival:'Lễ hội',noel:'Xưởng Quà Noel',year_review:'Ôn lại năm cũ',oct20:'Sự kiện 20/10'};
 let active=null;
 async function call(body){
  const user=firebase.auth().currentUser;if(!user)throw Error('Cần đăng nhập lại.');
  if(body.action!=='activate') {
   const profile=(await db.ref('users/'+user.uid).once('value')).val();
   if(profile?.role!=='teacher'||profile.isLocked||profile.deletionPending)throw Error('Chỉ giáo viên được quản lý lá chắn.');
  }
  if(firebase.auth().currentUser?.uid!==user.uid)throw Error('Tài khoản đã thay đổi.');
  const endpoint=String(window.R2_CONFIG?.workerUrl||'').replace(/\/$/,'');
  const token=await user.getIdToken();
  if(firebase.auth().currentUser?.uid!==user.uid)throw Error('Tài khoản đã thay đổi.');
  const r=await fetch(endpoint+'/transaction-shield',{method:'POST',headers:{Authorization:'Bearer '+token,'Content-Type':'application/json'},body:JSON.stringify(body),signal:AbortSignal.timeout(20000)});
  const data=await r.json();if(firebase.auth().currentUser?.uid!==user.uid)throw Error('Tài khoản đã thay đổi.');
  if(!r.ok||!data.ok)throw Error(data.error||'Chưa xác nhận lá chắn.');return data.result;
 }
 async function initialize(status){
  if(!status||status.protocol!==1||typeof status.available!=='boolean'||typeof status.required!=='boolean')throw Error('SHIELD_UPDATE_REQUIRED');
  if(status.required||window.StudentAccountAccess?.canWrite?.()===false)return;
  if(status.available){const r=await call({action:'activate',protocol:1});if(r.activated!==true||r.protocol!==1)throw Error('SHIELD_UPDATE_REQUIRED');}
 }
 async function open(){
  if(window.isVerifiedTeacher!==true)throw Error('Cần xác minh tài khoản giáo viên.');
  if(active){active.focus();return;}
  const host=document.createElement('div'),root=host.attachShadow({mode:'open'});document.body.append(host);
  root.innerHTML='<style>*{box-sizing:border-box}dialog{position:fixed;inset:0;margin:auto;width:min(760px,94vw);max-height:88dvh;overflow:auto;padding:22px;border:1px solid #cbd5e1;border-radius:18px;color:#20304a;background:#f8fafc;font:15px/1.5 system-ui}dialog::backdrop{background:#17243b99}header,.row{display:flex;align-items:center;justify-content:space-between;gap:14px}.row{padding:14px 0;border-bottom:1px solid #dbe2ed;flex-wrap:wrap}h2{margin:0;font-size:23px}button{font:600 14px system-ui;padding:10px 14px;min-height:42px;border:1px solid #bbc7da;border-radius:9px;background:#fff;color:#23395d;cursor:pointer;width:auto}button:disabled{opacity:.5}button:focus-visible{outline:3px solid #7c88db}p{overflow-wrap:anywhere}.note{color:#56637a}.status{color:#9c3425;white-space:pre-wrap}</style><dialog aria-label="Lá chắn giao dịch"><header><h2>Lá chắn giao dịch</h2><button id="close">Đóng</button></header><p class="note">Khóa một nhóm sẽ ngừng thao tác mới. Yêu cầu đã ghi thành công vẫn được đối soát. Chỉ mở lại sau khi đã kiểm tra và xử lý sự cố.</p><button id="reload">Tải lại trạng thái</button><p class="status" role="status"></p><section></section></dialog>';
  const d=root.querySelector('dialog'),body=root.querySelector('section'),status=root.querySelector('.status');active=d;
  const close=()=>{d.close();host.remove();active=null;};root.querySelector('#close').onclick=close;d.addEventListener('cancel',e=>{e.preventDefault();close()});d.showModal();
  async function load(){
   status.textContent='Đang đọc trạng thái…';
   try{const result=await call({action:'status'});body.replaceChildren();
    const setup=document.createElement('p');setup.textContent=result.config?.enabled?'Đang cho phép kích hoạt theo tài khoản.':'Chưa mở kích hoạt tài khoản mới. Tài khoản đã kích hoạt vẫn được bảo vệ.';body.append(setup);
    for(const [g,state]of Object.entries(result.groups)){
     const row=document.createElement('div');row.className='row';const label=document.createElement('span');label.textContent=(labels[g]||g)+' · '+(!state?'Chưa cấu hình':state.state==='open'?'Đang mở':'Đang khóa');
     const b=document.createElement('button');b.textContent=state?.state==='open'?'Tạm khóa':'Xác nhận đã kiểm tra và mở';
     b.onclick=async()=>{if(!await AppDialog.confirm(state?.state==='open'?'Tạm khóa '+(labels[g]||g)+'? Thao tác mới sẽ bị dừng.':'Bạn đã đối soát giao dịch chờ và xử lý sự cố của '+(labels[g]||g)+'? Chỉ mở lại khi đã kiểm tra.'))return;b.disabled=true;status.textContent='Đang xác nhận thay đổi…';try{await call({action:'control',group:g,state:state?.state==='open'?'paused':'open',reason:state?.state==='open'?'maintenance':'verified_fix',expectedRevision:state?.revision||0,operationId:crypto.randomUUID()});await load()}catch(e){status.textContent='Chưa xác nhận: '+e.message+'. Tải lại trạng thái trước khi thử tiếp.';b.disabled=false}};
     row.append(label,b);body.append(row);
    }
    const config=document.createElement('button');config.textContent=result.config?.enabled?'Dừng kích hoạt tài khoản mới':'Cho phép kích hoạt tài khoản mới';config.onclick=async()=>{if(!await AppDialog.confirm(result.config?.enabled?'Dừng kích hoạt tài khoản mới? Tài khoản đã kích hoạt vẫn được bảo vệ.':'Cho phép kích hoạt theo từng tài khoản sau khi máy chủ xác nhận?'))return;config.disabled=true;try{await call({action:'configure',enabled:!result.config?.enabled,expectedRevision:result.config?.revision||0,operationId:crypto.randomUUID()});await load()}catch(e){status.textContent=e.message;config.disabled=false}};body.append(config);
    const title=document.createElement('h3');title.textContent='Sự cố gần đây (nhật ký tối thiểu)';body.append(title);
    for(const e of result.events){const line=document.createElement('p');line.textContent=new Date(e.at).toLocaleString('vi-VN')+' · '+(labels[e.group]||e.group)+' · '+e.code;body.append(line)}status.textContent='Đã tải trạng thái máy chủ.';
   }catch(e){status.textContent='Không tải được: '+e.message;}
  }
  root.querySelector('#reload').onclick=load;await load();
 }
 function mount(){const host=document.querySelector('#teacherDashboard #tab-settings');if(!host||document.getElementById('transactionShieldOpen'))return;const b=document.createElement('button');b.id='transactionShieldOpen';b.type='button';b.textContent='Lá chắn giao dịch';b.onclick=()=>open().catch(e=>AppDialog.alert(e.message));host.append(b);}
 window.TransactionShield=Object.freeze({version:1,initialize,open});
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();
