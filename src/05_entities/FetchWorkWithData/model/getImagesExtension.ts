import {baseApi} from "../../../06_shared/api/baseApi";

export const getImagesExtension = (): Promise<string[]> =>
    baseApi('/get-images-extension/')