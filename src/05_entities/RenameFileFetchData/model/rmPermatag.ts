import {baseApi} from "../../../06_shared/api/baseApi";
import {TRmPermaTagsReq} from "./types";

export const rmPermatag = (tag: string): Promise<TRmPermaTagsReq> =>
    baseApi('/rm-permatag/')