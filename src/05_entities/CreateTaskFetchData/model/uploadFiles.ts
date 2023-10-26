import {baseApi} from "../../../06_shared/api/baseApi";
import {TUploadFilesReq} from "./types";

export const uploadFiles = (files: File[]): Promise<TUploadFilesReq> => {
    const formData = new FormData()
    files.forEach((file, index) => {
        formData.append('files', file)
    })
    return baseApi<TUploadFilesReq>('/upload-files', {
        method: 'POST',
        body: formData,
        credentials: 'include'
    })
}