import {TColumn} from "../../../05_entities/DataGrid/model/gridTypes";

export const columnsMain: TColumn[] = [
    {field: 'id', nameHeader: 'ID', width: '50px'},
    {field: 'name', nameHeader: 'Название', width: '150px'},
    {field: 'countFiles', nameHeader: 'Количество файлов', width: '150px'},
    {field: 'sizeFiles', nameHeader: 'Общий размер (мб)', width: '150px'},
    {field: 'dataStart', nameHeader: 'Дата начала', width: '130px'},
    {field: 'status', nameHeader: 'Статус', width: '100px'},
]

export type TColumnsMain = typeof columnsMain

export const columnsRename: TColumn[] = [
    {field: 'id', nameHeader: 'ID', width: '50px'},
    {field: 'name', nameHeader: 'Название', width: '150px'},
    {field: 'countFiles', nameHeader: 'Количество файлов', width: '150px'},
    {field: 'sizeFiles', nameHeader: 'Общий размер (мб)', width: '150px'},
    {field: 'timeHandle', nameHeader: 'Время обработки (мин)', width: '150px'},
]

export type TColumnsRename = typeof columnsRename

export const columnsReady: TColumn[] = [
    {field: 'id', nameHeader: 'ID', width: '50px'},
    {field: 'name', nameHeader: 'Название', width: '150px'},
    {field: 'countFiles', nameHeader: 'Количество файлов', width: '150px'},
    {field: 'sizeFiles', nameHeader: 'Общий размер (мб)', width: '150px'},
    {field: 'timeHandle', nameHeader: 'Время обработки (мин)', width: '150px'},
    {field: 'path', nameHeader: '', width: '0'},
]

export type TColumnsReady = typeof columnsReady