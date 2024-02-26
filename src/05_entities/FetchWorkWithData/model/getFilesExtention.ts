import {baseApi} from "../../../06_shared/api/baseApi";

export const getFilesExtention = (): Promise<string[]> =>
    baseApi<string[]>('/get-files-extension/')