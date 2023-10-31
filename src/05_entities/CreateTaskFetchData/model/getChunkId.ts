import {baseApi} from "../../../06_shared/api/baseApi";

export const getChunkId = (): Promise<number> =>
    baseApi('/get-chunk-id/')