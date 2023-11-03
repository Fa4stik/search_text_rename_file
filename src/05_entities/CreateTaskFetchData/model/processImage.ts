import {TProcessImageReq} from "./types";
import {baseApi} from "../../../06_shared/api/baseApi";

export const processImage = (chunk_id: number): Promise<TProcessImageReq> => {
    const bodyQuery = {chunk_id}
    return baseApi('/process-image', {
        method: "POST",
        body: JSON.stringify(bodyQuery),
    })
}