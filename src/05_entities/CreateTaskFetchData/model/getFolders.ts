import {TFoldersReq} from "./types";
import {baseApi} from "../../../06_shared/api/baseApi";

export const getFolders = (path: string, count = -1): Promise<TFoldersReq> => {
    const bodyQuery = {path, count}
    return baseApi<TFoldersReq>('/get-folders', {
        method: 'POST',
        body: JSON.stringify(bodyQuery),
        headers: {
            'Content-Type': "application/json"
        }
    })
}