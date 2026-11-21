// Maintenance mode: replace all previously cached application pages with the pause notice.
const MAINTENANCE_HTML = "<!doctype html>\n<html lang=\"vi\">\n<head>\n  <meta charset=\"utf-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n  <meta name=\"robots\" content=\"noindex, nofollow\">\n  <meta name=\"theme-color\" content=\"#071426\">\n  <meta http-equiv=\"Cache-Control\" content=\"no-cache, no-store, must-revalidate\">\n  <meta name=\"description\" content=\"Wed đã tạm dừng. Hãy chờ đợi giáo viên sẽ cấp 1 wed mới\">\n  <title>Website đã tạm dừng</title>\n  <style>\n    *, *::before, *::after { box-sizing: border-box; }\n    html, body { margin: 0; min-height: 100%; }\n    body {\n      min-height: 100vh; min-height: 100dvh; display: grid; place-items: center;\n      padding: 24px; font-family: system-ui, -apple-system, \"Segoe UI\", Arial, sans-serif;\n      color: #f8fafc; background:\n      radial-gradient(ellipse 60% 50% at 16% 16%, rgba(56, 189, 248, .15), transparent),\n      radial-gradient(ellipse 60% 60% at 85% 85%, rgba(129, 140, 248, .16), transparent),\n      #071426;\n    }\n    main { width: min(100%, 620px); padding: clamp(32px, 7vw, 64px) clamp(24px, 6vw, 48px);\n      text-align: center; border-radius: 26px; background: rgba(15, 31, 55, .92);\n      border: 1px solid rgba(148, 163, 184, .18); box-shadow: 0 25px 80px rgba(0, 0, 0, .28);\n    }\n    .icon { display: grid; place-items: center; width: 76px; height: 76px;\n      margin: 0 auto 24px; border: 1px solid rgba(125, 211, 252, .35);\n      border-radius: 23px; background: rgba(56, 189, 248, .12); color: #7dd3fc;\n    }\n    .icon svg { width: 34px; height: 34px; }\n    .status { margin: 0 0 14px; font-size: 12px; font-weight: 800; letter-spacing: .14em;\n      text-transform: uppercase; color: #7dd3fc; }\n    h1 { margin: 0 0 18px; font-weight: 750; font-size: clamp(27px, 5vw, 40px);\n      line-height: 1.25; letter-spacing: -.03em; }\n    p.message { margin: 0; font-size: clamp(17px, 2.8vw, 20px); line-height: 1.8; color: #cbd5e1; }\n    .line { width: 70px; height: 3px; margin: 30px auto 0; border-radius: 99px; background: #38bdf8; }\n    @media (prefers-reduced-motion: no-preference) { main { animation: show .45s ease-out both; }\n      @keyframes show { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: none; } } }\n  </style>\n</head>\n<body>\n  <main role=\"main\" aria-labelledby=\"pause-title\">\n    <div class=\"icon\" aria-hidden=\"true\">\n      <svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n        <rect x=\"4\" y=\"4\" width=\"16\" height=\"16\" rx=\"4\"></rect><path d=\"M10 8v8M14 8v8\"></path>\n      </svg>\n    </div>\n    <p class=\"status\">Thông báo hệ thống</p>\n    <h1 id=\"pause-title\">Wed đã tạm dừng.</h1>\n    <p class=\"message\">Hãy chờ đợi giáo viên sẽ cấp 1 wed mới</p>\n    <div class=\"line\" aria-hidden=\"true\"></div>\n  </main>\n  <script>\n    if ('serviceWorker' in navigator) {\n      addEventListener('load', () => {\n        navigator.serviceWorker.register('./sw.js', { updateViaCache: 'none' }).catch(() => {});\n      });\n    }\n  </script>\n</body>\n</html>\n";
const RESPONSE_HEADERS = {
  'Content-Type': 'text/html; charset=utf-8',
  'Cache-Control': 'no-store, max-age=0, must-revalidate',
  'X-Robots-Tag': 'noindex, nofollow',
};
self.addEventListener('install', (event) => { event.waitUntil(self.skipWaiting()); });
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key =>
      key.startsWith('qlbt-') || key.startsWith('qlbt_')
    ).map(key => caches.delete(key)));
    await self.clients.claim();
    const windows = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    await Promise.all(windows.map(async client => {
      try {
        if (new URL(client.url).origin === self.location.origin && client.navigate) {
          await client.navigate(client.url);
        }
      } catch (_) { /* Browser may deny navigation for a closing tab. */ }
    }));
  })());
});
self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate' && new URL(event.request.url).origin === self.location.origin) {
    event.respondWith(new Response(MAINTENANCE_HTML, { status: 200, headers: RESPONSE_HEADERS }));
  }
});
