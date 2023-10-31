import {TGetOcrModelsReq} from "./types";
import {baseApi} from "../../../06_shared/api/baseApi";

export const getOcrModels = (): Promise<TGetOcrModelsReq> =>
    baseApi('/get-ocr-models/')