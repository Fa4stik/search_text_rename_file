import {TColumn} from "../../../05_entities/DataGrid";

export const columnsReadyFiles: TColumn[] = [
    {field: 'id', width: '30px', nameHeader: 'ID'},
    {field: 'name', width: '200px', nameHeader: 'Название файла'},
    {field: 'dateEdit', width: '150px', nameHeader: 'Изменено'},
]

export type TColumnReadyFiles = typeof columnsReadyFiles