import './css/index.css';

export default class App {
    constructor(message = 'default message'){
        this.body = document.querySelector('body');
        this.h1Tag = document.createElement('h1');
        this.h1Tag.className = 'Title-message';   
        this.body.appendChild(this.h1Tag);
        this.getInfo();
    }

    async getInfo() {
        try {
            const data = await fetch('http://httpbin.org/ip').then(response => response.json());
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
    }
}