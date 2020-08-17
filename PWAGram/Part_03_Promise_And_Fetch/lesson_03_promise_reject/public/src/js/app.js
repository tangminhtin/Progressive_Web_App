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

// promise
var promise = new Promise(function(resolve, reject) {
    // async code in javascript
    setTimeout(() => {
        // resolve('This is executed once the timer is done!');
        reject({code: 500, message: 'An error occurred!'});
        // console.log('This is executed once the timer is done!');
    }, 3000);
});

// handler reject promise by using second argument
// promise
//     .then(function(text) {
//         return text;
//     }, function(err) {
//         // handler error of reject
//         console.log(err.code, err.message);
//     })
//     .then(function(newText) {
//         console.log(newText);
//     });

// handler reject promise by using catch
promise
    .then(function(text) {
        return text;
    })
    .then(function(newText) {
        console.log(newText);
    })
    .catch(function(err) {
        console.log(err.code, err.message);
    });

console.log('This is executed right after setTimeout()');
