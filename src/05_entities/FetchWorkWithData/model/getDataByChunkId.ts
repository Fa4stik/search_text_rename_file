import {baseApi} from "../../../06_shared/api/baseApi";

export const getDataByChunkId = (chunk_id: number): Promise<string> =>
    baseApi('/get-data-by-chunk-id/'+new URLSearchParams({chunk_id: chunk_id.toString()}))