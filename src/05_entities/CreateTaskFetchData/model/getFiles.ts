import {TFilesReq} from "./types";
import {baseApi} from "../../../06_shared/api/baseApi";

export const getFiles = (path: string, count = -1): Promise<TFilesReq> => {
    const dataBody = {path, count}
    return baseApi<TFilesReq>('/get-files', {
        method: 'POST',
        body: JSON.stringify(dataBody)
    })
}