import {baseApiBlob} from "../../../06_shared/api/baseApi";

export const getFile = (uid: number): Promise<Blob> => {
    return baseApiBlob('/get-file' + new URLSearchParams({uid: uid.toString()}))
}