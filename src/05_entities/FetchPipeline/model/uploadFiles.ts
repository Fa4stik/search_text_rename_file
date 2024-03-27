import {baseApiMultipart} from "../../../06_shared/api/baseApi";
import {TUploadFilesResp} from "./types";

export const uploadFile = (file: File, chunk_id: string): Promise<TUploadFilesResp | File> => {
    const formData = new FormData()
    formData.append('files', file)
    return new Promise((resolve, reject) => {
        baseApiMultipart<TUploadFilesResp>('/upload-files/?'+new URLSearchParams({chunk_id}), {
            method: 'POST',
            body: formData,
        })
            .then(resp => {
                return resolve(resp)
            })
            .catch(() => reject(file))
    })
}

export const uploadFiles = (files: FileList | File[], id: string, success: TUploadFilesResp[] = [], count = 0): Promise<TUploadFilesResp[]> =>
    new Promise((resolve) => {
        if (files.length === 0 || count >= 3)
            return resolve(success)
        const promisesFiles = Array.from(files).map(file => uploadFile(file, id))
        return Promise
            .allSettled(promisesFiles)
            .then((results) =>
                new Promise<File[]>((resolve) => {
                    const rejectedes = new Set<File>()
                    results.forEach((result, index) => {
                        if (result.status === 'fulfilled') {
                            success.push(result.value as TUploadFilesResp)
                        }

                        if (result.status === 'rejected') {
                            rejectedes.add(result.reason)
                        }

                        if (results.length === index + 1) {
                            resolve(Array.from(rejectedes))
                        }
                    })
                }).then(rejects => resolve(uploadFiles(rejects, id, success, ++count)))
            )
    })