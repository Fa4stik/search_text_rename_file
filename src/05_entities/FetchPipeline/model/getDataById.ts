import {baseApi} from "../../../06_shared/api/baseApi";
import {TGetDataByIdResp} from "./types";

export const getDataById = (uid: number): Promise<TGetDataByIdResp> => {
    const dataBody = {uid}
    return baseApi<TGetDataByIdResp>('/get-data-by-id/', {
        method: 'POST',
        body: JSON.stringify(dataBody),
    })
}