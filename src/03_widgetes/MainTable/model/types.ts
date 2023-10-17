import {TRow} from "../../../05_entities/DataGrid/model/gridTypes";

export type TRowMain = TRow & {
    name: string;
    countFiles: string;
    sizeFiles: string;
    dataStart: string;
    status: string;
}

export type TRowRename = TRow & {
    name: string;
    countFiles: string;
    sizeFiles: string;
    timeHandle: string;
}

export type TRowReady = TRow & {
    name: string;
    countFiles: string;
    sizeFiles: string;
    timeHandle: string;
    path: string;
}