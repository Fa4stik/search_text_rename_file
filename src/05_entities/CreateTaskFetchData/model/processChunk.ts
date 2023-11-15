import {TProcessChunkReq} from "./types";
import {baseApi} from "../../../06_shared/api/baseApi";

export const processChunk = (chunk_id: number, ocr_model_type: string): Promise<TProcessChunkReq> => {
    const bodyQuery = {chunk_id, ocr_model_type}
    return baseApi('/process-chunk/', {
        method: 'POST',
        body: JSON.stringify(bodyQuery),
    })
}