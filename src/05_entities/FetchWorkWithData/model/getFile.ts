import {baseApi} from "../../../06_shared/api/baseApi";

export const getFile = (uid: number, pdf_id?: string): Promise<string> => pdf_id
    ? baseApi('/get-file?' + new URLSearchParams({uid: uid.toString(), pdf_id}))
    : baseApi('/get-file?' + new URLSearchParams({uid: uid.toString()}))