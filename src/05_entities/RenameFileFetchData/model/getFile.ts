import {baseApi, baseApiBlob} from "../../../06_shared/api/baseApi";

export const getFile = (uid: number): Promise<string> => {
    return baseApi('/get-file?' + new URLSearchParams({uid: uid.toString()}), {
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    })
}