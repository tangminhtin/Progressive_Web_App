var deferredPrompt;

// check if browser not support Promise then use local promise.js file
if(!window.Promise) {
    window.Promise = Promise;
}

// check browser is supported service worker or not
if('serviceWorker' in navigator) {
    // register new service worker
    navigator.serviceWorker
        .register('/sw.js')
        .then(function() {
            console.log('Service Worker Registered!');
        })
        // handler reject promise service worker 
        .catch(function(err) { 
            console.log(err);
        });
}

// chrome won't show the banner
window.addEventListener('beforeinstsllprompt', function(event) {
    console.log('beforeinstsllprompt fired');
    deferredPrompt = event.preventDefault();
    return false;
});
