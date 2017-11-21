const CACHE_NAME = 'cache_' + new Date().toISOString();
const { assets } = global.serviceWorkerOption
const DEBUG = true;

let assetsToCache = [...assets, '?utm_source=homescreen', '', 'index.html'];

// When the service worker is first added to a computer.
self.addEventListener('install', event => {
    // Perform install steps.
    if (DEBUG) {
      console.log('[SW] Install event')
    }
  
    // Add core website files to cache during serviceworker installation.
    event.waitUntil(
      global.caches
        .open(CACHE_NAME)
        .then(cache => {
          return cache.addAll(assetsToCache)
        })
        .then(() => {
          if (DEBUG) {
            console.log('Cached assets: main', assetsToCache)
          }
          return self.skipWaiting();
        })
        .catch(error => {
          console.error(error)
          throw error
        })
    )
});

self.addEventListener('activate', event => {
    if (DEBUG) {
        console.log('[SW] Activate event')
    }
    
    // Clean the cached static files if different
    event.waitUntil(
        global.caches.keys().then(cacheNames => {
            return Promise.all(
                    cacheNames.map(cacheName => {
                    // Delete the old caches                    
                    if (cacheName !== CACHE_NAME) {
                        console.log(`[SW] clear ${cacheName}`);
                        return global.caches.delete(cacheName)
                    }              
                })
            )
        })
    );
});


self.addEventListener('fetch', event => {
    const request = event.request;
    // Ignore not GET request.
    if (request.method !== 'GET') {
      if (DEBUG) { console.log(`[SW] Ignore non GET request ${request.method}`) }
      return;
    }

    const requestUrl = new URL(request.url);
    if (requestUrl.href.indexOf('sockjs-node') > -1) {
        // ignore in webpack dev-server
        console.log(`[SW] Ignore socksjs-node ${requestUrl.href}`)
        return;
    }    
    
    // Ignore different origin.
    if (requestUrl.origin !== location.origin) {
        if (DEBUG) {
            console.log(`[SW] Ignore different origin ${requestUrl.origin}`)
        }
        return
    }
    
    // Network(cache it), falling back to cache
    const promise = fetch(request)
        .then((response) => {
            return global.caches.open(CACHE_NAME)
            .then(function(cache) {
                // put it into the cache
                cache.put(request, response.clone());
                return response;
            });
        })
        .catch(() => global.caches.match(request) );
    event.respondWith(promise);
});
