const FILLER_LENGTH = 55;
const MAX_PAYLOAD_LENGTH = 40;
function log(str, payload) {
  const filler = '-'.repeat(FILLER_LENGTH - str.length);
  if (!payload) return console.log(`[SW] ${filler}> ${str}`);
  if (typeof payload !== 'string') return console.log(`[SW] ${filler}> ${str} `, payload);
  if (payload.length < MAX_PAYLOAD_LENGTH) return console.log(`[SW] ${filler}> ${str} `, payload);
  const payloadStr = payload.substr(payload.length - MAX_PAYLOAD_LENGTH, 1000);
  return console.log(`[SW] ${filler}> ${str} `, payloadStr);
}

const cacheFilesBefore = [// icons needed early (in manifest or favicons)
'./assets/icons/icon_32x32.png', './assets/icons/icon_16x16.png', './assets/icons/icon_192x192.png', './assets/icons/icon_256x256.png', './assets/icons/icon_512x512.png'];
const cacheFilesAfter = [// js
'./js/prod/client.js', './js/prod/app.js', './js/prod/sign.js', './js/prod/www.js', './js/prod/sw.js', // google
// 'https://www.googletagmanager.com/gtag/js?id=UA-104340277-2',
// 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js',
// 'https://fonts.googleapis.com/css?family=Source+Sans+Pro',
// 'https://www.google-analytics.com/analytics.js',
// icons
'./assets/icons/icon_57x57.png', './assets/icons/icon_60x60.png', './assets/icons/icon_72x72.png', './assets/icons/icon_76x76.png', './assets/icons/icon_114x114.png', './assets/icons/icon_120x120.png', './assets/icons/icon_144x144.png', './assets/icons/icon_152x152.png', './assets/icons/icon_180x180.png', // splash
'./assets/splash/screen_640x1136.png', './assets/splash/screen_750x1334.png', './assets/splash/screen_1125x2436.png', './assets/splash/screen_1242x2208.png', './assets/splash/screen_828x1792.png', './assets/splash/screen_1242x2688.png', './assets/splash/screen_1536x2048.png', './assets/splash/screen_1668x2224.png', './assets/splash/screen_1668x2388.png', './assets/splash/screen_2048x2732.png'];

/* global self */
let cache;
function onInstall(e) {
  e.waitUntil(self.caches.open(self.cacheName).then(cache_ => {
    cache = cache_;
    log('Installed', cache);
    return cache.addAll(cacheFilesBefore);
  }).then(() => {
    return self.skipWaiting();
  }).then(() => {
    return cache.addAll(cacheFilesAfter);
  }).catch(err => {
    log('Install: Error', err);
  }));
}

/* global self */
function onActivate(e) {
  e.waitUntil(self.caches.keys().then(cacheNames => {
    log('Activated');
    return Promise.all(cacheNames.filter(cacheName => cacheName !== self.cacheName).map(cacheName => {
      log('Removing cached files from ', cacheName);
      self.caches.delete(cacheName);
    }));
  }).then(() => {
    log('Claiming clients');
    return self.clients.claim();
  }));
}

/* global self */
let cache$1;
function onFetch(e) {
  const url = e.request.url;
  const destination = e.request.destination;
  log('Request Destination', destination);

  switch (destination) {
    case 'style':
    case 'script':
    case 'manifest':
    case 'document':
    case 'font':
    case 'image':
      {
        log('Fetching cache then network', url);
        e.respondWith(self.caches.open(self.cacheName).then(cache_ => {
          cache$1 = cache_;
          return cache$1.match(e.request);
        }).then(cachedResponse => {
          if (cachedResponse) {
            log('Serving from cache', cachedResponse.url);
            return cachedResponse;
          }

          return self.fetch(e.request);
        }).then(networkResponse => {
          log('Catching', url);
          e.waitUntil(cache$1.put(e.request, networkResponse.clone()));
          return networkResponse;
        }).catch(err => {
          log('Fetch error', err);
        }));
        return;
      }

    default:
      {
        // All `XMLHttpRequest` or `fetch()` calls where
        // `Request.destination` is the empty string default value
        log('Fetching network only', url);
        e.respondWith(self.fetch(e.request));
        return;
      }
  }
}

/* global self */
self.cacheName = 'v1';
self.addEventListener('install', onInstall);
self.addEventListener('activate', onActivate);
self.addEventListener('fetch', onFetch);
