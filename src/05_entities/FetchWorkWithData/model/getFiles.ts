import {baseApi} from "../../../06_shared/api/baseApi";
import {TGetFilesResp} from "./types";

export const getFiles = (path: string, count = -1): Promise<TGetFilesResp> => {
    const dataBody = {path, count}
    return baseApi<TGetFilesResp>('/get-files', {
        method: 'POST',
        body: JSON.stringify(dataBody),
    })
}