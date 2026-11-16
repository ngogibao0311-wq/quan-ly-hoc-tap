/* Reuse the website's preview spinner without blocking navigation or inputs. */
(() => {
    'use strict';
    // The standalone item lab does not load common.css; keep the same preview spinner there.
    const style = document.createElement('style');
    style.textContent = '.app-loading-status .preview-spinner{width:34px;height:34px;border:4px solid #cbd5e1;border-top-color:#6366f1;border-radius:50%;animation:previewSpin .8s linear infinite}@keyframes previewSpin{to{transform:rotate(360deg)}}@media(prefers-reduced-motion:reduce){.app-loading-status .preview-spinner{animation:none}}';
    document.head.append(style);
    const pending = new Map();
    let panel;
    function render() {
        const labels = [...new Set([...pending.values()].filter(Boolean))];
        if (!labels.length) { panel?.remove(); panel = null; return; }
        if (!panel) {
            panel = document.createElement('div');
            panel.className = 'app-loading-status ui-theme-immune';
            panel.setAttribute('role', 'status');
            panel.setAttribute('aria-live', 'polite');
            panel.style.cssText = 'position:fixed;left:50%;top:12px;transform:translateX(-50%);z-index:2147483639;pointer-events:none;display:flex;align-items:center;gap:12px;padding:12px 18px;border-radius:14px;background:#fff;color:#334155;box-shadow:0 4px 24px #0003;max-width:calc(100vw - 32px);font:14px/1.5 Arial,sans-serif;';
            panel.innerHTML = '<span class="preview-spinner" aria-hidden="true" style="display:block;flex-shrink:0"></span><span></span>';
            document.body.append(panel);
        }
        panel.lastElementChild.textContent = 'Đang tải ' + labels.join(', ') + '…';
        panel.firstElementChild.style.animationPlayState = matchMedia('(prefers-reduced-motion: reduce)').matches ? 'paused' : 'running';
    }
    window.LoadingStatus = Object.freeze({begin(label) {
        const key = {}; pending.set(key, null);
        const timer = setTimeout(() => { if (pending.has(key)) { pending.set(key, label); render(); } }, 250);
        return () => { clearTimeout(timer); pending.delete(key); render(); };
    }});
})();
