import {baseApi} from "../../../06_shared/api/baseApi";

export const getFile = (uid: number): Promise<string> =>
    baseApi('/get-file?' + new URLSearchParams({uid: uid.toString()}))