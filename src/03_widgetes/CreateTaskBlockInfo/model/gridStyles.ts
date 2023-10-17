import {TColumn} from "../../../05_entities/DataGrid";

export const columnsCreateTask: TColumn[] = [
    {field: 'id', nameHeader: '№', width: '40px'},
    {field: 'name', nameHeader: 'Название', width: '250px'},
]

export type TColumnsCreateTask = typeof columnsCreateTask