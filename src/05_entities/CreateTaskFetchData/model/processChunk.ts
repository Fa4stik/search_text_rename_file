import {TProcessChunkReq} from "./types";
import {baseApi} from "../../../06_shared/api/baseApi";

export const processChunk = (chunk_id: number, model_type: string): Promise<TProcessChunkReq> => {
    const bodyQuery = {chunk_id, model_type}
    return baseApi('/process-chunk/', {
        method: 'POST',
        body: JSON.stringify(bodyQuery)
    })
}