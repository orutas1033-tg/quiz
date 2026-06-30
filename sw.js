/* ============================================================================
   サービスワーカー（Service Worker）
   ----------------------------------------------------------------------------
   役割：アプリ一式を端末にキャッシュし、2回目以降はオフラインでも起動できる
        ようにする。ブラウザのバックグラウンドで動く小さなプログラム。
   ----------------------------------------------------------------------------
   ★アプリを更新したとき（index.html や lib を差し替えたとき）は、
     下の CACHE のバージョン名（v1 → v2 ...）を必ず上げてください。
     これが古いキャッシュを捨てて新しい内容を読み込ませる合図になります。
   ============================================================================ */

const CACHE = "quiz-app-v6";   // ★更新時はここのバージョンを上げる

// オフライン起動に必要なファイル一式（先読みキャッシュする対象）
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./papaparse.min.js",
  "./xlsx.full.min.js",
  "./icon-192.png",
  "./icon-512.png",
  "./apple-touch-icon.png",
  "./sample.csv",
  "./sample_choices.csv"
];

// --- インストール時：必要ファイルをまとめてキャッシュ ---
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();   // 新しいSWをすぐ有効化
});

// --- 有効化時：古いバージョンのキャッシュを掃除 ---
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// --- 取得時：キャッシュ優先（無ければネットワーク） ---
//   ページ遷移(navigate)でネットに繋がらない場合は index.html を返す。
self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;   // 書き込み系は対象外
  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;       // キャッシュにあればそれを返す
      return fetch(req).catch(() => {  // 無ければネット。失敗時はフォールバック
        if (req.mode === "navigate") return caches.match("./index.html");
      });
    })
  );
});
