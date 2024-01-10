import {baseApi} from "../../../06_shared/api/baseApi";

export const archiveChunk = (chunk_id: string, filename: string): Promise<string> =>
    baseApi('/archive-chunk?' + new URLSearchParams({chunk_id, filename}))