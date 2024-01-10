import {baseApi} from "../../../06_shared/api/baseApi";

export const delTagById = (uid : number) =>
    baseApi('/rm-permatag-by-id?'+new URLSearchParams({uid: uid.toString()}))