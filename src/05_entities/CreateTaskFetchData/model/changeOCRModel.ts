import {baseApi} from "../../../06_shared/api/baseApi";

export const changeOCRModel = (ocr_model_type: string): Promise<string> =>
    baseApi('/change-ocr-model?'+ new URLSearchParams({ocr_model_type}), {
        method: 'POST'
    })