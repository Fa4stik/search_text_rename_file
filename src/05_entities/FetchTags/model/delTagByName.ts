import {baseApi} from "../../../06_shared/api/baseApi";

export const delTagByName = (tag: string, group_id: number): Promise<boolean> =>
    baseApi('')