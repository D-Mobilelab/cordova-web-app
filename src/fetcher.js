async function fetchConfig() {
    let url = null;
    if (__ENV__ === 'development' || APP_ENV === 'hybrid') {
        url = [LOCAL_JSON.settings.domain, LOCAL_JSON.settings.country, 'v01', 'config.getvars?keys=poggioacaiano'].join('/');        
    } else if(APP_ENV !== 'hybrid') {
        url = [location.origin, LOCAL_JSON.settings.country, 'v01', 'config.getvars?keys=poggioacaiano'].join('/');
    }

    try {
        const remoteConfig = await fetch(url).then(response => response.json());
        // saveConfig(data)
        console.log(`Config fetched from ${url}`, remoteConfig);
        return remoteConfig;
    } catch(e) {
        /** 
         * TODO:
         * load the saved one
         */
        const localConfig = await fetch('/config.json').then(response => response.json());
        console.log(`Config fetched from local`, data);
        return localConfig;
    }
}

export default fetchConfig;
