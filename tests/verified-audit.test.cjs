const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const read = name => fs.readFileSync(path.join(root, name), 'utf8');

for (const [file, name] of [
    ['js/teacher.js', 'getTeacherManagedPasswordPolicyError']
]) {
    test(`${name}: accepts digits and rejects whitespace/weak passwords`, () => {
        const source = read(file);
        const start = source.indexOf(`function ${name}(`);
        const fn = vm.runInNewContext(`(${source.slice(start, source.indexOf('\n}', start) + 2)})`);
        assert.equal(fn('CorrectPass9!', 'alice'), '');
        for (const value of ['Correct Pass9!', 'Correct\tPass9!', 'CorrectPass!!', 'correctpass9!', 'CORRECTPASS9!', 'CorrectPass99', 'AlicePass99!']) {
            assert.notEqual(fn(value, 'alice'), '', value);
        }
    });
}

test('login signs out orphaned/unknown/locked users and only routes valid roles', async () => {
    const source = read('js/common.js');
    const start = source.indexOf('            const userCredential = await firebase.auth().signInWithEmailAndPassword');
    const code = source.slice(start, source.indexOf('\n        } catch (error)', start));
    for (const user of [null, { role: 'admin' }, { role: 'student', isLocked: true }, { role: 'student' }, { role: 'teacher' }]) {
        let signouts = 0;
        const storage = new Map([['currentUser', 'stale']]);
        const auth = { signInWithEmailAndPassword: async () => ({ user: { uid: 'u' } }), signOut: async () => { signouts++; } };
        const context = {
            firebase: { auth: () => auth }, db: { ref: () => ({ once: async () => ({ val: () => user }) }) },
            fakeEmail: 'test@example.com', passVal: 'example', errorMsg: { style: {} },
            localStorage: { removeItem: k => storage.delete(k), setItem: (k, v) => storage.set(k, v) },
            clearAllLockouts: async () => {}, window: { location: {} }
        };
        await vm.runInNewContext(`(async () => {${code}\n})()`, context);
        const allowed = user && ['teacher', 'student'].includes(user.role) && !user.isLocked;
        assert.equal(signouts, allowed ? 0 : 1);
        assert.equal(context.window.location.href, allowed ? `${user.role}.html` : undefined);
        if (!allowed) assert.equal(storage.has('currentUser'), false);
    }
});

function loaderHarness() {
    const source = read('js/student-feature-loader.js');
    const scripts = [];
    class Tag extends EventTarget {
        constructor() { super(); this.dataset = {}; this.tagName = 'SCRIPT'; }
        remove() { const i = scripts.indexOf(this); if (i >= 0) scripts.splice(i, 1); }
    }
    const document = {
        baseURI: 'https://example.com/app/', scripts,
        createElement: () => new Tag(), body: { appendChild: tag => scripts.push(tag) }
    };
    const context = vm.createContext({ document, URL, setTimeout, clearTimeout });
    let code = 'const scriptPromises = new Map(); const loadedScriptElements = new WeakSet(); const failedScriptElements = new WeakSet();';
    for (const name of ['normalizeResourceUrl', 'findScript', 'loadScript']) {
        const start = source.indexOf(`    function ${name}(`);
        code += source.slice(start, source.indexOf('\n    }', start) + 6);
    }
    vm.runInContext(code, context);
    return { scripts, Tag, context, load: url => context.loadScript(url) };
}

test('module version variants share one promise and wait for execution', async () => {
    const h = loaderHarness();
    const a = h.load('js/example.js?v=1');
    const b = h.load('js/example.js?v=2#hash');
    assert.equal(a, b);
    assert.equal(h.scripts.length, 1);
    let settled = false;
    a.then(() => { settled = true; });
    await Promise.resolve();
    assert.equal(settled, false);
    h.scripts[0].dispatchEvent(new Event('load'));
    await a;
    assert.equal(settled, true);
    assert.equal(h.load('js/example.js?v=3'), a);
});

test('an externally inserted loading script is awaited without duplication', async () => {
    const h = loaderHarness();
    const tag = new h.Tag(); tag.src = 'https://example.com/app/js/external.js?v=old'; h.scripts.push(tag);
    const promise = h.load('js/external.js?v=new');
    assert.equal(h.scripts.length, 1);
    let settled = false; promise.then(() => { settled = true; });
    await Promise.resolve(); assert.equal(settled, false);
    tag.dispatchEvent(new Event('load')); await promise;
});

test('failed module rejects and cannot silently become loaded', async () => {
    const h = loaderHarness();
    const promise = h.load('js/broken.js?v=1');
    h.scripts[0].dispatchEvent(new Event('error'));
    await assert.rejects(promise, /Không tải được module/);
    assert.equal(h.load('js/broken.js?v=2'), promise);
    assert.equal(h.scripts.length, 0);
});

test('guide awaits tab runtime and does not bypass denied navigation', async () => {
    const source = read('js/huong-dan-nguoi-moi.js');
    const start = source.indexOf('    async function openGuideTab(');
    const fn = source.slice(start, source.indexOf('\n    }', start) + 6);
    let active = false, finish;
    const context = vm.createContext({
        getNavButton: () => ({}), document: { getElementById: () => ({ classList: { contains: () => active } }) },
        window: { switchTab: () => new Promise(resolve => { finish = () => { active = true; resolve(); }; }) }
    });
    vm.runInContext(fn, context);
    let settled = false;
    const promise = context.openGuideTab('tab-store').then(() => { settled = true; });
    await Promise.resolve(); assert.equal(settled, false);
    finish(); await promise; assert.equal(settled, true);
    active = false; context.window.switchTab = async () => false;
    await assert.rejects(context.openGuideTab('tab-store'), /Chưa thể mở mục/);
});

