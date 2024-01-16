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
        const failedUploads: Set<File> = new Set<File>([])
        const successUploads: Set<TUploadFilesResp> = new Set<TUploadFilesResp>([])

        Promise
            .all(files.map(file => uploadFile(file, chunk_id)))
            .then((resps) => {
                resps.forEach(resp => {
                    resp.paths.length > 0 && successUploads.add(resp)
                })
                if (successUploads.size === files.length)
                    resolve(Array.from(successUploads))
            })

        while (failedUploads.size !== 0) {
            failedUploads.forEach(file => {
                uploadFile(file, chunk_id)
                    .then((resp) => {
                        successUploads.add(resp)
                        failedUploads.delete(file)
                    })
                    .catch()
            })

            if (failedUploads.size === 0)
                resolve(Array.from(successUploads))
        }
    })
}