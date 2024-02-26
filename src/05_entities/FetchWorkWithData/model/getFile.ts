import {baseApi} from "../../../06_shared/api/baseApi";
import {getEnv} from "../../FetchEnv";

export const getFile = (uid: number, pdf_id?: string): Promise<string> =>
    new Promise((resolve) => {
        let myPromise = baseApi<string>('/get-file?' + new URLSearchParams({uid: uid.toString()}))
        if (pdf_id)
            myPromise = baseApi<string>('/get-file?' + new URLSearchParams({uid: uid.toString(), pdf_id}))
        myPromise
            .then(shortPath => {
                getEnv()
                    .then(process => {
                        resolve([
                            window.location.protocol, '//',
                            process.env.REACT_APP_SERVER_PATH, ':',
                            process.env.REACT_APP_SERVER_PORT,
                            shortPath
                        ].join(''))
                    })
            })
    })