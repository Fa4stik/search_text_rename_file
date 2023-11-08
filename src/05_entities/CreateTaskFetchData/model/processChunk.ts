import {TProcessChunkReq} from "./types";
import {baseApi} from "../../../06_shared/api/baseApi";

export const processChunk = (chunk_id: number): Promise<TProcessChunkReq> => {
    const bodyQuery = {chunk_id}
    return baseApi('/process-chunk/', {
        method: 'POST',
        body: JSON.stringify(bodyQuery)
    })
}