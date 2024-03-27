import {baseApi} from "../../../06_shared/api/baseApi";

export const setTag = (tag: string, group_id: number): Promise<string> =>
    baseApi('/set-permatag/?'+new URLSearchParams({group_id: group_id.toString(), tag}),
        {method: 'POST'})