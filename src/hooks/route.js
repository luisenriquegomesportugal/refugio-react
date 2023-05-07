export const useBackendRoute = () => (path, params = null) => {
    let query = '';
    if (params) {
        let urlParams = new URLSearchParams(params);
        query = urlParams.toString();
    }

    return `http://127.0.0.1:8000/${path}${query ? '?' + query : ''}`;
}