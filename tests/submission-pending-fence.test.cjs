'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.join(__dirname, '..');
const registration = fs.readFileSync(path.join(root, 'worker-patches/submission-registration-fence-v1.jsinc'), 'utf8');
const reconciliation = fs.readFileSync(path.join(root, 'worker-patches/teacher-reconcile-receipt-v1.jsinc'), 'utf8');
const student = fs.readFileSync(path.join(root, 'js/student.js'), 'utf8');

async function testRegistration() {
  for (const t of [
    {name:'receipt replay is not requeued', receipt:true, error:null, pending:false},
    {name:'locked assignment is not requeued', locked:true, error:'ASSIGNMENT_TEACHER_LOCKED', pending:false},
    {name:'obsolete redo is rejected before pending', redo:456, error:'SUBMISSION_CHANGED_ELSEWHERE', pending:false},
    {name:'cancelled submission refuses retry', existing:true, cancelled:true, error:'SESSION_OPERATION_CANCELLED', pending:true},
    {name:'valid first request registers', error:null, pending:true}
  ]) {
    const state={pendingOperations:t.existing?{op:{sessionId:'session',action:'submission_submit',intentHash:'hash',nonce:'n',createdAt:1,cancelled:!!t.cancelled}}:{}};
    const admin={database:async p=>({value:p.endsWith('/requiredClientVersion')?3:
      p.startsWith('economy_receipts/')?(t.receipt?{action:'submission_submit',intentHash:'hash'}:null):
      p==='assignments/a'?{id:'a',isLocked:!!t.locked}:
      p==='assignment_locks/a'?false:
      p==='submissions/s'?{redoStartedAt:t.redo||123}:null})};
    const ctx={uid:'student',claims:{deviceSession:'session'},
      input:{action:'submission_submit',operationId:'op',assignmentKey:'a',submissionKey:'s',redoStartedAt:'123'},
      now:Date.now(),intent:'hello',admin,crypto:{randomUUID:()=> 'new'},
      sessionFault:(code)=>Object.assign(Error(code),{code}),authorizeSession:()=>{},
      intentHash:async()=> 'hash',editSessionAccount:async(_admin,_path,fn)=>fn(state)};
    let caught=null;
    try {
      const fn = new Function('ctx', `const {admin,uid,claims,input,now,intent,sessionFault,intentHash,editSessionAccount,authorizeSession,crypto}=ctx;const __name=x=>x;`+registration+'\nreturn registerSessionOperation(admin,uid,claims,input,now,intent)');
      await fn(ctx);
    } catch(e){caught=e.message}
    assert.equal(caught,t.error,t.name);
    assert.equal(Boolean(state.pendingOperations.op),t.pending,t.name);
  }
}
async function testQueue(){
  const start=student.indexOf('const studentSubmissionInFlight = new Map();');
  const end=student.indexOf('// All student submission writers',start);
  assert(start>=0&&end>start);
  const block=student.slice(start,end);
  let sequence=[],release;
  const fn = new Function('window','submitAssignmentCore',block+'\nreturn submitAssignment;')(
    {StudentAccountAccess:{requireWrite:()=>true}},
    async (id,auto,cheat)=> {
      const n=sequence.length;
      sequence.push([id,auto,cheat]);
      if(n===0)await new Promise(r=>release=r);
      return n;
    }
  );
  const manual=fn('a'),duplicate=fn('a'),auto=fn('a',true),cheat=fn('a',true,true);
  await Promise.resolve();await Promise.resolve();
  assert.equal(sequence.length,1,'multiple submissions must not start concurrently');
  release();
  const values=await Promise.all([manual,duplicate,auto,cheat]);
  assert.deepEqual(values,[0,0,1,2]);
  assert.equal(sequence.length,3);
}
async function testReconcileStatic(){
  assert.match(reconciliation,/pending\.cancelled !== true/);
  assert.match(reconciliation,/now - pending\.createdAt < 600000/);
  assert.match(reconciliation,/Object\.keys\(snapshot\.activeRequests \|\| \{\}\)\.length/);
  assert.match(reconciliation,/"X-Firebase-ETag": "true"/);
  assert.match(reconciliation,/"if-match": fetched\.etag/);
  assert.match(reconciliation,/SESSION_OPERATION_CANCELLED/);
  assert.match(reconciliation,/autoGradeAuthority\?\.operationId !== input\.operationId/);
}
(async()=>{await testRegistration();await testQueue();await testReconcileStatic();console.log('PASS submission fence and serialized submission tests');})().catch(e=>{console.error(e);process.exitCode=1;});
