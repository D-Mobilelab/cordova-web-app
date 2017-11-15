import './css/index.css';

class App {
    constructor(message='default message'){
        this.body = document.querySelector('body');
        this.h1Tag = document.createElement('h1');
        this.h1Tag.className = 'Title-message';   
        this.body.appendChild(this.h1Tag);
        this.getInfo()
            .then(data => {
                this.message = `Your ip is ${data.origin}`;
                this.render();
            });
    }

    async getInfo() {
        try {
            const data = await fetch('http://httpbin.org/ip').then(response => response.json());
            return data;
        } catch(e) {
            console.warn(e);
        }        
    }

    render() {
        this.h1Tag.innerText = this.message;
    }
}

new App("Up and running").render()