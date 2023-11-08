import {baseApi} from "../../../06_shared/api/baseApi";
import {TGetProcessedReq} from "./types";

export const getDataById = (uid: number): Promise<TGetProcessedReq> => {
    const dataBody = {uid}
    return baseApi<TGetProcessedReq>('/get-data-by-id', {
        method: 'POST',
        body: JSON.stringify(dataBody),
    })
}