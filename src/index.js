import runtime from 'serviceworker-webpack-plugin/lib/runtime';
import App from './App';
import fetchConfig from './fetcher';

function startApp() {
    // fetchConfig();
    const myApp = new App('Up and running');
    myApp.render();

    if ('serviceWorker' in navigator) {
        if(__ENV__ !== 'development') { 
            const registration = runtime.register();
        }
        // registration.unregister()<Promise>
    }
}

if (APP_ENV === 'hybrid') {
    document.addEventListener('deviceready', startApp);
} else {
    startApp();
}
