import {baseApi} from "../../../06_shared/api/baseApi";

export const delDataByChunkId = (chunk_id: number): Promise<boolean> =>
    baseApi('/delete-data-by-chunk-id/'+new URLSearchParams({chunk_id: chunk_id.toString()}),
        {method: 'POST'})