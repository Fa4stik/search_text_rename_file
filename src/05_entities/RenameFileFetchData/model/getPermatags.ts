import {baseApi} from "../../../06_shared/api/baseApi";
import {TGetPermaTagsReq} from "./types";

export const getPermatags = (): Promise<TGetPermaTagsReq> =>
    baseApi('/get-permatags')