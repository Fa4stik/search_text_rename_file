import {TGetTagsResp} from "./types";
import {baseApi} from "../../../06_shared/api/baseApi";

export const getTagsByGroup = (group_id: number): Promise<TGetTagsResp> =>
    baseApi('/get-permatags-by-group/?'+new URLSearchParams({group_id: group_id.toString()}))