// store cache
const CACHE_STATIC_NAME = "static";
const CACHE_DYNAMIC_NAME = "dynamic";

// listener event install
self.addEventListener("install", (evt) => {
  console.log("[Service Worker] Installing...", evt);
  // store static files into cache
  evt.waitUntil(
    caches.open(CACHE_STATIC_NAME).then((cache) => {
      cache.addAll([
        "/",
        "/index.html",
        "/src/css/app.css",
        "/src/css/main.css",
        "/src/js/main.js",
        "/src/js/material.min.js",
        "https://fonts.googleapis.com/css?family=Roboto:400,700",
        "https://fonts.googleapis.com/icon?family=Material+Icons",
        "https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css",
      ]);
    })
  );
});

// listener event activate
self.addEventListener("activate", (evt) => {
  console.log("[Service Worker] Activating...", evt);
  // activating service
  evt.waitUntil(
    // loop key of caches to remove old cache
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_STATIC_NAME && key !== CACHE_DYNAMIC_NAME) {
            console.log("Remove, ", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// listener event fetch
self.addEventListener('fetch', evt => {
    evt.respondWith(
        // request response from cache
        caches.match(evt.request)
            .then((response) => {
                // if response already in cache, then return response
                if (response) {
                    return response;
                } else {
                    // otherwise fetch request
                    return fetch(evt.request)
                        .then((res) => {
                            // after response of request, then store and return it into cache
                            return caches.open(CACHE_DYNAMIC_NAME)
                                .then((cache) => {
                                    // put new key of request and value into cache
                                    cache.put(evt.request.url, res.clone());
                                    return res;
                                });
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                }
            })
    );
})
