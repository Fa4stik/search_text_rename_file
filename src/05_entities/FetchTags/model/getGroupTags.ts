import {baseApi} from "../../../06_shared/api/baseApi";
import {TGetGroupTagsResp} from "./types";

export const getGroupTags = (): Promise<TGetGroupTagsResp> =>
    baseApi('/get-group-tags/',
        {method: 'POST'})