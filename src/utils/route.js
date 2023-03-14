export const route = (path, params = null) => {
    let query = '';
    if (params) {
        let urlParams = new URLSearchParams(params);
        query = urlParams.toString();
    }

    return `https://arearefugio.com.br/${path}${query ? '?' + query : ''}`;
}