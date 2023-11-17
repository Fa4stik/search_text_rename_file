import {baseApi} from "../../../06_shared/api/baseApi";
import {TProcessImgReq} from "./types";

export const processImage = (uid: number, ocr_model_type: string, angle_to_rotate: number): Promise<TProcessImgReq> => {
    const bodyQuery = {uid, ocr_model_type, angle_to_rotate}
    return baseApi('/process-image/', {
        method: 'POST',
        body: JSON.stringify(bodyQuery)
    })
}