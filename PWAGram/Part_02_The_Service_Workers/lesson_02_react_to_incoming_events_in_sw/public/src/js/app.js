var deferredPrompt;

// check browser is supported service worker or not
if('serviceWorker' in navigator) {
    // register new service worker
    navigator.serviceWorker
        .register('/sw.js')
        .then(function() {
            console.log('Service Worker Registered!');
        });
}

// chrome won't show the banner
window.addEventListener('beforeinstsllprompt', function(event) {
    console.log('beforeinstsllprompt fired');
    deferredPrompt = event.preventDefault();
    return false;
});
