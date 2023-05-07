export const useFetch = (url, init = {}, type = 'json') =>
    fetch(`https://arearefugio.com.br/api/${url}`, init)
        .then(res => res[type]());

export const useFetchMutation = (url, data, init = {}, type = 'json') =>
    fetch(
        `https://arearefugio.com.br/api/${url}`,
        Object.assign({}, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }, init)
    )
        .then(res => res[type]())
