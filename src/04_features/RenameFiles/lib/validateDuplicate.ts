import {TRow} from "../../../05_entities/DataGrid";

export const validateDuplicate = (rows: TRow[], nameFile: string): boolean =>
    !rows.some(row => row.name === nameFile)