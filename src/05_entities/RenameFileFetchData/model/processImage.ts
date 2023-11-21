import {baseApi} from "../../../06_shared/api/baseApi";
import {TImgSizes, TProcessImgReq} from "./types";

export const processImage = (uid: number, ocr_model_type: string,
                             angle: number, w2h_koeff: number,
                             imgSize: TImgSizes): Promise<TProcessImgReq> => {
    const {x1, y1, width, height} = imgSize
    const bodyQuery = {
        uid,
        ocr_model_type,
        pipeline_params: {
            angle,
            w2h_koeff,
            cut: {
                x1,
                y1,
                width,
                height
            }
        }
    }
    return baseApi('/process-image/', {
        method: 'POST',
        body: JSON.stringify(bodyQuery)
    })
}