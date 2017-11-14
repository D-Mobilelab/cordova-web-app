self.addEventListener('install', event => {
    console.log("installation");
});
  
  // The activate handler takes care of cleaning up old caches.
self.addEventListener('activate', event => {
    console.log("activation");
});

// The fetch handler serves responses for same-origin resources from a cache.
// If no response is found, it populates the runtime cache with the response
// from the network before returning it to the page.
self.addEventListener('fetch', event => {
    console.log("fetch", event);
});