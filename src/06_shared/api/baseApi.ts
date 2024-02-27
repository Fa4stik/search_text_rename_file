import {getEnv} from "../../05_entities/FetchEnv";

const getBaseUrl = (): Promise<string> => {
    return new Promise((resolve) => {
        getEnv()
            .then((process) => {
                let isSsl = false

                window.location.protocol === 'https:' &&
                    (isSsl = true)

                const baseUrl = [
                    window.location.protocol, "//",
                    process.env.REACT_APP_SERVER_PATH, ":",
                    isSsl ? process.env.REACT_APP_SERVER_PORT_SSL : process.env.REACT_APP_SERVER_PORT, "/api"
                ].join('');
                resolve(baseUrl)
            })
    })
}

export const fetchData = <T>(url: string, init?: RequestInit): Promise<T> => {
    return fetch(url, init)
        .then(response => response.json()) as Promise<T>
}

export const baseApi = <T>(url: string, init?: RequestInit): Promise<T> => {
    return new Promise<T>((resolve) => {
        getBaseUrl()
            .then(baseUrl => {
                resolve(fetchData<T>(baseUrl + url, {
                    // credentials: 'include',
                    headers: {
                        'Content-Type': "application/json"
                    },
                    ...init,
                }))
            })
    })
}

export const baseApiMultipart = <T>(url: string, init?: RequestInit): Promise<T> => {
    return new Promise<T>(resolve => {
        getBaseUrl()
            .then(baseUrl => {
                resolve(fetchData<T>(baseUrl+url, {
                    // credentials: 'include',
                    ...init
                }))
            })
    })
}
