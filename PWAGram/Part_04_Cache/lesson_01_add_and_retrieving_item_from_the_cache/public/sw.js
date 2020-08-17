// access the service worker in background process and excute event listener
self.addEventListener('install', function(event) {
    console.log('[Service Worker] Installing Service Worker ...', event);

    // load all asset before stop service worker and store into caches
    event.waitUntil(
        caches.open('static')
            .then(function(cache) {
                console.log('[Service Worker] Pre-caching App Shell');
                cache.add('/src/js/app.js');
            })
    )
});

// listener activate event
self.addEventListener('activate', function(event) {
    console.log('[Service Worker] Activating Service Worker ...', event);
    return self.clients.claim();l
});

// listener fetch event
self.addEventListener('fetch', function(event) {
    // retrieving items from the cache
    event.respondWith(
        // request are your key of cache
        caches.match(event.request)
            .then(function(response) {
                // if request from cache exist then return response when offline
                if(response) {
                    return response;
                } else {
                    // continue request if network is connect
                    return fetch(event.request);
                }
            })

    );
});
