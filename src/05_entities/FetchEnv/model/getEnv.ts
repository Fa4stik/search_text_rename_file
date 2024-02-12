import {TEnv} from "./types";
import {fetchData} from "../../../06_shared/api/baseApi";

export const getEnv = (): Promise<TEnv> =>
    fetchData<TEnv>('/config.json')