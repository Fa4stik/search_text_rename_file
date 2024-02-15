import {baseApi} from "../../../06_shared/api/baseApi";

export const addFileName = (uid: number, filename: string, is_duplicate: boolean, file_type: string): Promise<boolean> => {
    const dataBody = {
        uid, filename, is_duplicate, file_type
    }
    return baseApi('/add-filename/', {
        method: 'POST',
        body: JSON.stringify(dataBody),
    })
}