const fetchData = <T>(url: string, init?: RequestInit): Promise<T> => {
    return fetch(url, init)
        .then(response => response.json()) as Promise<T>
}

export const baseApi = <T>(url: string, init?: RequestInit): Promise<T> =>
    fetchData<T>('http://127.0.0.1:8000/api'+url, {
        headers: {
            // 'Access-Control-Allow-Credentials': 'true',
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        ...init
    })

