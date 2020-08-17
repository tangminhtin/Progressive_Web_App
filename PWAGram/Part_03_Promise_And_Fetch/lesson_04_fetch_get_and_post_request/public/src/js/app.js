var deferredPrompt;

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

// promise
var promise = new Promise(function(resolve, reject) {
    // async code in javascript
    setTimeout(() => {
        // resolve('This is executed once the timer is done!');
        reject({code: 500, message: 'An error occurred!'});
        // console.log('This is executed once the timer is done!');
    }, 3000);
});

// fetch get request
fetch('http://httpbin.org/ip')
    .then(function(response) {
        console.log(response);
        return response.json();
    })
    .then(function(data) {
        console.log(data);
    })
    .catch(function(err) {
        console.log(err);
    });

// fetch post request
fetch('http://httpbin.org/post', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    mode: 'cors', // Access-Control-Allow-Origin
    body: JSON.stringify({message: 'Does this work?'})
})
    .then(function(response) {
        console.log(response);
        return response.json();
    })
    .then(function(data) {
        console.log(data);
    })
    .catch(function(err) {
        console.log(err);
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
