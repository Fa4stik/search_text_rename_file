const baseUrl = [
    window.location.protocol, "//",
    process.env.REACT_APP_SERVER_PATH ?? window.location.host, "/api"
].join('')

export const fetchData = <T>(url: string, init?: RequestInit): Promise<T> => {
    return fetch(url, init)
        .then(response => response.json()) as Promise<T>
}

export const baseApi = <T>(url: string, init?: RequestInit): Promise<T> => {
    return fetchData<T>(baseUrl + url, {
        // credentials: 'include',
        headers: {
            'Content-Type': "application/json"
        },
        ...init,
    })
}

export const baseApiMultipart = <T>(url: string, init?: RequestInit): Promise<T> => {
    return fetchData<T>(baseUrl+url, {
        // credentials: 'include',
        ...init
    })
}
