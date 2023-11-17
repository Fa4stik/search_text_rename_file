import {baseApi} from "../../../06_shared/api/baseApi";

export const setPermatag = (tag: string): Promise<string> =>
    baseApi('/set-permatag?' + new URLSearchParams({tag}), {
        method: 'POST'
    })