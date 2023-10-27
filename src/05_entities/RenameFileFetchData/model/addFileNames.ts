import {TAddFileName} from "./types";
import {baseApi} from "../../../06_shared/api/baseApi";

export const addFileNames = (addFileNames: TAddFileName[]) =>
    baseApi('/add-filenames', {
        method: 'POST',
        body: JSON.stringify({reqs: addFileNames}),
    })