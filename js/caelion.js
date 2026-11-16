(() => {
    'use strict';
    const id = 'pet_caelion_premium';
    const images = ['Caelion1.png', 'Caelion2.png'].map(name => 'assets/Premium/2%20m%E1%BA%B7t/' + name + '?v=1');
    const faces = [
        {label:'Ánh Sáng', title:'Quang Minh Thiên Dực', text:'Người gìn giữ ranh giới bình minh, đánh thức những vì sao đang ngủ.', skill:'Bình Minh Khai Thiên'},
        {label:'Bóng Tối', title:'Dạ Ảnh Huyền Dực', text:'Người canh giữ màn đêm, thu những ánh sao lạc vào đôi cánh huyền ảnh.', skill:'Dạ Vực Tinh Môn'}
    ];
    const look = {id, type:'pet', price:24000, luxuryOnly:true, isLocked:true, name:'Caelion', tag:'Đặc biệt', image:images[0], value:images[0], disableClickEffect:true};
    const styleUrl = 'css/caelion.css?v=20261115.caelion4';
    let selected = 0, mounted, timer, lastPhase, account, serverSample, cooldown = 0;
    const effects = new Set(), assets = [];
    // Anchor server time to a monotonic clock so changing the device clock cannot jump the cycle.
    const clock = () => serverSample ? serverSample.at + performance.now() - serverSample.tick : Date.now();
    const usable = item => Boolean(item && item.id === id && (!item.isTrial || Number(item.trialExpiry) > clock()));
    const active = item => usable(item) && item.isEquipped === true;
    const cycleStart = cycle => Number.isFinite(cycle?.start) && cycle.start >= 0 ? cycle.start : 0;
    const phase = (cycle, now) => (Number(cycle?.initial === 1) + Math.floor(Math.max(0, now - cycleStart(cycle)) / 60_000)) % 2;
    const selectedFace = () => selected;
    function ensureStyle() {
        const existing = document.getElementById('caelion-style');
        if (existing) return existing;
        const link = document.createElement('link');
        Object.assign(link,{id:'caelion-style', rel:'stylesheet', href:styleUrl});
        link.addEventListener('error',() => link.remove(),{once:true});
        document.head.append(link);
        return link;
    }
    function removeEffect(effect) {
        const focused = effect.node.contains(document.activeElement);
        clearTimeout(effect.timeout);
        effect.node.remove();
        effects.delete(effect);
        if (focused && mounted?.pet.isConnected) mounted.pet.focus();
    }
    function clearEffects() {
        for (const effect of effects) removeEffect(effect);
    }
    function setTheme(index) {
        const root = document.documentElement, enabled = index !== null;
        if (root.dataset.caelionActive === (enabled ? String(index) : undefined) && root.classList.contains('caelion-equipped') === enabled) return;
        if (enabled) root.dataset.caelionActive = String(index);
        else root.removeAttribute('data-caelion-active');
        root.classList.toggle('caelion-equipped',enabled);
        // CampusDesign recognizes equipped classes and yields its default palette.
        window.CampusDesign?.syncPalette();
    }
    function clear() {
        clearTimeout(timer);
        clearEffects();
        if (!mounted) return;
        mounted.events.abort();
        mounted.detachClock?.();
        mounted.aura.remove();
        mounted.world.remove();
        mounted.pet.classList.remove('caelion-pet', 'caelion-paused', 'caelion-missing');
        mounted.image.classList.remove('caelion-missing');
        mounted.pet.removeAttribute('data-caelion-face');
        for (const [name, value] of Object.entries(mounted.attributes)) {
            if (value === null) mounted.pet.removeAttribute(name);
            else mounted.pet.setAttribute(name,value);
        }
        setTheme(null);
        mounted = null;
        serverSample = undefined;
    }
    function currentItem() {
        // Trial validity is checked against server time before any visual is enabled.
        return window.myInventory?.find?.(item => item?.id === id && item.isEquipped === true && (!serverSample || usable(item)));
    }
    const paused = () => document.hidden || window.isExamVisualItemsSuspended || Boolean(window.currentActiveExamId);
    function sync() {
        clearTimeout(timer);
        if (!mounted) return;
        const item = currentItem();
        if (!item || !mounted.pet.isConnected || window.isStudentStoreGameAccessEnabled?.() === false) { clear(); return; }
        const waiting = !serverSample || !mounted.style.sheet;
        mounted.pet.classList.toggle('caelion-paused', Boolean(paused() || waiting));
        mounted.world.hidden = mounted.aura.hidden = Boolean(paused() || waiting);
        if (paused() || waiting) {
            clearEffects();
            mounted.pet.setAttribute('aria-disabled','true');
            setTheme(null);
            mounted.pet.setAttribute('title', !serverSample ? 'Đang đồng bộ giờ máy chủ…' : 'Đang tải giao diện Caelion…');
            return;
        }
        const now = clock(), cycle = item.caelionCycle || {start:item.purchaseTime}, index = phase(cycle, now);
        if (lastPhase !== index) {
            clearEffects();
            lastPhase = index;
            mounted.image.src = images[index];
            mounted.image.alt = 'Caelion · ' + faces[index].label;
            mounted.pet.dataset.caelionFace = String(index);
            mounted.pet.setAttribute('aria-label', 'Dùng chiêu ' + faces[index].skill);
        }
        setTheme(index);
        mounted.world.dataset.face = String(index);
        mounted.world.dataset.quality = window.EffectQualityManager?.getLuxuryPolicy?.()?.level || 'high';
        mounted.world.dataset.reduced = String(mounted.motion.matches);
        mounted.aura.dataset.face = String(index);
        mounted.aura.dataset.quality = mounted.world.dataset.quality;
        mounted.aura.dataset.reduced = mounted.world.dataset.reduced;
        positionAura();
        const elapsed = Math.max(0, now - cycleStart(cycle));
        const expiry = item.isTrial ? Number(item.trialExpiry) - now : Infinity;
        const remaining = Math.max(0, Math.ceil((cooldown - performance.now()) / 1000));
        mounted.pet.setAttribute('aria-disabled', String(remaining > 0));
        mounted.pet.setAttribute('title', remaining ? 'Chiêu đang hồi phục' : faces[index].skill);
        timer = setTimeout(sync, Math.max(1, Math.min(expiry, 1000 - elapsed % 1000)));
        for (const label of document.querySelectorAll('[data-caelion-active-label]')) label.textContent = 'Đang dùng ' + faces[index].label;
    }
    function positionAura() {
        if (!mounted || mounted.aura.hidden) return;
        const box = mounted.pet.getBoundingClientRect();
        Object.assign(mounted.aura.style, {left:(box.left+box.width/2)+'px',top:(box.top+box.height/2)+'px',
            width:Math.min(440,Math.max(140,box.width*1.6))+'px',height:Math.min(480,Math.max(180,box.height*1.35))+'px'});
    }
    function emit(x, y, special, trail = false) {
        if (!mounted || paused() || !serverSample || !mounted.style.sheet || lastPhase == null || !currentItem()) return false;
        const reduced = mounted.motion.matches;
        const level = window.EffectQualityManager?.getLuxuryPolicy?.()?.level;
        const low = level === 'low';
        if (!special && (reduced || (trail && low) || effects.size >= (trail ? 6 : 10))) return false;
        if (special) clearEffects();
        const node = document.createElement('div');
        node.className = 'caelion-fx' + (special ? ' caelion-ultimate' : trail ? ' caelion-trail' : ' caelion-click');
        node.dataset.face = String(lastPhase);
        node.dataset.low = String(low);
        node.dataset.reduced = String(reduced);
        if (special) {
            for (const name of ['horizon','core','iris','wave','wave-secondary','rays']) {
                const layer = document.createElement('div'); layer.className = 'caelion-' + name;
                layer.setAttribute('aria-hidden','true'); node.append(layer);
            }
            node.setAttribute('role','status');
            node.setAttribute('aria-label',faces[lastPhase].skill);
            const close = document.createElement('button');
            close.type = 'button'; close.className = 'caelion-cinema-close'; close.textContent = 'Đóng · Esc';
            close.addEventListener('click',clearEffects);
            node.append(close);
        } else {
            node.setAttribute('aria-hidden','true');
            node.style.left = x + 'px'; node.style.top = y + 'px';
            if (!trail && !low) for (const kind of ['seal','echo','flare']) {
                const layer = document.createElement('span'); layer.className = 'caelion-click-' + kind; node.append(layer);
            }
        }
        if (!reduced) for (let i = 0, count = trail ? level === 'medium' ? 3 : 6 : low ? 6 : level === 'medium' ? 16 : 32; i < count; i++) {
            const feather = document.createElement('i');
            feather.style.setProperty('--angle', (i * 360 / count) + 'deg');
            feather.style.setProperty('--delay', special ? (i % 5) * .12 + 's' : '0s');
            feather.style.setProperty('--distance', (special ? 160 + i % 4 * 55 : 30 + i % 3 * 15) + 'px');
            feather.style.setProperty('--lane', (i - 2.5) + '');
            feather.setAttribute('aria-hidden','true');
            node.append(feather);
        }
        document.body.append(node);
        const effect = {node};
        effects.add(effect);
        effect.timeout = setTimeout(() => removeEffect(effect), special ? low || reduced ? 2000 : 4800 : trail ? 650 : 950);
        return true;
    }
    function mount(pet, image) {
        clear();
        if (!pet || !image || !currentItem()) return;
        const style = ensureStyle();
        if (!assets.length) for (const url of images) { const img = new Image(); img.src = url; assets.push(img); }
        const uid = window.firebase?.auth?.().currentUser?.uid;
        if (account !== uid) { account = uid; cooldown = 0; }
        const events = new AbortController(), options = {signal:events.signal};
        const aura = document.createElement('div'), world = document.createElement('div');
        aura.className = 'caelion-aura'; aura.setAttribute('aria-hidden','true'); aura.hidden = true;
        world.className = 'caelion-world'; world.setAttribute('aria-hidden','true');
        for (let i=0;i<60;i++) {
            const mote = document.createElement('i');
            mote.style.setProperty('--x', ((i * 37 + 7) % 100) + '%');
            mote.style.setProperty('--y', ((i * 23 + 11) % 100) + '%');
            mote.style.setProperty('--delay', (-i * 1.37) + 's');
            mote.style.setProperty('--duration', (9 + i % 5 * 2) + 's');
            mote.style.setProperty('--angle', (i * 20) + 'deg');
            world.append(mote);
        }
        for (const kind of ['meridian','meridian-cross','nebula','lattice']) {
            const layer = document.createElement('div'); layer.className = 'caelion-sky-' + kind; world.append(layer);
        }
        for (let i=0;i<20;i++) {
            const shard = document.createElement('i'); shard.style.setProperty('--angle',(i*18)+'deg');
            shard.style.setProperty('--delay',(-i*.35)+'s'); aura.append(shard);
        }
        for (const kind of ['halo','orbit','plinth','wings']) {
            const layer = document.createElement('div'); layer.className = 'caelion-aura-' + kind; aura.append(layer);
        }
        world.hidden = true;
        const attributes = Object.fromEntries(['role','tabindex','aria-label','aria-disabled','title'].map(name => [name,pet.getAttribute(name)]));
        const motion = matchMedia('(prefers-reduced-motion: reduce)');
        mounted = {pet,image,events,aura,world,attributes,motion,style};
        document.body.append(world,aura);
        style.addEventListener('load',sync,options);
        style.addEventListener('error',() => { if (mounted) { clearEffects(); pet.setAttribute('title','Không tải được giao diện Caelion. Tháo và trang bị lại để thử lại.'); style.remove(); } },options);
        lastPhase = undefined;
        pet.classList.add('caelion-pet');
        pet.tabIndex = 0;
        pet.setAttribute('role','button');
        const ultimate = () => {
            sync();
            if (paused() || performance.now() < cooldown || !currentItem()) return;
            const box = pet.getBoundingClientRect();
            if (emit(box.left + box.width / 2, box.top + box.height / 2, true)) { cooldown = performance.now() + 12_000; sync(); }
        };
        pet.addEventListener('click', ultimate, options);
        pet.addEventListener('keydown', event => {
            if (!event.repeat && (event.key === 'Enter' || event.key === ' ')) { event.preventDefault(); ultimate(); }
        }, options);
        document.addEventListener('pointerdown', event => {
            if (event.isPrimary !== false && event.button === 0 && !pet.contains(event.target) && !event.target.closest?.('.caelion-ultimate')) emit(event.clientX,event.clientY,false);
        }, {signal:events.signal,passive:true,capture:true});
        let lastTrail = -Infinity;
        document.addEventListener('pointermove', event => {
            if (paused()) return;
            positionAura();
            if (event.pointerType !== 'mouse' || event.buttons) return;
            const now = performance.now();
            const interval = window.EffectQualityManager?.getLuxuryPolicy?.()?.level === 'medium' ? 90 : 45;
            if (now - lastTrail < interval) return;
            if (emit(event.clientX,event.clientY,false,true)) lastTrail = now;
        }, {signal:events.signal,passive:true});
        document.addEventListener('visibilitychange', sync, options);
        document.addEventListener('keydown', event => { if (event.key === 'Escape') clearEffects(); }, options);
        const refreshQuality = () => { clearEffects(); sync(); };
        motion.addEventListener('change',refreshQuality,options);
        window.addEventListener('effect-quality-change', refreshQuality, options);
        window.addEventListener('pagehide', () => { clearTimeout(timer); clearEffects(); world.hidden = true; aura.hidden = true; setTheme(null); }, options);
        window.addEventListener('pageshow', sync, options);
        window.addEventListener('resize',positionAura,options);
        document.addEventListener('scroll',positionAura,{signal:events.signal,passive:true,capture:true});
        if (typeof db !== 'undefined') {
            const offsetRef = db.ref('.info/serverTimeOffset');
            const updateClock = snapshot => {
                const offset = snapshot.val();
                if (!events.signal.aborted && Number.isFinite(offset)) { serverSample = {at:Date.now() + offset,tick:performance.now()}; sync(); }
            };
            mounted.detachClock = () => offsetRef.off('value',updateClock);
            offsetRef.on('value',updateClock,() => {
                if (!events.signal.aborted) { serverSample = undefined; sync(); }
            });
        }
        image.addEventListener('error', () => image.classList.add('caelion-missing'),options);
        image.addEventListener('load', () => image.classList.remove('caelion-missing'),options);
        sync();
    }
    function decorate(card, item, inventory = false) {
        if (!card || card.classList.contains('caelion-card')) return;
        ensureStyle();
        card.classList.add('caelion-card');
        const title = card.querySelector('h3, h4, [data-caelion-title]');
        const art = card.querySelector('.luxury-unified-character, img');
        if (!art) return;
        const toggle = document.createElement('button'), summary = document.createElement('p');
        toggle.type = 'button'; toggle.className = 'caelion-toggle';
        summary.className = 'caelion-summary';
        (title?.parentElement || card).append(summary);
        card.append(toggle);
        function draw() {
            const face = faces[selected];
            card.dataset.caelionFace = String(selected);
            art.src = images[selected];
            art.alt = 'Caelion · ' + face.label;
            if (title) title.textContent = face.title;
            const intro = card.querySelector('.luxury-unified-intro');
            if (intro) intro.textContent = face.text;
            summary.textContent = face.label + ' · ' + face.skill + '. Mua một lần, sở hữu cả hai trạng thái. Đổi mỗi 60 giây khi trang bị.';
            toggle.textContent = selected === 0 ? '☾ Xem Bóng Tối' : '☀ Xem Ánh Sáng';
        }
        toggle.addEventListener('click', event => { event.stopPropagation(); selected = 1-selected; draw(); });
        toggle.addEventListener('keydown', event => event.stopPropagation());
        if (usable(item)) {
            const label = document.createElement('p');
            label.className = 'caelion-ownership';
            label.textContent = active(item) ? 'Đang dùng ' + faces[phase(item.caelionCycle || {start:item.purchaseTime},clock())].label : 'Đã sở hữu cả hai trạng thái';
            if (active(item)) label.dataset.caelionActiveLabel = '';
            summary.after(label);
        }
        if (inventory) card.dataset.caelionInventory = '';
        draw();
    }
    function addBagCard(container, item) {
        if (!usable(item)) return;
        const card = document.createElement('article');
        card.className = 'caelion-bag-card';
        const art = document.createElement('div'), image = document.createElement('img');
        art.className = 'luxury-unified-visual';
        art.append(image);
        const info = document.createElement('div'), title = document.createElement('h3');
        const button = document.createElement('button');
        button.type = 'button';
        button.textContent = active(item) ? 'Tháo Caelion' : 'Trang bị Caelion';
        button.addEventListener('click', async () => {
            button.disabled = true;
            const shouldEquip = !currentItem();
            try {
                const result = await (shouldEquip ? StoreManager.applyItem(id) : StoreManager.unapplyItem(id));
                if (result) await window.renderStudentBag?.();
            } finally { button.disabled = false; }
        });
        info.append(title,button);
        card.append(art,info);
        decorate(card,item,true);
        container.prepend(card);
    }
    window.Caelion = Object.freeze({id, look, phase, selectedFace, mount, clear, decorate, addBagCard});
})();
