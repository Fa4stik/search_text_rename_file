import {baseApi} from "../../../06_shared/api/baseApi";
import {TImgSizes, TProcessImgReq} from "./types";

type NumberObjects = {[key: string]: number}
const floorNumbers = (...objects: NumberObjects[]): NumberObjects[] => {
    return objects.map(object => {
        const floorObj: NumberObjects = {}
        for (const key in object) {
            floorObj[key] = Math.floor(object[key])
        }
        return floorObj;
    })
}

export const processImage = (uid: number, ocr_model_type: string,
                             angle: number, w2h_koeff: number,
                             imgSize: TImgSizes): Promise<TProcessImgReq> => {
    const [numbers] = floorNumbers({...imgSize})
    const bodyQuery = {
        uid,
        ocr_model_type,
        pipeline_params: {
            angle,
            w2h_koeff,
            cut: {
                ...numbers
            }
        }
    }
    return baseApi('/process-image/', {
        method: 'POST',
        body: JSON.stringify(bodyQuery)
    })
}