import App from './App';
import runtime from 'serviceworker-webpack-plugin/lib/runtime';

function startApp(){ 
    new App("Up and running").render();
    if ('serviceWorker' in navigator) {
        const registration = runtime.register();
    }
}

if (APP_ENV === 'hybrid') {
    document.addEventListener('deviceready', startApp);
} else {
    startApp();    
}
