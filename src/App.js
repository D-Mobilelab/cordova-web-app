import './css/index.css';

export default class App {
    constructor(message = 'default message'){
        this.updateOnlineStatus = this.updateOnlineStatus.bind(this);
        // title
        this.body = document.querySelector('body');
        this.h1Tag = document.createElement('h1');
        this.h1Tag.className = 'Title-message';   
        this.body.appendChild(this.h1Tag);

        // loose connection
        this.connectionState = document.createElement('div');
        this.connectionState.className = 'Connection-state';
        this.body.appendChild(this.connectionState);
        this.state = {
            online: navigator.onLine
        }
        this.attachEvents();        
        this.getInfo();
    }

    updateOnlineStatus(evt) {
        this.state.online = navigator.onLine;
        this.render();
    }

    attachEvents(){
        window.addEventListener('online',  this.updateOnlineStatus);
        window.addEventListener('offline', this.updateOnlineStatus);
    }

    async getInfo() {
        try {
            const data = await fetch('//httpbin.org/ip').then(response => response.json());
            this.message = `Your ip is ${data.origin} runnning: ${__ENV__} ${APP_ENV}`;
            this.render();
            return data;
        } catch(reason) {
            console.warn(reason);
            this.message = `Runnning: ${__ENV__} ${APP_ENV}`;
            this.render();
        }        
    }

    render() {
        this.h1Tag.innerText = this.message;
        this.connectionState.className = ['Connection-state', this.state.online ? 'online' : 'offline' ].join(' ');
        this.connectionState.innerHTML = `<div>Connection state:${this.state.online ? 'online' : 'offline'}</div>`;
    }
}