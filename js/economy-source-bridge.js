/* Keep teacher source edits on the server so every ranking input advances its epoch. */
(() => {
 const roots=new Set(['assignments','submissions','users','video_tracking','roadmap_settings','leaderboard_settings','assignment_locks']);
 const prototype=Object.getPrototypeOf(db.ref()),base={};
 for(const k of ['set','update','remove','transaction','push'])base[k]=prototype[k];
 const pathOf=ref=>decodeURIComponent(new URL(ref.toString()).pathname).replace(/^\/+|\/+$/g,'');
 const enabled=()=>window.ECONOMY_SERVER_ENABLED===true&&window.__economyRole==='teacher';
 // All source writes from teacher pages must fail closed while the Worker is unverified.
 const teacherPage=()=>window.__APP_PAGE_ROLE__==='teacher'||window.__economyRole==='teacher';
 const source=path=>roots.has(path.split('/')[0]);
 const shieldError=()=>Object.assign(Error('SHIELD_POLICY_UNAVAILABLE'),{code:'SHIELD_POLICY_UNAVAILABLE'});
 const mayRoute=path=>teacherPage()&&source(path);
 const rejected=(callback)=>completed(Promise.reject(shieldError()),callback);
 async function send(patch){
  if(Object.keys(patch).some(p=>!source(p)&&!['exam_sessions','name_change_requests','transaction_logs'].includes(p.split('/')[0])))throw Error('Thao tác này chưa được chuyển sang máy chủ; chưa ghi dữ liệu.');
  const entries=Object.entries(patch);
  // A series of smaller commits is not an atomic bulk deletion. Wait for a
  // server coordinator instead of leaving assignments half deleted.
  if(entries.length>10)throw Error('SHIELD_ATOMIC_BATCH_REQUIRED');
  const slot='source:'+Object.keys(patch).sort().join('|');
  const resumed=await window.EconomyClient.resume(slot,{action:'teacher_source_write',args:{patch:JSON.stringify(patch)}});
  if(resumed?.args?.patch===JSON.stringify(patch))return resumed.result;
  const expected={};
  for(const path of Object.keys(patch))expected[path]=(await db.ref(path).once('value')).val();
  return window.EconomyClient.execute('teacher_source_write',{patch:JSON.stringify(patch),expected:JSON.stringify(expected)},{slot});
 }
 const completed=(task,callback)=>{if(callback)task.then(()=>callback(null),e=>callback(e));return task;};
 prototype.set=function(value,callback){const path=pathOf(this);return mayRoute(path)?(enabled()?completed(send({[path]:value}),callback):rejected(callback)):base.set.call(this,value,callback);};
 prototype.update=function(value,callback){
  const path=pathOf(this),patch=Object.fromEntries(Object.entries(value).map(([k,v])=>[path?path+'/'+k:k,v]));
  return teacherPage()&&Object.keys(patch).some(source)?(enabled()?completed(send(patch),callback):rejected(callback)):base.update.call(this,value,callback);
 };
 prototype.remove=function(callback){return mayRoute(pathOf(this))?this.set(null,callback):base.remove.call(this,callback);};
 prototype.push=function(value,callback){
  if(!mayRoute(pathOf(this))||arguments.length===0)return base.push.apply(this,arguments);
  const ref=base.push.call(this),task=ref.set(value,callback);
  ref.then=(resolve,reject)=>task.then(()=>{const plain=db.ref(pathOf(ref));return resolve?resolve(plain):plain;},reject);
  ref.catch=reject=>task.catch(reject);return ref;
 };
 prototype.transaction=function(updater,callback,applyLocally){
  const ref=this,path=pathOf(ref);if(!mayRoute(path))return base.transaction.call(ref,updater,callback,applyLocally);
  if(!enabled()){const task=Promise.reject(shieldError());if(callback)task.catch(e=>callback(e,false,null));return task;}
  const task=(async()=>{
   const snapshot=await ref.once('value'),next=updater(snapshot.val());
   if(next===undefined)return {committed:false,snapshot};
   const pending=await window.EconomyClient.resume('source:'+path,{action:'teacher_source_write',args:{patch:JSON.stringify({[path]:next})}});
   if(pending)return {committed:true,snapshot:await ref.once('value')};
   // Do not reapply updater to a newer source after HTTP 409 SOURCE_CHANGED.
   // The user must refresh and explicitly confirm a new operation.
   await window.EconomyClient.execute('teacher_source_write',{
    patch:JSON.stringify({[path]:next}),expected:JSON.stringify({[path]:snapshot.val()})
   },{slot:'source:'+path});
   return {committed:true,snapshot:await ref.once('value')};
  })();
  if(callback)task.then(r=>callback(null,r.committed,r.snapshot),e=>callback(e,false,null));return task;
 };
})();
