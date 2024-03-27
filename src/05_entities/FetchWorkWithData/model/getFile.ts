import {baseApi} from "../../../06_shared/api/baseApi";

export const getFile = (uid: number, pdf_id?: string): Promise<string> =>
    new Promise((resolve) => {
        let myPromise = baseApi<string>('/get-file/?' + new URLSearchParams({uid: uid.toString()}))
        if (pdf_id)
            myPromise = baseApi<string>('/get-file/?' + new URLSearchParams({uid: uid.toString(), pdf_id}))
        myPromise
            .then(shortPath => {
                resolve([
                    window.location.protocol, '//',
                    process.env.REACT_APP_SERVER_PATH ?? window.location.host,
                    shortPath
                ].join(''))
            })
    })