import {baseApi} from "../../../06_shared/api/baseApi";
import {TGetFoldersResp} from "./types";

export const getFolders = (path: string, count = -1): Promise<TGetFoldersResp> => {
    const bodyQuery = {path, count}
    return baseApi<TGetFoldersResp>('/get-folders', {
        method: 'POST',
        body: JSON.stringify(bodyQuery),
    })
}