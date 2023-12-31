const baseUrl = `http://${process.env.REACT_APP_SERVER_PATH}/api`

const fetchData = <T>(url: string, init?: RequestInit): Promise<T> => {
    return fetch(url, init)
        .then(response => response.json()) as Promise<T>
}

const fetchDataBlob = (url: string, init?: RequestInit): Promise<Blob> => {
    return fetch(url, init).then(resp => resp.blob())
}

export const baseApi = <T>(url: string, init?: RequestInit): Promise<T> =>
    fetchData<T>(baseUrl+url, {
        // credentials: 'include',
        headers: {
            'Content-Type': "application/json",
            "Access-Control-Allow-Origin": '*'
        },
        ...init,
    })

export const baseApiMultipart = <T>(url: string, init?: RequestInit): Promise<T> =>
    fetchData<T>(baseUrl+url, {
        // credentials: 'include',
        ...init
    })

export const baseApiBlob = (url: string, init?: RequestInit): Promise<Blob> =>
    fetchDataBlob(baseUrl+url, init)
