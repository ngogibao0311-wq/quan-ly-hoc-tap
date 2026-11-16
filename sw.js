const APP_VERSION = '4.4.5';
const APP_BUILD = '20261116.password-session1';
const CACHE_VERSION = `qlbt-production-shell-v${APP_VERSION}-${APP_BUILD}-privacy2`;
const OFFLINE_CACHE = `${CACHE_VERSION}-offline`;
const RUNTIME_CACHE = `${CACHE_VERSION}-runtime`;
const OFFLINE_PAGE = './offline.html';
const MAX_RUNTIME_ENTRIES = 120;

function mayCacheResponse(response) {
    return !!response && response.ok && response.type !== 'opaque' &&
        !response.headers.has('Set-Cookie') &&
        !/(?:^|,)\s*(?:no-store|private|no-cache)(?:\s*(?:=|,|$))/i.test(response.headers.get('Cache-Control') || '') &&
        !response.headers.has('Vary');
}
async function rememberPublicResponse(cache, request, response) {
    if (!mayCacheResponse(response)) { await cache.delete(request); return; }
    await cache.put(request, response.clone());
    await pruneRuntimeCache();
}

self.addEventListener('install', event => {
    event.waitUntil((async () => {
        const cache = await caches.open(OFFLINE_CACHE);
        await cache.add(new Request(OFFLINE_PAGE, { cache: 'reload' }));
        await self.skipWaiting();
    })());
});

self.addEventListener('activate', event => {
    event.waitUntil((async () => {
        const names = await caches.keys();
        await Promise.all(
            names
                .filter(name => name.startsWith('qlbt-production-') && ![OFFLINE_CACHE, RUNTIME_CACHE].includes(name))
                .map(name => caches.delete(name))
        );
        await self.clients.claim();
    })());
});

async function pruneRuntimeCache() {
    const cache = await caches.open(RUNTIME_CACHE);
    const keys = await cache.keys();
    if (keys.length <= MAX_RUNTIME_ENTRIES) return;
    const overflow = keys.length - MAX_RUNTIME_ENTRIES;
    await Promise.all(keys.slice(0, overflow).map(request => cache.delete(request)));
}

async function buildFallbackResponse(mode, failedUrl, status) {
    const cached = await (await caches.open(OFFLINE_CACHE)).match(OFFLINE_PAGE, { ignoreSearch: true });
    if (!cached) {
        return new Response(
            '<!doctype html><meta charset="utf-8"><title>Lỗi hệ thống</title><h1>Không thể tải trang</h1><p>Không có trang dự phòng trong cache.</p>',
            { status: status || 503, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
        );
    }

    let html = await cached.text();
    const injection = `<script>window.__APP_SW_ERROR_MODE__=${JSON.stringify(mode)};window.__APP_FAILED_URL__=${JSON.stringify(failedUrl).replace(/</g, '\\u003c')};<\/script>`;
    html = html.replace('</head>', injection + '</head>');

    return new Response(html, {
        status: status || (mode === '404' ? 404 : 503),
        statusText: mode === '404' ? 'Not Found' : 'Service Unavailable',
        headers: {
            'Content-Type': 'text/html; charset=utf-8',
            'Cache-Control': 'no-store',
            'X-App-Fallback': mode
        }
    });
}

async function networkFirstNavigation(request) {
    // Account pages never reuse a document from a previous login, even offline.
    try { return await fetch(request); }
    catch (_) { return buildFallbackResponse('offline', request.url, 503); }
}

async function networkFirstStatic(request) {
    const cache = await caches.open(RUNTIME_CACHE);

    try {
        const response = await fetch(request);

        if (response && response.ok) {
            await rememberPublicResponse(cache, request, response);

            return response;
        }

        // 404/410/5xx không xóa khả năng dùng bản JS/CSS đã cache tốt.
        if (
            response &&
            (
                response.status === 404 ||
                response.status === 410 ||
                response.status >= 500
            )
        ) {
            const cached = await cache.match(request);

            if (cached) {
                return cached;
            }
        }

        return response;
    } catch (error) {
        const cached = await cache.match(request);

        if (cached) {
            return cached;
        }

        throw error;
    }
}

async function staleWhileRevalidate(request) {
    const cache = await caches.open(RUNTIME_CACHE);
    const cached = await cache.match(request);
    const networkPromise = fetch(request)
        .then(response => {
            if (response) rememberPublicResponse(cache, request, response).catch(() => {});
            return response;
        })
        .catch(() => null);

    if (cached) {
        // Trả cache ngay, đồng thời networkPromise âm thầm làm mới cache.
        return cached;
    }

    return (await networkPromise) || Response.error();
}

self.addEventListener('fetch', event => {
    const request = event.request;
    if (request.method !== 'GET') return;

    const url = new URL(request.url);
    // Authenticated or capability-bearing resources must never enter the shared shell cache.
    if (request.headers.has('Authorization') || request.cache === 'no-store' ||
        /(?:^|\/)(?:files|economy|transaction-shield|student-study-data|account-access)(?:\/|$)/.test(url.pathname) ||
        [...url.searchParams.keys()].some(key => /^(?:token|access_token|id_token|auth|signature)$/i.test(key))) return;

    // Không can thiệp Firebase, Cloudflare R2, CDN hoặc API bên ngoài.
    // Dữ liệu đám mây phải luôn đi trực tiếp tới dịch vụ gốc.
    if (url.origin !== self.location.origin) return;

    if (request.mode === 'navigate') {
        event.respondWith(networkFirstNavigation(request));
        return;
    }

    const destination = request.destination;

    if (destination === 'script' || destination === 'style' || destination === 'worker') {
        event.respondWith(networkFirstStatic(request));
        return;
    }

    if (destination === 'image' || destination === 'font') {
        event.respondWith(staleWhileRevalidate(request));
    }
});

self.addEventListener('message', event => {
    const type = event.data && event.data.type;

    if (type === 'SKIP_WAITING') {
        self.skipWaiting();
        return;
    }

    if (type === 'CLEAR_RUNTIME_CACHE') {
        event.waitUntil(caches.delete(RUNTIME_CACHE));
        return;
    }

    if (type === 'PING') {
        const payload = {
            type: 'PONG',
            requestId: event.data && event.data.requestId
                ? event.data.requestId
                : '',
            appVersion: APP_VERSION,
            build: APP_BUILD,
            cacheVersion: CACHE_VERSION
        };

        // Health Center 2.0 dùng MessageChannel để nhận đúng phản hồi
        // của lần quét hiện tại. Đây chỉ là đọc metadata, không đổi cache.
        if (event.ports && event.ports[0]) {
            event.ports[0].postMessage(payload);
            return;
        }

        // Giữ tương thích với client PING cũ.
        if (event.source) {
            event.source.postMessage(payload);
        }
    }
});
