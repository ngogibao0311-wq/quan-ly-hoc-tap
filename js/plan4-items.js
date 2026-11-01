/* Plan 4: local artwork only. Ownership and purchases stay with StoreManager/Worker. */
(() => {
    'use strict';
    if (window.Plan4Runtime) return;
    const CSS = 'css/plan4-items.css?v=20261029.plan4.2';
    const designs = {
        alger: ['Alger Wilson', 'Thánh Ca Hải Triều', '#6ed1d4', '#0d2539', '#d7b976', 'Sóng biển khắc lời thề trên hải đồ cổ.'],
        emlyn: ['Emlyn White', 'Huyết Nguyệt Thánh Đường', '#e4a3b8', '#341829', '#e9d8b5', 'Trăng đỏ soi qua những ô kính thánh đường.'],
        liu_xiao: ['Liu Xiao', 'Nghịch Chuyển Thời Không', '#d0a2ff', '#241a40', '#f0ce8c', 'Bánh răng định mệnh mở ra những dòng thời gian.'],
        qiao_ling: ['Qiao Ling', 'Hồi Âm Ký Ức', '#ffbd88', '#442b33', '#ffe6af', 'Những khung ảnh giữ lại hơi ấm của ngày xưa.'],
        hemera: ['Hemera', 'Bình Minh Vĩnh Cửu', '#f4cb6e', '#43351e', '#fff5c7', 'Nắng mai thức giấc trên hàng cột thiên giới.'],
        greed: ['Tham Lam', 'Kim Khố Vô Tận', '#85deb7', '#193f36', '#eac874', 'Ngọc lục bảo và tiền vàng vây quanh ngai báu.'],
        noctyriel: ['Noctyriel', 'Tinh Vực Dạ Miện', '#c5b0f0', '#251d3e', '#ded3b9', 'Vương miện bóng đêm gọi những quỹ đạo xa xăm.'],
        noel_nam: ['Sứ Giả Mùa Đông', 'Chuyến Xe Sao Bắc', '#9de5d6', '#153e3e', '#eacc83', 'Xe quà băng qua rừng thông dưới ánh sao phương Bắc.'],
        noel_nu: ['Tiên Nữ Quà Tặng', 'Vũ Hội Chuông Ngân', '#ffb4b6', '#4a2630', '#f5d990', 'Chuông bạc, nơ lụa và quà tặng đón đêm đoàn viên.']
    };
    const many = (n, fn) => Array.from({ length: n }, (_, i) => fn(i)).join('');
    const svg = art => `<svg viewBox="0 0 400 400" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">${art}</svg>`;
    const star = '<path d="M200 105 220 176 295 200 220 224 200 295 180 224 105 200 180 176Z"/>';
    const art = {
        alger: '<circle cx="200" cy="170" r="115"/><circle cx="200" cy="170" r="102" stroke-dasharray="2 9"/><path d="M200 28V289M67 170H333M190 69 211 252 200 271 189 252 210 69ZM200 271 151 212M200 271 249 212M151 212V237M249 212V237"/>' + many(5, i => `<path d="M0 ${300+i*17}Q50 ${270+i*17} 100 ${300+i*17}T200 ${300+i*17}T300 ${300+i*17}T400 ${300+i*17}"/>`),
        emlyn: '<path d="M40 390V150Q40 50 200 10Q360 50 360 150V390M58 390V155Q58 70 200 30Q342 70 342 155V390M200 30V390M60 155H340M60 280H340"/><circle cx="200" cy="170" r="82"/><path d="M230 96A80 80 0 1 0 270 220 69 69 0 0 1 230 96Z" fill="currentColor" fill-opacity=".18"/><path d="M200 285 243 330 200 376 157 330ZM80 170 117 218 80 263M320 170 283 218 320 263"/>',
        liu_xiao: '<g class="p4-rotate">' + many(12,i=>`<path transform="rotate(${i*30} 200 200)" d="M182 28H218L224 51 247 61 264 48 289 72 277 94"/>`) + '<circle cx="200" cy="200" r="148" stroke-dasharray="2 8"/><circle cx="200" cy="200" r="122"/></g><path d="M200 80V200L278 250M75 70 325 330M325 70 75 330"/><path d="M145 90H255L220 150V250L255 310H145L180 250V150Z" fill="currentColor" fill-opacity=".09"/>',
        qiao_ling: '<g transform="rotate(-12 200 200)"><rect x="35" y="50" width="215" height="270" rx="6"/><path d="M50 68H235V265H50ZM65 235 120 172 156 213 184 180 221 235"/><circle cx="180" cy="120" r="25"/></g><g transform="rotate(15 260 250)"><rect x="145" y="155" width="210" height="225" rx="6" fill="currentColor" fill-opacity=".06"/><path d="M160 171H340V325H160M180 300 229 235 265 277 303 230 325 300M175 347H250"/></g><path d="M35 350Q170 270 300 35" stroke-dasharray="3 7"/>',
        hemera: '<circle cx="200" cy="130" r="60"/><circle cx="200" cy="130" r="72"/>' + many(24,i=>`<path transform="rotate(${i*15} 200 130)" d="M200 40V15"/>`) + '<path d="M25 390V215H80V390M320 390V215H375V390M15 215H90V200H15ZM310 215H385V200H310ZM38 225V380M67 225V380M333 225V380M362 225V380M0 395H400M0 300Q100 260 200 300T400 300"/>',
        greed: '<path d="M200 40 285 125 250 240H150L115 125Z" fill="currentColor" fill-opacity=".12"/><path d="M115 125H285M200 40 160 125 200 240 240 125ZM35 315 22 210 80 252 125 205 170 268 200 215 230 268 275 205 320 252 378 210 365 315ZM35 332H365V358H35Z"/>' + many(5,i=>`<g transform="translate(${45+i*77} ${350+(i%2)*15})"><ellipse rx="28" ry="9"/><path d="M-28 0V10Q0 29 28 10V0"/></g>`),
        noctyriel: '<g class="p4-rotate"><ellipse cx="200" cy="200" rx="182" ry="72" transform="rotate(-35 200 200)"/><ellipse cx="200" cy="200" rx="182" ry="72" transform="rotate(35 200 200)"/><circle cx="200" cy="200" r="140" stroke-dasharray="2 12"/><circle cx="68" cy="122" r="18"/><circle cx="332" cy="276" r="25"/></g><path d="M135 183 110 115 165 151 200 90 235 151 290 115 265 183ZM140 197H260M225 220A65 65 0 1 0 264 302 60 60 0 0 1 225 220Z" fill="currentColor" fill-opacity=".12"/>',
        noel_nam: star + '<path d="M15 318 52 248 38 248 75 190 112 248H98L135 318ZM265 318 302 248H288L325 190 362 248H348L385 318ZM75 318V352M325 318V352M115 290H250L277 265V312Q220 355 140 320ZM110 340Q175 382 290 327M146 322V350M240 325V348"/><path d="M148 287V250H182V287M190 287V240H229V287M165 250V287M210 240V287"/>',
        noel_nu: '<path d="M105 235Q117 214 117 170A83 83 0 0 1 283 170Q283 214 295 235ZM105 249H295M180 256Q200 290 220 256M200 87V52"/><path d="M200 70C120 0 102 90 200 70C298 90 280 0 200 70ZM200 70 152 128M200 70 248 128"/><path d="M62 300H158V375H62ZM50 285H170V307H50ZM110 285V375M243 310H339V385H243ZM231 295H351V317H231ZM291 295V385M110 284C53 242 63 306 110 284C155 306 171 244 110 284M291 295C234 253 244 317 291 295C336 317 352 255 291 295"/>'
    };
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    const paused = () => document.hidden || !!window.currentActiveExamId || window.isExamVisualItemsSuspended === true || document.body.classList.contains('exam-active');
    const quiet = () => motion.matches || window.EffectQualityManager?.getLuxuryPolicy?.().level === 'low' || document.body.classList.contains('wfx-low-power');
    const count = n => quiet() ? 0 : Math.max(0, Math.min(n, window.EffectQualityManager?.getRecommendedCount?.(n) ?? n));
    const keyOf = id => Object.keys(designs).find(k => id === `pet_plan4_${k}` || id === `pet_plan4_${k}_premium`);
    function ensureCSS() {
        let link = document.getElementById('plan4-css');
        if (!link) { link = document.createElement('link'); link.id = 'plan4-css'; link.rel = 'stylesheet'; link.href = CSS; document.head.append(link); }
        return link;
    }
    function scene(key) { return svg(art[key]); }
    function dust(n) { return many(count(n), i => `<i class="p4-dust" style="--i:${i};--x:${(i*37+3)%100}%;--y:${(i*23+11)%100}%"></i>`); }
    // Shadow DOM keeps item decoration separate from content and user theme styles.
    function host(key, cls, html, parent = document.body) {
        const e = document.createElement('div'); e.className = `p4-host ${cls}`; e.dataset.design = key; e.setAttribute('aria-hidden', 'true');
        const d = designs[key]; e.style.cssText = `--p4-accent:${d[2]};--p4-dark:${d[3]};--p4-gold:${d[4]};pointer-events:none!important;`;
        const shadow = e.attachShadow({ mode: 'open' });
        shadow.innerHTML = `<link rel="stylesheet" href="${CSS}"><div class="p4-root" style="visibility:hidden">${html}</div>`;
        const link = shadow.querySelector('link'), root = shadow.querySelector('.p4-root');
        link.onload = () => { if (e.isConnected) root.style.visibility = 'visible'; };
        parent.append(e); if (link.sheet) root.style.visibility = 'visible'; return e;
    }
    let pet = null, key = '', premium = false, world = null, aura = null, events = null, observer = null, flags = null, frame = 0, cooldown = 0, lastClick = -Infinity;
    let saved = {}, tagged = new Set(), transients = new Set(), timers = new Set();
    const immune = '.ui-theme-immune,.store-theme-locked,[data-theme-immune="true"],#virtual-pet-container';
    function markInterface() {
        if (!premium) return;
        document.querySelectorAll('.sidebar,.modal-content,.popup-content,.assignment-card,.stat-card,.dashboard-card').forEach(e => {
            if (e.closest(immune) || e.classList.contains('p4-surface')) return;
            e.classList.add('p4-surface'); tagged.add(e);
        });
    }
    function clearTransient() { transients.forEach(e => e.remove()); transients.clear(); timers.forEach(clearTimeout); timers.clear(); }
    function later(fn, ms) { const t = setTimeout(() => { timers.delete(t); fn(); }, ms); timers.add(t); }
    function transient(cls, html, ms) { const e = host(key, cls, html); transients.add(e); later(() => { e.remove(); transients.delete(e); }, ms); return e; }
    function hiddenPet() { return paused() || !pet?.isConnected || pet.parentElement.hidden || pet.parentElement.style.display === 'none'; }
    function sync() {
        if (!pet?.isConnected) { clearPet(); return; }
        const hidden = hiddenPet(), still = quiet();
        for (const e of [world, aura]) if (e) { e.hidden = hidden; e.shadowRoot.querySelector('.p4-root').classList.toggle('p4-still', still); }
        if (document.documentElement.classList.contains('p4-suspended') !== hidden) document.documentElement.classList.toggle('p4-suspended', hidden);
        if (hidden || still) clearTransient();
    }
    function clickAt(x, y) {
        if (!premium || hiddenPet() || quiet() || performance.now()-lastClick < 220) return false;
        lastClick = performance.now();
        const e = transient('p4-click', `<div class="p4-click-art">${scene(key)}</div>`, 1000); e.style.left = x+'px'; e.style.top = y+'px'; return true;
    }
    function ultimate() {
        if (!pet || hiddenPet() || quiet() || performance.now() < cooldown || pet.parentElement.dataset.petDragged === '1') return false;
        cooldown = performance.now() + (premium ? 16000 : 6000);
        if (premium) {
            const d = designs[key];
            const e = transient('p4-ultimate', `<div class="p4-curtain"></div><div class="p4-stage-art">${scene(key)}</div><div class="p4-stage-echo">${scene(key)}</div><div class="p4-title"><small>${d[0]}</small><strong>${d[1]}</strong><span>${d[5]}</span></div>${dust(22)}`, 6500);
            e.dataset.phase = 'summon'; later(() => { e.dataset.phase = 'reveal'; }, 1000); later(() => { e.dataset.phase = 'fade'; }, 4900);
        } else {
            const e = transient('p4-regular-burst', `<div class="p4-click-art">${scene(key)}</div>`, 1700);
            const rect = pet.getBoundingClientRect(); e.style.left = (rect.left+rect.width/2)+'px'; e.style.top = (rect.top+rect.height/2)+'px';
        }
        return true;
    }
    function clearPet() {
        events?.abort(); observer?.disconnect(); flags?.disconnect(); cancelAnimationFrame(frame); frame = 0; clearTransient(); world?.remove(); aura?.remove();
        tagged.forEach(e => e.classList.remove('p4-surface')); tagged.clear();
        document.documentElement.removeAttribute('data-p4-pet'); document.documentElement.classList.remove('p4-suspended');
        if (pet) { pet.classList.remove('p4-character'); for (const [k, v] of Object.entries(saved)) v === null ? pet.removeAttribute(k) : pet.setAttribute(k, v); }
        pet = world = aura = events = observer = flags = null; key = ''; premium = false; saved = {}; cooldown = 0; lastClick = -Infinity;
    }
    function mountPet(id) {
        clearPet(); const chosen = keyOf(id); if (!chosen) return false;
        ensureCSS(); pet = document.getElementById('virtual-pet-img'); if (!pet) return false;
        key = chosen; premium = id.endsWith('_premium'); saved = Object.fromEntries(['title','role','tabindex','aria-label'].map(k => [k,pet.getAttribute(k)]));
        pet.classList.add('p4-character'); pet.title = designs[key][1]; pet.setAttribute('aria-label', designs[key][0]+' — chạm để xem hiệu ứng'); pet.setAttribute('role','button'); pet.tabIndex = 0;
        events = new AbortController(); const opt = { signal: events.signal };
        aura = host(key, premium ? 'p4-aura' : 'p4-aura p4-regular', `<div class="p4-pet-seal">${scene(key)}</div><div class="p4-pet-floor"></div>`, pet.parentElement);
        if (premium) {
            document.documentElement.dataset.p4Pet = key;
            world = host(key, 'p4-world', `<div class="p4-edge-wash"></div><div class="p4-corner p4-left">${scene(key)}</div><div class="p4-corner p4-right">${scene(key)}</div><div class="p4-horizon"></div>${dust(18)}`);
            markInterface();
            document.addEventListener('pointerdown', e => { if (e.button === 0 && !e.target.closest?.('input,textarea,select,[contenteditable],#virtual-pet-container')) clickAt(e.clientX,e.clientY); }, opt);
        }
        pet.addEventListener('click', ultimate, opt);
        pet.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); ultimate(); } }, opt);
        window.addEventListener('effect-quality-change', sync, opt); document.addEventListener('visibilitychange', sync, opt); motion.addEventListener('change',sync,opt);
        observer = new MutationObserver(() => { if (!frame) frame = requestAnimationFrame(() => { frame = 0; sync(); markInterface(); }); }); observer.observe(document.body,{childList:true,subtree:true});
        flags = new MutationObserver(sync); flags.observe(document.body,{attributes:true,attributeFilter:['class']}); flags.observe(document.documentElement,{attributes:true,attributeFilter:['class']}); flags.observe(pet.parentElement,{attributes:true,attributeFilter:['style','hidden']});
        sync(); return true;
    }
    let effect = null, fxEvents = null, fxObserver = null;
    function clearEffect() { fxEvents?.abort(); fxObserver?.disconnect(); effect?.remove(); effect = fxEvents = fxObserver = null; }
    function mountEffect(k) {
        clearEffect(); if (!designs[k]) return false; ensureCSS();
        const parent = document.getElementById('global-effect-container'); if (!parent) return false;
        effect = host(k,'p4-weather',many(6,i=>`<div class="p4-weather-motif" style="--i:${i};--x:${(i*37+3)%94}%;--y:${(i*23+8)%83}%">${scene(k)}</div>`),parent);
        const update = () => { if (!effect?.isConnected) { clearEffect(); return; } effect.hidden = paused(); effect.shadowRoot.querySelector('.p4-root').classList.toggle('p4-still',quiet()); };
        fxEvents = new AbortController(); const opt = {signal:fxEvents.signal};
        window.addEventListener('effect-quality-change',update,opt); document.addEventListener('visibilitychange',update,opt); motion.addEventListener('change',update,opt);
        fxObserver = new MutationObserver(update); fxObserver.observe(document.body,{attributes:true,attributeFilter:['class']}); fxObserver.observe(document.documentElement,{attributes:true,attributeFilter:['class']}); fxObserver.observe(parent,{childList:true}); update(); return true;
    }
    function cardBackdrop(id) { const k = keyOf(id); if (!k) return ''; ensureCSS(); return `<div class="p4-card-art" aria-hidden="true">${scene(k)}</div>`; }
    function cardPresentation(id) { const d = designs[keyOf(id)]; return d ? [d[3],d[2],d[5]] : null; }
    window.Plan4Runtime = {supports:id=>!!keyOf(id),ensureCSS,mountPet,clearPet,mountEffect,clearEffect,ultimate,clickAt,cardBackdrop,cardPresentation};
})();
