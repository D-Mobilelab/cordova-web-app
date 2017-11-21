import runtime from 'serviceworker-webpack-plugin/lib/runtime';
import App from './App';
import fetchConfig from './fetcher';

function startApp() {
    // fetchConfig();
    const myApp = new App('Up and running');
    myApp.render();

    if ('serviceWorker' in navigator) {
        if(__ENV__ !== 'development') { 
            const registration = navigator.serviceWorker.register('sw.js')
                .then(function(reg) {
                    // registration worked
                    console.log('Registration succeeded. Scope is ' + reg.scope);
                    return reg;
                }).catch(function(error) {
                    // registration failed
                    console.log('Registration failed with ' + error);
                });
        }
        // registration.unregister()<Promise>
    }
}

if (APP_ENV === 'hybrid') {
    document.addEventListener('deviceready', startApp);
} else {
    startApp();
}
