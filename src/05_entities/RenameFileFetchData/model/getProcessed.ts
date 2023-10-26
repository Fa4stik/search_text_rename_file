import {baseApi} from "../../../06_shared/api/baseApi";
import {TGetProcessedReq} from "./types";

export const getProcessed = (uid: number): Promise<TGetProcessedReq> => {
    const dataBody = {uid}
    return baseApi<TGetProcessedReq>('/get-processed', {
        method: 'POST',
        body: JSON.stringify(dataBody),
        headers: {
            'Content-Type': "application/json"
        }
    })
}