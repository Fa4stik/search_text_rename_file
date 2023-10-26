import {TProcessImageReq} from "./types";
import {baseApi} from "../../../06_shared/api/baseApi";

export const processImage = (chunk_id: number, paths: string[]): Promise<TProcessImageReq> => {
    const bodyQuery = {chunk_id, paths}
    return baseApi('/process-image', {
        method: "POST",
        body: JSON.stringify(bodyQuery),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}