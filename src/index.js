// import 'onsenui/css/onsenui.css';
// import 'onsenui/css/onsen-css-components.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerSW from './registerServiceWorker';

function startApp() {
    ReactDOM.render(<App />, document.getElementById('root'));
    registerSW();
}

if (module.hot) {
    module.hot.accept('./App.js', () => {
      // Require the new version and render it    
      ReactDOM.render(<App />, document.getElementById('root'));
    });
  }

if (APP_ENV === 'hybrid') {
    document.addEventListener('deviceready', startApp);
} else {
    document.addEventListener('DOMContentLoaded', startApp);
}
