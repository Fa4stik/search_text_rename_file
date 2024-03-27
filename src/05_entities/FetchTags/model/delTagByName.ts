import {baseApi} from "../../../06_shared/api/baseApi";

export const delTagByName = (tag: string, group_id: number): Promise<boolean> =>
    baseApi('/rm-permatag/?'+new URLSearchParams({tag, group_id: group_id.toString()}))