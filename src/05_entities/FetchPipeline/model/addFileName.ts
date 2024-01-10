import {baseApi} from "../../../06_shared/api/baseApi";

export const addFileName = (uid: number, filename: string, is_duplicate: boolean): Promise<boolean> => {
    const dataBody = {uid, filename, is_duplicate}
    return baseApi('/add-filename', {
        method: 'POST',
        body: JSON.stringify(dataBody),
    })
}