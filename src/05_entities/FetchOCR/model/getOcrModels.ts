import {baseApi} from "../../../06_shared/api/baseApi";
import {TGetOcrModelsResp} from "./types";

export const getOcrModels = (): Promise<TGetOcrModelsResp> =>
    baseApi('/get-ocr-models')