export default function registerServiceWorker(){
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
            return registration;
        }
        // registration.unregister()<Promise>
    }
} 