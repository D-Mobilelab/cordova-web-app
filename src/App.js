import './css/index.css';

function ArticleFactory(props){
    return (`
        <div>
            <h2>${props.title}</h2>
            <p>${props.description}</p>
            <div>
                <button>Save for later</button>
            </div>
        </div>        
    `);
}


export default class App {
    constructor(message = 'default message'){
        this.updateOnlineStatus = this.updateOnlineStatus.bind(this);
        // title component
        this.body = document.querySelector('body');
        this.h1Tag = document.createElement('h1');
        this.h1Tag.className = 'Title-message';   
        this.body.appendChild(this.h1Tag);

        // loose connection
        this.connectionState = document.createElement('div');
        this.connectionState.className = 'Connection-state';
        this.body.appendChild(this.connectionState);

        // article component
        this.articleContainer = document.createElement('div');
        this.articleContainer.className = 'Article-container';
        this.body.appendChild(this.articleContainer);

        this.state = { 
            isFetching: false,
            articles: {},
            online: navigator.onLine 
        }
        this.attachEvents();        
        this.getInfo();
        this.getArticle();
    }

    updateOnlineStatus(evt) {
        this.state.online = navigator.onLine;
        this.render();
    }

    attachEvents(){
        window.addEventListener('online',  this.updateOnlineStatus);
        window.addEventListener('offline', this.updateOnlineStatus);
    }

    async getArticle() {
        try {
            this.state.isFetching = true;
            this.render();
            const apiURL = "http://resources2.buongiorno.com/lapis/apps/contents.getListAdv?fw=news&vh=test.muchgossip.it&lang=it&white_label=it_testmuchgossip&real_customer_id=test_import_imagazine&content_id=025c7e0fe794439e6b51c8fd93cc20ee&timestamp=1511261360&tld=it";
            const article = await fetch(apiURL).then(response => response.json());
            this.state.articles[article.id] = article;            
            this.state.isFetching = false;
            this.render();
        } catch(e){
            console.warn(e);
        }
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
        let articles = '';
        for ([id, article] of Object.entries(this.state.articles)) {            
            articles += ArticleFactory(article);
        }
        this.articleContainer.innerHTML = this.state.articles.isFetching ? 
            `<div>Loading article...</div>` : articles;
    }
}