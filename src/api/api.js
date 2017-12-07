const apiEndPoint = `http://resources.buongiorno.com/lapis/apps/contents.getListAdv`;

export async function getArticles() {
    try {        
        const urlSearchParams = new URLSearchParams(`fw=news&vh=muchgossip.it&lang=it&white_label=it_igossip&real_customer_id=it_igossip&sort=-meta.timestamp&offset=0&size=10&timestamp=1512665566&tld=it`);
        const response = await fetch(`${apiEndPoint}?${urlSearchParams.toString()}`).then(response => response.json());
        return response;
    } catch(e) {
        console.warn(e);
    }
}

export default {
    getArticles
}