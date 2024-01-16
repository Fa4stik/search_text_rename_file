import {baseApiMultipart} from "../../../06_shared/api/baseApi";
import {TUploadFilesResp} from "./types";

export const uploadFile = (file: File, chunk_id: string): Promise<TUploadFilesResp> => {
    const formData = new FormData()
    formData.append('files', file)
    return baseApiMultipart<TUploadFilesResp>('/upload-files?'+new URLSearchParams({chunk_id}), {
        method: 'POST',
        body: formData,
    })
}

export const uploadFiles = (files: File[], chunk_id: string): Promise<TUploadFilesResp[]> => {
    return new Promise((resolve) => {
        const failed = new Set<File>(files)
        const success = new Set<TUploadFilesResp>()
        const myInterval = setInterval(() => {
            if (failed.size === 0) {
                clearInterval(myInterval)
                resolve(Array.from(success))
            }
            Array.from(failed).forEach(file => {
                uploadFile(file, chunk_id)
                    .then((resp) => {
                        success.add(resp)
                        failed.delete(file)
                    })
                    .catch(() => {})
            })
        }, 500)
    })
}