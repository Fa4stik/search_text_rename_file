import {baseApi, baseApiMultipart} from "../../../06_shared/api/baseApi";
import {TUploadFilesReq} from "./types";

export const uploadFiles = (files: File[], chunk_id: string): Promise<TUploadFilesReq> => {
    const formData = new FormData()
    files.forEach((file, index) => {
        formData.append('files', file)
    })
    return baseApiMultipart<TUploadFilesReq>('/upload-files?'+new URLSearchParams({chunk_id}), {
        method: 'POST',
        body: formData,
    })
}