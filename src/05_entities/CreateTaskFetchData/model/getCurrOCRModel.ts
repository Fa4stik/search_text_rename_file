import {baseApi} from "../../../06_shared/api/baseApi";

export const getCurrOCRModel = (): Promise<string> =>
    baseApi('/get-current-ocr-model')