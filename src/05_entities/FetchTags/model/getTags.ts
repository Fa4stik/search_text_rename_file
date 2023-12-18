import {TGetTagsResp} from "./types";
import {baseApi} from "../../../06_shared/api/baseApi";

export const getTags = (group_id: number): Promise<TGetTagsResp> =>
    baseApi('/get-permatags?'+new URLSearchParams({group: group_id.toString()}))