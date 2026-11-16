/*
 * The offline worker of Neja App. The build fills in the two values below
 * (see vite.config.ts) and writes the result as sw.js beside the app.
 *
 * It keeps a copy of the app on the device, so the app opens with no connection:
 * - the app's own files are copied when the worker is installed;
 * - the page itself comes from the network when there is one, so a new version
 *   is picked up, and from the copy when there is not;
 * - everything else comes from the copy first.
 * It never touches what the cook has saved: that lives in IndexedDB.
 */
const CACHE = "neja-app-1.1.4-74b1c9df40";
const FILES = [
  "./",
  "assets/CookModeView-0tWF7wnL.js",
  "assets/InstallSection-DA7f5O1i.js",
  "assets/NejaSettingsSection-YT6emzA0.js",
  "assets/NotificationsView-Casi9-pY.js",
  "assets/RecipeFormModal--Yo8TXml.js",
  "assets/ReportsView-C5dp9rKn.js",
  "assets/SettingsReportsCard-CZvL5hvO.js",
  "assets/SettingsView-T7vHHqkV.js",
  "assets/SystemSection-2yMTh-LU.js",
  "assets/createLucideIcon-CIaDJQzH.js",
  "assets/dist-CQRKs1TP.js",
  "assets/dist-DcBEYh1w.js",
  "assets/download-BtMZNFgC.js",
  "assets/index-D8upZ_8o.js",
  "assets/index-LftesyL-.css",
  "assets/input-tqrbPDPG.js",
  "assets/ocr-DzFdbQjL.js",
  "assets/recipeOps-R87EZarb.js",
  "assets/rolldown-runtime-C0FnF6B9.js",
  "assets/src-SuYvKHvm.js",
  "assets/upload-DJWrJknW.js",
  "icons/apple-touch-icon.png",
  "icons/favicon-48.png",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/maskable-512.png",
  "index.html",
  "logo-mark.webp",
  "manifest.webmanifest",
  "photos/beef.webp",
  "photos/breakfast.webp",
  "photos/chicken.webp",
  "photos/dessert.webp",
  "photos/pasta.webp",
  "photos/pork.webp",
  "photos/rice.webp",
  "photos/salad.webp",
  "photos/seafood.webp",
  "photos/soup.webp"
];

// A web host may mark its answers as varying with who asks ("Vary: Origin"). The page asks
// for its scripts in a different way than this worker did when it copied them, and the copy
// would then not be found. Every copy here is the app's own file, the same for every asker.
const ANY_ASKER = { ignoreVary: true };

// Fetched the first time they are used, then kept: large, and not needed to open the app.
const KEEP_WHEN_USED = ['/assets/', '/ocr/', '/photos/', '/icons/'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(FILES))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      // Copies of older versions of the app are let go.
      .then((keys) => Promise.all(keys.filter((key) => key.startsWith('neja-app-') && key !== CACHE).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  // Asking whether a newer version is out must reach the server, never a copy.
  if (url.pathname.endsWith('/version.json')) return;

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(CACHE).then((cache) => cache.put('./', copy));
          }
          return response;
        })
        .catch(() => caches.match('./', ANY_ASKER).then((page) => page || caches.match('index.html', ANY_ASKER)))
    );
    return;
  }

  event.respondWith(
    caches.match(request, ANY_ASKER).then(
      (copy) =>
        copy ||
        fetch(request).then((response) => {
          if (response.ok && KEEP_WHEN_USED.some((part) => url.pathname.includes(part))) {
            const kept = response.clone();
            caches.open(CACHE).then((cache) => cache.put(request, kept));
          }
          return response;
        })
    )
  );
});
