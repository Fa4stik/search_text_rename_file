import {baseApiMultipart} from "../../../06_shared/api/baseApi";
import {TUploadFilesResp} from "./types";

export const uploadFiles = (files: File[] | File, chunk_id: string): Promise<TUploadFilesResp> => {
    const formData = new FormData()
    if (Array.isArray(files))
        files.forEach((file, index) => {
            formData.append('files', file)
        })
    else
        formData.append('files', files)
    return baseApiMultipart<TUploadFilesResp>('/upload-files?'+new URLSearchParams({chunk_id}), {
        method: 'POST',
        body: formData,
    })
}